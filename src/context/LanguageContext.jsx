/**
 * LanguageContext — Global multilanguage support for SevaSetu
 * Supported: Hindi, English, Bengali, Marathi, Tamil, Telugu, Gujarati, Kannada
 */
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Supported Languages ──────────────────────────────────────────────────────
export const LANGUAGES = [
  { code: "hi", label: "हिंदी",    nativeName: "हिंदी",    speechLang: "hi-IN",  flag: "🇮🇳" },
  { code: "en", label: "English",  nativeName: "English",  speechLang: "en-IN",  flag: "🇬🇧" },
  { code: "bn", label: "বাংলা",    nativeName: "বাংলা",    speechLang: "bn-IN",  flag: "🇧🇩" },
  { code: "mr", label: "मराठी",    nativeName: "मराठी",    speechLang: "mr-IN",  flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்",    nativeName: "தமிழ்",    speechLang: "ta-IN",  flag: "🇮🇳" },
  { code: "te", label: "తెలుగు",   nativeName: "తెలుగు",   speechLang: "te-IN",  flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી",  nativeName: "ગુજરાતી",  speechLang: "gu-IN",  flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ",   nativeName: "ಕನ್ನಡ",   speechLang: "kn-IN",  flag: "🇮🇳" },
];

// ── Translations ─────────────────────────────────────────────────────────────
export const TRANSLATIONS = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav_findWork: {
    hi: "काम खोजें", en: "Find Work", bn: "কাজ খুঁজুন", mr: "काम शोधा",
    ta: "வேலை தேடு", te: "పని వెతకండి", gu: "કામ શોધો", kn: "ಕೆಲಸ ಹುಡುಕಿ",
  },
  nav_hireWorkers: {
    hi: "कारीगर ढूंढें", en: "Hire Workers", bn: "কর্মী নিয়োগ করুন", mr: "कामगार शोधा",
    ta: "தொழிலாளர் வேலைக்கு எடு", te: "కార్మికులను నియమించండి", gu: "કામદારો ભાડે કરો", kn: "ಕಾರ್ಮಿಕರನ್ನು ನೇಮಿಸಿ",
  },
  nav_login: {
    hi: "लॉगिन", en: "Login", bn: "লগইন", mr: "लॉगिन",
    ta: "உள்நுழை", te: "లాగిన్", gu: "લૉગઇન", kn: "ಲಾಗಿನ್",
  },
  nav_signUp: {
    hi: "साइन अप", en: "Sign Up", bn: "সাইন আপ", mr: "साइन अप",
    ta: "பதிவு செய்", te: "సైన్ అప్", gu: "સાઇન અપ", kn: "ಸೈನ್ ಅಪ್",
  },

  // ── AI Voice Agent ───────────────────────────────────────────────────────
  ai_greeting: {
    hi: "नमस्ते! मैं SevaSetu का AI Assistant हूँ। मैं आपको form भरने में help करूँगा। बस बोलिए!",
    en: "Hello! I'm SevaSetu's AI Assistant. I'll help you fill out the form. Just speak!",
    bn: "নমস্কার! আমি SevaSetu-র AI Assistant। আমি আপনাকে ফর্ম পূরণ করতে সাহায্য করব।",
    mr: "नमस्कार! मी SevaSetu चा AI Assistant आहे। मी तुम्हाला फॉर्म भरण्यात मदत करेन।",
    ta: "வணக்கம்! நான் SevaSetu-வின் AI Assistant. படிவம் நிரப்ப உதவுவேன்.",
    te: "నమస్కారం! నేను SevaSetu AI Assistant. ఫారం నింపడానికి సహాయం చేస్తాను.",
    gu: "નમસ્કાર! હું SevaSetu નો AI Assistant છું। ફોર્મ ભરવામાં મદદ કરીશ.",
    kn: "ನಮಸ್ಕಾರ! ನಾನು SevaSetu AI Assistant. ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
  },
  ai_done: {
    hi: "🎉 बहुत बढ़िया! आपका form तैयार है। अब Submit करें!",
    en: "🎉 Excellent! Your form is ready. Now Submit!",
    bn: "🎉 চমৎকার! আপনার ফর্ম তৈরি। এখন Submit করুন!",
    mr: "🎉 उत्तम! तुमचा फॉर्म तयार आहे। आता Submit करा!",
    ta: "🎉 சிறப்பு! படிவம் தயார். இப்போது சமர்ப்பிக்கவும்!",
    te: "🎉 అద్భుతం! మీ ఫారం సిద్ధంగా ఉంది. ఇప్పుడు సమర్పించండి!",
    gu: "🎉 શાબાશ! ફોર્મ તૈયાર છે. Submit કરો!",
    kn: "🎉 ಅದ್ಭುತ! ನಿಮ್ಮ ಫಾರ್ಮ್ ಸಿದ್ಧವಾಗಿದೆ. ಈಗ Submit ಮಾಡಿ!",
  },
  ai_skip: {
    hi: "Skip किया! अब — ",
    en: "Skipped! Now — ",
    bn: "Skip করা হলো! এবার — ",
    mr: "Skip केले! आता — ",
    ta: "Skip செய்தேன்! இப்போது — ",
    te: "Skip చేసాను! ఇప్పుడు — ",
    gu: "Skip કર્યું! હવે — ",
    kn: "Skip ಮಾಡಿದೆ! ಈಗ — ",
  },
  ai_listening: {
    hi: "बोलिए... मैं सुन रहा हूँ",
    en: "Speak now... I'm listening",
    bn: "বলুন... আমি শুনছি",
    mr: "बोला... मी ऐकतोय",
    ta: "பேசுங்கள்... கேட்கிறேன்",
    te: "చెప్పండి... వింటున్నాను",
    gu: "બોલો... હું સાંભળું છું",
    kn: "ಮಾತಾಡಿ... ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ",
  },
  ai_speaking: {
    hi: "AI बोल रहा है...", en: "AI is speaking...", bn: "AI বলছে...", mr: "AI बोलत आहे...",
    ta: "AI பேசுகிறது...", te: "AI మాట్లాడుతోంది...", gu: "AI બોલી રહ્યો છે...", kn: "AI ಮಾತಾಡುತ್ತಿದೆ...",
  },
  ai_fieldsFilled: {
    hi: "भरे", en: "filled", bn: "পূর্ণ", mr: "भरले",
    ta: "நிரப்பிய", te: "నింపబడ్డాయి", gu: "ભરેલ", kn: "ತುಂಬಿದ",
  },
  ai_fillNow: {
    hi: "अभी भरें", en: "Fill Now", bn: "এখন পূরণ করুন", mr: "आता भरा",
    ta: "இப்போது நிரப்புக", te: "ఇప్పుడు నింపండి", gu: "હવે ભરો", kn: "ಈಗ ತುಂಬಿ",
  },
  ai_start: {
    hi: "🎤 Start करें — बोलकर भरें", en: "🎤 Start — Speak to fill", bn: "🎤 শুরু করুন", mr: "🎤 सुरू करा",
    ta: "🎤 தொடங்கு", te: "🎤 ప్రారంభించు", gu: "🎤 શરૂ કરો", kn: "🎤 ಪ್ರಾರಂಭಿಸಿ",
  },
  ai_stop: {
    hi: "⬛ रोकें", en: "⬛ Stop", bn: "⬛ থামুন", mr: "⬛ थांबा",
    ta: "⬛ நிறுத்து", te: "⬛ ఆపండి", gu: "⬛ રોકો", kn: "⬛ ನಿಲ್ಲಿಸಿ",
  },
  ai_close_done: {
    hi: "शानदार! Form भर गया — Close करें", en: "Great! Form filled — Close",
    bn: "দারুণ! ফর্ম পূরণ হলো — বন্ধ করুন", mr: "छान! फॉर्म भरला — बंद करा",
    ta: "அற்புதம்! படிவம் நிரம்பியது — மூடு", te: "అద్భుతం! ఫారం నిండింది — మూసివేయి",
    gu: "શ્રેષ્ઠ! ફોર્મ ભરાઈ ગઈ — બંધ કરો", kn: "ಅದ್ಭುತ! ಫಾರ್ಮ್ ತುಂಬಿತು — ಮುಚ್ಚಿ",
  },
  ai_privacy: {
    hi: "🔒 आपकी आवाज़ केवल आपके browser में process होती है",
    en: "🔒 Your voice is processed only in your browser",
    bn: "🔒 আপনার কণ্ঠ শুধু আপনার ব্রাউজারে প্রক্রিয়া হয়",
    mr: "🔒 तुमचा आवाज फक्त तुमच्या browser मध्ये process होतो",
    ta: "🔒 உங்கள் குரல் உங்கள் உலாவியில் மட்டுமே செயலாக்கப்படும்",
    te: "🔒 మీ స్వరం మీ browser లో మాత్రమే process అవుతుంది",
    gu: "🔒 તમારો અવાજ ફક્ત તમારા browser માં process થાય છે",
    kn: "🔒 ನಿಮ್ಮ ಧ್ವನಿ ಕೇವಲ ನಿಮ್ಮ browser ನಲ್ಲಿ ಪ್ರಕ್ರಿಯೆಗೊಳ್ಳುತ್ತದೆ",
  },
  ai_tooltip: {
    hi: "🎤 बोलकर Form भरें", en: "🎤 Fill Form by Speaking", bn: "🎤 কথা বলে ফর্ম পূরণ",
    mr: "🎤 बोलून फॉर्म भरा", ta: "🎤 பேசி படிவம் நிரப்பு", te: "🎤 మాట్లాడి ఫారం నింపు",
    gu: "🎤 બોલીને ફોર્મ ભરો", kn: "🎤 ಮಾತಾಡಿ ಫಾರ್ಮ್ ತುಂಬಿ",
  },

  // ── Customer Form Prompts ─────────────────────────────────────────────────
  cust_name: {
    hi: "सबसे पहले, अपना पूरा नाम बोलिए।",
    en: "First, please tell me your full name.",
    bn: "প্রথমে আপনার পুরো নাম বলুন।",
    mr: "प्रथम, तुमचे पूर्ण नाव सांगा.",
    ta: "முதலில், உங்கள் முழு பெயர் சொல்லுங்கள்.",
    te: "మొదట, మీ పూర్తి పేరు చెప్పండి.",
    gu: "પ્રથમ, તમારું પૂરું નામ બોલો.",
    kn: "ಮೊದಲು, ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಹೇಳಿ.",
  },
  cust_phone: {
    hi: "अब अपना 10 अंकों का मोबाइल नंबर बोलिए।",
    en: "Now tell me your 10-digit mobile number.",
    bn: "এখন আপনার ১০ সংখ্যার মোবাইল নম্বর বলুন।",
    mr: "आता तुमचा 10 अंकी मोबाइल नंबर सांगा.",
    ta: "இப்போது உங்கள் 10 இலக்க மொபைல் எண் சொல்லுங்கள்.",
    te: "ఇప్పుడు మీ 10 అంకెల మొబైల్ నంబర్ చెప్పండి.",
    gu: "હવે તમારો 10 અંકનો મોબાઇલ નંબર બોલો.",
    kn: "ಈಗ ನಿಮ್ಮ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹೇಳಿ.",
  },
  cust_address: {
    hi: "अपना घर का पूरा पता बोलिए — मकान नंबर, गली, इलाका।",
    en: "Tell your home address — house number, street, area.",
    bn: "আপনার বাড়ির ঠিকানা বলুন — বাড়ি নম্বর, রাস্তা, এলাকা।",
    mr: "घराचा पूर्ण पत्ता सांगा — घर क्रमांक, रस्ता, क्षेत्र.",
    ta: "உங்கள் வீட்டு முழு முகவரி சொல்லுங்கள் — வீட்டு எண், தெரு, பகுதி.",
    te: "మీ ఇంటి పూర్తి చిరునామా చెప్పండి — ఇంటి నంబర్, వీధి, ప్రాంతం.",
    gu: "ઘરનું સંપૂર્ણ સરનામું બોલો — ઘર નંબર, રસ્તો, વિસ્તાર.",
    kn: "ನಿಮ್ಮ ಮನೆ ಪೂರ್ಣ ವಿಳಾಸ ಹೇಳಿ — ಮನೆ ಸಂಖ್ಯೆ, ಬೀದಿ, ಪ್ರದೇಶ.",
  },
  cust_city: {
    hi: "अपने शहर का नाम बोलिए।",
    en: "Tell me your city name.",
    bn: "আপনার শহরের নাম বলুন।",
    mr: "तुमच्या शहराचे नाव सांगा.",
    ta: "உங்கள் நகரத்தின் பெயர் சொல்லுங்கள்.",
    te: "మీ నగరం పేరు చెప్పండి.",
    gu: "તમારા શહેરનું નામ બોલો.",
    kn: "ನಿಮ್ಮ ನಗರದ ಹೆಸರು ಹೇಳಿ.",
  },
  cust_state: {
    hi: "राज्य का नाम बोलिए।",
    en: "Tell me your state name.",
    bn: "আপনার রাজ্যের নাম বলুন।",
    mr: "राज्याचे नाव सांगा.",
    ta: "மாநிலத்தின் பெயர் சொல்லுங்கள்.",
    te: "రాష్ట్రం పేరు చెప్పండి.",
    gu: "રાજ્યનું નામ બોલો.",
    kn: "ರಾಜ್ಯದ ಹೆಸರು ಹೇಳಿ.",
  },
  cust_pincode: {
    hi: "अब 6 अंकों का पिनकोड बोलिए।",
    en: "Now tell me the 6-digit pincode.",
    bn: "এখন ৬ সংখ্যার পিনকোড বলুন।",
    mr: "आता 6 अंकी पिनकोड सांगा.",
    ta: "இப்போது 6 இலக்க பின்கோட் சொல்லுங்கள்.",
    te: "ఇప్పుడు 6 అంకెల పిన్‌కోడ్ చెప్పండి.",
    gu: "હવે 6 અંકનો પિનકોડ બોલો.",
    kn: "ಈಗ 6 ಅಂಕಿಯ ಪಿನ್‌ಕೋಡ್ ಹೇಳಿ.",
  },

  // ── Worker Form Prompts ───────────────────────────────────────────────────
  work_name: {
    hi: "अपना पूरा नाम बोलिए — जैसे Aadhaar card पर है।",
    en: "Tell your full name — as written on Aadhaar card.",
    bn: "আপনার পূর্ণ নাম বলুন — Aadhaar কার্ডে যেমন আছে।",
    mr: "तुमचे पूर्ण नाव सांगा — Aadhaar कार्डावर जसे आहे तसे.",
    ta: "Aadhaar card-ல் உள்ளபடி உங்கள் முழு பெயர் சொல்லுங்கள்.",
    te: "Aadhaar card లో ఉన్నట్లు మీ పూర్తి పేరు చెప్పండి.",
    gu: "Aadhaar card પ્રમાણે તમારું પૂરું નામ બોલો.",
    kn: "Aadhaar card ನಲ್ಲಿ ಇರುವಂತೆ ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಹೇಳಿ.",
  },
  work_phone: {
    hi: "अब अपना 10 अंकों का मोबाइल नंबर बोलिए।",
    en: "Now tell your 10-digit mobile number.",
    bn: "এখন আপনার ১০ সংখ্যার মোবাইল নম্বর বলুন।",
    mr: "आता 10 अंकी मोबाइल नंबर सांगा.",
    ta: "இப்போது 10 இலக்க மொபைல் எண் சொல்லுங்கள்.",
    te: "ఇప్పుడు 10 అంకెల మొబైల్ నంబర్ చెప్పండి.",
    gu: "હવે 10 અંકનો મોબાઇલ નંબર બોલો.",
    kn: "ಈಗ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹೇಳಿ.",
  },
  work_experience: {
    hi: "आपको अपने काम में कितने साल का अनुभव है? सिर्फ नंबर बोलिए।",
    en: "How many years of experience do you have? Just say the number.",
    bn: "আপনার কাজে কত বছরের অভিজ্ঞতা আছে? শুধু সংখ্যা বলুন।",
    mr: "तुम्हाला किती वर्षांचा अनुभव आहे? फक्त संख्या सांगा.",
    ta: "உங்களுக்கு எத்தனை ஆண்டுகள் அனுபவம் உள்ளது? எண் மட்டும் சொல்லுங்கள்.",
    te: "మీకు ఎన్ని సంవత్సరాల అనుభవం ఉంది? కేవలం సంఖ్య చెప్పండి.",
    gu: "તમને કામમાં કેટલા વર્ષનો અનુભવ છે? ફક્ત નંબર બોલો.",
    kn: "ನಿಮಗೆ ಎಷ್ಟು ವರ್ಷಗಳ ಅನುಭವ ಇದೆ? ಕೇವಲ ಸಂಖ್ಯೆ ಹೇಳಿ.",
  },
  work_rate: {
    hi: "आपका hourly rate क्या है, rupees में बोलिए।",
    en: "What is your hourly rate? Tell me in rupees.",
    bn: "আপনার hourly rate কত? রুপিতে বলুন।",
    mr: "तुमचा hourly rate काय आहे? रुपयांमध्ये सांगा.",
    ta: "உங்கள் hourly rate என்ன? ரூபாயில் சொல்லுங்கள்.",
    te: "మీ hourly rate ఎంత? రూపాయలలో చెప్పండి.",
    gu: "તમારો hourly rate શું છે? રૂ.માં બોલો.",
    kn: "ನಿಮ್ಮ hourly rate ಎಷ್ಟು? ರೂಪಾಯಿಗಳಲ್ಲಿ ಹೇಳಿ.",
  },
  work_aadhar: {
    hi: "अपना 12 अंकों का Aadhaar card नंबर बोलिए।",
    en: "Tell your 12-digit Aadhaar card number.",
    bn: "আপনার ১২ সংখ্যার Aadhaar নম্বর বলুন।",
    mr: "तुमचा 12 अंकी Aadhaar नंबर सांगा.",
    ta: "உங்கள் 12 இலக்க Aadhaar எண் சொல்லுங்கள்.",
    te: "మీ 12 అంకెల Aadhaar నంబర్ చెప్పండి.",
    gu: "12 અંકનો Aadhaar નંબર બોલો.",
    kn: "ನಿಮ್ಮ 12 ಅಂಕಿಯ Aadhaar ಸಂಖ್ಯೆ ಹೇಳಿ.",
  },
  work_address: {
    hi: "अपना घर या काम का पूरा पता बोलिए।",
    en: "Tell your home or work full address.",
    bn: "আপনার বাড়ি বা কাজের ঠিকানা বলুন।",
    mr: "घर किंवा कामाचा पूर्ण पत्ता सांगा.",
    ta: "வீடு அல்லது வேலை முழு முகவரி சொல்லுங்கள்.",
    te: "మీ ఇల్లు లేదా పని పూర్తి చిరునామా చెప్పండి.",
    gu: "ઘર અથવા કામનું સંપૂર્ણ સરનામું બોલો.",
    kn: "ನಿಮ್ಮ ಮನೆ ಅಥವಾ ಕೆಲಸದ ಪೂರ್ಣ ವಿಳಾಸ ಹೇಳಿ.",
  },
  work_city: {
    hi: "शहर का नाम बोलिए।",
    en: "Tell me the city name.",
    bn: "শহরের নাম বলুন।",
    mr: "शहराचे नाव सांगा.",
    ta: "நகரத்தின் பெயர் சொல்லுங்கள்.",
    te: "నగరం పేరు చెప్పండి.",
    gu: "શહેરનું નામ બોલો.",
    kn: "ನಗರದ ಹೆಸರು ಹೇಳಿ.",
  },
  work_state: {
    hi: "राज्य का नाम बोलिए।",
    en: "Tell me the state name.",
    bn: "রাজ্যের নাম বলুন।",
    mr: "राज्याचे नाव सांगा.",
    ta: "மாநிலத்தின் பெயர் சொல்லுங்கள்.",
    te: "రాష్ట్రం పేరు చెప్పండి.",
    gu: "રાજ્યનું નામ બોલો.",
    kn: "ರಾಜ್ಯದ ಹೆಸರು ಹೇಳಿ.",
  },
  work_pincode: {
    hi: "6 अंकों का पिनकोड बोलिए।",
    en: "Tell me the 6-digit pincode.",
    bn: "৬ সংখ্যার পিনকোড বলুন।",
    mr: "6 अंकी पिनकोड सांगा.",
    ta: "6 இலக்க பின்கோட் சொல்லுங்கள்.",
    te: "6 అంకెల పిన్‌కోడ్ చెప్పండి.",
    gu: "6 અંકનો પિનકોડ બોલો.",
    kn: "6 ಅಂಕಿಯ ಪಿನ್‌ಕೋಡ್ ಹೇಳಿ.",
  },

  // ── Agriculture & Rural Theme Labels ──────────────────────────────────────
  cat_agri: {
    hi: "कृषि एवं फार्म यंत्रीकरण",
    en: "Agri & Farm Mechanization",
    bn: "কৃষি ও খামার যান্ত্রিকীকরণ",
    mr: "शेती व कृषी यांत्रिकीकरण",
  },
  cat_foodtech: {
    hi: "खाद्य प्रसंस्करण एवं भंडारण",
    en: "FoodTech & Agro-Processing",
    bn: "খাদ্য প্রক্রিয়াকরণ ও সংরক্ষণ",
    mr: "अन्न प्रक्रिया व साठवणूक",
  },
  cat_rural: {
    hi: "ग्रामीण अवसंरचना व पंचायत",
    en: "Rural & Panchayat Infrastructure",
    bn: "গ্রামীণ অবকাঠামো ও পঞ্চায়েত",
    mr: "ग्रामीण पायाभूत सुविधा व पंचायत",
  },
  cat_dairy: {
    hi: "डेयरी, पशुपालन व पशु सखी",
    en: "Dairy & Animal Husbandry",
    bn: "দুগ্ধ ও পশুপালন",
    mr: "दुग्धव्यवसाय व पशुसंवर्धन",
  },
  cat_emergency: {
    hi: "तत्काल फार्म आपातकालीन (45 मिनट)",
    en: "Tatkal Farm Breakdown (45-Min)",
    bn: "জরুরি খামার সেবা",
    mr: "तातडीची शेती यंत्रणा दुरुस्ती",
  },
  cat_bulk: {
    hi: "FPO व संस्थागत बल्क बुकिंग",
    en: "FPO & Institutional Bulk Squads",
    bn: "এফপিও ও যৌথ বুকিং",
    mr: "एफपीओ व संस्थात्मक बल्क बुकिंग",
  },
  coop_fair_wage: {
    hi: "90% प्रत्यक्ष कारीगर पारिश्रमिक · 5% कल्याण व बीमा · 5% समिति",
    en: "90% Direct Fair Wage · 5% Welfare & PMSBY · 5% Cooperative Ops",
    bn: "৯০% সরাসরি পারিশ্রমিক",
    mr: "९०% थेट कामगार मोबदला",
  },
};

// ── Helper ───────────────────────────────────────────────────────────────────
export function t(key, langCode) {
  return TRANSLATIONS[key]?.[langCode] ?? TRANSLATIONS[key]?.["en"] ?? key;
}

// ── Context ───────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [langCode, setLangCode] = useState(() => {
    return localStorage.getItem("ss_lang") || "hi";
  });

  const setLanguage = useCallback((code) => {
    setLangCode(code);
    localStorage.setItem("ss_lang", code);
  }, []);

  const lang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];

  // Helper: translate a key with current language
  const tr = useCallback((key) => t(key, langCode), [langCode]);

  useEffect(() => {
    document.documentElement.lang = lang.speechLang.split("-")[0];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ langCode, lang, setLanguage, tr, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
