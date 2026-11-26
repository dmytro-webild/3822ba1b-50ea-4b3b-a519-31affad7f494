export interface TasteRatings {
  sweetness: number; // 1 to 5
  acidity: number;   // 1 to 5
  tartness: number;  // 1 to 5
  intensity: number; // 1 to 5
}

export interface Review {
  id: string;
  firstName: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  product: string;
  productImage?: string;
  rating: number; // 1 to 5
  tasteRatings: TasteRatings;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
  consent: boolean;
}

const STORAGE_KEY_REVIEWS = 'fv_customer_reviews_v2';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    firstName: 'Maximilian S.',
    product: 'FONTES VITAE H2 (250 ml)',
    productImage: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png',
    rating: 5,
    tasteRatings: { sweetness: 1, acidity: 1, tartness: 1, intensity: 5 },
    comment: 'Unglaublich erfrischend und spürbarer Unterschied beim Ausdauersport! Man merkt die Reinheit des Quellwassers sofort. Trinke es jeden Tag vor meinem Lauf.',
    status: 'approved',
    submittedAt: '2026-02-14T10:30:00.000Z',
    consent: true,
  },
  {
    id: 'rev-2',
    firstName: 'Sophie M.',
    product: 'Kinderserie - Gingerix (Ingwer Tonic)',
    productImage: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png',
    rating: 5,
    tasteRatings: { sweetness: 3, acidity: 2, tartness: 4, intensity: 4 },
    comment: 'Der Gingerix aus der Kinderserie ist bei uns der absolute Favorit! Perfekte Ingwerschärfe ohne jeglichen zugesetzten Zucker. Die Dose sieht super stylisch aus!',
    status: 'approved',
    submittedAt: '2026-02-12T14:15:00.000Z',
    consent: true,
  },
  {
    id: 'rev-3',
    firstName: 'Alexander K.',
    product: 'FONTES VITAE Blaubeere (Blueberry)',
    productImage: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795134384024-101x5eut.png',
    rating: 5,
    tasteRatings: { sweetness: 4, acidity: 2, tartness: 2, intensity: 5 },
    comment: 'Intensiver Blaubeergeschmack und genial erfrischende Quellwasserbasis. Superschneller Versand und beste Qualität.',
    status: 'approved',
    submittedAt: '2026-02-10T09:00:00.000Z',
    consent: true,
  },
  {
    id: 'rev-4',
    firstName: 'Laura B.',
    product: 'Kinderserie - Himbeerixa (Himbeere)',
    productImage: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png',
    rating: 5,
    tasteRatings: { sweetness: 4, acidity: 2, tartness: 1, intensity: 4 },
    comment: 'Fruchtige Himbeere mit quellfrischer Note! Meine Tochter liebt Himbeerixa nach dem Schulsport. 100% weiterzuempfehlen!',
    status: 'approved',
    submittedAt: '2026-02-08T16:45:00.000Z',
    consent: true,
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
    const parsed: Review[] = JSON.parse(data);
    return parsed;
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
    status: 'approved', // Direct publication upon submit!
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
