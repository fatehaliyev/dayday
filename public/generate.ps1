$districts = @(
    "Beşiktaş", "Şişli", "Kadıköy", "Üsküdar", "Fatih", 
    "Beyoğlu", "Sarıyer", "Bakırköy", "Bahçelievler", 
    "Bağcılar", "Gaziosmanpaşa", "Kağıthane", "Güngören", 
    "Esenler", "Esenyurt", "Beylikdüzü", "Büyükçekmece", 
    "Küçükçekmece", "Avcılar", "Arnavutköy", "Sultangazi", 
    "Zeytinburnu", "Eyüp", "Bayrampaşa", "Silivri", 
    "Çatalca", "Başakşehir"
)

$templatePath = "district-template.html"
$templateContent = Get-Content -Path $templatePath -Raw -Encoding UTF8

function Convert-ToSlug {
    param([string]$text)
    
    $text = $text.ToLower()
    $text = $text.Replace('ş', 's').Replace('ı', 'i').Replace('ğ', 'g').Replace('ü', 'u').Replace('ö', 'o').Replace('ç', 'c')
    $text = $text -replace '[^a-z0-9]', '-'
    $text = $text -replace '-+', '-'
    $text = $text.Trim('-')
    
    return $text
}

foreach ($district in $districts) {
    $slug = Convert-ToSlug -text $district
    $fileName = "$slug-hali-yikama.html"
    
    $newContent = $templateContent -replace '\{\{DISTRICT\}\}', $district
    
    Set-Content -Path $fileName -Value $newContent -Encoding UTF8
    Write-Host "Created: $fileName"
}
Write-Host "All district pages generated successfully."
