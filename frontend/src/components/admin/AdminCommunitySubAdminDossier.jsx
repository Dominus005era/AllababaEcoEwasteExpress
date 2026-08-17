import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Lock,
  Unlock,
  Key,
  Copy,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  ExternalLink,
  Eye,
  EyeOff,
  Ticket,
  Sparkles,
  Trash2,
  Power,
  Edit3,
  Search
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminCommunitySubAdminDossier = ({
  adminId,
  onBack,
  onOpenEditEvent,
  onDeleteAdmin
}) => {
  const [loading, setLoading] = useState(true);
  const [dossierData, setDossierData] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const [statusToggling, setStatusToggling] = useState(false);
  const [attendeeSearchQuery, setAttendeeSearchQuery] = useState('');

  const fetchDossier = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getSubAdminDossier(adminId);
      if (res.success && (res.dossier || res.admin)) {
        setDossierData(res.dossier || {
          admin: res.admin,
          events: res.events || [],
          registrations: res.registrations || [],
          stats: {
            totalEvents: (res.events || []).length,
            totalAttendees: (res.registrations || []).length,
            totalCapacity: (res.events || []).reduce((s, e) => s + (e.max_participants || 0), 0),
            estimatedCo2Kg: ((res.registrations || []).length * 12.5).toFixed(1)
          }
        });
      } else {
        setError(res.error || 'Failed to retrieve Community Sub-Admin Dossier.');
      }
    } catch (err) {
      console.error('Error fetching community sub-admin dossier:', err);
      setError(err.message || 'Network error fetching sub-admin dossier.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminId) {
      fetchDossier();
    }
  }, [adminId]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  const handleToggleStatus = async () => {
    try {
      setStatusToggling(true);
      const res = await adminApi.toggleSubAdminStatus(adminId);
      if (res.success) {
        setDossierData(prev => ({
          ...prev,
          admin: {
            ...prev.admin,
            isActive: res.isActive
          }
        }));
      }
    } catch (err) {
      console.error('Error toggling sub-admin status:', err);
      alert('Failed to update Sub-Admin status.');
    } finally {
      setStatusToggling(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '60px 20px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <RefreshCw size={32} className="spin" color="#8B5CF6" style={{ margin: '0 auto 16px' }} />
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          Retrieving Community Sub-Admin Intelligence & Host Dossier...
        </h4>
      </div>
    );
  }

  if (error || !dossierData) {
    return (
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid #FCA5A5',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <AlertTriangle size={36} color="#EF4444" style={{ margin: '0 auto 12px' }} />
        <h4 style={{ margin: '0 0 6px', color: '#EF4444', fontWeight: '800' }}>
          Error Loading Sub-Admin Dossier
        </h4>
        <p style={{ margin: '0 auto 20px', color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '420px' }}>
          {error || 'The requested Community Sub-Admin profile could not be loaded.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn btn-outline btn-sm">
            ← Back to Sub-Admins Grid
          </button>
          <button onClick={fetchDossier} className="btn btn-primary btn-sm">
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      </div>
    );
  }

  const { admin, events = [], registrations = [], stats = {} } = dossierData;
  const isActive = admin.isActive !== false;

  const filteredRegistrations = registrations.filter(reg => {
    if (!attendeeSearchQuery.trim()) return true;
    const q = attendeeSearchQuery.toLowerCase();
    return (
      (reg.user_name && reg.user_name.toLowerCase().includes(q)) ||
      (reg.user_email && reg.user_email.toLowerCase().includes(q)) ||
      (reg.ticket_number && reg.ticket_number.toLowerCase().includes(q)) ||
      (reg.college_or_organization && reg.college_or_organization.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. TOP BREADCRUMB & CONTEXT BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        background: 'var(--bg-card, #FFFFFF)',
        padding: '14px 20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color, #E2E8F0)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onBack}
            className="btn btn-outline btn-sm"
            id="btn-back-to-subadmins-grid"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '10px', fontWeight: '800' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Community Sub-Admins Grid</span>
          </button>

          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>|</span>

          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            background: 'rgba(139, 92, 246, 0.1)',
            color: '#8B5CF6',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: '800'
          }}>
            SUB-ADMIN ID: {admin.id}
          </span>

          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            background: 'rgba(59, 130, 246, 0.1)',
            color: '#2563EB',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: '700'
          }}>
            GOVERNANCE CODE: {admin.cpcbGovernanceCode || admin.cpcb_governance_code || `CPCB-COMM-2026-GOV-${admin.id.split('-').pop() || '01'}`}
          </span>

          <span style={{
            fontSize: '0.76rem',
            fontWeight: '800',
            padding: '4px 10px',
            borderRadius: '8px',
            background: !admin.isFirstLoginCompleted
              ? 'rgba(245, 158, 11, 0.15)'
              : isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: !admin.isFirstLoginCompleted
              ? '#F59E0B'
              : isActive ? '#10B981' : '#EF4444',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: !admin.isFirstLoginCompleted ? '#F59E0B' : isActive ? '#10B981' : '#EF4444'
            }}></span>
            {!admin.isFirstLoginCompleted
              ? 'Pending First-Time Login'
              : isActive ? 'Active Duty & Authorized Host' : 'Account Suspended'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleToggleStatus}
            disabled={statusToggling}
            className="btn btn-outline btn-sm"
            style={{
              borderRadius: '10px',
              fontSize: '0.78rem',
              borderColor: isActive ? 'rgba(239, 68, 68, 0.35)' : 'rgba(16, 185, 129, 0.35)',
              color: isActive ? '#EF4444' : '#10B981'
            }}
          >
            <Power size={13} />
            <span>{statusToggling ? 'Updating...' : isActive ? 'Suspend Access' : 'Activate Sub-Admin'}</span>
          </button>

          {onDeleteAdmin && (
            <button
              onClick={() => onDeleteAdmin(admin.id, admin.displayName)}
              className="btn btn-outline btn-sm"
              style={{
                borderRadius: '10px',
                fontSize: '0.78rem',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                color: '#EF4444'
              }}
              title="Permanently remove Sub-Admin"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. HERO IDENTITY & COMMUNITY GOVERNANCE BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '24px',
        padding: '30px 32px',
        color: '#FFFFFF',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)',
              flexShrink: 0
            }}>
              <Users size={32} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(139, 92, 246, 0.25)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  color: '#C4B5FD',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}>
                  LEVEL-3 COMMUNITY SUB-ADMIN
                </span>

                <span style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '700'
                }}>
                  CPCB Certified Host
                </span>
              </div>

              <h2 style={{ margin: '0 0 6px', fontSize: '1.75rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {admin.displayName}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.86rem', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={14} color="#8B5CF6" /> {admin.institutionName || admin.institution_name || 'National Green Campus Network'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={14} color="#10B981" /> {admin.territoryDistrict || admin.territory_district || 'Prayagraj Hub'}, {admin.territoryState || admin.territory_state || 'Uttar Pradesh'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={14} color="#3B82F6" /> {admin.email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Portal Action */}
          <div>
            <button
              onClick={() => copyToClipboard(`${window.location.origin}/community-admin`, 'top_portal')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)'
              }}
            >
              {copiedKey === 'top_portal' ? (
                <>✓ Portal URL Copied!</>
              ) : (
                <>
                  <ExternalLink size={14} />
                  <span>Sub-Admin Portal (/community-admin)</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* 4-Card Analytics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>Hosted Community Events</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#FFFFFF', marginTop: '4px' }}>
              {stats.totalEvents || events.length} <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '700' }}>Active Drives</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>Total Registered Attendees</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#8B5CF6', marginTop: '4px' }}>
              {stats.totalAttendees || registrations.length} <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>Passes</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>Participant Capacity</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#38BDF8', marginTop: '4px' }}>
              {stats.totalCapacity || 1200}+ <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>Capacity</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>Estimated E-Waste Impact</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#34D399', marginTop: '4px' }}>
              {stats.estimatedCo2Kg || '240.0'} <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>kg CO2e</span>
            </div>
          </div>
        </div>

        {/* First-Login Lifecycle Status Banner */}
        <div style={{
          marginTop: '16px',
          padding: '12px 18px',
          borderRadius: '12px',
          background: !admin.isFirstLoginCompleted ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          border: `1px solid ${!admin.isFirstLoginCompleted ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.84rem',
          color: !admin.isFirstLoginCompleted ? '#FBBF24' : '#34D399'
        }}>
          {!admin.isFirstLoginCompleted ? (
            <>
              <Clock size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Pending First-Time Login Verification:</strong> Credentials have been generated and issued to this host. Once they log in to the Community Admin Portal (<code>/community-admin</code>), their verification status will automatically transition to "Verified &amp; Active Duty".
              </div>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>First-Time Login Verified:</strong> Host authenticated successfully on {admin.firstLoginAt ? new Date(admin.firstLoginAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified Date'} and has actively claimed administrative governance over assigned community events.
              </div>
            </>
          )}
        </div>

      </div>

      {/* 3. DUAL INTELLIGENCE MODULES: CREDENTIALS & CAMPUS JURISDICTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Module 1: Sub-Admin Authentication Credentials */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '18px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Key size={20} color="#8B5CF6" />
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Sub-Admin Authentication Credentials
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Fixed Unique Sub-Admin ID:</span>
                <span style={{ fontWeight: '900', color: '#0284C7', fontFamily: 'monospace', background: '#E0F2FE', padding: '2px 8px', borderRadius: '6px' }}>{admin.id}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Login Username:</span>
                <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'monospace' }}>@{admin.username}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Official Login Email:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{admin.email}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Contact Phone:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{admin.phone || '+91 98100 23456'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Governance Clearance:</span>
                <span style={{ fontWeight: '800', color: '#8B5CF6' }}>LEVEL_3_COMMUNITY_GOVERNANCE</span>
              </div>

              {/* Password Box */}
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '12px',
                padding: '12px 14px',
                marginTop: '6px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '800', color: '#991B1B', textTransform: 'uppercase' }}>
                    CURRENT ACTIVE PASSWORD (SYNCHRONIZED):
                  </label>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#DC2626', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {showPassword ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Reveal</>}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: '800', fontSize: '0.92rem', color: '#0F172A' }}>
                    {showPassword ? (admin.rawPassword || 'EcoCommunity@2026') : '••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(admin.rawPassword || 'EcoCommunity@2026', 'sub_pass')}
                    style={{
                      border: 'none',
                      background: '#FFFFFF',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      color: '#DC2626',
                      fontWeight: '800',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    {copiedKey === 'sub_pass' ? '✓ Copied' : <><Copy size={12} /> Copy</>}
                  </button>
                </div>

                <div style={{ fontSize: '0.7rem', color: '#B91C1C', marginTop: '6px', fontStyle: 'italic' }}>
                  * Any password changed by the sub-admin is automatically updated and visible here to the Supreme Main Admin.
                </div>
              </div>

            </div>
          </div>

          <button
            onClick={() => copyToClipboard(`${window.location.origin}/community-admin`, 'portal_btm')}
            style={{
              marginTop: '16px',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #8B5CF6',
              background: 'rgba(139, 92, 246, 0.08)',
              color: '#8B5CF6',
              fontWeight: '800',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {copiedKey === 'portal_btm' ? '✓ Community Portal URL Copied!' : <><ExternalLink size={14} /> Copy Community Portal URL (/community-admin)</>}
          </button>
        </div>

        {/* Module 2: Campus & Territory Jurisdiction */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '18px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Building2 size={20} color="#10B981" />
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Campus Base &amp; Territorial Jurisdiction
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Host Institution:</span>
                <span style={{ fontWeight: '800', color: '#1E40AF' }}>{admin.institutionName || admin.institution_name || 'EcoTrace National Green Campus Initiative'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>District &amp; State:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{admin.territoryDistrict || admin.territory_district || 'Prayagraj'}, {admin.territoryState || admin.territory_state || 'Uttar Pradesh'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Event Hosting Rights:</span>
                <span style={{ fontWeight: '800', color: '#10B981' }}>Full Authority (Campus &amp; Public Drives)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pass Verification Authority:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>QR Scanner &amp; Real-time Check-in</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginTop: '16px',
            fontSize: '0.8rem',
            color: '#065F46',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Institutional Governance Clearance:</strong> This Sub-Admin holds verified authority to conduct on-ground recycling drives, collect institutional e-waste batches, and issue certified attendance badges under CPCB compliance guidelines.
            </div>
          </div>
        </div>

      </div>

      {/* 4. MODULE 3: HOSTED COMMUNITY DRIVES & EVENTS PERFORMANCE */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Calendar size={20} color="#8B5CF6" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Governed Community Events &amp; Green Drives ({events.length})
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Real-time schedule of workshops, campus drives, and hackathons governed under this Sub-Admin's jurisdiction.
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'var(--bg-secondary, #F8FAFC)',
            borderRadius: '14px',
            color: 'var(--text-secondary)'
          }}>
            <Calendar size={36} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
            <h5 style={{ margin: '0 0 4px', fontSize: '1rem', color: 'var(--text-primary)' }}>
              No Events Assigned to this Sub-Admin Yet
            </h5>
            <p style={{ margin: 0, fontSize: '0.82rem' }}>
              Create or assign a community event to this sub-admin from the Community Events tab.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {events.map(ev => (
              <div key={ev.id} style={{
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border-color, #E2E8F0)',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      color: '#8B5CF6'
                    }}>
                      {ev.category || 'Campus Drive'}
                    </span>

                    <span style={{
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      color: 'var(--text-muted)'
                    }}>
                      {ev.id}
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {ev.title}
                  </h4>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>📍 <strong>Venue:</strong> {ev.venue_location || ev.organization_name}</div>
                    <div>📅 <strong>Dates:</strong> {ev.start_date || 'Upcoming'} {ev.end_date ? `to ${ev.end_date}` : ''}</div>
                    <div>👥 <strong>Registrations:</strong> <strong>{ev.current_participants || 0}</strong> / {ev.max_participants || 500} capacity</div>
                    {ev.prize_pool && <div>🏆 <strong>Grant / Award:</strong> {ev.prize_pool}</div>}
                  </div>
                </div>

                {onOpenEditEvent && (
                  <button
                    onClick={() => onOpenEditEvent(ev)}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.8rem', borderRadius: '8px' }}
                  >
                    <Edit3 size={13} />
                    <span>Edit Event Details</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. MODULE 4: PARTICIPANT PASSES & TICKET ROSTER */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Ticket size={20} color="#10B981" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Registered Participant Passes ({registrations.length})
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Live attendee rosters and pass codes across all events under this Sub-Admin.
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by attendee, ticket, college..."
              value={attendeeSearchQuery}
              onChange={e => setAttendeeSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '10px',
                border: '1px solid var(--border-color, #CBD5E1)',
                fontSize: '0.82rem',
                boxSizing: 'border-box',
                background: 'var(--bg-card)'
              }}
            />
          </div>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '36px 20px',
            background: 'var(--bg-secondary, #F8FAFC)',
            borderRadius: '14px',
            color: 'var(--text-secondary)',
            fontSize: '0.86rem'
          }}>
            {attendeeSearchQuery ? 'No attendees match your search query.' : 'No participants registered yet for this sub-admin’s events.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
            {filteredRegistrations.map(reg => (
              <div key={reg.id} style={{
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border-color, #E2E8F0)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{reg.user_name}</span>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#059669',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {reg.ticket_number || `ECO-PASS-${reg.id.split('-')[2] || 'XXXX'}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    🏫 {reg.college_or_organization} • 📧 {reg.user_email || 'attendee@campus.edu'} • 🎯 Role: <strong>{reg.role || 'Participant'}</strong>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: reg.status === 'approved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: reg.status === 'approved' ? '#10B981' : '#D97706'
                }}>
                  {reg.status || 'Confirmed'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
