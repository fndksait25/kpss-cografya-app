Add-Type -AssemblyName System.Drawing

function ResizeAndSaveImage($sourcePath, $destPath, $width, $height) {
    if (Test-Path $sourcePath) {
        try {
            $bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
            $newBmp = New-Object System.Drawing.Bitmap($width, $height)
            $graphics = [System.Drawing.Graphics]::FromImage($newBmp)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawImage($bmp, 0, 0, $width, $height)
            $newBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $graphics.Dispose()
            $newBmp.Dispose()
            $bmp.Dispose()
            Write-Host "Successfully resized $sourcePath to $width x $height -> $destPath"
            Remove-Item $sourcePath -Force
        } catch {
            Write-Host "Error processing $sourcePath : $_"
        }
    } else {
        Write-Host "File not found: $sourcePath"
    }
}

ResizeAndSaveImage "C:\Users\Etu\Desktop\112\icon-192.png.jpg" "C:\Users\Etu\Desktop\112\icon-192.png" 192 192
ResizeAndSaveImage "C:\Users\Etu\Desktop\112\icon-512.png.png" "C:\Users\Etu\Desktop\112\icon-512.png" 512 512
