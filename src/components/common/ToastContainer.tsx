import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toast, dismissToast } = useBooking();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-200"
    >
      <div
        className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md ${
          isSuccess
            ? 'bg-[#080E09]/95 border-[#648E37] text-white'
            : isError
            ? 'bg-[#180A0A]/95 border-red-500 text-white'
            : 'bg-[#101511]/95 border-[#7FA35C]/40 text-zinc-200'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#FFD900]" />}
          {isError && <AlertCircle className="w-4 h-4 text-red-400" />}
          {!isSuccess && !isError && <Info className="w-4 h-4 text-[#7FA35C]" />}
        </div>

        <div className="flex-1 text-xs font-medium leading-relaxed">
          {toast.message}
        </div>

        <button
          onClick={dismissToast}
          className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
