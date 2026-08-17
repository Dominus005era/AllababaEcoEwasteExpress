import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { 
  Database, 
  Layers, 
  Search, 
  RefreshCw, 
  DollarSign, 
  ShieldCheck, 
  Leaf, 
  Cpu, 
  Building2, 
  Sparkles,
  ExternalLink,
  Sliders,
  Award
} from 'lucide-react';

export const AdminDatasetsExplorer = () => {
  const [activeLayer, setActiveLayer] = useState('layer1'); // 'layer1', 'layer2', 'layer3', 'layer4'
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  // Datasets
  const [layer1Data, setLayer1Data] = useState([]);
  const [layer2Data, setLayer2Data] = useState([]);
  const [layer3Data, setLayer3Data] = useState([]);
  const [layer4Data, setLayer4Data] = useState([]);

  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const loadActiveLayerData = async () => {
    setLoading(true);
    try {
      if (activeLayer === 'layer1') {
        const res = await adminApi.getDatasetDevices({ search, page: pagination.page, limit: 30 });
        if (res.devices) {
          setLayer1Data(res.devices);
          setPagination({ page: res.page, totalPages: res.totalPages, total: res.total });
        }
      } else if (activeLayer === 'layer2') {
        const res = await adminApi.getDatasetMaterials();
        if (res.materials) {
          setLayer2Data(res.materials);
          setPagination({ page: 1, totalPages: 1, total: res.count });
        }
      } else if (activeLayer === 'layer3') {
        const res = await adminApi.getDatasetPricing({ search, page: pagination.page, limit: 30 });
        if (res.pricingOrganizations) {
          setLayer3Data(res.pricingOrganizations);
          setPagination({ page: res.page, totalPages: res.totalPages, total: res.total });
        }
      } else if (activeLayer === 'layer4') {
        const res = await adminApi.getDatasetValuations({ search, page: pagination.page, limit: 30 });
        if (res.valuations) {
          setLayer4Data(res.valuations);
          setPagination({ page: res.page, totalPages: res.totalPages, total: res.total });
        }
      }
    } catch (err) {
      console.error(`Error loading dataset for ${activeLayer}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActiveLayerData();
  }, [activeLayer]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadActiveLayerData();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge badge-blue" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '6px' }}>
            <Database size={13} />
            <span>4-LAYER E-WASTE KNOWLEDGE BASE &amp; MATERIAL PRICING SYSTEM</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            4-Layer Dataset Explorer &amp; Dynamic Valuation Parameters
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Inspect genuine CPCB device archetypes, atomic material composition percentages, authorized recycler spot prices, and transaction histories.
          </p>
        </div>

        <button 
          onClick={loadActiveLayerData} 
          disabled={loading}
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Reload Layer</span>
        </button>
      </div>

      {/* Layer Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '14px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'layer1', label: 'Layer 1: Device Knowledge Base', icon: Cpu, badge: 'Hardware Specs' },
          { id: 'layer2', label: 'Layer 2: Material Compositions', icon: Layers, badge: 'Chemical & Purity %' },
          { id: 'layer3', label: 'Layer 3: Recycler Pricing Rates', icon: DollarSign, badge: 'Spot ₹ Rates' },
          { id: 'layer4', label: 'Layer 4: Valuation Engine Transactions', icon: Award, badge: 'Audited Runs' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeLayer === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-outline'} btn-sm`}
              style={{
                borderRadius: '12px',
                padding: '9px 16px',
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                padding: '2px 6px',
                borderRadius: '6px',
                fontSize: '0.72rem'
              }}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar for Layers 1, 3, 4 */}
      {activeLayer !== 'layer2' && (
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', maxWidth: '520px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={`Search ${activeLayer === 'layer1' ? 'devices, brands...' : activeLayer === 'layer3' ? 'recyclers, districts...' : 'transactions...'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '9px 12px 9px 36px',
                color: 'var(--text-primary)',
                fontSize: '0.86rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 16px', borderRadius: '10px' }}>
            Search
          </button>
        </form>
      )}

      {/* Content for Layer 1 */}
      {activeLayer === 'layer1' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 16px' }}>CONFIG ID</th>
                  <th style={{ padding: '12px 16px' }}>CATEGORY</th>
                  <th style={{ padding: '12px 16px' }}>BRAND &amp; DEVICE</th>
                  <th style={{ padding: '12px 16px' }}>WEIGHT (KG)</th>
                  <th style={{ padding: '12px 16px' }}>BATTERY &amp; SCREEN</th>
                  <th style={{ padding: '12px 16px' }}>PCB TYPE</th>
                  <th style={{ padding: '12px 16px' }}>LIFESPAN</th>
                  <th style={{ padding: '12px 16px' }}>HAZARDOUS ELEMENTS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#10B981' }}>
                      <RefreshCw size={22} className="spin" style={{ margin: '0 auto 8px' }} />
                      <span>Loading Layer 1 Device Knowledge Base...</span>
                    </td>
                  </tr>
                ) : layer1Data.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No devices found matching query.
                    </td>
                  </tr>
                ) : (
                  layer1Data.map((d) => (
                    <tr key={d.configuration_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#3B82F6' }}>{d.configuration_id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>{d.category}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{d.brand}</strong> {d.device_name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>{d.average_weight_kg || '0.18'} kg</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.78rem' }}>
                        <div>🔋 {d.battery_type || 'Li-Ion'}</div>
                        <div style={{ color: 'var(--text-muted)' }}>🖥️ {d.screen_type || 'AMOLED'}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{d.pcb_type || 'Multi-layer FR4'}</td>
                      <td style={{ padding: '12px 16px' }}>{d.expected_lifespan_years || 4} yrs</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: '600' }}>
                          {d.hazardous_elements || 'Lead trace, BFR'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content for Layer 2: Material Compositions */}
      {activeLayer === 'layer2' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 16px' }}>PROFILE ID</th>
                  <th style={{ padding: '12px 16px' }}>DEVICE CATEGORY</th>
                  <th style={{ padding: '12px 16px' }}>COPPER (CU) %</th>
                  <th style={{ padding: '12px 16px' }}>ALUMINIUM %</th>
                  <th style={{ padding: '12px 16px' }}>PLASTICS %</th>
                  <th style={{ padding: '12px 16px' }}>GOLD (AU)</th>
                  <th style={{ padding: '12px 16px' }}>SILVER (AG)</th>
                  <th style={{ padding: '12px 16px' }}>PALLADIUM</th>
                  <th style={{ padding: '12px 16px' }}>LITHIUM</th>
                  <th style={{ padding: '12px 16px' }}>RECYCLABILITY</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" style={{ padding: '40px', textAlign: 'center', color: '#10B981' }}>
                      <RefreshCw size={22} className="spin" style={{ margin: '0 auto 8px' }} />
                      <span>Loading Layer 2 Material Database...</span>
                    </td>
                  </tr>
                ) : (
                  layer2Data.map((m) => (
                    <tr key={m.material_profile_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#8B5CF6' }}>{m.material_profile_id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-primary)' }}>{m.device_category}</td>
                      <td style={{ padding: '12px 16px', color: '#EA580C', fontWeight: '700' }}>{m.copper_pct}%</td>
                      <td style={{ padding: '12px 16px' }}>{m.aluminium_pct}%</td>
                      <td style={{ padding: '12px 16px' }}>{m.plastic_pct}%</td>
                      <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '700' }}>🟡 {m.gold_grams}g</td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8', fontWeight: '700' }}>⚪ {m.silver_grams}g</td>
                      <td style={{ padding: '12px 16px', color: '#A855F7', fontWeight: '700' }}>🟣 {m.palladium_grams}g</td>
                      <td style={{ padding: '12px 16px', color: '#3B82F6', fontWeight: '700' }}>🔵 {m.lithium_grams}g</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          {m.recyclability_score_pct}% Score
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content for Layer 3: Recycler Pricing */}
      {activeLayer === 'layer3' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 16px' }}>RECYCLER ID</th>
                  <th style={{ padding: '12px 16px' }}>ORGANIZATION</th>
                  <th style={{ padding: '12px 16px' }}>LOCATION</th>
                  <th style={{ padding: '12px 16px' }}>GOLD RATE (₹/G)</th>
                  <th style={{ padding: '12px 16px' }}>COPPER (₹/KG)</th>
                  <th style={{ padding: '12px 16px' }}>SILVER (₹/G)</th>
                  <th style={{ padding: '12px 16px' }}>PCB (₹/KG)</th>
                  <th style={{ padding: '12px 16px' }}>MULTIPLIER</th>
                  <th style={{ padding: '12px 16px' }}>CPCB LICENSE</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#10B981' }}>
                      <RefreshCw size={22} className="spin" style={{ margin: '0 auto 8px' }} />
                      <span>Loading Layer 3 Recycler Organization Pricing...</span>
                    </td>
                  </tr>
                ) : (
                  layer3Data.map((rec) => (
                    <tr key={rec.recycler_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#10B981' }}>{rec.recycler_id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{rec.organization_name}</strong>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                        {rec.district}, {rec.state}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#F59E0B', fontWeight: '800' }}>₹{rec.gold_rate_inr_per_g || 7800}</td>
                      <td style={{ padding: '12px 16px', color: '#EA580C', fontWeight: '700' }}>₹{rec.copper_rate_inr_per_kg || 850}</td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8', fontWeight: '700' }}>₹{rec.silver_rate_inr_per_g || 95}</td>
                      <td style={{ padding: '12px 16px', color: '#3B82F6', fontWeight: '700' }}>₹{rec.pcb_rate_inr_per_kg || 4200}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          {rec.payout_multiplier || 1.15}x
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.75rem', fontFamily: 'monospace' }}>{rec.cpcb_license}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content for Layer 4: Valuation Engine Transactions */}
      {activeLayer === 'layer4' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 16px' }}>VALUATION ID</th>
                  <th style={{ padding: '12px 16px' }}>DEVICE ASSET</th>
                  <th style={{ padding: '12px 16px' }}>RECYCLER MATCH</th>
                  <th style={{ padding: '12px 16px' }}>GROSS RECOVERY</th>
                  <th style={{ padding: '12px 16px' }}>LOGISTICS &amp; OPS</th>
                  <th style={{ padding: '12px 16px' }}>RECYCLER MARGIN</th>
                  <th style={{ padding: '12px 16px' }}>NET DONOR PAYOUT</th>
                  <th style={{ padding: '12px 16px' }}>CO2 SAVED</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#10B981' }}>
                      <RefreshCw size={22} className="spin" style={{ margin: '0 auto 8px' }} />
                      <span>Loading Layer 4 Valuation Engine Transactions...</span>
                    </td>
                  </tr>
                ) : layer4Data.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No valuation transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  layer4Data.map((val) => (
                    <tr key={val.valuation_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#F59E0B' }}>{val.valuation_id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{val.brand}</strong> {val.device_name}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{val.organization_name}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-primary)' }}>₹{val.gross_recoverable_value_inr}</td>
                      <td style={{ padding: '12px 16px', color: '#EF4444' }}>-₹{val.operational_and_logistics_cost_inr}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>₹{val.recycler_margin_inr}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '800', color: '#10B981', fontSize: '0.95rem' }}>
                        ₹{val.net_user_payout_inr}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          <Leaf size={12} />
                          <span>{val.co2_saved_kg} kg</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
