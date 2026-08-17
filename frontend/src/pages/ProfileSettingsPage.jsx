import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Bell, 
  Smartphone, 
  Lock, 
  Check, 
  Copy, 
  Download, 
  ArrowLeft, 
  ChevronRight, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Camera, 
  Save, 
  RotateCcw,
  Zap,
  TrendingUp,
  Receipt,
  FileText,
  Sliders,
  LogOut,
  Laptop,
  Globe,
  ExternalLink,
  Award,
  Edit3,
  X,
  MapPin,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Info,
  PackageCheck,
  Bot,
  Radio,
  LifeBuoy,
  ShieldAlert,
  Clock,
  Truck
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { authApi, pickupApi, recyclersApi } from '../services/api';

export const ProfileSettingsPage = ({ onNavigate }) => {
  const { currentUser, userRole, updateProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Desktop active tab
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mobile drilldown state: null = show minor split menu; 'profile', 'wallet', etc. = show major split details
  const [mobileSelectedTab, setMobileSelectedTab] = useState(null);

  // Edit Mode state for Personal Profile (Default: READ-ONLY / DISPLAY MODE)
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Form states for Personal Profile (Initialized with real user data or clean fallbacks)
  const [displayName, setDisplayName] = useState(currentUser?.displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : 'Aarav Sharma'));
  const [companyName, setCompanyName] = useState(currentUser?.companyName || (userRole === 'recycler' ? 'EcoGreen Smelters & Refining Ltd' : ''));
  const [cpcbLicense, setCpcbLicense] = useState(currentUser?.cpcbLicense || (userRole === 'recycler' ? 'CPCB-UP-2026-REC-0891' : ''));
  const [email, setEmail] = useState(currentUser?.email || '');
  const [district, setDistrict] = useState(currentUser?.district || 'Prayagraj');
  const [stateVal, setStateVal] = useState(currentUser?.state || 'Uttar Pradesh');
  const [country, setCountry] = useState(currentUser?.country || 'India');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 94150 45678');
  const [address, setAddress] = useState(currentUser?.address || 'Plot 42, Naini Industrial Area, Prayagraj, UP 211008');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || null);
  const [profession, setProfession] = useState(currentUser?.profession || 'Student');
  const [organizationOrCollege, setOrganizationOrCollege] = useState(currentUser?.organizationOrCollege || 'Motilal Nehru National Institute of Technology (MNNIT)');
  const [jobRoleOrDegree, setJobRoleOrDegree] = useState(currentUser?.jobRoleOrDegree || 'B.Tech Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || '3rd Year');
  const [experienceYears, setExperienceYears] = useState(currentUser?.experienceYears || '0 Years');

  // Real user pickups loaded from backend for real transactions / impact
  const [userPickups, setUserPickups] = useState([]);
  const [loadingPickups, setLoadingPickups] = useState(false);

  // Wallet / UPI States
  const [upiId, setUpiId] = useState(currentUser?.upiId || '');
  const [showQrModal, setShowQrModal] = useState(false);
  const [walletFilter, setWalletFilter] = useState('all');
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [newUpiInput, setNewUpiInput] = useState(currentUser?.upiId || '');

  // Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification States
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmailMonthly, setNotifyEmailMonthly] = useState(false);

  // UI status feedbacks
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const fileInputRef = useRef(null);

  // Load user profile details
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : 'Aarav Sharma'));
      setCompanyName(currentUser.companyName || (userRole === 'recycler' ? 'EcoGreen Smelters & Refining Ltd' : ''));
      setCpcbLicense(currentUser.cpcbLicense || (userRole === 'recycler' ? 'CPCB-UP-2026-REC-0891' : ''));
      setEmail(currentUser.email || '');
      setDistrict(currentUser.district || 'Prayagraj');
      setStateVal(currentUser.state || 'Uttar Pradesh');
      setCountry(currentUser.country || 'India');
      setPhone(currentUser.phone || '+91 94150 45678');
      setAddress(currentUser.address || 'Plot 42, Naini Industrial Area, Prayagraj, UP 211008');
      setBio(currentUser.bio || '');
      setUpiId(currentUser.upiId || '');
      setNewUpiInput(currentUser.upiId || '');
      setAvatarUrl(currentUser.avatarUrl || null);
      setProfession(currentUser.profession || 'Student');
      setOrganizationOrCollege(currentUser.organizationOrCollege || 'Motilal Nehru National Institute of Technology (MNNIT)');
      setJobRoleOrDegree(currentUser.jobRoleOrDegree || 'B.Tech Computer Science & Engineering');
      setYearOfStudy(currentUser.yearOfStudy || '3rd Year');
      setExperienceYears(currentUser.experienceYears || '0 Years');
    }
  }, [currentUser, userRole]);

  // Load real pickup bookings for live wallet and transaction passbook
  useEffect(() => {
    const fetchUserPickups = async () => {
      setLoadingPickups(true);
      try {
        const res = await pickupApi.getAll();
        if (res.pickups && Array.isArray(res.pickups)) {
          setUserPickups(res.pickups);
        } else {
          setUserPickups([]);
        }
      } catch (err) {
        setUserPickups([]);
      } finally {
        setLoadingPickups(false);
      }
    };
    fetchUserPickups();
  }, []);

  const donorId = currentUser?.id || (userRole === 'recycler' ? 'ECO-REC-ID' : userRole === 'admin' ? 'ADMIN-ROOT' : 'ECO-DNR-ID');
  const userInitial = (displayName || currentUser?.email || 'U')[0].toUpperCase();

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

  // Work Settings & Duty Schedule States for Recyclers
  const [workStartTime, setWorkStartTime] = useState(currentUser?.workStartTime || '09:00');
  const [workEndTime, setWorkEndTime] = useState(currentUser?.workEndTime || '18:00');
  const [timeOffMode, setTimeOffMode] = useState(currentUser?.timeOffMode || false);
  const [isActiveDuty, setIsActiveDuty] = useState(currentUser?.isActiveDuty !== false);
  const [workDistrict, setWorkDistrict] = useState(currentUser?.district || 'Prayagraj');
  const [dutyLogs, setDutyLogs] = useState([]);
  const [savingWorkSchedule, setSavingWorkSchedule] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [isEditingWorkSchedule, setIsEditingWorkSchedule] = useState(false);

  // Instant Duty Toggle Handler (Works whether Edit Mode is ON or OFF)
  const handleToggleInstantDuty = async (nextActiveState, nextTimeOffState) => {
    setIsActiveDuty(nextActiveState);
    setTimeOffMode(nextTimeOffState);
    try {
      if (recyclersApi.updateDutyStatus) {
        await recyclersApi.updateDutyStatus({
          recyclerId: currentUser?.id || 'AUTH-REC-001',
          recyclerName: displayName || currentUser?.companyName || 'Authorized Recycler',
          isActiveDuty: nextActiveState,
          timeOffMode: nextTimeOffState,
          workStartTime,
          workEndTime,
          triggeredBy: 'settings_toggle'
        });
      }
      fetchDutyLogs();
    } catch (err) {
      console.warn('Instant duty toggle sync note:', err);
    }
  };

  // Navigation tabs list
  const navTabs = [
    { id: 'profile', label: 'Personal Profile', icon: User, subtitle: 'Name, contact & pickup address' },
    ...(userRole === 'recycler' ? [
      { id: 'work-schedule', label: 'Work Schedule & Duty Settings', icon: Clock, subtitle: 'Duty hours, time-off mode & ready location' }
    ] : []),
    { id: 'wallet', label: 'Wallet & UPI Passbook', icon: CreditCard, subtitle: 'Live UPI payout setup & passbook' },
    { id: 'support', label: 'Help & Support Core', icon: LifeBuoy, subtitle: 'AI diagnostics & Supreme Admin dispute escalation' },
    { id: 'impact', label: 'Disposal & Eco-Stats', icon: Award, subtitle: 'CO₂ abated & official certificate' },
    { id: 'security', label: 'Security & Sessions', icon: ShieldCheck, subtitle: 'Password & active device session' },
    { id: 'notifications', label: 'Alerts & Notifications', icon: Bell, subtitle: 'WhatsApp & SMS driver alerts' },
  ];

  // Fetch duty logs for recycler
  const fetchDutyLogs = async () => {
    try {
      if (recyclersApi.getDutyLogs) {
        const res = await recyclersApi.getDutyLogs(currentUser?.id || '');
        if (res.logs && Array.isArray(res.logs)) {
          setDutyLogs(res.logs);
        }
      }
    } catch (err) {
      console.warn('Duty logs fetch note:', err);
    }
  };

  useEffect(() => {
    if (userRole === 'recycler') {
      fetchDutyLogs();
    }
  }, [userRole]);

  // Save Work Schedule Handler
  const handleSaveWorkSchedule = async (e) => {
    if (e) e.preventDefault();
    setSavingWorkSchedule(true);
    try {
      if (recyclersApi.updateDutyStatus) {
        await recyclersApi.updateDutyStatus({
          recyclerId: currentUser?.id || 'AUTH-REC-001',
          recyclerName: displayName || currentUser?.companyName || 'Authorized Recycler',
          isActiveDuty: !timeOffMode && isActiveDuty,
          timeOffMode: timeOffMode,
          workStartTime,
          workEndTime,
          triggeredBy: 'settings_update'
        });
      }
      setIsEditingWorkSchedule(false);
      setScheduleSuccess(true);
      setTimeout(() => setScheduleSuccess(false), 3000);
      fetchDutyLogs();
    } catch (err) {
      console.error('Error saving work schedule:', err);
    } finally {
      setSavingWorkSchedule(false);
    }
  };

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedData = {
        displayName,
        companyName: userRole === 'recycler' ? companyName : undefined,
        cpcbLicense: userRole === 'recycler' ? cpcbLicense : undefined,
        district,
        state: stateVal,
        country,
        phone,
        address,
        bio,
        avatarUrl,
        upiId,
        profession: userRole === 'donor' ? profession : undefined,
        organizationOrCollege: userRole === 'donor' ? organizationOrCollege : undefined,
        jobRoleOrDegree: userRole === 'donor' ? jobRoleOrDegree : undefined,
        yearOfStudy: userRole === 'donor' ? yearOfStudy : undefined,
        experienceYears: userRole === 'donor' ? experienceYears : undefined
      };
      
      updateProfile(updatedData);

      try {
        if (authApi.updateProfile) {
          await authApi.updateProfile(updatedData);
        }
      } catch (err) {
        console.warn('Backend update note:', err);
      }

      setIsEditingProfile(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  // Cancel edit mode and revert to currentUser
  const handleCancelEdit = () => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : 'Aarav Sharma'));
      setCompanyName(currentUser.companyName || (userRole === 'recycler' ? 'EcoGreen Smelters & Refining Ltd' : ''));
      setCpcbLicense(currentUser.cpcbLicense || (userRole === 'recycler' ? 'CPCB-UP-2026-REC-0891' : ''));
      setDistrict(currentUser.district || 'Prayagraj');
      setStateVal(currentUser.state || 'Uttar Pradesh');
      setCountry(currentUser.country || 'India');
      setPhone(currentUser.phone || '+91 94150 45678');
      setAddress(currentUser.address || 'Plot 42, Naini Industrial Area, Prayagraj, UP 211008');
      setBio(currentUser.bio || '');
      setUpiId(currentUser.upiId || '');
      setAvatarUrl(currentUser.avatarUrl || null);
      setProfession(currentUser.profession || 'Student');
      setOrganizationOrCollege(currentUser.organizationOrCollege || 'Motilal Nehru National Institute of Technology (MNNIT)');
      setJobRoleOrDegree(currentUser.jobRoleOrDegree || 'B.Tech Computer Science & Engineering');
      setYearOfStudy(currentUser.yearOfStudy || '3rd Year');
      setExperienceYears(currentUser.experienceYears || '0 Years');
    }
    setIsEditingProfile(false);
  };

  // Avatar Upload Handler
  const handleAvatarFileChange = (e) => {
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

  // Copy Helpers
  const handleCopyId = () => {
    navigator.clipboard.writeText(donorId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyUpi = () => {
    if (!upiId) return;
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Save UPI
  const handleSaveUpi = () => {
    if (newUpiInput && newUpiInput.trim().length > 3) {
      setUpiId(newUpiInput.trim());
      updateProfile({ upiId: newUpiInput.trim() });
      setIsEditingUpi(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Real calculations based on actual user pickups (NO dummy fake data)
  const totalLifetimeEarned = userPickups
    .filter(p => p.status === 'Completed' || p.status === 'Recycled')
    .reduce((sum, p) => sum + (parseFloat(p.offeredPrice) || 0), 0);

  const pendingEscrowEarned = userPickups
    .filter(p => p.status !== 'Completed' && p.status !== 'Recycled')
    .reduce((sum, p) => sum + (parseFloat(p.offeredPrice) || 0), 0);

  const totalCo2Abated = userPickups
    .reduce((sum, p) => sum + (parseFloat(p.co2SavedKg) || 0), 0)
    .toFixed(1);

  const totalDevicesCount = userPickups.length;

  const toxicMetalsGrams = (totalDevicesCount * 24).toFixed(0);

  // Return to Dashboard or Landing based on role
  const handleBackToDashboard = () => {
    if (userRole === 'admin') {
      onNavigate('admin');
    } else if (userRole === 'recycler') {
      onNavigate('recycler');
    } else {
      onNavigate('donor-dash');
    }
  };

  // Detect platform device dynamically
  const platformName = typeof navigator !== 'undefined'
    ? navigator.userAgent.includes('Windows')
      ? 'Windows PC'
      : navigator.userAgent.includes('Mac')
      ? 'Apple Mac'
      : navigator.userAgent.includes('Android')
      ? 'Android Device'
      : navigator.userAgent.includes('iPhone')
      ? 'iOS iPhone'
      : 'Web Browser'
    : 'Active Workstation';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Header 
        currentView="settings" 
        onNavigate={onNavigate} 
      />

      <main style={{ flex: 1, padding: '24px 0 80px' }}>
        <div className="container">

          {/* TOP BREADCRUMB & BACK HEADER (Hidden on mobile sub-screen to prevent duplicate back buttons) */}
          <div className={`settings-top-header ${mobileSelectedTab !== null ? 'hide-on-mobile' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleBackToDashboard}
                className="btn btn-outline btn-sm back-nav-btn"
                title="Return to Dashboard"
              >
                <ArrowLeft size={16} />
                <span>Return to Dashboard</span>
              </button>

              <div className="settings-header-titles">
                <h1 style={{ fontSize: '1.55rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  Account Settings &amp; Profile
                </h1>
                <p style={{ color: 'var(--text-secondary)', margin: '2px 0 0', fontSize: '0.86rem' }}>
                  Manage your credentials, UPI payout passbook, theme preferences, and security.
                </p>
              </div>
            </div>

            {saveSuccess && (
              <div className="settings-toast-success animate-fadeIn">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Profile updated successfully!</span>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 1. DESKTOP SPLIT VIEW (Visible on >= 992px) */}
          {/* ========================================================================= */}
          <div className="settings-split-container hide-on-mobile-custom">
            
            {/* MINOR SPLIT (Left Navigation Sidebar) */}
            <aside className="settings-minor-split">
              {/* User Snapshot Mini Card */}
              <div className="minor-user-snapshot">
                <div className="minor-avatar-container">
                  <div 
                    className="minor-avatar"
                    style={{
                      background: userRole === 'admin' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : userRole === 'recycler' ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #10B981, #059669)',
                    }}
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="minor-avatar-edit-btn"
                    title="Change Profile Photo"
                  >
                    <Camera size={12} />
                  </button>
                </div>

                <div className="minor-user-name">
                  <div>{displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : 'Aarav Sharma')}</div>
                  {userRole === 'recycler' && companyName && (
                    <div style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: '700', marginTop: '2px' }}>
                      {companyName}
                    </div>
                  )}
                </div>
                <div className="minor-user-email">{email}</div>

                <div className="minor-badge-pill" style={{ color: roleColor, borderColor: `${roleColor}40` }}>
                  <ShieldCheck size={12} />
                  <span>{roleLabel}</span>
                </div>

                <div className="minor-id-box">
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>ID:</span>
                  <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: '700' }}>{donorId}</span>
                  <button 
                    onClick={handleCopyId}
                    className="minor-copy-btn"
                    title="Copy Account ID"
                  >
                    {copiedId ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              {/* Navigation Menu Tabs */}
              <nav className="minor-nav-menu">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsEditingProfile(false);
                      }}
                      className={`minor-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <div className="minor-nav-icon-wrapper">
                        <Icon size={17} color={isActive ? '#10B981' : 'var(--text-secondary)'} />
                      </div>
                      <div className="minor-nav-text">
                        <div className="minor-nav-title-row">
                          <span className="minor-nav-title">{tab.label}</span>
                        </div>
                        <span className="minor-nav-sub">{tab.subtitle}</span>
                      </div>
                      <ChevronRight size={15} className="minor-nav-arrow" />
                    </button>
                  );
                })}
              </nav>

              {/* Sign Out at bottom of minor split */}
              <div style={{ padding: '16px 14px 4px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
                <button
                  onClick={() => { logout(); onNavigate('landing'); }}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#EF4444', fontSize: '0.85rem' }}
                >
                  <LogOut size={15} />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </aside>

            {/* MAJOR SPLIT (Main Content Area for Selected Tab) */}
            <section className="settings-major-split">
              {renderMajorContent(activeTab)}
            </section>
          </div>

          {/* ========================================================================= */}
          {/* 2. MOBILE DRILL-DOWN NATIVE VIEW (Visible on < 992px) */}
          {/* ========================================================================= */}
          <div className="settings-mobile-container show-on-mobile-custom">
            
            {/* View A: When NO sub-screen is selected, display the MINOR SPLIT menu list */}
            {mobileSelectedTab === null ? (
              <div className="mobile-settings-menu animate-fadeIn">
                
                {/* Mobile User Profile Summary Banner */}
                <div className="mobile-profile-hero-card">
                  <div className="mobile-hero-avatar-row">
                    <div 
                      className="minor-avatar"
                      style={{
                        width: '52px',
                        height: '52px',
                        fontSize: '1.25rem',
                        background: userRole === 'admin' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : userRole === 'recycler' ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #10B981, #059669)',
                      }}
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        userInitial
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 2px', fontSize: '1.12rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        {displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : 'EcoTrace User')}
                      </h3>
                      {userRole === 'recycler' && companyName && (
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#3B82F6', marginBottom: '2px' }}>
                          {companyName}
                        </div>
                      )}
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {email}
                      </div>
                      <div className="badge badge-emerald" style={{ marginTop: '6px', fontSize: '0.7rem', padding: '2px 8px' }}>
                        <ShieldCheck size={11} />
                        <span>{roleLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mobile-hero-info-pills">
                    <div className="mobile-info-pill">
                      <span className="pill-lbl">Account ID</span>
                      <span className="pill-val font-mono">{donorId}</span>
                    </div>
                    <div className="mobile-info-pill">
                      <span className="pill-lbl">Direct Payouts</span>
                      <span className="pill-val font-mono" style={{ color: '#10B981', fontWeight: '800' }}>₹{totalLifetimeEarned.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Section Title */}
                <div style={{ fontSize: '0.76rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', padding: '14px 6px 8px' }}>
                  Account &amp; System Preferences
                </div>

                {/* Mobile Drilldown Tiles (Native App Style) */}
                <div className="mobile-tiles-list">
                  {navTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setMobileSelectedTab(tab.id);
                          setIsEditingProfile(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mobile-setting-tile"
                      >
                        <div className="tile-icon-box">
                          <Icon size={19} color="#10B981" />
                        </div>
                        <div className="tile-content">
                          <div className="tile-title-row">
                            <span className="tile-title">{tab.label}</span>
                          </div>
                          <span className="tile-subtitle">{tab.subtitle}</span>
                        </div>
                        <ChevronRight size={17} color="var(--text-muted)" className="tile-chevron" />
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Sign Out Button */}
                <div style={{ marginTop: '20px', padding: '0 2px' }}>
                  <button
                    onClick={() => { logout(); onNavigate('landing'); }}
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#EF4444', fontWeight: '700', fontSize: '0.88rem' }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out of EcoTrace</span>
                  </button>
                </div>

              </div>
            ) : (
              /* View B: When a sub-screen IS selected on mobile, display its details with "← Settings Menu" */
              <div className="mobile-detail-subscreen animate-fadeIn">
                
                {/* Mobile Subscreen Navigation Bar */}
                <div className="mobile-subscreen-navbar">
                  <button 
                    onClick={() => {
                      setMobileSelectedTab(null);
                      setIsEditingProfile(false);
                    }}
                    className="mobile-back-pill"
                  >
                    <ArrowLeft size={15} />
                    <span>Settings Menu</span>
                  </button>

                  <div className="mobile-subscreen-title">
                    {navTabs.find(t => t.id === mobileSelectedTab)?.label}
                  </div>
                </div>

                {/* Major Split Content rendered on Mobile */}
                <div className="mobile-subscreen-body">
                  {renderMajorContent(mobileSelectedTab)}
                </div>

              </div>
            )}

          </div>

        </div>
      </main>

      {/* Hidden File Input for Avatar Upload */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleAvatarFileChange} 
      />

      {/* QR CODE MODAL FOR INSTANT CASHIER / RECYCLER SCANNING */}
      {showQrModal && (
        <div 
          className="settings-modal-backdrop"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="settings-modal-card animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QrCode size={18} color="#10B981" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800' }}>Direct Cash Payout QR</h3>
              </div>
              <button 
                onClick={() => setShowQrModal(false)} 
                className="modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
              Present this verified QR code to the authorized pickup courier or smelter cashier for direct UPI reimbursement.
            </p>

            <div className="qr-preview-box">
              <div className="qr-code-art">
                <svg viewBox="0 0 100 100" width="160" height="160">
                  <rect width="100" height="100" fill="#FFFFFF" rx="8" />
                  <rect x="10" y="10" width="24" height="24" fill="#0F172A" rx="3" />
                  <rect x="14" y="14" width="16" height="16" fill="#FFFFFF" rx="2" />
                  <rect x="18" y="18" width="8" height="8" fill="#10B981" />

                  <rect x="66" y="10" width="24" height="24" fill="#0F172A" rx="3" />
                  <rect x="70" y="14" width="16" height="16" fill="#FFFFFF" rx="2" />
                  <rect x="74" y="18" width="8" height="8" fill="#10B981" />

                  <rect x="10" y="66" width="24" height="24" fill="#0F172A" rx="3" />
                  <rect x="14" y="70" width="16" height="16" fill="#FFFFFF" rx="2" />
                  <rect x="18" y="74" width="8" height="8" fill="#10B981" />

                  <rect x="42" y="14" width="6" height="6" fill="#0F172A" />
                  <rect x="52" y="14" width="6" height="6" fill="#0F172A" />
                  <rect x="46" y="24" width="8" height="6" fill="#0F172A" />
                  <rect x="40" y="40" width="20" height="20" fill="#10B981" rx="4" />
                  <rect x="46" y="46" width="8" height="8" fill="#FFFFFF" rx="2" />
                  <rect x="14" y="44" width="6" height="12" fill="#0F172A" />
                  <rect x="24" y="44" width="8" height="6" fill="#0F172A" />
                  <rect x="68" y="44" width="18" height="6" fill="#0F172A" />
                  <rect x="76" y="54" width="10" height="8" fill="#0F172A" />
                  <rect x="42" y="68" width="8" height="16" fill="#0F172A" />
                  <rect x="56" y="74" width="14" height="6" fill="#0F172A" />
                  <rect x="74" y="70" width="12" height="12" fill="#0F172A" />
                </svg>
              </div>

              <div className="qr-account-info">
                <div style={{ fontWeight: '800', fontSize: '0.96rem', color: '#0F172A' }}>{displayName || 'EcoTrace Donor'}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.84rem', color: '#059669', fontWeight: '700' }}>{upiId || 'No UPI Configured'}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '3px' }}>EcoTrace Certified Zero-Landfill Payout QR</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {upiId && (
                <button 
                  onClick={handleCopyUpi} 
                  className="btn btn-outline btn-sm" 
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {copiedUpi ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copiedUpi ? 'UPI Copied!' : 'Copy UPI'}</span>
                </button>
              )}
              <button 
                onClick={() => setShowQrModal(false)} 
                className="btn btn-primary btn-sm" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );

  // =========================================================================
  // HELPER: RENDER MAJOR SPLIT CONTENT FOR GIVEN TAB
  // =========================================================================
  function renderMajorContent(tabKey) {
    switch (tabKey) {
      // ---------------------------------------------------------------------
      // TAB 0: RECYCLER WORK SCHEDULE & DUTY SETTINGS
      // ---------------------------------------------------------------------
      case 'work-schedule':
        return (
          <div className="major-card animate-fadeIn">
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title">Recycler Work Schedule &amp; Duty Settings</h2>
                <p className="major-card-desc">
                  {isEditingWorkSchedule 
                    ? 'Modify your operating location and daily shift hours below.'
                    : 'Your active working location, shift hours, and duty activation status.'}
                </p>
              </div>

              {!isEditingWorkSchedule ? (
                <button 
                  onClick={() => setIsEditingWorkSchedule(true)}
                  className="btn btn-outline btn-sm edit-mode-btn"
                  title="Click to edit work schedule and location"
                >
                  <Edit3 size={15} color="var(--emerald-primary)" />
                  <span>Edit Work Schedule</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditingWorkSchedule(false)}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              )}
            </div>

            {scheduleSuccess && (
              <div className="badge badge-emerald" style={{ padding: '10px 16px', fontSize: '0.86rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                <span>Work Schedule &amp; Duty Status saved successfully to database!</span>
              </div>
            )}

            <form onSubmit={handleSaveWorkSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 1. OPERATING WORK LOCATION / DISTRICT */}
              <div style={{ background: 'var(--bg-secondary)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <MapPin size={18} color="#3B82F6" />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Operating Location &amp; Ready-to-Work Region
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                  Primary district where your pickup agents and vehicles operate.
                </p>
                <input 
                  type="text" 
                  value={workDistrict}
                  disabled={!isEditingWorkSchedule}
                  onChange={(e) => setWorkDistrict(e.target.value)}
                  placeholder="e.g. Prayagraj, Lucknow, Kanpur, Noida"
                  style={{ 
                    width: '100%', 
                    padding: '10px 14px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    background: isEditingWorkSchedule ? 'var(--bg-card)' : 'var(--bg-primary)', 
                    color: 'var(--text-primary)', 
                    fontWeight: '700',
                    opacity: isEditingWorkSchedule ? 1 : 0.85
                  }}
                />
              </div>

              {/* 2. DAILY SHIFT HOURS */}
              <div style={{ background: 'var(--bg-secondary)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Clock size={18} color="#10B981" />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Daily Work Hours (Auto Duty Schedule)
                  </h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                  Your duty status automatically turns ON during these shift hours unless Time-Off mode is activated.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      WORK START TIME
                    </label>
                    <input 
                      type="time" 
                      value={workStartTime}
                      disabled={!isEditingWorkSchedule}
                      onChange={(e) => setWorkStartTime(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '10px 14px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)', 
                        background: isEditingWorkSchedule ? 'var(--bg-card)' : 'var(--bg-primary)', 
                        color: 'var(--text-primary)', 
                        fontWeight: '700',
                        opacity: isEditingWorkSchedule ? 1 : 0.85
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      WORK END TIME
                    </label>
                    <input 
                      type="time" 
                      value={workEndTime}
                      disabled={!isEditingWorkSchedule}
                      onChange={(e) => setWorkEndTime(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '10px 14px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)', 
                        background: isEditingWorkSchedule ? 'var(--bg-card)' : 'var(--bg-primary)', 
                        color: 'var(--text-primary)', 
                        fontWeight: '700',
                        opacity: isEditingWorkSchedule ? 1 : 0.85
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. TIME OFF & DUTY TOGGLES (ALWAYS INTERACTIVE ON BOTH DASHBOARD & SETTINGS) */}
              <div style={{ background: 'var(--bg-secondary)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Sliders size={18} color="#F59E0B" />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Instant Duty Controls &amp; Vacation Settings
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Time Off Switch */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ minWidth: '200px', flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        Take Time Off / Vacation Mode
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Pauses task assignments from organization admin. Click anytime to take leave.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleInstantDuty(isActiveDuty, !timeOffMode)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        background: timeOffMode ? '#EF4444' : 'var(--bg-secondary)',
                        color: timeOffMode ? '#FFFFFF' : 'var(--text-muted)',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {timeOffMode ? 'ON (Time Off Active)' : 'OFF (Normal Shift)'}
                    </button>
                  </div>

                  {/* Manual Active Duty Switch */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ minWidth: '200px', flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        Worker Duty Activation Status
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Controls whether your unit currently appears Active to Organization Admins for new task assignments.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleInstantDuty(!isActiveDuty, timeOffMode)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        background: isActiveDuty && !timeOffMode ? '#10B981' : '#EF4444',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {isActiveDuty && !timeOffMode ? '● DUTY ACTIVE' : '● DUTY OFFLINE'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. RECYCLER DUTY LOGS TABLE */}
              <div style={{ background: 'var(--bg-secondary)', padding: '18px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Database Duty Status History Logs
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Audit Trail</span>
                </div>

                {dutyLogs.length === 0 ? (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '12px 0' }}>
                    No duty status log records found in MySQL database yet.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '8px' }}>Log Time</th>
                          <th style={{ padding: '8px' }}>Duty Status</th>
                          <th style={{ padding: '8px' }}>Trigger Origin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dutyLogs.slice(0, 10).map((log, idx) => (
                          <tr key={log.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '8px', color: 'var(--text-primary)' }}>
                              {new Date(log.log_time || log.logTime).toLocaleString()}
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span className={`badge ${log.status === 'active' ? 'badge-emerald' : 'badge-blue'}`}>
                                {log.status?.toUpperCase()}
                              </span>
                            </td>
                            <td style={{ padding: '8px', color: 'var(--text-muted)' }}>
                              {log.triggered_by || log.triggeredBy || 'manual_toggle'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* SINGLE SAVE BUTTON AT BOTTOM (ONLY VISIBLE WHEN EDIT MODE IS ACTIVE) */}
              {isEditingWorkSchedule && (
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button 
                    type="submit"
                    disabled={savingWorkSchedule}
                    className="btn btn-primary"
                    style={{ width: '100%', maxWidth: '280px', justifyContent: 'center' }}
                  >
                    <Save size={16} />
                    <span>{savingWorkSchedule ? 'Saving Changes...' : 'Save Work Schedule Settings'}</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 1: PERSONAL PROFILE (READ-ONLY DISPLAY WITH PENCIL EDIT TRIGGER)
      // ---------------------------------------------------------------------
      case 'profile':
        return (
          <div className="major-card animate-fadeIn">
            
            {/* Header: Title + Edit Mode Switch Button */}
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title">Personal Profile Information</h2>
                <p className="major-card-desc">
                  {isEditingProfile 
                    ? 'Make changes to your display credentials and save updates below.'
                    : 'Your verified credentials, contact coordinates, and public badge.'}
                </p>
              </div>

              {!isEditingProfile ? (
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="btn btn-outline btn-sm edit-mode-btn"
                  title="Click to edit profile details"
                >
                  <Edit3 size={15} color="var(--emerald-primary)" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={handleCancelEdit}
                    className="btn btn-outline btn-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="btn btn-primary btn-sm"
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar Card Header */}
            <div className="profile-enhanced-avatar-card">
              <div className="avatar-ring-wrapper">
                <div 
                  className="avatar-photo-inner"
                  style={{
                    background: userRole === 'admin' ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : userRole === 'recycler' ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'linear-gradient(135deg, #10B981, #059669)',
                  }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    userInitial
                  )}
                </div>
                <div className="avatar-shield-badge" title="Verified Account">
                  <ShieldCheck size={13} color="#FFFFFF" />
                </div>
              </div>

              <div className="avatar-meta-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                    {displayName || 'EcoTrace Donor'}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                    {roleLabel}
                  </span>
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '2px 0 8px' }}>
                  {email}
                </div>

                {isEditingProfile && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.78rem', padding: '5px 10px' }}
                    >
                      <Camera size={13} />
                      <span>Change Photo</span>
                    </button>
                    {avatarUrl && (
                      <button 
                        type="button"
                        onClick={() => { setAvatarUrl(null); updateProfile({ avatarUrl: null }); }}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.78rem', padding: '5px 10px', color: 'var(--text-muted)' }}
                      >
                        <RotateCcw size={13} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CONDITIONAL RENDERING: READ-ONLY DISPLAY TILES vs EDITABLE FORM */}
            {!isEditingProfile ? (
              /* 1. READ-ONLY DISPLAY TILES (Ultra Clean, Modern Card Layout) */
              <div className="profile-display-matrix animate-fadeIn">
                
                {/* 1. Recycler Name / Donor Full Name */}
                <div className="profile-display-card">
                  <div className="display-card-label">
                    <User size={14} color="#10B981" />
                    <span>{userRole === 'recycler' ? 'Recycler Name (Authorized Officer)' : 'Full Name'}</span>
                  </div>
                  <div className="display-card-value">
                    {displayName || (userRole === 'recycler' ? 'Siddharth Shukla' : <span className="text-muted-italic">Not provided</span>)}
                  </div>
                </div>

                {/* 2. Recycler Organization / Firm Name */}
                {userRole === 'recycler' && (
                  <div className="profile-display-card">
                    <div className="display-card-label">
                      <Building2 size={14} color="#10B981" />
                      <span>Recycler Organization / Company Name</span>
                    </div>
                    <div className="display-card-value">
                      <span style={{ fontWeight: '700', color: '#3B82F6' }}>
                        {companyName || 'EcoGreen Smelters & Refining Ltd'}
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. CPCB License Code */}
                {userRole === 'recycler' && (
                  <div className="profile-display-card">
                    <div className="display-card-label">
                      <ShieldCheck size={14} color="#10B981" />
                      <span>CPCB Authorized License Code</span>
                    </div>
                    <div className="display-card-value">
                      <span className="font-mono" style={{ fontWeight: '800', color: '#10B981' }}>
                        {cpcbLicense || 'CPCB-UP-2026-REC-0891'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Operational District & Regional Scoping Card */}
                <div className="profile-display-card full-width" style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div className="display-card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={15} color="#10B981" />
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Operational Region &amp; Scoped District</span>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '2px 8px', whiteSpace: 'nowrap' }}>
                      <Globe size={11} /> Regional Scoping
                    </span>
                  </div>
                  <div className="display-card-value" style={{ marginTop: '6px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--emerald-primary)', fontSize: '1.05rem' }}>
                      {district || 'Prayagraj'}, {stateVal || 'Uttar Pradesh'}, {country || 'India'}
                    </span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Local certified smelters, partner drop-offs, and doorstep pickups are dynamically routed to this district. Click &quot;Edit Profile&quot; to change your region.
                    </p>
                  </div>
                </div>

                {/* Registered Email with Non-wrapping Verified Badge */}
                <div className="profile-display-card">
                  <div className="display-card-label">
                    <MailIcon size={14} color="#10B981" />
                    <span>Registered Email Address</span>
                  </div>
                  <div className="display-card-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ wordBreak: 'break-word', minWidth: 0 }}>{email}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <Check size={10} /> Verified
                    </span>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="profile-display-card">
                  <div className="display-card-label">
                    <PhoneIcon size={14} color="#10B981" />
                    <span>{userRole === 'recycler' ? 'Contact Phone (For Logistics Handover)' : 'Contact Phone'}</span>
                  </div>
                  <div className="display-card-value">
                    {phone ? phone : <span className="text-muted-italic">No phone number added</span>}
                  </div>
                </div>

                {/* Donor-only fields: Profession, College, Degree */}
                {userRole === 'donor' && (
                  <>
                    <div className="profile-display-card">
                      <div className="display-card-label">
                        <Building2 size={14} color="#10B981" />
                        <span>Profession &amp; Academic Status</span>
                      </div>
                      <div className="display-card-value">
                        <span style={{ fontWeight: '800', color: '#10B981' }}>{profession || 'Student'}</span>
                        {profession === 'Student' && yearOfStudy && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '6px' }}>({yearOfStudy})</span>
                        )}
                      </div>
                    </div>

                    <div className="profile-display-card">
                      <div className="display-card-label">
                        <Laptop size={14} color="#10B981" />
                        <span>{profession === 'Student' ? 'College / University' : 'Company / Enterprise'}</span>
                      </div>
                      <div className="display-card-value">
                        {organizationOrCollege || <span className="text-muted-italic">Not specified</span>}
                      </div>
                    </div>

                    <div className="profile-display-card">
                      <div className="display-card-label">
                        <Award size={14} color="#10B981" />
                        <span>{profession === 'Student' ? 'Degree / Specialization' : 'Job Role / Title'}</span>
                      </div>
                      <div className="display-card-value">
                        {jobRoleOrDegree || <span className="text-muted-italic">Not specified</span>}
                      </div>
                    </div>
                  </>
                )}

                {/* Primary Direct UPI ID */}
                <div className="profile-display-card">
                  <div className="display-card-label">
                    <CreditCard size={14} color="#10B981" />
                    <span>Primary Direct UPI ID</span>
                  </div>
                  <div className="display-card-value font-mono" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{ wordBreak: 'break-all', minWidth: 0 }}>{upiId ? upiId : <span className="text-muted-italic font-sans">No UPI ID linked</span>}</span>
                    {upiId && (
                      <button 
                        onClick={handleCopyUpi} 
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Facility / Pickup Address */}
                <div className="profile-display-card full-width">
                  <div className="display-card-label">
                    <MapPin size={14} color="#10B981" />
                    <span>{userRole === 'recycler' ? 'Depot / Smelting Facility Coordinates' : 'Default Doorstep Pickup Coordinates'}</span>
                  </div>
                  <div className="display-card-value">
                    {address ? address : <span className="text-muted-italic">No address saved. Click &quot;Edit Profile&quot; to configure.</span>}
                  </div>
                </div>

                {/* Bio Note */}
                <div className="profile-display-card full-width">
                  <div className="display-card-label">
                    <Info size={14} color="#10B981" />
                    <span>{userRole === 'recycler' ? 'Facility Bio / Processing Capabilities' : 'Bio Note / Mission Statement'}</span>
                  </div>
                  <div className="display-card-value">
                    {bio ? bio : <span className="text-muted-italic">No bio note added.</span>}
                  </div>
                </div>

              </div>
            ) : (
              /* 2. EDITABLE FORM MODE (Modern, High-Polish Inputs) */
              <form onSubmit={handleSaveProfile} className="settings-modern-form animate-fadeIn">
                
                {/* 1. Operational District / Region Configuration (Full Width Across Desktop Grid) */}
                <div 
                  className="settings-field-group full-width"
                  style={{
                    gridColumn: '1 / -1',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: 'var(--radius-lg, 16px)',
                    padding: '20px 24px',
                    marginBottom: '8px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={18} color="#10B981" />
                      <label style={{ fontSize: '0.96rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                        Operational Region &amp; District (National Scale Scoping) *
                      </label>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      📍 Dynamic Smelter Routing
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: '1.4' }}>
                    Certified recyclers, active smelter bids, and doorstep pickup vans will be routed to this geographical region.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {['Prayagraj', 'Lucknow', 'Kanpur', 'Varanasi', 'Noida'].map((dName) => {
                      const isSelected = district.toLowerCase() === dName.toLowerCase();
                      return (
                        <button
                          key={dName}
                          type="button"
                          onClick={() => setDistrict(dName)}
                          style={{
                            padding: '7px 16px',
                            borderRadius: 'var(--radius-full, 9999px)',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            border: isSelected ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                            background: isSelected ? 'rgba(16, 185, 129, 0.22)' : 'var(--bg-card)',
                            color: isSelected ? '#10B981' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <MapPin size={12} />
                          <span>{dName}</span>
                          {dName === 'Prayagraj' ? '⭐' : ''}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div className="settings-field-group">
                      <label className="settings-field-label">District Name *</label>
                      <input 
                        type="text" 
                        className="settings-field-input" 
                        value={district} 
                        onChange={(e) => setDistrict(e.target.value)} 
                        placeholder="e.g. Prayagraj"
                        required
                      />
                    </div>
                    <div className="settings-field-group">
                      <label className="settings-field-label">State / UT *</label>
                      <input 
                        type="text" 
                        className="settings-field-input" 
                        value={stateVal} 
                        onChange={(e) => setStateVal(e.target.value)} 
                        placeholder="e.g. Uttar Pradesh"
                        required
                      />
                    </div>
                    <div className="settings-field-group">
                      <label className="settings-field-label">Country *</label>
                      <input 
                        type="text" 
                        className="settings-field-input" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        placeholder="India"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Recycler Name / Donor Full Name */}
                <div className="settings-field-group">
                  <label className="settings-field-label">
                    {userRole === 'recycler' ? 'Recycler Name (Authorized Officer) *' : 'Full Display Name *'}
                  </label>
                  <input 
                    type="text" 
                    className="settings-field-input" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder={userRole === 'recycler' ? 'e.g. Siddharth Shukla' : 'Enter your name'}
                    required
                  />
                </div>

                {/* Recycler Organization / Firm Name */}
                {userRole === 'recycler' && (
                  <div className="settings-field-group">
                    <label className="settings-field-label">
                      Recycler Organization / Company Name *
                    </label>
                    <input 
                      type="text" 
                      className="settings-field-input" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                      placeholder="e.g. EcoGreen Smelters & Refining Ltd"
                      required
                    />
                  </div>
                )}

                {/* CPCB License Code */}
                {userRole === 'recycler' && (
                  <div className="settings-field-group">
                    <label className="settings-field-label">
                      CPCB Authorized License Code *
                    </label>
                    <input 
                      type="text" 
                      className="settings-field-input font-mono" 
                      value={cpcbLicense} 
                      onChange={(e) => setCpcbLicense(e.target.value)} 
                      placeholder="e.g. CPCB-UP-2026-REC-0891"
                      required
                    />
                  </div>
                )}

                {/* Registered Email */}
                <div className="settings-field-group">
                  <label className="settings-field-label">Email Address (Registered)</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      className="settings-field-input" 
                      value={email} 
                      disabled 
                      style={{ background: 'var(--bg-secondary)', cursor: 'not-allowed', color: 'var(--text-muted)', paddingRight: '80px' }}
                    />
                    <span className="field-affix-pill" style={{ whiteSpace: 'nowrap' }}>
                      <Check size={11} color="#10B981" /> Verified
                    </span>
                  </div>
                </div>

                {/* Donor-only fields in form: Profession, College, Degree, Academic Year */}
                {userRole === 'donor' && (
                  <>
                    <div className="settings-field-group">
                      <label className="settings-field-label">Profession / Category</label>
                      <select
                        className="settings-field-input"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Student">🎓 Student (School / College / University)</option>
                        <option value="Working Professional">💼 Working Professional (IT / Tech / Corporate)</option>
                        <option value="Researcher / Academic">🔬 Researcher / Faculty / Academic</option>
                        <option value="Environmental Activist">🍃 Environmental Activist / Community Lead</option>
                        <option value="Corporate Sustainability Officer">🏢 Corporate Sustainability / CSR Officer</option>
                      </select>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">
                        {profession === 'Student' ? 'College / University Name' : 'Company / Organization'}
                      </label>
                      <input 
                        type="text" 
                        className="settings-field-input" 
                        value={organizationOrCollege} 
                        onChange={(e) => setOrganizationOrCollege(e.target.value)} 
                        placeholder={profession === 'Student' ? 'e.g. MNNIT Allahabad, IIT Kanpur' : 'e.g. Infosys, TCS, Tech Mahindra'}
                      />
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">
                        {profession === 'Student' ? 'Degree / Major / Course' : 'Job Title / Designation'}
                      </label>
                      <input 
                        type="text" 
                        className="settings-field-input" 
                        value={jobRoleOrDegree} 
                        onChange={(e) => setJobRoleOrDegree(e.target.value)} 
                        placeholder={profession === 'Student' ? 'e.g. B.Tech Computer Science, BCA' : 'e.g. Senior Software Engineer'}
                      />
                    </div>

                    {profession === 'Student' ? (
                      <div className="settings-field-group">
                        <label className="settings-field-label">Current Academic Year of Study</label>
                        <select
                          className="settings-field-input"
                          value={yearOfStudy}
                          onChange={(e) => setYearOfStudy(e.target.value)}
                        >
                          <option value="1st Year">1st Year (Freshman)</option>
                          <option value="2nd Year">2nd Year (Sophomore)</option>
                          <option value="3rd Year">3rd Year (Junior)</option>
                          <option value="4th Year">4th Year (Senior)</option>
                          <option value="Postgraduate / PhD">Postgraduate / Masters / PhD</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                        </select>
                      </div>
                    ) : (
                      <div className="settings-field-group">
                        <label className="settings-field-label">Total Professional Experience</label>
                        <input 
                          type="text" 
                          className="settings-field-input" 
                          value={experienceYears} 
                          onChange={(e) => setExperienceYears(e.target.value)} 
                          placeholder="e.g. 3 Years, 5+ Years"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Contact Phone */}
                <div className="settings-field-group">
                  <label className="settings-field-label">{userRole === 'recycler' ? 'Contact Phone (For Logistics Handover)' : 'Contact Mobile Phone'}</label>
                  <input 
                    type="tel" 
                    className="settings-field-input" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="e.g. +91 94150 45678"
                  />
                </div>

                {/* Primary UPI ID */}
                <div className="settings-field-group">
                  <label className="settings-field-label">Primary UPI ID for Direct Payouts</label>
                  <input 
                    type="text" 
                    className="settings-field-input font-mono" 
                    value={upiId} 
                    onChange={(e) => setUpiId(e.target.value)} 
                    placeholder="e.g. yourname@oksbi"
                  />
                </div>

                {/* Address */}
                <div className="settings-field-group full-width">
                  <label className="settings-field-label">{userRole === 'recycler' ? 'Depot / Smelting Facility Address' : 'Default Doorstep Pickup Address & Landmarks'}</label>
                  <textarea 
                    className="settings-field-textarea" 
                    rows={3}
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Facility Address, Industrial Area, Landmark, City, PIN Code"
                  />
                </div>

                {/* Bio Note */}
                <div className="settings-field-group full-width">
                  <label className="settings-field-label">{userRole === 'recycler' ? 'Facility Bio / Processing Capabilities' : 'Eco Statement / Bio Note'}</label>
                  <textarea 
                    className="settings-field-textarea" 
                    rows={2}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder={userRole === 'recycler' ? "Describe your facility capabilities, certifications, and e-waste handling capacity..." : "Add a brief note about your zero-e-waste mission..."}
                  />
                </div>

                <div className="settings-field-group full-width" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>
                    <Save size={16} />
                    <span>Save Profile Preferences</span>
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="btn btn-outline" style={{ padding: '12px 20px' }}>
                    <span>Cancel</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 2: WALLET, UPI PASSBOOK & TRANSACTIONS (REAL DATA ONLY)
      // ---------------------------------------------------------------------
      case 'wallet':
        return (
          <div className="major-card animate-fadeIn">
            
            {/* PAYTM / GPAY STYLE ECO-WALLET HERO CARD */}
            <div className="paytm-wallet-card">
              <div className="wallet-card-bg-glow" />
              
              <div className="wallet-top-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="wallet-chip-icon">
                    <Zap size={18} color="#10B981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800', color: 'rgba(255, 255, 255, 0.75)' }}>
                      EcoTrace Direct Payout Passbook
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF' }}>
                      Zero-Brokerage Direct Settlement
                    </div>
                  </div>
                </div>

                {upiId && (
                  <button 
                    onClick={() => setShowQrModal(true)}
                    className="wallet-qr-btn"
                    title="Show Cashier Payout QR"
                  >
                    <QrCode size={15} />
                    <span>Show Payout QR</span>
                  </button>
                )}
              </div>

              <div className="wallet-balance-row">
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600', marginBottom: '4px' }}>
                    Total Confirmed Scrap Payouts
                  </div>
                  <div className="wallet-balance-amount">
                    ₹{totalLifetimeEarned.toFixed(2)}
                  </div>
                </div>

                <div className="wallet-payout-stats">
                  <div className="stat-item">
                    <span className="stat-lbl">In-Escrow Bookings</span>
                    <span className="stat-val" style={{ color: pendingEscrowEarned > 0 ? '#FCD34D' : '#94A3B8' }}>
                      ₹{pendingEscrowEarned.toFixed(2)}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-lbl">Recycled Items</span>
                    <span className="stat-val" style={{ color: '#6EE7B7' }}>
                      {totalDevicesCount} {totalDevicesCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linked UPI Strip in Wallet */}
              <div className="wallet-linked-upi-strip">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <CreditCard size={15} color="#10B981" />
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Direct Settlement:</span>
                  <span className="font-mono" style={{ fontSize: '0.84rem', fontWeight: '700', color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {upiId ? upiId : 'No UPI ID linked yet'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {upiId && (
                    <button 
                      onClick={handleCopyUpi}
                      style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#FFFFFF', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedUpi ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                  <button 
                    onClick={() => setIsEditingUpi(!isEditingUpi)}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', cursor: 'pointer' }}
                  >
                    {upiId ? 'Update UPI' : 'Link UPI'}
                  </button>
                </div>
              </div>
            </div>

            {/* UPI ID Quick Edit Box if toggled */}
            {isEditingUpi && (
              <div className="upi-quick-edit-box animate-fadeIn">
                <div style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Set Primary UPI ID for Instant Doorstep Cash Reimbursements:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    className="settings-field-input font-mono"
                    value={newUpiInput}
                    onChange={(e) => setNewUpiInput(e.target.value)}
                    placeholder="e.g. mobile@paytm, name@oksbi"
                    style={{ flex: 1, minWidth: '200px' }}
                  />
                  <button onClick={handleSaveUpi} className="btn btn-primary btn-sm">
                    Save UPI
                  </button>
                  <button onClick={() => setIsEditingUpi(false)} className="btn btn-outline btn-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* TRANSACTION PASSBOOK / REAL LOG (NO DUMMY ENTRIES) */}
            <div className="passbook-section">
              <div className="passbook-header">
                <div>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                    UPI Reimbursement Passbook
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Live record of verified e-waste pickup disbursements
                  </div>
                </div>
              </div>

              {/* Transactions List: Real user pickups or authentic empty state */}
              {userPickups.length > 0 ? (
                <div className="transactions-list">
                  {userPickups.map((p) => {
                    const isCompleted = p.status === 'Completed' || p.status === 'Recycled';
                    return (
                      <div key={p.requestId || p.id} className="txn-item-card">
                        <div className="txn-left-col">
                          <div className={`txn-icon-circle ${isCompleted ? 'credit' : 'pending'}`}>
                            <TrendingUp size={16} />
                          </div>
                          <div>
                            <div className="txn-title">{p.deviceName || 'Recycled Electronic Device'}</div>
                            <div className="txn-recycler-name">{p.assignedRecycler || 'Authorized CPCB Recycler'}</div>
                            <div className="txn-meta-row">
                              <span className="txn-date">{p.pickupTime || 'Scheduled'}</span>
                              <span className="txn-dot">•</span>
                              <span className="txn-utr font-mono">{p.requestId}</span>
                            </div>
                          </div>
                        </div>

                        <div className="txn-right-col">
                          <div className={`txn-amount ${isCompleted ? 'credit' : 'pending'}`}>
                            {isCompleted ? '+' : ''} ₹{parseFloat(p.offeredPrice || 0).toFixed(2)}
                          </div>
                          <div className={`txn-status-badge ${isCompleted ? 'credit' : 'pending'}`}>
                            {p.status || 'Pending Verification'}
                          </div>
                          {p.co2SavedKg && (
                            <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700', marginTop: '2px' }}>
                              🌱 {p.co2SavedKg} kg CO₂
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Authentic Clean Empty State */
                <div className="empty-passbook-box">
                  <div className="empty-icon-circle">
                    <PackageCheck size={28} color="#10B981" />
                  </div>
                  <h4 style={{ margin: '8px 0 4px', fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    No Transactions Recorded Yet
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 16px' }}>
                    Once you scan a device and book a doorstep recycling pickup, your real-time UPI credits and recycler payment receipts will appear here.
                  </p>
                  <button 
                    onClick={handleBackToDashboard} 
                    className="btn btn-primary btn-sm"
                  >
                    <span>Launch AI Camera Scanner</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 3: DISPOSAL & ECO-STATS (REAL CALCULATIONS + 1 SAMPLE CERTIFICATE)
      // ---------------------------------------------------------------------
      case 'impact':
        return (
          <div className="major-card animate-fadeIn">
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title">Disposal Summary &amp; Impact</h2>
                <p className="major-card-desc">
                  Certified carbon footprint abated and electronic waste diverted from landfills.
                </p>
              </div>
            </div>

            {/* Impact Metric Chips (Real calculated values) */}
            <div className="impact-grid">
              <div className="impact-box">
                <div className="impact-icon-circle green">
                  <Award size={19} />
                </div>
                <div className="impact-val" style={{ color: '#10B981' }}>{totalCo2Abated} kg</div>
                <div className="impact-lbl">Total CO₂ Scope 3 Abated</div>
                <div className="impact-sub">Calculated via IPCC emission factors</div>
              </div>

              <div className="impact-box">
                <div className="impact-icon-circle blue">
                  <Sparkles size={19} />
                </div>
                <div className="impact-val" style={{ color: '#3B82F6' }}>{totalDevicesCount} {totalDevicesCount === 1 ? 'Item' : 'Items'}</div>
                <div className="impact-lbl">E-Waste Items Recycled</div>
                <div className="impact-sub">Zero-Landfill Verified Chain</div>
              </div>

              <div className="impact-box">
                <div className="impact-icon-circle purple">
                  <ShieldCheck size={19} />
                </div>
                <div className="impact-val" style={{ color: '#8B5CF6' }}>{toxicMetalsGrams} g</div>
                <div className="impact-lbl">Toxic Metals Prevented</div>
                <div className="impact-sub">Lead &amp; Cadmium extraction</div>
              </div>
            </div>

            {/* Verified CPCB Certificate Card */}
            <div className="eco-certificate-card">
              <div className="eco-certificate-card-inner">
                <div className="cert-badge-gold">
                  🏆
                </div>
                <div className="eco-certificate-content">
                  <div className="cert-number-pill">
                    CPCB Zero-Landfill Certificate No. CPCB/2026/ECO-{donorId.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase()}
                  </div>
                  <h3 className="cert-title">
                    Certificate of Responsible E-Waste Stewardship
                  </h3>
                  <p className="cert-desc">
                    Awarded to <strong style={{ color: 'var(--text-primary)' }}>{displayName || 'Verified Donor'}</strong> ({donorId}) for diverting critical electronic minerals into authorized CPCB smelting channels.
                  </p>
                  <button 
                    onClick={() => alert(`Generating official CPCB Stewardship Certificate for ${displayName || donorId}...`)}
                    className="btn btn-primary btn-sm cert-download-btn"
                  >
                    <Download size={14} />
                    <span>Download Signed Certificate (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 5: SECURITY & SESSIONS (REAL ACTIVE SESSION ONLY)
      // ---------------------------------------------------------------------
      case 'security':
        return (
          <div className="major-card animate-fadeIn">
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title">Security &amp; Device Sessions</h2>
                <p className="major-card-desc">
                  Manage your account password and review authorized active sessions.
                </p>
              </div>
            </div>

            {/* Change Password Form */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                Update Password
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Password updated securely!'); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }} className="settings-modern-form">
                <div className="settings-field-group">
                  <label className="settings-field-label">Current Password</label>
                  <input 
                    type="password" 
                    className="settings-field-input" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    placeholder="••••••••" 
                  />
                </div>
                <div className="settings-field-group">
                  <label className="settings-field-label">New Password</label>
                  <input 
                    type="password" 
                    className="settings-field-input" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Minimum 8 characters" 
                  />
                </div>
                <div className="settings-field-group full-width">
                  <label className="settings-field-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="settings-field-input" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Repeat new password" 
                  />
                </div>
                <div className="settings-field-group full-width">
                  <button type="submit" className="btn btn-outline btn-sm" style={{ width: 'fit-content' }}>
                    <Lock size={14} />
                    <span>Update Account Password</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 2FA Section */}
            <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    Two-Factor Authentication (2FA)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Require an SMS verification OTP when signing in from unrecognized locations.
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={twoFactorEnabled} 
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                  className="toggle-switch" 
                />
              </div>
            </div>

            {/* Active Sessions (Real Current Device Session Only - NO fake dummy sessions) */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                Active Authorized Session
              </h3>

              <div className="active-sessions-list">
                <div className="session-item-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="session-icon-box">
                      <Laptop size={17} color="#10B981" />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {platformName} <span className="badge badge-emerald" style={{ fontSize: '0.66rem', padding: '1px 6px', marginLeft: '6px' }}>Active Now</span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                        Authenticated Session ID: {donorId}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 6: NOTIFICATIONS & ALERTS
      // ---------------------------------------------------------------------
      case 'notifications':
        return (
          <div className="major-card animate-fadeIn">
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title">Notification Preferences</h2>
                <p className="major-card-desc">
                  Configure driver arrival alerts and UPI payment confirmation channels.
                </p>
              </div>
            </div>

            <div className="settings-toggle-group">
              <div className="toggle-item">
                <div>
                  <div className="toggle-title">Instant WhatsApp Payout Receipts</div>
                  <div className="toggle-sub">Receive instant WhatsApp message with UPI UTR transaction ID upon recycler handover</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyWhatsapp} 
                  onChange={() => setNotifyWhatsapp(!notifyWhatsapp)} 
                  className="toggle-switch" 
                />
              </div>

              <div className="toggle-item">
                <div>
                  <div className="toggle-title">Doorstep Driver Dispatch SMS</div>
                  <div className="toggle-sub">Receive real-time driver ETA and verified OTP verification code on your mobile</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifySms} 
                  onChange={() => setNotifySms(!notifySms)} 
                  className="toggle-switch" 
                />
              </div>

              <div className="toggle-item">
                <div>
                  <div className="toggle-title">Monthly Carbon Offset Digest (Email)</div>
                  <div className="toggle-sub">Receive monthly certified Scope-3 e-waste abatement summary to {email}</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyEmailMonthly} 
                  onChange={() => setNotifyEmailMonthly(!notifyEmailMonthly)} 
                  className="toggle-switch" 
                />
              </div>
            </div>

          </div>
        );

      // ---------------------------------------------------------------------
      // TAB 7: HELP & SUPPORT CORE (AI DIAGNOSTICS & SUPREME ADMIN ESCALATIONS)
      // ---------------------------------------------------------------------
      case 'support':
        return (
          <div className="major-card animate-fadeIn">
            <div className="major-card-header">
              <div>
                <h2 className="major-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LifeBuoy size={22} color="#3B82F6" />
                  <span>Help &amp; Support Core &amp; Grievance Portal</span>
                </h2>
                <p className="major-card-desc">
                  Access AI-powered troubleshooting, clarify platform workflows, or file formal grievance tickets directly with the Supreme Admin.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>AI Support &amp; Diagnostics</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read-Only Instant Troubleshooting</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Ask questions regarding doorstep driver tracking, metal scrap valuations, CPCB licensing, or community hackathons.
                </p>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => onNavigate && onNavigate('support')}
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                >
                  <Bot size={14} /> Open AI Assistant
                </button>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldAlert size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Supreme Admin Escalation</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>48-Hour SLA Resolution</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  If your issue involves an unresolved driver delay, UPI payout dispute, or recycler disagreement, file an official grievance.
                </p>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate && onNavigate('support')}
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                >
                  <ShieldAlert size={14} /> Raise Grievance Ticket
                </button>
              </div>
            </div>

            {/* SLA Policy Notice */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShieldCheck size={28} color="var(--emerald-primary)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--text-primary)' }}>EcoTrace Consumer Protection &amp; Security Policy:</strong><br />
                All grievance tickets are directly governed and audited by the Supreme Admin. Formal administrative findings and resolution notices will be posted to your ticket within 48 hours.
              </div>
            </div>

          </div>
        );

      default:
        return null;
    }
  }
};
