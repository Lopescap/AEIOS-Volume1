import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Eye,
  Brain,
  TrendingUp,
  AlertTriangle,
  Users,
  Shield,
  Gauge,
  BookOpen,
  Sparkles,
  Check,
  X,
  ArrowRight,
  Database,
  Cpu,
  Network,
  Lock,
  XCircle,
  LucideIcon
} from 'lucide-react';

// =========================================
// TYPES
// =========================================

interface SystemColors {
  gradient: string;
  glow: string;
  ring: string;
  text: string;
  bg: string;
  border: string;
  glowColor: string;
}

interface Feature {
  label: string;
  value: number;
  icon: LucideIcon;
  detail: string;
}

interface Metric {
  stat: string;
  label: string;
  subtext: string;
}

interface SystemStats {
  connectionStatus: string;
  efficiency: number;
}

interface SystemInfo {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  colors: SystemColors;
  stats: SystemStats;
  features: Feature[];
  metrics: Metric[];
}

interface Pillar {
  id: string;
  name: string;
  question: string;
  color: string;
  legacy: string;
  aeios: string;
  icon: LucideIcon;
}

interface ArchitectureItem {
  icon: LucideIcon;
  label: string;
  desc: string;
  color: string;
  sphereColor?: string;
}

interface SystemContextType {
  activeSystem: string;
  setActiveSystem: (system: string) => void;
  isLegacy: boolean;
  data: SystemInfo;
}

// =========================================
// GLOBAL CONTEXT FOR SYSTEM TOGGLE
// =========================================

const SystemContext = createContext<SystemContextType | null>(null);

const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within SystemContext');
  return context;
};

// =========================================
// DATA CONFIGURATION
// =========================================

const SYSTEM_DATA: Record<string, SystemInfo> = {
  legacy: {
    id: 'legacy',
    label: 'Legacy',
    title: 'The 1892 Design',
    subtitle: 'Built for factories, not futures',
    description: 'Standardized pacing. Batch processing. Assessments designed to sort, not develop. A system that loses the individual—where struggle is punished rather than understood.',
    colors: {
      gradient: 'from-red-600 to-rose-900',
      glow: 'bg-red-500',
      ring: 'border-l-red-500/50',
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      glowColor: 'rgba(239, 68, 68, 0.15)',
    },
    stats: { connectionStatus: 'Failing Students', efficiency: 23 },
    features: [
      { label: 'Personalization', value: 8, icon: Users, detail: 'One-size-fits-all curriculum' },
      { label: 'Real-time Insight', value: 12, icon: Eye, detail: 'Quarterly report cards' },
      { label: 'Predictive Power', value: 5, icon: TrendingUp, detail: 'Reactive interventions only' },
      { label: 'Skill Verification', value: 15, icon: Shield, detail: 'Seat time = credential' },
    ],
    metrics: [
      { stat: '89%', label: 'think they\'re college-ready', subtext: 'Only 30% actually are' },
      { stat: '43%', label: 'meet zero ACT benchmarks', subtext: '6-year decline trend' },
      { stat: '75%', label: 'of employers unsatisfied', subtext: 'With graduate readiness' },
      { stat: '$1.3T', label: 'in student debt', subtext: 'For credentials that don\'t deliver' },
    ],
  },
  aeios: {
    id: 'aeios',
    label: 'AEIOS',
    title: 'Education, Reprogrammed',
    subtitle: 'Built for every learner',
    description: 'AI-powered precision that sees every student as an individual. Real-time adaptation. Predictive intervention. Credentials that actually mean something.',
    colors: {
      gradient: 'from-emerald-500 to-cyan-600',
      glow: 'bg-emerald-500',
      ring: 'border-r-emerald-500/50',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glowColor: 'rgba(16, 185, 129, 0.15)',
    },
    stats: { connectionStatus: 'Every Student Seen', efficiency: 98 },
    features: [
      { label: 'Personalization', value: 98, icon: Users, detail: 'Adaptive learning pathways' },
      { label: 'Real-time Insight', value: 95, icon: Eye, detail: '<100ms response time' },
      { label: 'Predictive Power', value: 92, icon: TrendingUp, detail: 'Weeks-ahead forecasting' },
      { label: 'Skill Verification', value: 100, icon: Shield, detail: 'Blockchain-verified mastery' },
    ],
    metrics: [
      { stat: '3x', label: 'faster mastery identification', subtext: 'Through continuous assessment' },
      { stat: '94%', label: 'intervention accuracy', subtext: 'Predictive modeling' },
      { stat: '100%', label: 'skill verification rate', subtext: 'Verified Skill Ledger' },
    ],
  },
};

const THREE_PILLARS: Pillar[] = [
  {
    id: 'P1',
    name: 'Knowledge Estate',
    question: 'What you know',
    color: '#1C5F9D',
    legacy: 'Tests memorization, forgets it next semester',
    aeios: 'Tracks every concept mastered, builds on foundations',
    icon: BookOpen
  },
  {
    id: 'P2',
    name: 'Cognitive Architecture',
    question: 'How you think',
    color: '#0EA5E9',
    legacy: 'Ignores learning differences, one pace for all',
    aeios: 'Maps individual cognitive patterns, adapts in real-time',
    icon: Brain
  },
  {
    id: 'P3',
    name: 'Agentic Character',
    question: 'How you act',
    color: '#10B981',
    legacy: 'Measures compliance, calls it character',
    aeios: 'Develops resilience, integrity, and agency—measurably',
    icon: Sparkles
  },
];

const ARCHITECTURE_ITEMS: Record<string, ArchitectureItem[]> = {
  legacy: [
    { icon: XCircle, label: 'Siloed Data', desc: 'Disconnected systems, no unified view', color: 'from-red-500/20 to-red-600/20' },
    { icon: XCircle, label: 'Manual Analysis', desc: 'Spreadsheets and gut feelings', color: 'from-red-500/20 to-red-600/20' },
    { icon: XCircle, label: 'Static Profiles', desc: 'Annual snapshots, outdated instantly', color: 'from-red-500/20 to-red-600/20' },
    { icon: XCircle, label: 'Paper Credentials', desc: 'Easily faked, impossible to verify', color: 'from-red-500/20 to-red-600/20' },
  ],
  aeios: [
    { icon: Database, label: 'AEIOS Atlas', desc: 'Unified knowledge architecture mapping curriculum, skills, and learning relationships', color: 'from-blue-500 to-blue-600', sphereColor: '#94a3b8' },
    { icon: Cpu, label: 'AEIOS Navigator', desc: 'Reasoning engine that transforms data into actionable insights', color: 'from-cyan-500 to-cyan-600', sphereColor: '#38bdf8' },
    { icon: Network, label: 'Digital Twin', desc: 'Per-student cognitive model', color: 'from-emerald-500 to-emerald-600', sphereColor: '#2dd4bf' },
    { icon: Lock, label: 'Skill Ledger', desc: 'Blockchain-verified credentials', color: 'from-purple-500 to-purple-600', sphereColor: '#ef4444' },
  ],
};

// =========================================
// ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  visual: (isLegacy: boolean) => ({
    initial: { opacity: 0, scale: 1.5, filter: 'blur(15px)', rotate: isLegacy ? -30 : 30, x: isLegacy ? -80 : 80 },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0, x: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
    exit: { opacity: 0, scale: 0.6, filter: 'blur(20px)', transition: { duration: 0.25 } },
  }),
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  }
};

// =========================================
// GLOBAL BACKGROUND
// =========================================

const GlobalBackground: React.FC = () => {
  return (
    <>
      {/* Fine grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      {/* Coarse grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.06) 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />
      {/* Corner marks */}
      <div className="fixed top-24 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-700" />
      <div className="fixed top-24 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-700" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-700" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-700" />
    </>
  );
};

// =========================================
// FLOATING SWITCHER (Always Visible)
// =========================================

const FloatingSwitcher: React.FC = () => {
  const { setActiveSystem, isLegacy } = useSystem();

  return (
    <div className="fixed bottom-8 inset-x-0 flex justify-center z-50 pointer-events-none">
      <motion.div
        layout
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <motion.button
          onClick={() => setActiveSystem('legacy')}
          whileTap={{ scale: 0.96 }}
          className="relative px-6 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
        >
          {isLegacy && (
            <motion.div
              layoutId="switcher-bg"
              className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500/20 to-red-500/5 shadow-inner"
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            />
          )}
          <span className={`relative z-10 flex items-center gap-2 transition-colors ${isLegacy ? 'text-red-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <AlertTriangle size={14} /> Legacy
          </span>
        </motion.button>

        <motion.button
          onClick={() => setActiveSystem('aeios')}
          whileTap={{ scale: 0.96 }}
          className="relative px-6 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
        >
          {!isLegacy && (
            <motion.div
              layoutId="switcher-bg"
              className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 shadow-inner"
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            />
          )}
          <span className={`relative z-10 flex items-center gap-2 transition-colors ${!isLegacy ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Zap size={14} /> AEIOS
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

// =========================================
// HERO SECTION
// =========================================

const HeroSection: React.FC = () => {
  const { isLegacy, data } = useSystem();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <main className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0 w-full`}
        >
          {/* Visual */}
          <div className={`flex justify-center lg:justify-start ${isLegacy ? 'lg:order-1' : 'lg:order-2 lg:justify-end'}`}>
            <div className={`${isLegacy ? 'lg:-translate-x-8' : 'lg:translate-x-8'}`}>
              <HeroVisual />
            </div>
          </div>

          {/* Content */}
          <motion.div layout="position" className={`w-full max-w-md mt-8 lg:mt-0 ${isLegacy ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8 lg:ml-auto'}`}>
            <AnimatePresence mode="wait">
              <HeroContent key={data.id} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </section>
  );
};

const HeroVisual: React.FC = () => {
  const { isLegacy, data } = useSystem();

  return (
    <motion.div layout="position" className="relative group shrink-0">
      {/* Outer Rotating Ring */}
      <motion.div
        animate={{ rotate: isLegacy ? -360 : 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-15%] rounded-full"
        style={{
          border: `1px dashed ${isLegacy ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
        }}
      />

      {/* Inner Rotating Ring (opposite direction) */}
      <motion.div
        animate={{ rotate: isLegacy ? 360 : -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-8%] rounded-full"
        style={{
          border: `1px dashed ${isLegacy ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
        }}
      />

      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-5%] rounded-full blur-3xl"
        style={{
          background: isLegacy
            ? 'radial-gradient(circle, rgba(127, 29, 29, 0.6) 0%, rgba(239, 68, 68, 0.2) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 78, 59, 0.6) 0%, rgba(16, 185, 129, 0.2) 40%, transparent 70%)',
        }}
      />

      {/* Visual Container */}
      <div
        className="relative h-64 w-64 md:h-72 md:w-72 lg:h-[360px] lg:w-[360px] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: isLegacy
            ? 'radial-gradient(circle at 50% 50%, rgba(127, 29, 29, 0.4) 0%, rgba(30, 10, 10, 0.8) 50%, rgba(6, 9, 18, 0.95) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(6, 78, 59, 0.4) 0%, rgba(6, 40, 30, 0.8) 50%, rgba(6, 9, 18, 0.95) 100%)',
          boxShadow: isLegacy
            ? 'inset 0 0 60px rgba(127, 29, 29, 0.3), 0 0 80px rgba(239, 68, 68, 0.15)'
            : 'inset 0 0 60px rgba(6, 78, 59, 0.3), 0 0 80px rgba(16, 185, 129, 0.15)',
          border: `1px solid ${isLegacy ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            variants={ANIMATIONS.visual(isLegacy)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center"
          >
            {isLegacy ? (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2.5 mb-6">
                  <AlertTriangle className="w-4 h-4 text-red-400/80" />
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400/70">Legacy Architecture</div>
                </div>
                <div
                  className="text-[90px] md:text-[110px] lg:text-[130px] font-bold leading-none"
                  style={{
                    color: 'rgba(127, 29, 29, 0.6)',
                    textShadow: '0 0 60px rgba(239, 68, 68, 0.3)',
                  }}
                >
                  1892
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-end justify-center gap-4 mb-6">
                  <motion.div
                    className="w-6 rounded-full"
                    style={{
                      height: 56,
                      background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                    }}
                    animate={{ height: [56, 80, 56] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="w-6 rounded-full"
                    style={{
                      height: 72,
                      background: 'linear-gradient(180deg, #67e8f9 0%, #22d3ee 50%, #06b6d4 100%)',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
                    }}
                    animate={{ height: [72, 96, 72] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  />
                  <motion.div
                    className="w-6 rounded-full"
                    style={{
                      height: 88,
                      background: 'linear-gradient(180deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
                      boxShadow: '0 0 20px rgba(52, 211, 153, 0.5)',
                    }}
                    animate={{ height: [88, 112, 88] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  />
                </div>
                <div
                  className="text-4xl md:text-6xl font-bold text-white tracking-wide"
                  style={{
                    textShadow: '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  AEIOS
                </div>
                <div className="text-[9px] md:text-[11px] font-medium uppercase tracking-[0.2em] md:tracking-[0.35em] text-emerald-400/50 mt-3">Intelligence Layer</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status Label */}
      <motion.div layout="position" className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div
          className="flex items-center gap-2 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] px-3 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(6, 9, 18, 0.8)',
            border: `1px solid ${isLegacy ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            color: isLegacy ? 'rgba(248, 113, 113, 0.9)' : 'rgba(110, 231, 183, 0.9)',
          }}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse flex-shrink-0"
            style={{
              background: isLegacy ? '#ef4444' : '#10b981',
              boxShadow: isLegacy ? '0 0 8px #ef4444' : '0 0 8px #10b981',
            }}
          />
          {data.stats.connectionStatus}
        </div>
      </motion.div>
    </motion.div>
  );
};

const HeroContent: React.FC = () => {
  const { isLegacy, data } = useSystem();
  const alignClass = isLegacy ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLegacy ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLegacy ? 'left-0 bg-red-500' : 'right-0 bg-emerald-500';

  return (
    <motion.div variants={ANIMATIONS.container} initial="hidden" animate="visible" exit="exit" className={`flex flex-col ${alignClass}`}>
      <motion.h2 variants={ANIMATIONS.item} className={`text-sm font-bold uppercase tracking-[0.2em] mb-2 ${data.colors.text}`}>
        {isLegacy ? 'The Old System' : 'The AEIOS System'}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-sm mb-4 ${data.colors.text}`}>{data.subtitle}</motion.p>
      <motion.p variants={ANIMATIONS.item} className={`text-zinc-400 mb-6 max-w-sm leading-relaxed text-sm ${isLegacy ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Bars */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-4 bg-zinc-900/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
        {data.features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div key={feature.label}>
              <div className={`flex items-center justify-between mb-2 text-sm ${flexDirClass}`}>
                <div className={`flex items-center gap-2 ${feature.value > 50 ? 'text-zinc-200' : 'text-zinc-500'}`}>
                  <IconComponent size={14} /> <span>{feature.label}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
              </div>
              <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${feature.value}%` }}
                  transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
                  className={`absolute top-0 bottom-0 ${barColorClass} opacity-80`} />
              </div>
              <div className={`text-xs text-zinc-600 mt-1 ${isLegacy ? 'text-left' : 'text-right'}`}>{feature.detail}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={ANIMATIONS.item} className="mt-5 grid grid-cols-2 gap-3 w-full">
        {data.metrics.map((item, idx) => (
          <div key={idx} className={`p-3 rounded-xl ${data.colors.bg} border ${data.colors.border}`}>
            <div className={`text-2xl font-bold ${data.colors.text}`}>{item.stat}</div>
            <div className="text-xs text-zinc-300">{item.label}</div>
            <div className="text-xs text-zinc-500 mt-1">{item.subtext}</div>
          </div>
        ))}
      </motion.div>

      {/* Efficiency */}
      <motion.div variants={ANIMATIONS.item} className={`mt-5 flex items-center gap-2 ${data.colors.text} ${flexDirClass}`}>
        <Gauge size={16} />
        <span className="text-sm font-medium">{data.stats.efficiency}% Efficiency</span>
      </motion.div>
    </motion.div>
  );
};

// =========================================
// THREE PILLARS SECTION
// =========================================

const ThreePillarsSection: React.FC = () => {
  const { isLegacy } = useSystem();

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={ANIMATIONS.fadeUp} className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4">The Framework</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Three Pillars of Capability</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">A complete model for human development—not just academic performance.</p>
        </motion.div>

        <div className="space-y-6">
          {THREE_PILLARS.map((pillar, idx) => {
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col md:flex-row items-stretch gap-4"
              >
                {/* Pillar Label */}
                <div className="md:w-48 flex items-center gap-3 shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: pillar.color }}
                  >
                    {pillar.id}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{pillar.name}</div>
                    <div className="text-xs text-cyan-400 italic">{pillar.question}</div>
                  </div>
                </div>

                {/* Legacy Approach */}
                <motion.div
                  animate={{
                    opacity: isLegacy ? 1 : 0.4,
                    scale: isLegacy ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`flex-1 rounded-xl p-4 flex items-start gap-3 border transition-colors ${
                    isLegacy
                      ? 'bg-red-950/30 border-red-500/40 shadow-lg shadow-red-500/10'
                      : 'bg-red-950/10 border-red-900/20'
                  }`}
                >
                  <X className={`w-5 h-5 shrink-0 mt-0.5 ${isLegacy ? 'text-red-400' : 'text-red-400/50'}`} />
                  <div>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${isLegacy ? 'text-red-400' : 'text-red-400/50'}`}>Legacy Approach</div>
                    <div className={`text-sm ${isLegacy ? 'text-zinc-200' : 'text-zinc-500'}`}>{pillar.legacy}</div>
                  </div>
                </motion.div>

                {/* AEIOS Approach */}
                <motion.div
                  animate={{
                    opacity: !isLegacy ? 1 : 0.4,
                    scale: !isLegacy ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`flex-1 rounded-xl p-4 flex items-start gap-3 border transition-colors ${
                    !isLegacy
                      ? 'bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                      : 'bg-emerald-950/10 border-emerald-900/20'
                  }`}
                >
                  <Check className={`w-5 h-5 shrink-0 mt-0.5 ${!isLegacy ? 'text-emerald-400' : 'text-emerald-400/50'}`} />
                  <div>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${!isLegacy ? 'text-emerald-400' : 'text-emerald-400/50'}`}>AEIOS Approach</div>
                    <div className={`text-sm ${!isLegacy ? 'text-zinc-200' : 'text-zinc-500'}`}>{pillar.aeios}</div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =========================================
// ARCHITECTURE SECTION
// =========================================

const ArchitectureSection: React.FC = () => {
  const { isLegacy } = useSystem();
  const items = isLegacy ? ARCHITECTURE_ITEMS.legacy : ARCHITECTURE_ITEMS.aeios;

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={ANIMATIONS.fadeUp} className="text-center mb-16">
          <div className={`text-xs uppercase tracking-[0.3em] mb-4 ${isLegacy ? 'text-red-400' : 'text-cyan-400'}`}>
            {isLegacy ? 'What\'s Missing' : 'Under the Hood'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {isLegacy ? 'The Infrastructure Gap' : 'The Intelligence Layer'}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {isLegacy
              ? 'Legacy systems weren\'t built for the demands of modern education.'
              : 'Enterprise-grade infrastructure designed for education at scale.'
            }
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLegacy ? 'legacy' : 'aeios'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-4 gap-4"
          >
            {items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-2xl p-6 border transition-colors group ${
                    isLegacy
                      ? 'bg-red-950/20 border-red-900/30 hover:border-red-500/40'
                      : 'bg-zinc-900/50 border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  {isLegacy ? (
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-red-500/20">
                      <IconComponent className="w-6 h-6 text-red-400" />
                    </div>
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full mb-4 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: item.sphereColor,
                        boxShadow: `0 0 18px ${item.sphereColor}80`,
                      }}
                    />
                  )}
                  <h3 className={`font-bold mb-2 ${isLegacy ? 'text-red-300' : 'text-white'}`}>{item.label}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// =========================================
// CTA SECTION
// =========================================

const CTASection: React.FC = () => {
  const { isLegacy, setActiveSystem } = useSystem();

  return (
    <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
      <motion.div
        animate={{
          background: isLegacy
            ? 'radial-gradient(ellipse at center, rgba(127, 29, 29, 0.2), transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(6, 95, 70, 0.2), transparent 70%)'
        }}
        className="absolute inset-0"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={ANIMATIONS.fadeUp}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <AnimatePresence mode="wait">
          {isLegacy ? (
            <motion.div
              key="legacy-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-red-400 mb-4">The Problem is Clear</div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to See the Solution?</h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                For over a century, we asked children to fit the system. It's time for something different.
              </p>
              <button
                onClick={() => setActiveSystem('aeios')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mx-auto"
              >
                <Zap size={18} /> Switch to AEIOS <ArrowRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="aeios-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">The Future is Here</div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">See the System in Action</h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                The system that finally fits the student. Let's transform K-12 outcomes together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/technology" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Explore the Technology <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// =========================================
// MAIN COMPONENT
// =========================================

const Mission: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState('legacy');

  const isLegacy = activeSystem === 'legacy';
  const data = SYSTEM_DATA[activeSystem];

  return (
    <SystemContext.Provider value={{ activeSystem, setActiveSystem, isLegacy, data }}>
      <div className="relative min-h-screen w-full bg-[#060912] text-zinc-100 overflow-x-hidden">

        <GlobalBackground />

        <HeroSection />
        <ThreePillarsSection />
        <ArchitectureSection />
        <CTASection />

        <FloatingSwitcher />
      </div>
    </SystemContext.Provider>
  );
};

export default Mission;
