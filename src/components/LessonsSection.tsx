import React, { useState, useMemo } from 'react';
import { VideoLesson, CEFRLevel, LessonExercise } from '../types';
import { BLITZ_LESSONS } from '../data/blitzLessons';
import { GermanFlagBadge } from './GermanFlagBadge';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Search, 
  BookOpen, 
  Volume2, 
  Sparkles, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft,
  RotateCcw,
  Lightbulb,
  Check,
  Award,
  HelpCircle,
  Puzzle,
  CheckSquare
} from 'lucide-react';

interface LessonsSectionProps {
  onEarnXP?: (points: number, isNewWord?: boolean) => void;
}

export const LessonsSection: React.FC<LessonsSectionProps> = ({ onEarnXP }) => {
  const [lessons] = useState<VideoLesson[]>(BLITZ_LESSONS);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(BLITZ_LESSONS[0].id);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Blackboard state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Interactive Exercises state for current lesson
  const [currentExIndex, setCurrentExIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [orderWords, setOrderWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [exerciseFeedback, setExerciseFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [exerciseScore, setExerciseScore] = useState<number>(0);
  
  // Track completed lessons in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('worthub_completed_lessons_v3');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const activeLesson = useMemo(() => {
    return lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  }, [lessons, selectedLessonId]);

  const exercises: LessonExercise[] = useMemo(() => {
    return activeLesson.exercises || [];
  }, [activeLesson]);

  const currentExercise = exercises[currentExIndex] || null;

  // Initialize order exercise words
  React.useEffect(() => {
    if (currentExercise && currentExercise.type === 'order' && currentExercise.wordsToOrder) {
      const shuffled = [...currentExercise.wordsToOrder].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setOrderWords([]);
      setSelectedAnswer(null);
      setExerciseFeedback(null);
    } else {
      setSelectedAnswer(null);
      setExerciseFeedback(null);
    }
  }, [currentExIndex, activeLesson.id]);

  // Audio pronunciation helper for vocabulary & lecture sentences
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMarkCompleted = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      localStorage.setItem('worthub_completed_lessons_v3', JSON.stringify(updated));
      onEarnXP?.(30, false);
    }
  };

  // Check Multiple Choice / Blank Exercise
  const handleCheckAnswer = (choice: string) => {
    if (!currentExercise || selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    if (choice === currentExercise.correctAnswer) {
      setExerciseFeedback('correct');
      setExerciseScore(s => s + 10);
      onEarnXP?.(10, false);
      speakGerman(currentExercise.germanSentence?.replace('___', choice) || choice);
    } else {
      setExerciseFeedback('wrong');
    }
  };

  // Check Sentence Order Exercise
  const handlePickOrderWord = (word: string, index: number) => {
    if (exerciseFeedback === 'correct') return;
    setOrderWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleUnpickOrderWord = (word: string, index: number) => {
    if (exerciseFeedback === 'correct') return;
    setOrderWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const handleCheckSentenceOrder = () => {
    if (!currentExercise) return;
    const formed = orderWords.join(' ');
    if (formed.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase()) {
      setExerciseFeedback('correct');
      setExerciseScore(s => s + 15);
      onEarnXP?.(15, false);
      speakGerman(currentExercise.correctAnswer);
    } else {
      setExerciseFeedback('wrong');
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex(c => c + 1);
    } else {
      // Completed all exercises for this lesson!
      handleMarkCompleted(activeLesson.id);
    }
  };

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      if (selectedLevel !== 'all' && l.level !== selectedLevel) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = l.title.toLowerCase().includes(q) || l.titleUz.toLowerCase().includes(q);
        const inDesc = l.description.toLowerCase().includes(q);
        const inTopics = l.keyTopics.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inTopics;
      }
      return true;
    });
  }, [lessons, selectedLevel, searchQuery]);

  const levelColor = (level: CEFRLevel) => {
    switch (level) {
      case 'A1': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'A2': return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300';
      case 'B1': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'B2': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'C1': return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300';
      case 'C2': return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const slides = activeLesson.interactiveSlides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0] || {
    title: activeLesson.title,
    germanText: activeLesson.description,
    uzbekText: activeLesson.titleUz,
    grammarNote: activeLesson.keyTopics.join('; ')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <GermanFlagBadge size="sm" />
          <span>Blitz O'quv Markazi Interaktiv Doskasi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Nemis tili interaktiv darslari (A1 dan C2 gacha)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Mavzularni virtual doskada o'rganing, jonli talaffuzni eshiting va qiziqarli mashqlar orqali bilimingizni mustahkamlang!
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-bold text-stone-500 mr-1 shrink-0">Daraja:</span>
          {['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                setSelectedLevel(lvl);
                const firstMatching = lessons.find(l => lvl === 'all' || l.level === lvl);
                if (firstMatching) {
                  setSelectedLessonId(firstMatching.id);
                  setCurrentSlideIndex(0);
                  setCurrentExIndex(0);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedLevel === lvl
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {lvl === 'all' ? 'Barcha darslar' : lvl}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Dars mavzusini qidirish..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main Studio View: Left Blackboard & Exercises, Right Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Blackboard & Exercises (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION 1: VIRTUAL TEACHER BLACKBOARD (INTERAKTIV DOSKA) */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#111e15] via-[#1a2f22] to-[#0f1b13] border-4 border-amber-900/50 shadow-2xl p-6 sm:p-8 text-white relative min-h-[400px] flex flex-col justify-between">
            {/* Blackboard Top Bar */}
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm" />
                <span className="text-xs font-mono font-bold text-emerald-400/90 ml-2 tracking-wider">
                  BLITZ DEUTSCH VIRTUAL O'QITUVCHI DOSKASI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakGerman(currentSlide.germanText)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors cursor-pointer border border-emerald-500/40"
                  title="Nemischa jumlani jonli eshitish"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-amber-400' : ''}`} />
                  <span>Ovozli eshitish</span>
                </button>
              </div>
            </div>

            {/* Blackboard Main Chalk Lecture */}
            <div className="py-6 space-y-4 my-auto">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentSlide.title}</span>
              </div>

              <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-100 leading-snug tracking-wide">
                {currentSlide.germanText}
              </div>

              <div className="text-sm sm:text-base text-stone-300 italic font-sans border-l-2 border-emerald-500/50 pl-3">
                O'zbekcha: «{currentSlide.uzbekText}»
              </div>

              {currentSlide.grammarNote && (
                <div className="p-4 rounded-2xl bg-black/50 border border-emerald-800/60 text-xs text-emerald-200/95 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Muhim grammatik qoida:</span>
                  </div>
                  <div className="leading-relaxed">{currentSlide.grammarNote}</div>
                </div>
              )}

              {currentSlide.tips && currentSlide.tips.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {currentSlide.tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-300 font-mono bg-white/5 p-2 rounded-xl">
                      <span className="text-emerald-400 font-bold">➤</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between border-t border-emerald-900/60 pt-3 text-xs">
              <button
                type="button"
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(p => Math.max(0, p - 1))}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white font-bold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Oldingi doska</span>
              </button>

              <div className="text-stone-400 font-mono text-[11px]">
                Doska: {currentSlideIndex + 1} / {slides.length}
              </div>

              <button
                type="button"
                disabled={currentSlideIndex === slides.length - 1}
                onClick={() => setCurrentSlideIndex(p => Math.min(slides.length - 1, p + 1))}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:pointer-events-none text-stone-950 font-bold flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <span>Keyingi doska</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION 2: QIZIQARLI INTERAKTIV MASHQLAR VA TESTLAR */}
          {exercises.length > 0 && currentExercise && (
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Puzzle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      Qiziqarli dars mashqi ({currentExIndex + 1}/{exercises.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">Mavzuni amalda sinab ko'ring</p>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                  Ball: +{exerciseScore} XP
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  {currentExercise.type === 'choice' && "Variantlardan to'g'risini tanlang:"}
                  {currentExercise.type === 'blank' && "Bo'sh joyga to'g'ri so'zni qo'ying:"}
                  {currentExercise.type === 'order' && "Nemischa so'zlarni to'g'ri tartibda tering:"}
                </div>
                <div className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  {currentExercise.questionUz}
                </div>
                {currentExercise.germanSentence && (
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-sm">
                    {currentExercise.germanSentence}
                  </div>
                )}
              </div>

              {/* Exercise Type 1 & 2: Multiple Choice or Blank Options */}
              {(currentExercise.type === 'choice' || currentExercise.type === 'blank') && currentExercise.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentExercise.options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === currentExercise.correctAnswer;
                    let btnClass = "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200";

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-sm";
                      } else if (isSelected && !isCorrect) {
                        btnClass = "bg-rose-500 text-white border-rose-600 font-bold";
                      } else {
                        btnClass = "opacity-50 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCheckAnswer(opt)}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {selectedAnswer !== null && isCorrect && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Exercise Type 3: Sentence Builder (Word Ordering) */}
              {currentExercise.type === 'order' && (
                <div className="space-y-4">
                  {/* Selected Words Dropzone */}
                  <div className="min-h-[50px] p-3 rounded-2xl bg-amber-50/50 dark:bg-stone-800/80 border-2 border-dashed border-amber-300 dark:border-stone-700 flex flex-wrap gap-2 items-center">
                    {orderWords.length === 0 ? (
                      <span className="text-xs text-stone-400 italic">Pastdagi so'zlarni ketma-ket bosing...</span>
                    ) : (
                      orderWords.map((word, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleUnpickOrderWord(word, idx)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-xs hover:bg-amber-400 transition-colors cursor-pointer"
                        >
                          {word} ✕
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Words Pool */}
                  <div className="flex flex-wrap gap-2">
                    {availableWords.map((word, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePickOrderWord(word, idx)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {orderWords.length > 0 && selectedAnswer === null && (
                    <button
                      type="button"
                      onClick={handleCheckSentenceOrder}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm cursor-pointer transition-all"
                    >
                      Tekshirish
                    </button>
                  )}
                </div>
              )}

              {/* Feedback and Next Exercise Button */}
              {exerciseFeedback && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                  exerciseFeedback === 'correct'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {exerciseFeedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>To'g'ri! Barakalla! 🎉</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-rose-600" />
                        <span>Xato javob berildi. Qoidani eslang!</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs">{currentExercise.explanation}</p>
                  
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleNextExercise}
                      className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {currentExIndex < exercises.length - 1 ? "Keyingi mashqqa o'tish ➔" : "Darsni yakunlash (+30 XP) ➔"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: LESSON META & VOCABULARY LIST */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${levelColor(activeLesson.level)}`}>
                    {activeLesson.level} BOSQICH
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeLesson.duration}</span>
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {activeLesson.titleUz}
                </h1>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {activeLesson.title}
                </div>
              </div>

              {/* Mark Completed Button */}
              <button
                type="button"
                onClick={() => handleMarkCompleted(activeLesson.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 ${
                  completedLessonIds.includes(activeLesson.id)
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedLessonIds.includes(activeLesson.id)
                    ? '✓ Dars tugatildi (+30 XP olindi)'
                    : 'Darsni tugatdim (+30 XP olish)'}
                </span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {activeLesson.description}
            </p>

            {/* Key Topics List */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Ushbu darsda o'rganiladigan asosiy qoidalar:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLesson.keyTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 text-xs text-stone-800 dark:text-stone-200 font-medium"
                  >
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Vocabulary Table with Live Audio */}
            {activeLesson.vocabularyList && activeLesson.vocabularyList.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Darsdagi muhim so'zlar va iboralar (Ovozli talaffuz):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeLesson.vocabularyList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span>{item.german}</span>
                        </div>
                        <div className="text-stone-600 dark:text-stone-400 text-[11px]">
                          {item.uzbek}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakGerman(item.german)}
                        className="p-2 rounded-lg bg-amber-200/60 dark:bg-stone-700 text-amber-900 dark:text-amber-300 hover:bg-amber-300 dark:hover:bg-stone-600 transition-colors cursor-pointer shrink-0"
                        title="Talaffuzini eshitish"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Blitz Lesson Syllabus (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Darslar Mundarijasi</span>
                </h3>
                <div className="text-[11px] text-stone-500">
                  Jami: {lessons.length} ta dars • {completedLessonIds.length} tasi yakunlangan
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {Math.round((completedLessonIds.length / lessons.length) * 100)}%
              </div>
            </div>

            {/* Playlist Cards */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isActive = lesson.id === activeLesson.id;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      setCurrentSlideIndex(0);
                      setCurrentExIndex(0);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isActive
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {isDone ? '✓' : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono border ${levelColor(lesson.level)}`}>
                          {lesson.level}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {lesson.duration}
                        </span>
                      </div>
                      <div className={`text-xs font-bold truncate ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-stone-900 dark:text-stone-100'}`}>
                        {lesson.titleUz}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                        {lesson.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
