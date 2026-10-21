import { DialogueLine, VocabularyItem, QuizQuestion } from "../types";

export interface CustomDayOverride {
  dialogue: {
    title: string;
    lines: DialogueLine[];
  };
  vocabulary?: VocabularyItem[];
  speakingPrompt?: string;
  dailyQuiz?: QuizQuestion[];
}

export const REALISTIC_SCENARIOS: Record<number, CustomDayOverride> = {
  // =========================================================================
  // DAY 2: US Airport Border & CBP Customs Interview
  // =========================================================================
  2: {
    dialogue: {
      title: "AQSH aeroporti: Chegara nazorati (CBP Officer) bilan suhbat",
      lines: [
        { speaker: "CBP Officer", en: "Good afternoon. Passport and customs declaration, please.", uz: "Xayrli kun. Pasport va bojxona deklaratsiyasini bering, iltimos." },
        { speaker: "Anvar", en: "Good afternoon, officer. Here is my passport and visa documents.", uz: "Xayrli kun, ofitser. Mana pasportim va viza hujjatlarim." },
        { speaker: "CBP Officer", en: "What is the primary purpose of your trip to the United States?", uz: "Amerika Qo'shma Shtatlariga safariingizning asosiy maqsadi nima?" },
        { speaker: "Anvar", en: "I am arriving on my immigrant visa to relocate and start working.", uz: "Men immigratsion vizam bilan doimiy yashash va ishlashni boshlash uchun keldim." },
        { speaker: "CBP Officer", en: "Where will you be staying for your first month?", uz: "Birinchi oyingizda qayerda turasiz?" },
        { speaker: "Anvar", en: "I have a reserved temporary apartment in Chicago, on Foster Avenue.", uz: "Chikagoda, Foster prospektida bron qilingan vaqtinchalik kvartiram bor." },
        { speaker: "CBP Officer", en: "Are you carrying any fresh fruits, vegetables, meat, or currency over $10,000?", uz: "Yoningizda meva, sabzavot, go'sht yoki $10,000 dan ortiq naqd pul bormi?" },
        { speaker: "Anvar", en: "No, officer. Only personal clothes, packaged dry snacks, and $2,400 in cash.", uz: "Yo'q, ofitser. Faqat shaxsiy kiyimlar, qadoqlangan quruq yeguliklar va $2,400 naqd pulim bor." },
        { speaker: "CBP Officer", en: "Look into the camera for the photo, and place your right index finger on the scanner... Welcome to the United States!", uz: "Rasmga tushish uchun kameraga qarang va o'ng ko'rsatkich barmog'ingizni skanerga qo'ying... Amerika Qo'shma Shtatlariga xush kelibsiz!" }
      ]
    },
    speakingPrompt: "AQSH aeroportiga yetib kelgandek tasavvur qiling. CBP ofitseriga qayerda yashashingiz, maqsadingiz va yoningizda qancha mablag' borligini ingliz tilida erkin aytib bering."
  },

  // =========================================================================
  // DAY 15: Landlord Rental Inquiry Phone Call (User Recommendation ①)
  // =========================================================================
  15: {
    dialogue: {
      title: "Kvartira ijarasi: Landlord (Uy egasi) bilan telefon orqali to'liq suhbat",
      lines: [
        { speaker: "Landlord (Mr. Miller)", en: "Hello, this is Miller Properties. How can I help you?", uz: "Assalomu alaykum, Miller Properties kompaniyasi. Qanday yordam bera olaman?" },
        { speaker: "Anvar", en: "Hi Mr. Miller! I am calling regarding the one-bedroom apartment listing on Elm Street.", uz: "Salom, janob Miller! Elm ko'chasidagi bir xonali kvartira e'loni bo'yicha qo'ng'iroq qilyapman." },
        { speaker: "Landlord", en: "Yes! That unit is still available. It's $1,350 a month.", uz: "Ha! U xonadon hali bo'sh. Oylik ijarasi $1,350." },
        { speaker: "Anvar", en: "Does that monthly rent include any utilities like heating or water?", uz: "Bu oylik to'lov ichiga isitish yoki suv kabi kommunal xizmatlar kiradimi?" },
        { speaker: "Landlord", en: "Water, garbage, and radiator heat are included. You only pay for cooking gas, electric, and internet.", uz: "Suv, chiqindi va batareya issiqligi kiradi. Siz faqat gaz, elektr energiyasi va internet uchun to'laysiz." },
        { speaker: "Anvar", en: "That is reasonable. What is the security deposit and minimum lease term?", uz: "Bu maqbul. Garov depoziti (security deposit) va eng kam ijara muddati qancha?" },
        { speaker: "Landlord", en: "We require a standard 12-month lease. The deposit is one month's rent, $1,350, plus a $40 background check fee.", uz: "Biz standart 12 oylik shartnoma tuzamiz. Depozit bir oylik ijara — $1,350, hamda $40 tekshiruv to'lovi." },
        { speaker: "Anvar", en: "Understood. When would be a good time to schedule an in-person viewing?", uz: "Tushunarli. Kvartirani ko'zdan kechirish uchun qachon kelish qulay bo'lardi?" },
        { speaker: "Landlord", en: "I will be showing the unit this Saturday at 11 AM. Does that work for you?", uz: "Men bu shanba kuni soat 11:00 da ko'rsataman. Sizga ma'qulmi?" },
        { speaker: "Anvar", en: "Saturday at 11 AM works perfectly for me. See you then, Mr. Miller!", uz: "Shanba soat 11:00 men uchun ayni muddao. Ko'rishguncha, janob Miller!" }
      ]
    },
    vocabulary: [
      { en: "landlord", uz: "uy egasi / ijaraga beruvchi", example: "The landlord asked for a security deposit.", exampleUz: "Uy egasi garov depozitini so'radi.", ipaOrRespelling: "LAND-lord" },
      { en: "tenant", uz: "ijarachi", example: "Every tenant must sign the 12-month lease.", exampleUz: "Har bir ijarachi 12 oylik shartnomani imzolashi kerak.", ipaOrRespelling: "TEN-unt" },
      { en: "security deposit", uz: "garov depoziti", example: "The security deposit is refundable upon move-out.", exampleUz: "Garov depoziti ko'chib ketganda qaytarib beriladi.", ipaOrRespelling: "si-KYUR-i-tee di-PAH-zit" },
      { en: "utilities", uz: "kommunal xizmatlar (suv, elektr, gaz)", example: "Are utilities included in the monthly rent?", exampleUz: "Kommunal xizmatlar oylik ijara narxiga kiritilganmi?", ipaOrRespelling: "yoo-TIL-i-teez" },
      { en: "lease agreement", uz: "ijara shartnomasi", example: "Read the lease agreement carefully before signing.", exampleUz: "Imzolashdan oldin ijara shartnomasini diqqat bilan o'qing.", ipaOrRespelling: "LEES uh-GREE-munt" },
      { en: "one-bedroom unit", uz: "bir xonali kvartira (1 BR)", example: "I am renting a quiet one-bedroom unit.", exampleUz: "Men sokin bir xonali kvartirani ijaraga olyapman.", ipaOrRespelling: "wun BED-room YOO-nit" },
      { en: "move-in date", uz: "ko'chib kirish sanasi", example: "My expected move-in date is the first of next month.", exampleUz: "Mening ko'chib kirish sanam — keyingi oyning birinchi kuni.", ipaOrRespelling: "MOOV-in dayt" },
      { en: "background check", uz: "o'tmish va kredit tarixini tekshirish", example: "Management runs a credit and background check on all applicants.", exampleUz: "Boshqaruv barcha arizachilarning kredit va jinoiy o'tmishini tekshiradi.", ipaOrRespelling: "BAK-grownd chek" },
      { en: "garbage disposal", uz: "chiqindi chiqarish / rakovina maydalagichi", example: "Garbage and trash removal are covered by the building.", exampleUz: "Chiqindi olib ketish bino tomonidan ta'minlanadi.", ipaOrRespelling: "GAHR-bij dis-POH-zul" },
      { en: "in-person viewing", uz: "shaxsan borib kvartirani ko'rish", example: "Let's schedule an in-person viewing tomorrow.", exampleUz: "Keling, ertaga borib kvartirani ko'rish vaqtini belgilaylik.", ipaOrRespelling: "in-PUR-sun VYOO-ing" }
    ],
    speakingPrompt: "Uy egasiga (Landlord) qo'ng'iroq qilib, bir xonali kvartiraning ijarasi, qaysi kommunal xizmatlar narx ichida ekanligi va shanba kuni ko'rishga kelishingizni ingliz tilida aytib bering."
  },

  // =========================================================================
  // DAY 26: First Retail / Supermarket Cashier Job Interview
  // =========================================================================
  26: {
    dialogue: {
      title: "Birinchi ish suhbati: Do'kon boshqaruvchisi (Store Manager) bilan suhbat",
      lines: [
        { speaker: "Store Manager (Sarah)", en: "Hi Anvar, please take a seat! Thank you for applying for the cashier position.", uz: "Salom Anvar, marhamat o'tiring! Kassir lavozimiga ariza topshirganingiz uchun rahmat." },
        { speaker: "Anvar", en: "Thank you for the opportunity, Sarah. It's a pleasure to meet you.", uz: "Imkoniyat uchun rahmat, Sara. Siz bilan tanishganimdan juda mamnunman." },
        { speaker: "Store Manager", en: "Tell me about your availability. Can you work evening shifts and weekends?", uz: "Qachon ishlay olishingiz haqida gapirib bering. Kechki smena va dam olish kunlari ishlay olasizmi?" },
        { speaker: "Anvar", en: "Yes, I have completely open availability. I can work early mornings, evenings, and weekend shifts.", uz: "Ha, menda to'liq bo'sh vaqt bor. Ertalabki, kechki va dam olish kunlari smenalarida ishlay olaman." },
        { speaker: "Store Manager", en: "How do you handle a line of impatient customers during peak rush hours?", uz: "Tig'iz vaqtda navbatda turgan sabrsiz xaridorlarga qanday munosabatda bo'lasiz?" },
        { speaker: "Anvar", en: "I stay calm, smile, scan items quickly, and thank each customer for their patience.", uz: "Men xotirjamlikni saqlayman, jilmayaman, mahsulotlarni tez skanerlayman va har bir mijozga sabri uchun minnatdorlik bildiraman." },
        { speaker: "Store Manager", en: "That is exactly the attitude we look for. Starting pay is $16.50 an hour. Can you start orientation on Monday?", uz: "Biz aynan shunday munosabatni qadrlaymiz. Boshlang'ich maosh soatiga $16.50. Dushanba kuni tanishtiruv mashg'ulotiga chiqa olasizmi?" },
        { speaker: "Anvar", en: "Yes, absolutely! I will be here on Monday ready to learn and work hard.", uz: "Ha, albatta! Dushanba kuni o'rganishga va astoydil ishlashga tayyor holda kelaman." }
      ]
    },
    speakingPrompt: "Siz do'kon yoki restoranga ishga kiryapsiz. Boshqaruvchiga haftaning barcha kunlarida ishlashga tayyor ekanligingizni va mijozlarga doimo xushmuomala bo'lishingizni tushuntiring."
  },

  // =========================================================================
  // DAY 31: Supermarket & Grocery Store Checkout
  // =========================================================================
  31: {
    dialogue: {
      title: "Supermarket kassasi: Chek, chegirma kartasi va to'lov",
      lines: [
        { speaker: "Cashier", en: "Good morning! Did you find everything you were looking for today?", uz: "Xayrli tong! Bugun barcha qidirgan narsalaringizni topa oldingizmi?" },
        { speaker: "Bobur", en: "Yes, everything was fresh and well-stocked, thank you.", uz: "Ha, hamma narsa yangi va yetarli edi, rahmat." },
        { speaker: "Cashier", en: "Do you have our store member rewards card or phone number?", uz: "Bizning do'konimiz a'zolik kartangiz yoki telefon raqamingiz bormi?" },
        { speaker: "Bobur", en: "Yes, my phone number is 312-555-0198.", uz: "Ha, telefon raqamim: 312-555-0198." },
        { speaker: "Cashier", en: "Great, that saved you $8.40 on groceries today. Would you like paper or plastic bags?", uz: "Ajoyib, bu sizga bugun $8.40 chegirma berdi. Qog'oz xalta kerakmi yoki plastik paket?" },
        { speaker: "Bobur", en: "I brought my own reusable bags, thanks.", uz: "O'zim bilan qayta ishlatiladigan sumkalarimni olib kelganman, rahmat." },
        { speaker: "Cashier", en: "Awesome! Your total comes to $54.25. Card machine is ready whenever you are.", uz: "Ajoyib! Jami $54.25 bo'ldi. Karta apparati siz tayyor bo'lishingiz bilan qabul qiladi." },
        { speaker: "Bobur", en: "I will tap my Apple Pay... Here it goes.", uz: "Apple Pay orqali tekkizib to'layman... Mana o'tdi." },
        { speaker: "Cashier", en: "Would you like your receipt in the bag or with you?", uz: "Chekingizni sumkaga solaymi yoki qo'lingizga beraymi?" },
        { speaker: "Bobur", en: "In the bag is fine. Have a wonderful day!", uz: "Sumkaga solavering. Kuningiz ajoyib o'tsin!" }
      ]
    }
  },

  // =========================================================================
  // DAY 34: Starbucks Drive-Thru / Counter Ordering (User Recommendation ①)
  // =========================================================================
  34: {
    dialogue: {
      title: "Starbucks Drive-Thru: Kofe buyurtma qilish va parametrlarni tanlash",
      lines: [
        { speaker: "Barista (Intercom)", en: "Hi there! Welcome to Starbucks. What can I handcraft for you today?", uz: "Salom! Starbucks'ga xush kelibsiz. Bugun sizga nima tayyorlab beray?" },
        { speaker: "Anvar", en: "Hi! Can I get an iced vanilla latte, please?", uz: "Salom! Muzli vanilli latte olsam bo'ladimi, iltimos?" },
        { speaker: "Barista", en: "Sure thing! What size would you like: Tall, Grande, or Venti?", uz: "Albatta! Qaysi hajmda xohlaysiz: Tall (kichik), Grande (o'rta) yoki Venti (katta)?" },
        { speaker: "Anvar", en: "A Grande, please. And can I substitute oat milk instead of whole milk?", uz: "Grande bo'lsin, iltimos. Oddiy sut o'rniga jo'xori suti (oat milk) qo'shib bera olasizmi?" },
        { speaker: "Barista", en: "Oat milk, absolutely. Regular vanilla syrup or sugar-free vanilla?", uz: "Jo'xori suti, albatta. Oddiy vanil siropimi yoki shakarsiz (sugar-free) vanilmi?" },
        { speaker: "Anvar", en: "Sugar-free vanilla, with light ice, please.", uz: "Shakarsiz vanil, va kamroq muz (light ice) soling, iltimos." },
        { speaker: "Barista", en: "Got it! Any warm breakfast sandwiches or pastries for you today?", uz: "Tushundim! Bugun issiq nonushta sendvichi yoki pishiriq xohlaysizmi?" },
        { speaker: "Anvar", en: "No food today, just the drink. Thank you!", uz: "Bugun taom kerak emas, faqat ichimlik. Rahmat!" },
        { speaker: "Barista", en: "Your total is $5.85. Please pull forward to the drive-thru window!", uz: "Jami $5.85 bo'ldi. Iltimos, drive-thru oynasiga haydab boring!" }
      ]
    },
    vocabulary: [
      { en: "drive-thru", uz: "mashinada turib buyurtma berish xizmati", example: "Let's go through the Starbucks drive-thru.", exampleUz: "Keling, Starbucks drive-thru oynasidan buyurtma beramiz.", ipaOrRespelling: "DRYV-throo" },
      { en: "handcraft", uz: "qo'lda maxsus tayyorlamoq", example: "The barista will handcraft your custom latte.", exampleUz: "Barista sizning maxsus lattingizni qo'lda tayyorlaydi.", ipaOrRespelling: "HAND-kraft" },
      { en: "substitute", uz: "almashtirmoq (boshqasiga)", example: "Can I substitute oat milk for whole milk?", exampleUz: "Oddiy sut o'rniga jo'xori sutini almashtirsam bo'ladimi?", ipaOrRespelling: "SUB-sti-toot" },
      { en: "sugar-free", uz: "shakarsiz", example: "I prefer sugar-free syrup in my coffee.", exampleUz: "Men kofemda shakarsiz siropni ma'qul ko'raman.", ipaOrRespelling: "SHOO-gur free" },
      { en: "light ice", uz: "kamroq muz", example: "An iced coffee with light ice has more drink and less water.", exampleUz: "Kamroq muzli kofeda ichimlik ko'proq, erigan suv kamroq bo'ladi.", ipaOrRespelling: "LYT eys" },
      { en: "pull forward", uz: "oldinga haydab bormoq", example: "Please pull forward to the next window to pay.", exampleUz: "To'lov qilish uchun keyingi oynaga qarab haydang.", ipaOrRespelling: "POOL FOR-wurd" },
      { en: "pastry", uz: "shirin pishiriq / keks", example: "Would you like a fresh blueberry muffin or pastry?", exampleUz: "Yangi keks yoki shirin pishiriq xohlaysizmi?", ipaOrRespelling: "PAYS-tree" },
      { en: "receipt", uz: "chek", example: "Your receipt will be in the bag.", exampleUz: "Chekingiz paketning ichida bo'ladi.", ipaOrRespelling: "ri-SEET" },
      { en: "decaf", uz: "kofeinsiz qahva", example: "Can I get a decaf Americano?", exampleUz: "Kofeinsiz Amerikano olsam bo'ladimi?", ipaOrRespelling: "DEE-kaf" },
      { en: "tip jar", uz: "choypuli qutisi", example: "There is a tip jar next to the cash register.", exampleUz: "Kassa yonida choypuli (tip) qutisi turibdi.", ipaOrRespelling: "TIP jar" }
    ],
    speakingPrompt: "Kafega kirib o'zingiz yoqtirgan kofe hajmini (Tall, Grande, Venti), qanday sut qo'shishni va shakarsiz qilishni so'rab buyurtma bering."
  },

  // =========================================================================
  // DAY 35: Opening Checking Account at Chase / BoA (User Recommendation ①)
  // =========================================================================
  35: {
    dialogue: {
      title: "Bank filiali: Chase / Bank of America'da hisob (Checking Account) ochish",
      lines: [
        { speaker: "Banker (Michael)", en: "Good morning! Welcome to Chase. How can I assist you with your banking today?", uz: "Xayrli tong! Chase bankiga xush kelibsiz. Bugun bank xizmati bo'yicha qanday yordam bera olaman?" },
        { speaker: "Anvar", en: "Good morning! I would like to open a checking account and receive a debit card.", uz: "Xayrli tong! Men hisob-kitob hisobi (checking account) ochmoqchiman va debet karta olmoqchiman." },
        { speaker: "Banker", en: "Excellent. Do you have two forms of identification and proof of your US residential address?", uz: "Ajoyib. Sizda ikkita shaxsni tasdiqlovchi hujjat va AQSHdagi yashash manzilingiz isboti bormi?" },
        { speaker: "Anvar", en: "Yes. Here is my foreign passport with the US visa, and a utility bill showing my Chicago address.", uz: "Ha. Mana AQSH vizasi tushirilgan xorijiy pasportim va Chikagodagi manzilim ko'rsatilgan kommunal to'lov cheki." },
        { speaker: "Banker", en: "Do you have a Social Security Number (SSN) or an Individual Taxpayer ID (ITIN)?", uz: "Sizda Social Security raqami (SSN) yoki soliq to'lovchi raqami (ITIN) bormi?" },
        { speaker: "Anvar", en: "I have my SSN card right here.", uz: "Mana, SSN kartam ham yonimda." },
        { speaker: "Banker", en: "Perfect! Our Total Checking has no monthly fee if you set up a qualifying direct deposit of $500 or more each month.", uz: "Juda yaxshi! Bizning Total Checking hisobimizga har oy kamida $500 direct deposit kelib tursa, oylik xizmat haqi olinmaydi." },
        { speaker: "Anvar", en: "My employer will set up direct deposit next week. Can we also set up mobile banking?", uz: "Ish beruvchim kelasi hafta direct deposit ulaydi. Mobil ilovani ham faollashtira olamizmi?" },
        { speaker: "Banker", en: "Absolutely. I will print your routing and account numbers for payroll, and you'll get a temporary debit card today.", uz: "Albatta. Ishxonangiz uchun bank marshrut (routing) va hisob raqamlarini chiqarib beraman, hamda bugunoq vaqtinchalik debet karta olasiz." }
      ]
    },
    vocabulary: [
      { en: "checking account", uz: "hisob-kitob (kundalik) bank hisobi", example: "I use my checking account for paying bills and buying groceries.", exampleUz: "Men kundalik xaridlar va to'lovlar uchun checking hisobimdan foydalanaman.", ipaOrRespelling: "CHEK-ing uh-KOWNT" },
      { en: "savings account", uz: "jamg'arma bank hisobi (foizli)", example: "A savings account earns interest on your emergency fund.", exampleUz: "Jamg'arma hisobi kutilmagan vaziyatlar fondiga foiz keltiradi.", ipaOrRespelling: "SAY-vingz uh-KOWNT" },
      { en: "routing number", uz: "bank marshrut raqami (9 xonali)", example: "Your 9-digit routing number identifies your bank branch.", exampleUz: "9 xonali routing raqami bank filialingizni belgilaydi.", ipaOrRespelling: "ROW-ting NUM-bur" },
      { en: "account number", uz: "bank hisob raqami", example: "Provide your account number to set up direct deposit.", exampleUz: "Direct deposit o'rnatish uchun hisob raqamingizni taqdim eting.", ipaOrRespelling: "uh-KOWNT NUM-bur" },
      { en: "debit card", uz: "debet karta", example: "You can withdraw cash from the ATM using your debit card.", exampleUz: "Debet kartangiz bilan bankomatdan naqd pul yechishingiz mumkin.", ipaOrRespelling: "DEB-it kard" },
      { en: "direct deposit", uz: "maoshning to'g'ridan-to'g'ri bankka tushishi", example: "My salary arrives via direct deposit every other Friday.", exampleUz: "Mening oyligim har ikki haftada juma kuni direct deposit orqali tushadi.", ipaOrRespelling: "duh-REKT duh-PAH-zit" },
      { en: "overdraft fee", uz: "hisobda pul tugab qolgandagi jarima", example: "Turn off overdraft protection to avoid extra fees.", exampleUz: "Ortiqcha jarimalardan saqlanish uchun overdraft xizmatini o'chirib qo'ying.", ipaOrRespelling: "OH-vur-draft fee" },
      { en: "monthly maintenance fee", uz: "oylik xizmat ko'rsatish to'lovi", example: "The $12 monthly maintenance fee is waived with direct deposit.", exampleUz: "Oylik $12 xizmat haqi direct deposit bo'lganda bekor qilinadi.", ipaOrRespelling: "MONTH-lee MAYN-tuh-nuns fee" },
      { en: "proof of address", uz: "yashash manzilini tasdiqlovchi hujjat", example: "A lease or electric bill serves as official proof of address.", exampleUz: "Ijara shartnomasi yoki elektr cheki rasmiy manzil isboti bo'lib xizmat qiladi.", ipaOrRespelling: "proof uv uh-DRES" },
      { en: "wire transfer", uz: "bank orqali pul o'tkazmasi", example: "How long does an international wire transfer take?", exampleUz: "Xalqaro bank o'tkazmasi qancha vaqt oladi?", ipaOrRespelling: "WY-ur TRANS-fur" }
    ],
    speakingPrompt: "Bank xodimiga (banker) yaqinlashib, checking account ochmoqchi ekanligingizni, pasportingiz va yashash manzilingiz hujjatlarini olib kelganingizni va mobil ilovani faollashtirmoqchi ekanligingizni ayting."
  },

  // =========================================================================
  // DAY 50: Urgent Care Walk-In Clinic & Symptoms
  // =========================================================================
  50: {
    dialogue: {
      title: "Tez tibbiy yordam klinikasi (Urgent Care): Ro'yxatdan o'tish va alomatlar",
      lines: [
        { speaker: "Receptionist", en: "Hi, welcome to City Urgent Care. Are you experiencing severe chest pain or shortness of breath?", uz: "Salom, City Urgent Care klinikasiga xush kelibsiz. Ko'kragingizda qattiq og'riq yoki nafas qisishi bormi?" },
        { speaker: "Anvar", en: "No chest pain, but I have a high fever, severe sore throat, and body chills since last night.", uz: "Ko'krak og'rig'i yo'q, lekin kechadan beri yuqori harorat, kuchli tomoq og'rig'i va qaltirash bor." },
        { speaker: "Receptionist", en: "Okay. Do you have an insurance card, or will you be self-pay out of pocket?", uz: "Tushunarli. Sug'urta kartangiz bormi yoki o'z cho'ntagingizdan to'laysizmi (self-pay)?" },
        { speaker: "Anvar", en: "I don't have medical insurance yet. How much is the self-pay visit?", uz: "Menda hali tibbiy sug'urta yo'q. O'zim to'lasam qabul qancha bo'ladi?" },
        { speaker: "Receptionist", en: "The flat self-pay urgent care consultation is $135, which includes a rapid strep throat swab.", uz: "Shifokor ko'rigi $135 turadi, bu narxga tomoq infeksiyasi (strep test) tahlili ham kiradi." },
        { speaker: "Anvar", en: "That is fine. I can pay with my debit card.", uz: "Yaxshi. Debet kartam bilan to'lay olaman." },
        { speaker: "Receptionist", en: "Please fill out this medical history and allergy sheet. The triage nurse will call your name in about 15 minutes.", uz: "Iltimos, ushbu kasalliklar tarixi va allergiya varaqasini to'ldiring. Taxminan 15 daqiqada hamshira ismingizni aytib chaqiradi." }
      ]
    },
    speakingPrompt: "Shifokorga yoki qabulxona xodimiga sog'lig'ingizdagi alomatlarni (isitma, tomoq og'rig'i, yo'tal) tasvirlab bering va to'lov haqida so'rang."
  },

  // =========================================================================
  // DAY 60: Amazon Warehouse / Job Interview & Safety (User Recommendation ①)
  // =========================================================================
  60: {
    dialogue: {
      title: "Omborxona (Amazon Warehouse): Ish suhbati va xavfsizlik qoidalari",
      lines: [
        { speaker: "Hiring Manager (Dave)", en: "Welcome to the fulfillment center, Anvar. Thanks for coming in for the warehouse associate interview.", uz: "Ombor majmuasiga xush kelibsiz, Anvar. Ombor xodimi suhbatiga kelganingiz uchun rahmat." },
        { speaker: "Anvar", en: "Good morning, Dave! I'm very excited about the opportunity to work here.", uz: "Xayrli tong, Deyv! Bu yerda ishlash imkoniyatidan juda xursandman." },
        { speaker: "Hiring Manager", en: "This facility operates on strict safety standards. Are you comfortable lifting up to 50 pounds repeatedly?", uz: "Bu ombor qat'iy xavfsizlik standartlariga asoslanadi. Siz 50 funtgacha (23 kg) og'irlikni muntazam ko'tarishga tayyormisiz?" },
        { speaker: "Anvar", en: "Yes, I am in good physical shape, disciplined, and familiar with proper lifting techniques with my knees.", uz: "Ha, men jismonan baquvvatman, intizomliman va og'irlikni tizza bilan to'g'ri ko'tarish qoidalarini bilaman." },
        { speaker: "Hiring Manager", en: "Have you ever operated a handheld scanner or pallet jack?", uz: "Qo'l skaneri yoki yuk aravachasini (pallet jack) ishlatganmisiz?" },
        { speaker: "Anvar", en: "I learn digital tools quickly and have no problem operating barcode scanners.", uz: "Men raqamli vositalarni tez o'rganaman va shtrix-kod skanerlarini ishlatishda hech qanday muammom bo'lmaydi." },
        { speaker: "Hiring Manager", en: "The shift is Wednesday through Saturday, 7:00 AM to 5:30 PM, four 10-hour days. Pay is $19.25 per hour with full health benefits after 90 days.", uz: "Smena chorshanbadan shanbagacha, soat 7:00 dan 17:30 gacha (4 ta 10 soatlik kun). Maosh soatiga $19.25, hamda 90 kundan keyin to'liq tibbiy sug'urta beriladi." },
        { speaker: "Anvar", en: "That schedule and compensation are excellent for me. When can I complete my drug screening and start?", uz: "Bu ish jadvali va maosh men uchun ayni muddao. Tibbiy testdan o'tib, qachon ishni boshlashim mumkin?" },
        { speaker: "Hiring Manager", en: "Complete the drug test downstairs today, and your orientation will be next Wednesday morning at 6:45 AM. Welcome aboard!", uz: "Pastki qavatda bugun test topshiring va keyingi chorshanba soat 6:45 da tanishtiruv mashg'ulotiga keling. Jamoamizga xush kelibsiz!" }
      ]
    },
    vocabulary: [
      { en: "fulfillment center", uz: "buyurtmalarni yig'ish va jo'natish ombori", example: "Thousands of packages are processed daily in this fulfillment center.", exampleUz: "Ushbu omborda har kuni minglab posilkalar qayta ishlanadi.", ipaOrRespelling: "fool-FIL-munt SEN-tur" },
      { en: "warehouse associate", uz: "ombor ishchisi / operatori", example: "He works as a warehouse associate on the night shift.", exampleUz: "U tungi smenada ombor xodimi bo'lib ishlaydi.", ipaOrRespelling: "WAYR-hows uh-SOH-see-ut" },
      { en: "safety boots", uz: "temir tumshuqli maxsus xavfsizlik poyabzali", example: "Steel-toe safety boots are required on the warehouse floor.", exampleUz: "Ombor hududida temir burunli maxsus poyabzal kiyish majburiydir.", ipaOrRespelling: "SAYF-tee boots" },
      { en: "handheld scanner", uz: "qo'l skaneri (shtrix-kod o'quvchi)", example: "Scan each barcode with the handheld scanner.", exampleUz: "Har bir shtrix-kodni qo'l skaneri bilan skanerlang.", ipaOrRespelling: "HAND-held SKAN-ur" },
      { en: "pallet jack", uz: "palletlarni ko'taruvchi gidravlik arava", example: "Use the pallet jack to move heavy boxes safely.", exampleUz: "Og'ir qutilarni xavfsiz siljitish uchun pallet aravasidan foydalaning.", ipaOrRespelling: "PAL-it jak" },
      { en: "overtime pay", uz: "qo'shimcha ish vaqti to'lovi (1.5 barobar)", example: "Working over 40 hours earns you time-and-a-half overtime pay.", exampleUz: "Haftasiga 40 soatdan ortiq ishlash 1.5 barobar ortiqcha ish haqi keltiradi.", ipaOrRespelling: "OH-vur-tym pay" },
      { en: "health benefits", uz: "tibbiy sug'urta va imtiyozlar paketi", example: "Full-time employees receive dental, vision, and health benefits.", exampleUz: "To'liq stavkadagi ishchilar stomatologiya, ko'z va tibbiy sug'urta imtiyozlariga ega bo'ladilar.", ipaOrRespelling: "HELTH BEN-uh-fits" },
      { en: "drug screening", uz: "giyohvand moddalarga majburiy tahlil", example: "Passing a pre-employment drug screening is mandatory.", exampleUz: "Ishga kirishdan oldingi tekshiruvdan o'tish majburiydir.", ipaOrRespelling: "DRUG SKREEN-ing" },
      { en: "physical endurance", uz: "jismoniy chidamlilik", example: "Warehouse work requires discipline and physical endurance.", exampleUz: "Ombor ishi intizom va jismoniy chidamlilikni talab qiladi.", ipaOrRespelling: "FIZ-i-kul en-DUR-uns" },
      { en: "orientation", uz: "dastlabki tanishtiruv va xavfsizlik o'quvi", example: "Orientation begins promptly at 7 AM on Monday.", exampleUz: "Tanishtiruv dushanba kuni roppa-rosa soat 7:00 da boshlanadi.", ipaOrRespelling: "or-ee-en-TAY-shun" }
    ],
    speakingPrompt: "Omborxona menejeri bilan suhbatda bo'lgandek, 40-50 funt yuk ko'tarishga jismonan tayyorligingizni, xavfsizlik poyabzalingiz borligini va qo'shimcha soatlarda ham ishlashga rozi ekanligingizni inglizcha bayon qiling."
  },

  // =========================================================================
  // DAY 71: 911 Emergency Dispatcher Call (Car Accident)
  // =========================================================================
  71: {
    dialogue: {
      title: "911 Favqulodda xizmat: Yo'l-transport hodisasini xabar qilish",
      lines: [
        { speaker: "911 Dispatcher", en: "911, what is the exact location of your emergency?", uz: "911 xizmati, favqulodda vaziyatning aniq manzili qayerda?" },
        { speaker: "Farrux", en: "Hello! I am reporting a car accident at the intersection of Michigan Avenue and Adams Street.", uz: "Salom! Men Michigan Avenue va Adams Street chorrahasidagi avtohalokat haqida xabar beryapman." },
        { speaker: "911 Dispatcher", en: "How many vehicles are involved, and is anyone injured or trapped?", uz: "Nechta avtomobil to'qnashgan va biror kishi jarohatlanganmi yoki qisilib qolganmi?" },
        { speaker: "Farrux", en: "Two cars collided. No one is trapped, but one driver is dizzy and has neck pain.", uz: "Ikkita mashina to'qnashdi. Qisilib qolganlar yo'q, lekin bir haydovchining boshi aylanmoqda va bo'yni og'riyapti." },
        { speaker: "911 Dispatcher", en: "Is there any smoke, leaking fuel, or fire hazard?", uz: "Tutun, oqayotgan yoqilg'i yoki yong'in xavfi bormi?" },
        { speaker: "Farrux", en: "No fire and no smoke, but both cars are blocking the right two lanes.", uz: "Olov va tutun yo'q, lekin ikkala mashina o'ngdagi ikkita yo'l qatorini to'sib qo'ygan." },
        { speaker: "911 Dispatcher", en: "Paramedics and police are en route to Michigan and Adams now. Stay in a safe spot on the sidewalk and keep an eye on traffic until officers arrive.", uz: "Tez yordam va politsiya hozir Michigan va Adams chorrahasiga qarab yo'lda. Piyodalar yo'lagida xavfsiz joyda turing va xodimlar kelguncha mashinalar harakatidan ehtiyot bo'ling." }
      ]
    },
    speakingPrompt: "911 dispetcheriga qo'ng'iroq qilib, ko'chadagi hodisa joyini, nechta mashina to'qnashganini va tez yordam hamda politsiya zarurligini ingliz tilida aniq ayting."
  },

  // =========================================================================
  // DAY 74: DMV Real ID & Driver's License Appointment
  // =========================================================================
  74: {
    dialogue: {
      title: "DMV idorasi: Real ID haydovchilik guvohnomasi va yozma imtihon",
      lines: [
        { speaker: "DMV Clerk", en: "Ticket number B-42, window 7! How can I help you today?", uz: "B-42 raqamli chipta, 7-oyna! Bugun qanday yordam bera olaman?" },
        { speaker: "Anvar", en: "Good morning! I have an appointment to apply for a Real ID driver's license and take the written knowledge test.", uz: "Xayrli tong! Men Real ID haydovchilik guvohnomasiga ariza topshirish va yozma bilim testini topshirish uchun yozilganman." },
        { speaker: "DMV Clerk", en: "Great. Please provide your proof of identity, Social Security card, and two documents proving state residency.", uz: "Ajoyib. Shaxsingizni tasdiqlovchi hujjat, Social Security kartangiz va shtatda yashashingizni isbotlovchi ikkita hujjatni taqdim eting." },
        { speaker: "Anvar", en: "Here is my unexpired foreign passport with I-94, my SSN card, my signed apartment lease, and my bank statement.", uz: "Mana I-94 varaqasi bilan amal qilish muddati tugamagan pasportim, SSN kartam, imzolangan ijara shartnomam va bank ko'chirmam." },
        { speaker: "DMV Clerk", en: "All documents meet the Real ID federal requirements. Step up to the vision screener and read the third line from left to right.", uz: "Barcha hujjatlar Real ID federal talablariga javob beradi. Ko'rish qobiliyatini tekshirish qurilmasiga yaqinlashing va chapdan o'ngga uchinchi qatorni o'qing." },
        { speaker: "Anvar", en: "D, E, F, P, O, T, E, C.", uz: "D, E, F, P, O, T, E, C." },
        { speaker: "DMV Clerk", en: "Vision test passed. The fee is $30. After payment, proceed to testing terminal 12 to start your 35-question written exam. You need 28 correct to pass.", uz: "Ko'rish testi topshirildi. To'lov $30. To'lagandan so'ng, 35 savollik yozma imtihonni boshlash uchun 12-terminalga o'ting. O'tish uchun 28 ta to'g'ri javob kerak bo'ladi." }
      ]
    },
    speakingPrompt: "DMV xodimiga Real ID olmoqchi ekanligingizni, barcha hujjatlarni (ijara shartnomasi, bank ko'chirmasi, pasport) keltirganingizni va yozma testni topshirishga tayyorligingizni ingliz tilida ayting."
  }
};
