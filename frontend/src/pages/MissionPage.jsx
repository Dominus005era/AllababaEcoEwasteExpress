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
  Compass
} from 'lucide-react';

export const MissionPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  // The 6 Student Founders (Solely Featured on Mission Page)
  const founders = [
    {
      name: 'Rahul Kushwaha',
      role: 'Frontend Lead',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      bio: 'Architected the Progressive Web Application (PWA), reactive CSS tokens, and live AR camera scanner interface.'
    },
    {
      name: 'Rishika Singh',
      role: 'Dataset Lead',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      bio: 'Curated and annotated over 45,000 multi-label e-waste component image datasets across Uttar Pradesh tech hubs.'
    },
    {
      name: 'Tanay Singh',
      role: 'Backend Lead',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      bio: 'Engineered REST API endpoints, real-time metal commodity valuation pricing algorithms, and resilient data engines.'
    },
    {
      name: 'Ashmit Verma',
      role: 'Research Lead',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      bio: 'Pioneered ESG carbon abatement math, greenhouse gas offset formulas, and CPCB regulatory compliance audit models.'
    },
    {
      name: 'Md. Umar Zahid',
      role: 'Research Lead',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      bio: 'Specialized in PCB gold and copper urban mining extraction yield economics and industrial smelter routing logic.'
    },
    {
      name: 'Ayush Yadav',
      role: 'Research & Development Head',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
      bio: 'Led overall technical vision, computer vision model tuning, and platform architecture for Smart India Hackathon 2026.'
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

      <main style={{ flex: 1, padding: '60px 0 100px' }}>
        <div className="container">
          
          {/* Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9)), url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop") center/cover',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '56px 40px',
            marginBottom: '48px',
            color: '#FFFFFF'
          }}>
            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <Globe size={14} />
              <span>Founded in Uttar Pradesh, India • SIH 2026 (PS-33)</span>
            </div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', color: '#FFFFFF' }}>
              Our Mission & Student Founders
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '750px', lineHeight: '1.6' }}>
              Pioneered under the foundation of Pragya's Uttar Pradesh, EcoTrace was built by 6 student leads to transform India's informal e-waste disposal into an AI-powered circular economy.
            </p>
          </div>

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
                <div key={i} className="feature-card" style={{ padding: '0', overflow: 'hidden', textAlign: 'center' }}>
                  <div style={{ height: '260px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={f.photo} 
                      alt={f.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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
                      fontWeight: '700'
                    }}>
                      {f.role}
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '8px' }}>{f.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {f.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Benchmarks */}
          <div style={{
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
