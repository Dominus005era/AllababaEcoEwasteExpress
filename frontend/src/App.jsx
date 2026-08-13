import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { PlatformPage } from './pages/PlatformPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { MissionPage } from './pages/MissionPage';
import { CompanyPage } from './pages/CompanyPage';
import { BlogPage } from './pages/BlogPage';
import { CommunityPage } from './pages/CommunityPage';
import { AuthPage } from './pages/AuthPage';
import { DonorDash } from './pages/DonorDash';
import { RecyclerDash } from './pages/RecyclerDash';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [authRole, setAuthRole] = useState('donor');

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (role = 'donor') => {
    setAuthRole(role);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role) => {
    if (role === 'recycler') {
      setCurrentView('recycler');
    } else {
      setCurrentView('donor-dash');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {currentView === 'landing' && (
          <LandingPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'platform' && (
          <PlatformPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'methodology' && (
          <MethodologyPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'mission' && (
          <MissionPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'company' && (
          <CompanyPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'community' && (
          <CommunityPage 
            onNavigate={handleNavigate}
            onOpenConsumerApp={() => handleOpenAuth('donor')} 
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
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
            onOpenRecyclerDash={() => handleOpenAuth('recycler')} 
          />
        )}

        {currentView === 'recycler' && (
          <RecyclerDash 
            onBackToLanding={() => setCurrentView('landing')} 
          />
        )}

        {currentView === 'admin' && (
          <AdminPage 
            onNavigate={handleNavigate}
          />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
