/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — DERS AKIŞLARI (ÖYG-1 ve ÖYG-2)
   Biçim için bkz. bilsem-akis.js. ÖYG kodları seviyeler arasında yinelendiği için
   kimlikler seviye önekiyle tutulur: oyg1.2.3, oyg2.2.2 …
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemAkis = MC.bilsemAkis || {};
(function (A) {
  const MCK = "../index.html", GEO = "../geometri/";

  /* ------------------------------ ÖYG-1 ------------------------------ */
  A["oyg1.1.1"] = {
    soru: "Pi sayısı insanlar onu bulmadan önce de var mıydı? Matematik keşfedilir mi, icat mi edilir?",
    adimlar: [
      ["Sessiz tartışma", 15, "Tahtaya 'Matematik icattır' ve 'Matematik keşiftir' yazılır. Öğrenciler yapışkan notlarla görüş ve merak ettikleri soruları ekler.", "a,b"],
      ["Tarihten tanıklar", 20, "Platon, Aristoteles, Kant, Hilbert, Gödel kartları dağıtılır; gruplar kartlarındaki düşünürün görüşünü özetler.", "c"],
      ["Kaynak sorgula", 15, "İnternetten bulunan iki alıntının gerçekten o kişiye ait olup olmadığı birincil kaynakla kontrol edilir.", "ç"],
      ["Münazara", 20, "İki takım, kanıt olarak birer matematik örneği (negatif sayılar, karmaşık sayılar, Fibonacci) kullanarak savunma yapar.", "d"],
    ],
    cikis: "Seçtiğin bir matematik nesnesi (sıfır, √−1, sonsuz) için 'icat mı keşif mi?' sorusuna gerekçeli bir cevap yaz.",
    zengin: "Wigner'in 'matematiğin akıl almaz etkinliği' fikrini bir paragrafla özetle ve eleştir.",
  };
  A["oyg1.2.1"] = {
    soru: "'Kendini içermeyen bütün kümelerin kümesi' kendini içerir mi?",
    adimlar: [
      ["Kuralı bul", 20, "Etkinlikte sayılar gizli kurallara göre Venn bölgelerine düşer; öğrenciler kuralı tahmin eder ve evrensel küme, alt küme, boş küme kavramlarını adlandırır.", "a"],
      ["Tutarsızlık avı", 15, "'Boş küme her kümenin alt kümesidir', 'Evrensel küme her şeyi içerir' gibi cümlelerdeki gizli varsayımlar aranır.", "b"],
      ["Russell paradoksu", 20, "Berber paradoksu ile başlanır, Russell paradoksuna geçilir. Neden 'her şeyin kümesi' tanımının sorun çıkardığı tartışılır.", "b,c"],
      ["Argüman yaz", 15, "Gruplar 'boş küme her kümenin alt kümesidir' önermesini 'aksi olsaydı…' diye başlayan bir argümanla savunur.", "c"],
    ],
    cikis: "Boş kümenin her kümenin alt kümesi olduğunu iki cümlelik bir gerekçeyle açıkla.",
    zengin: "{1, 2, 3} kümesinin kaç alt kümesi var? n elemanlı küme için genelle ve nedenini açıkla.",
    etkinlik: ["venn"],
  };
  A["oyg1.2.2"] = {
    soru: "Rastgele dağılmış 12 kartla, herkesin 'aaa, bu bir örüntü!' diyeceği bir dizi kurabilir misin?",
    adimlar: [
      ["Parça seç", 15, "Her gruba karışık sayı, harf ve şekil kartları verilir; örüntüye uygun alt kümeler ayrılır.", "a"],
      ["İlişki kur", 20, "Seçilen parçalar arasındaki ilişki (artış, dönme, simetri, alfabe sırası) yazılır.", "b"],
      ["Özgün örüntü", 25, "Gruplar iki farklı ilişkiyi birleştiren bir örüntü tasarlar (ör. sayı + şekil dönmesi). Diğer gruplar kuralı çözmeye çalışır.", "c"],
    ],
    cikis: "Tasarladığın örüntünün 10. elemanını ve kuralını yaz.",
  };
  A["oyg1.2.3"] = {
    soru: "Satranç tahtasının bir köşesinden karşı köşesine yalnızca sağa ve yukarı giderek kaç farklı yoldan gidilir?",
    adimlar: [
      ["Bileşenler", 10, "Izgara boyutu, hareket kuralı, aranan sayı; neyi saydığımız netleştirilir.", "a,b"],
      ["Küçükten başla", 15, "Etkinlikte 2×2, 2×3, 3×3 ızgaralarda yollar sayılır; öğrenciler sayıları kendi temsilleriyle (harf dizisi SSY…) kaydeder.", "c,ç"],
      ["Strateji", 15, "Her noktaya gelen yol sayısı = soldan gelen + alttan gelen. Pascal üçgeni ızgarada belirir.", "d,e"],
      ["Engel koy", 15, "Izgaraya bir engel konur; strateji yeniden uygulanır, sonuç kontrol edilir.", "f"],
      ["İkinci yol", 15, "Aynı problem 'n tane S ve m tane Y harfinin dizilişi' olarak kombinasyonla çözülür; iki strateji karşılaştırılır.", "g"],
    ],
    cikis: "4×3'lük ızgarada kaç yol vardır? İki farklı yolla göster.",
    zengin: "Köşegeni geçmeyen yolların sayısı nedir? (Catalan sayıları)",
    etkinlik: ["sayma"],
  };
  A["oyg1.2.4"] = {
    soru: "Taksi A'nın açılışı 40 TL, km'si 25 TL. Taksi B'nin açılışı 70 TL, km'si 20 TL. Hangisine binmelisin?",
    adimlar: [
      ["Bileşenler", 10, "Açılış ücreti, km başı ücret, gidilen yol: sabitler, değişkenler, bağımlı ve bağımsız değişken belirlenir.", "a,b"],
      ["Üç temsil", 20, "Etkinlikte iki tarife tablo, grafik ve denklem olarak yan yana gösterilir.", "c,ç"],
      ["Tahmin ve strateji", 15, "Öğrenciler kesişim noktasını tahmin eder; tablo, grafik ve denklem çözme stratejileri denenir.", "d,e,f"],
      ["Kısa yol", 10, "'Fark kadar açılış farkını kapatır' akıl yürütmesiyle (30 ÷ 5 = 6 km) kısa yol bulunur.", "g"],
      ["Genelle", 15, "Üçüncü bir tarife (sabit ücret) eklenir; strateji genellenir ve farklı değerlerle sınanır.", "ğ,h"],
    ],
    cikis: "Hangi mesafeden sonra B daha ucuzdur? Denklemle göster.",
    zengin: "Üç tarifenin her biri hangi mesafe aralığında en ucuz? Parçalı bir karar kuralı yaz.",
    etkinlik: ["tarife"],
    baglanti: [["Fonksiyon Yarışı", MCK + "#fonksiyon"]],
  };
  A["oyg1.3.1"] = {
    soru: "Okul kantininde kuyruğu kısaltmak için hangi matematiksel karar verilebilir?",
    adimlar: [
      ["Problemi sahiplen", 15, "Gruplar okuldan gerçek bir problem seçer (kuyruk, servis güzergâhı, sınıf yerleşimi).", "a"],
      ["Strateji kur", 20, "Gerekli veriler, varsayımlar ve hesap yolu planlanır.", "a"],
      ["Çöz", 25, "Gruplar ölçüm ya da tahminle veri toplar ve çözüm önerisini hesaplar.", "b"],
      ["Kontrol", 15, "Öneri, gerçek durumla ya da başka grubun verisiyle sınanır.", "c"],
    ],
    cikis: "Önerinin hangi varsayıma dayandığını ve o varsayım yanlışsa ne olacağını yaz.",
  };
  A["oyg1.3.2"] = {
    soru: "Bir ayak izinden o kişinin boyunu tahmin edebilir miyiz?",
    adimlar: [
      ["Araçları tanı", 15, "Elektronik tablo, GeoGebra ve grafik hesap makinesi; hangisinin hangi işe yaradığı tartışılır.", "a"],
      ["Veri topla", 20, "Sınıfta ayak uzunluğu ve boy ölçülür, tabloya işlenir.", "b"],
      ["Model kur", 25, "Saçılım grafiği çizilir, en uygun doğru yerleştirilir, model denklemi yazılır.", "c"],
      ["Tahmin et", 15, "Model başka bir sınıfın ayak iziyle sınanır; hata tartışılır.", "c"],
    ],
    cikis: "Modelin 28 cm'lik ayak izi için ne tahmin ediyor? Bu tahmine ne kadar güvenirsin?",
  };
  A["oyg1.4.1"] = {
    soru: "'Her öğrenci en az bir soruyu çözdü' cümlesi bir bilgisayara nasıl anlatılır?",
    adimlar: [
      ["Blokları oku", 20, "Scratch örneklerindeki 've', 'veya', 'değil' blokları ile 'her biri için' döngüleri bulunur.", "a"],
      ["Mantığa çevir", 20, "Bloklar ∧, ∨, ¬, ∀, ∃ sembolleriyle yazılır; doğruluk tabloları kurulur.", "b"],
      ["Hata avı", 20, "Yanlış koşul yazılmış kod parçalarında hata bulunur ve düzeltilir.", "a,b"],
    ],
    cikis: "'Tüm sayılar çift değildir' ile 'Hiçbir sayı çift değildir' farkını bir blok koduyla göster.",
  };
  A["oyg1.4.2"] = {
    soru: "'Bazı kuğular siyahtır' cümlesini çürütmek mi daha kolay, 'Bütün kuğular beyazdır' cümlesini mi?",
    adimlar: [
      ["Gözden geçir", 15, "Önceki derste yazılan algoritmalardaki bağlaç ve niceleyiciler listelenir.", "a"],
      ["İspatta niceleyici", 25, "∀ için ispat, ∃ için örnek; ∀'yı çürütmek için tek karşı örnek yeter. Örnek önermelerle çalışılır.", "b"],
      ["Matematik dili", 20, "Günlük dildeki 'veya' ile mantıktaki 'veya' farkı tartışılır.", "c"],
    ],
    cikis: "'Her asal sayı tektir' önermesini çürüten örneği yaz ve önermenin değilini niceleyiciyle ifade et.",
  };
  A["oyg1.4.3"] = {
    soru: "Bir mesajı, anahtarı bilmeyen kimsenin okuyamayacağı şekilde nasıl şifrelersin?",
    adimlar: [
      ["Strateji", 20, "Sezar şifresinden Affine şifresine (y = ax + b mod 29) geçilir; şifreleme adımları algoritma olarak yazılır.", "a"],
      ["Çöz", 25, "Gruplar birbirlerine şifreli mesaj gönderir ve anahtarla çözer.", "b"],
      ["Kontrol", 15, "a hangi değerleri alırsa şifre geri çözülebilir? EBOB koşulu fark edilir.", "c"],
    ],
    cikis: "a = 2 seçilirse Türk alfabesiyle Affine şifresinde ne sorun çıkar?",
  };
  A["oyg1.5.1"] = {
    soru: "Bir tek sayının karesi 8'e bölününce neden hep 1 kalanını verir?",
    adimlar: [
      ["Örnekle başla", 15, "1², 3², 5², 7², 9² … 8'e bölünür; örüntü tahmin edilir.", "a"],
      ["Cebirsel ispat", 25, "(2k + 1)² = 4k(k + 1) + 1 ve k(k + 1)'in çift olduğu gösterilir.", "a"],
      ["Yeni küme", 20, "Aynı yöntem 3'e bölünmeyen sayıların karesine uyarlanır (3k ± 1).", "b"],
    ],
    cikis: "İki ardışık tam sayının çarpımının çift olduğunu ispatla.",
    baglanti: [["Bilgi Köşesi: Kavram Yanılgıları", MCK + "#bilgi-yanilgi"]],
  };
  A["oyg1.5.2"] = {
    soru: "Bir yıldızın beş ucundaki açıların toplamı kaçtır, yıldız ne kadar çarpık olursa olsun?",
    adimlar: [
      ["Ölç ve tahmin et", 15, "Farklı beş köşeli yıldızlar çizilip uç açıları ölçülür; toplam 180° çıkar.", "a"],
      ["İspat", 25, "Üçgenin dış açı özelliği ile ispat kurulur.", "a"],
      ["Uyarla", 20, "Yedi köşeli yıldızlar için genelleme denenir.", "b"],
    ],
    cikis: "Düzgün n-genin bir iç açısını neden (n − 2)·180° / n ile hesaplarız?",
    baglanti: [["Geometri: Üçgen Laboratuvarı", GEO + "#ucgen"]],
  };
  A["oyg1.6.1"] = {
    soru: "Sınıftaki herkesin en sevdiği şarkının temposu ders çalışma süresiyle ilişkili mi?",
    adimlar: [
      ["Durum fark et", 10, "Kategorik, nicel ve resim, metin, ses gibi geleneksel olmayan veri örnekleri sınıflandırılır.", "a"],
      ["Soru yaz", 15, "Betimleme ve karşılaştırma soruları yazılır.", "b"],
      ["Araç ve plan", 20, "Anket ya da ölçüm aracı tasarlanır, toplama süreci planlanır.", "c,ç,d"],
      ["Analiz", 20, "Ortalama, medyan, açıklık hesaplanır; uygun grafik seçilir.", "e,f"],
      ["Sonuç ve değerlendirme", 15, "Bulgular araştırma sorusuna ne kadar cevap veriyor? Sınırlılıklar yazılır.", "g,ğ"],
    ],
    cikis: "Araştırma sorunu cevaplamak için hangi istatistiksel ölçüyü seçtin ve neden?",
  };
  A["oyg1.6.2"] = {
    soru: "100 kişilik bir anketin ortalamasını elle mi hesaplarız, yoksa bir araç mı kullanırız?",
    adimlar: [
      ["Araçları tanı", 15, "Excel, CODAP ve GeoGebra'nın veri araçları gösterilir.", "a"],
      ["Seç", 15, "Gruplar ellerindeki veri setine en uygun aracı seçip gerekçelendirir.", "b"],
      ["Analiz et", 30, "Seçilen araçla grafik ve özet istatistikler üretilir; sonuçlar sunulur.", "c"],
    ],
    cikis: "Kullandığın aracın yaptığı bir işi elle yapsaydın ne kadar sürerdi?",
  };
  A["oyg1.7.1"] = {
    soru: "Paralel doğrular bir gün kesişebilir mi? Öklid'in beşinci postulatı neden 2000 yıl tartışıldı?",
    adimlar: [
      ["Temeller", 20, "Öklid'in beş postulatı okunur; ilk dördünün neden 'apaçık' kabul edildiği konuşulur.", "a"],
      ["Çelişki avı", 20, "Beşinci postulatı ispatlama girişimlerindeki gizli varsayımlar aranır.", "b"],
      ["Kabul mü, ret mi?", 20, "Küre yüzeyinde postulatın bozulduğu gösterilir; postulatın reddedilebileceği tartışılır.", "c"],
    ],
    cikis: "Bir aksiyomu 'ispatlanamayan ama kabul edilen' bir cümle olarak açıkla ve bir örnek ver.",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };
  A["oyg1.7.2"] = {
    soru: "Selçuklu yıldız desenleri yalnızca cetvel ve pergelle mi çizildi?",
    adimlar: [
      ["Araçlar", 15, "Cetvel-pergel, kareli kâğıt ve dinamik geometri yazılımı tanıtılır.", "a"],
      ["Deseni çöz", 20, "Bir geometrik desenin temel ızgarası ve simetri ekseni bulunur.", "b"],
      ["İnşa", 30, "Öğrenciler deseni seçtikleri araçla yeniden inşa eder.", "c"],
    ],
    cikis: "Desenindeki dönme simetrisinin derecesi kaçtır?",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };

  /* ------------------------------ ÖYG-2 ------------------------------ */
  A["oyg2.1.1"] = {
    soru: "Bir problemi çözene bir milyon dolar verilse ve 25 yıldır yalnızca biri çözülmüş olsa, bu bize matematik hakkında ne söyler?",
    adimlar: [
      ["Yedi problem", 15, "Clay Enstitüsü'nün yedi milenyum problemi tanıtılır; Poincaré sanısının çözüldüğü vurgulanır.", "a"],
      ["Soru üret", 15, "Gruplar seçtikleri problem için 'neden önemli, neden zor?' soruları yazar.", "b"],
      ["Araştır", 25, "Grup, güvenilir kaynaklardan (Clay sitesi, ansiklopedi) kısa bir bilgi kartı hazırlar.", "c,ç"],
      ["Felsefi çıkarım", 15, "Perelman'ın ödülü reddetmesi üzerinden matematikçi motivasyonu tartışılır.", "d"],
    ],
    cikis: "Seçtiğin milenyum probleminin çözülmesi günlük hayatta neyi değiştirebilirdi?",
    baglanti: [["Bilgi Köşesi: Çözülmemiş Problemler", MCK + "#bilgi-acik"]],
  };
  A["oyg2.1.2"] = {
    soru: "Bir sayının ne kesir ne de sonlu ondalık olarak yazılamayacağını öğrenmek Pisagorcuları neden korkuttu?",
    adimlar: [
      ["Bunalımları belirle", 15, "√2'nin irrasyonelliği, sanal sayılar ve Russell paradoksu kısa hikâyelerle tanıtılır.", "a"],
      ["Soru sor", 15, "Her bunalım için 'neyi bozdu, nasıl aşıldı?' soruları yazılır.", "b"],
      ["√2 ispatı", 20, "Çelişki yöntemiyle √2'nin irrasyonel olduğu birlikte ispatlanır.", "c,ç"],
      ["Felsefi çıkarım", 15, "Bunalımlar matematiği zayıflattı mı, güçlendirdi mi? Münazara.", "d"],
    ],
    cikis: "Bir matematiksel bunalımın matematiği nasıl genişlettiğini bir örnekle yaz.",
  };
  A["oyg2.2.1"] = {
    soru: "1, 1, 2, 3, 5, 8 … Bu diziyi 1000. terime kadar elle mi yazarsın, yoksa bir makineye mi yaptırırsın?",
    adimlar: [
      ["Araçlar", 10, "Elektronik tablo formülleri ve Python döngüleri kısa örneklerle tanıtılır.", "a"],
      ["Fonksiyonu bul", 20, "Kare, üçgensel ve Fibonacci dizilerinin kuralını yazmaya uygun araç seçilir.", "b"],
      ["Algoritmayı kur", 25, "Gruplar seçtikleri diziyi tabloda ya da Python'da üretir.", "c"],
      ["Ölç ve yargıla", 15, "Doğruluk, hız ve okunabilirlik ölçütleriyle iki algoritma (döngü / formül) karşılaştırılır.", "ç,d,e,f"],
    ],
    cikis: "Fibonacci için döngü ile Binet formülünü hangi ölçütte karşılaştırdın, sonuç ne oldu?",
    etkinlik: ["cokgensel"],
    baglanti: [["Görsel Laboratuvar: Fibonacci Spirali", MCK + "#laboratuvar-fib"], ["Bilgi Köşesi: Algoritmalar", MCK + "#bilgi-algoritma"]],
  };
  A["oyg2.2.2"] = {
    soru: "40 metrelik bir çitle bahçeye en büyük dikdörtgen alanı nasıl çevirirsin?",
    adimlar: [
      ["Bileşenler", 10, "Çit uzunluğu sabit, genişlik değişken, alan bağımlı değişken olarak belirlenir.", "a,b"],
      ["Tablo ve grafik", 20, "Etkinlikte genişlik kaydırılır; alan tablosu ve parabol aynı anda oluşur.", "c,ç"],
      ["Tahmin ve çözüm", 15, "Tepe noktası tahmin edilir; A(x) = x(20 − x) tepe noktası formülüyle doğrulanır.", "d,e,f"],
      ["Kısa yol", 10, "Simetri ekseni: köklerin ortası. Kökleri bilmek tepeyi verir.", "g"],
      ["Genelle", 15, "Bir kenarı duvar olan bahçe ve top atışı modeli aynı stratejiyle çözülür; sonuçlar örneklerle sınanır.", "ğ,h"],
    ],
    cikis: "Bir kenarı duvar olan bahçede 40 m çitle en büyük alan kaç m²dir?",
    zengin: "Çevresi sabit olan dikdörtgenlerden alanı en büyük olanın kare olduğunu genel olarak ispatla.",
    etkinlik: ["parabol"],
  };
  A["oyg2.3.1"] = {
    soru: "Bir dönme dolabın yolcu kabini zamanla nasıl yükselip alçalır? Grafiğini çizebilir misin?",
    adimlar: [
      ["Bileşenler", 10, "Yarıçap, merkez yüksekliği, tur süresi; zaman bağımsız değişken.", "a,b"],
      ["Temsil", 20, "Tablo ve grafik oluşturulur; dalga biçimi fark edilir.", "c,ç"],
      ["Tahmin ve strateji", 20, "Kabin 2,5 dakika sonra nerede? Model kurularak hesaplanır.", "d,e,f"],
      ["Gözden geçir ve genelle", 15, "Farklı boyutta dolaplar için model genellenir ve sınanır.", "g,ğ,h"],
    ],
    cikis: "Modelinde yarıçap iki katına çıkarsa grafikte ne değişir?",
    etkinlik: ["trigo"],
  };
  A["oyg2.3.2"] = {
    soru: "Bir salgının yayılmasını tahmin etmek için hangi araçlar gerekir?",
    adimlar: [
      ["Araçları tanı", 15, "Elektronik tablo, GeoGebra ve Desmos'un modelleme özellikleri gösterilir.", "a"],
      ["Seç", 15, "Gruplar ellerindeki modelleme problemine uygun aracı seçer.", "b"],
      ["Kullan", 30, "Seçilen araçla model kurulur, parametreler değiştirilerek sonuçlar karşılaştırılır.", "c"],
    ],
    cikis: "Aracın modelinde hangi parametreyi değiştirmeni kolaylaştırdı?",
  };
  A["oyg2.4.1"] = {
    soru: "Bir labirentten çıkmak için sağ eli duvardan hiç ayırmamak her zaman işe yarar mı?",
    adimlar: [
      ["Yapıları tanı", 15, "Graf, düğüm, kenar; DFS (derine dal) ve BFS (katman katman yayıl) yöntemleri oyunla canlandırılır.", "a,b"],
      ["Diyagram", 15, "Bir metro haritası ya da labirent grafa dönüştürülür ve sözel olarak anlatılır.", "c,ç"],
      ["Strateji ve çözüm", 20, "En kısa yol için BFS uygulanır; adımlar tabloya işlenir.", "d,e,f"],
      ["Deneyimden çıkarım", 15, "DFS ve BFS ne zaman avantajlı? Benzer problemlerde denenir.", "g,ğ,h"],
    ],
    cikis: "En kısa yolu bulmak için hangi yöntemi seçersin? Neden?",
  };
  A["oyg2.4.2"] = {
    soru: "Bir şifreli metinde en sık geçen harf neden genellikle 'a' ya da 'e' harfine karşılık gelir?",
    adimlar: [
      ["Gözlem", 20, "Affine ile şifrelenmiş bir Türkçe metinde harf sıklıkları sayılır.", "a"],
      ["Örüntü", 20, "Sıklık örüntüsü Türkçenin harf sıklığıyla karşılaştırılır.", "b"],
      ["Genelle", 20, "İki harf eşleşmesinden a ve b anahtarları cebirsel olarak bulunur.", "c"],
    ],
    cikis: "Affine şifresini kırmak için kaç harf eşleşmesi yeterlidir? Neden?",
  };
  A["oyg2.4.3"] = {
    soru: "Kilidi herkese dağıtıp anahtarı yalnızca kendinde tutabilir misin?",
    adimlar: [
      ["İncele", 20, "Simetrik (Affine, DES) ve asimetrik (RSA) şifreleme mantığı kilit-anahtar benzetmesiyle karşılaştırılır.", "a"],
      ["Nitelikler", 15, "Hız, anahtar paylaşımı ve güvenlik açısından tablo oluşturulur.", "b"],
      ["Yeni yöntem", 25, "Gruplar benzerliklerden yola çıkarak kendi şifreleme yöntemlerini tasarlar.", "c"],
    ],
    cikis: "RSA'da neden çok büyük iki asal sayı seçilir?",
    baglanti: [["Sayı Dedektörü (çarpanlara ayırma)", MCK + "#dedektor"]],
  };
  A["oyg2.5.1"] = {
    soru: "Bir çemberin içine çizilen dörtgenin karşılıklı açıları neden hep 180° tutar?",
    adimlar: [
      ["Gözlem", 15, "Dinamik çizimde kirişler dörtgeninin açıları ölçülür.", "a"],
      ["Yöntem seç", 25, "Çevre açı teoremi ile doğrudan ispat yapılır; dolaylı ispatla karşılaştırılır.", "a"],
      ["Değerlendir", 20, "Hangi ispat daha kısa, hangisi daha 'güzel'? Sınıf tartışır.", "b"],
    ],
    cikis: "Kullandığın ispat yöntemini bir cümleyle tanımla.",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };
  A["oyg2.6.1"] = {
    soru: "Bir zarı ilk 6 gelene kadar kaç kez atman gerekir? Ortalama?",
    adimlar: [
      ["Tanımla", 20, "Bernoulli, binom, geometrik ve hipergeometrik dağılımlar birer deneyle tanıtılır.", "a"],
      ["Sorgula", 15, "Her dağılım için 'ne sayıyoruz, ne sabit?' soruları sorulur.", "b"],
      ["Bilgi ve doğrulama", 20, "Simülasyon sonuçları formülle karşılaştırılır.", "c,ç"],
      ["Çıkarım", 15, "Geometrik dağılımda ortalamanın 1/p olduğu çıkarılır.", "d"],
    ],
    cikis: "Hipergeometrik ile binom dağılımı arasındaki tek farkı yaz.",
  };
  A["oyg2.6.2"] = {
    soru: "'İadesiz çekiliş' ile 'iadeli çekiliş' aynı soruya farklı cevap verir mi?",
    adimlar: [
      ["Ölçüt", 15, "Deney sayısı sabit mi? Başarı olasılığı değişiyor mu? Ölçütler listelenir.", "a"],
      ["Ayrıştır", 20, "Problem kartları ölçütlere göre ayrılır.", "b"],
      ["Tasnif ve etiket", 20, "Kartlar dört dağılım kutusuna yerleştirilir ve etiketlenir.", "c,ç"],
    ],
    cikis: "'Bir torbadan iadesiz 3 top çekiliyor' problemi hangi dağılımdır? Gerekçe yaz.",
  };
  A["oyg2.7.1"] = {
    soru: "Okulumuzdaki öğrencilerin uyku süresini yalnızca 30 kişiye sorarak tahmin edebilir miyiz?",
    adimlar: [
      ["Durum ve soru", 15, "Gerçek yaşam durumu seçilir, araştırma soruları yazılır.", "a,b"],
      ["Plan ve veri", 20, "Örneklem planı yapılır; veriler toplanır ve düzenlenir.", "c,ç"],
      ["Analiz", 20, "Uygun ölçü ve grafikle analiz edilir.", "d,e"],
      ["İnformal çıkarım", 15, "Örneklemden evrene çıkarım yapılır; başka bir örneklem farklı sonuç verir miydi?", "f,g"],
    ],
    cikis: "Örneklemin evreni temsil edip etmediğini nasıl kontrol edersin?",
  };
  A["oyg2.7.2"] = {
    soru: "Python ile 1000 satırlık veriyi saniyeler içinde özetleyebilir miyiz?",
    adimlar: [
      ["Tanı", 15, "Python, Jamovi ve JASP arayüzleri kısa örneklerle gösterilir.", "a"],
      ["Seç", 15, "Veri setine göre araç seçilir.", "b"],
      ["Kullan", 30, "Özet istatistikler ve grafikler üretilir; yorumlanır.", "c"],
    ],
    cikis: "Aracın verdiği bir çıktının ne anlama geldiğini kendi cümlenle yaz.",
  };
  A["oyg2.8.1"] = {
    soru: "Pisagor teoremi ile iki nokta arasındaki uzaklık formülü aslında aynı şey mi?",
    adimlar: [
      ["Gözlem", 20, "Koordinat düzleminde iki nokta seçilir; aradaki uzaklık dik üçgenle bulunur.", "a"],
      ["Benzerlik", 20, "Eğim ile tanjant, uzaklık ile Pisagor arasındaki benzerlikler tabloya yazılır.", "b"],
      ["Çıkarım", 20, "Paralel ve dik doğruların eğimleri arasındaki ilişki çıkarılır.", "c"],
    ],
    cikis: "Eğimi 2 olan bir doğruya dik doğrunun eğimi kaçtır? Geometrik gerekçe ver.",
    etkinlik: ["tarife"],
  };
})(MC.bilsemAkis);
