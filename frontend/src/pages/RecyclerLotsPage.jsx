import React, { useState, useEffect } from 'react';
import { 
  Warehouse, 
  Package, 
  QrCode, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Printer, 
  X, 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Scale, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  User,
  Sliders,
  CheckSquare,
  PlusCircle,
  FolderPlus,
  Navigation,
  MapPin,
  Phone,
  Settings,
  Edit3,
  Trash2,
  Info
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { recyclersApi } from '../services/api';

export const RecyclerLotsPage = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'cleared'
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingLotPass, setViewingLotPass] = useState(null);

  // Dynamic Branches from MySQL database
  const [orgBranches, setOrgBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // New Lot Modal on Lots Page
  const [showCreateLotModal, setShowCreateLotModal] = useState(false);
  const [newLotName, setNewLotName] = useState('');
  const [newScheduledDate, setNewScheduledDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [newDockNotes, setNewDockNotes] = useState('');
  const [creatingLotLoading, setCreatingLotLoading] = useState(false);

  // Edit Lot / Settings Modal
  const [editingLot, setEditingLot] = useState(null);
  const [editLotName, setEditLotName] = useState('');
  const [editScheduledDate, setEditScheduledDate] = useState('');
  const [editBranchId, setEditBranchId] = useState('');
  const [editCustomAddress, setEditCustomAddress] = useState('');
  const [editManagerName, setEditManagerName] = useState('');
  const [editManagerPhone, setEditManagerPhone] = useState('');
  const [editDockNotes, setEditDockNotes] = useState('');
  const [editOrderIds, setEditOrderIds] = useState([]);
  const [savingEditLoading, setSavingEditLoading] = useState(false);

  const recyclerOfficerName = currentUser?.displayName || currentUser?.name || 'Siddharth Shukla';
  const companyDisplayName = currentUser?.companyName || 'EcoGreen Smelters & Refining Ltd';
  const cpcbCode = currentUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891';
  const recyclerDistrict = currentUser?.district || 'Prayagraj';

  // 1. Fetch Dynamic Branches from MySQL belonging to this Recycler's Organization
  const fetchAuthorizedBranches = async () => {
    setLoadingBranches(true);
    try {
      const res = await recyclersApi.getBranches({
        companyName: companyDisplayName,
        district: recyclerDistrict
      });
      if (res.success && Array.isArray(res.branches) && res.branches.length > 0) {
        setOrgBranches(res.branches);
        if (!selectedBranchId) {
          setSelectedBranchId(res.branches[0].branchId);
        }
      } else {
        setOrgBranches([]);
      }
    } catch (err) {
      console.error('Error fetching authorized branches from database:', err);
      setOrgBranches([]);
    } finally {
      setLoadingBranches(false);
    }
  };

  // 2. Fetch Delivery Lots live from MySQL API
  const fetchLots = async () => {
    setLoading(true);
    try {
      const res = await recyclersApi.getDeliveryLots({
        recyclerId: currentUser?.id || 'AUTH-REC-004',
        cpcbLicense: cpcbCode
      });
      if (res.success && Array.isArray(res.lots)) {
        setLots(res.lots);
      } else {
        setLots([]);
      }
    } catch (err) {
      console.error('Error fetching delivery lots from MySQL:', err);
      setLots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
    fetchAuthorizedBranches();
  }, [cpcbCode, companyDisplayName, recyclerDistrict]);

  // Derived Metrics
  const totalLotsCount = lots.length;
  const clearedLotsCount = lots.filter(l => l.status === 'received_and_cleared').length;
  const pendingLotsCount = lots.filter(l => l.status !== 'received_and_cleared').length;
  const totalWeightDelivered = lots.reduce((acc, l) => acc + (parseFloat(l.totalWeightKg) || 0), 0).toFixed(1);
  const totalDevicesDeposited = lots.reduce((acc, l) => acc + (parseInt(l.deviceCount) || 0), 0);
  const totalDisbursedValuation = lots.reduce((acc, l) => acc + (parseFloat(l.totalValuation) || 0), 0).toLocaleString('en-IN');

  // Open Edit Modal for a specific Lot
  const handleOpenEditModal = (lot) => {
    setEditingLot(lot);
    setEditLotName(lot.lotName || lot.lotId);
    setEditScheduledDate(lot.scheduledDate || new Date().toISOString().slice(0, 10));
    
    // Find matching branch from database branches or custom
    const matchedBranch = orgBranches.find(b => 
      b.branchName === lot.targetBranchName || b.address === lot.targetBranchAddress || b.branchId === lot.targetBranchId
    );

    if (matchedBranch) {
      setEditBranchId(matchedBranch.branchId);
      setEditCustomAddress(matchedBranch.address);
      setEditManagerName(matchedBranch.managerName);
      setEditManagerPhone(matchedBranch.managerPhone);
    } else if (orgBranches.length > 0) {
      setEditBranchId(orgBranches[0].branchId);
      setEditCustomAddress(orgBranches[0].address);
      setEditManagerName(orgBranches[0].managerName);
      setEditManagerPhone(orgBranches[0].managerPhone);
    } else {
      setEditBranchId('custom');
      setEditCustomAddress(lot.targetBranchAddress || '');
      setEditManagerName(lot.branchManagerName || 'Vikrant Mehra');
      setEditManagerPhone(lot.branchManagerPhone || '+91 94150 45678');
    }

    setEditDockNotes(lot.adminDockNotes || '');
    setEditOrderIds(Array.isArray(lot.orderIds) ? [...lot.orderIds] : []);
  };

  // Branch Selection in Edit Modal
  const handleEditBranchChange = (branchId) => {
    setEditBranchId(branchId);
    if (branchId !== 'custom') {
      const b = orgBranches.find(item => item.branchId === branchId);
      if (b) {
        setEditCustomAddress(b.address);
        setEditManagerName(b.managerName);
        setEditManagerPhone(b.managerPhone);
      }
    }
  };

  // Submit Lot Edit to MySQL
  const handleSaveLotEdit = async (e) => {
    e.preventDefault();
    if (!editingLot) return;
    setSavingEditLoading(true);

    try {
      const selectedBranch = orgBranches.find(b => b.branchId === editBranchId);
      const branchName = selectedBranch ? selectedBranch.branchName : (editingLot.targetBranchName || 'Custom Branch Base');
      const branchAddress = editCustomAddress || (selectedBranch ? selectedBranch.address : editingLot.targetBranchAddress);
      const managerName = editManagerName || (selectedBranch ? selectedBranch.managerName : 'Gatehouse Supervisor');
      const managerPhone = editManagerPhone || (selectedBranch ? selectedBranch.managerPhone : '+91 94150 45678');
      const coordsLat = selectedBranch ? selectedBranch.coordsLat : (editingLot.targetCoordsLat || 25.5182);
      const coordsLng = selectedBranch ? selectedBranch.coordsLng : (editingLot.targetCoordsLng || 81.8596);
      const orgName = selectedBranch ? selectedBranch.orgName : (editingLot.targetOrgName || companyDisplayName);
      const orgId = selectedBranch ? selectedBranch.orgId : (editingLot.targetOrgId || 'ORG-PARTNER-002');

      const payload = {
        lotName: editLotName.trim() || editingLot.lotId,
        scheduledDate: editScheduledDate,
        targetOrgId: orgId,
        targetOrgName: orgName,
        targetBranchName: branchName,
        targetBranchAddress: branchAddress,
        branchManagerName: managerName,
        branchManagerPhone: managerPhone,
        targetCoordsLat: coordsLat,
        targetCoordsLng: coordsLng,
        orderIds: editOrderIds,
        adminDockNotes: editDockNotes
      };

      const res = await recyclersApi.updateDeliveryLot(editingLot.lotId, payload);
      if (res.success) {
        setEditingLot(null);
        fetchLots();
      }
    } catch (err) {
      console.error('Error saving lot edits:', err);
      alert('Failed to update lot details. Please try again.');
    } finally {
      setSavingEditLoading(false);
    }
  };

  // Remove an order from the edit lot list
  const handleRemoveOrderFromEdit = (reqId) => {
    setEditOrderIds(prev => prev.filter(id => id !== reqId));
  };

  // Direct Track Navigation to GeoLogistics
  const handleTrackLotRoute = (lot) => {
    if (onNavigate) {
      onNavigate('geologistics', lot);
    }
  };

  // Direct New Lot Shell Creation
  const handleCreateLotDirectly = async (e) => {
    e.preventDefault();
    setCreatingLotLoading(true);
    try {
      const b = orgBranches.find(item => item.branchId === selectedBranchId) || orgBranches[0] || {
        orgId: 'ORG-PARTNER-002',
        orgName: companyDisplayName,
        branchName: 'Phaphamau Smelting & Metal Recovery Base (Branch 1)',
        address: 'Sector 4, Phaphamau Industrial Corridor, Prayagraj, UP 211013',
        managerName: 'Vikrant Mehra (Gatehouse Supervisor)',
        managerPhone: '+91 94150 45678',
        coordsLat: 25.5182,
        coordsLng: 81.8596
      };

      const payload = {
        lotName: newLotName.trim() || `Delivery Lot - ${newScheduledDate}`,
        scheduledDate: newScheduledDate,
        recyclerId: currentUser?.id || 'AUTH-REC-004',
        recyclerName: recyclerOfficerName,
        recyclerCompany: companyDisplayName,
        cpcbLicense: cpcbCode,
        targetOrgId: b.orgId,
        targetOrgName: b.orgName,
        targetHubDistrict: recyclerDistrict,
        targetBranchName: b.branchName,
        targetBranchAddress: b.address,
        branchManagerName: b.managerName,
        branchManagerPhone: b.managerPhone,
        targetCoordsLat: b.coordsLat,
        targetCoordsLng: b.coordsLng,
        orderIds: [],
        deviceCount: 0,
        totalWeightKg: 0,
        totalValuation: 0,
        vehicleNo: 'UP-70-AB-1042',
        driverName: recyclerOfficerName,
        adminDockNotes: newDockNotes || 'Delivery lot initialized. Open for order allocation from dashboard.'
      };

      const res = await recyclersApi.createDeliveryLot(payload);
      if (res.success && res.lot) {
        setShowCreateLotModal(false);
        setNewLotName('');
        setNewDockNotes('');
        fetchLots();
      }
    } catch (err) {
      console.error('Error creating lot:', err);
      alert('Failed to initialize delivery lot. Please try again.');
    } finally {
      setCreatingLotLoading(false);
    }
  };

  // Filter & Search Lots
  const filteredLots = lots.filter(lot => {
    const matchesSearch = 
      lot.lotId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.lotName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.targetOrgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.targetBranchName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.targetBranchAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.scheduledDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.handoverPassCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(lot.orderIds) ? lot.orderIds.join(' ') : lot.orderIds || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'cleared') return matchesSearch && lot.status === 'received_and_cleared';
    if (filterStatus === 'pending') return matchesSearch && lot.status !== 'received_and_cleared';
    return matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* 1. Header */}
      <Header currentView="recycler" onNavigate={onNavigate} />

      {/* 2. Main Container */}
      <main style={{ flex: 1, padding: '24px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(12px, 3vw, 24px)' }}>
          
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.84rem' }}>
            <button 
              onClick={() => onNavigate && onNavigate('recycler')}
              style={{ background: 'transparent', border: 'none', color: 'var(--emerald-primary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
            >
              <ArrowLeft size={15} />
              <span>Back to Assigned Jobs</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Central Depot Delivery Lots</span>
          </div>

          {/* Hero Banner */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #064E3B 0%, #0F172A 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '24px',
              padding: '28px clamp(16px, 4vw, 32px)',
              color: '#FFFFFF',
              marginBottom: '24px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span className="badge badge-emerald">
                  <ShieldCheck size={14} />
                  <span>CPCB Form-3 Multi-Branch Gatehouse Desk</span>
                </span>
                <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.22)', color: '#93C5FD', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                  Unit: {companyDisplayName}
                </span>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#6EE7B7' }}>
                  {orgBranches.length} Authorized Bases in {recyclerDistrict}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: '800', margin: '4px 0 8px', color: '#FFFFFF' }}>
                Central Depot Delivery Lots &amp; Gate Passes
              </h1>
              
              <p style={{ color: '#CBD5E1', fontSize: '0.88rem', maxWidth: '760px', margin: 0, lineHeight: '1.5' }}>
                Deliver consignments to ANY organization branch or base added by your organization admin. Use mini-settings (⚙️) to reassign destination branch and track EV van GPS route in real time.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setNewLotName(`Route Lot - ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`);
                  setShowCreateLotModal(true);
                }}
                className="btn btn-primary"
                style={{ padding: '10px 18px', borderRadius: '12px', gap: '6px', fontWeight: '800', fontSize: '0.86rem' }}
              >
                <PlusCircle size={15} />
                <span>+ Create Named Lot</span>
              </button>

              <button
                onClick={() => { fetchLots(); fetchAuthorizedBranches(); }}
                className="btn btn-outline"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '10px 16px', borderRadius: '12px' }}
              >
                <RefreshCw size={14} className={loading || loadingBranches ? "spin-icon" : ""} />
                <span>Sync SQL</span>
              </button>
            </div>
          </div>

          {/* 3. Summary Metric Cards Grid */}
          <div className="donor-metrics-grid" style={{ marginBottom: '24px' }}>
            <div className="donor-metric-card">
              <div className="metric-lbl">Total Created Lots</div>
              <div className="metric-val" style={{ color: 'var(--emerald-primary)' }}>{totalLotsCount} Batches</div>
              <div className="metric-sub">{clearedLotsCount} Cleared • {pendingLotsCount} Inbound</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Gross Weight Delivered</div>
              <div className="metric-val" style={{ color: 'var(--text-primary)' }}>{totalWeightDelivered} kg</div>
              <div className="metric-sub">Dock Scale Ingested</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Constituent Devices</div>
              <div className="metric-val" style={{ color: '#3B82F6' }}>{totalDevicesDeposited} Units</div>
              <div className="metric-sub">Certified Doorstep Recycled</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Consolidated Valuation</div>
              <div className="metric-val" style={{ color: '#F59E0B' }}>₹{totalDisbursedValuation}</div>
              <div className="metric-sub">Total Disbursed Payouts</div>
            </div>
          </div>

          {/* 4. Controls Bar: Search & Status Filters */}
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px clamp(12px, 3vw, 20px)',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px 14px', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '340px', boxSizing: 'border-box' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search Lot Name, Branch, Base..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.86rem' }}
              />
            </div>

            {/* Status Filter Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '420px', justifyContent: 'flex-start' }}>
              <button 
                className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('all')}
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                All Lots ({lots.length})
              </button>
              <button 
                className={`btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('pending')}
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Awaiting Dock ({pendingLotsCount})
              </button>
              <button 
                className={`btn btn-sm ${filterStatus === 'cleared' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilterStatus('cleared')}
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Cleared ({clearedLotsCount})
              </button>
            </div>
          </div>

          {/* 5. Lots Listing Container */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#10B981' }}>
              <RefreshCw size={28} className="spin-icon" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Loading delivery lots from SQL database...</p>
            </div>
          ) : filteredLots.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px dashed var(--border-color)' }}>
              <Warehouse size={40} color="#10B981" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 6px' }}>No Delivery Lots Found</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                {searchQuery ? 'No batches match your query. Try clearing your search filter.' : 'You have not assembled any delivery lots yet. Go to your Assigned Jobs, select collected orders, and package them into a named Delivery Lot.'}
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('recycler')}
                className="btn btn-primary btn-sm"
                style={{ padding: '10px 20px', borderRadius: '10px', fontWeight: '700' }}
              >
                Go to Assigned Jobs →
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '20px' }}>
              {filteredLots.map((lot) => {
                const isCleared = lot.status === 'received_and_cleared';
                return (
                  <div
                    key={lot.lotId}
                    className="animate-fadeIn"
                    style={{
                      background: 'var(--bg-card)',
                      border: isCleared ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                      borderRadius: '20px',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div>
                      {/* Top Row: Lot ID, Status & Mini Setting Icon */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.84rem' }}>
                            {lot.lotId}
                          </div>
                          
                          <span className={`badge ${isCleared ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.72rem', padding: '4px 8px', fontWeight: '700' }}>
                            {isCleared ? '✓ Cleared' : '🕒 Awaiting Dock'}
                          </span>
                        </div>

                        {/* MINI SETTING ICON TO EDIT LOT DETAILS & DESTINATION BASE */}
                        <button
                          onClick={() => handleOpenEditModal(lot)}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            transition: 'all 0.2s ease'
                          }}
                          title="Edit Lot Name, Handover Date, Destination Branch Base or Orders"
                        >
                          <Settings size={14} color="#10B981" />
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Custom Lot Name */}
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 4px', lineHeight: '1.3' }}>
                        {lot.lotName || 'End-of-Day Depot Batch'}
                      </h3>

                      {/* Dedicated Destination Branch Base Badge */}
                      <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '10px', padding: '8px 12px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#60A5FA', fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>
                          <Building2 size={13} />
                          <span>Destination Delivery Base / Branch:</span>
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                          {lot.targetBranchName || lot.targetOrgName}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          📍 {lot.targetBranchAddress || 'Sector 4, Phaphamau Industrial Corridor, Prayagraj'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#93C5FD', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>👤 Supervisor: <strong>{lot.branchManagerName || 'Vikrant Mehra'}</strong></span>
                          <span>•</span>
                          <span>📞 <strong>{lot.branchManagerPhone || '+91 94150 45678'}</strong></span>
                        </div>
                      </div>

                      {/* Scheduled Date Info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '0.78rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '6px' }}>
                          <Calendar size={13} />
                          <span>Handover: {lot.scheduledDate}</span>
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>• Org: {lot.targetOrgName}</span>
                      </div>

                      {/* Telemetry Stats Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'var(--bg-secondary)', padding: '12px 10px', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center', marginBottom: '14px' }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Items</div>
                          <div style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)' }}>{lot.deviceCount} Units</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Weight</div>
                          <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#10B981' }}>{lot.totalWeightKg} kg</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Valuation</div>
                          <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3B82F6' }}>₹{lot.totalValuation?.toLocaleString('en-IN')}</div>
                        </div>
                      </div>

                      {/* Constituent Request Serials */}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Constituent Orders ({Array.isArray(lot.orderIds) ? lot.orderIds.length : 0}): </span>
                        <span style={{ fontFamily: 'monospace', color: '#10B981', wordBreak: 'break-all' }}>
                          {Array.isArray(lot.orderIds) && lot.orderIds.length > 0 ? lot.orderIds.join(', ') : 'No orders assigned yet'}
                        </span>
                      </div>

                      {/* Dock Notes */}
                      {lot.adminDockNotes && (
                        <div style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.75rem', color: '#93C5FD', lineHeight: '1.4' }}>
                          <strong>Dock Note:</strong> {lot.adminDockNotes}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions: TRACK ROUTE BUTTON & GATE PASS BUTTON */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      {/* GeoLogistics Track Route Button */}
                      <button
                        onClick={() => handleTrackLotRoute(lot)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '7px 12px', fontSize: '0.78rem', gap: '5px', borderRadius: '10px', borderColor: '#3B82F6', color: '#60A5FA' }}
                      >
                        <Navigation size={13} color="#3B82F6" />
                        <span>Track Route (GPS)</span>
                      </button>

                      {/* Gate Pass Modal Button */}
                      <button
                        onClick={() => setViewingLotPass(lot)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '6px', borderRadius: '10px' }}
                      >
                        <QrCode size={14} />
                        <span>Gate Pass (QR)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {/* =========================================================================
          MODAL 1: EDIT LOT SETTINGS & REASSIGN DESTINATION BRANCH BASE (MINI-SETTING)
          ========================================================================= */}
      {editingLot && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px', backdropFilter: 'blur(6px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '22px', padding: '26px clamp(16px, 4vw, 28px)', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <Settings size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800' }}>Edit Delivery Lot Settings</h3>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{editingLot.lotId}</div>
                </div>
              </div>

              <button onClick={() => setEditingLot(null)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={15} />
              </button>
            </div>

            {/* Dynamic Branch Notification */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Info size={16} flexShrink={0} />
              <span>Displaying authorized regional branches registered in MySQL for <strong>{companyDisplayName}</strong>.</span>
            </div>

            <form onSubmit={handleSaveLotEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Lot Name */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                  Delivery Lot Name / Title *
                </label>
                <input
                  type="text"
                  value={editLotName}
                  onChange={(e) => setEditLotName(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              {/* Scheduled Date */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                  Scheduled Handover Date *
                </label>
                <input
                  type="date"
                  value={editScheduledDate}
                  onChange={(e) => setEditScheduledDate(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              {/* Reassign Destination Branch Base (Dynamic from DB) */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                  🏢 Target Organization Branch / Base (Live from MySQL) *
                </label>
                <select
                  value={editBranchId}
                  onChange={(e) => handleEditBranchChange(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.86rem', outline: 'none', marginBottom: '8px' }}
                >
                  {orgBranches.map(b => (
                    <option key={b.branchId} value={b.branchId}>
                      {b.branchName} ({b.district})
                    </option>
                  ))}
                  <option value="custom">Custom Location / Special Gate Base...</option>
                </select>
              </div>

              {/* Branch In-Charge & Address Details (Auto-populated from DB) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Branch In-Charge / Supervisor
                  </label>
                  <input
                    type="text"
                    value={editManagerName}
                    onChange={(e) => setEditManagerName(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    In-Charge Contact Phone
                  </label>
                  <input
                    type="text"
                    value={editManagerPhone}
                    onChange={(e) => setEditManagerPhone(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Branch Physical Address
                </label>
                <input
                  type="text"
                  value={editCustomAddress}
                  onChange={(e) => setEditCustomAddress(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none' }}
                />
              </div>

              {/* Constituent Orders Manager */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Constituent Orders in Lot ({editOrderIds.length} items)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', background: 'var(--bg-secondary)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', maxHeight: '110px', overflowY: 'auto' }}>
                  {editOrderIds.length === 0 ? (
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>No orders currently in this lot.</span>
                  ) : (
                    editOrderIds.map(id => (
                      <span key={id} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontFamily: 'monospace', fontWeight: '700' }}>
                        <span>{id}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveOrderFromEdit(id)}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                          title="Remove from lot"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                  Gatehouse Notes &amp; Handover Instructions
                </label>
                <textarea
                  rows={2}
                  value={editDockNotes}
                  onChange={(e) => setEditDockNotes(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '8px 10px', color: 'var(--text-primary)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="submit"
                  disabled={savingEditLoading}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '11px', justifyContent: 'center', fontWeight: '800' }}
                >
                  <span>{savingEditLoading ? 'Saving...' : 'Save Lot Changes'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingLot(null)}
                  className="btn btn-outline"
                  style={{ padding: '11px 18px' }}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: CREATE NEW NAMED DELIVERY LOT MODAL (LIVE FROM MYSQL BRANCHES)
          ========================================================================= */}
      {showCreateLotModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px', backdropFilter: 'blur(6px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '22px', padding: '28px clamp(16px, 4vw, 28px)', maxWidth: '560px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <FolderPlus size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Create New Named Delivery Lot</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Unit: {companyDisplayName}
                  </div>
                </div>
              </div>

              <button onClick={() => setShowCreateLotModal(false)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateLotDirectly} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Custom Delivery Lot Name / Title *
                </label>
                <input
                  type="text"
                  value={newLotName}
                  onChange={(e) => setNewLotName(e.target.value)}
                  placeholder="e.g. Civil Lines Heavy E-Waste Batch"
                  required
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Scheduled Handover / Delivery Date *
                </label>
                <input
                  type="date"
                  value={newScheduledDate}
                  onChange={(e) => setNewScheduledDate(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              {/* Dynamic Organization Branch Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Destination Base / Branch (Registered by Organization Admin) *
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
                >
                  {orgBranches.map(b => (
                    <option key={b.branchId} value={b.branchId}>
                      {b.branchName} — In-charge: {b.managerName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Handover Remarks for Gatehouse Scale Inspector
                </label>
                <textarea
                  rows={2}
                  value={newDockNotes}
                  onChange={(e) => setNewDockNotes(e.target.value)}
                  placeholder="e.g. Scheduled for delivery tomorrow afternoon. Clean and sorted."
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="submit"
                  disabled={creatingLotLoading}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontWeight: '800' }}
                >
                  <FolderPlus size={16} />
                  <span>{creatingLotLoading ? 'Initializing...' : 'Create & Register Lot'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCreateLotModal(false)}
                  className="btn btn-outline"
                  style={{ padding: '12px 18px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: DIGITAL GATE PASS & QR MANIFEST MODAL (PRINTABLE FOR DOCK GATEHOUSE)
          ========================================================================= */}
      {viewingLotPass && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px', backdropFilter: 'blur(8px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px clamp(16px, 4vw, 32px)', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <QrCode size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Depot Inbound Gate Pass</h3>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Organization Central Base Intake Permit</div>
                </div>
              </div>

              <button onClick={() => setViewingLotPass(null)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Printable Pass Body */}
            <div style={{ border: '2px dashed #10B981', borderRadius: '18px', padding: '22px 18px', background: 'rgba(16, 185, 129, 0.03)', textAlign: 'center', marginBottom: '20px' }}>
              
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EcoTrace Certified Logistics Gatehouse Manifest
              </div>
              
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#10B981', margin: '4px 0 2px', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                {viewingLotPass.handoverPassCode}
              </div>
              
              <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0 2px' }}>
                {viewingLotPass.lotName || viewingLotPass.lotId}
              </div>

              <div style={{ fontSize: '0.76rem', color: '#3B82F6', fontWeight: '700', marginBottom: '14px' }}>
                🏢 Base: {viewingLotPass.targetBranchName || viewingLotPass.targetOrgName}
              </div>

              {/* Centered QR Graphic */}
              <div style={{ width: '140px', height: '140px', background: '#FFFFFF', borderRadius: '16px', padding: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.18)' }}>
                <QrCode size={116} color="#064E3B" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'left', fontSize: '0.8rem', background: 'var(--bg-card)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Destination Base / Branch:</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{viewingLotPass.targetBranchName || viewingLotPass.targetOrgName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Recycler Unit:</span>
                  <div style={{ fontWeight: '700', color: '#3B82F6', marginTop: '2px' }}>{companyDisplayName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Total Gross Weight:</span>
                  <div style={{ fontWeight: '800', color: '#10B981', marginTop: '2px' }}>{viewingLotPass.totalWeightKg} kg</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Item Count:</span>
                  <div style={{ fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{viewingLotPass.deviceCount} Devices</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => window.print()} 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: 'center', padding: '12px', fontWeight: '800', gap: '8px' }}
              >
                <Printer size={16} />
                <span>Print Gate Pass</span>
              </button>
              <button 
                onClick={() => setViewingLotPass(null)} 
                className="btn btn-outline" 
                style={{ padding: '12px 20px' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
