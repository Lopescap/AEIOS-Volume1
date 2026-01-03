import React, { useState, useEffect } from 'react';

type Phase = 'interaction' | 'analysis' | 'evolution';

interface ScenarioStep {
  id: number;
  phase: Phase;
  title: string;
  time: string;
  description: string;
  highlights: string[];
  dataPacket: Record<string, unknown>;
}

const Engine: React.FC = () => {
  const [scenarioActive, setScenarioActive] = useState(false);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const scenario = {
    title: "Live Data Flow: Student Essay Submission",
    student: "Alex Chen",
    assignment: "Was World War II Inevitable?",
    subject: "9th Grade History",
    steps: [
      {
        id: 0,
        phase: 'interaction' as Phase,
        title: 'Student Submits Work',
        time: '10:47 AM',
        description: 'Alex submits essay through Google Classroom after 47 minutes of writing.',
        highlights: ['google-stack', 'student-aul'],
        dataPacket: { type: 'SUBMISSION_EVENT', studentId: 'stu_7f3a', artifactId: 'art_ww2_001', wordCount: 847, timeOnTask: '47:23' }
      },
      {
        id: 1,
        phase: 'interaction' as Phase,
        title: 'Data Capture Activated',
        time: '10:47 AM',
        description: 'System captures Artifact Data (essay content) and Process Data (47 behavioral signals including pause patterns, revision history, keystroke dynamics).',
        highlights: ['data-capture', 'ad-pd'],
        dataPacket: { artifactData: { format: 'DOCX', citations: 4, paragraphs: 6 }, processData: { pauses: 12, revisions: 23, deletions: 156 } }
      },
      {
        id: 2,
        phase: 'interaction' as Phase,
        title: 'Real-Time Sensing',
        time: '10:47 AM',
        description: 'BAE 2.0 detects elevated frustration signals (long pauses at paragraph 3, multiple deletions). ASM flags affective state shift.',
        highlights: ['sensing', 'bae-live', 'asm'],
        dataPacket: { frustrationIndex: 0.72, persistenceScore: 0.58, affectiveState: 'STRUGGLING', triggerPoint: 'paragraph_3' }
      },
      {
        id: 3,
        phase: 'analysis' as Phase,
        title: 'Functional AI Scoring',
        time: '10:48 AM',
        description: 'CME evaluates conceptual mastery. CSA maps argument structure. Strong economic analysis detected, but weak Treaty of Versailles connections.',
        highlights: ['functional-ai', 'cme', 'csa'],
        dataPacket: { conceptScores: { Economic_Depression: 0.87, Rise_of_Fascism: 0.79, Treaty_of_Versailles: 0.41 }, argumentStructure: { coherence: 0.71, evidenceUse: 0.82 } }
      },
      {
        id: 4,
        phase: 'analysis' as Phase,
        title: 'Behavioral AI Analysis',
        time: '10:48 AM',
        description: 'BAE 2.0 calculates P3 persistence metrics. CIA measures collaboration patterns (solo work). NDE detects novel reasoning attempt on economic causation.',
        highlights: ['behavioral-ai', 'bae-async', 'cia', 'nde'],
        dataPacket: { p3Metrics: { persistence: 0.58, selfRegulation: 0.64 }, noveltyDetection: { flag: true, domain: 'economic_causation' } }
      },
      {
        id: 5,
        phase: 'analysis' as Phase,
        title: 'Contextual Weighting',
        time: '10:48 AM',
        description: 'CWA 2.0 applies high-stakes weighting (summative essay). Adjusts scores based on scaffolding used. RCA identifies root cause: prerequisite gap in treaty knowledge.',
        highlights: ['cwa', 'rca'],
        dataPacket: { stakesLevel: 'HIGH', scaffoldingUsed: ['outline_template'], weightedP1: 0.68, rootCause: 'prerequisite_gap:Treaty_of_Versailles' }
      },
      {
        id: 6,
        phase: 'evolution' as Phase,
        title: 'AEIOS Atlas Memory Update',
        time: '10:49 AM',
        description: 'Digital twin updated with new mastery levels. Prerequisite relationship strengthened. Learning trajectory recalculated.',
        highlights: ['graph-d', 'memory'],
        dataPacket: { nodesUpdated: 7, edgesCreated: 3, twinVersion: 'v847', trajectoryDelta: '+0.04' }
      },
      {
        id: 7,
        phase: 'evolution' as Phase,
        title: 'Intervention Generated',
        time: '10:49 AM',
        description: 'AEIOS Navigator generates targeted recommendation. CEE predicts 73% efficacy for Treaty scaffold resource.',
        highlights: ['cee', 'outputs'],
        dataPacket: { interventionType: 'SCAFFOLD_RESOURCE', resource: 'Treaty of Versailles: Economic Consequences', predictedEfficacy: 0.73 }
      },
      {
        id: 8,
        phase: 'evolution' as Phase,
        title: 'Stakeholder Delivery',
        time: '10:49 AM',
        description: 'Teacher sees prioritized alert in Mission Control. Student receives targeted feedback. Parent dashboard updates with growth insight.',
        highlights: ['portals', 'vsl'],
        dataPacket: { teacherAlert: { priority: 'MEDIUM', actionType: 'REVIEW_SUGGESTED' }, studentFeedback: 'Consider how the Treaty created economic conditions...' }
      }
    ] as ScenarioStep[]
  };

  useEffect(() => {
    if (autoPlay && scenarioActive && scenarioStep < scenario.steps.length - 1) {
      const timer = setTimeout(() => setScenarioStep(s => s + 1), 3500);
      return () => clearTimeout(timer);
    } else if (autoPlay && scenarioStep >= scenario.steps.length - 1) {
      setAutoPlay(false);
    }
  }, [autoPlay, scenarioActive, scenarioStep, scenario.steps.length]);

  const currentStep = scenario.steps[scenarioStep];
  const isHighlighted = (id: string) => scenarioActive && currentStep?.highlights?.includes(id);

  const getPhaseColor = (phase: Phase) => {
    switch (phase) {
      case 'interaction': return '#0EA5E9';
      case 'analysis': return '#10B981';
      case 'evolution': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  return (
    <div className="min-h-screen bg-[#060912] text-white pt-20 relative overflow-hidden">
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

      {/* Header */}
      <header className="relative px-6 lg:px-16 pt-10 pb-6 flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span className="text-[11px] text-sky-500 font-semibold tracking-wider">SYSTEM ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Demo</h1>
          <p className="text-sm text-slate-500 max-w-md">
            A living intelligence system that captures, structures, reasons, and evolves with every student interaction.
          </p>
        </div>

        {/* Scenario Controls */}
        <div className="flex gap-2 items-center flex-wrap">
          {!scenarioActive ? (
            <button
              onClick={() => { setScenarioActive(true); setScenarioStep(0); }}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Watch Live Scenario
            </button>
          ) : (
            <>
              <button
                onClick={() => setScenarioStep(Math.max(0, scenarioStep - 1))}
                disabled={scenarioStep === 0}
                className="px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${autoPlay ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'}`}
              >
                {autoPlay ? '⏸ Pause' : '▶ Auto'}
              </button>
              <button
                onClick={() => setScenarioStep(Math.min(scenario.steps.length - 1, scenarioStep + 1))}
                disabled={scenarioStep === scenario.steps.length - 1}
                className="px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
              <button
                onClick={() => { setScenarioActive(false); setAutoPlay(false); }}
                className="px-3 py-2 bg-transparent text-slate-500 border border-slate-700 rounded-lg text-sm hover:text-white"
              >
                ✕ Exit
              </button>
            </>
          )}
        </div>
      </header>

      {/* Scenario Narrator Panel */}
      {scenarioActive && (
        <div className="px-6 lg:px-16 mb-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-0 bg-[#0c1220] border border-slate-800 rounded-2xl overflow-hidden">
            {/* Left: Step Info */}
            <div className="p-6 flex gap-5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${getPhaseColor(currentStep.phase)}40, ${getPhaseColor(currentStep.phase)}10)`,
                  border: `1px solid ${getPhaseColor(currentStep.phase)}50`,
                  color: getPhaseColor(currentStep.phase)
                }}
              >
                {scenarioStep + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: getPhaseColor(currentStep.phase) }}>
                    Phase: {currentStep.phase}
                  </span>
                  <span className="text-[11px] text-slate-600">•</span>
                  <span className="text-[11px] text-slate-500">{currentStep.time}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{currentStep.description}</p>
              </div>
              {/* Progress Dots */}
              <div className="flex flex-col gap-1.5 pt-1">
                {scenario.steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setScenarioStep(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === scenarioStep ? '20px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === scenarioStep ? getPhaseColor(step.phase) : i < scenarioStep ? `${getPhaseColor(step.phase)}60` : '#334155',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Data Packet */}
            <div className="bg-[#0a0f1a] border-l border-slate-800 p-4 font-mono text-[10px]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500 font-semibold">LIVE DATA PACKET</span>
              </div>
              <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed overflow-auto max-h-32">
                {JSON.stringify(currentStep.dataPacket, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Architecture Grid */}
      <div className="px-6 lg:px-16 relative">
        {/* Top Infrastructure Bar */}
        <div className="grid lg:grid-cols-[1fr_1.5fr_1fr] gap-4 mb-4">
          {/* Google Stack */}
          <ArchCard highlighted={isHighlighted('google-stack')} color="#0EA5E9">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-md" style={{ background: 'linear-gradient(135deg, #4285F4 25%, #34A853 25%, #34A853 50%, #FBBC05 50%, #FBBC05 75%, #EA4335 75%)' }} />
              <div>
                <h3 className="text-sm font-semibold">Google Stack</h3>
                <p className="text-[10px] text-slate-500">Infrastructure Layer</p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['GKE', 'Vertex AI', 'BigQuery', 'Firebase'].map(t => (
                <span key={t} className="px-2 py-1 bg-slate-800 rounded text-[9px] text-slate-400">{t}</span>
              ))}
            </div>
          </ArchCard>

          {/* AEIOS Atlas */}
          <ArchCard highlighted={isHighlighted('graph-d')} color="#0EA5E9">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-sky-500/20 border border-sky-500/50 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="5" cy="5" r="2" />
                    <line x1="14.5" y1="9.5" x2="17" y2="7" /><line x1="9.5" y1="14.5" x2="7" y2="17" /><line x1="9.5" y1="9.5" x2="7" y2="7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">AEIOS Atlas</h3>
                  <p className="text-[10px] text-slate-500">Semantic Backbone & Memory</p>
                </div>
              </div>
              <div className="text-lg font-bold text-sky-500">20K+</div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 p-2.5 bg-blue-900/10 rounded-lg border-l-2 border-blue-700">
                <p className="text-[10px] font-semibold text-blue-500">L1: External Standards</p>
                <p className="text-[9px] text-slate-500">Curriculum ontology</p>
              </div>
              <div className="flex-1 p-2.5 bg-sky-500/10 rounded-lg border-l-2 border-sky-500">
                <p className="text-[10px] font-semibold text-sky-500">L2: AEI Capability</p>
                <p className="text-[9px] text-slate-500">Three Pillars mapping</p>
              </div>
            </div>
          </ArchCard>

          {/* Three Pillars */}
          <ArchCard>
            <p className="text-[10px] font-semibold text-slate-500 mb-2 tracking-wider">THREE-PILLAR FRAMEWORK</p>
            <div className="flex gap-2">
              {[
                { id: 'P1', name: 'Knowledge', color: '#1C5F9D' },
                { id: 'P2', name: 'Cognitive', color: '#0EA5E9' },
                { id: 'P3', name: 'Agentic', color: '#10B981' }
              ].map(p => (
                <div key={p.id} className="flex-1 p-2.5 rounded-lg text-center" style={{ backgroundColor: `${p.color}10`, border: `1px solid ${p.color}30` }}>
                  <div className="text-sm font-bold" style={{ color: p.color }}>{p.id}</div>
                  <div className="text-[8px] text-slate-500 mt-0.5">{p.name}</div>
                </div>
              ))}
            </div>
          </ArchCard>
        </div>

        {/* Four Phase Columns */}
        <div className="grid lg:grid-cols-4 gap-3">
          {/* Phase 1: Initialization */}
          <PhaseColumn phase={1} title="Initialization" subtitle="System Setup" color="#1C5F9D">
            <PhaseItem title="Curriculum Ingestion" subtitle="Hybrid Tagging Pipeline" />
            <PhaseItem title="Student Onboarding" subtitle="E-CAP, A-Profile, IEP" />
            <PhaseItem title="Digital Twin Genesis" subtitle="Initial learner model" />
          </PhaseColumn>

          {/* Phase 2: Live Interaction */}
          <PhaseColumn
            phase={2}
            title="Live Interaction"
            subtitle="Real-Time Adaptation"
            color="#0EA5E9"
            highlighted={isHighlighted('student-aul') || isHighlighted('data-capture') || isHighlighted('sensing')}
          >
            <PhaseItem title="Student ↔ AUL" subtitle="Atomic Unit of Learning" highlighted={isHighlighted('student-aul')} color="#0EA5E9" />
            <PhaseItem
              title="Sensing & Regulation"
              subtitle=""
              highlighted={isHighlighted('sensing')}
              color="#0EA5E9"
              tags={[{ label: 'ASM', active: isHighlighted('asm') }, { label: 'BAE 2.0', active: isHighlighted('bae-live') }]}
            />
            <PhaseItem
              title="Data Capture"
              subtitle="47 behavioral signals"
              highlighted={isHighlighted('data-capture')}
              color="#0EA5E9"
              customContent={
                <div className="flex gap-2 mt-2">
                  <div className={`flex-1 p-1.5 rounded text-center ${isHighlighted('ad-pd') ? 'bg-sky-500/20' : 'bg-slate-900'}`}>
                    <p className="text-[9px] font-semibold text-sky-500">AD</p>
                    <p className="text-[7px] text-slate-500">Artifact</p>
                  </div>
                  <div className={`flex-1 p-1.5 rounded text-center ${isHighlighted('ad-pd') ? 'bg-sky-500/20' : 'bg-slate-900'}`}>
                    <p className="text-[9px] font-semibold text-sky-500">PD</p>
                    <p className="text-[7px] text-slate-500">Process</p>
                  </div>
                </div>
              }
            />
          </PhaseColumn>

          {/* Phase 3: Analysis Pipeline */}
          <PhaseColumn
            phase={3}
            title="Analysis Pipeline"
            subtitle="Async Processing"
            color="#10B981"
            highlighted={isHighlighted('functional-ai') || isHighlighted('cwa')}
          >
            <PhaseItem
              title="Functional AI"
              subtitle="P1/P2"
              highlighted={isHighlighted('functional-ai')}
              color="#10B981"
              tags={[{ label: 'CME', active: isHighlighted('cme') }, { label: 'PFE', active: false }, { label: 'CSA', active: isHighlighted('csa') }]}
            />
            <PhaseItem
              title="Behavioral AI"
              subtitle="P3"
              highlighted={isHighlighted('behavioral-ai')}
              color="#10B981"
              tags={[{ label: 'BAE 2.0', active: false }, { label: 'CIA', active: false }, { label: 'NDE', active: false }]}
            />
            <PhaseItem title="CWA 2.0" subtitle="Contextual Weighting Algorithm" highlighted={isHighlighted('cwa')} color="#10B981" />
            <PhaseItem title="RCA Engine" subtitle="Root Cause Analysis" highlighted={isHighlighted('rca')} color="#10B981" />
          </PhaseColumn>

          {/* Phase 4: Evolution & Impact */}
          <PhaseColumn
            phase={4}
            title="Evolution & Impact"
            subtitle="Longitudinal Stewardship"
            color="#8b5cf6"
            highlighted={isHighlighted('portals') || isHighlighted('outputs')}
          >
            <PhaseItem title="Memory Update" subtitle="AEIOS Atlas Evolution" highlighted={isHighlighted('memory')} color="#8b5cf6" />
            <PhaseItem title="CEE" subtitle="Causal Efficacy Engine" highlighted={isHighlighted('cee')} color="#8b5cf6" />
            <PhaseItem title="Outputs & Disbursement" subtitle="RAG Narrative Generation" highlighted={isHighlighted('outputs')} color="#8b5cf6" />
            <PhaseItem
              title="Stakeholder Portals"
              subtitle=""
              highlighted={isHighlighted('portals')}
              color="#8b5cf6"
              tags={[{ label: 'Student', active: false }, { label: 'Teacher', active: false }, { label: 'Parent', active: false }, { label: 'Admin', active: false }]}
            />
            <PhaseItem title="VSL" subtitle="Verified Skill Ledger" highlighted={isHighlighted('vsl')} color="#8b5cf6" />
          </PhaseColumn>
        </div>

        {/* Flow Direction Indicators */}
        <div className="flex justify-center gap-24 lg:gap-48 mt-6 mb-4">
          {[
            { from: 'Setup', to: 'Capture', color: '#1C5F9D' },
            { from: 'Capture', to: 'Analyze', color: '#0EA5E9' },
            { from: 'Analyze', to: 'Evolve', color: '#10B981' }
          ].map((flow, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[9px] text-slate-600">{flow.from}</span>
              <div className="relative w-10 h-0.5 rounded" style={{ background: `linear-gradient(90deg, ${flow.color}50, ${flow.color})` }}>
                <div
                  className="absolute -right-1 top-1/2 -translate-y-1/2"
                  style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${flow.color}` }}
                />
              </div>
              <span className="text-[9px] text-slate-600">{flow.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="px-6 lg:px-16 py-10 flex flex-wrap justify-center gap-8 lg:gap-16">
        {[
          { value: '47', label: 'Behavioral Signals', color: '#0EA5E9' },
          { value: '20K+', label: 'Knowledge Nodes', color: '#0EA5E9' },
          { value: '500+', label: 'Navigator Rules', color: '#10B981' },
          { value: '<100ms', label: 'Decision Latency', color: '#10B981' },
          { value: '4', label: 'Stakeholder Portals', color: '#8b5cf6' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

// Sub-components
const ArchCard: React.FC<{ children: React.ReactNode; highlighted?: boolean; color?: string }> = ({ children, highlighted, color }) => (
  <div
    className="p-4 rounded-xl transition-all duration-300"
    style={{
      backgroundColor: highlighted ? '#1e293b' : '#0c1220',
      border: `1px solid ${highlighted && color ? color : '#1e293b'}`,
      boxShadow: highlighted ? `0 0 40px ${color}15` : 'none'
    }}
  >
    {children}
  </div>
);

const PhaseColumn: React.FC<{
  phase: number;
  title: string;
  subtitle: string;
  color: string;
  highlighted?: boolean;
  children: React.ReactNode;
}> = ({ phase, title, subtitle, color, highlighted, children }) => (
  <div
    className="rounded-xl overflow-hidden transition-all duration-300"
    style={{
      backgroundColor: '#0c1220',
      border: `1px solid ${highlighted ? color : '#1e293b'}`,
      boxShadow: highlighted ? `0 0 40px ${color}15` : 'none'
    }}
  >
    <div className="p-3.5 border-b border-slate-800" style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold opacity-70" style={{ color }}>0{phase}</span>
        <div>
          <h3 className="text-xs font-semibold">{title}</h3>
          <p className="text-[9px] text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="p-3 flex flex-col gap-2">
      {children}
    </div>
  </div>
);

const PhaseItem: React.FC<{
  title: string;
  subtitle: string;
  highlighted?: boolean;
  color?: string;
  tags?: { label: string; active: boolean }[];
  customContent?: React.ReactNode;
}> = ({ title, subtitle, highlighted, color, tags, customContent }) => (
  <div
    className="p-2.5 rounded-lg transition-all duration-300"
    style={{
      backgroundColor: highlighted ? `${color}15` : '#1e293b',
      border: highlighted ? `1px solid ${color}50` : '1px solid transparent'
    }}
  >
    <p className="text-[11px] font-semibold mb-0.5">{title}</p>
    {subtitle && <p className="text-[9px] text-slate-500">{subtitle}</p>}
    {tags && (
      <div className="flex gap-1 flex-wrap mt-1.5">
        {tags.map(t => (
          <span
            key={t.label}
            className="px-1.5 py-0.5 rounded text-[8px]"
            style={{
              backgroundColor: t.active ? `${color}30` : '#0a0f1a',
              color: t.active ? color : '#64748b'
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
    )}
    {customContent}
  </div>
);

export default Engine;
