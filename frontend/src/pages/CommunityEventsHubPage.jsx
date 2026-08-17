import React, { useState, useEffect } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Users, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Search, 
  Award, 
  Clock, 
  ShieldCheck, 
  Radio, 
  PlusCircle, 
  QrCode, 
  Tag, 
  Filter, 
  Check, 
  AlertCircle,
  Copy,
  Laptop,
  Flame,
  Globe2,
  Wrench,
  Truck,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { communityEventsApi } from '../services/api';
import { JoinEventModal } from '../components/events/JoinEventModal';
import { HostProposalModal } from '../components/events/HostProposalModal';

export const DUMMY_CAMPUS_DRIVES = [
  {
    id: 'DUMMY-EVT-01',
    title: '[DUMMY] MNNIT Allahabad Zero-E-Waste Campus Drive & Smart Drop-off',
    category: 'Campus Drive',
    venue_location: 'MNNIT Allahabad, Teliarganj, Prayagraj, UP',
    venueLocation: 'MNNIT Allahabad, Teliarganj, Prayagraj, UP',
    hostName: 'Aarav Sharma (Student Lead)',
    organizationName: 'MNNIT Green Club & EcoTrace Academic Chapter',
    start_date: 'Aug 28, 2026',
    end_date: 'Aug 30, 2026',
    time: '10:00 AM - 05:00 PM',
    mode: 'In-Person',
    format: 'In-Person',
    is_open_registration: 1,
    isOpenRegistration: true,
    prize_pool: '₹50,000 in UPI Rewards & Certificates',
    prizePool: '₹50,000 in UPI Rewards & Certificates',
    is_trending: 1,
    isTrending: true,
    current_participants: 142,
    max_participants: 250,
    tags: 'MNNIT,Prayagraj,DropOff,StudentLed,Circularity',
    banner_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Multi-day university collection drive collecting damaged smartphones, laptops, and motherboards for CPCB-certified hydrometallurgical recycling.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-02',
    title: '[DUMMY] IIIT Allahabad Circular Electronics & Robotics Hackathon 2026',
    category: 'Hackathon',
    venue_location: 'IIIT Allahabad CC-3 Auditorium, Jhalwa, Prayagraj, UP',
    venueLocation: 'IIIT Allahabad CC-3 Auditorium, Jhalwa, Prayagraj, UP',
    hostName: 'Priya Singh (Technical Convener)',
    organizationName: 'IIIT-A Robotics & Circular Economy Society',
    start_date: 'Sep 05, 2026',
    end_date: 'Sep 07, 2026',
    time: '09:00 AM - 09:00 PM',
    mode: 'Hybrid',
    format: 'Hybrid',
    is_open_registration: 1,
    isOpenRegistration: true,
    prize_pool: '₹2,50,000 Hackathon Prize Pool',
    prizePool: '₹2,50,000 Hackathon Prize Pool',
    is_trending: 1,
    isTrending: true,
    current_participants: 380,
    max_participants: 400,
    tags: 'Hackathon,IIITA,AI,Robotics,ComputerVision',
    banner_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] 48-hour build sprint engineering AI vision models for reverse logistics classification and IoT-assisted e-waste bin telemetry.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-03',
    title: '[DUMMY] Lucknow IT City Corporate ESG Disposal & PCB Reclamation Sprint',
    category: 'Corporate Drive',
    venue_location: 'HCL IT City Campus, Sultanpur Road, Lucknow, UP',
    venueLocation: 'HCL IT City Campus, Sultanpur Road, Lucknow, UP',
    hostName: 'Vikramaditya Roy (ESG Manager)',
    organizationName: 'Uttar Pradesh State Industrial Development Alliance',
    start_date: 'Sep 12, 2026',
    end_date: 'Sep 12, 2026',
    time: '11:00 AM - 04:00 PM',
    mode: 'In-Person',
    format: 'In-Person',
    is_open_registration: 0,
    isOpenRegistration: false,
    prize_pool: 'CPCB Form-2 & Scope 3 Offset Credits',
    prizePool: 'CPCB Form-2 & Scope 3 Offset Credits',
    is_trending: 0,
    isTrending: false,
    current_participants: 65,
    max_participants: 100,
    tags: 'Corporate,Lucknow,EPR,ESG,ServerHardware',
    banner_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Enterprise bulk decommissioning of server rack motherboards, lithium battery backups, and fiber optic transceivers.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-04',
    title: '[DUMMY] BHU Varanasi Community Repair Café & PCB Soldering Clinic',
    category: 'Repair Clinic',
    venue_location: 'IIT BHU Technex Grounds, Varanasi, UP',
    venueLocation: 'IIT BHU Technex Grounds, Varanasi, UP',
    hostName: 'Ananya Mishra (Lab Instructor)',
    organizationName: 'Kashi Green Tech Forum',
    start_date: 'Sep 18, 2026',
    end_date: 'Sep 19, 2026',
    time: '01:00 PM - 06:00 PM',
    mode: 'In-Person',
    format: 'In-Person',
    is_open_registration: 1,
    isOpenRegistration: true,
    prize_pool: 'Free Toolkits & Component Swaps',
    prizePool: 'Free Toolkits & Component Swaps',
    is_trending: 0,
    isTrending: false,
    current_participants: 89,
    max_participants: 120,
    tags: 'BHU,Varanasi,RepairCafe,RightToRepair,HandsOn',
    banner_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Hands-on student workshop teaching right-to-repair diagnostics, screen refurbishment, and eco-friendly desoldering.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-05',
    title: '[DUMMY] Noida Tech Corridor E-Waste Reverse Logistics & Drone Telemetry Demo',
    category: 'Webinar / Demo',
    venue_location: 'Virtual Live Stream / Noida Sector 62 Hub',
    venueLocation: 'Virtual Live Stream / Noida Sector 62 Hub',
    hostName: 'Rohit Sen (IoT Lead)',
    organizationName: 'National Clean Tech Federation',
    start_date: 'Sep 24, 2026',
    end_date: 'Sep 24, 2026',
    time: '04:00 PM - 06:30 PM',
    mode: 'Online',
    format: 'Online',
    is_open_registration: 1,
    isOpenRegistration: true,
    prize_pool: 'Certified Telemetry Badges',
    prizePool: 'Certified Telemetry Badges',
    is_trending: 0,
    isTrending: false,
    current_participants: 512,
    max_participants: 1000,
    tags: 'Webinar,Noida,IoT,Telemetry,Logistics',
    banner_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Online showcase demonstrating GPS-tracked sealed doorstep pickup trucks and smart weight sensor integration.',
    isDummy: true
  },
  {
    id: 'DUMMY-EVT-06',
    title: '[DUMMY] Kanpur University Lithium-Ion Battery Safety & Zero-Landfill Summit',
    category: 'Summit & Drive',
    venue_location: 'CSJM University Main Auditorium, Kanpur, UP',
    venueLocation: 'CSJM University Main Auditorium, Kanpur, UP',
    hostName: 'Dr. Rajesh Gupta (Materials Faculty)',
    organizationName: 'UP Pollution Control Board (Regional Chapter)',
    start_date: 'Oct 02, 2026',
    end_date: 'Oct 02, 2026',
    time: '09:30 AM - 03:30 PM',
    mode: 'In-Person',
    format: 'In-Person',
    is_open_registration: 1,
    isOpenRegistration: true,
    prize_pool: '₹1,00,000 Research Grant & Awards',
    prizePool: '₹1,00,000 Research Grant & Awards',
    is_trending: 1,
    isTrending: true,
    current_participants: 230,
    max_participants: 350,
    tags: 'Kanpur,BatterySafety,ZeroLandfill,CPCB,LithiumIon',
    banner_image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
    description: '[DUMMY / BACKEND PENDING] Educational conference and collection depot for obsolete EV cells, laptop battery banks, and hazardous e-waste containment.',
    isDummy: true
  }
];

export const CommunityEventsHubPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash, onOpenAuth }) => {
  const { currentUser } = useAuth();
  
  const [events, setEvents] = useState(DUMMY_CAMPUS_DRIVES);
  const [loading, setLoading] = useState(false);
  
  // Multi-parameter filter states
  const [activeCategory, setActiveCategory] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all'); // 'all', 'Hybrid', 'In-Person', 'Online'
  const [admissionFilter, setAdmissionFilter] = useState('all'); // 'all', 'open', 'curated'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'soonest', 'prize'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedEventForJoin, setSelectedEventForJoin] = useState(null);
  const [showHostModal, setShowHostModal] = useState(false);
  const [showAuthRequiredPrompt, setShowAuthRequiredPrompt] = useState(false);
  const [authPromptAction, setAuthPromptAction] = useState('join'); // 'join' or 'host'

  // User's registered passes
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [showMyPassesDrawer, setShowMyPassesDrawer] = useState(false);
  const [copiedPassId, setCopiedPassId] = useState(null);

  // Fetch live events from MySQL with fallback to 6 dummy entries
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await communityEventsApi.getAll();
      if (res.events && Array.isArray(res.events) && res.events.length > 0) {
        setEvents(res.events);
      } else {
        setEvents(DUMMY_CAMPUS_DRIVES);
      }
    } catch (err) {
      console.warn('Fallback loading events:', err);
      setEvents(DUMMY_CAMPUS_DRIVES);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user registrations from MySQL
  const fetchMyRegistrations = async () => {
    if (!currentUser?.email && !currentUser?.id) return;
    try {
      const res = await communityEventsApi.getMyRegistrations({
        email: currentUser?.email,
        userId: currentUser?.id
      });
      if (res.registrations && Array.isArray(res.registrations)) {
        setMyRegistrations(res.registrations);
      }
    } catch (err) {
      console.warn('Error fetching my registrations:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchMyRegistrations();
    }
  }, [currentUser]);

  // Auth Guard for Joining
  const handleJoinClick = (event) => {
    if (!currentUser) {
      setAuthPromptAction('join');
      setShowAuthRequiredPrompt(true);
      return;
    }
    setSelectedEventForJoin(event);
  };

  // Auth Guard for Hosting Proposal
  const handleHostClick = () => {
    if (!currentUser) {
      setAuthPromptAction('host');
      setShowAuthRequiredPrompt(true);
      return;
    }
    setShowHostModal(true);
  };

  const handleCopyPass = (ticketNumber) => {
    if (!ticketNumber) return;
    navigator.clipboard.writeText(ticketNumber);
    setCopiedPassId(ticketNumber);
    setTimeout(() => setCopiedPassId(null), 2000);
  };

  // Category Tabs Configuration (matching all categories across platform & host parameters)
  const categoryTabs = [
    { id: 'all', label: 'All Competitions & Drives', icon: Globe2 },
    { id: 'AI & Hardware Hackathon', label: 'AI & Hardware Hackathons', icon: Cpu },
    { id: 'Campus E-Waste Collection', label: 'Campus & City Drives', icon: Building2 },
    { id: 'GreenTech & Circular Innovation', label: 'GreenTech & Smelting Challenges', icon: Sparkles },
    { id: 'Community Workshop', label: 'Repair & Disassembly Workshops', icon: Wrench },
    { id: 'Logistics & AI Algorithms', label: 'Reverse Logistics Sprints', icon: Truck }
  ];

  // Filter & Sort Logic
  const filteredEvents = events.filter((ev) => {
    // Category filter
    if (activeCategory !== 'all') {
      const cat = (ev.category || '').toLowerCase();
      const act = activeCategory.toLowerCase();
      const matchCat = cat === act ||
        cat.includes(act) ||
        (activeCategory === 'Campus E-Waste Collection' && (cat.includes('campus') || cat.includes('corporate') || cat.includes('collection'))) ||
        (activeCategory === 'GreenTech & Circular Innovation' && (cat.includes('greentech') || cat.includes('circular') || cat.includes('smelting'))) ||
        (activeCategory === 'Community Workshop' && (cat.includes('workshop') || cat.includes('repair'))) ||
        (activeCategory === 'Logistics & AI Algorithms' && (cat.includes('logistics') || cat.includes('algorithm') || cat.includes('fleet')));
      if (!matchCat) return false;
    }

    // Search query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = (ev.title || '').toLowerCase().includes(q);
      const inVenue = (ev.venueLocation || ev.venue_location || '').toLowerCase().includes(q);
      const inDesc = (ev.description || '').toLowerCase().includes(q);
      const inCategory = (ev.category || '').toLowerCase().includes(q);
      let inTags = false;
      if (Array.isArray(ev.tags)) {
        inTags = ev.tags.some(t => String(t).toLowerCase().includes(q));
      }
      if (!inTitle && !inVenue && !inDesc && !inCategory && !inTags) return false;
    }

    // Format mode filter
    if (formatFilter !== 'all') {
      const mode = (ev.mode || '').toLowerCase();
      if (formatFilter === 'Hybrid' && !mode.includes('hybrid')) return false;
      if (formatFilter === 'In-Person' && !mode.includes('in-person')) return false;
      if (formatFilter === 'Online' && !mode.includes('online') && !mode.includes('virtual')) return false;
    }

    // Admission type filter
    if (admissionFilter !== 'all') {
      const isOpen = ev.is_open_registration !== 0 && ev.isOpenRegistration !== false;
      if (admissionFilter === 'open' && !isOpen) return false;
      if (admissionFilter === 'curated' && isOpen) return false;
    }

    return true;
  }).sort((a, b) => {
    const isTrendingA = a.is_trending || a.isTrending ? 1 : 0;
    const isTrendingB = b.is_trending || b.isTrending ? 1 : 0;

    if (sortBy === 'popular') {
      if (isTrendingA !== isTrendingB) return isTrendingB - isTrendingA;
      return (b.current_participants || b.currentParticipants || 0) - (a.current_participants || a.currentParticipants || 0);
    }
    if (sortBy === 'prize') {
      const getPrizeNum = (str) => {
        const match = (str || '').match(/₹?([0-9,]+)/);
        return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
      };
      if (isTrendingA !== isTrendingB) return isTrendingB - isTrendingA;
      return getPrizeNum(b.prize_pool || b.prizePool) - getPrizeNum(a.prize_pool || a.prizePool);
    }
    // Default sort: trending events first, then participants
    if (isTrendingA !== isTrendingB) return isTrendingB - isTrendingA;
    return (b.current_participants || b.currentParticipants || 0) - (a.current_participants || a.currentParticipants || 0);
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Header 
        currentView="events" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>
        
        {/* =========================================================================
            1. HERO SECTION: GENERAL COMMUNITY & INNOVATION ARENA (NOT JUST HOSTS)
        ========================================================================= */}
        <section className="page-hero-section community-hero-bg" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="container">
            <div className="page-hero-card" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                  <Flame size={14} style={{ marginRight: '4px', color: '#F59E0B' }} />
                  <span>National E-Waste Innovation &amp; Competition Arena</span>
                </div>
              </div>

              <h1 className="page-hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', lineHeight: '1.25', margin: '0 0 16px' }}>
                Explore Live Hackathons, Campus Drives &amp; Circular Challenges
              </h1>
              
              <p className="page-hero-desc" style={{ maxWidth: '780px', margin: '0 auto 24px', fontSize: '1rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Connect with engineering universities, student developers, environmental researchers, and certified CPCB recyclers. 
                Compete for cash prize pools, win mineral recovery lab grants, or collect doorstep e-waste to power India's zero-landfill mission.
              </p>

              {/* Action Buttons Group */}
              <div className="community-hero-actions" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a 
                  href="#events-directory" 
                  className="btn btn-primary"
                  style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: '800', borderRadius: '12px' }}
                >
                  <Award size={18} />
                  <span>Browse Competitions &amp; Sprints ↓</span>
                </a>

                {currentUser && myRegistrations.length > 0 && (
                  <button 
                    onClick={() => setShowMyPassesDrawer(true)} 
                    className="btn btn-secondary"
                    style={{ padding: '14px 22px', fontSize: '0.95rem', fontWeight: '700', borderRadius: '12px' }}
                  >
                    <QrCode size={18} color="#10B981" />
                    <span>My Registered Passes ({myRegistrations.length})</span>
                  </button>
                )}

                {/* Secondary Option: Host on Your Campus */}
                <button 
                  onClick={handleHostClick} 
                  className="btn btn-outline"
                  style={{ padding: '14px 22px', fontSize: '0.95rem', fontWeight: '700', borderRadius: '12px', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                >
                  <Building2 size={18} color="var(--emerald-primary)" />
                  <span>Host on Your Campus / Propose Event</span>
                </button>
              </div>

              {/* Quick Arena Metric Highlights */}
              <div className="metrics-4col-grid" style={{
                marginTop: '36px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-color)',
                textAlign: 'center'
              }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px 12px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10B981' }}>{events.length ? `${events.length}+` : '6+'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Events &amp; Hackathons</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px 12px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#3B82F6' }}>₹8,45,000+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Prize &amp; Tooling Pools</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px 12px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F59E0B' }}>1,200+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engineers &amp; Donors Competing</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px 12px' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#8B5CF6' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CPCB Smelter Verification</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            2. UNIFIED MULTI-PARAMETER SEARCH & FILTER CONSOLE
        ========================================================================= */}
        <div id="events-directory" className="container" style={{ marginTop: '48px', scrollMarginTop: '100px' }}>
          
          {/* Unified Filter Card Console */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '22px',
            padding: '22px 24px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            
            {/* Row 1: Integrated Category Filter Pills */}
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                Filter by Innovation Domain:
              </div>
              <div className="category-pills-scroll" style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                scrollbarWidth: 'none'
              }}>
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '12px',
                        background: isSelected ? 'rgba(16, 185, 129, 0.18)' : 'var(--bg-secondary)',
                        border: isSelected ? '2px solid #10B981' : '1px solid var(--border-color)',
                        color: isSelected ? '#10B981' : 'var(--text-secondary)',
                        fontWeight: isSelected ? '800' : '600',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
                      }}
                    >
                      <Icon size={15} color={isSelected ? '#10B981' : 'var(--text-muted)'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtle Separator */}
            <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }} />

            {/* Row 2: Search Input & Secondary Parameter Dropdowns */}
            <div className="events-filter-toolbar" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              
              {/* Search Input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '10px 16px',
                flex: 1,
                minWidth: '240px'
              }}>
                <Search size={18} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search by event title, campus (Kanpur, Lucknow, Noida), or tech tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    width: '100%'
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    ✕
                  </button>
                )}
              </div>

              {/* Parameter Dropdowns */}
              <div className="filter-selects-group" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                
                {/* Event Format */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Format:</span>
                  <select
                    value={formatFilter}
                    onChange={(e) => setFormatFilter(e.target.value)}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Formats</option>
                    <option value="Hybrid">Hybrid Mode</option>
                    <option value="In-Person">In-Person Campus</option>
                    <option value="Online">Virtual / Online</option>
                  </select>
                </div>

                {/* Admission Type */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Admission:</span>
                  <select
                    value={admissionFilter}
                    onChange={(e) => setAdmissionFilter(e.target.value)}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Entry Types</option>
                    <option value="open">⚡ Instant Open Pass</option>
                    <option value="curated">🛡️ Curated Squads</option>
                  </select>
                </div>

                {/* Sort By */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="popular">🔥 Most Popular / Trending</option>
                    <option value="prize">💰 Highest Prize Pool</option>
                    <option value="soonest">📅 Starting Soonest</option>
                  </select>
                </div>

              </div>
            </div>

          </div>

          {/* =========================================================================
              3. EVENTS GRID CARDS DISPLAY (3 CARDS PER ROW ON DESKTOP)
          ========================================================================= */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div className="badge badge-emerald" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                <Sparkles size={16} />
                <span>Loading live events from MySQL database...</span>
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px'
            }}>
              <Award size={48} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px' }}>No matching competitions found</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 20px' }}>
                Try selecting "All Competitions &amp; Drives" or clearing your search filter.
              </p>
              <button 
                onClick={() => { setActiveCategory('all'); setFormatFilter('all'); setAdmissionFilter('all'); setSearchQuery(''); }}
                className="btn btn-primary btn-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="events-3col-grid">
              {filteredEvents.map((event) => {
                const isRegistered = myRegistrations.some(r => r.event_id === event.id || r.eventId === event.id);
                const regRecord = myRegistrations.find(r => r.event_id === event.id || r.eventId === event.id);
                const fillPercent = Math.min(100, Math.round(((event.current_participants || event.currentParticipants || 0) / (event.max_participants || event.maxParticipants || 100)) * 100));

                let parsedTags = [];
                try {
                  parsedTags = typeof event.tags === 'string' ? JSON.parse(event.tags) : (event.tags || []);
                } catch(e) {
                  parsedTags = ['AI Vision', 'E-Waste Recovery'];
                }

                return (
                  <div
                    key={event.id}
                    className="feature-card"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '22px',
                      border: isRegistered ? '2px solid #10B981' : '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    <div>
                      {/* Event Banner Image with Overlays */}
                      <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden' }}>
                        <img 
                          src={event.banner_image || event.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} 
                          alt={event.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)'
                        }} />

                        {/* Top Badges */}
                        <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '3px 8px' }}>
                              ⚡ MOCK / DUMMY ENTRY
                            </span>
                            <span className="badge badge-emerald" style={{ fontSize: '0.74rem', padding: '4px 10px' }}>
                              {event.category || 'Innovation Sprint'}
                            </span>
                            {(event.is_trending || event.isTrending) && (
                              <span className="badge badge-emerald" style={{ background: '#10B981', color: '#FFFFFF', fontWeight: '800', fontSize: '0.72rem', padding: '4px 8px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)' }}>
                                <Flame size={12} style={{ marginRight: '3px' }} />
                                <span>Trending</span>
                              </span>
                            )}
                          </div>

                          <span className={event.is_open_registration !== 0 ? 'badge badge-emerald' : 'badge badge-amber'} style={{ fontSize: '0.74rem', padding: '4px 10px' }}>
                            {event.is_open_registration !== 0 ? '⚡ Instant Pass' : '🛡️ Curated'}
                          </span>
                        </div>

                        {/* Prize Pool Badge Overlay on Banner Bottom */}
                        <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Prize Pool / Grant</span>
                            <span style={{ fontSize: '0.98rem', fontWeight: '800', color: '#10B981' }}>{event.prize_pool || event.prizePool || '₹1,50,000 + Grant'}</span>
                          </div>

                          <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '6px 10px', borderRadius: '10px', fontSize: '0.76rem', color: '#CBD5E1' }}>
                            {event.mode || 'Hybrid'}
                          </div>
                        </div>
                      </div>

                      {/* Event Details Content */}
                      <div style={{ padding: '22px' }}>
                        
                        <h3 style={{ fontSize: '1.22rem', fontWeight: '800', margin: '0 0 10px', lineHeight: '1.35', color: 'var(--text-primary)' }}>
                          {event.title}
                        </h3>

                        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: '1.55', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {event.description}
                        </p>

                        {/* Key Info Meta Rows */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={15} color="#3B82F6" style={{ flexShrink: 0 }} />
                            <span><strong>{event.start_date || event.startDate}</strong> {event.end_date ? `— ${event.end_date}` : ''}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin size={15} color="#10B981" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue_location || event.venueLocation || 'Campus Hub'}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Users size={15} color="#F59E0B" style={{ flexShrink: 0 }} />
                            <span>Host: <strong>{event.hostName || event.organizerName || 'Aarav Sharma'}</strong> {event.hostRole ? `(${event.hostRole})` : ''}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Building2 size={15} color="#8B5CF6" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              Org: <strong>{event.organizationName || event.venueLocation || 'EcoTrace Academic Alliance'}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Capacity Progress Bar */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Registered Attendees:</span>
                            <span style={{ fontWeight: '700', color: fillPercent > 80 ? '#F59E0B' : '#10B981' }}>
                              {event.current_participants || event.currentParticipants || 0} / {event.max_participants || event.maxParticipants || 500} ({fillPercent}%)
                            </span>
                          </div>
                          <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${fillPercent}%`, height: '100%', background: fillPercent > 80 ? '#F59E0B' : '#10B981', borderRadius: '4px' }} />
                          </div>
                        </div>

                        {/* Tags Chips */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          {parsedTags.map((tag, idx) => (
                            <span key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>

                    {/* Bottom Card Action */}
                    <div style={{ padding: '0 22px 22px' }}>
                      {isRegistered ? (
                        <div style={{
                          background: 'rgba(16, 185, 129, 0.12)',
                          border: '1px solid #10B981',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={16} color="#10B981" />
                            <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#10B981' }}>Pass Activated</span>
                          </div>
                          <button 
                            onClick={() => setShowMyPassesDrawer(true)}
                            style={{ background: 'transparent', border: 'none', color: '#10B981', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            View Ticket →
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleJoinClick(event)}
                          className="btn btn-primary"
                          style={{ width: '100%', justifyContent: 'center', padding: '12px 16px', fontSize: '0.94rem', fontWeight: '800', borderRadius: '12px' }}
                        >
                          <span>{event.is_open_registration !== 0 ? 'Register & Get Digital Pass →' : 'Apply for Curated Squad Seat →'}</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {/* =========================================================================
          4. MY REGISTERED PASSES DRAWER / MODAL
      ========================================================================= */}
      {showMyPassesDrawer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(6px)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            width: '100%',
            maxWidth: '480px',
            height: '100%',
            overflowY: 'auto',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            borderLeft: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <QrCode size={20} color="#10B981" />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>My Registered Passes</h3>
                </div>
                <button onClick={() => setShowMyPassesDrawer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  ✕
                </button>
              </div>

              {myRegistrations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  <Award size={40} style={{ margin: '0 auto 10px' }} />
                  <div>No event tickets booked yet.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myRegistrations.map((reg) => {
                    const ticketNum = reg.ticket_number || (reg.id ? `ECO-${reg.id.slice(-8)}` : 'ECO-PASS-8491');
                    const participantId = reg.participant_id || `ECO-PID-${(reg.registration_id || reg.id || '1001').slice(-4)}`;

                    return (
                      <div 
                        key={reg.registration_id || reg.id} 
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1.5px solid var(--emerald-primary)',
                          borderRadius: '20px',
                          padding: '20px',
                          boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '0.74rem' }}>
                            {reg.event_category || 'Official Hackathon Pass'}
                          </span>
                          
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {reg.ecosystem_role && (
                              <span style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                color: '#38BDF8',
                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                fontSize: '0.66rem',
                                fontWeight: '800',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}>
                                {reg.ecosystem_role}
                              </span>
                            )}
                            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                              {reg.registration_status === 'approved' ? '✓ Active Pass' : '⏳ Pending'}
                            </span>
                          </div>
                        </div>

                        <h4 style={{ fontSize: '1.15rem', fontWeight: '900', margin: 0, color: 'var(--text-primary)', lineHeight: '1.3' }}>
                          {reg.pass_title || reg.event_title || reg.eventTitle || 'Community Hackathon'}
                        </h4>

                        {/* Participant Identifiers */}
                        <div style={{
                          background: 'var(--bg-card)',
                          border: '1px dashed var(--border-color)',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Participant ID</span>
                            <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#38BDF8', fontSize: '0.95rem' }}>
                              {participantId}
                            </div>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ticket Pass Number</span>
                            <div style={{ fontFamily: 'monospace', fontWeight: '900', color: '#10B981', fontSize: '1.1rem' }}>
                              {ticketNum}
                            </div>
                          </div>

                          <button
                            onClick={() => handleCopyPass(ticketNum)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            {copiedPassId === ticketNum ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                            <span>{copiedPassId === ticketNum ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Gate & Reporting Window */}
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.25)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '0.78rem',
                          color: '#CBD5E1',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <div>📍 Check-in Gate: <strong>{reg.gate_instructions || reg.venue_location || 'Main Auditorium Desk'}</strong></div>
                          <div>⏰ Reporting Time: <strong>{reg.reporting_time || reg.start_date || '08:30 AM IST'}</strong></div>
                          {reg.emergency_contact && <div>📞 Helpdesk Phone: <strong>{reg.emergency_contact}</strong></div>}
                        </div>

                        {/* Social Community Join Links (WhatsApp, Telegram, Discord) */}
                        {(reg.whatsapp_link || reg.telegram_link || reg.discord_link) && (
                          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '700' }}>
                              Official Attendee Discussion Hubs:
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {reg.whatsapp_link && (
                                <a
                                  href={reg.whatsapp_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    background: 'rgba(37, 211, 102, 0.15)',
                                    border: '1px solid rgba(37, 211, 102, 0.4)',
                                    color: '#25D366',
                                    padding: '5px 10px',
                                    borderRadius: '8px',
                                    fontSize: '0.76rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    textDecoration: 'none'
                                  }}
                                >
                                  <span>Join WhatsApp Group →</span>
                                </a>
                              )}

                              {reg.telegram_link && (
                                <a
                                  href={reg.telegram_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    background: 'rgba(0, 136, 204, 0.15)',
                                    border: '1px solid rgba(0, 136, 204, 0.4)',
                                    color: '#0088CC',
                                    padding: '5px 10px',
                                    borderRadius: '8px',
                                    fontSize: '0.76rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    textDecoration: 'none'
                                  }}
                                >
                                  <span>Join Telegram Channel →</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Checklist */}
                        {reg.checklist_items && (
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px', fontSize: '0.74rem', color: '#94A3B8' }}>
                            <div style={{ fontWeight: '700', color: '#E2E8F0', marginBottom: '2px' }}>📋 Bring Checklist:</div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{reg.checklist_items}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowMyPassesDrawer(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '20px', justifyContent: 'center' }}
            >
              Close Ticket Drawer
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MODALS INTEGRATION
      ========================================================================= */}

      {/* JOIN MODAL */}
      {selectedEventForJoin && (
        <JoinEventModal
          event={selectedEventForJoin}
          currentUser={currentUser}
          onClose={() => setSelectedEventForJoin(null)}
          onJoinedSuccess={() => {
            fetchEvents();
            fetchMyRegistrations();
          }}
        />
      )}

      {/* HOST PROPOSAL MODAL */}
      {showHostModal && (
        <HostProposalModal
          currentUser={currentUser}
          onClose={() => setShowHostModal(false)}
          onSubmittedSuccess={() => {
            fetchEvents();
          }}
        />
      )}

      {/* AUTH REQUIRED SIGN-IN PROMPT */}
      {showAuthRequiredPrompt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
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
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShieldCheck size={36} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 8px' }}>
              Sign In to {authPromptAction === 'host' ? 'Propose Campus Drive' : 'Join Competition'}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 24px', lineHeight: '1.55' }}>
              You need an active donor or recycler account on EcoTrace to claim your digital event pass or submit an official campus hosting proposal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn btn-primary"
                style={{ justifyContent: 'center', padding: '12px' }}
                onClick={() => {
                  setShowAuthRequiredPrompt(false);
                  if (onOpenAuth) onOpenAuth('login', 'donor');
                  else onNavigate('auth');
                }}
              >
                <span>Sign In / Create Account →</span>
              </button>

              <button 
                className="btn btn-outline"
                style={{ justifyContent: 'center', padding: '12px' }}
                onClick={() => setShowAuthRequiredPrompt(false)}
              >
                Continue Browsing as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
