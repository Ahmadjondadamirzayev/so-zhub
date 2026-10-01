import React, { useState, useMemo } from 'react';
import { GermanWordEntry, CEFRLevel, GermanArticle } from '../types';
import { GermanWordCard } from './GermanWordCard';
import { GermanFlagBadge } from './GermanFlagBadge';
import { Search, Plus, BookOpen, Volume2, ArrowUpDown, X, Sparkles, Filter, Check, BookmarkPlus, ExternalLink } from 'lucide-react';
import { searchOrGenerateGermanWord, normalizeGermanSearch } from '../utils/germanMegaDictionaryEngine';

interface GermanDictionarySectionProps {
  words: GermanWordEntry[];
  onSelectWord: (word: GermanWordEntry) => void;
  onOpenAIAnalysis: (word: GermanWordEntry) => void;
  onOpenAddWord: () => void;
  onAddWord?: (word: GermanWordEntry) => void;
  isAdmin?: boolean;
  userLevel?: CEFRLevel;
}

export const GermanDictionarySection: React.FC<GermanDictionarySectionProps> = ({
  words,
  onSelectWord,
  onOpenAIAnalysis,
  onOpenAddWord,
  onAddWord,
  isAdmin = false,
  userLevel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'az' | 'level'>('az');
  const [savedNotice, setSavedNotice] = useState<string>('');

  // Dynamic morphological synthesis from 300,000+ German vocabulary engine
  const synthesizedWord = useMemo(() => {
    const q = searchQuery.trim();
    if (!q || q.length < 2) return null;
    const qLower = q.toLowerCase();
    const qNorm = normalizeGermanSearch(q);
    const exact = words.find(
      (w) =>
        w.german.toLowerCase() === qLower ||
        normalizeGermanSearch(w.german) === qNorm ||
        w.meaningUz.toLowerCase() === qLower
    );
    if (exact) return null;
    return searchOrGenerateGermanWord(q);
  }, [searchQuery, words]);

  // Daily featured German word
  const featuredWord = useMemo(() => {
    return words.find((w) => w.id === 'de-gemuetlichkeit') || words[0];
  }, [words]);

  // Audio speaker
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered words
  const filteredWords = useMemo(() => {
    let list = words.filter((item) => {
      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }
      // Article filter
      if (selectedArticle !== 'all') {
        if (selectedArticle === 'verbs' && item.partOfSpeech !== 'verb') return false;
        if (['der', 'die', 'das'].includes(selectedArticle) && item.article !== selectedArticle) {
          return false;
        }
      }
      // Search query filter (matches German, Uzbek meaning, pronunciation, examples, tags)
      if (searchQuery.trim()) {
        const qRaw = searchQuery.toLowerCase().trim();
        const qNorm = normalizeGermanSearch(searchQuery);

        const inGerman =
          item.german.toLowerCase().includes(qRaw) ||
          normalizeGermanSearch(item.german).includes(qNorm);
        const inUzbek = item.meaningUz.toLowerCase().includes(qRaw);
        const inPronunciation =
          item.pronunciationUz.toLowerCase().includes(qRaw) ||
          item.pronunciationIPA.toLowerCase().includes(qRaw);
        const inArticle = item.article.toLowerCase() === qRaw;
        const inExamples = item.examples.some(
          (ex) =>
            ex.german.toLowerCase().includes(qRaw) ||
            normalizeGermanSearch(ex.german).includes(qNorm) ||
            ex.uzbek.toLowerCase().includes(qRaw)
        );
        const inTags = item.tags.some(
          (t) => t.toLowerCase().includes(qRaw) || normalizeGermanSearch(t).includes(qNorm)
        );
        return inGerman || inUzbek || inPronunciation || inArticle || inExamples || inTags;
      }
      return true;
    });

    if (sortBy === 'az') {
      list = [...list].sort((a, b) => a.german.localeCompare(b.german));
    } else {
      const levelRank: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
      list = [...list].sort((a, b) => (levelRank[a.level] || 0) - (levelRank[b.level] || 0));
    }

    return list;
  }, [words, searchQuery, selectedLevel, selectedArticle, sortBy]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Entrance German Flag Hero Banner */}
      <section className="relative bg-stone-900 dark:bg-black text-stone-100 overflow-hidden border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center relative z-10">
          {/* Flag badge right at entrance header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <GermanFlagBadge size="lg" className="shadow-lg ring-2 ring-white/10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <span>📚 Duden & Goethe-Institut Korpus Bazasidan ({words.length} ta so'z) · A1 — C2</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Nemis tili mukammal grammatikasi, artikllar va misollar
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Har bir so'zning rasmiy Duden artikli (<span className="text-blue-400 font-mono font-bold">der</span>,{' '}
            <span className="text-red-400 font-mono font-bold">die</span>,{' '}
            <span className="text-amber-400 font-mono font-bold">das</span>), ko'pligi, IPA fonetikasi, Kasus boshqaruvi va o'zbekcha tarjimasi bilan.
          </p>

          {/* MAIN PROMINENT SEARCH INPUT */}
          <div className="mt-8 max-w-2xl mx-auto relative text-left">
            <div className="relative flex items-center bg-white dark:bg-stone-900 rounded-2xl shadow-xl border-2 border-stone-300 dark:border-stone-700 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              <div className="pl-4 pr-2 text-stone-400">
                <Search className="w-5 h-5 text-amber-500" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nemischa so'z yoki tarjimasini qidiring (masalan: Tisch, Buch, Maktab, Sevmoq)..."
                className="w-full py-4 pr-11 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm sm:text-base bg-transparent focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label="Tozalash"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Word Discovery Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-300 justify-center">
              <span className="text-stone-400 font-medium">Tezkor so'zlar:</span>
              {['Sprache', 'Gemütlichkeit', 'Tisch', 'Buch', 'Sonne', 'Freund', 'Schule'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSearchQuery(item)}
                  className="hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4 cursor-pointer font-serif"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Featured German Word Showcase */}
        {featuredWord && !searchQuery && selectedLevel === 'all' && (
          <div
            onClick={() => onSelectWord(featuredWord)}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-amber-500/60 dark:hover:border-amber-500/60 transition-all cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                  <GermanFlagBadge size="sm" />
                  <span>Kun nemischa so'zi</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredWord.level} daraja</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {featuredWord.article}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                    {featuredWord.german}
                  </h2>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakGerman(featuredWord.german);
                    }}
                    className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span>{featuredWord.pronunciationIPA}</span>
                  <span className="mx-2">·</span>
                  <span className="italic text-amber-600 dark:text-amber-400 font-sans">
                    o'qilishi: «{featuredWord.pronunciationUz}»
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-200 max-w-2xl">
                  {featuredWord.meaningUz}
                </p>

                {/* Example sentence + translation underneath */}
                {featuredWord.examples[0] && (
                  <div className="bg-stone-50 dark:bg-stone-800/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 text-xs sm:text-sm space-y-1 max-w-2xl mt-2">
                    <div className="flex items-start gap-2 text-stone-900 dark:text-stone-100 font-serif">
                      <span className="text-amber-500 font-mono font-bold text-xs">DE:</span>
                      <span>"{featuredWord.examples[0].german}"</span>
                    </div>
                    <div className="flex items-start gap-2 text-stone-600 dark:text-stone-300 italic pl-6 text-xs font-sans">
                      <span className="text-stone-400 dark:text-stone-500 not-italic font-mono font-bold text-[10px]">UZ:</span>
                      <span>"{featuredWord.examples[0].uzbek}"</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              {isAdmin && (
                <div className="flex flex-row md:flex-col gap-2 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAddWord();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-900 dark:text-stone-100 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-500" />
                    <span>Yangi so'z qo'shish</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter Toolbar: Live Search + CEFR Level + Article + Sort + Add button */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Inline Quick Search input inside toolbar */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ro'yxatdan tezkor qidirish..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* CEFR Level Selector */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-stone-500 dark:text-stone-400 font-medium mr-1 shrink-0">Daraja:</span>
            {userLevel && (
              <button
                type="button"
                onClick={() => setSelectedLevel(userLevel)}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedLevel === userLevel
                    ? 'bg-emerald-500 text-stone-950 shadow-xs'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                }`}
                title="Sizning joriy darajangizdagi so'zlar"
              >
                <span>⭐ Mening darajam ({userLevel})</span>
              </button>
            )}
            {['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {lvl === 'all' ? 'Barchasi' : lvl}
              </button>
            ))}
          </div>

          {/* Article Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 dark:text-stone-400 font-medium mr-1">Artikl:</span>
            <button
              type="button"
              onClick={() => setSelectedArticle('all')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedArticle === 'all'
                  ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              Hammasi
            </button>
            <button
              type="button"
              onClick={() => setSelectedArticle('der')}
              className={`px-2.5 py-1.5 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                selectedArticle === 'der'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
              }`}
            >
              der
            </button>
            <button
              type="button"
              onClick={() => setSelectedArticle('die')}
              className={`px-2.5 py-1.5 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                selectedArticle === 'die'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300'
              }`}
            >
              die
            </button>
            <button
              type="button"
              onClick={() => setSelectedArticle('das')}
              className={`px-2.5 py-1.5 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                selectedArticle === 'das'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
              }`}
            >
              das
            </button>
          </div>

          {/* Add Word CTA button (only for admin) */}
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenAddWord}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>So'z qo'shish</span>
            </button>
          )}
        </div>

        {/* Saved Toast Notice */}
        {savedNotice && (
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{savedNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setSavedNotice('')}
              className="text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dynamic 300,000+ Word Morphological Result (Shown when searching any new word) */}
        {synthesizedWord && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/30 space-y-4 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>300,000+ SO'Z BAZASIDAN MORFOLOGIK TAHLIL VA TO'G'RI ARTIKL</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectWord(synthesizedWord)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>Batafsil ko'rish</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAddWord?.(synthesizedWord);
                    setSavedNotice(`«${synthesizedWord.german}» so'zi shaxsiy lug'atingizga muvaffaqiyatli saqlandi!`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>+ Lug'atga saqlash</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {synthesizedWord.article !== 'none' && (
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      synthesizedWord.article === 'der' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      synthesizedWord.article === 'die' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {synthesizedWord.article}
                    </span>
                  )}
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {synthesizedWord.german}
                  </h3>
                  <button
                    type="button"
                    onClick={() => speakGerman(synthesizedWord.german)}
                    className="p-1 rounded-full text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-stone-500 font-mono">
                  Ko'pligi: {synthesizedWord.plural} • {synthesizedWord.partOfSpeechUz}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">O'zbekcha ma'nosi:</div>
                <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {synthesizedWord.meaningUz}
                </div>
                {synthesizedWord.grammarNotes && (
                  <div className="text-[11px] text-amber-700 dark:text-amber-300 italic">
                    💡 {synthesizedWord.grammarNotes}
                  </div>
                )}
              </div>

              {synthesizedWord.examples[0] && (
                <div className="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    "{synthesizedWord.examples[0].german}"
                  </div>
                  <div className="text-stone-500 italic">
                    "{synthesizedWord.examples[0].uzbek}"
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Counter & Sorting Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono px-1">
          <span>
            {searchQuery ? `"${searchQuery}" bo'yicha ` : ''}
            <strong className="text-stone-900 dark:text-stone-100">{filteredWords.length} ta</strong> nemischa so'z topildi
          </span>
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Tartiblash:</span>
            <button
              type="button"
              onClick={() => setSortBy(sortBy === 'az' ? 'level' : 'az')}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
            >
              {sortBy === 'az' ? 'Alifbo (A-Z)' : 'Daraja bo\'yicha (A1-C2)'}
            </button>
          </div>
        </div>

        {/* Words Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWords.map((word, idx) => (
            <GermanWordCard
              key={`${word.id}-${idx}`}
              word={word}
              onSelectWord={onSelectWord}
              onOpenAIAnalysis={onOpenAIAnalysis}
            />
          ))}
        </div>

        {/* Empty state (only shown if not even synthesized) */}
        {filteredWords.length === 0 && !synthesizedWord && (
          <div className="py-16 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200">
              Hech qanday so'z topilmadi
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              «{searchQuery}» so'rovi bo'yicha nemischa so'z chiqmadi. Qidiruvni boshqacha yozib ko'ring yoki yangi so'z qo'shing!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Qidiruvni tozalash
                </button>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={onOpenAddWord}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-stone-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ushbu so'zni qo'shish</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
