import React, { useState, useRef, useEffect } from 'react';
import { WordEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { Search, Sparkles, BookOpen, X, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  alphabet: AlphabetMode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectWord: (word: WordEntry) => void;
  allWords: WordEntry[];
  wordOfTheDay: WordEntry | null;
  onOpenWordOfTheDay: () => void;
}

const CATEGORIES = [
  { id: 'all', labelUz: 'Barchasi', labelCyr: 'Барчаси' },
  { id: 'mumtoz', labelUz: 'Mumtoz so\'zlar', labelCyr: 'Мумтоз сўзлар' },
  { id: 'falsafiy', labelUz: 'Falsafiy tushunchalar', labelCyr: 'Фалсафий тушунчалар' },
  { id: 'it-texnologiya', labelUz: 'IT va Texnologiya', labelCyr: 'IT ва Технология' },
  { id: 'adabiy', labelUz: 'Badiiy nutq', labelCyr: 'Бадиий нутқ' },
  { id: 'huquqiy', labelUz: 'Huquq va jamiyat', labelCyr: 'Ҳуқуқ ва жамият' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  alphabet,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSelectWord,
  allWords,
  wordOfTheDay,
  onOpenWordOfTheDay,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Suggestions for live query
  const suggestions = searchQuery.trim()
    ? allWords
        .filter((w) => {
          const q = searchQuery.toLowerCase();
          return (
            w.word.toLowerCase().includes(q) ||
            w.wordCyrillic.toLowerCase().includes(q) ||
            w.definitions.some((d) => d.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity overflow-hidden">
        <img
          src="/src/assets/images/hero_sozhub_manuscript_1790607571577.jpg"
          alt="Uzbek Calligraphy Manuscript and Library"
          className="w-full h-full object-cover object-center filter saturate-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/85 to-stone-900/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center">
        {/* Curatorial Header */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono mb-3">
          <span>worthub.uz — Keng qamrovli so'z va iboralar xazinasi</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          {alphabet === 'latin'
            ? "Boy va mukammal so'z xazinasi"
            : "Бой ва мукаммал сўз хазинаси"}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
          {alphabet === 'latin'
            ? "Mumtoz adabiyotdan zamonaviy axborot texnologiyalarigacha bo'lgan so'zlar, iboralar, morfemik tuzilish va sun'iy intellekt tahlili."
            : "Мумтоз адабиётдан замонавий ахборот технологияларигача бўлган сўзлар, иборалар, морфемик тузилиш ва сунъий интеллект таҳлили."}
        </p>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-2xl mx-auto relative text-left" ref={dropdownRef}>
          <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <div className="pl-4 pr-2 text-stone-400">
              <Search className="w-5 h-5 text-stone-500" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={
                alphabet === 'latin'
                  ? "So'zni qidiring (masalan: Saodat, Farosat, Algoritm, Mehr...)"
                  : "Сўзни қидиринг (масалан: Саодат, Фаросат, Алгоритм, Меҳр...)"
              }
              className="w-full py-3.5 pr-10 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base bg-transparent focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Tozalash"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden z-30">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50 border-b border-stone-100">
                Tavsiya etilgan so'zlar
              </div>
              <ul className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      onSelectWord(item);
                      setIsFocused(false);
                    }}
                    className="p-3 hover:bg-stone-50 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <span className="font-serif font-semibold text-stone-900 group-hover:text-emerald-800 text-base">
                        {formatWithAlphabet(item.word, item.wordCyrillic, alphabet)}
                      </span>
                      <span className="ml-2 text-xs text-stone-400 font-mono">[{item.phonetic}]</span>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                        {item.definitions[0]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Word Discovery Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-stone-300">
            <span className="text-stone-400 font-medium">Ommabop:</span>
            {['Saodat', "Ma'rifat", 'Farosat', 'Shukrona', 'Tamaddun', "Sun'iy intellekt"].map((w) => (
              <button
                key={w}
                onClick={() => onSearchChange(w)}
                className="hover:text-emerald-300 transition-colors underline decoration-stone-600 underline-offset-4 cursor-pointer"
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs (Single-line interactive segmented control) */}
        <div className="mt-8 flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 bg-stone-800/80 rounded-lg border border-stone-700/80 text-xs">
            {CATEGORIES.map((cat) => {
              const label = alphabet === 'latin' ? cat.labelUz : cat.labelCyr;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Word of the day marquee callout */}
        {wordOfTheDay && (
          <div className="mt-6 pt-5 border-t border-stone-800/80 max-w-xl mx-auto flex items-center justify-between text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono uppercase tracking-wider font-semibold">
                Bugungi so'z:
              </span>
              <button
                onClick={onOpenWordOfTheDay}
                className="font-serif font-bold text-white hover:text-emerald-300 underline decoration-emerald-500/60 underline-offset-4 cursor-pointer text-sm"
              >
                {formatWithAlphabet(wordOfTheDay.word, wordOfTheDay.wordCyrillic, alphabet)}
              </button>
              <span className="text-stone-400 italic hidden sm:inline truncate max-w-xs">
                — {wordOfTheDay.definitions[0]}
              </span>
            </div>
            <button
              onClick={onOpenWordOfTheDay}
              className="text-stone-400 hover:text-white shrink-0 ml-2 text-[11px] font-medium"
            >
              Ko'rish &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
