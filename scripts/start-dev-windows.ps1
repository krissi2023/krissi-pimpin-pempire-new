<#
.SYNOPSIS
  Start development services and open Chrome. When the Chrome window closes,
  the script will stop the started processes.

USAGE
  Run from PowerShell (preferably elevated if you need to start mongod):
    .\scripts\start-dev-windows.ps1

Notes:
  - Adjust the paths below if your repo or MongoDB installation differs.
  - This script uses `Start-Process -PassThru` to capture PIDs and stops them
    when the browser process exits.
#>

$root = 'C:\Users\krist\krissi-pimpin-pempire-new'
$mongoExe = 'C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe'
$mongoDbPath = Join-Path $root 'data\db'

Write-Host "Starting dev environment for: $root"

try {
    Write-Host 'Starting MongoDB...'
    $mongo = Start-Process -FilePath $mongoExe -ArgumentList '--dbpath', $mongoDbPath -PassThru -WindowStyle Minimized

    Start-Sleep -Seconds 1

    Write-Host 'Starting backend (npm start)...'
    $backend = Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit","-Command","cd '$root\diamondz-playhouse\backend'; npm start" -WorkingDirectory "$root\diamondz-playhouse\backend" -PassThru

    Start-Sleep -Seconds 1

    Write-Host 'Starting frontend (npm run start:dev)...'
    $frontend = Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit","-Command","cd '$root\diamondz-playhouse\frontend'; npm run start:dev" -WorkingDirectory "$root\diamondz-playhouse\frontend" -PassThru

    Start-Sleep -Seconds 1

    Write-Host 'Starting Stripe listener...'
    $stripe = Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit","-Command","cd '$root'; stripe listen --forward-to localhost:5000/api/webhooks/stripe" -WorkingDirectory $root -PassThru

    Start-Sleep -Seconds 1

    Write-Host 'Opening Chrome to http://localhost:3000 ...'
    $chrome = Start-Process -FilePath 'chrome.exe' -ArgumentList '--new-window','http://localhost:3000' -PassThru

    Write-Host 'Waiting for Chrome to close to shut down dev services...'
    while (Get-Process -Id $chrome.Id -ErrorAction SilentlyContinue) {
        Start-Sleep -Seconds 2
    }

    Write-Host 'Chrome closed. Stopping services...'

    $procs = @($stripe, $frontend, $backend, $mongo) | Where-Object { $_ -ne $null }
    foreach ($p in $procs) {
        try {
            if ($p -and (Get-Process -Id $p.Id -ErrorAction SilentlyContinue)) {
                Write-Host "Stopping PID $($p.Id) ..."
                Stop-Process -Id $p.Id -ErrorAction SilentlyContinue -Force
            }
        } catch {
            Write-Host "Warning stopping process $($p.Id): $_"
        }
    }

    Write-Host 'All done.'

} catch {
    Write-Host 'Error starting dev environment:' -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}
