import React, { useMemo } from 'react';
import { 
  Activity, 
  Flame, 
  Users, 
  QrCode, 
  Award, 
  Building2, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  PieChart, 
  ShieldCheck, 
  Globe2,
  Cpu
} from 'lucide-react';

export const CommunityAdminAnalyticsView = ({
  stats = {},
  events = [],
  applicants = []
}) => {
  // Category breakdown
  const categoryStats = useMemo(() => {
    const counts = {};
    events.forEach(e => {
      const cat = e.category || 'General Hackathon';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [events]);

  // Mode breakdown
  const modeStats = useMemo(() => {
    const counts = {};
    events.forEach(e => {
      const m = e.mode || 'Hybrid';
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [events]);

  // Top Colleges
  const topColleges = useMemo(() => {
    const counts = {};
    applicants.forEach(a => {
      const c = a.college_or_organization?.trim() || 'Other Institutions';
      counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [applicants]);

  const totalRegistered = useMemo(() => {
    return applicants.length;
  }, [applicants]);

  const totalCheckedIn = useMemo(() => {
    return applicants.filter(a => a.checkin_status === 'checked_in').length;
  }, [applicants]);

  const totalApproved = useMemo(() => {
    return applicants.filter(a => a.status === 'approved').length;
  }, [applicants]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(56, 189, 248, 0.08) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.3)',
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
              background: '#10B981',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              REALTIME TELEMETRY
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Live CPCB Impact Index
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>
            Community Analytics &amp; Engagement Metrics
          </h2>
        </div>

        <div style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          padding: '6px 14px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          color: '#166534',
          fontWeight: '700'
        }}>
          99.8% System Uptime
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Active Events</span>
            <Flame size={18} color="#10B981" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A' }}>{events.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#059669' }}>{stats.liveHackathons || events.length} Live On Air</div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Registered Hackers</span>
            <Users size={18} color="#0284C7" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0284C7' }}>{totalRegistered}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Across all event categories</div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Approved Passes</span>
            <QrCode size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#D97706' }}>{totalApproved}</div>
          <div style={{ fontSize: '0.75rem', color: '#059669' }}>
            {totalRegistered > 0 ? `${Math.round((totalApproved / totalRegistered) * 100)}% Pass Issue Rate` : '100%'}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '16px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Campus Network</span>
            <Building2 size={18} color="#7C3AED" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#7C3AED' }}>{stats.campusReach || 12}+</div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Technical institutes &amp; colleges</div>
        </div>
      </div>

      {/* 3. DUAL COLUMN BREAKDOWN CHARTS & PROGRESS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }} className="comm-admin-analytics-grid">
        
        {/* Category Breakdown */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 16px', color: '#0F172A' }}>
            Event Distribution by Category
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(categoryStats).map(([cat, count], idx) => {
              const pct = events.length > 0 ? Math.round((count / events.length) * 100) : 0;
              const colors = ['#10B981', '#0284C7', '#7C3AED', '#D97706'];
              const col = colors[idx % colors.length];

              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                    <span style={{ color: '#334155', fontWeight: '600' }}>{cat}</span>
                    <span style={{ color: col, fontWeight: '800' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Participating Colleges */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 16px', color: '#0F172A' }}>
            Top Campus &amp; University Reach
          </h3>

          {topColleges.length === 0 ? (
            <div style={{ color: '#64748B', fontSize: '0.86rem' }}>No college registration data yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topColleges.map(([college, count], idx) => (
                <div key={college} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: idx === 0 ? '#10B981' : '#E2E8F0',
                      color: idx === 0 ? '#FFFFFF' : '#475569',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.84rem', fontWeight: '600', color: '#0F172A' }}>
                      {college}
                    </span>
                  </div>

                  <span style={{
                    background: '#E0F2FE',
                    color: '#0369A1',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {count} Hackers
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
