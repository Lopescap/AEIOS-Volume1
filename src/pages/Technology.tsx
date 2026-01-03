import React, { useState, useEffect } from 'react';

type NodeId = 'input' | 'graph' | 'logic' | 'output' | null;

const Technology: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeId>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const systemNodes = [
    {
      id: 'input' as const,
      label: 'DATA INGESTION',
      description: 'Curriculum standards, student interactions, and behavioral signals flow into the system through secure integrations with existing school infrastructure.',
      details: 'Every interaction—assignments, submissions, revisions, time-on-task—becomes a learning signal that feeds the intelligence layer.'
    },
    {
      id: 'graph' as const,
      label: 'AEIOS ATLAS',
      description: 'The system\'s semantic memory — a unified knowledge architecture that maps curriculum, skills, and learning relationships.',
      details: 'AEIOS Atlas connects every concept, skill, and interaction into a unified architecture that reveals hidden relationships and optimal learning pathways.'
    },
    {
      id: 'logic' as const,
      label: 'AEIOS NAVIGATOR',
      description: 'The reasoning and orchestration engine that transforms data into actionable insights.',
      details: 'AEIOS Navigator applies educational expertise to generate personalized recommendations, predict learning trajectories, and identify intervention opportunities.'
    },
    {
      id: 'output' as const,
      label: 'STAKEHOLDER PORTALS',
      description: 'Personalized interfaces that deliver the right information to the right person at the right time.',
      details: 'Each stakeholder sees a tailored view—students get growth insights, teachers get actionable alerts, parents see progress narratives, administrators access system-wide analytics.'
    }
  ];

  const pillars = [
    { id: 'p1', label: 'P1', name: 'Knowledge State', color: '#1C5F9D', desc: 'What do they know?', detail: 'Mastery of concepts, skills, and curriculum standards across all subjects.' },
    { id: 'p2', label: 'P2', name: 'Cognitive Architecture', color: '#0EA5E9', desc: 'How do they think?', detail: 'Problem-solving approaches, reasoning patterns, and metacognitive strategies.' },
    { id: 'p3', label: 'P3', name: 'Agentic Character', color: '#10B981', desc: 'Who are they becoming?', detail: 'Persistence, self-regulation, collaboration, and growth mindset development.' }
  ];

  const capabilities = [
    { metric: 'Response Latency', value: '<100ms', note: 'Real-time decision threshold' },
    { metric: 'Curriculum Coverage', value: 'K-12', note: 'All subjects & standards' },
    { metric: 'Stakeholder Portals', value: '4', note: 'Student, Teacher, Parent, Admin' },
    { metric: 'Integration', value: 'Native', note: 'Google Workspace compatible' },
  ];

  return (
    <div className="min-h-screen bg-[#060912] text-white overflow-hidden relative pt-20">
      {/* Blueprint Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.06) 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />

      {/* Corner Marks */}
      <div className="fixed top-24 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-700" />
      <div className="fixed top-24 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-700" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-700" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-700" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row items-start justify-between border-b border-slate-800 pb-6 mb-10">
            <div>
              <div className="text-xs text-slate-500 tracking-[0.2em] mb-3 font-mono">TECHNICAL OVERVIEW</div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                System Architecture
              </h1>
              <div className="text-slate-500">
                AEIOS Platform Architecture
              </div>
            </div>
            <div className="text-right text-sm text-slate-600 font-mono mt-4 lg:mt-0">
              <div className="mt-3 px-3 py-1 border border-slate-700 inline-block text-xs tracking-wider text-slate-400">
                OVERVIEW
              </div>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative border border-slate-800 bg-slate-900/30 rounded-lg p-6 mb-10">
            <div className="absolute -top-3 left-6 bg-[#060912] px-3 text-xs tracking-[0.15em] text-slate-500 font-mono">
              FIG. 01 — DATA FLOW ARCHITECTURE
            </div>

            <svg viewBox="0 0 800 420" className="w-full" style={{ height: '400px' }}>
              {/* THREE PILLARS SECTION */}
              <text x="400" y="32" style={{ fontSize: '11px', fill: '#64748b', fontWeight: '600', letterSpacing: '3px' }} textAnchor="middle">
                THREE PILLARS FRAMEWORK
              </text>

              {/* P1 Box */}
              <rect x="195" y="50" width="110" height="65" fill="#0c1220" stroke="#1C5F9D" strokeWidth="2" rx="4" />
              <text x="250" y="82" style={{ fontSize: '24px', fill: '#1C5F9D', fontWeight: 'bold' }} textAnchor="middle">P1</text>
              <text x="250" y="102" style={{ fontSize: '9px', fill: '#64748b', letterSpacing: '2px' }} textAnchor="middle">KNOWLEDGE</text>

              {/* P2 Box */}
              <rect x="345" y="50" width="110" height="65" fill="#0c1220" stroke="#0EA5E9" strokeWidth="2" rx="4" />
              <text x="400" y="82" style={{ fontSize: '24px', fill: '#0EA5E9', fontWeight: 'bold' }} textAnchor="middle">P2</text>
              <text x="400" y="102" style={{ fontSize: '9px', fill: '#64748b', letterSpacing: '2px' }} textAnchor="middle">COGNITION</text>

              {/* P3 Box */}
              <rect x="495" y="50" width="110" height="65" fill="#0c1220" stroke="#10B981" strokeWidth="2" rx="4" />
              <text x="550" y="82" style={{ fontSize: '24px', fill: '#10B981', fontWeight: 'bold' }} textAnchor="middle">P3</text>
              <text x="550" y="102" style={{ fontSize: '9px', fill: '#64748b', letterSpacing: '2px' }} textAnchor="middle">CHARACTER</text>

              {/* Pillar connections to core */}
              <path d="M 250 115 L 250 155 Q 250 175 300 195 L 330 210" fill="none" stroke="#1C5F9D" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
              <path d="M 400 115 L 400 240" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
              <path d="M 550 115 L 550 155 Q 550 175 500 195 L 470 210" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />

              {/* Main flow connections */}
              <path d="M 175 225 Q 220 225 220 265 Q 220 290 275 290" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="8,5" />
              <line x1="375" y1="290" x2="425" y2="290" stroke="#334155" strokeWidth="2" />
              <path d="M 525 290 Q 580 290 580 265 Q 580 225 625 225" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="8,5" />

              {/* Feedback Loop */}
              <path d="M 400 340 Q 400 380 270 380 Q 100 380 100 290 Q 100 210 150 195" fill="none" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.4" />
              <text x="250" y="398" style={{ fontSize: '10px', fill: '#0EA5E9', letterSpacing: '2px' }} textAnchor="middle">FEEDBACK LOOP</text>

              {/* INPUT NODE */}
              <g style={{ cursor: 'pointer' }} onClick={() => setActiveNode(activeNode === 'input' ? null : 'input')}>
                <rect x="30" y="185" width="145" height="80" fill={activeNode === 'input' ? '#1e293b' : '#0c1220'} stroke={activeNode === 'input' ? '#0EA5E9' : '#334155'} strokeWidth="2" rx="4" />
                <text x="102" y="220" style={{ fontSize: '14px', fill: '#e2e8f0', fontWeight: 'bold' }} textAnchor="middle">DATA INGESTION</text>
                <text x="102" y="243" style={{ fontSize: '12px', fill: '#64748b' }} textAnchor="middle">Google Stack</text>
                <circle cx="175" cy="225" r="5" fill={activeNode === 'input' ? '#0EA5E9' : '#334155'} />
              </g>

              {/* AEIOS ATLAS NODE */}
              <g style={{ cursor: 'pointer' }} onClick={() => setActiveNode(activeNode === 'graph' ? null : 'graph')}>
                <rect x="275" y="250" width="100" height="80" fill={activeNode === 'graph' ? '#1e293b' : '#0c1220'} stroke={activeNode === 'graph' ? '#1C5F9D' : '#1C5F9D'} strokeWidth="2.5" rx="4" />
                <text x="325" y="287" style={{ fontSize: '11px', fill: '#1C5F9D', fontWeight: 'bold' }} textAnchor="middle">AEIOS ATLAS</text>
                <text x="325" y="310" style={{ fontSize: '10px', fill: '#64748b' }} textAnchor="middle">Semantic Memory</text>
                <circle cx="275" cy="290" r="4" fill="#1C5F9D" />
                <circle cx="375" cy="290" r="4" fill="#1C5F9D" />
              </g>

              {/* AEIOS NAVIGATOR NODE */}
              <g style={{ cursor: 'pointer' }} onClick={() => setActiveNode(activeNode === 'logic' ? null : 'logic')}>
                <rect x="425" y="250" width="100" height="80" fill={activeNode === 'logic' ? '#1e293b' : '#0c1220'} stroke={activeNode === 'logic' ? '#0EA5E9' : '#0EA5E9'} strokeWidth="2.5" rx="4" />
                <text x="475" y="283" style={{ fontSize: '9px', fill: '#0EA5E9', fontWeight: 'bold' }} textAnchor="middle">AEIOS</text>
                <text x="475" y="295" style={{ fontSize: '9px', fill: '#0EA5E9', fontWeight: 'bold' }} textAnchor="middle">NAVIGATOR</text>
                <text x="475" y="310" style={{ fontSize: '10px', fill: '#64748b' }} textAnchor="middle">Reasoning Engine</text>
                <circle cx="425" cy="290" r="4" fill="#0EA5E9" />
                <circle cx="525" cy="290" r="4" fill="#0EA5E9" />
              </g>

              {/* OUTPUT NODE */}
              <g style={{ cursor: 'pointer' }} onClick={() => setActiveNode(activeNode === 'output' ? null : 'output')}>
                <rect x="625" y="185" width="145" height="80" fill={activeNode === 'output' ? '#1e293b' : '#0c1220'} stroke={activeNode === 'output' ? '#10B981' : '#334155'} strokeWidth="2" rx="4" />
                <text x="697" y="220" style={{ fontSize: '14px', fill: '#e2e8f0', fontWeight: 'bold' }} textAnchor="middle">PORTALS</text>
                <text x="697" y="243" style={{ fontSize: '12px', fill: '#64748b' }} textAnchor="middle">Stakeholder UIs</text>
                <circle cx="625" cy="225" r="5" fill={activeNode === 'output' ? '#10B981' : '#334155'} />
              </g>

              {/* Zone Labels */}
              <text x="102" y="283" style={{ fontSize: '9px', fill: '#475569', letterSpacing: '2px' }} textAnchor="middle">INPUT</text>
              <text x="400" y="355" style={{ fontSize: '9px', fill: '#475569', letterSpacing: '2px' }} textAnchor="middle">INTELLIGENCE CORE</text>
              <text x="697" y="283" style={{ fontSize: '9px', fill: '#475569', letterSpacing: '2px' }} textAnchor="middle">OUTPUT</text>
            </svg>

            <div className="text-xs text-slate-600 text-right mt-2 font-mono">
              Click nodes to inspect details
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {activeNode && (
          <div className={`mb-10 border border-slate-800 bg-slate-900/50 rounded-lg p-6 transition-all duration-300`}>
            <div className="text-xs tracking-[0.15em] text-slate-500 mb-4 font-mono">
              COMPONENT — {systemNodes.find(n => n.id === activeNode)?.label}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {systemNodes.find(n => n.id === activeNode)?.label}
              </h3>
              <p className="text-slate-400 mb-4">
                {systemNodes.find(n => n.id === activeNode)?.description}
              </p>
              <p className="text-slate-500 text-sm">
                {systemNodes.find(n => n.id === activeNode)?.details}
              </p>
            </div>
          </div>
        )}

        {/* Pillars */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="border-t border-slate-800 pt-8 mb-10">
            <div className="text-xs tracking-[0.15em] text-slate-500 mb-6 font-mono">
              FIG. 02 — MEASUREMENT FRAMEWORK
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.id}
                  className="border border-slate-800 bg-slate-900/30 rounded-lg p-5 relative hover:bg-slate-900/50 transition-colors"
                  style={{ borderLeftColor: pillar.color, borderLeftWidth: '4px' }}
                >
                  <div className="absolute -top-2.5 left-4 bg-[#060912] px-2 text-[10px] text-slate-500 font-mono">
                    PILLAR {index + 1}
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: pillar.color }}>
                    {pillar.label}
                  </div>
                  <div className="font-semibold text-lg mb-1 text-white">{pillar.name}</div>
                  <div className="text-slate-400 italic text-sm mb-3">"{pillar.desc}"</div>
                  <div className="text-slate-500 text-xs">{pillar.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Table */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="border border-slate-800 bg-slate-900/30 rounded-lg overflow-hidden">
            <div className="border-b border-slate-800 p-4 bg-slate-800/50">
              <div className="text-xs tracking-[0.15em] text-slate-400 font-mono">TABLE 01 — SYSTEM CAPABILITIES</div>
            </div>
            <div className="divide-y divide-slate-800">
              {capabilities.map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="font-medium text-slate-300">{row.metric}</div>
                  <div className="font-bold text-xl text-sky-400 font-mono">{row.value}</div>
                  <div className="text-slate-500 text-sm">{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Technology;
