import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogIn, 
  Flame, 
  Users, 
  QrCode, 
  Activity, 
  Radio, 
  PlusCircle, 
  Calendar, 
  Building2, 
  Sparkles, 
  RefreshCw,
  Key
} from 'lucide-react';
import { communityAdminApi } from '../services/api';
import { CommunityAdminSidebar } from '../components/communityAdmin/CommunityAdminSidebar';
import { CommunityAdminHeader } from '../components/communityAdmin/CommunityAdminHeader';
import { CommunityAdminEventsView } from '../components/communityAdmin/CommunityAdminEventsView';
import { CommunityAdminCreateEventView } from '../components/communityAdmin/CommunityAdminCreateEventView';
import { CommunityAdminPassGeneratorView } from '../components/communityAdmin/CommunityAdminPassGeneratorView';
import { CommunityAdminParticipantsView } from '../components/communityAdmin/CommunityAdminParticipantsView';
import { CommunityAdminAnalyticsView } from '../components/communityAdmin/CommunityAdminAnalyticsView';
import { CommunityAdminAnnouncementsView } from '../components/communityAdmin/CommunityAdminAnnouncementsView';
import { CommunityAdminProposalsView } from '../components/communityAdmin/CommunityAdminProposalsView';
import { CommunityAdminProfileView } from '../components/communityAdmin/CommunityAdminProfileView';
import { CommunityAdminEditEventModal } from '../components/communityAdmin/CommunityAdminEditEventModal';

export const CommunityAdminPage = ({ onNavigate }) => {
  // Authentication State (Strictly Ephemeral Session)
  const [commAdminToken, setCommAdminToken] = useState(sessionStorage.getItem('ecotrace_comm_admin_token') || null);
  const [commAdminUser, setCommAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ecotrace_comm_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login Form States (NO credentials hardcoded in form)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Active Admin Route / Tab:
  // 'events', 'new-event', 'generate-passes', 'participants', 'announcements', 'analytics', 'proposals', 'profile-settings'
  const [activeTab, setActiveTab] = useState('events');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Live Data States
  const [stats, setStats] = useState({
    totalEvents: 0,
    liveHackathons: 0,
    totalApplicants: 0,
    pendingApprovals: 0,
    approvedParticipants: 0,
    checkedInCount: 0,
    campusReach: 12,
    totalProposals: 0,
    totalLockedPasses: 0
  });

  const [eventsList, setEventsList] = useState([]);
  const [applicantsList, setApplicantsList] = useState([]);
  const [proposalsList, setProposalsList] = useState([]);
  const [passesList, setPassesList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Modal State
  const [editingEvent, setEditingEvent] = useState(null);

  // Load All Community Data
  const loadAdminData = async () => {
    if (!commAdminToken) return;
    setLoadingData(true);
    try {
      const [statsRes, eventsRes, applicantsRes, propRes, passesRes] = await Promise.allSettled([
        communityAdminApi.getStats(),
        communityAdminApi.getEvents(),
        communityAdminApi.getRegistrations(),
        communityAdminApi.getProposals(),
        communityAdminApi.getPasses()
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.stats) {
        setStats(statsRes.value.stats);
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value.events) {
        setEventsList(eventsRes.value.events);
      }
      if (applicantsRes.status === 'fulfilled' && applicantsRes.value.registrations) {
        setApplicantsList(applicantsRes.value.registrations);
      }
      if (propRes.status === 'fulfilled' && propRes.value.proposals) {
        setProposalsList(propRes.value.proposals);
      }
      if (passesRes.status === 'fulfilled' && passesRes.value.passes) {
        setPassesList(passesRes.value.passes);
      }
    } catch (err) {
      console.warn('Error fetching community admin telemetry:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (commAdminToken) {
      loadAdminData();
    }
  }, [commAdminToken]);

  // Strict Auto-Logout: Clear session credentials when leaving/unmounting Community Admin Page
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('ecotrace_comm_admin_token');
      sessionStorage.removeItem('ecotrace_comm_admin_user');
      localStorage.removeItem('ecotrace_comm_admin_token');
      localStorage.removeItem('ecotrace_comm_admin_user');
    };
  }, []);

  // Login Action
  const handleLogin = async (e, customUser, customPass) => {
    if (e) e.preventDefault();
    const u = customUser || loginUsername;
    const p = customPass || loginPassword;

    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await communityAdminApi.login(u, p);
      if (res.success && res.token) {
        sessionStorage.setItem('ecotrace_comm_admin_token', res.token);
        sessionStorage.setItem('ecotrace_comm_admin_user', JSON.stringify(res.admin));
        localStorage.removeItem('ecotrace_comm_admin_token');
        localStorage.removeItem('ecotrace_comm_admin_user');
        setCommAdminToken(res.token);
        setCommAdminUser(res.admin);
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Invalid Community Admin credentials. Please check username and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Sign out (Strict Auto-Logout on Exit)
  const handleLogout = () => {
    sessionStorage.removeItem('ecotrace_comm_admin_token');
    sessionStorage.removeItem('ecotrace_comm_admin_user');
    localStorage.removeItem('ecotrace_comm_admin_token');
    localStorage.removeItem('ecotrace_comm_admin_user');
    setCommAdminToken(null);
    setCommAdminUser(null);
    setLoginUsername('');
    setLoginPassword('');
    setLoginError(null);
    onNavigate('events');
  };

  // Switch to pass generator for a specific event
  const handleJumpToPassGenerator = (eventId) => {
    setActiveTab('generate-passes');
  };

  // Switch to participants view for a specific event
  const handleJumpToParticipants = (eventId) => {
    setActiveTab('participants');
  };

  // =========================================================================
  // VIEW A: UNAUTHENTICATED LOGIN VIEW (Clean Light Enterprise Theme)
  // =========================================================================
  if (!commAdminToken) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #F8FAFC 50%, #EFF6FF 100%)',
        color: '#0F172A'
      }}>
        {/* Clean Light Top Header Bar */}
        <header style={{
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}>
              🌱
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.1 }}>
                EcoTrace<span style={{ color: '#10B981' }}> Community</span>
              </div>
              <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#059669', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
                Sub-Admin Governance
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('events')}
            style={{
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: '600',
              color: '#475569',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#94A3B8';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#475569';
            }}
          >
            ← Return to Public Hub
          </button>
        </header>

        {/* Centered Main Login Box */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '100%',
            padding: '38px 32px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 6px', color: '#0F172A' }}>
                Community Sub-Admin Portal
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Sign in to manage registered Hackathons, allocate auto-locked event passes, and govern attendee check-ins.
              </p>
            </div>

            {loginError && (
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                marginBottom: '16px'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Sub-Admin Username / Email
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. community_admin or email"
                  required
                  style={{
                    width: '100%',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    color: '#0F172A',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your sub-admin password"
                  required
                  style={{
                    width: '100%',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    color: '#0F172A',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>

              {/* Quick Fill Master Keys Box */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Key size={12} color="#10B981" />
                    <span>Demo Sub-Admin Credentials</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginUsername('community_admin');
                      setLoginPassword('EcoCommunity@2026');
                    }}
                    style={{
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      color: '#047857',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={11} />
                    <span>Quick Fill Master Keys</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div>Unique ID: <code style={{ color: '#0284C7', background: '#E0F2FE', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>COMM-ADM-2026-01</code></div>
                  <div>User / Email: <code style={{ color: '#0F172A', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>community_admin</code></div>
                  <div>Password: <code style={{ color: '#047857', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>EcoCommunity@2026</code></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  borderRadius: '12px',
                  marginTop: '4px',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                <LogIn size={16} />
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Sub-Admin Console →'}</span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => onNavigate('events')} 
                style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}
              >
                ← Return to Community &amp; Event Hub
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHENTICATED COMMUNITY SUB-ADMIN CONSOLE (SUPER-ADMIN STYLE SIDEBAR LAYOUT)
  // =========================================================================
  return (
    <div style={{
      height: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--bg-primary, #F8FAFC)'
    }}>
      
      {/* Top Header Bar (Fixed Height 60px) */}
      <CommunityAdminHeader
        commAdminUser={commAdminUser}
        onSyncDb={loadAdminData}
        loadingSync={loadingData}
        onNavigatePublic={handleLogout}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        onLogout={handleLogout}
      />

      {/* Two-Column Body Layout */}
      <div style={{
        display: 'flex',
        flex: 1,
        height: 'calc(100vh - 60px)',
        maxHeight: 'calc(100vh - 60px)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* Left Side Panel Navigation Dock */}
        <CommunityAdminSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          eventsCount={eventsList.length}
          applicantsCount={applicantsList.length}
          proposalsCount={proposalsList.length}
          lockedPassesCount={passesList.length}
          commAdminUser={commAdminUser}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={handleLogout}
          onNavigatePublic={handleLogout}
        />

        {/* Right Main Content Scrollable Workspace */}
        <main style={{
          flex: 1,
          height: '100%',
          maxHeight: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '24px 28px 60px',
          boxSizing: 'border-box',
          minWidth: 0
        }} className="community-admin-main-scroll">
          
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            
            {/* ROUTE 1: MANAGED EVENTS HUB */}
            {activeTab === 'events' && (
              <CommunityAdminEventsView
                events={eventsList}
                onOpenEdit={(ev) => setEditingEvent(ev)}
                onSelectEventForPass={handleJumpToPassGenerator}
                onSelectEventForParticipants={handleJumpToParticipants}
                onNavigateCreate={() => setActiveTab('new-event')}
                onRefreshData={loadAdminData}
              />
            )}

            {/* ROUTE 2: CREATE NEW EVENT */}
            {activeTab === 'new-event' && (
              <CommunityAdminCreateEventView
                commAdminUser={commAdminUser}
                onEventCreated={() => {
                  loadAdminData();
                  setActiveTab('events');
                }}
              />
            )}

            {/* ROUTE 3: EVENT PASS MASTER ENGINE */}
            {activeTab === 'generate-passes' && (
              <CommunityAdminPassGeneratorView
                events={eventsList}
                onRefreshData={loadAdminData}
              />
            )}

            {/* ROUTE 4: PARTICIPANT PASS REGISTRY */}
            {activeTab === 'participants' && (
              <CommunityAdminParticipantsView
                applicants={applicantsList}
                events={eventsList}
                onRefreshData={loadAdminData}
              />
            )}

            {/* ROUTE 5: BROADCAST PUSH NOTICES */}
            {activeTab === 'announcements' && (
              <CommunityAdminAnnouncementsView
                events={eventsList}
                commAdminUser={commAdminUser}
              />
            )}

            {/* ROUTE 6: ANALYTICS & TELEMETRY */}
            {activeTab === 'analytics' && (
              <CommunityAdminAnalyticsView
                stats={stats}
                events={eventsList}
                applicants={applicantsList}
              />
            )}

            {/* ROUTE 7: CAMPUS HOST PROPOSALS */}
            {activeTab === 'proposals' && (
              <CommunityAdminProposalsView
                proposals={proposalsList}
                commAdminUser={commAdminUser}
                onRefreshData={loadAdminData}
              />
            )}

            {/* ROUTE 8: SUB-ADMIN PROFILE & SCOPE */}
            {activeTab === 'profile-settings' && (
              <CommunityAdminProfileView
                commAdminUser={commAdminUser}
                eventsCount={eventsList.length}
                applicantsCount={applicantsList.length}
                onLogout={handleLogout}
              />
            )}

          </div>
        </main>
      </div>

      {/* EDIT EVENT MODAL */}
      {editingEvent && (
        <CommunityAdminEditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSaved={loadAdminData}
        />
      )}

    </div>
  );
};
