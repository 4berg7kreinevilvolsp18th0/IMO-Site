$files = @(
    "c:\Users\Kreig\IMO-Neobrutalism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Glassmorphism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Minimalism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Retrofuturism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Ocean-Classic\app\layout.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $content = $content -replace "import \{ Ubuntu \} from 'next/font/google';`r?`n`r?`n", ""
        $content = $content -replace "const ubuntu = Ubuntu\(\{[^}]+\}\);`r?`n`r?`n", ""
        $content = $content -replace 'className=\{ubuntu\.variable\}', 'className=""'
        $content = $content -replace 'className=\{`bg-imo-deep text-white antialiased font-body \$\{ubuntu\.variable\}\`\}', 'className="bg-imo-deep text-white antialiased font-body"'
        $content = $content -replace '(?s)\s*\{/\* Шрифты: Nasalization \(заголовки\) \+ Ubuntu \(текст\) \*/\}\s*<link rel="preconnect" href="https://fonts\.googleapis\.com"[^>]*/>\s*<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*/>\s*<link[^>]*href="https://fonts\.googleapis\.com/css2[^"]*"[^>]*/>', ''
        $content = $content -replace '(?s)(<head>\s*<link rel="icon" href="/favicon\.ico" />)\s*\{/\*[^}]*\*/\}\s*<link rel="preconnect" href="https://fonts\.googleapis\.com"[^>]*/>\s*<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*/>\s*<link[^>]*href="https://fonts\.googleapis\.com[^"]*"[^>]*/>\s*', '$1'
        Set-Content $file $content -NoNewline -Encoding UTF8
        Write-Host "Updated: $file"
    } else {
        Write-Host "File not found: $file"
    }
}
