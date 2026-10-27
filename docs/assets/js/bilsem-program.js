/* =====================================================================
   BİLSEM MATEMATİK ÇERÇEVE ÖĞRETİM PROGRAMLARI (2024) — öğrenme çıktıları
   Kaynak: MEB Özel Eğitim ve Rehberlik Hizmetleri Genel Müdürlüğü,
   "BİLSEM Matematik Dersi Destek-BYF" ve "ÖYG-PÜY Çerçeve Öğretim Programı".
   Kazanım cümleleri resmî metinle birebirdir (deftere yazılacak cümle).
   hafta: [ilk, son] öğretim haftası; örnek yıllık planlardaki sürelerle
   2026-2027 takvimine yerleştirildi (bkz. MC.bilsemTakvim).
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.bilsemTakvim = { baslangic: "2026-09-14", tatiller: ["2026-11-16", "2027-01-25", "2027-02-01", "2027-03-08"], bitis: "2027-06-25" };
MC.bilsemProgram = {
 "des": {
  "ad": "Destek Eğitim",
  "kisa": "Destek",
  "renk": "#35e0b0",
  "grup": "İlkokul",
  "aciklama": "Uyum sonrası ilk program: matematiğin tarihi, sayı hissi, oyunlardaki algoritmalar.",
  "temalar": [
   {
    "no": 1,
    "ad": "MATEMATİK TARİHİ",
    "aciklama": "Bu temada öğrencilerin matematiksel kavramların gelişim süreçleriyle bilim insanlarının matematiğe olan katkılarını, matematiksel kavramların günlük yaşamla ilişkilerini sorgulayabilmeleri ve geçmişten günümüze kullanılmış farklı sayı sistemleri ve farklı çarpma yöntemlerini değerlendirebilmeleri amaçlanmaktadır.",
    "icerik": [
     "Matematiğin doğuşu",
     "Rakamların tarihi",
     "Eski uygarlıklarda matematik",
     "Sayı sistemleri",
     "Farklı çarpma yöntemleri"
    ],
    "kavramlar": "Sayma, aritmetik, rakam, sayı, sayı sistemleri, basamak, taban",
    "ciktilar": [
     {
      "id": "des.1.1",
      "kod": "MAT.DES.1.1",
      "ad": "Matematiğin, geçmişten günümüze farklı kültür ve medeniyetlerin katkıları ile gelişimini ve matematiksel kavramların günlük yaşamla ilişkilerini sorgulayabilme",
      "alt": [
       [
        "a",
        "Matematiğin gelişiminde önemli rol oynayan temel kavramları belirler."
       ],
       [
        "b",
        "Belirlediği kavramların ortaya çıkışına dair sorular sorar."
       ],
       [
        "c",
        "Tarihte bilinen ilk matematikçiler ve yaptığı çalışmalarla ilgili bilgi toplar."
       ],
       [
        "d",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "e",
        "Toplanan bilgiler üzerinde çıkarımlar yapar."
       ]
      ],
      "hafta": [
       1,
       2
      ]
     },
     {
      "id": "des.1.2",
      "kod": "MAT.DES.1.2",
      "ad": "Geçmişten günümüze kullanılmış farklı sayı sistemleri ve farklı çarpma yöntemlerini değerlendirebilme",
      "alt": [
       [
        "a",
        "Geçmişten günümüze kullanılmış farklı sayı sistemleri (Mısır, Maya ve Babil vb.) ve farklı çarpım yöntemlerine (Napier’in kemikleri, Rus köylü metodu, Çizgilerle çarpma vb.) ilişkin bir ölçüt (pratiklik, estetiklik, yalınlık vb.) belirler."
       ],
       [
        "b",
        "Belirlenen ölçüte göre farklı yöntemlere ilişkin ölçme yapar."
       ],
       [
        "c",
        "Ölçme sonuçlarını belirlediği ölçütlerle karşılaştırır."
       ],
       [
        "d",
        "Karşılaştırmalara ilişkin yargıda bulunur."
       ]
      ],
      "hafta": [
       3,
       4
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "SAYI HİSSİ, SAYILAR VE ÖRÜNTÜLER",
    "aciklama": "Bu temada öğrencilerin zihinden işlem yapma stratejilerini geliştirebilmeleri, günlük hayatta kullanılan standart olmayan ölçü birimlerini matematiksel olarak yorumlayabilmeleri, doğal sayı ve özel sayı örüntülerinin elemanları arasındaki ilişkilere dair muhakeme yapabilmeleri amaçlanmaktadır.",
    "icerik": [
     "Standart ve standart olmayan ölçme",
     "Özel sayı örüntüleri (Mutlu sayılar, Mükemmel sayılar, Palindromik sayılar, Harshad sayılar, Zengin sayılar, Fermi problemleri ile ölçü birimlerini kullanma vb.)"
    ],
    "kavramlar": "Örüntü, Terim, Standart ölçme, Standart olmayan ölçme",
    "ciktilar": [
     {
      "id": "des.2.1",
      "kod": "MAT.DES.2.1",
      "ad": "Doğal sayılarla zihinden işlem yapma stratejilerini kullanarak gerçek sonucu tahmin edebilme",
      "alt": [
       [
        "a",
        "Doğal sayılarla işlemlerde uygun tahmin stratejisi kullanarak verileri toplar."
       ],
       [
        "b",
        "Toplanan veriler üzerinden kurala dayalı hesaplamalar yapar."
       ],
       [
        "c",
        "Yaptığı hesaplamalar üzerinden ileriye dönük yargıda bulunur."
       ]
      ],
      "hafta": [
       5,
       6
      ]
     },
     {
      "id": "des.2.2",
      "kod": "MAT.DES.2.2",
      "ad": "Standart ve standart olmayan ölçü birimleri ile ilgili çıkarım yapabilme",
      "alt": [
       [
        "a",
        "Günlük hayattaki matematiksel nicelikler ile ilgili standart ve standart olmayan ölçümlerin özellikleri hakkında varsayımda bulunur."
       ],
       [
        "b",
        "Belirlenen özelliklere ilişkin elde edilen sonuçları listeler."
       ],
       [
        "c",
        "Sonuçları varsayımları ile karşılaştırır."
       ],
       [
        "ç",
        "Standart ve standart olmayan ölçümlerin özelliklerine dair önermeler sunar."
       ],
       [
        "d",
        "Sunduğu önermeleri ölçüm birimlerinin kullanışlılığı açısından değerlendirir."
       ]
      ],
      "hafta": [
       7,
       8
      ]
     },
     {
      "id": "des.2.3",
      "kod": "MAT.DES.2.3",
      "ad": "Doğal sayı örüntülerinin kuralına ilişkin muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Doğal sayı örüntülerindeki ilişkilere yönelik varsayımda bulunur."
       ],
       [
        "b",
        "Varsayıma yönelik örüntüdeki terimleri inceleyerek örüntünün kuralına ilişkin genellemeleri belirler."
       ],
       [
        "c",
        "Genellediği ilişkilerin varsayımını karşılayıp karşılamadığını sınar."
       ],
       [
        "ç",
        "Varsayımı ile ilgili ulaştığı sonuca yönelik doğrulayabileceği önermeyi sözel ve/veya sembolik temsiller kullanarak sunar."
       ],
       [
        "d",
        "Sunduğu önermenin kullanışlılığına yönelik gerekçeler sunar."
       ],
       [
        "e",
        "Sunduğu önermenin geçerliliğini destekleyen kapsayıcı örnekler verir."
       ],
       [
        "f",
        "İşe koştuğu doğrulamanın benzer önermelere uygulanıp uygulanamayacağını değerlendirir."
       ]
      ],
      "hafta": [
       9,
       11
      ]
     },
     {
      "id": "des.2.4",
      "kod": "MAT.DES.2.4",
      "ad": "Özel sayı örüntülerin terimleri arasındaki ilişkileri yorumlayabilme",
      "alt": [
       [
        "a",
        "Seçilen özel sayı örüntülerinin terimlerini ve terimleri arasındaki ilişkiyi inceler."
       ],
       [
        "b",
        "İncelediği terimler arasındaki ilişkiyi tablo, ağ, şema gibi matematiksel temsillerle ifade eder."
       ],
       [
        "c",
        "Özel sayı örüntülerin terimleri arasındaki ilişkileri kendi ifadelerini kullanarak açıklar."
       ]
      ],
      "hafta": [
       12,
       14
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "ALGORİTMA VE OYUN",
    "aciklama": "Bu temada öğrencilerin matematiksel oyunlardaki algoritmalar aracılığıyla matematiksel problem çözme becerisinin geliştirilmesi ve matematiksel oyunlarda bulunan algoritmik yapıları yorumlayabilme amaçlanmaktadır.",
    "icerik": [
     "Algoritmik problemler (Hanoi Kulesi, Kare Bölmece Oyunu, Şeker Almaca Sayı İnmece, Josephus Problemi), Matematiksel Oyunlar (Sudoku, Kendoku, Kakuro, İşlem Karesi, Sihirli Piramit, Amiral Battı, Apartmanlar vb.)"
    ],
    "kavramlar": "Algoritma, Oyun Stratejileri, Problem, Matematiksel Oyun",
    "ciktilar": [
     {
      "id": "des.3.1",
      "kod": "MAT.DES.3.1",
      "ad": "Algoritmik yapıdaki problemleri çözebilme",
      "alt": [
       [
        "a",
        "Algoritmik yapıdaki problemlerdeki matematiksel bileşenleri (sayı, işlem, örüntü, şekil, değişken ve değişken türleri) belirler."
       ],
       [
        "b",
        "Problemde bileşenler arasındaki niceliksel ilişkileri (değişim, bilinen-bilinmeyen gibi) belirler."
       ],
       [
        "c",
        "Belirlediği ilişkileri niceliksel ve değişimsel vb. matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Dönüştürdüğü temsilleri kendi ifadeleri ile açıklar."
       ],
       [
        "d",
        "Mevcut bilgilerinden yararlanarak (açıkladığı temsile dayalı) problemin çözümüne yönelik stratejileri tahmin eder."
       ],
       [
        "e",
        "Problemin çözümüne yönelik stratejiler oluşturur."
       ],
       [
        "f",
        "Oluşturduğu stratejileri çözüm için uygular."
       ],
       [
        "g",
        "Çözümün doğruluğunu uygun araç ve gereçler yardımıyla kontrol ederek çözüme ulaştırmayan stratejiyi değiştirir."
       ],
       [
        "ğ",
        "Problemin olası farklı çözüm stratejilerini inceler."
       ],
       [
        "h",
        "Çözüm için kullandığı stratejileri, kullanışlılık ve verimlilik açısından değerlendirir."
       ]
      ],
      "hafta": [
       15,
       18
      ]
     },
     {
      "id": "des.3.2",
      "kod": "MAT.DES.3.2",
      "ad": "Matematiksel oyunlarda bulunan algoritmik yapıları yorumlayabilme",
      "alt": [
       [
        "a",
        "Verilen matematiksel oyunların (Kendoku, Kakuro, İşlem Karesi vb.) içerisindeki algoritmik bileşenleri (sayı, işlem, örüntü veya şekilleri) belirler."
       ],
       [
        "b",
        "Bileşenler arasındaki algoritmik ilişkileri (terimler arası değişim, terim sayısı ve terimler arası ilişki vb.) belirler."
       ],
       [
        "c",
        "Belirlediği ilişkileri matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Matematiksel temsilleri kullanarak matematiksel oyunu kazanmak için gerekli hamleleri ifade eder."
       ]
      ],
      "hafta": [
       19,
       22
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "UZAY VE ŞEKİL",
    "aciklama": "Bu temada öğrencilerin temel geometrik şekillerin inşası için temel ölçme, çizim ve hesaplama araçlarından yararlanabilmeleri, temel geometrik şekilleri kullanarak bir süsleme ve/veya bir kaplama yapmak için matematiksel araç ve teknolojiden yararlanabilmeleri amaçlanmaktadır.",
    "icerik": [
     "Temel geometrik çizimler ve İnşa",
     "Çember",
     "Süsleme ve Kaplama"
    ],
    "kavramlar": "Süsleme, kaplama, doğru, doğru parçası, çokgen, çember",
    "ciktilar": [
     {
      "id": "des.4.1",
      "kod": "MAT.DES.4.1",
      "ad": "Temel geometrik şekillerin inşası için ölçüsüz cetvel ve pergel araçlarından yararlanabilme",
      "alt": [
       [
        "a",
        "Temel geometrik şekillerin (doğru, doğru parçası, çokgen ve çember) inşasında ölçüsüz cetvel ve pergeli kullanım amaçları ile tanır."
       ],
       [
        "b",
        "Verilen matematiksel bir durum veya problemin çözümü için gereken geometrik şekillerin inşasında ölçüm, çizim, hesaplamada kullanabileceği uygun araç gereçleri belirler."
       ],
       [
        "c",
        "Matematiksel bir durum, bir problem veya bir ürün/tasarımının inşası için belirlenen araç gereçleri kullanır."
       ]
      ],
      "hafta": [
       23,
       26
      ]
     },
     {
      "id": "des.4.2",
      "kod": "MAT.DES.4.2",
      "ad": "Temel geometrik şekilleri kullanarak bir süsleme ve/veya kaplama yapmak için matematiksel araçlardan yararlanabilme",
      "alt": [
       [
        "a",
        "Verilen bir yüzeyi kaplamak ve/veya süslemek için gereken matematiksel araçları tanır."
       ],
       [
        "b",
        "Bir yüzeyi kaplamak ve/veya süslemek için gereken araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Kaplama ve süsleme yapmak için belirlenen matematiksel araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       27,
       30
      ]
     }
    ]
   },
   {
    "no": 5,
    "ad": "VERİ İLE ÇALIŞMA",
    "aciklama": "Bu temada öğrencilerin istatistiksel araştırma gerektiren durumları belirlemesi, duruma özgü araştırma soruları oluşturması ve kategorik veya nicel (kesikli) veriye dayalı karar verebilmeleri amaçlanmaktadır.",
    "icerik": [
     "Araştırma sorusu",
     "Kategorik veri dağılımları",
     "Web2 araçları ile veri toplama"
    ],
    "kavramlar": "Kategorik veri, nicel veri, kesikli veri, istatistiksel araştırma",
    "ciktilar": [
     {
      "id": "des.5.1",
      "kod": "MAT.DES.5.1",
      "ad": "Kategorik veya nicel (kesikli) veriye dayalı karar verebilme",
      "alt": [
       [
        "a",
        "Yakın çevresinde veya ilgi alanında bulunan, istatistiksel araştırma ile ele alınabilecek durumları belirler."
       ],
       [
        "b",
        "Belirlediği durum için, veriye dayalı cevaplanabilecek; betimleme, karşılaştırma ve ilişkileri incelemeye yönelik araştırma sorusu veya soruları oluşturur."
       ],
       [
        "c",
        "Veri toplama araçlarını belirler, oluşturur veya hazır veri toplama araçlarını araştırma sorularına göre uyarlayıp, verilerin toplanması sürecini planlar."
       ],
       [
        "ç",
        "Veri toplama araçlarını kullanarak verileri toplar, topladığı verileri şema, tablo veya grafik gösterimlerinden uygun olanları seçerek düzenler."
       ],
       [
        "d",
        "Araştırma sorusu bağlamında verilerin analize uygun parametrelerini belirler."
       ],
       [
        "e",
        "Belirlediği parametreleri hesaplar."
       ],
       [
        "f",
        "Bulgulardan araştırma sorusuna yönelik sonuçlar elde eder."
       ],
       [
        "g",
        "Elde ettiği sonuçların araştırma sorusuna ne derece cevap verdiğini değerlendirip, cevap veremediği durumlar için yeni bir istatistiksel araştırmanın detaylarına karar verip planlayarak uygun öneriler geliştirir."
       ]
      ],
      "hafta": [
       31,
       36
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 36
 },
 "byf": {
  "ad": "Bireysel Yetenekleri Fark Ettirme",
  "kisa": "BYF",
  "renk": "#5b8cff",
  "grup": "Ortaokul",
  "aciklama": "Sayı sistemleri, asallar ve sanılar, algoritmalar, geometri ve veri.",
  "temalar": [
   {
    "no": 1,
    "ad": "MATEMATİK TARİHİ",
    "aciklama": "Bu temada öğrencilerin sayma sistemleri ve eski uygarlıklarda kullanılan işlemler hakkında değerlendirme yapabilmeleri amaçlanmaktadır.",
    "icerik": [
     "Sayma sistemleri (basamak kavramı, Babil sayı sistemi, Mısır sayı sistemi, İkili Sayma Sistemi) Eski uygarlıklarda kullanılan işlemler (Mısırlılarda Çarpma, Rus Çarpma Yöntemi, Kesirler, Bölme vb.)"
    ],
    "kavramlar": "Sayı Sistemi, Rakam, Basamak Değeri, Üslü İfade",
    "ciktilar": [
     {
      "id": "byf.1.1",
      "kod": "MAT.BYF.1.1",
      "ad": "Günümüzde kullanılan modern sayı sistemleri ile geçmişte kullanılmış sayı sistemlerinin ilişkilerine dair matematiksel muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Geçmişte kullanılmış olan sayma sistemlerine (Mısır, Maya, Babil sayıları vb.) ilişkin özellikleri belirler."
       ],
       [
        "b",
        "Belirlediği özellikleri, günümüzde kullanılan modern sayı sistemlerinin içerdiği özellik bakımından (basamak değeri vb.) ilişkilendirir."
       ],
       [
        "c",
        "İlişkilendirdiği durumları matematiksel temsillerden yararlanarak ifade eder."
       ],
       [
        "ç",
        "İfade ettiği durumları matematiksel dil kullanarak açıklar."
       ],
       [
        "d",
        "Geçmişte kullanılmış sayı sistemleri ile günümüz sayı sistemleri arasındaki ilişkilere dair varsayımlarda bulunur."
       ],
       [
        "e",
        "Varsayımlarda bulduğu ilişkileri inceleyerek genellemeleri belirler."
       ],
       [
        "f",
        "Elde ettiği genellemeler ile varsayımları, özellikleri bakımından karşılaştırır."
       ],
       [
        "g",
        "Varsayımda ulaştığı sonuç doğrultusunda kendine özgü bir sayı sistemi önerisi sunar."
       ],
       [
        "ğ",
        "Sunduğu sayı sistemi önerisini kullanışlılık, pratiklik vb. özelliklere göre değerlendirir."
       ]
      ],
      "hafta": [
       1,
       3
      ]
     },
     {
      "id": "byf.1.2",
      "kod": "MAT.BYF.1.2",
      "ad": "Eski uygarlıklarda kullanılan işlemler ile sayı sistemleri arasındaki ilişkiler üzerine eleştirel düşünebilme",
      "alt": [
       [
        "a",
        "Eski uygarlıklarda benimsenen sayı sistemleri ve bu sistemler içinde kullanılan matematiksel işlemlerin özelliklerini sorgular."
       ],
       [
        "b",
        "Eski uygarlıkların sayı sistemleri ve işlemleri arasındaki ilişkilere dair akıl yürütür."
       ],
       [
        "c",
        "Eski uygarlıkların sayı sistemleri ve işlemleri arasındaki ilişkilere dair oluşturduğu çıkarımları yansıtır."
       ]
      ],
      "hafta": [
       4,
       4
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "NİCELİKLER VE DEĞİŞİMLER",
    "aciklama": "Bu temada öğrencilerin asal sayılar, bölünebilme, özel sayı dizileri ve ünlü sanılar hakkında sorgulama yapabilmeleri, özdeşlikler ve cebirsel ifadelere ilişkin görsel doğrulamalar yapabilmelerini ve mantıksal akıl yürütme problemlerini çözebilmeleri amaçlanmaktadır.",
    "icerik": [
     "Asal sayılar, Asal çarpanlar, Bölme, Bölünebilme",
     "Özel sayı dizileri (Çokgensel Sayı, Fibonacci Sayı Dizisi vb.)",
     "Matematiksel Sanılar (Goldbach Sanısı, İkiz Asallar Sanısı, Collatz Sanısı vb.)",
     "Mantıksal Akıl Yürütme Problemleri (Dolap Problemi, Hanoi Kuleleri, At Satrancı Oyunu, Kriptoloji, Pisagor Bağıntısı, Pick Teoremi, Pi Sayısı, Özel tanımlı sayılar (mutlu sayılar, mükemmel sayılar, palindromik sayılar, ikiz asallar, Harshad sayılar, Zengin sayılar, Lasa sayılar, Döngüsel sayılar, Bağdaşık sayılar vb.)",
     "Cebirsel ifadeler ve özdeşliklere ilişkin görsel doğrulama (Tam Kare İfade Özdeşliği, İki Kare Farkı Özdeşliği, Küpler toplamı, Küpler farkı vb.)"
    ],
    "kavramlar": "Asallık, Sayı dizi, Bölünebilme, Önerme, Denklem, Özdeşlik",
    "ciktilar": [
     {
      "id": "byf.2.1",
      "kod": "MAT.BYF.2.1",
      "ad": "Bir doğal sayı ile asal çarpanları ve tam bölenleri arasındaki ilişkilere dair çıkarım yapabilme",
      "alt": [
       [
        "a",
        "Bir doğal sayının asal çarpanlarının çarpımı şeklinde yazımı ve tam bölenleri hakkında varsayımlarda bulunur."
       ],
       [
        "b",
        "Farklı örneklerden elde ettiği örüntüleri listeleyerek bir doğal sayının asal çarpanları ve tam bölenleri hakkındaki varsayımlarına yönelik genellemeler yapar."
       ],
       [
        "c",
        "Oluşturduğu genellemelerin varsayımlarını karşılayıp karşılamadığını örneklerle sınar."
       ],
       [
        "ç",
        "Bir doğal sayının asal çarpanları ve tam bölenleri ile ilgili ulaştığı sonuçlara yönelik matematiksel önermeler sunar."
       ],
       [
        "d",
        "Elde ettiği önermelerin gerçek yaşam problemlerinin çözümlerindeki kullanışlılığını değerlendirir."
       ]
      ],
      "hafta": [
       5,
       5
      ]
     },
     {
      "id": "byf.2.2",
      "kod": "MAT.BYF.2.2",
      "ad": "Özel sayı dizilerinin kuralına ilişkin matematiksel muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Özel sayı dizilerinin terimleri arasındaki ilişkileri hakkında varsayımda bulunur."
       ],
       [
        "b",
        "Varsayımdaki argümanların ilişkilerini inceleyerek, örüntülere ait genellemeleri görsel model veya formel dil ile ifade eder."
       ],
       [
        "c",
        "Elde ettiği genellemelerin öne sürdüğü varsayımları karşılayıp karşılamadığını sınar."
       ],
       [
        "ç",
        "Varsayımları ile genellemelerini karşılaştırmasının sonucunda, özel sayı dizisine yönelik önermeler sunar."
       ],
       [
        "d",
        "Sunduğu önermelerin özel sayı dizisine uygunluğunu değerlendirir."
       ],
       [
        "e",
        "Sunduğu ya da sunulan önermeyi görsel modeller yardımıyla matematiksel olarak doğrular."
       ],
       [
        "f",
        "Özel sayı dizilerine ilişkin görsel modellere dayalı doğruladığı önermenin geçerlik ve sınırlılık koşullarını değerlendirir."
       ]
      ],
      "hafta": [
       6,
       6
      ]
     },
     {
      "id": "byf.2.3",
      "kod": "MAT.BYF.2.3",
      "ad": "Ünlü sanılar hakkında sorgulama yapabilme",
      "alt": [
       [
        "a",
        "Matematiğin ünlü sanılarını (Collatz Sanısı, Goldbach Sanısı, İkiz Asallar Sanısı vb.) ifade eder."
       ],
       [
        "b",
        "İfade edilen sanılar hakkında sorular sorar."
       ],
       [
        "c",
        "Matematik tarihinden ünlü sanılar ve sanı kavramı hakkında bilgi toplar."
       ],
       [
        "ç",
        "Matematiğin ünlü sanılarına dair topladığı bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Değerlendirdiği bilgiler üzerinden sanılar hakkında çıkarım yapar."
       ]
      ],
      "hafta": [
       7,
       8
      ]
     },
     {
      "id": "byf.2.4",
      "kod": "MAT.BYF.2.4",
      "ad": "Özdeşlikler ve cebirsel ifadeler ile ilgili görsel doğrulama yapabilme",
      "alt": [
       [
        "a",
        "Özdeşlikler ve cebirsel ifadeler ile ilgili (Tam Kare İfade Özdeşliği, İki Kare Farkı Özdeşliği, Küpler toplamı, Küpler farkı) görsel doğrulama yöntemleri ile doğrular."
       ],
       [
        "b",
        "Doğruladığı önermeyi gözden geçirerek yeni özdeşliklere uyarlar."
       ]
      ],
      "hafta": [
       9,
       11
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "ALGORİTMA VE BİLİŞİM",
    "aciklama": "Bu temada öğrencilerin matematiksel problemleri algoritma geliştirerek çözebilmesi ve bu çözüm sürecinde uygun matematiksel araç ve teknolojiden yararlanması amaçlanmaktadır.",
    "icerik": [
     "Algoritmik Problemler (Hanoi Kulesi, Kare Bölmece Oyunu, Collatz Sanısı, Graf Teori, Hamilton Köprüsü, Algoritma ile Yön Bulma, Çokgensel Sayı, Fibonacci Sayı Dizisi, Asal Sayı, vb.)",
     "Blok Tabanlı Kodlama"
    ],
    "kavramlar": "Algoritma, Algoritmik Dil, İşlem, Örüntü, Dizi, Blok Kod",
    "ciktilar": [
     {
      "id": "byf.3.1",
      "kod": "MAT.BYF.3.1",
      "ad": "Verilen bir problemi algoritma geliştirerek çözebilme",
      "alt": [
       [
        "a",
        "Verilen problemdeki matematiksel bileşenlerin sayı, işlem, örüntü, şekil ve/veya uygun değişkenlerini belirler."
       ],
       [
        "b",
        "Problemden belirlediği bileşenler arasındaki ilişkileri parça-bütün, oransal/bağıl değişim veya bilinen-bilinmeyen olarak belirler."
       ],
       [
        "c",
        "Ortaya koyduğu ilişkileri, algoritmik dile (sözel, akış şeması, sözde kod) dönüştürür."
       ],
       [
        "ç",
        "Algoritmik dile dönüştürdüğü problemi kendi ifadeleri ile açıklar."
       ],
       [
        "d",
        "Açıkladığı temsile bağlı kalarak verilen problemin çözümüne yönelik mevcut stratejileri tahmin eder."
       ],
       [
        "e",
        "Problemin çözümüne yönelik algoritmik stratejiler oluşturur."
       ],
       [
        "f",
        "Oluşturduğu algoritmik stratejileri işe koşarak problemi çözer."
       ],
       [
        "g",
        "Çözümün doğruluğunu kontrol ederek çözüme ulaşmayan stratejiyi değiştirir."
       ],
       [
        "ğ",
        "Problemin olası farklı algoritmik çözüm stratejilerini gözden geçirir."
       ],
       [
        "h",
        "Geliştirdiği farklı algoritmik çözüm stratejilerine dayalı çıkarım yapar."
       ],
       [
        "ı",
        "Çözüm için kullandığı algoritmik stratejileri kullanışlılık ve verimlilik açılarından değerlendirir."
       ]
      ],
      "hafta": [
       12,
       15
      ]
     },
     {
      "id": "byf.3.2",
      "kod": "MAT.BYF.3.2",
      "ad": "Algoritma temelli problemlerin çözümleri için matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Algoritma temelli problemlerin çözümü için kullanılabilecek blok tabanlı kod yazma araç ve teknolojileri tanır."
       ],
       [
        "b",
        "Verilen matematiksel örüntüleri incelemek ve örüntünün genel ifadesine ulaşmak için gereken blok kodlama aracını belirler."
       ],
       [
        "c",
        "Belirlediği blok kodlama aracını problemin çözümünde kullanır."
       ]
      ],
      "hafta": [
       16,
       18
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "UZAY VE ŞEKİL",
    "aciklama": "Bu temada öğrencilerin geometrik şekiller ve cisimlerin parçaları arasında muhakeme yapabilmeleri, temel geometrik şekilleri kullanarak bir süsleme veya bir kaplama yapmak için eleştirel düşünme becerisi kullanarak geometrik problemlerinin çözümü için matematiksel araç ve teknolojiden yararlanabilmeleri amaçlanmaktadır.",
    "icerik": [
     "Çevre-alan ilişkisi.",
     "Çokgenlerin iç açıları toplamı, platonik cisimlerin özellikleri, Euler özdeşliği, çokgende alan bağıntıları.",
     "Süsleme ve Kaplama, Geometrik nicelikler.",
     "Eşlik ve benzerlik, doğru parçalarının kesişimi ile oluşan bölge sayıları, fraktal, Pisagor ağacı, Sierpinski üçgeni, üçgende açı kenar bağıntıları, pentapleksler, farklı yönlerden görünümler, üçgenin yardımcı elemanları, geometrik açınım, geometrik cisimlerin arakesitleri."
    ],
    "kavramlar": "Süsleme, Kaplama, Arakesit",
    "ciktilar": [
     {
      "id": "byf.4.1",
      "kod": "MAT.BYF.4.1",
      "ad": "Geometrik nicelikler (uzunluk ve alan) içeren problemler çözebilme",
      "alt": [
       [
        "a",
        "Probleme ilişkin parçaları belirler."
       ],
       [
        "b",
        "Parçalar arasındaki ilişkileri belirler."
       ],
       [
        "c",
        "Verilen geometri problemini çözmek için strateji oluşturur."
       ],
       [
        "ç",
        "Oluşturduğu stratejiyi kullanarak ilgili problemi çözer."
       ],
       [
        "d",
        "Çözümlerini kontrol eder."
       ],
       [
        "e",
        "Verilen geometri probleminin çözümündeki deneyimlerini gözden geçirir."
       ],
       [
        "f",
        "Deneyimine dayalı çıkarım yapar."
       ],
       [
        "g",
        "Ulaşılan çıkarımları değerlendirir."
       ]
      ],
      "hafta": [
       19,
       21
      ]
     },
     {
      "id": "byf.4.2",
      "kod": "MAT.BYF.4.2",
      "ad": "Geometrik şekillerin veya cisimlerin bileşenleri arasındaki ilişkiler ile ilgili muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Geometrik şekillerin/cisimlerin bileşenlerine ait özelliklerini (Kenar, açı yüzey özellikleri vb.) belirler."
       ],
       [
        "b",
        "Geometrik şekillerin/cisimlerin bileşenlerine ait özellikleri (iç açıları toplamı, ayrıt yüzey ve köşe sayıları ilişkileri) örüntüsel olarak ilişkilendirir."
       ],
       [
        "c",
        "İlişkilendirdiği matematiksel durumu matematiksel temsillerle ifade eder."
       ],
       [
        "ç",
        "İfade ettiği matematiksel temsili formel dil kullanarak gösterir."
       ],
       [
        "d",
        "Geometrik şekillerin/cisimlerin (iç açıları toplamı, ayrıt yüzey ve köşe sayıları ilişkileri) bileşenlerine ait özellikleri ile ilgili varsayımda bulunur."
       ],
       [
        "e",
        "Varsayımına dayalı genellemelerde bulunur."
       ],
       [
        "f",
        "Varsayımına dayalı elde ettiği genellemenin varsayımını karşılayıp karşılamadığını şekil, tablo ile sınar."
       ],
       [
        "g",
        "Varsayımı ile ilgili ulaştığı sonuca yönelik matematiksel önermesini formel bir dil ile ifade eder."
       ],
       [
        "ğ",
        "Elde ettiği önermelerin kullanışlılığını ve geliştirebilirliğini değerlendirir."
       ]
      ],
      "hafta": [
       22,
       24
      ]
     },
     {
      "id": "byf.4.3",
      "kod": "MAT.BYF.4.3",
      "ad": "Temel geometrik şekilleri kullanarak bir süsleme ve/veya kaplama sentezleyebilme",
      "alt": [
       [
        "a",
        "Kaplama ve süsleme yapabilmek için uygun olan geometrik şekilleri ve özelliklerini belirler."
       ],
       [
        "b",
        "Kaplama ve süsleme yapabilmek için uygun olan şekiller ve özellikleri arasında ilişki kurar."
       ],
       [
        "c",
        "Belirlenen şekillere ve özelliklerine uygun özgün süsleme ve kaplama oluşturur."
       ]
      ],
      "hafta": [
       25,
       26
      ]
     },
     {
      "id": "byf.4.4",
      "kod": "MAT.BYF.4.4",
      "ad": "Ölçme, çizim, hesaplama içeren geometri problemlerinin çözümlerinde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Ölçme, çizim, hesaplama içeren geometri problemi (Sierpinski Üçgeni, arakesit, açınım, Pisagor Teoremi, vb) ile ilgili temel ölçme, çizim, hesaplama araçları ve görselleştirme-dinamik geometri yazılımlarını kullanım amaçları doğrultusunda tanır."
       ],
       [
        "b",
        "Ölçme, çizim, hesaplama içeren geometri problemi için uygun araç veya teknolojiyi verimlilik, ekonomiklik ve kullanışlılık kriterlerine göre belirler."
       ],
       [
        "c",
        "Belirlediği araçları ilgili problemlerin çözümü için kullanır."
       ]
      ],
      "hafta": [
       27,
       31
      ]
     }
    ]
   },
   {
    "no": 5,
    "ad": "VERİLER İLE ÇALIŞMA",
    "aciklama": "Bu temada öğrencilerin başkaları tarafından oluşturulan kategorik veya nicel (kesikli) veriye dayalı istatistiksel özet, bulgu, sonuç ve tahminler hakkında tartışabilme, veriye dayalı karar verebilme becerisi kazanarak yöntem için uygun matematiksel araç ve teknolojiyi kullanmaları amaçlanmaktadır.",
    "icerik": [
     "Araştırma Sorusu",
     "Örneklem",
     "Yöntem",
     "Gerçek Veri Seti",
     "Gerçek Yaşam Problemleri",
     "Teknolojik Araç"
    ],
    "kavramlar": "Veri, Nicel Veri, Kategorik Veri",
    "ciktilar": [
     {
      "id": "byf.5.1",
      "kod": "MAT.BYF.5.1",
      "ad": "Kategorik, nicel (kesikli) ve geleneksel olmayan (resim vb.) veri türleri için başkaları tarafından oluşturulmuş istatiksel tablo ve grafikleri, ölçüleri ve bulguları tartışabilme",
      "alt": [
       [
        "a",
        "Verilen veri türleri için başkaları tarafından oluşturulmuş istatistiksel tablo ve grafiklere, sonuçlara, yorumlara, çıkarım veya tahminlere yönelik istatistiksel temellendirme yapar."
       ],
       [
        "b",
        "Veri türleri için başkaları tarafından oluşturulmuş istatistiksel tablo ve grafiklere, sonuçlara, yorumlara, çıkarım veya tahminlere ilişkin hata veya yanlılıkları tespit eder."
       ],
       [
        "c",
        "Veri türleri için başkaları tarafından oluşturulmuş istatistiksel tablo ve grafiklere, sonuçlara, yorumlara, çıkarım veya tahminleri çürütür ya da kabul eder."
       ]
      ],
      "hafta": [
       32,
       33
      ]
     },
     {
      "id": "byf.5.2",
      "kod": "MAT.BYF.5.2",
      "ad": "Kategorik, nicel (kesikli) ve geleneksel olmayan (resim vb.) veri ile çalışabilme ve veriye dayalı karar verebilme",
      "alt": [
       [
        "a",
        "Gerçek yaşamla ilgili verilere dayalı istatistiksel araştırma gerektiren durumları fark eder."
       ],
       [
        "b",
        "En az iki değişken (kategorik-kategorik, nicel-kategorik, nicel-nicel) içeren araştırma sorularını oluşturarak, araştırma sorularını problem durumu bakımından karşılaştırır."
       ],
       [
        "c",
        "Veri toplama araçlarını oluşturarak (veya araştırma sorusuna yönelik hazır veri toplama araçlarını kullanarak) verilerin toplanması sürecini planlar."
       ],
       [
        "ç",
        "Veri toplama araçlarından ve gerçek veri setlerinden yararlanarak (TÜİK verileri, uluslararası evrensel veriler vb.) verilerin farklı temsillerle (şema, tablo veya grafik) gösterimlerini yapar."
       ],
       [
        "d",
        "Teknolojik araç ve gereçleri kullanarak (CODAP, SPSS, MS Excel, TinkerPlots, vb.) araştırma sorusu bağlamında verilerin, analize uygun parametrelerini hesaplar."
       ],
       [
        "e",
        "Elde ettiği bulgulara yönelik sonuçlar çıkarır."
       ],
       [
        "f",
        "Ulaştığı çıkarımların veya sonuçların araştırma sorusuna ne düzeyde cevap verdiğini değerlendirerek öneriler sunar."
       ]
      ],
      "hafta": [
       34,
       37
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 37
 },
 "oyg1": {
  "ad": "Özel Yeteneklerin Geliştirilmesi · 1. seviye",
  "kisa": "ÖYG-1",
  "renk": "#ffc657",
  "grup": "Lise",
  "aciklama": "Matematik felsefesi, kümeler ve sayma, modelleme, mantık ve ispat.",
  "temalar": [
   {
    "no": 1,
    "ad": "MATEMATİK TARİHİ VE FELSEFESİ",
    "aciklama": "Bu temada, öğrencilerin matematiğin doğasını felsefi olarak sorgulayabilme becerisinin geliştirilmesi amaçlanmaktadır.",
    "icerik": [
     "Matematiğin icat, keşif, araç, bağımsız bilim vb. olduğuna yönelik felsefik tartışmalar"
    ],
    "kavramlar": "İcat, Keşif, Emprik bilim, Analitik bilim",
    "ciktilar": [
     {
      "id": "oyg1.1.1",
      "kod": "MAT.ÖYG.1.1",
      "ad": "Matematiğin doğasını felsefi olarak sorgulayabilme",
      "alt": [
       [
        "a",
        "Matematiğin doğasına (icat-keşif, araç-amaç, ontolojik, epistemolojik vb.) dair merak ettiği soruları belirler."
       ],
       [
        "b",
        "Matematiğin doğası hakkında sorular sorar"
       ],
       [
        "c",
        "Matematiğin tarihsel süreçteki gelişimine dair bilgi toplar."
       ],
       [
        "ç",
        "Topladığı bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Topladığı bilgiler üzerinde çıkarım yapar."
       ]
      ],
      "hafta": [
       1,
       2
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "KÜMELERDEN SAYMA STRATEJİLERİNE",
    "aciklama": "Bu tema, öğrencilerin rastgele verilen öğeler arasında örüntüler sentezleyebilme, küme kavramını analiz ve yorumlayabilme ayrıca sayma stratejileri (permütasyon ve kombinasyon) ile ilgili problemleri çözebilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Kümeler",
     "Sayı, Şekil ve Harf Örüntüleri",
     "Sayma Stratejileri",
     "Doğrusal Fonksiyonlar"
    ],
    "kavramlar": "Sayma, Küme, Alt küme, Evrensel küme, Boş küme, Fonksiyon",
    "ciktilar": [
     {
      "id": "oyg1.2.1",
      "kod": "MAT.ÖYG.2.1",
      "ad": "Küme kavramını tartışabilme",
      "alt": [
       [
        "a",
        "Küme kavramı ve alt kavramlarına (alt küme, evrensel küme, boş küme) yönelik mantıksal temellendirme yapar."
       ],
       [
        "b",
        "Küme kavramı ve alt kavramlarına (alt küme, evrensel küme, boş küme) yönelik çelişki veya tutarsızlıkları tespit eder."
       ],
       [
        "c",
        "Küme kavramı ve alt kavramlarına (alt küme, evrensel küme, boş küme) yönelik çelişki veya tutarsızlıkları çürütmek veya kabul etmek için argümanlar sunar."
       ]
      ],
      "hafta": [
       3,
       4
      ]
     },
     {
      "id": "oyg1.2.2",
      "kod": "MAT.ÖYG.2.2",
      "ad": "Rastgele verilen öğeler arasından örüntü sentezleyebilme",
      "alt": [
       [
        "a",
        "Rastgele verilen öğelerin (sayılar, harfler, şekiller) örüntü oluşturmaya uygun parçalarını belirler."
       ],
       [
        "b",
        "Belirlediği parçalar arasında ilişki kurar"
       ],
       [
        "c",
        "Belirlediği parçaları birleştirerek özgün bir örüntü oluşturur."
       ]
      ],
      "hafta": [
       5,
       6
      ]
     },
     {
      "id": "oyg1.2.3",
      "kod": "MAT.ÖYG.2.3",
      "ad": "Sayma stratejileri kullanarak problem çözebilme",
      "alt": [
       [
        "a",
        "Sayma stratejileri kullanmayı gerektiren problemlerin matematiksel bileşenleri belirler."
       ],
       [
        "b",
        "Bileşenler arasındaki ilişkiyi belirler."
       ],
       [
        "c",
        "Problem bağlamındaki ifadeleri matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Matematiksel temsillere dönüştürdüğü ifadeleri açıklar."
       ],
       [
        "d",
        "Problemin çözümü için stratejiler geliştirir."
       ],
       [
        "e",
        "Belirlenen stratejileri çözüm için uygular."
       ],
       [
        "f",
        "Çözüm yollarını kontrol eder ve çözüme ulaştırmayan stratejiyi değiştirir."
       ],
       [
        "g",
        "Çözüm için kullandığı veya geliştirdiği stratejileri gözden geçirerek alternatif çözüm yollarını değerlendirir."
       ]
      ],
      "hafta": [
       7,
       8
      ]
     },
     {
      "id": "oyg1.2.4",
      "kod": "MAT.ÖYG.2.4",
      "ad": "Doğrusal fonksiyonlar içeren gerçek yaşam problemlerini çözebilme",
      "alt": [
       [
        "a",
        "Problemin içerdiği sayı, işlem ve değişken bileşenlerini belirler."
       ],
       [
        "b",
        "Problemde bağımlı ve bağımsız değişken arasındaki ilişkiyi belirler."
       ],
       [
        "c",
        "Problem bağlamıyla ilişkili verilenleri uygun matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Problemi matematiksel temsiller kullanarak kendi ifadeleri ile açıklar."
       ],
       [
        "d",
        "Problemin sonucuna ilişkin tahminde bulunur ve işlemleri gerçekleştirmek için stratejiler geliştirir."
       ],
       [
        "e",
        "Belirlenen strateji veya stratejileri çözüm için uygular."
       ],
       [
        "f",
        "Çözüm yollarını kontrol eder ve çözüme ulaştırmayan stratejiyi değiştirir."
       ],
       [
        "g",
        "Problemin çözümü için kullandığı veya geliştirdiği stratejileri gözden geçirerek kısa yolları değerlendirir."
       ],
       [
        "ğ",
        "Kullandığı strateji veya stratejileri farklı problemlerin çözümlerine geneller."
       ],
       [
        "h",
        "Genellemenin geçerliliğini matematiksel örneklerle değerlendirir."
       ]
      ],
      "hafta": [
       9,
       10
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "GÜNLÜK YAŞAMDA MATEMATİK",
    "aciklama": "Bu tema, öğrencilerin günlük hayattan alınan problemlere matematiksel çözümler üretebilme ve matematiksel modelleme problemlerinde matematiksel araçları ve teknolojiyi etkin bir şekilde kullanabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Rutin Problemler",
     "Rutin Olmayan Problemler",
     "Matematiksel Modelleme Problemleri"
    ],
    "kavramlar": "",
    "ciktilar": [
     {
      "id": "oyg1.3.1",
      "kod": "MAT.ÖYG.3.1",
      "ad": "Günlük yaşam problemlerine matematiksel çözümler geliştirebilme",
      "alt": [
       [
        "a",
        "Günlük yaşam problemlerinin çözümü için bir strateji oluşturur."
       ],
       [
        "b",
        "Oluşturduğu stratejiyi kullanarak ilgili problemi çözer."
       ],
       [
        "c",
        "Mevcut problemin çözümünü kontrol eder."
       ]
      ],
      "hafta": [
       11,
       13
      ]
     },
     {
      "id": "oyg1.3.2",
      "kod": "MAT.ÖYG.3.2",
      "ad": "Matematiksel modelleme gerektiren problemlerde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Modelleme gerektiren problemlerin çözümü için (ayak izi, dönme dolap, nasıl depolayalım? vb.) gerekli olan matematiksel araç ve dinamik matematiksel teknolojileri, kullanım amaçları ile tanır."
       ],
       [
        "b",
        "Matematiksel modelleme gerektiren problemin çözümü için gerekli araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Matematiksel modelleme gerektiren problemin çözümü için belirlediği matematiksel araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       14,
       15
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "MANTIK, ALGORİTMA VE BİLİŞİM",
    "aciklama": "Bu tema, günlük hayattan alınan problemlere matematiksel çözümler üretebilme, öğrencilerin blok tabanlı kodlama araçlarındaki mantıksal niceleyicileri yorumlama, algoritma temelli yaklaşımlar kullanarak matematiksel çözümler geliştirme ve yer değiştirme şifrelemesi ile lineer fonksiyonları kullanarak analojik akıl yürütme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Mantık Bağlaçları",
     "Niceleyiciler",
     "Algoritmik Problemler",
     "Affine Şifreleme",
     "Blok Tabanlı Kodlama"
    ],
    "kavramlar": "Algoritma, Şifreleme, Blok kod, Niceleyici, Mantıksal bağlaç, Doğrusal fonksiyon",
    "ciktilar": [
     {
      "id": "oyg1.4.1",
      "kod": "MAT.ÖYG.4.1",
      "ad": "Blok tabanlı yapılar içerisindeki mantık bağlaçlarını ve niceleyicileri çözümleyebilme",
      "alt": [
       [
        "a",
        "Blok tabanlı yapılar içerisinde kullanılan mantık bağlaçlarını ve niceleyicileri belirler."
       ],
       [
        "b",
        "Blok tabanlı yapılar ile mantık bağlaçları ve niceleyiciler arasındaki ilişkileri belirler."
       ]
      ],
      "hafta": [
       16,
       17
      ]
     },
     {
      "id": "oyg1.4.2",
      "kod": "MAT.ÖYG.4.2",
      "ad": "Mantık bağlaçları ve niceleyicilerin algoritmalarda kullanımına yönelik edindiği deneyimi farklı matematiksel görev ve problemlere yansıtabilme",
      "alt": [
       [
        "a",
        "Karşılaştığı algoritmalardaki mantık bağlaçları ve niceleyicilerin kullanımını gözden geçirir."
       ],
       [
        "b",
        "Matematiksel problem çözme, doğrulama ve ispat süreçlerinde mantık bağlaçları ve niceleyicilerin kullanımına yönelik çıkarımlar yapar."
       ],
       [
        "c",
        "Mantık bağlaçları ve niceleyicilerin matematiksel dil üzerindeki rolünü değerlendirir."
       ]
      ],
      "hafta": [
       18,
       19
      ]
     },
     {
      "id": "oyg1.4.3",
      "kod": "MAT.ÖYG.4.3",
      "ad": "Algoritma temelli yaklaşımlar ile problemlere matematiksel çözümler geliştirebilme",
      "alt": [
       [
        "a",
        "Matematiksel problemlerin çözümü için bir algoritma temelli bir strateji oluşturur."
       ],
       [
        "b",
        "Oluşturduğu stratejiyi kullanarak ilgili problemi çözer."
       ],
       [
        "c",
        "Problemin çözümünü kontrol eder."
       ]
      ],
      "hafta": [
       20,
       21
      ]
     }
    ]
   },
   {
    "no": 5,
    "ad": "MATEMATİKSEL DOĞRULAMA VE İSPAT",
    "aciklama": "Bu tema, öğrencilerin tam sayıların özellikleri ve geometrik şekillerin açı ve alan özellikleri bağlamında matematiksel doğrulama ve ispat becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Tam Sayılardaki Temel Özellikler",
     "Bölünebilme Kuralları",
     "Doğruda Açı",
     "Çokgenlerde Açı ve Alan Özellikleri"
    ],
    "kavramlar": "Doğrudan ispat, Geometrik ispat veya doğrulama, Tam sayı, Bölen, Çarpan, Açı, Çokgen, Alan",
    "ciktilar": [
     {
      "id": "oyg1.5.1",
      "kod": "MAT.ÖYG.5.1",
      "ad": "Tam sayıların özellikleri ile ilgili matematiksel doğrulayabilme veya ispatlayabilme",
      "alt": [
       [
        "a",
        "Tam sayıların özellikleri (tek ve çift sayıların toplamları, çarpımları, üslerinin tekliği-çiftliği, bölünebilirlik vb.) matematiksel doğrular veya ispatlar."
       ],
       [
        "b",
        "Doğruladığı veya ispatladığı önermeleri gözden geçirerek yeni durumlara veya kümelere uyarlar."
       ]
      ],
      "hafta": [
       22,
       23
      ]
     },
     {
      "id": "oyg1.5.2",
      "kod": "MAT.ÖYG.5.2",
      "ad": "Geometrik şekillerin açı ve alan özelliklerini doğrulama veya ispatını yapabilme",
      "alt": [
       [
        "a",
        "Geometrik şekillerin açı ve alan özelliklerini (doğruda açılar, çokgenlerde açı- alan özellikleri vb.) matematiksel doğrular veya ispatlar."
       ],
       [
        "b",
        "Doğruladığı veya ispatladığı önermeleri gözden geçirerek yeni durumlara uyarlar."
       ]
      ],
      "hafta": [
       24,
       25
      ]
     }
    ]
   },
   {
    "no": 6,
    "ad": "VERİDEN MATEMATİĞE",
    "aciklama": "Bu tema, öğrencilerin farklı veri türlerini kullanarak istatistiksel problemler belirleyebilme, araştırma sorularına uygun verileri toplayıp düzenleyebilme, soruların cevaplarını bulabilme, bulguları araştırma bağlamında yorumlayabilme ve veri analizinde matematiksel araçlar ile teknolojileri kullanabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "İstatistik",
     "Veri ile Çalışma",
     "İstatistiksel Problem Çözme Aşamaları",
     "Programlama (Excel, codAP) ile Veri Bilimi Kavramları"
    ],
    "kavramlar": "İstatistik, Geleneksel veri (kategorik ve nicel), Geleneksel olmayan veri (resim, metin, ses), Excel, codAP, GeoGebra",
    "ciktilar": [
     {
      "id": "oyg1.6.1",
      "kod": "MAT.ÖYG.6.1",
      "ad": "Farklı veri türleri ile çalışılabilecek istatistiksel problem belirleyebilme",
      "alt": [
       [
        "a",
        "Yakın çevresinde istatistiksel araştırma gerektiren geleneksel (kategorik ve nicel) ve geleneksel olmayan (resim, metin, ses) durumları fark eder."
       ],
       [
        "b",
        "Belirlediği durum çerçevesinde veriye dayalı cevaplanabilecek betimleme ve karşılaştırma içeren araştırma sorusu oluşturur."
       ],
       [
        "c",
        "Oluşturulan araştırma sorusuna uygun veri toplama araçlarını belirler."
       ],
       [
        "ç",
        "Veri toplama aracını oluşturur veya hazır veri toplama araçlarını araştırma sorularına göre uyarlar."
       ],
       [
        "d",
        "Verilerin toplanması sürecini planlar."
       ],
       [
        "e",
        "Oluşturulan araştırma sorusunun veri seti ve araştırma sorusuna uygun analiz yöntemini seçer."
       ],
       [
        "f",
        "Verileri; uygun istatistiksel ölçüleri (merkezi eğilim-dağılım) ve grafikleri kullanarak analiz eder."
       ],
       [
        "g",
        "Bulgulardan araştırma sorusuna yönelik sonuçlar elde eder."
       ],
       [
        "ğ",
        "Elde ettiği çıkarımların veya sonuçların araştırma sorusuna ne derece cevap verdiğini değerlendirir."
       ]
      ],
      "hafta": [
       26,
       28
      ]
     },
     {
      "id": "oyg1.6.2",
      "kod": "MAT.ÖYG.6.2",
      "ad": "Verilerin analizinde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Veri analizinde kullanılan temel düzey matematiksel araç ve teknolojiyi (Excel, codAP, GeoGebra vb.) tanır."
       ],
       [
        "b",
        "Veri analizi için kullanacağı araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Belirlediği araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       29,
       30
      ]
     }
    ]
   },
   {
    "no": 7,
    "ad": "UZAY VE ŞEKİL",
    "aciklama": "Bu tema, Öklid geometrisinin aksiyomatik yapısı bağlamında öğrencilerin tartışabilme becerisini ve mimari ile sanat desenlerinin oluşturulması aracılığıyla matematiksel araç ve teknolojileri kullanabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Öklid Geometrisinin Tanım, Aksiyom ve Postulatları",
     "Mimari ve Sanat Desenlerinin İki Boyutta İnşası ve Çizimi"
    ],
    "kavramlar": "Tanım, Aksiyom, Postulat, Desen, Geometrik yapı, İnşa",
    "ciktilar": [
     {
      "id": "oyg1.7.1",
      "kod": "MAT.ÖYG.7.1",
      "ad": "Öklid geometrisinin aksiyomatik yapısını tartışabilme",
      "alt": [
       [
        "a",
        "Öklid geometrisinin aksiyomatik yapısı ile ilgili mantıksal temellendirme yapar."
       ],
       [
        "b",
        "Temellendirmelerindeki mantıksal çelişki, tutarsızlık veya geçersizlikleri tespit eder."
       ],
       [
        "c",
        "Temellendirmeleri çürütür veya kabul eder."
       ]
      ],
      "hafta": [
       31,
       33
      ]
     },
     {
      "id": "oyg1.7.2",
      "kod": "MAT.ÖYG.7.2",
      "ad": "Mimari ve sanatta kullanılan desenlerin inşa sürecinde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Desenlerin inşasında gerekli olan matematiksel araç ve teknolojiyi tanır."
       ],
       [
        "b",
        "Desenlerin kullanımını içeren bir durumu incelemek için gerekli araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Belirlediği matematiksel araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       34,
       36
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 36
 },
 "oyg2": {
  "ad": "Özel Yeteneklerin Geliştirilmesi · 2. seviye",
  "kisa": "ÖYG-2",
  "renk": "#ff8a1f",
  "grup": "Lise",
  "aciklama": "Milenyum problemleri, karesel fonksiyonlar, graf ve şifreleme, olasılık.",
  "temalar": [
   {
    "no": 1,
    "ad": "MATEMATİK FELSEFESİ",
    "aciklama": "Bu tema, öğrencilerin Milenyum problemlerini ve matematik tarihindeki büyük krizleri matematiksel olgular olarak ele alarak sorgulayabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Milenyum Problemleri",
     "Matematiksel Bunalımlar"
    ],
    "kavramlar": "Milenyum problemi, Rasyonellik, İrrasyonellik, İmajiner Sayı, Küme Teorisi",
    "ciktilar": [
     {
      "id": "oyg2.1.1",
      "kod": "MAT.ÖYG.1.1",
      "ad": "Milenyum problemlerini matematiksel bir olgu olarak sorgulayabilme",
      "alt": [
       [
        "a",
        "Milenyum problemlerini belirler."
       ],
       [
        "b",
        "Milenyum problemleri hakkında sorular sorar."
       ],
       [
        "c",
        "Problemler hakkında bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir"
       ],
       [
        "d",
        "Toplanan bilgiler üzerinden milenyum problemleri ve matematiksel araştırma süreçleri ile ilgili felsefi çıkarımlar yapar."
       ]
      ],
      "hafta": [
       1,
       1
      ]
     },
     {
      "id": "oyg2.1.2",
      "kod": "MAT.ÖYG.1.2",
      "ad": "Matematiksel bunalımlar matematiksel bir olgu olarak sorgulayabilme",
      "alt": [
       [
        "a",
        "Matematiksel bunalımlar (İrrasyonel Sayıların Keşfi, İmajiner Sayılar, Küme Teorisi vb.) belirler."
       ],
       [
        "b",
        "Matematiksel bunalımlar hakkında sorular sorar."
       ],
       [
        "c",
        "Matematiksel bunalımlar hakkında bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir"
       ],
       [
        "d",
        "Toplanan bilgiler üzerinden matematiksel bunalımlar ile ilgili felsefi çıkarımlar yapar."
       ]
      ],
      "hafta": [
       2,
       2
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "SAYILARDAN FONKSİYONLARA",
    "aciklama": "Bu tema, öğrencilerin sayı örüntüleri ile algoritma oluşturabilmek için teknolojik araçlardan yararlanabilme, sayı örüntüleri inşa etmek için oluşturduğu algoritmaları değerlendirebilme, gerçek yaşam ya da matematiksel durumlar üzerinden karesel fonksiyonları yorumlayabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Karesel Fonksiyonlar",
     "Sayı Örüntüler"
    ],
    "kavramlar": "Karesel Fonksiyon, Sayı Örüntüleri",
    "ciktilar": [
     {
      "id": "oyg2.2.1",
      "kod": "MAT.ÖYG.2.1",
      "ad": "Sayı örüntüleri ile algoritma oluşturabilmek için matematiksel araç ve teknolojilerinden yararlanabilme",
      "alt": [
       [
        "a",
        "Sayı örüntüleri ile algoritma oluşturabilmek için gerekli (Excel, Phyton vb.) araç ve teknolojileri tanır."
       ],
       [
        "b",
        "Algoritma içerisindeki matematiksel fonksiyonu bulabilmek için uygun olan matematiksel araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Sayı örüntüleri ile algoritmik bir yapı oluşturabilmek için matematiksel araç ve teknolojiyi kullanır."
       ],
       [
        "ç",
        "Sayı örüntüleri inşa etmek için oluşturduğu algoritmalara ilişkin ölçüt (doğruluk, verimlilik, okunabilirlik, yeniden kullanılabilirlik vb.) belirler."
       ],
       [
        "d",
        "Oluşturduğu algoritmaya ilişkin ölçme yapar."
       ],
       [
        "e",
        "Ölçme sonuçlarını belirlediği ölçütlerle karşılaştırır."
       ],
       [
        "f",
        "Karşılaştırmalarına ilişkin yargıda bulunur."
       ]
      ],
      "hafta": [
       3,
       5
      ]
     },
     {
      "id": "oyg2.2.2",
      "kod": "MAT.ÖYG.2.2",
      "ad": "Karesel fonksiyonlar ile modellenebilen problemlerini çözebilme",
      "alt": [
       [
        "a",
        "Problemin içerdiği sayı, işlem ve değişken bileşenlerini belirler."
       ],
       [
        "b",
        "Problemde bağımlı ve bağımsız değişken arasındaki ilişkiyi belirler."
       ],
       [
        "c",
        "Problem bağlamıyla ilişkili verilenleri uygun matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Problemi matematiksel temsiller kullanarak kendi ifadeleri ile açıklar."
       ],
       [
        "d",
        "Problemin sonucuna ilişkin tahminde bulunur ve işlemleri gerçekleştirmek için stratejiler geliştirir."
       ],
       [
        "e",
        "Belirlenen strateji veya stratejileri çözüm için uygular."
       ],
       [
        "f",
        "Çözüm yollarını kontrol eder ve çözüme ulaştırmayan stratejiyi değiştirir."
       ],
       [
        "g",
        "Problemin çözümü için kullandığı veya geliştirdiği stratejileri gözden geçirerek kısa yolları değerlendirir."
       ],
       [
        "ğ",
        "Kullandığı strateji veya stratejileri farklı problemlerin çözümlerine geneller."
       ],
       [
        "h",
        "Genellemenin geçerliliğini matematiksel örneklerle değerlendirir."
       ]
      ],
      "hafta": [
       6,
       9
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "GÜNLÜK YAŞAMDA MATEMATİK",
    "aciklama": "Bu tema, öğrencilerin gerçek yaşam problemlerini modelleme ile çözebilme ve matematiksel modelleme problemlerinin çözümünde matematiksel araç ve teknolojiden yararlanabilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Modelleme Problemleri",
     "Rutin-Rutin Olmayan Problemler"
    ],
    "kavramlar": "",
    "ciktilar": [
     {
      "id": "oyg2.3.1",
      "kod": "MAT.ÖYG.3.1",
      "ad": "Modellenebilen gerçek yaşam problemlerini çözebilme",
      "alt": [
       [
        "a",
        "Problemin içerdiği sayı, işlem ve değişken bileşenlerini belirler."
       ],
       [
        "b",
        "Problemde bağımlı ve bağımsız değişken arasındaki ilişkiyi belirler."
       ],
       [
        "c",
        "Problem bağlamıyla ilişkili verilenleri uygun matematiksel temsillere dönüştürür."
       ],
       [
        "ç",
        "Problemi matematiksel temsiller kullanarak kendi ifadeleri ile açıklar."
       ],
       [
        "d",
        "Problemin sonucuna ilişkin tahminde bulunur ve işlemleri gerçekleştirmek için stratejiler geliştirir."
       ],
       [
        "e",
        "Belirlenen strateji veya stratejileri çözüm için uygular."
       ],
       [
        "f",
        "Çözüm yollarını kontrol eder ve çözüme ulaştırmayan stratejiyi değiştirir."
       ],
       [
        "g",
        "Problemin çözümü için kullandığı veya geliştirdiği stratejileri gözden geçirerek kısa yolları değerlendirir."
       ],
       [
        "ğ",
        "Kullandığı strateji veya stratejileri farklı problemlerin çözümlerine geneller."
       ],
       [
        "h",
        "Genellemenin geçerliliğini matematiksel örneklerle değerlendirir."
       ]
      ],
      "hafta": [
       10,
       13
      ]
     },
     {
      "id": "oyg2.3.2",
      "kod": "MAT.ÖYG.3.2",
      "ad": "Matematiksel modelleme problemlerinin çözümünde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Verilen veya kendi yapılandırdığı matematiksel modelleme probleminin çözümü için gerekli olan matematiksel araç ve teknolojiyi tanır."
       ],
       [
        "b",
        "Matematiksel modelleme probleminin çözümünde gerekli olan araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Matematiksel modelleme probleminin çözümü için belirlediği matematiksel araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       14,
       15
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "MANTIK, ALGORİTMA VE BİLİŞİM",
    "aciklama": "Bu tema, öğrencilerin Graf teori algoritmalarını çözümleyebilme, verilen problemleri Graf teori algoritmaları ile yorumlayabilme ve bu algoritmaları benzer problemlere yansıtabilme becerilerini geliştirmeyi amaçlar. Ayrıca, simetrik ve asimetrik şifreleme yöntemleriyle şifrelenmiş metinleri tümevarım kullanarak çözme ve analojik düşünme yoluyla bu tür şifreleri oluşturabilme becerilerinin geliştirilmesini amaçlamaktadır.",
    "icerik": [
     "Graf Teorisi Algoritmaları",
     "Şifreleme Algoritmaları"
    ],
    "kavramlar": "Algoritma, Simetrik-Asimetrik şifreleme, Graf",
    "ciktilar": [
     {
      "id": "oyg2.4.1",
      "kod": "MAT.ÖYG.4.1",
      "ad": "Graf teorisi algoritmalarını kullanarak problem çözebilme.",
      "alt": [
       [
        "a",
        "Dolaşma algoritmalarına (DFS yöntemi, BFS yöntemi) ilişkin yapıları belirler."
       ],
       [
        "b",
        "Yapılar arasındaki ilişkileri belirler."
       ],
       [
        "c",
        "Verilen problem durumunu uygun diyagrama dönüştürür."
       ],
       [
        "ç",
        "Oluşturduğu diyagramı kendi cümleleri ile ifade eder."
       ],
       [
        "d",
        "Problemin çözümü için bir strateji oluşturur."
       ],
       [
        "e",
        "Stratejiyi işe koşarak problemi çözer."
       ],
       [
        "f",
        "Problemin çözümünü kontrol eder"
       ],
       [
        "g",
        "Problem çözme sürecindeki deneyimini gözden geçirir."
       ],
       [
        "ğ",
        "Deneyimine dayalı çıkarım yapar"
       ],
       [
        "h",
        "Ulaştığı çıkarımları benzer problemler üzerinde değerlendirir."
       ]
      ],
      "hafta": [
       16,
       17
      ]
     },
     {
      "id": "oyg2.4.2",
      "kod": "MAT.ÖYG.4.2",
      "ad": "Simetrik ve asimetrik şifreleme yöntemi ile şifrelenen metinleri çözebilmek için tümevarıma dayalı akıl yürütebilme",
      "alt": [
       [
        "a",
        "Şifreli metinlerdeki (Affine, RSA, DES) ilişkileri gözlemler."
       ],
       [
        "b",
        "Şifreli metinlerdeki örüntüleri belirler."
       ],
       [
        "c",
        "Belirlediği örüntüleri sözel ya da cebirsel olarak geneller."
       ]
      ],
      "hafta": [
       18,
       19
      ]
     },
     {
      "id": "oyg2.4.3",
      "kod": "MAT.ÖYG.4.3",
      "ad": "Simetrik ve asimetrik şifreleme yöntemi ile şifrelenen metinleri oluşturabilmek için analojik akıl yürütebilme",
      "alt": [
       [
        "a",
        "Simetrik ve asimetrik şifreleme yöntemlerini inceler."
       ],
       [
        "b",
        "İncelediği şifreleme yöntemlerinin niteliklerini tespit eder."
       ],
       [
        "c",
        "Benzerlikleri kullanarak yeni şifreleme yöntemleri oluşturur."
       ]
      ],
      "hafta": [
       20,
       21
      ]
     }
    ]
   },
   {
    "no": 5,
    "ad": "MATEMATİKSEL DOĞRULAMA VE İSPAT",
    "aciklama": "Bu tema, öğrencilerin çeşitli ispat yöntemlerini kullanarak üçgen ve çemberler ile ilgili bazı teoremleri doğrulayabilme veya ispatlayabilmeleri hedeflemektedir.",
    "icerik": [
     "İspat Yöntemleri",
     "Üçgen ve Çember Teoremleri"
    ],
    "kavramlar": "Doğrudan ispat, Dolaylı ispat, Çokgen, Çember",
    "ciktilar": [
     {
      "id": "oyg2.5.1",
      "kod": "MAT.ÖYG.5.1",
      "ad": "Çokgen ve çember ile ilgili özel teoremlerin ispatını yapabilme",
      "alt": [
       [
        "a",
        "Çokgen ve çember ile ilgili teoremleri ispatlamak veya doğrulamak için uygun yöntemi seçerek işe koşar."
       ],
       [
        "b",
        "İşe koşulan doğrulama veya ispat yöntemlerini kullanışlılık veya estetiklik açısından değerlendirir."
       ]
      ],
      "hafta": [
       22,
       26
      ]
     }
    ]
   },
   {
    "no": 6,
    "ad": "MATEMATİKSEL OLASILIK",
    "aciklama": "Bu tema, öğrencilerin farklı olasılık durumlarını sorgulayabilmeleri ve problemleri olasılık dağılımlarına göre doğru bir şekilde sınıflandırabilmeleri amaçlamaktadır.",
    "icerik": [
     "Bernoulli Dağılımı",
     "Binom Dağılımı",
     "Geometrik Dağılım",
     "Hipergeometrik Dağılım"
    ],
    "kavramlar": "Olasılık, Dağılım, Binom Dağılımı, Geometrik Dağılım, Hipergeometrik Dağılım",
    "ciktilar": [
     {
      "id": "oyg2.6.1",
      "kod": "MAT.ÖYG.6.1",
      "ad": "Farklı olasılık durumlarını sorgulayabilme",
      "alt": [
       [
        "a",
        "Bernoulli, binom, geometrik ve hipergeometrik olasılık dağılımlarını tanımlar."
       ],
       [
        "b",
        "Belirlenen olasılık dağılımları hakkında sorular sorar."
       ],
       [
        "c",
        "Olasılık dağılımları hakkında bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Toplanan bilgiler üzerinde çıkarım yapar."
       ]
      ],
      "hafta": [
       27,
       28
      ]
     },
     {
      "id": "oyg2.6.2",
      "kod": "MAT.ÖYG.6.2",
      "ad": "Problemleri, olasılık dağılımlarına göre sınıflandırabilme",
      "alt": [
       [
        "a",
        "Verilen problemlerin, hangi olasılık dağılımına ait olma durumlarına ilişkin ölçütleri belirler."
       ],
       [
        "b",
        "Problemleri belirlenen ölçütlere göre ayrıştırır."
       ],
       [
        "c",
        "Problemleri belirlenen olasılık dağılımlarına göre tasnif eder."
       ],
       [
        "ç",
        "Tasnif edilen problemleri etiketler."
       ]
      ],
      "hafta": [
       29,
       30
      ]
     }
    ]
   },
   {
    "no": 7,
    "ad": "VERİDEN İSTATİSTİĞE",
    "aciklama": "Bu tema, öğrencilerin farklı veri türleri içeren istatistiksel problem belirleyebilme ve belirlediği problem çerçevesinde veri ile çalışma ve veriye dayalı karar verme becerilerinin geliştirilmesini amaçlamaktadır.",
    "icerik": [
     "İstatiksel Veri",
     "İstatiksel Veri Toplama ve Analiz Araçları",
     "İstatistiksel Araştırma Döngüsü"
    ],
    "kavramlar": "Örneklem, Evren, Deneysel olasılık, Geleneksel ve geleneksel olmayan veri, Merkezi eğilim, Merkezi dağılım",
    "ciktilar": [
     {
      "id": "oyg2.7.1",
      "kod": "MAT.ÖYG.7.1",
      "ad": "Farklı veri türleri içeren istatistiksel problemi çözebilme",
      "alt": [
       [
        "a",
        "Geleneksel (kategorik ve nicel) ve geleneksel olmayan (resim, metin, ses vb.) istatistiksel araştırma gerektiren bir gerçek yaşam durumu belirler."
       ],
       [
        "b",
        "Belirlenen gerçek yaşam durumuna bağlı, cevaplanabilecek araştırma soruları oluşturur."
       ],
       [
        "c",
        "Seçilen araştırma sorusuna uygun verileri toplamak için plan yapar."
       ],
       [
        "ç",
        "Seçtiği uygun veri aracı ile verileri toplar ve düzenler."
       ],
       [
        "d",
        "Araştırma sorusunun veri seti ve araştırma sorusuna uygun analiz yöntemini seçer."
       ],
       [
        "e",
        "Verileri; uygun istatistiksel ölçüleri (merkezi eğilim-dağılım) ve grafikleri kullanarak analiz eder."
       ],
       [
        "f",
        "Elde edilen bulgulara yönelik örneklem ve evren için informal çıkarımlarda bulunur."
       ],
       [
        "g",
        "Değişebilirliği göz önünde bulundurarak çıkarımları değerlendirir."
       ]
      ],
      "hafta": [
       31,
       32
      ]
     },
     {
      "id": "oyg2.7.2",
      "kod": "MAT.ÖYG.7.2",
      "ad": "Verilerin analizinde matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Veri analizinde kullanılan matematiksel araç ve teknolojiyi (Phyton, Jasp, Jamovi vb.) tanır."
       ],
       [
        "b",
        "Veri analizi için kullanacağı araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Belirlediği araç ve teknolojiyi kullanır."
       ]
      ],
      "hafta": [
       33,
       34
      ]
     }
    ]
   },
   {
    "no": 8,
    "ad": "ANALİTİK GEOMETRİ",
    "aciklama": "Bu tema, öğrencilerin geometrik özellikler ve analitik düzlem arasında analojik akıl yürütebilme becerisinin geliştirilmesini amaçlamaktadır.",
    "icerik": [
     "Analitik Düzlemde İki Nokta Arası Uzaklık",
     "Doğru Denklemi",
     "Eğim"
    ],
    "kavramlar": "Analitik düzlem, Eğim, Eşlik, Benzerlik",
    "ciktilar": [
     {
      "id": "oyg2.8.1",
      "kod": "MAT.ÖYG.8.1",
      "ad": "Geometrik özellikler ve analitik düzlem arasında analojik akıl yürütebilme",
      "alt": [
       [
        "a",
        "Analitik düzlemdeki durum ve kavramları (iki nokta arası uzaklık, eğim vb.), geometrik özellikleri kullanarak gözlemler."
       ],
       [
        "b",
        "Gözlemlediği özelliklerin benzerliklerini tespit eder."
       ],
       [
        "c",
        "Tespit ettiği benzerliklere dayalı çıkarım yapar."
       ]
      ],
      "hafta": [
       35,
       36
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 36
 },
 "oyg3": {
  "ad": "Özel Yeteneklerin Geliştirilmesi · 3. seviye",
  "kisa": "ÖYG-3",
  "renk": "#ff4d61",
  "grup": "Lise",
  "aciklama": "Fonksiyonlar, trigonometri, üstel-logaritmik, diziler, Öklid dışı geometri.",
  "temalar": [
   {
    "no": 1,
    "ad": "SAYILARDAN FONKSİYONLARA",
    "aciklama": "Bu tema kapsamında, Fonksiyonlar, Trigonometrik Fonksiyonlar, Üstel ve Logaritmik Fonksiyonlar gibi konular ele alınarak öğrencilerin matematiksel temsil ve muhakeme becerilerini geliştirmeleri amaçlanmaktadır.",
    "icerik": [
     "Fonksiyonlar",
     "Trigonometrik Fonksiyonlar",
     "Üstel ve Logaritmik Fonksiyonlar"
    ],
    "kavramlar": "Fonksiyon, Değer kümesi, Tanım kümesi, Birebir, Örten, Ters fonksiyon, Trigonometri, Trigonometrik özdeşlikler, Üstel fonksiyon, Logaritmik fonksiyon",
    "ciktilar": [
     {
      "id": "oyg3.1.1",
      "kod": "MAT.ÖYG.1.1",
      "ad": "Tanım ve değer kümesi gerçek sayılar olan fonksiyonların nitel özelliklerini matematiksel temsillerle değerlendirebilme",
      "alt": [
       [
        "a",
        "Tanım ve değer kümesi gerçek sayılar olan fonksiyonların nitel özelliklerini (tanım aralığı, değer aralığı, işareti, artanlığı-azalanlığı, sıfırı, bire birliği, tekliği-çiftliği, örtenliği) grafik temsili üzerinden analiz eder."
       ],
       [
        "b",
        "Tanım ve değer kümesi gerçek sayılar olan fonksiyonlara ilişkin grafik temsillerini, fonksiyon olma şartları ve fonksiyonların nitel özellikleri bakımından karşılaştırır."
       ]
      ],
      "hafta": [
       1,
       3
      ]
     },
     {
      "id": "oyg3.1.2",
      "kod": "MAT.ÖYG.1.2",
      "ad": "Tanım ve değer kümesi gerçek sayılar olan fonksiyonların ters fonksiyonlarına dair çıkarım yapabilme",
      "alt": [
       [
        "a",
        "Tanım ve değer kümesi gerçek sayılar olan fonksiyonlar üzerinden bir fonksiyonun ters fonksiyonuna ilişkin varsayımlarda bulunur."
       ],
       [
        "b",
        "Varsayımlarından yararlanıp farklı durumlarla ilgili örüntüleri listeleyerek bu fonksiyonların ters fonksiyonlarına ilişkin genellemeler yapar."
       ],
       [
        "c",
        "Bu fonksiyonların ters fonksiyonlarıyla ilişkisine dair varsayımları ile genellemelerini karşılaştırır."
       ],
       [
        "ç",
        "Bu fonksiyonların ters fonksiyon ilişkisine ait önermeleri, matematiksel olarak doğrulanabilecek şekilde sunar."
       ],
       [
        "d",
        "Bu fonksiyonların ters fonksiyonlarına ait elde edilen önermeleri, fonksiyonların genel özellikleri bağlamında değerlendirir."
       ]
      ],
      "hafta": [
       4,
       6
      ]
     },
     {
      "id": "oyg3.1.3",
      "kod": "MAT.ÖYG.1.3",
      "ad": "Dik üçgende trigonometrik oranlara (sinüs, kosinüs, tanjant, kotanjant) ve özdeşliklere ilişkin çıkarım yapabilme",
      "alt": [
       [
        "a",
        "Dik üçgende trigonometrik oranlar ve trigonometrik özdeşliklerle ilgili varsayımlarda bulunur."
       ],
       [
        "b",
        "Trigonometrik oranlar ve trigonometrik özdeşliklerle ilgili genellemeler yapar."
       ],
       [
        "c",
        "Trigonometrik oranlar ve trigonometrik özdeşliklerle ilgili elde ettiği genellemelerini varsayımlarıyla karşılaştırır."
       ],
       [
        "ç",
        "Yaptığı karşılaştırmalardan dik üçgende trigonometrik oranlara ilişkin önermeler sunar."
       ],
       [
        "d",
        "Ulaştığı trigonometrik oranları ve trigonometrik özdeşlikleri gerçek yaşam problemleri bağlamında değerlendirir."
       ]
      ],
      "hafta": [
       7,
       9
      ]
     },
     {
      "id": "oyg3.1.4",
      "kod": "MAT.ÖYG.1.4",
      "ad": "Üstel fonksiyona ve bu fonksiyondan türetilen fonksiyonların nitel özelliklerine ilişkin muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Üstel referans fonksiyonun(f(x) = a^x , a ≠ 1, a > 0) nitel özelliklerini (tanım aralığı, değer aralığı, işareti, artanlığı-azalanlığı, bire birliği, örtenliği) matematiksel temsilleri kullanarak belirler."
       ],
       [
        "b",
        "Üstel referans fonksiyonun nitel özellikleri ile matematiksel temsilleri arasındaki ilişkileri belirler."
       ],
       [
        "c",
        "Uygun koşullarda y=f(x) kuralıyla tanımlı üstel referans fonksiyonu, grafik veya cebirsel temsili üzerinde yapılan işlemlerle k.f(ax±b) ±r üstel fonksiyonuna dönüştürür."
       ],
       [
        "ç",
        "Üstel referans fonksiyon ve bu fonksiyondan türetilen fonksiyonların grafik temsili ile cebirsel temsili arasındaki ilişkiyi ifade eder."
       ],
       [
        "d",
        "Uygun koşullarda y=f(x) kuralıyla tanımlı üstel referans fonksiyondan türetilen fonksiyonların nitel özelliklerine ilişkin varsayımlarda bulunur."
       ],
       [
        "e",
        "Varsayımlarından yararlanıp farklı durumlarla ilgili örüntüleri listeler ve türetilen fonksiyonların nitel özellikleri ile ilgili genellemeler yapar."
       ],
       [
        "f",
        "Genellemelerinin varsayımlarını karşılayıp karşılamadığını kontrol eder."
       ],
       [
        "g",
        "Genellemelerinden elde ettiği önermeleri matematiksel olarak doğrulayabileceği şekilde sunar."
       ],
       [
        "ğ",
        "Elde ettiği önermelerin gerçek yaşam bağlamlarındaki kullanışlılığını değerlendirir."
       ]
      ],
      "hafta": [
       10,
       12
      ]
     },
     {
      "id": "oyg3.1.5",
      "kod": "MAT.ÖYG.1.5",
      "ad": "Üstel fonksiyonların ters fonksiyonlarını inceleyerek logaritmik fonksiyona dair çıkarım yapabilme",
      "alt": [
       [
        "a",
        "Üstel fonksiyonların ters fonksiyonları ile ilgili varsayımlarda bulunur."
       ],
       [
        "b",
        "Varsayımlarından yararlanıp farklı durumlarla ilgili örüntüleri listeleyerek üstel fonksiyonların ters fonksiyonları ile ilgili genellemeler yapar."
       ],
       [
        "c",
        "Genellemelerinin varsayımlarını karşılayıp karşılamadığını kontrol eder."
       ],
       [
        "ç",
        "Logaritmik fonksiyonu üstel fonksiyonun ters fonksiyonu olarak ifade eden önermeler sunar."
       ],
       [
        "d",
        "Logaritmik fonksiyonu, gerçek yaşam bağlamında kullanışlılık açısından değerlendirir."
       ]
      ],
      "hafta": [
       13,
       15
      ]
     },
     {
      "id": "oyg3.1.6",
      "kod": "MAT.ÖYG.1.6",
      "ad": "Logaritmik fonksiyonun nitel özelliklerine ve işlem özelliklerine ilişkin matematiksel muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Uygun koşullarda y=f(x) kuralıyla tanımlı logaritmik referans fonksiyonunu, grafik veya cebirsel temsili üzerinde yapılan işlemlerle k.f(ax±b) ±r logaritmik fonksiyonlarına dönüştürür."
       ],
       [
        "b",
        "Logaritmik referans fonksiyonları ile bu fonksiyonlardan türetilen fonksiyonların grafik ve cebirsel temsili arasındaki ilişkiyi ifade eder."
       ],
       [
        "c",
        "Logaritmik fonksiyonun nitel özelliklerine (tanım aralığı, değer aralığı, işareti, artanlığı-azalanlığı, bire birliği) ve işlem özelliklerine ilişkin varsayımlarda bulunur."
       ],
       [
        "ç",
        "Logaritmik fonksiyonun nitel özelliklerine ve işlem özelliklerine ilişkin varsayımlarını geneller."
       ],
       [
        "d",
        "Genellemelerinin, varsayımlarını karşılayıp karşılamadığını kontrol eder."
       ],
       [
        "e",
        "Genellemelerinden elde ettiği önermeleri, matematiksel olarak doğrulayabileceği şekilde sunar."
       ],
       [
        "f",
        "Elde ettiği önermelerin gerçek yaşam bağlamlarındaki kullanışlılığını değerlendirir."
       ],
       [
        "g",
        "Önermelerini grafiksel olarak doğrular veya cebirsel olarak ispatlar."
       ],
       [
        "ğ",
        "İşe koştuğu doğrulama veya ispat yöntemlerinin farklı durumlardaki kullanışlılığını değerlendirir."
       ]
      ],
      "hafta": [
       16,
       18
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "DİZİLERDEN SERİLERE",
    "aciklama": "Bu tema, aritmetik ve geometrik dizilerin temel özelliklerini öğrenerek öğrencilerin matematiksel muhakeme ve analitik düşünme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Aritmetik Dizi",
     "Geometrik Dizi"
    ],
    "kavramlar": "Aritmetik dizi, Dizi, Genel terim, Geometrik dizi, Monoton artan, Monoton azalan, Ortak fark, Ortak oran (Çarpan), Terim, Sonlu toplam",
    "ciktilar": [
     {
      "id": "oyg3.2.1",
      "kod": "MAT.ÖYG.2.1",
      "ad": "Aritmetik ve geometrik dizilerin özelliklerine ilişkin muhakeme yapabilme",
      "alt": [
       [
        "a",
        "Sayı örüntülerinin ardışık terimlerini belirler."
       ],
       [
        "b",
        "Ardışık terimler arasındaki ortak fark/oran ilişkisini belirler."
       ],
       [
        "c",
        "Sayı örüntülerinin her bir terimini belirlediği ortak farkı/oranı kullanarak ifade eder."
       ],
       [
        "ç",
        "Ardışık terimler arasındaki ortak farkı/oranı sabit olan örüntülerin genel terimini aritmetik/geometrik dizi olarak açıklar."
       ],
       [
        "d",
        "Aritmetik/geometrik dizilerin sonlu toplamlarına ilişkin varsayımlarda bulunur."
       ],
       [
        "e",
        "Varsayımlarından yararlanıp aritmetik/geometrik dizilerin sonlu toplamları ile ilgili genellemeler yapar."
       ],
       [
        "f",
        "Aritmetik/geometrik dizilerin sonlu toplamlarına ilişkin genellemeleri ile varsayımlarını karşılaştırır."
       ],
       [
        "g",
        "Elde ettiği genellemelerden aritmetik/geometrik dizilerin sonlu toplamlarına ilişkin önermeler sunar."
       ],
       [
        "ğ",
        "Sunduğu önermelerin kullanılabilirliğini gerçek yaşam problemleri bağlamında değerlendirir."
       ],
       [
        "h",
        "Aritmetik ve geometrik dizilerin sonlu toplamlarına ilişkin elde edilen önermeleri cebirsel olarak ispatlar."
       ],
       [
        "ı",
        "Aritmetik ve geometrik dizilerin sonlu toplamlarına ilişkin işe koştuğu ispat yöntemlerini kullanışlılık açısından değerlendirir."
       ]
      ],
      "hafta": [
       19,
       22
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "UZAY VE ŞEKİL",
    "aciklama": "Bu tema, öğrencilerin Öklid geometrisinde ele alınan temel elemanların küresel geometrideki karşılıkları ile ilgili matematiksel muhakeme yapabilmesi ve bu elemanların inşası için matematiksel araç ve teknolojileri kullanabilmesini amaçlamaktadır.",
    "icerik": [
     "Öklid Dışı Geometrilerin Tanıtımı",
     "Küresel Geometrinin Temelleri",
     "Büyük Daireler ve Küresel Üçgenler, Küresel Üçgenlerin Özellikleri, Küresel Üçgenlerde Açı Toplamı"
    ],
    "kavramlar": "Nokta, Boyut, Açı, Benzerlik, Küresel geometri, Öklid dışı geometri",
    "ciktilar": [
     {
      "id": "oyg3.3.1",
      "kod": "MAT.ÖYG.3.1",
      "ad": "Küresel geometri, Hiperbolik geometri ve Öklid geometrinin özelliklerini karşılaştırabilme",
      "alt": [
       [
        "a",
        "Küresel geometri, Hiperbolik geometri ve Öklid geometrinin özelliklerine ilişkin özellikleri belirler."
       ],
       [
        "b",
        "Belirlenen özelliklere ilişkin benzerlikleri listeler."
       ],
       [
        "c",
        "Belirlenen özelliklere ilişkin farklılıkları listeler."
       ]
      ],
      "hafta": [
       23,
       25
      ]
     },
     {
      "id": "oyg3.3.2",
      "kod": "MAT.ÖYG.3.2",
      "ad": "Öklid geometrisinde ele alınan temel elemanların küresel geometrideki karşılıklarının inşa çalışmalarında matematiksel araç ve teknolojilerden yararlanabilme",
      "alt": [
       [
        "a",
        "Küresel geometri kavram ve şekillerinin inşasında kullanılabilecek matematiksel araç ve teknolojileri tanır."
       ],
       [
        "b",
        "Tanıdığı matematiksel araç ve teknolojilerden hareketle küresel geometri kavram ve şekillerinin inşası için uygun olan araç ve teknolojileri belirler."
       ],
       [
        "c",
        "Küresel geometri kavram ve şekillerinin inşası için belirlediği matematiksel araç ve teknolojileri kullanır."
       ]
      ],
      "hafta": [
       26,
       28
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "MATEMATİKSEL PROBLEMLERDEN PROJEYE",
    "aciklama": "Bu tema, öğrencilerin Olimpiyat soruları gibi zorlu matematiksel problemler üzerine yoğunlaşarak, eleştirel düşünme yeteneğini ve matematiksel kavramlar ile genellemeler üzerine derinlemesine düşünme becerisini geliştirme amacı taşımaktadır.",
    "icerik": [
     "Olimpiyat Soruları",
     "Matematik Araştırma Projeleri"
    ],
    "kavramlar": "Mantıksal çıkarım, Proje, Olimpiyat",
    "ciktilar": [
     {
      "id": "oyg3.4.1",
      "kod": "MAT.ÖYG.4.1",
      "ad": "Matematiksel kavram ve genellemeler üzerine eleştirel düşünebilme",
      "alt": [
       [
        "a",
        "Olimpiyat soruları ve matematik araştırma projeleri bağlamında matematiksel kavram ve genellemeleri sorgular."
       ],
       [
        "b",
        "Matematiksel kavram ve genellemeler ile ilgili akıl yürütür."
       ],
       [
        "c",
        "Akıl yürütmeyle ulaştığı çıkarımları, farklı olimpiyat sorularına veya matematik durumlarına yansıtır."
       ]
      ],
      "hafta": [
       29,
       36
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 36
 },
 "puy": {
  "ad": "Proje Üretimi ve Yönetimi",
  "kisa": "PÜY",
  "renk": "#a66bff",
  "grup": "Lise",
  "aciklama": "Matematiğin doğası ve alanları, matematik yapmak, etik, araştırma ve yayın.",
  "temalar": [
   {
    "no": 1,
    "ad": "MATEMATİĞİN DOĞASI",
    "aciklama": "Bu tema, öğrencilerin matematiğin kendi iç yapısını ve diğer disiplinlerle olan bağlantılarını sorgulayabilme süreçlerini yürütebilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Matematik Tanımı ve Doğası",
     "Matematiğin diğer disiplinlerle ilişkisi, benzer ve farklı yanları",
     "Matematiksel Araştırma Süreci"
    ],
    "kavramlar": "Matematiğin doğası, Matematiksel İspat, Matematiksel Doğrulama, Matematiksel Genelleme, Matematiksel Dil ve Sembolizm",
    "ciktilar": [
     {
      "id": "puy.1.1",
      "kod": "MAT.PÜY.1.1",
      "ad": "Matematiğin bir disiplin olarak doğasına yönelik bir sorgulama süreci yürütebilme",
      "alt": [
       [
        "a",
        "Bir disiplin olarak matematiği tanımlar."
       ],
       [
        "b",
        "Matematiğin doğasına dair sorular sorar."
       ],
       [
        "c",
        "Matematiğin doğasına yönelik bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Toplanan bilgiler üzerinde çıkarım yapar."
       ]
      ],
      "hafta": [
       1,
       2
      ]
     },
     {
      "id": "puy.1.2",
      "kod": "MAT.PÜY.1.2",
      "ad": "Matematiğin diğer disiplinler ile ilişkisine yönelik bir sorgulama süreci yürütebilme",
      "alt": [
       [
        "a",
        "Matematiğin diğer disiplinler ile olan ilişkisini tanımlar."
       ],
       [
        "b",
        "Matematiğin doğasının diğer disiplinler üzerindeki etkisine dair sorular sorar."
       ],
       [
        "c",
        "Matematiğin diğer disiplinler ile olan ilişkisine yönelik bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Toplanan bilgiler üzerinde çıkarım yapar."
       ]
      ],
      "hafta": [
       3,
       4
      ]
     }
    ]
   },
   {
    "no": 2,
    "ad": "MATEMATİĞİN ALANLARI",
    "aciklama": "Bu tema, öğrencilerin matematiksel çalışma alanlarını, bu alanların odak noktasındaki problemleri, yaklaşımlarını, çözümlerini ve bilimsel araştırmalarla ilgili örnekleri karşılaştırabilme yeteneklerini geliştirmeyi, ayrıca matematiğin temel ve alt alanları arasındaki ilişkileri şemalar kullanarak sınıflandırabilme becerilerini geliştirmeyi hedeflemektedir.",
    "icerik": [
     "Matematik Tarihi ve Felsefesi",
     "Cebir ve Sayılar Teorisi, Geometri ve Topoloji, Analiz, Ayrık Matematik",
     "Uygulamalı ve Hesaplamalı Matematik"
    ],
    "kavramlar": "",
    "ciktilar": [
     {
      "id": "puy.2.1",
      "kod": "MAT.PÜY.2.1",
      "ad": "Matematiğin çalışma alanlarını, odaklandıkları problem durumları, yaklaşımları, çözümleri ve matematiksel araştırma örneklerinden hareketle karşılaştırabilme",
      "alt": [
       [
        "a",
        "Matematiğin çalışma alanlarını, odaklandıkları problem durumları, yaklaşımları, çözümleri, ilişkin özellikleri bilimsel araştırma örneklerinden (makale, tez, proje vb.) hareketle belirler."
       ],
       [
        "b",
        "Matematiğin çalışma alanlarına ilişkin benzerlikleri listeler."
       ],
       [
        "c",
        "Matematiğin çalışma alanlarına ilişkin farklılıkları listeler."
       ]
      ],
      "hafta": [
       5,
       7
      ]
     },
     {
      "id": "puy.2.2",
      "kod": "MAT.PÜY.2.2",
      "ad": "Matematiğin temel alanları ve alt alanlarına ait ilişkileri şemalar aracılığıyla sınıflandırabilme",
      "alt": [
       [
        "a",
        "Matematiğin temel alanları ve alt alanlarına ait ölçüt belirler."
       ],
       [
        "b",
        "Belirlediği ölçütleri ayrıştırır."
       ],
       [
        "c",
        "Ayrıştırdığı değişkenleri kullanarak matematiği, temel alanları ve alt alanlarına tasnif eder."
       ],
       [
        "ç",
        "Tasnif edilen alan/alt alanları etiketler."
       ]
      ],
      "hafta": [
       8,
       9
      ]
     }
    ]
   },
   {
    "no": 3,
    "ad": "MATEMATİK YAPMA",
    "aciklama": "Bu tema, öğrencilerin matematiksel bilginin tarih boyunca nasıl keşfedildiğini, geliştirildiğini ve yayıldığını sorgulayabilme, matematiksel bilginin üretim süreçleri hakkında bilgi toplayabilme ve matematiğin çeşitli alanlarını kapsayan önemli bilimsel çalışmaları analiz edebilme becerilerini geliştirmeyi amaçlamaktadır.",
    "icerik": [
     "Matematik Tarihi ve Felsefesi (Matematikçilerin çalışma biçimleri: problem bulma, çözüm arama süreçleri ile ilgili tarihsel örnekler, kitap, makale örnekler, Matematikçilerin mektuplaşmaları vb.)",
     "Öğrenci düzeyine uygun bilimsel faaliyetler ‒ Tübitak Projeleri ‒ Teknofest Projeleri ‒ Bilimsel Makaleler ‒ Yüksek Lisans/Doktora Tezleri"
    ],
    "kavramlar": "Bilimsel makale, Matematiksel bilgi, Matematiksel doğrulama-ispat, Bilimsel araştırma",
    "ciktilar": [
     {
      "id": "puy.3.1",
      "kod": "MAT.PÜY.3.1",
      "ad": "Matematiksel bilginin tarihsel süreçte ortaya çıkarılma, gelişme ve yayılma süreçlerini sorgulayabilme",
      "alt": [
       [
        "a",
        "Matematiksel bilginin ortaya çıkarılma, gelişme ve yayılma süreçlerini tanımlar."
       ],
       [
        "b",
        "Matematiksel bilginin ortaya çıkarılma, gelişme ve yayılma süreçleri ile ilgili sorular sorar."
       ],
       [
        "c",
        "Matematiksel bilginin ortaya çıkarılma, gelişme ve yayılma süreçleri hakkında bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Toplanan bilgiler üzerinde çıkarım yapar."
       ]
      ],
      "hafta": [
       10,
       12
      ]
     },
     {
      "id": "puy.3.2",
      "kod": "MAT.PÜY.3.2",
      "ad": "Matematiksel bilginin nasıl üretildiği hakkında bilgi toplayabilme",
      "alt": [
       [
        "a",
        "Matematiksel bilginin nasıl üretildiği hakkında bilgiye ulaşmak için kullanacağı araçları belirler."
       ],
       [
        "b",
        "Belirlediği aracı kullanarak matematiksel bilginin nasıl üretildiği hakkındaki bilgileri bulur."
       ],
       [
        "c",
        "Matematiksel bilginin nasıl üretildiği hakkındaki ulaşılan bilgileri doğrular."
       ],
       [
        "ç",
        "Matematiksel bilginin nasıl üretildiği hakkındaki ulaşılan bilgileri kaydeder."
       ]
      ],
      "hafta": [
       13,
       15
      ]
     },
     {
      "id": "puy.3.3",
      "kod": "MAT.PÜY.3.3",
      "ad": "Matematiğin farklı alanlarını içeren seçkin bilimsel çalışmaları yorumlayabilme",
      "alt": [
       [
        "a",
        "Matematiğin farklı alanlarını içeren seçkin bilimsel çalışmaları (ürünler/projeler/makaleler) inceler."
       ],
       [
        "b",
        "Seçilen bilimsel çalışmayı bağlamdan kopmadan dönüştürür."
       ],
       [
        "c",
        "Seçilen bilimsel çalışmayı nesnel, doğru anlamı değiştirmeyecek bir şekilde yeniden ifade eder."
       ]
      ],
      "hafta": [
       16,
       18
      ]
     }
    ]
   },
   {
    "no": 4,
    "ad": "BİLİMSEL ETİK",
    "aciklama": "Bu tema ile öğrencilerin proje çalışmalarının tüm aşamalarında bilimsel etik kurallarına uymaları beklenmektedir.",
    "icerik": [
     "Bilimsel Etik",
     "Bilimsel Etik Kuralları",
     "Bilimsel Atıf Yapma (APA, MLA vb.)"
    ],
    "kavramlar": "Bilimsel Etik, Tasarım, Patent, Faydalı model",
    "ciktilar": [
     {
      "id": "puy.4.1",
      "kod": "MAT.PÜY.4.1",
      "ad": "Etik ve bilimsel etik kurallarını sorgulayabilme",
      "alt": [
       [
        "a",
        "Etik ve etik kurallarına ilişkin merak ettiği konuları tanımlar."
       ],
       [
        "b",
        "Etik ve etik kurallarına ilişkin sorular sorar."
       ],
       [
        "c",
        "Etik ve etik kavramına ilişkin bilgi toplar."
       ],
       [
        "ç",
        "Toplanan bilgilerin doğruluğunu değerlendirir."
       ],
       [
        "d",
        "Toplanan bilgiler üzerinde bilimsel etik kurallara dair çıkarım yapar."
       ]
      ],
      "hafta": [
       19,
       20
      ]
     }
    ]
   },
   {
    "no": 5,
    "ad": "MATEMATİKSEL ARAŞTIRMA YAPMA",
    "aciklama": "Bu tema, öğrencilerin bir matematiksel araştırma konusu belirleyebilme, araştırma konusunun gerektirdiği becerileri (sorgulama, muhakeme, problem çözme gibi) kullanarak problemleri çözebilme ve araştırmalarında kullanacakları matematiksel araçlar ile teknolojilerden etkin bir şekilde yararlanabilme yeteneklerini geliştirmeyi hedeflemektedir.",
    "icerik": [
     "Araştırma Problemi/Sahası/Konusu/Fikri Belirleme",
     "Konuyu/Problemi/Fikri Araştırılabilir Şekilde Sınırlama",
     "Matematiksel Araştırma Süreci",
     "Araştırmanın Sonuçlarını Yansıtma"
    ],
    "kavramlar": "Önerme, Aksiyom, Teorem, İspat, Matematiksel araç ve teknoloji",
    "ciktilar": [
     {
      "id": "puy.5.1",
      "kod": "MAT.PÜY.5.1",
      "ad": "Bir matematiksel araştırmanın konusuna karar verebilme",
      "alt": [
       [
        "a",
        "Matematiksel araştırmaya ilişkin amacı belirler."
       ],
       [
        "b",
        "Araştırma konusuna ilişkin bilgi toplar."
       ],
       [
        "c",
        "Araştırma konusuna ilişkin alternatif önermeler/seçenekler oluşturur."
       ],
       [
        "ç",
        "Alternatif önermeler/seçenekler üzerinde mantıksal denetleme yapar."
       ],
       [
        "d",
        "Ulaştığı yapıya dayalı seçim yapar."
       ],
       [
        "e",
        "Kararının sonuçları üzerinde yansıtma yapar."
       ]
      ],
      "hafta": [
       21,
       23
      ]
     },
     {
      "id": "puy.5.2",
      "kod": "MAT.PÜY.5.2",
      "ad": "Araştırma konusunun gerektirdiği becerileri (sorgulama, muhakeme, problem çözme gibi) kullanarak problemi çözebilme",
      "alt": [
       [
        "a",
        "Araştırma sonucunda ortaya çıkan problemi yapılandırır."
       ],
       [
        "b",
        "Yapılandırdığı problemi özetler."
       ],
       [
        "c",
        "Problemin çözümüne yönelik matematiksel yöntemlerle tahminlerde bulunur."
       ],
       [
        "ç",
        "Önerme ve aksiyomlar üzerinden akıl yürütür."
       ],
       [
        "d",
        "Teorem-ispat ilişkisi bağlamında değerlendirmede bulunur."
       ]
      ],
      "hafta": [
       24,
       27
      ]
     },
     {
      "id": "puy.5.3",
      "kod": "MAT.PÜY.5.3",
      "ad": "Belirlenen araştırmasında kullanabileceği matematiksel araç ve teknolojiden yararlanabilme",
      "alt": [
       [
        "a",
        "Araştırmasında kullanabileceği (Geogebra, Desmos, Matlab, Maple, Wolfram) matematiksel araç ve teknolojiyi tanır."
       ],
       [
        "b",
        "Araştırmasında kullanacağı araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Belirlenen matematiksel araç ve teknolojiyi araştırmasında kullanır."
       ]
      ],
      "hafta": [
       28,
       30
      ]
     }
    ]
   },
   {
    "no": 6,
    "ad": "ÇIKTILAR/YAYGIN ETKİLER",
    "aciklama": "Bu tema, öğrencilerin matematik araştırmalarını yayınlama, profesyonel şekilde raporlama ve yasal olarak koruma becerilerini geliştirmeyi amaçlar. Tema; içerik oluşturma, teknolojik araç kullanımı ve fikri mülkiyet haklarının yönetimi üzerine odaklanır.",
    "icerik": [
     "Proje Raporu Yazma",
     "Makale veya Akademik Yayın",
     "Poster ve Sözlü Sunum",
     "Faydalı Ürün/Model Tescili, Patent",
     "Etkili Sunum Hazırlama"
    ],
    "kavramlar": "Bilimsel Yayın, LaTex, MathType, Fikrî ve Sınai Mülkiyet",
    "ciktilar": [
     {
      "id": "puy.6.1",
      "kod": "MAT.PÜY.6.1",
      "ad": "Gerçekleştirdiği matematik araştırmasına uygun proje raporu veya bildiri veya makale gibi akademik yayın hazırlamak ve sunmak için matematiksel araç ve teknolojilerden yararlanabilme",
      "alt": [
       [
        "a",
        "Proje raporu veya akademik yayın yazımında ve sunumunda kullanacağı ( LaTeX, MathType, Dijital Sunum Araçları vb.) matematiksel araç ve teknolojiyi tanır."
       ],
       [
        "b",
        "Kullanacağı araç ve teknolojiyi belirler."
       ],
       [
        "c",
        "Belirlenen matematiksel araç ve teknolojiyi araştırmasında kullanır."
       ]
      ],
      "hafta": [
       31,
       34
      ]
     },
     {
      "id": "puy.6.2",
      "kod": "MAT.PÜY.6.2",
      "ad": "Gerçekleştirdiği matematik araştırmasına uygun fikrî ve sınai mülkiyet süreçlerini yürütebilme",
      "alt": [
       [
        "a",
        "Gerçekleştirdiği matematik araştırmasına uygun fikrî ve sınai mülkiyet süreçlerini (tasarım, faydalı ürün tescili, patent vb. geliştirme) yürütebilmek için fikrî mülkiyet haklarını tanır."
       ],
       [
        "b",
        "Araştırmasına uygun fikri ve sınai mülkiyet süreçlerini yürütebilmek için fikrî mülkiyet haklarına uygun davranır."
       ]
      ],
      "hafta": [
       35,
       36
      ]
     }
    ]
   }
  ],
  "haftaSayisi": 36
 }
};
