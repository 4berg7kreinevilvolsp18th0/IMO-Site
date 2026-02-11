$files = @(
    "c:\Users\Kreig\IMO-Neobrutalism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Glassmorphism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Minimalism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Retrofuturism\app\layout.tsx",
    "c:\Users\Kreig\IMO-Ocean-Classic\app\layout.tsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    $pattern = '(?s)(<head>\s*<link rel="icon" href="/favicon\.ico" />)\s*\{/\* Шрифты: Nasalization \(заголовки\) \+ Ubuntu \(текст\) \*/\}\s*<link rel="preconnect" href="https://fonts\.googleapis\.com"[^>]*/>\s*<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*/>\s*<link[^>]*href="https://fonts\.googleapis\.com/css2[^"]*"[^>]*/>\s*</head>'
    $replacement = '$1
      </head>'
    $content = $content -replace $pattern, $replacement
    Set-Content $file $content -NoNewline -Encoding UTF8
    Write-Host "Fixed head: $file"
}
