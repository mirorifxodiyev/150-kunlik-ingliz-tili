// Web Speech Recognition API utility for checking pronunciation

export interface SpeechRecognitionResult {
  transcript: string;
  accuracyPct: number;
  isMatch: boolean;
  messageUz: string;
}

export class SpeechRecognitionService {
  private static recognition: any = null;

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
    instance.maxAlternatives = 3;

    this.recognition = instance;
    return instance;
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
      onError("Brauzeringizda ovozni aniqlash (Speech Recognition) qo'llab-quvvatlanmaydi. Chrome, Edge yoki Safari brauzeridan foydalaning.");
      return { stop: () => {} };
    }

    try {
      recog.abort(); // Cancel any existing
    } catch (e) {
      // Ignore
    }

    recog.onstart = () => {
      if (onStart) onStart();
    };

    recog.onerror = (event: any) => {
      let msg = "Ovozni aniqlashda xatolik yuz berdi.";
      if (event.error === "no-speech") {
        msg = "Ovoz eshitilmadi. Iltimos, mikrofonga yaqinroq gapiring.";
      } else if (event.error === "not-allowed") {
        msg = "Mikrofon ruxsati berilmadi. Brauzer sozlamalaridan mikrofonni yoqing.";
      }
      onError(msg);
      if (onEnd) onEnd();
    };

    recog.onend = () => {
      if (onEnd) onEnd();
    };

    recog.onresult = (event: any) => {
      const results = event.results;
      if (!results || results.length === 0) {
        onError("Ovozni aniqlab bo'lmadi.");
        return;
      }

      // Check all alternatives
      let bestAccuracy = 0;
      let bestTranscript = "";

      for (let i = 0; i < results[0].length; i++) {
        const transcript = results[0][i].transcript.trim();
        const acc = this.calculateSimilarity(transcript, targetText);
        if (acc > bestAccuracy) {
          bestAccuracy = acc;
          bestTranscript = transcript;
        }
      }

      const isMatch = bestAccuracy >= 70;
      let messageUz = "";

      if (bestAccuracy >= 90) {
        messageUz = "A'lo darajada! Amerika talaffuziga juda yaqin (90%+).";
      } else if (bestAccuracy >= 70) {
        messageUz = "Yaxshi! So'z aniq tushunildi (70-89%).";
      } else {
        messageUz = "Biroz noaniq. So'zni audio orqali qayta eshitib, yana urinib ko'ring.";
      }

      onResult({
        transcript: bestTranscript,
        accuracyPct: bestAccuracy,
        isMatch,
        messageUz,
      });
    };

    try {
      recog.start();
    } catch (err: any) {
      console.warn("Speech recognition start failed:", err);
      onError("Mikrofonni ishga tushirib bo'lmadi.");
    }

    return {
      stop: () => {
        try {
          recog.stop();
        } catch (e) {
          // Ignore
        }
      },
    };
  }

  // Calculate similarity between spoken words and target text
  public static calculateSimilarity(spoken: string, target: string): number {
    const s = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    const t = target.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

    if (s === t) return 100;
    if (!s || !t) return 0;

    // Levenshtein distance
    const track = Array(t.length + 1)
      .fill(null)
      .map(() => Array(s.length + 1).fill(null));

    for (let i = 0; i <= s.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= t.length; j += 1) track[j][0] = j;

    for (let j = 1; j <= t.length; j += 1) {
      for (let i = 1; i <= s.length; i += 1) {
        const indicator = s[i - 1] === t[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    const distance = track[t.length][s.length];
    const maxLen = Math.max(s.length, t.length);
    const score = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

    return score;
  }
}
