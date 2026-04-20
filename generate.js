const fs = require('fs');

const districts = [
    "Beşiktaş", "Şişli", "Kadıköy", "Üsküdar", "Fatih", 
    "Beyoğlu", "Sarıyer", "Bakırköy", "Bahçelievler", 
    "Bağcılar", "Gaziosmanpaşa", "Kağıthane", "Güngören", 
    "Esenler", "Esenyurt", "Beylikdüzü", "Büyükçekmece", 
    "Küçükçekmece", "Avcılar", "Arnavutköy", "Sultangazi", 
    "Zeytinburnu", "Eyüp", "Bayrampaşa", "Silivri", 
    "Çatalca", "Başakşehir"
];

const templatePath = 'district-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf8');

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

districts.forEach(district => {
    const slug = convertToSlug(district);
    const fileName = `${slug}-hali-yikama.html`;
    
    const newContent = templateContent.replace(/\{\{DISTRICT\}\}/g, district);
    
    fs.writeFileSync(fileName, newContent, 'utf8');
    console.log(`Created: ${fileName}`);
});

console.log('All district pages generated successfully.');
