import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Calendar, 
  MapPin, 
  Award,
  Users
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminEditEventModal = ({
  event = null,
  onClose = () => {},
  onSaved = () => {}
}) => {
  if (!event) return null;

  const [formData, setFormData] = useState({
    title: event.title || '',
    category: event.category || 'AI & Hardware Hackathon',
    mode: event.mode || 'Hybrid',
    venueLocation: event.venue_location || event.venueLocation || '',
    hostName: event.host_name || event.hostName || event.organizer_name || '',
    hostRole: event.host_role || event.hostRole || 'Event Host',
    organizationName: event.organization_name || event.organizationName || '',
    startDate: event.start_date || event.startDate || '',
    endDate: event.end_date || event.endDate || '',
    registrationDeadline: event.registration_deadline || event.registrationDeadline || '',
    prizePool: event.prize_pool || event.prizePool || '',
    maxParticipants: event.max_participants || event.maxParticipants || 500,
    isOpenRegistration: event.is_open_registration !== undefined ? Boolean(event.is_open_registration) : true,
    bannerImage: event.banner_image || event.bannerImage || '',
    description: event.description || ''
  });

  const [imageInputMode, setImageInputMode] = useState('url'); // 'url' or 'upload'
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // File change with base64 conversion
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image file size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (typeof base64 === 'string') {
        setFormData(prev => ({ ...prev, bannerImage: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await communityAdminApi.updateEvent(event.id, formData);
      if (res.success) {
        setSuccessMsg('✓ Event specifications & cover image updated successfully!');
        setTimeout(() => {
          onSaved();
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Failed to update event.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error while saving event.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(10px, 3vw, 20px)'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '24px',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: 'clamp(16px, 4vw, 28px)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Edit3 size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                Edit Event &amp; Artwork
              </h3>
              <span style={{ fontSize: '0.76rem', color: '#64748B', fontFamily: 'monospace' }}>
                Event ID: {event.id}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#475569',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {successMsg && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '10px 14px', borderRadius: '10px', fontSize: '0.86rem' }}>
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '10px', fontSize: '0.86rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Cover Image Preview & Editor */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Cover Image Artwork
            </label>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              <div style={{ width: '120px', height: '75px', borderRadius: '10px', overflow: 'hidden', background: '#0F172A', flexShrink: 0 }}>
                <img src={formData.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('upload')}
                    className={`btn ${imageInputMode === 'upload' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={`btn ${imageInputMode === 'url' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                  >
                    Image URL
                  </button>
                </div>

                {imageInputMode === 'upload' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ fontSize: '0.78rem', color: '#475569' }}
                  />
                ) : (
                  <input
                    type="url"
                    value={formData.bannerImage}
                    onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '7px 10px', color: '#0F172A', fontSize: '0.82rem', boxSizing: 'border-box' }}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="comm-form-row-2col">
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.82rem', boxSizing: 'border-box' }}
              >
                <option value="AI & Hardware Hackathon">💻 AI &amp; Hardware</option>
                <option value="Campus & Corporate Drive">🏫 Campus Collection</option>
                <option value="GreenTech & Circular Innovation">🔬 GreenTech Challenge</option>
                <option value="Community Workshop">🛠️ Workshop</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.82rem', boxSizing: 'border-box' }}
              >
                <option value="Hybrid">Hybrid</option>
                <option value="In-Person">In-Person</option>
                <option value="Online">Virtual / Online</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Venue Location &amp; Campus Hub *
            </label>
            <input
              type="text"
              value={formData.venueLocation}
              onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
              required
              style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="comm-form-row-2col">
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Host Person Name</label>
              <input
                type="text"
                value={formData.hostName}
                onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Supporting Organization</label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="comm-form-row-2col">
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }} className="comm-form-row-2col">
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Prize Pool / Grant</label>
              <input
                type="text"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Max Capacity</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 10px', color: '#0F172A', fontSize: '0.84rem', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 16px' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 20px', fontWeight: '800' }}
            >
              {saving ? 'Saving Changes...' : 'Save & Publish Updates'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
