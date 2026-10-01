import { GermanWordEntry } from '../types';

export const INITIAL_GERMAN_WORDS: GermanWordEntry[] = [
  // ==========================================
  // LEVEL A1: ASOSIY VA KUNDALIK SO'ZLAR (GRUNDSTUFE 1)
  // ==========================================
  {
    id: 'de-sprache',
    german: 'Sprache',
    article: 'die',
    plural: 'die Sprachen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈʃpʁaːxə]',
    pronunciationUz: 'shprah-e',
    meaningUz: "Til, nutq, so'zlashuv uslubi; insonlar o'rtasida fikr almashish vositasi.",
    level: 'A1',
    examples: [
      {
        german: 'Ich lerne jeden Tag fleißig die deutsche Sprache.',
        uzbek: "Men har kuni nemis tilini qunt bilan o'rganaman.",
        context: "Kundalik ta'lim"
      },
      {
        german: 'Die deutsche Sprache hat eine sehr logische Grammatik.',
        uzbek: 'Nemis tili juda mantiqiy grammatikaga ega.',
        context: 'Grammatika'
      }
    ],
    synonyms: ['Zunge', 'Rede', 'Ausdrucksweise'],
    antonyms: ['Stummheit', 'Schweigen'],
    grammarNotes: 'Har doim "die" artikli bilan ishlatiladi. Ko\'pligi "-n" qo\'shish orqali yasaladi.',
    tags: ['til', "ta'lim", 'asosiy', 'muloqot']
  },
  {
    id: 'de-tisch',
    german: 'Tisch',
    article: 'der',
    plural: 'die Tische',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[tɪʃ]',
    pronunciationUz: 'tish',
    meaningUz: 'Stol, yozuv yoki ovqatlanish stoli.',
    level: 'A1',
    examples: [
      {
        german: 'Das Buch liegt auf dem Tisch.',
        uzbek: 'Kitob stol ustida yotibdi.',
        context: 'Joylashuv (Dativ)'
      }
    ],
    synonyms: ['Schreibtisch', 'Esstisch'],
    antonyms: [],
    grammarNotes: 'Erkak jinsi (der). Ko\'pligi "-e" oladi: die Tische.',
    tags: ['uy', 'mebel', 'a1']
  },
  {
    id: 'de-buch',
    german: 'Buch',
    article: 'das',
    plural: 'die Bücher',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[buːx]',
    pronunciationUz: 'bux',
    meaningUz: "Kitob, qo'llanma, darslik.",
    level: 'A1',
    examples: [
      {
        german: 'Dieses Buch ist sehr nützlich für Deutschlerner.',
        uzbek: "Ushbu kitob nemis tilini o'rganuvchilar uchun juda foydali.",
        context: "Ta'lim"
      }
    ],
    synonyms: ['Band', 'Werk', 'Schrift'],
    antonyms: [],
    grammarNotes: "O'rta jins (das). Ko'pligi umlaut va '-er' oladi: die Bücher.",
    tags: ['kitob', 'a1', "ta'lim"]
  },
  {
    id: 'de-apfel',
    german: 'Apfel',
    article: 'der',
    plural: 'die Äpfel',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[ˈapfl̩]',
    pronunciationUz: 'apfel',
    meaningUz: 'Olma mevasi.',
    level: 'A1',
    examples: [
      {
        german: 'Ich esse jeden Morgen einen frischen Apfel.',
        uzbek: 'Men har tong bitta yangi olma yeyman.',
        context: 'Ovqatlanish (Akkusativ)'
      }
    ],
    synonyms: [],
    antonyms: [],
    grammarNotes: "Ko'plik shaklida faqat unli umlaut oladi (A -> Ä): die Äpfel.",
    tags: ['meva', 'oziq-ovqat', 'a1']
  },
  {
    id: 'de-wasser',
    german: 'Wasser',
    article: 'das',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[ˈvasɐ]',
    pronunciationUz: 'vassa',
    meaningUz: "Suv, ichimlik suvi.",
    level: 'A1',
    examples: [
      {
        german: 'Bitte ein Glas stilles Wasser!',
        uzbek: 'Iltimos, bir stakan gazsiz suv bering!',
        context: 'Restoran'
      }
    ],
    synonyms: ['Trinkwasser', 'Nass'],
    antonyms: ['Feuer'],
    grammarNotes: "Sanalmaydigan ot. Odatda ko'pligi ishlatilmaydi.",
    tags: ['ichimlik', 'salomatlik', 'a1']
  },
  {
    id: 'de-brot',
    german: 'Brot',
    article: 'das',
    plural: 'die Brote',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[bʁoːt]',
    pronunciationUz: 'broot',
    meaningUz: 'Non, bulka mahsuloti.',
    level: 'A1',
    examples: [
      {
        german: 'Deutsches Brot ist weltweit berühmt.',
        uzbek: 'Nemis noni butun dunyoda mashhurdir.',
        context: 'Madaniyat'
      }
    ],
    synonyms: ['Laib', 'Gebäck'],
    antonyms: [],
    grammarNotes: "O'rta jins (das Brot). Ko'pligi: die Brote.",
    tags: ['ovqat', 'a1']
  },
  {
    id: 'de-haus',
    german: 'Haus',
    article: 'das',
    plural: 'die Häuser',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[haʊ̯s]',
    pronunciationUz: 'xaus',
    meaningUz: 'Uy, bino, maskan.',
    level: 'A1',
    examples: [
      {
        german: 'Wir wohnen in einem gemütlichen Haus.',
        uzbek: 'Biz shinam bir uyda yashaymiz.',
        context: 'Yashash joyi'
      }
    ],
    synonyms: ['Gebäude', 'Heim', 'Wohnung'],
    antonyms: [],
    grammarNotes: "Ko'pligi 'äu' va '-er': die Häuser. 'zu Hause' = uyda.",
    tags: ['uy', 'bino', 'a1']
  },
  {
    id: 'de-stadt',
    german: 'Stadt',
    article: 'die',
    plural: 'die Städte',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ʃtat]',
    pronunciationUz: 'shtat',
    meaningUz: 'Shahar, yirik aholi punkti.',
    level: 'A1',
    examples: [
      {
        german: 'Berlin ist eine lebendige und historische Stadt.',
        uzbek: 'Berlin jonli va tarixiy shahardir.',
        context: 'Geografiya'
      }
    ],
    synonyms: ['Metropole', 'Ort'],
    antonyms: ['Dorf'],
    grammarNotes: "Ayol jinsi (die Stadt). Ko'pligi: die Städte.",
    tags: ['shahar', 'a1', 'geografiya']
  },
  {
    id: 'de-freund',
    german: 'Freund',
    article: 'der',
    plural: 'die Freunde',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[fʁɔɪ̯nt]',
    pronunciationUz: 'froynt',
    meaningUz: "Do'st, o'rtoq, yaqin birodar.",
    level: 'A1',
    examples: [
      {
        german: 'Mein bester Freund hilft mir immer beim Lernen.',
        uzbek: "Mening eng yaxshi do'stim o'rganishda doim yordam beradi.",
        context: "Do'stlik"
      }
    ],
    synonyms: ['Kamerad', 'Kumpel'],
    antonyms: ['Feind'],
    grammarNotes: "Ayol do'st uchun: die Freundin (ko'pligi: die Freundinnen).",
    tags: ["do'stlik", 'inson', 'a1']
  },
  {
    id: 'de-zeit',
    german: 'Zeit',
    article: 'die',
    plural: 'die Zeiten',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[t͡saɪ̯t]',
    pronunciationUz: 'tsayt',
    meaningUz: 'Vaqt, soat, lahza, davr.',
    level: 'A1',
    examples: [
      {
        german: 'Hast du heute Zeit für einen Spaziergang?',
        uzbek: 'Bugun sayr qilish uchun vaqting bormi?',
        context: 'Muloqot'
      }
    ],
    synonyms: ['Dauer', 'Frist', 'Epoche'],
    antonyms: [],
    grammarNotes: "Ayol jinsi (die). 'Keine Zeit' = vaqt yo'q.",
    tags: ['vaqt', 'a1']
  },
  {
    id: 'de-schule',
    german: 'Schule',
    article: 'die',
    plural: 'die Schulen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈʃuːlə]',
    pronunciationUz: 'shule',
    meaningUz: "Maktab, ta'lim muassasasi.",
    level: 'A1',
    examples: [
      {
        german: 'Die Kinder gehen morgens gern in die Schule.',
        uzbek: "Bolalar ertalab maktabga xushnudlik bilan borishadi.",
        context: "Ta'lim"
      }
    ],
    synonyms: ['Bildungsanstalt', 'Lehranstalt'],
    antonyms: [],
    grammarNotes: "die Schule. 'in der Schule' (Dativ) = maktabda; 'in die Schule' (Akkusativ) = maktabga.",
    tags: ['maktab', "ta'lim", 'a1']
  },
  {
    id: 'de-auto',
    german: 'Auto',
    article: 'das',
    plural: 'die Autos',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[ˈaʊ̯to]',
    pronunciationUz: 'auto',
    meaningUz: 'Avtomobil, mashina, ulov.',
    level: 'A1',
    examples: [
      {
        german: 'Er fährt mit dem Auto zur Arbeit.',
        uzbek: 'U ishga mashinada boradi.',
        context: 'Transport'
      }
    ],
    synonyms: ['Wagen', 'Fahrzeug', 'PKW'],
    antonyms: [],
    grammarNotes: "das Auto. Ko'plik shaklida '-s' oladi: die Autos.",
    tags: ['transport', 'mashina', 'a1']
  },
  {
    id: 'de-kind',
    german: 'Kind',
    article: 'das',
    plural: 'die Kinder',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[kɪnt]',
    pronunciationUz: 'kind',
    meaningUz: "Bola, farzand, go'dak.",
    level: 'A1',
    examples: [
      {
        german: 'Das Kind spielt fröhlich im Garten.',
        uzbek: "Bola bog'da quvnoq o'ynamoqda.",
        context: 'Oila'
      }
    ],
    synonyms: ['Nachwuchs', 'Spross'],
    antonyms: ['Erwachsener'],
    grammarNotes: "das Kind. Ko'pligi '-er' oladi: die Kinder.",
    tags: ['oila', 'bola', 'a1']
  },
  {
    id: 'de-arbeiten',
    german: 'arbeiten',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l",
    pronunciationIPA: '[ˈaʁbaɪ̯tn̩]',
    pronunciationUz: 'arbayten',
    meaningUz: 'Ishlamoq, mehnat qilmoq.',
    level: 'A1',
    examples: [
      {
        german: 'Er arbeitet als Ingenieur in Stuttgart.',
        uzbek: 'U Shtutgartda muhandis bo\'lib ishlaydi.',
        context: 'Kasb'
      }
    ],
    synonyms: ['tätig sein', 'schaffen'],
    antonyms: ['faulenzen', 'ruhen'],
    grammarNotes: "du arbeitest, er arbeitet (t- bilan tugagani uchun 'e' qo'shiladi). Perfekt: hat gearbeitet.",
    tags: ['kasb', "fe'l", 'a1']
  },
  {
    id: 'de-essen',
    german: 'essen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchli)",
    pronunciationIPA: '[ˈɛsn̩]',
    pronunciationUz: 'essen',
    meaningUz: 'Yemoq, ovqatlanmoq.',
    level: 'A1',
    examples: [
      {
        german: 'Was isst du gern zum Frühstück?',
        uzbek: 'Nonushtaga nima yeyishni yoqtirasan?',
        context: 'Kundalik hayot'
      }
    ],
    synonyms: ['speisen', 'verzehren'],
    antonyms: ['hungern', 'fasten'],
    grammarNotes: "Unli almashishi: du isst, er isst. Perfekt: hat gegessen.",
    tags: ['ovqat', "fe'l", 'a1']
  },
  {
    id: 'de-trinken',
    german: 'trinken',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchli)",
    pronunciationIPA: '[ˈtʁɪŋkn̩]',
    pronunciationUz: 'trinken',
    meaningUz: 'Ichmoq, chanqoqni qondirmoq.',
    level: 'A1',
    examples: [
      {
        german: 'Ich trinke morgens gern schwarzen Kaffee.',
        uzbek: 'Men ertalab qora qahva ichishni yaxshi ko\'raman.',
        context: 'Ichimlik'
      }
    ],
    synonyms: ['zu sich nehmen'],
    antonyms: ['dürsten'],
    grammarNotes: "Kuchli fe'l: trank, hat getrunken.",
    tags: ['ichimlik', "fe'l", 'a1']
  },

  // ==========================================
  // LEVEL A2: SAYOHAT, KASB, SOG'LIQ (GRUNDSTUFE 2)
  // ==========================================
  {
    id: 'de-reise',
    german: 'Reise',
    article: 'die',
    plural: 'die Reisen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈʁaɪ̯zə]',
    pronunciationUz: 'rayze',
    meaningUz: "Sayohat, safar, yo'lchilik.",
    level: 'A2',
    examples: [
      {
        german: 'Gute Reise und pass gut auf dich auf!',
        uzbek: "Oq yo'l, sayohatingiz xayrli bo'lsin!",
        context: 'Tilak'
      }
    ],
    synonyms: ['Fahrt', 'Trip', 'Ausflug'],
    antonyms: [],
    grammarNotes: "Ayol jinsi (die). Fe'l shakli: reisen (sayohat qilmoq).",
    tags: ['sayohat', 'a2']
  },
  {
    id: 'de-arzt',
    german: 'Arzt',
    article: 'der',
    plural: 'die Ärzte',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[aːɐ̯t͡st]',
    pronunciationUz: 'artst',
    meaningUz: 'Shifokor, tabib, vrach.',
    level: 'A2',
    examples: [
      {
        german: 'Der Arzt untersucht den Patienten sehr gewissenhaft.',
        uzbek: "Shifokor bemorni juda vijdonan ko'rikdan o'tkazmoqda.",
        context: 'Tibbiyot'
      }
    ],
    synonyms: ['Mediziner', 'Doktor'],
    antonyms: ['Patient'],
    grammarNotes: "der Arzt -> die Ärzte (umlaut oladi). Ayol shifokor: die Ärztin (die Ärztinnen).",
    tags: ['kasb', 'tibbiyot', 'a2']
  },
  {
    id: 'de-bahnhof',
    german: 'Bahnhof',
    article: 'der',
    plural: 'die Bahnhöfe',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[ˈbaːnˌhoːf]',
    pronunciationUz: 'ban-xof',
    meaningUz: 'Temir yo‘l vokzali, bekat.',
    level: 'A2',
    examples: [
      {
        german: 'Der Zug fährt pünktlich am Hauptbahnhof ab.',
        uzbek: 'Poyezd bosh vokzaldan o\'z vaqtida jo\'naydi.',
        context: 'Sayohat'
      }
    ],
    synonyms: ['Station', 'Haltestelle'],
    antonyms: [],
    grammarNotes: "der Bahnhof (der Hof -> die Höfe). 'am Bahnhof' = vokzalda.",
    tags: ['transport', 'sayohat', 'a2']
  },
  {
    id: 'de-gesundheit',
    german: 'Gesundheit',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ɡəˈzʊnthraɪ̯t]',
    pronunciationUz: 'gezunt-xayt',
    meaningUz: "Salomatlik, sog'lik, sihat-salomatlik.",
    level: 'A2',
    examples: [
      {
        german: 'Gesundheit ist das Wichtigste im menschlichen Leben.',
        uzbek: "Salomatlik inson hayotidagi eng muhim boylikdir.",
        context: 'Hikmat'
      }
    ],
    synonyms: ['Wohlbefinden', 'Vitalität'],
    antonyms: ['Krankheit'],
    grammarNotes: "-heit bilan tugagan so'zlar har doim 'die' oladi va ko'pligi bo'lmaydi.",
    tags: ['salomatlik', 'tibbiyot', 'a2']
  },
  {
    id: 'de-erfahrung',
    german: 'Erfahrung',
    article: 'die',
    plural: 'die Erfahrungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ɛɐ̯ˈfaːʁʊŋ]',
    pronunciationUz: 'erfarung',
    meaningUz: "Tajriba, hayotiy yoki kasbiy ko'nikma.",
    level: 'A2',
    examples: [
      {
        german: 'Durch die Arbeit habe ich wertvolle Erfahrungen gesammelt.',
        uzbek: "Ish orqali men qimmatli tajribalar to'pladim.",
        context: 'Mehnat faoliyati'
      }
    ],
    synonyms: ['Praxis', 'Kenntnis', 'Routine'],
    antonyms: ['Unerfahrenheit'],
    grammarNotes: "-ung bilan tugagani uchun har doim 'die'. Ko'pligi: -en.",
    tags: ['tajriba', 'mehnat', 'a2']
  },
  {
    id: 'de-problem',
    german: 'Problem',
    article: 'das',
    plural: 'die Probleme',
    partOfSpeech: 'nomen',
    partOfSpeechUz: "Ot (o'rta jins)",
    pronunciationIPA: '[pʁoˈbleːm]',
    pronunciationUz: 'probleem',
    meaningUz: 'Muammo, mushkul masala, chigal vaziyat.',
    level: 'A2',
    examples: [
      {
        german: 'Kein Problem, das können wir schnell lösen!',
        uzbek: 'Hechqisi yo\'q (muammo emas), buni tezda hal qila olamiz!',
        context: 'Muloqot'
      }
    ],
    synonyms: ['Schwierigkeit', 'Hürde', 'Hindernis'],
    antonyms: ['Lösung'],
    grammarNotes: "O'rta jins: das Problem. Ko'pligi: die Probleme.",
    tags: ['muammo', 'a2']
  },
  {
    id: 'de-loesung',
    german: 'Lösung',
    article: 'die',
    plural: 'die Lösungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈløːzʊŋ]',
    pronunciationUz: 'loozung',
    meaningUz: 'Yechim, yechilishi, hal bo\'lish yo\'li.',
    level: 'A2',
    examples: [
      {
        german: 'Gemeinsam finden wir bestimmt eine gute Lösung.',
        uzbek: 'Birgalikda albatta yaxshi yechim topamiz.',
        context: 'Hamkorlik'
      }
    ],
    synonyms: ['Antwort', 'Klärung', 'Ausweg'],
    antonyms: ['Problem', 'Rätsel'],
    grammarNotes: "die Lösung (-ung qoidasi). Fe'li: lösen (yechmoq, hal qilmoq).",
    tags: ['yechim', 'a2']
  },
  {
    id: 'de-termin',
    german: 'Termin',
    article: 'der',
    plural: 'die Termine',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[tɛʁˈmiːn]',
    pronunciationUz: 'termin',
    meaningUz: 'Uchrashuv vaqti, belgilangan qabul vaqti.',
    level: 'A2',
    examples: [
      {
        german: 'Ich habe morgen früh einen Termin beim Zahnarzt.',
        uzbek: 'Ertaga ertalab stomatolog qabuliga belgilangan vaqtim bor.',
        context: 'Rejalashtirish'
      }
    ],
    synonyms: ['Verabredung', 'Treffen'],
    antonyms: [],
    grammarNotes: "der Termin. Ibora: einen Termin vereinbaren (uchrashuv belgilamoq).",
    tags: ['vaqt', 'uchrashuv', 'a2']
  },
  {
    id: 'de-erklaeren',
    german: 'erklären',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l",
    pronunciationIPA: '[ɛɐ̯ˈklɛːʁən]',
    pronunciationUz: 'erkleren',
    meaningUz: "Tushuntirmoq, izohlamoq, bayon etmoq.",
    level: 'A2',
    examples: [
      {
        german: 'Können Sie mir diese Regel bitte noch einmal erklären?',
        uzbek: "Iltimos, ushbu qoidani menga yana bir bor tushuntirib bera olasizmi?",
        context: "Ta'lim"
      }
    ],
    synonyms: ['erläutern', 'beschreiben'],
    antonyms: ['verschweigen'],
    grammarNotes: "Dativ + Akkusativ: jemandem (Dat) etwas (Akk) erklären. Perfekt: hat erklärt.",
    tags: ["tushuntirish", "fe'l", 'a2']
  },

  // ==========================================
  // LEVEL B1: JAMIYAT, KARYERA, TA'LIM (MITTELSTUFE 1)
  // ==========================================
  {
    id: 'de-umwelt',
    german: 'Umwelt',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈʊmvɛlt]',
    pronunciationUz: 'um-velt',
    meaningUz: "Atrof-muhit, tabiat, ekologik muhit.",
    level: 'B1',
    examples: [
      {
        german: 'Der Schutz der Umwelt ist eine globale Aufgabe.',
        uzbek: "Atrof-muhitni muhofaza qilish global vazifadir.",
        context: 'Ekologiya'
      }
    ],
    synonyms: ['Natur', 'Ökosystem', 'Lebensraum'],
    antonyms: [],
    grammarNotes: "die Umwelt. Umweltschutz = atrof-muhitni muhofaza qilish.",
    tags: ['ekologiya', 'tabiat', 'b1']
  },
  {
    id: 'de-gesellschaft',
    german: 'Gesellschaft',
    article: 'die',
    plural: 'die Gesellschaften',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ɡəˈzɛlʃaft]',
    pronunciationUz: 'gezelschaft',
    meaningUz: "Jamiyat, sotsium; shuningdek kompaniya, jamiyat birlashmasi.",
    level: 'B1',
    examples: [
      {
        german: 'Bildung spielt eine zentrale Rolle in einer modernen Gesellschaft.',
        uzbek: "Zamonaviy jamiyatda ta'lim markaziy o'rin tutadi.",
        context: 'Sotsiologiya'
      }
    ],
    synonyms: ['Gemeinschaft', 'Bevölkerung', 'Sozietät'],
    antonyms: ['Individuum'],
    grammarNotes: "-schaft bilan tugagan otlar har doim 'die' oladi.",
    tags: ['jamiyat', 'b1']
  },
  {
    id: 'de-erfolg',
    german: 'Erfolg',
    article: 'der',
    plural: 'die Erfolge',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[ɛɐ̯ˈfɔlk]',
    pronunciationUz: 'erfolk',
    meaningUz: 'Muvaffaqiyat, yutuq, zafar.',
    level: 'B1',
    examples: [
      {
        german: 'Harte Arbeit und Ausdauer führen zum Erfolg.',
        uzbek: "Mehnatsevarlik va sabr-toqat muvaffaqiyatga eltadi.",
        context: 'Motivatsiya'
      }
    ],
    synonyms: ['Triumph', 'Leistung', 'Sieg'],
    antonyms: ['Misserfolg', 'Niederlage'],
    grammarNotes: "der Erfolg. Sifat shakli: erfolgreich (muvaffaqiyatli).",
    tags: ['muvaffaqiyat', 'motivatsiya', 'b1']
  },
  {
    id: 'de-entscheidung',
    german: 'Entscheidung',
    article: 'die',
    plural: 'die Entscheidungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ɛntˈʃaɪ̯dʊŋ]',
    pronunciationUz: 'entshaydung',
    meaningUz: 'Qaror, xulosa, hukm.',
    level: 'B1',
    examples: [
      {
        german: 'Eine schwere Entscheidung erfordert sorgfältiges Nachdenken.',
        uzbek: "Og'ir qaror puxta o'ylab ko'rishni talab qiladi.",
        context: 'Falsafa'
      },
      {
        german: 'Wir haben gestern die endgültige Entscheidung getroffen.',
        uzbek: "Biz kecha uzil-kesil qaror qabul qildik.",
        context: 'Iboralar (eine Entscheidung treffen)'
      }
    ],
    synonyms: ['Beschluss', 'Urteil', 'Wahl'],
    antonyms: ['Unentschlossenheit', 'Zweifel'],
    grammarNotes: "die Entscheidung. Ibora: eine Entscheidung treffen = qaror qabul qilmoq.",
    tags: ['qaror', 'b1']
  },
  {
    id: 'de-meinung',
    german: 'Meinung',
    article: 'die',
    plural: 'die Meinungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈmaɪ̯nʊŋ]',
    pronunciationUz: 'maynung',
    meaningUz: "Fikr, mulohaza, nuqtai nazar.",
    level: 'B1',
    examples: [
      {
        german: 'Meiner Meinung nach sollten wir diesen Plan unterstützen.',
        uzbek: "Mening fikrimcha, biz ushbu rejani qo'llab-quvvatlashimiz kerak.",
        context: 'Fikr bildirish'
      }
    ],
    synonyms: ['Ansicht', 'Standpunkt', 'Auffassung'],
    antonyms: [],
    grammarNotes: "die Meinung. Ibora: 'meiner Meinung nach' (+ Dativ) = mening fikrimcha.",
    tags: ['fikr', 'munozara', 'b1']
  },
  {
    id: 'de-vorteil',
    german: 'Vorteil',
    article: 'der',
    plural: 'die Vorteile',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[ˈfoːɐ̯ˌtaɪ̯l]',
    pronunciationUz: 'for-tayl',
    meaningUz: "Afzallik, ustunlik, foydali tomon.",
    level: 'B1',
    examples: [
      {
        german: 'Fremdsprachenkenntnisse bringen viele berufliche Vorteile mit sich.',
        uzbek: "Chet tillarini bilish ko'plab kasbiy afzalliklarni taqdim etadi.",
        context: 'Karyera'
      }
    ],
    synonyms: ['Pluspunkt', 'Nutzen', 'Privileg'],
    antonyms: ['Nachteil'],
    grammarNotes: "der Vorteil. Ziddi: der Nachteil (kamchilik).",
    tags: ['afzallik', 'b1']
  },
  {
    id: 'de-empfehlen',
    german: 'empfehlen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchli)",
    pronunciationIPA: '[ɛmˈpfeːlən]',
    pronunciationUz: 'empfeelen',
    meaningUz: "Tavsiya qilmoq, maslahat bermoq.",
    level: 'B1',
    examples: [
      {
        german: 'Ich kann Ihnen diesen Deutschkurs wärmstens empfehlen.',
        uzbek: "Men sizga ushbu nemis tili kursini chin dildan tavsiya qila olaman.",
        context: 'Tavsiya'
      }
    ],
    synonyms: ['raten', 'anraten', 'befürworten'],
    antonyms: ['abraten'],
    grammarNotes: "du empfiehlst, er empfiehlt. Perfekt: hat empfohlen. Dativ + Akkusativ.",
    tags: ['tavsiya', "fe'l", 'b1']
  },

  // ==========================================
  // LEVEL B2: ILMIY MATNLAR, KASBIY VA HUQUQIY (MITTELSTUFE 2)
  // ==========================================
  {
    id: 'de-wissenschaft',
    german: 'Wissenschaft',
    article: 'die',
    plural: 'die Wissenschaften',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈvɪsn̩ʃaft]',
    pronunciationUz: 'vissenshaft',
    meaningUz: "Fan, ilm-fan, ilmiy tadqiqot sohasi.",
    level: 'B2',
    examples: [
      {
        german: 'Die moderne Wissenschaft liefert Antworten auf viele existentielle Fragen.',
        uzbek: "Zamonaviy fan ko'plab hayotiy savollarga javob beradi.",
        context: 'Ilm-fan'
      }
    ],
    synonyms: ['Forschung', 'Lehre', 'Akademie'],
    antonyms: ['Aberglaube', 'Ignoranz'],
    grammarNotes: "-schaft bilan tugagani sababli 'die'. Sifat: wissenschaftlich (ilmiy).",
    tags: ['fan', 'ilmiy', 'b2']
  },
  {
    id: 'de-herausforderung',
    german: 'Herausforderung',
    article: 'die',
    plural: 'die Herausforderungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[hɛˈʁaʊ̯sˌfɔʁdəʁʊŋ]',
    pronunciationUz: 'xeraus-forderunk',
    meaningUz: "Chaqiriq, sinov, qiyin lekin qiziqarli vazifa.",
    level: 'B2',
    examples: [
      {
        german: 'Der Klimawandel stellt eine der größten Herausforderungen unserer Zeit dar.',
        uzbek: "Iqlim o'zgarishi zamonamizning eng katta sinovlaridan biridir.",
        context: 'Global muammolar'
      }
    ],
    synonyms: ['Challenge', 'Aufgabe', 'Prüfung'],
    antonyms: ['Routine', 'Leichtigkeit'],
    grammarNotes: "die Herausforderung. Fe'li: herausfordern (chaqiriq tashlamoq).",
    tags: ['sinov', 'b2']
  },
  {
    id: 'de-verantwortung',
    german: 'Verantwortung',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[fɛɐ̯ˈʔantvɔʁtʊŋ]',
    pronunciationUz: 'fer-antvortung',
    meaningUz: "Mas'uliyat, javobgarlik, burch.",
    level: 'B2',
    examples: [
      {
        german: 'Jeder Mensch trägt Verantwortung für sein eigenes Handeln.',
        uzbek: "Har bir inson o'z qilmishlari uchun mas'uliyatni o'z zimmasiga oladi.",
        context: 'Axloq'
      }
    ],
    synonyms: ['Pflicht', 'Haftung', 'Zuständigkeit'],
    antonyms: ['Verantwortungslosigkeit'],
    grammarNotes: "Verantwortung übernehmen = mas'uliyatni o'z zimmasiga olmoq.",
    tags: ["mas'uliyat", 'axloq', 'b2']
  },
  {
    id: 'de-nachhaltigkeit',
    german: 'Nachhaltigkeit',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈnaːxˌhaltɪçkaɪ̯t]',
    pronunciationUz: 'nax-xaltix-kayt',
    meaningUz: "Barqarorlik, uzoq muddatli samaradorlik, ekologik barqaror taraqqiyot.",
    level: 'B2',
    examples: [
      {
        german: 'Nachhaltigkeit in der Wirtschaft schont die natürlichen Ressourcen.',
        uzbek: "Iqtisodiyotdagi barqarorlik tabiiy resurslarni asrab-avaylaydi.",
        context: 'Iqtisodiyot'
      }
    ],
    synonyms: ['Zukunftsfähigkeit', 'Beständigkeit'],
    antonyms: ['Verschwendung', 'Kurzfristigkeit'],
    grammarNotes: "-keit qo'shimchasi tufayli 'die'. Sifat: nachhaltig (barqaror).",
    tags: ['ekologiya', 'barqarorlik', 'b2']
  },
  {
    id: 'de-voraussetzung',
    german: 'Voraussetzung',
    article: 'die',
    plural: 'die Voraussetzungen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[foˈʁaʊ̯sˌzɛt͡sʊŋ]',
    pronunciationUz: 'foraus-zetsung',
    meaningUz: "Dastlabki shart, talab, zaruriy shart-sharoit.",
    level: 'B2',
    examples: [
      {
        german: 'Gute Deutschkenntnisse sind eine zwingende Voraussetzung für das Studium in Deutschland.',
        uzbek: "Nemis tilini yaxshi bilish Germaniyada o'qish uchun zaruriy shartdir.",
        context: "Universitet talablari"
      }
    ],
    synonyms: ['Bedingung', 'Kriterium', 'Prämisse'],
    antonyms: [],
    grammarNotes: "die Voraussetzung. Fe'li: voraussetzen (shart qilib qo'ymoq).",
    tags: ['talab', 'shart', 'b2']
  },
  {
    id: 'de-gewaehrleisten',
    german: 'gewährleisten',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l",
    pronunciationIPA: '[ɡəˈvɛːɐ̯ˌlaɪ̯stn̩]',
    pronunciationUz: 'geveer-laysten',
    meaningUz: "Kafolatlamoq, ta'minlab bermoq, xavfsizlik va aniqlikni kafolatlamoq.",
    level: 'B2',
    examples: [
      {
        german: 'Der Staat muss die Sicherheit aller Bürger gewährleisten.',
        uzbek: "Davlat barcha fuqarolarning xavfsizligini ta'minlashi va kafolatlashi shart.",
        context: 'Huquq va jamiyat'
      }
    ],
    synonyms: ['garantieren', 'sicherstellen', 'verbürgen'],
    antonyms: ['gefährden'],
    grammarNotes: "Ajralmaydigan fe'l. Perfekt: hat gewährleistet. Akkusativ talab qiladi.",
    tags: ['kafolat', "fe'l", 'b2']
  },

  // ==========================================
  // LEVEL C1: AKADEMIK, DISKURS, RASMIY (OBERSTUFE 1)
  // ==========================================
  {
    id: 'de-ambivalenz',
    german: 'Ambivalenz',
    article: 'die',
    plural: 'die Ambivalenzen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ambivaˈlɛnt͡s]',
    pronunciationUz: 'ambivalents',
    meaningUz: "Ikkiyoqlamalilik, qarama-qarshi tuyg'ular yoki fikrlar ziddiyati.",
    level: 'C1',
    examples: [
      {
        german: 'Die ethische Ambivalenz des technologischen Fortschritts ist unbestreitbar.',
        uzbek: "Texnologik taraqqiyotning axloqiy jihatdan ikkiyoqlamaliligi inkor etib bo'lmas haqiqatdir.",
        context: 'Falsafa'
      }
    ],
    synonyms: ['Widersprüchlichkeit', 'Doppelsinnigkeit'],
    antonyms: ['Eindeutigkeit', 'Klarheit'],
    grammarNotes: "Ayol jinsi (die). Sifat shakli: ambivalent.",
    tags: ['falsafa', 'akademik', 'c1']
  },
  {
    id: 'de-paradigma',
    german: 'Paradigmenwechsel',
    article: 'der',
    plural: 'die Paradigmenwechsel',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[paʁaˈdɪɡmənˌvɛksl̩]',
    pronunciationUz: 'paradigmen-veksel',
    meaningUz: "Paradigma almashinuvi, ilmiy qarashlar va tamoyillarning tubdan yangilanishi.",
    level: 'C1',
    examples: [
      {
        german: 'Künstliche Intelligenz leitet einen tiefgreifenden Paradigmenwechsel in der Arbeitswelt ein.',
        uzbek: "Sun'iy intellekt mehnat bozorida tub paradigma almashinuvini boshlab bermoqda.",
        context: 'Ilmiy innovatsiyalar'
      }
    ],
    synonyms: ['Grundsatzwandel', 'Umdenken', 'Revolution'],
    antonyms: ['Stagnation', 'Status quo'],
    grammarNotes: "der Paradigmenwechsel. Ko'pligi: die Paradigmenwechsel.",
    tags: ['fan', 'akademik', 'c1']
  },
  {
    id: 'de-diskrepanz',
    german: 'Diskrepanz',
    article: 'die',
    plural: 'die Diskrepanzen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[dɪskʁeˈpant͡s]',
    pronunciationUz: 'diskrepants',
    meaningUz: "Nomuvofiqlik, tafovut, kutilgan va haqiqiy holat o'rtasidagi farq.",
    level: 'C1',
    examples: [
      {
        german: 'Es besteht eine signifikante Diskrepanz zwischen Theorie und Praxis.',
        uzbek: "Nazariya va amaliyot o'rtasida sezilarli tafovut mavjud.",
        context: 'Ilmiy tahlil'
      }
    ],
    synonyms: ['Abweichung', 'Differenz', 'Widerspruch'],
    antonyms: ['Übereinstimmung', 'Kongruenz'],
    grammarNotes: "die Diskrepanz. Ko'pligi: -en.",
    tags: ['tafovut', 'akademik', 'c1']
  },
  {
    id: 'de-kontroverse',
    german: 'Kontroverse',
    article: 'die',
    plural: 'die Kontroversen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[kɔntʁoˈvɛʁzə]',
    pronunciationUz: 'kontroverze',
    meaningUz: "Qizg'in bahs, munozara, fikrlar to'qnashuvi.",
    level: 'C1',
    examples: [
      {
        german: 'Das neue Reformgesetz löste in der Öffentlichkeit heftige Kontroversen aus.',
        uzbek: "Yangi islohot qonuni jamoatchilik orasida shiddatli munozaralarga sabab bo'ldi.",
        context: 'Siyosat'
      }
    ],
    synonyms: ['Debatte', 'Disput', 'Auseinandersetzung'],
    antonyms: ['Konsens', 'Einigkeit'],
    grammarNotes: "die Kontroverse. Sifat: kontrovers (bahsli).",
    tags: ['munozara', 'c1']
  },
  {
    id: 'de-differenziert',
    german: 'differenziert',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat (yuqori uslub)',
    pronunciationIPA: '[dɪfəʁɛnˈtsiːɐ̯t]',
    pronunciationUz: 'differentsirt',
    meaningUz: "Har tomonlama puxta o'ylangan, nozik tafsilotlarigacha ajratilgan, biryoqlama bo'lmagan.",
    level: 'C1',
    examples: [
      {
        german: 'Wir benötigen eine differenzierte Betrachtung dieses historischen Ereignisses.',
        uzbek: "Ushbu tarixiy voqeaga biryoqlama emas, balki har tomonlama nozik va xolis qarash talab etiladi.",
        context: 'Tarixiy tahlil'
      }
    ],
    synonyms: ['nuanciert', 'fein abgestimmt', 'präzise'],
    antonyms: ['pauschal', 'oberflächlich', 'vereinfacht'],
    grammarNotes: "Fe'ldan (differenzieren) olingan sifat.",
    tags: ['sifat', 'ilmiy', 'c1']
  },

  // ==========================================
  // LEVEL C2: FASOHAT, RITORIKA, CHO'QQI DARAJA (OBERSTUFE 2)
  // ==========================================
  {
    id: 'de-eloquenz',
    german: 'Eloquenz',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[eloˈkvɛnt͡s]',
    pronunciationUz: 'elo-kvents',
    meaningUz: "Fasohat, notiqlik san'ati, so'zga chechanlik, qoyilmaqom ravon nutq madaniyati.",
    level: 'C2',
    examples: [
      {
        german: 'Mit bestechender Eloquenz zog der Redner das gesamte Auditorium in seinen Bann.',
        uzbek: "Notiq o'zining maftunkor fasohati va so'zga chechanligi bilan butun zaldagilarni rom etdi.",
        context: 'Notiqlik'
      }
    ],
    synonyms: ['Beredsamkeit', 'Redekunst', 'Sprachgewandtheit'],
    antonyms: ['Sprachlosigkeit', 'Stottern'],
    grammarNotes: "Lotincha kelib chiqqan. Ayol jinsi (die). Sifat: eloquent (fasohatli).",
    tags: ['nutq', 'fasohat', 'c2']
  },
  {
    id: 'de-antizipieren',
    german: 'antizipieren',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (akademik)",
    pronunciationIPA: '[antit͡siˈpiːʁən]',
    pronunciationUz: 'antitsipiren',
    meaningUz: "Oldindan ko'ra bilmoq, oldindan sezib hisobga olmoq, voqealar rivojini taxmin qilib harakat qilmoq.",
    level: 'C2',
    examples: [
      {
        german: 'Ein genialer Stratege vermag die Züge des Gegners im Voraus zu antizipieren.',
        uzbek: "Dahiyona strateg raqibning harakatlarini oldindan ko'ra bilish va chamalash iqtidoriga ega bo'ladi.",
        context: 'Strategiya'
      }
    ],
    synonyms: ['vorwegnehmen', 'vorhersehen', 'ahnen'],
    antonyms: ['nachhinken', 'überrascht werden'],
    grammarNotes: "-ieren bilan tugagan fe'l: Perfektda 'hat antizipiert' (ge- qo'shimchasisiz).",
    tags: ['akademik', 'strategiya', 'c2']
  },
  {
    id: 'de-idiosynkrasie',
    german: 'Idiosynkrasie',
    article: 'die',
    plural: 'die Idiosynkrasien',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[idi̯ozʏŋkʁaˈziː]',
    pronunciationUz: 'idiosinkrazi',
    meaningUz: "O'ziga xoslik, kutilmagan kuchli noxushlik yoki shaxsiy o'zgacha xarakter xususiyati.",
    level: 'C2',
    examples: [
      {
        german: 'Jeder Schriftsteller besitzt stilistische Idiosynkrasien, die sein Werk unverkennbar machen.',
        uzbek: "Har bir yozuvchi o'z asarini boshqalardan ajratib turuvchi o'ziga xos uslubiy nozikliklarga ega.",
        context: 'Adabiyotshunoslik'
      }
    ],
    synonyms: ['Eigenheit', 'Eigenart', 'Sonderbarkeit'],
    antonyms: ['Konformität'],
    grammarNotes: "Ayol jinsi (die). Ko'pligi: -en.",
    tags: ['adabiyot', 'c2']
  },
  {
    id: 'de-akribie',
    german: 'Akribie',
    article: 'die',
    plural: '—',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[akʁiˈbiː]',
    pronunciationUz: 'akribi',
    meaningUz: "O'ta sinchkovlik, mayda tafsilotlargacha nihoyatda puxtalik va aniqlik.",
    level: 'C2',
    examples: [
      {
        german: 'Die Handschrift wurde mit wissenschaftlicher Akribie analysiert.',
        uzbek: "Qo'lyozma yuksak ilmiy sinchkovlik va aniqlik bilan tahlil qilindi.",
        context: 'Filologiya'
      }
    ],
    synonyms: ['Sorgfalt', 'Genauigkeit', 'Gewissenhaftigkeit'],
    antonyms: ['Schlampigkeit', 'Flüchtigkeit'],
    grammarNotes: "die Akribie. Sifat shakli: akribisch (o'ta sinchkovlik bilan).",
    tags: ['aniqlik', 'c2']
  },
  {
    id: 'de-transzendieren',
    german: 'transzendieren',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (falsafiy)",
    pronunciationIPA: '[tʁanst͡sɛnˈdiːʁən]',
    pronunciationUz: 'transtsendiren',
    meaningUz: "Chegaralardan oshib o'tmoq, moddiy yoki hissiy doiradan yuksakroq darajaga ko'tarilmoq.",
    level: 'C2',
    examples: [
      {
        german: 'Große Kunst vermag zeitliche und kulturelle Schranken zu transzendieren.',
        uzbek: "Buyuk san'at asarlari zamon va makon, madaniy to'siqlarni yorib o'tish qudratiga ega.",
        context: 'San\'at falsafasi'
      }
    ],
    synonyms: ['überwinden', 'überschreiten', 'übersteigen'],
    antonyms: ['verharren', 'stagnieren'],
    grammarNotes: "Falsafiy termin. Perfekt: hat transzendiert. Akkusativ talab qiladi.",
    tags: ['falsafa', 'sanat', 'c2']
  },
  {
    id: 'de-immanent',
    german: 'immanent',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat (falsafiy)',
    pronunciationIPA: '[ɪmaˈnɛnt]',
    pronunciationUz: 'immanent',
    meaningUz: "Ichki tabiatiga xos, o'zida mavjud bo'lgan, ajralmas xususiyat.",
    level: 'C2',
    examples: [
      {
        german: 'Der Widerspruch ist dem System immanent.',
        uzbek: "Ushbu ziddiyat tizimning o'z tabiatiga xos bo'lgan ichki xususiyatidir.",
        context: 'Falsafiy ontologiya'
      }
    ],
    synonyms: ['innewohnend', 'eingeboren', 'inhärent'],
    antonyms: ['transzendent', 'äußerlich'],
    grammarNotes: "Sifat: etwas ist einer Sache (Dat) immanent.",
    tags: ['falsafa', 'akademik', 'c2']
  },

  // ==========================================
  // EXTENDED CORE VOCABULARY (A1 - B2)
  // ==========================================
  {
    id: 'de-familie',
    german: 'Familie',
    article: 'die',
    plural: 'die Familien',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[faˈmiːli̯ə]',
    pronunciationUz: 'familiye',
    meaningUz: 'Oila, xonadon a’zolari.',
    level: 'A1',
    examples: [
      {
        german: 'Meine Familie bedeutet mir alles auf der Welt.',
        uzbek: 'Oilam men uchun dunyodagi eng qadrli boylikdir.',
        context: 'Qadriyat'
      }
    ],
    synonyms: ['Sippe', 'Angehörige', 'Hausstand'],
    antonyms: [],
    grammarNotes: "die Familie, ko'pligi die Familien.",
    tags: ['oila', 'a1']
  },
  {
    id: 'de-vater',
    german: 'Vater',
    article: 'der',
    plural: 'die Väter',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[ˈfaːtɐ]',
    pronunciationUz: 'fater',
    meaningUz: 'Ota, padar.',
    level: 'A1',
    examples: [
      {
        german: 'Mein Vater arbeitet als Ingenieur.',
        uzbek: 'Mening otam muhandis bo‘lib ishlaydi.',
        context: 'Oila'
      }
    ],
    synonyms: ['Papa', 'Erzeuger'],
    antonyms: ['Mutter'],
    grammarNotes: "der Vater, ko'pligi die Väter (umlaut oladi).",
    tags: ['oila', 'a1']
  },
  {
    id: 'de-mutter',
    german: 'Mutter',
    article: 'die',
    plural: 'die Mütter',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈmʊtɐ]',
    pronunciationUz: 'mutter',
    meaningUz: 'Ona, volida.',
    level: 'A1',
    examples: [
      {
        german: 'Meine Mutter kocht das leckerste Essen.',
        uzbek: 'Onam eng mazali taomlarni pishiradi.',
        context: 'Oila'
      }
    ],
    synonyms: ['Mama'],
    antonyms: ['Vater'],
    grammarNotes: "die Mutter, ko'pligi die Mütter.",
    tags: ['oila', 'a1']
  },
  {
    id: 'de-sonne',
    german: 'Sonne',
    article: 'die',
    plural: 'die Sonnen',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (ayol jinsi)',
    pronunciationIPA: '[ˈzɔnə]',
    pronunciationUz: 'zonne',
    meaningUz: 'Quyosh, oftob, quyosh nuri.',
    level: 'A1',
    examples: [
      {
        german: 'Heute scheint die Sonne den ganzen Tag warm.',
        uzbek: 'Bugun kun bo‘yi quyosh iliq charaqlab turibdi.',
        context: 'Ob-havo'
      }
    ],
    synonyms: ['Tagesgestirn', 'Sonnenschein'],
    antonyms: ['Mond', 'Dunkelheit'],
    grammarNotes: "die Sonne, ko'pligi die Sonnen.",
    tags: ['tabiat', 'a1', 'ob-havo']
  },
  {
    id: 'de-zug',
    german: 'Zug',
    article: 'der',
    plural: 'die Züge',
    partOfSpeech: 'nomen',
    partOfSpeechUz: 'Ot (erkak jinsi)',
    pronunciationIPA: '[t͡suːk]',
    pronunciationUz: 'tsuk',
    meaningUz: 'Poyezd, temiryo‘l tarkibi.',
    level: 'A1',
    examples: [
      {
        german: 'Der Zug nach Berlin fährt pünktlich von Gleis 4 ab.',
        uzbek: 'Berlinga ketadigan poyezd 4-yo‘ldan o‘z vaqtida jo‘naydi.',
        context: 'Sayohat'
      }
    ],
    synonyms: ['Eisenbahn', 'Bahn'],
    antonyms: [],
    grammarNotes: "der Zug, ko'pligi die Züge.",
    tags: ['transport', 'a1']
  },
  {
    id: 'de-lernen',
    german: 'lernen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l",
    pronunciationIPA: '[ˈlɛʁnən]',
    pronunciationUz: 'lernen',
    meaningUz: "O'rganmoq, dars tayyorlamoq, bilim olmoq.",
    level: 'A1',
    examples: [
      {
        german: 'Ich lerne jeden Tag neue deutsche Wörter.',
        uzbek: "Men har kuni yangi nemischa so'zlarni o'rganaman.",
        context: "Ta'lim"
      },
      {
        german: 'Man lernt nie aus.',
        uzbek: 'Beshikdan to qabrgacha ilm izla (Inson umr bo‘yi o‘rganadi).',
        context: 'Hikmat'
      }
    ],
    synonyms: ['studieren', 'sich aneignen', 'pauken'],
    antonyms: ['verlernen', 'vergessen'],
    grammarNotes: "Muntazam fe'l: ich lerne, du lernst, er/sie/es lernt. Perfekt: hat gelernt.",
    tags: ['talim', 'fel', 'a1']
  },
  {
    id: 'de-sprechen',
    german: 'sprechen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchsiz emas, kuchli)",
    pronunciationIPA: '[ˈʃpʁɛçn̩]',
    pronunciationUz: 'shprexen',
    meaningUz: "Gapirmoq, so'zlamoq, nutq so'zlamoq.",
    level: 'A1',
    examples: [
      {
        german: 'Sprechen Sie Deutsch oder Englisch?',
        uzbek: 'Siz nemischa gapirasizmi yoki inglizcha?',
        context: 'Muloqot'
      }
    ],
    synonyms: ['reden', 'sagen', 'unterhalten'],
    antonyms: ['schweigen'],
    grammarNotes: "Kuchli fe'l (e -> i almashinuvi): du sprichst, er spricht. Präteritum: sprach, Perfekt: hat gesprochen.",
    tags: ['muloqot', 'fel', 'a1']
  },
  {
    id: 'de-verstehen',
    german: 'verstehen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (ajralmas prefiks)",
    pronunciationIPA: '[fɛɐ̯ˈʃteːən]',
    pronunciationUz: 'fershteyen',
    meaningUz: "Tushunmoq, anglamoq, fahmlamoq.",
    level: 'A1',
    examples: [
      {
        german: 'Ich verstehe diesen Satz ganz genau.',
        uzbek: 'Men ushbu gapni juda aniq tushunaman.',
        context: 'Anglash'
      }
    ],
    synonyms: ['begreifen', 'nachvollziehen', 'kapieren'],
    antonyms: ['missverstehen'],
    grammarNotes: "ver- ajralmas prefiks. Perfekt: hat verstanden (ge- qo'shilmaydi).",
    tags: ['anglash', 'fel', 'a1']
  },
  {
    id: 'de-schreiben',
    german: 'schreiben',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchli)",
    pronunciationIPA: '[ˈʃʁaɪ̯bn̩]',
    pronunciationUz: 'shrayben',
    meaningUz: "Yozmoq, xat yoki matn bitmoq.",
    level: 'A1',
    examples: [
      {
        german: 'Er schreibt einen Brief an seinen Freund in Deutschland.',
        uzbek: 'U Germaniyadagi do‘stiga xat yozyapti.',
        context: 'Yozishuv'
      }
    ],
    synonyms: ['verfassen', 'notieren', 'tippen'],
    antonyms: ['lesen', 'löschen'],
    grammarNotes: "Kuchli fe'l: schrieb, hat geschrieben.",
    tags: ['yozish', 'fel', 'a1']
  },
  {
    id: 'de-lesen',
    german: 'lesen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (kuchli)",
    pronunciationIPA: '[ˈleːzn̩]',
    pronunciationUz: 'lezen',
    meaningUz: "O'qimoq, mutolaa qilmoq.",
    level: 'A1',
    examples: [
      {
        german: 'Ich lese am liebsten am Abend im Bett ein gutes Buch.',
        uzbek: 'Men eng ko‘p kechqurun karavotda yaxshi kitob o‘qishni yoqtiraman.',
        context: 'Mutolaa'
      }
    ],
    synonyms: ['schmökern', 'studieren'],
    antonyms: [],
    grammarNotes: "e -> ie almashinuvi: du liest, er liest. Präteritum: las, Perfekt: hat gelesen.",
    tags: ['mutolaa', 'fel', 'a1']
  },
  {
    id: 'de-helfen',
    german: 'helfen',
    article: 'none',
    plural: '—',
    partOfSpeech: 'verb',
    partOfSpeechUz: "Fe'l (Dativ talab qiladi)",
    pronunciationIPA: '[ˈhɛlfn̩]',
    pronunciationUz: 'helfen',
    meaningUz: 'Yordam bermoq, ko‘maklashmoq.',
    level: 'A1',
    examples: [
      {
        german: 'Kannst du mir bitte bei den Hausaufgaben helfen?',
        uzbek: 'Uy vazifalarimda menga yordam bera olasanmi?',
        context: 'Ko‘mak'
      }
    ],
    synonyms: ['unterstützen', 'beistehen'],
    antonyms: ['schaden', 'behindern'],
    grammarNotes: "MUHIM: helfen har doim Dativ talab qiladi (hilf MIR, nicht mich). e -> i: du hilfst, er hilft. Perfekt: hat geholfen.",
    tags: ['yordam', 'fel', 'dativ', 'a1']
  },
  {
    id: 'de-schoen',
    german: 'schön',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat',
    pronunciationIPA: '[ʃøːn]',
    pronunciationUz: 'sho‘n',
    meaningUz: "Chiroyli, go'zal, yoqimli.",
    level: 'A1',
    examples: [
      {
        german: 'Das Wetter ist heute besonders schön.',
        uzbek: 'Bugun ob-havo o‘zgacha darajada go‘zal.',
        context: 'Tavsif'
      }
    ],
    synonyms: ['hübsch', 'attraktiv', 'herrlich'],
    antonyms: ['hässlich'],
    grammarNotes: "Sifat: Komparativ: schöner, Superlativ: am schönsten.",
    tags: ['sifat', 'a1']
  },
  {
    id: 'de-schnell',
    german: 'schnell',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat / Ravish',
    pronunciationIPA: '[ʃnɛl]',
    pronunciationUz: 'shnel',
    meaningUz: 'Tez, tezkor, chaqqon.',
    level: 'A1',
    examples: [
      {
        german: 'Der ICE ist ein sehr schneller deutscher Zug.',
        uzbek: 'ICE — bu juda tezyurar nemis poyezdi.',
        context: 'Tezlik'
      }
    ],
    synonyms: ['rasch', 'flott', 'geschwind'],
    antonyms: ['langsam'],
    grammarNotes: "Komparativ: schneller, Superlativ: am schnellsten.",
    tags: ['sifat', 'tezlik', 'a1']
  },
  {
    id: 'de-wichtig',
    german: 'wichtig',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat',
    pronunciationIPA: '[ˈvɪçtɪç]',
    pronunciationUz: 'vixtix',
    meaningUz: 'Muhim, ahamiyatli, zarur.',
    level: 'A1',
    examples: [
      {
        german: 'Gesundheit ist das Wichtigste im Leben.',
        uzbek: 'Salomatlik — hayotdagi eng muhim narsadir.',
        context: 'Qadriyat'
      }
    ],
    synonyms: ['bedeutend', 'wesentlich', 'relevant'],
    antonyms: ['unwichtig', 'nebensächlich'],
    grammarNotes: "Komparativ: wichtiger, Superlativ: am wichtigsten.",
    tags: ['sifat', 'muhim', 'a1']
  },
  {
    id: 'de-gluecklich',
    german: 'glücklich',
    article: 'none',
    plural: '—',
    partOfSpeech: 'adjektiv',
    partOfSpeechUz: 'Sifat',
    pronunciationIPA: '[ˈɡlʏklɪç]',
    pronunciationUz: 'glyuklix',
    meaningUz: 'Baxtli, toleli, saodatmand.',
    level: 'A1',
    examples: [
      {
        german: 'Ich bin so glücklich, dass du da bist.',
        uzbek: 'Yonimda ekanligingdan men shunchalik baxtliman.',
        context: 'Tuyg‘u'
      }
    ],
    synonyms: ['froh', 'selig', 'zufrieden'],
    antonyms: ['traurig', 'unglücklich'],
    grammarNotes: "Komparativ: glücklicher, Superlativ: am glücklichsten.",
    tags: ['sifat', 'baxt', 'a1']
  }
];
