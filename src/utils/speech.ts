export class SpeechController {
  private static synth: SpeechSynthesis | null =
    typeof window !== "undefined" && "speechSynthesis" in window
      ? window.speechSynthesis
      : null;

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public static getBestEnglishVoice(preferredVoiceURI?: string): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    if (preferredVoiceURI) {
      const match = voices.find((v) => v.voiceURI === preferredVoiceURI);
      if (match) return match;
    }

    // Prefer US English voices
    const enUsVoices = voices.filter(
      (v) => v.lang === "en-US" || v.lang.startsWith("en_US")
    );
    if (enUsVoices.length > 0) {
      // Prefer Google or natural voices if available
      const natural = enUsVoices.find(
        (v) =>
          v.name.includes("Google") ||
          v.name.includes("Natural") ||
          v.name.includes("Samantha") ||
          v.name.includes("US English")
      );
      return natural || enUsVoices[0];
    }

    // Any English voice
    const anyEn = voices.find((v) => v.lang.startsWith("en"));
    return anyEn || voices[0] || null;
  }

  public static speak(
    text: string,
    options?: {
      voiceURI?: string;
      rate?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): boolean {
    if (!this.synth) {
      if (options?.onError) {
        options.onError("Brauzeringizda ovozli o'qish (Web Speech API) qo'llab-quvvatlanmaydi.");
      }
      return false;
    }

    try {
      this.synth.cancel(); // Stop any pending utterance
      const cleanText = text.replace(/<[^>]*>/g, "").trim();
      if (!cleanText) return false;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";
      utterance.rate = options?.rate || 0.95; // Slightly slower for clear ESL learning
      utterance.pitch = 1.0;

      const voice = this.getBestEnglishVoice(options?.voiceURI);
      if (voice) {
        utterance.voice = voice;
      }

      if (options?.onStart) utterance.onstart = options.onStart;
      if (options?.onEnd) utterance.onend = options.onEnd;
      if (options?.onError) utterance.onerror = options.onError;

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      if (options?.onError) options.onError(err);
      return false;
    }
  }

  public static stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // Ignore
      }
    }
  }

  public static isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }
}
