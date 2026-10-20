import { Movie, Theatre, Show, ConcessionItem, Seat, SeatTier } from '../types';

export const HERO_BACKDROP = '/src/assets/images/cinema_hero_backdrop_1792508916870.jpg';

export const CITIES = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', cinemasCount: 42 },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', cinemasCount: 38 },
  { id: 'delhi', name: 'Delhi-NCR', state: 'Delhi', cinemasCount: 45 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', cinemasCount: 32 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', cinemasCount: 29 },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', cinemasCount: 18 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', cinemasCount: 24 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', cinemasCount: 22 },
];

export const MOVIES: Movie[] = [
  {
    id: 'movie-dune-tempest',
    title: "Dune's Tempest: Arrakis",
    tagline: 'The Spice Must Flow Across Endless Sands',
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    durationMinutes: 166,
    rating: 8.9,
    certification: 'U/A 16+',
    releaseDate: '2026-10-18',
    synopsis:
      'As colossal spice tempests envelop the northern hemisphere of Arrakis, Paul Atreides and the Fremen lead a clandestine campaign across uncharted desert sectors to safeguard the ancient sand worms.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['IMAX Laser 3D', 'Dolby Cinema', '4DX', '2D'],
    posterUrl: '/src/assets/images/movie_dune_chronicles_1792508917172.jpg',
    backdropUrl: HERO_BACKDROP,
    trendingRank: 1,
  },
  {
    id: 'movie-nightfall-op',
    title: 'Nightfall Operative',
    tagline: 'The Future is Rain-Slicked & Lethal',
    genre: ['Neo-Noir', 'Thriller', 'Cyberpunk'],
    durationMinutes: 142,
    rating: 8.7,
    certification: 'A',
    releaseDate: '2026-10-15',
    synopsis:
      'In a nocturnal megacity ruled by autonomous mega-corporations, an exiled counter-intel operative uncovers an encrypted neural protocol that could wipe the memory of an entire district.',
    director: 'Alexandre Morvan',
    cast: ['Kaelen Reed', 'Maya Chen', 'Elias Voss', 'Hana Lindqvist'],
    languages: ['English', 'Japanese (Subtitled)', 'Hindi'],
    formats: ['Dolby Cinema', 'IMAX Laser 3D', '2D'],
    posterUrl: '/src/assets/images/movie_neon_syndicate_1792508917690.jpg',
    backdropUrl: HERO_BACKDROP,
    trendingRank: 2,
  },
  {
    id: 'movie-tree-ancients',
    title: 'Tree of Ancients',
    tagline: 'Awaken the Forgotten Guardians of Eldoria',
    genre: ['Fantasy', 'Adventure', 'Mystery'],
    durationMinutes: 135,
    rating: 8.5,
    certification: 'U',
    releaseDate: '2026-10-10',
    synopsis:
      'Three companions venture into the shrouded Primeval Canopy where a thousand-year slumber is broken by an ancient colossal entity commanding elemental woodland energy.',
    director: 'K.A. Aris',
    cast: ['Elara Vance', 'Maelor Cole', 'Isolde Reed', 'Leo Reeves'],
    languages: ['English', 'Hindi', 'Malayalam', 'Kannada'],
    formats: ['IMAX Laser 3D', '3D', '2D'],
    posterUrl: '/src/assets/images/movie_verdant_realm_1792508919411.jpg',
    backdropUrl: HERO_BACKDROP,
    trendingRank: 3,
  },
  {
    id: 'movie-velocity-drift',
    title: 'Velocity: Drift Neon',
    tagline: 'Live Fast. Drift Hard.',
    genre: ['Action', 'Motorsport', 'Crime'],
    durationMinutes: 128,
    rating: 8.3,
    certification: 'U/A 13+',
    releaseDate: '2026-10-12',
    synopsis:
      'Underground midnight street racers across Tokyo and Singapore enter an unsanctioned hyper-modified circuit with experimental turbine-boosted engines and titanium sparks.',
    director: 'Ryker Stone',
    cast: ['Mia Luna', 'Alexei Volkov', 'Javin Mrging', 'Wrtay Baran'],
    languages: ['English', 'Hindi'],
    formats: ['4DX', 'Dolby Cinema', '2D'],
    posterUrl: '/src/assets/images/movie_velocity_drift_1792508918758.jpg',
    backdropUrl: HERO_BACKDROP,
    trendingRank: 4,
  },
];

export const THEATRES: Theatre[] = [
  {
    id: 'th-pvrlaser-01',
    name: 'PVR INOX Director’s Cut Grand Palladium',
    chain: 'PVR INOX',
    city: 'mumbai',
    location: 'Lower Parel, High Street Phoenix',
    distanceKm: 2.4,
    facilities: ['IMAX with Laser', 'Dolby Atmos 64ch', 'VIP Recliners', 'Gourmet Kitchen'],
  },
  {
    id: 'th-cinepolis-02',
    name: 'Cinépolis VIP Dolby Cinema Nexus',
    chain: 'Cinépolis',
    city: 'mumbai',
    location: 'Andheri West, Fun Republic',
    distanceKm: 5.1,
    facilities: ['Dolby Cinema 4K', 'Macro XE', 'Butler-on-Seat', 'Valet Parking'],
  },
  {
    id: 'th-inox-03',
    name: 'PVR ICON Gold Screen Megaplex',
    chain: 'PVR INOX',
    city: 'mumbai',
    location: 'Versova, Infinti Mall',
    distanceKm: 7.8,
    facilities: ['4DX Dynamic Motion', 'RGB Laser 4K', 'Dolby Atmos'],
  },
  {
    id: 'th-bengaluru-01',
    name: 'PVR Superplex IMAX Forum South',
    chain: 'PVR INOX',
    city: 'bengaluru',
    location: 'Kanakapura Road, Konanakunte',
    distanceKm: 3.2,
    facilities: ['IMAX Laser 12-channel', 'Playhouse', 'LUXE Dine-In'],
  },
  {
    id: 'th-bengaluru-02',
    name: 'Cinépolis VIP Orion Mall',
    chain: 'Cinépolis',
    city: 'bengaluru',
    location: 'Dr Rajkumar Road, Rajajinagar',
    distanceKm: 6.4,
    facilities: ['Dolby Atmos', 'Recliner Loungers', 'Coffee Bar'],
  },
];

export function getShowsForMovieAndTheatre(movieId: string, theatreId: string, date: string): Show[] {
  return [
    {
      id: `show-${movieId}-${theatreId}-1030`,
      movieId,
      theatreId,
      screenName: 'AUDI 1 (IMAX Laser)',
      format: 'IMAX Laser 3D',
      date,
      time: '10:30 AM',
      basePrice: 380,
      pricing: { standard: 380, premium: 520, vip: 790 },
    },
    {
      id: `show-${movieId}-${theatreId}-1415`,
      movieId,
      theatreId,
      screenName: 'AUDI 2 (Dolby Atmos)',
      format: 'Dolby Cinema',
      date,
      time: '02:15 PM',
      basePrice: 350,
      pricing: { standard: 350, premium: 480, vip: 720 },
    },
    {
      id: `show-${movieId}-${theatreId}-1845`,
      movieId,
      theatreId,
      screenName: 'AUDI 1 (IMAX Laser)',
      format: 'IMAX Laser 3D',
      date,
      time: '06:45 PM',
      basePrice: 420,
      pricing: { standard: 420, premium: 580, vip: 880 },
    },
    {
      id: `show-${movieId}-${theatreId}-2215`,
      movieId,
      theatreId,
      screenName: 'AUDI 3 (4DX Motion)',
      format: '4DX',
      date,
      time: '10:15 PM',
      basePrice: 400,
      pricing: { standard: 400, premium: 550, vip: 850 },
    },
  ];
}

// Generates an auditorium seating layout with rows, tiers, and some realistic pre-booked/held seats
export function generateShowSeating(showId: string, pricing: { standard: number; premium: number; vip: number }): Seat[] {
  // Deterministic seed simulation based on showId length/chars
  const seed = showId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const seats: Seat[] = [];

  const tierRowConfig: { row: string; tier: SeatTier; price: number; seatCount: number }[] = [
    // VIP Rows (Back rows, luxurious recliner views)
    { row: 'K', tier: 'vip', price: pricing.vip, seatCount: 12 },
    { row: 'J', tier: 'vip', price: pricing.vip, seatCount: 12 },
    // Premium Rows (Middle sweet spot)
    { row: 'H', tier: 'premium', price: pricing.premium, seatCount: 14 },
    { row: 'G', tier: 'premium', price: pricing.premium, seatCount: 14 },
    { row: 'F', tier: 'premium', price: pricing.premium, seatCount: 14 },
    { row: 'E', tier: 'premium', price: pricing.premium, seatCount: 14 },
    // Standard Rows (Front rows)
    { row: 'D', tier: 'standard', price: pricing.standard, seatCount: 14 },
    { row: 'C', tier: 'standard', price: pricing.standard, seatCount: 14 },
    { row: 'B', tier: 'standard', price: pricing.standard, seatCount: 12 },
    { row: 'A', tier: 'standard', price: pricing.standard, seatCount: 10 },
  ];

  tierRowConfig.forEach((cfg) => {
    for (let num = 1; num <= cfg.seatCount; num++) {
      const seatId = `${cfg.row}${num}`;
      // Pseudo-random deterministic status
      const hash = (seed * 17 + cfg.row.charCodeAt(0) * 31 + num * 7) % 100;
      let status: Seat['status'] = 'available';

      if (hash < 24) {
        status = 'booked';
      } else if (hash >= 24 && hash < 30) {
        status = 'held'; // Held by another user with live countdown
      }

      seats.push({
        id: seatId,
        row: cfg.row,
        number: num,
        tier: cfg.tier,
        price: cfg.price,
        status,
        heldBy: status === 'held' ? 'other-session' : undefined,
      });
    }
  });

  return seats;
}

export const CONCESSIONS: ConcessionItem[] = [
  {
    id: 'fnb-popcorn-truffle',
    name: 'Black Truffle Gourmet Popcorn (Large)',
    category: 'Popcorn',
    description: 'Freshly popped jumbo kernels infused with Italian white truffle oil and sea salt flakes.',
    price: 360,
    imageEmoji: '🍿',
    isVeg: true,
  },
  {
    id: 'fnb-popcorn-caramel',
    name: 'Artisanal Caramel Crunch Popcorn',
    category: 'Popcorn',
    description: 'Double-glazed golden cane caramel coated popcorn with Madagascar vanilla hint.',
    price: 340,
    imageEmoji: '🍿',
    isVeg: true,
  },
  {
    id: 'fnb-nacho-supremo',
    name: 'Nacho Grande with Warm Queso Dip',
    category: 'Snacks',
    description: 'Stone-ground yellow corn tortilla chips served with melted jalapeño cheese and chunky salsa.',
    price: 320,
    imageEmoji: '🧀',
    isVeg: true,
  },
  {
    id: 'fnb-combo-couples',
    name: 'Blockbuster Duo Combo',
    category: 'Combos',
    description: '1 Large Tub (Truffle or Salted) + 2 Large Fountain Sodas (Pepsi/Mirinda/7Up) + 1 Nachos.',
    price: 680,
    imageEmoji: '🎬',
    isVeg: true,
  },
  {
    id: 'fnb-coldbrew-latte',
    name: 'Artisan Cold Brew Iced Coffee',
    category: 'Beverages',
    description: '16-hour slow-steeped Arabica beans over crystal ice with almond milk or whole milk.',
    price: 240,
    imageEmoji: '☕',
    isVeg: true,
  },
  {
    id: 'fnb-craft-soda',
    name: 'Sparkling Yuzu Blood Orange Cooler',
    category: 'Beverages',
    description: 'Natural fizzy citrus refresher with mint sprigs and Himalayan pink salt rim.',
    price: 220,
    imageEmoji: '🥤',
    isVeg: true,
  },
];
