// Web Speech Recognition & Audio Recording utility with word-level alignment

export type WordMatchStatus = "correct" | "close" | "wrong";

export interface WordAlignmentToken {
  displayWord: string;
  cleanWord: string;
  spokenWord: string | null;
  similarity: number;
  status: WordMatchStatus; // "correct" (green) | "close" (yellow) | "wrong" (red)
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  accuracyPct: number;
  isMatch: boolean;
  messageUz: string;
  words: WordAlignmentToken[];
  audioUrl?: string | null;
}

const CONTRACTION_MAP: Record<string, string> = {
  "i'm": "i am",
  "you're": "you are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "we're": "we are",
  "they're": "they are",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "won't": "will not",
  "can't": "cannot",
  "couldn't": "could not",
  "shouldn't": "should not",
  "wouldn't": "would not",
  "haven't": "have not",
  "hasn't": "has not",
  "i've": "i have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
  "i'll": "i will",
  "you'll": "you will",
  "he'll": "he will",
  "she'll": "she will",
  "we'll": "we will",
  "they'll": "they will",
  "i'd": "i would",
  "you'd": "you would",
  "what's": "what is",
  "where's": "where is",
  "who's": "who is",
  "how's": "how is",
  "that's": "that is",
  "there's": "there is",
  "let's": "let us",
};

const NUMBER_WORD_TO_DIGIT: Record<string, string> = {
  zero: "0",
  oh: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  eleven: "11",
  twelve: "12",
  thirteen: "13",
  fourteen: "14",
  fifteen: "15",
  sixteen: "16",
  seventeen: "17",
  eighteen: "18",
  nineteen: "19",
  twenty: "20",
  thirty: "30",
  forty: "40",
  fifty: "50",
  sixty: "60",
  seventy: "70",
  eighty: "80",
  ninety: "90",
  hundred: "100",
};

const DIGIT_TO_WORDS: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen",
  "20": "twenty",
  "28": "twenty eight",
  "29": "twenty nine",
  "30": "thirty",
  "32": "thirty two",
  "34": "thirty four",
  "40": "forty",
  "50": "fifty",
  "60": "sixty",
  "70": "seventy",
  "80": "eighty",
  "90": "ninety",
  "100": "one hundred",
  "305": "three oh five",
};

export class SpeechRecognitionService {
  private static activeRecognition: any = null;
  private static activeSessionId: number = 0;
  private static timeoutTimer: any = null;

  public static isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
  }

  public static getBrowserInfo(): {
    name: "Chrome" | "Safari" | "Edge" | "Firefox" | "Opera" | "Other";
    isIframe: boolean;
    hasSpeechRecognition: boolean;
    hasGetUserMedia: boolean;
  } {
    if (typeof window === "undefined") {
      return {
        name: "Other",
        isIframe: false,
        hasSpeechRecognition: false,
        hasGetUserMedia: false,
      };
    }

    const ua = navigator.userAgent;
    let name: "Chrome" | "Safari" | "Edge" | "Firefox" | "Opera" | "Other" = "Other";
    if (ua.includes("Edg/")) {
      name = "Edge";
    } else if (ua.includes("OPR/") || ua.includes("Opera")) {
      name = "Opera";
    } else if (ua.includes("Chrome") && !ua.includes("Edg/")) {
      name = "Chrome";
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
      name = "Safari";
    } else if (ua.includes("Firefox")) {
      name = "Firefox";
    }

    let isIframe = false;
    try {
      isIframe = window.self !== window.top;
    } catch {
      isIframe = true;
    }
    const hasSpeechRecognition = Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
    const hasGetUserMedia = Boolean(
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    );

    return {
      name,
      isIframe,
      hasSpeechRecognition,
      hasGetUserMedia,
    };
  }

  /**
   * Explicitly request microphone permission from browser
   */
  public static async requestPermission(): Promise<{
    granted: boolean;
    error?: string;
  }> {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return {
        granted: false,
        error: "Brauzeringizda mikrofon qurilmasiga to'g'ridan-to'g'ri kirish qo'llab-quvvatlanmaydi.",
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return { granted: true };
    } catch (err: any) {
      const name = err?.name || "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        return {
          granted: false,
          error:
            "Mikrofon ruxsati rad etildi. Brauzer sozlamalaridan mikrofonni yoqishingiz kerak.",
        };
      }
      if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        return {
          granted: false,
          error: "Qurilmangizda mikrofon topilmadi. Mikrofon ulanganligini tekshiring.",
        };
      }
      return {
        granted: false,
        error: `Mikrofonga ulanishda xatolik: ${err?.message || "Noma'lum xatolik"}`,
      };
    }
  }

  /**
   * Test physical microphone with a real-time volume level meter (0-100) using Web Audio API
   */
  public static async testMicrophoneAudioLevel(
    onVolume: (levelPct: number) => void
  ): Promise<{ stop: () => void; error?: string }> {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return {
        stop: () => {},
        error: "Brauzeringizda mikrofon testi qo'llab-quvvatlanmaydi.",
      };
    }

    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let animationFrameId: number | null = null;
    let isRunning = true;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContext = new AudioCtx();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const sample = () => {
        if (!isRunning) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        // Normalize 0-128 to 0-100 percentage
        const levelPct = Math.min(100, Math.round((avg / 64) * 100));
        onVolume(levelPct);
        animationFrameId = requestAnimationFrame(sample);
      };

      sample();

      return {
        stop: () => {
          isRunning = false;
          if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
          if (audioContext && audioContext.state !== "closed") {
            audioContext.close().catch(() => {});
          }
          if (stream) {
            stream.getTracks().forEach((t) => t.stop());
          }
          onVolume(0);
        },
      };
    } catch (err: any) {
      return {
        stop: () => {},
        error:
          err?.name === "NotAllowedError"
            ? "Mikrofon ruxsati berilmadi."
            : `Mikrofonni ishga tushirib bo'lmadi: ${err?.message || ""}`,
      };
    }
  }

  private static stopActiveRecognition(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.activeRecognition) {
      try {
        const r = this.activeRecognition;
        r.onstart = null;
        r.onerror = null;
        r.onend = null;
        r.onresult = null;
        r.onspeechstart = null;
        r.onspeechend = null;
        try {
          r.stop();
        } catch {
          r.abort();
        }
      } catch {
        // ignore
      }
      this.activeRecognition = null;
    }
  }

  /**
   * Standalone safe audio recording helper (independent of speech recognition)
   */
  public static async recordAudioClip(
    onStop: (audioUrl: string | null) => void,
    onError?: (err: string) => void
  ): Promise<{ stop: () => void }> {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      if (onError) onError("Brauzeringizda ovoz yozib olish (MediaRecorder) qo'llab-quvvatlanmaydi.");
      onStop(null);
      return { stop: () => {} };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (chunks.length > 0) {
          try {
            const blob = new Blob(chunks, { type: "audio/webm" });
            onStop(URL.createObjectURL(blob));
          } catch {
            onStop(null);
          }
        } else {
          onStop(null);
        }
      };

      recorder.start();

      return {
        stop: () => {
          try {
            if (recorder.state !== "inactive") recorder.stop();
          } catch {
            stream.getTracks().forEach((t) => t.stop());
            onStop(null);
          }
        },
      };
    } catch (err: any) {
      if (onError) onError(`Ovoz yozishda xatolik: ${err?.message || ""}`);
      onStop(null);
      return { stop: () => {} };
    }
  }

  /**
   * Main speech recognition listener with word-level accuracy checking.
   * Runs SpeechRecognition exclusively without conflicting getUserMedia hardware locks.
   * Fully rescues interim transcripts on mobile browsers when isFinal is delayed or omitted.
   */
  public static listenAndCheck(
    targetText: string,
    onResult: (res: SpeechRecognitionResult) => void,
    onError: (errMsg: string) => void,
    onStart?: () => void,
    onEnd?: () => void,
    onInterim?: (interimText: string) => void
  ): { stop: () => void } {
    if (typeof window === "undefined") {
      onError("Web Speech API mavjud emas.");
      return { stop: () => {} };
    }

    const SpeechRecClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecClass) {
      const isIframe = window.self !== window.top;
      onError(
        isIframe
          ? "Brauzeringizda yoki ushbu ichki oyna rejimida Web Speech Recognition qo'llab-quvvatlanmaydi. Iltimos, sahifani to'g'ridan-to'g'ri Chrome yoki Safari brauzerida to'liq oching."
          : "Brauzeringizda ovozni aniqlash (Web Speech Recognition) qo'llab-quvvatlanmaydi. Google Chrome, Microsoft Edge yoki Safari brauzeridan foydalaning."
      );
      return { stop: () => {} };
    }

    // Stop and clear any previous session cleanly
    this.stopActiveRecognition();

    const sessionId = ++this.activeSessionId;
    let resultDispatched = false;
    let userStopped = false;
    let interimAccumulated = "";
    let bestFinalAlternatives: { transcript: string; confidence: number }[] = [];

    // Create a pristine new instance for this recognition attempt
    let recog: any = null;
    try {
      recog = new SpeechRecClass();
    } catch (e: any) {
      onError("Ovoz tizimini ishga tushirib bo'lmadi: " + (e?.message || ""));
      return { stop: () => {} };
    }

    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = true; // Enables live feedback while speaking
    recog.maxAlternatives = 3;

    this.activeRecognition = recog;

    // Helper to evaluate and trigger onResult
    const dispatchEvaluation = (
      alternatives: { transcript: string; confidence: number }[]
    ) => {
      if (resultDispatched || sessionId !== this.activeSessionId) return;
      resultDispatched = true;

      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }

      // If targetText is empty (free speaking prompt mode)
      if (!targetText.trim()) {
        const top = alternatives[0] || { transcript: "", confidence: 0.85 };
        onResult({
          transcript: top.transcript,
          confidence: top.confidence,
          accuracyPct: top.transcript ? 100 : 0,
          isMatch: Boolean(top.transcript),
          messageUz: "Nutqingiz muvaffaqiyatli yozib olindi.",
          words: [],
          audioUrl: null,
        });
        return;
      }

      const evaluation = this.evaluateAlternatives(targetText, alternatives);
      onResult({
        ...evaluation,
        audioUrl: null,
      });
    };

    // Timeout safety: if 15 seconds pass without final result or error, stop cleanly
    this.timeoutTimer = setTimeout(() => {
      if (sessionId === this.activeSessionId && !resultDispatched) {
        try {
          recog.stop();
        } catch {}
      }
    }, 15000);

    recog.onstart = () => {
      if (sessionId !== this.activeSessionId) return;
      if (onStart) onStart();
    };

    recog.onerror = (event: any) => {
      if (sessionId !== this.activeSessionId) return;
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }

      const errType = event?.error;

      // If already dispatched, ignore further errors
      if (resultDispatched) {
        if (onEnd) onEnd();
        return;
      }

      // If session was aborted (user stopped or browser ended)
      if (errType === "aborted") {
        // If we gathered interim speech before abort, evaluate it!
        if (interimAccumulated.trim()) {
          dispatchEvaluation([
            { transcript: interimAccumulated.trim(), confidence: 0.85 },
          ]);
        }
        if (onEnd) onEnd();
        return;
      }

      // If no-speech was reported, check if we accumulated interim transcript before silence
      if (errType === "no-speech") {
        if (interimAccumulated.trim()) {
          dispatchEvaluation([
            { transcript: interimAccumulated.trim(), confidence: 0.85 },
          ]);
          if (onEnd) onEnd();
          return;
        }
        onError(
          "Ovoz eshitilmadi. Iltimos, mikrofonga yaqinroq, aniqroq va balandroq gapiring."
        );
        if (onEnd) onEnd();
        return;
      }

      let msg = "Ovozni aniqlashda xatolik yuz berdi.";
      if (errType === "not-allowed" || errType === "permission-denied") {
        msg =
          "Mikrofon ruxsati berilmadi. Brauzer manzil satridagi qulf (yoki mikrofon) belgisini bosing va mikrofon ruxsatini 'Ruxsat berish' (Allow) qilib qo'ying.";
      } else if (errType === "audio-capture") {
        msg =
          "Mikrofon qurilmasi topilmadi yoki boshqa ilova tomonidan band qilingan. Boshqa ilovalar mikrofonni ishlatmayotganligini tekshiring.";
      } else if (errType === "network") {
        msg =
          "Tarmoq xatosi: Brauzer ovozni matnga aylantirish uchun internet zarur (Google Speech API). Internet aloqasini tekshiring yoki VPN-ni o'chirib ko'ring.";
      } else if (errType === "service-not-allowed") {
        msg = "Brauzeringiz ovoz xizmatidan foydalanishni cheklab qo'ygan.";
      } else if (errType === "language-not-supported") {
        msg = "Ingliz tili (en-US) ovoz moduli brauzeringizda qo'llab-quvvatlanmadi.";
      }

      onError(msg);
      if (onEnd) onEnd();
    };

    recog.onresult = (event: any) => {
      if (sessionId !== this.activeSessionId) return;
      const results = event.results;
      if (!results || results.length === 0) return;

      let currentInterim = "";
      let finalFound = false;
      const currentFinalAlts: { transcript: string; confidence: number }[] = [];

      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (item.isFinal) {
          finalFound = true;
          for (let a = 0; a < item.length; a++) {
            const tr = (item[a].transcript || "").trim();
            if (tr) {
              currentFinalAlts.push({
                transcript: tr,
                confidence:
                  typeof item[a].confidence === "number"
                    ? item[a].confidence
                    : 0.85,
              });
            }
          }
        } else {
          currentInterim += (item[0]?.transcript || "") + " ";
        }
      }

      const trimmedInterim = currentInterim.trim();
      if (trimmedInterim) {
        interimAccumulated = trimmedInterim;
        if (onInterim) onInterim(trimmedInterim);
      }

      if (finalFound && currentFinalAlts.length > 0) {
        bestFinalAlternatives = currentFinalAlts;
        dispatchEvaluation(bestFinalAlternatives);
        try {
          recog.stop();
        } catch {}
      }
    };

    recog.onend = () => {
      if (sessionId !== this.activeSessionId) return;
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }

      // Mobile Chrome / Safari salvage:
      // If recognition ended without isFinal, but interim speech was heard, dispatch it now!
      if (!resultDispatched) {
        if (bestFinalAlternatives.length > 0) {
          dispatchEvaluation(bestFinalAlternatives);
        } else if (interimAccumulated.trim()) {
          dispatchEvaluation([
            { transcript: interimAccumulated.trim(), confidence: 0.85 },
          ]);
        } else if (!userStopped) {
          onError("Ovoz aniqlanmadi. Qayta urinib ko'ring va mikrofonga balandroq gapiring.");
        }
      }

      if (onEnd) onEnd();
    };

    try {
      recog.start();
    } catch (err: any) {
      console.warn("Speech recognition start failed:", err);
      onError(
        "Mikrofonni ishga tushirib bo'lmadi (" +
          (err?.name || "Xatolik") +
          "). Brauzer sahifasini yangilang yoki mikrofon ruxsatini tekshiring."
      );
    }

    return {
      stop: () => {
        if (sessionId === this.activeSessionId) {
          userStopped = true;
          // Calling stop() asks the browser to process any remaining audio buffer
          try {
            recog.stop();
          } catch {
            try {
              recog.abort();
            } catch {}
          }
        }
      },
    };
  }

  /**
   * Normalizes a single word token (removes punctuation, lowercases, normalizes numbers)
   */
  public static cleanToken(word: string): string {
    const cleaned = word
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
    if (NUMBER_WORD_TO_DIGIT[cleaned]) {
      return NUMBER_WORD_TO_DIGIT[cleaned];
    }
    return cleaned;
  }

  /**
   * Normalizes spoken text so contractions and compound numbers align with the target tokens
   */
  public static normalizeSpokenForTarget(
    spokenRaw: string,
    targetTokens: { displayWord: string; cleanWord: string }[]
  ): string[] {
    let text = spokenRaw
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[-–—]/g, " ")
      .replace(/[.,!?;:"()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) return [];

    const targetCleanList = targetTokens.map((t) => t.cleanWord);
    const targetJoined = " " + targetCleanList.join(" ") + " ";

    // Harmonize contractions to match whichever form the target sentence uses
    for (const [contracted, expanded] of Object.entries(CONTRACTION_MAP)) {
      if (targetJoined.includes(` ${contracted} `)) {
        const expRegex = new RegExp(`\\b${expanded}\\b`, "g");
        text = text.replace(expRegex, contracted);
      } else if (targetJoined.includes(` ${expanded} `)) {
        const conRegex = new RegExp(`\\b${contracted}\\b`, "g");
        text = text.replace(conRegex, expanded);
      } else {
        // Default: expand contraction if neither is explicitly matched
        const conRegex = new RegExp(`\\b${contracted}\\b`, "g");
        text = text.replace(conRegex, expanded);
      }
    }

    // Harmonize multi-word numbers if target has word form and browser returned digits (e.g., "28" -> "twenty eight")
    for (const [digit, wordForm] of Object.entries(DIGIT_TO_WORDS)) {
      if (targetJoined.includes(` ${wordForm} `)) {
        const digRegex = new RegExp(`\\b${digit}\\b`, "g");
        text = text.replace(digRegex, wordForm);
      }
    }

    return text
      .split(/\s+/)
      .map((w) => this.cleanToken(w))
      .filter(Boolean);
  }

  /**
   * Splits target sentence into display words + normalized comparison words
   */
  public static tokenizeTarget(
    targetText: string
  ): { displayWord: string; cleanWord: string }[] {
    // Split hyphenated words like "twenty-eight" or "three-oh-five" only if needed, or keep words natural:
    // Expanding hyphenated compound words into separate tokens makes word-by-word alignment with ASR much more accurate
    const rawTokens = targetText
      .trim()
      .replace(/[-–—]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    const result: { displayWord: string; cleanWord: string }[] = [];
    for (const token of rawTokens) {
      const clean = this.cleanToken(token);
      if (clean) {
        result.push({
          displayWord: token,
          cleanWord: clean,
        });
      }
    }
    return result;
  }

  /**
   * Computes similarity (0..100) between two normalized single words
   */
  public static wordSimilarity(w1: string, w2: string): number {
    if (!w1 || !w2) return 0;
    if (w1 === w2) return 100;

    // Check contraction equivalence
    if (CONTRACTION_MAP[w1] === w2 || CONTRACTION_MAP[w2] === w1) {
      return 100;
    }

    // Check number equivalence
    const n1 = NUMBER_WORD_TO_DIGIT[w1] || w1;
    const n2 = NUMBER_WORD_TO_DIGIT[w2] || w2;
    if (n1 === n2) return 100;

    // Levenshtein distance on characters
    const track = Array(w2.length + 1)
      .fill(null)
      .map(() => Array(w1.length + 1).fill(0));

    for (let i = 0; i <= w1.length; i++) track[0][i] = i;
    for (let j = 0; j <= w2.length; j++) track[j][0] = j;

    for (let j = 1; j <= w2.length; j++) {
      for (let i = 1; i <= w1.length; i++) {
        const cost = w1[i - 1] === w2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + cost
        );
      }
    }

    const distance = track[w2.length][w1.length];
    const maxLen = Math.max(w1.length, w2.length);
    return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  }

  /**
   * Aligns target words with spoken words using Dynamic Programming (Needleman-Wunsch)
   */
  public static alignWords(
    targetTokens: { displayWord: string; cleanWord: string }[],
    spokenWords: string[]
  ): WordAlignmentToken[] {
    const n = targetTokens.length;
    const m = spokenWords.length;

    if (n === 0) return [];
    if (m === 0) {
      return targetTokens.map((t) => ({
        displayWord: t.displayWord,
        cleanWord: t.cleanWord,
        spokenWord: null,
        similarity: 0,
        status: "wrong",
      }));
    }

    const GAP_PENALTY = -15;
    const dp: number[][] = Array(n + 1)
      .fill(null)
      .map(() => Array(m + 1).fill(0));
    const ptr: ("match" | "skip_target" | "skip_spoken")[][] = Array(n + 1)
      .fill(null)
      .map(() => Array(m + 1).fill("skip_target"));

    for (let i = 1; i <= n; i++) {
      dp[i][0] = i * GAP_PENALTY;
      ptr[i][0] = "skip_target";
    }
    for (let j = 1; j <= m; j++) {
      dp[0][j] = j * GAP_PENALTY;
      ptr[0][j] = "skip_spoken";
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const sim = this.wordSimilarity(targetTokens[i - 1].cleanWord, spokenWords[j - 1]);
        const matchScore = dp[i - 1][j - 1] + sim;
        const skipTargetScore = dp[i - 1][j] + GAP_PENALTY;
        const skipSpokenScore = dp[i][j - 1] + GAP_PENALTY;

        if (matchScore >= skipTargetScore && matchScore >= skipSpokenScore) {
          dp[i][j] = matchScore;
          ptr[i][j] = "match";
        } else if (skipTargetScore >= skipSpokenScore) {
          dp[i][j] = skipTargetScore;
          ptr[i][j] = "skip_target";
        } else {
          dp[i][j] = skipSpokenScore;
          ptr[i][j] = "skip_spoken";
        }
      }
    }

    // Backtrack to get alignment for each target token
    const aligned: WordAlignmentToken[] = new Array(n);
    let i = n;
    let j = m;

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && ptr[i][j] === "match") {
        const t = targetTokens[i - 1];
        const s = spokenWords[j - 1];
        const sim = this.wordSimilarity(t.cleanWord, s);
        const status: WordMatchStatus =
          sim >= 85 ? "correct" : sim >= 55 ? "close" : "wrong";

        aligned[i - 1] = {
          displayWord: t.displayWord,
          cleanWord: t.cleanWord,
          spokenWord: s,
          similarity: sim,
          status,
        };
        i--;
        j--;
      } else if (i > 0 && (j === 0 || ptr[i][j] === "skip_target")) {
        const t = targetTokens[i - 1];
        aligned[i - 1] = {
          displayWord: t.displayWord,
          cleanWord: t.cleanWord,
          spokenWord: null,
          similarity: 0,
          status: "wrong",
        };
        i--;
      } else {
        j--;
      }
    }

    return aligned;
  }

  /**
   * Evaluates all SpeechRecognition alternatives and returns the best word-level result
   */
  public static evaluateAlternatives(
    targetText: string,
    alternatives: { transcript: string; confidence: number }[]
  ): Omit<SpeechRecognitionResult, "audioUrl"> {
    const targetTokens = this.tokenizeTarget(targetText);
    if (targetTokens.length === 0) {
      return {
        transcript: alternatives[0]?.transcript || "",
        confidence: alternatives[0]?.confidence || 0,
        accuracyPct: 0,
        isMatch: false,
        messageUz: "Matn topilmadi.",
        words: [],
      };
    }

    let bestScore = -1;
    let bestTranscript = alternatives[0]?.transcript || "";
    let bestConfidence = alternatives[0]?.confidence || 0.85;
    let bestWords: WordAlignmentToken[] = [];

    for (const alt of alternatives) {
      const spokenWords = this.normalizeSpokenForTarget(alt.transcript, targetTokens);
      const aligned = this.alignWords(targetTokens, spokenWords);

      // Word-level average score, gently incorporating confidence
      const rawWordAvg =
        aligned.reduce((acc, w) => acc + w.similarity, 0) / aligned.length;
      const confFactor = alt.confidence > 0 ? 0.92 + 0.08 * alt.confidence : 1;
      const finalScore = Math.min(100, Math.round(rawWordAvg * confFactor));

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestTranscript = alt.transcript;
        bestConfidence = alt.confidence;
        bestWords = aligned;
      }
    }

    // Also check if any individual word marked "wrong" or "close" was recognized accurately in another alternative
    if (alternatives.length > 1 && bestWords.length > 0) {
      for (let idx = 0; idx < bestWords.length; idx++) {
        if (bestWords[idx].status !== "correct") {
          for (const alt of alternatives) {
            const spokenWords = this.normalizeSpokenForTarget(alt.transcript, targetTokens);
            const candidateAligned = this.alignWords(targetTokens, spokenWords);
            if (
              candidateAligned[idx] &&
              candidateAligned[idx].similarity > bestWords[idx].similarity
            ) {
              bestWords[idx] = candidateAligned[idx];
            }
          }
        }
      }
      // Recompute word-level score after multi-alternative rescue
      const rawWordAvg =
        bestWords.reduce((acc, w) => acc + w.similarity, 0) / bestWords.length;
      const confFactor = bestConfidence > 0 ? 0.92 + 0.08 * bestConfidence : 1;
      bestScore = Math.min(100, Math.round(rawWordAvg * confFactor));
    }

    const isMatch = bestScore >= 70;
    const wrongCount = bestWords.filter((w) => w.status === "wrong").length;
    const closeCount = bestWords.filter((w) => w.status === "close").length;

    let messageUz = "";
    if (bestScore >= 90 && wrongCount === 0) {
      messageUz = "A'lo darajada! Barcha so'zlar aniq va to'g'ri talaffuz qilindi.";
    } else if (bestScore >= 75) {
      messageUz =
        wrongCount > 0 || closeCount > 0
          ? "Yaxshi natija! Qizil yoki sariq rangdagi so'zlar ustiga bosib, ularni alohida mashq qiling."
          : "Yaxshi! Gap aniq tushunildi.";
    } else {
      messageUz =
        "Ba'zi so'zlar tushib qoldi yoki noaniq eshitildi. Namuna audioni (0.7x sekin rejimda) eshitib, qizil so'zlarni bittalab qayta aytib ko'ring.";
    }

    return {
      transcript: bestTranscript,
      confidence: bestConfidence,
      accuracyPct: Math.max(0, bestScore),
      isMatch,
      messageUz,
      words: bestWords,
    };
  }
}
