import React from 'react';

export const SeatLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4 px-6 bg-[#080E09]/80 rounded-xl border border-[#7FA35C]/20 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-t-md bg-[#080E09] border border-[#7FA35C]/40 text-[#FFFC72]/70 flex items-center justify-center text-[10px]" />
        <span className="text-zinc-300">Available (Standard)</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-t-md bg-[#080E09] border border-[#648E37] text-[#648E37] flex items-center justify-center text-[10px]" />
        <span className="text-zinc-300">VIP / Premium</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-t-md bg-[#FFD900] text-[#080E09] font-bold shadow-glow-yellow flex items-center justify-center text-[10px]" />
        <span className="text-[#FFD900] font-semibold">Your Selection</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-t-md bg-[rgba(255,252,114,0.15)] border border-[#FFFC72]/60 text-[#FFFC72] animate-pulse flex items-center justify-center text-[10px]" />
        <span className="text-[#FFFC72]">Held (Other User)</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-t-md bg-white/5 border border-white/10 text-white/20 flex items-center justify-center text-[10px]" />
        <span className="text-zinc-500">Booked / Sold</span>
      </div>
    </div>
  );
};
