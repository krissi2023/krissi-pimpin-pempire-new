# Diamondz Playhouse - Start Development Environment

Write-Host "💎 Starting Diamondz Playhouse Development Environment..." -ForegroundColor Cyan

# Check for MongoDB
$mongo = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongo.Status -ne 'Running') {
    Write-Host "Starting MongoDB..." -ForegroundColor Yellow
    Start-Process powershell -Verb RunAs -ArgumentList "net start MongoDB"
    Start-Sleep -Seconds 3
}
else {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
}

# Start Backend
Write-Host "🚀 Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd diamondz-playhouse/backend; npm start" -PassThru

# Start Frontend
Write-Host "🎨 Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd diamondz-playhouse/frontend; npm start" -PassThru

Write-Host "✅ Environment Started!" -ForegroundColor Green
Write-Host "   Backend: http://localhost:5000"
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   Press Ctrl+C in the new windows to stop servers."
