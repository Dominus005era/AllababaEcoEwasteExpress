import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  QrCode, 
  Users, 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Award, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Tag
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminEventsView = ({
  events = [],
  onOpenEdit = () => {},
  onSelectEventForPass = () => {},
  onSelectEventForParticipants = () => {},
  onNavigateCreate = () => {},
  onRefreshData = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [togglingEventId, setTogglingEventId] = useState(null);

  // Toggle Trending status
  const handleToggleTrending = async (ev) => {
    setTogglingEventId(ev.id);
    try {
      await communityAdminApi.toggleTrending(ev.id);
      onRefreshData();
    } catch (err) {
      console.error('Error toggling trending:', err);
    } finally {
      setTogglingEventId(null);
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async (ev) => {
    if (!window.confirm(`STRICT ACTION:\nPermanently delete event "${ev.title}" (${ev.id}) from MySQL database?\nAll participant registrations and active passes for this event will also be deleted.`)) {
      return;
    }

    try {
      await communityAdminApi.deleteEvent(ev.id);
      onRefreshData();
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  // Filtered Events List
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch = !searchQuery.trim() ||
        (ev.title && ev.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.id && ev.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.venue_location && ev.venue_location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.host_name && ev.host_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.organization_name && ev.organization_name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'all' || ev.category === categoryFilter;
      const matchesMode = modeFilter === 'all' || ev.mode === modeFilter;

      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [events, searchQuery, categoryFilter, modeFilter]);

  // Overall event metrics
  const totalRegistered = useMemo(() => {
    return events.reduce((acc, ev) => acc + (Number(ev.current_participants) || 0), 0);
  }, [events]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. TOP STATS BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }} className="comm-stats-strip">
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Managed Events</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A' }}>{events.length}</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.15)',
            color: '#0284C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Active Participants</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A' }}>{totalRegistered}</div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <QrCode size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Passes Auto-Locked</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A' }}>
              {events.filter(e => e.has_locked_pass || e.locked_pass_id).length} / {events.length}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & TOOLBAR */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }} className="comm-header-actions">
        {/* Search */}
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
          maxHeight: '42px',
          flex: '1 1 260px',
          minWidth: '220px',
          boxSizing: 'border-box'
        }} className="comm-search-input-box">
          <Search size={16} color="#64748B" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search events by title, ID, venue, host, or college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#0F172A', fontSize: '0.86rem', outline: 'none' }}
          />
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }} className="comm-filters-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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
            <option value="all">All Categories</option>
            <option value="AI & Hardware Hackathon">AI &amp; Hardware</option>
            <option value="Campus & Corporate Drive">Campus Collection</option>
            <option value="GreenTech & Circular Innovation">GreenTech Challenge</option>
            <option value="Community Workshop">Workshop</option>
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
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
            <option value="all">All Modes</option>
            <option value="Hybrid">Hybrid</option>
            <option value="In-Person">In-Person</option>
            <option value="Online">Virtual / Online</option>
          </select>

          <button
            onClick={onNavigateCreate}
            className="btn btn-primary btn-sm comm-create-btn"
            style={{ padding: '8px 16px', fontSize: '0.84rem', height: '40px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={15} />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      {/* 3. EVENTS GRID */}
      {filteredEvents.length === 0 ? (
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '50px 20px',
          textAlign: 'center'
        }}>
          <Flame size={42} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem', color: '#0F172A' }}>No Managed Events Found</h3>
          <p style={{ color: '#64748B', margin: '0 0 16px', fontSize: '0.88rem' }}>
            {searchQuery ? 'Try adjusting your search keywords or filters.' : 'No active events found. Create your first community event below.'}
          </p>
          <button onClick={onNavigateCreate} className="btn btn-primary btn-sm">
            <PlusCircle size={15} />
            <span>Create New Event</span>
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {filteredEvents.map((ev) => {
            const hasPass = Boolean(ev.has_locked_pass || ev.locked_pass_id);

            return (
              <div 
                key={ev.id}
                style={{
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-color, #E2E8F0)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Banner Thumbnail */}
                <div style={{ width: '100%', height: '160px', position: 'relative', background: '#0F172A' }}>
                  <img 
                    src={ev.banner_image || ev.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} 
                    alt={ev.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(5px)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {ev.category}
                  </div>

                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleToggleTrending(ev)}
                      disabled={togglingEventId === ev.id}
                      style={{
                        background: ev.is_trending ? '#10B981' : 'rgba(15, 23, 42, 0.75)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                      title="Toggle Trending status on public homepage"
                    >
                      <Flame size={12} />
                      <span>{ev.is_trending ? 'Trending' : 'Standard'}</span>
                    </button>

                    <span style={{
                      background: ev.mode === 'Hybrid' ? '#0284C7' : '#7C3AED',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {ev.mode}
                    </span>
                  </div>
                </div>

                {/* Event Body */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#059669', fontWeight: '800' }}>
                      {ev.id}
                    </span>

                    {/* Locked Pass Status Indicator */}
                    {hasPass ? (
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#059669',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        fontSize: '0.66rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Lock size={10} /> Pass Locked
                      </span>
                    ) : (
                      <span style={{
                        background: 'rgba(245, 158, 11, 0.12)',
                        color: '#D97706',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '0.66rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <QrCode size={10} /> No Pass Yet
                      </span>
                    )}
                  </div>

                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.3' }}>
                    {ev.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.8rem', color: '#475569' }}>
                    <div>👤 Host: <strong style={{ color: '#D97706' }}>{ev.host_name || ev.organizer_name}</strong> {ev.host_role ? `(${ev.host_role})` : ''}</div>
                    <div>🏛️ Supporting: <strong style={{ color: '#7C3AED' }}>{ev.organization_name || ev.venue_location}</strong></div>
                    <div>📍 {ev.venue_location}</div>
                    <div>📅 {ev.start_date} - {ev.end_date}</div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem'
                  }}>
                    <span style={{ color: '#64748B' }}>
                      👥 <strong style={{ color: '#0F172A' }}>{ev.current_participants || 0}</strong> registered / {ev.max_participants || 500} max
                    </span>
                    <span style={{ fontWeight: '800', color: '#D97706' }}>
                      {ev.prize_pool || 'Incubation Grant'}
                    </span>
                  </div>

                  {/* Actions Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto', paddingTop: '10px' }}>
                    <button
                      onClick={() => onSelectEventForPass(ev.id)}
                      className="btn btn-outline btn-sm"
                      style={{
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        borderColor: hasPass ? '#10B981' : '#F59E0B',
                        color: hasPass ? '#059669' : '#D97706'
                      }}
                    >
                      <QrCode size={13} />
                      <span>{hasPass ? 'Inspect Pass' : 'Generate Pass'}</span>
                    </button>

                    <button
                      onClick={() => onSelectEventForParticipants(ev.id)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '7px 10px', fontSize: '0.78rem' }}
                    >
                      <Users size={13} />
                      <span>Participants ({ev.current_participants || 0})</span>
                    </button>

                    <button
                      onClick={() => onOpenEdit(ev)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '7px 10px', fontSize: '0.78rem' }}
                    >
                      <Edit3 size={13} />
                      <span>Edit &amp; Image</span>
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(ev)}
                      className="btn btn-outline btn-sm"
                      style={{
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        borderColor: 'rgba(239, 68, 68, 0.4)',
                        color: '#EF4444'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
