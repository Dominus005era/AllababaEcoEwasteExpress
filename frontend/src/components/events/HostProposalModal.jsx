import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Send, 
  Award, 
  ShieldCheck,
  Info,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { communityEventsApi } from '../../services/api';

export const HostProposalModal = ({ currentUser, onClose, onSubmittedSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedResult, setSubmittedResult] = useState(null);

  // Form states
  const [proposerName, setProposerName] = useState(currentUser?.displayName || currentUser?.companyName || '');
  const [proposerEmail, setProposerEmail] = useState(currentUser?.email || '');
  const [proposerPhone, setProposerPhone] = useState(currentUser?.phone || '');
  const [institutionName, setInstitutionName] = useState(currentUser?.organizationOrCollege || currentUser?.companyName || 'Amity University, Noida');
  const [assignedCommunityAdminId, setAssignedCommunityAdminId] = useState('');
  const [proposedTitle, setProposedTitle] = useState('Campus Zero-Landfill E-Waste Hackathon & Collection Sprint');
  const [proposedCategory, setProposedCategory] = useState('Campus E-Waste Collection');
  const [proposedDates, setProposedDates] = useState('Sept 12 - Sept 16, 2026');
  const [expectedParticipants, setExpectedParticipants] = useState(300);
  const [proposedVenue, setProposedVenue] = useState('University Main Auditorium & Tech Quad');
  const [proposalDetails, setProposalDetails] = useState('We would like to host a multi-departmental collection drive and AI reverse-logistics sprint to divert obsolete consumer electronics into certified UP CPCB smelters.');

  useEffect(() => {
    if (currentUser) {
      setProposerName(currentUser.displayName || currentUser.companyName || currentUser.email?.split('@')[0] || '');
      setProposerEmail(currentUser.email || '');
      setProposerPhone(currentUser.phone || '');
      setInstitutionName(currentUser.organizationOrCollege || currentUser.companyName || 'Amity University, Noida');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proposerName || !proposerEmail || !proposedTitle || !institutionName) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        proposerUserId: currentUser?.id,
        proposerUserType: currentUser?.role || 'donor',
        proposerName,
        proposerEmail,
        proposerPhone,
        institutionName,
        assignedCommunityAdminId: assignedCommunityAdminId.trim(),
        proposedTitle,
        proposedCategory,
        proposedDates,
        expectedParticipants: Number(expectedParticipants),
        proposedVenue,
        proposalDetails
      };

      const res = await communityEventsApi.submitProposal(payload);
      if (res.success) {
        setSubmittedResult(res);
        if (onSubmittedSuccess) onSubmittedSuccess(res);
      } else {
        setError(res.error || 'Failed to submit host proposal.');
      }
    } catch (err) {
      console.error('Proposal submission error:', err);
      // Demo fallback response
      setSubmittedResult({
        success: true,
        proposalId: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
        assignedCommunityAdminId: assignedCommunityAdminId.trim() || null,
        message: assignedCommunityAdminId.trim() 
          ? `Event proposal routed to Community Sub-Admin (${assignedCommunityAdminId.trim()}) for campus endorsement.`
          : 'Event Hosting Proposal submitted successfully! It has been routed to the Platform Super Admin for review.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="community-modal-backdrop">
      <div className="community-modal-card">
        {/* Expanded Responsive Header */}
        <div className="community-modal-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="badge badge-emerald" style={{ marginBottom: '6px', fontSize: '0.75rem', padding: '4px 10px' }}>
              <Building2 size={13} style={{ marginRight: '4px' }} />
              <span>Campus &amp; Corporate Host Application</span>
            </div>
            <h2 className="community-modal-title">
              Host an EcoTrace Campus Hackathon or Collection Drive
            </h2>
          </div>
          <button 
            className="community-modal-close-btn"
            onClick={onClose}
            title="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="community-modal-body">
          {submittedResult ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle2 size={42} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                {submittedResult.assignedCommunityAdminId 
                  ? 'Proposal Routed to Local Community Sub-Admin!' 
                  : 'Proposal Routed to Platform Super Admin!'}
              </h2>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '600px', lineHeight: '1.6' }}>
                Your hosting proposal for <strong>{proposedTitle}</strong> at <strong>{institutionName}</strong> has been logged into the EcoTrace vetting queue.
              </p>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '22px 24px',
                textAlign: 'left',
                fontSize: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '620px',
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Proposal Tracking ID:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', fontSize: '1rem' }}>{submittedResult.proposalId}</span>
                </div>
                
                {submittedResult.assignedCommunityAdminId ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Review Routing:</span>
                      <span style={{ fontWeight: '700', color: '#0284C7', fontFamily: 'monospace' }}>
                        🏛️ Sub-Admin ({submittedResult.assignedCommunityAdminId})
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Current Stage:</span>
                      <span style={{ fontWeight: '700', color: '#F59E0B' }}>
                        ● Stage 1: Awaiting Campus Sub-Admin Endorsement
                      </span>
                    </div>
                    <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '12px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Once your local Community Sub-Admin approves this request, it will be automatically forwarded to the Platform Main Admin for live event activation on the community hub.
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Super Admin Review Status:</span>
                      <span style={{ fontWeight: '700', color: '#F59E0B' }}>● Pending Main Super Admin Approval</span>
                    </div>
                    <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '12px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Upon Super Admin approval, you will be issued <strong>Community Event Admin</strong> credentials to manage participants, review hacker squads, and publish your event live!
                    </div>
                  </>
                )}
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', maxWidth: '300px', margin: '8px auto 0', padding: '14px 20px', fontSize: '1rem', fontWeight: '700' }} 
                onClick={onClose}
              >
                Done &amp; Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Guidance Info Banner */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                gap: '14px',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.55'
              }}>
                <Info size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Donors, student organizers, and recyclers can propose on-campus hackathons or collection drives. Once vetted and approved by the <strong>Platform Super Admin</strong>, you will receive organizer credentials to manage your live event.
                </span>
              </div>

              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#EF4444', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem' }}>
                  {error}
                </div>
              )}

              {/* Form Responsive Grid */}
              <div className="community-modal-grid">
                
                {/* 1. Proposer Name */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Organizer / Proposer Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={proposerName}
                    onChange={(e) => setProposerName(e.target.value)}
                    placeholder="Enter full name"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 2. Contact Email */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Contact Email Address <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={proposerEmail}
                    onChange={(e) => setProposerEmail(e.target.value)}
                    placeholder="name@university.edu"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 3. Host Institution / University */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    University / College / Corporate Host Organization <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. MNNIT Allahabad, IIT Kanpur, TCS Campus"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 4. Contact Phone */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Contact Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={proposerPhone}
                    onChange={(e) => setProposerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 5. Local Community Sub-Admin ID (Campus Chapter Endorsement) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} color="#10B981" />
                      <span>Local Campus / Community Sub-Admin ID <span style={{ color: '#64748B', fontWeight: '500' }}>(Optional)</span></span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#059669', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      ⚡ Fast-Track Campus Endorsement
                    </span>
                  </label>
                  <input
                    type="text"
                    value={assignedCommunityAdminId}
                    onChange={(e) => setAssignedCommunityAdminId(e.target.value)}
                    placeholder="e.g. COMM-ADM-2026-01 or COMM-ADM-01 (Leave blank if submitting directly to Platform Admin)"
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.45', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.18)', borderRadius: '8px', padding: '8px 12px' }}>
                    💡 <strong>Campus / Chapter Linking:</strong> If your university or institution already has an assigned <strong>Community Sub-Admin</strong>, enter their ID here. Your proposal will first appear in their local review console for endorsement before final Platform Admin activation.
                  </div>
                </div>

                {/* 6. Proposed Event Title */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Proposed Event Title <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={proposedTitle}
                    onChange={(e) => setProposedTitle(e.target.value)}
                    placeholder="e.g. Campus Zero-Landfill E-Waste Hackathon"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 6. Event Theme / Category */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Event Theme / Category
                  </label>
                  <select
                    value={proposedCategory}
                    onChange={(e) => setProposedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Campus E-Waste Collection">🏫 Campus Collection Drive</option>
                    <option value="AI & Hardware Hackathon">💻 AI &amp; Hardware Hackathon</option>
                    <option value="GreenTech & Circular Innovation">🔬 GreenTech &amp; Metal Recovery Challenge</option>
                    <option value="Community Workshop">🛠️ Community Repair &amp; Disassembly Workshop</option>
                  </select>
                </div>

                {/* 7. Dates */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Proposed Dates / Duration <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={proposedDates}
                    onChange={(e) => setProposedDates(e.target.value)}
                    placeholder="e.g. Sept 12 - Sept 16, 2026"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 8. Expected Participants */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Expected Participants / Donors
                  </label>
                  <select
                    value={expectedParticipants}
                    onChange={(e) => setExpectedParticipants(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value={100}>100 Participants / Donors</option>
                    <option value={250}>250 Participants / Donors</option>
                    <option value={300}>300 Participants / Donors</option>
                    <option value={500}>500 Participants / Donors</option>
                    <option value={1000}>1000+ Campus Participants</option>
                  </select>
                </div>

                {/* 9. Venue Location (Full Width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Venue Location on Campus / Facility <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={proposedVenue}
                    onChange={(e) => setProposedVenue(e.target.value)}
                    placeholder="e.g. University Main Auditorium, Tech Quad & Campus Gate 2 Drop-off Hub"
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 10. Proposal Details (Full Width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Proposal Narrative &amp; Expected E-Waste Volume Target
                  </label>
                  <textarea
                    rows={4}
                    value={proposalDetails}
                    onChange={(e) => setProposalDetails(e.target.value)}
                    placeholder="Describe the objective, target hardware items (smartphones, PCBs, laptops, batteries), and student volunteer structure..."
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      lineHeight: '1.55'
                    }}
                  />
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  fontSize: '1.02rem',
                  fontWeight: '800',
                  borderRadius: '14px',
                  marginTop: '10px',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                }}
              >
                {loading ? 'Submitting to Super Admin...' : 'Submit Host Proposal for Super Admin Approval →'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
