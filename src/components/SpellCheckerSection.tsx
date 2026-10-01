import React, { useState, useMemo } from 'react';
import { AlphabetMode, SpellCheckError, TextStatistics } from '../types';
import { checkUzbekSpelling, autoCorrectText, calculateTextStatistics } from '../utils/spellcheck';
import { latinToCyrillic, cyrillicToLatin } from '../utils/transliterate';
import {
  CheckCircle2,
  AlertTriangle,
  Wand2,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRightLeft,
  FileText,
  Clock,
  Layers,
  BarChart2,
} from 'lucide-react';

interface SpellCheckerSectionProps {
  alphabet: AlphabetMode;
}

export const SpellCheckerSection: React.FC<SpellCheckerSectionProps> = ({ alphabet }) => {
  const [activeTab, setActiveTab] = useState<'spellcheck' | 'transliterate' | 'ai-polish'>('spellcheck');
  const [inputText, setInputText] = useState<string>(
    "Biz xammalarimiz shaxarga borib mashxur o'zbek allomalari haqidagi kitoblarni o'qiymiz. Bu juda qiziqq va baxo berib bo'lmas merosdir."
  );
  const [transliterateDirection, setTransliterateDirection] = useState<'latin-to-cyrillic' | 'cyrillic-to-latin'>('latin-to-cyrillic');
  const [copied, setCopied] = useState<boolean>(false);

  // AI Polish state
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{
    polishedText: string;
    changesCount: number;
    suggestions: string[];
    readabilityAssessment: string;
  } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Compute spellcheck errors
  const errors = useMemo(() => {
    return checkUzbekSpelling(inputText);
  }, [inputText]);

  // Compute statistics
  const stats: TextStatistics = useMemo(() => {
    return calculateTextStatistics(inputText);
  }, [inputText]);

  // Handle Transliteration
  const transliteratedText = useMemo(() => {
    if (transliterateDirection === 'latin-to-cyrillic') {
      return latinToCyrillic(inputText);
    } else {
      return cyrillicToLatin(inputText);
    }
  }, [inputText, transliterateDirection]);

  // Fix all errors automatically
  const handleAutoFixAll = () => {
    const fixed = autoCorrectText(inputText, errors);
    setInputText(fixed);
  };

  // Fix single error
  const handleFixSingle = (err: SpellCheckError) => {
    if (!err.suggestions[0]) return;
    const before = inputText.slice(0, err.index);
    const after = inputText.slice(err.index + err.word.length);
    setInputText(before + err.suggestions[0] + after);
  };

  // Copy output
  const handleCopy = async (textToCopy: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Call Gemini AI Polish
  const handleAIPolish = async () => {
    if (!inputText.trim()) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/polish-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, style: 'adabiy' }),
      });
      if (!res.ok) {
        throw new Error('Tahrirlash serverida xatolik yuz berdi');
      }
      const data = await res.json();
      setAiResult(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Tahrir qilishda xatolik ro'y berdi.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleInsertSample = (type: 'mistakes' | 'literature' | 'tech') => {
    if (type === 'mistakes') {
      setInputText(
        "Kuni kecha xursandchilik bilan yangi xarakat boshladik. Muxim masalalarni birma bir xal qilib, hushnud bo'ldik."
      );
    } else if (type === 'literature') {
      setInputText(
        "Har bir millatning saodati, ma'rifati va kelajagi uning yoshlari tafakkuri hamda ona tiliga bo'lgan muhabbatida namoyon bo'ladi."
      );
    } else {
      setInputText(
        "Sun'iy intellekt va mashinali o'rganish algoritmlari axborot texnologiyalari sohasida misli ko'rilmagan samaradorlikka olib kelmoqda."
      );
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-800">
            Imlo qoidalari & Transliteratsiya
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            O'zbek tili imlo tekshiruvi va matn tahriri
          </h2>
          <p className="text-sm text-stone-600 mt-1 font-sans">
            X va H farqlari, tutuq belgisi qoidalari, avtomatik tuzatish va Lotin-Kirill o'giruvchisi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg text-xs font-medium self-start md:self-auto">
          <button
            onClick={() => setActiveTab('spellcheck')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'spellcheck'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Imlo tekshiruvi ({errors.length})
          </button>
          <button
            onClick={() => setActiveTab('transliterate')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'transliterate'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Lotin ⇄ Kirill
          </button>
          <button
            onClick={() => setActiveTab('ai-polish')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'ai-polish'
                ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-700" />
            <span>AI tahrirchi</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Input / Editor */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden flex flex-col flex-1">
            {/* Editor Action Toolbar */}
            <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-medium">Namunalar:</span>
                <button
                  onClick={() => handleInsertSample('mistakes')}
                  className="text-stone-600 hover:text-emerald-800 underline underline-offset-2 cursor-pointer"
                >
                  Xatoliklar
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => handleInsertSample('literature')}
                  className="text-stone-600 hover:text-emerald-800 underline underline-offset-2 cursor-pointer"
                >
                  Badiiy
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => handleInsertSample('tech')}
                  className="text-stone-600 hover:text-emerald-800 underline underline-offset-2 cursor-pointer"
                >
                  IT
                </button>
              </div>

              <div className="flex items-center gap-2">
                {errors.length > 0 && activeTab === 'spellcheck' && (
                  <button
                    onClick={handleAutoFixAll}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Hammasini tuzatish ({errors.length})</span>
                  </button>
                )}
                <button
                  onClick={() => setInputText('')}
                  className="text-stone-500 hover:text-stone-800 text-xs px-2 py-1 rounded hover:bg-stone-100 transition-colors"
                >
                  Tozalash
                </button>
              </div>
            </div>

            {/* Main Textarea */}
            <div className="p-4 flex-1 min-h-[220px]">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Matningizni shu yerga yozing yoki nusxalab qo'ying..."
                className="w-full h-full min-h-[220px] resize-y text-stone-800 text-sm leading-relaxed focus:outline-none font-sans"
              />
            </div>

            {/* Bottom Editor Bar */}
            <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
              <div className="flex items-center gap-3">
                <span>{stats.wordCount} ta so'z</span>
                <span>·</span>
                <span>{stats.charCount} ta belgi</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(inputText)}
                  className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa olish'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transliteration Result Box if in Transliterate tab */}
          {activeTab === 'transliterate' && (
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
                  <span>
                    {transliterateDirection === 'latin-to-cyrillic'
                      ? "Kirill alifbosidagi natija (Ўзбек тили)"
                      : "Lotin alifbosidagi natija (O'zbek tili)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setTransliterateDirection(
                        transliterateDirection === 'latin-to-cyrillic'
                          ? 'cyrillic-to-latin'
                          : 'latin-to-cyrillic'
                      )
                    }
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-medium px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Yo'nalishni almashtirish ⇄
                  </button>
                  <button
                    onClick={() => handleCopy(transliteratedText)}
                    className="p-1 text-stone-500 hover:text-stone-800"
                    title="Nusxa olish"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg text-sm text-stone-800 font-sans leading-relaxed whitespace-pre-wrap select-all">
                {transliteratedText || 'Natija bu yerda chiqadi...'}
              </div>
            </div>
          )}

          {/* AI Polish View if in ai-polish tab */}
          {activeTab === 'ai-polish' && (
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span className="text-sm font-semibold text-stone-900">
                    Gemini AI Adabiy tahrirchi va uslub jilvasi
                  </span>
                </div>
                <button
                  onClick={handleAIPolish}
                  disabled={aiLoading || !inputText.trim()}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {aiLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  <span>{aiLoading ? 'Tahlil qilinmoqda...' : 'Matnni sayqallash'}</span>
                </button>
              </div>

              {aiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {aiError}
                </div>
              )}

              {aiResult ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/80 rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-emerald-900">
                        Sayqallangan adabiy matn:
                      </span>
                      <button
                        onClick={() => handleCopy(aiResult.polishedText)}
                        className="text-xs text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Nusxa olish</span>
                      </button>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed font-sans">
                      {aiResult.polishedText}
                    </p>
                  </div>

                  <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                    <span className="font-semibold text-stone-800">Xulosa:</span>{' '}
                    {aiResult.readabilityAssessment}
                  </div>

                  {aiResult.suggestions && aiResult.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                        Kiritilgan o'zgarishlar ({aiResult.suggestions.length} ta):
                      </h4>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {aiResult.suggestions.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic">
                  Matnni tahlil qilish uchun "Matnni sayqallash" tugmasini bosing. AI model matningizdagi uslubiy g'alizliklarni bartaraf etib, ravon adabiy tilga aylantirib beradi.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Error Highlights & Text Statistics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Error Diagnostics Panel */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                {errors.length === 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <h3 className="text-sm font-semibold text-stone-900">
                  {errors.length === 0 ? "Imlo xatolari topilmadi" : `${errors.length} ta ehtimoliy xato`}
                </h3>
              </div>
            </div>

            {errors.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-500">
                Matningizda hozircha imloviy nuqsonlar aniqlanmadi.
              </div>
            ) : (
              <div className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto mt-2">
                {errors.map((err, idx) => (
                  <div key={idx} className="py-2.5 first:pt-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-red-700 line-through bg-red-50 px-1.5 py-0.5 rounded">
                          {err.word}
                        </span>
                        <span className="mx-1.5 text-stone-400">→</span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {err.suggestions[0]}
                        </span>
                      </div>
                      <button
                        onClick={() => handleFixSingle(err)}
                        className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        Tuzatish
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      {err.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Text Analytics Panel */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-1.5 pb-3 border-b border-stone-100 text-xs font-semibold text-stone-700">
              <BarChart2 className="w-4 h-4 text-emerald-700" />
              <span>Matn ko'rsatkichlari (Statistika)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div className="p-2 bg-stone-50 rounded-lg">
                <div className="text-stone-400 text-[11px]">So'zlar soni</div>
                <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
                  {stats.wordCount}
                </div>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <div className="text-stone-400 text-[11px]">Belgilar (bo'sh joysiz)</div>
                <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
                  {stats.charCountNoSpaces}
                </div>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <div className="text-stone-400 text-[11px]">Gaplar soni</div>
                <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
                  {stats.sentenceCount}
                </div>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <div className="text-stone-400 text-[11px]">O'qish vaqti</div>
                <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
                  ~{stats.readingTimeMinutes} daq.
                </div>
              </div>
            </div>

            {/* Unli / Undosh nisbati */}
            <div className="mt-3 pt-3 border-t border-stone-100 text-xs space-y-1">
              <div className="flex justify-between text-stone-500">
                <span>Unlilar: {stats.vowelCount}</span>
                <span>Undoshlar: {stats.consonantCount}</span>
              </div>
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-600 h-full"
                  style={{
                    width: `${
                      stats.vowelCount + stats.consonantCount > 0
                        ? (stats.vowelCount / (stats.vowelCount + stats.consonantCount)) * 100
                        : 50
                    }%`,
                  }}
                  title="Unli harflar"
                />
                <div
                  className="bg-stone-400 h-full"
                  style={{
                    width: `${
                      stats.vowelCount + stats.consonantCount > 0
                        ? (stats.consonantCount / (stats.vowelCount + stats.consonantCount)) * 100
                        : 50
                    }%`,
                  }}
                  title="Undosh harflar"
                />
              </div>
            </div>

            {/* Most frequent words */}
            {stats.topWords.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  Ko'p takrorlangan so'zlar
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.topWords.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-xs font-mono"
                    >
                      {item.word} ({item.count})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
