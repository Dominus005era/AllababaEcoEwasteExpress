import React, { useEffect } from 'react';
import { X, ZoomIn, Download, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const ImageLightboxModal = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'Hardware Device Photo',
  subtitle = 'Multimodal AI Vision & Inspection Photograph',
  tags = []
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card, #0F172A)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(16, 185, 129, 0.2)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color, #334155)',
          background: 'var(--bg-secondary, #1E293B)',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '3px 8px', fontWeight: '800' }}>
                <Sparkles size={12} />
                <span>VERIFIED HARDWARE ASSET</span>
              </span>
              {tags.map((t, idx) => (
                <span key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary, #94A3B8)',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {t}
                </span>
              ))}
            </div>

            <h3 style={{
              margin: 0,
              fontSize: '1.15rem',
              fontWeight: '800',
              color: 'var(--text-primary, #FFFFFF)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{
                margin: '2px 0 0',
                fontSize: '0.76rem',
                color: 'var(--text-secondary, #94A3B8)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                borderRadius: '10px',
                color: 'var(--text-primary, #FFFFFF)',
                borderColor: 'var(--border-color, #334155)',
                textDecoration: 'none'
              }}
              title="Open full resolution in new tab"
            >
              <ExternalLink size={13} />
              <span className="hide-on-mobile">Full Res</span>
            </a>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Close (ESC)"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* High-Resolution Image Container */}
        <div style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
          minHeight: '260px',
          maxHeight: '62vh',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '58vh',
              objectFit: 'contain',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* Bottom Metadata & Zero-Landfill Trust Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'var(--bg-secondary, #1E293B)',
          borderTop: '1px solid var(--border-color, #334155)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-secondary, #94A3B8)',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: '700' }}>
            <CheckCircle2 size={14} />
            <span>Cryptographic CPCB &amp; ISO 14001 Chain of Custody</span>
          </div>

          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
            style={{
              padding: '6px 16px',
              fontSize: '0.78rem',
              fontWeight: '800',
              borderRadius: '8px'
            }}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
