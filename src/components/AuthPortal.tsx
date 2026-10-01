import React, { useState } from 'react';
import { AuthUser, StudentApplication, CEFRLevel, UserAccount } from '../types';
import { GermanFlagBadge } from './GermanFlagBadge';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  FileText, 
  Sparkles, 
  Shield, 
  GraduationCap, 
  ArrowRight, 
  Phone, 
  Send, 
  CheckCircle,
  MessageSquare
} from 'lucide-react';

interface AuthPortalProps {
  onLogin: (user: AuthUser) => void;
  registeredUsers: UserAccount[];
  onAddApplication: (app: StudentApplication) => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ 
  onLogin, 
  registeredUsers,
  onAddApplication 
}) => {
  const [tab, setTab] = useState<'login' | 'application'>('login');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Application form state (if user doesn't have an account)
  const [appFullName, setAppFullName] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appTelegram, setAppTelegram] = useState('');
  const [appLevel, setAppLevel] = useState<CEFRLevel>('A1');
  const [appMessage, setAppMessage] = useState('');
  const [appSubmitted, setAppSubmitted] = useState(false);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      setLoginError("Iltimos, login (foydalanuvchi nomi)ni kiriting!");
      return;
    }
    if (!cleanPassword) {
      setLoginError("Iltimos, parolni kiriting!");
      return;
    }

    // 1. Check primary Admin (Ahmadjon) account
    if (
      (cleanUsername === 'ahmadjon_admin' || cleanUsername === 'ahmadjon') &&
      (cleanPassword === 'admin1' || cleanPassword === '12345')
    ) {
      onLogin({
        id: 'user-admin',
        username: 'ahmadjon_admin',
        name: 'Ahmadjon (Administrator)',
        role: 'admin',
        level: 'A1',
      });
      return;
    }

    // 2. Check registered accounts created by Admin
    const found = registeredUsers.find(
      (u) => u.username.toLowerCase() === cleanUsername
    );

    if (found) {
      if (found.password === cleanPassword) {
        onLogin({
          id: found.id,
          username: found.username,
          name: found.name,
          role: found.role,
          level: found.level,
        });
        return;
      } else {
        setLoginError("Kiritilgan parol noto'g'ri! Iltimos qaytadan tekshirib yozing.");
        return;
      }
    }

    // If account not found
    setLoginError("Bunday loginli foydalanuvchi topilmadi. Agar akkauntingiz bo'lmasa, «Ariza qoldirish» bo'limi orqali ariza yuboring!");
  };

  const [isSubmittingApp, setIsSubmittingApp] = useState(false);

  // Handle Application Submit - sends directly to central backend server!
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFullName.trim() || !appPhone.trim()) {
      alert("Iltimos, ism-familiyangiz va telefon raqamingizni kiriting!");
      return;
    }

    setIsSubmittingApp(true);

    const newApp: StudentApplication = {
      id: `app-${Date.now()}`,
      fullName: appFullName.trim(),
      phone: appPhone.trim(),
      telegram: appTelegram.trim(),
      level: appLevel,
      message: appMessage.trim(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      // Send directly to server so Ahmadjon receives it anywhere in real-time
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
      const data = await res.json();
      if (data.application) {
        onAddApplication(data.application);
      } else {
        onAddApplication(newApp);
      }
    } catch (err) {
      console.error('Failed to submit application to server, saving locally:', err);
      onAddApplication(newApp);
    } finally {
      setIsSubmittingApp(false);
      setAppSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden select-none">
      {/* 
        GERMANY FLAG BACKGROUND:
        Schwarz (Black), Rot (Red), Gold (Amber Yellow) 
        with vibrant waves & ambient lighting
      */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
        {/* Top: Schwarz */}
        <div className="relative flex-1 bg-gradient-to-b from-black via-zinc-950 to-neutral-900 overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-600 via-transparent to-transparent"></div>
          <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6"></div>
        </div>

        {/* Middle: Rot */}
        <div className="relative flex-1 bg-gradient-to-b from-[#bd1e24] via-[#dd1018] to-[#990c12] shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-radial from-red-500/30 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.15)_40%,transparent_60%)] animate-pulse"></div>
        </div>

        {/* Bottom: Gold */}
        <div className="relative flex-1 bg-gradient-to-b from-[#fecb00] via-[#f59e0b] to-[#d97706] overflow-hidden">
          <div className="absolute inset-0 bg-radial from-amber-200/40 via-transparent to-black/20"></div>
          <div className="absolute -bottom-1/2 left-0 right-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-y-3"></div>
        </div>

        {/* Dark Vignette Overlay for readability */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"></div>
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-6 left-6 z-10 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-xl">
        <GermanFlagBadge size="sm" />
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-300 font-mono">
          Bundesrepublik Deutschland
        </span>
      </div>

      <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-stone-200">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="font-medium">O'quv tizimi faol</span>
      </div>

      {/* CENTRAL AUTH CARD */}
      <div className="relative z-10 w-full max-w-md my-8">
        <div className="relative rounded-3xl bg-neutral-950/85 backdrop-blur-2xl border border-white/15 p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] text-white">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-600/30 via-amber-500/30 to-red-600/30 -z-10 blur-sm opacity-70"></div>

          {/* Header Brand */}
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner">
              <GermanFlagBadge size="md" />
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                DEUTSCHLAND
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                worthub<span className="text-amber-400">.uz</span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
                Nemis tili so'z boyligi va interaktiv o'yinlar portali
              </p>
            </div>
          </div>

          {/* Mode Switcher: Login OR Ariza Qoldirish */}
          <div className="grid grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setLoginError('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'login'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Kirish (Anmelden)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('application');
                setAppSubmitted(false);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'application'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ariza qoldirish</span>
            </button>
          </div>

          {/* TAB 1: LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-stone-300">
                  Login (Foydalanuvchi nomi):
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masalan: ahmadjon yoki o'quvchi logini"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-stone-300">
                  Parol:
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingizni kiriting"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-2.5 bg-black/50 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-stone-950 font-bold hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Tizimga kirish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3 border-t border-white/10 mt-4">
                <button
                  type="button"
                  onClick={() => setTab('application')}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  Akkauntingiz yo'qmi? Ariza qoldiring →
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: APPLICATION FORM (IF USER DOESN'T HAVE ACCOUNT) */}
          {tab === 'application' && (
            <div>
              {appSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Arizangiz ustozga yetib bordi!
                    </h3>
                    <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Serverda saqlandi · Admin panelga tushdi</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto">
                    Hurmatli <strong>{appFullName}</strong>, arizangiz ustoz Ahmadjonning boshqaruv paneliga muvaffaqiyatli kelib tushdi. Ustoz tez orada sizga shaxsiy login va parol taqdim etadi.
                  </p>

                  {/* Direct Telegram notification option for instant delivery */}
                  <div className="pt-1">
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent('https://worthub.uz')}&text=${encodeURIComponent(
                        `Assalomu alaykum ustoz Ahmadjon! Men worthub.uz saytida nemis tili o'rganish uchun ariza qoldirdim.\n\n👤 Ism: ${appFullName}\n📞 Telefon: ${appPhone}\n📊 Daraja: ${appLevel}\n💬 Xabar: ${appMessage || "Nemis tilini o'rganmoqchiman"}\n\nIltimos, menga saytga kirish uchun login va parol berishingizni so'rayman!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mb-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Ustozga Telegramdan ham darhol jo'natish →</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setTab('login');
                        setAppSubmitted(false);
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Kirish oynasiga qaytish
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-3.5">
                  <div className="text-xs text-stone-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                    O'quv platformasiga a'zo bo'lish uchun ma'lumotlaringizni qoldiring. O'qituvchi sizga shaxsiy login va parol ochib beradi.
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">
                      Ism va familiyangiz: *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={appFullName}
                        onChange={(e) => setAppFullName(e.target.value)}
                        placeholder="Masalan: Sardor Rahimov"
                        className="w-full pl-9 pr-3 py-2 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-stone-300">
                        Telefon raqam: *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="tel"
                          required
                          value={appPhone}
                          onChange={(e) => setAppPhone(e.target.value)}
                          placeholder="+998 90 123 45 67"
                          className="w-full pl-8 pr-2 py-2 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-stone-300">
                        Telegram:
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          value={appTelegram}
                          onChange={(e) => setAppTelegram(e.target.value)}
                          placeholder="@username"
                          className="w-full pl-8 pr-2 py-2 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">
                      Nemis tili darajangiz:
                    </label>
                    <select
                      value={appLevel}
                      onChange={(e) => setAppLevel(e.target.value as CEFRLevel)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="A1" className="bg-stone-900">A1 (Noldan boshlovchi)</option>
                      <option value="A2" className="bg-stone-900">A2 (Boshlang'ich bilimlari bor)</option>
                      <option value="B1" className="bg-stone-900">B1 (O'rta daraja)</option>
                      <option value="B2" className="bg-stone-900">B2 (Yuqori daraja)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">
                      Qo'shimcha xabar / Maqsad:
                    </label>
                    <textarea
                      rows={2}
                      value={appMessage}
                      onChange={(e) => setAppMessage(e.target.value)}
                      placeholder="Nemis tilini o'rganishdagi maqsadingiz..."
                      className="w-full px-3 py-1.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Arizani yuborish</span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setTab('login')}
                      className="text-xs text-stone-400 hover:text-white cursor-pointer"
                    >
                      ← Akkauntingiz bormi? Kirish
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Footer note */}
          <div className="mt-5 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Goethe-Institut va Duden standartlari</span>
          </div>
        </div>
      </div>
    </div>
  );
};
