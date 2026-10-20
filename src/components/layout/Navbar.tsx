import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MapPin, Ticket, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCity,
    setIsCityModalOpen,
    myPasses,
    returnToBrowse,
  } = useBooking();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080E09]/95 backdrop-blur-md border-b border-[#7FA35C]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={returnToBrowse}
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#FFD900] hover:text-[#FFFC72] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>ClaimMyPass</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#648E37]" />
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <button
            onClick={() => setCurrentView('browse')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'browse'
                ? 'text-[#FFD900] font-semibold border-b-2 border-[#FFD900] pb-0.5'
                : 'hover:text-white'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => {
              setCurrentView('browse');
              // scroll to theatres
              const el = document.getElementById('theatres-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Theatres
          </button>
          <button
            onClick={() => setCurrentView('my-passes')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentView === 'my-passes'
                ? 'text-[#FFD900] font-semibold border-b-2 border-[#FFD900] pb-0.5'
                : 'hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4 text-[#648E37]" />
            <span>My Passes</span>
            {myPasses.length > 0 && (
              <span className="text-[11px] font-bold text-[#080E09] bg-[#FFD900] px-1.5 py-0.2 rounded-full tabular-nums">
                {myPasses.length}
              </span>
            )}
          </button>
          <span className="text-zinc-600 text-xs hidden lg:inline">·</span>
          <span className="text-xs text-[#7FA35C] font-mono hidden lg:inline">
            10-MIN INVENTORY LOCK ACTIVE
          </span>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#101511] text-[#FFFC72] border border-[#7FA35C]/40 hover:border-[#FFD900] transition-colors whitespace-nowrap shrink-0"
            aria-label="Change City"
          >
            <MapPin className="w-3.5 h-3.5 text-[#648E37]" />
            <span>{selectedCity.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {currentView !== 'my-passes' && (
            <button
              onClick={() => setCurrentView('my-passes')}
              className="md:hidden p-2 rounded-md bg-[#101511] text-[#FFD900] border border-[#7FA35C]/30"
              aria-label="View My Passes"
            >
              <Ticket className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
