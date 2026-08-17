import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Sparkles,
  Key,
  Lock,
  Award,
  CheckCircle2,
  AlertCircle,
  Users,
  ExternalLink
} from 'lucide-react';

export const AdminProposalVerificationModal = ({
  proposal,
  onClose,
  onApprove,
  approving
}) => {
  if (!proposal) return null;

  const isExisting = Boolean(proposal.isExistingSubAdmin);
  const isDelegatedCampusProposal = Boolean(
    proposal.assigned_community_admin_id || 
    proposal.assignedCommunityAdminId || 
    proposal.community_admin_endorsed_by ||
    proposal.communityAdminEndorsedBy
  );
  const endorsingAdminName = proposal.community_admin_endorsed_by || proposal.communityAdminEndorsedBy || proposal.assigned_community_admin_id || proposal.assignedCommunityAdminId || '';

  const cleanName = (proposal.proposerName || proposal.proposer_name || 'lead').toLowerCase().replace(/[^a-z0-9]/g, '');
  const randPin = Math.floor(1000 + Math.random() * 9000);

  const [formData, setFormData] = useState({
    displayName: proposal.proposerName || proposal.proposer_name || '',
    institutionName: proposal.institutionName || proposal.institution_name || 'Academic Institution / Chapter',
    territoryDistrict: 'Prayagraj Hub',
    territoryState: 'Uttar Pradesh',
    phone: proposal.proposerPhone || proposal.proposer_phone || '+91 98100 23456',
    roleDesignation: isDelegatedCampusProposal ? `Campus Event Lead (Under @${endorsingAdminName})` : (isExisting ? 'Accredited Community Sub-Admin' : 'Institutional Campus Lead & Event Host'),
    eventTitle: proposal.proposedTitle || proposal.proposed_title || '',
    eventCategory: proposal.proposedCategory || proposal.proposed_category || 'Campus E-Waste Drive',
    eventDates: proposal.proposedDates || proposal.proposed_dates || 'Upcoming',
    eventVenue: proposal.proposedVenue || proposal.proposed_venue || proposal.institutionName || proposal.institution_name || 'Campus Main Grounds',
    expectedParticipants: proposal.expectedParticipants || proposal.expected_participants || 250,
    prizePool: '₹1,00,000 Green Campus Grant',
    customUsername: isExisting ? proposal.existingSubAdminDetails?.username : `host_${cleanName}_${randPin}`,
    customEmail: proposal.proposerEmail || proposal.proposer_email || `host_${cleanName}_${randPin}@ecotrace.org`,
    customPassword: `EcoHost#${randPin}!`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onApprove(proposal.id, formData);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                {isDelegatedCampusProposal ? 'Delegated Campus Proposal' : (isExisting ? 'Sub-Admin Expansion' : 'New Sub-Admin Minting')}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                Ref: {proposal.id}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Authorize Host Proposal &amp; Publish Live Event
            </h3>
          </div>

          <button
            onClick={onClose}
            disabled={approving}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Security & Proposer Origin Status Card */}
          <div style={{
            background: isDelegatedCampusProposal 
              ? 'rgba(59, 130, 246, 0.08)' 
              : (isExisting ? 'rgba(139, 92, 246, 0.08)' : 'rgba(16, 185, 129, 0.08)'),
            border: `1px solid ${isDelegatedCampusProposal ? 'rgba(59, 130, 246, 0.3)' : (isExisting ? 'rgba(139, 92, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)')}`,
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            {isDelegatedCampusProposal ? (
              <ShieldCheck size={24} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : isExisting ? (
              <ShieldCheck size={24} color="#8B5CF6" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <User size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: '0.92rem', color: isDelegatedCampusProposal ? '#1D4ED8' : (isExisting ? '#7C3AED' : '#059669') }}>
                  {isDelegatedCampusProposal 
                    ? `Endorsed by Local Community Sub-Admin (@${endorsingAdminName})`
                    : (isExisting ? 'Accredited Community Sub-Admin Identified' : 'First-Time Host Applicant Verification')}
                </strong>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: isDelegatedCampusProposal ? '#2563EB' : (isExisting ? '#8B5CF6' : '#10B981'),
                  color: '#FFFFFF'
                }}>
                  {isDelegatedCampusProposal ? '🏛️ Local Campus Chapter Link' : `Origin: ${proposal.proposerUserType === 'recycler' ? '♻️ Certified Recycler' : '👤 E-Waste Donor'}`}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {isDelegatedCampusProposal
                  ? `Requester ${proposal.proposerName || proposal.proposer_name} requested hosting under Community Sub-Admin @${endorsingAdminName}. Authorizing will publish the event live attached to this Sub-Admin without generating new credentials.`
                  : isExisting
                    ? `Proposer ${proposal.proposerName} is already a verified Community Sub-Admin (@${proposal.existingSubAdminDetails?.username}). Authorizing will attach this event to their existing governance profile.`
                    : `Proposer ${proposal.proposerName} is a ${proposal.proposerUserType || 'donor'}. Approving will mint new Sub-Admin credentials and mark their account as "Pending First-Time Login" until they authenticate.`}
              </p>
            </div>
          </div>

          {/* Section 1: Host Legal Identity & Institution */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', margin: '0 0 12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              1. Host Personnel &amp; Campus Identification
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Host Academic Institution / Base *
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Official Email Address *
                </label>
                <input
                  type="email"
                  value={formData.customEmail}
                  onChange={e => setFormData({ ...formData, customEmail: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Event Details & Verification */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', margin: '0 0 12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              2. Event Scope &amp; Circular Drive Verification
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Approved Event Title *
                </label>
                <input
                  type="text"
                  value={formData.eventTitle}
                  onChange={e => setFormData({ ...formData, eventTitle: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Event Category *
                </label>
                <select
                  value={formData.eventCategory}
                  onChange={e => setFormData({ ...formData, eventCategory: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                >
                  <option value="Campus E-Waste Drive">Campus E-Waste Drive</option>
                  <option value="Hardware Hackathon">Hardware Hackathon</option>
                  <option value="Zero-Landfill Workshop">Zero-Landfill Workshop</option>
                  <option value="GreenTech & Circular Innovation">GreenTech &amp; Circular Innovation</option>
                  <option value="Logistics & AI Algorithms">Logistics &amp; AI Algorithms</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Scheduled Dates *
                </label>
                <input
                  type="text"
                  value={formData.eventDates}
                  onChange={e => setFormData({ ...formData, eventDates: e.target.value })}
                  required
                  placeholder="e.g. Sept 15, 2026 to Sept 18, 2026"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Venue Location *
                </label>
                <input
                  type="text"
                  value={formData.eventVenue}
                  onChange={e => setFormData({ ...formData, eventVenue: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Target Participant Capacity *
                </label>
                <input
                  type="number"
                  value={formData.expectedParticipants}
                  onChange={e => setFormData({ ...formData, expectedParticipants: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Live Credential Minting Preview */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '18px',
            padding: '18px 20px',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Key size={18} color="#8B5CF6" />
              <h5 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF' }}>
                {isDelegatedCampusProposal 
                  ? 'Delegated Campus Governance Link (No New Credentials Minted):' 
                  : (isExisting ? 'Assigned Sub-Admin Account Preview:' : 'Auto-Minted Sub-Admin Credentials Preview:')}
              </h5>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#94A3B8' }}>{isDelegatedCampusProposal ? 'Linked Sub-Admin:' : 'Sub-Admin Username:'}</span>
                <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#38BDF8', marginTop: '2px' }}>
                  {isDelegatedCampusProposal ? `@${endorsingAdminName}` : `@${formData.customUsername}`}
                </div>
              </div>

              <div>
                <span style={{ color: '#94A3B8' }}>{isDelegatedCampusProposal ? 'Campus Host Requester:' : 'Governance Code:'}</span>
                <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#34D399', marginTop: '2px' }}>
                  {isDelegatedCampusProposal ? (proposal.proposerName || proposal.proposer_name) : `CPCB-COMM-2026-GOV-${randPin}`}
                </div>
              </div>

              <div>
                <span style={{ color: '#94A3B8' }}>{isDelegatedCampusProposal ? 'Credentials Status:' : 'Initial Access Password:'}</span>
                <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#F87171', marginTop: '2px' }}>
                  {isDelegatedCampusProposal ? '⚡ Reusing Existing Sub-Admin' : (isExisting ? '•••••••••••• (Active Password)' : formData.customPassword)}
                </div>
              </div>

              <div>
                <span style={{ color: '#94A3B8' }}>Portal Login URL:</span>
                <div style={{ fontFamily: 'monospace', fontWeight: '700', color: '#A78BFA', marginTop: '2px' }}>
                  /community-admin
                </div>
              </div>
            </div>

            {isDelegatedCampusProposal ? (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.76rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>ℹ️</span>
                <span><strong>Delegated Workflow:</strong> This event will be published immediately on the public Community &amp; Events page and attached directly to Community Sub-Admin (@{endorsingAdminName})'s console.</span>
              </div>
            ) : !isExisting && (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.76rem', color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⏳</span>
                <span><strong>Verification Lifecycle:</strong> This Sub-Admin will be tagged as <em>"Pending First-Time Login"</em> in the admin roster. Verification completes upon their first portal authentication.</span>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={approving}
              className="btn btn-outline"
              style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.86rem' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={approving}
              className="btn btn-primary"
              id="btn-confirm-mint-subadmin"
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {approving ? (
                <>Minting Credentials &amp; Authorizing Event...</>
              ) : isExisting ? (
                <><CheckCircle2 size={16} /> Authorize Event under Existing Sub-Admin</>
              ) : (
                <><Sparkles size={16} /> Mint Sub-Admin Credentials &amp; Authorize Event</>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
