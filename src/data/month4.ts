import { Lesson } from "../types";
import { create5HourlyTasks } from "./month1";

const M4_TOPICS = [
  { day: 91, title: "91-kun: Amerika og'zaki nutqidagi bog'lanish va qisqartmalar (Connected Speech & Reductions)", theme: "Gonna, wanna, gotta, coulda, shoulda va tovushlarning bir-biriga ulanishi" },
  { day: 92, title: "92-kun: So'z urg'usi va gap intonatsiyasi (Word Stress & Sentence Intonation)", theme: "Gapda muhim ma'noni beruvchi so'zlarga urg'u berish va savol ohanglari" },
  { day: 93, title: "93-kun: O'tmishdagi voqeani hikoya qilish (Storytelling & Sequencing)", theme: "First, initially, after a while, unexpectedly, in the end, finally" },
  { day: 94, title: "94-kun: Past Continuous: Fon harakatlarini ifodalash (Past Continuous & Interrupted Actions)", theme: "I was driving when my phone rang. While they were working, power went out." },
  { day: 95, title: "95-kun: O'z fikrini ifodalash va asoslash (Expressing & Justifying Opinions)", theme: "In my opinion, from my perspective, the main reason is that, as far as I am concerned" },
  { day: 96, title: "96-kun: Muloyimlik bilan rozi bo'lish va e'tiroz bildirish (Agreeing & Disagreeing Politely)", theme: "I completely agree, you have a point, I see what you mean, but..." },
  { day: 97, title: "97-kun: 13-hafta takrori: Amerika 'Small Talk' san'ati (The Art of Small Talk)", theme: "Ob-havo, dam olish kunlari, sport va yo'l haqida tabiiy suhbat boshlash" },
  { day: 98, title: "98-kun: Ishxonadagi majlislar: Status va yangiliklar (Workplace Meetings & Status Updates)", theme: "Here is where we stand, we are on track, let me give you a quick update" },
  { day: 99, title: "99-kun: Ikkinchi turdagi shart ergash gaplar (Second Conditional: If + Past, Would)", theme: "If I had more free time, I would study another language. Xayoliy vaziyatlar" },
  { day: 100, title: "100-kun: Parafraza: So'zni eslay olmaganda tushuntirish (Paraphrasing & Circumlocution)", theme: "It is a device used for..., it looks like..., what I mean is..." },
  { day: 101, title: "101-kun: Audio konspekt olish va asosiy g'oyani topish (Note-Taking & Main Idea)", theme: "3-5 daqiqalik audioni eshitib kalit so'zlarni yozib olish (keywords, bullet points)" },
  { day: 102, title: "102-kun: Amerika podkastlarini tushunish strategiyalari (Understanding Podcasts)", theme: "NPR Life Kit, The Daily va qiziqarli podkastlar orqali quloqni o'rgatish" },
  { day: 103, title: "103-kun: 14-hafta takrori: Telefon orqali rasmiy muzokaralar (Professional Phone Calls)", theme: "I'm calling on behalf of..., could you transfer me to..., let me confirm that" },
  { day: 104, title: "104-kun: Ish suhbatida STAR usulini qo'llash (STAR Method in Interviews)", theme: "Situation, Task, Action, Result — savollarga tizimli javob berish" },
  { day: 105, title: "105-kun: Majhul nisbat: Passive Voice (Ish jarayonlarini tushuntirish)", theme: "Orders are processed daily. Packages were delivered on time. By + agent" },
  { day: 106, title: "106-kun: Konstruktiv fikr-mulohaza bildirish (Giving & Receiving Feedback)", theme: "I really appreciate your effort, one area for improvement is..., let's work on..." },
  { day: 107, title: "107-kun: Muammolarni jamoa bilan hal qilish (Problem-Solving & Brainstorming)", theme: "What if we try...? That could work, another alternative is..." },
  { day: 108, title: "108-kun: Tavsiyalar va maslahatlar: Ought to / Had better (Strong Advice)", theme: "You had better leave now to avoid traffic. You ought to verify the address." },
  { day: 109, title: "109-kun: 15-hafta takrori: Qisqa taqdimot qilish (Giving Short Presentations)", theme: "Today I'd like to talk about..., first let's look at..., to conclude..." },
  { day: 110, title: "110-kun: O'zbek madaniyati va taomlarini inglizcha tushuntirish (Sharing Your Culture)", theme: "O'zbek mehmondo'stligi, milliy taomlar va urf-odatlarni amerikaliklarga aytib berish" },
  { day: 111, title: "111-kun: Bog'lovchilar: Although, However, In addition, Therefore (Transition Words)", theme: "Fikrlarni mantiqiy bog'lash va nutq ravonligini oshirish" },
  { day: 112, title: "112-kun: Shaxsiy qiziqishlar va kelajak maqsadlari (Ambitions & Long-Term Goals)", theme: "My ultimate goal is to..., I am working toward obtaining a commercial license" },
  { day: 113, title: "113-kun: Savollarni yumshatish: Indirect Questions (Polite Inquiries)", theme: "Do you know where the station is? Could you tell me how much it costs?" },
  { day: 114, title: "114-kun: 16-hafta takrori: Muloqotdagi noqulay pauzalarni to'ldirish (Conversational Fillers)", theme: "Well, let me see, to be honest, you know, actually, as a matter of fact" },
  { day: 115, title: "115-kun: Radio va audioyangiliklarni tahlil qilish (Analyzing News Audio)", theme: "Yangiliklar spikeri nutq tezligiga moslashish va faktlarni ajratish" },
  { day: 116, title: "116-kun: Ko'p ma'noli iboralar: Phrasal Verbs kirish (Essential Phrasal Verbs 1)", theme: "Figure out, look forward to, give up, run into, point out" },
  { day: 117, title: "117-kun: Phrasal Verbs kirish 2 (Essential Phrasal Verbs 2)", theme: "Set up, turn down, call off, get along with, keep up with" },
  { day: 118, title: "118-kun: Kundalik hayotiy qiyinchiliklarni tasvirlash (Overcoming Daily Hurdles)", theme: "Adapting to a new country, navigating public services, building confidence" },
  { day: 119, title: "119-kun: 4-oy B1 Tinglash va Gapirish konsolidatsiyasi (Month 4 Review)", theme: "B1 darajasidagi barcha dialoglar, suhbatlar va nutq texnikalarini jamlash" },
  { day: 120, title: "120-kun: 4-oy yakuniy imtihoniga tayyorgarlik (Month 4 Exam Readiness)", theme: "B1 darajasi bo'yicha 30 savollik audio va nutq imtihoniga kirish" }
];

export const MONTH_4_LESSONS: Lesson[] = M4_TOPICS.map((topic, i) => {
  const day = topic.day;
  const week = Math.min(4, Math.floor((day - 91) / 7) + 1);

  const vocabItems = [
    { en: "figure out", uz: "yechimini topmoq / tushunib yetmoq", example: "We need to figure out how to solve this scheduling conflict.", exampleUz: "Biz ushbu jadvaldagi to'qnashuvni qanday hal qilishni tushunib olishimiz kerak.", ipaOrRespelling: "FIG-yur OWT" },
    { en: "look forward to", uz: "intiqlik bilan kutmoq", example: "I look forward to meeting your team on Monday.", exampleUz: "Dushanba kuni jamoangiz bilan uchrashishni intiqlik bilan kutyapman.", ipaOrRespelling: "LOOK FOR-wurd too" },
    { en: "perspective", uz: "nuqtai nazar / qarash", example: "From my perspective, this new system will save us time.", exampleUz: "Mening nuqtai nazarimdan, bu yangi tizim vaqtimizni tejaydi.", ipaOrRespelling: "pur-SPEK-tiv" },
    { en: "alternative", uz: "muqobil variant", example: "Do we have any alternative options if the flight is canceled?", exampleUz: "Parvoz bekor qilinsa, bizda boshqa muqobil variant bormi?", ipaOrRespelling: "awl-TUR-nuh-tiv" },
    { en: "summarize", uz: "qisqacha xulosa qilmoq", example: "Could you summarize the main points of the presentation?", exampleUz: "Taqdimotning asosiy nuqtalarini qisqacha xulosalay olasizmi?", ipaOrRespelling: "SUM-uh-ryz" },
    { en: "collaborate", uz: "hamkorlikda ishlamoq", example: "Our department collaborates closely with the logistics team.", exampleUz: "Bizning bo'limimiz logistika jamoasi bilan yaqindan hamkorlik qiladi.", ipaOrRespelling: "kuh-LAB-uh-rayt" },
    { en: "feedback", uz: "fikr-mulohaza / taqriz", example: "Thank you for the constructive feedback on my work.", exampleUz: "Mening ishim bo'yicha foydali fikr-mulohazalaringiz uchun rahmat.", ipaOrRespelling: "FEED-bak" },
    { en: "intonation", uz: "ohang / nutq musiqiyligi", example: "American English intonation rises on yes/no questions.", exampleUz: "Amerika ingliz tilida ha/yo'q savollarida ohang yuqoriga ko'tariladi.", ipaOrRespelling: "in-toh-NAY-shun" },
    { en: "obstacle", uz: "to'siq / qiyinchilik", example: "Language barrier is the first obstacle, but daily practice helps overcome it.", exampleUz: "Til to'sig'i birinchi qiyinchilik, ammo kunlik mashq uni yengishga yordam beradi.", ipaOrRespelling: "OB-stuh-kul" },
    { en: "achievement", uz: "yutuq / muvaffaqiyat", example: "Completing 100 days of study is a significant achievement.", exampleUz: "100 kunlik o'qishni yakunlash — bu katta yutuqdir.", ipaOrRespelling: "uh-CHEEV-munt" }
  ];

  return {
    id: `m4_d${day}`,
    month: 4,
    day,
    level: "B1",
    title: topic.title,
    themeUz: topic.theme,
    objectives: [
      `${topic.title} bo'yicha ravon eshitish va ifodali gapirish ko'nikmasini oshirish`,
      "Passive Voice, Second Conditional va Indirect Questions qoliplarini erkin ishlatish",
      "Ish uchrashuvlari, podkastlar va jonli suhbatlarda fikrni asoslab berish",
      "Kunlik 5 soatlik amaliy mashqlarni to'liq bajarib, testdan kamida 70% olish"
    ],
    vocabulary: vocabItems,
    grammar: {
      title: `${topic.title}: B1 Grammatika va nutq formulalari`,
      explanationUz: `Ushbu darsda siz ${topic.theme} mavzusida nutqiy ko'nikmalarni rivojlantirasiz. Amerika ingliz tilida to'g'ri intonatsiya, so'zlarni qisqartirib bog'lash (connected speech) va e'tirozni muloyim bildirish B1 darajasining asosiy talabidir.`,
      examples: [
        { en: "If I were in your position, I would discuss this with the supervisor.", uz: "Agar sizning o'rningizda bo'lganimda, buni nazoratchi bilan muhokama qilgan bo'lardim." },
        { en: "Could you tell me how long this process usually takes?", uz: "Bu jarayon odatda qancha vaqt olishini ayta olasizmi?" },
        { en: "All orders are processed and shipped within twenty-four hours.", uz: "Barcha buyurtmalar yigirma to'rt soat ichida qayta ishlanadi va jo'natiladi." },
        { en: "I see your point; however, we also need to consider the budget.", uz: "Fikringizni tushunib turibman; biroq biz byudjetni ham hisobga olishimiz kerak." }
      ]
    },
    examples: [
      { en: "I look forward to collaborating with your department on this initiative.", uz: "Ushbu tashabbus ustida bo'limingiz bilan hamkorlik qilishni sabrsizlik bilan kutyapman." },
      { en: "Let's figure out an alternative solution before the deadline.", uz: "Muddat tugashidan oldin muqobil yechim topaylik." },
      { en: "Could you summarize your key takeaways from today's workshop?", uz: "Bugungi seminardan olgan asosiy xulosalaringizni qisqacha aytib bera olasizmi?" },
      { en: "Pay close attention to how native speakers link consonant sounds to vowels.", uz: "Mahalliy so'zlashuvchilar undosh tovushlarni unlilarga qanday ulashiga diqqat qiling." },
      { en: "Constructive feedback allows our team to continuously improve.", uz: "Konstruktiv fikr-mulohaza jamoamizga doimiy rivojlanish imkonini beradi." },
      { en: "In my opinion, daily consistency is much better than studying only on weekends.", uz: "Mening fikrimcha, har kuni muntazam o'rganish faqat dam olish kunlari o'qishdan ancha samaraliroq." }
    ],
    dialogue: {
      title: `${topic.title} bo'yicha jonli suhbat`,
      lines: [
        { speaker: "Sarah (Manager)", en: "Good morning everyone. Let's do a quick round of updates. Sardor, how is your project going?", uz: "Xayrli tong barchaga. Keling, tezkor yangiliklarni eshitaylik. Sardor, loyihangiz qanday ketyapti?" },
        { speaker: "Sardor", en: "Good morning Sarah. Overall, we are on track. We ran into a small delay with supplier deliveries, but we figured out a workaround.", uz: "Xayrli tong Sara. Umuman olganda, rejaga muvofiq ketyapmiz. Yetkazib beruvchilar bilan biroz kechikish bo'ldi, ammo biz muqobil yechim topdik." },
        { speaker: "Sarah (Manager)", en: "That is great problem-solving! Do you need any extra support from the logistics team?", uz: "Bu ajoyib muammo yechimi! Logistika jamoasidan qo'shimcha yordam kerakmi?" },
        { speaker: "Sardor", en: "I appreciate the offer. From my perspective, if we maintain our current pace, we will finish testing by Thursday.", uz: "Taklifingiz uchun rahmat. Mening qarashimcha, agar hozirgi sur'atni saqlab qolsak, payshanbagacha sinovlarni yakunlaymiz." },
        { speaker: "Sarah (Manager)", en: "Excellent. Keep us posted if anything unexpected comes up.", uz: "Ajoyib. Agar biror kutilmagan holat bo'lsa xabardor qilib turing." }
      ]
    },
    tasks: create5HourlyTasks(
      topic.title,
      topic.theme,
      topic.title,
      "Daftarga bugungi mavzuda fikr-mulohaza va tahlil bo'yicha 110-150 so'zli insho",
      topic.title
    ),
    dailyQuiz: [
      {
        id: `q_m4_d${day}_1`,
        type: "mcq-translation",
        prompt: `'${vocabItems[0].en}' iborasi nimani anglatadi?`,
        options: [
          vocabItems[0].uz,
          "Rasm chizmoq",
          "Ishdan bo'shamoq",
          "Qarz olmoq"
        ],
        answer: vocabItems[0].uz,
        explanationUz: `'Figure out' — muammoning yechimini topmoq yoki biror narsani tushunib yetmoq.`
      },
      {
        id: `q_m4_d${day}_2`,
        type: "fill-blank",
        prompt: `Bo'sh joyni to'ldiring: 'I look ___ to meeting you next week.' (intiqlik bilan kutmoq - forward)`,
        answer: "forward",
        explanationUz: "'Look forward to' — intizorlik bilan kutmoq."
      },
      {
        id: `q_m4_d${day}_3`,
        type: "grammar-choice",
        prompt: "Second Conditional zamonidagi to'g'ri shaklni tanlang: 'If I ___ more time, I would read more books.'",
        options: ["had", "have", "will have", "would have"],
        answer: "had",
        explanationUz: "Second Conditional shart qismida Past Simple ('had') ishlatiladi."
      },
      {
        id: `q_m4_d${day}_4`,
        type: "mcq-translation",
        prompt: `'${vocabItems[6].en}' so'zining o'zbekcha tarjimasi nima?`,
        options: [vocabItems[6].uz, "ovqatlanish", "to'lov qog'ozi", "jazo choralari"],
        answer: vocabItems[6].uz,
        explanationUz: `'Feedback' — fikr-mulohaza, baho yoki tavsiya.`
      },
      {
        id: `q_m4_d${day}_5`,
        type: "correct-sentence",
        prompt: "Yumshatilgan so'roq (Indirect Question) tuzilishidagi to'g'ri gapni tanlang:",
        options: [
          "Could you tell me where the station is?",
          "Could you tell me where is the station?",
          "Could you tell me where does the station be?",
          "Could you tell where the station?"
        ],
        answer: "Could you tell me where the station is?",
        explanationUz: "Indirect Question'da so'z tartibi darak gapdek bo'ladi: 'where + ega + kesim'."
      },
      {
        id: `q_m4_d${day}_6`,
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'All customer orders are ___ within 24 hours.' (majhul nisbat - processed)",
        answer: "processed",
        explanationUz: "'Are processed' — qayta ishlanadi."
      },
      {
        id: `q_m4_d${day}_7`,
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
        options: ["In", "my", "opinion,", "consistency", "is", "essential."],
        answer: "In my opinion, consistency is essential.",
        explanationUz: "'In my opinion, consistency is essential.' — Mening fikrimcha, muntazamlik juda zarurdir."
      },
      {
        id: `q_m4_d${day}_8`,
        type: "grammar-choice",
        prompt: "Muloyim e'tiroz bildirish uchun qaysi ibora eng to'g'ri?",
        options: [
          "I see what you mean, but have we considered the cost?",
          "You are totally wrong and do not know anything.",
          "I refuse to listen to your idea.",
          "That is impossible and terrible."
        ],
        answer: "I see what you mean, but have we considered the cost?",
        explanationUz: "Professional va muloyim e'tiroz: 'I see what you mean, but...'."
      }
    ],
    weeklyTestId: `w_m4_${week}`,
    monthlyExamId: "exam_m4",
    resources: [
      { title: "NPR — Life Kit Podcasts (Authentic US English)", url: "https://www.npr.org/lifekit", type: "Podcast" },
      { title: "TED-Ed — Short Talks with Transcripts", url: "https://ed.ted.com", type: "Video & Transcripts" }
    ],
    speakingPrompt: `STAR usulidan foydalanib, avvalgi ish yoki o'qishingizda duch kelgan qiyinchilik va uni qanday hal qilganingiz haqida 2-3 daqiqa ovoz chiqarib gapirib bering.`,
    writingPrompt: `Biror ijtimoiy yoki ish mavzusida (masalan, masofaviy ishlash yoki ofisda ishlash) o'z fikringizni ifodalab, kamida 110-150 so'zli fikriy insho yozing.`,
    reviewItems: [`m4_d${Math.max(91, day - 1)}`, `m3_d${Math.max(61, day - 30)}`],
    summaryChecklist: [
      "B1 darajasidagi 10 ta yangi so'zni audio orqali o'zlashtirdim",
      "Muloyim e'tiroz va fikr bildirish qoliplarini qo'llay olaman",
      "5 soatlik vazifalar ketma-ketligini yakunladim",
      "Kunlik testdan kamida 70% to'pladim"
    ]
  };
});
