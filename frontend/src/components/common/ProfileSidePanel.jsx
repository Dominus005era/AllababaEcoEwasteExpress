import React, { useState, useRef } from 'react';
import { 
  X, 
  User, 
  Camera, 
  Edit3, 
  Check, 
  LogOut, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  Mail, 
  CreditCard, 
  Phone, 
  LayoutDashboard, 
  Smartphone, 
  Award,
  ChevronRight,
  Bot,
  Sliders,
  HelpCircle,
  LifeBuoy,
  Warehouse,
  History,
  Truck,
  Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileSidePanel = ({ isOpen, onClose, onNavigate, onOpenSupport }) => {
  const { currentUser, userRole, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.displayName || '');
  const [editUpi, setEditUpi] = useState(currentUser?.upiId || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || null);
  const fileInputRef = useRef(null);

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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target.result;
      setAvatarUrl(url);
      updateProfile({ avatarUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    updateProfile({
      displayName: editName,
      upiId: editUpi,
      phone: editPhone
    });
    setIsEditing(false);
  };

  const handleSignOut = () => {
    logout();
    onClose();
    if (onNavigate) {
      onNavigate('landing');
    }
  };

  const handleGoToDashboard = () => {
    onClose();
    if (userRole === 'admin') {
      onNavigate('admin');
    } else if (userRole === 'recycler') {
      onNavigate('recycler');
    } else {
      onNavigate('donor-dash');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {/* Backdrop click to close */}
      <div 
        style={{ flex: 1, cursor: 'pointer' }} 
        onClick={onClose} 
      />

      {/* Hidden File Input for Avatar Upload */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleAvatarChange} 
      />

      {/* Slide-over Side Panel */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-color)',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}>
        
        {/* TOP BAR & CLOSE BUTTON */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: roleColor }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Active Session
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title="Close Panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE BODY CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          
          {/* PROFILE HEADER SECTION */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            
            {/* Avatar Circle with Edit Button Overlay */}
            <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 16px' }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${roleColor}, #0F172A)`,
                border: `3px solid ${roleColor}`,
                boxShadow: `0 0 20px ${roleColor}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2.2rem', fontWeight: '800' }}>
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>

              {/* Edit Avatar Badge */}
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  background: 'var(--emerald-primary)',
                  color: '#FFFFFF',
                  border: '2px solid var(--bg-card)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
                title="Upload Profile Picture"
              >
                <Camera size={15} />
              </button>
            </div>

            {/* User Name & Role Pill */}
            {!isEditing ? (
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 6px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>{currentUser.displayName || currentUser.email?.split('@')[0] || 'Eco-User'}</span>
                  <button 
                    onClick={() => {
                      setEditName(currentUser.displayName || '');
                      setEditUpi(currentUser.upiId || '');
                      setEditPhone(currentUser.phone || '');
                      setIsEditing(true);
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                    title="Edit profile info"
                  >
                    <Edit3 size={14} />
                  </button>
                </h3>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  {currentUser.email}
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: `${roleColor}18`,
                  color: roleColor,
                  border: `1px solid ${roleColor}40`,
                  padding: '4px 14px',
                  borderRadius: '50px',
                  fontSize: '0.78rem',
                  fontWeight: '700'
                }}>
                  <ShieldCheck size={13} />
                  <span>{roleLabel}</span>
                </div>
              </div>
            ) : (
              /* Inline Edit Form */
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Display Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>UPI Payout ID</label>
                  <input
                    type="text"
                    value={editUpi}
                    onChange={(e) => setEditUpi(e.target.value)}
                    placeholder="e.g. name@upi"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-primary btn-sm" 
                    style={{ flex: 1, padding: '8px' }}
                    onClick={handleSaveProfile}
                  >
                    <Check size={14} />
                    <span>Save Changes</span>
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ padding: '8px 14px' }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* QUICK DASHBOARD ACCESS CARD */}
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={handleGoToDashboard}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--emerald-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800' }}>
                    {userRole === 'admin' ? 'Open Admin Console' : userRole === 'recycler' ? 'Open Recycler Portal' : 'Open Donor Dashboard'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Access AI camera scans &amp; bookings
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="#10B981" />
            </button>
          </div>

          {/* RECYCLER-SPECIFIC OPERATIONS HUB (When Logged in as Recycler) */}
          {userRole === 'recycler' && (
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 4px 2px' }}>
                Recycler Logistics &amp; Handover Hub
              </div>

              {/* 1. Depot Delivery Lots & Gate Passes */}
              <button
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('recycler-lots');
                }}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Warehouse size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800' }}>Depot Delivery Lots &amp; Gate Passes</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Central base manifests &amp; QR permits</div>
                  </div>
                </div>
                <ChevronRight size={15} color="#10B981" />
              </button>

              {/* 2. Lifetime Recycling History & Audit Archive */}
              <button
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('recycler-history');
                }}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <History size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800' }}>Recycling History &amp; Audit Archive</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>CPCB Form 6 records &amp; precious metals</div>
                  </div>
                </div>
                <ChevronRight size={15} color="var(--text-secondary)" />
              </button>

              {/* 3. GeoLogistics Fleet Dispatch Map */}
              <button
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('geologistics');
                }}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800' }}>GeoLogistics Fleet Dispatch</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Live GPS routing &amp; donor doorstep ETAs</div>
                  </div>
                </div>
                <ChevronRight size={15} color="var(--text-secondary)" />
              </button>
            </div>
          )}

          {/* SETTINGS & ECOBOT AI PREFERENCES BUTTON */}
          <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* ACCOUNT PROFILE & PREFERENCES */}
            <button
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('settings');
              }}
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--emerald-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Settings size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '800' }}>
                    Account Profile &amp; Preferences
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Personal profile, wallet &amp; notifications
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="var(--text-secondary)" />
            </button>
          </div>

          {/* ACCOUNT DETAILS & METRICS */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Unique Account ID</span>
              <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#10B981' }}>
                {currentUser.id || 'ECO-DNR-2026-1001'}
              </span>
            </div>

            {currentUser.cpcbLicense && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>CPCB License ID</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {currentUser.cpcbLicense}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>UPI ID</span>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                {currentUser.upiId || 'Not configured'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Session Security</span>
              <span style={{ color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} />
                <span>Verified Active</span>
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM FIXED SIGN OUT BUTTON */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)'
        }}>
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#EF4444',
              borderRadius: '10px',
              padding: '12px 18px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={18} />
            <span>Sign Out of Account</span>
          </button>
        </div>

      </div>
    </div>
  );
};
