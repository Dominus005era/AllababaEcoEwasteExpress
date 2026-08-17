import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  RefreshCw, 
  Building2, 
  ShieldCheck, 
  Award, 
  FileText, 
  DollarSign, 
  MapPin, 
  Phone, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const OrgAdminCorporateClientsView = ({
  clients = [],
  loading = false,
  onRefresh = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(c => 
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.contact || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.complianceStatus || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCorporateTonnage = clients.reduce((acc, c) => acc + (c.volumeTonnage || 0), 0);
  const totalCorporateRevenue = clients.reduce((acc, c) => acc + (c.totalRevenue || 0), 0);

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
      
      {/* View Header Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: 'clamp(16px, 3vw, 24px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Enterprise B2B Roster
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              EPR Compliance &amp; Bulk Contracts
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Corporate Clients &amp; EPR Contracts
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Manage bulk commercial disposal contracts with technology parks, IT campuses, and hospital networks. Track authorized CPCB Form-2 certificates and ESG carbon credits.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            padding: '9px 16px',
            borderRadius: '11px',
            fontSize: '0.84rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            minHeight: '38px'
          }}
        >
          <RefreshCw size={14} className={loading ? "spin-icon" : ""} color="#10B981" />
          <span>{loading ? 'Refreshing...' : 'Sync Clients'}</span>
        </button>
      </div>

      {/* Metric Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contracted Enterprises</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em' }}>
            {clients.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Active institutional accounts</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Corporate Tonnage</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#059669', letterSpacing: '-0.02em' }}>
            {totalCorporateTonnage.toFixed(1)} <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748B' }}>MT</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Recycled institutional mass</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Refinery Revenue</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em' }}>
            ₹{totalCorporateRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>Commercial recycling gross</div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 'min(100%, 200px)' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Corporate Partner, Officer, City..."
            style={{
              width: '100%',
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '9px 12px 9px 36px',
              fontSize: '0.84rem',
              color: '#0F172A',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>
          Showing <strong>{filteredClients.length}</strong> Partner Clients
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
        {filteredClients.map(client => (
          <div
            key={client.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              padding: 'clamp(16px, 3vw, 22px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              boxSizing: 'border-box'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: '900',
                  color: '#0F172A',
                  background: '#F1F5F9',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  border: '1px solid #CBD5E1'
                }}>
                  {client.id}
                </span>

                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: client.complianceStatus.includes('Certified') ? '#ECFDF5' : '#EFF6FF',
                  color: client.complianceStatus.includes('Certified') ? '#047857' : '#1D4ED8',
                  border: client.complianceStatus.includes('Certified') ? '1px solid #A7F3D0' : '1px solid #BFDBFE'
                }}>
                  ✓ {client.complianceStatus}
                </span>
              </div>

              <h3 style={{ margin: '0 0 5px', fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                {client.name}
              </h3>

              <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '10px' }}>
                Contact: <strong style={{ color: '#0F172A' }}>{client.contact}</strong> • 📍 {client.city}
              </div>

              {/* Stats Box */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Recycled Mass</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#059669' }}>{client.volumeTonnage} MT</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Gross Revenue</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A' }}>₹{client.totalRevenue?.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: '#0369A1' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={12} />
                <span>EPR Scope 3 Certified</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
