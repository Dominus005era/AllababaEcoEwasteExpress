import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  List, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Leaf, 
  Sparkles, 
  Building2, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  PlusCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  LifeBuoy,
  QrCode,
  Key,
  Cpu,
  Layers,
  Copy,
  Check,
  Package,
  X,
  ZoomIn
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ConsumerApp } from './ConsumerApp';
import { useAuth } from '../contexts/AuthContext';
import { pickupApi } from '../services/api';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';

// Pre-populated high-fidelity dummy pickup order with explicit [DUMMY] labels
const DUMMY_DONOR_PICKUPS = [
  {
    id: 'ID#4932',
    requestId: '[DUMMY] ID#4932',
    dppId: '[DUMMY] DPP-2026-EW-892401',
    dppVerificationPin: '4932',
    pin: '4932',
    deviceName: '[DUMMY] Apple iPhone 11 Pro 64GB (Space Gray)',
    category: 'Smartphone',
    brand: 'Apple',
    modelName: 'iPhone 11 Pro',
    offeredPrice: 450,
    co2SavedKg: 2.3,
    pickupTime: 'Tomorrow, 10:00 AM',
    address: 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004',
    assignedRecyclerName: '[DUMMY] GreenDrop Recyclers (Hub #4)',
    assignedRecyclerId: 'rec_hub_04',
    orgName: 'GreenDrop Circular Metals Ltd',
    status: 'REQUEST_SENT_TO_ORG_ADMIN',
    statusLabel: '⚡ [DUMMY STATUS] Request Sent to Org. Admin / Recycler Queue',
    is_dummy: true,
    created_at: '2026-08-17T18:00:00Z',
    deviceImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    validationDetails: {
      brand: 'Apple',
      model: 'iPhone 11 Pro',
      condition: 'Good',
      metalsBreakdown: {
        goldGrams: 0.034,
        copperGrams: 15,
        silverGrams: 0.35,
        lithiumGrams: 3.2
      }
    }
  }
];

export const DonorDash = ({ onNavigate, onOpenRecyclerDash, onOpenSupport, initialTab = 'scanner' }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab || 'scanner');
  const [myPickups, setMyPickups] = useState(DUMMY_DONOR_PICKUPS);
  const [loading, setLoading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({
    isOpen: false,
    url: '',
    title: '',
    subtitle: '',
    tags: []
  });

  // Digital Product Passport (DPP) Modal State
  const [selectedDppOrder, setSelectedDppOrder] = useState(null);
  const [copiedDppId, setCopiedDppId] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  const handleCopyDppId = (dppId) => {
    if (!dppId) return;
    navigator.clipboard.writeText(dppId);
    setCopiedDppId(true);
    setTimeout(() => setCopiedDppId(false), 2000);
  };

  const handleCopyPin = (pin) => {
    if (!pin) return;
    navigator.clipboard.writeText(pin.toString());
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!currentUser && onNavigate) {
      onNavigate('auth');
    }
  }, [currentUser, onNavigate]);

  const userDisplayName = currentUser?.displayName || currentUser?.name || currentUser?.email?.split('@')[0] || 'E-Waste Donor';

  const fetchMyPickups = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await pickupApi.getAll({ userId: currentUser.id || currentUser.email });
      if (res.pickups && Array.isArray(res.pickups) && res.pickups.length > 0) {
        setMyPickups(res.pickups);
      } else {
        setMyPickups(DUMMY_DONOR_PICKUPS);
      }
    } catch (e) {
      console.warn('Error fetching donor pickups, fallback to dummy order:', e);
      setMyPickups(DUMMY_DONOR_PICKUPS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPickups();
  }, [currentUser]);

  const totalEarnings = myPickups.reduce((acc, curr) => acc + (parseFloat(curr.offeredPrice) || 0), 0);
  const totalCo2 = myPickups.reduce((acc, curr) => acc + (parseFloat(curr.co2SavedKg) || 0), 0).toFixed(1);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="donor-dash" 
        onNavigate={onNavigate} 
        onTabSelect={(tab) => setActiveTab(tab)} 
        activeTab={activeTab} 
        onOpenSupport={onOpenSupport}
      />

      <main style={{ flex: 1, padding: '24px 0 80px' }}>
        <div className="container">
          
          {/* HEADER BANNER (Sign Out removed, fully responsive) */}
          <div className="donor-hero-banner">
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '10px' }}>
                <Sparkles size={14} />
                <span>Donor ID: {currentUser?.id || 'ECO-DNR-GUEST'} • Verified E-Waste Account</span>
              </div>
              <h1 style={{ fontWeight: '800', margin: '4px 0 6px', color: '#FFFFFF' }}>
                Welcome Back, <span className="gradient-text">{userDisplayName}</span>
              </h1>
              <p style={{ color: '#CBD5E1', margin: 0 }}>
                Track your doorstep e-waste pick up requests, chosen recyclers, and live UPI payout earnings.
              </p>
            </div>
          </div>

          {/* RESPONSIVE METRIC CHIPS BAR */}
          <div className="donor-metrics-grid" style={{ marginBottom: '24px' }}>
            <div className="donor-metric-card">
              <div className="metric-lbl">Total Earned Payouts</div>
              <div className="metric-val" style={{ color: 'var(--emerald-primary)' }}>₹{totalEarnings}</div>
              <div className="metric-sub">Confirmed Recycler Payouts</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Doorstep Bookings</div>
              <div className="metric-val" style={{ color: 'var(--text-primary)' }}>{myPickups.length} Items</div>
              <div className="metric-sub">100% Zero-Landfill Certified</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Carbon Savings</div>
              <div className="metric-val" style={{ color: '#3B82F6' }}>{totalCo2} kg CO₂</div>
              <div className="metric-sub">Scope 3 Abatement Math</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">UPI Payout Account</div>
              <div className="metric-val" style={{ color: 'var(--text-primary)', fontSize: '1.15rem', wordBreak: 'break-all' }}>{currentUser?.upiId || 'Not Linked'}</div>
              <div className="metric-sub" style={{ color: currentUser?.upiId ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {currentUser?.upiId ? (
                  <>
                    <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
                    <span>Direct Cash Active</span>
                  </>
                ) : (
                  <span>Add UPI in Profile Settings</span>
                )}
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION SWITCHER (4 STREAMLINED TABS) */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)', maxWidth: '680px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('scanner')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'scanner' ? '#10B981' : 'transparent',
                color: activeTab === 'scanner' ? '#000000' : 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Camera size={16} />
              <span>AI Camera Scanner</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('pickups'); fetchMyPickups(); }}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: (activeTab === 'pickups' || activeTab === 'submissions') ? '#10B981' : 'transparent',
                color: (activeTab === 'pickups' || activeTab === 'submissions') ? '#000000' : 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Package size={16} />
              <span>My Pickups ({myPickups.length})</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('geologistics')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <MapPin size={16} color="#10B981" />
              <span>Geo-Logistics</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('settings')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} color="#3B82F6" />
              <span>Account</span>
            </button>
          </div>

          {/* TAB 1: SCANNER & BOOKING INTERFACE */}
          {activeTab === 'scanner' && (
            <ConsumerApp 
              onBack={() => onNavigate('landing')}
              onViewPickups={() => { setActiveTab('pickups'); fetchMyPickups(); }}
              onPickupBooked={fetchMyPickups}
            />
          )}

          {/* TAB 2: MY SUBMISSIONS & PICKUPS */}
          {(activeTab === 'pickups' || activeTab === 'submissions') && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                    My Booked Pickup Requests &amp; Product Passports
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '3px 0 0' }}>
                    Track organization review, worker allocation, Digital Product Passports (DPP), and confirmed UPI payouts.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button className="btn btn-outline btn-sm" onClick={fetchMyPickups} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <RefreshCw size={14} className={loading ? "spin-icon" : ""} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {myPickups.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 12px' }}>
                    <Truck size={26} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 6px' }}>No Booked Pickups Yet</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 18px', maxWidth: '400px', marginInline: 'auto' }}>
                    Scan your old smartphones, laptops, or circuit boards using AI Camera to schedule your first doorstep pickup.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('scanner')}>
                    <Camera size={15} />
                    <span>Launch AI Camera Scanner</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myPickups.map((sub, idx) => {
                    const isPendingReview = sub.status === 'pending_org_review' || (!sub.dppId && sub.status !== 'picked_up' && sub.status !== 'allocated');
                    const hasDpp = Boolean(sub.dppId || sub.dpp);

                    return (
                      <div
                        key={sub.requestId || idx}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: hasDpp ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                          borderRadius: '18px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                          boxShadow: 'var(--shadow-sm)',
                          boxSizing: 'border-box',
                          width: '100%'
                        }}
                      >
                        {/* Top Row: Request ID & Status Badge with [DUMMY] tags */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '3px 8px' }}>
                              ⚡ MOCK / DUMMY ORDER
                            </span>

                            <div style={{
                              fontFamily: 'monospace',
                              fontWeight: '800',
                              color: '#10B981',
                              background: 'rgba(16, 185, 129, 0.12)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '0.84rem'
                            }}>
                              {sub.requestId || '[DUMMY] #ID4932'}
                            </div>

                            {hasDpp && (
                              <span className="badge badge-emerald" style={{ fontSize: '0.74rem', padding: '4px 10px', fontWeight: '800' }}>
                                <QrCode size={12} />
                                <span>[DUMMY DPP] ({sub.dppId})</span>
                              </span>
                            )}
                          </div>

                          <span className={`badge ${sub.status === 'picked_up' ? 'badge-emerald' : isPendingReview ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: '0.76rem', padding: '4px 12px', fontWeight: '700' }}>
                            ● {sub.status === 'pending_org_review' ? 'Pending Org Review' : (sub.status === 'allocated' ? 'Recycler Allocated' : (sub.statusLabel || sub.status || 'Ready for Pickup'))}
                          </span>
                        </div>

                        {/* Device Title & Large Payout */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0, flex: 1 }}>
                            {sub.deviceImage && (
                              <div
                                onClick={() => setLightboxImage({
                                  isOpen: true,
                                  url: sub.deviceImage,
                                  title: sub.deviceName || 'Electronic Hardware',
                                  subtitle: `Doorstep Pickup #${sub.requestId} • Recycler: ${sub.assignedRecycler || sub.orgName || 'Greenscape Eco'}`,
                                  tags: [sub.status === 'picked_up' ? 'Completed' : 'Active Booking', `Valuation: ₹${sub.offeredPrice || 0}`, `${sub.co2SavedKg || 18.5} kg CO₂e`]
                                })}
                                style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                                title="Click to view full-resolution photo"
                              >
                                <img
                                  src={sub.deviceImage}
                                  alt={sub.deviceName}
                                  style={{
                                    width: '56px',
                                    height: '56px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    border: '1.5px solid rgba(16, 185, 129, 0.4)',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                />
                                <div style={{
                                  position: 'absolute',
                                  bottom: '2px',
                                  right: '2px',
                                  background: 'rgba(0,0,0,0.75)',
                                  borderRadius: '3px',
                                  padding: '1px',
                                  color: '#10B981',
                                  display: 'flex'
                                }}>
                                  <ZoomIn size={9} />
                                </div>
                              </div>
                            )}
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: '1.25' }}>
                                {sub.deviceName || '[DUMMY] Apple iPhone 11 Pro 64GB'}
                              </h4>
                              <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={12} style={{ flexShrink: 0 }} />
                                <span>3-Layer Verified • Zero-Landfill</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#10B981', lineHeight: '1.1' }}>
                              ₹{parseFloat(sub.offeredPrice || 0).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
                              Direct UPI
                            </div>
                          </div>
                        </div>

                        {/* DPP Awaiting Notice (If Pending Org Review) */}
                        {isPendingReview && (
                          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px dashed rgba(245, 158, 11, 0.35)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                              <strong style={{ color: '#F59E0B' }}>Submitted to Partner Organization:</strong> Your request has been routed to <strong>{sub.orgName || sub.assignedRecycler}</strong>. The <strong>Digital Product Passport (DPP)</strong> with QR Code &amp; Security PIN will be issued as soon as the Organization Admin assigns your field recycler.
                            </div>
                          </div>
                        )}

                        {/* Active DPP Quick-Access Strip (If Allocated) */}
                        {hasDpp && (
                          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                                <QrCode size={22} />
                              </div>
                              <div>
                                <div style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>
                                  ⚡ [DUMMY] Digital Product Passport Ready
                                </div>
                                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                                  [DUMMY PIN] Handover PIN: <span style={{ color: '#10B981', fontFamily: 'monospace', letterSpacing: '2px', background: 'var(--bg-primary)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>{sub.dppVerificationPin || '4932'}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => setSelectedDppOrder(sub)}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 16px', borderRadius: '10px' }}
                            >
                              <QrCode size={15} />
                              <span>View DPP Passport (QR)</span>
                            </button>
                          </div>
                        )}

                        {/* Clean Stacked Logistics Specifications */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.84rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Building2 size={15} color="#10B981" />
                            <span style={{ color: 'var(--text-muted)' }}>Partner Org:</span>
                            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{sub.orgName || sub.assignedRecycler || 'GreenDrop Circular Metals Ltd'}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Truck size={15} color="#3B82F6" />
                            <span style={{ color: 'var(--text-muted)' }}>Assigned Worker:</span>
                            <span style={{ fontWeight: '700', color: '#3B82F6' }}>{sub.assignedAgentName || '[DUMMY] Field Logistics Agent'} {sub.assignedAgentVehicle ? `(${sub.assignedAgentVehicle})` : ''}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={15} color="#10B981" />
                            <span style={{ color: 'var(--text-muted)' }}>Slot:</span>
                            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{sub.pickupTime || 'Tomorrow, 10:00 AM'}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Leaf size={15} color="#10B981" />
                            <span style={{ color: 'var(--text-muted)' }}>CO₂ Savings:</span>
                            <span style={{ fontWeight: '700', color: '#10B981' }}>{sub.co2SavedKg || 2.3} kg CO₂</span>
                          </div>
                        </div>

                        {/* Doorstep Address Row */}
                        <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="#10B981" style={{ flexShrink: 0 }} />
                          <span><strong>Address:</strong> {sub.address || 'Prayagraj, Uttar Pradesh'}</span>
                        </div>

                        {/* Card Action Buttons */}
                        <div style={{ display: 'flex', gap: '10px', paddingTop: '4px', flexWrap: 'wrap' }}>
                          {hasDpp && (
                            <button
                              className="btn btn-primary"
                              style={{ flex: 1, padding: '10px 14px', fontSize: '0.84rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px' }}
                              onClick={() => setSelectedDppOrder(sub)}
                            >
                              <QrCode size={16} />
                              <span>View Digital Product Passport</span>
                            </button>
                          )}

                          <button
                            className="btn btn-outline"
                            style={{ flex: 1, padding: '10px 14px', fontSize: '0.84rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px' }}
                            onClick={() => {
                              if (onNavigate) {
                                onNavigate('geologistics', sub);
                              }
                            }}
                          >
                            <Truck size={16} color="#10B981" />
                            <span>Track Driver GPS</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* OFFICIAL DIGITAL PRODUCT PASSPORT (DPP) MODAL WITH [DUMMY] LABELS */}
      {/* ========================================================================= */}
      {selectedDppOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#0F172A',
            border: '2px solid #10B981',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px 24px',
            color: '#F8FAFC',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25)',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedDppOrder(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94A3B8',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Passport Header Badge */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '6px 14px', borderRadius: '50px', color: '#F59E0B', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                <ShieldCheck size={14} />
                <span>⚡ [DUMMY PASSPORT] CPCB Verified Digital Product Passport</span>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '900', margin: '4px 0', color: '#F8FAFC' }}>
                {selectedDppOrder.deviceName || '[DUMMY] Electronic Device'}
              </h3>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>[DUMMY] Passport ID:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981' }}>
                  {selectedDppOrder.dppId || '[DUMMY] DPP-2026-EW-892401'}
                </span>
                <button
                  onClick={() => handleCopyDppId(selectedDppOrder.dppId)}
                  style={{ background: 'transparent', border: 'none', color: '#10B981', cursor: 'pointer', padding: '2px' }}
                  title="Copy Passport ID"
                >
                  {copiedDppId ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Scannable High-Tech QR Visual Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.08))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '18px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {/* Stylized QR Code Component */}
              <div style={{
                width: '150px',
                height: '150px',
                margin: '0 auto 14px',
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                boxSizing: 'border-box'
              }}>
                <QrCode size={110} color="#0F172A" />
                <div style={{ fontSize: '0.62rem', fontWeight: '800', color: '#0F172A', fontFamily: 'monospace', marginTop: '2px' }}>
                  {selectedDppOrder.dppId || 'DPP-2026'}
                </div>
              </div>

              {/* Handover Security PIN Box */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(16, 185, 129, 0.5)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '340px', margin: '0 auto' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
                    [DUMMY PIN] Handover PIN:
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10B981', fontFamily: 'monospace', letterSpacing: '4px' }}>
                    {selectedDppOrder.dppVerificationPin || '4932'}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyPin(selectedDppOrder.dppVerificationPin)}
                  style={{
                    background: copiedPin ? '#10B981' : 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10B981',
                    color: copiedPin ? '#000' : '#10B981',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedPin ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedPin ? 'Copied' : 'Copy PIN'}</span>
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '8px 0 0' }}>
                Give this 4-digit PIN or show the QR code to the recycler worker upon arrival at your doorstep.
              </p>
            </div>

            {/* Verified Specifications Summary */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '14px 16px', marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} />
                <span>Verified Hardware Attributes:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.82rem' }}>
                <div><span style={{ color: '#94A3B8' }}>Brand:</span> <strong>{selectedDppOrder.brand || 'Apple'}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Model:</span> <strong>{selectedDppOrder.modelName || selectedDppOrder.deviceName || 'iPhone 11 Pro'}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Release Year:</span> <strong>{selectedDppOrder.releaseYear || '2022'}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Condition:</span> <strong style={{ color: '#10B981' }}>{selectedDppOrder.physicalCondition || 'Good'}</strong></div>
                <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#94A3B8' }}>Repair Status:</span> <strong>{selectedDppOrder.repairHistory || 'Original Factory Components'}</strong></div>
              </div>
            </div>

            {/* Recoverable Precious Metals Yield */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '14px 16px', marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.74rem', color: '#3B82F6', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} />
                <span>Recoverable Precious Metal Matrix:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.8rem', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 4px', borderRadius: '8px' }}>
                  <div style={{ color: '#F59E0B', fontWeight: '800' }}>0.034g</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Gold (Au)</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 4px', borderRadius: '8px' }}>
                  <div style={{ color: '#E2E8F0', fontWeight: '800' }}>0.35g</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Silver (Ag)</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 4px', borderRadius: '8px' }}>
                  <div style={{ color: '#F97316', fontWeight: '800' }}>15.0g</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Copper (Cu)</div>
                </div>
              </div>
            </div>

            {/* Custody & Assigned Logistics Info */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.82rem' }}>
              <div style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={14} />
                <span>Authorized Recycler Custody:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><span style={{ color: '#94A3B8' }}>Partner Org:</span> <strong>{selectedDppOrder.orgName || selectedDppOrder.assignedRecycler || 'GreenDrop Circular Metals Ltd'}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Allocated Recycler:</span> <strong>{selectedDppOrder.assignedRecyclerName || 'GreenDrop Recyclers (Hub #4)'}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Agreed Payout:</span> <strong style={{ color: '#10B981' }}>₹{parseFloat(selectedDppOrder.offeredPrice || 0).toLocaleString('en-IN')} (Instant UPI on Handover)</strong></div>
              </div>
            </div>

            {/* Modal Bottom Action Button */}
            <button
              onClick={() => setSelectedDppOrder(null)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '800', fontSize: '0.9rem', justifyContent: 'center' }}
            >
              <span>Close Passport</span>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox High-Res Image Modal */}
      <ImageLightboxModal
        isOpen={lightboxImage.isOpen}
        onClose={() => setLightboxImage(prev => ({ ...prev, isOpen: false }))}
        imageUrl={lightboxImage.url}
        title={lightboxImage.title}
        subtitle={lightboxImage.subtitle}
        tags={lightboxImage.tags}
      />

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
