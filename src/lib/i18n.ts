export type Language = 'en' | 'sr';

export interface MenuItem {
  id: string;
  category: 'espresso' | 'signature' | 'bites' | 'cocktails';
  nameEn: string;
  nameSr: string;
  descEn: string;
  descSr: string;
  priceRsd: number;
  priceEur: number;
  tags: ('vegan' | 'gf' | 'signature' | 'organic' | 'popular')[];
  image: string;
  notes?: { en: string; sr: string };
}

export const MENU_ITEMS: MenuItem[] = [
  // Espresso & Filter
  {
    id: 'ethiopia-yirgacheffe',
    category: 'espresso',
    nameEn: 'Ethiopia Yirgacheffe V60',
    nameSr: 'Etiopija Yirgacheffe V60',
    descEn: 'Washed heirloom micro-lot. Jasmine floral bouquet, bergamot brightness, peach nectar finish.',
    descSr: 'Mikro-lot oprane etiopske kafe. Cvetni buke jasmina, svežina bergamota i finiš od breskve.',
    priceRsd: 420,
    priceEur: 3.6,
    tags: ['organic', 'signature'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Light Roast • Altitude 2,100m', sr: 'Svetlo prženje • Nadmorska visina 2.100m' }
  },
  {
    id: 'colombia-geisha',
    category: 'espresso',
    nameEn: 'Colombia Huila Geisha Espresso',
    nameSr: 'Kolumbija Huila Geisha Espreso',
    descEn: 'Double anaerobic fermentation. Wild orchid, candied blood orange, and cocoa butter silkiness.',
    descSr: 'Dvostruka anaerobna fermentacija. Divlja orhideja, kandirana crvena pomorandža i svilenkasti kakao puter.',
    priceRsd: 490,
    priceEur: 4.2,
    tags: ['signature'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Medium-Light • Anaerobic 72h', sr: 'Srednje-svetlo • Anaerobno 72h' }
  },
  {
    id: 'flat-white-oat',
    category: 'espresso',
    nameEn: 'Artisan Flat White (Oat / Velvet Milk)',
    nameSr: 'Zanatski Flat White (Ovas / Baršunasto mleko)',
    descEn: 'Double ristretto extracted on custom Synesso machine, textured micro-foam with silky latte art.',
    descSr: 'Dupli ristreto izvučen na Synesso mašini, baršunasta mikro-pena sa preciznim latte artom.',
    priceRsd: 390,
    priceEur: 3.3,
    tags: ['popular', 'vegan'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'House Blend: Brazil & Guatemala', sr: 'Kućni blend: Brazil & Gvatemala' }
  },
  {
    id: 'cold-drip-kyoto',
    category: 'espresso',
    nameEn: 'Kyoto 18-Hour Slow Cold Drip',
    nameSr: 'Kyoto 18-Časovni Spori Hladni Drip',
    descEn: 'Gravity-extracted drop by drop over ice. Notes of dark plum, port wine, and bittersweet cacao.',
    descSr: 'Ekstrakcija kap po kap kroz led tokom 18 sati. Note tamne šljive, porto vina i gorko-slatkog kakaa.',
    priceRsd: 460,
    priceEur: 3.9,
    tags: ['signature', 'vegan'],
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Zero Acidity • Hand-cut crystal ice', sr: 'Nula kiselosti • Ručno rezani kristalni led' }
  },

  // Signature Brews
  {
    id: 'smoked-hazelnut-nitro',
    category: 'signature',
    nameEn: 'The Signature: Smoked Hazelnut Nitro Jar',
    nameSr: 'Potpis Kuće: Dimljeni Lešnik Nitro Jar',
    descEn: 'Nitro-infused single-origin cold brew charged with roasted hazelnut cream, smoked oak mist, and organic raw honey.',
    descSr: 'Nitro hladno kuvana kafa obogaćena kremom od pečenog lešnika, dimljenom hrastovinom i sirovim medom.',
    priceRsd: 560,
    priceEur: 4.8,
    tags: ['signature', 'popular'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Award-winning house creation', sr: 'Nagrađivana kreacija naše kuće' }
  },
  {
    id: 'pistachio-cardamom-velvet',
    category: 'signature',
    nameEn: 'Pistachio & Cardamom Cold Velvet',
    nameSr: 'Pistać & Kardamon Hladni Somot',
    descEn: 'Double espresso layered over cold stone-ground Sicilian pistachio mousse and crushed green cardamom pod infusion.',
    descSr: 'Dupli espreso preko hladnog musa od sicilijanskog pistaća i infuzije zelenog kardamona.',
    priceRsd: 540,
    priceEur: 4.6,
    tags: ['signature'],
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Rich & Aromatic • Bronte Pistachio', sr: 'Bogato i aromatično • Bronte pistaći' }
  },
  {
    id: 'tonka-salted-caramel',
    category: 'signature',
    nameEn: 'Tonka Bean & Smoked Caramel Cortado',
    nameSr: 'Tonka Zrno & Dimljena Karamela Cortado',
    descEn: '1:1 ratio espresso and steamed milk infused with real tonka bean shavings and Maldon sea salt caramel.',
    descSr: '1:1 odnos espresa i mleka sa narendanim zrnom tonke i dimljenom karamelom sa Maldon solju.',
    priceRsd: 440,
    priceEur: 3.8,
    tags: ['popular'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Vanilla-Almond Notes', sr: 'Aroma vanile i badema' }
  },

  // Small Bites & Artisan Jars
  {
    id: 'tiramisu-in-a-jar',
    category: 'bites',
    nameEn: 'Artisan Espresso Tiramisu in Jar',
    nameSr: 'Zanatski Espreso Tiramisu u Teglici',
    descEn: 'Savoiardi ladyfingers soaked in our 18h Kyoto cold drip, whipped mascarpone zabaglione, Valrhona 70% cocoa.',
    descSr: 'Piškote natopljene našim Kyoto hladnim drip espresom, mus od maskarponea i Valrhona 70% kakao.',
    priceRsd: 480,
    priceEur: 4.1,
    tags: ['signature', 'popular'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Layered in glass jar • Made fresh daily', sr: 'Složeno u staklenoj teglici • Sveže svakog jutra' }
  },
  {
    id: 'avocado-burrata-tartine',
    category: 'bites',
    nameEn: 'Sourdough Tartine with Fresh Burrata',
    nameSr: 'Tartin od Kiselog Testa sa Buratom',
    descEn: 'Fermented sourdough, crushed hass avocado, Puglia burrata, roasted cherry tomatoes, basil-infused olive oil.',
    descSr: 'Hleb od divljeg kvasca, zreli avokado, sveža burata, pečeni čeri paradajz i bosiljak ulje.',
    priceRsd: 680,
    priceEur: 5.8,
    tags: ['popular', 'organic'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Organic 48h Fermented Sourdough', sr: 'Organsko 48h fermentisano kiselo testo' }
  },
  {
    id: 'chia-mango-jar',
    category: 'bites',
    nameEn: 'Coconut Chia & Alphonso Mango Jar',
    nameSr: 'Kokos Čia & Alphonso Mango Teglica',
    descEn: 'Overnight organic chia steeped in coconut cream, layered with fresh Alphonso mango coulis and toasted coconut flakes.',
    descSr: 'Organsko čia seme potopljeno u kokosovo mleko, sloj pirea od Alphonso manga i tostirani kokos.',
    priceRsd: 450,
    priceEur: 3.8,
    tags: ['vegan', 'gf', 'organic'],
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Dairy Free • Gluten Free', sr: 'Bez laktoze • Bez glutena' }
  },

  // Cocktails & Evening Jars
  {
    id: 'espresso-martini-reserve',
    category: 'cocktails',
    nameEn: 'Bistro Espresso Martini Reserve',
    nameSr: 'Bistro Espreso Martini Rezerva',
    descEn: 'Belvedere vodka, freshly pulled Huila espresso, artisanal coffee liqueur, roasted cardamom bitters, 3 roasted beans.',
    descSr: 'Belvedere votka, svež Huila espreso, zanatski liker od kafe, biteri od kardamona i 3 zrna kafe.',
    priceRsd: 690,
    priceEur: 5.9,
    tags: ['signature', 'popular'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Served ice cold with silky crema', sr: 'Služeno ledeno sa gustom kremom' }
  },
  {
    id: 'smoked-old-fashioned-jar',
    category: 'cocktails',
    nameEn: 'Smoked Bourbon & Cold Brew Old Fashioned',
    nameSr: 'Dimljeni Burbon & Cold Brew Old Fashioned',
    descEn: 'Woodford Reserve bourbon, concentrated Kyoto cold brew, Demerara syrup, Angostura, smoked cherrywood dome.',
    descSr: 'Woodford Reserve burbon, koncentrovani Kyoto cold brew, demerara sirup, dimljeni čeri hrast pod staklom.',
    priceRsd: 750,
    priceEur: 6.4,
    tags: ['signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    notes: { en: 'Smoked table-side in custom glass jar', sr: 'Dimljeno za stolom u posebnoj teglici' }
  }
];

export const DICTIONARY = {
  en: {
    brand: {
      name: 'Bistro & Jars',
      tagline: 'Coffee Bar • Roastery • Artisanal Jars',
      city: 'Belgrade, Serbia',
      status: 'Open Daily 08:00 – 23:00',
      openNow: 'Open Now',
    },
    nav: {
      story: 'Story',
      signature: 'Signature Craft',
      menu: 'Menu',
      gallery: 'Gallery',
      atmosphere: 'Vibe',
      reserve: 'Book Table / WhatsApp',
      privacy: 'Privacy',
    },
    hero: {
      badge: 'Specialty Coffee Atelier & Bistro',
      titleLine1: 'Where Ritual Meets',
      titleLine2: 'Refined Craft.',
      subtitle: 'A dark, tactile sanctuary in the heart of Belgrade. Single-origin micro-lots, 18-hour cold drips, and culinary creations layered in signature glass jars.',
      ctaMenu: 'Explore QR Menu',
      ctaSignature: 'Watch Signature Craft',
      ctaBook: 'Reserve via WhatsApp',
      scrollIndicator: 'Scroll to explore',
      stats: {
        stat1Num: '100%',
        stat1Label: 'Single-Origin Micro-Lots',
        stat2Num: '18h',
        stat2Label: 'Slow Kyoto Extraction',
        stat3Num: '4.9 ★',
        stat3Label: 'Barista & Guest Rating',
      }
    },
    storyHook: {
      sectionTag: 'The Philosophy',
      heading: 'Not Just a Coffee Bar. A Daily Sensory Sanctuary.',
      body1: 'Born from a devotion to exceptional beans and the warmth of intimate European bistros, Bistro & Jars bridges precision specialty roasting with relaxed evening bar culture.',
      body2: 'Every cup is pulled with obsessive attention to water chemistry, grind micrometer accuracy, and ethical direct-trade origins. Every sweet and savory creation arrives preserved in handcrafted jars for pristine freshness.',
      quote: '“Coffee is not a commodity. It is an editorial dialogue between origin, roast, and human connection.”',
      quoteAuthor: '— Head Roaster & Co-founder, Bistro & Jars',
    },
    signature: {
      badge: 'The Craft in Motion',
      title: 'Anatomy of Our Signature Drink',
      subtitle: 'Scroll to witness how our award-winning "Smoked Hazelnut Nitro Jar" is handcrafted from raw bean to crystal glass.',
      step1: {
        num: '01',
        tag: 'The Origin & Bean Selection',
        title: 'Single-Origin High-Altitude Heirloom',
        desc: 'We source micro-lot beans from 2,100m elevation in Yirgacheffe, Ethiopia. Roasted in-house in small 5kg batches to highlight delicate jasmine, bergamot, and rich hazelnut undertones.',
        highlight: 'Altitude 2,100m • Light-Medium Roast • Direct Trade'
      },
      step2: {
        num: '02',
        tag: 'The Extraction & Nitro Charge',
        title: '18-Hour Kyoto Cold Drip & Cryo Nitrogen',
        desc: 'Ice-water filters through the coffee bed drop by drop over 18 hours, extracting deep cacao sugars with zero bitterness. The elixir is then charged with high-purity nitrogen for a cascading velvet head.',
        highlight: '18h Slow Drip • High Purity Nitro • Silky Cascading Head'
      },
      step3: {
        num: '03',
        tag: 'The Velvet Pour & Smoked Infusion',
        title: 'Artisan Hazelnut Velvet & Smoked Oak Mist',
        desc: 'Layered over stone-ground Piedmont hazelnut velvet cream, sealed in our signature crystal jar, and infused table-side with aromatic cherrywood and oak smoke.',
        highlight: 'Piedmont Hazelnut • Oakwood Smoke Mist • Raw Forest Honey'
      },
      interactivePrompt: 'Interact with each crafting phase above or scroll to continue.',
      tasteNotesTitle: 'Flavor Spectrum',
      tasteNotes: ['Dark Cocoa', 'Smoked Oak', 'Piedmont Hazelnut', 'Wild Honey', 'Silky Crema'],
    },
    menu: {
      badge: 'Table & QR Digital Menu',
      title: 'Curated Offerings',
      subtitle: 'Optimized for in-venue QR scanning and table service. Filter by category, dietary preferences, or search directly.',
      tabs: {
        all: 'All Offerings',
        espresso: 'Espresso & Filter',
        signature: 'Signature Brews',
        bites: 'Bites & Jars',
        cocktails: 'Cocktails & Wine',
      },
      searchPlaceholder: 'Search coffee, breakfast jars, cocktails...',
      filterAll: 'All Tags',
      filterVegan: 'Vegan',
      filterGf: 'Gluten-Free',
      filterSig: 'House Signature',
      currency: 'Currency',
      qrPrompt: 'Scanning from your table? Show this QR code to friends or order directly with your barista.',
      downloadQr: 'In-Venue QR Card',
      empty: 'No items match your selected filter.',
      addDirect: 'Inquire / Order on WhatsApp',
    },
    gallery: {
      badge: 'Moments & Space',
      title: 'Visual Atmosphere',
      subtitle: 'Step inside our warm, dimly lit sanctuary of roasted beans, vinyl acoustics, and artisanal glasscraft.',
      tabs: {
        all: 'All',
        coffee: 'Coffee Craft',
        space: 'Atmosphere & Interior',
        jars: 'Culinary Jars',
        evening: 'Evening Bar',
      }
    },
    atmosphere: {
      badge: 'The Atelier Experience',
      title: 'Built for Lingering.',
      subtitle: 'Every corner of Bistro & Jars is tuned for auditory comfort, warm lighting, and tactile pleasure.',
      feature1Title: 'Custom Analog Audio',
      feature1Desc: 'Warm vinyl jazz and low-fi acoustics playing through restored vintage Tannoy monitors at conversational volumes.',
      feature2Title: 'Micro-Lot Roasting Counter',
      feature2Desc: 'Sit bar-side and watch our roasters calibrate daily extraction recipes on custom Synesso MVP machines.',
      feature3Title: 'Glass Jar Artisanal Kitchen',
      feature3Desc: 'Everything preserved and served in recyclable Italian glass jars—from our overnight chia to evening smoked old fashioneds.',
      feature4Title: 'High-Speed Atelier Fiber',
      feature4Desc: 'Seamless connectivity, quiet alcoves with discreet power outlets for focused morning remote sessions.',
    },
    reservation: {
      badge: 'Reservations & Inquiries',
      title: 'Reserve Your Experience',
      subtitle: 'Send your booking request directly to our concierge team on WhatsApp with instant confirmation.',
      form: {
        name: 'Full Name',
        namePlaceholder: 'e.g. Marko Petrović / Sarah Jenkins',
        phone: 'Phone / WhatsApp Number',
        phonePlaceholder: '+381 60 123 4567',
        guests: 'Number of Guests',
        date: 'Date',
        time: 'Time',
        zone: 'Preferred Seating Zone',
        zoneBar: 'Coffee Atelier / Espresso Bar',
        zoneLounge: 'Dimly Lit Vinyl Lounge',
        zoneTerrace: 'Boutique Outdoor Terrace',
        requests: 'Special Notes / Dietary / Occasion',
        requestsPlaceholder: 'Birthday, vegan preference, quiet table for laptop...',
        submit: 'Confirm & Send to WhatsApp',
        submitting: 'Preparing WhatsApp Message...',
        directLink: 'Or Chat Directly on WhatsApp',
        successTitle: 'Reservation Form Prepared!',
        successBody: 'Click the button below to open WhatsApp with your pre-formatted booking details. Our barista manager will confirm in minutes.',
        openWhatsApp: 'Open WhatsApp Now',
      },
      directContact: {
        title: 'Direct Inquiries',
        address: 'Kralja Petra 44, Dorćol, 11000 Belgrade, Serbia',
        hours: 'Monday – Sunday: 08:00 – 23:00',
        phone: '+381 11 328 9901',
        whatsapp: '+381 64 987 6543',
        email: 'concierge@bistroandjars.rs',
      }
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: September 2026',
      close: 'Close',
      p1: 'At Bistro & Jars, we value your privacy. We do not sell or track your personal information across third-party networks.',
      p2: 'When you submit a reservation request via our WhatsApp integration, your data is processed exclusively to handle your table booking and dietary accommodations.',
      p3: 'No credit card data is stored on this website. All on-site transactions happen directly at our Belgrade coffee bar.',
    },
    footer: {
      tagline: 'Bistro & Jars — Belgrade Specialty Coffee Roastery & Bar.',
      rights: 'All rights reserved.',
      quickLinks: 'Navigation',
      hoursTitle: 'Opening Hours',
      weekdays: 'Mon – Fri: 08:00 – 23:00',
      weekends: 'Sat – Sun: 09:00 – 00:00',
      locationTitle: 'Atelier Location',
    }
  },
  sr: {
    brand: {
      name: 'Bistro & Jars',
      tagline: 'Coffee Bar • Pržionica • Zanatske Teglice',
      city: 'Beograd, Srbija',
      status: 'Otvoreno svakog dana 08:00 – 23:00',
      openNow: 'Otvoreno sada',
    },
    nav: {
      story: 'Priča',
      signature: 'Potpis Kuće',
      menu: 'Jelovnik',
      gallery: 'Galerija',
      atmosphere: 'Ambijent',
      reserve: 'Rezervacija / WhatsApp',
      privacy: 'Privatnost',
    },
    hero: {
      badge: 'Specijalizovani Kafa Atelje & Bistro',
      titleLine1: 'Gde Se Ritual Spaja Sa',
      titleLine2: 'Zanatskom Strašću.',
      subtitle: 'Tamno, taktilno utočište u srcu Beograda. Kafa jedinstvenog porekla, 18-časovni hladni drip i kulinarske poslastice složene u našim prepoznatljivim teglama.',
      ctaMenu: 'Pogledaj QR Meni',
      ctaSignature: 'Priča o Našoj Kafi',
      ctaBook: 'Rezerviši preko WhatsApp-a',
      scrollIndicator: 'Skrolujte za istraživanje',
      stats: {
        stat1Num: '100%',
        stat1Label: 'Single-Origin Mikro-Lotovi',
        stat2Num: '18h',
        stat2Label: 'Sporo Kyoto Kapanje',
        stat3Num: '4.9 ★',
        stat3Label: 'Ocena Gostiju i Barista',
      }
    },
    storyHook: {
      sectionTag: 'Filozofija',
      heading: 'Više Od Kafeterije. Dnevno Čulno Utočište.',
      body1: 'Nastao iz strasti prema vrhunskom zrnu i toplini intimnih evropskih bistroa, Bistro & Jars spaja precizno prženje specialty kafe sa opuštenom večernjom atmosferom.',
      body2: 'Svaka šoljica priprema se sa opsesivnom pažnjom prema hemiji vode, mikrometarskom mlevenju i etičkom direktnom uvozu. Svaki zalogaj stiže u ručno zatvorenim staklenim teglama za besprekornu svežinu.',
      quote: '„Kafa nije puka roba. To je urednički dijalog između porekla, prženja i ljudskog susreta.”',
      quoteAuthor: '— Glavni pržioničar i suosnivač, Bistro & Jars',
    },
    signature: {
      badge: 'Zanat u Pokretu',
      title: 'Anatomija Našeg Potpisa',
      subtitle: 'Pratite korake kako se naš nagrađivani "Smoked Hazelnut Nitro Jar" stvara od sirovog zrna do kristalne čaše.',
      step1: {
        num: '01',
        tag: 'Poreklo i Selekcija Zrna',
        title: 'Single-Origin Sa Visokih Nadmorskih Visina',
        desc: 'Biramo mikro-lotove sa 2.100m nadmorske visine iz regije Yirgacheffe, Etiopija. Pržimo u malim serijama od 5kg kako bismo istakli arome jasmina, bergamota i pečenog lešnika.',
        highlight: 'Nadmorska visina 2.100m • Svetlo-Srednje Prženje • Direct Trade'
      },
      step2: {
        num: '02',
        tag: 'Ekstrakcija i Nitro Punjenje',
        title: '18-Časovno Kyoto Kapanje & Krio Azot',
        desc: 'Ledena voda filtrira se kroz kafu kap po kap punih 18 sati, izvlačeći prirodnu slatkoću bez trunke neprijatne gorčine. Eliksir se zatim obogaćuje azotom za somotsku penu.',
        highlight: '18h Hladna Ekstrakcija • Čisti Azot • Kaskadna Kremasta Pena'
      },
      step3: {
        num: '03',
        tag: 'Somotsko Sipanje i Dimljenje',
        title: 'Krem od Lešnika & Dim Hrastovine',
        desc: 'Kafa se preliva preko krema od pečenih lešnika, zatvara u prepoznatljivu staklenu teglu i na licu mesta pred gostom dimi aromatičnim drvetom trešnje i hrasta.',
        highlight: 'Pijemontski Lešnik • Dim Hrastovine • Sirovi Šumski Med'
      },
      interactivePrompt: 'Kliknite na faze iznad ili skrolujte dalje za nastavak.',
      tasteNotesTitle: 'Spektar Ukusa',
      tasteNotes: ['Tamni Kakao', 'Dimljeni Hrast', 'Pijemontski Lešnik', 'Šumski Med', 'Svilenkasta Krema'],
    },
    menu: {
      badge: 'Digitalni i QR Meni za Stolove',
      title: 'Naša Karta Pića i Hrane',
      subtitle: 'Prilagođeno za brzo QR skeniranje sa stola. Filtrirajte po kategoriji, načinu ishrane ili pretražite omiljeni ukus.',
      tabs: {
        all: 'Sve',
        espresso: 'Espreso & Filter',
        signature: 'Specijaliteti Kuće',
        bites: 'Zalogaji u Teglama',
        cocktails: 'Kokteli & Vina',
      },
      searchPlaceholder: 'Pretražite kafu, doručak u tegli, koktele...',
      filterAll: 'Sve Oznake',
      filterVegan: 'Vegansko',
      filterGf: 'Bez Glutena',
      filterSig: 'Potpis Kuće',
      currency: 'Valuta',
      qrPrompt: 'Skenirate sa stola? Pokažite ovaj QR kod prijateljima ili poručite direktno kod bariste.',
      downloadQr: 'QR Karta za Sto',
      empty: 'Nema stavki koje odgovaraju izabranom filteru.',
      addDirect: 'Poruči / Pitaj na WhatsApp-u',
    },
    gallery: {
      badge: 'Trenuci & Prostor',
      title: 'Vizuelni Ambijent',
      subtitle: 'Zavirite u naše toplo, intimno utočište mirisa sveže pržene kafe, vinila i staklenih tegli.',
      tabs: {
        all: 'Sve',
        coffee: 'Umetnost Kafe',
        space: 'Ambijent i Enterijer',
        jars: 'Teglice i Hrana',
        evening: 'Večernji Bar',
      }
    },
    atmosphere: {
      badge: 'Iskustvo u Ateljeu',
      title: 'Stvoreno za Uživanje.',
      subtitle: 'Svaki kutak Bistro & Jars-a prilagođen je akustičnom komforu, toplom osvetljenju i taktilnom užitku.',
      feature1Title: 'Analogni Vinil Zvuk',
      feature1Desc: 'Topli jazz sa gramofonskih ploča kroz restaurirane Tannoy zvučnike prijatne jačine za razgovor.',
      feature2Title: 'Šank za Prženje Kafe',
      feature2Desc: 'Sedite za šank i pratite kako naši baristi kalibrišu dnevne recepte na Synesso MVP mašinama.',
      feature3Title: 'Zanatska Kuhinja u Teglicama',
      feature3Desc: 'Sve se priprema i služi u italijanskim staklenim teglama—od jutarnje čie do večernjih dimljenih koktela.',
      feature4Title: 'Brzi Optički Internet',
      feature4Desc: 'Udobna mesta sa skrivenim utičnicama za fokusiran jutarnji rad uz omiljenu kafu.',
    },
    reservation: {
      badge: 'Rezervacije i Upiti',
      title: 'Rezervišite Svoje Mesto',
      subtitle: 'Pošaljite zahtev za rezervaciju direktno našem timu putem WhatsApp-a uz brzu potvrdu.',
      form: {
        name: 'Ime i Prezime',
        namePlaceholder: 'npr. Marko Petrović / Jelena Jovanović',
        phone: 'Broj Telefona / WhatsApp',
        phonePlaceholder: '+381 60 123 4567',
        guests: 'Broj Osoba',
        date: 'Datum',
        time: 'Vreme',
        zone: 'Željena Zona',
        zoneBar: 'Espreso Šank / Atelje',
        zoneLounge: 'Vinil Salon / Udobne Fotelje',
        zoneTerrace: 'Bašta na Otvorenom',
        requests: 'Napomene / Povod / Ishrana',
        requestsPlaceholder: 'Rođendan, miran sto za rad, veganski doručak...',
        submit: 'Potvrdi i Pošalji na WhatsApp',
        submitting: 'Priprema WhatsApp Poruke...',
        directLink: 'Ili Pišite Direktno na WhatsApp',
        successTitle: 'Formular je Pripremljen!',
        successBody: 'Kliknite na dugme ispod da otvorite WhatsApp sa unapred popunjenim podacima za rezervaciju. Naš tim odgovara za nekoliko minuta.',
        openWhatsApp: 'Otvori WhatsApp Sada',
      },
      directContact: {
        title: 'Direktan Kontakt',
        address: 'Kralja Petra 44, Dorćol, 11000 Beograd, Srbija',
        hours: 'Ponedeljak – Nedelja: 08:00 – 23:00',
        phone: '+381 11 328 9901',
        whatsapp: '+381 64 987 6543',
        email: 'concierge@bistroandjars.rs',
      }
    },
    privacy: {
      title: 'Politika Privatnosti',
      lastUpdated: 'Ažurirano: Septembar 2026',
      close: 'Zatvori',
      p1: 'U Bistro & Jars-u izuzetno cenimo vašu privatnost. Ne prodajemo niti delimo vaše lične podatke sa trećim licima.',
      p2: 'Kada pošaljete zahtev za rezervaciju preko WhatsApp integracije, podaci se koriste isključivo radi organizacije vašeg boravka kod nas.',
      p3: 'Na sajtu se ne čuvaju podaci o platnim karticama. Sva plaćanja obavljaju se na licu mesta u našem beogradskom baru.',
    },
    footer: {
      tagline: 'Bistro & Jars — Beogradska pržionica specialty kafe i bar.',
      rights: 'Sva prava zadržana.',
      quickLinks: 'Navigacija',
      hoursTitle: 'Radno Vreme',
      weekdays: 'Pon – Pet: 08:00 – 23:00',
      weekends: 'Sub – Ned: 09:00 – 00:00',
      locationTitle: 'Lokacija Ateljea',
    }
  }
};
