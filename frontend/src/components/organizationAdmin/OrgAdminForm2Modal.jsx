import React, { useState } from 'react';
import { 
  Award, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Building2, 
  CheckCircle2,
  Printer
} from 'lucide-react';

export const OrgAdminForm2Modal = ({
  activeCertModal = null,
  orgUser = null,
  onClose = () => {}
}) => {
  const [certCopied, setCertCopied] = useState(false);

  if (!activeCertModal) return null;

  const cert = activeCertModal;
  const certId = cert.certificateId || `CPCB-UP-2026-F2-${Date.now().toString().slice(-6)}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(certId);
    setCertCopied(true);
    setTimeout(() => setCertCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px'
    }}>
      <div 
        className="animate-fadeIn"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '22px',
          padding: 'clamp(16px, 4vw, 28px)',
          maxWidth: '660px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* Header Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '11px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              flexShrink: 0
            }}>
              <Award size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.01em' }}>
                CPCB Statutory Form-2 Certificate
              </h3>
              <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                Ministry of Environment, Forest &amp; Climate Change
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Certificate Sheet Display */}
        <div style={{
          border: '2px solid #059669',
          borderRadius: '16px',
          padding: 'clamp(14px, 3vw, 20px)',
          background: 'linear-gradient(180deg, #FAFCFA 0%, #FFFFFF 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          position: 'relative'
        }}>
          {/* Certificate Top Seal */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid #D1FAE5', paddingBottom: '12px' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Central Pollution Control Board
            </div>
            <h2 style={{ fontSize: 'clamp(1.05rem, 3.2vw, 1.25rem)', fontWeight: '900', color: '#0F172A', margin: '4px 0 2px' }}>
              Certificate of Safe E-Waste Destruction &amp; Recycling
            </h2>
            <div style={{ fontSize: '0.74rem', color: '#475569' }}>
              Under E-Waste Management Rules, 2022 • Form-2
            </div>
          </div>

          {/* Certificate Identification Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ECFDF5',
            padding: '8px 12px',
            borderRadius: '10px',
            border: '1px solid #A7F3D0',
            flexWrap: 'wrap',
            gap: '6px'
          }}>
            <div>
              <div style={{ fontSize: '0.66rem', color: '#047857', fontWeight: '800', textTransform: 'uppercase' }}>Certificate Number:</div>
              <div style={{ fontFamily: 'monospace', fontWeight: '900', color: '#065F46', fontSize: '0.88rem' }}>{certId}</div>
            </div>

            <button
              onClick={handleCopyId}
              style={{
                background: '#FFFFFF',
                border: '1px solid #A7F3D0',
                color: '#047857',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {certCopied ? <Check size={11} /> : <Copy size={11} />}
              <span>{certCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Certificate Data Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: '700' }}>Issued To Client / Corporate:</span>
              <strong style={{ color: '#0F172A' }}>{cert.clientName || 'Enterprise Partner'}</strong>
            </div>

            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: '700' }}>Authorized Smelter Facility:</span>
              <strong style={{ color: '#059669' }}>{orgUser?.organizationName || 'Central Processing Base'}</strong>
            </div>

            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: '700' }}>Batch Reference:</span>
              <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{cert.id || 'BATCH-901'}</strong>
            </div>

            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: '700' }}>Net Verified Payload:</span>
              <strong style={{ color: '#0F172A' }}>{cert.weightKg} kg (Net Mass)</strong>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: '700' }}>Category &amp; Elemental Matrix:</span>
              <strong style={{ color: '#0F172A' }}>{cert.category} ({cert.metalsExpected})</strong>
            </div>
          </div>

          {/* Legal Compliance Disclaimer */}
          <div style={{
            fontSize: '0.74rem',
            color: '#475569',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '9px 11px',
            lineHeight: '1.4'
          }}>
            This certifies that the electronic equipment specified above has been dismantled, shredded, and smelted in strict adherence to CPCB Environmental Standards. All hazardous fractions have been safely neutralized.
          </div>

          {/* Signatures & Seal Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #E2E8F0',
            paddingTop: '10px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>CPCB License ID:</div>
              <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#0F172A', fontSize: '0.78rem' }}>
                {orgUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891'}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '2px dashed #059669',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                fontWeight: '900',
                fontSize: '0.6rem'
              }}>
                SEAL
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#059669', marginTop: '2px' }}>
                Digitally Signed &amp; Encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrint}
            style={{
              flex: '1 1 160px',
              padding: '11px',
              borderRadius: '10px',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '800',
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              minHeight: '38px'
            }}
          >
            <Printer size={15} />
            <span>Print Official Form-2</span>
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '11px 18px',
              borderRadius: '10px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontWeight: '700',
              fontSize: '0.84rem',
              cursor: 'pointer',
              minHeight: '38px'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
