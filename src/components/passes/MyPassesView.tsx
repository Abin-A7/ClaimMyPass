import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingPass } from '../../types';
import { DigitalPassModal } from '../tickets/DigitalPassModal';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Film,
} from 'lucide-react';

export const MyPassesView: React.FC = () => {
  const { myPasses, cancelBookingPass, returnToBrowse } = useBooking();
  const [inspectedPass, setInspectedPass] = useState<BookingPass | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#101511] pb-24 text-zinc-100">
      {/* Top Header */}
      <div className="w-full bg-[#080E09] border-b border-[#7FA35C]/20 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#648E37] uppercase tracking-wider mb-1">
              <Ticket className="w-4 h-4" />
              <span>ClaimMyPass Wallet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              My Booked Passes ({myPasses.length})
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time synchronized admission barcodes and seating confirmations
            </p>
          </div>

          <button
            onClick={returnToBrowse}
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-sm transition-all"
          >
            <span>Book New Tickets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {myPasses.length === 0 ? (
          <div className="text-center py-20 bg-[#080E09] border border-[#7FA35C]/20 rounded-2xl p-8 max-w-md mx-auto">
            <Ticket className="w-12 h-12 text-[#7FA35C] mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-1">No Active Passes Found</h3>
            <p className="text-xs text-zinc-400 mb-6">
              You haven't reserved any cinema seats yet. Browse currently showing blockbusters in your city.
            </p>
            <button
              onClick={returnToBrowse}
              className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72]"
            >
              Explore Now Showing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPasses.map((pass) => (
              <div
                key={pass.bookingId}
                className="bg-[#080E09] border border-[#7FA35C]/30 rounded-xl overflow-hidden hover:border-[#FFD900] transition-all flex flex-col justify-between"
              >
                {/* Upper Card */}
                <div className="p-5 flex gap-4">
                  {/* Poster thumbnail */}
                  <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shrink-0 bg-[#101511]">
                    <img
                      src={pass.movie.posterUrl}
                      alt={pass.movie.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Pass details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101511] text-[#FFD900] border border-[#FFD900]/40">
                        {pass.bookingId}
                      </span>
                      <span className="text-[10px] text-[#648E37] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Confirmed
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-tight">
                      {pass.movie.title}
                    </h3>

                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#648E37]" />
                      <span className="truncate">{pass.theatre.name}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-300 font-mono">
                      <span>{pass.show.date}</span>
                      <span>·</span>
                      <span className="text-[#FFFC72] font-semibold">{pass.show.time}</span>
                      <span>·</span>
                      <span className="text-zinc-400">{pass.show.format}</span>
                    </div>

                    {/* Allocated seats */}
                    <div className="pt-2 flex items-center gap-1.5">
                      <span className="text-[11px] text-zinc-400">Seats:</span>
                      {pass.seats.map((seat) => (
                        <span
                          key={seat.id}
                          className="px-2 py-0.5 rounded bg-[#101511] border border-[#FFD900] text-[#FFD900] font-mono text-xs font-bold"
                        >
                          {seat.id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="px-5 py-3 bg-[#101511] border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs font-mono">
                    <span className="text-zinc-500 text-[11px]">Total Paid: </span>
                    <span className="text-[#FFFC72] font-bold">₹{pass.totalPaid}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cancelBookingPass(pass.bookingId)}
                      className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
                      title="Cancel Booking & Refund"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Cancel</span>
                    </button>

                    <button
                      onClick={() => setInspectedPass(pass)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View QR Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspect Pass Modal */}
      {inspectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl">
            <DigitalPassModal
              passOverride={inspectedPass}
              onClose={() => setInspectedPass(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
