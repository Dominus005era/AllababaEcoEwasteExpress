import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Building2, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  CreditCard
} from 'lucide-react';

export const AuthPage = ({ initialRole = 'donor', onNavigate, onLoginSuccess }) => {
  const { registerDonor, registerRecycler, loginUser, loginWithGoogle } = useAuth();
  
  // Active Portal Role: strictly 'donor' or 'recycler'
  const [activePortal, setActivePortal] = useState(initialRole === 'admin' ? 'donor' : initialRole);
  
  // Auth Mode: 'signin' or 'register'
  const [authMode, setAuthMode] = useState('signin');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [recyclerCode, setRecyclerCode] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Feedback State
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (activePortal === 'donor') {
        if (authMode === 'register') {
          const res = await registerDonor(email, password, displayName, upiId);
          if (res.success) {
            setSuccessMsg(res.message || 'Donor Account Registered Successfully!');
            setTimeout(() => {
              onLoginSuccess('donor');
            }, 800);
          }
        } else {
          const res = await loginUser(email, password, 'donor');
          if (res.success) {
            onLoginSuccess('donor');
          }
        }
      } else if (activePortal === 'recycler') {
        if (authMode === 'register') {
          if (!companyName) {
            throw new Error('Organization / Company Name is required.');
          }
          if (!recyclerCode || recyclerCode.trim().length < 4) {
            throw new Error('CPCB Smelter License Code is required for Recycler Registration.');
          }
          const res = await registerRecycler(
            email, 
            password, 
            companyName, 
            upiId, 
            recyclerCode, 
            displayName, 
            phone, 
            address
          );
          if (res.success) {
            setSuccessMsg(res.message || 'Recycler Registered Successfully under Organization!');
            setTimeout(() => {
              onLoginSuccess('recycler');
            }, 1000);
          }
        } else {
          if (!recyclerCode || recyclerCode.trim().length < 4) {
            throw new Error('Access Denied: CPCB Smelter License / Unique Recycler ID is strictly required.');
          }
          const res = await loginUser(email, password, 'recycler', recyclerCode);
          if (res.success) {
            onLoginSuccess('recycler');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
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

      <main className="auth-page-main">
        <div className="auth-card-container">
          
          {/* Main Auth Grid */}
          <div className="auth-grid">
            
            {/* Left Info Column */}
            <div className="auth-info-col">
              <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>
                <Sparkles size={14} />
                <span>EcoTrace Secure JWT Authentication</span>
              </div>

              <h1 className="auth-title">
                {activePortal === 'donor' && <>Circular Economy <span className="gradient-text">Donor Portal</span></>}
                {activePortal === 'recycler' && <>Authorized <span className="gradient-text">Recycler Hub</span></>}
              </h1>

              <p className="auth-subtitle">
                {activePortal === 'donor' && "Access verified donor features. Scan electronics, obtain AI metal valuations, dispatch doorstep pickups to certified smelters, and receive instant UPI payouts."}
                {activePortal === 'recycler' && "Secure portal for authorized recycling personnel. Validate against CPCB license database, manage incoming scrap dispatches, and process live metal recovery."}
              </p>

              <div className="auth-feature-list">
                {activePortal === 'donor' && (
                  <>
                    <div className="auth-feature-item">
                      <CheckCircle2 size={18} color="#10B981" />
                      <span>Strict Email &amp; Password Account Verification</span>
                    </div>
                    <div className="auth-feature-item">
                      <CheckCircle2 size={18} color="#10B981" />
                      <span>Instant UPI Direct Settlement on Pickup Complete</span>
                    </div>
                    <div className="auth-feature-item">
                      <CheckCircle2 size={18} color="#10B981" />
                      <span>Verified Traceability Certificate Generation</span>
                    </div>
                  </>
                )}

                {activePortal === 'recycler' && (
                  <>
                    <div className="auth-feature-item">
                      <ShieldCheck size={18} color="#3B82F6" />
                      <span>Authorized Organization &amp; CPCB Smelter License Match</span>
                    </div>
                    <div className="auth-feature-item">
                      <ShieldCheck size={18} color="#3B82F6" />
                      <span>Assigned Recycler Personnel Platform Verification</span>
                    </div>
                    <div className="auth-feature-item">
                      <ShieldCheck size={18} color="#3B82F6" />
                      <span>Live Donor Order Acceptance &amp; Multiplier Controls</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Authentication Form Card */}
            <div className="auth-form-card">
              
              {/* TOP ROLE SWITCHER TABS (Donor vs Recycler) */}
              <div className="auth-role-tabs">
                <button
                  type="button"
                  onClick={() => { 
                    setActivePortal('donor'); 
                    setError(''); 
                    setSuccessMsg(''); 
                  }}
                  className={`auth-role-tab-btn ${activePortal === 'donor' ? 'active' : ''}`}
                >
                  <User size={15} />
                  <span>Donor Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => { 
                    setActivePortal('recycler'); 
                    setError(''); 
                    setSuccessMsg(''); 
                  }}
                  className={`auth-role-tab-btn ${activePortal === 'recycler' ? 'active role-recycler' : ''}`}
                >
                  <Building2 size={15} />
                  <span>Recycler Hub</span>
                </button>
              </div>

              {/* MODE SWITCHER FOR DONOR / RECYCLER */}
              <div className="auth-mode-toggle">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setError(''); setSuccessMsg(''); }}
                  className={`auth-mode-btn ${authMode === 'signin' ? 'active' : ''}`}
                >
                  {activePortal === 'donor' ? 'Sign In' : 'Recycler Login'}
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setError(''); setSuccessMsg(''); }}
                  className={`auth-mode-btn ${authMode === 'register' ? 'active' : ''}`}
                >
                  {activePortal === 'donor' ? 'Register Account' : 'Register Recycler'}
                </button>
              </div>

              {/* ERROR ALERT WITH DYNAMIC AUTO-SWITCH CTAS */}
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#EF4444',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ flex: 1, lineHeight: '1.4' }}>{error}</span>
                  </div>

                  {/* If user attempted signin with an unregistered email -> Provide instant button to switch to Register */}
                  {authMode === 'signin' && (error.toLowerCase().includes('not registered') || error.toLowerCase().includes('create an account') || error.toLowerCase().includes('not completed registration')) && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setError('');
                        setSuccessMsg(`Switched to registration for "${email}". Fill in required fields to register.`);
                      }}
                      style={{
                        alignSelf: 'flex-start',
                        marginLeft: '25px',
                        background: activePortal === 'donor' ? 'var(--emerald-primary)' : '#3B82F6',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{activePortal === 'donor' ? 'Register Account Now' : 'Register Recycler Now'}</span>
                      <ArrowRight size={13} />
                    </button>
                  )}

                  {/* If user attempted register with an already registered email -> Provide button to switch to Sign In */}
                  {authMode === 'register' && error.toLowerCase().includes('already registered') && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setError('');
                      }}
                      style={{
                        alignSelf: 'flex-start',
                        marginLeft: '25px',
                        background: 'var(--emerald-primary)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Sign In Instead</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              )}

              {/* SUCCESS ALERT */}
              {successMsg && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Recycler Register: Organization Name */}
                {activePortal === 'recycler' && authMode === 'register' && (
                  <div className="auth-input-group">
                    <label className="auth-input-label">Recycling Organization / Company Name *</label>
                    <div className="auth-input-wrapper">
                      <Building2 size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. CleanMetal Refineries Pvt Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                {/* Recycler Register: Representative / Recycler Name */}
                {activePortal === 'recycler' && authMode === 'register' && (
                  <div className="auth-input-group">
                    <label className="auth-input-label">Recycler Full Name / Representative Name *</label>
                    <div className="auth-input-wrapper">
                      <User size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anil Sharma"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                {/* Donor Register: Full Name */}
                {activePortal === 'donor' && authMode === 'register' && (
                  <div className="auth-input-group">
                    <label className="auth-input-label">Full Name</label>
                    <div className="auth-input-wrapper">
                      <User size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div className="auth-input-group">
                  <label className="auth-input-label">
                    {activePortal === 'donor' ? 'Donor Email Address' : 'Corporate Email Address (Issued by Org)'}
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} className="auth-input-icon" />
                    <input
                      type="email"
                      required
                      placeholder={activePortal === 'donor' ? "Enter registered email" : "e.g. anil.sharma@cleanmetal.in"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                {/* Recycler: CPCB Smelter License Code */}
                {activePortal === 'recycler' && (
                  <div className="auth-input-group">
                    <label className="auth-input-label" style={{ color: 'var(--text-primary)' }}>
                      CPCB Smelter License Code / Authorized Recycler ID *
                    </label>
                    <div className="auth-input-wrapper">
                      <FileCheck size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. CPCB-MH-2026-REC-1042"
                        value={recyclerCode}
                        onChange={(e) => setRecyclerCode(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="auth-input-group">
                  <label className="auth-input-label">
                    {activePortal === 'donor' ? 'Password' : (authMode === 'register' ? 'Authorization Password (Issued by Org)' : 'Account Password')}
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-input-icon" />
                    <input
                      type="password"
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                {/* UPI ID for Donor / Recycler Register */}
                {authMode === 'register' && (
                  <div className="auth-input-group">
                    <label className="auth-input-label">UPI ID / Virtual Payment Address (for Instant Scrap Payouts)</label>
                    <div className="auth-input-wrapper">
                      <CreditCard size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. name@oksbi or company@okhdfc"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary auth-submit-btn"
                  disabled={loading}
                >
                  <span>
                    {loading ? 'Verifying Credentials...' : activePortal === 'donor' 
                      ? (authMode === 'register' ? 'Create Donor Account' : 'Sign In as Donor')
                      : (authMode === 'register' ? 'Register Recycler Profile' : 'Sign In to Recycler Hub')
                    }
                  </span>
                  <ArrowRight size={16} />
                </button>

                {activePortal === 'donor' && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleGoogleAuth}
                    style={{ width: '100%', padding: '11px', fontSize: '0.88rem', borderRadius: 'var(--radius-md)' }}
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
