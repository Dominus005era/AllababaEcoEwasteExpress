import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Building2, 
  Mail, 
  Phone,
  FileText,
  Search,
  Check,
  X,
  ShieldCheck,
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminProposalsView = ({
  proposals = [],
  commAdminUser = null,
  onRefreshData = () => {}
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actingId, setActingId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);

  const filteredProposals = proposals.filter(p => {
    const q = searchFilter.toLowerCase().trim();
    const matchesSearch = !q || (
      (p.proposed_title && p.proposed_title.toLowerCase().includes(q)) ||
      (p.proposer_name && p.proposer_name.toLowerCase().includes(q)) ||
      (p.institution_name && p.institution_name.toLowerCase().includes(q)) ||
      (p.proposed_venue && p.proposed_venue.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q))
    );

    if (!matchesSearch) return false;

    if (statusFilter === 'pending') {
      return p.community_admin_status === 'pending_review' || p.status === 'pending_community_review';
    }
    if (statusFilter === 'endorsed') {
      return p.community_admin_status === 'approved';
    }
    if (statusFilter === 'live') {
      return p.status === 'approved';
    }
    if (statusFilter === 'rejected') {
      return p.community_admin_status === 'rejected' || p.status === 'rejected_by_community_admin';
    }

    return true;
  });

  const pendingCount = proposals.filter(p => 
    p.community_admin_status === 'pending_review' || p.status === 'pending_community_review'
  ).length;

  const handleEndorse = async (proposal) => {
    if (!window.confirm(`Endorse host proposal "${proposal.proposed_title}" by ${proposal.proposer_name} and forward to Platform Main Admin?`)) {
      return;
    }

    setActingId(proposal.id);
    setActionSuccess(null);
    setActionError(null);

    try {
      const res = await communityAdminApi.endorseProposal(proposal.id, {
        adminId: commAdminUser?.id || 'COMM-ADM-01',
        adminName: commAdminUser?.displayName || commAdminUser?.username || 'Community Sub-Admin',
        notes: `Endorsed by campus Sub-Admin ${commAdminUser?.displayName || commAdminUser?.id} for campus hosting.`
      });

      if (res.success) {
        setActionSuccess(`✓ Endorsed "${proposal.proposed_title}"! Forwarded to Main Super Admin for final live activation.`);
        onRefreshData();
      } else {
        setActionError(res.error || 'Failed to endorse proposal.');
      }
    } catch (err) {
      console.error('Error endorsing proposal:', err);
      setActionError('Error submitting endorsement. Please try again.');
    } finally {
      setActingId(null);
    }
  };

  const handleReject = async (proposal) => {
    const reason = window.prompt(`Enter reason for declining proposal "${proposal.proposed_title}":`, 'Campus venue or calendar conflict');
    if (reason === null) return;

    setActingId(proposal.id);
    setActionSuccess(null);
    setActionError(null);

    try {
      const res = await communityAdminApi.rejectProposal(proposal.id, {
        adminId: commAdminUser?.id || 'COMM-ADM-01',
        adminName: commAdminUser?.displayName || 'Community Sub-Admin',
        reason: reason || 'Declined by local community sub-admin.'
      });

      if (res.success) {
        setActionSuccess(`Proposal ${proposal.id} marked as declined at chapter level.`);
        onRefreshData();
      } else {
        setActionError(res.error || 'Failed to decline proposal.');
      }
    } catch (err) {
      console.error('Error declining proposal:', err);
      setActionError('Error declining proposal.');
    } finally {
      setActingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        borderRadius: '18px',
        padding: 'clamp(16px, 3.5vw, 24px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: '#D97706',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '3px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              CAMPUS PROPOSALS QUEUE
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} color="#059669" />
              Sub-Admin Review &amp; Endorsement Console
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>
            Campus Host Proposals Review ({proposals.length})
          </h2>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
            Review on-campus event proposals submitted by student organizers and faculty with your Sub-Admin ID.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            background: pendingCount > 0 ? '#FFFBEB' : '#F0FDF4',
            border: pendingCount > 0 ? '1px solid #FDE68A' : '1px solid #BBF7D0',
            color: pendingCount > 0 ? '#B45309' : '#166534',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '0.84rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Clock size={15} />
            <span>{pendingCount} Awaiting Your Review</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#065F46',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.86rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          color: '#991B1B',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.86rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
          <span>{actionError}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }} className="comm-header-actions">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '10px',
          padding: '0 14px',
          height: '42px',
          minHeight: '42px',
          flex: '1 1 240px',
          boxSizing: 'border-box'
        }} className="comm-search-input-box">
          <Search size={16} color="#64748B" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by Proposal ID, Title, Proposer, College..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#0F172A', fontSize: '0.86rem', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }} className="comm-filters-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#0F172A',
              fontSize: '0.82rem',
              outline: 'none',
              height: '40px'
            }}
          >
            <option value="all">All Proposals ({proposals.length})</option>
            <option value="pending">⏳ Awaiting Sub-Admin Review</option>
            <option value="endorsed">✓ Endorsed (At Main Admin)</option>
            <option value="live">🎉 Published Live</option>
            <option value="rejected">✕ Declined</option>
          </select>
        </div>
      </div>

      {/* List / Cards */}
      {filteredProposals.length === 0 ? (
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '50px 20px',
          textAlign: 'center',
          color: '#64748B'
        }}>
          <Calendar size={38} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
          <h4 style={{ margin: '0 0 6px', color: '#0F172A', fontWeight: '700' }}>No Campus Hosting Proposals Found</h4>
          <p style={{ margin: 0, fontSize: '0.84rem' }}>
            When student clubs or faculty submit event proposals with your Sub-Admin ID, they will appear here for chapter endorsement.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredProposals.map((prop) => {
            const isPendingChapterReview = prop.community_admin_status === 'pending_review' || prop.status === 'pending_community_review';
            const isEndorsedByChapter = prop.community_admin_status === 'approved';
            const isLiveOnPlatform = prop.status === 'approved';
            const isDeclined = prop.community_admin_status === 'rejected' || prop.status === 'rejected_by_community_admin';

            return (
              <div key={prop.id} style={{
                background: 'var(--bg-card, #FFFFFF)',
                border: isPendingChapterReview 
                  ? '2px solid rgba(245, 158, 11, 0.45)' 
                  : '1px solid var(--border-color, #E2E8F0)',
                borderRadius: '18px',
                padding: 'clamp(16px, 3.5vw, 22px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: isPendingChapterReview ? '0 6px 20px rgba(245, 158, 11, 0.08)' : '0 4px 15px rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                
                {/* Top Badge & Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                        {prop.proposed_category || 'Campus Collection'}
                      </span>
                      <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#D97706', fontWeight: '800' }}>
                        ID: {prop.id}
                      </span>
                      {prop.assigned_community_admin_id && (
                        <span style={{
                          background: '#EFF6FF',
                          color: '#1D4ED8',
                          border: '1px solid #BFDBFE',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          fontFamily: 'monospace'
                        }}>
                          Assigned Sub-Admin: {prop.assigned_community_admin_id}
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(1.1rem, 3.2vw, 1.25rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.3' }}>
                      {prop.proposed_title}
                    </h3>
                  </div>

                  {/* 2-Tier Stage Badge */}
                  <div>
                    {isPendingChapterReview && (
                      <span style={{
                        background: '#FFFBEB',
                        color: '#B45309',
                        border: '1px solid #FDE68A',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Clock size={13} />
                        Stage 1: Awaiting Your Review
                      </span>
                    )}

                    {isEndorsedByChapter && !isLiveOnPlatform && (
                      <span style={{
                        background: '#EFF6FF',
                        color: '#1D4ED8',
                        border: '1px solid #BFDBFE',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <ShieldCheck size={13} color="#2563EB" />
                        Stage 2: Endorsed by You (At Main Super Admin)
                      </span>
                    )}

                    {isLiveOnPlatform && (
                      <span style={{
                        background: '#ECFDF5',
                        color: '#047857',
                        border: '1px solid #A7F3D0',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <CheckCircle2 size={13} color="#059669" />
                        Live &amp; Published on Community Hub
                      </span>
                    )}

                    {isDeclined && (
                      <span style={{
                        background: '#FEF2F2',
                        color: '#991B1B',
                        border: '1px solid #FECACA',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <X size={13} />
                        Declined at Chapter Level
                      </span>
                    )}
                  </div>
                </div>

                {/* Host & Proposal Dossier */}
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px',
                  fontSize: '0.84rem'
                }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Requester / Proposer: </span>
                    <strong style={{ color: '#0F172A' }}>{prop.proposer_name}</strong>
                    <div style={{ color: '#64748B', fontSize: '0.76rem', marginTop: '2px' }}>
                      ✉️ {prop.proposer_email} {prop.proposer_phone && `• 📞 ${prop.proposer_phone}`}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B' }}>Institution / Campus: </span>
                    <strong style={{ color: '#7C3AED' }}>{prop.institution_name}</strong>
                    <div style={{ color: '#64748B', fontSize: '0.76rem', marginTop: '2px' }}>
                      👥 Expected Cap: {prop.expected_participants || 200} Attendees
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#64748B' }}>Target Dates: </span>
                    <span style={{ color: '#0284C7', fontWeight: '700' }}>📅 {prop.proposed_dates}</span>
                  </div>

                  <div>
                    <span style={{ color: '#64748B' }}>Venue Hub: </span>
                    <span style={{ color: '#334155', fontWeight: '600' }}>📍 {prop.proposed_venue}</span>
                  </div>
                </div>

                {/* Proposal Text */}
                {prop.proposal_details && (
                  <div style={{
                    fontSize: '0.84rem',
                    color: '#334155',
                    lineHeight: '1.5',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}>
                    <strong style={{ color: '#0F172A', display: 'block', marginBottom: '4px' }}>Executive Summary / Track Concept:</strong>
                    {prop.proposal_details}
                  </div>
                )}

                {/* Sub-Admin Endorsement Trail */}
                {prop.community_admin_endorsed_by && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '0.8rem',
                    color: '#065F46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    <span>
                      🏛️ <strong>Endorsing Chapter Link:</strong> Approved by <strong>{prop.community_admin_endorsed_by}</strong>
                    </span>
                    {prop.community_admin_endorsed_at && (
                      <span style={{ fontSize: '0.74rem', color: '#047857' }}>
                        {new Date(prop.community_admin_endorsed_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Toolbar for Community Sub-Admin */}
                {isPendingChapterReview && (
                  <div style={{
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      ⚡ Endorsing will forward this request to the Main Super Admin without generating separate sub-admin credentials.
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleReject(prop)}
                        disabled={actingId === prop.id}
                        className="btn btn-outline btn-sm"
                        style={{
                          borderColor: '#FECACA',
                          color: '#DC2626',
                          background: '#FFF5F5',
                          fontSize: '0.82rem',
                          padding: '8px 14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <X size={14} />
                        <span>Decline</span>
                      </button>

                      <button
                        onClick={() => handleEndorse(prop)}
                        disabled={actingId === prop.id}
                        className="btn btn-primary btn-sm"
                        style={{
                          fontSize: '0.82rem',
                          padding: '8px 18px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontWeight: '800',
                          boxShadow: '0 2px 10px rgba(16, 185, 129, 0.25)'
                        }}
                      >
                        {actingId === prop.id ? (
                          <span>Endorsing...</span>
                        ) : (
                          <>
                            <Check size={15} />
                            <span>✓ Endorse &amp; Forward to Main Admin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default CommunityAdminProposalsView;
