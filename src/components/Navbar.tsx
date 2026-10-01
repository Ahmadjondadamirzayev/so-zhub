import React from 'react';
import { AlphabetMode, ThemeMode, AuthUser } from '../types';
import { Bookmark, Sun, Moon, ShieldCheck, Trophy, LogOut, User, Gamepad2, BookA, Video, Download, UserPlus, Zap } from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';

interface NavbarProps {
  alphabet: AlphabetMode;
  onToggleAlphabet: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  savedWordsCount: number;
  onOpenBookmarks: () => void;
  onOpenAITool: () => void;
  onOpenAdmin: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  pendingApplicationsCount?: number;
  onOpenInstallApp?: () => void;
  onOpenAddUser?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  alphabet,
  onToggleAlphabet,
  theme,
  onToggleTheme,
  activeSection,
  onSelectSection,
  savedWordsCount,
  onOpenBookmarks,
  onOpenAITool,
  onOpenAdmin,
  currentUser,
  onLogout,
  pendingApplicationsCount = 0,
  onOpenInstallApp,
  onOpenAddUser,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: worthub.uz branding with German flag badge */}
          <button
            onClick={() => onSelectSection('german-dict')}
            className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
          >
            <GermanFlagBadge size="sm" />
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
              worthub<span className="text-amber-500">.uz</span>
            </span>
          </button>

          {/* Zone 2: Focused Clean Navigation (Only German Dictionary, Games, and Leaderboard) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => onSelectSection('german-dict')}
              className={`hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeSection === 'german-dict'
                  ? 'border-amber-500 text-stone-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <BookA className="w-4 h-4 text-amber-500" />
              <span>Lug'at (Wörterbuch)</span>
            </button>

            <button
              onClick={() => onSelectSection('blitz-words')}
              className={`hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeSection === 'blitz-words'
                  ? 'border-amber-500 text-stone-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Blitz O'quv Markaz</span>
            </button>

            <button
              onClick={() => onSelectSection('games')}
              className={`hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeSection === 'games'
                  ? 'border-amber-500 text-stone-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-amber-500" />
              <span>O'yinlar & Grammatika</span>
            </button>

            <button
              onClick={() => onSelectSection('lessons')}
              className={`hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeSection === 'lessons'
                  ? 'border-amber-500 text-stone-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <Video className="w-4 h-4 text-amber-500" />
              <span>Darslar (Blitz)</span>
            </button>

            <button
              onClick={() => onSelectSection('leaderboard')}
              className={`hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
                activeSection === 'leaderboard'
                  ? 'border-amber-500 text-stone-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>O'quvchilar reytingi</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Theme, Admin, User Profile & Logout) */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-xs transition-colors cursor-pointer"
              title={theme === 'dark' ? "Yorug' rejim" : "Tungi rejim"}
              aria-label="Rejimni almashtirish"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Install App Button */}
            <button
              onClick={onOpenInstallApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
              title="Ilovani telefon yoki kompyuterga o'rnatish"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              <span>Ilova</span>
            </button>

            {/* Quick Add User button (for admin) */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAddUser}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 dark:text-amber-300 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
                title="Yangi odam qo'shish (Admin yoki O'quvchi)"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-500" />
                <span>+ Odam qo'shish</span>
              </button>
            )}

            {/* Admin Panel button (ONLY shown if currentUser is admin) */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdmin}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 dark:text-white bg-amber-500 hover:bg-amber-400 border border-amber-600/30 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
                title="Admin boshqaruv paneli"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-stone-950" />
                <span className="font-bold text-stone-950">Admin</span>
                {pendingApplicationsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-extrabold animate-pulse shadow-sm">
                    {pendingApplicationsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile Badge & Logout Button */}
            {currentUser && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200 dark:border-stone-800">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  <span className="max-w-[120px] truncate font-semibold">{currentUser.name}</span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-2 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer"
                  title="Tizimdan chiqish (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 overflow-x-auto gap-2">
          <button
            onClick={() => onSelectSection('german-dict')}
            className={`py-1 px-2 shrink-0 ${
              activeSection === 'german-dict' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            Lug'at
          </button>
          <button
            onClick={() => onSelectSection('blitz-words')}
            className={`py-1 px-2 shrink-0 flex items-center gap-1 ${
              activeSection === 'blitz-words' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Blitz So'zlar</span>
          </button>
          <button
            onClick={() => onSelectSection('games')}
            className={`py-1 px-2 shrink-0 flex items-center gap-1 ${
              activeSection === 'games' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>O'yinlar</span>
          </button>
          <button
            onClick={() => onSelectSection('lessons')}
            className={`py-1 px-2 shrink-0 flex items-center gap-1 ${
              activeSection === 'lessons' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Darslar</span>
          </button>
          <button
            onClick={() => onSelectSection('leaderboard')}
            className={`py-1 px-2 shrink-0 ${
              activeSection === 'leaderboard' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            Reyting
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={onOpenAddUser}
              className="py-1 px-2 shrink-0 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Odam</span>
            </button>
          )}
          {currentUser?.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="py-1 px-2 shrink-0 text-amber-600 dark:text-amber-400 font-semibold"
            >
              Admin
            </button>
          )}
          <button
            onClick={onOpenInstallApp}
            className="py-1 px-2 shrink-0 text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Ilova</span>
          </button>
          {currentUser && (
            <button
              onClick={onLogout}
              className="py-1 px-2 shrink-0 text-red-600 dark:text-red-400 font-semibold flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Chiqish</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
