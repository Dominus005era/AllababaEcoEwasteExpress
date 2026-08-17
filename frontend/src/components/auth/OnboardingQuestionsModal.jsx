import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  User, 
  CreditCard, 
  Phone as PhoneIcon, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  Laptop,
  Award,
  Globe,
  Info
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const OnboardingQuestionsModal = ({ isOpen, onComplete }) => {
  const { currentUser, userRole, updateProfile } = useAuth();

  // Region / Location States (Default: Prayagraj, Uttar Pradesh, India)
  const [district, setDistrict] = useState(currentUser?.district || 'Prayagraj');
  const [customDistrict, setCustomDistrict] = useState('');
  const [isCustomDistrict, setIsCustomDistrict] = useState(false);
  const [state, setState] = useState(currentUser?.state || 'Uttar Pradesh');
  const [country, setCountry] = useState(currentUser?.country || 'India');

  // Academic / Professional Profile States
  const [displayName, setDisplayName] = useState(currentUser?.displayName || currentUser?.companyName || '');
  const [profession, setProfession] = useState(currentUser?.profession || 'Student');
  const [organizationOrCollege, setOrganizationOrCollege] = useState(currentUser?.organizationOrCollege || 'Motilal Nehru National Institute of Technology (MNNIT)');
  const [jobRoleOrDegree, setJobRoleOrDegree] = useState(currentUser?.jobRoleOrDegree || 'B.Tech Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || '3rd Year');
  const [experienceYears, setExperienceYears] = useState(currentUser?.experienceYears || '0 Years');

  // Contact & Payout Coordinates
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [upiId, setUpiId] = useState(currentUser?.upiId || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const popularDistricts = [
    { name: 'Prayagraj', label: 'Prayagraj (Active Smelter Hub)', active: true },
    { name: 'Lucknow', label: 'Lucknow (Central UP Hub)', active: true },
    { name: 'Kanpur', label: 'Kanpur (Industrial Belt)', active: true },
    { name: 'Varanasi', label: 'Varanasi (Eastern UP Hub)', active: true },
    { name: 'Noida', label: 'Noida / NCR (Tech Corridor)', active: true },
    { name: 'Other', label: 'Other District...', active: false }
  ];

  const handleDistrictSelect = (dName) => {
    if (dName === 'Other') {
      setIsCustomDistrict(true);
      setDistrict(customDistrict || '');
    } else {
      setIsCustomDistrict(false);
      setDistrict(dName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalDistrict = isCustomDistrict ? customDistrict.trim() : district.trim();
    if (!finalDistrict) {
      setError('Please select or specify your operational District.');
      return;
    }
    if (!displayName.trim()) {
      setError('Please enter your Full Display Name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a Contact Mobile Number for pickup coordination.');
      return;
    }

    setLoading(true);
    try {
      const profileData = {
        displayName: displayName.trim(),
        district: finalDistrict,
        state: state.trim() || 'Uttar Pradesh',
        country: country.trim() || 'India',
        profession,
        organizationOrCollege: organizationOrCollege.trim(),
        jobRoleOrDegree: jobRoleOrDegree.trim(),
        yearOfStudy: profession === 'Student' ? yearOfStudy : undefined,
        experienceYears: profession !== 'Student' ? experienceYears : undefined,
        phone: phone.trim(),
        upiId: upiId.trim(),
        address: address.trim(),
        bio: bio.trim(),
        profileCompleted: true
      };

      await updateProfile(profileData);
      setLoading(false);
      onComplete(userRole || 'donor');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to save profile. Please try again.');
    }
  };

  const handleEscape = async () => {
    // Escape with dummy profile data for rapid testing
    const fallbackProfile = {
      displayName: displayName.trim() || 'Aarav Sharma',
      district: district || 'Prayagraj',
      state: state || 'Uttar Pradesh',
      country: country || 'India',
      profession: profession || 'Student',
      organizationOrCollege: organizationOrCollege || 'MNNIT Allahabad',
      phone: phone.trim() || '+91 98765 43210',
      upiId: upiId.trim() || 'aarav.sharma@okhdfcbank',
      address: address.trim() || 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004',
      profileCompleted: true
    };
    try {
      await updateProfile(fallbackProfile);
    } catch (e) {}
    onComplete(userRole || 'donor');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.88)',
      backdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl, 24px)',
        width: '100%',
        maxWidth: '820px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column'
      }} className="animate-fadeIn">

        {/* Modal Header */}
        <div style={{
          padding: '28px 32px 20px',
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Sparkles size={14} />
              <span>Step 1 of 1: First-Time Profile &amp; Regional Setup</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '4px 0 6px', color: 'var(--text-primary)' }}>
            Welcome to EcoTrace! Let&apos;s Set Up Your Profile
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
            To connect you with certified local smelters, door-to-door logistics, and instant UPI payouts, please complete these essential profile questions.
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 1: REGIONAL LOCATION (CRITICAL FOR SMELTER SCOPING) */}
          {/* ======================================================== */}
          <div style={{
            background: 'var(--bg-surface-elevated, rgba(255, 255, 255, 0.03))',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                1
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  Operational Region &amp; District
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Scopes active recycling organizations, CPCB smelters, and doorstep pickups to your area
                </span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Select Your Operational District *
                </label>
                
                {/* District Chip Selection */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {popularDistricts.map((d) => {
                    const isSelected = (!isCustomDistrict && district === d.name) || (isCustomDistrict && d.name === 'Other');
                    return (
                      <button
                        key={d.name}
                        type="button"
                        onClick={() => handleDistrictSelect(d.name)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 'var(--radius-full, 9999px)',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          border: isSelected ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
                          color: isSelected ? '#10B981' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <MapPin size={13} />
                        <span>{d.name}</span>
                      </button>
                    );
                  })}
                </div>

                {isCustomDistrict && (
                  <input
                    type="text"
                    className="settings-field-input"
                    placeholder="Enter your District name (e.g. Gorakhpur, Agra, Meerut)"
                    value={customDistrict}
                    onChange={(e) => setCustomDistrict(e.target.value)}
                    required
                    style={{ marginTop: '6px' }}
                  />
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    State / Union Territory *
                  </label>
                  <input
                    type="text"
                    className="settings-field-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Uttar Pradesh"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Country *
                  </label>
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

              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <Info size={15} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>National Scale Note:</strong> Organizations and verified recyclers will be filtered to <strong>{isCustomDistrict ? customDistrict || 'your district' : district}</strong>. You can update this region anytime in Profile Settings.
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: PROFESSION & ACADEMIC / WORK QUESTIONS */}
          {/* ======================================================== */}
          <div style={{
            background: 'var(--bg-surface-elevated, rgba(255, 255, 255, 0.03))',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                2
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  Profession &amp; Academic Background
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Helps recognize student campus leaders and corporate ESG contributors
                </span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Full Display Name *
                </label>
                <input
                  type="text"
                  className="settings-field-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Profession / Category *
                  </label>
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {profession === 'Student' ? 'College / University Name' : 'Company / Organization Name'}
                  </label>
                  <input
                    type="text"
                    className="settings-field-input"
                    value={organizationOrCollege}
                    onChange={(e) => setOrganizationOrCollege(e.target.value)}
                    placeholder={profession === 'Student' ? 'e.g. MNNIT Allahabad, IIIT Allahabad' : 'e.g. TCS, Infosys, Tech Mahindra'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {profession === 'Student' ? 'Degree / Major / Branch' : 'Job Title / Designation'}
                  </label>
                  <input
                    type="text"
                    className="settings-field-input"
                    value={jobRoleOrDegree}
                    onChange={(e) => setJobRoleOrDegree(e.target.value)}
                    placeholder={profession === 'Student' ? 'e.g. B.Tech CSE, BCA' : 'e.g. Senior Software Engineer'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {profession === 'Student' ? 'Current Year of Study' : 'Total Professional Experience'}
                  </label>
                  {profession === 'Student' ? (
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
                  ) : (
                    <input
                      type="text"
                      className="settings-field-input"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      placeholder="e.g. 2 Years, 5+ Years"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 3: CONTACT, PAYOUTS & COORDINATES */}
          {/* ======================================================== */}
          <div style={{
            background: 'var(--bg-surface-elevated, rgba(255, 255, 255, 0.03))',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                3
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  Contact, Direct UPI Payout &amp; Coordinates
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Used for verified doorstep handovers and instant scrap token credit
                </span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className="settings-field-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Direct UPI ID (For Instant Scrap Cash)
                  </label>
                  <input
                    type="text"
                    className="settings-field-input font-mono"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. username@okhdfc, rahul@paytm"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Default Doorstep Street Address / Landmark
                </label>
                <input
                  type="text"
                  className="settings-field-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 402, Ganga Heights, Civil Lines, Prayagraj"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Bio / Climate Mission Note
                </label>
                <textarea
                  className="settings-field-input"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Dedicated to circular electronics, preventing landfill dumping, and recovering precious urban metals."
                />
              </div>
            </div>
          </div>

          {/* Modal Action Buttons with Escape / Skip button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleEscape}
              className="btn btn-outline"
              id="escape-onboarding-btn"
              style={{
                padding: '12px 22px',
                fontSize: '0.88rem',
                fontWeight: '700',
                borderRadius: 'var(--radius-full, 9999px)',
                borderColor: 'rgba(245, 158, 11, 0.5)',
                color: '#F59E0B',
                background: 'rgba(245, 158, 11, 0.08)',
                cursor: 'pointer'
              }}
            >
              <span>⚡ Skip / Escape Setup (Prototype Mode) →</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              id="submit-onboarding-profile-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '800',
                borderRadius: 'var(--radius-full, 9999px)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              <span>{loading ? 'Saving Profile & Regional Scopes...' : 'Complete Profile & Enter Dashboard'}</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
