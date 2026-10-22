import { Lesson } from "../types";
import { buildLessonFromTopic } from "./month1";

export const M4_TOPICS = [
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
  { day: 120, title: "120-kun: 4-oy yakuniy imtihoniga tayyorgarlik (Month 4 Exam Readiness)", theme: "B1 darajasi bo'yicha 30 savollik audio va nutq imtihoniga kirish" },
];

export const MONTH_4_LESSONS: Lesson[] = M4_TOPICS.map((topic) =>
  buildLessonFromTopic(4, "B1", topic)
);
