import React, { useState, useEffect } from 'react';
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
  X,
  Play,
  ShieldCheck,
  Award,
  Flame,
  ExternalLink,
  RefreshCw,
  Clock,
  Copy,
  Check
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { communityEventsApi, newsApi } from '../services/api';
import { JoinEventModal } from '../components/events/JoinEventModal';
import { HostProposalModal } from '../components/events/HostProposalModal';

export const DUMMY_CAMPUS_DRIVES = [
  {
    id: 'DUMMY-EVT-01',
    title: '[DUMMY] MNNIT Allahabad Zero-E-Waste Campus Drive & Smart Drop-off',
    category: 'Campus Drive',
    venueLocation: 'MNNIT Allahabad, Teliarganj, Prayagraj, UP',
    hostName: 'Aarav Sharma (Student Lead)',
    organizationName: 'MNNIT Green Club & EcoTrace Academic Chapter',
    date: 'Aug 28 - Aug 30, 2026',
    time: '10:00 AM - 05:00 PM',
    format: 'In-Person',
    isOpenRegistration: true,
    prizePool: '₹50,000 in UPI Rewards & Certificates',
    isTrending: true,
    bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Multi-day university collection drive collecting damaged smartphones, laptops, and motherboards for CPCB-certified hydrometallurgical recycling.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-02',
    title: '[DUMMY] IIIT Allahabad Circular Electronics & Robotics Hackathon 2026',
    category: 'Hackathon',
    venueLocation: 'IIIT Allahabad CC-3 Auditorium, Jhalwa, Prayagraj, UP',
    hostName: 'Priya Singh (Technical Convener)',
    organizationName: 'IIIT-A Robotics & Circular Economy Society',
    date: 'Sep 05 - Sep 07, 2026',
    time: '09:00 AM - 09:00 PM',
    format: 'Hybrid',
    isOpenRegistration: true,
    prizePool: '₹2,50,000 Hackathon Prize Pool',
    isTrending: true,
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] 48-hour build sprint engineering AI vision models for reverse logistics classification and IoT-assisted e-waste bin telemetry.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-03',
    title: '[DUMMY] Lucknow IT City Corporate ESG Disposal & PCB Reclamation Sprint',
    category: 'Corporate Drive',
    venueLocation: 'HCL IT City Campus, Sultanpur Road, Lucknow, UP',
    hostName: 'Vikramaditya Roy (ESG Manager)',
    organizationName: 'Uttar Pradesh State Industrial Development Alliance',
    date: 'Sep 12, 2026',
    time: '11:00 AM - 04:00 PM',
    format: 'In-Person',
    isOpenRegistration: false,
    prizePool: 'CPCB Form-2 & Scope 3 Offset Credits',
    isTrending: false,
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Enterprise bulk decommissioning of server rack motherboards, lithium battery backups, and fiber optic transceivers.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-04',
    title: '[DUMMY] BHU Varanasi Community Repair Café & PCB Soldering Clinic',
    category: 'Repair Clinic',
    venueLocation: 'IIT BHU Technex Grounds, Varanasi, UP',
    hostName: 'Ananya Mishra (Lab Instructor)',
    organizationName: 'Kashi Green Tech Forum',
    date: 'Sep 18 - Sep 19, 2026',
    time: '01:00 PM - 06:00 PM',
    format: 'In-Person',
    isOpenRegistration: true,
    prizePool: 'Free Toolkits & Component Swaps',
    isTrending: false,
    bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Hands-on student workshop teaching right-to-repair diagnostics, screen refurbishment, and eco-friendly desoldering.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-05',
    title: '[DUMMY] Noida Tech Corridor E-Waste Reverse Logistics & Drone Telemetry Demo',
    category: 'Webinar / Demo',
    venueLocation: 'Virtual Live Stream / Noida Sector 62 Hub',
    hostName: 'Rohit Sen (IoT Lead)',
    organizationName: 'National Clean Tech Federation',
    date: 'Sep 24, 2026',
    time: '04:00 PM - 06:30 PM',
    format: 'Online',
    isOpenRegistration: true,
    prizePool: 'Certified Telemetry Badges',
    isTrending: false,
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Online showcase demonstrating GPS-tracked sealed doorstep pickup trucks and smart weight sensor integration.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-06',
    title: '[DUMMY] Kanpur University Lithium-Ion Battery Safety & Zero-Landfill Summit',
    category: 'Summit & Drive',
    venueLocation: 'CSJM University Main Auditorium, Kanpur, UP',
    hostName: 'Dr. Rajesh Gupta (Materials Faculty)',
    organizationName: 'UP Pollution Control Board (Regional Chapter)',
    date: 'Oct 02, 2026',
    time: '09:30 AM - 03:30 PM',
    format: 'In-Person',
    isOpenRegistration: true,
    prizePool: '₹1,00,000 Research Grant & Awards',
    isTrending: true,
    bannerImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Educational conference and collection depot for obsolete EV cells, laptop battery banks, and hazardous e-waste containment.',
    isDummy: true
  }
];

export const CommunityPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash, onOpenAuth }) => {
  const { currentUser } = useAuth();
  
  // Live Events loaded from MySQL with 6 dummy fallback items
  const [liveEvents, setLiveEvents] = useState(DUMMY_CAMPUS_DRIVES);
  const [selectedEventForJoin, setSelectedEventForJoin] = useState(null);
  const [showHostModal, setShowHostModal] = useState(false);
  const [showAuthRequiredPrompt, setShowAuthRequiredPrompt] = useState(false);

  // Live E-Waste & Environmental News State
  const [liveNews, setLiveNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsRefreshing, setNewsRefreshing] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchLiveNewsData = async (isRefresh = false) => {
    if (isRefresh) setNewsRefreshing(true);
    try {
      const res = await newsApi.getLiveNews();
      if (res && res.news && Array.isArray(res.news)) {
        setLiveNews(res.news);
      }
    } catch (err) {
      console.warn('Error loading live news from API:', err);
    } finally {
      setNewsLoading(false);
      setNewsRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const res = await communityEventsApi.getAll();
        if (res.events && Array.isArray(res.events) && res.events.length > 0) {
          setLiveEvents(res.events);
        } else {
          setLiveEvents(DUMMY_CAMPUS_DRIVES);
        }
      } catch (err) {
        console.warn('Error loading community events, using dummy fallback:', err);
        setLiveEvents(DUMMY_CAMPUS_DRIVES);
      }
    };
    fetchLiveEvents();
    fetchLiveNewsData();
  }, []);

  const handleOpenJoin = (event) => {
    if (!currentUser) {
      setShowAuthRequiredPrompt(true);
      return;
    }
    setSelectedEventForJoin(event);
  };

  const handleOpenHost = () => {
    if (!currentUser) {
      setShowAuthRequiredPrompt(true);
      return;
    }
    setShowHostModal(true);
  };

  const handleCopyNewsLink = (url) => {
    if (!url) return;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="community" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>

        {/* HERO — full-bleed section bg, glassmorphism card inside */}
        <section className="page-hero-section community-hero-bg">
          <div className="container">
            <div className="page-hero-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div className="badge badge-emerald">
                  <Radio size={14} className="animate-pulse" />
                  <span>Live Community &amp; E-Waste News Hub</span>
                </div>

                <button 
                  onClick={() => onNavigate('org-admin')}
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: 'var(--emerald-primary)', fontSize: '0.82rem', background: 'rgba(16, 185, 129, 0.08)' }}
                >
                  <Building2 size={14} />
                  <span>Organization Admin Portal</span>
                </button>
              </div>

              <h1 className="page-hero-title">Global &amp; National E-Waste Movements</h1>
              <p className="page-hero-desc">
                Stay updated with live environmental news feeds, campus collection drives, and corporate ESG initiatives powering the circular revolution across India.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }} className="community-hero-actions">
                <button className="btn btn-primary" onClick={handleOpenHost}>
                  <Building2 size={16} />
                  <span>Host Campus Drive</span>
                </button>

                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    const el = document.getElementById('active-drives-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Users size={16} />
                  <span>Active Campus Drives ↓</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container">

          {/* Live News Ticker Bar (Synced with Live Headlines) */}
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
            <div className="badge badge-emerald" style={{ flexShrink: 0, gap: '6px' }}>
              <span className="pulse-dot"></span>
              <span>LIVE FEED</span>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
              {liveNews.length > 0
                ? liveNews.slice(0, 4).map(n => `⚡ ${n.source}: ${n.title}`).join('   •   ')
                : '⚡ Loading live environmental feeds, CPCB regulations & circular mining breakthroughs...'}
            </div>
          </div>

          {/* Section 1: Live News & Policy Feed with Cover Images */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '8px', fontSize: '0.74rem' }}>
                  <Radio size={12} className="animate-pulse" />
                  <span>Real-Time E-Waste Wire</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Globe color="var(--emerald-primary)" />
                  <span>Latest E-Waste News &amp; Environmental Bulletins</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                  Live aggregated feeds from CPCB, environmental magazines, research journals, and tech publications.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => fetchLiveNewsData(true)} 
                  disabled={newsRefreshing}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '10px', fontSize: '0.82rem', gap: '6px' }}
                  title="Refresh Live News Feed"
                >
                  <RefreshCw size={14} className={newsRefreshing ? 'animate-spin' : ''} />
                  <span>{newsRefreshing ? 'Refreshing...' : 'Live Refresh'}</span>
                </button>
              </div>
            </div>

            {newsLoading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="feature-card" style={{ padding: '24px', minHeight: '260px', opacity: 0.6 }}>
                    <div style={{ width: '40%', height: '14px', background: 'var(--bg-secondary)', borderRadius: '6px', marginBottom: '16px' }}></div>
                    <div style={{ width: '90%', height: '22px', background: 'var(--bg-secondary)', borderRadius: '6px', marginBottom: '12px' }}></div>
                    <div style={{ width: '100%', height: '60px', background: 'var(--bg-secondary)', borderRadius: '6px', marginBottom: '16px' }}></div>
                    <div style={{ width: '50%', height: '14px', background: 'var(--bg-secondary)', borderRadius: '6px' }}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="news-cards-grid">
                {liveNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="news-feed-card"
                    onClick={() => setSelectedNews(news)}
                  >
                    <div className="news-feed-image-box">
                      <img src={news.image} alt={news.title} className="news-feed-image" />
                      <div className="news-feed-tag-pill">{news.tag}</div>
                    </div>
                    <div className="news-feed-body">
                      <div className="news-feed-meta-row">
                        <span className="news-feed-source-pill">{news.source}</span>
                        <span className="news-feed-time-text">
                          <Clock size={12} />
                          <span>{news.time}</span>
                        </span>
                      </div>

                      <h3 className="news-feed-headline">
                        {news.title}
                      </h3>

                      <p className="news-feed-summary">
                        {news.summary}
                      </p>

                      <div className="news-feed-footer-row">
                        <span className="news-feed-preview-cta">
                          <span>Preview &amp; Source Link</span>
                          <ExternalLink size={13} />
                        </span>
                        <span className="news-feed-read-time">{news.readTime || '3 min read'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Active Campus & Corporate Drives (Live Fetched from MySQL) */}
          <div id="active-drives-section" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '8px', fontSize: '0.74rem' }}>
                  <Sparkles size={12} />
                  <span>Campus Zero-Waste Network</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 4px' }}>Active Campus &amp; City Collection Drives</h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Participate in university collection drives, live hackathons, or host a drive on your campus.</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => onNavigate('events')}>
                  <Award size={16} />
                  <span>Go to Community and Event Hub →</span>
                </button>

                <button className="btn btn-secondary" onClick={handleOpenHost}>
                  <Users size={16} />
                  <span>Host Campus Drive</span>
                </button>
              </div>
            </div>

            <div className="blog-grid events-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {liveEvents.slice(0, 6).map((drive) => (
                <div 
                  key={drive.id} 
                  className="feature-card" 
                  style={{ 
                    padding: '0', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    border: drive.isTrending ? '2px solid #10B981' : '1px solid var(--border-color)',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                      <img 
                        src={drive.bannerImage || drive.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} 
                        alt={drive.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
                      }} />

                      {/* Explicit Dummy Entry Tag for Backend Teammate Reference */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000' }}>
                          ⚡ MOCK / DUMMY ENTRY
                        </span>
                      </div>

                      {drive.isTrending && (
                        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                          <span className="badge badge-emerald" style={{ background: '#10B981', color: '#FFFFFF', fontWeight: '800', fontSize: '0.74rem', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)' }}>
                            <Flame size={12} style={{ marginRight: '4px' }} />
                            <span>Trending Event</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <span className="badge badge-blue" style={{ fontSize: '0.74rem' }}>
                          {drive.category || drive.tag || 'Active Drive'}
                        </span>
                        <span className={drive.isOpenRegistration !== false ? 'badge badge-emerald' : 'badge badge-amber'} style={{ fontSize: '0.72rem' }}>
                          {drive.isOpenRegistration !== false ? '⚡ Open Pass' : '🛡️ Curated'}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.35', color: 'var(--text-primary)' }}>
                        {drive.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <MapPin size={16} color="var(--emerald-primary)" style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{drive.venueLocation || drive.location || 'Uttar Pradesh'}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        <Users size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
                        <span>Host: <strong>{drive.hostName || drive.organizerName || 'Aarav Sharma'}</strong></span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        <Building2 size={14} color="#8B5CF6" style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Org: <strong>{drive.organizationName || drive.venueLocation || 'Academic Alliance'}</strong></span>
                      </div>

                      {drive.prizePool && (
                        <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', fontWeight: '800', color: '#10B981', marginBottom: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                          🏆 Prize: {drive.prizePool}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '0 24px 24px' }}>
                    <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', padding: '10px' }} onClick={() => handleOpenJoin(drive)}>
                      <span>Register to Participate →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hub Discovery Callout Banner */}
            <div className="community-callout-banner">
              <div className="community-callout-content">
                <div className="community-callout-title-row">
                  <div className="community-flame-icon-box">
                    <Flame size={16} color="#F59E0B" />
                  </div>
                  <h4 className="community-callout-title">
                    Looking for all Hackathons, Repair Workshops &amp; Smelting Sprints?
                  </h4>
                </div>
                <p className="community-callout-desc">
                  Access our full multi-parameter directory filtered by AI vision, robotics, PCB disassembly, and ₹8,45,000+ prize pools.
                </p>
              </div>

              <button 
                onClick={() => onNavigate('events')}
                className="btn btn-primary community-callout-btn"
              >
                <span>Explore Full Community &amp; Event Hub ({liveEvents.length || '6+'}) →</span>
              </button>
            </div>
          </div>

          {/* COMMUNITY ACTION & DRIVE VIDEO DEMONSTRATION (MATCHED TO LANDING PAGE PARAMETERS) */}
          <div style={{ marginBottom: '60px' }}>
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <Play size={14} />
                <span>Community Drive Media</span>
              </div>
              <h2 className="section-title">Live Campus &amp; Community Action</h2>
              <p className="section-description">Watch student volunteers, university drop-off drives, and grassroots circular revolution movements in Uttar Pradesh.</p>
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
                preload="auto"
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
                poster="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop"
              >
                <source src="/Community.mp4" type="video/mp4" />
                <source src="/community.mp4" type="video/mp4" />
                <source src="/community_demo.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </div>

        </div>
      </main>

      {/* JOIN EVENT MODAL */}
      {selectedEventForJoin && (
        <JoinEventModal
          event={selectedEventForJoin}
          currentUser={currentUser}
          onClose={() => setSelectedEventForJoin(null)}
          onJoinedSuccess={() => {
            // refresh
          }}
        />
      )}

      {/* HOST PROPOSAL MODAL */}
      {showHostModal && (
        <HostProposalModal
          currentUser={currentUser}
          onClose={() => setShowHostModal(false)}
          onSubmittedSuccess={() => {
            // proposal submitted
          }}
        />
      )}

      {/* AUTH REQUIRED PROMPT */}
      {showAuthRequiredPrompt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            maxWidth: '460px',
            width: '100%',
            padding: '28px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShieldCheck size={32} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 8px', color: 'var(--text-primary)' }}>
              Sign In to Participate or Host
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 20px', lineHeight: '1.5' }}>
              Please sign in with your Donor or Recycler account to join community hackathons or submit a campus drive hosting proposal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                onClick={() => {
                  setShowAuthRequiredPrompt(false);
                  if (onOpenAuth) onOpenAuth('login');
                }}
              >
                <span>Sign In to Continue</span>
              </button>

              <button 
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                onClick={() => {
                  setShowAuthRequiredPrompt(false);
                  if (onOpenAuth) onOpenAuth('signup');
                }}
              >
                <span>Create New Account</span>
              </button>

              <button 
                onClick={() => setShowAuthRequiredPrompt(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.84rem', marginTop: '4px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE NEWS PREVIEW & DIRECT SOURCE ACCESS MODAL */}
      {/* ========================================================================= */}
      {selectedNews && (
        <div className="news-modal-backdrop animate-fadeIn" onClick={() => setSelectedNews(null)}>
          <div className="news-modal-card animate-scaleUp" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header Bar */}
            <div className="news-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                  {selectedNews.tag}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>{selectedNews.time}</span>
                </span>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedNews(null)}
                title="Close Preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="news-modal-body">
              {/* Cover Image */}
              <div className="news-modal-image-wrapper">
                <img src={selectedNews.image} alt={selectedNews.title} className="news-modal-image" />
                <div className="news-modal-source-pill">
                  <Globe size={13} />
                  <span>Published by {selectedNews.source}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="news-modal-title">
                {selectedNews.title}
              </h2>

              {/* Verified Source Citation Box */}
              <div className="news-source-citation-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color="#10B981" />
                    <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Original Publisher: <strong style={{ color: 'var(--emerald-primary)' }}>{selectedNews.source}</strong>
                    </span>
                  </div>
                  <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '0.72rem' }}>
                    Verified Report
                  </span>
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                  Source URL: <a href={selectedNews.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--emerald-primary)', textDecoration: 'underline' }}>{selectedNews.sourceUrl}</a>
                </div>
              </div>

              {/* Overview & Content */}
              <div className="news-modal-content-section">
                <h4 style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>
                  Summary &amp; Key Takeaways
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.65, margin: '0 0 16px' }}>
                  {selectedNews.summary}
                </p>
                {selectedNews.content && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 16px' }}>
                    {selectedNews.content}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer with Direct Source Link & Sharing */}
            <div className="news-modal-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleCopyNewsLink(selectedNews.sourceUrl)}
                  className="btn btn-outline btn-sm"
                  style={{ gap: '6px' }}
                >
                  {copiedLink ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              <a 
                href={selectedNews.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', fontWeight: '800' }}
              >
                <span>Read Full Article on {selectedNews.source.split(' ')[0]}</span>
                <ExternalLink size={16} />
              </a>
            </div>

          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
