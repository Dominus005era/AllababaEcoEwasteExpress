import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  Cpu, 
  Truck, 
  LayoutDashboard, 
  ArrowRight,
  Award
} from 'lucide-react';

export const MethodologyPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="methodology" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>

        {/* HERO — full-bleed section bg, glassmorphism card inside */}
        <section className="page-hero-section methodology-hero-bg">
          <div className="container">
            <div className="page-hero-card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px', width: 'fit-content' }}>
                <Sparkles size={14} />
                <span>Scientific &amp; Logistics Framework</span>
              </div>
              <h1 className="page-hero-title">The EcoTrace Recycling Methodology</h1>
              <p className="page-hero-desc">
                A standardized 4-step framework bridging consumer device submission with certified industrial smelting and urban mining recovery.
              </p>
            </div>
          </div>
        </section>

        <div className="container">

          {/* 4 Steps Methodology Cards with Imagery */}
          <div className="methodology-steps" style={{ marginBottom: '60px' }}>
            <div className="step-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '185px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" alt="Scan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px' }}>
                <div className="step-number">01</div>
                <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>Camera Vision</div>
                <h3 className="step-title">Multi-Point Image Capture</h3>
                <p className="step-desc">User snaps device photo. AI reticle analyzes housing degradation, screen cracks, and model serials.</p>
              </div>
            </div>

            <div className="step-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '185px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="Valuation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px' }}>
                <div className="step-number">02</div>
                <div className="badge badge-blue" style={{ marginBottom: '14px' }}>AI Valuation</div>
                <h3 className="step-title">Material Matrix Calculation</h3>
                <p className="step-desc">Estimates PCB gold content, copper wiring, and battery weight, returning instant price quote and CO₂ offset badge.</p>
              </div>
            </div>

            <div className="step-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '185px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" alt="Logistics" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px' }}>
                <div className="step-number">03</div>
                <div className="badge badge-purple" style={{ marginBottom: '14px' }}>Geo-Logistics</div>
                <h3 className="step-title">Doorstep Pickup Dispatch</h3>
                <p className="step-desc">Dispatches nearest authorized collection logistics partner with map route tracking and slot confirmation.</p>
              </div>
            </div>

            <div className="step-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '185px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop" alt="Urban Mining" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px' }}>
                <div className="step-number">04</div>
                <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>Recycler</div>
                <h3 className="step-title">Urban Mining Recovery</h3>
                <p className="step-desc">Authorized recyclers accept the item on their Web Dashboard, process raw materials, and issue official recycling certificates.</p>
              </div>
            </div>
          </div>

          {/* Recovery Benchmarks */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px' }}>
              Resource Recovery Yield Benchmarks
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="metrics-grid">
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>98.2%</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '4px' }}>Gold Extraction Yield</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>From high-grade printed circuit board contacts</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>94.6%</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '4px' }}>Copper Wire Purity</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Recovered from transformers and motor coils</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>100%</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '4px' }}>Toxic Heavy Metal Containment</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Zero lead or cadmium escaping into groundwater</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
