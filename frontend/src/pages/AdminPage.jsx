import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/api';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminScansMatrix } from '../components/admin/AdminScansMatrix';
import { AdminDatasetsExplorer } from '../components/admin/AdminDatasetsExplorer';
import { AdminDepotLots } from '../components/admin/AdminDepotLots';
import { AdminDppPassports } from '../components/admin/AdminDppPassports';
import { AdminSystemHealth } from '../components/admin/AdminSystemHealth';
import { AdminAccountSettings } from '../components/admin/AdminAccountSettings';
import { AdminOrganizationDossier } from '../components/admin/AdminOrganizationDossier';
import { AdminRecyclerMasterDossier } from '../components/admin/AdminRecyclerMasterDossier';
import { AdminDonorMasterDossier } from '../components/admin/AdminDonorMasterDossier';
import { AdminCommunitySubAdminDossier } from '../components/admin/AdminCommunitySubAdminDossier';
import { AdminProposalVerificationModal } from '../components/admin/AdminProposalVerificationModal';
import { 
  ShieldCheck, 
  Lock, 
  Building2, 
  Users, 
  User,
  QrCode,
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  Package,
  Leaf,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Search,
  ExternalLink,
  Copy,
  Check,
  Award,
  Calendar,
  MapPin,
  X,
  Clock,
  Flame,
  Globe2,
  Tag,
  Edit3,
  FileText,
  DollarSign,
  Truck,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  ShieldAlert,
  LifeBuoy,
  MessageSquare,
  AlertCircle,
  Radio,
  Sliders,
  Database,
  Layers,
  Cpu,
  Key,
  ScanLine,
  Activity,
  HardDrive,
  Settings,
  Menu,
  ZoomIn
} from 'lucide-react';
import { ImageLightboxModal } from '../components/common/ImageLightboxModal';

export const AdminPage = ({ onNavigate }) => {
  const { currentUser, loginAdmin, logout } = useAuth();
  const isAdminLoggedIn = currentUser?.role === 'admin';

  const [lightboxImage, setLightboxImage] = useState({
    isOpen: false,
    url: '',
    title: '',
    subtitle: '',
    tags: []
  });

  // Secure Empty Initial States (Strict Multi-Factor Security Key Verification)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSecurityKey, setAdminSecurityKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityKey, setShowSecurityKey] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin View Tab
  const [adminTab, setAdminTab] = useState('scans');
  const [searchFilter, setSearchFilter] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Live Data from MySQL API
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeRecyclers: 0,
    totalPickups: 0,
    totalValuation: 0,
    totalCo2SavedKg: 0,
    totalScans: 0,
    totalCommunityEvents: 0,
    totalCommunityAdmins: 0,
    totalEventRegistrations: 0
  });

  const [donorsList, setDonorsList] = useState([]);
  const [recyclersList, setRecyclersList] = useState([]);
  const [pickupsList, setPickupsList] = useState([]);
  const [subAdminsList, setSubAdminsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [proposalsList, setProposalsList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [togglingEventId, setTogglingEventId] = useState(null);

  // Modal & Workspace States
  // 1. Donor Master Dossier Workspace
  const [selectedDonorDossierId, setSelectedDonorDossierId] = useState(null);

  // 2. Sub-Admin Intelligence Dossier Workspace
  const [selectedSubAdminDossierId, setSelectedSubAdminDossierId] = useState(null);
  const [selectedSubAdminDossier, setSelectedSubAdminDossier] = useState(null);
  const [loadingDossier, setLoadingDossier] = useState(false);

  // Pickup Logistics Order Status Filter
  const [pickupStatusFilter, setPickupStatusFilter] = useState('all');

  // 2. User (Donor / Recycler) Orders Inspection Modal
  const [inspectingUserOrders, setInspectingUserOrders] = useState(null); // { user, userType, orders: [] }
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);

  // 3. Supreme Event Editor Modal
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventEditForm, setEventEditForm] = useState({
    title: '',
    category: '',
    mode: '',
    venueLocation: '',
    hostName: '',
    hostRole: '',
    organizationName: '',
    startDate: '',
    endDate: '',
    prizePool: '',
    maxParticipants: 500,
    isOpenRegistration: true,
    bannerImage: '',
    description: ''
  });
  const [savingEventEdit, setSavingEventEdit] = useState(false);
  const [eventEditSuccess, setEventEditSuccess] = useState(false);

  // 4. Issued Credentials Modal
  const [issuedCredsModal, setIssuedCredsModal] = useState(null);
  const [copiedCreds, setCopiedCreds] = useState(false);
  const [approvingProposalId, setApprovingProposalId] = useState(null);
  const [selectedProposalForVerification, setSelectedProposalForVerification] = useState(null);

  // 5. Partner Applications & Organization Credentials
  const [partnerAppsList, setPartnerAppsList] = useState([]);
  const [partnerOrgsList, setPartnerOrgsList] = useState([]);
  const [approvingPartnerAppId, setApprovingPartnerAppId] = useState(null);
  const [issuedPartnerCredsModal, setIssuedPartnerCredsModal] = useState(null);
  const [copiedPartnerCreds, setCopiedPartnerCreds] = useState(false);
  const [partnerTabFilter, setPartnerTabFilter] = useState('orgs');
  const [orgSearchQuery, setOrgSearchQuery] = useState('');
  const [orgApprovalFilter, setOrgApprovalFilter] = useState('all'); // 'all', 'pending', 'approved'
  const [orgPage, setOrgPage] = useState(1);
  const [togglingOrgId, setTogglingOrgId] = useState(null);
  const [selectedOrgDossier, setSelectedOrgDossier] = useState(null);
  const [selectedRecyclerDossierId, setSelectedRecyclerDossierId] = useState(null);

  // 6. User Grievances & Escalations (Supreme Admin Resolution Matrix)
  const [grievancesList, setGrievancesList] = useState([]);
  const [resolvingTicket, setResolvingTicket] = useState(null);
  const [resolutionNotesInput, setResolutionNotesInput] = useState('');
  const [selectedStatusInput, setSelectedStatusInput] = useState('Resolved');
  const [grievanceStatusFilter, setGrievanceStatusFilter] = useState('all');
  const [grievanceSearch, setGrievanceSearch] = useState('');
  const [updatingGrievance, setUpdatingGrievance] = useState(false);

  // Fetch all admin tables from MySQL API
  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [statsRes, usersRes, recyclersRes, pickupsRes, subAdminsRes, eventsRes, propRes, partnerAppsRes, grievancesRes] = await Promise.allSettled([
        adminApi.getStats(),
        adminApi.getUsers(),
        adminApi.getRecyclers(),
        adminApi.getPickups(),
        adminApi.getCommunityAdmins(),
        adminApi.getCommunityEvents(),
        adminApi.getEventProposals(),
        adminApi.getPartnerApplications(),
        adminApi.getGrievances()
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.stats) setStats(statsRes.value.stats);
      if (usersRes.status === 'fulfilled' && usersRes.value?.users) setDonorsList(usersRes.value.users);
      if (recyclersRes.status === 'fulfilled' && recyclersRes.value?.recyclers) setRecyclersList(recyclersRes.value.recyclers);
      if (pickupsRes.status === 'fulfilled' && pickupsRes.value?.pickups) setPickupsList(pickupsRes.value.pickups);
      if (subAdminsRes.status === 'fulfilled' && subAdminsRes.value?.admins) setSubAdminsList(subAdminsRes.value.admins);
      if (eventsRes.status === 'fulfilled' && eventsRes.value?.events) setEventsList(eventsRes.value.events);
      if (propRes.status === 'fulfilled' && propRes.value?.proposals) setProposalsList(propRes.value.proposals);
      if (partnerAppsRes.status === 'fulfilled' && partnerAppsRes.value) {
        if (partnerAppsRes.value.applications) setPartnerAppsList(partnerAppsRes.value.applications);
        if (partnerAppsRes.value.organizations) setPartnerOrgsList(partnerAppsRes.value.organizations);
      }
      if (grievancesRes.status === 'fulfilled' && grievancesRes.value?.grievances) {
        setGrievancesList(grievancesRes.value.grievances);
      }
    } catch (e) {
      console.warn('Error loading supreme admin data:', e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadAdminData();
    }
  }, [isAdminLoggedIn]);

  // Strict Auto-Logout on unmount / navigation
  useEffect(() => {
    return () => {
      logout();
    };
  }, []);

  // Handle Explicit Admin Logout
  const handleAdminLogout = () => {
    logout();
    setAdminEmail('');
    setAdminPassword('');
    setAdminSecurityKey('');
    setLoginError('');
    onNavigate('company');
  };

  // Handle Admin Login (Strict 3-Factor Authentication)
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await loginAdmin(adminEmail, adminPassword, adminSecurityKey);
      if (res.success) {
        loadAdminData();
      }
    } catch (err) {
      setLoginError(err.message || 'Access Denied: Invalid Super Admin credentials or Security Key.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 1. Delete Donor with confirmation
  const handleDeleteDonor = async (id, name) => {
    if (!window.confirm(`SUPREME ACTION: Permanently delete donor "${name || id}" and all associated pickup requests from MySQL?`)) return;
    try {
      await adminApi.deleteDonor(id);
      setDonorsList(prev => prev.filter(u => u.id !== id));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting donor:', err);
      alert('Failed to delete donor account.');
    }
  };

  // 2. Delete Recycler with confirmation
  const handleDeleteRecycler = async (id, company) => {
    if (!window.confirm(`SUPREME ACTION: Permanently delete recycler "${company || id}" from MySQL?`)) return;
    try {
      await adminApi.deleteRecycler(id);
      setRecyclersList(prev => prev.filter(r => r.id !== id));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting recycler:', err);
      alert('Failed to delete recycler account.');
    }
  };

  // 3. Inspect Donor Orders
  const handleInspectDonorOrders = async (donor) => {
    setLoadingUserOrders(true);
    setInspectingUserOrders({ user: donor, userType: 'donor', orders: [] });
    try {
      const res = await adminApi.getDonorOrders(donor.id);
      if (res.success) {
        setInspectingUserOrders({ user: donor, userType: 'donor', orders: res.orders || [] });
      }
    } catch (err) {
      console.error('Error fetching donor orders:', err);
    } finally {
      setLoadingUserOrders(false);
    }
  };

  // 3b. Update Pickup Logistics Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await adminApi.updateOrder(orderId, { status: newStatus });
      if (res.success) {
        setPickupsList(prev => prev.map(p => p.requestId === orderId ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status.');
    }
  };

  // 3c. Delete Pickup Order from MySQL
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`SUPREME ACTION: Permanently delete pickup order "${orderId}" from MySQL?`)) return;
    try {
      const res = await adminApi.deleteOrder(orderId);
      if (res.success) {
        setPickupsList(prev => prev.filter(p => p.requestId !== orderId));
        loadAdminData();
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Failed to delete pickup order.');
    }
  };

  // 4. Inspect Recycler Orders
  const handleInspectRecyclerOrders = async (recycler) => {
    setLoadingUserOrders(true);
    setInspectingUserOrders({ user: recycler, userType: 'recycler', orders: [] });
    try {
      const res = await adminApi.getRecyclerOrders(recycler.id);
      if (res.success) {
        setInspectingUserOrders({ user: recycler, userType: 'recycler', orders: res.orders || [] });
      }
    } catch (err) {
      console.error('Error fetching recycler orders:', err);
    } finally {
      setLoadingUserOrders(false);
    }
  };

  // 5. Inspect Sub-Admin Intelligence Dossier
  const handleInspectSubAdmin = async (subAdmin) => {
    setLoadingDossier(true);
    setSelectedSubAdminDossier({ admin: subAdmin, events: [], registrations: [] });
    try {
      const res = await adminApi.getCommunityAdminHistory(subAdmin.id);
      if (res.success) {
        setSelectedSubAdminDossier(res);
      }
    } catch (err) {
      console.error('Error loading sub-admin history dossier:', err);
    } finally {
      setLoadingDossier(false);
    }
  };

  // 6. Delete Community Sub-Admin
  const handleDeleteSubAdmin = async (id, name) => {
    if (!window.confirm(`SUPREME ACTION: Permanently remove Sub-Admin account "${name || id}" from MySQL?`)) return;
    try {
      await adminApi.deleteCommunityAdmin(id);
      setSubAdminsList(prev => prev.filter(a => a.id !== id));
      if (selectedSubAdminDossier?.admin?.id === id) {
        setSelectedSubAdminDossier(null);
      }
      loadAdminData();
    } catch (err) {
      console.error('Error deleting sub-admin:', err);
      alert('Failed to delete community sub-admin.');
    }
  };

  // 7. Toggle Event Trending Tag
  const handleToggleTrending = async (eventId) => {
    setTogglingEventId(eventId);
    try {
      const res = await adminApi.toggleEventTrending(eventId);
      if (res.success) {
        setEventsList(prev => prev.map(ev => ev.id === eventId ? { ...ev, isTrending: res.isTrending } : ev));
        loadAdminData();
      }
    } catch (err) {
      console.error('Error toggling trending tag:', err);
    } finally {
      setTogglingEventId(null);
    }
  };

  // 8. Open Supreme Event Editor Modal
  const handleOpenEditEvent = (ev) => {
    setEditingEvent(ev);
    setEventEditForm({
      title: ev.title || '',
      category: ev.category || 'AI & Hardware Hackathon',
      mode: ev.mode || 'Hybrid',
      venueLocation: ev.venueLocation || ev.venue_location || '',
      hostName: ev.hostName || ev.host_name || '',
      hostRole: ev.hostRole || ev.host_role || 'Event Host',
      organizationName: ev.organizationName || ev.organization_name || '',
      startDate: ev.startDate || ev.start_date || '',
      endDate: ev.endDate || ev.end_date || '',
      prizePool: ev.prizePool || ev.prize_pool || '',
      maxParticipants: ev.maxParticipants || ev.max_participants || 500,
      isOpenRegistration: ev.isOpenRegistration !== undefined ? ev.isOpenRegistration : true,
      bannerImage: ev.bannerImage || ev.banner_image || '',
      description: ev.description || ''
    });
    setEventEditSuccess(false);
  };

  // 9. Save Supreme Event Edit
  const handleSaveEventEdit = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    setSavingEventEdit(true);
    try {
      const res = await adminApi.updateEvent(editingEvent.id, eventEditForm);
      if (res.success) {
        setEventEditSuccess(true);
        loadAdminData();
        setTimeout(() => {
          setEditingEvent(null);
          setEventEditSuccess(false);
        }, 1200);
      }
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Failed to update event details.');
    } finally {
      setSavingEventEdit(false);
    }
  };

  // 10. Delete Event with confirmation
  const handleDeleteEvent = async (eventId, title) => {
    if (!window.confirm(`SUPREME ACTION: Permanently remove event "${title}" and all its attendee passes from MySQL?`)) return;
    try {
      await adminApi.deleteEvent(eventId);
      setEventsList(prev => prev.filter(e => e.id !== eventId));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event.');
    }
  };

  // 11. Approve Campus Host Proposal & Mint Sub-Admin Credentials
  const handleConfirmApproveProposal = async (proposalId, verificationData) => {
    setApprovingProposalId(proposalId);
    try {
      const res = await adminApi.approveProposal(proposalId, verificationData);
      if (res.success && res.issuedCredentials) {
        setSelectedProposalForVerification(null);
        setIssuedCredsModal({
          ...res.issuedCredentials,
          title: res.issuedCredentials.eventTitle || 'Campus Community Event',
          type: res.isExistingSubAdmin ? 'Existing Accredited Sub-Admin (Event Assigned)' : 'Community Sub-Admin Event Host'
        });
        setProposalsList(prev => prev.map(p => p.id === proposalId ? { ...p, status: 'approved' } : p));
        loadAdminData();
      }
    } catch (err) {
      console.error('Error approving proposal:', err);
      alert('Failed to approve proposal: ' + (err.response?.data?.error || err.message || 'Server error'));
    } finally {
      setApprovingProposalId(null);
    }
  };

  // 12. Delete Proposal
  const handleDeleteProposal = async (proposalId) => {
    if (!window.confirm('Delete this proposal?')) return;
    try {
      await adminApi.deleteProposal(proposalId);
      setProposalsList(prev => prev.filter(p => p.id !== proposalId));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting proposal:', err);
    }
  };

  // 13. Approve Partner Application & Issue Organization Credentials
  const handleApprovePartnerApplication = async (appId) => {
    setApprovingPartnerAppId(appId);
    try {
      const res = await adminApi.approvePartnerApplication(appId);
      if (res.success && res.issuedCredentials) {
        setIssuedPartnerCredsModal(res.issuedCredentials);
        setPartnerAppsList(prev => prev.map(a => a.id === appId ? { ...a, status: 'approved', approved_credentials: res.issuedCredentials } : a));
        loadAdminData();
      }
    } catch (err) {
      console.error('Error approving partner application:', err);
      alert('Failed to approve partner application: ' + err.message);
    } finally {
      setApprovingPartnerAppId(null);
    }
  };

  // 14. Reject Partner Application
  const handleRejectPartnerApplication = async (appId) => {
    if (!window.confirm('Reject this organization partnership application?')) return;
    try {
      await adminApi.rejectPartnerApplication(appId);
      setPartnerAppsList(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
      loadAdminData();
    } catch (err) {
      console.error('Error rejecting partner application:', err);
      alert('Failed to reject partner application.');
    }
  };

  // 15. Delete Partner Application
  const handleDeletePartnerApplication = async (appId) => {
    if (!window.confirm('Permanently delete this partner application record?')) return;
    try {
      await adminApi.deletePartnerApplication(appId);
      setPartnerAppsList(prev => prev.filter(a => a.id !== appId));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting partner application:', err);
    }
  };

  // 16. Delete & Revoke Partner Organization from MySQL
  const handleDeletePartnerOrganization = async (orgId, orgName) => {
    if (!window.confirm(`SUPREME ACTION: Permanently delete and revoke Organization "${orgName}" (${orgId}) from MySQL? Their Organization Admin portal login will be terminated immediately.`)) return;
    try {
      await adminApi.deletePartnerOrganization(orgId);
      setPartnerOrgsList(prev => prev.filter(o => o.id !== orgId));
      loadAdminData();
    } catch (err) {
      console.error('Error deleting partner organization:', err);
      alert('Failed to delete organization: ' + err.message);
    }
  };

  // 17. Toggle Partner Organization Approval (0 = Pending Red, 1 = Approved Green)
  const handleToggleOrgApproval = async (orgId, currentStatus) => {
    const nextStatus = !currentStatus;
    setTogglingOrgId(orgId);
    // Optimistic UI state update
    setPartnerOrgsList(prev => prev.map(org => {
      if (org.id === orgId) {
        return { ...org, is_approved: nextStatus };
      }
      return org;
    }));

    try {
      await adminApi.toggleOrganizationApproval(orgId, nextStatus);
    } catch (err) {
      console.error('Error toggling organization approval in admin:', err);
      // Revert optimistic update
      setPartnerOrgsList(prev => prev.map(org => {
        if (org.id === orgId) {
          return { ...org, is_approved: currentStatus };
        }
        return org;
      }));
      alert('Failed to update organization approval status: ' + err.message);
    } finally {
      setTogglingOrgId(null);
    }
  };

  // Filtered organizations with search and approval status filter
  const filteredOrgs = useMemo(() => {
    return partnerOrgsList.filter(org => {
      if (orgApprovalFilter === 'pending' && org.is_approved) return false;
      if (orgApprovalFilter === 'approved' && !org.is_approved) return false;

      if (!orgSearchQuery) return true;
      const q = orgSearchQuery.toLowerCase();
      return (
        (org.organization_name && org.organization_name.toLowerCase().includes(q)) ||
        (org.id && org.id.toLowerCase().includes(q)) ||
        (org.email && org.email.toLowerCase().includes(q)) ||
        (org.contact_person && org.contact_person.toLowerCase().includes(q)) ||
        (org.city && org.city.toLowerCase().includes(q)) ||
        (org.district && org.district.toLowerCase().includes(q)) ||
        (org.state && org.state.toLowerCase().includes(q)) ||
        (org.cpcb_license && org.cpcb_license.toLowerCase().includes(q))
      );
    });
  }, [partnerOrgsList, orgApprovalFilter, orgSearchQuery]);

  const ORGS_PER_PAGE = 24;
  const totalOrgPages = Math.ceil(filteredOrgs.length / ORGS_PER_PAGE) || 1;
  const paginatedOrgs = useMemo(() => {
    const start = (orgPage - 1) * ORGS_PER_PAGE;
    return filteredOrgs.slice(start, start + ORGS_PER_PAGE);
  }, [filteredOrgs, orgPage]);

  // Filtered queries
  const filteredDonors = (donorsList || []).filter(d => 
    !searchFilter ||
    (d?.displayName && d.displayName.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (d?.email && d.email.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (d?.phone && String(d.phone).includes(searchFilter)) ||
    (d?.id && String(d.id).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const filteredRecyclers = (recyclersList || []).filter(r =>
    !searchFilter ||
    (r?.companyName && r.companyName.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (r?.cpcbLicense && r.cpcbLicense.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (r?.email && r.email.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (r?.id && String(r.id).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const filteredPickups = (pickupsList || []).filter(p => {
    const matchesSearch = !searchFilter ||
      (p?.requestId && p.requestId.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p?.donorName && p.donorName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p?.deviceName && p.deviceName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p?.assignedRecycler && p.assignedRecycler.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p?.dppId && p.dppId.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p?.status && p.status.toLowerCase().includes(searchFilter.toLowerCase()));

    if (!matchesSearch) return false;

    if (pickupStatusFilter === 'all') return true;
    if (pickupStatusFilter === 'in_transit') return p.status?.toLowerCase().includes('transit') || p.status?.toLowerCase().includes('en route');
    if (pickupStatusFilter === 'completed') return p.status?.toLowerCase().includes('completed') || p.status?.toLowerCase().includes('recycled');
    if (pickupStatusFilter === 'allocated') return p.status?.toLowerCase().includes('assigned') || p.status?.toLowerCase().includes('allocated');
    if (pickupStatusFilter === 'pending') return p.status?.toLowerCase().includes('pending') || p.status?.toLowerCase().includes('ready');
    return true;
  });

  const filteredSubAdmins = (subAdminsList || []).filter(a =>
    !searchFilter ||
    (a?.username && a.username.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (a?.displayName && a.displayName.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (a?.email && a.email.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (a?.id && String(a.id).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const filteredEvents = (eventsList || []).filter(e =>
    !searchFilter ||
    (e?.title && e.title.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (e?.category && e.category.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (e?.hostName && e.hostName.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (e?.organizationName && e.organizationName.toLowerCase().includes(searchFilter.toLowerCase())) ||
    (e?.id && String(e.id).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  // =========================================================================
  // VIEW A: SECURE LOGIN SCREEN (Clean Light Platform Theme)
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #F8FAFC 50%, #EFF6FF 100%)',
        position: 'relative'
      }}>
        {/* Top Header Bar */}
        <header style={{
          padding: '16px 32px',
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
          <button
            onClick={() => onNavigate('landing')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}>
              <Leaf size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.1 }}>
                EcoTrace<span style={{ color: '#10B981' }}>.AI</span>
              </div>
              <div style={{ fontSize: '0.66rem', fontWeight: '700', color: '#DC2626', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
                Supreme Administration
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('company')}
            style={{
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: '600',
              color: '#475569',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#94A3B8';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#475569';
            }}
          >
            ← Return to Company Page
          </button>
        </header>
        
        {/* Centered Main Login Box */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '24px',
            maxWidth: '480px',
            width: '100%',
            padding: '38px 32px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }}>
            {/* Header Shield & Badge */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.12)'
              }}>
                <ShieldCheck size={36} />
              </div>

              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.06em',
                marginBottom: '8px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }} />
                <span>LEVEL-5 SECURITY CLEARANCE</span>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 6px', color: '#0F172A', letterSpacing: '-0.02em' }}>
                Master Supreme Admin
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Strict multi-factor authentication required. All administrative actions audited in MySQL.
              </p>
            </div>

            {loginError && (
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '0.84rem',
                marginBottom: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Email */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Super Admin Email *
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@ecotrace.gov.in"
                  required
                  style={{
                    width: '100%',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.background = '#FFFFFF';
                    e.target.style.borderColor = '#10B981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = '#F8FAFC';
                    e.target.style.borderColor = '#CBD5E1';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Master Controller Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter master password"
                    required
                    style={{
                      width: '100%',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '12px',
                      padding: '12px 42px 12px 14px',
                      color: '#0F172A',
                      fontSize: '0.92rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = '#FFFFFF';
                      e.target.style.borderColor = '#10B981';
                      e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = '#F8FAFC';
                      e.target.style.borderColor = '#CBD5E1';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Master Security Key */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Key size={14} />
                    <span>Admin Master Security Key *</span>
                  </label>
                  <span style={{ fontSize: '0.7rem', color: '#DC2626', fontWeight: '700' }}>Mandatory</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showSecurityKey ? 'text' : 'password'}
                    value={adminSecurityKey}
                    onChange={(e) => setAdminSecurityKey(e.target.value)}
                    placeholder="ECOTRACE-SEC-KEY-2026-X89 or 882026"
                    required
                    style={{
                      width: '100%',
                      background: '#FFF5F5',
                      border: '1px solid #FCA5A5',
                      borderRadius: '12px',
                      padding: '12px 42px 12px 14px',
                      color: '#991B1B',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = '#FFFFFF';
                      e.target.style.borderColor = '#DC2626';
                      e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = '#FFF5F5';
                      e.target.style.borderColor = '#FCA5A5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecurityKey(!showSecurityKey)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#DC2626',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showSecurityKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-admin-login-submit"
                disabled={loginLoading}
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: '0.92rem',
                  fontWeight: '800',
                  borderRadius: '12px',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loginLoading) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loginLoading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.35)';
                  }
                }}
              >
                <Lock size={16} />
                <span>{loginLoading ? 'Authenticating System Key...' : 'Unlock Supreme Admin Console →'}</span>
              </button>

              {/* Quick Fill Credentials Helper for Authorized Admin */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '14px 16px',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800', letterSpacing: '0.04em' }}>
                    AUTHORIZED MASTER KEY MATRIX:
                  </span>
                  <button
                    type="button"
                    id="btn-admin-quick-fill"
                    onClick={() => {
                      setAdminEmail('admin@ecotrace.gov.in');
                      setAdminPassword('EcoTrace#Admin2026!');
                      setAdminSecurityKey('ECOTRACE-SEC-KEY-2026-X89');
                    }}
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FEE2E2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FEF2F2';
                    }}
                  >
                    <Sparkles size={11} />
                    <span>Quick Fill Master Keys</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.76rem', color: '#475569', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div>Email: <code style={{ color: '#0F172A', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>admin@ecotrace.gov.in</code></div>
                  <div>Security Key: <code style={{ color: '#DC2626', background: '#FEE2E2', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>ECOTRACE-SEC-KEY-2026-X89</code> <span style={{ color: '#64748B' }}>(PIN: <code>882026</code>)</span></div>
                </div>
              </div>

              {/* Bottom Security Badges */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '14px',
                fontSize: '0.72rem',
                color: '#94A3B8',
                paddingTop: '4px'
              }}>
                <span>🛡️ 256-Bit SHA-2</span>
                <span>•</span>
                <span>🔐 CPCB Node</span>
                <span>•</span>
                <span>⚡ Level-5 Root Token</span>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Handle Opening Grievance Resolution Modal
  const handleOpenResolveGrievance = (ticket) => {
    setResolvingTicket(ticket);
    setSelectedStatusInput(ticket.status === 'Pending' ? 'In Review' : ticket.status);
    setResolutionNotesInput(ticket.admin_notes || '');
  };

  // Handle Saving Supreme Admin Grievance Status & Notes
  const handleSaveGrievanceResolution = async () => {
    if (!resolvingTicket) return;
    setUpdatingGrievance(true);
    try {
      await adminApi.updateGrievanceStatus(resolvingTicket.id, selectedStatusInput, resolutionNotesInput);
      setGrievancesList(prev => prev.map(t => 
        t.id === resolvingTicket.id || t.ticket_id === resolvingTicket.ticket_id
          ? { ...t, status: selectedStatusInput, admin_notes: resolutionNotesInput, resolved_at: selectedStatusInput === 'Resolved' ? new Date() : t.resolved_at }
          : t
      ));
      setResolvingTicket(null);
    } catch (err) {
      alert('Failed to update grievance ticket: ' + (err.message || 'Server error'));
    } finally {
      setUpdatingGrievance(false);
    }
  };

  // Handle Deleting Grievance
  const handleDeleteGrievance = async (ticketId) => {
    if (!window.confirm(`Are you sure you want to permanently remove grievance ticket ${ticketId}?`)) return;
    try {
      await adminApi.deleteGrievance(ticketId);
      setGrievancesList(prev => prev.filter(t => t.id !== ticketId && t.ticket_id !== ticketId));
    } catch (err) {
      alert('Failed to delete grievance ticket.');
    }
  };

  // Filtered Grievances
  const filteredGrievances = grievancesList.filter(g => {
    const matchesSearch = !grievanceSearch || 
      g.ticket_id?.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.subject?.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.user_name?.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.user_email?.toLowerCase().includes(grievanceSearch.toLowerCase()) ||
      g.category?.toLowerCase().includes(grievanceSearch.toLowerCase());
    const matchesStatus = grievanceStatusFilter === 'all' || g.status === grievanceStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // =========================================================================
  // VIEW B: AUTHENTICATED MASTER ADMIN SUPREME CONSOLE
  // =========================================================================
  return (
    <div style={{ height: '100vh', maxHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-primary, #F8FAFC)' }}>
      {/* Standalone Admin Header (Fixed Height) */}
      <AdminHeader 
        onNavigateHome={() => onNavigate('landing')}
        onLogout={handleAdminLogout}
        onSyncDb={loadAdminData}
        loadingSync={loadingData}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      />

      {/* Two-Column Admin Dashboard Layout: Fixed-Height Body Container */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 61px)', maxHeight: 'calc(100vh - 61px)', overflow: 'hidden', position: 'relative' }}>
        {/* Left Side Panel Navigation (100% Height, Permanent Dock) */}
        <AdminSidebar 
          activeTab={adminTab}
          onSelectTab={(tab) => { setAdminTab(tab); setSelectedOrgDossier(null); setSelectedSubAdminDossierId(null); setSelectedRecyclerDossierId(null); setSelectedDonorDossierId(null); }}
          grievancesCount={grievancesList.filter(g => g.status === 'Pending').length}
          partnersCount={partnerOrgsList.length || 605}
          eventsCount={eventsList.length}
          subAdminsCount={subAdminsList.length}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={handleAdminLogout}
        />

        {/* Right Main Content Area (Independent Scroll Container) */}
        <main className="admin-main-content" style={{ flex: 1, height: '100%', maxHeight: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '24px 28px 60px', boxSizing: 'border-box', minWidth: 0 }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

            {/* Global Page Search Toolbar (Placed cleanly on page itself) */}
            <div style={{
              background: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-color, #E2E8F0)',
              borderRadius: '14px',
              padding: '10px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 260px', minWidth: '220px' }}>
                <Search size={17} color="var(--text-muted, #64748B)" />
                <input
                  type="text"
                  placeholder="Global search across all platform entities (ID, name, CPCB license, vehicle, phone, subject)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary, #0F172A)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  ✕ Clear Filter
                </button>
              )}
            </div>

          {/* =========================================================================
              TAB: AI HARDWARE SCANS & YELLOW ELEMENT COMPOSITION MATRIX
          ========================================================================= */}
          {adminTab === 'scans' && (
            <AdminScansMatrix />
          )}

          {/* =========================================================================
              TAB: 4-LAYER DATASETS & PRICING ENGINE EXPLORER
          ========================================================================= */}
          {adminTab === 'datasets' && (
            <AdminDatasetsExplorer />
          )}

          {/* =========================================================================
              TAB: CONSIGNMENT DEPOT DELIVERY LOTS & MANIFEST INTAKE
          ========================================================================= */}
          {adminTab === 'depot_lots' && (
            <AdminDepotLots />
          )}

          {/* =========================================================================
              TAB: DIGITAL PRODUCT PASSPORTS (DPP) CIRCULAR AUDIT
          ========================================================================= */}
          {adminTab === 'dpp' && (
            <AdminDppPassports />
          )}

          {/* =========================================================================
              TAB 0: USER GRIEVANCES & DISPUTE RESOLUTION MATRIX (SUPREME ADMIN)
          ========================================================================= */}
          {adminTab === 'grievances' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div className="badge badge-red" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '6px' }}>
                    <ShieldAlert size={13} />
                    <span>SUPREME ADMIN ESCALATION DESK • 48-HOUR SLA</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                    Dispute &amp; Grievance Oversight ({filteredGrievances.length})
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: '3px 0 0' }}>
                    Official complaints submitted via Help &amp; Support AI from Donors, Recyclers, and Organizations.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Status Filters */}
                  {['all', 'Pending', 'In Review', 'Resolved', 'Dismissed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setGrievanceStatusFilter(st)}
                      className={`btn ${grievanceStatusFilter === st ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '10px' }}
                    >
                      {st === 'all' ? 'All Tickets' : st}
                      {st === 'Pending' && ` (${grievancesList.filter(g => g.status === 'Pending').length})`}
                    </button>
                  ))}
                  
                  <button onClick={loadAdminData} className="btn btn-outline btn-sm" title="Refresh Grievances">
                    <RefreshCw size={13} className={loadingData ? 'spin' : ''} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Grievances List */}
              {filteredGrievances.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                  <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>No Active Grievance Tickets</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                    {grievanceStatusFilter !== 'all' 
                      ? `No grievances matching filter "${grievanceStatusFilter}".` 
                      : 'All user inquiries and complaints have been resolved within the 48-hour SLA!'}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filteredGrievances.map((g) => (
                    <div 
                      key={g.id || g.ticket_id}
                      style={{
                        background: 'var(--bg-card)',
                        border: g.priority === 'Urgent' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '800', color: 'var(--emerald-primary)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                            {g.ticket_id}
                          </span>
                          <span className="badge" style={{ background: 'var(--bg-secondary)', fontSize: '0.72rem' }}>
                            {g.category}
                          </span>
                          <span className="badge" style={{ 
                            background: g.priority === 'Urgent' ? 'rgba(239, 68, 68, 0.15)' : g.priority === 'High' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-secondary)',
                            color: g.priority === 'Urgent' ? '#EF4444' : g.priority === 'High' ? '#F59E0B' : 'var(--text-secondary)',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}>
                            {g.priority} Priority
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`ticket-badge ${g.status?.toLowerCase().replace(' ', '_') || 'pending'}`}>
                            {g.status || 'Pending'}
                          </span>

                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleOpenResolveGrievance(g)}
                            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                          >
                            <Edit3 size={13} />
                            <span>Investigate &amp; Resolve</span>
                          </button>

                          <button 
                            className="btn btn-outline btn-sm"
                            onClick={() => handleDeleteGrievance(g.id || g.ticket_id)}
                            style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '6px 10px' }}
                            title="Delete Ticket"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {g.subject}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', whiteSpace: 'pre-line' }}>
                          {g.description}
                        </p>
                      </div>

                      {/* User Dossier Meta */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '10px', 
                        background: 'var(--bg-secondary)', 
                        padding: '12px 16px', 
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>User Name / Org: </span>
                          <strong style={{ color: 'var(--text-primary)' }}>{g.user_name || 'Anonymous'}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Email: </span>
                          <strong style={{ color: 'var(--text-primary)' }}>{g.user_email}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Account Role: </span>
                          <span className="badge badge-emerald" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                            {g.user_role || 'donor'}
                          </span>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Filed At: </span>
                          <span>{new Date(g.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      {/* Admin Resolution Note if already added */}
                      {g.admin_notes && (
                        <div className="support-resolution-box" style={{ marginTop: '4px' }}>
                          <h5>🛡️ Current Supreme Admin Resolution Notice:</h5>
                          <p>{g.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 1: COMMUNITY SUB-ADMINS & HOST DOSSIER
          ========================================================================= */}
          {adminTab === 'subadmins' && (
            selectedSubAdminDossierId ? (
              <AdminCommunitySubAdminDossier
                adminId={selectedSubAdminDossierId}
                onBack={() => setSelectedSubAdminDossierId(null)}
                onOpenEditEvent={handleOpenEditEvent}
                onDeleteAdmin={(id, name) => {
                  handleDeleteSubAdmin(id, name);
                  setSelectedSubAdminDossierId(null);
                }}
              />
            ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px' }}>
                    Community Sub-Admins &amp; Event Hosts ({filteredSubAdmins.length})
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    Inspect full Host Dossiers, campus jurisdiction, participant ticket rosters, and community drive analytics.
                  </p>
                </div>
              </div>

              <div className="admin-responsive-grid">
                {filteredSubAdmins.map(admin => (
                  <div key={admin.id} style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '18px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
                            <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                              {admin.role || 'event_organizer'}
                            </span>
                            {!admin.isFirstLoginCompleted ? (
                              <span style={{
                                fontSize: '0.68rem',
                                fontWeight: '800',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                background: 'rgba(245, 158, 11, 0.15)',
                                color: '#F59E0B',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <Clock size={11} />
                                <span>Pending First-Time Login</span>
                              </span>
                            ) : (
                              <span style={{
                                fontSize: '0.68rem',
                                fontWeight: '800',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#10B981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <CheckCircle2 size={11} />
                                <span>Verified Host</span>
                              </span>
                            )}
                          </div>
                          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {admin.displayName}
                          </h4>
                          <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            @{admin.username} • {admin.id}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteSubAdmin(admin.id, admin.displayName)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '6px 10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                          title="Supreme Delete Sub-Admin"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                        <div>📧 {admin.email}</div>
                        <div>🏛️ {admin.institutionName || 'National Green Campus Network'}</div>
                        <div>📍 {admin.territoryDistrict || 'Prayagraj Hub'}, {admin.territoryState || 'Uttar Pradesh'}</div>
                        <div>
                          🏆 Governed Events: <strong>{admin.assignedEvents?.length || 0}</strong> ({admin.totalParticipants || 0} registered)
                        </div>
                      </div>

                      {admin.assignedEvents && admin.assignedEvents.length > 0 && (
                        <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '8px 12px', fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Active Drive:</span>{' '}
                          <strong>{admin.assignedEvents[0].title}</strong>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedSubAdminDossierId(admin.id)}
                      className="btn btn-primary btn-sm"
                      id={`btn-inspect-subadmin-${admin.id}`}
                      style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.84rem' }}
                    >
                      <Eye size={15} />
                      <span>Inspect Community Sub-Admin Dossier →</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            )
          )}

          {/* =========================================================================
              TAB 2: REGISTERED DONORS & DOSSIER WORKSPACE
          ========================================================================= */}
          {adminTab === 'donors' && (
            <div>
              {selectedDonorDossierId ? (
                <AdminDonorMasterDossier
                  donorId={selectedDonorDossierId}
                  onBack={() => setSelectedDonorDossierId(null)}
                  onNavigateToRecycler={(recId) => {
                    setSelectedDonorDossierId(null);
                    setSelectedRecyclerDossierId(recId);
                    setAdminTab('recyclers');
                  }}
                />
              ) : (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                      Registered Donors Directory ({filteredDonors.length})
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                      Inspect complete Donor Master Dossiers, precious metals recovery histories, DPP digital passports, and payout records.
                    </p>
                  </div>

                  {filteredDonors.length === 0 ? (
                    <div style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '18px',
                      padding: '48px 24px',
                      textAlign: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Users size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        No Donors Found
                      </h4>
                      <p style={{ margin: '0 auto 18px', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '540px' }}>
                        No registered donor records match your search query.
                      </p>
                    </div>
                  ) : (
                    <div className="admin-responsive-grid">
                      {filteredDonors.map(donor => (
                        <div key={donor.id} style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '18px',
                          padding: '20px',
                          boxShadow: 'var(--shadow-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '12px',
                                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1rem',
                                  fontWeight: '900'
                                }}>
                                  {donor.displayName ? donor.displayName.substring(0, 2).toUpperCase() : 'DN'}
                                </div>

                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                                      VERIFIED DONOR
                                    </span>
                                    {donor.profession && (
                                      <span style={{
                                        fontSize: '0.68rem',
                                        fontWeight: '700',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: '#2563EB',
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                      }}>
                                        {donor.profession}
                                      </span>
                                    )}
                                  </div>
                                  <h4 style={{ margin: '4px 0 0', fontSize: '1.08rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                                    {donor.displayName}
                                  </h4>
                                  <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                                    {donor.id}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteDonor(donor.id, donor.displayName)}
                                className="btn btn-outline btn-sm"
                                style={{ padding: '6px 10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                                title="Supreme Delete Donor"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div style={{
                              fontSize: '0.82rem',
                              color: 'var(--text-secondary)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              background: 'var(--bg-secondary, #F8FAFC)',
                              padding: '12px',
                              borderRadius: '12px',
                              border: '1px solid var(--border-color)'
                            }}>
                              <div>📧 Email: <strong style={{ color: 'var(--text-primary)' }}>{donor.email}</strong></div>
                              {donor.phone && donor.phone !== 'N/A' && <div>📞 Phone: <strong style={{ color: 'var(--text-primary)' }}>{donor.phone}</strong></div>}
                              <div>💳 UPI VPA: <strong style={{ color: '#10B981', fontFamily: 'monospace' }}>{donor.upiId}</strong></div>
                              <div>📍 Location: <strong style={{ color: 'var(--text-primary)' }}>{donor.district || 'Prayagraj'}, {donor.state || 'UP'}</strong></div>
                              
                              <div style={{ marginTop: '4px', display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                                <span style={{ color: '#3B82F6', fontWeight: '800', fontSize: '0.76rem' }}>
                                  📦 {donor.totalOrders} Orders
                                </span>
                                <span>•</span>
                                <span style={{ color: '#059669', fontWeight: '800', fontSize: '0.76rem' }}>
                                  🌱 {donor.totalCo2SavedKg} kg CO₂
                                </span>
                                <span>•</span>
                                <span style={{ color: '#10B981', fontWeight: '800', fontSize: '0.76rem' }}>
                                  ₹{donor.totalEarnings || 0}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedDonorDossierId(donor.id)}
                            id={`btn-inspect-donor-${donor.id}`}
                            className="btn btn-outline btn-sm"
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              padding: '9px',
                              fontSize: '0.82rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              borderColor: '#10B981',
                              color: '#10B981',
                              fontWeight: '800',
                              borderRadius: '10px'
                            }}
                          >
                            <User size={15} />
                            <span>Inspect Donor Master Dossier →</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 3: RECYCLERS & SMELTERS GOVERNANCE
          ========================================================================= */}
          {adminTab === 'recyclers' && (
            <div>
              {selectedRecyclerDossierId ? (
                <AdminRecyclerMasterDossier
                  recyclerId={selectedRecyclerDossierId}
                  onBack={() => setSelectedRecyclerDossierId(null)}
                  onNavigateToOrg={(orgId) => {
                    setSelectedRecyclerDossierId(null);
                    const foundOrg = (partnerOrgsList || []).find(o => o.id === orgId);
                    if (foundOrg) {
                      setSelectedOrgDossier(foundOrg);
                    }
                    setAdminTab('partners');
                    setPartnerTabFilter('orgs');
                  }}
                />
              ) : (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                      Authorized Field Recyclers &amp; Drivers ({filteredRecyclers.length})
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                      Field collection fleet, technicians, and part-time student workers authorized under accredited Partner Organizations.
                    </p>
                  </div>

                  {filteredRecyclers.length === 0 ? (
                    <div style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '18px',
                      padding: '48px 24px',
                      textAlign: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Truck size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        No Field Recyclers Registered Yet
                      </h4>
                      <p style={{ margin: '0 auto 18px', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: '1.5' }}>
                        Authorized Field Recyclers and collection drivers are registered by their respective <strong>Partner Organization Sub-Admins</strong> via the Organization Portal or Dossier view. Once an organization onboards collection personnel, they will appear here under their certified organization.
                      </p>
                      <button
                        onClick={() => { setAdminTab('partners'); setPartnerTabFilter('orgs'); }}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '8px 18px', borderRadius: '10px' }}
                      >
                        <span>View 605 Partner Organizations →</span>
                      </button>
                    </div>
                  ) : (
                    <div className="admin-responsive-grid">
                      {filteredRecyclers.map(rec => {
                        const isStudent = rec.occupationType === 'student';
                        return (
                          <div key={rec.id} style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '18px',
                            padding: '20px',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '14px'
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <div>
                                  <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: '800',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    background: isStudent ? 'rgba(37, 99, 235, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                    color: isStudent ? '#2563EB' : '#10B981',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    {isStudent ? `🎓 Student Worker (${rec.academicYear || '1st Year'})` : '💼 Professional Recycler'}
                                  </span>
                                  <h4 style={{ margin: '6px 0 2px', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                                    {rec.displayName || rec.companyName}
                                  </h4>
                                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                    {rec.roleDesignation || 'Certified Field Recycler'}
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleDeleteRecycler(rec.id, rec.displayName || rec.companyName)}
                                  className="btn btn-outline btn-sm"
                                  style={{ padding: '6px 10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                                  title="Supreme Delete Recycler"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                background: 'var(--bg-secondary)',
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                margin: '8px 0'
                              }}>
                                <div>CPCB Worker Code: <strong style={{ color: '#2563EB', fontFamily: 'monospace' }}>{rec.cpcbWorkerId || rec.cpcbLicense}</strong></div>
                                <div>Corp Email: <strong style={{ color: 'var(--text-primary)' }}>{rec.email}</strong></div>
                                <div>Parent Org: <strong style={{ color: 'var(--text-primary)' }}>{rec.companyName}</strong></div>
                                <div>Commitment: <strong style={{ color: '#10B981' }}>{rec.workingHoursTier}</strong></div>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedRecyclerDossierId(rec.id)}
                              className="btn btn-outline btn-sm"
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '9px',
                                fontSize: '0.82rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                borderColor: '#10B981',
                                color: '#10B981',
                                fontWeight: '800'
                              }}
                            >
                              <ShieldCheck size={15} />
                              <span>Inspect Master Recycler Dossier →</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 4: GLOBAL PICKUPS & LOGISTICS ORDERS GOVERNANCE
          ========================================================================= */}
          {adminTab === 'pickups' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Header & Subtitle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                    Global Doorstep Pickups &amp; Logistics Orders ({filteredPickups.length})
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    Real-time tracking of circular logistics consignments, DPP digital passports, donor payouts, and authorized recycler assignments.
                  </p>
                </div>
              </div>

              {/* Top 4-Metric Logistics Summary Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px'
              }}>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: '800' }}>
                    <Truck size={16} color="#3B82F6" />
                    <span>TOTAL LOGISTICS ORDERS</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '6px' }}>
                    {pickupsList.length} <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Consignments</span>
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: '800' }}>
                    <Activity size={16} color="#06B6D4" />
                    <span>IN TRANSIT / ACTIVE</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#06B6D4', marginTop: '6px' }}>
                    {pickupsList.filter(p => p.status?.toLowerCase().includes('transit') || p.status?.toLowerCase().includes('en route') || p.status?.toLowerCase().includes('assigned')).length}
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: '800' }}>
                    <DollarSign size={16} color="#10B981" />
                    <span>TOTAL PAYOUT VOLUME</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#10B981', marginTop: '6px' }}>
                    ₹{pickupsList.reduce((acc, p) => acc + (parseFloat(p.offeredPrice) || 0), 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: '800' }}>
                    <Leaf size={16} color="#059669" />
                    <span>CO₂ AVOIDED</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#059669', marginTop: '6px' }}>
                    {pickupsList.reduce((acc, p) => acc + (parseFloat(p.co2SavedKg) || 0), 0).toFixed(1)} <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>kg CO₂e</span>
                  </div>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                background: 'var(--bg-card)',
                padding: '10px 14px',
                borderRadius: '14px',
                border: '1px solid var(--border-color)'
              }}>
                {[
                  { id: 'all', label: `All Orders (${pickupsList.length})` },
                  { id: 'in_transit', label: '🚚 In Transit / En Route' },
                  { id: 'allocated', label: '👤 Driver Allocated' },
                  { id: 'pending', label: '⏳ Pending Pickup' },
                  { id: 'completed', label: '✅ Recycled & Completed' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPickupStatusFilter(tab.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: pickupStatusFilter === tab.id ? 'var(--primary-color, #10B981)' : 'transparent',
                      color: pickupStatusFilter === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                      fontWeight: pickupStatusFilter === tab.id ? '800' : '600',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Order Cards List */}
              {filteredPickups.length === 0 ? (
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '18px',
                  padding: '48px 24px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Package size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    No Orders Match Filters
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    Try changing your search keywords or switching filter tabs.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredPickups.map(p => {
                    const metals = p.metalsBreakdown || {};
                    const isCompleted = p.status?.toLowerCase().includes('completed') || p.status?.toLowerCase().includes('recycled');
                    const isInTransit = p.status?.toLowerCase().includes('transit') || p.status?.toLowerCase().includes('en route');

                    return (
                      <div key={p.requestId} style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '18px',
                        padding: '22px',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}>
                        {/* 1. Card Top Bar */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px',
                          borderBottom: '1px solid var(--border-color)',
                          paddingBottom: '14px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{
                              fontFamily: 'monospace',
                              fontWeight: '900',
                              fontSize: '1rem',
                              color: 'var(--text-primary)',
                              background: 'var(--bg-secondary)',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)'
                            }}>
                              #{p.requestId}
                            </span>

                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '0.76rem',
                              fontWeight: '800',
                              background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : isInTransit ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: isCompleted ? '#10B981' : isInTransit ? '#06B6D4' : '#F59E0B'
                            }}>
                              <span style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: isCompleted ? '#10B981' : isInTransit ? '#06B6D4' : '#F59E0B'
                              }} />
                              {p.status}
                            </span>

                            {p.dppId && (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'rgba(139, 92, 246, 0.12)',
                                color: '#8B5CF6',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '0.74rem',
                                fontWeight: '800',
                                fontFamily: 'monospace'
                              }}>
                                <QrCode size={12} />
                                DPP: {p.dppId}
                              </span>
                            )}

                            {p.pickupTime && (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '0.76rem',
                                fontWeight: '700'
                              }}>
                                <Calendar size={13} color="#3B82F6" />
                                {p.pickupTime}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              background: 'rgba(16, 185, 129, 0.12)',
                              color: '#10B981',
                              padding: '6px 14px',
                              borderRadius: '10px',
                              fontWeight: '900',
                              fontSize: '1.15rem'
                            }}>
                              ₹{parseFloat(p.offeredPrice || 0).toLocaleString('en-IN')}
                            </div>

                            <button
                              onClick={() => handleDeleteOrder(p.requestId)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '6px 10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                              title="Delete Order Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* 2. 3-Column Detailed Information Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '16px'
                        }}>
                          {/* Column A: Hardware & Elemental Extraction */}
                          <div style={{
                            background: 'var(--bg-secondary, #F8FAFC)',
                            borderRadius: '14px',
                            padding: '16px',
                            border: '1px solid var(--border-color)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                              <Package size={15} color="#3B82F6" />
                              <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                                HARDWARE INTELLIGENCE
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                              {p.deviceImage && (
                                <div
                                  onClick={() => setLightboxImage({
                                    isOpen: true,
                                    url: p.deviceImage,
                                    title: p.deviceName,
                                    subtitle: `Consignment #${p.requestId} • Assigned Recycler: ${p.assignedRecycler || 'Field Agent'}`,
                                    tags: [p.brand || 'Dell', `${p.deviceAgeYears || 5} Yrs Old`, p.physicalCondition || 'Fair', `Valuation: ₹${p.offeredPrice || 0}`]
                                  })}
                                  style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                  }}
                                  title="Click to expand high-resolution device photo"
                                >
                                  <img
                                    src={p.deviceImage}
                                    alt={p.deviceName}
                                    style={{
                                      width: '64px',
                                      height: '64px',
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
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '2px' }}>
                                  {p.deviceName}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <div>Brand/Model: <strong>{p.brand || 'Dell'} {p.modelName || ''}</strong></div>
                                  <div>Age / Condition: <strong>{p.deviceAgeYears ? `${p.deviceAgeYears} Yrs` : '5 Yrs'} • {p.physicalCondition || 'Fair'}</strong></div>
                                  {p.repairHistory && <div>Repairs: <em>{p.repairHistory}</em></div>}
                                </div>
                              </div>
                            </div>

                            {/* Metals Mini-Pills */}
                            {(metals.gold_g || metals.copper_g || metals.silver_g) && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                                {metals.gold_g && (
                                  <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.68rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                                    Au: {metals.gold_g}g
                                  </span>
                                )}
                                {metals.copper_g && (
                                  <span style={{ background: '#FFEDD5', color: '#9A3412', fontSize: '0.68rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                                    Cu: {metals.copper_g}g
                                  </span>
                                )}
                                {metals.silver_g && (
                                  <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '0.68rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                                    Ag: {metals.silver_g}g
                                  </span>
                                )}
                                {metals.lithium_g && (
                                  <span style={{ background: '#ECFDF5', color: '#065F46', fontSize: '0.68rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                                    Li: {metals.lithium_g}g
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Column B: Donor & Origin Location */}
                          <div style={{
                            background: 'var(--bg-secondary, #F8FAFC)',
                            borderRadius: '14px',
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                <User size={15} color="#10B981" />
                                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                                  DONOR &amp; PICKUP POINT
                                </span>
                              </div>

                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {p.donorName}
                              </div>

                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {p.donorPhone && <div>📞 Contact: <strong>{p.donorPhone}</strong></div>}
                                <div>📍 Address: {p.address}</div>
                              </div>
                            </div>

                            {p.userId && (
                              <button
                                onClick={() => {
                                  setSelectedDonorDossierId(p.userId);
                                  setAdminTab('donors');
                                }}
                                style={{
                                  marginTop: '10px',
                                  background: 'none',
                                  border: 'none',
                                  padding: 0,
                                  color: '#10B981',
                                  fontSize: '0.8rem',
                                  fontWeight: '800',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>Inspect Donor Master Dossier →</span>
                              </button>
                            )}
                          </div>

                          {/* Column C: Recycler & Logistics Specialist */}
                          <div style={{
                            background: 'var(--bg-secondary, #F8FAFC)',
                            borderRadius: '14px',
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                <Truck size={15} color="#8B5CF6" />
                                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                                  RECYCLER &amp; FIELD SPECIALIST
                                </span>
                              </div>

                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {p.assignedAgentName || p.assignedRecycler || 'Greenscape Eco Management'}
                              </div>

                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <div>🏢 Org: <strong>{p.orgName || p.assignedRecycler || 'Partner Organization'}</strong></div>
                                {p.assignedAgentVehicle && <div>🚚 Vehicle: <strong>{p.assignedAgentVehicle}</strong></div>}
                                {p.assignedAgentPhone && <div>📞 Phone: <strong>{p.assignedAgentPhone}</strong></div>}
                              </div>
                            </div>

                            {p.assignedRecyclerId && (
                              <button
                                onClick={() => {
                                  setSelectedRecyclerDossierId(p.assignedRecyclerId);
                                  setAdminTab('recyclers');
                                }}
                                style={{
                                  marginTop: '10px',
                                  background: 'none',
                                  border: 'none',
                                  padding: 0,
                                  color: '#8B5CF6',
                                  fontSize: '0.8rem',
                                  fontWeight: '800',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>Inspect Recycler Dossier →</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* 3. Card Bottom Bar: Quick Status Controller & Carbon Saved */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                              LOGISTICS STATUS:
                            </span>
                            <select
                              value={p.status}
                              onChange={(e) => handleUpdateOrderStatus(p.requestId, e.target.value)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Driver Assigned">Driver Assigned</option>
                              <option value="In Transit / En Route">In Transit / En Route</option>
                              <option value="Arrived at Facility">Arrived at Facility</option>
                              <option value="Completed / Recycled">Completed / Recycled</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              fontWeight: '800',
                              color: '#059669'
                            }}>
                              <Leaf size={14} />
                              <span>{p.co2SavedKg || 18.5} kg CO₂e Diverted</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 5: EVENTS & TRENDING TAGS GOVERNANCE
          ========================================================================= */}
          {adminTab === 'events' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px' }}>
                    Live Community Events &amp; Trending Tags ({filteredEvents.length})
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    Master Admin can edit event parameters, change banner images, toggle Trending badges, or delete events.
                  </p>
                </div>
              </div>

              <div className="admin-responsive-grid">
                {filteredEvents.map(event => (
                  <div key={event.id} style={{
                    background: 'var(--bg-card)',
                    border: event.isTrending ? '2px solid #10B981' : '1px solid var(--border-color)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {/* Banner Image Preview */}
                    <div style={{ height: '140px', position: 'relative', background: '#000' }}>
                      <img 
                        src={event.bannerImage || event.banner_image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'} 
                        alt={event.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                        {event.isTrending && (
                          <span className="badge badge-emerald" style={{ background: '#10B981', color: '#fff', fontWeight: '800', fontSize: '0.72rem' }}>
                            <Flame size={12} style={{ marginRight: '4px' }} />
                            <span>Trending</span>
                          </span>
                        )}
                        <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>{event.mode || 'Hybrid'}</span>
                      </div>
                    </div>

                    <div style={{ padding: '18px', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{event.category}</span>
                        <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{event.id}</span>
                      </div>

                      <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.35' }}>
                        {event.title}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                        <div>👤 Host: <strong style={{ color: '#F59E0B' }}>{event.hostName}</strong> {event.hostRole ? `(${event.hostRole})` : ''}</div>
                        <div>🏛️ Org: <strong style={{ color: '#8B5CF6' }}>{event.organizationName}</strong></div>
                        <div>📍 {event.venueLocation} • 📅 {event.startDate}</div>
                        <div>👥 <strong>{event.currentParticipants || 0}</strong> / {event.maxParticipants || 500} registered</div>
                      </div>
                    </div>

                    {/* Supreme Action Buttons */}
                    <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleTrending(event.id)}
                        disabled={togglingEventId === event.id}
                        className={`btn ${event.isTrending ? 'btn-outline' : 'btn-primary'} btn-sm`}
                        style={{ flex: 1, padding: '8px', fontSize: '0.78rem', justifyContent: 'center' }}
                      >
                        <Flame size={13} />
                        <span>{event.isTrending ? 'Delete Trending Tag' : 'Mark Trending'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditEvent(event)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '8px 12px', fontSize: '0.78rem' }}
                        title="Supreme Edit Event"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteEvent(event.id, event.title)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '8px 10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                        title="Supreme Delete Event"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 6: CAMPUS HOST PROPOSALS
          ========================================================================= */}
          {adminTab === 'proposals' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  Campus Event Host Proposals ({proposalsList.length})
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Review event applications from verified Donors, Citizen Advocates, Recyclers, and existing Community Sub-Admins. Approving a proposal reviews details and mints Sub-Admin credentials.
                </p>
              </div>

              {proposalsList.length === 0 ? (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '40px 20px', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <Calendar size={24} />
                  </div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: '800' }}>No Pending Host Proposals</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
                    When a donor or recycler submits an event proposal on the Community Hub, it will appear here for Supreme Admin review and credential issuance.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {proposalsList.map(prop => (
                    <div key={prop.id} style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '18px',
                      padding: '20px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span className={`badge ${prop.status === 'approved' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                            {prop.status === 'approved' ? '✓ APPROVED & AUTHORIZED' : '⏳ PENDING REVIEW'}
                          </span>

                          {prop.isExistingSubAdmin ? (
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              background: 'rgba(139, 92, 246, 0.15)',
                              color: '#8B5CF6',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <ShieldCheck size={12} />
                              <span>Existing Sub-Admin (@{prop.existingSubAdminDetails?.username}) • Origin: {prop.proposerUserType === 'recycler' ? '♻️ Recycler' : '👤 Donor'}</span>
                            </span>
                          ) : (
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#10B981',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <User size={12} />
                              <span>First-Time Applicant ({prop.proposerUserType === 'recycler' ? '♻️ Certified Recycler' : '👤 Verified Donor'})</span>
                            </span>
                          )}

                          <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            {prop.id}
                          </span>
                        </div>

                        <h4 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                          {prop.proposedTitle}
                        </h4>

                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                          <div>🏛️ <strong>Institution:</strong> {prop.institutionName}</div>
                          <div>👤 <strong>Proposer:</strong> {prop.proposerName} (📧 {prop.proposerEmail} {prop.proposerPhone ? `• 📞 ${prop.proposerPhone}` : ''})</div>
                          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '2px' }}>
                            <span>📍 <strong>Venue:</strong> {prop.proposedVenue || prop.institutionName}</span>
                            <span>📅 <strong>Dates:</strong> {prop.proposedDates || 'Upcoming'}</span>
                            <span>👥 <strong>Expected:</strong> {prop.expectedParticipants || 200} participants</span>
                          </div>
                        </div>

                        {prop.proposalDetails && (
                          <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.82rem', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', lineHeight: '1.45' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Event Scope &amp; Agenda:</strong> {prop.proposalDetails}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', alignSelf: 'flex-start' }}>
                        {prop.status !== 'approved' && (
                          <button
                            onClick={() => setSelectedProposalForVerification(prop)}
                            disabled={approvingProposalId === prop.id}
                            className="btn btn-primary btn-sm"
                            id={`btn-review-proposal-${prop.id}`}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '10px',
                              fontSize: '0.84rem',
                              fontWeight: '800',
                              background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Sparkles size={14} />
                            <span>{approvingProposalId === prop.id ? 'Authorizing...' : 'Review & Authorize Host →'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteProposal(prop.id)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '8px 10px', borderRadius: '10px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                          title="Delete Proposal"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 0: PARTNER APPLICATIONS & SMELTER CREDENTIALS
          ========================================================================= */}
          {adminTab === 'partners' && (
            selectedOrgDossier ? (
              <AdminOrganizationDossier 
                organization={selectedOrgDossier}
                onBack={() => setSelectedOrgDossier(null)}
                onToggleApproval={handleToggleOrgApproval}
                onDeleteOrg={handleDeletePartnerOrganization}
                onWorkerAdded={loadAdminData}
              />
            ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                    🏢 Partner Applications &amp; Organization Directory ({partnerAppsList.length} Total)
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    Review B2B partnership requests from IT parks, enterprises, educational campuses, and smelters. Approving an organization generates corporate credentials stored in MySQL.
                  </p>
                </div>

                {/* Sub Filters */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: `All Applications (${partnerAppsList.length})` },
                    { id: 'pending', label: `Pending (${partnerAppsList.filter(a => a.status === 'pending').length})` },
                    { id: 'approved', label: `Approved (${partnerAppsList.filter(a => a.status === 'approved').length})` },
                    { id: 'orgs', label: `Active Orgs in DB (${partnerOrgsList.length})` }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setPartnerTabFilter(f.id)}
                      className={`btn ${partnerTabFilter === f.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      style={{ borderRadius: '12px', padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* View 1: Active Organizations in Database */}
              {partnerTabFilter === 'orgs' ? (
                <div>
                  {/* Approval Filter Bar & Quick Stats */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        onClick={() => { setOrgApprovalFilter('all'); setOrgPage(1); }}
                        className={`btn ${orgApprovalFilter === 'all' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                        style={{ fontSize: '0.8rem', borderRadius: '10px', padding: '6px 14px' }}
                      >
                        All Hubs ({partnerOrgsList.length})
                      </button>
                      <button
                        onClick={() => { setOrgApprovalFilter('pending'); setOrgPage(1); }}
                        className={`btn ${orgApprovalFilter === 'pending' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                        style={{
                          fontSize: '0.8rem',
                          borderRadius: '10px',
                          padding: '6px 14px',
                          color: orgApprovalFilter === 'pending' ? '#FFFFFF' : '#EF4444',
                          borderColor: 'rgba(239, 68, 68, 0.4)',
                          background: orgApprovalFilter === 'pending' ? '#EF4444' : 'transparent'
                        }}
                      >
                        🔴 Pending Verification ({partnerOrgsList.filter(o => !o.is_approved).length})
                      </button>
                      <button
                        onClick={() => { setOrgApprovalFilter('approved'); setOrgPage(1); }}
                        className={`btn ${orgApprovalFilter === 'approved' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                        style={{
                          fontSize: '0.8rem',
                          borderRadius: '10px',
                          padding: '6px 14px',
                          color: orgApprovalFilter === 'approved' ? '#FFFFFF' : '#10B981',
                          borderColor: 'rgba(16, 185, 129, 0.4)',
                          background: orgApprovalFilter === 'approved' ? '#10B981' : 'transparent'
                        }}
                      >
                        🟢 Approved Partners ({partnerOrgsList.filter(o => o.is_approved).length})
                      </button>
                    </div>

                    {/* Search Input */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1', minWidth: '240px', maxWidth: '380px' }}>
                      <div style={{ position: 'relative', width: '100%' }}>
                        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          placeholder="Search orgs by name, district, CPCB..."
                          value={orgSearchQuery}
                          onChange={(e) => { setOrgSearchQuery(e.target.value); setOrgPage(1); }}
                          style={{
                            width: '100%',
                            padding: '8px 12px 8px 34px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '10px',
                            color: 'var(--text-primary)',
                            fontSize: '0.82rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organizations Cards Grid */}
                  {filteredOrgs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                      <AlertTriangle size={36} color="#F59E0B" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>No Organizations Found</h4>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
                        {paginatedOrgs.map(org => (
                          <div 
                            key={org.id} 
                            style={{
                              background: 'var(--bg-card)',
                              border: org.is_approved ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                              borderRadius: '18px',
                              padding: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              gap: '14px',
                              boxShadow: org.is_approved ? '0 4px 16px rgba(16, 185, 129, 0.08)' : 'var(--shadow-sm)',
                              position: 'relative'
                            }}
                          >
                            <div>
                              {/* Top Bar with Org ID & Status Badge */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span className={`badge ${org.is_approved ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                                  <ShieldCheck size={12} />
                                  <span>{org.is_approved ? 'ACCREDITED PARTNER' : 'PENDING APPROVAL'}</span>
                                </span>
                                <code style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: '700' }}>{org.id}</code>
                              </div>

                              <h4 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                                {org.organization_name}
                              </h4>
                              <div style={{ fontSize: '0.82rem', color: 'var(--emerald-primary)', fontWeight: '600', marginBottom: '10px' }}>
                                {org.org_type}
                              </div>

                              {/* Interactive Partnership Status Box */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                background: org.is_approved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.06)',
                                border: org.is_approved ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                marginBottom: '12px'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: org.is_approved ? '#10B981' : '#EF4444',
                                    boxShadow: org.is_approved ? '0 0 8px #10B981' : '0 0 8px #EF4444'
                                  }} />
                                  <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: org.is_approved ? '#10B981' : '#EF4444' }}>
                                      {org.is_approved ? '🟢 Approved Partner' : '🔴 Pending Verification'}
                                    </div>
                                  </div>
                                </div>

                                {/* Clickable Toggle / Radio Button */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleOrgApproval(org.id, Boolean(org.is_approved))}
                                  disabled={togglingOrgId === org.id}
                                  className="btn btn-sm"
                                  style={{
                                    fontSize: '0.74rem',
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: org.is_approved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)',
                                    color: org.is_approved ? '#10B981' : '#EF4444',
                                    border: org.is_approved ? '1px solid #10B981' : '1px solid rgba(239, 68, 68, 0.4)',
                                    cursor: 'pointer'
                                  }}
                                  title={org.is_approved ? 'Click to toggle status to Pending (0)' : 'Click to approve partnership (1)'}
                                >
                                  {togglingOrgId === org.id ? (
                                    <RefreshCw size={12} className="spin" />
                                  ) : org.is_approved ? (
                                    <>
                                      <CheckCircle2 size={13} color="#10B981" />
                                      <span>Approved (1)</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle size={13} color="#EF4444" />
                                      <span>Approve (0)</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Clean Organization Specifications Box (NO passwords) */}
                              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '12px 14px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                                <div>📜 <strong>CPCB License:</strong> <code style={{ color: '#2563EB', fontWeight: '800' }}>{org.cpcb_license}</code></div>
                                <div>👤 <strong>Facility Head:</strong> {org.contact_person}</div>
                                <div>📍 <strong>Location:</strong> {org.district || org.city}, {org.state}</div>
                                <div>📦 <strong>Facility Capacity:</strong> {org.estimated_volume || '50,000 MTA'}</div>
                                <div>✉️ <strong>Official Email:</strong> {org.email}</div>
                              </div>

                              {org.services_required && org.services_required.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                  {org.services_required.slice(0, 3).map((svc, i) => (
                                    <span key={i} style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.08)', color: 'var(--emerald-primary)', padding: '2px 7px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                      ✓ {svc}
                                    </span>
                                  ))}
                                  {org.services_required.length > 3 && (
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '2px 4px' }}>
                                      +{org.services_required.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Bottom Actions */}
                            <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                              <button
                                onClick={() => setSelectedOrgDossier(org)}
                                className="btn btn-primary btn-sm"
                                style={{ flex: 1, fontSize: '0.82rem', justifyContent: 'center', gap: '6px', padding: '9px 14px', fontWeight: '700' }}
                              >
                                <Eye size={14} />
                                <span>Inspect Full Organization Dossier →</span>
                              </button>

                              <button
                                onClick={() => handleDeletePartnerOrganization(org.id, org.organization_name)}
                                className="btn btn-outline btn-sm"
                                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444', padding: '6px 10px' }}
                                title="Revoke & Delete Organization from MySQL"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination Bar */}
                      {totalOrgPages > 1 && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '24px',
                          padding: '12px 18px',
                          background: 'var(--bg-secondary)',
                          borderRadius: '14px',
                          border: '1px solid var(--border-color)',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            Showing <strong>{(orgPage - 1) * ORGS_PER_PAGE + 1} - {Math.min(orgPage * ORGS_PER_PAGE, filteredOrgs.length)}</strong> of <strong>{filteredOrgs.length}</strong> organizations
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => setOrgPage(p => Math.max(1, p - 1))}
                              disabled={orgPage === 1}
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '8px' }}
                            >
                              ← Previous
                            </button>

                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', padding: '0 8px' }}>
                              Page {orgPage} of {totalOrgPages}
                            </span>

                            <button
                              onClick={() => setOrgPage(p => Math.min(totalOrgPages, p + 1))}
                              disabled={orgPage === totalOrgPages}
                              className="btn btn-outline btn-sm"
                              style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '8px' }}
                            >
                              Next →
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* View 2: Partner Applications Submitted via Portal */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {partnerAppsList
                    .filter(a => {
                      if (partnerTabFilter === 'pending') return a.status === 'pending';
                      if (partnerTabFilter === 'approved') return a.status === 'approved';
                      return true;
                    })
                    .map(app => (
                    <div 
                      key={app.id} 
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '18px',
                        padding: '20px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {app.organization_name}
                          </h4>
                          <span className={`badge ${app.status === 'approved' ? 'badge-emerald' : app.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                            {app.status?.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            ID: {app.id}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--emerald-primary)', fontWeight: '600', marginBottom: '8px' }}>
                          🏢 {app.org_type} • 📍 {app.city || 'Metro'}, {app.state || 'India'}
                        </div>

                        <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          👤 Officer: <strong>{app.contact_person}</strong> • ✉️ {app.email} {app.phone ? `• 📞 ${app.phone}` : ''}
                        </div>

                        <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                          📦 Estimated Volume: <strong>{app.estimated_volume}</strong>
                        </div>

                        {app.notes && (
                          <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '10px', fontStyle: 'italic', borderLeft: '3px solid var(--emerald-primary)' }}>
                            "{app.notes}"
                          </div>
                        )}

                        {app.services_required && app.services_required.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {app.services_required.map((svc, i) => (
                              <span key={i} style={{ fontSize: '0.74rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                ✓ {svc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => handleApprovePartnerApplication(app.id)}
                            disabled={approvingPartnerAppId === app.id}
                            className="btn btn-primary btn-sm"
                            style={{ gap: '6px' }}
                          >
                            <CheckCircle2 size={15} />
                            <span>{approvingPartnerAppId === app.id ? 'Generating...' : 'Approve & Issue Credentials'}</span>
                          </button>
                        )}

                        {app.status === 'approved' && app.approved_credentials && (
                          <button
                            onClick={() => setIssuedPartnerCredsModal(app.approved_credentials)}
                            className="btn btn-outline btn-sm"
                            style={{ gap: '6px', borderColor: 'var(--emerald-primary)', color: 'var(--emerald-primary)' }}
                          >
                            <Key size={14} />
                            <span>View Generated Keys</span>
                          </button>
                        )}

                        {app.status === 'pending' && (
                          <button
                            onClick={() => handleRejectPartnerApplication(app.id)}
                            className="btn btn-outline btn-sm"
                            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() => handleDeletePartnerApplication(app.id)}
                          className="btn btn-outline btn-sm"
                          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {partnerAppsList.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                      <Building2 size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ color: 'var(--text-primary)', margin: '0 0 6px' }}>No Partner Applications Found</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                        Applications submitted via the Partner Page form will appear here in real-time.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            )
          )}

          {/* =========================================================================
              TAB: SYSTEM TELEMETRY, HEALTH & DIAGNOSTICS
          ========================================================================= */}
          {adminTab === 'stats' && (
            <AdminSystemHealth />
          )}

          {/* =========================================================================
              TAB: SUPER ADMIN ACCOUNT & SECURITY SETTINGS
          ========================================================================= */}
          {adminTab === 'admin-settings' && (
            <AdminAccountSettings />
          )}

          </div>
        </main>
      </div>



      {/* =========================================================================
          MODAL 2: USER (DONOR / RECYCLER) ORDERS INSPECTOR
      ========================================================================= */}
      {inspectingUserOrders && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>
                  {inspectingUserOrders.userType === 'donor' ? 'DONOR DELIVERY ORDERS' : 'RECYCLER FULFILLMENTS'}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800' }}>
                  {inspectingUserOrders.user?.displayName || inspectingUserOrders.user?.companyName}
                </h3>
              </div>
              <button 
                onClick={() => setInspectingUserOrders(null)}
                style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            {loadingUserOrders ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading pickup orders...</div>
            ) : inspectingUserOrders.orders?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '14px', color: 'var(--text-muted)' }}>
                No delivery orders found for this user profile.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {inspectingUserOrders.orders.map(order => (
                  <div key={order.request_id} style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="font-mono" style={{ fontWeight: '800' }}>{order.request_id}</span>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{order.status}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10B981' }}>₹{order.offered_price}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        📱 {order.device_name} • 🏢 {order.assigned_recycler} • 📍 {order.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: SUPREME EVENT & BANNER IMAGE EDITOR
      ========================================================================= */}
      {editingEvent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <span className="badge badge-red" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>SUPREME EVENT CONTROLLER</span>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800' }}>
                  Edit "{editingEvent.title}"
                </h3>
              </div>
              <button 
                onClick={() => setEditingEvent(null)}
                style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            {eventEditSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10B981', color: '#10B981', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700', marginBottom: '16px' }}>
                ✓ Event and banner image updated live by Supreme Admin!
              </div>
            )}

            <form onSubmit={handleSaveEventEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  value={eventEditForm.title}
                  onChange={(e) => setEventEditForm({ ...eventEditForm, title: e.target.value })}
                  required
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div className="admin-form-2col">
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    👤 Host Person Name *
                  </label>
                  <input
                    type="text"
                    value={eventEditForm.hostName}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, hostName: e.target.value })}
                    required
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                    🏛️ Supporting Organization *
                  </label>
                  <input
                    type="text"
                    value={eventEditForm.organizationName}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, organizationName: e.target.value })}
                    required
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Banner Image with Live Preview */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  🖼️ Banner Image URL (Paste Custom URL)
                </label>
                <input
                  type="url"
                  value={eventEditForm.bannerImage}
                  onChange={(e) => setEventEditForm({ ...eventEditForm, bannerImage: e.target.value })}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.86rem', boxSizing: 'border-box', marginBottom: '8px' }}
                />
                {eventEditForm.bannerImage && (
                  <div style={{ borderRadius: '12px', overflow: 'hidden', height: '140px', background: '#000', border: '1px solid var(--border-color)', position: 'relative' }}>
                    <img 
                      src={eventEditForm.bannerImage} 
                      alt="Banner Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'; }}
                    />
                  </div>
                )}
              </div>

              <div className="admin-form-2col">
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={eventEditForm.category}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, category: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  >
                    <option value="AI & Hardware Hackathon">💻 AI &amp; Hardware</option>
                    <option value="Campus & Corporate Drive">🏫 Campus Collection</option>
                    <option value="GreenTech & Circular Innovation">🔬 GreenTech Challenge</option>
                    <option value="Community Workshop">🛠️ Workshop</option>
                    <option value="Reverse Logistics Sprint">🚚 Reverse Logistics</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Venue Location</label>
                  <input
                    type="text"
                    value={eventEditForm.venueLocation}
                    onChange={(e) => setEventEditForm({ ...eventEditForm, venueLocation: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingEvent(null)} className="btn btn-outline" style={{ flex: 1, padding: '12px', justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" disabled={savingEventEdit} className="btn btn-primary" style={{ flex: 2, padding: '12px', justifyContent: 'center', fontWeight: '800' }}>
                  {savingEventEdit ? 'Saving...' : 'Save & Publish Live Changes →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: PROPOSAL CREDENTIALS ISSUED MODAL
      ========================================================================= */}
      {issuedCredsModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="admin-modal-card" style={{ maxWidth: '540px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.35rem', fontWeight: '800' }}>
                Sub-Admin Credentials Generated!
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                Copy and deliver these credentials to the approved event host.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '16px', marginBottom: '20px', fontSize: '0.86rem' }}>
              <div style={{ marginBottom: '8px' }}>👤 <strong>Host:</strong> {issuedCredsModal.organizerName} ({issuedCredsModal.institution})</div>
              <div style={{ marginBottom: '8px' }}>🏆 <strong>Event:</strong> {issuedCredsModal.eventTitle}</div>
              <div style={{ marginBottom: '8px' }}>🔑 <strong>Username:</strong> <span className="font-mono" style={{ color: '#10B981', fontWeight: '700' }}>{issuedCredsModal.username}</span></div>
              <div style={{ marginBottom: '8px' }}>🔒 <strong>Password:</strong> <span className="font-mono" style={{ color: '#10B981', fontWeight: '700' }}>{issuedCredsModal.password}</span></div>
              <div>🌐 <strong>Portal URL:</strong> <span className="font-mono">{issuedCredsModal.portalUrl}</span></div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Username: ${issuedCredsModal.username}\nPassword: ${issuedCredsModal.password}\nPortal: ${window.location.origin}${issuedCredsModal.portalUrl}`);
                  setCopiedCreds(true);
                  setTimeout(() => setCopiedCreds(false), 2000);
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '11px', justifyContent: 'center', fontWeight: '700' }}
              >
                {copiedCreds ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedCreds ? 'Copied to Clipboard!' : 'Copy All Credentials'}</span>
              </button>

              <button onClick={() => setIssuedCredsModal(null)} className="btn btn-outline" style={{ padding: '11px 20px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: ORGANIZATION PARTNER CREDENTIALS ISSUED MODAL
      ========================================================================= */}
      {issuedPartnerCredsModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="admin-modal-card" style={{ maxWidth: '560px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Organization Credentials Generated!
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                This organization has been activated in MySQL. Share these credentials with the authorized officer.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px', marginBottom: '20px', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>🏢 <strong>Organization:</strong> {issuedPartnerCredsModal.organizationName}</div>
              <div>👤 <strong>Lead Officer:</strong> {issuedPartnerCredsModal.contactPerson}</div>
              <div>📜 <strong>CPCB License Code:</strong> <span className="font-mono" style={{ color: '#F59E0B', fontWeight: '700' }}>{issuedPartnerCredsModal.cpcbLicense}</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--emerald-primary)', fontWeight: '800', textTransform: 'uppercase' }}>
                  🔑 3-Factor Organization Sub-Admin Login Credentials
                </div>
                <div>1. ✉️ <strong>Corporate Email:</strong> <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: '800' }}>{issuedPartnerCredsModal.email}</span></div>
                <div>2. 🆔 <strong>Assigned Organization ID:</strong> <span className="font-mono" style={{ color: 'var(--accent-blue)', fontWeight: '800' }}>{issuedPartnerCredsModal.orgId}</span></div>
                <div>3. 🔒 <strong>Organization Password:</strong> <span className="font-mono" style={{ color: '#10B981', fontWeight: '800' }}>{issuedPartnerCredsModal.password}</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`EcoTrace Organization Sub-Admin Credentials\n--------------------------------------------\nOrganization: ${issuedPartnerCredsModal.organizationName}\n1. Corporate Email: ${issuedPartnerCredsModal.email}\n2. Assigned Org ID: ${issuedPartnerCredsModal.orgId}\n3. Access Password: ${issuedPartnerCredsModal.password}\nCPCB License: ${issuedPartnerCredsModal.cpcbLicense}\nPortal Login URL: ${window.location.origin}`);
                  setCopiedPartnerCreds(true);
                  setTimeout(() => setCopiedPartnerCreds(false), 2000);
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '11px', justifyContent: 'center', fontWeight: '700' }}
              >
                {copiedPartnerCreds ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedPartnerCreds ? 'Copied to Clipboard!' : 'Copy 3-Factor Credentials'}</span>
              </button>

              <button onClick={() => setIssuedPartnerCredsModal(null)} className="btn btn-outline" style={{ padding: '11px 20px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: SUPREME ADMIN GRIEVANCE & DISPUTE INVESTIGATION CONSOLE
      ========================================================================= */}
      {resolvingTicket && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="admin-modal-card" style={{ maxWidth: '640px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <span className="badge badge-red" style={{ fontSize: '0.72rem', marginBottom: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
                  SUPREME ADMIN DISPUTE RESOLUTION
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Investigate Ticket {resolvingTicket.ticket_id}
                </h3>
              </div>

              <button 
                onClick={() => setResolvingTicket(null)}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Grievance Details Box */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px', marginBottom: '16px', fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Category:</span>
                <strong>{resolvingTicket.category}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Complainant:</span>
                <span>{resolvingTicket.user_name} ({resolvingTicket.user_email}) — <strong style={{ textTransform: 'capitalize' }}>{resolvingTicket.user_role}</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Priority:</span>
                <strong style={{ color: resolvingTicket.priority === 'Urgent' ? '#EF4444' : '#10B981' }}>{resolvingTicket.priority}</strong>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Subject: <strong>{resolvingTicket.subject}</strong></div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.45', background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  {resolvingTicket.description}
                </div>
              </div>
            </div>

            {/* Admin Action Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Update Grievance Status *
                </label>
                <select 
                  value={selectedStatusInput}
                  onChange={(e) => setSelectedStatusInput(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                >
                  <option value="Pending">Pending Investigation (SLA 48h active)</option>
                  <option value="In Review">In Review (Supreme Admin actively investigating with field staff)</option>
                  <option value="Resolved">Resolved (Resolution notice will be delivered to user)</option>
                  <option value="Dismissed">Dismissed (Complaint closed without action)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Official Supreme Admin Resolution Notice to User *
                </label>
                <textarea 
                  rows={4}
                  placeholder="Explain findings, driver rescheduling, UPI refund verification, or instructions for the user..."
                  value={resolutionNotesInput}
                  onChange={(e) => setResolutionNotesInput(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.86rem', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button 
                  type="button" 
                  onClick={() => setResolvingTicket(null)} 
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleSaveGrievanceResolution}
                  className="btn btn-primary btn-sm"
                  disabled={updatingGrievance}
                >
                  {updatingGrievance ? (
                    <>
                      <RefreshCw size={14} className="spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} /> Commit Resolution &amp; Notify User
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: PROPOSAL VERIFICATION & SUB-ADMIN ONBOARDING MODAL
      ========================================================================= */}
      {selectedProposalForVerification && (
        <AdminProposalVerificationModal
          proposal={selectedProposalForVerification}
          onClose={() => setSelectedProposalForVerification(null)}
          onApprove={handleConfirmApproveProposal}
          approving={Boolean(approvingProposalId)}
        />
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
