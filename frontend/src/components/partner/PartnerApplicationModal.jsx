import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Cpu, 
  Sparkles, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Layers
} from 'lucide-react';
import { partnersApi } from '../../services/api';

export const PartnerApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    orgType: 'Corporate IT Park & Enterprise',
    city: '',
    state: 'Maharashtra',
    estimatedVolume: '1-5 MT / Quarter',
    servicesRequired: [
      'Scheduled Bulk Doorstep Pickup',
      'CPCB Form-2 EPR Compliance Certificate',
      'Digital E-Waste Passports & ESG Tracking'
    ],
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const availableServices = [
    { id: 'Scheduled Bulk Doorstep Pickup', label: 'Scheduled Bulk Doorstep Pickup', icon: Truck },
    { id: 'CPCB Form-2 EPR Compliance Certificate', label: 'CPCB Form-2 EPR Compliance Certificate', icon: ShieldCheck },
    { id: 'NIST 800-88 Certified Data Degaussing', label: 'NIST 800-88 Data Sanitization & Shredding', icon: FileText },
    { id: 'Rare Precious Metal Recovery / Smelter Bidding', label: 'Rare Metal Recovery & Smelter Bids', icon: Cpu },
    { id: 'Digital E-Waste Passports & ESG Tracking', label: 'Digital E-Waste Passport & ESG Telemetry', icon: Globe },
    { id: 'Campus / Corporate Collection Drive Setup', label: 'On-Premises Collection Bins & Drives', icon: Sparkles }
  ];

  const orgTypes = [
    'Corporate IT Park & Enterprise',
    'Educational Institution & University Campus',
    'CPCB-Authorized Industrial Smelter & Deep-Tech Recycler',
    'Producer Responsibility Organization (PRO)',
    'Healthcare, Hospital & Medical Equipment Facility',
    'Government & Municipal Public Sector Undertaking',
    'Logistics & Aggregation Provider'
  ];

  const volumeTiers = [
    '50 - 200 kg / Month (Pilot)',
    '200 - 1,000 kg / Month (Medium)',
    '1 - 5 MT / Quarter (Standard Bulk)',
    '5 - 20 MT / Quarter (Large Enterprise)',
    '20+ MT / Quarter (Industrial Smelter Scale)'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi NCR', 'Gujarat', 
    'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleServiceToggle = (serviceId) => {
    if (formData.servicesRequired.includes(serviceId)) {
      setFormData({
        ...formData,
        servicesRequired: formData.servicesRequired.filter(s => s !== serviceId)
      });
    } else {
      setFormData({
        ...formData,
        servicesRequired: [...formData.servicesRequired, serviceId]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.organizationName.trim() || !formData.contactPerson.trim() || !formData.email.trim()) {
      setError('Please fill in Organization Name, Contact Person, and Official Corporate Email.');
      return;
    }

    setLoading(true);
    try {
      const res = await partnersApi.submitApplication(formData);
      setSuccessData(res);
    } catch (err) {
      setError(err.message || 'Failed to submit partnership request. Please verify inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-modal-backdrop">
      <div className="partner-modal-card">
        {/* Modal Header */}
        <div className="partner-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                background: 'rgba(16, 185, 129, 0.15)', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--emerald-primary)',
                flexShrink: 0
              }}
            >
              <Building2 size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                Partner with EcoTrace Network
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Join India's AI-powered e-waste collection &amp; recycling alliance
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer', 
              padding: '6px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              flexShrink: 0
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="partner-modal-body">
          {successData ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '2px solid #10B981',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px',
                  color: '#10B981'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                Partnership Request Submitted!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.55' }}>
                Your partnership application has been securely registered in the EcoTrace Master Governance database. 
                Our platform administrators will inspect your credentials and issue dedicated <strong>Organization Admin</strong> login keys.
              </p>

              <div 
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  maxWidth: '440px', 
                  margin: '0 auto 24px',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px' }}>
                  Application Summary
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Organization:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{formData.organizationName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Primary Email:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{formData.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Category:</span>
                  <span style={{ color: 'var(--emerald-primary)', fontWeight: '600' }}>{formData.orgType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Application ID:</span>
                  <code style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>{successData.applicationId}</code>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                onClick={onClose}
                style={{ padding: '12px 28px', fontSize: '0.92rem', fontWeight: '700', width: '100%', maxWidth: '280px', margin: '0 auto', justifyContent: 'center' }}
              >
                Done &amp; Return to Ecosystem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {error && (
                <div 
                  style={{ 
                    padding: '10px 14px', 
                    borderRadius: '10px', 
                    background: 'rgba(239, 68, 68, 0.12)', 
                    border: '1px solid rgba(239, 68, 68, 0.3)', 
                    color: '#EF4444', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '0.84rem'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* SECTION 1: ORGANIZATION CREDENTIALS & IDENTITY */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--emerald-primary)', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={14} />
                  <span>1. Organization &amp; Officer Identity</span>
                </div>
                <div className="partner-form-grid-2col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Organization / Company Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="auth-input" 
                      placeholder="e.g. Infotech Park &amp; Towers Pvt Ltd"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Authorized Officer &amp; Title *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="auth-input" 
                      placeholder="e.g. Priya Sharma (VP - Infrastructure)"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Corporate Work Email *
                    </label>
                    <input 
                      type="email" 
                      required 
                      className="auth-input" 
                      placeholder="e.g. esg@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Contact Phone / WhatsApp
                    </label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: SECTOR CLASSIFICATION & GEOGRAPHY */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--emerald-primary)', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} />
                  <span>2. Sector Classification &amp; Scale</span>
                </div>
                <div className="partner-form-grid-2col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Organization Sector
                    </label>
                    <select 
                      className="auth-input" 
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', background: 'var(--bg-card)', boxSizing: 'border-box' }}
                    >
                      {orgTypes.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      Estimated E-Waste Volume
                    </label>
                    <select 
                      className="auth-input" 
                      value={formData.estimatedVolume}
                      onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', background: 'var(--bg-card)', boxSizing: 'border-box' }}
                    >
                      {volumeTiers.map((v, idx) => (
                        <option key={idx} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      City / Industrial District
                    </label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      placeholder="e.g. Navi Mumbai / Bengaluru / Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                      State / Union Territory
                    </label>
                    <select 
                      className="auth-input" 
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      style={{ paddingLeft: '12px', width: '100%', background: 'var(--bg-card)', boxSizing: 'border-box' }}
                    >
                      {indianStates.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: SERVICES & CAPABILITIES REQUESTED */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--emerald-primary)', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} />
                  <span>3. Services &amp; Compliance Solutions</span>
                </div>
                <div className="partner-service-grid">
                  {availableServices.map((svc) => {
                    const isChecked = formData.servicesRequired.includes(svc.id);
                    const SvcIcon = svc.icon;
                    return (
                      <label 
                        key={svc.id}
                        onClick={() => handleServiceToggle(svc.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          background: isChecked ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-card)',
                          border: isChecked ? '1px solid #10B981' : '1px solid var(--border-color)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => {}} // Handled by parent click
                          style={{ accentColor: '#10B981', width: '16px', height: '16px', flexShrink: 0 }}
                        />
                        <SvcIcon size={16} color={isChecked ? '#10B981' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: isChecked ? '700' : '500', color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: '1.3' }}>
                          {svc.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: SCOPE & SPECIAL DIRECTIVES */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>
                  Partnership Scope &amp; Facilities Note (Optional)
                </label>
                <textarea 
                  className="auth-input" 
                  rows={2} 
                  placeholder="Describe your current e-waste accumulation, frequency of pickups, CPCB audit timeline, or special requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ padding: '10px 12px', width: '100%', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {/* Submission Notice & Action Buttons */}
              <div className="partner-modal-footer">
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', maxWidth: '380px', lineHeight: '1.4' }}>
                  🔒 Applications are reviewed by the Master Administration. Approved partners receive credentials to manage corporate pickups &amp; ESG certificates.
                </div>
                <div className="partner-modal-footer-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}
                    style={{ gap: '8px', padding: '12px 20px', fontSize: '0.92rem', fontWeight: '800', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>{loading ? 'Submitting Application...' : 'Submit Partnership Application'}</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={onClose}
                    disabled={loading}
                    style={{ padding: '10px 18px', fontSize: '0.88rem', justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
