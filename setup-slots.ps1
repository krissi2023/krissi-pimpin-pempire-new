$symbolsDir = "c:\Users\krist\krissi-pimpin-pempire-new\diamondz-playhouse\frontend\public\assets\games\slots\symbols"

# Define source mappings (using what we know exists)
$mappings = @{
    "gold-chain.jpg" = "extra-symbol-1.jpg"
    "cash-stack.jpg" = "extra-symbol-2.jpg"
    "wild-diamond.jpg" = "extra-symbol-3.jpg"
    "vault-key.jpg" = "extra-symbol-1.jpg"
    "gold-bar.jpg" = "extra-symbol-2.jpg"
    "money-clip.jpg" = "pimpin-paul.jpg"
    "double-bar.jpg" = "yagi.jpg"
}

foreach ($target in $mappings.Keys) {
    $source = $mappings[$target]
    $sourcePath = Join-Path $symbolsDir $source
    $targetPath = Join-Path $symbolsDir $target
    
    if (-not (Test-Path $targetPath)) {
        if (Test-Path $sourcePath) {
            Copy-Item -Path $sourcePath -Destination $targetPath
            Write-Host "Created $target from $source"
        } else {
            Write-Warning "Source $source not found, cannot create $target"
        }
    } else {
        Write-Host "$target already exists"
    }
}
