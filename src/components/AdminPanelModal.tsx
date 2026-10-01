import React, { useState, useEffect } from 'react';
import { GermanWordEntry, GermanArticle, CEFRLevel, UserAccount, StudentApplication, BlitzScheduledWord, BlitzScheduleDay } from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  BookPlus, 
  UserPlus, 
  Users, 
  FileText, 
  Lock, 
  Key, 
  Phone, 
  Check, 
  Sparkles,
  Gamepad2,
  Send,
  Radio,
  LogOut,
  AlertTriangle,
  RefreshCw,
  Zap,
  Calendar
} from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (word: GermanWordEntry) => void;
  onDeleteWord: (id: string) => void;
  onAddUserAccount: (account: UserAccount) => void;
  onDeleteUserAccount: (id: string) => void;
  onUpdateUserLevel?: (id: string, newLevel: CEFRLevel) => void;
  onApproveApplication: (applicationId: string, account: UserAccount) => void;
  onDeleteApplication?: (id: string) => void;
  words: GermanWordEntry[];
  registeredUsers: UserAccount[];
  applications: StudentApplication[];
  onResetDudenWords?: () => void;
  blitzWords?: BlitzScheduledWord[];
  onAddBlitzWord?: (word: BlitzScheduledWord) => void;
  onToggleBlitzWord?: (id: string) => void;
  onDeleteBlitzWord?: (id: string) => void;
  onActivateLektion?: (lektion: number) => void;
  onDeactivateLektion?: (lektion: number) => void;
  initialTab?: 'add-user' | 'user-list' | 'sessions' | 'applications' | 'telegram' | 'add-word' | 'word-list' | 'blitz-schedule';
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onAddWord,
  onDeleteWord,
  onAddUserAccount,
  onDeleteUserAccount,
  onUpdateUserLevel,
  onApproveApplication,
  onDeleteApplication,
  onResetDudenWords,
  words,
  registeredUsers,
  applications,
  blitzWords = [],
  onAddBlitzWord,
  onToggleBlitzWord,
  onDeleteBlitzWord,
  onActivateLektion,
  onDeactivateLektion,
  initialTab = 'add-user',
}) => {
  const [activeTab, setActiveTab] = useState<'add-user' | 'user-list' | 'sessions' | 'applications' | 'telegram' | 'add-word' | 'word-list' | 'blitz-schedule'>(initialTab);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // 1. Form state for new German Word
  const [german, setGerman] = useState('');
  const [article, setArticle] = useState<GermanArticle>('der');
  const [plural, setPlural] = useState('');
  const [partOfSpeechUz, setPartOfSpeechUz] = useState('Ot (erkak jinsi)');
  const [pronunciationIPA, setPronunciationIPA] = useState('');
  const [pronunciationUz, setPronunciationUz] = useState('');
  const [meaningUz, setMeaningUz] = useState('');
  const [level, setLevel] = useState<CEFRLevel>('A1');
  const [exampleGerman, setExampleGerman] = useState('');
  const [exampleUzbek, setExampleUzbek] = useState('');
  const [grammarNotes, setGrammarNotes] = useState('');

  // 2. Form state for new User (Admin sets login, password and role: admin or student)
  const [newUserName, setNewUserName] = useState('');
  const [newUserLogin, setNewUserLogin] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserLevel, setNewUserLevel] = useState<CEFRLevel>('A1');
  const [newUserRole, setNewUserRole] = useState<'student' | 'admin'>('student');

  // 3. Telegram Bot Configuration State
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramAdminChatId, setTelegramAdminChatId] = useState('');
  const [telegramBotUsername, setTelegramBotUsername] = useState('worthub_blitz_bot');
  const [telegramLoading, setTelegramLoading] = useState(false);
  const [telegramTestStatus, setTelegramTestStatus] = useState<string>('');

  // 4. Active Sessions State (Kirib-chiqishlar nazorati)
  const [activeSessions, setActiveSessions] = useState<Array<{
    sessionId: string;
    userId: string;
    username: string;
    name: string;
    role: string;
    loginTime: string;
    device?: string;
  }>>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // 5. Blitz Scheduled Word state (Dushanba / Chorshanba / Juma & Checkbox)
  const [blitzGerman, setBlitzGerman] = useState('');
  const [blitzUzbek, setBlitzUzbek] = useState('');
  const [blitzArticle, setBlitzArticle] = useState<GermanArticle>('der');
  const [blitzPlural, setBlitzPlural] = useState('');
  const [blitzLektion, setBlitzLektion] = useState<number>(1);
  const [blitzDay, setBlitzDay] = useState<BlitzScheduleDay>('Dushanba');
  const [blitzIsActive, setBlitzIsActive] = useState<boolean>(true); // Checkbox: "ishga tushirish"
  const [blitzNotes, setBlitzNotes] = useState('');
  const [adminBlitzDayFilter, setAdminBlitzDayFilter] = useState<string>('all');
  const [adminBlitzLektionFilter, setAdminBlitzLektionFilter] = useState<string>('all');

  const handleCreateBlitzWord = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGerman = blitzGerman.trim();
    const cleanUzbek = blitzUzbek.trim();

    if (!cleanGerman || !cleanUzbek) {
      alert("Iltimos, nemischa so'z va o'zbekcha tarjimasini kiriting!");
      return;
    }

    const newBlitzEntry: BlitzScheduledWord = {
      id: `bsw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      german: cleanGerman,
      uzbek: cleanUzbek,
      article: blitzArticle,
      plural: blitzPlural.trim() || '—',
      lektionNumber: blitzLektion,
      day: blitzDay,
      isActive: blitzIsActive,
      notes: blitzNotes.trim(),
      addedAt: new Date().toISOString().split('T')[0]
    };

    onAddBlitzWord?.(newBlitzEntry);
    setNotification(
      `«${cleanGerman}» so'zi Lektion ${blitzLektion} (${blitzDay}) uchun muvaffaqiyatli saqlandi! Holati: ${
        blitzIsActive ? 'Faol (Ishga tushirildi)' : 'Qoralama'
      }`
    );
    setTimeout(() => setNotification(''), 4000);

    // Reset Form
    setBlitzGerman('');
    setBlitzUzbek('');
    setBlitzPlural('');
    setBlitzNotes('');
  };

  // Fetch Telegram Config & Sessions when modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchTelegramConfig();
      fetchActiveSessions();
    }
  }, [isOpen]);

  const fetchTelegramConfig = async () => {
    try {
      const res = await fetch('/api/telegram/config');
      if (res.ok) {
        const data = await res.json();
        if (data.botToken) setTelegramBotToken(data.botToken);
        if (data.adminChatId) setTelegramAdminChatId(data.adminChatId);
        if (data.botUsername) setTelegramBotUsername(data.botUsername);
      }
    } catch {
      // fallback
    }
  };

  const fetchActiveSessions = async () => {
    setSessionsLoading(true);
    try {
      const res = await fetch('/api/sessions');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setActiveSessions(data);
        }
      }
    } catch {
      // fallback
    } finally {
      setSessionsLoading(false);
    }
  };

  // Kick user out
  const handleKickUser = async (username: string, name: string) => {
    if (!confirm(`Haqiqatan ham «${name}» (@${username}) foydalanuvchini tizimdan chiqarib yubormoqchimisiz?`)) {
      return;
    }
    try {
      const res = await fetch('/api/sessions/kick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name }),
      });
      if (res.ok) {
        setNotification(`«${name}» tizimdan chiqarib yuborildi va Telegramga xabar yuborildi!`);
        setTimeout(() => setNotification(''), 4000);
        fetchActiveSessions();
      }
    } catch {
      alert("Chiqarishda xatolik yuz berdi");
    }
  };

  // Save Telegram Config
  const handleSaveTelegramConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setTelegramLoading(true);
    try {
      const res = await fetch('/api/telegram/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramBotToken.trim(),
          adminChatId: telegramAdminChatId.trim(),
          botUsername: telegramBotUsername.trim(),
          notificationsEnabled: true,
        }),
      });
      if (res.ok) {
        setNotification("Telegram bot sozlamalari muvaffaqiyatli saqlandi!");
        setTimeout(() => setNotification(''), 4000);
      }
    } catch {
      alert("Saqlashda xatolik");
    } finally {
      setTelegramLoading(false);
    }
  };

  // Send Test Telegram Notification
  const handleSendTelegramTest = async () => {
    if (!telegramBotToken.trim() || !telegramAdminChatId.trim()) {
      alert("Iltimos, avval Bot Token va Admin Chat ID ni kiriting!");
      return;
    }
    setTelegramTestStatus('Yuborilmoqda...');
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramBotToken.trim(),
          adminChatId: telegramAdminChatId.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTelegramTestStatus('✅ Sinov xabari Telegramingizga yetib bordi!');
      } else {
        setTelegramTestStatus(`❌ Xatolik: ${data.error || 'Yuborib bo\'lmadi'}`);
      }
    } catch (err: any) {
      setTelegramTestStatus(`❌ Xatolik: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  // Handle Create Word
  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!german.trim() || !meaningUz.trim()) {
      alert("Iltimos, nemischa so'z va uning tarjimasini kiriting!");
      return;
    }

    const newWord: GermanWordEntry = {
      id: `de-custom-${Date.now()}`,
      german: german.trim(),
      article,
      plural: plural.trim() || '—',
      partOfSpeech: article === 'none' ? 'verb' : 'nomen',
      partOfSpeechUz: article === 'der' ? 'Ot (erkak jinsi)' : article === 'die' ? 'Ot (ayol jinsi)' : article === 'das' ? 'Ot (neytral)' : 'Fe\'l / Boshqa',
      pronunciationIPA: pronunciationIPA.trim() || `[${german.toLowerCase()}]`,
      pronunciationUz: pronunciationUz.trim() || german,
      meaningUz: meaningUz.trim(),
      level,
      examples: exampleGerman.trim()
        ? [
            {
              german: exampleGerman.trim(),
              uzbek: exampleUzbek.trim() || meaningUz.trim(),
              context: 'Darslik namunasi',
            },
          ]
        : [],
      synonyms: [],
      antonyms: [],
      grammarNotes: grammarNotes.trim() || `${article} ${german} so'zi lug'at va barcha o'yinlarga kiritildi.`,
      tags: ['qoshilgan', level.toLowerCase()],
      addedBy: 'O\'qituvchi',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddWord(newWord);
    setNotification(`«${article !== 'none' ? article + ' ' : ''}${german}» so'zi muvaffaqiyatli qo'shildi va barcha 6 ta o'yinga ulandi!`);
    setTimeout(() => setNotification(''), 4000);

    // Reset Word Form
    setGerman('');
    setPlural('');
    setPronunciationIPA('');
    setPronunciationUz('');
    setMeaningUz('');
    setExampleGerman('');
    setExampleUzbek('');
    setGrammarNotes('');
  };

  // Handle Create User Account
  const handleCreateUserAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLogin = newUserLogin.trim().toLowerCase();
    const cleanPassword = newUserPassword.trim();
    const cleanName = newUserName.trim();

    if (!cleanLogin || !cleanPassword || !cleanName) {
      alert("Iltimos, ism, login va parolni kiriting!");
      return;
    }

    // Check if login already exists
    if (registeredUsers.some((u) => u.username.toLowerCase() === cleanLogin)) {
      alert(`«${cleanLogin}» logini allaqachon mavjud! Boshqa login tanlang.`);
      return;
    }

    const newAccount: UserAccount = {
      id: `acc-${Date.now()}`,
      username: cleanLogin,
      password: cleanPassword,
      name: cleanName,
      role: newUserRole,
      phone: newUserPhone.trim(),
      level: newUserLevel,
      wordsLearned: 0,
      xpPoints: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddUserAccount(newAccount);
    setNotification(`«${cleanName}» (${newUserRole === 'admin' ? 'Admin' : 'O\'quvchi'}) uchun login: ${cleanLogin} | parol: ${cleanPassword} muvaffaqiyatli saqlandi!`);
    setTimeout(() => setNotification(''), 4000);

    // Reset Form
    setNewUserName('');
    setNewUserLogin('');
    setNewUserPassword('');
    setNewUserPhone('');
    setNewUserRole('student');
  };

  // Handle Quick Approve Application
  const handleSelectApplicant = (app: StudentApplication) => {
    setNewUserName(app.fullName);
    setNewUserPhone(app.phone);
    setNewUserLevel(app.level);
    // suggest a username based on applicant's first name
    const firstName = app.fullName.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    setNewUserLogin(`${firstName}${Math.floor(10 + Math.random() * 90)}`);
    setNewUserPassword(`${Math.floor(1000 + Math.random() * 9000)}`);
    setActiveTab('add-user');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <GermanFlagBadge size="sm" />
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  O'qituvchi boshqaruv paneli — worthub.uz
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Odamlar qo'shish, login/parol berish, arizalarni tasdiqlash va o'yinlarga yangi so'zlar kiritish
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 px-6 bg-stone-50/50 dark:bg-stone-950/50 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('add-user')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'add-user'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Odam qo'shish</span>
          </button>

          <button
            onClick={() => setActiveTab('user-list')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'user-list'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Foydalanuvchilar ({registeredUsers.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sessions');
              fetchActiveSessions();
            }}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'sessions'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-500" />
            <span>Kirib-chiqishlar & Faol sessiyalar ({activeSessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'applications'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Arizalar ({applications.length})</span>
            {applications.filter((a) => a.status === 'pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('add-word')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'add-word'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-amber-500" />
            <span>+ So'z qo'shish</span>
          </button>

          <button
            onClick={() => setActiveTab('word-list')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'word-list'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <BookPlus className="w-4 h-4" />
            <span>Lug'at ({words.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blitz-schedule')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'blitz-schedule'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>⚡ Blitz Dars So'zlari ({blitzWords.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">

          {/* TAB 1: ADD USER (ADMIN MANUALLY SETS LOGIN & PASSWORD) */}
          {activeTab === 'add-user' && (
            <form onSubmit={handleCreateUserAccount} className="max-w-2xl mx-auto space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>O'quvchiga shaxsiy login va parol tayinlash</span>
                </div>
                <p>
                  Siz bu yerda o'quvchining ismini, o'zingiz belgilagan <strong>login</strong> va <strong>parolini</strong> kiritasiz. Shundan so'ng u ushbu login/parol orqali saytga kira oladi!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    O'quvchining ism-familiyasi: *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Masalan: Dilshod Alimov"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Telefon raqami (ixtiyoriy):
                  </label>
                  <input
                    type="tel"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Role Selector Toggle: Student or Admin */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Foydalanuvchi maqomi (Admin yoki O'quvchi qilib belgilash): *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewUserRole('student')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      newUserRole === 'student'
                        ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm ring-1 ring-amber-500'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <span>🎓 O'quvchi (Student)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUserRole('admin')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      newUserRole === 'admin'
                        ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm ring-1 ring-amber-500'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-stone-950" />
                    <span>🛡 Admin (Boshqaruvchi)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Kirish logini (O'zingiz belgilang): *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserLogin}
                    onChange={(e) => setNewUserLogin(e.target.value)}
                    placeholder="Masalan: dilshod12"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-400 dark:border-amber-600 bg-white dark:bg-stone-800 text-xs font-mono font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" />
                    <span>Kirish paroli (O'zingiz belgilang): *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Masalan: 7788 yoki nemis123"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-400 dark:border-amber-600 bg-white dark:bg-stone-800 text-xs font-mono font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Nemis tili darajasi:
                </label>
                <select
                  value={newUserLevel}
                  onChange={(e) => setNewUserLevel(e.target.value as CEFRLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="A1">A1 — Boshlang'ich (Anfänger)</option>
                  <option value="A2">A2 — Elementar daraja</option>
                  <option value="B1">B1 — O'rta mustaqil daraja (Goethe B1)</option>
                  <option value="B2">B2 — Yuqori daraja (Goethe B2)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>O'quvchini ro'yxatga kiritish va parolini saqlash</span>
              </button>
            </form>
          )}

          {/* TAB 2: REGISTERED USERS LIST */}
          {activeTab === 'user-list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Jami saqlangan akkauntlar: <strong>{registeredUsers.length} ta</strong></span>
                <span className="text-[11px]">Admin bu yerdan login va parollarni tekshirishi mumkin</span>
              </div>

              {registeredUsers.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/50 rounded-2xl text-stone-400 text-xs">
                  Hali yangi o'quvchi akkauntlari qo'shilmagan. Yuqoridagi «+ Odam qo'shish» bo'limi orqali kiriting.
                </div>
              ) : (
                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
                  {registeredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {user.name}
                          </span>
                          {onUpdateUserLevel ? (
                            <select
                              value={user.level}
                              onChange={(e) => {
                                const newLvl = e.target.value as CEFRLevel;
                                onUpdateUserLevel(user.id, newLvl);
                                setNotification(`«${user.name}» darajasi ${newLvl} ga o'zgartirildi!`);
                                setTimeout(() => setNotification(''), 3000);
                              }}
                              className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-mono cursor-pointer"
                              title="Darajani o'zgartirish (A1, A2, B1...)"
                            >
                              <option value="A1">A1</option>
                              <option value="A2">A2</option>
                              <option value="B1">B1</option>
                              <option value="B2">B2</option>
                              <option value="C1">C1</option>
                              <option value="C2">C2</option>
                            </select>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono">
                              {user.level}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                          <div>
                            Login: <span className="font-bold text-stone-800 dark:text-stone-200">{user.username}</span>
                          </div>
                          <div>
                            Parol: <span className="font-bold text-amber-600 dark:text-amber-400">{user.password}</span>
                          </div>
                          {user.phone && <div>Tel: {user.phone}</div>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(`worthub.uz ga kirish ma'lumotlaringiz:\nLogin: ${user.username}\nParol: ${user.password}`);
                            alert(`«${user.name}» uchun login va parol nusxalandi!`);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                        >
                          Nusxalash
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteUserAccount(user.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Akkauntni o'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVE SESSIONS & KIRIB-CHIQISHLAR NAZORATI */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Jonli kirib-chiqishlar nazorati (Real vaqt)</span>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-300">
                    Ahmadjon, bu yerda hozir saytda o'tirgan barcha faol o'quvchilar va adminlar ko'rinadi. Istalgan o'quvchini «Chiqarib yuborish» tugmasi orqali darhol saytdan chiqarishingiz mumkin.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchActiveSessions}
                  disabled={sessionsLoading}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold hover:bg-emerald-100 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${sessionsLoading ? 'animate-spin' : ''}`} />
                  <span>Yangilash</span>
                </button>
              </div>

              {activeSessions.length === 0 ? (
                <div className="p-10 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 text-xs space-y-1">
                  <div className="font-semibold text-stone-700 dark:text-stone-300">Hozirda boshqa faol sessiyalar yo'q</div>
                  <div>(Foydalanuvchilar login qilganda ular shu yerda onlayn paydo bo'ladi)</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeSessions.map((sess) => (
                    <div
                      key={sess.sessionId}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {sess.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                              {sess.name}
                            </span>
                            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
                              @{sess.username}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sess.role === 'admin' 
                                ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' 
                                : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            }`}>
                              {sess.role === 'admin' ? '🛡 Admin' : '🎓 O\'quvchi'}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 flex items-center gap-3">
                            <span>Kirgan vaqti: <strong>{sess.loginTime}</strong></span>
                            <span>•</span>
                            <span>Qurilma: {sess.device || 'Veb-brauzer'}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => handleKickUser(sess.username, sess.name)}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Chiqarib yuborish (Kick)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TELEGRAM BOT INTEGRATION & LIVE NOTIFICATIONS */}
          {activeTab === 'telegram' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 space-y-2">
                <div className="font-bold flex items-center gap-2 text-sm">
                  <Send className="w-4 h-4 text-blue-500" />
                  <span>Telegram Bot Boshqaruv Markazi (@BlitzDeutschBot)</span>
                </div>
                <p className="leading-relaxed">
                  Hurmatli Ahmadjon! Siz ushbu bot orqali saytingizni to'liq nazorat qilasiz. Kim kirsa, kim chiqsa yoki kim ariza qoldirsa, sizga darhol Telegram xabari yetib boradi.
                </p>
              </div>

              <form onSubmit={handleSaveTelegramConfig} className="max-w-2xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Telegram Bot Token (@BotFather dan olingan):
                  </label>
                  <input
                    type="text"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                    placeholder="Masalan: 7123456789:AAHk..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Telegramda @BotFather ga kirib /newbot orqali o'zingizning bepul botingizni yaratib tokenini qo'ying.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Sizning Telegram Chat ID raqamingiz (Ahmadjon):
                  </label>
                  <input
                    type="text"
                    value={telegramAdminChatId}
                    onChange={(e) => setTelegramAdminChatId(e.target.value)}
                    placeholder="Masalan: 123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Chat ID raqamingizni bilish uchun Telegramda @userinfobot ga /start bosing.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Bot nomi (@username):
                  </label>
                  <input
                    type="text"
                    value={telegramBotUsername}
                    onChange={(e) => setTelegramBotUsername(e.target.value)}
                    placeholder="worthub_blitz_bot"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {telegramTestStatus && (
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {telegramTestStatus}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={telegramLoading}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {telegramLoading ? 'Saqlanmoqda...' : 'Sozlamalarni saqlash'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTelegramTest}
                    className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegramga sinov xabari yuborish</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: APPLICATIONS FROM STUDENTS WHO DON'T HAVE ACCOUNT */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500">
                Sayt kirish oynasidagi «Ariza qoldirish» orqali ro'yxatdan o'tishni so'ragan nomzodlar ro'yxati:
              </div>

              {applications.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/50 rounded-2xl text-stone-400 text-xs">
                  Hozircha yangi arizalar yo'q.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                            {app.fullName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-mono">
                            {app.level}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {app.createdAt}
                          </span>
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-3">
                          <span>Tel: <strong>{app.phone}</strong></span>
                          {app.telegram && <span>Telegram: <strong>{app.telegram}</strong></span>}
                        </div>
                        {app.message && (
                          <div className="text-xs italic text-stone-500 bg-stone-50 dark:bg-stone-800/60 p-2 rounded-xl">
                            "{app.message}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectApplicant(app)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Login & Parol berish</span>
                        </button>
                        {onDeleteApplication && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`«${app.fullName}» ning arizasini o'chirmoqchimisiz?`)) {
                                onDeleteApplication(app.id);
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Arizani rad etish / o'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADD GERMAN WORD (FEEDS DICTIONARY & ALL 6 GAMES) */}
          {activeTab === 'add-word' && (
            <form onSubmit={handleCreateWord} className="max-w-2xl mx-auto space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  Siz kiritgan yangi so'z darhol <strong>Wörterbuch</strong> (lug'at)ga va barcha <strong>6 ta o'yinga</strong> (der, die, das, Wort-Paare, Blitz va testlarga) avtomatik ulanadi!
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Artikli:
                  </label>
                  <select
                    value={article}
                    onChange={(e) => setArticle(e.target.value as GermanArticle)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="der">der (Erkak jinsi - Maskulin)</option>
                    <option value="die">die (Ayol jinsi - Feminin)</option>
                    <option value="das">das (Neytral jins - Neutrum)</option>
                    <option value="none">— (Artiklsiz / Fe'l)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Nemischa so'z: *
                  </label>
                  <input
                    type="text"
                    required
                    value={german}
                    onChange={(e) => setGerman(e.target.value)}
                    placeholder="Masalan: Apfel, Sonne, Buch, lernen..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    O'zbekcha tarjimasi: *
                  </label>
                  <input
                    type="text"
                    required
                    value={meaningUz}
                    onChange={(e) => setMeaningUz(e.target.value)}
                    placeholder="Masalan: Olma, Quyosh, Kitob..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Ko'plik shakli (Plural):
                  </label>
                  <input
                    type="text"
                    value={plural}
                    onChange={(e) => setPlural(e.target.value)}
                    placeholder="Masalan: die Äpfel, die Bücher..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    CEFR Darajasi:
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CEFRLevel)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="A1">A1 (Boshlang'ich)</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    O'qilishi (Talaffuz transkripsiyasi):
                  </label>
                  <input
                    type="text"
                    value={pronunciationUz}
                    onChange={(e) => setPronunciationUz(e.target.value)}
                    placeholder="Masalan: apfel, zon-ne..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Nemischa misol gap:
                </label>
                <input
                  type="text"
                  value={exampleGerman}
                  onChange={(e) => setExampleGerman(e.target.value)}
                  placeholder="Masalan: Der Apfel schmeckt sehr gut."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Misol gapning tarjimasi:
                </label>
                <input
                  type="text"
                  value={exampleUzbek}
                  onChange={(e) => setExampleUzbek(e.target.value)}
                  placeholder="Masalan: Olma juda shirin."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>So'zni lug'at va barcha o'yinlarga qo'shish</span>
              </button>
            </form>
          )}

          {/* TAB 5: WORDS LIST */}
          {activeTab === 'word-list' && (
            <div className="space-y-3">
              {/* Duden & Goethe Corpus Sync Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <div>
                  <div className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                    <GermanFlagBadge size="sm" />
                    <span>Duden & Goethe Rasmiy Korpus Bazasini Yangilash</span>
                  </div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                    A1 dan C2 gacha bo'lgan barcha rasmiy so'zlar, artikllar va grammatikani qayta tiklash
                  </div>
                </div>
                {onResetDudenWords && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Haqiqatan ham Duden & Goethe rasmiy leksika bazasini to'liq qayta tiklamoqchimisiz?")) {
                        onResetDudenWords();
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Duden bazasini tiklash (A1–C2)</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Jami leksika: <strong>{words.length} ta nemischa so'z</strong></span>
                <span className="text-[11px]">Barcha o'yinlar ushbu so'zlardan foydalanadi</span>
              </div>

              <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden max-h-[500px] overflow-y-auto">
                {words.map((w) => (
                  <div
                    key={w.id}
                    className="p-3.5 flex items-center justify-between gap-3 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                          {w.article !== 'none' ? `${w.article} ` : ''}{w.german}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono text-[10px]">
                          {w.level}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {w.meaningUz} {w.plural !== '—' && `· Ko'pligi: ${w.plural}`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteWord(w.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="So'zni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BLITZ LEKTION WORDS MANAGEMENT (DUSHANBA / CHORSHANBA / JUMA & CHECKBOX) */}
          {activeTab === 'blitz-schedule' && (
            <div className="space-y-6">
              {/* Info banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Blitz O'quv Markazi Dars So'zlari Rejalashtirgichi</span>
                </div>
                <p>
                  Siz bu yerda har bir dars (Lektion 1 dan oxirigacha) uchun <strong>Dushanba</strong>, <strong>Chorshanba</strong> va <strong>Juma</strong> kunlariga so'zlarni bittalab qo'shib borishingiz mumkin.
                  Har bir so'zning yonidagi <strong>Checkbox [✓]</strong> orqali uni istalgan paytda o'quvchilarga chiqarishingiz (ishga tushirishingiz) yoki yashirib qo'yishingiz mumkin!
                </p>
              </div>

              {/* Add Blitz Word Form */}
              <form onSubmit={handleCreateBlitzWord} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                <div className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>Yangi Lektion So'zini Kiritish</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {/* Lektion number */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">Leksiya Raqami:</label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-400 font-mono">Lektion</span>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={blitzLektion}
                        onChange={(e) => setBlitzLektion(parseInt(e.target.value, 10) || 1)}
                        className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-bold focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Day of the week */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">Hafta Kuni:</label>
                    <select
                      value={blitzDay}
                      onChange={(e) => setBlitzDay(e.target.value as BlitzScheduleDay)}
                      className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Dushanba">🔵 Dushanba</option>
                      <option value="Chorshanba">🟢 Chorshanba</option>
                      <option value="Juma">🟡 Juma</option>
                    </select>
                  </div>

                  {/* Article */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">Artikl (Otlar uchun):</label>
                    <select
                      value={blitzArticle}
                      onChange={(e) => setBlitzArticle(e.target.value as GermanArticle)}
                      className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-mono font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="der">der (erkak)</option>
                      <option value="die">die (ayol)</option>
                      <option value="das">das (o'rta)</option>
                      <option value="none">— artiklsiz / fe'l / sifat</option>
                    </select>
                  </div>

                  {/* Plural */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">Ko'plik Shakli:</label>
                    <input
                      type="text"
                      value={blitzPlural}
                      onChange={(e) => setBlitzPlural(e.target.value)}
                      placeholder="Masalan: die Tische"
                      className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* German word */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">Nemischa so'z yoki ibora: *</label>
                    <input
                      type="text"
                      value={blitzGerman}
                      onChange={(e) => setBlitzGerman(e.target.value)}
                      placeholder="Masalan: Guten Morgen, der Tisch, lernen..."
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-serif font-bold text-sm focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  {/* Uzbek meaning */}
                  <div>
                    <label className="block text-stone-500 mb-1 font-semibold">O'zbekcha tarjimasi: *</label>
                    <input
                      type="text"
                      value={blitzUzbek}
                      onChange={(e) => setBlitzUzbek(e.target.value)}
                      placeholder="Masalan: Xayrli tong, stol, o'rganmoq..."
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="text-xs">
                  <label className="block text-stone-500 mb-1 font-semibold">Eslatma / Grammatik qoida (ixtiyoriy):</label>
                  <input
                    type="text"
                    value={blitzNotes}
                    onChange={(e) => setBlitzNotes(e.target.value)}
                    placeholder="Masalan: Dativ talab qiladi yoki rasmiy salomlashuv..."
                    className="w-full p-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Checkbox: Ishga tushirish */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold select-none bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
                    <input
                      type="checkbox"
                      checked={blitzIsActive}
                      onChange={(e) => setBlitzIsActive(e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                    />
                    <span className={blitzIsActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-stone-500'}>
                      {blitzIsActive ? '✓ Ishga tushirish (O\'quvchilarga darhol ko\'rsatilsin)' : 'Qoralama (Hali o\'quvchilarga ko\'rsatilmasin)'}
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Leksiyaga saqlash</span>
                  </button>
                </div>
              </form>

              {/* Blitz Words List & Management */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Mavjud Lektion So'zlari ({blitzWords.length} ta)</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      Faol: {blitzWords.filter(w => w.isActive).length} ta
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-500/10 text-stone-500 font-semibold">
                      Kutilmoqda: {blitzWords.filter(w => !w.isActive).length} ta
                    </span>
                  </div>

                  {/* Filters in admin */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={adminBlitzDayFilter}
                      onChange={(e) => setAdminBlitzDayFilter(e.target.value)}
                      className="p-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs"
                    >
                      <option value="all">Barcha kunlar</option>
                      <option value="Dushanba">Dushanba</option>
                      <option value="Chorshanba">Chorshanba</option>
                      <option value="Juma">Juma</option>
                    </select>

                    <select
                      value={adminBlitzLektionFilter}
                      onChange={(e) => setAdminBlitzLektionFilter(e.target.value)}
                      className="p-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs"
                    >
                      <option value="all">Barcha leksiyalar</option>
                      {Array.from(new Set(blitzWords.map((w) => w.lektionNumber))).sort((a, b) => a - b).map((num) => (
                        <option key={num} value={String(num)}>Lektion {num}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const maxLek = Math.max(0, ...blitzWords.map(w => w.lektionNumber));
                        setBlitzLektion(maxLek + 1);
                        setNotification(`Yangi Lektion ${maxLek + 1} tanlandi! Endi unga Dushanba/Chorshanba/Juma so'zlarini qo'shishingiz mumkin.`);
                        setTimeout(() => setNotification(''), 4000);
                      }}
                      className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold rounded-lg border border-amber-500/30 transition-all cursor-pointer"
                      title="Keyingi yangi Lektionni ochish"
                    >
                      + Yangi Lektion
                    </button>
                  </div>
                </div>

                {/* Batch Action Toolbar for the Selected Lektion */}
                {adminBlitzLektionFilter !== 'all' && (
                  <div className="flex items-center justify-between gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex-wrap">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      ⚡ <strong>Lektion {adminBlitzLektionFilter}</strong> boshqaruvi:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onActivateLektion?.(Number(adminBlitzLektionFilter));
                          setNotification(`Lektion ${adminBlitzLektionFilter} dagi barcha so'zlar bir zumda ISHGA TUSHIRILDI!`);
                          setTimeout(() => setNotification(''), 4000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Barchasini ishga tushirish</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onDeactivateLektion?.(Number(adminBlitzLektionFilter));
                          setNotification(`Lektion ${adminBlitzLektionFilter} dagi so'zlar qoralamaga olindi (yashirildi).`);
                          setTimeout(() => setNotification(''), 4000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-semibold transition-all cursor-pointer"
                      >
                        Qoralamaga olish
                      </button>
                    </div>
                  </div>
                )}

                {/* Words Table */}
                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden max-h-[500px] overflow-y-auto">
                  {blitzWords
                    .filter((w) => {
                      if (adminBlitzDayFilter !== 'all' && w.day !== adminBlitzDayFilter) return false;
                      if (adminBlitzLektionFilter !== 'all' && String(w.lektionNumber) !== adminBlitzLektionFilter) return false;
                      return true;
                    })
                    .map((w) => (
                      <div
                        key={w.id}
                        className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                          w.isActive
                            ? 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40'
                            : 'bg-stone-50/60 dark:bg-stone-950/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Live Toggle Checkbox */}
                          <label className="flex items-center gap-1.5 cursor-pointer" title="Ishga tushirish / yashirish">
                            <input
                              type="checkbox"
                              checked={w.isActive}
                              onChange={() => onToggleBlitzWord?.(w.id)}
                              className="w-4 h-4 text-amber-500 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                            />
                          </label>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                                Lektion {w.lektionNumber}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                w.day === 'Dushanba' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300' :
                                w.day === 'Chorshanba' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300' :
                                'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                              }`}>
                                {w.day}
                              </span>
                              <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                                {w.article && w.article !== 'none' ? `${w.article} ` : ''}{w.german}
                              </span>
                              <span className={w.isActive ? 'text-[10px] text-emerald-600 font-bold' : 'text-[10px] text-stone-400 font-medium'}>
                                {w.isActive ? '(Ishga tushirilgan)' : '(Kutilmoqda)'}
                              </span>
                            </div>

                            <div className="text-xs text-stone-500 mt-0.5">
                              {w.uzbek} {w.plural && w.plural !== '—' && `· Ko'pligi: ${w.plural}`}
                            </div>
                            {w.notes && (
                              <div className="text-[11px] text-amber-700 dark:text-amber-300 italic mt-0.5">
                                💡 {w.notes}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {onDeleteBlitzWord && (
                            <button
                              type="button"
                              onClick={() => onDeleteBlitzWord(w.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="So'zni o'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
