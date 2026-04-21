const fs = require('fs');

const posts = [
  { slug: 'blog-1-leke-nedir', title: 'Leke Nedir?', image: 'photo-11.jpg', body: ['Leke; yüzeye temas eden bir maddenin, malzemenin liflerine veya dokusuna tutunarak kalıcı iz bırakmasıdır. Halılarda lekenin kalıcılığı; maddenin türüne, bekleme süresine ve yanlış temizleme yöntemlerine göre artar.', 'İlk müdahalede sert ovalama yerine, emici bez ile tampon uygulamak gerekir. Sıcak su bazı lekeleri sabitleyebileceği için kontrollü kullanılmalıdır. Özellikle çay, kahve, yağ ve mürekkep lekelerinde profesyonel işlem daha güvenlidir.', 'Halı Yıkama Merkezi olarak leke türünü analiz ederek halı tipine uygun temizlik süreci uygular, halınızın dokusunu koruyarak hijyenik sonuç elde ederiz.'] },
  { slug: 'blog-2-yanlis-hali-yikama', title: 'Yanlış Halı Yıkama', image: 'photo-10.jpg', body: ['Halı yıkamada en sık yapılan hatalar; uygunsuz deterjan kullanımı, yüksek basınçla sert yıkama ve yeterli durulama yapmamaktır. Bu hatalar halının renginde solmaya, liflerde sertleşmeye ve kötü kokuya yol açar.', 'Evde bilinçsiz uygulamalar kısa vadede temiz görünüm verse de uzun vadede halı ömrünü azaltır. Özellikle el dokuma veya yün halılarda profesyonel süreç şarttır.', 'Doğru yöntem, halı türüne özel kimyasal ve kontrollü makine kullanımıdır.'] },
  { slug: 'blog-3-teknikler', title: 'Halı Yıkama Teknikleri', image: 'photo-9.jpg', body: ['Profesyonel halı yıkamada ön kontrol, toz alma, leke ön işlemi, ana yıkama, durulama, kontrollü sıkma ve kurutma adımları uygulanır.', 'Makine halıları ile el dokuma halılar aynı teknikle temizlenmez. Lif yapısı, boya dayanımı ve dokuma sıklığı dikkate alınarak yöntem belirlenmelidir.', 'Halı Yıkama Merkezi halı tipine göre teknik seçimi yaparak hem temizlik hem de ürün güvenliği sağlar.'] },
  { slug: 'blog-4-hali-yikamada-havuz-sistemi', title: 'Halı Yıkamada Havuz Sistemi', image: 'photo-8.jpg', body: ['Havuz sistemi, halıların toplu su içinde bekletilerek temizlenmesini ifade eder. Bu sistem doğru filtreleme ve su yönetimi olmadan uygulandığında hijyen riski oluşturabilir.', 'Aynı suyun uzun süre kullanılması kir transferine neden olabilir. Bu nedenle modern tesislerde kontrollü su akışı ve ayrı işlem adımları tercih edilir.', 'Kalite için süreçlerin ürün bazlı yürütülmesi önemlidir.'] },
  { slug: 'blog-5-fason-hali-yikamacilar', title: 'Fason Halı Yıkamacılar', image: 'photo-7.jpg', body: ['Fason çalışma modelinde siparişi alan firma ile yıkamayı yapan tesis farklı olabilir. Bu durum kalite takibini zorlaştırır.', 'Müşteri açısından en güvenli yöntem, işi kendi tesisinde yürüten ve süreç şeffaflığı sunan firmalarla çalışmaktır.', 'Halı Yıkama Merkezi tüm süreçleri kontrol altında tutarak hizmet kalitesini standart hale getirir.'] },
  { slug: 'blog-6-detayli-hali-temizligi', title: 'Detaylı Halı Temizliği', image: 'photo-6.jpg', body: ['Detaylı temizlik, yalnızca yüzey kirini değil liflerin içine işleyen toz, bakteri ve kokuları da hedefler.', 'Ön toz alma, leke analizi ve çok aşamalı durulama hijyen kalitesini artırır.', 'Kurutma kontrolü yeterli yapılmadığında nem kaynaklı koku oluşabilir; bu yüzden profesyonel kurutma önemlidir.'] },
  { slug: 'blog-7-fiyatlar-nasil-belirleniyor', title: 'Fiyatlar Nasıl Belirleniyor?', image: 'photo-5.jpg', body: ['Fiyatlandırmada halının metrekaresi, türü, leke yoğunluğu ve ek hizmet ihtiyacı belirleyici olur.', 'El dokuma gibi hassas ürünlerde daha kontrollü işlem gerektiği için maliyet farklılaşabilir.', 'Şeffaf fiyat politikası için hizmet öncesi net bilgilendirme önemlidir.'] },
  { slug: 'blog-8-kuyu-suyu-ile-hali-yikama', title: 'Kuyu Suyu ile Halı Yıkama', image: 'photo-4.jpg', body: ['Kuyu suyu, mineral yoğunluğu ve sertlik derecesi nedeniyle bazı halılarda renk matlaşmasına veya lif sertleşmesine neden olabilir.', 'Suyun analiz edilmeden kullanılması profesyonel standartlarla uyumlu değildir.', 'Temizlik kalitesinde suyun kimyasal dengesi büyük rol oynar.'] },
  { slug: 'blog-9-hangi-hali-yikamaci', title: 'Hangi Halı Yıkamacı?', image: 'photo-3.jpg', body: ['Doğru firma seçerken referanslar, servis ağı, temizlik ürünleri, teslim süreci ve müşteri iletişimi birlikte değerlendirilmelidir.', 'Sadece fiyat odaklı seçim uzun vadede memnuniyetsizlik oluşturabilir.', 'Kurumsal firmalarda süreç daha izlenebilir olur ve olası sorunlarda hızlı geri dönüş sağlanır.'] },
  { slug: 'blog-10-profesyonel-hali-yikama', title: 'Profesyonel Halı Yıkama', image: 'photo-2.jpg', body: ['Profesyonel yıkama, halının yapısına uygun ekipman, kimyasal ve süreç yönetimi ile yapılır.', 'Ev tipi yöntemlerde görünmeyen kirler genellikle liflerde kalır.', 'Kurumsal tesislerde çok aşamalı işlem sayesinde daha kalıcı temizlik elde edilir.'] },
  { slug: 'blog-11-sicak-su-ile-hali-yikama', title: 'Sıcak Su ile Halı Yıkama', image: 'photo-1.jpg', body: ['Sıcak su, bazı kir türlerinde etkili sonuç verse de her halı tipi için uygun değildir.', 'Yanlış sıcaklık seviyesi boya akması ve lif deformasyonu riski doğurabilir.', 'Bu nedenle sıcak su uygulaması öncesinde halı türü analizi yapılmalıdır.'] }
];

const createPostHtml = (post) => `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${post.title} - Halı Yıkama Merkezi blog yazısı.">
  <title>${post.title} | Halı Yıkama Merkezi Blog</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <header>
    <div class="container">
      <a href="index.html" class="logo">Halı Yıkama Merkezi<span>.</span></a>
      <nav class="nav-links">
        <a href="index.html">Ana Sayfa</a><a href="hakkimizda.html">Hakkımızda</a><a href="hizmetler.html">Hizmetlerimiz</a><a href="hizmet-bolgeleri.html">Hizmet Bölgeleri</a><a href="blog.html" class="active">Blog</a><a href="iletisim.html">İletişim</a>
      </nav>
      <div class="header-cta"><a href="tel:+905436031212" class="phone"><i class="fas fa-phone-alt"></i> 0543 603 12 12</a></div>
      <button class="mobile-menu-btn" aria-label="Menu"><i class="fas fa-bars"></i></button>
    </div>
  </header>
  <section class="page-header"><div class="container"><h1>${post.title}</h1><div class="breadcrumb"><a href="blog.html">Blog</a> / <span>${post.title}</span></div></div></section>
  <section class="about-content"><div class="container" style="max-width:900px;">
    <img src="assets/images/${post.image}" class="blog-cover" alt="${post.title}">
    ${post.body.map((p) => `<p>${p}</p>`).join('\n    ')}
  </div></section>
  <section class="cta-banner"><div class="container"><a href="https://wa.me/905436031212" class="btn btn-whatsapp" target="_blank">WhatsApp ile Sorun</a></div></section>
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about"><a href="index.html" class="footer-logo">Halı Yıkama Merkezi<span>.</span></a></div>
        <div class="footer-links"><h4 class="footer-heading">Hızlı Menü</h4><ul><li><a href="blog.html">Blog</a></li><li><a href="iletisim.html">İletişim</a></li></ul></div>
        <div class="footer-contact"><h4 class="footer-heading">İletişim</h4><ul><li><i class="fas fa-phone-alt"></i><a href="tel:+905436031212">0543 603 12 12</a></li><li><i class="fab fa-whatsapp"></i><a href="https://wa.me/905436031212" target="_blank">0543 603 12 12</a></li></ul></div>
      </div>
    </div>
  </footer>
  <script src="js/script.js"></script>
</body>
</html>
`;

posts.forEach((post) => {
  fs.writeFileSync(`${post.slug}.html`, createPostHtml(post), 'utf8');
});

console.log('Blog pages generated.');
