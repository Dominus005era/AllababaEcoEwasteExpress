import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { 
  FileText, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Key, 
  Leaf, 
  Building2, 
  Truck, 
  User
} from 'lucide-react';

export const AdminDppPassports = () => {
  const [passports, setPassports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPassport, setSelectedPassport] = useState(null);

  const fetchPassports = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getDppPassports();
      if (res.passports) {
        setPassports(res.passports);
      }
    } catch (err) {
      console.error('Error fetching DPP passports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassports();
  }, []);

  const filteredPassports = passports.filter(p => {
    if (!search) return true;
    const s = search.toLowerCase();
    return p.dppId?.toLowerCase().includes(s) ||
           p.requestId?.toLowerCase().includes(s) ||
           p.donorName?.toLowerCase().includes(s) ||
           p.deviceName?.toLowerCase().includes(s) ||
           p.assignedRecycler?.toLowerCase().includes(s);
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge badge-blue" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '6px' }}>
            <FileText size={13} />
            <span>IMMUTABLE CIRCULAR AUDIT • EU DPP &amp; CPCB COMPLIANCE</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            Digital Product Passports (DPP) Circular Governance Hub
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Audit cryptographic digital passports tracking each electronic device trajectory from consumer camera scan to verified smelter recovery.
          </p>
        </div>

        <button 
          onClick={fetchPassports} 
          disabled={loading}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Refresh Passports</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', maxWidth: '480px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by DPP ID, Order ID, Donor, or Device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '9px 12px 9px 36px',
              color: 'var(--text-primary)',
              fontSize: '0.86rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Passports Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 16px' }}>DPP PASSPORT ID</th>
                <th style={{ padding: '12px 16px' }}>ORDER REF</th>
                <th style={{ padding: '12px 16px' }}>DEVICE ASSET</th>
                <th style={{ padding: '12px 16px' }}>DONOR / ORIGIN</th>
                <th style={{ padding: '12px 16px' }}>ASSIGNED RECYCLER</th>
                <th style={{ padding: '12px 16px' }}>VERIFICATION PIN</th>
                <th style={{ padding: '12px 16px' }}>DPP STATUS</th>
                <th style={{ padding: '12px 16px' }}>CO2 OFFSET</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#10B981' }}>
                    <RefreshCw size={22} className="spin" style={{ margin: '0 auto 8px' }} />
                    <span>Querying Digital Product Passports from MySQL...</span>
                  </td>
                </tr>
              ) : filteredPassports.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No Digital Product Passports found.
                  </td>
                </tr>
              ) : (
                filteredPassports.map((dpp) => {
                  const isVerified = dpp.dppStatus === 'verified_and_sealed' || dpp.orderStatus === 'Completed' || dpp.orderStatus === 'Processed at Smelter';
                  return (
                    <tr key={dpp.requestId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '800', color: '#3B82F6', fontFamily: 'monospace' }}>
                        {dpp.dppId}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                        {dpp.requestId}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{dpp.deviceName}</strong>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Condition: {dpp.physicalCondition}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div>{dpp.donorName}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                        {dpp.assignedRecycler}
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Agent: {dpp.assignedAgent} ({dpp.vehicleNo})</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '800', color: '#F59E0B' }}>
                          🔑 {dpp.verificationPin}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className={`badge ${isVerified ? 'badge-emerald' : 'badge-yellow'}`} style={{ fontSize: '0.72rem' }}>
                          {isVerified ? '✓ VERIFIED & SEALED' : '⏳ IN-TRANSIT CUSTODY'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.74rem' }}>
                          <Leaf size={11} />
                          <span>{dpp.co2SavedKg} kg</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
