import React, { useState, useEffect, useRef } from "react";
import {
  SpeechRecognitionService,
  SpeechRecognitionResult,
} from "../utils/speechRecognition";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Mic,
  MicOff,
  Radio,
  RefreshCw,
  Volume2,
  X,
  XCircle,
} from "lucide-react";

interface MicrophoneDiagnosticModalProps {
  onClose: () => void;
}

export const MicrophoneDiagnosticModal: React.FC<MicrophoneDiagnosticModalProps> = ({
  onClose,
}) => {
  const browserInfo = SpeechRecognitionService.getBrowserInfo();
  const [activeTab, setActiveTab] = useState<"test" | "guide">("test");

  // Volume meter state
  const [isTestingVolume, setIsTestingVolume] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [volumeError, setVolumeError] = useState<string | null>(null);
  const volumeStopperRef = useRef<(() => void) | null>(null);

  // Speech recognition test state
  const [isTestingSpeech, setIsTestingSpeech] = useState<boolean>(false);
  const [interimSpeech, setInterimSpeech] = useState<string>("");
  const [speechResult, setSpeechResult] = useState<SpeechRecognitionResult | null>(
    null
  );
  const [speechError, setSpeechError] = useState<string | null>(null);
  const speechStopperRef = useRef<(() => void) | null>(null);

  // Permission test state
  const [permissionStatus, setPermissionStatus] = useState<
    "unknown" | "checking" | "granted" | "denied"
  >("unknown");
  const [permissionMsg, setPermissionMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check permission status if API available
    if (navigator?.permissions?.query) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((res) => {
          if (res.state === "granted") setPermissionStatus("granted");
          else if (res.state === "denied") setPermissionStatus("denied");
          else setPermissionStatus("unknown");
        })
        .catch(() => {});
    }

    return () => {
      // Cleanup any active tests on unmount
      if (volumeStopperRef.current) {
        volumeStopperRef.current();
        volumeStopperRef.current = null;
      }
      if (speechStopperRef.current) {
        speechStopperRef.current();
        speechStopperRef.current = null;
      }
    };
  }, []);

  const handleRequestPermission = async () => {
    setPermissionStatus("checking");
    setPermissionMsg(null);
    const res = await SpeechRecognitionService.requestPermission();
    if (res.granted) {
      setPermissionStatus("granted");
      setPermissionMsg("Mikrofon ruxsati muvaffaqiyatli berildi!");
    } else {
      setPermissionStatus("denied");
      setPermissionMsg(res.error || "Ruxsat berilmadi.");
    }
  };

  const handleToggleVolumeTest = async () => {
    if (isTestingVolume) {
      if (volumeStopperRef.current) {
        volumeStopperRef.current();
        volumeStopperRef.current = null;
      }
      setIsTestingVolume(false);
      setVolumeLevel(0);
      return;
    }

    setVolumeError(null);
    setIsTestingVolume(true);
    const runner = await SpeechRecognitionService.testMicrophoneAudioLevel(
      (lvl) => {
        setVolumeLevel(lvl);
      }
    );

    if (runner.error) {
      setVolumeError(runner.error);
      setIsTestingVolume(false);
      return;
    }

    volumeStopperRef.current = runner.stop;
  };

  const handleStartSpeechTest = () => {
    if (isTestingSpeech) {
      if (speechStopperRef.current) {
        speechStopperRef.current();
        speechStopperRef.current = null;
      }
      setIsTestingSpeech(false);
      return;
    }

    // Stop volume test to avoid conflict
    if (volumeStopperRef.current) {
      volumeStopperRef.current();
      volumeStopperRef.current = null;
      setIsTestingVolume(false);
      setVolumeLevel(0);
    }

    setSpeechError(null);
    setSpeechResult(null);
    setInterimSpeech("");
    setIsTestingSpeech(true);

    const testTarget = "Hello, how are you?";
    const runner = SpeechRecognitionService.listenAndCheck(
      testTarget,
      (res) => {
        setSpeechResult(res);
        setIsTestingSpeech(false);
      },
      (err) => {
        setSpeechError(err);
        setIsTestingSpeech(false);
      },
      () => {},
      () => {
        setIsTestingSpeech(false);
      },
      (interim) => {
        setInterimSpeech(interim);
      }
    );

    speechStopperRef.current = runner.stop;
  };

  const openInNewTab = () => {
    try {
      window.open(window.location.href, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Mikrofon Diagnostikasi va Sozlamalari
              </h2>
              <p className="text-xs text-slate-500">
                Ovoz yozish va talaffuzni tekshirish tizimini sinab ko'ring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 pt-2 gap-4">
          <button
            onClick={() => setActiveTab("test")}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "test"
                ? "border-sky-600 text-sky-600 dark:text-sky-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Jonli Test (Sinab ko'rish)
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "guide"
                ? "border-sky-600 text-sky-600 dark:text-sky-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Qanday yoqish kerak? (Qo'llanma)
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Quick System Status Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Brauzer</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                {browserInfo.name}
                {browserInfo.hasSpeechRecognition ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 inline" />
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Web Speech API</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                {browserInfo.hasSpeechRecognition ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Qo'llab-quvvatlanadi
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">
                    Mavjud emas
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Oyna turi</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                {browserInfo.isIframe ? (
                  <span className="text-amber-600 dark:text-amber-400">
                    O'rnatilgan karkas (iFrame)
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Asosiy oyna (Tab)
                  </span>
                )}
              </div>
            </div>
          </div>

          {browserInfo.isIframe && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold">Eslatma:</span> Ilova hozirda kichik ko'rinish (iFrame)da ishlayapti. Ba'zi brauzerlar karkas ichida mikrofon ruxsatini cheklaydi. Agar mikrofon ishlamasa, yangi oynada to'liq ochish tavsiya etiladi.
              </div>
              <button
                onClick={openInNewTab}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Yangi oynada ochish
              </button>
            </div>
          )}

          {activeTab === "test" && (
            <div className="space-y-4">
              {/* Permission Request Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-sky-600" />
                    1-Qadam: Mikrofon Ruxsatini Olish
                  </div>
                  {permissionStatus === "granted" && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Ruxsat berilgan
                    </span>
                  )}
                  {permissionStatus === "denied" && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      Bloklangan
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Brauzer sizdan mikrofon ruxsatini so'rashi uchun ushbu tugmani bosing va ekranda chiqadigan oynadan <b>"Ruxsat berish" (Allow)</b> ni tanlang.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleRequestPermission}
                    disabled={permissionStatus === "checking"}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {permissionStatus === "checking"
                      ? "Tekshirilmoqda..."
                      : "Mikrofon ruxsatini so'rash"}
                  </button>
                  {permissionMsg && (
                    <span
                      className={`text-xs font-medium ${
                        permissionStatus === "granted"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {permissionMsg}
                    </span>
                  )}
                </div>
              </div>

              {/* Physical Volume Test Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-sky-600" />
                    2-Qadam: Ovoz To'lqini (Balandlik) Sinovi
                  </div>
                  <button
                    onClick={handleToggleVolumeTest}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isTestingVolume
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {isTestingVolume ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        Sinovni to'xtatish
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-sky-600" />
                        Ovozni eshitishni boshlash
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-500">
                  Mikrofonga gapiring yoki qarsak chaling. Pastdagi chiziq va to'lqin ko'tarilsa, mikrofoningiz qurilmaga ulangan va ovozni to'g'ri qabul qilyapti.
                </p>

                {volumeError && (
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-medium bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-800">
                    {volumeError}
                  </div>
                )}

                {/* Animated Level Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Ovoz darajasi</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {volumeLevel}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-75 ${
                        volumeLevel > 50
                          ? "bg-emerald-500"
                          : volumeLevel > 15
                          ? "bg-sky-500"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(2, volumeLevel))}%` }}
                    />
                  </div>
                  {isTestingVolume && (
                    <div className="text-[11px] text-center pt-1 font-medium">
                      {volumeLevel > 20 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mikrofon ovozingizni a'lo darajada qabul qilmoqda!
                        </span>
                      ) : (
                        <span className="text-slate-400 animate-pulse">
                          Mikrofonga gapiring (masalan: "One, two, three")...
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Speech Recognition Practice Test */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    3-Qadam: Ovozni Matnga Aylantirish Sinovi
                  </div>
                  <button
                    onClick={handleStartSpeechTest}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isTestingSpeech
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-sky-600 hover:bg-sky-700 text-white"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {isTestingSpeech ? "Eshitilmoqda... To'xtatish" : "Sinovni boshlash"}
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg text-xs space-y-1">
                  <div className="text-slate-500">Aytilishi kerak bo'lgan test gapi:</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    "Hello, how are you?"
                  </div>
                </div>

                {isTestingSpeech && (
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-200 space-y-1 animate-pulse">
                    <div className="font-bold flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-sky-600" />
                      Mikrofon eshitmoqda... Gapiring!
                    </div>
                    {interimSpeech && (
                      <div className="font-mono text-slate-900 dark:text-white bg-white/70 dark:bg-slate-900/70 p-2 rounded border border-sky-200 dark:border-sky-700">
                        Eshitilayotgan matn: "{interimSpeech}"
                      </div>
                    )}
                  </div>
                )}

                {speechError && (
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Xatolik:</span> {speechError}
                    </div>
                  </div>
                )}

                {speechResult && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Sinov muvaffaqiyatli o'tdi!
                    </div>
                    <div>
                      <span className="font-semibold">Aniqlangan matn:</span> "
                      {speechResult.transcript}"
                    </div>
                    <div>
                      <span className="font-semibold">Aniqlik darajasi:</span>{" "}
                      <span className="font-bold text-sm">
                        {speechResult.accuracyPct}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Google Chrome brauzerida mikrofonni yoqish (Kompyuter va Android)
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-400">
                  <li>
                    Brauzerning yuqori manzil satridagi sayt manzili oldidagi{" "}
                    <b>qulf (🔒) yoki sozlamalar (tune)</b> belgisini bosing.
                  </li>
                  <li>
                    Ochilgan menyudan <b>"Mikrofon" (Microphone)</b> bandini toping.
                  </li>
                  <li>
                    Holatni <b>"Ruxsat berish" (Allow)</b> ga o'zgartiring.
                  </li>
                  <li>
                    Sahifani yangilang (F5 yoki Qayta yuklash tugmasi).
                  </li>
                </ul>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  Apple Safari (iPhone / iPad / Mac) uchun
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-400">
                  <li>
                    Telefoningiz <b>Sozlamalari (Settings)</b> ga kiring.
                  </li>
                  <li>
                    Pastga tushib <b>Safari</b> ilovasini bosing.
                  </li>
                  <li>
                    "Settings for Websites" bo'limida <b>Microphone</b> bandini{" "}
                    <b>"Allow" (Ruxsat)</b> qilib belgilang.
                  </li>
                  <li>
                    Manzil satridagi <b>aA</b> belgisini bosib ham "Website Settings" orqali mikrofonni yoqish mumkin.
                  </li>
                </ul>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  Telegram yoki Instagram orqali ochilgan bo'lsa
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Telegram yoki ijtimoiy tarmoqlarning ichki brauzerlari mikrofonni ko'pincha bloklaydi. O'ng yuqori burchakdagi <b>uch nuqta (⋮)</b> belgisini bosib, <b>"Chrome'da ochish" (Open in Chrome)</b> yoki <b>"Safarida ochish"</b> tugmasini bosing.
                </p>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                    4
                  </span>
                  Internet aloqasi va Google Speech xizmati
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Chrome brauzerida nutqni aniqlash Google serverlari orqali amalga oshiriladi. Shu sababli qurilmangiz internetga ulangan bo'lishi lozim. Agar <b>VPN</b> yoki sekin proksi yoniq bo'lsa, Google Speech serveriga ulanishda "Tarmoq xatosi" bo'lishi mumkin. VPN-ni o'chirib qayta urinib ko'ring.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Muammo hal bo'lmadimi? Sahifani yangilab qayta urinib ko'ring.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
