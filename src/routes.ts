export interface Route {
  path: string;
  label: string;
  pageFile: string;
}

export const routes: Route[] = [
  { path: '/', label: 'Home', pageFile: 'HomePage' },
  { path: '/studien', label: 'Wissenschaftliche Studien', pageFile: 'StudienPage' },
  { path: '/kontakt', label: 'Kontakt', pageFile: 'KontaktPage' },
  { path: '/impressum', label: 'Impressum', pageFile: 'ImpressumPage' },
];
