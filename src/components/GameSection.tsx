import React, { useState, useEffect, useMemo } from 'react';
import { AlphabetMode, GermanWordEntry, CEFRLevel, BlitzScheduledWord } from '../types';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Volume2, 
  Timer, 
  Layers, 
  BrainCircuit, 
  Zap, 
  Check, 
  X, 
  Award, 
  ChevronRight, 
  HelpCircle, 
  Plus,
  BookOpen,
  Calendar
} from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';
import { 
  PLURAL_GAME_DATA, 
  PREPOSITION_GAME_DATA, 
  MODAL_GAME_DATA, 
  ADJEKTIV_GAME_DATA 
} from '../data/grammarGamesData';

interface GameSectionProps {
  alphabet: AlphabetMode;
  words?: GermanWordEntry[];
  blitzWords?: BlitzScheduledWord[];
  onOpenAddWord?: () => void;
  isAdmin?: boolean;
  onEarnXP?: (points: number, isNewWord?: boolean) => void;
  userLevel?: CEFRLevel;
}

// ARTIKEL MEISTER DATA (der, die, das)
interface ArtikelWord {
  word: string;
  article: 'der' | 'die' | 'das';
  meaningUz: string;
  plural: string;
  ruleHint: string;
}

const ARTIKEL_WORDS: ArtikelWord[] = [
  { word: 'Tisch', article: 'der', meaningUz: 'Stol', plural: 'die Tische', ruleHint: 'Aksariyat bir bo\'g\'inli mebel buyumlari erkak jinsida.' },
  { word: 'Sonne', article: 'die', meaningUz: 'Quyosh', plural: '—', ruleHint: '-e bilan tugaydigan ko\'plab tabiat so\'zlari ayol jinsida bo\'ladi.' },
  { word: 'Buch', article: 'das', meaningUz: 'Kitob', plural: 'die Bücher', ruleHint: 'Ko\'p o\'quv qurollari va materiallar neytral (das).' },
  { word: 'Apfel', article: 'der', meaningUz: 'Olma', plural: 'die Äpfel', ruleHint: 'Ko\'pgina mevalar ayol jinsida, lekin der Apfel istisno.' },
  { word: 'Auto', article: 'das', meaningUz: 'Mashina', plural: 'die Autos', ruleHint: 'Texnika vositalarining ko\'pi das bo\'ladi.' },
  { word: 'Katze', article: 'die', meaningUz: 'Mushuk', plural: 'die Katzen', ruleHint: '-e bilan tugaydigan jonivorlar ko\'pincha die.' },
  { word: 'Hund', article: 'der', meaningUz: 'It', plural: 'die Hunde', ruleHint: 'Bir bo\'g\'inli erkak jinsiga mansub jonivorlar der.' },
  { word: 'Fenster', article: 'das', meaningUz: 'Deraza', plural: 'die Fenster', ruleHint: 'Bino qismlarining ko\'pchiligi das.' },
  { word: 'Schule', article: 'die', meaningUz: 'Maktab', plural: 'die Schulen', ruleHint: '-e bilan tugovchi ijtimoiy muassasalar die.' },
  { word: 'Lehrer', article: 'der', meaningUz: 'O\'qituvchi (erkak)', plural: 'die Lehrer', ruleHint: '-er bilan tugovchi kasblar der bo\'ladi.' },
  { word: 'Freiheit', article: 'die', meaningUz: 'Ozodlik, erkinlik', plural: 'die Freiheiten', ruleHint: '-heit qo\'shimchasi har doim die bo\'ladi!' },
  { word: 'Mädchen', article: 'das', meaningUz: 'Qizaloq', plural: 'die Mädchen', ruleHint: '-chen kichraytirish qo\'shimchasi har doim das bo\'ladi!' },
  { word: 'Zeitung', article: 'die', meaningUz: 'Gazeta', plural: 'die Zeitungen', ruleHint: '-ung qo\'shimchasi bilan tugagan barcha so\'zlar die bo\'ladi.' },
  { word: 'Computer', article: 'der', meaningUz: 'Kompyuter', plural: 'die Computer', ruleHint: 'Ingliz tilidan kirgan texnik vositalar ko\'pincha der.' },
  { word: 'Wasser', article: 'das', meaningUz: 'Suv', plural: '—', ruleHint: 'Suyuqliklar va elementlarning ko\'pi das.' },
  { word: 'Musik', article: 'die', meaningUz: 'Musiqa', plural: '—', ruleHint: '-ik bilan tugovchi san\'at tushunchalari die.' },
  { word: 'Kaffee', article: 'der', meaningUz: 'Qahva', plural: '—', ruleHint: 'Ichimliklar (issiq va spirtli) ko\'pincha der bo\'ladi.' },
  { word: 'Haus', article: 'das', meaningUz: 'Uy', plural: 'die Häuser', ruleHint: 'Boshpana va binolar ko\'pincha das.' }
];

// MEMORY CARDS (WORT-PAARE)
interface MemoryPair {
  id: string;
  german: string;
  uzbek: string;
}

const MEMORY_BANK: MemoryPair[] = [
  { id: '1', german: 'Guten Tag', uzbek: 'Xayrli kun' },
  { id: '2', german: 'Danke schön', uzbek: 'Katta rahmat' },
  { id: '3', german: 'Auf Wiedersehen', uzbek: 'Ko\'rishguncha xayr' },
  { id: '4', german: 'das Buch', uzbek: 'Kitob' },
  { id: '5', german: 'die Sonne', uzbek: 'Quyosh' },
  { id: '6', german: 'der Freund', uzbek: 'Do\'st' },
  { id: '7', german: 'das Haus', uzbek: 'Uy' },
  { id: '8', german: 'das Wasser', uzbek: 'Suv' },
];

// SPEED BLITZ QUESTIONS (BLITZ-WORT)
interface BlitzItem {
  german: string;
  shownTranslation: string;
  isCorrect: boolean;
  correctMeaning: string;
}

const BLITZ_ITEMS: BlitzItem[] = [
  { german: 'Guten Morgen', shownTranslation: 'Xayrli tong', isCorrect: true, correctMeaning: 'Xayrli tong' },
  { german: 'Entschuldigung', shownTranslation: 'Rahmat', isCorrect: false, correctMeaning: 'Kechirasiz / Uzr' },
  { german: 'das Brot', shownTranslation: 'Non', isCorrect: true, correctMeaning: 'Non' },
  { german: 'die Katze', shownTranslation: 'It', isCorrect: false, correctMeaning: 'Mushuk' },
  { german: 'der Tisch', shownTranslation: 'Stol', isCorrect: true, correctMeaning: 'Stol' },
  { german: 'schön', shownTranslation: 'Chiroyli', isCorrect: true, correctMeaning: 'Chiroyli' },
  { german: 'schnell', shownTranslation: 'Sekin', isCorrect: false, correctMeaning: 'Tez' },
  { german: 'lernen', shownTranslation: 'O\'rganmoq', isCorrect: true, correctMeaning: 'O\'rganmoq' },
  { german: 'schlafen', shownTranslation: 'Yugurmoq', isCorrect: false, correctMeaning: 'Uxlamoq' },
  { german: 'sprechen', shownTranslation: 'Gapirmoq', isCorrect: true, correctMeaning: 'Gapirmoq' },
  { german: 'immer', shownTranslation: 'Hech qachon', isCorrect: false, correctMeaning: 'Har doim' },
  { german: 'zusammen', shownTranslation: 'Birga / Birgalikda', isCorrect: true, correctMeaning: 'Birga' },
];

// SCRAMBLED WORDS (BUCHSTABENSALAT)
interface ScrambledItem {
  word: string;
  meaningUz: string;
  hint: string;
}

const SCRAMBLED_ITEMS: ScrambledItem[] = [
  { word: 'DEUTSCH', meaningUz: 'Nemis tili', hint: 'O\'rganayotgan tilingiz' },
  { word: 'SCHULE', meaningUz: 'Maktab', hint: 'Ta\'lim maskani' },
  { word: 'FREUND', meaningUz: 'Do\'st', hint: 'Eng yaqin insoningiz' },
  { word: 'SOMMER', meaningUz: 'Yoz fasli', hint: 'Issiq fasl' },
  { word: 'WINTER', meaningUz: 'Qish fasli', hint: 'Qorli sovuq fasl' },
  { word: 'KAFFEE', meaningUz: 'Qahva', hint: 'Ertalabki issiq ichimlik' },
  { word: 'ARBEIT', meaningUz: 'Ish / Faoliyat', hint: 'Kasb-hunar' },
];

// GERMAN VOCABULARY QUIZ
interface QuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const GERMAN_QUIZZES: QuizItem[] = [
  {
    question: '«Auf Wiedersehen» iborasining to\'g\'ri ma\'nosi nima?',
    options: ['Xayrli tong', 'Kechirasiz', 'Ko\'rishguncha xayr', 'Marhamat'],
    correct: 2,
    explanation: 'Auf Wiedersehen — rasmiy holatlarda «Ko\'rishguncha xayr» ma\'nosida ishlatiladi.'
  },
  {
    question: '«die Freiheit» (ozodlik) so\'zi nega «die» artiklini oladi?',
    options: ['Erkak jinsiga oid', '-heit qo\'shimchasi har doim ayol jinsi (die) yasaydi', 'Qisqa so\'z bo\'lgani uchun', 'Neytral jins bo\'lgani uchun'],
    correct: 1,
    explanation: 'Nemis tilida -heit, -keit, -ung, -schaft bilan tugaydigan barcha otlar qat\'iy ravishda "die" bo\'ladi.'
  },
  {
    question: '«Ich habe Hunger» jumlasining ma\'nosi qaysi?',
    options: ['Mening qornim och', 'Men chanqadim', 'Men kechikdim', 'Men xursandman'],
    correct: 0,
    explanation: 'Nemis tilida qorin ochish holati «Ich habe Hunger» (Menda ochlik bor) tarzida ifodalanadi.'
  },
  {
    question: '«der Apfel» so\'zining ko\'plik shakli qanday bo\'ladi?',
    options: ['die Apfeln', 'die Äpfel', 'die Apfels', 'die Äpfele'],
    correct: 1,
    explanation: 'der Apfel ko\'plikda umlaut oladi va "die Äpfel" bo\'ladi.'
  },
  {
    question: '«Bitte» so\'zi qaysi ma\'nolarda ishlatilishi mumkin?',
    options: ['Faqat «Iltimos»', 'Faqat «Rahmat»', '«Iltimos», «Marhamat» va «Arzimaydi»', 'Faqat «Salom»'],
    correct: 2,
    explanation: 'Nemis tilida «Bitte» juda ko\'p qirrali: iltimos qilganda ham, biror narsa berayotganda («marhamat») ham va «arzimaydi» o\'rnida ham aytiladi.'
  }
];

// ==========================================
// 7. KASUS TRAINER DATA (Akkusativ, Dativ & Genitiv)
// ==========================================
export interface KasusItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  nounWithArticle: string;
  correctAnswer: string;
  options: string[];
  caseType: 'Akkusativ' | 'Dativ' | 'Genitiv';
  ruleExplanation: string;
  meaningUz: string;
}

export const KASUS_DATA: KasusItem[] = [
  {
    id: 'k-1',
    sentenceBefore: 'Ich gebe',
    sentenceAfter: 'Mann (der) den roten Apfel.',
    nounWithArticle: 'der Mann',
    correctAnswer: 'dem',
    options: ['dem', 'den', 'der', 'das'],
    caseType: 'Dativ',
    ruleExplanation: '«geben» (bermoq) fe\'li kimga? savoliga javob bo\'lib, Dativ talab qiladi. Erkak jinsi (der) Dativda «dem»ga aylanadi!',
    meaningUz: 'Men kishiga qizil olmani beryapman.'
  },
  {
    id: 'k-2',
    sentenceBefore: 'Ich sehe',
    sentenceAfter: 'Hund (der) im grünen Park.',
    nounWithArticle: 'der Hund',
    correctAnswer: 'den',
    options: ['den', 'dem', 'das', 'der'],
    caseType: 'Akkusativ',
    ruleExplanation: '«sehen» (ko\'rmoq) fe\'li to\'g\'ridan-to\'g\'ri to\'ldiruvchi (kimni? nimani?) bo\'lib Akkusativ oladi. Erkak jinsidagi «der» -> «den» bo\'ladi.',
    meaningUz: 'Men yashil bog\'da itni ko\'ryapman.'
  },
  {
    id: 'k-3',
    sentenceBefore: 'Wir fahren jeden Morgen mit',
    sentenceAfter: 'Bus (der) zur Arbeit.',
    nounWithArticle: 'der Bus',
    correctAnswer: 'dem',
    options: ['dem', 'den', 'des', 'der'],
    caseType: 'Dativ',
    ruleExplanation: '«mit» predlogi har doim va qat\'iy Dativ talab qiladi! «der Bus» -> «mit dem Bus».',
    meaningUz: 'Biz har tong avtobus bilan ishga boramiz.'
  },
  {
    id: 'k-4',
    sentenceBefore: 'Das schöne Geschenk ist für',
    sentenceAfter: 'Mutter (die).',
    nounWithArticle: 'die Mutter',
    correctAnswer: 'die',
    options: ['die', 'der', 'den', 'dem'],
    caseType: 'Akkusativ',
    ruleExplanation: '«für» predlogi har doim Akkusativ talab qiladi. Ayol jinsi (die) Akkusativda «die»ligicha qoladi.',
    meaningUz: 'Bu ajoyib sovg\'a ona uchun.'
  },
  {
    id: 'k-5',
    sentenceBefore: 'Er hilft',
    sentenceAfter: 'Freundin (die) bei den Hausaufgaben.',
    nounWithArticle: 'die Freundin',
    correctAnswer: 'der',
    options: ['der', 'die', 'den', 'dem'],
    caseType: 'Dativ',
    ruleExplanation: '«helfen» (yordam bermoq) fe\'li doim Dativ oladi! Ayol jinsi (die) Dativda «der»ga aylanadi: «der Freundin».',
    meaningUz: 'U dugonasiga uy vazifalarida ko\'maklashmoqda.'
  },
  {
    id: 'k-6',
    sentenceBefore: 'Wir gehen heute ohne',
    sentenceAfter: 'Regenschirm (der) spazieren.',
    nounWithArticle: 'der Regenschirm',
    correctAnswer: 'den',
    options: ['den', 'dem', 'der', 'des'],
    caseType: 'Akkusativ',
    ruleExplanation: '«ohne» (siz, -siz) predlogi har doim Akkusativ talab qiladi! der -> den Regenschirm.',
    meaningUz: 'Biz bugun soyabonsiz sayrga ketyapmiz.'
  },
  {
    id: 'k-7',
    sentenceBefore: 'Die Farbe',
    sentenceAfter: 'Autos (das) ist sehr modern.',
    nounWithArticle: 'das Auto',
    correctAnswer: 'des',
    options: ['des', 'dem', 'das', 'der'],
    caseType: 'Genitiv',
    ruleExplanation: 'Qaratqich kelishigi (Genitiv: nimaning?). O\'rta jins (das) Genitivda «des» bo\'lib, otga «-s» qo\'shiladi: des Autos.',
    meaningUz: 'Mashinaning rangi juda zamonaviy.'
  },
  {
    id: 'k-8',
    sentenceBefore: 'Nach',
    sentenceAfter: 'Unterricht (der) gehe ich sofort nach Hause.',
    nounWithArticle: 'der Unterricht',
    correctAnswer: 'dem',
    options: ['dem', 'den', 'der', 'des'],
    caseType: 'Dativ',
    ruleExplanation: '«nach» (so\'ng, keyin) predlogi doim Dativ oladi! der Unterricht -> nach dem Unterricht.',
    meaningUz: 'Darsdan so\'ng men darhol uyga boraman.'
  }
];

// ==========================================
// 8. VERB-KONJUGATION DATA
// ==========================================
export interface VerbKonjugationItem {
  id: string;
  infinitive: string;
  meaningUz: string;
  subject: string;
  sentencePattern: string;
  correctForm: string;
  options: string[];
  ruleTip: string;
}

export const VERB_KONJUGATION_DATA: VerbKonjugationItem[] = [
  {
    id: 'vk-1',
    infinitive: 'fahren',
    meaningUz: 'transportda bormoq / haydamoq',
    subject: 'du',
    sentencePattern: 'Wohin ___ du am kommenden Wochenende?',
    correctForm: 'fährst',
    options: ['fährst', 'fahrst', 'fahrt', 'fahre'],
    ruleTip: '«fahren» kuchli fe\'l: 2- va 3-shaxs birlikda o\'zak unlisi o\'zgaradi: a -> ä (du fährst, er fährt).'
  },
  {
    id: 'vk-2',
    infinitive: 'sprechen',
    meaningUz: 'gapirmoq / so\'zlamoq',
    subject: 'er',
    sentencePattern: 'Er ___ fließend Deutsch und Usbekisch.',
    correctForm: 'spricht',
    options: ['spricht', 'sprecht', 'sprechet', 'sprach'],
    ruleTip: '«sprechen» fe\'lida o\'zak e -> i ga almashadi: ich spreche, du sprichst, er spricht.'
  },
  {
    id: 'vk-3',
    infinitive: 'sehen',
    meaningUz: 'ko\'rmoq',
    subject: 'du',
    sentencePattern: '___ du den großen Vogel dort auf dem Baum?',
    correctForm: 'Siehst',
    options: ['Siehst', 'Sehst', 'Seht', 'Sieht'],
    ruleTip: '«sehen» fe\'lida e -> ie ga aylanadi: du siehst, er sieht.'
  },
  {
    id: 'vk-4',
    infinitive: 'sein',
    meaningUz: 'bo\'lmoq',
    subject: 'ihr',
    sentencePattern: 'Wo ___ ihr gestern Nachmittag gewesen?',
    correctForm: 'seid',
    options: ['seid', 'sind', 'bist', 'seid ihr'],
    ruleTip: '«sein» fe\'lining maxsus tuslanishi: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'
  },
  {
    id: 'vk-5',
    infinitive: 'helfen',
    meaningUz: 'yordam bermoq',
    subject: 'sie (u - ayol)',
    sentencePattern: 'Sie ___ ihrer Mutter sehr gerne in der Küche.',
    correctForm: 'hilft',
    options: ['hilft', 'helft', 'helfen', 'half'],
    ruleTip: '«helfen» fe\'lida e -> i ga o\'zgaradi: du hilfst, er/sie/es hilft.'
  },
  {
    id: 'vk-6',
    infinitive: 'haben',
    meaningUz: 'ega bo\'lmoq',
    subject: 'du',
    sentencePattern: '___ du heute Abend Zeit für ein Gespräch?',
    correctForm: 'Hast',
    options: ['Hast', 'Habst', 'Habt', 'Hattest'],
    ruleTip: '«haben» fe\'lida 2- va 3-shaxsda «-b-» harfi tushib qoladi: du hast, er hat.'
  },
  {
    id: 'vk-7',
    infinitive: 'wissen',
    meaningUz: 'bilmoq (faktni)',
    subject: 'ich',
    sentencePattern: 'Ich ___ die richtige Antwort auf diese Frage.',
    correctForm: 'weiß',
    options: ['weiß', 'wisse', 'weißt', 'wisst'],
    ruleTip: '«wissen» modal fe\'llarga o\'xshab tuslanadi: ich weiß, du weißt, er weiß (1 va 3-shaxs teng bo\'ladi).'
  }
];

// ==========================================
// 9. SATZBAU DATA (Nemischa to'g'ri gap tuzish)
// ==========================================
export interface SatzbauItem {
  id: string;
  words: string[];
  correctOrder: string[];
  meaningUz: string;
  ruleExplanation: string;
}

export const SATZBAU_DATA: SatzbauItem[] = [
  {
    id: 'sb-1',
    words: ['Deutsch.', 'lerne', 'Ich', 'fleißig', 'jeden Tag'],
    correctOrder: ['Ich', 'lerne', 'jeden Tag', 'fleißig', 'Deutsch.'],
    meaningUz: 'Men har kuni nemis tilini qunt bilan o\'rganaman.',
    ruleExplanation: 'Asosiy gapda (Hauptsatz) tuslangan fe\'l (lerne) har doim qat\'iy 2-o\'rinda turadi!'
  },
  {
    id: 'sb-2',
    words: ['nach Berlin.', 'Morgen', 'wir', 'fahren'],
    correctOrder: ['Morgen', 'fahren', 'wir', 'nach Berlin.'],
    meaningUz: 'Ertaga biz Berlinga boramiz.',
    ruleExplanation: 'Inversiya qoidasi: agar gap vaqt holi (Morgen) bilan boshlansa, fe\'l (fahren) baribir 2-o\'rinda qoladi va ega (wir) fe\'ldan keyin keladi.'
  },
  {
    id: 'sb-3',
    words: ['bleiben', 'weil', 'regnet.', 'es', 'Wir', 'zu Hause,'],
    correctOrder: ['Wir', 'bleiben', 'zu Hause,', 'weil', 'es', 'regnet.'],
    meaningUz: 'Biz uyda qolamiz, chunki yomg\'ir yog\'yapti.',
    ruleExplanation: '«weil» (chunki) bog\'lovchisi ergash gap (Nebensatz) yasaydi va fe\'l (regnet) gapning eng oxiriga suriladi!'
  },
  {
    id: 'sb-4',
    words: ['Gestern', 'haben', 'gelesen.', 'ein Buch', 'wir'],
    correctOrder: ['Gestern', 'haben', 'wir', 'ein Buch', 'gelesen.'],
    meaningUz: 'Kecha biz kitob o\'qidik.',
    ruleExplanation: 'Perfekt o\'tgan zamonida yordamchi fe\'l (haben) 2-o\'rinda, asosiy fe\'l Partizip II (gelesen) esa gapning eng oxirida turadi!'
  }
];

// ==========================================
// 10. PERFEKT & PARTIZIP II DATA
// ==========================================
export interface PerfektItem {
  id: string;
  sentenceWithBlank: string;
  correctAux: string;
  correctPartizip: string;
  optionsAux: string[];
  optionsPartizip: string[];
  infinitive: string;
  meaningUz: string;
  ruleTip: string;
}

export const PERFEKT_DATA: PerfektItem[] = [
  {
    id: 'p-1',
    sentenceWithBlank: 'Ich ___ gestern nach Berlin ___.',
    correctAux: 'bin',
    correctPartizip: 'gefahren',
    optionsAux: ['bin', 'habe', 'ist', 'hat'],
    optionsPartizip: ['gefahren', 'gefahrn', 'gefahrt', 'fahren'],
    infinitive: 'fahren',
    meaningUz: 'Men kecha Berlinga bordim.',
    ruleTip: 'Joydan-joyga harakatlanish (Ortsveränderung) bo\'lgani uchun «sein» yordamchi fe\'li olinadi: ich bin ... gefahren.'
  },
  {
    id: 'p-2',
    sentenceWithBlank: 'Wir ___ fleißig neue Vokabeln ___.',
    correctAux: 'haben',
    correctPartizip: 'gelernt',
    optionsAux: ['haben', 'sind', 'hat', 'seid'],
    optionsPartizip: ['gelernt', 'gelernen', 'gelerntet', 'lernen'],
    infinitive: 'lernen',
    meaningUz: 'Biz yangi so\'zlarni qunt bilan o\'rgandik.',
    ruleTip: 'Tranzitiv muntazam fe\'llar «haben» oladi: ge + lern + t = gelernt.'
  },
  {
    id: 'p-3',
    sentenceWithBlank: 'Er ___ heute sehr früh ___.',
    correctAux: 'ist',
    correctPartizip: 'aufgestanden',
    optionsAux: ['ist', 'hat', 'bin', 'haben'],
    optionsPartizip: ['aufgestanden', 'aufgesteht', 'geaufstanden', 'aufgestandenet'],
    infinitive: 'aufstehen',
    meaningUz: 'U bugun juda erta o\'rnidan turdi.',
    ruleTip: 'Holat o\'zgarishi (Zustandswechsel) va ajraluvchi fe\'l: «sein» oladi va «-ge-» prefiks bilan o\'zak orasiga kiradi (auf + ge + standen).'
  },
  {
    id: 'p-4',
    sentenceWithBlank: 'Hast du deine Hausaufgabe ___?',
    correctAux: 'hast',
    correctPartizip: 'gemacht',
    optionsAux: ['hast', 'bist', 'hat', 'ist'],
    optionsPartizip: ['gemacht', 'gemachen', 'gemachted', 'machen'],
    infinitive: 'machen',
    meaningUz: 'Uy vazifangni bajardingmi?',
    ruleTip: '«machen» fe\'li «haben» oladi: hast ... gemacht.'
  },
  {
    id: 'p-5',
    sentenceWithBlank: 'Sie ___ am Wochenende zu Hause ___.',
    correctAux: 'ist',
    correctPartizip: 'geblieben',
    optionsAux: ['ist', 'hat', 'haben', 'wurde'],
    optionsPartizip: ['geblieben', 'gebleibt', 'bleiben', 'gebleibend'],
    infinitive: 'bleiben',
    meaningUz: 'U dam olish kunlari uyda qoldi.',
    ruleTip: '«bleiben» (qolmoq) fe\'li harakat bo\'lmasa ham, istisno tariqasida har doim «sein» oladi: ist geblieben!'
  }
];

export const GameSection: React.FC<GameSectionProps> = ({ 
  alphabet, 
  words = [], 
  blitzWords = [],
  onOpenAddWord, 
  isAdmin = false,
  onEarnXP,
  userLevel = 'A1'
}) => {
  const [activeGame, setActiveGame] = useState<
    | 'artikel' 
    | 'pairs' 
    | 'blitz' 
    | 'scramble' 
    | 'quiz' 
    | 'audio' 
    | 'kasus' 
    | 'verb' 
    | 'satzbau' 
    | 'perfekt'
    | 'plural'
    | 'preposition'
    | 'modal'
    | 'adjektiv'
  >('artikel');

  // Blitz Words source toggle: Allows practicing directly on Blitz Center weekly words!
  const [useBlitzPool, setUseBlitzPool] = useState(false);

  // Selected Level for Games: defaults to user's assigned level (A1, A2, etc.)!
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>(userLevel || 'A1');

  useEffect(() => {
    if (userLevel) {
      setSelectedLevel(userLevel);
    }
  }, [userLevel]);

  // Filter words strictly by selected level (A1, A2, etc.) or Blitz weekly words
  const levelFilteredWords = useMemo(() => {
    if (useBlitzPool && blitzWords && blitzWords.length > 0) {
      const activeBlitz = blitzWords.filter((w) => w.isActive);
      const mapped: GermanWordEntry[] = activeBlitz.map((bw) => ({
        id: bw.id,
        german: bw.german,
        article: bw.article || 'none',
        plural: bw.plural || '—',
        partOfSpeech: 'nomen',
        partOfSpeechUz: 'Blitz dars so\'zi',
        pronunciationIPA: `/${bw.german.toLowerCase()}/`,
        pronunciationUz: bw.german,
        meaningUz: bw.uzbek,
        level: 'A1',
        grammarNotes: bw.notes,
        examples: [
          {
            german: `${bw.article !== 'none' ? bw.article + ' ' : ''}${bw.german}`,
            uzbek: bw.uzbek,
            context: `Blitz Lektion ${bw.lektionNumber} (${bw.day})`
          }
        ],
        tags: ['blitz', bw.day],
        synonyms: [],
        antonyms: []
      }));
      if (mapped.length > 0) return mapped;
    }

    if (!words || words.length === 0) return [];
    if (selectedLevel === 'all') return words;
    const match = words.filter((w) => w.level === selectedLevel);
    return match.length > 0 ? match : words;
  }, [words, selectedLevel, useBlitzPool, blitzWords]);

  // Dynamic words for Artikel Meister: strictly filtered by level
  const dynamicArtikelWords = useMemo(() => {
    const pool = levelFilteredWords;
    const fromUser: ArtikelWord[] = pool
      .filter((w) => w.article === 'der' || w.article === 'die' || w.article === 'das')
      .map((w) => ({
        word: w.german,
        article: w.article as 'der' | 'die' | 'das',
        meaningUz: w.meaningUz,
        plural: w.plural,
        ruleHint: w.grammarNotes || `${w.article} ${w.german} — ${w.meaningUz}`,
      }));
    if (fromUser.length > 0) return fromUser;
    return ARTIKEL_WORDS;
  }, [levelFilteredWords]);

  // Dynamic words for Memory Pairs (Wort-Paare): strictly filtered by level
  const dynamicMemoryPairs = useMemo(() => {
    const pool = levelFilteredWords;
    const fromUser: MemoryPair[] = pool.map((w, idx) => ({
      id: `w-${idx}`,
      german: `${w.article !== 'none' ? w.article + ' ' : ''}${w.german}`,
      uzbek: w.meaningUz,
    }));
    if (fromUser.length > 0) return fromUser;
    return MEMORY_BANK;
  }, [levelFilteredWords]);

  // Dynamic Blitz items (Speed Race): strictly filtered by level
  const dynamicBlitzItems = useMemo(() => {
    const pool = levelFilteredWords;
    if (pool.length >= 4) {
      return pool.map((w, i) => {
        const isCorrect = i % 2 === 0;
        let shownTranslation = w.meaningUz;
        if (!isCorrect) {
          const other = pool[(i + 1) % pool.length];
          shownTranslation = other.meaningUz;
        }
        return {
          german: `${w.article !== 'none' ? w.article + ' ' : ''}${w.german}`,
          shownTranslation,
          isCorrect,
          correctMeaning: w.meaningUz,
        };
      });
    }
    return BLITZ_ITEMS;
  }, [levelFilteredWords]);

  // Dynamic Scramble items: strictly filtered by level
  const dynamicScrambledItems = useMemo(() => {
    const pool = levelFilteredWords;
    const valid = pool.filter((w) => w.german.length >= 4 && w.german.length <= 10 && !w.german.includes(' '));
    if (valid.length > 0) {
      return valid.map((w) => ({
        word: w.german.toUpperCase(),
        meaningUz: w.meaningUz,
        hint: w.partOfSpeechUz || `${w.article !== 'none' ? w.article : ''} ${w.meaningUz}`,
      }));
    }
    return SCRAMBLED_ITEMS;
  }, [levelFilteredWords]);

  // Dynamic Quiz items: strictly filtered by level
  const dynamicQuizItems = useMemo(() => {
    const pool = levelFilteredWords;
    if (pool.length >= 4) {
      return pool.map((w, idx) => {
        const correct = w.meaningUz;
        const distractorOptions = pool
          .filter((_, i) => i !== idx)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((d) => d.meaningUz);
        const options = [correct, ...distractorOptions].sort(() => Math.random() - 0.5);
        return {
          question: `«${w.article !== 'none' ? w.article + ' ' : ''}${w.german}» so'zining to'g'ri ma'nosi nima?`,
          options,
          correct: options.indexOf(correct),
          explanation: `«${w.german}» — ${w.meaningUz}. ${w.grammarNotes || ''}`,
        };
      });
    }
    return GERMAN_QUIZZES;
  }, [levelFilteredWords]);

  // Dynamic Audio items: strictly filtered by level
  const dynamicAudioItems = useMemo(() => {
    const pool = levelFilteredWords;
    if (pool.length >= 4) {
      return pool.map((w, idx) => {
        const target = `${w.article !== 'none' ? w.article + ' ' : ''}${w.german}`;
        const otherOptions = pool
          .filter((_, i) => i !== idx)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((o) => `${o.article !== 'none' ? o.article + ' ' : ''}${o.german}`);
        const allOpts = [target, ...otherOptions].sort(() => Math.random() - 0.5);
        return {
          target,
          options: allOpts,
          meaning: w.meaningUz,
        };
      });
    }
    return [
      { target: 'Guten Tag', options: ['Guten Tag', 'Guten Morgen', 'Gute Nacht', 'Auf Wiedersehen'], meaning: 'Xayrli kun' },
      { target: 'die Entschuldigung', options: ['die Bitte', 'der Dank', 'die Entschuldigung', 'die Frage'], meaning: 'Kechirim / Uzr' },
      { target: 'wunderbar', options: ['schrecklich', 'wunderbar', 'einfach', 'schwierig'], meaning: 'Ajoyib, mo\'jizaviy' },
      { target: 'das Frühstück', options: ['das Abendessen', 'das Mittagessen', 'das Frühstück', 'das Dessert'], meaning: 'Nonushta' }
    ];
  }, [levelFilteredWords]);

  // AUDIO PRONUNCIATION HELPER
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==========================================
  // GAME 1: ARTIKEL-MEISTER (der, die, das)
  // ==========================================
  const [artikelIndex, setArtikelIndex] = useState(0);
  const [artikelScore, setArtikelScore] = useState(0);
  const [artikelStreak, setArtikelStreak] = useState(0);
  const [artikelAnswerStatus, setArtikelAnswerStatus] = useState<'correct' | 'wrong' | null>(null);
  const [artikelFeedback, setArtikelFeedback] = useState<string>('');

  const currentArtikelWord = dynamicArtikelWords[artikelIndex % dynamicArtikelWords.length];

  const handleArtikelChoice = (choice: 'der' | 'die' | 'das') => {
    if (artikelAnswerStatus !== null) return;
    const isCorrect = choice === currentArtikelWord.article;
    if (isCorrect) {
      setArtikelAnswerStatus('correct');
      setArtikelScore((s) => s + 10 + artikelStreak * 2);
      setArtikelStreak((st) => st + 1);
      setArtikelFeedback(`To'g'ri! ${currentArtikelWord.article} ${currentArtikelWord.word} — ${currentArtikelWord.ruleHint}`);
      speakGerman(`${currentArtikelWord.article} ${currentArtikelWord.word}`);
      // Only earn XP when actually answered correctly!
      onEarnXP?.(10, true);
    } else {
      setArtikelAnswerStatus('wrong');
      setArtikelStreak(0);
      setArtikelFeedback(`Noto'g'ri! To'g'ri artikl: «${currentArtikelWord.article} ${currentArtikelWord.word}». ${currentArtikelWord.ruleHint}`);
    }
  };

  const handleNextArtikel = () => {
    setArtikelAnswerStatus(null);
    setArtikelFeedback('');
    setArtikelIndex((i) => i + 1);
  };

  // ==========================================
  // GAME 2: WORT-PAARE (MEMORY CARDS)
  // ==========================================
  interface CardItem {
    uid: string;
    pairId: string;
    text: string;
    type: 'german' | 'uzbek';
  }

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const initMemoryGame = () => {
    const selected = dynamicMemoryPairs.slice(0, 6);
    const cardDeck: CardItem[] = [];
    selected.forEach((item) => {
      cardDeck.push({ uid: `${item.id}-de`, pairId: item.id, text: item.german, type: 'german' });
      cardDeck.push({ uid: `${item.id}-uz`, pairId: item.id, text: item.uzbek, type: 'uzbek' });
    });
    // Shuffle
    cardDeck.sort(() => Math.random() - 0.5);
    setCards(cardDeck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  useEffect(() => {
    if (activeGame === 'pairs' && cards.length === 0) {
      initMemoryGame();
    }
  }, [activeGame]);

  const handleCardClick = (idx: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(idx)) return;
    const card = cards[idx];
    if (matchedPairs.includes(card.pairId)) return;

    if (card.type === 'german') {
      speakGerman(card.text);
    }

    const newFlipped = [...flippedCards, idx];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];
      if (card1.pairId === card2.pairId) {
        setMatchedPairs((prev) => [...prev, card1.pairId]);
        setFlippedCards([]);
        // Organic XP earned for matching a pair
        onEarnXP?.(15, true);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // ==========================================
  // GAME 3: BLITZ-WORT (SPEED 60s RACE)
  // ==========================================
  const [blitzIdx, setBlitzIdx] = useState(0);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(60);
  const [blitzActive, setBlitzActive] = useState(false);
  const [blitzFinished, setBlitzFinished] = useState(false);

  const startBlitz = () => {
    setBlitzIdx(0);
    setBlitzScore(0);
    setBlitzTimeLeft(45);
    setBlitzActive(true);
    setBlitzFinished(false);
  };

  useEffect(() => {
    if (!blitzActive) return;
    if (blitzTimeLeft <= 0) {
      setBlitzActive(false);
      setBlitzFinished(true);
      return;
    }
    const timer = setInterval(() => {
      setBlitzTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [blitzActive, blitzTimeLeft]);

    // Level Change Effect: Reset game indices and re-initialize
  useEffect(() => {
    setArtikelIndex(0);
    setArtikelAnswerStatus(null);
    setArtikelFeedback('');
    setBlitzIdx(0);
    setBlitzActive(false);
    setBlitzFinished(false);
    setScrambleIdx(0);
    setQuizIdx(0);
    setQuizSelected(null);
    setAudioIdx(0);
    setAudioSelected(null);
    if (activeGame === 'pairs') {
      initMemoryGame();
    }
  }, [selectedLevel]);

  const handleBlitzAnswer = (userChoice: boolean) => {
    if (!blitzActive) return;
    const current = dynamicBlitzItems[blitzIdx % dynamicBlitzItems.length];
    if (userChoice === current.isCorrect) {
      setBlitzScore((s) => s + 10);
      onEarnXP?.(10, false);
    } else {
      setBlitzScore((s) => Math.max(0, s - 5));
    }
    setBlitzIdx((i) => i + 1);
  };

  // ==========================================
  // GAME 4: BUCHSTABENSALAT (LETTER SCRAMBLE)
  // ==========================================
  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [scrambleScore, setScrambleScore] = useState(0);
  const [scrambleStatus, setScrambleStatus] = useState<'playing' | 'won' | 'wrong'>('playing');

  const currentScramble = dynamicScrambledItems[scrambleIdx % dynamicScrambledItems.length];
  const originalLetters = currentScramble.word.split('');
  // generate scrambled array once per item
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices = originalLetters.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);
    setShuffledIndices(indices);
    setSelectedLetters([]);
    setScrambleStatus('playing');
  }, [scrambleIdx, selectedLevel]);

  const handleSelectScrambleLetter = (indexInShuffled: number) => {
    if (scrambleStatus !== 'playing') return;
    if (selectedLetters.includes(indexInShuffled)) {
      setSelectedLetters((prev) => prev.filter((i) => i !== indexInShuffled));
    } else {
      const nextSelected = [...selectedLetters, indexInShuffled];
      setSelectedLetters(nextSelected);

      // Check if word complete
      if (nextSelected.length === originalLetters.length) {
        const formedWord = nextSelected.map((i) => originalLetters[shuffledIndices[i]]).join('');
        if (formedWord === currentScramble.word) {
          setScrambleStatus('won');
          setScrambleScore((s) => s + 20);
          speakGerman(currentScramble.word);
          onEarnXP?.(20, true);
        } else {
          setScrambleStatus('wrong');
        }
      }
    }
  };

  const handleNextScramble = () => {
    setScrambleIdx((i) => i + 1);
  };

  // ==========================================
  // GAME 5: WORT-QUIZ (NEMISCHA TEST)
  // ==========================================
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const currentQuiz = dynamicQuizItems[quizIdx % dynamicQuizItems.length];

  const handleQuizChoice = (idx: number) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (idx === currentQuiz.correct) {
      setQuizScore((s) => s + 10);
      onEarnXP?.(15, false);
    }
  };

  const handleNextQuiz = () => {
    setQuizSelected(null);
    setQuizIdx((i) => (i + 1) % dynamicQuizItems.length);
  };

  // ==========================================
  // GAME 6: HÖRVERSTEHEN (AUDIO LISTENING)
  // ==========================================
  const [audioIdx, setAudioIdx] = useState(0);
  const [audioSelected, setAudioSelected] = useState<string | null>(null);
  const [audioScore, setAudioScore] = useState(0);

  const currentAudio = dynamicAudioItems[audioIdx % dynamicAudioItems.length];

  const handlePlayAudio = () => {
    speakGerman(currentAudio.target);
  };

  const handleAudioChoice = (opt: string) => {
    if (audioSelected !== null) return;
    setAudioSelected(opt);
    if (opt === currentAudio.target) {
      setAudioScore((s) => s + 15);
      onEarnXP?.(15, true);
    }
  };

  const handleNextAudio = () => {
    setAudioSelected(null);
    setAudioIdx((i) => (i + 1) % dynamicAudioItems.length);
  };

  // ==========================================
  // GAME 7: KASUS-TRAINER (Akkusativ, Dativ & Genitiv)
  // ==========================================
  const [kasusIdx, setKasusIdx] = useState(0);
  const [kasusSelected, setKasusSelected] = useState<string | null>(null);
  const [kasusScore, setKasusScore] = useState(0);
  const currentKasus = KASUS_DATA[kasusIdx % KASUS_DATA.length];

  const handleKasusChoice = (opt: string) => {
    if (kasusSelected !== null) return;
    setKasusSelected(opt);
    if (opt === currentKasus.correctAnswer) {
      setKasusScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(`${currentKasus.sentenceBefore} ${opt} ${currentKasus.sentenceAfter.replace(/\([^)]*\)/g, '')}`);
    }
  };

  const handleNextKasus = () => {
    setKasusSelected(null);
    setKasusIdx((i) => (i + 1) % KASUS_DATA.length);
  };

  // ==========================================
  // GAME 8: VERB-KONJUGATION (Fe'l tuslash)
  // ==========================================
  const [verbIdx, setVerbIdx] = useState(0);
  const [verbSelected, setVerbSelected] = useState<string | null>(null);
  const [verbScore, setVerbScore] = useState(0);
  const currentVerb = VERB_KONJUGATION_DATA[verbIdx % VERB_KONJUGATION_DATA.length];

  const handleVerbChoice = (opt: string) => {
    if (verbSelected !== null) return;
    setVerbSelected(opt);
    if (opt === currentVerb.correctForm) {
      setVerbScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(currentVerb.sentencePattern.replace('___', opt));
    }
  };

  const handleNextVerb = () => {
    setVerbSelected(null);
    setVerbIdx((i) => (i + 1) % VERB_KONJUGATION_DATA.length);
  };

  // ==========================================
  // GAME 9: SATZBAU-PROFI (Nemischa gap tuzish)
  // ==========================================
  const [satzbauIdx, setSatzbauIdx] = useState(0);
  const currentSatzbau = SATZBAU_DATA[satzbauIdx % SATZBAU_DATA.length];
  const [userWords, setUserWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [satzbauStatus, setSatzbauStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [satzbauScore, setSatzbauScore] = useState(0);

  useEffect(() => {
    const shuffled = [...currentSatzbau.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setUserWords([]);
    setSatzbauStatus('idle');
  }, [satzbauIdx]);

  const handlePickWord = (word: string, index: number) => {
    if (satzbauStatus === 'correct') return;
    setUserWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, idx) => idx !== index));
    setSatzbauStatus('idle');
  };

  const handleUnpickWord = (word: string, index: number) => {
    if (satzbauStatus === 'correct') return;
    setUserWords((prev) => prev.filter((_, idx) => idx !== index));
    setAvailableWords((prev) => [...prev, word]);
    setSatzbauStatus('idle');
  };

  const handleCheckSatzbau = () => {
    const isCorrect = userWords.join(' ') === currentSatzbau.correctOrder.join(' ');
    if (isCorrect) {
      setSatzbauStatus('correct');
      setSatzbauScore((s) => s + 25);
      onEarnXP?.(25, false);
      speakGerman(currentSatzbau.correctOrder.join(' '));
    } else {
      setSatzbauStatus('wrong');
    }
  };

  const handleNextSatzbau = () => {
    setSatzbauIdx((i) => (i + 1) % SATZBAU_DATA.length);
  };

  // ==========================================
  // GAME 10: PERFEKT & PARTIZIP II
  // ==========================================
  const [perfektIdx, setPerfektIdx] = useState(0);
  const currentPerfekt = PERFEKT_DATA[perfektIdx % PERFEKT_DATA.length];
  const [selectedAux, setSelectedAux] = useState<string | null>(null);
  const [selectedPartizip, setSelectedPartizip] = useState<string | null>(null);
  const [perfektScore, setPerfektScore] = useState(0);
  const [perfektFeedback, setPerfektFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleCheckPerfekt = (aux: string, part: string) => {
    if (aux === currentPerfekt.correctAux && part === currentPerfekt.correctPartizip) {
      setPerfektFeedback('correct');
      setPerfektScore((s) => s + 20);
      onEarnXP?.(20, false);
      speakGerman(currentPerfekt.sentenceWithBlank.replace('___', aux).replace('___', part));
    } else {
      setPerfektFeedback('wrong');
    }
  };

  const handleNextPerfekt = () => {
    setSelectedAux(null);
    setSelectedPartizip(null);
    setPerfektFeedback(null);
    setPerfektIdx((i) => (i + 1) % PERFEKT_DATA.length);
  };

  // ==========================================
  // GAME 11: PLURAL-TRAINER (Ko'plik yasalishi)
  // ==========================================
  const [pluralIdx, setPluralIdx] = useState(0);
  const [pluralSelected, setPluralSelected] = useState<string | null>(null);
  const [pluralScore, setPluralScore] = useState(0);
  const currentPlural = PLURAL_GAME_DATA[pluralIdx % PLURAL_GAME_DATA.length];

  const handlePluralChoice = (opt: string) => {
    if (pluralSelected !== null) return;
    setPluralSelected(opt);
    if (opt === currentPlural.correctPlural) {
      setPluralScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(`${currentPlural.article} ${currentPlural.singular}, ${opt}`);
    }
  };

  const handleNextPlural = () => {
    setPluralSelected(null);
    setPluralIdx((i) => (i + 1) % PLURAL_GAME_DATA.length);
  };

  // ==========================================
  // GAME 12: PRÄPOSITIONEN (Wechselpräpositionen)
  // ==========================================
  const [prepIdx, setPrepIdx] = useState(0);
  const [prepSelected, setPrepSelected] = useState<string | null>(null);
  const [prepScore, setPrepScore] = useState(0);
  const currentPrep = PREPOSITION_GAME_DATA[prepIdx % PREPOSITION_GAME_DATA.length];

  const handlePrepChoice = (opt: string) => {
    if (prepSelected !== null) return;
    setPrepSelected(opt);
    if (opt === currentPrep.correctAnswer) {
      setPrepScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(`${currentPrep.sentenceBefore} ${opt} ${currentPrep.sentenceAfter.replace(/\([^)]*\)/g, '')}`);
    }
  };

  const handleNextPrep = () => {
    setPrepSelected(null);
    setPrepIdx((i) => (i + 1) % PREPOSITION_GAME_DATA.length);
  };

  // ==========================================
  // GAME 13: MODALVERBEN-TRAINER (Modal fe'llar)
  // ==========================================
  const [modalIdx, setModalIdx] = useState(0);
  const [modalSelected, setModalSelected] = useState<string | null>(null);
  const [modalScore, setModalScore] = useState(0);
  const currentModal = MODAL_GAME_DATA[modalIdx % MODAL_GAME_DATA.length];

  const handleModalChoice = (opt: string) => {
    if (modalSelected !== null) return;
    setModalSelected(opt);
    if (opt === currentModal.correctForm) {
      setModalScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(`${currentModal.sentenceBefore} ${opt} ${currentModal.sentenceAfter.replace(/\([^)]*\)/g, '')}`);
    }
  };

  const handleNextModal = () => {
    setModalSelected(null);
    setModalIdx((i) => (i + 1) % MODAL_GAME_DATA.length);
  };

  // ==========================================
  // GAME 14: ADJEKTIV-DEKLINATION (Sifat turlanishi)
  // ==========================================
  const [adjIdx, setAdjIdx] = useState(0);
  const [adjSelected, setAdjSelected] = useState<string | null>(null);
  const [adjScore, setAdjScore] = useState(0);
  const currentAdj = ADJEKTIV_GAME_DATA[adjIdx % ADJEKTIV_GAME_DATA.length];

  const handleAdjChoice = (opt: string) => {
    if (adjSelected !== null) return;
    setAdjSelected(opt);
    if (opt === currentAdj.fullWord || opt === currentAdj.correctEnding) {
      setAdjScore((s) => s + 15);
      onEarnXP?.(15, false);
      speakGerman(`${currentAdj.sentenceBefore} ${opt} ${currentAdj.sentenceAfter.replace(/\([^)]*\)/g, '')}`);
    }
  };

  const handleNextAdj = () => {
    setAdjSelected(null);
    setAdjIdx((i) => (i + 1) % ADJEKTIV_GAME_DATA.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Game Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <GermanFlagBadge size="sm" />
          <span>Nemis tili interaktiv o'yinlar markazi</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          O'yinlar orqali nemis tilini tez o'rganing
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Artikllar (der, die, das), xotira kartalari, tezkor poyga va audio testlar orqali o'z so'z boyligingizni sinang!
        </p>

        {isAdmin && onOpenAddWord && (
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenAddWord}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ O'yinlar uchun yangi so'z qo'shish</span>
            </button>
          </div>
        )}
      </div>

      {/* CEFR LEVEL FILTER BAR (A1, A2, B1, B2, C1, C2) */}
      <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>O'yinlardagi so'zlar darajasi:</span>
              {userLevel && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                  Sizning darajangiz: {userLevel}
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {selectedLevel === 'all'
                ? "Barcha darajadagi so'zlar aralash kelmoqda"
                : `O'yinlarda faqat «${selectedLevel}» darajasiga oid so'zlar beriladi (${levelFilteredWords.length} ta so'z faol)`}
            </p>
          </div>
        </div>

        {/* Level Buttons Pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-stone-100 dark:bg-stone-800/60 rounded-2xl">
          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'all'] as const).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const isUserLvl = userLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-sm scale-105'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-white dark:hover:bg-stone-700/50'
                }`}
              >
                <span>{lvl === 'all' ? 'Barchasi' : lvl}</span>
                {isUserLvl && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* VOCABULARY SOURCE SELECTOR (BLITZ SO'ZLARI VS DUDEN LUG'ATI) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 flex-wrap">
              <span>O'yinlar uchun so'zlar manbasi:</span>
              {useBlitzPool ? (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono shadow-xs">
                  ⚡ Blitz O'quv Markazi So'zlari ({blitzWords.filter(w => w.isActive).length} ta faol)
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-mono">
                  📚 Asosiy Lug'at (Duden / Goethe)
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              {useBlitzPool 
                ? "Dushanba, Chorshanba va Juma kunlaridagi leksiyangiz so'zlari bo'yicha mashq qilyapsiz!" 
                : "Standart umumiy nemis tili lug'atidagi so'zlar bo'yicha mashq qilinmoqda."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUseBlitzPool(false)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !useBlitzPool
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 border border-stone-200 dark:border-stone-700'
            }`}
          >
            📚 Asosiy Lug'at
          </button>
          <button
            type="button"
            onClick={() => setUseBlitzPool(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              useBlitzPool
                ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-500/50'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Blitz O'quv Markaz So'zlari</span>
          </button>
        </div>
      </div>

      {/* GAME SWITCHER TABS: VOCABULARY & GRAMMAR CATEGORIES */}
      <div className="space-y-4">
        {/* Category 1: Vocabulary Games */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2 flex items-center gap-1.5">
            <span>📚 So'z boyligi o'yinlari</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">6 ta o'yin</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <button
              onClick={() => setActiveGame('artikel')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'artikel'
                  ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  der · die · das
                </span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Artikel-Meister
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Artiklni topish (+10 XP)
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveGame('pairs')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'pairs'
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Wort-Paare
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Xotira kartalari (+15 XP)
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveGame('blitz')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'blitz'
                  ? 'bg-red-500/10 dark:bg-red-950/40 border-red-500 dark:border-red-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-4 h-4 text-red-500" />
                <Timer className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Blitz-Wort (60s)
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Tezkor poyga (+10 XP)
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveGame('scramble')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'scramble'
                  ? 'bg-purple-500/10 dark:bg-purple-950/40 border-purple-500 dark:border-purple-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <BrainCircuit className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">A-B-C</span>
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Buchstabensalat
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Harflar terish (+20 XP)
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveGame('quiz')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'quiz'
                  ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <Award className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Wort-Quiz
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Sinov testi (+15 XP)
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveGame('audio')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'audio'
                  ? 'bg-blue-500/10 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Volume2 className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">Audio</span>
              </div>
              <div>
                <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                  Hörverstehen
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Tinglab topish (+15 XP)
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Category 2: German Grammar Games (Nemis tili grammatika o'yinlari) */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5 flex-wrap">
            <span>🎓 Nemis tili grammatika o'yinlari (Grammatik-Spiele)</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
              Yangi · 8 ta to'liq grammatika o'yini
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Game 7: Kasus Trainer */}
            <button
              onClick={() => setActiveGame('kasus')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'kasus'
                  ? 'bg-indigo-500/10 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                  Akk · Dat · Gen
                </span>
                <span className="text-xs">🎯</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Kasus-Trainer
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Kelishik & predloglar (+15 XP)
                </div>
              </div>
            </button>

            {/* Game 8: Verb-Konjugation */}
            <button
              onClick={() => setActiveGame('verb')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'verb'
                  ? 'bg-rose-500/10 dark:bg-rose-950/40 border-rose-500 dark:border-rose-500 shadow-sm ring-1 ring-rose-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                  ich · du · er
                </span>
                <span className="text-xs">⚡</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Verb-Konjugation
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Fe'l tuslash & o'zaklar (+15 XP)
                </div>
              </div>
            </button>

            {/* Game 9: Satzbau-Profi */}
            <button
              onClick={() => setActiveGame('satzbau')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'satzbau'
                  ? 'bg-teal-500/10 dark:bg-teal-950/40 border-teal-500 dark:border-teal-500 shadow-sm ring-1 ring-teal-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-teal-300 dark:hover:border-teal-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                  Verb Pos. 2
                </span>
                <span className="text-xs">🧩</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Satzbau-Profi
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Nemischa gap tuzish (+25 XP)
                </div>
              </div>
            </button>

            {/* Game 10: Perfekt-Trainer */}
            <button
              onClick={() => setActiveGame('perfekt')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'perfekt'
                  ? 'bg-orange-500/10 dark:bg-orange-950/40 border-orange-500 dark:border-orange-500 shadow-sm ring-1 ring-orange-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-orange-300 dark:hover:border-orange-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-300">
                  haben · sein
                </span>
                <span className="text-xs">⏳</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Perfekt & Partizip II
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  O'tgan zamon ustasi (+20 XP)
                </div>
              </div>
            </button>

            {/* Game 11: Plural-Trainer */}
            <button
              onClick={() => setActiveGame('plural')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'plural'
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  -e · -(e)n · -er
                </span>
                <span className="text-xs">📚</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Plural-Trainer
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Ko'plik yasalishi (+15 XP)
                </div>
              </div>
            </button>

            {/* Game 12: Präpositionen (Wechselpräpositionen) */}
            <button
              onClick={() => setActiveGame('preposition')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'preposition'
                  ? 'bg-sky-500/10 dark:bg-sky-950/40 border-sky-500 dark:border-sky-500 shadow-sm ring-1 ring-sky-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                  Wo? vs Wohin?
                </span>
                <span className="text-xs">📍</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Präpositionen
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Wechselpräpositionen (+15 XP)
                </div>
              </div>
            </button>

            {/* Game 13: Modalverben */}
            <button
              onClick={() => setActiveGame('modal')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'modal'
                  ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  können · müssen
                </span>
                <span className="text-xs">🔑</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Modalverben
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Modal fe'llar ustasi (+15 XP)
                </div>
              </div>
            </button>

            {/* Game 14: Adjektiv-Deklination */}
            <button
              onClick={() => setActiveGame('adjektiv')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeGame === 'adjektiv'
                  ? 'bg-violet-500/10 dark:bg-violet-950/40 border-violet-500 dark:border-violet-500 shadow-sm ring-1 ring-violet-500/30'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-violet-300 dark:hover:border-violet-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300">
                  -e · -en · -es · -er
                </span>
                <span className="text-xs">🎨</span>
              </div>
              <div>
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  Adjektiv-Deklination
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">
                  Sifat qo'shimchalari (+15 XP)
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* GAME CONTENT CONTAINER */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {/* ========================================================= */}
        {/* GAME 1: ARTIKEL MEISTER */}
        {/* ========================================================= */}
        {activeGame === 'artikel' && (
          <div className="max-w-xl mx-auto space-y-8 text-center">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-500">Ball:</span>
                <span className="text-lg font-bold font-mono text-amber-500">{artikelScore} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Ketma-ket: {artikelStreak}</span>
              </div>
            </div>

            {/* Word Display */}
            <div className="space-y-3 py-6">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                Ushbu so'zning artikli qaysi?
              </div>
              <div className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-3">
                <span>{currentArtikelWord.word}</span>
                <button
                  type="button"
                  onClick={() => speakGerman(currentArtikelWord.word)}
                  className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  title="Talaffuzni eshitish"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">
                O'zbekcha ma'nosi: <strong className="text-stone-800 dark:text-stone-200">{currentArtikelWord.meaningUz}</strong>
              </div>
              <div className="text-xs text-stone-400">
                Ko'pligi: {currentArtikelWord.plural}
              </div>
            </div>

            {/* Der Die Das Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleArtikelChoice('der')}
                disabled={artikelAnswerStatus !== null}
                className="py-4 px-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-2 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 font-bold text-lg sm:text-xl transition-all cursor-pointer active:scale-95 disabled:opacity-70 shadow-sm"
              >
                der
                <span className="block text-[10px] font-normal text-blue-600 dark:text-blue-400 mt-0.5">Erkak jinsi (Maskulin)</span>
              </button>

              <button
                type="button"
                onClick={() => handleArtikelChoice('die')}
                disabled={artikelAnswerStatus !== null}
                className="py-4 px-3 rounded-2xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border-2 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 font-bold text-lg sm:text-xl transition-all cursor-pointer active:scale-95 disabled:opacity-70 shadow-sm"
              >
                die
                <span className="block text-[10px] font-normal text-red-600 dark:text-red-400 mt-0.5">Ayol jinsi (Feminin)</span>
              </button>

              <button
                type="button"
                onClick={() => handleArtikelChoice('das')}
                disabled={artikelAnswerStatus !== null}
                className="py-4 px-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-bold text-lg sm:text-xl transition-all cursor-pointer active:scale-95 disabled:opacity-70 shadow-sm"
              >
                das
                <span className="block text-[10px] font-normal text-emerald-600 dark:text-emerald-400 mt-0.5">Neytral (Neutrum)</span>
              </button>
            </div>

            {/* Feedback & Next Button */}
            {artikelAnswerStatus && (
              <div className={`p-4 rounded-2xl border text-sm font-medium animate-fadeIn space-y-3 ${
                artikelAnswerStatus === 'correct'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {artikelAnswerStatus === 'correct' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                  <span>{artikelFeedback}</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextArtikel}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Keyingi so'z</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 2: WORT-PAARE (MEMORY CARDS) */}
        {/* ========================================================= */}
        {activeGame === 'pairs' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <span className="text-xs text-stone-500">Urinishlar: </span>
                <strong className="text-stone-900 dark:text-stone-100 font-mono">{moves}</strong>
              </div>
              <div>
                <span className="text-xs text-stone-500">Topilgan juftliklar: </span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{matchedPairs.length} / 6</strong>
              </div>
              <button
                type="button"
                onClick={initMemoryGame}
                className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Qayta boshlash</span>
              </button>
            </div>

            {matchedPairs.length === 6 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Wunderbar! Barcha juftliklarni topdingiz!
                </h3>
                <p className="text-xs text-stone-500">
                  Siz o'yinni {moves} ta urinishda yakunladingiz.
                </p>
                <button
                  type="button"
                  onClick={initMemoryGame}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Yana o'ynash
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {cards.map((card, idx) => {
                  const isFlipped = flippedCards.includes(idx);
                  const isMatched = matchedPairs.includes(card.pairId);

                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => handleCardClick(idx)}
                      disabled={isMatched}
                      className={`h-24 sm:h-28 rounded-2xl p-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer border select-none ${
                        isMatched
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default'
                          : isFlipped
                          ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-100 shadow-md font-bold scale-[1.02]'
                          : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700/80 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500'
                      }`}
                    >
                      {isFlipped || isMatched ? (
                        <>
                          <span className="text-xs sm:text-sm font-semibold">{card.text}</span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 uppercase font-mono">
                            {card.type === 'german' ? 'DE' : 'UZ'}
                          </span>
                        </>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-stone-400">
                          ?
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 3: BLITZ-WORT (SPEED 60s RACE) */}
        {/* ========================================================= */}
        {activeGame === 'blitz' && (
          <div className="max-w-md mx-auto space-y-6 text-center">
            {!blitzActive && !blitzFinished && (
              <div className="py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Blitz-Wort — 45 soniyalik poyga
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  So'z va uning tarjimasi chiqadi. Siz uning to'g'ri (Richtig) yoki noto'g'ri (Falsch) ekanini imkon qadar tez belgilashingiz kerak!
                </p>
                <button
                  type="button"
                  onClick={startBlitz}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-sm hover:brightness-110 cursor-pointer shadow-lg shadow-red-500/20"
                >
                  Boshlash (45 soniya)
                </button>
              </div>
            )}

            {blitzActive && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold font-mono text-sm">
                    <Timer className="w-4 h-4" />
                    <span>{blitzTimeLeft} soniya</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100">
                    Ball: {blitzScore} XP
                  </div>
                </div>

                {/* Current Blitz Card */}
                {(() => {
                  const item = BLITZ_ITEMS[blitzIdx % BLITZ_ITEMS.length];
                  return (
                    <div className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-3">
                      <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                        {item.german}
                      </div>
                      <div className="text-xs text-stone-400">ko'rsatilgan tarjima:</div>
                      <div className="text-xl font-semibold text-amber-600 dark:text-amber-400">
                        «{item.shownTranslation}»
                      </div>
                      <div className="text-[11px] text-stone-400 pt-2">
                        Bu tarjima to'g'rimi yoki noto'g'rimi?
                      </div>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleBlitzAnswer(false)}
                    className="py-4 rounded-2xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 font-bold text-base flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <X className="w-5 h-5" />
                    <span>✕ Falsch (Noto'g'ri)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBlitzAnswer(true)}
                    className="py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold text-base flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Check className="w-5 h-5" />
                    <span>✓ Richtig (To'g'ri)</span>
                  </button>
                </div>
              </div>
            )}

            {blitzFinished && (
              <div className="py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Vaqt tugadi!
                </h3>
                <div className="text-lg font-bold font-mono text-amber-500">
                  To'plagan ballingiz: {blitzScore} XP
                </div>
                <p className="text-xs text-stone-500">
                  Zo'r natija! Tezlik va aniqlik — til o'rganishda eng muhim ko'nikmalardan biridir.
                </p>
                <button
                  type="button"
                  onClick={startBlitz}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 cursor-pointer"
                >
                  Qayta urinish
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 4: BUCHSTABENSALAT (LETTER SCRAMBLE) */}
        {/* ========================================================= */}
        {activeGame === 'scramble' && (
          <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs text-stone-500">Topshiriq: #{scrambleIdx + 1}</span>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                Ball: {scrambleScore} XP
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                Ma'nosi bo'yicha nemischa so'zni yig'ing:
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                «{currentScramble.meaningUz}»
              </div>
              <div className="text-xs text-stone-500">Maslahat: {currentScramble.hint}</div>
            </div>

            {/* Assembled Word Slot */}
            <div className="flex items-center justify-center gap-2 min-h-14 p-2 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              {originalLetters.map((_, i) => {
                const selectedShuffledIndex = selectedLetters[i];
                const char = selectedShuffledIndex !== undefined ? originalLetters[shuffledIndices[selectedShuffledIndex]] : '';
                return (
                  <div
                    key={i}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg border-2 ${
                      char
                        ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                        : 'border-dashed border-stone-300 dark:border-stone-600 text-transparent'
                    }`}
                  >
                    {char || '·'}
                  </div>
                );
              })}
            </div>

            {/* Scrambled Available Letters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {shuffledIndices.map((origIdx, shuffledIdx) => {
                const isSelected = selectedLetters.includes(shuffledIdx);
                const char = originalLetters[origIdx];
                return (
                  <button
                    key={shuffledIdx}
                    type="button"
                    onClick={() => handleSelectScrambleLetter(shuffledIdx)}
                    disabled={isSelected || scrambleStatus !== 'playing'}
                    className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl font-mono font-bold text-lg sm:text-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'opacity-20 border-transparent bg-stone-200 dark:bg-stone-800'
                        : 'bg-white dark:bg-stone-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 active:scale-95 shadow-xs'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>

            {/* Clear button */}
            {selectedLetters.length > 0 && scrambleStatus === 'playing' && (
              <button
                type="button"
                onClick={() => setSelectedLetters([])}
                className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                Harflarni tozalash
              </button>
            )}

            {/* Status & Next Button */}
            {scrambleStatus === 'won' && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Richtig! {currentScramble.word}</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextScramble}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                >
                  Keyingi so'zga o'tish
                </button>
              </div>
            )}

            {scrambleStatus === 'wrong' && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span>Xatolik bor. Qaytadan urinib ko'ring!</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLetters([]);
                    setScrambleStatus('playing');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
                >
                  Qayta terish
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 5: WORT-QUIZ (NEMISCHA TEST) */}
        {/* ========================================================= */}
        {activeGame === 'quiz' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs text-stone-500 font-mono">Savol: {quizIdx + 1} / {GERMAN_QUIZZES.length}</span>
              <span className="text-xs font-mono font-bold text-amber-500">Ball: {quizScore} XP</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {currentQuiz.question}
              </h3>

              <div className="space-y-2.5">
                {currentQuiz.options.map((opt, i) => {
                  let btnStyle = 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100';
                  if (quizSelected !== null) {
                    if (i === currentQuiz.correct) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (i === quizSelected) {
                      btnStyle = 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200 font-bold';
                    } else {
                      btnStyle = 'opacity-50 border-stone-200 dark:border-stone-800';
                    }
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleQuizChoice(i)}
                      disabled={quizSelected !== null}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSelected !== null && i === currentQuiz.correct && (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      {quizSelected !== null && i === quizSelected && i !== currentQuiz.correct && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSelected !== null && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-3 animate-fadeIn">
                  <p className="leading-relaxed">
                    <strong>Tushuntirish:</strong> {currentQuiz.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 cursor-pointer"
                  >
                    Keyingi savol
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 6: HÖRVERSTEHEN (AUDIO LISTENING) */}
        {/* ========================================================= */}
        {activeGame === 'audio' && (
          <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs text-stone-500 font-mono">Audio topshiriq: #{audioIdx + 1}</span>
              <span className="text-xs font-mono font-bold text-blue-500">Ball: {audioScore} XP</span>
            </div>

            <div className="space-y-4 py-4">
              <div className="text-xs text-stone-400">
                Tugmani bosing, nemischa talaffuzni tinglang va qaysi so'z aytilganini toping:
              </div>

              <button
                type="button"
                onClick={handlePlayAudio}
                className="w-24 h-24 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center mx-auto transition-all cursor-pointer active:scale-95 group"
              >
                <Volume2 className="w-10 h-10 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-1 uppercase">Eshitish</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentAudio.options.map((opt, i) => {
                let style = 'bg-stone-50 dark:bg-stone-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100';
                if (audioSelected !== null) {
                  if (opt === currentAudio.target) {
                    style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (opt === audioSelected) {
                    style = 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200';
                  } else {
                    style = 'opacity-40 border-stone-200 dark:border-stone-800';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAudioChoice(opt)}
                    disabled={audioSelected !== null}
                    className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {audioSelected !== null && (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-2 animate-fadeIn">
                <div>
                  To'g'ri so'z: <strong>{currentAudio.target}</strong> — «{currentAudio.meaning}»
                </div>
                <button
                  type="button"
                  onClick={handleNextAudio}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Keyingi audio topshiriq
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 7: KASUS-TRAINER (Akkusativ, Dativ & Genitiv) */}
        {/* ========================================================= */}
        {activeGame === 'kasus' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {kasusIdx + 1} / {KASUS_DATA.length}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    currentKasus.caseType === 'Akkusativ'
                      ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                      : currentKasus.caseType === 'Dativ'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                  }`}>
                    {currentKasus.caseType}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Bo'sh joyga mos artiklni qo'ying:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {kasusScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Display */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-3">
              <div className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 leading-relaxed">
                <span>{currentKasus.sentenceBefore} </span>
                <span className={`inline-block px-3 py-1 rounded-xl font-bold font-mono border-2 transition-all ${
                  kasusSelected
                    ? kasusSelected === currentKasus.correctAnswer
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                      : 'bg-red-100 dark:bg-red-950/80 border-red-500 text-red-800 dark:text-red-200 line-through'
                    : 'bg-white dark:bg-stone-900 border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400 min-w-[70px]'
                }`}>
                  {kasusSelected || '___'}
                </span>
                <span> {currentKasus.sentenceAfter}</span>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                O'zbekcha tarjimasi: «{currentKasus.meaningUz}»
              </div>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentKasus.options.map((opt, i) => {
                let btnStyle = 'bg-white dark:bg-stone-800 hover:border-indigo-400 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100';
                if (kasusSelected !== null) {
                  if (opt === currentKasus.correctAnswer) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md';
                  } else if (opt === kasusSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  } else {
                    btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleKasusChoice(opt)}
                    disabled={kasusSelected !== null}
                    className={`p-3.5 rounded-2xl border text-base font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {kasusSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                kasusSelected === currentKasus.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  {kasusSelected === currentKasus.correctAnswer ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Ofarin! To'g'ri javob (+15 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span>To'g'ri javob: «{currentKasus.correctAnswer}»</span>
                    </>
                  )}
                </div>
                <div className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentKasus.ruleExplanation}
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => speakGerman(`${currentKasus.sentenceBefore} ${currentKasus.correctAnswer} ${currentKasus.sentenceAfter.replace(/\([^)]*\)/g, '')}`)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:text-indigo-600 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gapni to'liq eshitish</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextKasus}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Keyingi mashq →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 8: VERB-KONJUGATION (Fe'llarni tuslash) */}
        {/* ========================================================= */}
        {activeGame === 'verb' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {verbIdx + 1} / {VERB_KONJUGATION_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                    {currentVerb.infinitive} (shaxs: {currentVerb.subject})
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Fe'lning to'g'ri tuslangan shaklini tanlang:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400">
                  {verbScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Display */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-3">
              <div className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 leading-relaxed">
                {currentVerb.sentencePattern.split('___')[0]}
                <span className={`inline-block px-3 py-1 rounded-xl font-bold font-mono border-2 transition-all ${
                  verbSelected
                    ? verbSelected === currentVerb.correctForm
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                      : 'bg-red-100 dark:bg-red-950/80 border-red-500 text-red-800 dark:text-red-200 line-through'
                    : 'bg-white dark:bg-stone-900 border-dashed border-rose-400 text-rose-600 dark:text-rose-400 min-w-[70px]'
                }`}>
                  {verbSelected || '___'}
                </span>
                {currentVerb.sentencePattern.split('___')[1] || ''}
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400">
                Fe'l: <strong>{currentVerb.infinitive}</strong> — {currentVerb.meaningUz}
              </div>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentVerb.options.map((opt, i) => {
                let btnStyle = 'bg-white dark:bg-stone-800 hover:border-rose-400 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100';
                if (verbSelected !== null) {
                  if (opt === currentVerb.correctForm) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md';
                  } else if (opt === verbSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  } else {
                    btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleVerbChoice(opt)}
                    disabled={verbSelected !== null}
                    className={`p-3.5 rounded-2xl border text-base font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {verbSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                verbSelected === currentVerb.correctForm
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  {verbSelected === currentVerb.correctForm ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Juda to'g'ri! (+15 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      <span>To'g'ri shakl: «{currentVerb.correctForm}»</span>
                    </>
                  )}
                </div>
                <div className="leading-relaxed">
                  <strong>Tuslash qoidasi:</strong> {currentVerb.ruleTip}
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => speakGerman(currentVerb.sentencePattern.replace('___', currentVerb.correctForm))}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Talaffuzni tinglash</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextVerb}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Keyingi fe'l →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 9: SATZBAU-PROFI (Nemischa gap tuzish) */}
        {/* ========================================================= */}
        {activeGame === 'satzbau' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {satzbauIdx + 1} / {SATZBAU_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                    So'z tartibi
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  So'zlarni to'g'ri ketma-ketlikda bosing va gap tuzing:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400">
                  {satzbauScore} XP
                </div>
              </div>
            </div>

            {/* Target meaning in Uzbek */}
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <span className="font-bold">O'zbekcha ma'nosi:</span>
              <span className="italic">«{currentSatzbau.meaningUz}»</span>
            </div>

            {/* User Constructed Sentence Area */}
            <div className="min-h-[90px] p-4 rounded-2xl border-2 border-dashed border-teal-400 dark:border-teal-600 bg-white dark:bg-stone-800/80 flex flex-wrap items-center gap-2 shadow-inner">
              {userWords.length === 0 ? (
                <span className="text-xs text-stone-400 italic mx-auto">
                  Quyidagi so'zlarni bosing, ular shu yerga tartib bilan joylashadi...
                </span>
              ) : (
                userWords.map((word, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleUnpickWord(word, i)}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer active:scale-95 animate-fadeIn"
                    title="Qaytarib olish uchun bosing"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Available Words Pool */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Mavjud so'zlar (bosing):
              </div>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handlePickWord(word, i)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-stone-900 dark:text-stone-100 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Button */}
            {userWords.length > 0 && satzbauStatus !== 'correct' && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCheckSatzbau}
                  disabled={availableWords.length > 0}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
                    availableWords.length === 0
                      ? 'bg-teal-600 hover:bg-teal-500 text-white'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {availableWords.length === 0 ? '✓ Gapni tekshirish' : 'Avval barcha so\'zlarni tanlang'}
                </button>
              </div>
            )}

            {/* Feedback & Rule */}
            {satzbauStatus === 'correct' && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-3 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Qoyilmaqom! To'g'ri nemischa gap tuzildi (+25 XP)</span>
                </div>
                <div className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentSatzbau.ruleExplanation}
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => speakGerman(currentSatzbau.correctOrder.join(' '))}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:text-teal-600 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Gapni to'liq eshitish</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSatzbau}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Keyingi gap →
                  </button>
                </div>
              </div>
            )}

            {satzbauStatus === 'wrong' && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200 space-y-2 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Gap tuzilishida xatolik bor!</span>
                </div>
                <p className="leading-relaxed">
                  So'zlarni qaytadan tartibga solib ko'ring. Eslatma: asosiy gapda tuslangan fe'l har doim 2-o'rinda bo'lishi kerak!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 10: PERFEKT & PARTIZIP II */}
        {/* ========================================================= */}
        {activeGame === 'perfekt' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {perfektIdx + 1} / {PERFEKT_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300">
                    Perfekt zamoni
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Yordamchi fe'l (haben/sein) va Partizip II ni tanlang:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-orange-600 dark:text-orange-400">
                  {perfektScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Preview */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <div className="text-lg sm:text-xl font-serif text-stone-900 dark:text-stone-100">
                {currentPerfekt.sentenceWithBlank.replace('___', `[ ${selectedAux || 'yordamchi fe\'l'} ]`).replace('___', `[ ${selectedPartizip || 'Partizip II'} ]`)}
              </div>
              <div className="text-xs text-stone-500 italic">
                «{currentPerfekt.meaningUz}» (Infinitive: {currentPerfekt.infinitive})
              </div>
            </div>

            {/* Step 1: Auxiliary Verb Selection */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                1-qadam: Yordamchi fe'lni tanlang (haben yoki sein?):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentPerfekt.optionsAux.map((aux, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAux(aux)}
                    disabled={perfektFeedback !== null}
                    className={`p-3 rounded-xl border font-mono font-bold text-xs transition-all cursor-pointer ${
                      selectedAux === aux
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    {aux}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Partizip II Selection */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                2-qadam: «{currentPerfekt.infinitive}» fe'lining Partizip II shaklini tanlang:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentPerfekt.optionsPartizip.map((part, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedPartizip(part)}
                    disabled={perfektFeedback !== null}
                    className={`p-3 rounded-xl border font-mono font-bold text-xs transition-all cursor-pointer ${
                      selectedPartizip === part
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            {selectedAux && selectedPartizip && perfektFeedback === null && (
              <button
                type="button"
                onClick={() => handleCheckPerfekt(selectedAux, selectedPartizip)}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                ✓ Javobni tekshirish
              </button>
            )}

            {/* Feedback & Rule */}
            {perfektFeedback === 'correct' && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-3 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ajoyib! Ikkalasi ham to'g'ri topildi (+20 XP)</span>
                </div>
                <div className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentPerfekt.ruleTip}
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => speakGerman(currentPerfekt.sentenceWithBlank.replace('___', currentPerfekt.correctAux).replace('___', currentPerfekt.correctPartizip))}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:text-orange-600 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>To'liq eshitish</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPerfekt}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                  >
                    Keyingi mashq →
                  </button>
                </div>
              </div>
            )}

            {perfektFeedback === 'wrong' && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-3 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  <span>Noto'g'ri! To'g'ri javob: «{currentPerfekt.correctAux}» ... «{currentPerfekt.correctPartizip}»</span>
                </div>
                <div className="leading-relaxed">
                  {currentPerfekt.ruleTip}
                </div>
                <button
                  type="button"
                  onClick={handleNextPerfekt}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
                >
                  Keyingi mashqqa o'tish →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 11: PLURAL-TRAINER (Ko'plik yasalishi) */}
        {/* ========================================================= */}
        {activeGame === 'plural' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {pluralIdx + 1} / {PLURAL_GAME_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Ko'plik: {currentPlural.pluralEndingCategory}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Otning to'g'ri ko'plik shaklini (Plural) tanlang:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {pluralScore} XP
                </div>
              </div>
            </div>

            {/* Word Card */}
            <div className="p-8 rounded-3xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-3 shadow-inner">
              <div className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                Birlik shakli (Singular)
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                <span className="text-amber-600 dark:text-amber-400">{currentPlural.article}</span> {currentPlural.singular}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                Ma'nosi: «{currentPlural.meaningUz}»
              </div>
            </div>

            {/* Plural Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPlural.options.map((opt, i) => {
                const isSelected = pluralSelected === opt;
                const isCorrect = opt === currentPlural.correctPlural;
                let btnStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-emerald-500';

                if (pluralSelected !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={pluralSelected !== null}
                    onClick={() => handlePluralChoice(opt)}
                    className={`p-4 rounded-2xl border text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {pluralSelected !== null && isCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                    {pluralSelected !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Rule */}
            {pluralSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                pluralSelected === currentPlural.correctPlural 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="font-bold flex items-center justify-between">
                  <span className="text-sm">
                    {pluralSelected === currentPlural.correctPlural ? '✓ To\'g\'ri topdingiz! (+15 XP)' : `Noto'g'ri! To'g'ri ko'plik: ${currentPlural.correctPlural}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakGerman(currentPlural.correctPlural)}
                    className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
                    title="Talaffuzni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="leading-relaxed">
                  <strong>Ko'plik qoidasi:</strong> {currentPlural.ruleTip}
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={handleNextPlural}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Keyingi so'z →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 12: PRÄPOSITIONEN (Wechselpräpositionen) */}
        {/* ========================================================= */}
        {activeGame === 'preposition' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {prepIdx + 1} / {PREPOSITION_GAME_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                    {currentPrep.questionType}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  To'g'ri kelishik artiklini tanlang (Wechselpräpositionen):
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400">
                  {prepScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Preview */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <div className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100">
                {currentPrep.sentenceBefore} <span className="text-sky-600 dark:text-sky-400 font-bold underline decoration-wavy">[ {prepSelected || '___'} ]</span> {currentPrep.sentenceAfter}
              </div>
              <div className="text-xs text-stone-500 italic">
                «{currentPrep.meaningUz}»
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentPrep.options.map((opt, i) => {
                const isSelected = prepSelected === opt;
                const isCorrect = opt === currentPrep.correctAnswer;
                let btnStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-sky-500';

                if (prepSelected !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-sky-500 text-white border-sky-600 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={prepSelected !== null}
                    onClick={() => handlePrepChoice(opt)}
                    className={`p-3.5 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Rule */}
            {prepSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                prepSelected === currentPrep.correctAnswer
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="font-bold flex items-center justify-between">
                  <span className="text-sm">
                    {prepSelected === currentPrep.correctAnswer ? '✓ Mukammal javob! (+15 XP)' : `Noto'g'ri! To'g'ri artikl: «${currentPrep.correctAnswer}»`}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakGerman(`${currentPrep.sentenceBefore} ${currentPrep.correctAnswer} ${currentPrep.sentenceAfter.replace(/\([^)]*\)/g, '')}`)}
                    className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentPrep.ruleTip}
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={handleNextPrep}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Keyingi gap →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 13: MODALVERBEN-TRAINER (Modal fe'llar) */}
        {/* ========================================================= */}
        {activeGame === 'modal' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {modalIdx + 1} / {MODAL_GAME_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Modal fe'l: {currentModal.infinitiveModal}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Gapga mos modal fe'l tuslanishini tanlang:
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
                  {modalScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Preview */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <div className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100">
                {currentModal.sentenceBefore} <span className="text-amber-600 dark:text-amber-400 font-bold underline decoration-wavy">[ {modalSelected || '___'} ]</span> {currentModal.sentenceAfter}
              </div>
              <div className="text-xs text-stone-500 italic">
                «{currentModal.meaningUz}»
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentModal.options.map((opt, i) => {
                const isSelected = modalSelected === opt;
                const isCorrect = opt === currentModal.correctForm;
                let btnStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-amber-500';

                if (modalSelected !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-amber-500 text-stone-950 border-amber-600 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={modalSelected !== null}
                    onClick={() => handleModalChoice(opt)}
                    className={`p-3.5 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Rule */}
            {modalSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                modalSelected === currentModal.correctForm
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
              }`}>
                <div className="font-bold flex items-center justify-between">
                  <span className="text-sm">
                    {modalSelected === currentModal.correctForm ? '✓ Barakalla! Modal fe\'l to\'g\'ri tanlandi (+15 XP)' : `Noto'g'ri! To'g'ri shakl: «${currentModal.correctForm}»`}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakGerman(`${currentModal.sentenceBefore} ${currentModal.correctForm} ${currentModal.sentenceAfter.replace(/\([^)]*\)/g, '')}`)}
                    className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentModal.ruleTip}
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={handleNextModal}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Keyingi mashq →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* GAME 14: ADJEKTIV-DEKLINATION (Sifat turlanishi) */}
        {/* ========================================================= */}
        {activeGame === 'adjektiv' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="space-y-0.5">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>Topshiriq {adjIdx + 1} / {ADJEKTIV_GAME_DATA.length}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300">
                    {currentAdj.articleType}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Sifatning to'g'ri qo'shimchasini tanlang (Adjektivdeklination):
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">To'plangan ball</span>
                <div className="text-lg font-bold font-mono text-violet-600 dark:text-violet-400">
                  {adjScore} XP
                </div>
              </div>
            </div>

            {/* Sentence Preview */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <div className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100">
                {currentAdj.sentenceBefore} <span className="text-violet-600 dark:text-violet-400 font-bold underline decoration-wavy">[ {adjSelected || '___'} ]</span> {currentAdj.sentenceAfter}
              </div>
              <div className="text-xs text-stone-500 italic">
                «{currentAdj.meaningUz}» (Boshlang'ich sifat: {currentAdj.baseAdjective})
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentAdj.options.map((opt, i) => {
                const isSelected = adjSelected === opt;
                const isCorrect = opt === currentAdj.fullWord || opt === currentAdj.correctEnding;
                let btnStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-violet-500';

                if (adjSelected !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-violet-600 text-white border-violet-700 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500 text-white border-red-600';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={adjSelected !== null}
                    onClick={() => handleAdjChoice(opt)}
                    className={`p-3.5 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Rule */}
            {adjSelected !== null && (
              <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
                adjSelected === currentAdj.fullWord || adjSelected === currentAdj.correctEnding
                  ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800 text-violet-900 dark:text-violet-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="font-bold flex items-center justify-between">
                  <span className="text-sm">
                    {adjSelected === currentAdj.fullWord || adjSelected === currentAdj.correctEnding 
                      ? '✓ Qoyilmaqom! Sifat qo\'shimchasi to\'g\'ri (+15 XP)' 
                      : `Noto'g'ri! To'g'ri shakl: «${currentAdj.fullWord}»`}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakGerman(`${currentAdj.sentenceBefore} ${currentAdj.fullWord} ${currentAdj.sentenceAfter.replace(/\([^)]*\)/g, '')}`)}
                    className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="leading-relaxed">
                  <strong>Grammatika qoidasi:</strong> {currentAdj.ruleTip}
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={handleNextAdj}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Keyingi mashq →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
