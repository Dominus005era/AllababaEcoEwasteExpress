import React from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  Menu
} from 'lucide-react';

export const AdminHeader = ({ 
  onNavigateHome = () => {}, 
  onLogout = () => {}, 
  onSyncDb = () => {}, 
  loadingSync = false,
  onOpenMobileMenu = () => {}
}) => {
  return (
    <header style={{
      background: 'var(--bg-card, #FFFFFF)',
      borderBottom: '1px solid var(--border-color, #E2E8F0)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      position: 'sticky',
      top: 0,
      zIndex: 990,
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      {/* Left: Brand & Mobile Hamburger Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Mobile Hamburger Toggle */}
        <button 
          id="admin-mobile-toggle-btn"
          onClick={onOpenMobileMenu}
          className="admin-mobile-toggle"
          style={{
            background: 'var(--bg-secondary, #F1F5F9)',
            border: '1px solid var(--border-color, #E2E8F0)',
            color: 'var(--text-primary, #0F172A)',
            borderRadius: '9px',
            padding: '7px 9px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* EcoTrace.AI Brand Logo (Controlled single exit to Home Page) */}
        <button
          onClick={onNavigateHome}
          title="Return to EcoTrace Platform"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            textAlign: 'left'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 3px 10px rgba(16, 185, 129, 0.25)',
            flexShrink: 0
          }}>
            <Leaf size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)', lineHeight: '1.2' }}>
              EcoTrace<span style={{ color: '#10B981' }}>.AI</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#DC2626', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Supreme Console
            </div>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Sync Live DB */}
        <button
          id="admin-sync-btn"
          onClick={onSyncDb}
          disabled={loadingSync}
          className="btn btn-outline btn-sm"
          style={{
            borderRadius: '9px',
            padding: '7px 12px',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFFFFF'
          }}
          title="Refresh All Database Entities"
        >
          <RefreshCw size={14} className={loadingSync ? 'spin' : ''} />
          <span className="admin-btn-text">Sync MySQL</span>
        </button>

        {/* Level-5 Badge */}
        <div 
          className="admin-badge-pill"
          style={{
            background: '#FEF2F2',
            color: '#DC2626',
            border: '1px solid #FECACA',
            fontSize: '0.74rem',
            fontWeight: '800',
            padding: '4px 10px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ShieldCheck size={13} />
          <span>LEVEL-5 ROOT</span>
        </div>

        {/* Lock Console Button (Logs out and exits to Company Page) */}
        <button
          onClick={onLogout}
          className="btn btn-outline btn-sm"
          style={{
            borderColor: '#FECACA',
            background: '#FEF2F2',
            color: '#DC2626',
            borderRadius: '9px',
            padding: '7px 12px',
            fontSize: '0.82rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Lock Console & Exit to Company Page"
        >
          <Lock size={13} />
          <span className="admin-btn-text">Lock Console</span>
        </button>
      </div>
    </header>
  );
};
