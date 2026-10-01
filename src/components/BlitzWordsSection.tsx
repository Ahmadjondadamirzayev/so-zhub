import React, { useState, useMemo } from 'react';
import { BlitzScheduledWord, BlitzScheduleDay, GermanArticle } from '../types';
import { GermanFlagBadge } from './GermanFlagBadge';
import { 
  Zap, 
  Calendar, 
  Search, 
  Volume2, 
  BookmarkPlus, 
  CheckCircle2, 
  Filter, 
  Gamepad2, 
  Plus, 
  Check, 
  Trash2, 
  Clock, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface BlitzWordsSectionProps {
  blitzWords: BlitzScheduledWord[];
  onToggleActive?: (id: string) => void;
  onDeleteWord?: (id: string) => void;
  onOpenAdminSchedule?: () => void;
  onGoToGames: () => void;
  isAdmin?: boolean;
}

export const BlitzWordsSection: React.FC<BlitzWordsSectionProps> = ({
  blitzWords,
  onToggleActive,
  onDeleteWord,
  onOpenAdminSchedule,
  onGoToGames,
  isAdmin = false,
}) => {
  const [selectedDay, setSelectedDay] = useState<BlitzScheduleDay | 'all'>('all');
  const [selectedLektion, setSelectedLektion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');

  // Audio speech
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Only show active words to regular students; show all to Admin
  const availableWords = useMemo(() => {
    if (isAdmin) return blitzWords;
    return blitzWords.filter((w) => w.isActive);
  }, [blitzWords, isAdmin]);

  // Available lektion numbers
  const allLektionNumbers = useMemo(() => {
    const nums = Array.from(new Set(blitzWords.map((w) => w.lektionNumber))).sort((a, b) => a - b);
    return nums.length > 0 ? nums : [1, 2, 3];
  }, [blitzWords]);

  // Filtered words
  const filteredWords = useMemo(() => {
    return availableWords.filter((w) => {
      // Day filter
      if (selectedDay !== 'all' && w.day !== selectedDay) {
        return false;
      }
      // Lektion filter
      if (selectedLektion !== 'all' && String(w.lektionNumber) !== selectedLektion) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inGerman = w.german.toLowerCase().includes(q);
        const inUzbek = w.uzbek.toLowerCase().includes(q);
        const inNotes = w.notes ? w.notes.toLowerCase().includes(q) : false;
        return inGerman || inUzbek || inNotes;
      }
      return true;
    });
  }, [availableWords, selectedDay, selectedLektion, searchQuery]);

  // Counts by day
  const dushanbaCount = useMemo(() => blitzWords.filter((w) => w.day === 'Dushanba' && (isAdmin || w.isActive)).length, [blitzWords, isAdmin]);
  const chorshanbaCount = useMemo(() => blitzWords.filter((w) => w.day === 'Chorshanba' && (isAdmin || w.isActive)).length, [blitzWords, isAdmin]);
  const jumaCount = useMemo(() => blitzWords.filter((w) => w.day === 'Juma' && (isAdmin || w.isActive)).length, [blitzWords, isAdmin]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Banner */}
      <section className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GermanFlagBadge size="md" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Zap className="w-3.5 h-3.5" />
              <span>Blitz O'quv Markazi Maxsus So'zlar Dasturi</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Haftalik Dars So'zlari & Grammatika O'yinlari
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Har <strong className="text-amber-400">Dushanba</strong>, <strong className="text-amber-400">Chorshanba</strong> va <strong className="text-amber-400">Juma</strong> kunlari
            leksiyalar ketma-ketligida (Lektion 1 dan boshlab) topshiriladigan so'zlar majmui va grammatik mashqlar.
          </p>

          {/* Quick Schedule Cards Bar */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setSelectedDay(selectedDay === 'Dushanba' ? 'all' : 'Dushanba')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedDay === 'Dushanba'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg ring-1 ring-blue-500'
                  : 'bg-stone-800/80 border-stone-700/80 hover:border-blue-500/50 text-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Dushanba</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                  {dushanbaCount} ta so'z
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">Yangi leksiya mavzulari va tayanch leksika</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedDay(selectedDay === 'Chorshanba' ? 'all' : 'Chorshanba')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedDay === 'Chorshanba'
                  ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500'
                  : 'bg-stone-800/80 border-stone-700/80 hover:border-emerald-500/50 text-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Chorshanba</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  {chorshanbaCount} ta so'z
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">Grammatika amaliyoti va gap qurilmalari</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedDay(selectedDay === 'Juma' ? 'all' : 'Juma')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedDay === 'Juma'
                  ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg ring-1 ring-amber-500'
                  : 'bg-stone-800/80 border-stone-700/80 hover:border-amber-500/50 text-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Juma</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {jumaCount} ta so'z
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">Muloqot, dialog va hafta mustahkamlash</p>
            </button>
          </div>

          {/* Quick CTA to Grammar Games */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGoToGames}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Barcha Grammatika O'yinlariga o'tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={onOpenAdminSchedule}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>+ Yangi Lektion So'zini Qo'shish (Admin)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Blitz so'zlarini qidirish..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Lektion selector */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 dark:text-stone-400 font-medium">Leksiya:</span>
            <select
              value={selectedLektion}
              onChange={(e) => setSelectedLektion(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">Barcha Lektionlar</option>
              {allLektionNumbers.map((num) => (
                <option key={num} value={String(num)}>
                  Lektion {num}
                </option>
              ))}
            </select>
          </div>

          {/* Day Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-500 dark:text-stone-400 font-medium mr-1">Kun:</span>
            <button
              type="button"
              onClick={() => setSelectedDay('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedDay === 'all'
                  ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              Hammasi
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay('Dushanba')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedDay === 'Dushanba'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
              }`}
            >
              Dushanba
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay('Chorshanba')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedDay === 'Chorshanba'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              Chorshanba
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay('Juma')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedDay === 'Juma'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
              }`}
            >
              Juma
            </button>
          </div>
        </div>

        {/* Counter & Status Header */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono px-1">
          <span>
            {selectedDay !== 'all' ? `${selectedDay} kuni uchun ` : ''}
            {selectedLektion !== 'all' ? `Lektion ${selectedLektion} bo'yicha ` : ''}
            <strong className="text-stone-900 dark:text-stone-100">{filteredWords.length} ta so'z</strong> mavjud
          </span>
          {isAdmin && (
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
              <span>Admin rejimi: Checkbox orqali o'quvchilarga ko'rsatish/yashirish mumkin</span>
            </span>
          )}
        </div>

        {/* Words Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                word.isActive
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-500/60'
                  : 'bg-stone-100/60 dark:bg-stone-950/60 border-dashed border-stone-300 dark:border-stone-800 opacity-70'
              }`}
            >
              <div>
                {/* Badges Line */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      Lektion {word.lektionNumber}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        word.day === 'Dushanba'
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                          : word.day === 'Chorshanba'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {word.day}
                    </span>
                  </div>

                  {/* Admin status or checkbox */}
                  {isAdmin ? (
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold select-none">
                      <input
                        type="checkbox"
                        checked={word.isActive}
                        onChange={() => onToggleActive?.(word.id)}
                        className="w-4 h-4 text-amber-500 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className={word.isActive ? 'text-emerald-600 font-bold' : 'text-stone-400'}>
                        {word.isActive ? 'Faol' : 'Qoralama'}
                      </span>
                    </label>
                  ) : (
                    word.isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>O'rganishga tayyor</span>
                      </span>
                    )
                  )}
                </div>

                {/* German word with article */}
                <div className="flex items-center gap-2 mt-1">
                  {word.article && word.article !== 'none' && (
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        word.article === 'der'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : word.article === 'die'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {word.article}
                    </span>
                  )}
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                    {word.german}
                  </h3>
                  <button
                    type="button"
                    onClick={() => speakGerman(word.german)}
                    className="p-1 rounded-full text-stone-400 hover:text-amber-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Talaffuzni tinglash"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Plural info */}
                {word.plural && word.plural !== '—' && (
                  <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                    Ko'pligi: <span className="text-stone-700 dark:text-stone-300">{word.plural}</span>
                  </div>
                )}

                {/* Uzbek translation */}
                <div className="mt-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {word.uzbek}
                </div>

                {/* Teacher notes */}
                {word.notes && (
                  <div className="mt-2 text-xs text-amber-700 dark:text-amber-300 italic bg-amber-50/60 dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200/50 dark:border-amber-800/40">
                    💡 {word.notes}
                  </div>
                )}
              </div>

              {/* Bottom Card Bar */}
              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-400 font-mono">
                  Sana: {word.addedAt}
                </span>

                <div className="flex items-center gap-1.5">
                  {isAdmin && onDeleteWord && (
                    <button
                      type="button"
                      onClick={() => onDeleteWord(word.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                      title="So'zni o'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => speakGerman(word.german)}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-[11px] transition-colors cursor-pointer"
                  >
                    Tinglash
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredWords.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="text-base font-bold text-stone-800 dark:text-stone-200">
              Ushbu filtr bo'yicha so'zlar topilmadi
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Boshqa kun yoki leksiya raqamini tanlab ko'ring yoki qidiruv so'zini o'zgartiring.
            </p>
            {isAdmin && (
              <button
                type="button"
                onClick={onOpenAdminSchedule}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Ushbu leksiya uchun so'z qo'shish</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
