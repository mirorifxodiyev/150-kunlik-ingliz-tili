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
  private static recognition: any = null;
  private static mediaRecorder: MediaRecorder | null = null;
  private static mediaStream: MediaStream | null = null;
  private static audioChunks: Blob[] = [];

  public static isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    );
  }

  private static getRecognitionInstance(): any {
    if (this.recognition) return this.recognition;
    if (typeof window === "undefined") return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return null;

    const instance = new SpeechRecognition();
    instance.lang = "en-US";
    instance.continuous = false;
    instance.interimResults = false;
    instance.maxAlternatives = 5;

    this.recognition = instance;
    return instance;
  }

  private static async startAudioRecording(): Promise<void> {
    this.audioChunks = [];
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      return;
    }

    try {
      this.stopAudioRecordingSync();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream = stream;
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };
      recorder.start();
      this.mediaRecorder = recorder;
    } catch (err) {
      // If MediaRecorder fails or conflicts, SpeechRecognition still continues
      console.warn("MediaRecorder start warning:", err);
    }
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
          const blob = new Blob(this.audioChunks, { type: "audio/webm" });
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(null);
        }
        return;
      }

      recorder.onstop = () => {
        cleanupStream();
        if (this.audioChunks.length > 0) {
          const blob = new Blob(this.audioChunks, { type: "audio/webm" });
          resolve(URL.createObjectURL(blob));
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

  public static listenAndCheck(
    targetText: string,
    onResult: (res: SpeechRecognitionResult) => void,
    onError: (errMsg: string) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): { stop: () => void } {
    const recog = this.getRecognitionInstance();
    if (!recog) {
      onError(
        "Brauzeringizda ovozni aniqlash (Web Speech Recognition) qo'llab-quvvatlanmaydi. Iltimos, Google Chrome, Microsoft Edge yoki Safari brauzeridan foydalaning."
      );
      return { stop: () => {} };
    }

    try {
      recog.abort();
    } catch (e) {
      // Ignore
    }

    let resultHandled = false;

    recog.onstart = () => {
      this.startAudioRecording();
      if (onStart) onStart();
    };

    recog.onerror = async (event: any) => {
      await this.stopAudioRecording();
      let msg = "Ovozni aniqlashda xatolik yuz berdi.";
      if (event.error === "no-speech") {
        msg = "Ovoz eshitilmadi. Iltimos, mikrofonga yaqinroq va aniqroq gapiring.";
      } else if (event.error === "not-allowed") {
        msg = "Mikrofon ruxsati berilmadi. Brauzer manzil satridagi qulf belgisidan mikrofon ruxsatini yoqing.";
      } else if (event.error === "network") {
        msg = "Tarmoq xatosi: Chrome brauzerida ovozni matnga aylantirish uchun internet aloqasi zarur.";
      }
      onError(msg);
      if (onEnd) onEnd();
    };

    recog.onend = () => {
      if (!resultHandled) {
        this.stopAudioRecordingSync();
      }
      if (onEnd) onEnd();
    };

    recog.onresult = async (event: any) => {
      resultHandled = true;
      const results = event.results;
      const audioUrl = await this.stopAudioRecording();

      if (!results || results.length === 0 || !results[0] || results[0].length === 0) {
        onError("Ovozni aniqlab bo'lmadi. Qayta urinib ko'ring.");
        return;
      }

      const alternatives: { transcript: string; confidence: number }[] = [];
      for (let i = 0; i < results[0].length; i++) {
        alternatives.push({
          transcript: (results[0][i].transcript || "").trim(),
          confidence:
            typeof results[0][i].confidence === "number"
              ? results[0][i].confidence
              : 0.85,
        });
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
      onError("Mikrofonni ishga tushirib bo'lmadi. Biroz kutib qayta bosing.");
    }

    return {
      stop: () => {
        try {
          recog.stop();
        } catch (e) {
          // Ignore
        }
        this.stopAudioRecordingSync();
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
