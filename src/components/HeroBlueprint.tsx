import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface CharState {
  target: string;
  current: string;
  locked: boolean;
  iterations: number;
}

type AnimationPhase = 'idle' | 'primary' | 'pause' | 'secondary' | 'complete';

// ============================================================================
// CONSTANTS
// ============================================================================

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CODE_CHARS = '01アイウエオカキクケコサシスセソタチツテト';

// ============================================================================
// UTILITIES
// ============================================================================

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getRandomChar = (): string => {
  const chars = Math.random() > 0.5 ? GLITCH_CHARS : CODE_CHARS;
  return chars[Math.floor(Math.random() * chars.length)];
};

// ============================================================================
// HOOKS
// ============================================================================

const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

export function useTextRevealController() {
  const [trigger, setTrigger] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const restart = useCallback(() => {
    setIsComplete(false);
    setTrigger((prev) => prev + 1);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  return {
    key: trigger,
    autoStart: true,
    onComplete: handleComplete,
    isComplete,
    restart,
  };
}

// ============================================================================
// TEXT REVEAL ANIMATION
// ============================================================================

interface TextRevealProps {
  primaryText?: string;
  secondaryText?: string;
  accentColor?: string;
  typewriterSpeed?: number;
  typewriterVariance?: number;
  pauseDuration?: number;
  secondaryDuration?: number;
  scrambleIterations?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  className?: string;
}

function TextRevealAnimation({
  primaryText = 'Education',
  secondaryText = 'Reprogrammed',
  accentColor = '#22d3ee',
  typewriterSpeed = 280,
  typewriterVariance = 120,
  pauseDuration = 600,
  secondaryDuration = 1400,
  scrambleIterations = 8,
  autoStart = true,
  onComplete,
  className = '',
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>([]);
  const [shakingLetter, setShakingLetter] = useState<number | null>(null);
  const [secondaryChars, setSecondaryChars] = useState<CharState[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [glowActive, setGlowActive] = useState(false);

  const primaryLetters = primaryText.split('');
  const secondaryLetterCount = secondaryText.length;

  useEffect(() => {
    if (shouldReduceMotion && autoStart) {
      setVisibleLetters(primaryLetters.map(() => true));
      setSecondaryChars(
        secondaryText.split('').map((char) => ({
          target: char,
          current: char,
          locked: true,
          iterations: scrambleIterations,
        }))
      );
      setPhase('complete');
      setShowCursor(true);
      setGlowActive(true);
      onComplete?.();
    }
  }, [shouldReduceMotion, autoStart]);

  useEffect(() => {
    if (!autoStart || shouldReduceMotion) return;

    let cancelled = false;

    const runAnimation = async () => {
      setPhase('idle');
      setVisibleLetters([]);
      setSecondaryChars([]);
      setShowCursor(false);
      setGlowActive(false);

      await sleep(300);
      if (cancelled) return;

      setPhase('primary');

      for (let i = 0; i < primaryLetters.length; i++) {
        if (cancelled) return;

        const delay =
          typewriterSpeed + Math.random() * typewriterVariance - typewriterVariance / 4;
        await sleep(delay);

        if (cancelled) return;

        setShakingLetter(i);
        setVisibleLetters((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });

        await sleep(80);
        setShakingLetter(null);
      }

      setPhase('pause');
      await sleep(pauseDuration);
      if (cancelled) return;

      setPhase('secondary');

      const initialChars: CharState[] = secondaryText.split('').map((char) => ({
        target: char,
        current: ' ',
        locked: false,
        iterations: 0,
      }));
      setSecondaryChars(initialChars);

      const charInterval = secondaryDuration / secondaryLetterCount;
      const scrambleSpeed = 50;

      for (let i = 0; i < secondaryLetterCount; i++) {
        if (cancelled) return;

        for (let iter = 0; iter < scrambleIterations; iter++) {
          if (cancelled) return;

          setSecondaryChars((prev) => {
            const next = [...prev];
            if (next[i] && !next[i].locked) {
              next[i] = {
                ...next[i],
                current: getRandomChar(),
                iterations: iter + 1,
              };
            }
            return next;
          });

          await sleep(scrambleSpeed);
        }

        setSecondaryChars((prev) => {
          const next = [...prev];
          if (next[i]) {
            next[i] = {
              ...next[i],
              current: next[i].target,
              locked: true,
            };
          }
          return next;
        });

        if (i < secondaryLetterCount - 1) {
          const remaining = Math.max(10, charInterval - scrambleIterations * scrambleSpeed);
          await sleep(remaining);
        }
      }

      await sleep(200);
      if (cancelled) return;

      setPhase('complete');
      setGlowActive(true);
      setShowCursor(true);
      onComplete?.();
    };

    runAnimation();

    return () => {
      cancelled = true;
    };
  }, [
    autoStart,
    shouldReduceMotion,
    primaryText,
    secondaryText,
    typewriterSpeed,
    typewriterVariance,
    pauseDuration,
    secondaryDuration,
    scrambleIterations,
    onComplete,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="text"
      aria-label={`${primaryText} ${secondaryText}`}
    >
      <div
        className="absolute inset-0 blur-3xl opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}60 0%, transparent 70%)`,
          transform: 'scale(1.5)',
        }}
      />

      <div className="relative flex flex-col items-center gap-2">
        <motion.div
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight"
          animate={shakingLetter !== null ? { x: [0, 2, -1, 0], y: [0, 1, -1, 0] } : {}}
          transition={{ duration: 0.08, ease: 'easeOut' }}
        >
          {primaryLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={
                visibleLetters[i]
                  ? {
                      opacity: 1,
                      scale: [1.15, 0.96, 1],
                      textShadow: [
                        '0 0 4px rgba(0,0,0,0.9)',
                        '2px 2px 0px rgba(0,0,0,0.2)',
                        'none',
                      ],
                    }
                  : { opacity: 0, scale: 1.15 }
              }
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute inset-0 blur-xl pointer-events-none"
            style={{ backgroundColor: accentColor }}
            animate={{ opacity: glowActive ? 0.15 : 0 }}
            transition={{ duration: 0.5 }}
          />

          <div
            className="relative text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight flex items-center justify-center"
            style={{
              color: accentColor,
              textShadow:
                phase === 'complete'
                  ? `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}40`
                  : 'none',
              transition: 'text-shadow 0.3s ease-out',
            }}
          >
            {secondaryChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: char.current !== ' ' ? 1 : 0,
                  y: char.locked ? 0 : (Math.random() - 0.5) * 4,
                }}
                transition={{ duration: 0.05 }}
                style={{
                  color: char.locked ? accentColor : 'rgba(255,255,255,0.5)',
                  textShadow: char.locked
                    ? `0 0 12px ${accentColor}`
                    : '0 0 8px rgba(255,255,255,0.3)',
                  minWidth: char.current === ' ' ? '0.5em' : undefined,
                }}
              >
                {char.current}
              </motion.span>
            ))}

            <AnimatePresence>
              {showCursor && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                  }}
                  className="inline-block w-[4px] md:w-[5px] h-[0.75em] ml-2"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === 'secondary' && (
              <motion.div
                initial={{ left: '-5%', opacity: 0 }}
                animate={{ left: '105%', opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: secondaryDuration / 1000, ease: 'linear' }}
                className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
                  boxShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}`,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HERO COMPONENT
// ============================================================================

export default function HeroBlueprint() {
  const controller = useTextRevealController();

  return (
    <div className="relative min-h-screen bg-[#060912] overflow-hidden flex items-center justify-center">
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Coarse grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.06) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-700" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-700" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-700" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-700" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-mono text-xs tracking-[0.3em] text-cyan-400/80 uppercase">
            AEIOS
          </span>
          <motion.div
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Animated headline */}
        <div className="mb-6">
          <TextRevealAnimation
            key={controller.key}
            primaryText="Education"
            secondaryText="Reprogrammed"
            accentColor="#22d3ee"
            autoStart={controller.autoStart}
            onComplete={controller.onComplete}
          />
        </div>

        {/* Subhead */}
        <motion.p
          className="text-lg md:text-xl text-slate-400 font-light tracking-wide mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: controller.isComplete ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The operating system for what comes next.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: controller.isComplete ? 1 : 0,
            y: controller.isComplete ? 0 : 10,
          }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/technology" className="group inline-flex items-center gap-3 text-sm tracking-widest text-white/70 hover:text-cyan-400 transition-colors duration-300">
            <span className="font-mono uppercase">Explore the Architecture</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
