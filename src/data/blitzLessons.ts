import { VideoLesson } from '../types';

export const BLITZ_LESSONS: VideoLesson[] = [
  // ==========================================
  // --- A1 BOSQICHI (GRUNDSTUFE 1) ---
  // ==========================================
  {
    id: 'blitz-a1-1',
    title: 'Deutsche Aussprache & Alphabet',
    titleUz: "1-Dars: Nemis tili alifbosi, tovushlar va to'g'ri o'qish qoidalari",
    level: 'A1',
    duration: '20:00',
    description: "Blitz O'quv Markazi noldan nemis tili kursi: Nemis alifbosidagi 26 ta asosiy harf, 3 ta umlaut (ä, ö, ü) va ß (Eszett) harflarining talaffuzi hamda diftonglar (ei, ie, eu, au) o'qilish qoidalari.",
    keyTopics: [
      "Nemis alifbosi va harflar nomi",
      "Umlautlar: Ä, Ö, Ü qanday talaffuz qilinadi",
      "Diftonglar: ei [ay], ie [i:], eu/äu [oy]",
      "Undosh birikmalari: sch [sh], ch [x/x'], st/sp"
    ],
    vocabularyList: [
      { german: 'Guten Tag', uzbek: 'Xayrli kun' },
      { german: 'Guten Morgen', uzbek: 'Xayrli tong' },
      { german: 'Danke schön', uzbek: 'Katta rahmat' },
      { german: 'Bitte sehr', uzbek: 'Iltimos / Arzimaydi' },
      { german: 'Auf Wiedersehen', uzbek: "Ko'rishguncha xayr" },
      { german: 'Tschüss', uzbek: 'Xayr (norasmiy)' }
    ],
    interactiveSlides: [
      {
        title: "1. Nemis alifbosi va o'ziga xos tovushlar",
        germanText: "Das deutsche Alphabet hat 26 Standardbuchstaben und 4 Sonderzeichen: ä, ö, ü, ß.",
        uzbekText: "Nemis alifbosida 26 ta asosiy harf va 4 ta maxsus belgi mavjud: ä, ö, ü hamda ß (eszett).",
        grammarNote: "Nemis tilida barcha Otlar (Nomen) istisnosiz bosh harf bilan yoziladi! Masalan: das Buch, der Tisch.",
        tips: [
          "ei birikmasi har doim [ay] deb o'qiladi (mein, sein)",
          "ie birikmasi har doim cho'ziq [i:] deb o'qiladi (sie, wie)",
          "sch birikmasi [sh] deb o'qiladi (Schule, schön)"
        ]
      },
      {
        title: "2. Salomlashish va odob so'zlari",
        germanText: "Hallo! Guten Morgen! Wie geht es Ihnen? - Danke, sehr gut!",
        uzbekText: "Salom! Xayrli tong! Sizning ahvollaringiz qanday? - Rahmat, juda yaxshi!",
        grammarNote: "Rasmiy muomalada 'Sie' (Siz) va 'Ihnen' (Sizga) ishlatiladi va doim bosh harf bilan yoziladi.",
        tips: [
          "Do'stlarga: 'Wie geht's dir?' (Ahvollaring qanday?)",
          "Kattalarga: 'Wie geht es Ihnen?' (Ahvolingiz qanday?)"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a1-1-1',
        type: 'choice',
        questionUz: "Nemis tilida 'ei' diftongi (masalan: mein, sein) qanday talaffuz qilinadi?",
        options: ["[ay]", "[ey]", "[i:]", "[e]"],
        correctAnswer: "[ay]",
        explanation: "To'g'ri! 'ei' birikmasi nemis tilida har doim [ay] deb o'qiladi (mein = mayn)."
      },
      {
        id: 'ex-a1-1-2',
        type: 'blank',
        questionUz: "Bo'sh joyga to'g'ri odob so'zini qo'ying: 'Danke schön! - Bitte ___!' (Arzimaydi)",
        germanSentence: "Danke schön! - Bitte ___!",
        options: ["sehr", "nein", "gut"],
        correctAnswer: "sehr",
        explanation: "To'g'ri! 'Bitte sehr' yoki 'Bitte schön' — 'Arzimaydi' ma'nosini bildiradi."
      },
      {
        id: 'ex-a1-1-3',
        type: 'order',
        questionUz: "So'zlarni to'g'ri tartibda joylashtiring: 'Guten Tag, wie geht es Ihnen?'",
        wordsToOrder: ["Guten", "Tag,", "wie", "geht", "es", "Ihnen?"],
        correctAnswer: "Guten Tag, wie geht es Ihnen?",
        explanation: "Ajoyib! Bu rasmiy salomlashish va hol-ahvol so'rash jumlasi."
      }
    ]
  },
  {
    id: 'blitz-a1-2',
    title: 'Die Artikel: der, die, das',
    titleUz: "2-Dars: Nemis tilida artikllar (der, die, das) va aniqlash qoidalari",
    level: 'A1',
    duration: '22:15',
    description: "Nemis tilining eng muhim poydevori — uchta jins artikllari. Qaysi qo'shimchalar orqali artikllarni osongina aniqlash mumkin (-ung, -heit, -keit, -chen, -er) va jins qoidalari.",
    keyTopics: [
      "Erkak jinsi (maskulin): der",
      "Ayol jinsi (feminin): die",
      "O'rta jins (neutral): das",
      "Artikl aniqlovchi qo'shimchalar (-ung, -keit, -heit har doim 'die')"
    ],
    vocabularyList: [
      { german: 'der Tisch', uzbek: 'stol (erkak jinsi)' },
      { german: 'die Sonne', uzbek: 'quyosh (ayol jinsi)' },
      { german: 'das Buch', uzbek: "kitob (o'rta jins)" },
      { german: 'die Zeitung', uzbek: 'gazeta (-ung = die)' },
      { german: 'das Mädchen', uzbek: "qizaloq (-chen = das)" }
    ],
    interactiveSlides: [
      {
        title: "1. Jins artikllari qoidasi",
        germanText: "der Mann (maskulin), die Frau (feminin), das Kind (neutral).",
        uzbekText: "Erkak (der), ayol (die), bola (das). Har bir ot o'zining artikli bilan birga yodlanadi.",
        grammarNote: "Nemis tilidagi jins biologik jinsga har doim ham to'g'ri kelavermaydi. Masalan, 'das Mädchen' (qizaloq) o'rta jinsdir, chunki -chen kichraytirish qo'shimchasi har doim 'das' oladi.",
        tips: [
          "-ung, -heit, -keit, -schaft, -tät bilan tugasa -> DIE",
          "-chen, -lein, -ment, -um bilan tugasa -> DAS",
          "-er (kasblar), kunlar, oylar, fasllar -> DER"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a1-2-1',
        type: 'choice',
        questionUz: "Nemis tilida -ung, -heit, -keit qo'shimchalari bilan tugaydigan otlarning artikli qaysi?",
        options: ["die", "der", "das"],
        correctAnswer: "die",
        explanation: "Ofarin! -ung, -heit, -keit, -schaft, -tät bilan tugaydigan barcha otlar 100% 'die' (ayol jinsi) artiklini oladi."
      },
      {
        id: 'ex-a1-2-2',
        type: 'blank',
        questionUz: "Bo'sh joyga to'g'ri artiklni qo'ying: '___ Mädchen liest ein Buch.'",
        germanSentence: "___ Mädchen liest ein Buch.",
        options: ["Das", "Die", "Der"],
        correctAnswer: "Das",
        explanation: "Barakalla! 'das Mädchen' o'rta jinsdir, chunki -chen qo'shimchasi o'rta jins beradi."
      },
      {
        id: 'ex-a1-2-3',
        type: 'order',
        questionUz: "So'zlarni to'g'ri tering: 'Das Buch liegt auf dem Tisch.'",
        wordsToOrder: ["Das", "Buch", "liegt", "auf", "dem", "Tisch."],
        correctAnswer: "Das Buch liegt auf dem Tisch.",
        explanation: "Juda to'g'ri! 'Kitob stol ustida yotibdi'."
      }
    ]
  },
  {
    id: 'blitz-a1-3',
    title: 'Verben im Präsens konjugieren',
    titleUz: "3-Dars: Fe'llarning hozirgi zamonda tuslanishi (Präsens)",
    level: 'A1',
    duration: '25:30',
    description: "Hozirgi zamonda fe'l o'zaklariga qo'shiladigan shaxs qo'shimchalari: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. Kuchli fe'llarda unli almashishi (a->ä, e->i).",
    keyTopics: [
      "Muntazam fe'llar (regelmäßige Verben)",
      "O'zak unlisi almashuvchi fe'llar (fahren, sprechen)",
      "Yordamchi fe'llar: sein va haben",
      "Oddiy darak va so'roq gaplar yasash"
    ],
    vocabularyList: [
      { german: 'lernen', uzbek: "o'rganmoq (ich lerne, du lernst)" },
      { german: 'wohnen', uzbek: 'yashamoq (ich wohne)' },
      { german: 'sprechen', uzbek: 'gapirmoq (du sprichst, er spricht)' },
      { german: 'arbeiten', uzbek: 'ishlamoq (du arbeitest)' },
      { german: 'sein', uzbek: "bo'lmoq (ich bin, du bist, er ist)" }
    ],
    interactiveSlides: [
      {
        title: "1. Hozirgi zamon qo'shimchalari",
        germanText: "ich lerne, du lernst, er/sie/es lernt, wir lernen, ihr lernt, sie/Sie lernen.",
        uzbekText: "Men o'rganaman, sen o'rganasan, u o'rganadi, biz o'rganamiz, sizlar o'rganasiz, ular o'rganadilar.",
        grammarNote: "Nemis tilida darak gaplarda tuslangan fe'l HAR DOIM 2-o'rinda turadi!",
        tips: [
          "Agar gap 'Heute' (bugun) bilan boshlansa ham: 'Heute lerne ich Deutsch.' (Fe'l 2-o'rinda)",
          "sein fe'li: ich bin, du bist, er ist, wir sind, ihr seid, sie sind"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a1-3-1',
        type: 'choice',
        questionUz: "Hozirgi zamonda 'du' olmoshida muntazam fe'llarga qanday qo'shimcha qo'shiladi?",
        options: ["-st", "-t", "-e", "-en"],
        correctAnswer: "-st",
        explanation: "To'g'ri! du lernst, du machst, du kommst."
      },
      {
        id: 'ex-a1-3-2',
        type: 'blank',
        questionUz: "Bo'sh joyga 'lernen' fe'lini to'g'ri tuslab qo'ying: 'Er ___ jeden Tag Deutsch.'",
        germanSentence: "Er ___ jeden Tag Deutsch.",
        options: ["lernt", "lerne", "lernst"],
        correctAnswer: "lernt",
        explanation: "To'g'ri! 'er/sie/es' uchun -t qo'shimchasi qo'shiladi: er lernt."
      },
      {
        id: 'ex-a1-3-3',
        type: 'order',
        questionUz: "Gapni to'g'ri tering (fe'l 2-o'rinda!): 'Heute lerne ich fleißig Deutsch.'",
        wordsToOrder: ["Heute", "lerne", "ich", "fleißig", "Deutsch."],
        correctAnswer: "Heute lerne ich fleißig Deutsch.",
        explanation: "Qoyil! Gap boshqa so'z bilan boshlansa ham, fe'l albatta 2-o'rinda keladi."
      }
    ]
  },
  {
    id: 'blitz-a1-4',
    title: 'Der Akkusativ im Deutschen',
    titleUz: "4-Dars: Akkusativ kelishigi — kimni? nimani?",
    level: 'A1',
    duration: '21:05',
    description: "Akkusativ (tushum kelishigi) nemis tilidagi eng asosiy kelishiklardan biri. Faqat erkak jinsi (der -> den, ein -> einen) o'zgarishi va Akkusativ talab qiluvchi fe'llar hamda predloglar (für, ohne, durch, gegen, um).",
    keyTopics: [
      "Wen? Was? (Kimni? Nimani?) savollari",
      "Erkak jinsi o'zgarishi: der -> den, ein -> einen",
      "Ayol va o'rta jins o'zgarmay qolishi (die, das)",
      "Akkusativ predloglari: FUDOG (für, um, durch, ohne, gegen)"
    ],
    vocabularyList: [
      { german: 'Ich habe einen Hund.', uzbek: 'Mening itim bor (der Hund -> einen Hund).' },
      { german: 'Er sucht den Schlüssel.', uzbek: "U kalitni qidirmoqda (der Schlüssel -> den)." },
      { german: 'ohne dich', uzbek: 'sensiz (ohne + Akkusativ)' },
      { german: 'für meine Mutter', uzbek: 'onam uchun (für + Akkusativ)' }
    ],
    interactiveSlides: [
      {
        title: "1. Akkusativda faqat erkak jinsi o'zgaradi!",
        germanText: "der Tisch -> den Tisch, ein Tisch -> einen Tisch. Die Frau va das Kind o'zgarmaydi.",
        uzbekText: "Stol (der) tushum kelishigida 'den' bo'ladi. Ayol va o'rta jins artikli o'zgarmaydi.",
        grammarNote: "haben (bor bo'lmoq), brauchen (muhtoj bo'lmoq), sehen (ko'rmoq), kaufen (sotib olmoq) fe'llari Akkusativ talab qiladi.",
        tips: [
          "Ich habe einen Bruder. (Mening akam bor - der Bruder -> einen)",
          "Ich habe eine Schwester. (Mening singlim bor - die Schwester -> eine)"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a1-4-1',
        type: 'choice',
        questionUz: "Akkusativ (tushum) kelishigida qaysi jins artikli o'zgaradi?",
        options: ["Faqat erkak jinsi (der -> den)", "Faqat ayol jinsi (die -> der)", "Barcha jinslar"],
        correctAnswer: "Faqat erkak jinsi (der -> den)",
        explanation: "To'g'ri! Akkusativda faqat der -> den, ein -> einen bo'ladi. die va das esa o'zgarmaydi."
      },
      {
        id: 'ex-a1-4-2',
        type: 'blank',
        questionUz: "To'g'ri artiklni tanlang: 'Ich habe ___ neuen Computer (der Computer).'",
        germanSentence: "Ich habe ___ neuen Computer.",
        options: ["einen", "ein", "eine"],
        correctAnswer: "einen",
        explanation: "Barakalla! 'der Computer' erkak jinsi bo'lgani uchun haben + Akkusativ: 'einen'."
      },
      {
        id: 'ex-a1-4-3',
        type: 'order',
        questionUz: "Gapni to'g'ri tuzing: 'Er sucht den verlorenen Schlüssel.'",
        wordsToOrder: ["Er", "sucht", "den", "verlorenen", "Schlüssel."],
        correctAnswer: "Er sucht den verlorenen Schlüssel.",
        explanation: "Ajoyib! 'U yo'qolgan kalitni qidirmoqda'."
      }
    ]
  },
  // ==========================================
  // --- A2 BOSQICHI (GRUNDSTUFE 2) ---
  // ==========================================
  {
    id: 'blitz-a2-1',
    title: 'Der Dativ & Dativ-Präpositionen',
    titleUz: "5-Dars: Dativ kelishigi va Dativ predloglari (mit, nach, bei, zu)",
    level: 'A2',
    duration: '27:45',
    description: "Dativ (jo'nalish/o'rin-payt) kelishigi qoidalari. der -> dem, die -> der, das -> dem, die (Pl.) -> den + n. Dativ talab qiluvchi doimiy predloglar va fe'llar (helfen, danken, gefallen).",
    keyTopics: [
      "Wem? Wo? (Kimga? Qayerda?) savollari",
      "Artikllarning Dativdagi shakllari: dem, der, dem, den (+n)",
      "Dativ predloglari: aus, bei, mit, nach, seit, von, zu",
      "Dativ fe'llari: helfen, danken, antworten, gefallen"
    ],
    vocabularyList: [
      { german: 'Ich helfe dem Mann.', uzbek: 'Men kishiga yordam beryapman.' },
      { german: 'mit dem Bus', uzbek: 'avtobus bilan' },
      { german: 'nach der Schule', uzbek: 'maktabdan keyin' },
      { german: 'bei meinen Eltern', uzbek: 'ota-onamnikida' }
    ],
    interactiveSlides: [
      {
        title: "1. Dativ kelishigi formulasi",
        germanText: "der -> dem, die -> der, das -> dem, die (Plural) -> den + n.",
        uzbekText: "Erkak va o'rta jins 'dem', ayol jinsi 'der', ko'plik 'den (+n)' oladi.",
        grammarNote: "aus, bei, mit, nach, seit, von, zu predloglaridan keyin HAR DOIM Dativ keladi!",
        tips: [
          "mit dem Zug (poyezd bilan - der Zug -> dem)",
          "nach der Arbeit (ishdan keyin - die Arbeit -> der)"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a2-1-1',
        type: 'choice',
        questionUz: "Qaysi predloglardan keyin HAR DOIM Dativ kelishi shart?",
        options: ["aus, bei, mit, nach, seit, von, zu", "für, um, durch, ohne, gegen", "an, auf, in, über"],
        correctAnswer: "aus, bei, mit, nach, seit, von, zu",
        explanation: "Mukammal! Ushbu predloglar har doim Dativ talab qiladi."
      },
      {
        id: 'ex-a2-1-2',
        type: 'blank',
        questionUz: "Bo'sh joyga to'g'ri artiklni qo'ying: 'Ich helfe ___ alten Frau (die Frau).'",
        germanSentence: "Ich helfe ___ alten Frau.",
        options: ["der", "die", "dem"],
        correctAnswer: "der",
        explanation: "To'g'ri! helfen fe'li Dativ talab qiladi va die Frau -> der Frau bo'ladi."
      },
      {
        id: 'ex-a2-1-3',
        type: 'order',
        questionUz: "Gapni tartib bilan tuzing: 'Wir fahren mit dem Bus zur Schule.'",
        wordsToOrder: ["Wir", "fahren", "mit", "dem", "Bus", "zur", "Schule."],
        correctAnswer: "Wir fahren mit dem Bus zur Schule.",
        explanation: "Barakalla! 'Biz avtobusda maktabga boryapmiz'."
      }
    ]
  },
  {
    id: 'blitz-a2-2',
    title: 'Das Perfekt: haben oder sein?',
    titleUz: "6-Dars: Perfekt o'tgan zamoni — haben yoki sein tanlash",
    level: 'A2',
    duration: '29:10',
    description: "Nemis so'zlashuv tilidagi eng ko'p ishlatiladigan o'tgan zamon formasi — Perfekt. Qachon 'haben' va qachon 'sein' ishlatiladi? Partizip II yasash qoidalari (ge- -t va ge- -en).",
    keyTopics: [
      "Perfekt formulasi: haben/sein + Partizip II (gap oxirida)",
      "Harakat va holat o'zgarishida 'sein' (gehen, fahren, aufstehen)",
      "Qolgan barcha holatlarda 'haben'",
      "Ajraluvchi fe'llarda Partizip II (aufgestanden, eingekauft)"
    ],
    vocabularyList: [
      { german: 'Ich habe Deutsch gelernt.', uzbek: "Men nemis tilini o'rgandim." },
      { german: 'Er ist nach Berlin gefahren.', uzbek: 'U Berlinga ketdi (harakat = sein).' },
      { german: 'Wir sind zu Hause geblieben.', uzbek: 'Biz uyda qoldik (bleiben = sein).' },
      { german: 'Hast du gefrühstückt?', uzbek: 'Nonushta qildingmi?' }
    ],
    interactiveSlides: [
      {
        title: "1. Perfekt qoidasi va gap tuzilishi",
        germanText: "Subjekt + haben/sein (2-o'rinda) + ... + Partizip II (eng oxirida).",
        uzbekText: "Ega + yordamchi fe'l (haben/sein) + to'ldiruvchilar + asosiy fe'lning Partizip II shakli gap oxirida keladi.",
        grammarNote: "A nuqtadan B nuqtaga harakat bildirilganda yoki holat o'zgarganda 'sein' tanlanadi.",
        tips: [
          "Ich bin nach Deutschland geflogen. (Uchdim = sein)",
          "Ich habe gestern ein Buch gelesen. (O'qidim = haben)"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-a2-2-1',
        type: 'choice',
        questionUz: "Harakat fe'llari (gehen, fahren, fliegen) Perfektda qaysi yordamchi fe'l bilan keladi?",
        options: ["sein", "haben", "werden"],
        correctAnswer: "sein",
        explanation: "To'g'ri! Joy o'zgarishi va harakat fe'llari 'sein' oladi (ich bin gefahren)."
      },
      {
        id: 'ex-a2-2-2',
        type: 'blank',
        questionUz: "To'g'ri fe'lni tanlang: 'Gestern ___ ich nach Samarkand gefahren.'",
        germanSentence: "Gestern ___ ich nach Samarkand gefahren.",
        options: ["bin", "habe", "ist"],
        correctAnswer: "bin",
        explanation: "Ofarin! 'ich bin nach Samarkand gefahren'."
      },
      {
        id: 'ex-a2-2-3',
        type: 'order',
        questionUz: "Tartiblang: 'Ich habe gestern ein Buch gelesen.'",
        wordsToOrder: ["Ich", "habe", "gestern", "ein", "Buch", "gelesen."],
        correctAnswer: "Ich habe gestern ein Buch gelesen.",
        explanation: "Juda to'g'ri! 'Partizip II' har doim gapning eng oxirida turadi."
      }
    ]
  },
  // ==========================================
  // --- B1 BOSQICHI (MITTELSTUFE 1) ---
  // ==========================================
  {
    id: 'blitz-b1-1',
    title: 'Nebensätze: weil, dass, obwohl, wenn',
    titleUz: "7-Dars: Ergash gaplar — fe'lning oxiriga surilish qoidasi",
    level: 'B1',
    duration: '31:20',
    description: "Goethe B1 imtihoni uchun eng muhim grammatik mavzu. Bog'lovchilar (weil, dass, obwohl, wenn, als) qatnashgan gaplarda tuslangan fe'l gapning eng oxiriga borishi.",
    keyTopics: [
      "Hauptsatz (bosh gap) va Nebensatz (ergash gap)",
      "Kausal: weil (chunki), da (chunki/modomiki)",
      "Konzessiv: obwohl (garchi ... bo'lsa ham)",
      "Konditional: wenn (agar / -sa)"
    ],
    vocabularyList: [
      { german: 'Ich lerne, weil ich in Deutschland studieren will.', uzbek: "Men o'rganmoqdaman, chunki Germaniyada o'qishni istayman." },
      { german: 'Obwohl es regnet, gehen wir spazieren.', uzbek: "Yomg'ir yog'ayotganiga qaramay, biz sayrga chiqyapmiz." },
      { german: 'Ich weiß, dass du Recht hast.', uzbek: "Bilamanki, sen haqsanning." }
    ],
    interactiveSlides: [
      {
        title: "1. Ergash gaplarda fe'l oxiriga boradi",
        germanText: "Weil ich Deutsch lernen will, besuche ich den Blitz Sprachkurs.",
        uzbekText: "Nemis tilini o'rganishni istaganim sababli, men Blitz til kursiga qatnayman.",
        grammarNote: "weil, dass, obwohl, wenn, als bog'lovchilari tuslangan fe'lni gapning oxiriga suradi!",
        tips: [
          "Bosh gap birinchi kelsa: Ich lerne Deutsch, weil es interessant ist.",
          "Ergash gap birinchi kelsa, bosh gap fe'l bilan boshlanadi: Weil es regnet, bleibe ich zu Hause."
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-b1-1-1',
        type: 'choice',
        questionUz: "'weil' yoki 'dass' ergash gaplarida tuslangan fe'l qaysi o'rinda turadi?",
        options: ["Gapning eng oxirida", "2-o'rinda", "1-o'rinda"],
        correctAnswer: "Gapning eng oxirida",
        explanation: "To'g'ri! Nebensatz (ergash gap)da tuslangan fe'l eng oxirgi o'ringa boradi."
      },
      {
        id: 'ex-b1-1-2',
        type: 'blank',
        questionUz: "Bo'sh joyga to'g'ri fe'l shaklini qo'ying: 'Ich bleibe zu Hause, weil es heute stark ___.'",
        germanSentence: "Ich bleibe zu Hause, weil es heute stark ___.",
        options: ["regnet", "regnen", "geregnet"],
        correctAnswer: "regnet",
        explanation: "Barakalla! Fe'l tuslangan holda gap oxirida keladi: 'regnet'."
      },
      {
        id: 'ex-b1-1-3',
        type: 'order',
        questionUz: "Tuzing: 'Ich weiß, dass du fleißig Deutsch lernst.'",
        wordsToOrder: ["Ich", "weiß,", "dass", "du", "fleißig", "Deutsch", "lernst."],
        correctAnswer: "Ich weiß, dass du fleißig Deutsch lernst.",
        explanation: "Mukammal ergash gap tuzilishi!"
      }
    ]
  },
  // ==========================================
  // --- B2 BOSQICHI (MITTELSTUFE 2) ---
  // ==========================================
  {
    id: 'blitz-b2-1',
    title: 'Das Passiv im Deutschen',
    titleUz: "8-Dars: Majhul nisbat (Passiv) va uning barcha zamonlari",
    level: 'B2',
    duration: '34:40',
    description: "B2 darajasi va TestDaF ilmiy matnlari uchun hal qiluvchi mavzu: Vorgangspassiv (werden + Partizip II) va Zustandspassiv (sein + Partizip II). Barcha zamonlarda qo'llanilishi.",
    keyTopics: [
      "Vorgangspassiv: jarayon majhulligi (wird gebaut)",
      "Zustandspassiv: natija majhulligi (ist gebaut)",
      "Präteritum va Perfektda Passiv yasash",
      "Passiversatzformen (man, sich lassen, -bar)"
    ],
    vocabularyList: [
      { german: 'Das Haus wird gebaut.', uzbek: 'Uy qurilmoqda (jarayon).' },
      { german: 'Das Fenster ist geöffnet.', uzbek: 'Deraza ochiq holatda (natija).' },
      { german: 'Der Brief wurde gestern abgeschickt.', uzbek: "Xat kecha jo'natildi." },
      { german: 'Das Problem lässt sich leicht lösen.', uzbek: "Muammoni oson yechsa bo'ladi." }
    ],
    interactiveSlides: [
      {
        title: "1. Vorgangspassiv: werden + Partizip II",
        germanText: "Der Mechaniker repariert das Auto -> Das Auto wird vom Mechaniker repariert.",
        uzbekText: "Mexanik mashinani ta'mirlayapti -> Mashina mexanik tomonidan ta'mirlanmoqda.",
        grammarNote: "Harakatni bajaruvchi shaxs 'von + Dativ' yoki vosita 'durch + Akkusativ' orqali ko'rsatiladi.",
        tips: [
          "Präsens: wird gemacht",
          "Präteritum: wurde gemacht",
          "Perfekt: ist gemacht worden"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-b2-1-1',
        type: 'choice',
        questionUz: "Vorgangspassiv (jarayon majhulligi) qaysi formula orqali yasaladi?",
        options: ["werden + Partizip II", "haben + Partizip II", "sein + Infinitiv"],
        correctAnswer: "werden + Partizip II",
        explanation: "To'g'ri! Masalan: 'Das Buch wird gelesen'."
      },
      {
        id: 'ex-b2-1-2',
        type: 'blank',
        questionUz: "O'tgan zamon Passiv formasini qo'ying: 'Der Brief ___ gestern geschrieben.' (Präteritum)",
        germanSentence: "Der Brief ___ gestern geschrieben.",
        options: ["wurde", "wird", "worden"],
        correctAnswer: "wurde",
        explanation: "Ofarin! Präteritum Passivda 'wurde' ishlatiladi."
      },
      {
        id: 'ex-b2-1-3',
        type: 'order',
        questionUz: "Tuzing: 'Das Problem wurde erfolgreich gelöst.'",
        wordsToOrder: ["Das", "Problem", "wurde", "erfolgreich", "gelöst."],
        correctAnswer: "Das Problem wurde erfolgreich gelöst.",
        explanation: "Mukammal B2 Passiv gapi!"
      }
    ]
  },
  // ==========================================
  // --- C1 BOSQICHI (OBERSTUFE 1) ---
  // ==========================================
  {
    id: 'blitz-c1-1',
    title: 'Gehobene Sprache & Feste Nomen-Verb-Verbindungen',
    titleUz: "9-Dars: Yuqori daraja (C1) iboralari va ilmiy nutq uslubi",
    level: 'C1',
    duration: '38:15',
    description: "C1 darajasidagi boy nemis tili: Funktionsverbgefüge (barqaror ot-fe'l birikmalari: in Betracht ziehen, zur Verfügung stehen, Abschied nehmen) va akademik nemis tili tushunchalari.",
    keyTopics: [
      "Nomen-Verb-Verbindungen (NVV)",
      "Nominalstil va uning ilmiy tilda qo'llanilishi",
      "Metaforik iboralar va idiomalar",
      "C1 nutq ravonligini oshirish mashqlari"
    ],
    vocabularyList: [
      { german: 'in Betracht ziehen', uzbek: "e'tiborga olmoq (berücksichtigen)" },
      { german: 'zur Verfügung stehen', uzbek: "ixtiyorida bo'lmoq" },
      { german: 'eine Entscheidung treffen', uzbek: 'qaror qabul qilmoq' },
      { german: 'in Frage stellen', uzbek: "shubha ostiga qo'ymoq" }
    ],
    interactiveSlides: [
      {
        title: "1. Funktionsverbgefüge (Ot-fe'l birikmalari)",
        germanText: "Wir müssen diesen Aspekt in Betracht ziehen (= berücksichtigen).",
        uzbekText: "Biz ushbu jihatni e'tiborga olishimiz va ko'rib chiqishimiz kerak.",
        grammarNote: "Bu iboralar matnga rasmiy, diplomatik va akademik ohang bag'ishlaydi.",
        tips: [
          "zur Verfügung stellen = birovga ixtiyoriga berib qo'ymoq",
          "zur Verfügung stehen = birovning ixtiyorida tayyor turmoq"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-c1-1-1',
        type: 'choice',
        questionUz: "'in Betracht ziehen' iborasi qaysi fe'l bilan bir xil ma'noga ega?",
        options: ["berücksichtigen (e'tiborga olmoq)", "vergessen (unutmoq)", "ablehnen (rad etmoq)"],
        correctAnswer: "berücksichtigen (e'tiborga olmoq)",
        explanation: "To'g'ri! C1 darajasida 'berücksichtigen' o'rniga 'in Betracht ziehen' ishlatiladi."
      },
      {
        id: 'ex-c1-1-2',
        type: 'blank',
        questionUz: "Bo'sh joyni to'ldiring: 'Ich stehe Ihnen gerne zur ___.' (Sizning ixtiyoringizdaman)",
        germanSentence: "Ich stehe Ihnen gerne zur ___.",
        options: ["Verfügung", "Meinung", "Aussage"],
        correctAnswer: "Verfügung",
        explanation: "Ajoyib! 'zur Verfügung stehen' barqaror iborasidir."
      },
      {
        id: 'ex-c1-1-3',
        type: 'order',
        questionUz: "Tuzing: 'Wir müssen eine wichtige Entscheidung treffen.'",
        wordsToOrder: ["Wir", "müssen", "eine", "wichtige", "Entscheidung", "treffen."],
        correctAnswer: "Wir müssen eine wichtige Entscheidung treffen.",
        explanation: "Qoyilmaqom C1 jumlasi!"
      }
    ]
  },
  // ==========================================
  // --- C2 BOSQICHI (OBERSTUFE 2 - MASTER) ---
  // ==========================================
  {
    id: 'blitz-c2-1',
    title: 'Meisterschaft der deutschen Sprache & Nuancen',
    titleUz: "10-Dars: Mukammal nemis tili (C2) — Nutq nozikliklari, ritorika va falsafiy muloqot",
    level: 'C2',
    duration: '42:50',
    description: "Nemis tilining eng cho'qqisi — C2 Grosses Deutsches Sprachdiplom darajasi. So'z san'ati, ritorik figuralar, nozik ma'nodoshliklar, falsafiy-ilmiy tahlil va ona tili sohiblari darajasidagi yuksak fasohat.",
    keyTopics: [
      "Stilistische Feinheiten und Nuancen",
      "Rhetorische Figuren und Überzeugungskunst",
      "Idiomatische Vollendung im akademischen Diskurs",
      "Subtile Bedeutungsunterschiede und Konnotationen"
    ],
    vocabularyList: [
      { german: 'die Eloquenz', uzbek: "fasohat, so'zga chechanlik, notiqlik san'ati" },
      { german: 'antizipieren', uzbek: "oldindan ko'ra bilmoq va hisobga olmoq" },
      { german: 'ambivalent', uzbek: "ikkiyoqlama, qarama-qarshi tuyg'ulardan iborat" },
      { german: 'ins Gewicht fallen', uzbek: "hal qiluvchi ahamiyatga ega bo'lmoq" }
    ],
    interactiveSlides: [
      {
        title: "1. C2 darajasidagi stilistik yuksaklik",
        germanText: "Mit bestechender Eloquenz gelang es dem Vortragenden, selbst die komplexesten Sachverhalte transparent darzulegen.",
        uzbekText: "Ma'ruzachi o'zining yuksak fasohati va so'zga chechanligi bilan hatto eng murakkab hodisalarni ham nihoyatda tushunarli bayon etdi.",
        grammarNote: "C2 darajasida nafaqat grammatik to'g'rilik, balki so'z tanlashdagi nozik his-tuyg'u va stilistik moslik baholanadi.",
        tips: [
          "Konjunktiv I yordamida ko'chirma gaplarni (indirekte Rede) xolis ifodalash",
          "Partizipialkonstruktionen yordamida fikrni ixcham va ilmiy bayon etish"
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-c2-1-1',
        type: 'choice',
        questionUz: "'die Eloquenz' so'zining o'zbekcha ma'nosi nima?",
        options: ["Fasohat, notiqlik san'ati", "Qiyinchilik, azob", "Dangasalik"],
        correctAnswer: "Fasohat, notiqlik san'ati",
        explanation: "Ofarin! Eloquenz — so'zga chechanlik, yuqori fasohat bilan gapirish demakdir."
      },
      {
        id: 'ex-c2-1-2',
        type: 'blank',
        questionUz: "Iborani yakunlang: 'Diese Argumente fallen schwer ins ___.' (Katta ahamiyatga ega)",
        germanSentence: "Diese Argumente fallen schwer ins ___.",
        options: ["Gewicht", "Wasser", "Haus"],
        correctAnswer: "Gewicht",
        explanation: "Barakalla! 'ins Gewicht fallen' — hal qiluvchi ahamiyat kasb etmoq."
      },
      {
        id: 'ex-c2-1-3',
        type: 'order',
        questionUz: "Tuzing: 'Seine Argumente fielen schwer ins Gewicht.'",
        wordsToOrder: ["Seine", "Argumente", "fielen", "schwer", "ins", "Gewicht."],
        correctAnswer: "Seine Argumente fielen schwer ins Gewicht.",
        explanation: "C2 darajadagi eng oliy fasohatli gap tuzilishi!"
      }
    ]
  }
];
