/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — DERS AKIŞLARI (ÖYG-3 ve PÜY)
   Biçim için bkz. bilsem-akis.js.
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemAkis = MC.bilsemAkis || {};
(function (A) {
  const MCK = "../index.html", GEO = "../geometri/";

  /* ------------------------------ ÖYG-3 ------------------------------ */
  A["oyg3.1.1"] = {
    soru: "Bir grafiğe bakarak 'bu bir fonksiyon değil' demek için tek bir dikey çizgi yeter mi?",
    adimlar: [
      ["Nitel özellikler", 25, "Gerçek bağlamlı grafikler (sıcaklık, hız, nüfus) üzerinde tanım ve değer aralığı, işaret, artanlık-azalanlık, simetri ve sınırlılık belirlenir.", "a"],
      ["Fonksiyon mu?", 20, "Çember, parabol, yatay parabol ve parçalı grafikler dikey doğru testiyle sınıflandırılır.", "b"],
      ["Grafik eşleştir", 20, "Sözel betimlemeler ('önce hızla artar, sonra sabitlenir') ile grafikler eşleştirilir; gerekçeler yazılır.", "a,b"],
    ],
    cikis: "Tanım aralığı [0, 5], değer aralığı [−1, 3] olan, artan olmayan bir fonksiyon grafiği çiz.",
    etkinlik: ["ters"],
  };
  A["oyg3.1.2"] = {
    soru: "Bir fonksiyonu tersine çevirmek, grafiğini aynaya tutmak gibi midir? Hangi ayna?",
    adimlar: [
      ["Varsayım", 15, "Etkinlikte y = 2x + 1, y = x², y = x³ seçilir; öğrenciler tersinin grafiğinin nasıl görüneceğini tahmin eder.", "a"],
      ["Örüntü ve genelleme", 20, "y = x doğrusuna göre yansıma gösterilir; tablolardaki x ve y yer değiştirmesi listelenir.", "b"],
      ["Karşılaştır", 15, "y = x²'nin tersi neden fonksiyon değil? Tanım kümesi kısıtlanınca ne olur? Varsayımlar sınanır.", "c"],
      ["Önerme ve değerlendirme", 20, "'f bire bir ve örten ise tersi vardır ve f(f⁻¹(x)) = x' önermesi yazılır; artanlık ile tersin ilişkisi değerlendirilir.", "ç,d"],
    ],
    cikis: "f(x) = (x − 3)/2 fonksiyonunun tersini bul ve grafiklerin y = x doğrusuna göre simetrik olduğunu bir noktayla göster.",
    etkinlik: ["ters"],
  };
  A["oyg3.1.3"] = {
    soru: "Merdiven duvara ne kadar dik dayanırsa duvarda o kadar yükseğe çıkar. Bu 'diklik' hangi sayıyla ölçülür?",
    adimlar: [
      ["Varsayım", 15, "Etkinlikte dik üçgenin açısı değiştirilir; öğrenciler karşı/hipotenüs oranının nasıl değişeceğini tahmin eder.", "a"],
      ["Genelleme", 20, "Benzer üçgenlerde oranların değişmediği görülür; sin, cos, tan, cot oranları tanımlanır.", "b"],
      ["Karşılaştır", 15, "Birim çemberde sin²θ + cos²θ = 1 ve tan θ = sin θ / cos θ gösterilir; ilk tahminlerle karşılaştırılır.", "c"],
      ["Önerme", 15, "sin(90° − θ) = cos θ önermesi tamamlayıcı açılarla sunulur ve doğrulanır.", "ç"],
      ["Gerçek yaşam", 15, "Rampa eğimi, gölge boyu ya da dönme dolap yüksekliği problemleri oranlarla çözülür.", "d"],
    ],
    cikis: "sin θ = 0,6 ise cos θ ve tan θ kaçtır? Çizimle göster.",
    zengin: "sin 15°'yi yalnızca 30° ve 45° üçgenlerini kullanarak bulabilir misin?",
    etkinlik: ["trigo"],
  };
  A["oyg3.1.4"] = {
    soru: "Bir kâğıdı 42 kez ikiye katlayabilseydin kalınlığı Ay'a ulaşır mıydı?",
    adimlar: [
      ["Referans fonksiyon", 15, "y = 2ˣ ve y = (1/2)ˣ grafikleri çizilir; tanım, değer aralığı, artanlık, bire birlik belirlenir.", "a,b"],
      ["Dönüşümler", 25, "k·f(ax ± b) ± r biçimindeki dönüşümler kaydırıcılarla incelenir; grafik ve cebirsel temsil eşleştirilir.", "c,ç"],
      ["Varsayım ve genelleme", 20, "'a > 1 ise artandır', 'yatay asimptot y = r' gibi varsayımlar listelenir ve kontrol edilir.", "d,e,f,g"],
      ["Gerçek yaşam", 15, "Faiz, bakteri çoğalması ve radyoaktif bozunma modelleri yorumlanır.", "ğ"],
    ],
    cikis: "y = 3·2^(x − 1) + 4 fonksiyonunun değer aralığını ve asimptotunu yaz.",
    baglanti: [["Fonksiyon Yarışı", MCK + "#fonksiyon"], ["Bilgi Köşesi: Fonksiyonların Büyümesi", MCK + "#bilgi-buyume"]],
  };
  A["oyg3.1.5"] = {
    soru: "2 kaçıncı kuvvetini alırsak 1000 olur? Bu soruyu soran fonksiyonun adı ne?",
    adimlar: [
      ["Varsayım", 15, "y = 2ˣ'in tersinin grafiği tahmin edilir; etkinlikte y = x'e göre yansıtılır.", "a"],
      ["Örüntü", 20, "2ˣ tablosunda x ve y yer değiştirerek log₂ tablosu oluşturulur.", "b,c"],
      ["Önerme", 15, "'y = logₐ x ⇔ aʸ = x' önermesi sunulur.", "ç"],
      ["Kullanışlılık", 20, "Deprem büyüklüğü, ses şiddeti (desibel), pH örnekleriyle logaritmanın gücü tartışılır.", "d"],
    ],
    cikis: "Richter ölçeğinde 7 büyüklüğündeki deprem 5 büyüklüğündekinden genlik olarak kaç kat güçlüdür?",
    etkinlik: ["ters"],
  };
  A["oyg3.1.6"] = {
    soru: "Logaritma, çarpmayı toplamaya çeviren bir makine midir?",
    adimlar: [
      ["Dönüşümler", 15, "y = log x'in k·f(ax ± b) ± r dönüşümleri grafikte incelenir.", "a,b"],
      ["Özellik ve kurallar", 20, "log(ab) = log a + log b, log(aⁿ) = n log a kuralları sayısal örneklerden varsayım olarak çıkarılır.", "c,ç,d"],
      ["İspat", 20, "Üslü sayı kurallarından cebirsel ispat yapılır; grafikle doğrulanır.", "e,g"],
      ["Değerlendir", 15, "Logaritmik ölçekli grafiklerin gerçek yaşamdaki yeri ve ispat yöntemlerinin kullanışlılığı tartışılır.", "f,ğ"],
    ],
    cikis: "log 2 ≈ 0,301 ise log 8 ve log 5 kaçtır? Hangi kuralları kullandın?",
  };
  A["oyg3.2.1"] = {
    soru: "Gauss 1'den 100'e kadar sayıları birkaç saniyede toplamış. Peki 1 + 2 + 4 + … + 2⁶³ toplamı kaçtır?",
    adimlar: [
      ["Ardışık terimler", 15, "Örnek örüntülerde ardışık farklar ve oranlar bulunur.", "a,b"],
      ["Genel terim", 15, "Terimler ortak fark ya da oranla ifade edilir; aritmetik ve geometrik dizi tanımlanır.", "c,ç"],
      ["Toplam varsayımı", 20, "Gauss eşleme fikri ve geometrik dizide 'S − rS' yöntemi keşfedilir.", "d,e,f"],
      ["Önerme ve ispat", 15, "Toplam formülleri önerme olarak yazılır ve cebirsel olarak ispatlanır.", "g,h"],
      ["Gerçek yaşam", 15, "Satranç tahtasındaki pirinç taneleri, taksit ve faiz problemleri; ispat yöntemleri değerlendirilir.", "ğ,ı"],
    ],
    cikis: "3 + 7 + 11 + … + 99 toplamını iki farklı yolla bul.",
    baglanti: [["Görsel Laboratuvar: Fibonacci Spirali", MCK + "#laboratuvar-fib"]],
  };
  A["oyg3.3.1"] = {
    soru: "Bir üçgenin iç açıları toplamı 270° olabilir mi?",
    adimlar: [
      ["Özellikleri belirle", 20, "Küre (portakal), düzlem ve eyer yüzeyinde 'doğru', 'üçgen', 'paralel' kavramları incelenir.", "a"],
      ["Benzerlikler", 15, "Üç geometride ortak olan aksiyomlar listelenir.", "b"],
      ["Farklılıklar", 20, "Açı toplamı, paralel sayısı ve çevre-alan ilişkisi karşılaştırma tablosuna yazılır.", "c"],
    ],
    cikis: "Küre üzerinde üç dik açılı bir üçgen nasıl çizilir?",
  };
  A["oyg3.3.2"] = {
    soru: "İstanbul'dan New York'a giden uçak neden haritada eğri bir yol izler?",
    adimlar: [
      ["Araçlar", 15, "Küre modeli, ip, GeoGebra 3B ve dünya haritası tanıtılır.", "a"],
      ["Seç", 15, "Büyük daire, küresel üçgen ve kutup üçgeni inşası için uygun araç belirlenir.", "b"],
      ["İnşa et", 30, "Gruplar iki şehir arasındaki büyük daire yayını ve bir küresel üçgen inşa eder.", "c"],
    ],
    cikis: "Küresel geometride 'doğru'nun karşılığı nedir?",
  };
  A["oyg3.4.1"] = {
    soru: "Bir olimpiyat sorusunun çözümünü okuduğunda, 'bunu nasıl akıl etti?' sorusunun cevabı nedir?",
    adimlar: [
      ["Sorgula", 20, "Seçilen olimpiyat sorusunda kullanılan kavram ve gizli genellemeler belirlenir.", "a"],
      ["Akıl yürüt", 25, "Gruplar çözümün kilit adımını yeniden kurar; 'neden bu yardımcı çizgi?' sorusuna cevap verir.", "b"],
      ["Yansıt", 25, "Aynı fikir farklı bir soruya ya da bir proje sorusuna uygulanır.", "c"],
    ],
    cikis: "Bugün kullandığın problem çözme fikrini (ekstremal ilke, güvercin yuvası, değişmez) bir cümleyle tanımla.",
    baglanti: [["Geometri: Soru Masası", GEO + "#soru"], ["Ayın Geometri Sorusu", GEO + "#ayin"]],
  };

  /* ------------------------------ PÜY ------------------------------ */
  A["puy.1.1"] = {
    soru: "Matematik bir bilim midir? Deney yapmayan bir bilim olur mu?",
    adimlar: [
      ["Tanımla", 15, "Öğrenciler matematiği tek cümleyle tanımlar; tanımlar karşılaştırılır.", "a"],
      ["Soru üret", 15, "'Matematik neyi inceler, nasıl doğrulanır?' gibi sorular listelenir.", "b"],
      ["Bilgi topla, doğrula", 25, "Matematikçilerin tanımları ve felsefi görüşler toplanır; kaynağın güvenilirliği sınanır.", "c,ç"],
      ["Çıkarım", 15, "'İspat' ile 'deney' kavramları karşılaştırılarak matematiğin doğasına dair çıkarım yazılır.", "d"],
    ],
    cikis: "Matematiği diğer bilimlerden ayıran tek özelliği yaz ve gerekçelendir.",
  };
  A["puy.1.2"] = {
    soru: "Bir biyolog, bir müzisyen ve bir ekonomist aynı denklemi kullanabilir mi?",
    adimlar: [
      ["İlişkiyi tanımla", 15, "Fibonacci (biyoloji), frekans oranları (müzik), üstel büyüme (ekonomi) örnekleri gösterilir.", "a"],
      ["Soru sor", 15, "Matematiğin diğer bilimlerin yöntemini nasıl değiştirdiğine dair sorular yazılır.", "b"],
      ["Araştır ve doğrula", 25, "Gruplar bir disiplin seçer, matematikle ilişkisine dair kaynak toplar ve doğrular.", "c,ç"],
      ["Çıkarım", 15, "Gruplar 'matematik olmasaydı bu disiplin…' cümlesini tamamlar.", "d"],
    ],
    cikis: "Seçtiğin disiplinde matematiğin çözdüğü bir problemi yaz.",
  };
  A["puy.2.1"] = {
    soru: "Bir topolog için kahve fincanı ile simit neden aynı şeydir?",
    adimlar: [
      ["Alanları tanı", 20, "Etkinlikte ünlü problemler ve sonuçlar alanlarına yerleştirilir; her alanın soruları ve yöntemleri konuşulur.", "a"],
      ["Benzerlikler", 15, "Hangi alanlar aynı aracı kullanıyor? (ör. cebir ve geometri: simetri grupları)", "b"],
      ["Farklılıklar", 15, "Sorduğu soru, kullandığı yöntem, ürettiği sonuç açısından alanlar ayrıştırılır.", "c"],
      ["Araştırma örneği", 15, "Bir TÜBİTAK 2204 projesi hangi alana ait? Gruplar örnek proje özetlerini sınıflandırır.", "a,b,c"],
    ],
    cikis: "İlgini çeken alanı ve o alanda sormak istediğin bir soruyu yaz.",
    etkinlik: ["harita"],
  };
  A["puy.2.2"] = {
    soru: "Matematiğin bütün alanlarını tek bir sayfaya sığdıran bir harita çizebilir misin?",
    adimlar: [
      ["Ölçüt belirle", 15, "Saf/uygulamalı, sürekli/ayrık, yapı/nicelik gibi ölçütler tartışılır.", "a"],
      ["Ayrıştır", 15, "Kartlardaki konular ölçütlere göre ayrılır.", "b"],
      ["Tasnif", 20, "Etkinlikte kavramlar alanlara sürüklenir; bir ağaç ya da ağ şeması kurulur.", "c"],
      ["Etiketle", 15, "Şema etiketlenir; diğer grupların şemalarıyla karşılaştırılır.", "ç"],
    ],
    cikis: "Şemanda iki alanı birbirine bağlayan bir köprü kavram yaz.",
    etkinlik: ["harita"],
  };
  A["puy.3.1"] = {
    soru: "Fermat'nın son teoremi 358 yıl çözümsüz kaldı. Bu sürede matematik bilgisi nasıl gelişti?",
    adimlar: [
      ["Tanımla", 15, "Bir teoremin keşif, ispat, yayılma aşamaları bir zaman şeridinde gösterilir.", "a"],
      ["Soru sor", 15, "Bilginin nasıl yayıldığına dair sorular üretilir (mektup, dergi, konferans, arXiv).", "b"],
      ["Bilgi topla, doğrula", 25, "Gruplar bir teoremin hikâyesini araştırır; kaynakları karşılaştırır.", "c,ç"],
      ["Çıkarım", 15, "Hatalı ilk ispatların bilginin gelişimindeki rolü tartışılır.", "d"],
    ],
    cikis: "Bir matematiksel bilginin yayılmasını hızlandıran bir icadı yaz.",
  };
  A["puy.3.2"] = {
    soru: "Bir matematikçi sabah işe başladığında gün sonunda ne üretmiş olur?",
    adimlar: [
      ["Araç seç", 15, "Röportaj, makale, biyografi, video arşivi gibi araçlar belirlenir.", "a"],
      ["Bul", 25, "Gruplar seçtikleri araçla bir matematikçinin çalışma sürecine dair bilgi toplar.", "b"],
      ["Doğrula ve kaydet", 20, "Bilgiler ikinci bir kaynakla doğrulanır ve araştırma günlüğüne kaydedilir.", "c,ç"],
    ],
    cikis: "Matematiksel bilginin üretiminde 'tahmin' aşamasının rolünü yaz.",
  };
  A["puy.3.3"] = {
    soru: "Bir bilimsel makaleyi 12 yaşındaki birine anlatabilir misin?",
    adimlar: [
      ["İncele", 20, "Seçilen bir TÜBİTAK projesi ya da makale özeti okunur; problem, yöntem, sonuç işaretlenir.", "a"],
      ["Dönüştür", 20, "Çalışma bir infografiğe ya da 1 dakikalık sözlü özete dönüştürülür.", "b"],
      ["Yeniden ifade", 20, "Anlam değişmeden sade bir dille yeniden yazılır; akran kontrolü yapılır.", "c"],
    ],
    cikis: "Okuduğun çalışmanın ana sonucunu 25 kelimeyi geçmeden yaz.",
  };
  A["puy.4.1"] = {
    soru: "Başkasının fikrini kaynak göstermeden kullanmak neden yanlıştır, fikir 'havada' olsa bile?",
    adimlar: [
      ["Merak", 15, "Öğrenciler etikle ilgili merak ettikleri durumları yazar (intihal, veri uydurma, yapay zekâ kullanımı).", "a"],
      ["Soru", 15, "Her durum için 'kim zarar görür?' sorusu tartışılır.", "b"],
      ["Bilgi ve doğrulama", 20, "Bilimsel etik ilkeleri ve atıf biçimleri (APA, MLA) incelenir.", "c,ç"],
      ["Çıkarım", 15, "Gruplar kendi projeleri için 5 maddelik bir etik sözleşme yazar.", "d"],
    ],
    cikis: "Bir kaynağı APA biçiminde kaynakçana yaz.",
  };
  A["puy.5.1"] = {
    soru: "İyi bir araştırma sorusu ile kötü bir araştırma sorusu arasındaki fark nedir?",
    adimlar: [
      ["Amaç", 10, "Öğrenciler araştırmak istedikleri alanı ve amacı yazar.", "a"],
      ["Bilgi topla", 20, "Konuyla ilgili önceki çalışmalar taranır.", "b"],
      ["Seçenekler", 15, "Üç farklı araştırma sorusu üretilir.", "c"],
      ["Mantıksal denetim", 15, "Sorular özgünlük, yapılabilirlik ve ölçülebilirlik açısından denetlenir.", "ç"],
      ["Karar ve yansıtma", 10, "Bir soru seçilir; seçimin sonuçları üzerine kısa yansıtma yazılır.", "d,e"],
    ],
    cikis: "Seçtiğin araştırma sorusunu ve neden seçtiğini yaz.",
  };
  A["puy.5.2"] = {
    soru: "Bir sanı kurdun. Onu ispatlamadan önce neleri denemelisin?",
    adimlar: [
      ["Yapılandır", 15, "Araştırma problemi tanımlar ve sembollerle yeniden yazılır.", "a"],
      ["Özetle", 10, "Problem tek paragrafta özetlenir.", "b"],
      ["Tahmin", 20, "Küçük durumlar hesaplanır, tablo ve grafik ile tahminde bulunulur.", "c"],
      ["Akıl yürüt", 20, "Önerme ve aksiyomlardan hareketle ispat taslağı yazılır.", "ç"],
      ["Teorem-ispat", 10, "Ulaşılan sonuç teorem mi, sanı mı? Gerekçeyle değerlendirilir.", "d"],
    ],
    cikis: "Araştırmanda şu an elinde 'kanıtlanmış' olan bir şey var mı, yoksa hepsi 'gözlem' mi?",
  };
  A["puy.5.3"] = {
    soru: "Elle saatler süren bir hesabı GeoGebra ya da Wolfram ile dakikalar içinde yapabilir misin?",
    adimlar: [
      ["Tanı", 15, "GeoGebra, Desmos, Wolfram Alpha, Python araçları kısa örneklerle tanıtılır.", "a"],
      ["Belirle", 15, "Gruplar araştırmalarına uygun aracı seçer ve gerekçelendirir.", "b"],
      ["Kullan", 30, "Seçilen araçla araştırmanın bir adımı (grafik, simülasyon, hesap) gerçekleştirilir.", "c"],
    ],
    cikis: "Aracın araştırmanda neyi mümkün kıldı?",
  };
  A["puy.6.1"] = {
    soru: "Matematik formüllerini Word'de yazmak neden bu kadar zor ve LaTeX bu işi nasıl kolaylaştırır?",
    adimlar: [
      ["Araçları tanı", 15, "LaTeX (Overleaf), MathType ve sunum araçları tanıtılır.", "a"],
      ["Belirle", 10, "Rapor, poster ve sunum için hangi araç kullanılacağı belirlenir.", "b"],
      ["Kullan", 35, "Proje raporunun bir bölümü LaTeX ile yazılır; bir poster taslağı hazırlanır.", "c"],
    ],
    cikis: "LaTeX'te bir kesri ve bir toplamı nasıl yazarsın?",
  };
  A["puy.6.2"] = {
    soru: "Bir matematik oyunu ya da algoritması patentlenebilir mi?",
    adimlar: [
      ["Hakları tanı", 25, "Patent, faydalı model, tasarım ve telif hakkı farkları örnek başvurularla incelenir.", "a"],
      ["Uygun davran", 25, "Gruplar projeleri için uygun koruma türünü seçer ve başvuru öncesi neleri gizli tutmaları gerektiğini tartışır.", "b"],
    ],
    cikis: "Projen için hangi fikrî mülkiyet türü uygundur? Neden?",
  };
})(MC.bilsemAkis);
