import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { PlatformPage } from './pages/PlatformPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { MissionPage } from './pages/MissionPage';
import { CompanyPage } from './pages/CompanyPage';
import { BlogPage } from './pages/BlogPage';
import { CommunityPage } from './pages/CommunityPage';
import { ConsumerApp } from './pages/ConsumerApp';
import { RecyclerDash } from './pages/RecyclerDash';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); 

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'platform' && (
        <PlatformPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'methodology' && (
        <MethodologyPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'mission' && (
        <MissionPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'company' && (
        <CompanyPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'blog' && (
        <BlogPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'community' && (
        <CommunityPage 
          onNavigate={handleNavigate}
          onOpenConsumerApp={() => setCurrentView('consumer')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'consumer' && (
        <ConsumerApp 
          onBackToLanding={() => setCurrentView('landing')} 
          onOpenRecyclerDash={() => setCurrentView('recycler')} 
        />
      )}

      {currentView === 'recycler' && (
        <RecyclerDash 
          onBackToLanding={() => setCurrentView('landing')} 
        />
      )}
    </ThemeProvider>
  );
}
