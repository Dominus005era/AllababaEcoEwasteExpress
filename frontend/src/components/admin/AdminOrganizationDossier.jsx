import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { AdminWorkerRegistrationModal } from './AdminWorkerRegistrationModal';
import { 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Key, 
  Lock, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Plus, 
  Truck, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  ExternalLink,
  Trash2,
  Sliders,
  Calendar,
  X,
  GraduationCap,
  Briefcase,
  UserCheck,
  Clock,
  Unlock,
  ChevronRight
} from 'lucide-react';

export const AdminOrganizationDossier = ({ 
  organization, 
  onBack = () => {},
  onToggleApproval = () => {},
  onDeleteOrg = () => {},
  onWorkerAdded = () => {}
}) => {
  const [dossierData, setDossierData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  // Add Recycler Modal & Selected Worker Sub-View State
  const [showAddRecyclerModal, setShowAddRecyclerModal] = useState(false);
  const [selectedWorkerForDossier, setSelectedWorkerForDossier] = useState(null);
  const [showWorkerPassword, setShowWorkerPassword] = useState(false);
  const [copiedWorkerKey, setCopiedWorkerKey] = useState('');

  const fetchDossier = async () => {
    if (!organization?.id) return;
    setLoading(true);
    try {
      const res = await adminApi.getPartnerOrganizationDossier(organization.id);
      if (res.dossier) {
        setDossierData(res.dossier);
      }
    } catch (err) {
      console.error('Error loading organization dossier:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDossier();
  }, [organization?.id]);

  const org = dossierData?.organization || organization;
  const branches = dossierData?.branches || [];
  const recyclers = dossierData?.recyclers || [];

  const handleCopyPassword = () => {
    const pwd = org.raw_password || 'OrgAdmin@2026';
    navigator.clipboard.writeText(pwd);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleCopyPortalLink = () => {
    const link = `${window.location.origin}/org-admin`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWorkerText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedWorkerKey(key);
    setTimeout(() => setCopiedWorkerKey(''), 2000);
  };

  const handleToggleStatus = async () => {
    setIsApproving(true);
    try {
      await onToggleApproval(org.id, !org.is_approved);
      setDossierData(prev => prev ? {
        ...prev,
        organization: { ...prev.organization, is_approved: !prev.organization.is_approved }
      } : null);
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '16px',
        padding: '14px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onBack}
            className="btn btn-outline btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '10px',
              padding: '7px 14px',
              fontWeight: '700'
            }}
          >
            <ArrowLeft size={16} />
            <span>← Back to 605 Organizations Grid</span>
          </button>

          <div style={{ height: '20px', width: '1px', background: 'var(--border-color, #E2E8F0)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748B)', fontWeight: '700' }}>
              ORG ID:
            </span>
            <code style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
              {org.id}
            </code>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748B)', fontWeight: '700' }}>
              ORG CPCB LICENSE:
            </span>
            <code style={{ fontSize: '0.85rem', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
              {org.cpcb_license}
            </code>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleToggleStatus}
            disabled={isApproving}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: isApproving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: org.is_approved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: org.is_approved ? '#10B981' : '#EF4444',
              border: org.is_approved ? '1px solid #10B981' : '1px solid #EF4444'
            }}
          >
            {isApproving ? (
              <RefreshCw size={14} className="spin" />
            ) : org.is_approved ? (
              <>
                <CheckCircle2 size={14} />
                <span>Approved Partner</span>
              </>
            ) : (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                <span>Pending (Approve Organization)</span>
              </>
            )}
          </button>

          <button
            onClick={() => onDeleteOrg(org.id)}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#EF4444',
              cursor: 'pointer'
            }}
            title="Delete Organization"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '20px',
        padding: '28px',
        color: '#FFFFFF',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: org.is_approved ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                color: org.is_approved ? '#34D399' : '#FCA5A5',
                border: org.is_approved ? '1px solid #10B981' : '1px solid #EF4444',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {org.is_approved ? '✓ CPCB ACCREDITED & APPROVED' : '⚠ PENDING ADMINISTRATIVE VERIFICATION'}
              </span>

              <span style={{
                background: 'rgba(37, 99, 235, 0.25)',
                color: '#60A5FA',
                border: '1px solid #3B82F6',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '700'
              }}>
                {org.organization_type || 'CPCB-Authorized Industrial Smelter & Deep Recovery'}
              </span>
            </div>

            <h2 style={{ margin: '0 0 10px', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              {org.organization_name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.86rem', color: '#94A3B8', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#60A5FA" />
                {org.district ? `${org.district}, ` : ''}{org.state || 'Uttar Pradesh'}, India
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} color="#34D399" />
                {org.phone || '+91 97844 42065'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} color="#FCD34D" />
                {org.email || `admin.${org.id.toLowerCase()}@greenscape-eco.com`}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={15} color="#A78BFA" />
                Capacity: {org.capacity_mta ? `${Number(org.capacity_mta).toLocaleString()} MTA Capacity` : '50,000 MTA'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Master Profile & Sub-Admin Credentials */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Module 1: Managing Director / Head Identity */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '18px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                Organization Head &amp; Corporate Identity
              </h4>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
                Official CPCB enterprise contacts and physical location
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary, #64748B)' }}>Managing Director / Head:</span>
              <span style={{ fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                {org.contact_person || 'Alok Tripathi (Managing Director / Admin)'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary, #64748B)' }}>Corporate Hotline:</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary, #0F172A)' }}>
                {org.phone || '+91 97844 42065'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary, #64748B)' }}>Official Email:</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary, #0F172A)' }}>
                {org.email}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary, #64748B)' }}>Facility District &amp; State:</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary, #0F172A)' }}>
                {org.district || 'Prayagraj'}, {org.state || 'Uttar Pradesh'}
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-secondary, #64748B)', display: 'block', marginBottom: '4px' }}>Head Office Physical Address:</span>
              <div style={{ background: 'var(--bg-secondary, #F8FAFC)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.84rem', color: 'var(--text-primary, #1E293B)', border: '1px solid var(--border-color, #E2E8F0)' }}>
                {org.address || 'Plot 42-45, Phase 1, Naini Industrial Area, Prayagraj, UP, PIN: 211008'}
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: Organization Sub-Admin Credentials Box */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '18px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Key size={18} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                  Organization Sub-Admin Portal Credentials
                </h4>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
                  Access identity for Organization Portal management
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary, #64748B)' }}>Assigned Unique Organization ID:</span>
                <span style={{ fontWeight: '900', color: '#0284C7', fontFamily: 'monospace', background: '#E0F2FE', padding: '2px 8px', borderRadius: '6px' }}>
                  {org.id}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary, #64748B)' }}>Sub-Admin Username:</span>
                <span style={{ fontWeight: '800', color: 'var(--text-primary, #0F172A)', fontFamily: 'monospace', background: 'var(--bg-secondary, #F1F5F9)', padding: '2px 8px', borderRadius: '6px' }}>
                  {org.username || `admin_${org.id.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary, #64748B)' }}>Portal Login Email:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary, #0F172A)' }}>
                  {org.email}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary, #64748B)' }}>Access Clearance:</span>
                <span style={{ fontWeight: '800', color: '#2563EB', background: 'rgba(37, 99, 235, 0.1)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>
                  ORGANIZATION_SUB_ADMIN
                </span>
              </div>

              {/* Master Sub-Admin Password Box */}
              <div style={{
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border-color, #E2E8F0)',
                borderRadius: '12px',
                padding: '12px 14px',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-secondary, #64748B)', letterSpacing: '0.04em' }}>
                    CURRENT SUB-ADMIN PASSWORD (SYNCHRONIZED):
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #64748B)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: '700' }}
                  >
                    {showPassword ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Reveal</>}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '0.95rem', color: 'var(--text-primary, #0F172A)' }}>
                    {showPassword ? (org.raw_password || 'OrgAdmin@2026') : '••••••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '4px', borderRadius: '8px' }}
                  >
                    {copiedPassword ? (
                      <>
                        <Check size={12} color="#10B981" />
                        <span style={{ color: '#10B981' }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div style={{ fontSize: '0.7rem', color: '#047857', marginTop: '6px', fontStyle: 'italic' }}>
                  * Any password changed by the organization admin is automatically updated and visible here to the Supreme Main Admin.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Copy Link Button */}
          <button
            onClick={handleCopyPortalLink}
            style={{
              marginTop: '16px',
              padding: '11px',
              borderRadius: '12px',
              border: '1px solid #10B981',
              background: 'rgba(16, 185, 129, 0.08)',
              color: '#10B981',
              fontWeight: '800',
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            {copiedLink ? (
              <>
                <Check size={16} />
                <span>Copied Organization Portal URL!</span>
              </>
            ) : (
              <>
                <ExternalLink size={16} />
                <span>Copy Organization Portal Access URL (/org-admin)</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Module 3: Facility Branches & Depots */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                Facility Branches &amp; Collection Depots ({branches.length})
              </h4>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
                Active dock gates, scale facilities, and branch heads under this organization
              </div>
            </div>
          </div>
        </div>

        {branches.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748B', fontSize: '0.88rem' }}>
            No secondary branch gates registered yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
            {branches.map((b) => (
              <div
                key={b.id || b.branch_id}
                style={{
                  background: 'var(--bg-secondary, #F8FAFC)',
                  border: '1px solid var(--border-color, #E2E8F0)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#2563EB', background: '#EFF6FF', padding: '2px 6px', borderRadius: '4px' }}>
                      {b.branch_id || 'BR-01'}
                    </span>
                    <h5 style={{ margin: '4px 0 0', fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                      {b.branch_name}
                    </h5>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                    Active Dock
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #64748B)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div>Head: <strong style={{ color: 'var(--text-primary)' }}>{b.manager_name || 'Alok Tripathi'}</strong></div>
                  <div>Gate Scale: <strong>{b.dock_scale || 'Calibrated 50-Ton Digital Scale'}</strong></div>
                  <div>Contact: <strong>{b.phone || org.phone}</strong></div>
                  <div style={{ marginTop: '2px', color: 'var(--text-primary)' }}>{b.address}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Module 4: Registered Authorized Field Recyclers & Fleet (under this Org) */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        
        {selectedWorkerForDossier ? (
          /* IN-PLACE DETAILED WORKER DOSSIER & ANALYTICS SUB-VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Top Sub-Bar with Back Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--border-color, #E2E8F0)', paddingBottom: '14px' }}>
              <button
                onClick={() => setSelectedWorkerForDossier(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-secondary, #F1F5F9)',
                  border: '1px solid var(--border-color, #CBD5E1)',
                  borderRadius: '10px',
                  padding: '7px 14px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  color: 'var(--text-primary, #0F172A)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={15} />
                <span>← Back to Workers Roster ({recyclers.length})</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: '700' }}>WORKER CPCB CODE:</span>
                <span style={{ background: 'rgba(37, 99, 235, 0.12)', color: '#2563EB', fontWeight: '800', fontFamily: 'monospace', fontSize: '0.84rem', padding: '3px 8px', borderRadius: '6px' }}>
                  {selectedWorkerForDossier.cpcb_worker_id || selectedWorkerForDossier.cpcb_license}
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: '800', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
                  🟢 Active Personnel
                </span>
              </div>
            </div>

            {/* Worker Detail Hero Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    background: selectedWorkerForDossier.occupation_type === 'student' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                    color: selectedWorkerForDossier.occupation_type === 'student' ? '#60A5FA' : '#34D399'
                  }}>
                    {selectedWorkerForDossier.occupation_type === 'student' ? `🎓 Student Worker (${selectedWorkerForDossier.academic_year || '1st Year'})` : '💼 Professional Recycler'}
                  </span>
                  <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>ID: {selectedWorkerForDossier.id}</span>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: '900', color: '#FFFFFF' }}>
                  {selectedWorkerForDossier.display_name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Role: <strong style={{ color: '#E2E8F0' }}>{selectedWorkerForDossier.role_designation || 'Certified Field Recycler'}</strong> • Hub: <strong style={{ color: '#E2E8F0' }}>{selectedWorkerForDossier.assigned_branch_name || selectedWorkerForDossier.district}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase' }}>Weekly Work Cap</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#10B981', marginTop: '2px' }}>
                  {selectedWorkerForDossier.working_hours_tier || 'Tier 1 (2-4 hrs/wk)'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Max {selectedWorkerForDossier.weekly_hours_cap || 4}h/wk Limit</div>
              </div>
            </div>

            {/* Worker Credential & Profile Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              
              {/* Credentials Box */}
              <div style={{ background: 'var(--bg-secondary, #F8FAFC)', borderRadius: '14px', padding: '16px', border: '1px solid var(--border-color, #E2E8F0)' }}>
                <h5 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={15} color="#10B981" /> Corporate Login Credentials
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Corporate Email:</span>
                    <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{selectedWorkerForDossier.corporate_email || selectedWorkerForDossier.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Phone:</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedWorkerForDossier.personal_phone || selectedWorkerForDossier.phone}</span>
                  </div>
                  
                  {/* Password Box */}
                  <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '8px 12px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#DC2626' }}>PORTAL PASSWORD:</span>
                      <button onClick={() => setShowWorkerPassword(!showWorkerPassword)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>
                        {showWorkerPassword ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#991B1B', fontSize: '0.86rem' }}>
                        {showWorkerPassword ? (selectedWorkerForDossier.raw_password || 'Recycler@2026') : '••••••••••••••••'}
                      </span>
                      <button onClick={() => handleCopyWorkerText(selectedWorkerForDossier.raw_password || 'Recycler@2026', 'pw')} style={{ border: 'none', background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800', color: '#DC2626' }}>
                        {copiedWorkerKey === 'pw' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic or Fleet Info */}
              {selectedWorkerForDossier.occupation_type === 'student' ? (
                <div style={{ background: 'rgba(37, 99, 235, 0.04)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
                  <h5 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: '800', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GraduationCap size={16} color="#2563EB" /> Academic Protection Info
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>College:</span>
                      <span style={{ fontWeight: '800', color: '#1E40AF' }}>{selectedWorkerForDossier.college_name || 'NIT Allahabad'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Program:</span>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedWorkerForDossier.degree_program || 'B.Tech Environmental Eng.'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Year & Sem:</span>
                      <span style={{ fontWeight: '800', color: '#2563EB' }}>{selectedWorkerForDossier.academic_year || '1st Year'} • {selectedWorkerForDossier.semester || 'Semester 1'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Student ID:</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{selectedWorkerForDossier.student_id_number || 'STU-2024'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--bg-secondary, #F8FAFC)', borderRadius: '14px', padding: '16px', border: '1px solid var(--border-color, #E2E8F0)' }}>
                  <h5 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Truck size={16} color="#F59E0B" /> Fleet & Logistics Assignment
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Vehicle:</span>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{selectedWorkerForDossier.vehicle_number || 'UP-70-AB-1042'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Vehicle Type:</span>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedWorkerForDossier.vehicle_type || 'Electric E-Cargo Mini-Truck'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Shift:</span>
                      <span style={{ fontWeight: '700', color: '#10B981' }}>09:00 - 18:00 IST</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* WORKERS LIST / CARDS VIEW */
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                    Authorized Field Recyclers &amp; Personnel ({recyclers.length})
                  </h4>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
                    Personnel registered under {org.organization_name} with CPCB accreditation codes
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAddRecyclerModal(true)}
                className="btn btn-primary btn-sm"
                style={{
                  borderRadius: '10px',
                  padding: '7px 14px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={15} />
                <span>+ Add Field Recycler under Org</span>
              </button>
            </div>

            {recyclers.length === 0 ? (
              <div style={{
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px dashed var(--border-color, #CBD5E1)',
                borderRadius: '14px',
                padding: '36px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary, #64748B)'
              }}>
                <Truck size={36} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
                <h5 style={{ margin: '0 0 6px', fontSize: '1rem', color: 'var(--text-primary, #0F172A)' }}>
                  No Field Recyclers Added by this Organization Yet
                </h5>
                <p style={{ margin: '0 auto 14px', fontSize: '0.84rem', maxWidth: '460px', color: 'var(--text-secondary, #64748B)' }}>
                  The Organization Sub-Admin can add collection drivers, technicians, and part-time student workers via their Organization Portal.
                </p>
                <button
                  onClick={() => setShowAddRecyclerModal(true)}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '10px' }}
                >
                  + Register First Field Recycler
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '14px' }}>
                {recyclers.map((r) => {
                  const isRecStudent = r.occupation_type === 'student';
                  return (
                    <div
                      key={r.id}
                      style={{
                        background: 'var(--bg-secondary, #F8FAFC)',
                        border: '1px solid var(--border-color, #E2E8F0)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: isRecStudent ? 'rgba(37, 99, 235, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: isRecStudent ? '#2563EB' : '#10B981',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isRecStudent ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                            {isRecStudent ? `Student (${r.academic_year || '1st Yr'})` : 'Worker'}
                          </span>
                          <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                            ⭐ {r.rating || 4.9}
                          </span>
                        </div>

                        <h5 style={{ margin: '0 0 2px', fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
                          {r.display_name || 'Field Recycler'}
                        </h5>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary, #64748B)', marginBottom: '8px' }}>
                          {r.role_designation || 'Certified Field Recycler'}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #475569)', display: 'flex', flexDirection: 'column', gap: '3px', background: 'var(--bg-card, #FFFFFF)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color, #E2E8F0)' }}>
                          <div>CPCB Code: <strong style={{ color: '#2563EB', fontFamily: 'monospace' }}>{r.cpcb_worker_id || r.cpcb_license}</strong></div>
                          <div>Corp Email: <strong style={{ color: 'var(--text-primary)' }}>{r.corporate_email || r.email}</strong></div>
                          <div>Work Cap: <strong style={{ color: '#10B981' }}>{r.working_hours_tier || 'Tier 1 (2-4 hrs/wk)'}</strong></div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedWorkerForDossier(r)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #10B981',
                          background: 'rgba(16, 185, 129, 0.08)',
                          color: '#10B981',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Inspect Worker Dossier</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Module 5: Layer 3 Scrap Metal Buying Rates & Pricing Specs */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary, #0F172A)' }}>
              Layer 3 EPR Material Pricing &amp; Smelter Scrap Multipliers
            </h4>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
              Regional material buying quotes and condition coefficients offered by {org.organization_name}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: '700' }}>Smartphones &amp; Mobiles</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#10B981', margin: '4px 0' }}>₹1,450 - ₹5,200</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #64748B)' }}>Multiplier: 1.15x</div>
          </div>

          <div style={{ background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: '700' }}>Laptops &amp; MacBooks</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#2563EB', margin: '4px 0' }}>₹3,800 - ₹19,500</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #64748B)' }}>Multiplier: 1.20x</div>
          </div>

          <div style={{ background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: '700' }}>Server PCBs &amp; Telecom</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#8B5CF6', margin: '4px 0' }}>₹8,500 - ₹42,000</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #64748B)' }}>Multiplier: 1.35x</div>
          </div>

          <div style={{ background: 'var(--bg-secondary, #F8FAFC)', border: '1px solid var(--border-color, #E2E8F0)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: '700' }}>Lithium EV / UPS Battery</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#F59E0B', margin: '4px 0' }}>₹3,200 - ₹24,000</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #64748B)' }}>Multiplier: 1.25x</div>
          </div>
        </div>
      </div>

      {/* Interactive Worker Registration Modal */}
      <AdminWorkerRegistrationModal
        isOpen={showAddRecyclerModal}
        onClose={() => setShowAddRecyclerModal(false)}
        org={org}
        branches={branches}
        onWorkerAdded={(w) => {
          fetchDossier();
          onWorkerAdded(w);
        }}
      />

    </div>
  );
};
