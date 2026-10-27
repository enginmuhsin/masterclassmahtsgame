/* =====================================================================
   BİLSEM ÖĞRETMEN MASASI — DERS AKIŞLARI (Destek ve BYF)
   Her kazanım için: açılış sorusu, adımlar [başlık, dakika, metin, "süreç bileşenleri"],
   çıkış kartı, hızlı bitirenlere zenginleştirme, etkileşimli etkinlik kimlikleri ve
   Master Class'taki ilgili araçlar. Adımlar iki ders saatine (≈80 dk) göre kurgulandı.
   Kitap metinleri kopyalanmadı; etkinlikler özgün olarak yazıldı.
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemAkis = MC.bilsemAkis || {};
(function (A) {
  const MCK = "../index.html", GEO = "../geometri/";

  /* ------------------------------ DESTEK ------------------------------ */
  A["des.1.1"] = {
    soru: "Bir gün tüm sayılar dünyadan silinse, ilk hangi sayıyı yeniden icat etmek zorunda kalırdık?",
    adimlar: [
      ["Kavram avı", 15, "Gruplar 'sayma, sıfır, kesir, ölçü, takvim' kartlarından birini çeker ve o kavram olmadan bir günün nasıl geçeceğini 3 maddeyle anlatır.", "a"],
      ["Neden ortaya çıktı?", 15, "Her grup kavramına 'kim, ne zaman, hangi ihtiyaçla?' sorularını yazar. Sorular tahtadaki zaman şeridine yapıştırılır.", "b"],
      ["İlk matematikçiler", 20, "Ishango kemiği, Ahmes papirüsü, Babil tableti ve Hint sıfırı kartları dağıtılır. Gruplar kendi kavramlarına uyan kartı bulur, bilgi notu çıkarır.", "c"],
      ["Doğru mu, efsane mi?", 15, "Öğretmen iki doğru bir yanlış bilgi okur ('Sıfırı Romalılar buldu' gibi). Gruplar hangi kaynağın güvenilir olduğunu tartışır.", "d"],
      ["Bugüne köprü", 15, "Her grup 'Bu kavram bugün olmasa telefonumuzda ne çalışmazdı?' sorusuna bir çıkarım cümlesi yazar.", "e"],
    ],
    cikis: "Bugün öğrendiğin bir matematik kavramının hangi ihtiyaçtan doğduğunu bir cümleyle yaz.",
    zengin: "Sıfırın Hindistan'dan Avrupa'ya yolculuğunu bir harita üzerinde oklarla göster.",
  };
  A["des.1.2"] = {
    soru: "Mısırlı bir çocuk 34 × 12'yi hiç çarpım tablosu bilmeden nasıl hesaplardı?",
    adimlar: [
      ["Üç yol, bir işlem", 20, "Aynı çarpma (ör. 34 × 12) Rus köylü yöntemi, çizgilerle çarpma ve Napier kemikleriyle yapılır; her grup birini dener.", "a"],
      ["Ölçüt seç", 10, "Sınıf 'hız, hata yapmama, güzellik, öğrenmesi kolaylık' ölçütlerinden ikisini seçer.", "a"],
      ["Ölç", 20, "Her grup kendi yöntemiyle 3 çarpma yapar; süre ve hata sayısı tabloya işlenir.", "b"],
      ["Karşılaştır ve karar ver", 20, "Tablo tahtada birleştirilir; hangi yöntem hangi ölçütte öne çıktı? Sınıf gerekçeli bir yargı cümlesi yazar.", "c,d"],
    ],
    cikis: "Hangi çarpma yöntemini bir arkadaşına öğretirdin? Bir ölçüte dayanarak gerekçelendir.",
    zengin: "Rus köylü yönteminin neden doğru sonuç verdiğini ikili sayılarla açıkla.",
    etkinlik: ["carpma", "sayisistem"],
  };
  A["des.2.1"] = {
    soru: "Sınıftaki herkesin bugüne kadar attığı adımların toplamı bir milyonu geçer mi? Hesap yapmadan tahmin et.",
    adimlar: [
      ["Tahmin turu", 15, "Tahtada 5 hızlı işlem belirir (498 + 305, 25 × 48 …). Öğrenciler 10 saniyede tahmin yazar; tahminler toplanır.", "a"],
      ["Strateji avı", 20, "Yuvarlama, parçalama, telafi etme, ikiye katlama stratejileri öğrencilerin kendi tahminlerinden çıkarılır ve adlandırılır.", "a,b"],
      ["Kurala dayalı hesap", 20, "Her strateji bir kural cümlesine dönüşür ('25 ile çarpmak = 100 ile çarpıp 4'e bölmek'). Yeni işlemlerle denenir.", "b"],
      ["İleriye bakış", 15, "Açılış sorusuna dönülür: sınıf ortalaması × gün × kişi tahmini kurulur, sonuç büyüklük olarak yorumlanır.", "c"],
    ],
    cikis: "48 × 25'i zihinden nasıl hesaplarsın? Stratejinin adını yaz.",
    zengin: "Tahmin hatanı yüzde olarak hesapla; en isabetli stratejiyi bul.",
  };
  A["des.2.2"] = {
    soru: "Sınıfın boyunu kalem, ayak ve karış ile ölçsek hangisiyle herkes aynı sonucu bulur?",
    adimlar: [
      ["Varsayım", 10, "Öğrenciler 'Karışla ölçmek her zaman yanlıştır' cümlesine katılıp katılmadıklarını yazar.", "a"],
      ["Ölçüm şenliği", 25, "Gruplar sıranın uzunluğunu karış, kalem, ataş ve cetvelle ölçer; sonuçlar tabloya işlenir.", "b"],
      ["Neden farklı?", 15, "Tablo karşılaştırılır; birim büyüdükçe sayının küçüldüğü fark edilir. Varsayımlar sonuçlarla karşılaştırılır.", "c"],
      ["Önerme yaz", 15, "Gruplar 'Standart birim gerekir, çünkü…' cümlesini tamamlar; Fermi sorusu: 'Okul bahçesi kaç adım?'", "ç,d"],
    ],
    cikis: "Bir birimin 'iyi birim' sayılması için hangi özelliği taşıması gerekir?",
    zengin: "Kendi ölçü birimini icat et, adını koy ve metreye çevirme kuralını yaz.",
  };
  A["des.2.3"] = {
    soru: "1, 3, 6, 10, … Bu sayıları kim dizdi ve bir sonraki neden 15?",
    adimlar: [
      ["Örüntüyü gör", 15, "Tahtada nokta üçgenleri büyür; öğrenciler sayıları ve aradaki farkları yazar, ilk varsayımlarını söyler.", "a"],
      ["Kuralı yakala", 20, "Farklar tablosu (2, 3, 4 …) üzerinden 'her adımda bir fazla eklenir' genellemesi; sonra 10. terim hesaplanır.", "b"],
      ["Sına", 15, "Gruplar varsayımı 3 yeni terimle sınar; uymayan bir örnek arar.", "c"],
      ["Önerme ve gerekçe", 20, "Kural sözel ve sembolik yazılır (n. terim = 1 + 2 + … + n). İki üçgen birleşince dikdörtgen olduğu gösterilir.", "ç,d,e"],
      ["Benzer örüntüler", 10, "Aynı yöntem kare sayılara uygulanabilir mi? Kısa tartışma.", "f"],
    ],
    cikis: "Üçgensel sayılarda 20. terimi bul ve nasıl bulduğunu açıkla.",
    zengin: "İki ardışık üçgensel sayının toplamı neden hep kare sayıdır? Noktalarla göster.",
    etkinlik: ["cokgensel"],
  };
  A["des.2.4"] = {
    soru: "6'nın bölenlerini toplayınca neden yine 6 çıkıyor? Bu bir tesadüf mü?",
    adimlar: [
      ["Sayı kulübü", 20, "Mükemmel, palindromik, Harshad ve mutlu sayı kartları dağıtılır; her grup kendi kulübünün kuralını örneklerden çıkarır.", "a"],
      ["Temsil et", 20, "Grup, kulübünün sayılarını tablo ya da şema ile gösterir (ör. mutlu sayı için kare toplamı zinciri).", "b"],
      ["Kendi sözlerinle", 15, "Her grup kulübünü 3 cümlede tanıtır; diğerleri 'Bu sayı kulübe girer mi?' sorularını yöneltir.", "c"],
    ],
    cikis: "19 mutlu bir sayı mı? Zinciri yazarak göster.",
    zengin: "100'e kadar kaç Harshad sayısı var? Bir kural bulabilir misin?",
    baglanti: [["Bilgi Köşesi: Mükemmel Sayılar", MCK + "#bilgi-mukemmel"], ["Bilgi Köşesi: Diğer sayı türleri", MCK + "#bilgi-diger"], ["Sayı Dedektörü", MCK + "#dedektor"]],
  };
  A["des.3.1"] = {
    soru: "3 diskli Hanoi kulesini en az kaç hamlede taşıyabilirsin? Peki 10 diskli olanı?",
    adimlar: [
      ["Bileşenleri belirle", 10, "Disk sayısı, hamle sayısı, kurallar tahtaya yazılır; neyin değişken olduğu tartışılır.", "a,b"],
      ["Oyna ve kaydet", 20, "1, 2, 3, 4 disk için en az hamle sayısı tabloya işlenir (1, 3, 7, 15).", "c,ç"],
      ["Strateji tahmini", 15, "Öğrenciler '4 disk için 3 diskin çözümünü iki kez kullanırım' fikrine ulaşır; 5 disk için tahmin yapılır.", "d,e"],
      ["Uygula ve kontrol et", 15, "Tahmin etkinlikte denenir; tutmazsa strateji değiştirilir.", "f,g"],
      ["Değerlendir", 10, "Farklı stratejiler (küçük diski hep aynı yöne döndürmek) karşılaştırılır; hangisi daha verimli?", "ğ,h"],
    ],
    cikis: "n disk için hamle sayısını bulmanın kuralını kendi cümlenle yaz.",
    zengin: "64 diskli kule saniyede bir hamleyle kaç yılda biter?",
    etkinlik: ["hanoi"],
  };
  A["des.3.2"] = {
    soru: "Bir Kendoku tablosunda tek bir kutuyu doldurmak, bütün tabloyu nasıl çözer?",
    adimlar: [
      ["Oyunu tanı", 15, "4×4 Kendoku ya da İşlem Karesi tahtada; sayı, işlem ve kafes bileşenleri adlandırılır.", "a"],
      ["İlişkileri bul", 20, "'12× iki kutuda olursa hangi ikililer?' gibi ilişkiler listelenir; olası sayılar tablosu yapılır.", "b,c"],
      ["Hamleyi söyle", 20, "Gruplar sırayla bir hamle önerir ve gerekçesini matematik diliyle söyler.", "ç"],
    ],
    cikis: "Kendoku'da ilk hamleyi seçerken neye bakarsın?",
    zengin: "Kendi 3×3 Kendoku bulmacanı tasarla ve tek çözümlü olduğunu kontrol et.",
  };
  A["des.4.1"] = {
    soru: "Cetvelin üzerindeki sayılar silinse, yine de tam bir eşkenar üçgen çizebilir miydin?",
    adimlar: [
      ["Araçları tanı", 10, "Ölçüsüz cetvel 'iki noktayı birleştirir', pergel 'aynı uzaklığı taşır' kuralları konuşulur.", "a"],
      ["İlk inşa", 20, "Çizim Masası'nda eşkenar üçgen inşası adım adım yapılır; neden eşkenar olduğu tartışılır.", "a,b"],
      ["Görev kartları", 25, "Orta dikme, açıortay, kare inşası kartlarından biri seçilir; öğrenciler gereken aracı ve adımları belirler.", "b,c"],
      ["Tasarım", 15, "Öğrenciler yalnızca cetvel-pergel ile bir logo tasarlar.", "c"],
    ],
    cikis: "Pergel olmadan bir doğru parçasını tam ortasından bölebilir misin? Neden?",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };
  A["des.4.2"] = {
    soru: "Bir duvarı yalnızca düzgün beşgen fayanslarla boşluksuz kaplayabilir miyiz?",
    adimlar: [
      ["Köşe testi", 20, "Üçgen, kare, beşgen, altıgen kartları bir köşede birleştirilir; hangilerinin 360°'yi tam doldurduğu bulunur.", "a"],
      ["Araç seçimi", 15, "Kâğıt, cetvel-pergel, dijital çizim araçlarından hangisinin işe yarayacağı tartışılır.", "b"],
      ["Desen üret", 30, "Öğrenciler seçtikleri araçla bir kaplama ve bir süsleme üretir; Selçuklu yıldız desenlerinden örnekler gösterilir.", "c"],
    ],
    cikis: "Düzgün beşgen neden tek başına kaplama yapamaz? Açılarla açıkla.",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };
  A["des.5.1"] = {
    soru: "Sınıfımızın en sevdiği ders hangisi diye sorsak, cevabı veri olmadan bilebilir miyiz?",
    adimlar: [
      ["Durum bul", 10, "Sınıf, merak ettiği 3 durumu listeler (en çok tüketilen içecek, uyku süresi …).", "a"],
      ["Araştırma sorusu", 15, "Her grup bir betimleme ya da karşılaştırma sorusu yazar.", "b"],
      ["Veri toplama planı", 15, "Anket ya da sayım formu hazırlanır; kime, nasıl sorulacağı planlanır.", "c"],
      ["Topla ve düzenle", 25, "Veriler toplanır, sıklık tablosu ve sütun grafiği çizilir; tepe değer ve aralık hesaplanır.", "ç,d,e"],
      ["Sonuç ve yeni soru", 15, "Bulgular soruyu ne kadar cevapladı? Cevaplamadığı yön için yeni bir araştırma önerilir.", "f,g"],
    ],
    cikis: "Topladığın veriye göre bir karar cümlesi yaz ve hangi sayıya dayandığını belirt.",
  };

  /* ------------------------------ BYF ------------------------------ */
  A["byf.1.1"] = {
    soru: "Bir Babilli 1 dakika 30 saniyeyi nasıl yazardı ve biz bugün neden hâlâ onun gibi sayıyoruz?",
    adimlar: [
      ["Eski sayı sistemleri", 20, "Etkinlikte aynı sayı Mısır, Babil, Maya ve ikili sistemde yazılır; öğrenciler her sistemin sembol ve kuralını keşfeder.", "a"],
      ["Basamak fikri", 15, "Mısır'da sembol tekrarı, Babil'de konum: eski sistemler bugünkü basamak değeri fikriyle karşılaştırılır.", "b"],
      ["Taban dönüşümü", 15, "Onluk bir sayı 60'lık, 20'lik ve 2'lik tabana çevrilir; üslü gösterimle yazılıp matematik diliyle açıklanır.", "c,ç"],
      ["Varsayım ve genelleme", 15, "'Taban küçüldükçe basamak sayısı artar' gibi varsayımlar örneklerle sınanır ve genellenir; saat ve açıdaki 60'lık izler aranır.", "d,e,f"],
      ["Kendi sayı sistemin", 15, "Gruplar kendi sembolleri ve tabanıyla bir sayı sistemi önerir; pratiklik ve kullanışlılık açısından birbirlerininkini değerlendirir.", "g,ğ"],
    ],
    cikis: "2026'yı ikili sistemde yaz ve kaç basamak gerektiğini açıkla.",
    zengin: "Neden 60? 60'ın bölenlerini 10'un bölenleriyle karşılaştır.",
    etkinlik: ["sayisistem"],
  };
  A["byf.1.2"] = {
    soru: "Çarpım tablosu ezberlemeden 23 × 41'i yalnızca ikiye bölerek ve ikiyle çarparak bulabilir misin?",
    adimlar: [
      ["Eski yöntemler", 25, "Mısır ikiye katlama, Rus köylü ve çizgilerle çarpma yöntemleri etkinlikte adım adım izlenir.", "a"],
      ["Sayı sistemiyle bağı", 20, "Rus köylü yönteminin ikili sistemle, çizgilerle çarpmanın basamak değeriyle ilişkisi aranır.", "a,b"],
      ["Eleştirel karşılaştırma", 20, "Yöntemler hız, hata, genellenebilirlik açısından tartışılır; sınıf gerekçeli bir sonuç yazar.", "c"],
    ],
    cikis: "Rus köylü yönteminde tek satırları toplamamızın nedeni nedir?",
    etkinlik: ["carpma"],
  };
  A["byf.2.1"] = {
    soru: "36'nın 9 böleni var, 30'un 8. Bölen sayısını sayının kendisine bakarak tahmin edebilir miyiz?",
    adimlar: [
      ["Varsayım", 15, "Öğrenciler 10 sayının bölenlerini listeler ve 'büyük sayının daha çok böleni olur' gibi varsayımlar söyler.", "a"],
      ["Asal çarpan ağacı", 20, "Etkinlikte sayılar asal çarpanlarına ayrılır; üsler ile bölen sayısı yan yana tabloya yazılır.", "a,b"],
      ["Genelleme", 15, "Tablodan '(üs + 1)'lerin çarpımı' kuralı çıkarılır; ızgara modelinde neden böyle olduğu görülür.", "b"],
      ["Sına", 15, "Kural tek bölenli, iki bölenli, tam kare sayılarla sınanır; tek sayıda böleni olanlar neden tam kare?", "c,ç"],
      ["Gerçek hayat", 10, "24 öğrenciyi eşit gruplara kaç farklı şekilde ayırırız? Önerme bir problemde kullanılır.", "d"],
    ],
    cikis: "Böleni tam 6 olan en küçük doğal sayıyı bul ve neden en küçük olduğunu açıkla.",
    zengin: "Bölen sayısı 12 olan iki farklı sayı bul; birinin iki, diğerinin üç farklı asal çarpanı olsun.",
    etkinlik: ["bolen"],
    baglanti: [["Sayı Dedektörü", MCK + "#dedektor"], ["Görsel Laboratuvar: Bölen Dağları", MCK + "#laboratuvar-daglar"], ["Bilgi Köşesi: Bölen Fonksiyonları", MCK + "#bilgi-bolen"]],
  };
  A["byf.2.2"] = {
    soru: "Kare sayılar 1, 4, 9, 16 … Beşgen sayılar nasıl bir dizi oluşturur ve 10. beşgen sayıyı çizmeden bulabilir miyiz?",
    adimlar: [
      ["Noktalarla gör", 15, "Etkinlikte üçgen, kare, beşgen noktaları büyütülür; terimler ve farklar tahtaya yazılır.", "a"],
      ["Genelle", 20, "Farkların farkı sabit mi? Görsel modelden kural sözel ve formel dille yazılır.", "b"],
      ["Sına ve karşılaştır", 15, "Kural büyük terimlerle sınanır; Fibonacci dizisinde neden aynı yöntem çalışmaz?", "c,ç"],
      ["Görsel doğrulama", 20, "'İki ardışık üçgensel sayının toplamı kare sayıdır' önermesi noktalarla doğrulanır.", "d,e"],
      ["Sınırlar", 10, "Doğrulama hangi koşulda geçerli? Kaçıncı terimden başlarsa bozulur? Tartışılır.", "f"],
    ],
    cikis: "Altıgen sayıların ilk 4 terimini yaz ve kuralını tahmin et.",
    zengin: "Her altıgen sayının aynı zamanda bir üçgensel sayı olduğunu göster.",
    etkinlik: ["cokgensel"],
    baglanti: [["Görsel Laboratuvar: Fibonacci Spirali", MCK + "#laboratuvar-fib"], ["Bilgi Köşesi: Fibonacci ve Üçgensel", MCK + "#bilgi-fib"]],
  };
  A["byf.2.3"] = {
    soru: "Hangi sayıyla başlarsan başla, 'çiftse ikiye böl, tekse 3 katının 1 fazlasını al' dersen hep 1'e mi düşersin? Kimse bilmiyor!",
    adimlar: [
      ["Sanıyı ifade et", 15, "Collatz, Goldbach ve İkiz Asallar sanıları sade cümlelerle tahtaya yazılır; 'sanı' ile 'teorem' farkı konuşulur.", "a"],
      ["Laboratuvar", 25, "Gruplar etkinlikte üç sanıdan birini dener: Collatz yolculuklarını, bir çift sayının asal ikililerini, ikiz asal sayısını kaydeder.", "a,b"],
      ["Soru sor", 10, "Her grup verisinden 2 yeni soru üretir ('En uzun yolculuk hangi sayıda?', 'Ayrışım sayısı neden artıyor?').", "b"],
      ["Bilgi topla, doğrula", 15, "Sanıların tarihine dair kısa kartlar okunur; hangi bilginin güvenilir kaynaktan geldiği değerlendirilir.", "c,ç"],
      ["Çıkarım", 15, "'Bilgisayar 10^20'ye kadar denedi, demek ki doğrudur' cümlesi tartışılır: örnek çokluğu ispat mıdır?", "d"],
    ],
    cikis: "Bir sanıyı ispatlamak ile çok sayıda örnekte denemek arasındaki farkı bir cümleyle yaz.",
    zengin: "27 ile başlayan Collatz yolculuğu kaç adım sürer ve en yüksek hangi sayıya çıkar?",
    etkinlik: ["sanilar"],
    baglanti: [["Görsel Laboratuvar: Collatz", MCK + "#laboratuvar-collatz"], ["Bilgi Köşesi: Çözülmemiş Problemler", MCK + "#bilgi-acik"]],
  };
  A["byf.2.4"] = {
    soru: "(a + b)² = a² + b² diyen bir arkadaşına, tek bir kare çizerek yanıldığını gösterebilir misin?",
    adimlar: [
      ["Kareyi böl", 20, "Etkinlikte kenarı a + b olan kare dört parçaya ayrılır; alanlar toplanarak (a + b)² = a² + 2ab + b² okunur.", "a"],
      ["Kes ve taşı", 20, "İki kare farkı: büyük kareden küçük kare kesilir, kalan parça bir dikdörtgene dönüştürülür.", "a"],
      ["Küplerin toplamı", 15, "1³ + 2³ + 3³ = (1 + 2 + 3)² görsel modeli izlenir; n = 4 için öğrenciler tahmin eder.", "a"],
      ["Yeni özdeşlik", 15, "Gruplar aynı yöntemi (a − b)² ve (a + b + c)² için uyarlar ve modelini çizer.", "b"],
    ],
    cikis: "(a − b)² için alan modelini çiz ve özdeşliği yaz.",
    zengin: "(a + b)³ küpünü 8 parçaya ayırarak özdeşliği yaz.",
    etkinlik: ["ozdeslik"],
    baglanti: [["Görsel Laboratuvar: (a+b)³ Küpü", MCK + "#laboratuvar-kup"]],
  };
  A["byf.3.1"] = {
    soru: "64 diskli Hanoi kulesini taşıyan rahipler dünyanın sonu gelmeden bitirebilir mi?",
    adimlar: [
      ["Bileşenler", 10, "Disk sayısı, hamle, kural; neyin bilinen neyin bilinmeyen olduğu belirlenir.", "a,b"],
      ["Algoritmik dile çevir", 20, "n diski taşımak = n−1'i kenara, büyüğü hedefe, n−1'i üstüne. Öğrenciler bu tarifi kendi cümleleriyle yazar.", "c,ç"],
      ["Tahmin ve deneme", 20, "Etkinlikte 3-6 disk çözülür; hamle sayıları tahmin edilir ve kontrol edilir.", "d,e,f"],
      ["Doğrula, değiştir", 15, "Genel kural 2ⁿ − 1 ile denemeler karşılaştırılır; tutmayan strateji gözden geçirilir.", "g"],
      ["Farklı çözümler", 15, "Özyinelemeli ve döngüsel (küçük disk hep aynı yöne) çözüm verimlilik açısından kıyaslanır.", "ğ,h,ı"],
    ],
    cikis: "5 diskli kuleyi en az kaç hamlede bitirirsin? Algoritmayı 3 satırda yaz.",
    etkinlik: ["hanoi"],
    baglanti: [["Bilgi Köşesi: Algoritmalar", MCK + "#bilgi-algoritma"]],
  };
  A["byf.3.2"] = {
    soru: "Bir bilgisayara Collatz yolculuğunu yaptırmak için ona hangi üç komutu öğretmen gerekir?",
    adimlar: [
      ["Araçları tanı", 15, "Scratch, MIT App Inventor ya da Blockly gibi blok tabanlı araçlar tanıtılır; döngü ve koşul blokları gösterilir.", "a"],
      ["Algoritmayı kodla", 35, "Gruplar Collatz ya da Hanoi algoritmasını blok kodla yazar; adım sayısını ekrana yazdırır.", "b"],
      ["Test et, iyileştir", 20, "Kod farklı girdilerle denenir; hatalar bulunur ve düzeltilir.", "c"],
    ],
    cikis: "Kodunda 'eğer…değilse' bloğunu nerede kullandın? Neden?",
    etkinlik: ["sanilar", "hanoi"],
  };
  A["byf.4.1"] = {
    soru: "Çevresi 24 cm olan dikdörtgenlerin hepsinin alanı aynı mı?",
    adimlar: [
      ["Parçaları belirle", 15, "Kareli kâğıtta çevresi 24 olan farklı dikdörtgenler çizilir; kenarlar ve alanlar tabloya yazılır.", "a,b"],
      ["İlişkiyi gör", 15, "Kenarlar birbirine yaklaştıkça alanın büyüdüğü fark edilir.", "b,c"],
      ["Strateji", 20, "Alanı 36 olan şekillerin çevresi ne olur? Ters problem kurulur ve çözülür.", "ç,d,e"],
      ["Kontrol ve değerlendirme", 15, "Çözümler karşılaştırılır; en verimli yol seçilir.", "f,g"],
    ],
    cikis: "Çevresi sabitken alanı en büyük dikdörtgen hangisidir?",
    etkinlik: ["parabol"],
    baglanti: [["Geometri: Soru Masası", GEO + "#soru"]],
  };
  A["byf.4.2"] = {
    soru: "Bir futbol topunda kaç beşgen var ve bu sayı değişebilir mi?",
    adimlar: [
      ["Cisimleri incele", 20, "Platonik cisimler 3B görünümde döndürülür; yüz, köşe, kenar sayıları tabloya işlenir.", "a"],
      ["İlişki ara", 15, "Tablodan V − E + F = 2 ilişkisi keşfedilir.", "b,c"],
      ["Neden yalnızca beş?", 20, "Bir köşede birleşen yüzlerin açı toplamı 360°'den küçük olmalı; düzgün çokgenler tek tek denenir.", "ç,d"],
      ["Doğrula ve genelle", 15, "Euler formülü futbol topu (kesik ikosahedron) için kontrol edilir; önermenin başka çokyüzlülere genişletilip genişletilemeyeceği tartışılır.", "e,f,g,ğ"],
    ],
    cikis: "12 beşgen ve 20 altıgenden oluşan futbol topunun kaç köşesi vardır?",
    baglanti: [["Geometri: 3B Cisimler ve Açınımlar", GEO + "#cisimler"]],
  };
  A["byf.4.3"] = {
    soru: "Arılar neden altıgen petek yapar, kare değil?",
    adimlar: [
      ["Uygun şekiller", 15, "Bir köşede 360° oluşturan düzgün çokgen birleşimleri bulunur.", "a"],
      ["Kaplama tasarla", 30, "Öğrenciler düzenli ve yarı düzenli kaplamalar üretir; köşe tipi (3.3.3.4.4 gibi) ile adlandırır.", "b"],
      ["Sergile", 15, "Tasarımlar sınıfta sergilenir; hangi kurala dayandığı anlatılır.", "c"],
    ],
    cikis: "Kendi kaplamanın köşe tipini yaz ve açılar toplamının 360° olduğunu göster.",
    baglanti: [["Geometri: Çizim Masası", GEO + "#cizim"]],
  };
  A["byf.4.4"] = {
    soru: "Bir ağacın yüksekliğini tırmanmadan ölçebilir misin?",
    adimlar: [
      ["Araç seç", 15, "Gölge, ayna, eğim ölçer ve dinamik geometri yazılımı seçenekleri tartışılır.", "a"],
      ["Ölç ve çiz", 30, "Okul bahçesinde benzer üçgenlerle bir yükseklik ölçülür; GeoGebra'da model kurulur.", "b"],
      ["Doğrula", 20, "Farklı yöntemlerin sonuçları karşılaştırılır; hata kaynakları tartışılır.", "c"],
    ],
    cikis: "Gölge yöntemi hangi geometrik özelliğe dayanır?",
    baglanti: [["Geometri: Üçgen Laboratuvarı", GEO + "#ucgen"]],
  };
  A["byf.5.1"] = {
    soru: "'Öğrencilerin %80'i oyunu seviyor' diyen bir anket gerçekten kaç kişiye sorulmuş olabilir?",
    adimlar: [
      ["Soruları incele", 20, "Hazır araştırma soruları ve anket formları incelenir; hangisinin kategorik, hangisinin nicel veri ürettiği belirlenir.", "a"],
      ["Değişkenleri ayıkla", 20, "Her soru için değişken, veri türü ve uygun grafik eşleştirilir.", "b"],
      ["Eleştir", 20, "Yanıltıcı grafik ve yönlendirici soru örnekleri tartışılır.", "c"],
    ],
    cikis: "Bir anket sorusunu yönlendirici olmaktan çıkararak yeniden yaz.",
  };
  A["byf.5.2"] = {
    soru: "Sınıfımızın emoji kullanma alışkanlıkları hakkında veriyle neler söyleyebiliriz?",
    adimlar: [
      ["Soru ve plan", 20, "Gruplar resim tabanlı ya da kategorik veriyle cevaplanabilecek bir soru seçer ve veri toplama planı yapar.", "a,b,c"],
      ["Topla ve göster", 25, "Veri toplanır; sıklık tablosu, sütun ve daire grafiği hazırlanır.", "ç,d"],
      ["Karar ver", 20, "Mod, medyan ve açıklık hesaplanır; bulgulara dayalı karar cümlesi yazılır ve sınırlılıklar tartışılır.", "e,f"],
    ],
    cikis: "Grafiğine bakarak bir karar ver ve hangi değere dayandığını yaz.",
  };
})(MC.bilsemAkis);
