import { WordEntry } from '../types';

export const UZBEK_DICTIONARY: WordEntry[] = [
  {
    id: 'saodat',
    slug: 'saodat',
    word: 'Saodat',
    wordCyrillic: 'Саодат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot (ism)',
    phonetic: "[sa:o'dat]",
    origin: 'arabcha',
    originDetails: 'Arabcha: سعادة (sa‘ādat) — baxt, tole, omad, iqbol.',
    definitions: [
      'Hayotdan to\'la qoniqish, oliy ruhiy huzur-halovat va baxt holati.',
      'Yaxshi niyat va tole yorligi, ezgu maqsadlarga yetishishdagi muvaffaqiyat.'
    ],
    examples: [
      {
        quote: "Nafs orzusin ko'nguldan daf' et, to haqiqiy saodat gavhari qo'lingga kirsin.",
        author: 'Alisher Navoiy',
        source: 'Mahbub ul-qulub',
        year: '1500'
      },
      {
        quote: "Inson uchun ilm va ma'rifat yo'lidagi zahmatdan ulug'roq saodat yo'qdir.",
        author: 'Abdulla Avloniy',
        source: 'Turkiy Guliston yoxud Axloq',
        year: '1913'
      }
    ],
    synonyms: ['Baxt', 'Iqbol', 'Komyoblik', 'Kut-baraka', 'Farog\'at'],
    antonyms: ['Baxtsizlik', 'Kulfat', 'Musibat', 'Shavqat'],
    phrases: ['Saodat eshigi', 'Saodatmand bo\'lmoq', 'Saodat asri'],
    morphemes: {
      root: 'saodat',
      rootType: 'O\'zlashma tub so\'z',
      affixes: []
    },
    frequencyRank: 120,
    category: 'mumtoz',
    isWordOfTheDay: true
  },
  {
    id: 'marifat',
    slug: 'marifat',
    word: "Ma'rifat",
    wordCyrillic: "Маърифат",
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: "[ma'rifat]",
    origin: 'arabcha',
    originDetails: 'Arabcha: معرفة (ma‘rifah) — bilish, tanish, ong, tushunish, madaniyat.',
    definitions: [
      'Kishilarning ongini, bilimini, madaniy saviyasini oshirishga qaratilgan ta\'lim-tarbiya va ma\'naviy boyliklar majmui.',
      'Haqiqatni, borliq qonuniyatlarini bilish va chuqur anglash darajasi.'
    ],
    examples: [
      {
        quote: "Bizni jaholat qorong'iligidan faqat ma'rifat mash'ali qutqara oladi.",
        author: 'Mahmudxo\'ja Behbudiy',
        source: 'Oyna jurnali',
        year: '1914'
      },
      {
        quote: "Ma'rifatsiz millat taraqqiyot karvonidan orqada qolishga mahkumdir.",
        author: 'Munavvarqori Abdurashidxonov',
        source: 'Tanlangan asarlar',
        year: '1917'
      }
    ],
    synonyms: ['Ziyo', 'Ilm-fan', 'Madaniyat', 'Ogohlik', 'Tahsil'],
    antonyms: ['Jaholat', 'Nodonlik', 'G\'aflat'],
    phrases: ["Ma'rifatparvarlik harakati", "Ma'rifat ulashmoq", "Ma'rifat ziyosi"],
    morphemes: {
      root: "ma'rifat",
      rootType: 'Arabiy o\'zak',
      affixes: []
    },
    frequencyRank: 95,
    category: 'falsafiy'
  },
  {
    id: 'farosat',
    slug: 'farosat',
    word: 'Farosat',
    wordCyrillic: 'Фаросат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[farosat]',
    origin: 'arabcha',
    originDetails: "Arabcha: فراسة (firāsah) — ichki sezgi, aql-idrok, fahm-farosat, ziyraklik.",
    definitions: [
      'Voqea-hodisalar, kishilarning holati va xatti-harakatlarining tub mohiyatini so\'zsiz, tezda anglab olish qobiliyati; fahm-idrok.',
      'Odob, andisha va vaziyatga mos muomala qila bilish nozik tuyg\'usi.'
    ],
    examples: [
      {
        quote: "Odamning husni uning yuzida emas, balki so'zidagi farosatida aks etadi.",
        author: 'Abdulla Qodiriy',
        source: 'O\'tkan kunlar',
        year: '1925'
      }
    ],
    synonyms: ['Fahm', 'Ziyraklik', 'Idrok', 'Zukkolik', 'Andisha'],
    antonyms: ['Farosatsizlik', 'Go\'llik', 'Befahmlik'],
    phrases: ['Farosat bilan ish ko\'rmoq', 'Farosatiga qoyil qolmoq'],
    morphemes: {
      root: 'farosat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 160,
    category: 'adabiy'
  },
  {
    id: 'shukrona',
    slug: 'shukrona',
    word: 'Shukrona',
    wordCyrillic: 'Шукрона',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[shukrona]',
    origin: 'arabcha',
    originDetails: 'Arabcha: شكر (shukr) + forscha: -ona (xoslik qo\'shimchasi) — minnatdorchilik bildirish, shukr qilish.',
    definitions: [
      'Yetishgan ne\'mat, baxt va yaxshiliklar uchun bildirilgan cheksiz minnatdorlik va rizolik hissi.',
      'Shukr munosabati bilan beriladigan xayr-ehson yoki qilinadigan ezgu amal.'
    ],
    examples: [
      {
        quote: "Har tong uyg'onganingda, tinch osmoning va noning borligiga shukrona keltir.",
        author: 'Erkin Vohidov',
        source: 'Dono bilan suhbat',
        year: '1987'
      }
    ],
    synonyms: ['Minnatdorlik', 'Tashakkur', 'Rizolik', 'Hamd'],
    antonyms: ['Noshukrlik', 'Nosipaslik', 'Noroziylik'],
    phrases: ['Shukrona aytmoq', 'Shukronalik hissi', 'Shukrona keltirmoq'],
    morphemes: {
      root: 'shukr',
      rootType: 'Ot o\'zak',
      affixes: [
        { text: '-ona', type: "so'z yasovchi", meaning: 'xoslik sifat/ot yasovchi' }
      ]
    },
    frequencyRank: 210,
    category: 'umumiy'
  },
  {
    id: 'tamaddun',
    slug: 'tamaddun',
    word: 'Tamaddun',
    wordCyrillic: 'Тамаддун',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[tamaddun]',
    origin: 'arabcha',
    originDetails: 'Arabcha: تمدن (tamaddun) — madaniylashish, shaharlashish, sivilizatsiya (Madina shahri nomidan).',
    definitions: [
      'Jamiyatning moddiy va ma\'naviy taraqqiyot bosqichi; sivilizatsiya.',
      'Madaniyat, fan, me\'morchilik va ijtimoiy tuzilmalarning yuksak rivojlanish darajasi.'
    ],
    examples: [
      {
        quote: "Sharq tamadduni o'zining buyuk allomalari bilan butun bashariyat aql-zakovatiga yo'l ko'rsatgan.",
        author: 'Bo\'riboy Ahmedov',
        source: 'Tarixdan saboqlar',
        year: '1994'
      }
    ],
    synonyms: ['Sivilizatsiya', 'Madaniyat', 'Taraqqiyot'],
    antonyms: ['Yovvoyilik', 'Ibtidoiylik', 'Jaholat'],
    phrases: ['Islom tamadduni', 'Qadimgi tamaddunlar beshigi'],
    morphemes: {
      root: 'tamaddun',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 280,
    category: 'falsafiy'
  },
  {
    id: 'tafakkur',
    slug: 'tafakkur',
    word: 'Tafakkur',
    wordCyrillic: 'Тафаккур',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[tafakkur]',
    origin: 'arabcha',
    originDetails: 'Arabcha: تفكير / تفكّر (tafakkur) — fikrlash, mulohaza yuritish, aql charxlash.',
    definitions: [
      'Inson ongining eng yuksak bosqichi: narsa va hodisalar o\'rtasidagi ichki bog\'lanishlarni umumlashtirib idrok etish jarayoni; aqliy faoliyat, fikrlash.',
      'Chuqur o\'y-mulohaza, tahliliy qarash.'
    ],
    examples: [
      {
        quote: "Tafakkur qilgan kishi jahon sir-asrorining kalitini topadi.",
        author: 'Zahiriddin Muhammad Bobur',
        source: 'Boburnoma',
        year: '1528'
      }
    ],
    synonyms: ['Fikrlash', 'O\'y-xayol', 'Mulohaza', 'Aql-idrok'],
    antonyms: ['Befikrlik', 'Yuzakilik', 'Johillik'],
    phrases: ['Erkin tafakkur', 'Tafakkur doirasi', 'Tafakkurga chorlamoq'],
    morphemes: {
      root: 'tafakkur',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 145,
    category: 'falsafiy'
  },
  {
    id: 'istiqbol',
    slug: 'istiqbol',
    word: 'Istiqbol',
    wordCyrillic: 'Истиқбол',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[istiqbol]',
    origin: 'arabcha',
    originDetails: "Arabcha: استقبال (istiqbāl) — qarshi olish, oldinga chiqish, kelajak zamon.",
    definitions: [
      'Kelgusi davr, kelajak zamon; inson yoki jamiyat oldida turgan porloq istiqbolli imkoniyatlar.',
      'Yuksak taraqqiyot sari intilish istiqboli.'
    ],
    examples: [
      {
        quote: "Yoshlarning chuqur bilimi va odobi — millatimiz istiqbolining mustahkam poydevoridir.",
        author: 'Cho\'lpon',
        source: 'Kecha va kunduz',
        year: '1936'
      }
    ],
    synonyms: ['Kelajak', 'Kelasi zamon', 'Oqibat', 'Ertangi kun'],
    antonyms: ['O\'tmish', 'Moziy'],
    phrases: ['Istiqbolli loyiha', 'Istiqbol sari qadam', 'Porloq istiqbol'],
    morphemes: {
      root: 'istiqbol',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 190,
    category: 'umumiy'
  },
  {
    id: 'fasohat',
    slug: 'fasohat',
    word: 'Fasohat',
    wordCyrillic: 'Фасоҳат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[fasohat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: فصاحة (faṣāḥah) — so\'zning ravonligi, sofligi, nutq go\'zalligi.',
    definitions: [
      'Nutqning tushunarli, ravon, qoidaga muvofiq, jarangdor va chiroyli ifodalangan holati; so\'zamollik va notiqlik san\'ati.',
      'Tildagi bexato va jilvali ifoda madaniyati.'
    ],
    examples: [
      {
        quote: "So'zda fasohat bo'lmasa, ma'no qancha ulug' bo'lmasin, dildan dilga yetib bormaydi.",
        author: 'Alisher Navoiy',
        source: 'Muhokamat ul-lug\'atayn',
        year: '1499'
      }
    ],
    synonyms: ['Balog\'at', 'Notiqlik', 'Ravonlik', 'Shirinsuxanlik'],
    antonyms: ['G\'alizlik', 'Duduqlik', 'Dag\'allik'],
    phrases: ['Fasohatli nutq', 'Fasohat egasi'],
    morphemes: {
      root: 'fasohat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 340,
    category: 'mumtoz'
  },
  {
    id: 'mehr',
    slug: 'mehr',
    word: 'Mehr',
    wordCyrillic: 'Меҳр',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[mehr]',
    origin: 'forscha',
    originDetails: "Forscha: مهر (mehr) — quyosh, muhabbat, mehr-shafqat, iliqlik.",
    definitions: [
      'Insonlarga nisbatan dildan chiquvchi samimiy muhabbat, iliqlik, g\'amxo\'rlik va xayrixohlik hissi.',
      'Kishi qalbini yorituvchi ruhiy yaqinlik va shafqat.'
    ],
    examples: [
      {
        quote: "Mehr qolur, muhabbat qolur — dunyoda har narsa o'tkinchidir.",
        author: 'O\'tkir Hoshimov',
        source: 'Dunyoning ishlari',
        year: '1982'
      }
    ],
    synonyms: ['Muhabbat', 'Shafqat', 'Iliqlik', 'G\'amxo\'rlik', 'Muruvvat'],
    antonyms: ['Qahr', 'G\'azab', 'Sovuqqonlik', 'Bemehrlik'],
    phrases: ['Mehr-oqibat', 'Mehr ko\'rgazmoq', 'Mehri tovlanmoq', 'Ona mehri'],
    morphemes: {
      root: 'mehr',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 45,
    category: 'umumiy'
  },
  {
    id: 'saxovat',
    slug: 'saxovat',
    word: 'Saxovat',
    wordCyrillic: 'Саховат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[saxovat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: سخاوة (saxāwah) — saxiylik, himmat, bag\'rikenglik, himmatlilik.',
    definitions: [
      'Boshqalarga beg\'araz yordam qo\'lini cho\'zish, mol-dunyoni va imkoniyatlarni boshqalar bilan baham ko\'rish fazilati; himmatlilik.',
      'Tabiatning boy va in\'omkor xususiyati (masalan, saxovatli zamin).'
    ],
    examples: [
      {
        quote: "Saxovatli kishining xonadoni hech qachon fayz-barakadan kam bo'lmaydi.",
        author: 'Abdulla Oripov',
        source: 'Saylanma',
        year: '1998'
      }
    ],
    synonyms: ['Saxiylik', 'Himmat', 'Ochiqqo\'llik', 'Karam', 'Muruvvat'],
    antonyms: ['Baxillik', 'Xasislik', 'Qizg\'anchiqlik'],
    phrases: ['Saxovatpesha inson', 'Saxovat ko\'rsatmoq', 'Saxovatli qo\'llar'],
    morphemes: {
      root: 'saxovat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 230,
    category: 'adabiy'
  },
  {
    id: 'tabassum',
    slug: 'tabassum',
    word: 'Tabassum',
    wordCyrillic: 'Табассум',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[tabassum]',
    origin: 'arabcha',
    originDetails: 'Arabcha: تبسّم (tabassum) — jilmayish, nim tabassum qilish.',
    definitions: [
      'Ovozsiz, samimiy va mayin kulgu; jilmayish, kulimsirash.',
      'Qalbdagi xushnudlik va shodlikning yuzdagi nurli ifodasi.'
    ],
    examples: [
      {
        quote: "Onaizorning mayin tabassumi har qanday g'am-alamni aritishga qodir mo'jizadir.",
        author: 'Tog\'ay Murod',
        source: 'Otamdan qolgan dalalar',
        year: '1993'
      }
    ],
    synonyms: ['Jilmayish', 'Kulimsirash', 'Iymanuvchi kulgu'],
    antonyms: ['Qovog\'ini solish', 'Xo\'mrayish'],
    phrases: ['Tabassum hadya etmoq', 'Nim tabassum', 'Samimiy tabassum'],
    morphemes: {
      root: 'tabassum',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 88,
    category: 'umumiy'
  },
  {
    id: 'mutolaa',
    slug: 'mutolaa',
    word: 'Mutolaa',
    wordCyrillic: 'Мутолаа',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: "[muto:la'a]",
    origin: 'arabcha',
    originDetails: 'Arabcha: مطالعة (muṭāla‘ah) — diqqat bilan o\'qish, ko\'zdan kechirish, o\'rganish.',
    definitions: [
      'Kitob, risola yoki qo\'lyozmalarni diqqat-e\'tibor bilan o\'qish, ma\'nosini chaqish jarayoni.',
      'Ilmiy yoki badiiy asarlarni tizimli o\'rganish faoliyati.'
    ],
    examples: [
      {
        quote: "Har kuni kitob mutolaa qilgan kishining tafakkuri buloq suvidek tiniqlashadi.",
        author: 'G\'afur G\'ulom',
        source: 'Shum bola',
        year: '1936'
      }
    ],
    synonyms: ['O\'qish', 'Kitobxonlik', 'Tahsil'],
    antonyms: ['Kitobsizlik', 'Mutolaasizlik'],
    phrases: ['Kitob mutolaasi', 'Mutolaaga sho\'ng\'imoq', 'Mutolaa zavqi'],
    morphemes: {
      root: 'mutolaa',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 175,
    category: 'adabiy'
  },
  {
    id: 'ziyolilik',
    slug: 'ziyolilik',
    word: 'Ziyolilik',
    wordCyrillic: 'Зиёлилик',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[ziyolilik]',
    origin: 'arabcha',
    originDetails: 'Arabcha: ضياء (ḍiyā’) — nur, yorug\'lik + turkiy: -li + -lik (fazilat yasovchi).',
    definitions: [
      'Yuksak ma\'lumotga, teran dunyoqarashga, axloqiy poklikka va jamiyat oldida mas\'uliyat hisiga ega bo\'lish xislati; intellektuallik.',
      'Milliy va umuminsoniy qadriyatlarni himoya qiluvchi ma\'naviy ilg\'orlik.'
    ],
    examples: [
      {
        quote: "Haqiqiy ziyolilik — o'z manfaatini emas, balki xalqining taqdirini o'ylash demakdir.",
        author: 'Ibrohim G\'afurov',
        source: 'Mangu latofat',
        year: '2005'
      }
    ],
    synonyms: ['Intellektuallik', 'Ma\'rifatparvarlik', 'Madaniyatlilik'],
    antonyms: ['Jaholat', 'Nodonlik', 'Omilik'],
    phrases: ['Ziyolilar qatlami', 'Haqiqiy ziyolilik namunasi'],
    morphemes: {
      root: 'ziyo',
      rootType: 'Ot o\'zak',
      affixes: [
        { text: '-li', type: "so'z yasovchi", meaning: 'ega bo\'lish ma\'nosi' },
        { text: '-lik', type: "so'z yasovchi", meaning: 'mavhum ot yasovchi' }
      ]
    },
    frequencyRank: 310,
    category: 'falsafiy'
  },
  {
    id: 'adolat',
    slug: 'adolat',
    word: 'Adolat',
    wordCyrillic: 'Адолат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[adolat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: عدالة (‘adālah) — tenglik, to\'g\'rilik, haqiqatparvarlik, adl.',
    definitions: [
      'Insonlarning huquq va burchlariga birdek hurmat bilan yondashish, har kimga o\'z haq-huquqini berish tamoyili; odillik, xolislik.',
      'Qonuniylik va tenglikka asoslangan ijtimoiy munosabat.'
    ],
    examples: [
      {
        quote: "Kuch — adolatda. Agar adolat yo'qolsa, davlat va jamiyat poydevori larzaga keladi.",
        author: 'Amir Temur',
        source: 'Temur tuzuklari',
        year: '1400'
      }
    ],
    synonyms: ['Odillik', 'Insof', 'Haqqoniylik', 'Xolislik', 'Tenglik'],
    antonyms: ['Adolatsizlik', 'Zulm', 'Noinsizlik', 'Jabru sitam'],
    phrases: ['Adolat qaror topdi', 'Adolat tarozisi', 'Adolatli hukm'],
    morphemes: {
      root: 'adolat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 55,
    category: 'huquqiy'
  },
  {
    id: 'halollik',
    slug: 'halollik',
    word: 'Halollik',
    wordCyrillic: 'Ҳалоллик',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[halollik]',
    origin: 'arabcha',
    originDetails: 'Arabcha: حلال (ḥalāl) — ruxsat etilgan, pok + turkiy: -lik qo\'shimchasi.',
    definitions: [
      'Xatti-harakat, mehnat va hayot tarzida to\'g\'riso\'z, pokiza, beg\'araz va qonuniy bo\'lish fazilati.',
      'O\'zganing haqiga xiyonat qilmaslik, vijdonga muvofiq yashash xislati.'
    ],
    examples: [
      {
        quote: "Halol luqma bilan boqilgan farzand oilaning va yurtning faxriga aylanadi.",
        author: 'Said Ahmad',
        source: 'Ufq',
        year: '1976'
      }
    ],
    synonyms: ['Poklik', 'To\'g\'rilik', 'Diyonat', 'Insoflilik', 'Vijdoniylik'],
    antonyms: ['Haromlik', 'Xiyonat', 'Egrilik', 'Nopoklik'],
    phrases: ['Halol mehnat', 'Halol luqma', 'Halollik garovi'],
    morphemes: {
      root: 'halol',
      rootType: 'Sifat o\'zak',
      affixes: [
        { text: '-lik', type: "so'z yasovchi", meaning: 'mavhum ot yasovchi' }
      ]
    },
    frequencyRank: 70,
    category: 'umumiy'
  },
  {
    id: 'zakovat',
    slug: 'zakovat',
    word: 'Zakovat',
    wordCyrillic: 'Заковат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[zakovat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: ذكاء / ذكاوة (dhakāwah) — o\'tkir aql, zukkolik, ziyraklik.',
    definitions: [
      'Inson aql-idrokining teranligi, o\'tkirligi va tezkor topqirligi; yuksak aqliy qobiliyat.',
      'Murakkab jumboqlarni oson yecha oladigan zehn salohiyati.'
    ],
    examples: [
      {
        quote: "Ulug'bek zakovati tufayli Samarqand osmoni yulduzlarning eng aniq xaritasiga ega bo'ldi.",
        author: 'Oybek',
        source: 'Navoiy romani',
        year: '1944'
      }
    ],
    synonyms: ['Zukkolik', 'Donolik', 'Idrok', 'Zehn', 'Intellekt'],
    antonyms: ['Kallavaramlik', 'Go\'llik', 'Nodonlik'],
    phrases: ['Zakovat ko\'rsatmoq', 'Zakovat intellektual o\'yini', 'Zakovat sohibi'],
    morphemes: {
      root: 'zakovat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 115,
    category: 'falsafiy'
  },
  {
    id: 'algoritm',
    slug: 'algoritm',
    word: 'Algoritm',
    wordCyrillic: 'Алгоритм',
    partOfSpeech: 'termin',
    partOfSpeechNameUz: 'Termin / Ot',
    phonetic: '[algoritm]',
    origin: 'arabcha',
    originDetails: "Buyuk o'zbek allomasi Muhammad ibn Muso al-Xorazmiy (Algoritmi) nomidan kelib chiqqan xalqaro termin.",
    definitions: [
      'Qo\'yilgan maqsadga erishish yoki masalani yechish uchun bajarilishi lozim bo\'lgan amallarning qat\'iy, ketma-ket tartiblangan ko\'rsatmasi.',
      'Hisoblash texnikasi va dasturlashda ma\'lumotlarni qayta ishlashning mantiqiy tartibi.'
    ],
    examples: [
      {
        quote: "Al-Xorazmiy yaratgan algoritm tushunchasi bugungi kunda jahon axborot texnologiyalarining negizini tashkil etadi.",
        author: 'Akademik Komiljon Zokirov',
        source: 'Allomalar merosi',
        year: '2018'
      }
    ],
    synonyms: ['Ketma-ketlik', 'Yo\'riqnoma', 'Dastur sxemasi'],
    antonyms: ['Tartibsizlik', 'Tasodifiylik'],
    phrases: ['Qidiruv algoritmi', 'Saralash algoritmi', 'Algoritmik fikrlash'],
    morphemes: {
      root: 'algoritm',
      rootType: 'Terminologik o\'zak',
      affixes: []
    },
    frequencyRank: 150,
    category: 'it-texnologiya'
  },
  {
    id: 'suniy-intellekt',
    slug: 'suniy-intellekt',
    word: "Sun'iy intellekt",
    wordCyrillic: "Сунъий интеллект",
    partOfSpeech: 'termin',
    partOfSpeechNameUz: 'Qo\'shma termin',
    phonetic: "[sun'iy intellekt]",
    origin: 'lotincha',
    originDetails: "Arabcha: صُنْعِيّ (sun'iy — qo'lda yasalgan) + Lotincha: intellectus (aql, idrok, tushunish).",
    definitions: [
      'Inson aql-zakovati va fikrlash xususiyatlarini (o\'rganish, xulosa chiqarish, ijod qilish) modellashtiruvchi kompyuter tizimlari va texnologiyalari majmui.',
      'Katta hajmdagi ma\'lumotlarni tahlil qilib, mustaqil qaror qabul qiluvchi aqlli dasturlar.'
    ],
    examples: [
      {
        quote: "Sun'iy intellekt tildagi nozik ma'nolarni va badiiy asarlardagi badiiyatni o'rganishda yangi ufqlar ochmoqda.",
        author: 'O\'zbekiston Milliy Universiteti ilmiy to\'plami',
        source: 'Zamonaviy lingvistika',
        year: '2025'
      }
    ],
    synonyms: ['Mashina idroki', 'Aqlli tizim', 'AI (Artificial Intelligence)'],
    antonyms: ['Tabiiy aql', 'Instinkt'],
    phrases: ["Sun'iy intellekt modeli", "Neyron tarmoqlari", "Generativ intellekt"],
    morphemes: {
      root: "sun'iy intellekt",
      rootType: 'Qo\'shma birikma',
      affixes: []
    },
    frequencyRank: 80,
    category: 'it-texnologiya'
  },
  {
    id: 'dasturlash',
    slug: 'dasturlash',
    word: 'Dasturlash',
    wordCyrillic: 'Дастурлаш',
    partOfSpeech: 'fe\'l',
    partOfSpeechNameUz: 'Harakat nomi (fe\'l)',
    phonetic: '[dasturlash]',
    origin: 'forscha',
    originDetails: "Forscha: دستور (dastūr — qoida, nizom, yo'l-yo'riq) + turkiy: -lash (fe'l yasovchi).",
    definitions: [
      'Kompyuterlar yoki elektron qurilmalar uchun turli vazifalarni bajarishga mo\'ljallangan dasturiy ta\'minot va kodlarni yozish, sinash va rivojlantirish jarayoni.',
      'Oldindan rejalashtirish, qat\'iy tartibga solish faoliyati.'
    ],
    examples: [
      {
        quote: "Zamonaviy yoshlar dasturlash tillarini mukammal egallab, global raqamli iqtisodiyotda yetakchi bo'lmoqdalar.",
        author: 'IT Park jurnali',
        source: 'Kelajak kasblari',
        year: '2024'
      }
    ],
    synonyms: ['Kodlash', 'Programmalash', 'Tizimlashtirish'],
    antonyms: [],
    phrases: ['Dasturlash tili', 'Veb dasturlash', 'Ob\'ektga yo\'naltirilgan dasturlash'],
    morphemes: {
      root: 'dastur',
      rootType: 'Ot o\'zak',
      affixes: [
        { text: '-la', type: "so'z yasovchi", meaning: 'fe\'l yasovchi' },
        { text: '-sh', type: "shakl yasovchi", meaning: 'harakat nomi yasovchi' }
      ]
    },
    frequencyRank: 105,
    category: 'it-texnologiya'
  },
  {
    id: 'andisha',
    slug: 'andisha',
    word: 'Andisha',
    wordCyrillic: 'Андиша',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[andisha]',
    origin: 'forscha',
    originDetails: 'Forscha: اندیشه (andīshah) — o\'y, fikr, mulohaza, ehtiyotkorlik, xijolat.',
    definitions: [
      'O\'zgalarga noqulaylik tug\'dirmaslik, ularning ko\'nglini og\'ritmaslik uchun qilinadigan bosiqlik, odobli ehtiyotkorlik va iffat.',
      'Oqibatni o\'ylab ish tutish, mulohazalilik.'
    ],
    examples: [
      {
        quote: "Andishaning oti qo'rqoq emas, u ko'ngil nozikligining va tarbiyaning oliy nishonasidir.",
        author: 'O\'zbek xalq maqoli',
        source: 'Xalq donishmandligi',
        year: '-'
      }
    ],
    synonyms: ['Izza-nafs', 'Iymanuvchanlik', 'Odob', 'Bosiqlik', 'Mulohaza'],
    antonyms: ['Andishasizlik', 'Beboshlik', 'Behayolik', 'Surpatlik'],
    phrases: ['Andisha qilmoq', 'Andishali inson', 'Andisha pardasi'],
    morphemes: {
      root: 'andisha',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 165,
    category: 'adabiy'
  },
  {
    id: 'shijoat',
    slug: 'shijoat',
    word: 'Shijoat',
    wordCyrillic: 'Шижоат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[shijoat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: شجاعة (shajā‘ah) — mardlik, jasurlik, qo\'rqmaslik, qahramonlik.',
    definitions: [
      'Qiyinchiliklar va xavf-xatarlar oldida o\'zini yo\'qotmaydigan, qo\'rqmaydigan mardlik, sabot va botirlik fazilati.',
      'G\'ayrat va jo\'shqin harakatga to\'lalik.'
    ],
    examples: [
      {
        quote: "Jaloliddin Manguberdi shijoati asrlar osha vatan ozodligi uchun kurashning yorqin timsoli bo'lib qoladi.",
        author: 'Maqsud Shayxzoda',
        source: 'Jaloliddin Manguberdi dramasi',
        year: '1944'
      }
    ],
    synonyms: ['Jasorat', 'Mardlik', 'Botirlik', 'Qat\'iyat', 'G\'ayrat'],
    antonyms: ['Qo\'rqoqlik', 'Jur\'atsizlik', 'Zaiflik'],
    phrases: ['Yoshlik shijoati', 'Shijoat ko\'rsatmoq', 'Shijoatli qadam'],
    morphemes: {
      root: 'shijoat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 240,
    category: 'adabiy'
  },
  {
    id: 'tarmoq',
    slug: 'tarmoq',
    word: 'Tarmoq',
    wordCyrillic: 'Тармоқ',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot / IT-termin',
    phonetic: '[tarmoq]',
    origin: 'turkiy',
    originDetails: "Qadimgi turkiy: tar- / tarma- (yoyilmoq, tarqalmoq, shoxlamoq) so'zidan yasalgan sof turkiy so'z.",
    definitions: [
      'Bir-biriga bog\'langan aloqa liniyalari, kompyuterlar yoki qurilmalar tizimi (Internet tarmog\'i, lokal tarmoq).',
      'Biror sohaning har tomonga tarqalgan shoxobchalari yoki bo\'limlari majmui (savdo tarmog\'i, transport tarmog\'i).'
    ],
    examples: [
      {
        quote: "Global tarmoq insoniyat tarixida bilim va axborot almashish tezligini misli ko'rilmagan darajaga ko'tardi.",
        author: 'Raqamli O\'zbekiston sharhi',
        source: 'Axborot texnologiyalari',
        year: '2023'
      }
    ],
    synonyms: ['Net', 'Tizim', 'Shoxobcha', 'Bog\'lanma'],
    antonyms: ['Yakka holat'],
    phrases: ['Ijtimoiy tarmoq', 'Mahalliy tarmoq', 'Tarmoq xavfsizligi'],
    morphemes: {
      root: 'tarma',
      rootType: 'Fe\'l o\'zak',
      affixes: [
        { text: '-q', type: "so'z yasovchi", meaning: 'ot yasovchi qo\'shimcha' }
      ]
    },
    frequencyRank: 65,
    category: 'it-texnologiya'
  },
  {
    id: 'matonat',
    slug: 'matonat',
    word: 'Matonat',
    wordCyrillic: 'Матонат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[matonat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: متانة (matānah) — mustahkamlik, chidamlilik, metin iroda.',
    definitions: [
      'Og\'ir qiyinchiliklar, sinovlar va musibatlarga bardosh bera olish, iroda mustahkamligi va sobitqadamlik.',
      'Metindek bukilmas matonatli xarakter.'
    ],
    examples: [
      {
        quote: "O'zbek xalqining Ikkinchi jahon urushi yillaridagi cheksiz matonati butun dunyoga ma'lum va mashhurdir.",
        author: 'Said Ahmad',
        source: 'Qorako\'z majnun',
        year: '1995'
      }
    ],
    synonyms: ['Bardosh', 'Chidam', 'Sabr-toqat', 'Iroda', 'Sobitlik'],
    antonyms: ['Zaiflik', 'Chidamsizlik', 'Bukilish'],
    phrases: ['Matonat namunasi', 'Matonat bilan yengmoq', 'Matonatli qalb'],
    morphemes: {
      root: 'matonat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 220,
    category: 'adabiy'
  },
  {
    id: 'bardosh',
    slug: 'bardosh',
    word: 'Bardosh',
    wordCyrillic: 'Бардош',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[bardosh]',
    origin: 'forscha',
    originDetails: 'Forscha: برداشت (bardāsht) — ko\'tarish, bardosh qilish, toqat.',
    definitions: [
      'Og\'riq, g\'am-alam yoki og\'ir mehnatga chidash qobiliyati; sabr-toqat.',
      'Ruhiy va jismoniy chidamlilik.'
    ],
    examples: [
      {
        quote: "Tog'lar qanchalik baland bo'lsa, uning toshlariga shamol va qorning bardoshi shunchalik zarurdir.",
        author: 'Asqad Muxtor',
        source: 'Chinor',
        year: '1969'
      }
    ],
    synonyms: ['Sabr', 'Toqat', 'Chidam', 'Matonat'],
    antonyms: ['Bardoshsizlik', 'Toqatsizlik', 'Sabrsizlik'],
    phrases: ['Bardosh bermoq', 'Bardoshi yetmoq', 'Sabr-bardosh'],
    morphemes: {
      root: 'bardosh',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 130,
    category: 'umumiy'
  },
  {
    id: 'oqibat',
    slug: 'oqibat',
    word: 'Oqibat',
    wordCyrillic: 'Оқибат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[oqibat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: عاقبة (‘āqibah) — oxiri, natija, intiho; shuningdek, mehr-oqibat ma\'nosida.',
    definitions: [
      'Biror harakat, hodisa yoki sabab natijasida yuzaga keladigan holat; natija.',
      'Yaqin kishilar o\'rtasidagi mehr, e\'tibor va sadoqat rishtasi (masalan, mehr-oqibat yo\'qolmasin).'
    ],
    examples: [
      {
        quote: "Qarindoshlar orasida oqibat uzilmasin, oqibat insoniy munosabatlarning gavharidir.",
        author: 'O\'tkir Hoshimov',
        source: 'Daftar hoshiyasidagi bitiklar',
        year: '2001'
      }
    ],
    synonyms: ['Natija', 'Samara', 'Xotima', 'Mehr-muhabbat'],
    antonyms: ['Sabab', 'Bemehrlik', 'Begonalashuv'],
    phrases: ['Oqibat qilmoq', 'Oqibatsiz qolmoq', 'Mehr-oqibat'],
    morphemes: {
      root: 'oqibat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 85,
    category: 'umumiy'
  },
  {
    id: 'ilhom',
    slug: 'ilhom',
    word: 'Ilhom',
    wordCyrillic: 'Илҳом',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[ilhom]',
    origin: 'arabcha',
    originDetails: 'Arabcha: إلهام (ilhām) — ko\'ngilga tushgan fikr, vahiylashgan ijodiy jo\'shqinlik.',
    definitions: [
      'Insonning ijodiy qobiliyatini eng yuqori darajada ochib beruvchi, ruhiy ko\'tarinkilik va jo\'shqinlik holati.',
      'Yangi g\'oya yoki asar yaratishga undovchi ichki chaqiriq.'
    ],
    examples: [
      {
        quote: "Qalamim har qachon ilhom parisi qanot qoqqanda eng chiroyli misralarni qog'ozga tushiradi.",
        author: 'Zulfiya',
        source: 'Bahor keldi seni so\'roqlab',
        year: '1970'
      }
    ],
    synonyms: ['Ruhlanish', 'Jo\'shqinlik', 'Zavq', 'Ijodiy shavq'],
    antonyms: ['So\'lg\'inlik', 'G\'aflat', 'Tushkunlik'],
    phrases: ['Ilhom parisi', 'Ilhom olmoq', 'Ilhom manbai'],
    morphemes: {
      root: 'ilhom',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 110,
    category: 'adabiy'
  },
  {
    id: 'samaradorlik',
    slug: 'samaradorlik',
    word: 'Samaradorlik',
    wordCyrillic: 'Самарадорлик',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[samaradorlik]',
    origin: 'arabcha',
    originDetails: 'Arabcha: ثمرة (samarah — meva, foyda) + forscha: -dor + turkiy: -lik.',
    definitions: [
      'Qilingan mehnat, sarflangan vaqt va resurslarga nisbatan olingan ijobiy natijaning yuqori darajasi; unumdorlik.',
      'Foydalilik koeffitsienti, unumli natija bera olish xususiyati.'
    ],
    examples: [
      {
        quote: "Ishda samaradorlikni oshirish uchun zamonaviy texnologiyalarni to'g'ri rejalashtirish lozim.",
        author: 'Iqtisodiy tahlil',
        source: 'Boshqaruv san\'ati',
        year: '2023'
      }
    ],
    synonyms: ['Unumdorlik', 'Hosildorlik', 'Foydalilik', 'Effektivlik'],
    antonyms: ['Samarasizlik', 'Besamarlik', 'Isrof'],
    phrases: ['Ish samaradorligi', 'Yuqori samaradorlikka erishmoq'],
    morphemes: {
      root: 'samara',
      rootType: 'Ot o\'zak',
      affixes: [
        { text: '-dor', type: "so'z yasovchi", meaning: 'ega bo\'lish sifati yasovchi' },
        { text: '-lik', type: "so'z yasovchi", meaning: 'mavhum ot yasovchi' }
      ]
    },
    frequencyRank: 140,
    category: 'it-texnologiya'
  },
  {
    id: 'nazokat',
    slug: 'nazokat',
    word: 'Nazokat',
    wordCyrillic: 'Назокат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[nazokat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: نزاهة / نزاكة (nazākah) — noziklik, xushfe\'llik, nafislik.',
    definitions: [
      'Muomala, harakat yoki ko\'rinishdagi o\'ta nafis, odobli, yoqimli va nozik holat; nafislik.',
      'Qo\'pollikdan yiroq xushmuomalalik.'
    ],
    examples: [
      {
        quote: "Sharqona nazokat ayol qizlarimizning eng bebaho va ko'rkam ziynatidir.",
        author: 'Cho\'lpon',
        source: 'Qor qo\'ynida lola',
        year: '1924'
      }
    ],
    synonyms: ['Nafislik', 'Latofat', 'Muloyimlik', 'Zebolik'],
    antonyms: ['Qo\'pollik', 'Dag\'allik', 'Surso\'zlik'],
    phrases: ['Nazokat bilan javob bermoq', 'Sharqona nazokat'],
    morphemes: {
      root: 'nazokat',
      rootType: 'Tub so\'z',
      affixes: []
    },
    frequencyRank: 205,
    category: 'adabiy'
  },
  {
    id: 'mehr',
    slug: 'mehr',
    word: 'Mehr',
    wordCyrillic: 'Меҳр',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[mehr]',
    origin: 'arabcha',
    originDetails: "Arabcha: مهر / مودة — iliq muhabbat, samimiy mehr-shafqat, dilkashlik, ko'ngil yaqinligi.",
    definitions: [
      'Inson qalbida boshqalarga nisbatan paydo bo‘ladigan eng samimiy, beg‘araz muhabbat, g‘amxo‘rlik va iliqlik tuyg‘usi.',
      'Ona yoki yaqin kishining ko‘ngil tafti, iliq munosabati.'
    ],
    examples: [
      {
        quote: "Mehr qolur, muhabbat qolur, dunyoda yaxshi nom qolur.",
        author: 'Erkin Vohidov',
        source: 'Saylanma asarlar',
        year: '1985'
      }
    ],
    synonyms: ['Shafqat', 'Muhabbat', 'Iliqlik', 'G\'amxo\'rlik', 'Samimiyat'],
    antonyms: ['Qahr', 'Nafrat', 'Sovuqqonlik', 'Bemehrlik'],
    phrases: ['Mehr ko\'rguzmoq', 'Mehr-oqibatli bo\'lmoq', 'Mehr ko\'zda'],
    morphemes: {
      root: 'mehr',
      rootType: 'Tub ot',
      affixes: []
    },
    frequencyRank: 45,
    category: 'falsafiy'
  },
  {
    id: 'sabr',
    slug: 'sabr',
    word: 'Sabr',
    wordCyrillic: 'Сабр',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[sabr]',
    origin: 'arabcha',
    originDetails: 'Arabcha: صبر (ṣabr) — chidamlilik, metin iroda, qiyinchiliklarga bardosh berish fazilati.',
    definitions: [
      'Boshga tushgan qiyinchilik, sinov yoki mashaqqatlarga shikoyatsiz, iroda va bosiqlik bilan bardosh berish fazilati.',
      'Natijaga erishish yo‘lidagi sabr-toqat, shoshqaloqlik qilmaslik.'
    ],
    examples: [
      {
        quote: "Sabr qilgan kishi oxir-oqibat o'z murod-maqsadiga yetadi.",
        author: 'Alisher Navoiy',
        source: 'Mahbub ul-qulub',
        year: '1500'
      }
    ],
    synonyms: ['Chidam', 'Bardosh', 'Matonat', 'Toqat', 'Bosiqlik'],
    antonyms: ['Sabrsizlik', 'Toqatsizlik', 'Shoshqaloqlik'],
    phrases: ['Sabr tagi — sariq oltin', 'Sabr kosasi to\'lmoq', 'Sabr-qanoat qilmoq'],
    morphemes: {
      root: 'sabr',
      rootType: 'Tub o\'zak',
      affixes: []
    },
    frequencyRank: 50,
    category: 'falsafiy'
  },
  {
    id: 'zakovat',
    slug: 'zakovat',
    word: 'Zakovat',
    wordCyrillic: 'Заковат',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[zakovat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: ذكاء (dhakā’) — o‘tkir aql, ziyraklik, zehn, yuksak intellektual salohiyat.',
    definitions: [
      'Inson aql-idrokining teranligi, voqelikni chuqur va tez tushunish, mantiqiy xulosa chiqarish yuksak qobiliyati; zehn.',
      'O‘tkir tafakkur va donishmandlik.'
    ],
    examples: [
      {
        quote: "Inson zakovati bilan har qanday qorong'u jumboq yechimini topadi.",
        author: 'Abdulla Avloniy',
        source: 'Turkiy Guliston',
        year: '1913'
      }
    ],
    synonyms: ['Idrok', 'Zehn', 'Fahm', 'Donolik', 'Aql-farosat'],
    antonyms: ['Nodonlik', 'Kallakesarlik', 'G\'o\'rlik'],
    phrases: ['Zakovat sohibi', 'Zakovat intellektual o\'yini', 'Tafakkur va zakovat'],
    morphemes: {
      root: 'zakovat',
      rootType: 'Arabiy o\'zak',
      affixes: []
    },
    frequencyRank: 115,
    category: 'adabiy'
  },
  {
    id: 'istiqlol',
    slug: 'istiqlol',
    word: 'Istiqlol',
    wordCyrillic: 'Истиқлол',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[istiqlol]',
    origin: 'arabcha',
    originDetails: 'Arabcha: استقلال (istiqlāl) — mustaqillik, o‘z erkiga ega bo‘lish, ozodlik, suverenitet.',
    definitions: [
      'Xalq yoki davlatning o‘z taqdirini o‘zi erkin belgilashi, mustaqillik va ozodlikka erishgan holati.',
      'Yuksak ma’naviy va siyosiy erkinlik.'
    ],
    examples: [
      {
        quote: "Istiqlol — millatning o'z qadr-qimmati, o'zligini anglashi va saqlab qolishidir.",
        author: 'Abdulla Oripov',
        source: 'Istiqlol nafasi',
        year: '1992'
      }
    ],
    synonyms: ['Mustaqillik', 'Ozodlik', 'Erk', 'Suverenitet'],
    antonyms: ['Qaramlik', 'Mustamlakachilik', 'Tobe-lik'],
    phrases: ['Istiqlol maydoni', 'Istiqlol ne\'mati', 'Istiqlol yo\'li'],
    morphemes: {
      root: 'istiqlol',
      rootType: 'Arabcha istif\'ol vaznidagi o\'zak',
      affixes: []
    },
    frequencyRank: 88,
    category: 'umumiy'
  },
  {
    id: 'samimiyat',
    slug: 'samimiyat',
    word: 'Samimiyat',
    wordCyrillic: 'Самимият',
    partOfSpeech: 'ot',
    partOfSpeechNameUz: 'Ot',
    phonetic: '[samimiyat]',
    origin: 'arabcha',
    originDetails: 'Arabcha: صميمية (ṣamīmiyyah) — dildan chiqqanlik, soxtalikdan yiroqlik, oqko‘ngillik.',
    definitions: [
      'Inson fe’l-atvori va munosabatlaridagi soxtalikdan, riyodan xoli bo‘lgan toza, dildan va ochiqko‘ngil holat.',
      'Haqiqiy dilkashlik va ishonchlilik.'
    ],
    examples: [
      {
        quote: "Odamlar orasidagi eng mustahkam ko'prik — bu soxtalikdan xoli bo'lgan samimiyatdir.",
        author: 'Oybek',
        source: 'Qutlug\' qon',
        year: '1940'
      }
    ],
    synonyms: ['Ochiqko\'ngillik', 'Beg\'arazlik', 'Halollik', 'Sofdillik'],
    antonyms: ['Riyo', 'Ikkizuzlamachilik', 'Soxtalik', 'Munofiqlik'],
    phrases: ['Samimiy suhbat', 'Samimiyat ila qaramoq', 'Qalb samimiyati'],
    morphemes: {
      root: 'samimiy',
      rootType: 'Arabiy sifat',
      affixes: [{ text: '-at', type: "so'z yasovchi", meaning: 'mavhum ot yasovchi' }]
    },
    frequencyRank: 92,
    category: 'falsafiy'
  }
];
