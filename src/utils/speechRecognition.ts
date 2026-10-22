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
  private static mediaRecorder: MediaRecorder | null = null;
  private static mediaStream: MediaStream | null = null;
  private static audioChunks: Blob[] = [];
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

    const isIframe = window.self !== window.top;
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
        this.activeRecognition.onstart = null;
        this.activeRecognition.onerror = null;
        this.activeRecognition.onend = null;
        this.activeRecognition.onresult = null;
        this.activeRecognition.abort();
      } catch (e) {
        // ignore
      }
      this.activeRecognition = null;
    }
    this.stopAudioRecordingSync();
  }

  private static startSafeAudioRecording(sessionId: number): void {
    this.audioChunks = [];
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      return;
    }

    // Run getUserMedia asynchronously and non-blockingly so it never crashes SpeechRecognition
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (sessionId !== this.activeSessionId) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        this.mediaStream = stream;
        try {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              this.audioChunks.push(e.data);
            }
          };
          recorder.start();
          this.mediaRecorder = recorder;
        } catch (e) {
          // ignore MediaRecorder failures
        }
      })
      .catch((e) => {
        // If getUserMedia fails or is blocked, SpeechRecognition can still function normally
        console.warn("getUserMedia capture notice:", e?.message);
      });
  }

  private static stopAudioRecording(): Promise<string | null> {
    return new Promise((resolve) => {
      const recorder = this.mediaRecorder;
      const cleanupStream = () => {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach((t) => t.stop());
          this.mediaStream = null;
        }
        this.mediaRecorder = null;
      };

      if (!recorder || recorder.state === "inactive") {
        cleanupStream();
        if (this.audioChunks.length > 0) {
          try {
            const blob = new Blob(this.audioChunks, { type: "audio/webm" });
            resolve(URL.createObjectURL(blob));
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
        return;
      }

      recorder.onstop = () => {
        cleanupStream();
        if (this.audioChunks.length > 0) {
          try {
            const blob = new Blob(this.audioChunks, { type: "audio/webm" });
            resolve(URL.createObjectURL(blob));
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };

      try {
        recorder.stop();
      } catch (e) {
        cleanupStream();
        resolve(null);
      }
    });
  }

  private static stopAudioRecordingSync(): void {
    try {
      if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
        this.mediaRecorder.stop();
      }
    } catch (e) {
      // ignore
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
    this.mediaRecorder = null;
  }

  /**
   * Main speech recognition listener with word-level accuracy checking
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

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const isIframe = window.self !== window.top;
      onError(
        isIframe
          ? "Brauzeringizda yoki ushbu oyna rejimida Web Speech Recognition qo'llab-quvvatlanmaydi. Iltimos, sahifani to'g'ridan-to'g'ri Chrome yoki Safari brauzerida to'liq oching."
          : "Brauzeringizda ovozni aniqlash (Web Speech Recognition) qo'llab-quvvatlanmaydi. Google Chrome, Microsoft Edge yoki Safari brauzeridan foydalaning."
      );
      return { stop: () => {} };
    }

    // Stop and clear any previous session cleanly
    this.stopActiveRecognition();

    const sessionId = ++this.activeSessionId;
    let resultHandled = false;

    // Create a pristine new instance for this recognition attempt
    let recog: any = null;
    try {
      recog = new SpeechRecognition();
    } catch (e: any) {
      onError("Ovoz tizimini ishga tushirib bo'lmadi: " + (e?.message || ""));
      return { stop: () => {} };
    }

    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = true; // Enables live feedback while speaking
    recog.maxAlternatives = 5;

    this.activeRecognition = recog;

    // Timeout safety: if 14 seconds pass without final result or error, stop cleanly
    this.timeoutTimer = setTimeout(() => {
      if (sessionId === this.activeSessionId && !resultHandled) {
        try {
          recog.stop();
        } catch {}
      }
    }, 14000);

    recog.onstart = () => {
      if (sessionId !== this.activeSessionId) return;
      this.startSafeAudioRecording(sessionId);
      if (onStart) onStart();
    };

    recog.onerror = async (event: any) => {
      if (sessionId !== this.activeSessionId) return;
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }
      await this.stopAudioRecording();

      const errType = event?.error;
      // If session was aborted intentionally (e.g. user stopped or switched), don't show error
      if (errType === "aborted") {
        if (onEnd) onEnd();
        return;
      }

      let msg = "Ovozni aniqlashda xatolik yuz berdi.";
      if (errType === "no-speech") {
        msg =
          "Ovoz eshitilmadi. Iltimos, mikrofonga yaqinroq, aniqroq va balandroq gapiring.";
      } else if (errType === "not-allowed" || errType === "permission-denied") {
        msg =
          "Mikrofon ruxsati berilmadi. Brauzer manzil satridagi qulf (yoki kamera/mikrofon) belgisini bosing va mikrofon ruxsatini 'Ruxsat berish' (Allow) qilib qo'ying.";
      } else if (errType === "audio-capture") {
        msg =
          "Mikrofon qurilmasi topilmadi yoki boshqa ilova tomonidan band qilingan. Mikrofon ulanishini tekshiring.";
      } else if (errType === "network") {
        msg =
          "Tarmoq xatosi: Chrome brauzerida ovozni matnga aylantirish uchun internet zarur (Google Speech). Internet aloqasini tekshiring yoki VPN-ni o'chirib ko'ring.";
      } else if (errType === "service-not-allowed") {
        msg = "Brauzeringiz ovoz xizmatidan foydalanishni cheklab qo'ygan.";
      } else if (errType === "language-not-supported") {
        msg = "Ingliz tili (en-US) ovoz moduli brauzeringizda qo'llab-quvvatlanmadi.";
      }

      onError(msg);
      if (onEnd) onEnd();
    };

    recog.onend = () => {
      if (sessionId !== this.activeSessionId) return;
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }
      if (!resultHandled) {
        this.stopAudioRecordingSync();
      }
      if (onEnd) onEnd();
    };

    recog.onresult = async (event: any) => {
      if (sessionId !== this.activeSessionId) return;
      const results = event.results;
      if (!results || results.length === 0) return;

      // Check for interim results to provide live instant UI feedback
      let interimTranscript = "";
      let finalResultIndex = -1;

      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (item.isFinal) {
          finalResultIndex = i;
        } else {
          interimTranscript += item[0]?.transcript || "";
        }
      }

      if (interimTranscript && onInterim && finalResultIndex === -1) {
        onInterim(interimTranscript);
      }

      // If we don't have a final result yet, continue listening
      if (finalResultIndex === -1) return;

      resultHandled = true;
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }

      const finalItem = results[finalResultIndex];
      const audioUrl = await this.stopAudioRecording();

      const alternatives: { transcript: string; confidence: number }[] = [];
      for (let i = 0; i < finalItem.length; i++) {
        alternatives.push({
          transcript: (finalItem[i].transcript || "").trim(),
          confidence:
            typeof finalItem[i].confidence === "number"
              ? finalItem[i].confidence
              : 0.85,
        });
      }

      if (alternatives.length === 0 || !alternatives[0].transcript) {
        onError("Ovoz eshitildi, lekin matn aniqlanmadi. Qayta urinib ko'ring.");
        return;
      }

      // If targetText is empty (free speaking prompt mode)
      if (!targetText.trim()) {
        const top = alternatives[0];
        onResult({
          transcript: top.transcript,
          confidence: top.confidence,
          accuracyPct: top.transcript ? 100 : 0,
          isMatch: Boolean(top.transcript),
          messageUz: "Nutqingiz yozib olindi.",
          words: [],
          audioUrl,
        });
        return;
      }

      const evaluation = this.evaluateAlternatives(targetText, alternatives);
      onResult({
        ...evaluation,
        audioUrl,
      });
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
          try {
            recog.stop();
          } catch (e) {
            // Ignore
          }
          this.stopAudioRecordingSync();
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
