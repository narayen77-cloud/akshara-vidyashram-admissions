import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TalentriaPage from './components/talentria/TalentriaPage.tsx';
import './index.css';

function Root() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.toLowerCase();
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname.toLowerCase());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Match /talentria-26 or /talentria-26/
  const isTalentria = 
    pathname === '/talentria-26' || 
    pathname.startsWith('/talentria-26/') || 
    pathname === '/talentria' || 
    pathname.startsWith('/talentria/');

  if (isTalentria) {
    return <TalentriaPage />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
