import React from 'react';

interface MovieFilterBarProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const MovieFilterBar: React.FC<MovieFilterBarProps> = ({
  selectedGenre,
  setSelectedGenre,
  selectedFormat,
  setSelectedFormat,
  selectedDate,
  setSelectedDate,
}) => {
  const genres = ['All Genres', 'Sci-Fi', 'Action', 'Neo-Noir', 'Fantasy', 'Adventure'];
  const formats = ['All Formats', 'IMAX Laser 3D', 'Dolby Cinema', '4DX', '2D'];

  // Generate 4 consecutive dates starting from today
  const dates = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { dateStr, dayLabel, dayNum };
  });

  return (
    <div className="w-full bg-[#080E09] border border-[#7FA35C]/20 rounded-xl p-4 space-y-4">
      {/* Date Selector Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Select Date
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {dates.map(({ dateStr, dayLabel, dayNum }) => {
            const isSelected = selectedDate === dateStr;
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex flex-col items-center justify-center min-w-[76px] py-1.5 px-3 rounded-lg border text-xs transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#FFD900] text-[#080E09] border-[#FFD900] font-bold shadow-glow-yellow/20'
                    : 'bg-[#101511] text-zinc-300 border-[#7FA35C]/30 hover:border-[#648E37]'
                }`}
              >
                <span className="text-[10px] uppercase">{dayLabel}</span>
                <span className="text-sm font-semibold tabular-nums">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre & Format Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Genre segment */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-zinc-500 shrink-0 font-medium">Genre:</span>
          <div className="flex items-center gap-1.5">
            {genres.map((g) => {
              const active = (g === 'All Genres' && selectedGenre === '') || selectedGenre === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g === 'All Genres' ? '' : g)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#101511] text-[#FFD900] border border-[#FFD900] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-[#101511]'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Format segment */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-zinc-500 shrink-0 font-medium">Format:</span>
          <div className="flex items-center gap-1.5">
            {formats.map((f) => {
              const active = (f === 'All Formats' && selectedFormat === '') || selectedFormat === f;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f === 'All Formats' ? '' : f)}
                  className={`px-3 py-1 rounded-md transition-colors font-mono text-[11px] whitespace-nowrap ${
                    active
                      ? 'bg-[#101511] text-[#FFFC72] border border-[#648E37] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-[#101511]'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
