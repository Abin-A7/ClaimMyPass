import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { THEATRES, MOVIES, getShowsForMovieAndTheatre } from '../../data/mockData';
import { MapPin, Film, Sparkles, Navigation } from 'lucide-react';

export const TheatresList: React.FC = () => {
  const { selectedCity, selectedDate, startSeatBooking } = useBooking();

  const cityTheatres = THEATRES.filter((t) => t.city === selectedCity.id);
  const displayedTheatres = cityTheatres.length > 0 ? cityTheatres : THEATRES;

  return (
    <section id="theatres-section" className="py-12 border-t border-[#7FA35C]/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
        <div>
          <span className="text-xs font-semibold text-[#648E37] uppercase tracking-wider block">
            Multiplex Circuit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Cinemas in {selectedCity.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Certified Dolby Atmos, IMAX Laser, and Luxury Recliner Auditoriums
          </p>
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          <span>Date: {selectedDate}</span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedTheatres.map((theatre) => (
          <div
            key={theatre.id}
            className="bg-[#080E09] border border-[#7FA35C]/25 rounded-2xl p-6 hover:border-[#648E37] transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{theatre.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101511] text-[#FFFC72] border border-[#7FA35C]/40">
                    {theatre.chain}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#648E37]" />
                  <span>{theatre.location}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-300">{theatre.distanceKm} km away</span>
                </p>
              </div>

              {/* Facilities tags */}
              <div className="flex flex-wrap gap-1.5">
                {theatre.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="text-[10px] font-mono text-zinc-300 bg-[#101511] px-2 py-0.5 rounded border border-white/5"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Showing Movies in this Theatre */}
            <div className="pt-4 space-y-4">
              {MOVIES.slice(0, 2).map((movie) => {
                const shows = getShowsForMovieAndTheatre(movie.id, theatre.id, selectedDate);
                return (
                  <div
                    key={movie.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#101511]/60 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 rounded overflow-hidden bg-[#101511] shrink-0">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          width="40"
                          height="56"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {movie.title}
                        </h4>
                        <span className="text-[11px] text-zinc-400">
                          {movie.certification} · {movie.languages[0]}
                        </span>
                      </div>
                    </div>

                    {/* Showtime buttons */}
                    <div className="flex flex-wrap gap-2">
                      {shows.map((show) => (
                        <button
                          key={show.id}
                          onClick={() => startSeatBooking(movie, theatre, show)}
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
        ))}
      </div>
    </section>
  );
};
