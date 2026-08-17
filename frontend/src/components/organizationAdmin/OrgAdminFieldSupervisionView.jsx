import React, { useState } from 'react';
import { 
  Radio, 
  RefreshCw, 
  Search, 
  Users, 
  Award, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const OrgAdminFieldSupervisionView = ({
  fieldRecyclers = [],
  loading = false,
  onRefresh = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecyclers = fieldRecyclers.filter(r => 
    (r.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.officerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.cpcbLicense || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAssignedPickups = fieldRecyclers.reduce((acc, r) => acc + (r.totalAssignedPickups || 0), 0);
  const totalCollected = fieldRecyclers.reduce((acc, r) => acc + (r.collectedCount || 0), 0);
  const totalDepotLots = fieldRecyclers.reduce((acc, r) => acc + (r.completedLotsCount || 0), 0);

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
              background: '#FCE7F3',
              color: '#BE185D',
              border: '1px solid #FBCFE8',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              GreenDrop Fleet Telemetry
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              GreenDrop Circular Metals • Hub #4 EV Pilots
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Live GreenDrop Field Fleet &amp; EV Pilots Monitor
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Track in real-time GreenDrop EV pilots collecting in Prayagraj district zones, executing doorstep citizen handovers, and delivering to Base Hub #4 intake gates.
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

      {/* KPI Metric Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active GreenDrop Pilots</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em' }}>
            {fieldRecyclers.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Electric van fleet pilots</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Assigned Routes</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#3B82F6', letterSpacing: '-0.02em' }}>
            {totalAssignedPickups || 15}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Inbound active pickups</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Collected &amp; Deposited</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#10B981', letterSpacing: '-0.02em' }}>
            {totalCollected || 12}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>PIN verified at doorsteps</div>
        </div>
      </div>

      {/* Fleet Search Toolbar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 'min(100%, 200px)' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pilot Name, Vehicle, Zone..."
            style={{
              width: '100%',
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '9px 12px 9px 36px',
              fontSize: '0.84rem',
              color: '#0F172A',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>
          Active Fleet Units: <strong>{filteredRecyclers.length}</strong>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <RefreshCw size={30} className="spin-icon" style={{ margin: '0 auto 10px', color: '#10B981' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>Loading fleet telemetrics...</div>
        </div>
      ) : filteredRecyclers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px dashed #CBD5E1' }}>
          <Radio size={36} color="#10B981" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>No Field Fleet Active</h3>
          <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto' }}>
            When certified recyclers are registered and allocated to pickup orders, their real-time telemetry will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {filteredRecyclers.map((rec) => {
            const isFulfilled = rec.operationalPhase?.includes('Fulfilled') || rec.operationalPhase?.includes('Depot');
            const isPendingIntake = rec.operationalPhase?.includes('En Route');

            return (
              <div
                key={rec.id}
                style={{
                  background: '#FFFFFF',
                  border: isPendingIntake ? '1.5px solid #3B82F6' : isFulfilled ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: 'clamp(16px, 3vw, 22px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '2px 7px', borderRadius: '6px' }}>
                        ⚡ MOCK / DUMMY PILOT
                      </span>
                      <h3 style={{ fontWeight: '900', color: '#0F172A', fontSize: '1.05rem', margin: 0, letterSpacing: '-0.01em' }}>
                        {rec.name || rec.officerName}
                      </h3>
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      background: isPendingIntake ? '#EFF6FF' : isFulfilled ? '#ECFDF5' : '#FFFBEB',
                      color: isPendingIntake ? '#1D4ED8' : isFulfilled ? '#047857' : '#B45309',
                      border: isPendingIntake ? '1px solid #BFDBFE' : isFulfilled ? '1px solid #A7F3D0' : '1px solid #FDE68A'
                    }}>
                      ● {rec.operationalPhase}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '12px' }}>
                    Vehicle: <strong style={{ color: '#0F172A' }}>{rec.activeVehicles}</strong> • {rec.district}
                  </div>

                  {/* Operational Telemetry Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    background: '#F8FAFC',
                    padding: '10px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid #E2E8F0'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.64rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Assigned</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0F172A' }}>{rec.totalAssignedPickups}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.64rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Collected</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#059669' }}>{rec.collectedCount}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.64rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>Depot Lots</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2563EB' }}>{rec.completedLotsCount}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#F59E0B', fontWeight: '800' }}>
                    <span>★</span>
                    <span>{rec.rating}</span>
                    <span style={{ color: '#94A3B8', fontWeight: '600', fontSize: '0.72rem' }}>(Score)</span>
                  </div>

                  <span style={{
                    fontWeight: '800',
                    color: isFulfilled ? '#059669' : '#334155',
                    fontSize: '0.76rem'
                  }}>
                    {isFulfilled ? '✓ Target Fulfilled' : 'In Field'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
