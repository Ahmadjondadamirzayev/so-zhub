import { SpellCheckError, TextStatistics } from '../types';

interface OrthoRule {
  wrong: RegExp;
  correct: string;
  reason: string;
  category: 'harf xatosi' | 'tutuq belgisi' | 'qo\'shib yozish' | 'ajratib yozish' | 'sheva elementi';
}

const COMMON_RULES: OrthoRule[] = [
  // X vs H rules
  { wrong: /\bhursand\b/gi, correct: 'xursand', reason: "'X' harfi bilan yoziladi (xursand — shod, sevingan)", category: 'harf xatosi' },
  { wrong: /\bmashxur\b/gi, correct: 'mashhur', reason: "'H' harfi bilan yoziladi (mashhur — tanilgan)", category: 'harf xatosi' },
  { wrong: /\btarih\b/gi, correct: 'tarix', reason: "'X' harfi bilan yoziladi (tarix — o'tmish fani)", category: 'harf xatosi' },
  { wrong: /\braxmat\b/gi, correct: 'rahmat', reason: "'H' harfi bilan yoziladi (rahmat — tashakkur)", category: 'harf xatosi' },
  { wrong: /\bmuxim\b/gi, correct: 'muhim', reason: "'H' harfi bilan yoziladi (muhim — ahamiyatli)", category: 'harf xatosi' },
  { wrong: /\bshaxar\b/gi, correct: 'shahar', reason: "'H' harfi bilan yoziladi (shahar)", category: 'harf xatosi' },
  { wrong: /\bxarakat\b/gi, correct: 'harakat', reason: "'H' harfi bilan yoziladi (harakat — qimirlash)", category: 'harf xatosi' },
  { wrong: /\bxamma\b/gi, correct: 'hamma', reason: "'H' harfi bilan yoziladi (hamma — barcha)", category: 'harf xatosi' },
  { wrong: /\bbaxo\b/gi, correct: 'baho', reason: "'H' harfi bilan yoziladi (baho — qiymat, daraja)", category: 'harf xatosi' },
  { wrong: /\bmexr\b/gi, correct: 'mehr', reason: "'H' harfi bilan yoziladi (mehr — muhabbat, quyosh)", category: 'harf xatosi' },
  { wrong: /\bhush kelibsiz\b/gi, correct: 'xush kelibsiz', reason: "'Xush' (yaxshi, yoqimli) 'X' harfi bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bxazil\b/gi, correct: 'hazil', reason: "'H' harfi bilan yoziladi (hazil — mutoyiba)", category: 'harf xatosi' },
  { wrong: /\bxolat\b/gi, correct: 'holat', reason: "'H' harfi bilan yoziladi (holat — vaziyat)", category: 'harf xatosi' },
  { wrong: /\bxisob\b/gi, correct: 'hisob', reason: "'H' harfi bilan yoziladi (hisob — sanash)", category: 'harf xatosi' },
  { wrong: /\bhayr\b/gi, correct: 'xayr', reason: "'X' harfi bilan yoziladi (xayr — yaxshilik, xayrlashuv)", category: 'harf xatosi' },
  { wrong: /\bhavf\b/gi, correct: 'xavf', reason: "'X' harfi bilan yoziladi (xavf — xatar)", category: 'harf xatosi' },
  { wrong: /\bmuxabbat\b/gi, correct: 'muhabbat', reason: "'H' harfi bilan yoziladi (muhabbat — sevgi)", category: 'harf xatosi' },
  { wrong: /\bximoya\b/gi, correct: 'himoya', reason: "'H' harfi bilan yoziladi (himoya — asrash)", category: 'harf xatosi' },
  { wrong: /\bmaxsulot\b/gi, correct: 'mahsulot', reason: "'H' harfi bilan yoziladi (mahsulot — hosil, narsa)", category: 'harf xatosi' },
  { wrong: /\bhamroh\b/gi, correct: 'hamroh', reason: "'H' harfi bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bxushyor\b/gi, correct: 'hushyor', reason: "'Hushyor' 'H' harfi bilan yoziladi (ogoh, uyg'oq)", category: 'harf xatosi' },
  { wrong: /\bhushnud\b/gi, correct: 'xushnud', reason: "'Xushnud' 'X' harfi bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bqiziqq\b/gi, correct: 'qiziq', reason: "Bitta 'q' bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bfaydali\b/gi, correct: 'foydali', reason: "'O' unlisi bilan yoziladi (foydali)", category: 'harf xatosi' },
  { wrong: /\btushunmaq\b/gi, correct: 'tushunmoq', reason: "O'zbek adabiy tilida fe'llar '-moq' bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bkelmaq\b/gi, correct: 'kelmoq', reason: "'-moq' affiksi bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\baytmaq\b/gi, correct: 'aytmoq', reason: "'-moq' affiksi bilan yoziladi", category: 'harf xatosi' },
  { wrong: /\bvaxt\b/gi, correct: 'vaqt', reason: "'Q' harfi bilan yoziladi (vaqt)", category: 'harf xatosi' },
  { wrong: /\btoxta\b/gi, correct: "to'xta", reason: "O'zbek alifbosida 'o'' harfi tutuq bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\bzor\b/gi, correct: "zo'r", reason: "'Zo'r' so'zi 'o'' harfi bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\borgan\b/gi, correct: "o'rgan", reason: "'O'rgan' so'zi 'o'' harfi bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\bgurur\b/gi, correct: "g'urur", reason: "'G'urur' so'zi 'g'' harfi bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\boldi berdi\b/gi, correct: 'oldi-berdi', reason: "Juft so'zlar defis bilan yoziladi (oldi-berdi)", category: 'qo\'shib yozish' },
  { wrong: /\bbirma bir\b/gi, correct: 'birma-bir', reason: "Takroriy so'zlar defis bilan yoziladi (birma-bir)", category: 'qo\'shib yozish' },
  { wrong: /\basta sekin\b/gi, correct: 'asta-sekin', reason: "Juft ravishlar defis bilan yoziladi (asta-sekin)", category: 'qo\'shib yozish' },
  { wrong: /\btez tez\b/gi, correct: 'tez-tez', reason: "Takroriy ravishlar defis bilan yoziladi (tez-tez)", category: 'qo\'shib yozish' },
  { wrong: /\bozbek\b/gi, correct: "o'zbek", reason: "'O'zbek' so'zi 'o'' harfi bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\bogil\b/gi, correct: "o'g'il", reason: "'O'g'il' so'zi 'o'' va 'g'' harflari bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\bgisht\b/gi, correct: "g'isht", reason: "'G'isht' so'zi 'g'' harfi bilan yoziladi", category: 'tutuq belgisi' },
  { wrong: /\bravshan\b/gi, correct: 'ravshan', reason: "'V' harfi bilan to'g'ri", category: 'harf xatosi' },
];

export function checkUzbekSpelling(text: string): SpellCheckError[] {
  if (!text || text.trim() === '') return [];

  const errors: SpellCheckError[] = [];

  for (const rule of COMMON_RULES) {
    let match: RegExpExecArray | null;
    const regex = new RegExp(rule.wrong.source, 'gi');
    while ((match = regex.exec(text)) !== null) {
      const originalWord = match[0];
      // Keep case
      let suggestion = rule.correct;
      if (originalWord[0] === originalWord[0].toUpperCase()) {
        suggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      }

      errors.push({
        word: originalWord,
        index: match.index,
        suggestions: [suggestion],
        reason: rule.reason,
        ruleCategory: rule.category,
      });
    }
  }

  // Check for non-standard apostrophes (e.g. ` or ‘ or ’ instead of ')
  const apostropheRegex = /[a-zA-Zа-яА-Я]+[`‘’][a-zA-Zа-яА-Я]*/g;
  let apMatch: RegExpExecArray | null;
  while ((apMatch = apostropheRegex.exec(text)) !== null) {
    const word = apMatch[0];
    const fixed = word.replace(/[`‘’]/g, "'");
    if (!errors.some((e) => e.index === apMatch!.index)) {
      errors.push({
        word,
        index: apMatch.index,
        suggestions: [fixed],
        reason: "Standart tutuq belgisi (') o'rniga noan'anaviy belgi ishlatilgan",
        ruleCategory: 'tutuq belgisi',
      });
    }
  }

  // Sort by index ascending
  return errors.sort((a, b) => a.index - b.index);
}

export function autoCorrectText(text: string, errors: SpellCheckError[]): string {
  if (!text || errors.length === 0) return text;

  // Replace from end to beginning to keep index offsets valid
  const sorted = [...errors].sort((a, b) => b.index - a.index);
  let result = text;

  for (const err of sorted) {
    if (err.suggestions[0]) {
      const before = result.slice(0, err.index);
      const after = result.slice(err.index + err.word.length);
      result = before + err.suggestions[0] + after;
    }
  }

  return result;
}

export function calculateTextStatistics(text: string): TextStatistics {
  if (!text || text.trim() === '') {
    return {
      charCount: 0,
      charCountNoSpaces: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readingTimeMinutes: 0,
      uniqueWords: 0,
      vowelCount: 0,
      consonantCount: 0,
      topWords: [],
    };
  }

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;

  const rawWords = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const wordCount = rawWords.length;

  // Sentences
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(sentences.length, 1);

  // Paragraphs
  const paragraphs = text
    .split(/\n+/)
    .filter((p) => p.trim().length > 0);
  const paragraphCount = Math.max(paragraphs.length, 1);

  // Reading time (average 180-200 words per minute for Uzbek prose)
  const readingTimeMinutes = Math.max(1, Math.round((wordCount / 180) * 10) / 10);

  // Vowels and Consonants in Uzbek (Lotin + Kirill)
  const vowels = text.match(/[aeiouo'öüаеёиоуэюяў]/gi) || [];
  const vowelCount = vowels.length;
  const consonants = text.match(/[bdfghjklmnpqrstvwxyzshchбвгджзйклмнпрстфхцчшщғқҳ]/gi) || [];
  const consonantCount = consonants.length;

  // Word frequency
  const wordFreqMap = new Map<string, number>();
  for (const w of rawWords) {
    if (w.length > 2) {
      wordFreqMap.set(w, (wordFreqMap.get(w) || 0) + 1);
    }
  }

  const uniqueWords = wordFreqMap.size;
  const topWords = Array.from(wordFreqMap.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    charCount,
    charCountNoSpaces,
    wordCount,
    sentenceCount,
    paragraphCount,
    readingTimeMinutes,
    uniqueWords,
    vowelCount,
    consonantCount,
    topWords,
  };
}
