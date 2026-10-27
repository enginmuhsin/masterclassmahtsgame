/* SORU MASASI · ÖRNEK SORULAR (özgün; şekiller açılışta verilere uydurulur) */
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
 "id": "ornek-ayin-sorusu",
 "baslik": "Ayın olimpiyat sorusu",
 "birim": "°",
 "ornek": true,
 "cevapMetin": "30",
 "metin": "ABC bir üçgen; B, P, C noktaları doğrusal. |AP| = |PC| ve |AC| = |BP|, m(ACB) = 20° olmak üzere m(ABC) = x kaç derecedir? (Hazırlayan: Muhsin ENGİN)",
 "ipuclari": [
  "APC üçgeni ikizkenar: m(PAC) kaç derece?",
  "m(APB) dış açıdır. Kaç derece?",
  "APB üçgeninde |BP| = |AC| bilgisini kullan: sinüs teoremi ya da uygun bir yardımcı üçgen."
 ],
 "cozum": "m(PAC) = 20°, m(APB) = 40°. |AP| = a ise |AC| = |BP| = 2a·cos20°. APB üçgeninde sinüs teoremi: sin(140° − x) / sin x = 2cos20°. x = 30° bu eşitliği sağlar: sin110° / sin30° = 2cos20°.",
 "nesne": [
  {
   "id": "A",
   "tur": "nokta",
   "ad": "A",
   "x": 560,
   "y": 250
  },
  {
   "id": "B",
   "tur": "nokta",
   "ad": "B",
   "x": 150,
   "y": 560
  },
  {
   "id": "C",
   "tur": "nokta",
   "ad": "C",
   "x": 900,
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
   "id": "P",
   "tur": "nokta",
   "ad": "P",
   "uzerinde": "BC",
   "t": 0.57
  },
  {
   "id": "AP",
   "tur": "parca",
   "p": "A",
   "q": "P"
  },
  {
   "id": "cAP",
   "tur": "centik",
   "a": "A",
   "b": "P",
   "n": 1
  },
  {
   "id": "cPC",
   "tur": "centik",
   "a": "P",
   "b": "C",
   "n": 1
  },
  {
   "id": "cAC",
   "tur": "centik",
   "a": "A",
   "b": "C",
   "n": 2
  },
  {
   "id": "cBP",
   "tur": "centik",
   "a": "B",
   "b": "P",
   "n": 2
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
   "id": "aABC",
   "tur": "aci",
   "a": "A",
   "v": "B",
   "c": "C",
   "metin": "x"
  }
 ]
}
];
