import React, { useState, useEffect, useMemo } from 'react';
import { 
  QrCode, 
  Lock, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Info,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Link as LinkIcon,
  MessageSquare,
  Send,
  Wifi,
  ListChecks,
  Utensils,
  HelpCircle,
  Plus
} from 'lucide-react';
import { communityAdminApi } from '../../services/api';

export const CommunityAdminPassGeneratorView = ({
  events = [],
  onRefreshData = () => {}
}) => {
  // Target Event
  const [selectedEventId, setSelectedEventId] = useState('');
  const [activePasses, setActivePasses] = useState([]);
  const [loadingPasses, setLoadingPasses] = useState(false);

  // Form Fields - Mandatory
  const [passTitle, setPassTitle] = useState('');
  const [passCodePrefix, setPassCodePrefix] = useState('ECO-PASS-');
  const [gateInstructions, setGateInstructions] = useState('');
  const [reportingTime, setReportingTime] = useState('08:30 AM IST (Badge Collection Desk)');
  const [emergencyContact, setEmergencyContact] = useState('+91 94150 12345 (Campus Helpdesk)');

  // Form Fields - Dynamic Optional
  const [whatsappLink, setWhatsappLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [wifiDetails, setWifiDetails] = useState('SSID: Campus-Guest | Pass: EcoTrace2026');
  const [checklistItems, setChecklistItems] = useState('• Valid College / Gov Photo ID Card\n• Laptop, Charger & Extension Board\n• Confirmation Email / QR Pass');
  const [mealInfo, setMealInfo] = useState('High-Tea & Lunch Provided at Campus Cafeteria');
  const [guidelinesNotes, setGuidelinesNotes] = useState('Entry closes strictly at 09:30 AM. Strictly plastic-free campus.');
  const [signatoryName, setSignatoryName] = useState('Dr. Priya Verma (Academic Lead Organizer)');

  // UI States
  const [generating, setGenerating] = useState(false);
  const [revokingId, setRevokingId] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load all active passes
  const loadPasses = async () => {
    setLoadingPasses(true);
    try {
      const res = await communityAdminApi.getPasses();
      if (res.success && Array.isArray(res.passes)) {
        setActivePasses(res.passes);
      }
    } catch (err) {
      console.warn('Error loading passes:', err);
    } finally {
      setLoadingPasses(false);
    }
  };

  useEffect(() => {
    loadPasses();
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events]);

  // Determine currently selected event details
  const currentEvent = useMemo(() => {
    return events.find(e => e.id === selectedEventId) || null;
  }, [events, selectedEventId]);

  // Check if current event already has an active locked pass
  const existingPassForEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return activePasses.find(p => p.event_id === selectedEventId) || null;
  }, [activePasses, selectedEventId]);

  // Pre-fill Title when Event is selected
  useEffect(() => {
    if (currentEvent) {
      if (!passTitle || passTitle.includes('Official')) {
        setPassTitle(`${currentEvent.title} Official Delegate Pass`);
      }
      if (!gateInstructions) {
        setGateInstructions(`Gate 3 • ${currentEvent.venue_location || 'Main Auditorium'}`);
      }
    }
  }, [currentEvent]);

  // Handle Pass Generation
  const handleGeneratePass = async (e) => {
    e.preventDefault();
    if (!selectedEventId) {
      setErrorMsg('Please select an event to allocate the pass.');
      return;
    }
    if (!passTitle.trim() || !gateInstructions.trim() || !reportingTime.trim() || !emergencyContact.trim()) {
      setErrorMsg('Please fill in all mandatory fields marked with (*).');
      return;
    }

    if (existingPassForEvent) {
      setErrorMsg(`Event already has an active locked pass (${existingPassForEvent.id}). You must delete it first before creating a new pass.`);
      return;
    }

    setGenerating(true);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const payload = {
        eventId: selectedEventId,
        passTitle: passTitle.trim(),
        passCodePrefix: passCodePrefix.trim() || 'ECO-PASS-',
        gateInstructions: gateInstructions.trim(),
        reportingTime: reportingTime.trim(),
        emergencyContact: emergencyContact.trim(),
        whatsappLink: whatsappLink.trim() || null,
        telegramLink: telegramLink.trim() || null,
        discordLink: discordLink.trim() || null,
        wifiDetails: wifiDetails.trim() || null,
        checklistItems: checklistItems.trim() || null,
        mealInfo: mealInfo.trim() || null,
        guidelinesNotes: guidelinesNotes.trim() || null,
        signatoryName: signatoryName.trim() || null
      };

      const res = await communityAdminApi.createPass(payload);
      if (res.success) {
        setStatusMsg(`✓ Official Pass (${res.passId}) successfully generated and locked for ${currentEvent?.title}!`);
        await loadPasses();
        onRefreshData();
      } else {
        setErrorMsg(res.error || 'Failed to generate pass.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Database server error.');
    } finally {
      setGenerating(false);
    }
  };

  // Revoke / Delete Pass
  const handleRevokePass = async (passId, eventTitle) => {
    if (!window.confirm(`STRICT CONFIRMATION:\nAre you sure you want to delete and unlock pass (${passId}) for "${eventTitle}"?\nOnce deleted, attendees will need a newly generated pass to check in.`)) {
      return;
    }

    setRevokingId(passId);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const res = await communityAdminApi.deletePass(passId);
      if (res.success) {
        setStatusMsg(`✓ Pass ${passId} revoked. Event is now unlocked for new pass generation.`);
        await loadPasses();
        onRefreshData();
      } else {
        setErrorMsg(res.error || 'Failed to delete pass.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error while deleting pass.');
    } finally {
      setRevokingId(null);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. TOP TITLE BANNER */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '16px',
        padding: 'clamp(14px, 3.5vw, 20px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%'
      }}>
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{
              background: '#10B981',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.68rem',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              PASS MASTER ENGINE
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Strict 1-Event = 1-Pass Auto-Locking Protocol
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3.8vw, 1.4rem)', fontWeight: '800', margin: 0, color: '#0F172A', wordBreak: 'break-word' }}>
            Event Pass Configuration &amp; Auto-Lock Master
          </h2>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFFFFF',
          padding: '6px 12px',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          fontSize: '0.82rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          flexShrink: 0
        }}>
          <Lock size={15} color="#10B981" />
          <span style={{ color: '#475569' }}>Active Locked Passes:</span>
          <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{activePasses.length}</strong>
        </div>
      </div>

      {/* 2. NOTIFICATIONS */}
      {statusMsg && (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          color: '#166534',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          wordBreak: 'break-word'
        }}>
          <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          color: '#991B1B',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          wordBreak: 'break-word'
        }}>
          <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 3. TWO-COLUMN WORKSPACE: FORM ON LEFT, HOLOGRAPHIC PASS SIMULATOR ON RIGHT */}
      <div className="comm-admin-pass-grid">
        
        {/* COLUMN A: EVENT SELECTOR & PASS CONFIGURATION FORM */}
        <div style={{
          background: 'var(--bg-card, #FFFFFF)',
          border: '1px solid var(--border-color, #E2E8F0)',
          borderRadius: '20px',
          padding: 'clamp(14px, 3.5vw, 24px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          minWidth: 0,
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          
          {/* STEP 1: TARGET EVENT SELECTION */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                1. Select Target Event *
              </label>
              {existingPassForEvent ? (
                <span style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Lock size={11} /> Pass Auto-Locked
                </span>
              ) : (
                <span style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  color: '#0284C7',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  Ready to Allocate
                </span>
              )}
            </div>

            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '11px 14px',
                color: '#0F172A',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.id}) • {ev.start_date || ev.startDate}
                </option>
              ))}
            </select>
          </div>

          {/* IF PASS ALREADY LOCKED: SHOW IMMUTABLE STATUS & REVOKE OPTION */}
          {existingPassForEvent ? (
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '16px',
              padding: 'clamp(14px, 3.5vw, 20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxSizing: 'border-box',
              minWidth: 0,
              maxWidth: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ minWidth: 0, flex: '1 1 200px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#166534', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    🔒 Immutable Locked Pass Active
                  </div>
                  <h4 style={{ margin: '4px 0 0', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', fontWeight: '900', color: '#0F172A', wordBreak: 'break-word' }}>
                    {existingPassForEvent.pass_title}
                  </h4>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', fontFamily: 'monospace', marginTop: '3px', wordBreak: 'break-all' }}>
                    Pass ID: {existingPassForEvent.id} • Created: {new Date(existingPassForEvent.created_at).toLocaleDateString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRevokePass(existingPassForEvent.id, currentEvent?.title)}
                  disabled={revokingId === existingPassForEvent.id}
                  className="btn btn-outline btn-sm"
                  style={{
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    color: '#EF4444',
                    padding: '7px 14px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    flexShrink: 0,
                    borderRadius: '8px'
                  }}
                >
                  <Trash2 size={14} />
                  <span>{revokingId === existingPassForEvent.id ? 'Revoking...' : 'Revoke / Cancel Pass'}</span>
                </button>
              </div>

              <div style={{
                fontSize: '0.82rem',
                color: '#334155',
                lineHeight: '1.5',
                borderTop: '1px solid #E2E8F0',
                paddingTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div>📍 <strong>Gate:</strong> {existingPassForEvent.gate_instructions}</div>
                <div>⏰ <strong>Reporting:</strong> {existingPassForEvent.reporting_time}</div>
                <div>📞 <strong>Emergency Help:</strong> {existingPassForEvent.emergency_contact}</div>
                {existingPassForEvent.whatsapp_link && (
                  <div style={{ marginTop: '2px', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
                    💬 <strong>WhatsApp Group:</strong>{' '}
                    <a href={existingPassForEvent.whatsapp_link} target="_blank" rel="noreferrer" style={{ color: '#059669', wordBreak: 'break-all' }}>
                      {existingPassForEvent.whatsapp_link}
                    </a>
                  </div>
                )}
                {existingPassForEvent.telegram_link && (
                  <div style={{ marginTop: '2px', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
                    ✈️ <strong>Telegram Channel:</strong>{' '}
                    <a href={existingPassForEvent.telegram_link} target="_blank" rel="noreferrer" style={{ color: '#0284C7', wordBreak: 'break-all' }}>
                      {existingPassForEvent.telegram_link}
                    </a>
                  </div>
                )}
              </div>

              <div style={{
                fontSize: '0.76rem',
                color: '#64748B',
                fontStyle: 'italic',
                background: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                lineHeight: '1.4'
              }}>
                💡 As per protocol, once a pass is generated, it cannot be edited to prevent participant ticket discrepancy. To modify or replace details, delete this pass first.
              </div>
            </div>
          ) : (
            /* IF NO PASS LOCKED YET: RENDER PASS CREATION FORM */
            <form onSubmit={handleGeneratePass} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Mandatory Fields Section */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Mandatory Pass Details (Required for All Attendees)
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Official Pass Badge Name / Title *
                  </label>
                  <input
                    type="text"
                    value={passTitle}
                    onChange={(e) => setPassTitle(e.target.value)}
                    placeholder="e.g. Uttar Pradesh AI Hackathon Delegate Pass"
                    required
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="comm-form-row-2col">
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Pass Code Prefix *
                    </label>
                    <input
                      type="text"
                      value={passCodePrefix}
                      onChange={(e) => setPassCodePrefix(e.target.value)}
                      placeholder="ECO-HACK-"
                      required
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Check-in Gate &amp; Room Desk *
                    </label>
                    <input
                      type="text"
                      value={gateInstructions}
                      onChange={(e) => setGateInstructions(e.target.value)}
                      placeholder="e.g. Gate 3 - Main Auditorium Ground Floor"
                      required
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div className="comm-form-row-2col">
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Reporting Window / Time *
                    </label>
                    <input
                      type="text"
                      value={reportingTime}
                      onChange={(e) => setReportingTime(e.target.value)}
                      placeholder="e.g. 08:30 AM IST (Badge Check-in)"
                      required
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Emergency Support Phone / Helpdesk *
                    </label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+91 94150 12345"
                      required
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Social & Community Hub Links */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Community &amp; Social Links (Dynamic Inclusions)
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MessageSquare size={14} color="#10B981" />
                    <span>WhatsApp Official Group Invite Link</span>
                  </label>
                  <input
                    type="url"
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Send size={14} color="#38BDF8" />
                    <span>Telegram Channel / Alert Broadcast Link</span>
                  </label>
                  <input
                    type="url"
                    value={telegramLink}
                    onChange={(e) => setTelegramLink(e.target.value)}
                    placeholder="https://t.me/..."
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <LinkIcon size={14} color="#8B5CF6" />
                    <span>Discord Server / Mentorship Hub Link</span>
                  </label>
                  <input
                    type="url"
                    value={discordLink}
                    onChange={(e) => setDiscordLink(e.target.value)}
                    placeholder="https://discord.gg/..."
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Dynamic Venue & Logistic Perks */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Venue Logistics, Wi-Fi &amp; Attendee Checklist
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Wifi size={14} color="#F59E0B" />
                    <span>Campus Wi-Fi Credentials</span>
                  </label>
                  <input
                    type="text"
                    value={wifiDetails}
                    onChange={(e) => setWifiDetails(e.target.value)}
                    placeholder="SSID: Event-WiFi | Password: ..."
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <ListChecks size={14} color="#34D399" />
                    <span>Mandatory Items to Bring (Checklist)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={checklistItems}
                    onChange={(e) => setChecklistItems(e.target.value)}
                    placeholder="• Laptop & Charger&#10;• College ID Card"
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                <div className="comm-form-row-2col">
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Catering &amp; Meals Info
                    </label>
                    <input
                      type="text"
                      value={mealInfo}
                      onChange={(e) => setMealInfo(e.target.value)}
                      placeholder="e.g. Lunch & Drinks Provided"
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Signatory Organizer Name
                    </label>
                    <input
                      type="text"
                      value={signatoryName}
                      onChange={(e) => setSignatoryName(e.target.value)}
                      placeholder="e.g. Dr. Priya Verma"
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '9px 12px', color: '#0F172A', fontSize: '0.86rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit & Lock Button */}
              <button
                type="submit"
                disabled={generating}
                className="btn btn-primary btn-lg"
                style={{
                  justifyContent: 'center',
                  fontWeight: '800',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  border: 'none',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                  color: '#FFFFFF',
                  width: '100%'
                }}
              >
                <Lock size={18} />
                <span>{generating ? 'Auto-Locking Pass...' : 'Generate & Auto-Lock Pass for Event →'}</span>
              </button>

            </form>
          )}

        </div>

        {/* COLUMN B: LIVE HOLOGRAPHIC PASS SIMULATION PREVIEW */}
        <div className="comm-sticky-col-desktop">
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
            <span>Live Digital Pass Simulation</span>
            <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} /> Participant View
            </span>
          </div>

          {/* Holographic Pass Mockup */}
          <div style={{
            background: 'linear-gradient(145deg, #0B132B 0%, #111E38 60%, #0F172A 100%)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '24px',
            padding: 'clamp(14px, 3.5vw, 24px)',
            color: '#F8FAFC',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 25px rgba(16, 185, 129, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            minWidth: 0,
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Holographic Glow Pill */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Top Pass Brand */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🌱</span>
                <span style={{ fontWeight: '900', fontSize: '0.92rem', letterSpacing: '0.05em', color: '#10B981' }}>
                  ECOTRACE DELEGATE
                </span>
              </div>

              <span style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontSize: '0.68rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                {existingPassForEvent ? '🔒 LOCKED PASS' : '✨ LIVE PREVIEW'}
              </span>
            </div>

            {/* Pass Title */}
            <h3 style={{
              fontSize: 'clamp(1.05rem, 3.8vw, 1.25rem)',
              fontWeight: '900',
              margin: '0 0 12px',
              color: '#FFFFFF',
              lineHeight: '1.3',
              wordBreak: 'break-word'
            }}>
              {existingPassForEvent?.pass_title || passTitle || 'Community Hackathon Official Pass'}
            </h3>

            {/* Sample Ticket Code & QR */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px dashed rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: 'clamp(10px, 3vw, 16px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              gap: '10px',
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '100%'
            }}>
              <div style={{ minWidth: 0, flex: '1 1 auto', overflow: 'hidden' }}>
                <div style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sample Ticket Code</div>
                <div style={{ fontSize: 'clamp(1rem, 3.8vw, 1.15rem)', fontWeight: '900', color: '#10B981', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {existingPassForEvent?.pass_code_prefix || passCodePrefix || 'ECO-PASS-'}8491
                </div>
                <div style={{ fontSize: '0.7rem', color: '#38BDF8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  PID: ECO-PID-8491 (Donor + Hacker)
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <QrCode size={34} color="#000000" />
              </div>
            </div>

            {/* Gate & Logistics Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#CBD5E1',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#10B981" />
                <span><strong>Gate:</strong> {existingPassForEvent?.gate_instructions || gateInstructions || 'Main Gate / Desk 1'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} color="#38BDF8" />
                <span><strong>Reporting:</strong> {existingPassForEvent?.reporting_time || reportingTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#F59E0B" />
                <span><strong>Helpdesk:</strong> {existingPassForEvent?.emergency_contact || emergencyContact}</span>
              </div>
              {(existingPassForEvent?.wifi_details || wifiDetails) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wifi size={14} color="#A78BFA" />
                  <span><strong>Wi-Fi:</strong> {existingPassForEvent?.wifi_details || wifiDetails}</span>
                </div>
              )}
            </div>

            {/* Social Hub Links Live Buttons */}
            {((existingPassForEvent?.whatsapp_link || whatsappLink) || (existingPassForEvent?.telegram_link || telegramLink)) && (
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>
                  Official Attendee Hubs:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(existingPassForEvent?.whatsapp_link || whatsappLink) && (
                    <a
                      href={existingPassForEvent?.whatsapp_link || whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: 'rgba(37, 211, 102, 0.15)',
                        border: '1px solid rgba(37, 211, 102, 0.4)',
                        color: '#25D366',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={13} />
                      <span>Join WhatsApp Group</span>
                    </a>
                  )}

                  {(existingPassForEvent?.telegram_link || telegramLink) && (
                    <a
                      href={existingPassForEvent?.telegram_link || telegramLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: 'rgba(0, 136, 204, 0.15)',
                        border: '1px solid rgba(0, 136, 204, 0.4)',
                        color: '#0088CC',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      <Send size={13} />
                      <span>Join Telegram</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Signatory Footer */}
            <div style={{
              marginTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: '#64748B'
            }}>
              <span>CPCB Verified Governance</span>
              <span style={{ color: '#10B981', fontWeight: '700' }}>
                {existingPassForEvent?.signatory_name || signatoryName}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* 4. ACTIVE PASSES DIRECTORY TABLE & MOBILE CARDS */}
      <div style={{
        background: 'var(--bg-card, #FFFFFF)',
        border: '1px solid var(--border-color, #E2E8F0)',
        borderRadius: '20px',
        padding: 'clamp(14px, 3.5vw, 24px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 3.2vw, 1.2rem)', fontWeight: '800', color: '#0F172A' }}>
              Allocated &amp; Locked Event Passes Directory ({activePasses.length})
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              All immutable pass templates currently locked to events.
            </p>
          </div>

          <button
            onClick={loadPasses}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.78rem', height: '36px' }}
          >
            Refresh Directory
          </button>
        </div>

        {activePasses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B' }}>
            <Lock size={32} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
            <p style={{ margin: 0, fontSize: '0.86rem' }}>No locked passes created yet. Allocate a pass for any event above.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }} className="comm-admin-table-container comm-pass-table-desktop">
              <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', background: '#F8FAFC', textAlign: 'left', color: '#475569', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>Pass ID</th>
                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>Target Event</th>
                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>Gate &amp; Reporting</th>
                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>Social Links</th>
                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>Status</th>
                    <th style={{ padding: '12px 14px', fontWeight: '800', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activePasses.map((p) => {
                    const evMatch = events.find(e => e.id === p.event_id);
                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: '800', color: '#059669' }}>
                          {p.id}
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ fontWeight: '800', color: '#0F172A' }}>{evMatch?.title || p.event_id}</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{p.pass_title}</div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ color: '#334155' }}>📍 {p.gate_instructions}</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B' }}>⏰ {p.reporting_time}</div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {p.whatsapp_link && (
                              <a href={p.whatsapp_link} target="_blank" rel="noreferrer" title="WhatsApp Group" style={{ color: '#25D366' }}>
                                <MessageSquare size={16} />
                              </a>
                            )}
                            {p.telegram_link && (
                              <a href={p.telegram_link} target="_blank" rel="noreferrer" title="Telegram Channel" style={{ color: '#0088CC' }}>
                                <Send size={16} />
                              </a>
                            )}
                            {p.discord_link && (
                              <a href={p.discord_link} target="_blank" rel="noreferrer" title="Discord" style={{ color: '#8B5CF6' }}>
                                <LinkIcon size={16} />
                              </a>
                            )}
                          </div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: '#059669',
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            🔒 Locked
                          </span>
                        </td>

                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleRevokePass(p.id, evMatch?.title || p.event_id)}
                            disabled={revokingId === p.id}
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid #FECACA',
                              color: '#DC2626',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                            <span>Revoke</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List View (shown on <= 768px) */}
            <div className="comm-pass-cards-mobile">
              {activePasses.map((p) => {
                const evMatch = events.find(e => e.id === p.event_id);
                return (
                  <div
                    key={p.id}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#059669', fontSize: '0.78rem' }}>
                          {p.id}
                        </div>
                        <h4 style={{ margin: '2px 0 0', fontSize: '0.96rem', fontWeight: '900', color: '#0F172A' }}>
                          {evMatch?.title || p.event_id}
                        </h4>
                        <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '1px' }}>
                          {p.pass_title}
                        </div>
                      </div>

                      <span style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#059669',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}>
                        🔒 Locked
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#334155', borderTop: '1px solid #E2E8F0', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div>📍 <strong>Gate:</strong> {p.gate_instructions}</div>
                      <div>⏰ <strong>Reporting:</strong> {p.reporting_time}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {p.whatsapp_link && (
                          <a
                            href={p.whatsapp_link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: 'rgba(37, 211, 102, 0.12)',
                              color: '#25D366',
                              border: '1px solid rgba(37, 211, 102, 0.3)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              textDecoration: 'none'
                            }}
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        {p.telegram_link && (
                          <a
                            href={p.telegram_link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: 'rgba(0, 136, 204, 0.12)',
                              color: '#0088CC',
                              border: '1px solid rgba(0, 136, 204, 0.3)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              textDecoration: 'none'
                            }}
                          >
                            <Send size={13} />
                            <span>Telegram</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleRevokePass(p.id, evMatch?.title || p.event_id)}
                        disabled={revokingId === p.id}
                        style={{
                          background: '#FEF2F2',
                          border: '1px solid #FECACA',
                          color: '#DC2626',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={12} />
                        <span>Revoke Pass</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

    </div>
  );
};
