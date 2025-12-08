# run-demo.ps1 (robust v7.1)
$ErrorActionPreference = 'Stop'

# Determine script folder robustly
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
$keyDataDir = Join-Path $scriptDir 'key-data'
$metaPath = Join-Path $keyDataDir 'meta.json'

function Abort([string]$msg) {
    Write-Error $msg
    exit 1
}

# Basic checks
if (-not (Test-Path $keyDataDir)) { Abort "❌ key-data folder missing: $keyDataDir" }
if (-not (Test-Path $metaPath)) { Abort "❌ meta.json missing at: $metaPath" }

# Read file raw and normalize (fix BOM / encoding pitfalls)
$raw = Get-Content -Raw -Encoding UTF8 -Path $metaPath
if (-not $raw -or $raw.Trim() -eq '') {
    Abort "❌ meta.json appears empty: $metaPath"
}

# Remove UTF-8 BOM if present
if ($raw.Length -gt 0 -and $raw[0] -eq [char]0xFEFF) { $raw = $raw.Substring(1) }

# Try to parse JSON safely
try {
    $json = $raw | ConvertFrom-Json -ErrorAction Stop
} catch {
    Write-Host "❌ Failed to parse meta.json as JSON. Preview (first 800 chars):" -ForegroundColor Yellow
    $preview = if ($raw.Length -gt 800) { $raw.Substring(0,800) + '... (truncated)' } else { $raw }
    Write-Host $preview
    Write-Host "`nPlease ensure meta.json is valid JSON (array or object) and UTF-8 encoded." -ForegroundColor Yellow
    Abort "Parsing error: $($_.Exception.Message)"
}

# Normalize to array
if ($json -is [System.Array]) { $list = $json } else { $list = @($json) }

if ($list.Count -eq 0) { Abort "❌ meta.json contains no user records." }

Write-Host "`n👤 Available users:`n"

# Safe, clear listing
for ($i = 0; $i -lt $list.Count; $i++) {
    $u = $list[$i]
    $displayEmail = ""
    if ($null -ne $u.email -and $u.email -ne "") { $displayEmail = " <" + $u.email + ">" }
    $displaySAP = ""
    if ($null -ne $u.sap -and $u.sap -ne "") { $displaySAP = " (SAP: " + $u.sap + ")" }
    Write-Host ("  {0}: {1}{2}{3}" -f ($i+1), ($u.name -replace '\s+',' '), $displayEmail, $displaySAP)
}

# Ask user selection
$prompt = "Select user number (1-$($list.Count))"
$sel = Read-Host $prompt

[int]$num = 0
if (-not [int]::TryParse($sel, [ref]$num) -or $num -lt 1 -or $num -gt $list.Count) {
    Abort "❌ Invalid selection"
}

$chosen = $list[$num - 1]

# Extract and sanitize secret
$secret = $chosen.secretKeyHex
if (-not $secret -or $secret.Trim() -eq '') {
    Abort "❌ secretKeyHex missing in meta for selected user. Open $metaPath to inspect."
}
$secret = $secret.Trim()

# Remove accidental repeated 0x prefixes ("0x0x...") and ensure single 0x
while ($secret.ToLower().StartsWith("0x0x")) { $secret = $secret.Substring(2) }
if (-not $secret.ToLower().StartsWith("0x")) { $secret = "0x$secret" }

# Final basic format check (must be hex-ish)
if ($secret -notmatch '^0x[0-9a-fA-F]{1,64}$') {
    Write-Warning "⚠️ secretKeyHex is not standard hex length; the value will still be used but may fail in cryptographic calls."
}

# Set KMS secret for session
$env:KMS_SECRET_KEY = $secret

Write-Host "`n🔐 Loaded secret: $secret"
Write-Host "📧 Email: $($chosen.email)"
Write-Host "🆔 SAP: $($chosen.sap)"

# Run verification (compiled dist)
$distRunner = Join-Path $scriptDir 'dist\run-and-verify.js'
if (-not (Test-Path $distRunner)) {
    Write-Host "`n⚠️ Compiled verifier not found at: $distRunner" -ForegroundColor Yellow
    Write-Host "Please run `npx tsc` in the project root, then run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "`n🚀 Running verification..."
node $distRunner
if ($LASTEXITCODE -ne 0) { Abort "❌ Verification failed (node exit code $LASTEXITCODE)" }

Write-Host "`n🎉 Verification SUCCESSFUL — data valid."
