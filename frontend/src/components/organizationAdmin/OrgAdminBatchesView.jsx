import React, { useState } from 'react';
import { 
  Layers, 
  RefreshCw, 
  Search, 
  Filter, 
  Flame, 
  Award, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Sparkles,
  Scale
} from 'lucide-react';

export const OrgAdminBatchesView = ({
  batches = [],
  loading = false,
  onRefresh = () => {},
  onTransitionStatus = () => {},
  updatingBatchId = null,
  onOpenCertificateModal = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = 
      (batch.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (batch.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (batch.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (batch.certificateId || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && batch.status !== statusFilter) return false;
    return true;
  });

  const statusMap = {
    'ingestion': { label: 'Inbound Ingestion', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE', next: 'processing', nextLabel: 'To Dismantling' },
    'processing': { label: 'Dismantling & Shredding', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', next: 'smelting', nextLabel: 'To Hydro-Smelting' },
    'smelting': { label: 'Hydro-Smelting', color: '#EC4899', bg: '#FDF2F8', border: '#FBCFE8', next: 'completed', nextLabel: 'Certify & Complete' },
    'completed': { label: 'CPCB Certified', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', next: null, nextLabel: 'Certified' }
  };

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
              background: '#F5F3FF',
              color: '#6D28D9',
              border: '1px solid #DDD6FE',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Refinery &amp; Smelter
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Multi-Stage Hydro-Metallurgical Ingestion
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            E-Waste Ingestion Batches &amp; Smelting Pipeline
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Audit bulk consignments from corporate enterprises and field aggregates, progress batches through smelting stages, and generate official <strong>CPCB Form-2 Certificates</strong>.
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
          <span>{loading ? 'Refreshing...' : 'Sync Batches'}</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
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
            placeholder="Search Batch ID, Client, Category..."
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

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${batches.length})` },
            { id: 'ingestion', label: '1. Ingestion' },
            { id: 'processing', label: '2. Dismantling' },
            { id: 'smelting', label: '3. Smelting' },
            { id: 'completed', label: '4. Certified' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              style={{
                background: statusFilter === f.id ? '#0F172A' : '#F8FAFC',
                color: statusFilter === f.id ? '#FFFFFF' : '#475569',
                border: statusFilter === f.id ? '1px solid #0F172A' : '1px solid #E2E8F0',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.76rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minHeight: '32px'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Batches List Stream */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <RefreshCw size={30} className="spin-icon" style={{ margin: '0 auto 10px', color: '#10B981' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>Loading refinery batches from database...</div>
        </div>
      ) : filteredBatches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px dashed #CBD5E1' }}>
          <Layers size={36} color="#10B981" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>No Ingestion Batches Found</h3>
          <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto' }}>
            No smelting batches match your current filter selection.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredBatches.map(batch => {
            const conf = statusMap[batch.status] || statusMap['completed'];
            const isCompleted = batch.status === 'completed';
            const isUpdating = updatingBatchId === batch.id;

            return (
              <div
                key={batch.id}
                style={{
                  background: '#FFFFFF',
                  border: isCompleted ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: 'clamp(14px, 3vw, 22px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: '900',
                      color: '#0F172A',
                      background: '#F1F5F9',
                      padding: '3px 8px',
                      borderRadius: '7px',
                      fontSize: '0.82rem',
                      border: '1px solid #CBD5E1'
                    }}>
                      {batch.id}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: conf.bg,
                      color: conf.color,
                      border: `1px solid ${conf.border}`
                    }}>
                      ● {conf.label}
                    </span>

                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} />
                      <span>{batch.date || '2026-08-15'}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', margin: '0 0 3px', letterSpacing: '-0.01em' }}>
                    {batch.clientName}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px' }}>
                    Category: <strong style={{ color: '#0F172A' }}>{batch.category}</strong>
                  </div>

                  {/* Spec Strip */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '0.8rem',
                    color: '#64748B',
                    margin: '6px 0 8px',
                    flexWrap: 'wrap',
                    background: '#F8FAFC',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <span>⚖️ Net Mass: <strong style={{ color: '#0F172A' }}>{batch.weightKg} kg</strong></span>
                    <span>💰 Value: <strong style={{ color: '#059669' }}>₹{batch.revenue.toLocaleString()}</strong></span>
                    <span>🔬 Yield: <strong style={{ color: '#D97706' }}>{batch.metalsExpected}</strong></span>
                  </div>

                  {batch.certificateId && (
                    <div style={{ fontSize: '0.76rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                      <Award size={13} />
                      <span>Form-2 Legal ID: <strong style={{ fontFamily: 'monospace' }}>{batch.certificateId}</strong></span>
                    </div>
                  )}
                </div>

                {/* Right Action Box */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: 'auto', minWidth: 'min(100%, 180px)' }}>
                  {!isCompleted ? (
                    <button
                      onClick={() => onTransitionStatus(batch.id, batch.status)}
                      disabled={isUpdating}
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        minHeight: '38px'
                      }}
                    >
                      <Flame size={14} />
                      <span>{isUpdating ? 'Progressing...' : `${conf.nextLabel} →`}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenCertificateModal(batch)}
                      style={{
                        background: '#ECFDF5',
                        border: '1.5px solid #10B981',
                        color: '#047857',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontWeight: '800',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        minHeight: '38px'
                      }}
                    >
                      <Award size={15} />
                      <span>View Form-2</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
