import { useState, useEffect } from "react";

export default function InstallPWAButton({ className = "" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isInstalled) {
    return null; // Don't show if already running as installed PWA
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        title="Install SevaSetu as an app on your phone or desktop"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm hover:shadow-md hover:from-emerald-700 hover:to-teal-800 transition-all cursor-pointer ${className}`}
      >
        <span className="material-symbols-outlined text-[16px] md:text-[18px]">install_mobile</span>
        <span>Install App</span>
      </button>

      {/* Instructions Modal for browsers without native direct trigger */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">get_app</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Install SevaSetu App</h3>
                  <p className="text-[11px] text-slate-500">Fast & works offline</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 shrink-0 text-base mt-0.5">phone_android</span>
                <div>
                  <strong className="block text-slate-900">Android / Chrome</strong>
                  Tap the browser menu <span className="font-mono font-bold">⋮</span> at the top right and select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-600 shrink-0 text-base mt-0.5">ios_share</span>
                <div>
                  <strong className="block text-slate-900">iPhone / iPad (Safari)</strong>
                  Tap the <span className="font-bold">Share</span> button <span className="material-symbols-outlined text-[14px] align-middle">ios_share</span> and select <strong>"Add to Home Screen"</strong> <span className="font-bold">➕</span>.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-purple-600 shrink-0 text-base mt-0.5">desktop_windows</span>
                <div>
                  <strong className="block text-slate-900">Desktop (Chrome / Edge)</strong>
                  Click the install icon in the URL address bar or select <strong>"Install SevaSetu"</strong> in browser settings.
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="w-full py-2.5 rounded-xl bg-teal-700 text-white font-semibold text-xs hover:bg-teal-800 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
