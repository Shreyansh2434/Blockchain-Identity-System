$ErrorActionPreference = "Stop"

Write-Host "`nStarting Blockchain Identity System..."

# Get root folder
$root = Resolve-Path "."

# Backend path
$backendPath = Join-Path $root "Back"

Write-Host "Building backend..."
Set-Location $backendPath
npm run build

Write-Host "Launching backend on http://localhost:5000 ..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$backendPath'; npm run dev"

Start-Sleep -Seconds 4

# Go back to root
Set-Location $root

# Frontend path
$frontendPath = Join-Path $root "Front\next-version"

Write-Host "Launching frontend on http://localhost:3000 ..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$frontendPath'; npm run dev"

Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:3000"

Write-Host "`nSystem started successfully."