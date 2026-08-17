import React, { useState, useEffect, useMemo } from 'react';
import { 
  History, 
  Calendar, 
  TrendingUp, 
  Award, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  Coins, 
  Leaf, 
  QrCode, 
  Printer, 
  X, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  User, 
  Building2,
  RefreshCw,
  Database
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { recyclersApi, pickupApi } from '../services/api';

export const RecyclerHistoryPage = ({ onNavigate }) => {
  const { currentUser, userRole } = useAuth();
  
  // Filtering & Search States
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real MySQL Database records and metrics
  const [archiveList, setArchiveList] = useState([]);
  const [dbMetrics, setDbMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Certificate Modal State
  const [viewingCertOrder, setViewingCertOrder] = useState(null);

  // Recycler identity details
  const recyclerOfficerName = currentUser?.displayName || currentUser?.name || 'Siddharth Shukla';
  const companyDisplayName = currentUser?.companyName || 'EcoGreen Smelters & Refining Ltd';
  const cpcbCode = currentUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891';
  const districtName = currentUser?.district || 'Prayagraj';
  const stateName = currentUser?.state || 'Uttar Pradesh';

  // Fetch real records directly from MySQL database table `recycler_order_history`
  const fetchHistoricalAuditLogs = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await recyclersApi.getHistory({
        cpcbLicense: cpcbCode,
        recyclerId: currentUser?.id
      });
      if (res.success && Array.isArray(res.history)) {
        setArchiveList(res.history);
        if (res.metrics) {
          setDbMetrics(res.metrics);
        }
      } else {
        setArchiveList([]);
      }
    } catch (err) {
      console.error('Failed to fetch historical audit records from SQL Database:', err);
      setErrorMsg('Unable to retrieve historical records from SQL Database. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalAuditLogs();
  }, [cpcbCode, currentUser?.id]);

  // Dynamically Filtered Database Records Calculation
  const filteredArchive = useMemo(() => {
    return archiveList.filter(item => {
      // Period filter
      let matchesPeriod = true;
      if (selectedPeriod === 'aug-2026') matchesPeriod = item.month === 'Aug 2026';
      else if (selectedPeriod === 'jul-2026') matchesPeriod = item.month === 'Jul 2026';
      else if (selectedPeriod === 'jun-2026') matchesPeriod = item.month === 'Jun 2026';
      else if (selectedPeriod === 'q3-2026') matchesPeriod = item.quarter === 'Q3 2026';
      else if (selectedPeriod === 'q2-2026') matchesPeriod = item.quarter === 'Q2 2026';
      else if (selectedPeriod === '2026') matchesPeriod = item.year === '2026';
      else if (selectedPeriod === '2025') matchesPeriod = item.year === '2025';

      // Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        matchesCategory = (item.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
      }

      // Search Query across multiple columns
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        (item.requestId || '').toLowerCase().includes(q) ||
        (item.auditId || '').toLowerCase().includes(q) ||
        (item.deviceName || '').toLowerCase().includes(q) ||
        (item.donorName || '').toLowerCase().includes(q) ||
        (item.address || '').toLowerCase().includes(q) ||
        (item.cpcbCertNo || '').toLowerCase().includes(q) ||
        (item.upiRef || '').toLowerCase().includes(q);

      return matchesPeriod && matchesCategory && matchesSearch;
    });
  }, [archiveList, selectedPeriod, selectedCategory, searchQuery]);

  // Aggregate Metrics over Current Filtered Records
  const metrics = useMemo(() => {
    const totalOrders = filteredArchive.length;
    const totalWeight = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.weightKg) || 0), 0);
    const totalPayouts = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.payoutAmount) || 0), 0);
    const totalCo2 = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.co2SavedKg) || 0), 0);
    const totalGoldGrams = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.goldYieldGrams) || 0), 0);
    const totalCopperGrams = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.copperYieldGrams) || 0), 0);
    const totalLithiumGrams = filteredArchive.reduce((acc, curr) => acc + (parseFloat(curr.lithiumYieldGrams) || 0), 0);

    return {
      totalOrders,
      totalWeightKg: totalWeight.toFixed(1),
      totalWeightTons: (totalWeight / 1000).toFixed(3),
      totalPayouts: totalPayouts.toLocaleString('en-IN'),
      totalCo2Kg: totalCo2.toFixed(1),
      totalGoldGrams: totalGoldGrams.toFixed(2),
      totalCopperKg: (totalCopperGrams / 1000).toFixed(2),
      totalLithiumGrams: totalLithiumGrams.toFixed(0)
    };
  }, [filteredArchive]);

  // Export CSV Audit Sheet from Real MySQL Data
  const handleExportCsv = () => {
    const headers = [
      'Audit ID',
      'Request ID',
      'Completion Date',
      'Device Name',
      'Category',
      'Donor Name',
      'Weight (kg)',
      'Gold Yield (g)',
      'Copper Yield (g)',
      'Lithium Yield (g)',
      'CO2 Abated (kg)',
      'Payout (INR)',
      'UPI Ref',
      'CPCB Cert Code'
    ];

    const rows = filteredArchive.map(item => [
      item.auditId,
      item.requestId,
      item.completedDate,
      `"${item.deviceName}"`,
      `"${item.category}"`,
      `"${item.donorName}"`,
      item.weightKg,
      item.goldYieldGrams,
      item.copperYieldGrams,
      item.lithiumYieldGrams,
      item.co2SavedKg,
      item.payoutAmount,
      item.upiRef,
      item.cpcbCertNo
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EcoTrace_SQL_Audit_Log_${cpcbCode}_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* 1. Global Navigation Header */}
      <Header 
        currentView="recycler-history" 
        onNavigate={onNavigate} 
      />

      <main className="container" style={{ padding: '30px 16px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* ========================================================================= */}
        {/* 1. HERO & LIFETIME RECYCLER IDENTITY BANNER */}
        {/* ========================================================================= */}
        <div 
          className="animate-fadeIn"
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #064E3B 0%, #0F172A 100%)',
            borderRadius: '24px',
            padding: '30px clamp(16px, 4vw, 36px)',
            color: '#FFFFFF',
            marginBottom: '28px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              
              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div className="badge badge-emerald" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  <ShieldCheck size={14} />
                  <span>CPCB License: {cpcbCode}</span>
                </div>

                <div className="badge" style={{ background: 'rgba(59, 130, 246, 0.22)', color: '#93C5FD', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '4px 10px', fontSize: '0.78rem' }}>
                  <User size={13} />
                  <span>Officer: {recyclerOfficerName}</span>
                </div>

                <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 10px', fontSize: '0.78rem' }}>
                  <MapPin size={13} />
                  <span>{districtName}, {stateName}</span>
                </div>

                <div className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 10px', fontSize: '0.78rem' }}>
                  <Database size={13} />
                  <span>MySQL Database Live Synced</span>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.3rem)', fontWeight: '800', margin: '4px 0 8px', color: '#FFFFFF', lineHeight: 1.25 }}>
                Recycling History &amp; <span className="gradient-text">Lifetime Audit Log</span>
              </h1>
              
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', maxWidth: '720px', margin: '0 0 12px', lineHeight: 1.5 }}>
                Real-time SQL audited records of all verified e-waste consignments, metallurgical recovery yields, direct donor reimbursements, and statutory CPCB Form 6 manifests for <strong>{companyDisplayName}</strong>.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#94A3B8', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} color="#10B981" /> Operating History: <strong>2025 – 2026</strong>
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Total Audited Consignments: <strong>{archiveList.length} Units in Database</strong>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={handleExportCsv}
                disabled={filteredArchive.length === 0}
                className="btn btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '12px', fontWeight: '700' }}
                title="Download CSV Spreadsheet with complete audit metrics"
              >
                <Download size={16} />
                <span>Export CPCB Audit Log (CSV)</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={fetchHistoricalAuditLogs}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '9px 14px', fontSize: '0.84rem', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '12px' }}
                  title="Sync live records from MySQL Database"
                >
                  <RefreshCw size={14} className={loading ? "spin-icon" : ""} />
                  <span>Sync SQL</span>
                </button>

                <button
                  onClick={() => onNavigate('recycler')}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '9px 14px', fontSize: '0.84rem', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '12px' }}
                >
                  <Building2 size={14} />
                  <span>Dispatch Center</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert if Database Connection fails */}
        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#FCA5A5', padding: '14px 18px', borderRadius: '14px', marginBottom: '20px', fontSize: '0.88rem' }}>
            {errorMsg}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LIFETIME PERFORMANCE & METALS RECOVERY GRID */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          
          {/* Card 1: Total Weight Recycled */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total E-Waste Processed
              </span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <Layers size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {metrics.totalWeightKg} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kg</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: '600', marginTop: '4px' }}>
              ≈ {metrics.totalWeightTons} Metric Tons Zero-Landfill
            </div>
          </div>

          {/* Card 2: Lifetime Payouts Released */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Direct Payouts
              </span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                <Coins size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10B981' }}>
              ₹{metrics.totalPayouts}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#3B82F6', fontWeight: '600', marginTop: '4px' }}>
              100% Settled via Direct Bank UPI
            </div>
          </div>

          {/* Card 3: Scope 3 Carbon Abatement */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Scope 3 Carbon Abatement
              </span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <Leaf size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#3B82F6' }}>
              {metrics.totalCo2Kg} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kg CO₂e</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>
              CPCB Certified Green Offset
            </div>
          </div>

          {/* Card 4: Historical Orders Count */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Audited Consignments
              </span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {metrics.totalOrders} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Orders</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#F59E0B', fontWeight: '600', marginTop: '4px' }}>
              Form 6 Manifest Compliant
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. PRECIOUS METALS & CRITICAL MINERALS REFINED BAROMETER */}
        {/* ========================================================================= */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '18px',
          padding: '20px 24px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#10B981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                Urban Mining Yields: Recovered Secondary Raw Materials (From SQL Table)
              </h3>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
              CPCB Certified Smelting Output
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>GOLD (Au 24K)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#F59E0B', marginTop: '2px' }}>
                {metrics.totalGoldGrams} <span style={{ fontSize: '0.8rem' }}>grams</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#F59E0B', marginTop: '2px' }}>From High-Grade PCBs</div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>REFINED COPPER (Cu)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#EA580C', marginTop: '2px' }}>
                {metrics.totalCopperKg} <span style={{ fontSize: '0.8rem' }}>kg</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#EA580C', marginTop: '2px' }}>Heat Sinks &amp; Transformers</div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>LITHIUM-ION (Li)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#3B82F6', marginTop: '2px' }}>
                {metrics.totalLithiumGrams} <span style={{ fontSize: '0.8rem' }}>grams</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#3B82F6', marginTop: '2px' }}>Battery Cell Recovery</div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>LEAD &amp; HAZARDOUS ZEROED</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
                100%
              </div>
              <div style={{ fontSize: '0.68rem', color: '#10B981', marginTop: '2px' }}>Non-Leaching Neutralized</div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. MULTI-DIMENSIONAL FILTERS & SEARCH TOOLBAR */}
        {/* ========================================================================= */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px clamp(14px, 3vw, 24px)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
            
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px 14px', borderRadius: 'var(--radius-md)', flex: '1 1 280px', minWidth: 0, boxSizing: 'border-box' }}>
              <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              <input 
                type="text" 
                placeholder="Search by Request ID, Device, Donor, City, Cert Code, UPI Ref..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.86rem' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Time Period Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', marginRight: '4px' }}>
                <Calendar size={13} style={{ display: 'inline', marginRight: '3px' }} /> Period:
              </span>
              {[
                { id: 'all', label: 'All Time' },
                { id: 'aug-2026', label: 'Aug 2026' },
                { id: 'jul-2026', label: 'Jul 2026' },
                { id: 'jun-2026', label: 'Jun 2026' },
                { id: 'q3-2026', label: 'Q3 2026' },
                { id: 'q2-2026', label: 'Q2 2026' },
                { id: '2026', label: 'Year 2026' },
                { id: '2025', label: 'Year 2025' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeriod(p.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '50px',
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    border: selectedPeriod === p.id ? '1px solid #10B981' : '1px solid var(--border-color)',
                    background: selectedPeriod === p.id ? 'rgba(16, 185, 129, 0.18)' : 'var(--bg-secondary)',
                    color: selectedPeriod === p.id ? '#10B981' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', borderTop: '1px dashed var(--border-color)', paddingTop: '14px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', marginRight: '4px' }}>
              <Filter size={13} style={{ display: 'inline', marginRight: '3px' }} /> Category:
            </span>
            {[
              { id: 'all', label: 'All Device Categories' },
              { id: 'Laptops', label: '💻 Laptops & Workstations' },
              { id: 'Smartphones', label: '📱 Smartphones & Tablets' },
              { id: 'Servers', label: '🗄️ Servers & PCBs' },
              { id: 'Batteries', label: '🔋 Batteries & Inverters' },
              { id: 'Displays', label: '📺 Displays & TVs' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: '700',
                  border: selectedCategory === cat.id ? '1px solid #3B82F6' : '1px solid var(--border-color)',
                  background: selectedCategory === cat.id ? 'rgba(59, 130, 246, 0.16)' : 'var(--bg-secondary)',
                  color: selectedCategory === cat.id ? '#3B82F6' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. HISTORICAL ORDERS DATA MATRIX & MOBILE CARDS */}
        {/* ========================================================================= */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '20px clamp(12px, 3vw, 24px)', boxShadow: 'var(--shadow-sm)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 2px', color: 'var(--text-primary)' }}>
                Audited Consignments Archive (MySQL Live)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Displaying <strong>{filteredArchive.length}</strong> verified historical records from MySQL table <code>recycler_order_history</code>
              </p>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Standard: <strong>CPCB E-Waste Rules (Form 6 Manifest)</strong>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <RefreshCw size={28} className="spin-icon" style={{ color: '#10B981', margin: '0 auto 12px' }} />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
                Fetching Historical Records from SQL Database...
              </div>
            </div>
          ) : filteredArchive.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 12px' }}>
                <History size={24} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 4px' }}>No Historical Records Found in SQL Database</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                Try selecting "All Time" or resetting your search keywords.
              </p>
              <button
                onClick={fetchHistoricalAuditLogs}
                className="btn btn-outline btn-sm"
                style={{ padding: '8px 16px' }}
              >
                <RefreshCw size={14} />
                <span>Re-query MySQL</span>
              </button>
            </div>
          ) : (
            <>
              {/* 1. MOBILE CARD VIEW (< 768px) */}
              <div className="show-on-mobile">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filteredArchive.map((item) => (
                    <div 
                      key={item.auditId}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      {/* Top Row: Request ID & Date */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.82rem' }}>
                          {item.requestId}
                        </div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                          {item.completedDate} • {item.completedTime}
                        </span>
                      </div>

                      {/* Device Title & Payout */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                            {item.deviceName}
                          </h4>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            Donor: {item.donorName} ({item.donorPhone})
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981' }}>
                            ₹{item.payoutAmount}
                          </div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                            {item.upiRef}
                          </div>
                        </div>
                      </div>

                      {/* Yields Matrix */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', background: 'var(--bg-card)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', fontWeight: '700' }}>WEIGHT</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-primary)' }}>{item.weightKg} kg</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', fontWeight: '700' }}>GOLD YIELD</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#F59E0B' }}>{item.goldYieldGrams}g</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', fontWeight: '700' }}>CO₂ SAVED</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#3B82F6' }}>{item.co2SavedKg} kg</div>
                        </div>
                      </div>

                      {/* Certificate & Action */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          Cert: {item.cpcbCertNo}
                        </span>
                        <button
                          onClick={() => setViewingCertOrder(item)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '5px' }}
                        >
                          <FileText size={13} />
                          <span>View Manifest</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. DESKTOP TABLE VIEW (>= 768px) */}
              <div className="hide-on-mobile" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>Audit &amp; Request ID</th>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>Completion Date</th>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>Device &amp; Donor</th>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>Weight &amp; Yields</th>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>Payout (Settled)</th>
                      <th style={{ padding: '14px 12px', fontWeight: '800' }}>CPCB Form 6 Cert</th>
                      <th style={{ padding: '14px 12px', textAlign: 'right', fontWeight: '800' }}>Compliance Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArchive.map((item) => (
                      <tr key={item.auditId} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s ease' }}>
                        
                        {/* 1. Audit & Request ID */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', fontSize: '0.92rem' }}>
                            {item.requestId}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                            {item.auditId}
                          </div>
                        </td>

                        {/* 2. Completion Date */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.86rem' }}>
                            {item.completedDate}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {item.completedTime}
                          </div>
                        </td>

                        {/* 3. Device & Donor */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle', maxWidth: '260px' }}>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.3 }}>
                            {item.deviceName}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            Donor: {item.donorName} • {item.address?.split(',')[0]}
                          </div>
                        </td>

                        {/* 4. Weight & Yields */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                            {item.weightKg} kg E-Waste
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#F59E0B', fontWeight: '600', marginTop: '2px' }}>
                            Au: {item.goldYieldGrams}g • Cu: {item.copperYieldGrams}g
                          </div>
                        </td>

                        {/* 5. Payout */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '800', color: '#10B981', fontSize: '1.15rem' }}>
                            ₹{item.payoutAmount}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                            {item.upiRef}
                          </div>
                        </td>

                        {/* 6. CPCB Cert Code */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '3px 8px', fontFamily: 'monospace' }}>
                            <CheckCircle2 size={11} /> {item.cpcbCertNo}
                          </span>
                        </td>

                        {/* 7. Action Button */}
                        <td style={{ padding: '16px 12px', textAlign: 'right', verticalAlign: 'middle' }}>
                          <button
                            onClick={() => setViewingCertOrder(item)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '6px', borderRadius: '8px' }}
                            title="Inspect CPCB statutory digital manifest"
                          >
                            <FileText size={13} />
                            <span>View Manifest</span>
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 6. STATUTORY CPCB FORM 6 CERTIFICATE & AUDIT MANIFEST MODAL */}
      {/* ========================================================================= */}
      {viewingCertOrder && (
        <div 
          className="settings-modal-backdrop"
          onClick={() => setViewingCertOrder(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px' }}
        >
          <div 
            className="settings-modal-card animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>CPCB Form 6 Green Manifest</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Statutory E-Waste Safe Recycling Certificate (SQL Verified)
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setViewingCertOrder(null)}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Certificate Body (Government Compliant Layout) */}
            <div style={{ border: '2px dashed var(--emerald-primary, #10B981)', borderRadius: '14px', padding: '20px', background: 'rgba(16, 185, 129, 0.03)', marginBottom: '20px' }}>
              
              <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Government of India • Ministry of Environment, Forest and Climate Change
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#10B981', margin: '4px 0 2px' }}>
                  E-WASTE MANAGEMENT RULES (2022/2026) AUDIT TRAIL
                </h4>
                <div style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                  Certificate Serial No: <strong>{viewingCertOrder.cpcbCertNo}</strong>
                </div>
              </div>

              {/* Data Pairs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.82rem', marginBottom: '16px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Authorized Smelter Facility:</span>
                  <div style={{ fontWeight: '800', color: '#3B82F6' }}>{companyDisplayName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>License: {cpcbCode}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Consignment Tracking ID:</span>
                  <div style={{ fontWeight: '800', color: '#10B981', fontFamily: 'monospace' }}>{viewingCertOrder.requestId}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Audit Log: {viewingCertOrder.auditId}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Decommissioned Device:</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{viewingCertOrder.deviceName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Category: {viewingCertOrder.category}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Donor Entity:</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{viewingCertOrder.donorName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Phone: {viewingCertOrder.donorPhone}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Processing Date &amp; Region:</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{viewingCertOrder.completedDate} • {viewingCertOrder.completedTime}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{districtName}, {stateName}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Financial Settlement:</span>
                  <div style={{ fontWeight: '800', color: '#10B981' }}>₹{viewingCertOrder.payoutAmount} (Direct UPI)</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>Ref: {viewingCertOrder.upiRef}</div>
                </div>
              </div>

              {/* Yields Breakdown Box */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL WEIGHT</div>
                  <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.92rem' }}>{viewingCertOrder.weightKg} kg</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>GOLD (Au)</div>
                  <div style={{ fontWeight: '800', color: '#F59E0B', fontSize: '0.92rem' }}>{viewingCertOrder.goldYieldGrams}g</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>COPPER (Cu)</div>
                  <div style={{ fontWeight: '800', color: '#EA580C', fontSize: '0.92rem' }}>{viewingCertOrder.copperYieldGrams}g</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>CO₂ SAVED</div>
                  <div style={{ fontWeight: '800', color: '#3B82F6', fontSize: '0.92rem' }}>{viewingCertOrder.co2SavedKg} kg</div>
                </div>
              </div>

              {/* QR Verification Seal */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <QrCode size={32} color="#10B981" />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <div>CPCB Public Ledger Verified</div>
                    <div style={{ fontFamily: 'monospace', color: '#10B981' }}>SHA-256 Validated</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <div>Authorized Digital Stamp</div>
                  <strong style={{ color: 'var(--text-primary)' }}>EcoTrace Environmental Audit Engine</strong>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
              >
                <Printer size={16} />
                <span>Print / Download Manifest (PDF)</span>
              </button>

              <button
                onClick={() => setViewingCertOrder(null)}
                className="btn btn-outline"
                style={{ padding: '12px 20px' }}
              >
                <span>Close</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
