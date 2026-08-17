import React from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  LogOut, 
  ExternalLink, 
  Menu, 
  Sparkles,
  Radio,
  Calendar
} from 'lucide-react';

export const CommunityAdminHeader = ({ 
  commAdminUser = null,
  onSyncDb = () => {},
  loadingSync = false,
  onNavigatePublic = () => {},
  onOpenMobileMenu = () => {},
  onLogout = () => {}
}) => {
  return (
    <header style={{
      height: '60px',
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(10px, 2.5vw, 20px)',
      zIndex: 20,
      flexShrink: 0,
      userSelect: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Left Area: Mobile Menu Toggle & Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 2vw, 14px)', minWidth: 0 }}>
        <button
          onClick={onOpenMobileMenu}
          className="mobile-menu-btn"
          style={{
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            borderRadius: '8px',
            padding: '7px',
            cursor: 'pointer',
            display: 'none', // Shown via CSS media query on mobile
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          title="Open Menu"
        >
          <Menu size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: '900',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
            flexShrink: 0
          }}>
            🌱
          </div>

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
              <span style={{ 
                color: '#0F172A', 
                fontWeight: '900', 
                fontSize: 'clamp(1.02rem, 3.5vw, 1.2rem)', 
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                EcoTrace Community
              </span>
              <span style={{
                background: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }} className="comm-hide-xs">
                <ShieldCheck size={12} />
                ADMIN
              </span>

              {/* Unique Sub-Admin ID */}
              <span style={{
                background: '#F0F9FF',
                color: '#0284C7',
                border: '1px solid #BAE6FD',
                fontSize: '0.76rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                letterSpacing: '0.02em',
                flexShrink: 0
              }} className="hide-on-mobile">
                ID: {commAdminUser?.id || 'COMM-ADM-01'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area: Actions & Live State */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 10px)', flexShrink: 0 }}>
        {/* Live Network Pulse */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.72rem',
          color: '#166534'
        }} className="header-status-pill hide-on-mobile">
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px #10B981'
          }} />
          <span style={{ fontWeight: '700' }}>Live MySQL Active</span>
        </div>

        {/* Sync Button */}
        <button
          onClick={onSyncDb}
          disabled={loadingSync}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            color: '#334155',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.15s ease'
          }}
          title="Refresh Community Database Telemetry"
        >
          <RefreshCw size={13} className={loadingSync ? 'spin' : ''} color="#059669" />
          <span className="hide-on-mobile">{loadingSync ? 'Syncing...' : 'Sync DB'}</span>
        </button>

        {/* Public Hub Button */}
        <button
          onClick={onNavigatePublic}
          style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            color: '#0284C7',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.15s ease'
          }}
          title="Open Public Event Hub"
        >
          <ExternalLink size={13} />
          <span className="hide-on-mobile">Public Hub</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.15s ease'
          }}
          title="Sign out of Community Admin Console"
        >
          <LogOut size={13} />
          <span className="hide-on-mobile">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
