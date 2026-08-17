import React, { useState } from 'react';
import { 
  QrCode, 
  Package, 
  Search, 
  Filter, 
  UserCheck, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  DollarSign, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const OrgAdminPickupAllocationsView = ({
  incomingRequests = [],
  loading = false,
  onRefresh = () => {},
  onOpenAllocateModal = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = incomingRequests.filter(req => {
    const matchesSearch = 
      (req.requestId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.deviceName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.donorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.dppId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.address || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    const isAllocated = Boolean(req.dppId && req.dppStatus !== 'pending_allocation');
    const isPickedUp = req.status === 'picked_up' || req.status === 'Deposited at Hub';

    if (statusFilter === 'pending') return !isAllocated && !isPickedUp;
    if (statusFilter === 'allocated') return isAllocated && !isPickedUp;
    if (statusFilter === 'picked_up') return isPickedUp;
    return true;
  });

  const pendingCount = incomingRequests.filter(r => !r.dppId || r.dppStatus === 'pending_allocation').length;
  const allocatedCount = incomingRequests.filter(r => r.dppId && r.status !== 'picked_up' && r.status !== 'Deposited at Hub').length;
  const completedCount = incomingRequests.filter(r => r.status === 'picked_up' || r.status === 'Deposited at Hub').length;

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
      
      {/* View Header & Metric Banner */}
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
              background: '#ECFDF5',
              color: '#059669',
              border: '1px solid #A7F3D0',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Citizen Inbound Orders
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Live MySQL Pipeline
            </span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Inbound Citizen Pickups &amp; DPP Allocation
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Review incoming donor e-waste orders, allocate certified field recyclers, and issue real-time <strong>Digital Product Passports (DPP)</strong> with unique Handover PINs.
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
          <span>{loading ? 'Refreshing...' : 'Refresh Orders'}</span>
        </button>
      </div>

      {/* KPI Metric Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '12px' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '16px 18px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Allocation
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#F59E0B', letterSpacing: '-0.02em' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
            Require worker dispatch &amp; DPP
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '16px 18px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Allocated &amp; Active DPP
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#3B82F6', letterSpacing: '-0.02em' }}>
            {allocatedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
            En route with field workers
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '16px 18px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Confirmed Handovers
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#10B981', letterSpacing: '-0.02em' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
            PIN verified &amp; deposited at depot
          </div>
        </div>
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
        {/* Search Box */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 'min(100%, 200px)' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Device, Donor, DPP..."
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

        {/* Status Filter Chips */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', width: 'auto' }}>
          {[
            { id: 'all', label: `All (${incomingRequests.length})` },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'allocated', label: `Allocated (${allocatedCount})` },
            { id: 'picked_up', label: `Handover (${completedCount})` }
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

      {/* Orders List Stream */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <RefreshCw size={30} className="spin-icon" style={{ margin: '0 auto 10px', color: '#10B981' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>Fetching live pickup requests from database...</div>
          <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>Connecting to centralized dispatch queue</div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px', background: '#FFFFFF', borderRadius: '18px', border: '1px dashed #CBD5E1' }}>
          <Package size={36} color="#10B981" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 4px', color: '#0F172A' }}>No Inbound Orders Found</h3>
          <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto' }}>
            {searchQuery || statusFilter !== 'all' 
              ? 'No pickup requests match your filter criteria. Try resetting the filters.'
              : 'When citizens in your district scan devices and request e-waste collection, orders will appear here automatically.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredRequests.map(req => {
            const isAllocated = Boolean(req.dppId && req.dppStatus !== 'pending_allocation');
            const isPickedUp = req.status === 'picked_up' || req.status === 'Deposited at Hub';

            return (
              <div
                key={req.requestId}
                style={{
                  background: '#FFFFFF',
                  border: isAllocated ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: 'clamp(14px, 3vw, 20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              >
                {/* Top Row: IDs, Badges & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '2px 8px', borderRadius: '7px' }}>
                      ⚡ MOCK / DUMMY ENTRY
                    </span>

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
                      {req.requestId}
                    </span>

                    {isAllocated && (
                      <span style={{
                        background: '#ECFDF5',
                        color: '#047857',
                        border: '1px solid #A7F3D0',
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '7px',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <QrCode size={12} />
                        <span>DPP: {req.dppId}</span>
                      </span>
                    )}

                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} />
                      <span>{req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-GB') : 'Today'}</span>
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: isPickedUp ? '#ECFDF5' : isAllocated ? '#EFF6FF' : '#FFFBEB',
                    color: isPickedUp ? '#047857' : isAllocated ? '#1D4ED8' : '#B45309',
                    border: isPickedUp ? '1px solid #A7F3D0' : isAllocated ? '1px solid #BFDBFE' : '1px solid #FDE68A'
                  }}>
                    ● {isPickedUp ? 'Handover Confirmed' : isAllocated ? 'Recycler Allocated' : 'Pending Allocation'}
                  </span>
                </div>

                {/* Middle Info Row: Device Details & Financial Payout */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '12px'
                }}>
                  <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '900', margin: '0 0 3px', color: '#0F172A', letterSpacing: '-0.01em' }}>
                      {req.deviceName || 'Electronic Equipment'}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span>Brand: <strong style={{ color: '#0F172A' }}>{req.brand || 'Verified'}</strong></span>
                      <span>•</span>
                      <span>Model: <strong style={{ color: '#0F172A' }}>{req.modelName || req.deviceName}</strong></span>
                      <span>•</span>
                      <span>Condition: <span style={{ color: '#059669', fontWeight: '800' }}>{req.physicalCondition || 'Operational'}</span></span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#059669', letterSpacing: '-0.02em' }}>
                      ₹{parseFloat(req.offeredPrice || 0).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      UPI Cash Payout
                    </div>
                  </div>
                </div>

                {/* Logistics & Address Spec Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '10px',
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '0.8rem',
                  border: '1px solid #E2E8F0'
                }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>Donor:</span>
                    <strong style={{ color: '#0F172A' }}>{req.donorName || 'Registered Donor'}</strong>
                    {req.donorPhone && <span style={{ color: '#64748B', marginLeft: '4px' }}>({req.donorPhone})</span>}
                  </div>

                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>Pickup Slot:</span>
                    <strong style={{ color: '#0F172A' }}>{req.pickupTime || 'Tomorrow / Next Slot'}</strong>
                  </div>

                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>Assigned Worker:</span>
                    <strong style={{ color: isAllocated ? '#2563EB' : '#D97706', fontWeight: '800' }}>
                      {req.assignedAgentName || 'Not Allocated'}
                    </strong>
                    {req.assignedAgentVehicle && <span style={{ color: '#64748B', marginLeft: '4px' }}>({req.assignedAgentVehicle})</span>}
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase' }}>Address:</span>
                    <strong style={{ color: '#334155' }}>📍 {req.address}</strong>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '4px' }}>
                  {isAllocated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700' }}>
                        Handover PIN:
                      </span>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        fontWeight: '900',
                        background: '#ECFDF5',
                        color: '#047857',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        letterSpacing: '2px'
                      }}>
                        {req.dppVerificationPin}
                      </span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.74rem', color: '#D97706', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={13} />
                      <span>Pending allocation &amp; DPP activation</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: 'auto' }}>
                    {!isAllocated && !isPickedUp && (
                      <button
                        onClick={() => onOpenAllocateModal(req)}
                        style={{
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '9px 16px',
                          borderRadius: '10px',
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
                        <UserCheck size={14} />
                        <span>Allocate Recycler &amp; DPP →</span>
                      </button>
                    )}

                    {isAllocated && !isPickedUp && (
                      <button
                        onClick={() => onOpenAllocateModal(req)}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#475569',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          minHeight: '36px'
                        }}
                      >
                        <span>Re-assign</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
