// ========================================================
// ADVANCED GERMAN GRAMMAR GAMES DATA (A1 - B2)
// Plural, Wechselpräpositionen, Modalverben, Adjektivdeklination
// ========================================================

export interface PluralGameItem {
  id: string;
  singular: string;
  article: 'der' | 'die' | 'das';
  meaningUz: string;
  correctPlural: string;
  pluralEndingCategory: '-e' | '-(e)n' | '-er (Umlaut)' | '-s' | 'o\'zgarmas (Umlaut)';
  options: string[];
  ruleTip: string;
}

export const PLURAL_GAME_DATA: PluralGameItem[] = [
  {
    id: 'pl-1',
    singular: 'Buch',
    article: 'das',
    meaningUz: 'Kitob',
    correctPlural: 'die Bücher',
    pluralEndingCategory: '-er (Umlaut)',
    options: ['die Bücher', 'die Buchen', 'die Büchs', 'die Buche'],
    ruleTip: 'Ko\'pgina bir bo\'g\'inli neytral (das) otlar ko\'plikda -er qo\'shimchasi oladi va a, o, u harflari umlautga (ä, ö, ü) aylanadi!'
  },
  {
    id: 'pl-2',
    singular: 'Tisch',
    article: 'der',
    meaningUz: 'Stol',
    correctPlural: 'die Tische',
    pluralEndingCategory: '-e',
    options: ['die Tische', 'die Tischen', 'die Tischer', 'die Tischs'],
    ruleTip: 'Ko\'p bir bo\'g\'inli erkak (der) jinsidagi otlar ko\'plikda oddiygina -e oladi.'
  },
  {
    id: 'pl-3',
    singular: 'Frau',
    article: 'die',
    meaningUz: 'Ayol, xonim',
    correctPlural: 'die Frauen',
    pluralEndingCategory: '-(e)n',
    options: ['die Frauen', 'die Fraue', 'die Fräuer', 'die Fraus'],
    ruleTip: 'Ayol jinsidagi (die) otlarning 90% dan ko\'prog\'i ko\'plikda -(e)n qo\'shimchasi bilan yasaladi.'
  },
  {
    id: 'pl-4',
    singular: 'Auto',
    article: 'das',
    meaningUz: 'Mashina, avtomobil',
    correctPlural: 'die Autos',
    pluralEndingCategory: '-s',
    options: ['die Autos', 'die Autoen', 'die Auter', 'die Auton'],
    ruleTip: 'Chet tildan kirib kelgan yoki unli bilan tugaydigan (a, o, i) otlar ko\'plikda -s oladi.'
  },
  {
    id: 'pl-5',
    singular: 'Apfel',
    article: 'der',
    meaningUz: 'Olma',
    correctPlural: 'die Äpfel',
    pluralEndingCategory: 'o\'zgarmas (Umlaut)',
    options: ['die Äpfel', 'die Apfeln', 'die Apfels', 'die Apfele'],
    ruleTip: '-el, -er, -en bilan tugagan otlar hech qanday qo\'shimcha olmaydi, faqat o\'zakdagi a -> ä (Umlaut)ga o\'zgaradi.'
  },
  {
    id: 'pl-6',
    singular: 'Zeitung',
    article: 'die',
    meaningUz: 'Gazeta',
    correctPlural: 'die Zeitungen',
    pluralEndingCategory: '-(e)n',
    options: ['die Zeitungen', 'die Zeitunge', 'die Zeitungs', 'die Zeitünger'],
    ruleTip: '-ung, -heit, -keit, -schaft, -ion bilan tugaydigan barcha otlar ayol jinsida (die) bo\'ladi va ko\'plikda -en oladi.'
  },
  {
    id: 'pl-7',
    singular: 'Kind',
    article: 'das',
    meaningUz: 'Bola, go\'dak',
    correctPlural: 'die Kinder',
    pluralEndingCategory: '-er (Umlaut)',
    options: ['die Kinder', 'die Kinden', 'die Kinds', 'die Kinde'],
    ruleTip: '«das Kind» so\'zi ko\'plikda -er olib «die Kinder»ga aylanadi.'
  },
  {
    id: 'pl-8',
    singular: 'Lehrer',
    article: 'der',
    meaningUz: 'O\'qituvchi',
    correctPlural: 'die Lehrer',
    pluralEndingCategory: 'o\'zgarmas (Umlaut)',
    options: ['die Lehrer', 'die Lehrern', 'die Lehrers', 'die Löhrer'],
    ruleTip: '-er bilan tugovchi kasb nomlari ko\'plikda mutlaqo o\'zgarmaydi (der Lehrer -> die Lehrer).'
  }
];

export interface PrepositionGameItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  questionType: 'Wo? (Dativ) — Tinch holat' | 'Wohin? (Akkusativ) — Harakat yo\'nalishi';
  correctAnswer: string;
  options: string[];
  ruleTip: string;
  meaningUz: string;
}

export const PREPOSITION_GAME_DATA: PrepositionGameItem[] = [
  {
    id: 'prep-1',
    sentenceBefore: 'Ich lege das Buch auf',
    sentenceAfter: 'Tisch (der).',
    questionType: 'Wohin? (Akkusativ) — Harakat yo\'nalishi',
    correctAnswer: 'den',
    options: ['den', 'dem', 'der', 'das'],
    ruleTip: '«legen» (qo\'ymoq) harakatni bildiradi va «Wohin?» (qayerga?) so\'rog\'iga javob bo\'ladi -> Akkusativ (der Tisch -> den Tisch).',
    meaningUz: 'Men kitobni stol ustiga qo\'yyapman.'
  },
  {
    id: 'prep-2',
    sentenceBefore: 'Das Buch liegt auf',
    sentenceAfter: 'Tisch (der).',
    questionType: 'Wo? (Dativ) — Tinch holat',
    correctAnswer: 'dem',
    options: ['dem', 'den', 'das', 'der'],
    ruleTip: '«liegen» (yotmoq) tinch holatni bildiradi va «Wo?» (qayerda?) so\'rog\'iga javob bo\'ladi -> Dativ (der Tisch -> dem Tisch).',
    meaningUz: 'Kitob stol ustida yotibdi.'
  },
  {
    id: 'prep-3',
    sentenceBefore: 'Wir gehen heute in',
    sentenceAfter: 'Kino (das).',
    questionType: 'Wohin? (Akkusativ) — Harakat yo\'nalishi',
    correctAnswer: 'das',
    options: ['das', 'dem', 'den', 'der'],
    ruleTip: '«gehen» (bormoq) harakatni bildiradi -> Akkusativ (in das Kino / ins Kino).',
    meaningUz: 'Biz bugun kinoteatrga boryapmiz.'
  },
  {
    id: 'prep-4',
    sentenceBefore: 'Wir sind jetzt in',
    sentenceAfter: 'Kino (das).',
    questionType: 'Wo? (Dativ) — Tinch holat',
    correctAnswer: 'dem',
    options: ['dem', 'das', 'den', 'der'],
    ruleTip: '«sein» (bo\'lmoq) qayerda? (Wo?) so\'rog\'iga javob beradi -> Dativ (in dem Kino / im Kino).',
    meaningUz: 'Biz hozir kinoteatrdamiz.'
  },
  {
    id: 'prep-5',
    sentenceBefore: 'Er hängt das Bild an',
    sentenceAfter: 'Wand (die).',
    questionType: 'Wohin? (Akkusativ) — Harakat yo\'nalishi',
    correctAnswer: 'die',
    options: ['die', 'der', 'den', 'dem'],
    ruleTip: 'Rasm osish harakati (Wohin?) -> Akkusativ. Ayol jinsi die -> die ligicha qoladi.',
    meaningUz: 'U rasmni devorga osyapti.'
  },
  {
    id: 'prep-6',
    sentenceBefore: 'Das Bild hängt an',
    sentenceAfter: 'Wand (die).',
    questionType: 'Wo? (Dativ) — Tinch holat',
    correctAnswer: 'der',
    options: ['der', 'die', 'dem', 'den'],
    ruleTip: 'Rasm devorda osilib turibdi (Wo?) -> Dativ. Ayol jinsi die -> der Wandga aylanadi!',
    meaningUz: 'Rasm devorda osilib turibdi.'
  },
  {
    id: 'prep-7',
    sentenceBefore: 'Der Hund schläft unter',
    sentenceAfter: 'Bett (das).',
    questionType: 'Wo? (Dativ) — Tinch holat',
    correctAnswer: 'dem',
    options: ['dem', 'das', 'den', 'des'],
    ruleTip: 'It karovot tagida uxlayapti (Wo?) -> Dativ: das Bett -> dem Bett.',
    meaningUz: 'It karovot tagida uxlamoqda.'
  }
];

export interface ModalGameItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  infinitiveModal: string;
  pronoun: string;
  meaningUz: string;
  correctForm: string;
  options: string[];
  ruleTip: string;
}

export const MODAL_GAME_DATA: ModalGameItem[] = [
  {
    id: 'mod-1',
    sentenceBefore: 'Ich',
    sentenceAfter: 'sehr gut Deutsch sprechen. (können)',
    infinitiveModal: 'können (qobiliyat / qila olmoq)',
    pronoun: 'ich',
    meaningUz: 'Men nemis tilida juda yaxshi gapira olaman.',
    correctForm: 'kann',
    options: ['kann', 'könne', 'kannst', 'konnt'],
    ruleTip: '«können» modal fe\'li 1-shaxsda o\'zak unlisini o\'zgartiradi va qo\'shimcha olmaydi: ich kann (er/sie/es kann).'
  },
  {
    id: 'mod-2',
    sentenceBefore: 'Du',
    sentenceAfter: 'heute für die Prüfung lernen. (müssen)',
    infinitiveModal: 'müssen (majburiyat / kerak)',
    pronoun: 'du',
    meaningUz: 'Sen bugun imtihon uchun o\'rganishing shart.',
    correctForm: 'musst',
    options: ['musst', 'müsst', 'muss', 'mussen'],
    ruleTip: '«müssen» 2-shaxsda umlautsini yo\'qotadi: du musst.'
  },
  {
    id: 'mod-3',
    sentenceBefore: 'Hier',
    sentenceAfter: 'man nicht rauchen! (dürfen)',
    infinitiveModal: 'dürfen (ruxsat / huquq)',
    pronoun: 'man (er/sie/es)',
    meaningUz: 'Bu yerda chekish taqiqlanadi (ruxsat etilmaydi)!',
    correctForm: 'darf',
    options: ['darf', 'dürft', 'darfst', 'dürfe'],
    ruleTip: '«dürfen» 3-shaxsda (man): man darf nicht (chekish mumkin emas).'
  },
  {
    id: 'mod-4',
    sentenceBefore: 'Wir',
    sentenceAfter: 'im Sommer nach Deutschland reisen. (wollen)',
    infinitiveModal: 'wollen (xohish / reja)',
    pronoun: 'wir',
    meaningUz: 'Biz yozda Germaniyaga sayohat qilmoqchimiz.',
    correctForm: 'wollen',
    options: ['wollen', 'willt', 'wollt', 'willen'],
    ruleTip: 'Ko\'plik 1-shaxsda (wir) modal fe\'l infinitiv shakli bilan bir xil bo\'ladi: wir wollen.'
  },
  {
    id: 'mod-5',
    sentenceBefore: 'Er',
    sentenceAfter: 'zum Arzt gehen, er ist krank. (sollen)',
    infinitiveModal: 'sollen (maslahat / topshiriq)',
    pronoun: 'er',
    meaningUz: 'U shifokorga borishi kerak, u kasal.',
    correctForm: 'soll',
    options: ['soll', 'sollt', 'sollst', 'sölle'],
    ruleTip: '«sollen» 1- va 3-shaxsda qo\'shimchasiz «soll» bo\'ladi: ich soll, er/sie/es soll.'
  }
];

export interface AdjektivGameItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  baseAdjective: string;
  articleType: 'Aniq artikl (der, die, das)' | 'Noaniq artikl (ein, eine)' | 'Artiklsiz (Nullartikel)';
  correctEnding: string;
  fullWord: string;
  options: string[];
  ruleTip: string;
  meaningUz: string;
}

export const ADJEKTIV_GAME_DATA: AdjektivGameItem[] = [
  {
    id: 'adj-1',
    sentenceBefore: 'Der',
    sentenceAfter: 'Mann hilft mir immer. (alt)',
    baseAdjective: 'alt (qari)',
    articleType: 'Aniq artikl (der, die, das)',
    correctEnding: '-e',
    fullWord: 'alte',
    options: ['alte', 'alter', 'alten', 'altes'],
    ruleTip: 'Aniq artikldan keyin (der) bosh kelishikda (Nominativ) sifat har doim faqat «-e» oladi (der alte Mann).',
    meaningUz: 'Qari kishi menga har doim yordam beradi.'
  },
  {
    id: 'adj-2',
    sentenceBefore: 'Das ist ein',
    sentenceAfter: 'Buch. (interessant)',
    baseAdjective: 'interessant (qiziqarli)',
    articleType: 'Noaniq artikl (ein, eine)',
    correctEnding: '-es',
    fullWord: 'interessantes',
    options: ['interessantes', 'interessante', 'interessanter', 'interessanten'],
    ruleTip: 'Noaniq artikl «ein» jinsni ko\'rsatmagani uchun, sifat das ning belgisini «-es» qilib o\'ziga oladi: ein interessantes Buch.',
    meaningUz: 'Bu qiziqarli kitob.'
  },
  {
    id: 'adj-3',
    sentenceBefore: 'Ich trinke mit den',
    sentenceAfter: 'Freunden Kaffee. (neu)',
    baseAdjective: 'neu (yangi)',
    articleType: 'Aniq artikl (der, die, das)',
    correctEnding: '-en',
    fullWord: 'neuen',
    options: ['neuen', 'neue', 'neuer', 'neues'],
    ruleTip: 'Dativ yoki ko\'plikda aniq artikldan keyin sifat har doim istisnosiz «-en» oladi: mit den neuen Freunden.',
    meaningUz: 'Men yangi do\'stlar bilan qahva ichyapman.'
  },
  {
    id: 'adj-4',
    sentenceBefore: 'Sie ist eine',
    sentenceAfter: 'Frau. (schön)',
    baseAdjective: 'schön (chiroyli)',
    articleType: 'Noaniq artikl (ein, eine)',
    correctEnding: '-e',
    fullWord: 'schöne',
    options: ['schöne', 'schöner', 'schönes', 'schönen'],
    ruleTip: 'Ayol jinsida «eine» dan keyin sifat «-e» oladi: eine schöne Frau.',
    meaningUz: 'U chiroyli ayol.'
  },
  {
    id: 'adj-5',
    sentenceBefore: 'Ich habe einen',
    sentenceAfter: 'Hund. (groß)',
    baseAdjective: 'groß (katta)',
    articleType: 'Noaniq artikl (ein, eine)',
    correctEnding: '-en',
    fullWord: 'großen',
    options: ['großen', 'große', 'großer', 'großes'],
    ruleTip: 'Akkusativ erkak jinsida (einen) sifat har doim «-en» oladi: einen großen Hund.',
    meaningUz: 'Mening katta itim bor.'
  }
];
