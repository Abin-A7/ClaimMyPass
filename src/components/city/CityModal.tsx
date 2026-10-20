import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { CITIES } from '../../data/mockData';
import { X, Search, Check, Building2 } from 'lucide-react';

export const CityModal: React.FC = () => {
  const { isCityModalOpen, setIsCityModalOpen, selectedCity, setSelectedCity } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isCityModalOpen) return null;

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#080E09] border border-[#7FA35C]/30 rounded-xl shadow-2xl p-6 text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-[#FFD900] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#648E37]" />
              Select Your City
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose your metropolitan location to discover local multiplexes
            </p>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative my-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by city or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#101511] border border-[#7FA35C]/40 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FFD900] transition-colors"
          />
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredCities.map((city) => {
            const isSelected = selectedCity.id === city.id;
            return (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city);
                  setIsCityModalOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#101511] border-[#FFD900] text-[#FFD900] shadow-glow-yellow/20'
                    : 'bg-[#101511]/50 border-white/5 text-zinc-300 hover:border-[#648E37] hover:bg-[#101511]'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    {city.name}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {city.state} · {city.cinemasCount} Screens
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#FFD900] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
