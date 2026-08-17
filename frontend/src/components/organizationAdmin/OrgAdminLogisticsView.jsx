import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  RefreshCw, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Navigation,
  Sparkles
} from 'lucide-react';

export const OrgAdminLogisticsView = ({
  dispatches = [],
  loading = false,
  onRefresh = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDispatches = dispatches.filter(d => 
    (d.vehicle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.route || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.status || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.id || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
      
      {/* View Header Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: 'clamp(16px, 3vw, 24px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: '#ECFEFF',
              color: '#0891B2',
              border: '1px solid #A5F3FC',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Heavy Logistics Fleet
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Transport &amp; Dispatches Dispatcher
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Logistics Fleet Dispatches &amp; Scheduled Routes
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Manage heavy freight transports transferring bulk dismantled materials from regional collection depots to primary high-temperature smelters.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            padding: '9px 16px',
            borderRadius: '11px',
            fontSize: '0.84rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            minHeight: '38px'
          }}
        >
          <RefreshCw size={14} className={loading ? "spin-icon" : ""} color="#10B981" />
          <span>{loading ? 'Refreshing...' : 'Sync Fleet'}</span>
        </button>
      </div>

      {/* Dispatches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredDispatches.map(dsp => {
          const isEnRoute = dsp.status === 'En Route';

          return (
            <div
              key={dsp.id}
              style={{
                background: '#FFFFFF',
                border: isEnRoute ? '1.5px solid #06B6D4' : '1px solid #E2E8F0',
                borderRadius: '18px',
                padding: 'clamp(14px, 3vw, 20px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 240px', minWidth: 0 }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: isEnRoute ? '#ECFEFF' : '#F8FAFC',
                  color: isEnRoute ? '#0891B2' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Truck size={20} />
                </div>

                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#0F172A', background: '#F1F5F9', padding: '2px 7px', borderRadius: '6px', fontSize: '0.76rem' }}>
                      {dsp.id}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {dsp.vehicle}
                    </h3>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    <Navigation size={12} color="#0891B2" />
                    <span>{dsp.route}</span>
                    <span>•</span>
                    <span>Capacity: <strong>{dsp.capacity}</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flex: '1 1 auto', width: 'auto' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A' }}>
                    ETA: {dsp.eta}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    GPS Route Active
                  </div>
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: isEnRoute ? '#ECFEFF' : '#F1F5F9',
                  color: isEnRoute ? '#0891B2' : '#475569',
                  border: isEnRoute ? '1px solid #A5F3FC' : '1px solid #CBD5E1'
                }}>
                  ● {dsp.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
