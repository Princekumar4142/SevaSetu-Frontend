import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import sevaSetuLogo from "../assets/sevasetu_logo.jpg";

export default function InstallAppBanner() {
  const { langCode } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // 1. Check if running inside installed App (PWA Standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    const hasInstalledStorage =
      localStorage.getItem("sevasetu_pwa_installed_v2") === "true";

    if (isStandalone || hasInstalledStorage) {
      setIsInstalled(true);
      return;
    }

    // 2. Check if user dismissed it recently
    const dismissedUntil = localStorage.getItem("sevasetu_pwa_dismissed_until_v2");
    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return;
    }

    // 3. Listen for browser native beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
      localStorage.setItem("sevasetu_pwa_installed_v2", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Show floating banner after 1.2 seconds if not installed and not dismissed
    const timer = setTimeout(() => {
      const standaloneNow =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;
      const isDismissedNow =
        Number(localStorage.getItem("sevasetu_pwa_dismissed_until_v2") || 0) > Date.now();

      if (!standaloneNow && !isDismissedNow) {
        setIsVisible(true);
      }
    }, 1200);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for 3 days
    const nextTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem("sevasetu_pwa_dismissed_until_v2", nextTime.toString());
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          setIsVisible(false);
          setIsInstalled(true);
          setDeferredPrompt(null);
          localStorage.setItem("sevasetu_pwa_installed_v2", "true");
        }
      } catch (err) {
        console.warn("Prompt error:", err);
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  const handleGuideConfirm = () => {
    setShowGuideModal(false);
    setIsVisible(false);
    localStorage.setItem("sevasetu_pwa_installed_v2", "true");
  };

  if (isInstalled || !isVisible) {
    return null;
  }

  // Display domain like in screenshot "app.eraser.io"
  const hostDisplay =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "sevasetu.app"
        : window.location.host
      : "sevasetu.app";

  return (
    <>
      {/* ── Floating App Install Banner (Matching Mobile Chrome / Eraser UI) ── */}
      <div
        className="fixed top-3 left-3 right-3 sm:left-auto sm:right-5 sm:w-[380px] z-[99999] transition-all duration-300 animate-in fade-in slide-in-from-top-4"
        role="region"
        aria-label="Install SevaSetu App"
      >
        <div className="bg-[#1e232d]/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.65)] rounded-2xl px-3.5 py-3 text-white flex items-center justify-between gap-3">
          {/* Left: App Logo & Titles */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/15 overflow-hidden">
              <img
                src={sevaSetuLogo}
                alt="SevaSetu App"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[15px] sm:text-base font-semibold text-white tracking-tight leading-tight truncate">
                Install SevaSetu
              </h4>
              <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-tight truncate mt-0.5">
                {hostDisplay}
              </p>
            </div>
          </div>

          {/* Right: Install Action & Close Button */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="text-[#939aff] hover:text-[#b4baff] active:scale-95 font-semibold text-[15px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              Install
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              title="Close"
              aria-label="Close install notification"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Direct Guide Modal (Fallback for iOS or unsupported direct prompt) ── */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[100000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e232d] text-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-white/15">
                  <img
                    src={sevaSetuLogo}
                    alt="SevaSetu Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">
                    Install SevaSetu
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {hostDisplay}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#939aff] shrink-0 text-lg mt-0.5">
                  phone_android
                </span>
                <div>
                  <strong className="block text-white font-bold mb-0.5">
                    Android (Chrome / Edge)
                  </strong>
                  Tap the top-right browser menu <span className="font-bold font-mono">⋮</span> and select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#939aff] shrink-0 text-lg mt-0.5">
                  ios_share
                </span>
                <div>
                  <strong className="block text-white font-bold mb-0.5">
                    iPhone / iPad (Safari)
                  </strong>
                  Tap the <span className="font-bold">Share</span> button <span className="material-symbols-outlined text-[13px] align-middle">ios_share</span> and select <strong>"Add to Home Screen"</strong>.
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={handleGuideConfirm}
                className="w-full py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] active:scale-[0.98] text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/25"
              >
                {langCode === "hi" ? "समझ गया!" : "Got it!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
