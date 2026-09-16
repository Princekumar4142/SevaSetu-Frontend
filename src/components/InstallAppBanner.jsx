import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function InstallAppBanner() {
  const { langCode, tr } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // 1. Check if already installed / running in standalone PWA mode OR previously installed
    const hasInstalledStorage = localStorage.getItem("sevasetu_app_already_installed") === "true";
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (hasInstalledStorage || isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check navigator.getInstalledRelatedApps if available in Chromium
    if ("getInstalledRelatedApps" in navigator) {
      navigator.getInstalledRelatedApps()
        .then((apps) => {
          if (apps && apps.length > 0) {
            setIsInstalled(true);
            localStorage.setItem("sevasetu_app_already_installed", "true");
          }
        })
        .catch(() => {});
    }

    // 2. Check if user dismissed it previously
    const dismissedUntil = localStorage.getItem("sevasetu_install_banner_dismissed_until");
    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return;
    }

    // 3. Listen for native browser PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      // If already installed, don't show
      if (localStorage.getItem("sevasetu_app_already_installed") === "true") {
        return;
      }
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
      localStorage.setItem("sevasetu_app_already_installed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Show banner after 1.5s if not installed and not dismissed
    const timer = setTimeout(() => {
      const alreadyInstalled =
        localStorage.getItem("sevasetu_app_already_installed") === "true" ||
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      const isDismissed =
        Number(localStorage.getItem("sevasetu_install_banner_dismissed_until") || 0) > Date.now();

      if (!alreadyInstalled && !isDismissed) {
        setIsVisible(true);
      }
    }, 1500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for 7 days so it doesn't bother the user on every page load
    const nextWeek = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("sevasetu_install_banner_dismissed_until", nextWeek.toString());
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
          localStorage.setItem("sevasetu_app_already_installed", "true");
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
    localStorage.setItem("sevasetu_app_already_installed", "true");
  };

  if (isInstalled || !isVisible) {
    return null;
  }

  const titleText =
    langCode === "en" ? "Install SevaSetu App" : "SevaSetu App इंस्टॉल करें";
  const descText =
    langCode === "en"
      ? "Fast 1-click booking, live worker tracking & offline access!"
      : "तेज बुकिंग, लाइव कारीगर ट्रैकिंग और सीधे होम स्क्रीन से चलाएं!";
  const btnText = langCode === "en" ? "Install App" : "इंस्टॉल करें";

  return (
    <>
      {/* ── Top Notification Banner (Slides in smoothly from the top) ── */}
      <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-3 py-2.5 sm:px-6 sm:py-3 shadow-xl border-b border-indigo-500/30 backdrop-blur-md animate-in slide-in-from-top duration-300">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-3">
          {/* Left: App Logo & Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0 shadow-sm">
              <Logo size={28} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-black tracking-tight text-white truncate">
                  {titleText}
                </h4>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-300 truncate font-medium">
                {descText}
              </p>
            </div>
          </div>

          {/* Right: Install & Dismiss Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer border border-emerald-400/30"
            >
              <span className="material-symbols-outlined text-[15px] sm:text-[17px]">
                install_mobile
              </span>
              <span>{btnText}</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Dismiss"
              aria-label="Dismiss banner"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                close
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Direct Guide Modal (for iOS or browsers requiring manual install) ── */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111726] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-800/60">
                  <span className="material-symbols-outlined text-2xl">
                    install_mobile
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {langCode === "en" ? "Install SevaSetu" : "SevaSetu ऐप इंस्टॉल करें"}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {langCode === "en" ? "Fast & works offline" : "फास्ट और बिना रुकावट"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 shrink-0 text-lg mt-0.5">
                  phone_android
                </span>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">
                    Android (Chrome)
                  </strong>
                  Tap browser menu <span className="font-bold font-mono">⋮</span> at the top right and tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 shrink-0 text-lg mt-0.5">
                  ios_share
                </span>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-bold">
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
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-md shadow-indigo-600/20"
              >
                {langCode === "en" ? "Got it!" : "समझ गया!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
