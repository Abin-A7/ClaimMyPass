import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, Theatre, Show, Seat, ConcessionItem, BookingPass } from '../types';
import { CITIES, MOVIES, THEATRES, CONCESSIONS, getShowsForMovieAndTheatre, generateShowSeating } from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface BookingContextType {
  // Navigation & modals
  currentView: 'browse' | 'seats' | 'concessions' | 'payment' | 'ticket-pass' | 'my-passes' | '404';
  setCurrentView: (view: 'browse' | 'seats' | 'concessions' | 'payment' | 'ticket-pass' | 'my-passes' | '404') => void;
  selectedCity: (typeof CITIES)[0];
  setSelectedCity: (city: (typeof CITIES)[0]) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;

  // Toast notifications
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: () => void;

  // Selected entities
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  isMovieDetailOpen: boolean;
  setIsMovieDetailOpen: (open: boolean) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTheatre: Theatre | null;
  setSelectedTheatre: (theatre: Theatre | null) => void;
  selectedShow: Show | null;
  setSelectedShow: (show: Show | null) => void;

  // Seating & Holds
  currentSeats: Seat[];
  selectedSeatIds: string[];
  toggleSeatSelection: (seat: Seat) => void;
  holdSecondsLeft: number;
  isHoldActive: boolean;
  releaseHold: () => void;

  // Concessions
  concessionsCart: Record<string, number>;
  updateConcessionQty: (itemId: string, delta: number) => void;
  clearConcessions: () => void;

  // Calculations
  subtotalTickets: number;
  subtotalConcessions: number;
  convenienceFee: number;
  taxes: number;
  grandTotal: number;

  // Finalized passes & active pass
  activePass: BookingPass | null;
  setActivePass: (pass: BookingPass | null) => void;
  myPasses: BookingPass[];
  completeBooking: (customer: { name: string; phone: string; email: string; paymentMethod: string }) => BookingPass;
  cancelBookingPass: (bookingId: string) => void;

  // Navigation helpers
  startSeatBooking: (movie: Movie, theatre?: Theatre, show?: Show) => void;
  proceedToConcessions: () => void;
  proceedToPayment: () => void;
  returnToBrowse: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const LOCAL_STORAGE_PASSES_KEY = 'claimmypass_user_passes_v1';
const SESSION_STORAGE_HOLD_KEY = 'claimmypass_active_hold_v1';
const HOLD_DURATION_SECONDS = 600; // 10 minutes

interface StoredHoldSession {
  movieId: string;
  theatreId: string;
  showId: string;
  seatIds: string[];
  expiresAt: number; // absolute unix timestamp in ms
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'browse' | 'seats' | 'concessions' | 'payment' | 'ticket-pass' | 'my-passes' | '404'>('browse');
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const [currentSeats, setCurrentSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [holdExpiryTimestamp, setHoldExpiryTimestamp] = useState<number | null>(null);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(0);
  const [isHoldActive, setIsHoldActive] = useState<boolean>(false);

  const [concessionsCart, setConcessionsCart] = useState<Record<string, number>>({});
  const [activePass, setActivePass] = useState<BookingPass | null>(null);
  const [myPasses, setMyPasses] = useState<BookingPass[]>([]);

  // Initialize stored passes and restore active hold session across page reloads
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PASSES_KEY);
      if (stored) {
        setMyPasses(JSON.parse(stored));
      } else {
        const defaultPass: BookingPass = {
          bookingId: 'CMP-7829-4102',
          referenceHash: 'SHA256-e9b41fa80c2f3491b2c451da',
          movie: MOVIES[0],
          theatre: THEATRES[0],
          show: {
            id: 'demo-show-01',
            movieId: MOVIES[0].id,
            theatreId: THEATRES[0].id,
            screenName: 'AUDI 1 (IMAX Laser)',
            format: 'IMAX Laser 3D',
            date: new Date().toISOString().split('T')[0],
            time: '06:45 PM',
            basePrice: 420,
            pricing: { standard: 420, premium: 580, vip: 880 },
          },
          seats: [
            { id: 'H7', row: 'H', number: 7, tier: 'premium', price: 580, status: 'booked' },
            { id: 'H8', row: 'H', number: 8, tier: 'premium', price: 580, status: 'booked' },
          ],
          concessions: [],
          subtotalTickets: 1160,
          subtotalConcessions: 0,
          convenienceFee: 68,
          taxes: 221,
          totalPaid: 1449,
          bookedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          paymentMethod: 'UPI (Google Pay)',
          paymentId: 'pay_UPI_982401824',
          customerName: 'Aarav Sharma',
          customerPhone: '+91 98201 44521',
          customerEmail: 'aarav.sharma@example.com',
        };
        setMyPasses([defaultPass]);
        localStorage.setItem(LOCAL_STORAGE_PASSES_KEY, JSON.stringify([defaultPass]));
      }

      // Restore active hold from sessionStorage if valid
      const storedHold = sessionStorage.getItem(SESSION_STORAGE_HOLD_KEY);
      if (storedHold) {
        const parsed: StoredHoldSession = JSON.parse(storedHold);
        const remainingMs = parsed.expiresAt - Date.now();
        if (remainingMs > 0 && parsed.seatIds.length > 0) {
          const movie = MOVIES.find((m) => m.id === parsed.movieId) || MOVIES[0];
          const theatre = THEATRES.find((t) => t.id === parsed.theatreId) || THEATRES[0];
          const shows = getShowsForMovieAndTheatre(movie.id, theatre.id, new Date().toISOString().split('T')[0]);
          const show = shows.find((s) => s.id === parsed.showId) || shows[0];

          setSelectedMovie(movie);
          setSelectedTheatre(theatre);
          setSelectedShow(show);
          setSelectedSeatIds(parsed.seatIds);
          setHoldExpiryTimestamp(parsed.expiresAt);
          setHoldSecondsLeft(Math.floor(remainingMs / 1000));
          setIsHoldActive(true);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_HOLD_KEY);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  // Save passes to localStorage whenever changed
  const savePasses = (passes: BookingPass[]) => {
    setMyPasses(passes);
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSES_KEY, JSON.stringify(passes));
    } catch {
      // ignore
    }
  };

  // Generate seating grid when show changes
  useEffect(() => {
    if (selectedShow) {
      const generated = generateShowSeating(selectedShow.id, selectedShow.pricing);
      setCurrentSeats(generated);
    }
  }, [selectedShow]);

  // Real-time timestamp-based hold countdown timer
  useEffect(() => {
    if (!isHoldActive || !holdExpiryTimestamp) return;

    const tick = () => {
      const remainingMs = holdExpiryTimestamp - Date.now();
      const seconds = Math.max(0, Math.floor(remainingMs / 1000));
      setHoldSecondsLeft(seconds);

      if (seconds <= 0) {
        // Hold expired!
        setIsHoldActive(false);
        setHoldExpiryTimestamp(null);
        setSelectedSeatIds([]);
        sessionStorage.removeItem(SESSION_STORAGE_HOLD_KEY);
        if (selectedShow) {
          setCurrentSeats(generateShowSeating(selectedShow.id, selectedShow.pricing));
        }
        showToast('Your 10-minute seat lock expired. Seats returned to inventory.', 'error');
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isHoldActive, holdExpiryTimestamp, selectedShow]);

  // Toggle seat selection with automatic session storage sync
  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'booked' || seat.status === 'held') return;

    if (selectedSeatIds.includes(seat.id)) {
      const updated = selectedSeatIds.filter((id) => id !== seat.id);
      setSelectedSeatIds(updated);
      showToast(`Seat ${seat.id} released`, 'info');

      if (updated.length === 0) {
        setIsHoldActive(false);
        setHoldExpiryTimestamp(null);
        setHoldSecondsLeft(0);
        sessionStorage.removeItem(SESSION_STORAGE_HOLD_KEY);
      } else {
        // Keep existing expiry timestamp for remainder of hold
        const expiry = holdExpiryTimestamp || Date.now() + HOLD_DURATION_SECONDS * 1000;
        sessionStorage.setItem(
          SESSION_STORAGE_HOLD_KEY,
          JSON.stringify({
            movieId: selectedMovie?.id,
            theatreId: selectedTheatre?.id,
            showId: selectedShow?.id,
            seatIds: updated,
            expiresAt: expiry,
          })
        );
      }
    } else {
      if (selectedSeatIds.length >= 8) {
        showToast('Fair-usage policy: Maximum 8 seats per booking session.', 'error');
        return;
      }
      const updated = [...selectedSeatIds, seat.id];
      setSelectedSeatIds(updated);
      showToast(`Seat ${seat.id} (${seat.tier.toUpperCase()}) locked for 10 minutes`, 'success');

      const expiry = isHoldActive && holdExpiryTimestamp
        ? holdExpiryTimestamp
        : Date.now() + HOLD_DURATION_SECONDS * 1000;

      setIsHoldActive(true);
      setHoldExpiryTimestamp(expiry);
      setHoldSecondsLeft(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));

      sessionStorage.setItem(
        SESSION_STORAGE_HOLD_KEY,
        JSON.stringify({
          movieId: selectedMovie?.id,
          theatreId: selectedTheatre?.id,
          showId: selectedShow?.id,
          seatIds: updated,
          expiresAt: expiry,
        })
      );
    }
  };

  const releaseHold = () => {
    setSelectedSeatIds([]);
    setIsHoldActive(false);
    setHoldExpiryTimestamp(null);
    setHoldSecondsLeft(0);
    sessionStorage.removeItem(SESSION_STORAGE_HOLD_KEY);
  };

  // Concessions
  const updateConcessionQty = (itemId: string, delta: number) => {
    setConcessionsCart((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const clearConcessions = () => setConcessionsCart({});

  // Cost calculations
  const selectedSeats = currentSeats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotalTickets = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const subtotalConcessions = Object.entries(concessionsCart).reduce((acc, [itemId, qty]) => {
    const item = CONCESSIONS.find((c: ConcessionItem) => c.id === itemId);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const convenienceFee = selectedSeatIds.length > 0 ? selectedSeatIds.length * 34 : 0;
  const taxes = Math.round((subtotalTickets + subtotalConcessions + convenienceFee) * 0.18);
  const grandTotal = subtotalTickets + subtotalConcessions + convenienceFee + taxes;

  // Start booking flow
  const startSeatBooking = (movie: Movie, theatre?: Theatre, show?: Show) => {
    setSelectedMovie(movie);
    const chosenTheatre = theatre || THEATRES[0];
    setSelectedTheatre(chosenTheatre);

    const availableShows = getShowsForMovieAndTheatre(movie.id, chosenTheatre.id, selectedDate);
    const chosenShow = show || availableShows[0];
    setSelectedShow(chosenShow);

    setIsMovieDetailOpen(false);
    setCurrentView('seats');
  };

  const proceedToConcessions = () => {
    if (selectedSeatIds.length === 0) return;
    setCurrentView('concessions');
  };

  const proceedToPayment = () => {
    setCurrentView('payment');
  };

  const returnToBrowse = () => {
    releaseHold();
    clearConcessions();
    setCurrentView('browse');
  };

  const completeBooking = (customer: { name: string; phone: string; email: string; paymentMethod: string }) => {
    const concessionsList = Object.entries(concessionsCart)
      .map(([id, qty]) => ({
        item: CONCESSIONS.find((c: ConcessionItem) => c.id === id)!,
        quantity: qty,
      }))
      .filter((c) => Boolean(c.item));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const randomHash = Math.random().toString(36).substring(2, 10).toUpperCase();
    const pass: BookingPass = {
      bookingId: `CMP-${randomSuffix}-${Math.floor(1000 + Math.random() * 9000)}`,
      referenceHash: `SHA256-${randomHash}${Date.now().toString(16)}`,
      movie: selectedMovie!,
      theatre: selectedTheatre!,
      show: selectedShow!,
      seats: selectedSeats,
      concessions: concessionsList,
      subtotalTickets,
      subtotalConcessions,
      convenienceFee,
      taxes,
      totalPaid: grandTotal,
      bookedAt: new Date().toISOString(),
      paymentMethod: customer.paymentMethod,
      paymentId: `pay_${Math.random().toString(36).substring(2, 12)}`,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
    };

    const updatedPasses = [pass, ...myPasses];
    savePasses(updatedPasses);
    setActivePass(pass);
    setIsHoldActive(false);
    setHoldExpiryTimestamp(null);
    setHoldSecondsLeft(0);
    setSelectedSeatIds([]);
    clearConcessions();
    sessionStorage.removeItem(SESSION_STORAGE_HOLD_KEY);
    showToast(`Pass confirmed for ${pass.movie.title}! Tickets issued.`, 'success');
    setCurrentView('ticket-pass');
    return pass;
  };

  const cancelBookingPass = (bookingId: string) => {
    const updated = myPasses.filter((p) => p.bookingId !== bookingId);
    savePasses(updated);
    if (activePass?.bookingId === bookingId) {
      setActivePass(null);
    }
    showToast(`Booking ${bookingId} cancelled. 100% refund initiated to source.`, 'info');
  };

  return (
    <BookingContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCity,
        setSelectedCity,
        isCityModalOpen,
        setIsCityModalOpen,
        toast,
        showToast,
        dismissToast,
        selectedMovie,
        setSelectedMovie,
        isMovieDetailOpen,
        setIsMovieDetailOpen,
        selectedDate,
        setSelectedDate,
        selectedTheatre,
        setSelectedTheatre,
        selectedShow,
        setSelectedShow,
        currentSeats,
        selectedSeatIds,
        toggleSeatSelection,
        holdSecondsLeft,
        isHoldActive,
        releaseHold,
        concessionsCart,
        updateConcessionQty,
        clearConcessions,
        subtotalTickets,
        subtotalConcessions,
        convenienceFee,
        taxes,
        grandTotal,
        activePass,
        setActivePass,
        myPasses,
        completeBooking,
        cancelBookingPass,
        startSeatBooking,
        proceedToConcessions,
        proceedToPayment,
        returnToBrowse,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
