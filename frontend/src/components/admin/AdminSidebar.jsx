import React from 'react';
import { 
  Sparkles, 
  Database, 
  Truck, 
  FileText, 
  AlertCircle, 
  Flame, 
  Building2, 
  Users, 
  Package, 
  Activity, 
  ShieldCheck, 
  Lock, 
  Settings, 
  Calendar,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

export const AdminSidebar = ({ 
  activeTab, 
  onSelectTab, 
  grievancesCount = 0, 
  partnersCount = 0, 
  eventsCount = 0, 
  subAdminsCount = 0,
  isMobileOpen = false,
  onCloseMobile = () => {},
  onLogout = () => {}
}) => {
  const navSections = [
    {
      title: 'CORE INTELLIGENCE & ASSETS',
      items: [
        { id: 'scans', label: 'AI Hardware Scans', icon: Sparkles, badge: 'Yellow Matrix', color: '#F59E0B' },
        { id: 'datasets', label: '4-Layer Datasets & Pricing', icon: Database, badge: 'CPCB Archetypes', color: '#38BDF8' },
        { id: 'depot_lots', label: 'Depot Consignments', icon: Truck, badge: 'Dock Clearance', color: '#34D399' },
        { id: 'dpp', label: 'DPP Circular Passports', icon: FileText, badge: 'EU & CPCB', color: '#C084FC' }
      ]
    },
    {
      title: 'COMMUNITY & DISPUTES',
      items: [
        { id: 'grievances', label: 'Disputes & Grievances', icon: AlertCircle, count: grievancesCount, color: '#F87171' },
        { id: 'events', label: 'Community Events', icon: Flame, count: eventsCount, color: '#FB923C' },
        { id: 'proposals', label: 'Host Proposals', icon: Calendar, badge: 'Review', color: '#FACC15' },
        { id: 'subadmins', label: 'Community Sub-Admins', icon: ShieldCheck, count: subAdminsCount, color: '#22D3EE' }
      ]
    },
    {
      title: 'ECOSYSTEM REGISTRY',
      items: [
        { id: 'partners', label: 'Partner Organizations', icon: Building2, count: partnersCount || 605, badge: '605 Orgs', color: '#4ADE80' },
        { id: 'donors', label: 'Donors & Deliveries', icon: Users, color: '#60A5FA' },
        { id: 'recyclers', label: 'Authorized Recyclers', icon: Building2, color: '#A78BFA' },
        { id: 'pickups', label: 'Pickup Logistics Orders', icon: Package, color: '#F472B6' }
      ]
    },
    {
      title: 'ROOT PLATFORM GOVERNANCE',
      items: [
        { id: 'stats', label: 'Diagnostics & Telemetry', icon: Activity, badge: 'Live Ping', color: '#34D399' },
        { id: 'admin-settings', label: 'Admin Security & Keys', icon: Settings, badge: 'Clearance L5', color: '#EF4444' }
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

      {/* Main Sidebar Container with Rich Colorful Navy Palette */}
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
          position: isMobileOpen ? 'fixed' : 'relative',
          top: isMobileOpen ? 0 : undefined,
          left: isMobileOpen ? 0 : undefined,
          bottom: isMobileOpen ? 0 : undefined,
          flexShrink: 0,
          zIndex: isMobileOpen ? 1001 : 10,
          overflowY: 'auto',
          transform: isMobileOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.25)',
          userSelect: 'none'
        }}
        className={`admin-sidebar ${isMobileOpen ? 'open' : ''}`}
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
              background: 'rgba(239, 68, 68, 0.18)', 
              color: '#F87171', 
              border: '1px solid rgba(239, 68, 68, 0.35)',
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
              <span>LEVEL-5 ROOT CONTROL</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#F8FAFC', marginTop: '6px', letterSpacing: '-0.01em' }}>
              Supreme Admin Console
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

        {/* Navigation Categories */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {navSections.map((section) => (
            <div key={section.title}>
              <div style={{
                fontSize: '0.66rem',
                fontWeight: '800',
                color: '#64748B',
                letterSpacing: '0.09em',
                padding: '0 10px 8px',
                textTransform: 'uppercase'
              }}>
                {section.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      id={`admin-nav-${item.id}`}
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
                        border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                        background: isActive 
                          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.08) 100%)' 
                          : 'transparent',
                        color: isActive ? '#34D399' : '#CBD5E1',
                        fontWeight: isActive ? '700' : '500',
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxSizing: 'border-box',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#CBD5E1';
                        }
                      }}
                    >
                      {/* Left Active Glow Indicator */}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '18%',
                          bottom: '18%',
                          width: '3px',
                          background: '#10B981',
                          borderRadius: '0 4px 4px 0',
                          boxShadow: '0 0 8px #10B981'
                        }} />
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '7px',
                          background: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon 
                            size={15} 
                            color={isActive ? '#34D399' : item.color || '#94A3B8'} 
                          />
                        </div>
                        <span style={{ 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          lineHeight: '1.2' 
                        }}>
                          {item.label}
                        </span>
                      </div>

                      {/* Right Badges / Counters */}
                      <div style={{ flexShrink: 0, marginLeft: '6px' }}>
                        {item.count !== undefined && item.count > 0 && (
                          <span style={{
                            background: item.id === 'grievances' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                            color: item.id === 'grievances' ? '#FCA5A5' : '#6EE7B7',
                            border: `1px solid ${item.id === 'grievances' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                            padding: '2px 7px',
                            borderRadius: '10px',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            fontFamily: 'monospace'
                          }}>
                            {item.count}
                          </span>
                        )}

                        {item.badge && (!item.count || item.count === 0) && (
                          <span style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#94A3B8',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            fontSize: '0.66rem',
                            fontWeight: '600'
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

        {/* Sidebar Footer: System Status */}
        <div style={{
          padding: '14px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }} />
            <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: '600' }}>
              CPCB Node Connected
            </span>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#F87171',
              fontSize: '0.74rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 6px',
              borderRadius: '6px'
            }}
            title="Lock Console and Return to Company Page"
          >
            <Lock size={12} />
            <span>Lock</span>
          </button>
        </div>
      </aside>
    </>
  );
};
