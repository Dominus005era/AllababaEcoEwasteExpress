import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import '../styles/platform.css';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Leaf, 
  FileText, 
  Truck, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Award,
  Layers,
  Smartphone,
  LayoutDashboard,
  BarChart3,
  Lock,
  Database,
  Flame,
  Skull,
  Trash2,
  AlertTriangle,
  TrendingDown,
  Activity,
  Workflow,
  ShieldAlert,
  Info
} from 'lucide-react';

export const PlatformPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' or 'split'
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      title: '1. Disposal & Valuation',
      shortLabel: 'Disposal',
      traditional: {
        headline: 'Unregulated Disposal & Financial Loss',
        badge: 'Informal Waste Chain',
        desc: 'Devices are dumped directly in garbage bins or sold to unauthorized scrap dealers (kabadiwalas) for negligible, arbitrary cash payouts.',
        bullets: [
          'No computer vision or material classification is performed.',
          'Payout values are determined by subjective guesswork, lowballing the customer.',
          'Batteries and plastic components are frequently damaged, posing fire risks.',
          'Valuable rare-earth metals are completely ignored during valuation.'
        ],
        statLabel: 'Average Payout Purity',
        statValue: '₹50 - ₹100',
        statDesc: 'Estimated raw scrap value',
        icon: Trash2
      },
      ecotrace: {
        headline: 'Sub-200ms Neural Scan & Fair Price Valuation',
        badge: 'AI-Enabled Entry',
        desc: 'User uploads a photo of the smartphone. The edge-based deep learning model detects device categories and estimates values instantly.',
        bullets: [
          'Volumetric CNN assessment calculates board size and battery chemistry.',
          'Dynamic integration with London Metal Exchange (LME) live indices.',
          'Competitive, open-market recycler pricing guarantees fair compensation.',
          'UPI-linked instant payouts issued directly to the user\'s wallet.'
        ],
        statLabel: 'Dynamic Payout Yield',
        statValue: '₹420 - ₹650',
        statDesc: 'Real-time LME-backed value',
        icon: Cpu
      }
    },
    {
      title: '2. Data & Tracking',
      shortLabel: 'Tracking',
      traditional: {
        headline: 'Zero Sanitization & Identity Leakage',
        badge: 'Unsecured Assets',
        desc: 'Devices change hands without verified data wiping, exposing personal photos, banking info, and corporate logins to the dark market.',
        bullets: [
          'No tracking number or chain-of-custody documentation is created.',
          'Data storage chips are sold to second-hand dealers without physical shredding.',
          'Corporate IT compliance audits fail due to lack of destruction proof.',
          'Device parts are recycled or resold with zero accountability.'
        ],
        statLabel: 'Data Wiped',
        statValue: '0%',
        statDesc: 'Severe data leak vulnerabilities',
        icon: Lock
      },
      ecotrace: {
        headline: 'NIST 800-88 Wiping & Digital Passport',
        badge: 'Immutable Chain of Custody',
        desc: 'Each device receives a serialized Digital E-Waste Passport with a unique QR code. All storage drives are sanitized to national security standards.',
        bullets: [
          'Guaranteed software-level data sanitization or physical disk shredding.',
          'Complies with enterprise NIST 800-88 guidelines for data protection.',
          'Immutable tracking log traces ownership transfers in real-time.',
          'QR-code remains physically attached to the device until metal recovery.'
        ],
        statLabel: 'Security Standard',
        statValue: 'NIST 800-88',
        statDesc: 'Guaranteed 100% sanitization',
        icon: ShieldCheck
      }
    },
    {
      title: '3. Logistics & Transit',
      shortLabel: 'Logistics',
      traditional: {
        headline: 'Hazardous Open Transit & Leakage',
        badge: 'Uncertified Transport',
        desc: 'Scrap materials are packed loosely in open trucks or handcarts. Heavy vibration breaks screens and releases internal mercury and lead.',
        bullets: [
          'Transited without protective packaging or static shields.',
          'Scavengers are exposed directly to toxic materials during manual hauling.',
          'No GPS transit logs or scheduled collection times exist.',
          'Up to 12% of collected waste is lost or stolen during transit.'
        ],
        statLabel: 'Transit Integrity',
        statValue: 'High Spillage',
        statDesc: 'Heavy metal exposure risks',
        icon: AlertTriangle
      },
      ecotrace: {
        headline: 'GPS-Tracked Safe Logistics Partnering',
        badge: 'Regulated Logistics',
        desc: 'EcoTrace assigns authorized, trained logistics collection partners who arrive within 24 hours with shielded containers.',
        bullets: [
          'Real-time GPS tracking of pickup vehicles on user and recycler dashboards.',
          'Secure pickup boxes shield delicate components from moisture and shock.',
          'Scheduled time slot matching minimizes user friction.',
          'Fully insured transportation with digital pickup signature logs.'
        ],
        statLabel: 'Logistics Success',
        statValue: '100% Insured',
        statDesc: 'Real-time GPS tracking',
        icon: Truck
      }
    },
    {
      title: '4. Processing & Extraction',
      shortLabel: 'Extraction',
      traditional: {
        headline: 'Open-Air Wire Burning & Crude Acid Baths',
        badge: 'Dangerous Processing',
        desc: 'Informal workers use charcoal fires to burn insulation off wires and immerse circuit boards in boiling aqua-regia acid to recover gold.',
        bullets: [
          'Toxic black smoke releases lead, mercury, and carcinogenic furans into air.',
          'Crude acid baths are dumped straight into local rivers and soil beds.',
          'Severe lung and nervous system damage to workers, including children.',
          'Only extracts high-grade metals (gold); copper and silica are wasted.'
        ],
        statLabel: 'Gold Recovery Rate',
        statValue: '< 15%',
        statDesc: 'Highly inefficient recycling',
        icon: Flame
      },
      ecotrace: {
        headline: 'Closed-Loop Certified Hydrometallurgical Extraction',
        badge: 'Urban Mining Smelter',
        desc: 'CPCB-registered recycling facilities use automated mechanical shredders and eco-friendly chemical separation to recover almost all materials.',
        bullets: [
          'Zero-emission chemical loops prevent air and groundwater leakage.',
          'Advanced sorting separates high-grade PCBs, batteries, plastics, and glass.',
          'Recovers 98.2% of gold, 94.6% of copper, and 92% of silver.',
          'Heavy metals (lead, cadmium) are captured and safely stabilized.'
        ],
        statLabel: 'Gold Recovery Rate',
        statValue: '98.2%',
        statDesc: 'Verified metal extraction yield',
        icon: Leaf
      }
    },
    {
      title: '5. Compliance & Certification',
      shortLabel: 'Compliance',
      traditional: {
        headline: 'Gray Market Trade & Compliance Failures',
        badge: 'Illegal Pipeline',
        desc: 'The entire recycling transaction is undocumented. Recyclers operate without government licenses, evading environment audits.',
        bullets: [
          'No recycling certificates or proof of safe disposal are generated.',
          'Enterprise clients face regulatory fines for unverified e-waste disposal.',
          'Contributes to national tax evasion and illegal waste imports.',
          'Zero accountability for municipal waste metrics.'
        ],
        statLabel: 'Audit Status',
        statValue: 'Non-Compliant',
        statDesc: 'Risk of heavy regulatory fines',
        icon: Skull
      },
      ecotrace: {
        headline: 'Scope 3 ESG Certification & CPCB Form-2',
        badge: '100% Compliant',
        desc: 'Upon successful processing, the system issues verified ESG impact credentials, counting carbon offset metrics.',
        bullets: [
          'Automated generation of official CPCB E-Waste Form-2 compliance documents.',
          'Scope 3 carbon reduction certificate: 2.3kg of CO2 saved per phone.',
          'Audit-ready reports for municipal regulators and corporate ESG filings.',
          'End-of-life recycling certificate backed by digital recycler signatures.'
        ],
        statLabel: 'CO₂ Saved / Phone',
        statValue: '2.3 kg',
        statDesc: 'Verified greenhouse gas abatement',
        icon: Award
      }
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="platform" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main className="platform-main">
        <div className="container">
          
          {/* HERO BANNER - Redesigned cleanly without layout toggles */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop") center/cover',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '56px 40px',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            color: '#FFFFFF'
          }}>
            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} />
              <span>E-Waste Lifecycle Comparison</span>
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px', color: '#FFFFFF' }}>
              The Divergent Fates of <span className="gradient-text">E-Waste Logistics</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '780px', lineHeight: '1.6', marginBottom: '32px' }}>
              Compare the environmental, financial, and regulatory realities of electronic waste. Track how the traditional unorganized loop leads to pollution, while EcoTrace engineering guarantees a safe, circular pathway.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                <Smartphone size={20} />
                <span>Test Camera Scanner</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={20} />
                <span>Recycler B2B Portal</span>
              </button>
            </div>
          </div>

          {/* VIEW SWITCHER - Placed cleanly below the hero banner */}
          <div className="journey-toggle-container">
            <button 
              className={`journey-toggle-btn ${activeView === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveView('timeline')}
            >
              <Activity size={18} />
              <span>Interactive Step Walkthrough</span>
            </button>
            <button 
              className={`journey-toggle-btn ${activeView === 'split' ? 'active' : ''}`}
              onClick={() => setActiveView('split')}
            >
              <Workflow size={18} />
              <span>Parallel Side-by-Side Map</span>
            </button>
          </div>

          {/* SECTION 1: INTERACTIVE STEP WALKTHROUGH */}
          {activeView === 'timeline' && (
            <div className="timeline-stages-wrapper animate-slide-up">
              
              {/* TIMELINE STEP NAVIGATION */}
              <div className="timeline-stages-nav">
                {stages.map((stage, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button 
                      key={idx} 
                      className={`timeline-nav-step ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveStage(idx)}
                    >
                      <div className="timeline-nav-circle">
                        {idx + 1}
                      </div>
                      <span className="timeline-nav-label">
                        {stage.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* TIMELINE STATE COMPARISON DETAIL */}
              <div className="timeline-comparison-panel">
                
                {/* Traditional Path Detail */}
                <div className="panel-card traditional-style">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                      <div className="step-marker pulse-red-ring">
                        {React.createElement(stages[activeStage].traditional.icon, { size: 24 })}
                      </div>
                      <div>
                        <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                          {stages[activeStage].traditional.badge}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>
                          {stages[activeStage].traditional.headline}
                        </h3>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
                      {stages[activeStage].traditional.desc}
                    </p>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                      Consequences & Pitfalls:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {stages[activeStage].traditional.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>•</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ 
                    background: 'rgba(239, 68, 68, 0.05)', 
                    border: '1px dashed rgba(239, 68, 68, 0.2)', 
                    padding: '16px', 
                    borderRadius: 'var(--radius-md)', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center' 
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                        {stages[activeStage].traditional.statLabel}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {stages[activeStage].traditional.statDesc}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-red)' }}>
                      {stages[activeStage].traditional.statValue}
                    </div>
                  </div>
                </div>

                {/* EcoTrace Path Detail */}
                <div className="panel-card ecotrace-style">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                      <div className="step-marker pulse-green-ring">
                        {React.createElement(stages[activeStage].ecotrace.icon, { size: 24 })}
                      </div>
                      <div>
                        <span className="badge badge-emerald">
                          {stages[activeStage].ecotrace.badge}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>
                          {stages[activeStage].ecotrace.headline}
                        </h3>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
                      {stages[activeStage].ecotrace.desc}
                    </p>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                      EcoTrace Core Mechanism:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {stages[activeStage].ecotrace.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={16} color="var(--emerald-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ 
                    background: 'var(--emerald-light)', 
                    border: '1px dashed rgba(16, 185, 129, 0.3)', 
                    padding: '16px', 
                    borderRadius: 'var(--radius-md)', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center' 
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--emerald-primary)', textTransform: 'uppercase', fontWeight: '700' }}>
                        {stages[activeStage].ecotrace.statLabel}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {stages[activeStage].ecotrace.statDesc}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>
                      {stages[activeStage].ecotrace.statValue}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SECTION 2: PARALLEL SIDE-BY-SIDE JOURNEY COLUMNS */}
          {activeView === 'split' && (
            <div className="journey-split-grid animate-slide-up">
              
              {/* TRADITIONAL PATHWAY */}
              <div className="journey-column traditional-path">
                <div className="journey-column-header">
                  <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    Linear / Wasteful
                  </div>
                  <h2 className="journey-column-title" style={{ color: 'var(--accent-red)' }}>
                    Traditional E-Waste Disposal
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    How electronic devices are informally collected, processed, and disposed of in India prior to EcoTrace.
                  </p>
                </div>

                <div className="journey-flow-list">
                  {stages.map((stg, index) => (
                    <div key={index} className="journey-step-card">
                      <div className="step-marker">
                        {React.createElement(stg.traditional.icon, { size: 22 })}
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Step {index + 1}: {stg.shortLabel}
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-red)' }}>
                            {stg.traditional.statValue}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '6px' }}>
                          {stg.traditional.headline}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          {stg.traditional.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ECOTRACE PATHWAY */}
              <div className="journey-column ecotrace-path">
                <div className="journey-column-header">
                  <div className="badge badge-emerald">
                    Circular / Traceable
                  </div>
                  <h2 className="journey-column-title" style={{ color: 'var(--emerald-primary)' }}>
                    EcoTrace Digital Circular Journey
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Re-engineered lifecycle combining computer vision, secure logistics, and closed-loop extraction.
                  </p>
                </div>

                <div className="journey-flow-list">
                  {stages.map((stg, index) => (
                    <div key={index} className="journey-step-card">
                      <div className="step-marker">
                        {React.createElement(stg.ecotrace.icon, { size: 22 })}
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--emerald-primary)', textTransform: 'uppercase' }}>
                            Step {index + 1}: {stg.shortLabel}
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-primary)' }}>
                            {stg.ecotrace.statValue}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '6px' }}>
                          {stg.ecotrace.headline}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          {stg.ecotrace.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TELEMETRY IMPACT DASHBOARD */}
          <div className="yield-comparison-banner">
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 12px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <TrendingUp size={12} />
                <span>System Metrics Comparison</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
                EcoTrace Platform Efficiency Yields
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Our metrics contrast recovery benchmarks between informal burning yards and formal CPCB-certified urban mining smelters.
              </p>
            </div>

            <div className="stats-grid-row">
              
              <div className="stat-metric-card">
                <div className="stat-metric-title">Gold Extraction</div>
                <div className="stat-metric-values">
                  <span className="stat-value-bad">15%</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
                  <span className="stat-value-good">98.2%</span>
                </div>
                <div className="stat-metric-desc">Recovered high-grade circuit contacts.</div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-title">Copper Purity</div>
                <div className="stat-metric-values">
                  <span className="stat-value-bad">38%</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
                  <span className="stat-value-good">94.6%</span>
                </div>
                <div className="stat-metric-desc">High-grade motor winding recycling.</div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-title">Groundwater Leaks</div>
                <div className="stat-metric-values">
                  <span className="stat-value-bad">High</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
                  <span className="stat-value-good">Zero</span>
                </div>
                <div className="stat-metric-desc">Stabilized battery acid and heavy metals.</div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-title">IT Data Destruction</div>
                <div className="stat-metric-values">
                  <span className="stat-value-bad">0%</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
                  <span className="stat-value-good">100%</span>
                </div>
                <div className="stat-metric-desc">Verified NIST 800-88 sanitization audits.</div>
              </div>

            </div>
          </div>

          {/* DYNAMIC DESIGN DETAILS - INFORMATIONAL SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', marginBottom: '80px' }} className="hero-grid">
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div className="brand-icon-wrapper" style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)' }}>
                  <Leaf size={20} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Closed-Loop Lifecycle Engineering</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                EcoTrace operates on a tri-layered architectural framework (AI detection, Live Valuation Index, and Secured Recycler Chain). Traditional recyclers focus solely on manual dismantling, leading to environmental loss. EcoTrace guarantees that 98.2% of precious metal contacts are safely recycled, and generates audit certificates for corporate IT compliance.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={18} color="var(--emerald-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>CPCB Form-2</strong>: Automated creation of official Indian Central Pollution Control Board hazardous disposal documentation.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Leaf size={18} color="var(--emerald-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Scope 3 ESG Credits</strong>: Verified math calculating carbon dioxide offsets based on virgin mining replacement equations.</span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, rgba(30,41,59,0.5), rgba(15,23,42,0.6))', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--emerald-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                  <Info size={16} />
                  <span>Interactive Verification</span>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>Experience E-Waste Traceability</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Open our interactive apps below. The camera scanner captures images in real-time and issues the digital QR passport. The recycler board demonstrates the secure claim tracking interface.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={onOpenConsumerApp}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', width: '100%' }}
                >
                  <span>Launch Scanner Simulation</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={onOpenRecyclerDash}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', width: '100%' }}
                >
                  <span>Open Recycler Panel</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '16px' }}>Ready to Experience the AI Platform?</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px' }}>
              Test instant camera scan or explore the Recycler Dashboard to view incoming e-waste bids.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                <Smartphone size={20} />
                <span>Launch Mobile Scanner</span>
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={20} />
                <span>Open Recycler Dashboard</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
