import React, { useState } from 'react';
import { StudentLearner } from '../types';
import { Trophy, Flame, UserPlus, Sparkles, Plus, Award, Trash2 } from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';

interface StudentsLeaderboardProps {
  students: StudentLearner[];
  onOpenAddStudent: () => void;
  onPracticeWords: () => void;
  onAddXP?: (id: string, xp: number) => void;
  onDeleteStudent?: (id: string) => void;
  isAdmin?: boolean;
}

export const StudentsLeaderboard: React.FC<StudentsLeaderboardProps> = ({
  students,
  onOpenAddStudent,
  onPracticeWords,
  onAddXP,
  onDeleteStudent,
  isAdmin = false,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const sortedStudents = React.useMemo(() => {
    let list = [...students];
    if (filterLevel !== 'all') {
      list = list.filter((s) => s.level === filterLevel);
    }
    return list.sort((a, b) => b.xpPoints - a.xpPoints);
  }, [students, filterLevel]);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs shadow-md">
            🥇 1
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-bold flex items-center justify-center text-xs shadow-sm">
            🥈 2
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            🥉 3
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono font-bold flex items-center justify-center text-xs">
            {rank}
          </div>
        );
    }
  };

  return (
    <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GermanFlagBadge size="sm" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
              worthub.uz o'quvchilar ligasi
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            O'quvchilar reytingi va ballar jadvali
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-sans">
            Nemis tili darslari, o'yinlardagi faollik va o'zlashtirilgan so'zlar bo'yicha yetakchilar ro'yxati.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenAddStudent}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Yangi o'quvchi qo'shish</span>
            </button>
          )}

          <button
            type="button"
            onClick={onPracticeWords}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>O'yinlar bilan ball to'plash</span>
          </button>
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-stone-500 dark:text-stone-400 font-medium mr-1">Filtr:</span>
          {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterLevel === lvl
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {lvl === 'all' ? 'Barchasi' : lvl}
            </button>
          ))}
        </div>

        <span className="text-stone-500 font-mono text-[11px] shrink-0">
          Jami: <strong>{sortedStudents.length} ta</strong>
        </span>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {sortedStudents.map((student, idx) => {
            const rank = idx + 1;
            const isFounder = student.id === 'st-ahmadjon';

            return (
              <div
                key={student.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isFounder
                    ? 'bg-amber-50/40 dark:bg-amber-950/20'
                    : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/50'
                }`}
              >
                {/* Left side: Rank + Name + Level */}
                <div className="flex items-center gap-3.5">
                  {getRankBadge(rank)}

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                        {student.name}
                      </h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                        {student.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      <span>{student.badge || 'Goethe talabasi'}</span>
                      <span aria-hidden="true">·</span>
                      <span>Qo'shilgan: {student.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Stats & Quick XP buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  {/* Streak */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-amber-500 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{student.streakDays} kun</span>
                    </div>
                    <span className="text-[10px] text-stone-400">Faollik</span>
                  </div>

                  {/* Words learned */}
                  <div className="text-center">
                    <div className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                      {student.wordsLearned} ta
                    </div>
                    <span className="text-[10px] text-stone-400">So'zlar</span>
                  </div>

                  {/* XP Points */}
                  <div className="min-w-[80px] text-right">
                    <div className="font-mono font-bold text-sm text-amber-500">
                      {student.xpPoints.toLocaleString()} XP
                    </div>
                    <span className="text-[10px] text-stone-400">Umumiy ball</span>
                  </div>

                  {/* Delete button if admin */}
                  {onDeleteStudent && !isFounder && isAdmin && (
                    <div className="pl-2 border-l border-stone-200 dark:border-stone-800">
                      <button
                        type="button"
                        onClick={() => onDeleteStudent(student.id)}
                        title="Reytingdan o'chirish"
                        className="p-1 text-stone-400 hover:text-red-500 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helpful note if only Ahmadjon is in list */}
      {sortedStudents.length <= 1 && (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2 text-xs text-amber-900 dark:text-amber-200">
          <div className="font-bold flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>O'quvchilar reytingi ligasi</span>
          </div>
          <p className="max-w-md mx-auto text-stone-600 dark:text-stone-300">
            {isAdmin
              ? "Hozircha reytingda faqat siz (Ahmadjon) turibsiz. Admin panel orqali yangi o'quvchilarni qo'shishingiz bilan ular ushbu reyting jadvaliga avtomatik qo'shiladi!"
              : "Nemis tili o'yinlarini o'ynab, so'zlarni o'zlashtiring va o'z reytingingizni oshiring!"}
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenAddStudent}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>O'quvchi qo'shish</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};
