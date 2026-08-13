import React, { useState } from 'react';
import { Leaf, Sun, Moon, Smartphone, LayoutDashboard, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Header = ({ currentView, onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'platform', label: 'Platform' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'mission', label: 'Mission' },
    { id: 'company', label: 'Company' },
    { id: 'blog', label: 'Blog' },
    { id: 'community', label: 'Community' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('landing')} 
          className="brand-logo"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <div className="brand-icon-wrapper">
            <Leaf size={24} />
          </div>
          <span>EcoTrace<span className="gradient-text">.AI</span></span>
        </button>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            {navItems.map((item) => (
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

        {/* Header Actions */}
        <div className="nav-actions">
          {/* Light / Dark Mode Toggle */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Launch Mobile App Flow Button */}
          <button className="btn btn-outline btn-sm" onClick={onOpenConsumerApp}>
            <Smartphone size={16} />
            <span>Launch App</span>
          </button>

          {/* Recycler Web Dashboard CTA */}
          <button className="btn btn-primary btn-sm" onClick={onOpenRecyclerDash}>
            <LayoutDashboard size={16} />
            <span>Recycler Portal</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 9999,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              style={{ textAlign: 'left', fontSize: '1.05rem', padding: '10px 16px' }}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-outline" onClick={() => { setMobileMenuOpen(false); onOpenConsumerApp(); }}>
              <Smartphone size={18} />
              <span>Launch App (Mobile Flow)</span>
            </button>
            <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); onOpenRecyclerDash(); }}>
              <LayoutDashboard size={18} />
              <span>Recycler Portal (Desktop)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
