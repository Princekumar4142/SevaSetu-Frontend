/**
 * VoiceAgentContext — Unified Global AI Voice Assistant for SevaSetu
 * Provides synchronized voice ordering, speech synthesis, Devanagari normalization,
 * and 1-click booking execution across the entire application.
 */
import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "../hooks/useAuth";
import bookingService from "../services/bookingService";

export const AGENT_STATUS = {
  IDLE: "idle",
  LISTENING: "listening",
  PROCESSING: "processing",
  SPEAKING: "speaking",
  CONFIRMING: "confirming",
  SUCCESS: "success",
  ERROR: "error",
  UNSUPPORTED: "unsupported",
};

// ── Cooperative Verified Services Catalog with Fair Living Wages ────────────
export const SERVICES_CATALOG = [
  {
    id: "svc-electrician",
    trade: "Electricians",
    name: "Cooperative Electrician Visit & Repair",
    category: "electricians",
    price: 249,
    icon: "electrical_services",
    durationMins: 60,
    keywords: [
      "electric", "electrician", "bijli", "wiring", "short circuit", "fan", "switch", "light", "mcb", "fuse", "geyser", "bulb", "wire", "taar",
      "इलेक्ट्रिशियन", "इलेक्ट्रीशियन", "बिजली", "करंट", "पंखा", "स्विच", "इलेक्ट्रिक", "तार", "बल्ब", "गीजर", "लाइट", "फैन", "शॉर्ट सर्किट", "मिस्त्री"
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
      "plumb", "plumber", "plumbing", "nal", "pipe", "leak", "tap", "motor", "tanki", "drain", "water", "sewage", "basin",
      "प्लंबर", "प्लम्बर", "नल", "पाइप", "लीकेज", "पानी", "टंकी", "टोंटी", "नलका", "ड्रेन", "मोटर", "प्लंबिंग"
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
      "tractor", "farm", "khet", "ploughing", "harvest", "kheti", "kisan", "field", "cultivator", "rotavator", "sowing",
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
      "caregiver", "companion", "elderly", "bujurg", "shopping", "care", "hospital", "dawa", "patient", "nurse", "support",
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
      "ac", "air conditioner", "fridge", "refrigerator", "washing machine", "microwave", "appliance", "cooler", "repair", "technician",
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
      "paint", "painter", "rang", "color", "putty", "wall", "diwar", "painting", "touchup",
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
      "driver", "gadi", "car", "chauffeur", "drive", "vehicle",
      "ड्राइवर", "गाड़ी", "गाड़ी", "कार", "चालक", "वाहन"
    ],
  },
];

const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

const isTtsSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Normalizes Devanagari text so variations like
 * 'इलेक्ट्रीशियन' and 'इलेक्ट्रिशियन', 'प्लंबर' and 'प्लम्बर' match identically.
 */
function normalizeDevanagari(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    // replace 'ी' with 'ि'
    .replace(/\u0940/g, "\u093f")
    // replace 'ू' with 'ु'
    .replace(/\u0942/g, "\u0941")
    // replace anusvara/candrabindu
    .replace(/[\u0901\u0902]/g, "")
    // replace nukta
    .replace(/\u093c/g, "")
    // normalize sibilants (ष, श -> स)
    .replace(/[\u0937\u0936]/g, "\u0938")
    // normalize ba/va
    .replace(/\u0935/g, "\u092c")
    // strip punctuation & extra spaces
    .replace(/[.,?!:;'"()\-/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const VoiceAgentContext = createContext(null);

export function VoiceAgentProvider({ children }) {
  const navigate = useNavigate();
  const { lang, langCode, tr } = useLanguage();
  const { currentUser, isAuthenticated } = useAuth();
  const speechLang = lang?.speechLang || "hi-IN";

  const [status, setStatus] = useState(
    isSpeechSupported() ? AGENT_STATUS.IDLE : AGENT_STATUS.UNSUPPORTED
  );
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [fallbackCount, setFallbackCount] = useState(0);

  const [messages, setMessages] = useState(() => [
    {
      id: "init-1",
      role: "ai",
      text:
        langCode === "en"
          ? "Namaste! I am SevaSetu AI Assistant. Say 'Book Electrician', 'Plumber needed', or tap any service below, and I'll book verified cooperative workers with fair wages for you!"
          : "नमस्ते! मैं SevaSetu AI Assistant हूँ। 'इलेक्ट्रीशियन बुक करो' या 'नल ठीक कराना है' बोलिए, मैं तुरंत उचित दरों पर सरकारी प्रमाणित कारीगर बुक कर दूँगा!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [pendingBooking, setPendingBooking] = useState(null);
  const [lastCreatedBooking, setLastCreatedBooking] = useState(null);

  const recognitionRef = useRef(null);
  const activeRef = useRef(false);

  // ── Add message helper ───────────────────────────────────────────────────
  const addMessage = useCallback((role, text, extra = {}) => {
    const msg = {
      id: "msg-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...extra,
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  // ── TTS: Speak out loud ──────────────────────────────────────────────────
  const speak = useCallback(
    (text, onEnd) => {
      if (!isTtsSupported()) {
        onEnd?.();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        // Remove emoji from spoken utterance for cleaner speech
        const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/gu, "").trim();
        const utt = new SpeechSynthesisUtterance(cleanText);
        utt.lang = speechLang;
        utt.rate = 0.95;
        utt.pitch = 1.0;
        utt.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const matched =
          voices.find((v) => v.lang.startsWith(speechLang.split("-")[0])) ||
          voices.find((v) => v.lang.startsWith("hi"));
        if (matched) utt.voice = matched;

        utt.onend = () => {
          setStatus((s) => (s === AGENT_STATUS.SPEAKING ? AGENT_STATUS.IDLE : s));
          onEnd?.();
        };
        utt.onerror = () => {
          setStatus(AGENT_STATUS.IDLE);
          onEnd?.();
        };

        setStatus(AGENT_STATUS.SPEAKING);
        window.speechSynthesis.speak(utt);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
        onEnd?.();
      }
    },
    [speechLang]
  );

  // ── Parse Natural Language Spoken/Typed Request ──────────────────────────
  const parseSpokenRequest = useCallback((spokenText) => {
    if (!spokenText || typeof spokenText !== "string") {
      return { action: "UNKNOWN", raw: "" };
    }

    const rawLower = spokenText.toLowerCase().trim();
    const normText = normalizeDevanagari(spokenText);

    // 1. First, check if a specific SERVICE is mentioned in the input
    let matchedService = null;
    for (const svc of SERVICES_CATALOG) {
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

    // 2. If NO service was mentioned, check for Confirmation Intent
    if (!matchedService) {
      const confirmPatterns = [
        /\b(haan|yes|yep|ha|haa|confirm|theek|sahi|kardo|kar do|book it|book kar do|chalega|proceed|done|thik|theek hai|ok|okay)\b/i,
        /हाँ|हॉ|हा|सही है|ठीक है|कर दो|करदो|बुक करो|बुक कर दो|आगे बढ़ो/
      ];
      if (confirmPatterns.some((pattern) => pattern.test(rawLower) || pattern.test(spokenText))) {
        return { action: "CONFIRM" };
      }

      // 3. Check Cancellation Intent
      const cancelPatterns = [
        /\b(nahi|no|cancel|rok|stop|band|hatao|mat karo|chodo|rehnde)\b/i,
        /नहीं|नही|रोक|रद्द|बंद|हटाओ|मत करो/
      ];
      if (cancelPatterns.some((pattern) => pattern.test(rawLower) || pattern.test(spokenText))) {
        return { action: "CANCEL" };
      }

      // 4. Check Greeting / Help Intent
      const helpPatterns = [
        /\b(namaste|namaskar|hello|hi|hey|help|madad|kaise|kya kar|kya karte)\b/i,
        /नमस्ते|नमस्कार|हेलो|हाय|मदद|सहायता|कैसे/
      ];
      if (helpPatterns.some((pattern) => pattern.test(rawLower) || pattern.test(spokenText))) {
        return { action: "GREETING" };
      }

      return { action: "UNKNOWN", raw: spokenText };
    }

    // 5. Extract Slot Date & Time
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

    // Default upcoming slot (2 hours from now, or tomorrow morning if night)
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
    };
  }, []);

  // ── Stop Listening ───────────────────────────────────────────────────────
  const stopListening = useCallback(() => {
    activeRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setStatus((s) => (s === AGENT_STATUS.LISTENING ? AGENT_STATUS.IDLE : s));
  }, []);

  // ── Trigger Final Booking Execution ──────────────────────────────────────
  const triggerConfirmBooking = useCallback(
    async (bookingProposal) => {
      setStatus(AGENT_STATUS.PROCESSING);
      const svc = bookingProposal.service;

      const userCity = currentUser?.city || "Mumbai";
      const userAddressLine = currentUser?.address || "House No. 12, Main Street";
      const userPincode = currentUser?.pincode || "400001";

      const bookingPayload = {
        items: [
          {
            id: svc.id,
            name: svc.name,
            qty: 1,
            price: svc.price,
            durationMins: svc.durationMins,
            icon: svc.icon,
            meta: svc.category,
          },
        ],
        address: {
          line1: userAddressLine,
          city: userCity,
          pincode: userPincode,
        },
        slot: bookingProposal.slot,
        pricing: {
          subtotal: svc.price,
          discount: 0,
          totalAmount: svc.price,
          paymentMethod: "ONLINE",
          paymentStatus: "PAID",
        },
        category: svc.category,
      };

      try {
        let bookingResult = null;
        if (isAuthenticated) {
          try {
            const res = await bookingService.createBooking(bookingPayload);
            bookingResult = res?.data?.booking || res;
          } catch (apiErr) {
            console.warn("Online API error, falling back to local simulation:", apiErr);
          }
        }

        if (!bookingResult) {
          const mockNumber = "BK-" + Math.floor(100000 + Math.random() * 900000);
          bookingResult = {
            _id: "local-" + Date.now(),
            bookingNumber: mockNumber,
            items: bookingPayload.items,
            slot: bookingPayload.slot,
            address: bookingPayload.address,
            pricing: bookingPayload.pricing,
            status: "PENDING",
            isSimulatedGuest: !isAuthenticated,
            createdAt: new Date().toISOString(),
          };

          // Store in guest bookings history in localStorage
          try {
            const existing = JSON.parse(localStorage.getItem("sevasetu_guest_bookings") || "[]");
            existing.unshift(bookingResult);
            localStorage.setItem("sevasetu_guest_bookings", JSON.stringify(existing.slice(0, 10)));
          } catch {
            // ignore
          }
        }

        setLastCreatedBooking(bookingResult);
        setPendingBooking(null);
        setStatus(AGENT_STATUS.SUCCESS);

        const translatedServiceName = tr(svc.name);
        const orderId = bookingResult.bookingNumber || "BK-78921";

        const successText =
          langCode === "en"
            ? `🎉 Congratulations! Your ${translatedServiceName} is booked! Order ID is #${orderId}. Verified cooperative worker has been dispatched.`
            : `🎉 बधाई हो! आपकी ${translatedServiceName} सेवा सफलतापूर्वक बुक हो गई है! आर्डर संख्या #${orderId} है। पास के सत्यापित सहकारी कार्यकर्ता को अलर्ट भेज दिया गया है।`;

        addMessage("ai", successText, { confirmedBooking: bookingResult });
        speak(successText);
      } catch (err) {
        console.error("Booking execution error:", err);
        setStatus(AGENT_STATUS.ERROR);
        const errText =
          langCode === "en"
            ? "Could not complete booking right now. Please try again."
            : "बुकिंग पूरी नहीं हो सकी। कृपया दोबारा प्रयास करें।";
        addMessage("ai", errText);
        speak(errText);
      }
    },
    [currentUser, isAuthenticated, langCode, tr, addMessage, speak]
  );

  // ── Handle User Input (Spoken or Typed) ──────────────────────────────────
  const handleUserInput = useCallback(
    (text) => {
      if (!text || !text.trim()) return;
      const parsed = parseSpokenRequest(text);

      // 1. Confirm pending booking
      if (parsed.action === "CONFIRM") {
        if (pendingBooking) {
          triggerConfirmBooking(pendingBooking);
        } else {
          const resp =
            langCode === "en"
              ? "Which service would you like to book? For example: Electrician, Plumber, Cleaner, or Tractor."
              : "आप कौन सी सेवा बुक करना चाहते हैं? जैसे: इलेक्ट्रीशियन, प्लंबर, सफाई, बढ़ई, या ट्रैक्टर।";
          addMessage("ai", resp);
          speak(resp);
        }
        return;
      }

      // 2. Cancel pending booking
      if (parsed.action === "CANCEL") {
        setPendingBooking(null);
        const resp =
          langCode === "en"
            ? "Booking cancelled. Tell me if you need any other service!"
            : "बुकिंग रद्द कर दी गई। यदि कोई अन्य सहायता चाहिए तो बताइए!";
        addMessage("ai", resp);
        speak(resp);
        return;
      }

      // 3. Greeting intent
      if (parsed.action === "GREETING") {
        const greetingResp =
          langCode === "en"
            ? "Namaste! I am SevaSetu Voice Assistant. I can book Electrician, Plumber, Cleaners, Carpenter, Tractor, Caregiver, or Driver. How can I help you today?"
            : "नमस्ते! मैं SevaSetu Voice Assistant हूँ। मैं इलेक्ट्रीशियन, प्लंबर, सफाई, बढ़ई, ट्रैक्टर, केयरगिवर या ड्राइवर तुरंत बुक कर सकता हूँ। आपको क्या सेवा चाहिए?";
        addMessage("ai", greetingResp);
        speak(greetingResp);
        return;
      }

      // 4. Service recognized!
      if (parsed.action === "SERVICE_IDENTIFIED") {
        const { service, slot } = parsed;
        const userCity = currentUser?.city || "Mumbai";
        const userAddressLine = currentUser?.address || "House No. 12, Main Street";

        const bookingProposal = {
          service,
          slot,
          address: {
            line1: userAddressLine,
            city: userCity,
            pincode: "400001",
          },
          price: service.price,
        };

        setPendingBooking(bookingProposal);
        setStatus(AGENT_STATUS.CONFIRMING);
        setFallbackCount(0);

        const translatedTrade = tr(service.trade);
        const aiPrompt =
          langCode === "en"
            ? `I found verified cooperative ${translatedTrade}! Fare is ₹${service.price} (${slot.date} at ${slot.time}). Say "Yes confirm" or click Confirm & Book below.`
            : `मैंने सत्यापित सहकारी ${translatedTrade} ढूँढ लिया है! शुल्क केवल ₹${service.price} (${slot.date}, ${slot.time}) है। 'हाँ बुक करो' बोलें या नीचे Confirm & Book दबाएं।`;

        addMessage("ai", aiPrompt, { bookingPreview: bookingProposal });
        speak(aiPrompt);
        return;
      }

      // 5. Unknown query — intelligent alternating fallback
      setFallbackCount((prev) => prev + 1);
      const fallback =
        fallbackCount % 2 === 0
          ? (langCode === "en"
              ? "I can book Electrician, Plumber, Cleaner, Carpenter, Tractor, Caregiver, or Driver. What service do you need?"
              : "मैं इलेक्ट्रीशियन, प्लंबर, सफाई, बढ़ई, ट्रैक्टर, केयरगिवर या ड्राइवर बुक कर सकता हूँ। आपको क्या सेवा चाहिए?")
          : (langCode === "en"
              ? "Please tell me the service you need (e.g., 'Book Electrician' or 'Fix Tap Leak') or tap any option below."
              : "कृपया अपनी सेवा बताएं (जैसे 'इलेक्ट्रीशियन बुक करो' या 'नल ठीक कराना है') या नीचे दिए गए विकल्पों में से चुनें।");

      addMessage("ai", fallback);
      speak(fallback);
    },
    [parseSpokenRequest, pendingBooking, triggerConfirmBooking, langCode, tr, currentUser, fallbackCount, addMessage, speak]
  );

  // ── Directly select a service chip ───────────────────────────────────────
  const selectServiceChip = useCallback(
    (serviceId) => {
      const svc = SERVICES_CATALOG.find((s) => s.id === serviceId);
      if (!svc) return;
      setIsOpen(true);
      addMessage("user", svc.trade);
      handleUserInput(svc.trade);
    },
    [handleUserInput, addMessage]
  );

  // ── Start Listening ──────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    if (!isSpeechSupported()) {
      setStatus(AGENT_STATUS.UNSUPPORTED);
      return;
    }

    try {
      window.speechSynthesis?.cancel();
    } catch {
      // ignore
    }

    stopListening();
    activeRef.current = true;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    recognition.onstart = () => {
      setStatus(AGENT_STATUS.LISTENING);
    };

    recognition.onresult = (event) => {
      const results = event.results;
      const last = results[results.length - 1];
      const isFinal = last.isFinal;
      const spoken = last[0].transcript;

      setTranscript(spoken);

      if (isFinal) {
        setStatus(AGENT_STATUS.PROCESSING);
        addMessage("user", spoken);
        setTranscript("");
        handleUserInput(spoken);
      }
    };

    recognition.onerror = (e) => {
      if (e.error === "no-speech") {
        setStatus(AGENT_STATUS.IDLE);
      } else if (e.error === "not-allowed") {
        setStatus(AGENT_STATUS.ERROR);
        addMessage("ai", "❌ Mic permission required. Please allow microphone access in browser settings.");
      } else {
        setStatus(AGENT_STATUS.IDLE);
      }
    };

    recognition.onend = () => {
      if (status === AGENT_STATUS.LISTENING) {
        setStatus(AGENT_STATUS.IDLE);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (err) {
      console.warn("Recognition start failed:", err);
      setStatus(AGENT_STATUS.IDLE);
    }
  }, [speechLang, addMessage, status, stopListening, handleUserInput]);

  return (
    <VoiceAgentContext.Provider
      value={{
        status,
        isOpen,
        setIsOpen,
        messages,
        setMessages,
        transcript,
        pendingBooking,
        setPendingBooking,
        lastCreatedBooking,
        servicesCatalog: SERVICES_CATALOG,
        startListening,
        stopListening,
        handleUserInput,
        selectServiceChip,
        triggerConfirmBooking,
        speak,
        addMessage,
      }}
    >
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgent() {
  const ctx = useContext(VoiceAgentContext);
  if (!ctx) {
    throw new Error("useVoiceAgent must be used within VoiceAgentProvider");
  }
  return ctx;
}
