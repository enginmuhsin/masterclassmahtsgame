# -*- coding: utf-8 -*-
"""
=====================================================================
 MASTER CLASS: SAYILAR VE DNA'LARI
 Oyunlaştırma Temelli İnteraktif Bir Hibrit Eğitim Materyali
 TÜBİTAK 2204-A  |  Matematik  |  Algoritma Tasarımı ve Uygulamaları
=====================================================================

Çalıştırma (internet yalnızca kurulumda gerekir, sonrası çevrimdışıdır):
    pip install streamlit
    streamlit run app.py

Modüller
    1) Oyun Modu        : Dengeli RNG + asimetrik puanlama + yüzen hedef kutusu
    2) Sayı Dedektörü   : Sayının "röntgeni" (çarpan ağacı, bölenler, ispat izi)
    3) Formula Sprint   : Çarpım tablosu, kareler, küpler, özdeşlik, trigonometri
    4) Bilgi Köşesi     : Tanımlar, teoremler ve ispatlar (LaTeX)

Tüm sayı testleri en kötü durumda O(√n) zamanda çalışır.
"""
from __future__ import annotations

import math
import random
import time
from functools import lru_cache

import streamlit as st

# =====================================================================
# 0) SAYFA AYARLARI
# =====================================================================
st.set_page_config(
    page_title="Master Class: Sayılar ve DNA'ları",
    page_icon="🔢",
    layout="wide",
    initial_sidebar_state="expanded",
)

MAVI = "#0d2b5b"
KIRMIZI = "#dc3545"
YESIL = "#198754"

# =====================================================================
# 1) AKILLI TAHTA İÇİN CSS (büyük dokunma alanları, yüksek kontrast)
# =====================================================================
st.markdown(
    f"""
<style>
:root {{ --mavi: {MAVI}; --kirmizi: {KIRMIZI}; --yesil: {YESIL}; }}
.stApp {{ background: #f3f6fb; }}
.stApp, .stApp p, .stApp li, .stApp label, .stApp span, .stApp td, .stApp th {{ color: #14213d; }}
h1, h2, h3, h4 {{ color: var(--mavi) !important; font-weight: 800 !important; }}
.block-container {{ padding-top: 2.2rem; max-width: 1400px; }}

/* --- Kenar çubuğu --- */
section[data-testid="stSidebar"] {{ background: var(--mavi); }}
section[data-testid="stSidebar"] * {{ color: #ffffff !important; }}
section[data-testid="stSidebar"] [role="radiogroup"] label {{
    font-size: 1.25rem; padding: .55rem .4rem; border-radius: 10px;
}}
section[data-testid="stSidebar"] [role="radiogroup"] label:hover {{ background: rgba(255,255,255,.12); }}

/* --- Butonlar: parmakla dokunmaya uygun --- */
div.stButton > button {{
    min-height: 3.6rem; width: 100%; font-size: 1.3rem; font-weight: 700;
    border-radius: 14px; border: 3px solid var(--mavi); background: #ffffff; color: var(--mavi);
    transition: transform .05s ease-in-out;
}}
div.stButton > button p {{ font-size: 1.3rem; font-weight: 700; color: inherit !important; }}
div.stButton > button:hover {{ background: var(--mavi); color: #ffffff; }}
div.stButton > button:active {{ transform: scale(.97); }}
.st-key-btn_evet button {{ background: var(--yesil); border-color: #0f5132; color: #fff; min-height: 7rem; }}
.st-key-btn_hayir button {{ background: var(--kirmizi); border-color: #842029; color: #fff; min-height: 7rem; }}
.st-key-btn_evet button p, .st-key-btn_hayir button p {{ font-size: 2.4rem !important; color: #fff !important; }}
.st-key-btn_evet button:hover {{ background: #146c43; }}
.st-key-btn_hayir button:hover {{ background: #b02a37; }}
.st-key-btn_basla button, .st-key-btn_sprint_basla button {{
    background: var(--mavi); color: #fff; min-height: 5rem;
}}
.st-key-btn_basla button p, .st-key-btn_sprint_basla button p {{ font-size: 1.8rem !important; color:#fff !important; }}

/* --- Yüzen hedef kutusu (Sticky Widget) --- */
.yuzen-kutu {{
    position: fixed; top: 4.2rem; right: 1.4rem; z-index: 9999; min-width: 230px;
    background: var(--mavi); color: #fff; border: 4px solid var(--kirmizi); border-radius: 18px;
    padding: .8rem 1.1rem; box-shadow: 0 8px 24px rgba(13,43,91,.35); text-align: center;
}}
.yuzen-kutu * {{ color: #fff !important; }}
.yk-baslik {{ font-size: .95rem; letter-spacing: .12em; opacity: .85; }}
.yk-hedef {{ font-size: 1.7rem; font-weight: 800; line-height: 1.2; margin: .2rem 0 .4rem; }}
.yk-satir {{ font-size: 1.35rem; font-weight: 700; }}
.yk-acil {{ animation: nabiz 1s infinite; }}
@keyframes nabiz {{ 50% {{ border-color: #ffc107; }} }}

/* --- Kartlar --- */
.sayi-kart {{
    background: #ffffff; border: 5px solid var(--mavi); border-radius: 24px; text-align: center;
    padding: 1.2rem 1rem; margin: .6rem 0 1.2rem;
}}
.sayi-kart .soru {{ font-size: 1.7rem; font-weight: 700; color: var(--mavi); }}
.sayi-kart .sayi {{ font-size: 7rem; font-weight: 900; color: var(--kirmizi); line-height: 1.1; }}
.sayi-kart .odul {{ font-size: 1.05rem; color: #4a5568; }}
.geri-bildirim {{ border-radius: 16px; padding: .9rem 1.2rem; font-size: 1.25rem; margin-top: .8rem; }}
.gb-dogru {{ background: #d1e7dd; border-left: 10px solid var(--yesil); }}
.gb-yanlis {{ background: #f8d7da; border-left: 10px solid var(--kirmizi); }}
.durum {{ border-radius: 20px; padding: 1.2rem 1.5rem; font-size: 2rem; font-weight: 900; text-align: center; color: #fff; margin-bottom: 1rem; }}
.durum * {{ color: #fff !important; }}
.durum small {{ display: block; font-size: 1.1rem; font-weight: 600; opacity: .9; }}
.durum-asal {{ background: var(--yesil); }}
.durum-yari {{ background: var(--kirmizi); }}
.durum-bilesik {{ background: var(--mavi); }}
.durum-birim {{ background: #6c757d; }}
.rozet {{ display:inline-block; padding:.35rem .8rem; margin:.2rem; border-radius:999px; background:var(--mavi); color:#fff !important; font-weight:700; font-size:1.05rem; }}
.rozet-kirmizi {{ background: var(--kirmizi); }}
.ozellik-tablo {{ width:100%; border-collapse: collapse; font-size: 1.1rem; background:#fff; }}
.ozellik-tablo th {{ background: var(--mavi); color:#fff !important; padding:.6rem; text-align:left; }}
.ozellik-tablo td {{ border-bottom: 1px solid #d6dbe6; padding:.55rem .6rem; vertical-align: top; }}
.ozellik-tablo tr.evet td {{ background: #eef7f1; }}
.izgara {{ display:grid; gap:5px; padding:.6rem; background:#fff; border-radius:12px; width:max-content; max-width:100%; overflow-x:auto; }}
.nokta {{ width:16px; height:16px; border-radius:50%; display:inline-block; }}
.iz-kutu {{ background:#fff; border-radius:12px; padding:.8rem 1rem; font-family: ui-monospace, Menlo, Consolas, monospace; font-size:1.05rem; line-height:1.9; }}
.iz-bolen {{ background: var(--kirmizi); color:#fff !important; padding:.1rem .45rem; border-radius:6px; font-weight:800; }}
.iz-deneme {{ background:#e2e8f0; padding:.1rem .45rem; border-radius:6px; }}
.bilgi-kutu {{ background:#fff; border-left: 8px solid var(--mavi); border-radius: 12px; padding: .9rem 1.2rem; margin:.6rem 0; }}
.benzetme {{ background:#fff4e5; border-left: 8px solid #fd7e14; border-radius: 12px; padding: .8rem 1.1rem; margin:.6rem 0; }}
div[data-testid="stMetricValue"] {{ font-size: 2.4rem; color: var(--mavi); font-weight: 800; }}
</style>
""",
    unsafe_allow_html=True,
)

# =====================================================================
# 2) MATEMATİK ÇEKİRDEĞİ  (tüm testler en kötü durumda O(√n))
# =====================================================================
UST = str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹")


def us(e: int) -> str:
    """Üs yazımı: 3 -> ³"""
    return str(e).translate(UST)


def tr_sayi(n: int) -> str:
    """Türkçe binlik ayıracı: 1234567 -> 1.234.567"""
    return f"{n:,}".replace(",", ".")


def is_tam_kare(n: int) -> bool:
    """O(log n): tamsayı karekökü ile kesin kontrol."""
    if n < 0:
        return False
    r = math.isqrt(n)
    return r * r == n


def kup_kok(n: int) -> int:
    """n >= 0 için ⌊∛n⌋ ; kayan nokta hatası tamsayı düzeltmesiyle giderilir."""
    if n <= 0:
        return 0
    r = int(round(n ** (1.0 / 3.0)))
    while r ** 3 > n:
        r -= 1
    while (r + 1) ** 3 <= n:
        r += 1
    return r


def is_asal(n: int) -> bool:
    """
    6k±1 deneme bölmesi.  Gerekçe: n bileşikse n = a·b, a <= b olduğundan a <= √n'dir.
    Bu nedenle √n'ye kadar bölen yoksa n asaldır.  Karmaşıklık O(√n).
    """
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    sinir = math.isqrt(n)
    i = 5
    while i <= sinir:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def asallik_izi(n: int, gosterim_siniri: int = 80):
    """
    Asallık testinin adım adım izi (Sayı Dedektörü'nde ispat olarak gösterilir).
    Döner: (denenen_bolenler[:gosterim_siniri], bulunan_bolen | None, toplam_deneme_sayisi)
    """
    if n < 4:
        return [], None, 0
    denenen, sayac = [], 0
    for d in (2, 3):
        sayac += 1
        if len(denenen) < gosterim_siniri:
            denenen.append(d)
        if n % d == 0:
            return denenen, d, sayac
    sinir = math.isqrt(n)
    i = 5
    while i <= sinir:
        for d in (i, i + 2):
            if d > sinir:
                break
            sayac += 1
            if len(denenen) < gosterim_siniri:
                denenen.append(d)
            if n % d == 0:
                return denenen, d, sayac
        i += 6
    return denenen, None, sayac


@lru_cache(maxsize=8192)
def get_asal_carpanlar(n: int) -> tuple:
    """Asal çarpanlar (tekrarlı), örn. 360 -> (2, 2, 2, 3, 3, 5).  O(√n)."""
    carpanlar = []
    if n < 2:
        return tuple(carpanlar)
    for p in (2, 3):
        while n % p == 0:
            carpanlar.append(p)
            n //= p
    i = 5
    while i * i <= n:
        while n % i == 0:
            carpanlar.append(i)
            n //= i
        while n % (i + 2) == 0:
            carpanlar.append(i + 2)
            n //= i + 2
        i += 6
    if n > 1:
        carpanlar.append(n)
    return tuple(carpanlar)


def carpan_ussu(n: int) -> dict:
    """360 -> {2: 3, 3: 2, 5: 1}"""
    sozluk: dict = {}
    for p in get_asal_carpanlar(n):
        sozluk[p] = sozluk.get(p, 0) + 1
    return sozluk


def carpim_yazisi(n: int) -> str:
    """360 -> 2³ × 3² × 5"""
    return " × ".join(f"{p}{us(e) if e > 1 else ''}" for p, e in carpan_ussu(n).items())


def carpim_latex(n: int) -> str:
    return r" \cdot ".join(f"{p}^{{{e}}}" if e > 1 else f"{p}" for p, e in carpan_ussu(n).items())


@lru_cache(maxsize=8192)
def get_bolenler(n: int) -> tuple:
    """
    Tüm pozitif bölenler, sıralı.  d | n ise (n/d) | n olduğundan yalnızca
    1..√n taranır, eş bölen aynada (n/d) olarak eklenir.  O(√n).
    """
    if n < 1:
        return tuple()
    kucuk, buyuk = [], []
    for d in range(1, math.isqrt(n) + 1):
        if n % d == 0:
            kucuk.append(d)
            if d != n // d:
                buyuk.append(n // d)
    return tuple(kucuk + buyuk[::-1])


def bolen_toplami(n: int) -> int:
    return sum(get_bolenler(n))


def rakam_toplami(n: int) -> int:
    return sum(int(c) for c in str(abs(n)))


# ---- Sayı türü testleri ----
def is_cift(n: int) -> bool:
    return n % 2 == 0


def is_tek(n: int) -> bool:
    return n % 2 == 1


def is_yari_asal(n: int) -> bool:
    """Tam olarak iki asalın (eşit olabilir) çarpımı: 91 = 7·13, 49 = 7·7."""
    return len(get_asal_carpanlar(n)) == 2


def is_tam_kup(n: int) -> bool:
    return n >= 0 and kup_kok(n) ** 3 == n


def is_mukemmel(n: int) -> bool:
    """Kendisi hariç bölenlerinin toplamı kendisine eşit: σ(n) = 2n."""
    return n > 1 and bolen_toplami(n) == 2 * n


def is_fibonacci(n: int) -> bool:
    """Gessel testi: n Fibonacci ⇔ 5n²+4 veya 5n²−4 tam kare.  O(log n)."""
    return n >= 0 and (is_tam_kare(5 * n * n + 4) or is_tam_kare(5 * n * n - 4))


def is_palindromik(n: int) -> bool:
    s = str(n)
    return n >= 0 and s == s[::-1]


def is_harshad(n: int) -> bool:
    return n > 0 and n % rakam_toplami(n) == 0


def is_ucgensel(n: int) -> bool:
    """n = k(k+1)/2 ⇔ 8n+1 = (2k+1)² tam kare."""
    return n >= 1 and is_tam_kare(8 * n + 1)


def is_ikinin_kuvveti(n: int) -> bool:
    """Bit hilesi: 2^k ikili tabanda tek bir 1 içerir, n & (n−1) = 0.  O(1)."""
    return n >= 1 and (n & (n - 1)) == 0


def is_armstrong(n: int) -> bool:
    s = str(n)
    k = len(s)
    return n >= 1 and sum(int(c) ** k for c in s) == n


def ramanujan_temsilleri(n: int) -> list:
    """n = a³ + b³ (1 <= a <= b) biçimindeki tüm yazılışlar.  O(∛n) ⊂ O(√n)."""
    temsiller = []
    a = 1
    while 2 * a ** 3 <= n:
        kalan = n - a ** 3
        b = kup_kok(kalan)
        if b ** 3 == kalan and b >= a:
            temsiller.append((a, b))
        a += 1
    return temsiller


def is_ramanujan(n: int) -> bool:
    """Hardy–Ramanujan (taksi) sayısı: iki pozitif küpün toplamı olarak en az iki farklı yazılış."""
    return len(ramanujan_temsilleri(n)) >= 2


def fibonacci_komsulari(n: int):
    a, b = 0, 1
    while b < n:
        a, b = b, a + b
    return a, b


# =====================================================================
# 3) SAYI TÜRÜ KAYIT DEFTERİ  (puan = nadirlik ödülü, agirlik = Dengeli RNG)
# =====================================================================
KATEGORILER = {
    "cift":           {"ad": "Çift Sayı",       "f": is_cift,           "puan": 20,  "agirlik": 0.5},
    "tek":            {"ad": "Tek Sayı",        "f": is_tek,            "puan": 20,  "agirlik": 0.5},
    "asal":           {"ad": "Asal Sayı",       "f": is_asal,           "puan": 40,  "agirlik": 2.0},
    "yari_asal":      {"ad": "Yarı Asal",       "f": is_yari_asal,      "puan": 60,  "agirlik": 3.0},
    "tam_kare":       {"ad": "Tam Kare",        "f": is_tam_kare,       "puan": 40,  "agirlik": 1.2},
    "tam_kup":        {"ad": "Tam Küp",         "f": is_tam_kup,        "puan": 90,  "agirlik": 1.0},
    "ucgensel":       {"ad": "Üçgensel Sayı",   "f": is_ucgensel,       "puan": 50,  "agirlik": 1.0},
    "fibonacci":      {"ad": "Fibonacci Sayısı", "f": is_fibonacci,     "puan": 80,  "agirlik": 1.0},
    "ikinin_kuvveti": {"ad": "2'nin Kuvveti",   "f": is_ikinin_kuvveti, "puan": 70,  "agirlik": 1.0},
    "palindromik":    {"ad": "Palindromik",     "f": is_palindromik,    "puan": 40,  "agirlik": 1.0},
    "harshad":        {"ad": "Harshad Sayısı",  "f": is_harshad,        "puan": 30,  "agirlik": 1.0},
    "armstrong":      {"ad": "Armstrong Sayısı", "f": is_armstrong,     "puan": 150, "agirlik": 0.8},
    "mukemmel":       {"ad": "Mükemmel Sayı",   "f": is_mukemmel,       "puan": 200, "agirlik": 0.6},
    "ramanujan":      {"ad": "Ramanujan Sayısı", "f": is_ramanujan,     "puan": 200, "agirlik": 0.6},
}


def kanit(n: int, k: str) -> str:
    """Bir sayının bir kategoriye ait olup olmadığının kısa, öğrenci dostu kanıtı."""
    r = math.isqrt(max(n, 0))
    if k == "cift":
        return f"{tr_sayi(n)} ÷ 2 → kalan {n % 2}. " + ("Çifttir." if n % 2 == 0 else "Çift değildir (tektir).")
    if k == "tek":
        return f"{tr_sayi(n)} ÷ 2 → kalan {n % 2}. " + ("Tektir." if n % 2 == 1 else "Tek değildir (çifttir).")
    if k == "asal":
        if n < 2:
            return f"{n} asal değildir: asal sayılar 2'den başlar."
        if is_asal(n):
            return f"{tr_sayi(n)} asaldır: 2'den ⌊√{tr_sayi(n)}⌋ = {tr_sayi(r)} sayısına kadar hiçbir bölen yoktur."
        c = get_asal_carpanlar(n)
        if len(c) == 2:
            return f"{tr_sayi(n)} asal DEĞİLDİR, yarı asaldır: {tr_sayi(n)} = {c[0]} × {c[1]}."
        return f"{tr_sayi(n)} asal değildir: {tr_sayi(n)} = {carpim_yazisi(n)}."
    if k == "yari_asal":
        c = get_asal_carpanlar(n)
        if len(c) == 2:
            return f"{tr_sayi(n)} = {c[0]} × {c[1]} → tam iki asalın çarpımı: yarı asaldır."
        if len(c) == 1:
            return f"{tr_sayi(n)} asaldır; tek bir asal çarpanı var, yarı asal değildir."
        if len(c) == 0:
            return f"{n} sayısının asal çarpanı yoktur."
        return f"{tr_sayi(n)} = {carpim_yazisi(n)} → {len(c)} asal çarpan (tekrarlarıyla); yarı asal değildir."
    if k == "tam_kare":
        if r * r == n:
            return f"{tr_sayi(n)} = {r}² → tam karedir."
        return f"{r}² = {tr_sayi(r * r)} < {tr_sayi(n)} < {tr_sayi((r + 1) ** 2)} = {r + 1}² → tam kare değildir."
    if k == "tam_kup":
        c = kup_kok(n)
        if c ** 3 == n:
            return f"{tr_sayi(n)} = {c}³ → tam küptür."
        return f"{c}³ = {tr_sayi(c ** 3)} < {tr_sayi(n)} < {tr_sayi((c + 1) ** 3)} = {c + 1}³ → tam küp değildir."
    if k == "mukemmel":
        s = bolen_toplami(n) - n
        if n > 1 and s == n:
            return f"Kendisi hariç bölenlerinin toplamı {tr_sayi(s)} = {tr_sayi(n)} → mükemmeldir."
        tur = "bol (zengin)" if s > n else "eksik"
        return f"Kendisi hariç bölenlerinin toplamı {tr_sayi(s)} ≠ {tr_sayi(n)} → mükemmel değildir ({tur} sayı)."
    if k == "fibonacci":
        if n in (0, 1):
            return f"{n} Fibonacci dizisinin ilk terimlerindendir."
        a, b = fibonacci_komsulari(n)
        if b == n:
            return f"Dizide … {tr_sayi(a)}, {tr_sayi(n)} … → Fibonacci sayısıdır (5n²±4 testi tam kare verir)."
        return f"Dizide {tr_sayi(a)} ile {tr_sayi(b)} arasında kalır → Fibonacci değildir."
    if k == "palindromik":
        ters = str(n)[::-1]
        return f"{n} tersten {ters} okunur → " + ("palindromiktir." if ters == str(n) else "palindromik değildir.")
    if k == "harshad":
        s = rakam_toplami(n)
        if n % s == 0:
            return f"Rakam toplamı {s}; {tr_sayi(n)} ÷ {s} = {tr_sayi(n // s)} → Harshad sayısıdır."
        return f"Rakam toplamı {s}; {tr_sayi(n)} ÷ {s} kalan {n % s} → Harshad değildir."
    if k == "ramanujan":
        t = ramanujan_temsilleri(n)
        if len(t) >= 2:
            return f"{tr_sayi(n)} = " + " = ".join(f"{a}³ + {b}³" for a, b in t) + " → iki farklı küp toplamı: Ramanujan sayısıdır."
        if len(t) == 1:
            a, b = t[0]
            return f"{tr_sayi(n)} = {a}³ + {b}³ yalnızca tek yolla yazılır; iki farklı yol gerekir → değildir."
        return f"{tr_sayi(n)} iki pozitif küpün toplamı olarak yazılamaz → Ramanujan sayısı değildir."
    if k == "ucgensel":
        m = (math.isqrt(8 * n + 1) - 1) // 2 if n >= 1 else 0
        t = m * (m + 1) // 2
        if n >= 1 and t == n:
            return f"{tr_sayi(n)} = {m}·{m + 1}/2 = T{m} → üçgensel sayıdır ({m} sıralık nokta üçgeni)."
        return f"T{m} = {tr_sayi(t)} < {tr_sayi(n)} < T{m + 1} = {tr_sayi((m + 1) * (m + 2) // 2)} → üçgensel değildir."
    if k == "ikinin_kuvveti":
        if n < 1:
            return "Pozitif olmayan sayılar 2'nin kuvveti değildir."
        e = n.bit_length() - 1
        if (1 << e) == n:
            return f"{tr_sayi(n)} = 2{us(e)} (ikili: 1{'0' * e}) → 2'nin kuvvetidir."
        return f"2{us(e)} = {tr_sayi(1 << e)} < {tr_sayi(n)} < 2{us(e + 1)} = {tr_sayi(1 << (e + 1))} → 2'nin kuvveti değildir."
    if k == "armstrong":
        s = str(n)
        kk = len(s)
        toplam = sum(int(c) ** kk for c in s)
        ifade = " + ".join(f"{c}{us(kk)}" for c in s)
        return f"{ifade} = {tr_sayi(toplam)} " + ("= n → Armstrong sayısıdır." if toplam == n else f"≠ {tr_sayi(n)} → Armstrong değildir.")
    return ""


# =====================================================================
# 4) DENGELİ RASTGELE SAYI ÜRETECİ (Balanced RNG) VE ASİMETRİK PUANLAMA
# =====================================================================
ARALIKLAR = {
    "Kolay (10 – 200)": (10, 200),
    "Orta (10 – 2.000)": (10, 2000),
    "Uzman (10 – 20.000)": (10, 20000),
}
P_EVET = 0.45          # Hedef sınıfa ait sayının gelme olasılığı (manipüle edilmiş)
P_TUZAK = 0.60         # "Hayır" sorularında tuzak sayı (91 gibi) seçilme olasılığı


@st.cache_data(show_spinner="Sayı havuzları hazırlanıyor…")
def havuzlari_hazirla(lo: int, hi: int):
    """Her kategori için üyeler ve 'tuzak' adaylar (dışarıdan üyeye benzeyenler)."""
    uyeler = {k: [n for n in range(lo, hi + 1) if v["f"](n)] for k, v in KATEGORILER.items()}
    aralikta = lambda xs: sorted({x for x in xs if lo <= x <= hi})
    tuzak = {
        # Asal görünen tek yarı asallar: 51, 57, 87, 91, 119, 133 …
        "asal": [n for n in uyeler["yari_asal"] if n % 2 == 1 and n % 5 != 0],
        # Tek asal çarpanlı (asal) ya da üç çarpanlı sayılar
        "yari_asal": uyeler["asal"] + [n for n in range(lo, hi + 1) if len(get_asal_carpanlar(n)) == 3],
        "tam_kare": aralikta([k * k + d for k in range(2, math.isqrt(hi) + 2) for d in (-1, 1)]),
        "tam_kup": aralikta([k ** 3 + d for k in range(2, kup_kok(hi) + 2) for d in (-1, 1)]),
        "ikinin_kuvveti": aralikta([(1 << e) + d for e in range(2, hi.bit_length() + 1) for d in (-1, 1, 2)]),
        "ucgensel": aralikta([k * (k + 1) // 2 + d for k in range(2, math.isqrt(2 * hi) + 2) for d in (-1, 1)]),
        "fibonacci": aralikta([f + d for f in uyeler["fibonacci"] for d in (-1, 1)]),
        # σ(2^k) − 2^k = 2^k − 1 : "neredeyse mükemmel" sayılar
        "mukemmel": aralikta([1 << e for e in range(3, hi.bit_length() + 1)] + [12, 18, 20, 24, 30]),
        # Küp toplamı olarak yalnızca BİR yolla yazılabilenler
        "ramanujan": aralikta([a ** 3 + b ** 3 for a in range(1, kup_kok(hi) + 1) for b in range(a, kup_kok(hi) + 1)
                               if len(ramanujan_temsilleri(a ** 3 + b ** 3)) == 1]),
    }
    for k, liste in tuzak.items():
        f = KATEGORILER[k]["f"]
        tuzak[k] = [x for x in liste if not f(x)]
    return uyeler, tuzak


def soru_uret(lo: int, hi: int, onceki: int | None = None) -> dict:
    uyeler, tuzaklar = havuzlari_hazirla(lo, hi)
    uygun = [k for k in KATEGORILER if uyeler[k]]
    k = random.choices(uygun, weights=[KATEGORILER[x]["agirlik"] for x in uygun])[0]
    f = KATEGORILER[k]["f"]
    for _ in range(50):
        if random.random() < P_EVET:
            n, evet, tuzak = random.choice(uyeler[k]), True, False
        elif tuzaklar.get(k) and random.random() < P_TUZAK:
            n, evet, tuzak = random.choice(tuzaklar[k]), False, True
        else:
            n = random.randint(lo, hi)
            while f(n):
                n = random.randint(lo, hi)
            evet, tuzak = False, False
        if n != onceki:
            break
    return {"n": n, "kat": k, "evet": evet, "tuzak": tuzak}


def puan_degisimi(evet_dedi: bool, gercek_evet: bool, odul: int, tuzak: bool, mod: str) -> int:
    """
    ASİMETRİK PUANLAMA
      Doğru EVET  (nadir sayıyı bulmak)      : +odul  (20 … 200)
      Doğru HAYIR (olmadığını bilmek)        : +2, tuzak sayıysa (91 gibi) +5
      Yanlış HAYIR (nadir sayıyı kaçırmak)   : −5
      Yanlış EVET (yanlış alarm)
          'Yönerge'  modu : −5
          'Dengeli'  modu : −odul   → "EVET demek bir bahistir; kazanacağın kadarını riske atarsın."
    """
    if evet_dedi and gercek_evet:
        return odul
    if not evet_dedi and not gercek_evet:
        return 5 if tuzak else 2
    if not evet_dedi and gercek_evet:
        return -5
    return -odul if mod == "Dengeli (önerilen)" else -5


# =====================================================================
# 5) YARDIMCILAR: Canlı sayaç parçası (fragment) ve oturum durumu
# =====================================================================
def canli(saniye: float):
    """Streamlit >= 1.37: her saniye yalnızca sayaç parçasını yeniden çizer."""
    if hasattr(st, "fragment"):
        return st.fragment(run_every=saniye)
    return lambda fonk: fonk


def uygulamayi_yenile():
    try:
        st.rerun(scope="app")
    except TypeError:
        st.rerun()


def durum_baslat():
    ss = st.session_state
    ss.setdefault("oyun", {"aktif": False, "bitti": False})
    ss.setdefault("sprint", {"aktif": False, "bitti": False})
    ss.setdefault("dedektor_n", 91)


durum_baslat()

# =====================================================================
# 6) MODÜL 1 — OYUN MODU
# =====================================================================
def oyunu_baslat(sure: int, aralik_adi: str, mod: str):
    lo, hi = ARALIKLAR[aralik_adi]
    st.session_state.oyun = {
        "aktif": True, "bitti": False, "sure": sure, "bitis": time.time() + sure,
        "lo": lo, "hi": hi, "mod": mod, "puan": 0, "dogru": 0, "yanlis": 0,
        "tuzak_yakalanan": 0, "seri": 0, "en_iyi_seri": 0,
        "soru": soru_uret(lo, hi), "geri": None, "gecmis": [],
    }


def oyun_cevapla(evet_dedi: bool):
    o = st.session_state.oyun
    if not o.get("aktif"):
        return
    if time.time() >= o["bitis"]:
        o["aktif"], o["bitti"] = False, True
        return
    s = o["soru"]
    odul = KATEGORILER[s["kat"]]["puan"]
    dogru = evet_dedi == s["evet"]
    delta = puan_degisimi(evet_dedi, s["evet"], odul, s["tuzak"], o["mod"])
    o["puan"] += delta
    if dogru:
        o["dogru"] += 1
        o["seri"] += 1
        o["en_iyi_seri"] = max(o["en_iyi_seri"], o["seri"])
        if s["tuzak"]:
            o["tuzak_yakalanan"] += 1
    else:
        o["yanlis"] += 1
        o["seri"] = 0
    kayit = {**s, "evet_dedi": evet_dedi, "dogru": dogru, "delta": delta, "aciklama": kanit(s["n"], s["kat"])}
    o["geri"] = kayit
    o["gecmis"].append(kayit)
    o["soru"] = soru_uret(o["lo"], o["hi"], onceki=s["n"])


@canli(1)
def oyun_sayaci():
    o = st.session_state.oyun
    if not o.get("aktif"):
        return
    kalan = max(0, int(math.ceil(o["bitis"] - time.time())))
    hedef = KATEGORILER[o["soru"]["kat"]]["ad"]
    acil = " yk-acil" if kalan <= 10 else ""
    st.markdown(
        f"""<div class="yuzen-kutu{acil}">
                <div class="yk-baslik">🎯 HEDEF</div>
                <div class="yk-hedef">{hedef}</div>
                <div class="yk-satir">⏱️ {kalan} sn &nbsp;|&nbsp; ⭐ {o['puan']}</div>
            </div>""",
        unsafe_allow_html=True,
    )
    st.progress(kalan / o["sure"], text=f"Kalan süre: {kalan} saniye")
    if kalan <= 0:
        o["aktif"], o["bitti"] = False, True
        uygulamayi_yenile()


def modul_oyun():
    st.title("🎮 Oyun Modu: Sayı Avı")
    o = st.session_state.oyun

    if not o.get("aktif") and not o.get("bitti"):
        st.markdown(
            '<div class="benzetme">🎣 <b>Benzetme:</b> Bu oyun bir balık avıdır. Sıradan balıkları '
            '(“HAYIR”) tanımak az puan getirir; nadir balığı (mükemmel sayı, Ramanujan sayısı) yakalamak büyük ödüldür. '
            'Ama her kıpırtıya “EVET” diye atlarsan oltanı boşa atarsın.</div>',
            unsafe_allow_html=True,
        )
        c1, c2, c3 = st.columns(3)
        sure = c1.radio("⏱️ Süre", [60, 90, 120], index=1, format_func=lambda x: f"{x} saniye", horizontal=True)
        aralik = c2.radio("📏 Sayı aralığı", list(ARALIKLAR), index=1)
        mod = c3.radio("⚖️ Puanlama", ["Dengeli (önerilen)", "Yönerge (sabit −5)"], index=0,
                       help="Dengeli modda yanlış EVET, o sayının ödülü kadar puan kaybettirir.")
        with st.expander("📋 Puan tablosu"):
            st.markdown(
                "| Durum | Puan |\n|---|---|\n"
                "| Doğru **EVET** (nadir sayıyı buldun) | **+20 … +200** (sayının nadirliğine göre) |\n"
                "| Doğru **HAYIR** | **+2** (tuzak sayıda, örn. 91 için **+5**) |\n"
                "| Yanlış **HAYIR** (nadir sayıyı kaçırdın) | **−5** |\n"
                "| Yanlış **EVET** (yanlış alarm) | Dengeli: **−ödül** · Yönerge: **−5** |"
            )
            st.markdown(" ".join(f'<span class="rozet">{v["ad"]}: {v["puan"]}</span>' for v in KATEGORILER.values()),
                        unsafe_allow_html=True)
        st.button("▶️  OYUNU BAŞLAT", key="btn_basla", on_click=oyunu_baslat, args=(sure, aralik, mod))
        return

    if o.get("bitti"):
        oyun_sonu_ekrani(o)
        return

    oyun_sayaci()
    s = o["soru"]
    kat = KATEGORILER[s["kat"]]
    st.markdown(
        f"""<div class="sayi-kart">
              <div class="soru">Bu sayı bir <span style="color:{KIRMIZI}">{kat['ad']}</span> mı?</div>
              <div class="sayi">{tr_sayi(s['n'])}</div>
              <div class="odul">Doğru EVET: <b>+{kat['puan']}</b> · Doğru HAYIR: <b>+2 / +5</b> · Puan: <b>{o['puan']}</b> · Seri: <b>{o['seri']}</b></div>
            </div>""",
        unsafe_allow_html=True,
    )
    c1, c2 = st.columns(2, gap="large")
    c1.button("✅  EVET", key="btn_evet", on_click=oyun_cevapla, args=(True,))
    c2.button("❌  HAYIR", key="btn_hayir", on_click=oyun_cevapla, args=(False,))

    g = o.get("geri")
    if g:
        sinif = "gb-dogru" if g["dogru"] else "gb-yanlis"
        baslik = "✔️ Doğru!" if g["dogru"] else "✖️ Yanlış!"
        isaret = f"+{g['delta']}" if g["delta"] > 0 else str(g["delta"])
        tuzak_notu = " 🪤 <b>Tuzak sayı!</b>" if g["tuzak"] else ""
        st.markdown(
            f'<div class="geri-bildirim {sinif}"><b>{baslik} ({isaret})</b>{tuzak_notu}<br>'
            f'<b>{tr_sayi(g["n"])}</b> → {KATEGORILER[g["kat"]]["ad"]}? &nbsp; {g["aciklama"]}</div>',
            unsafe_allow_html=True,
        )


def oyun_sonu_ekrani(o: dict):
    st.balloons()
    toplam = o["dogru"] + o["yanlis"]
    oran = (100 * o["dogru"] / toplam) if toplam else 0
    st.subheader("🏁 Süre doldu!")
    c = st.columns(5)
    c[0].metric("⭐ Puan", o["puan"])
    c[1].metric("✅ Doğru", o["dogru"])
    c[2].metric("❌ Yanlış", o["yanlis"])
    c[3].metric("🎯 İsabet", f"%{oran:.0f}")
    c[4].metric("🪤 Yakalanan tuzak", o["tuzak_yakalanan"])

    hatalar = [g for g in o["gecmis"] if not g["dogru"]]
    if hatalar:
        st.markdown("### 🩻 Hata Röntgeni — yanlışlarından öğren")
        for g in hatalar:
            st.markdown(
                f'<div class="geri-bildirim gb-yanlis"><b>{tr_sayi(g["n"])}</b> → {KATEGORILER[g["kat"]]["ad"]}? '
                f'Senin cevabın: <b>{"EVET" if g["evet_dedi"] else "HAYIR"}</b> ({g["delta"]})<br>{g["aciklama"]}</div>',
                unsafe_allow_html=True,
            )
    elif toplam:
        st.success("Kusursuz tur! Tek bir hata bile yok. 🏆")
    st.button("🔁  YENİ OYUN", key="btn_basla", on_click=lambda: st.session_state.update(oyun={"aktif": False, "bitti": False}))


# =====================================================================
# 7) MODÜL 2 — SAYI DEDEKTÖRÜ (RÖNTGEN)
# =====================================================================
def carpan_agaci_dot(n: int) -> str:
    """Çarpan ağacı (Graphviz DOT): bileşikler mavi kutu, asallar kırmızı daire."""
    satirlar = [
        "digraph G {", "bgcolor=transparent;", "rankdir=TB;",
        'node [fontname="Helvetica", fontsize=18, style=filled, penwidth=0];',
        'edge [color="#0d2b5b", penwidth=2];',
    ]
    sayac = 0

    def dugum(deger: int) -> str:
        nonlocal sayac
        sayac += 1
        ad = f"n{sayac}"
        if is_asal(deger):
            satirlar.append(f'{ad} [label="{deger}", shape=circle, fillcolor="{KIRMIZI}", fontcolor="white"];')
        else:
            satirlar.append(f'{ad} [label="{deger}", shape=box, fillcolor="{MAVI}", fontcolor="white"];')
        return ad

    kalan = n
    ust = dugum(kalan)
    for p in get_asal_carpanlar(n)[:-1]:
        sol = dugum(p)
        kalan //= p
        sag = dugum(kalan)
        satirlar += [f"{ust} -> {sol};", f"{ust} -> {sag};"]
        ust = sag
    satirlar.append("}")
    return "\n".join(satirlar)


def nokta_izgarasi(satir: int, sutun: int, renk: str) -> str:
    noktalar = "".join(f'<span class="nokta" style="background:{renk}"></span>' for _ in range(satir * sutun))
    return f'<div class="izgara" style="grid-template-columns: repeat({sutun}, 16px);">{noktalar}</div>'


def hazir_sayi_sec(deger: int):
    st.session_state.dedektor_n = deger


def modul_dedektor():
    st.title("🔬 Sayı Dedektörü: Sayının Röntgeni")
    st.markdown(
        '<div class="benzetme">🧬 <b>Benzetme:</b> Asal sayılar sayıların <b>DNA harfleridir</b>. '
        'Her sayı, bu harflerin tek bir diziliminden oluşur (Aritmetiğin Temel Teoremi). '
        'Dedektör bir röntgen cihazı gibi sayının içine bakar ve bu dizilimi gösterir.</div>',
        unsafe_allow_html=True,
    )

    st.markdown("**Hazır örnekler (dokun):**")
    ornekler = [91, 51, 1729, 496, 153, 2047, 8128, 97, 144, 65537]
    kolonlar = st.columns(len(ornekler))
    for kol, d in zip(kolonlar, ornekler):
        kol.button(tr_sayi(d), key=f"hazir_{d}", on_click=hazir_sayi_sec, args=(d,))

    n = int(st.number_input("Röntgeni çekilecek sayı (1 – 10¹²)", min_value=1, max_value=10 ** 12,
                            step=1, key="dedektor_n"))

    t0 = time.perf_counter()
    carpanlar = get_asal_carpanlar(n)
    bolenler = get_bolenler(n)
    ozellikler = [(v["ad"], v["f"](n), kanit(n, k)) for k, v in KATEGORILER.items()]
    gecen_ms = (time.perf_counter() - t0) * 1000

    # ---------------- Teşhis kartı ----------------
    if n == 1:
        st.markdown('<div class="durum durum-birim">1 ne asaldır ne bileşiktir<small>1 birimdir; tek bir pozitif böleni vardır.</small></div>', unsafe_allow_html=True)
    elif len(carpanlar) == 1:
        st.markdown(f'<div class="durum durum-asal">{tr_sayi(n)} ASALDIR<small>Yalnızca 1 ve {tr_sayi(n)} ile bölünür.</small></div>', unsafe_allow_html=True)
    elif len(carpanlar) == 2:
        p, q = carpanlar
        st.markdown(f'<div class="durum durum-yari">Asal Değildir, Yarı Asaldır: {tr_sayi(p)} × {tr_sayi(q)}'
                    f'<small>Görünüşe aldanma! {tr_sayi(n)}, iki asal sayının çarpımıdır.</small></div>', unsafe_allow_html=True)
    else:
        st.markdown(f'<div class="durum durum-bilesik">Asal Değildir, Bileşiktir: {carpim_yazisi(n)}'
                    f'<small>{len(carpanlar)} asal çarpandan (tekrarlarıyla) oluşur.</small></div>', unsafe_allow_html=True)

    sol, sag = st.columns([1, 1], gap="large")

    # ---------------- Sol: DNA + ağaç + dikdörtgen testi ----------------
    with sol:
        st.subheader("🧬 Asal Çarpan DNA'sı")
        if n > 1:
            st.latex(f"{n} = {carpim_latex(n)}")
            st.markdown(" ".join(f'<span class="rozet rozet-kirmizi">{p}</span>' for p in carpanlar), unsafe_allow_html=True)
            st.markdown("**Çarpan ağacı**")
            st.graphviz_chart(carpan_agaci_dot(n))
        else:
            st.info("1'in asal çarpanı yoktur.")

        if 1 < n <= 400:
            st.subheader("▦ Dikdörtgen Testi")
            st.markdown(
                '<div class="benzetme">🧱 <b>Benzetme:</b> Elinde n tane bilye var. Onları <b>dolu bir dikdörtgen</b> '
                'olacak şekilde dizebiliyorsan sayı bileşiktir. Asal sayılar yalnızca tek sıra hâlinde dizilebilir.</div>',
                unsafe_allow_html=True,
            )
            ciftler = [(d, n // d) for d in bolenler if 1 < d <= math.isqrt(n)]
            if not ciftler:
                st.markdown(f"**{n}** bilyeden 1 × {n} dışında hiçbir dikdörtgen kurulamaz → asaldır.")
                if n <= 60:
                    st.markdown(nokta_izgarasi(1, n, YESIL), unsafe_allow_html=True)
            else:
                if len(carpanlar) == 2:
                    st.markdown(f"Yarı asal sayıların **tek bir** gerçek dikdörtgeni vardır: **{ciftler[0][0]} × {ciftler[0][1]}**")
                for a, b in ciftler[::-1][:3]:
                    st.markdown(f"**{a} satır × {b} sütun**")
                    st.markdown(nokta_izgarasi(a, b, MAVI if len(carpanlar) > 2 else KIRMIZI), unsafe_allow_html=True)

    # ---------------- Sağ: algoritma izi + bölenler ----------------
    with sag:
        st.subheader("🛰️ Algoritma İzi: O(√n) İspatı")
        if n >= 4:
            denenen, bulunan, sayac = asallik_izi(n)
            kok = math.sqrt(n)
            parcalar = [f'<span class="iz-bolen">{d}</span>' if d == bulunan else f'<span class="iz-deneme">{d}</span>'
                        for d in denenen]
            if sayac > len(denenen):
                parcalar.append(f"… (+{tr_sayi(sayac - len(denenen))} deneme)")
            kok_s = f"{kok:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
            st.markdown(f'<div class="iz-kutu">√{tr_sayi(n)} ≈ {kok_s} sınırına kadar denenen bölenler:<br>{" ".join(parcalar)}</div>',
                        unsafe_allow_html=True)
            naif = n - 2
            if bulunan:
                st.markdown(f"➡️ **{bulunan}** sayısı {tr_sayi(n)}'i böldü: {tr_sayi(n)} = {bulunan} × {tr_sayi(n // bulunan)}. "
                            f"Toplam **{tr_sayi(sayac)}** deneme yapıldı.")
            else:
                st.markdown(f"➡️ √n sınırına kadar hiçbir bölen bulunamadı → **asal**. Toplam **{tr_sayi(sayac)}** deneme.")
                st.markdown(f"🐢 Naif yöntem 2'den {tr_sayi(n - 1)}'e kadar **{tr_sayi(naif)}** deneme yapardı; "
                            f"bu algoritma yaklaşık **{naif / max(sayac, 1):,.0f} kat** daha az iş yaptı.".replace(",", "."))
        else:
            st.markdown("n < 4 için test doğrudan sonuç verir.")

        st.subheader(f"🧮 Bölenler — τ(n) = {len(bolenler)}")
        if n > 1:
            ussler = list(carpan_ussu(n).values())
            st.latex(r"\tau(n) = " + r" \cdot ".join(f"({e}+1)" for e in ussler) + f" = {len(bolenler)}"
                     + r"\qquad \sigma(n) = " + f"{tr_sayi(sum(bolenler)).replace('.', '{.}')}")
        if len(bolenler) <= 120:
            st.markdown(" ".join(f'<span class="rozet">{tr_sayi(d)}</span>' for d in bolenler), unsafe_allow_html=True)
        else:
            st.markdown(f"İlk 60 bölen: {', '.join(tr_sayi(d) for d in bolenler[:60])} …")
        ciftler = [(d, n // d) for d in bolenler if d <= math.isqrt(n)]
        with st.expander(f"🪞 Bölen çiftleri (ayna √n ≈ {math.sqrt(n):.2f})"):
            st.markdown("Her bölen çifti √n'nin iki yanında durur; bu yüzden yalnızca √n'ye kadar aramak yeter.")
            st.markdown("\n".join(f"- {tr_sayi(a)} × {tr_sayi(b)}" for a, b in ciftler[:60]))

    # ---------------- Master Class özellik tablosu ----------------
    st.subheader("🏅 Master Class Özellikleri")
    satirlar = "".join(
        f'<tr class="{"evet" if var else ""}"><td><b>{ad}</b></td><td style="font-size:1.4rem">{"✅" if var else "❌"}</td><td>{ac}</td></tr>'
        for ad, var, ac in ozellikler
    )
    st.markdown(f'<table class="ozellik-tablo"><tr><th>Özellik</th><th>Durum</th><th>Kanıt</th></tr>{satirlar}</table>',
                unsafe_allow_html=True)
    st.caption(f"Tüm analiz {gecen_ms:.2f} ms içinde tamamlandı.")


# =====================================================================
# 8) MODÜL 3 — FORMULA SPRINT
# =====================================================================
OZDESLIKLER = [
    (r"a^2 - b^2 = \square", "(a − b)(a + b)", ["(a − b)²", "a² − 2ab + b²", "(a + b)²"]),
    (r"(a+b)^2 = \square", "a² + 2ab + b²", ["a² + b²", "a² + ab + b²", "2a² + 2b²"]),
    (r"(a-b)^2 = \square", "a² − 2ab + b²", ["a² − b²", "a² + 2ab − b²", "a² − ab + b²"]),
    (r"(a+b)^3 = \square", "a³ + 3a²b + 3ab² + b³", ["a³ + b³", "a³ + 3ab + b³", "a³ + 2a²b + 2ab² + b³"]),
    (r"(a-b)^3 = \square", "a³ − 3a²b + 3ab² − b³", ["a³ − b³", "a³ − 3a²b − 3ab² − b³", "a³ + 3a²b − 3ab² − b³"]),
    (r"a^3 + b^3 = \square", "(a + b)(a² − ab + b²)", ["(a + b)(a² + ab + b²)", "(a + b)³", "(a − b)(a² + ab + b²)"]),
    (r"a^3 - b^3 = \square", "(a − b)(a² + ab + b²)", ["(a − b)(a² − ab + b²)", "(a − b)³", "(a + b)(a² − ab + b²)"]),
    (r"(a+b+c)^2 = \square", "a² + b² + c² + 2(ab + bc + ca)", ["a² + b² + c²", "a² + b² + c² + ab + bc + ca", "(a + b)² + c²"]),
    (r"x^2 + \dfrac{1}{x^2} = \square", "(x + 1/x)² − 2", ["(x + 1/x)²", "(x − 1/x)² − 2", "(x + 1/x)² + 2"]),
]

TRIGONOMETRI = [
    (r"\sin^2 x + \cos^2 x = \square", "1", ["0", "2", "sin 2x"]),
    (r"1 + \tan^2 x = \square", "1 / cos²x", ["1 / sin²x", "cot²x", "sin²x"]),
    (r"1 + \cot^2 x = \square", "1 / sin²x", ["1 / cos²x", "tan²x", "cos²x"]),
    (r"\sin 2x = \square", "2 sin x · cos x", ["2 sin x", "sin²x − cos²x", "sin x · cos x"]),
    (r"\cos 2x = \cos^2 x - \square", "sin²x", ["cos²x", "2 sin x", "1"]),
    (r"\cos 2x = 1 - \square", "2 sin²x", ["sin²x", "2 cos²x", "cos²x"]),
    (r"\tan 2x = \square", "2 tan x / (1 − tan²x)", ["2 tan x", "2 tan x / (1 + tan²x)", "tan²x − 1"]),
    (r"\sin^2 \tfrac{x}{2} = \square", "(1 − cos x) / 2", ["(1 + cos x) / 2", "(1 − sin x) / 2", "1 − cos x"]),
    (r"\cos^2 \tfrac{x}{2} = \square", "(1 + cos x) / 2", ["(1 − cos x) / 2", "(1 + sin x) / 2", "1 + cos x"]),
    (r"\tan \tfrac{x}{2} = \square", "sin x / (1 + cos x)", ["cos x / (1 + sin x)", "sin x / (1 − sin x)", "(1 + cos x) / sin x"]),
    (r"\sin(a+b) = \square", "sin a cos b + cos a sin b", ["sin a + sin b", "sin a sin b + cos a cos b", "sin a cos b − cos a sin b"]),
    (r"\sin(a-b) = \square", "sin a cos b − cos a sin b", ["sin a − sin b", "cos a cos b − sin a sin b", "sin a cos b + cos a sin b"]),
    (r"\cos(a+b) = \square", "cos a cos b − sin a sin b", ["cos a cos b + sin a sin b", "cos a + cos b", "sin a cos b + cos a sin b"]),
    (r"\cos(a-b) = \square", "cos a cos b + sin a sin b", ["cos a cos b − sin a sin b", "cos a − cos b", "sin a sin b − cos a cos b"]),
    (r"\tan(a+b) = \square", "(tan a + tan b) / (1 − tan a tan b)", ["tan a + tan b", "(tan a + tan b) / (1 + tan a tan b)", "(tan a − tan b) / (1 + tan a tan b)"]),
    (r"\sin A + \sin B = \square", "2 sin((A+B)/2) cos((A−B)/2)", ["2 cos((A+B)/2) cos((A−B)/2)", "sin(A + B)", "2 sin((A−B)/2) cos((A+B)/2)"]),
]

SPRINT_TURLERI = ["Çarpım Tablosu", "Tam Kareler", "Tam Küpler", "Özdeşlikler", "Trigonometri"]


def sayisal_celdiriciler(dogru: int, adaylar: list) -> list:
    secilen = []
    for a in adaylar:
        if a > 0 and a != dogru and a not in secilen:
            secilen.append(a)
    while len(secilen) < 3:
        a = dogru + random.choice([-1, 1]) * random.randint(1, max(3, dogru // 5))
        if a > 0 and a != dogru and a not in secilen:
            secilen.append(a)
    random.shuffle(secilen)
    return secilen[:3]


def sprint_soru_uret(turler: list) -> dict:
    tur = random.choice(turler)
    if tur == "Çarpım Tablosu":
        a, b = random.randint(2, 12), random.randint(2, 12)
        dogru = a * b
        latex = rf"{a} \times {b} = \square"
        yanlis = sayisal_celdiriciler(dogru, [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, dogru + 10, dogru - 10])
        dogru_s, yanlis_s = str(dogru), [str(y) for y in yanlis]
    elif tur == "Tam Kareler":
        k = random.randint(2, 30)
        dogru = k * k
        latex = rf"{k}^2 = \square"
        yanlis = sayisal_celdiriciler(dogru, [(k - 1) ** 2, (k + 1) ** 2, 2 * k, dogru + 10, dogru - 10])
        dogru_s, yanlis_s = str(dogru), [str(y) for y in yanlis]
    elif tur == "Tam Küpler":
        k = random.randint(2, 15)
        dogru = k ** 3
        latex = rf"{k}^3 = \square"
        yanlis = sayisal_celdiriciler(dogru, [(k - 1) ** 3, (k + 1) ** 3, 3 * k, k * k, dogru + 10])
        dogru_s, yanlis_s = str(dogru), [str(y) for y in yanlis]
    else:
        latex, dogru_s, yanlis_s = random.choice(OZDESLIKLER if tur == "Özdeşlikler" else TRIGONOMETRI)
    secenekler = [dogru_s] + list(yanlis_s)
    random.shuffle(secenekler)
    return {"tur": tur, "latex": latex, "secenekler": secenekler, "dogru": dogru_s, "id": random.getrandbits(32)}


def sprinti_baslat(sure: int, turler: list):
    st.session_state.sprint = {
        "aktif": True, "bitti": False, "sure": sure, "bitis": time.time() + sure, "turler": turler,
        "puan": 0, "dogru": 0, "yanlis": 0, "soru": sprint_soru_uret(turler), "geri": None, "hatalar": [],
    }


def sprint_cevapla(secim: str):
    s = st.session_state.sprint
    if not s.get("aktif"):
        return
    if time.time() >= s["bitis"]:
        s["aktif"], s["bitti"] = False, True
        return
    q = s["soru"]
    if secim == q["dogru"]:
        s["puan"] += 10
        s["dogru"] += 1
        s["geri"] = (True, q["latex"], q["dogru"])
    else:
        s["puan"] -= 5
        s["yanlis"] += 1
        s["geri"] = (False, q["latex"], q["dogru"])
        s["hatalar"].append((q["latex"], secim, q["dogru"]))
    s["soru"] = sprint_soru_uret(s["turler"])


@canli(1)
def sprint_sayaci():
    s = st.session_state.sprint
    if not s.get("aktif"):
        return
    kalan = max(0, int(math.ceil(s["bitis"] - time.time())))
    acil = " yk-acil" if kalan <= 10 else ""
    st.markdown(
        f"""<div class="yuzen-kutu{acil}">
                <div class="yk-baslik">🏎️ FORMULA SPRINT</div>
                <div class="yk-hedef">{s['soru']['tur']}</div>
                <div class="yk-satir">⏱️ {kalan} sn &nbsp;|&nbsp; ⭐ {s['puan']}</div>
            </div>""",
        unsafe_allow_html=True,
    )
    st.progress(kalan / s["sure"], text=f"Kalan süre: {kalan} saniye")
    if kalan <= 0:
        s["aktif"], s["bitti"] = False, True
        uygulamayi_yenile()


def modul_sprint():
    st.title("🏎️ Formula Sprint")
    s = st.session_state.sprint

    if not s.get("aktif") and not s.get("bitti"):
        st.markdown(
            '<div class="benzetme">🏁 <b>Benzetme:</b> Formüller bir yarış pilotunun vites geçişleri gibidir: '
            'düşünmeden, refleksle yapılmalıdır. Pilotun aklı virajda, yani asıl problemde olmalıdır.</div>',
            unsafe_allow_html=True,
        )
        turler = st.multiselect("Yarış pisti (konu seç)", SPRINT_TURLERI, default=SPRINT_TURLERI)
        sure = st.radio("⏱️ Süre", [60, 90, 120], index=0, format_func=lambda x: f"{x} saniye", horizontal=True)
        st.caption("Doğru: +10 · Yanlış: −5 · Klavye gerekmez; tüm cevaplar dokunmatik butonlarla verilir.")
        st.button("🏁  SPRİNTİ BAŞLAT", key="btn_sprint_basla", on_click=sprinti_baslat,
                  args=(sure, turler or SPRINT_TURLERI))
        return

    if s.get("bitti"):
        st.balloons()
        st.subheader("🏁 Bitiş çizgisi!")
        c = st.columns(3)
        c[0].metric("⭐ Puan", s["puan"])
        c[1].metric("✅ Doğru", s["dogru"])
        c[2].metric("❌ Yanlış", s["yanlis"])
        if s["hatalar"]:
            st.markdown("### 🔧 Pit Stop — doğrularıyla tekrar et")
            for latex, secim, dogru in s["hatalar"]:
                st.latex(latex.replace(r"\square", r"\boxed{\;?\;}"))
                st.markdown(f"Senin cevabın: ~~{secim}~~ → Doğrusu: **{dogru}**")
        st.button("🔁  YENİ SPRİNT", key="btn_sprint_basla",
                  on_click=lambda: st.session_state.update(sprint={"aktif": False, "bitti": False}))
        return

    sprint_sayaci()
    q = s["soru"]
    st.markdown(f"#### {q['tur']}")
    st.latex(r"\Huge " + q["latex"].replace(r"\square", r"\boxed{\;?\;}"))
    kolonlar = st.columns(2, gap="large")
    for i, secenek in enumerate(q["secenekler"]):
        kolonlar[i % 2].button(secenek, key=f"sp_{q['id']}_{i}", on_click=sprint_cevapla, args=(secenek,))
    if s.get("geri"):
        dogru_mu, latex, cevap = s["geri"]
        sinif = "gb-dogru" if dogru_mu else "gb-yanlis"
        metin = "✔️ Doğru! (+10)" if dogru_mu else f"✖️ Yanlış (−5) — doğru cevap: <b>{cevap}</b>"
        st.markdown(f'<div class="geri-bildirim {sinif}">{metin}</div>', unsafe_allow_html=True)


# =====================================================================
# 9) MODÜL 4 — BİLGİ KÖŞESİ
# =====================================================================
def bilgi(metin: str):
    st.markdown(f'<div class="bilgi-kutu">{metin}</div>', unsafe_allow_html=True)


def benzetme(metin: str):
    st.markdown(f'<div class="benzetme">💡 <b>Benzetme:</b> {metin}</div>', unsafe_allow_html=True)


def modul_bilgi():
    st.title("📚 Bilgi Köşesi")
    sekmeler = st.tabs(["Asal & Yarı Asal", "Mersenne", "Fermat", "Mükemmel", "Ramanujan",
                        "Fibonacci & Üçgensel", "Diğer Türler", "Bölen Fonksiyonları", "Algoritmalar"])

    with sekmeler[0]:
        st.subheader("Asal Sayılar")
        bilgi("1'den büyük olup yalnızca 1'e ve kendisine bölünebilen doğal sayılara <b>asal sayı</b> denir.")
        st.latex(r"p \text{ asal} \iff p > 1 \;\text{ve}\; \forall d \in \mathbb{N},\; d \mid p \Rightarrow d \in \{1, p\}")
        st.markdown("**Aritmetiğin Temel Teoremi:** 1'den büyük her doğal sayı, asalların çarpımı olarak sıralama dışında **tek** biçimde yazılır.")
        st.latex(r"n = p_1^{e_1}\, p_2^{e_2} \cdots p_k^{e_k}")
        benzetme("Asallar sayıların <b>kimyasal elementleri</b> gibidir. Su her zaman H₂O'dur; 360 da her zaman 2³·3²·5'tir.")
        st.subheader("Yarı Asal Sayılar ve 91 Yanılgısı")
        bilgi("Tam olarak iki asal sayının (eşit olabilir) çarpımı olan sayılara <b>yarı asal</b> denir: 4, 6, 9, 15, 49, 91 …")
        st.latex(r"91 = 7 \times 13 \qquad 51 = 3 \times 17 \qquad 119 = 7 \times 17")
        st.markdown("91 tektir, 2, 3 ve 5 ile bölünmez ve çarpım tablosunda görünmez. Bu yüzden asal **sanılır**. "
                    "Oysa √91 ≈ 9,5 olduğundan 7'ye kadar denemek yeter ve 7 sayıyı böler.")
        benzetme("Yarı asallar <b>maskeli asallardır</b>. Uzaktan asal gibi görünürler; maskeyi indiren şey 7 gibi küçük bir böleni denemektir.")
        st.subheader("√n Teoremi (Algoritmanın Temeli)")
        st.latex(r"n>1 \text{ bileşik} \;\Longrightarrow\; \exists\, p \text{ asal},\; p \mid n,\; p \le \sqrt{n}")
        st.markdown("**İspat:** n bileşikse n = a·b ve 1 < a ≤ b yazılabilir. O hâlde a² ≤ a·b = n, yani a ≤ √n'dir. "
                    "a'nın herhangi bir asal böleni p için p ≤ a ≤ √n ve p | n olur. ∎")

    with sekmeler[1]:
        st.subheader("Mersenne Sayıları")
        st.latex(r"M_p = 2^p - 1")
        st.markdown("Eğer p bileşikse M_p de bileşiktir. Tersi doğru değildir: p = 11 asal olduğu hâlde")
        st.latex(r"M_{11} = 2^{11} - 1 = 2047 = 23 \times 89")
        st.markdown("Asal olan Mersenne sayılarına **Mersenne asalı** denir: 3, 7, 31, 127, 8191 … "
                    "Bilinen en büyük asal sayıların çoğu, gönüllü bilgisayarların ortak çalıştığı **GIMPS** "
                    "(Great Internet Mersenne Prime Search) projesiyle bulunmuştur. Bu asallar Lucas–Lehmer testiyle doğrulanır.")
        st.latex(r"s_0 = 4,\quad s_{i+1} = s_i^2 - 2 \pmod{M_p};\qquad M_p \text{ asal} \iff s_{p-2} \equiv 0")
        benzetme("GIMPS, dünyanın dört bir yanındaki bilgisayarların aynı yapbozun farklı parçalarını çözdüğü bir <b>imece</b>dir.")

    with sekmeler[2]:
        st.subheader("Fermat Sayıları")
        st.latex(r"F_k = 2^{2^k} + 1")
        st.markdown("F₀ = 3, F₁ = 5, F₂ = 17, F₃ = 257, F₄ = 65537 asaldır. Fermat hepsinin asal olduğunu tahmin etmiştir. "
                    "Euler (1732) bu tahmini çürütmüştür:")
        st.latex(r"F_5 = 2^{32} + 1 = 4\,294\,967\,297 = 641 \times 6\,700\,417")
        st.markdown("Gauss'a göre düzgün n-gen cetvel ve pergelle ancak n, 2'nin bir kuvveti ile farklı Fermat asallarının çarpımıysa çizilebilir.")
        benzetme("Fermat'nın tahmini, ilk beş beyaz kuğuyu görüp ‘bütün kuğular beyazdır’ demeye benzer. Altıncı sayı siyah kuğu çıkmıştır.")

    with sekmeler[3]:
        st.subheader("Mükemmel Sayılar")
        st.latex(r"\sigma(n) - n = n \iff \sigma(n) = 2n")
        st.latex(r"6 = 1+2+3 \qquad 28 = 1+2+4+7+14")
        st.markdown("**Öklid–Euler Teoremi:** 2ᵖ − 1 asal ise aşağıdaki sayı mükemmeldir ve her çift mükemmel sayı bu biçimdedir:")
        st.latex(r"N = 2^{p-1}\,(2^p - 1) \qquad (6,\ 28,\ 496,\ 8128,\ \dots)")
        st.markdown("Böylece her Mersenne asalı bir mükemmel sayı doğurur. Tek mükemmel sayı olup olmadığı hâlâ çözülmemiş bir problemdir.")
        benzetme("Mükemmel sayı, parçalarının toplamı bütüne <b>tam</b> eşit olan bir yapboz gibidir: ne parça artar ne eksik kalır.")

    with sekmeler[4]:
        st.subheader("Ramanujan (Taksi) Sayıları")
        st.latex(r"1729 = 1^3 + 12^3 = 9^3 + 10^3")
        st.markdown("Hardy, hastanedeki Ramanujan'ı ziyarete giderken bindiği taksinin numarasının (1729) sıkıcı olduğunu söyler. "
                    "Ramanujan hemen itiraz eder: 1729, iki küpün toplamı olarak **iki farklı yolla** yazılabilen en küçük sayıdır. "
                    "Bu nedenle bu sayılara taksi sayıları denir (Ta(2) = 1729).")
        st.latex(r"4104 = 2^3 + 16^3 = 9^3 + 15^3 \qquad 13832 = 2^3 + 24^3 = 18^3 + 20^3")

    with sekmeler[5]:
        st.subheader("Fibonacci Sayıları")
        st.latex(r"F_0 = 0,\; F_1 = 1,\; F_{n+1} = F_n + F_{n-1} \qquad F_n = \frac{\varphi^n - \psi^n}{\sqrt 5},\; \varphi = \frac{1+\sqrt5}{2}")
        st.markdown("**Hızlı test (Gessel):** Bir n sayısı ancak ve ancak aşağıdaki koşul sağlanıyorsa Fibonacci sayısıdır:")
        st.latex(r"5n^2 + 4 \;\text{ veya }\; 5n^2 - 4 \;\text{ tam karedir.}")
        st.subheader("Üçgensel Sayılar")
        st.latex(r"T_k = 1 + 2 + \dots + k = \frac{k(k+1)}{2} \qquad 8T_k + 1 = (2k+1)^2")
        benzetme("Üçgensel sayılar <b>bowling labutları</b>dır: 1, 3, 6, 10 … Her yeni sıra bir fazla labut ekler.")

    with sekmeler[6]:
        st.subheader("2'nin Kuvvetleri")
        st.latex(r"n = 2^k \iff n \,\&\, (n-1) = 0")
        st.markdown("İkili tabanda 2ᵏ = 100…0 biçimindedir. Bir eksiği 011…1 olduğundan VE işlemi sıfır verir. Bu test O(1) sürer.")
        benzetme("2'nin kuvveti, odasında <b>tek bir lambası yanan</b> bir evdir. n − 1, o lambayı söndürüp alttakilerin hepsini yakar.")
        st.subheader("Armstrong (Narsisistik) Sayılar")
        st.latex(r"153 = 1^3 + 5^3 + 3^3 \qquad 9474 = 9^4 + 4^4 + 7^4 + 4^4")
        st.markdown("k basamaklı bir sayının rakamlarının k. kuvvetleri toplamı kendisine eşittir. 10 tabanında yalnızca 88 tane vardır.")
        st.subheader("Harshad (Niven) Sayılar")
        st.latex(r"n \equiv 0 \pmod{S(n)}, \qquad 18:\; 1+8 = 9,\; 18 \div 9 = 2")
        st.markdown("Sanskritçe ‘büyük sevinç’ anlamına gelir; D. R. Kaprekar tarafından adlandırılmıştır.")
        st.subheader("Palindromik, Tam Kare, Tam Küp")
        st.latex(r"12321 \;(\text{tersi aynı}) \qquad 144 = 12^2 \qquad 343 = 7^3")

    with sekmeler[7]:
        st.subheader("Bölen Sayısı ve Bölen Toplamı")
        st.latex(r"n = \prod_{i=1}^{k} p_i^{e_i} \;\Longrightarrow\; \tau(n) = \prod_{i=1}^{k} (e_i + 1), \qquad \sigma(n) = \prod_{i=1}^{k} \frac{p_i^{e_i+1} - 1}{p_i - 1}")
        st.latex(r"360 = 2^3 \cdot 3^2 \cdot 5 \;\Rightarrow\; \tau(360) = 4 \cdot 3 \cdot 2 = 24")
        benzetme("Bir böleni kurmak, her asal ‘malzeme’den kaç tane kullanacağını seçmektir. 2'den 0–3, 3'ten 0–2, 5'ten 0–1 tane: 4·3·2 = 24 tarif.")

    with sekmeler[8]:
        st.subheader("Kullanılan Algoritmalar ve Karmaşıklıkları")
        st.markdown(
            "| Fonksiyon | Yöntem | Karmaşıklık |\n|---|---|---|\n"
            "| `is_asal` | 6k ± 1 deneme bölmesi, √n'de durma | O(√n) |\n"
            "| `get_asal_carpanlar` | Deneme bölmesi, bölündükçe n küçülür | O(√n) |\n"
            "| `get_bolenler` | 1..√n tarama + ayna (n/d) | O(√n) |\n"
            "| `is_mukemmel` | σ(n) = 2n | O(√n) |\n"
            "| `is_ramanujan` | a ≤ ∛(n/2) için b³ = n − a³ kontrolü | O(∛n) |\n"
            "| `is_fibonacci` | 5n² ± 4 tam kare testi | O(log n) |\n"
            "| `is_tam_kare`, `is_ucgensel` | Tamsayı karekökü (`math.isqrt`) | O(log n) |\n"
            "| `is_ikinin_kuvveti` | n & (n − 1) = 0 | O(1) |\n"
            "| `is_armstrong`, `is_harshad`, `is_palindromik` | Basamak işlemleri | O(log n) |"
        )
        benzetme("Kayıp bir eşi bulmak için ayakkabı dolabının tamamını değil, yalnızca <b>yarısını</b> aramak yeter; "
                 "çünkü her bölen çiftinin bir teki √n'nin altındadır.")


# =====================================================================
# 10) ANA YÖNLENDİRİCİ
# =====================================================================
with st.sidebar:
    st.markdown("## 🔢 MASTER CLASS")
    st.markdown("### Sayılar ve DNA'ları")
    secim = st.radio(
        "Modül",
        ["🎮 Oyun Modu", "🔬 Sayı Dedektörü", "🏎️ Formula Sprint", "📚 Bilgi Köşesi"],
        label_visibility="collapsed",
    )
    st.markdown("---")
    st.markdown("TÜBİTAK 2204-A · Matematik<br>Algoritma Tasarımı ve Uygulamaları", unsafe_allow_html=True)
    st.caption("Çevrimdışı çalışır · Akıllı tahta uyumlu")

if secim.startswith("🎮"):
    modul_oyun()
elif secim.startswith("🔬"):
    modul_dedektor()
elif secim.startswith("🏎️"):
    modul_sprint()
else:
    modul_bilgi()
