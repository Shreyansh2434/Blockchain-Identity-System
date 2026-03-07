[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n📌 Add New User`n"

$name = Read-Host "Enter Name"
$sap = Read-Host "Enter SAP ID"
$email = Read-Host "Enter Email"

Write-Host "`n🔹 Registering user..."

# Key-data directory
$KEY_DIR = "$PSScriptRoot/key-data"

if (!(Test-Path $KEY_DIR)) {
  New-Item -ItemType Directory -Path $KEY_DIR | Out-Null
}

# Step 1 — Generate keys + store metadata
Write-Host "`n🔐 Generating cryptographic keys..."
node "$PSScriptRoot/tools/key-generator.mjs" "$name" "$sap" "$email"

if ($LASTEXITCODE -ne 0) {
  Write-Host "`n❌ Key generation failed"
  exit 1
}

# Step 2 — Generate DID
Write-Host "`n🆔 Generating DID..."
node "$PSScriptRoot/tools/key-runner.mjs"

if ($LASTEXITCODE -ne 0) {
  Write-Host "`n❌ DID generation failed"
  exit 1
}

# Step 3 — Issue blockchain credential
Write-Host "`n📜 Issuing Verifiable Credential..."

Push-Location "$PSScriptRoot"
npm run create:credential
Pop-Location

if ($LASTEXITCODE -ne 0) {
  Write-Host "`n❌ Credential issuing failed"
  exit 1
}

Write-Host "`n✅ Completed Successfully!"
Write-Host "🎓 User $name ($sap) is now fully registered and verifiable."
Write-Host "🔎 You can verify the certificate on the website."