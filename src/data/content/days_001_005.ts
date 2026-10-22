import { DayContent } from "../../types";

export const DAYS_001_005: Record<number, DayContent> = {
  1: {
    vocabulary: [
      {
        en: "spell",
        uz: "harflab aytmoq",
        example: "Can you spell your last name, please?",
        exampleUz: "Familiyangizni harflab ayta olasizmi, iltimos?",
        ipaOrRespelling: "SPEL",
      },
      {
        en: "first name",
        uz: "ism",
        example: "My first name is Anvar.",
        exampleUz: "Mening ismim Anvar.",
        ipaOrRespelling: "FURST NAYM",
      },
      {
        en: "last name",
        uz: "familiya (AQSHda 'surname' o'rniga ko'p ishlatiladi)",
        example: "How do you spell your last name?",
        exampleUz: "Familiyangizni qanday harflab aytasiz?",
        ipaOrRespelling: "LAST NAYM",
      },
      {
        en: "letter",
        uz: "harf / xat",
        example: "There are twenty-six letters in the English alphabet.",
        exampleUz: "Ingliz alifbosida yigirma oltita harf bor.",
        ipaOrRespelling: "LET-ur",
      },
      {
        en: "capital letter",
        uz: "bosh (katta) harf",
        example: "Write your name with a capital letter.",
        exampleUz: "Ismingizni bosh harf bilan yozing.",
        ipaOrRespelling: "KAP-uh-tul LET-ur",
      },
      {
        en: "double",
        uz: "qo'shaloq / ikkita bir xil (harf yoki raqam)",
        example: "My name has a double L: B-I-L-L.",
        exampleUz: "Mening ismimda ikkita L harfi bor: B-I-L-L.",
        ipaOrRespelling: "DUB-ul",
      },
      {
        en: "repeat",
        uz: "qaytarmoq / takrorlamoq",
        example: "Could you repeat that, please?",
        exampleUz: "Shuni takrorlab yubora olasizmi, iltimos?",
        ipaOrRespelling: "ri-PEET",
      },
      {
        en: "slowly",
        uz: "sekin / ohista",
        example: "Please speak slowly.",
        exampleUz: "Iltimos, sekin gapiring.",
        ipaOrRespelling: "SLOH-lee",
      },
      {
        en: "correct",
        uz: "to'g'ri",
        example: "Yes, that spelling is correct.",
        exampleUz: "Ha, bu harflab yozuv to'g'ri.",
        ipaOrRespelling: "kuh-REKT",
      },
      {
        en: "middle initial",
        uz: "ikkinchi ismning bosh harfi (AQSH anketalarida)",
        example: "Leave the middle initial blank if you do not have one.",
        exampleUz: "Agar ikkinchi ismingiz bo'lmasa, bosh harf katagini bo'sh qoldiring.",
        ipaOrRespelling: "MID-ul i-NISH-ul",
      },
    ],
    grammar: {
      title: "Ingliz alifbosi, harflab aytish (Spelling) va 'How do you spell...?' qoliplari",
      explanationUz: `Amerika Qo'shma Shtatlarida bank, klinika, pochta, DMV yoki telefon orqali muloqot qilganda o'zbekcha ism va familiyangizni harflab aytish (spelling) har kuni kerak bo'ladi. Ingliz alifbosida 26 ta harf mavjud: shundan 5 tasi unli (A, E, I, O, U) va 21 tasi undosh harflardir. Amerika ingliz tilida Z harfi 'zed' emas, balki 'ZEE' (/ziː/) deb o'qiladi. Ko'p adashtiriladigan harflarga alohida diqqat qiling: E (/iː/) va I (/aɪ/), G (/dʒiː/) va J (/dʒeɪ/), A (/eɪ/) va R (/ɑːr/), V (/viː/) va W (/ˈdʌbəl.juː/).

ASOSIY FORMULALAR:
1) Ism yoki so'zni harflab so'rash:
   • How do you spell your first name? (Ismingizni qanday harflab aytasiz?)
   • How do you spell your last name? (Familiyangizni qanday harflab aytasiz?)
   • Can you spell that, please? (Shuni harflab bera olasizmi, iltimos?)

2) Harflab javob berish va telefon orqali aniqlashtirish ('A as in Apple'):
   • It is A-N-V-A-R. (U A-N-V-A-R deb yoziladi.)
   • B as in Boy, O as in Orange, B as in Boy, U as in Umbrella, R as in Red.
   • Agar ikkita bir xil harf yonma-yon kelsa, 'double' so'zi ishlatiladi: M-U-H-A-double M-A-D.`,
      examples: [
        {
          en: "How do you spell your last name? — It is K-A-R-I-M-O-V.",
          uz: "Familiyangizni qanday harflab aytasiz? — K-A-R-I-M-O-V.",
        },
        {
          en: "Is that B as in Boy or V as in Victor?",
          uz: "Bu 'Boy' so'zidagi B harfimi yoki 'Victor' so'zidagi V harfimi?",
        },
        {
          en: "My street name is Miller: M-I-double L-E-R.",
          uz: "Ko'chamning nomi Miller: M-I-ikkita L-E-R.",
        },
        {
          en: "Could you please repeat the last letter slowly?",
          uz: "Oxirgi harfni sekinroq takrorlay olasizmi, iltimos?",
        },
      ],
    },
    examples: [
      {
        en: "My first name is Dilshod: D-I-L-S-H-O-D.",
        uz: "Mening ismim Dilshod: D-I-L-S-H-O-D.",
      },
      {
        en: "Please write your last name in capital letters.",
        uz: "Iltimos, familiyangizni bosh harflar bilan yozing.",
      },
      {
        en: "That is N as in Nancy, not M as in Mary.",
        uz: "Bu Mary so'zidagi M emas, Nancy so'zidagi N harfi.",
      },
      {
        en: "Sorry, could you repeat your first name?",
        uz: "Kechirasiz, ismingizni takrorlab yubora olasizmi?",
      },
      {
        en: "Yes, that spelling is completely correct.",
        uz: "Ha, bu harflab yozuv to'liq to'g'ri.",
      },
      {
        en: "In American English, the last letter is pronounced 'zee'.",
        uz: "Amerika ingliz tilida oxirgi harf 'zi' deb talaffuz qilinadi.",
      },
    ],
    dialogue: {
      title: "Klinika ro'yxatxonasida ism-familiyani harflab aytish (At the Clinic Front Desk)",
      lines: [
        {
          speaker: "Receptionist",
          en: "Good morning! Welcome to City Health Clinic. What is your name, please?",
          uz: "Xayrli tong! City Health klinikasiga xush kelibsiz. Ismingiz nima, iltimos?",
        },
        {
          speaker: "Anvar",
          en: "Good morning. My first name is Anvar, and my last name is Xodiyev.",
          uz: "Xayrli tong. Mening ismim Anvar, familiyam esa Xodiyev.",
        },
        {
          speaker: "Receptionist",
          en: "How do you spell your first name?",
          uz: "Ismingizni qanday harflab aytasiz?",
        },
        {
          speaker: "Anvar",
          en: "It is A-N-V-A-R. A as in Apple, N as in Nancy, V as in Victor, A-R.",
          uz: "A-N-V-A-R. A — Apple kabi, N — Nancy kabi, V — Victor kabi, A-R.",
        },
        {
          speaker: "Receptionist",
          en: "Got it. And could you spell your last name slowly, please?",
          uz: "Tushundim. Familiyangizni ham sekin harflab bera olasizmi, iltimos?",
        },
        {
          speaker: "Anvar",
          en: "Sure. It is X-O-D-I-Y-E-V.",
          uz: "Albatta. X-O-D-I-Y-E-V.",
        },
        {
          speaker: "Receptionist",
          en: "Let me repeat that: X-O-D-I-Y-E-V. Is that correct?",
          uz: "Qaytarib tekshirib olay: X-O-D-I-Y-E-V. To'g'rimi?",
        },
        {
          speaker: "Anvar",
          en: "Yes, that is correct. Thank you!",
          uz: "Ha, to'g'ri. Rahmat!",
        },
      ],
    },
    speakingPrompt:
      "O'zingizning ismingiz, familiyangiz va yashayotgan shahringiz nomini ingliz tilida ayting va har birini harflab (spelling) ovoz chiqarib talaffuz qiling.",
    writingPrompt:
      "Daftaringizga yoki pastdagi maydonga o'zingizning va 3 ta oila a'zoyingizning ism-familiyasini yozing. Har bir ismni chiziqcha orqali harflab (masalan: A-N-V-A-R) va yangi lug'atdagi kamida 6 ta so'zni qatnashtirib 6–8 ta gap tuzing.",
    speakingSentences: [
      "My first name is Anvar.",
      "Can you spell your last name, please?",
      "Please speak slowly.",
      "Could you repeat that, please?",
      "Write your name with a capital letter.",
      "Yes, that spelling is correct.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d1_1",
        type: "mcq-translation",
        prompt: "'Spell' fe'lining o'zbekcha ma'nosi nima?",
        options: [
          "harflab aytmoq",
          "tez o'qimoq",
          "qo'ng'iroq qilmoq",
          "tarjima qilmoq",
        ],
        answer: "harflab aytmoq",
        explanationUz: "'To spell' — so'z yoki ismni harflab aytmoq yoki yozmoq.",
      },
      {
        id: "q_m1_d1_2",
        type: "mcq-translation",
        prompt: "Amerika ingliz tilida 'last name' nimani bildiradi?",
        options: ["familiya", "ism", "otasining ismi", "taxallus"],
        answer: "familiya",
        explanationUz: "AQSHda 'first name' — ism, 'last name' esa familiya deganidir.",
      },
      {
        id: "q_m1_d1_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'How do you ___ your first name?' (harflab aytmoq)",
        answer: "spell",
        explanationUz: "Ismni harflab so'rash formulasi: 'How do you spell your first name?'",
      },
      {
        id: "q_m1_d1_4",
        type: "grammar-choice",
        prompt: "'MILLER' so'zidagi ikkita L harfini amerikaliklarga qanday aytish tabiiy?",
        options: ["double L", "two L", "second L", "capital L"],
        answer: "double L",
        explanationUz: "Yonma-yon kelgan ikkita bir xil harf 'double' (masalan, double L) deb aytiladi.",
      },
      {
        id: "q_m1_d1_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'Could you ___ that slowly, please?' (takrorlamoq)",
        answer: "repeat",
        explanationUz: "'Repeat' — qaytarmoq, takrorlamoq.",
      },
      {
        id: "q_m1_d1_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["How", "do", "you", "spell", "your", "last", "name?"],
        answer: "How do you spell your last name?",
        explanationUz: "Savol qolipi: How + do + you + spell + your last name?",
      },
      {
        id: "q_m1_d1_7",
        type: "correct-sentence",
        prompt: "Qaysi gap grammatik va mazmunan to'g'ri?",
        options: [
          "Write your name with a capital letter.",
          "Write your name with a double slowly.",
          "How you spell last name is?",
          "Please repeat slowly your letter capital.",
        ],
        answer: "Write your name with a capital letter.",
        explanationUz: "'Write your name with a capital letter' — Ismingizni bosh harf bilan yozing.",
      },
      {
        id: "q_m1_d1_8",
        type: "grammar-choice",
        prompt: "Amerika ingliz tilida alifboning oxirgi 'Z' harfi qanday talaffuz qilinadi?",
        options: ["zee", "zed", "zay", "zoh"],
        answer: "zee",
        explanationUz: "Amerika ingliz tilida Z harfi 'zee' (/ziː/), Britaniya ingliz tilida esa 'zed' deyiladi.",
      },
    ],
    videos: [
      {
        title: "American English Alphabet & Letter Sounds (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+American+English+alphabet+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 12,
        verified: false,
      },
      {
        title: "VOA Learning English — Let's Learn English Lesson 1",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+Let%27s+Learn+English+Lesson+1",
        level: "A1 (Beginner)",
        durationMin: 5,
        verified: false,
      },
    ],
  },

  2: {
    vocabulary: [
      {
        en: "good morning",
        uz: "xayrli tong (soat 12:00 gacha)",
        example: "Good morning! How are you doing today?",
        exampleUz: "Xayrli tong! Bugun ishlaringiz qanday?",
        ipaOrRespelling: "good MOR-ning",
      },
      {
        en: "good afternoon",
        uz: "xayrli kun (soat 12:00 dan 17:00–18:00 gacha)",
        example: "Good afternoon, ma'am. How can I help you?",
        exampleUz: "Xayrli kun, xonim. Sizga qanday yordam bera olaman?",
        ipaOrRespelling: "good af-tur-NOON",
      },
      {
        en: "good evening",
        uz: "xayrli kech (salomlashganda, kechki 18:00 dan keyin)",
        example: "Good evening! Welcome to our restaurant.",
        exampleUz: "Xayrli kech! Restoranimizga xush kelibsiz.",
        ipaOrRespelling: "good EEV-ning",
      },
      {
        en: "nice to meet you",
        uz: "tanishganimdan xursandman",
        example: "It is very nice to meet you, David.",
        exampleUz: "Siz bilan tanishganimdan juda xursandman, Devid.",
        ipaOrRespelling: "NYS too MEET yoo",
      },
      {
        en: "neighbor",
        uz: "qo'shni (AQSH imlosida 'u' harfisiz yoziladi)",
        example: "I am your new neighbor in apartment 4B.",
        exampleUz: "Men 4B-xonadondagi yangi qo'shningizman.",
        ipaOrRespelling: "NAY-bur",
      },
      {
        en: "how is it going?",
        uz: "ishlar qalay? / ahvollar qanday? (og'zaki Amerika salomi)",
        example: "Hey Mike, how is it going?",
        exampleUz: "Salom Mayk, ishlar qalay?",
        ipaOrRespelling: "HOW iz it GOH-ing",
      },
      {
        en: "pretty good",
        uz: "ancha yaxshi / yomon emas",
        example: "I am doing pretty good, thank you.",
        exampleUz: "Menda hammasi ancha yaxshi, rahmat.",
        ipaOrRespelling: "PRIT-ee GOOD",
      },
      {
        en: "have a good one",
        uz: "kuningiz yaxshi o'tsin! (amerikaliklarning eng ko'p aytadigan xayrlashuvi)",
        example: "Thanks for your help! Have a good one!",
        exampleUz: "Yordamingiz uchun rahmat! Kuningiz yaxshi o'tsin!",
        ipaOrRespelling: "HAV uh GOOD wun",
      },
      {
        en: "see you later",
        uz: "keyinroq ko'rishamiz",
        example: "I have to go to work now. See you later!",
        exampleUz: "Men hozir ishga borishim kerak. Keyinroq ko'rishamiz!",
        ipaOrRespelling: "SEE yoo LAY-tur",
      },
      {
        en: "take care",
        uz: "o'zingizni ehtiyot qiling / sog' bo'ling",
        example: "Take care, and drive safely!",
        exampleUz: "O'zingizni ehtiyot qiling va mashinani bexatar haydang!",
        ipaOrRespelling: "TAYK KAIR",
      },
    ],
    grammar: {
      title: "Rasmiy va norasmiy Amerika salomlashish hamda xayrlashish qoliplari",
      explanationUz: `AQSHda insonlar bilan ko'chada, liftda, do'konda yoki ishxonada ko'z to'qnashganda tabassum bilan qisqa salomlashish madaniyatning muhim qismidir. Salomlashish iboralari vaziyatga (rasmiy yoki kundalik) hamda kun vaqtiga qarab tanlanadi. Eslab qoling: 'Good evening' — kechqurun uchrashganda ('Salom' ma'nosida) aytiladi, 'Good night' esa faqat xayrlashib uxlashga ketayotganda yoki kechasi uyga qaytayotganda aytiladi.

ASOSIY FORMULALAR:
1) Rasmiy va xushmuomala salomlashish (Ishda, bankda, klinikada):
   • Good morning / Good afternoon / Good evening!
   • How are you today? → Javob: I'm doing well, thank you. And you?

2) Kundalik Amerika muloqotida (Qo'shnilar, hamkasblar, do'kon kassiri bilan):
   • Hi! How are you doing? yoki How's it going?
   • Javob: Pretty good, thanks! How about you? (Ancha yaxshi, rahmat! O'zingizchi?)

3) Birinchi marta tanishganda:
   • Birinchi kishi: Nice to meet you! (Tanishganimdan xursandman!)
   • Ikkinchi kishi: Nice to meet you, too! (Men ham tanishganimdan xursandman! — 'too' gap oxirida keladi).

4) Xayrlashish formulalari:
   • Have a great day! / Have a good one! → Javob: You too! Take care!`,
      examples: [
        {
          en: "Good morning! How are you doing today? — I'm doing well, thank you.",
          uz: "Xayrli tong! Bugun ahvolingiz qanday? — Yaxshiman, rahmat.",
        },
        {
          en: "Hi, I am Sardor. Nice to meet you! — Nice to meet you, too!",
          uz: "Salom, men Sardorman. Tanishganimdan xursandman! — Men ham tanishganimdan xursandman!",
        },
        {
          en: "Hey Sarah, how is it going? — Pretty good, thanks!",
          uz: "Salom Sara, ishlar qalay? — Ancha yaxshi, rahmat!",
        },
        {
          en: "Have a good one! — You too, see you later!",
          uz: "Kuningiz yaxshi o'tsin! — Sizga ham, keyinroq ko'rishamiz!",
        },
      ],
    },
    examples: [
      {
        en: "Good afternoon! Welcome to our neighborhood.",
        uz: "Xayrli kun! Mahallamizga xush kelibsiz.",
      },
      {
        en: "It is really nice to meet you and your family.",
        uz: "Siz va oilangiz bilan tanishganimdan juda xursandman.",
      },
      {
        en: "Hey, how is it going? — Pretty good, no complaints!",
        uz: "Salom, ishlar qalay? — Ancha yaxshi, shikoyat yo'q!",
      },
      {
        en: "We are your new neighbors in apartment 2A.",
        uz: "Biz 2A-xonadondagi yangi qo'shnilaringizmiz.",
      },
      {
        en: "Thank you for your help. Have a good one!",
        uz: "Yordamingiz uchun rahmat. Kuningiz yaxshi o'tsin!",
      },
      {
        en: "See you tomorrow morning. Take care!",
        uz: "Ertaga ertalab ko'rishamiz. O'zingizni ehtiyot qiling!",
      },
    ],
    dialogue: {
      title: "Kvartira yo'lagida amerikalik qo'shni bilan tanishuv (Meeting a Neighbor)",
      lines: [
        {
          speaker: "David",
          en: "Good afternoon! Are you moving into apartment 3C?",
          uz: "Xayrli kun! 3C-xonadonga ko'chib kelyapsizmi?",
        },
        {
          speaker: "Anvar",
          en: "Good afternoon! Yes, I am. My name is Anvar.",
          uz: "Xayrli kun! Ha. Mening ismim Anvar.",
        },
        {
          speaker: "David",
          en: "Hi Anvar! I am David. I live right next door in 3D. Nice to meet you!",
          uz: "Salom Anvar! Men Devidman. Shundoq yoningizdagi 3D-xonadonda turaman. Tanishganimdan xursandman!",
        },
        {
          speaker: "Anvar",
          en: "Nice to meet you, too, David! How is it going?",
          uz: "Men ham tanishganimdan xursandman, Devid! Ishlaringiz qalay?",
        },
        {
          speaker: "David",
          en: "Pretty good, thanks! Welcome to the building. Let me know if you need any help.",
          uz: "Ancha yaxshi, rahmat! Binomizga xush kelibsiz. Biror yordam kerak bo'lsa, tortinmay ayting.",
        },
        {
          speaker: "Anvar",
          en: "Thank you so much, David. You are a very kind neighbor.",
          uz: "Katta rahmat, Devid. Siz juda mehribon qo'shni ekansiz.",
        },
        {
          speaker: "David",
          en: "You are welcome! I have to head out now. See you later!",
          uz: "Arzimaydi! Men hozir chiqib ketishim kerak. Keyinroq ko'rishamiz!",
        },
        {
          speaker: "Anvar",
          en: "See you later! Have a good one!",
          uz: "Keyinroq ko'rishamiz! Kuningiz yaxshi o'tsin!",
        },
      ],
    },
    speakingPrompt:
      "Yangi qo'shningiz yoki hamkasbingiz bilan uchrashganingizni tasavvur qiling: u bilan salomlashing, o'zingizni tanishtiring, hol-ahvol so'rang va muloyim xayrlashing.",
    writingPrompt:
      "Qo'shningiz yoki do'konda sotuvchi bilan bo'ladigan 8 qatorlik qisqa dialog yozing. Unda 'good morning/afternoon', 'nice to meet you', 'how is it going', 'pretty good', 'have a good one', 'take care' iboralarini ishlating.",
    speakingSentences: [
      "Good morning! How are you doing today?",
      "I am your new neighbor in apartment three.",
      "It is very nice to meet you, too.",
      "I am doing pretty good, thank you.",
      "See you later! Take care!",
      "Thanks for your help. Have a good one!",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d2_1",
        type: "mcq-translation",
        prompt: "Amerikaliklar xayrlashayotganda ko'p ishlatadigan 'Have a good one!' iborasi nimani anglatadi?",
        options: [
          "Kuningiz yaxshi o'tsin!",
          "Bitta yaxshisini bering!",
          "Xayrli tun!",
          "Tanishganimdan xursandman!",
        ],
        answer: "Kuningiz yaxshi o'tsin!",
        explanationUz: "'Have a good one!' — 'Have a good day/evening!' ning tabiiy og'zaki shakli.",
      },
      {
        id: "q_m1_d2_2",
        type: "grammar-choice",
        prompt: "Suhbatdoshingiz 'Nice to meet you!' desa, eng to'g'ri javob qaysi?",
        options: [
          "Nice to meet you, too!",
          "I am pretty good.",
          "See you later.",
          "Good afternoon.",
        ],
        answer: "Nice to meet you, too!",
        explanationUz: "'Nice to meet you!' ga 'Nice to meet you, too!' (Men ham xursandman!) deb javob qaytariladi.",
      },
      {
        id: "q_m1_d2_3",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'I am doing ___ good, thank you.' (ancha yaxshi)",
        answer: "pretty",
        explanationUz: "'Pretty good' — ancha yaxshi.",
      },
      {
        id: "q_m1_d2_4",
        type: "mcq-translation",
        prompt: "'Neighbor' so'zining o'zbekcha tarjimasi nima?",
        options: ["qo'shni", "qarindosh", "sotuvchi", "haydovchi"],
        answer: "qo'shni",
        explanationUz: "'Neighbor' — qo'shni.",
      },
      {
        id: "q_m1_d2_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'See you ___!' (keyinroq ko'rishamiz)",
        answer: "later",
        explanationUz: "'See you later!' — Keyinroq ko'rishamiz!",
      },
      {
        id: "q_m1_d2_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib savol tuzing:",
        options: ["How", "is", "it", "going?"],
        answer: "How is it going?",
        explanationUz: "'How is it going?' — Ishlar qalay? / Ahvollar qanday?",
      },
      {
        id: "q_m1_d2_7",
        type: "correct-sentence",
        prompt: "Kechqurun soat 19:00 da restoranga kirib kelganda qaysi salomlashish ishlatiladi?",
        options: [
          "Good evening! Welcome to our restaurant.",
          "Good night! Welcome to our restaurant.",
          "Good morning! Welcome to our restaurant.",
          "Have a good one! Welcome to our restaurant.",
        ],
        answer: "Good evening! Welcome to our restaurant.",
        explanationUz: "Kechqurun uchrashganda 'Good evening', faqat uxlashga yoki uyga ketayotganda 'Good night' deyiladi.",
      },
      {
        id: "q_m1_d2_8",
        type: "grammar-choice",
        prompt: "Kassir sizga 'Have a great day!' desa, qisqa va tabiiy qanday javob berasiz?",
        options: ["You too!", "Me too!", "Yes, I am!", "Nice to meet you!"],
        answer: "You too!",
        explanationUz: "Tilak bildirganda ('Have a great day!'), 'You too!' (Sizga ham!) deb javob beriladi.",
      },
    ],
    videos: [
      {
        title: "Real American Greetings & Goodbyes (Speak English With Vanessa)",
        channel: "Speak English With Vanessa",
        url: "https://www.youtube.com/results?search_query=Speak+English+With+Vanessa+American+greetings+and+goodbyes",
        level: "A1 (Beginner)",
        durationMin: 14,
        verified: false,
      },
      {
        title: "How to Say 'How Are You?' Like an American (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+how+are+you+doing+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 10,
        verified: false,
      },
    ],
  },

  3: {
    vocabulary: [
      {
        en: "married",
        uz: "oilali / turmush qurgan",
        example: "I am married and I have two children.",
        exampleUz: "Men oilaliman va ikki nafar farzandim bor.",
        ipaOrRespelling: "MAIR-eed",
      },
      {
        en: "single",
        uz: "bo'ydoq / turmush qurmagan",
        example: "My younger brother is single.",
        exampleUz: "Mening kichik ukam bo'ydoq.",
        ipaOrRespelling: "SING-gul",
      },
      {
        en: "ready",
        uz: "tayyor",
        example: "We are ready for the English class.",
        exampleUz: "Biz ingliz tili darsiga tayyormiz.",
        ipaOrRespelling: "RED-ee",
      },
      {
        en: "busy",
        uz: "band",
        example: "She is very busy at work today.",
        exampleUz: "U bugun ishda juda band.",
        ipaOrRespelling: "BIZ-ee",
      },
      {
        en: "tired",
        uz: "charchagan",
        example: "They are tired after a long flight.",
        exampleUz: "Ular uzoq parvozdan keyin charchagan.",
        ipaOrRespelling: "TY-urd",
      },
      {
        en: "early",
        uz: "erta / vaqtli",
        example: "You are ten minutes early for your appointment.",
        exampleUz: "Siz qabul vaqtingizga o'n daqiqa erta keldingiz.",
        ipaOrRespelling: "UR-lee",
      },
      {
        en: "late",
        uz: "kech qolgan / kech",
        example: "Sorry I am late; the traffic was bad.",
        exampleUz: "Kechikkanim uchun uzr; tirbandlik yomon bo'ldi.",
        ipaOrRespelling: "LAYT",
      },
      {
        en: "warehouse",
        uz: "ombor / yuk saqlash joyi",
        example: "The warehouse is near the highway.",
        exampleUz: "Ombor katta yo'l yaqinida joylashgan.",
        ipaOrRespelling: "WAIR-hows",
      },
      {
        en: "coworker",
        uz: "hamkasb",
        example: "Carlos is my coworker at the warehouse.",
        exampleUz: "Karlos ombordagi hamkasbim.",
        ipaOrRespelling: "KOH-wur-kur",
      },
      {
        en: "newcomer",
        uz: "yangi kelgan kishi",
        example: "We are newcomers in this city.",
        exampleUz: "Biz bu shaharda yangi kelganlarmiz.",
        ipaOrRespelling: "NOO-kum-ur",
      },
    ],
    grammar: {
      title: "Kishilik olmoshlari (Subject Pronouns) va 'To Be' (am / is / are) fe'li",
      explanationUz: `O'zbek tilida hozirgi zamonda 'Men talabaman' yoki 'U ishda' deganda maxsus bog'lama fe'l ishlatilmaydi (yoki '-man, -san, -dir' qo'shimchasi qo'shiladi). Ingliz tilida esa fe'l qatnashmagan har bir gapda 'TO BE' (bo'lmoq / hisoblanmoq) fe'lining hozirgi zamon shakllari — AM, IS, ARE — albatta qo'yilishi shart! Aks holda ('I student' yoki 'He busy' deyilsa) gap xato bo'ladi.

ASOSIY FORMULALAR:
1) Kishilik olmoshlari va 'To Be' mosligi (Darak gap):
   • I + am → I am ready. (Qisqartmasi: I'm ready — Men tayyorman)
   • You + are → You are early. (Qisqartmasi: You're early — Siz erta keldingiz)
   • He (u - erkak) + is → He is my coworker. (He's my coworker)
   • She (u - ayol) + is → She is busy. (She's busy)
   • It (narsa/joy/holat) + is → It is a big warehouse. (It's a big warehouse)
   • We + are → We are married. (We're married)
   • They + are → They are tired. (They're tired)

2) Gapda 'To Be' dan keyin nima keladi?
   • Ega + am/is/are + Ot (Noun): I am a newcomer.
   • Ega + am/is/are + Sifat (Adjective): She is busy.
   • Ega + am/is/are + Joy (Preposition + Place): We are at the warehouse.`,
      examples: [
        {
          en: "I am married, and my brother is single.",
          uz: "Men oilaliman, ukam esa bo'ydoq.",
        },
        {
          en: "She is very busy right now, but we are ready to help.",
          uz: "U hozir juda band, lekin biz yordam berishga tayyormiz.",
        },
        {
          en: "Carlos and Maria are my coworkers. They are very friendly.",
          uz: "Karlos va Mariya mening hamkasblarim. Ular juda samimiy.",
        },
        {
          en: "It is a large warehouse near the airport.",
          uz: "U aeroport yaqinidagi katta ombor.",
        },
      ],
    },
    examples: [
      {
        en: "I'm a newcomer in Chicago, and I'm ready to work.",
        uz: "Men Chikagoda yangi kelganman va ishlashga tayyorman.",
      },
      {
        en: "He's my supervisor at the warehouse.",
        uz: "U ombordagi mening rahbarim (nazoratchim).",
      },
      {
        en: "You're fifteen minutes early today.",
        uz: "Siz bugun o'n besh daqiqa erta keldingiz.",
      },
      {
        en: "We're a little tired after the morning shift.",
        uz: "Biz ertalabki smenadan keyin biroz charchadik.",
      },
      {
        en: "She's married, and her husband is a driver.",
        uz: "U oilali va uning turmush o'rtog'i haydovchi.",
      },
      {
        en: "They're busy in the office right now.",
        uz: "Ular hozir idorada band.",
      },
    ],
    dialogue: {
      title: "Ish joyidagi birinchi kun: Hamkasblar bilan tanishuv (First Day at the Warehouse)",
      lines: [
        {
          speaker: "Carlos",
          en: "Hi! You are Anvar, right? Welcome to the team!",
          uz: "Salom! Siz Anvarsiz-a, to'g'rimi? Jamoamizga xush kelibsiz!",
        },
        {
          speaker: "Anvar",
          en: "Yes, I am Anvar. Thank you! You are Carlos?",
          uz: "Ha, men Anvarman. Rahmat! Siz Karlossiz-a?",
        },
        {
          speaker: "Carlos",
          en: "Yes, I'm Carlos. I am your coworker on the morning shift.",
          uz: "Ha, men Karlosman. Ertalabki smenadagi hamkasbingizman.",
        },
        {
          speaker: "Anvar",
          en: "Nice to meet you, Carlos. I am ten minutes early today.",
          uz: "Tanishganimdan xursandman, Karlos. Men bugun o'n daqiqa erta keldim.",
        },
        {
          speaker: "Carlos",
          en: "That is great! Punctuality is very important here. Are you ready for orientation?",
          uz: "Bu ajoyib! Bu yerda vaqtida kelish juda muhim. Tanishtiruv mashg'ulotiga tayyormisiz?",
        },
        {
          speaker: "Anvar",
          en: "Yes, I am ready! Where is our supervisor?",
          uz: "Ha, tayyorman! Rahbarimiz qayerda?",
        },
        {
          speaker: "Carlos",
          en: "She is in the main office right now. She is a little busy, but she will be here soon.",
          uz: "U hozir bosh ofisda. U biroz band, lekin tez orada shu yerda bo'ladi.",
        },
        {
          speaker: "Anvar",
          en: "Okay, great. This warehouse is huge, and everyone is very helpful.",
          uz: "Yaxshi, ajoyib. Bu ombor juda katta ekan va hamma juda yordamchi.",
        },
      ],
    },
    speakingPrompt:
      "O'zingiz, oilaviy holatingiz, do'stingiz yoki hamkasbingiz haqida 'I am / He is / She is / We are / They are' qoliplaridan foydalanib 6–8 ta gapni ovoz chiqarib gapiring.",
    writingPrompt:
      "O'zingiz va 2–3 nafar yaqin insoningiz (yoki hamkasbingiz) haqida kishilik olmoshlari (I, he, she, it, we, they) hamda 'am, is, are' fe'lini ishlatib kamida 8 ta gap yozing. Qisqartmalardan (I'm, he's, we're) ham foydalaning.",
    speakingSentences: [
      "I am ready for my English class.",
      "Carlos is my coworker at the warehouse.",
      "She is very busy at work today.",
      "We are ten minutes early for the meeting.",
      "I am married, and my brother is single.",
      "They are tired after a long day.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d3_1",
        type: "grammar-choice",
        prompt: "To'g'ri shaklni tanlang: 'Carlos and I ___ coworkers at the warehouse.'",
        options: ["are", "is", "am", "be"],
        answer: "are",
        explanationUz: "'Carlos and I' = 'We' (Biz), shuning uchun 'are' ishlatiladi.",
      },
      {
        id: "q_m1_d3_2",
        type: "fill-blank",
        prompt: "Bo'sh joyni 'to be' fe'lining mos shakli bilan to'ldiring: 'She ___ very busy today.'",
        answer: "is",
        explanationUz: "'She' (u - ayol) bilan 'is' shakli keladi.",
      },
      {
        id: "q_m1_d3_3",
        type: "mcq-translation",
        prompt: "'Coworker' so'zining ma'nosi nima?",
        options: ["hamkasb", "uy egasi", "mijoz", "qo'shni"],
        answer: "hamkasb",
        explanationUz: "'Coworker' — birga ishlaydigan hamkasb.",
      },
      {
        id: "q_m1_d3_4",
        type: "mcq-translation",
        prompt: "'Early' va 'Late' sifatlarining to'g'ri tarjimasi qaysi?",
        options: [
          "erta va kech",
          "band va bo'sh",
          "katta va kichik",
          "oilali va bo'ydoq",
        ],
        answer: "erta va kech",
        explanationUz: "'Early' — erta/vaqtli, 'Late' — kech/kechikkan.",
      },
      {
        id: "q_m1_d3_5",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'We are ___ for the orientation.' (tayyor)",
        answer: "ready",
        explanationUz: "'Ready' — tayyor.",
      },
      {
        id: "q_m1_d3_6",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib gap tuzing:",
        options: ["They", "are", "tired", "after", "work."],
        answer: "They are tired after work.",
        explanationUz: "Darak gap: Ega (They) + to be (are) + sifat (tired) + hol (after work).",
      },
      {
        id: "q_m1_d3_7",
        type: "correct-sentence",
        prompt: "Qaysi gap grammatik jihatdan to'g'ri tuzilgan?",
        options: [
          "The warehouse is near the airport.",
          "The warehouse are near the airport.",
          "The warehouse am near the airport.",
          "The warehouse near the airport.",
        ],
        answer: "The warehouse is near the airport.",
        explanationUz: "'The warehouse' (It — birlik) bo'lgani uchun 'is' fe'li qo'yilishi shart.",
      },
      {
        id: "q_m1_d3_8",
        type: "grammar-choice",
        prompt: "'We are' birikmasining to'g'ri qisqartma (contraction) shakli qaysi?",
        options: ["We're", "We's", "We'm", "Wer'e"],
        answer: "We're",
        explanationUz: "We + are = We're.",
      },
    ],
    videos: [
      {
        title: "Subject Pronouns & Verb 'To Be' in American English (VOA Learning English)",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+verb+to+be+contractions+beginner",
        level: "A1 (Beginner)",
        durationMin: 8,
        verified: false,
      },
      {
        title: "How Americans Pronounce Contractions: I'm, You're, He's, We're (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+to+be+contractions+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 11,
        verified: false,
      },
    ],
  },

  4: {
    vocabulary: [
      {
        en: "phone number",
        uz: "telefon raqami",
        example: "What is your cell phone number?",
        exampleUz: "Qo'l telefoningiz raqami necha?",
        ipaOrRespelling: "FOHN NUM-bur",
      },
      {
        en: "area code",
        uz: "hudud kodi (AQSH telefon raqamining dastlabki 3 ta raqami)",
        example: "The area code for Brooklyn is 718.",
        exampleUz: "Bruklin uchun hudud kodi — 718.",
        ipaOrRespelling: "AIR-ee-uh KOHD",
      },
      {
        en: "zip code",
        uz: "pochta indeksi (AQSHda 5 xonali raqam)",
        example: "Please enter your five-digit zip code.",
        exampleUz: "Iltimos, besh xonali pochta indeksingizni kiriting.",
        ipaOrRespelling: "ZIP KOHD",
      },
      {
        en: "years old",
        uz: "... yoshda",
        example: "I am twenty-eight years old.",
        exampleUz: "Men yigirma sakkiz yoshdaman.",
        ipaOrRespelling: "YEERZ OHLD",
      },
      {
        en: "age",
        uz: "yosh",
        example: "Write your name and age on the form.",
        exampleUz: "Anketaga ismingiz va yoshingizni yozing.",
        ipaOrRespelling: "AYJ",
      },
      {
        en: "date of birth",
        uz: "tug'ilgan sana (anketalarda qisqacha: DOB)",
        example: "What is your date of birth?",
        exampleUz: "Tug'ilgan sanangiz qachon?",
        ipaOrRespelling: "DAYT uv BURTH",
      },
      {
        en: "apartment number",
        uz: "xonadon (kvartira) raqami (qisqacha: Apt #)",
        example: "My apartment number is thirty-four.",
        exampleUz: "Mening xonadonim raqami o'ttiz to'rt.",
        ipaOrRespelling: "uh-PART-munt NUM-bur",
      },
      {
        en: "zero / oh",
        uz: "nol (telefon va xonadon raqamlarida ko'pincha 'oh' deb o'qiladi)",
        example: "My room number is three-oh-five (305).",
        exampleUz: "Mening xonam raqami uch-nol-besh (305).",
        ipaOrRespelling: "ZEER-oh / OH",
      },
      {
        en: "fifteen",
        uz: "o'n besh (urg'u ikkinchi bo'g'inda: fif-TEEN)",
        example: "The bus arrives in fifteen minutes.",
        exampleUz: "Avtobus o'n besh daqiqada keladi.",
        ipaOrRespelling: "fif-TEEN",
      },
      {
        en: "fifty",
        uz: "ellik (urg'u birinchi bo'g'inda: FIF-tee)",
        example: "The speed limit here is fifty miles per hour.",
        exampleUz: "Bu yerda tezlik cheklovi soatiga ellik mil.",
        ipaOrRespelling: "FIF-tee",
      },
    ],
    grammar: {
      title: "Raqamlar (1–100), -teen vs -ty urg'usi, Yosh ('How old...') va AQSH telefon raqamlari",
      explanationUz: `Kundalik Amerika hayotida telefon raqami, ZIP code (5 xonali pochta indeksi), uy manzili va yoshni xatosiz aytish hamda eshitib tushunish juda muhim. Eng ko'p chalkashlik 13–19 (-teen) va 30–90 (-ty) sonlarida yuz beradi. Farqi urg'uda va 't' tovushida:
• 13, 14, 15, 16, 17, 18, 19 sonlarida urg'u OXIRGI bo'g'inga tushadi va 'n' aniq eshitiladi: thir-TEEN (13), four-TEEN (14), fif-TEEN (15).
• 30, 40, 50, 60, 70, 80, 90 sonlarida urg'u BIRINCHI bo'g'inga tushadi va Amerika talaffuzida 't' yumshoq 'd' kabi qisqa aytiladi: THIR-ty (30), FOR-ty (40 — diqqat: 'u' harfisiz yoziladi!), FIF-ty (50).

ASOSIY FORMULALAR:
1) Yoshni so'rash va aytish (O'zbek tilidek 'I have 28 years' deyish XATO! 'To be' ishlatiladi):
   • How old are you? (Yoshingiz nechada?)
   • I am 28 years old. Yoki qisqacha: I am 28. (Men 28 yoshdaman. — 'I am 28 years' deb 'old' ni tushirib qoldirib bo'lmaydi!)

2) AQSH telefon raqami va ZIP kodni aytish (10 ta raqam bittalab o'qiladi, '0' esa 'zero' yoki 'oh' deyiladi):
   • What is your phone number? → It is 3-1-2, 5-5-5, 0-1-9-8 (three-one-two, five-five-five, oh-one-nine-eight).
   • What is your zip code? → It is 6-0-6-1-4 (six-oh-six-one-four).`,
      examples: [
        {
          en: "How old are you? — I am thirty-two years old.",
          uz: "Yoshingiz nechada? — Men o'ttiz ikki yoshdaman.",
        },
        {
          en: "My daughter is fifteen (fif-TEEN), and my mother is fifty (FIF-tee).",
          uz: "Qizim o'n besh yoshda, onam esa ellik yoshda.",
        },
        {
          en: "What is your phone number? — It is 718-555-0140.",
          uz: "Telefon raqamingiz necha? — 718-555-0140.",
        },
        {
          en: "Our zip code is 11235, and our apartment number is 402 (four-oh-two).",
          uz: "Bizning pochta indeksimiz 11235, xonadonimiz raqami esa 402.",
        },
      ],
    },
    examples: [
      {
        en: "Please verify your date of birth and zip code.",
        uz: "Iltimos, tug'ilgan sanangiz va pochta indeksingizni tasdiqlang.",
      },
      {
        en: "My son is fourteen years old.",
        uz: "Mening o'g'lim o'n to'rt yoshda.",
      },
      {
        en: "Did you say fifteen dollars or fifty dollars?",
        uz: "O'n besh dollar dedingizmi yoki ellik dollarmi?",
      },
      {
        en: "The area code for Chicago is 312.",
        uz: "Chikago uchun hudud kodi — 312.",
      },
      {
        en: "My apartment number is two-oh-eight (208).",
        uz: "Mening xonadonim raqami ikki-nol-sakkiz (208).",
      },
      {
        en: "Write your cell phone number at the bottom of the page.",
        uz: "Sahifaning pastki qismiga qo'l telefoningiz raqamini yozing.",
      },
    ],
    dialogue: {
      title: "Dorixonada ma'lumotlarni va telefon raqamni tasdiqlash (At the Pharmacy Counter)",
      lines: [
        {
          speaker: "Pharmacist",
          en: "Good afternoon! Picking up a prescription today?",
          uz: "Xayrli kun! Bugun retsept bo'yicha dori olyapsizmi?",
        },
        {
          speaker: "Anvar",
          en: "Good afternoon. Yes, it is for Anvar Xodiyev.",
          uz: "Xayrli kun. Ha, Anvar Xodiyev nomiga.",
        },
        {
          speaker: "Pharmacist",
          en: "Thank you. What is your date of birth and age, please?",
          uz: "Rahmat. Tug'ilgan sanangiz va yoshingiz nechada, iltimos?",
        },
        {
          speaker: "Anvar",
          en: "May tenth, 1996. I am twenty-nine years old.",
          uz: "1996-yil 10-may. Men yigirma to'qqiz yoshdaman.",
        },
        {
          speaker: "Pharmacist",
          en: "Great. And what is your phone number with the area code?",
          uz: "Ajoyib. Hudud kodi bilan telefon raqamingiz necha?",
        },
        {
          speaker: "Anvar",
          en: "My phone number is 7-1-8, 5-5-5, 0-1-5-0.",
          uz: "Mening telefon raqamim: 7-1-8, 5-5-5, 0-1-5-0.",
        },
        {
          speaker: "Pharmacist",
          en: "Did you say zero-one-one-five or zero-one-five-zero at the end?",
          uz: "Oxirida nol-bir-o'n besh dedingizmi yoki nol-bir-ellikmi?",
        },
        {
          speaker: "Anvar",
          en: "Zero-one-five-zero — fifty. And my zip code is 1-1-2-3-0.",
          uz: "Nol-bir-besh-nol — ellik. Pochta indeksim esa 1-1-2-3-0.",
        },
        {
          speaker: "Pharmacist",
          en: "Perfect! Everything is ready for you.",
          uz: "Ajoyib! Siz uchun hammasi tayyor.",
        },
      ],
    },
    speakingPrompt:
      "O'zingizning yoshingizni, telefon raqamingizni (har bir raqamni inglizcha dona-dona o'qib), xonadon raqamingizni va 5 xonali ZIP kodni ovoz chiqarib ayting.",
    writingPrompt:
      "O'zingiz va oila a'zolaringizning yoshini ('is ... years old'), telefon raqamini va pochta indeksini so'zlar bilan (masalan: twenty-eight, fifty, fifteen) kamida 6–8 ta gapda yozing.",
    speakingSentences: [
      "I am twenty-eight years old.",
      "What is your cell phone number?",
      "Please enter your five-digit zip code.",
      "My apartment number is three-oh-five.",
      "The bus arrives in fifteen minutes.",
      "The speed limit is fifty miles per hour.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d4_1",
        type: "correct-sentence",
        prompt: "Yoshni aytishda qaysi gap grammatik jihatdan TO'G'RI?",
        options: [
          "I am twenty-eight years old.",
          "I have twenty-eight years old.",
          "I am twenty-eight years.",
          "I twenty-eight years old.",
        ],
        answer: "I am twenty-eight years old.",
        explanationUz: "Ingliz tilida yosh 'to be' bilan aytiladi: 'I am 28 years old' yoki 'I am 28'.",
      },
      {
        id: "q_m1_d4_2",
        type: "mcq-translation",
        prompt: "AQSHda 'Zip code' nimani anglatadi?",
        options: [
          "5 xonali pochta indeksi",
          "Telefonning hudud kodi",
          "Haydovchilik guvohnomasi raqami",
          "Bank karta paroli",
        ],
        answer: "5 xonali pochta indeksi",
        explanationUz: "'Zip code' — AQSHdagi 5 xonali pochta indeksi.",
      },
      {
        id: "q_m1_d4_3",
        type: "fill-blank",
        prompt: "40 sonining to'g'ri inglizcha yozilishini kiriting (harflar bilan):",
        answer: "forty",
        explanationUz: "Diqqat: 'four' (4) va 'fourteen' (14) da 'u' bor, ammo 'forty' (40) so'zida 'u' yozilmaydi!",
      },
      {
        id: "q_m1_d4_4",
        type: "grammar-choice",
        prompt: "Suhbatdoshingizning yoshini so'rash uchun qaysi savol ishlatiladi?",
        options: [
          "How old are you?",
          "How many years do you have?",
          "What is your old?",
          "How age are you?",
        ],
        answer: "How old are you?",
        explanationUz: "Yoshni so'rash qolipi: 'How old are you?'",
      },
      {
        id: "q_m1_d4_5",
        type: "mcq-translation",
        prompt: "Telefon raqamning dastlabki 3 ta raqami (masalan, 718 yoki 312) nima deb ataladi?",
        options: ["area code", "zip code", "date of birth", "middle initial"],
        answer: "area code",
        explanationUz: "'Area code' — shahar yoki hudud telefon kodi.",
      },
      {
        id: "q_m1_d4_6",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'My brother is ___ years old.' (15 — so'z bilan)",
        answer: "fifteen",
        explanationUz: "15 — 'fifteen'.",
      },
      {
        id: "q_m1_d4_7",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib savol tuzing:",
        options: ["What", "is", "your", "phone", "number?"],
        answer: "What is your phone number?",
        explanationUz: "'What is your phone number?' — Telefon raqamingiz necha?",
      },
      {
        id: "q_m1_d4_8",
        type: "grammar-choice",
        prompt: "305-xonani amerikaliklar og'zaki nutqda odatda qanday o'qiydilar?",
        options: [
          "three-oh-five",
          "three hundred and zero five",
          "thirty-five",
          "three-double-five",
        ],
        answer: "three-oh-five",
        explanationUz: "Xona, kvartira va telefon raqamlarida '0' ko'pincha 'oh' deb o'qiladi: three-oh-five.",
      },
    ],
    videos: [
      {
        title: "Pronouncing Numbers: 13 vs 30, 14 vs 40, 15 vs 50 (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+teen+vs+ty+numbers+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 9,
        verified: false,
      },
      {
        title: "Talking About Numbers, Phone Numbers & Dates in the US (Speak English With Vanessa)",
        channel: "Speak English With Vanessa",
        url: "https://www.youtube.com/results?search_query=Speak+English+With+Vanessa+numbers+phone+numbers+dates",
        level: "A1 (Beginner)",
        durationMin: 13,
        verified: false,
      },
    ],
  },

  5: {
    vocabulary: [
      {
        en: "country",
        uz: "davlat / mamlakat",
        example: "Uzbekistan is a beautiful country in Central Asia.",
        exampleUz: "O'zbekiston — Markaziy Osiyodagi go'zal mamlakat.",
        ipaOrRespelling: "KUN-tree",
      },
      {
        en: "nationality",
        uz: "fuqarolik / millat (rasmiy anketalarda)",
        example: "Write your nationality on line four.",
        exampleUz: "To'rtinchi qatorga millatingizni (fuqaroligingizni) yozing.",
        ipaOrRespelling: "nash-uh-NAL-uh-tee",
      },
      {
        en: "originally",
        uz: "asli / kelib chiqishi bo'yicha",
        example: "I am originally from Tashkent, Uzbekistan.",
        exampleUz: "Men asli O'zbekistonning Toshkent shahridanman.",
        ipaOrRespelling: "uh-RIJ-uh-nuh-lee",
      },
      {
        en: "hometown",
        uz: "tug'ilib o'sgan shahar",
        example: "Samarkand is my hometown.",
        exampleUz: "Samarqand — mening tug'ilib o'sgan shahrim.",
        ipaOrRespelling: "HOHM-town",
      },
      {
        en: "state",
        uz: "shtat (AQSHning 50 ta ma'muriy hududi) / holat",
        example: "Ohio is a great state to live and work in.",
        exampleUz: "Ogayo — yashash va ishlash uchun ajoyib shtat.",
        ipaOrRespelling: "STAYT",
      },
      {
        en: "native language",
        uz: "ona tili (yoki 'first language')",
        example: "My native language is Uzbek.",
        exampleUz: "Mening ona tilim — o'zbek tili.",
        ipaOrRespelling: "NAY-tiv LANG-gwij",
      },
      {
        en: "foreign",
        uz: "chet el / xorijiy ('g' harfi o'qilmaydi)",
        example: "Learning a foreign language takes daily practice.",
        exampleUz: "Xorijiy tilni o'rganish har kunlik mashqni talab qiladi.",
        ipaOrRespelling: "FOR-in",
      },
      {
        en: "citizen",
        uz: "fuqaro",
        example: "His wife is an American citizen.",
        exampleUz: "Uning rafiqasi Amerika fuqarosi.",
        ipaOrRespelling: "SIT-uh-zun",
      },
      {
        en: "currently",
        uz: "hozirda / ayni paytda",
        example: "We are currently in Philadelphia, Pennsylvania.",
        exampleUz: "Biz hozirda Pensilvaniya shtatining Filadelfiya shahridamiz.",
        ipaOrRespelling: "KUR-unt-lee",
      },
      {
        en: "bilingual",
        uz: "ikki tilni biladigan",
        example: "Many children in the United States are bilingual.",
        exampleUz: "Qo'shma Shtatlarda ko'plab bolalar ikki tilni bilishadi.",
        ipaOrRespelling: "by-LING-gwul",
      },
    ],
    grammar: {
      title: "'Where are you from?', Davlat va Millat nomlari hamda 'in / from' predloglari",
      explanationUz: `AQSH ko'p millatli mamlakat bo'lgani uchun yangi tanishuvlarda 'Where are you from?' (Qayerdansiz?) savoli juda ko'p beriladi. Agar siz hozir AQSHning biror shtatida yashayotgan bo'lsangiz-u, suhbatdoshingiz sizning kelib chiqish yurtingizni so'rasa, 'Where are you originally from?' deb so'raydi. Ingliz tilida barcha davlatlar, shtatlar, shaharlar, millatlar va tillar DOIMO bosh harf (capital letter) bilan yoziladi: Uzbekistan, Uzbek, the United States, American, English.

ASOSIY FORMULALAR:
1) Qayerdan ekanlikni so'rash va javob berish ('FROM' + Davlat / Shahar):
   • Where are you from? → I am from Uzbekistan. (Men O'zbekistondanman.)
   • Where are you originally from? → I am originally from Bukhara, Uzbekistan. (Men asli O'zbekistonning Buxoro shahridanman.)
   • DIQQAT: 'the United States' yoki 'the US' oldidan 'the' artikli qo'yiladi, ammo 'America', 'Uzbekistan', 'Canada', 'Mexico' oldidan 'the' qo'yilmaydi!

2) Millat va tilni aytish ('FROM' qo'yilmaydi!):
   • I am Uzbek. (Men o'zbekman. — 'I am from Uzbek' deyish XATO!)
   • My native language is Uzbek. (Mening ona tilim o'zbek tili.)

3) Hozir qaysi shahar va shtatda ekanlikni aytish ('IN' + Shahar, Shtat):
   • I am currently in Brooklyn, New York. (Men hozirda Nyu-York shtatining Bruklin shahridaman.)`,
      examples: [
        {
          en: "Where are you originally from? — I am originally from Samarkand, Uzbekistan.",
          uz: "Siz asli qayerdansiz? — Men asli O'zbekistonning Samarqand shahridanman.",
        },
        {
          en: "I am from Uzbekistan. I am Uzbek, and my native language is Uzbek.",
          uz: "Men O'zbekistondanman. Men o'zbekman va ona tilim o'zbek tili.",
        },
        {
          en: "My coworker is from Mexico. He is Mexican and bilingual.",
          uz: "Hamkasbim Meksikadan. U meksikalik va ikki tilni biladi.",
        },
        {
          en: "We are currently in Columbus, Ohio, in the United States.",
          uz: "Biz hozirda AQSHning Ogayo shtati, Kolumbus shahridamiz.",
        },
      ],
    },
    examples: [
      {
        en: "Tashkent is the capital city of Uzbekistan.",
        uz: "Toshkent — O'zbekistonning poytaxti.",
      },
      {
        en: "Where is your supervisor from? — She is from Canada.",
        uz: "Rahbaringiz qayerdan? — U Kanadadan.",
      },
      {
        en: "My hometown is Fergana, but I am currently in Chicago.",
        uz: "Tug'ilib o'sgan shahrim Farg'ona, lekin hozirda Chikagodaman.",
      },
      {
        en: "There are fifty states in the United States of America.",
        uz: "Amerika Qo'shma Shtatlarida ellikta shtat bor.",
      },
      {
        en: "Are you an American citizen?",
        uz: "Siz Amerika fuqarosimisiz?",
      },
      {
        en: "English is a foreign language for us, so we practice every day.",
        uz: "Ingliz tili biz uchun xorijiy til, shuning uchun har kuni mashq qilamiz.",
      },
    ],
    dialogue: {
      title: "Tushlik tanaffusida hamkasblar bilan kelib chiqish haqida suhbat (Talking About Home Countries)",
      lines: [
        {
          speaker: "Elena",
          en: "Hi Anvar! Is this seat free?",
          uz: "Salom Anvar! Bu joy bo'shmi?",
        },
        {
          speaker: "Anvar",
          en: "Hi Elena! Yes, please sit down. How is it going today?",
          uz: "Salom Yelena! Ha, marhamat, o'tiring. Bugun ishlar qalay?",
        },
        {
          speaker: "Elena",
          en: "Pretty good, thanks! Anvar, where are you originally from?",
          uz: "Ancha yaxshi, rahmat! Anvar, siz asli qayerdansiz?",
        },
        {
          speaker: "Anvar",
          en: "I am originally from Uzbekistan. My hometown is Samarkand.",
          uz: "Men asli O'zbekistondanman. Tug'ilib o'sgan shahrim — Samarqand.",
        },
        {
          speaker: "Elena",
          en: "Oh, nice! So your native language is Uzbek, right?",
          uz: "O, ajoyib! Demak, ona tilingiz o'zbek tili, shundaymi?",
        },
        {
          speaker: "Anvar",
          en: "Yes, that is correct. I am Uzbek, and I am currently learning American English. Where are you from?",
          uz: "Ha, to'g'ri. Men o'zbekman va hozirda Amerika ingliz tilini o'rganyapman. Siz qayerdansiz?",
        },
        {
          speaker: "Elena",
          en: "I am originally from Colombia, but I am an American citizen now.",
          uz: "Men asli Kolumbiyadanman, lekin hozir Amerika fuqarosiman.",
        },
        {
          speaker: "Anvar",
          en: "That is wonderful! Being bilingual is a great advantage in this state.",
          uz: "Bu ajoyib! Ikki tilni bilish bu shtatda katta ustunlikdir.",
        },
      ],
    },
    speakingPrompt:
      "Qaysi davlat va shahardan ekanligingizni, millatingiz va ona tilingizni, hamda AQSHning qaysi shtatida yashashni xohlashingizni 6–8 ta gapda ovoz chiqarib gapiring.",
    writingPrompt:
      "O'zingizning vataningiz, tug'ilgan shahringiz (hometown), ona tilingiz (native language) va AQSHdagi shahar/shtat haqida 'from', 'in', 'originally', 'currently' so'zlarini qatnashtirib 80–100 so'zli kichik matn yozing.",
    speakingSentences: [
      "I am originally from Uzbekistan.",
      "Samarkand is my hometown.",
      "My native language is Uzbek.",
      "We are currently in the United States.",
      "There are fifty states in America.",
      "Many people here are bilingual.",
    ],
    dailyQuiz: [
      {
        id: "q_m1_d5_1",
        type: "grammar-choice",
        prompt: "To'g'ri predlogni tanlang: 'I am originally ___ Uzbekistan.'",
        options: ["from", "in", "at", "by"],
        answer: "from",
        explanationUz: "Kelib chiqish davlati yoki shahri oldidan 'from' ishlatiladi: 'from Uzbekistan'.",
      },
      {
        id: "q_m1_d5_2",
        type: "correct-sentence",
        prompt: "Millatni aytishda qaysi gap grammatik jihatdan TO'G'RI?",
        options: [
          "I am from Uzbekistan, and I am Uzbek.",
          "I am from Uzbek, and I am Uzbekistan.",
          "I am originally in Uzbek.",
          "My native language is from Uzbek.",
        ],
        answer: "I am from Uzbekistan, and I am Uzbek.",
        explanationUz: "'from + Country' (from Uzbekistan) va 'to be + Nationality' (I am Uzbek).",
      },
      {
        id: "q_m1_d5_3",
        type: "mcq-translation",
        prompt: "'Hometown' so'zining ma'nosi nima?",
        options: [
          "tug'ilib o'sgan shahar",
          "poytaxt shahar",
          "yangi ko'chib borilgan shtat",
          "ish joyi",
        ],
        answer: "tug'ilib o'sgan shahar",
        explanationUz: "'Hometown' — insonning tug'ilib o'sgan ona shahri.",
      },
      {
        id: "q_m1_d5_4",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'My ___ language is Uzbek.' (ona tili)",
        answer: "native",
        explanationUz: "'Native language' — ona tili.",
      },
      {
        id: "q_m1_d5_5",
        type: "mcq-translation",
        prompt: "'Bilingual' sifati kimlarga nisbatan ishlatiladi?",
        options: [
          "ikki tilni biladigan insonlarga",
          "yangi ko'chib kelgan insonlarga",
          "faqat ingliz tilida gapiradiganlarga",
          "chet elga sayohat qiluvchilarga",
        ],
        answer: "ikki tilni biladigan insonlarga",
        explanationUz: "'Bilingual' — ikki tilda erkin gaplasha oladigan kishi.",
      },
      {
        id: "q_m1_d5_6",
        type: "fill-blank",
        prompt: "Bo'sh joyni to'ldiring: 'We are ___ in Chicago, Illinois.' (hozirda / ayni paytda)",
        answer: "currently",
        explanationUz: "'Currently' — hozirda, ayni paytda.",
      },
      {
        id: "q_m1_d5_7",
        type: "sentence-order",
        prompt: "So'zlarni to'g'ri tartibda joylashtirib savol tuzing:",
        options: ["Where", "are", "you", "originally", "from?"],
        answer: "Where are you originally from?",
        explanationUz: "'Where are you originally from?' — Siz asli qayerdansiz?",
      },
      {
        id: "q_m1_d5_8",
        type: "grammar-choice",
        prompt: "'Foreign' (xorijiy) so'zida qaysi harf talaffuz qilinmaydi (silent letter)?",
        options: ["g", "r", "f", "n"],
        answer: "g",
        explanationUz: "'Foreign' (/FOR-in/) so'zidagi 'g' harfi o'qilmaydi.",
      },
    ],
    videos: [
      {
        title: "Where Are You From? — Talking About Countries & Hometowns (VOA Learning English)",
        channel: "VOA Learning English",
        url: "https://www.youtube.com/results?search_query=VOA+Learning+English+Where+are+you+from+Lesson",
        level: "A1 (Beginner)",
        durationMin: 6,
        verified: false,
      },
      {
        title: "How to Pronounce All 50 US States in American English (Rachel's English)",
        channel: "Rachel's English",
        url: "https://www.youtube.com/results?search_query=Rachel%27s+English+50+US+states+pronunciation",
        level: "A1 (Beginner)",
        durationMin: 15,
        verified: false,
      },
    ],
  },
};
