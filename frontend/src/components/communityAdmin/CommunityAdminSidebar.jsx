import React from 'react';
import { 
  Flame, 
  PlusCircle, 
  QrCode, 
  Users, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Radio, 
  LogOut, 
  X, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const CommunityAdminSidebar = ({ 
  activeTab, 
  onSelectTab, 
  eventsCount = 0, 
  applicantsCount = 0, 
  proposalsCount = 0, 
  lockedPassesCount = 0,
  commAdminUser = null,
  isMobileOpen = false, 
  onCloseMobile = () => {}, 
  onLogout = () => {},
  onNavigatePublic = () => {}
}) => {
  const navSections = [
    {
      title: 'EVENT HUBS & CREATION',
      items: [
        { 
          id: 'events', 
          label: 'Managed Events Hub', 
          icon: Flame, 
          count: eventsCount, 
          badge: `${eventsCount} Live`, 
          color: '#10B981' 
        },
        { 
          id: 'new-event', 
          label: 'Create New Event', 
          icon: PlusCircle, 
          badge: 'Creator Studio', 
          color: '#38BDF8' 
        }
      ]
    },
    {
      title: 'PASSES & PARTICIPANTS',
      items: [
        { 
          id: 'generate-passes', 
          label: 'Event Pass Master Engine', 
          icon: QrCode, 
          count: lockedPassesCount,
          badge: 'Auto-Lock', 
          color: '#F59E0B' 
        },
        { 
          id: 'participants', 
          label: 'Participant Pass Registry', 
          icon: Users, 
          count: applicantsCount, 
          color: '#8B5CF6' 
        },
        { 
          id: 'announcements', 
          label: 'Broadcast Push Notices', 
          icon: Radio, 
          badge: 'Live Broadcast', 
          color: '#EC4899' 
        }
      ]
    },
    {
      title: 'COMMUNITY INTELLIGENCE',
      items: [
        { 
          id: 'analytics', 
          label: 'Analytics & Telemetry', 
          icon: Activity, 
          badge: 'Real-time', 
          color: '#34D399' 
        },
        { 
          id: 'proposals', 
          label: 'Campus Host Proposals', 
          icon: Calendar, 
          count: proposalsCount, 
          badge: 'Review Queue', 
          color: '#FACC15' 
        }
      ]
    },
    {
      title: 'GOVERNANCE & CLEARANCE',
      items: [
        { 
          id: 'profile-settings', 
          label: 'Sub-Admin Scope & CPCB', 
          icon: ShieldCheck, 
          badge: 'CPCB L-2', 
          color: '#60A5FA' 
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
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 999,
            display: 'block',
            transition: 'opacity 0.2s ease'
          }}
        />
      )}

      {/* Main Sidebar Container */}
      <aside 
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, #0F172A 0%, #111827 50%, #0F172A 100%)',
          borderRight: '1px solid #1E293B',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
          boxShadow: '4px 0 24px rgba(0,0,0,0.25)',
          userSelect: 'none'
        }}
        className={`community-admin-sidebar ${isMobileOpen ? 'open' : ''}`}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: '18px 18px 14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.18)', 
              color: '#34D399', 
              border: '1px solid rgba(16, 185, 129, 0.35)',
              fontSize: '0.66rem',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              letterSpacing: '0.04em'
            }}>
              <ShieldCheck size={11} />
              <span>COMMUNITY GOVERNANCE L2</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#F8FAFC', marginTop: '6px', letterSpacing: '-0.01em' }}>
              Sub-Admin Console
            </div>
          </div>

          {/* Close button on mobile */}
          {isMobileOpen && (
            <button 
              onClick={onCloseMobile}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F8FAFC',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close Menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navSections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '18px' }}>
              <div style={{
                fontSize: '0.66rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#64748B',
                padding: '0 10px',
                marginBottom: '6px'
              }}>
                {section.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

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
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: isActive 
                          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.08) 100%)' 
                          : 'transparent',
                        border: isActive ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid transparent',
                        color: isActive ? '#34D399' : '#94A3B8',
                        fontSize: '0.84rem',
                        fontWeight: isActive ? '700' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.color = '#F8FAFC';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#94A3B8';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: isActive ? '#34D399' : item.color || '#94A3B8'
                        }}>
                          <Icon size={16} />
                        </div>
                        <span style={{ 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          fontSize: '0.83rem' 
                        }}>
                          {item.label}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        {item.count !== undefined && item.count > 0 && (
                          <span style={{
                            background: isActive ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                            color: isActive ? '#000000' : '#E2E8F0',
                            fontSize: '0.68rem',
                            fontWeight: '800',
                            padding: '1px 6px',
                            borderRadius: '12px',
                            minWidth: '18px',
                            textAlign: 'center'
                          }}>
                            {item.count}
                          </span>
                        )}

                        {item.badge && (!item.count || item.count === 0) && (
                          <span style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#94A3B8',
                            fontSize: '0.64rem',
                            fontWeight: '600',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links & Public Hub */}
        <div style={{
          padding: '10px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.15)'
        }}>
          <button
            onClick={onNavigatePublic}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#38BDF8';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ExternalLink size={13} />
              <span>Public Events Hub</span>
            </div>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Footer Sub-Admin User Card */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.85rem',
              flexShrink: 0
            }}>
              {commAdminUser?.displayName ? commAdminUser.displayName.charAt(0).toUpperCase() : 'C'}
            </div>

            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{
                color: '#F8FAFC',
                fontSize: '0.8rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {commAdminUser?.displayName || 'Community Admin'}
              </div>
              <div style={{
                color: '#64748B',
                fontSize: '0.68rem',
                fontFamily: 'monospace'
              }}>
                {commAdminUser?.cpcbGovernanceCode || commAdminUser?.id || 'CPCB-COMM-2026-L2'}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#F87171',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            title="Sign Out of Sub-Admin Console"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.color = '#F87171';
            }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  );
};
