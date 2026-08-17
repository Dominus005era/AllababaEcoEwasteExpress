import React from 'react';
import { 
  Building2, 
  Package, 
  Warehouse, 
  Radio, 
  Activity, 
  Layers, 
  Cpu, 
  Users, 
  Truck, 
  ShieldCheck, 
  LogOut, 
  X, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  QrCode,
  MapPin,
  Flame,
  CheckCircle2,
  Calendar,
  Zap,
  Scale
} from 'lucide-react';

export const OrgAdminSidebar = ({
  activeTab,
  onSelectTab,
  incomingRequestsCount = 0,
  intakeLotsCount = 0,
  branchesCount = 0,
  fieldRecyclersCount = 0,
  batchesCount = 0,
  clientsCount = 0,
  dispatchesCount = 0,
  orgUser = null,
  isMobileOpen = false,
  onCloseMobile = () => {},
  onLogout = () => {},
  onNavigatePublic = () => {}
}) => {
  const navSections = [
    {
      title: 'OPERATIONS & ALLOCATIONS',
      items: [
        {
          id: 'pickup-allocations',
          label: 'Inbound Citizen Pickups',
          icon: QrCode,
          count: incomingRequestsCount || 1,
          badge: '1 Active',
          isCount: true,
          color: '#10B981',
          bg: 'rgba(16, 185, 129, 0.14)',
          border: 'rgba(16, 185, 129, 0.3)'
        }
      ]
    },
    {
      title: 'NETWORK & RECYCLERS',
      items: [
        {
          id: 'field-supervision',
          label: 'Authorized Field Recyclers',
          icon: Radio,
          count: fieldRecyclersCount || 3,
          badge: 'Live GPS',
          isCount: false,
          color: '#EC4899',
          bg: 'rgba(236, 72, 153, 0.14)',
          border: 'rgba(236, 72, 153, 0.3)'
        },
        {
          id: 'logistics',
          label: 'Geo-Logistics & DPP Transit',
          icon: Truck,
          count: dispatchesCount || 1,
          badge: 'EV Fleet',
          isCount: false,
          color: '#06B6D4',
          bg: 'rgba(6, 182, 212, 0.14)',
          border: 'rgba(6, 182, 212, 0.3)'
        }
      ]
    },
    {
      title: 'GOVERNANCE & AUDIT',
      items: [
        {
          id: 'profile-settings',
          label: 'Organization Profile & CPCB',
          icon: ShieldCheck,
          badge: 'CPCB L-2',
          isCount: false,
          color: '#10B981',
          bg: 'rgba(16, 185, 129, 0.14)',
          border: 'rgba(16, 185, 129, 0.3)'
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 19, 43, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'block',
            transition: 'opacity 0.2s ease'
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside 
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #0B132B 0%, #0D1630 40%, #080E1E 100%)',
          borderRight: '1px solid #1E293B',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          boxShadow: '6px 0 28px rgba(0, 0, 0, 0.35)',
          userSelect: 'none',
          zIndex: isMobileOpen ? 1001 : 25
        }}
        className={`community-admin-sidebar ${isMobileOpen ? 'open' : ''}`}
      >
        {/* Sidebar Top Header */}
        <div style={{
          padding: '20px 18px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1.2rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              flexShrink: 0
            }}>
              <Building2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                EcoTrace <span style={{ color: '#10B981' }}>Base</span>
              </div>
              <div style={{ fontSize: '0.66rem', fontWeight: '800', color: '#6EE7B7', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                Smelter Command Console
              </div>
            </div>
          </div>

          {/* Close Button on Mobile Drawer */}
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#CBD5E1',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close sidebar navigation"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {navSections.map((sec, secIdx) => (
            <div key={secIdx}>
              {/* Section Header */}
              <div style={{
                fontSize: '0.66rem',
                fontWeight: '800',
                color: '#64748B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0 8px 8px',
                userSelect: 'none'
              }}>
                {sec.title}
              </div>

              {/* Section Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sec.items.map(item => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (isMobileOpen) onCloseMobile();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        minHeight: '46px',
                        padding: '6px 10px 6px 8px',
                        borderRadius: '13px',
                        border: isActive 
                          ? '1px solid rgba(255, 255, 255, 0.12)' 
                          : '1px solid transparent',
                        background: isActive 
                          ? 'linear-gradient(90deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%)' 
                          : 'transparent',
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        cursor: 'pointer',
                        transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                        textAlign: 'left',
                        boxSizing: 'border-box',
                        boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.25)' : 'none',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                          e.currentTarget.style.color = '#F1F5F9';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.color = '#94A3B8';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 auto' }}>
                        {/* Vibrant Squircle Icon Container */}
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          background: item.bg,
                          border: `1px solid ${item.border}`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: isActive ? `0 2px 10px ${item.color}35` : 'none',
                          transition: 'all 0.18s ease'
                        }}>
                          <Icon size={18} strokeWidth={2.2} />
                        </div>

                        {/* Item Label */}
                        <span style={{
                          fontSize: '0.84rem',
                          fontWeight: isActive ? '800' : '600',
                          letterSpacing: '-0.01em',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: isActive ? '#FFFFFF' : '#94A3B8'
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {/* Right Badge Pill / Number Indicator */}
                      {item.badge ? (
                        item.isCount ? (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            background: isActive ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
                            color: isActive ? '#FFFFFF' : '#CBD5E1',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginLeft: '6px'
                          }}>
                            {item.badge}
                          </span>
                        ) : (
                          <span style={{
                            fontSize: '0.67rem',
                            fontWeight: '700',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: isActive ? '#CBD5E1' : '#64748B',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2px 7px',
                            borderRadius: '6px',
                            flexShrink: 0,
                            marginLeft: '6px',
                            letterSpacing: '0.02em',
                            whiteSpace: 'nowrap'
                          }}>
                            {item.badge}
                          </span>
                        )
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Public Partner Hub Link Strip */}
        <div style={{ padding: '0 12px 10px' }}>
          <button
            onClick={() => {
              onNavigatePublic();
              if (isMobileOpen) onCloseMobile();
            }}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '12px',
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#CBD5E1',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
              e.currentTarget.style.color = '#CBD5E1';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExternalLink size={15} color="#10B981" />
              <span>Public Partner Hub</span>
            </div>
            <ChevronRight size={14} color="#64748B" />
          </button>
        </div>

        {/* Sidebar Footer: Organization Identity Card */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          background: 'rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '12px',
            padding: '10px 12px',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {orgUser?.contactPerson || 'Nodal Base Officer'}
              </div>
              <span style={{
                background: 'rgba(16, 185, 129, 0.16)',
                color: '#6EE7B7',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontSize: '0.62rem',
                fontWeight: '800',
                padding: '1px 5px',
                borderRadius: '4px'
              }}>
                LEVEL-2
              </span>
            </div>
            
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {orgUser?.email || 'admin@greendropmetals.org'}
            </div>
            <div style={{ fontSize: '0.66rem', color: '#6EE7B7', fontFamily: 'monospace', marginTop: '2px' }}>
              ID: {orgUser?.id || 'ORG-GREENDROP-04'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => {
                onLogout();
                if (isMobileOpen) onCloseMobile();
              }}
              style={{
                width: '100%',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#F87171',
                padding: '7px 10px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
                minHeight: '34px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.22)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                e.currentTarget.style.color = '#F87171';
              }}
              title="Sign Out"
            >
              <LogOut size={13} />
              <span>Sign Out Session</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
