import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { INITIAL_GERMAN_WORDS } from './src/data/germanDictionary';
import { INITIAL_BLITZ_SCHEDULED_WORDS } from './src/data/blitzScheduleData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// File-based persistent storage for applications, shared users, and Duden words
const DB_FILE = path.resolve(__dirname, 'server_db.json');

interface ServerDB {
  applications: Array<{
    id: string;
    fullName: string;
    phone: string;
    telegram?: string;
    level: string;
    message?: string;
    status: 'pending' | 'approved';
    createdAt: string;
  }>;
  users: Array<{
    id: string;
    username: string;
    password: string;
    name: string;
    role: 'admin' | 'student';
    phone?: string;
    level: string;
    wordsLearned: number;
    xpPoints: number;
    createdAt: string;
  }>;
  words?: any[];
  customWords: any[];
  telegramConfig?: {
    botToken?: string;
    adminChatId?: string;
    botUsername?: string;
    notificationsEnabled?: boolean;
  };
  activeSessions?: Array<{
    sessionId: string;
    userId: string;
    username: string;
    name: string;
    role: string;
    loginTime: string;
    device?: string;
  }>;
  revokedUsernames?: string[];
  blitzScheduledWords?: any[];
}

function loadDB(): ServerDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      const loadedWords = Array.isArray(parsed.words) && parsed.words.length > 0 
        ? parsed.words 
        : INITIAL_GERMAN_WORDS;
      const loadedBlitzWords = Array.isArray(parsed.blitzScheduledWords) && parsed.blitzScheduledWords.length > 0
        ? parsed.blitzScheduledWords
        : INITIAL_BLITZ_SCHEDULED_WORDS;

      return {
        applications: parsed.applications || [],
        users: parsed.users || [],
        words: loadedWords,
        customWords: parsed.customWords || [],
        telegramConfig: parsed.telegramConfig || {
          botToken: process.env.TELEGRAM_BOT_TOKEN || '',
          adminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
          botUsername: 'worthub_blitz_bot',
          notificationsEnabled: true
        },
        activeSessions: parsed.activeSessions || [],
        revokedUsernames: parsed.revokedUsernames || [],
        blitzScheduledWords: loadedBlitzWords
      };
    }
  } catch (err) {
    console.error('Error reading server_db.json:', err);
  }
  return { 
    applications: [], 
    users: [], 
    words: INITIAL_GERMAN_WORDS,
    customWords: [],
    telegramConfig: {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      adminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
      botUsername: 'worthub_blitz_bot',
      notificationsEnabled: true
    },
    activeSessions: [],
    revokedUsernames: [],
    blitzScheduledWords: INITIAL_BLITZ_SCHEDULED_WORDS
  };
}

function saveDB(db: ServerDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving server_db.json:', err);
  }
}

// Telegram message dispatcher
async function sendTelegramNotification(text: string): Promise<boolean> {
  const db = loadDB();
  const token = db.telegramConfig?.botToken || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = db.telegramConfig?.adminChatId || process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId || db.telegramConfig?.notificationsEnabled === false) {
    console.log('[TELEGRAM NOT CONFIGURED OR MUTED]', text);
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    return resp.ok;
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
    return false;
  }
}

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  saveDB({ applications: [], users: [], customWords: [] });
}

// -------------------------------------------------------------
// APPLICATIONS API (Shared across all devices and students)
// -------------------------------------------------------------

// 1. GET ALL APPLICATIONS (for Admin to view real-time applications)
app.get('/api/applications', (_req: Request, res: Response) => {
  const db = loadDB();
  res.json(db.applications || []);
});

// 2. SUBMIT APPLICATION (Called by ANY student from their phone or computer)
app.post('/api/applications', (req: Request, res: Response) => {
  try {
    const { fullName, phone, telegram, level = 'A1', message } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: "Ism va telefon raqami talab qilinadi." });
    }

    const db = loadDB();
    const newApp = {
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      telegram: telegram ? String(telegram).trim() : '',
      level: String(level).trim(),
      message: message ? String(message).trim() : '',
      status: 'pending' as const,
      createdAt: new Date().toISOString().split('T')[0],
    };

    db.applications = [newApp, ...(db.applications || [])];
    saveDB(db);

    console.log(`[YANGI ARIZA KELDI] ${newApp.fullName} (${newApp.phone}) - Daraja: ${newApp.level}`);

    // Instant Telegram Notification to Admin
    sendTelegramNotification(
      `📩 <b>YANGI ARIZA KELDI (worthub.uz)</b>\n\n` +
      `👤 <b>F.I.Sh:</b> ${newApp.fullName}\n` +
      `📞 <b>Telefon:</b> ${newApp.phone}\n` +
      `✈️ <b>Telegram:</b> ${newApp.telegram ? '@' + newApp.telegram.replace('@', '') : 'Ko\'rsatilmagan'}\n` +
      `🎯 <b>Daraja:</b> ${newApp.level}\n` +
      `💬 <b>Qo'shimcha:</b> ${newApp.message || '—'}\n` +
      `⏰ <b>Sana:</b> ${new Date().toLocaleString('uz-UZ')}`
    ).catch(() => {});

    return res.status(201).json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi!",
      application: newApp,
    });
  } catch (err: any) {
    console.error('Application submission error:', err);
    return res.status(500).json({ error: "Ariza saqlashda xatolik yuz berdi." });
  }
});

// 3. APPROVE OR UPDATE APPLICATION STATUS
app.put('/api/applications/:id/status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = loadDB();
    db.applications = db.applications.map((a) =>
      a.id === id ? { ...a, status: status || 'approved' } : a
    );
    saveDB(db);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Xatolik yuz berdi" });
  }
});

// 4. DELETE APPLICATION
app.delete('/api/applications/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = loadDB();
    db.applications = db.applications.filter((a) => a.id !== id);
    saveDB(db);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Xatolik yuz berdi" });
  }
});

// -------------------------------------------------------------
// USERS API (Shared student accounts across all devices)
// -------------------------------------------------------------
app.get('/api/users', (_req: Request, res: Response) => {
  const db = loadDB();
  res.json(db.users || []);
});

app.post('/api/users', (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (!user || !user.username || !user.password) {
      return res.status(400).json({ error: "Login va parol talab qilinadi" });
    }
    const db = loadDB();
    db.users = [user, ...(db.users || []).filter((u) => u.username !== user.username)];
    saveDB(db);
    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: "Foydalanuvchi saqlashda xatolik" });
  }
});

app.delete('/api/users/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = loadDB();
    db.users = db.users.filter((u) => u.id !== id);
    saveDB(db);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Xatolik yuz berdi" });
  }
});

// -------------------------------------------------------------
// DUDEN GERMAN VOCABULARY CORPUS API (CENTRAL DATABASE)
// -------------------------------------------------------------

// 1. GET ALL WORDS OR FILTER BY LEVEL (?level=A1)
app.get('/api/words', (req: Request, res: Response) => {
  try {
    const { level } = req.query;
    const db = loadDB();
    let words = db.words && db.words.length > 0 ? db.words : INITIAL_GERMAN_WORDS;
    if (level && typeof level === 'string' && level !== 'all') {
      words = words.filter((w) => String(w.level).toUpperCase() === level.toUpperCase());
    }
    return res.json(words);
  } catch (err) {
    return res.status(500).json({ error: "So'zlarni yuklashda xatolik" });
  }
});

// 2. ADD A NEW WORD TO DATABASE
app.post('/api/words', (req: Request, res: Response) => {
  try {
    const newWord = req.body;
    if (!newWord || !newWord.german || !newWord.meaningUz) {
      return res.status(400).json({ error: "Nemischa so'z va o'zbekcha tarjimasi kiritilishi shart" });
    }

    const db = loadDB();
    const existing = db.words && db.words.length > 0 ? db.words : INITIAL_GERMAN_WORDS;
    
    const wordEntry = {
      id: newWord.id || `de-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      german: String(newWord.german).trim(),
      article: newWord.article || 'none',
      plural: newWord.plural || '—',
      partOfSpeech: newWord.partOfSpeech || 'nomen',
      partOfSpeechUz: newWord.partOfSpeechUz || "Ot",
      pronunciationIPA: newWord.pronunciationIPA || '',
      pronunciationUz: newWord.pronunciationUz || '',
      meaningUz: String(newWord.meaningUz).trim(),
      level: newWord.level || 'A1',
      examples: Array.isArray(newWord.examples) ? newWord.examples : [],
      synonyms: Array.isArray(newWord.synonyms) ? newWord.synonyms : [],
      antonyms: Array.isArray(newWord.antonyms) ? newWord.antonyms : [],
      grammarNotes: newWord.grammarNotes || '',
      tags: Array.isArray(newWord.tags) ? newWord.tags : []
    };

    db.words = [wordEntry, ...existing.filter((w: any) => w.id !== wordEntry.id && w.german.toLowerCase() !== wordEntry.german.toLowerCase())];
    saveDB(db);

    return res.status(201).json({ success: true, word: wordEntry });
  } catch (err) {
    return res.status(500).json({ error: "So'zni saqlashda xatolik" });
  }
});

// 3. UPDATE AN EXISTING WORD
app.put('/api/words/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const db = loadDB();
    db.words = (db.words && db.words.length > 0 ? db.words : INITIAL_GERMAN_WORDS).map((w: any) =>
      w.id === id ? { ...w, ...updatedData } : w
    );
    saveDB(db);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "So'zni yangilashda xatolik" });
  }
});

// 4. DELETE WORD
app.delete('/api/words/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = loadDB();
    db.words = (db.words && db.words.length > 0 ? db.words : INITIAL_GERMAN_WORDS).filter((w: any) => w.id !== id);
    saveDB(db);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "So'zni o'chirishda xatolik" });
  }
});

// 5. RESET / SEED FULL OFFICIAL DUDEN CORPUS
app.post('/api/words/reset-duden', (_req: Request, res: Response) => {
  try {
    const db = loadDB();
    db.words = INITIAL_GERMAN_WORDS;
    saveDB(db);
    return res.json({ success: true, count: INITIAL_GERMAN_WORDS.length, words: INITIAL_GERMAN_WORDS });
  } catch (err) {
    return res.status(500).json({ error: "Duden bazasini tiklashda xatolik" });
  }
});

// -------------------------------------------------------------
// BLITZ O'QUV MARKAZI SCHEDULED WORDS API (DUSH-CHOR-JUMA)
// -------------------------------------------------------------

// 1. GET ALL BLITZ SCHEDULED WORDS
app.get('/api/blitz-words', (req: Request, res: Response) => {
  try {
    const { activeOnly, day, lektion } = req.query;
    const db = loadDB();
    let words = db.blitzScheduledWords && db.blitzScheduledWords.length > 0 
      ? db.blitzScheduledWords 
      : INITIAL_BLITZ_SCHEDULED_WORDS;

    if (activeOnly === 'true') {
      words = words.filter((w: any) => w.isActive === true);
    }
    if (day && typeof day === 'string' && day !== 'all') {
      words = words.filter((w: any) => w.day.toLowerCase() === day.toLowerCase());
    }
    if (lektion && typeof lektion === 'string' && lektion !== 'all') {
      words = words.filter((w: any) => String(w.lektionNumber) === lektion);
    }

    return res.json(words);
  } catch (err) {
    return res.status(500).json({ error: "Blitz so'zlarini yuklashda xatolik" });
  }
});

// 2. ADD A NEW BLITZ SCHEDULED WORD
app.post('/api/blitz-words', (req: Request, res: Response) => {
  try {
    const item = req.body;
    if (!item || !item.german || !item.uzbek) {
      return res.status(400).json({ error: "Nemischa so'z va o'zbekcha tarjimasi kiritilishi shart" });
    }

    const db = loadDB();
    const existing = db.blitzScheduledWords && db.blitzScheduledWords.length > 0 
      ? db.blitzScheduledWords 
      : INITIAL_BLITZ_SCHEDULED_WORDS;

    const newEntry = {
      id: item.id || `bsw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      german: String(item.german).trim(),
      uzbek: String(item.uzbek).trim(),
      article: item.article || 'none',
      plural: item.plural || '—',
      lektionNumber: parseInt(item.lektionNumber, 10) || 1,
      day: item.day || 'Dushanba',
      isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
      notes: item.notes || '',
      addedAt: item.addedAt || new Date().toISOString().split('T')[0]
    };

    db.blitzScheduledWords = [newEntry, ...existing];
    saveDB(db);

    return res.status(201).json({ success: true, word: newEntry });
  } catch (err) {
    return res.status(500).json({ error: "Blitz so'zini qo'shishda xatolik" });
  }
});

// 3. TOGGLE ACTIVE CHECKBOX STATUS
app.patch('/api/blitz-words/:id/toggle', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = loadDB();
    const existing = db.blitzScheduledWords && db.blitzScheduledWords.length > 0 
      ? db.blitzScheduledWords 
      : INITIAL_BLITZ_SCHEDULED_WORDS;

    let updatedWord: any = null;
    db.blitzScheduledWords = existing.map((w: any) => {
      if (w.id === id) {
        updatedWord = { ...w, isActive: !w.isActive };
        return updatedWord;
      }
      return w;
    });

    saveDB(db);
    return res.json({ success: true, word: updatedWord });
  } catch (err) {
    return res.status(500).json({ error: "Holatni o'zgartirishda xatolik" });
  }
});

// 4. DELETE A BLITZ SCHEDULED WORD
app.delete('/api/blitz-words/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = loadDB();
    const existing = db.blitzScheduledWords && db.blitzScheduledWords.length > 0 
      ? db.blitzScheduledWords 
      : INITIAL_BLITZ_SCHEDULED_WORDS;

    db.blitzScheduledWords = existing.filter((w: any) => w.id !== id);
    saveDB(db);

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Blitz so'zini o'chirishda xatolik" });
  }
});

// -------------------------------------------------------------
// TELEGRAM BOT & SESSIONS CONTROL API
// -------------------------------------------------------------

// Get Telegram config
app.get('/api/telegram/config', (_req: Request, res: Response) => {
  const db = loadDB();
  res.json(db.telegramConfig || {
    botToken: '',
    adminChatId: '',
    botUsername: 'worthub_blitz_bot',
    notificationsEnabled: true
  });
});

// Save Telegram config
app.post('/api/telegram/config', (req: Request, res: Response) => {
  try {
    const { botToken, adminChatId, botUsername = 'worthub_blitz_bot', notificationsEnabled = true } = req.body;
    const db = loadDB();
    db.telegramConfig = {
      botToken: botToken ? String(botToken).trim() : '',
      adminChatId: adminChatId ? String(adminChatId).trim() : '',
      botUsername: String(botUsername).trim(),
      notificationsEnabled: Boolean(notificationsEnabled)
    };
    saveDB(db);
    return res.json({ success: true, message: "Telegram bot sozlamalari saqlandi!" });
  } catch (err) {
    return res.status(500).json({ error: "Telegram sozlamalarini saqlashda xatolik" });
  }
});

// Test Telegram Bot Message
app.post('/api/telegram/test', async (req: Request, res: Response) => {
  try {
    const { botToken, adminChatId } = req.body;
    const token = botToken || loadDB().telegramConfig?.botToken;
    const chatId = adminChatId || loadDB().telegramConfig?.adminChatId;

    if (!token || !chatId) {
      return res.status(400).json({ error: "Bot token va Admin Chat ID kiritilishi shart." });
    }

    const testMsg = `🚀 <b>worthub.uz — Telegram Bot Boshqaruvi Faollashtirildi!</b>\n\n` +
      `👤 <b>Hurmatli Ahmadjon!</b>\n` +
      `Siz bot boshqaruvchisiz. Endi kim tizimga kirsa, chiqsa yoki yangi ariza topshirsa, sizga darhol mana shu bot orqali xabar keladi.\n\n` +
      `⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}\n` +
      `🇩🇪 <i>Deutsch lernen mit Blitz O'quv Markazi!</i>`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMsg,
        parse_mode: 'HTML',
      }),
    });

    const data = await resp.json();
    if (resp.ok && data.ok) {
      return res.json({ success: true, message: "Sinov xabari Telegramingizga yuborildi!" });
    } else {
      return res.status(400).json({ error: data.description || "Telegram xatolik qaytardi" });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Telegramga ulanishda xatolik" });
  }
});

// Broadcast User Login Event (called from frontend when any user signs in)
app.post('/api/sessions/login-event', (req: Request, res: Response) => {
  try {
    const { userId, username, name, role = 'student', device = 'Veb-brauzer' } = req.body;
    const db = loadDB();
    const sessionId = `sess-${Date.now()}`;
    const loginTime = new Date().toLocaleString('uz-UZ');

    // Remove from revoked list if was previously kicked
    db.revokedUsernames = (db.revokedUsernames || []).filter((u) => u.toLowerCase() !== username.toLowerCase());

    // Add or update in active sessions
    const newSession = {
      sessionId,
      userId: userId || username,
      username,
      name,
      role,
      loginTime,
      device
    };

    db.activeSessions = [
      newSession,
      ...(db.activeSessions || []).filter((s) => s.username.toLowerCase() !== username.toLowerCase())
    ];
    saveDB(db);

    // Send Telegram alert
    sendTelegramNotification(
      `🟢 <b>TIZIMGA KIRISH (LOGIN)</b>\n\n` +
      `👤 <b>Ism:</b> ${name}\n` +
      `🔑 <b>Login:</b> @${username}\n` +
      `📱 <b>Rol:</b> ${role === 'admin' ? 'Boshqaruvchi (Admin)' : 'O\'quvchi'}\n` +
      `🌐 <b>Qurilma:</b> ${device}\n` +
      `⏰ <b>Vaqt:</b> ${loginTime}`
    ).catch(() => {});

    return res.json({ success: true, sessionId });
  } catch (err) {
    return res.status(500).json({ error: "Sessiya xatoligi" });
  }
});

// Broadcast User Logout Event
app.post('/api/sessions/logout-event', (req: Request, res: Response) => {
  try {
    const { username, name } = req.body;
    const db = loadDB();
    if (username) {
      db.activeSessions = (db.activeSessions || []).filter((s) => s.username.toLowerCase() !== username.toLowerCase());
      saveDB(db);

      // Send Telegram alert
      sendTelegramNotification(
        `🔴 <b>TIZIMDAN CHIQISH (LOGOUT)</b>\n\n` +
        `👤 <b>Ism:</b> ${name || username}\n` +
        `🔑 <b>Login:</b> @${username}\n` +
        `⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`
      ).catch(() => {});
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Chiqish xatoligi" });
  }
});

// Get Active Sessions List (for Admin to view and manage)
app.get('/api/sessions', (_req: Request, res: Response) => {
  const db = loadDB();
  res.json(db.activeSessions || []);
});

// Admin Kicks a User out (Chiqarib yuborish / Sessiyani bekor qilish)
app.post('/api/sessions/kick', (req: Request, res: Response) => {
  try {
    const { username, name } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username kiritilmadi" });
    }

    const db = loadDB();
    // Add to revoked usernames
    if (!db.revokedUsernames) db.revokedUsernames = [];
    if (!db.revokedUsernames.includes(username.toLowerCase())) {
      db.revokedUsernames.push(username.toLowerCase());
    }

    // Remove from active sessions
    db.activeSessions = (db.activeSessions || []).filter((s) => s.username.toLowerCase() !== username.toLowerCase());
    saveDB(db);

    // Send Telegram alert
    sendTelegramNotification(
      `⚠️ <b>O'QUVCHI CHIQARIB YUBORILDI (KICK)</b>\n\n` +
      `👤 <b>Ism:</b> ${name || username}\n` +
      `🔑 <b>Login:</b> @${username}\n` +
      `🛡 <b>Holat:</b> Admin tomonidan sessiya bekor qilindi.\n` +
      `⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`
    ).catch(() => {});

    return res.json({ success: true, message: `«${name || username}» tizimdan muvaffaqiyatli chiqarib yuborildi!` });
  } catch (err) {
    return res.status(500).json({ error: "Chiqarishda xatolik" });
  }
});

// Check if username was revoked / kicked
app.get('/api/sessions/check-revoked/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  const db = loadDB();
  const isRevoked = (db.revokedUsernames || []).includes(username.toLowerCase());
  res.json({ revoked: isRevoked });
});

// Initialize GoogleGenAI SDK safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: "so'zhub.uz API",
    geminiConfigured: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// Deep Linguistic Analysis with Gemini 3.8 Flash
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { wordOrPhrase, mode = 'etymology' } = req.body;

    if (!wordOrPhrase || typeof wordOrPhrase !== 'string') {
      return res.status(400).json({ error: "So'z yoki ibora kiritilmadi." });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API kaliti topilmadi.",
        fallback: true,
      });
    }

    const systemPrompt = `Siz O'zbek tili va adabiyoti bo'yicha eng nufuzli tilshunos olim, etimologiya va Alisher Navoiy merosi bo'yicha akademik mutaxassissiz. 
Berilgan o'zbekcha so'z, ibora yoki satrni chuqur ilmiy va badiiy tahlil qiling. 
Javobni aniq va xolis o'zbek adabiy tilida bering.`;

    const promptText = `Tahlil ob'ekti: "${wordOrPhrase}"
Tahlil turi: ${mode}
Iltimos, ushbu so'z/matn bo'yicha quyidagi ma'lumotlarni tuzilmalashtirilgan JSON formatida taqdim eting:
1. word: So'z yoki iboraning to'liq shakli
2. etymologyOrigin: Kelib chiqishi (arabcha, forscha, qadimgi turkiy/chig'atoy, lotincha, ruscha va h.k.) va tub ma'nosi
3. historicalEvolution: Tarixiy rivojlanishi, qachon va qanday qilib o'zbek tiliga o'tganligi
4. classicQuote: Mumtoz adabiyotdan (Alisher Navoiy, Bobur, Lutfiy, Mashrab, Qodiriy, Cho'lpon yoki boshqa mumtoz ijodkorlar) keltirilgan misol
5. classicAuthor: Ushbu misol muallifi va asar nomi
6. dialectVariations: O'zbekiston viloyatlari shevalaridagi talaffuzi yoki sinonimlari (masalan, vodiy, toshkent, samarqand, buxoro, xorazm)
7. stylisticRegister: Uslubiy mansubligi (adabiy, rasmiy, publitsistik, jonli so'zlashuv, arxaizm/tarixiy so'z)
8. linguisticAdvice: Ushbu so'zdan to'g'ri foydalanish bo'yicha tavsiya va nutq madaniyati maslahati`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            etymologyOrigin: { type: Type.STRING },
            historicalEvolution: { type: Type.STRING },
            classicQuote: { type: Type.STRING },
            classicAuthor: { type: Type.STRING },
            dialectVariations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  region: { type: Type.STRING },
                  variation: { type: Type.STRING },
                  note: { type: Type.STRING },
                },
              },
            },
            stylisticRegister: { type: Type.STRING },
            linguisticAdvice: { type: Type.STRING },
          },
          required: [
            'word',
            'etymologyOrigin',
            'historicalEvolution',
            'classicQuote',
            'classicAuthor',
            'stylisticRegister',
            'linguisticAdvice',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Model bo'sh javob qaytardi");
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini Analyze API Error:', error);
    return res.status(500).json({
      error: "Tahlil jarayonida xatolik yuz berdi: " + (error?.message || 'Noma\'lum xatolik'),
    });
  }
});

// AI Stylistic Text Polisher & Grammar Optimizer
app.post('/api/gemini/polish-text', async (req: Request, res: Response) => {
  try {
    const { text, style = 'adabiy' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Matn kiritilmadi.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini xizmati mavjud emas.',
      });
    }

    const promptText = `Quyidagi o'zbekcha matnni tekshirib, uning imlosini, uslubini va ravonligini yaxshilang.
Matn: "${text}"
Mo'ljallangan uslub: ${style} (adabiy, rasmiy-ish yuritish yoki publitsistik).
Quyidagi JSON formatda qaytaring:
1. polishedText: To'liq tahrirlangan va xatolardan tozalangan matn
2. changesCount: Kiritilgan tuzatishlar soni
3. suggestions: Kiritilgan o'zgarishlar va ularning sabablari ro'yxati (har biri bo'yicha tushuntirish)
4. readabilityAssessment: Matnning ravonligi va o'qilishi haqida 1-2 jumlalik xulosa`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: "Siz professional o'zbek tili muharriri va musahhihisiz. Matnlarni imlo, tinish belgilari va stilistik jihatdan mukammal qilasiz.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            polishedText: { type: Type.STRING },
            changesCount: { type: Type.INTEGER },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            readabilityAssessment: { type: Type.STRING },
          },
          required: ['polishedText', 'changesCount', 'suggestions', 'readabilityAssessment'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini Polish API Error:', error);
    return res.status(500).json({
      error: 'Matnni tahrirlashda xatolik yuz berdi: ' + (error?.message || ''),
    });
  }
});

// Mount Vite or serve static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production' || !fs.existsSync(path.resolve(__dirname, 'src'));

  if (!isProduction) {
    // In dev, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: PORT,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`So'zHub.uz server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
