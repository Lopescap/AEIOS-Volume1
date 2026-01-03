import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, DollarSign, Play, Network, Users, Zap, Target, Brain, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import HeroBlueprint from '../components/HeroBlueprint';
import { ButtonVariant } from '../types';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroBlueprint />

      {/* Section 1: Tech/Architecture Preview - Blue tint */}
      <section className="py-24 bg-[#060810] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-[#060810] to-sky-950/10 pointer-events-none"></div>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-6">
                <Cpu className="w-3 h-3" />
                SYSTEM ARCHITECTURE
              </div>
              <h2 className="text-4xl font-bold mb-6">Architecture</h2>
              <p className="text-slate-400 text-lg mb-6">
                A technical blueprint of the AEIOS intelligence layer. AEIOS Atlas serves as the semantic backbone,
                AEIOS Navigator orchestrates reasoning, and the Three Pillars framework measures holistic student growth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-sky-400 mb-1">20K+</div>
                  <div className="text-xs text-slate-500">Knowledge Nodes</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">500+</div>
                  <div className="text-xs text-slate-500">Inference Rules</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400 mb-1">&lt;100ms</div>
                  <div className="text-xs text-slate-500">Decision Latency</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-amber-400 mb-1">47</div>
                  <div className="text-xs text-slate-500">Behavioral Signals</div>
                </div>
              </div>
              <Link to="/technology">
                <Button variant={ButtonVariant.GHOST} rightIcon={<ArrowRight className="w-4 h-4" />} className="text-sky-400 hover:bg-sky-500/10">
                  View Architecture
                </Button>
              </Link>
            </div>
            <div className="relative">
              {/* Mini architecture diagram preview */}
              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                  <span className="text-xs text-slate-500 font-mono">DATA FLOW PREVIEW</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center mb-2">
                      <Network className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-[10px] text-slate-500">INPUT</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-600 via-sky-500 to-slate-600"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sky-500/20 border border-sky-500/50 rounded-lg flex items-center justify-center mb-2">
                      <Brain className="w-6 h-6 text-sky-400" />
                    </div>
                    <span className="text-[10px] text-sky-400">ATLAS</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-600 via-emerald-500 to-slate-600"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-[10px] text-slate-500">OUTPUT</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                  {['P1', 'P2', 'P3'].map((p, i) => (
                    <div
                      key={p}
                      className="px-3 py-1.5 rounded border text-xs font-bold"
                      style={{
                        borderColor: i === 0 ? '#1C5F9D' : i === 1 ? '#0EA5E9' : '#10B981',
                        color: i === 0 ? '#1C5F9D' : i === 1 ? '#0EA5E9' : '#10B981',
                        backgroundColor: i === 0 ? '#1C5F9D10' : i === 1 ? '#0EA5E910' : '#10B98110'
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission Preview - Red tint */}
      <section className="py-24 bg-[#0a0608] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-[#0a0608] to-red-950/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Legacy vs AEIOS Visual */}
              <div className="relative h-80 flex items-center justify-center">
                {/* Legacy Circle */}
                <div className="absolute left-0 w-44 h-44 rounded-full bg-gradient-to-br from-red-500/20 to-red-900/10 border border-red-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500/40 mb-1">1892</div>
                    <span className="text-red-400 font-semibold text-xs uppercase tracking-wider">Legacy</span>
                  </div>
                </div>
                {/* AEIOS Circle */}
                <div className="absolute right-0 w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                    <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">AEIOS</span>
                  </div>
                </div>
                {/* Center Toggle */}
                <div className="absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-900 rounded-full shadow-xl flex items-center gap-3 z-10 border border-white/10">
                  <span className="text-red-400 text-xs font-medium">Before</span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <span className="text-emerald-400 text-xs font-medium">After</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
                <Target className="w-3 h-3" />
                OUR MISSION
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Education, Reprogrammed</h2>
              <p className="text-slate-300 text-lg mb-6">
                For over a century, education has operated on industrial-age software.
                We're building technology that finally sees every learner as an individual.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="text-xl font-bold text-red-400">23%</div>
                  <div className="text-xs text-slate-500">Legacy Efficiency</div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="text-xl font-bold text-emerald-400">98%</div>
                  <div className="text-xs text-slate-500">AEIOS Efficiency</div>
                </div>
              </div>
              <Link to="/mission">
                <Button variant={ButtonVariant.GHOST} rightIcon={<ArrowRight className="w-4 h-4" />} className="text-emerald-400 hover:bg-emerald-500/10">
                  Compare Systems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Blueprint/0→1 Preview - Teal tint */}
      <section className="py-24 bg-[#080c0c] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-transparent to-teal-950/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-6">
                <DollarSign className="w-3 h-3" />
                INCENTIVE ARCHITECTURE
              </div>
              <h2 className="text-4xl font-bold mb-6">EARN</h2>
              <p className="text-slate-400 text-lg mb-6">
                The Engagement Allocated Reward Network (EARN)—an incentive architecture that rewards performance, encourages engagement,
                and builds futures through intelligent allocation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <span className="text-slate-300">Per Student Annually</span>
                  <span className="text-2xl font-bold text-teal-400 font-mono">$2,000</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <span className="text-slate-300">K-12 Graduation Total</span>
                  <span className="text-2xl font-bold text-green-400 font-mono">$14,000+</span>
                </div>
              </div>
              <div className="flex gap-4 mb-8">
                <div className="flex-1 text-center p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-xs text-blue-400 mb-1">Guaranteed</div>
                  <div className="text-lg font-bold text-blue-400">37.5%</div>
                </div>
                <div className="flex-1 text-center p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                  <div className="text-xs text-teal-400 mb-1">Performance</div>
                  <div className="text-lg font-bold text-teal-400">50%</div>
                </div>
                <div className="flex-1 text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="text-xs text-orange-400 mb-1">Parent</div>
                  <div className="text-lg font-bold text-orange-400">12.5%</div>
                </div>
              </div>
              <Link to="/blueprint">
                <Button variant={ButtonVariant.GHOST} rightIcon={<ArrowRight className="w-4 h-4" />} className="text-teal-400 hover:bg-teal-500/10">
                  Explore EARN
                </Button>
              </Link>
            </div>
            <div>
              {/* Allocation visualization */}
              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <span className="text-xs text-slate-500 font-mono">ALLOCATION MODEL</span>
                </div>
                <div className="h-8 rounded-lg overflow-hidden flex mb-4">
                  <div className="w-[37.5%] bg-gradient-to-r from-blue-600 to-blue-500"></div>
                  <div className="w-[50%] bg-gradient-to-r from-teal-600 to-teal-500"></div>
                  <div className="w-[12.5%] bg-gradient-to-r from-orange-600 to-orange-500"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">Savings</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">Lottery</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-xs text-slate-500">Parents</div>
                  </div>
                </div>
                <div className="text-center text-slate-500 text-sm">
                  Interactive simulator included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Engine/Demo Preview - Cyan/Teal tint */}
      <section className="py-24 bg-[#080a0b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-cyan-950/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Demo preview */}
              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs text-emerald-400 font-mono">LIVE SCENARIO</span>
                </div>
                <div className="space-y-3">
                  {[
                    { phase: 'interaction', step: 'Student Submits Work', color: '#0EA5E9' },
                    { phase: 'analysis', step: 'Functional AI Scoring', color: '#10B981' },
                    { phase: 'evolution', step: 'Intervention Generated', color: '#8b5cf6' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">{item.phase}</div>
                        <div className="text-sm text-white">{item.step}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-slate-500 text-xs">
                  9-step walkthrough with live data packets
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
                <Play className="w-3 h-3" />
                LIVE DEMO
              </div>
              <h2 className="text-4xl font-bold mb-6">Demo</h2>
              <p className="text-slate-400 text-lg mb-6">
                Watch the AEIOS Engine process a real student interaction in real-time.
                See how data flows from submission through analysis to intervention.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-400">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  Interactive 4-phase architecture visualization
                </li>
                <li className="flex items-center text-slate-400">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Live data packet inspection at each step
                </li>
                <li className="flex items-center text-slate-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Auto-play walkthrough mode
                </li>
              </ul>
              <Link to="/engine">
                <Button variant={ButtonVariant.GHOST} rightIcon={<ArrowRight className="w-4 h-4" />} className="text-emerald-400 hover:bg-emerald-500/10">
                  Launch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#060912] text-white relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to See Intelligence in Action?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Join the forward-thinking institutions piloting the next generation of educational infrastructure.
          </p>
          <div className="flex justify-center">
            <Button variant={ButtonVariant.PRIMARY} className="bg-white text-slate-900 hover:bg-slate-100 shadow-none">
              Coming Soon
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
