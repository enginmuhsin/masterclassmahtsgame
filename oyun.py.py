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

# OYUN MODU ÖZELLİKLERİ
OZELLIKLER = [
    ("Sayı TEK mi yoksa ÇİFT mi?", is_tek, 5, 5, "TEK", "ÇİFT"),
    ("Sayı ASAL mı?", is_asal, 20, 2, "EVET", "HAYIR"),
    ("Sayı TAM KARE mi?", is_tam_kare, 15, 2, "EVET", "HAYIR"),
    ("Sayı TAM KÜP mü?", is_tam_kup, 20, 2, "EVET", "HAYIR"),
    ("Sayı MÜKEMMEL sayı mı?", is_mukemmel, 100, 5, "EVET", "HAYIR"),
    ("Sayı FIBONACCI dizisinde mi?", is_fibonacci, 25, 2, "EVET", "HAYIR"),
    ("Sayı PALİNDROMİK mi?", is_palindromik, 10, 1, "EVET", "HAYIR"),
    ("Sayı HARSHAD sayısı mı?", is_harshad, 15, 1, "EVET", "HAYIR"),
    ("Sayı ÜÇGENSEL sayı mı?", is_ucgensel, 20, 2, "EVET", "HAYIR"),
    ("Sayı 2'nin KUVVETİ mi?", is_iki_kuvveti, 15, 2, "EVET", "HAYIR"),
    ("Sayı ARMSTRONG sayısı mı?", is_armstrong, 30, 2, "EVET", "HAYIR"),
]

# YENİ EZBER MODU VERİ SETİ (Kısaltıldı)
EZBER_FORMULLER = [
    ("Çarpım Tablosu", "7 x 9 = ...", "63", 5),
    ("Özdeşlikler", "a² - b² = (a - b)(...)", "a+b", 30),
    ("Özdeşlikler", "(x + 3)² = x² + 6x + ...", "9", 25),
    ("Trigonometri", "sin²x + cos²x = ...", "1", 50),
    ("Trigonometri", "sin(x + y) = sinx cosy + ...", "cosx siny", 50),
    ("Trigonometri", "cos(2x) = cos²x - ...", "sin²x", 70), 
    ("Trigonometri", "sin(90 - x) = ...", "cosx", 60),
]

EZBER_KATEGORILER = sorted(list(set([f[0] for f in EZBER_FORMULLER])))

OVGULER = ["Harikasın! 🚀", "Matematik Dehası!🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# EZBER MODU LOGİĞİ VE CALLBACK'LERİ
# =============================================================================
def normalize_cevap(cevap):
    if not isinstance(cevap, str):
        cevap = str(cevap)
    normalized = cevap.replace(' ', '').lower()
    normalized = normalized.replace('^', '').replace('**', '').replace('*', '') 
    return normalized

def sonraki_soru_ezber():
    formuller = st.session_state.ezber_filtreli_formuller
    yeni_index = st.session_state.ezber_soru_index + 1
    if yeni_index >= len(formuller):
        yeni_index = 0
        st.toast("🎉 Seçilen Kategorideki Tüm Formülleri Tamamladın! Baştan Başlıyoruz.", icon="🥳")
    st.session_state.ezber_soru_index = yeni_index
    st.session_state.ezber_geribildirim = None
    st.session_state.cevap_girisi = "" 
    st.rerun()

def kontrol_et_ezber(cevap_key):
    if not st.session_state.ezber_filtreli_formuller:
        st.warning("Önce bir kategori seçmelisiniz!")
        return
    kullanici_cevabi = st.session_state[cevap_key]
    soru_index = st.session_state.ezber_soru_index
    formuller = st.session_state.ezber_filtreli_formuller
    kategori, soru, dogru_cevap, puan = formuller[soru_index]
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
    st.session_state.ezber_puan = 0
    st.session_state.ezber_soru_index = 0
    st.session_state.ezber_geribildirim = None
    st.session_state.ezber_kategori_secildi = None
    st.session_state.ezber_filtreli_formuller = []
    st.session_state.cevap_girisi = ""

def kategori_sec(kategori):
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
    mx = st.session_state.get('ayar_max', 5000)
    sure = st.session_state.get('ayar_sure', 60)
    
    CHECK_FUNCTIONS = [is_asal, is_tam_kare, is_fibonacci, is_mukemmel, is_harshad, is_ucgensel, is_iki_kuvveti, is_armstrong]
    
    bulundu = False; deneme = 0; aday = 0
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
# ARAYÜZ
# =============================================================================

st.sidebar.title("🧮 Menü")
secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "📚 Bilgi Köşesi", "🧠 Formula Sprint"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# --- ORTAK SESSION STATE BAŞLANGICI (Garantili Tanımlama) ---
if 'en_yuksek_puan' not in st.session_state: st.session_state.en_yuksek_puan = 0

# EZBER MODU DEĞİŞKENLERİ
if 'ezber_puan' not in st.session_state: st.session_state.ezber_puan = 0
if 'ezber_soru_index' not in st.session_state: st.session_state.ezber_soru_index = 0
if 'ezber_geribildirim' not in st.session_state: st.session_state.ezber_geribildirim = None
if 'ezber_kategori_secildi' not in st.session_state: st.session_state.ezber_kategori_secildi = None
if 'ezber_filtreli_formuller' not in st.session_state: st.session_state.ezber_filtreli_formuller = []

# OYUN MODU DEĞİŞKENLERİ
if 'hedef_sayi' not in st.session_state: st.session_state.hedef_sayi = 0
if 'puan' not in st.session_state: st.session_state.puan = 0
if 'sorular_cevaplandi' not in st.session_state: st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
if 'baslangic_zamani' not in st.session_state: st.session_state.baslangic_zamani = 0
if 'bitis_zamani' not in st.session_state: st.session_state.bitis_zamani = 0
if 'oyun_suresi' not in st.session_state: st.session_state.oyun_suresi = 60
if 'oyun_aktif' not in st.session_state: st.session_state.oyun_aktif = False

# AYAR DEĞİŞKENLERİ
if 'ayar_min' not in st.session_state: st.session_state.ayar_min = 1
if 'ayar_max' not in st.session_state: st.session_state.ayar_max = 5000
if 'ayar_sure' not in st.session_state: st.session_state.ayar_sure = 60


# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
        
    # --- SÜRE VE PUAN HESAPLAMA ---
    kalan_sure = 0
    progress_degeri = 0.0
    oyun_bitti_animasyonu = False
    
    # 1. KRİTİK SÜRE KONTROLÜ
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
            total_sure = st.session_state.oyun_suresi 
            progress_degeri = fark / total_sure
            if progress_degeri < 0: progress_degeri = 0.0
            if progress_degeri > 1: progress_degeri = 1.0

    # --- SIDEBAR AYARLARI ---
    st.sidebar.subheader("⚙️ Ayarlar")
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min)
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max)
    sure_secimi = st.sidebar.selectbox("Süre Seçin", [60, 120, 180], index=[60, 120, 180].index(st.session_state.ayar_sure))
    
    st.session_state.ayar_min = mn
    st.session_state.ayar_max = mx
    st.session_state.ayar_sure = sure_secimi
    
    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT (SIFIRLA)", use_container_width=True):
        yeni_oyun_baslat()
        st.rerun()

    st.markdown("---")
    
    # --- OYUN AKIŞ KONTROLÜ (BAŞLANGIÇ EKRANI) ---
    if st.session_state.hedef_sayi == 0:
        st.markdown("### Hazır mısın? Matematik Bilgini Test Etme Zamanı! 🧠")
        st.markdown("---")
        st.info("Oyun başlamadan önce sol menüden süre ve sayı aralığı ayarlarını kontrol edebilirsin.")
        
        col_start1, col_start2, col_start3 = st.columns([1, 2, 1])
        with col_start2:
            st.markdown("#### Ayarları yaptıysan başlayalım!")
            if st.button("🚀 OYUNU BAŞLAT", key="main_start_button", type="primary", use_container_width=True):
                yeni_oyun_baslat()
                st.rerun()
            
    # --- SKOR VE METRİK GÖSTERİMİ (HEDEF SAYI VARSA) ---
    if st.session_state.hedef_sayi > 0:
        c1, c2, c3, c4 = st.columns([1, 1, 1, 1.5])
        c1.metric("PUAN", st.session_state.puan)
        with c2:
            st.markdown(f"""<div style="text-align: center;"><p style="margin:0; font-weight:bold; color:#495057;">REKOR</p><p style="margin:0; font-size: 2.5rem; font-weight:900; color: #d4af37; text-shadow: 1px 1px 1px black;">{st.session_state.en_yuksek_puan}</p></div>""", unsafe_allow_html=True)
        
        c3.metric("SÜRE", f"{kalan_sure} sn")
        
        with c4:
            st.markdown(f"""<div class="hedef-sayi-kutusu"><p style="color: #495057; font-weight: bold; margin:0; font-size: 0.9rem; text-transform: uppercase;">HEDEF SAYI</p><p style="color: #dc3545; font-weight: 900; font-size: 3rem; margin:0; line-height: 1;">{st.session_state.hedef_sayi}</p></div>""", unsafe_allow_html=True)

        st.progress(progress_degeri, text="Kalan Süre")

        # ZAMANLAYICI DÖNGÜSÜ
        if st.session_state.oyun_aktif and kalan_sure > 0:
            time.sleep(1)
            st.rerun()

        # YENİ TUR KONTROLÜ (Tüm sorular cevaplandıysa yeni tur başlat)
        if st.session_state.oyun_aktif:
            cevaplanan_soru_sayisi = sum(1 for d in st.session_state.sorular_cevaplandi if d is not None)
            
            if cevaplanan_soru_sayisi == len(OZELLIKLER):
                st.toast("🎉 Tüm Sorular Cevaplandı! Yeni Tur Başlıyor...", icon="🥳")
                time.sleep(1) 
                yeni_oyun_baslat()
                st.rerun()

        # 3. OYUN BİTTİ EKRANI
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            if oyun_bitti_animasyonu:
                st.balloons()
                st.success(f"🏆 TEBRİKLER! YENİ REKOR KIRDINIZ: {st.session_state.puan} PUAN!")
            else:
                st.error("⏰ SÜRE DOLDU! Yeni bir oyuna başlamak için alttaki butonu kullanın.")
            st.markdown("---")
            col_tekrar1, col_tekrar2, col_tekrar3 = st.columns([1, 2, 1])
            with col_tekrar2:
                if st.button("🔄 TEKRAR OYNA (YENİ SORU)", type="primary", use_container_width=True):
                    yeni_oyun_baslat()
                    st.rerun()
            st.markdown("---")
        
        # 4. SORU ALANI (HEDEF SAYI OLDUĞU SÜRECE GÖRÜNSİN)
        st.markdown("---")
        st.markdown("### 🎯 Soruları Yanıtla")
        
        for i, (soru, func, p_d, p_y, sol_txt, sag_txt) in enumerate(OZELLIKLER):
            durum = st.session_state.sorular_cevaplandi[i]
            
            with st.container():
                st.write(f"**{soru}** <span style='color:#6c757d; font-size:0.9em;'>(Doğru: +{p_d}p / Yanlış: -{p_y}p)</span>", unsafe_allow_html=True)
                col_btn1, col_btn2 = st.columns(2)
                
                # KRİTİK: Butonlar sadece oyun aktifken VE cevap verilmemişse çalışır
                buton_etkin = st.session_state.oyun_aktif and durum is None
                
                if durum is None:  # Henüz cevaplanmamış
                    col_btn1.button(
                        sol_txt, 
                        key=f"btn_sol_{i}", 
                        disabled=not buton_etkin,
                        use_container_width=True, 
                        on_click=cevap_ver, 
                        args=(i, "sol")
                    )
                    col_btn2.button(
                        sag_txt, 
                        key=f"btn_sag_{i}", 
                        disabled=not buton_etkin,
                        use_container_width=True, 
                        on_click=cevap_ver, 
                        args=(i, "sag")
                    )
                else:  # Cevaplanmış - geri bildirimi göster
                    dogru_mu = func(st.session_state.hedef_sayi)
                    kavram = soru.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("yoksa", "").strip()
                    gercek_cevap_metni = ("TEK" if dogru_mu else "ÇİFT") if "TEK" in soru else (f"EVET ({kavram})" if dogru_mu else f"HAYIR ({kavram} DEĞİL)")
                    
                    if durum == "dogru": 
                        st.success(f"✅ DOĞRU! → **{gercek_cevap_metni}**")
                    else: 
                        st.error(f"❌ YANLIŞ! Doğrusu → **{gercek_cevap_metni}**")
                
                st.markdown("")

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
        TUM_KONTROL_FONKSIYONLARI = OZELLIKLER + [("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR")]
        
        for ad, func, _, _, _, _ in TUM_KONTROL_FONKSIYONLARI
