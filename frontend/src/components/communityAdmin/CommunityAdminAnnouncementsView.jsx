import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Send, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Flame, 
  Sparkles,
  RefreshCw,
  Bell
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminAnnouncementsView = ({
  events = [],
  commAdminUser = null
}) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedEventId, setSelectedEventId] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await communityAdminApi.getAnnouncements();
      if (res.success && Array.isArray(res.announcements)) {
        setAnnouncements(res.announcements);
      }
    } catch (err) {
      console.warn('Error loading announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events]);

  const handleSendAnnouncement = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !title.trim() || !message.trim()) {
      setErrorMsg('Please select an event and enter both Title and Message.');
      return;
    }

    setSending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        eventId: selectedEventId,
        title: title.trim(),
        message: message.trim(),
        priority,
        senderName: commAdminUser?.displayName || 'Community Sub-Admin'
      };

      const res = await communityAdminApi.createAnnouncement(payload);
      if (res.success) {
        setSuccessMsg('✓ Broadcast announcement dispatched to event participants!');
        setTitle('');
        setMessage('');
        loadAnnouncements();
      } else {
        setErrorMsg(res.error || 'Failed to dispatch broadcast.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Database server error.');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Delete this broadcast announcement?')) return;
    try {
      await communityAdminApi.deleteAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      console.error('Error deleting announcement:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: '#DB2777',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              LIVE PARTICIPANT BROADCAST
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Push Announcements to Event Hub
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>
            Broadcast Push Notices &amp; Schedule Alerts
          </h2>
        </div>

        <button
          onClick={loadAnnouncements}
          className="btn btn-outline btn-sm"
          style={{ borderColor: '#DB2777', color: '#DB2777' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Refresh ({announcements.length})</span>
        </button>
      </div>

      {successMsg && (
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 18px', borderRadius: '12px', fontSize: '0.88rem' }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 18px', borderRadius: '12px', fontSize: '0.88rem' }}>
          {errorMsg}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: '24px',
        alignItems: 'start'
      }} className="comm-admin-ann-grid">
        
        {/* FORM */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: 'clamp(16px, 4vw, 24px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          minWidth: 0,
          overflow: 'hidden'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
            Send New Broadcast Notice
          </h3>

          <form onSubmit={handleSendAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Select Target Event *
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#0F172A',
                  fontSize: '0.86rem',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.title} ({ev.id})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Broadcast Title / Headline *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Keynote Venue Relocated to Hall B / Mentorship Hours Active"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              >
                <option value="Normal">Normal Notice</option>
                <option value="Important">Important Update</option>
                <option value="Urgent">🚨 Urgent / Critical Alert</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Announcement Message *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your official announcement for all registered participants..."
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn btn-primary"
              style={{
                justifyContent: 'center',
                fontWeight: '800',
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                border: 'none',
                color: '#FFFFFF'
              }}
            >
              <Send size={16} />
              <span>{sending ? 'Sending Broadcast...' : 'Publish Broadcast Notice →'}</span>
            </button>
          </form>
        </div>

        {/* RECENT ANNOUNCEMENTS STREAM */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
            Broadcast History ({announcements.length})
          </h3>

          {announcements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B' }}>
              <Bell size={32} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
              <p style={{ margin: 0, fontSize: '0.86rem' }}>No broadcast notices dispatched yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
              {announcements.map((ann) => (
                <div key={ann.id} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      background: ann.priority === 'Urgent' ? '#FEF2F2' : '#FCE7F3',
                      color: ann.priority === 'Urgent' ? '#DC2626' : '#BE185D',
                      border: ann.priority === 'Urgent' ? '1px solid #FECACA' : '1px solid #FBCFE8',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {ann.priority || 'Normal'}
                    </span>

                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                      title="Delete Announcement"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                    {ann.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: '1.4' }}>
                    {ann.message}
                  </p>

                  <div style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '6px', marginTop: '4px' }}>
                    <span>Event: {ann.event_title || ann.event_id}</span>
                    <span>{new Date(ann.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
