import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'HOME', path: '/', color: '#94a3b8' },           // slate-400
  { label: 'TECHNOLOGY', path: '/technology', color: '#38bdf8' },  // sky-400
  { label: 'MISSION', path: '/mission', color: '#ef4444' },       // red-500
  { label: 'EARN', path: '/blueprint', color: '#34d399' },   // emerald-400
  { label: 'PREVIEW', path: '/engine', color: '#2dd4bf' },         // teal-400
];

const NavBar = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#060912]/90 backdrop-blur-md border-b border-white/5"
      style={{ height: 'clamp(4rem, 6vw, 5rem)' }}
    >
      {/* AEIOS Logo - Left */}
      <div
        className="absolute flex items-center"
        style={{
          left: 'clamp(1rem, 2.5vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          gap: 'clamp(0.5rem, 1vw, 0.75rem)',
        }}
      >
        {/* AE Box */}
        <div
          className="relative flex items-center justify-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
          style={{
            width: 'clamp(1.5rem, 2vw, 2rem)',
            height: 'clamp(1.5rem, 2vw, 2rem)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-emerald-500/20"></div>
          <span
            className="font-mono font-bold text-slate-300 relative z-10"
            style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)' }}
          >
            AE
          </span>
        </div>

        {/* AEIOS text + System version */}
        <div className="flex flex-col">
          <span
            className="font-mono tracking-widest text-slate-300"
            style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
          >
            AEIOS
          </span>
          <span
            className="font-mono tracking-wider uppercase text-slate-600"
            style={{ fontSize: 'clamp(0.5rem, 1vw, 0.5625rem)' }}
          >
            System v1.0
          </span>
        </div>
      </div>

      {/* Nav Items - Centered */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
        style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}
      >
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
              style={{ gap: 'clamp(0.375rem, 0.75vw, 0.5rem)' }}
            >
              {/* Colored Sphere */}
              <div
                className="rounded-full flex-shrink-0 transition-all"
                style={{
                  width: 'clamp(0.375rem, 0.6vw, 0.5rem)',
                  height: 'clamp(0.375rem, 0.6vw, 0.5rem)',
                  backgroundColor: item.color,
                  boxShadow: isActive
                    ? `0 0 clamp(0.5rem, 1vw, 0.75rem) ${item.color}`
                    : `0 0 clamp(0.25rem, 0.5vw, 0.5rem) ${item.color}60`,
                }}
              />
              {/* Label */}
              <span
                className="font-mono font-medium tracking-wider uppercase transition-colors"
                style={{
                  color: isActive ? item.color : '#64748b',
                  fontSize: 'clamp(0.75rem, 1.4vw, 0.875rem)',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
