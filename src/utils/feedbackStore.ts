export interface TasteRatings {
  sweetness: number; // 1 to 5
  acidity: number;   // 1 to 5
  tartness: number;  // 1 to 5
}

export interface Review {
  id: string;
  firstName: string;
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

const STORAGE_KEY_REVIEWS = 'fv_customer_reviews_v1';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    firstName: 'Maximilian S.',
    product: 'FONTES VITEA H2 (250 ml)',
    rating: 5,
    tasteRatings: { sweetness: 1, acidity: 1, tartness: 1 },
    comment: 'Unglaublich erfrischend und spürbarer Unterschied beim Ausdauersport! Man merkt die Reinheit des Quellwassers sofort. Trinke es jeden Tag vor meinem Lauf.',
    photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795273945626-o7ea5p71.png',
    status: 'approved',
    submittedAt: '2026-02-14T10:30:00.000Z',
    contestEntry: true,
    contestWinnerRank: 1,
  },
  {
    id: 'rev-2',
    firstName: 'Sophie M.',
    product: 'Kinderserie - Gingerix (Ingwer Tonic)',
    rating: 5,
    tasteRatings: { sweetness: 3, acidity: 2, tartness: 4 },
    comment: 'Der Gingerix aus der Kinderserie ist bei uns der absolute Favorit! Perfekte Ingwerschärfe ohne jeglichen zugesetzten Zucker. Die Dose sieht super stylisch aus!',
    photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216737-r3370ev4.png',
    status: 'approved',
    submittedAt: '2026-02-12T14:15:00.000Z',
    contestEntry: true,
    contestWinnerRank: 2,
  },
  {
    id: 'rev-3',
    firstName: 'Alexander K.',
    product: 'FONTES VITEA  H2 12er-Pack',
    rating: 5,
    tasteRatings: { sweetness: 1, acidity: 2, tartness: 1 },
    comment: 'Feine Perlage, genialer Geschmack und volle H2-Wasserstoff-Power. Der Versand war superschnell und die Dosen kamen perfekt verpackt an.',
    photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795273945626-o7ea5p71.png',
    status: 'approved',
    submittedAt: '2026-02-10T09:00:00.000Z',
    contestEntry: true,
    contestWinnerRank: 3,
  },
  {
    id: 'rev-4',
    firstName: 'Laura B.',
    product: 'Kinderserie - Himbeerixa (Himbeere)',
    rating: 5,
    tasteRatings: { sweetness: 4, acidity: 2, tartness: 1 },
    comment: 'Fruchtige Himbeere mit quellfrischer Note! Meine Tochter liebt Himbeerixa nach dem Schulsport. 100% weiterzuempfehlen!',
    photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png',
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
    const parsed: Review[] = JSON.parse(data);
    let updated = false;
    const migrated = parsed.map((rev) => {
      if (
        rev.photoUrl === 'https://images.pexels.com/photos/4161894/pexels-photo-4161894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' ||
        rev.photoUrl === 'https://images.pexels.com/photos/39190728/pexels-photo-39190728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' ||
        rev.photoUrl === 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795135314654-0dzt7sqw.png'
      ) {
        updated = true;
        return { ...rev, photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795273945626-o7ea5p71.png' };
      }
      if (rev.photoUrl === 'https://images.pexels.com/photos/11022636/pexels-photo-11022636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' || rev.photoUrl === 'https://images.pexels.com/photos/4070215/pexels-photo-4070215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940') {
        updated = true;
        return { ...rev, photoUrl: 'https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795133216740-l82r4ka1.png' };
      }
      if (rev.id === 'rev-1' && rev.product === 'FONTES VITEA Natural H2 (250 ml)') {
        updated = true;
        return { ...rev, product: 'FONTES VITEA H2 (250 ml)' };
      }
      if (rev.id === 'rev-3' && rev.product === 'FONTES VITEA Sparkling H2 12er-Pack') {
        updated = true;
        return { ...rev, product: 'FONTES VITEA  H2 12er-Pack' };
      }
      return rev;
    });
    if (updated) {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(migrated));
    }
    return migrated;
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
  }
}
