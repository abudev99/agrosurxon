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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
    
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #FAFAFA;
      color: #1A1A1A;
    }
    h1, h2, h3, h4, h5, h6, .font-serif {
      font-family: 'Merriweather', serif;
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #C9A14A; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #0F3D2E; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .cert-scroll {
      display: flex;
      animation: scroll 40s linear infinite;
    }
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-float { animation: float 5s ease-in-out infinite; }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    @keyframes moveDown {
      0% { top: -40%; }
      100% { top: 100%; }
    }
  `;
  document.head.appendChild(style);
};

// --- SHARED IMAGES (Optimization) ---
const IMAGES = {
  // Products
  pomegranate: "/products/Anor.jpg",
  grapes: "/products/uzum.jpg",
  cherry: "/products/gilos.jpg",
  onion: "/products/piyoz.jpg",
  tomato: "/products/pomidor.avif",
  melon: "/products/qovun.jpg",
  watermelon: "/products/tarbuz.jpg",
  dried: "/products/mayiz.avif",
  almond: "/products/bodom.jpg",
  mung: "/products/mosh.jpg",
  // Seasonality
  strawberry: "/products/qulupnoy.jpg",
  apricot: "/products/shaftoli.jpg",
  potato: "/products/kartoshka.webp",
  garlic: "/products/shesnok.webp",
  cabbage: "/products/karam.jpeg",
  peach: "/products/shaftoli1.jpeg",
  plum: "/products/gilos1.webp",
  fig: "/products/anjir.jpg",
  persimmon: "/products/xurmo.jpg",
  apple: "/products/olma.webp",
  lemon: "/products/limon.jpg",
  carrot: "/products/sabzi.jpeg",
  // Team
  ceo: "/ceo.jpg",
  coo: "/coo.jpg",
  qc: "/holida.jpg",
  logistician: "/Alibek.jpg",
  // Document Samples (Namuna suratlari - shu yerga rasm manzillarini yozasiz)
  doc_fito: "/doc_fito.jpg", // masalan: "/sertifikatlar/fito.jpg"
  doc_st1: "/ct1.jpg",
  doc_ex1: "/deklaratsiya.jpg",
  doc_quality: "/sifat.jpg"
};

// --- DATA & TRANSLATIONS ---
const content = {
  ru: {
    nav: { home: "Главная", about: "О Компании", catalog: "Каталог", calendar: "Сезонность", logistics: "Логистика", calculator: "Калькулятор", faq: "Вопросы", contact: "Контакты", download: "Каталог" },
    hero: {
      title: "Agro-Surxon Export — Ваш Надежный Партнер",
      subtitle: "Экспорт экологически чистых свежих фруктов и овощей для рынков СНГ, Ближнего Востока и Европы. Строгий контроль качества и упаковка по международным стандартам.",
      cta1: "Экспортный Каталог",
      cta2: "Запросить Цены",
      anim: {
        step1: "1.Агротехника", step1Sub: "Выращивание",
        step2: "2. Сортировка", step2Sub: "Строгий отбор",
        step3: "3. Упаковка", step3Sub: "Мировой стандарт",
        step4: "4. Логистика", step4Sub: "Гарантия доставки"
      }
    },
    certs: ["Сертификат Global G.A.P.", "Фитосанитарный Контроль", "ISO 9001:2015 Качество", "100% Юридическая Чистота", "Стандарт Упаковки MAP"],
    video: {
      title: "Взгляд на Процесс Экспорта",
      subtitle: "Ознакомьтесь с полным циклом контроля качества: от сбора урожая на полях до безопасной погрузки в рефрижераторы."
    },
    about: {
      title: "Информация о Компании",
      subtitle: "ООО «Agro-Surxon Export» – ваш стратегический партнер на южных воротах Узбекистана.",
      location: "г. Термез, Узбекистан",
      text1: "Компания на протяжении более 10 лет успешно занимается сбором, сортировкой, упаковкой и экспортом лучшей сельскохозяйственной продукции, выращенной на плодородных землях Сурхандарьинской области.",
      text2: "Наш производственный комплекс полностью оснащен современными высокотехнологичными холодильными камерами (Cold Storage), передовым калибровочным оборудованием и автоматизированными линиями упаковки. Это позволяет гарантировать бесперебойные круглогодичные поставки продукции.",
      points: [
        "Современные автоматизированные упаковочные линии и склады",
        "Холодильные камеры единовременного хранения более 15 тонн",
        "Стратегически удобное логистическое расположение рядом с таможней"
      ]
    },
    products: {
      title: "Официальный Экспортный Каталог",
      subtitle: "Специально отобранная и профессионально упакованная продукция, готовая к транспортировке на дальние расстояния.",
      categories: [
        { id: 'all', label: "Вся Продукция" }, { id: 'fruits', label: "Свежие Фрукты" },
        { id: 'veg', label: "Свежие Овощи" }, { id: 'melon', label: "Бахчевые" },
        { id: 'dried', label: "Сухофрукты" }, { id: 'nuts', label: "Орехи" }, { id: 'legumes', label: "Бобовые" }
      ],
      avail: "В Наличии", season: "Сезонный Продукт", details: "Подробнее",
      moq: "Минимальный объем:", pack: "Тип упаковки:", caliber: "Калибр / Сорт:", orderBtn: "Запросить КП",
      items: [
        { id: 1, cat: 'fruits', name: "Сурханский Экспортный Гранат", status: "avail", img: "/products/Anor.jpg", moq: "20 тонн (1 Фура)", pack: "Деревянный ящик / Гофротара (10 кг)", caliber: "70-100мм, Высший сорт", desc: "Толстокорый, крупнозернистый гранат, выращенный специально для экспорта. Выложен в 2 ряда в ящиках. Отличается высочайшей устойчивостью к длительной транспортировке." },
        { id: 2, cat: 'fruits', name: "Черный Виноград (Тайфи)", status: "avail", img: "/products/uzum.jpg", moq: "10 тонн (Рефрижератор)", pack: "Пластиковый ящик (8 кг)", caliber: "Крупный, сладость 18-22 brix", desc: "Свежий осенний виноград, бережно сохраненный в промышленных холодильных камерах. Упакован в специальные пластиковые ящики с бумажной подстилкой и консервирующими пакетами SO2." },
        { id: 3, cat: 'fruits', name: "Ранняя Калиброванная Черешня", status: "season", img: "/products/gilos.jpg", moq: "5 тонн (Авиа / Авто)", pack: "Гофроящик + Пакет MAP (5 кг)", caliber: "26mm - 32mm+, Премиум", desc: "Премиальная черешня, прошедшая обязательный процесс гидрокулинга (Hydrocooling). Упаковывается с использованием инновационной MAP технологии для обеспечения длительного срока годности на прилавках." },
        { id: 4, cat: 'veg', name: "Лук Экспортный (Желтый и Красный)", status: "avail", img: "/products/piyoz.jpg", moq: "22 тонны (1 Фура)", pack: "Экспортные сетки (25-30 кг)", caliber: "5-7 см, Абсолютно сухой", desc: "Тщательно высушенный в полевых условиях лук, прошедший механическую калибровку и профессионально упакованный в дышащие сетки. Идеальный выбор для длительного зимнего хранения." },
        { id: 5, cat: 'veg', name: "Тепличный Калиброванный Томат", status: "avail", img: "/products/pomidor.avif", moq: "15 тонн (Рефрижератор)", pack: "5-слойная гофротара (10 кг)", caliber: "Розовый / Красный, 150-200 гр", desc: "Отборные томаты, аккуратно уложенные в 2 ряда в прочные картонные коробки с использованием защитных прокладок. Мы предоставляем гарантию доставки товара до вашего склада без механических повреждений." },
        { id: 6, cat: 'melon', name: "Осенняя Поздняя Дыня", status: "season", img: "/products/qovun.jpg", moq: "20 тонн (1 Фура)", pack: "Крупный гофрокороб или сетка", caliber: "3-5 кг / шт, Стандарт", desc: "Сладкие и ароматные поздние сорта дыни, обладающие высокой лежкостью. Экспортируется в страны СНГ как в сетках, так и в специализированных больших картонных гофрокоробах для сетей супермаркетов." },
        { id: 7, cat: 'melon', name: "Транзитный Арбуз", status: "season", img: "/products/tarbuz.jpg", moq: "20 тонн (1 Фура)", pack: "Контейнер-паллет (Bulk)", caliber: "7-12 кг, Калиброванный", desc: "Крупные арбузы с особо толстой кожурой, максимально устойчивые к тряске при долгом транзите. Грамотно загружаются в фуры с использованием специальных амортизирующих поддонов." },
        { id: 8, cat: 'dried', name: "Изюм и Сухофрукты (Опт)", status: "avail", img: "/products/mayiz.avif", moq: "5 тонн", pack: "Картонный ящик (10 кг) + Полиэтилен", caliber: "Премиум, Очистка 99%", desc: "Высококачественные оптовые партии сухофруктов, прошедшие строгую лазерную сортировку на оборудовании Color Sorter. Гарантированная чистота продукта от примесей составляет 99%." },
        { id: 9, cat: 'nuts', name: "Миндаль в Скорлупе", status: "avail", img: "/products/bodom.jpg", moq: "3 тонны", pack: "Чистые мешки (25-30 кг)", caliber: "Крупный, Бумажная скорлупа", desc: "Экологически чистый, отборный миндаль, заботливо выращенный в горных районах Сурхандарьинской области. Тщательно просушен и надежно упакован в прочные экспортные мешки." },
        { id: 10, cat: 'legumes', name: "Маш (Бобовые Культуры)", status: "avail", img: "/products/mosh.jpg", moq: "22 тонны (1 Фура)", pack: "Полипропиленовый мешок (50 кг)", caliber: "3.2mm - 4.0mm+, Калибровка", desc: "Премиальный экспортный маш, прошедший заводскую механическую и оптическую очистку (чистота 99%). Откалиброван и упакован в надежные мешки, соответствующие международным санитарным нормам." }
      ]
    },
    seasonality: {
      title: "Календарь Поставок",
      subtitle: "Ознакомьтесь с графиком доступности нашей основной экспортной продукции в течение всех сезонов.",
      seasons: ["Весна", "Лето", "Осень", "Зима"],
      emptyMsg: "В этом сезоне мы готовим поля к новому урожаю.",
      items: [
        { name: "Ранняя Черешня", active: [0], img: IMAGES.cherry }, { name: "Клубника", active: [0], img: IMAGES.strawberry },
        { name: "Ранний Абрикос", active: [0], img: IMAGES.apricot }, { name: "Молодой Картофель", active: [0], img: IMAGES.potato },
        { name: "Свежий Чеснок", active: [0], img: IMAGES.garlic }, { name: "Ранняя Капуста", active: [0], img: IMAGES.cabbage },
        { name: "Персик", active: [1], img: IMAGES.peach }, { name: "Арбуз", active: [1], img: IMAGES.watermelon },
        { name: "Дыня", active: [1], img: IMAGES.melon }, { name: "Слива", active: [1], img: IMAGES.plum },
        { name: "Инжир", active: [1], img: IMAGES.fig }, { name: "Томат (Полевой)", active: [1], img: IMAGES.tomato },
        { name: "Сурханский Гранат", active: [2], img: IMAGES.pomegranate }, { name: "Поздний Виноград", active: [2], img: IMAGES.grapes },
        { name: "Хурма", active: [2], img: IMAGES.persimmon }, { name: "Красное Яблоко", active: [2], img: IMAGES.apple },
        { name: "Лук Экспортный", active: [2], img: IMAGES.onion }, { name: "Грецкий Орех", active: [2], img: IMAGES.almond },
        { name: "Томаты (Теплица)", active: [3], img: IMAGES.tomato }, { name: "Лимон и Цитрус", active: [3], img: IMAGES.lemon },
        { name: "Сухофрукты", active: [3], img: IMAGES.dried }, { name: "Маш (Бобовые)", active: [3], img: IMAGES.mung },
        { name: "Миндаль", active: [3], img: IMAGES.almond }, { name: "Зимняя Морковь", active: [3], img: IMAGES.carrot }
      ]
    },
    packaging: {
      title: "Характеристики Транспорта и Тары",
      subtitle: "Наши стандарты логистики, разработанные для обеспечения 100% сохранности груза при экспорте.",
      truck: "1 Фура (Рефрижератор)", truckDesc: "Поддержание строгого температурного режима: от +2°C до +4°C. Средний объем загрузки: 20-22 тонны.",
      pallet: "33 Стандартных Евро Паллеты", palletDesc: "Мы используем исключительно сертифицированные деревянные паллеты (1200x800 мм), прошедшие фумигацию.",
      boxes: "100-120 Ящиков на 1 Паллет", boxesDesc: "Ударопрочная 5-слойная гофротара или специальные пластиковые ящики. Применяются амортизирующие прокладки."
    },
    calcStrings: {
      title: "Калькулятор Транзита и Логистики", subtitle: "Укажите страну назначения и объем планируемого заказа для расчета сроков и транспорта.",
      countryLabel: "Страна назначения (Склад):", transLabel: "Вид транспорта для логистики:", weightLabel: "Планируемый объем (в тоннах):",
      btn: "Произвести Автоматический Расчет", resTitle: "Результаты Расчета:", resTime: "Ориентировочное время в пути:",
      resCount: "Необходимое количество транспорта:", disclaimer: "* Юридическая оговорка: Данные являются ориентировочными. Точные данные фиксируются в контракте.",
      orderBtn: "Запросить КП с этим расчетом", emptyState: "Введите данные слева и нажмите кнопку «Рассчитать».", tons: "тонн",
      countries: { russia: "Россия (Москва, Санкт-Петербург)", kazakhstan: "Казахстан (Алматы, Астана)", belarus: "Беларусь (Минск)", europe: "Евросоюз (через Латвию)" },
      transports: { truck: "Фура", wagon: "Вагон", avia: "Авиа" },
      times: {
        '24-48_hours': '24-48 часов', '12-15_days': '12-15 дней', '5-8_days': '5-8 дней',
        '24_hours': '24 часа', '7-10_days': '7-10 дней', '3-5_days': '3-5 дней',
        '48-72_hours': '48-72 часа', '12-18_days': '12-18 дней', 'default_time': '3-7 дней'
      }
    },
    team: {
      title: "Руководящий Состав", subtitle: "Опытные специалисты, гарантирующие надежность компании на международном рынке.",
      members: [
        { name: "Ходжакулов Хусан", role: "Генеральный Директор (CEO)", img: IMAGES.ceo },
        { name: "Рихсиев Хайрулло", role: "Начальник Отдела ВЭД", img: IMAGES.coo },
        { name: "Ходжакулова Холида", role: "Менеджер по Качеству", img: IMAGES.qc },
        { name: "Ходжакулов Алибек", role: "Специалист по Логистике", img: IMAGES.logistician }
      ]
    },
    customs: {
      title: "Таможенное Оформление", subtitle: "Вся деятельность ведется на 100% легальной основе. Нажмите на документ, чтобы ознакомиться.",
      sampleLabel: "Образец", modalTitle: "Утвержденный Образец Документа", sampleWatermark: "ОБРАЗЕЦ",
      docs: [
        { title: "Фитосанитарный Сертификат", desc: "Документ, подтверждающий успешное прохождение государственного карантинного контроля.", sample: "Образец Фитосанитарного Сертификата", img: IMAGES.doc_fito },
        { title: "Сертификат Происхождения СТ-1", desc: "Обеспечивает получение льгот по таможенным пошлинам при ввозе в страны СНГ.", sample: "Образец Сертификата СТ-1", img: IMAGES.doc_st1 },
        { title: "Таможенная Декларация (ЭК-10)", desc: "Подтверждает экспортное оформление грузов по ускоренному «Зеленому коридору».", sample: "Образец Декларации ЭК-10", img: IMAGES.doc_ex1 },
        { title: "Сертификаты Качества", desc: "Лабораторные заключения (вкл. Global G.A.P, ISO), предоставляемые по требованию.", sample: "Образец Сертификата Качества", img: IMAGES.doc_quality }
      ]
    },
    faq: {
      title: "Ответы на Вопросы",
      items: [
        { q: "Каков минимально допустимый объем для оформления экспортного заказа?", a: "Для отгрузки автомобильным транспортом (еврофура) минимальный объем составляет от 20 до 22 тонн. Для авиаперевозок или малотоннажных партий минимальный заказ обсуждается индивидуально и обычно начинается от 1 до 5 тонн." },
        { q: "Какие международные условия оплаты вы практикуете в работе с B2B клиентами?", a: "В соответствии с правилами Incoterms мы преимущественно работаем на условиях FCA и DAP. Финансовые расчеты осуществляются через банковские переводы (с частичной предоплатой и доплатой по факту погрузки), а для крупных и долгосрочных контрактов возможно использование безотзывного аккредитива (LC)." },
        { q: "Как вы можете гарантировать, что продукция не испортится во время длительной транспортировки?", a: "Абсолютно вся наша продукция до момента погрузки проходит строгую независимую экспертизу и контроль Государственной фитосанитарной службы. Во время самой перевозки в рефрижераторах в обязательном порядке устанавливаются автономные датчики контроля температуры (термо-регистраторы), обеспечивающие непрерывный мониторинг микроклимата." },
        { q: "Сколько времени в среднем занимает процесс прохождения таможенного контроля при экспорте?", a: "Благодаря функционированию системы упрощенного таможенного контроля («Зеленый коридор») в Республике Узбекистан, все процедуры экспортного оформления грузов занимают не более 2-4 часов. При этом полный пакет сопроводительных логистических документов (включая СТ-1 и фитосанитарный сертификат) оперативно подготавливается нашими профильными специалистами." }
      ]
    },
    contact: {
      title: "Начать Сотрудничество", subtitle: "Свяжитесь с нами прямо сейчас, чтобы запросить актуальные оптовые котировки цен и получить точный расчет логистических затрат.",
      address: "Узбекистан, Сурхандарьинская область, г. Термез, Агро-Промышленная зона", call: "Позвонить", whatsapp: "Написать в WhatsApp", quickContact: "Быстрая Связь", phoneLabel: "Телефон", emailLabel: "Email", addressLabel: "Адрес"
    },
    footer: { rights: "Все права защищены." },
    whatsapp: {
      productMsg: "Здравствуйте! Я хочу узнать оптовые цены и условия экспорта на {product}.",
      calcMsg: "Здравствуйте. Мне нужно доставить {weight} тонн в {country}. Понадобится {count} x {transport}. Сообщите цены."
    }
  },

  en: {
    nav: { home: "Home", about: "Company", catalog: "Catalog", calendar: "Seasonality", logistics: "Logistics", calculator: "Calculator", faq: "FAQ", contact: "Contact", download: "Catalog" },
    hero: {
      title: "Agro-Surxon Export — Your Reliable Partner",
      subtitle: "Exporting eco-friendly fresh fruits and vegetables to CIS, Middle East, and European markets. Strict quality control and international standard packaging.",
      cta1: "Export Catalog",
      cta2: "Request Pricing",
      anim: {
        step1: "1. Farming", step1Sub: "Field Care",
        step2: "2. Sorting", step2Sub: "Strict Quality",
        step3: "3. Packaging", step3Sub: "Global Standard",
        step4: "4. Logistics", step4Sub: "Guaranteed Delivery"
      }
    },
    certs: ["Global G.A.P. Certified", "Phytosanitary Control", "ISO 9001:2015 Quality", "100% Legal Transparency", "MAP Packaging Standard"],
    video: {
      title: "Inside the Export Process",
      subtitle: "Discover our full quality control cycle: from harvesting in the fields to safe loading into refrigerated trucks."
    },
    about: {
      title: "About the Company",
      subtitle: "Agro-Surxon Export LLC – your strategic partner at the southern gates of Uzbekistan.",
      location: "Termez City, Uzbekistan",
      text1: "For over 10 years, our company has been successfully collecting, sorting, packaging, and exporting the finest agricultural products grown on the fertile lands of the Surkhandarya region.",
      text2: "Our production complex is fully equipped with modern high-tech Cold Storage facilities, advanced calibration equipment, and automated packaging lines. This allows us to guarantee uninterrupted year-round supplies.",
      points: [
        "Modern automated packaging lines and warehouses",
        "Cold storage chambers with a capacity of over 15 tons",
        "Strategically convenient logistics location near customs"
      ]
    },
    products: {
      title: "Official Export Catalog",
      subtitle: "Specially selected and professionally packaged products, ready for long-distance transportation.",
      categories: [
        { id: 'all', label: "All Products" }, { id: 'fruits', label: "Fresh Fruits" },
        { id: 'veg', label: "Fresh Veggies" }, { id: 'melon', label: "Melons" },
        { id: 'dried', label: "Dried Fruits" }, { id: 'nuts', label: "Nuts" }, { id: 'legumes', label: "Legumes" }
      ],
      avail: "In Stock", season: "Seasonal", details: "View Details",
      moq: "Minimum volume:", pack: "Packaging type:", caliber: "Caliber / Grade:", orderBtn: "Request a Quote",
      items: [
        { id: 1, cat: 'fruits', name: "Surkhandarya Export Pomegranate", status: "avail", img: IMAGES.pomegranate, moq: "20 tons (1 Truck)", pack: "Wooden box / Corrugated box (10 kg)", caliber: "70-100mm, Premium", desc: "Thick-skinned, large-grained pomegranate grown specifically for export. Arranged in 2 rows in boxes. Highly resistant to long-term transportation." },
        { id: 2, cat: 'fruits', name: "Black Grapes (Taifi)", status: "avail", img: IMAGES.grapes, moq: "10 tons (Refrigerated)", pack: "Plastic box (8 kg)", caliber: "Large, sweetness 18-22 brix", desc: "Fresh autumn grapes, carefully preserved in industrial cold storage. Packed in plastic boxes with paper lining and SO2 preservative bags." },
        { id: 3, cat: 'fruits', name: "Early Calibrated Sweet Cherry", status: "season", img: IMAGES.cherry, moq: "5 tons (Air / Auto)", pack: "Corrugated box + MAP Bag (5 kg)", caliber: "26mm - 32mm+, Premium", desc: "Premium sweet cherries that have undergone the mandatory hydrocooling process. Packaged using innovative MAP technology to ensure a long shelf life." },
        { id: 4, cat: 'veg', name: "Export Onion (Yellow & Red)", status: "avail", img: IMAGES.onion, moq: "22 tons (1 Truck)", pack: "Export nets (25-30 kg)", caliber: "5-7 cm, Absolutely dry", desc: "Thoroughly field-dried onions, mechanically calibrated and professionally packed in breathable nets. The perfect choice for long winter storage." },
        { id: 5, cat: 'veg', name: "Greenhouse Calibrated Tomato", status: "avail", img: IMAGES.tomato, moq: "15 tons (Refrigerated)", pack: "5-layer corrugated box (10 kg)", caliber: "Pink / Red, 150-200 gr", desc: "Selected tomatoes carefully placed in 2 rows inside sturdy cardboard boxes using protective pads. We guarantee damage-free delivery to your warehouse." },
        { id: 6, cat: 'melon', name: "Autumn Late Melon", status: "season", img: IMAGES.melon, moq: "20 tons (1 Truck)", pack: "Large corrugated box or net", caliber: "3-5 kg / piece, Standard", desc: "Sweet and aromatic late melon varieties with high keeping quality. Exported to CIS countries both in nets and specialized large cardboard boxes." },
        { id: 7, cat: 'melon', name: "Transit Watermelon", status: "season", img: IMAGES.watermelon, moq: "20 tons (1 Truck)", pack: "Container-pallet (Bulk)", caliber: "7-12 kg, Calibrated", desc: "Large watermelons with a particularly thick rind, highly resistant to vibration during long transit. Properly loaded into trucks using special shock-absorbing pallets." },
        { id: 8, cat: 'dried', name: "Raisins and Dried Fruits (Wholesale)", status: "avail", img: IMAGES.dried, moq: "5 tons", pack: "Cardboard box (10 kg) + Polyethylene", caliber: "Premium, 99% Purified", desc: "High-quality wholesale batches of dried fruits passed through strict laser sorting on Color Sorter equipment. Guaranteed 99% product purity." },
        { id: 9, cat: 'nuts', name: "Almonds in Shell", status: "avail", img: IMAGES.almond, moq: "3 tons", pack: "Clean bags (25-30 kg)", caliber: "Large, Paper shell", desc: "Eco-friendly, selected almonds carefully grown in the mountainous areas of Surkhandarya. Thoroughly dried and securely packed in durable export bags." },
        { id: 10, cat: 'legumes', name: "Mung Beans", status: "avail", img: IMAGES.mung, moq: "22 tons (1 Truck)", pack: "Polypropylene bag (50 kg)", caliber: "3.2mm - 4.0mm+, Calibrated", desc: "Premium export mung bean that has undergone factory mechanical and optical cleaning (99% purity). Calibrated and packed in reliable bags meeting international standards." }
      ]
    },
    seasonality: {
      title: "Supply Calendar",
      subtitle: "Check the availability schedule of our main export products throughout all four seasons.",
      seasons: ["Spring", "Summer", "Autumn", "Winter"],
      emptyMsg: "During this season, we are preparing the fields for the new harvest.",
      items: [
        { name: "Early Cherries", active: [0], img: IMAGES.cherry }, { name: "Strawberries", active: [0], img: IMAGES.strawberry },
        { name: "Early Apricots", active: [0], img: IMAGES.apricot }, { name: "New Potatoes", active: [0], img: IMAGES.potato },
        { name: "Fresh Garlic", active: [0], img: IMAGES.garlic }, { name: "Early Cabbage", active: [0], img: IMAGES.cabbage },
        { name: "Peaches", active: [1], img: IMAGES.peach }, { name: "Watermelons", active: [1], img: IMAGES.watermelon },
        { name: "Melons", active: [1], img: IMAGES.melon }, { name: "Plums", active: [1], img: IMAGES.plum },
        { name: "Figs", active: [1], img: IMAGES.fig }, { name: "Field Tomatoes", active: [1], img: IMAGES.tomato },
        { name: "Pomegranates", active: [2], img: IMAGES.pomegranate }, { name: "Late Grapes", active: [2], img: IMAGES.grapes },
        { name: "Persimmons", active: [2], img: IMAGES.persimmon }, { name: "Red Apples", active: [2], img: IMAGES.apple },
        { name: "Export Onions", active: [2], img: IMAGES.onion }, { name: "Walnuts", active: [2], img: IMAGES.almond },
        { name: "Greenhouse Tomatoes", active: [3], img: IMAGES.tomato }, { name: "Lemons & Citrus", active: [3], img: IMAGES.lemon },
        { name: "Dried Fruits", active: [3], img: IMAGES.dried }, { name: "Mung Beans", active: [3], img: IMAGES.mung },
        { name: "Almonds", active: [3], img: IMAGES.almond }, { name: "Winter Carrots", active: [3], img: IMAGES.carrot }
      ]
    },
    packaging: {
      title: "Transport & Packaging Characteristics",
      subtitle: "Our logistics standards, designed to ensure 100% cargo safety during export.",
      truck: "1 Truck (Refrigerated)", truckDesc: "Strict temperature control: +2°C to +4°C. Average loading capacity: 20-22 tons.",
      pallet: "33 Standard Euro Pallets", palletDesc: "We exclusively use certified wooden pallets (1200x800 mm) that have passed fumigation.",
      boxes: "100-120 Boxes per 1 Pallet", boxesDesc: "Impact-resistant 5-layer corrugated boxes or special plastic crates. Shock-absorbing pads applied."
    },
    calcStrings: {
      title: "Logistics Calculator", subtitle: "Select the destination country and order volume to calculate delivery time and transport.",
      countryLabel: "Destination Country:", transLabel: "Transport Type:", weightLabel: "Planned Volume (tons):",
      btn: "Calculate Automatically", resTitle: "Calculation Results:", resTime: "Estimated Transit Time:",
      resCount: "Required Number of Vehicles:", disclaimer: "* Legal disclaimer: Data is approximate. Exact details will be finalized in the contract.",
      orderBtn: "Request Quote with this calculation", emptyState: "Enter data on the left and click 'Calculate'.", tons: "tons",
      countries: { russia: "Russia (Moscow, St. Petersburg)", kazakhstan: "Kazakhstan (Almaty, Astana)", belarus: "Belarus (Minsk)", europe: "European Union (via Latvia)" },
      transports: { truck: "Truck", wagon: "Train Wagon", avia: "Air Freight" },
      times: {
        '24-48_hours': '24-48 hours', '12-15_days': '12-15 days', '5-8_days': '5-8 days',
        '24_hours': '24 hours', '7-10_days': '7-10 days', '3-5_days': '3-5 days',
        '48-72_hours': '48-72 hours', '12-18_days': '12-18 days', 'default_time': '3-7 days'
      }
    },
    team: {
      title: "Executive Team", subtitle: "Experienced professionals ensuring our company's reliability in the international market.",
      members: [
        { name: "Xodjaqulov Husan", role: "Chief Executive Officer", img: IMAGES.ceo },
        { name: "Rixsiev Hayrullo", role: "Head of Foreign Trade", img: IMAGES.coo },
        { name: "Xodjaqulova Holida", role: "Quality Manager", img: IMAGES.qc },
        { name: "Xodjaqulov Alibek", role: "Logistics Specialist", img: IMAGES.logistician }
      ]
    },
    customs: {
      title: "Customs Clearance", subtitle: "All activities are conducted on a 100% legal basis. Click on a document to view it.",
      sampleLabel: "Sample", modalTitle: "Approved Document Sample", sampleWatermark: "SAMPLE",
      docs: [
        { title: "Phytosanitary Certificate", desc: "A document confirming successful passage of state quarantine control.", sample: "Sample Phytosanitary Certificate", img: IMAGES.doc_fito },
        { title: "ST-1 Certificate of Origin", desc: "Provides customs duty exemptions when imported into CIS countries.", sample: "Sample ST-1 Certificate", img: IMAGES.doc_st1 },
        { title: "Customs Declaration (EX-10)", desc: "Confirms export clearance of cargo through the accelerated 'Green Corridor'.", sample: "Sample EX-10 Declaration", img: IMAGES.doc_ex1 },
        { title: "Quality Certificates", desc: "Laboratory reports (incl. Global G.A.P, ISO) provided upon request.", sample: "Sample Quality Certificate", img: IMAGES.doc_quality }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What is the minimum acceptable volume for an export order?", a: "For delivery by road (Euro truck), the minimum volume is 20 to 22 tons. For air freight or low-tonnage shipments, the minimum order is negotiated individually and usually starts from 1 to 5 tons." },
        { q: "What international payment terms do you practice with B2B clients?", a: "In accordance with Incoterms, we predominantly work on FCA and DAP terms. Financial settlements are made via bank transfers (with partial prepayment and the balance upon loading), and for large contracts, irrevocable letters of credit (LC) can be used." },
        { q: "How can you guarantee that the products won't spoil during long transportation?", a: "Absolutely all our products undergo strict independent examination and State Phytosanitary Service control before loading. During the transportation itself, autonomous temperature sensors (thermo-recorders) are mandatorily installed in the refrigerators." },
        { q: "How long on average does the customs clearance process take during export?", a: "Thanks to the simplified customs control system ('Green Corridor') in Uzbekistan, all export clearance procedures take no more than 2-4 hours. The full package of logistics documents is promptly prepared by our specialists." }
      ]
    },
    contact: {
      title: "Start Collaboration", subtitle: "Contact us right now to request current wholesale price quotes and get exact logistics costs.",
      address: "Uzbekistan, Surkhandarya region, Termez, Agro-Industrial Zone", call: "Call Us", whatsapp: "Write on WhatsApp", quickContact: "Quick Contact", phoneLabel: "Phone", emailLabel: "Email", addressLabel: "Address"
    },
    footer: { rights: "All rights reserved." },
    whatsapp: {
      productMsg: "Hello! I would like to know the wholesale prices and export conditions for {product}.",
      calcMsg: "Hello. I need {count} x {transport} to deliver {weight} tons to {country}. Please provide the pricing."
    }
  },

  uz: {
    nav: { home: "Asosiy", about: "Korxona", catalog: "Katalog", calendar: "Mavsum", logistics: "Logistika", calculator: "Kalkulyator", faq: "Savollar", contact: "Aloqa", download: "Katalog" },
    hero: {
      title: "Agro-Surxon Export — Xalqaro Darajadagi Ulgurji Ta'minotchi",
      subtitle: "MDH, Yaqin Sharq va Yevropa bozorlari uchun xalqaro standartlar asosida qadoqlangan, qat'iy sifat nazoratidan o'tgan ekologik toza meva va sabzavotlar eksporti.",
      cta1: "Eksport Katalogi",
      cta2: "Narxlarni So'rash",
      anim: {
        step1: "1. Agrotexnika", step1Sub: "Dalada parvarish",
        step2: "2. Saralash", step2Sub: "Qat'iy nazorat",
        step3: "3. Qadoqlash", step3Sub: "Xalqaro standart",
        step4: "4. Logistika", step4Sub: "Kafolatli yetkazish"
      }
    },
    certs: ["Global G.A.P. Certified", "Fitosanitariya Nazorati", "ISO 9001:2015 Sifat", "Yuridik Toza Hamkorlik", "MAP Qadoqlash Standarti"],
    video: {
      title: "Eksport Jarayoniga Nazar",
      subtitle: "Mahsulotlarimiz daladan yig'ib olinganidan boshlab, furalarga ortilishigacha bo'lgan to'liq sifat nazorati jarayoni bilan tanishing."
    },
    about: {
      title: "Korxonamiz Haqida",
      subtitle: "«Agro-Surxon Export» MChJ – O'zbekistonning janubiy darvozasida joylashgan ishonchli va yirik eksport hamkoringiz.",
      location: "Termiz sh., O'zbekiston",
      text1: "Kompaniyamiz 10 yildan ortiq vaqt mobaynida Surxondaryo viloyatining serhosil zaminida yetishtirilgan sara qishloq xo'jaligi mahsulotlarini yig'ish, chuqur saralash, xalqaro standartlarda qadoqlash va jahon bozorlariga yetkazib berish bilan muvaffaqiyatli shug'ullanib kelmoqda.",
      text2: "Bizning ishlab chiqarish kompleksimiz eng so'nggi rusumdagi zamonaviy sovutish kameralari (Cold Storage), xorijiy kalibrovka uskunalari va avtomatlashtirilgan qadoqlash liniyalari bilan to'liq jihozlangan. Bu imkoniyatlar bizga B2B mijozlarimiz uchun yil davomida uzluksiz, yuz foiz sifat kafolatiga ega mahsulotlarni barqaror yetkazib berish imkonini ta'minlaydi.",
      points: [
        "Xalqaro talablarga moslashtirilgan qadoqlash liniyalari va omborlar",
        "Bir vaqtning o'zida 15 tonnadan ortiq sig'imga ega muzlatgich kameralar",
        "Bojxona terminallariga yaqin va qulay strategik logistik joylashuv"
      ]
    },
    products: {
      title: "Rasmiy Eksport Katalogi",
      subtitle: "Uzoq masofaga transportirovka qilish uchun maxsus saralangan va xalqaro bozor talablari asosida qadoqlangan mahsulotlar ro'yxati.",
      categories: [
        { id: 'all', label: "Barcha Mahsulotlar" }, { id: 'fruits', label: "Ho'l Mevalar" },
        { id: 'veg', label: "Sabzavotlar" }, { id: 'melon', label: "Poliz Ekinlari" },
        { id: 'dried', label: "Quritilgan Mevalar" }, { id: 'nuts', label: "Yong'oqlar" }, { id: 'legumes', label: "Dukkaklilar" }
      ],
      avail: "Omborda Mavjud", season: "Mavsumiy Mahsulot", details: "To'liq Ma'lumot",
      moq: "Minimal hajm:", pack: "Qadoqlash turi:", caliber: "Kalibr / Nav:", orderBtn: "Tijorat taklifini so'rash",
      items: [
        { id: 1, cat: 'fruits', name: "Surxon Eksport Anori", status: "avail", img: IMAGES.pomegranate, moq: "20 tonna (1 Fura)", pack: "Yog'och yashik yoki Gofrotara (10 kg)", caliber: "70-100mm, Oliy nav", desc: "Qalin po'stli va yirik donali, eksport uchun maxsus parvarishlangan anor navlari. Uzoq masofaga tashishga o'ta chidamli bo'lib, xaridor talabiga ko'ra ikki qatorli qilib yashiklarga qadoqlanadi." },
        { id: 2, cat: 'fruits', name: "Qora Uzum (Toifi)", status: "avail", img: IMAGES.grapes, moq: "10 tonna (Refrijerator)", pack: "Plastik yashik qog'oz to'shamali (8 kg)", caliber: "Yirik hajmli, shirinligi 18-22 brix", desc: "Maxsus SO2 (Sulfur dioxide) paketlari yordamida qadoqlangan va muzlatgich kameralarida chuqur saqlangan kuzgi qora uzum. Yangiligini to'liq yo'qotmaydi." },
        { id: 3, cat: 'fruits', name: "Ertapishar Kalibrli Gilos", status: "season", img: IMAGES.cherry, moq: "5 tonna (Avia / Avto)", pack: "Gofro-yashik va MAP paket (5 kg)", caliber: "26mm - 32mm+, Premium nav", desc: "Eksport oldidan gidrokuling (Hydrocooling) qilingan va MAP texnologiyasi yordamida qadoqlangan premium gilos. To'liq yevropa va rus bozori eksport talablariga javob beradi." },
        { id: 4, cat: 'veg', name: "Eksport Piyoz (Sariq va Qizil)", status: "avail", img: IMAGES.onion, moq: "22 tonna (1 Fura)", pack: "Eksport to'r qoplari (25-30 kg)", caliber: "5-7 sm, Mutlaqo quruq", desc: "Dalada to'liq quritilgan, chig'iriqdan o'tkazilib mexanik kalibrovka qilingan yuqori sifatli piyoz. Qishki uzoq muddatli saqlash va tranzit uchun eng maqbul tanlov." },
        { id: 5, cat: 'veg', name: "Issiqxona Pomidori", status: "avail", img: IMAGES.tomato, moq: "15 tonna (Refrijerator)", pack: "Besh qavatli gofrotara (10 kg)", caliber: "Pushti va qizil, 150-200 gr", desc: "Karton yashiklarga 2 qator qilib, ezilishning oldini oluvchi maxsus qistirmalar bilan terilgan pomidor. Mijoz omborigacha mukammal holatda yetib borishi kafolatlanadi." },
        { id: 6, cat: 'melon', name: "Kuzgi Kechki Qovun", status: "season", img: IMAGES.melon, moq: "20 tonna (1 Fura)", pack: "Yirik gofrotara yoki to'r qop", caliber: "3-5 kg / dona, Standart", desc: "MDH davlatlari hududiga asosan to'r qoplarda yoki yirik tarmoq mijozlari talabiga asosan maxsus karton gofrotaralarda eksport qilinadigan o'ta shirin va barqaror qovunlar." },
        { id: 7, cat: 'melon', name: "Eksport Tarvuzi", status: "season", img: IMAGES.watermelon, moq: "20 tonna (1 Fura)", pack: "Konteyner palet yoki Bulk (to'kma)", caliber: "7-12 kg, O'lchamlangan", desc: "Furalarga va vagonlarga maxsus yog'och poddonlar (bin) yordamida yuklanadigan, tranzit jarayonidagi tebranishlarga chidamli qalin po'stli, qizil tarvuzlar." },
        { id: 8, cat: 'dried', name: "Ulgurji Quruq Mevalar", status: "avail", img: IMAGES.dried, moq: "5 tonna", pack: "Karton yashik (10 kg) va Polietilen", caliber: "Premium nav, 99% tozalangan", desc: "Lazerli Color Sorter uskunalarida saralashdan o'tgan, begona jismlar va changdan 99% tozalangan yuqori sifatli ulgurji mayiz va turli quruq mevalar to'plami." },
        { id: 9, cat: 'nuts', name: "Qobig'li Bodom", status: "avail", img: IMAGES.almond, moq: "3 tonna", pack: "Toza qoplar (25-30 kg)", caliber: "Yirik hajmli, Qog'oz po'choq navi", desc: "Surxondaryoning tog'li hududlarida ekologik toza sharoitda yetishtirilgan, yaxshilab quritilgan va qoplarga standartlashtirib qadoqlangan eksportbop toza bodom." },
        { id: 10, cat: 'legumes', name: "Dukkaklilar (Mosh)", status: "avail", img: IMAGES.mung, moq: "22 tonna (1 Fura)", pack: "Polipropilen qoplar (50 kg)", caliber: "3.2mm - 4.0mm+, Kalibrovka", desc: "Zavod sharoitida tozalangan, 99% sof holatga keltirilgan va xalqaro gigiyena normalariga javob beradigan maxsus qoplarga qadoqlangan ulgurji mosh mahsuloti." }
      ]
    },
    seasonality: {
      title: "Korporativ Ta'minot Taqvimi",
      subtitle: "Yilning to'rt fasli davomida korxonamiz tomonidan eksportga kafolatli tayyor bo'ladigan asosiy mahsulotlar kalendari.",
      seasons: ["Bahor Fasli", "Yoz Fasli", "Kuz Fasli", "Qish Fasli"],
      emptyMsg: "Ushbu faslda kelgusi eksport mavsumi uchun yangi hosil kutilmoqda.",
      items: [
        { name: "Ertapishar Gilos", active: [0], img: IMAGES.cherry }, { name: "Qulupnay", active: [0], img: IMAGES.strawberry },
        { name: "Ertagi O'rik", active: [0], img: IMAGES.apricot }, { name: "Ertagi Kartoshka", active: [0], img: IMAGES.potato },
        { name: "Sarimsoq Piyoz", active: [0], img: IMAGES.garlic }, { name: "Ertagi Karam", active: [0], img: IMAGES.cabbage },
        { name: "Shaftoli", active: [1], img: IMAGES.peach }, { name: "Tarvuz", active: [1], img: IMAGES.watermelon },
        { name: "Qovun", active: [1], img: IMAGES.melon }, { name: "Olxo'ri", active: [1], img: IMAGES.plum },
        { name: "Anjir", active: [1], img: IMAGES.fig }, { name: "Daladagi Pomidor", active: [1], img: IMAGES.tomato },
        { name: "Surxon Anori", active: [2], img: IMAGES.pomegranate }, { name: "Kechki Uzum", active: [2], img: IMAGES.grapes },
        { name: "Xurmo", active: [2], img: IMAGES.persimmon }, { name: "Qizil Olma", active: [2], img: IMAGES.apple },
        { name: "Eksport Piyoz", active: [2], img: IMAGES.onion }, { name: "Yong'oq", active: [2], img: IMAGES.almond },
        { name: "Issiqxona Pomidori", active: [3], img: IMAGES.tomato }, { name: "Limon va Sitrus", active: [3], img: IMAGES.lemon },
        { name: "Quruq Mevalar", active: [3], img: IMAGES.dried }, { name: "Mosh (Dukkakli)", active: [3], img: IMAGES.mung },
        { name: "Bodom", active: [3], img: IMAGES.almond }, { name: "Qishki Sabzi", active: [3], img: IMAGES.carrot }
      ]
    },
    packaging: {
      title: "Transport va Palet Sig'imi Xarakteristikasi",
      subtitle: "Yuklarni xavfsiz va ziyon-zahmat yetkazmasdan tashish uchun ishlab chiqilgan xalqaro logistika standartlari.",
      truck: "1 Fura (Refrijerator)", truckDesc: "O'rnatilgan harorat rejimi: +2°C / +4°C. Umumiy yuk ortish hajmi: 20-22 tonnagacha.",
      pallet: "33 ta Standart Evro Palet", palletDesc: "Xalqaro 1200x800 mm o'lchamdagi sertifikatlangan, sifatli yog'ochdan yasalgan eksport paletlar majmuasi.",
      boxes: "100-120 ta Yashik / 1 Palet", boxesDesc: "Sifatli gofrotara yoki zarbaga chidamli plastik yashiklar. Qatorlar orasida qistirmalar mavjud."
    },
    calcStrings: {
      title: "Logistika va Tranzit Hisob-kitobi", subtitle: "Kompaniyangiz joylashgan manzil va kerakli yuk hajmini kiriting. Tizim sizga taxminiy yetkazib berish muddati va transport miqdorini hisoblaydi.",
      countryLabel: "Belgilangan davlat (Manzil):", transLabel: "Logistika transport turi:", weightLabel: "Buyurtma qilinuvchi yuk hajmi:",
      btn: "Natijani Avtomatik Hisoblash", resTitle: "Dastlabki Hisob-kitob Natijasi:", resTime: "Taxminiy tranzit yetib borish vaqti:",
      resCount: "Zarur bo'ladigan transport miqdori:", disclaimer: "* Yuridik Eslatma: Barcha muddatlar va miqdorlar o'rtacha taxminiy hisoblanadi. Yakuniy ma'lumotlar shartnomada belgilanadi.",
      orderBtn: "Ushbu hisob-kitob bilan taklif so'rash", emptyState: "Chap tomondagi ma'lumotlarni kiriting va 'Hisoblash' tugmasini bosing.", tons: "tonna",
      countries: { russia: "Rossiya (Moskva, Sankt-Peterburg)", kazakhstan: "Qozog'iston (Olmaota, Ostona)", belarus: "Belarus (Minsk)", europe: "Yevropa Ittifoqi (Latviya orqali)" },
      transports: { truck: "Fura", wagon: "Vagon", avia: "Avia" },
      times: {
        '24-48_hours': '24-48 soat', '12-15_days': '12-15 kun', '5-8_days': '5-8 kun',
        '24_hours': '24 soat', '7-10_days': '7-10 kun', '3-5_days': '3-5 kun',
        '48-72_hours': '48-72 soat', '12-18_days': '12-18 kun', 'default_time': '3-7 kun'
      }
    },
    team: {
      title: "Boshqaruv Jamoasi", subtitle: "Kompaniyamizning xalqaro bozordagi ishonchliligi va uzluksiz ta'minot jarayonini kafolatlovchi tajribali mutaxassislar.",
      members: [
        { name: "Xodjaqulov Husan", role: "Boshqaruvchi Direktor (CEO)", img: IMAGES.ceo },
        { name: "Rixsiev Hayrullo", role: "Tashqi Aloqalar Bo'limi Boshlig'i", img: IMAGES.coo },
        { name: "Xodjaqulova Holida", role: "Sifat Nazorati Menejeri", img: IMAGES.qc },
        { name: "Xodjaqulov Alibek", role: "Xalqaro Logistika Mutaxassisi", img: IMAGES.logistician }
      ]
    },
    customs: {
      title: "Bojxona Rasmiylashtiruvi", subtitle: "Kompaniyamiz faoliyati 100% yuridik toza asosda olib boriladi. Xalqaro savdo uchun zarur hujjatlar namunasini ko'rish uchun ustiga bosing.",
      sampleLabel: "Namuna", modalTitle: "Hujjatning Tasdiqlangan Namunasi", sampleWatermark: "NAMUNA",
      docs: [
        { title: "Fitosanitariya Sertifikati", desc: "Davlat Karantin nazoratidan rasman o'tganligini tasdiqlovchi hujjat.", sample: "Fitosanitariya Namunasi", img: IMAGES.doc_fito },
        { title: "ST-1 Kelib Chiqish Sertifikati", desc: "MDH davlatlari hududida bojxona to'lovlaridan imtiyoz beruvchi sertifikat.", sample: "ST-1 Sertifikat Namunasi", img: IMAGES.doc_st1 },
        { title: "Bojxona Deklaratsiyasi (EX-1)", desc: "Mahsulotlarimiz «Yashil Yo'lak» orqali rasmiylashtirilishini isbotlovchi deklaratsiya.", sample: "EX-1 Deklaratsiya Namunasi", img: IMAGES.doc_ex1 },
        { title: "Sifat Sertifikatlari", desc: "Hamkorlar talabiga binoan olinadigan Global G.A.P, ISO 9001 kabi maxsus xulosalar.", sample: "Sifat Sertifikati Namunasi", img: IMAGES.doc_quality }
      ]
    },
    faq: {
      title: "Ko'p Beriladigan Savollar",
      items: [
        { q: "Kompaniyangizda minimal eksport buyurtma hajmi qancha qilib belgilangan?", a: "Avtomobil transporti (fura) orqali yetkazib berish uchun minimal hajm 20-22 tonnani tashkil qiladi. Avia va yengil yuklar uchun esa minimal buyurtma kelishuv asosida 1-5 tonnadan boshlanadi." },
        { q: "Korxonangiz bilan ishlashda qanday xalqaro to'lov shartlari qo'llaniladi?", a: "Biz asosan Incoterms qoidalariga asosan FCA va DAP shartlarida hamkorlik qilamiz. To'lovlar xalqaro bank o'tkazmalari orqali, qisman oldindan to'lov va yuklanganidan so'ng qoldiq to'lov asosida, yirik kelishuvlarda esa qaytarib olinmaydigan akkreditiv (LC) orqali amalga oshirilishi kafolatlanadi." },
        { q: "Yukning sifati transportirovka jarayonida buzilmasligi qanday kafolatlanadi?", a: "Barcha mahsulotlarimiz furalarga ortilishidan oldin mustaqil ekspertiza va Davlat Fitosanitariya xizmati nazoratidan qat'iy o'tadi. Yuk tashish davomida doimiy monitoringni ta'minlash maqsadida furalarga maxsus haroratni nazorat qiluvchi datchiklar (termo-registratorlar) o'rnatiladi." },
        { q: "Eksport va bojxona rasmiylashtiruvi jarayonlari o'rtacha qancha vaqt talab qiladi?", a: "O'zbekiston Respublikasi Bojxona qo'mitasining soddalashtirilgan «Yashil yo'lak» tizimi orqali bizning eksport rasmiylashtiruvi jarayonlarimiz 2-4 soat ichida to'liq hal qilinadi. Shuningdek, ST-1 va Fitosanitariya kabi barcha logistik hujjatlar paketi bizning malakali mutaxassislarimiz tomonidan mustaqil tayyorlanadi." }
      ]
    },
    contact: {
      title: "Rasmiy Hamkorlikni Boshlash", subtitle: "Ayni damdagi ulgurji narxlar va kotirovkalarni, shuningdek logistika xarajatlari hisob-kitobini olish uchun biz bilan bog'laning.",
      address: "O'zbekiston, Surxondaryo viloyati, Termiz shahri, Agro-Sanoat zonasi", call: "Qo'ng'iroq qilish", whatsapp: "WhatsApp orqali yozish", quickContact: "Tezkor Bog'lanish", phoneLabel: "Telefon", emailLabel: "Email", addressLabel: "Manzil"
    },
    footer: { rights: "Barcha huquqlar himoyalangan." },
    whatsapp: {
      productMsg: "Salom! Men {product} bo'yicha ulgurji narx va eksport shartlarini bilmoqchi edim.",
      calcMsg: "Salom. Menga {country}ga {weight} tonna yuk uchun {count} ta {transport} kerak. Narxlarni aytib yuboring."
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSeason, setActiveSeason] = useState(0);

  const [openFaq, setOpenFaq] = useState(null);

  // Calculator State (Using ID keys for translation independence)
  const [calcCountry, setCalcCountry] = useState('russia');
  const [calcTransport, setCalcTransport] = useState('truck');
  const [calcWeight, setCalcWeight] = useState(20);
  const [calcResult, setCalcResult] = useState(null);

  // Document Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);

  const t = content[lang];

  useEffect(() => {
    injectStyles();
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProduct || selectedDoc) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProduct, selectedDoc]);

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
    const msg = t.whatsapp.productMsg.replace('{product}', productName);
    window.open(`https://wa.me/998931017252?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const calculateLogistics = () => {
    let timeKey = 'default_time';

    if (calcCountry === 'russia') {
      if (calcTransport === 'avia') timeKey = '24-48_hours';
      else if (calcTransport === 'wagon') timeKey = '12-15_days';
      else timeKey = '5-8_days';
    } else if (calcCountry === 'kazakhstan') {
      if (calcTransport === 'avia') timeKey = '24_hours';
      else if (calcTransport === 'wagon') timeKey = '7-10_days';
      else timeKey = '3-5_days';
    } else if (calcCountry === 'europe' || calcCountry === 'belarus') {
      if (calcTransport === 'avia') timeKey = '48-72_hours';
      else timeKey = '12-18_days';
    }

    const time = t.calcStrings.times[timeKey];
    const capacity = calcTransport === 'truck' ? 20 : (calcTransport === 'wagon' ? 60 : 5);
    const count = Math.ceil(calcWeight / capacity);
    const transportName = t.calcStrings.transports[calcTransport];

    setCalcResult({ time, count, transportName });
  };

  const handleCalcOrder = () => {
    const msg = t.whatsapp.calcMsg
      .replace('{country}', t.calcStrings.countries[calcCountry])
      .replace('{weight}', calcWeight)
      .replace('{count}', calcResult.count)
      .replace('{transport}', calcResult.transportName);
    window.open(`https://wa.me/998931017252?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getDocIcon = (idx) => {
    if (idx === 0) return <Sprout className="w-8 h-8 text-[#0F3D2E]" />;
    if (idx === 1) return <Globe2 className="w-8 h-8 text-[#0F3D2E]" />;
    if (idx === 2) return <FileSignature className="w-8 h-8 text-[#0F3D2E]" />;
    return <Award className="w-8 h-8 text-[#0F3D2E]" />;
  };

  return (
    <div className="relative min-h-screen text-[#1A1A1A] overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-[#0F3D2E]/90 backdrop-blur-md py-6 text-white'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">

          <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => scrollTo('home')}>
            <Leaf className={`w-8 h-8 ${isScrolled ? 'text-[#0F3D2E]' : 'text-[#C9A14A]'}`} />
            <span className={`font-serif font-bold text-2xl tracking-wide ${isScrolled ? 'text-[#0F3D2E]' : 'text-white'}`}>
              Agro<span className="text-[#C9A14A]">Surxon</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-8">
            <button onClick={() => scrollTo('about')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.about}</button>
            <button onClick={() => scrollTo('catalog')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.catalog}</button>
            <button onClick={() => scrollTo('seasonality')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.calendar}</button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.nav.calculator}</button>
            <button onClick={() => scrollTo('team')} className="hover:text-[#C9A14A] font-medium transition-colors">{t.team.title}</button>

            {/* Language Switcher Desktop */}
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full border transition-colors ${isScrolled ? 'bg-gray-100 border-gray-200' : 'bg-white/10 backdrop-blur border-white/20'}`}>
              <button onClick={() => setLang('ru')} className={`font-bold text-sm transition-colors ${lang === 'ru' ? 'text-[#C9A14A]' : (isScrolled ? 'text-gray-400 hover:text-[#0F3D2E]' : 'text-gray-300 hover:text-white')}`}>RU</button>
              <span className={`text-xs ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>|</span>
              <button onClick={() => setLang('en')} className={`font-bold text-sm transition-colors ${lang === 'en' ? 'text-[#C9A14A]' : (isScrolled ? 'text-gray-400 hover:text-[#0F3D2E]' : 'text-gray-300 hover:text-white')}`}>EN</button>
              <span className={`text-xs ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>|</span>
              <button onClick={() => setLang('uz')} className={`font-bold text-sm transition-colors ${lang === 'uz' ? 'text-[#C9A14A]' : (isScrolled ? 'text-gray-400 hover:text-[#0F3D2E]' : 'text-gray-300 hover:text-white')}`}>UZ</button>
            </div>

            <a href="/katalog.jpg" download="katalog.jpg" className={`flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#C9A14A] font-semibold transition-all hover:bg-[#C9A14A] hover:text-[#0F3D2E] active:scale-95 ${isScrolled ? 'text-[#0F3D2E]' : 'text-[#C9A14A]'}`}>
              <Download className="w-4 h-4" /> {t.nav.download}
            </a>
            <button onClick={() => scrollTo('contact')} className="bg-[#0F3D2E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0a291f] transition-all shadow-lg active:scale-95 flex items-center gap-2">
              <Phone className="w-4 h-4" /> {t.nav.contact}
            </button>
          </div>

          <div className="xl:hidden flex items-center gap-5">
            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2">
              <button onClick={() => setLang('ru')} className={`font-bold text-sm ${lang === 'ru' ? 'text-[#C9A14A]' : 'opacity-50'}`}>RU</button>
              <button onClick={() => setLang('en')} className={`font-bold text-sm ${lang === 'en' ? 'text-[#C9A14A]' : 'opacity-50'}`}>EN</button>
              <button onClick={() => setLang('uz')} className={`font-bold text-sm ${lang === 'uz' ? 'text-[#C9A14A]' : 'opacity-50'}`}>UZ</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col gap-4 text-[#0F3D2E] animate-fade-in z-50 border-t border-gray-100">
            <button onClick={() => scrollTo('about')} className="text-left text-lg font-bold py-2 border-b border-gray-100">{t.nav.about}</button>
            <button onClick={() => scrollTo('catalog')} className="text-left text-lg font-bold py-2 border-b border-gray-100">{t.nav.catalog}</button>
            <button onClick={() => scrollTo('seasonality')} className="text-left text-lg font-bold py-2 border-b border-gray-100">{t.nav.calendar}</button>
            <button onClick={() => scrollTo('calculator')} className="text-left text-lg font-bold py-2 border-b border-gray-100">{t.nav.calculator}</button>
            <button onClick={() => scrollTo('team')} className="text-left text-lg font-bold py-2 border-b border-gray-100">{t.team.title}</button>
            <a href="/katalog.pdf" download="Agro-Surxon-Katalog.pdf" className="flex items-center justify-center gap-2 text-white bg-[#C9A14A] rounded-xl font-bold py-3 mt-4 active:scale-95 transition-transform"><Download className="w-5 h-5" /> {t.nav.download}</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-36 pb-24 lg:pt-52 lg:pb-36 bg-[#0F3D2E] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587334274328-64186a80aee6?auto=format&fit=crop&q=80&w=2000"
            alt="Agriculture Export Warehouse"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D2E] via-[#0F3D2E]/90 to-[#0F3D2E]/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="max-w-2xl lg:w-1/2 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-[#C9A14A] font-semibold text-sm mb-6">
              <Shield className="w-4 h-4" /> B2B Export Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('catalog')} className="bg-[#C9A14A] text-[#0F3D2E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b59040] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,161,74,0.3)] hover:-translate-y-1 active:scale-95">
                <LayoutGrid className="w-5 h-5" /> {t.hero.cta1}
              </button>
              <button onClick={() => scrollTo('calculator')} className="bg-white/5 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0F3D2E] transition-all flex items-center justify-center gap-2 active:scale-95">
                {t.hero.cta2} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Animation (Export Flow) */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center relative h-[450px]">
            <div className="absolute w-72 h-72 bg-[#C9A14A]/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Timeline Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-white/10 transform -translate-x-1/2 rounded-full overflow-hidden">
              <div className="absolute left-0 w-full bg-gradient-to-b from-transparent via-[#C9A14A] to-transparent animate-[moveDown_3s_linear_infinite]" style={{ height: '40%' }}></div>
            </div>

            <div className="flex flex-col justify-between h-full w-full max-w-md z-10 relative py-4">
              {[
                { step: t.hero.anim.step1, sub: t.hero.anim.step1Sub, icon: Sprout, align: 'right' },
                { step: t.hero.anim.step2, sub: t.hero.anim.step2Sub, icon: Filter, align: 'left' },
                { step: t.hero.anim.step3, sub: t.hero.anim.step3Sub, icon: Boxes, align: 'right' },
                { step: t.hero.anim.step4, sub: t.hero.anim.step4Sub, icon: Truck, align: 'left' }
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-6 w-full group ${item.align === 'left' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-1/2 flex ${item.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`glass-card px-5 py-3 rounded-2xl transition-transform group-hover:scale-105 ${item.align === 'right' ? 'text-right' : 'text-left'}`}>
                      <p className="text-white font-bold text-lg">{item.step}</p>
                      <p className="text-[#C9A14A] text-xs font-semibold uppercase tracking-wider">{item.sub}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#0F3D2E] border-2 border-[#C9A14A] rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(201,161,74,0.3)]">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- TRUST BANNER (CERTIFICATES) --- */}
      <div className="bg-[#082219] py-5 overflow-hidden border-b border-white/5">
        <div className="flex w-[200%]">
          <div className="cert-scroll gap-8 md:gap-16 items-center w-full px-8">
            {[...t.certs, ...t.certs, ...t.certs].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-default">
                <CheckCircle2 className="w-5 h-5 text-[#C9A14A]" />
                <span className="text-white font-bold uppercase tracking-wider text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            <div className="lg:w-1/2 w-full relative">
              <div className="absolute -inset-4 border-2 border-[#C9A14A]/20 rounded-3xl transform -rotate-2 transition-transform hover:rotate-0 duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] group">
                <img loading="lazy" src="/company1.jpg" alt="Company Facility" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                    <Building2 className="w-8 h-8 text-[#C9A14A]" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl tracking-wide">Agro-Surxon Export</p>
                    <p className="text-sm opacity-90 font-medium">{t.about.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6 leading-tight">{t.about.title}</h2>
              <h3 className="text-xl text-[#C9A14A] font-semibold mb-6">{t.about.subtitle}</h3>
              <p className="text-gray-600 mb-5 leading-relaxed text-lg">{t.about.text1}</p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{t.about.text2}</p>

              <ul className="space-y-5 mb-10">
                {t.about.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C9A14A]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A14A]/20">
                      <CheckCircle className="w-5 h-5 text-[#C9A14A]" />
                    </div>
                    <span className="font-semibold text-gray-800 text-lg">{point}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => scrollTo('contact')} className="bg-[#0F3D2E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a291f] transition-all flex items-center justify-center gap-3 w-max shadow-xl hover:-translate-y-1 active:scale-95">
                {t.contact.call} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- E-COMMERCE CATALOG --- */}
      <section id="catalog" className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">

          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.products.title}</h2>
            <p className="text-gray-600 max-w-2xl text-lg mb-10">{t.products.subtitle}</p>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full animate-fade-in">

                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                  <div className="absolute top-4 left-4 z-10">
                    {prod.status === 'avail' ? (
                      <span className="bg-[#0F3D2E]/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C9A14A]" /> {t.products.avail}
                      </span>
                    ) : (
                      <span className="bg-[#C9A14A]/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                        ⏳ {t.products.season}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-[#0F3D2E]/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white text-[#0F3D2E] px-5 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-4 h-4" /> {t.products.details}
                    </span>
                  </div>
                  <img loading="lazy" src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-4 line-clamp-1" title={prod.name}>{prod.name}</h3>
                  <div className="space-y-3 mb-6 text-sm text-gray-600 flex-grow">
                    <p className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-400 font-medium">{t.products.pack}</span>
                      <span className="font-semibold text-gray-800 text-right ml-2 line-clamp-1">{prod.pack.split('(')[0]}</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-400 font-medium">{t.products.moq}</span>
                      <span className="font-semibold text-[#0F3D2E] text-right ml-2 bg-[#0F3D2E]/5 px-2 py-0.5 rounded-md">{prod.moq}</span>
                    </p>
                  </div>
                  <button onClick={() => setSelectedProduct(prod)} className="w-full bg-gray-50 text-[#0F3D2E] py-3.5 rounded-xl font-bold hover:bg-[#0F3D2E] hover:text-[#C9A14A] transition-colors flex justify-center items-center gap-2 active:scale-95">
                    <Eye className="w-5 h-5" /> {t.products.details}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="w-16 h-16 bg-[#C9A14A]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Play className="w-6 h-6 text-[#C9A14A] ml-1" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6">{t.video.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{t.video.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-8 border-gray-50 relative bg-black aspect-video group">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              poster="/company1.jpg"
            >
              <source src="/video.mp4" type="video/mp4" />
              Sizning brauzeringiz video formatini qo'llab-quvvatlamaydi.
            </video>
          </div>
        </div>
      </section>

      {/* --- SEASONALITY CALENDAR --- */}
      <section id="seasonality" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-20 h-20 bg-[#C9A14A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <CalendarDays className="w-10 h-10 text-[#C9A14A] -rotate-3" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-4">{t.seasonality.title}</h2>
            <p className="text-gray-600 text-lg">{t.seasonality.subtitle}</p>
          </div>

          <div className="bg-[#FAFAFA] border border-gray-100 rounded-[2rem] p-4 md:p-6 mb-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.seasonality.seasons.map((season, i) => {
                let Icon = Sprout;
                if (i === 1) Icon = Sun;
                if (i === 2) Icon = Leaf;
                if (i === 3) Icon = Snowflake;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveSeason(i)}
                    className={`flex flex-col items-center justify-center gap-3 px-4 py-8 rounded-2xl font-bold text-lg transition-all duration-300 ${activeSeason === i ? 'bg-[#0F3D2E] text-[#C9A14A] shadow-xl transform scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 hover:border-[#C9A14A]/50 hover:-translate-y-1'}`}
                  >
                    <Icon className={`w-8 h-8 ${activeSeason === i ? 'text-[#C9A14A]' : 'text-gray-400'}`} />
                    {season}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-[300px]">
            {activeSeasonItems.length > 0 ? (
              <div key={activeSeason} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {activeSeasonItems.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group relative">
                    <div className="h-72 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/90 via-[#0F3D2E]/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                      <img loading="lazy" src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute bottom-8 left-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-300">
                        <span className="text-white font-bold text-xl flex items-center gap-3 drop-shadow-md">
                          <CheckCircle2 className="w-6 h-6 text-[#C9A14A]" /> {item.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 animate-fade-in">
                <Sun className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-gray-500">{t.seasonality.emptyMsg}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- PACKAGING SCHEMA --- */}
      <section className="py-24 bg-[#0F3D2E] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A14A]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A14A]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Layers className="w-14 h-14 text-[#C9A14A] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">{t.packaging.title}</h2>
            <p className="text-gray-300 text-xl leading-relaxed">{t.packaging.subtitle}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-4 lg:gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] w-full md:w-1/3 text-center transform hover:-translate-y-3 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <Truck className="w-12 h-12 text-[#C9A14A]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.packaging.truck}</h3>
              <p className="text-gray-400 text-base leading-relaxed">{t.packaging.truckDesc}</p>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <ChevronRight className="w-12 h-12 text-white/20" />
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] w-full md:w-1/3 text-center transform hover:-translate-y-3 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <AlignJustify className="w-12 h-12 text-[#C9A14A]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.packaging.pallet}</h3>
              <p className="text-gray-400 text-base leading-relaxed">{t.packaging.palletDesc}</p>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <ChevronRight className="w-12 h-12 text-white/20" />
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] w-full md:w-1/3 text-center transform hover:-translate-y-3 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <Package className="w-12 h-12 text-[#C9A14A]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.packaging.boxes}</h3>
              <p className="text-gray-400 text-base leading-relaxed">{t.packaging.boxesDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGISTICS CALCULATOR --- */}
      <section id="calculator" className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 p-8 md:p-14">

            <div className="lg:w-1/2 w-full">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#C9A14A]/10 text-[#C9A14A] mb-8 border border-[#C9A14A]/20">
                <Calculator className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6">{t.calcStrings.title}</h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">{t.calcStrings.subtitle}</p>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{t.calcStrings.countryLabel}</label>
                  <select
                    value={calcCountry}
                    onChange={(e) => setCalcCountry(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#C9A14A] focus:ring-2 focus:ring-[#C9A14A]/20 outline-none text-[#0F3D2E] font-bold bg-gray-50 appearance-none transition-shadow cursor-pointer"
                  >
                    <option value="russia">{t.calcStrings.countries.russia}</option>
                    <option value="kazakhstan">{t.calcStrings.countries.kazakhstan}</option>
                    <option value="belarus">{t.calcStrings.countries.belarus}</option>
                    <option value="europe">{t.calcStrings.countries.europe}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{t.calcStrings.transLabel}</label>
                  <div className="flex gap-4">
                    {['truck', 'wagon', 'avia'].map(tr => (
                      <button
                        key={tr}
                        onClick={() => setCalcTransport(tr)}
                        className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all active:scale-95 ${calcTransport === tr ? 'bg-[#0F3D2E] text-[#C9A14A] border-[#0F3D2E] shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#C9A14A]'}`}
                      >
                        {t.calcStrings.transports[tr]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">{t.calcStrings.weightLabel}</label>
                    <span className="text-[#0F3D2E] font-black text-xl bg-[#C9A14A]/20 px-3 py-1 rounded-lg">{calcWeight} {t.calcStrings.tons}</span>
                  </div>
                  <input
                    type="range"
                    min="1" max="120" step="1"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A14A]"
                  />
                </div>
                <button
                  onClick={calculateLogistics}
                  className="w-full bg-[#C9A14A] text-[#0F3D2E] py-5 rounded-xl font-bold text-xl hover:bg-[#b59040] transition-all shadow-[0_4px_20px_rgba(201,161,74,0.3)] hover:-translate-y-1 active:scale-95 mt-4"
                >
                  {t.calcStrings.btn}
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full h-full flex flex-col justify-center">
              {calcResult ? (
                <div className="bg-[#0F3D2E] rounded-[2rem] p-10 md:p-12 text-white relative overflow-hidden animate-fade-in shadow-2xl">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A14A]/20 rounded-bl-full"></div>
                  <h3 className="text-3xl font-serif font-bold mb-10 relative z-10 text-[#C9A14A]">{t.calcStrings.resTitle}</h3>

                  <div className="space-y-8 mb-10 relative z-10">
                    <div className="flex flex-col border-b border-white/10 pb-6 gap-2">
                      <span className="text-gray-400 font-medium uppercase tracking-wider text-sm">{t.calcStrings.resTime}</span>
                      <span className="font-bold text-3xl text-white">{calcResult.time}</span>
                    </div>
                    <div className="flex flex-col border-b border-white/10 pb-6 gap-2">
                      <span className="text-gray-400 font-medium uppercase tracking-wider text-sm">{t.calcStrings.resCount}</span>
                      <span className="font-bold text-3xl text-white">{calcResult.count} <span className="text-xl text-gray-300 font-normal">x {calcResult.transportName}</span></span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-10 italic leading-relaxed">{t.calcStrings.disclaimer}</p>

                  <button
                    onClick={handleCalcOrder}
                    className="w-full bg-[#25D366] text-white py-5 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 shadow-lg relative z-10 hover:-translate-y-1 active:scale-95"
                  >
                    <Send className="w-6 h-6" /> {t.calcStrings.orderBtn}
                  </button>
                </div>
              ) : (
                <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 p-12 text-center animate-fade-in">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="font-medium text-lg text-gray-500 max-w-sm">{t.calcStrings.emptyState}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="w-20 h-20 bg-[#C9A14A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
              <Users className="w-10 h-10 text-[#C9A14A] rotate-3" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6">{t.team.title}</h2>
            <p className="text-gray-600 text-lg">{t.team.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {t.team.members.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden shadow-xl border-8 border-gray-50 group-hover:border-[#C9A14A]/20 transition-colors duration-500">
                  <img loading="lazy" src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F3D2E] mb-2">{member.name}</h3>
                <p className="text-[#C9A14A] font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUSTOMS & DOCUMENTS --- */}
      <section id="customs" className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Scale className="w-14 h-14 text-[#C9A14A] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6">{t.customs.title}</h2>
            <p className="text-gray-600 text-lg">{t.customs.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.customs.docs.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#C9A14A] hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col items-center text-center hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner mb-6 group-hover:bg-[#C9A14A]/10 transition-colors">
                  {getDocIcon(idx)}
                </div>
                <h4 className="font-bold text-xl text-[#0F3D2E] mb-4 leading-tight">{doc.title}</h4>
                <p className="text-base text-gray-500 mb-6 flex-grow">{doc.desc}</p>
                <span className="text-[#C9A14A] text-sm font-bold flex items-center gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-[#C9A14A]/10 px-4 py-2 rounded-full">
                  <Eye className="w-4 h-4" /> {t.customs.sampleLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F3D2E] mb-6">{t.faq.title}</h2>
            <div className="w-24 h-1 bg-[#C9A14A] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-5">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-[#FAFAFA] hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-8 py-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-xl text-[#0F3D2E] pr-6 leading-tight">{item.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === idx ? 'bg-[#0F3D2E]' : 'bg-gray-100'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#C9A14A]' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 py-6 border-t border-gray-100 bg-gray-50' : 'max-h-0 py-0 bg-white'}`}>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 bg-[#0F3D2E] relative text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A14A]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 bg-white/5 rounded-[3rem] p-8 md:p-16 border border-white/10 glass-card">

            <div className="lg:w-1/2 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{t.contact.title}</h2>
              <p className="text-gray-300 mb-12 leading-relaxed text-xl">{t.contact.subtitle}</p>

              <div className="space-y-10 flex-grow">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-[#C9A14A]/20 transition-colors">
                    <Phone className="w-7 h-7 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-bold mb-2 uppercase tracking-wider">{t.contact.phoneLabel}</p>
                    <a href="tel:+998931017252" className="text-2xl md:text-3xl font-bold text-white hover:text-[#C9A14A] transition-colors">+998 93 101 72 52</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-[#C9A14A]/20 transition-colors">
                    <Mail className="w-7 h-7 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-bold mb-2 uppercase tracking-wider">{t.contact.emailLabel}</p>
                    <a href="mailto:rihsiyev71@mail.ru" className="text-xl md:text-2xl font-bold text-white hover:text-[#C9A14A] transition-colors">rihsiyev71@mail.ru</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-[#C9A14A]/20 transition-colors">
                    <MapPin className="w-7 h-7 text-[#C9A14A]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-400 font-bold mb-2 uppercase tracking-wider">{t.contact.addressLabel}</p>
                    <p className="text-lg md:text-xl font-bold text-white leading-relaxed">{t.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full z-0"></div>
                <h3 className="text-3xl font-bold text-[#0F3D2E] mb-8 relative z-10">{t.contact.quickContact}</h3>
                <div className="flex flex-col gap-6 relative z-10">
                  <a href="tel:+998931017252" className="w-full bg-[#0F3D2E] text-white py-5 px-6 rounded-2xl font-bold text-lg hover:bg-[#0a291f] transition-all flex items-center justify-center gap-3 text-center shadow-lg hover:-translate-y-1 active:scale-95">
                    <Phone className="w-6 h-6 text-[#C9A14A]" /> {t.contact.call}
                  </a>
                  <a href="https://wa.me/998931017252" target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-5 px-6 rounded-2xl font-bold text-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3 text-center shadow-lg hover:-translate-y-1 active:scale-95">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
          <p className="text-sm font-medium">© {new Date().getFullYear()} Agro-Surxon Export LLC. {t.footer.rights}</p>
        </div>
      </footer>

      {/* --- PRODUCT QUICK VIEW MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>

          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform transition-all">
            <button onClick={() => setSelectedProduct(null)} aria-label="Yopish" className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 z-10">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2 ${selectedProduct.status === 'avail' ? 'bg-[#0F3D2E]' : 'bg-[#C9A14A]'}`}>
                  {selectedProduct.status === 'avail' ? <CheckCircle className="w-4 h-4 text-[#C9A14A]" /> : '⏳'}
                  {selectedProduct.status === 'avail' ? t.products.avail : t.products.season}
                </span>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#0F3D2E] mb-6">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{selectedProduct.desc}</p>

              <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-start gap-4 p-2">
                  <Package className="w-6 h-6 text-[#C9A14A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t.products.pack}</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{selectedProduct.pack}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex items-start gap-4 p-2">
                  <ShieldCheck className="w-6 h-6 text-[#C9A14A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t.products.caliber}</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{selectedProduct.caliber}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex items-start gap-4 p-2">
                  <Truck className="w-6 h-6 text-[#C9A14A] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t.products.moq}</p>
                    <p className="font-bold text-[#1A1A1A] text-lg">{selectedProduct.moq}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleOrder(selectedProduct.name)}
                className="w-full bg-[#0F3D2E] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#0a291f] transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(15,61,46,0.2)] hover:-translate-y-1 active:scale-95"
              >
                <ShoppingCart className="w-6 h-6 text-[#C9A14A]" /> {t.products.orderBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DOCUMENT PREVIEW MODAL --- */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedDoc(null)}></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-10">
              <h3 className="font-bold text-xl text-[#0F3D2E] flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#C9A14A]" /> {t.customs.modalTitle}
              </h3>
              <button aria-label="Yopish" onClick={() => setSelectedDoc(null)} className="hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X className="w-6 h-6 text-[#0F3D2E]" />
              </button>
            </div>

            <div className="p-6 bg-gray-100 flex-grow flex items-center justify-center overflow-auto relative min-h-[400px]">
              {selectedDoc.img ? (
                <img src={selectedDoc.img} alt={selectedDoc.title} className="max-w-full max-h-[70vh] object-contain shadow-2xl relative z-20 rounded-lg" />
              ) : (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none z-10">
                    <BadgeCheck className="w-48 h-48 mb-6 text-[#0F3D2E]" />
                    <p className="text-6xl font-black uppercase tracking-widest text-[#0F3D2E] transform -rotate-12">{t.customs.sampleWatermark}</p>
                  </div>
                  <div className="w-full max-w-lg bg-white shadow-xl h-[500px] rounded-lg relative z-20 flex flex-col items-center justify-center p-8 text-center border border-gray-200">
                    <div className="w-full h-4 bg-gray-200 rounded-full mb-4"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded-full mb-10"></div>
                    <Award className="w-24 h-24 text-[#C9A14A]/40 mb-10" />
                    <div className="w-full space-y-3">
                      <div className="w-full h-3 bg-gray-100 rounded-full"></div>
                      <div className="w-5/6 h-3 bg-gray-100 rounded-full"></div>
                      <div className="w-4/6 h-3 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 bg-white text-center border-t border-gray-100">
              <p className="font-bold text-[#0F3D2E] text-2xl mb-2">{selectedDoc.title}</p>
              <p className="text-gray-500 text-base">{selectedDoc.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- STICKY MOBILE CALL BUTTON --- */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a href="https://wa.me/998931017252" aria-label="WhatsApp" className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-95">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
      </div>

    </div>
  );
}