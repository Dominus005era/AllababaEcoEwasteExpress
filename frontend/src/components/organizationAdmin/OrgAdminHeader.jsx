import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  RefreshCw, 
  LogOut, 
  ExternalLink, 
  Menu, 
  Sparkles,
  MapPin,
  PlusCircle,
  Radio
} from 'lucide-react';

export const OrgAdminHeader = ({
  orgUser = null,
  onSyncDb = () => {},
  loadingSync = false,
  onNavigatePublic = () => {},
  onOpenMobileMenu = () => {},
  onLogout = () => {},
  onAddBranch = () => {}
}) => {
  return (
    <header style={{
      height: '64px',
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(10px, 2vw, 24px)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      flexShrink: 0,
      userSelect: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      gap: '8px'
    }}>
      {/* Left: Mobile Toggle & Brand / Org Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 12px)', minWidth: 0, flex: '1 1 auto' }}>
        <button
          onClick={onOpenMobileMenu}
          className="mobile-menu-btn"
          style={{
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: '38px',
            height: '38px'
          }}
          title="Toggle Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: '900',
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
            flexShrink: 0
          }}>
            <Building2 size={20} />
          </div>

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
              <span style={{ 
                color: '#0F172A', 
                fontWeight: '900', 
                fontSize: 'clamp(0.92rem, 3.2vw, 1.15rem)', 
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {orgUser?.organizationName || 'GreenDrop Circular Metals Ltd (Hub #4)'}
              </span>

              <span style={{
                background: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                fontSize: '0.68rem',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }} className="hide-on-mobile">
                <ShieldCheck size={11} />
                CPCB MASTER
              </span>

              {/* Unique Assigned Org ID */}
              <span style={{
                background: '#F0F9FF',
                color: '#0284C7',
                border: '1px solid #BAE6FD',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                letterSpacing: '0.02em',
                flexShrink: 0
              }} className="hide-on-mobile">
                {orgUser?.id || 'ORG-GREENDROP-04'}
              </span>
            </div>
            
            <div style={{
              fontSize: '0.7rem',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '1px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              <span>Hub: <strong style={{ color: '#334155' }}>{orgUser?.city || 'Central'}</strong></span>
              <span className="hide-on-mobile">•</span>
              <span style={{ color: '#059669', fontWeight: '700' }} className="hide-on-mobile">
                {orgUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live Network Status & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(5px, 1.2vw, 8px)', flexShrink: 0 }}>
        {/* Live MySQL Active Pulse Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.72rem',
          color: '#166534'
        }} className="hide-on-mobile">
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px #10B981',
            display: 'inline-block'
          }} />
          <span style={{ fontWeight: '800', letterSpacing: '0.02em' }}>Live MySQL</span>
        </div>

        {/* Quick Add Branch Button */}
        <button
          onClick={onAddBranch}
          className="hide-on-mobile"
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            padding: '7px 11px',
            borderRadius: '9px',
            fontSize: '0.76rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ECFDF5';
            e.currentTarget.style.borderColor = '#10B981';
            e.currentTarget.style.color = '#047857';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.color = '#0F172A';
          }}
          title="Register New Regional Base Branch"
        >
          <PlusCircle size={13} color="#10B981" />
          <span>New Base</span>
        </button>

        {/* Refresh / Sync DB Button */}
        <button
          onClick={onSyncDb}
          disabled={loadingSync}
          style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            color: '#334155',
            padding: '7px 11px',
            borderRadius: '9px',
            fontSize: '0.76rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            minHeight: '36px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#94A3B8';
            e.currentTarget.style.background = '#F8FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.background = '#FFFFFF';
          }}
          title="Synchronize database telemetry"
        >
          <RefreshCw size={13} className={loadingSync ? "spin-icon" : ""} color="#10B981" />
          <span className="hide-on-mobile">{loadingSync ? 'Syncing...' : 'Sync'}</span>
        </button>

        {/* Return to Public Partner Portal */}
        <button
          onClick={onNavigatePublic}
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#475569',
            padding: '7px 10px',
            borderRadius: '9px',
            fontSize: '0.76rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s ease',
            minHeight: '36px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.color = '#0F172A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.color = '#475569';
          }}
          title="Return to Public Partner Page"
        >
          <ExternalLink size={13} />
          <span className="hide-on-mobile">Public Hub</span>
        </button>

        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#DC2626',
            padding: '7px 11px',
            borderRadius: '9px',
            fontSize: '0.76rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s ease',
            minHeight: '36px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.borderColor = '#DC2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
          }}
          title="Sign Out of Organization Session"
        >
          <LogOut size={13} />
          <span className="hide-on-mobile">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
