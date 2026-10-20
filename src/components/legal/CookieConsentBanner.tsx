import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenCookiePolicy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenCookiePolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('claimmypass_cookie_consent_choice');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleConsent = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem('claimmypass_cookie_consent_choice', choice);
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 bg-[#080E09]/95 backdrop-blur-md border-t border-[#7FA35C]/30 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#101511] text-[#FFD900] border border-[#FFD900]/30 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              Privacy and Essential Storage Consent
            </h5>
            <p className="text-[11px] sm:text-xs text-zinc-400 max-w-3xl leading-relaxed">
              We use strictly necessary session storage to enforce your 10-minute real-time seat locks and store your offline digital passes. No advertising trackers or data brokers are engaged.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenCookiePolicy}
            className="text-xs text-zinc-400 hover:text-white underline px-2 py-1.5 transition-colors cursor-pointer"
          >
            Review Policy
          </button>

          <button
            onClick={() => handleConsent('essential')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#101511] text-zinc-300 border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
          >
            Essential Only
          </button>

          <button
            onClick={() => handleConsent('all')}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-sm transition-all cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
};
