import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Award, 
  Building2, 
  HeartHandshake,
  CheckCircle2,
  Code,
  Database,
  Server,
  FileSearch,
  Cpu,
  Target,
  Compass,
  Linkedin
} from 'lucide-react';

export const MissionPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  // The 6 Student Founders (Solely Featured on Mission Page)
  const founders = [
    {
      name: 'Rahul Kushwaha',
      role: 'Frontend Lead',
      photo: '/founders/Rahul Kushwaha.jpg',
      bio: 'Architected the Progressive Web Application (PWA), reactive CSS tokens, and live AR camera scanner interface.',
      linkedin: 'https://www.linkedin.com/in/rahul-kushwaha005/',
      imagePosition: 'center 20%',
      imageScale: 1.12
    },
    {
      name: 'Rishika Singh',
      role: 'Dataset Lead',
      photo: '/founders/Rishika Singh.jpeg',
      bio: 'Curated and annotated over 45,000 multi-label e-waste component image datasets across Uttar Pradesh tech hubs.',
      linkedin: 'https://www.linkedin.com/in/rishika-singh-b41576318/',
      imagePosition: 'center 46%',
      imageScale: 1.32
    },
    {
      name: 'Tanay Singh',
      role: 'Backend Lead',
      photo: '/founders/Tanay Singh.jpeg',
      bio: 'Engineered REST API endpoints, real-time metal commodity valuation pricing algorithms, and resilient data engines.',
      linkedin: null, // Tanay's LinkedIn will be placed later once provided
      imagePosition: 'center 10%',
      imageScale: 1.05
    },
    {
      name: 'Ashmit Verma',
      role: 'Research Lead',
      photo: '/founders/Ashmit Verma.png',
      bio: 'Pioneered ESG carbon abatement math, greenhouse gas offset formulas, and CPCB regulatory compliance audit models.',
      linkedin: 'https://www.linkedin.com/in/ashmit-verma-7a475731b/',
      imagePosition: 'center 28%',
      imageScale: 1.16
    },
    {
      name: 'Md. Umar Zahid',
      role: 'Research Lead',
      photo: '/founders/Md. Umar Zahid.jpeg',
      bio: 'Specialized in PCB gold and copper urban mining extraction yield economics and industrial smelter routing logic.',
      linkedin: 'https://www.linkedin.com/in/md-umar-zahid-181616324/',
      imagePosition: 'center 15%',
      imageScale: 1.05
    },
    {
      name: 'Ayush Yadav',
      role: 'Research & Development Head',
      photo: '/founders/Ayush Yadav.jpeg',
      bio: 'Led overall technical vision, computer vision model tuning, and platform architecture for Smart India Hackathon 2026.',
      linkedin: 'https://www.linkedin.com/in/ayush-yadav-6a0525320/',
      imagePosition: 'center 12%',
      imageScale: 1.18
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="mission" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>

        {/* HERO — full-bleed section bg, glassmorphism card inside */}
        <section className="page-hero-section mission-hero-bg">
          <div className="container">
            <div className="page-hero-card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                <Globe size={14} />
                <span>Founded in Prayagraj, Uttar Pradesh, India • SIH 2026 (PS-33)</span>
              </div>
              <h1 className="page-hero-title">Our Mission &amp; Student Founders</h1>
              <p className="page-hero-desc">
                Pioneered in Prayagraj, Uttar Pradesh, EcoTrace was built by 6 student leads to transform India's informal e-waste disposal into an AI-powered circular economy.
              </p>
            </div>
          </div>
        </section>

        <div className="container">

          {/* Core Philosophy Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '60px' }} className="blog-grid">
            <div className="feature-card" style={{ padding: '36px' }}>
              <Target size={32} color="#10B981" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>The Environmental Problem</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Over 90% of India's electronic waste is currently handled by informal recycling sectors involving dangerous open acid leaching and toxic backyard burning, releasing lead and mercury into groundwater tables.
              </p>
            </div>

            <div className="feature-card" style={{ padding: '36px' }}>
              <Compass size={32} color="#3B82F6" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>The AI Vision Solution</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                EcoTrace provides an indigenous computer vision AI classifier that identifies e-waste components in under 200ms, calculates fair cash values for donors, and routes items to verified CPCB smelters.
              </p>
            </div>
          </div>

          {/* Student Founding Team Showcase */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <Users size={14} />
                <span>Sole Team Hub</span>
              </div>
              <h2 className="section-title">Meet the 6 Student Founders</h2>
              <p style={{ color: 'var(--text-secondary)' }}>The engineering and research leads behind EcoTrace's AI architecture.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="blog-grid">
              {founders.map((f, i) => (
                <div 
                  key={i} 
                  className="feature-card founder-profile-card" 
                  style={{ 
                    padding: '0', 
                    overflow: 'hidden', 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div>
                    <div style={{ height: '290px', width: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg-card-subtle, rgba(255, 255, 255, 0.03))' }}>
                      <img 
                        src={f.photo} 
                        alt={f.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          objectPosition: f.imagePosition || 'center top',
                          transform: f.imageScale ? `scale(${f.imageScale})` : 'scale(1)',
                          transformOrigin: f.imagePosition || 'center center',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                        }} 
                        className="founder-photo-img"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        right: '12px',
                        background: 'rgba(15, 23, 42, 0.88)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        color: 'var(--emerald-primary)',
                        fontWeight: '700',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        {f.role}
                      </div>
                    </div>
                    <div style={{ padding: '24px 20px 16px' }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '8px' }}>{f.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                        {f.bio}
                      </p>
                    </div>
                  </div>

                  {/* Social Link (LinkedIn Profile Only) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px 24px',
                    marginTop: 'auto'
                  }}>
                    {f.linkedin ? (
                      <a 
                        href={f.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        title={`${f.name} - LinkedIn Profile`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          width: '100%',
                          maxWidth: '190px',
                          padding: '9px 18px',
                          background: 'rgba(10, 102, 194, 0.12)',
                          color: '#0A66C2',
                          border: '1px solid rgba(10, 102, 194, 0.35)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          transition: 'all 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0A66C2';
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 102, 194, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(10, 102, 194, 0.12)';
                          e.currentTarget.style.color = '#0A66C2';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Linkedin size={17} style={{ flexShrink: 0 }} />
                        <span>LinkedIn</span>
                      </a>
                    ) : (
                      <span 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '7px 16px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: '600'
                        }}
                      >
                        <Linkedin size={15} style={{ opacity: 0.5 }} />
                        <span>LinkedIn Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Thanks & Advisory Recognition */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 40px',
            marginBottom: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={14} />
                <span>Special Gratitude &amp; Mentorship</span>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text-primary)' }}>
                Special Thanks to Gautam Kumar Maurya (GKM)
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                A heartfelt and special thanks to <strong style={{ color: 'var(--text-primary)' }}>Gautam Kumar Maurya (GKM)</strong> for his continuous guidance, technical mentorship, and invaluable support throughout the development and architecture of EcoTrace.
              </p>
            </div>

            <a 
              href="https://www.linkedin.com/in/gkm563/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              id="gkm-mentor-linkedin-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: '800',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
                background: '#0A66C2',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 8px 20px rgba(10, 102, 194, 0.35)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#084e96';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(10, 102, 194, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0A66C2';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(10, 102, 194, 0.35)';
              }}
            >
              <Linkedin size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Research Benchmarks */}
          <div className="benchmark-card-box" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px' }}>Student Research Benchmarks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="metrics-grid">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>45,000+ Labeled Images</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Curated dataset across UP electronics hubs.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>CPCB Form-2 Ready</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated compliance log generator.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>98.2% Gold Recovery</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Yield math for urban mining smelters.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
