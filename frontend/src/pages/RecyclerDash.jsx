import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  BarChart3, 
  Wrench, 
  Settings, 
  Search, 
  Bell, 
  User, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Filter, 
  RefreshCw,
  Sun,
  Moon,
  Leaf,
  DollarSign,
  Cpu
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const RecyclerDash = ({ onBackToLanding }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // Mock Pickup Requests mirroring video frame 8 & 9
  const [requests, setRequests] = useState([
    {
      id: 'ID#4932',
      device: 'Smartphone',
      timestamp: 'Marnay 10 - 1:12 AM - 6:00 PM',
      materials: 'Emerrogle, PCBs, RCBS',
      value: 450,
      status: 'Ready for Pickup',
      highlight: true
    },
    {
      id: 'MPK | V076206',
      device: 'Laptop Motherboard',
      timestamp: 'Decuty 2024 - 20 PSP 310 PM',
      materials: 'Anticrica, Copper, Chips',
      value: 750,
      status: 'Pending Dispatch',
      highlight: false
    },
    {
      id: 'ID#4933',
      device: 'Smartphone',
      timestamp: 'Decuty 2024 - 21 00:00 PM',
      materials: 'Hlsmsfank, PCBs, Lithium',
      value: 450,
      status: 'In Transit',
      highlight: false
    },
    {
      id: 'ID#4934',
      device: 'LCD Monitor Display',
      timestamp: 'Decuty 2024 - 22 10:00 AM',
      materials: 'Datmage, Glass, Aluminum',
      value: 620,
      status: 'Ready for Pickup',
      highlight: false
    }
  ]);

  const handleAcceptRequest = (id) => {
    setAcceptedRequests((prev) => [...prev, id]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside style={{
        width: '260px',
        background: '#0F172A',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 32px' }}>
          <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
            <Leaf size={20} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.25rem', color: '#FFFFFF' }}>
            Recycler <span style={{ color: '#10B981' }}>EcoTrace</span>
          </span>
        </div>

        {/* Menu Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'home' ? 'var(--emerald-primary)' : 'transparent',
              color: activeTab === 'home' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Home size={18} />
            <span>Dashboard Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('requests')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'requests' ? 'var(--emerald-primary)' : 'transparent',
              color: activeTab === 'requests' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Package size={18} />
            <span>Pickup Requests</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'analytics' ? 'var(--emerald-primary)' : 'transparent',
              color: activeTab === 'analytics' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <BarChart3 size={18} />
            <span>Analytics & ESG</span>
          </button>

          <button 
            onClick={() => setActiveTab('diagnostics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'diagnostics' ? 'var(--emerald-primary)' : 'transparent',
              color: activeTab === 'diagnostics' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Wrench size={18} />
            <span>Diagnostics</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'settings' ? 'var(--emerald-primary)' : 'transparent',
              color: activeTab === 'settings' ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Back to Landing Button */}
        <button className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }} onClick={onBackToLanding}>
          <ArrowLeft size={16} />
          <span>Exit Dashboard</span>
        </button>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Bar */}
        <header style={{
          height: '70px',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)'
        }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: 'var(--radius-md)', width: '360px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search E-waste requests, ID #..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%' }}
            />
          </div>

          {/* Status & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="badge badge-emerald">
              <span className="pulse-dot"></span>
              <span>Authorized Recycler • On Duty</span>
            </div>

            <button onClick={toggleTheme} className="theme-toggle-btn" style={{ width: '36px', height: '36px' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: '700' }}>
                AR
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <div style={{ fontWeight: '700' }}>GreenDrop Recyclers</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID #REC-8849</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          
          {/* Title Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Recycler Dashboard</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Real-time incoming e-waste bids and collection requests.</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setRequests([...requests])}>
              <RefreshCw size={14} />
              <span>Refresh Feed</span>
            </button>
          </div>

          {/* Top Metric Stat Cards (Mirroring Video Frame 8) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Baxer Policy Volume</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>4,956 kg</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Sharpted Pick-up Avg</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>₹462</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Deffee Itse Material</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>4,500.30</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Asstencet F Pick-up</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>1,198.88 CO₂</div>
            </div>
          </div>

          {/* Highlighted Banner Alert (Video Frame 8/9 exact match) */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
            border: '2px solid var(--emerald-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-emerald)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>LIVE ALERT</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.02em' }}>
                ID#4932 - Smartphone - Ready for Pickup - ₹450
              </span>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleAcceptRequest('ID#4932')}
              disabled={acceptedRequests.includes('ID#4932')}
            >
              {acceptedRequests.includes('ID#4932') ? 'Accepted ✓' : 'Reply Now / Claim Pickup'}
            </button>
          </div>

          {/* Table Container */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Incoming E-Waste Collection Queue</h3>
              <span className="badge badge-blue">{requests.length} Requests Available</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 24px' }}>Request ID & Device</th>
                  <th style={{ padding: '16px 24px' }}>Pickup Slot / Time</th>
                  <th style={{ padding: '16px 24px' }}>Recoverable Materials</th>
                  <th style={{ padding: '16px 24px' }}>Offered Value</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => {
                  const isAccepted = acceptedRequests.includes(req.id);
                  return (
                    <tr 
                      key={req.id} 
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: req.highlight ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                        transition: 'background var(--transition-fast)'
                      }}
                    >
                      <td style={{ padding: '18px 24px' }}>
                        <div style={{ fontWeight: '700', fontSize: '1rem', color: req.highlight ? 'var(--emerald-primary)' : 'var(--text-primary)' }}>
                          {req.id}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.device}</div>
                      </td>

                      <td style={{ padding: '18px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} color="var(--emerald-primary)" />
                          <span>{req.timestamp}</span>
                        </div>
                      </td>

                      <td style={{ padding: '18px 24px' }}>
                        <span className="mat-tag" style={{ background: 'var(--bg-secondary)', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '6px' }}>
                          {req.materials}
                        </span>
                      </td>

                      <td style={{ padding: '18px 24px', fontWeight: '800', fontSize: '1.1rem', color: 'var(--emerald-primary)' }}>
                        ₹{req.value}
                      </td>

                      <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                        <button 
                          className={`btn ${isAccepted ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                          onClick={() => handleAcceptRequest(req.id)}
                          disabled={isAccepted}
                        >
                          {isAccepted ? 'Accepted ✓' : 'Reply Now'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
