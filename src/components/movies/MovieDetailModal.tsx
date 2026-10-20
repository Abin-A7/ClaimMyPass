import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { THEATRES, getShowsForMovieAndTheatre } from '../../data/mockData';
import { X, Star, Clock, Calendar, Film, User, MapPin } from 'lucide-react';

export const MovieDetailModal: React.FC = () => {
  const {
    selectedMovie,
    isMovieDetailOpen,
    setIsMovieDetailOpen,
    selectedCity,
    selectedDate,
    setSelectedDate,
    startSeatBooking,
  } = useBooking();

  if (!isMovieDetailOpen || !selectedMovie) return null;

  const cityTheatres = THEATRES.filter((t) => t.city === selectedCity.id);
  const displayedTheatres = cityTheatres.length > 0 ? cityTheatres : THEATRES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080E09] border border-[#7FA35C]/40 rounded-2xl shadow-2xl text-zinc-100 overflow-hidden my-8">
        {/* Header Close */}
        <button
          onClick={() => setIsMovieDetailOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Poster + Quick Stats */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-[#7FA35C]/30 shadow-lg bg-[#101511]">
              <img
                src={selectedMovie.posterUrl}
                alt={selectedMovie.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                width="320"
                height="426"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full mt-4 p-3 rounded-lg bg-[#101511] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Rating:</span>
                <span className="font-semibold text-[#FFD900] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFD900]" />
                  {selectedMovie.rating} / 10
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Runtime:</span>
                <span>{selectedMovie.durationMinutes} minutes</span>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Certificate:</span>
                <span className="text-[#648E37] font-semibold">{selectedMovie.certification}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Languages:</span>
                <span>{selectedMovie.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Showtimes */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#7FA35C] font-semibold uppercase tracking-wider mb-1">
                <span>{selectedMovie.genre.join(' · ')}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[#FFFC72]">{selectedCity.name}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedMovie.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#FFFC72]/90 italic mt-0.5">
                "{selectedMovie.tagline}"
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Synopsis
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedMovie.synopsis}
              </p>
            </div>

            {/* Crew */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Director</span>
                <span className="font-medium text-zinc-200">{selectedMovie.director}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Cast</span>
                <span className="font-medium text-zinc-200">{selectedMovie.cast.join(', ')}</span>
              </div>
            </div>

            {/* Showtimes Section */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#FFD900] flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#648E37]" />
                  Select Multiplex & Showtime
                </h4>
                <span className="text-xs text-zinc-400">Date: {selectedDate}</span>
              </div>

              {/* Theatres list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {displayedTheatres.map((theatre) => {
                  const shows = getShowsForMovieAndTheatre(selectedMovie.id, theatre.id, selectedDate);
                  return (
                    <div
                      key={theatre.id}
                      className="p-3.5 rounded-xl bg-[#101511] border border-[#7FA35C]/20 hover:border-[#648E37] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h5 className="text-xs sm:text-sm font-semibold text-white">
                            {theatre.name}
                          </h5>
                          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#648E37]" />
                            {theatre.location} · {theatre.distanceKm} km away
                          </p>
                        </div>
                      </div>

                      {/* Shows badges */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {shows.map((show) => (
                          <button
                            key={show.id}
                            onClick={() => startSeatBooking(selectedMovie, theatre, show)}
                            className="group flex flex-col items-center px-3 py-1.5 rounded-lg bg-[#080E09] border border-[#7FA35C]/40 hover:border-[#FFD900] hover:bg-[#FFD900] transition-all"
                          >
                            <span className="text-xs font-bold text-[#FFFC72] group-hover:text-[#080E09] tabular-nums">
                              {show.time}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-400 group-hover:text-[#080E09]">
                              {show.format}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
