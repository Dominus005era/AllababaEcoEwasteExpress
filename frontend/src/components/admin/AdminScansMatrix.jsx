import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { 
  ScanLine, 
  Search, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Sparkles, 
  Leaf, 
  Sliders, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Calendar, 
  ShieldCheck,
  Cpu,
  ZoomIn
} from 'lucide-react';
import { ImageLightboxModal } from '../common/ImageLightboxModal';

export const AdminScansMatrix = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [selectedScan, setSelectedScan] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState({
    isOpen: false,
    url: '',
    title: '',
    subtitle: '',
    tags: []
  });

  const fetchScans = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getScans({
        category: categoryFilter,
        condition: conditionFilter,
        search,
        limit: 100
      });
      if (res.scans) {
        setScans(res.scans);
      }
    } catch (err) {
      console.error('Error fetching admin scans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, [categoryFilter, conditionFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchScans();
  };

  const handleDeleteScan = async (scanId) => {
    if (!window.confirm(`Are you sure you want to permanently purge Scan #${scanId} from the database?`)) {
      return;
    }
    setDeletingId(scanId);
    try {
      await adminApi.deleteScan(scanId);
      setScans(prev => prev.filter(s => s.id !== scanId));
      if (selectedScan?.id === scanId) {
        setSelectedScan(null);
      }
    } catch (err) {
      alert('Failed to delete scan: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge badge-emerald" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '6px' }}>
            <Sparkles size={13} />
            <span>AI OPTICAL SCANNER &amp; YELLOW ELEMENT COMPOSITION HUD</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            Hardware Scans &amp; Elemental Extraction Intelligence
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Real-time multimodal Gemini AI vision inspection logs, yellow precious metals index (Gold Au, Copper Cu, Silver Ag, Palladium Pd, Lithium Li), and condition multipliers.
          </p>
        </div>

        <button 
          onClick={fetchScans} 
          disabled={loading}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Refresh Scans</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '22px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', flex: '1 1 280px', minWidth: '240px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by brand, model, donor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '9px 12px 9px 36px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 16px', borderRadius: '10px' }}>
            Filter
          </button>
        </form>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '9px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="all">All Categories ({scans.length})</option>
            <option value="smartphone">Smartphones &amp; Mobiles</option>
            <option value="laptop">Laptops &amp; MacBooks</option>
            <option value="tablet">Tablets &amp; iPads</option>
            <option value="desktop">Desktops &amp; Workstations</option>
            <option value="television">Smart TVs &amp; Monitors</option>
            <option value="battery">Batteries &amp; Inverters</option>
            <option value="gpu">PC Components &amp; GPUs</option>
            <option value="telecom">Networking &amp; Telecom</option>
          </select>

          {/* Condition Filter */}
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '9px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="all">All Conditions</option>
            <option value="Flawless">Flawless Working (1.15x)</option>
            <option value="Working">Working (1.00x)</option>
            <option value="Cracked">Cracked / Heavy Wear (0.75x)</option>
            <option value="Battery">Battery Degraded (0.65x)</option>
            <option value="Dead">Dead / Won't Turn On (0.45x)</option>
          </select>
        </div>
      </div>

      {/* Scans Grid / Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#10B981' }}>
          <RefreshCw size={28} className="spin" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '0.95rem' }}>Querying optical hardware scans &amp; element matrix from MySQL...</p>
        </div>
      ) : scans.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px dashed var(--border-color)',
          borderRadius: '16px',
          padding: '50px 20px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <ScanLine size={42} color="var(--text-muted)" style={{ margin: '0 auto 14px' }} />
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 6px' }}>No Hardware Scans Found</h4>
          <p style={{ fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto' }}>
            No scan entries match your current search filters. Initiate an AI optical scan on the Consumer App to log real-time elemental observations.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {scans.map((scan) => (
            <div
              key={scan.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '18px 20px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {/* Scan Top Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0, flex: 1 }}>
                    {(scan.imageUrl || scan.image_url) && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage({
                            isOpen: true,
                            url: scan.imageUrl || scan.image_url,
                            title: `${scan.brand} ${scan.modelName}`,
                            subtitle: `AI Optical Vision Scan #${scan.id} • ${new Date(scan.scannedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                            tags: [scan.deviceType, `${scan.deviceAgeYears || 5} Yrs Old`, scan.physicalCondition]
                          });
                        }}
                        style={{
                          position: 'relative',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title="Click to expand high-resolution hardware photo"
                      >
                        <img
                          src={scan.imageUrl || scan.image_url}
                          alt={scan.modelName}
                          style={{
                            width: '58px',
                            height: '58px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(16, 185, 129, 0.4)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          background: 'rgba(0,0,0,0.75)',
                          borderRadius: '4px',
                          padding: '2px',
                          color: '#10B981',
                          display: 'flex'
                        }}>
                          <ZoomIn size={10} />
                        </div>
                      </div>
                    )}

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        SCAN #{scan.id} • {new Date(scan.scannedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '2px 0 0', color: 'var(--text-primary)', lineHeight: '1.25' }}>
                        {scan.brand} {scan.modelName}
                      </h4>
                    </div>
                  </div>

                  <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '4px 10px', whiteSpace: 'nowrap', fontWeight: '800' }}>
                    ₹{scan.estimatedVal}
                  </span>
                </div>

                {/* Subtitle / Attributes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                    {scan.deviceType} ({scan.releaseYear || 2022})
                  </span>
                  <span className="badge badge-yellow" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.72rem' }}>
                    {scan.physicalCondition}
                  </span>
                  <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>
                    {scan.deviceAgeYears} yrs old
                  </span>
                </div>

                {/* YELLOW SCAN ELEMENTAL MATRIX */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🟡</span>
                    <span>Precious &amp; Strategic Elements Extraction:</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    {/* Gold */}
                    <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Gold (Au)</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#F59E0B' }}>{scan?.elementalMatrix?.goldYield || '0.04g'}</div>
                    </div>
                    {/* Copper */}
                    <div style={{ background: 'rgba(234, 88, 12, 0.08)', border: '1px solid rgba(234, 88, 12, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Copper (Cu)</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#EA580C' }}>{scan?.elementalMatrix?.copperYield || '14.2g'}</div>
                    </div>
                    {/* Silver */}
                    <div style={{ background: 'rgba(148, 163, 184, 0.08)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Silver (Ag)</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94A3B8' }}>{scan?.elementalMatrix?.silverYield || '0.35g'}</div>
                    </div>
                    {/* Palladium */}
                    <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Palladium</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#A855F7' }}>{scan?.elementalMatrix?.palladiumYield || '0.015g'}</div>
                    </div>
                    {/* Lithium */}
                    <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Lithium</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#3B82F6' }}>{scan?.elementalMatrix?.lithiumYield || '4.8g'}</div>
                    </div>
                    {/* Cobalt */}
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '4px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Cobalt</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#10B981' }}>{scan?.elementalMatrix?.cobaltYield || '3.2g'}</div>
                    </div>
                  </div>
                </div>

                {/* Donor & Carbon Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>User: <strong style={{ color: 'var(--text-primary)' }}>{scan.donorName}</strong> ({scan.donorDistrict})</span>
                  <span style={{ color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Leaf size={12} />
                    {scan.co2Saved}kg CO₂e saved
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedScan(scan)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1, fontSize: '0.78rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Eye size={13} />
                  <span>Inspect Dossier</span>
                </button>

                <button
                  type="button"
                  disabled={deletingId === scan.id}
                  onClick={() => handleDeleteScan(scan.id)}
                  className="btn btn-outline btn-sm"
                  style={{
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    color: '#EF4444',
                    padding: '0 10px',
                    borderRadius: '8px'
                  }}
                  title="Permanently Purge Scan Record"
                >
                  <Trash2 size={13} className={deletingId === scan.id ? 'spin' : ''} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          MODAL: DEEP-DIVE SCAN & ELEMENTAL DOSSIER INSPECTOR
      ========================================================================= */}
      {selectedScan && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(6px)'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-emerald" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  SCAN DOSSIER #{selectedScan.id}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '6px 0 0', color: 'var(--text-primary)' }}>
                  {selectedScan.brand} {selectedScan.modelName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScan(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Hardware Photo Preview Box (If available) */}
            {(selectedScan.imageUrl || selectedScan.image_url) && (
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease'
                }}
                onClick={() => setLightboxImage({
                  isOpen: true,
                  url: selectedScan.imageUrl || selectedScan.image_url,
                  title: `${selectedScan.brand} ${selectedScan.modelName}`,
                  subtitle: `AI Vision Scan #${selectedScan.id} • ${new Date(selectedScan.scannedAt).toLocaleDateString('en-IN')}`,
                  tags: [selectedScan.deviceType, selectedScan.physicalCondition, `Valuation: ₹${selectedScan.estimatedVal}`]
                })}
                title="Click to expand high-resolution hardware photograph"
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={selectedScan.imageUrl || selectedScan.image_url}
                    alt={selectedScan.modelName}
                    style={{
                      width: '90px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(16, 185, 129, 0.4)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '3px',
                    right: '3px',
                    background: 'rgba(0,0,0,0.8)',
                    borderRadius: '4px',
                    padding: '2px',
                    color: '#10B981',
                    display: 'flex'
                  }}>
                    <ZoomIn size={12} />
                  </div>
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Inspection Photograph</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '2px 7px' }}>Click to Enlarge</span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    Real-time hardware casing and diagnostic capture via Multimodal Gemini AI Vision Engine on donor submission.
                  </p>
                </div>
              </div>
            )}

            {/* Detailed Spec Attributes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Device Category</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedScan.deviceType}</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Physical Condition</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F59E0B' }}>{selectedScan.physicalCondition}</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Repair History</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{selectedScan.repairHistory}</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Net Quote</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10B981' }}>₹{selectedScan.estimatedVal}</div>
              </div>
            </div>

            {/* Periodic Elements Breakdown */}
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '18px 20px', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} color="#F59E0B" />
                <span>Recoverable Elemental periodic matrix:</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🟡 Gold (Au)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#F59E0B' }}>{selectedScan?.elementalMatrix?.goldYield || '0.04g'}</div>
                </div>

                <div style={{ background: 'rgba(234, 88, 12, 0.1)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🟠 Copper (Cu)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#EA580C' }}>{selectedScan?.elementalMatrix?.copperYield || '14.2g'}</div>
                </div>

                <div style={{ background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>⚪ Silver (Ag)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#94A3B8' }}>{selectedScan?.elementalMatrix?.silverYield || '0.35g'}</div>
                </div>

                <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🟣 Palladium (Pd)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#A855F7' }}>{selectedScan?.elementalMatrix?.palladiumYield || '0.015g'}</div>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🔵 Lithium (Li)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#3B82F6' }}>{selectedScan?.elementalMatrix?.lithiumYield || '4.8g'}</div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🟢 Cobalt (Co)</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#10B981' }}>{selectedScan?.elementalMatrix?.cobaltYield || '3.2g'}</div>
                </div>
              </div>
            </div>

            {/* Donor / User Information */}
            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                Citizen / Originating Donor:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <strong>{selectedScan.donorName}</strong> • {selectedScan.donorEmail} • {selectedScan.donorPhone || 'Phone Not Registered'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                District Location: {selectedScan.donorDistrict}, India
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleDeleteScan(selectedScan.id)}
                className="btn btn-outline"
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
              >
                <Trash2 size={15} />
                <span>Delete Record</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedScan(null)}
                className="btn btn-primary"
              >
                <span>Close Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox High-Res Image Modal */}
      <ImageLightboxModal
        isOpen={lightboxImage.isOpen}
        onClose={() => setLightboxImage(prev => ({ ...prev, isOpen: false }))}
        imageUrl={lightboxImage.url}
        title={lightboxImage.title}
        subtitle={lightboxImage.subtitle}
        tags={lightboxImage.tags}
      />
    </div>
  );
};
