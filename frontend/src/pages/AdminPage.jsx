import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Construction, 
  Building2, 
  Users, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Key,
  Clock
} from 'lucide-react';

export const AdminPage = ({ onNavigate }) => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentView="admin" onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '60px 0 100px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          
          {/* UNDER CONSTRUCTION NOTICE BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.12), rgba(245, 158, 11, 0.05))',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 32px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              flexShrink: 0
            }}>
              <Construction size={28} />
            </div>
            <div>
              <div className="badge badge-yellow" style={{ marginBottom: '6px', background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
                <Clock size={12} style={{ marginRight: '4px' }} />
                <span>Feature Under Active Development</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '2px 0 4px', color: 'var(--text-primary)' }}>
                EcoTrace Admin Monitoring Console — Under Construction
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                The Super Admin Portal for monitoring global user accounts, CPCB smelter approvals, and automated EPR compliance audits will open soon in the next release update.
              </p>
            </div>
          </div>

          {/* ADMIN LOGIN CARD */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '44px 40px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <ShieldCheck size={14} />
                <span>Restricted Super Admin Area</span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>
                EcoTrace Admin Sign In
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Sign in with root administrator credentials to provision recycler accounts and manage donor logs.
              </p>
            </div>

            {submitted ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid var(--emerald-primary)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <Sparkles size={32} color="#10B981" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '8px' }}>
                  Admin Authorization Pending
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Your admin access request has been recorded. Full admin console controls will activate automatically once full launch occurs.
                </p>
                <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
                  <span>Back to Sign In</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px', margin: '0 auto' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Admin Username / Email</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@ecotrace.ai"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Master Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Security Access Key</label>
                  <input
                    type="text"
                    required
                    placeholder="ECO-KEY-ROOT-9821"
                    value={adminSecretKey}
                    onChange={(e) => setAdminSecretKey(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: '700', marginTop: '10px' }}
                >
                  <span>Authenticate Super Admin</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
