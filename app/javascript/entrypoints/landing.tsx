import '../styles/entrypoints/landing.scss';
import { createRoot } from 'react-dom/client';

import { LandingPage } from '../landing/components/LandingPage';

const container = document.getElementById('landing-root');

if (container) {
  const root = createRoot(container);
  root.render(<LandingPage />);
}
