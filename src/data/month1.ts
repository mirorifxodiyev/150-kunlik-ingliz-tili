import { CefrLevel, HourlyTask, Lesson } from "../types";
import { getDayContent } from "./content";

export function create5HourlyTasks(topicTitle: string, themeUz: string): HourlyTask[] {
  return [
    {
      title: "1-soat: Video kirish va Yangi so'zlar (Video & Vocabulary)",
      durationMinutes: 60,
      description: `${topicTitle} bo'yicha video darsni ko'rish hamda 10 ta yangi so'zni talaffuzi bilan o'zlashtirish.`,
      breakdown: [
        { minutes: 20, activity: "Mavzuga oid Amerika ingliz tili video darsini ko'rish va talaffuzga e'tibor berish." },
        { minutes: 20, activity: "10 ta yangi so'zni audio orqali eshitish, mikrofon orqali talaffuzni tekshirish." },
        { minutes: 20, activity: "Namunaviy gaplarni o'zbekcha tarjimasi bilan daftarga ko'chirish va SRS kartalariga qo'shish." },
      ],
    },
    {
      title: "2-soat: Grammatika va namunaviy gaplar (Grammar & Examples)",
      durationMinutes: 60,
      description: `${themeUz} qoidalarini formulalar va 6 ta amaliy misol orqali chuqur o'rganish.`,
      breakdown: [
        { minutes: 25, activity: "Grammatik qoida va formulalarni diqqat bilan o'qib, daftarga konspekt qilish." },
        { minutes: 20, activity: "Grammatik va qo'shimcha 6 ta namunaviy gapni ovoz chiqarib o'qish va tahlil qilish." },
        { minutes: 15, activity: "Formulalar asosida o'zingiz haqingizda 5 ta yangi gap tuzish." },
      ],
    },
    {
      title: "3-soat: Jonli Dialog va Eshitib tushunish (Dialogue & Shadowing)",
      durationMinutes: 60,
      description: `${topicTitle} mavzusidagi real hayotiy Amerika suhbatini tinglash va rolga kirib mashq qilish.`,
      breakdown: [
        { minutes: 20, activity: "Dialogni to'liq va qatma-qator audio orqali tinglash." },
        { minutes: 25, activity: "Shadowing (spiker ortidan darhol qaytarish) usulida ohang va urg'uni mashq qilish." },
        { minutes: 15, activity: "Dialogdagi asosiy iboralarni yoddan aytib ko'rish." },
      ],
    },
    {
      title: "4-soat: Gapirish (Mikrofon) va Yozish amaliyoti (Speaking & Writing)",
      durationMinutes: 60,
      description: `Kunlik gaplarni mikrofonga aytib so'zma-so'z tekshirish hamda yozma topshiriqni bajarish.`,
      breakdown: [
        { minutes: 25, activity: "6 ta mashq gapini mikrofonga aytib, qizil va sariq so'zlar ustida ishlash." },
        { minutes: 15, activity: "Speaking Prompt bo'yicha erkin 2 daqiqa ovoz chiqarib gapirish." },
        { minutes: 20, activity: "Writing Prompt asosida yozma daftarga matn yozish." },
      ],
    },
    {
      title: "5-soat: Kunlik test va SRS takrorlash (Daily Quiz & Review)",
      durationMinutes: 60,
      description: `Mavzuga oid 8 ta savolli kunlik testdan kamida 70% olish va xatolarni tahlil qilish.`,
      breakdown: [
        { minutes: 25, activity: "8 ta savoldan iborat kunlik testni ishlash va kamida 70% natija qayd etish." },
        { minutes: 20, activity: "Xato qilingan savollarning izohini o'qish va Xatolar daftarida qayta ishlash." },
        { minutes: 15, activity: "SRS interval takrorlash kartalarini ko'rib chiqish." },
      ],
    },
  ];
}

export function buildYoutubeSearchUrl(title: string, themeUz: string, level: CefrLevel): string {
  const englishPart = title.match(/\(([^)]+)\)/)?.[1] || title.replace(/^\d+-kun:\s*/i, "");
  const levelQuery = level.startsWith("A1")
    ? "beginner American English"
    : level.startsWith("A2")
    ? "elementary American English conversation"
    : "intermediate American English";
  const query = `${englishPart} ${levelQuery}`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function buildLessonFromTopic(
  month: number,
  level: CefrLevel,
  topic: { day: number; title: string; theme: string }
): Lesson {
  const day = topic.day;
  const weekInMonth = Math.min(4, Math.floor(((day - (month - 1) * 30) - 1) / 7) + 1);
  const content = getDayContent(day);
  const youtubeSearchUrl = buildYoutubeSearchUrl(topic.title, topic.theme, level);

  if (!content) {
    return {
      id: `m${month}_d${day}`,
      month,
      day,
      level,
      title: topic.title,
      themeUz: topic.theme,
      isReady: false,
      objectives: [
        `${topic.title} mavzusini o'zlashtirish`,
        "Mazmun tez orada qo'shiladi",
      ],
      vocabulary: [],
      grammar: {
        title: `${topic.title}`,
        explanationUz: "",
        examples: [],
      },
      examples: [],
      dialogue: {
        title: topic.title,
        lines: [],
      },
      tasks: create5HourlyTasks(topic.title, topic.theme),
      dailyQuiz: [],
      speakingSentences: [],
      videos: [],
      youtubeSearchUrl,
      weeklyTestId: `w_m${month}_${weekInMonth}`,
      monthlyExamId: `exam_m${month}`,
      resources: [],
      speakingPrompt: "",
      writingPrompt: "",
      reviewItems: day > 1 ? [`m${ Math.ceil((day - 1) / 30) }_d${day - 1}`] : [],
      summaryChecklist: [],
    };
  }

  return {
    id: `m${month}_d${day}`,
    month,
    day,
    level,
    title: topic.title,
    themeUz: topic.theme,
    isReady: true,
    objectives: [
      `${topic.title} bo'yicha 10 ta faol so'zni Amerika talaffuzida o'zlashtirish`,
      `${content.grammar.title} qoidasi va formulalarini amalda qo'llash`,
      `${content.dialogue.title} orqali jonli muloqot ko'nikmasini shakllantirish`,
      "Mikrofon mashqlarida gaplarni to'g'ri aytish va kunlik testdan kamida 70% olish",
    ],
    vocabulary: content.vocabulary,
    grammar: content.grammar,
    examples: content.examples,
    dialogue: content.dialogue,
    tasks: create5HourlyTasks(topic.title, topic.theme),
    dailyQuiz: content.dailyQuiz,
    speakingSentences: content.speakingSentences,
    videos: content.videos,
    youtubeSearchUrl,
    weeklyTestId: `w_m${month}_${weekInMonth}`,
    monthlyExamId: `exam_m${month}`,
    resources: content.videos.map((v) => ({
      title: `${v.title} (${v.channel})`,
      url: v.url,
      type: `Video · ${v.level}`,
    })),
    speakingPrompt: content.speakingPrompt,
    writingPrompt: content.writingPrompt,
    reviewItems: day > 1 ? [`m${Math.ceil((day - 1) / 30)}_d${day - 1}`] : [],
    summaryChecklist: [
      "Video darsni ko'rdim va 10 ta yangi so'zni ovoz chiqarib mashq qildim",
      "Grammatik qoida va formulalarni tushunib oldim",
      "Dialogni eshitib, spiker ortidan qaytardim",
      "Mikrofon mashqlarida gaplarni tekshirdim va yozma vazifani bajardim",
      "8 savollik kunlik testdan kamida 70% natija oldim",
    ],
  };
}

export const M1_TOPICS = [
  { day: 1, title: "1-kun: Ingliz alifbosi va harflar talaffuzi (Alphabet & Sound Basics)", theme: "Alifbo, unli va undosh tovushlar, ism-familiyani harflab aytish (spelling)" },
  { day: 2, title: "2-kun: Salomlashish va xayrlashish (Greetings & Goodbyes)", theme: "Rasmiy va norasmiy salomlashishlar, 'How are you?', 'Nice to meet you'" },
  { day: 3, title: "3-kun: Kishilik olmoshlari va 'to be' fe'li (Subject Pronouns & To Be)", theme: "I am, You are, He/She/It is, We are, They are va qisqartmalar (I'm, you're)" },
  { day: 4, title: "4-kun: Raqamlar (1-100), yosh va telefon raqam (Numbers & Age)", theme: "Raqamlarni to'g'ri talaffuz qilish, yoshni aytish ('I am 28 years old'), telefon raqami" },
  { day: 5, title: "5-kun: Davlatlar va millatlar (Countries & Nationalities)", theme: "Where are you from? I am from Uzbekistan. I am Uzbek. Yashash joyi" },
  { day: 6, title: "6-kun: O'zini tanishtirish va anketalar (Introducing Yourself & Basic Info)", theme: "Ism, kasb, manzil, yosh va oila haqida qisqacha ma'lumot berish" },
  { day: 7, title: "7-kun: 1-hafta takrori va mustahkamlash (Week 1 Review & Consolidation)", theme: "1-haftada o'rganilgan mavzularni umumlashtirish, talaffuz va testga tayyorgarlik" },
  { day: 8, title: "8-kun: Noaniq artikllar: 'A' va 'An' (Indefinite Articles)", theme: "'A' va 'An' qoidasi, unli tovushlar bilan farqi (a car, an apple, an hour)" },
  { day: 9, title: "9-kun: Otlarning ko'pligi (Singular & Plural Nouns)", theme: "Muntazam va noto'g'ri ko'plik (-s, -es, -ies, men, women, children)" },
  { day: 10, title: "10-kun: Ko'rsatish olmoshlari: This, That, These, Those (Demonstratives)", theme: "Yaqin va uzoqdagi birlik va ko'plik narsalarga ishora qilish" },
  { day: 11, title: "11-kun: Oila a'zolari va qarindoshlik (Family Members)", theme: "Oila a'zolari nomlari: parents, siblings, spouse, relatives" },
  { day: 12, title: "12-kun: Egalik olmoshlari va 's (Possessives & Saxon Genitive)", theme: "My, your, his, her, our, their va 's egalik qo'shimchasi (John's car)" },
  { day: 13, title: "13-kun: Xona va uy-ro'zg'or buyumlari (Classroom & Home Objects)", theme: "Stol, stul, qalam, daftar, kalit, telefon kabi kundalik buyumlar" },
  { day: 14, title: "14-kun: 2-hafta takrori: 'There is / There are' (Location & Existence)", theme: "Mavjudlikni ifodalash ('There is a book on the table'), joylashuv predloglari (in, on, under)" },
  { day: 15, title: "15-kun: Ranglar va asosiy sifatlar (Colors & Common Adjectives)", theme: "Ranglar, o'lcham va xususiyat bildiruvchi sifatlar (big, small, new, old, clean)" },
  { day: 16, title: "16-kun: So'roq so'zlari: Who, What, Where, When, Why, How (Wh-Questions)", theme: "Savol so'zlarini to'g'ri ishlatish va axborot so'rash" },
  { day: 17, title: "17-kun: Inkor gaplar va 'To Be' ning savol shakli (Negatives & Questions with To Be)", theme: "Is he at work? No, he isn't. Are you tired? Inkor va qisqa javoblar" },
  { day: 18, title: "18-kun: Eng muhim 10 ta asosiy fe'l (10 Essential Verbs)", theme: "Have, do, go, want, need, like, work, live, come, take" },
  { day: 19, title: "19-kun: Vaqt, soat va kun qismlari (Telling Time & Parts of the Day)", theme: "What time is it? It's 7:30. In the morning, in the afternoon, at night" },
  { day: 20, title: "20-kun: Hafta kunlari, oylar va sanalar (Days, Months & Dates)", theme: "Hafta kunlari, oylar, tartib sonlar (first, second, third) va sanani aytish" },
  { day: 21, title: "21-kun: 3-hafta takrori: Kundalik tartib (Daily Routine & Habits)", theme: "Ertalab uyg'onish, nonushta qilish, ishga borish kabi kun tartibi" },
  { day: 22, title: "22-kun: Present Simple: Darak gaplar (Present Simple: Affirmative)", theme: "I work, you live, he works, she lives (-s/-es qo'shimchasi qoidasi)" },
  { day: 23, title: "23-kun: Present Simple: Inkor shakli (Don't / Doesn't)", theme: "I don't work on Sundays. He doesn't drink coffee. Inkor shakli tuzilishi" },
  { day: 24, title: "24-kun: Present Simple: So'roq shakli (Do / Does)", theme: "Do you speak English? Does she live in Chicago? Umumiy va maxsus savollar" },
  { day: 25, title: "25-kun: Tez-tezlik ravishlari: Always, Usually, Sometimes, Never (Adverbs of Frequency)", theme: "Ish-harakatning takrorlanish darajasi va ularning gapdagi o'rni" },
  { day: 26, title: "26-kun: Kasblar va ish joylari (Jobs & Workplaces)", theme: "Driver, nurse, cashier, teacher, mechanic, engineer. Where do you work?" },
  { day: 27, title: "27-kun: Ko'chadagi oddiy savollar va iltimoslar (Basic Requests & Polite Phrases)", theme: "Can you help me? Excuse me, please, thank you very much, you're welcome" },
  { day: 28, title: "28-kun: 4-hafta takrori: Qisqa muloqotlar (Short Practical Conversations)", theme: "Do'konda, ko'chada va ishxonadagi birinchi oddiy muloqotlar" },
  { day: 29, title: "29-kun: A1 Grammatika va Lug'at konsolidatsiyasi (A1 Consolidation)", theme: "1-oy davomida o'rganilgan barcha 300 ta so'z va qoidalarni xaritasi" },
  { day: 30, title: "30-kun: Oylik imtihonga to'liq tayyorgarlik (Month 1 Exam Readiness)", theme: "A1 darajadagi barcha mavzular bo'yicha yakuniy takrorlash va oylik testga kirish" },
];

export const MONTH_1_LESSONS: Lesson[] = M1_TOPICS.map((topic) =>
  buildLessonFromTopic(1, "A1", topic)
);
