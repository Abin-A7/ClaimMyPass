import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Timer, ShieldAlert, X } from 'lucide-react';

export const HoldCountdownBanner: React.FC = () => {
  const { isHoldActive, holdSecondsLeft, releaseHold, selectedSeatIds } = useBooking();

  if (!isHoldActive || selectedSeatIds.length === 0) return null;

  const minutes = Math.floor(holdSecondsLeft / 60);
  const seconds = holdSecondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isCritical = holdSecondsLeft < 60; // under 1 minute
  const isLowTime = holdSecondsLeft < 180; // under 3 minutes

  return (
    <div
      className={`sticky top-16 z-30 w-full px-4 py-2.5 shadow-lg transition-colors ${
        isCritical
          ? 'bg-[#180A0A] border-y border-red-500/80 animate-pulse'
          : isLowTime
          ? 'bg-[#0E120A] border-y border-[#FFD900]/70'
          : 'bg-[#080E09] border-y border-[#FFD900]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-1.5 rounded-full ${
              isCritical
                ? 'bg-red-500/30 text-red-300 animate-bounce'
                : isLowTime
                ? 'bg-[#FFD900]/20 text-[#FFD900]'
                : 'bg-[#101511] text-[#FFD900] border border-[#FFD900]/40'
            }`}
          >
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold ${
                  isCritical ? 'text-red-300' : 'text-[#FFFC72]'
                }`}
              >
                {isCritical
                  ? 'Urgent: Seat Hold Expiring Soon!'
                  : '10-Minute Distributed Inventory Hold Active'}
              </span>
              <span className="text-zinc-500 hidden md:inline">·</span>
              <span className="text-zinc-300 hidden md:inline">
                {selectedSeatIds.length}{' '}
                {selectedSeatIds.length === 1 ? 'seat' : 'seats'} locked
                exclusively for you (persisted across reloads)
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {isCritical
                ? 'Complete your checkout before the timer hits 00:00 to prevent releasing seats.'
                : 'Other cinema-goers cannot purchase these seats while your timer runs.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-sm font-bold shadow-md tabular-nums ${
              isCritical
                ? 'bg-red-950/80 border border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                : isLowTime
                ? 'bg-[#101511] border border-[#FFD900] text-[#FFD900] shadow-glow-yellow/30'
                : 'bg-[#101511] border border-[#FFD900] text-[#FFD900] shadow-glow-yellow/20'
            }`}
          >
            <span>{formattedTime}</span>
          </div>

          <button
            onClick={releaseHold}
            className="flex items-center gap-1 text-zinc-400 hover:text-red-400 hover:bg-white/5 px-2 py-1 rounded transition-colors text-[11px]"
            title="Release locked seats"
          >
            <X className="w-3.5 h-3.5" />
            <span>Release</span>
          </button>
        </div>
      </div>
    </div>
  );
};
