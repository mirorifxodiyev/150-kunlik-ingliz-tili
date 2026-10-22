import { Lesson } from "../types";
import { buildLessonFromTopic } from "./month1";

export const M3_TOPICS = [
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
  { day: 90, title: "90-kun: 3-oy yakuniy imtihoniga tayyorgarlik (Month 3 Exam Readiness)", theme: "A2->B1 pog'onasi bo'yicha 30 savollik katta sinovga kirish va tahlil" },
];

export const MONTH_3_LESSONS: Lesson[] = M3_TOPICS.map((topic) =>
  buildLessonFromTopic(3, "A2 -> B1", topic)
);
