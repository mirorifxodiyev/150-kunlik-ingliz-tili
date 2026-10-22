import React, { useState } from "react";
import { AppState, SrsCard } from "../types";
import { processSrsCardReview } from "../utils/storage";
import { SpeechController } from "../utils/speech";
import { Check, RotateCcw, Volume2, X } from "lucide-react";

interface SrsReviewViewProps {
  state: AppState;
  onUpdateSrsCard: (updatedCard: SrsCard, remembered: boolean) => void;
  onBack: () => void;
}

export const SrsReviewView: React.FC<SrsReviewViewProps> = ({
  state,
  onUpdateSrsCard,
  onBack,
}) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const dueCards = state.srsCards.filter((c) => c.dueDate <= todayStr);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const currentCard = dueCards[currentIndex];

  const handleSpeak = (text: string) => {
    SpeechController.speak(text, {
      voiceURI: state.settings.voiceURI,
      rate: state.settings.speechRate,
    });
  };

  const handleReview = (remembered: boolean) => {
    if (!currentCard) return;
    const updated = processSrsCardReview(currentCard, remembered);
    onUpdateSrsCard(updated, remembered);
    setIsFlipped(false);
    if (currentIndex >= dueCards.length - 1) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-sky-600" />
            SRS Interval Takrorlash (Flashcards)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Bugun takrorlanishi kerak bo'lgan kartalar: <strong>{dueCards.length} ta</strong>
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          Yopish
        </button>
      </div>

      {dueCards.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto font-bold text-xl">
            ✓
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Bugungi barcha kartalar takrorlandi!
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Ajoyib natija! Yangi so'zlarni darslar davomida "SRS ga qo'shish" tugmasi orqali kiritib boring.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 min-h-[340px] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
            <span>Karta: {currentIndex + 1} / {dueCards.length}</span>
            <span>Oraliq: {currentCard.intervalDays} kun ({currentCard.repetitions} marta takrorlangan)</span>
          </div>

          {/* Flashcard body */}
          <div className="text-center my-auto space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentCard.front}
              </span>
              <button
                onClick={() => handleSpeak(currentCard.front)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-600"
                title="Tinglash"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {currentCard.ipa && (
              <div className="text-xs text-slate-400 font-mono">
                /{currentCard.ipa}/
              </div>
            )}

            {isFlipped ? (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400">
                  {currentCard.back}
                </div>
                {currentCard.example && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {currentCard.example}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-lg mt-4"
              >
                Javobni ko'rish (Aylantirish)
              </button>
            )}
          </div>

          {/* Bottom Actions */}
          {isFlipped && (
            <div className="flex gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleReview(false)}
                className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4" /> Eslay olmadim (+1 kun)
              </button>
              <button
                onClick={() => handleReview(true)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" /> Esladim (Keyingi oraliq)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
