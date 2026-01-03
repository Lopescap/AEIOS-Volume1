import React, { useState, useMemo } from 'react';
import { TrendingUp, Wallet, Award } from 'lucide-react';

type Section = 'overview' | 'allocation' | 'student' | 'vault' | 'simulator';

const Blueprint: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  // Simulator state
  const [simTier, setSimTier] = useState('above');
  const [simAttendance, setSimAttendance] = useState('95');
  const [simYears, setSimYears] = useState(4);
  const [simClassSize, setSimClassSize] = useState(25);

  // Calculate savings table data
  const savingsData = useMemo(() => {
    const grades = ['Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    let balance = 0;
    let totalInterest = 0;

    return grades.map(grade => {
      balance += 750;
      const interest = balance * 0.045;
      totalInterest += interest;
      balance += interest;
      return { grade, deposit: 750, interest: Math.round(interest), balance: Math.round(balance), totalInterest: Math.round(totalInterest) };
    });
  }, []);

  // Simulator calculations
  const simResults = useMemo(() => {
    let annualLottery = 0;
    if (simTier === 'top') annualLottery += 180;
    else if (simTier === 'above') annualLottery += 60;
    if (simTier === 'above' || simTier === 'average') annualLottery += 80;
    else if (simTier === 'below') annualLottery += 120;
    if (simAttendance === '98') annualLottery += 100;
    else if (simAttendance === '95') annualLottery += 70;
    else if (simAttendance === '90') annualLottery += 30;
    annualLottery += (200 / simClassSize) * 12 * 0.5;
    if (simTier === 'top' || simTier === 'above') annualLottery += 40;

    let guaranteed = 0;
    let totalInterest = 0;
    let totalLottery = 0;

    for (let i = 0; i < simYears; i++) {
      guaranteed += 750;
      const interest = guaranteed * 0.045;
      totalInterest += interest;
      guaranteed += interest;
      totalLottery += annualLottery;
    }

    return {
      guaranteed: Math.round(guaranteed - totalInterest),
      lottery: Math.round(totalLottery),
      interest: Math.round(totalInterest),
      total: Math.round(guaranteed + totalLottery)
    };
  }, [simTier, simAttendance, simYears, simClassSize]);

  const navItems: { id: Section; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'allocation', label: 'Allocation' },
    { id: 'student', label: 'Full Breakdown' },
    { id: 'vault', label: 'Vault Yield' },
    { id: 'simulator', label: 'Simulator' },
  ];

  return (
    <div className="bg-[#060912] min-h-screen text-white relative overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-4">0→1 Incentive Architecture</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Engagement Allocated <span className="text-teal-400">Reward Network.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The incentive architecture that rewards performance, encourages engagement, and builds futures through intelligent allocation.
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-12">
          <div className="inline-flex gap-1 p-2 bg-slate-900/80 rounded-xl border border-white/10">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-slate-800 text-white shadow-lg ring-1 ring-teal-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="of Annual Tuition Per Student" value="20%" color="teal" />
              <StatCard label="Guaranteed Savings" value="37.5%" color="blue" />
              <StatCard label="Student Performance Pool" value="50%" color="green" />
              <StatCard label="Parent Engagement Pool" value="12.5%" color="orange" />
            </div>

            {/* Terminal Card */}
            <div className="bg-gradient-to-br from-slate-800/80 to-teal-900/20 rounded-2xl border border-teal-500/30 overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-xs font-mono text-slate-500">aeios_earn.sys</span>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">One System.</h2>
                    <h2 className="text-3xl font-bold text-teal-400 mb-6">Three Pathways.</h2>
                    <p className="text-slate-400 mb-8">Every dollar tracked. Every reward earned. Every student invested in—automatically.</p>

                    <div className="space-y-3">
                      <StatusItem label="Guaranteed Savings Layer" status="ACTIVE" color="green" active />
                      <StatusItem label="Student Performance Pool" status="PROCESSING" color="orange" />
                      <StatusItem label="Parent Engagement Pool" status="READY" color="blue" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* Pie Chart Visualization */}
                    <div className="relative w-64 h-64">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="20" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="94.2 251.2" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="20" strokeDasharray="125.6 251.2" strokeDashoffset="-94.2" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="31.4 251.2" strokeDashoffset="-219.8" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold font-mono">20%</div>
                          <div className="text-xs text-slate-500">of tuition</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Pools */}
            <div className="grid md:grid-cols-3 gap-6">
              <PoolCard
                icon="P1"
                iconColor="teal"
                title="Guaranteed Savings"
                description="100% secure allocation into AEIOS Wallet. Grows at 4.5% APY. Accessible at graduation."
                onClick={() => setActiveSection('allocation')}
              />
              <PoolCard
                icon="P2"
                iconColor="green"
                title="Student Performance Pool"
                description="Performance-based rewards across 5 monthly categories. Multiple pathways to win."
                onClick={() => setActiveSection('student')}
              />
              <PoolCard
                icon="P3"
                iconColor="orange"
                title="Parent Engagement Pool"
                description="Family engagement incentive. Top 20% qualify. One winner per classroom."
                onClick={() => setActiveSection('student')}
              />
            </div>
          </div>
        )}

        {/* Allocation Section */}
        {activeSection === 'allocation' && (
          <div className="space-y-12">
            <div>
              <div className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-2">Annual Breakdown</div>
              <h2 className="text-3xl font-bold mb-2">20% of Tuition <span className="text-teal-400">Allocation Model</span></h2>
              <p className="text-slate-400">Every student receives the same investment. How it's distributed creates the magic.</p>
            </div>

            {/* Allocation Bar */}
            <div>
              <div className="h-12 rounded-lg overflow-hidden flex text-sm font-mono font-medium">
                <div className="w-[37.5%] bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">37.5%</div>
                <div className="w-[50%] bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center text-slate-900">50%</div>
                <div className="w-[12.5%] bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center text-slate-900">12.5%</div>
              </div>
              <div className="flex justify-between mt-4 text-sm text-slate-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> Guaranteed Savings</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-teal-500"></div> Student Performance Pool</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-orange-500"></div> Parent Engagement Pool</div>
              </div>
            </div>

            {/* Scenario Footnote */}
            <div className="bg-slate-800/30 border border-white/5 rounded-lg p-4 text-xs text-slate-500">
              <div className="font-medium text-slate-400 mb-2">Scenario Assumptions:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><span className="text-slate-400">Annual Tuition:</span> $10,000</div>
                <div><span className="text-slate-400">Allocation Rate:</span> 20% of tuition</div>
                <div><span className="text-slate-400">Per Student:</span> $2,000/year</div>
                <div><span className="text-slate-400">Vault APY:</span> 4.5%</div>
              </div>
              <div className="mt-2 text-slate-600">* All projections based on K-12 enrollment with consistent annual deposits and compound interest.</div>
            </div>

            {/* Savings Table */}
            <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
              <div className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-2">Compound Growth</div>
              <h3 className="text-xl font-bold mb-6">K-12 Guaranteed Savings <span className="text-teal-400">Projection</span></h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Grade</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Annual Deposit</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Interest (4.5% APY)</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Year-End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savingsData.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">{row.grade}</td>
                        <td className="py-3 px-4 text-right font-mono">$750</td>
                        <td className="py-3 px-4 text-right font-mono text-green-400">${row.interest}</td>
                        <td className="py-3 px-4 text-right font-mono font-semibold">${row.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-teal-500">
                      <td className="py-4 px-4 font-semibold">TOTAL AT GRADUATION</td>
                      <td className="py-4 px-4 text-right font-mono">$9,750</td>
                      <td className="py-4 px-4 text-right font-mono text-green-400">${savingsData[savingsData.length - 1].totalInterest.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-teal-400">${savingsData[savingsData.length - 1].balance.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Growth Chart Visualization - Interactive Line Chart */}
            <div className="bg-slate-900/50 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-slate-400">Balance Growth Over Time</h4>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-teal-400"></div>
                    <span className="text-slate-500">Balance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-green-400"></div>
                    <span className="text-slate-500">Interest</span>
                  </div>
                </div>
              </div>
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 w-12 flex flex-col justify-between text-xs text-slate-500 font-mono" style={{ height: 'calc(100% - 2rem)' }}>
                  <span>$16K</span>
                  <span>$12K</span>
                  <span>$8K</span>
                  <span>$4K</span>
                  <span>$0</span>
                </div>
                {/* Chart area */}
                <div className="ml-14 relative" style={{ height: 'calc(100% - 2rem)' }}>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="border-t border-slate-700/50 w-full"></div>
                    ))}
                  </div>
                  {/* SVG Line Chart */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 200" preserveAspectRatio="none">
                    {/* Interest area fill */}
                    <path
                      d={`M0,${200 - (savingsData[0].totalInterest / 16000) * 200} ${savingsData.map((row, i) => `L${(i / 12) * 520},${200 - (row.totalInterest / 16000) * 200}`).join(' ')} L520,200 L0,200 Z`}
                      fill="url(#interestGradient)"
                      opacity="0.3"
                    />
                    {/* Balance area fill */}
                    <path
                      d={`M0,${200 - (savingsData[0].balance / 16000) * 200} ${savingsData.map((row, i) => `L${(i / 12) * 520},${200 - (row.balance / 16000) * 200}`).join(' ')} L520,200 L0,200 Z`}
                      fill="url(#balanceGradient)"
                      opacity="0.2"
                    />
                    {/* Interest line */}
                    <path
                      d={`M0,${200 - (savingsData[0].totalInterest / 16000) * 200} ${savingsData.map((row, i) => `L${(i / 12) * 520},${200 - (row.totalInterest / 16000) * 200}`).join(' ')}`}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    {/* Balance line */}
                    <path
                      d={`M0,${200 - (savingsData[0].balance / 16000) * 200} ${savingsData.map((row, i) => `L${(i / 12) * 520},${200 - (row.balance / 16000) * 200}`).join(' ')}`}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                    />
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Interactive data points */}
                  <div className="absolute inset-0 flex justify-between">
                    {savingsData.map((row, i) => (
                      <div key={i} className="relative group flex flex-col items-center" style={{ width: `${100 / 13}%` }}>
                        {/* Hover area */}
                        <div className="absolute inset-0 cursor-pointer"></div>
                        {/* Data point */}
                        <div
                          className="absolute w-3 h-3 bg-teal-400 rounded-full border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-teal-400/50"
                          style={{ top: `${100 - (row.balance / 16000) * 100}%`, transform: 'translate(-50%, -50%)' }}
                        ></div>
                        {/* Tooltip */}
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10"
                             style={{ top: `${Math.max(0, 100 - (row.balance / 16000) * 100 - 20)}%` }}>
                          <div className="bg-slate-800 border border-teal-500/30 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                            <div className="text-xs text-slate-400 mb-1">{row.grade}</div>
                            <div className="text-sm font-bold text-teal-400 font-mono">${row.balance.toLocaleString()}</div>
                            <div className="text-xs text-green-400 font-mono">+${row.interest} interest</div>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-slate-800 border-r border-b border-teal-500/30 transform rotate-45"></div>
                        </div>
                        {/* Vertical hover line */}
                        <div className="absolute top-0 bottom-0 w-px bg-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* X-axis labels */}
                <div className="ml-14 h-8 flex justify-between items-center text-xs text-slate-500">
                  {savingsData.map((_, i) => (
                    <span key={i} className="text-center" style={{ width: `${100 / 13}%` }}>
                      {i === 0 ? 'K' : i}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Allocation Breakdown Section */}
        {activeSection === 'student' && (
          <div className="space-y-12">
            <div>
              <div className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-2">Complete Allocation</div>
              <h2 className="text-3xl font-bold mb-2">Full Allocation <span className="text-teal-400">Breakdown</span></h2>
              <p className="text-slate-400">100% of the 20% tuition allocation — distributed across guaranteed savings, student performance, and parent engagement.</p>
            </div>

            {/* Allocation Summary Bar */}
            <div>
              <div className="h-10 rounded-lg overflow-hidden flex text-sm font-mono font-medium">
                <div className="w-[37.5%] bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">37.5%</div>
                <div className="w-[50%] bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center text-slate-900">50%</div>
                <div className="w-[12.5%] bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center text-slate-900">12.5%</div>
              </div>
              <div className="flex justify-between mt-3 text-xs text-slate-500">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500"></div> Guaranteed Savings</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-teal-500"></div> Student Performance</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-orange-500"></div> Parent Engagement</div>
              </div>
            </div>

            {/* Guaranteed Savings */}
            <div>
              <h3 className="text-lg font-bold mb-4">Guaranteed Savings <span className="text-slate-500 font-normal">(37.5%)</span></h3>
              <div className="bg-slate-800/50 rounded-2xl border border-blue-500/30 p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-teal-500/5 border border-blue-500/30 rounded-xl p-6 text-center">
                    <div className="text-sm text-slate-500 mb-2">Per Student Annually</div>
                    <div className="text-4xl font-bold font-mono text-blue-400">37.5%</div>
                    <div className="text-sm text-slate-400 mt-2">of allocation</div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Wallet size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">AEIOS Wallet</div>
                        <div className="text-xs text-slate-500">100% secure allocation into personal student wallet</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 flex-shrink-0">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">4.5% APY Growth</div>
                        <div className="text-xs text-slate-500">Compound interest grows savings over time</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 flex-shrink-0">
                        <Award size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Graduation Access</div>
                        <div className="text-xs text-slate-500">Full balance accessible upon graduation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Performance Categories */}
            <div>
              <h3 className="text-lg font-bold mb-4">Student Performance Pool <span className="text-slate-500 font-normal">(50%)</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <CategoryCard num={1} title="Top 10%" desc="Highest mastery scores" value="15%/yr" color="red" />
                <CategoryCard num={2} title="Most Improved" desc="Biggest growth gains" value="10%/yr" color="teal" />
                <CategoryCard num={3} title="Attendance" desc="95%+ attendance rate" value="5%/yr" color="green" />
                <CategoryCard num={4} title="Random Draw" desc="All students eligible" value="10%/yr" color="orange" />
                <CategoryCard num={5} title="Special Achievement" desc="Outstanding performance" value="10%/yr" color="purple" />
              </div>
            </div>

            {/* Parent Engagement Pool */}
            <div>
              <h3 className="text-lg font-bold mb-4">Parent Engagement Pool <span className="text-slate-500 font-normal">(12.5%)</span></h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
                  <h4 className="text-md font-bold mb-6">Qualification Criteria</h4>

                  <div className="relative pl-8 space-y-4">
                    <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-white/10"></div>

                    <TimelineItem label="App Engagement" text="Regular login and progress monitoring through the parent portal" />
                    <TimelineItem label="Conference Attendance" text="Participation in scheduled parent-teacher meetings" />
                    <TimelineItem label="Learning Support" text="Documented home learning activities and involvement" />
                    <TimelineItem label="Communication" text="Responsive engagement with teacher outreach" />
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
                  <h4 className="text-md font-bold mb-6">Prize Structure</h4>

                  <div className="bg-gradient-to-br from-orange-500/10 to-teal-500/5 border border-orange-500/30 rounded-xl p-8 text-center mb-6">
                    <div className="text-sm text-slate-500 mb-2">20-Student Classroom</div>
                    <div className="text-5xl font-bold font-mono text-orange-400">250%</div>
                    <div className="text-sm text-slate-400 mt-2">Single Annual Prize</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-500">Total Pool</span>
                      <span className="font-mono">12.5% × 20 = 250%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-500">Qualified Families</span>
                      <span className="font-mono">Top 20% (4 families)</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-500">Win Probability</span>
                      <span className="font-mono text-green-400">25% if qualified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-slate-900/50 border border-teal-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="text-slate-400">Total Allocation</div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">37.5% + 50% + 12.5% =</span>
                  <span className="text-2xl font-bold font-mono text-teal-400">100%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vault Section */}
        {activeSection === 'vault' && (
          <div className="space-y-12">
            <div>
              <div className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-2">Incentive Engine</div>
              <h2 className="text-3xl font-bold mb-2">AEIOS Vault <span className="text-teal-400">Yield Mechanism</span></h2>
              <p className="text-slate-400">4.5% APY with monthly compounding. Vault yield funds pool distributions while growing guaranteed savings.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <StatCard label="Annual Yield Rate" value="4.5%" subtext="APY" color="green" />
              <StatCard label="Monthly Yield Rate" value="0.367%" subtext="Compounded" color="blue" />
            </div>

            {/* Flow Diagram */}
            <div className="bg-slate-900/50 rounded-xl p-8">
              <div className="flex items-center justify-between">
                <FlowNode icon="%" label="Funding" value="20% of tuition" color="blue" />
                <FlowArrow />
                <FlowNode icon="V" label="AEIOS Vault" value="4.5% APY yield" color="green" />
                <FlowArrow />
                <FlowNode icon="P" label="Pools" value="Monthly draws" color="teal" />
                <FlowArrow />
                <FlowNode icon="W" label="Wallets" value="Student accounts" color="purple" />
              </div>
            </div>
          </div>
        )}

        {/* Simulator Section */}
        {activeSection === 'simulator' && (
          <div className="space-y-12">
            <div>
              <div className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-2">Projection Tool</div>
              <h2 className="text-3xl font-bold mb-2">Outcome <span className="text-teal-400">Simulator</span></h2>
              <p className="text-slate-400">Model potential earnings based on different student profiles and scenarios.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-6">Parameters</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Performance Tier</label>
                    <select
                      value={simTier}
                      onChange={(e) => setSimTier(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                    >
                      <option value="top">Top 10% (High Performer)</option>
                      <option value="above">Above Average</option>
                      <option value="average">Average</option>
                      <option value="below">Below Average</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Attendance Rate</label>
                    <select
                      value={simAttendance}
                      onChange={(e) => setSimAttendance(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                    >
                      <option value="98">98%+ (Excellent)</option>
                      <option value="95">95-97% (Good)</option>
                      <option value="90">90-94% (Average)</option>
                      <option value="below90">Below 90%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Years in Program: {simYears}</label>
                    <input
                      type="range"
                      min="1"
                      max="13"
                      value={simYears}
                      onChange={(e) => setSimYears(Number(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>1 year</span>
                      <span>13 years (K-12)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Classroom Size: {simClassSize}</label>
                    <input
                      type="range"
                      min="15"
                      max="35"
                      value={simClassSize}
                      onChange={(e) => setSimClassSize(Number(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>15</span>
                      <span>35</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-slate-800/50 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-6">Projected Outcomes</h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Guaranteed Savings" value={`$${simResults.guaranteed.toLocaleString()}`} color="blue" />
                  <ResultCard label="Expected Lottery Winnings" value={`$${simResults.lottery.toLocaleString()}`} color="green" />
                  <ResultCard label="Interest Earned" value={`$${simResults.interest.toLocaleString()}`} color="orange" />
                  <ResultCard label="Total Projected Value" value={`$${simResults.total.toLocaleString()}`} color="teal" highlight />
                </div>

                {/* Simple bar visualization */}
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <div className="flex items-end justify-around gap-6 h-40">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex items-end justify-center h-32">
                        <div
                          className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500"
                          style={{ height: `${Math.max(8, (simResults.guaranteed / simResults.total) * 128)}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">Guaranteed</span>
                      <span className="text-xs font-mono text-blue-400">${simResults.guaranteed.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex items-end justify-center h-32">
                        <div
                          className="w-12 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-500"
                          style={{ height: `${Math.max(8, (simResults.lottery / simResults.total) * 128)}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">Lottery</span>
                      <span className="text-xs font-mono text-green-400">${simResults.lottery.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex items-end justify-center h-32">
                        <div
                          className="w-12 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t transition-all duration-500"
                          style={{ height: `${Math.max(8, (simResults.interest / simResults.total) * 128)}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">Interest</span>
                      <span className="text-xs font-mono text-orange-400">${simResults.interest.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full flex items-end justify-center h-32">
                        <div
                          className="w-12 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t transition-all duration-500"
                          style={{ height: '128px' }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">Total</span>
                      <span className="text-xs font-mono text-teal-400">${simResults.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-20 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-600">Engagement Allocated Reward Network (EARN)</p>
        </footer>
      </div>
    </div>
  );
};

// Sub-components
const StatCard: React.FC<{ label: string; value: string; color: string; subtext?: string }> = ({ label, value, color, subtext }) => {
  const colorClasses: Record<string, string> = {
    teal: 'text-teal-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    orange: 'text-orange-400',
  };

  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6 text-center">
      <div className="text-xs text-slate-500 mb-2">{label}</div>
      <div className={`text-3xl md:text-4xl font-bold font-mono ${colorClasses[color]}`}>{value}</div>
      {subtext && <div className="text-xs text-slate-600 mt-1">{subtext}</div>}
    </div>
  );
};

const StatusItem: React.FC<{ label: string; status: string; color: string; active?: boolean }> = ({ label, status, color, active }) => {
  const dotColors: Record<string, string> = {
    green: 'bg-green-500 shadow-green-500/50',
    orange: 'bg-orange-500 shadow-orange-500/50',
    blue: 'bg-blue-500 shadow-blue-500/50',
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg font-mono text-sm ${active ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-slate-900/50 border border-white/5'}`}>
      <span>{label}</span>
      <span className="flex items-center gap-2 text-xs">
        <span className={`w-2 h-2 rounded-full shadow-lg ${dotColors[color]}`}></span>
        {status}
      </span>
    </div>
  );
};

const PoolCard: React.FC<{ icon: string; iconColor: string; title: string; description: string; onClick: () => void }> = ({ icon, iconColor, title, description, onClick }) => {
  const bgColors: Record<string, string> = {
    teal: 'bg-teal-500/15 text-teal-400',
    green: 'bg-green-500/15 text-green-400',
    orange: 'bg-orange-500/15 text-orange-400',
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-800/50 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-teal-500/30 hover:-translate-y-1 transition-all"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4 ${bgColors[iconColor]}`}>{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <span className="text-xs text-teal-400">View details →</span>
    </div>
  );
};

const CategoryCard: React.FC<{ num: number; title: string; desc: string; value: string; color: string }> = ({ num, title, desc, value, color }) => {
  const bgColors: Record<string, string> = {
    red: 'bg-red-500/15 text-red-400',
    teal: 'bg-teal-500/15 text-teal-400',
    green: 'bg-green-500/15 text-green-400',
    orange: 'bg-orange-500/15 text-orange-400',
    purple: 'bg-purple-500/15 text-purple-400',
  };

  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center hover:border-teal-500/30 hover:-translate-y-1 transition-all">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mx-auto mb-3 ${bgColors[color]}`}>{num}</div>
      <div className="font-semibold text-sm mb-1">{title}</div>
      <div className="text-xs text-slate-500 mb-2">{desc}</div>
      <div className="font-mono text-teal-400">{value}</div>
    </div>
  );
};

const TimelineItem: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div className="relative">
    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50"></div>
    <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4">
      <div className="text-xs font-medium text-teal-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm text-slate-400">{text}</div>
    </div>
  </div>
);

const FlowNode: React.FC<{ icon: string; label: string; value: string; color: string }> = ({ icon, label, value, color }) => {
  const colors: Record<string, string> = {
    blue: 'border-blue-500 text-blue-400 bg-blue-500/10',
    green: 'border-green-500 text-green-400 bg-green-500/10',
    teal: 'border-teal-500 text-teal-400 bg-teal-500/10',
    purple: 'border-purple-500 text-purple-400 bg-purple-500/10',
  };

  return (
    <div className="text-center">
      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl font-bold mx-auto mb-2 ${colors[color]}`}>{icon}</div>
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-xs text-slate-500 font-mono">{value}</div>
    </div>
  );
};

const FlowArrow: React.FC = () => (
  <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 mx-4 relative">
    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-blue-500"></div>
  </div>
);

const ResultCard: React.FC<{ label: string; value: string; color: string; highlight?: boolean }> = ({ label, value, color, highlight }) => {
  const textColors: Record<string, string> = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    orange: 'text-orange-400',
    teal: 'text-teal-400',
  };

  return (
    <div className={`rounded-lg p-4 ${highlight ? 'bg-teal-500/10 border border-teal-500/30' : 'bg-slate-900/50'}`}>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold font-mono ${textColors[color]}`}>{value}</div>
    </div>
  );
};

export default Blueprint;
