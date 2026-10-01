import React from 'react';
import { WordEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { Volume2, Bookmark, Sparkles, ArrowRight, Quote } from 'lucide-react';

interface WordCardProps {
  word: WordEntry;
  alphabet: AlphabetMode;
  isSaved: boolean;
  onToggleSave: (word: WordEntry) => void;
  onSelectWord: (word: WordEntry) => void;
  onOpenAIAnalysis: (word: WordEntry) => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  alphabet,
  isSaved,
  onToggleSave,
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
    <article
      onClick={() => onSelectWord(word)}
      className="group relative bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-5 hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Word + Actions */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
              {displayWord}
            </h3>
            {/* Unboxed metadata line with typographic separators */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
              <span>{word.phonetic}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{word.partOfSpeech}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{word.origin}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer"
              title="Talaffuzni tinglash"
              aria-label="Talaffuz"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(word);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isSaved
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isSaved ? "Saqlanganlardan o'chirish" : "Saqlash"}
              aria-label="Saqlash"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Primary Definition */}
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-2 mt-2 font-sans">
          {word.definitions[0]}
        </p>

        {/* Literary Quote Snippet if present */}
        {word.examples && word.examples.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400 italic bg-stone-50/70 dark:bg-stone-800/60 p-2.5 rounded-lg">
            <Quote className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 shrink-0 mt-0.5" />
            <div className="line-clamp-2">
              <span>"{word.examples[0].quote}"</span>
              <span className="block not-italic text-stone-500 dark:text-stone-400 text-[11px] mt-0.5 font-medium">
                — {word.examples[0].author}, <em>{word.examples[0].source}</em>
              </span>
            </div>
          </div>
        )}

        {/* Synonyms Preview */}
        {word.synonyms && word.synonyms.length > 0 && (
          <div className="mt-3 text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-medium text-stone-700 dark:text-stone-300 shrink-0">Sinonimlar:</span>
            <span className="truncate text-stone-600 dark:text-stone-400">{word.synonyms.slice(0, 3).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Card Footer: Detail Link + AI Trigger */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenAIAnalysis(word);
          }}
          className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 font-medium px-2 py-1 rounded bg-emerald-50/70 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
          <span>AI tahlili</span>
        </button>

        <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors font-medium">
          <span>Batafsil</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
};
