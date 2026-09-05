/**
 * VoiceFormAgent — Floating AI Mic button + Slide-up conversation panel
 * Reusable on any form page. Pass field configs + form setter.
 */
import { useEffect, useRef } from "react";
import { useVoiceFormAgent, AGENT_STATUS } from "../hooks/useVoiceFormAgent";

// ── Status Styling Map ───────────────────────────────────────────────────────
const STATUS_META = {
  [AGENT_STATUS.IDLE]: { color: "bg-gradient-to-br from-purple-600 to-indigo-600", icon: "mic", pulse: "animate-pulse-slow", label: "AI Assistant" },
  [AGENT_STATUS.LISTENING]: { color: "bg-gradient-to-br from-red-500 to-pink-600", icon: "graphic_eq", pulse: "animate-pulse-fast", label: "Sun raha hun..." },
  [AGENT_STATUS.PROCESSING]: { color: "bg-gradient-to-br from-blue-500 to-cyan-500", icon: "psychology", pulse: "animate-spin-slow", label: "Samajh raha hun..." },
  [AGENT_STATUS.SPEAKING]: { color: "bg-gradient-to-br from-emerald-500 to-teal-500", icon: "record_voice_over", pulse: "", label: "Bol raha hun..." },
  [AGENT_STATUS.DONE]: { color: "bg-gradient-to-br from-emerald-500 to-green-600", icon: "check_circle", pulse: "", label: "Ho gaya!" },
  [AGENT_STATUS.ERROR]: { color: "bg-gradient-to-br from-red-700 to-red-500", icon: "error", pulse: "", label: "Error" },
  [AGENT_STATUS.UNSUPPORTED]: { color: "bg-gray-400", icon: "mic_off", pulse: "", label: "Not Supported" },
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function VoiceFormAgent({ fields, onFieldFill, onComplete, formType = "customer" }) {
  const agent = useVoiceFormAgent({ fields, onFieldFill, onComplete });
  const chatEndRef = useRef(null);
  const meta = STATUS_META[agent.status] || STATUS_META[AGENT_STATUS.IDLE];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agent.messages, agent.transcript]);

  if (!agent.isSupported) return null;

  const progress = agent.totalFields > 0
    ? Math.round((Object.keys(agent.filledFields).length / agent.totalFields) * 100)
    : 0;

  return (
    <>
      {/* ── CSS Animations (injected once) ── */}
      <style>{`
        @keyframes pulse-slow { 0%, 100% { box-shadow: 0 0 0 0 rgba(139,92,246,0.5); } 50% { box-shadow: 0 0 0 16px rgba(139,92,246,0); } }
        @keyframes pulse-fast { 0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); } 50% { box-shadow: 0 0 0 18px rgba(239,68,68,0); } }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes slide-up { from { transform: translateY(100%) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wave { 0%, 100% { height: 8px; } 50% { height: 22px; } }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 1s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        .voice-panel-enter { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .voice-msg-enter { animation: fade-in 0.3s ease-out forwards; }
        .voice-wave-bar { animation: wave 0.8s ease-in-out infinite; }
      `}</style>

      {/* ── Floating AI Mic Button ── */}
      {!agent.isOpen && (
        <button
          type="button"
          onClick={agent.startAgent}
          className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full ${meta.color} ${meta.pulse} text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group`}
          title="AI Voice Assistant — बोलकर form भरें"
        >
          <span className="material-symbols-outlined text-[28px] fill">mic</span>
          {/* Tooltip */}
          <span className="absolute -top-12 right-0 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            🎤 बोलकर Form भरें — AI Assistant
          </span>
        </button>
      )}

      {/* ── Slide-up AI Panel ── */}
      {agent.isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-32px)] voice-panel-enter">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20" style={{ background: "rgba(15,15,30,0.92)", backdropFilter: "blur(24px)" }}>

            {/* ── Panel Header ── */}
            <div className={`px-5 py-4 ${meta.color} relative overflow-hidden`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-white/20 -translate-x-6 -translate-y-6" />
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/10 translate-x-12 translate-y-12" />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[22px] fill">{meta.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm">SevaSetu AI Agent</h3>
                    <p className="text-white/70 text-[11px] font-medium">{meta.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Skip Button */}
                  {(agent.status === AGENT_STATUS.LISTENING || agent.status === AGENT_STATUS.SPEAKING) && (
                    <button
                      type="button"
                      onClick={agent.skipField}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Skip this field"
                    >
                      <span className="material-symbols-outlined text-[18px]">skip_next</span>
                    </button>
                  )}
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={agent.closePanel}
                    className="w-8 h-8 rounded-lg bg-white/20 hover:bg-red-500/60 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Close"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 relative">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/60 mt-1 font-semibold">
                  {Object.keys(agent.filledFields).length}/{agent.totalFields} fields filled • {progress}%
                </p>
              </div>
            </div>

            {/* ── Chat Messages ── */}
            <div className="h-[280px] overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {agent.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`voice-msg-enter flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-sm"
                        : "bg-white/10 text-white/90 rounded-bl-sm border border-white/5"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <span className="text-[10px] text-purple-400 font-bold block mb-1">🤖 AI Agent</span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Live transcript */}
              {agent.transcript && (
                <div className="voice-msg-enter flex justify-end">
                  <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs bg-purple-600/40 text-purple-200 rounded-br-sm border border-purple-500/30 italic">
                    🎙️ {agent.transcript}...
                  </div>
                </div>
              )}

              {/* Listening animation */}
              {agent.status === AGENT_STATUS.LISTENING && !agent.transcript && (
                <div className="flex justify-center py-2">
                  <div className="flex items-end gap-1 h-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-400 rounded-full voice-wave-bar"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* ── Bottom Controls ── */}
            <div className="px-4 py-3 border-t border-white/10">
              {agent.currentField && agent.status !== AGENT_STATUS.DONE && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[14px] text-purple-400">edit</span>
                  <span className="text-[11px] text-white/50 font-medium">
                    Current: <span className="text-purple-300 font-bold">{agent.currentField.label}</span>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {agent.status === AGENT_STATUS.DONE ? (
                  <button
                    type="button"
                    onClick={agent.closePanel}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    Done — Close Panel
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={agent.status === AGENT_STATUS.IDLE ? agent.startAgent : agent.stopAgent}
                      className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        agent.status === AGENT_STATUS.IDLE
                          ? "bg-purple-600 hover:bg-purple-500"
                          : "bg-red-600 hover:bg-red-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {agent.status === AGENT_STATUS.IDLE ? "mic" : "stop"}
                      </span>
                      {agent.status === AGENT_STATUS.IDLE ? "Start Voice Fill" : "Stop"}
                    </button>
                    <button
                      type="button"
                      onClick={agent.skipField}
                      className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 text-xs font-bold transition-colors cursor-pointer"
                      title="Skip Field"
                    >
                      <span className="material-symbols-outlined text-[16px]">skip_next</span>
                    </button>
                  </>
                )}
              </div>

              <p className="text-[10px] text-white/30 text-center mt-2">
                🔒 Voice data is processed locally in your browser
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
