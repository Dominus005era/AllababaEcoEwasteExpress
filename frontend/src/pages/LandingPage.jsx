import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  LayoutDashboard, 
  ShieldCheck, 
  Leaf, 
  Cpu, 
  BarChart3, 
  Truck, 
  Award, 
  Globe, 
  Users, 
  FileText, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  Building2,
  BookOpen,
  Play
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { LiveScannerPreview } from '../components/landing/LiveScannerPreview';
import { SpiralStairwayFeatures } from '../components/landing/SpiralStairwayFeatures';

export const LandingPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Navigation Header Bar */}
      <Header 
        currentView="landing" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      {/* Main Content Body */}
      <main style={{ flex: 1 }}>

        {/* HERO SECTION */}
        <section id="hero" className="hero-section">
          <div className="hero-glow-bg"></div>
          <div className="container hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                <Sparkles size={14} />
                <span>Next-Gen AI E-Waste Classification Platform (PS-33)</span>
              </div>

              <h1 className="hero-title">
                Transforming E-Waste into <span className="gradient-text">Circular Value</span> with Real-Time AI
              </h1>

              <p className="hero-subtitle">
                Built on Indian Architecture & AI Innovation from Prayagraj, Uttar Pradesh. EcoTrace uses computer vision AI to instantly classify e-waste, extract component materials (Metals, PCBs, Batteries), estimate fair values, and route items directly to authorized recyclers.
              </p>

              <div className="hero-cta-group">
                <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                  <Smartphone size={20} />
                  <span>Start Mobile Scan</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                  <LayoutDashboard size={20} />
                  <span>Explore Recycler Hub</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="hero-trust-badges">
                <div className="trust-item">
                  <ShieldCheck size={18} className="trust-icon" />
                  <span>ISO 14001 Compliant</span>
                </div>
                <div className="trust-item">
                  <Leaf size={18} className="trust-icon" />
                  <span>Zero-Landfill Guarantee</span>
                </div>
                <div className="trust-item">
                  <Award size={18} className="trust-icon" />
                  <span>SIH 2026 Innovation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive AI Camera Scanner Widget */}
            <div className="hero-scanner-wrapper">
              <LiveScannerPreview onScheduleClick={onOpenConsumerApp} />
            </div>
          </div>
        </section>

        {/* PROPER DEMO VIDEO PLAYER REGION */}
        <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderY: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <Play size={14} />
                <span>Platform Video Walkthrough</span>
              </div>
              <h2 className="section-title">See EcoTrace AI in Action</h2>
              <p className="section-description">Watch how our computer vision camera scanner auto-detects e-waste, identifies materials, and routes items to recyclers.</p>
            </div>

            <div style={{
              maxWidth: '960px',
              margin: '0 auto',
              background: '#000000',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--emerald-primary)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), var(--shadow-emerald)',
              position: 'relative'
            }}>
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
                poster="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </div>
        </section>

        {/* MNC IMPACT METRICS BANNER (Card Routings Removed) */}
        <section className="metrics-section">
          <div className="container">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-number gradient-text">124,500+</div>
                <div className="metric-label">Devices Identified & Saved</div>
              </div>
              <div className="metric-card">
                <div className="metric-number gradient-text">45.8 Tons</div>
                <div className="metric-label">Precious Metals Recovered</div>
              </div>
              <div className="metric-card">
                <div className="metric-number gradient-text">₹1.85 Cr+</div>
                <div className="metric-label">Circular Value Paid Out</div>
              </div>
              <div className="metric-card">
                <div className="metric-number gradient-text">99.4%</div>
                <div className="metric-label">AI Classification Accuracy</div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ENTERPRISE FEATURES SECTION */}
        <section id="platform" className="features-section">
          <div className="container">
            <div className="section-header">
              <div className="section-subtitle">Enterprise Features</div>
              <h2 className="section-title">Engineered for Maximum Resource Efficiency</h2>
              <p className="section-description">
                Explore our mobile-responsive cyber feature matrix—auto-rotating across 6 core enterprise platform pillars.
              </p>
            </div>

            <SpiralStairwayFeatures 
              onNavigate={onNavigate} 
              onOpenConsumerApp={onOpenConsumerApp} 
              onOpenRecyclerDash={onOpenRecyclerDash} 
            />
          </div>
        </section>

        {/* METHODOLOGY WORKFLOW SECTION (Card Routings Removed) */}
        <section id="methodology" className="methodology-section">
          <div className="container">
            <div className="section-header">
              <div className="section-subtitle">How EcoTrace Works</div>
              <h2 className="section-title">Four Steps to Sustainable E-Waste Recovery</h2>
              <p className="section-description">
                From camera scan to certified industrial recycling, our frictionless methodology ensures e-waste never touches a landfill.
              </p>
            </div>

            <div className="methodology-steps">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>Consumer</div>
                <h3 className="step-title">Snap & AI Scan</h3>
                <p className="step-desc">
                  User takes a photo using our PWA mobile app. The AI vision model scans the item, generating an instant material composition breakdown.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">02</div>
                <div className="badge badge-blue" style={{ marginBottom: '12px' }}>Valuation</div>
                <h3 className="step-title">Instant Offer & Impact</h3>
                <p className="step-desc">
                  System calculates fair market cash value (e.g. ₹450) and carbon savings (2.3kg CO₂ saved), offering immediate doorstep pickup booking.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">03</div>
                <div className="badge badge-purple" style={{ marginBottom: '12px' }}>Logistics</div>
                <h3 className="step-title">Doorstep Dispatch</h3>
                <p className="step-desc">
                  Pickup task is broadcasted to local authorized collection partners with map pin tracking and slot confirmation.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">04</div>
                <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>Recycler</div>
                <h3 className="step-title">Urban Mining Recovery</h3>
                <p className="step-desc">
                  Authorized recyclers accept the item on their Web Dashboard, process raw materials, and issue official recycling certificates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG & PRESS PREVIEW SECTION (Card Routings Removed) */}
        <section id="blog" className="blog-section">
          <div className="container">
            <div className="section-header">
              <div className="section-subtitle">Blog & Research Hub</div>
              <h2 className="section-title">Latest Articles & Research Insights</h2>
            </div>

            <div className="blog-grid">
              <div className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="AI Deep Learning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blog-content">
                  <div className="blog-tag">AI Vision Tech</div>
                  <h3 className="blog-title">How Deep Learning Classifies PCB Components in under 200 Milliseconds</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    By Rahul Kushwaha • Exploring the computer vision dataset behind EcoTrace.
                  </p>
                  <span className="footer-link" style={{ color: 'var(--emerald-primary)', fontWeight: '600' }}>AI Neural Paper</span>
                </div>
              </div>

              <div className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" alt="E-Waste Policy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blog-content">
                  <div className="blog-tag">Environmental Policy</div>
                  <h3 className="blog-title">E-Waste Rules 2026: Extended Producer Responsibility Guidelines</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    By Ashmit Verma • Regulatory compliance mandates for consumer electronics.
                  </p>
                  <span className="footer-link" style={{ color: 'var(--emerald-primary)', fontWeight: '600' }}>CPCB Regulatory Guide</span>
                </div>
              </div>

              <div className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop" alt="Urban Mining" style={{ width: '100%', height: '100%', objectFit: 'crop' }} />
                </div>
                <div className="blog-content">
                  <div className="blog-tag">Urban Mining</div>
                  <h3 className="blog-title">The Economics of PCB Gold & Copper Extraction in 2026</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    By Md. Umar Zahid • Why urban mining yields up to 50x higher gold per ton.
                  </p>
                  <span className="footer-link" style={{ color: 'var(--emerald-primary)', fontWeight: '600' }}>Urban Mining Economics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY DRIVES PREVIEW SECTION (Card Routings Removed) */}
        <section id="community" style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-subtitle">Community Initiatives</div>
              <h2 className="section-title">Join Campus & Corporate E-Waste Drives</h2>
              <p className="section-description">
                Organizing university collection events, tech park recycling challenges, and community e-waste drop-off centers across Uttar Pradesh and major metro cities.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="blog-grid">
              <div className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '160px', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" alt="Campus Drive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <Users size={28} color="#10B981" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Campus E-Waste Drive 2026</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Participating colleges across Uttar Pradesh & NCR in collection drives.</p>
                  <div className="badge badge-emerald">Active Campus Drive</div>
                </div>
              </div>

              <div className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '160px', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Tech Park" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <Building2 size={28} color="#3B82F6" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Tech Park ESG Challenge</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Corporate IT asset disposal drives for IT parks and office complexes.</p>
                  <div className="badge badge-blue">Corporate Partner</div>
                </div>
              </div>

              <div className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '160px', width: '100%' }}>
                  <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop" alt="News Hub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <BookOpen size={28} color="#8B5CF6" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Live Environmental News Hub</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>CPCB releases, urban mining breakthroughs, and global recycler news.</p>
                  <div className="badge badge-purple">Live Feed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ENTERPRISE APP ENTRY CTA BANNER */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)', borderTop: '1px solid var(--border-color)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <Zap size={14} />
              <span>Ready to Recycle?</span>
            </div>
            <h2 style={{ fontSize: '2.6rem', fontWeight: '800', marginBottom: '16px' }}>
              Turn Discarded Electronics into Instant Value Today
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Scan your device in under 10 seconds or access the Recycler Dashboard to manage bulk e-waste pickups.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                <Smartphone size={20} />
                <span>Launch Mobile Scanner App</span>
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={20} />
                <span>Open Recycler Dashboard</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
