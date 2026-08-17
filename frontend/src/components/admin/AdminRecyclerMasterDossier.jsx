import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Truck,
  Clock,
  Lock,
  Unlock,
  Key,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Scale,
  DollarSign,
  Calendar,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminRecyclerMasterDossier = ({ recyclerId, onBack, onNavigateToOrg }) => {
  const [loading, setLoading] = useState(true);
  const [dossierData, setDossierData] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  const fetchDossier = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getRecyclerDossier(recyclerId);
      if (res.success && res.dossier) {
        setDossierData(res.dossier);
      } else {
        setError(res.error || 'Failed to load recycler dossier.');
      }
    } catch (err) {
      console.error('Error fetching recycler master dossier:', err);
      setError(err.message || 'Network error fetching recycler dossier.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recyclerId) {
      fetchDossier();
    }
  }, [recyclerId]);

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
          Retrieving Recycler Master Dossier & CPCB Records...
        </h4>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
          Querying credentials, academic tier caps, and collection logs for ID: {recyclerId}
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
        <h4 style={{ margin: '0 0 8px', color: '#DC2626' }}>Error Loading Recycler Dossier</h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>{error}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} /> Back to Authorized Recyclers
          </button>
          <button onClick={fetchDossier} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  const { recycler, parentOrganization, depotLots = [], assignedPickups = [] } = dossierData;

  const isStudent = recycler.occupation_type === 'student';
  const isWorker = recycler.occupation_type === 'worker';
  const isNonWorker = recycler.occupation_type === 'non_worker';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header & Breadcrumb Bar */}
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
          <span>Back to Authorized Recyclers Grid</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '700' }}>RECYCLER ID:</span>
          <span style={{
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '4px 10px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontWeight: '800',
            fontSize: '0.82rem'
          }}>
            {recycler.id}
          </span>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '700' }}>CPCB WORKER CODE:</span>
          <span style={{
            background: 'rgba(37, 99, 235, 0.12)',
            color: '#2563EB',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            padding: '4px 10px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontWeight: '800',
            fontSize: '0.82rem'
          }}>
            {recycler.cpcb_worker_id || recycler.cpcb_license}
          </span>

          <span style={{
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.76rem',
            fontWeight: '800',
            background: recycler.is_active_duty ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)',
            color: recycler.is_active_duty ? '#10B981' : '#EF4444',
            border: recycler.is_active_duty ? '1px solid #10B981' : '1px solid rgba(239, 68, 68, 0.4)'
          }}>
            {recycler.is_active_duty ? '🟢 Active Duty' : '🔴 Off Duty'}
          </span>
        </div>
      </div>

      {/* Hero Profile Overview Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        borderRadius: '20px',
        padding: '24px 28px',
        color: '#FFFFFF',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: isStudent ? 'rgba(37, 99, 235, 0.25)' : isWorker ? 'rgba(16, 185, 129, 0.25)' : 'rgba(139, 92, 246, 0.25)',
                color: isStudent ? '#60A5FA' : isWorker ? '#34D399' : '#C084FC',
                border: `1px solid ${isStudent ? '#3B82F6' : isWorker ? '#10B981' : '#8B5CF6'}`,
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {isStudent ? <><GraduationCap size={14} /> Student Worker ({recycler.academic_year || '1st Year'})</> : 
                 isWorker ? <><Briefcase size={14} /> Professional Industrial Recycler</> : 
                 <><Unlock size={14} /> Part-Time Community Contributor</>}
              </span>

              <span style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: '700'
              }}>
                {recycler.role_designation || 'Certified Field Recycler'}
              </span>
            </div>

            <h2 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              {recycler.display_name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '0.84rem', color: '#94A3B8', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={15} color="#10B981" />
                <strong style={{ color: '#F8FAFC' }}>Parent Org:</strong> {recycler.org_name || recycler.company_name}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#60A5FA" />
                {recycler.district}, {recycler.state}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} color="#F59E0B" />
                <strong style={{ color: '#FCD34D' }}>Commitment:</strong> {recycler.working_hours_tier || 'Tier 1 (2-4 hrs/wk)'} ({recycler.weekly_hours_cap || 4}h/wk max)
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '800' }}>
              CPCB Payout Multiplier
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#10B981', marginTop: '2px' }}>
              {recycler.payout_multiplier || 1.15}x
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Verified Recycler Rating: ★ {recycler.rating || 4.9}</div>
          </div>
        </div>
      </div>

      {/* Grid: Credentials Box & Academic/Logistics Profiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Module 1: Corporate Access & Login Credentials */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderRadius: '18px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Key size={18} color="#10B981" />
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Corporate Authentication Credentials
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Corporate Login Email:</span>
                <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{recycler.corporate_email || recycler.email}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Personal Phone:</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{recycler.personal_phone || recycler.phone}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Assigned Branch / Scale:</span>
                <span style={{ fontWeight: '700', color: '#2563EB' }}>{recycler.assigned_branch_name || recycler.assigned_branch_id || 'Amausi Main Hub Dock 1'}</span>
              </div>

              {/* Password Box */}
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '12px',
                padding: '12px 14px',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#DC2626', textTransform: 'uppercase' }}>
                    Initial Recycler Password:
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: '700' }}
                  >
                    {showPassword ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Reveal</>}
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: '900', fontSize: '0.92rem', color: '#991B1B' }}>
                    {showPassword ? (recycler.raw_password || 'Recycler@2026') : '••••••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(recycler.raw_password || 'Recycler@2026', 'pass')}
                    style={{
                      border: 'none',
                      background: '#FFFFFF',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      color: '#DC2626',
                      fontWeight: '800',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    {copiedKey === 'pass' ? '✓ Copied' : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <button
            onClick={() => copyToClipboard(`${window.location.origin}/recycler`, 'portal')}
            style={{
              marginTop: '16px',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #10B981',
              background: 'rgba(16, 185, 129, 0.08)',
              color: '#10B981',
              fontWeight: '800',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {copiedKey === 'portal' ? '✓ Recycler Portal URL Copied!' : <><ExternalLink size={14} /> Copy Recycler Portal URL (/recycler)</>}
          </button>
        </div>

        {/* Module 2: Student Academic Protection OR Logistics Profile */}
        {isStudent ? (
          <div style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderRadius: '18px',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            padding: '22px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <GraduationCap size={20} color="#2563EB" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Student Academic Safeguards & Profile
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>University / College:</span>
                  <span style={{ fontWeight: '800', color: '#1E40AF' }}>{recycler.college_name || 'National Institute of Technology'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Degree & Stream:</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{recycler.degree_program || 'B.Tech Environmental Eng.'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Academic Standing:</span>
                  <span style={{ fontWeight: '800', color: '#2563EB' }}>{recycler.academic_year || '1st Year'} • {recycler.semester || 'Semester 1'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Student Roll / ID:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-primary)' }}>{recycler.student_id_number || 'STU-2024-8891'}</span>
                </div>
              </div>
            </div>

            {/* Academic Hour Enforcement Notice */}
            <div style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              borderRadius: '12px',
              padding: '12px 14px',
              marginTop: '16px',
              fontSize: '0.8rem',
              color: '#1E40AF',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Academic Protection Safeguard:</strong> As a {recycler.academic_year || '1st Year'} student working part-time to earn, weekly duty is restricted to <strong>{recycler.weekly_hours_cap || 4} hours/week</strong> to protect academic studies.
              </div>
            </div>
          </div>
        ) : (
          /* Logistics & Fleet Module for Full-Time / Part-Time */
          <div style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderRadius: '18px',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '22px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Truck size={18} color="#F59E0B" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Logistics, Fleet & Field Deployment
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Assigned Fleet Vehicle:</span>
                  <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{recycler.vehicle_number || 'UP-70-AB-1042 (Electric)'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Vehicle Class:</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{recycler.vehicle_type || 'Electric 1.5-Ton Cargo Mini-Truck'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Operational Shift:</span>
                  <span style={{ fontWeight: '700', color: '#10B981' }}>{recycler.work_start_time || '09:00'} - {recycler.work_end_time || '18:00'} IST</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #F1F5F9)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Base Operating Address:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{recycler.address || 'Central Industrial Smelter Base'}</span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '12px 14px',
              marginTop: '16px',
              fontSize: '0.8rem',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={16} />
              <span>Full CPCB Form 6 Intake Authorization Activated</span>
            </div>
          </div>
        )}

      </div>

      {/* Module 3: Field Intake Lots & Manifest History */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderRadius: '18px',
        border: '1px solid var(--border-color, #E2E8F0)',
        padding: '22px 24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="#10B981" />
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Depot Intake Lots & CPCB Form 6 Clearances ({depotLots.length})
            </h4>
          </div>
        </div>

        {depotLots.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            No depot intake lots logged yet for this field personnel. Once consignments are handed over at dock gatehouses, they will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {depotLots.map(lot => (
              <div key={lot.id} style={{
                background: 'var(--bg-secondary, #F8FAFC)',
                border: '1px solid var(--border-color, #E2E8F0)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.9rem' }}>LOT ID: {lot.lot_id}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Net Weight: {lot.consignment_net_weight_kg} kg • Dest: {lot.dest_smelting_base}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '800', color: '#10B981' }}>₹{Number(lot.aggregate_val).toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>CPCB Form 6 Cleared</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
