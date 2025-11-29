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
        font-family: 'Verdana', sans-serif;
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

OVGULER = ["Harikasın! 🚀", "Matematik Dehası! 🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# CALLBACK
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

# =============================================================================
# YENİ OYUN BAŞLATMA
# =============================================================================
def yeni_oyun_baslat():
    mn = st.session_state.get('ayar_min', 1)
    mx = st.session_state.get('ayar_max', 1000)
    sure = st.session_state.get('ayar_sure', 60)
    
    bulundu = False; deneme = 0; aday = 0
    while not bulundu and deneme < 200:
        aday = random.randint(mn, mx); score = 0
        if is_asal(aday): score += 1
        if is_tam_kare(aday): score += 1
        if is_fibonacci(aday): score += 1
        if is_mukemmel(aday): score += 5
        if is_ramanujan(aday): score += 10
        if score > 0: bulundu = True
        else: deneme += 1
    
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
secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "📚 Bilgi Köşesi"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    if 'en_yuksek_puan' not in st.session_state: st.session_state.en_yuksek_puan = 0
    if 'hedef_sayi' not in st.session_state:
        st.session_state.hedef_sayi = 0
        st.session_state.puan = 0
        st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = 0
        st.session_state.bitis_zamani = 0
        st.session_state.oyun_suresi = 60
        st.session_state.oyun_aktif = False
        st.session_state.ayar_min = 1
        st.session_state.ayar_max = 1000
        st.session_state.ayar_sure = 60
        
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
    mn = st.sidebar.number_input("Min Sayı", 1, 1000, st.session_state.ayar_min)
    mx = st.sidebar.number_input("Max Sayı", 1, 2000, st.session_state.ayar_max)
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
        for ad, func, _, _, _, _ in OZELLIKLER:
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
                         st.info("Bu sayı çok özeldir! İki farklı şekilde iki küpün toplamı olarak yazılabilir (1729 = 1³+12³ ve 9³+10³).")

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
    st.info("Bu bölümde oyunda geçen özel sayı türleri hakkında kısa ve anlaşılır bilgiler bulabilirsin.")
    
    with st.expander("✨ MÜKEMMEL SAYI Nedir?"):
        st.markdown("""
        **Tanım:** Kendisi hariç pozitif bölenlerinin toplamı, kendisine eşit olan sayıya denir.
        
        **Örnek: 6**
        * 6'nın bölenleri: 1, 2, 3, 6
        * Kendisi hariç toplayalım: **1 + 2 + 3 = 6**
        * Sonuç kendisine eşit olduğu için 6 Mükemmel Sayıdır.
        
        *Diğer Mükemmel Sayılar: 28, 496, 8128...*
        """)
        
    with st.expander("🌀 FIBONACCI SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** Her sayının, kendinden önceki iki sayının toplamı olduğu sayı dizisidir. Doğadaki "Altın Oran" ile ilişkilidir.
        
        **Dizi:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
        
        **Örnek: 13**
        * 5 + 8 = 13 (Kendinden önceki iki sayının toplamı)
        * Bu yüzden 13 bir Fibonacci sayısıdır.
        """)
        st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png", caption="Fibonacci Sarmalı") 

[Image of Fibonacci sequence spiral]


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
        **Tanım:** Rakamları toplamına tam bölünebilen sayıdır. (Sanskritçe'de 'Büyük Sevinç' demektir.)
        
        **Örnek: 18**
        * Rakamları topla: 1 + 8 = **9**
        * 18 sayısı 9'a bölünür mü? **Evet!** (18 ÷ 9 = 2)
        * O halde 18 bir Harshad sayısıdır.
        """)

    with st.expander("🚕 RAMANUJAN (TAKSİ) SAYISI Nedir?"):
        st.markdown("""
        **Tanım:** İki farklı şekilde, iki sayının küplerinin toplamı olarak yazılabilen en küçük sayı **1729**'dur. Bu sayıya Ramanujan sayısı denir.
        
        **Sihiri Şurada:**
        * 1729 = 1³ + 12³ (1 + 1728)
        * 1729 = 9³ + 10³ (729 + 1000)
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