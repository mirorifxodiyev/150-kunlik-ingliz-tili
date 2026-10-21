import { Lesson } from "../types";
import { create5HourlyTasks } from "./month1";

const M2_TOPICS = [
  { day: 31, title: "31-kun: Supermarketda xarid qilish va oziq-ovqatlar (Grocery Shopping)", theme: "Produce, bakery, dairy, aisle, checkout va narx so'rash" },
  { day: 32, title: "32-kun: Narxlar, pul va to'lov turlari (Prices, Cash & Cards)", theme: "How much does it cost? Cash, debit card, credit card, receipt, change" },
  { day: 33, title: "33-kun: Sanaladigan va sanalmaydigan otlar: Much / Many / Some / Any (Countable & Uncountable)", theme: "How many apples? How much water? Some milk, any sugar" },
  { day: 34, title: "34-kun: Qahvaxona va tez ovqatlanish joylarida buyurtma (Ordering at Cafes & Fast Food)", theme: "I would like a large coffee to go. For here or to go? Combos" },
  { day: 35, title: "35-kun: Restoranda ovqatlanish va xizmat haqi (Dining Out & Tipping)", theme: "Table for two, menu, appetizer, entree, dessert, tip (choypuli)" },
  { day: 36, title: "36-kun: Jamoat transporti: Avtobus va metro (Public Transit: Bus & Subway)", theme: "Bus stop, fare, transfer, schedule, route, next stop" },
  { day: 37, title: "37-kun: 5-hafta takrori: Shaharda yo'nalish so'rash (Asking for Directions)", theme: "Turn left, go straight, cross the street, block, intersection, across from" },
  { day: 38, title: "38-kun: Present Continuous: Ayni paytdagi harakat (Actions Happening Now)", theme: "I am driving, he is working right now (am/is/are + V-ing)" },
  { day: 39, title: "39-kun: Present Simple vs Present Continuous (Hozirgi oddiy va Davomiy zamon)", theme: "Doimiy odatlar (every day) va ayni paytdagi holat (right now) farqi" },
  { day: 40, title: "40-kun: Kiyim-kechak va o'lchamlar (Clothing, Sizes & Shopping)", theme: "Shirt, pants, shoes, jacket, fitting room, size small/medium/large" },
  { day: 41, title: "41-kun: Sifatlarning qiyosiy darajasi: -er / More (Comparative Adjectives)", theme: "This car is faster than that one. Living here is more expensive." },
  { day: 42, title: "42-kun: Sifatlarning orttirma darajasi: The -est / The Most (Superlatives)", theme: "The biggest store in town. The most convenient route." },
  { day: 43, title: "43-kun: Uy-joy xonalari va mebellar (Rooms & Furniture)", theme: "Living room, bedroom, bathroom, kitchen, sofa, refrigerator, stove" },
  { day: 44, title: "44-kun: 6-hafta takrori: O'tgan zamon 'To Be': Was / Were (Past Simple of To Be)", theme: "I was at home yesterday. They were happy. Inkor va so'roq shakllari" },
  { day: 45, title: "45-kun: Past Simple: Muntazam fe'llar (-ed qo'shimchasi) (Regular Past Verbs)", theme: "Worked, lived, called, waited, started, arrived talaffuz qoidalari (/t/, /d/, /id/)" },
  { day: 46, title: "46-kun: Past Simple: Eng ko'p ishlatiladigan 20 ta noto'g'ri fe'l (Irregular Past Verbs)", theme: "Went, had, did, saw, bought, took, came, spoke, thought, got" },
  { day: 47, title: "47-kun: Past Simple: Inkor va So'roq shakllari (Didn't / Did you...?)", theme: "Did you go to work yesterday? No, I didn't. I didn't see him." },
  { day: 48, title: "48-kun: O'tgan zamon vaqt ko'rsatkichlari (Past Time Expressions)", theme: "Yesterday, last night, two days ago, in 2024, last week" },
  { day: 49, title: "49-kun: Sog'liq va umumiy alomatlar (Health & Common Symptoms)", theme: "Headache, fever, cough, stomachache, sore throat, pharmacy, medicine" },
  { day: 50, title: "50-kun: Shifokor qabuliga yozilish (Scheduling a Doctor's Appointment)", theme: "I need to make an appointment with Dr. Smith. What time is available?" },
  { day: 51, title: "51-kun: 7-hafta takrori: Modal fe'llar: Can, Could (Abilities & Polite Requests)", theme: "Can you speak louder? Could you please help me with this form?" },
  { day: 52, title: "52-kun: Modal fe'llar: Must, Have to (Majburiyat va Zarurat)", theme: "You must wear a seatbelt. I have to wake up early tomorrow." },
  { day: 53, title: "53-kun: Modal fe'llar: Should / Shouldn't (Maslahat va Tavsiya)", theme: "You should see a doctor. You shouldn't drive in heavy snow." },
  { day: 54, title: "54-kun: Kelasi zamon: 'Going to' niyat va rejalar uchun (Future with 'Going to')", theme: "I am going to buy a car next month. What are you going to do?" },
  { day: 55, title: "55-kun: Kelasi zamon: 'Will' to'satdan qarorlar va va'dalar uchun (Future with 'Will')", theme: "I will call you later. Don't worry, I will help you." },
  { day: 56, title: "56-kun: Ob-havo va iqlim sharoitlari (Weather & Seasons)", theme: "Sunny, rainy, freezing, snowstorm, forecast, degrees Fahrenheit" },
  { day: 57, title: "57-kun: Bo'sh vaqt va sevimli mashg'ulotlar (Hobbies & Free Time)", theme: "Playing soccer, watching movies, cooking, visiting parks, spending time with family" },
  { day: 58, title: "58-kun: 8-hafta takrori: Kundalik telefon qo'ng'iroqlari (Everyday Phone Calls)", theme: "This is John speaking. May I speak to...? Hold on a moment, please." },
  { day: 59, title: "59-kun: 2-oy grammatika va lug'at konsolidatsiyasi (Month 2 Review)", theme: "A2 darajasidagi barcha zamonlar, xaridlar, transport va dialoglarni mustahkamlash" },
  { day: 60, title: "60-kun: 2-oy yakuniy imtihoniga tayyorgarlik (Month 2 Exam Readiness)", theme: "30 savollik 2-oylik imtihoniga to'liq tayyorgarlik va amaliy simulyatsiya" }
];

export const MONTH_2_LESSONS: Lesson[] = M2_TOPICS.map((topic, i) => {
  const day = topic.day;
  const week = Math.min(4, Math.floor((day - 31) / 7) + 1);

  const vocabItems = [
    { en: "groceries", uz: "oziq-ovqat mahsulotlari", example: "We buy our groceries at the local supermarket every Saturday.", exampleUz: "Biz har shanba mahalliy supermarketdan oziq-ovqatlarimizni sotib olamiz.", ipaOrRespelling: "GROH-suh-reez" },
    { en: "cost", uz: "narxi turmoq / narx", example: "How much does a gallon of milk cost here?", exampleUz: "Bu yerda bir gallon sut qancha turadi?", ipaOrRespelling: "KAWST" },
    { en: "receipt", uz: "kassa cheki ('p' harfi o'qilmaydi)", example: "Always keep your receipt for returns.", exampleUz: "Qaytarib berish uchun har doim chekingizni saqlab qo'ying.", ipaOrRespelling: "ri-SEET" },
    { en: "directions", uz: "yo'l ko'rsatmasi / yo'nalishlar", example: "Can you give me directions to the nearest subway station?", exampleUz: "Menga eng yaqin metro bekatiga yo'nalish bera olasizmi?", ipaOrRespelling: "di-REK-shunz" },
    { en: "appointment", uz: "shifokor yoki xizmatga belgilangan qabul vaqti", example: "I have a doctor's appointment tomorrow at 10 AM.", exampleUz: "Ertaga soat 10 da shifokor qabuliga vaqtim bor.", ipaOrRespelling: "uh-POYNT-munt" },
    { en: "expensive", uz: "qimmat", example: "Rent in downtown is very expensive.", exampleUz: "Shahar markazida ijara juda qimmat.", ipaOrRespelling: "ik-SPEN-siv" },
    { en: "cheap / affordable", uz: "arzon / hamyonbop", example: "This market has fresh and affordable vegetables.", exampleUz: "Bu bozorda yangi va hamyonbop sabzavotlar bor.", ipaOrRespelling: "CHEEP / uh-FOR-duh-bul" },
    { en: "schedule", uz: "jadval / reja", example: "Check the bus schedule on your phone.", exampleUz: "Telefoningizda avtobus jadvalini tekshiring.", ipaOrRespelling: "SKED-jool" },
    { en: "symptom", uz: "kasallik alomati", example: "Fever and sore throat are common symptoms of the flu.", exampleUz: "Isitma va tomoq og'rig'i grippning odatiy alomatlaridir.", ipaOrRespelling: "SIMP-tum" },
    { en: "prescription", uz: "shifokor retsepti", example: "You need a doctor's prescription for this medicine.", exampleUz: "Bu dori uchun shifokor retsepti kerak bo'ladi.", ipaOrRespelling: "pri-SKRIP-shun" }
  ];

  return {
    id: `m2_d${day}`,
    month: 2,
    day,
    level: "A2",
    title: topic.title,
    themeUz: topic.theme,
    objectives: [
      `${topic.title} mavzusidagi amaliy leksikani hayotda qo'llay olish`,
      "O'tgan, hozirgi va kelasi zamon shakllarini to'g'ri farqlash va gaplarda ishlatish",
      "Do'kon, transport va shifoxonada mustaqil muloqot qila olish",
      "Kunlik 5 soatlik amaliy rejani to'liq yakunlab, testdan kamida 70% to'plash"
    ],
    vocabulary: vocabItems,
    grammar: {
      title: `${topic.title}: Grammatik qoidalar`,
      explanationUz: `Ushbu darsda siz A2 darajasidagi ${topic.theme} mavzusini mustahkamlaysiz. Amerika hayotida kundalik xaridlar, xizmat ko'rsatish joylari va o'tgan zamondagi voqealarni bayon qilishda ushbu qoidalar poydevor hisoblanadi.`,
      examples: [
        { en: "Did you buy any groceries yesterday?", uz: "Kecha biror oziq-ovqat sotib oldingizmi?" },
        { en: "I am going to visit the clinic tomorrow morning.", uz: "Ertaga ertalab poliklinikaga bormoqchiman." },
        { en: "You should always ask for an itemized receipt.", uz: "Har doim xaridlar batafsil ko'rsatilgan chekni so'rashingiz kerak." },
        { en: "How much does a monthly subway pass cost?", uz: "Bir oylik metro kartasi qancha turadi?" }
      ]
    },
    examples: [
      { en: "Excuse me, how much is this jacket?", uz: "Kechirasiz, bu kurtka qancha turadi?" },
      { en: "We are waiting for the number 15 bus.", uz: "Biz 15-raqamli avtobusni kutyapmiz." },
      { en: "I called the clinic to schedule an appointment for Monday.", uz: "Dushanbaga qabulga yozilish uchun klinikaga qo'ng'iroq qildim." },
      { en: "You have to show your ID when paying with a credit card.", uz: "Kredit karta bilan to'laganda shaxsingizni tasdiqlovchi hujjatni ko'rsatishingiz kerak." },
      { en: "Take this medicine twice a day after meals.", uz: "Bu dorini kuniga ikki marta ovqatdan keyin iching." },
      { en: "The grocery store is located two blocks away.", uz: "Oziq-ovqat do'koni ikki kvartal narida joylashgan." }
    ],
    dialogue: {
      title: `${topic.title} doirasida amaliy dialog`,
      lines: [
        { speaker: "Cashier", en: "Hi! Did you find everything okay today?", uz: "Salom! Bugun hamma kerakli narsani topa oldingizmi?" },
        { speaker: "Bobur", en: "Yes, thank you! Everything was fresh and easy to find.", uz: "Ha, rahmat! Hamma narsa yangi va topish oson bo'ldi." },
        { speaker: "Cashier", en: "Great! Your total is $42.50. How will you be paying?", uz: "Ajoyib! Jami $42.50 bo'ldi. Qanday to'lov qilasiz?" },
        { speaker: "Bobur", en: "I will pay with my debit card, please.", uz: "Debet kartam bilan to'layman, iltimos." },
        { speaker: "Cashier", en: "Please insert or tap your card on the terminal... Perfect. Here is your receipt.", uz: "Iltimos, kartangizni terminalga tiqing yoki tekkizing... Ajoyib. Mana sizning chekingiz." },
        { speaker: "Bobur", en: "Thank you so much! Have a great afternoon.", uz: "Katta rahmat! Kunning ikkinchi yarmi yaxshi o'tsin." },
        { speaker: "Cashier", en: "You too! See you next time.", uz: "Sizga ham! Keyingi safar ko'rishguncha." }
      ]
    },
    tasks: create5HourlyTasks(
      topic.title,
      topic.theme,
      topic.title,
      "Daftarga bugungi mavzuda amaliy vaziyat bo'yicha 90-130 so'zli matn",
      topic.title
    ),
    dailyQuiz: [
      {
        id: `q_m2_d${day}_1`,
        type: "mcq-translation",
        prompt: `'${vocabItems[2].en}' so'zi qanday talaffuz qilinadi va ma'nosi nima?`,
        options: [
          `${vocabItems[2].ipaOrRespelling} — ${vocabItems[2].uz}`,
          "RE-sept — oshxona retsepti",
          "RE-kord — musiqa yozuvi",
          "PO-st — pochta xati"
        ],
        answer: `${vocabItems[2].ipaOrRespelling} — ${vocabItems[2].uz}`,
        explanationUz: `'Receipt' so'zida 'p' harfi o'qilmaydi va u kassa chekini bildiradi.`
      },
      {
        id: `q_m2_d${day}_2`,
        type: "fill-blank",
        prompt: `Bo'sh joyni to'ldiring: 'I have a doctor's ___ tomorrow at 10 AM.' (qabul vaqti)`,
        answer: "appointment",
        explanationUz: "'Appointment' — oldindan belgilangan qabul vaqti."
      },
      {
        id: `q_m2_d${day}_3`,
        type: "grammar-choice",
        prompt: "O'tgan zamondagi to'g'ri so'roq shaklini tanlang: '___ you buy groceries yesterday?'",
        options: ["Did", "Do", "Have", "Were"],
        answer: "Did",
        explanationUz: "Past Simple zamonida umumiy so'roq 'Did' yordamchi fe'li bilan boshlanadi."
      },
      {
        id: `q_m2_d${day}_4`,
        type: "mcq-translation",
        prompt: `'${vocabItems[0].en}' so'zining o'zbekcha ma'nosi qaysi?`,
        options: [vocabItems[0].uz, "kiyimlar", "dori-darmon", "transport"],
        answer: vocabItems[0].uz,
        explanationUz: `'${vocabItems[0].en}' — ${vocabItems[0].uz}.`
      },
      {
        id: `q_m2_d${day}_5`,
        type: "correct-sentence",
        prompt: "Grammatik jihatdan to'g'ri jumlani toping:",
        options: [
          "This jacket is more expensive than that one.",
          "This jacket is expensiver than that one.",
          "This jacket is most expensive than that one.",
          "This jacket more expensive that one."
        ],
        answer: "This jacket is more expensive than that one.",
        explanationUz: "Ko'p bo'g'inli sifatlarning qiyosiy darajasida 'more + sifat + than' ishlatiladi."
      },
      {
        id: `q_m2_d${day}_6`,
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'You ___ see a doctor if your fever continues.' (maslahat - should)",
        answer: "should",
        explanationUz: "'Should' — maslahat berishda qo'llaniladi."
      },
      {
        id: `q_m2_d${day}_7`,
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtiring:",
        options: ["How", "much", "does", "this", "cost?"],
        answer: "How much does this cost?",
        explanationUz: "Narx so'rash: How much does this cost?"
      },
      {
        id: `q_m2_d${day}_8`,
        type: "grammar-choice",
        prompt: "Kelasi zamon uchun to'g'ri reja tuzilmasini tanlang: 'We are going ___ a new apartment next week.'",
        options: ["to rent", "renting", "rent", "rented"],
        answer: "to rent",
        explanationUz: "'Be going to + V1' rejalashtirilgan ish-harakatni bildiradi."
      }
    ],
    weeklyTestId: `w_m2_${week}`,
    monthlyExamId: "exam_m2",
    resources: [
      { title: "EnglishClass101 — Everyday American Conversations (A2)", url: "https://www.youtube.com", type: "Video Guide" },
      { title: "USAHello — Shopping & Transportation in the US", url: "https://usahello.org", type: "Immigrant Guide" }
    ],
    speakingPrompt: `Do'konda xarid qilish, narx so'rash va to'lov usulini tanlash bo'yicha sotuvchi bilan o'zingiz o'rtangizdagi 2 daqiqalik dialogingizni ovoz chiqarib ijro eting.`,
    writingPrompt: `Shaharda qanday transportdan foydalanishingiz, oziq-ovqatlarni qayerdan xarid qilishingiz haqida 90-130 so'zli hikoya yozing.`,
    reviewItems: [`m2_d${Math.max(31, day - 1)}`, `m1_d${Math.max(1, day - 30)}`],
    summaryChecklist: [
      "A2 kundalik hayot lug'atidagi barcha 10 ta so'zni yodladim",
      "O'tgan va kelasi zamon formulalarini tushundim",
      "5 soatlik vazifalar majmuini bajardim",
      "Kunlik testdan kamida 70% oldim"
    ]
  };
});
