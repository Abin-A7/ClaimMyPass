import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { CONCESSIONS } from '../../data/mockData';
import { ConcessionItem } from '../../types';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Lock,
  CheckCircle2,
  Loader2,
  Ticket,
  AlertCircle,
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    selectedMovie,
    selectedTheatre,
    selectedShow,
    currentSeats,
    selectedSeatIds,
    concessionsCart,
    subtotalTickets,
    subtotalConcessions,
    convenienceFee,
    taxes,
    grandTotal,
    completeBooking,
    setCurrentView,
  } = useBooking();

  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [customerName, setCustomerName] = useState('Abin Anilkumar');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 12890');
  const [customerEmail, setCustomerEmail] = useState('abinanilkumarn@gmail.com');

  // Form states
  // Form states
  const [upiId, setUpiId] = useState('abin@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('781');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Processing state simulation
  const [processingStep, setProcessingStep] = useState<'idle' | 'authorizing' | 'locking' | 'confirmed'>('idle');

  const selectedSeats = currentSeats.filter((s) => selectedSeatIds.includes(s.id));
  const selectedConcessions = Object.entries(concessionsCart)
    .map(([id, qty]) => ({
      item: CONCESSIONS.find((c: ConcessionItem) => c.id === id)!,
      qty,
    }))
    .filter((c) => Boolean(c.item));

  const handlePayNow = () => {
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Please enter attendee full name for admission verification.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for instant SMS pass dispatch.');
      return;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@') || !customerEmail.includes('.')) {
      setFormError('Please enter a valid email address to receive your verified PDF digital pass.');
      return;
    }

    if (!agreedToTerms) {
      setFormError('Please accept the Terms of Admission and Privacy Policy to claim your pass.');
      return;
    }

    setProcessingStep('authorizing');

    setTimeout(() => {
      setProcessingStep('locking'); // Simulating PostgreSQL row locking & HMAC verification
      setTimeout(() => {
        setProcessingStep('confirmed');
        setTimeout(() => {
          completeBooking({
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            paymentMethod:
              paymentTab === 'upi'
                ? `UPI (${upiId})`
                : paymentTab === 'card'
                ? `Credit Card (ending ${cardNumber.slice(-4)})`
                : `Netbanking (${selectedBank})`,
          });
        }, 800);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#101511] pb-24 text-zinc-100">
      {/* Top Header */}
      <div className="w-full bg-[#080E09] border-b border-[#7FA35C]/20 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('concessions')}
              disabled={processingStep !== 'idle'}
              className="p-2 rounded-lg bg-[#101511] text-zinc-300 hover:text-white border border-[#7FA35C]/30 hover:border-[#FFD900] transition-colors"
              aria-label="Back to concessions"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#648E37]" />
                Secure Checkout & Payment
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                256-bit encrypted Razorpay transaction session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#648E37] font-semibold bg-[#101511] px-3 py-1.5 rounded border border-[#648E37]/40">
            <ShieldCheck className="w-4 h-4" />
            <span>PCI-DSS Certified</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact & Payment Gateway */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[#080E09] border border-[#7FA35C]/20 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#FFD900] uppercase tracking-wider">
                1. Digital Ticket Delivery Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#101511] border border-[#7FA35C]/30 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-[#FFD900]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Mobile (SMS Pass)</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#101511] border border-[#7FA35C]/30 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-[#FFD900]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Email (PDF Pass)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#101511] border border-[#7FA35C]/30 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-[#FFD900]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#080E09] border border-[#7FA35C]/20 rounded-xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-[#FFD900] uppercase tracking-wider">
                2. Select Payment Gateway Method
              </h3>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentTab('upi')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentTab === 'upi'
                      ? 'bg-[#101511] border-[#FFD900] text-[#FFD900] shadow-glow-yellow/20'
                      : 'bg-[#101511]/40 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#648E37]" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab('card')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentTab === 'card'
                      ? 'bg-[#101511] border-[#FFD900] text-[#FFD900] shadow-glow-yellow/20'
                      : 'bg-[#101511]/40 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#648E37]" />
                  <span>Debit / Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab('netbanking')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all ${
                    paymentTab === 'netbanking'
                      ? 'bg-[#101511] border-[#FFD900] text-[#FFD900] shadow-glow-yellow/20'
                      : 'bg-[#101511]/40 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4 text-[#648E37]" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* UPI Tab View */}
              {paymentTab === 'upi' && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-lg bg-[#101511] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-xs font-semibold text-white">Instant UPI Auto-Verification</p>
                      <p className="text-[11px] text-zinc-400">
                        Scan or enter your Virtual Payment Address (Google Pay / PhonePe / Paytm / BHIM)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setUpiId('abin@okaxis')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          upiId.endsWith('@okaxis')
                            ? 'bg-[#FFD900] text-[#080E09] font-bold'
                            : 'bg-[#080E09] border border-white/10 text-[#FFFC72] hover:border-[#FFD900]'
                        }`}
                      >
                        GPay
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiId('abin@ybl')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          upiId.endsWith('@ybl')
                            ? 'bg-[#FFD900] text-[#080E09] font-bold'
                            : 'bg-[#080E09] border border-white/10 text-[#FFFC72] hover:border-[#FFD900]'
                        }`}
                      >
                        PhonePe
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiId('abin@paytm')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          upiId.endsWith('@paytm')
                            ? 'bg-[#FFD900] text-[#080E09] font-bold'
                            : 'bg-[#080E09] border border-white/10 text-[#FFFC72] hover:border-[#FFD900]'
                        }`}
                      >
                        Paytm
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Enter UPI Virtual Address</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@okaxis or handle@okhdfc"
                      className="w-full bg-[#101511] border border-[#7FA35C]/40 rounded-lg p-2.5 text-xs text-zinc-100 font-mono focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>
                </div>
              )}

              {/* Card Tab View */}
              {paymentTab === 'card' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="text-zinc-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#101511] border border-[#7FA35C]/40 rounded-lg p-2.5 text-zinc-100 font-mono focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#101511] border border-[#7FA35C]/40 rounded-lg p-2.5 text-zinc-100 font-mono focus:outline-none focus:border-[#FFD900]"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#101511] border border-[#7FA35C]/40 rounded-lg p-2.5 text-zinc-100 font-mono focus:outline-none focus:border-[#FFD900]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Tab View */}
              {paymentTab === 'netbanking' && (
                <div className="space-y-3 pt-2 text-xs">
                  <label className="text-zinc-400 block">Select Primary Bank</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Others'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                          selectedBank === b
                            ? 'bg-[#101511] border-[#FFD900] text-[#FFD900] font-semibold'
                            : 'bg-[#101511]/40 border-white/5 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Pay Action */}
          <div className="lg:col-span-5">
            <div className="bg-[#080E09] border border-[#7FA35C]/30 rounded-xl p-6 space-y-5 sticky top-24">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[11px] font-mono text-[#648E37] uppercase tracking-wider">
                  Order Breakdown
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedMovie?.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {selectedTheatre?.name} · {selectedShow?.screenName}
                </p>
                <p className="text-xs text-[#FFFC72] font-mono mt-1">
                  {selectedShow?.time} · {selectedShow?.format}
                </p>
              </div>

              {/* Line items */}
              <div className="space-y-2.5 text-xs">
                {/* Tickets */}
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Seats ({selectedSeats.map((s) => s.id).join(', ')})</span>
                  <span className="font-mono tabular-nums text-white">₹{subtotalTickets}</span>
                </div>

                {/* F&B */}
                {selectedConcessions.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    {selectedConcessions.map(({ item, qty }) => (
                      <div key={item.id} className="flex justify-between items-center text-zinc-400 text-[11px]">
                        <span>{item.name} × {qty}</span>
                        <span className="font-mono tabular-nums">₹{item.price * qty}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fees & Taxes */}
                <div className="pt-2 border-t border-white/5 space-y-1.5 text-zinc-400 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span>Convenience Fee (Booking Platform)</span>
                    <span className="font-mono tabular-nums">₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Integrated GST (18%)</span>
                    <span className="font-mono tabular-nums">₹{taxes}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm font-bold">
                  <span className="text-zinc-200">Amount Payable</span>
                  <span className="text-xl font-extrabold text-[#FFD900] font-mono tabular-nums">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Form Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (formError) setFormError(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-[#7FA35C]/50 bg-[#101511] text-[#FFD900] accent-[#FFD900] cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] leading-relaxed text-zinc-400">
                    I agree to the <span className="text-[#FFFC72] underline font-medium">Terms of Admission</span> and <span className="text-[#FFFC72] underline font-medium">Privacy Policy</span>. I verify that attendees meet certified film ratings.
                  </span>
                </label>
              </div>

              {/* Error Alert Message */}
              {formError && (
                <div className="p-3 rounded-lg bg-red-950/70 border border-red-500/80 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="flex-1 font-medium">{formError}</span>
                </div>
              )}

              {/* Pay Button / Loading Status */}
              <div className="pt-1">
                {processingStep === 'idle' ? (
                  <button
                    onClick={handlePayNow}
                    className="w-full py-3.5 rounded-lg text-sm font-bold bg-[#FFD900] text-[#080E09] hover:bg-[#FFFC72] shadow-glow-yellow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{grandTotal} & Claim Pass</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-lg bg-[#101511] border border-[#FFD900] space-y-2 text-center animate-in fade-in">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#FFD900]">
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFD900]" />
                      {processingStep === 'authorizing' && 'Contacting Payment Gateway...'}
                      {processingStep === 'locking' && 'Verifying HMAC Signature & Securing Seats...'}
                      {processingStep === 'confirmed' && 'Booking Confirmed! Generating Digital Pass...'}
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Do not refresh or close window. Concurrency locks active.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
