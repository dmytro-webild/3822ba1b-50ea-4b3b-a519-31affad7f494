export interface TasteRatings {
  sweetness: number; // 1 to 5
  acidity: number;   // 1 to 5
  tartness: number;  // 1 to 5
}

export interface Review {
  id: string;
  firstName: string;
  email: string; // Private - never displayed publicly
  product: string;
  rating: number; // 1 to 5
  tasteRatings: TasteRatings;
  comment: string;
  photoUrl: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
  contestEntry: boolean;
  contestWinnerRank?: 1 | 2 | 3;
}

export interface Voucher {
  code: string;
  discount: string; // e.g. "20 €"
  pointsCost: number;
  createdAt: string;
}

const STORAGE_KEY_REVIEWS = 'fv_customer_reviews_v1';
const STORAGE_KEY_POINTS = 'fv_loyalty_points_v1';
const STORAGE_KEY_VOUCHERS = 'fv_user_vouchers_v1';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    firstName: 'Maximilian S.',
    email: 'm.schmidt@example.de',
    product: 'FONTES VITEA Natural H2 (250 ml)',
    rating: 5,
    tasteRatings: { sweetness: 1, acidity: 1, tartness: 1 },
    comment: 'Unglaublich erfrischend und spürbarer Unterschied beim Ausdauersport! Man merkt die Reinheit des Quellwassers sofort. Trinke es jeden Tag vor meinem Lauf.',
    photoUrl: 'https://images.pexels.com/photos/4161894/pexels-photo-4161894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'approved',
    submittedAt: '2026-02-14T10:30:00.000Z',
    contestEntry: true,
    contestWinnerRank: 1,
  },
  {
    id: 'rev-2',
    firstName: 'Sophie M.',
    email: 'sophie.m@example.de',
    product: 'Kinderserie - Gingerix (Ingwer Tonic)',
    rating: 5,
    tasteRatings: { sweetness: 3, acidity: 2, tartness: 4 },
    comment: 'Der Gingerix aus der Kinderserie ist bei uns der absolute Favorit! Perfekte Ingwerschärfe ohne jeglichen zugesetzten Zucker. Die Dose sieht super stylisch aus!',
    photoUrl: 'https://images.pexels.com/photos/11022636/pexels-photo-11022636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'approved',
    submittedAt: '2026-02-12T14:15:00.000Z',
    contestEntry: true,
    contestWinnerRank: 2,
  },
  {
    id: 'rev-3',
    firstName: 'Alexander K.',
    email: 'alex.k@example.de',
    product: 'FONTES VITEA Sparkling H2 12er-Pack',
    rating: 5,
    tasteRatings: { sweetness: 1, acidity: 2, tartness: 1 },
    comment: 'Feine Perlage, genialer Geschmack und volle H2-Wasserstoff-Power. Der Versand war superschnell und die Dosen kamen perfekt verpackt an.',
    photoUrl: 'https://images.pexels.com/photos/39190728/pexels-photo-39190728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'approved',
    submittedAt: '2026-02-10T09:00:00.000Z',
    contestEntry: true,
    contestWinnerRank: 3,
  },
  {
    id: 'rev-4',
    firstName: 'Laura B.',
    email: 'laura.b@example.de',
    product: 'Kinderserie - Himbeerixa (Himbeere)',
    rating: 5,
    tasteRatings: { sweetness: 4, acidity: 2, tartness: 1 },
    comment: 'Fruchtige Himbeere mit quellfrischer Note! Meine Tochter liebt Himbeerixa nach dem Schulsport. 100% weiterzuempfehlen!',
    photoUrl: 'https://images.pexels.com/photos/4070215/pexels-photo-4070215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'approved',
    submittedAt: '2026-02-08T16:45:00.000Z',
    contestEntry: true,
  },
];

export function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_REVIEWS;
  }
}

export function saveReviews(reviews: Review[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    window.dispatchEvent(new Event('fv_feedback_updated'));
  } catch (e) {
    console.error('Failed to save reviews', e);
  }
}

export function getApprovedReviews(): Review[] {
  return getStoredReviews().filter((r) => r.status === 'approved');
}

export function addReview(newReview: Omit<Review, 'id' | 'status' | 'submittedAt'>): Review {
  const reviews = getStoredReviews();
  const created: Review = {
    ...newReview,
    id: 'rev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    status: 'pending', // Requires admin approval
    submittedAt: new Date().toISOString(),
  };
  reviews.unshift(created);
  saveReviews(reviews);
  return created;
}

export function updateReviewStatus(id: string, status: 'approved' | 'rejected') {
  const reviews = getStoredReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx !== -1) {
    reviews[idx].status = status;
    saveReviews(reviews);
  }
}

export function deleteReview(id: string) {
  const reviews = getStoredReviews();
  const filtered = reviews.filter((r) => r.id !== id);
  saveReviews(filtered);
}

export function setContestWinner(id: string, rank: 1 | 2 | 3 | undefined) {
  const reviews = getStoredReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx !== -1) {
    reviews[idx].contestWinnerRank = rank;
    saveReviews(reviews);
    // Award points automatically if rank given
    if (rank === 1) addLoyaltyPoints(100);
    else if (rank === 2) addLoyaltyPoints(50);
    else if (rank === 3) addLoyaltyPoints(20);
  }
}

// ─── Loyalty Points System ──────────────────────────────────────────────────

export function getLoyaltyPoints(): number {
  if (typeof window === 'undefined') return 170; // Default sample balance
  try {
    const val = localStorage.getItem(STORAGE_KEY_POINTS);
    if (val === null) {
      localStorage.setItem(STORAGE_KEY_POINTS, '170');
      return 170;
    }
    return parseInt(val, 10) || 0;
  } catch {
    return 170;
  }
}

export function addLoyaltyPoints(amount: number) {
  const current = getLoyaltyPoints();
  const updated = current + amount;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_POINTS, updated.toString());
    window.dispatchEvent(new Event('fv_points_updated'));
  }
}

export function getUserVouchers(): Voucher[] {
  if (typeof window === 'undefined') return [];
  try {
    const val = localStorage.getItem(STORAGE_KEY_VOUCHERS);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}

export function redeemVoucher(pointsCost: number, discountAmount: string): { success: boolean; code?: string; message?: string } {
  const currentPoints = getLoyaltyPoints();
  if (currentPoints < pointsCost) {
    return { success: false, message: `Nicht genug Treuepunkte! Sie benötigen ${pointsCost} Punkte.` };
  }

  const newPoints = currentPoints - pointsCost;
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `FV-GUT${discountAmount.replace(/[^0-9]/g, '')}-${randomSuffix}`;

  const vouchers = getUserVouchers();
  const newVoucher: Voucher = {
    code,
    discount: discountAmount,
    pointsCost,
    createdAt: new Date().toISOString(),
  };
  vouchers.unshift(newVoucher);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_POINTS, newPoints.toString());
    localStorage.setItem(STORAGE_KEY_VOUCHERS, JSON.stringify(vouchers));
    window.dispatchEvent(new Event('fv_points_updated'));
  }

  return { success: true, code };
}
