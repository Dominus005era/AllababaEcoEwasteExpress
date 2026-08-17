import React from 'react';
import { 
  Building2, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck,
  Save
} from 'lucide-react';

export const OrgAdminBranchModal = ({
  isOpen = false,
  editingBranchId = null,
  branchForm,
  setBranchForm,
  savingBranchLoading = false,
  orgUser = null,
  onSaveBranch = () => {},
  onClose = () => {}
}) => {
  if (!isOpen) return null;

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
          maxWidth: '620px',
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
              <Building2 size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                {editingBranchId ? 'Edit Regional Branch Base' : 'Register New Regional Base'}
              </h3>
              <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                {orgUser?.organizationName || 'Base Administration'}
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

        <form onSubmit={onSaveBranch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
              Branch / Processing Base Name *
            </label>
            <input
              type="text"
              value={branchForm.branchName}
              onChange={(e) => setBranchForm({ ...branchForm, branchName: e.target.value })}
              placeholder="e.g. Phaphamau Smelting & Metal Recovery Base (Branch 1)"
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
                Branch Code
              </label>
              <input
                type="text"
                value={branchForm.branchCode}
                onChange={(e) => setBranchForm({ ...branchForm, branchCode: e.target.value })}
                placeholder="e.g. BR-PHAPH-01"
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#0F172A',
                  fontSize: '0.84rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
                District / Region *
              </label>
              <input
                type="text"
                value={branchForm.district}
                onChange={(e) => setBranchForm({ ...branchForm, district: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#0F172A',
                  fontSize: '0.84rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
              Physical Facility Address *
            </label>
            <input
              type="text"
              value={branchForm.address}
              onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
              placeholder="e.g. Sector 4, Industrial Corridor, Prayagraj, UP 211013"
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

          {/* In-Charge Details Box */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.74rem', color: '#059669', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              👤 Designated Gatehouse In-Charge
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                  In-Charge Name *
                </label>
                <input
                  type="text"
                  value={branchForm.managerName}
                  onChange={(e) => setBranchForm({ ...branchForm, managerName: e.target.value })}
                  placeholder="e.g. Vikrant Mehra"
                  required
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#0F172A',
                    fontSize: '0.82rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                  In-Charge Phone *
                </label>
                <input
                  type="text"
                  value={branchForm.managerPhone}
                  onChange={(e) => setBranchForm({ ...branchForm, managerPhone: e.target.value })}
                  placeholder="e.g. +91 94150 45678"
                  required
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#0F172A',
                    fontSize: '0.82rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                In-Charge Email (Optional)
              </label>
              <input
                type="email"
                value={branchForm.managerEmail}
                onChange={(e) => setBranchForm({ ...branchForm, managerEmail: e.target.value })}
                placeholder="e.g. vikrant.mehra@ecogreensmelters.com"
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  color: '#0F172A',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                Gatehouse Dock No.
              </label>
              <input
                type="text"
                value={branchForm.gatehouseDockNo}
                onChange={(e) => setBranchForm({ ...branchForm, gatehouseDockNo: e.target.value })}
                placeholder="e.g. Gate 1 / Inbound Scale"
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  color: '#0F172A',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                Operating Hours
              </label>
              <input
                type="text"
                value={branchForm.operatingHours}
                onChange={(e) => setBranchForm({ ...branchForm, operatingHours: e.target.value })}
                placeholder="e.g. 08:00 AM - 20:00 PM"
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  color: '#0F172A',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* GPS Coordinates */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                GPS Latitude
              </label>
              <input
                type="text"
                value={branchForm.coordsLat}
                onChange={(e) => setBranchForm({ ...branchForm, coordsLat: e.target.value })}
                placeholder="e.g. 25.518200"
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  color: '#0F172A',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                GPS Longitude
              </label>
              <input
                type="text"
                value={branchForm.coordsLng}
                onChange={(e) => setBranchForm({ ...branchForm, coordsLng: e.target.value })}
                placeholder="e.g. 81.859600"
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  color: '#0F172A',
                  fontSize: '0.82rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={savingBranchLoading}
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
              <Building2 size={16} />
              <span>{savingBranchLoading ? 'Saving...' : (editingBranchId ? 'Save Base Changes' : 'Register Base Branch')}</span>
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
