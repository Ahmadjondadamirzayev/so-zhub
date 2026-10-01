import { LingvoQuizQuestion } from '../types';

export const QUIZ_QUESTIONS: LingvoQuizQuestion[] = [
  {
    id: 1,
    question: "'Fasohat' so'zi qanday ma'noni anglatadi?",
    options: [
      "Nutqning ravonligi, sofligi va chiroyli ifodalanishi",
      "Katta boylik va mol-mulkka ega bo'lish",
      "Harbiy janglarda qo'rqmaslik",
      "Tez yugurish va chaqqonlik"
    ],
    correctAnswer: 0,
    explanation: "'Fasohat' arabcha so'z bo'lib, tildagi ravonlik, so'zamollik va notiqlik san'atini bildiradi.",
    category: "ma'no"
  },
  {
    id: 2,
    question: "'Ko'kka ko'tarmoq' iborasi qaysi javobda to'g'ri izohlangan?",
    options: [
      "Samolyotda uchirmoq",
      "Haddan tashqari maqtab, e'zozlamoq",
      "Qo'lidan ushlab yurgizmoq",
      "G'azablanib qattiq urishmoq"
    ],
    correctAnswer: 1,
    explanation: "'Ko'kka ko'tarmoq' — biror kishini yoki narsani juda yuqori baholab, hurmat va e'zozini yuksakka ko'tarishni bildiradi.",
    category: "ibora"
  },
  {
    id: 3,
    question: "'Farosat' so'zining eng yaqin sinonimi qaysi?",
    options: [
      "Qaysarlik",
      "Fahm-idrok",
      "Charchoq",
      "Beparvolik"
    ],
    correctAnswer: 1,
    explanation: "'Farosat' ichki sezgi, aql-idrok, vaziyatni tez va nozik anglash qobiliyatidir.",
    category: "sinonim"
  },
  {
    id: 4,
    question: "Qaysi so'z 'H' harfi bilan to'g'ri yoziladi?",
    options: [
      "Mashxur",
      "Mashhur",
      "Shaxar",
      "Baxo"
    ],
    correctAnswer: 1,
    explanation: "O'zbek adabiy tilida 'mashhur', 'shahar' va 'baho' so'zlari 'H' harfi bilan yoziladi.",
    category: "imlo"
  },
  {
    id: 5,
    question: "'Tamaddun' so'zi qaysi so'z bilan ma'nodosh?",
    options: [
      "Sivilizatsiya",
      "Jaholat",
      "Tabiat",
      "Sayohat"
    ],
    correctAnswer: 0,
    explanation: "'Tamaddun' — arabcha bo'lib, jamiyatning madaniy va ijtimoiy rivojlanish bosqichi, ya'ni sivilizatsiyani anglatadi.",
    category: "sinonim"
  },
  {
    id: 6,
    question: "'Algoritm' atamasi kimning nomi bilan bog'liq?",
    options: [
      "Abu Rayhon Beruniy",
      "Ibn Sino",
      "Muhammad ibn Muso al-Xorazmiy",
      "Mirzo Ulug'bek"
    ],
    correctAnswer: 2,
    explanation: "Muhammad ibn Muso al-Xorazmiy nomi lotinlashtirilib 'Algoritmi' deb atalgan va jahon axborot texnologiyalariga 'algoritm' atamasi sifatida kirgan.",
    category: "etimologiya"
  },
  {
    id: 7,
    question: "'Boshi osmonga yetmoq' iborasi qanday holatda ishlatiladi?",
    options: [
      "Bo'yi juda o'sib ketganda",
      "Cheksiz quvonganda va xursand bo'lganda",
      "Baland tog' cho'qqisiga chiqqanda",
      "Boshyalang yurganda"
    ],
    correctAnswer: 1,
    explanation: "'Boshi osmonga yetmoq' — haddan ziyod baxtiyorlik va quvonch hissini ifodalovchi xalq iborasidir.",
    category: "ibora"
  },
  {
    id: 8,
    question: "'Saodat' so'zining antonimi (qarama-qarshi ma'nosi) qaysi?",
    options: [
      "Iqbol",
      "Kulfat / Baxtsizlik",
      "Shukrona",
      "Fazilat"
    ],
    correctAnswer: 1,
    explanation: "'Saodat' oliy baxt demakdir, uning ziddi kulfat yoki baxtsizlik hisoblanadi.",
    category: "ma'no"
  }
];

export const FIVE_LETTER_WORDS = [
  'BAHOR',
  'KITOB',
  'ZAMON',
  'SHUKR',
  'ILHOM',
  'DARYO',
  'QALAM',
  'BULUT',
  'ORZUY',
  'BILIM',
  'QUYOS',
  'MEHRI',
  'OTAON',
  'SHODL',
  'SHUHR',
  'VAQTI',
  'TALAB',
  'ISBOT',
  'ZIYOS',
  'SAXOM'
];
