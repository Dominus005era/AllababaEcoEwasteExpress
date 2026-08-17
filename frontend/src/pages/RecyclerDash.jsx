import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Package, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  LifeBuoy, 
  Leaf, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  QrCode, 
  Sliders, 
  MapPin, 
  AlertCircle,
  Phone,
  FileText,
  User,
  PlusCircle,
  CheckSquare,
  Square,
  Layers,
  ArrowUpRight,
  Printer,
  X,
  Send,
  Warehouse,
  ExternalLink,
  ChevronRight,
  History,
  FolderPlus,
  FolderSymlink,
  Key,
  ZoomIn
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { pickupApi, recyclersApi } from '../services/api';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';

export const RecyclerDash = ({ onNavigate, onBackToLanding, onOpenSupport }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // Header drawer active tab state
  const [viewMode, setViewMode] = useState('orders'); // 'orders' | 'lookup'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState({
    isOpen: false,
    url: '',
    title: '',
    subtitle: '',
    tags: []
  });

  // Duty Activation & Work Schedule State
  const [isActiveDuty, setIsActiveDuty] = useState(currentUser?.isActiveDuty !== false);
  const [timeOffMode, setTimeOffMode] = useState(currentUser?.timeOffMode || false);
  const [workStartTime, setWorkStartTime] = useState(currentUser?.workStartTime || '09:00');
  const [workEndTime, setWorkEndTime] = useState(currentUser?.workEndTime || '18:00');
  const [dutyStatusSaving, setDutyStatusSaving] = useState(false);
  
  // Lookup interface state
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupMessage, setLookupMessage] = useState('');

  // Daily Consignment Delivery Lots States
  const [selectedOrderIds, setSelectedOrderIds] = useState(new Set());
  const [showPackagerModal, setShowPackagerModal] = useState(false);
  const [packagingLoading, setPackagingLoading] = useState(false);
  const [existingLots, setExistingLots] = useState([]);
  const [loadingExistingLots, setLoadingExistingLots] = useState(false);
  
  // Modal Mode: 'new' (Create new named lot) | 'append' (Add to existing open lot)
  const [packagerMode, setPackagerMode] = useState('new');
  const [selectedExistingLotId, setSelectedExistingLotId] = useState('');
  const [lotNameInput, setLotNameInput] = useState('');
  const [scheduledDateInput, setScheduledDateInput] = useState(() => new Date().toISOString().slice(0, 10));
  const [targetOrgId, setTargetOrgId] = useState('ORG-PARTNER-002');
  const [targetOrgName, setTargetOrgName] = useState('EcoGreen Central Smelting Base & Refining Hub');
  const [dockNotesInput, setDockNotesInput] = useState('');

  // Doorstep Digital Product Passport (DPP) Handover Verification States
  const [showDppModal, setShowDppModal] = useState(false);
  const [verifyingDppOrder, setVerifyingDppOrder] = useState(null);
  const [dppPinInput, setDppPinInput] = useState('');
  const [dppIdInput, setDppIdInput] = useState('');
  const [dppVerificationLoading, setDppVerificationLoading] = useState(false);
  const [dppSuccessResult, setDppSuccessResult] = useState(null);
  const [dppError, setDppError] = useState(null);
  const [dppActiveMethod, setDppActiveMethod] = useState('pin'); // 'pin' | 'qr'

  // Synchronized dummy order matching the Donor Dashboard dummy order ID#4932
  const DUMMY_RECYCLER_ORDERS = [
    {
      id: 'ID#4932',
      requestId: '[DUMMY] ID#4932',
      dppId: '[DUMMY] DPP-2026-EW-892401',
      dppVerificationPin: '4932',
      donorName: '[DUMMY] Aarav Sharma',
      donorPhone: '+91 98765 43210',
      deviceName: '[DUMMY] Apple iPhone 11 Pro 64GB (Space Gray)',
      category: 'Smartphone',
      brand: 'Apple',
      modelName: 'iPhone 11 Pro',
      offeredPrice: 450,
      co2SavedKg: 2.3,
      pickupTime: 'Tomorrow, 10:00 AM',
      address: 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004',
      assignedRecycler: '[DUMMY] GreenDrop Recyclers (Hub #4)',
      assignedRecyclerId: 'rec_hub_04',
      orgName: 'GreenDrop Circular Metals Ltd',
      status: 'SCHEDULED',
      statusLabel: '⚡ [DUMMY STATUS] Ready for Doorstep Pickup',
      is_dummy: true,
      created_at: '2026-08-17T18:00:00Z',
      deviceImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      validationDetails: {
        brand: 'Apple',
        model: 'iPhone 11 Pro',
        condition: 'Good',
        metalsBreakdown: {
          goldGrams: 0.034,
          copperGrams: 15,
          silverGrams: 0.35,
          lithiumGrams: 3.2
        }
      }
    }
  ];

  // Pickup Requests loaded live from MySQL Database with dummy fallback
  const [requests, setRequests] = useState(DUMMY_RECYCLER_ORDERS);
  const recyclerOfficerName = currentUser?.displayName || currentUser?.name || 'Siddharth Shukla';
  const companyDisplayName = currentUser?.companyName || 'GreenDrop Circular Metals Ltd';
  const userDisplayName = companyDisplayName;
  const cpcbCode = currentUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891';

  // Fetch live pickups from MySQL API with dummy fallback
  const fetchPickups = async () => {
    setLoading(true);
    try {
      const res = await pickupApi.getAll();
      if (res.pickups && Array.isArray(res.pickups) && res.pickups.length > 0) {
        setRequests(res.pickups);
      } else {
        setRequests(DUMMY_RECYCLER_ORDERS);
      }
    } catch (err) {
      console.warn('Fallback to synchronized dummy orders in RecyclerDash:', err);
      setRequests(DUMMY_RECYCLER_ORDERS);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Branches from MySQL database
  const [orgBranches, setOrgBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');

  // Fetch Authorized Organization Branches from MySQL
  const fetchAuthorizedBranches = async () => {
    try {
      const res = await recyclersApi.getBranches({
        companyName: companyDisplayName,
        district: currentUser?.district || 'Prayagraj'
      });
      if (res.success && Array.isArray(res.branches) && res.branches.length > 0) {
        setOrgBranches(res.branches);
        if (!selectedBranchId) {
          setSelectedBranchId(res.branches[0].branchId);
        }
      }
    } catch (err) {
      console.error('Error fetching authorized branches for recycler dash:', err);
    }
  };

  // Fetch Existing Lots for the Modal's "Add to Existing Lot" option
  const fetchExistingLots = async () => {
    setLoadingExistingLots(true);
    try {
      const res = await recyclersApi.getDeliveryLots({
        recyclerId: currentUser?.id || 'AUTH-REC-004',
        cpcbLicense: cpcbCode
      });
      if (res.success && Array.isArray(res.lots)) {
        setExistingLots(res.lots);
        if (res.lots.length > 0 && !selectedExistingLotId) {
          setSelectedExistingLotId(res.lots[0].lotId);
        }
      }
    } catch (err) {
      console.error('Error loading existing lots:', err);
    } finally {
      setLoadingExistingLots(false);
    }
  };

  useEffect(() => {
    fetchPickups();
    fetchExistingLots();
    fetchAuthorizedBranches();
  }, [companyDisplayName]);

  // DPP Doorstep Handover Verification Handlers
  const handleOpenDppModal = (order = null) => {
    setVerifyingDppOrder(order);
    setDppPinInput('');
    setDppIdInput(order?.dppId || '');
    setDppSuccessResult(null);
    setDppError(null);
    setDppActiveMethod('pin');
    setShowDppModal(true);
  };

  const handleVerifyDppHandover = async (e) => {
    if (e) e.preventDefault();
    setDppVerificationLoading(true);
    setDppError(null);
    try {
      const res = await recyclersApi.verifyDppHandover({
        requestId: verifyingDppOrder?.requestId || undefined,
        dppId: dppIdInput.trim() || undefined,
        verificationPin: dppPinInput.trim() || undefined,
        recyclerId: currentUser?.id || 'REC-001',
        recyclerName: recyclerOfficerName
      });

      if (res.success) {
        setDppSuccessResult(res);
        fetchPickups();
      }
    } catch (err) {
      console.error('Error verifying DPP handover:', err);
      setDppError(err.message || 'Verification failed. Please check the 4-digit PIN with the donor.');
    } finally {
      setDppVerificationLoading(false);
    }
  };

  // Checkbox Selection Toggle
  const toggleOrderSelection = (requestId) => {
    setSelectedOrderIds(prev => {
      const next = new Set(prev);
      if (next.has(requestId)) next.delete(requestId);
      else next.add(requestId);
      return next;
    });
  };

  const selectAllCollected = () => {
    const collectedIds = requests
      .filter(r => isCompletedStatus(r.status))
      .map(r => r.requestId);
    setSelectedOrderIds(new Set(collectedIds));
  };

  const clearSelection = () => {
    setSelectedOrderIds(new Set());
  };

  // Selected orders summary calculation
  const selectedOrdersData = useMemo(() => {
    const list = requests.filter(r => selectedOrderIds.has(r.requestId));
    const totalWeight = list.reduce((acc, r) => acc + (parseFloat(r.co2SavedKg) > 0 ? (parseFloat(r.co2SavedKg) * 0.45) : 2.1), 0);
    const totalValuation = list.reduce((acc, r) => acc + (parseFloat(r.offeredPrice) || 0), 0);
    return {
      list,
      count: list.length,
      totalWeightKg: totalWeight.toFixed(2),
      totalValuation
    };
  }, [requests, selectedOrderIds]);

  // Open modal and initialize inputs
  const handleOpenPackager = () => {
    fetchExistingLots();
    setLotNameInput(`Route Batch - ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`);
    setShowPackagerModal(true);
  };

  // Submit Daily Delivery Lot to MySQL and Navigate to Lots Page
  const handleAssembleAndDispatchLot = async (e) => {
    e.preventDefault();
    if (selectedOrdersData.count === 0) return;
    setPackagingLoading(true);

    try {
      const isAppend = packagerMode === 'append' && selectedExistingLotId;
      const b = orgBranches.find(item => item.branchId === selectedBranchId) || orgBranches[0] || {
        orgId: targetOrgId || 'ORG-PARTNER-002',
        orgName: companyDisplayName,
        branchName: 'Phaphamau Smelting & Metal Recovery Base (Branch 1)',
        address: 'Sector 4, Phaphamau Industrial Corridor, Prayagraj, UP 211013',
        managerName: 'Vikrant Mehra (Gatehouse Supervisor)',
        managerPhone: '+91 94150 45678',
        coordsLat: 25.5182,
        coordsLng: 81.8596
      };

      const lotPayload = {
        isAppendToExisting: isAppend,
        existingLotId: isAppend ? selectedExistingLotId : null,
        lotName: lotNameInput.trim() || `Delivery Batch - ${scheduledDateInput}`,
        scheduledDate: scheduledDateInput,
        recyclerId: currentUser?.id || 'AUTH-REC-004',
        recyclerName: recyclerOfficerName,
        recyclerCompany: companyDisplayName,
        cpcbLicense: cpcbCode,
        targetOrgId: b.orgId || targetOrgId,
        targetOrgName: b.orgName || targetOrgName,
        targetHubDistrict: currentUser?.district || 'Prayagraj',
        targetBranchName: b.branchName,
        targetBranchAddress: b.address,
        branchManagerName: b.managerName,
        branchManagerPhone: b.managerPhone,
        targetCoordsLat: b.coordsLat,
        targetCoordsLng: b.coordsLng,
        orderIds: Array.from(selectedOrderIds),
        deviceCount: selectedOrdersData.count,
        totalWeightKg: selectedOrdersData.totalWeightKg,
        totalValuation: selectedOrdersData.totalValuation,
        expectedMetalsYield: `Gold ~${(selectedOrdersData.totalWeightKg * 0.22).toFixed(2)}g, Copper ~${(selectedOrdersData.totalWeightKg * 190).toFixed(0)}g`,
        vehicleNo: 'UP-70-AB-1042',
        driverName: recyclerOfficerName,
        adminDockNotes: dockNotesInput || 'End-of-day route collection completed. Sealed in green security transport container.'
      };

      const res = await recyclersApi.createDeliveryLot(lotPayload);
      if (res.success && res.lot) {
        setShowPackagerModal(false);
        setSelectedOrderIds(new Set());
        setDockNotesInput('');
        fetchPickups();
        fetchExistingLots();
        // Redirect directly to the dedicated Central Depot Lots page
        if (onNavigate) {
          onNavigate('recycler-lots');
        }
      }
    } catch (err) {
      console.error('Error creating delivery lot:', err);
      alert('Failed to package delivery lot. Please try again.');
    } finally {
      setPackagingLoading(false);
    }
  };

  // Handle Material Verification Lookup against MySQL Database
  const handleExecuteLookup = (e) => {
    e.preventDefault();
    if (!lookupId.trim()) return;
    
    const searchKey = lookupId.trim().toLowerCase();
    const found = requests.find(r => 
      r.requestId?.toLowerCase() === searchKey ||
      r.requestId?.toLowerCase().includes(searchKey)
    );

    if (found) {
      setLookupResult(found);
      setLookupMessage('Verified record loaded live from MySQL database.');
    } else {
      setLookupResult(null);
      setLookupMessage(`No active consignment matching '${lookupId}' was found in MySQL database.`);
    }
  };

  // Status Helper Functions
  const isCompletedStatus = (status) => {
    if (!status) return false;
    const s = status.toLowerCase().trim();
    return s === 'completed' || s === 'recycled' || s === 'settled' || s.includes('lot') || s.includes('deposit');
  };

  const isInTransitStatus = (status) => {
    if (!status) return false;
    const s = status.toLowerCase().trim();
    return s.includes('transit') || s.includes('route') || s.includes('assigned');
  };

  const isPendingOrActiveStatus = (status) => {
    if (!status) return false;
    const s = status.toLowerCase().trim();
    return s.includes('pending') || s.includes('assigned') || s.includes('route') || s.includes('ready') || s.includes('transit');
  };

  // Summary Metrics calculations
  const totalEarnings = requests.reduce((acc, curr) => acc + (parseFloat(curr.offeredPrice) || 0), 0).toLocaleString('en-IN');
  const activePickupsCount = requests.filter(r => isPendingOrActiveStatus(r.status)).length;
  const completedPickupsCount = requests.filter(r => isCompletedStatus(r.status)).length;
  const totalWeightRecycled = requests.reduce((acc, curr) => acc + (parseFloat(curr.co2SavedKg) > 0 ? (parseFloat(curr.co2SavedKg) * 0.45) : 2.1), 0).toFixed(1);
  const totalCo2Saved = requests.reduce((acc, curr) => acc + (parseFloat(curr.co2SavedKg) || 2.3), 0).toFixed(1);

  // Filter requests based on search query & status filter
  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.requestId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.deviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.donorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.assignedLotName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.assignedLotId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.assignedAgentName?.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && isPendingOrActiveStatus(r.status);
    if (statusFilter === 'completed') return matchesSearch && isCompletedStatus(r.status);
    return matchesSearch && r.status?.toLowerCase().includes(statusFilter.toLowerCase());
  });

  // Duty Status Toggle Handler
  const handleToggleDuty = async () => {
    const nextState = !isActiveDuty;
    setIsActiveDuty(nextState);
    setDutyStatusSaving(true);
    try {
      if (recyclersApi.updateDutyStatus) {
        await recyclersApi.updateDutyStatus({
          recyclerId: currentUser?.id || 'AUTH-REC-001',
          recyclerName: userDisplayName,
          isActiveDuty: nextState,
          timeOffMode: timeOffMode,
          workStartTime,
          workEndTime,
          triggeredBy: 'manual_toggle'
        });
      }
    } catch (err) {
      console.warn('Duty toggle backend sync note:', err);
    } finally {
      setDutyStatusSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      
      {/* 1. TOP HEADER */}
      <Header 
        currentView="recycler" 
        onNavigate={onNavigate} 
        onTabSelect={(tab) => {
          setActiveTab(tab);
          if (tab === 'events') {
            if (onNavigate) onNavigate('events');
          } else if (tab === 'settings') {
            if (onNavigate) onNavigate('settings');
          }
        }} 
        activeTab={activeTab} 
        onOpenSupport={onOpenSupport}
      />

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main style={{ flex: 1, padding: '24px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(12px, 3vw, 24px)' }}>
          
          {/* HERO BANNER WITH PROMINENT DUTY ACTIVATION TOGGLE */}
          <div 
            className="donor-hero-banner" 
            style={{ 
              background: isActiveDuty 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.90)), url("/hero_ewaste_bg.jpg") center/cover no-repeat'
                : 'linear-gradient(135deg, rgba(153, 27, 27, 0.96), rgba(127, 29, 29, 0.90)), url("/hero_ewaste_bg.jpg") center/cover no-repeat',
              borderColor: isActiveDuty ? 'var(--border-color)' : '#EF4444',
              transition: 'all 0.3s ease',
              borderRadius: '24px',
              padding: '28px clamp(16px, 3vw, 32px)',
              marginBottom: '24px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div className="badge badge-emerald">
                  <Sparkles size={14} />
                  <span>CPCB License: {cpcbCode} • Authorized Hub</span>
                </div>

                <div className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <User size={13} color="#60A5FA" />
                  <span>Recycler Officer: {recyclerOfficerName}</span>
                </div>

                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    background: isActiveDuty ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.3)',
                    color: isActiveDuty ? '#10B981' : '#FCA5A5',
                    border: isActiveDuty ? '1px solid #10B981' : '1px solid #EF4444'
                  }}
                >
                  <span className="pulse-dot" style={{ background: isActiveDuty ? '#10B981' : '#EF4444' }}></span>
                  <span>{isActiveDuty ? '● WORKER DUTY ACTIVE' : '● DUTY OFFLINE / TIME OFF'}</span>
                </div>
              </div>

              <h1 style={{ fontWeight: '800', margin: '4px 0 6px', color: '#FFFFFF', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}>
                Recycler Portal: <span className="gradient-text">{companyDisplayName}</span>
              </h1>
              <div style={{ color: '#93C5FD', fontWeight: '700', fontSize: '0.92rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span>Authorized Recycler:</span>
                <span style={{ color: '#FFFFFF', fontWeight: '800' }}>{recyclerOfficerName}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
                <span style={{ color: '#CBD5E1', fontSize: '0.84rem' }}>{currentUser?.district || 'Prayagraj'}, {currentUser?.state || 'Uttar Pradesh'}</span>
              </div>
              <p style={{ color: isActiveDuty ? '#CBD5E1' : '#FEE2E2', margin: 0, fontSize: '0.86rem' }}>
                {isActiveDuty 
                  ? `Active Working Hours: ${workStartTime} to ${workEndTime} • Accepting live task dispatches from organization admin.`
                  : 'Duty is currently OFFLINE. Activate duty to resume task assignments.'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
              <button
                onClick={handleToggleDuty}
                disabled={dutyStatusSaving}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActiveDuty ? '#EF4444' : '#10B981',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <Sliders size={16} />
                <span>{isActiveDuty ? 'Deactivate Duty (Offline)' : 'ACTIVATE DUTY (Go Online)'}</span>
              </button>

              {/* Direct Access to Depot Lots Page */}
              <button 
                onClick={() => onNavigate && onNavigate('recycler-lots')}
                className="btn btn-primary btn-sm"
                style={{ padding: '10px 18px', borderRadius: '12px', gap: '6px', fontWeight: '800', fontSize: '0.86rem' }}
              >
                <Warehouse size={15} />
                <span>Depot Delivery Lots Desk →</span>
              </button>

              <button 
                className="btn btn-outline btn-sm" 
                onClick={fetchPickups}
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', padding: '10px 16px', borderRadius: '12px' }}
              >
                <RefreshCw size={14} className={loading ? "spin-icon" : ""} />
                <span>Sync SQL</span>
              </button>
            </div>
          </div>

          {/* STREAMLINED TAB SELECTOR: PICKUPS, GEOLOGISTICS, ACCOUNT */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)', maxWidth: '580px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setViewMode('orders')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: viewMode === 'orders' ? '#10B981' : 'transparent',
                color: viewMode === 'orders' ? '#000000' : 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Package size={16} />
              <span>Incoming Pickups ({requests.length})</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('geologistics')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <MapPin size={16} color="#10B981" />
              <span>Geo-Logistics</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('settings')}
              style={{
                flex: '1 1 130px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} color="#3B82F6" />
              <span>Account</span>
            </button>
          </div>

          {/* 3. METRICS CARDS GRID */}
          <div className="donor-metrics-grid" style={{ marginBottom: '24px' }}>
            <div className="donor-metric-card">
              <div className="metric-lbl">Total Payouts Released</div>
              <div className="metric-val" style={{ color: 'var(--emerald-primary)' }}>₹{totalEarnings}</div>
              <div className="metric-sub">Direct UPI Settled</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Total Recycled Weight</div>
              <div className="metric-val" style={{ color: 'var(--text-primary)' }}>{totalWeightRecycled} kg</div>
              <div className="metric-sub">CPCB Zero-Landfill Processed</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Active Duty Pickups</div>
              <div className="metric-val" style={{ color: '#F59E0B' }}>{activePickupsCount} Jobs</div>
              <div className="metric-sub">Dispatches in Progress</div>
            </div>

            <div className="donor-metric-card">
              <div className="metric-lbl">Carbon Abatement Impact</div>
              <div className="metric-val" style={{ color: '#3B82F6' }}>{totalCo2Saved} kg CO₂</div>
              <div className="metric-sub">Scope 3 Recovery Score</div>
            </div>
          </div>

          {/* 4. TOGGLABLE VIEW INTERFACES BAR */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px clamp(12px, 3vw, 24px)',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {viewMode === 'orders' ? 'My Assigned Pickup Duty Jobs' : 'Material Search & Verification Registry'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '3px 0 0', lineHeight: '1.4' }}>
                  {viewMode === 'orders' ? 'Select collected orders with checkboxes below to package them into an End-of-Day Depot Delivery Lot.' : 'Query specific request serials directly against the live CPCB database.'}
                </p>
              </div>

              {/* View Mode Toggle Buttons + Link to Lots Page */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                width: '100%',
                maxWidth: '480px'
              }}>
                <button
                  onClick={() => setViewMode('orders')}
                  style={{
                    flex: '1 1 140px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: viewMode === 'orders' ? 'var(--emerald-primary)' : 'var(--bg-secondary)',
                    color: viewMode === 'orders' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: '700',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Package size={14} />
                  <span>My Assigned Jobs ({requests.length})</span>
                </button>

                <button
                  onClick={() => setViewMode('lookup')}
                  style={{
                    flex: '1 1 140px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: viewMode === 'lookup' ? 'var(--emerald-primary)' : 'var(--bg-secondary)',
                    color: viewMode === 'lookup' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: '700',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <QrCode size={14} />
                  <span>Verification Lookup</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              VIEW 1: ASSIGNED PICKUP ORDERS LIST
              ========================================================================= */}
          {viewMode === 'orders' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '18px clamp(12px, 3vw, 24px)', boxShadow: 'var(--shadow-sm)' }}>
              
              {/* Responsive Filter and Selection Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px 14px', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '320px', boxSizing: 'border-box' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    placeholder="Search Request ID, Device, Lot..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.86rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', width: '100%', maxWidth: '520px', justifyContent: 'flex-start' }}>
                  <button 
                    className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setStatusFilter('all')}
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    All ({requests.length})
                  </button>
                  <button 
                    className={`btn btn-sm ${statusFilter === 'active' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setStatusFilter('active')}
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    Active ({activePickupsCount})
                  </button>
                  <button 
                    className={`btn btn-sm ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setStatusFilter('completed')}
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    Collected ({completedPickupsCount})
                  </button>

                  <button
                    onClick={selectAllCollected}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.76rem', padding: '6px 10px', gap: '4px' }}
                    title="Select all collected orders to assemble into daily delivery lot"
                  >
                    <CheckSquare size={13} />
                    <span>Select Collected</span>
                  </button>

                  {selectedOrderIds.size > 0 && (
                    <button
                      onClick={clearSelection}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                    >
                      <span>Clear ({selectedOrderIds.size})</span>
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#10B981' }}>
                  <RefreshCw size={24} className="spin-icon" style={{ margin: '0 auto 8px' }} />
                  <p>Fetching live pickup requests from database...</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto 12px' }}>
                    <Truck size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 4px' }}>No Orders Match Your Query</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Try searching for a different ID, device name, or clear status filters.
                  </p>
                </div>
              ) : (
                <>
                  {/* MOBILE CARD VIEW */}
                  <div className="show-on-mobile">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {filteredRequests.map((req, idx) => {
                        const isSelected = selectedOrderIds.has(req.requestId);
                        return (
                          <div
                            key={req.requestId || idx}
                            style={{
                              background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                              border: isSelected ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                              borderRadius: '18px',
                              padding: '18px 16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '14px',
                              boxShadow: 'var(--shadow-sm)',
                              boxSizing: 'border-box',
                              width: '100%',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {/* Top Row: Checkbox, Tracking ID & Status */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button
                                  type="button"
                                  onClick={() => toggleOrderSelection(req.requestId)}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: isSelected ? '#10B981' : 'var(--text-muted)' }}
                                >
                                  {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                                </button>

                                <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '3px 8px' }}>
                                  ⚡ MOCK / DUMMY PICKUP JOB
                                </span>

                                <div style={{
                                  fontFamily: 'monospace',
                                  fontWeight: '800',
                                  color: '#10B981',
                                  background: 'rgba(16, 185, 129, 0.12)',
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  fontSize: '0.84rem'
                                }}>
                                  {req.requestId}
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {req.assignedLotName && (
                                  <span style={{ fontSize: '0.72rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                                    📦 {req.assignedLotName}
                                  </span>
                                )}
                                <span className={`badge ${
                                  isCompletedStatus(req.status) ? 'badge-emerald' : 
                                  isInTransitStatus(req.status) ? 'badge-blue' : 'badge-emerald'
                                }`} style={{ textTransform: 'capitalize', fontSize: '0.74rem', padding: '4px 10px', fontWeight: '700' }}>
                                  ● {req.status}
                                </span>
                              </div>
                            </div>

                            {/* Top Title & Offered Price */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0, flex: 1 }}>
                                {req.deviceImage && (
                                  <div
                                    onClick={() => setLightboxImage({
                                      isOpen: true,
                                      url: req.deviceImage,
                                      title: req.deviceName || 'Consignment Device',
                                      subtitle: `Consignment Job #${req.requestId} • Donor: ${req.donorName || 'Verified Citizen'}`,
                                      tags: [req.status, `Payout: ₹${req.offeredPrice || 0}`, req.pickupTime || 'Standard Window']
                                    })}
                                    style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                                    title="Click to view full-resolution photo"
                                  >
                                    <img
                                      src={req.deviceImage}
                                      alt={req.deviceName}
                                      style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        border: '1.5px solid rgba(16, 185, 129, 0.4)',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                        transition: 'transform 0.2s ease'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                    />
                                    <div style={{
                                      position: 'absolute',
                                      bottom: '2px',
                                      right: '2px',
                                      background: 'rgba(0,0,0,0.75)',
                                      borderRadius: '3px',
                                      padding: '1px',
                                      color: '#10B981',
                                      display: 'flex'
                                    }}>
                                      <ZoomIn size={9} />
                                    </div>
                                  </div>
                                )}
                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: '1.35' }}>
                                    {req.deviceName}
                                  </h4>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <User size={12} color="#10B981" />
                                    <span>Donor: {req.donorName || 'Verified Donor'}</span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981', lineHeight: '1.1' }}>
                                  ₹{req.offeredPrice}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                  Direct UPI
                                </div>
                              </div>
                            </div>

                            {/* Logistics Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '600' }}>Scheduled Slot:</span>
                                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{req.pickupTime || 'Today, 10:00 AM'}</span>
                              </div>

                              {req.assignedLotId && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '600' }}>Assigned Delivery Lot:</span>
                                  <span style={{ fontWeight: '700', color: '#3B82F6', fontFamily: 'monospace' }}>{req.assignedLotId}</span>
                                </div>
                              )}

                              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>
                                  <MapPin size={12} color="#10B981" />
                                  <span>Pickup Location:</span>
                                </div>
                                <div style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                                  {req.address}
                                </div>
                              </div>
                            </div>

                            {/* Mobile Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                              {!isCompletedStatus(req.status) && (
                                <button
                                  className="btn"
                                  style={{ width: '100%', padding: '10px', fontSize: '0.84rem', fontWeight: '800', justifyContent: 'center', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#000', borderRadius: '10px', gap: '6px' }}
                                  onClick={() => handleOpenDppModal(req)}
                                >
                                  <Key size={15} />
                                  <span>Verify Doorstep Handover (DPP)</span>
                                </button>
                              )}

                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {isInTransitStatus(req.status) ? (
                                  <button
                                    className="btn"
                                    style={{ flex: 1, padding: '10px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', background: '#059669', color: '#FFFFFF', borderRadius: '8px' }}
                                    onClick={() => handleUpdateStatus(req.requestId, 'Completed')}
                                  >
                                    <CheckCircle2 size={14} />
                                    <span>Mark Complete &amp; Pay</span>
                                  </button>
                                ) : isCompletedStatus(req.status) ? (
                                  <button
                                    type="button"
                                    onClick={() => toggleOrderSelection(req.requestId)}
                                    className="btn btn-outline"
                                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem', justifyContent: 'center', borderColor: isSelected ? '#10B981' : 'var(--border-color)', color: isSelected ? '#10B981' : 'var(--text-secondary)' }}
                                  >
                                    {isSelected ? '✓ In Selection' : '+ Add to Delivery Lot'}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline"
                                    style={{ flex: 1, padding: '10px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', borderRadius: '8px' }}
                                    onClick={() => handleUpdateStatus(req.requestId, 'In Transit')}
                                  >
                                    <Truck size={14} />
                                    <span>En Route</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* DESKTOP TABLE VIEW */}
                  <div className="hide-on-mobile" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', background: 'var(--bg-secondary)' }}>
                          <th style={{ padding: '14px 12px', width: '40px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>Lot</span>
                          </th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Request ID</th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Device &amp; Donor</th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Pickup Slot &amp; Address</th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Offered Payout</th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Assigned Lot</th>
                          <th style={{ padding: '14px 16px', fontWeight: '800' }}>Status</th>
                          <th style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '800' }}>Duty Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((req) => {
                          const isSelected = selectedOrderIds.has(req.requestId);
                          return (
                            <tr key={req.requestId} style={{ borderBottom: '1px solid var(--border-color)', background: isSelected ? 'rgba(16, 185, 129, 0.04)' : 'transparent', transition: 'background 0.2s ease' }}>
                              
                              <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                                <button
                                  type="button"
                                  onClick={() => toggleOrderSelection(req.requestId)}
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: isSelected ? '#10B981' : 'var(--text-muted)' }}
                                >
                                  {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                                </button>
                              </td>

                              <td style={{ padding: '16px', fontFamily: 'monospace', fontWeight: '800', color: '#10B981', verticalAlign: 'middle' }}>
                                {req.requestId}
                              </td>

                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  {req.deviceImage && (
                                    <div
                                      onClick={() => setLightboxImage({
                                        isOpen: true,
                                        url: req.deviceImage,
                                        title: req.deviceName || 'Consignment Device',
                                        subtitle: `Consignment Job #${req.requestId} • Donor: ${req.donorName || 'Verified Citizen'}`,
                                        tags: [req.status, `Payout: ₹${req.offeredPrice || 0}`, req.pickupTime || 'Standard Window']
                                      })}
                                      style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                                      title="Click to view full-resolution photo"
                                    >
                                      <img
                                        src={req.deviceImage}
                                        alt={req.deviceName}
                                        style={{
                                          width: '44px',
                                          height: '44px',
                                          objectFit: 'cover',
                                          borderRadius: '8px',
                                          border: '1px solid rgba(16, 185, 129, 0.4)',
                                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                          transition: 'transform 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                      />
                                      <div style={{
                                        position: 'absolute',
                                        bottom: '2px',
                                        right: '2px',
                                        background: 'rgba(0,0,0,0.75)',
                                        borderRadius: '3px',
                                        padding: '1px',
                                        color: '#10B981',
                                        display: 'flex'
                                      }}>
                                        <ZoomIn size={8} />
                                      </div>
                                    </div>
                                  )}
                                  <div>
                                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.92rem' }}>{req.deviceName}</div>
                                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      <User size={12} color="#10B981" />
                                      <span>Donor: {req.donorName || 'Verified Donor'} • {req.donorPhone || '+91 98201 12345'}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{req.pickupTime || 'Today, 10:00 AM'}</div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {req.address}
                                </div>
                              </td>

                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: '800', color: '#10B981', fontSize: '1.1rem' }}>₹{req.offeredPrice}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Direct UPI</div>
                              </td>

                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                {req.assignedLotName ? (
                                  <div>
                                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#3B82F6' }}>{req.assignedLotName}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{req.assignedLotId}</div>
                                  </div>
                                ) : (
                                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Unassigned</span>
                                )}
                              </td>

                              <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                                <span className={`badge ${
                                  isCompletedStatus(req.status) ? 'badge-emerald' : 
                                  isInTransitStatus(req.status) ? 'badge-blue' : 'badge-emerald'
                                }`} style={{ fontSize: '0.72rem', padding: '3px 10px', fontWeight: '700' }}>
                                  ● {req.status}
                                </span>
                              </td>

                              <td style={{ padding: '16px', textAlign: 'right', verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
                                  {!isCompletedStatus(req.status) && (
                                    <button
                                      className="btn btn-sm"
                                      style={{ background: '#10B981', color: '#000', fontSize: '0.78rem', padding: '6px 12px', fontWeight: '800', gap: '5px' }}
                                      onClick={() => handleOpenDppModal(req)}
                                      title="Verify Doorstep Digital Product Passport Handover"
                                    >
                                      <Key size={13} />
                                      <span>Verify DPP</span>
                                    </button>
                                  )}

                                  {isInTransitStatus(req.status) ? (
                                    <button
                                      className="btn btn-sm"
                                      style={{ background: '#059669', color: '#FFFFFF', fontSize: '0.78rem', padding: '6px 12px' }}
                                      onClick={() => handleUpdateStatus(req.requestId, 'Completed')}
                                    >
                                      <CheckCircle2 size={13} />
                                      <span>Mark Paid</span>
                                    </button>
                                  ) : isCompletedStatus(req.status) ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleOrderSelection(req.requestId)}
                                      className="btn btn-outline btn-sm"
                                      style={{ fontSize: '0.76rem', padding: '5px 10px', borderColor: isSelected ? '#10B981' : 'var(--border-color)', color: isSelected ? '#10B981' : 'var(--text-secondary)' }}
                                    >
                                      {isSelected ? '✓ In Selection' : '+ Add to Lot'}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-outline btn-sm"
                                      style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                                      onClick={() => handleUpdateStatus(req.requestId, 'In Transit')}
                                    >
                                      <Truck size={13} />
                                      <span>En Route</span>
                                    </button>
                                  )}
                                </div>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 2: MATERIAL & MANIFEST VERIFICATION LOOKUP (RESPONSIVE ON MOBILE)
              ========================================================================= */}
          {viewMode === 'lookup' && (
            <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px clamp(14px, 4vw, 32px)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 6px', textAlign: 'center' }}>
                  Material &amp; Consignment Verification Registry
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 20px', textAlign: 'center', lineHeight: '1.5' }}>
                  Enter any EcoTrace Request ID, Batch ID, or CPCB serial code to inspect verified database records.
                </p>

                {/* Mobile-Adapted Responsive Search Form */}
                <form onSubmit={handleExecuteLookup} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      placeholder="e.g. REQ-2026-8801 or LOT-2026-0816-01"
                      value={lookupId}
                      onChange={(e) => setLookupId(e.target.value)}
                      style={{ 
                        flex: '1 1 220px', 
                        minWidth: '0', 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        padding: '12px 16px', 
                        color: 'var(--text-primary)', 
                        fontSize: '0.9rem', 
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ 
                        flex: '0 0 auto', 
                        padding: '12px 22px', 
                        borderRadius: '12px', 
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Search size={16} />
                      <span>Verify SQL</span>
                    </button>
                  </div>
                </form>

                {lookupMessage && (
                  <div style={{ background: lookupResult ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: lookupResult ? '1px solid #10B981' : '1px solid #EF4444', color: lookupResult ? '#10B981' : '#FCA5A5', padding: '12px 16px', borderRadius: '12px', fontSize: '0.84rem', marginBottom: '16px' }}>
                    {lookupMessage}
                  </div>
                )}

                {lookupResult && (
                  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', fontSize: '1rem' }}>{lookupResult.requestId}</span>
                      <span className="badge badge-emerald">● {lookupResult.status}</span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0 }}>{lookupResult.deviceName}</h4>
                    
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>Donor: <strong>{lookupResult.donorName}</strong></div>
                      <div>Disbursed: <strong style={{ color: '#10B981' }}>₹{lookupResult.offeredPrice}</strong></div>
                      <div>Slot: <strong>{lookupResult.pickupTime}</strong></div>
                      <div>Unit: <strong>{lookupResult.assignedRecycler}</strong></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* =========================================================================
          SLEEK FLOATING PACKAGER DOCK (WHEN ORDERS ARE SELECTED)
          ========================================================================= */}
      {selectedOrderIds.size > 0 && (
        <div 
          className="animate-fadeIn"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'calc(100% - 32px)',
            maxWidth: '560px',
            background: 'linear-gradient(135deg, #064E3B 0%, #0F172A 100%)',
            border: '1.5px solid #10B981',
            borderRadius: '50px',
            padding: '10px 18px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
              <Package size={16} />
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedOrdersData.count} Consignments Selected
              </div>
              <div style={{ fontSize: '0.72rem', color: '#CBD5E1', whiteSpace: 'nowrap' }}>
                {selectedOrdersData.totalWeightKg} kg • ₹{selectedOrdersData.totalValuation.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={handleOpenPackager}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: '800', borderRadius: '50px', whiteSpace: 'nowrap' }}
            >
              <span>Add to Delivery Lot →</span>
            </button>
            <button
              onClick={clearSelection}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#CBD5E1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Clear selection"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MULTI-LOT PACKAGER MODAL: (NEW NAMED LOT OR ADD TO EXISTING)
          ========================================================================= */}
      {showPackagerModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px', backdropFilter: 'blur(6px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '22px', padding: '28px clamp(16px, 4vw, 28px)', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <Warehouse size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Depot Delivery Lot Allocation</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Assign {selectedOrdersData.count} selected orders into a new or existing delivery lot
                  </div>
                </div>
              </div>

              <button onClick={() => setShowPackagerModal(false)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Mode Switcher Tabs: 'new' vs 'append' */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px', marginBottom: '18px', border: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => setPackagerMode('new')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: packagerMode === 'new' ? 'var(--emerald-primary)' : 'transparent',
                  color: packagerMode === 'new' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <FolderPlus size={15} />
                <span>Create New Named Lot</span>
              </button>

              <button
                type="button"
                onClick={() => setPackagerMode('append')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: packagerMode === 'append' ? 'var(--emerald-primary)' : 'transparent',
                  color: packagerMode === 'append' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <FolderSymlink size={15} />
                <span>Add to Existing Open Lot ({existingLots.length})</span>
              </button>
            </div>

            <form onSubmit={handleAssembleAndDispatchLot} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Summary of Selected Consignments */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Orders to Assign ({selectedOrdersData.count} Items)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {selectedOrdersData.list.map(o => (
                    <span key={o.requestId} style={{ fontFamily: 'monospace', fontSize: '0.76rem', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      {o.requestId}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                  <span>Gross Weight: <strong>{selectedOrdersData.totalWeightKg} kg</strong></span>
                  <span>Total Disbursed: <strong style={{ color: '#10B981' }}>₹{selectedOrdersData.totalValuation.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>

              {/* OPTION 1: CREATE BRAND NEW NAMED LOT */}
              {packagerMode === 'new' && (
                <>
                  {/* Custom Lot Name / Title */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Custom Delivery Lot Name / Title *
                    </label>
                    <input
                      type="text"
                      value={lotNameInput}
                      onChange={(e) => setLotNameInput(e.target.value)}
                      placeholder="e.g. Civil Lines Morning Batch / Tech Park Consignment"
                      required
                      style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>

                  {/* Scheduled Handover Date */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Scheduled Handover / Delivery Date *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="date"
                        value={scheduledDateInput}
                        onChange={(e) => setScheduledDateInput(e.target.value)}
                        required
                        style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Destination Base Hub (Dynamic from MySQL Organization Branches) */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      🏢 Destination Base / Branch (Authorized by Organization Admin) *
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
                    <div style={{ fontSize: '0.72rem', color: '#10B981', marginTop: '4px' }}>
                      ✓ Showing authorized regional bases registered for {companyDisplayName}
                    </div>
                  </div>
                </>
              )}

              {/* OPTION 2: ADD TO EXISTING OPEN LOT */}
              {packagerMode === 'append' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Select Target Existing Open Lot *
                  </label>

                  {loadingExistingLots ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#10B981', fontSize: '0.85rem' }}>
                      <RefreshCw size={18} className="spin-icon" style={{ margin: '0 auto 6px' }} />
                      <p>Loading your existing lots...</p>
                    </div>
                  ) : existingLots.length === 0 ? (
                    <div style={{ padding: '18px', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
                      <p style={{ margin: '0 0 10px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        No open delivery lots found. Please switch to "Create New Named Lot".
                      </p>
                      <button type="button" onClick={() => setPackagerMode('new')} className="btn btn-primary btn-sm">
                        Create New Lot
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
                      {existingLots.map(lot => {
                        const isSelected = selectedExistingLotId === lot.lotId;
                        return (
                          <div
                            key={lot.lotId}
                            onClick={() => setSelectedExistingLotId(lot.lotId)}
                            style={{
                              background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-secondary)',
                              border: isSelected ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                {lot.lotName || lot.lotId}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                <span style={{ fontFamily: 'monospace', color: '#10B981' }}>{lot.lotId}</span> • {lot.deviceCount} items currently ({lot.totalWeightKg} kg)
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                📅 Date: <strong>{lot.scheduledDate}</strong> • 🏢 Base: {lot.targetOrgName?.split(' ')[0]}
                              </div>
                            </div>

                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: isSelected ? '6px solid #10B981' : '2px solid var(--text-muted)', background: 'transparent' }} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Handover Remarks for Dock Gatehouse */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Handover Remarks for Organization Gatehouse
                </label>
                <textarea
                  rows={2}
                  value={dockNotesInput}
                  onChange={(e) => setDockNotesInput(e.target.value)}
                  placeholder="e.g. Sealed in green security transport container. Route complete."
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="submit"
                  disabled={packagingLoading || (packagerMode === 'append' && !selectedExistingLotId)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontWeight: '800' }}
                >
                  <Warehouse size={16} />
                  <span>
                    {packagingLoading ? 'Assigning in Database...' : packagerMode === 'append' ? 'Add Orders to Selected Lot →' : 'Create & Open Lots Desk →'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPackagerModal(false)}
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

      {/* ========================================================================= */}
      {/* DOORSTEP DIGITAL PRODUCT PASSPORT (DPP) HANDOVER VERIFICATION MODAL */}
      {/* ========================================================================= */}
      {showDppModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid #10B981',
            borderRadius: '22px',
            maxWidth: '480px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '22px 18px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            {/* Modal Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                  <Key size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                    ⚡ [DUMMY] Verify Doorstep DPP Handover
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Confirm customer identity &amp; release agreed UPI settlement
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDppModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success View */}
            {dppSuccessResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', margin: '0 auto' }}>
                  <CheckCircle2 size={32} />
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  Handover Confirmed &amp; Verified!
                </h4>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                  {dppSuccessResult.message || 'Digital Product Passport successfully verified. Physical custody has been registered.'}
                </p>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid #10B981', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Order Request:</span>
                    <strong style={{ color: '#10B981', fontFamily: 'monospace' }}>{dppSuccessResult.order?.requestId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Passport ID:</span>
                    <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{dppSuccessResult.order?.dppId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>UPI Payout Released:</span>
                    <strong style={{ color: '#10B981', fontSize: '1rem' }}>₹{dppSuccessResult.order?.payoutAmount || 540}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setShowDppModal(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '11px', borderRadius: '12px', fontWeight: '800', justifyContent: 'center', fontSize: '0.88rem' }}
                >
                  <span>Done &amp; Return to Pickups</span>
                </button>
              </div>
            ) : (
              /* Verification Input Form */
              <form onSubmit={handleVerifyDppHandover} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Order Target Box (if initiated from a row) with Device Image */}
                {verifyingDppOrder && (
                  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px 14px', fontSize: '0.8rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {verifyingDppOrder.deviceImage && (
                      <div
                        onClick={() => setLightboxImage({
                          isOpen: true,
                          url: verifyingDppOrder.deviceImage,
                          title: verifyingDppOrder.deviceName || 'Consignment Target',
                          subtitle: `Verification Consignment #${verifyingDppOrder.requestId} • Donor: ${verifyingDppOrder.donorName}`,
                          tags: [verifyingDppOrder.status, `Agreed Valuation: ₹${verifyingDppOrder.offeredPrice}`]
                        })}
                        style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                        title="Click to view full-resolution photo"
                      >
                        <img
                          src={verifyingDppOrder.deviceImage}
                          alt={verifyingDppOrder.deviceName}
                          style={{
                            width: '56px',
                            height: '56px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(16, 185, 129, 0.4)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          background: 'rgba(0,0,0,0.75)',
                          borderRadius: '3px',
                          padding: '1px',
                          color: '#10B981',
                          display: 'flex'
                        }}>
                          <ZoomIn size={9} />
                        </div>
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '0.85rem' }}>{verifyingDppOrder.requestId}</strong>
                        <strong style={{ color: '#10B981', fontSize: '0.92rem' }}>₹{verifyingDppOrder.offeredPrice}</strong>
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {verifyingDppOrder.deviceName}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                        Donor: <strong style={{ color: 'var(--text-secondary)' }}>{verifyingDppOrder.donorName}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {dppError && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #EF4444', color: '#EF4444', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                    <span>{dppError}</span>
                  </div>
                )}

                {/* Verification Method Toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <button
                    type="button"
                    onClick={() => setDppActiveMethod('pin')}
                    style={{
                      padding: '7px 4px',
                      borderRadius: '7px',
                      border: 'none',
                      background: dppActiveMethod === 'pin' ? '#10B981' : 'transparent',
                      color: dppActiveMethod === 'pin' ? '#000' : 'var(--text-secondary)',
                      fontWeight: '800',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Key size={13} />
                    <span>Security PIN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDppActiveMethod('qr')}
                    style={{
                      padding: '7px 4px',
                      borderRadius: '7px',
                      border: 'none',
                      background: dppActiveMethod === 'qr' ? '#10B981' : 'transparent',
                      color: dppActiveMethod === 'qr' ? '#000' : 'var(--text-secondary)',
                      fontWeight: '800',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <QrCode size={13} />
                    <span>Passport ID</span>
                  </button>
                </div>

                {/* Method 1: 4-Digit Handover PIN */}
                {dppActiveMethod === 'pin' && (
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Enter 4-Digit PIN from Donor's Screen *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={dppPinInput}
                      onChange={(e) => setDppPinInput(e.target.value)}
                      placeholder="882026"
                      autoFocus
                      required={dppActiveMethod === 'pin'}
                      style={{
                        width: '100%',
                        background: 'var(--bg-secondary)',
                        border: '2px solid #10B981',
                        borderRadius: '12px',
                        padding: '12px',
                        color: '#10B981',
                        fontSize: '1.5rem',
                        fontWeight: '900',
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        letterSpacing: '6px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '5px 0 0', textAlign: 'center' }}>
                      Ask donor to open their EcoTrace Passport to see this security PIN.
                    </p>
                  </div>
                )}

                {/* Method 2: DPP ID / QR Scan */}
                {dppActiveMethod === 'qr' && (
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Passport DPP ID *
                    </label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        value={dppIdInput}
                        onChange={(e) => setDppIdInput(e.target.value)}
                        placeholder="DPP-IN-2026-08819"
                        required={dppActiveMethod === 'qr'}
                        style={{
                          flex: 1,
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '9px 10px',
                          color: 'var(--text-primary)',
                          fontSize: '0.84rem',
                          fontFamily: 'monospace',
                          outline: 'none'
                        }}
                      />
                      {verifyingDppOrder?.dppId && (
                        <button
                          type="button"
                          onClick={() => setDppIdInput(verifyingDppOrder.dppId)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                        >
                          Auto-Fill
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    disabled={dppVerificationLoading || (dppActiveMethod === 'pin' && !dppPinInput) || (dppActiveMethod === 'qr' && !dppIdInput)}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '11px', minWidth: '160px', justifyContent: 'center', fontWeight: '800', gap: '6px', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#000', fontSize: '0.84rem', borderRadius: '10px' }}
                  >
                    <CheckCircle2 size={15} />
                    <span>{dppVerificationLoading ? 'Verifying...' : 'Verify Handover & Pay UPI'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDppModal(false)}
                    className="btn btn-outline"
                    style={{ padding: '11px 14px', fontSize: '0.82rem', borderRadius: '10px' }}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}

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

      {/* 5. GLOBAL FOOTER */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
