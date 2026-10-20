import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Film, ArrowLeft, Search, Sparkles } from 'lucide-react';

interface Custom404ViewProps {
  onBackToMovies: () => void;
}

export const Custom404View: React.FC<Custom404ViewProps> = ({ onBackToMovies }) => {
  const { returnToBrowse } = useBooking();

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center text-zinc-100">
      {/* 404 Badge */}
      <div className="relative mb-6">
        <div className="p-4 rounded-2xl bg-[#080E09] border border-[#7FA35C]/30 shadow-2xl inline-flex items-center justify-center">
          <Film className="w-14 h-14 text-[#FFD900] opacity-80" />
        </div>
        <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#101511] border border-red-500/60 text-red-400 font-mono text-xs font-bold">
          404
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        Screen Reel Not Found
      </h1>

      <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
        The showtime, seat selection, or screening auditorium you requested is no longer on schedule or has moved to an alternate cinema hall.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            returnToBrowse();
            onBackToMovies();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-glow-yellow transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Now Showing</span>
        </button>
      </div>
    </div>
  );
};
