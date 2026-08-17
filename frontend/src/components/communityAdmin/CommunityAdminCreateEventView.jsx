import React, { useState } from 'react';
import { 
  PlusCircle, 
  UploadCloud, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  Users, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Flame,
  Tag
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

const IMAGE_PRESETS = [
  {
    name: 'AI & Neural Vision',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Hardware & IoT Disassembly',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Campus ESG Collection',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Circular Smelting Labs',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
  }
];

export const CommunityAdminCreateEventView = ({
  commAdminUser = null,
  onEventCreated = () => {}
}) => {
  const [imageMode, setImageMode] = useState('upload'); // 'upload', 'url', 'presets'
  const [bannerPreview, setBannerPreview] = useState('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [fileName, setFileName] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI & Hardware Hackathon');
  const [eventType, setEventType] = useState('Hackathon');
  const [mode, setMode] = useState('Hybrid');
  const [venueLocation, setVenueLocation] = useState('IIT Kanpur & Online Hub');
  const [hostName, setHostName] = useState(commAdminUser?.displayName?.split('(')[0]?.trim() || 'Dr. Priya Verma');
  const [hostRole, setHostRole] = useState('Community Lead Organizer');
  const [organizationName, setOrganizationName] = useState(commAdminUser?.institutionName || 'EcoTrace Academic Alliance');
  const [startDate, setStartDate] = useState('Sept 20, 2026');
  const [endDate, setEndDate] = useState('Sept 24, 2026');
  const [registrationDeadline, setRegistrationDeadline] = useState('Sept 19, 2026');
  const [prizePool, setPrizePool] = useState('₹2,50,000 + Incubation Grant');
  const [maxParticipants, setMaxParticipants] = useState(400);
  const [isOpenRegistration, setIsOpenRegistration] = useState(true);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Edge AI, Hardware Hackathon, Urban Mining, Scope-3');

  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // File Upload Handler with base64 conversion
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image file size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    setFileName(file.name);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (typeof base64 === 'string') {
        setBannerPreview(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = (e) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setBannerPreview(customImageUrl.trim());
    }
  };

  const handlePresetSelect = (presetUrl) => {
    setBannerPreview(presetUrl);
  };

  // Submit New Event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !venueLocation.trim() || !startDate.trim() || !endDate.trim()) {
      setErrorMsg('Please fill in all mandatory fields (Title, Venue, Start Date, End Date).');
      return;
    }

    setCreating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const tagsArray = tagsInput.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        title: title.trim(),
        category,
        eventType,
        mode,
        bannerImage: bannerPreview,
        venueLocation: venueLocation.trim(),
        hostName: hostName.trim(),
        hostRole: hostRole.trim(),
        organizationName: organizationName.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        registrationDeadline: registrationDeadline.trim(),
        prizePool: prizePool.trim(),
        maxParticipants: Number(maxParticipants) || 500,
        isOpenRegistration,
        description: description.trim(),
        tags: tagsArray,
        organizerName: hostName || commAdminUser?.displayName || 'EcoTrace Host',
        organizerId: commAdminUser?.id || 'COMM-ADM-01'
      };

      const res = await communityAdminApi.createEvent(payload);
      if (res.success) {
        setSuccessMsg(`✓ Event "${title}" successfully published live! Event ID: ${res.eventId}`);
        setTitle('');
        setDescription('');
        onEventCreated();
      } else {
        setErrorMsg(res.error || 'Failed to create event.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Database error during event creation.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: '#0284C7',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              LIVE CREATOR STUDIO
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Sub-Admin Authorized Scope
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>
            Host New Community Event / Hackathon
          </h2>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '700' }}>
          ✨ Auto-Publishes to MySQL &amp; Public Hub
        </span>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          color: '#166534',
          padding: '14px 18px',
          borderRadius: '12px',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={20} color="#16A34A" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          color: '#991B1B',
          padding: '14px 18px',
          borderRadius: '12px',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={20} color="#DC2626" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Two Column Layout: Form Studio on Left, Public Card Live Preview on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
        gap: '24px',
        alignItems: 'start'
      }} className="comm-admin-create-grid">
        
        {/* COLUMN A: CREATOR FORM */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. COVER IMAGE STUDIO (Upload, URL, or Presets) */}
          <div style={{
            background: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-color, #E2E8F0)',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Event Cover Image Studio *
                </label>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Upload custom artwork, paste an image link, or pick from GreenTech presets
                </div>
              </div>

              {/* Mode Switcher */}
              <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', border: '1px solid #E2E8F0' }}>
                {[
                  { id: 'upload', label: 'Upload File', icon: UploadCloud },
                  { id: 'url', label: 'Image URL', icon: LinkIcon },
                  { id: 'presets', label: 'Presets', icon: Sparkles }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = imageMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setImageMode(tab.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: isActive ? '#10B981' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#475569',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: 'none'
                      }}
                    >
                      <Icon size={12} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode A: File Upload */}
            {imageMode === 'upload' && (
              <div>
                <label 
                  htmlFor="event-cover-upload"
                  style={{
                    border: '2px dashed rgba(16, 185, 129, 0.4)',
                    borderRadius: '14px',
                    padding: '24px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(16, 185, 129, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10B981'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; }}
                >
                  <UploadCloud size={36} color="#10B981" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>
                    {fileName ? `Selected: ${fileName}` : 'Click to Upload Cover Image File'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                    Supports PNG, JPG, WebP, GIF (Max 10MB) • Instant local preview
                  </div>
                  <input
                    id="event-cover-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            {/* Mode B: Direct Image URL */}
            {imageMode === 'url' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="url"
                  placeholder="Paste direct HTTPS image link (e.g. https://images.unsplash.com/...)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#0F172A',
                    fontSize: '0.84rem'
                  }}
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '8px 16px' }}
                >
                  Apply URL
                </button>
              </div>
            )}

            {/* Mode C: Presets */}
            {imageMode === 'presets' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {IMAGE_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePresetSelect(preset.url)}
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: bannerPreview === preset.url ? '2px solid #10B981' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      position: 'relative',
                      height: '75px'
                    }}
                  >
                    <img src={preset.url} alt={preset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      color: '#FFFFFF'
                    }}>
                      {preset.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. CORE EVENT METADATA */}
          <div style={{
            background: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-color, #E2E8F0)',
            borderRadius: '18px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Event Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Uttar Pradesh Campus E-Waste AI Hackathon 2026"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '11px 14px', color: '#0F172A', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>

            <div className="comm-form-row-3col">
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                >
                  <option value="AI & Hardware Hackathon">💻 AI &amp; Hardware</option>
                  <option value="Campus & Corporate Drive">🏫 Campus Collection</option>
                  <option value="GreenTech & Circular Innovation">🔬 GreenTech Challenge</option>
                  <option value="Community Workshop">🛠️ Workshop</option>
                  <option value="Innovation Seminar">🎤 Seminar</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Event Type *</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                >
                  <option value="Hackathon">Hackathon</option>
                  <option value="Collection Drive">Collection Drive</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                  <option value="Symposium">Symposium</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Delivery Mode *</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                >
                  <option value="Hybrid">Hybrid (On-Campus &amp; Online)</option>
                  <option value="In-Person">In-Person Only</option>
                  <option value="Online">Virtual / Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Venue Location &amp; Campus Hub *
              </label>
              <input
                type="text"
                value={venueLocation}
                onChange={(e) => setVenueLocation(e.target.value)}
                placeholder="e.g. IIT Kanpur & MNNIT Allahabad Hubs"
                required
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Host & Supporting Org */}
            <div className="comm-form-row-3col">
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Host Person *</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="e.g. Dr. Priya Verma"
                  required
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Host Role</label>
                <input
                  type="text"
                  value={hostRole}
                  onChange={(e) => setHostRole(e.target.value)}
                  placeholder="e.g. Academic Lead"
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Supporting Org *</label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="e.g. MNNIT Allahabad"
                  required
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Dates & Capacity */}
            <div className="comm-form-row-3col">
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Start Date *</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. Sept 20, 2026"
                  required
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>End Date *</label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="e.g. Sept 24, 2026"
                  required
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Reg. Deadline</label>
                <input
                  type="text"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  placeholder="e.g. Sept 19, 2026"
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Prize Pool & Max Participants */}
            <div className="comm-form-row-2col">
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Prize Pool / Grants</label>
                <input
                  type="text"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="e.g. ₹2,50,000 + Incubation Grant"
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Max Capacity</label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="500"
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Registration Admission Policy */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '12px 14px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0F172A' }}>Open Instant Pass Registration</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                  {isOpenRegistration ? 'Auto-approves applicants & issues locked pass' : 'Applications queued for Sub-Admin approval'}
                </div>
              </div>

              <input
                type="checkbox"
                checked={isOpenRegistration}
                onChange={(e) => setIsOpenRegistration(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#10B981' }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Full Description &amp; Challenge Tracks
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the hackathon tracks, judging criteria, and schedule..."
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            {/* Topic Tags */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Topic Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI Vision, Edge Neural, Arduino, Scope-3, Gold Recovery"
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="btn btn-primary btn-lg"
            style={{
              justifyContent: 'center',
              fontWeight: '800',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              border: 'none',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
              color: '#FFFFFF'
            }}
          >
            <PlusCircle size={20} />
            <span>{creating ? 'Publishing Live...' : 'Publish Event to Public Hub & MySQL →'}</span>
          </button>
        </form>

        {/* COLUMN B: REALTIME PUBLIC EVENT CARD PREVIEW */}
        <div style={{ position: 'sticky', top: '20px' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '800',
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Public Listing Preview</span>
            <span style={{ color: '#0284C7', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} /> Live Preview
            </span>
          </div>

          {/* Public Event Card */}
          <div style={{
            background: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-color, #E2E8F0)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Banner Image Thumbnail */}
            <div style={{ width: '100%', height: '180px', position: 'relative', background: '#0F172A' }}>
              <img 
                src={bannerPreview} 
                alt="Banner Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(5px)',
                color: '#34D399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                {category}
              </div>

              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: mode === 'Hybrid' ? '#0284C7' : '#10B981',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                {mode}
              </div>
            </div>

            {/* Event Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.3' }}>
                {title || 'Uttar Pradesh Campus E-Waste AI Hackathon 2026'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: '#475569' }}>
                <div>👤 Host: <strong style={{ color: '#D97706' }}>{hostName}</strong> ({hostRole})</div>
                <div>🏛️ Supporting: <strong style={{ color: '#7C3AED' }}>{organizationName}</strong></div>
                <div>📍 {venueLocation}</div>
                <div>📅 {startDate} - {endDate}</div>
              </div>

              {/* Prize Pool & Admission Pill */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#F8FAFC',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Prize Pool</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#D97706' }}>
                    {prizePool}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Admission</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', color: isOpenRegistration ? '#059669' : '#D97706' }}>
                    {isOpenRegistration ? 'Open Pass' : 'Curated Admission'}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tagsInput.split(',').map(s => s.trim()).filter(Boolean).map((t, idx) => (
                  <span key={idx} style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    color: '#475569',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
