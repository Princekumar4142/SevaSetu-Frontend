/**
 * HomeVoiceAssistantCard — Interactive AI Voice Booking Component for Home Screen
 * Styled with the same dark glassmorphic, animated audio-wave aesthetic as VoiceFormAgent.
 * Allows users to talk to the AI assistant directly from the home screen and order services by voice!
 */
import { useNavigate } from "react-router-dom";
import { useGlobalVoiceAgent, AGENT_STATUS } from "../hooks/useGlobalVoiceAgent";
import { useLanguage } from "../context/LanguageContext";

// Injected wave animation styles
const VOICE_STYLES = `
  @keyframes hvc-wave {
    0%, 100% { height: 6px; }
    50% { height: 26px; }
  }
  @keyframes hvc-pulse-glow {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.6); }
    50% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(168, 85, 247, 0); }
  }
  @keyframes hvc-pulse-red {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    50% { transform: scale(1.06); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
  }
  .hvc-wave-bar { animation: hvc-wave 0.75s ease-in-out infinite; }
  .hvc-pulse-idle { animation: hvc-pulse-glow 2.5s ease-in-out infinite; }
  .hvc-pulse-active { animation: hvc-pulse-red 1.2s ease-in-out infinite; }
`;

export default function HomeVoiceAssistantCard() {
  const navigate = useNavigate();
  const { lang, langCode, tr } = useLanguage();

  const {
    status,
    transcript,
    pendingBooking,
    startListening,
    stopListening,
    handleUserInput,
    triggerConfirmBooking,
    setIsOpen,
  } = useGlobalVoiceAgent();

  const isListening = status === AGENT_STATUS.LISTENING;
  const isSpeaking = status === AGENT_STATUS.SPEAKING;
  const isProcessing = status === AGENT_STATUS.PROCESSING;

  // Curated quick voice prompt examples
  const quickPrompts = [
    { label: langCode === "en" ? "⚡ Book Electrician" : "⚡ इलेक्ट्रीशियन बुक करो", query: "Book Electrician" },
    { label: langCode === "en" ? "🔧 Fix Water Tap Leak" : "🔧 नल लीकेज ठीक करो", query: "Plumber needed for tap leak" },
    { label: langCode === "en" ? "🧹 Full Home Deep Cleaning" : "🧹 घर की पूरी सफाई", query: "Home deep cleaning needed" },
    { label: langCode === "en" ? "❄️ AC Service & Gas Refill" : "❄️ AC सर्विसिंग करानी है", query: "AC servicing technician" },
    { label: langCode === "en" ? "🚜 Tractor for Farm Ploughing" : "🚜 खेत जुताई के लिए ट्रैक्टर", query: "Tractor for farm" },
    { label: langCode === "en" ? "🪚 Carpenter for Furniture" : "🪚 बढ़ई फर्नीचर रिपेयर", query: "Carpenter needed for furniture" },
  ];

  const handlePromptClick = (query) => {
    handleUserInput(query);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 via-[#100c28] to-slate-950 py-8 px-4 sm:px-8 border-y border-purple-900/40 relative overflow-hidden shadow-2xl">
      <style>{VOICE_STYLES}</style>

      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/80 to-purple-950/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Info & Live Voice Display */}
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{tr("AI Voice Assistant")}</span>
                <span className="text-white/40">•</span>
                <span className="text-amber-300">{lang.flag} {lang.nativeName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2.5">
                <span>{tr("Speak to Order")}</span>
                <span className="text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 px-2.5 py-0.5 rounded-lg shadow">
                  {tr("1-Click Voice Order")}
                </span>
              </h2>

              <p className="text-sm text-slate-300 max-w-2xl">
                {langCode === "en"
                  ? "Simply tap the mic or say your requirement (e.g., 'Book Electrician' or 'Plumber needed'). SevaSetu AI will match verified cooperative workers with fixed fair wages!"
                  : "बस माइक दबाकर अपनी जरूरत बोलें (जैसे 'इलेक्ट्रीशियन बुक करो' या 'नल ठीक कराना है')। SevaSetu AI तुरंत सरकारी प्रमाणित सहकारी कारीगर बुक कर देगा!"}
              </p>

              {/* Live Audio Waves / Status Indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                {isListening ? (
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-1.5 rounded-full">
                    <div className="flex items-end gap-[3px] h-6">
                      {[0, 0.15, 0.3, 0.45, 0.3, 0.15].map((delay, i) => (
                        <div
                          key={i}
                          className="w-[3px] rounded-full bg-red-400 hvc-wave-bar"
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold">{tr("Listening... Speak now")}</span>
                  </div>
                ) : isSpeaking ? (
                  <div className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 px-4 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px] text-indigo-400 animate-pulse">volume_up</span>
                    <span className="text-xs font-bold">{tr("ai_speaking")}</span>
                  </div>
                ) : isProcessing ? (
                  <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 text-purple-200 px-4 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px] text-purple-300 animate-spin">autorenew</span>
                    <span className="text-xs font-bold">{tr("Processing your request...")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                    <span>{tr("Ready to listen in 8 Indian Languages")}</span>
                  </div>
                )}

                {/* Live Transcript Bubble */}
                {transcript && (
                  <div className="text-xs font-medium text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 italic">
                    "{transcript}"
                  </div>
                )}
              </div>
            </div>

            {/* Right: Big Interactive Glowing Microphone Button */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleMicClick}
                className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group border-4 border-white/20 shadow-2xl ${
                  isListening
                    ? "bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 hvc-pulse-active"
                    : "bg-gradient-to-tr from-purple-600 via-indigo-600 to-brand-purple hvc-pulse-idle hover:scale-105"
                }`}
                aria-label={tr("Tap mic & speak")}
              >
                <span className="material-symbols-outlined text-white text-[42px] group-hover:scale-110 transition-transform">
                  mic
                </span>
                <span className="text-[10px] font-black text-white/90 uppercase tracking-wider">
                  {isListening ? tr("Stop") : tr("Speak")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  if (!isListening) startListening();
                }}
                className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>{tr("Open Assistant Panel")}</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Pending Voice Booking Card (Directly inside Home Card!) */}
          {pendingBooking && (
            <div className="mt-6 p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white animate-in fade-in slide-in-from-top-3 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-amber-300 text-2xl">
                    <span className="material-symbols-outlined">{pendingBooking.service?.icon || "handyman"}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{tr(pendingBooking.service?.name)}</h4>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                        {tr("100% Fixed Pricing")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                      <span>🕒 {pendingBooking.slot?.date}, {pendingBooking.slot?.time}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold text-sm">₹{pendingBooking.price}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => triggerConfirmBooking(pendingBooking)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>{tr("Confirm & Book")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (pendingBooking.service?.category) {
                        navigate(`/customer/services/${pendingBooking.service.category}`);
                      } else {
                        navigate("/customer/services/electricians");
                      }
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{tr("View Options")}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Voice Prompt Suggestions */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">tips_and_updates</span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                {tr("Try saying or tap to book:")}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quickPrompts.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePromptClick(item.query)}
                  className="shrink-0 bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 hover:text-white border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
