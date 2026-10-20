/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroShowcase } from './components/movies/HeroShowcase';
import { MovieCard } from './components/movies/MovieCard';
import { MovieFilterBar } from './components/movies/MovieFilterBar';
import { MovieDetailModal } from './components/movies/MovieDetailModal';
import { TheatresList } from './components/theatres/TheatresList';
import { SeatGrid } from './components/seats/SeatGrid';
import { HoldCountdownBanner } from './components/checkout/HoldCountdownBanner';
import { ConcessionSelector } from './components/checkout/ConcessionSelector';
import { PaymentModal } from './components/checkout/PaymentModal';
import { DigitalPassModal } from './components/tickets/DigitalPassModal';
import { MyPassesView } from './components/passes/MyPassesView';
import { CityModal } from './components/city/CityModal';
import { MOVIES } from './data/mockData';
import { Film, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, selectedDate, setSelectedDate } = useBooking();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  // Filter movies based on user selections
  const filteredMovies = MOVIES.filter((movie) => {
    if (selectedGenre && !movie.genre.includes(selectedGenre)) return false;
    if (selectedFormat && !movie.formats.includes(selectedFormat)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#101511] text-zinc-100 selection:bg-[#FFD900] selection:text-[#080E09]">
      {/* 1. Header (Navbar strictly adhering to 3-Zone contract) */}
      <Navbar />

      {/* 2. Floating 10-Minute Hold Urgency Banner */}
      <HoldCountdownBanner />

      {/* 3. Dynamic Router / View Switcher */}
      <main className="flex-1">
        {currentView === 'browse' && (
          <div>
            {/* Cinematic Hero */}
            <HeroShowcase />

            {/* Catalog Discovery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#648E37] uppercase tracking-wider mb-1">
                    <Film className="w-4 h-4" />
                    <span>Theatrical Releases</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Now Showing on Big Screens
                  </h2>
                </div>

                <div className="text-xs text-zinc-400">
                  Showing <span className="font-bold text-[#FFD900] tabular-nums">{filteredMovies.length}</span> titles
                </div>
              </div>

              {/* Filters */}
              <MovieFilterBar
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />

              {/* Movie Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {/* Theatres in City */}
              <TheatresList />
            </section>
          </div>
        )}

        {currentView === 'seats' && <SeatGrid />}

        {currentView === 'concessions' && <ConcessionSelector />}

        {currentView === 'payment' && <PaymentModal />}

        {currentView === 'ticket-pass' && <DigitalPassModal />}

        {currentView === 'my-passes' && <MyPassesView />}
      </main>

      {/* 4. Modals */}
      <CityModal />
      <MovieDetailModal />

      {/* 5. Footer with Marshland Background */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <MainContent />
    </BookingProvider>
  );
}
