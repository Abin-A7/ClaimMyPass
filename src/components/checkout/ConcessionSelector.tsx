import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { CONCESSIONS } from '../../data/mockData';
import { ConcessionItem } from '../../types';
import { ArrowLeft, Plus, Minus, Utensils, Check, ChevronRight } from 'lucide-react';

export const ConcessionSelector: React.FC = () => {
  const {
    concessionsCart,
    updateConcessionQty,
    subtotalTickets,
    subtotalConcessions,
    selectedSeatIds,
    proceedToPayment,
    setCurrentView,
  } = useBooking();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Popcorn', 'Combos', 'Snacks', 'Beverages'];

  const filteredItems = activeCategory === 'All'
    ? CONCESSIONS
    : CONCESSIONS.filter((c) => c.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#101511] pb-32">
      {/* Top Header */}
      <div className="w-full bg-[#080E09] border-b border-[#7FA35C]/20 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('seats')}
              className="p-2 rounded-lg bg-[#101511] text-zinc-300 hover:text-white border border-[#7FA35C]/30 hover:border-[#FFD900] transition-colors"
              aria-label="Back to seats"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#648E37]" />
                Grab Your Cinema Snacks
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Fresh gourmet concessions delivered right to your seat or collected at express counters
              </p>
            </div>
          </div>

          <button
            onClick={proceedToPayment}
            className="text-xs font-semibold text-zinc-400 hover:text-[#FFD900] transition-colors px-3 py-1.5 rounded border border-white/10"
          >
            Skip to Payment &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#101511] text-[#FFD900] border border-[#FFD900] shadow-glow-yellow/20 font-bold'
                  : 'bg-[#080E09] text-zinc-400 border border-[#7FA35C]/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Concession Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const qty = concessionsCart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-[#080E09] border border-[#7FA35C]/20 rounded-xl p-5 hover:border-[#648E37] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="text-3xl p-2 rounded-lg bg-[#101511] border border-white/5">
                      {item.imageEmoji}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.isVeg && (
                        <span className="w-3.5 h-3.5 border border-[#648E37] rounded-sm flex items-center justify-center p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#648E37]" />
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-[#FFFC72] tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Add / Stepper Area */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 uppercase font-mono">
                    {item.category}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => updateConcessionQty(item.id, 1)}
                      className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-[#101511] text-[#FFD900] border border-[#FFD900]/60 hover:bg-[#FFD900] hover:text-[#080E09] transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#101511] border border-[#FFD900] rounded-md px-2 py-1">
                      <button
                        onClick={() => updateConcessionQty(item.id, -1)}
                        className="p-0.5 text-zinc-300 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono text-[#FFD900] px-2 tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateConcessionQty(item.id, 1)}
                        className="p-0.5 text-zinc-300 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080E09]/95 backdrop-blur-md border-t border-[#7FA35C]/30 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-zinc-400 block text-[11px]">Tickets ({selectedSeatIds.length})</span>
              <span className="text-sm font-bold text-zinc-200 font-mono tabular-nums">
                ₹{subtotalTickets}
              </span>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div>
              <span className="text-zinc-400 block text-[11px]">Food & Beverages</span>
              <span className="text-sm font-bold text-[#FFFC72] font-mono tabular-nums">
                ₹{subtotalConcessions}
              </span>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div>
              <span className="text-zinc-400 block text-[11px]">Total Before Taxes</span>
              <span className="text-base font-extrabold text-[#FFD900] font-mono tabular-nums">
                ₹{subtotalTickets + subtotalConcessions}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={proceedToPayment}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-glow-yellow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Payment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
