import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

interface WebsiteProps {
  children: ReactNode;
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Website = ({ children }: WebsiteProps) => {
  return (
    <div className="min-h-screen bg-[#060912]">
      <ScrollToTop />
      <NavBar />

      <main
        style={{
          minHeight: 'calc(100vh - clamp(4rem, 6vw, 5rem))',
          paddingTop: 'clamp(4rem, 6vw, 5rem)',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Website;
