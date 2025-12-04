import streamlit as st
import math
import random
import time

# --- SAYFA AYARLARI ---
st.set_page_config(
    page_title="Master Class Matematik",
    page_icon="🎓",
    layout="wide"
)

# =============================================================================
# TASARIM: KRİTİK CSS ÇÖZÜMÜ (TÜM ÜST BOŞLUKLARI VE HEADER'I SİLME)
# =============================================================================
st.markdown("""
<style>
/* KRİTİK: Tarayıcı seviyesindeki üst boşlukları sıfırla */
html, body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
}

/* Menü ve Alt Bilgi Gizleme */
#MainMenu, footer {visibility: hidden;}

/* KRİTİK ÇÖZÜM AŞAMA 1: Streamlit'in SİYAH ÜST ÇUBUĞUNU (Header) SİL */
.stApp header, [data-testid="stHeader"] {
    visibility: hidden; 
    height: 0 !important; 
    padding: 0 !important; 
    display: none !important; 
}

/* KRİTİK ÇÖZÜM AŞAMA 2: Streamlit'in Ana Kapsayıcı Üst Boşluğunu SİL */
/* Bu div, sayfanın en üstünde oluşan beyaz boşluğu hedefler. */
.stApp > div:first-child > div:first-child { 
    padding-top: 0px !important; 
    margin-top: 0px !important;
}

/* 1. ARKA PLAN */
.stApp {
    background-color: #f8f9fa;
    background-image: radial-gradient(#dee2e6 1px, transparent 1px);
    background-size: 20px 20px;
}

/* KRİTİK MOBİL/GENEL METİN GÖRÜNÜRLÜK FIXİ */
body, p, span, div, .stMarkdown, .stText, .stAlert > div > div:nth-child(2) > div {
    color: #31333F !important; 
}

/* 8. SABİT PUAN TABLOSU STİLİ (SADECE BU KISIM SABİT KALACAK) */
.fixed-scoreboard {
    position: fixed; /* Ekran pozisyonunu sabitle */
    top: 0; /* KRİTİK: Ekranın en üstü */
    left: 0; 
    right: 0; 
    z-index: 1000; /* En üstte olmasını garantiler */
    background-color: #f8f9fa; 
    padding: 10px 10px 0 10px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
    width: 100%; 
}

/* KRİTİK İÇERİK KAYDIRMA: Ana içeriği, sabitlenen panonun altına it */
.stApp > div:first-child > div:nth-child(2) {
    margin-top: 180px !important; /* Pano yüksekliği kadar boşluk bırak */
}


/* Diğer Stil Kodları */
h1 { color: #0d2b5b !important; text-shadow: 1px 1px 2px #b0b0b0; font-weight: 900 !important; font-family: 'Helvetica', sans-serif; }
[data-testid="stMetricLabel"] { color: #495057 !important; font-size: 1.1rem !important; font-weight: bold !important; }
[data-testid="stMetricValue"] { color: #dc3545 !important; font-size: 2.5rem !important; font-weight: 900 !important; }
.bilsem-header { text-align: center; color: #ffffff; font-weight: bold; font-size: 1.3rem; padding: 15px; margin-bottom: 20px; background: linear-gradient(90deg, #0d2b5b 0%, #dc3545 100%); border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-transform: uppercase; letter-spacing: 1px; }
.stButton>button { font-weight: bold; border-radius: 12px; border: 2px solid #0d2b5b; color: #0d2b5b; background-color: #ffffff; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.stButton>button:hover { background-color: #0d2b5b; color: white; border-color: #0d2b5b; transform: translateY(-2px); }
.hedef-sayi-kutusu { background-color: #ffffff; border: 4px solid #dc3545; padding: 10px; border-radius: 15px; text-align: center; box-shadow: 0 10px 20px rgba(220, 53, 69, 0.15); }
.streamlit-expanderHeader { font-weight: bold; color: #0d2b5b; font-size: 1.1rem; }
.cevap-form-container { border: 2px solid #0d2b5b; border-radius: 10px; padding: 10px; margin-top: 20px; } 

</style>
""", unsafe_allow_html=True)
# =============================================================================
# MATEMATİK FONKSİYONLARI VE VERİ YAPILARI
# =============================================================================
def is_tek(n):
    return n % 2 != 0

def is_tam_kare(n):
    return n >= 0 and int(math.isqrt(n))**2 == n

def is_tam_kup(n):
    return n >= 0 and round(n**(1/3))**3 == n

def is_asal(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_mukemmel(n):
    if n < 2:
        return False
    toplam = 1
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            toplam += i
            if i*i != n:
                toplam += n // i
    return toplam == n

def is_fibonacci(n):
    def is_sq(x):
        return int(math.isqrt(x))**2 == x
    # Lucas testi
    return is_sq(5*n*n + 4) or is_sq(5*n*n - 4)

def is_palindromik(n):
    return str(n) == str(n)[::-1]

def is_harshad(n):
    return n > 0 and n % sum(int(d) for d in str(n)) == 0

def is_ucgensel(n):
    return n >= 0 and is_tam_kare(8 * n + 1)

def is_iki_kuvveti(n):
    return n > 0 and (n & (n - 1)) == 0

def is_armstrong(n):
    s = str(n)
    return sum(int(d) ** len(s) for d in s) == n

def is_ramanujan(n):
    if n < 1729:
        return False
    ways = 0
    limit = int(n**(1/3)) + 1
    for a in range(1, limit):
        b3 = n - a**3
        if b3 <= a**3:
            break
        b = round(b3**(1/3))
        if b**3 == b3:
            ways += 1
    return ways >= 2

def is_yarim_asal(n):
    if n < 4:
        return False
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0 and is_asal(i) and is_asal(n // i):
            return True
    return False

def is_mersenne_asali(n):
    if n <= 1:
        return False
    p = math.log2(n + 1)
    return p.is_integer() and is_asal(int(p))

def is_fermat_sayisi(n):
    fermatlar = [3, 5, 17, 257, 65537]
    return n in fermatlar

# OYUN MODU ÖZELLİKLERİ
OZELLIKLER = [
    ("Sayı TEK mi yoksa ÇİFT mi?", is_tek, 5, 5, "TEK", "ÇİFT"),
    ("Sayı ASAL mı?", is_asal, 10, 10, "EVET", "HAYIR"),
    ("Sayı TAM KARE mi?", is_tam_kare, 15, 15, "EVET", "HAYIR"),
    ("Sayı TAM KÜP mü?", is_tam_kup, 20, 20, "EVET", "HAYIR"),
    ("Sayı MÜKEMMEL sayı mı?", is_mukemmel, 100, 100, "EVET", "HAYIR"),
    ("Sayı FIBONACCI dizisinde mi?", is_fibonacci, 75, 75, "EVET", "HAYIR"),
    ("Sayı PALİNDROMİK mi?", is_palindromik, 10, 10, "EVET", "HAYIR"),
    ("Sayı HARSHAD sayısı mı?", is_harshad, 25, 25, "EVET", "HAYIR"),
    ("Sayı ÜÇGENSEL sayı mı?", is_ucgensel, 20, 20, "EVET", "HAYIR"),
    ("Sayı 2'nin KUVVETİ mi?", is_iki_kuvveti, 10, 10, "EVET", "HAYIR"),
    ("Sayı ARMSTRONG sayısı mı?", is_armstrong, 80, 80, "EVET", "HAYIR"),
    ("Sayı YARIM ASAL mı?", is_yarim_asal, 50, 50, "EVET", "HAYIR"),
    ("Sayı MERSENNE ASALI mı?", is_mersenne_asali, 50, 50, "EVET", "HAYIR"),
    ("Sayı FERMAT SAYISI mı?", is_fermat_sayisi, 50, 50, "EVET", "HAYIR"),
]

RAMANUJAN_FUNCTIONS = [is_ramanujan]

# EZBER MODU VERİ SETİ
EZBER_FORMULLER = [
    # (Kategori, Soru, Doğru Cevap, Puan)
    ("Çarpım Tablosu", "7 x 9 = ...", "63", 5),
    ("Çarpım Tablosu", "12 x 12 = ...", "144", 5),
    ("Çarpım Tablosu", "8 x 7 = ...", "56", 5),
    ("Çarpım Tablosu", "11 x 6 = ...", "66", 5),
    ("Çarpım Tablosu", "13 x 5 = ...", "65", 5),
    # ÖZDEŞLİKLER (Temel Cebir)
    ("Özdeşlikler", "a² - b² = (a - b)(...)", "a+b", 30),
    ("Özdeşlikler", "x² - 16 = (x - 4)(...)", "x+4", 30),
    ("Özdeşlikler", "(x + 3)² = x² + 6x + ...", "9", 25),
    ("Özdeşlikler", "(2a - 5)² = 4a² - 20a + ...", "25", 25),
    ("Özdeşlikler", "a² + 2ab + b² = (...)", "(a+b)2", 30), # (a+b)^2
    # ÖZDEŞLİKLER (Küp ve Üç Terimli)
    ("Özdeşlikler (Küp)", "a³ + b³ = (a + b)(a² - ab + ...)", "b²", 80),
    ("Özdeşlikler (Küp)", "a³ - b³ = (a - b)(a² + ab + ...)", "b²", 80),
    ("Özdeşlikler (Küp)", "(a + b)³ = a³ + 3a²b + 3ab² + ...", "b³", 80),
    ("Özdeşlikler (Üç Terimli)", "(a+b+c)² = a²+b²+c²+2(ab+ac+...)", "bc", 90),
    # TRİGONOMETRİ (Temel)
    ("Trigonometri", "tanx = sinx / ...", "cosx", 40),
    ("Trigonometri", "cotx = ... / sinx", "cosx", 40),
    ("Trigonometri", "sin²x + cos²x = ...", "1", 50),
    ("Trigonometri", "secx = 1 / ...", "cosx", 40),
    ("Trigonometri", "cscx = 1 / ...", "sinx", 40),
    # TRİGONOMETRİ (Toplam/Fark ve Yarım Açı)
    ("Trigonometri", "sin(x + y) = sinx cosy + ...", "cosx siny", 50),
    ("Trigonometri", "cos(a + b) = cosa cosb - ...", "sina sinb", 50),
    ("Trigonometri", "sin(2x) = 2 sinx ...", "cosx", 70), # Yarım Açı Sinüs
    ("Trigonometri", "cos(2x) = cos²x - ...", "sin²x", 70), # Yarım Açı Kosinüs
    ("Trigonometri", "tan(x + y) = (tanx + tany) / (1 - ...)", "tanx tany", 60),
    # TRİGONOMETRİ (Dönüşüm)
    ("Trigonometri", "sin(90 - x) = ...", "cosx", 60),
    ("Trigonometri", "cos(270 + x) = ...", "sinx", 60),
]

# Tüm kategorilerin listesi
EZBER_KATEGORILER = sorted(list(set([f[0] for f in EZBER_FORMULLER])))

OVGULER = ["Harikasın! 🚀", "Matematik Dehası!🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# EZBER MODU LOGİĞİ VE CALLBACK'LERİ
# =============================================================================
def normalize_cevap(cevap):
    """Cevaptaki boşlukları kaldırır, tüm harfleri küçültür ve yaygın notasyonları düzeltir."""
    if not isinstance(cevap, str):
        cevap = str(cevap)
    # Boşlukları kaldır ve küçük harfe çevir
    normalized = cevap.replace(' ', '').lower()
    # Yaygın notasyon düzeltmeleri (^2 yerine 2 kabul etme, matematiksel sembolleri temizle)
    normalized = normalized.replace('^', '').replace('**', '').replace('*', '')
    # Parantezleri ve basit matematik işaretlerini temizle (sadece sade formül içeriği için)
    normalized = normalized.replace('(', '').replace(')', '').replace('+', '').replace('-', '').replace('/', '').replace('\\', '')
    # Yaygın hataları düzelt
    normalized = normalized.replace('sına', 'sina').replace('cosa', 'cosa') 
    return normalized

def sonraki_soru_ezber():
    """Ezber modunda bir sonraki soruya geçer."""
    formuller = st.session_state.ezber_filtreli_formuller
    yeni_index = st.session_state.ezber_soru_index + 1
    if yeni_index >= len(formuller):
        yeni_index = 0 # Başa dön
        st.toast("🎉 Seçilen Kategorideki Tüm Formülleri Tamamladın! Baştan Başlıyoruz.", icon="🥳")
    
    st.session_state.ezber_soru_index = yeni_index
    st.session_state.ezber_geribildirim = None
    # Input alanını temizlemeden önce değeri session state'ten sil.
    if 'cevap_girisi' in st.session_state:
        del st.session_state['cevap_girisi']
    st.rerun()

def kontrol_et_ezber(cevap_key):
    """Kullanıcının ezber formül cevabını kontrol eder."""
    if not st.session_state.ezber_filtreli_formuller:
        st.warning("Önce bir kategori seçmelisiniz!")
        return
    
    # Güvenli erişim
    kullanici_cevabi = st.session_state.get(cevap_key, "")
    soru_index = st.session_state.ezber_soru_index
    formuller = st.session_state.ezber_filtreli_formuller
    kategori, soru, dogru_cevap, puan = formuller[soru_index]

    # Cevapları normalize et ve karşılaştır
    normalized_kullanici = normalize_cevap(kullanici_cevabi)
    normalized_dogru = normalize_cevap(dogru_cevap)

    if normalized_kullanici == normalized_dogru:
        # Zaten doğru bildiyse tekrar puan verme
        if st.session_state.ezber_geribildirim != "dogru":
            st.session_state.ezber_puan += puan
            st.session_state.ezber_geribildirim = "dogru"
            st.toast(f"✅ Doğru! +{puan} Puan! Harika!", icon="🧠")
        else:
            st.toast("Zaten doğru bildiniz. Sonraki soruya geçin.", icon="👍")
    else:
        st.session_state.ezber_geribildirim = f"yanlis|Doğrusu: **{dogru_cevap}**" 
        st.toast("❌ Yanlış Cevap. Tekrar deneyin.", icon="🤔")

def sifirla_ezber_modu():
    """Ezber modunu sıfırlar ve kategori seçimine geri döner."""
    st.session_state.ezber_puan = 0
    st.session_state.ezber_soru_index = 0
    st.session_state.ezber_geribildirim = None
    st.session_state.ezber_kategori_secildi = None
    st.session_state.ezber_filtreli_formuller = []
    if 'cevap_girisi' in st.session_state:
        del st.session_state['cevap_girisi']
    
def kategori_sec(kategori):
    """Seçilen kategoriye göre formül listesini filtreler ve modu başlatır."""
    if kategori:
        # Seçimi yaptıktan sonra listeyi karıştır
        filtreli_formuller = [f for f in EZBER_FORMULLER if f[0] == kategori]
        random.shuffle(filtreli_formuller)

        st.session_state.ezber_filtreli_formuller = filtreli_formuller
        st.session_state.ezber_kategori_secildi = kategori
        st.session_state.ezber_soru_index = 0
        st.session_state.ezber_geribildirim = None
        if 'cevap_girisi' in st.session_state:
            del st.session_state['cevap_girisi']
        st.rerun()

# =============================================================================
# OYUN MODU LOGİĞİ VE CALLBACK'LERİ
# =============================================================================
def cevap_ver(index, buton_tipi):
    if not st.session_state.oyun_aktif:
        return

    soru_data = OZELLIKLER[index]
    func = soru_data[1]
    p_d = soru_data[2]
    p_y = soru_data[3]
    
    dogru_mu = func(st.session_state.hedef_sayi)
    kullanici_bildi_mi = False

    if buton_tipi == "sol":
        if dogru_mu:
            kullanici_bildi_mi = True
    elif buton_tipi == "sag":
        if not dogru_mu:
            kullanici_bildi_mi = True

    if kullanici_bildi_mi:
        st.session_state.sorular_cevaplandi[index] = "dogru"
        kazanc = p_d if buton_tipi == "sol" else p_y
        st.session_state.puan += kazanc
        st.toast(f"{random.choice(OVGULER)} +{kazanc} Puan", icon="✅")
    else:
        st.session_state.sorular_cevaplandi[index] = "yanlis"
        st.session_state.puan -= 5
        st.toast("Yanlış! -5 Puan", icon="❌")

def yeni_oyun_baslat():
    # Session state'ten ayarları güvenle çek
    mn = st.session_state.get('ayar_min', 1)
    mx = st.session_state.get('ayar_max', 5000) 
    sure = st.session_state.get('ayar_sure', 60)

    CHECK_FUNCTIONS = [is_asal, is_tam_kare, is_fibonacci, is_mukemmel, is_harshad, is_ucgensel, is_iki_kuvveti, is_armstrong]
    
    bulundu = False
    deneme = 0
    aday = 0
    
    while not bulundu and deneme < 200:
        if mx > 1000:
            min_val = min(100, mx) 
            aday = random.randint(min_val, mx)
        else:
            aday = random.randint(mn, mx)
        
        has_property = any(func(aday) for func in CHECK_FUNCTIONS)
        if has_property:
            bulundu = True
        else:
            deneme += 1

    if not bulundu:
        aday = random.randint(mn, mx)

    st.session_state.hedef_sayi = aday
    st.session_state.puan = 0
    st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
    simdi = time.time()
    st.session_state.baslangic_zamani = simdi
    st.session_state.bitis_zamani = simdi + sure
    
    st.session_state.oyun_suresi = sure 
    st.session_state.oyun_aktif = True

# =============================================================================
# ARAYÜZ VE SESSION STATE BAŞLATMA
# =============================================================================
st.sidebar.title("🧮 Menü")

secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "📚 Bilgi Köşesi", "🧠 Formula Sprint"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# =============================================================================
# GÜVENLİ ORTAK SESSION STATE BAŞLANGICI
# =============================================================================

INITIAL_STATE = {
    # Rekor
    'en_yuksek_puan': 0,
    
    # Ezber Modu
    'ezber_puan': 0,
    'ezber_soru_index': 0,
    'ezber_geribildirim': None,
    'ezber_kategori_secildi': None,
    'ezber_filtreli_formuller': [],
    
    # Oyun Modu Verileri
    'hedef_sayi': 0,
    'puan': 0,
    'sorular_cevaplandi': [None] * len(OZELLIKLER),
    'baslangic_zamani': 0,
    'bitis_zamani': 0,
    'oyun_aktif': False,
    
    # Ayarlar
    'ayar_min': 1,
    'ayar_max': 5000, 
    'ayar_sure': 60,
    'oyun_suresi': 60, 
    
    # Ek form değişkeni (Formula Sprint için)
}

# Başlatma döngüsü
for key, default_value in INITIAL_STATE.items():
    if key not in st.session_state:
        st.session_state[key] = default_value

# =============================================================================
# GÜVENLİ ORTAK SESSION STATE SONU
# =============================================================================

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)

    # --- SÜRE VE PUAN HESAPLAMA ---
    kalan_sure = 0
    progress_degeri = 0.0
    oyun_bitti_animasyonu = False

    if st.session_state.oyun_aktif:
        simdi = time.time()
        fark = st.session_state.bitis_zamani - simdi

        if fark <= 0:
            kalan_sure = 0
            # Oyun bitişini tetikle (Aşağıdaki döngüde bir kez daha tetiklenecek)
            if st.session_state.oyun_aktif:
                 st.session_state.oyun_aktif = False

            if st.session_state.puan > st.session_state.en_yuksek_puan:
                st.session_state.en_yuksek_puan = st.session_state.puan
                oyun_bitti_animasyonu = True
        else:
            kalan_sure = int(fark)
            
            total_sure = st.session_state.get('oyun_suresi', 60) 
            
            progress_degeri = fark / total_sure
            if progress_degeri < 0: progress_degeri = 0.0
            if progress_degeri > 1: progress_degeri = 1.0

    # --- SIDEBAR AYARLARI (HER ZAMAN GÖRÜNÜR) ---
    st.sidebar.subheader("⚙️ Ayarlar")
    # Anahtar isimleri değiştirildi: sidebar_ayar_min_input, vs.
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min, key='sidebar_ayar_min_input')
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max, key='sidebar_ayar_max_input') 
    
    sure_options = [60, 120, 180]
    default_index = sure_options.index(st.session_state.ayar_sure) if st.session_state.ayar_sure in sure_options else 0
    sure_secimi = st.sidebar.selectbox("Süre Seçin", sure_options, index=default_index, key='sidebar_ayar_sure_select')
    
    # Ayarları session state'e kaydet
    st.session_state.ayar_min = mn
    st.session_state.ayar_max = mx
    st.session_state.ayar_sure = sure_secimi

    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT (SIFIRLA)", use_container_width=True, key='sidebar_start_btn'):
        yeni_oyun_baslat()
        st.rerun()
    st.sidebar.markdown("---")
    # ---------------------------------------------------------------------

    if st.session_state.hedef_sayi != 0:
        # OYUN BAŞLADI / DEVAM EDİYOR

        # SABİT PANO KAPSAYICISI BAŞLANGICI
        # Pano Artık En Üstte Sabit (CSS sayesinde)
        st.markdown('<div class="fixed-scoreboard">', unsafe_allow_html=True)

        # SKOR PANOSU
        c1, c2, c3, c4 = st.columns([1, 1, 1, 1.5])
        c1.metric("PUAN", st.session_state.puan)
        
        with c2:
            st.markdown(f"""<div style="text-align: center;"><p style="margin:0; font-weight:bold; color:#495057;">REKOR</p><p style="margin:0; font-size: 2.5rem; font-weight:900; color: #d4af37; text-shadow: 1px 1px 1px black;">{st.session_state.en_yuksek_puan}</p></div>""", unsafe_allow_html=True)
        
        c3.metric("SÜRE", f"{kalan_sure} sn")
        
        with c4:
            st.markdown(f"""<div class="hedef-sayi-kutusu"><p style="color: #495057; font-weight: bold; margin:0; font-size: 0.9rem; text-transform: uppercase;">HEDEF SAYI</p><p style="color: #dc3545; font-weight: 900; font-size: 3rem; margin:0; line-height: 1;">{st.session_state.hedef_sayi}</p></div>""", unsafe_allow_html=True)
        
        # Progress bar
        st.progress(progress_degeri, text="Kalan Süre")

        # SABİT KAPSAYICINI KAPAT
        st.markdown('</div>', unsafe_allow_html=True)

        # OYUN BİTTİ EKRANI
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            if oyun_bitti_animasyonu:
                st.balloons()
                st.success(f"🏆 TEBRİKLER! YENİ REKOR KIRDINIZ: {st.session_state.puan} PUAN!")
            else:
                st.error("⏰ SÜRE DOLDU!")
            
            st.markdown("---")
            col_tekrar1, col_tekrar2, col_tekrar3 = st.columns([1, 2, 1])
            with col_tekrar2:
                if st.button("🔄 TEKRAR OYNA (YENİ SORU)", type="primary", use_container_width=True, key='tekrar_oyna_btn'):
                    yeni_oyun_baslat()
                    st.rerun()
            st.markdown("---")

        # SORU ALANI
        import streamlit as st
import math
import random
import time

# --- SAYFA AYARLARI ---
st.set_page_config(
    page_title="Master Class Matematik",
    page_icon="🎓",
    layout="wide"
)

# =============================================================================
# TASARIM: KRİTİK CSS ÇÖZÜMÜ (TÜM ÜST BOŞLUKLARI VE HEADER'I SİLME)
# =============================================================================
st.markdown("""
<style>
/* KRİTİK: Tarayıcı seviyesindeki üst boşlukları sıfırla */
html, body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
}

/* Menü ve Alt Bilgi Gizleme */
#MainMenu, footer {visibility: hidden;}

/* KRİTİK ÇÖZÜM AŞAMA 1: Streamlit'in SİYAH ÜST ÇUBUĞUNU (Header) SİL */
.stApp header, [data-testid="stHeader"] {
    visibility: hidden; 
    height: 0 !important; 
    padding: 0 !important; 
    display: none !important; 
}

/* KRİTİK ÇÖZÜM AŞAMA 2: Streamlit'in Ana Kapsayıcı Üst Boşluğunu SİL */
/* Bu div, sayfanın en üstünde oluşan beyaz boşluğu hedefler. */
.stApp > div:first-child > div:first-child { 
    padding-top: 0px !important; 
    margin-top: 0px !important;
}

/* 1. ARKA PLAN */
.stApp {
    background-color: #f8f9fa;
    background-image: radial-gradient(#dee2e6 1px, transparent 1px);
    background-size: 20px 20px;
}

/* KRİTİK MOBİL/GENEL METİN GÖRÜNÜRLÜK FIXİ */
body, p, span, div, .stMarkdown, .stText, .stAlert > div > div:nth-child(2) > div {
    color: #31333F !important; 
}

/* 8. SABİT PUAN TABLOSU STİLİ (SADECE BU KISIM SABİT KALACAK) */
.fixed-scoreboard {
    position: fixed; /* Ekran pozisyonunu sabitle */
    top: 0; /* KRİTİK: Ekranın en üstü */
    left: 0; 
    right: 0; 
    z-index: 1000; /* En üstte olmasını garantiler */
    background-color: #f8f9fa; 
    padding: 10px 10px 0 10px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
    width: 100%; 
}

/* KRİTİK İÇERİK KAYDIRMA: Ana içeriği, sabitlenen panonun altına it */
.stApp > div:first-child > div:nth-child(2) {
    margin-top: 180px !important; /* Pano yüksekliği kadar boşluk bırak */
}


/* Diğer Stil Kodları */
h1 { color: #0d2b5b !important; text-shadow: 1px 1px 2px #b0b0b0; font-weight: 900 !important; font-family: 'Helvetica', sans-serif; }
[data-testid="stMetricLabel"] { color: #495057 !important; font-size: 1.1rem !important; font-weight: bold !important; }
[data-testid="stMetricValue"] { color: #dc3545 !important; font-size: 2.5rem !important; font-weight: 900 !important; }
.bilsem-header { text-align: center; color: #ffffff; font-weight: bold; font-size: 1.3rem; padding: 15px; margin-bottom: 20px; background: linear-gradient(90deg, #0d2b5b 0%, #dc3545 100%); border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-transform: uppercase; letter-spacing: 1px; }
.stButton>button { font-weight: bold; border-radius: 12px; border: 2px solid #0d2b5b; color: #0d2b5b; background-color: #ffffff; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.stButton>button:hover { background-color: #0d2b5b; color: white; border-color: #0d2b5b; transform: translateY(-2px); }
.hedef-sayi-kutusu { background-color: #ffffff; border: 4px solid #dc3545; padding: 10px; border-radius: 15px; text-align: center; box-shadow: 0 10px 20px rgba(220, 53, 69, 0.15); }
.streamlit-expanderHeader { font-weight: bold; color: #0d2b5b; font-size: 1.1rem; }
.cevap-form-container { border: 2px solid #0d2b5b; border-radius: 10px; padding: 10px; margin-top: 20px; } 

</style>
""", unsafe_allow_html=True)

# =============================================================================
# MATEMATİK FONKSİYONLARI VE VERİ YAPILARI
# =============================================================================
def is_tek(n):
    return n % 2 != 0

def is_tam_kare(n):
    return n >= 0 and int(math.isqrt(n))**2 == n

def is_tam_kup(n):
    return n >= 0 and round(n**(1/3))**3 == n

def is_asal(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_mukemmel(n):
    if n < 2:
        return False
    toplam = 1
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            toplam += i
            if i*i != n:
                toplam += n // i
    return toplam == n

def is_fibonacci(n):
    def is_sq(x):
        return int(math.isqrt(x))**2 == x
    # Lucas testi
    return is_sq(5*n*n + 4) or is_sq(5*n*n - 4)

def is_palindromik(n):
    return str(n) == str(n)[::-1]

def is_harshad(n):
    return n > 0 and n % sum(int(d) for d in str(n)) == 0

def is_ucgensel(n):
    return n >= 0 and is_tam_kare(8 * n + 1)

def is_iki_kuvveti(n):
    return n > 0 and (n & (n - 1)) == 0

def is_armstrong(n):
    s = str(n)
    return sum(int(d) ** len(s) for d in s) == n

def is_ramanujan(n):
    if n < 1729:
        return False
    ways = 0
    limit = int(n**(1/3)) + 1
    for a in range(1, limit):
        b3 = n - a**3
        if b3 <= a**3:
            break
        b = round(b3**(1/3))
        if b**3 == b3:
            ways += 1
    return ways >= 2

def is_yarim_asal(n):
    if n < 4:
        return False
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0 and is_asal(i) and is_asal(n // i):
            return True
    return False

def is_mersenne_asali(n):
    if n <= 1:
        return False
    p = math.log2(n + 1)
    return p.is_integer() and is_asal(int(p))

def is_fermat_sayisi(n):
    fermatlar = [3, 5, 17, 257, 65537]
    return n in fermatlar

# OYUN MODU ÖZELLİKLERİ
OZELLIKLER = [
    ("Sayı TEK mi yoksa ÇİFT mi?", is_tek, 5, 5, "TEK", "ÇİFT"),
    ("Sayı ASAL mı?", is_asal, 10, 10, "EVET", "HAYIR"),
    ("Sayı TAM KARE mi?", is_tam_kare, 15, 15, "EVET", "HAYIR"),
    ("Sayı TAM KÜP mü?", is_tam_kup, 20, 20, "EVET", "HAYIR"),
    ("Sayı MÜKEMMEL sayı mı?", is_mukemmel, 100, 100, "EVET", "HAYIR"),
    ("Sayı FIBONACCI dizisinde mi?", is_fibonacci, 75, 75, "EVET", "HAYIR"),
    ("Sayı PALİNDROMİK mi?", is_palindromik, 10, 10, "EVET", "HAYIR"),
    ("Sayı HARSHAD sayısı mı?", is_harshad, 25, 25, "EVET", "HAYIR"),
    ("Sayı ÜÇGENSEL sayı mı?", is_ucgensel, 20, 20, "EVET", "HAYIR"),
    ("Sayı 2'nin KUVVETİ mi?", is_iki_kuvveti, 10, 10, "EVET", "HAYIR"),
    ("Sayı ARMSTRONG sayısı mı?", is_armstrong, 80, 80, "EVET", "HAYIR"),
    ("Sayı YARIM ASAL mı?", is_yarim_asal, 50, 50, "EVET", "HAYIR"),
    ("Sayı MERSENNE ASALI mı?", is_mersenne_asali, 50, 50, "EVET", "HAYIR"),
    ("Sayı FERMAT SAYISI mı?", is_fermat_sayisi, 50, 50, "EVET", "HAYIR"),
]

RAMANUJAN_FUNCTIONS = [is_ramanujan]

# EZBER MODU VERİ SETİ
EZBER_FORMULLER = [
    # (Kategori, Soru, Doğru Cevap, Puan)
    ("Çarpım Tablosu", "7 x 9 = ...", "63", 5),
    ("Çarpım Tablosu", "12 x 12 = ...", "144", 5),
    ("Çarpım Tablosu", "8 x 7 = ...", "56", 5),
    ("Çarpım Tablosu", "11 x 6 = ...", "66", 5),
    ("Çarpım Tablosu", "13 x 5 = ...", "65", 5),
    # ÖZDEŞLİKLER (Temel Cebir)
    ("Özdeşlikler", "a² - b² = (a - b)(...)", "a+b", 30),
    ("Özdeşlikler", "x² - 16 = (x - 4)(...)", "x+4", 30),
    ("Özdeşlikler", "(x + 3)² = x² + 6x + ...", "9", 25),
    ("Özdeşlikler", "(2a - 5)² = 4a² - 20a + ...", "25", 25),
    ("Özdeşlikler", "a² + 2ab + b² = (...)", "(a+b)2", 30), # (a+b)^2
    # ÖZDEŞLİKLER (Küp ve Üç Terimli)
    ("Özdeşlikler (Küp)", "a³ + b³ = (a + b)(a² - ab + ...)", "b²", 80),
    ("Özdeşlikler (Küp)", "a³ - b³ = (a - b)(a² + ab + ...)", "b²", 80),
    ("Özdeşlikler (Küp)", "(a + b)³ = a³ + 3a²b + 3ab² + ...", "b³", 80),
    ("Özdeşlikler (Üç Terimli)", "(a+b+c)² = a²+b²+c²+2(ab+ac+...)", "bc", 90),
    # TRİGONOMETRİ (Temel)
    ("Trigonometri", "tanx = sinx / ...", "cosx", 40),
    ("Trigonometri", "cotx = ... / sinx", "cosx", 40),
    ("Trigonometri", "sin²x + cos²x = ...", "1", 50),
    ("Trigonometri", "secx = 1 / ...", "cosx", 40),
    ("Trigonometri", "cscx = 1 / ...", "sinx", 40),
    # TRİGONOMETRİ (Toplam/Fark ve Yarım Açı)
    ("Trigonometri", "sin(x + y) = sinx cosy + ...", "cosx siny", 50),
    ("Trigonometri", "cos(a + b) = cosa cosb - ...", "sina sinb", 50),
    ("Trigonometri", "sin(2x) = 2 sinx ...", "cosx", 70), # Yarım Açı Sinüs
    ("Trigonometri", "cos(2x) = cos²x - ...", "sin²x", 70), # Yarım Açı Kosinüs
    ("Trigonometri", "tan(x + y) = (tanx + tany) / (1 - ...)", "tanx tany", 60),
    # TRİGONOMETRİ (Dönüşüm)
    ("Trigonometri", "sin(90 - x) = ...", "cosx", 60),
    ("Trigonometri", "cos(270 + x) = ...", "sinx", 60),
]

# Tüm kategorilerin listesi
EZBER_KATEGORILER = sorted(list(set([f[0] for f in EZBER_FORMULLER])))

OVGULER = ["Harikasın! 🚀", "Matematik Dehası!🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# EZBER MODU LOGİĞİ VE CALLBACK'LERİ
# =============================================================================
def normalize_cevap(cevap):
    """Cevaptaki boşlukları kaldırır, tüm harfleri küçültür ve yaygın notasyonları düzeltir."""
    if not isinstance(cevap, str):
        cevap = str(cevap)
    # Boşlukları kaldır ve küçük harfe çevir
    normalized = cevap.replace(' ', '').lower()
    # Yaygın notasyon düzeltmeleri (^2 yerine 2 kabul etme, matematiksel sembolleri temizle)
    normalized = normalized.replace('^', '').replace('**', '').replace('*', '')
    # Parantezleri ve basit matematik işaretlerini temizle (sadece sade formül içeriği için)
    normalized = normalized.replace('(', '').replace(')', '').replace('+', '').replace('-', '').replace('/', '').replace('\\', '')
    # Yaygın hataları düzelt
    normalized = normalized.replace('sına', 'sina').replace('cosa', 'cosa') 
    return normalized

def sonraki_soru_ezber():
    """Ezber modunda bir sonraki soruya geçer."""
    formuller = st.session_state.ezber_filtreli_formuller
    yeni_index = st.session_state.ezber_soru_index + 1
    if yeni_index >= len(formuller):
        yeni_index = 0 # Başa dön
        st.toast("🎉 Seçilen Kategorideki Tüm Formülleri Tamamladın! Baştan Başlıyoruz.", icon="🥳")
    
    st.session_state.ezber_soru_index = yeni_index
    st.session_state.ezber_geribildirim = None
    # Input alanını temizlemeden önce değeri session state'ten sil.
    if 'cevap_girisi' in st.session_state:
        del st.session_state['cevap_girisi']
    st.rerun()

def kontrol_et_ezber(cevap_key):
    """Kullanıcının ezber formül cevabını kontrol eder."""
    if not st.session_state.ezber_filtreli_formuller:
        st.warning("Önce bir kategori seçmelisiniz!")
        return
    
    # Güvenli erişim
    kullanici_cevabi = st.session_state.get(cevap_key, "")
    soru_index = st.session_state.ezber_soru_index
    formuller = st.session_state.ezber_filtreli_formuller
    kategori, soru, dogru_cevap, puan = formuller[soru_index]

    # Cevapları normalize et ve karşılaştır
    normalized_kullanici = normalize_cevap(kullanici_cevabi)
    normalized_dogru = normalize_cevap(dogru_cevap)

    if normalized_kullanici == normalized_dogru:
        # Zaten doğru bildiyse tekrar puan verme
        if st.session_state.ezber_geribildirim != "dogru":
            st.session_state.ezber_puan += puan
            st.session_state.ezber_geribildirim = "dogru"
            st.toast(f"✅ Doğru! +{puan} Puan! Harika!", icon="🧠")
        else:
            st.toast("Zaten doğru bildiniz. Sonraki soruya geçin.", icon="👍")
    else:
        st.session_state.ezber_geribildirim = f"yanlis|Doğrusu: **{dogru_cevap}**" 
        st.toast("❌ Yanlış Cevap. Tekrar deneyin.", icon="🤔")

def sifirla_ezber_modu():
    """Ezber modunu sıfırlar ve kategori seçimine geri döner."""
    st.session_state.ezber_puan = 0
    st.session_state.ezber_soru_index = 0
    st.session_state.ezber_geribildirim = None
    st.session_state.ezber_kategori_secildi = None
    st.session_state.ezber_filtreli_formuller = []
    if 'cevap_girisi' in st.session_state:
        del st.session_state['cevap_girisi']
    
def kategori_sec(kategori):
    """Seçilen kategoriye göre formül listesini filtreler ve modu başlatır."""
    if kategori:
        # Seçimi yaptıktan sonra listeyi karıştır
        filtreli_formuller = [f for f in EZBER_FORMULLER if f[0] == kategori]
        random.shuffle(filtreli_formuller)

        st.session_state.ezber_filtreli_formuller = filtreli_formuller
        st.session_state.ezber_kategori_secildi = kategori
        st.session_state.ezber_soru_index = 0
        st.session_state.ezber_geribildirim = None
        if 'cevap_girisi' in st.session_state:
            del st.session_state['cevap_girisi']
        st.rerun()

# =============================================================================
# OYUN MODU LOGİĞİ VE CALLBACK'LERİ
# =============================================================================
def cevap_ver(index, buton_tipi):
    if not st.session_state.oyun_aktif:
        return
    
    # Güvenlik kontrolü: İndeks geçerli mi?
    if index >= len(OZELLIKLER) or index >= len(st.session_state.sorular_cevaplandi):
        st.error(f"Hata: Geçersiz soru indeksi ({index})")
        return

    soru_data = OZELLIKLER[index]
    func = soru_data[1]
    p_d = soru_data[2]
    p_y = soru_data[3]
    
    dogru_mu = func(st.session_state.hedef_sayi)
    kullanici_bildi_mi = False

    if buton_tipi == "sol":
        if dogru_mu:
            kullanici_bildi_mi = True
    elif buton_tipi == "sag":
        if not dogru_mu:
            kullanici_bildi_mi = True

    if kullanici_bildi_mi:
        st.session_state.sorular_cevaplandi[index] = "dogru"
        kazanc = p_d if buton_tipi == "sol" else p_y
        st.session_state.puan += kazanc
        st.toast(f"{random.choice(OVGULER)} +{kazanc} Puan", icon="✅")
    else:
        st.session_state.sorular_cevaplandi[index] = "yanlis"
        st.session_state.puan -= 5
        st.toast("Yanlış! -5 Puan", icon="❌")

def yeni_oyun_baslat():
    # Session state'ten ayarları güvenle çek
    mn = st.session_state.get('ayar_min', 1)
    mx = st.session_state.get('ayar_max', 5000) 
    sure = st.session_state.get('ayar_sure', 60)

    CHECK_FUNCTIONS = [is_asal, is_tam_kare, is_fibonacci, is_mukemmel, is_harshad, is_ucgensel, is_iki_kuvveti, is_armstrong]
    
    bulundu = False
    deneme = 0
    aday = 0
    
    while not bulundu and deneme < 200:
        if mx > 1000:
            min_val = min(100, mx) 
            aday = random.randint(min_val, mx)
        else:
            aday = random.randint(mn, mx)
        
        has_property = any(func(aday) for func in CHECK_FUNCTIONS)
        if has_property:
            bulundu = True
        else:
            deneme += 1

    if not bulundu:
        aday = random.randint(mn, mx)

    st.session_state.hedef_sayi = aday
    st.session_state.puan = 0
    
    # KRİTİK: Sorular listesini tam olarak OZELLIKLER uzunluğunda başlat
    soru_sayisi = len(OZELLIKLER)
    st.session_state.sorular_cevaplandi = [None for _ in range(soru_sayisi)]
    
    simdi = time.time()
    st.session_state.baslangic_zamani = simdi
    st.session_state.bitis_zamani = simdi + sure
    
    st.session_state.oyun_suresi = sure 
    st.session_state.oyun_aktif = True
    
    # Debug için - Terminalde görmek için
    print(f"Oyun Başlatıldı - Hedef Sayı: {aday}, Toplam Soru: {soru_sayisi}")

# =============================================================================
# ARAYÜZ VE SESSION STATE BAŞLATMA
# =============================================================================
st.sidebar.title("🧮 Menü")

secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "📚 Bilgi Köşesi", "🧠 Formula Sprint"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# =============================================================================
# GÜVENLİ ORTAK SESSION STATE BAŞLANGICI
# =============================================================================

# Session state başlatma - Her bir değişkeni ayrı ayrı kontrol et
if 'en_yuksek_puan' not in st.session_state:
    st.session_state.en_yuksek_puan = 0

# Ezber Modu
if 'ezber_puan' not in st.session_state:
    st.session_state.ezber_puan = 0
if 'ezber_soru_index' not in st.session_state:
    st.session_state.ezber_soru_index = 0
if 'ezber_geribildirim' not in st.session_state:
    st.session_state.ezber_geribildirim = None
if 'ezber_kategori_secildi' not in st.session_state:
    st.session_state.ezber_kategori_secildi = None
if 'ezber_filtreli_formuller' not in st.session_state:
    st.session_state.ezber_filtreli_formuller = []

# Oyun Modu Verileri
if 'hedef_sayi' not in st.session_state:
    st.session_state.hedef_sayi = 0
if 'puan' not in st.session_state:
    st.session_state.puan = 0
if 'sorular_cevaplandi' not in st.session_state:
    st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
if 'baslangic_zamani' not in st.session_state:
    st.session_state.baslangic_zamani = 0
if 'bitis_zamani' not in st.session_state:
    st.session_state.bitis_zamani = 0
if 'oyun_aktif' not in st.session_state:
    st.session_state.oyun_aktif = False

# Ayarlar
if 'ayar_min' not in st.session_state:
    st.session_state.ayar_min = 1
if 'ayar_max' not in st.session_state:
    st.session_state.ayar_max = 5000
if 'ayar_sure' not in st.session_state:
    st.session_state.ayar_sure = 60
if 'oyun_suresi' not in st.session_state:
    st.session_state.oyun_suresi = 60

# =============================================================================
# GÜVENLİ ORTAK SESSION STATE SONU
# =============================================================================

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)

    # --- SÜRE VE PUAN HESAPLAMA ---
    kalan_sure = 0
    progress_degeri = 0.0
    oyun_bitti_animasyonu = False

    if st.session_state.oyun_aktif:
        simdi = time.time()
        fark = st.session_state.bitis_zamani - simdi

        if fark <= 0:
            kalan_sure = 0
            # Oyun bitişini tetikle (Aşağıdaki döngüde bir kez daha tetiklenecek)
            if st.session_state.oyun_aktif:
                 st.session_state.oyun_aktif = False

            if st.session_state.puan > st.session_state.en_yuksek_puan:
                st.session_state.en_yuksek_puan = st.session_state.puan
                oyun_bitti_animasyonu = True
        else:
            kalan_sure = int(fark)
            
            total_sure = st.session_state.get('oyun_suresi', 60) 
            
            progress_degeri = fark / total_sure
            if progress_degeri < 0: progress_degeri = 0.0
            if progress_degeri > 1: progress_degeri = 1.0

    # --- SIDEBAR AYARLARI (HER ZAMAN GÖRÜNÜR) ---
    st.sidebar.subheader("⚙️ Ayarlar")
    # Anahtar isimleri değiştirildi: sidebar_ayar_min_input, vs.
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min, key='sidebar_ayar_min_input')
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max, key='sidebar_ayar_max_input') 
    
    sure_options = [60, 120, 180]
    default_index = sure_options.index(st.session_state.ayar_sure) if st.session_state.ayar_sure in sure_options else 0
    sure
    # --- KARŞILAMA EKRANI (OYUN BAŞLAMAMIŞ) ---
    else:
        st.markdown("### Hazır mısın? Matematik Bilgini Test Etme Zamanı! 🧠")
        st.markdown("---")
        st.info("Oyun başlamadan önce sol menüden süre ve sayı aralığı ayarlarını kontrol edebilirsin.")
        
        col_start1, col_start2, col_start3 = st.columns([1, 2, 1])
        with col_start2:
            st.markdown("#### Ayarları yaptıysan başlayalım!")
            if st.button("🚀 OYUNU BAŞLAT", key="main_start_button", type="primary", use_container_width=True):
                yeni_oyun_baslat()
                st.rerun()

    # =========================================================================
    # KRİTİK EKLEME: SÜREKLİ GÜNCELLEME DÖNGÜSÜ
    # =========================================================================
    if st.session_state.oyun_aktif:
        fark = st.session_state.bitis_zamani - time.time()
        kalan_sure_kontrol = int(fark)

        if kalan_sure_kontrol > 0:
            # Saniyelik güncellemeyi garanti altına al
            time.sleep(0.1) 
            st.rerun() 
        else:
            # Süre dolduysa, oyunun bitiş ekranını tetikle.
            if st.session_state.oyun_aktif:
                st.session_state.oyun_aktif = False # Oyunu sonlandır
                st.rerun() # Bitiş ekranını göstermek için son kez yenile

# --- MOD 2: SAYI DEDEKTÖRÜ ---
elif secim == "🔍 Sayı Dedektörü":
    st.title("🔍 Master Class Dedektör")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.markdown("Merak ettiğiniz bir sayıyı girin, **yapay zeka** özelliklerini bulsun!")

    col1, col2 = st.columns([3, 1])
    with col1:
        val = st.number_input("Sayı Girin:", 0, 1000000, 0, 1, key='dedektor_input')
    with col2:
        st.write(""); st.write("")
        btn = st.button("🚀 ANALİZ ET", use_container_width=True, type="primary", key='analiz_et_btn')

    if btn and val > 0:
        st.divider()
        st.subheader(f"📊 **{val}** Analiz Raporu")
        
        c_sol, c_sag = st.columns(2)
        ozel = False
        d = "ÇİFT" if val % 2 == 0 else "TEK"
        c_sol.info(f"👉 Bu sayı bir **{d}** sayıdır.")
        idx = 0

        TUM_KONTROL_FONKSIYONLARI = OZELLIKLER + [("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR")]

        for ad, func, _, _, _, _ in TUM_KONTROL_FONKSIYONLARI:
            if "TEK" in ad: continue

            kisa_temiz = ad.replace("Sayı ", "").replace(" sayısı mı?", "")
            kisa_temiz = kisa_temiz.replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "")
            kisa_temiz = kisa_temiz.replace("?", "").replace("yoksa", "").strip()
            kisa_temiz = kisa_temiz.replace(" mı", "").replace(" mi", "").replace(" mu", "").replace(" mü", "").strip()

            if func(val):
                hedef = c_sol if idx % 2 == 0 else c_sag
                with hedef:
                    st.success(f"✅ **{kisa_temiz}**")
                    
                    if "FIBONACCI" in kisa_temiz:
                        with st.expander("Fibonacci Bilgisi"):
                            st.write("Altın oranın temeli olan Fibonacci dizisindedir.")
                    if "RAMANUJAN" in kisa_temiz:
                        st.info("Bu sayı çok özeldir! İlk üç Ramanujan sayısı: **1729**, **4104**, **13832**'dir. (İki küp toplamı olarak iki farklı şekilde yazılabilir.)")
                
                if "PALİNDROMİK" not in kisa_temiz or val > 10:
                    ozel = True
                idx += 1

        st.divider()
        if ozel:
            st.balloons()
            st.success("🌟 SONUÇ: **MASTER CLASS** (Özel) bir sayı! 🌟")
        else:
            st.warning("💡 SONUÇ: Sıradan bir sayı.")

# --- MOD 3: BİLGİ KÖŞESİ ---
elif secim == "📚 Bilgi Köşesi":
    st.title("📚 Master Class Bilgi Bankası")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.info("Bu bölümde oyunda geçen özel sayı türleri ve önemli matematiksel kavramlar hakkında kısa ve anlaşılır bilgiler bulabilirsin.")

    with st.expander("✨ MÜKEMMEL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Kendisi hariç pozitif bölenlerinin toplamı, kendisine eşit olan sayıya denir.
        **Örnek: 6**
        * 6'nın bölenleri: 1, 2, 3, 6
        * Kendisi hariç toplayalım: **$1 + 2 + 3 = 6$**
        * Sonuç kendisine eşit olduğu için 6 **Mükemmel Sayıdır**.
        *Diğer Mükemmel Sayılar: 28, 496, 8128...*
        """)

    with st.expander("🌀 FIBONACCI SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Her sayının, kendinden önceki iki sayının toplamı olduğu sayı dizisidir. Doğadaki "**Altın Oran**" ile ilişkilidir.
        **Dizi:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
        **Örnek: 13**
        * $5 + 8 = 13$ (Kendinden önceki iki sayının toplamı)
        * Bu yüzden 13 bir **Fibonacci sayısıdır**.
        """)

    with st.expander("🔁 PALİNDROMİK SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Baştan sona ve sondan başa okunuşu aynı olan sayılardır.
        **Örnekler:**
        * **121** (Sağdan ve soldan okunuşu aynı)
        * **34543**
        """)
        
    with st.expander("⭐ ASAL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** 1'den büyük, 1 ve kendisinden başka pozitif tam böleni olmayan doğal sayılardır.
        **Örnekler:** 2, 3, 5, 7, 11, 13, 17...
        """)

    with st.expander("🔺 ÜÇGENSEL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Ardışık doğal sayıların toplamı olarak elde edilen sayılardır. (Üçgen şeklinde noktalarla gösterilebilir.)
        **Örnekler:**
        * 1 = 1
        * 3 = 1 + 2
        * 6 = 1 + 2 + 3
        * 10 = 1 + 2 + 3 + 4
        """)
        
    with st.expander("🧠 RAMANUJAN SAYISI (Taxi-cab) Nedir?"):
        st.markdown("""
        **Tanım:** İki farklı pozitif tam sayının küplerinin toplamı şeklinde yazılabilen en küçük sayı 1729'dur. Bu sayılar Hindistanlı dahi matematikçi S. Ramanujan'a atfedilmiştir.
        **Örnek:**
        * **$1729 = 1^3 + 12^3$**
        * **$1729 = 9^3 + 10^3$**
        """)
    with st.expander("🔗 YARIM ASAL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Yarım asal sayılar, iki asal sayının çarpımı şeklinde yazılabilen pozitif tam sayılardır.  
        Yani ya bir asalın karesi, ya da iki farklı asalın çarpımıdır.

        **Örnekler:**  
        * 4 = 2 × 2  
        * 6 = 2 × 3  
        * 9 = 3 × 3  
        * 15 = 3 × 5  
        * 21 = 3 × 7  

        🔎 Kriptografi (RSA algoritması) gibi alanlarda çok önemli bir rol oynarlar.
        """)

    with st.expander("⚡ MERSENNE ASALI Nedir?"):
        st.markdown("""
        **Tanım:** Mersenne asalları, Mₙ = 2ⁿ - 1 formundaki özel asal sayılardır.
        n asal olduğunda bazen 2ⁿ - 1 de asal çıkar.

        **Üstlü Gösterim ile Örnekler:**  
        * n = 2 → 2² - 1 = **3**  
        * n = 3 → 2³ - 1 = **7**  
        * n = 5 → 2⁵ - 1 = **31**  
        * n = 7 → 2⁷ - 1 = **127**  
        * n = 13 → 2¹³ - 1 = **8191**
       
        **Not:** Her asal n icin 2ⁿ - 1 asal cikmaz.  
        Ornegin n = 11 → 2¹¹ - 1 = 2047 (bilesik, 23 x 89).

        **Ilginc Bilgi:**  
        Su ana kadar hesaplanan en buyuk Mersenne asali:  
        **2¹³⁶²⁷⁹⁸⁴¹ - 1**  
        Bu sayi tam **41,024,320 basamak** uzunlugundadir ve 2018'de GIMPS projesi tarafindan bulunmustur.
        """)

    with st.expander("📐 FERMAT SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Fermat sayıları özel bir formülle tanımlanır:  
        Fₙ = 2^(2^n) + 1

        **Örnekler:**  
        * F₀ = 2¹ + 1 = 3  
        * F₁ = 2² + 1 = 5  
        * F₂ = 2⁴ + 1 = 17  
        * F₃ = 2⁸ + 1 = 257  
        * F₄ = 2¹⁶ + 1 = 65537  

        Açıklama: "2 üzeri 2^n artı 1" şeklinde tanımlanır.
        """)
    
    
    st.markdown("---") # Bilgi Köşesi sonu
    

# --- MOD 4: FORMULA SPRINT (EZBER MODU) ---
elif secim == "🧠 Formula Sprint":
    st.title("🧠 Formula Sprint: Hızlı Tekrar")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.subheader("📚 Matematik Formüllerini ve Bilgilerini Hızla Ezberle!")
    
    st.sidebar.markdown("---")
    if st.sidebar.button("🔄 Sprint Modunu Sıfırla", use_container_width=True, key='sprint_sifirla_btn'):
        sifirla_ezber_modu()
        st.rerun()

    # Sprint Puan Paneli
    st.metric("SPRINT PUANI", st.session_state.ezber_puan)
    st.markdown("---")
    
    kategori_adi = st.session_state.ezber_kategori_secildi

    if kategori_adi:
        # KATEGORİ SEÇİLDİ, OYUN BAŞLADI
        
        formuller = st.session_state.ezber_filtreli_formuller
        index = st.session_state.ezber_soru_index
        
        if not formuller:
            st.error("Hata: Seçilen kategoriye ait formül bulunamadı. Lütfen başka bir kategori seçin.")
            if st.button("Başka Bir Kategori Seç", key='hata_kategori_btn'):
                st.session_state.ezber_kategori_secildi = None
                st.rerun()
        else:
            kategori, soru, dogru_cevap, puan = formuller[index]

            st.markdown(f"### Kategori: **{kategori}** <span style='font-size: 0.9em; color: #dc3545;'>({index + 1}/{len(formuller)})</span>", unsafe_allow_html=True)
            st.markdown(f"## Soru: **{soru}**")
            st.markdown(f"**Puan Değeri:** +{puan} Puan")
            
            st.markdown('<div class="cevap-form-container">', unsafe_allow_html=True)
            
            # Cevap Giriş Formu
            with st.form(key='ezber_cevap_form'):
                # Cevap girisi anahtarı, formu her sıfırladığımızda temizlenmeli
                cevap_key = 'cevap_girisi'
                
                st.text_input(
                    "Cevabın Nedir? (Sadece eksik kısmı yaz!)", 
                    # Key'i dinamik olarak belirlemek yerine sabit tutuyoruz
                    key=cevap_key, 
                    placeholder="Örn: a+b veya 63 (Sadece cevabı yazın...)",
                    # on_change, butona basılmadan da anlık kontrolü dener (Form'da önerilmez, form submit kullanacağız)
                    label_visibility="hidden"
                )
                
                # Geribildirim ve Butonlar
                col_geribildirim, col_kontrol, col_sonraki = st.columns([2, 1, 1])
                
                # Geribildirim Mesajı
                geribildirim = st.session_state.ezber_geribildirim
                if geribildirim and 'yanlis' in geribildirim:
                    mesaj = geribildirim.split('|')[1]
                    col_geribildirim.error(f"❌ {mesaj}", icon="💡")
                elif geribildirim == 'dogru':
                    col_geribildirim.success(f"✅ BİLİNDİ! Devam edebilirsin.", icon="👍")
                else:
                    col_geribildirim.info("Cevabını yazdıktan sonra **KONTROL ET** butonuna bas!")
                
                # Kontrol Et Butonu
                col_kontrol.form_submit_button(
                    "KONTROL ET", 
                    type="primary", 
                    use_container_width=True,
                    on_click=kontrol_et_ezber,
                    args=(cevap_key,) 
                )

                # Sonraki Soru Butonu
                col_sonraki.form_submit_button(
                    "SONRAKİ SORU >>", 
                    use_container_width=True,
                    on_click=sonraki_soru_ezber
                )

            st.markdown('</div>', unsafe_allow_html=True)


    else:
        # KATEGORİ SEÇİM EKRANI
        st.markdown("### 🎯 Hangi Matematik Alanında Hızlanmak İstersin?")
        st.warning("Lütfen pratik yapmak istediğiniz kategoriye tıklayın.")
        
        # Kategorileri kartlar/butonlar halinde göster
        cols_per_row = 3
        rows = [EZBER_KATEGORILER[i:i + cols_per_row] for i in range(0, len(EZBER_KATEGORILER), cols_per_row)]

        for row in rows:
            cols = st.columns(len(row))
            for i, kategori in enumerate(row):
                cols[i].button(
                    f"📚 {kategori}",
                    key=f"kategori_btn_{kategori}",
                    on_click=kategori_sec,
                    args=(kategori,),
                    use_container_width=True
                )


