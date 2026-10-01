import React from 'react';
import { GermanWordEntry } from '../types';
import { X, Volume2, Sparkles, BookOpen, Quote, Layers, Check, Share2 } from 'lucide-react';

interface GermanWordDetailModalProps {
  word: GermanWordEntry | null;
  onClose: () => void;
  onOpenAIAnalysis: (word: GermanWordEntry) => void;
}

export const GermanWordDetailModal: React.FC<GermanWordDetailModalProps> = ({
  word,
  onClose,
  onOpenAIAnalysis,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!word) return null;

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = word.article !== 'none' ? `${word.article} ${word.german}` : word.german;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = async () => {
    const textToShare = `${word.article !== 'none' ? word.article + ' ' : ''}${word.german} [${word.pronunciationIPA}] — ${word.meaningUz}\n(Manba: worthub.uz)`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              {word.article !== 'none' && (
                <span className="text-sm font-mono font-bold px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 uppercase">
                  {word.article}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {word.german}
              </h2>
              <button
                onClick={handleSpeak}
                className="p-2 rounded-full text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                title="Talaffuzni tinglash"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Pronunciation & level line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
              <span className="font-bold text-stone-700 dark:text-stone-300">IPA: {word.pronunciationIPA}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-sans font-medium">
                O'qilishi: «{word.pronunciationUz}»
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{word.partOfSpeechUz}</span>
              <span aria-hidden="true">·</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                Daraja: {word.level}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
              title="Nusxa olish va ulashish"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Meaning Card */}
          <section className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 rounded-xl p-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-1">
              O'zbekcha ma'nosi va tarjimasi
            </h4>
            <p className="text-base text-stone-900 dark:text-stone-100 font-sans leading-relaxed">
              {word.meaningUz}
            </p>
            {word.plural && word.plural !== '—' && (
              <div className="mt-2 text-xs font-mono text-stone-600 dark:text-stone-400">
                <strong>Ko'plik shakli:</strong> {word.plural}
              </div>
            )}
          </section>

          {/* German Examples with direct Uzbek translation underneath */}
          {word.examples && word.examples.length > 0 && (
            <section className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Misollar va o'zbekcha tarjimalari ({word.examples.length} ta)</span>
              </h4>

              <div className="space-y-3">
                {word.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-stone-50/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs mt-0.5">
                        DE:
                      </span>
                      <p className="font-serif text-base text-stone-900 dark:text-stone-100 leading-snug">
                        {ex.german}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 pl-6 pt-1 border-t border-stone-200/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-sm">
                      <span className="text-stone-400 dark:text-stone-500 font-bold font-mono text-xs mt-0.5">
                        UZ:
                      </span>
                      <p className="italic">
                        {ex.uzbek}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Grammar & Usage Notes */}
          {word.grammarNotes && (
            <section className="border-t border-stone-200 dark:border-stone-800 pt-5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Grammatik qoidalar va eslatmalar</span>
              </h4>
              <div className="p-3.5 bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {word.grammarNotes}
              </div>
            </section>
          )}

          {/* Synonyms & Antonyms */}
          <section className="border-t border-stone-200 dark:border-stone-800 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2">
                  Sinonimlar (Nemischa)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.synonyms.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-md border border-stone-200 dark:border-stone-700 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {word.antonyms && word.antonyms.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mb-2">
                  Antonimlar (Nemischa)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.antonyms.map((a, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-md border border-stone-200 dark:border-stone-700 font-mono"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Duden va Goethe-Institut leksik standartlari asosida
          </span>

          <button
            onClick={() => onOpenAIAnalysis(word)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI chuqur tahlili</span>
          </button>
        </div>
      </div>
    </div>
  );
};
