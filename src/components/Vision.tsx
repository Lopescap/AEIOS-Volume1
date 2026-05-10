import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// HOVER SLAT BUTTON COMPONENT
// ============================================
interface HoverSlatButtonProps {
  initialText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
}

const HoverSlatButton: React.FC<HoverSlatButtonProps> = ({
  initialText,
  hoverText,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (initialText.length !== hoverText.length) {
    console.error("Initial and hover text must have the same length.");
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
        border: '1px solid rgba(16,185,129,0.6)',
        boxShadow: isHovered
          ? '0 0 30px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.2)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {initialText.split("").map((char, index) => (
        <div
          key={index}
          className="relative w-5 h-12 flex items-center justify-center text-sm font-bold overflow-hidden font-mono"
          style={{
            color: '#ffffff',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
            style={{
              background: '#0a0a0a',
              color: '#10b981',
              textShadow: '0 0 8px #10b981',
              transform: isHovered
                ? "translateY(0)"
                : index % 2 === 0
                ? "translateY(-100%)"
                : "translateY(100%)",
            }}
          >
            {hoverText[index]}
          </div>
          {char}
        </div>
      ))}
    </button>
  );
};

// ============================================
// SNOWFLAKE COMPONENT
// ============================================
interface SnowflakeProps {
  id: number;
  size: number;
  left: number;
  animationDuration: number;
  opacity: number;
  windOffset: number;
}

const Snowflake = ({ id, size, left, animationDuration, opacity }: SnowflakeProps) => {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        opacity,
        color: '#ffffff',
        animation: `snowfall-${id} ${animationDuration}s linear infinite`,
        textShadow: '0 0 2px rgba(255,255,255,0.5)',
      }}
    >
      ❄
    </div>
  );
};

// ============================================
// REVEAL ANIMATION COMPONENT
// ============================================
const RevealScreen = ({ visible, onComplete }: { visible: boolean; onComplete?: () => void }) => {
  const [revealPhase, setRevealPhase] = useState(0);
  const [sphereAtNav, setSphereAtNav] = useState<boolean[]>([false, false, false, false]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!visible) {
      setRevealPhase(0);
      setSphereAtNav([false, false, false, false]);
      return;
    }

    const t1 = setTimeout(() => setRevealPhase(1), 100);
    const t2 = setTimeout(() => setRevealPhase(2), 1200);
    const t3 = setTimeout(() => setRevealPhase(3), 2200);
    const t4 = setTimeout(() => setRevealPhase(4), 2800);

    const t5 = setTimeout(() => setSphereAtNav([true, false, false, false]), 3200);
    const t6 = setTimeout(() => setSphereAtNav([true, true, false, false]), 3600);
    const t7 = setTimeout(() => setSphereAtNav([true, true, true, false]), 4000);
    const t8 = setTimeout(() => setSphereAtNav([true, true, true, true]), 4400);

    const tComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5100);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8, tComplete].forEach(clearTimeout);
    };
  }, [visible, onComplete]);

  const navItems = [
    { num: '01', label: 'HOME', color: '#94a3b8' },
    { num: '02', label: 'TECHNOLOGY', color: '#38bdf8' },
    { num: '03', label: 'MISSION', color: '#ef4444' },
    { num: '04', label: 'PREVIEW', color: '#2dd4bf' },
  ];

  const logoInNav = revealPhase >= 4;

  return (
    <div
      className="fixed inset-0 bg-[#060912] z-[100] transition-opacity duration-1000 overflow-hidden"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      {/* SYSTEM ONLINE */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{
          opacity: revealPhase >= 1 && revealPhase < 3 ? 1 : 0,
          transform: 'translateY(-5rem)',
        }}
      >
        <p className="font-mono uppercase text-sky-500/60 text-xs tracking-[0.5em]">
          SYSTEM ONLINE
        </p>
      </div>

      {/* AEIOS Logo */}
      <div
        className="absolute flex items-center transition-all duration-700 ease-out z-10"
        style={{
          opacity: revealPhase >= 1 ? 1 : 0,
          left: logoInNav ? 'clamp(1rem, 2.5vw, 1.5rem)' : '50%',
          top: logoInNav ? 'clamp(3rem, 4.5vw, 3.75rem)' : '50%',
          transform: logoInNav ? 'translateY(-50%)' : 'translate(-50%, -50%)',
        }}
      >
        <img
          src="/logo.svg"
          alt="AEIOS"
          className="transition-all duration-500"
          style={{
            height: logoInNav ? 'clamp(4rem, 7vw, 5.5rem)' : 'clamp(10rem, 24vw, 16rem)',
            width: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Spheres */}
      {navItems.map((item, idx) => {
        const isVisible = revealPhase >= 2;
        const isAtNav = sphereAtNav[idx];
        // Initial positions: place dots at explicit percentage positions for even spacing
        // 4 dots at: 12.5%, 37.5%, 62.5%, 87.5% (25% apart, perfectly equidistant)
        const mobilePositions = ['12.5%', '37.5%', '62.5%', '87.5%'];
        const desktopCenterOffset = `${(idx - 1.5) * 9}rem`; // rem between dots for desktop
        // Nav position: use rem for consistent spacing matching NavBar
        const mobileNavSpacing = 2.5; // rem - matches NavBar's 40px center-to-center
        const desktopNavSpacing = 10; // rem
        const navPosition = `${(idx - 1.5) * (isMobile ? mobileNavSpacing : desktopNavSpacing)}rem`;
        const appearDelay = idx * 150;

        // Calculate initial left position
        const initialLeft = isMobile
          ? mobilePositions[idx]
          : `calc(50% + ${desktopCenterOffset})`;

        return (
          <div
            key={idx}
            className="absolute flex items-center transition-all ease-out"
            style={{
              left: isAtNav ? `calc(50% + ${navPosition})` : initialLeft,
              top: isAtNav ? 'clamp(2rem, 3vw, 2.5rem)' : 'calc(50% + 5rem)',
              transform: 'translate(-50%, -50%)',
              opacity: isVisible ? 1 : 0,
              transition: 'left 500ms ease-out, top 500ms ease-out, opacity 400ms',
              transitionDelay: isVisible && !isAtNav ? `${appearDelay}ms` : '0ms',
              zIndex: isAtNav ? 10 : 5,
            }}
          >
            <div
              className="rounded-full flex-shrink-0 transition-all duration-300"
              style={{
                width: isAtNav ? '0.5rem' : '1.5rem',
                height: isAtNav ? '0.5rem' : '1.5rem',
                backgroundColor: item.color,
                boxShadow: isAtNav
                  ? `0 0 0.5rem ${item.color}60`
                  : `0 0 1.25rem ${item.color}80, inset -3px -3px 8px rgba(0,0,0,0.4), inset 3px 3px 8px rgba(255,255,255,0.2)`,
              }}
            />
            {/* Labels - only show on desktop when at nav position */}
            <div
              className="flex items-center transition-all duration-300"
              style={{
                display: isMobile ? 'none' : undefined,
                opacity: isAtNav ? 1 : 0,
                transform: isAtNav ? 'translateX(0)' : 'translateX(-10px)',
                transitionDelay: isAtNav ? '200ms' : '0ms',
                marginLeft: '0.5rem',
              }}
            >
              <span
                className="font-mono font-medium tracking-wider uppercase"
                style={{ color: idx === 0 ? item.color : '#64748b', fontSize: '0.875rem' }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Nav bar background */}
      <div
        className="absolute top-0 left-0 right-0 bg-[#060912]/90 backdrop-blur-md border-b border-white/5 transition-opacity duration-700"
        style={{ opacity: sphereAtNav[4] ? 1 : 0, height: 'clamp(4rem, 6vw, 5rem)', zIndex: 1 }}
      />
    </div>
  );
};

// ============================================
// STEP DATA INTERFACE
// ============================================
interface StepLine {
  text: string;
  emphasis: boolean;
}

interface StepStat {
  value: string;
  label: string;
}

interface Step {
  type: 'full' | 'closing';
  section: string;
  label?: string;
  title?: string;
  lines?: StepLine[];
  stats?: StepStat[];
}

// ============================================
// CHAPTER COMPONENT
// ============================================
const Chapter = ({ step, index, isVisible, onEnter }: { step: Step; index: number; isVisible: boolean; onEnter?: () => void }) => {
  const accentColor = '#64748b';

  return (
    <section
      className="min-h-screen w-full flex flex-col justify-center items-center relative"
      style={{
        paddingTop: 'clamp(4rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        paddingLeft: 'clamp(1rem, 3vw, 4rem)',
        paddingRight: 'clamp(1rem, 3vw, 4rem)',
      }}
    >
      <div
        className="max-w-3xl mx-auto w-full transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0.3,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {step.type === 'full' && (
          <>
            <div className="text-center mb-8 md:mb-12">
              <p
                className="font-mono text-slate-600 uppercase mb-2"
                style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)', letterSpacing: '0.3em' }}
              >
                {step.label}
              </p>
              <h2
                className="font-mono text-white uppercase"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', letterSpacing: '0.2em' }}
              >
                {step.title}
              </h2>
            </div>
            <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
              {step.lines?.map((line, idx) => (
                <p
                  key={idx}
                  className="font-light leading-relaxed"
                  style={{
                    color: line.emphasis ? '#cbd5e1' : '#64748b',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                  }}
                >
                  {line.text}
                </p>
              ))}
            </div>
            {step.stats && (
              <div className="flex justify-center flex-wrap gap-6 md:gap-12">
                {step.stats.map((stat, idx) => (
                  <div key={idx} className="text-center min-w-[5rem]">
                    <div
                      className="font-mono font-bold mb-1"
                      style={{ color: accentColor, fontSize: 'clamp(1.25rem, 4vw, 2.25rem)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-500" style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.875rem)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {step.type === 'closing' && (
          <>
            <div className="text-center mb-8 md:mb-12">
              <p
                className="font-mono text-slate-600 uppercase"
                style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)', letterSpacing: '0.3em' }}
              >
                {step.label}
              </p>
            </div>
            <div className="text-center space-y-6 md:space-y-8">
              {step.lines?.map((line, idx) => (
                <p
                  key={idx}
                  className="font-light leading-relaxed tracking-tight"
                  style={{
                    color: line.emphasis ? '#10b981' : '#94a3b8',
                    fontSize: 'clamp(1rem, 3.5vw, 1.875rem)',
                  }}
                >
                  {line.text}
                </p>
              ))}
            </div>
            {onEnter && (
              <div className="flex justify-center mt-12">
                <HoverSlatButton
                  initialText=" ENTER AEIOS "
                  hoverText="  SYSTEM V.1 "
                  onClick={onEnter}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="absolute bottom-6 right-6 opacity-40">
        <p className="font-mono tracking-wider uppercase" style={{ color: accentColor, fontSize: '0.625rem' }}>
          {step.section}
        </p>
      </div>
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
interface VisionProps {
  onAnimationComplete?: () => void;
}

const Vision: React.FC<VisionProps> = ({ onAnimationComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps: Step[] = [
    {
      type: 'full',
      section: 'prologue',
      label: 'PROLOGUE',
      title: 'THE FACTORY MODEL',
      lines: [
        { text: 'In 1892, ten men sat in a room and decided what American children would learn.', emphasis: false },
        { text: 'The Committee of Ten. Tasked with standardizing education for an industrial economy.', emphasis: false },
        { text: 'Batch processing. Age-based cohorts. Bell schedules. Rows of desks.', emphasis: true },
        { text: 'A system built for factories. Not futures.', emphasis: false },
      ],
      stats: [
        { value: '1892', label: 'Year designed' },
        { value: '132', label: 'Years unchanged' },
        { value: '50M', label: 'Children daily' },
      ]
    },
    {
      type: 'full',
      section: 'illusion',
      label: 'CHAPTER 01',
      title: 'THE COMPETENCE ILLUSION',
      lines: [
        { text: 'GPAs are at record highs. 3.36 average. 90% earning A\'s and B\'s.', emphasis: false },
        { text: '89% of students believe they\'re ready for college.', emphasis: false },
        { text: 'Less than 30% actually are.', emphasis: true },
      ],
      stats: [
        { value: '3.36', label: 'Avg GPA (record)' },
        { value: '30%', label: 'Actually ready' },
        { value: '89%', label: 'Think they are' },
      ]
    },
    {
      type: 'full',
      section: 'truth',
      label: 'CHAPTER 02',
      title: 'THE TRUTH',
      lines: [
        { text: 'ACT scores just hit a 30-year low.', emphasis: false },
        { text: '43% of test-takers met none of the college readiness benchmarks.', emphasis: true },
        { text: 'Not one. English, reading, math, science — zero.', emphasis: false },
      ],
      stats: [
        { value: '19.5', label: 'ACT avg (lowest since \'93)' },
        { value: '43%', label: 'Zero benchmarks' },
        { value: '6 yrs', label: 'Consecutive decline' },
      ]
    },
    {
      type: 'full',
      section: 'proof1',
      label: 'CHAPTER 03',
      title: 'THE PROOF PART 1',
      lines: [
        { text: '40% of college freshmen need remedial courses.', emphasis: false },
        { text: 'Paying tuition to relearn 9th grade material.', emphasis: true },
        { text: 'Less than 10% of remediated students graduate on time.', emphasis: false },
      ],
      stats: [
        { value: '40%', label: 'Need remediation' },
        { value: '<10%', label: 'Graduate on time' },
        { value: '$7B', label: 'Annual cost' },
      ]
    },
    {
      type: 'full',
      section: 'proof2',
      label: 'CHAPTER 04',
      title: 'THE PROOF PART 2',
      lines: [
        { text: 'Singapore scores 575. The U.S. scores 465.', emphasis: false },
        { text: 'That\'s 110 points. Four years of learning.', emphasis: true },
        { text: '41% of Singapore\'s students reach advanced math. U.S., it\'s 7%.', emphasis: false },
      ],
      stats: [
        { value: '#28', label: 'Global rank' },
        { value: '110 pts', label: 'Behind #1' },
        { value: '7%', label: 'Advanced math' },
      ]
    },
    {
      type: 'full',
      section: 'cost',
      label: 'CHAPTER 05',
      title: 'THE COST',
      lines: [
        { text: 'The U.S. spends $927 billion on K-12 education. Every year.', emphasis: false },
        { text: '$20,322 per student. Among the highest in the world.', emphasis: true },
        { text: 'The result? 22% math proficiency. 35% reading proficiency.', emphasis: false },
      ],
      stats: [
        { value: '$927B', label: 'Annual spend' },
        { value: '$20K+', label: 'Per pupil' },
        { value: '22%', label: 'Math proficient' },
      ]
    },
    {
      type: 'full',
      section: 'exodus',
      label: 'CHAPTER 06',
      title: 'THE EXODUS',
      lines: [
        { text: '1.4 million students have left public schools since 2020.', emphasis: false },
        { text: '270,000 teachers will quit this year. And next year. And the year after.', emphasis: true },
        { text: '73% of Americans are dissatisfied — a 24-year record.', emphasis: false },
      ],
      stats: [
        { value: '1.4M', label: 'Families fled' },
        { value: '270K', label: 'Teachers/yr' },
        { value: '73%', label: 'Dissatisfied' },
      ]
    },
    {
      type: 'full',
      section: 'product',
      label: 'CHAPTER 07',
      title: 'THE PRODUCT',
      lines: [
        { text: '75% of employers say recent graduates are unsatisfactory.', emphasis: false },
        { text: '60% fired a new grad within months of hiring.', emphasis: true },
        { text: 'Not for technical skills. For showing up. For communicating. For trying.', emphasis: false },
      ],
      stats: [
        { value: '75%', label: 'Unsatisfactory' },
        { value: '60%', label: 'Fired within months' },
        { value: '38%', label: 'Avoiding new grads' },
      ]
    },
    {
      type: 'closing',
      section: 'reboot',
      label: 'THE REBOOT',
      title: '',
      lines: [
        { text: 'For 132 years, we asked children to fit the system.', emphasis: false },
        { text: 'It\'s time the system fit them.', emphasis: true },
      ]
    },
  ];

  // Generate snowflakes
  const generateSnowflakes = useCallback(() => {
    const flakes: SnowflakeProps[] = [];
    const count = window.innerWidth < 768 ? 20 : 30;
    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        size: Math.random() * 4 + 4,
        left: Math.random() * 100,
        animationDuration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.2 + 0.1,
        windOffset: Math.random() * 80 - 40,
      });
    }
    return flakes;
  }, []);

  useEffect(() => {
    setMounted(true);
    setSnowflakes(generateSnowflakes());
  }, [generateSnowflakes]);

  // Generate snowflake keyframes
  useEffect(() => {
    if (!mounted || snowflakes.length === 0) return;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    let cssRules = '';
    snowflakes.forEach((flake) => {
      cssRules += `
        @keyframes snowfall-${flake.id} {
          0% { transform: translateY(-100vh) translateX(0px) rotate(0deg); }
          100% { transform: translateY(100vh) translateX(${flake.windOffset}px) rotate(360deg); }
        }
      `;
    });
    styleSheet.innerHTML = cssRules;
    document.head.appendChild(styleSheet);
    return () => {
      if (styleSheet.parentNode) document.head.removeChild(styleSheet);
    };
  }, [snowflakes, mounted]);

  // Intersection Observer for scroll-based visibility
  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [mounted]);

  const handleEnter = () => {
    setShowReveal(true);
  };

  const handleRevealComplete = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#050508' }}>
      {/* Snow Layer */}
      <div className="pointer-events-none fixed inset-0 z-20" style={{ opacity: showReveal ? 0 : 1, transition: 'opacity 1s' }}>
        {snowflakes.map((flake) => (
          <Snowflake key={flake.id} {...flake} />
        ))}
      </div>

      {/* Gradient Orb */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(600px, 80vw, 1000px)',
          height: 'clamp(600px, 80vw, 1000px)',
          background: 'radial-gradient(ellipse at center, #64748b10 0%, transparent 50%)',
          opacity: showReveal ? 0 : 1,
          transition: 'opacity 1s',
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-5 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_85%)]"
        style={{ opacity: showReveal ? 0 : 1, transition: 'opacity 1s' }}
      />

      {/* Scrollable Content */}
      <div className="relative z-10" style={{ opacity: showReveal ? 0 : 1, transition: 'opacity 0.5s' }}>
        {steps.map((step, index) => (
          <div key={index} ref={(el) => (sectionRefs.current[index] = el)} data-index={index}>
            <Chapter
              step={step}
              index={index}
              isVisible={visibleSections.has(index)}
              onEnter={step.type === 'closing' ? handleEnter : undefined}
            />
          </div>
        ))}
      </div>

      {/* Reveal Animation */}
      <RevealScreen visible={showReveal} onComplete={handleRevealComplete} />
    </div>
  );
};

export default Vision;
