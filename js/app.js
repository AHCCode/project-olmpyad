/**
 * AFRIMÉTIERS HUB 🇩🇿 — ALGER PAYS HÔTE & NATIONS AFRICAINES PARTICIPANTES
 * African Skills Olympics 2026
 */

const STORAGE_KEY = 'afrimetiers_olympiad_2026_dz_pan_v6';

const CURRENCY_RATES = {
  DZD: { rate: 135.0, symbol: 'DA', locale: 'fr-DZ' },
  USD: { rate: 1, symbol: 'USD', locale: 'fr-FR' },
  TND: { rate: 3.1, symbol: 'TND', locale: 'fr-TN' },
  XOF: { rate: 605.0, symbol: 'FCFA', locale: 'fr-SN' }
};

const COUNTRY_FLAGS = {
  DZ: '🇩🇿',
  TN: '🇹🇳',
  SN: '🇸🇳',
  NE: '🇳🇪',
  CI: '🇨🇮',
  EG: '🇪🇬'
};

const COUNTRY_NAMES = {
  DZ: { fr: 'Algérie (Pays Hôte)', ar: 'الجزائر (البلد المضيف)' },
  TN: { fr: 'Tunisie', ar: 'تونس' },
  SN: { fr: 'Sénégal', ar: 'السنغال' },
  NE: { fr: 'Niger', ar: 'النيجر' },
  CI: { fr: 'Côte d’Ivoire', ar: 'ساحل العاج' },
  EG: { fr: 'Égypte', ar: 'مصر' }
};

// Bespoke Procedural SVG Artwork Data-URIs per Craft Sector
function getCraftArtworkDataURI(categoryId, variant = 1) {
  const palettes = {
    5: ['#0B2545', '#134074', '#E2A336', '#D95326'], // Dinanderie Casbah, Zellige & Qallaline
    2: ['#450A0A', '#7F1D1D', '#E2A336', '#FEF08A'], // Broderie Majboud Constantine & Karakou
    4: ['#0F172A', '#1E3A5F', '#EF4444', '#E2A336'], // Bijouterie Kabyle Ath Yenni & Hoggar
    1: ['#2B1810', '#8C3B19', '#F59E0B', '#FEF3C7'], // Tapis de Ghardaïa (M'zab) & Manjak
    3: ['#1F1209', '#5C2C16', '#D97706', '#FDE68A']  // Ébénisterie, Cèdre & Marqueterie
  };
  const [c1, c2, c3, c4] = palettes[categoryId] || palettes[5];
  const rot = (variant * 22.5) % 90;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" height="320">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="55%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c1}"/>
      </linearGradient>
      <pattern id="p" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="${c3}" stroke-width="1.2" stroke-opacity="0.28"/>
        <circle cx="40" cy="40" r="14" fill="none" stroke="${c4}" stroke-width="1" stroke-opacity="0.22"/>
      </pattern>
    </defs>
    <rect width="600" height="320" fill="url(#g)"/>
    <rect width="600" height="320" fill="url(#p)"/>
    <g transform="translate(460, 160) rotate(${rot})" opacity="0.42">
      <rect x="-95" y="-95" width="190" height="190" fill="none" stroke="${c3}" stroke-width="2.5"/>
      <rect x="-95" y="-95" width="190" height="190" transform="rotate(45)" fill="none" stroke="${c4}" stroke-width="2.5"/>
      <circle r="62" fill="none" stroke="${c3}" stroke-width="2"/>
      <circle r="26" fill="${c3}" fill-opacity="0.25" stroke="${c4}" stroke-width="1.5"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateQRMatrixSVG(seedText) {
  let cells = '';
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const code = seedText.charCodeAt((r * 7 + c) % seedText.length);
      const isCorner = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
      if (isCorner || (code + r * c) % 2 === 0) {
        cells += `<rect x="${c * 8 + 4}" y="${r * 8 + 4}" width="6.5" height="6.5" rx="1.2" fill="#0E172A"/>`;
      }
    }
  }
  return `<svg width="64" height="64" viewBox="0 0 64 64" style="background:#fff; border-radius:8px; padding:4px; border:1px solid #E2A336;">${cells}</svg>`;
}

const I18N = {
  fr: {
    dir: 'ltr',
    nav_home: '1. Accueil',
    nav_directory: '2. Annuaire',
    nav_profile: '3. Atelier 360°',
    nav_quote: '4. Devis & Suivi',
    nav_about: '5. À Propos',
    nav_admin: '6. Comité Admin',
    hero_badge: '🇩🇿 Algérie Pays Hôte — Olympiades Africaines des Métiers 2026',
    hero_title_1: 'L’Algérie au Cœur de',
    hero_title_2: ' l’Excellence Artisanale d’Afrique',
    hero_subtitle: 'Sous l’égide d’Alger (La Casbah, Constantine, Ath Yenni, Ghardaïa), la plateforme réunit les plus grands maîtres artisans d’Algérie et des nations africaines invitées (Tunisie, Sénégal, Niger, Côte d’Ivoire, Égypte).',
    hero_search_btn: 'Explorer',
    hero_cta_explore: 'Explorer l’Annuaire',
    hero_cta_quote: '✦ Configurer un Devis Sur-Mesure',
    map_card_title: 'Algérie (Hôte #1) & Nations Participantes',
    kpi_artisans: 'Maîtres Artisans Publiés',
    kpi_countries: 'Pays (Algérie #1 Hôte)',
    kpi_categories: 'Filières d’Art',
    kpi_quotes: 'Devis Certifiés',
    sec_corridor: '🇩🇿 Algérie (Pays Hôte) & Nations Africaines Participantes',
    sec_corridor_hint: 'Cliquez sur un pays ou sur la carte pour filtrer les maîtres artisans',
    sec_categories: 'Filières d’Artisanat d’Art',
    sec_featured: 'Maîtres Artisans à la Une (Algérie en Tête d’Affiche)',
    btn_see_all: 'Voir tout l’annuaire →',
    dir_title: 'Annuaire Officiel des Maîtres Artisans',
    dir_subtitle: 'Recherche multi-critères par filière, pays (Algérie #1 & Afrique) et ville/wilaya parmi les profils publiés.',
    filter_category: 'Catégorie de métier',
    filter_country: 'Pays',
    filter_city: 'Wilaya / Ville / Spécialité',
    filter_sort: 'Trier par',
    filter_all_categories: 'Toutes les filières d’art',
    filter_all_countries: 'Tous les pays (Algérie en tête)',
    filter_city_placeholder: 'Ex: Alger, Constantine, Ath Yenni, Ghardaïa, Nabeul, Dakar...',
    filter_reset: 'Réinitialiser',
    card_exp: 'ans d’exp.',
    card_from: 'Dès',
    card_view_profile: 'Atelier 360°',
    card_request_quote: 'Demander un Devis',
    profile_back: '← Retour à l’annuaire',
    profile_verified: 'Maître Artisan Certifié & Publié',
    profile_workshop: 'Atelier Officiel',
    profile_location: 'Wilaya / Ville & Pays',
    profile_bio: 'Histoire de l’Atelier & Savoir-Faire Transmis',
    profile_process: 'Étapes du Savoir-Faire en Atelier',
    profile_portfolio: 'Chef-d’œuvres & Galerie Interactive (Cliquez pour agrandir)',
    quote_title: 'Demande de Devis & Suivi Temps Réel',
    quote_subtitle: 'Toute demande est liée à un maître artisan publié, reçoit une référence unique (DEV-2026-XXXX) et suit une machine à états contrôlée.',
    tracker_title: '🔍 Suivre une Demande de Devis par Référence Unique',
    tracker_subtitle: 'Cliquez sur une référence existante ou saisissez votre code pour inspecter son état dans la machine à états :',
    sim_title: 'Simulateur de Complexité & Coûts',
    sim_desc: 'Estimez la répartition budgétaire (Matières premières nobles, Main-d’œuvre Maâlem, Logistique & Assurance) en Dinars Algériens (DA), USD, TND ou CFA.',
    quote_select_artisan: 'Maître Artisan destinataire (Statut "Publié" uniquement) *',
    quote_client_name: 'Votre nom complet *',
    quote_client_email: 'Votre adresse email *',
    quote_client_phone: 'Téléphone / WhatsApp *',
    quote_client_country: 'Wilaya / Pays de résidence *',
    quote_service_title: 'Objet du projet artisanal *',
    quote_budget: 'Budget estimatif (USD équiv.)',
    quote_deadline: 'Date souhaitée',
    quote_desc: 'Description détaillée du besoin (dimensions, matériaux, quantités) *',
    quote_submit: '✦ Générer la Référence Unique & Envoyer le Devis',
    quote_rule_notice: 'Règle métier #2 active : Seuls les artisans au statut "Publié" peuvent recevoir une demande de devis.',
    about_title: 'À Propos d’AFRIMÉTIERS HUB 🇩🇿 & Charte d’Alger 2026',
    about_mission_title: 'L’Algérie, Carrefour de l’Artisanat Africain',
    about_mission_text: 'Établie à Alger dans le cadre des Olympiades Africaines des Métiers 2026, la plateforme AFRIMÉTIERS HUB place le génie artisanal algérien (Casbah d’Alger, Constantine, Ath Yenni, Ghardaïa, Tlemcen) en tête d’affiche, tout en accueillant les délégations fraternelles de Tunisie, du Sénégal, du Niger, de Côte d’Ivoire et d’Égypte.',
    contact_title: 'Contacter le Haut Comité d’Alger',
    admin_title: 'Tour de Contrôle — Comité Olympiades Alger 2026',
    admin_subtitle: 'Analytique par pays (Algérie #1) et wilaya, gestion des statuts de publication, machine à états irréversible et studio SQL.',
    admin_artisans_heading: '1. Gestion des Profils Artisans (Visibilité Publique = "Publié")',
    admin_quotes_heading: '2. Suivi des Demandes de Devis (Machine à états irréversible depuis "Nouvelle")',
    state_locked_note: 'Verrouillé : retour à "Nouvelle" interdit (Trigger MySQL)'
  },
  ar: {
    dir: 'rtl',
    nav_home: '1. الرئيسية',
    nav_directory: '2. دليل الحرفيين',
    nav_profile: '3. الورشة 360°',
    nav_quote: '4. عرض السعر والتتبع',
    nav_about: '5. حول المنصة',
    nav_admin: '6. لوحة اللجنة',
    hero_badge: '🇩🇿 الجزائر البلد المضيف — الأولمبياد الأفريقي للمهن والحرف 2026',
    hero_title_1: 'الجزائر في قلب',
    hero_title_2: ' التميز الحرفي الأفريقي',
    hero_subtitle: 'تحت إشراف الجزائر العاصمة (القصبة، قسنطينة، آث يني، غرداية)، تجمع المنصة كبار المعلمين الحرفيين من الجزائر والدول الأفريقية المشاركة (تونس، السنغال، النيجر، ساحل العاج، مصر).',
    hero_search_btn: 'استكشف',
    hero_cta_explore: 'استكشف الدليل الرسمي',
    hero_cta_quote: '✦ تصميم وطلب عرض سعر مخصص',
    map_card_title: 'الجزائر (البلد المضيف #1) والدول المشاركة',
    kpi_artisans: 'حرفيون منشورون',
    kpi_countries: 'دول (الجزائر #1)',
    kpi_categories: 'قطاعات فنية',
    kpi_quotes: 'عروض أسعار معتمدة',
    sec_corridor: '🇩🇿 الجزائر (البلد المضيف) والدول الأفريقية المشاركة',
    sec_corridor_hint: 'انقر على دولة أو على الخارطة لتصفية المعلمين الحرفيين',
    sec_categories: 'قطاعات الصناعات التقليدية والفنية',
    sec_featured: 'حرفيون متميزون في الواجهة (الجزائر في الصدارة)',
    btn_see_all: 'عرض كامل الدليل ←',
    dir_title: 'الدليل الرسمي لكبار الحرفيين',
    dir_subtitle: 'بحث متعدد المعايير حسب القطاع والدولة (الجزائر #1 وأفريقيا) والولاية/المدينة.',
    filter_category: 'الفئة الحرفية',
    filter_country: 'الدولة',
    filter_city: 'الولاية / المدينة / التخصص',
    filter_sort: 'ترتيب حسب',
    filter_all_categories: 'جميع الفئات الحرفية',
    filter_all_countries: 'جميع الدول (الجزائر في الصدارة)',
    filter_city_placeholder: 'مثال: الجزائر، قسنطينة، آث يني، غرداية، نابل، داكار...',
    filter_reset: 'إعادة ضبط',
    card_exp: 'سنة خبرة',
    card_from: 'ابتداءً من',
    card_view_profile: 'الورشة 360°',
    card_request_quote: 'طلب عرض سعر',
    profile_back: '→ العودة إلى الدليل',
    profile_verified: 'معلم حرفي معتمد ومنشور',
    profile_workshop: 'الورشة الرسمية',
    profile_location: 'الولاية / المدينة والدولة',
    profile_bio: 'تاريخ الورشة والمهارات المتوارثة',
    profile_process: 'مراحل الإنجاز الفني داخل الورشة',
    profile_portfolio: 'روائع الأعمال والمعرض التفاعلي (انقر للتكبير)',
    quote_title: 'طلب عرض سعر وتتبع فوري',
    quote_subtitle: 'يرتبط كل طلب بحرفي منشور ويحصل على مرجع فريد (DEV-2026-XXXX) ضمن آلة حالات محمية.',
    tracker_title: '🔍 تتبع حالة طلب عرض السعر بالمرجع الفريد',
    tracker_subtitle: 'انقر على مرجع متاح أو أدخل الرمز لمعاينة مرحلته الحالية:',
    sim_title: 'محاكي درجة التعقيد وتفصيل التكاليف',
    sim_desc: 'قدّر توزيع الميزانية بالدينار الجزائري (DA) أو الدولار أو الدينار التونسي أو الفرنك الأفريقي.',
    quote_select_artisan: 'الحرفي المعني (حالة "منشور / Publié" حصرياً) *',
    quote_client_name: 'الاسم الكامل للعميل *',
    quote_client_email: 'البريد الإلكتروني *',
    quote_client_phone: 'رقم الهاتف / واتساب *',
    quote_client_country: 'الولاية / بلد الإقامة *',
    quote_service_title: 'عنوان المشروع الحرفي *',
    quote_budget: 'الميزانية التقديرية (USD)',
    quote_deadline: 'تاريخ التسليم المرغوب',
    quote_desc: 'وصف تفصيلي للمشروع (الأبعاد، المواد، الكميات المطلوبة) *',
    quote_submit: '✦ توليد المرجع الفريد وإرسال الطلب',
    quote_rule_notice: 'قاعدة العمل #2 المفعلة: لا يمكن إرسال طلب عرض سعر إلا لحرفي يحمل حالة "Publié".',
    about_title: 'حول منصة AFRIMÉTIERS HUB 🇩🇿 وميثاق الجزائر 2026',
    about_mission_title: 'الجزائر ملتقى الإبداع الحرفي الأفريقي',
    about_mission_text: 'تأسست منصة AFRIMÉTIERS HUB بالجزائر العاصمة في إطار أولمبياد المهن الأفريقي 2026 لتضع الحرفي الجزائري في الصدارة مع استضافة الوفود الشقيقة من تونس والسنغال والنيجر وساحل العاج ومصر.',
    contact_title: 'تواصل مع اللجنة العليا بالجزائر العاصمة',
    admin_title: 'برج المراقبة — لجنة أولمبياد الجزائر 2026',
    admin_subtitle: 'تحليلات حسب الدولة (الجزائر #1) والولاية، إدارة حالات النشر، وآلة الحالات واستعلامات SQL.',
    admin_artisans_heading: '1. إدارة ملفات الحرفيين (الظهور للعموم مشروط بالحالة "Publié")',
    admin_quotes_heading: '2. تتبع طلبات عروض الأسعار (يُمنع الرجوع إلى حالة "Nouvelle" بعد المعالجة)',
    state_locked_note: 'مقفل: يُمنع الرجوع إلى حالة Nouvelle (Trigger MySQL)'
  }
};

function getInitialData() {
  return {
    lang: 'fr',
    theme: 'light',
    currency: 'DZD',
    directoryView: 'grid',
    activeScreen: 'home',
    selectedArtisanId: 1,
    activeCorridorCountry: '',
    categories: [
      { id: 1, slug: 'tapis-mzab-tissage', name_fr: 'Tapis du M’zab & Tissage d’Art', name_ar: 'زرابي ميزاب وفنون النسيج الأفريقي', icon: '🧶' },
      { id: 2, slug: 'majboud-karakou-cuir', name_fr: 'Broderie Majboud, Karakou & Cuir', name_ar: 'المجبود القسنطيني، الكاراكو والجلود', icon: '👑' },
      { id: 3, slug: 'ebenisterie-sculpture', name_fr: 'Ébénisterie, Cèdre & Marqueterie', name_ar: 'النجارة الفنية، خشب الأرز والتطعيم بالصدف', icon: '🪵' },
      { id: 4, slug: 'bijouterie-ath-yenni-argent', name_fr: 'Bijouterie d’Ath Yenni & Orfèvrerie', name_ar: 'حلي آث يني والفضة الصحراوية', icon: '💍' },
      { id: 5, slug: 'dinanderie-casbah-ceramique', name_fr: 'Dinanderie de la Casbah, Céramique & Zellige', name_ar: 'النحاس الفني بالقصبة، الخزف والزليج', icon: '🏺' }
    ],
    artisans: [
      // 1. ALGERIA #1 — ALGER (LA CASBAH)
      {
        id: 1,
        matricule: 'ART-DZ-2026-001',
        category_id: 5,
        full_name_fr: 'Maâlem Khaled Benmansour',
        full_name_ar: 'المعلم خالد بن منصور',
        workshop_name_fr: 'Dar El Nahas — Casbah d’Alger',
        workshop_name_ar: 'ورشة دار النحاس — قصبة الجزائر',
        specialty_fr: 'Dinanderie d’Art, Grands Plateaux Sniwa en Cuivre Ciselé & Lustres',
        specialty_ar: 'النحاس الفني المنقوش، صواني السنيوة الملكية والثريات العاصمية',
        bio_fr: 'Maître dinandier de 3ème génération au cœur de la Casbah d’Alger, Khaled Benmansour cisèle au marteau et au burin des plateaux royaux (Sniwa), aiguières (Mahbès) et lustres monumentaux ornés d’arabesques florales algéroises.',
        bio_ar: 'معلم حرفي في النقش على النحاس من الجيل الثالث بقلب قصبة الجزائر، يبدع يدوياً صواني السنيوة الملكية والمرشات والثريات الكبرى المزخرفة بالنقوش العاصمية الأصيلة.',
        country_code: 'DZ',
        country_fr: 'Algérie',
        country_ar: 'الجزائر',
        city_fr: 'Alger (La Casbah)',
        city_ar: 'الجزائر العاصمة (القصبة)',
        phone: '+213 5 50 12 34 56',
        email: 'k.benmansour@darnahas-casbah.dz',
        years_experience: 24,
        starting_price: 420,
        olympiad_score: '99.8 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Martelage de la Feuille de Cuivre Rouge', '2. Traçage des Motifs Floraux de la Casbah', '3. Ciselure Profonde au Burin (Naqch)', '4. Étamage Traditionnel & Polissage Miroir'],
        process_ar: ['1. طرق صفائح النحاس الأحمر الخالص', '2. تسطير الزخارف النباتية لقصبة الجزائر', '3. النقش العميق بالإزميل اليدوي', '4. التبييض التقليدي والتلميع البراق'],
        portfolio: [
          { title_fr: 'Grand Plateau Royal "Sniwa" Ciselé de la Casbah (Ø 110cm)', title_ar: 'صينية "سنيوة" ملكية منقوشة من قصبة الجزائر (قطر 110 سم)', price_usd: 1450, tag: 'Pièce Musée Alger', dims: 'Ø 110 cm • Cuivre Massif' },
          { title_fr: 'Lustre Monumental Algérois en Cuivre Ajuré (24 lampes)', title_ar: 'ثريا عاصمية صرحية من النحاس المخرم (24 مصباحاً)', price_usd: 3200, tag: 'Architecture', dims: '180 x 120 cm' },
          { title_fr: 'Service à Thé Traditionnel & Aiguière de Mariage Algérois', title_ar: 'طقم شاي تقليدي ومرش عاصمي للأعراس', price_usd: 680, tag: 'Patrimoine', dims: 'Ensemble 7 pièces' }
        ]
      },
      // 2. ALGERIA #2 — CONSTANTINE
      {
        id: 2,
        matricule: 'ART-DZ-2026-002',
        category_id: 2,
        full_name_fr: 'Nour El Houda Mansouri',
        full_name_ar: 'نور الهدى المنصوري',
        workshop_name_fr: 'Maison du Majboud & Karakou — Constantine',
        workshop_name_ar: 'دار المجبود والفرقاني والكاراكو — قسنطينة',
        specialty_fr: 'Haute Broderie au Fil d’Or (Majboud & Fetla) & Maroquinerie Royale',
        specialty_ar: 'التطريز الرفيع بخيط الذهب (المجبود والفتلة) والجلود الملكية',
        bio_fr: 'Maître brodeuse sur cuir et velours à Constantine, Nour El Houda perpétue l’art séculaire du Majboud (broderie au fil d’or et d’argent) appliqué aux coffrets diplomatiques, selles d’apparat et tenues d’art.',
        bio_ar: 'معلمة حرفية في تطريز المجبود والفتلة بقسنطينة، تحافظ على فن التطريز بخيوط الذهب والفضة على المخمل والجلد لصناعة الصناديق الدبلوماسية والتحف التراثية.',
        country_code: 'DZ',
        country_fr: 'Algérie',
        country_ar: 'الجزائر',
        city_fr: 'Constantine',
        city_ar: 'قسنطينة',
        phone: '+213 6 61 23 45 67',
        email: 'nour.mansouri@majboud-constantine.dz',
        years_experience: 19,
        starting_price: 350,
        olympiad_score: '99.5 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Tannage Végétal & Velours de Soie Grenat', '2. Ponçage du Motif (Rchem) Constantinois', '3. Pose du Carton & Broderie au Fil d’Or (Majboud)', '4. Gainage sur Bois de Cèdre Odorant'],
        process_ar: ['1. تحضير الجلد الطبيعي ومخمل الحرير العنابي', '2. طبع الرشم القسنطيني الأصيل', '3. التطريز الدقيق بخيط الذهب الخالص (المجبود)', '4. التغليف على خشب الأرز العطري'],
        portfolio: [
          { title_fr: 'Coffret Protocolaire en Velours Grenat & Fil d’Or Majboud', title_ar: 'صندوق تشريفات بالمخمل العنابي وخيط الذهب القسنطيني', price_usd: 890, tag: 'Protocole d’État', dims: '50 x 35 x 22 cm' },
          { title_fr: 'Panneau Mural Encadré en Fetla & Majboud Royal', title_ar: 'لوحة جدارية فاخرة مطرزة بالفتلة والمجبود الملكي', price_usd: 1250, tag: 'Haute Couture d’Art', dims: '120 x 80 cm' }
        ]
      },
      // 3. ALGERIA #3 — TIZI OUZOU (ATH YENNI)
      {
        id: 3,
        matricule: 'ART-DZ-2026-003',
        category_id: 4,
        full_name_fr: 'Amokrane Aït Menguellet',
        full_name_ar: 'أمقران آيت منقلات',
        workshop_name_fr: 'Atelier Taos — Orfèvrerie d’Ath Yenni (Kabylie)',
        workshop_name_ar: 'ورشة طاوس — صياغة الفضة والمرجان بآث يني (تيزي وزو)',
        specialty_fr: 'Bijouterie Kabyle en Argent Massif Émaillé & Corail Rouge d’El Kala',
        specialty_ar: 'الحلي القبائلية بالفضة الخالصة المينائية والمرجان الأحمر الحر',
        bio_fr: 'Maître bijoutier à Ath Yenni (Wilaya de Tizi Ouzou), Amokrane maîtrise la fusion des émaux polychromes (bleu, vert et jaune) encadrés de filigranes d’argent et sertis de véritable corail rouge méditerranéen d’El Kala.',
        bio_ar: 'معلم صائغ بقرية آث يني العريقة (ولاية تيزي وزو)، يتقن فن الفضة المزججة بالمينا الملونة والفيليغران المرصع بالمرجان الأحمر الجزائري الخالص من القالة.',
        country_code: 'DZ',
        country_fr: 'Algérie',
        country_ar: 'الجزائر',
        city_fr: 'Tizi Ouzou (Ath Yenni)',
        city_ar: 'تيزي وزو (آث يني)',
        phone: '+213 5 55 88 99 00',
        email: 'amokrane@bijoux-athyenni.dz',
        years_experience: 21,
        starting_price: 280,
        olympiad_score: '99.3 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Fonte & Laminage de l’Argent Massif 950', '2. Tressage des Cloisons en Filigrane (Taqfa)', '3. Pose & Cuisson des Émaux Polychromes', '4. Sertissage du Corail Rouge Naturel d’El Kala'],
        process_ar: ['1. صهر وتشكيل الفضة الخالصة عيار 950', '2. جدل أسلاك الفيليغران الدقيقة', '3. وضع وحرق المينا بالألوان التقليدية', '4. ترصيع المرجان الأحمر الحر لمدينة القالة'],
        portfolio: [
          { title_fr: 'Grande Parure "Tabzimt" Royale en Argent Émaillé & Corail', title_ar: 'طقم "ثابزيمث" ملكي من الفضة المينائية والمرجان الحر', price_usd: 1650, tag: 'Trésor National', dims: 'Argent 950 (420g) & Corail' },
          { title_fr: 'Bracelets "Amendil" & Diadème "Taâssabt" d’Ath Yenni', title_ar: 'أساور وتاج "تعصابت" تقليدي من آث يني', price_usd: 920, tag: 'Joaillerie', dims: 'Pièce Numérotée' }
        ]
      },
      // 4. ALGERIA #4 — GHARDAÏA (VALLÉE DU M'ZAB)
      {
        id: 4,
        matricule: 'ART-DZ-2026-004',
        category_id: 1,
        full_name_fr: 'Cheikh Brahim Ould Slimane',
        full_name_ar: 'الشيخ إبراهيم ولد سليمان',
        workshop_name_fr: 'Tissages de la Pentapole — Vallée du M’zab (Ghardaïa)',
        workshop_name_ar: 'منسوجات وادي ميزاب — غرداية',
        specialty_fr: 'Tapis Traditionnel de Ghardaïa (Haute Laine) & Symboles Géométriques',
        specialty_ar: 'الزربية الميزابية الأصيلة بغرداية والنسيج الصوفي الفاخر',
        bio_fr: 'Maître tisserand à Ghardaïa (Vallée du M’zab classée UNESCO), Brahim perpétue le tissage à points noués en pure laine vierge teinte à la garance, au henné et à l’indigo.',
        bio_ar: 'معلم نساج بغرداية (وادي ميزاب المصنف لدى اليونسكو)، يحافظ على حياكة الزرابي الصوفية الخالصة المصبوغة بالنباتات الطبيعية.',
        country_code: 'DZ',
        country_fr: 'Algérie',
        country_ar: 'الجزائر',
        city_fr: 'Ghardaïa',
        city_ar: 'غرداية',
        phone: '+213 6 62 44 55 66',
        email: 'brahim.mzab@tapis-ghardaia.dz',
        years_experience: 26,
        starting_price: 310,
        olympiad_score: '99.1 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Cardage & Filage de la Laine Vierge des Hauts-Plateaux', '2. Teinture Végétale (Garance, Safran, Indigo)', '3. Nouage Manuel sur Métier Vertical (Azetta)', '4. Tonte Égalisatrice & Lavage à l’Eau de Source'],
        process_ar: ['1. نداف وغزل الصوف البكر للهضاب العليا', '2. الصباغة النباتية الطبيعية', '3. العقد اليدوي على النول العمودي (أزطا)', '4. القص المتساوي والغسل بماء العيون'],
        portfolio: [
          { title_fr: 'Grand Tapis d’Apparat de Ghardaïa Pure Laine Vierge', title_ar: 'زربية غرداية الكبرى من الصوف الخالص', price_usd: 1580, tag: 'Patrimoine UNESCO', dims: '350 x 250 cm' }
        ]
      },
      // 5. TUNISIA — NABEUL
      {
        id: 5,
        matricule: 'ART-TN-2026-005',
        category_id: 5,
        full_name_fr: 'Maâlem Youssef El Kairouani',
        full_name_ar: 'المعلم يوسف القيرواني',
        workshop_name_fr: 'Atelier Dar Qallaline Nabeul',
        workshop_name_ar: 'ورشة دار القلالين نابل',
        specialty_fr: 'Céramique Qallaline & Faïence Polychrome de Nabeul',
        specialty_ar: 'خزف القلالين والفسيفساء الهندسية بنابل وتونس',
        bio_fr: 'Maître céramiste à Nabeul représentant la délégation tunisienne aux Olympiades d’Alger 2026, spécialisé dans les fresques murales en faïence polychrome de Qallaline.',
        bio_ar: 'معلم حرفي في الخزف والقلالين بنابل يمثل الوفد التونسي في أولمبياد الجزائر 2026، متخصص في اللوحات الجدارية الخزفية.',
        country_code: 'TN',
        country_fr: 'Tunisie',
        country_ar: 'تونس',
        city_fr: 'Nabeul',
        city_ar: 'نابل',
        phone: '+216 72 23 45 67',
        email: 'youssef.kairouani@darqallaline.tn',
        years_experience: 20,
        starting_price: 290,
        olympiad_score: '98.6 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Pétrissage Argile Fine du Cap Bon', '2. Émaillage Polychrome Qallaline', '3. Dessin & Ciselure Florale', '4. Cuisson Traditionnelle'],
        process_ar: ['1. عجن طين الوطن القبلي بنابل', '2. التزجيج متعدد الألوان بطراز القلالين', '3. الرسم والنقش الهندسي والزهري', '4. الحرق التقليدي'],
        portfolio: [
          { title_fr: 'Fontaine Murale en Céramique Qallaline de Nabeul', title_ar: 'نافورة جدارية بخزف القلالين النابلي', price_usd: 1850, tag: 'Délégation Tunisie', dims: '220 x 160 cm' }
        ]
      },
      // 6. SENEGAL — DAKAR
      {
        id: 6,
        matricule: 'ART-SN-2026-006',
        category_id: 1,
        full_name_fr: 'Aïssatou Ndiaye',
        full_name_ar: 'عيساتو ندياي',
        workshop_name_fr: 'Tissages Royaux du Sahel — Dakar',
        workshop_name_ar: 'المنسوجات الملكية للساحل — داكار',
        specialty_fr: 'Tissage Manjak & Bogolan contemporain',
        specialty_ar: 'نسيج المانجاك والبوغولان المعاصر',
        bio_fr: 'Créatrice textile primée à Dakar représentant la délégation sénégalaise à Alger, fusionnant les motifs ancestraux Manjak avec des fibres biologiques.',
        bio_ar: 'مبدعة نسيج في داكار تمثل الوفد السنغالي بالجزائر، تدمج زخارف المانجاك العريقة مع الألياف العضوية.',
        country_code: 'SN',
        country_fr: 'Sénégal',
        country_ar: 'السنغال',
        city_fr: 'Dakar',
        city_ar: 'داكار',
        phone: '+221 77 456 78 90',
        email: 'aissatou@tissages-sahel.sn',
        years_experience: 14,
        starting_price: 180,
        olympiad_score: '98.2 / 100',
        is_featured: true,
        status: 'Publié',
        process_fr: ['1. Filage Coton Bio Casamance', '2. Bain d’Indigo Naturel', '3. Tissage sur Métier Traditionnel', '4. Broderie de Fils d’Or'],
        process_ar: ['1. غزل القطن العضوي', '2. الصباغة بالنيلة الطبيعية', '3. النسج على النول التقليدي', '4. التطريز بخيوط الذهب'],
        portfolio: [
          { title_fr: 'Tenture Murale Royale Manjak Or & Indigo', title_ar: 'جدارية مانجاك ملكية بالذهبي والنيلي', price_usd: 620, tag: 'Délégation Sénégal', dims: '220 x 150 cm' }
        ]
      },
      // 7. NIGER — AGADEZ
      {
        id: 7,
        matricule: 'ART-NE-2026-007',
        category_id: 4,
        full_name_fr: 'Idriss Ag Mohamed',
        full_name_ar: 'إدريس آغ محمد',
        workshop_name_fr: 'Forge d’Argent d’Agadez',
        workshop_name_ar: 'صياغة الفضة أغاديز',
        specialty_fr: 'Orfèvrerie Saharienne & Gravure Tifinagh sur Argent',
        specialty_ar: 'الصياغة الصحراوية والنقش بالتيفيناغ على الفضة',
        bio_fr: 'Héritier du savoir-faire des forgerons de l’Aïr, façonnant à la cire perdue des bijoux en argent massif gravés au burin.',
        bio_ar: 'وريث مهارة صناع الفضة في أغاديز، يصيغ بطريقة الشمع المفقود حلياً من الفضة الخالصة المنقوشة.',
        country_code: 'NE',
        country_fr: 'Niger',
        country_ar: 'النيجر',
        city_fr: 'Agadez',
        city_ar: 'أغاديز',
        phone: '+227 90 11 22 33',
        email: 'idriss.silver@agadez-art.ne',
        years_experience: 18,
        starting_price: 140,
        olympiad_score: '98.0 / 100',
        is_featured: false,
        status: 'Publié',
        process_fr: ['1. Modelage Cire Perdue', '2. Fonte Argent 925', '3. Ciselure Géométrique', '4. Polissage au Sable fin'],
        process_ar: ['1. تشكيل قالب الشمع', '2. صهر الفضة الخالصة', '3. النقش الهندسي', '4. التلميع التقليدي'],
        portfolio: [
          { title_fr: 'Collier Tcherot & Croix d’Agadez en Argent Massif', title_ar: 'عقد تشيروت وصليب أغاديز من الفضة الخالصة', price_usd: 340, tag: 'Délégation Niger', dims: 'Argent 925' }
        ]
      },
      // 8. CÔTE D'IVOIRE — ABIDJAN & EGYPT — LE CAIRE
      {
        id: 8,
        matricule: 'ART-CI-2026-008',
        category_id: 3,
        full_name_fr: 'Koffi Kouamé',
        full_name_ar: 'كوفي كوامي',
        workshop_name_fr: 'Ébène Royal Grand-Bassam — Abidjan',
        workshop_name_ar: 'الأبنوس الملكي غراند بسام — أبيدجان',
        specialty_fr: 'Sculpture Akan sur bois d’ébène et acajou',
        specialty_ar: 'نحت الأكان على خشب الأبنوس والماهوغاني',
        bio_fr: 'Sculpteur maître d’atelier à Abidjan et Grand-Bassam, spécialisé dans le mobilier d’art monoxyle et les portes monumentales.',
        bio_ar: 'نحات ومعلم ورشة في أبيدجان وغراند بسام، متخصص في الأثاث الفني والأبواب الصرحية.',
        country_code: 'CI',
        country_fr: 'Côte d’Ivoire',
        country_ar: 'ساحل العاج',
        city_fr: 'Abidjan',
        city_ar: 'أبيدجان',
        phone: '+225 07 08 09 10 11',
        email: 'koffi@ebeneroyal.ci',
        years_experience: 16,
        starting_price: 320,
        olympiad_score: '97.9 / 100',
        is_featured: false,
        status: 'Publié',
        process_fr: ['1. Sélection Bois Durable', '2. Ébauche à l’Herminette', '3. Sculpture Bas-Reliefs', '4. Patine Cire d’Abeille'],
        process_ar: ['1. اختيار الأخشاب المعتمدة', '2. النحت الأولي', '3. نحت الزخارف البارزة', '4. التلميع بشمع العسل'],
        portfolio: [
          { title_fr: 'Porte Monumentale Ciselée Akan (Acajou Massif)', title_ar: 'باب صرحي منقوش بطراز الأكان', price_usd: 2400, tag: 'Délégation Côte d’Ivoire', dims: '240 x 120 cm' }
        ]
      },
      // 9. ALGERIA #5 — TLEMCEN (Status: 'En attente' to test Business Rule #1 blocking)
      {
        id: 9,
        matricule: 'ART-DZ-2026-009',
        category_id: 5,
        full_name_fr: 'Yacine Boumediene',
        full_name_ar: 'ياسين بومدين',
        workshop_name_fr: 'Atelier El Mechouar — Zellige & Cèdre de Tlemcen',
        workshop_name_ar: 'ورشة المشوار — الزليج وخشب الأرز بتلمسان',
        specialty_fr: 'Zellige Tlemcénien, Poterie Vernissée & Moucharabieh en Cèdre',
        specialty_ar: 'الزليج التلمساني، الفخار المزجج والمشربيات بخشب الأرز',
        bio_fr: 'Spécialiste de la mosaïque de faïence tlemcénienne et du bois de cèdre sculpté pour l’architecture arabo-andalouse (Actuellement en attente de publication par le Comité d’Alger — Invisible du public selon la Règle Métier #1).',
        bio_ar: 'متخصص في الزليج التلمساني الأصيل ونقش خشب الأرز للعمارة الأندلسية (قيد المصادقة من طرف لجنة الجزائر — غير مرئي للعموم حالياً وفق القاعدة #1).',
        country_code: 'DZ',
        country_fr: 'Algérie',
        country_ar: 'الجزائر',
        city_fr: 'Tlemcen',
        city_ar: 'تلمسان',
        phone: '+213 5 40 77 88 99',
        email: 'yacine@mechouar-tlemcen.dz',
        years_experience: 14,
        starting_price: 290,
        olympiad_score: 'En validation',
        is_featured: false,
        status: 'En attente',
        process_fr: ['1. Façonnage Argile de Tlemcen', '2. Émaillage & Cuisson', '3. Taille Géométrique', '4. Assemblage Fresque'],
        process_ar: ['1. تشكيل طين تلمسان', '2. التزجيج والحرق', '3. النحت الهندسي الدقيق', '4. تجميع اللوحات الجدارية'],
        portfolio: [
          { title_fr: 'Fontaine Murale en Zellige de Tlemcen & Bois de Cèdre', title_ar: 'نافورة جدارية بزليج تلمسان وخشب الأرز المنقوش', price_usd: 2100, tag: 'Architecture Tlemcen', dims: '220 x 150 cm' }
        ]
      }
    ],
    quotes: [
      {
        id: 1,
        reference: 'DEV-2026-0001',
        artisan_id: 1,
        client_name: 'Hôtel El Aurassi — Direction Patrimoine',
        client_email: 'patrimoine@el-aurassi.dz',
        client_phone: '+213 21 74 82 52',
        client_country: 'Alger, Algérie 🇩🇿',
        service_title: '2 Lustres Monumentaux & 4 Grands Plateaux Sniwa en Cuivre Ciselé de la Casbah',
        estimated_budget: 7800,
        status: 'En cours',
        created_at: '2026-11-10'
      },
      {
        id: 2,
        reference: 'DEV-2026-0002',
        artisan_id: 2,
        client_name: 'Samira Toumi — Ministère de la Culture',
        client_email: 'samira.toumi@culture.gov.dz',
        client_phone: '+213 6 61 99 88 77',
        client_country: 'Constantine, Algérie 🇩🇿',
        service_title: '25 Coffrets Protocolaires en Velours & Broderie d’Or Majboud de Constantine',
        estimated_budget: 9500,
        status: 'Acceptée',
        created_at: '2026-11-12'
      },
      {
        id: 3,
        reference: 'DEV-2026-0003',
        artisan_id: 3,
        client_name: 'Galerie Numidia Alger-Paris',
        client_email: 'contact@galerie-numidia.dz',
        client_phone: '+213 5 52 11 22 33',
        client_country: 'Tizi Ouzou, Algérie 🇩🇿',
        service_title: 'Collection de 8 Parures Kabyles en Argent Émaillé & Corail d’Ath Yenni',
        estimated_budget: 6400,
        status: 'Nouvelle',
        created_at: '2026-11-16'
      },
      {
        id: 4,
        reference: 'DEV-2026-0004',
        artisan_id: 4,
        client_name: 'Riad Oasis du M’zab',
        client_email: 'direction@oasis-ghardaia.dz',
        client_phone: '+213 6 60 33 44 55',
        client_country: 'Ghardaïa, Algérie 🇩🇿',
        service_title: '6 Grands Tapis Traditionnels de Ghardaïa en Pure Laine Vierge',
        estimated_budget: 5200,
        status: 'Nouvelle',
        created_at: '2026-11-17'
      },
      {
        id: 5,
        reference: 'DEV-2026-0005',
        artisan_id: 5,
        client_name: 'Palais de la Méditerranée',
        client_email: 'projets@palais-med.tn',
        client_phone: '+216 71 88 99 00',
        client_country: 'Tunis, Tunisie 🇹🇳',
        service_title: 'Fresque Murale en Céramique Qallaline de Nabeul',
        estimated_budget: 3400,
        status: 'En cours',
        created_at: '2026-11-17'
      }
    ],
    quoteSeq: 6,
    artisanSeq: 9
  };
}

let AppState = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return getInitialData();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
  } catch (e) {}
}

function resetDemoState() {
  localStorage.removeItem(STORAGE_KEY);
  AppState = getInitialData();
  setLanguage(AppState.lang);
  showToast('🇩🇿 Données officielles (Algérie Pays Hôte + Nations Africaines) réinitialisées.');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

function formatPrice(usdAmount) {
  const curr = CURRENCY_RATES[AppState.currency] || CURRENCY_RATES.DZD;
  const converted = Math.round(Number(usdAmount || 0) * curr.rate);
  return `${converted.toLocaleString('fr-FR')} ${curr.symbol}`;
}

function setCurrency(currCode) {
  AppState.currency = currCode;
  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === currCode);
  });
  saveState();
  renderAll();
  showToast(`💱 Devise d'affichage convertie en <strong>${currCode}</strong>`);
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = AppState.theme === 'dark' ? '☀️' : '🌙';
  saveState();
}

function getPublishedArtisans() {
  return AppState.artisans.filter(a => a.status === 'Publié');
}

function getCategoryById(id) {
  return AppState.categories.find(c => c.id === Number(id));
}

function getArtisanById(id) {
  return AppState.artisans.find(a => a.id === Number(id));
}

function getInitials(name) {
  return name
    .replace(/Maâlem|Cheikh|المعلم|الشيخ/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function setLanguage(lang) {
  AppState.lang = lang;
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = dict.dir;
  document.documentElement.setAttribute('data-theme', AppState.theme || 'light');

  document.getElementById('lang-fr-btn').classList.toggle('active', lang === 'fr');
  document.getElementById('lang-ar-btn').classList.toggle('active', lang === 'ar');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  saveState();
  renderAll();
}

function showScreen(screenId, artisanId = null) {
  if (artisanId !== null) {
    AppState.selectedArtisanId = Number(artisanId);
  }
  AppState.activeScreen = screenId;

  document.querySelectorAll('.screen-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `screen-${screenId}`);
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });

  saveState();
  renderAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function triggerHeroSearch() {
  const q = (document.getElementById('hero-quick-search').value || '').trim();
  showScreen('directory');
  const cityInput = document.getElementById('filter-city');
  if (cityInput) {
    cityInput.value = q;
    renderDirectory();
  }
}

// Reusable Artisan Exhibition Card
function createArtisanCardHTML(artisan) {
  const isAr = AppState.lang === 'ar';
  const dict = I18N[AppState.lang];
  const cat = getCategoryById(artisan.category_id);
  const name = isAr ? artisan.full_name_ar : artisan.full_name_fr;
  const workshop = isAr ? artisan.workshop_name_ar : artisan.workshop_name_fr;
  const specialty = isAr ? artisan.specialty_ar : artisan.specialty_fr;
  const country = isAr ? artisan.country_ar : artisan.country_fr;
  const city = isAr ? artisan.city_ar : artisan.city_fr;
  const catName = cat ? (isAr ? cat.name_ar : cat.name_fr) : '';
  const flag = COUNTRY_FLAGS[artisan.country_code] || '🌍';
  const coverUri = getCraftArtworkDataURI(artisan.category_id, artisan.id);
  const quoteCount = AppState.quotes.filter(q => q.artisan_id === artisan.id).length;
  const isHost = artisan.country_code === 'DZ';

  return `
    <article class="card" style="${isHost ? 'border-color:rgba(16,185,129,0.4);' : ''}">
      <div>
        <div class="artisan-visual-cover" style="background-image:url('${coverUri}');">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span class="badge badge-published" style="background:rgba(16,185,129,0.95); color:#fff; border:none;">
              ✓ ${artisan.status} ${isHost ? '• 🇩🇿 Hôte' : ''}
            </span>
            <span style="font-family:var(--font-mono); font-size:0.74rem; color:#fff; background:rgba(0,0,0,0.55); padding:0.22rem 0.6rem; border-radius:999px;">
              ${artisan.matricule}
            </span>
          </div>
          <div style="display:flex; justify-content:flex-end;">
            <span style="font-size:0.74rem; font-weight:800; color:#F7CA74; background:rgba(0,0,0,0.6); padding:0.2rem 0.6rem; border-radius:999px;">
              ★ Jury : ${artisan.olympiad_score || '99.0 / 100'}
            </span>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
          <div class="artisan-avatar-medallion">${getInitials(artisan.full_name_fr)}</div>
          <span style="font-size:0.8rem; color:var(--text-muted); font-weight:800;">
            ${flag} ${city}, ${country}
          </span>
        </div>

        <h3 style="font-size:1.4rem; margin-bottom:0.15rem;">${name}</h3>
        <div style="font-size:0.82rem; color:var(--text-muted); font-weight:600; margin-bottom:0.5rem;">${workshop || ''}</div>
        <p style="color:var(--color-terracotta); font-weight:800; font-size:0.84rem; margin-bottom:0.45rem;">
          ${cat ? cat.icon : ''} ${catName}
        </p>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem;">${specialty}</p>
      </div>

      <div>
        <div style="padding-top:0.85rem; border-top:1px solid var(--border-subtle); font-size:0.82rem; color:var(--text-secondary); display:flex; justify-content:space-between; margin-bottom:1rem;">
          <span>🏅 <strong>${artisan.years_experience}</strong> ${dict.card_exp}</span>
          <span>🔥 <strong>${quoteCount}</strong> devis</span>
          <span style="color:var(--color-emerald-oasis); font-weight:800;">${dict.card_from} ${formatPrice(artisan.starting_price)}</span>
        </div>
        <div style="display:flex; gap:0.55rem;">
          <button class="btn btn-outline btn-sm" style="flex:1;" onclick="showScreen('profile', ${artisan.id})">
            👁 ${dict.card_view_profile}
          </button>
          <button class="btn btn-primary btn-sm" style="flex:1;" onclick="openQuoteForArtisan(${artisan.id})">
            ✦ ${dict.card_request_quote}
          </button>
        </div>
      </div>
    </article>
  `;
}

// Screen 1: Home Renderer & Interactive Radar
function renderHome() {
  const isAr = AppState.lang === 'ar';
  const published = getPublishedArtisans();

  document.getElementById('kpi-published-count').textContent = published.length;
  const uniqueCountries = new Set(published.map(a => a.country_code));
  document.getElementById('kpi-countries-count').textContent = uniqueCountries.size;
  document.getElementById('kpi-categories-count').textContent = AppState.categories.length;
  document.getElementById('kpi-quotes-count').textContent = AppState.quotes.length;

  const corridorEl = document.getElementById('home-country-corridor');
  const countriesList = [
    { code: '', fr: 'Tous les Pays (Algérie #1)', ar: 'جميع الدول (الجزائر #1)', flag: '🌍' },
    { code: 'DZ', fr: 'Algérie — Pays Hôte (Casbah, Constantine, Ath Yenni, Ghardaïa)', ar: 'الجزائر — البلد المضيف (القصبة، قسنطينة، آث يني، غرداية)', flag: '🇩🇿' },
    { code: 'TN', fr: 'Tunisie (Nabeul)', ar: 'تونس (نابل)', flag: '🇹🇳' },
    { code: 'SN', fr: 'Sénégal (Dakar)', ar: 'السنغال (داكار)', flag: '🇸🇳' },
    { code: 'NE', fr: 'Niger (Agadez)', ar: 'النيجر (أغاديز)', flag: '🇳🇪' },
    { code: 'CI', fr: 'Côte d’Ivoire (Abidjan)', ar: 'ساحل العاج (أبيدجان)', flag: '🇨🇮' }
  ];

  corridorEl.innerHTML = countriesList.map(c => {
    const count = c.code
      ? published.filter(a => a.country_code === c.code).length
      : published.length;
    const isActive = (AppState.activeCorridorCountry || '') === c.code;
    return `
      <button class="country-pill ${isActive ? 'active' : ''}" onclick="selectCorridorCountry('${c.code}')">
        <span>${c.flag}</span>
        <span>${isAr ? c.ar : c.fr}</span>
        <span class="badge badge-pending" style="padding:0.1rem 0.45rem;">${count}</span>
      </button>
    `;
  }).join('');

  // Update Map Spotlight Box
  const spotlightBox = document.getElementById('map-spotlight-box');
  if (spotlightBox) {
    const activeArtisan = published.find(a =>
      !AppState.activeCorridorCountry || a.country_code === AppState.activeCorridorCountry
    ) || published[0];
    if (activeArtisan) {
      const flag = COUNTRY_FLAGS[activeArtisan.country_code] || '🇩🇿';
      spotlightBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.75rem;">
          <div>
            <div style="font-size:0.74rem; color:var(--color-sahara-gold-light); font-weight:800;">
              PÔLE ACTIF : ${(isAr ? activeArtisan.country_ar : activeArtisan.country_fr).toUpperCase()} — ${activeArtisan.city_fr.toUpperCase()} ${flag}
            </div>
            <div style="font-size:0.95rem; font-weight:800; margin-top:0.1rem;">
              ${isAr ? activeArtisan.full_name_ar : activeArtisan.full_name_fr}
            </div>
            <div style="font-size:0.78rem; opacity:0.82;">${isAr ? activeArtisan.specialty_ar : activeArtisan.specialty_fr}</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="showScreen('profile', ${activeArtisan.id})">Visiter →</button>
        </div>
      `;
    }
  }

  // Categories Grid
  const catContainer = document.getElementById('home-categories-grid');
  catContainer.innerHTML = AppState.categories.map(c => {
    const count = published.filter(a => a.category_id === c.id).length;
    return `
      <div class="card" style="cursor:pointer;" onclick="filterDirectoryByCategory(${c.id})">
        <div style="font-size:2.2rem; margin-bottom:0.5rem;">${c.icon}</div>
        <h3 style="font-size:1.15rem; margin-bottom:0.35rem;">${isAr ? c.name_ar : c.name_fr}</h3>
        <span style="font-size:0.82rem; color:var(--color-terracotta); font-weight:800;">
          ${count} ${isAr ? 'حرفي منشور ←' : 'artisan(s) publié(s) →'}
        </span>
      </div>
    `;
  }).join('');

  // Featured Artisans Grid (Algerian Artisans always ranked first!)
  const featuredContainer = document.getElementById('home-featured-grid');
  const featured = published
    .filter(a => !AppState.activeCorridorCountry || a.country_code === AppState.activeCorridorCountry)
    .sort((a, b) => (Number(b.country_code === 'DZ') - Number(a.country_code === 'DZ')) || (b.years_experience - a.years_experience));

  featuredContainer.innerHTML = featured.length > 0
    ? featured.map(createArtisanCardHTML).join('')
    : `<div class="card" style="grid-column:1/-1; text-align:center;">
        <p>${isAr ? 'لا يوجد حرفيون منشورون في هذا البلد حالياً.' : 'Aucun artisan publié pour cette sélection.'}</p>
      </div>`;
}

function selectCorridorCountry(code) {
  AppState.activeCorridorCountry = code;
  renderHome();
  if (code) {
    const label = COUNTRY_NAMES[code] ? COUNTRY_NAMES[code].fr : code;
    showToast(`${COUNTRY_FLAGS[code] || '🌍'} Pays sélectionné : <strong>${label}</strong>`);
  }
}

// Screen 2: Directory Filter & View Switcher
function setDirectoryView(mode) {
  AppState.directoryView = mode;
  document.getElementById('view-grid-btn').classList.toggle('active', mode === 'grid');
  document.getElementById('view-table-btn').classList.toggle('active', mode === 'table');
  renderDirectory();
}

function populateDirectoryFilters() {
  const isAr = AppState.lang === 'ar';
  const dict = I18N[AppState.lang];
  const catSelect = document.getElementById('filter-category');
  const countrySelect = document.getElementById('filter-country');

  const currentCat = catSelect.value;
  const currentCountry = countrySelect.value;

  catSelect.innerHTML = `<option value="">${dict.filter_all_categories}</option>` +
    AppState.categories.map(c => `<option value="${c.id}">${c.icon} ${isAr ? c.name_ar : c.name_fr}</option>`).join('');
  catSelect.value = currentCat;

  countrySelect.innerHTML = `
    <option value="">🌍 ${dict.filter_all_countries}</option>
    <option value="DZ">🇩🇿 ${isAr ? 'الجزائر (البلد المضيف — 4 حرفيين)' : 'Algérie (Pays Hôte — 4 artisans publiés)'}</option>
    <option value="TN">🇹🇳 ${isAr ? 'تونس (نابل)' : 'Tunisie (Nabeul)'}</option>
    <option value="SN">🇸🇳 ${isAr ? 'السنغال (داكار)' : 'Sénégal (Dakar)'}</option>
    <option value="NE">🇳🇪 ${isAr ? 'النيجر (أغاديز)' : 'Niger (Agadez)'}</option>
    <option value="CI">🇨🇮 ${isAr ? 'ساحل العاج (أبيدجان)' : 'Côte d’Ivoire (Abidjan)'}</option>
  `;
  countrySelect.value = currentCountry;
}

function renderDirectory() {
  const isAr = AppState.lang === 'ar';
  const catVal = document.getElementById('filter-category').value;
  const countryVal = document.getElementById('filter-country').value;
  const cityQuery = (document.getElementById('filter-city').value || '').trim().toLowerCase();
  const sortVal = document.getElementById('filter-sort') ? document.getElementById('filter-sort').value : 'featured';

  // Business Rule #1: Only search within 'Publié' artisans
  const results = getPublishedArtisans().filter(a => {
    const matchCat = !catVal || Number(catVal) === a.category_id;
    const matchCountry = !countryVal || a.country_code === countryVal;
    const matchCity = !cityQuery ||
      a.city_fr.toLowerCase().includes(cityQuery) ||
      a.city_ar.toLowerCase().includes(cityQuery) ||
      a.country_fr.toLowerCase().includes(cityQuery) ||
      a.full_name_fr.toLowerCase().includes(cityQuery) ||
      a.full_name_ar.toLowerCase().includes(cityQuery) ||
      a.specialty_fr.toLowerCase().includes(cityQuery) ||
      a.specialty_ar.toLowerCase().includes(cityQuery);
    return matchCat && matchCountry && matchCity;
  });

  results.sort((a, b) => {
    if (sortVal === 'exp_desc') return b.years_experience - a.years_experience;
    if (sortVal === 'price_asc') return a.starting_price - b.starting_price;
    // Default: Algeria Host first, then featured & experience
    return (Number(b.country_code === 'DZ') - Number(a.country_code === 'DZ')) ||
           (b.years_experience - a.years_experience);
  });

  const grid = document.getElementById('directory-results-grid');
  const countEl = document.getElementById('directory-count-banner');
  countEl.textContent = isAr
    ? `✓ تم العثور على ${results.length} معلم(ين) حرفي(ين) بحالة "Publié"`
    : `✓ ${results.length} maître(s) artisan(s) au statut "Publié" trouvé(s)`;

  if (results.length === 0) {
    grid.className = 'grid-3';
    grid.innerHTML = `<div class="card" style="grid-column: 1 / -1; text-align:center; padding:2.5rem;">
      <p>${isAr ? 'لا يوجد حرفيون منشورون يطابقون معايير البحث.' : 'Aucun artisan publié ne correspond à ces critères.'}</p>
    </div>`;
    return;
  }

  if (AppState.directoryView === 'table') {
    grid.className = '';
    const rows = results.map(a => {
      const cat = getCategoryById(a.category_id);
      const flag = COUNTRY_FLAGS[a.country_code] || '🌍';
      return `<tr>
        <td><code>${a.matricule}</code></td>
        <td><strong>${isAr ? a.full_name_ar : a.full_name_fr}</strong><br><small>${isAr ? a.specialty_ar : a.specialty_fr}</small></td>
        <td>${cat ? cat.icon + ' ' + (isAr ? cat.name_ar : cat.name_fr) : ''}</td>
        <td>${flag} ${isAr ? a.city_ar : a.city_fr}, <strong>${isAr ? a.country_ar : a.country_fr}</strong></td>
        <td><strong>${formatPrice(a.starting_price)}</strong></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="showScreen('profile', ${a.id})">Atelier 360°</button>
          <button class="btn btn-primary btn-sm" onclick="openQuoteForArtisan(${a.id})">Devis</button>
        </td>
      </tr>`;
    }).join('');
    grid.innerHTML = `<div class="table-responsive"><table class="data-table">
      <thead><tr><th>Matricule</th><th>Maître Artisan</th><th>Filière</th><th>Wilaya / Pays</th><th>Tarif Dès</th><th>Actions</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
  } else {
    grid.className = 'grid-3';
    grid.innerHTML = results.map(createArtisanCardHTML).join('');
  }
}

function resetDirectoryFilters() {
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-country').value = '';
  document.getElementById('filter-city').value = '';
  renderDirectory();
}

function filterDirectoryByCategory(catId) {
  showScreen('directory');
  document.getElementById('filter-category').value = String(catId);
  renderDirectory();
}

// Voice Synthesis Guide for Artisan Profile (FR / AR)
function speakArtisanBio(artisanId) {
  const artisan = getArtisanById(artisanId);
  if (!artisan || !('speechSynthesis' in window)) {
    showToast('🔊 Synthèse vocale non supportée sur ce navigateur.');
    return;
  }
  window.speechSynthesis.cancel();
  const isAr = AppState.lang === 'ar';
  const text = isAr
    ? `${artisan.full_name_ar}، ${artisan.workshop_name_ar}. ${artisan.bio_ar}`
    : `${artisan.full_name_fr}, ${artisan.workshop_name_fr}. ${artisan.bio_fr}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = isAr ? 'ar-DZ' : 'fr-FR';
  utterance.rate = 0.98;
  window.speechSynthesis.speak(utterance);
  showToast(`🔊 Narration audio de l’atelier <strong>${artisan.matricule}</strong> en cours...`);
}

// Screen 3: Detailed Artisan Profile (360° Atelier + Voice Audio Guide + QR Seal)
function renderProfile() {
  const isAr = AppState.lang === 'ar';
  const dict = I18N[AppState.lang];
  const container = document.getElementById('profile-detail-container');
  const artisan = getArtisanById(AppState.selectedArtisanId);

  // Business Rule #1: Block public access if artisan is not 'Publié'
  if (!artisan || artisan.status !== 'Publié') {
    container.innerHTML = `
      <div class="card" style="border:2px solid var(--color-crimson-alert); background:var(--color-crimson-soft);">
        <span class="badge badge-rejected" style="align-self:flex-start; margin-bottom:0.75rem;">🛡️ GARDE DE SÉCURITÉ MÉTIER #1 — HTTP 403 / 404</span>
        <h2 style="color:var(--color-crimson-alert); margin-bottom:0.5rem;">
          ${isAr ? '⛔ هذا الملف غير مرئي للعموم (قاعدة العمل #1)' : '⛔ Profil Non Visible par le Public (Règle Métier #1)'}
        </h2>
        <p style="margin-bottom:1.25rem;">
          ${isAr
            ? `الحرفي <strong>${artisan ? artisan.full_name_ar : ''} (${artisan ? artisan.matricule : ''})</strong> من <strong>${artisan ? artisan.city_ar : ''}</strong> يحمل حالياً الحالة <strong>"${artisan ? artisan.status : ''}"</strong>. تنص قواعد الأولمبياد على عدم إظهار الملف للعموم إلا إذا كانت حالته "Publié".`
            : `L’artisan <strong>${artisan ? artisan.full_name_fr : ''} (${artisan ? artisan.matricule : ''})</strong> de <strong>${artisan ? artisan.city_fr : ''}</strong> possède actuellement le statut <strong>"${artisan ? artisan.status : 'Inconnu'}"</strong>. Conformément à la Règle Métier #1, seuls les artisans au statut "Publié" sont accessibles au public.`}
        </p>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="showScreen('admin')">
            🔐 Ouvrir la Tour de Contrôle Admin pour publier ${artisan ? artisan.matricule : 'cet artisan'}
          </button>
          <button class="btn btn-outline btn-sm" onclick="showScreen('profile', 1)">
            Voir un profil Publié (🇩🇿 ART-DZ-2026-001 — Alger)
          </button>
        </div>
      </div>
    `;
    return;
  }

  const cat = getCategoryById(artisan.category_id);
  const name = isAr ? artisan.full_name_ar : artisan.full_name_fr;
  const workshop = isAr ? artisan.workshop_name_ar : artisan.workshop_name_fr;
  const specialty = isAr ? artisan.specialty_ar : artisan.specialty_fr;
  const bio = isAr ? artisan.bio_ar : artisan.bio_fr;
  const city = isAr ? artisan.city_ar : artisan.city_fr;
  const country = isAr ? artisan.country_ar : artisan.country_fr;
  const flag = COUNTRY_FLAGS[artisan.country_code] || '🇩🇿';
  const coverUri = getCraftArtworkDataURI(artisan.category_id, artisan.id);

  const steps = (isAr ? artisan.process_ar : artisan.process_fr) || [
    '1. Sélection des matières premières nobles',
    '2. Façonnage traditionnel à la main',
    '3. Finition et ciselure Maâlem',
    '4. Contrôle qualité Comité d’Alger'
  ];

  const stepsHTML = steps.map(step => `
    <div class="timeline-step completed">
      <div style="font-weight:800; font-size:0.88rem;">${step}</div>
    </div>
  `).join('');

  const portfolioHTML = (artisan.portfolio && artisan.portfolio.length > 0)
    ? artisan.portfolio.map((item, idx) => {
        const thumbUri = getCraftArtworkDataURI(artisan.category_id, idx + 2);
        const itemTitle = isAr ? item.title_ar : item.title_fr;
        return `
          <div class="card" style="background:var(--bg-elevated);">
            <div>
              <div class="portfolio-thumb" style="background-image:url('${thumbUri}');" onclick="openPortfolioLightbox(${artisan.id}, ${idx})"></div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.45rem;">
                <span class="badge badge-pending">${item.tag || 'Pièce Certifiée'}</span>
                <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${item.dims || 'Sur-mesure'}</span>
              </div>
              <h4 style="font-size:1.12rem; margin-bottom:0.65rem;">${itemTitle}</h4>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.75rem; border-top:1px solid var(--border-subtle);">
              <span style="color:var(--color-terracotta); font-weight:800; font-size:1.08rem;">${formatPrice(item.price_usd || 350)}</span>
              <button class="btn btn-outline btn-sm" onclick="openQuoteForArtisan(${artisan.id})">Commander similaire</button>
            </div>
          </div>
        `;
      }).join('')
    : `<p>${isAr ? 'لا توجد أعمال مضافة بعد.' : 'Aucune réalisation renseignée.'}</p>`;

  container.innerHTML = `
    <div class="card" style="padding:2.25rem;">
      <!-- Cinematic Workshop Header -->
      <div style="background-image:url('${coverUri}'); background-size:cover; background-position:center; border-radius:var(--radius-md); padding:2rem; color:#fff; margin-bottom:1.75rem; position:relative; overflow:hidden;">
        <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.25rem;">
          <div>
            <span class="badge badge-published" style="background:rgba(16,185,129,0.95); color:#fff; border:none;">
              ✓ ${dict.profile_verified} • ${artisan.matricule}
            </span>
            <h1 style="color:#fff; font-size:2.5rem; margin-top:0.55rem;">${flag} ${name}</h1>
            <p style="font-size:1.12rem; color:#F7CA74; font-weight:700;">${specialty}</p>
          </div>
          <div style="display:flex; gap:0.65rem; flex-wrap:wrap;">
            <button class="btn btn-outline btn-sm" style="background:rgba(255,255,255,0.14); color:#fff; border-color:rgba(255,255,255,0.3);" onclick="speakArtisanBio(${artisan.id})">
              🔊 Écouter l’Histoire (${AppState.lang.toUpperCase()})
            </button>
            <button class="btn btn-secondary" onclick="openQuoteForArtisan(${artisan.id})">
              ✦ ${dict.card_request_quote}
            </button>
          </div>
        </div>
      </div>

      <div class="grid-categories" style="margin-bottom:2rem; background:var(--bg-muted); padding:1.25rem; border-radius:var(--radius-md);">
        <div><small style="color:var(--text-muted);">${dict.profile_workshop}</small><br><strong>${workshop}</strong></div>
        <div><small style="color:var(--text-muted);">${dict.filter_category}</small><br><strong>${cat ? cat.icon + ' ' + (isAr ? cat.name_ar : cat.name_fr) : ''}</strong></div>
        <div><small style="color:var(--text-muted);">${dict.profile_location}</small><br><strong>📍 ${city}, ${country} ${flag}</strong></div>
        <div><small style="color:var(--text-muted);">${dict.card_from}</small><br><strong style="color:var(--color-emerald-oasis);">${formatPrice(artisan.starting_price)} (${artisan.years_experience} ${dict.card_exp})</strong></div>
      </div>

      <div class="grid-3" style="grid-template-columns: 1.85fr 1fr; margin-bottom:2rem;">
        <div>
          <h3 style="font-size:1.45rem; margin-bottom:0.6rem;">${dict.profile_bio}</h3>
          <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:1.02rem;">${bio}</p>

          <h3 style="font-size:1.35rem; margin-bottom:0.6rem;">${dict.profile_process}</h3>
          <div class="process-timeline">${stepsHTML}</div>
        </div>

        <!-- Official Olympiad Certificate Seal with SVG QR Code -->
        <div class="certificate-seal" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem;">
              <div>
                <div style="font-size:0.72rem; font-weight:800; letter-spacing:0.06em; color:var(--color-terracotta);">
                  CERTIFICAT OLYMPIADES ALGER 2026 🇩🇿
                </div>
                <h4 style="font-size:1.18rem; margin-block:0.3rem;">Atelier Vérifié par le Comité</h4>
              </div>
              ${generateQRMatrixSVG(artisan.matricule)}
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-block:0.75rem;">
              Matricule : <strong style="font-family:var(--font-mono);">${artisan.matricule}</strong><br>
              Origine : <strong>${artisan.city_fr}, ${artisan.country_fr} ${flag}</strong><br>
              Score Jury : <strong>${artisan.olympiad_score || '99.0 / 100'}</strong><br>
              Statut DB : <strong>Publié ✓ (Règle #1 & #2)</strong>
            </p>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.7rem; background:var(--bg-surface); padding:0.55rem; border-radius:8px; border:1px solid var(--border-subtle);">
            SHA256:${artisan.matricule}-ALGER2026
          </div>
        </div>
      </div>

      <h3 style="font-size:1.45rem; margin-bottom:0.95rem;">${dict.profile_portfolio}</h3>
      <div class="grid-3">${portfolioHTML}</div>
    </div>
  `;
}

// Portfolio HD Lightbox Modal
function openPortfolioLightbox(artisanId, itemIdx) {
  const artisan = getArtisanById(artisanId);
  if (!artisan || !artisan.portfolio[itemIdx]) return;
  const item = artisan.portfolio[itemIdx];
  const isAr = AppState.lang === 'ar';
  const coverUri = getCraftArtworkDataURI(artisan.category_id, itemIdx + 2);
  const flag = COUNTRY_FLAGS[artisan.country_code] || '🇩🇿';

  const modal = document.getElementById('app-modal-overlay');
  const content = document.getElementById('app-modal-content');
  content.innerHTML = `
    <div style="height:220px; margin:-2rem -2rem 1.25rem -2rem; background-image:url('${coverUri}'); background-size:cover; border-radius:24px 24px 0 0;"></div>
    <span class="badge badge-pending">${flag} ${item.tag || 'Pièce Musée'} • ${item.dims || 'Sur-mesure'}</span>
    <h2 style="font-size:1.65rem; margin-block:0.5rem;">${isAr ? item.title_ar : item.title_fr}</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.25rem;">
      Œuvre réalisée à la main par <strong>${isAr ? artisan.full_name_ar : artisan.full_name_fr}</strong> (${artisan.workshop_name_fr}, ${artisan.city_fr} — ${artisan.country_fr}).
      Prix indicatif atelier : <strong style="color:var(--color-terracotta);">${formatPrice(item.price_usd)}</strong>.
    </p>
    <div style="display:flex; justify-content:flex-end; gap:0.65rem;">
      <button class="btn btn-outline btn-sm" onclick="closeAppModal()">Fermer</button>
      <button class="btn btn-primary btn-sm" onclick="closeAppModal(); openQuoteForArtisan(${artisan.id});">
        ✦ Demander un devis pour cette pièce
      </button>
    </div>
  `;
  modal.classList.add('open');
}

// Command Palette Modal (⌘K)
function openCommandPalette() {
  const modal = document.getElementById('app-modal-overlay');
  const content = document.getElementById('app-modal-content');
  const published = getPublishedArtisans();

  content.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <h3 style="font-size:1.3rem;">⚡ Palette de Commande Rapide — Alger 2026 (⌘K)</h3>
      <button class="btn btn-outline btn-sm" onclick="closeAppModal()">ESC</button>
    </div>
    <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:0.85rem;">
      Accès direct aux ateliers publiés (Algérie & Afrique), suivi de devis et requêtes SQL du Jury :
    </p>
    <div style="display:grid; gap:0.5rem; max-height:320px; overflow-y:auto;">
      ${published.map(a => `
        <button class="btn btn-outline" style="justify-content:space-between; text-align:start;" onclick="closeAppModal(); showScreen('profile', ${a.id});">
          <span>${COUNTRY_FLAGS[a.country_code] || ''} <strong>${a.full_name_fr}</strong> — ${a.city_fr} (${a.country_fr})</span>
          <span class="badge badge-published">${a.matricule}</span>
        </button>
      `).join('')}
      <button class="btn btn-secondary" style="justify-content:space-between;" onclick="closeAppModal(); showScreen('admin'); runControlQuery(2);">
        <span>⚡ Exécuter Requête SQL #2 (Artisans par Pays — Algérie #1)</span>
        <span>Admin →</span>
      </button>
    </div>
  `;
  modal.classList.add('open');
}

function closeAppModal() {
  document.getElementById('app-modal-overlay').classList.remove('open');
}

window.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  } else if (e.key === 'Escape') {
    closeAppModal();
  }
});

// Screen 4: Quote Request Form, Cost Breakdown Simulator & Live Reference Tracker
function populateQuoteArtisanSelect() {
  const isAr = AppState.lang === 'ar';
  const select = document.getElementById('quote-artisan-select');
  if (!select) return;
  const published = getPublishedArtisans();

  select.innerHTML = published.map(a => {
    const name = isAr ? a.full_name_ar : a.full_name_fr;
    const city = isAr ? a.city_ar : a.city_fr;
    const country = isAr ? a.country_ar : a.country_fr;
    const flag = COUNTRY_FLAGS[a.country_code] || '🇩🇿';
    return `<option value="${a.id}">${flag} ${a.matricule} — ${name} (${city}, ${country} • Dès ${formatPrice(a.starting_price)})</option>`;
  }).join('');

  if (published.some(a => a.id === AppState.selectedArtisanId)) {
    select.value = String(AppState.selectedArtisanId);
  }
  updateCraftEstimator();
}

function updateCraftEstimator() {
  const select = document.getElementById('quote-artisan-select');
  const qtyInput = document.getElementById('sim-quantity');
  const gradeSelect = document.getElementById('sim-grade');
  if (!select || !qtyInput || !gradeSelect) return;

  const artisan = getArtisanById(select.value) || getPublishedArtisans()[0];
  const qty = Number(qtyInput.value || 1);
  const multiplier = Number(gradeSelect.value || 1);

  document.getElementById('sim-qty-label').textContent = qty;

  const basePrice = artisan ? artisan.starting_price : 200;
  const estimatedUsd = Math.round(basePrice * qty * multiplier);
  const minDays = Math.max(7, Math.round(qty * 3.5 * multiplier));
  const maxDays = minDays + 7;

  document.getElementById('sim-estimated-output').textContent = `${formatPrice(estimatedUsd)} (${estimatedUsd} USD)`;
  document.getElementById('sim-days-output').textContent = `${minDays} à ${maxDays} jours ouvrés`;
  document.getElementById('sim-estimated-output').dataset.usd = estimatedUsd;

  const matCost = formatPrice(estimatedUsd * 0.35);
  const laborCost = formatPrice(estimatedUsd * 0.50);
  const packCost = formatPrice(estimatedUsd * 0.15);

  const barsEl = document.getElementById('sim-breakdown-bars');
  if (barsEl) {
    barsEl.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between;"><span>Matières Premières Nobles (35%)</span><strong>${matCost}</strong></div>
        <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:35%;"></div></div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between;"><span>Main-d’œuvre Maâlem & Atelier (50%)</span><strong>${laborCost}</strong></div>
        <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:50%;"></div></div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between;"><span>Coffret Musée & Assurance Livraison (15%)</span><strong>${packCost}</strong></div>
        <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:15%;"></div></div>
      </div>
    `;
  }
}

function applyEstimatedBudgetToForm() {
  const usd = document.getElementById('sim-estimated-output').dataset.usd || 1200;
  const budgetInput = document.getElementById('quote-budget');
  if (budgetInput) {
    budgetInput.value = usd;
    showToast(`✓ Configuration budgétaire de <strong>${formatPrice(usd)}</strong> injectée dans le formulaire.`);
  }
}

function renderTrackerQuickChips() {
  const chipsContainer = document.getElementById('tracker-quick-chips');
  if (!chipsContainer) return;
  chipsContainer.innerHTML = AppState.quotes.map(q => `
    <button type="button" class="btn btn-outline btn-sm" style="font-family:var(--font-mono);" onclick="document.getElementById('tracker-input').value='${q.reference}'; trackQuoteReference();">
      ${q.reference} (${q.status})
    </button>
  `).join('');
}

function trackQuoteReference() {
  renderTrackerQuickChips();
  const input = document.getElementById('tracker-input');
  const box = document.getElementById('tracker-result-box');
  if (!input || !box) return;

  const ref = input.value.trim().toUpperCase();
  const quote = AppState.quotes.find(q => q.reference.toUpperCase() === ref);

  if (!quote) {
    box.innerHTML = `
      <div class="alert-box" style="border-color:var(--color-crimson-alert); background:var(--color-crimson-soft); margin-bottom:0;">
        Aucune demande trouvée pour la référence <strong>${ref}</strong>. Cliquez sur l’une des références ci-dessus.
      </div>
    `;
    return;
  }

  const artisan = getArtisanById(quote.artisan_id);
  const stages = ['Nouvelle', 'En cours', 'Acceptée', 'Clôturée'];
  const currentIdx = stages.indexOf(quote.status);

  const timelineHTML = stages.map((st, idx) => {
    let cls = '';
    if (quote.status === 'Refusée' && idx > 0) cls = '';
    else if (idx < currentIdx) cls = 'completed';
    else if (idx === currentIdx) cls = 'current';
    return `
      <div class="timeline-step ${cls}">
        <div style="font-size:0.73rem; color:var(--text-muted);">Étape ${idx + 1}</div>
        <strong>${st}</strong>
      </div>
    `;
  }).join('');

  const flag = artisan ? (COUNTRY_FLAGS[artisan.country_code] || '🇩🇿') : '🇩🇿';

  box.innerHTML = `
    <div style="background:var(--bg-muted); padding:1.15rem; border-radius:var(--radius-sm);">
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <strong style="font-family:var(--font-mono);">${quote.reference}</strong> — Client : <strong>${quote.client_name}</strong> (${quote.client_country})<br>
          <span style="font-size:0.85rem; color:var(--text-secondary);">Artisan : ${flag} ${artisan ? artisan.full_name_fr : ''} (${artisan ? artisan.city_fr : ''}) • Projet : ${quote.service_title} (${formatPrice(quote.estimated_budget)})</span>
        </div>
        <span class="badge badge-accepted">Statut : ${quote.status}</span>
      </div>
      <div class="process-timeline" style="margin-bottom:0;">${timelineHTML}</div>
    </div>
  `;
}

function openQuoteForArtisan(artisanId) {
  AppState.selectedArtisanId = Number(artisanId);
  showScreen('quote');
  document.getElementById('quote-artisan-select').value = String(artisanId);
  updateCraftEstimator();
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  const isAr = AppState.lang === 'ar';
  const feedback = document.getElementById('quote-feedback');

  const artisanId = Number(document.getElementById('quote-artisan-select').value);
  const artisan = getArtisanById(artisanId);

  // Business Rule #2 Validation
  if (!artisan || artisan.status !== 'Publié') {
    feedback.innerHTML = `
      <div class="alert-box" style="border-color:var(--color-crimson-alert); background:var(--color-crimson-soft);">
        <strong>Erreur Règle Métier #2 :</strong> Une demande de devis ne peut être liée qu’à un artisan au statut "Publié".
      </div>
    `;
    return;
  }

  const clientName = document.getElementById('quote-client-name').value.trim();
  const clientEmail = document.getElementById('quote-client-email').value.trim();
  const clientPhone = document.getElementById('quote-client-phone').value.trim();
  const clientCountry = document.getElementById('quote-client-country').value.trim();
  const serviceTitle = document.getElementById('quote-service-title').value.trim();
  const budget = Number(document.getElementById('quote-budget').value || 1800);

  // Business Rule #3: Generate Unique Quote Reference Number
  AppState.quoteSeq += 1;
  const reference = `DEV-2026-${String(AppState.quoteSeq).padStart(4, '0')}`;
  const today = new Date().toISOString().split('T')[0];

  AppState.quotes.unshift({
    id: AppState.quoteSeq,
    reference,
    artisan_id: artisan.id,
    client_name: clientName,
    client_email: clientEmail,
    client_phone: clientPhone,
    client_country: clientCountry,
    service_title: serviceTitle,
    estimated_budget: budget,
    status: 'Nouvelle',
    created_at: today
  });

  saveState();
  event.target.reset();
  document.getElementById('tracker-input').value = reference;
  renderAll();
  trackQuoteReference();

  feedback.innerHTML = `
    <div class="certificate-seal" style="margin-bottom:1.25rem; border-color:var(--color-emerald-oasis); background:var(--color-emerald-soft);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.75rem;">
        <div>
          <span class="badge badge-published">✓ Récépissé Officiel Alger 2026 🇩🇿</span>
          <h4 style="font-size:1.2rem; margin-top:0.4rem;">
            ${isAr ? 'تم تسجيل طلب عرض السعر بنجاح!' : 'Demande de Devis Enregistrée avec Succès !'}
          </h4>
          <p style="font-size:0.88rem; margin-top:0.25rem;">
            Référence Unique (Règle #3) : <strong style="font-family:var(--font-mono); font-size:1.05rem;">${reference}</strong><br>
            Maître Artisan (Règle #2) : <strong>${artisan.full_name_fr} (${artisan.matricule} — ${artisan.city_fr}, ${artisan.country_fr})</strong><br>
            Statut Initial Machine à États : <strong>Nouvelle</strong>
          </p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">🖨 Imprimer Récépissé</button>
      </div>
    </div>
  `;

  showToast(`🎉 Nouveau devis <strong>${reference}</strong> enregistré pour ${artisan.matricule} !`);
}

function sendContactMessage() {
  showToast('🇩🇿 Message officiel transmis au Haut Comité d’Organisation d’Alger.');
}

// Screen 6: Secure Admin Dashboard, Visual Analytics & SQL Studio
function renderAdminAnalytics() {
  const container = document.getElementById('admin-analytics-grid');
  if (!container) return;

  // Card 1: Artisans by Country (Algeria #1 Host)
  const countryCounts = {};
  AppState.artisans.forEach(a => {
    const key = `${COUNTRY_FLAGS[a.country_code] || ''} ${a.country_fr}${a.country_code === 'DZ' ? ' (Pays Hôte #1)' : ''}`;
    countryCounts[key] = (countryCounts[key] || 0) + 1;
  });
  const totalArtisans = AppState.artisans.length || 1;

  const countryBarsHTML = Object.entries(countryCounts).map(([label, cnt]) => {
    const pct = Math.round((cnt / totalArtisans) * 100);
    return `
      <div style="margin-bottom:0.55rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.82rem;">
          <strong>${label}</strong>
          <span>${cnt} artisan(s) (${pct}%)</span>
        </div>
        <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${pct}%;"></div></div>
      </div>
    `;
  }).join('');

  // Card 2: Quote State Machine Distribution
  const statuses = ['Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée'];
  const totalQuotes = AppState.quotes.length || 1;
  const quoteBarsHTML = statuses.map(st => {
    const cnt = AppState.quotes.filter(q => q.status === st).length;
    const pct = Math.round((cnt / totalQuotes) * 100);
    return `
      <div style="margin-bottom:0.55rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.82rem;">
          <strong>${st} ${st !== 'Nouvelle' ? '🔒' : ''}</strong>
          <span>${cnt} devis (${pct}%)</span>
        </div>
        <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${pct}%;"></div></div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="card">
      <span class="badge badge-published" style="align-self:flex-start; margin-bottom:0.5rem;">📊 Répartition par Pays (Algérie #1)</span>
      <h3 style="font-size:1.25rem; margin-bottom:0.85rem;">Artisans par Pays (${AppState.artisans.length} inscrits)</h3>
      <div>${countryBarsHTML}</div>
    </div>
    <div class="card">
      <span class="badge badge-pending" style="align-self:flex-start; margin-bottom:0.5rem;">⚙️ Pipeline Machine à États (Règle #4)</span>
      <h3 style="font-size:1.25rem; margin-bottom:0.85rem;">Suivi des Devis (${AppState.quotes.length} dossiers)</h3>
      <div>${quoteBarsHTML}</div>
    </div>
  `;
}

function exportDatabaseJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(AppState, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', 'afrimetiers_hub_alger2026_export.json');
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  showToast('⬇ Export JSON de la base AFRIMÉTIERS HUB téléchargé.');
}

function toggleNewArtisanForm() {
  const panel = document.getElementById('admin-add-artisan-panel');
  if (!panel) return;
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function handleAdminAddArtisan(event) {
  event.preventDefault();
  AppState.artisanSeq = (AppState.artisanSeq || AppState.artisans.length) + 1;
  const id = AppState.artisanSeq;

  const countryCode = document.getElementById('new-art-country') ? document.getElementById('new-art-country').value : 'DZ';
  const matricule = `ART-${countryCode}-2026-${String(id).padStart(3, '0')}`;
  const countryInfo = COUNTRY_NAMES[countryCode] || { fr: 'Algérie', ar: 'الجزائر' };

  const nameFr = document.getElementById('new-art-name-fr').value.trim();
  const nameAr = document.getElementById('new-art-name-ar').value.trim();
  const catId = Number(document.getElementById('new-art-cat').value);
  const city = document.getElementById('new-art-city').value.trim();
  const spec = document.getElementById('new-art-spec').value.trim();
  const status = document.getElementById('new-art-status').value;

  AppState.artisans.push({
    id,
    matricule,
    category_id: catId,
    full_name_fr: nameFr,
    full_name_ar: nameAr,
    workshop_name_fr: `Atelier ${nameFr} — ${city}`,
    workshop_name_ar: `ورشة ${nameAr} — ${city}`,
    specialty_fr: spec,
    specialty_ar: spec,
    bio_fr: 'Nouvel atelier enregistré par le Comité des Olympiades des Métiers 2026 à Alger.',
    bio_ar: 'ورشة جديدة مسجلة من طرف لجنة أولمبياد المهن 2026 بالجزائر العاصمة.',
    country_code: countryCode,
    country_fr: countryInfo.fr.replace(' (Pays Hôte)', ''),
    country_ar: countryInfo.ar.replace(' (البلد المضيف)', ''),
    city_fr: city,
    city_ar: city,
    phone: '+213 5 50 00 00 00',
    email: 'atelier@afrimetiers-alger2026.dz',
    years_experience: 12,
    starting_price: 260,
    olympiad_score: '98.8 / 100',
    is_featured: true,
    status,
    portfolio: []
  });

  saveState();
  event.target.reset();
  document.getElementById('admin-add-artisan-panel').style.display = 'none';
  renderAll();
  showToast(`${COUNTRY_FLAGS[countryCode] || '🇩🇿'} Artisan <strong>${matricule} (${nameFr} — ${city})</strong> créé avec le statut "${status}".`);
}

function renderAdminDashboard() {
  const isAr = AppState.lang === 'ar';
  const dict = I18N[AppState.lang];

  renderAdminAnalytics();

  const artisansTbody = document.getElementById('admin-artisans-tbody');
  const artisanStatuses = ['Brouillon', 'En attente', 'Publié', 'Suspendu'];

  artisansTbody.innerHTML = AppState.artisans.map(a => {
    const isPub = a.status === 'Publié';
    const badgeClass = isPub
      ? 'badge-published'
      : (a.status === 'En attente' ? 'badge-pending' : 'badge-suspended');

    const options = artisanStatuses.map(st =>
      `<option value="${st}" ${a.status === st ? 'selected' : ''}>${st}</option>`
    ).join('');

    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:800;">${a.matricule}</td>
        <td>
          <strong>${a.full_name_fr}</strong><br>
          <small style="color:var(--text-secondary);">${a.full_name_ar}</small>
        </td>
        <td>${COUNTRY_FLAGS[a.country_code] || ''} <strong>${isAr ? a.country_ar : a.country_fr}</strong> (${isAr ? a.city_ar : a.city_fr})</td>
        <td>
          ${isPub
            ? '<span class="badge badge-published">👁 Visible Public</span>'
            : '<span class="badge badge-rejected">🔒 Masqué Public (Règle #1)</span>'}
        </td>
        <td><span class="badge ${badgeClass}">${a.status}</span></td>
        <td>
          <select class="form-control" style="padding:0.35rem 0.6rem; width:auto;" onchange="updateArtisanStatus(${a.id}, this.value)">
            ${options}
          </select>
        </td>
      </tr>
    `;
  }).join('');

  const quotesTbody = document.getElementById('admin-quotes-tbody');
  const allQuoteStatuses = ['Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée'];

  quotesTbody.innerHTML = AppState.quotes.map(q => {
    const artisan = getArtisanById(q.artisan_id);
    const artisanName = artisan ? (isAr ? artisan.full_name_ar : artisan.full_name_fr) : '—';
    const flag = artisan ? (COUNTRY_FLAGS[artisan.country_code] || '🇩🇿') : '🇩🇿';
    const isProcessed = q.status !== 'Nouvelle';

    const badgeClass = q.status === 'Nouvelle'
      ? 'badge-new'
      : (q.status === 'Acceptée' ? 'badge-accepted' : (q.status === 'Refusée' ? 'badge-rejected' : 'badge-inprogress'));

    const statusOptions = allQuoteStatuses.map(st => {
      const disabled = (isProcessed && st === 'Nouvelle') ? 'disabled' : '';
      const label = (isProcessed && st === 'Nouvelle') ? `${st} (⛔ Interdit Règle #4)` : st;
      return `<option value="${st}" ${q.status === st ? 'selected' : ''} ${disabled}>${label}</option>`;
    }).join('');

    return `
      <tr>
        <td style="font-family:var(--font-mono);"><strong>${q.reference}</strong><br><small style="color:var(--text-muted);">${q.created_at}</small></td>
        <td><strong>${q.client_name}</strong><br><small style="color:var(--text-secondary);">${q.client_country}</small></td>
        <td>${flag} ${artisanName}<br><small style="font-family:var(--font-mono);">${artisan ? artisan.matricule : ''}</small></td>
        <td>${q.service_title}<br><strong style="color:var(--color-terracotta);">${formatPrice(q.estimated_budget)}</strong></td>
        <td><span class="badge ${badgeClass}">${q.status}</span></td>
        <td>
          <select class="form-control" style="padding:0.35rem 0.6rem; width:auto;" onchange="updateQuoteStatus(${q.id}, this.value)">
            ${statusOptions}
          </select>
          ${isProcessed ? `<div style="font-size:0.73rem; color:var(--color-terracotta); margin-top:0.25rem; font-weight:700;">🔒 ${dict.state_locked_note}</div>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function updateArtisanStatus(artisanId, newStatus) {
  const artisan = getArtisanById(artisanId);
  if (!artisan) return;
  const oldStatus = artisan.status;
  artisan.status = newStatus;
  saveState();
  renderAll();
  showToast(`🔔 Trigger <code>trg_artisans_before_update</code> : <strong>${artisan.matricule} (${artisan.city_fr})</strong> passé de "${oldStatus}" à "<strong>${newStatus}</strong>".`);
}

function updateQuoteStatus(quoteId, newStatus) {
  const quote = AppState.quotes.find(q => q.id === Number(quoteId));
  if (!quote) return;

  if (quote.status !== 'Nouvelle' && newStatus === 'Nouvelle') {
    showToast('⛔ ERREUR MACHINE À ÉTATS (Règle #4) : Retour au statut "Nouvelle" interdit !');
    renderAdminDashboard();
    return;
  }

  const oldStatus = quote.status;
  quote.status = newStatus;
  saveState();
  renderAll();
  showToast(`🔒 Machine à états (Règle #4) : Devis <strong>${quote.reference}</strong> passé de "${oldStatus}" à "<strong>${newStatus}</strong>". Retour à "Nouvelle" désormais verrouillé.`);
}

// Live SQL Control Query Runner
function runControlQuery(queryNum) {
  const codeEl = document.getElementById('sql-query-code');
  const outEl = document.getElementById('sql-query-output');
  if (!codeEl || !outEl) return;

  if (queryNum === 1) {
    codeEl.textContent = `-- REQUÊTE DE CONTRÔLE #1 : Recherche multi-critères des artisans PUBLIÉS (Algérie en tête)
SELECT a.matricule, a.full_name_fr, c.name_fr AS filiere, a.country_fr, a.city_fr, a.years_experience
FROM artisans a
INNER JOIN categories c ON c.id = a.category_id
WHERE a.status = 'Publié'
ORDER BY (a.country_code = 'DZ') DESC, a.years_experience DESC;`;

    const rows = getPublishedArtisans().map(a => {
      const cat = getCategoryById(a.category_id);
      return `<tr>
        <td><code>${a.matricule}</code></td>
        <td><strong>${a.full_name_fr}</strong></td>
        <td>${cat ? cat.name_fr : ''}</td>
        <td>${COUNTRY_FLAGS[a.country_code] || ''} <strong>${a.country_fr}</strong> (${a.city_fr})</td>
        <td>${a.years_experience} ans</td>
        <td><span class="badge badge-published">${a.status}</span></td>
      </tr>`;
    }).join('');

    outEl.innerHTML = `<table class="data-table">
      <thead><tr><th>Matricule</th><th>Maître Artisan</th><th>Filière d'Art</th><th>Pays & Wilaya/Ville</th><th>Expérience</th><th>Statut</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  } else if (queryNum === 2) {
    codeEl.textContent = `-- REQUÊTE DE CONTRÔLE #2 : Nombre d'artisans par Pays (Algérie Pays Hôte #1)
SELECT country_code, country_fr, COUNT(id) AS total_artisans,
       SUM(CASE WHEN status = 'Publié' THEN 1 ELSE 0 END) AS artisans_publies
FROM artisans
GROUP BY country_code, country_fr
ORDER BY artisans_publies DESC, total_artisans DESC;`;

    const map = new Map();
    AppState.artisans.forEach(a => {
      if (!map.has(a.country_code)) {
        map.set(a.country_code, { code: a.country_code, country: a.country_fr, total: 0, pub: 0 });
      }
      const entry = map.get(a.country_code);
      entry.total += 1;
      if (a.status === 'Publié') entry.pub += 1;
    });

    const rows = Array.from(map.values()).map(r => `<tr>
      <td>${COUNTRY_FLAGS[r.code] || ''} <strong>${r.code}</strong></td>
      <td><strong>${r.country}</strong> ${r.code === 'DZ' ? '<span class="badge badge-published">Pays Hôte #1</span>' : ''}</td>
      <td><strong>${r.pub}</strong> publié(s)</td>
      <td>${r.total} inscrit(s)</td>
    </tr>`).join('');

    outEl.innerHTML = `<table class="data-table">
      <thead><tr><th>Code ISO</th><th>Pays</th><th>Artisans Publiés</th><th>Total Enregistrés</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  } else if (queryNum === 3) {
    codeEl.textContent = `-- REQUÊTE DE CONTRÔLE #3 : Top 5 des maîtres artisans publiés les plus sollicités
SELECT a.matricule, a.full_name_fr, a.country_fr, a.city_fr,
       COUNT(q.id) AS total_demandes_devis,
       COALESCE(SUM(q.estimated_budget), 0) AS volume_budget_usd
FROM artisans a
LEFT JOIN quote_requests q ON q.artisan_id = a.id
WHERE a.status = 'Publié'
GROUP BY a.id
ORDER BY total_demandes_devis DESC, volume_budget_usd DESC
LIMIT 5;`;

    const ranked = getPublishedArtisans().map(a => {
      const qs = AppState.quotes.filter(q => q.artisan_id === a.id);
      const sumUsd = qs.reduce((acc, item) => acc + Number(item.estimated_budget || 0), 0);
      return { ...a, count: qs.length, sumUsd };
    }).sort((a, b) => (b.count - a.count) || (b.sumUsd - a.sumUsd)).slice(0, 5);

    const rows = ranked.map((r, i) => `<tr>
      <td><strong>#${i + 1}</strong> (<code>${r.matricule}</code>)</td>
      <td><strong>${r.full_name_fr}</strong></td>
      <td>${COUNTRY_FLAGS[r.country_code] || ''} ${r.country_fr} (${r.city_fr})</td>
      <td><span class="badge badge-new">${r.count} demande(s)</span></td>
      <td><strong>${formatPrice(r.sumUsd)}</strong></td>
    </tr>`).join('');

    outEl.innerHTML = `<table class="data-table">
      <thead><tr><th>Rang & Matricule</th><th>Maître Artisan</th><th>Pays & Wilaya/Ville</th><th>Total Devis</th><th>Volume Cumulé</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  } else if (queryNum === 4) {
    codeEl.textContent = `-- REQUÊTE DE CONTRÔLE #4 : Audit de la machine à états des demandes de devis par statut
SELECT status AS statut_demande, COUNT(id) AS nombre_demandes,
       ROUND(AVG(estimated_budget), 2) AS budget_moyen_usd
FROM quote_requests
GROUP BY status;`;

    const statuses = ['Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée'];
    const rows = statuses.map(st => {
      const matches = AppState.quotes.filter(q => q.status === st);
      const avg = matches.length
        ? Math.round(matches.reduce((s, q) => s + Number(q.estimated_budget || 0), 0) / matches.length)
        : 0;
      return `<tr>
        <td><strong>${st}</strong></td>
        <td>${matches.length} demande(s)</td>
        <td>${formatPrice(avg)}</td>
        <td>${st === 'Nouvelle' ? 'État Initial' : '🔒 Retour à Nouvelle Interdit'}</td>
      </tr>`;
    }).join('');

    outEl.innerHTML = `<table class="data-table">
      <thead><tr><th>Statut Machine à États</th><th>Nombre de Demandes</th><th>Budget Moyen</th><th>Règle Métier #4</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  }
}

function renderAll() {
  populateDirectoryFilters();
  populateQuoteArtisanSelect();
  renderHome();
  renderDirectory();
  renderProfile();
  trackQuoteReference();
  renderAdminDashboard();
}

window.addEventListener('DOMContentLoaded', () => {
  setLanguage(AppState.lang || 'fr');
  runControlQuery(2);
});
