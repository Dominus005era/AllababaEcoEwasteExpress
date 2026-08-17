import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { 
  Truck, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  QrCode, 
  Scale, 
  Layers,
  AlertCircle
} from 'lucide-react';

export const AdminDepotLots = () => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifyingLotId, setVerifyingLotId] = useState(null);
  const [verifySuccessMsg, setVerifySuccessMsg] = useState('');

  const fetchLots = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getDepotLots();
      if (res.lots) {
        setLots(res.lots);
      }
    } catch (err) {
      console.error('Error fetching depot lots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const handleVerifyLot = async (lotId) => {
    if (!window.confirm(`Approve Supreme CPCB Form 6 Inbound Intake Clearance for Lot ${lotId}? This will mark the consignment as verified at the smelter dock and transition all linked customer orders to 'Processed at Smelter'.`)) {
      return;
    }
    setVerifyingLotId(lotId);
    try {
      const res = await adminApi.verifyDepotLot(lotId, {
        adminName: 'Platform Super Admin',
        notes: 'Dock Gate 3 Scale Intake Clearance Verified by Supreme Admin. Consignment sealed & passed CPCB Form 6 audit.'
      });
      setVerifySuccessMsg(res.message || `Lot ${lotId} approved successfully!`);
      setLots(prev => prev.map(lot => 
        lot.lot_id === lotId 
          ? { ...lot, status: 'received_and_cleared', received_at: new Date().toISOString(), verified_by_admin: 'Platform Super Admin' } 
          : lot
      ));
      setTimeout(() => setVerifySuccessMsg(''), 5000);
    } catch (err) {
      alert('Failed to verify lot: ' + err.message);
    } finally {
      setVerifyingLotId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge badge-emerald" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '6px' }}>
            <Truck size={13} />
            <span>CONSIGNMENT DEPOT LOGISTICS &amp; CPCB INTAKE CLEARANCE MATRIX</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            Daily Consignment Handover Lots &amp; Smelter Dock Gates
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Inspect field recycler delivery consignments, aggregate weights (kg), expected elemental yields, QR passcodes, and issue CPCB Form 6 Intake Clearances.
          </p>
        </div>

        <button 
          onClick={fetchLots} 
          disabled={loading}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Refresh Lots</span>
        </button>
      </div>

      {verifySuccessMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid #10B981',
          color: '#10B981',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          fontWeight: '700',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} />
          <span>{verifySuccessMsg}</span>
        </div>
      )}

      {/* Lots Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#10B981' }}>
          <RefreshCw size={28} className="spin" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '0.95rem' }}>Loading consignment manifests from MySQL...</p>
        </div>
      ) : lots.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px dashed var(--border-color)',
          borderRadius: '16px',
          padding: '50px 20px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <Truck size={42} color="var(--text-muted)" style={{ margin: '0 auto 14px' }} />
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 6px' }}>No Depot Delivery Lots Found</h4>
          <p style={{ fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto' }}>
            No recycler batch consignments are currently pending or recorded in the depot manifests database.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {lots.map((lot) => {
            const isCleared = lot.status === 'received_and_cleared';
            return (
              <div
                key={lot.lot_id}
                style={{
                  background: 'var(--bg-card)',
                  border: isCleared ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '18px',
                  padding: '22px 24px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Top Title Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className={`badge ${isCleared ? 'badge-emerald' : 'badge-yellow'}`} style={{ fontSize: '0.74rem' }}>
                        {isCleared ? '✓ CPCB FORM 6 INTAKE CLEARED' : '⏳ AT DOCK • AWAITING SUPREME AUDIT'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        LOT ID: {lot.lot_id}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                      {lot.lot_name || 'Daily Depot Consignment Batch'}
                    </h4>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#10B981' }}>
                      ₹{lot.total_valuation?.toLocaleString('en-IN') || '0'}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Aggregate Value • {lot.device_count} Assets
                    </div>
                  </div>
                </div>

                {/* Details Matrix */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  background: 'var(--bg-secondary)',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Field Recycler / Driver</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {lot.recycler_name} ({lot.driver_name || 'Rahul Sharma'})
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Vehicle: {lot.vehicle_no || 'UP-70-AB-1042'}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Destination Smelting Base</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {lot.target_org_name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>District: {lot.target_hub_district} Hub</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Consignment Net Weight</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#3B82F6' }}>
                      {lot.total_weight_kg} kg
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pre-calibrated at Dock</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Security QR Passcode</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#F59E0B', fontFamily: 'monospace' }}>
                      {lot.handover_pass_code}
                    </div>
                  </div>
                </div>

                {/* Expected Metals Yield */}
                {lot.expected_metals_yield && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    💎 <strong>Expected Metals Recovery:</strong> <span style={{ color: '#F59E0B', fontWeight: '600' }}>{lot.expected_metals_yield}</span>
                  </div>
                )}

                {/* Verification & Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isCleared ? (
                      <span>Cleared by <strong style={{ color: 'var(--text-primary)' }}>{lot.verified_by_admin || 'Platform Super Admin'}</strong> on {new Date(lot.received_at).toLocaleString()}</span>
                    ) : (
                      <span>Dispatched on {new Date(lot.dispatched_at).toLocaleString()} • Awaiting Supreme dock clearance</span>
                    )}
                  </div>

                  {!isCleared && (
                    <button
                      type="button"
                      disabled={verifyingLotId === lot.lot_id}
                      onClick={() => handleVerifyLot(lot.lot_id)}
                      className="btn btn-primary btn-sm"
                      style={{
                        borderRadius: '10px',
                        padding: '8px 18px',
                        fontWeight: '800',
                        fontSize: '0.86rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CheckCircle2 size={15} className={verifyingLotId === lot.lot_id ? 'spin' : ''} />
                      <span>{verifyingLotId === lot.lot_id ? 'Authorizing Intake...' : 'Approve CPCB Form 6 Clearance'}</span>
                    </button>
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
