import React from 'react';
import { ShieldCheck, Film, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080E09] border-t border-[#7FA35C]/20 text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-white/5 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#101511] text-[#FFD900] border border-[#7FA35C]/30 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-zinc-200">10-Min Atomic Hold</p>
              <p className="text-xs text-zinc-400 mt-1">
                Zero double-booking guarantee backed by distributed lock coordinator.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#101511] text-[#648E37] border border-[#7FA35C]/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-zinc-200">Encrypted Digital Passes</p>
              <p className="text-xs text-zinc-400 mt-1">
                Cryptographically signed tickets with high-density barcode verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#101511] text-[#FFFC72] border border-[#7FA35C]/30 shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-zinc-200">Premium Formats</p>
              <p className="text-xs text-zinc-400 mt-1">
                Curated IMAX with Laser, Dolby Cinema 4K, 4DX, and VIP Recliners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#101511] text-[#7FA35C] border border-[#7FA35C]/30 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-zinc-200">Direct Multiplex Sync</p>
              <p className="text-xs text-zinc-400 mt-1">
                Direct integration with multiplex chains across 8 major metros.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FFD900]">ClaimMyPass</span>
            <span className="text-zinc-600">·</span>
            <span>&copy; {new Date().getFullYear()} ClaimMyPass Ticketing Technologies. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">Terms of Admission</span>
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">Multiplex Partners</span>
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
