import { QuizQuestion, Test } from "../types";

export function generateTestQuestions(
  prefix: string,
  count: number,
  topicTitle: string
): QuizQuestion[] {
  const baseQuestions: QuizQuestion[] = [
    {
      id: `${prefix}_q1`,
      type: "mcq-translation",
      prompt: `'Hello' so'zining o'zbekcha tarjimasi nima?`,
      options: ["Salom", "Xayr", "Rahmat", "Iltimos"],
      answer: "Salom",
      explanationUz: "'Hello' — Salom."
    },
    {
      id: `${prefix}_q2`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'I ___ from Uzbekistan.' (am)",
      answer: "am",
      explanationUz: "'I am from Uzbekistan'."
    },
    {
      id: `${prefix}_q3`,
      type: "grammar-choice",
      prompt: "To'g'ri ko'rsatish olmoshini tanlang: '___ is my passport.' (Yaqindagi bitta narsa)",
      options: ["This", "These", "Those", "There"],
      answer: "This",
      explanationUz: "Yaqindagi birlik uchun 'This' ishlatiladi."
    },
    {
      id: `${prefix}_q4`,
      type: "mcq-translation",
      prompt: "'Direct deposit' nimani bildiradi?",
      options: [
        "Maoshning to'g'ridan-to'g'ri bank hisobiga tushishi",
        "Kassadan naqd pul olish",
        "Ijara shartnomasini bekor qilish",
        "Sug'urta badali to'lash"
      ],
      answer: "Maoshning to'g'ridan-to'g'ri bank hisobiga tushishi",
      explanationUz: "'Direct deposit' — maoshni avtomatik bank hisobiga tushirish."
    },
    {
      id: `${prefix}_q5`,
      type: "correct-sentence",
      prompt: "Qaysi gap grammatik jihatdan to'g'ri tuzilgan?",
      options: [
        "She works in New York City.",
        "She work in New York City.",
        "She working in New York City yesterday.",
        "She are in New York City."
      ],
      answer: "She works in New York City.",
      explanationUz: "Uchinchi shaxs birlikda fe'lga -s qo'shiladi: 'works'."
    },
    {
      id: `${prefix}_q6`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'Could you please ___ that?' (takrorlamoq - repeat)",
      answer: "repeat",
      explanationUz: "'Repeat' — takrorlamoq."
    },
    {
      id: `${prefix}_q7`,
      type: "sentence-order",
      prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
      options: ["What", "is", "your", "name?"],
      answer: "What is your name?",
      explanationUz: "So'roq gap tartibi: What is your name?"
    },
    {
      id: `${prefix}_q8`,
      type: "mcq-translation",
      prompt: "'Mortgage' so'zidagi qaysi harf talaffuz qilinmaydi va u nima?",
      options: [
        "'t' harfi o'qilmaydi — Ipoteka krediti",
        "'m' harfi o'qilmaydi — Avto kredit",
        "'r' harfi o'qilmaydi — Soliq",
        "'g' harfi o'qilmaydi — Ijara"
      ],
      answer: "'t' harfi o'qilmaydi — Ipoteka krediti",
      explanationUz: "'Mortgage' so'zida 't' harfi umuman talaffuz qilinmaydi."
    },
    {
      id: `${prefix}_q9`,
      type: "grammar-choice",
      prompt: "O'tgan zamondagi to'g'ri so'roq shaklini tanlang: '___ you see him yesterday?'",
      options: ["Did", "Do", "Have", "Were"],
      answer: "Did",
      explanationUz: "Past Simple umumiy so'rog'ida 'Did' ishlatiladi."
    },
    {
      id: `${prefix}_q10`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'They saved for a 20% ___ payment.' (boshlang'ich to'lov - down)",
      answer: "down",
      explanationUz: "'Down payment' — boshlang'ich to'lov."
    },
    {
      id: `${prefix}_q11`,
      type: "mcq-translation",
      prompt: "'Figure out' iborasining ma'nosi nima?",
      options: [
        "Yechimini topmoq / tushunib yetmoq",
        "Rasm chizmoq",
        "Bekor qilmoq",
        "Uxlamoq"
      ],
      answer: "Yechimini topmoq / tushunib yetmoq",
      explanationUz: "'Figure out' — muammoni hal qilmoq / tushunib olmoq."
    },
    {
      id: `${prefix}_q12`,
      type: "correct-sentence",
      prompt: "Qaysi gapda sifatning qiyosiy darajasi to'g'ri qo'llangan?",
      options: [
        "This apartment is bigger than that one.",
        "This apartment is more big than that one.",
        "This apartment is most big than that one.",
        "This apartment bigger that one."
      ],
      answer: "This apartment is bigger than that one.",
      explanationUz: "Bir bo'g'inli sifatlarda -er qo'shiladi: 'bigger than'."
    },
    {
      id: `${prefix}_q13`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'I have lived here ___ two years.' (davomida - for)",
      answer: "for",
      explanationUz: "Vaqt davomiyligi uchun 'for' ishlatiladi."
    },
    {
      id: `${prefix}_q14`,
      type: "mcq-translation",
      prompt: "'Urgent Care' klinikasi nima uchun mo'ljallangan?",
      options: [
        "Hayot uchun xavfli bo'lmagan shoshilinch tibbiy yordam uchun",
        "Faqat yurak operatsiyalari uchun",
        "Faqat dori sotib olish uchun",
        "Faqat avtomobil sug'urtasi uchun"
      ],
      answer: "Hayot uchun xavfli bo'lmagan shoshilinch tibbiy yordam uchun",
      explanationUz: "'Urgent Care' — tez tibbiy yordam (ER ga qaraganda ancha arzon)."
    },
    {
      id: `${prefix}_q15`,
      type: "grammar-choice",
      prompt: "First Conditional qoidasiga ko'ra to'ldiring: 'If you work hard, you ___ succeed.'",
      options: ["will", "would", "had", "are"],
      answer: "will",
      explanationUz: "First Conditional: 'If + Present, Will + V1'."
    },
    {
      id: `${prefix}_q16`,
      type: "correct-sentence",
      prompt: "Qaysi gap grammatik jihatdan to'g'ri?",
      options: [
        "Could you please tell me where the station is?",
        "Could you please tell me where is the station?",
        "Could you please tell me where does the station?",
        "Could you please tell where the station?"
      ],
      answer: "Could you please tell me where the station is?",
      explanationUz: "Yumshatilgan so'roq gaplarda 'where + ega + kesim' tartibi saqlanadi."
    }
  ];

  // If exam needs 30 questions, expand with additional rich questions
  const extraQuestions: QuizQuestion[] = [
    {
      id: `${prefix}_q17`,
      type: "mcq-translation",
      prompt: "'Outweigh' fe'lining ma'nosi nima?",
      options: ["Ustun kelmoq / bosib ketmoq", "Teng bo'lmoq", "Yo'qolmoq", "Tushib qolmoq"],
      answer: "Ustun kelmoq / bosib ketmoq",
      explanationUz: "'Outweigh' — foyda yoki ahamiyat jihatidan ustun kelmoq."
    },
    {
      id: `${prefix}_q18`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'First and ___, make sure everyone is safe.' (foremost)",
      answer: "foremost",
      explanationUz: "'First and foremost' — birinchi navbatda, eng avvalo."
    },
    {
      id: `${prefix}_q19`,
      type: "grammar-choice",
      prompt: "Bog'lovchini tanlang: '___ the heavy traffic, we arrived on time.'",
      options: ["Despite", "Although", "Whereas", "Despite of"],
      answer: "Despite",
      explanationUz: "Otli birikma oldidan 'Despite' keladi."
    },
    {
      id: `${prefix}_q20`,
      type: "mcq-translation",
      prompt: "'Itemized bill' nimani anglatadi?",
      options: [
        "Har bir xizmat va dori alohida ko'rsatilgan batafsil hisob-faktura",
        "Jarima qog'ozi",
        "Oylik maosh varaqasi",
        "Yo'l chiptasi"
      ],
      answer: "Har bir xizmat va dori alohida ko'rsatilgan batafsil hisob-faktura",
      explanationUz: "'Itemized bill' — batafsil hisob."
    },
    {
      id: `${prefix}_q21`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'Keep your credit utilization below 30% to build your ___ score.' (credit)",
      answer: "credit",
      explanationUz: "'Credit score' — kredit reytingi."
    },
    {
      id: `${prefix}_q22`,
      type: "correct-sentence",
      prompt: "Qo'shaloq qiyosiy darajadagi to'g'ri jumlani tanlang:",
      options: [
        "The higher your credit score, the lower your interest rate will be.",
        "The higher your credit score, the lowest your interest rate will be.",
        "The highest your credit score, the lower your interest rate.",
        "Higher your credit score, lower your interest rate."
      ],
      answer: "The higher your credit score, the lower your interest rate will be.",
      explanationUz: "'The higher..., the lower...' qolipi."
    },
    {
      id: `${prefix}_q23`,
      type: "mcq-translation",
      prompt: "'Under no circumstances' iborasi qanday ma'noni ifodalaydi?",
      options: [
        "Hech qanday holatda ham (qat'iy taqiq)",
        "Har qanday sharoitda",
        "Ba'zan",
        "Iloji boricha"
      ],
      answer: "Hech qanday holatda ham (qat'iy taqiq)",
      explanationUz: "'Under no circumstances' — qat'iy inkor va ogohlantirish."
    },
    {
      id: `${prefix}_q24`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'No legitimate government agency will ever demand payment in ___ cards.' (sovg'a - gift)",
      answer: "gift",
      explanationUz: "'Gift cards' — sovg'a kartalari."
    },
    {
      id: `${prefix}_q25`,
      type: "grammar-choice",
      prompt: "Second Conditional tuzilishini tanlang: 'If I were you, I ___ accept the job offer.'",
      options: ["would", "will", "am", "have"],
      answer: "would",
      explanationUz: "Second Conditional: 'If I were you, I would...'."
    },
    {
      id: `${prefix}_q26`,
      type: "sentence-order",
      prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
      options: ["Consistency", "is", "the", "key", "to", "success."],
      answer: "Consistency is the key to success.",
      explanationUz: "'Consistency is the key to success.' — Muntazamlik muvaffaqiyat garovidir."
    },
    {
      id: `${prefix}_q27`,
      type: "mcq-translation",
      prompt: "'Constructive feedback' iborasi nimani bildiradi?",
      options: [
        "Rivojlantiruvchi va foydali fikr-mulohaza",
        "Qo'pol tanqid",
        "Qurilish smetasi",
        "Ishdan bo'shatish to'g'risidagi buyruq"
      ],
      answer: "Rivojlantiruvchi va foydali fikr-mulohaza",
      explanationUz: "'Constructive feedback' — foydali maslahat va tahlil."
    },
    {
      id: `${prefix}_q28`,
      type: "fill-blank",
      prompt: "Bo'sh joyni to'ldiring: 'For the most ___, our team completed all tasks.' (part)",
      answer: "part",
      explanationUz: "'For the most part' — asosan, ko'p jihatdan."
    },
    {
      id: `${prefix}_q29`,
      type: "correct-sentence",
      prompt: "Qaysi gapda Passive Voice to'g'ri qo'llangan?",
      options: [
        "All applications are reviewed by the admissions team.",
        "All applications reviewed by the admissions team yesterday ago.",
        "All applications are reviewing by team.",
        "All applications is reviewed by team."
      ],
      answer: "All applications are reviewed by the admissions team.",
      explanationUz: "'Applications' ko'plik bo'lgani uchun 'are reviewed' to'g'ri."
    },
    {
      id: `${prefix}_q30`,
      type: "grammar-choice",
      prompt: "O'tgan zamondagi afsusni bildirish: 'We ___ the contract more carefully.'",
      options: ["should have read", "should read", "must read", "could reading"],
      answer: "should have read",
      explanationUz: "'Should have + V3' — o'tmishda qilish kerak edi, ammo qilinmadi."
    }
  ];

  const pool = [...baseQuestions, ...extraQuestions];
  return pool.slice(0, count);
}

export const ALL_TESTS: Record<string, Test> = {};

// Generate 20 weekly tests
for (let m = 1; m <= 5; m++) {
  for (let w = 1; w <= 4; w++) {
    const id = `w_m${m}_${w}`;
    const afterDayInMonth = w * 7;
    const questionsCount = 16;
    ALL_TESTS[id] = {
      id,
      month: m,
      week: w,
      afterDayInMonth,
      title: `${m}-oy, ${w}-haftalik nazorat testi (${(m - 1) * 30 + (w - 1) * 7 + 1}–${(m - 1) * 30 + w * 7}-kunlar)`,
      passingScore: 70,
      questions: generateTestQuestions(`wt_m${m}_w${w}`, questionsCount, `${m}-oy ${w}-hafta`)
    };
  }
}

// Generate 5 monthly exams (30 questions each!)
for (let m = 1; m <= 5; m++) {
  const id = `exam_m${m}`;
  const examTitles: Record<number, string> = {
    1: "1-oy Katta Yakuniy Imtihoni: A1 Poydevor (Foundations)",
    2: "2-oy Katta Yakuniy Imtihoni: A2 Kundalik Muloqot (Everyday English)",
    3: "3-oy Katta Yakuniy Imtihoni: A2 -> B1 Amaliy Mustaqillik (Independence)",
    4: "4-oy Katta Yakuniy Imtihoni: B1 Tinglash va Gapirish (Listening & Speaking)",
    5: "5-oy Katta Yakuniy Imtihoni: B1 -> B2 Rivojlanish va AQSH Hayoti (Capstone Exam)"
  };

  ALL_TESTS[id] = {
    id,
    month: m,
    afterDayInMonth: 30,
    title: examTitles[m] || `${m}-oylik imtihon`,
    passingScore: 70,
    questions: generateTestQuestions(`ex_m${m}`, 30, `${m}-oy yakuniy imtihoni`)
  };
}
