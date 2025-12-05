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
# TASARIM: AYDINLIK & FERAH TEMA (CSS)
# =============================================================================
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    .stApp {
        background-color: #f8f9fa;
        background-image: radial-gradient(#dee2e6 1px, transparent 1px);
        background-size: 20px 20px;
    }
    h1 { color: #0d2b5b !important; text-shadow: 1px 1px 2px #b0b0b0; font-weight: 900 !important; font-family: 'Helvetica', sans-serif;}
    [data-testid="stMetricLabel"] { color: #495057 !important; font-size: 1.1rem !important; font-weight: bold !important; }
    [data-testid="stMetricValue"] { color: #dc3545 !important; font-size: 2.5rem !important; font-weight: 900 !important; }
    
    .bilsem-header {
        text-align: center;
        color: #ffffff; 
        font-weight: bold;
        font-size: 1.3rem;
        font-family: 'Verdana', sans-serif;
        padding: 15px;
        margin-bottom: 20px;
        background: linear-gradient(90deg, #0d2b5b 0%, #dc3545 100%);
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .stButton>button {
        font-weight: bold;
        border-radius: 12px;
        border: 2px solid #0d2b5b;
        color: #0d2b5b;
        background-color: #ffffff;
        transition: all 0.2s;
    }
    .stButton>button:hover {
        background-color: #0d2b5b;
        color: white;
        border-color: #0d2b5b;
        transform: translateY(-2px);
    }
    
    .hedef-sayi-kutusu {
        background-color: #ffffff;
        border: 4px solid #dc3545;
        padding: 10px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 20px rgba(220, 53, 69, 0.15);
    }
    </style>
    """, unsafe_allow_html=True)

# =============================================================================
# MATEMATİK FONKSİYONLARI
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

OZELLIKLER = [
    ("Sayı TEK mi yoksa ÇİFT mi?", is_tek, 5, 5, "TEK", "ÇİFT"),
    ("Sayı ASAL mı?", is_asal, 20, 2, "EVET", "HAYIR"),
    ("Sayı TAM KARE mi?", is_tam_kare, 15, 2, "EVET", "HAYIR"),
    ("Sayı TAM KÜP mü?", is_tam_kup, 20, 2, "EVET", "HAYIR"),
    ("Sayı MÜKEMMEL sayı mı?", is_mukemmel, 100, 5, "EVET", "HAYIR"),
    ("Sayı FIBONACCI dizisinde mi?", is_fibonacci, 25, 2, "EVET", "HAYIR"),
    ("Sayı PALİNDROMİK mi?", is_palindromik, 10, 1, "EVET", "HAYIR"),
    ("Sayı HARSHAD sayısı mı?", is_harshad, 15, 1, "EVET", "HAYIR"),
    ("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR"),
    ("Sayı ÜÇGENSEL sayı mı?", is_ucgensel, 20, 2, "EVET", "HAYIR"),
    ("Sayı 2'nin KUVVETİ mi?", is_iki_kuvveti, 15, 2, "EVET", "HAYIR"),
    ("Sayı ARMSTRONG sayısı mı?", is_armstrong, 30, 2, "EVET", "HAYIR"),
]

# =============================================================================
# VERİ SETLERİ (FORMULA SPRINT)
# =============================================================================
def get_carpim_tablosu():
    return [(f"{i} x {j} = ...", str(i*j), 5) for i in range(2, 10) for j in range(2, 10)]

def get_tam_kareler():
    # 1'den 30'a kadar sayıların kareleri (Ezber için makul aralık)
    return [(f"{i}² = ...", str(i**2), 10) for i in range(1, 31)]

def get_tam_kupler():
    # 1'den 15'e kadar sayıların küpleri
    return [(f"{i}³ = ...", str(i**3), 15) for i in range(1, 16)]

def get_ileri_duzey():
    return [
        # ÖZDEŞLİKLER (Zenginleştirilmiş)
        ("a² - b² = (a - b)(...)", "a+b", 30),
        ("(a + b)² = a² + 2ab + ...", "b²", 25),
        ("(a - b)² = a² - 2ab + ...", "b²", 25),
        ("x² - 16 = (x - 4)(...)", "x+4", 30),
        ("a³ - b³ = (a - b)(a² + ab + ...)", "b²", 80),
        ("a³ + b³ = (a + b)(a² - ab + ...)", "b²", 80),
        ("(a + b)³ = a³ + 3a²b + 3ab² + ...", "b³", 80),
        ("(a+b+c)² = a²+b²+c²+2(...)", "ab+ac+bc", 90),
        
        # TRİGONOMETRİ (Tam Kadro)
        ("sin²x + cos²x = ...", "1", 20),
        ("tanx = sinx / ...", "cosx", 20),
        ("cotx = cosx / ...", "sinx", 20),
        ("tanx * cotx = ...", "1", 20),
        ("sin(2x) = 2 sinx ...", "cosx", 60), # Yarım Açı
        ("cos(2x) = cos²x - ...", "sin²x", 60),
        ("cos(2x) = 2cos²x - ...", "1", 60),
        ("sin(x + y) = sinx cosy + ...", "cosx siny", 70), # Toplam Fark
        ("cos(x + y) = cosx cosy - ...", "sinx siny", 70),
        ("tan(x + y) = (tanx + tany) / (1 - ...)", "tanx tany", 80),
        ("sin(90 - x) = ...", "cosx", 40), # Dönüşüm
    ]

OVGULER = ["Harikasın! 🚀", "Matematik Dehası! 🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# YARDIMCI FONKSİYONLAR
# =============================================================================
def normalize_cevap(cevap):
    if not isinstance(cevap, str): cevap = str(cevap)
    normalized = cevap.replace(' ', '').lower()
    # Matematiksel ifadeleri sadeleştir
    normalized = normalized.replace('²', '2').replace('³', '3')
    normalized = normalized.replace('^', '').replace('**', '').replace('*', '') 
    return normalized

def sonraki_soru_sprint(tab_key):
    """Her sekme (tab) için ayrı soru indexini yönetir"""
    liste = st.session_state[f"liste_{tab_key}"]
    mevcut_idx = st.session_state.get(f"idx_{tab_key}", 0)
    
    # Rastgele bir sonraki soruya geç (Sıralı gitmesin, ezber bozulur)
    yeni_idx = random.randint(0, len(liste) - 1)
    
    st.session_state[f"idx_{tab_key}"] = yeni_idx
    st.session_state[f"msg_{tab_key}"] = None # Mesajı temizle
    st.session_state[f"input_{tab_key}"] = "" # Inputu temizle

def kontrol_et_sprint(cevap, tab_key):
    idx = st.session_state.get(f"idx_{tab_key}", 0)
    liste = st.session_state[f"liste_{tab_key}"]
    soru, dogru, puan = liste[idx]
    
    if normalize_cevap(cevap) == normalize_cevap(dogru):
        st.session_state[f"msg_{tab_key}"] = ("dogru", puan)
        st.session_state.ezber_puan += puan
        st.toast(f"✅ Doğru! +{puan} Puan", icon="🧠")
        # Doğru bilince otomatik yeni soruya geçme opsiyonu eklenebilir ama
        # öğrencinin doğruyu görmesi için bekletiyoruz.
    else:
        st.session_state[f"msg_{tab_key}"] = ("yanlis", dogru)
        st.toast("❌ Yanlış Cevap", icon="🤔")

# =============================================================================
# OYUN MANTIĞI (OYUN MODU İÇİN)
# =============================================================================
def cevap_ver(index, buton_tipi):
    if not st.session_state.oyun_aktif: return
    soru_data = OZELLIKLER[index]
    func = soru_data[1]
    p_d = soru_data[2]; p_y = soru_data[3]
    dogru_mu = func(st.session_state.hedef_sayi); kullanici_bildi_mi = False
    
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
        
    if None not in st.session_state.sorular_cevaplandi:
        st.session_state.oyun_aktif = False
        st.session_state.bitis_zamani = time.time()
        st.rerun()

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
        if has_property: bulundu = True
        else: deneme += 1
    if not bulundu: aday = random.randint(mn, mx)
    st.session_state.hedef_sayi = aday
    st.session_state.puan = 0
    st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
    simdi = time.time()
    st.session_state.baslangic_zamani = simdi
    st.session_state.bitis_zamani = simdi + sure
    st.session_state.oyun_suresi = sure
    st.session_state.oyun_aktif = True

# =============================================================================
# ARAYÜZ BAŞLANGICI
# =============================================================================

st.sidebar.title("🧮 Menü")
secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "🧠 Formula Sprint", "📚 Bilgi Köşesi"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# GLOBAL STATE BAŞLATMA
if 'en_yuksek_puan' not in st.session_state: st.session_state.en_yuksek_puan = 0
if 'ezber_puan' not in st.session_state: st.session_state.ezber_puan = 0

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    if 'hedef_sayi' not in st.session_state:
        st.session_state.hedef_sayi = 0
        st.session_state.puan = 0
        st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = 0
        st.session_state.bitis_zamani = 0
        st.session_state.oyun_suresi = 60
        st.session_state.oyun_aktif = False
        st.session_state.ayar_min = 1
        st.session_state.ayar_max = 5000
        st.session_state.ayar_sure = 60

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

    st.sidebar.subheader("⚙️ Ayarlar")
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min)
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max)
    sure_secimi = st.sidebar.selectbox("Süre Seçin", [60, 120, 180], index=[60, 120, 180].index(st.session_state.ayar_sure))
    st.session_state.ayar_min = mn; st.session_state.ayar_max = mx; st.session_state.ayar_sure = sure_secimi
    
    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT (SIFIRLA)", use_container_width=True):
        yeni_oyun_baslat()
        st.rerun()
    st.markdown("---")

    if st.session_state.hedef_sayi != 0:
        c1, c2, c3, c4 = st.columns([1, 1, 1, 1.5])
        c1.metric("PUAN", st.session_state.puan)
        with c2:
            st.markdown(f"""<div style="text-align: center;"><p style="margin:0; font-weight:bold; color:#495057;">REKOR</p><p style="margin:0; font-size: 2.5rem; font-weight:900; color: #d4af37; text-shadow: 1px 1px 1px black;">{st.session_state.en_yuksek_puan}</p></div>""", unsafe_allow_html=True)
        c3.metric("SÜRE", f"{kalan_sure} sn")
        with c4:
            st.markdown(f"""<div class="hedef-sayi-kutusu"><p style="color: #495057; font-weight: bold; margin:0; font-size: 0.9rem; text-transform: uppercase;">HEDEF SAYI</p><p style="color: #dc3545; font-weight: 900; font-size: 3rem; margin:0; line-height: 1;">{st.session_state.hedef_sayi}</p></div>""", unsafe_allow_html=True)

        st.progress(progress_degeri, text="Kalan Süre")
        
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            if oyun_bitti_animasyonu:
                st.balloons()
                st.success(f"🏆 TEBRİKLER! YENİ REKOR KIRDINIZ: {st.session_state.puan} PUAN!")
            else:
                if None not in st.session_state.sorular_cevaplandi:
                    st.success("Tebrikler! Tüm soruları zamanından önce bitirdiniz!")
                else:
                    st.error("⏰ SÜRE DOLDU!")
            st.markdown("---")
            col_tekrar1, col_tekrar2, col_tekrar3 = st.columns([1, 2, 1])
            with col_tekrar2:
                if st.button("🔄 TEKRAR OYNA (YENİ SORU)", type="primary", use_container_width=True):
                    yeni_oyun_baslat()
                    st.rerun()
            st.markdown("---")

        for i, (soru, func, p_d, p_y, sol_txt, sag_txt) in enumerate(OZELLIKLER):
            durum = st.session_state.sorular_cevaplandi[i]
            if durum is None:
                with st.container():
                    st.write(f"**{soru}** <span style='color:#6c757d; font-size:0.9em;'>(D: {p_d}p / Y: {p_y}p)</span>", unsafe_allow_html=True)
                    col_btn1, col_btn2 = st.columns(2)
                    buton_aktif = st.session_state.oyun_aktif
                    col_btn1.button(sol_txt, key=f"btn_sol_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sol"))
                    col_btn2.button(sag_txt, key=f"btn_sag_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sag"))
            else:
                dogru_mu = func(st.session_state.hedef_sayi)
                kavram = soru.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("yoksa", "").strip()
                gercek_cevap_metni = ("TEK" if dogru_mu else "ÇİFT") if "TEK" in soru else (f"EVET ({kavram})" if dogru_mu else f"HAYIR ({kavram} DEĞİL)")
                if durum == "dogru": st.success(f"✅ DOĞRU! -> **{gercek_cevap_metni}**")
                else: st.error(f"❌ YANLIŞ! Doğrusu -> **{gercek_cevap_metni}**")
        
        if st.session_state.oyun_aktif:
            time.sleep(0.5) 
            st.rerun()
    else:
        st.markdown("### Hazır mısın? Matematik Bilgini Test Etme Zamanı! 🧠")
        st.markdown("---")
        st.info("Oyun başlamadan önce sol menüden süre ve sayı aralığı ayarlarını kontrol edebilirsin.")
        col_start1, col_start2, col_start3 = st.columns([1, 2, 1])
        with col_start2:
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
        d = "ÇİFT" if val % 2 == 0 else "TEK"
        c_sol.info(f"👉 Bu sayı bir **{d}** sayıdır.")
        idx = 0
        TUM_KONTROL = OZELLIKLER + [("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR")]
        for ad, func, _, _, _, _ in TUM_KONTROL:
            if "TEK" in ad: continue
            kisa = ad.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("?", "").replace("yoksa", "").strip()
            kisa = kisa.replace(" mı", "").replace(" mi", "").replace(" mu", "").replace(" mü", "").strip()
            
            if func(val):
                hedef = c_sol if idx % 2 == 0 else c_sag
                with hedef:
                    st.success(f"✅ **{kisa}**")
                    if "FIBONACCI" in kisa:
                        with st.expander("Fibonacci Bilgisi"):
                            st.write("Altın oranın temeli olan Fibonacci dizisindedir.")
                            st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png", caption="Fibonacci Sarmalı")
                    if "RAMANUJAN" in kisa:
                         st.info("Bu sayı çok özeldir! İlk üç Ramanujan sayısı: 1729, 4104, 13832'dir.")
            idx += 1
        st.divider()

# --- MOD 3: FORMULA SPRINT (YENİLENMİŞ) ---
elif secim == "🧠 Formula Sprint":
    st.title("🧠 Formula Sprint: Hızlı Tekrar")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    st.metric("SPRINT PUANI", st.session_state.ezber_puan)
    
    # Veri setlerini hazırla
    if 'liste_carpim' not in st.session_state: st.session_state.liste_carpim = get_carpim_tablosu()
    if 'liste_kare' not in st.session_state: st.session_state.liste_kare = get_tam_kareler()
    if 'liste_kup' not in st.session_state: st.session_state.liste_kup = get_tam_kupler()
    if 'liste_efsane' not in st.session_state: st.session_state.liste_efsane = get_ileri_duzey()
    
    # 4 AYRI SEKME
    tab1, tab2, tab3, tab4 = st.tabs(["✖️ Çarpım Tablosu", "🔲 Tam Kareler", "🧊 Tam Küpler", "🚀 Efsane Formüller"])
    
    # TAB 1: ÇARPIM
    with tab1:
        st.subheader("Çarpım Tablosu (1-9)")
        if st.button("Sıradaki Soru (Çarpım)", key="btn_next_carpim"): sonraki_soru_sprint("carpim")
        
        # Soru Göster
        idx = st.session_state.get("idx_carpim", 0)
        soru, dogru, puan = st.session_state.liste_carpim[idx]
        st.markdown(f"### `{soru}`")
        
        # Form
        with st.form("form_carpim"):
            cevap = st.text_input("Cevap:", key="in_carpim")
            if st.form_submit_button("Kontrol Et"):
                if normalize_cevap(cevap) == normalize_cevap(dogru):
                    st.success("Doğru! +5 Puan")
                    st.session_state.ezber_puan += 5
                else:
                    st.error(f"Yanlış. Doğrusu: {dogru}")

    # TAB 2: TAM KARELER
    with tab2:
        st.subheader("Tam Kareler (1-30)")
        if st.button("Sıradaki Soru (Kare)", key="btn_next_kare"): sonraki_soru_sprint("kare")
        idx = st.session_state.get("idx_kare", 0)
        soru, dogru, puan = st.session_state.liste_kare[idx]
        st.markdown(f"### `{soru}`")
        with st.form("form_kare"):
            cevap = st.text_input("Cevap:", key="in_kare")
            if st.form_submit_button("Kontrol Et"):
                if normalize_cevap(cevap) == normalize_cevap(dogru):
                    st.success("Doğru! +10 Puan")
                    st.session_state.ezber_puan += 10
                else: st.error(f"Yanlış. Doğrusu: {dogru}")

    # TAB 3: TAM KÜPLER
    with tab3:
        st.subheader("Tam Küpler (1-15)")
        if st.button("Sıradaki Soru (Küp)", key="btn_next_kup"): sonraki_soru_sprint("kup")
        idx = st.session_state.get("idx_kup", 0)
        soru, dogru, puan = st.session_state.liste_kup[idx]
        st.markdown(f"### `{soru}`")
        with st.form("form_kup"):
            cevap = st.text_input("Cevap:", key="in_kup")
            if st.form_submit_button("Kontrol Et"):
                if normalize_cevap(cevap) == normalize_cevap(dogru):
                    st.success("Doğru! +15 Puan")
                    st.session_state.ezber_puan += 15
                else: st.error(f"Yanlış. Doğrusu: {dogru}")

    # TAB 4: İLERİ DÜZEY
    with tab4:
        st.subheader("Özdeşlikler & Trigonometri")
        if st.button("Sıradaki Soru (Efsane)", key="btn_next_efsane"): sonraki_soru_sprint("efsane")
        idx = st.session_state.get("idx_efsane", 0)
        soru, dogru, puan = st.session_state.liste_efsane[idx]
        st.markdown(f"### `{soru}`")
        st.caption("İpucu: a+b, sinx gibi boşluksuz yazabilirsiniz. Üs işaretlerini (²) yazmanıza gerek yok, normal rakam kullanın.")
        with st.form("form_efsane"):
            cevap = st.text_input("Boşluğu Doldur:", key="in_efsane")
            if st.form_submit_button("Kontrol Et"):
                if normalize_cevap(cevap) == normalize_cevap(dogru):
                    st.success(f"Mükemmel! +{puan} Puan")
                    st.session_state.ezber_puan += puan
                else: st.error(f"Yanlış. Doğrusu: {dogru}")

# --- MOD 4: BİLGİ KÖŞESİ (YENİLENMİŞ) ---
elif secim == "📚 Bilgi Köşesi":
    st.title("📚 Master Class Bilgi Bankası")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    tab_sayi, tab_trigo, tab_carpan = st.tabs(["🔢 Sayı Türleri", "📐 Trigonometri", "✨ Çarpanlara Ayırma"])
    
    with tab_sayi:
        st.info("Sayı teorisinin en gizemli üyeleri burada!")
        with st.expander("⭐ MERSENNE ASALLARI"):
            st.latex(r"M_p = 2^p - 1")
            st.write("p asal bir sayı olmak üzere, bu formdaki asallara denir.")
        with st.expander("🚕 RAMANUJAN SAYILARI"):
            st.write("İki farklı küp toplamı olarak iki yolla yazılabilen sayılar.")
            st.latex(r"1729 = 1^3 + 12^3 = 9^3 + 10^3")
        with st.expander("✨ MÜKEMMEL SAYILAR"):
            st.write("Kendisi hariç bölenleri toplamı kendine eşit olan sayılar.")
            st.latex(r"6 \rightarrow 1+2+3=6")
            st.latex(r"28 \rightarrow 1+2+4+7+14=28")

    with tab_trigo:
        st.info("Trigonometrik özdeşlikler ve formüller.")
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("##### Temel Özdeşlikler")
            st.latex(r"\sin^2 x + \cos^2 x = 1")
            st.latex(r"\tan x = \frac{\sin x}{\cos x}")
            st.latex(r"\cot x = \frac{1}{\tan x}")
            
            st.markdown("##### Toplam - Fark")
            st.latex(r"\sin(x \pm y) = \sin x \cos y \pm \cos x \sin y")
            st.latex(r"\cos(x \pm y) = \cos x \cos y \mp \sin x \sin y")
            
        with col2:
            st.markdown("##### Yarım Açı")
            st.latex(r"\sin(2x) = 2\sin x \cos x")
            st.latex(r"\cos(2x) = \cos^2 x - \sin^2 x")
            st.latex(r"\cos(2x) = 2\cos^2 x - 1")
            
            st.markdown("##### Dönüşüm")
            st.latex(r"\sin(90^\circ - x) = \cos x")
            st.latex(r"\cos(180^\circ - x) = -\cos x")

    with tab_carpan:
        st.info("Cebirsel ifadeleri sadeleştirmenin anahtarı.")
        st.markdown("##### İki Kare Farkı")
        st.latex(r"a^2 - b^2 = (a - b)(a + b)")
        
        st.markdown("##### Tam Kare Açılımı")
        st.latex(r"(a + b)^2 = a^2 + 2ab + b^2")
        st.latex(r"(a - b)^2 = a^2 - 2ab + b^2")
        st.latex(r"(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + ac + bc)")
        
        st.markdown("##### Küp Açılımları")
        st.latex(r"a^3 - b^3 = (a - b)(a^2 + ab + b^2)")
        st.latex(r"a^3 + b^3 = (a + b)(a^2 - ab + b^2)")
        st.latex(r"(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3")