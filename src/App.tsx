import React, { useState, useEffect } from 'react';
import { GermanWordEntry, StudentLearner, AlphabetMode, ThemeMode, AuthUser, UserAccount, StudentApplication, CEFRLevel, BlitzScheduledWord } from './types';
import { INITIAL_GERMAN_WORDS } from './data/germanDictionary';
import { INITIAL_STUDENTS } from './data/studentsData';
import { INITIAL_BLITZ_SCHEDULED_WORDS } from './data/blitzScheduleData';
import { Navbar } from './components/Navbar';
import { GermanDictionarySection } from './components/GermanDictionarySection';
import { GermanWordDetailModal } from './components/GermanWordDetailModal';
import { StudentsLeaderboard } from './components/StudentsLeaderboard';
import { AdminPanelModal } from './components/AdminPanelModal';
import { GameSection } from './components/GameSection';
import { LessonsSection } from './components/LessonsSection';
import { BlitzWordsSection } from './components/BlitzWordsSection';
import { AILinguisticModal } from './components/AILinguisticModal';
import { AuthPortal } from './components/AuthPortal';
import { Footer } from './components/Footer';
import { InstallAppModal } from './components/InstallAppModal';
import { AlertTriangle, LogOut, CheckCircle2 } from 'lucide-react';

export default function App() {
  // 1. Current Logged-in User
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('worthub_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save or clear user session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('worthub_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('worthub_auth_user');
    }
  }, [currentUser]);

  // 2. Registered Users (Admin manually adds people - starts clean)
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_user_accounts_v3');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('worthub_user_accounts_v3', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // 3. Applications from Candidates (Synchronized with central backend server in real-time)
  const [applications, setApplications] = useState<StudentApplication[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_applications_v3');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const fetchApplicationsFromServer = async () => {
    try {
      const res = await fetch('/api/applications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setApplications(data);
          localStorage.setItem('worthub_applications_v3', JSON.stringify(data));
        }
      }
    } catch {
      // server offline / fallback to local storage
    }
  };

  const fetchUsersFromServer = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRegisteredUsers((prev) => {
            const map = new Map<string, UserAccount>();
            data.forEach((u: UserAccount) => map.set(u.username, u));
            prev.forEach((u) => {
              if (!map.has(u.username)) map.set(u.username, u);
            });
            return Array.from(map.values());
          });
        }
      }
    } catch {
      // fallback
    }
  };

  const fetchWordsFromServer = async () => {
    try {
      const res = await fetch('/api/words');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setGermanWords(data);
          localStorage.setItem('worthub_german_words_v5', JSON.stringify(data));
        }
      }
    } catch {
      // fallback to local cache
    }
  };

  useEffect(() => {
    fetchApplicationsFromServer();
    fetchUsersFromServer();
    fetchWordsFromServer();
    // Poll every 3.5 seconds so when anyone submits an application on their phone,
    // Ahmadjon sees it immediately in real time!
    const timer = setInterval(() => {
      fetchApplicationsFromServer();
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('worthub_applications_v3', JSON.stringify(applications));
  }, [applications]);

  // 4. Kick / Revoked Session Polling
  // If the logged-in user is kicked by Admin from the Telegram Bot or Admin panel,
  // their session is terminated immediately and a notification is displayed!
  const [kickedNotice, setKickedNotice] = useState<string>('');

  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sessions/check-revoked/${currentUser.username}`);
        if (res.ok) {
          const data = await res.json();
          if (data.revoked) {
            setKickedNotice(`Hurmatli ${currentUser.name}, sizning tizimga kirish sessiyangiz administrator (@ahmadjon) tomonidan to'xtatildi va siz tizimdan chiqarildingiz.`);
            setCurrentUser(null);
          }
        }
      } catch {
        // network error
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [currentUser]);

  // 5. PWA Install Prompt Listener
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallAppOpen, setIsInstallAppOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // 6. Theme Mode: Light or Dark
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('worthub_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 7. Alphabet Mode (Latin default)
  const [alphabet, setAlphabet] = useState<AlphabetMode>(() => {
    const saved = localStorage.getItem('worthub_alphabet');
    return saved === 'cyrillic' ? 'cyrillic' : 'latin';
  });

  // 8. Navigation Section (Default: 'german-dict')
  const [activeSection, setActiveSection] = useState<string>('german-dict');

  // 9. German Vocabulary Words with persistence and strict unique ID deduplication
  const [germanWords, setGermanWords] = useState<GermanWordEntry[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_german_words_v8');
      const baseList: GermanWordEntry[] = stored ? JSON.parse(stored) : INITIAL_GERMAN_WORDS;
      const wordMap = new Map<string, GermanWordEntry>();
      for (const w of INITIAL_GERMAN_WORDS) {
        wordMap.set(w.id, w);
      }
      for (const w of baseList) {
        wordMap.set(w.id, w);
      }
      return Array.from(wordMap.values());
    } catch {
      return INITIAL_GERMAN_WORDS;
    }
  });

  useEffect(() => {
    localStorage.setItem('worthub_german_words_v8', JSON.stringify(germanWords));
  }, [germanWords]);

  // 9.5 Blitz Scheduled Words (Dushanba / Chorshanba / Juma)
  const [blitzWords, setBlitzWords] = useState<BlitzScheduledWord[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_blitz_words_v2');
      if (stored) {
        const parsed: BlitzScheduledWord[] = JSON.parse(stored);
        const map = new Map<string, BlitzScheduledWord>();
        for (const w of INITIAL_BLITZ_SCHEDULED_WORDS) map.set(w.id, w);
        for (const w of parsed) map.set(w.id, w);
        return Array.from(map.values());
      }
      return INITIAL_BLITZ_SCHEDULED_WORDS;
    } catch {
      return INITIAL_BLITZ_SCHEDULED_WORDS;
    }
  });

  useEffect(() => {
    localStorage.setItem('worthub_blitz_words_v2', JSON.stringify(blitzWords));
  }, [blitzWords]);

  // Fetch server blitz words
  useEffect(() => {
    fetch('/api/blitz-words')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlitzWords((prev) => {
            const map = new Map<string, BlitzScheduledWord>();
            for (const w of prev) map.set(w.id, w);
            for (const w of data) map.set(w.id, w);
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleAddBlitzWord = async (word: BlitzScheduledWord) => {
    setBlitzWords((prev) => [word, ...prev]);
    try {
      await fetch('/api/blitz-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word),
      });
    } catch {}
  };

  const handleToggleBlitzWord = async (id: string) => {
    setBlitzWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
    try {
      await fetch(`/api/blitz-words/${id}/toggle`, {
        method: 'PATCH',
      });
    } catch {}
  };

  const handleDeleteBlitzWord = async (id: string) => {
    setBlitzWords((prev) => prev.filter((w) => w.id !== id));
    try {
      await fetch(`/api/blitz-words/${id}`, {
        method: 'DELETE',
      });
    } catch {}
  };

  const handleActivateLektion = (lektionNumber: number) => {
    setBlitzWords((prev) =>
      prev.map((w) => (w.lektionNumber === lektionNumber ? { ...w, isActive: true } : w))
    );
  };

  const handleDeactivateLektion = (lektionNumber: number) => {
    setBlitzWords((prev) =>
      prev.map((w) => (w.lektionNumber === lektionNumber ? { ...w, isActive: false } : w))
    );
  };

  // 10. Students Leaderboard Data (Contains ONLY Ahmadjon and newly added real students)
  const [students, setStudents] = useState<StudentLearner[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_students_v5');
      if (stored) {
        const parsed = JSON.parse(stored);
        const cleaned = parsed.filter(
          (s: StudentLearner) =>
            !['Madina Alimova', 'Jasur Karimov', 'Shahzod Boboyev', 'Zilola Rustamova', 'Otabek Yo\'ldoshev', 'Diyora Xamidova', 'Sardor Rahimov', 'Madina Karimova'].includes(s.name) &&
            !['st-1', 'st-2', 'st-3', 'st-4', 'st-5', 'st-6', 'acc-1', 'acc-2'].includes(s.id)
        );
        // Ensure Ahmadjon is always present at top with 0 initial points
        if (!cleaned.some((s: StudentLearner) => s.id === 'st-ahmadjon')) {
          return [INITIAL_STUDENTS[0], ...cleaned];
        }
        return cleaned;
      }
      return INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('worthub_students_v5', JSON.stringify(students));
  }, [students]);

  // One-time score and activity reset to 0 as requested by Ahmadjon:
  // "meni ballarimni 0 qilib qo'y keyin... faollikni ham 0 ga tushir"
  // Points are strictly earned ONLY through answering words and exercises correctly!
  useEffect(() => {
    const hasReset = localStorage.getItem('worthub_scores_reset_zero_v5');
    if (!hasReset) {
      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          xpPoints: 0,
          wordsLearned: 0,
          streakDays: 0,
        }))
      );
      setRegisteredUsers((prev) =>
        prev.map((u) => ({
          ...u,
          xpPoints: 0,
          wordsLearned: 0,
        }))
      );
      setCurrentUser((prev) => (prev ? { ...prev, xpPoints: 0, wordsLearned: 0 } : null));
      localStorage.setItem('worthub_scores_reset_zero_v5', 'true');
    }
  }, []);

  // 11. Modals State
  const [selectedGermanWord, setSelectedGermanWord] = useState<GermanWordEntry | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'add-user' | 'user-list' | 'sessions' | 'applications' | 'telegram' | 'add-word' | 'word-list' | 'blitz-schedule'>('add-user');
  const [isAIToolOpen, setIsAIToolOpen] = useState<boolean>(false);

  // Apply dark mode class to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('worthub_theme', theme);
  }, [theme]);

  // Handlers
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleAlphabet = () => setAlphabet((prev) => (prev === 'latin' ? 'cyrillic' : 'latin'));

  // Word CRUD: Synchronized with central server database
  const handleAddGermanWord = async (newWord: GermanWordEntry) => {
    setGermanWords((prev) => [newWord, ...prev.filter((w) => w.id !== newWord.id && w.german.toLowerCase() !== newWord.german.toLowerCase())]);
    try {
      await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord),
      });
    } catch {
      // offline fallback
    }
  };

  const handleDeleteGermanWord = async (id: string) => {
    setGermanWords((prev) => prev.filter((w) => w.id !== id));
    try {
      await fetch(`/api/words/${id}`, { method: 'DELETE' });
    } catch {
      // offline fallback
    }
  };

  const handleResetDudenWords = async () => {
    try {
      const res = await fetch('/api/words/reset-duden', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.words && Array.isArray(data.words)) {
          setGermanWords(data.words);
          localStorage.setItem('worthub_german_words_v5', JSON.stringify(data.words));
        }
      }
    } catch {
      setGermanWords(INITIAL_GERMAN_WORDS);
      localStorage.setItem('worthub_german_words_v5', JSON.stringify(INITIAL_GERMAN_WORDS));
    }
  };

  // User Accounts CRUD: When admin adds a user, they are IMMEDIATELY added to registeredUsers AND the leaderboard!
  const handleAddUserAccount = async (account: UserAccount) => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });
    } catch {
      // offline fallback
    }

    setRegisteredUsers((prev) => [account, ...prev.filter((u) => u.username !== account.username)]);
    
    // Add to leaderboard students list with 0 XP initially (earned only through real game exercise solving)
    const newStudent: StudentLearner = {
      id: account.id,
      name: account.name,
      level: account.level,
      wordsLearned: 0,
      xpPoints: 0,
      streakDays: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      badge: account.role === 'admin' ? 'Boshqaruvchi' : 'O\'quvchi'
    };
    setStudents((prev) => [newStudent, ...prev.filter((s) => s.id !== account.id)]);
  };

  const handleDeleteUserAccount = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
    } catch {
      // offline fallback
    }
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== id));
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateUserLevel = async (userId: string, newLevel: CEFRLevel) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, level: newLevel };
          fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
          }).catch(() => {});
          return updated;
        }
        return u;
      })
    );

    setStudents((prev) =>
      prev.map((s) => (s.id === userId ? { ...s, level: newLevel } : s))
    );

    if (currentUser?.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, level: newLevel } : null));
    }
  };

  // Application Handling
  const handleAddApplication = async (app: StudentApplication) => {
    setApplications((prev) => [app, ...prev]);
    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      fetchApplicationsFromServer();
    } catch {
      // offline fallback
    }
  };

  const handleApproveApplication = async (applicationId: string, account: UserAccount) => {
    try {
      await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
    } catch {
      // offline fallback
    }

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'approved' } : a))
    );
    handleAddUserAccount(account);
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      await fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
      });
    } catch {
      // offline fallback
    }
    setApplications((prev) => prev.filter((a) => a.id !== applicationId));
  };

  // Login handler with Telegram notification
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    // Send session event to server
    fetch('/api/sessions/login-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        device: navigator.userAgent.includes('Mobile') ? 'Mobil qurilma (Telefon)' : 'Kompyuter (Brauzer)'
      })
    }).catch(() => {});
  };

  // Logout handler with Telegram notification
  const handleLogout = () => {
    if (currentUser) {
      fetch('/api/sessions/logout-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          name: currentUser.name
        })
      }).catch(() => {});
    }
    setCurrentUser(null);
  };

  // STRICT ORGANIC XP EARNING:
  // Points are ONLY added when the student or teacher actually solves words & exercises correctly!
  const handleEarnXP = (points: number, isNewWord: boolean = false) => {
    if (!currentUser) return;

    // 1. Update current logged-in user in state
    setCurrentUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        xpPoints: (prev.xpPoints || 0) + points,
        wordsLearned: isNewWord ? (prev.wordsLearned || 0) + 1 : (prev.wordsLearned || 0),
      };
    });

    // 2. Update student on leaderboard
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === currentUser.id || s.name.toLowerCase().includes(currentUser.name.toLowerCase())) {
          return {
            ...s,
            xpPoints: (s.xpPoints || 0) + points,
            wordsLearned: isNewWord ? (s.wordsLearned || 0) + 1 : (s.wordsLearned || 0),
            streakDays: Math.max(1, s.streakDays),
          };
        }
        return s;
      })
    );

    // 3. Update registeredUsers list
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id || u.username === currentUser.username) {
          const updated = {
            ...u,
            xpPoints: (u.xpPoints || 0) + points,
            wordsLearned: isNewWord ? (u.wordsLearned || 0) + 1 : (u.wordsLearned || 0),
          };
          // Persist to server in background
          fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
          }).catch(() => {});
          return updated;
        }
        return u;
      })
    );
  };

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin';

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setAdminInitialTab('add-user');
      setIsAdminOpen(true);
    }
  };

  const handleOpenAdminAddUser = () => {
    setAdminInitialTab('add-user');
    setIsAdminOpen(true);
  };

  // IF USER IS NOT LOGGED IN, RENDER AUTH PORTAL
  if (!currentUser) {
    return (
      <>
        {/* Kicked Alert Notice if student was removed by admin */}
        {kickedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Sessiya to'xtatildi
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {kickedNotice}
              </p>
              <button
                type="button"
                onClick={() => setKickedNotice('')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-xs text-stone-950 shadow-md cursor-pointer transition-all"
              >
                Tushundim
              </button>
            </div>
          </div>
        )}

        <AuthPortal
          onLogin={handleLogin}
          registeredUsers={registeredUsers}
          onAddApplication={handleAddApplication}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-amber-100 selection:text-amber-950 dark:selection:bg-amber-900 dark:selection:text-amber-100 transition-colors">
      {/* Navigation Bar */}
      <Navbar
        alphabet={alphabet}
        onToggleAlphabet={toggleAlphabet}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        savedWordsCount={0}
        onOpenBookmarks={() => {}}
        onOpenAITool={() => setIsAIToolOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        currentUser={currentUser}
        onLogout={handleLogout}
        pendingApplicationsCount={applications.filter((a) => a.status === 'pending').length}
        onOpenInstallApp={() => setIsInstallAppOpen(true)}
        onOpenAddUser={handleOpenAdminAddUser}
      />

      <main className="flex-1">
        {/* SECTION 1: GERMAN DICTIONARY (WÖRTERBUCH & QIDIRUV & MISOLLAR) */}
        {activeSection === 'german-dict' && (
          <GermanDictionarySection
            words={germanWords}
            onSelectWord={(w) => setSelectedGermanWord(w)}
            onOpenAIAnalysis={() => setIsAIToolOpen(true)}
            onOpenAddWord={handleOpenAdmin}
            onAddWord={handleAddGermanWord}
            isAdmin={isAdmin}
            userLevel={currentUser?.level || 'A1'}
          />
        )}

        {/* SECTION: BLITZ O'QUV MARKAZ SO'ZLARI (DUSHANBA, CHORSHANBA, JUMA & LEKTIONLAR) */}
        {activeSection === 'blitz-words' && (
          <BlitzWordsSection
            blitzWords={blitzWords}
            onToggleActive={handleToggleBlitzWord}
            onDeleteWord={handleDeleteBlitzWord}
            onOpenAdminSchedule={() => {
              setAdminInitialTab('blitz-schedule');
              setIsAdminOpen(true);
            }}
            onGoToGames={() => setActiveSection('games')}
            isAdmin={isAdmin}
          />
        )}

        {/* SECTION 2: GERMAN INTERACTIVE GAMES & GRAMMAR TRAINER */}
        {activeSection === 'games' && (
          <GameSection
            alphabet={alphabet}
            words={germanWords}
            blitzWords={blitzWords}
            onOpenAddWord={handleOpenAdmin}
            isAdmin={isAdmin}
            onEarnXP={handleEarnXP}
            userLevel={currentUser?.level || 'A1'}
          />
        )}

        {/* SECTION 3: BLITZ VIDEO & MULTIMEDIA LESSONS (IN-APP EMBEDDED PLAYER) */}
        {activeSection === 'lessons' && (
          <LessonsSection onEarnXP={handleEarnXP} />
        )}

        {/* SECTION 4: STUDENTS LEADERBOARD (O'QUVCHILAR REYTINGI: FAQAT REAL TO'PLANGAN BALLAR) */}
        {activeSection === 'leaderboard' && (
          <StudentsLeaderboard
            students={students}
            onOpenAddStudent={handleOpenAdminAddUser}
            onPracticeWords={() => setActiveSection('games')}
            onDeleteStudent={handleDeleteUserAccount}
            isAdmin={isAdmin}
          />
        )}
      </main>

      {/* German Word Detail Modal */}
      <GermanWordDetailModal
        word={selectedGermanWord}
        onClose={() => setSelectedGermanWord(null)}
        onOpenAIAnalysis={() => {
          setSelectedGermanWord(null);
          setIsAIToolOpen(true);
        }}
      />

      {/* Admin Panel Modal (ONLY ACCESSIBLE FOR ADMIN) */}
      {isAdmin && (
        <AdminPanelModal
          isOpen={isAdminOpen}
          initialTab={adminInitialTab}
          onClose={() => setIsAdminOpen(false)}
          onAddWord={handleAddGermanWord}
          onDeleteWord={handleDeleteGermanWord}
          onAddUserAccount={handleAddUserAccount}
          onDeleteUserAccount={handleDeleteUserAccount}
          onUpdateUserLevel={handleUpdateUserLevel}
          onApproveApplication={handleApproveApplication}
          onDeleteApplication={handleDeleteApplication}
          onResetDudenWords={handleResetDudenWords}
          words={germanWords}
          registeredUsers={registeredUsers}
          applications={applications}
          blitzWords={blitzWords}
          onAddBlitzWord={handleAddBlitzWord}
          onToggleBlitzWord={handleToggleBlitzWord}
          onDeleteBlitzWord={handleDeleteBlitzWord}
          onActivateLektion={handleActivateLektion}
          onDeactivateLektion={handleDeactivateLektion}
        />
      )}

      {/* Install PWA / App Modal */}
      <InstallAppModal
        isOpen={isInstallAppOpen}
        onClose={() => setIsInstallAppOpen(false)}
        deferredPrompt={deferredPrompt}
      />

      {/* AI Linguistic Analyzer Modal */}
      {isAIToolOpen && (
        <AILinguisticModal
          initialWord={null}
          alphabet={alphabet}
          onClose={() => setIsAIToolOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer 
        alphabet={alphabet} 
        onSelectSection={setActiveSection}
        onOpenInstallApp={() => setIsInstallAppOpen(true)}
      />
    </div>
  );
}
