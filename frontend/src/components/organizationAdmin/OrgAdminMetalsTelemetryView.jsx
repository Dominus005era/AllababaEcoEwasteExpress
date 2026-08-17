import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Scale, 
  Layers,
  Activity,
  Award
} from 'lucide-react';

export const OrgAdminMetalsTelemetryView = ({
  telemetry = null
}) => {
  const tel = telemetry || {
    totalCollectedTonnage: 18.45,
    totalRecycledUnits: 2460,
    totalRevenueGenerated: 628400,
    co2OffsetTonnes: 49.8,
    activeCorporateClients: 34,
    preciousMetalsRecovered: {
      goldGrams: 158.4,
      silverGrams: 2340.0,
      copperKg: 890.0,
      palladiumGrams: 54.2
    }
  };

  const metals = tel.preciousMetalsRecovered || {
    goldGrams: 158.4,
    silverGrams: 2340.0,
    copperKg: 890.0,
    palladiumGrams: 54.2
  };

  // Live estimated bullion value
  const goldVal = metals.goldGrams * 7200;
  const silverVal = metals.silverGrams * 88;
  const copperVal = metals.copperKg * 780;
  const palladiumVal = metals.palladiumGrams * 3100;
  const totalBullionVal = goldVal + silverVal + copperVal + palladiumVal;

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
      
      {/* View Header Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: 'clamp(16px, 3vw, 24px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: '#FEF3C7',
              color: '#B45309',
              border: '1px solid #FDE68A',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Urban Mining Telemetry
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Refinery &amp; Pure Metal Recovery Output
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Precious Metals &amp; Critical Minerals Telemetry
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '4px 0 0', maxWidth: '780px', lineHeight: 1.45 }}>
            Real-time metallurgical recovery telemetry from smelting furnace lines, hydrometallurgical leaching tanks, and electro-refining cells.
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          width: 'auto',
          minWidth: '180px'
        }}>
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
            Recovered Bullion Value
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#10B981', letterSpacing: '-0.02em' }}>
            ₹{totalBullionVal.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* 4 Core Elemental Recovery Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '14px' }}>
        
        {/* GOLD (Au) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #FDE68A',
          borderRadius: '18px',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                background: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FCD34D',
                fontSize: '0.7rem',
                fontWeight: '900',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                Au 79 • 24K GOLD
              </span>
              <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '800' }}>99.95%</span>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#D97706', letterSpacing: '-0.02em' }}>
              {metals.goldGrams} <span style={{ fontSize: '1rem', fontWeight: '700', color: '#64748B' }}>grams</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
              From PCB fingers, CPU bonding wire &amp; contacts
            </div>
          </div>

          <div style={{
            borderTop: '1px dashed #E2E8F0',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.76rem'
          }}>
            <span style={{ color: '#64748B' }}>Est. Value:</span>
            <strong style={{ color: '#D97706' }}>₹{goldVal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* SILVER (Ag) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '18px',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                background: '#F1F5F9',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: '0.7rem',
                fontWeight: '900',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                Ag 47 • REFINED SILVER
              </span>
              <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '800' }}>99.9%</span>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#334155', letterSpacing: '-0.02em' }}>
              {metals.silverGrams} <span style={{ fontSize: '1rem', fontWeight: '700', color: '#64748B' }}>grams</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
              From membrane switches &amp; capacitor foils
            </div>
          </div>

          <div style={{
            borderTop: '1px dashed #E2E8F0',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.76rem'
          }}>
            <span style={{ color: '#64748B' }}>Est. Value:</span>
            <strong style={{ color: '#334155' }}>₹{silverVal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* COPPER (Cu) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #FFEDD5',
          borderRadius: '18px',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(234, 88, 12, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                background: '#FFEDD5',
                color: '#C2410C',
                border: '1px solid #FDBA74',
                fontSize: '0.7rem',
                fontWeight: '900',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                Cu 29 • COPPER CATHODE
              </span>
              <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '800' }}>Grade A</span>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#EA580C', letterSpacing: '-0.02em' }}>
              {metals.copperKg} <span style={{ fontSize: '1rem', fontWeight: '700', color: '#64748B' }}>kg</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
              From power transformer windings &amp; cables
            </div>
          </div>

          <div style={{
            borderTop: '1px dashed #E2E8F0',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.76rem'
          }}>
            <span style={{ color: '#64748B' }}>Est. Value:</span>
            <strong style={{ color: '#EA580C' }}>₹{copperVal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* PALLADIUM (Pd) */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E0E7FF',
          borderRadius: '18px',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                background: '#EEF2FF',
                color: '#4338CA',
                border: '1px solid #C7D2FE',
                fontSize: '0.7rem',
                fontWeight: '900',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                Pd 46 • PALLADIUM SPONGE
              </span>
              <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '800' }}>High Yield</span>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#4F46E5', letterSpacing: '-0.02em' }}>
              {metals.palladiumGrams} <span style={{ fontSize: '1rem', fontWeight: '700', color: '#64748B' }}>grams</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
              From multi-layer ceramic capacitors (MLCCs)
            </div>
          </div>

          <div style={{
            borderTop: '1px dashed #E2E8F0',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.76rem'
          }}>
            <span style={{ color: '#64748B' }}>Est. Value:</span>
            <strong style={{ color: '#4F46E5' }}>₹{palladiumVal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

      </div>

      {/* Smelter Efficiency & Chemical Process Matrix */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        padding: 'clamp(16px, 3vw, 22px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        gap: '16px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: '0 0 10px' }}>
            🔥 Furnace Thermal &amp; Leaching Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Smelting Recovery Rate:</span>
              <strong style={{ color: '#059669' }}>98.4% Efficiency</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Slag Neutralization:</span>
              <strong style={{ color: '#0F172A' }}>100% Form-4 Compliant</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Secondary Heat:</span>
              <strong style={{ color: '#2563EB' }}>Co-gen (4.2 kWh/kg)</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', margin: '0 0 10px' }}>
            🌱 Carbon Abatement Equivalency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Virgin Ore Mining Avoided:</span>
              <strong style={{ color: '#059669' }}>1,840 MT</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Avoided Scope 3 CO2:</span>
              <strong style={{ color: '#059669' }}>{tel.co2OffsetTonnes} Tonnes</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '5px' }}>
              <span style={{ color: '#64748B' }}>Leaching Mode:</span>
              <strong style={{ color: '#10B981' }}>Bio-Hydrometallurgy</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
