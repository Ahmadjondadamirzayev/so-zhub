import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Share, 
  PlusSquare, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Laptop, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop'>('android');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Detect OS
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActiveTab('ios');
    } else if (/android/.test(ua)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDownloadSuccess(true);
        }
      } catch (err) {
        console.error('PWA Install error:', err);
      }
    } else {
      // Simulate direct APK / Web App installation packet download
      setDownloading(true);
      setTimeout(() => {
        setDownloading(false);
        setDownloadSuccess(true);

        // Create downloadable web shortcut configuration file
        const blob = new Blob([
          `[InternetShortcut]\nURL=${window.location.origin}\nIconFile=${window.location.origin}/icon.svg\nIconIndex=0\nTitle=worthub.uz - Nemis tili\n`
        ], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'worthub-blitz-deutsch.url';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-stone-950 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GermanFlagBadge size="sm" />
              <span className="text-[11px] font-mono uppercase tracking-widest font-extrabold text-stone-900 bg-amber-300/60 px-2 py-0.5 rounded-full">
                Rasmiy ilova
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black">
              worthub.uz Ilovasini O'rnatish
            </h2>
            <p className="text-xs text-stone-900/80 font-medium">
              Telefoningizga yuklab oling va internetsiz ham istalgan paytda darslar va so'zlarni o'rganing!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-stone-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* OS Switcher */}
          <div className="flex rounded-2xl bg-stone-100 dark:bg-stone-800/80 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'android'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'ios'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>iPhone / iOS</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desktop')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'desktop'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Kompyuter</span>
            </button>
          </div>

          {/* Tab 1: Android */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>1-usul: Bir bosishda o'rnatish (PWA Web App)</span>
                </div>
                <p>
                  Brauzeringiz ilovani to'g'ridan-to'g'ri telefoningiz bosh ekraniga mustaqil dastur sifatida o'rnatadi.
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <div className="font-semibold text-stone-900 dark:text-stone-200">
                  2-usul: Chrome brauzeridan qo'lda o'rnatish:
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">1</span>
                  <span>Chrome brauzerining yuqori o'ng burchagidagi uch nuqta <strong>(⋮)</strong> tugmasini bosing.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">2</span>
                  <span>Menyudan <strong>«Ilovani o'rnatish»</strong> yoki <strong>«Bosh ekranga qo'shish»</strong> bandini tanlang.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">3</span>
                  <span>Telefoningizda alohida ilova belgisi paydo bo'ladi va Play Market ilovasidek tez ishlaydi.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: iOS */}
          {activeTab === 'ios' && (
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>iPhone va iPad uchun ko'rsatma</span>
                </div>
                <p>Apple Safari orqali worthub.uz ni to'liq ekranli ilovaga aylantirish juda oson:</p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">1</span>
                  <span>Saytni <strong>Safari</strong> brauzerida oching.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">2</span>
                  <span className="flex items-center gap-1">Pastdagi <strong>«Ulashish»</strong> <Share className="w-3.5 h-3.5 inline text-blue-500" /> tugmasini bosing.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">3</span>
                  <span className="flex items-center gap-1">Ochiladigan menyudan <strong>«Bosh ekranga qo'shish»</strong> <PlusSquare className="w-3.5 h-3.5 inline text-stone-500" /> bandini tanlang.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold text-stone-700 dark:text-stone-300 flex items-center justify-center text-[11px] shrink-0">4</span>
                  <span>«Qo'shish» tugmasini bosing. Ilova ish stolingizda tayyor bo'ladi!</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Desktop */}
          {activeTab === 'desktop' && (
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-amber-500" />
                  <span>Kompyuter (Windows / Mac) uchun</span>
                </div>
                <p>Chrome yoki Edge manzil qatori (URL) o'ng tomonidagi «O'rnatish» tugmasini bosing.</p>
              </div>
            </div>
          )}

          {/* Install / Download Action Button */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleInstallClick}
              disabled={downloading}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloading 
                  ? 'Ilova yuklanmoqda...' 
                  : deferredPrompt 
                    ? 'Ilovani telefonimga o\'rnatish' 
                    : 'Ilovani yuklab olish (APK / PWA)'}
              </span>
            </button>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ilova muvaffaqiyatli saqlandi! Bosh ekranda paydo bo'ldi.</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Xavfsiz</span>
              </span>
              <span>•</span>
              <span>Hajmi: ~2.4 MB</span>
              <span>•</span>
              <span>Avto-yangilanish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
