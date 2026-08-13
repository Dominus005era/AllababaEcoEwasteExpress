import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, CheckCircle2, ShieldCheck, Leaf, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const LiveScannerPreview = ({ onScheduleClick }) => {
  const [scanProgress, setScanProgress] = useState(1.5);
  const [isScanning, setIsScanning] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 86.9) {
            clearInterval(interval);
            setIsScanning(false);
            setShowResult(true);
            return 86.9;
          }
          return parseFloat((prev + (Math.random() * 8 + 2)).toFixed(1));
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleReScan = () => {
    setShowResult(false);
    setScanProgress(1.5);
    setIsScanning(true);
  };

  return (
    <div className="hero-scanner-card">
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="pulse-dot"></div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--emerald-primary)', textTransform: 'uppercase' }}>
            Live AI Vision Engine
          </span>
        </div>
        <button 
          onClick={handleReScan}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
          title="Restart AI Scan Animation"
        >
          <RefreshCw size={14} className={isScanning ? 'spin-icon' : ''} />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Viewfinder Camera Frame */}
      <div className="scanner-viewfinder">
        {/* Background Device Mock */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.9) 100%), url("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop") center/cover',
          filter: isScanning ? 'contrast(1.1) brightness(0.9)' : 'none'
        }}></div>

        {/* Green Laser Scan Line */}
        {isScanning && <div className="scan-laser-line"></div>}

        {/* Reticle Bounding Box Corners */}
        <div className="scan-reticle-overlay">
          <div className="reticle-corner reticle-tl"></div>
          <div className="reticle-corner reticle-tr"></div>
          <div className="reticle-corner reticle-bl"></div>
          <div className="reticle-corner reticle-br"></div>
        </div>

        {/* Floating AR Data Nodes */}
        <div className="scanner-ar-node">
          <Sparkles size={14} />
          <span>AI Scanning: {scanProgress}%</span>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 12px',
          fontSize: '0.75rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>Device Auto-Detected</span>
        </div>
      </div>

      {/* AI Classification & Valuation Result Drawer */}
      {showResult && (
        <div className="result-sheet" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <div className="result-header">
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                Device Identification
              </div>
              <div className="device-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span>Smartphone</span>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>-24%</span>
              </div>
            </div>
            <span className="badge badge-blue">Verified Class A</span>
          </div>

          {/* Recoverable Materials */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Recoverable Materials:</div>
            <div className="materials-tags">
              <span className="mat-tag">⚡ Metals</span>
              <span className="mat-tag">🔌 PCBs</span>
              <span className="mat-tag">🔋 Batterie</span>
              <span className="mat-tag" style={{ color: 'var(--emerald-primary)', cursor: 'pointer' }}>See all &gt;</span>
            </div>
          </div>

          {/* Value & Environmental Impact Row */}
          <div className="result-valuation-row">
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Resale Value</div>
              <div className="valuation-price">₹450 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: '400' }}>₹1,788</span></div>
            </div>
            <div className="badge badge-emerald" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
              <Leaf size={14} />
              <span>2.3kg CO₂ saved</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={onScheduleClick}>
            <span>Schedule Doorstep Pickup</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
