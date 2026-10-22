import React, { useState, useEffect } from "react";
import { AppState } from "../types";
import { SpeechController } from "../utils/speech";
import { downloadStandaloneHtmlFile } from "../utils/standaloneExport";
import {
  getCurrentSupabaseUser,
  getLastSyncTimestamp,
  isSupabaseConfigured,
  loadProgressFromSupabase,
  saveProgressToSupabase,
  signInWithEmail,
  signOutSupabase,
  signUpWithEmail,
  SUPABASE_SQL_SETUP_SCRIPT,
} from "../lib/supabase";
import {
  AlertCircle,
  Check,
  Cloud,
  CloudDownload,
  CloudUpload,
  Copy,
  Download,
  FileText,
  Lock,
  LogIn,
  LogOut,
  Moon,
  RefreshCw,
  Settings,
  Sun,
  Upload,
  UserCheck,
  UserPlus,
  Volume2,
} from "lucide-react";

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
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(() => getLastSyncTimestamp());
  const [syncMessage, setSyncMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [showSqlBox, setShowSqlBox] = useState<boolean>(false);

  // Supabase Auth state (maps directly to public.user_progress.user_id)
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authEmailInput, setAuthEmailInput] = useState<string>("");
  const [authPasswordInput, setAuthPasswordInput] = useState<string>("");
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    const list = SpeechController.getVoices();
    setVoices(list);
  }, []);

  useEffect(() => {
    if (!supabaseReady) return;
    getCurrentSupabaseUser().then((u) => {
      if (u) {
        setUserEmail(u.email || null);
        setUserId(u.id);
      }
    });
  }, [supabaseReady]);

  const handleTestSpeech = () => {
    SpeechController.speak("Hello! Welcome to your American English learning platform.", {
      voiceURI: state.settings.voiceURI,
      rate: state.settings.speechRate,
    });
  };

  const handleCloudPush = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    const res = await saveProgressToSupabase(state);
    setIsSyncing(false);

    if (res.ok) {
      setLastSyncAt(res.syncedAt || new Date().toISOString());
      setSyncMessage({
        type: "ok",
        text: "Barcha natijalar Supabase (user_progress.data) jadvaliga muvaffaqiyatli saqlandi!",
      });
    } else {
      setSyncMessage({
        type: "err",
        text: `Xatolik: ${res.error}`,
      });
    }
  };

  const handleCloudPull = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    const res = await loadProgressFromSupabase();
    setIsSyncing(false);

    if (res.ok && res.state) {
      onImportState(res.state);
      if (res.updatedAt) setLastSyncAt(res.updatedAt);
      setSyncMessage({
        type: "ok",
        text: "Natijalar Supabase (user_progress.data) jadvalidan muvaffaqiyatli yuklab olindi!",
      });
    } else {
      setSyncMessage({
        type: "err",
        text: res.error || "Bulutdan yuklashda xatolik yuz berdi.",
      });
    }
  };

  const handleEmailSignIn = async () => {
    if (!authEmailInput.trim() || !authPasswordInput.trim()) {
      setSyncMessage({ type: "err", text: "Email va parolni kiriting." });
      return;
    }
    setIsAuthLoading(true);
    setSyncMessage(null);
    const { user, error } = await signInWithEmail(authEmailInput.trim(), authPasswordInput);
    setIsAuthLoading(false);
    if (error || !user) {
      setSyncMessage({ type: "err", text: error || "Kirishda xatolik" });
      return;
    }
    setUserEmail(user.email || authEmailInput.trim());
    setUserId(user.id);
    setAuthPasswordInput("");

    const pulled = await loadProgressFromSupabase();
    if (pulled.ok && pulled.state) {
      onImportState(pulled.state);
      if (pulled.updatedAt) setLastSyncAt(pulled.updatedAt);
      setSyncMessage({
        type: "ok",
        text: "Hisobingizga kirdingiz va user_progress jadvalidagi natijalaringiz tiklandi!",
      });
    } else {
      const pushed = await saveProgressToSupabase(state);
      if (pushed.ok && pushed.syncedAt) setLastSyncAt(pushed.syncedAt);
      setSyncMessage({
        type: "ok",
        text: "Hisobingizga kirdingiz va joriy natijalaringiz user_progress jadvaliga yozildi!",
      });
    }
  };

  const handleEmailSignUp = async () => {
    if (!authEmailInput.trim() || !authPasswordInput.trim()) {
      setSyncMessage({ type: "err", text: "Email va parolni kiriting (kamida 6 ta belgi)." });
      return;
    }
    setIsAuthLoading(true);
    setSyncMessage(null);
    const { user, needsEmailConfirmation, error } = await signUpWithEmail(
      authEmailInput.trim(),
      authPasswordInput
    );
    setIsAuthLoading(false);
    if (error) {
      setSyncMessage({ type: "err", text: error });
      return;
    }
    if (needsEmailConfirmation) {
      setSyncMessage({
        type: "ok",
        text: "Ro'yxatdan o'tdingiz! Email pochtangizga tasdiqlash xati yuborildi — xatdagi havolani bosib tasdiqlang va so'ng 'Kirish' tugmasini bosing (yoki Supabase'da Authentication → Providers → Email ichidan 'Confirm email' ni o'chirib qo'ying).",
      });
      return;
    }
    if (user) {
      setUserEmail(user.email || authEmailInput.trim());
      setUserId(user.id);
      setAuthPasswordInput("");
      const pushed = await saveProgressToSupabase(state);
      if (pushed.ok && pushed.syncedAt) setLastSyncAt(pushed.syncedAt);
      setSyncMessage({
        type: "ok",
        text: "Ro'yxatdan o'tdingiz va natijalaringiz Supabase user_progress jadvaliga saqlandi!",
      });
    }
  };

  const handleSignOut = async () => {
    await signOutSupabase();
    setUserEmail(null);
    setUserId(null);
    setSyncMessage({ type: "ok", text: "Supabase hisobidan chiqildi." });
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    } catch {
      setShowSqlBox(true);
    }
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
          setSyncMessage({ type: "err", text: "Noto'g'ri JSON fayl tanlandi!" });
          return;
        }
        onImportState(parsed);
        setSyncMessage({ type: "ok", text: "JSON zaxira muvaffaqiyatli tiklandi!" });
      } catch {
        setSyncMessage({ type: "err", text: "Faylni o'qishda xatolik yuz berdi." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetConfirm = () => {
    if (
      confirm(
        "Haqiqatan ham barcha 150 kunlik natijalar, streak va xatolar daftari tozalanib, noldan boshlansinmi? Bu amalni qaytarib bo'lmaydi."
      )
    ) {
      onResetProgress();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-600" />
            Ilova Sozlamalari va Bulutli Saqlash
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supabase (<code>public.user_progress</code>), ovoz, mavzu va zaxira nusxa.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          Yopish
        </button>
      </div>

      {/* Supabase Cloud Sync Section */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cloud className="w-4 h-4 text-emerald-600" />
              Supabase Bulutli Sinxronizatsiya (<code>user_progress</code>)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Jadval ustunlari: <code>user_id (uuid)</code>, <code>data (jsonb)</code>,{" "}
              <code>updated_at (timestamptz)</code>. Har bir o'zgarish avtomatik saqlanadi.
            </p>
          </div>

          <button
            onClick={() => setShowSqlBox((v) => !v)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            {showSqlBox ? "SQL kodni yashirish" : "Jadval SQL kodi"}
          </button>
        </div>

        {!supabaseReady && (
          <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              Supabase API kalitlari (Environment Variables) kiritilmagan
            </div>
            <p className="leading-relaxed">
              Supabase oynangizning yuqorisidagi <strong>Connect</strong> tugmasidan (yoki{" "}
              <strong>Project Settings → API</strong> bo'limidan) Project URL va Anon Public Key
              qiymatlarini olib, AI Studio muhit o'zgaruvchilariga (Secrets) quyidagicha kiriting:
            </p>
            <ul className="list-disc list-inside font-mono text-[11px] space-y-0.5">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_ANON_KEY</li>
            </ul>
          </div>
        )}

        {showSqlBox && (
          <div className="bg-slate-900 text-slate-100 rounded-lg p-3.5 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold">
                public.user_progress jadvali (user_id, data, updated_at):
              </span>
              <button
                onClick={handleCopySql}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold flex items-center gap-1"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSql ? "Nusxalandi!" : "SQL kodni nusxalash"}
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] text-emerald-300 font-mono leading-relaxed max-h-48">
              {SUPABASE_SQL_SETUP_SCRIPT}
            </pre>
          </div>
        )}

        {/* Email & Password Auth + Cloud Push/Pull */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5 text-sky-600" />
              1-qadam: Supabase Hisob (Email va Parol)
            </label>

            {userId ? (
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                    <UserCheck className="w-4 h-4" />
                    Faol foydalanuvchi
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 break-all">
                    Email: <strong>{userEmail || "ulangan"}</strong>
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5 break-all">
                    user_id: {userId}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Hisobdan chiqish
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="email"
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="Email manzilingiz"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <input
                  type="password"
                  value={authPasswordInput}
                  onChange={(e) => setAuthPasswordInput(e.target.value)}
                  placeholder="Parol (kamida 6 ta belgi)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <div className="flex gap-2 pt-0.5">
                  <button
                    onClick={handleEmailSignIn}
                    disabled={isAuthLoading || !supabaseReady}
                    className="flex-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Kirish
                  </button>
                  <button
                    onClick={handleEmailSignUp}
                    disabled={isAuthLoading || !supabaseReady}
                    className="flex-1 px-3 py-1.5 border border-sky-600 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 disabled:opacity-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Ro'yxatdan o'tish
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <CloudUpload className="w-3.5 h-3.5 text-emerald-600" />
                2-qadam: Sinxronizatsiya boshqaruvi
              </label>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Hisobingizga kirganingizdan so'ng har bir dars, test va SRS natijalari avtomatik{" "}
                <code>user_progress</code> jadvaliga yoziladi. Shuningdek, qo'lda yuborish yoki
                qayta yuklab olishingiz mumkin:
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleCloudPush}
                disabled={isSyncing || !supabaseReady || !userId}
                className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <CloudUpload className="w-3.5 h-3.5" />
                Bulutga saqlash
              </button>
              <button
                onClick={handleCloudPull}
                disabled={isSyncing || !supabaseReady || !userId}
                className="flex-1 px-3 py-2 border border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 disabled:opacity-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <CloudDownload className="w-3.5 h-3.5" />
                Bulutdan yuklash
              </button>
            </div>
          </div>
        </div>

        {lastSyncAt && (
          <p className="text-[11px] text-slate-400">
            Oxirgi bulutli sinxronizatsiya: {new Date(lastSyncAt).toLocaleString("uz-UZ")}
          </p>
        )}

        {syncMessage && (
          <div
            className={`p-3 rounded-lg text-xs font-medium ${
              syncMessage.type === "ok"
                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                : "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800"
            }`}
          >
            {syncMessage.text}
          </div>
        )}
      </div>

      {/* Offline Backup Notice */}
      <div className="bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl p-5">
        <h2 className="text-xs font-bold text-sky-950 dark:text-sky-200 mb-1">
          Oflayn JSON va HTML zaxira nusxa
        </h2>
        <p className="text-xs text-sky-900 dark:text-sky-300 leading-relaxed mb-4">
          Internet bo'lmaganda ham barcha natijalaringiz brauzerning ichki xotirasida (
          <strong>localStorage</strong>) saqlanadi va quyidagi tugmalar orqali fayl sifatida yuklab
          olinishi mumkin.
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
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportJson}
              className="hidden"
            />
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
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">Mavzu (Theme)</h2>
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
            <label className="text-[11px] text-slate-400 block mb-1">
              Ovoz tanlovi (en-US):
            </label>
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
              Bu rejim yoqilganda barcha 150 ta darslar va imtihonlar oldingi kunlarni kutmasdan
              darhol ochiladi. U mavzularni ko'zdan kechirish uchun qulay bo'lib, avvalgi
              tugallangan kunlar va streak tarixini buzmaydi.
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
            {state.settings.ownerUnlockMode
              ? "Qulflarni qayta yoqish"
              : "Barcha qulflarni ochish"}
          </button>
        </div>
      </div>

      {/* Danger Zone: Full Reset */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/60 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-rose-600">Natijalarni to'liq tozalash</h2>
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
