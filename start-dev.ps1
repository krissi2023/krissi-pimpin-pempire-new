# Diamondz Playhouse - Start Development Environment

Write-Host "�� Starting Diamondz Playhouse Development Environment..." -ForegroundColor Cyan

# Ensure a JDK is available for tools that require JAVA_HOME
# Prefer the repository bundled OpenJDK if present, otherwise leave system Java as-is
$repoJdk = Join-Path $PSScriptRoot 'Storefront\openJdk-25'
if (Test-Path $repoJdk) {
    Write-Host "Detected repo JDK at $repoJdk — setting JAVA_HOME for this session" -ForegroundColor Cyan
    $env:JAVA_HOME = $repoJdk
    # Prepend to PATH for this session
    $env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
} else {
    Write-Host "Repo JDK not found — relying on system Java if available" -ForegroundColor Yellow
}

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
