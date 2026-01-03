import { ReactNode } from 'react';
import NavBar from './NavBar';

interface WebsiteProps {
  children: ReactNode;
}

const Website = ({ children }: WebsiteProps) => {
  return (
    <div className="min-h-screen bg-[#060912]">
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
