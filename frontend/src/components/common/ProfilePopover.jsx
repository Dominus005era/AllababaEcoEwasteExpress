import React, { useEffect, useRef } from 'react';
import { 
  User, 
  LogOut, 
  ShieldCheck, 
  Settings, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  LifeBuoy,
  Truck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfilePopover = ({ isOpen, onClose, onNavigate, onOpenSupport, anchorRef }) => {
  const { currentUser, userRole, logout } = useAuth();
  const popoverRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target) &&
        (!anchorRef?.current || !anchorRef.current.contains(e.target))
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !currentUser) return null;

  const roleLabel = userRole === 'admin' 
    ? 'Platform Administrator' 
    : userRole === 'recycler' 
    ? 'CPCB Authorized Recycler' 
    : 'Verified E-Waste Donor';

  const roleColor = userRole === 'admin' 
    ? '#8B5CF6' 
    : userRole === 'recycler' 
    ? '#3B82F6' 
    : '#10B981';

  const displayName = userRole === 'recycler'
    ? (currentUser.companyName || currentUser.displayName || currentUser.name || 'Certified Recycler')
    : (currentUser.displayName || currentUser.companyName || currentUser.name || currentUser.email?.split('@')[0] || 'EcoTrace User');
  const email = currentUser.email || 'user@ecotrace.org';
  const userInitial = (displayName || 'U')[0].toUpperCase();
  const accountId = currentUser.id || (userRole === 'recycler' ? 'ECO-REC-ID' : userRole === 'admin' ? 'ADMIN-ROOT' : 'ECO-DNR-ID');
  const upiId = currentUser.upiId || 'Not Linked';

  const handleOpenSettings = () => {
    onClose();
    if (onNavigate) {
      onNavigate('settings');
    }
  };

  const handleSignOut = () => {
    logout();
    onClose();
    if (onNavigate) {
      onNavigate('landing');
    }
  };

  return (
    <>
      {/* Mobile transparent backdrop for clean tap dismiss */}
      <div 
        className="profile-popover-backdrop"
        onClick={onClose}
      />

      {/* Floating Dialog Box pointing to Header Profile */}
      <div 
        ref={popoverRef}
        className="profile-popover-dialog animate-popover"
        role="dialog"
        aria-label="User Account Quick Snapshot"
      >
        {/* Triangle Arrow Pointer pointing up to profile name */}
        <div className="profile-popover-arrow" />

        {/* 1. Header Snapshot Bar */}
        <div className="profile-popover-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span 
              className="pulse-dot" 
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: roleColor, display: 'inline-block' }} 
            />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
              Active Session
            </span>
          </div>
          <span 
            className="badge" 
            style={{ 
              fontSize: '0.72rem', 
              padding: '2px 8px', 
              background: userRole === 'admin' ? 'rgba(139, 92, 246, 0.15)' : userRole === 'recycler' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: roleColor,
              border: `1px solid ${roleColor}40`,
              fontWeight: '700'
            }}
          >
            {userRole ? userRole.toUpperCase() : 'DONOR'}
          </span>
        </div>

        {/* 2. User Bio & Avatar (Clickable to open full Profile Settings) */}
        <div 
          className="profile-popover-user-card"
          onClick={handleOpenSettings}
          title="Click to open full Profile &amp; Account Settings"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenSettings(); }}
        >
          <div className="popover-avatar-wrapper">
            <div 
              className="popover-avatar"
              style={{
                background: userRole === 'admin' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : userRole === 'recycler' ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #10B981, #059669)',
                color: '#FFFFFF'
              }}
            >
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userInitial
              )}
            </div>
            <div className="popover-avatar-badge" title="Verified Account">
              <ShieldCheck size={12} color="#FFFFFF" />
            </div>
          </div>

          <div className="popover-user-info">
            <div className="popover-user-name-row">
              <span className="popover-user-name">{displayName}</span>
              <ExternalLink size={13} className="popover-link-icon" />
            </div>
            <div className="popover-user-email">{email}</div>
            <div className="popover-user-badge-pill" style={{ color: roleColor, borderColor: `${roleColor}40` }}>
              <CheckCircle2 size={11} />
              <span>{roleLabel}</span>
            </div>
          </div>
        </div>

        {/* 3. Display-Only Info Snapshot Matrix (Non-editable) */}
        <div className="profile-popover-matrix">
          <div className="popover-matrix-row">
            <span className="matrix-label">Account ID</span>
            <span className="matrix-value font-mono" style={{ color: roleColor }}>{accountId}</span>
          </div>

          {userRole !== 'admin' && (
            <div className="popover-matrix-row">
              <span className="matrix-label">Primary UPI</span>
              <span className="matrix-value font-mono">{upiId}</span>
            </div>
          )}

          <div className="popover-matrix-row">
            <span className="matrix-label">Security State</span>
            <span className="matrix-value" style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} />
              Verified Active
            </span>
          </div>
        </div>

        {/* 4. Action Buttons: Account Settings & Profile and Sign Out ONLY */}
        <div className="profile-popover-actions">
          {/* 1. Account Settings & Profile */}
          <button 
            onClick={handleOpenSettings}
            className="popover-action-btn settings-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={16} className="btn-icon" />
              <span>Account Settings &amp; Profile</span>
            </div>
            <ChevronRight size={15} color="var(--text-muted)" />
          </button>

          {/* 2. Sign Out */}
          <button 
            onClick={handleSignOut}
            className="popover-action-btn signout-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LogOut size={16} color="#EF4444" />
              <span style={{ color: '#EF4444', fontWeight: '700' }}>Sign Out of Account</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
