import { Lesson } from "../types";
import { buildLessonFromTopic } from "./month1";

export const M2_TOPICS = [
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
  { day: 60, title: "60-kun: 2-oy yakuniy imtihoniga tayyorgarlik (Month 2 Exam Readiness)", theme: "30 savollik 2-oylik imtihoniga to'liq tayyorgarlik va amaliy simulyatsiya" },
];

export const MONTH_2_LESSONS: Lesson[] = M2_TOPICS.map((topic) =>
  buildLessonFromTopic(2, "A2", topic)
);
