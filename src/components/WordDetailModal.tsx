import React from 'react';
import { WordEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { X, Volume2, Bookmark, Sparkles, BookOpen, Layers, Quote, Share2, Check } from 'lucide-react';

interface WordDetailModalProps {
  word: WordEntry | null;
  alphabet: AlphabetMode;
  isSaved: boolean;
  onToggleSave: (word: WordEntry) => void;
  onClose: () => void;
  onOpenAIAnalysis: (word: WordEntry) => void;
  onSelectSynonym?: (synonym: string) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  alphabet,
  isSaved,
  onToggleSave,
  onClose,
  onOpenAIAnalysis,
  onSelectSynonym,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!word) return null;

  const displayWord = formatWithAlphabet(word.word, word.wordCyrillic, alphabet);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = async () => {
    const textToShare = `${word.word} [${word.phonetic}] — ${word.definitions[0]}\n(Manba: worthub.uz)`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {displayWord}
              </h2>
              <button
                onClick={handleSpeak}
                className="p-2 rounded-full text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                title="Talaffuzni tinglash"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mt-1.5">
              <span>{word.phonetic}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{word.partOfSpeechNameUz}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{word.origin}</span>
              <span aria-hidden="true">·</span>
              <span>Ko'p ishlatilish darajasi: #{word.frequencyRank}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleSave(word)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
              title={isSaved ? "Saqlanganlardan o'chirish" : "Lug'atga saqlash"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
              title="Nusxa olish va ulashish"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Origin & Etymology Card */}
          <section className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 rounded-xl p-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-1">
              Etimologik kelib chiqishi
            </h4>
            <p className="text-sm text-stone-800 dark:text-stone-200 font-serif">
              {word.originDetails}
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2.5">
              Izohli ma'nolari
            </h4>
            <ol className="space-y-3">
              {word.definitions.map((def, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-xs mt-0.5 w-4 shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{def}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Morpheme Analysis Diagram */}
          {word.morphemes && (
            <section className="border-t border-stone-200 dark:border-stone-800 pt-5">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2">
                <Layers className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Morfemik tahlil (O'zak va qo'shimchalar)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 rounded-lg">
                <div className="text-center px-3 py-1.5 bg-white dark:bg-stone-800 border border-emerald-300 dark:border-emerald-700 rounded-md">
                  <div className="text-sm font-bold text-emerald-900 dark:text-emerald-300 font-mono">{word.morphemes.root}</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">O'zak ({word.morphemes.rootType})</div>
                </div>

                {word.morphemes.affixes && word.morphemes.affixes.map((aff, i) => (
                  <React.Fragment key={i}>
                    <span className="text-stone-400 font-mono">+</span>
                    <div className="text-center px-2.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md">
                      <div className="text-sm font-semibold text-stone-800 dark:text-stone-200 font-mono">{aff.text}</div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400">{aff.type}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}

          {/* Literary Examples */}
          {word.examples && word.examples.length > 0 && (
            <section className="border-t border-stone-200 dark:border-stone-800 pt-5">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-3">
                <Quote className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Badiiy va mumtoz adabiyotdan namunalar</span>
              </div>
              <div className="space-y-3">
                {word.examples.map((ex, idx) => (
                  <blockquote
                    key={idx}
                    className="p-3.5 bg-stone-50/60 dark:bg-stone-800/60 border-l-2 border-emerald-700 dark:border-emerald-400 rounded-r-lg text-sm text-stone-700 dark:text-stone-300"
                  >
                    <p className="font-serif italic leading-relaxed">
                      "{ex.quote}"
                    </p>
                    <footer className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium not-italic">
                      — {ex.author}, <cite className="font-serif">{ex.source}</cite> {ex.year ? `(${ex.year})` : ''}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          {/* Synonyms & Antonyms */}
          <section className="border-t border-stone-200 dark:border-stone-800 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2">
                  Ma'nodosh so'zlar (Sinonimlar)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.synonyms.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectSynonym && onSelectSynonym(s)}
                      className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {word.antonyms && word.antonyms.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2">
                  Qarama-qarshi so'zlar (Antonimlar)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.antonyms.map((a, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-md border border-stone-200 dark:border-stone-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">
            Manba: O'zbek tilining 5 jildlik izohli lug'ati
          </div>

          <button
            onClick={() => onOpenAIAnalysis(word)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI chuqur tahlili</span>
          </button>
        </div>
      </div>
    </div>
  );
};
