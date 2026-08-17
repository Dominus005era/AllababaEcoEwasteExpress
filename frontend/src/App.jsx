import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { PlatformPage } from './pages/PlatformPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { MissionPage } from './pages/MissionPage';
import { CompanyPage } from './pages/CompanyPage';
import { BlogPage } from './pages/BlogPage';
import { CommunityPage } from './pages/CommunityPage';
import { PartnerPage } from './pages/PartnerPage';
import { AuthPage } from './pages/AuthPage';
import { DonorDash } from './pages/DonorDash';
import { RecyclerDash } from './pages/RecyclerDash';
import { RecyclerHistoryPage } from './pages/RecyclerHistoryPage';
import { RecyclerLotsPage } from './pages/RecyclerLotsPage';
import { AdminPage } from './pages/AdminPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { GeoLogisticsPage } from './pages/GeoLogisticsPage';
import { CommunityEventsHubPage } from './pages/CommunityEventsHubPage';
import { CommunityAdminPage } from './pages/CommunityAdminPage';
import { OrganizationAdminPage } from './pages/OrganizationAdminPage';
import { OnboardingQuestionsModal } from './components/auth/OnboardingQuestionsModal';

function AppContent() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path === 'auth' || path === 'login') return 'auth';
    if (path === 'admin') return 'admin';
    if (path === 'recycler' || path === 'recycler-dash') return 'recycler';
    if (path === 'org-admin' || path === 'partner-admin' || path === 'organization-admin') return 'org-admin';
    if (path === 'community-admin' || path === 'event-admin') return 'community-admin';
    if (path === 'platform') return 'platform';
    if (path === 'methodology') return 'methodology';
    if (path === 'mission') return 'mission';
    if (path === 'company') return 'company';
    if (path === 'blog') return 'blog';
    if (path === 'community') return 'community';
    if (path === 'partner') return 'partner';
    if (path === 'donor-dash' || path === 'donor') return 'donor-dash';
    return 'landing';
  });
  const [authRole, setAuthRole] = useState('donor');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [selectedTrackingLot, setSelectedTrackingLot] = useState(null);
  const [donorTab, setDonorTab] = useState('scanner');
  const { currentUser, userRole, logout } = useAuth();

  const handleNavigate = (view, data = null) => {
    // Strict Auto-Logout for Master Admin when navigating away to any other page
    if ((currentView === 'admin' || userRole === 'admin') && view !== 'admin') {
      logout();
    }

    // Strict Auto-Logout for Community Sub-Admin when navigating away to any other page
    if ((currentView === 'community-admin' || currentView === 'event-admin') && view !== 'community-admin' && view !== 'event-admin') {
      sessionStorage.removeItem('ecotrace_comm_admin_token');
      sessionStorage.removeItem('ecotrace_comm_admin_user');
      localStorage.removeItem('ecotrace_comm_admin_token');
      localStorage.removeItem('ecotrace_comm_admin_user');
    }

    // Strict Auto-Logout for Organization Sub-Admin when navigating away to any other page
    if ((currentView === 'org-admin' || currentView === 'partner-admin' || currentView === 'organization-admin') && 
        view !== 'org-admin' && view !== 'partner-admin' && view !== 'organization-admin') {
      sessionStorage.removeItem('ecotrace_org_token');
      sessionStorage.removeItem('ecotrace_org_user');
      localStorage.removeItem('ecotrace_org_token');
      localStorage.removeItem('ecotrace_org_user');
    }

    if (view === 'donor-dash' && typeof data === 'string') {
      setDonorTab(data);
    } else if (typeof data === 'object' && data !== null) {
      if (data.lotId) {
        setSelectedTrackingLot(data);
        setSelectedTrackingOrder(null);
      } else {
        setSelectedTrackingOrder(data);
        setSelectedTrackingLot(null);
      }
    } else if (typeof data === 'string' && data !== 'scanner' && data !== 'pickups') {
      setDonorTab('scanner');
    }

    try {
      window.history.pushState({}, '', view === 'landing' ? '/' : `/${view}`);
    } catch {}

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode = 'login', role = 'donor') => {
    setAuthRole(role);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsumerApp = () => {
    if (currentUser) {
      if (userRole === 'admin') {
        handleNavigate('admin');
      } else if (userRole === 'recycler') {
        handleNavigate('recycler');
      } else {
        handleNavigate('donor-dash');
      }
    } else {
      // Route unauthenticated user directly to the authentication / login page
      handleOpenAuth('login', 'donor');
    }
  };

  const handleOpenRecyclerDash = () => {
    if (currentUser) {
      if (userRole === 'admin') {
        handleNavigate('admin');
      } else if (userRole === 'recycler') {
        handleNavigate('recycler');
      } else {
        handleNavigate('donor-dash');
      }
    } else {
      handleOpenAuth('login', 'donor');
    }
  };

  const handleLoginSuccess = (role) => {
    if (role === 'admin') {
      setCurrentView('admin');
    } else if (role === 'recycler') {
      setCurrentView('recycler');
    } else {
      setCurrentView('donor-dash');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'platform' && (
        <PlatformPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'methodology' && (
        <MethodologyPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'mission' && (
        <MissionPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'company' && (
        <CompanyPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'partner' && (
        <PartnerPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'blog' && (
        <BlogPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
        />
      )}

      {currentView === 'community' && (
        <CommunityPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
          onOpenAuth={handleOpenAuth}
        />
      )}

      {(currentView === 'events' || currentView === 'community-hub' || currentView === 'hackathons') && (
        <CommunityEventsHubPage
          onNavigate={handleNavigate}
          onOpenConsumerApp={handleOpenConsumerApp} 
          onOpenRecyclerDash={handleOpenRecyclerDash} 
          onOpenAuth={handleOpenAuth}
        />
      )}

      {(currentView === 'community-admin' || currentView === 'event-admin') && (
        <CommunityAdminPage
          onNavigate={handleNavigate}
        />
      )}

      {(currentView === 'org-admin' || currentView === 'partner-admin' || currentView === 'organization-admin') && (
        <OrganizationAdminPage
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'auth' && (
        <AuthPage
          initialRole={authRole}
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'donor-dash' && (
        <DonorDash 
          onNavigate={handleNavigate}
          onOpenRecyclerDash={handleOpenRecyclerDash} 
          onOpenSupport={() => setIsSupportModalOpen(true)}
          initialTab={donorTab}
        />
      )}

      {(currentView === 'geologistics' || currentView === 'track' || currentView === 'track-driver') && (
        <GeoLogisticsPage 
          onNavigate={handleNavigate}
          selectedOrder={selectedTrackingOrder}
          selectedLot={selectedTrackingLot}
        />
      )}

      {currentView === 'recycler' && (
        <RecyclerDash 
          onNavigate={handleNavigate}
          onBackToLanding={() => handleNavigate('landing')} 
          onOpenSupport={() => setIsSupportModalOpen(true)}
        />
      )}

      {(currentView === 'recycler-history' || currentView === 'history' || currentView === 'recycler-archive') && (
        <RecyclerHistoryPage 
          onNavigate={handleNavigate}
        />
      )}

      {(currentView === 'recycler-lots' || currentView === 'depot-lots' || currentView === 'delivery-lots') && (
        <RecyclerLotsPage 
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'admin' && (
        <AdminPage 
          onNavigate={handleNavigate}
        />
      )}

      {(currentView === 'settings' || currentView === 'profile') && (
        <ProfileSettingsPage 
          onNavigate={handleNavigate}
        />
      )}

      {/* Mandatory First-Time Onboarding Profile & Regional Setup Modal */}
      <OnboardingQuestionsModal 
        isOpen={Boolean(currentUser && userRole !== 'admin' && currentUser.profileCompleted === false)}
        onComplete={(role) => {
          if (role === 'recycler') {
            setCurrentView('recycler');
          } else {
            setCurrentView('donor-dash');
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
