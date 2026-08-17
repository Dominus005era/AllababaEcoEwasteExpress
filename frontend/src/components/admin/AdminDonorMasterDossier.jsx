import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Package,
  Clock,
  Key,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Calendar,
  ExternalLink,
  Trash2,
  Sparkles,
  QrCode,
  Check,
  CreditCard,
  Leaf,
  ZoomIn
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { ImageLightboxModal } from '../common/ImageLightboxModal';

export const AdminDonorMasterDossier = ({ donorId, onBack, onNavigateToRecycler }) => {
  const [loading, setLoading] = useState(true);
  const [dossierData, setDossierData] = useState(null);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'scans', 'dpp', 'payout'
  const [lightboxImage, setLightboxImage] = useState({
    isOpen: false,
    url: '',
    title: '',
    subtitle: '',
    tags: []
  });

  const fetchDossier = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getDonorDossier(donorId);
      if (res.success && res.dossier) {
        setDossierData(res.dossier);
      } else {
        setError(res.error || 'Failed to load donor master dossier.');
      }
    } catch (err) {
      console.error('Error fetching donor master dossier:', err);
      setError(err.message || 'Network error retrieving donor dossier.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (donorId) {
      fetchDossier();
    }
  }, [donorId]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  if (loading) {
    return (
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '60px 20px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <RefreshCw size={32} className="spin" color="#10B981" style={{ margin: '0 auto 16px' }} />
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          Retrieving Donor Master Dossier & Circular Contribution History...
        </h4>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
          Querying delivery logs, precious metal extraction records, and DPP passports for ID: {donorId}
        </p>
      </div>
    );
  }

  if (error || !dossierData) {
    return (
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid #FCA5A5',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <AlertTriangle size={36} color="#DC2626" style={{ margin: '0 auto 12px' }} />
        <h4 style={{ margin: '0 0 8px', color: '#DC2626' }}>Error Loading Donor Dossier</h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>{error}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} /> Back to Registered Donors
          </button>
          <button onClick={fetchDossier} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  const { donor, pickupOrders = [], ewasteScans = [], dppPassports = [], stats = {} } = dossierData;
  const metals = stats.metals || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. TOP HEADER & BREADCRUMB BAR */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '16px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '14px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <button
          onClick={onBack}
          id="btn-back-to-donors-grid"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-secondary, #F1F5F9)',
            border: '1px solid var(--border-color, #CBD5E1)',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '0.86rem',
            fontWeight: '700',
            color: 'var(--text-primary, #0F172A)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary, #F1F5F9)'}
        >
          <ArrowLeft size={16} />
          <span>Back to Registered Donors Grid</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '700' }}>DONOR ID:</span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            fontFamily: 'monospace',
            fontWeight: '800',
            fontSize: '0.82rem',
            padding: '4px 10px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            {donor.id}
          </span>

          <span style={{
            background: 'rgba(59, 130, 246, 0.12)',
            color: '#2563EB',
            fontWeight: '800',
            fontSize: '0.76rem',
            padding: '4px 10px',
            borderRadius: '8px'
          }}>
            VERIFIED CITIZEN DONOR
          </span>

          <span style={{
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#8B5CF6',
            fontWeight: '800',
            fontSize: '0.76rem',
            padding: '4px 10px',
            borderRadius: '8px'
          }}>
            UPI: {donor.upiId}
          </span>
        </div>
      </div>

      {/* 2. HERO PROFILE & IDENTITY CARD */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: '900',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
              border: '3px solid var(--bg-card, #FFFFFF)'
            }}>
              {donor.displayName ? donor.displayName.substring(0, 2).toUpperCase() : 'DN'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>
                  {donor.displayName}
                </h2>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={12} /> Profile Complete
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                  {donor.profession || 'Citizen Contributor'}
                </span>
                {donor.organizationOrCollege && (
                  <>
                    <span>•</span>
                    <span>{donor.organizationOrCollege}</span>
                  </>
                )}
                {donor.jobRoleOrDegree && (
                  <>
                    <span>•</span>
                    <span style={{ color: '#3B82F6', fontWeight: '600' }}>{donor.jobRoleOrDegree}</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={14} color="#10B981" />
                  <span>{donor.district}, {donor.state}, {donor.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} />
                  <span>Joined: {new Date(donor.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => copyToClipboard(donor.email, 'email')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {copiedKey === 'email' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copiedKey === 'email' ? 'Copied Email!' : donor.email}</span>
            </button>

            {donor.phone && donor.phone !== 'N/A' && (
              <button
                onClick={() => copyToClipboard(donor.phone, 'phone')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {copiedKey === 'phone' ? <Check size={14} color="#10B981" /> : <Phone size={14} />}
                <span>{copiedKey === 'phone' ? 'Copied Phone!' : donor.phone}</span>
              </button>
            )}
          </div>
        </div>

        {donor.bio && (
          <div style={{
            background: 'var(--bg-secondary, #F8FAFC)',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid var(--border-color, #E2E8F0)',
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5'
          }}>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Contributor Profile Note: </span>
            {donor.bio}
          </div>
        )}
      </div>

      {/* 3. 4-METRIC STATS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '700' }}>
            <Package size={16} color="#3B82F6" />
            <span>PICKUP DELIVERIES</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '8px' }}>
            {stats.totalOrders || 0} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Orders</span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '700' }}>
            <DollarSign size={16} color="#10B981" />
            <span>TOTAL EARNINGS GENERATED</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#10B981', marginTop: '8px' }}>
            ₹{(stats.totalValuation || 0).toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '700' }}>
            <Leaf size={16} color="#059669" />
            <span>CO₂ EMISSIONS AVOIDED</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#059669', marginTop: '8px' }}>
            {stats.totalCo2AvoidedKg || 0} <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>kg CO₂e</span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '700' }}>
            <Sparkles size={16} color="#8B5CF6" />
            <span>AI HARDWARE SCANS</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#8B5CF6', marginTop: '8px' }}>
            {stats.totalScans || 0} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Scans</span>
          </div>
        </div>
      </div>

      {/* 4. PRECIOUS METALS RECOVERED INDEX */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '16px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              ⚡ Cumulative Precious Metals Recovered from Donor's Devices
            </h4>
            <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Verified mineral recovery metrics calculated via EcoTrace multi-layer elemental extraction engine.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#92400E' }}>GOLD (Au)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#B45309', marginTop: '4px' }}>{metals.goldG || '0.180'} g</div>
          </div>

          <div style={{ background: '#FFEDD5', border: '1px solid #FED7AA', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#9A3412' }}>COPPER (Cu)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#C2410C', marginTop: '4px' }}>{metals.copperG || '142.5'} g</div>
          </div>

          <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#475569' }}>SILVER (Ag)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#334155', marginTop: '4px' }}>{metals.silverG || '1.25'} g</div>
          </div>

          <div style={{ background: '#EDE9FE', border: '1px solid #DDD6FE', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#5B21B6' }}>PALLADIUM (Pd)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#6D28D9', marginTop: '4px' }}>{metals.palladiumG || '0.040'} g</div>
          </div>

          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#065F46' }}>LITHIUM (Li)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#047857', marginTop: '4px' }}>{metals.lithiumG || '48.0'} g</div>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE WORKSPACE TABS */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '20px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Tab Selection Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-color, #E2E8F0)',
          paddingBottom: '14px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'orders' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === 'orders' ? '#10B981' : 'var(--text-secondary)',
              fontWeight: activeTab === 'orders' ? '800' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Package size={15} />
            <span>Doorstep Pickups &amp; Orders ({pickupOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scans')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'scans' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              color: activeTab === 'scans' ? '#8B5CF6' : 'var(--text-secondary)',
              fontWeight: activeTab === 'scans' ? '800' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            <span>AI E-Waste Scans &amp; Inspections ({ewasteScans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dpp')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'dpp' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'dpp' ? '#2563EB' : 'var(--text-secondary)',
              fontWeight: activeTab === 'dpp' ? '800' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <QrCode size={15} />
            <span>Digital Product Passports ({dppPassports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payout')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'payout' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: activeTab === 'payout' ? '#F59E0B' : 'var(--text-secondary)',
              fontWeight: activeTab === 'payout' ? '800' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CreditCard size={15} />
            <span>UPI Matrix &amp; Registered Address</span>
          </button>
        </div>

        {/* TAB CONTENT 1: DOORSTEP PICKUPS & ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {pickupOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Package size={36} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No doorstep pickup requests placed yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pickupOrders.map(order => (
                  <div key={order.request_id} style={{
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px solid var(--border-color, #E2E8F0)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {order.request_id}
                        </span>
                        <span style={{
                          background: order.status === 'completed' || order.status === 'recycled' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                          color: order.status === 'completed' || order.status === 'recycled' ? '#10B981' : '#2563EB',
                          fontWeight: '800',
                          fontSize: '0.74rem',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {order.status}
                        </span>
                        {order.dpp_id && (
                          <span style={{
                            background: 'rgba(139, 92, 246, 0.12)',
                            color: '#8B5CF6',
                            fontWeight: '700',
                            fontSize: '0.74rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontFamily: 'monospace'
                          }}>
                            DPP: {order.dpp_id}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#10B981' }}>
                        ₹{parseFloat(order.offered_price || 0).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {(order.device_image || order.deviceImage) && (
                          <div
                            onClick={() => setLightboxImage({
                              isOpen: true,
                              url: order.device_image || order.deviceImage,
                              title: order.device_name || 'Hardware Device',
                              subtitle: `Pickup Consignment #${order.request_id} • Donor: ${donor.displayName || donor.name}`,
                              tags: [order.status, `Valuation: ₹${order.offered_price || 0}`, `${order.co2_saved_kg || 0} kg CO₂e`]
                            })}
                            style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                            title="Click to view full-resolution photo"
                          >
                            <img
                              src={order.device_image || order.deviceImage}
                              alt={order.device_name}
                              style={{
                                width: '48px',
                                height: '48px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem', fontWeight: '700' }}>HARDWARE DEVICE</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{order.device_name}</strong>
                          {order.brand && <div style={{ fontSize: '0.78rem' }}>{order.brand} • {order.model_name}</div>}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem', fontWeight: '700' }}>SCHEDULED WINDOW</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{order.pickup_time}</strong>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem', fontWeight: '700' }}>ASSIGNED RECYCLER</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{order.assigned_recycler || 'Unassigned'}</strong>
                        {order.assigned_agent_vehicle && <div style={{ fontSize: '0.78rem' }}>Vehicle: {order.assigned_agent_vehicle}</div>}
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem', fontWeight: '700' }}>CARBON SAVED</span>
                        <strong style={{ color: '#059669' }}>{order.co2_saved_kg} kg CO₂e</strong>
                      </div>
                    </div>

                    {order.address && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                        📍 Pickup Destination: {order.address}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 2: AI HARDWARE SCANS */}
        {activeTab === 'scans' && (
          <div>
            {ewasteScans.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Sparkles size={36} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No AI vision scans logged yet for this donor.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {ewasteScans.map((scan, idx) => (
                  <div key={scan.id || idx} style={{
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px solid var(--border-color, #E2E8F0)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {(scan.image_url || scan.imageUrl) && (
                          <div
                            onClick={() => setLightboxImage({
                              isOpen: true,
                              url: scan.image_url || scan.imageUrl,
                              title: scan.brand ? `${scan.brand} ${scan.model_name || ''}` : scan.device_type,
                              subtitle: `AI Vision Inspection Scan #${scan.id} • Donor: ${donor.displayName || donor.name}`,
                              tags: [scan.device_type, scan.physical_condition || 'Standard Condition', `Valuation: ₹${scan.estimated_val || 0}`]
                            })}
                            style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                            title="Click to view full-resolution photo"
                          >
                            <img
                              src={scan.image_url || scan.imageUrl}
                              alt={scan.device_type}
                              style={{
                                width: '46px',
                                height: '46px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                              {scan.brand ? `${scan.brand} ${scan.model_name || ''}` : scan.device_type}
                            </span>
                            <span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800' }}>
                              AI SCAN #{scan.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#10B981' }}>
                        Valuation: ₹{parseFloat(scan.estimated_val || 0).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '10px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: '700' }}>CONDITION &amp; AGE</span>
                        <span>{scan.physical_condition || 'Standard Grade'} • {scan.device_age_years ? `${scan.device_age_years} Yrs` : 'N/A'}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: '700' }}>REPAIR HISTORY</span>
                        <span>{scan.repair_history || 'No recorded repairs'}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: '700' }}>SCAN DATE</span>
                        <span>{new Date(scan.scanned_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 3: DIGITAL PRODUCT PASSPORTS */}
        {activeTab === 'dpp' && (
          <div>
            {dppPassports.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <QrCode size={36} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No DPP circular passports minted for this donor yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {dppPassports.map(dpp => (
                  <div key={dpp.dppId} style={{
                    background: 'var(--bg-secondary, #F8FAFC)',
                    border: '1px solid var(--border-color, #E2E8F0)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#2563EB', fontSize: '0.86rem' }}>
                        {dpp.dppId}
                      </span>
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                        {dpp.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {dpp.deviceName}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div>Order: <strong style={{ fontFamily: 'monospace' }}>{dpp.orderId}</strong></div>
                      {dpp.pin && <div>Security PIN: <strong style={{ color: '#F59E0B', fontFamily: 'monospace' }}>{dpp.pin}</strong></div>}
                      <div>Allocated: {new Date(dpp.allocatedAt).toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 4: UPI MATRIX & ADDRESS */}
        {activeTab === 'payout' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{
              background: 'var(--bg-secondary, #F8FAFC)',
              border: '1px solid var(--border-color, #E2E8F0)',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CreditCard size={18} color="#10B981" />
                <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Verified UPI Settlement Matrix
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>REGISTERED UPI VPA HANDLE</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    marginTop: '4px'
                  }}>
                    <strong style={{ fontFamily: 'monospace', color: '#10B981', fontSize: '0.92rem' }}>{donor.upiId}</strong>
                    <button
                      onClick={() => copyToClipboard(donor.upiId, 'upi')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                      {copiedKey === 'upi' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  Doorstep payouts for processed e-waste consignments are automatically settled directly to this verified UPI VPA handle.
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-secondary, #F8FAFC)',
              border: '1px solid var(--border-color, #E2E8F0)',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MapPin size={18} color="#2563EB" />
                <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Registered Residential &amp; Logistics Address
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                <p style={{ margin: 0, lineHeight: '1.5', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {donor.address || 'No physical address stored.'}
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  District: <strong>{donor.district}</strong> • State: <strong>{donor.state}</strong> • Country: <strong>{donor.country}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox High-Res Image Modal */}
      <ImageLightboxModal
        isOpen={lightboxImage.isOpen}
        onClose={() => setLightboxImage(prev => ({ ...prev, isOpen: false }))}
        imageUrl={lightboxImage.url}
        title={lightboxImage.title}
        subtitle={lightboxImage.subtitle}
        tags={lightboxImage.tags}
      />
    </div>
  );
};
