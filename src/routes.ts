export interface Route {
  path: string;
  label: string;
  pageFile: string;
}

export const routes: Route[] = [
  { path: '/', label: 'Home', pageFile: 'HomePage' },
  { path: '/feedback-faq', label: 'Feedback & FAQ', pageFile: 'FeedbackFaqPage' },
  { path: '/ueber-uns', label: 'Über uns', pageFile: 'UeberUnsPage' },
  { path: '/wissenschaft', label: 'Wissenschaft & Studien', pageFile: 'WissenschaftPage' },
  { path: '/kontakt', label: 'Kontakt', pageFile: 'KontaktPage' },
  { path: '/impressum', label: 'Impressum', pageFile: 'ImpressumPage' },
];
