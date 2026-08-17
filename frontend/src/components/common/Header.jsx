import React, { useState } from 'react';
import { 
  Leaf, 
  Sun, 
  Moon, 
  Smartphone, 
  LayoutDashboard, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles,
  Camera,
  Package,
  DollarSign,
  TrendingUp,
  Globe,
  Settings,
  ArrowLeft,
  Building2,
  ListOrdered,
  Truck,
  LifeBuoy,
  History
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { ProfilePopover } from './ProfilePopover';
import { useRef } from 'react';

export const Header = ({ currentView, onNavigate, onOpenConsumerApp, onOpenRecyclerDash, onTabSelect, activeTab, onOpenSupport }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, userRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);
  const profileBtnRef = useRef(null);

  const isDashboard = ['donor-dash', 'recycler', 'recycler-history', 'admin', 'settings', 'geologistics'].includes(currentView) || (currentUser && ['settings', 'geologistics', 'events', 'support', 'recycler-history'].includes(currentView));

  const publicNavItems = [
    { id: 'landing', label: 'Home' },
    { id: 'platform', label: 'Platform' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'mission', label: 'Mission' },
    { id: 'company', label: 'Company' },
    { id: 'blog', label: 'Blog' },
    { id: 'community', label: 'Community' },
    { id: 'partner', label: 'Partner' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardTabClick = (tabKey) => {
    if (onNavigate) {
      if (userRole === 'recycler') {
        onNavigate('recycler', tabKey);
      } else if (userRole === 'admin') {
        onNavigate('admin', tabKey);
      } else {
        onNavigate('donor-dash', tabKey);
      }
    }
    if (onTabSelect) {
      onTabSelect(tabKey);
    }
    setMobileMenuOpen(false);
  };

  const handleDashboardRedirect = () => {
    if (userRole === 'admin') {
      onNavigate('admin');
    } else if (userRole === 'recycler') {
      onNavigate('recycler');
    } else {
      onNavigate('donor-dash');
    }
  };

  // Helper to extract personal display name for navbar avatar pill
  const getFirstName = () => {
    if (currentUser?.displayName) {
      const parts = currentUser.displayName.trim().split(/\s+/);
      return parts[0];
    }
    if (currentUser?.name) {
      const parts = currentUser.name.trim().split(/\s+/);
      return parts[0];
    }
    if (userRole === 'recycler') {
      return 'Siddharth';
    }
    if (currentUser?.companyName) {
      const parts = currentUser.companyName.trim().split(/\s+/);
      return parts[0];
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'Account';
  };

  const userFirstName = getFirstName();
  const userInitial = (currentUser?.displayName || currentUser?.name || (userRole === 'recycler' ? 'Siddharth' : '') || currentUser?.companyName || currentUser?.email || 'U')[0].toUpperCase();

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          
          {/* Brand Logo (Always links to Landing/Home) */}
          <button 
            onClick={() => handleNavClick('landing')} 
            className="brand-logo"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Return to EcoTrace Home"
          >
            <div className="brand-icon-wrapper">
              <Leaf size={20} />
            </div>
            <span>EcoTrace<span className="gradient-text">.AI</span></span>
          </button>

          {/* Desktop Navigation: Shown ONLY on Public / Informational Pages */}
          {!isDashboard && (
            <nav>
              <ul className="nav-menu">
                {publicNavItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Header Right Actions */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Light / Dark Mode Toggle */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* If User is Logged In: Name Pill (Desktop & Mobile) + Dashboard Button (Desktop Only) */}
            {currentUser ? (
              <>
                <div style={{ position: 'relative' }}>
                  <button
                    ref={profileBtnRef}
                    onClick={() => setProfilePanelOpen(!profilePanelOpen)}
                    className={`header-profile-btn ${profilePanelOpen ? 'active' : ''}`}
                    title="Open Account Profile Snapshot & Settings"
                    aria-expanded={profilePanelOpen}
                  >
                    <div className="header-avatar-circle" style={{
                      background: userRole === 'admin' ? '#8B5CF6' : userRole === 'recycler' ? '#3B82F6' : '#10B981',
                      color: '#FFFFFF'
                    }}>
                      {currentUser.avatarUrl ? (
                        <img src={currentUser.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        userInitial
                      )}
                    </div>
                    <span className="header-user-name">
                      {userFirstName}
                    </span>
                    <ChevronDown 
                      size={13} 
                      color="var(--text-muted)" 
                      style={{ 
                        flexShrink: 0,
                        transform: profilePanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </button>

                  {/* Floating Dialog Popover */}
                  <ProfilePopover 
                    isOpen={profilePanelOpen} 
                    onClose={() => setProfilePanelOpen(false)} 
                    onNavigate={onNavigate}
                    onOpenSupport={onOpenSupport}
                    anchorRef={profileBtnRef}
                  />
                </div>

                {/* Dashboard Button: Displayed beside User Name Profile on Desktop */}
                <button 
                  className="btn btn-primary hide-on-mobile header-dashboard-btn" 
                  onClick={handleDashboardRedirect}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                  title={`Open ${userRole === 'admin' ? 'Admin Management' : userRole === 'recycler' ? 'Recycler Logistics' : 'Donor Dashboard'}`}
                >
                  <LayoutDashboard size={16} style={{ flexShrink: 0 }} />
                  <span style={{ display: 'inline-block', lineHeight: 1 }}>Dashboard</span>
                </button>
              </>
            ) : (
              /* If User is NOT logged in: Show Sign In */
              <>
                <button 
                  className="btn btn-outline btn-sm hide-on-mobile" 
                  onClick={onOpenConsumerApp}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Smartphone size={15} style={{ flexShrink: 0 }} />
                  <span style={{ display: 'inline-block', lineHeight: 1 }}>Launch App</span>
                </button>

                <button 
                  className="btn btn-primary btn-sm hide-on-mobile" 
                  onClick={onOpenRecyclerDash}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    fontSize: '0.86rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <LayoutDashboard size={15} style={{ flexShrink: 0 }} />
                  <span style={{ display: 'inline-block', lineHeight: 1 }}>Sign In</span>
                </button>

                {/* Mobile screen: Sign In button shown when NOT logged in (Name icon will NOT appear) */}
                <button 
                  className="btn btn-primary btn-sm show-on-mobile-flex" 
                  onClick={onOpenRecyclerDash}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '7px 14px', 
                    fontSize: '0.82rem', 
                    fontWeight: '700',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap'
                  }}
                  title="Sign In to EcoTrace"
                >
                  <User size={14} style={{ flexShrink: 0 }} />
                  <span style={{ display: 'inline-block', lineHeight: 1 }}>Sign In</span>
                </button>
              </>
            )}

            {/* HAMBURGER MENU ICON (Upscaled & comfortable touch target):
                - On Public Pages: Mobile menu to navigate public pages
                - In Dashboard: Always visible (Mobile & Desktop) to navigate dashboard sections
            */}
            <button 
              className={isDashboard ? "dashboard-menu-toggle" : "mobile-menu-toggle"} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title={isDashboard ? "Open Dashboard Menu" : "Toggle Site Navigation"}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* 1. PUBLIC WEBSITE DRAWER (When on Landing / Info Pages) */}
        {!isDashboard && mobileMenuOpen && (
          <div className="mobile-drawer" style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 9999,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Website Navigation
            </div>
            {publicNavItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                style={{ textAlign: 'left', fontSize: '1rem', padding: '10px 14px' }}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
              {currentUser ? (
                <>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { setMobileMenuOpen(false); handleDashboardRedirect(); }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Go to {userRole === 'admin' ? 'Admin Console' : userRole === 'recycler' ? 'Recycler Portal' : 'Donor Dashboard'}</span>
                  </button>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => { setMobileMenuOpen(false); onNavigate('settings'); }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <User size={16} />
                    <span>Account Settings &amp; Profile</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => { setMobileMenuOpen(false); onOpenConsumerApp(); }}>
                    <Smartphone size={16} />
                    <span>Launch App (Mobile Flow)</span>
                  </button>
                  <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); onOpenRecyclerDash(); }}>
                    <LayoutDashboard size={16} />
                    <span>Login Portal</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* 2. DASHBOARD SIDE MENU DRAWER (When User is inside Dashboard) */}
        {isDashboard && mobileMenuOpen && (
          <div className="mobile-drawer dashboard-side-drawer" style={{
            position: 'fixed',
            top: '70px',
            right: 0,
            width: '100%',
            maxWidth: '380px',
            height: 'calc(100vh - 70px)',
            background: 'var(--bg-card)',
            borderLeft: '1px solid var(--border-color)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 9999,
            boxShadow: '-10px 0 35px rgba(0,0,0,0.5)',
            overflowY: 'auto'
          }}>
            <div>
              {/* Dashboard Role Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
                    Dashboard Navigation
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '2px 0 0', color: 'var(--text-primary)' }}>
                    {userRole === 'admin' ? 'Admin Management' : userRole === 'recycler' ? 'Recycler Logistics' : 'Donor Portal'}
                  </h3>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Actions according to Dashboard Role */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {userRole === 'donor' || !userRole ? (
                  <>
                    <button
                      onClick={() => handleDashboardTabClick('scanner')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: activeTab === 'scanner' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                        border: activeTab === 'scanner' ? '1px solid #10B981' : '1px solid var(--border-color)',
                        color: activeTab === 'scanner' ? '#10B981' : 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <Camera size={18} color="#10B981" />
                      <span>AI Camera Reticle Scanner</span>
                    </button>

                    <button
                      onClick={() => handleDashboardTabClick('pickups')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: activeTab === 'pickups' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                        border: activeTab === 'pickups' ? '1px solid #10B981' : '1px solid var(--border-color)',
                        color: activeTab === 'pickups' ? '#10B981' : 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <Package size={18} color="#10B981" />
                      <span>My Doorstep Pickups &amp; History</span>
                    </button>

                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigate('geologistics'); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <Truck size={18} color="#10B981" />
                      <span>GeoLogistics Live Tracking</span>
                    </button>
                  </>
                ) : userRole === 'recycler' ? (
                  <>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigate('recycler'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: currentView === 'recycler' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)', border: currentView === 'recycler' ? '1px solid #10B981' : '1px solid var(--border-color)', color: currentView === 'recycler' ? '#10B981' : 'var(--text-primary)', fontWeight: '700', fontSize: '0.92rem', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <Building2 size={18} color="#10B981" />
                      <span>Recycler Dispatch Center</span>
                    </button>

                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigate('geologistics'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: currentView === 'geologistics' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-secondary)', border: currentView === 'geologistics' ? '1px solid #3B82F6' : '1px solid var(--border-color)', color: currentView === 'geologistics' ? '#3B82F6' : 'var(--text-primary)', fontWeight: '700', fontSize: '0.92rem', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <Truck size={18} color="#3B82F6" />
                      <span>GeoLogistics Fleet Dispatch</span>
                    </button>

                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigate('recycler-history'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: currentView === 'recycler-history' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-secondary)', border: currentView === 'recycler-history' ? '1px solid #F59E0B' : '1px solid var(--border-color)', color: currentView === 'recycler-history' ? '#F59E0B' : 'var(--text-primary)', fontWeight: '700', fontSize: '0.92rem', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <History size={18} color="#F59E0B" />
                      <span>Recycling History &amp; Audit Archive</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onNavigate('admin'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.92rem', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <ShieldCheck size={18} color="#8B5CF6" />
                      <span>Admin Oversight Matrix</span>
                    </button>
                  </>
                )}

                {/* Profile Settings Link from Dashboard Drawer */}
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigate('settings'); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Settings size={18} color="var(--text-muted)" />
                  <span>Account Settings &amp; Profile</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions: Return to Main Website */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button
                onClick={() => handleNavClick('landing')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', fontWeight: '700' }}
              >
                <ArrowLeft size={16} />
                <span>Return to Main Website</span>
              </button>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
