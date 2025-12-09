$sourceDir = "C:\Users\krist\Pictures\dp-images"
$destBackgrounds = "c:\Users\krist\krissi-pimpin-pempire-new\diamondz-playhouse\frontend\public\assets\games\backgrounds"
$destSymbols = "c:\Users\krist\krissi-pimpin-pempire-new\diamondz-playhouse\frontend\public\assets\games\slots\symbols"

# Ensure directories exist
New-Item -ItemType Directory -Force -Path $destBackgrounds | Out-Null
New-Item -ItemType Directory -Force -Path $destSymbols | Out-Null

# Function to find and copy file
function Copy-Asset ($fileNamePart, $destName, $isSymbol=$true) {
    $destFolder = if ($isSymbol) { $destSymbols } else { $destBackgrounds }
    $files = Get-ChildItem -Path $sourceDir -Recurse -Filter "*$fileNamePart*"
    
    if ($files) {
        $file = $files | Select-Object -First 1
        $destPath = Join-Path $destFolder $destName
        Copy-Item -Path $file.FullName -Destination $destPath -Force
        Write-Host "Copied $($file.Name) to $destName"
    } else {
        Write-Warning "Could not find file matching *$fileNamePart*"
    }
}

# Backgrounds (Already done, but keeping for consistency)
Copy-Asset "d8bd6c20" "golden-limo-machine.jpg" $false
Copy-Asset "f9d7d55f" "vault-machine.jpg" $false

# Symbols (Guessing mapping based on unique UUIDs found in subfolders)
# You can swap these names if I guessed wrong!
Copy-Asset "0060e198" "pink-diamond.jpg" $true
Copy-Asset "355cf407" "pink-heels.jpg" $true
Copy-Asset "742a8c3c" "pimpin-paul.jpg" $true
Copy-Asset "b10bc39e" "yagi.jpg" $true

# Also copying root files just in case
Copy-Asset "1c6f25f0" "extra-symbol-1.jpg" $true
Copy-Asset "c541439c" "extra-symbol-2.jpg" $true
Copy-Asset "d0977be6" "extra-symbol-3.jpg" $true

