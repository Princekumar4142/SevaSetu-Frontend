/**
 * useVoiceFormAgent — Web Speech API powered voice form assistant
 * Supports Hindi (hi-IN) + English, Text-to-Speech responses, field-guided flow
 */
import { useState, useRef, useCallback, useEffect } from "react";

// ── Helpers ─────────────────────────────────────────────────────────────────

const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

const isTtsSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/** Extract digits only from a string */
const digitsOnly = (text) => text.replace(/\D/g, "");

/** Convert number words (Hindi + English) to digits */
const wordsToDigits = (text) => {
  const map = {
    zero: "0", ek: "1", one: "1", do: "2", two: "2", teen: "3", three: "3",
    char: "4", chaar: "4", four: "4", paanch: "5", five: "5", chhah: "6",
    six: "6", saat: "7", seven: "7", aath: "8", eight: "8", nau: "9",
    nine: "9",
  };
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((w) => map[w] ?? w)
    .join(" ");
};

/** Attempt to parse category from speech */
const parseCategory = (text) => {
  const t = text.toLowerCase();
  if (/electric|bijli|wiring|plumb|nal|pipe/.test(t)) return "electrician-plumber";
  if (/ac|air condition|fridge|washing|appliance/.test(t)) return "ac-appliance";
  if (/clean|safai|pest|cockroach|termite/.test(t)) return "cleaning-pest";
  if (/paint|rang|waterproof/.test(t)) return "home-painting";
  if (/women|salon|ladies|spa|facial|waxing|parlour/.test(t)) return "women-salon";
  if (/men|gents|haircut|shave|beard|nai/.test(t)) return "men-salon";
  if (/carpenter|wood|lakdi|mason|tile|bricks/.test(t)) return "carpenter-mason";
  return "custom-services";
};

// ── AGENT STATUS ─────────────────────────────────────────────────────────────
export const AGENT_STATUS = {
  IDLE: "idle",
  LISTENING: "listening",
  PROCESSING: "processing",
  SPEAKING: "speaking",
  DONE: "done",
  ERROR: "error",
  UNSUPPORTED: "unsupported",
};

// ── HOOK ─────────────────────────────────────────────────────────────────────
export function useVoiceFormAgent({ fields, onFieldFill, onComplete }) {
  const [status, setStatus] = useState(
    isSpeechSupported() ? AGENT_STATUS.IDLE : AGENT_STATUS.UNSUPPORTED
  );
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filledFields, setFilledFields] = useState({});

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const activeRef = useRef(false);
  const fieldIndexRef = useRef(0);

  // sync fieldIndexRef with state
  useEffect(() => {
    fieldIndexRef.current = currentFieldIndex;
  }, [currentFieldIndex]);

  // ── TTS: AI speaks ──────────────────────────────────────────────────────
  const speak = useCallback((text, onEnd) => {
    if (!isTtsSupported()) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "hi-IN";
    utt.rate = 0.92;
    utt.pitch = 1.05;
    utt.volume = 1;

    // prefer a Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.startsWith("hi"));
    if (hindiVoice) utt.voice = hindiVoice;

    utt.onend = () => onEnd?.();
    synthRef.current = utt;
    setStatus(AGENT_STATUS.SPEAKING);
    window.speechSynthesis.speak(utt);
  }, []);

  // ── Add message to chat ─────────────────────────────────────────────────
  const addMessage = useCallback((role, text) => {
    setMessages((prev) => [...prev, { role, text, id: Date.now() + Math.random() }]);
  }, []);

  // ── Process recognized speech for current field ─────────────────────────
  const processInput = useCallback(
    (spokenText, fieldIndex) => {
      const field = fields[fieldIndex];
      if (!field) return;

      let value = spokenText.trim();

      // Field-specific parsing
      if (field.type === "phone" || field.type === "numeric") {
        value = digitsOnly(wordsToDigits(value));
        if (field.maxLength) value = value.slice(0, field.maxLength);
      } else if (field.type === "pincode") {
        value = digitsOnly(wordsToDigits(value)).slice(0, 6);
      } else if (field.type === "aadhar") {
        value = digitsOnly(wordsToDigits(value)).slice(0, 12);
        // Format as XXXX XXXX XXXX
        value = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      } else if (field.type === "category") {
        value = parseCategory(value);
      } else if (field.type === "number") {
        const parsed = wordsToDigits(value);
        const num = parsed.match(/\d+/)?.[0];
        value = num || value;
      }

      // Validate minimal length
      if (!value || value.length < (field.minLength || 1)) {
        const retry = field.retryPrompt || `Kuch samajh nahi aaya, please dobara boliye: ${field.prompt}`;
        addMessage("ai", retry);
        speak(retry, () => {
          if (activeRef.current) startListening(fieldIndex);
        });
        return;
      }

      // Fill the field
      onFieldFill(field.key, value);
      setFilledFields((prev) => ({ ...prev, [field.key]: value }));

      const confirmMsg = field.confirmMessage
        ? field.confirmMessage(value)
        : `✅ "${value}" fill ho gaya!`;

      addMessage("ai", confirmMsg);

      const nextIndex = fieldIndex + 1;
      if (nextIndex >= fields.length) {
        const doneMsg = "🎉 Bahut badhiya! Aapka form almost ready hai. Ab submit kar sakte ho!";
        speak(confirmMsg, () => {
          speak(doneMsg, () => setStatus(AGENT_STATUS.DONE));
        });
        addMessage("ai", doneMsg);
        setStatus(AGENT_STATUS.DONE);
        onComplete?.();
      } else {
        const nextField = fields[nextIndex];
        setCurrentFieldIndex(nextIndex);
        speak(confirmMsg, () => {
          addMessage("ai", nextField.prompt);
          speak(nextField.prompt, () => {
            if (activeRef.current) startListening(nextIndex);
          });
        });
      }
    },
    [fields, onFieldFill, onComplete, addMessage, speak]
  );

  // ── Start listening for a field ─────────────────────────────────────────
  const startListening = useCallback(
    (fieldIndex) => {
      if (!isSpeechSupported()) return;

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      recognition.continuous = false;

      recognition.onstart = () => setStatus(AGENT_STATUS.LISTENING);
      recognition.onend = () => {
        if (status !== AGENT_STATUS.SPEAKING) setStatus(AGENT_STATUS.PROCESSING);
      };

      recognition.onresult = (event) => {
        const results = event.results;
        const last = results[results.length - 1];
        const isFinal = last.isFinal;
        const best = last[0].transcript;

        setTranscript(best);

        if (isFinal) {
          setStatus(AGENT_STATUS.PROCESSING);
          addMessage("user", best);
          setTranscript("");
          processInput(best, fieldIndex ?? fieldIndexRef.current);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === "no-speech") {
          const msg = "Koi awaaz nahi mili. Dobara try karein?";
          addMessage("ai", msg);
          speak(msg, () => {
            if (activeRef.current) startListening(fieldIndexRef.current);
          });
        } else if (e.error === "not-allowed") {
          setStatus(AGENT_STATUS.ERROR);
          addMessage("ai", "❌ Mic permission denied hai. Browser settings mein mic allow karein.");
        } else {
          if (activeRef.current) startListening(fieldIndexRef.current);
        }
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (_) {}
    },
    [addMessage, speak, processInput, status]
  );

  // ── Open & Start Agent ──────────────────────────────────────────────────
  const startAgent = useCallback(() => {
    if (status === AGENT_STATUS.UNSUPPORTED) return;
    activeRef.current = true;
    setIsOpen(true);
    setMessages([]);
    setCurrentFieldIndex(0);
    setFilledFields({});
    setTranscript("");

    const greeting =
      "Namaste! Main aapka AI form assistant hun. Main aapko form fill karne mein help karunga. Chalo shuru karte hain!";
    const firstPrompt = fields[0]?.prompt || "";

    addMessage("ai", greeting);
    addMessage("ai", firstPrompt);

    speak(greeting, () => {
      speak(firstPrompt, () => {
        if (activeRef.current) startListening(0);
      });
    });
  }, [status, fields, addMessage, speak, startListening]);

  // ── Stop Agent ──────────────────────────────────────────────────────────
  const stopAgent = useCallback(() => {
    activeRef.current = false;
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
    setStatus(AGENT_STATUS.IDLE);
    setTranscript("");
  }, []);

  // ── Skip current field ──────────────────────────────────────────────────
  const skipField = useCallback(() => {
    const next = fieldIndexRef.current + 1;
    if (next >= fields.length) {
      stopAgent();
      return;
    }
    setCurrentFieldIndex(next);
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    const nextField = fields[next];
    addMessage("ai", `⏭ Field skip kiya. ${nextField.prompt}`);
    speak(nextField.prompt, () => {
      if (activeRef.current) startListening(next);
    });
  }, [fields, addMessage, speak, startListening, stopAgent]);

  // ── Close panel ─────────────────────────────────────────────────────────
  const closePanel = useCallback(() => {
    stopAgent();
    setIsOpen(false);
  }, [stopAgent]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      activeRef.current = false;
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return {
    status,
    isOpen,
    messages,
    transcript,
    currentFieldIndex,
    filledFields,
    totalFields: fields.length,
    currentField: fields[currentFieldIndex],
    isSupported: isSpeechSupported(),
    startAgent,
    stopAgent,
    skipField,
    closePanel,
  };
}
