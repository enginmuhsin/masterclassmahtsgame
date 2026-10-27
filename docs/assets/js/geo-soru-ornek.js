/* SORU MASASI · ÖRNEK SORULAR (özgün ya da sayıları değiştirilerek uyarlanmış; ölçekli şekiller) */
"use strict";
window.MC = window.MC || {};
MC.soruOrnekleri = [
 {
  "id": "ornek-ikizkenar",
  "baslik": "İkizkenarın içinde ikizkenar",
  "birim": "°",
  "metin": "ABC ikizkenar üçgeninde |AB| = |AC| ve m(BAC) = 40°. D noktası [AC] üzerinde ve |BD| = |BC|. Buna göre m(ABD) = x kaç derecedir?",
  "ipuclari": [
   "ABC ikizkenar olduğu için taban açıları eşittir: m(B) = m(C) = ?",
   "BDC üçgeninde |BD| = |BC|. Bu üçgenin hangi iki açısı eşit?",
   "m(DBC)'yi bulunca x = m(ABC) − m(DBC)."
  ],
  "cozum": "Taban açıları (180 − 40) / 2 = 70°. BDC üçgeni ikizkenar olduğundan m(BDC) = m(BCD) = 70°, buradan m(DBC) = 40°. x = 70 − 40 = 30°.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 500,
    "y": 110
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 330,
    "y": 560
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 670,
    "y": 560
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "uzerinde": "AC",
    "t": 0.55
   },
   {
    "id": "BD",
    "tur": "parca",
    "p": "B",
    "q": "D"
   },
   {
    "id": "e1",
    "tur": "centik",
    "a": "A",
    "b": "B",
    "n": 1
   },
   {
    "id": "e2",
    "tur": "centik",
    "a": "A",
    "b": "C",
    "n": 1
   },
   {
    "id": "e3",
    "tur": "aci",
    "a": "B",
    "v": "A",
    "c": "C",
    "metin": "40°"
   },
   {
    "id": "e4",
    "tur": "centik",
    "a": "B",
    "b": "D",
    "n": 2
   },
   {
    "id": "e5",
    "tur": "centik",
    "a": "B",
    "b": "C",
    "n": 2
   },
   {
    "id": "e6",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "D",
    "metin": "x"
   }
  ],
  "cevapMetin": "30",
  "ornek": true
 },
 {
  "id": "ornek-kenarortay",
  "baslik": "Hipotenüse çizilen kenarortay",
  "birim": "birim",
  "metin": "ABC dik üçgeninde m(ABC) = 90°, |AB| = 6 ve |BC| = 8 birimdir. D, [AC]'nin orta noktasıdır. |BD| kaç birimdir?",
  "ipuclari": [
   "Önce Pisagor ile |AC|'yi bul.",
   "Dik üçgende hipotenüsün orta noktası üç köşeye eşit uzaklıktadır. Neden? (İpucu: çevrel çember)"
  ],
  "cozum": "|AC|² = 6² + 8² = 100, |AC| = 10. Hipotenüse ait kenarortay hipotenüsün yarısıdır: |BD| = 5.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 320,
    "y": 170
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 320,
    "y": 560
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 760,
    "y": 560
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "turet": "orta",
    "a": "A",
    "b": "C"
   },
   {
    "id": "BD",
    "tur": "parca",
    "p": "B",
    "q": "D"
   },
   {
    "id": "e1",
    "tur": "uz",
    "a": "A",
    "b": "B",
    "metin": "6"
   },
   {
    "id": "e2",
    "tur": "uz",
    "a": "B",
    "b": "C",
    "metin": "8"
   },
   {
    "id": "e3",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "C",
    "metin": "90"
   },
   {
    "id": "e4",
    "tur": "uz",
    "a": "B",
    "b": "D",
    "metin": "?"
   },
   {
    "id": "e5",
    "tur": "centik",
    "a": "A",
    "b": "D",
    "n": 1
   },
   {
    "id": "e6",
    "tur": "centik",
    "a": "D",
    "b": "C",
    "n": 1
   }
  ],
  "cevapMetin": "5",
  "ornek": true
 },
 {
  "id": "ornek-cember",
  "baslik": "Merkez açı ve çevre açı",
  "birim": "°",
  "metin": "O merkezli çemberde m(AOB) = 110°. C noktası büyük yay üzerindedir. m(ACB) = x kaç derecedir?",
  "ipuclari": [
   "Merkez açı ve çevre açı aynı yayı görüyor mu?",
   "Aynı yayı gören çevre açı, merkez açının yarısıdır."
  ],
  "cozum": "AB yayını gören merkez açı 110°, çevre açı bunun yarısıdır: x = 55°.",
  "nesne": [
   {
    "id": "O",
    "tur": "nokta",
    "ad": "O",
    "x": 500,
    "y": 360
   },
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 330,
    "y": 470
   },
   {
    "id": "c",
    "tur": "cember",
    "m": "O",
    "p": "A"
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "uzerinde": "c",
    "t": 0.5
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "uzerinde": "c",
    "t": -1.75
   },
   {
    "id": "OA",
    "tur": "parca",
    "p": "O",
    "q": "A"
   },
   {
    "id": "OB",
    "tur": "parca",
    "p": "O",
    "q": "B"
   },
   {
    "id": "CA",
    "tur": "parca",
    "p": "C",
    "q": "A"
   },
   {
    "id": "CB",
    "tur": "parca",
    "p": "C",
    "q": "B"
   },
   {
    "id": "e1",
    "tur": "aci",
    "a": "A",
    "v": "O",
    "c": "B",
    "metin": "110°"
   },
   {
    "id": "e2",
    "tur": "aci",
    "a": "A",
    "v": "C",
    "c": "B",
    "metin": "x"
   }
  ],
  "cevapMetin": "55",
  "ornek": true
 },
 {
  "id": "ornek-cebir",
  "baslik": "Açılarda denklem",
  "birim": "°",
  "metin": "ABC üçgeninde m(A) = 2x, m(B) = x + 10° ve m(C) = 50°. x kaç derecedir?",
  "ipuclari": [
   "Üçgenin iç açıları toplamı kaç derecedir?",
   "2x + (x + 10) + 50 = 180 denklemini çöz."
  ],
  "cozum": "2x + x + 10 + 50 = 180 ⇒ 3x = 120 ⇒ x = 40°.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 260,
    "y": 540
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 760,
    "y": 540
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 420,
    "y": 180
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "CA",
    "tur": "parca",
    "p": "C",
    "q": "A"
   },
   {
    "id": "e1",
    "tur": "aci",
    "a": "B",
    "v": "A",
    "c": "C",
    "metin": "2x"
   },
   {
    "id": "e2",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "C",
    "metin": "x+10"
   },
   {
    "id": "e3",
    "tur": "aci",
    "a": "A",
    "v": "C",
    "c": "B",
    "metin": "50"
   }
  ],
  "cevapMetin": "40",
  "ornek": true
 },
 {
  "id": "ornek-konkav",
  "baslik": "Konkav dörtgende alan",
  "birim": "birim²",
  "cevapMetin": "24",
  "istenen": "A(BCD)",
  "metin": "ABCD konkav dörtgeninde AB ⊥ BC, |AB| = |BC| = |CD|, |BD| = 4√2 ve |AD| = 4 birimdir. BCD üçgeninin alanı kaç birimkaredir? (Sosyal medyada paylaşılan bir sorudan uyarlanmıştır; sayılar değiştirilmiştir.)",
  "ipuclari": [
   "B'yi başlangıç noktası, BC'yi ve BA'yı eksen al; |AB| = |BC| = |CD| = a de.",
   "D(x, y) için üç uzaklık denklemi yaz: |BD|, |AD|, |CD|.",
   "Alan(BCD) = a·y / 2. y'yi a cinsinden bulup denklemlerde yerine koy."
  ],
  "cozum": "B(0,0), A(0,a), C(−a,0), D(x,y). |CD| = a'dan x = −16/a; |AD| = 4'ten y = (a² + 16)/(2a). x² + y² = 32 denklemi a² = 80 verir (D'nin içeride kaldığı çözüm). Alan = a·y/2 = (a² + 16)/4 = 24.",
  "nesne": [
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 644.494,
    "y": 566.078
   },
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 643.597,
    "y": 118.959
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 197.375,
    "y": 566.976
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "x": 554.532,
    "y": 297.986
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "CD",
    "tur": "parca",
    "p": "C",
    "q": "D"
   },
   {
    "id": "DA",
    "tur": "parca",
    "p": "D",
    "q": "A"
   },
   {
    "id": "DB",
    "tur": "parca",
    "p": "D",
    "q": "B"
   },
   {
    "id": "aABC",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "C",
    "metin": "90"
   },
   {
    "id": "uBD",
    "tur": "uz",
    "a": "B",
    "b": "D",
    "metin": "4√2"
   },
   {
    "id": "uAD",
    "tur": "uz",
    "a": "A",
    "b": "D",
    "metin": "4"
   },
   {
    "id": "cAB",
    "tur": "centik",
    "a": "A",
    "b": "B",
    "n": 1
   },
   {
    "id": "cBC",
    "tur": "centik",
    "a": "B",
    "b": "C",
    "n": 1
   },
   {
    "id": "cCD",
    "tur": "centik",
    "a": "C",
    "b": "D",
    "n": 1
   }
  ],
  "olcek": 49.989568951873736,
  "uyduruldu": true,
  "ornek": true
 },
 {
  "id": "ornek-kenarortay-aci",
  "baslik": "Kenarortayın böldüğü açı",
  "birim": "°",
  "cevapMetin": "30",
  "metin": "ABC üçgeninde D, [AC]'nin orta noktasıdır. m(ABD) = 60° ve m(DBC) = 30° ise m(ACB) = α kaç derecedir? (Sosyal medyada paylaşılan bir sorudan uyarlanmıştır; sayılar değiştirilmiştir.)",
  "ipuclari": [
   "ABD ve CBD üçgenlerinde sinüs teoremini yaz; |AD| = |DC| olduğunu kullan.",
   "sin C / sin A = sin 30° / sin 60° ve A + C = 90° bulunur."
  ],
  "cozum": "Sinüs teoreminden sin C / sin A = sin 30° / sin 60° = 1/√3. A + C = 90° olduğundan sin A = cos C, yani tan C = 1/√3 ve α = 30°.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 267.501,
    "y": 132.464
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 208.398,
    "y": 522.582
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 884.103,
    "y": 624.951
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "uzerinde": "AC",
    "t": 0.4999999999764707
   },
   {
    "id": "BD",
    "tur": "parca",
    "p": "B",
    "q": "D"
   },
   {
    "id": "cAD",
    "tur": "centik",
    "a": "A",
    "b": "D",
    "n": 2
   },
   {
    "id": "cDC",
    "tur": "centik",
    "a": "D",
    "b": "C",
    "n": 2
   },
   {
    "id": "aABD",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "D",
    "metin": "60"
   },
   {
    "id": "aDBC",
    "tur": "aci",
    "a": "D",
    "v": "B",
    "c": "C",
    "metin": "30"
   },
   {
    "id": "aBCA",
    "tur": "aci",
    "a": "B",
    "v": "C",
    "c": "A",
    "metin": "α"
   }
  ],
  "olcek": 40,
  "uyduruldu": true,
  "ornek": true
 },
 {
  "id": "ornek-olimpiyat-x",
  "baslik": "Eşit parçalar ve x açısı",
  "birim": "°",
  "cevapMetin": "70",
  "metin": "ABC üçgeninde P ∈ [AC], Q ∈ [BP] ve |AP| = |PQ|. m(BAC) = 40°, m(ABP) = 20°, m(PBC) = 40° ise m(PQC) = x kaç derecedir? (Sosyal medyada paylaşılan bir sorudan uyarlanmıştır; sayılar değiştirilmiştir.)",
  "ipuclari": [
   "ABP üçgeninin açılarını bul: m(APB) kaç derece?",
   "APQ ikizkenar üçgen. m(AQP) ve m(PAQ)?",
   "QC'yi çizip QPC üçgenine bak; uygun bir eş üçgen ara."
  ],
  "cozum": "|AP| = |PQ| = 1 olsun. ABP üçgeninde m(APB) = 120°, sinüs teoreminden |BP| = 2cos20°. BPC üçgeninde m(BPC) = 60°, m(BCP) = 80° olduğundan |PC| = |BP|·sin40°/sin80° = cos20°/cos40°. QPC üçgeninde m(QPC) = 60°; sinüs teoremi sin x / sin(120° − x) = cos20°/cos40° verir. x = 70° bunu sağlar: sin70°/sin50° = cos20°/cos40°.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 542.193,
    "y": 64.8
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 299.126,
    "y": 635.2
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 700.874,
    "y": 586.445
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "P",
    "tur": "nokta",
    "ad": "P",
    "uzerinde": "AC",
    "t": 0.44909878510421686
   },
   {
    "id": "BP",
    "tur": "parca",
    "p": "B",
    "q": "P"
   },
   {
    "id": "Q",
    "tur": "nokta",
    "ad": "Q",
    "uzerinde": "BP",
    "t": 0.4679111137684329
   },
   {
    "id": "QC",
    "tur": "parca",
    "p": "Q",
    "q": "C"
   },
   {
    "id": "aBAC",
    "tur": "aci",
    "a": "B",
    "v": "A",
    "c": "C",
    "metin": "40"
   },
   {
    "id": "aABP",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "P",
    "metin": "20"
   },
   {
    "id": "aPBC",
    "tur": "aci",
    "a": "P",
    "v": "B",
    "c": "C",
    "metin": "40"
   },
   {
    "id": "cAP",
    "tur": "centik",
    "a": "A",
    "b": "P",
    "n": 2
   },
   {
    "id": "cPQ",
    "tur": "centik",
    "a": "P",
    "b": "Q",
    "n": 2
   },
   {
    "id": "aPQC",
    "tur": "aci",
    "a": "P",
    "v": "Q",
    "c": "C",
    "metin": "x"
   }
  ],
  "olcek": 36.38795890776707,
  "uyduruldu": true,
  "ornek": true
 },
 {
  "id": "ornek-orta-noktalar",
  "baslik": "Dik üçgende iki orta nokta",
  "birim": "birim",
  "cevapMetin": "10",
  "metin": "ABC dik üçgeninde AB ⊥ AC. D ∈ [AB], E ∈ [AC]; K, [DE]'nin ve L, [BC]'nin orta noktasıdır. |BD| = 12 ve |EC| = 16 birim ise |KL| = x kaç birimdir? (Sosyal medyada paylaşılan bir sorudan uyarlanmıştır; sayılar değiştirilmiştir.)",
  "ipuclari": [
   "BE'nin orta noktası M olsun. KM ve ML hangi kenarlara paraleldir?",
   "KM = |BD|/2, ML = |EC|/2 ve KM ⊥ ML."
  ],
  "cozum": "[BE]'nin orta noktası M olsun. Orta taban teoreminden KM ∥ AB ve |KM| = 6; ML ∥ AC ve |ML| = 8. AB ⊥ AC olduğundan KM ⊥ ML, x = √(6² + 8²) = 10.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 528.787,
    "y": 138.89
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 76.8,
    "y": 561.11
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 923.2,
    "y": 561.11
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "uzerinde": "AB",
    "t": 0.5631874631656396
   },
   {
    "id": "E",
    "tur": "nokta",
    "ad": "E",
    "uzerinde": "AC",
    "t": 0.3765221246696298
   },
   {
    "id": "DE",
    "tur": "parca",
    "p": "D",
    "q": "E"
   },
   {
    "id": "K",
    "tur": "nokta",
    "ad": "K",
    "turet": "orta",
    "a": "D",
    "b": "E"
   },
   {
    "id": "L",
    "tur": "nokta",
    "ad": "L",
    "turet": "orta",
    "a": "B",
    "b": "C"
   },
   {
    "id": "KL",
    "tur": "parca",
    "p": "K",
    "q": "L"
   },
   {
    "id": "aBAC",
    "tur": "aci",
    "a": "B",
    "v": "A",
    "c": "C",
    "metin": "90"
   },
   {
    "id": "uBD",
    "tur": "uz",
    "a": "B",
    "b": "D",
    "metin": "12"
   },
   {
    "id": "uEC",
    "tur": "uz",
    "a": "E",
    "b": "C",
    "metin": "16"
   },
   {
    "id": "uKL",
    "tur": "uz",
    "a": "K",
    "b": "L",
    "metin": "x"
   },
   {
    "id": "cDK",
    "tur": "centik",
    "a": "D",
    "b": "K",
    "n": 1
   },
   {
    "id": "cKE",
    "tur": "centik",
    "a": "K",
    "b": "E",
    "n": 1
   },
   {
    "id": "cBL",
    "tur": "centik",
    "a": "B",
    "b": "L",
    "n": 2
   },
   {
    "id": "cLC",
    "tur": "centik",
    "a": "L",
    "b": "C",
    "n": 2
   }
  ],
  "olcek": 22.514617843150383,
  "uyduruldu": true,
  "ornek": true
 },
 {
  "id": "ornek-fark",
  "baslik": "Dik üçgende uzunluk farkı",
  "birim": "birim",
  "cevapMetin": "10",
  "istenen": "|AC|-|DC|",
  "metin": "ABC dik üçgeninde [AB] ⊥ [BC], D ∈ [BC], m(DAC) = 60°, m(ACB) = 20° ve |BD| = 5 birimdir. |AC| − |DC| kaç birimdir? (Sosyal medyada paylaşılan bir sorudan uyarlanmıştır; sayılar değiştirilmiştir.)",
  "ipuclari": [
   "m(ADB) dış açıdır: kaç derece?",
   "|AB| = |BD|·tan 80°. |AC| ve |BC|'yi |AB| cinsinden yaz.",
   "1/sin 20° − 1/tan 20° = tan 10° ve tan 80°·tan 10° = 1."
  ],
  "cozum": "m(ADB) = 80°, |AB| = 5·tan 80°. |AC| − |DC| = |AB|·(1/sin 20° − 1/tan 20°) + 5 = |AB|·tan 10° + 5 = 5 + 5 = 10.",
  "nesne": [
   {
    "id": "A",
    "tur": "nokta",
    "ad": "A",
    "x": 300,
    "y": 150
   },
   {
    "id": "B",
    "tur": "nokta",
    "ad": "B",
    "x": 300,
    "y": 600
   },
   {
    "id": "C",
    "tur": "nokta",
    "ad": "C",
    "x": 900,
    "y": 600
   },
   {
    "id": "AB",
    "tur": "parca",
    "p": "A",
    "q": "B"
   },
   {
    "id": "BC",
    "tur": "parca",
    "p": "B",
    "q": "C"
   },
   {
    "id": "AC",
    "tur": "parca",
    "p": "A",
    "q": "C"
   },
   {
    "id": "D",
    "tur": "nokta",
    "ad": "D",
    "uzerinde": "BC",
    "t": 0.25
   },
   {
    "id": "AD",
    "tur": "parca",
    "p": "A",
    "q": "D"
   },
   {
    "id": "aABC",
    "tur": "aci",
    "a": "A",
    "v": "B",
    "c": "C",
    "metin": "90"
   },
   {
    "id": "aDAC",
    "tur": "aci",
    "a": "D",
    "v": "A",
    "c": "C",
    "metin": "60"
   },
   {
    "id": "aACB",
    "tur": "aci",
    "a": "A",
    "v": "C",
    "c": "B",
    "metin": "20"
   },
   {
    "id": "uBD",
    "tur": "uz",
    "a": "B",
    "b": "D",
    "metin": "5"
   }
  ],
  "olceksizGoster": true,
  "ornek": true
 }
];
