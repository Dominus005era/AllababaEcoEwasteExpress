import React, { useState } from 'react';
import { 
  Warehouse, 
  ClipboardCheck, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Scale, 
  Truck, 
  Package, 
  DollarSign, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const OrgAdminDepotIntakeView = ({
  intakeLots = [],
  loading = false,
  onRefresh = () => {},
  onOpenVerifyModal = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLots = intakeLots.filter(lot => {
    const matchesSearch = 
      (lot.lotId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lot.lotName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lot.recyclerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lot.recyclerCompany || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lot.vehicleNo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lot.handoverPassCode || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    const isCleared = lot.status === 'received_and_cleared';
    if (statusFilter === 'pending') return !isCleared;
    if (statusFilter === 'cleared') return isCleared;
    return true;
  });

  const pendingLotsCount = intakeLots.filter(l => l.status !== 'received_and_cleared').length;
  const clearedLotsCount = intakeLots.filter(l => l.status === 'received_and_cleared').length;
  const totalWeight = intakeLots.reduce((acc, l) => acc + (parseFloat(l.totalWeightKg) || 0), 0);
  const totalValuation = intakeLots.reduce((acc, l) => acc + (parseFloat(l.totalValuation) || 0), 0);

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
              background: '#E0F2FE',
              color: '#0369A1',
              border: '1px solid #BAE6FD',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Gatehouse Dock Intake
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Weigh Scale &amp; Consignment Audit
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Inbound Depot Intake &amp; Consignment Verification
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Inspect and verify end-of-day consignment lots deposited by field recyclers at the organization gatehouse scale before smelting processing.
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
          <span>{loading ? 'Refreshing...' : 'Sync Intake Desk'}</span>
        </button>
      </div>

      {/* Metric Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Verification
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#F59E0B', letterSpacing: '-0.02em' }}>
            {pendingLotsCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Awaiting scale confirmation</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Cleared Lots
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#10B981', letterSpacing: '-0.02em' }}>
            {clearedLotsCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Deposited into smelter base</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Weight Intake
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em' }}>
            {totalWeight.toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748B' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Total manifest physical payload</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Disbursed Value
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#059669', letterSpacing: '-0.02em' }}>
            ₹{totalValuation.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Total citizen cash disbursed</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
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
            placeholder="Search Lot ID, Recycler, Vehicle, Pass Code..."
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

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${intakeLots.length})` },
            { id: 'pending', label: `Awaiting (${pendingLotsCount})` },
            { id: 'cleared', label: `Cleared (${clearedLotsCount})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              style={{
                background: statusFilter === f.id ? '#0F172A' : '#F8FAFC',
                color: statusFilter === f.id ? '#FFFFFF' : '#475569',
                border: statusFilter === f.id ? '1px solid #0F172A' : '1px solid #E2E8F0',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.76rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minHeight: '32px'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Manifest Cards Stream */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <RefreshCw size={30} className="spin-icon" style={{ margin: '0 auto 10px', color: '#10B981' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>Fetching intake manifests from database...</div>
        </div>
      ) : filteredLots.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px dashed #CBD5E1' }}>
          <Warehouse size={36} color="#10B981" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>No Consignment Lots Found</h3>
          <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto' }}>
            When field recyclers complete their collection routes and deposit end-of-day lots, they will appear here for dock verification.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredLots.map((lot) => {
            const isCleared = lot.status === 'received_and_cleared';

            return (
              <div
                key={lot.lotId}
                style={{
                  background: '#FFFFFF',
                  border: isCleared ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: 'clamp(14px, 3vw, 22px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: '900',
                      color: '#0F172A',
                      background: '#F1F5F9',
                      padding: '3px 8px',
                      borderRadius: '7px',
                      fontSize: '0.82rem',
                      border: '1px solid #CBD5E1'
                    }}>
                      {lot.lotId}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: isCleared ? '#ECFDF5' : '#FFFBEB',
                      color: isCleared ? '#047857' : '#B45309',
                      border: isCleared ? '1px solid #A7F3D0' : '1px solid #FDE68A'
                    }}>
                      {isCleared ? '✓ Received & Cleared' : '🕒 Awaiting Dock Scale'}
                    </span>

                    <span style={{ fontSize: '0.74rem', color: '#2563EB', fontWeight: '700', background: '#EFF6FF', padding: '2px 7px', borderRadius: '6px' }}>
                      📅 {lot.scheduledDate || 'Today'}
                    </span>

                    <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#0369A1', fontWeight: '800', background: '#E0F2FE', padding: '2px 7px', borderRadius: '6px' }}>
                      Pass: {lot.handoverPassCode}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', margin: '0 0 3px', letterSpacing: '-0.01em' }}>
                    {lot.lotName || 'End-of-Day Depot Batch'}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px' }}>
                    Worker: <strong style={{ color: '#0F172A' }}>{lot.recyclerName}</strong> ({lot.recyclerCompany})
                  </div>

                  {/* Spec Strip */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '0.8rem',
                    color: '#64748B',
                    margin: '6px 0 10px',
                    flexWrap: 'wrap',
                    background: '#F8FAFC',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <span>🚐 Van: <strong style={{ color: '#0F172A' }}>{lot.vehicleNo}</strong></span>
                    <span>📦 Units: <strong style={{ color: '#0F172A' }}>{lot.deviceCount}</strong></span>
                    <span>⚖️ Weight: <strong style={{ color: '#059669' }}>{lot.totalWeightKg} kg</strong></span>
                    <span>💰 Value: <strong style={{ color: '#2563EB' }}>₹{lot.totalValuation?.toLocaleString('en-IN')}</strong></span>
                  </div>

                  {/* Order IDs List */}
                  <div style={{ fontSize: '0.76rem', color: '#475569', marginBottom: '4px' }}>
                    Orders: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{Array.isArray(lot.orderIds) ? lot.orderIds.join(', ') : lot.orderIds}</strong>
                  </div>

                  {lot.adminDockNotes && (
                    <div style={{ fontSize: '0.76rem', color: '#334155', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '5px 8px', borderRadius: '6px', marginTop: '4px' }}>
                      <strong>Seal Note:</strong> {lot.adminDockNotes}
                    </div>
                  )}
                </div>

                {/* Right Action Box */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 'auto', minWidth: 'min(100%, 200px)' }}>
                  {!isCleared ? (
                    <button
                      onClick={() => onOpenVerifyModal(lot)}
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        minHeight: '38px'
                      }}
                    >
                      <ClipboardCheck size={15} />
                      <span>Inspect &amp; Clear Lot →</span>
                    </button>
                  ) : (
                    <div style={{
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      color: '#047857',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}>
                      <CheckCircle2 size={15} />
                      <span>Cleared by {lot.verifiedByAdmin?.split(' ')[0] || 'Admin'}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
