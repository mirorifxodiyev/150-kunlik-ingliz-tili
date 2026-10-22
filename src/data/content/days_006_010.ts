import { DayContent } from "../../types";

export const DAYS_006_010: Record<number, DayContent> = {
  6: {
    vocabulary: [
      {
        en: "full name",
        uz: "to'liq ism va familiya",
        example: "Please print your full name at the top of the page.",
        exampleUz: "Iltimos, sahifaning yuqori qismiga to'liq ism-familiyangizni bosma harflarda yozing.",
        ipaOrRespelling: "FOOL NAYM",
      },
      {
        en: "street address",
        uz: "ko'cha va uy manzili",
        example: "My street address is 415 Oak Avenue.",
        exampleUz: "Mening ko'cha manzilim — Oak shohko'chasi, 415-uy.",
        ipaOrRespelling: "STREET uh-DRES",
      },
      {
        en: "email address",
        uz: "elektron pochta manzili",
        example: "What is your current email address?",
        exampleUz: "Hozirgi elektron pochta manzilingiz qanaqa?",
        ipaOrRespelling: "EE-mayl uh-DRES",
      },
      {
        en: "at sign (@)",
        uz: "@ belgisi (email manzillarda 'at' deb o'qiladi)",
        example: "My email is anvar at gmail dot com.",
        exampleUz: "Mening emailim — anvar 'at' (@) gmail 'dot' (.) com.",
        ipaOrRespelling: "AT syn",
      },
      {
        en: "dot",
        uz: "nuqta (internet va email manzillarda '.' belgisi)",
        example: "Don't forget the dot between your first and last name.",
        exampleUz: "Ismingiz va familiyangiz orasidagi nuqtani unutmang.",
        ipaOrRespelling: "DOT",
      },
      {
        en: "occupation",
        uz: "kasb / mashg'ulot (rasmiy anketalarda 'job' o'rniga)",
        example: "Write your occupation in section two.",
        exampleUz: "Ikkinchi bo'limga kasbingizni yozing.",
        ipaOrRespelling: "ah-kyoo-PAY-shun",
      },
      {
        en: "marital status",
        uz: "oilaviy holat (single yoki married)",
        example: "Check the box for your marital status.",
        exampleUz: "Oilaviy holatingiz katakchasiga belgi qo'ying.",
        ipaOrRespelling: "MAIR-uh-tul STAY-tus",
      },
      {
        en: "emergency contact",
        uz: "favqulodda holatda bog'laniladigan yaqin inson",
        example: "My brother is my emergency contact in the US.",
        exampleUz: "Akam — AQSHda favqulodda holatda bog'laniladigan yaqin insonim.",
        ipaOrRespelling: "ee-MUR-jun-see KON-takt",
      },
      {
        en: "signature",
        uz: "shaxsiy imzo",
        example: "We need your signature at the bottom of the form.",
        exampleUz: "Anketaning pastki qismiga shaxsiy imzongiz kerak.",
        ipaOrRespelling: "SIG-nuh-chur",
      },
      {
        en: "application form",
        uz: "ariza yoki ro'yxatdan o'tish anketasi",
        example: "Please fill out this application form in black ink.",
        exampleUz: "Iltimos, ushbu ariza anketasini qora ruchkada to'ldiring.",
        ipaOrRespelling: "ap-li-KAY-shun FORM",
      },
    ],
    grammar: {
      title: "O'zini to'liq tanishtirish qoliplari va AQSH rasmiy anketalarini (Forms) o'qish",
      explanationUz: `O'tgan 1–5-kunlarda alifbo (spelling), salomlashish, 'to be' fe'li, raqamlar va davlat/millat mavzularini o'rgandik. Bugun (6-kun) ushbu bilimlarni birlashtirib, o'zingiz haqingizda 5–6 gapdan iborat mukammal tanishtiruv (Self-Introduction) tuzishni hamda AQSHda ishga kirish, klinika yoki bankda beriladigan anketalarni (Application Forms) tushunishni o'rganamiz.

ASOSIY FORMULALAR:
1) Og'zaki o'zini tanishtirishning 5 qadamli formulasi:
   • 1-qadam (Ism): Hi, my full name is [First Name] [Last Name].
   • 2-qadam (Kelib chiqish): I am originally from [City], Uzbekistan.
   • 3-qadam (Hozirgi manzil): I am currently in [City], [State].
   • 4-qadam (Yosh va oilaviy holat): I am [Age] years old, and I am [married / single].
   • 5-qadam (Kasb va maqsad): I am a newcomer / warehouse worker, and I am learning American English.

2) AQSH manzili va Emailni to'g'ri aytish qoidasi:
   • Manzil: [Uy raqami] + [Ko'cha nomi] + [Apt #] + [Shahar, Shtat, ZIP code]. Masalan: 415 Oak Avenue, Apartment 3B, Brooklyn, NY 11230.
   • Email: '@' belgisi 'at', '.' belgisi 'dot', '_' esa 'underscore' deb o'qiladi: anvar.xodiyev@gmail.com → "anvar dot xodiyev at gmail dot com".`,
      examples: [
        {
          en: "My full name is Anvar Xodiyev, and my occupation is delivery driver.",
          uz: "Mening to'liq ism-familiyam Anvar Xodiyev va kasbim — yetkazib beruvchi haydovchi.",
        },
        {
          en: "What is your street address? — It is 415 Oak Avenue, Apartment 2C.",
          uz: "Ko'cha manzilingiz qanaqa? — Oak shohko'chasi, 415-uy, 2C-xonadon.",
        },
        {
          en: "My email address is anvar dot uz at gmail dot com (anvar.uz@gmail.com).",
          uz: "Mening elektron pochtam: anvar nuqta uz 'at' gmail nuqta com.",
        },
        {
          en: "Please write your emergency contact and put your signature here.",
          uz: "Iltimos, favqulodda holat uchun yaqin insoningizni yozing va bu yerga imzo qo'ying.",
        },
      ],
    },
    examples: [
      {
        en: "Please print your full name clearly on the application form.",
        uz: "Iltimos, ariza anketasiga to'liq ism-familiyangizni aniq bosma harflarda yozing.",
      },
      {
        en: "My marital status is married, and my wife is my emergency contact.",
        uz: "Oilaviy holatim — oilali, va rafiqam favqulodda holatda bog'laniladigan shaxsdir.",
      },
      {
        en: "How do you spell your street address?",
        uz: "Ko'cha manzilingizni qanday harflab aytasiz?",
      },
      {
        en: "There is a dot between my first name and last name in my email.",
        uz: "Emailimda ismim va familiyam orasida nuqta bor.",
      },
      {
        en: "What is your occupation? — I am a technician.",
        uz: "Kasbingiz nima? — Men texnik xodimman.",
      },
      {
        en: "Don't forget your signature and today's date at the bottom.",
        uz: "Pastki qismga imzongizni va bugungi sanani qo'yishni unutmang.",
      },
    ],
    dialogue: {
      title: "Jamoat markazida ingliz tili kursiga ro'yxatdan o'tish (Registering at a Community Center)",
      lines: [
        {
          speaker: "Coordinator",
          en: "Good morning! Welcome to the Community Learning Center. Are you here for the English class?",
          uz: "Xayrli tong! Jamoat o'quv markaziga xush kelibsiz. Ingliz tili darsi uchun keldingizmi?",
        },
        {
          speaker: "Anvar",
          en: "Good morning! Yes, I am ready to register. Here is my application form.",
          uz: "Xayrli tong! Ha, ro'yxatdan o'tishga tayyorman. Mana mening ariza anketam.",
        },
        {
          speaker: "Coordinator",
          en: "Thank you. Let me check your information. Your full name is Anvar Xodiyev, correct?",
          uz: "Rahmat. Ma'lumotlaringizni tekshirib olaman. To'liq ism-familiyangiz Anvar Xodiyev, to'g'rimi?",
        },
        {
          speaker: "Anvar",
          en: "Yes, that is correct. I am originally from Uzbekistan, and I am twenty-nine years old.",
          uz: "Ha, to'g'ri. Men asli O'zbekistondanman va yigirma to'qqiz yoshdaman.",
        },
        {
          speaker: "Coordinator",
          en: "Great. What is your current street address and zip code?",
          uz: "Ajoyib. Hozirgi ko'cha manzilingiz va pochta indeksingiz qanaqa?",
        },
        {
          speaker: "Anvar",
          en: "My street address is 415 Oak Avenue, Apartment 3C. The zip code is 11230.",
          uz: "Ko'cha manzilim — Oak shohko'chasi 415-uy, 3C-xonadon. Pochta indeksim — 11230.",
        },
        {
          speaker: "Coordinator",
          en: "And what is your email address?",
          uz: "Elektron pochta manzilingiz qanaqa?",
        },
        {
          speaker: "Anvar",
          en: "It is anvar dot xodiyev at gmail dot com.",
          uz: "anvar nuqta xodiyev 'at' (@) gmail nuqta com.",
        },
        {
          speaker: "Coordinator",
          en: "Perfect. Please put your signature at the bottom, and you are all set!",
          uz: "Juda soz. Iltimos, pastki qismga imzongizni qo'ying va hammasi tayyor bo'ladi!",
        },
      ],
    },
    speakingPrompt:
      "1–6-kunlarda o'rgangan barcha ma'lumotlarni birlashtirib, o'zingizni to'liq tanishtiring: to'liq ism-familiyangiz (harflab), yoshingiz, qayerdan ekanligingiz, AQSHdagi ko'cha manzilingiz, telefon raqamingiz, email manzilingiz ('at' va 'dot' bilan) hamda oilaviy holatingizni ovoz chiqarib ayting.",
    writingPrompt:
      "O'zingiz haqingizda 8–10 gapdan iborat to'liq tanishtiruv matni (Self-Introduction) va anketa ma'lumotlarini (Full Name, Age, Nationality, Marital Status, Occupation, Street Address, Email Address, Emergency Contact) yozing.",
    speakingSentences: [
      "Please print your full name on the application form.",
      "My street address is four fifteen Oak Avenue.",
      "My email is anvar at gmail dot com.",
      "Check the box for your marital status.",
      "My brother is my emergency contact.",
      "We need your signature at the bottom.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d6_1",
        type: "mcq-translation",
        prompt: "Rasmiy anketalardagi 'Marital status' iborasi nimani anglatadi?",
        options: [
          "oilaviy holat",
          "tug'ilgan sana",
          "uy manzili",
          "shaxsiy imzo",
        ],
        answer: "oilaviy holat",
        explanationUz: "'Marital status' — oilaviy holat (single — bo'ydoq, married — oilali).",
      },
      {
        id: "q_m1_d6_2",
        type: "grammar-choice",
        prompt: "'sardor.ali@gmail.com' email manzili ingliz tilida og'zaki qanday o'qiladi?",
        options: [
          "sardor dot ali at gmail dot com",
          "sardor point ali dog gmail point com",
          "sardor comma ali in gmail dot com",
          "sardor dot ali from gmail dot com",
        ],
        answer: "sardor dot ali at gmail dot com",
        explanationUz: "Email manzillarida '.' — 'dot', '@' esa 'at' deb o'qiladi.",
      },
      {
        id: "q_m1_d6_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'We need your ___ at the bottom of the form.' (shaxsiy imzo)",
        answer: "signature",
        explanationUz: "'Signature' — shaxsiy imzo.",
      },
      {
        id: "q_m1_d6_4",
        type: "mcq-translation",
        prompt: "'Emergency contact' kim?",
        options: [
          "Favqulodda holatda bog'laniladigan yaqin inson",
          "Ish joyidagi bosh hisobchi",
          "Pochta xodimi",
          "Kvartira egasi",
        ],
        answer: "Favqulodda holatda bog'laniladigan yaqin inson",
        explanationUz: "'Emergency contact' — shoshilinch yoki favqulodda vaziyatda qo'ng'iroq qilinadigan yaqin kishi.",
      },
      {
        id: "q_m1_d6_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Please fill out this ___ form.' (ariza / anketa)",
        answer: "application",
        explanationUz: "'Application form' — ariza yoki ro'yxatdan o'tish anketasi.",
      },
      {
        id: "q_m1_d6_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib savol tuzing:",
        options: ["What", "is", "your", "current", "email", "address?"],
        answer: "What is your current email address?",
        explanationUz: "'What is your current email address?' — Hozirgi elektron pochta manzilingiz qanaqa?",
      },
      {
        id: "q_m1_d6_7",
        type: "correct-sentence",
        prompt: "AQSH ko'cha manzilini aytishda qaysi tartib TO'G'RI?",
        options: [
          "My street address is 415 Oak Avenue.",
          "My street address is Oak Avenue 415 number.",
          "My street address are 415 from Oak Avenue.",
          "I am 415 Oak Avenue street address.",
        ],
        answer: "My street address is 415 Oak Avenue.",
        explanationUz: "AQSHda avval uy raqami, keyin ko'cha nomi aytiladi: '415 Oak Avenue'.",
      },
      {
        id: "q_m1_d6_8",
        type: "grammar-choice",
        prompt: "Anketada 'Occupation' deb yozilgan katakka nima yoziladi?",
        options: [
          "Kasbingiz (masalan, driver, nurse)",
          "Pochta indeksingiz (zip code)",
          "Millatingiz (Uzbek)",
          "Yoshingiz (29)",
        ],
        answer: "Kasbingiz (masalan, driver, nurse)",
        explanationUz: "'Occupation' — kasb yoki mashg'ulot turi.",
      },
    ],
    videos: [
      {
        title: "How to Introduce Yourself Naturally in American English (Speak English With Vanessa)",
        channel: "Speak English With Vanessa",
        url: "https://www.youtube.com/results?search_query=Speak+English+With+Vanessa+how+to+introduce+yourself+in+English",
        level: "A1 (Beginner)",
        durationMin: 14,
        verified: false,
      },
      {
        title: "How to Say Email Addresses & Street Addresses in English (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+how+to+say+addresses+email+numbers",
        level: "A1 (Beginner)",
        durationMin: 10,
        verified: false,
      },
    ],
  },

  7: {
    vocabulary: [
      {
        en: "introduce",
        uz: "tanishtirmoq",
        example: "Let me introduce myself and my coworker.",
        exampleUz: "O'zimni va hamkasbimni tanishtirishga ruxsat bering.",
        ipaOrRespelling: "in-truh-DOOS",
      },
      {
        en: "information",
        uz: "ma'lumot (sanalmaydigan ot — '-s' olmaydi)",
        example: "All your personal information is correct.",
        exampleUz: "Barcha shaxsiy ma'lumotlaringiz to'g'ri.",
        ipaOrRespelling: "in-fur-MAY-shun",
      },
      {
        en: "conversation",
        uz: "suhbat / muloqot",
        example: "We had a great conversation with our new neighbor.",
        exampleUz: "Yangi qo'shnimiz bilan ajoyib suhbat qurdik.",
        ipaOrRespelling: "kon-vur-SAY-shun",
      },
      {
        en: "pronunciation",
        uz: "talaffuz",
        example: "Your English pronunciation is getting clearer every day.",
        exampleUz: "Inglizcha talaffuzingiz kundan-kunga tiniqlashib boryapti.",
        ipaOrRespelling: "pruh-nun-see-AY-shun",
      },
      {
        en: "practice",
        uz: "mashq / amaliyot / mashq qilmoq",
        example: "Daily practice is the key to success.",
        exampleUz: "Har kunlik mashq — muvaffaqiyat kalitidir.",
        ipaOrRespelling: "PRAK-tis",
      },
      {
        en: "confident",
        uz: "o'ziga ishongan / dadil",
        example: "I am more confident when I speak slowly.",
        exampleUz: "Sekin gapirganimda o'zimga ko'proq ishonaman.",
        ipaOrRespelling: "KON-fuh-dunt",
      },
      {
        en: "mistake",
        uz: "xato",
        example: "Don't be afraid of making a small mistake.",
        exampleUz: "Kichik xato qilishdan qo'rqmang.",
        ipaOrRespelling: "mi-STAYK",
      },
      {
        en: "clear",
        uz: "aniq / tushunarli",
        example: "Your voice is very clear on the phone.",
        exampleUz: "Telefonda ovozingiz juda aniq eshitilyapti.",
        ipaOrRespelling: "KLEER",
      },
      {
        en: "everyday",
        uz: "kundalik / har kungi",
        example: "These phrases are very useful in everyday life.",
        exampleUz: "Bu iboralar kundalik hayotda juda foydali.",
        ipaOrRespelling: "EV-ree-day",
      },
      {
        en: "fluent",
        uz: "ravon gapiradigan",
        example: "My goal is to become fluent in American English.",
        exampleUz: "Maqsadim — Amerika ingliz tilida ravon gapiradigan bo'lish.",
        ipaOrRespelling: "FLOO-unt",
      },
    ],
    grammar: {
      title: "1-hafta umumlashtiruvchi xaritasi: Spelling, Greetings, 'To Be', Numbers va Origin",
      explanationUz: `Tabriklaymiz! Siz dasturning birinchi 7 kunini (35 soatlik poydevorni) yakunlayapsiz. Bugungi darsda 1–6-kunlarda o'rganilgan 5 ta eng muhim grammatik ustunni yagona tizimga keltiramiz va 1-haftalik nazorat testiga tayyorlanamiz:

1-USTUN (1-kun — Spelling):
• How do you spell your first/last name? → K-A-R-I-M-O-V. Yonma-yon kelgan ikkita bir xil harf yoki raqam: 'double' (double L).

2-USTUN (2-kun — Greetings & Goodbyes):
• Rasmiy: Good morning / afternoon / evening. Kundalik: How's it going? → Pretty good, thanks!
• Tanishuv: Nice to meet you! → Nice to meet you, too! Xayrlashuv: Have a good one! → You too, take care!

3-USTUN (3-kun — Subject Pronouns & 'To Be'):
• I am (I'm), You are (You're), He/She/It is (He's/She's/It's), We are (We're), They are (They're).
• Ingliz tilida ot, sifat yoki joylashuvni aytishda 'am / is / are' tushirib qoldirilmaydi: "She is busy", "We are ready".

4-USTUN (4-kun — Numbers, Age & Phone/ZIP):
• -teen (13–19, urg'u oxirida: fif-TEEN) vs -ty (30–90, urg'u boshida: FIF-ty, FOR-ty).
• Yosh: How old are you? → I am 29 years old ('I have 29 years' EMAS!).

5-USTUN (5–6-kunlar — Origin, Address & Email):
• Where are you originally from? → I am from Uzbekistan (Country) / I am Uzbek (Nationality).
• Email: '@' = at, '.' = dot.`,
      examples: [
        {
          en: "Let me introduce myself: I'm Anvar, I'm 29 years old, and I'm originally from Uzbekistan.",
          uz: "O'zimni tanishtirsam: men Anvarman, 29 yoshdaman va asli O'zbekistondanman.",
        },
        {
          en: "Is your information on the application form correct? — Yes, it is completely clear and correct.",
          uz: "Ariza anketasidagi ma'lumotlaringiz to'g'rimi? — Ha, u to'liq aniq va to'g'ri.",
        },
        {
          en: "We are more confident in everyday conversation after one week of practice.",
          uz: "Bir haftalik mashqdan so'ng kundalik suhbatda o'zimizga ko'proq ishonyapmiz.",
        },
        {
          en: "My coworker and my neighbor are very helpful with my English pronunciation.",
          uz: "Hamkasbim va qo'shnim inglizcha talaffuzimda juda katta yordam berishadi.",
        },
      ],
    },
    examples: [
      {
        en: "Everyday practice makes your pronunciation clear and natural.",
        uz: "Har kunlik mashq talaffuzingizni aniq va tabiiy qiladi.",
      },
      {
        en: "Please check all the information before you put your signature.",
        uz: "Imzo qo'yishdan oldin barcha ma'lumotlarni tekshirib chiqing.",
      },
      {
        en: "I am ready for my first English conversation at work.",
        uz: "Ishdagi birinchi inglizcha suhbatimga tayyorman.",
      },
      {
        en: "Making a mistake is normal when you learn a foreign language.",
        uz: "Xorijiy tilni o'rganayotganda xato qilish tabiiy hol.",
      },
      {
        en: "She is bilingual and fluent in both Uzbek and English.",
        uz: "U ikki tilni biladi hamda o'zbek va ingliz tillarida ravon gapiradi.",
      },
      {
        en: "We are confident and ready for the Week 1 test!",
        uz: "Biz o'zimizga ishonamiz va 1-hafta testiga tayyormiz!",
      },
    ],
    dialogue: {
      title: "1-hafta yakuni: O'quv markazida ilk suhbat sinovi (Week 1 Check-In Conversation)",
      lines: [
        {
          speaker: "Instructor",
          en: "Good afternoon, Anvar! How is it going today?",
          uz: "Xayrli kun, Anvar! Bugun ishlar qalay?",
        },
        {
          speaker: "Anvar",
          en: "Good afternoon! I am doing pretty good, thank you. I am ten minutes early today.",
          uz: "Xayrli kun! Ancha yaxshiman, rahmat. Bugun o'n daqiqa erta keldim.",
        },
        {
          speaker: "Instructor",
          en: "That is great! Are you ready for our Week 1 review conversation?",
          uz: "Ajoyib! 1-hafta takrorlash suhbatimizga tayyormisiz?",
        },
        {
          speaker: "Anvar",
          en: "Yes, I am confident and ready! My pronunciation is getting better with daily practice.",
          uz: "Ha, o'zimga ishonaman va tayyorman! Har kunlik mashq bilan talaffuzim yaxshilanyapti.",
        },
        {
          speaker: "Instructor",
          en: "Wonderful. Please introduce yourself and confirm your contact information.",
          uz: "Juda soz. Iltimos, o'zingizni tanishtiring va aloqa ma'lumotlaringizni tasdiqlang.",
        },
        {
          speaker: "Anvar",
          en: "Sure! My full name is Anvar Xodiyev — X-O-D-I-Y-E-V. I am 29 years old, married, and originally from Samarkand, Uzbekistan.",
          uz: "Albatta! To'liq ism-familiyam Anvar Xodiyev — X-O-D-I-Y-E-V. Men 29 yoshdaman, oilaliman va asli O'zbekistonning Samarqand shahridanman.",
        },
        {
          speaker: "Instructor",
          en: "Very clear! And what is your phone number and zip code?",
          uz: "Juda aniq! Telefon raqamingiz va pochta indeksingiz necha?",
        },
        {
          speaker: "Anvar",
          en: "My phone number is 718-555-0150, and my zip code is 11230.",
          uz: "Telefon raqamim — 718-555-0150, pochta indeksim esa 11230.",
        },
        {
          speaker: "Instructor",
          en: "Excellent job, Anvar! No mistakes at all. Have a good one!",
          uz: "Barakalla, Anvar! Umuman xato yo'q. Kuningiz yaxshi o'tsin!",
        },
      ],
    },
    speakingPrompt:
      "Kitob va daftarga qaramasdan, 2 daqiqa davomida 1-haftada o'rgangan barcha mavzularingizni qo'llab o'zingiz, oilangiz, manzilingiz va ingliz tili maqsadingiz haqida to'xtovsiz gapiring.",
    writingPrompt:
      "1-haftada o'rganilgan 70 ta so'zdan kamida 15 tasini qatnashtirib, 'My First Week of Learning American English' mavzusida 10 ta gapdan iborat xulosa yozing.",
    speakingSentences: [
      "Let me introduce myself and my coworker.",
      "All your personal information is correct.",
      "Your English pronunciation is very clear.",
      "Daily practice makes me more confident.",
      "These phrases are useful in everyday conversation.",
      "My goal is to become fluent in American English.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d7_1",
        type: "mcq-translation",
        prompt: "'Confident' sifatining o'zbekcha ma'nosi nima?",
        options: [
          "o'ziga ishongan / dadil",
          "charchagan / holsiz",
          "kechikkan",
          "xorijiy",
        ],
        answer: "o'ziga ishongan / dadil",
        explanationUz: "'Confident' — o'ziga va bilimiga ishongan, dadil.",
      },
      {
        id: "q_m1_d7_2",
        type: "grammar-choice",
        prompt: "1-hafta takrori: Qaysi qatorda 'to be' fe'li va millat nomi TO'G'RI ishlatilgan?",
        options: [
          "We are originally from Uzbekistan, and we are Uzbek.",
          "We is originally from Uzbekistan, and we are from Uzbek.",
          "We am from Uzbekistan, and our native language Uzbek.",
          "We are originally in Uzbekistan, and we have 29 years.",
        ],
        answer: "We are originally from Uzbekistan, and we are Uzbek.",
        explanationUz: "'We are from + Country' va 'We are + Nationality'.",
      },
      {
        id: "q_m1_d7_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Let me ___ myself.' (tanishtirmoq)",
        answer: "introduce",
        explanationUz: "'Let me introduce myself' — O'zimni tanishtirishga ruxsat bering.",
      },
      {
        id: "q_m1_d7_4",
        type: "mcq-translation",
        prompt: "'Pronunciation' so'zining o'zbekcha tarjimasi nima?",
        options: ["talaffuz", "tarjima", "imzo", "qo'shni"],
        answer: "talaffuz",
        explanationUz: "'Pronunciation' — tovush va so'zlarning talaffuzi.",
      },
      {
        id: "q_m1_d7_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'My goal is to become ___ in American English.' (ravon)",
        answer: "fluent",
        explanationUz: "'Fluent' — tilda erkin va ravon gapiradigan.",
      },
      {
        id: "q_m1_d7_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["Daily", "practice", "makes", "me", "more", "confident."],
        answer: "Daily practice makes me more confident.",
        explanationUz: "'Daily practice makes me more confident.' — Har kunlik mashq meni yanada dadil qiladi.",
      },
      {
        id: "q_m1_d7_7",
        type: "correct-sentence",
        prompt: "Qaysi gapda 'information' (ma'lumot) so'zi grammatik TO'G'RI ishlatilgan?",
        options: [
          "All your personal information is correct.",
          "All your personal informations are correct.",
          "This informations is correct.",
          "Many informations are on the form.",
        ],
        answer: "All your personal information is correct.",
        explanationUz: "'Information' ingliz tilida sanalmaydigan ot bo'lib, hech qachon '-s' ko'plik qo'shimchasini olmaydi va birlik fe'l ('is') bilan keladi.",
      },
      {
        id: "q_m1_d7_8",
        type: "grammar-choice",
        prompt: "1-hafta takrori: '15' va '50' sonlarining to'g'ri yozilishi qaysi?",
        options: [
          "fifteen / fifty",
          "fiveteen / fivety",
          "fifteen / fourty",
          "fifty / fifteen",
        ],
        answer: "fifteen / fifty",
        explanationUz: "15 — fifteen (fif-TEEN), 50 — fifty (FIF-tee).",
      },
    ],
    videos: [
      {
        title: "Let's Learn English Levels 1–5 Review Conversation (VOA Learning English)",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+Let%27s+Learn+English+Lesson+2+Lesson+3",
        level: "A1 (Beginner)",
        durationMin: 10,
        verified: false,
      },
      {
        title: "Beginner English Conversation Practice for Daily Life (Speak English With Vanessa)",
        channel: "Speak English With Vanessa",
        url: "https://www.youtube.com/results?search_query=Speak+English+With+Vanessa+beginner+daily+conversation+practice",
        level: "A1 (Beginner)",
        durationMin: 15,
        verified: false,
      },
    ],
  },

  8: {
    vocabulary: [
      {
        en: "umbrella",
        uz: "soyabon ('u' harfi /ʌ/ unli tovush bergani uchun: 'an umbrella')",
        example: "Take an umbrella; it is cloudy today.",
        exampleUz: "Soyabon oling; bugun havo bulutli.",
        ipaOrRespelling: "um-BREL-uh",
      },
      {
        en: "hour",
        uz: "soat (60 daqiqa; 'h' harfi O'QILMAYDI: 'an hour')",
        example: "My lunch break is half an hour, or sometimes an hour.",
        exampleUz: "Tushlik tanaffusim yarim soat, ba'zan esa bir soat.",
        ipaOrRespelling: "OW-ur",
      },
      {
        en: "university",
        uz: "universitet ('u' harfi /juː/ undosh tovushi bilan boshlangani uchun: 'a university')",
        example: "There is a university near our neighborhood.",
        exampleUz: "Mahallamiz yaqinida universitet bor.",
        ipaOrRespelling: "yoo-nuh-VUR-suh-tee",
      },
      {
        en: "uniform",
        uz: "maxsus ish formasi (/juː/ tovushi bilan boshlanadi: 'a uniform')",
        example: "Every employee wears a uniform at the warehouse.",
        exampleUz: "Omborda har bir xodim maxsus ish formasi kiyadi.",
        ipaOrRespelling: "YOO-nuh-form",
      },
      {
        en: "apartment",
        uz: "kvartira / xonadon ('an apartment')",
        example: "We rent an apartment in Brooklyn.",
        exampleUz: "Biz Bruklinda kvartira ijaraga olganmiz.",
        ipaOrRespelling: "uh-PART-munt",
      },
      {
        en: "office",
        uz: "idora / ofis ('an office')",
        example: "The leasing office is on the first floor.",
        exampleUz: "Ijara idorasi birinchi qavatda joylashgan.",
        ipaOrRespelling: "AW-fis",
      },
      {
        en: "ID card",
        uz: "shaxsni tasdiqlovchi guvohnoma ('I' /aɪ/ unli tovush: 'an ID card')",
        example: "Please show an ID card at the security desk.",
        exampleUz: "Iltimos, xavfsizlik postida shaxsni tasdiqlovchi guvohnoma ko'rsating.",
        ipaOrRespelling: "eye-DEE kard",
      },
      {
        en: "driver's license",
        uz: "haydovchilik guvohnomasi ('a driver's license')",
        example: "A driver's license is the main ID in the United States.",
        exampleUz: "Haydovchilik guvohnomasi AQSHda asosiy shaxsni tasdiqlovchi hujjatdir.",
        ipaOrRespelling: "DRY-vurz LY-suns",
      },
      {
        en: "elevator",
        uz: "lift (AQSHda 'lift' emas, 'elevator' deyiladi: 'an elevator')",
        example: "Let's take an elevator to the fifth floor.",
        exampleUz: "Beshinchi qavatga liftda chiqaylik.",
        ipaOrRespelling: "EL-uh-vay-tur",
      },
      {
        en: "appointment",
        uz: "oldindan belgilangan qabul yoki uchrashuv vaqti ('an appointment')",
        example: "I have an appointment at the bank at ten o'clock.",
        exampleUz: "Soat o'nda bankda oldindan belgilangan uchrashuvim bor.",
        ipaOrRespelling: "uh-POYNT-munt",
      },
    ],
    grammar: {
      title: "Noaniq artikllar: 'A' va 'An' — Harfga emas, TOVUSHGA qarash qoidasi!",
      explanationUz: `O'zbek tilida artikllar mavjud emas, ammo ingliz tilida sanaladigan birlikdagi ot (singular countable noun) yakka holda kelsa, uning oldidan deyarli doimo 'a' yoki 'an' (bir / bitta degan ma'noda) qo'yilishi SHART! Masalan, kasbni aytganda (3 va 6-kunlarni eslang): "I am driver" deyish XATO, "I am a driver" deyish to'g'ri.

ENG MUHIM OLTIN QOIDA — Yozuvdagi harfga emas, birinchi TOVUSHGA qarang!
1) 'A' + Undosh tovush (Consonant sound):
   • a car, a warehouse, a driver's license, a neighbor.
   • MAXSUS HOLAT ('U' harfi /juː/ — 'y' undosh tovushi bilan o'qilsa, 'A' qo'yiladi!):
     - a university (/juː.../) — Xato: an university
     - a uniform (/juː.../) — Xato: an uniform
     - a European country (/jʊ.../)

2) 'AN' + Unli tovush (Vowel sound: a, e, i, o, u tovushlari):
   • an apartment, an office, an elevator, an appointment, an umbrella (/ʌm.../).
   • MAXSUS HOLAT (O'qilmaydigan 'H' va qisqartmalar):
     - an hour (/aʊər/ — 'h' o'qilmaydi!)
     - an honest person ('h' o'qilmaydi)
     - an ID card (/aɪ-diː/)

3) Agar ot oldidan sifat kelsa, artikl SIFATNING birinchi tovushiga moslashadi:
   • an office → a big office; a driver → an experienced driver.`,
      examples: [
        {
          en: "I have an appointment in an hour.",
          uz: "Bir soatdan keyin qabul uchrashuvim bor.",
        },
        {
          en: "He wears a uniform at work, and he carries an umbrella when it rains.",
          uz: "U ishda maxsus forma kiyadi va yomg'ir yoqqanda soyabon olib yuradi.",
        },
        {
          en: "She is a student at a university in Chicago, and she lives in an apartment.",
          uz: "U Chikagodagi bir universitetda talaba va kvartirada yashaydi.",
        },
        {
          en: "Do you have a driver's license or an ID card?",
          uz: "Sizda haydovchilik guvohnomasi yoki shaxsni tasdiqlovchi guvohnoma bormi?",
        },
      ],
    },
    examples: [
      {
        en: "There is an elevator right next to the main office.",
        uz: "Bosh ofisning shundoq yonida lift bor.",
      },
      {
        en: "Wait for me; I will be ready in an hour.",
        uz: "Meni kutib turing; bir soatda tayyor bo'laman.",
      },
      {
        en: "My brother is an electrician, and I am a warehouse technician.",
        uz: "Akam — elektrik, men esa ombor texnik xodimiman.",
      },
      {
        en: "You need an appointment to apply for a driver's license.",
        uz: "Haydovchilik guvohnomasiga topshirish uchun oldindan qabul vaqti olishingiz kerak.",
      },
      {
        en: "It is a small apartment, but it is in a great neighborhood.",
        uz: "Bu kichkina kvartira, lekin u ajoyib mahallada joylashgan.",
      },
      {
        en: "Please bring a black pen and an ID card tomorrow morning.",
        uz: "Iltimos, ertaga ertalab qora ruchka va shaxsni tasdiqlovchi guvohnoma olib keling.",
      },
    ],
    dialogue: {
      title: "Biznes markazi kirish postida ro'yxatdan o'tish (At the Building Security Desk)",
      lines: [
        {
          speaker: "Security Guard",
          en: "Good morning, sir. How can I help you today?",
          uz: "Xayrli tong, janob. Bugun sizga qanday yordam bera olaman?",
        },
        {
          speaker: "Anvar",
          en: "Good morning. I have an appointment at the human resources office.",
          uz: "Xayrli tong. Kadrlar bo'limi idorasida oldindan belgilangan uchrashuvim bor.",
        },
        {
          speaker: "Security Guard",
          en: "Sure. Are you a new employee here?",
          uz: "Albatta. Siz bu yerda yangi xodimmisiz?",
        },
        {
          speaker: "Anvar",
          en: "Yes, I am. I am here to pick up a uniform and an ID card.",
          uz: "Ha. Men maxsus ish formasi va guvohnoma olish uchun keldim.",
        },
        {
          speaker: "Security Guard",
          en: "Got it. May I see a driver's license or a passport, please?",
          uz: "Tushundim. Haydovchilik guvohnomasi yoki pasportni ko'rsam bo'ladimi, iltimos?",
        },
        {
          speaker: "Anvar",
          en: "Here is my driver's license. My full name is Anvar Xodiyev.",
          uz: "Mana mening haydovchilik guvohnomam. To'liq ism-familiyam Anvar Xodiyev.",
        },
        {
          speaker: "Security Guard",
          en: "Thank you, Anvar. The office is on the fourth floor. Take an elevator on your right.",
          uz: "Rahmat, Anvar. Idora to'rtinchi qavatda. O'ng tarafingizdagi liftga chiqing.",
        },
        {
          speaker: "Anvar",
          en: "Thank you! The meeting takes about an hour, right?",
          uz: "Rahmat! Uchrashuv taxminan bir soat davom etadi, to'g'rimi?",
        },
        {
          speaker: "Security Guard",
          en: "Yes, about an hour. Have a good one!",
          uz: "Ha, taxminan bir soat. Kuningiz yaxshi o'tsin!",
        },
      ],
    },
    speakingPrompt:
      "Atrofingizdagi buyumlar, o'zingizning kasbingiz, uyingiz va bugungi rejalaringiz haqida 'a' va 'an' artikllarini qatnashtirib 8 ta gapni ovoz chiqarib ayting (masalan: an apartment, an hour, a uniform, a university, an ID card).",
    writingPrompt:
      "'A' va 'An' qoidasiga oid 10 ta gap yozing. Gaplaringizda 'hour', 'umbrella', 'uniform', 'university', 'apartment', 'office', 'elevator', 'appointment', 'ID card', 'driver's license' so'zlarini to'g'ri artikl bilan qo'llang.",
    speakingSentences: [
      "I have an appointment in an hour.",
      "Every worker wears a uniform at the warehouse.",
      "There is a university near our apartment.",
      "Please show an ID card or a driver's license.",
      "Let's take an elevator to the main office.",
      "Take an umbrella with you today.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d8_1",
        type: "grammar-choice",
        prompt: "To'g'ri artiklni tanlang: 'I will be ready in ___ hour.' (bir soatda)",
        options: ["an", "a", "the", "—"],
        answer: "an",
        explanationUz: "'Hour' so'zida 'h' harfi o'qilmaydi va unli tovush (/aʊər/) bilan boshlangani uchun 'an hour' bo'ladi.",
      },
      {
        id: "q_m1_d8_2",
        type: "grammar-choice",
        prompt: "To'g'ri artiklni tanlang: 'Every employee wears ___ uniform.'",
        options: ["a", "an", "two", "are"],
        answer: "a",
        explanationUz: "'Uniform' so'zi /juː/ ('y' undosh tovushi) bilan boshlangani uchun 'a uniform' deyiladi.",
      },
      {
        id: "q_m1_d8_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring ('a' yoki 'an'): 'We rent ___ apartment in Brooklyn.'",
        answer: "an",
        explanationUz: "'Apartment' unli tovush bilan boshlangani uchun 'an apartment' bo'ladi.",
      },
      {
        id: "q_m1_d8_4",
        type: "mcq-translation",
        prompt: "Amerika ingliz tilida 'Elevator' nima?",
        options: [
          "lift",
          "zinapoya",
          "avtoturargoh",
          "kirish eshigi",
        ],
        answer: "lift",
        explanationUz: "AQSHda ko'p qavatli binolardagi lift 'elevator' deb ataladi.",
      },
      {
        id: "q_m1_d8_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring ('a' yoki 'an'): 'There is ___ university near our street.'",
        answer: "a",
        explanationUz: "'University' /juː/ undosh tovushi bilan boshlangani sababli 'a university' ishlatiladi.",
      },
      {
        id: "q_m1_d8_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["I", "have", "an", "appointment", "at", "the", "office."],
        answer: "I have an appointment at the office.",
        explanationUz: "'I have an appointment at the office.' — Idorada oldindan belgilangan uchrashuvim bor.",
      },
      {
        id: "q_m1_d8_7",
        type: "correct-sentence",
        prompt: "Qaysi gapda 'a / an' artikllari TO'G'RI qo'llangan?",
        options: [
          "Bring an umbrella and an ID card.",
          "Bring a umbrella and a ID card.",
          "He is an university student in an uniform.",
          "Wait for a hour in a elevator.",
        ],
        answer: "Bring an umbrella and an ID card.",
        explanationUz: "'Umbrella' (/ʌ/) va 'ID' (/aɪ/) unli tovush bilan boshlangani uchun ikkalasi ham 'an' oladi.",
      },
      {
        id: "q_m1_d8_8",
        type: "mcq-translation",
        prompt: "'Appointment' so'zining kundalik Amerika hayotidagi ma'nosi nima?",
        options: [
          "oldindan belgilangan qabul yoki uchrashuv vaqti",
          "kvartira ijara shartnomasi",
          "telefonning hudud kodi",
          "shaxsiy imzo",
        ],
        answer: "oldindan belgilangan qabul yoki uchrashuv vaqti",
        explanationUz: "Shifokor, bank yoki DMV ga oldindan yozilgan vaqt 'appointment' deyiladi.",
      },
    ],
    videos: [
      {
        title: "When to Use 'A' vs 'An' in American English (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+articles+a+vs+an+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 9,
        verified: false,
      },
      {
        title: "English Articles A and An — Sound Rules & Exceptions (VOA Learning English)",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+indefinite+articles+a+an+beginner",
        level: "A1 (Beginner)",
        durationMin: 6,
        verified: false,
      },
    ],
  },

  9: {
    vocabulary: [
      {
        en: "box / boxes",
        uz: "quti / qutilar (-x dan keyin -es qo'shiladi)",
        example: "There are ten heavy boxes in the warehouse.",
        exampleUz: "Omborda o'nta og'ir quti bor.",
        ipaOrRespelling: "BOKS / BOK-siz",
      },
      {
        en: "bus / buses",
        uz: "avtobus / avtobuslar (-s dan keyin -es qo'shiladi)",
        example: "City buses run every fifteen minutes.",
        exampleUz: "Shahar avtobuslari har o'n besh daqiqada qatnaydi.",
        ipaOrRespelling: "BUS / BUS-iz",
      },
      {
        en: "city / cities",
        uz: "shahar / shaharlar (undosh + y → -ies)",
        example: "New York and Chicago are large American cities.",
        exampleUz: "Nyu-York va Chikago — Amerikaning yirik shaharlari.",
        ipaOrRespelling: "SIT-ee / SIT-eez",
      },
      {
        en: "family / families",
        uz: "oila / oilalar (undosh + y → -ies)",
        example: "Three Uzbek families live in our apartment building.",
        exampleUz: "Bizning ko'p qavatli uyimizda uchta o'zbek oilasi yashaydi.",
        ipaOrRespelling: "FAM-lee / FAM-leez",
      },
      {
        en: "knife / knives",
        uz: "pichoq / pichoqlar (-fe → -ves; 'k' harfi o'qilmaydi!)",
        example: "Keep sharp knives in a safe drawer.",
        exampleUz: "O'tkir pichoqlarni xavfsiz tortmada saqlang.",
        ipaOrRespelling: "NYF / NYVZ",
      },
      {
        en: "shelf / shelves",
        uz: "tokcha, javon / tokchalar (-f → -ves)",
        example: "Put the boxes on the top shelves.",
        exampleUz: "Qutilarni yuqori tokchalarga qo'ying.",
        ipaOrRespelling: "SHELF / SHELVZ",
      },
      {
        en: "man / men",
        uz: "erkak / erkaklar (noto'g'ri ko'plik)",
        example: "Two men are waiting near the elevator.",
        exampleUz: "Lift yonida ikki erkak kutib turibdi.",
        ipaOrRespelling: "MAN / MEN",
      },
      {
        en: "woman / women",
        uz: "ayol / ayollar (DIQQAT: ko'plikda /WIM-in/ deb o'qiladi!)",
        example: "Several women in our office are bilingual.",
        exampleUz: "Idoramizdagi bir nechta ayollar ikki tilni bilishadi.",
        ipaOrRespelling: "WOOM-un / WIM-in",
      },
      {
        en: "child / children",
        uz: "bola, farzand / bolalar, farzandlar ('childrens' deyish XATO!)",
        example: "We are married and we have three children.",
        exampleUz: "Biz oilalimiz va uch nafar farzandimiz bor.",
        ipaOrRespelling: "CHYLD / CHIL-drun",
      },
      {
        en: "person / people",
        uz: "bir odam, shaxs / odamlar ('peoples' deyish XATO!)",
        example: "Fifty people work on the morning shift.",
        exampleUz: "Ertalabki smenada ellik nafar odam ishlaydi.",
        ipaOrRespelling: "PUR-sun / PEE-pul",
      },
    ],
    grammar: {
      title: "Otlarning birlik (Singular) va ko'plik (Plural) shakllari hamda Noto'g'ri ko'pliklar",
      explanationUz: `Kecha (8-kun) birlikdagi otlar oldidan 'a / an' qo'yilishini o'rgandik. Ot ko'plikda (2 va undan ortiq) bo'lganda esa 'a / an' TUSHIB QOLADI va fe'l ham ko'plik shaklini oladi (is → are): "an apartment" → "two apartments", "a box is" → "three boxes are".

KO'PLIK YASASHNING 4 TA QOIDASI:
1) Muntazam otlar (+s):
   • car → cars, coworker → coworkers, neighbor → neighbors, hour → hours.

2) -s, -ss, -sh, -ch, -x bilan tugagan otlar (+es, /ɪz/ deb o'qiladi):
   • box → boxes (/BOK-siz/), bus → buses (/BUS-iz/), watch → watches, dish → dishes.

3) Undosh + 'y' bilan tugagan otlar ('y' → '-ies' ga aylanadi):
   • city → cities, country → countries, family → families.
   • Eslatma: Agar 'y' dan oldin UNLI harf bo'lsa, faqat '-s' qo'shiladi: boy → boys, key → keys, day → days.

4) '-f / -fe' bilan tugagan otlar ('-ves' ga aylanadi) va Noto'g'ri (Irregular) otlar:
   • shelf → shelves, knife → knives, wife → wives.
   • Noto'g'ri ko'pliklar (ularga '-s' qo'shish QAT'IYAN XATO!):
     - a man → men
     - a woman → women (talaffuzi: /WIM-in/)
     - a child → children (Xato: childs / childrens)
     - a person → people (Xato: persons / peoples — oddiy nutqda)`,
      examples: [
        {
          en: "One person is in the office, and ten people are in the warehouse.",
          uz: "Idorada bir kishi, omborda esa o'n nafar odam bor.",
        },
        {
          en: "My brother has one child, and I have three children.",
          uz: "Akamning bitta farzandi bor, mening esa uch nafar farzandim bor.",
        },
        {
          en: "Please put these heavy boxes on the metal shelves.",
          uz: "Iltimos, bu og'ir qutilarni temir tokchalarga qo'ying.",
        },
        {
          en: "Many families from different countries live in big American cities.",
          uz: "Turli davlatlardan kelgan ko'plab oilalar Amerikaning katta shaharlarida yashaydilar.",
        },
      ],
    },
    examples: [
      {
        en: "Two buses stop right in front of our apartment building.",
        uz: "Ko'p qavatli uyimizning shundoq oldida ikkita avtobus to'xtaydi.",
      },
      {
        en: "Three men and four women are in the meeting room.",
        uz: "Majlislar xonasida uch nafar erkak va to'rt nafar ayol bor.",
      },
      {
        en: "The forks, spoons, and knives are clean.",
        uz: "Sanchqilar, qoshiqlar va pichoqlar toza.",
      },
      {
        en: "How many children do you have?",
        uz: "Nechta farzandingiz bor?",
      },
      {
        en: "People in this neighborhood are very friendly.",
        uz: "Bu mahalladagi odamlar juda samimiy.",
      },
      {
        en: "All the shelves in the storage room are full of boxes.",
        uz: "Saqlash xonasidagi barcha tokchalar qutilar bilan to'la.",
      },
    ],
    dialogue: {
      title: "Omborda yuk va qutilarni joylashtirish (Organizing Boxes at the Warehouse)",
      lines: [
        {
          speaker: "Carlos",
          en: "Good morning, Anvar! Are you ready for the morning shift?",
          uz: "Xayrli tong, Anvar! Ertalabki smenaga tayyormisiz?",
        },
        {
          speaker: "Anvar",
          en: "Good morning, Carlos! Yes, I am ready. We have a lot of boxes today!",
          uz: "Xayrli tong, Karlos! Ha, tayyorman. Bugun bizda qutilar juda ko'p ekan!",
        },
        {
          speaker: "Carlos",
          en: "Yes, these boxes are for three different cities in Ohio.",
          uz: "Ha, bu qutilar Ogayo shtatidagi uchta turli shahar uchun.",
        },
        {
          speaker: "Anvar",
          en: "Where do we put the small boxes?",
          uz: "Kichik qutilarni qayerga qo'yamiz?",
        },
        {
          speaker: "Carlos",
          en: "Put the small boxes on the top shelves, and leave the big boxes on the floor.",
          uz: "Kichik qutilarni yuqori tokchalarga qo'ying, katta qutilarni esa polda qoldiring.",
        },
        {
          speaker: "Anvar",
          en: "Got it. Do we have box-cutter knives for opening the shipments?",
          uz: "Tushundim. Yuklarni ochish uchun quti kesadigan pichoqlarimiz bormi?",
        },
        {
          speaker: "Carlos",
          en: "Yes, the safety knives are in the main office. Two men and three women from our team are already there.",
          uz: "Ha, xavfsiz pichoqlar bosh ofisda. Jamoamizdan ikki erkak va uch ayol allaqachon o'sha yerda.",
        },
        {
          speaker: "Anvar",
          en: "Great! Working with fifteen people makes the job much faster.",
          uz: "Ajoyib! O'n besh nafar odam bilan ishlash ishni ancha tezlashtiradi.",
        },
      ],
    },
    speakingPrompt:
      "Atrofingizdagi yoki ish joyingizdagi narsalar va odamlar haqida birlik va ko'plik otlarni (masalan: one box — ten boxes, one child — two children, one person — many people, shelves, cities, families) qatnashtirib 6–8 ta gapni ovoz chiqarib ayting.",
    writingPrompt:
      "Quyidagi 10 ta so'zning birlik va ko'plik shaklini qatnashtirib 8–10 ta gap yozing: box/boxes, bus/buses, city/cities, family/families, knife/knives, shelf/shelves, man/men, woman/women, child/children, person/people.",
    speakingSentences: [
      "There are ten heavy boxes on the shelves.",
      "City buses run every fifteen minutes.",
      "Three Uzbek families live in our building.",
      "Two men and four women work in this office.",
      "We are married and we have three children.",
      "Fifty people work on the morning shift.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d9_1",
        type: "grammar-choice",
        prompt: "'Child' (bola) va 'Person' (odam) so'zlarining to'g'ri ko'plik shakli qaysi?",
        options: [
          "children / people",
          "childs / persons",
          "childrens / peoples",
          "childes / people",
        ],
        answer: "children / people",
        explanationUz: "Noto'g'ri ko'pliklar: a child → children, a person → people. Ularga '-s' qo'shilmaydi!",
      },
      {
        id: "q_m1_d9_2",
        type: "fill-blank",
        prompt: "'City' (shahar) so'zining ko'plik shaklini yozing:",
        answer: "cities",
        explanationUz: "'City' undosh + 'y' bilan tugagani uchun 'y' tushib, '-ies' qo'shiladi: cities.",
      },
      {
        id: "q_m1_d9_3",
        type: "fill-blank",
        prompt: "'Shelf' (tokcha) so'zining ko'plik shaklini yozing:",
        answer: "shelves",
        explanationUz: "'-f' bilan tugagan 'shelf' ko'plikda '-ves' oladi: shelves.",
      },
      {
        id: "q_m1_d9_4",
        type: "mcq-translation",
        prompt: "'Women' (/WIM-in/) so'zining ma'nosi nima?",
        options: ["ayollar (ko'plik)", "bir ayol (birlik)", "erkaklar", "bolalar"],
        answer: "ayollar (ko'plik)",
        explanationUz: "'A woman' (/WOOM-un/) — bir ayol, 'women' (/WIM-in/) — ayollar.",
      },
      {
        id: "q_m1_d9_5",
        type: "correct-sentence",
        prompt: "Qaysi gap grammatik jihatdan TO'G'RI tuzilgan?",
        options: [
          "Fifty people work at our warehouse.",
          "Fifty peoples work at our warehouse.",
          "Fifty a person work at our warehouse.",
          "Fifty person is at our warehouse.",
        ],
        answer: "Fifty people work at our warehouse.",
        explanationUz: "'People' ko'plikdagi ot bo'lib, '-s' olmaydi.",
      },
      {
        id: "q_m1_d9_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["Put", "the", "small", "boxes", "on", "the", "shelves."],
        answer: "Put the small boxes on the shelves.",
        explanationUz: "'Put the small boxes on the shelves.' — Kichik qutilarni tokchalarga qo'ying.",
      },
      {
        id: "q_m1_d9_7",
        type: "grammar-choice",
        prompt: "8–9-kunlar bog'lanishi: 'An office' birikmasini ko'plikda ('3 ta ofis') qanday aytamiz?",
        options: [
          "three offices",
          "three an offices",
          "three office",
          "an three offices",
        ],
        answer: "three offices",
        explanationUz: "Ko'plikda 'a / an' tushib qoladi va otga '-s' qo'shiladi: three offices.",
      },
      {
        id: "q_m1_d9_8",
        type: "mcq-translation",
        prompt: "'Knife / Knives' so'zining o'zbekcha tarjimasi va boshidagi o'qilmaydigan harfi qaysi?",
        options: [
          "pichoq / pichoqlar ('k' harfi o'qilmaydi)",
          "quti / qutilar ('b' harfi o'qilmaydi)",
          "kalit / kalitlar ('k' harfi o'qilmaydi)",
          "tokcha / tokchalar ('s' harfi o'qilmaydi)",
        ],
        answer: "pichoq / pichoqlar ('k' harfi o'qilmaydi)",
        explanationUz: "'Knife' (/naɪf/) va 'knives' (/naɪvz/) — pichoq / pichoqlar; boshidagi 'k' o'qilmaydi.",
      },
    ],
    videos: [
      {
        title: "Singular and Plural Nouns + Irregular Plurals in American English (VOA Learning English)",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+plural+nouns+irregular+plurals",
        level: "A1 (Beginner)",
        durationMin: 7,
        verified: false,
      },
      {
        title: "How to Pronounce Woman vs Women & Plural -S Endings (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+woman+vs+women+pronunciation+plural+s",
        level: "A1 (Beginner)",
        durationMin: 9,
        verified: false,
      },
    ],
  },

  10: {
    vocabulary: [
      {
        en: "this",
        uz: "bu / mana bu (yaqindagi bitta narsa yoki shaxs)",
        example: "This is my new driver's license.",
        exampleUz: "Mana bu — mening yangi haydovchilik guvohnomam.",
        ipaOrRespelling: "THIS",
      },
      {
        en: "that",
        uz: "u / anavi (uzoqdagi bitta narsa yoki shaxs)",
        example: "That building over there is our warehouse.",
        exampleUz: "Anavi yerdagi bino — bizning omborimiz.",
        ipaOrRespelling: "THAT",
      },
      {
        en: "these",
        uz: "bular / mana bular (yaqindagi ko'p narsalar; cho'ziq /iːz/ bilan o'qiladi)",
        example: "These boxes right here are very heavy.",
        exampleUz: "Mana bu yerdagi qutilar juda og'ir.",
        ipaOrRespelling: "THEEZ",
      },
      {
        en: "those",
        uz: "ular / anavilar (uzoqdagi ko'p narsalar)",
        example: "Those shelves over there are empty.",
        exampleUz: "Anavi yerdagi tokchalar bo'sh.",
        ipaOrRespelling: "THOHZ",
      },
      {
        en: "right here",
        uz: "shundoq shu yerda / mana bu yerda ('this / these' bilan ko'p keladi)",
        example: "Put your signature right here on this line.",
        exampleUz: "Imzongizni shundoq mana shu chiziqqa qo'ying.",
        ipaOrRespelling: "RYT HEER",
      },
      {
        en: "over there",
        uz: "anavi yerda / uzoqroqda ('that / those' bilan ko'p keladi)",
        example: "The elevator is over there near the exit.",
        exampleUz: "Lift anavi yerda, chiqish eshigi yaqinida.",
        ipaOrRespelling: "OH-vur THAIR",
      },
      {
        en: "receipt",
        uz: "xarid cheki / kvitansiya (DIQQAT: 'p' harfi o'qilmaydi!)",
        example: "Here is your receipt. Have a good one!",
        exampleUz: "Mana sizning chekingiz. Kuningiz yaxshi o'tsin!",
        ipaOrRespelling: "ri-SEET",
      },
      {
        en: "package",
        uz: "posilka / qadoqlangan jo'natma",
        example: "This package is for apartment 3C.",
        exampleUz: "Mana bu posilka 3C-xonadon uchun.",
        ipaOrRespelling: "PAK-ij",
      },
      {
        en: "keychain",
        uz: "kalitlar bog'lami / brelok",
        example: "Is that your keychain on the table?",
        exampleUz: "Stol ustidagi anavi sizning kalitlar bog'lamingizmi?",
        ipaOrRespelling: "KEE-chayn",
      },
      {
        en: "badge",
        uz: "ish ruxsatnomasi / ko'krak nishoni (beyjik)",
        example: "You need this security badge to open the door.",
        exampleUz: "Eshikni ochish uchun sizga mana bu xavfsizlik beyjigi kerak.",
        ipaOrRespelling: "BAJ",
      },
    ],
    grammar: {
      title: "Ko'rsatish olmoshlari: This, That, These, Those — Masofa (Yaqin/Uzoq) va Son (Birlik/Ko'plik)",
      explanationUz: `O'zbek tilida yaqindagi narsaga ham, ko'plikdagi narsalarga ham ko'pincha bitta 'bu' so'zi ishlatilaveradi ("bu quti", "bu qutilar"). Ingliz tilida esa ko'rsatish olmoshlari (Demonstratives) ham MASOFAGA (qo'l yetadigan yaqin joyda — right here, yoki uzoqroqda — over there), ham SONGA (birlik — singular, yoki ko'plik — plural, 9-kunni eslang!) qarab 4 taga bo'linadi:

ASOSIY FORMULALAR JADVALI:
1) YAQIN (Right here — qo'lingizda yoki yoningizda):
   • Birlik (+ is): THIS → This is a package. / This package is heavy. (Mana bu — posilka.)
   • Ko'plik (+ are): THESE → These are packages. / These boxes are heavy. (Mana bular — posilkalar.)
   • TALAFFUZ FARQI: 'This' (/ðɪs/ — qisqa 'i' va oxiri 's'), 'These' (/ðiːz/ — cho'ziq 'ii' va oxiri jarangli 'z').

2) UZOQ (Over there — qo'l yetmaydigan narigi joyda):
   • Birlik (+ is): THAT → That is an elevator over there. / That car is fast. (Anavi — lift.)
   • Ko'plik (+ are): THOSE → Those are my coworkers over there. / Those shelves are full. (Anavilar — mening hamkasblarim.)

3) Insonni tanishtirganda yoki telefonda:
   • Bir kishini tanishtirish: "This is my coworker, Carlos."
   • Ko'p kishini tanishtirish: "These are my children."`,
      examples: [
        {
          en: "This badge right here is mine, and that keychain over there is yours.",
          uz: "Mana bu yerdagi beyjik meniki, anavi yerdagi kalitlar bog'lami esa sizniki.",
        },
        {
          en: "These packages are for our office, and those boxes over there are for the warehouse.",
          uz: "Mana bu posilkalar bizning ofisimiz uchun, anavi yerdagi qutilar esa ombor uchun.",
        },
        {
          en: "This is my receipt, and these are my groceries.",
          uz: "Mana bu mening xarid chekim, mana bular esa xarid qilgan narsalarim.",
        },
        {
          en: "Who are those people over there? — They are our new neighbors.",
          uz: "Anavi yerdagi odamlar kimlar? — Ular bizning yangi qo'shnilarimiz.",
        },
      ],
    },
    examples: [
      {
        en: "Please sign this application form right here.",
        uz: "Iltimos, mana bu ariza anketasiga shundoq shu yerda imzo qo'ying.",
      },
      {
        en: "That building across the street is a university.",
        uz: "Ko'chaning narigi betidagi anavi bino — universitet.",
      },
      {
        en: "Are these your keys on the counter?",
        uz: "Peshtaxta ustidagi mana bular sizning kalitlaringizmi?",
      },
      {
        en: "Those buses over there go to downtown Chicago.",
        uz: "Anavi yerdagi avtobuslar Chikago markaziga boradi.",
      },
      {
        en: "Keep this receipt in case you need to return the item.",
        uz: "Buyumni qaytarish kerak bo'lib qolsa deb, mana bu chekni saqlab qo'ying.",
      },
      {
        en: "David, this is my brother Sardor. — Nice to meet you, Sardor!",
        uz: "Devid, bu mening ukam Sardor. — Tanishganimdan xursandman, Sardor!",
      },
    ],
    dialogue: {
      title: "Pochta va posilkalarni qabul qilish xonasida (At the Apartment Mailroom)",
      lines: [
        {
          speaker: "Mailroom Clerk",
          en: "Good evening, Anvar! Picking up a delivery today?",
          uz: "Xayrli kech, Anvar! Bugun yetkazmani olib ketgani keldingizmi?",
        },
        {
          speaker: "Anvar",
          en: "Good evening! Yes, I have a notification for two packages for apartment 3C.",
          uz: "Xayrli kech! Ha, menda 3C-xonadon uchun ikkita posilka haqida xabarnoma bor.",
        },
        {
          speaker: "Mailroom Clerk",
          en: "Let me check. May I see your ID card or building badge, please?",
          uz: "Tekshirib ko'ray. Shaxsni tasdiqlovchi guvohnomangiz yoki bino beyjigingizni ko'rsam bo'ladimi?",
        },
        {
          speaker: "Anvar",
          en: "Sure! This is my driver's license right here.",
          uz: "Albatta! Mana bu mening haydovchilik guvohnomam.",
        },
        {
          speaker: "Mailroom Clerk",
          en: "Thank you. Okay, these two small packages right here are for you.",
          uz: "Rahmat. Demak, shundoq mana bu yerdagi ikkita kichik posilka siz uchun.",
        },
        {
          speaker: "Anvar",
          en: "What about that big box over there on the bottom shelf?",
          uz: "Pastki tokchadagi anavi katta qutichi?",
        },
        {
          speaker: "Mailroom Clerk",
          en: "That box over there is for apartment 3D — your neighbor David.",
          uz: "Anavi yerdagi quti 3D-xonadon — qo'shningiz Devid uchun.",
        },
        {
          speaker: "Anvar",
          en: "Oh, I see! Where do I sign?",
          uz: "Ha, tushunarli! Qayerga imzo qo'yaman?",
        },
        {
          speaker: "Mailroom Clerk",
          en: "Put your signature right here on this screen, and take this receipt. Have a good one!",
          uz: "Mana bu ekranga shundoq shu yerda imzo qo'ying va mana bu kvitansiyani oling. Kuningiz yaxshi o'tsin!",
        },
      ],
    },
    speakingPrompt:
      "Xonangizdagi yaqin ('right here') va uzoq ('over there') joylashgan birlik hamda ko'plikdagi narsalarga qarab, 'This is...', 'That is...', 'These are...', 'Those are...' qoliplarida 8 ta gapni ovoz chiqarib ayting.",
    writingPrompt:
      "'This, That, These, Those' ko'rsatish olmoshlari hamda 'right here', 'over there', 'receipt', 'package', 'badge', 'keychain', 'boxes', 'shelves' so'zlarini qatnashtirib 8–10 ta gap yozing.",
    speakingSentences: [
      "This is my new driver's license right here.",
      "That building over there is our warehouse.",
      "These packages are for apartment three.",
      "Those shelves over there are empty.",
      "Please keep this receipt in your wallet.",
      "You need this badge to open the door.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d10_1",
        type: "grammar-choice",
        prompt: "Qo'lingizda turgan KO'PLIKDAGI posilkalarni ko'rsatib qaysi so'zni ishlatasiz: '___ packages right here are for you.'",
        options: ["These", "This", "That", "Those"],
        answer: "These",
        explanationUz: "Yaqindagi ('right here') ko'plikdagi ('packages') narsalar uchun 'These' ishlatiladi.",
      },
      {
        id: "q_m1_d10_2",
        type: "grammar-choice",
        prompt: "Uzoqdagi ('over there') BITTA binoni ko'rsatib qanday deymiz: '___ building over there is a university.'",
        options: ["That", "This", "These", "Those"],
        answer: "That",
        explanationUz: "Uzoqdagi ('over there') birlikdagi ('building') ot uchun 'That' ishlatiladi.",
      },
      {
        id: "q_m1_d10_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring ('This', 'That', 'These' yoki 'Those'): '___ shelves over there are full of boxes.'",
        answer: "Those",
        explanationUz: "Uzoqdagi ('over there') ko'plikdagi ('shelves') ot uchun 'Those' qo'yiladi.",
      },
      {
        id: "q_m1_d10_4",
        type: "mcq-translation",
        prompt: "'Receipt' (/ri-SEET/) so'zining ma'nosi nima va unda qaysi harf o'qilmaydi?",
        options: [
          "xarid cheki ('p' harfi o'qilmaydi)",
          "retsept / taomnoma ('t' harfi o'qilmaydi)",
          "posilka ('c' harfi o'qilmaydi)",
          "ruxsatnoma ('r' harfi o'qilmaydi)",
        ],
        answer: "xarid cheki ('p' harfi o'qilmaydi)",
        explanationUz: "'Receipt' (/ri-SEET/) — to'lov yoki xarid cheki; 'p' harfi talaffuz qilinmaydi.",
      },
      {
        id: "q_m1_d10_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Put your signature ___ here on this line.' (shundoq shu yerda)",
        answer: "right",
        explanationUz: "'Right here' — shundoq shu yerda / mana bu yerda.",
      },
      {
        id: "q_m1_d10_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["These", "boxes", "right", "here", "are", "heavy."],
        answer: "These boxes right here are heavy.",
        explanationUz: "'These boxes right here are heavy.' — Mana bu yerdagi qutilar og'ir.",
      },
      {
        id: "q_m1_d10_7",
        type: "correct-sentence",
        prompt: "Qaysi gap grammatik jihatdan TO'G'RI?",
        options: [
          "This badge is mine, and those keys over there are yours.",
          "These badge is mine, and that keys over there are yours.",
          "This badges are mine, and those key is yours.",
          "That badges right here is mine.",
        ],
        answer: "This badge is mine, and those keys over there are yours.",
        explanationUz: "Birlikda 'This badge is', uzoqdagi ko'plikda esa 'those keys are' ishlatiladi.",
      },
      {
        id: "q_m1_d10_8",
        type: "mcq-translation",
        prompt: "'Over there' iborasi nimani bildiradi?",
        options: [
          "anavi yerda (uzoqroqda)",
          "shundoq qo'l ostida",
          "bir soat ichida",
          "har kuni ertalab",
        ],
        answer: "anavi yerda (uzoqroqda)",
        explanationUz: "'Over there' — anavi yerda, narigi tomonda.",
      },
    ],
    videos: [
      {
        title: "How to Pronounce THIS vs THESE in American English (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+this+vs+these+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 8,
        verified: false,
      },
      {
        title: "Demonstratives: This, That, These, Those in Daily Conversation (Speak English With Vanessa)",
        channel: "Speak English With Vanessa",
        url: "https://www.youtube.com/results?search_query=Speak+English+With+Vanessa+this+that+these+those",
        level: "A1 (Beginner)",
        durationMin: 11,
        verified: false,
      },
    ],
  },
};
