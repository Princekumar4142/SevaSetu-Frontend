/**
 * GlobalVoiceAssistant — Floating Site-wide Voice Booking & AI Assistant
 * Provides voice-activated service ordering across the entire SevaSetu platform in 8 languages.
 */
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalVoiceAgent, AGENT_STATUS } from "../hooks/useGlobalVoiceAgent";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function GlobalVoiceAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, langCode, tr } = useLanguage();

  const {
    status,
    isOpen,
    setIsOpen,
    messages,
    transcript,
    pendingBooking,
    servicesCatalog,
    startListening,
    stopListening,
    handleUserInput,
    selectServiceChip,
    triggerConfirmBooking,
  } = useGlobalVoiceAgent();

  const [textInput, setTextInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, transcript, isOpen]);

  // Is listening or speaking
  const isListening = status === AGENT_STATUS.LISTENING;
  const isSpeaking = status === AGENT_STATUS.SPEAKING;

  // Listen for global custom event 'open-voice-assistant'
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => {
        startListening();
      }, 400);
    };
    window.addEventListener("open-voice-assistant", handleOpenEvent);
    return () => window.removeEventListener("open-voice-assistant", handleOpenEvent);
  }, [setIsOpen, startListening]);

  const handleSendText = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    handleUserInput(textInput.trim());
    setTextInput("");
  };

  const isFormPage =
    location.pathname === "/register/customer" ||
    location.pathname === "/register/worker";

  return (
    <>
      {/* ── Floating Launcher Trigger Button ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Pulsing Hint Tooltip */}
          <div
            onClick={() => {
              setIsOpen(true);
              startListening();
            }}
            className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl shadow-xl border border-white/10 cursor-pointer hover:bg-slate-900 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold tracking-wide">
              {langCode === "en" ? "🎤 Voice Booking" : "🎤 बोलकर बुक करें"}
            </span>
            <span className="text-[10px] text-white/50 bg-white/10 px-1.5 py-0.5 rounded font-mono">
              AI
            </span>
          </div>

          {/* Main Floating Round Button */}
          <button
            id="voice-assistant-launcher"
            type="button"
            onClick={() => {
              setIsOpen(true);
              startListening();
            }}
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-indigo-600 to-brand-purple text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group border-2 border-white/30"
            title={tr("Speak to Book Service")}
            aria-label="Open Voice Booking Assistant"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute -inset-1 rounded-full bg-indigo-500/30 animate-pulse pointer-events-none" />
            <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform">
              mic
            </span>
            {/* Unread dot */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </button>
        </div>
      )}

      {/* ── Voice Assistant Modal / Chat Panel ── */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[85vh] h-[640px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-primary p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-amber-300 text-[22px]">
                  smart_toy
                </span>
                {isListening && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight">
                    {tr("AI Voice Assistant")}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-white/70 flex items-center gap-1">
                  <span>{lang.flag} {lang.label}</span>
                  <span>•</span>
                  <span>{tr("Voice Booking")}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="scale-90 origin-right text-slate-800">
                <LanguageSelector />
              </div>
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setIsOpen(false);
                }}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                title={tr("Close")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* If on registration page, show shortcut hint */}
          {isFormPage && (
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 text-[11px] text-amber-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-600 text-[16px]">info</span>
                <span>Registration page detected: You can also speak your details!</span>
              </div>
            </div>
          )}

          {/* Visualizer Status Bar */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {isListening ? (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-3.5 bg-red-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-5 bg-red-600 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="text-xs font-semibold text-red-600 ml-1">
                    {langCode === "en" ? "Listening..." : "सुन रहा हूँ... बोलिए"}
                  </span>
                </div>
              ) : isSpeaking ? (
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-indigo-600 text-[18px] animate-pulse">
                    volume_up
                  </span>
                  <span className="text-xs font-semibold text-indigo-700">
                    {langCode === "en" ? "AI is speaking..." : "AI बोल रहा है..."}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="material-symbols-outlined text-[16px]">mic_none</span>
                  <span className="text-xs font-medium">
                    {langCode === "en" ? "Click mic to speak" : "माइक दबाकर बोलें"}
                  </span>
                </div>
              )}
            </div>

            {/* Language Pill */}
            <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-xs">
              {lang.nativeName}
            </span>
          </div>

          {/* Live Transcript Banner */}
          {transcript && (
            <div className="bg-indigo-50/90 border-b border-indigo-100 px-4 py-2 text-xs text-indigo-950 font-medium flex items-center gap-2 shrink-0 animate-in fade-in">
              <span className="material-symbols-outlined text-indigo-600 text-[16px]">hearing</span>
              <span className="italic">"{transcript}"</span>
            </div>
          )}

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAi = msg.role === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm ${
                      isAi
                        ? "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
                        : "bg-gradient-to-r from-primary to-indigo-700 text-white rounded-tr-sm"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                    {/* Booking Preview Card inside AI message */}
                    {msg.bookingPreview && (
                      <div className="mt-3 p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-slate-800">
                        <div className="flex items-center justify-between pb-2 border-b border-indigo-100 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">
                                {msg.bookingPreview.service.icon}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-xs text-slate-900">
                                {msg.bookingPreview.service.name}
                              </p>
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                                100% Fair Cooperative Wage
                              </span>
                            </div>
                          </div>
                          <span className="text-base font-black text-primary">
                            ₹{msg.bookingPreview.price}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-1 mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                            <span>{msg.bookingPreview.slot.date}, {msg.bookingPreview.slot.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-slate-400">home</span>
                            <span>{msg.bookingPreview.address.line1}, {msg.bookingPreview.address.city}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => triggerConfirmBooking(msg.bookingPreview)}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            {tr("Confirm & Book")}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Confirmed Booking Success Card */}
                    {msg.confirmedBooking && (
                      <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                            task_alt
                          </span>
                          <span className="font-black text-xs">
                            {tr("Booking Confirmed!")}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 mb-2">
                          Order Number: <strong>#{msg.confirmedBooking.bookingNumber}</strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            navigate("/customer/bookings");
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">list_alt</span>
                          {tr("View My Bookings")}
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 px-1 mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-white border-t border-slate-100 p-2.5 overflow-x-auto flex items-center gap-1.5 shrink-0 no-scrollbar">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider shrink-0 mr-1">
              Quick:
            </span>
            {servicesCatalog.slice(0, 5).map((svc) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => selectServiceChip(svc.id)}
                className="shrink-0 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/70 text-slate-700 text-xs px-2.5 py-1.5 rounded-full transition-all flex items-center gap-1 active:scale-95 font-medium"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {svc.icon}
                </span>
                <span>{tr(svc.trade)}</span>
              </button>
            ))}
          </div>

          {/* Input & Mic Control Bar */}
          <div className="bg-white border-t border-slate-200 p-3 shrink-0">
            <form onSubmit={handleSendText} className="flex items-center gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={tr("Type your request here or click mic to speak...")}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
              />

              {/* Send Button if text typed */}
              {textInput.trim() ? (
                <button
                  type="submit"
                  className="w-11 h-11 rounded-2xl bg-primary hover:bg-primary/90 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              ) : (
                /* Big Microphone Action Button */
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                      : "bg-gradient-to-r from-primary to-indigo-700 hover:from-primary/90 hover:to-indigo-800 text-white"
                  }`}
                  title={isListening ? tr("⬛ Stop") : tr("Tap mic & speak")}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isListening ? "stop" : "mic"}
                  </span>
                </button>
              )}
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>🔒 100% Private in-browser voice recognition</span>
              <span>Say "Haan book kar do" to confirm</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
