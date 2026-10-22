import { Lesson } from "../types";
import { buildLessonFromTopic } from "./month1";

export const M5_TOPICS = [
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
  { day: 150, title: "150-kun: Yakuniy B2 Oylik Katta Imtihonga kirish (Month 5 & Full Program Capstone)", theme: "150 kunlik kursning to'liq yakuni, 30 savollik katta sinov va natijalar tahlili" },
];

export const MONTH_5_LESSONS: Lesson[] = M5_TOPICS.map((topic) =>
  buildLessonFromTopic(5, "B1 -> B2", topic)
);
