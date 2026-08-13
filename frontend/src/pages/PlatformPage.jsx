import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import '../styles/platform.css';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  Truck, 
  Flame, 
  Leaf, 
  Skull, 
  Award, 
  CheckCircle2, 
  Zap, 
  Smartphone, 
  LayoutDashboard,
  TrendingUp,
  ListFilter
} from 'lucide-react';

export const PlatformPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: '01',
      stageName: 'Disposal & Valuation',
      shortName: '01. Valuation',
      before: {
        title: 'Informal Scrap Dumping',
        badge: 'Unregulated Disposal',
        desc: 'Electronics dumped in municipal bins or lowballed by informal scrap dealers with arbitrary guesswork pricing.',
        stat: '₹50 - ₹100',
        statLabel: 'Scrap Value',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop',
        points: ['No computer vision scan', 'Subjective lowball pricing', 'Fire risk from damaged batteries']
      },
      after: {
        title: 'AI Neural Camera Scan (< 200ms)',
        badge: 'LME Metal Benchmark',
        desc: 'Sub-200ms camera scan identifies device model, PCB component area, battery chemistry, and issues instant UPI cash quote.',
        stat: '₹420 - ₹650',
        statLabel: 'Instant Cash Quote',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
        points: ['Edge AI material classification', 'Live London Metal Exchange index', 'Instant direct UPI payout']
      }
    },
    {
      id: '02',
      stageName: 'Data Sanitization & Custody',
      shortName: '02. Sanitization',
      before: {
        title: 'Unsecured Personal Data',
        badge: 'High Leakage Risk',
        desc: 'Storage drives resold in second-hand markets without data wiping, exposing personal photos, banking info, and corporate logins.',
        stat: '0% Data Wiped',
        statLabel: 'Security Audit',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
        points: ['No data destruction proof', 'Corporate audit failure', 'Resold without sanitization']
      },
      after: {
        title: 'NIST 800-88 Wiping & QR Passport',
        badge: 'Immutable Ledger Log',
        desc: 'Serialized digital passport attached via QR code. Hardware storage drives wiped to NIST 800-88 national security standards.',
        stat: '100% Wiped',
        statLabel: 'NIST 800-88 Certified',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
        points: ['NIST 800-88 certified sanitization', 'Immutable QR chain-of-custody', 'Audit-ready destruction logs']
      }
    },
    {
      id: '03',
      stageName: 'Logistics & Transit',
      shortName: '03. Logistics',
      before: {
        title: 'Hazardous Open Transit',
        badge: 'Uncertified Transport',
        desc: 'Scrap hauled loosely in open handcarts. Screen breakage releases toxic mercury vapors and lead dust into city streets.',
        stat: '12% Lost / Damaged',
        statLabel: 'Spillage Loss',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
        points: ['Open exposure to toxins', 'No GPS map tracking', 'Uninsured transit loss']
      },
      after: {
        title: 'GPS-Tracked Sealed Doorstep Pickup',
        badge: '< 24 Hours Dispatch',
        desc: 'Authorized logistics partners dispatch with anti-static insulated containers, real-time map tracking, and slot scheduling.',
        stat: '< 24 Hours',
        statLabel: 'Doorstep Pickup',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
        points: ['Live map GPS tracking', 'Insulated anti-static safety box', 'Fully insured logistics stream']
      }
    },
    {
      id: '04',
      stageName: 'Extraction & Urban Mining',
      shortName: '04. Recovery',
      before: {
        title: 'Acid Baths & Open Burning',
        badge: 'Toxic Burning Yard',
        desc: 'Informal clusters burn wire insulation with charcoal fires and leach circuit boards in boiling toxic aqua-regia acid baths.',
        stat: '< 15% Recovery',
        statLabel: 'Precious Metals Lost',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        points: ['Carcinogenic toxic smoke', 'Acid dumped into rivers', '85% precious metals wasted']
      },
      after: {
        title: 'Closed-Loop Hydrometallurgical Extraction',
        badge: 'CPCB Certified Smelter',
        desc: 'Automated mechanical shredders and closed-loop eco-chemical separation recover 98.2% gold and 94.6% copper.',
        stat: '98.2% Gold',
        statLabel: 'Recovery Yield',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop',
        points: ['Zero toxic air emissions', '98.2% gold & copper yield', 'Heavy metal containment']
      }
    },
    {
      id: '05',
      stageName: 'Compliance & ESG Accounting',
      shortName: '05. ESG Audit',
      before: {
        title: 'Illegal Gray Market Trade',
        badge: 'Non-Compliant Risk',
        desc: 'Undocumented trade without disposal certificates. Enterprise clients face regulatory fines for unverified e-waste handling.',
        stat: '₹0 ESG Value',
        statLabel: 'Regulatory Risk',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
        points: ['Zero compliance proof', 'Heavy regulatory penalty risk', 'Unaccounted municipal waste']
      },
      after: {
        title: 'Automated CPCB Form-2 & Scope 3 Certificate',
        badge: 'CPCB & Scope 3 Certified',
        desc: 'Issues official CPCB Form-2 documents and Scope 3 carbon credit certificates calculating 2.8 tons of CO₂ saved per ton.',
        stat: '2.8T CO₂ Saved',
        statLabel: 'Per Ton Recycled',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
        points: ['Automated CPCB Form-2 filing', 'Scope 3 carbon reduction certificate', '100% audit compliance guaranteed']
      }
    }
  ];

  const activeStage = steps[currentStep];

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="platform" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '40px 0 80px' }}>
        <div className="container">
          
          {/* HERO BANNER */}
          <div className="platform-hero-card">
            <div className="badge badge-emerald" style={{ marginBottom: '14px', width: 'fit-content' }}>
              <Sparkles size={14} />
              <span>Interactive E-Waste Transformation Engine</span>
            </div>
            
            <h1 className="platform-hero-title">
              E-Waste Transformation <span className="gradient-text">Before vs. After</span> EcoTrace
            </h1>
            
            <p className="platform-hero-desc">
              Compare the environmental, financial, and regulatory realities of electronic waste. Track how informal scrap chains cause toxic pollution, while EcoTrace AI guarantees a safe, circular pathway.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onOpenConsumerApp}>
                <Smartphone size={18} />
                <span>Test Camera Scanner</span>
              </button>
              <button className="btn btn-secondary" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={18} />
                <span>Open Recycler Dashboard</span>
              </button>
            </div>
          </div>

          {/* DESKTOP STAGE SELECTOR TABS */}
          <div className="platform-stage-tabs-wrapper desktop-only-tabs">
            <div className="platform-stage-tabs">
              {steps.map((st, idx) => {
                const isActive = currentStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`stage-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span className="stage-tab-num">{st.id}</span>
                    <span>{st.stageName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE DROPDOWN STAGE SELECTOR (100% Clean Mobile UX) */}
          <div className="mobile-stage-selector-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <ListFilter size={16} />
              <span>SELECT LIFECYCLE STAGE ({currentStep + 1} OF 5):</span>
            </div>
            <select 
              value={currentStep} 
              onChange={(e) => setCurrentStep(Number(e.target.value))}
              className="mobile-stage-select"
            >
              {steps.map((st, idx) => (
                <option key={st.id} value={idx}>
                  {st.id}. {st.stageName}
                </option>
              ))}
            </select>
          </div>

          {/* MAIN DUAL COMPARISON STAGE SHOWCASE */}
          <div className="comparison-master-card">
            
            {/* Top Stage Header & Controls */}
            <div className="comparison-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  STAGE {activeStage.id} OF 05 • {activeStage.stageName.toUpperCase()}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>{activeStage.stageName}</h2>
              </div>
            </div>

            {/* DUAL COMPARISON GRID (Side-by-Side on Desktop, Stacked cleanly on Mobile) */}
            <div className="comparison-grid">
              
              {/* BEFORE ECOTRACE CARD */}
              <div className="comparison-subcard before-card">
                <div className="subcard-header red">
                  <Trash2 size={20} color="#EF4444" />
                  <div>
                    <span className="subcard-tag red">🔴 BEFORE ECOTRACE</span>
                    <h3 className="subcard-title red">{activeStage.before.title}</h3>
                  </div>
                </div>

                <div className="subcard-media-wrapper">
                  <img src={activeStage.before.image} alt={activeStage.before.title} />
                  <div className="subcard-stat-overlay red">
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#FECDD3' }}>{activeStage.before.statLabel}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>{activeStage.before.stat}</div>
                  </div>
                </div>

                <p className="subcard-desc">{activeStage.before.desc}</p>

                <div className="subcard-bullets">
                  {activeStage.before.points.map((pt, pidx) => (
                    <div key={pidx} className="bullet-item red">
                      <span className="bullet-dot red">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER ECOTRACE CARD */}
              <div className="comparison-subcard after-card">
                <div className="subcard-header green">
                  <Cpu size={20} color="#10B981" />
                  <div>
                    <span className="subcard-tag green">🟢 AFTER ECOTRACE</span>
                    <h3 className="subcard-title green">{activeStage.after.title}</h3>
                  </div>
                </div>

                <div className="subcard-media-wrapper">
                  <img src={activeStage.after.image} alt={activeStage.after.title} />
                  <div className="subcard-stat-overlay green">
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#D1FAE5' }}>{activeStage.after.statLabel}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>{activeStage.after.stat}</div>
                  </div>
                </div>

                <p className="subcard-desc">{activeStage.after.desc}</p>

                <div className="subcard-bullets">
                  {activeStage.after.points.map((pt, pidx) => (
                    <div key={pidx} className="bullet-item green">
                      <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Controls Bar */}
            <div className="comparison-bottom-bar">
              <button className="btn btn-secondary btn-sm" onClick={handlePrev}>
                <ChevronLeft size={16} />
                <span>Prev Step</span>
              </button>

              <div style={{ display: 'flex', gap: '6px' }}>
                {steps.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentStep(dotIdx)}
                    style={{
                      width: currentStep === dotIdx ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: currentStep === dotIdx ? 'var(--emerald-primary)' : 'var(--border-color)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Go to stage ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleNext}>
                <span>Next Step</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* TELEMETRY IMPACT BENCHMARKS */}
          <div className="impact-benchmarks-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                <TrendingUp size={13} />
                <span>Platform System Benchmarks</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Quantifiable EcoTrace Yields</h2>
            </div>

            <div className="impact-stats-grid">
              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>98.2%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Gold Extraction Yield</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recovered from PCB contacts.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>94.6%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Copper Wire Purity</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recovered from motor windings.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>2.8 Tons</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>CO₂ Prevented / Ton</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scope 3 greenhouse abatement.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>NIST 800-88 Wiped</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guaranteed IT data security.</div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="platform-cta-banner">
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>Be Part of the AI E-Waste Revolution</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Test our sub-200ms camera scan or access the recycler bidding dashboard to route items cleanly.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onOpenConsumerApp}>
                <Smartphone size={18} />
                <span>Launch Camera Scanner</span>
              </button>
              <button className="btn btn-secondary" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={18} />
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
