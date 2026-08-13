import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Users, 
  Building2, 
  BookOpen, 
  Globe, 
  Radio, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

export const CommunityPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);

  // Real-world E-Waste News & Live Community Feed with Cover Images
  const liveNewsFeed = [
    {
      id: 1,
      source: 'Central Pollution Control Board (CPCB India)',
      time: '2 hours ago',
      title: 'India Achieves 38% Increase in Authorized E-Waste Recycler Registrations for 2026',
      summary: 'New CPCB portal metrics confirm rapid expansion of verified dismantling facilities in Uttar Pradesh, NCR, and Karnataka.',
      tag: 'Official Policy',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      source: 'Global E-Waste Recyclers Alliance',
      time: '5 hours ago',
      title: 'Urban Mining Breakthrough: Bio-Leaching Yields 99% Gold Purity from Circuit Boards',
      summary: 'Green chemical processes eliminate toxic cyanide leaching, enabling eco-friendly metal extraction in urban micro-smelters.',
      tag: 'Tech Breakthrough',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      source: 'E-Waste Recyclers India (EWRI)',
      time: '1 day ago',
      title: 'IIT Kanpur Campus Drive Collects 2.4 Tons of Legacy Hardware in 48 Hours',
      summary: 'Students and faculty donated obsolete laptops, monitors, and server racks, setting a new national university record.',
      tag: 'Campus Initiative',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      source: 'Green Tech Circular Foundation',
      time: '2 days ago',
      title: 'Tech Parks in Noida & Gurugram Launch Joint IT Asset Retirement Protocol',
      summary: 'Over 40 corporate IT enterprises adopt automated AI scanning for certified ESG carbon offset auditing.',
      tag: 'Corporate ESG',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // Active Campus & City Community Drives with Cover Images
  const activeDrives = [
    {
      title: 'Uttar Pradesh Campus E-Waste Hackathon 2026',
      location: 'Lucknow & Kanpur Universities',
      date: 'Aug 20 - Aug 25, 2026',
      stats: '15 Colleges • 3.5T Goal',
      tag: 'Active Campus Drive',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Noida IT Park ESG Collection Drive',
      location: 'Sector 62 Tech Hub, Noida',
      date: 'Aug 18 - Aug 22, 2026',
      stats: '28 Companies • 8.2T Goal',
      tag: 'Corporate Partner',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Metro E-Waste Drop-Off Network',
      location: 'Delhi NCR Metro Stations',
      date: 'Ongoing Community Center',
      stats: '50+ Kiosks Active',
      tag: 'Public Kiosk',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="community" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>
        
        {/* HERO BANNER SECTION WITH FULL-BLEED FIXED BACKGROUND */}
        <section className="subpage-hero-section community-hero-bg">
          <div className="container">
            <div className="page-hero-card">
              <div className="badge badge-emerald" style={{ marginBottom: '16px', width: 'fit-content' }}>
                <Radio size={14} />
                <span>Live Community & E-Waste News Hub</span>
              </div>
              <h1 className="page-hero-title">Global & National E-Waste Movements</h1>
              <p className="page-hero-desc">
                Stay updated with live environmental news feeds, campus collection drives, and corporate ESG initiatives powering the circular revolution across India.
              </p>
            </div>
          </div>
        </section>

        <div className="container">

          {/* Live News Ticker Bar */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.1) 100%)',
            border: '1px solid var(--emerald-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
            overflow: 'hidden'
          }}>
            <div className="badge badge-emerald" style={{ flexShrink: 0 }}>
              <span className="pulse-dot"></span>
              <span>LIVE FEED</span>
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              ⚡ CPCB Release: 38% increase in authorized recyclers in UP & NCR • IIT Kanpur collects 2.4T e-waste • Bio-leaching yields 99% gold purity
            </div>
          </div>

          {/* Section 1: Live News & Policy Feed with Cover Images */}
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe color="var(--emerald-primary)" />
              <span>Latest E-Waste News & Environmental Bulletins</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="metrics-grid">
              {liveNewsFeed.map((news) => (
                <div key={news.id} className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                    <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{news.tag}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.time}</span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4' }}>
                      {news.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                      {news.summary}
                    </p>

                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--emerald-primary)' }}>
                      Source: {news.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Active Campus & Corporate Drives */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Active Campus & City Collection Drives</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Participate in local e-waste drop-off events or register your university campus.</p>
              </div>

              <button className="btn btn-primary" onClick={() => setShowJoinModal(true)}>
                <Users size={18} />
                <span>Host / Join Campus Drive</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="blog-grid">
              {activeDrives.map((drive, idx) => (
                <div key={idx} className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div style={{ height: '160px', width: '100%' }}>
                    <img src={drive.image} alt={drive.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div className="badge badge-blue" style={{ marginBottom: '14px', fontSize: '0.75rem' }}>
                      {drive.tag}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px' }}>{drive.title}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <MapPin size={16} color="var(--emerald-primary)" />
                      <span>{drive.location}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      <Calendar size={16} color="var(--emerald-primary)" />
                      <span>{drive.date}</span>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-primary)', marginBottom: '16px' }}>
                      {drive.stats}
                    </div>

                    <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => { setSelectedDrive(drive); setShowJoinModal(true); }}>
                      <span>Register to Participate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Join / Host Drive Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="article-modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowJoinModal(false)}>
              <X size={18} />
            </button>

            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <Users size={14} />
              <span>Community Registration</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>
              {selectedDrive ? `Join ${selectedDrive.title}` : 'Host a Campus E-Waste Drive'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Fill in your details to receive collection bins, AI scanning posters, and official CPCB volunteer certificates.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Registration Successful! Our UP coordinator will reach out to you.'); setShowJoinModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full Name / Institution Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rahul Sharma / IIT Kanpur Eco Club" 
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. student@college.ac.in" 
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Location / City</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Lucknow, Uttar Pradesh" 
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ marginTop: '8px' }}>
                <span>Submit Volunteer Registration</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
