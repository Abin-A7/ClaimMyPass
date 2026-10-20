import React, { useState } from 'react';
import { BookingPass } from '../../types';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Sparkles,
  Film,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
} from 'lucide-react';

interface SocialPreviewModalProps {
  pass: BookingPass;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialPreviewModal: React.FC<SocialPreviewModalProps> = ({
  pass,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?pass=${pass.bookingId}`
    : `https://claimmypass.app/pass/${pass.bookingId}`;

  const seatNames = pass.seats.map((s) => s.id).join(', ');

  const shareTitle = `Watching ${pass.movie.title} at ${pass.theatre.name}!`;
  const shareText = `🍿 I just claimed our passes for ${pass.movie.title} (${pass.show.format}) on ClaimMyPass! Screening on ${pass.show.date} at ${pass.show.time} (Seats ${seatNames}). Claim your seats nearby:`;

  const fullInviteMessage = `${shareText}\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(fullInviteMessage);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullInviteMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Just claimed passes for ${pass.movie.title} in ${pass.show.format} via ClaimMyPass! 🎬\n${shareUrl}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#080E09] border border-[#7FA35C]/40 rounded-2xl shadow-2xl p-6 text-zinc-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#101511] text-[#FFD900] border border-[#FFD900]/30">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Share Cinema Pass
              </h3>
              <p className="text-xs text-zinc-400">
                Invite friends or share your movie plan on social channels
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Social Media Preview Card (Live Preview) */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#7FA35C]">
              Social Media Preview Card
            </span>
            <span className="font-mono text-[10px] text-zinc-500">Auto-Generated</span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-[#7FA35C]/40 bg-[#101511] shadow-xl">
            {/* Backdrop Banner */}
            <div className="relative h-28 w-full overflow-hidden bg-black">
              <img
                src={pass.movie.backdropUrl || pass.movie.posterUrl}
                alt={pass.movie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101511] via-transparent to-transparent" />

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#080E09]/90 border border-[#FFD900]/40 text-[#FFD900] text-[10px] font-mono font-bold backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                <span>ClaimMyPass Verified</span>
              </div>
            </div>

            {/* Card Content Strip */}
            <div className="p-4 pt-1 flex gap-3.5 items-start">
              {/* Poster Thumbnail */}
              <div className="w-14 aspect-[3/4] -mt-8 rounded-lg overflow-hidden border border-white/20 shadow-md shrink-0 bg-[#080E09]">
                <img
                  src={pass.movie.posterUrl}
                  alt={pass.movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">
                    {pass.movie.title}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#080E09] text-[#FFFC72] border border-[#648E37] shrink-0">
                    {pass.show.format}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-[#648E37] shrink-0" />
                  <span>{pass.theatre.name}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-mono text-zinc-400">
                  <span className="text-[#FFD900] font-semibold">{pass.show.date} · {pass.show.time}</span>
                  <span>·</span>
                  <span className="text-zinc-200 bg-[#080E09] px-1.5 py-0.5 rounded border border-white/5">
                    Seats {seatNames}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Shareable Link Input */}
        <div className="mt-5 space-y-1.5">
          <label className="text-xs text-zinc-400 block font-semibold">
            Shareable Booking Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-[#101511] border border-[#7FA35C]/30 rounded-lg px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                copiedLink
                  ? 'bg-[#648E37] text-white'
                  : 'bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72]'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* One-Click Social Channels */}
        <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
          <span className="text-xs font-semibold text-zinc-400 block">
            Direct Share Options
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#101511] border border-[#7FA35C]/30 hover:border-[#648E37] text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#648E37]" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTwitterShare}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#101511] border border-[#7FA35C]/30 hover:border-[#FFD900] text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              <span className="font-bold text-[#FFD900]">𝕏</span>
              <span>Twitter / X</span>
            </button>

            <button
              onClick={handleCopyInvite}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#101511] border border-[#7FA35C]/30 hover:border-[#FFFC72] text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              {copiedInvite ? (
                <>
                  <Check className="w-4 h-4 text-[#648E37]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#FFFC72]" />
                  <span>Copy Invite</span>
                </>
              )}
            </button>
          </div>

          {/* Native Web Share Button if supported */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full mt-2 py-2.5 rounded-lg text-xs font-bold bg-[#101511] border border-[#FFD900] text-[#FFD900] hover:bg-[#FFD900] hover:text-[#080E09] transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>More Sharing Options (System Dialog)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
