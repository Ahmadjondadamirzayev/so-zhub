export type AlphabetMode = 'latin' | 'cyrillic';
export type ThemeMode = 'light' | 'dark';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'student';
  avatar?: string;
  level?: CEFRLevel;
  wordsLearned?: number;
  xpPoints?: number;
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'student';
  phone?: string;
  level: CEFRLevel;
  wordsLearned: number;
  xpPoints: number;
  createdAt: string;
}

export interface StudentApplication {
  id: string;
  fullName: string;
  phone: string;
  telegram?: string;
  level: CEFRLevel;
  message?: string;
  status: 'pending' | 'approved';
  createdAt: string;
}

export interface LessonSlide {
  title: string;
  germanText: string;
  uzbekText: string;
  grammarNote: string;
  tips?: string[];
}

export interface LessonExercise {
  id: string;
  type: 'choice' | 'blank' | 'order';
  questionUz: string;
  germanSentence?: string;
  options?: string[];
  correctAnswer: string;
  wordsToOrder?: string[];
  explanation: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  titleUz: string;
  level: CEFRLevel;
  duration: string;
  youtubeId?: string;
  description: string;
  keyTopics: string[];
  vocabularyList: Array<{ german: string; uzbek: string }>;
  interactiveSlides?: LessonSlide[];
  exercises?: LessonExercise[];
  isCompleted?: boolean;
}

export type BlitzScheduleDay = 'Dushanba' | 'Chorshanba' | 'Juma';

export interface BlitzScheduledWord {
  id: string;
  german: string;
  uzbek: string;
  article?: GermanArticle;
  plural?: string;
  lektionNumber: number;
  day: BlitzScheduleDay;
  isActive: boolean;
  notes?: string;
  addedAt: string;
}

export type GermanArticle = 'der' | 'die' | 'das' | 'none';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface GermanExample {
  german: string;
  uzbek: string;
  context?: string;
}

export interface GermanWordEntry {
  id: string;
  german: string;
  article: GermanArticle;
  plural: string;
  partOfSpeech: 'nomen' | 'verb' | 'adjektiv' | 'adverb' | 'redewendung';
  partOfSpeechUz: string;
  pronunciationIPA: string;
  pronunciationUz: string;
  meaningUz: string;
  level: CEFRLevel;
  examples: GermanExample[];
  synonyms: string[];
  antonyms: string[];
  grammarNotes?: string;
  tags: string[];
  addedBy?: string;
  createdAt?: string;
}

export interface StudentLearner {
  id: string;
  name: string;
  avatarUrl?: string;
  level: CEFRLevel;
  wordsLearned: number;
  xpPoints: number;
  streakDays: number;
  joinedDate: string;
  badge?: string;
}

export type PartOfSpeech =
  | 'ot'
  | 'fe\'l'
  | 'sifat'
  | 'ravish'
  | 'son'
  | 'olmosh'
  | 'bog\'lovchi'
  | 'ko\'makchi'
  | 'modal so\'z'
  | 'ibora'
  | 'termin';

export type WordOrigin =
  | 'turkiy'
  | 'arabcha'
  | 'forscha'
  | 'lotincha'
  | 'ruscha'
  | 'inglizcha'
  | 'yunoncha'
  | 'nemischa';

export interface MorphemeAnalysis {
  root: string;
  rootType: string;
  affixes: Array<{
    text: string;
    type: 'so\'z yasovchi' | 'shakl yasovchi' | 'egalik' | 'kelishik' | 'shaxs-son';
    meaning?: string;
  }>;
}

export interface LiteraryExample {
  quote: string;
  author: string;
  source: string;
  year?: string;
}

export interface WordEntry {
  id: string;
  slug: string;
  word: string;
  wordCyrillic: string;
  partOfSpeech: PartOfSpeech;
  partOfSpeechNameUz: string;
  phonetic: string;
  origin: WordOrigin;
  originDetails: string;
  definitions: string[];
  examples: LiteraryExample[];
  synonyms: string[];
  antonyms: string[];
  phrases: string[];
  morphemes: MorphemeAnalysis;
  frequencyRank: number;
  category: 'umumiy' | 'adabiy' | 'mumtoz' | 'it-texnologiya' | 'falsafiy' | 'tibbiyot' | 'huquqiy';
  isWordOfTheDay?: boolean;
}

export interface IdiomEntry {
  id: string;
  phrase: string;
  phraseCyrillic: string;
  meaning: string;
  literalMeaning?: string;
  example: string;
  authorOrContext: string;
  tags: string[];
}

export interface SpellCheckError {
  word: string;
  index: number;
  suggestions: string[];
  reason: string;
  ruleCategory: 'harf xatosi' | 'tutuq belgisi' | 'qo\'shib yozish' | 'ajratib yozish' | 'sheva elementi';
}

export interface TextStatistics {
  charCount: number;
  charCountNoSpaces: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTimeMinutes: number;
  uniqueWords: number;
  vowelCount: number;
  consonantCount: number;
  topWords: Array<{ word: string; count: number }>;
}

export interface LingvoQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'ma\'no' | 'sinonim' | 'ibora' | 'etimologiya' | 'imlo' | 'nemischa';
}
