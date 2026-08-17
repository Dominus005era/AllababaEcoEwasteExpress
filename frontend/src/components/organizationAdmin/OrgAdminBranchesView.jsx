import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Search
} from 'lucide-react';

export const OrgAdminBranchesView = ({
  branches = [],
  loading = false,
  onRefresh = () => {},
  onOpenAddBranch = () => {},
  onOpenEditBranch = () => {},
  onDeleteBranch = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBranches = branches.filter(b => 
    (b.branchName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.branchCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.managerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.address || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              background: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Regional Network
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Base &amp; Smelter Facilities Directory
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Organization Regional Branches &amp; Depot Bases
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Manage authorized processing facilities, smelting depots, gatehouses, and in-charge contacts. Registered branches appear dynamically in field recyclers' routing dropdowns.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenAddBranch}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '11px',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              minHeight: '38px'
            }}
          >
            <PlusCircle size={15} />
            <span>+ New Base Branch</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={loading}
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '9px 12px',
              borderRadius: '11px',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              minHeight: '38px'
            }}
          >
            <RefreshCw size={14} className={loading ? "spin-icon" : ""} color="#10B981" />
          </button>
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
            placeholder="Search Branch Name, Code, District, Manager..."
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
          <strong>{filteredBranches.length}</strong> of <strong>{branches.length}</strong> Bases
        </div>
      </div>

      {/* Branch Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <RefreshCw size={30} className="spin-icon" style={{ margin: '0 auto 10px', color: '#10B981' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>Loading branches from database...</div>
        </div>
      ) : filteredBranches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px dashed #CBD5E1' }}>
          <Building2 size={36} color="#10B981" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>No Regional Facilities Found</h3>
          <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto 12px' }}>
            Register your organization's smelting and intake depot branches so field recyclers can route collection lots here.
          </p>
          <button
            onClick={onOpenAddBranch}
            style={{
              background: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            + Add First Branch Base
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {filteredBranches.map(b => (
            <div
              key={b.branchId}
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
                {/* Top Code & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontWeight: '900',
                    color: '#0F172A',
                    background: '#F1F5F9',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    border: '1px solid #CBD5E1'
                  }}>
                    {b.branchId}
                  </span>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    padding: '2px 7px',
                    borderRadius: '6px',
                    background: '#ECFDF5',
                    color: '#047857',
                    border: '1px solid #A7F3D0'
                  }}>
                    {b.branchCode || 'Active Hub'}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 5px', fontSize: '1.1rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                  {b.branchName}
                </h3>

                <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '10px', lineHeight: '1.4' }}>
                  📍 {b.address}
                </div>

                {/* Designated In-Charge Box */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ color: '#64748B', fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Gatehouse In-Charge:
                  </div>
                  <div style={{ fontWeight: '800', color: '#0F172A' }}>
                    👤 {b.managerName}
                  </div>
                  <div style={{ color: '#059669', fontFamily: 'monospace', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={11} />
                    <span>{b.managerPhone}</span>
                  </div>
                  {b.managerEmail && (
                    <div style={{ color: '#64748B', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Mail size={11} />
                      <span>{b.managerEmail}</span>
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2px',
                    paddingTop: '4px',
                    borderTop: '1px dashed #E2E8F0',
                    fontSize: '0.72rem',
                    color: '#64748B'
                  }}>
                    <span>Dock: <strong style={{ color: '#0F172A' }}>{b.gatehouseDockNo || 'Scale 1'}</strong></span>
                    <span>Hours: <strong style={{ color: '#0F172A' }}>{b.operatingHours}</strong></span>
                  </div>
                </div>

                {/* GPS Tag */}
                <div style={{ fontSize: '0.72rem', color: '#0369A1', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={11} />
                  <span>GPS: [{b.coordsLat}, {b.coordsLng}] ({b.district})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                <button
                  onClick={() => onOpenEditBranch(b)}
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#334155',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    minHeight: '34px'
                  }}
                >
                  <Edit3 size={12} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => onDeleteBranch(b.branchId, b.branchName)}
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
                    padding: '7px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    minHeight: '34px'
                  }}
                >
                  <Trash2 size={12} />
                  <span>Remove</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
