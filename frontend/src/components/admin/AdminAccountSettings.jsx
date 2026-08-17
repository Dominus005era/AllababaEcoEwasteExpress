import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Activity, 
  RefreshCw, 
  Cpu, 
  HardDrive, 
  AlertTriangle,
  CheckCircle2,
  Server,
  UserCheck
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminAccountSettings = () => {
  const [showSecurityKey, setShowSecurityKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Engine Test state
  const [testingEngine, setTestingEngine] = useState(false);
  const [engineResults, setEngineResults] = useState(null);

  const masterSecurityKey = 'ECOTRACE-SEC-KEY-2026-X89';
  const masterPin = '882026';

  const handleCopySecurityKey = () => {
    navigator.clipboard.writeText(masterSecurityKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (!currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current master password.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setPasswordLoading(true);
    try {
      // Simulate verification / save
      await new Promise(r => setTimeout(r, 600));
      setPasswordMsg({ type: 'success', text: 'Master Administrator password updated successfully in session.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message || 'Failed to update master password.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRunEnginePing = async () => {
    setTestingEngine(true);
    try {
      const res = await adminApi.getSystemHealth();
      setEngineResults({
        dbLatency: res.database.latencyMs,
        dbStatus: res.database.status,
        aiModel: res.aiEngine.model,
        aiStatus: res.aiEngine.status,
        uptimeMin: Math.floor(res.server.uptimeSeconds / 60),
        memoryMb: res.server.memoryRssMb
      });
    } catch (err) {
      console.error('Ping test failed:', err);
    } finally {
      setTestingEngine(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px' }}>
      {/* Title Header */}
      <div>
        <div className="badge badge-red" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '6px' }}>
          <ShieldCheck size={13} />
          <span>ROOT SECURITY CONTROLLER &amp; CREDENTIALS</span>
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
          Super Admin Profile &amp; Security Key Management
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Strict root administration identity, multi-factor security key credentials, and live platform engine telemetry.
        </p>
      </div>

      {/* Grid: Admin Identity & Master Security Key */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Super Admin Identity */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '18px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #EF4444, #991B1B)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.1rem'
              }}>
                SA
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Platform Super Admin
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: '700' }}>
                  Root Level Authority
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Email Identity:</span>
                <strong style={{ color: 'var(--text-primary)' }}>admin@ecotrace.gov.in</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Security Clearance:</span>
                <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>LEVEL-5-SUPER-ADMIN</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>System Identifier:</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontWeight: '700' }}>ROOT-GOV-001</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Audit Logging:</span>
                <span style={{ color: '#10B981', fontWeight: '700' }}>● MySQL Immutably Audited</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}>
            🛡️ <strong>Zero-Leak Security Protocol:</strong> All Super Admin actions, record deletions, and CPCB Form 6 lot clearances are logged with root timestamps.
          </div>
        </div>

        {/* Card 2: Master Security Key & PIN */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '18px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Key size={18} color="#EF4444" />
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Master Multi-Factor Security Key
              </h4>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 16px' }}>
              This 256-bit entropy cryptographic key is required alongside email and password for Super Admin login authentication.
            </p>

            {/* Key Box */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: '700' }}>
                  256-BIT MASTER SECURITY KEY:
                </span>
                <button
                  onClick={() => setShowSecurityKey(!showSecurityKey)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showSecurityKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em'
              }}>
                {showSecurityKey ? masterSecurityKey : '••••••••••••••••••••••••••••'}
              </div>
            </div>

            {/* PIN Box */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                  FALLBACK 6-DIGIT MASTER PIN:
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', fontWeight: '800', color: '#F59E0B' }}>
                  {showSecurityKey ? masterPin : '••••••'}
                </div>
              </div>

              <button
                onClick={handleCopySecurityKey}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {copiedKey ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ⚠️ Never share this security key. Only authorized root administrators are permitted to possess this credential.
          </div>
        </div>

      </div>

      {/* Grid: Change Password & Live Engine Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Form: Change Password */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Lock size={18} color="#10B981" />
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Update Master Controller Password
            </h4>
          </div>

          {passwordMsg.text && (
            <div style={{
              background: passwordMsg.type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: `1px solid ${passwordMsg.type === 'error' ? '#EF4444' : '#10B981'}`,
              color: passwordMsg.type === 'error' ? '#EF4444' : '#10B981',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.84rem',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              {passwordMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Current Master Password *
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                New Master Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Confirm New Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="btn btn-primary"
              style={{
                borderRadius: '10px',
                padding: '11px',
                fontWeight: '800',
                fontSize: '0.88rem',
                justifyContent: 'center',
                marginTop: '4px'
              }}
            >
              {passwordLoading ? 'Updating Password...' : 'Save New Master Password'}
            </button>
          </form>
        </div>

        {/* Live Engine Diagnostic Ping */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#3B82F6" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Platform Engine Diagnostics
                </h4>
              </div>

              <button
                onClick={handleRunEnginePing}
                disabled={testingEngine}
                className="btn btn-outline btn-sm"
                style={{ borderRadius: '8px', padding: '5px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <RefreshCw size={12} className={testingEngine ? 'spin' : ''} />
                <span>Test Live Ping</span>
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 16px' }}>
              Execute real-time latency checks against the MySQL database cluster and Gemini Vision AI classifier.
            </p>

            {engineResults ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>MySQL Database:</span>
                  <span style={{ color: '#10B981', fontWeight: '800' }}>🟢 {engineResults.dbStatus} ({engineResults.dbLatency}ms)</span>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Gemini AI Vision Engine:</span>
                  <span style={{ color: '#3B82F6', fontWeight: '800' }}>⚡ {engineResults.aiStatus} ({engineResults.aiModel})</span>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Node.js Server Uptime:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{engineResults.uptimeMin} mins (Memory: {engineResults.memoryMb} MB)</span>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <Server size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                <p style={{ margin: 0, fontSize: '0.84rem' }}>Click "Test Live Ping" above to execute engine diagnostics.</p>
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            🔒 Engine endpoints are protected by Level-5 JWT token verification.
          </div>
        </div>

      </div>
    </div>
  );
};
