import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  ShieldCheck, 
  Download, 
  Eye, 
  X, 
  Clock, 
  MapPin, 
  Sparkles, 
  Check, 
  Building2, 
  Phone, 
  Mail, 
  ExternalLink,
  Tag,
  RefreshCw
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminParticipantsView = ({
  applicants = [],
  events = [],
  onRefreshData = () => {}
}) => {
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [checkinFilter, setCheckinFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedApplicantDossier, setSelectedApplicantDossier] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Status Update (Approve / Reject)
  const handleUpdateStatus = async (applicantId, newStatus) => {
    setUpdatingId(applicantId);
    try {
      await communityAdminApi.updateRegistrationStatus(applicantId, newStatus);
      onRefreshData();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Gate Check-in Toggle
  const handleToggleCheckin = async (applicantId, currentStatus) => {
    const nextStatus = currentStatus === 'checked_in' ? 'registered' : 'checked_in';
    setUpdatingId(applicantId);
    try {
      await communityAdminApi.updateRegistrationCheckin(applicantId, nextStatus);
      onRefreshData();
    } catch (err) {
      console.error('Error toggling checkin:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // CSV Export Manifest
  const handleExportCSV = () => {
    if (filteredApplicants.length === 0) return;
    const headers = ['Participant ID', 'Ticket Number', 'Name', 'Email', 'Phone', 'College / Org', 'Ecosystem Role', 'Event ID', 'Event Title', 'Registration Status', 'Gate Checkin'];
    const rows = filteredApplicants.map(a => [
      a.participant_id || `ECO-PID-${a.id.slice(-4)}`,
      a.ticket_number || 'ECO-PASS',
      a.user_name,
      a.user_email,
      a.user_phone || '',
      a.college_or_organization || '',
      a.ecosystem_role || 'Participant',
      a.event_id,
      a.event_title || '',
      a.status,
      a.checkin_status || 'registered'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecotrace_event_participants_manifest_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchesEvent = selectedEventFilter === 'all' || app.event_id === selectedEventFilter;
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesCheckin = checkinFilter === 'all' || (app.checkin_status || 'registered') === checkinFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (app.user_name && app.user_name.toLowerCase().includes(q)) ||
        (app.user_email && app.user_email.toLowerCase().includes(q)) ||
        (app.participant_id && app.participant_id.toLowerCase().includes(q)) ||
        (app.ticket_number && app.ticket_number.toLowerCase().includes(q)) ||
        (app.college_or_organization && app.college_or_organization.toLowerCase().includes(q)) ||
        (app.ecosystem_role && app.ecosystem_role.toLowerCase().includes(q)) ||
        (app.team_name && app.team_name.toLowerCase().includes(q));

      return matchesEvent && matchesStatus && matchesCheckin && matchesSearch;
    });
  }, [applicants, selectedEventFilter, statusFilter, checkinFilter, searchQuery]);

  // Helper for role badge colors in light theme
  const getRoleBadgeStyle = (roleStr = '') => {
    const r = roleStr.toLowerCase();
    if (r.includes('sub-admin')) {
      return { background: '#FEF3C7', color: '#B45309', border: '1px solid #FCD34D' };
    }
    if (r.includes('recycler') && r.includes('org')) {
      return { background: '#F3E8FF', color: '#7E22CE', border: '1px solid #D8B4FE' };
    }
    if (r.includes('recycler')) {
      return { background: '#EDE9FE', color: '#6D28D9', border: '1px solid #C4B5FD' };
    }
    if (r.includes('donor')) {
      return { background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' };
    }
    return { background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. TOP STATS BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.12)',
            color: '#0284C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Total Applicants</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0F172A' }}>{applicants.length}</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Approved Passes</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#059669' }}>
              {applicants.filter(a => a.status === 'approved').length}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Pending Approval</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#D97706' }}>
              {applicants.filter(a => a.status === 'pending_approval').length}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <QrCode size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Checked-In at Gate</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#7C3AED' }}>
              {applicants.filter(a => a.checkin_status === 'checked_in').length}
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP SEARCH BAR MATCHING REFERENCE IMAGE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '10px',
            padding: '0 16px',
            height: '44px',
            minHeight: '44px',
            flex: '1 1 320px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }} className="comm-search-input-box">
            <Search size={18} color="#94A3B8" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by Event ID (e.g. EVT-COMM-2026-001), Participant ID, Name, College..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#0F172A',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{
              height: '44px',
              padding: '0 24px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#059669',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
              flexShrink: 0
            }}
          >
            Search
          </button>
        </div>

        {/* Secondary Filter & CSV Export Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Quick Event ID & Status Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }} className="comm-filters-group">
            <select
              value={selectedEventFilter}
              onChange={(e) => setSelectedEventFilter(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#0F172A',
                fontSize: '0.82rem',
                outline: 'none',
                height: '38px',
                fontWeight: '600'
              }}
            >
              <option value="all">⚡ Filter by Event ID (All)</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>
                  [{ev.id}] {ev.title}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#0F172A',
                fontSize: '0.82rem',
                outline: 'none',
                height: '38px'
              }}
            >
              <option value="all">All Admission Status</option>
              <option value="approved">Approved &amp; Issued</option>
              <option value="pending_approval">Pending Review</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={checkinFilter}
              onChange={(e) => setCheckinFilter(e.target.value)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#0F172A',
                fontSize: '0.82rem',
                outline: 'none',
                height: '38px'
              }}
            >
              <option value="all">All Gate Check-ins</option>
              <option value="checked_in">Checked In at Gate</option>
              <option value="registered">Not Checked In</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="btn btn-outline btn-sm comm-action-btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem',
              height: '38px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF'
            }}
            title="Download CSV Participant Manifest"
          >
            <Download size={14} />
            <span>Export Manifest (CSV)</span>
          </button>
        </div>
      </div>

      {/* 3. PARTICIPANTS TABLE MATCHING REFERENCE PRESENTATION */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          width: '100%'
        }} className="comm-admin-table-container">
          {filteredApplicants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748B' }}>
              <Users size={38} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ margin: '0 0 6px', color: '#0F172A', fontWeight: '700' }}>No Participants Found</h4>
              <p style={{ margin: 0, fontSize: '0.84rem' }}>Try refining your search keyword or switching the Event ID filter.</p>
            </div>
          ) : (
            <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{
                  borderBottom: '2px solid #E2E8F0',
                  background: '#F8FAFC',
                  textAlign: 'left',
                  color: '#475569',
                  fontSize: '0.74rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>PARTICIPANT ID</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>EVENT ID &amp; TRACK</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>ATTENDEE &amp; ROLE</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>CAMPUS / INSTITUTION</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>TICKET &amp; PASS</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>ADMISSION</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800' }}>GATE CHECK-IN</th>
                  <th style={{ padding: '14px 16px', fontWeight: '800', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
              {filteredApplicants.map((app) => {
                const isApproved = app.status === 'approved';
                const isCheckedIn = app.checkin_status === 'checked_in';
                const roleBadge = getRoleBadgeStyle(app.ecosystem_role);

                return (
                  <tr 
                    key={app.id}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* 1. PARTICIPANT ID (Blue Monospace Link Styling like CFG0510) */}
                    <td style={{ padding: '14px 16px' }}>
                      <span 
                        onClick={() => setSelectedApplicantDossier(app)}
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: '800',
                          color: '#2563EB',
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                        title="Click to view full attendee dossier"
                      >
                        {app.participant_id || `ECO-PID-${app.id.slice(-4)}`}
                      </span>
                    </td>

                    {/* 2. EVENT ID & TRACK */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.74rem', fontWeight: '800', color: '#D97706' }}>
                        {app.event_id}
                      </div>
                      <div style={{ fontWeight: '700', color: '#0F172A', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.82rem' }}>
                        {app.event_title || 'Campus Event'}
                      </div>
                    </td>

                    {/* 3. ATTENDEE & ROLE */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.86rem' }}>{app.user_name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{app.user_email}</div>
                      <div style={{ marginTop: '3px' }}>
                        <span style={{
                          ...roleBadge,
                          fontSize: '0.68rem',
                          fontWeight: '800',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <ShieldCheck size={10} />
                          {app.ecosystem_role || 'Donor Participant'}
                        </span>
                      </div>
                    </td>

                    {/* 4. CAMPUS / INSTITUTION */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#334155', fontSize: '0.82rem' }}>
                        {app.college_or_organization || 'Campus Delegate'}
                      </div>
                      {app.team_name && (
                        <div style={{ fontSize: '0.72rem', color: '#7C3AED', marginTop: '2px', fontWeight: '600' }}>
                          ⚡ Team: {app.team_name}
                        </div>
                      )}
                    </td>

                    {/* 5. TICKET & PASS */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#059669', fontSize: '0.82rem' }}>
                        🎫 {app.ticket_number || `ECO-PASS-${app.id.slice(-4)}`}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                        {app.pass_title ? `🔒 ${app.pass_title}` : 'Standard Pass'}
                      </div>
                    </td>

                    {/* 6. ADMISSION STATUS */}
                    <td style={{ padding: '14px 16px' }}>
                      {app.status === 'approved' ? (
                        <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                          ✓ Approved &amp; Issued
                        </span>
                      ) : app.status === 'rejected' ? (
                        <span style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                          ✕ Rejected
                        </span>
                      ) : (
                        <span style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                          ⏳ Pending Review
                        </span>
                      )}
                    </td>

                    {/* 7. GATE CHECK-IN */}
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleCheckin(app.id, app.checkin_status)}
                        disabled={updatingId === app.id}
                        style={{
                          background: isCheckedIn ? '#ECFDF5' : '#F8FAFC',
                          border: isCheckedIn ? '1px solid #10B981' : '1px solid #CBD5E1',
                          color: isCheckedIn ? '#047857' : '#64748B',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title={isCheckedIn ? 'Click to revoke check-in' : 'Click to confirm gate attendance'}
                      >
                        {isCheckedIn ? <Check size={12} color="#059669" /> : null}
                        <span>{isCheckedIn ? 'Checked-In' : 'Mark Check-in'}</span>
                      </button>
                    </td>

                    {/* 8. ACTIONS */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                        <button
                          onClick={() => setSelectedApplicantDossier(app)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '5px 10px', fontSize: '0.74rem' }}
                          title="View Participant Dossier & Ticket Pass"
                        >
                          <Eye size={13} />
                          <span>Dossier</span>
                        </button>

                        {!isApproved && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'approved')}
                            disabled={updatingId === app.id}
                            className="btn btn-primary btn-sm"
                            style={{ padding: '5px 10px', fontSize: '0.74rem', fontWeight: '800' }}
                            title="Approve Participant & Issue Live Event Pass"
                          >
                            <Check size={13} />
                            <span>Approve</span>
                          </button>
                        )}

                        {isApproved && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'rejected')}
                            disabled={updatingId === app.id}
                            className="btn btn-outline btn-sm"
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid #FECACA',
                              color: '#DC2626',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            title="Revoke / Reject Pass"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        </div>
      </div>

      {selectedApplicantDossier && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(10px, 3vw, 20px)'
        }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: 'clamp(16px, 4vw, 28px)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                    Participant Dossier
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'monospace' }}>
                    PID: {selectedApplicantDossier.participant_id || `ECO-PID-${selectedApplicantDossier.id.slice(-4)}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedApplicantDossier(null)}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Matrix */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '14px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '0.84rem'
            }} className="comm-form-row-2col">
              <div>
                <span style={{ color: '#64748B' }}>Full Name: </span>
                <strong style={{ color: '#0F172A' }}>{selectedApplicantDossier.user_name}</strong>
              </div>

              <div>
                <span style={{ color: '#64748B' }}>Email: </span>
                <strong style={{ color: '#0F172A' }}>{selectedApplicantDossier.user_email}</strong>
              </div>

              <div>
                <span style={{ color: '#64748B' }}>Institution / College: </span>
                <div style={{ color: '#0F172A', marginTop: '2px' }}>{selectedApplicantDossier.college_or_organization}</div>
              </div>

              <div>
                <span style={{ color: '#64748B' }}>Ecosystem Role: </span>
                <div style={{ marginTop: '2px' }}>
                  <span style={{
                    ...getRoleBadgeStyle(selectedApplicantDossier.ecosystem_role),
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {selectedApplicantDossier.ecosystem_role || 'Donor Participant'}
                  </span>
                </div>
              </div>

              {selectedApplicantDossier.team_name && (
                <div>
                  <span style={{ color: '#64748B' }}>Team: </span>
                  <strong style={{ color: '#0284C7' }}>{selectedApplicantDossier.team_name}</strong> ({selectedApplicantDossier.team_size || 1} members)
                </div>
              )}

              {selectedApplicantDossier.github_or_portfolio && (
                <div>
                  <span style={{ color: '#64748B' }}>GitHub / Portfolio: </span>
                  <div>
                    <a href={selectedApplicantDossier.github_or_portfolio} target="_blank" rel="noreferrer" style={{ color: '#0284C7', wordBreak: 'break-all' }}>
                      {selectedApplicantDossier.github_or_portfolio}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Skills & Summary */}
            {selectedApplicantDossier.skills_summary && (
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748B', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Skills &amp; Technical Background:</span>
                <div style={{ color: '#334155', lineHeight: '1.45' }}>{selectedApplicantDossier.skills_summary}</div>
              </div>
            )}

            {/* Digital Pass Preview */}
            <div style={{
              background: 'linear-gradient(135deg, #0B132B 0%, #111E38 100%)',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFFFFF'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Assigned Ticket Pass</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#10B981', fontFamily: 'monospace' }}>
                  {selectedApplicantDossier.ticket_number || `ECO-PASS-${selectedApplicantDossier.id.slice(-4)}`}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#CBD5E1', marginTop: '2px' }}>
                  Event: {selectedApplicantDossier.event_title || selectedApplicantDossier.event_id}
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <QrCode size={36} color="#000000" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => setSelectedApplicantDossier(null)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '8px 16px' }}
              >
                Close Dossier
              </button>

              {selectedApplicantDossier.status !== 'approved' && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedApplicantDossier.id, 'approved');
                    setSelectedApplicantDossier(null);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '8px 16px' }}
                >
                  Approve &amp; Issue Pass
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
