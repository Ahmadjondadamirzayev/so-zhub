import React, { useState } from 'react';
import { IdiomEntry, AlphabetMode } from '../types';
import { formatWithAlphabet } from '../utils/transliterate';
import { Search, Volume2, Quote, Copy, Check, BookOpen } from 'lucide-react';

interface IdiomsSectionProps {
  idioms: IdiomEntry[];
  alphabet: AlphabetMode;
}

export const IdiomsSection: React.FC<IdiomsSectionProps> = ({ idioms, alphabet }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    idioms.forEach((item) => item.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [idioms]);

  // Filter idioms
  const filteredIdioms = idioms.filter((item) => {
    const matchesSearch =
      item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async (id: string, text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Editorial Title */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800">
          O'zbek tili iboralar xazinasi
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          Frazeologik lug'at va turg'un birikmalar
        </h2>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed font-sans">
          Xalq donishmandligi, ko'chma ma'nolar va xalq tilidagi eng shirali, purma'no iboralarning batafsil sharhlari.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Iborani qidiring..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-600 shadow-xs"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Barchasi ({idioms.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors capitalize cursor-pointer ${
                selectedTag === tag
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Idiom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIdioms.map((item) => {
          const phraseText = formatWithAlphabet(item.phrase, item.phraseCyrillic, alphabet);
          return (
            <article
              key={item.id}
              className="bg-white border border-stone-200 rounded-xl p-5 hover:border-emerald-600/50 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    "{phraseText}"
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSpeak(item.phrase)}
                      className="p-1.5 rounded text-stone-400 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                      title="Tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(item.id, `${item.phrase} — ${item.meaning}`)}
                      className="p-1.5 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                      title="Nusxa olish"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Meaning */}
                <p className="text-sm font-medium text-emerald-950 mt-2 leading-relaxed">
                  {item.meaning}
                </p>

                {/* Literal Meaning if exists */}
                {item.literalMeaning && (
                  <p className="text-xs text-stone-500 mt-1 italic">
                    So'zma-so'z: {item.literalMeaning}
                  </p>
                )}

                {/* Contextual Example Quote */}
                <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-start gap-2 bg-stone-50/80 p-3 rounded-lg text-xs text-stone-700">
                  <Quote className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="italic font-serif">"{item.example}"</span>
                    <span className="block text-[11px] text-stone-400 font-sans mt-0.5">
                      — {item.authorOrContext}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {filteredIdioms.length === 0 && (
        <div className="py-12 text-center text-sm text-stone-500 bg-white border border-stone-200 rounded-xl">
          Qidiruv bo'yicha hech qanday ibora topilmadi.
        </div>
      )}
    </section>
  );
};
