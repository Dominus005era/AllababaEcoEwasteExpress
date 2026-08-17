import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  User, 
  Mail, 
  MapPin, 
  Award,
  Sparkles,
  Save
} from 'lucide-react';
import { partnersApi } from '../../services/api';

export const OrgAdminProfileView = ({
  orgUser = null,
  onUpdateOrgUser = () => {}
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await partnersApi.changePassword({
        orgId: orgUser?.id || 'ORG-REC-0001',
        currentPassword,
        newPassword
      });

      if (res.success) {
        setPasswordMsg('Organization Admin password updated successfully! Credentials are synchronized with Supreme Main Admin.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(res.error || 'Failed to update password.');
      }
    } catch (err) {
      setPasswordError(err.message || 'Error updating password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px', width: '100%' }}>
      
      {/* Profile Header Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: 'clamp(16px, 3vw, 24px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '15px',
          background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
          flexShrink: 0
        }}>
          <Building2 size={26} />
        </div>

        <div style={{ minWidth: 0, flex: '1 1 220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
            <span style={{
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '2px 7px',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: '800'
            }}>
              CPCB Certified Smelter
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#0284C7', fontWeight: '800', background: '#F0F9FF', padding: '2px 7px', borderRadius: '6px' }}>
              {orgUser?.id || 'ORG-GREENDROP-04'}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)', fontWeight: '900', color: '#0F172A', margin: '0 0 2px' }}>
            {orgUser?.organizationName || 'GreenDrop Circular Metals Ltd (Hub #4)'}
          </h2>
          <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
            Central Processing Base • Jurisdiction: {orgUser?.city || 'Prayagraj'}, {orgUser?.state || 'Uttar Pradesh'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
        
        {/* Organization Scope & License Spec Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '18px',
          padding: 'clamp(16px, 3vw, 22px)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={17} color="#10B981" />
            <span>Statutory CPCB Clearance</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Official CPCB License:</span>
              <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{orgUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Nodal Contact:</span>
              <strong style={{ color: '#0F172A' }}>{orgUser?.contactPerson || 'Siddharth Shukla (Base Officer)'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Corporate Email:</span>
              <strong style={{ color: '#0F172A' }}>{orgUser?.email || 'admin@greendropmetals.org'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>Annual Capacity:</span>
              <strong style={{ color: '#059669' }}>2,500 MT / Year</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ color: '#64748B' }}>EPR Accreditation:</span>
              <strong style={{ color: '#2563EB' }}>Category 1 Smelter</strong>
            </div>
          </div>
        </div>

        {/* Password Synchronization Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '18px',
          padding: 'clamp(16px, 3vw, 22px)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ margin: '0 0 3px', fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={17} color="#10B981" />
            <span>Update Base Password</span>
          </h3>
          <p style={{ fontSize: '0.76rem', color: '#64748B', margin: '0 0 14px' }}>
            Synchronizes instantly in MySQL and Supreme Main Admin.
          </p>

          {passwordMsg && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', padding: '9px 12px', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} />
              <span>{passwordMsg}</span>
            </div>
          )}

          {passwordError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '9px 12px', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={15} />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
                Current Access Password *
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', fontSize: '0.82rem', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
                New Secure Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', fontSize: '0.82rem', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '3px' }}>
                Confirm New Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', fontSize: '0.82rem', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '4px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                minHeight: '38px'
              }}
            >
              <Save size={15} />
              <span>{passwordLoading ? 'Updating...' : 'Save Password'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
