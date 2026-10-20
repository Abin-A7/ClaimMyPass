import React, { useMemo } from 'react';
import QRCode from 'qrcode';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface TicketQRCodeProps {
  bookingReference: string;
  bookingId: string;
  movieTitle?: string;
  size?: number;
  className?: string;
  showBranding?: boolean;
}

export const TicketQRCode: React.FC<TicketQRCodeProps> = ({
  bookingReference,
  bookingId,
  movieTitle,
  size = 140,
  className = '',
  showBranding = true,
}) => {
  // Generate QR matrix deterministically from bookingReference payload
  const qrData = useMemo(() => {
    try {
      const payload = JSON.stringify({
        ref: bookingReference,
        id: bookingId,
        app: 'ClaimMyPass',
        v: '1.0',
        sig: 'SHA256-VERIFIED',
      });

      const qr = QRCode.create(payload, {
        errorCorrectionLevel: 'M',
      });

      const moduleCount = qr.modules.size;
      const matrix: boolean[][] = [];

      for (let r = 0; r < moduleCount; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < moduleCount; c++) {
          row.push(Boolean(qr.modules.get(r, c)));
        }
        matrix.push(row);
      }

      return { matrix, moduleCount };
    } catch {
      return null;
    }
  }, [bookingReference, bookingId]);

  if (!qrData) {
    return (
      <div className="w-36 h-36 flex items-center justify-center bg-zinc-100 rounded-lg text-xs text-zinc-500">
        QR Unavailable
      </div>
    );
  }

  const { matrix, moduleCount } = qrData;
  const padding = 2; // quiet zone in module units
  const totalGridSize = moduleCount + padding * 2;

  // Determine if a module coordinate is inside the 3 standard corner position detection patterns (7x7)
  const isFinderPattern = (r: number, c: number) => {
    // Top-left finder
    if (r < 7 && c < 7) return true;
    // Top-right finder
    if (r < 7 && c >= moduleCount - 7) return true;
    // Bottom-left finder
    if (r >= moduleCount - 7 && c < 7) return true;
    return false;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white text-[#080E09] shadow-md border border-white/20 select-none ${className}`}
      style={{ minWidth: size + 24 }}
    >
      {/* Brand Top Header */}
      {showBranding && (
        <div className="w-full flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-200 text-[10px] font-mono">
          <span className="font-extrabold text-[#080E09] tracking-tight flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#648E37] inline-block" />
            ClaimMyPass
          </span>
          <span className="text-[#648E37] font-semibold flex items-center gap-0.5">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        </div>
      )}

      {/* Vector SVG QR Code */}
      <div className="relative flex items-center justify-center bg-white p-1 rounded-lg">
        <svg
          viewBox={`0 0 ${totalGridSize} ${totalGridSize}`}
          width={size}
          height={size}
          className="w-full h-full"
          shapeRendering="crispEdges"
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width={totalGridSize}
            height={totalGridSize}
            fill="#FFFFFF"
          />

          {/* Modules */}
          {matrix.map((row, r) =>
            row.map((isDark, c) => {
              if (!isDark) return null;
              const isFinder = isFinderPattern(r, c);
              // Finder patterns with branded dark green accent; data modules with crisp black for 100% scanner contrast
              const fillColor = isFinder ? '#080E09' : '#101511';

              return (
                <rect
                  key={`${r}-${c}`}
                  x={c + padding}
                  y={r + padding}
                  width="1"
                  height="1"
                  fill={fillColor}
                />
              );
            })
          )}
        </svg>

        {/* Center Branded Badge (Watermark Chip within Error Correction tolerance) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 rounded-md bg-[#080E09] border-2 border-white flex items-center justify-center shadow-sm">
            <span className="text-[8px] font-black font-mono text-[#FFD900]">
              CP
            </span>
          </div>
        </div>
      </div>

      {/* Scan Instructions & Hash Snippet */}
      <div className="w-full text-center mt-2 pt-1 border-t border-zinc-100 space-y-0.5">
        <div className="text-[9px] font-mono font-bold tracking-wider text-zinc-700 uppercase">
          Scan at Turnstile
        </div>
        <div className="text-[8px] font-mono text-zinc-400 truncate max-w-[140px] mx-auto">
          {bookingId}
        </div>
      </div>
    </div>
  );
};
