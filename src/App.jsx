import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, Download, Globe, 
  CheckCircle, Truck, FileText, Package, ShieldCheck, 
  ArrowRight, ChevronRight, Leaf, Train, Plane,
  FileSignature, ShoppingCart, XCircle, Info, Scale,
  Play, CheckCircle2, Droplets, Sun, Activity, Box, ChevronDown, Globe2, Shield, Map,
  CalendarDays, Calculator, Search, Layers, Users,
  Building2, Sprout, Snowflake, LayoutGrid, Hexagon, Eye, AlignJustify, Send, BadgeCheck, Award,
  Filter, Boxes
} from 'lucide-react';

// --- STYLING & FONTS ---
const injectStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Manrope', sans-serif;
      background-color: #FAFAFA;
      color: #1A1A1A;
    }
    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Playfair Display', serif;
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #C9A14A; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #0F3D2E; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .cert-scroll {
      display: flex;
      animation: scroll 30s linear infinite;
    }
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .animate-float { animation: float 5s ease-in-out infinite; }
    .animate-float-delay-1 { animation: float 5s ease-in-out 1.5s infinite; }
    .animate-float-delay-2 { animation: float 5s ease-in-out 3s infinite; }

    @keyframes moveDown {
      0% { top: -40%; }
      100% { top: 100%; }
    }
  `;
  document.head.appendChild(style);
};

// --- DATA & TRANSLATIONS ---
const content = {
  uz: {
    nav: { home: "Asosiy", about: "Korxona", catalog: "Katalog", calendar: "Mavsum", logistics: "Logistika", calculator: "Kalkulyator", faq: "FAQ", contact: "Aloqa", download: "Katalog (PDF)" },
    hero: {
      title: "Surxondaryo Agro Export — Ulgurji Ta'minotchi",
      subtitle: "MDH va Yevropa bozorlari uchun yashiklarga qadoqlangan, kalibrovka qilingan eksportbop meva va sabzavotlar.",
      cta1: "Katalogni ko'rish",
      cta2: "Kalkulyatsiya olish",
      anim: {
        step1: "1. Dalaga ekish",
        step1Sub: "Tabiiy parvarish",
        step2: "2. Hosil va Saralash",
        step2Sub: "Sifatli tanlov",
        step3: "3. Qadoqlash",
        step3Sub: "Yashiklarga joylash",
        step4: "4. Eksport",
        step4Sub: "Mijozga yetkazish"
      }
    },
    certs: ["Global G.A.P. Certified", "Fitosanitariya Nazorati", "ISO 9001:2015 Quality", "100% Yuridik Toza", "MAP Qadoqlash Standarti"],
    video: {
      title: "Eksport Jarayoni",
      subtitle: "Daladan tortib, furalarga ortilishigacha bo'lgan to'liq jarayon bilan tanishing.",
      caption: "Sifat nazorati va qadoqlash"
    },
    about: {
      title: "Bizning Korxona",
      subtitle: "Agro-Surxon Export MChJ – O'zbekistonning janubiy darvozasidagi ishonchli hamkoringiz.",
      text1: "Biz 10 yildan ortiq vaqt mobaynida Surxondaryo viloyatining sara qishloq xo'jaligi mahsulotlarini yetishtirish, saralash, qadoqlash va xalqaro bozorlarga eksport qilish bilan shug'ullanamiz.",
      text2: "Korxonamiz zamonaviy sovutish kameralari (Cold Storage), kalibrovka uskunalari va qadoqlash liniyalari bilan to'liq jihozlangan bo'lib, xaridorlarga xalqaro standartlarga mos sifatli mahsulotlarni barqaror yetkazib berishni kafolatlaydi.",
      points: [
        "Zamonaviy qadoqlash liniyalari va omborlar",
        "1500 tonnadan ortiq sig'imli muzlatgich kameralar",
        "Bojxona postiga yaqin qulay logistik joylashuv"
      ]
    },
    products: {
      title: "Eksport Katalogi",
      subtitle: "Uzoq masofaga tashishga chidamli qilib qadoqlangan, xalqaro standartdagi mahsulotlarimiz.",
      categories: [
        { id: 'all', label: "Barchasi" },
        { id: 'fruits', label: "Mevalar" },
        { id: 'veg', label: "Sabzavotlar" },
        { id: 'melon', label: "Poliz ekinlari" },
        { id: 'dried', label: "Quruq mevalar" },
        { id: 'nuts', label: "Yong'oqlar" },
        { id: 'legumes', label: "Dukkaklilar" }
      ],
      avail: "Mavjud",
      season: "Mavsumiy",
      details: "Batafsil",
      moq: "Min. buyurtma:",
      pack: "Qadoq:",
      caliber: "Kalibr/Nav:",
      orderBtn: "Narxini bilish (WhatsApp)",
      items: [
        { id: 1, cat: 'fruits', name: "Surxon Anori", status: "avail", img: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80&w=800", moq: "20 tonna (1 Fura)", pack: "Yog'och yashik (10 kg), Gofrotara", caliber: "70-100mm, 1-nav", desc: "Qalin po'stli, yirik donali eksportbop anor. Uzoq masofaga tashishga o'ta chidamli. Ikki qatorli qilib yashiklarga terilgan." },
        { id: 2, cat: 'fruits', name: "Qora Uzum (Toifi)", status: "avail", img: "https://images.unsplash.com/photo-1596431985959-1c998f480eec?auto=format&fit=crop&q=80&w=800", moq: "10 tonna", pack: "Plastik yashik (8 kg)", caliber: "Yirik, shirinligi 18-22 brix", desc: "Plastik yashiklarga qog'oz to'shama va SO2 paketlar bilan qadoqlangan, muzlatgich kameralarida saqlangan uzum." },
        { id: 3, cat: 'fruits', name: "Ertapishar Gilos", status: "season", img: "https://images.unsplash.com/photo-1528820600606-0ef5600cbfee?auto=format&fit=crop&q=80&w=800", moq: "5 tonna (Avia)", pack: "Gofro-yashik + MAP paket (5 kg)", caliber: "26mm - 32mm+", desc: "Gidrokuling qilingan va MAP texnologiyasi asosida qadoqlangan premium gilos. To'liq eksport talabiga javob beradi." },
        { id: 4, cat: 'veg', name: "Eksport Piyoz (Sariq/Qizil)", status: "avail", img: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&q=80&w=800", moq: "22 tonna", pack: "To'r qoplar (25-30 kg)", caliber: "5-7 sm, o'ta quruq", desc: "Dalada to'liq quritilgan, chig'iriqdan o'tkazilib kalibrovka qilingan va qoplarga joylangan piyoz." },
        { id: 5, cat: 'veg', name: "Issiqxona Pomidori", status: "avail", img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=800", moq: "15 tonna", pack: "Besh qavatli gofrotara (10 kg)", caliber: "Pushti va qizil, 150-200 gr", desc: "Karton yashiklarga 2 qator qilib maxsus qistirmalar bilan terilgan, ezilmasdan yetib borishi kafolatlangan pomidor." },
        { id: 6, cat: 'melon', name: "Kuzgi Qovun", status: "season", img: "https://images.unsplash.com/photo-1598025555678-83141ba57519?auto=format&fit=crop&q=80&w=800", moq: "20 tonna", pack: "Karton quti yoki to'r qop", caliber: "3-5 kg / dona", desc: "MDH hududiga asosan to'r qoplarda yoki mijoz talabiga ko'ra yirik gofrotaralarda eksport qilinadigan shirin qovunlar." },
        { id: 7, cat: 'melon', name: "Tarvuz", status: "season", img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=800", moq: "20 tonna", pack: "Konteyner palet (Bulk)", caliber: "7-12 kg", desc: "Furalarga maxsus poddonlar (bin) yordamida yuklanadigan, tranzitga chidamli qalin po'stli tarvuzlar." },
        { id: 8, cat: 'dried', name: "Mayiz va Quruq Mevalar", status: "avail", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800", moq: "5 tonna", pack: "Karton yashik (10 kg) + Polietilen", caliber: "Premium, tozalangan", desc: "Color Sorter uskunalarida lazerli saralashdan o'tgan, chang va cho'plardan 99% tozalangan ulgurji quruq mevalar." },
        { id: 9, cat: 'nuts', name: "Qobig'li Bodom", status: "avail", img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=800", moq: "3 tonna", pack: "Qop (25-30 kg)", caliber: "Yirik hajmli, qog'oz po'choq", desc: "Tog'li hududlarda yetishtirilgan, qoplarga qadoqlangan eksportbop toza bodom." },
        { id: 10, cat: 'legumes', name: "Mosh (Dukkakli)", status: "avail", img: "https://images.unsplash.com/photo-1583091993444-a957dbd7baaa?auto=format&fit=crop&q=80&w=800", moq: "22 tonna", pack: "Polipropilen qop (50 kg)", caliber: "3.2mm - 4.0mm+", desc: "Zavodda tozalangan, 99% sof holatdagi, maxsus qoplarga qadoqlangan mosh." }
      ]
    },
    seasonality: {
      title: "Mahsulotlar Mavsumiyligi",
      subtitle: "To'rt fasl davomida eksportga tayyor bo'ladigan eng xaridorgir mahsulotlarimiz.",
      seasons: ["Bahor", "Yoz", "Kuz", "Qish"],
      emptyMsg: "Ushbu faslda yangi hosil kutilmoqda.",
      items: [
        // Bahor (Spring)
        { name: "Ertapishar Gilos", active: [0], img: "https://images.unsplash.com/photo-1528820600606-0ef5600cbfee?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Qulupnay", active: [0], img: "https://images.unsplash.com/photo-1587324438673-56c802dc28bd?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Ertagi O'rik", active: [0], img: "https://images.unsplash.com/photo-1622359489955-4700d2da0737?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Ertagi Kartoshka", active: [0], img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Sarimsoq Piyoz", active: [0], img: "https://images.unsplash.com/photo-1540148426940-664dc15f1066?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Ertagi Karam", active: [0], img: "https://images.unsplash.com/photo-1596484552834-0a3733b1e062?auto=format&fit=crop&q=80&w=800" }, 
        
        // Yoz (Summer)
        { name: "Shaftoli", active: [1], img: "https://images.unsplash.com/photo-1630138944510-449e21935de9?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Tarvuz", active: [1], img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Qovun", active: [1], img: "https://images.unsplash.com/photo-1598025555678-83141ba57519?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Olxo'ri", active: [1], img: "https://images.unsplash.com/photo-1600862086300-8cb4948a31db?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Anjir", active: [1], img: "https://images.unsplash.com/photo-1601379327928-bee0a1cb00ce?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Daladagi Pomidor", active: [1], img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=800" }, 
        
        // Kuz (Autumn)
        { name: "Surxon Anori", active: [2], img: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Kechki Uzum", active: [2], img: "https://images.unsplash.com/photo-1596431985959-1c998f480eec?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Xurmo", active: [2], img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Qizil Olma", active: [2], img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Eksport Piyoz", active: [2], img: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Yong'oq", active: [2], img: "https://images.unsplash.com/photo-1554904257-27b2b00eefbd?auto=format&fit=crop&q=80&w=800" }, 

        // Qish (Winter)
        { name: "Issiqxona Pomidori", active: [3], img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Limon va Sitrus", active: [3], img: "https://images.unsplash.com/photo-1587317765103-605809783f98?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Quruq Mevalar", active: [3], img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Mosh (Dukkakli)", active: [3], img: "https://images.unsplash.com/photo-1583091993444-a957dbd7baaa?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Bodom", active: [3], img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=800" }, 
        { name: "Qishki Sabzi", active: [3], img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800" } 
      ]
    },
    packaging: {
      title: "Fura va Palet Sig'imi",
      subtitle: "Xalqaro logistika standartlari asosida mahsulotlaringizni xavfsiz qadoqlash sxemasi.",
      truck: "1 Fura (Refrijerator)",
      truckDesc: "Harorat rejimi: +2°C / +4°C. Umumiy hajm: 20-22 tonna. Tranzitga to'liq moslangan.",
      pallet: "33 ta Evro Palet",
      palletDesc: "1200x800 mm o'lchamdagi sertifikatlangan, fumigatsiyadan o'tgan yog'och paletlar.",
      boxes: "100-120 ta Yashik / Palet",
      boxesDesc: "5 qavatli sifatli gofrotara yoki plastik eksport yashiklari. Qatorlar orasi qistirmalar."
    },
    calculator: {
      title: "Logistika va Tranzit Kalkulyatori",
      subtitle: "Yukingiz hajmi va manzilingizni kiriting, biz sizga taxminiy vaqt va transportni hisoblab beramiz.",
      countryLabel: "Davlat (Manzil):",
      transLabel: "Transport turi:",
      weightLabel: "Yuk hajmi (tonna):",
      btn: "Hisoblash",
      resTitle: "Dastlabki Hisob-kitob (Taxminiy):",
      resTime: "Taxminiy tranzit vaqti:",
      resCount: "Kerakli transport:",
      disclaimer: "* Eslatma: Barcha ko'rsatilgan raqamlar, vaqt va narxlar o'rtacha taxminiy bo'lib, ob-havo, bojxona va mavsumga qarab o'zgarishi mumkin.",
      orderBtn: "Shu ma'lumot bilan narx so'rash"
    },
    team: {
      title: "Bizning Jamoa",
      subtitle: "Eksport jarayonini yuqori darajada va uzluksiz ta'minlovchi professionallar.",
      members: [
        { name: "Sardor Rahimov", role: "Boshqaruvchi Direktor (CEO)", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
        { name: "Alisher Usmonov", role: "Eksport Bo'limi Boshlig'i", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
        { name: "Malika Karimova", role: "Sifat Nazorati Menejeri", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
        { name: "Jasur Bekmurodov", role: "Logistika va Tranzit", img: "https://images.unsplash.com/photo-1556969562-b7b8089b09ad?auto=format&fit=crop&q=80&w=400" }
      ]
    },
    customs: {
      title: "Bojxona va Hujjatlar",
      subtitle: "Biz yuridik toza ishlaymiz. Hujjat namunasini ko'rish uchun ustiga bosing.",
      docs: [
        { title: "Fitosanitariya Sertifikati", desc: "Karantin nazoratidan o'tganini tasdiqlovchi hujjat.", sample: "Fitosanitariya namunasi" },
        { title: "ST-1 Kelib Chiqish Sert.", desc: "Bojxona bojlaridan imtiyoz olish uchun.", sample: "ST-1 sertifikat namunasi" },
        { title: "Bojxona Deklaratsiyasi (EX-1)", desc: "Eksport rasmiylashtiruvi (yashil yo'lak).", sample: "EX-1 namunasi" },
        { title: "Sifat Sertifikatlari", desc: "Global G.A.P, ISO xulosalari.", sample: "Sifat sertifikati namunasi" }
      ],
      modalTitle: "Hujjat Namunasi (Taxminiy)"
    },
    faq: {
      title: "Tez-tez So'raladigan Savollar",
      items: [
        { q: "Minimal buyurtma hajmi qancha?", a: "Avtomobil transporti (fura) uchun minimal hajm 20-22 tonna. Avia yuklar uchun esa minimal 1-5 tonnadan boshlanadi." },
        { q: "To'lov shartlari qanday?", a: "Biz asosan FCA va DAP shartlarida ishlaymiz. To'lovlar bank o'tkazmasi orqali, qisman oldindan to'lov va yuklanganidan so'ng qoldiq to'lov asosida yoki akkreditiv (LC) orqali amalga oshiriladi." },
        { q: "Mahsulot sifati qanday kafolatlanadi?", a: "Barcha mahsulotlar yuklanishdan oldin mustaqil ekspertiza yoki Fitosanitariya xizmati nazoratidan o'tadi. Furalarga haroratni nazorat qiluvchi datchiklar o'rnatiladi." },
        { q: "Bojxona rasmiylashtiruvi qancha vaqt oladi?", a: "O'zbekistonda yashil yo'lak tizimi orqali bojxona rasmiylashtiruvi 2-4 soat ichida hal qilinadi. Barcha ST-1 va Fito sertifikatlar biz tomondan tayyorlanadi." }
      ]
    },
    contact: {
      title: "Ulgurji Buyurtma Berish",
      subtitle: "Bugunning o'zida joriy ulgurji narxlar va zavodingizgacha bo'lgan logistika narxini hisoblatib oling.",
      address: "O'zbekiston, Surxondaryo viloyati, Termiz sh., Agro-Zon MFY",
      call: "Qo'ng'iroq qilish",
      whatsapp: "WhatsApp'da yozish"
    }
  },
  ru: {
    nav: { home: "Главная", about: "О компании", catalog: "Каталог", calendar: "Сезонность", logistics: "Логистика", calculator: "Калькулятор", faq: "FAQ", contact: "Контакты", download: "Каталог (PDF)" },
    hero: {
      title: "Surxondaryo Agro Export — Оптовый Поставщик",
      subtitle: "Свежие фрукты и овощи, упакованные в тару и откалиброванные по международным стандартам для рынков СНГ и Европы.",
      cta1: "Смотреть каталог",
      cta2: "Получить расчет",
      anim: {
        step1: "1. Посадка",
        step1Sub: "Натуральный уход",
        step2: "2. Сбор и Сортировка",
        step2Sub: "Контроль качества",
        step3: "3. Упаковка",
        step3Sub: "Укладка в тару",
        step4: "4. Экспорт",
        step4Sub: "Доставка клиенту"
      }
    },
    certs: ["Сертификат Global G.A.P.", "Фитосанитарный Контроль", "ISO 9001:2015 Качество", "100% Юридическая Чистота", "Стандарт Упаковки MAP"],
    video: {
      title: "Процесс Экспорта",
      subtitle: "Ознакомьтесь с полным циклом: от сбора на полях до погрузки в рефрижераторы.",
      caption: "Контроль качества и упаковка"
    },
    about: {
      title: "О Нашей Компании",
      subtitle: "ООО Agro-Surxon Export – ваш надежный партнер на южных воротах Узбекистана.",
      text1: "На протяжении более 10 лет мы занимаемся выращиванием, сортировкой, упаковкой и экспортом лучшей сельскохозяйственной продукции Сурхандарьинской области на международные рынки.",
      text2: "Наше предприятие полностью оснащено современными холодильными камерами, калибровочным оборудованием и упаковочными линиями, что гарантирует стабильную поставку качественной продукции, соответствующей международным стандартам.",
      points: [
        "Современные упаковочные линии и склады",
        "Холодильные камеры вместимостью более 1500 тонн",
        "Удобное логистическое расположение рядом с таможней"
      ]
    },
    products: {
      title: "Экспортный Каталог",
      subtitle: "Наша продукция надежно упакована и готова к длительной транспортировке.",
      categories: [
        { id: 'all', label: "Все товары" },
        { id: 'fruits', label: "Фрукты" },
        { id: 'veg', label: "Овощи" },
        { id: 'melon', label: "Бахчевые" },
        { id: 'dried', label: "Сухофрукты" },
        { id: 'nuts', label: "Орехи" },
        { id: 'legumes', label: "Бобовые" }
      ],
      avail: "В наличии",
      season: "Сезонный",
      details: "Подробнее",
      moq: "Мин. заказ:",
      pack: "Упаковка:",
      caliber: "Калибр/Сорт:",
      orderBtn: "Узнать цену (WhatsApp)",
      items: [
        { id: 1, cat: 'fruits', name: "Сурханский Гранат", status: "avail", img: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80&w=800", moq: "20 тонн (1 Фура)", pack: "Деревянный ящик (10 кг), Гофротара", caliber: "70-100мм, 1-сорт", desc: "Толстокорый, крупный гранат для экспорта. Выложен в 2 ряда в ящиках. Отлично переносит длительную транспортировку." },
        { id: 2, cat: 'fruits', name: "Черный Виноград (Тойфи)", status: "avail", img: "https://images.unsplash.com/photo-1596431985959-1c998f480eec?auto=format&fit=crop&q=80&w=800", moq: "10 тонн", pack: "Пластиковый ящик (8 кг)", caliber: "Крупный, сладость 18-22 brix", desc: "Виноград, сохраненный в холодильных камерах. Упакован в пластиковые ящики с бумажной подстилкой и пакетами SO2." },
        { id: 3, cat: 'fruits', name: "Ранняя Черешня", status: "season", img: "https://images.unsplash.com/photo-1528820600606-0ef5600cbfee?auto=format&fit=crop&q=80&w=800", moq: "5 тонн (Авиа)", pack: "Гофроящик + MAP пакет (5 кг)", caliber: "26mm - 32mm+", desc: "Премиальная черешня, прошедшая гидрокулинг. Упаковывается с использованием MAP технологии для длительного срока годности." },
        { id: 4, cat: 'veg', name: "Лук Экспортный (Желтый/Красный)", status: "avail", img: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&q=80&w=800", moq: "22 тонны", pack: "Сетки (25-30 кг)", caliber: "5-7 см, абсолютно сухой", desc: "Тщательно высушенный лук, откалиброванный и упакованный в сетки, идеально для длительного хранения." },
        { id: 5, cat: 'veg', name: "Тепличный Томат", status: "avail", img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=800", moq: "15 тонн", pack: "5-слойная гофротара (10 кг)", caliber: "Розовый/Красный, 150-200 гр", desc: "Уложены в 2 ряда в картонные коробки с прокладками. Гарантия доставки без повреждений." },
        { id: 6, cat: 'melon', name: "Дыня (Осенняя)", status: "season", img: "https://images.unsplash.com/photo-1598025555678-83141ba57519?auto=format&fit=crop&q=80&w=800", moq: "20 тонн", pack: "Короб или сетка", caliber: "3-5 кг / шт", desc: "Сладкие поздние сорта. Экспортируется в страны СНГ в сетках или больших картонных гофрокоробах." },
        { id: 7, cat: 'melon', name: "Арбуз", status: "season", img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=800", moq: "20 тонн", pack: "Контейнер-паллет (Bulk)", caliber: "7-12 кг", desc: "Арбузы с толстой кожурой, устойчивые к транзиту. Загружаются в фуры на специальных поддонах." },
        { id: 8, cat: 'dried', name: "Изюм и Сухофрукты", status: "avail", img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800", moq: "5 тонн", pack: "Картон (10 кг) + Полиэтилен", caliber: "Премиум, очищенный", desc: "Оптовые сухофрукты, прошедшие лазерную сортировку (Color Sorter) с чистотой 99%." },
        { id: 9, cat: 'nuts', name: "Миндаль в скорлупе", status: "avail", img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=800", moq: "3 тонны", pack: "Мешок (25-30 кг)", caliber: "Крупный, бумажная скорлупа", desc: "Экологически чистый миндаль из горных районов, упакованный в мешки." },
        { id: 10, cat: 'legumes', name: "Маш (Бобовые)", status: "avail", img: "https://images.unsplash.com/photo-1583091993444-a957dbd7baaa?auto=format&fit=crop&q=80&w=800", moq: "22 тонны", pack: "Полипропилен мешок (50 кг)", caliber: "3.2mm - 4.0mm+", desc: "Экспортный маш заводской очистки (99%), откалиброванный и упакованный в надежные мешки." }
      ]
    },
    seasonality: {
      title: "Интерактивная Сезонность",
      subtitle: "Выберите сезон ниже, чтобы узнать, какие продукты готовы к экспорту.",
      seasons: ["Весна", "Лето", "Осень", "Зима"],
      emptyMsg: "В этом сезоне ожидается новый урожай.",
      items: [
        // Весна (Spring)
        { name: "Ранняя Черешня", active: [0], img: "https://images.unsplash.com/photo-1528820600606-0ef5600cbfee?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Клубника", active: [0], img: "https://images.unsplash.com/photo-1587324438673-56c802dc28bd?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Ранний Абрикос", active: [0], img: "https://images.unsplash.com/photo-1622359489955-4700d2da0737?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Молодой Картофель", active: [0], img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Свежий Чеснок", active: [0], img: "https://images.unsplash.com/photo-1540148426940-664dc15f1066?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Ранняя Капуста", active: [0], img: "https://images.unsplash.com/photo-1596484552834-0a3733b1e062?auto=format&fit=crop&q=80&w=400" }, 
        
        // Лето (Summer)
        { name: "Персик", active: [1], img: "https://images.unsplash.com/photo-1630138944510-449e21935de9?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Арбуз", active: [1], img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Дыня", active: [1], img: "https://images.unsplash.com/photo-1598025555678-83141ba57519?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Слива", active: [1], img: "https://images.unsplash.com/photo-1600862086300-8cb4948a31db?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Инжир", active: [1], img: "https://images.unsplash.com/photo-1601379327928-bee0a1cb00ce?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Томат (Полевой)", active: [1], img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=400" }, 
        
        // Осень (Autumn)
        { name: "Сурханский Гранат", active: [2], img: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Поздний Виноград", active: [2], img: "https://images.unsplash.com/photo-1596431985959-1c998f480eec?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Хурма", active: [2], img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Красное Яблоко", active: [2], img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Лук Экспортный", active: [2], img: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Грецкий Орех", active: [2], img: "https://images.unsplash.com/photo-1554904257-27b2b00eefbd?auto=format&fit=crop&q=80&w=400" }, 

        // Зима (Winter)
        { name: "Томаты (Теплица)", active: [3], img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Лимон и Цитрус", active: [3], img: "https://images.unsplash.com/photo-1587317765103-605809783f98?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Сухофрукты", active: [3], img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Маш (Бобовые)", active: [3], img: "https://images.unsplash.com/photo-1583091993444-a957dbd7baaa?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Миндаль", active: [3], img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=400" }, 
        { name: "Зимняя Морковь", active: [3], img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400" } 
      ]
    },
    packaging: {
      title: "Схема Упаковки и Погрузки",
      subtitle: "Надежная схема упаковки по международным стандартам логистики.",
      truck: "1 Фура (Рефрижератор)",
      truckDesc: "Температурный режим: +2°C / +4°C. Общий объем: 20-22 тонны.",
      pallet: "33 Евро Паллета",
      palletDesc: "Сертифицированные деревянные паллеты 1200x800 мм (с фумигацией).",
      boxes: "100-120 Ящиков / Паллет",
      boxesDesc: "5-слойная гофротара или пластиковые ящики. Прокладки между рядами."
    },
    calculator: {
      title: "Калькулятор Логистики",
      subtitle: "Введите объем груза и пункт назначения, мы рассчитаем примерное время транзита и количество транспорта.",
      countryLabel: "Страна назначения:",
      transLabel: "Вид транспорта:",
      weightLabel: "Объем груза (тонн):",
      btn: "Рассчитать",
      resTitle: "Предварительный расчет (Примерно):",
      resTime: "Примерное время транзита:",
      resCount: "Необходимый транспорт:",
      disclaimer: "* Примечание: Все указанные цифры, сроки и цены являются ориентировочными и могут меняться в зависимости от погоды, таможни и сезона.",
      orderBtn: "Запросить цену с этим расчетом"
    },
    team: {
      title: "Наша Команда",
      subtitle: "Профессионалы, обеспечивающие высокий уровень экспортного процесса.",
      members: [
        { name: "Сардор Рахимов", role: "Генеральный Директор (CEO)", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
        { name: "Алишер Усманов", role: "Начальник Отдела Экспорта", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
        { name: "Малика Каримова", role: "Менеджер Контроля Качества", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
        { name: "Жасур Бекмуродов", role: "Отдел Логистики и Транзита", img: "https://images.unsplash.com/photo-1556969562-b7b8089b09ad?auto=format&fit=crop&q=80&w=400" }
      ]
    },
    customs: {
      title: "Таможня и Документы",
      subtitle: "Мы работаем легально. Нажмите на документ, чтобы посмотреть образец.",
      docs: [
        { title: "Фитосанитарный Сертификат", desc: "Подтверждает прохождение карантина.", sample: "Образец Фитосанитарного сертификата" },
        { title: "Сертификат Происхождения СТ-1", desc: "Для льгот по пошлинам в СНГ.", sample: "Образец сертификата СТ-1" },
        { title: "Таможенная Декларация (ЭК-10)", desc: "Экспортное оформление.", sample: "Образец ЭК-10" },
        { title: "Сертификаты Качества", desc: "Global G.A.P, ISO заключения.", sample: "Образец сертификата качества" }
      ],
      modalTitle: "Образец документа (Примерный)"
    },
    faq: {
      title: "Частые Вопросы",
      items: [
        { q: "Какой минимальный объем заказа?", a: "Для автотранспорта (фура) минимальный объем составляет 20-22 тонны. Для авиаперевозок от 1 до 5 тонн." },
        { q: "Каковы условия оплаты?", a: "Мы работаем в основном на условиях FCA и DAP. Оплата банковским переводом: частичная предоплата и остаток по факту загрузки, либо аккредитив (LC)." },
        { q: "Как гарантируется качество продукции?", a: "Вся продукция проходит фитосанитарный контроль перед отгрузкой. В фуры устанавливаются датчики температуры (термописцы)." },
        { q: "Сколько времени занимает таможня?", a: "Оформление в Узбекистане через зеленый коридор занимает 2-4 часа. Все сертификаты (СТ-1, Фито) мы готовим сами." }
      ]
    },
    contact: {
      title: "Оформить Оптовый Заказ",
      subtitle: "Свяжитесь с нами прямо сейчас, чтобы получить текущие ориентировочные оптовые цены и расчет логистики.",
      address: "Узбекистан, Сурхандарьинская обл., г. Термез, Агро-Зона",
      call: "Позвонить",
      whatsapp: "Написать в WhatsApp"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('uz'); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSeason, setActiveSeason] = useState(0);
  
  const [openFaq, setOpenFaq] = useState(null);
  
  // Calculator State
  const [calcCountry, setCalcCountry] = useState('Rossiya');
  const [calcTransport, setCalcTransport] = useState('Fura');
  const [calcWeight, setCalcWeight] = useState(20);
  const [calcResult, setCalcResult] = useState(null);

  // Document Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  const t = content[lang];

  useEffect(() => {
    injectStyles();
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProduct || selectedDoc) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProduct, selectedDoc]);

  const toggleLang = () => setLang(lang === 'uz' ? 'ru' : 'uz');

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? t.products.items 
    : t.products.items.filter(item => item.cat === activeCategory);

  const activeSeasonItems = t.seasonality.items.filter(item => item.active.includes(activeSeason));

  const handleOrder = (productName) => {
    const msg = lang === 'uz' 
      ? `Salom! Men ${productName} bo'yicha ulgurji narx (taxminiy) va eksport shartlarini bilmoqchi edim.`
      : `Здравствуйте! Я хочу узнать ориентировочные оптовые цены и условия экспорта на ${productName}.`;
    window.open(`https://wa.me/998982703797?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const calculateLogistics = () => {
    let time = "3-7 kun (dney)";
    if(calcCountry === 'Rossiya') time = calcTransport === 'Avia' ? "24-48 soat/часов" : (calcTransport === 'Vagon' ? "12-15 kun/дней" : "5-8 kun/дней");
    if(calcCountry === 'Qozog\'iston' || calcCountry === 'Казахстан') time = calcTransport === 'Avia' ? "24 soat/часов" : (calcTransport === 'Vagon' ? "7-10 kun/дней" : "3-5 kun/дней");
    if(calcCountry === 'Yevropa' || calcCountry === 'Европа') time = calcTransport === 'Avia' ? "48-72 soat/часов" : "12-18 kun/дней";

    const capacity = calcTransport === 'Fura' ? 20 : (calcTransport === 'Vagon' ? 60 : 5);
    const count = Math.ceil(calcWeight / capacity);
    
    setCalcResult({ time, count, transportName: calcTransport });
  };

  const handleCalcOrder = () => {
    const msg = lang === 'uz'
      ? `Salom. Menga ${calcCountry}ga ${calcWeight} tonna yuk uchun ${calcResult.count} ta ${calcResult.transportName} kerak. Narxlarni aytib yuboring.`
      : `Здравствуйте. Мне нужно в ${calcCountry} доставить ${calcWeight} тонн. Понадобится ${calcResult.count} ${calcResult.transportName}. Сообщите цены.`;
    window.open(`https://wa.me/998982703797?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getDocIcon = (idx) => {
    if(idx === 0) return <Sprout className="w-8 h-8 text-[#0F3D2E]" />;
    if(idx === 1) return <Globe2 className="w-8 h-8 text-[#0F3D2E]" />;
    if(idx === 2) return <FileSignature className="w-8 h-8 text-[#0F3D2E]" />;
    return <Award className="w-8 h-8 text-[#0F3D2E]" />;
  };

  return (
    <div className="relative min-h-screen text-[#1A1A1A] overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-[#0F3D2E]/90 backdrop-blur-md py-5 text-white'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <Leaf className={`w-8 h-8 ${isScrolled ? 'text-[#0F3D2E]' : 'text-[#C9A14A]'}`} />
            <span className={`font-serif font-bold text-2xl tracking-wide ${isScrolled ? 'text-[#0F3D2E]' : 'text-white'}`}>
              Agro<span className="text-[#C9A14A]">Surxon</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            <button onClick={() => scrollTo('about')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.about}</button>
            <button onClick={() => scrollTo('catalog')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.catalog}</button>
            <button onClick={() => scrollTo('seasonality')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.calendar}</button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.calculator}</button>
            <button onClick={() => scrollTo('team')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.team.title}</button>
            
            <button onClick={toggleLang} className="flex items-center gap-1 hover:text-[#C9A14A] transition-colors font-bold border-l border-gray-400 pl-4 ml-2">
              <Globe className="w-4 h-4" /> {lang.toUpperCase()}
            </button>

            <button className={`flex items-center gap-2 px-5 py-2 rounded-full border border-[#C9A14A] font-semibold transition-all hover:bg-[#C9A14A] hover:text-[#0F3D2E] ${isScrolled ? 'text-[#0F3D2E]' : 'text-[#C9A14A]'}`}>
              <Download className="w-4 h-4" /> {t.nav.download}
            </button>
            <button onClick={() => scrollTo('contact')} className="bg-[#0F3D2E] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#0a291f] transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Aloqa
            </button>
          </div>

          <div className="xl:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="font-bold">{lang.toUpperCase()}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col gap-4 text-[#0F3D2E] animate-fade-in z-50">
            <button onClick={() => scrollTo('about')} className="text-left text-lg font-medium py-2 border-b border-gray-100">{t.nav.about}</button>
            <button onClick={() => scrollTo('catalog')} className="text-left text-lg font-medium py-2 border-b border-gray-100">{t.nav.catalog}</button>
            <button onClick={() => scrollTo('seasonality')} className="text-left text-lg font-medium py-2 border-b border-gray-100">{t.nav.calendar}</button>
            <button onClick={() => scrollTo('calculator')} className="text-left text-lg font-medium py-2 border-b border-gray-100">{t.nav.calculator}</button>
            <button onClick={() => scrollTo('team')} className="text-left text-lg font-medium py-2 border-b border-gray-100">{t.team.title}</button>
            <button className="flex items-center gap-2 text-[#C9A14A] font-bold py-2"><Download className="w-5 h-5"/> {t.nav.download}</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0F3D2E] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587334274328-64186a80aee6?auto=format&fit=crop&q=80&w=2000" 
            alt="Agriculture Export Warehouse" 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D2E] via-[#0F3D2E]/90 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A14A]/20 border border-[#C9A14A]/30 text-[#C9A14A] font-semibold text-sm mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4" /> B2B Export Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('catalog')} className="bg-[#C9A14A] text-[#0F3D2E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b59040] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,161,74,0.4)] hover:-translate-y-1">
                <LayoutGrid className="w-5 h-5" /> {t.hero.cta1}
              </button>
              <button onClick={() => scrollTo('calculator')} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0F3D2E] transition-all flex items-center justify-center gap-2">
                {t.hero.cta2} <ArrowRight className="w-5 h-5"/>
              </button>
            </div>
          </div>

          {/* Right Animation (Export Flow) */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative h-[450px]">
            
            {/* Background Glow */}
            <div className="absolute w-64 h-64 bg-[#C9A14A]/10 rounded-full blur-3xl"></div>

            {/* Timeline Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-white/10 transform -translate-x-1/2 rounded-full overflow-hidden">
              {/* Moving Highlight */}
              <div className="absolute left-0 w-full bg-gradient-to-b from-transparent via-[#C9A14A] to-transparent animate-[moveDown_3s_linear_infinite]" style={{height: '40%'}}></div>
            </div>

            <div className="flex flex-col justify-between h-full w-full max-w-md z-10 relative py-4">

              {/* Step 1 */}
              <div className="flex items-center gap-6 w-full group">
                 <div className="w-1/2 flex justify-end">
                    <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-right transition-transform group-hover:scale-105">
                       <p className="text-white font-bold text-lg">{t.hero.anim.step1}</p>
                       <p className="text-[#C9A14A] text-xs font-semibold uppercase tracking-wider">{t.hero.anim.step1Sub}</p>
                    </div>
                 </div>
                 <div className="w-12 h-12 bg-[#0F3D2E] border-2 border-[#C9A14A] rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(201,161,74,0.4)]">
                    <Sprout className="w-5 h-5 text-white" />
                 </div>
                 <div className="w-1/2"></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-6 w-full flex-row-reverse group">
                 <div className="w-1/2 flex justify-start">
                    <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left transition-transform group-hover:scale-105">
                       <p className="text-white font-bold text-lg">{t.hero.anim.step2}</p>
                       <p className="text-[#C9A14A] text-xs font-semibold uppercase tracking-wider">{t.hero.anim.step2Sub}</p>
                    </div>
                 </div>
                 <div className="w-12 h-12 bg-[#0F3D2E] border-2 border-[#C9A14A] rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(201,161,74,0.4)]">
                    <Filter className="w-5 h-5 text-white" />
                 </div>
                 <div className="w-1/2"></div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-6 w-full group">
                 <div className="w-1/2 flex justify-end">
                    <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-right transition-transform group-hover:scale-105">
                       <p className="text-white font-bold text-lg">{t.hero.anim.step3}</p>
                       <p className="text-[#C9A14A] text-xs font-semibold uppercase tracking-wider">{t.hero.anim.step3Sub}</p>
                    </div>
                 </div>
                 <div className="w-12 h-12 bg-[#0F3D2E] border-2 border-[#C9A14A] rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(201,161,74,0.4)]">
                    <Boxes className="w-5 h-5 text-white" />
                 </div>
                 <div className="w-1/2"></div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-6 w-full flex-row-reverse group">
                 <div className="w-1/2 flex justify-start">
                    <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left transition-transform group-hover:scale-105">
                       <p className="text-white font-bold text-lg">{t.hero.anim.step4}</p>
                       <p className="text-[#C9A14A] text-xs font-semibold uppercase tracking-wider">{t.hero.anim.step4Sub}</p>
                    </div>
                 </div>
                 <div className="w-12 h-12 bg-[#0F3D2E] border-2 border-[#C9A14A] rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(201,161,74,0.4)]">
                    <Truck className="w-5 h-5 text-white" />
                 </div>
                 <div className="w-1/2"></div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- TRUST BANNER (CERTIFICATES) --- */}
      <div className="bg-[#082219] py-4 overflow-hidden border-b border-white/10">
        <div className="flex w-[200%]">
          <div className="cert-scroll gap-8 md:gap-16 items-center w-full px-8">
            {[...t.certs, ...t.certs, ...t.certs].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-5 h-5 text-[#C9A14A]" />
                <span className="text-white font-bold uppercase tracking-wider text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ABOUT US SECTION (NEW) --- */}
      <section id="about" className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               
               {/* Left: Image */}
               <div className="lg:w-1/2 w-full relative">
                  <div className="absolute -inset-4 border-2 border-[#C9A14A]/30 rounded-3xl transform -rotate-2"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
                     <img src="https://images.unsplash.com/photo-1605370617300-802613ceebec?auto=format&fit=crop&q=80&w=1000" alt="Company Facility" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/80 via-transparent to-transparent"></div>
                     <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                        <Building2 className="w-10 h-10 text-[#C9A14A]" />
                        <div>
                           <p className="font-bold text-xl">Agro-Surxon Export</p>
                           <p className="text-sm opacity-90">{lang === 'uz' ? "Termiz sh., O'zbekiston" : "г. Термез, Узбекистан"}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right: Info */}
               <div className="lg:w-1/2 w-full flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6 leading-tight">{t.about.title}</h2>
                  <h3 className="text-xl text-[#C9A14A] font-semibold mb-6">{t.about.subtitle}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-lg">{t.about.text1}</p>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">{t.about.text2}</p>
                  
                  <ul className="space-y-4 mb-8">
                     {t.about.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                           <div className="w-6 h-6 rounded-full bg-[#C9A14A]/20 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-[#C9A14A]" />
                           </div>
                           <span className="font-semibold text-[#1A1A1A]">{point}</span>
                        </li>
                     ))}
                  </ul>

                  <button onClick={() => scrollTo('contact')} className="bg-[#0F3D2E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a291f] transition-all flex items-center justify-center gap-2 w-max shadow-lg">
                    {t.contact.call} <ArrowRight className="w-5 h-5"/>
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* --- E-COMMERCE CATALOG (WHOLESALE) --- */}
      <section id="catalog" className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Centered Title and Subtitle */}
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.products.title}</h2>
            <p className="text-gray-600 max-w-2xl text-lg mb-8">{t.products.subtitle}</p>
            
            {/* Category Filters below centered text */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex overflow-x-auto max-w-full no-scrollbar gap-2">
              {t.products.categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#0F3D2E] text-[#C9A14A] shadow-md transform scale-105' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#0F3D2E]'}`}
                >
                  {cat.id === 'all' && <LayoutGrid className="w-4 h-4" />}
                  {cat.id === 'fruits' && <Sun className="w-4 h-4" />}
                  {cat.id === 'veg' && <Leaf className="w-4 h-4" />}
                  {cat.id === 'melon' && <Droplets className="w-4 h-4" />}
                  {cat.id === 'dried' && <Package className="w-4 h-4" />}
                  {cat.id === 'nuts' && <Hexagon className="w-4 h-4" />}
                  {cat.id === 'legumes' && <Sprout className="w-4 h-4" />}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                  <div className="absolute top-4 left-4 z-10">
                    {prod.status === 'avail' ? (
                       <span className="bg-[#0F3D2E]/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                         <CheckCircle className="w-3 h-3 text-[#C9A14A]" /> {t.products.avail}
                       </span>
                    ) : (
                       <span className="bg-[#C9A14A]/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                         ⏳ {t.products.season}
                       </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[#0F3D2E]/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                     <span className="bg-white text-[#0F3D2E] px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                       <Eye className="w-4 h-4"/> {t.products.details}
                     </span>
                  </div>
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-3 line-clamp-1" title={prod.name}>{prod.name}</h3>
                  <div className="space-y-2 mb-6 text-sm text-gray-600 flex-grow">
                    <p className="flex justify-between border-b border-gray-50 pb-1">
                      <span className="text-gray-400">{t.products.pack}</span> 
                      <span className="font-semibold text-[#1A1A1A] text-right ml-2 line-clamp-1">{prod.pack.split('(')[0]}</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-50 pb-1">
                      <span className="text-gray-400">{t.products.moq}</span> 
                      <span className="font-semibold text-[#1A1A1A] text-right ml-2">{prod.moq}</span>
                    </p>
                  </div>
                  <button onClick={() => setSelectedProduct(prod)} className="w-full bg-gray-50 text-[#0F3D2E] py-3 rounded-xl font-bold hover:bg-[#0F3D2E] hover:text-white transition-colors flex justify-center items-center gap-2">
                    <Eye className="w-4 h-4"/> {t.products.details}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEASONALITY CALENDAR (INTERACTIVE REDESIGN) --- */}
      <section id="seasonality" className="py-20 bg-white border-t border-gray-100">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <CalendarDays className="w-12 h-12 text-[#C9A14A] mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.seasonality.title}</h2>
              <p className="text-gray-600 text-lg">{t.seasonality.subtitle}</p>
            </div>

            {/* Interactive Season Selector (4 Seasons) */}
            <div className="bg-[#FAFAFA] border border-gray-100 rounded-3xl p-4 md:p-6 mb-10 shadow-sm max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {t.seasonality.seasons.map((season, i) => {
                    let Icon = Sprout;
                    if(i===1) Icon = Sun;
                    if(i===2) Icon = Leaf;
                    if(i===3) Icon = Snowflake;

                    return (
                      <button
                         key={i}
                         onClick={() => setActiveSeason(i)}
                         className={`flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-2xl font-bold text-lg transition-all duration-300 ${activeSeason === i ? 'bg-[#0F3D2E] text-[#C9A14A] shadow-xl transform scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 hover:border-[#C9A14A]/50'}`}
                      >
                         <Icon className={`w-8 h-8 ${activeSeason === i ? 'text-[#C9A14A]' : 'text-gray-400'}`} />
                         {season}
                      </button>
                    )
                 })}
              </div>
            </div>

            {/* Render Active Items for selected season */}
            {activeSeasonItems.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {activeSeasonItems.map((item, idx) => (
                     <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group relative">
                        <div className="h-64 overflow-hidden relative">
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/90 to-transparent z-10"></div>
                           <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute bottom-6 left-6 z-20">
                              <span className="text-white font-bold text-lg flex items-center gap-2 drop-shadow-md">
                                 <CheckCircle2 className="w-5 h-5 text-[#C9A14A]" /> {item.name}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-500">{t.seasonality.emptyMsg}</p>
               </div>
            )}
         </div>
      </section>

      {/* --- PACKAGING SCHEMA --- */}
      <section className="py-20 bg-[#0F3D2E] text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A14A]/10 rounded-full blur-3xl"></div>
         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Layers className="w-12 h-12 text-[#C9A14A] mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.packaging.title}</h2>
              <p className="text-gray-300 text-lg">{t.packaging.subtitle}</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
               {/* Truck */}
               <div className="glass-card p-8 rounded-3xl w-full md:w-1/3 text-center transform hover:-translate-y-2 transition-transform">
                  <Truck className="w-16 h-16 text-[#C9A14A] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{t.packaging.truck}</h3>
                  <p className="text-gray-400 text-sm">{t.packaging.truckDesc}</p>
               </div>
               
               <ChevronRight className="hidden md:block w-10 h-10 text-gray-500" />
               
               {/* Pallet */}
               <div className="glass-card p-8 rounded-3xl w-full md:w-1/3 text-center transform hover:-translate-y-2 transition-transform">
                  <AlignJustify className="w-16 h-16 text-[#C9A14A] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{t.packaging.pallet}</h3>
                  <p className="text-gray-400 text-sm">{t.packaging.palletDesc}</p>
               </div>

               <ChevronRight className="hidden md:block w-10 h-10 text-gray-500" />

               {/* Boxes */}
               <div className="glass-card p-8 rounded-3xl w-full md:w-1/3 text-center transform hover:-translate-y-2 transition-transform">
                  <Package className="w-16 h-16 text-[#C9A14A] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{t.packaging.boxes}</h3>
                  <p className="text-gray-400 text-sm">{t.packaging.boxesDesc}</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- LOGISTICS CALCULATOR --- */}
      <section id="calculator" className="py-20 bg-[#FAFAFA]">
         <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
               
               <div className="lg:w-1/2 w-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A14A]/20 text-[#C9A14A] mb-6">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F3D2E] mb-4">{t.calculator.title}</h2>
                  <p className="text-gray-600 mb-8">{t.calculator.subtitle}</p>

                  <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">{t.calculator.countryLabel}</label>
                        <select 
                           value={calcCountry}
                           onChange={(e) => setCalcCountry(e.target.value)}
                           className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#C9A14A] focus:ring-1 focus:ring-[#C9A14A] outline-none text-[#0F3D2E] font-medium bg-gray-50 appearance-none"
                        >
                           <option value="Rossiya">{lang === 'uz' ? 'Rossiya (Moskva, Piter)' : 'Россия (Москва, Питер)'}</option>
                           <option value="Qozog'iston">{lang === 'uz' ? "Qozog'iston (Olmaota, Ostona)" : 'Казахстан (Алматы, Астана)'}</option>
                           <option value="Belarus">{lang === 'uz' ? "Belarus (Minsk)" : 'Беларусь (Минск)'}</option>
                           <option value="Yevropa">{lang === 'uz' ? "Yevropa Ittifoqi (Latviya orqali)" : 'Евросоюз (через Латвию)'}</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">{t.calculator.transLabel}</label>
                        <div className="flex gap-4">
                           {['Fura', 'Vagon', 'Avia'].map(tr => (
                              <button 
                                 key={tr}
                                 onClick={() => setCalcTransport(tr)}
                                 className={`flex-1 py-3 rounded-xl font-bold border transition-all ${calcTransport === tr ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#C9A14A]'}`}
                              >
                                 {tr}
                              </button>
                           ))}
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">{t.calculator.weightLabel} <span className="text-[#0F3D2E]">{calcWeight} tonna</span></label>
                        <input 
                           type="range" 
                           min="1" max="120" step="1"
                           value={calcWeight}
                           onChange={(e) => setCalcWeight(e.target.value)}
                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A14A]"
                        />
                     </div>
                     <button 
                        onClick={calculateLogistics}
                        className="w-full bg-[#C9A14A] text-[#0F3D2E] py-4 rounded-xl font-bold text-lg hover:bg-[#b59040] transition-colors shadow-lg"
                     >
                        {t.calculator.btn}
                     </button>
                  </div>
               </div>

               <div className="lg:w-1/2 w-full">
                  {calcResult ? (
                     <div className="bg-[#0F3D2E] rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A14A]/20 rounded-bl-full"></div>
                        <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">{t.calculator.resTitle}</h3>
                        
                        <div className="space-y-6 mb-8 relative z-10">
                           <div className="flex items-center justify-between border-b border-white/10 pb-4">
                              <span className="text-gray-300">{t.calculator.resTime}</span>
                              <span className="font-bold text-xl text-[#C9A14A]">{calcResult.time}</span>
                           </div>
                           <div className="flex items-center justify-between border-b border-white/10 pb-4">
                              <span className="text-gray-300">{t.calculator.resCount}</span>
                              <span className="font-bold text-xl text-[#C9A14A]">{calcResult.count} ta {calcResult.transportName}</span>
                           </div>
                        </div>

                        <p className="text-xs text-gray-400 mb-8 italic">{t.calculator.disclaimer}</p>

                        <button 
                           onClick={handleCalcOrder}
                           className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg relative z-10"
                        >
                           <Send className="w-5 h-5"/> {t.calculator.orderBtn}
                        </button>
                     </div>
                  ) : (
                     <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                        <Search className="w-16 h-16 mb-4 text-gray-300" />
                        <p className="font-medium">Chap tomondagi ma'lumotlarni kiriting va "Hisoblash" tugmasini bosing.</p>
                     </div>
                  )}
               </div>

            </div>
         </div>
      </section>

      {/* --- TEAM SECTION (NEW) --- */}
      <section id="team" className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <Users className="w-12 h-12 text-[#C9A14A] mx-auto mb-4" />
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.team.title}</h2>
               <p className="text-gray-600 text-lg">{t.team.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {t.team.members.map((member, idx) => (
                  <div key={idx} className="group text-center">
                     <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-[#FAFAFA] group-hover:border-[#C9A14A] transition-colors duration-300">
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <h3 className="text-xl font-bold text-[#0F3D2E] mb-1">{member.name}</h3>
                     <p className="text-[#C9A14A] font-bold text-xs uppercase tracking-widest">{member.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- CUSTOMS & DOCUMENTS --- */}
      <section id="customs" className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Scale className="w-12 h-12 text-[#C9A14A] mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.customs.title}</h2>
            <p className="text-gray-600 text-lg">{t.customs.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.customs.docs.map((doc, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedDoc(doc)}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#C9A14A] hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-[#FAFAFA] rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                   {getDocIcon(idx)}
                </div>
                <h4 className="font-bold text-lg text-[#0F3D2E] mb-2">{doc.title}</h4>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{doc.desc}</p>
                <span className="text-[#C9A14A] text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Eye className="w-4 h-4"/> Namuna
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-[#FAFAFA]">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 hover:bg-gray-100 flex justify-between items-center transition-colors"
                >
                  <span className="font-bold text-lg text-[#0F3D2E] pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C9A14A] transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 py-5 border-t border-gray-200' : 'max-h-0 py-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 bg-[#0F3D2E] relative text-white">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
            
            <div className="lg:w-1/2 flex flex-col">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{t.contact.title}</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">{t.contact.subtitle}</p>

              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                    <Phone className="w-6 h-6 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-medium mb-1">Telefon</p>
                    <a href="tel:+998982703797" className="text-2xl font-bold text-white hover:text-[#C9A14A] transition-colors">+998 98 270 37 97</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                    <Mail className="w-6 h-6 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-medium mb-1">Email</p>
                    <a href="mailto:export@agro-surxon.uz" className="text-xl font-bold text-white hover:text-[#C9A14A] transition-colors">export@agro-surxon.uz</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                    <MapPin className="w-6 h-6 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-medium mb-1">Manzil</p>
                    <p className="text-lg font-bold text-white">{t.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold text-[#0F3D2E] mb-6">Tezkor Bog'lanish</h3>
                <div className="flex flex-col gap-4">
                  <a href="tel:+998982703797" className="w-full bg-[#0F3D2E] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#0a291f] transition-all flex items-center justify-center gap-2 text-center shadow-lg">
                    <Phone className="w-5 h-5" /> {t.contact.call}
                  </a>
                  <a href="https://wa.me/998982703797" target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 text-center shadow-lg">
                     <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                     {t.contact.whatsapp}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#082219] text-gray-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-[#C9A14A]" />
            <span className="font-serif font-bold text-2xl text-white">Agro<span className="text-[#C9A14A]">Surxon</span></span>
          </div>
          <p className="text-sm font-medium">© {new Date().getFullYear()} Agro-Surxon Export LLC. {lang === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.'}</p>
        </div>
      </footer>

      {/* --- PRODUCT QUICK VIEW MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white rounded-full p-1 backdrop-blur transition-colors">
              <XCircle className="w-8 h-8 text-[#0F3D2E]" />
            </button>
            
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${selectedProduct.status === 'avail' ? 'bg-[#0F3D2E]' : 'bg-[#C9A14A]'}`}>
                   {selectedProduct.status === 'avail' ? t.products.avail : t.products.season}
                 </span>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-bold text-[#0F3D2E] mb-4">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{selectedProduct.desc}</p>
              
              <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#C9A14A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{t.products.pack}</p>
                    <p className="font-semibold text-[#1A1A1A]">{selectedProduct.pack}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C9A14A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{t.products.caliber}</p>
                    <p className="font-semibold text-[#1A1A1A]">{selectedProduct.caliber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#C9A14A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{t.products.moq}</p>
                    <p className="font-semibold text-[#1A1A1A]">{selectedProduct.moq}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleOrder(selectedProduct.name)}
                className="w-full bg-[#0F3D2E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a291f] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5"/> {t.products.orderBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DOCUMENT PREVIEW MODAL --- */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedDoc(null)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
               <h3 className="font-bold text-[#0F3D2E] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C9A14A]" /> {t.customs.modalTitle}
               </h3>
               <button onClick={() => setSelectedDoc(null)} className="hover:bg-gray-200 rounded-full p-1 transition-colors">
                 <X className="w-6 h-6 text-[#0F3D2E]" />
               </button>
            </div>
            
            <div className="p-4 bg-gray-200 flex-grow flex items-center justify-center overflow-auto relative">
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none z-10">
                  <BadgeCheck className="w-32 h-32 mb-4 text-[#0F3D2E]" />
                  <p className="text-4xl font-black uppercase tracking-widest text-[#0F3D2E]">NAMUNA</p>
               </div>
               <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800" alt="Document Sample" className="max-w-full max-h-[60vh] object-contain shadow-lg" />
            </div>
            
            <div className="p-4 bg-white text-center">
               <p className="font-bold text-[#0F3D2E] text-lg">{selectedDoc.title}</p>
               <p className="text-gray-500 text-sm mt-1">{selectedDoc.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- STICKY MOBILE CALL BUTTON --- */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 flex flex-col gap-3">
        <a href="https://wa.me/998982703797" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
      </div>

    </div>
  );
}