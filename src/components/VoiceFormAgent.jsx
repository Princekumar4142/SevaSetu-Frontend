/**
 * VoiceFormAgent — Mobile-first Bottom Sheet AI Voice Form Assistant
 * Step-by-step guided: AI bolega kya bharna hai → user bolta hai → field fill hota hai
 * Multilingual: reads selected language from LanguageContext
 */
import { useEffect, useRef } from "react";
import { useVoiceFormAgent, AGENT_STATUS } from "../hooks/useVoiceFormAgent";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

// ── Injected CSS ─────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes vfa-slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes vfa-fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vfa-wave {
    0%, 100% { height: 6px;  } 
    50%       { height: 24px; }
  }
  @keyframes vfa-ping-purple {
    0%   { box-shadow: 0 0 0 0   rgba(139,92,246,0.55); }
    70%  { box-shadow: 0 0 0 16px rgba(139,92,246,0);   }
    100% { box-shadow: 0 0 0 0   rgba(139,92,246,0);    }
  }
  @keyframes vfa-ping-red {
    0%   { box-shadow: 0 0 0 0   rgba(239,68,68,0.6); }
    70%  { box-shadow: 0 0 0 18px rgba(239,68,68,0);  }
    100% { box-shadow: 0 0 0 0   rgba(239,68,68,0);   }
  }
  @keyframes vfa-spin { to { transform: rotate(360deg); } }
  @keyframes vfa-bounce-dot {
    0%,80%,100% { transform: scale(0.6); opacity:0.4; }
    40%         { transform: scale(1.1); opacity:1;   }
  }

  .vfa-panel-enter   { animation: vfa-slide-up 0.38s cubic-bezier(0.16,1,0.3,1) both; }
  .vfa-msg-enter     { animation: vfa-fade-in  0.25s ease-out both; }
  .vfa-wave-bar      { animation: vfa-wave 0.75s ease-in-out infinite; }
  .vfa-btn-idle      { animation: vfa-ping-purple 2.2s ease-in-out infinite; }
  .vfa-btn-listening { animation: vfa-ping-red    1s    ease-in-out infinite; }
  .vfa-spin          { animation: vfa-spin 1.4s linear infinite; }
  .vfa-dot           { animation: vfa-bounce-dot 1.2s ease-in-out infinite; }
  .vfa-dot:nth-child(2) { animation-delay: 0.2s; }
  .vfa-dot:nth-child(3) { animation-delay: 0.4s; }

  .vfa-scroll::-webkit-scrollbar { width: 3px; }
  .vfa-scroll::-webkit-scrollbar-track { background: transparent; }
  .vfa-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius:99px; }
`;

// ── Step dots (mini progress) ────────────────────────────────────────────────
function StepDots({ total, current, filled }) {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < Object.keys(filled).length;
        const isCurrent = i === current;
        return (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              isFilled
                ? "w-2 h-2 bg-emerald-400"
                : isCurrent
                ? "w-5 h-2 bg-white"
                : "w-2 h-2 bg-white/25"
            }`}
          />
        );
      })}
    </div>
  );
}

// ── Wave bars (listening) ────────────────────────────────────────────────────
function WaveBars({ color = "bg-red-400" }) {
  return (
    <div className="flex items-end gap-[3px] h-7">
      {[0, 0.12, 0.24, 0.36, 0.48, 0.36, 0.24].map((delay, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full vfa-wave-bar ${color}`}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

// ── Thinking dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-white/10 w-fit">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-purple-300 vfa-dot" />
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function VoiceFormAgent({ fields, onFieldFill, onComplete }) {
  const { lang, tr } = useLanguage();
  const agent = useVoiceFormAgent({
    fields,
    onFieldFill,
    onComplete,
    speechLang: lang.speechLang,
    greeting: tr("ai_greeting"),
    msgDone: tr("ai_done"),
    msgSkipPrefix: tr("ai_skip"),
  });
  const chatEndRef = useRef(null);
  const isListening  = agent.status === AGENT_STATUS.LISTENING;
  const isSpeaking   = agent.status === AGENT_STATUS.SPEAKING;
  const isProcessing = agent.status === AGENT_STATUS.PROCESSING;
  const isDone  = agent.status === AGENT_STATUS.DONE;
  const isIdle  = agent.status === AGENT_STATUS.IDLE;

  const filledCount = Object.keys(agent.filledFields).length;
  const progress = agent.totalFields > 0
    ? Math.round((filledCount / agent.totalFields) * 100)
    : 0;

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agent.messages, agent.transcript]);

  if (!agent.isSupported) return null;

  // ── Floating Trigger Button (when panel is closed) ──────────────────────
  if (!agent.isOpen) {
    return (
      <>
        <style>{STYLES}</style>
        <button
          type="button"
          onClick={agent.startAgent}
          className={`fixed bottom-5 right-5 z-50 w-[58px] h-[58px] rounded-full
            bg-gradient-to-br from-purple-600 to-indigo-700
            text-white shadow-2xl flex flex-col items-center justify-center gap-0.5
            vfa-btn-idle hover:scale-110 active:scale-95 transition-transform cursor-pointer group`}
          aria-label={tr("ai_tooltip")}
        >
          <span className="material-symbols-outlined text-[24px] fill">mic</span>
          <span className="text-[8px] font-black tracking-tight leading-none">AI</span>
          <span className="pointer-events-none absolute -top-11 right-0 bg-slate-900 text-white
            text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
            {tr("ai_tooltip")}
          </span>
        </button>
      </>
    );
  }

  // ── Full Bottom Sheet Panel ──────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>

      {/* Backdrop (mobile) */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
        onClick={agent.closePanel}
      />

      {/* Panel */}
      <div className={`
        fixed z-50 vfa-panel-enter
        /* Mobile: full-width bottom sheet */
        bottom-0 left-0 right-0
        /* Desktop: floating panel bottom-right */
        sm:bottom-5 sm:right-5 sm:left-auto sm:w-[380px] sm:rounded-3xl
        rounded-t-3xl overflow-hidden
        shadow-2xl
      `}
        style={{ background: "rgba(12,12,26,0.97)", backdropFilter: "blur(24px)" }}
      >

        {/* ── Drag Handle (mobile only) ── */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* ── Header ── */}
        <div className="relative overflow-hidden px-4 pt-3 pb-4"
          style={{ background: "linear-gradient(135deg,#5b21b6 0%,#4f46e5 100%)" }}>
          {/* decorative blobs */}
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />

          <div className="relative">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {/* Mic orb */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isListening ? "bg-red-500" : isSpeaking ? "bg-emerald-500" : "bg-white/20"
                } transition-colors`}>
                  <span className={`material-symbols-outlined text-white text-[20px] fill ${
                    isProcessing ? "vfa-spin" : ""
                  }`}>
                    {isListening ? "graphic_eq" : isSpeaking ? "record_voice_over"
                      : isProcessing ? "refresh" : isDone ? "check_circle" : "smart_toy"}
                  </span>
                </div>
                <div>
                  <p className="text-white font-black text-sm leading-none">SevaSetu AI</p>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    {isListening ? `🔴 ${tr("ai_listening")}` : isSpeaking ? `🟢 ${tr("ai_speaking")}`
                      : isProcessing ? "🔵..." : isDone ? "✅" : lang.nativeName}
                  </p>
                </div>
              </div>
              {/* Language selector + Close */}
              <div className="flex items-center gap-1.5">
                <div className="scale-90 origin-right"><LanguageSelector /></div>
                <button
                  type="button"
                  onClick={agent.closePanel}
                  className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/30 text-white
                    flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Current field prompt (BIG) */}
            {agent.currentField && !isDone && (
              <div className="bg-white/10 rounded-2xl px-3.5 py-3 mb-3 border border-white/10">
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1">
                  {tr("ai_fillNow")} ({agent.currentFieldIndex + 1}/{agent.totalFields})
                </p>
                <p className="text-white font-bold text-sm leading-snug">
                  {agent.currentField.prompt}
                </p>
              </div>
            )}

            {/* Progress bar + steps */}
            <div className="space-y-2">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <StepDots
                  total={agent.totalFields}
                  current={agent.currentFieldIndex}
                  filled={agent.filledFields}
                />
                <span className="text-[10px] text-white/50 font-semibold shrink-0 ml-2">
                  {filledCount}/{agent.totalFields} {tr("ai_fieldsFilled")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Chat Messages ── */}
        <div className="h-[200px] sm:h-[220px] overflow-y-auto px-4 py-3 space-y-2.5 vfa-scroll">
          {agent.messages.map((msg) => (
            <div
              key={msg.id}
              className={`vfa-msg-enter flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-full bg-purple-600/60 flex items-center justify-center shrink-0 mr-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-white text-[13px] fill">smart_toy</span>
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm"
                  : "bg-white/10 text-white/90 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Processing dots */}
          {isProcessing && (
            <div className="vfa-msg-enter flex justify-start">
              <div className="w-6 h-6 rounded-full bg-purple-600/60 flex items-center justify-center shrink-0 mr-1.5 mt-0.5">
                <span className="material-symbols-outlined text-white text-[13px] fill">smart_toy</span>
              </div>
              <ThinkingDots />
            </div>
          )}

          {/* Live interim transcript */}
          {agent.transcript && (
            <div className="vfa-msg-enter flex justify-end">
              <div className="max-w-[80%] rounded-2xl px-3 py-2 text-xs italic
                bg-purple-600/30 text-purple-200 border border-purple-500/20 rounded-br-sm">
                🎙️ {agent.transcript}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ── Listening Waveform Banner ── */}
        {isListening && (
          <div className="mx-4 mb-2 rounded-2xl bg-red-500/15 border border-red-500/20
            flex items-center justify-center gap-4 py-2.5 px-4">
            <WaveBars color="bg-red-400" />
            <p className="text-red-300 text-xs font-bold">{tr("ai_listening")}</p>
            <WaveBars color="bg-red-400" />
          </div>
        )}

        {/* ── Speaking indicator ── */}
        {isSpeaking && (
          <div className="mx-4 mb-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/20
            flex items-center justify-center gap-3 py-2 px-4">
            <WaveBars color="bg-emerald-400" />
            <p className="text-emerald-300 text-xs font-bold">{tr("ai_speaking")}</p>
          </div>
        )}

        {/* ── Bottom Action Bar ── */}
        <div className="px-4 pb-5 pt-2 space-y-2">
          {isDone ? (
            <button
              type="button"
              onClick={agent.closePanel}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500
                text-white font-black text-sm flex items-center justify-center gap-2
                shadow-lg shadow-emerald-500/30 hover:opacity-90 active:scale-[0.98]
                transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              {tr("ai_close_done")}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Main mic / start button */}
              <button
                type="button"
                onClick={isIdle ? agent.startAgent : agent.stopAgent}
                className={`flex-1 py-3.5 rounded-2xl font-black text-sm text-white
                  flex items-center justify-center gap-2 transition-all
                  active:scale-[0.97] cursor-pointer shadow-lg ${
                  isListening
                    ? "bg-red-600 shadow-red-500/30 vfa-btn-listening"
                    : isIdle
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/30 vfa-btn-idle"
                    : "bg-purple-800 shadow-purple-500/20"
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] fill ${isProcessing ? "vfa-spin" : ""}`}>
                  {isListening ? "stop_circle" : "mic"}
                </span>
                {isIdle ? tr("ai_start") : isListening ? tr("ai_stop") : isSpeaking ? tr("ai_speaking") : "..."}
              </button>

              {/* Skip Field */}
              {!isIdle && !isDone && (
                <button
                  type="button"
                  onClick={agent.skipField}
                  className="h-[52px] px-4 rounded-2xl bg-white/10 hover:bg-white/20
                    text-white/80 text-xs font-bold flex flex-col items-center justify-center
                    gap-0.5 transition-colors cursor-pointer border border-white/10 shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">skip_next</span>
                  <span className="text-[9px] font-bold text-white/50">Skip</span>
                </button>
              )}
            </div>
          )}

          <p className="text-center text-[10px] text-white/25 font-medium">
            {tr("ai_privacy")}
          </p>
        </div>
      </div>
    </>
  );
}
