import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  RefreshCw, 
  Sun, 
  Moon,
  Info,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ConsumerApp = ({ onBackToLanding, onOpenRecyclerDash }) => {
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState('camera'); // 'camera', 'result', 'confirmation'
  const [scanPercent, setScanPercent] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Selected sample device for scan
  const sampleDevice = {
    title: 'Smartphone',
    trend: '-24%',
    materials: ['Metals', 'PCBs', 'Batterie', 'Glass'],
    estimatedValue: 450,
    benchmarkValue: 1788,
    co2Saved: '2.3kg CO₂ saved',
    pickupTime: 'Tomorrow, 10:00 AM',
    address: 'Teist S0 Ro 100 am, Central District, Block 4'
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanPercent(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12 + 5);
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setStep('result');
        }, 400);
      }
      setScanPercent(current);
    }, 150);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F172A',
      color: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      borderLeft: '1px solid rgba(255,255,255,0.1)',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 0 50px rgba(0,0,0,0.5)'
    }}>
      {/* Top Mobile Bar */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15,23,42,0.9)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 10
      }}>
        <button 
          onClick={onBackToLanding} 
          style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>EcoTrace AI</span>
        </button>

        <div className="badge badge-emerald" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
          <Sparkles size={12} />
          <span>Consumer PWA</span>
        </div>

        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer' }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* SCREEN 1: CAMERA SCANNER */}
      {step === 'camera' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', position: 'relative' }}>
          {/* Viewfinder Header */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#FFFFFF' }}>AI E-Waste Scanner</h2>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Position old electronic item inside the crosshair</p>
          </div>

          {/* Camera Viewfinder Box */}
          <div style={{
            flex: 1,
            minHeight: '340px',
            background: '#000000',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(16, 185, 129, 0.4)'
          }}>
            {/* Background Image of phone being scanned */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop") center/cover',
              filter: isScanning ? 'contrast(1.2)' : 'brightness(0.8)'
            }}></div>

            {/* Green Reticle Crosshairs */}
            <div className="scan-reticle-overlay" style={{ inset: '24px' }}>
              <div className="reticle-corner reticle-tl" style={{ borderColor: '#10B981', borderWidth: '4px 0 0 4px', width: '32px', height: '32px' }}></div>
              <div className="reticle-corner reticle-tr" style={{ borderColor: '#10B981', borderWidth: '4px 4px 0 0', width: '32px', height: '32px' }}></div>
              <div className="reticle-corner reticle-bl" style={{ borderColor: '#10B981', borderWidth: '0 0 4px 4px', width: '32px', height: '32px' }}></div>
              <div className="reticle-corner reticle-br" style={{ borderColor: '#10B981', borderWidth: '0 4px 4px 0', width: '32px', height: '32px' }}></div>
            </div>

            {/* Scanning Laser Beam */}
            {isScanning && <div className="scan-laser-line"></div>}

            {/* Live Progress HUD overlay */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #10B981',
                borderRadius: '50px',
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)'
              }}>
                <Sparkles size={16} color="#10B981" />
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#10B981' }}>Scanning: {scanPercent}%</span>
              </div>
            )}
          </div>

          {/* Bottom Trigger Controls */}
          <div style={{ padding: '24px 0 12px', textAlign: 'center' }}>
            {!isScanning ? (
              <button 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%', borderRadius: '50px', fontSize: '1.1rem', padding: '18px 0' }}
                onClick={handleStartScan}
              >
                <Camera size={22} />
                <span>Snap & Scan E-Waste</span>
              </button>
            ) : (
              <div style={{ color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <RefreshCw size={18} className="spin-icon" />
                <span>Analyzing E-Waste Material Matrix...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 2: DEVICE IDENTIFICATION & VALUE DRAWER */}
      {step === 'result' && (
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', animation: 'slideUp 0.3s ease' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <button onClick={() => setStep('camera')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={16} />
                <span>Retake Photo</span>
              </button>
              <div className="badge badge-emerald">
                <CheckCircle2 size={14} />
                <span>Scan Complete</span>
              </div>
            </div>

            {/* Device Result Card */}
            <div style={{
              background: '#1E293B',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                Device Identification
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#FFFFFF' }}>{sampleDevice.title}</h2>
                <span className="badge badge-emerald">{sampleDevice.trend} Market Trend</span>
              </div>

              {/* Recoverable Materials */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '8px' }}>Recoverable Component Materials:</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sampleDevice.materials.map((mat, i) => (
                    <span key={i} style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                      ⚡ {mat}
                    </span>
                  ))}
                  <span style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: '600', alignSelf: 'center', cursor: 'pointer' }}>
                    Sceed all &gt;
                  </span>
                </div>
              </div>

              {/* Estimated Value & CO2 Badge */}
              <div style={{
                background: '#0F172A',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Estimated Payout Value</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>
                    ₹{sampleDevice.estimatedValue}
                  </div>
                </div>
                <div className="badge badge-emerald" style={{ padding: '8px 14px' }}>
                  <Leaf size={16} />
                  <span>{sampleDevice.co2Saved}</span>
                </div>
              </div>
            </div>

            {/* Address Selection */}
            <div style={{ background: '#1E293B', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '8px' }}>
                <MapPin size={16} color="#10B981" />
                <span>Doorstep Pickup Address</span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#FFFFFF' }}>{sampleDevice.address}</p>
            </div>
          </div>

          {/* Action Button */}
          <div style={{ marginTop: '24px' }}>
            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%', borderRadius: '50px' }}
              onClick={() => setStep('confirmation')}
            >
              <span>Schedule Doorstep Pickup</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: PICKUP CONFIRMED & MAP VIEW */}
      {step === 'confirmation' && (
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease' }}>
          {/* Top Success Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #059669, #10B981)',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '4px' }}>Pickup Confirmed!</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Scheduled for {sampleDevice.pickupTime}</p>
          </div>

          {/* Map Section Mock */}
          <div style={{
            flex: 1,
            minHeight: '220px',
            background: '#1E293B',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '20px'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop") center/cover',
              opacity: 0.6,
              filter: 'grayscale(0.4) contrast(1.2)'
            }}></div>

            {/* Map Pin Marker */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#10B981',
              color: '#FFFFFF',
              borderRadius: '50px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
            }}>
              <MapPin size={16} />
              <span>Pickup Point (#ID4932)</span>
            </div>
          </div>

          {/* Order Details Summary */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: '#94A3B8' }}>Request ID</span>
              <span style={{ fontWeight: '700', color: '#10B981' }}>#ID4932</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: '#94A3B8' }}>Assigned Recycler</span>
              <span style={{ fontWeight: '600' }}>Authorized Recycler Hub #4</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: '#94A3B8' }}>Estimated Payout</span>
              <span style={{ fontWeight: '800', color: '#10B981' }}>₹450</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep('camera')}>
              <span>New Scan</span>
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={onOpenRecyclerDash}>
              <span>Recycler View &rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
