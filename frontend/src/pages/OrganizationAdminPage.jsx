import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Layers, 
  Truck, 
  Cpu, 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Award, 
  Zap, 
  Calendar, 
  MapPin, 
  Scale, 
  Globe, 
  ChevronRight,
  X,
  Warehouse,
  ClipboardCheck,
  Eye,
  CheckSquare,
  QrCode,
  Key,
  UserCheck,
  PlusCircle,
  Edit3
} from 'lucide-react';
import { partnersApi } from '../services/api';
import { OrgAdminHeader } from '../components/organizationAdmin/OrgAdminHeader';
import { OrgAdminSidebar } from '../components/organizationAdmin/OrgAdminSidebar';
import { OrgAdminPickupAllocationsView } from '../components/organizationAdmin/OrgAdminPickupAllocationsView';
import { OrgAdminDepotIntakeView } from '../components/organizationAdmin/OrgAdminDepotIntakeView';
import { OrgAdminBranchesView } from '../components/organizationAdmin/OrgAdminBranchesView';
import { OrgAdminFieldSupervisionView } from '../components/organizationAdmin/OrgAdminFieldSupervisionView';
import { OrgAdminBatchesView } from '../components/organizationAdmin/OrgAdminBatchesView';
import { OrgAdminMetalsTelemetryView } from '../components/organizationAdmin/OrgAdminMetalsTelemetryView';
import { OrgAdminCorporateClientsView } from '../components/organizationAdmin/OrgAdminCorporateClientsView';
import { OrgAdminLogisticsView } from '../components/organizationAdmin/OrgAdminLogisticsView';
import { OrgAdminProfileView } from '../components/organizationAdmin/OrgAdminProfileView';
import { OrgAdminAllocateWorkerModal } from '../components/organizationAdmin/OrgAdminAllocateWorkerModal';
import { OrgAdminVerifyIntakeModal } from '../components/organizationAdmin/OrgAdminVerifyIntakeModal';
import { OrgAdminBranchModal } from '../components/organizationAdmin/OrgAdminBranchModal';
import { OrgAdminForm2Modal } from '../components/organizationAdmin/OrgAdminForm2Modal';

export const DUMMY_ORG_REQUESTS = [
  {
    id: 'ID#4932',
    requestId: '[DUMMY] ID#4932',
    dppId: '[DUMMY] DPP-2026-EW-892401',
    dppStatus: 'allocated',
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
    district: 'Prayagraj',
    status: 'SCHEDULED',
    statusLabel: '⚡ [DUMMY STATUS] Approved & Assigned to Recycler',
    assignedRecycler: '[DUMMY] GreenDrop Recyclers (Hub #4)',
    assignedRecyclerId: 'rec_hub_04',
    allocatedRecyclerName: '[DUMMY] GreenDrop Recyclers (Hub #4)',
    assignedAgentName: 'Rajesh Kumar (EV Pilot)',
    assignedAgentPhone: '+91 98765 43210',
    assignedAgentVehicle: 'UP-70-EC-8842 (Electric Van)',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98765 43210',
    driverVehicle: 'UP-70-EC-8842 (Electric Van)',
    orgName: 'GreenDrop Circular Metals Ltd',
    is_approved: true,
    is_dummy: true,
    createdAt: '2026-08-17T18:00:00Z',
    deviceImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
  }
];

export const DUMMY_WORKFORCE_RECYCLERS = [
  {
    id: 'rec_pilot_01',
    name: '[DUMMY] Rajesh Kumar (EV Fleet Pilot #1)',
    companyName: 'GreenDrop Circular Metals Ltd (Hub #4)',
    officerName: 'Rajesh Kumar (Pilot)',
    cpcbLicense: 'CPCB-UP-2026-REC-0891/V1',
    phone: '+91 98765 43210',
    district: 'Prayagraj (Zone A - MNNIT/Teliarganj)',
    activeVehicles: 'UP-70-EC-8842 (Electric Van)',
    assignedVehicle: 'UP-70-EC-8842',
    operationalPhase: 'En Route to ID#4932',
    totalAssignedPickups: 6,
    collectedCount: 4,
    completedLotsCount: 1,
    status: 'ACTIVE',
    rating: 4.9
  },
  {
    id: 'rec_pilot_02',
    name: '[DUMMY] Amit Verma (EV Fleet Pilot #2)',
    companyName: 'GreenDrop Circular Metals Ltd (Hub #4)',
    officerName: 'Amit Verma (Pilot)',
    cpcbLicense: 'CPCB-UP-2026-REC-0891/V2',
    phone: '+91 98111 22233',
    district: 'Prayagraj (Zone B - Civil Lines/Naini)',
    activeVehicles: 'UP-70-EC-1090 (Electric Van)',
    assignedVehicle: 'UP-70-EC-1090',
    operationalPhase: 'Patrolling Zone B',
    totalAssignedPickups: 4,
    collectedCount: 3,
    completedLotsCount: 1,
    status: 'ACTIVE',
    rating: 4.8
  },
  {
    id: 'rec_pilot_03',
    name: '[DUMMY] Vikram Singh (EV Fleet Pilot #3)',
    companyName: 'GreenDrop Circular Metals Ltd (Hub #4)',
    officerName: 'Vikram Singh (Pilot)',
    cpcbLicense: 'CPCB-UP-2026-REC-0891/V3',
    phone: '+91 98222 33344',
    district: 'Prayagraj (Zone C - Jhalwa/IIIT Area)',
    activeVehicles: 'UP-70-EC-3319 (Electric Van)',
    assignedVehicle: 'UP-70-EC-3319',
    operationalPhase: 'Depot Unloading (Gate 1)',
    totalAssignedPickups: 5,
    collectedCount: 5,
    completedLotsCount: 2,
    status: 'ACTIVE',
    rating: 4.9
  }
];

export const DUMMY_ORG_USER = {
  id: 'ORG-GREENDROP-04',
  name: 'GreenDrop Circular Metals Ltd',
  organizationName: 'GreenDrop Circular Metals Ltd (Hub #4)',
  companyName: 'GreenDrop Circular Metals Ltd',
  email: 'admin@greendropmetals.org',
  district: 'Prayagraj',
  city: 'Prayagraj',
  state: 'Uttar Pradesh',
  country: 'India',
  cpcbLicense: 'CPCB-UP-2026-REC-0891',
  role: 'org-admin'
};

export const OrganizationAdminPage = ({ onNavigate }) => {
  // 1. Authentication State (Strictly Ephemeral Session)
  const [orgToken, setOrgToken] = useState(sessionStorage.getItem('ecotrace_org_token') || null);
  const [orgUser, setOrgUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ecotrace_org_user');
      return saved ? JSON.parse(saved) : DUMMY_ORG_USER;
    } catch {
      return DUMMY_ORG_USER;
    }
  });

  // Login Form States (NO credentials hardcoded in inputs)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginOrgId, setLoginOrgId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('pickup-allocations');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dashboard Data States
  const [loadingData, setLoadingData] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Depot Inbound Intake & Verification States
  const [intakeLots, setIntakeLots] = useState([]);
  const [loadingIntake, setLoadingIntake] = useState(false);
  const [verifyingLot, setVerifyingLot] = useState(null);
  const [verifiedWeightInput, setVerifiedWeightInput] = useState('');
  const [dockNotesInput, setDockNotesInput] = useState('');
  const [verifyingLoading, setVerifyingLoading] = useState(false);

  // Field Recyclers Monitor States
  const [fieldRecyclers, setFieldRecyclers] = useState(DUMMY_WORKFORCE_RECYCLERS);
  const [loadingRecyclers, setLoadingRecyclers] = useState(false);

  // Organization Branches & Depot Bases States
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [savingBranchLoading, setSavingBranchLoading] = useState(false);
  const [branchForm, setBranchForm] = useState({
    branchName: '',
    branchCode: '',
    district: 'Prayagraj',
    address: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    gatehouseDockNo: 'Gate 1 / Inbound Scale',
    operatingHours: '08:00 AM - 20:00 PM',
    coordsLat: '25.5182',
    coordsLng: '81.8596'
  });

  // Certificate Modal State
  const [activeCertModal, setActiveCertModal] = useState(null);

  // Inbound Donor Pickup Requests & Workforce Allocation States
  const [incomingRequests, setIncomingRequests] = useState(DUMMY_ORG_REQUESTS);
  const [loadingIncomingRequests, setLoadingIncomingRequests] = useState(false);
  const [workforceRecyclers, setWorkforceRecyclers] = useState(DUMMY_WORKFORCE_RECYCLERS);
  const [allocatingRequest, setAllocatingRequest] = useState(null);
  const [selectedRecyclerId, setSelectedRecyclerId] = useState('rec_hub_04');
  const [agentVehicleInput, setAgentVehicleInput] = useState('UP-70-EC-8842');
  const [agentPhoneInput, setAgentPhoneInput] = useState('+91 98765 43210');
  const [allocatingLoading, setAllocatingLoading] = useState(false);
  const [allocatedSuccessDpp, setAllocatedSuccessDpp] = useState(null);

  // Batch Status Update State
  const [updatingBatchId, setUpdatingBatchId] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  // Load Organization Dashboard Data
  const loadDashboardData = async () => {
    if (!orgToken) return;
    setLoadingData(true);
    try {
      const data = await partnersApi.getDashboard();
      if (data && data.success) {
        setDashboardData(data);
        if (data.organization) {
          setOrgUser(data.organization);
          sessionStorage.setItem('ecotrace_org_user', JSON.stringify(data.organization));
          localStorage.removeItem('ecotrace_org_user');
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, maintaining prototype org telemetry:', err.message);
    } finally {
      setLoadingData(false);
    }
  };

  // Load Inbound Depot Lots
  const loadDepotIntakeLots = async () => {
    if (!orgToken) return;
    setLoadingIntake(true);
    try {
      const res = await partnersApi.getDepotIntake();
      if (res.success && Array.isArray(res.lots)) {
        setIntakeLots(res.lots);
      }
    } catch (err) {
      console.warn('Using dummy depot intake lots:', err.message);
    } finally {
      setLoadingIntake(false);
    }
  };

  // Load Field Recyclers Monitor
  const loadFieldRecyclersMonitor = async () => {
    if (!orgToken) return;
    setLoadingRecyclers(true);
    try {
      const res = await partnersApi.getFieldRecyclersMonitor();
      if (res.success && Array.isArray(res.fieldRecyclers)) {
        setFieldRecyclers(res.fieldRecyclers);
      }
    } catch (err) {
      console.warn('Using dummy field recyclers:', err.message);
    } finally {
      setLoadingRecyclers(false);
    }
  };

  // Load Branches
  const loadBranches = async () => {
    if (!orgToken) return;
    setLoadingBranches(true);
    try {
      const res = await partnersApi.getBranches();
      if (res.success && Array.isArray(res.branches)) {
        setBranches(res.branches);
      }
    } catch (err) {
      console.warn('Using dummy branches:', err.message);
    } finally {
      setLoadingBranches(false);
    }
  };

  // Load Incoming Requests & Workforce
  const loadIncomingRequests = async () => {
    if (!orgToken) return;
    setLoadingIncomingRequests(true);
    try {
      const [reqRes, recRes] = await Promise.all([
        partnersApi.getIncomingPickupRequests(),
        partnersApi.getWorkforceRecyclers()
      ]);
      if (reqRes && reqRes.success && Array.isArray(reqRes.requests)) {
        setIncomingRequests(reqRes.requests);
      }
      if (recRes && recRes.success && Array.isArray(recRes.recyclers)) {
        setWorkforceRecyclers(recRes.recyclers);
        if (recRes.recyclers.length > 0 && !selectedRecyclerId) {
          setSelectedRecyclerId(recRes.recyclers[0].id);
        }
      }
    } catch (err) {
      console.warn('Using dummy incoming requests & workforce:', err.message);
    } finally {
      setLoadingIncomingRequests(false);
    }
  };

  // Sync All Data
  const handleSyncAll = async () => {
    await Promise.allSettled([
      loadDashboardData(),
      loadDepotIntakeLots(),
      loadFieldRecyclersMonitor(),
      loadBranches(),
      loadIncomingRequests()
    ]);
  };

  useEffect(() => {
    if (orgToken) {
      handleSyncAll();
    }
  }, [orgToken]);

  // Login Handler (Direct Prototype Access Mode)
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      if (loginEmail.trim() && loginOrgId.trim() && loginPassword.trim()) {
        const res = await partnersApi.login(loginEmail.trim(), loginOrgId.trim(), loginPassword.trim());
        if (res.token) {
          setOrgToken(res.token);
          setOrgUser(res.user);
          sessionStorage.setItem('ecotrace_org_token', res.token);
          sessionStorage.setItem('ecotrace_org_user', JSON.stringify(res.user));
          localStorage.removeItem('ecotrace_org_token');
          localStorage.removeItem('ecotrace_org_user');
          setLoginLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using direct prototype Org Admin login:', err.message);
    }

    // Direct prototype fallback - any entries take directly to dashboard
    const mockOrgUser = {
      id: loginOrgId.trim() || 'ORG-AUTH-001',
      name: 'GreenDrop Circular Metals Ltd',
      companyName: 'GreenDrop Circular Metals Ltd',
      email: loginEmail.trim() || 'admin@greendropmetals.org',
      district: 'Prayagraj',
      state: 'Uttar Pradesh',
      country: 'India',
      cpcbLicense: 'CPCB-UP-2026-ORG-0081',
      role: 'org-admin'
    };
    setOrgToken('mock-org-token');
    setOrgUser(mockOrgUser);
    sessionStorage.setItem('ecotrace_org_token', 'mock-org-token');
    sessionStorage.setItem('ecotrace_org_user', JSON.stringify(mockOrgUser));
    localStorage.removeItem('ecotrace_org_token');
    localStorage.removeItem('ecotrace_org_user');
    setLoginLoading(false);
  };

  // Sign out
  const handleSignOut = () => {
    sessionStorage.removeItem('ecotrace_org_token');
    sessionStorage.removeItem('ecotrace_org_user');
    localStorage.removeItem('ecotrace_org_token');
    localStorage.removeItem('ecotrace_org_user');
    setOrgToken(null);
    setOrgUser(null);
    onNavigate('partner');
  };

  // Branch handlers
  const handleOpenAddBranch = () => {
    setEditingBranchId(null);
    setBranchForm({
      branchName: '',
      branchCode: `BR-${Math.floor(100 + Math.random() * 900)}`,
      district: orgUser?.district || 'Prayagraj',
      address: '',
      managerName: '',
      managerPhone: '+91 94150 45678',
      managerEmail: orgUser?.email || '',
      gatehouseDockNo: 'Gate 1 / Inbound Scale',
      operatingHours: '08:00 AM - 20:00 PM',
      coordsLat: '25.5182',
      coordsLng: '81.8596'
    });
    setShowBranchModal(true);
  };

  const handleOpenEditBranch = (b) => {
    setEditingBranchId(b.branchId);
    setBranchForm({
      branchName: b.branchName,
      branchCode: b.branchCode || '',
      district: b.district || 'Prayagraj',
      address: b.address,
      managerName: b.managerName,
      managerPhone: b.managerPhone,
      managerEmail: b.managerEmail || '',
      gatehouseDockNo: b.gatehouseDockNo || 'Gate 1 / Inbound Scale',
      operatingHours: b.operatingHours || '08:00 AM - 20:00 PM',
      coordsLat: (b.coordsLat || 25.5182).toString(),
      coordsLng: (b.coordsLng || 81.8596).toString()
    });
    setShowBranchModal(true);
  };

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    setSavingBranchLoading(true);
    try {
      if (editingBranchId) {
        await partnersApi.updateBranch(editingBranchId, branchForm);
        setActionSuccessMsg(`Branch base '${branchForm.branchName}' updated successfully!`);
      } else {
        await partnersApi.createBranch(branchForm);
        setActionSuccessMsg(`New branch base '${branchForm.branchName}' registered into organization network!`);
      }
      setShowBranchModal(false);
      loadBranches();
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Error saving branch:', err);
      alert('Failed to save branch. Please check inputs.');
    } finally {
      setSavingBranchLoading(false);
    }
  };

  const handleDeleteBranch = async (branchId, branchName) => {
    if (!window.confirm(`Are you sure you want to remove branch base '${branchName}'?`)) return;
    try {
      await partnersApi.deleteBranch(branchId);
      setActionSuccessMsg(`Branch '${branchName}' removed from active network.`);
      loadBranches();
      setTimeout(() => setActionSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Error deleting branch:', err);
      alert('Failed to remove branch.');
    }
  };

  // Inbound Allocation Handlers
  const handleOpenAllocateModal = (req) => {
    setAllocatingRequest(req);
    setAllocatedSuccessDpp(null);
    if (workforceRecyclers.length > 0) {
      const rec = workforceRecyclers[0];
      setSelectedRecyclerId(rec.id);
      setAgentPhoneInput(rec.phone || '+91 98765 43210');
    }
  };

  const handleAllocateRecycler = async (e) => {
    e.preventDefault();
    if (!allocatingRequest) return;
    setAllocatingLoading(true);
    try {
      const chosenWorker = workforceRecyclers.find(w => w.id === selectedRecyclerId) || {
        id: selectedRecyclerId || 'REC-001',
        name: 'Greenscape Field Agent #1'
      };

      const res = await partnersApi.allocateRecyclerToRequest(allocatingRequest.requestId, {
        recyclerId: chosenWorker.id,
        recyclerName: chosenWorker.name || chosenWorker.company_name || 'Greenscape Field Agent #1',
        agentPhone: agentPhoneInput || chosenWorker.phone || '+91 98765 43210',
        agentVehicle: agentVehicleInput || 'UP-70-EC-8842'
      });

      if (res.success) {
        setAllocatedSuccessDpp({
          dppId: res.dppId,
          verificationPin: res.verificationPin,
          requestId: allocatingRequest.requestId,
          workerName: chosenWorker.name || 'Field Agent',
          vehicle: agentVehicleInput
        });
        setActionSuccessMsg(`Order ${allocatingRequest.requestId} authorized! Recycler allocated & DPP (${res.dppId}) activated.`);
        loadIncomingRequests();
        setTimeout(() => setActionSuccessMsg(null), 6000);
      }
    } catch (err) {
      console.error('Error allocating recycler:', err);
      alert('Failed to allocate recycler: ' + err.message);
    } finally {
      setAllocatingLoading(false);
    }
  };

  // Approve & Clear Inbound Depot Intake Lot
  const handleApproveDepotIntake = async (e) => {
    e.preventDefault();
    if (!verifyingLot) return;
    setVerifyingLoading(true);

    try {
      const res = await partnersApi.verifyDepotIntake(verifyingLot.lotId, {
        verifiedWeightKg: verifiedWeightInput || verifyingLot.totalWeightKg,
        adminNotes: dockNotesInput || `Dock scale verified. Consignment cleared into central smelting storage.`
      });

      if (res.success) {
        setActionSuccessMsg(`Consignment Lot ${verifyingLot.lotId} received & verified into ${orgUser?.organizationName || 'Base'}!`);
        setTimeout(() => setActionSuccessMsg(null), 5000);
        setVerifyingLot(null);
        setVerifiedWeightInput('');
        setDockNotesInput('');
        loadDepotIntakeLots();
        loadFieldRecyclersMonitor();
      }
    } catch (err) {
      alert('Failed to verify depot intake lot: ' + err.message);
    } finally {
      setVerifyingLoading(false);
    }
  };

  // Transition Batch Status
  const handleTransitionStatus = async (batchId, currentStatus) => {
    const nextMap = {
      'ingestion': 'processing',
      'processing': 'smelting',
      'smelting': 'completed'
    };

    const nextStatus = nextMap[currentStatus] || 'completed';
    setUpdatingBatchId(batchId);
    try {
      await partnersApi.updateBatchStatus(batchId, nextStatus);
      setActionSuccessMsg(`Batch ${batchId} successfully progressed to "${nextStatus.toUpperCase()}".`);
      setTimeout(() => setActionSuccessMsg(null), 4000);
      loadDashboardData();
    } catch (err) {
      alert('Error updating batch status: ' + err.message);
    } finally {
      setUpdatingBatchId(null);
    }
  };

  // =========================================================================
  // VIEW A: UNAUTHENTICATED SF LOGIN GATEWAY
  // =========================================================================
  if (!orgToken) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #F8FAFC 50%, #EFF6FF 100%)',
        color: '#0F172A',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Top Header Bar */}
        <header style={{
          padding: 'clamp(10px, 2vw, 16px) clamp(14px, 3vw, 32px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, #10B981, #047857)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
              flexShrink: 0
            }}>
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                EcoTrace<span style={{ color: '#10B981' }}> Base</span>
              </div>
              <div style={{ fontSize: '0.66rem', fontWeight: '800', color: '#059669', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
                Organization &amp; Smelter Console
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('partner')}
            style={{
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#475569',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              transition: 'all 0.15s ease'
            }}
          >
            ← Public Hub
          </button>
        </header>

        {/* Centered Login Box */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 40px) 14px' }}>
          <div 
            className="animate-fadeIn" 
            style={{ 
              maxWidth: '480px', 
              width: '100%', 
              background: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '24px', 
              padding: 'clamp(22px, 5vw, 36px) clamp(16px, 4vw, 30px)', 
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '16px', 
                background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#059669', 
                margin: '0 auto 12px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
              }}>
                <Building2 size={28} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.45rem)', fontWeight: '900', margin: '0 0 4px', color: '#0F172A', letterSpacing: '-0.02em' }}>
                Organization Base Admin
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.84rem', margin: 0, lineHeight: 1.45 }}>
                Secure gateway for authorized recycling organizations &amp; smelter hubs
              </p>
            </div>

            {loginError && (
              <div style={{ 
                background: '#FEF2F2', 
                border: '1px solid #FECACA', 
                color: '#DC2626', 
                padding: '11px 13px', 
                borderRadius: '12px', 
                marginBottom: '16px', 
                fontSize: '0.82rem', 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px' 
              }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  1. Corporate Email
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. admin@greendropmetals.org"
                    style={{
                      width: '100%',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '10px 12px 10px 36px',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  2. Assigned Organization ID
                </label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={loginOrgId}
                    onChange={(e) => setLoginOrgId(e.target.value)}
                    placeholder="e.g. ORG-AUTH-001"
                    style={{
                      width: '100%',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '10px 12px 10px 36px',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  3. Organization Access Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '10px 12px 10px 36px',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  marginTop: '6px',
                  minHeight: '42px'
                }}
              >
                <ShieldCheck size={18} />
                <span>{loginLoading ? 'Entering Console...' : 'Enter Organization Admin Dashboard →'}</span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button 
                onClick={() => onNavigate('partner')} 
                style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
              >
                ← Return to Public Partner Portal
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Telemetry data
  const tel = dashboardData?.telemetry || {
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

  const batchesList = dashboardData?.batches || [];
  const clientsList = dashboardData?.corporateClients || [];
  const dispatchesList = dashboardData?.scheduledDispatches || [];

  // =========================================================================
  // VIEW B: AUTHENTICATED APPLE SF ENTERPRISE DASHBOARD
  // =========================================================================
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#F8FAFC',
      color: '#0F172A',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 1. Left Navigation Sidebar */}
      <OrgAdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        incomingRequestsCount={incomingRequests.length}
        intakeLotsCount={intakeLots.length}
        branchesCount={branches.length}
        fieldRecyclersCount={fieldRecyclers.length}
        batchesCount={batchesList.length}
        clientsCount={clientsList.length}
        dispatchesCount={dispatchesList.length}
        orgUser={orgUser}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onLogout={handleSignOut}
        onNavigatePublic={() => onNavigate('partner')}
      />

      {/* 2. Right Work Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <OrgAdminHeader
          orgUser={orgUser}
          onSyncDb={handleSyncAll}
          loadingSync={loadingData || loadingIntake}
          onNavigatePublic={() => onNavigate('partner')}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onLogout={handleSignOut}
          onAddBranch={handleOpenAddBranch}
        />

        {/* Scrollable Work View Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(12px, 2.5vw, 26px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxSizing: 'border-box'
        }}>
          {/* Action Success Alert Notification */}
          {actionSuccessMsg && (
            <div 
              className="animate-fadeIn"
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#047857',
                padding: '11px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                fontWeight: '800',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{actionSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: INBOUND PICKUPS & DPP ALLOCATION */}
          {activeTab === 'pickup-allocations' && (
            <OrgAdminPickupAllocationsView
              incomingRequests={incomingRequests}
              loading={loadingIncomingRequests}
              onRefresh={loadIncomingRequests}
              onOpenAllocateModal={handleOpenAllocateModal}
            />
          )}

          {/* TAB 2: INBOUND DEPOT INTAKE DESK */}
          {activeTab === 'depot-intake' && (
            <OrgAdminDepotIntakeView
              intakeLots={intakeLots}
              loading={loadingIntake}
              onRefresh={loadDepotIntakeLots}
              onOpenVerifyModal={(lot) => {
                setVerifyingLot(lot);
                setVerifiedWeightInput(lot.totalWeightKg?.toString() || '');
              }}
            />
          )}

          {/* TAB 3: REGIONAL BRANCHES & BASES */}
          {activeTab === 'branches' && (
            <OrgAdminBranchesView
              branches={branches}
              loading={loadingBranches}
              onRefresh={loadBranches}
              onOpenAddBranch={handleOpenAddBranch}
              onOpenEditBranch={handleOpenEditBranch}
              onDeleteBranch={handleDeleteBranch}
            />
          )}

          {/* TAB 4: FIELD RECYCLERS MONITOR */}
          {activeTab === 'field-supervision' && (
            <OrgAdminFieldSupervisionView
              fieldRecyclers={fieldRecyclers}
              loading={loadingRecyclers}
              onRefresh={loadFieldRecyclersMonitor}
            />
          )}

          {/* TAB 5: INGESTION BATCHES & SMELTING PIPELINE */}
          {activeTab === 'batches' && (
            <OrgAdminBatchesView
              batches={batchesList}
              loading={loadingData}
              onRefresh={loadDashboardData}
              onTransitionStatus={handleTransitionStatus}
              updatingBatchId={updatingBatchId}
              onOpenCertificateModal={(batch) => setActiveCertModal(batch)}
            />
          )}

          {/* TAB 6: PRECIOUS METALS RECOVERY TELEMETRY */}
          {activeTab === 'metals' && (
            <OrgAdminMetalsTelemetryView
              telemetry={tel}
            />
          )}

          {/* TAB 7: CORPORATE CLIENTS */}
          {activeTab === 'clients' && (
            <OrgAdminCorporateClientsView
              clients={clientsList}
              loading={loadingData}
              onRefresh={loadDashboardData}
            />
          )}

          {/* TAB 8: LOGISTICS FLEET DISPATCHES */}
          {activeTab === 'logistics' && (
            <OrgAdminLogisticsView
              dispatches={dispatchesList}
              loading={loadingData}
              onRefresh={loadDashboardData}
            />
          )}

          {/* TAB 9: ORGANIZATION PROFILE & CPCB LICENSE */}
          {activeTab === 'profile-settings' && (
            <OrgAdminProfileView
              orgUser={orgUser}
              onUpdateOrgUser={(user) => {
                setOrgUser(user);
                sessionStorage.setItem('ecotrace_org_user', JSON.stringify(user));
                localStorage.removeItem('ecotrace_org_user');
              }}
            />
          )}
        </main>
      </div>

      {/* 3. MODALS */}
      
      {/* Recycler Allocation Modal */}
      <OrgAdminAllocateWorkerModal
        allocatingRequest={allocatingRequest}
        allocatedSuccessDpp={allocatedSuccessDpp}
        workforceRecyclers={workforceRecyclers}
        selectedRecyclerId={selectedRecyclerId}
        setSelectedRecyclerId={setSelectedRecyclerId}
        agentPhoneInput={agentPhoneInput}
        setAgentPhoneInput={setAgentPhoneInput}
        agentVehicleInput={agentVehicleInput}
        setAgentVehicleInput={setAgentVehicleInput}
        allocatingLoading={allocatingLoading}
        onAllocateRecycler={handleAllocateRecycler}
        onClose={() => { setAllocatingRequest(null); setAllocatedSuccessDpp(null); }}
      />

      {/* Depot Intake Verification Modal */}
      <OrgAdminVerifyIntakeModal
        verifyingLot={verifyingLot}
        verifiedWeightInput={verifiedWeightInput}
        setVerifiedWeightInput={setVerifiedWeightInput}
        dockNotesInput={dockNotesInput}
        setDockNotesInput={setDockNotesInput}
        verifyingLoading={verifyingLoading}
        onApproveDepotIntake={handleApproveDepotIntake}
        onClose={() => setVerifyingLot(null)}
      />

      {/* Branch Register / Edit Modal */}
      <OrgAdminBranchModal
        isOpen={showBranchModal}
        editingBranchId={editingBranchId}
        branchForm={branchForm}
        setBranchForm={setBranchForm}
        savingBranchLoading={savingBranchLoading}
        orgUser={orgUser}
        onSaveBranch={handleSaveBranch}
        onClose={() => setShowBranchModal(false)}
      />

      {/* Official CPCB Form-2 Certificate Modal */}
      <OrgAdminForm2Modal
        activeCertModal={activeCertModal}
        orgUser={orgUser}
        onClose={() => setActiveCertModal(null)}
      />

    </div>
  );
};
