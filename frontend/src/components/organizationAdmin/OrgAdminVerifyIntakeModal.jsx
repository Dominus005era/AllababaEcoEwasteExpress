import React from 'react';
import { 
  ClipboardCheck, 
  X, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  Warehouse
} from 'lucide-react';

export const OrgAdminVerifyIntakeModal = ({
  verifyingLot = null,
  verifiedWeightInput,
  setVerifiedWeightInput,
  dockNotesInput,
  setDockNotesInput,
  verifyingLoading = false,
  onApproveDepotIntake = () => {},
  onClose = () => {}
}) => {
  if (!verifyingLot) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px'
    }}>
      <div 
        className="animate-fadeIn"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '22px',
          padding: 'clamp(16px, 4vw, 26px)',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
          boxSizing: 'border-box'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '11px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              flexShrink: 0
            }}>
              <Scale size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                Gatehouse Dock Scale Inspection
              </h3>
              <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                Consignment Lot: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{verifyingLot.lotId}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={onApproveDepotIntake} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Manifest Lot Info Box */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Recycler Driver:</span>
              <strong style={{ color: '#0F172A' }}>{verifyingLot.recyclerName} ({verifyingLot.recyclerCompany})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Vehicle &amp; Pass:</span>
              <strong style={{ color: '#0F172A' }}>{verifyingLot.vehicleNo} • <span style={{ color: '#0284C7', fontFamily: 'monospace' }}>{verifyingLot.handoverPassCode}</span></strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Manifest Reported Weight:</span>
              <strong style={{ color: '#D97706' }}>{verifyingLot.totalWeightKg} kg ({verifyingLot.deviceCount} items)</strong>
            </div>

            <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '4px', color: '#475569' }}>
              Orders in Lot: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{Array.isArray(verifyingLot.orderIds) ? verifyingLot.orderIds.join(', ') : verifyingLot.orderIds}</strong>
            </div>
          </div>

          {/* Scale Weight Input */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Gatehouse Scale Verified Net Weight (kg) *
            </label>
            <div style={{ position: 'relative' }}>
              <Scale size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="number"
                step="0.01"
                value={verifiedWeightInput}
                onChange={(e) => setVerifiedWeightInput(e.target.value)}
                placeholder={verifyingLot.totalWeightKg?.toString() || '0.00'}
                required
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px 9px 36px',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Inspection Seal Notes */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Dock Seal &amp; Quality Inspection Notes
            </label>
            <textarea
              rows={3}
              value={dockNotesInput}
              onChange={(e) => setDockNotesInput(e.target.value)}
              placeholder="e.g. Tamper seals verified intact. Electronic payload weighed on Gate 1 scale. Dispatched to hydro-smelting line."
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '9px 12px',
                color: '#0F172A',
                fontSize: '0.84rem',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={verifyingLoading}
              style={{
                flex: '1 1 180px',
                padding: '11px',
                borderRadius: '11px',
                fontWeight: '800',
                fontSize: '0.86rem',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                minHeight: '38px'
              }}
            >
              <ClipboardCheck size={16} />
              <span>{verifyingLoading ? 'Verifying & Clearing...' : 'Verify & Clear into Smelter Inventory'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '11px 16px',
                borderRadius: '11px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontWeight: '700',
                fontSize: '0.84rem',
                cursor: 'pointer',
                minHeight: '38px'
              }}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
