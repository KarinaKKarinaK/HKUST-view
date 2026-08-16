"use client";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

// Registers the service worker and shows a dismissible install banner.
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    if (localStorage.getItem("install-dismissed")) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS Safari has no beforeinstallprompt - show a hint if not already standalone.
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone;
    if (isIos && !standalone) setShow(true);

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("install-dismissed", "1");
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    dismiss();
  };

  if (!show) return null;

  return (
    <div className="no-print glass fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md animate-fade-up rounded-2xl p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-ink p-2 text-paper dark:bg-paper dark:text-ink">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="mono-label">Install</p>
          <p className="mt-1 text-sm font-medium">
            {deferred
              ? "Add HKUST Exchange to your home screen for one-tap access."
              : "Tap the Share button, then Add to Home Screen."}
          </p>
          {deferred && (
            <button
              onClick={install}
              className="mt-3 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
            >
              Install app
            </button>
          )}
        </div>
        <button onClick={dismiss} aria-label="Dismiss" className="text-ink/40 hover:text-ink dark:text-paper/40 dark:hover:text-paper">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
