import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  Lock, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Key, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { partnersApi } from '../../services/api';

export const OrgAdminLoginModal = ({ isOpen, onClose, onOpenApplicationModal }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticatedOrg, setAuthenticatedOrg] = useState(null);

  if (!isOpen) return null;

  const handleFillCredentials = (user, pass) => {
    setIdentifier(user);
    setPassword(pass);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password.trim()) {
      setError('Please provide corporate username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await partnersApi.login(identifier, password);
      setAuthenticatedOrg(res.user);
      sessionStorage.setItem('ecotrace_org_token', res.token);
      sessionStorage.setItem('ecotrace_org_user', JSON.stringify(res.user));
      localStorage.removeItem('ecotrace_org_token');
      localStorage.removeItem('ecotrace_org_user');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify organization credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAuthenticatedOrg(null);
    setIdentifier('');
    setPassword('');
    setError('');
    sessionStorage.removeItem('ecotrace_org_token');
    sessionStorage.removeItem('ecotrace_org_user');
    localStorage.removeItem('ecotrace_org_token');
    localStorage.removeItem('ecotrace_org_user');
  };

  return (
    <div className="partner-modal-backdrop">
      <div className="partner-modal-card" style={{ maxWidth: '520px' }}>
        {/* Modal Header */}
        <div className="partner-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '10px', 
                background: 'rgba(59, 130, 246, 0.15)', 
                border: '1px solid rgba(59, 130, 246, 0.3)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#3B82F6',
                flexShrink: 0
              }}
            >
              <Building2 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                Organization Admin Login
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Gateway for Partner Organizations &amp; Smelters
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              padding: '6px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              flexShrink: 0
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="partner-modal-body">
          {authenticatedOrg ? (
            <div style={{ textAlign: 'center', padding: '12px 4px' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '2px solid #10B981',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 14px',
                  color: '#10B981'
                }}
              >
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Organization Authenticated
              </h3>
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                <ShieldCheck size={14} />
                <span>Authorized Partner Active</span>
              </div>

              <div 
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  textAlign: 'left',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Organization:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{authenticatedOrg.organizationName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Lead Officer:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{authenticatedOrg.contactPerson}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CPCB License:</span>
                  <code style={{ color: 'var(--emerald-primary)', fontWeight: '700' }}>{authenticatedOrg.cpcbLicense || 'Active Verified'}</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Partner ID:</span>
                  <code style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>{authenticatedOrg.id}</code>
                </div>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '18px', textAlign: 'left', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Info size={16} color="#3B82F6" style={{ flexShrink: 0 }} />
                <span>Organization Admin verified. Full organization console access will be unlocked in upcoming releases.</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={handleReset}
                  style={{ fontSize: '0.85rem', padding: '10px 16px', flex: 1, minWidth: '110px', justifyContent: 'center' }}
                >
                  Sign Out
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={onClose}
                  style={{ fontSize: '0.85rem', padding: '10px 20px', flex: 1, minWidth: '110px', justifyContent: 'center' }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {error && (
                <div 
                  style={{ 
                    padding: '10px 12px', 
                    borderRadius: '10px', 
                    background: 'rgba(239, 68, 68, 0.12)', 
                    border: '1px solid rgba(239, 68, 68, 0.3)', 
                    color: '#EF4444', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '0.82rem'
                  }}
                >
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* DEMO CREDENTIAL CHIPS */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Key size={12} color="var(--emerald-primary)" />
                  <span>Pre-Seeded Partner Organization Credentials</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleFillCredentials('admin@cleanmetal.in', 'CleanMetal@2026')}
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px dashed rgba(16, 185, 129, 0.4)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>CleanMetal Refineries Pvt Ltd</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>admin@cleanmetal.in / CleanMetal@2026</span>
                    </div>
                    <span style={{ color: 'var(--emerald-primary)', fontWeight: '700', fontSize: '0.72rem' }}>Fill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFillCredentials('admin@ecogreensmelters.com', 'EcoGreen@2026')}
                    style={{
                      background: 'rgba(59, 130, 246, 0.08)',
                      border: '1px dashed rgba(59, 130, 246, 0.4)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>EcoGreen Smelters &amp; Refining Ltd</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>admin@ecogreensmelters.com / EcoGreen@2026</span>
                    </div>
                    <span style={{ color: '#3B82F6', fontWeight: '700', fontSize: '0.72rem' }}>Fill</span>
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                  Corporate Username or Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    required 
                    className="auth-input" 
                    placeholder="e.g. admin@cleanmetal.in or cleanmetal_admin"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                  Organization Access Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="password" 
                    required 
                    className="auth-input" 
                    placeholder="Enter issued password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '2px', fontWeight: '700' }}
              >
                <ShieldCheck size={16} />
                <span>{loading ? 'Authenticating...' : 'Sign In as Organization Admin'}</span>
              </button>

              <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Want to partner your enterprise?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenApplicationModal) onOpenApplicationModal();
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--emerald-primary)',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Apply to be a Partner
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
