import React, { useState, useEffect } from "react";
import { AppState } from "../types";
import { SpeechController } from "../utils/speech";
import { downloadStandaloneHtmlFile } from "../utils/standaloneExport";
import { Download, FileText, Lock, Moon, RefreshCw, Settings, Sun, Upload, Volume2 } from "lucide-react";

interface SettingsViewProps {
  state: AppState;
  onUpdateSettings: (newSettings: AppState["settings"]) => void;
  onImportState: (newState: AppState) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  state,
  onUpdateSettings,
  onImportState,
  onResetProgress,
  onBack,
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const list = SpeechController.getVoices();
    setVoices(list);
  }, []);

  const handleTestSpeech = () => {
    SpeechController.speak("Hello! Welcome to your American English learning platform.", {
      voiceURI: state.settings.voiceURI,
      rate: state.settings.speechRate,
    });
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eng150_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result || ""));
        if (!parsed || typeof parsed !== "object" || typeof parsed.schemaVersion !== "number") {
          alert("Noto'g'ri JSON fayl tanlandi!");
          return;
        }

        if (confirm("Diqqat! Ushbu faylni yuklash hozirgi barcha natijalaringizni almashtiradi. Davom etasizmi?")) {
          onImportState(parsed);
          alert("Muvaffaqiyatli tiklandi!");
        }
      } catch (err) {
        alert("Faylni o'qishda xatolik yuz berdi.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetConfirm = () => {
    if (confirm("Haqiqatan ham barcha 150 kunlik natijalar, streak va xatolar daftari tozalanib, noldan boshlansinmi? Bu amalni qaytarib bo'lmaydi.")) {
      onResetProgress();
      alert("Barcha natijalar tozalandi.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-600" />
            Ilova Sozlamalari va Zaxira Nusxa
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ovoz, mavzu, qulflar va ma'lumotlar xavfsizligi.
          </p>
        </div>
        <button onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white">
          Yopish
        </button>
      </div>

      {/* Offline Storage Notice */}
      <div className="bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl p-5">
        <h2 className="text-xs font-bold text-sky-950 dark:text-sky-200 mb-1">
          Muhim eslatma: Qurilmalararo sinxronizatsiya haqida
        </h2>
        <p className="text-xs text-sky-900 dark:text-sky-300 leading-relaxed mb-4">
          Ushbu platforma 100% oflayn ishlaydi va barcha natijalaringizni faqat sizning joriy brauzeringizning ichki xotirasida (<strong>localStorage</strong>) saqlaydi. 
          Shu sababli telefon va kompyuter o'rtasida avtomatik sinxronlanmaydi. Boshqa qurilmaga o'tkazish yoki natijalar yo'qolishining oldini olish uchun quyidagi <strong>JSON Zaxira</strong> tugmalaridan foydalaning.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            JSON Eksport (Zaxira yuklab olish)
          </button>

          <label className="px-4 py-2 border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 text-sky-900 dark:text-sky-200 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>JSON Import (Zaxiradan tiklash)</span>
            <input type="file" accept=".json,application/json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={() => downloadStandaloneHtmlFile(state)}
            className="px-4 py-2 border border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Bitta fayl (Oflayn HTML) yuklab olish
          </button>
        </div>
      </div>

      {/* Theme & Speech Voice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Theme */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">
            Mavzu (Theme)
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "light", label: "Yorug'", icon: Sun },
              { id: "dark", label: "Qorong'i", icon: Moon },
              { id: "system", label: "Tizim", icon: RefreshCw },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = state.settings.theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() =>
                    onUpdateSettings({ ...state.settings, theme: t.id as any })
                  }
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                    isSelected
                      ? "border-sky-600 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speech Voice & Speed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">
            Audio talaffuz (Web Speech API)
          </h2>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Ovoz tanlovi (en-US):</label>
            <select
              value={state.settings.voiceURI}
              onChange={(e) =>
                onUpdateSettings({ ...state.settings, voiceURI: e.target.value })
              }
              className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="">Avtomatik (AQSH ovozi afzal ko'riladi)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleTestSpeech}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> Ovozni sinab ko'rish
            </button>
            <button
              onClick={() => SpeechController.stop()}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              To'xtatish
            </button>
          </div>
        </div>
      </div>

      {/* Owner / Inspector Unlock Mode */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              Mustaqil rejim / Qulflarni ochish (Ko'rish va tekshirish uchun)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
              Bu rejim yoqilganda barcha 150 ta darslar va imtihonlar oldingi kunlarni kutmasdan darhol ochiladi. 
              U mavzularni ko'zdan kechirish uchun qulay bo'lib, avvalgi tugallangan kunlar va streak tarixini buzmaydi.
            </p>
          </div>

          <button
            onClick={() => {
              const nextVal = !state.settings.ownerUnlockMode;
              onUpdateSettings({ ...state.settings, ownerUnlockMode: nextVal });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              state.settings.ownerUnlockMode
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {state.settings.ownerUnlockMode ? "Qulflarni qayta yoqish" : "Barcha qulflarni ochish"}
          </button>
        </div>
      </div>

      {/* Danger Zone: Full Reset */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-rose-600">
            Natijalarni to'liq tozalash
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Barcha darslar progressi, test ballari, SRS va xatolar daftarini noldan boshlash.
          </p>
        </div>
        <button
          onClick={handleResetConfirm}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-bold transition-colors"
        >
          Progressni o'chirish
        </button>
      </div>
    </div>
  );
};
