import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { ConsumerApp } from './ConsumerApp';
import { 
  User, 
  Camera, 
  Leaf, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  LogOut, 
  Award, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight,
  List,
  Sparkles
} from 'lucide-react';

export const DonorDash = ({ onNavigate, onOpenRecyclerDash }) => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner', 'submissions', 'certificates'

  const userDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Eco-Donor';

  // Sample submission history
  const [submissions] = useState([
    { id: 'SUB-9821', item: 'Apple iPhone 11 Pro', date: '2026-08-12', value: '₹520', status: 'Pickup Completed', co2: '2.4 kg' },
    { id: 'SUB-9740', item: 'Dell Latitude Motherboard', date: '2026-08-09', value: '₹840', status: 'Payment Issued', co2: '4.8 kg' },
    { id: 'SUB-9611', item: 'Samsung Lithium-Ion Battery Pack', date: '2026-08-01', value: '₹260', status: 'Smelter Processed', co2: '1.2 kg' },
  ]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentView="donor-dash" onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '40px 0 100px' }}>
        <div className="container">
          
          {/* DONOR DASHBOARD HEADER BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.88)), url("/hero_ewaste_bg.jpg") center/cover no-repeat',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 40px',
            marginBottom: '32px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>Verified E-Waste Donor Account</span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '4px 0 8px', color: '#FFFFFF' }}>
                Welcome Back, <span className="gradient-text">{userDisplayName}</span>
              </h1>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>
                Track your e-waste contributions, UPI cash payouts, and Scope 3 carbon offset certificates.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                className="btn btn-outline btn-sm" 
                onClick={logout}
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* METRIC CHIPS BAR */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '36px' }} className="metrics-grid">
            <div className="metric-card" style={{ textAlign: 'left', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Total Earned Payouts</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>₹1,620</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct UPI Payouts Received</div>
            </div>

            <div className="metric-card" style={{ textAlign: 'left', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Devices Recycled</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>3 Items</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Zero-Landfill Verified</div>
            </div>

            <div className="metric-card" style={{ textAlign: 'left', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>Carbon Savings</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3B82F6' }}>8.4 kg CO₂</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scope 3 Abatement Math</div>
            </div>

            <div className="metric-card" style={{ textAlign: 'left', padding: '20px 24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '4px' }}>CPCB ESG Rating</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#8B5CF6' }}>Grade A+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Eco-Citizen Verified</div>
            </div>
          </div>

          {/* DASHBOARD TAB CONTROLS */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`btn ${activeTab === 'scanner' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              <Camera size={16} />
              <span>AI Camera Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`btn ${activeTab === 'submissions' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              <List size={16} />
              <span>Submissions &amp; Payout History</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`btn ${activeTab === 'certificates' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              <Award size={16} />
              <span>Zero-Landfill Certificates</span>
            </button>
          </div>

          {/* TAB 1: AI CAMERA SCANNER ENGINE */}
          {activeTab === 'scanner' && (
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <ConsumerApp 
                onBackToLanding={() => setActiveTab('submissions')}
                onOpenRecyclerDash={onOpenRecyclerDash}
              />
            </div>
          )}

          {/* TAB 2: SUBMISSIONS HISTORY */}
          {activeTab === 'submissions' && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px' }}>Your Submissions &amp; Payout Logs</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '12px' }}>ID</th>
                      <th style={{ padding: '12px' }}>Device</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Cash Quote</th>
                      <th style={{ padding: '12px' }}>CO₂ Saved</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '14px 12px', fontWeight: '700', color: 'var(--emerald-primary)' }}>{s.id}</td>
                        <td style={{ padding: '14px 12px', fontWeight: '600' }}>{s.item}</td>
                        <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>{s.date}</td>
                        <td style={{ padding: '14px 12px', fontWeight: '700' }}>{s.value}</td>
                        <td style={{ padding: '14px 12px', color: '#3B82F6' }}>{s.co2}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ESG CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="feature-card" style={{ padding: '28px' }}>
                <Award size={36} color="#10B981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px' }}>CPCB Citizen Circularity Certificate</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Issued to {userDisplayName} for successfully diverting 3 electronic components from municipal landfills.
                </p>
                <div className="badge badge-emerald">Verified ISO 14001 Audit Ready</div>
              </div>

              <div className="feature-card" style={{ padding: '28px' }}>
                <ShieldCheck size={36} color="#3B82F6" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px' }}>NIST 800-88 Data Sanitization Guarantee</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  All flash memory and magnetic drives associated with your submitted devices received certified data wiping.
                </p>
                <div className="badge badge-blue">Zero Security Liability</div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
