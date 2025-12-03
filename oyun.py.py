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
# TASARIM: MOBİL UYUMLU CSS DÜZELTMELERİ
# =============================================================================
st.markdown("""
    <style>
    /* Menü ve Alt Bilgi Gizleme */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* 1. ARKA PLAN */
    .stApp {
        background-color: #f8f9fa;
        background-image: radial-gradient(#dee2e6 1px, transparent 1px);
        background-size: 20px 20px;
    }
    
    /* 2. ANA BAŞLIK */
    h1 {
        color: #0d2b5b !important;
        text-shadow: 1px 1px 2px #b0b0b0;
        font-weight: 900 !important;
        font-family: 'Helvetica', sans-serif;
    }

    /* KRİTİK MOBİL/GENEL METİN GÖRÜNÜRLÜK FIXİ */
    body, p, span, div, .stMarkdown, .stText, .stAlert > div > div:nth-child(2) > div {
        color: #31333F !important; /* Koyu gri/siyah metin rengini zorla */
    }
    
    /* 3. SKOR TABLOSU YAZILARI */
    [data-testid="stMetricLabel"] {
        color: #495057 !important;
        font-size: 1.1rem !important;
        font-weight: bold !important;
    }
    [data-testid="stMetricValue"] {
        color: #dc3545 !important;
        font-size: 2.5rem !important;
        font-weight: 900 !important;
    }
    
    /* 4. KURUM İSMİ KUTUSU */
    .bilsem-header {
        text-align: center;
        color: #ffffff; 
        font-weight: bold;
        font-size: 1.3rem;
        padding: 15px;
        margin-bottom: 20px;
        background: linear-gradient(90deg, #0d2b5b 0%, #dc3545 100%);
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    /* 5. BUTONLAR */
    .stButton>button {
        font-weight: bold;
        border-radius: 12px;
        border: 2px solid #0d2b5b;
        color: #0d2b5b;
        background-color: #ffffff;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stButton>button:hover {
        background-color: #0d2b5b;
        color: white;
        border-color: #0d2b5b;
        transform: translateY(-2px);
    }
    
    /* 6. HEDEF SAYI KUTUSU */
    .hedef-sayi-kutusu {
        background-color: #ffffff;
        border: 4px solid #dc3545;
        padding: 10px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 20px rgba(220, 53, 69, 0.15);
    }
    
    /* 7. BİLGİ KARTLARI STİLİ */
    .streamlit-expanderHeader {
        font-weight: bold;
        color: #0d2b5b;
        font-size: 1.1rem;
    }
    </style>
    """, unsafe_allow_html=True)

# =============================================================================
# MATEMATİK FONKSİYONLARI VE VERİ YAPILARI
# =============================================================================
def is_tek(n): return n % 2 != 0
def is_tam_kare(n): return n >= 0 and int(math.isqrt(n))**2 == n
def is_tam_kup(n): return n >= 0 and round(n**(1/3))**3 == n
def is_asal(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0: return False
    return True
def is_mukemmel(n):
    if n < 2: return False
    toplam = 1
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            toplam += i
            if i*i != n: toplam += n // i
    return toplam == n
def is_fibonacci(n):
    def is_sq(x): return int(math.isqrt(x))**2 == x
    return is_sq(5*n*n + 4) or is_sq(5*n*n - 4)
def is_palindromik(n): return str(n) == str(n)[::-1]
def is_harshad(n): return n > 0 and n % sum(int(d) for d in str(n)) == 0
def is_ucgensel(n): return n >= 0 and is_tam_kare(8 * n + 1)
def is_iki_kuvveti(n): return n > 0 and (n & (n - 1)) == 0
def is_armstrong(n): 
    s = str(n)
    return sum(int(d) ** len(s) for d in s) == n
def is_ramanujan(n):
    if n < 1729: return False 
    ways = 0
    limit = int(n**(1/3)) + 1
    for a in range(1, limit):
        b3 = n - a**3
        if b3 <= a**3: break
        b = round(b3**(1/3))
        if b**3 == b3: ways += 1
    return ways >= 2
def is_yarim_asal(n):
    # Yarım asal (semiprime) → tam iki asalın çarpımı (aynı olabilir)
    if n < 4: 
        return False
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0 and is_asal(i) and is_asal(n // i):
            return True
    return False

def is_mersenne_asali(n):
    # Mersenne asalı = 2^p - 1 ve kendisi asal
    if n <= 1:
        return False
    p = math.log2(n + 1)
    return p.is_integer() and is_asal(n)

def is_fermat_sayisi(n):
    # Fermat sayıları = 2^(2^k) + 1 (k = 0,1,2,3,4)
    fermatlar = [3, 5, 17, 257, 65537]
    return n in fermatlar

# OYUN MODU ÖZELLİKLERİ (Ramanujan çıkarıldı)
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
# Ramanujan sayılarını analiz kısmında kullanmak için ayrı tutuyoruz
RAMANUJAN_FUNCTIONS = [is_ramanujan]


# YENİ EZBER MODU VERİ SETİ (Zenginleştirildi)
EZBER_FORMULLER = [
    # (Kategori, Soru, Doğru Cevap, Puan)
    
    # ÇARPIM TABLOSU (Basit Hafıza)
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
    ("Özdeşlikler", "a² + 2ab + b² = (...)", "a+b)2", 30), # (a+b)^2

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

# Tüm kategorilerin listesi (Set yapısı ile benzersiz kategori isimleri alınır)
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
    
    return normalized

def sonraki_soru_ezber():
    """Ezber modunda bir sonraki soruya geçer."""
    # Mevcut filtreli soru listesini al
    formuller = st.session_state.ezber_filtreli_formuller
    
    yeni_index = st.session_state.ezber_soru_index + 1
    if yeni_index >= len(formuller):
        yeni_index = 0 # Başa dön
        st.toast("🎉 Seçilen Kategorideki Tüm Formülleri Tamamladın! Baştan Başlıyoruz.", icon="🥳")

    st.session_state.ezber_soru_index = yeni_index
    st.session_state.ezber_geribildirim = None
    st.session_state.cevap_girisi = "" # Input alanını temizle
    st.rerun()

def kontrol_et_ezber(cevap_key):
    """Kullanıcının ezber formül cevabını kontrol eder."""
    
    if not st.session_state.ezber_filtreli_formuller:
        st.warning("Önce bir kategori seçmelisiniz!")
        return
        
    kullanici_cevabi = st.session_state[cevap_key]
    soru_index = st.session_state.ezber_soru_index
    
    formuller = st.session_state.ezber_filtreli_formuller
    kategori, soru, dogru_cevap, puan = formuller[soru_index]
    
    # Cevapları normalize et ve karşılaştır
    normalized_kullanici = normalize_cevap(kullanici_cevabi)
    normalized_dogru = normalize_cevap(dogru_cevap)
    
    if normalized_kullanici == normalized_dogru:
        if st.session_state.ezber_geribildirim != "dogru":
            st.session_state.ezber_puan += puan
            st.session_state.ezber_geribildirim = "dogru"
            st.toast(f"✅ Doğru! +{puan} Puan! Harika!", icon="🧠")
        else:
            st.toast("Zaten doğru bildiniz. Sonraki soruya geçin.", icon="👍")
    else:
        st.session_state.ezber_geribildirim = f"yanlis | Doğrusu: {dogru_cevap}"
        st.toast("❌ Yanlış Cevap. Tekrar deneyin.", icon="🤔")
        
def sifirla_ezber_modu():
    """Ezber modunu sıfırlar ve kategori seçimine geri döner."""
    st.session_state.ezber_puan = 0
    st.session_state.ezber_soru_index = 0
    st.session_state.ezber_geribildirim = None
    st.session_state.ezber_kategori_secildi = None
    st.session_state.ezber_filtreli_formuller = []
    st.session_state.cevap_girisi = ""

def kategori_sec(kategori):
    """Seçilen kategoriye göre formül listesini filtreler ve modu başlatır."""
    if kategori:
        st.session_state.ezber_filtreli_formuller = [f for f in EZBER_FORMULLER if f[0] == kategori]
        st.session_state.ezber_kategori_secildi = kategori
        st.session_state.ezber_soru_index = 0
        st.session_state.ezber_geribildirim = None
        st.session_state.cevap_girisi = ""
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
        if dogru_mu: kullanici_bildi_mi = True
    elif buton_tipi == "sag":
        if not dogru_mu: kullanici_bildi_mi = True
            
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
    mn = st.session_state.get('ayar_min', 1)
    mx = st.session_state.get('ayar_max', 5000) # Varsayılan Max 5000
    sure = st.session_state.get('ayar_sure', 60)
    
    # Oyun Modu için kontrol edilecek fonksiyonlar (Ramanujan hariç)
    CHECK_FUNCTIONS = [is_asal, is_tam_kare, is_fibonacci, is_mukemmel, is_harshad, is_ucgensel, is_iki_kuvveti, is_armstrong]
    
    bulundu = False; deneme = 0; aday = 0
    while not bulundu and deneme < 200:
        
        # Sayı aralığı geniş olduğu için, küçük asal sayı biasını azaltmak için üst aralığı tercih et
        if mx > 1000:
            min_val = min(100, mx) # En az 100'den başla, max'tan küçük olsun
            aday = random.randint(min_val, mx)
        else:
            aday = random.randint(mn, mx)

        # Sayının herhangi bir özel özelliği var mı kontrol et
        has_property = any(func(aday) for func in CHECK_FUNCTIONS)

        if has_property: 
            bulundu = True
        else: 
            deneme += 1
            
    # Eğer 200 denemeden sonra bile özel sayılı bir sayı bulunamazsa, rastgele bir sayı ile devam et (fail-safe)
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
# ARAYÜZ
# =============================================================================

st.sidebar.title("🧮 Menü")
# YENİ MOD ADI: FORMULA SPRİNT
secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "📚 Bilgi Köşesi", "🧠 Formula Sprint"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# --- ORTAK SESSION STATE BAŞLANGICI ---
if 'en_yuksek_puan' not in st.session_state: st.session_state.en_yuksek_puan = 0
if 'ezber_puan' not in st.session_state: st.session_state.ezber_puan = 0
if 'ezber_soru_index' not in st.session_state: st.session_state.ezber_soru_index = 0
if 'ezber_geribildirim' not in st.session_state: st.session_state.ezber_geribildirim = None
if 'ezber_kategori_secildi' not in st.session_state: st.session_state.ezber_kategori_secildi = None
if 'ezber_filtreli_formuller' not in st.session_state: st.session_state.ezber_filtreli_formuller = []
# Diğer oyun state'leri:
if 'hedef_sayi' not in st.session_state:
    st.session_state.hedef_sayi = 0
    st.session_state.puan = 0
    st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
    st.session_state.baslangic_zamani = 0
    st.session_state.bitis_zamani = 0
    st.session_state.oyun_suresi = 60
    st.session_state.oyun_aktif = False
    st.session_state.ayar_min = 1
    st.session_state.ayar_max = 5000 # Default max 5000 olarak güncellendi
    st.session_state.ayar_sure = 60
# --- ORTAK SESSION STATE SONU ---


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
            st.session_state.oyun_aktif = False
            if st.session_state.puan > st.session_state.en_yuksek_puan:
                st.session_state.en_yuksek_puan = st.session_state.puan
                oyun_bitti_animasyonu = True 
        else:
            kalan_sure = int(fark)
            total_sure = st.session_state.bitis_zamani - st.session_state.baslangic_zamani
            progress_degeri = fark / total_sure
            if progress_degeri < 0: progress_degeri = 0.0
            if progress_degeri > 1: progress_degeri = 1.0

    # --- SIDEBAR AYARLARI (HER ZAMAN GÖRÜNÜR) ---
    st.sidebar.subheader("⚙️ Ayarlar")
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min)
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max) # Max limit 10000 yapıldı
    sure_secimi = st.sidebar.selectbox("Süre Seçin", [60, 120, 180], index=[60, 120, 180].index(st.session_state.ayar_sure))
    
    # Ayarları session state'e kaydet
    st.session_state.ayar_min = mn
    st.session_state.ayar_max = mx
    st.session_state.ayar_sure = sure_secimi
    
    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT (SIFIRLA)", use_container_width=True):
        yeni_oyun_baslat()
        st.rerun()

    st.markdown("---")
    # ---------------------------------------------------------------------

    if st.session_state.hedef_sayi != 0:
        # OYUN BAŞLADI / DEVAM EDİYOR

        # SKOR PANOSU
        c1, c2, c3, c4 = st.columns([1, 1, 1, 1.5])
        c1.metric("PUAN", st.session_state.puan)
        with c2:
            st.markdown(f"""<div style="text-align: center;"><p style="margin:0; font-weight:bold; color:#495057;">REKOR</p><p style="margin:0; font-size: 2.5rem; font-weight:900; color: #d4af37; text-shadow: 1px 1px 1px black;">{st.session_state.en_yuksek_puan}</p></div>""", unsafe_allow_html=True)
        c3.metric("SÜRE", f"{kalan_sure} sn")
        with c4:
            st.markdown(f"""<div class="hedef-sayi-kutusu"><p style="color: #495057; font-weight: bold; margin:0; font-size: 0.9rem; text-transform: uppercase;">HEDEF SAYI</p><p style="color: #dc3545; font-weight: 900; font-size: 3rem; margin:0; line-height: 1;">{st.session_state.hedef_sayi}</p></div>""", unsafe_allow_html=True)

        # Progress bar (Kullanıcı etkileşimiyle güncellenir)
        st.progress(progress_degeri, text="Kalan Süre")

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
                if st.button("🔄 TEKRAR OYNA (YENİ SORU)", type="primary", use_container_width=True):
                    yeni_oyun_baslat()
                    st.rerun()
            st.markdown("---")

        # SORU ALANI
        for i, (soru, func, p_d, p_y, sol_txt, sag_txt) in enumerate(OZELLIKLER):
            durum = st.session_state.sorular_cevaplandi[i]
            if durum is None:
                with st.container():
                    # MOBİL UYUMLULUK İÇİN SORUYU TEK BİR WİDGET'TA TUTUYORUZ
                    st.write(f"**{soru}** <span style='color:#6c757d; font-size:0.9em;'>(D: {p_d}p / Y: {p_y}p)</span>", unsafe_allow_html=True)
                    
                    # Butonları ayırmak için 2 sütun kullanıyoruz
                    col_btn1, col_btn2 = st.columns(2)
                    buton_aktif = st.session_state.oyun_aktif
                    col_btn1.button(sol_txt, key=f"btn_sol_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sol"))
                    col_btn2.button(sag_txt, key=f"btn_sag_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sag"))
            else:
                # CEVAP GÖRÜNÜMÜ
                dogru_mu = func(st.session_state.hedef_sayi)
                kavram = soru.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("yoksa", "").strip()
                gercek_cevap_metni = ("TEK" if dogru_mu else "ÇİFT") if "TEK" in soru else (f"EVET ({kavram})" if dogru_mu else f"HAYIR ({kavram} DEĞİL)")
                if durum == "dogru": st.success(f"✅ DOĞRU! -> **{gercek_cevap_metni}**")
                else: st.error(f"❌ YANLIŞ! Doğrusu -> **{gercek_cevap_metni}**")
    
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

# --- MOD 2: SAYI DEDEKTÖRÜ ---
elif secim == "🔍 Sayı Dedektörü":
    st.title("🔍 Master Class Dedektör")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.markdown("Merak ettiğiniz bir sayıyı girin, **yapay zeka** özelliklerini bulsun!")

    col1, col2 = st.columns([3, 1])
    with col1: val = st.number_input("Sayı Girin:", 0, 1000000, 0, 1)
    with col2:
        st.write(""); st.write("") 
        btn = st.button("🚀 ANALİZ ET", use_container_width=True, type="primary")

    if btn and val > 0:
        st.divider()
        st.subheader(f"📊 {val} Analiz Raporu")
        c_sol, c_sag = st.columns(2)
        ozel = False
        d = "ÇİFT" if val % 2 == 0 else "TEK"
        c_sol.info(f"👉 Bu sayı bir **{d}** sayıdır.")
        idx = 0
        
        # OZELLIKLER ve RAMANUJAN_FUNCTIONS listelerini birleştirerek tüm kontrol fonksiyonlarını tanımla
        TUM_KONTROL_FONKSIYONLARI = OZELLIKLER + [("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR")]
        
        for ad, func, _, _, _, _ in TUM_KONTROL_FONKSIYONLARI:
            if "TEK" in ad: continue
            
            # KISA ADI TEMİZLEME
            kisa_temiz = ad.replace("Sayı ", "").replace(" sayısı mı?", "")
            kisa_temiz = kisa_temiz.replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "")
            kisa_temiz = kisa_temiz.replace("?", "").replace("yoksa", "").strip()
            kisa_temiz = kisa_temiz.replace(" mı", "").replace(" mi", "").replace(" mu", "").replace(" mü", "").strip() # Soru eklerini temizle

            if func(val):
                hedef = c_sol if idx % 2 == 0 else c_sag
                with hedef:
                    st.success(f"✅ **{kisa_temiz}**") 
                    
                    if "FIBONACCI" in kisa_temiz:
                        with st.expander("Fibonacci Bilgisi"):
                            st.write("Altın oranın temeli olan Fibonacci dizisindedir.")
                            st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png", caption="Fibonacci Sarmalı")
                            
                    if "RAMANUJAN" in kisa_temiz:
                         st.info("Bu sayı çok özeldir! İlk üç Ramanujan sayısı: **1729**, **4104**, **13832**'dir. (İki küp toplamı olarak iki farklı şekilde yazılabilir.)")

                if "PALİNDROMİK" not in kisa_temiz or val > 10: ozel = True
            idx += 1
        st.divider()
        if ozel:
            st.balloons()
            st.success("🌟 SONUÇ: **MASTER CLASS** (Özel) bir sayı! 🌟")
        else: st.warning("💡 SONUÇ: Sıradan bir sayı.")

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
        * Kendisi hariç toplayalım: **1 + 2 + 3 = 6**
        * Sonuç kendisine eşit olduğu için 6 **Mükemmel Sayıdır**.
        
        *Diğer Mükemmel Sayılar: 28, 496, 8128...*
        """)
        
    with st.expander("🌀 FIBONACCI SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Her sayının, kendinden önceki iki sayının toplamı olduğu sayı dizisidir. Doğadaki "**Altın Oran**" ile ilişkilidir.
        
        **Dizi:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
        
        **Örnek: 13**
        * 5 + 8 = 13 (Kendinden önceki iki sayının toplamı)
        * Bu yüzden 13 bir **Fibonacci sayısıdır**.
        """)
        # Görsel kaldırıldı.

    with st.expander("🔁 PALİNDROMİK SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Baştan sona ve sondan başa okunuşu aynı olan sayılardır.
        
        **Örnekler:**
        * **121** (Ters çevir: 121) ✅
        * **4004** (Ters çevir: 4004) ✅
        * **123** (Ters çevir: 321) ❌
        """)

    with st.expander("🔢 HARSHAD SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Rakamları toplamına tam bölünebilen sayıdır. (Sanskritçe'de '**Büyük Sevinç**' demektir.)
        
        **Örnek: 18**
        * Rakamları topla: 1 + 8 = **9**
        * 18 sayısı 9'a bölünür mü? **Evet!** (18 ÷ 9 = 2)
        * O halde 18 bir **Harshad sayısıdır**.
        """)

    with st.expander("🚕 RAMANUJAN (TAKSİ) SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** İki farklı şekilde, iki sayının küplerinin toplamı olarak yazılabilen sayılardır.
        
        Bu sayıların en küçüğü ve en meşhuru **1729**'dur. Hintli matematikçi Srinivasa Ramanujan ve G. H. Hardy'nin hikayesiyle meşhur olmuştur.
        
        ---
        ### 🌟 İlk Üç Ramanujan Sayısı ve Küp Açılımları
        
        #### **1. Ramanujan Sayısı: 1729**
        İki farklı şekilde:
        * **1729 = 1³ + 12³** (1 + 1728)
        * **1729 = 9³ + 10³** (729 + 1000)
        
        #### **2. Ramanujan Sayısı: 4104**
        İki farklı şekilde:
        * **4104 = 2³ + 16³** (8 + 4096)
        * **4104 = 9³ + 15³** (729 + 3375)
        
        #### **3. Ramanujan Sayısı: 13832**
        İki farklı şekilde:
        * **13832 = 2³ + 24³** (8 + 13824)
        * **13832 = 18³ + 20³** (5832 + 8000)
        """)

    with st.expander("💪 ARMSTRONG SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Basamak sayısını kuvvet olarak aldığımızda, rakamların kuvvetleri toplamı sayının kendisine eşit olan sayıdır.
        
        **Örnek: 153 (3 Basamaklı)**
        * 1³ + 5³ + 3³
        * 1 + 125 + 27 = **153**
        * Sonuç kendisine eşit!
        """)
        
    with st.expander("🔺 ÜÇGENSEL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Noktalarla eşkenar üçgen oluşturabilen sayılardır. 1'den n'e kadar olan sayıların toplamıdır.
        
        **Dizi:** 1, 3, 6, 10, 15...
        
        **Örnek: 6**
        ```
          .
         . .
        . . .  (Toplam 6 nokta, bir üçgen oluşturur)
        ```
        """)
    
    with st.expander("⚡ MERSENNE ASALI Nedir?"):
        st.markdown("""
        **Tanım:** Mersenne asalları, özel bir formülle tanımlanır:  
        **Mₙ = 2^n - 1**

        Yani n bir asal sayı olduğunda, bazen **2^n - 1** de asal çıkar.  
        Bu özel asal sayılar matematikte çok önemlidir ve büyük asal sayıların keşfinde kullanılır.

        **Örnekler:**  
        * n = 2 → 2² - 1 = **3** (asal)  
        * n = 3 → 2³ - 1 = **7** (asal)  
        * n = 5 → 2⁵ - 1 = **31** (asal)  
        * n = 7 → 2⁷ - 1 = **127** (asal)  
        * n = 13 → 2¹³ - 1 = **8191** (asal)

        İlginç Bilgi:  
        Şu ana kadar keşfedilen **en büyük Mersenne asalı**  
        **2^136,279,841 - 1** formundadır ve tam **41.024.320 basamak** içerir!  
        Bu sayı 2018 yılında GIMPS projesi kapsamında bulunmuştur.

        Not: Tüm n değerleri asal olsa bile, **2^n - 1** her zaman asal çıkmaz.  
        Örneğin n = 11 → 2¹¹ - 1 = 2047 (bileşik, çünkü 23 × 89).
        """)
        
    with st.expander("📐 FERMAT SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Fermat sayıları özel bir formülle tanımlanır:  
        **2 üzeri 2n artı 1 şeklinde tanımlanır;
        **Fₙ = 2^(2^n) + 1** 

        **Örnekler (Alternatif Gösterim):**  
        * F₀ = 3 → (2¹ + 1)  
        * F₁ = 5 → (2² + 1)  
        * F₂ = 17 → (2⁴ + 1)  
        * F₃ = 257 → (2⁸ + 1)  
        * F₄ = 65537 → (2¹⁶ + 1)

        Burada üstleri küp gibi yazmak yerine, **kuvvetleri açıkça göstererek**  
        Fermat sayılarının nasıl büyüdüğünü daha görsel hale getirebilirsin.
        """)
        
    with st.expander("🔀 LASA SAYISI Nedir?"):
        st.markdown("""
         **Tanım:** Lasa sayıları, hem düzden okunuşu hem de ters çevrilmiş hali asal olan sayılardır.  
         Yani sayı asal olacak, aynı zamanda ters çevrilmiş hali de asal çıkacak.

          **Örnekler:**  
          * **13** → Tersi: **31** → İkisi de asal ✅  
          * **17** → Tersi: **71** → İkisi de asal ✅  
          * **37** → Tersi: **73** → İkisi de asal ✅  
          * **79** → Tersi: **97** → İkisi de asal ✅  
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

        Kriptoloji (RSA algoritması) gibi alanlarda çok önemli bir rol oynarlar.
        
        Bu özel sayı türü, asal sayıların simetrik bir özelliğini gösterir ve matematikte ilginç bir kategori oluşturur.
        """)
    
# --- MOD 4: FORMULA SPRİNT ---
elif secim == "🧠 Formula Sprint":
    st.title("🧠 Formula Sprint: Hızlı Tekrar")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    # Mevcut puanı göster
    st.metric("SPRINT PUANI", st.session_state.ezber_puan)
    
    if st.session_state.ezber_kategori_secildi:
        # KATEGORİ SEÇİLDİ, OYUN BAŞLADI
        
        soru_index = st.session_state.ezber_soru_index
        formuller = st.session_state.ezber_filtreli_formuller
        toplam_soru = len(formuller)
        
        kategori_adi = st.session_state.ezber_kategori_secildi
        st.subheader(f"🏷️ Kategori: {kategori_adi} ({toplam_soru} Formül)")

        # --- SORU VE KONTROL ALANI ---
        with st.form(key="ezber_form"):
            # Kategori, Soru, Doğru Cevap, Puan
            kategori, soru_text, dogru_cevap, puan = formuller[soru_index]
            
            st.markdown(f"### Soru {soru_index + 1}/{toplam_soru}: **`{soru_text}`**")
            st.markdown(f"*(Puan: {puan})*")
            
            # Kullanıcı Girişi
            cevap_girisi = st.text_input(
                "Boşluğu Doldurun:", 
                key="cevap_girisi", 
                help="Örn: a+b, cosxsiny. Boşluklar, üs işaretleri ve harf büyüklüğü önemsenmez."
            )
            
            col_cevap1, col_cevap2, col_cevap3 = st.columns([1, 1, 2])
            
            # Kontrol Butonu
            col_cevap1.form_submit_button(
                "✅ KONTROL ET", 
                type="primary",
                on_click=kontrol_et_ezber, 
                args=("cevap_girisi",)
            )
            
            # Sonraki Soru Butonu 
            col_cevap2.form_submit_button(
                "⏭️ SONRAKİ FORMÜL", 
                on_click=sonraki_soru_ezber
            )

        # --- GERİ BİLDİRİM SONUÇLARI ---
        geribildirim = st.session_state.ezber_geribildirim
        
        if geribildirim == "dogru":
            st.success(f"✅ {random.choice(OVGULER)} Doğru bildiniz!")
        elif geribildirim and "yanlis" in geribildirim:
            _, dogru_cevap = geribildirim.split(" | ")
            # Kullanıcıya doğru cevabın sadeleştirilmemiş halini göster
            gosterilen_cevap = dogru_cevap.split(': ')[1]
            st.error(f"❌ Yanlış cevap. Doğrusu: **`{gosterilen_cevap}`**")
            st.info("İpucu: Cevabınızdaki boşlukları, küçük harfleri ve üs işaretlerini kod otomatik olarak temizler.")
            
        st.markdown("---")
        if st.button("⬅️ KATEGORİ SEÇİMİNE DÖN / PUANI SIFIRLA", use_container_width=True, on_click=sifirla_ezber_modu):
            st.rerun()

    else:
        # KATEGORİ SEÇİM EKRANI
        st.markdown("### 🎯 Hangi Konuda Hızlanmak İstersin?")
        st.warning("Lütfen pratik yapmak istediğiniz kategoriye tıklayın.")
        
        # Kolonları dinamik olarak oluştur
        cols = st.columns(len(EZBER_KATEGORILER))
        
        for i, kategori in enumerate(EZBER_KATEGORILER):
            cols[i].button(
                f"📚 {kategori}", 
                key=f"kategori_btn_{kategori}",
                on_click=kategori_sec,
                args=(kategori,),
                use_container_width=True
            )

















