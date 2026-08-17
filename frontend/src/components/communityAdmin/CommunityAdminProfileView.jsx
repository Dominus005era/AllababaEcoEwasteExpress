import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  MapPin, 
  Building2, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Key, 
  Activity,
  Award,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminProfileView = ({
  commAdminUser = null,
  eventsCount = 0,
  applicantsCount = 0,
  onLogout = () => {}
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const uniqueId = commAdminUser?.id || 'COMM-ADM-2026-01';

  const handleCopyId = () => {
    navigator.clipboard.writeText(uniqueId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordError('Please provide both current and new password.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match. Please verify.');
      return;
    }

    setChangingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      const res = await communityAdminApi.changePassword({
        adminId: uniqueId,
        currentPassword,
        newPassword
      });

      if (res.success) {
        setPasswordSuccess('✓ Password updated successfully! Your updated credentials have been synchronized and are visible to the Supreme Main Administration.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(res.error || 'Failed to update password.');
      }
    } catch (err) {
      setPasswordError(err.message || 'Server error while updating password.');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Profile Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(96, 165, 250, 0.3)',
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
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              CPCB LEVEL-2 CLEARANCE
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Authorized Regional Sub-Admin
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>
            Community Sub-Admin Governance Dossier
          </h2>
        </div>

        <button
          onClick={onLogout}
          className="btn btn-outline btn-sm"
          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#DC2626' }}
        >
          <LogOut size={14} />
          <span>Sign Out of Console</span>
        </button>
      </div>

      {/* Profile Card Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: '24px'
      }} className="comm-admin-profile-grid">
        
        {/* Dossier Card */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '1.4rem',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
            }}>
              {commAdminUser?.displayName ? commAdminUser.displayName.charAt(0).toUpperCase() : 'C'}
            </div>

            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                {commAdminUser?.displayName || 'Community Administrator'}
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '700', marginTop: '2px' }}>
                CPCB Code: {commAdminUser?.cpcbGovernanceCode || 'CPCB-COMM-2026-L2'}
              </div>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.84rem'
          }}>
            {/* Unique Fixed Sub-Admin ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '8px 12px', borderRadius: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>
                  Assigned Fixed Unique ID
                </span>
                <code style={{ fontSize: '0.92rem', fontWeight: '900', color: '#0284C7' }}>
                  {uniqueId}
                </code>
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                style={{
                  background: copiedId ? '#ECFDF5' : '#F1F5F9',
                  border: `1px solid ${copiedId ? '#A7F3D0' : '#CBD5E1'}`,
                  color: copiedId ? '#047857' : '#475569',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedId ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy ID</>}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={16} color="#64748B" />
              <span style={{ color: '#475569' }}>Username: <strong style={{ color: '#0F172A' }}>{commAdminUser?.username || 'community_admin'}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} color="#64748B" />
              <span style={{ color: '#475569' }}>Email: <strong style={{ color: '#0F172A' }}>{commAdminUser?.email || 'community@ecotrace.org'}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={16} color="#64748B" />
              <span style={{ color: '#475569' }}>Affiliated Institution: <strong style={{ color: '#7C3AED' }}>{commAdminUser?.institutionName || 'EcoTrace Academic Alliance'}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="#64748B" />
              <span style={{ color: '#475569' }}>Territory Scope: <strong style={{ color: '#0284C7' }}>{commAdminUser?.territoryDistrict || 'Prayagraj, Uttar Pradesh'}</strong></span>
            </div>
          </div>
        </div>

        {/* Clearance & Scope Stats */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
            Authorized Event Scope
          </h3>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '0.84rem',
            color: '#166534',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ fontWeight: '800' }}>✓ Full Community Host Authority</div>
            <div>• Host and publish hackathons &amp; collection drives</div>
            <div>• Issue and auto-lock official immutable delegate passes</div>
            <div>• Approve &amp; mark participant check-ins at campus gates</div>
            <div>• Broadcast push alerts &amp; notices to attendees</div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
          }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Managed Events</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#059669', marginTop: '2px' }}>{eventsCount}</div>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Registered Attendees</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0284C7', marginTop: '2px' }}>{applicantsCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD INTERFACE */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Key size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>
              Security &amp; Password Management
            </h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
              Update your sub-admin password. Changes are instantly synchronized and visible to Supreme Administration.
            </p>
          </div>
        </div>

        {passwordSuccess && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 16px', borderRadius: '12px', fontSize: '0.86rem', marginTop: '16px' }}>
            {passwordSuccess}
          </div>
        )}

        {passwordError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 16px', borderRadius: '12px', fontSize: '0.86rem', marginTop: '16px' }}>
            {passwordError}
          </div>
        )}

        <form onSubmit={handleChangePassword} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '18px', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Current Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#0F172A',
                fontSize: '0.88rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              New Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#0F172A',
                fontSize: '0.88rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Confirm New Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#0F172A',
                fontSize: '0.88rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              {showPassword ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
            </button>

            <button
              type="submit"
              disabled={changingPassword}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: '10px 16px',
                fontWeight: '800',
                borderRadius: '10px',
                justifyContent: 'center'
              }}
            >
              {changingPassword ? 'Updating...' : 'Update Password →'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
