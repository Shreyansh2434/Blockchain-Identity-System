[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n Add New User`n"

$name = Read-Host "Enter Name"
$sap = Read-Host "Enter SAP ID"
$email = Read-Host "Enter Email"

Write-Host "`n Registering user..."

# Correct key-data path
$KEY_DIR = "$PSScriptRoot/key-data"
if (!(Test-Path $KEY_DIR)) {
  New-Item -ItemType Directory -Path $KEY_DIR | Out-Null
}

# Run key-generator with variables, NOT text
node "$PSScriptRoot/tools/key-generator.mjs" "$name" "$sap" "$email"

Write-Host "`n Generating DID..."

# Run key-runner
node "$PSScriptRoot/tools/key-runner.mjs"

Write-Host "`nCompleted! 🎉"
Write-Host "➡ User $name ($sap) is now ready for certificate issuing & verification."
