import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  UserX, 
  Key, 
  Radio, 
  RefreshCw, 
  MessageSquare, 
  ExternalLink,
  Sliders,
  Check
} from 'lucide-react';
import { GermanFlagBadge } from './GermanFlagBadge';
import { UserAccount, StudentApplication } from '../types';

interface TelegramBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredUsers: UserAccount[];
  applications: StudentApplication[];
  onOpenAddUser: () => void;
}

interface TelegramMessage {
  id: string;
  sender: 'bot' | 'admin' | 'system';
  text: string;
  time: string;
  isAlert?: boolean;
}

export const TelegramBotModal: React.FC<TelegramBotModalProps> = ({
  isOpen,
  onClose,
  registeredUsers,
  applications,
  onOpenAddUser
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'settings'>('simulator');
  const [botToken, setBotToken] = useState('');
  const [adminChatId, setAdminChatId] = useState('');
  const [botUsername, setBotUsername] = useState('worthub_blitz_bot');
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState<string>('');
  
  // Active Sessions
  const [sessions, setSessions] = useState<Array<{
    sessionId: string;
    userId: string;
    username: string;
    name: string;
    role: string;
    loginTime: string;
    device?: string;
  }>>([]);

  // Simulator Messages
  const [messages, setMessages] = useState<TelegramMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: '👋 <b>Assalomu alaykum, Hurmatli Ahmadjon!</b>\n\nMen Blitz O\'quv Markazi nemis tili platformasining rasmiy boshqaruv botiman (@BlitzDeutschBot).\n\nBu yerda siz saytga kirayotgan va chiqayotgan har bir o\'quvchini nazorat qilishingiz, arizalarni qabul qilishingiz va kerak bo\'lsa o\'quvchini saytdan chiqarib yuborishingiz (kick) mumkin.\n\n👇 Buyruqlardan birini tanlang yoki yozing:',
      time: '12:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadConfig();
      loadSessions();
    }
  }, [isOpen]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConfig = async () => {
    try {
      const res = await fetch('/api/telegram/config');
      if (res.ok) {
        const data = await res.json();
        if (data.botToken) setBotToken(data.botToken);
        if (data.adminChatId) setAdminChatId(data.adminChatId);
        if (data.botUsername) setBotUsername(data.botUsername);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadSessions = async () => {
    try {
      const res = await fetch('/api/sessions');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setSessions(data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTestResult('');
    try {
      const res = await fetch('/api/telegram/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: botToken.trim(),
          adminChatId: adminChatId.trim(),
          botUsername: botUsername.trim(),
          notificationsEnabled: true
        })
      });
      if (res.ok) {
        setTestResult('✅ Telegram sozlamalari muvaffaqiyatli saqlandi!');
      } else {
        setTestResult('❌ Saqlashda xatolik yuz berdi.');
      }
    } catch {
      setTestResult('❌ Serverga ulanishda xatolik.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!botToken.trim() || !adminChatId.trim()) {
      alert("Iltimos, avval Bot Token va Admin Chat ID ni kiriting!");
      return;
    }
    setTestResult('Yuborilmoqda...');
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: botToken.trim(),
          adminChatId: adminChatId.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult('🚀 Sinov xabari Telegram ilovangizga muvaffaqiyatli yetib bordi!');
      } else {
        setTestResult(`❌ Telegram xatosi: ${data.error || 'Yuborib bo\'lmadi'}`);
      }
    } catch (err: any) {
      setTestResult(`❌ Xatolik: ${err.message}`);
    }
  };

  // Kick user handler
  const handleKickUser = async (username: string, name: string) => {
    const cleanUser = username.replace('@', '').trim();
    try {
      const res = await fetch('/api/sessions/kick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, name })
      });
      if (res.ok) {
        const kickMsg: TelegramMessage = {
          id: `kick-${Date.now()}`,
          sender: 'bot',
          text: `⚠️ <b>O'quvchi tizimdan chiqarib yuborildi!</b>\n\n👤 <b>Ism:</b> ${name}\n🔑 <b>Login:</b> @${cleanUser}\n🛡 <b>Holat:</b> Sessiyasi bekor qilindi, saytdan darhol avtomatik chiqarildi.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAlert: true
        };
        setMessages((prev) => [...prev, kickMsg]);
        loadSessions();
      }
    } catch {
      alert("Chiqarishda xatolik yuz berdi");
    }
  };

  // Send Command in Simulator
  const handleSendMessage = async (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: TelegramMessage = {
      id: `u-${Date.now()}`,
      sender: 'admin',
      text: raw,
      time
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    const cmd = raw.toLowerCase();

    // Process Bot Responses
    setTimeout(async () => {
      let botResponse = '';

      if (cmd === '/start' || cmd === 'start') {
        botResponse = `🤖 <b>Blitz Deutsch Bot Boshqaruv Menyusi</b>\n\n` +
          `Quyidagi buyruqlardan foydalanishingiz mumkin:\n` +
          `• <b>/online</b> yoki <b>/sessions</b> — Saytda onlayn o'tirganlar ro'yxati\n` +
          `• <b>/arizalar</b> — Yangi kelib tushgan o'quvchilar arizalari\n` +
          `• <b>/users</b> — Ro'yxatdan o'tgan barcha o'quvchi va adminlar\n` +
          `• <b>/kick [login]</b> — O'quvchini saytdan chiqarib yuborish\n` +
          `• <b>/add</b> — Yangi o'quvchi yoki admin qo'shish`;
      } else if (cmd === '/online' || cmd === '/sessions' || cmd.includes('online') || cmd.includes('kirganlar')) {
        await loadSessions();
        if (sessions.length === 0) {
          botResponse = `📱 <b>Hozirda saytda faol kirganlar yo'q.</b>\n\n(Faqat tizimga login qilgan o'quvchi va adminlar bu yerda ko'rinadi).`;
        } else {
          botResponse = `🟢 <b>Hozirda saytda onlayn (${sessions.length} ta):</b>\n\n` +
            sessions.map((s, idx) => 
              `${idx + 1}. <b>${s.name}</b> (@${s.username})\n` +
              `   • Rol: ${s.role === 'admin' ? '🛡 Boshqaruvchi (Admin)' : '🎓 O\'quvchi'}\n` +
              `   • Kirgan vaqti: ${s.loginTime}\n` +
              `   • Qurilma: ${s.device || 'Veb-brauzer'}`
            ).join('\n\n') +
            `\n\n<i>Chiqarib yuborish uchun: <code>/kick [login]</code> buyrug'ini yuboring.</i>`;
        }
      } else if (cmd.startsWith('/kick')) {
        const parts = raw.split(' ');
        const targetUsername = parts[1]?.replace('@', '').trim();
        if (!targetUsername) {
          botResponse = `❌ <b>Login ko'rsatilmadi!</b>\n\nFoydalanish: <code>/kick [login]</code>\nMasalan: <code>/kick jasur_student</code>`;
        } else {
          const found = sessions.find((s) => s.username.toLowerCase() === targetUsername.toLowerCase()) ||
            registeredUsers.find((u) => u.username.toLowerCase() === targetUsername.toLowerCase());
          const targetName = found ? found.name : targetUsername;
          await handleKickUser(targetUsername, targetName);
          return;
        }
      } else if (cmd === '/arizalar' || cmd.includes('ariza')) {
        const pending = applications.filter((a) => a.status === 'pending');
        if (pending.length === 0) {
          botResponse = `📩 <b>Hozircha ko'rib chiqilmagan yangi arizalar yo'q.</b> Barcha arizalar tasdiqlangan!`;
        } else {
          botResponse = `📩 <b>Kutilayotgan yangi arizalar (${pending.length} ta):</b>\n\n` +
            pending.map((a, i) =>
              `${i + 1}. <b>${a.fullName}</b>\n` +
              `   📞 Telefon: ${a.phone}\n` +
              `   ✈️ Telegram: ${a.telegram || 'Yo\'q'}\n` +
              `   🎯 Daraja: ${a.level}\n` +
              `   💬 Izoh: ${a.message || '—'}`
            ).join('\n\n');
        }
      } else if (cmd === '/users' || cmd.includes('foydalanuvchilar')) {
        botResponse = `👥 <b>Platformadagi foydalanuvchilar (${registeredUsers.length} ta):</b>\n\n` +
          registeredUsers.slice(0, 8).map((u, i) =>
            `${i + 1}. <b>${u.name}</b> (@${u.username}) — ${u.role === 'admin' ? '🛡 Admin' : '🎓 O\'quvchi'}`
          ).join('\n') +
          (registeredUsers.length > 8 ? `\n...va yana ${registeredUsers.length - 8} ta o'quvchi` : '');
      } else if (cmd === '/add' || cmd.includes('qo\'shish')) {
        botResponse = `➕ <b>Yangi foydalanuvchi qo'shish</b>\n\nAdmin paneldagi maxsus oynani ochish uchun quyidagi tugmani bosing yoki Admin paneliga o'ting.`;
      } else {
        botResponse = `Buyruq tushunarsiz bo'ldi. Barcha buyruqlarni ko'rish uchun <b>/start</b> deb yozing yoki pastdagi tezkor tugmalardan foydalaning.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full h-[88vh] max-h-[720px] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Telegram Top Header */}
        <div className="bg-[#24A1DE] text-white px-5 py-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-white relative shadow-sm">
              <Bot className="w-5 h-5" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#24A1DE] absolute -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">
                  Blitz Deutsch Bot
                </h3>
                <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded font-mono font-semibold">
                  @{botUsername}
                </span>
              </div>
              <div className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>Onlayn boshqaruv tizimi (Ahmadjon)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Tab switch */}
            <div className="flex bg-black/15 rounded-xl p-0.5 mr-1">
              <button
                type="button"
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'simulator' ? 'bg-white text-[#24A1DE] shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Bot Chat
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'settings' ? 'bg-white text-[#24A1DE] shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Sozlamalar</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Telegram Bot Chat Simulator */}
        {activeTab === 'simulator' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#eef2f5] dark:bg-[#0e1621]">
            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
              <div className="text-center my-1">
                <span className="px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-stone-600 dark:text-stone-300 text-[11px] font-medium">
                  Bugun, {new Date().toLocaleDateString('uz-UZ')}
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs space-y-1.5 ${
                      msg.sender === 'admin'
                        ? 'bg-[#24A1DE] text-white rounded-br-xs'
                        : msg.isAlert
                          ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-bl-xs'
                          : 'bg-white dark:bg-[#182533] text-stone-900 dark:text-stone-100 border border-stone-200/60 dark:border-stone-800 rounded-bl-xs'
                    }`}
                  >
                    <div
                      className="whitespace-pre-line leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                    <div
                      className={`text-[10px] text-right ${
                        msg.sender === 'admin' ? 'text-white/70' : 'text-stone-400'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Action Commands Carousel */}
            <div className="p-2 border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-[#17212b]/80 backdrop-blur-sm flex items-center gap-1.5 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => handleSendMessage('/online')}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#24A1DE] hover:text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>/online (Kirganlar)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('/arizalar')}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#24A1DE] hover:text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                <span>/arizalar ({applications.filter(a => a.status === 'pending').length})</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('/users')}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#24A1DE] hover:text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <span>/users (Barcha o'quvchilar)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAddUser();
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-stone-950 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <span>+ Yangi odam qo'shish</span>
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-[#17212b] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="/online, /kick login, /arizalar..."
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#24A1DE]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-[#24A1DE] hover:bg-[#1f8ec4] text-white disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Real Telegram Bot Settings */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-stone-700 dark:text-stone-300">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <div className="font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2 text-sm">
                <Bot className="w-4 h-4 text-[#24A1DE]" />
                <span>Haqiqiy Telegram Bot ulanishi (@BotFather)</span>
              </div>
              <p className="leading-relaxed">
                Bu yerga o'zingizning Telegram Bot tokeningiz va shaxsiy Chat ID raqamingizni kiritib qo'ysangiz,
                kim saytga kirsa, chiqsa yoki ariza qoldirsa, <strong>to'g'ridan-to'g'ri telefoningizdagi Telegramingizga</strong> xabar boradi!
              </p>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">
                  Telegram Bot Token:
                </label>
                <input
                  type="text"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="Masalan: 123456789:ABCdefGhIJKlmNoPQRstuVWXyz"
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-xs focus:ring-2 focus:ring-[#24A1DE] focus:outline-none"
                />
                <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                  <span>Olish uchun:</span>
                  <a 
                    href="https://t.me/BotFather" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#24A1DE] font-bold underline hover:text-[#1f8ec4]"
                  >
                    @BotFather ga o'tish ↗
                  </a>
                  <span>va /newbot buyrug'ini yuboring.</span>
                </p>
              </div>

              <div>
                <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">
                  Admin Telegram Chat ID (Ahmadjon):
                </label>
                <input
                  type="text"
                  value={adminChatId}
                  onChange={(e) => setAdminChatId(e.target.value)}
                  placeholder="Masalan: 987654321"
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-xs focus:ring-2 focus:ring-[#24A1DE] focus:outline-none"
                />
                <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                  <span>Chat ID raqamingizni bilish uchun:</span>
                  <a 
                    href="https://t.me/userinfobot" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#24A1DE] font-bold underline hover:text-[#1f8ec4]"
                  >
                    @userinfobot ga o'tish ↗
                  </a>
                  <span>va /start bosing (u sizning ID raqamingizni chiqaradi).</span>
                </p>
              </div>

              <div>
                <label className="block font-bold text-stone-800 dark:text-stone-200 mb-1">
                  Bot foydalanuvchi nomi (@username):
                </label>
                <input
                  type="text"
                  value={botUsername}
                  onChange={(e) => setBotUsername(e.target.value)}
                  placeholder="BlitzDeutschBot"
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#24A1DE] focus:outline-none"
                />
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl border text-xs ${
                  testResult.includes('✅') || testResult.includes('🚀')
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}>
                  {testResult}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#24A1DE] hover:bg-[#1f8ec4] text-white font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saqlanmoqda...' : 'Sozlamalarni saqlash'}
                </button>
                <button
                  type="button"
                  onClick={handleSendTestMessage}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#24A1DE]" />
                  <span>Sinov xabari yuborish</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
