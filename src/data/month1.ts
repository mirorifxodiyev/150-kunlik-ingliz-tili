import { Lesson } from "../types";
import { REALISTIC_SCENARIOS } from "./realisticDialogues";

// Helper to generate full structured daily hourly tasks (5 hours = 300 minutes)
export function create5HourlyTasks(
  vocabTopic: string,
  grammarTopic: string,
  dialogueTopic: string,
  writingTopic: string,
  speakingQuizTopic: string
) {
  return [
    {
      title: "1-soat: Yangi lug'at va talaffuz (Vocabulary & Pronunciation)",
      durationMinutes: 60,
      description: `${vocabTopic} bo'yicha 10-12 ta yangi so'z va iboralarni audio orqali talaffuz qilish va yodlash.`,
      breakdown: [
        { minutes: 20, activity: "Barcha so'zlarni audio orqali 3 marta eshitish va ovoz chiqarib takrorlash." },
        { minutes: 20, activity: "Har bir so'zning namunaviy gapini daftarga ko'chirib, o'zbekcha tarjimasini tahlil qilish." },
        { minutes: 20, activity: "So'zlarni yoddan tekshirish va kartochkalar orqali mustahkamlash." }
      ]
    },
    {
      title: "2-soat: Grammatika va qoidalar tahlili (Grammar & Structure)",
      durationMinutes: 60,
      description: `${grammarTopic} qoidalarini o'zbek tilidagi tushuntirish va namunalar orqali o'rganish.`,
      breakdown: [
        { minutes: 20, activity: "Grammatik tushuntirishni diqqat bilan o'qib, formulalarni yozib olish." },
        { minutes: 25, activity: "Namunaviy gaplarni tahlil qilish va o'xshash 10 ta yangi gap tuzish." },
        { minutes: 15, activity: "Ovoz chiqarib o'qish va grammatik xatolarni o'z vaqtida tuzatish." }
      ]
    },
    {
      title: "3-soat: Tinglash va Jonli Dialog (Listening & Dialogue Practice)",
      durationMinutes: 60,
      description: `${dialogueTopic} mavzusidagi kundalik Amerika suhbatini eshitish va rolga kirishib mashq qilish.`,
      breakdown: [
        { minutes: 25, activity: "Dialogni audio yordamida matnga qaramay, so'ng matn bilan 3 marta eshitish." },
        { minutes: 20, activity: "Shadowing (soya usuli) orqali spikerning orqasidan darhol takrorlash." },
        { minutes: 15, activity: "Dialogdagi foydali frazalarni ajratib, o'zbekcha muqobilini solishtirish." }
      ]
    },
    {
      title: "4-soat: Yozish va Amaliy mashq (Writing & Practical Application)",
      durationMinutes: 60,
      description: `${writingTopic} bo'yicha mustaqil ravishda yozma topshiriqni bajarish.`,
      breakdown: [
        { minutes: 30, activity: "Yozish topshirig'i (Writing Prompt) asosida kamida 80-120 so'zli matn yozish." },
        { minutes: 15, activity: "Bugungi yangi so'z va grammatik qoidalarni matnda to'g'ri ishlatilganini tekshirish." },
        { minutes: 15, activity: "Xatolarni tahrirlash va matnni ovoz chiqarib o'qib berish." }
      ]
    },
    {
      title: "5-soat: Gapirish, Kunlik test va SRS (Speaking, Daily Quiz & SRS)",
      durationMinutes: 60,
      description: `${speakingQuizTopic} bo'yicha og'zaki gapirish, 8 ta savolli testni yechish va interval takrorlash.`,
      breakdown: [
        { minutes: 20, activity: "Speaking Prompt bo'yicha ovoz chiqarib kamida 2-3 daqiqa to'xtovsiz gapirish." },
        { minutes: 20, activity: "8 ta savoldan iborat kunlik testni yechish va kamida 70% natijaga erishish." },
        { minutes: 20, activity: "SRS (Interval takrorlash) kartalari va Xatolar daftaridagi savollarni qayta ko'rib chiqish." }
      ]
    }
  ];
}

// 30 rich curriculum topics for Month 1 (A1 Foundations)
const M1_TOPICS = [
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
  { day: 30, title: "30-kun: Oylik imtihonga to'liq tayyorgarlik (Month 1 Exam Readiness)", theme: "A1 darajadagi barcha mavzular bo'yicha yakuniy takrorlash va oylik testga kirish" }
];

export const MONTH_1_LESSONS: Lesson[] = M1_TOPICS.map((topic, i) => {
  const day = topic.day;
  const week = Math.min(4, Math.floor((day - 1) / 7) + 1);

  // Vocabulary dataset tailored for Day
  const vocabItems = [
    { en: "hello", uz: "salom", example: "Hello, my name is Anvar.", exampleUz: "Salom, mening ismim Anvar.", ipaOrRespelling: "huh-LOH" },
    { en: "good morning", uz: "xayrli tong", example: "Good morning, how are you today?", exampleUz: "Xayrli tong, bugun ahvolingiz qanday?", ipaOrRespelling: "good MOR-ning" },
    { en: "name", uz: "ism", example: "What is your name?", exampleUz: "Ismingiz nima?", ipaOrRespelling: "NAYM" },
    { en: "please", uz: "iltimos", example: "Spell your name, please.", exampleUz: "Ismingizni harflab ayting, iltimos.", ipaOrRespelling: "PLEEZ" },
    { en: "thank you", uz: "rahmat", example: "Thank you for your help.", exampleUz: "Yordamingiz uchun rahmat.", ipaOrRespelling: "THANK yoo" },
    { en: "welcome", uz: "marhamat / xush kelibsiz", example: "You're very welcome.", exampleUz: "Arzimaydi / Xush kelibsiz.", ipaOrRespelling: "WEL-kum" },
    { en: "excuse me", uz: "kechirasiz", example: "Excuse me, where is the office?", exampleUz: "Kechirasiz, idora qayerda?", ipaOrRespelling: "ik-SKYOOZ mee" },
    { en: "understand", uz: "tushunmoq", example: "I understand English a little bit.", exampleUz: "Men ingliz tilini biroz tushunaman.", ipaOrRespelling: "un-dur-STAND" },
    { en: "repeat", uz: "takrorlamoq", example: "Can you repeat that, please?", exampleUz: "Shuni takrorlay olasizmi, iltimos?", ipaOrRespelling: "ri-PEET" },
    { en: "slowly", uz: "sekin / ohista", example: "Please speak more slowly.", exampleUz: "Iltimos, sekinroq gapiring.", ipaOrRespelling: "SLOH-lee" }
  ];

  const custom = REALISTIC_SCENARIOS[day];
  const finalDialogue = custom?.dialogue || {
    title: `${topic.title} bo'yicha amaliy suhbat`,
    lines: [
      { speaker: "John", en: "Hello! Welcome to our language orientation center.", uz: "Salom! Til o'rganish markazimizga xush kelibsiz." },
      { speaker: "Anvar", en: "Good morning, John! My name is Anvar.", uz: "Xayrli tong, Jon! Mening ismim Anvar." },
      { speaker: "John", en: "Nice to meet you, Anvar. Where are you from?", uz: "Tanishganimdan xursandman, Anvar. Siz qayerdansiz?" },
      { speaker: "Anvar", en: "I am from Uzbekistan. I arrived in the USA two weeks ago.", uz: "Men O'zbekistondanman. AQSHga ikki hafta oldin keldim." },
      { speaker: "John", en: "That is wonderful! How is your English study going?", uz: "Bu ajoyib! Ingliz tilini o'rganishingiz qanday ketyapti?" },
      { speaker: "Anvar", en: "I study five hours every single day, so I am making steady progress.", uz: "Men har kuni besh soatdan dars qilyapman, shuning uchun muntazam rivojlanyapman." },
      { speaker: "John", en: "Keep it up! Consistency is the most important factor.", uz: "Shunday davom eting! Muntazamlik — eng muhim omildir." }
    ]
  };
  const finalVocab = custom?.vocabulary || vocabItems;
  const finalSpeakingPrompt = custom?.speakingPrompt || `${topic.title} mavzusi bo'yicha o'zingizni tanishtirib, bugungi o'rgangan yangi so'zlaringizdan foydalangan holda 2-3 daqiqa ovoz chiqarib gapiring.`;

  return {
    id: `m1_d${day}`,
    month: 1,
    day,
    level: "A1",
    title: topic.title,
    themeUz: topic.theme,
    objectives: [
      `${topic.title} mavzusidagi yangi leksika va iboralarni to'g'ri talaffuz qilish`,
      "Amerika ingliz tilidagi asosiy qoidalar va formulalarni o'zlashtirish",
      "Kundalik vaziyatda savol berish va javob qaytarish ko'nikmasini shakllantirish",
      "Kunlik 5 soatlik amaliy mashqlarni bajarib, testdan kamida 70% olish"
    ],
    vocabulary: finalVocab,
    grammar: {
      title: `${topic.title}: Asosiy grammatik qoida`,
      explanationUz: `Ushbu darsda siz ${topic.theme} mavzusini batafsil o'rganasiz. Amerika ingliz tilida aniq va sodda gap tuzish uchun so'z tartibi (Ega + Kesim + Ikkinchi darajali bo'laklar) muhim ahamiyatga ega. Formulalarni yod oling va namunaviy gaplarni ovoz chiqarib takrorlang.`,
      examples: [
        { en: "I am a student from Uzbekistan.", uz: "Men O'zbekistondan kelgan talabaman." },
        { en: "She lives in New York City.", uz: "U Nyu-York shahrida yashaydi." },
        { en: "Do you have any questions?", uz: "Sizda biror savol bormi?" },
        { en: "We study English five hours every day.", uz: "Biz har kuni besh soat ingliz tili o'rganamiz." }
      ]
    },
    examples: [
      { en: "Good morning! It's very nice to meet you.", uz: "Xayrli tong! Siz bilan tanishganimdan juda xursandman." },
      { en: "Could you please spell your last name?", uz: "Familiyangizni harflab bera olasizmi, iltimos?" },
      { en: "I am learning American English for my future job.", uz: "Men kelajakdagi ishim uchun Amerika ingliz tilini o'rganyapman." },
      { en: "There is an information desk near the entrance.", uz: "Kirish eshigi yonida ma'lumot berish stoli bor." },
      { en: "We always practice speaking and listening together.", uz: "Biz doimo birga gapirish va tinglashni mashq qilamiz." },
      { en: "Take your time and do not worry about making mistakes.", uz: "Shoshilmang va xato qilishdan qo'rqmang." }
    ],
    dialogue: finalDialogue,
    tasks: create5HourlyTasks(
      topic.title,
      topic.theme,
      topic.title,
      "Daftarga bugungi mavzuda 80-120 so'zli mustaqil matn",
      topic.title
    ),
    dailyQuiz: [
      {
        id: `q_m1_d${day}_1`,
        type: "mcq-translation",
        prompt: `'${vocabItems[0].en}' so'zining o'zbekcha tarjimasi nima?`,
        options: [vocabItems[0].uz, "xayr", "rahmat", "kechirasiz"],
        answer: vocabItems[0].uz,
        explanationUz: `'${vocabItems[0].en}' — o'zbek tilida '${vocabItems[0].uz}' degan ma'noni bildiradi.`
      },
      {
        id: `q_m1_d${day}_2`,
        type: "fill-blank",
        prompt: `Bo'sh joyni to'ldiring: 'Good ___, how are you?' (tong)`,
        answer: "morning",
        explanationUz: "'Good morning' — Xayrli tong."
      },
      {
        id: `q_m1_d${day}_3`,
        type: "grammar-choice",
        prompt: "To'g'ri shaklni tanlang: 'I ___ from Uzbekistan.'",
        options: ["am", "is", "are", "be"],
        answer: "am",
        explanationUz: "'I' kishilik olmoshi bilan 'to be' fe'lining 'am' shakli ishlatiladi."
      },
      {
        id: `q_m1_d${day}_4`,
        type: "mcq-translation",
        prompt: `'${vocabItems[4].en}' so'zining ma'nosi qaysi?`,
        options: [vocabItems[4].uz, "salom", "iltimos", "xayr"],
        answer: vocabItems[4].uz,
        explanationUz: `'${vocabItems[4].en}' — '${vocabItems[4].uz}'.`
      },
      {
        id: `q_m1_d${day}_5`,
        type: "correct-sentence",
        prompt: "Grammatik jihatdan to'g'ri tuzilgan gapni tanlang:",
        options: [
          "She lives in New York City.",
          "She live in New York City.",
          "She living in New York City yesterday.",
          "She are in New York City."
        ],
        answer: "She lives in New York City.",
        explanationUz: "Present Simple zamonida uchinchi shaxs birlikda (he/she/it) fe'lga -s/-es qo'shiladi: 'lives'."
      },
      {
        id: `q_m1_d${day}_6`,
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Please speak more ___.' (sekin / ohista)",
        answer: "slowly",
        explanationUz: "'Slowly' — sekin, ohista."
      },
      {
        id: `q_m1_d${day}_7`,
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
        options: ["What", "is", "your", "name?"],
        answer: "What is your name?",
        explanationUz: "Savol so'zi (What) + yordamchi fe'l (is) + ega (your name)."
      },
      {
        id: `q_m1_d${day}_8`,
        type: "grammar-choice",
        prompt: "To'g'ri ko'rsatish olmoshini tanlang: '___ is my passport.' (Yaqindagi bitta narsa)",
        options: ["This", "These", "Those", "There"],
        answer: "This",
        explanationUz: "Yaqindagi bitta narsa uchun 'This' ishlatiladi."
      }
    ],
    weeklyTestId: `w_m1_${week}`,
    monthlyExamId: "exam_m1",
    resources: [
      { title: "VOA Learning English — Let's Learn English (Level 1)", url: "https://learningenglish.voanews.com", type: "Official ESL Portal" },
      { title: "Rachel's English — American English Sounds & Basics", url: "https://www.youtube.com/@rachelsenglish", type: "YouTube Video" }
    ],
    speakingPrompt: finalSpeakingPrompt,
    writingPrompt: `Bugungi dars mavzusi yuzasidan daftaringizga 80-120 so'zdan iborat matn yozing va bugungi lug'atdan kamida 6 ta so'zni qatnashtiring.`,
    reviewItems: day > 1 ? [`m1_d${day - 1}`] : [],
    summaryChecklist: [
      "Bugungi barcha 10 ta yangi so'zni audio orqali talaffuz qildim",
      "Grammatik qoidani tushundim va namunaviy gaplarni ko'chirib yozdim",
      "5 soatlik vazifalar ketma-ketligini yakunladim",
      "Kunlik testdan kamida 70% natija qayd etdim"
    ]
  };
});
