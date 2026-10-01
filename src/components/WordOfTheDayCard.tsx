import React from 'react';
import { WordEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { Volume2, Sparkles, Quote, ArrowRight } from 'lucide-react';

interface WordOfTheDayCardProps {
  word: WordEntry;
  alphabet: AlphabetMode;
  onSelectWord: (word: WordEntry) => void;
  onOpenAIAnalysis: (word: WordEntry) => void;
}

export const WordOfTheDayCard: React.FC<WordOfTheDayCardProps> = ({
  word,
  alphabet,
  onSelectWord,
  onOpenAIAnalysis,
}) => {
  const displayWord = formatWithAlphabet(word.word, word.wordCyrillic, alphabet);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      onClick={() => onSelectWord(word)}
      className="relative bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-6 sm:p-8 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden group"
    >
      {/* Decorative Ceramic Emblem in the corner */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-10 overflow-hidden pointer-events-none">
        <img
          src="/src/assets/images/linguistic_pattern_badge_1790607595747.jpg"
          alt="Uzbek ceramic mosaic ornament"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-semibold">
            <span>Kun o'zbekcha so'zi</span>
            <span aria-hidden="true">·</span>
            <span>{new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
              {displayWord}
            </h2>
            <button
              onClick={handleSpeak}
              className="p-2 rounded-full text-stone-400 dark:text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
              title="Talaffuz"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
            <span>{word.phonetic}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{word.partOfSpeechNameUz}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{word.originDetails}</span>
          </div>

          <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-sans max-w-2xl">
            {word.definitions[0]}
          </p>

          {word.examples && word.examples.length > 0 && (
            <div className="pt-2 flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic bg-stone-50/80 dark:bg-stone-800/60 p-3.5 rounded-xl border border-stone-200/60 dark:border-stone-700/60 max-w-2xl">
              <Quote className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-serif">"{word.examples[0].quote}"</span>
                <span className="block not-italic text-stone-500 dark:text-stone-400 text-xs font-sans mt-1">
                  — {word.examples[0].author}, <em>{word.examples[0].source}</em>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Column */}
        <div className="flex flex-row md:flex-col gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenAIAnalysis(word);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>AI etimologik tahlili</span>
          </button>

          <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors">
            <span>To'liq maqolani ochish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
