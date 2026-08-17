import React, { useState, useEffect } from 'react';
import {
  X,
  UserPlus,
  GraduationCap,
  Briefcase,
  UserCheck,
  Clock,
  Lock,
  Unlock,
  ShieldCheck,
  Building2,
  Truck,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { adminApi } from '../../services/api';

export const AdminWorkerRegistrationModal = ({ isOpen, onClose, org, branches = [], onWorkerAdded }) => {
  const [occupationType, setOccupationType] = useState('worker'); // 'worker' | 'student' | 'non_worker'
  const [displayName, setDisplayName] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [address, setAddress] = useState('');
  const [roleDesignation, setRoleDesignation] = useState('');
  
  // Student Specific State
  const [collegeName, setCollegeName] = useState('');
  const [degreeProgram, setDegreeProgram] = useState('B.Tech Environmental Engineering');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [semester, setSemester] = useState('Semester 1');
  const [studentIdNumber, setStudentIdNumber] = useState('');

  // Working Hours Tier State
  const [workingHoursTier, setWorkingHoursTier] = useState('Tier 4 (Full-Time 40h/wk)');
  const [weeklyHoursCap, setWeeklyHoursCap] = useState(40);

  // Logistics State
  const [assignedBranchId, setAssignedBranchId] = useState('');
  const [assignedBranchName, setAssignedBranchName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('None / Facility Based');

  // Status & Credential Result
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [createdResult, setCreatedResult] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  // Handle Branches selection initialization
  useEffect(() => {
    if (branches && branches.length > 0) {
      setAssignedBranchId(branches[0].branch_id || branches[0].id || '');
      setAssignedBranchName(branches[0].branch_name || '');
    }
  }, [branches]);

  // Dynamic Hour Lock Rules according to occupation & academic year
  useEffect(() => {
    if (occupationType === 'student') {
      if (academicYear === '1st Year' || academicYear === '2nd Year') {
        setWorkingHoursTier('Tier 1 (2-4 hrs/wk)');
        setWeeklyHoursCap(4);
      } else if (academicYear === '3rd Year' || academicYear === '4th Year') {
        if (workingHoursTier === 'Tier 3 (6-8 hrs/wk)' || workingHoursTier === 'Tier 4 (Full-Time 40h/wk)') {
          setWorkingHoursTier('Tier 2 (4-6 hrs/wk)');
          setWeeklyHoursCap(6);
        }
      }
      if (!roleDesignation || roleDesignation === 'Certified Field Recycler') {
        setRoleDesignation('Student Field Recycler (Part-Time)');
      }
    } else if (occupationType === 'non_worker') {
      if (workingHoursTier === 'Tier 4 (Full-Time 40h/wk)') {
        setWorkingHoursTier('Tier 3 (6-8 hrs/wk)');
        setWeeklyHoursCap(8);
      }
      if (!roleDesignation || roleDesignation === 'Student Field Recycler (Part-Time)') {
        setRoleDesignation('Community Part-Time E-Waste Associate');
      }
    } else {
      // Full-time worker
      if (workingHoursTier === 'Tier 1 (2-4 hrs/wk)' && !roleDesignation) {
        setWorkingHoursTier('Tier 4 (Full-Time 40h/wk)');
        setWeeklyHoursCap(40);
      }
      if (!roleDesignation || roleDesignation === 'Student Field Recycler (Part-Time)' || roleDesignation === 'Community Part-Time E-Waste Associate') {
        setRoleDesignation('Certified Field Recycler & Technician');
      }
    }
  }, [occupationType, academicYear]);

  if (!isOpen || !org) return null;

  // Clean numeric ID representation
  const orgRawDigits = org.id.replace(/\D/g, '') || '1001';
  const orgNumStr = orgRawDigits.padStart(4, '0');
  const previewState = (org.state === 'Uttar Pradesh' || !org.state) ? 'UP' : org.state.substring(0, 2).toUpperCase();
  const previewName = displayName.trim() ? displayName.trim().toLowerCase().replace(/[^a-z0-9]/g, '.').split('.')[0] : 'worker';
  const orgDomain = org.email && org.email.includes('@') ? org.email.split('@')[1] : `${org.organization_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const previewEmail = `${previewName}.rec${orgNumStr}@${orgDomain}`;
  const previewCpcbId = `CPCB-${previewState}-2026-REC-${orgNumStr}-W01`;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  const handleBranchChange = (e) => {
    const bId = e.target.value;
    setAssignedBranchId(bId);
    const selected = branches.find(b => (b.branch_id || b.id) === bId);
    setAssignedBranchName(selected ? selected.branch_name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Please provide the full legal name of the recycler/worker.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        displayName,
        occupationType,
        personalEmail,
        personalPhone,
        address,
        roleDesignation,
        workingHoursTier,
        weeklyHoursCap,
        collegeName: occupationType === 'student' ? collegeName : null,
        degreeProgram: occupationType === 'student' ? degreeProgram : null,
        academicYear: occupationType === 'student' ? academicYear : null,
        semester: occupationType === 'student' ? semester : null,
        studentIdNumber: occupationType === 'student' ? studentIdNumber : null,
        assignedBranchId,
        assignedBranchName,
        vehicleNumber,
        vehicleType
      };

      const res = await adminApi.addRecyclerUnderOrg(org.id, payload);
      if (res.success && res.worker) {
        setCreatedResult(res.worker);
        if (onWorkerAdded) {
          onWorkerAdded(res.worker);
        }
      } else {
        setError(res.error || 'Failed to register worker.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while registering worker.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setCreatedResult(null);
    setDisplayName('');
    setPersonalPhone('');
    setPersonalEmail('');
    setAddress('');
    setCollegeName('');
    setStudentIdNumber('');
    setError(null);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '820px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: '24px 24px 0 0'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <UserPlus size={20} color="#10B981" />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Onboard Recycler / Field Worker
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#94A3B8' }}>
              Register personnel under <strong style={{ color: '#F1F5F9' }}>{org.organization_name}</strong>
            </p>
          </div>
          <button
            onClick={resetAndClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '26px 28px', overflowY: 'auto' }}>
          
          {createdResult ? (
            /* Success State with Generated Credentials */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.4rem', fontWeight: '800', color: '#0F172A' }}>
                Field Worker Registered Successfully!
              </h3>
              <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: '#64748B' }}>
                CPCB Accreditation and corporate login credentials have been generated automatically.
              </p>

              {/* Generated Credential Matrix Box */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>
                      Worker Recycler ID
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', marginTop: '4px' }}>
                      <span style={{ fontWeight: '800', color: '#0F172A', fontFamily: 'monospace' }}>{createdResult.id}</span>
                      <button onClick={() => copyToClipboard(createdResult.id, 'id')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                        {copiedKey === 'id' ? '✓ Copied' : <><Copy size={13} /> Copy</>}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>
                      Unique CPCB Worker ID
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', marginTop: '4px' }}>
                      <span style={{ fontWeight: '800', color: '#2563EB', fontFamily: 'monospace' }}>{createdResult.cpcb_worker_id}</span>
                      <button onClick={() => copyToClipboard(createdResult.cpcb_worker_id, 'cpcb')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                        {copiedKey === 'cpcb' ? '✓ Copied' : <><Copy size={13} /> Copy</>}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>
                      Generated Corporate Login Email
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', marginTop: '4px' }}>
                      <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.86rem' }}>{createdResult.corporate_email}</span>
                      <button onClick={() => copyToClipboard(createdResult.corporate_email, 'email')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                        {copiedKey === 'email' ? '✓ Copied' : <><Copy size={13} /> Copy</>}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase' }}>
                      Initial Access Password
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FEF2F2', padding: '10px 14px', borderRadius: '10px', border: '1px solid #FCA5A5', marginTop: '4px' }}>
                      <span style={{ fontWeight: '800', color: '#DC2626', fontFamily: 'monospace' }}>{createdResult.raw_password}</span>
                      <button onClick={() => copyToClipboard(createdResult.raw_password, 'pass')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                        {copiedKey === 'pass' ? '✓ Copied' : <><Copy size={13} /> Copy</>}
                      </button>
                    </div>
                  </div>

                </div>

                {createdResult.occupation_type === 'student' && (
                  <div style={{ marginTop: '16px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GraduationCap size={20} color="#2563EB" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: '#1E40AF', fontWeight: '600' }}>
                      <strong>Student Academic Work Cap Applied:</strong> {createdResult.college_name} ({createdResult.academic_year}) • Locked to <strong>{createdResult.working_hours_tier}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  type="button"
                  id="btn-done-close-worker-modal"
                  onClick={resetAndClose}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Done & Return to Organization Dossier
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {error && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#B91C1C',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertTriangle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. OCCUPATION CLASSIFICATION SELECTOR */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: '800', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                  Worker Profile & Occupation Classification *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  
                  {/* Option 1: Professional Worker */}
                  <div 
                    id="occupation-btn-worker"
                    onClick={() => setOccupationType('worker')}
                    style={{
                      border: `2px solid ${occupationType === 'worker' ? '#10B981' : '#E2E8F0'}`,
                      background: occupationType === 'worker' ? 'rgba(16, 185, 129, 0.06)' : '#FFFFFF',
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: occupationType === 'worker' ? '#10B981' : '#F1F5F9',
                      color: occupationType === 'worker' ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0F172A' }}>Professional Worker</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Full-Time / Certified Recycler</div>
                    </div>
                  </div>

                  {/* Option 2: Student */}
                  <div 
                    id="occupation-btn-student"
                    onClick={() => setOccupationType('student')}
                    style={{
                      border: `2px solid ${occupationType === 'student' ? '#2563EB' : '#E2E8F0'}`,
                      background: occupationType === 'student' ? 'rgba(37, 99, 235, 0.06)' : '#FFFFFF',
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: occupationType === 'student' ? '#2563EB' : '#F1F5F9',
                      color: occupationType === 'student' ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0F172A' }}>Student Worker</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Earning Part-Time • Academic Safeguards</div>
                    </div>
                  </div>

                  {/* Option 3: Non-Worker / Part-Time */}
                  <div 
                    id="occupation-btn-non_worker"
                    onClick={() => setOccupationType('non_worker')}
                    style={{
                      border: `2px solid ${occupationType === 'non_worker' ? '#8B5CF6' : '#E2E8F0'}`,
                      background: occupationType === 'non_worker' ? 'rgba(139, 92, 246, 0.06)' : '#FFFFFF',
                      borderRadius: '14px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: occupationType === 'non_worker' ? '#8B5CF6' : '#F1F5F9',
                      color: occupationType === 'non_worker' ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0F172A' }}>Part-Time Contributor</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>Community Flexible Hours</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. PERSONAL DETAILS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Verma"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Personal Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={personalPhone}
                    onChange={e => setPersonalPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Personal Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="siddharth@gmail.com"
                    value={personalEmail}
                    onChange={e => setPersonalEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* 3. DYNAMIC STUDENT FIELDS (IF STUDENT SELECTED) */}
              {occupationType === 'student' && (
                <div style={{
                  background: 'rgba(37, 99, 235, 0.04)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: '16px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={18} color="#2563EB" />
                    <span style={{ fontWeight: '800', fontSize: '0.92rem', color: '#1E40AF' }}>
                      Student Academic Safeguards & Workload Limits
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        College / University Name *
                      </label>
                      <input
                        type="text"
                        id="worker-college-name"
                        required
                        placeholder="e.g. MNNIT Allahabad / IIT Kanpur"
                        value={collegeName}
                        onChange={e => setCollegeName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Degree / Program
                      </label>
                      <input
                        type="text"
                        id="worker-degree-program"
                        placeholder="e.g. B.Tech / B.Sc / BCA"
                        value={degreeProgram}
                        onChange={e => setDegreeProgram(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Academic Year *
                      </label>
                      <select
                        id="worker-academic-year"
                        value={academicYear}
                        onChange={e => setAcademicYear(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.86rem',
                          fontWeight: '700',
                          background: '#FFFFFF',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="1st Year">1st Year (Minimum Hours Locked)</option>
                        <option value="2nd Year">2nd Year (Minimum Hours Locked)</option>
                        <option value="3rd Year">3rd Year (Tier 2 Allowed)</option>
                        <option value="4th Year">4th Year (Tier 2 Allowed)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Current Semester
                      </label>
                      <select
                        id="worker-semester"
                        value={semester}
                        onChange={e => setSemester(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.86rem',
                          fontWeight: '600',
                          background: '#FFFFFF',
                          boxSizing: 'border-box'
                        }}
                      >
                        {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Student Roll No / College ID
                      </label>
                      <input
                        type="text"
                        id="worker-student-id"
                        placeholder="e.g. 2024CS089"
                        value={studentIdNumber}
                        onChange={e => setStudentIdNumber(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. WORKING HOURS TIER SELECTION WITH DYNAMIC ACADEMIC LOCKS */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: '800', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} />
                    <span>Working Hours Tier & Weekly Commitment *</span>
                  </label>
                  {occupationType === 'student' && (
                    <span style={{ fontSize: '0.74rem', color: '#2563EB', fontWeight: '700' }}>
                      {academicYear === '1st Year' || academicYear === '2nd Year' ? '🔒 1st/2nd Year: Locked to Tier 1' : '🔒 3rd/4th Year: Max Tier 2'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  
                  {/* Tier 1: 2-4 hrs/wk */}
                  <div
                    onClick={() => {
                      setWorkingHoursTier('Tier 1 (2-4 hrs/wk)');
                      setWeeklyHoursCap(4);
                    }}
                    style={{
                      border: `2px solid ${workingHoursTier.includes('Tier 1') ? '#10B981' : '#E2E8F0'}`,
                      background: workingHoursTier.includes('Tier 1') ? 'rgba(16, 185, 129, 0.08)' : '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.86rem', color: '#0F172A' }}>Tier 1 (Min)</span>
                      <Unlock size={14} color="#10B981" />
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#10B981' }}>2 - 4 hrs / wk</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>Light part-time / 1st-2nd Year safe</div>
                  </div>

                  {/* Tier 2: 4-6 hrs/wk */}
                  {(() => {
                    const isLocked = occupationType === 'student' && (academicYear === '1st Year' || academicYear === '2nd Year');
                    return (
                      <div
                        onClick={() => {
                          if (!isLocked) {
                            setWorkingHoursTier('Tier 2 (4-6 hrs/wk)');
                            setWeeklyHoursCap(6);
                          }
                        }}
                        style={{
                          border: `2px solid ${isLocked ? '#E2E8F0' : workingHoursTier.includes('Tier 2') ? '#10B981' : '#E2E8F0'}`,
                          background: isLocked ? '#F8FAFC' : workingHoursTier.includes('Tier 2') ? 'rgba(16, 185, 129, 0.08)' : '#FFFFFF',
                          borderRadius: '12px',
                          padding: '12px',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          opacity: isLocked ? 0.55 : 1,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.86rem', color: '#0F172A' }}>Tier 2</span>
                          {isLocked ? <Lock size={14} color="#EF4444" /> : <Unlock size={14} color="#10B981" />}
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '900', color: isLocked ? '#94A3B8' : '#2563EB' }}>4 - 6 hrs / wk</div>
                        <div style={{ fontSize: '0.72rem', color: isLocked ? '#EF4444' : '#64748B', marginTop: '4px' }}>
                          {isLocked ? '🔒 Locked (1st/2nd Yr)' : '3rd/4th Year & Non-Worker'}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tier 3: 6-8 hrs/wk */}
                  {(() => {
                    const isLocked = occupationType === 'student';
                    return (
                      <div
                        onClick={() => {
                          if (!isLocked) {
                            setWorkingHoursTier('Tier 3 (6-8 hrs/wk)');
                            setWeeklyHoursCap(8);
                          }
                        }}
                        style={{
                          border: `2px solid ${isLocked ? '#E2E8F0' : workingHoursTier.includes('Tier 3') ? '#10B981' : '#E2E8F0'}`,
                          background: isLocked ? '#F8FAFC' : workingHoursTier.includes('Tier 3') ? 'rgba(16, 185, 129, 0.08)' : '#FFFFFF',
                          borderRadius: '12px',
                          padding: '12px',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          opacity: isLocked ? 0.55 : 1,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.86rem', color: '#0F172A' }}>Tier 3</span>
                          {isLocked ? <Lock size={14} color="#EF4444" /> : <Unlock size={14} color="#10B981" />}
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '900', color: isLocked ? '#94A3B8' : '#8B5CF6' }}>6 - 8 hrs / wk</div>
                        <div style={{ fontSize: '0.72rem', color: isLocked ? '#EF4444' : '#64748B', marginTop: '4px' }}>
                          {isLocked ? '🔒 Locked for Students' : 'Regular Part-Time Associate'}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tier 4: 40 hrs/wk Full-Time */}
                  {(() => {
                    const isLocked = occupationType === 'student' || occupationType === 'non_worker';
                    return (
                      <div
                        onClick={() => {
                          if (!isLocked) {
                            setWorkingHoursTier('Tier 4 (Full-Time 40h/wk)');
                            setWeeklyHoursCap(40);
                          }
                        }}
                        style={{
                          border: `2px solid ${isLocked ? '#E2E8F0' : workingHoursTier.includes('Tier 4') ? '#10B981' : '#E2E8F0'}`,
                          background: isLocked ? '#F8FAFC' : workingHoursTier.includes('Tier 4') ? 'rgba(16, 185, 129, 0.08)' : '#FFFFFF',
                          borderRadius: '12px',
                          padding: '12px',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          opacity: isLocked ? 0.55 : 1,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.86rem', color: '#0F172A' }}>Tier 4 (Full)</span>
                          {isLocked ? <Lock size={14} color="#EF4444" /> : <Unlock size={14} color="#10B981" />}
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '900', color: isLocked ? '#94A3B8' : '#F59E0B' }}>40 hrs / wk</div>
                        <div style={{ fontSize: '0.72rem', color: isLocked ? '#EF4444' : '#64748B', marginTop: '4px' }}>
                          {isLocked ? '🔒 Full-Time Only' : 'Industrial Shift Worker'}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              </div>

              {/* 5. LOGISTICS, BRANCH & ROLE DESIGNATION */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Assigned Facility Branch / Dock
                  </label>
                  <select
                    value={assignedBranchId}
                    onChange={handleBranchChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      background: '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  >
                    {branches && branches.length > 0 ? (
                      branches.map(b => (
                        <option key={b.branch_id || b.id} value={b.branch_id || b.id}>
                          {b.branch_name} ({b.branch_id || b.id})
                        </option>
                      ))
                    ) : (
                      <option value="BR-MAIN-1">Central Smelter & Refining Dock</option>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Role / Professional Designation
                  </label>
                  <input
                    type="text"
                    value={roleDesignation}
                    onChange={e => setRoleDesignation(e.target.value)}
                    placeholder="e.g. Certified Hazardous E-Waste Handler"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Collection Fleet Vehicle (If Applicable)
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={e => setVehicleNumber(e.target.value)}
                    placeholder="e.g. UP-70-AB-1042"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* 6. AUTOMATED CREDENTIAL GENERATION LIVE PREVIEW */}
              <div style={{
                background: '#0F172A',
                borderRadius: '16px',
                padding: '18px 20px',
                color: '#FFFFFF'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Sparkles size={16} color="#10B981" />
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.04em', color: '#10B981', textTransform: 'uppercase' }}>
                    Live Auto-Generated Credential Preview:
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Generated CPCB Worker ID:</span>
                    <div style={{ color: '#60A5FA', fontWeight: '800', fontFamily: 'monospace', marginTop: '2px' }}>{previewCpcbId}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Corporate Login Email:</span>
                    <div style={{ color: '#34D399', fontWeight: '700', marginTop: '2px' }}>{previewEmail}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Initial Security Key:</span>
                    <div style={{ color: '#F87171', fontWeight: '800', fontFamily: 'monospace', marginTop: '2px' }}>{org.organization_name.split(' ')[0]}#Rec••••!</div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={resetAndClose}
                  style={{
                    padding: '12px 22px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    background: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-register-worker-btn"
                  disabled={submitting}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <UserPlus size={16} />
                  <span>{submitting ? 'Registering Worker & Minting CPCB Key...' : 'Register Worker & Generate Credentials →'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
