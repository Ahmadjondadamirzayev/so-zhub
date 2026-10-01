import React from 'react';
import { AlphabetMode } from '../types';
import { GermanFlagBadge } from './GermanFlagBadge';
import { Download, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  alphabet: AlphabetMode;
  onSelectSection: (section: string) => void;
  onOpenInstallApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  alphabet, 
  onSelectSection,
  onOpenInstallApp 
}) => {
  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-400 text-xs border-t border-stone-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* PROMINENT PWA APP INSTALL BANNER AT THE BOTTOM */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-800 via-stone-850 to-stone-900 border border-stone-700/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  worthub.uz mobil ilovasi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Android & iOS
                </span>
              </div>
              <p className="text-xs text-stone-400 max-w-xl">
                Telefoningizga o'rnatib oling va internet bo'lmaganda ham darslar, lug'at va o'yinlardan to'liq bepul foydalaning.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenInstallApp}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Ilovani yuklab olish</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <GermanFlagBadge size="sm" />
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                worthub<span className="text-amber-500">.uz</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md font-sans">
              Nemis tili so'z boyligi, artikllar (der, die, das), talaffuz, misol gaplar, Blitz video darsliklari hamda 10 xil interaktiv grammatika o'yinlari portali.
            </p>
            <p className="text-[11px] text-stone-500">
              Leksik manbalar: Goethe-Institut standartlari, Duden nemis tili korpusi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Asosiy bo'limlar
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectSection('german-dict')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">DE</span>
                  <span>Nemischa so'zlar va misollar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('games')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  O'yinlar & Grammatika (10 xil)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('lessons')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Darslar (Blitz O'quv Markazi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSection('leaderboard')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  O'quvchilar reytingi
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInstallApp}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-500 font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ilovani o'rnatish</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Features */}
          <div>
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Xususiyatlar
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Nemischa artikllar (der, die, das)</li>
              <li>Haqiqiy audio talaffuz</li>
              <li>10 xil interaktiv o'yin va testlar</li>
              <li>Telegram bot nazorati va arizalar</li>
              <li>Tungi va kunduzgi rejim (Dark / Light)</li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} worthub.uz. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4">
            <span>Deutsch Bildungsportal</span>
            <span>·</span>
            <span>Toshkent & Berlin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
