import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { 
  Activity, 
  RefreshCw, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Server, 
  Clock, 
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export const AdminSystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSystemHealth();
      setHealth(res);
    } catch (err) {
      console.error('Error fetching system health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge badge-emerald" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '6px' }}>
            <Activity size={13} />
            <span>REAL-TIME PLATFORM DIAGNOSTICS &amp; ENGINE TELEMETRY</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            System Infrastructure, MySQL Tables &amp; Gemini AI Status
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Live status of database connection pools, table row volumes across all 14 platform entities, and AI Vision inference latency.
          </p>
        </div>

        <button 
          onClick={fetchHealth} 
          disabled={loading}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Run Live Diagnostic</span>
        </button>
      </div>

      {loading && !health ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#10B981' }}>
          <RefreshCw size={28} className="spin" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '0.95rem' }}>Executing full system ping &amp; table count verification...</p>
        </div>
      ) : health ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Status Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>MySQL Connection</span>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>🟢 {health.database.status}</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {health.database.latencyMs} ms Latency
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Active MySQL Pool • Zero dropouts
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Gemini AI Vision Engine</span>
                <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>⚡ {health.aiEngine.status}</span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#3B82F6' }}>
                {health.aiEngine.model}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Multimodal Hardware Classifier Active
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Node.js Server Runtime</span>
                <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>v{health.server.nodeVersion}</span>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#10B981' }}>
                {Math.floor(health.server.uptimeSeconds / 60)} min Uptime
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Memory RSS: {health.server.memoryRssMb} MB
              </div>
            </div>
          </div>

          {/* Database Tables Entity Matrix */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HardDrive size={18} color="#10B981" />
              <span>Platform Database Table Volume &amp; Entity Registry:</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '12px' }}>
              {health?.database?.tableCounts && Object.entries(health.database.tableCounts).map(([tableName, count]) => {
                let badgeColor = '#10B981';
                if (tableName.includes('Layer') || tableName.includes('devices') || tableName.includes('pricing')) badgeColor = '#3B82F6';
                if (tableName.includes('scans')) badgeColor = '#F59E0B';
                if (tableName.includes('grievances')) badgeColor = '#EF4444';

                const formattedName = tableName
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());

                return (
                  <div
                    key={tableName}
                    style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {formattedName}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: badgeColor }}>
                        {count.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>rows</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
