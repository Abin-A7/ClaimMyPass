import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MOVIES } from '../../data/mockData';
import { Play, Sparkles, Star, Calendar, Clock } from 'lucide-react';

export const HeroShowcase: React.FC = () => {
  const { startSeatBooking, setSelectedMovie, setIsMovieDetailOpen } = useBooking();
  const featured = MOVIES[0]; // Dune's Tempest

  return (
    <section className="relative w-full overflow-hidden bg-[#101511] border-b border-[#7FA35C]/20">
      {/* Background Image with Scrim Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={featured.backdropUrl}
          alt={featured.title}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101511] via-[#101511]/70 to-[#080E09]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#101511]/40 to-[#101511]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Info (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Unboxed clean metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#FFFC72]">
              <span className="flex items-center gap-1.5 text-[#FFD900]">
                <Sparkles className="w-3.5 h-3.5" />
                NOW PREMIERING
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300">IMAX EXCLUSIVE</span>
              <span className="text-zinc-500">·</span>
              <span className="text-[#648E37]">DIRECTOR’S CUT EDITION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
              {featured.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
              {featured.synopsis}
            </p>

            {/* Movie Attributes Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 pt-1">
              <span className="flex items-center gap-1.5 text-[#FFD900] font-semibold">
                <Star className="w-4 h-4 fill-[#FFD900]" />
                <span className="tabular-nums">{featured.rating}</span>/10 (34.2k votes)
              </span>
              <span className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#7FA35C]" />
                <span>{Math.floor(featured.durationMinutes / 60)}h {featured.durationMinutes % 60}m</span>
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">{featured.certification}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">{featured.genre.join(', ')}</span>
            </div>

            {/* Formats list */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-zinc-400">Available in:</span>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#FFFC72]">
                {featured.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded bg-[#080E09] border border-[#7FA35C]/40 text-[11px] font-mono"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => startSeatBooking(featured)}
                className="px-6 py-3 rounded-lg text-sm font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-glow-yellow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Claim Seats Now</span>
              </button>

              <button
                onClick={() => {
                  setSelectedMovie(featured);
                  setIsMovieDetailOpen(true);
                }}
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#080E09]/80 text-zinc-200 border border-[#7FA35C]/40 hover:border-[#FFD900] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#648E37]" />
                <span>Trailer & Details</span>
              </button>
            </div>
          </div>

          {/* Poster Showcase (Right 4 cols) */}
          <div className="hidden lg:flex justify-end">
            <div className="relative group cursor-pointer" onClick={() => startSeatBooking(featured)}>
              <div className="w-64 aspect-[3/4] rounded-xl overflow-hidden border border-[#7FA35C]/30 shadow-2xl bg-[#080E09] transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-[#FFD900]">
                <img
                  src={featured.posterUrl}
                  alt={featured.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width="256"
                  height="341"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#080E09] border border-[#648E37] text-[#FFFC72] text-[11px] font-mono px-2.5 py-1 rounded shadow-lg">
                #1 Box Office
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
