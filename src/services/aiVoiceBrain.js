/**
 * aiVoiceBrain.js — Multilingual Conversational Intelligence for SevaSetu Voice Assistant
 * Provides dynamic natural language understanding (NLU), multi-intent detection,
 * language switching, fair wage pricing knowledge, and intelligent contextual responses.
 */

// Cooperative Verified Services Catalog with transparent fair living wages
export const CATALOG = [
  {
    id: "svc-electrician",
    trade: "Electricians",
    name: "Cooperative Electrician Visit & Repair",
    category: "electricians",
    price: 249,
    icon: "electrical_services",
    durationMins: 60,
    keywords: [
      "electric", "electrician", "bijli", "wiring", "short circuit", "fan", "switch", "light", "mcb", "fuse", "geyser", "bulb", "wire", "taar", "power",
      "इलेक्ट्रिशियन", "इलेक्ट्रीशियन", "बिजली", "करंट", "पंखा", "स्विच", "इलेक्ट्रिक", "तार", "बल्ब", "गीजर", "लाइट", "फैन", "शॉर्ट सर्किट", "मिस्त्री", "বদ্যুৎ", "ইলেকট্রিশিয়ান"
    ],
  },
  {
    id: "svc-plumber",
    trade: "Plumbers",
    name: "Cooperative Plumber & Pipe Leakage Fix",
    category: "plumbers",
    price: 249,
    icon: "plumbing",
    durationMins: 60,
    keywords: [
      "plumb", "plumber", "plumbing", "nal", "pipe", "leak", "tap", "motor", "tanki", "drain", "water", "sewage", "basin", "tonti",
      "प्लंबर", "प्लम्बर", "नल", "पाइप", "लीकेज", "पानी", "टंकी", "टोंटी", "नलका", "ड्रेन", "मोटर", "प्लंबिंग", "জল", "প্লাম্বার"
    ],
  },
  {
    id: "svc-cleaning",
    trade: "Cleaners",
    name: "Complete Home & Kitchen Deep Cleaning",
    category: "domestic-helpers",
    price: 499,
    icon: "cleaning_services",
    durationMins: 120,
    keywords: [
      "clean", "cleaner", "cleaning", "safai", "maid", "kamwali", "jharu", "pocha", "deep cleaning", "dusting", "washroom", "bathroom", "house cleaning",
      "सफाई", "क्लीनर", "झाड़ू", "पोछा", "सफाईकर्मी", "सफाईवाला", "घर की सफाई", "डीप क्लीनिंग", "धुलाई", "कामवाली", "बाई"
    ],
  },
  {
    id: "svc-carpenter",
    trade: "Carpenters",
    name: "Cooperative Carpenter & Furniture Repair",
    category: "plumbers",
    price: 299,
    icon: "carpenter",
    durationMins: 60,
    keywords: [
      "carpenter", "badhai", "lakdi", "furniture", "door", "table", "chair", "lock", "darwaza", "wood", "repair",
      "बढ़ई", "बढई", "बढ़ई", "सुथार", "कारपेंटर", "फर्नीचर", "लकड़ी", "दरवाजा", "ताला", "कुर्सी", "मेज", "खिड़की"
    ],
  },
  {
    id: "svc-tractor",
    trade: "Tractor & Farm Operators",
    name: "Agricultural Tractor & Field Operation",
    category: "agri-mechanization",
    price: 899,
    icon: "agriculture",
    durationMins: 180,
    keywords: [
      "tractor", "farm", "khet", "ploughing", "harvest", "kheti", "kisan", "field", "cultivator", "rotavator", "sowing", "jutai",
      "ट्रैक्टर", "ट्रेक्टर", "खेत", "जुताई", "किसान", "खेती", "हल", "रोटावेटर", "हार्वेस्टर", "बोआई", "कटाई"
    ],
  },
  {
    id: "svc-caregiver",
    trade: "Caregivers",
    name: "Elderly Companion & Caregiver Support",
    category: "caregivers",
    price: 349,
    icon: "elderly",
    durationMins: 120,
    keywords: [
      "caregiver", "companion", "elderly", "bujurg", "shopping", "care", "hospital", "dawa", "patient", "nurse", "support", "buddha",
      "साथी", "बुजुर्ग", "केयरगिवर", "केयर गिवर", "देखभाल", "मरीज", "बुज़ुर्ग", "अस्पताल", "दवा"
    ],
  },
  {
    id: "svc-technician",
    trade: "Technicians",
    name: "AC, Refrigerator & Appliance Service",
    category: "electricians",
    price: 399,
    icon: "build",
    durationMins: 90,
    keywords: [
      "ac", "air conditioner", "fridge", "refrigerator", "washing machine", "microwave", "appliance", "cooler", "repair", "technician", "gas",
      "कूलर", "एसी", "फ्रिज", "मरम्मत", "तकनीशियन", "टेक्नीशियन", "वाशिंग मशीन", "माइक्रोवेव", "गैस रिफिल"
    ],
  },
  {
    id: "svc-painter",
    trade: "Painters",
    name: "Room & Wall Painting Cooperative Expert",
    category: "painters",
    price: 599,
    icon: "format_paint",
    durationMins: 180,
    keywords: [
      "paint", "painter", "rang", "color", "putty", "wall", "diwar", "painting", "touchup", "putai",
      "पेंट", "पेंटर", "रंग", "पुट्टी", "दीवार", "पुताई", "रंगाई", "कलर"
    ],
  },
  {
    id: "svc-driver",
    trade: "Drivers",
    name: "Verified Personal City/Highway Driver",
    category: "caregivers",
    price: 399,
    icon: "directions_car",
    durationMins: 120,
    keywords: [
      "driver", "gadi", "car", "chauffeur", "drive", "vehicle", "chalao",
      "ड्राइवर", "गाड़ी", "गाड़ी", "कार", "चालक", "वाहन"
    ],
  },
];

/**
 * Normalizes Devanagari variations
 */
export function normalizeDevanagari(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\u0940/g, "\u093f")
    .replace(/\u0942/g, "\u0941")
    .replace(/[\u0901\u0902]/g, "")
    .replace(/\u093c/g, "")
    .replace(/[\u0937\u0936]/g, "\u0938")
    .replace(/\u0935/g, "\u092c")
    .replace(/[.,?!:;'"()\-/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Language switch intents
 */
const LANGUAGE_SWITCH_MAP = [
  {
    targetLang: "hi",
    patterns: [
      /hindi/i,
      /हिंदी/,
      /हिन्दी/,
      /speak in hindi/i,
      /talk in hindi/i,
      /hindi me/i,
      /hindi mein/i,
      /hindi me bolo/i,
      /hindi me baat/i,
    ],
    confirmation: "हाँ, मैं हिंदी में बात कर सकता हूँ! बताइए, मैं आपकी क्या सेवा करूँ? जैसे 'इलेक्ट्रीशियन बुक करो' या 'नल ठीक कराना है' बोल सकते हैं।",
  },
  {
    targetLang: "en",
    patterns: [
      /english/i,
      /speak in english/i,
      /talk in english/i,
      /angrezi/i,
      /अंग्रेजी/,
      /in english/i,
    ],
    confirmation: "Yes, I can speak in English! How can I help you today? You can say 'Book Electrician', 'Plumber needed', or ask any questions about our services.",
  },
  {
    targetLang: "bn",
    patterns: [/bengali/i, /bangla/i, /বাংলা/, /বাঙালি/],
    confirmation: "হ্যাঁ, আমি বাংলায় কথা বলতে পারি! আপনি কি সেবা বুক করতে চান? যেমন 'ইলেকট্রিশিয়ান' বা 'প্লাম্বার' বলতে পারেন।",
  },
  {
    targetLang: "mr",
    patterns: [/marathi/i, /मराठी/],
    confirmation: "होय, मी मराठीत बोलू शकतो! तुम्हाला कोणती सेवा पाहिजे? उदाहरणार्थ 'इलेक्ट्रिशियन बुक करा' किंवा 'प्लंबर पाहिजे' म्हणा.",
  },
  {
    targetLang: "ta",
    patterns: [/tamil/i, /தமிழ்/],
    confirmation: "ஆம், நான் தமிழில் பேச முடியும்! உங்களுக்கு என்ன சேவை வேண்டும்? 'எலக்ட்ரீஷியன்' அல்லது 'பிளம்பர்' என்று சொல்லலாம்.",
  },
  {
    targetLang: "te",
    patterns: [/telugu/i, /తెలుగు/],
    confirmation: "అవును, నేను తెలుగులో మాట్లాడగలను! మీకు ఏ సేవ కావాలి? 'ఎలక్ట్రీషియన్' లేదా 'ప్లంబర్' అని చెప్పండి.",
  },
  {
    targetLang: "gu",
    patterns: [/gujarati/i, /ગુજરાતી/],
    confirmation: "હા, હું ગુજરાતીમાં વાત કરી શકું છું! તમને કઈ સેવા જોઈએ છે? 'ઇલેક્ટ્રિશિયન' અથવા 'પ્લમ્બર' કહો.",
  },
  {
    targetLang: "kn",
    patterns: [/kannada/i, /ಕನ್ನಡ/],
    confirmation: "ಹೌದು, ನಾನು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬಲ್ಲೆ! ನಿಮಗೆ ಯಾವ ಸೇವೆ ಬೇಕು? 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್' ಅಥವಾ 'ಪ್ಲಂಬರ್' ಎಂದು ಹೇಳಿ.",
  },
];

/**
 * Knowledge Base for Conversational Questions
 */
export function getKnowledgeResponse(spokenText, activeLang = "en") {
  const text = spokenText.toLowerCase();
  const isHi = activeLang === "hi";

  // 1. Language query like "can you speak in hindi?"
  for (const langSwitch of LANGUAGE_SWITCH_MAP) {
    if (
      (text.includes("speak") || text.includes("talk") || text.includes("bolo") || text.includes("bol sakte") || text.includes("language") || text.includes("bhasha")) &&
      langSwitch.patterns.some((p) => p.test(text))
    ) {
      return {
        action: "LANGUAGE_SWITCH",
        targetLang: langSwitch.targetLang,
        reply: langSwitch.confirmation,
      };
    }
  }

  // 2. Pricing / Rates / Charges / Cost
  if (
    text.includes("rate") ||
    text.includes("price") ||
    text.includes("charge") ||
    text.includes("kitna") ||
    text.includes("paisa") ||
    text.includes("cost") ||
    text.includes("fees") ||
    text.includes("खर्च") ||
    text.includes("कीमत") ||
    text.includes("दाम") ||
    text.includes("रेट") ||
    text.includes("रुपये")
  ) {
    // Check if specific service mentioned
    if (text.includes("electric") || text.includes("बिजली") || text.includes("पंखा") || text.includes("इलेक्ट्रीशियन")) {
      return {
        action: "CHAT",
        reply: isHi
          ? "इलेक्ट्रीशियन विज़िट और रिपेयर का शुल्क केवल ₹249 है। इसमें कोई छिपा हुआ चार्ज या बिचौलिया कमीशन नहीं है। क्या मैं अभी बुक कर दूँ?"
          : "Cooperative Electrician visit & repair starts at just ₹249 with zero middleman markup. Would you like me to book one for you?",
      };
    }
    if (text.includes("plumb") || text.includes("नल") || text.includes("प्लंबर") || text.includes("pipe") || text.includes("leak")) {
      return {
        action: "CHAT",
        reply: isHi
          ? "प्लंबर विज़िट और लीकेज फिक्सिंग का सरकारी प्रमाणित सहकारी शुल्क ₹249 है। क्या मैं आपके पते पर प्लंबर बुक करूँ?"
          : "Cooperative Plumber visit & leakage fix is ₹249 with 100% fair living wage guarantee. Shall I book a plumber for you?",
      };
    }
    if (text.includes("clean") || text.includes("सफाई") || text.includes("maid")) {
      return {
        action: "CHAT",
        reply: isHi
          ? "घर और किचन की कम्प्लीट डीप क्लीनिंग सेवा ₹499 से शुरू होती है। क्या आप क्लीनर बुक करना चाहते हैं?"
          : "Complete Home & Kitchen Deep Cleaning starts at ₹499. Shall I schedule a verified cleaning expert?",
      };
    }
    if (text.includes("tractor") || text.includes("ट्रैक्टर") || text.includes("khet") || text.includes("जुताई")) {
      return {
        action: "CHAT",
        reply: isHi
          ? "कृषि ट्रैक्टर जुताई व फील्ड ऑपरेशन का शुल्क ₹899 प्रति स्लॉट है। क्या मैं आपके खेत के लिए ऑपरेटर बुक कर दूँ?"
          : "Agricultural Tractor & Field Operation rate is ₹899 with verified farmer-friendly cooperative operators.",
      };
    }

    return {
      action: "CHAT",
      reply: isHi
        ? "सेवासेतु पर सभी सेवाएं सहकारी दरों पर हैं: इलेक्ट्रीशियन ₹249, प्लंबर ₹249, बढ़ई ₹299, घर सफाई ₹499, AC रिपेयर ₹399, और ट्रैक्टर ₹899। कोई बिचौलिया नहीं है! आपको कौन सी सेवा चाहिए?"
        : "SevaSetu guarantees transparent cooperative rates with 0% middleman cut: Electrician ₹249, Plumber ₹249, Carpenter ₹299, Cleaning ₹499, AC Service ₹399, Tractor ₹899. Which service do you need?",
    };
  }

  // 3. Location / Bettiah / Bihar / Rural Coverage
  if (
    text.includes("bettiah") ||
    text.includes("bihar") ||
    text.includes("champaran") ||
    text.includes("village") ||
    text.includes("gaon") ||
    text.includes("kahan") ||
    text.includes("location") ||
    text.includes("area") ||
    text.includes("बेत्तिया") ||
    text.includes("बेतिया") ||
    text.includes("बिहार") ||
    text.includes("गांव") ||
    text.includes("कहाँ")
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "हाँ! सेवासेतु बेतिया (Bettiah), पश्चिम चंपारण, पूरे बिहार और सभी ग्रामीण पंचायतों में 45 मिनट के भीतर प्रमाणित सहकारी कारीगर उपलब्ध कराता है। अपनी सेवा बताइए, मैं तुरंत भेज दूँगा!"
        : "Yes! SevaSetu actively serves Bettiah, West Champaran, Bihar, and all surrounding rural blocks with verified cooperative workers arriving in 45-60 mins. Tell me what service you need!",
    };
  }

  // 4. Safety / Verification / Trust / Background Check
  if (
    text.includes("safe") ||
    text.includes("police") ||
    text.includes("verify") ||
    text.includes("bharosa") ||
    text.includes("trust") ||
    text.includes("सुरक्षा") ||
    text.includes("सत्यापित") ||
    text.includes("पुलिस") ||
    text.includes("भरोसा")
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "निश्चिंत रहें! सेवासेतु के प्रत्येक कारीगर का आधार सत्यापन, पुलिस पृष्ठभूमि जांच और श्रम सहकारी महासंघ से स्किल सर्टिफिकेशन होता है। आपको 100% सुरक्षित और भरोसेमंद कारीगर मिलते हैं।"
        : "Rest assured! Every SevaSetu worker is 100% verified with Aadhaar, police background verification, and labour cooperative federation skill certification. Your safety is our top priority.",
    };
  }

  // 5. How it works / What is SevaSetu / About
  if (
    text.includes("sevasetu kya") ||
    text.includes("what is sevasetu") ||
    text.includes("ye kya hai") ||
    text.includes("about") ||
    text.includes("who are you") ||
    text.includes("tum kaun ho") ||
    text.includes("aap kaun ho") ||
    text.includes("सेवासेतु क्या") ||
    text.includes("तुम कौन हो")
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "सेवासेतु भारत का पहला डिजिटल श्रम सहकारी मंच है, जो ग्राहकों को बिना किसी बिचौलिए के सीधे सत्यापित इलेक्ट्रीशियन, प्लंबर, सफाईकर्मी, ट्रैक्टर आदि से जोड़ता है। उचित मजदूरी और उत्तम कार्य हमारी गारंटी है!"
        : "SevaSetu is India's premier labour cooperative digital platform connecting households directly with verified skilled workers at zero middleman commission, ensuring fair living wages and quality service.",
    };
  }

  // 6. Casual greetings / Polite chit-chat
  if (
    text.includes("kaise ho") ||
    text.includes("how are you") ||
    text.includes("kya hal") ||
    text.includes("kya haal") ||
    text.includes("कैसे हो") ||
    text.includes("कैसे हो")
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "मैं बहुत अच्छा हूँ! सेवासेतु AI असिस्टेंट आपकी सहायता के लिए हमेशा तैयार है। आज आपको किस प्रकार की सेवा की आवश्यकता है?"
        : "I'm doing wonderful, thank you! I'm here to assist you with verified cooperative services. How can I help you today?",
    };
  }

  if (
    text.includes("thank") ||
    text.includes("shukriya") ||
    text.includes("dhanyawad") ||
    text.includes("धन्यवाद") ||
    text.includes("शुक्रिया")
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "आपका बहुत-बहुत धन्यवाद! अगर कोई भी प्लंबर, इलेक्ट्रीशियन या अन्य सहायता चाहिए तो बस बोल दीजिए।"
        : "You are most welcome! Feel free to say whenever you need an electrician, plumber, or any verified worker.",
    };
  }

  if (
    text.includes("app") &&
    (text.includes("download") || text.includes("install") || text.includes("डाउनलोड") || text.includes("इंस्टॉल"))
  ) {
    return {
      action: "CHAT",
      reply: isHi
        ? "आप स्क्रीन के ऊपर दिए गए 'Install SevaSetu App' बैनर पर क्लिक करके इसे सीधे अपने फोन के होम स्क्रीन पर ऐप की तरह इंस्टॉल कर सकते हैं!"
        : "You can install the app directly on your phone home screen by tapping the 'Install SevaSetu App' banner at the top of the page!",
    };
  }

  return null;
}

/**
 * Full Conversational Request Processor
 */
export function processAssistantQuery(spokenText, activeLang = "en", currentUser = null) {
  if (!spokenText || typeof spokenText !== "string") {
    return {
      action: "CHAT",
      reply: activeLang === "hi"
        ? "नमस्ते! कृपया बोलें कि आपको कौन सी सेवा चाहिए, जैसे 'इलेक्ट्रीशियन बुक करो' या 'नल ठीक कराना है'।"
        : "Namaste! Please let me know what service you need, such as 'Book Electrician' or 'Plumber needed'.",
    };
  }

  const rawLower = spokenText.toLowerCase().trim();
  const normText = normalizeDevanagari(spokenText);

  // 1. Check knowledge base & language switch queries first!
  const kbResult = getKnowledgeResponse(spokenText, activeLang);
  if (kbResult) {
    return kbResult;
  }

  // 2. Check for confirmation intent
  const confirmPatterns = [
    /\b(haan|yes|yep|ha|haa|confirm|theek|sahi|kardo|kar do|book it|book kar do|chalega|proceed|done|thik|theek hai|ok|okay)\b/i,
    /हाँ|हॉ|हा|सही है|ठीक है|कर दो|करदो|बुक करो|बुक कर दो|आगे बढ़ो/
  ];
  if (confirmPatterns.some((p) => p.test(rawLower) || p.test(spokenText))) {
    return { action: "CONFIRM" };
  }

  // 3. Check for cancellation intent
  const cancelPatterns = [
    /\b(nahi|no|cancel|rok|stop|band|hatao|mat karo|chodo|rehnde)\b/i,
    /नहीं|नही|रोक|रद्द|बंद|हटाओ|मत करो/
  ];
  if (cancelPatterns.some((p) => p.test(rawLower) || p.test(spokenText))) {
    return {
      action: "CANCEL",
      reply: activeLang === "hi"
        ? "बुकिंग रद्द कर दी गई है। यदि कोई अन्य सहायता चाहिए तो बताइए!"
        : "Booking proposal cancelled. Let me know if you need any other service!",
    };
  }

  // 4. Check for service match in catalog
  let matchedService = null;
  for (const svc of CATALOG) {
    for (const kw of svc.keywords) {
      const normKw = normalizeDevanagari(kw);
      const lowerKw = kw.toLowerCase();

      if (
        normText.includes(normKw) ||
        rawLower.includes(lowerKw) ||
        normKw.includes(normText) ||
        lowerKw.includes(rawLower)
      ) {
        matchedService = svc;
        break;
      }
    }
    if (matchedService) break;
  }

  if (matchedService) {
    // Determine slot
    let slotDate = "Today";
    if (rawLower.includes("kal") || rawLower.includes("tomorrow") || spokenText.includes("कल")) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      slotDate = tomorrow.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }

    const now = new Date();
    let slotHour = now.getHours() + 2;
    let modifier = "PM";
    if (slotHour >= 21) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      slotDate = tomorrow.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      slotHour = 10;
      modifier = "AM";
    } else if (slotHour < 12) {
      modifier = "AM";
    } else if (slotHour > 12) {
      slotHour -= 12;
      modifier = "PM";
    }
    const formattedHour = slotHour.toString().padStart(2, "0");
    const slotTime = `${formattedHour}:00 ${modifier}`;

    return {
      action: "SERVICE_IDENTIFIED",
      service: matchedService,
      slot: { date: slotDate, time: slotTime },
      reply: activeLang === "hi"
        ? `मैंने सत्यापित सहकारी ${matchedService.trade} ढूँढ लिया है! शुल्क केवल ₹${matchedService.price} (${slotDate}, ${slotTime}) है। 'हाँ बुक करो' बोलें या नीचे Confirm & Book दबाएं।`
        : `I found verified cooperative ${matchedService.trade}! Fare is ₹${matchedService.price} (${slotDate} at ${slotTime}). Say "Yes confirm" or click Confirm & Book below.`,
    };
  }

  // 5. Intelligent contextual fallback (answering what was asked rather than robotic repetition)
  const isHi = activeLang === "hi";
  let contextualReply = isHi
    ? `मैंने सुना "${spokenText}"। मैं आपके लिए इलेक्ट्रीशियन, प्लंबर, सफाईकर्मी, बढ़ई, ट्रैक्टर, AC मैकेनिक या ड्राइवर तुरंत बुक कर सकता हूँ। क्या आप इनमें से कोई सेवा चाहते हैं?`
    : `I heard "${spokenText}". I can instantly connect you with verified Electricians, Plumbers, Cleaners, Carpenters, Tractor operators, or AC Technicians. Which service would you like?`;

  return {
    action: "CHAT",
    reply: contextualReply,
  };
}
