import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

export default function DownloadApp() {
  const { ref, isRevealed } = useScrollReveal();
  const { tr } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px]">
        <div className={`bg-gradient-to-br from-primary via-primary-container to-brand-purple rounded-3xl md:rounded-[2rem] p-8 md:p-16 relative overflow-hidden ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-10">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="material-symbols-outlined text-secondary text-[18px] fill">phone_iphone</span>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{tr("Coming Soon")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                {tr("Get the SevaSetu App")}
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-lg mb-8">
                {tr("Book services on-the-go, track your professional in real-time, and manage everything from your phone. Available soon on Android & iOS.")}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                {/* Play Store button */}
                <button
                  type="button"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-white text-[28px]">play_arrow</span>
                  <div className="text-left">
                    <div className="text-[10px] text-white/60 uppercase tracking-wider">{tr("Get it on")}</div>
                    <div className="text-sm font-bold text-white">{tr("Google Play")}</div>
                  </div>
                </button>

                {/* App Store button */}
                <button
                  type="button"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-white text-[28px]">phone_iphone</span>
                  <div className="text-left">
                    <div className="text-[10px] text-white/60 uppercase tracking-wider">{tr("Download on")}</div>
                    <div className="text-sm font-bold text-white">{tr("App Store")}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="shrink-0 hidden md:flex items-center justify-center">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-56 h-[420px] bg-gradient-to-b from-white/10 to-white/5 rounded-[2.5rem] border-2 border-white/20 p-3 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-b from-brand-purple/30 to-primary/30 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden">
                    {/* Notch */}
                    <div className="w-20 h-5 bg-black/30 rounded-full mb-8" />
                    {/* App content mockup */}
                    <span className="material-symbols-outlined text-white text-[48px] fill mb-4">handshake</span>
                    <span className="text-white font-bold text-lg">SevaSetu</span>
                    <span className="text-white/50 text-xs mt-1">Launching Soon</span>
                    {/* Fake UI lines */}
                    <div className="mt-6 space-y-2 w-3/4">
                      <div className="h-2 rounded-full bg-white/10 w-full" />
                      <div className="h-2 rounded-full bg-white/10 w-4/5" />
                      <div className="h-2 rounded-full bg-white/10 w-3/5" />
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-purple/20 blur-3xl -z-10 scale-150" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
