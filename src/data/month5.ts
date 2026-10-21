import { Lesson } from "../types";
import { create5HourlyTasks } from "./month1";

const M5_TOPICS = [
  { day: 121, title: "121-kun: Amerika muloqot madaniyati va ochiqlik (American Directness & Etiquette)", theme: "Direct communication, personal space, eye contact, punctuality, small gifts" },
  { day: 122, title: "122-kun: Ijarachi huquqlari va depozitni qaytarish (Tenant Rights & Security Deposits)", theme: "Normal wear and tear, move-out inspection, return window, certified mail" },
  { day: 123, title: "123-kun: Kredit tarixi va FICO reytingini qurish (Building Credit History from Scratch)", theme: "Credit score, secured card, credit utilization, on-time payments, hard inquiry" },
  { day: 124, title: "124-kun: Avtomobil xaridi: Financing vs Leasing (Buying a Car: Loan vs Lease)", theme: "APR, down payment, monthly installment, warranty, depreciation, mileage limit" },
  { day: 125, title: "125-kun: 17-hafta takrori: Choypuli madaniyati va hisob-kitoblar (Tipping Culture & Dining)", theme: "Suggested tip percentages, service charge, splitting the bill, gratuity" },
  { day: 126, title: "126-kun: Kasbiy frazeologik fe'llar (Professional Phrasal Verbs in Context)", theme: "Touch base, follow up on, run out of, back up, bring up in a meeting" },
  { day: 127, title: "127-kun: Kundalik hayotiy idiomalar (Common Everyday Idioms)", theme: "On the same page, bite the bullet, cut corners, break the ice, call it a day" },
  { day: 128, title: "128-kun: Muloqotdagi idiomalar va nozik iboralar (Idioms in Communication)", theme: "Walk on eggshells, play it by ear, touch and go, clear the air" },
  { day: 129, title: "129-kun: O'tgan zamon modal fe'llari: Should have / Could have (Regrets & Speculation)", theme: "I should have read the contract. They could have called earlier." },
  { day: 130, title: "130-kun: Ishonch bildirish: 'Benefit of the Doubt' (Workplace Trust)", theme: "Give the benefit of the doubt, assume good intentions, clear misunderstandings" },
  { day: 131, title: "131-kun: Amerika mintaqaviy talaffuzlari va shevalari (Regional Accents & Slang)", theme: "Southern drawl, New York accent, Midwest pop vs soda, y'all, wicked, folks" },
  { day: 132, title: "132-kun: Uzun audio va yangiliklar tili (News, NPR & Documentaries)", theme: "It is reported that, according to officials, estimated, coverage, legislation" },
  { day: 133, title: "133-kun: Murakkab fikr bildirish va madaniyatli bahs (Complex Opinions & Debates)", theme: "Despite / In spite of, whereas, on the one hand... on the other hand, outweigh" },
  { day: 134, title: "134-kun: 18-hafta takrori: Ishdagi ziddiyatlarni hal qilish (Conflict Resolution)", theme: "I noticed that, moving forward, clarify roles, resolve privately, avoid escalation" },
  { day: 135, title: "135-kun: AQSH tibbiyot tizimi va hisob-kitoblar (Healthcare & Medical Billing)", theme: "Primary care vs urgent care vs ER, Explanation of Benefits (EOB), itemized bill" },
  { day: 136, title: "136-kun: Huquqiy asoslar va firibgarlikdan himoya (Legal Basics & Scam Prevention)", theme: "Identity theft, IRS phone scams, phishing, under no circumstances, fine print" },
  { day: 137, title: "137-kun: Karyera o'sishi va maosh muzokaralari (Career Advancement & Negotiations)", theme: "Performance review, promotion, raise, track record, transferable skills, mentor" },
  { day: 138, title: "138-kun: Uy sotib olish va uzoq muddatli moliya (Homebuying & Long-Term Finance)", theme: "Mortgage, down payment, 401(k) employer match, emergency fund, the more... the more..." },
  { day: 139, title: "139-kun: B2 Gapirish: Murakkab parafraza va 'Hedging' (Advanced Paraphrasing & Nuance)", theme: "Tend to, to some extent, for the most part, essentially, in other words" },
  { day: 140, title: "140-kun: 19-hafta takrori: Ko'p bosqichli muammolarni hal qilish (Multi-Step Problem Solving)", theme: "First and foremost, in the meantime, workaround, contingency plan, sorted out" },
  { day: 141, title: "141-kun: Uchinchi turdagi shart ergash gaplar (Third Conditional: Past Hypotheticals)", theme: "If I had known about the traffic, I would have left earlier. O'tmishdagi farazlar" },
  { day: 142, title: "142-kun: Murakkab majhul nisbat va hisobotlar (Advanced Passive & Reporting)", theme: "It is believed that, has been proven, results are expected to improve" },
  { day: 143, title: "143-kun: Ommaviy nutq va auditoriya oldida chiqish (Public Speaking & Presentation Skills)", theme: "Hook, roadmap, transition phrases, engaging the audience, handling Q&A" },
  { day: 144, title: "144-kun: Madaniy moslashuv va psixologik chidamlilik (Cultural Adaptation & Resilience)", theme: "Culture shock stages, homesickness, building local community, staying motivated" },
  { day: 145, title: "145-kun: 20-hafta takrori: Murakkab matnlar va rasmiy yozishmalar (Advanced Writing)", theme: "Formal letters, contesting fees, petitioning for exceptions, executive summary" },
  { day: 146, title: "146-kun: A1-A2-B1-B2 Grammatika xaritasi: To'liq sinxronlash (Grammar Synthesis)", theme: "Barcha 12 ta zamon, modal fe'llar, barcha shart gaplar va bog'lovchilar tizimi" },
  { day: 147, title: "147-kun: 1500 ta faol so'z boyligi auditi (Active Vocabulary Mastery)", theme: "Kundalik, kasbiy va rasmiy leksikani tezkor xotiradan chaqirish mashqlari" },
  { day: 148, title: "148-kun: Real hayotiy sinov: Mustaqil 24 soat AQSHda (24-Hour Life Simulation)", theme: "Aeroport, ijara, ish, bank, do'kon va do'stlar davrasida mustaqil til qo'llash" },
  { day: 149, title: "149-kun: Mustaqil ta'lim va umrbod rivojlanish rejasi (Lifelong Learning & Next Goals)", theme: "Kitoblar, podkastlar, kasbiy litsenziyalar va o'z ustida mustaqil ishlash strategiyasi" },
  { day: 150, title: "150-kun: Yakuniy B2 Oylik Katta Imtihonga kirish (Month 5 & Full Program Capstone)", theme: "150 kunlik kursning to'liq yakuni, 30 savollik katta sinov va natijalar tahlili" }
];

export const MONTH_5_LESSONS: Lesson[] = M5_TOPICS.map((topic, i) => {
  const day = topic.day;
  const week = Math.min(4, Math.floor((day - 121) / 7) + 1);

  const vocabItems = [
    { en: "mortgage", uz: "ipoteka krediti ('t' harfi o'qilmaydi: MOR-gij)", example: "We applied for a thirty-year fixed-rate mortgage.", exampleUz: "Biz 30 yillik o'zgarmas stavkali ipoteka kreditiga ariza topshirdik.", ipaOrRespelling: "MOR-gij" },
    { en: "down payment", uz: "boshlang'ich to'lov", example: "They saved for three years to make a 20% down payment on a house.", exampleUz: "Ular uy uchun 20% boshlang'ich to'lov qilishga 3 yil pul yig'ishdi.", ipaOrRespelling: "DOWN PAY-munt" },
    { en: "credit score", uz: "kredit reytingi (AQSHda 300 dan 850 gacha)", example: "A credit score above 740 qualifies you for the best interest rates.", exampleUz: "740 dan yuqori kredit reytingi eng past foiz stavkalarini olishga imkon beradi.", ipaOrRespelling: "KRED-it SKOR" },
    { en: "itemized bill", uz: "batafsil hisob-faktura (har bir xizmat alohida)", example: "Always request an itemized bill from the hospital billing department.", exampleUz: "Har doim kasalxona hisob-kitob bo'limidan batafsil hisobni so'rang.", ipaOrRespelling: "Y-tuh-myzd BIL" },
    { en: "constructive", uz: "konstruktiv / foydali va rivojlantiruvchi", example: "Effective leaders provide constructive feedback to help employees grow.", exampleUz: "Samarali yetakchilar xodimlarning o'sishi uchun konstruktiv fikr-mulohaza beradilar.", ipaOrRespelling: "kun-STRUK-tiv" },
    { en: "outweigh", uz: "ustun kelmoq / bosib ketmoq", example: "In my opinion, the long-term benefits clearly outweigh the initial costs.", exampleUz: "Mening fikrimcha, uzoq muddatli foydalar dastlabki xarajatlardan yaqqol ustun keladi.", ipaOrRespelling: "owt-WAY" },
    { en: "legitimate", uz: "qonuniy / haqiqiy", example: "No legitimate government agency will ever demand payment in gift cards.", exampleUz: "Hech bir qonuniy davlat idorasi sovg'a kartalarida to'lov talab qilmaydi.", ipaOrRespelling: "luh-JIT-uh-mit" },
    { en: "promotion", uz: "lavozimda ko'tarilish", example: "She received a well-deserved promotion to team supervisor.", exampleUz: "U jamoa nazoratchisi lavozimiga munosib ravishda ko'tarildi.", ipaOrRespelling: "pruh-MOH-shun" },
    { en: "tend to", uz: "odatda moyil bo'lmoq", example: "Public transit prices tend to be cheaper than owning and parking a car.", exampleUz: "Jamoat transporti narxlari mashinaga egalik qilish va qo'yishdan arzonroq bo'lishga moyil.", ipaOrRespelling: "TEND too" },
    { en: "first and foremost", uz: "eng avvalo / birinchi navbatda", example: "First and foremost, make sure everyone in the vehicle is safe.", exampleUz: "Eng avvalo, mashinadagi hamma xavfsiz ekanligiga ishonch hosil qiling.", ipaOrRespelling: "FURST and FOR-mohst" }
  ];

  return {
    id: `m5_d${day}`,
    month: 5,
    day,
    level: "B1 -> B2",
    title: topic.title,
    themeUz: topic.theme,
    objectives: [
      `${topic.title} doirasida B1->B2 darajadagi nozik ma'no va frazalarni o'zlashtirish`,
      "Uchinchi turdagi shart gaplar, Hedging va diplomatik tildan erkin foydalanish",
      "Kredit, ipoteka, tibbiyot tizimi va karyera o'sishida to'liq mustaqillikka erishish",
      "Kunlik 5 soatlik amaliy mashqlarni to'liq bajarib, testdan kamida 70% to'plash"
    ],
    vocabulary: vocabItems,
    grammar: {
      title: `${topic.title}: B2 Darajadagi grammatik tizim`,
      explanationUz: `Ushbu darsda siz ${topic.theme} mavzusida chuqur bilim olasiz. Amerika jamiyatida huquqiy shartnomalar, moliyaviy qarorlar va kasbiy yetakchilikda diplomatik va aniq til vositalari (hedging, comparative inversion, conditional structures) juda muhim.`,
      examples: [
        { en: "The higher your credit score is, the lower your interest rate will be.", uz: "Kredit reytingingiz qanchalik yuqori bo'lsa, foiz stavkangiz shunchalik past bo'ladi." },
        { en: "If I had known about the penalty, I would not have broken the lease early.", uz: "Agar jarima haqida bilganimda edi, shartnomani muddatidan oldin bekor qilmagan bo'lardim." },
        { en: "Under no circumstances should you share your Social Security number over the phone.", uz: "Hech qanday holatda telefon orqali SSN raqamingizni bermasligingiz kerak." },
        { en: "For the most part, our team has achieved all quarterly objectives.", uz: "Asosan, jamoamiz choraklik barcha maqsadlarga erishdi." }
      ]
    },
    examples: [
      { en: "Remember that the letter 't' in 'mortgage' is completely silent.", uz: "'Mortgage' so'zidagi 't' harfi umuman talaffuz qilinmasligini unutmang." },
      { en: "He negotiated a fifteen percent raise based on his proven track record.", uz: "U o'zining isbotlangan ijobiy natijalariga asoslanib 15 foizlik maosh oshirilishiga erishdi." },
      { en: "Always ask for an itemized bill before paying any high hospital charge.", uz: "Katta kasalxona to'lovini to'lashdan oldin doim har bir bandi ko'rsatilgan hisobni so'rang." },
      { en: "First and foremost, freeze your bank card through the app if your wallet is missing.", uz: "Eng avvalo, hamyoningiz yo'qolsa ilova orqali bank kartangizni muzlatib qo'ying." },
      { en: "In my opinion, the long-term career benefits clearly outweigh the initial difficulties.", uz: "Mening fikrimcha, uzoq muddatli karyera foydalari dastlabki qiyinchiliklardan aniq ustun turadi." },
      { en: "Keep your credit card utilization under ten percent to rapidly build your credit score.", uz: "Kredit reytingingizni tez oshirish uchun kredit karta limitidan foydalanishni 10% dan past saqlang." }
    ],
    dialogue: {
      title: `${topic.title} bo'yicha yuqori darajadagi muloqot`,
      lines: [
        { speaker: "Financial Advisor", en: "Good afternoon! You mentioned you are planning to purchase a home in the next two years.", uz: "Xayrli kun! Kelgusi ikki yilda uy sotib olishni rejalashtirayotganingizni aytgan edingiz." },
        { speaker: "Alisher", en: "Yes, exactly. I want to make sure my credit score and down payment are in the best possible shape.", uz: "Ha, aynan shunday. Kredit reytingim va boshlang'ich to'lovim eng yaxshi holatda bo'lishini ta'minlamoqchiman." },
        { speaker: "Financial Advisor", en: "Excellent initiative. The higher your score, the lower your interest rate. Have you checked your credit report recently?", uz: "Ajoyib tashabbus. Reytingingiz qanchalik yuqori bo'lsa, foiz stavkangiz shunchalik past bo'ladi. Yaqinda kredit hisobotingizni tekshirdingizmi?" },
        { speaker: "Alisher", en: "Yes, it is currently 735. I keep my card utilization under ten percent and always pay the statement balance in full.", uz: "Ha, hozirda u 735. Karta limitidan foydalanishni 10% dan past saqlayman va har oy hisobni to'liq yopaman." },
        { speaker: "Financial Advisor", en: "That is the perfect strategy! In addition, ensure you preserve a six-month emergency fund untouched.", uz: "Bu ajoyib strategiya! Bundan tashqari, 6 oylik zaxira jamg'armangizga teginmaslikni ta'minlang." },
        { speaker: "Alisher", en: "Understood. The benefits of building equity definitely outweigh continuing to pay rent.", uz: "Tushunarli. Uy kapitalini qurishning foydasi ijarada davom etishdan shubhasiz ustundir." }
      ]
    },
    tasks: create5HourlyTasks(
      topic.title,
      topic.theme,
      topic.title,
      "Daftarga B2 darajasida professional qaror yoki reja bo'yicha 120-160 so'zli tahliliy insho",
      topic.title
    ),
    dailyQuiz: [
      {
        id: `q_m5_d${day}_1`,
        type: "mcq-translation",
        prompt: `'${vocabItems[0].en}' so'zi qanday talaffuz qilinadi va ma'nosi nima?`,
        options: [
          `${vocabItems[0].ipaOrRespelling} — ${vocabItems[0].uz}`,
          "MORT-gayj — avto sug'urtasi",
          "MAR-ket — savdo do'koni",
          "MOR-tal — o'limli holat"
        ],
        answer: `${vocabItems[0].ipaOrRespelling} — ${vocabItems[0].uz}`,
        explanationUz: `'Mortgage' so'zida 't' harfi o'qilmaydi va u ipoteka kreditini anglatadi.`
      },
      {
        id: `q_m5_d${day}_2`,
        type: "fill-blank",
        prompt: `Bo'sh joyni to'ldiring: 'They saved for three years to make a 20% ___ payment.' (boshlang'ich to'lov - down)`,
        answer: "down",
        explanationUz: "'Down payment' — uy yoki mashina sotib olayotganda to'lanadigan boshlang'ich to'lov."
      },
      {
        id: `q_m5_d${day}_3`,
        type: "grammar-choice",
        prompt: "Qo'shaloq qiyosiy darajadagi to'g'ri shaklni tanlang: 'The higher your credit score, ___ your interest rate.'",
        options: ["the lower", "lowest", "more low", "lower than"],
        answer: "the lower",
        explanationUz: "'The higher..., the lower...' — Qanchalik yuqori bo'lsa, shunchalik past bo'ladi."
      },
      {
        id: `q_m5_d${day}_4`,
        type: "mcq-translation",
        prompt: `'${vocabItems[5].en}' so'zining ma'nosi qaysi?`,
        options: [
          vocabItems[5].uz,
          "Teng bo'lmoq",
          "Qisqarmoq",
          "Yashirmoq"
        ],
        answer: vocabItems[5].uz,
        explanationUz: `'Outweigh' — ahamiyat yoki natija jihatidan ustun kelmoq.`
      },
      {
        id: `q_m5_d${day}_5`,
        type: "correct-sentence",
        prompt: "Grammatik jihatdan to'g'ri gapni tanlang:",
        options: [
          "In my opinion, the long-term benefits clearly outweigh the drawbacks.",
          "In my opinion, the long-term benefits clearly outweighs the drawbacks.",
          "In my opinion, the long-term benefits clearly outweighing drawbacks.",
          "In my opinion, benefits outweigh than drawbacks."
        ],
        answer: "In my opinion, the long-term benefits clearly outweigh the drawbacks.",
        explanationUz: "'Benefits' ko'plikda bo'lgani uchun 'outweigh' fe'li asosiy shaklda keladi."
      },
      {
        id: `q_m5_d${day}_6`,
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: '___ and foremost, make sure everyone is safe.' (eng avvalo - First)",
        answer: "First",
        explanationUz: "'First and foremost' — birinchi navbatda, eng avvalo."
      },
      {
        id: `q_m5_d${day}_7`,
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
        options: ["Always", "request", "an", "itemized", "bill", "first."],
        answer: "Always request an itemized bill first.",
        explanationUz: "'Always request an itemized bill first.' — Har doim birinchi navbatda batafsil hisobni so'rang."
      },
      {
        id: `q_m5_d${day}_8`,
        type: "grammar-choice",
        prompt: "Ziddiyatni ifodalashda qaysi bog'lovchi to'g'ri? '___ the high rent, they chose to live downtown.'",
        options: ["Despite", "Although", "Despite of", "Whereas"],
        answer: "Despite",
        explanationUz: "Otli birikma ('the high rent') oldidan 'Despite' ('of' siz!) qo'yiladi."
      }
    ],
    weeklyTestId: `w_m5_${week}`,
    monthlyExamId: "exam_m5",
    resources: [
      { title: "Consumer Financial Protection Bureau — Buying a Home & Mortgages", url: "https://www.consumerfinance.gov/owning-a-home", type: "Official US Guide" },
      { title: "FTC Consumer Advice — Protecting Your Identity & Avoiding Scams", url: "https://consumer.ftc.gov", type: "Official Guide" }
    ],
    speakingPrompt: `AQSHda kredit reytingini qurish, uy yoki avtomobil sotib olish va uzoq muddatli moliyaviy barqarorlik haqida 2-3 daqiqa davomida B2 darajasidagi bog'lovchilar bilan ovoz chiqarib gapiring.`,
    writingPrompt: `AQSHdagi dastlabki 3 yillik rejangiz (ish, moliyaviy maqsadlar, uy-joy va til darajangizni B2 ga olib chiqish) bo'yicha 120-160 so'zli tahliliy bayon yozing.`,
    reviewItems: [`m5_d${Math.max(121, day - 1)}`, `m4_d${Math.max(91, day - 30)}`],
    summaryChecklist: [
      "B1->B2 darajadagi barcha 10 ta leksik atamani o'zlashtirdim",
      "Murakkab shart gaplar va qiyosiy iboralarni qo'llay olaman",
      "5 soatlik kunlik vazifalar rejasini yakunladim",
      "Kunlik testdan kamida 70% to'pladim"
    ]
  };
});
