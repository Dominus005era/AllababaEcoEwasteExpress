import React from 'react';
import { 
  UserCheck, 
  X, 
  QrCode, 
  CheckCircle2, 
  Truck, 
  Phone, 
  User, 
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export const OrgAdminAllocateWorkerModal = ({
  allocatingRequest,
  allocatedSuccessDpp,
  workforceRecyclers = [],
  selectedRecyclerId,
  setSelectedRecyclerId,
  agentPhoneInput,
  setAgentPhoneInput,
  agentVehicleInput,
  setAgentVehicleInput,
  allocatingLoading = false,
  onAllocateRecycler = () => {},
  onClose = () => {}
}) => {
  if (!allocatingRequest) return null;

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
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(16px, 4vw, 26px)',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
          boxSizing: 'border-box',
          position: 'relative'
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
              <UserCheck size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                Allocate Recycler &amp; Issue DPP
              </h3>
              <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                Order: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{allocatingRequest.requestId}</strong>
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

        {/* If Already Allocated in this session - Show Success Passport Badge */}
        {allocatedSuccessDpp ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              margin: '0 auto'
            }}>
              <CheckCircle2 size={30} />
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: '900', margin: 0, color: '#0F172A' }}>
              Digital Product Passport Activated!
            </h4>

            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
              Order <strong>{allocatedSuccessDpp.requestId}</strong> authorized &amp; dispatched to <strong>{allocatedSuccessDpp.workerName}</strong>.
            </p>

            <div style={{
              background: '#F8FAFC',
              border: '1.5px solid #10B981',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>DPP ID:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#059669', fontSize: '0.92rem' }}>{allocatedSuccessDpp.dppId}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E2E8F0', paddingTop: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Handover PIN:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#047857', fontSize: '1.25rem', letterSpacing: '3px', background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                  {allocatedSuccessDpp.verificationPin}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E2E8F0', paddingTop: '8px', fontSize: '0.8rem', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ color: '#64748B' }}>Assigned Vehicle:</span>
                <strong style={{ color: '#0F172A' }}>{allocatedSuccessDpp.vehicle}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '11px',
                fontWeight: '800',
                fontSize: '0.88rem',
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                minHeight: '38px'
              }}
            >
              Done &amp; Return
            </button>
          </div>
        ) : (
          /* Allocation Form */
          <form onSubmit={onAllocateRecycler} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Order Summary Box */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ color: '#64748B' }}>Device:</span>
                <strong style={{ color: '#0F172A' }}>{allocatingRequest.deviceName} ({allocatingRequest.physicalCondition || 'Operational'})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ color: '#64748B' }}>Donor:</span>
                <strong style={{ color: '#0F172A' }}>{allocatingRequest.donorName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ color: '#64748B' }}>Payout:</span>
                <strong style={{ color: '#059669' }}>₹{allocatingRequest.offeredPrice} (UPI)</strong>
              </div>
              <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '4px', color: '#475569' }}>
                📍 <strong>Address:</strong> {allocatingRequest.address}
              </div>
            </div>

            {/* Recycler Worker Selection Dropdown */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Select Certified Field Recycler Worker *
              </label>
              <select
                value={selectedRecyclerId}
                onChange={(e) => {
                  const recId = e.target.value;
                  setSelectedRecyclerId(recId);
                  const rec = workforceRecyclers.find(w => w.id === recId);
                  if (rec && rec.phone) setAgentPhoneInput(rec.phone);
                }}
                required
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#0F172A',
                  fontSize: '0.86rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                {workforceRecyclers.length > 0 ? (
                  workforceRecyclers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name || w.company_name} ({w.id} • {w.district})
                    </option>
                  ))
                ) : (
                  <option value="REC-001">Greenscape Field Agent #1 (CPCB-UP-2026-REC-1042)</option>
                )}
              </select>
            </div>

            {/* Worker Contact Phone */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Assigned Worker Contact Number *
              </label>
              <input
                type="text"
                value={agentPhoneInput}
                onChange={(e) => setAgentPhoneInput(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                required
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#0F172A',
                  fontSize: '0.86rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Assigned Vehicle Registration */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Assigned Logistics Vehicle Number *
              </label>
              <input
                type="text"
                value={agentVehicleInput}
                onChange={(e) => setAgentVehicleInput(e.target.value)}
                placeholder="e.g. UP-70-EC-8842"
                required
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#0F172A',
                  fontSize: '0.86rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={allocatingLoading}
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
                <QrCode size={15} />
                <span>{allocatingLoading ? 'Issuing Passport...' : 'Authorize & Issue Passport'}</span>
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
        )}

      </div>
    </div>
  );
};
