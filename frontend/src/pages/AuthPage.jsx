import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Building2, 
  Lock, 
  Mail, 
  Key, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AuthPage = ({ initialRole = 'donor', onNavigate, onLoginSuccess }) => {
  const { registerDonor, loginUser, loginWithGoogle } = useAuth();
  
  // Active Portal Role: 'donor' or 'recycler'
  const [activePortal, setActivePortal] = useState(initialRole);
  
  // Auth Mode for Donor: 'signin' or 'register'
  const [donorAuthMode, setDonorAuthMode] = useState('signin');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [recyclerCode, setRecyclerCode] = useState('');
  
  // Feedback State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activePortal === 'donor') {
        if (donorAuthMode === 'register') {
          const res = await registerDonor(email, password, displayName, upiId);
          if (res.success) {
            onLoginSuccess('donor');
          }
        } else {
          const res = await loginUser(email, password, 'donor');
          if (res.success) {
            onLoginSuccess('donor');
          }
        }
      } else {
        // Authorized Recycler Login
        const res = await loginUser(email, password, 'recycler');
        if (res.success) {
          onLoginSuccess('recycler');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        onLoginSuccess('donor');
      }
    } catch (err) {
      setError('Google Authentication failed.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentView="auth" onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '40px 0 100px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          
          {/* Main Auth Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden'
          }} className="metrics-grid">
            
            {/* Left Decorative Info Column */}
            <div style={{ paddingRight: '20px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                <Sparkles size={14} />
                <span>EcoTrace Secure Auth Engine</span>
              </div>

              <h1 style={{ fontSize: '2.4rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' }}>
                {activePortal === 'donor' ? (
                  <>Circular Economy <span className="gradient-text">Donor Portal</span></>
                ) : (
                  <>Authorized <span className="gradient-text">Recycler &amp; Smelter Hub</span></>
                )}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
                {activePortal === 'donor' 
                  ? "Join India's AI-driven e-waste recycling movement. Snap device photos, receive sub-200ms camera valuation, instant direct UPI payouts, and track your carbon offset."
                  : "Authorized Industrial Smelter Portal. Access digital asset manifests, NIST 800-88 hardware destruction logs, CPCB Form-2 filings, and secondary metal bidding."
                }
              </p>

              {/* Feature Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {activePortal === 'donor' ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Instant Sub-200ms Camera Scanner AI</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Direct UPI Doorstep Cash Payouts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Verified Zero-Landfill ESG Badges</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <ShieldCheck size={20} color="#3B82F6" />
                      <span>CPCB &amp; EPR Compliance Form-2 Audit Engine</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <ShieldCheck size={20} color="#3B82F6" />
                      <span>NIST 800-88 Wiped Hardware Destruction Certs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                      <ShieldCheck size={20} color="#3B82F6" />
                      <span>Pre-Authorized Smelter Credentials Only</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Authentication Form Card */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              
              {/* TOP ROLE SWITCHER TABS */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: 'var(--bg-card)',
                padding: '6px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '28px',
                border: '1px solid var(--border-color)'
              }}>
                <button
                  type="button"
                  onClick={() => { setActivePortal('donor'); setError(''); }}
                  className={`btn ${activePortal === 'donor' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  <User size={16} />
                  <span>Donor Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActivePortal('recycler'); setError(''); }}
                  className={`btn ${activePortal === 'recycler' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  <Building2 size={16} />
                  <span>Authorized Recycler</span>
                </button>
              </div>

              {/* Sub-Header / Instructions */}
              <div style={{ marginBottom: '24px' }}>
                {activePortal === 'donor' ? (
                  <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setDonorAuthMode('signin')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: donorAuthMode === 'signin' ? 'var(--emerald-primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        borderBottom: donorAuthMode === 'signin' ? '2px solid var(--emerald-primary)' : 'none',
                        paddingBottom: '6px'
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonorAuthMode('register')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: donorAuthMode === 'register' ? 'var(--emerald-primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        borderBottom: donorAuthMode === 'register' ? '2px solid var(--emerald-primary)' : 'none',
                        paddingBottom: '6px'
                      }}
                    >
                      Register Account
                    </button>
                  </div>
                ) : (
                  <div className="badge badge-blue" style={{ width: '100%', justifyContent: 'center', padding: '8px' }}>
                    <Lock size={14} />
                    <span>Restricted Access • Pre-Authorized Credentials Only</span>
                  </div>
                )}
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #EF4444',
                  color: '#EF4444',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Full Name for Donor Registration */}
                {activePortal === 'donor' && donorAuthMode === 'register' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    {activePortal === 'donor' ? 'Email Address' : 'Authorized Corporate Email'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      required
                      placeholder={activePortal === 'donor' ? 'donor@example.com' : 'smelter.admin@recycling.co.in'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Optional UPI for Donor Registration */}
                {activePortal === 'donor' && donorAuthMode === 'register' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>UPI ID (Optional for instant cash payouts)</label>
                    <input
                      type="text"
                      placeholder="rahul@upi / 9876543210@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                )}

                {/* Optional Smelter Authorization Code for Recyclers */}
                {activePortal === 'recycler' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>CPCB Smelter License / Auth Code</label>
                    <input
                      type="text"
                      placeholder="CPCB-UP-2026-REC-04"
                      value={recyclerCode}
                      onChange={(e) => setRecyclerCode(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '1rem', fontWeight: '700' }}
                >
                  <span>
                    {loading ? 'Authenticating...' : activePortal === 'donor' 
                      ? (donorAuthMode === 'register' ? 'Create Donor Account' : 'Sign In as Donor')
                      : 'Authorized Smelter Login'
                    }
                  </span>
                  <ArrowRight size={18} />
                </button>

                {/* Google Sign In for Donors */}
                {activePortal === 'donor' && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleGoogleAuth}
                    style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                  >
                    <span>Continue with Google</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
