import React from 'react';
import { GermanWordEntry } from '../types';
import { Volume2, Sparkles, ArrowRight, BookOpen, Quote, Layers } from 'lucide-react';

interface GermanWordCardProps {
  word: GermanWordEntry;
  onSelectWord: (word: GermanWordEntry) => void;
  onOpenAIAnalysis: (word: GermanWordEntry) => void;
}

export const GermanWordCard: React.FC<GermanWordCardProps> = ({
  word,
  onSelectWord,
  onOpenAIAnalysis,
}) => {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = word.article !== 'none' ? `${word.article} ${word.german}` : word.german;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getArticleBadgeStyle = (art: string) => {
    switch (art) {
      case 'der':
        return 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      case 'die':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800';
      case 'das':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      default:
        return 'text-stone-600 bg-stone-100 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700';
    }
  };

  const getLevelBadgeStyle = (lvl: string) => {
    switch (lvl) {
      case 'A1':
      case 'A2':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'B1':
      case 'B2':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
      case 'C1':
      case 'C2':
        return 'text-purple-700 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300';
      default:
        return 'text-stone-600 bg-stone-100 dark:bg-stone-800 dark:text-stone-300';
    }
  };

  return (
    <article
      onClick={() => onSelectWord(word)}
      className="group relative bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Article + German Word + Level + Audio */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {word.article !== 'none' && (
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${getArticleBadgeStyle(word.article)}`}>
                  {word.article}
                </span>
              )}
              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                {word.german}
              </h3>
              <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${getLevelBadgeStyle(word.level)}`}>
                {word.level}
              </span>
            </div>

            {/* Pronunciation & Plural line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-mono mt-1">
              <span>{word.pronunciationIPA}</span>
              <span aria-hidden="true">·</span>
              <span className="italic text-emerald-800 dark:text-emerald-400 font-sans">
                o'qilishi: «{word.pronunciationUz}»
              </span>
              {word.plural && word.plural !== '—' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Ko'pligi: {word.plural}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleSpeak}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer shrink-0"
            title="Nemischa talaffuzni eshitish"
            aria-label="Talaffuz"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Meaning in Uzbek */}
        <div className="mt-2.5">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 leading-snug">
            {word.meaningUz}
          </p>
        </div>

        {/* Examples Section: German Sentence with Uzbek translation directly below */}
        {word.examples && word.examples.length > 0 && (
          <div className="mt-3.5 space-y-2.5 pt-3 border-t border-stone-100 dark:border-stone-800/80">
            {word.examples.slice(0, 2).map((ex, idx) => (
              <div
                key={idx}
                className="bg-stone-50/90 dark:bg-stone-800/60 p-3 rounded-lg border border-stone-200/60 dark:border-stone-700/60 text-xs"
              >
                {/* German sentence */}
                <div className="flex items-start gap-1.5 font-medium text-stone-900 dark:text-stone-100">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">DE:</span>
                  <span className="font-serif text-[13px]">{ex.german}</span>
                </div>

                {/* Uzbek translation underneath */}
                <div className="flex items-start gap-1.5 text-stone-600 dark:text-stone-400 mt-1 pl-6 italic">
                  <span className="text-stone-400 dark:text-stone-500 not-italic font-bold text-[10px] shrink-0">UZ:</span>
                  <span>{ex.uzbek}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Detail & AI buttons */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenAIAnalysis(word);
          }}
          className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 font-medium px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
          <span>AI grammatik tahlil</span>
        </button>

        <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors font-medium">
          <span>Batafsil ko'rish</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
};
