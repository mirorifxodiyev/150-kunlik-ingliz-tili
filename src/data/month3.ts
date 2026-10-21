import { Lesson } from "../types";
import { create5HourlyTasks } from "./month1";
import { REALISTIC_SCENARIOS } from "./realisticDialogues";

const M3_TOPICS = [
  { day: 61, title: "61-kun: AQSHda ish qidirish va rezyume asoslari (Job Search & Resume Basics)", theme: "Work experience, skills, references, application form, full-time vs part-time" },
  { day: 62, title: "62-kun: Ish suhbatiga tayyorgarlik: 'Tell me about yourself' (Interview Basics)", theme: "O'zini professional tanishtirish, kuchli tomonlar va avvalgi tajriba" },
  { day: 63, title: "63-kun: Ish joyidagi ichki qoidalar va xavfsizlik (Workplace Safety & Orientation)", theme: "Clock in/out, break time, safety gear, supervisor, overtime" },
  { day: 64, title: "64-kun: Bank hisobi ochish: Checking vs Savings (Banking in the US)", theme: "Checking account, savings, routing number, account number, direct deposit" },
  { day: 65, title: "65-kun: Bank kartalari va mobil bank ilovalari (Debit Cards & Mobile Banking)", theme: "ATM, PIN, transfer money, overdraft fee, fraud alert" },
  { day: 66, title: "66-kun: Uy va kvartira qidirish (Apartment Hunting)", theme: "Studio, one-bedroom, landlord, leasing office, furnished vs unfurnished" },
  { day: 67, title: "67-kun: Ijara shartnomasi va kafillik (Lease Agreements & Security Deposit)", theme: "One-year lease, security deposit, tenant, background check, monthly rent" },
  { day: 68, title: "68-kun: Kommunal to'lovlar va internet (Utilities & Bills)", theme: "Electric, gas, water, Wi-Fi, due date, billing cycle, paperless billing" },
  { day: 69, title: "69-kun: Tibbiy sug'urta asoslari (Health Insurance: Copay & Deductible)", theme: "Monthly premium, copay, deductible, network, in-network vs out-of-network" },
  { day: 70, title: "70-kun: Urgent Care va Emergency Room (ER) farqi (Urgent Care vs ER)", theme: "Hayot uchun xavfli holatlar (ER) va shoshilinch yordam (Urgent Care) narxlari" },
  { day: 71, title: "71-kun: 9-hafta takrori: 911 favqulodda xizmatiga qo'ng'iroq (Calling 911)", theme: "Where is your emergency? Police, fire, ambulance. Aniq manzil berish" },
  { day: 72, title: "72-kun: Politsiya va yo'l harakati (Traffic Stops & Police Interactions)", theme: "License, registration, proof of insurance, stay in your car, keep hands on wheel" },
  { day: 73, title: "73-kun: Rasmiy anketalar: W-4 va I-9 shakllari (Filling Official Forms)", theme: "Social Security Number (SSN), withholding, date of birth, signature" },
  { day: 74, title: "74-kun: DMV: Haydovchilik guvohnomasini olish (DMV & Driver's License)", theme: "Written test, road test, eye exam, permit, Real ID requirements" },
  { day: 75, title: "75-kun: Mijozlarga xizmat ko'rsatish: Tovarni qaytarish (Customer Service & Returns)", theme: "Return policy, exchange, store credit, defective item, within 30 days" },
  { day: 76, title: "76-kun: Yo'qolgan posilka va kuryerlik (Tracking Packages & Deliveries)", theme: "Tracking number, delivered, delayed, missing package, file a claim" },
  { day: 77, title: "77-kun: 10-hafta takrori: Kvartira ta'mirlash so'rovi (Maintenance Requests)", theme: "Leaking sink, broken heater, maintenance technician, permission to enter" },
  { day: 78, title: "78-kun: Hamkasblar bilan ishchi muloqot (Coworker Communication)", theme: "Can you cover my shift? I will take care of this. Teamwork and deadlines" },
  { day: 79, title: "79-kun: Present Perfect: Tajriba va natijalar uchun (Present Perfect for Experience)", theme: "I have worked in logistics for two years. Have you ever been to Chicago?" },
  { day: 80, title: "80-kun: Present Perfect vs Past Simple (Tugallangan va Aniq vaqt farqi)", theme: "I have lived here since 2024 vs I moved here last year" },
  { day: 81, title: "81-kun: For va Since ko'rsatkichlari (Using For and Since)", theme: "For three months (muddat) vs Since January (boshlanish nuqtasi)" },
  { day: 82, title: "82-kun: Birinchi turdagi shart ergash gaplar (First Conditional: If + Present, Will)", theme: "If I pass the driving test, I will buy a car. If it rains, we will stay home." },
  { day: 83, title: "83-kun: Maktab va ta'lim tizimi: Ota-onalar majlisi (Schools & Parent Meetings)", theme: "Elementary, middle, high school, report card, teacher conference, bus route" },
  { day: 84, title: "84-kun: 11-hafta takrori: Rasmiy email yozish qoidalari (Professional Emails)", theme: "Dear Mr./Ms., I am writing to inquire about..., Best regards, attachment" },
  { day: 85, title: "85-kun: Soliqlar va soliq deklaratsiyasi (Taxes & W-2 Forms)", theme: "Federal tax, state tax, tax return, refund, filing deadline April 15" },
  { day: 86, title: "86-kun: Kutubxona va jamoat resurslari (Public Libraries & Community Centers)", theme: "Library card, free computer access, ESL classes, community events" },
  { day: 87, title: "87-kun: Avtomobil xaridi va sug'urtasi (Buying a Car & Auto Insurance)", theme: "Used car, title, liability insurance, comprehensive, monthly payment" },
  { day: 88, title: "88-kun: 12-hafta takrori: Tushunmovchiliklarni bartaraf etish (Clarifying & Asking to Repeat)", theme: "What did you mean by that? Could you clarify? Let me make sure I understand." },
  { day: 89, title: "89-kun: 3-oy konsolidatsiyasi: Amaliy mustaqillik (Month 3 Consolidation)", theme: "Bank, ijara, ish, tibbiyot va rasmiy hujjatlar bo'yicha to'liq mustahkamlash" },
  { day: 90, title: "90-kun: 3-oy yakuniy imtihoniga tayyorgarlik (Month 3 Exam Readiness)", theme: "A2->B1 pog'onasi bo'yicha 30 savollik katta sinovga kirish va tahlil" }
];

export const MONTH_3_LESSONS: Lesson[] = M3_TOPICS.map((topic, i) => {
  const day = topic.day;
  const week = Math.min(4, Math.floor((day - 61) / 7) + 1);

  const vocabItems = [
    { en: "application", uz: "ariza / anketa", example: "Please fill out this job application completely.", exampleUz: "Iltimos, ushbu ishga kirish arizasini to'liq to'ldiring.", ipaOrRespelling: "ap-luh-KAY-shun" },
    { en: "direct deposit", uz: "maoshning to'g'ridan-to'g'ri bank hisobiga tushishi", example: "Set up direct deposit to receive your paycheck automatically.", exampleUz: "Maoshingizni avtomatik olish uchun direct depositni ulang.", ipaOrRespelling: "duh-REKT di-POZ-it" },
    { en: "lease", uz: "ijara shartnomasi", example: "We signed a twelve-month apartment lease.", exampleUz: "Biz o'n ikki oylik kvartira ijara shartnomasini imzoladik.", ipaOrRespelling: "LEES" },
    { en: "security deposit", uz: "garov puli (kvartira uchun)", example: "The landlord asked for one month's rent as a security deposit.", exampleUz: "Uy egasi bir oylik ijara puli miqdorida garov talab qildi.", ipaOrRespelling: "si-KYOOR-uh-tee di-POZ-it" },
    { en: "deductible", uz: "sug'urta to'lovini boshlashdan oldin o'z cho'ntagingizdan to'lanadigan qism", example: "Our health insurance plan has a $1,000 annual deductible.", exampleUz: "Bizning tibbiy sug'urtamizda yillik $1,000 deductible mavjud.", ipaOrRespelling: "di-DUK-tuh-bul" },
    { en: "urgent care", uz: "shoshilinch tibbiy yordam klinikasi (hayot uchun xavfsiz holatlar)", example: "For a sprained ankle, go to urgent care instead of the ER.", exampleUz: "To'piq cho'zilganda ER ga emas, urgent care ga boring.", ipaOrRespelling: "UR-junt KAIR" },
    { en: "emergency", uz: "favqulodda holat", example: "Call 911 only in a life-threatening emergency.", exampleUz: "Faqat hayot uchun xavfli favqulodda holatda 911 ga qo'ng'iroq qiling.", ipaOrRespelling: "i-MUR-jun-see" },
    { en: "maintenance", uz: "ta'mirlash va texnik xizmat ko'rsatish", example: "Submit a maintenance request online if your heater stops working.", exampleUz: "Isitkich ishlamay qolsa, onlayn ta'mirlash so'rovi yuboring.", ipaOrRespelling: "MAYN-tuh-nuns" },
    { en: "experience", uz: "ish tajribasi", example: "I have three years of experience in warehouse management.", exampleUz: "Menda ombor boshqaruvida uch yillik ish tajribasi bor.", ipaOrRespelling: "ik-SPEER-ee-uns" },
    { en: "clarify", uz: "aniqlashtirmoq / tushuntirib bermoq", example: "Could you please clarify what time my shift begins?", exampleUz: "Mening smenam soat nechada boshlanishini aniqlashtirib bera olasizmi?", ipaOrRespelling: "KLAIR-uh-fy" }
  ];

  const custom = REALISTIC_SCENARIOS[day];
  const finalDialogue = custom?.dialogue || {
    title: `${topic.title} mavzusida amaliy suhbat`,
    lines: [
      { speaker: "Leasing Agent", en: "Good morning! Are you here to look at the two-bedroom apartment?", uz: "Xayrli tong! Ikki xonali kvartirani ko'rishga keldingizmi?" },
      { speaker: "Farrux", en: "Yes, exactly. Could you tell me what the monthly rent includes?", uz: "Ha, aynan shunday. Oylik ijara puli o'z ichiga nimalarni olishini ayta olasizmi?" },
      { speaker: "Leasing Agent", en: "Water and trash are included. Electricity and Wi-Fi are the tenant's responsibility.", uz: "Suv va chiqindi ichiga kiradi. Elektr va Wi-Fi ijarachining mas'uliyati." },
      { speaker: "Farrux", en: "That sounds fair. What is the security deposit amount?", uz: "Bu maqbul. Garov puli (security deposit) miqdori qancha?" },
      { speaker: "Leasing Agent", en: "It is one month's rent, fully refundable if the apartment is kept in good condition.", uz: "Bir oylik ijara miqdorida, agar kvartira yaxshi holatda saqlansa to'liq qaytariladi." },
      { speaker: "Farrux", en: "Understood. How long does the background check usually take?", uz: "Tushunarli. Ma'lumotlarni tekshirish (background check) odatda qancha vaqt oladi?" },
      { speaker: "Leasing Agent", en: "Typically two to three business days once you submit the application.", uz: "Arizani topshirishingiz bilan odatda ikki-uch ish kuni davom etadi." }
    ]
  };
  const finalVocab = custom?.vocabulary || vocabItems;
  const finalSpeakingPrompt = custom?.speakingPrompt || `Bank xodimi yoki kvartira ijarasi bo'limi agenti bilan 2-3 daqiqa davomida savol-javob qilayotganingizni tasavvur qilib, ovoz chiqarib gapiring.`;

  return {
    id: `m3_d${day}`,
    month: 3,
    day,
    level: "A2 -> B1",
    title: topic.title,
    themeUz: topic.theme,
    objectives: [
      `${topic.title} bo'yicha AQSHdagi rasmiy va amaliy hayotiy leksikani bilish`,
      "Present Perfect, First Conditional va rasmiy muloqot qoliplarini qo'llay olish",
      "Kvartira ijarasi, bank xizmatlari va shifoxonada mustaqil ish ko'ra olish",
      "Kunlik 5 soatlik vazifalarni to'liq yakunlab, testdan kamida 70% olish"
    ],
    vocabulary: finalVocab,
    grammar: {
      title: `${topic.title}: Rasmiy va amaliy grammatika qoidasi`,
      explanationUz: `Ushbu darsda siz ${topic.theme} mavzusini professional darajada o'rganasiz. AQSHda rasmiy anketalar to'ldirish, ish beruvchiga o'z tajribangizni bildirish (Present Perfect) va shartli takliflar bildirish (First Conditional) amaliy mustaqillik garovidir.`,
      examples: [
        { en: "I have lived in this apartment complex for six months.", uz: "Men bu turar-joy majmuasida olti oydan beri yashab kelyapman." },
        { en: "If you sign the lease today, you will get the first week free.", uz: "Agar shartnomani bugun imzolangiz, birinchi haftani bepul olasiz." },
        { en: "Have you ever set up direct deposit with your bank?", uz: "Bank hisobingizga direct deposit ulaganmisiz?" },
        { en: "We must submit the tax form before the April deadline.", uz: "Aprel muddatidan oldin soliq shaklini topshirishimiz shart." }
      ]
    },
    examples: [
      { en: "I would like to apply for the warehouse associate position.", uz: "Men ombor xodimi lavozimiga ariza topshirmoqchi edim." },
      { en: "Here is my routing number and checking account number for direct deposit.", uz: "Mana direct deposit uchun bank marshrut raqami va hisob raqamim." },
      { en: "The apartment lease requires a sixty-day notice before moving out.", uz: "Kvartira shartnomasi ko'chib ketishdan oldin 60 kunlik ogohlantirishni talab qiladi." },
      { en: "Our doctor is in-network, so the copay is only twenty dollars.", uz: "Shifokorimiz sug'urta tarmog'iga kiradi, shuning uchun copay bor-yo'g'i yigirma dollar." },
      { en: "If you hear sirens, pull your car over to the right and stop.", uz: "Agar sirena ovozini eshitsangiz, mashinangizni o'ngga olib to'xtang." },
      { en: "I submitted a maintenance request for the kitchen faucet yesterday.", uz: "Kecha oshxona jo'mragi uchun ta'mirlash arizasini topshirdim." }
    ],
    dialogue: finalDialogue,
    tasks: create5HourlyTasks(
      topic.title,
      topic.theme,
      topic.title,
      "Daftarga amaliy rasmiy xat yoki vaziyat yuzasidan 100-140 so'zli matn",
      topic.title
    ),
    dailyQuiz: [
      {
        id: `q_m3_d${day}_1`,
        type: "mcq-translation",
        prompt: `'${vocabItems[1].en}' atamasi nimani anglatadi?`,
        options: [
          vocabItems[1].uz,
          "Kassadan naqd pul yechish",
          "Kvartira ijarasini to'lash",
          "Kredit reytingini tekshirish"
        ],
        answer: vocabItems[1].uz,
        explanationUz: `'Direct deposit' — oylik maoshni to'g'ridan-to'g'ri bank hisobingizga o'tkazish tizimi.`
      },
      {
        id: `q_m3_d${day}_2`,
        type: "fill-blank",
        prompt: `Bo'sh joyni to'ldiring: 'We signed a one-year apartment ___ yesterday.' (ijara shartnomasi)`,
        answer: "lease",
        explanationUz: "'Lease' — ko'chmas mulk ijara shartnomasi."
      },
      {
        id: `q_m3_d${day}_3`,
        type: "grammar-choice",
        prompt: "Present Perfect zamonidagi to'g'ri shaklni tanlang: 'I ___ in this city for two years.'",
        options: ["have lived", "lived ago", "am living yesterday", "was live"],
        answer: "have lived",
        explanationUz: "Davom etib kelayotgan tajriba va holat uchun 'have/has + V3' (have lived) ishlatiladi."
      },
      {
        id: `q_m3_d${day}_4`,
        type: "mcq-translation",
        prompt: `'${vocabItems[4].en}' so'zining sug'urtadagi ma'nosi nima?`,
        options: [
          vocabItems[4].uz,
          "Barcha xarajatlarni to'liq qoplaydigan bepul karta",
          "Avtomobil jarimasi",
          "Shifoxona xonasining narxi"
        ],
        answer: vocabItems[4].uz,
        explanationUz: `'Deductible' — sug'urta kompaniyasi xarajatlarni to'lashni boshlashdan oldin bemor o'z cho'ntagidan to'lashi shart bo'lgan yillik miqdor.`
      },
      {
        id: `q_m3_d${day}_5`,
        type: "correct-sentence",
        prompt: "First Conditional qoidasiga to'g'ri keladigan gapni tanlang:",
        options: [
          "If you sign the lease today, you will get the first week free.",
          "If you will sign the lease today, you get the first week free.",
          "If you signed the lease today, you will getting the first week free.",
          "If you sign the lease today, you got free."
        ],
        answer: "If you sign the lease today, you will get the first week free.",
        explanationUz: "First Conditional: 'If + Present Simple, Future Simple (will + V1)'."
      },
      {
        id: `q_m3_d${day}_6`,
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Could you please ___ what time my shift begins?' (aniqlashtirmoq - clarify)",
        answer: "clarify",
        explanationUz: "'Clarify' — masalaga aniqlik kiritmoq."
      },
      {
        id: `q_m3_d${day}_7`,
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
        options: ["Please", "fill", "out", "this", "application", "form."],
        answer: "Please fill out this application form.",
        explanationUz: "'Fill out an application form' — arizani to'ldirmoq."
      },
      {
        id: `q_m3_d${day}_8`,
        type: "grammar-choice",
        prompt: "For yoki Since: 'She has been working here ___ January.'",
        options: ["since", "for", "during", "while"],
        answer: "since",
        explanationUz: "Boshlanish nuqtasi (January) bilan 'since' ishlatiladi."
      }
    ],
    weeklyTestId: `w_m3_${week}`,
    monthlyExamId: "exam_m3",
    resources: [
      { title: "Consumer Financial Protection Bureau (CFPB) — Banking Basics", url: "https://www.consumerfinance.gov", type: "US Gov Portal" },
      { title: "USA.gov — Housing & Tenant Rights Guide", url: "https://www.usa.gov", type: "Official US Guide" }
    ],
    speakingPrompt: finalSpeakingPrompt,
    writingPrompt: `Ijara beruvchi kompaniyaga kvartirangizdagi muammo (masalan, issiq suv yoki isitkich) yuzasidan 100-140 so'zli rasmiy xat (maintenance request) yozing.`,
    reviewItems: [`m3_d${Math.max(61, day - 1)}`, `m2_d${Math.max(31, day - 30)}`],
    summaryChecklist: [
      "AQSHdagi amaliy va rasmiy atamalardan 10 tasini to'liq yodladim",
      "Present Perfect va First Conditional gaplarini to'g'ri tuza oldim",
      "5 soatlik vazifalar blokini yakunladim",
      "Kunlik testdan kamida 70% natijaga erishdim"
    ]
  };
});
