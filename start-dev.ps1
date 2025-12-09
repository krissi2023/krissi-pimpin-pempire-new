# Diamondz Playhouse - Start Development Environment

Write-Host "�� Starting Diamondz Playhouse Development Environment..." -ForegroundColor Cyan

# Check for MongoDB
$mongo = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongo) {
    if ($mongo.Status -ne "Running") {
        Write-Host "Starting MongoDB..." -ForegroundColor Yellow
        Start-Process powershell -Verb RunAs -ArgumentList "net start MongoDB"
        Start-Sleep -Seconds 3
    }
    else {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️ MongoDB service not found. Ensure you have MongoDB running (Docker or Local)." -ForegroundColor Yellow
}

# Start All Servers
Write-Host "🚀 Starting All Servers (Backend + Frontend)..." -ForegroundColor Yellow
Write-Host "   Backend: http://localhost:5000"
Write-Host "   Frontend: http://localhost:3000"
npm start
