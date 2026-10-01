import React from 'react';
import { WordEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { X, Trash2, ArrowRight, BookOpen, Volume2 } from 'lucide-react';

interface SavedWordsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: WordEntry[];
  alphabet: AlphabetMode;
  onSelectWord: (word: WordEntry) => void;
  onRemoveWord: (id: string) => void;
  onClearAll: () => void;
}

export const SavedWordsDrawer: React.FC<SavedWordsDrawerProps> = ({
  isOpen,
  onClose,
  savedWords,
  alphabet,
  onSelectWord,
  onRemoveWord,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 dark:bg-black/70 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/60">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Saqlangan so'zlar
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Jami: {savedWords.length} ta so'z
            </span>
          </div>

          <div className="flex items-center gap-1">
            {savedWords.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Barchasini tozalash"
              >
                Tozalash
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedWords.length === 0 ? (
            <div className="py-16 text-center text-xs text-stone-400 space-y-2">
              <BookOpen className="w-8 h-8 text-stone-300 dark:text-stone-700 mx-auto" />
              <p>Hozircha saqlangan so'zlar yo'q.</p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500">
                Lug'atdagi istalgan so'z ustidagi xatcho'p (bookmark) belgisini bosib, uni shaxsiy to'plamingizga qo'shishingiz mumkin.
              </p>
            </div>
          ) : (
            savedWords.map((word) => {
              const displayWord = formatWithAlphabet(word.word, word.wordCyrillic, alphabet);
              return (
                <div
                  key={word.id}
                  onClick={() => {
                    onSelectWord(word);
                    onClose();
                  }}
                  className="p-3.5 bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 rounded-xl cursor-pointer transition-colors group flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      {displayWord}
                    </h4>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
                      [{word.phonetic}] · {word.partOfSpeech}
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1 mt-1 font-sans">
                      {word.definitions[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveWord(word.id);
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-500 dark:text-stone-400 text-center">
          Ma'lumotlar brauzeringiz xotirasida (localStorage) saqlanadi.
        </div>
      </div>
    </div>
  );
};
