import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  Navigation, 
  Zap, 
  Leaf, 
  Building2, 
  Smartphone, 
  ChevronRight, 
  AlertCircle,
  Share2,
  Layers,
  Compass,
  DollarSign,
  Package,
  PlusCircle,
  Calendar,
  Sparkles,
  Send,
  User,
  Radio,
  Sliders,
  Warehouse,
  QrCode,
  Printer,
  X,
  ExternalLink
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { pickupApi, recyclersApi } from '../services/api';

// Directory of Regional Coordinates, Origin Depots & Routes
export const DISTRICT_REGIONS = {
  'prayagraj': {
    name: 'Prayagraj',
    state: 'Uttar Pradesh',
    center: [25.4484, 81.8349],
    zoom: 13,
    rtoCode: 'UP-70',
    originDepotName: 'EcoGreen Phaphamau Smelting Base & Logistics Depot',
    originCoords: [25.4180, 81.8550],
    destCoords: [25.4526, 81.8349],
    defaultAddress: 'B-42 Civil Lines, Prayagraj, UP 211001',
    routePoints: [
      [25.4180, 81.8550],
      [25.4245, 81.8510],
      [25.4310, 81.8470],
      [25.4380, 81.8420],
      [25.4450, 81.8380],
      [25.4490, 81.8360],
      [25.4526, 81.8349]
    ],
    fuzzRadiusMeters: 380,
    areaDesc: 'Civil Lines / MNNIT Teliarganj Corridor'
  },
  'lucknow': {
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    center: [26.8467, 80.9462],
    zoom: 13,
    rtoCode: 'UP-32',
    originDepotName: 'EcoGreen Amausi Material Recovery Depot',
    originCoords: [26.7950, 80.8850],
    destCoords: [26.8520, 80.9420],
    defaultAddress: 'Sector 4, Gomti Nagar Phase 2, Lucknow, UP 226010',
    routePoints: [
      [26.7950, 80.8850],
      [26.8080, 80.8980],
      [26.8210, 80.9120],
      [26.8340, 80.9260],
      [26.8430, 80.9350],
      [26.8520, 80.9420]
    ],
    fuzzRadiusMeters: 400,
    areaDesc: 'Gomti Nagar / Hazratganj Corridor'
  },
  'kanpur': {
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    center: [26.4499, 80.3319],
    zoom: 13,
    rtoCode: 'UP-78',
    originDepotName: 'Panki Industrial E-Waste Logistics Base',
    originCoords: [26.4100, 80.2900],
    destCoords: [26.4650, 80.3450],
    defaultAddress: 'Plot 18, Swaroop Nagar, Mall Road, Kanpur, UP 208002',
    routePoints: [
      [26.4100, 80.2900],
      [26.4220, 80.3020],
      [26.4350, 80.3150],
      [26.4480, 80.3280],
      [26.4580, 80.3370],
      [26.4650, 80.3450]
    ],
    fuzzRadiusMeters: 380,
    areaDesc: 'Swaroop Nagar / Civil Lines Corridor'
  },
  'varanasi': {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    center: [25.3176, 82.9739],
    zoom: 13,
    rtoCode: 'UP-65',
    originDepotName: 'Ramnagar Industrial Smelter Base',
    originCoords: [25.2850, 82.9350],
    destCoords: [25.3280, 82.9850],
    defaultAddress: 'Near BHU Main Gate, Lanka, Varanasi, UP 221005',
    routePoints: [
      [25.2850, 82.9350],
      [25.2960, 82.9470],
      [25.3070, 82.9590],
      [25.3180, 82.9710],
      [25.3280, 82.9850]
    ],
    fuzzRadiusMeters: 420,
    areaDesc: 'BHU / Assi Ghat Corridor'
  }
};

// Helper: Match district name to regional config
const getRegionalLogisticsConfig = (districtName) => {
  if (!districtName) return DISTRICT_REGIONS.prayagraj;
  const key = districtName.toLowerCase().trim();
  if (key.includes('lucknow')) return DISTRICT_REGIONS.lucknow;
  if (key.includes('kanpur')) return DISTRICT_REGIONS.kanpur;
  if (key.includes('varanasi') || key.includes('kashi') || key.includes('banaras')) return DISTRICT_REGIONS.varanasi;
  return DISTRICT_REGIONS.prayagraj;
};

export const DUMMY_GEOLOGISTICS_ORDER = {
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
  district: 'Prayagraj',
  assignedRecycler: '[DUMMY] GreenDrop Recyclers (Hub #4)',
  assignedRecyclerId: 'rec_hub_04',
  assignedAgentName: 'Rajesh Kumar (EV Pilot)',
  assignedAgentPhone: '+91 98765 43210',
  assignedAgentVehicle: 'UP-70-EC-8842 (Electric Van)',
  driverName: 'Rajesh Kumar (EV Pilot)',
  driverPhone: '+91 98765 43210',
  driverVehicle: 'UP-70-EC-8842 (Electric Van)',
  orgName: 'GreenDrop Circular Metals Ltd',
  status: 'IN_TRANSIT',
  statusLabel: '⚡ [DUMMY STATUS] Driver En Route to Doorstep',
  is_dummy: true,
  created_at: '2026-08-17T18:00:00Z',
  deviceImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
};

export const GeoLogisticsPage = ({ onNavigate, selectedOrder = null, selectedLot = null }) => {
  const { currentUser, userRole } = useAuth();
  const { theme } = useTheme();

  const isRecycler = userRole === 'recycler';
  const recyclerCompanyName = currentUser?.companyName || 'EcoGreen Smelters & Refining Ltd';
  const recyclerOfficerName = currentUser?.displayName || currentUser?.name || 'Siddharth Shukla';
  const cpcbCode = currentUser?.cpcbLicense || 'CPCB-UP-2026-REC-0891';

  // Navigation Target Mode: 'lot' (Navigating to Org Branch Base) or 'order' (Doorstep Donor Pickup)
  const [navTargetType, setNavTargetType] = useState(selectedLot ? 'lot' : 'order');
  const [activeLot, setActiveLot] = useState(selectedLot || null);
  const [activeOrder, setActiveOrder] = useState(selectedOrder || DUMMY_GEOLOGISTICS_ORDER);
  
  // View Mode: 'tracking' (Live GPS Map) or 'list' (Jobs / Lots list)
  const [viewMode, setViewMode] = useState('tracking');
  const [ordersList, setOrdersList] = useState([DUMMY_GEOLOGISTICS_ORDER]);
  const [lotsList, setLotsList] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [mapLayer, setMapLayer] = useState('streets'); // 'streets', 'satellite', 'dark'
  const [filterStatus, setFilterStatus] = useState('all');
  const [showGatePassModal, setShowGatePassModal] = useState(false);

  // Active district determination
  const userDistrict = currentUser?.district || 'Prayagraj';
  const currentRegion = getRegionalLogisticsConfig(activeOrder?.district || activeLot?.targetHubDistrict || userDistrict);

  // Fetch all orders & lots on load directly from MySQL database with dummy fallback
  const fetchData = async () => {
    try {
      const [pickupRes, lotsRes] = await Promise.all([
        pickupApi.getAll().catch(() => ({ pickups: [] })),
        recyclersApi.getDeliveryLots({ recyclerId: currentUser?.id || 'AUTH-REC-004', cpcbLicense: cpcbCode }).catch(() => ({ lots: [] }))
      ]);

      if (pickupRes.pickups && Array.isArray(pickupRes.pickups) && pickupRes.pickups.length > 0) {
        if (isRecycler) {
          const myOrgOrders = pickupRes.pickups.filter(o => {
            const assigned = (o.assignedRecycler || '').toLowerCase();
            const myCompany = recyclerCompanyName.toLowerCase();
            const myOfficer = recyclerOfficerName.toLowerCase();
            return assigned.includes(myCompany) || 
                   assigned.includes(myOfficer) || 
                   assigned.includes('ecogreen') ||
                   (currentUser?.id && o.assignedRecyclerId === currentUser.id);
          });
          setOrdersList(myOrgOrders.length > 0 ? myOrgOrders : [DUMMY_GEOLOGISTICS_ORDER]);
          if (!selectedOrder && !selectedLot && myOrgOrders.length > 0) {
            setActiveOrder(myOrgOrders[0]);
          }
        } else {
          setOrdersList(pickupRes.pickups);
          if (!selectedOrder && !selectedLot && pickupRes.pickups.length > 0) {
            setActiveOrder(pickupRes.pickups[0]);
          }
        }
      } else {
        setOrdersList([DUMMY_GEOLOGISTICS_ORDER]);
        if (!selectedOrder && !selectedLot) {
          setActiveOrder(DUMMY_GEOLOGISTICS_ORDER);
        }
      }

      if (lotsRes.success && Array.isArray(lotsRes.lots)) {
        setLotsList(lotsRes.lots);
        if (selectedLot) {
          const match = lotsRes.lots.find(l => l.lotId === selectedLot.lotId);
          if (match) setActiveLot(match);
        }
      }
    } catch (err) {
      console.warn('Using dummy GeoLogistics order fallback:', err);
      setOrdersList([DUMMY_GEOLOGISTICS_ORDER]);
      setActiveOrder(DUMMY_GEOLOGISTICS_ORDER);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userDistrict, isRecycler, recyclerCompanyName]);

  useEffect(() => {
    if (selectedLot) {
      setActiveLot(selectedLot);
      setNavTargetType('lot');
      setViewMode('tracking');
    } else if (selectedOrder) {
      setActiveOrder(selectedOrder);
      setNavTargetType('order');
      setViewMode('tracking');
    }
  }, [selectedOrder, selectedLot]);

  // Map and Route State
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const fuzzCircleRef = useRef(null);

  // Live Driver Simulation States
  const [etaMinutes, setEtaMinutes] = useState(8);
  const [distanceKm, setDistanceKm] = useState(2.4);
  const [driverSpeed, setDriverSpeed] = useState('32 km/h');
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isSimulating, setIsSimulating] = useState(true);

  // Modals & Chat State
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [broadcastAlertSent, setBroadcastAlertSent] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'recycler', text: `EcoGreen Fleet EV Van is en route. ETA approx 8 mins.`, time: '10:02 AM' },
    { sender: 'supervisor', text: 'Gate 3 scale is cleared and ready for inspection.', time: '10:04 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Target Destination Coords
  const destCoords = navTargetType === 'lot' && activeLot?.targetCoordsLat
    ? [activeLot.targetCoordsLat, activeLot.targetCoordsLng]
    : currentRegion.destCoords;

  const originCoords = currentRegion.originCoords;
  const routePoints = navTargetType === 'lot' && activeLot?.targetCoordsLat
    ? [
        originCoords,
        [originCoords[0] + (destCoords[0] - originCoords[0]) * 0.25, originCoords[1] + (destCoords[1] - originCoords[1]) * 0.25],
        [originCoords[0] + (destCoords[0] - originCoords[0]) * 0.50, originCoords[1] + (destCoords[1] - originCoords[1]) * 0.50],
        [originCoords[0] + (destCoords[0] - originCoords[0]) * 0.75, originCoords[1] + (destCoords[1] - originCoords[1]) * 0.75],
        destCoords
      ]
    : currentRegion.routePoints;

  const [routeProgressIdx, setRouteProgressIdx] = useState(1);

  // Helper: Tile URL based on selected layer
  const getTileConfig = (layerType, isDark) => {
    if (layerType === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri World Imagery &amp; Google Earth Satellite'
      };
    }
    if (layerType === 'dark' || (layerType === 'streets' && isDark)) {
      return {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> OpenStreetMap'
      };
    }
    return {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> OpenStreetMap'
    };
  };

  // Initialize and Render Map when in 'tracking' viewMode
  useEffect(() => {
    if (viewMode !== 'tracking' || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const isDark = theme === 'dark';
    const tileConfig = getTileConfig(mapLayer, isDark);

    const map = L.map(mapContainerRef.current, {
      center: currentRegion.center,
      zoom: currentRegion.zoom,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer(tileConfig.url, {
      maxZoom: 19,
      attribution: tileConfig.attribution
    }).addTo(map);

    // 1. ORIGIN DEPOT / FIELD START MARKER
    const depotIcon = L.divIcon({
      className: 'custom-depot-marker',
      html: `
        <div style="background: #064E3B; border: 2.5px solid #10B981; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 16px; box-shadow: 0 0 16px rgba(16, 185, 129, 0.6);">
          ${navTargetType === 'lot' ? '📦' : '🏭'}
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    L.marker(originCoords, { icon: depotIcon })
      .addTo(map)
      .bindPopup(`<b>${navTargetType === 'lot' ? 'Route Field Departure Point' : currentRegion.originDepotName}</b><br><span style="color:#10B981;font-weight:700;">EcoTrace Authorized Fleet</span>`);

    // 2. DESTINATION PIN (Branch Base or Donor Doorstep)
    const isLotNav = navTargetType === 'lot';
    const destIcon = L.divIcon({
      className: 'custom-dest-marker',
      html: `
        <div style="background: ${isLotNav ? '#064E3B' : '#1E3A8A'}; border: 2.5px solid ${isLotNav ? '#10B981' : '#3B82F6'}; border-radius: 50%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 20px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);">
          ${isLotNav ? '🏢' : '📍'}
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21]
    });

    const destTitle = isLotNav 
      ? `<b>🏢 Destination Base: ${activeLot?.targetBranchName || activeLot?.targetOrgName || 'Smelting Base'}</b><br>${activeLot?.targetBranchAddress || 'Central Smelting Facility'}`
      : isRecycler
      ? `<b>👤 Donor Pickup: ${activeOrder?.donorName || 'Donor'}</b><br>📍 ${activeOrder?.address || currentRegion.defaultAddress}`
      : `<b>📍 Your Doorstep Pickup Point</b><br>${activeOrder?.address || currentUser?.address || currentRegion.defaultAddress}`;

    L.marker(destCoords, { icon: destIcon })
      .addTo(map)
      .bindPopup(destTitle);

    // Geofence Circle around Destination
    fuzzCircleRef.current = L.circle(destCoords, {
      color: isLotNav ? '#10B981' : '#3B82F6',
      fillColor: isLotNav ? '#10B981' : '#3B82F6',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '5, 5',
      radius: currentRegion.fuzzRadiusMeters
    }).addTo(map);

    // 3. ROUTE POLYLINE
    routePolylineRef.current = L.polyline(routePoints, {
      color: '#10B981',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(map);

    // 4. MOVING RECYCLER EV VAN MARKER
    const vanHtml = `
      <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; inset: 0; background: rgba(16, 185, 129, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="background: linear-gradient(135deg, #10B981, #059669); border: 2.5px solid #FFFFFF; border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.4); position: relative; z-index: 2;">
          🚐
        </div>
      </div>
    `;

    const driverIcon = L.divIcon({
      className: 'custom-driver-van-marker',
      html: vanHtml,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    const startPos = routePoints[routeProgressIdx] || routePoints[0];
    const driverVanTitle = isLotNav 
      ? `<b>EcoTrace Green Fleet EV Van (${activeOrder?.assignedAgentVehicle || activeOrder?.vanNo || 'UP-70-AB-1042'})</b><br>En route to organization branch base`
      : isRecycler
      ? `<b>🚐 Your Green EV Van (${activeOrder?.assignedAgentVehicle || activeOrder?.vanNo || 'UP-70-AB-1042'})</b><br>En route to donor doorstep`
      : `<b>👨‍✈️ ${activeOrder?.assignedAgentName || activeOrder?.driverName || 'Rahul Sharma'}</b><br>EcoTrace EV Pilot (${activeOrder?.assignedAgentVehicle || activeOrder?.vanNo || 'UP-70-AB-1042'})<br>🏢 ${activeOrder?.assignedRecycler || activeOrder?.orgName || 'EcoGreen Smelters Ltd'}`;

    driverMarkerRef.current = L.marker(startPos, { icon: driverIcon })
      .addTo(map)
      .bindPopup(driverVanTitle);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, activeOrder, activeLot, navTargetType, mapLayer, currentRegion]);

  // Live Driver Movement Simulation Tick
  useEffect(() => {
    if (!isSimulating || viewMode !== 'tracking') return;
    const interval = setInterval(() => {
      setRouteProgressIdx((prev) => {
        const next = prev < routePoints.length - 1 ? prev + 1 : prev;
        if (driverMarkerRef.current && routePoints[next]) {
          driverMarkerRef.current.setLatLng(routePoints[next]);
        }
        const remainingSteps = routePoints.length - 1 - next;
        const newKm = (remainingSteps * 0.6).toFixed(1);
        const newEta = Math.max(1, remainingSteps * 2);
        setDistanceKm(newKm);
        setEtaMinutes(newEta);

        if (next >= routePoints.length - 1) {
          setCurrentStepIndex(3);
          setDriverSpeed('0 km/h (Arrived at Gate)');
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isSimulating, viewMode, routePoints]);

  const handleRecenterDriver = () => {
    if (mapInstanceRef.current && routePoints[routeProgressIdx]) {
      mapInstanceRef.current.setView(routePoints[routeProgressIdx], 15);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = { sender: 'recycler', text: inputMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  const handleQuickBroadcast = (text) => {
    const newMsg = { sender: 'recycler', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setBroadcastAlertSent(text);
    setTimeout(() => setBroadcastAlertSent(''), 4000);
  };

  // Auto-resize leaflet map on viewport resize or mobile orientation switch
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 350);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [viewMode, navTargetType]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* 1. TOP HEADER */}
      <Header currentView="geologistics" onNavigate={onNavigate} />

      {/* 2. MAIN LOGISTICS VIEW */}
      <main style={{ flex: 1, padding: '16px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(12px, 3vw, 24px)' }}>
          
          {/* Breadcrumb & Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate && onNavigate(isRecycler ? 'recycler' : 'donor-dash')}
                style={{ background: 'transparent', border: 'none', color: 'var(--emerald-primary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                <ArrowLeft size={15} />
                <span>{isRecycler ? 'Recycler Dashboard' : 'Dashboard'}</span>
              </button>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
                {navTargetType === 'lot' ? 'Depot Branch Delivery GPS' : 'Doorstep Pickup Telemetry'}
              </span>
            </div>

            {/* Switch between Doorstep Orders and Delivery Lots */}
            <div className="geologistics-tabs-container">
              <button
                onClick={() => {
                  setNavTargetType('order');
                  if (ordersList.length > 0 && !activeOrder) setActiveOrder(ordersList[0]);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: navTargetType === 'order' ? 'var(--emerald-primary)' : 'transparent',
                  color: navTargetType === 'order' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Truck size={14} />
                <span>Doorstep Pickups ({ordersList.length})</span>
              </button>

              <button
                onClick={() => {
                  setNavTargetType('lot');
                  if (lotsList.length > 0 && !activeLot) setActiveLot(lotsList[0]);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: navTargetType === 'lot' ? 'var(--emerald-primary)' : 'transparent',
                  color: navTargetType === 'lot' ? '#FFFFFF' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Warehouse size={14} />
                <span>Depot Branch Lots ({lotsList.length})</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              VIEW 1: LIVE MAP GPS TRACKING INTERFACE
              ========================================================================= */}
          {viewMode === 'tracking' && (
            <div className="animate-fadeIn">
              
              {/* TOP TELEMETRY HERO BANNER */}
              <div className="geologistics-telemetry-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                    {navTargetType === 'lot' ? <Warehouse size={24} /> : <Truck size={24} />}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-amber" style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '2px 8px' }}>
                        ⚡ MOCK / DUMMY ORDER
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                        ● LIVE GPS DISPATCH
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: '700', wordBreak: 'break-all' }}>
                        {navTargetType === 'lot' ? `Lot: ${activeLot?.lotName || activeLot?.lotId || 'Depot Delivery'}` : `Job: ${activeOrder?.requestId || 'REQ-8801'}`}
                      </span>
                      {/* Role indicator pill */}
                      <span style={{ fontSize: '0.72rem', color: '#CBD5E1', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                        {isRecycler ? (navTargetType === 'lot' ? 'Base Delivery' : 'Pickup Task') : 'Doorstep Pickup'}
                      </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)', fontWeight: '800', margin: '4px 0 2px', color: '#FFFFFF', lineHeight: 1.3, wordBreak: 'break-word' }}>
                      {navTargetType === 'lot' 
                        ? `En Route to Base: ${activeLot?.targetBranchName || 'Phaphamau Smelting Base'}`
                        : isRecycler
                        ? `Donor Pickup: ${activeOrder?.deviceName || 'Electronic Device'}`
                        : `Doorstep Pickup in Transit: ${activeOrder?.deviceName || 'Electronic Device'}`}
                    </h2>

                    <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.35, wordBreak: 'break-word' }}>
                      {navTargetType === 'lot' 
                        ? `🏢 ${activeLot?.targetBranchAddress || 'Sector 4, Phaphamau Industrial Corridor, Prayagraj'}`
                        : isRecycler
                        ? `📍 Donor Address: ${activeOrder?.address || 'B-42 Civil Lines, Prayagraj'}`
                        : `📍 Delivering to Your Doorstep: ${activeOrder?.address || currentUser?.address || 'B-42 Civil Lines, Prayagraj'}`}
                    </div>
                  </div>
                </div>

                <div className="geologistics-eta-block">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#93C5FD', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>ESTIMATED ARRIVAL</div>
                    <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: '900', color: '#10B981', lineHeight: '1.1' }}>
                      ~{etaMinutes} Mins
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#CBD5E1' }}>{distanceKm} km remaining</div>
                  </div>

                  {navTargetType === 'lot' && (
                    <button
                      onClick={() => setShowGatePassModal(true)}
                      className="btn btn-primary"
                      style={{ padding: '8px 14px', borderRadius: '10px', gap: '6px', fontWeight: '800', fontSize: '0.8rem', flexShrink: 0 }}
                    >
                      <QrCode size={15} />
                      <span>Gate Pass (QR)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SPLIT GRID: MAP & DETAILS OVERLAY CARD */}
              <div className="geologistics-tracking-grid">
                
                {/* 1. LEAFLET GPS MAP CONTAINER */}
                <div className="geologistics-map-card">
                  
                  {/* Floating Map Layer Toolbar */}
                  <div className="geologistics-map-toolbar">
                    <button
                      onClick={() => setMapLayer('streets')}
                      style={{ padding: '5px 9px', borderRadius: '7px', border: 'none', background: mapLayer === 'streets' ? '#10B981' : 'transparent', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Streets
                    </button>
                    <button
                      onClick={() => setMapLayer('satellite')}
                      style={{ padding: '5px 9px', borderRadius: '7px', border: 'none', background: mapLayer === 'satellite' ? '#10B981' : 'transparent', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Satellite
                    </button>
                    <button
                      onClick={() => setMapLayer('dark')}
                      style={{ padding: '5px 9px', borderRadius: '7px', border: 'none', background: mapLayer === 'dark' ? '#10B981' : 'transparent', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Dark
                    </button>
                    <button
                      onClick={handleRecenterDriver}
                      style={{ padding: '5px 9px', borderRadius: '7px', border: 'none', background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      title="Center on Driver"
                    >
                      <Navigation size={12} />
                      <span>Van</span>
                    </button>
                  </div>

                  {/* Leaflet Map Div */}
                  <div ref={mapContainerRef} style={{ flex: 1, width: '100%', height: '100%', minHeight: '260px' }} />

                  {/* Map Footer Bar */}
                  <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', flexWrap: 'wrap', gap: '8px', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                        Van: {activeOrder?.assignedAgentVehicle || activeOrder?.vanNo || 'UP-70-AB-1042'}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {navTargetType === 'lot'
                          ? <>Target: <strong>{activeLot?.targetBranchName || 'Branch Base'}</strong></>
                          : isRecycler
                          ? <>Pickup Target: <strong>{activeOrder?.donorName || 'Donor'}</strong></>
                          : <>EV Pilot: <strong>{activeOrder?.assignedAgentName || activeOrder?.driverName || 'Rahul Sharma'}</strong></>}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                      <span>Speed: <strong style={{ color: '#10B981' }}>{driverSpeed}</strong></span>
                      <span>•</span>
                      <span>Battery: <strong style={{ color: '#10B981' }}>84% EV</strong></span>
                    </div>
                  </div>
                </div>

                {/* 2. DETAILS & INTERACTION PANEL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
                  
                  {/* CASE A: RECYCLER NAVIGATING TO ORGANIZATION BRANCH BASE */}
                  {navTargetType === 'lot' ? (
                    <>
                      {/* Destination Branch & Gatehouse Supervisor Card */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #064E3B, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#FFFFFF', flexShrink: 0 }}>
                            🏢
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                              {activeLot?.targetBranchName || 'Phaphamau Industrial Smelting Base'}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#60A5FA', fontWeight: '700', marginTop: '2px' }}>
                              {activeLot?.targetOrgName || 'EcoGreen Smelters & Refining Ltd'}
                            </div>
                          </div>
                        </div>

                        {/* Supervisor Contact & Direct Call */}
                        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '12px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Gatehouse &amp; Scale Supervisor:
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                {activeLot?.branchManagerName || 'Vikrant Mehra (Supervisor)'}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#10B981', fontFamily: 'monospace', marginTop: '2px' }}>
                                {activeLot?.branchManagerPhone || '+91 94150 45678'}
                              </div>
                            </div>

                            <a 
                              href={`tel:${(activeLot?.branchManagerPhone || '9415045678').replace(/[^0-9]/g, '')}`}
                              className="btn btn-primary btn-sm"
                              style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '5px', textDecoration: 'none', borderRadius: '8px' }}
                            >
                              <Phone size={13} />
                              <span>Call Dock</span>
                            </a>
                          </div>
                        </div>

                        {/* Physical Address */}
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Physical Dock Address: </span>
                          <span>{activeLot?.targetBranchAddress || 'Sector 4, Phaphamau Industrial Corridor, Prayagraj, UP 211013'}</span>
                        </div>
                      </div>

                      {/* Lot Manifest Summary Card */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Delivery Lot Handover Manifest
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                            {activeLot?.lotName || activeLot?.lotId}
                          </div>
                          <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                            Pass: {activeLot?.handoverPassCode}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.82rem', marginBottom: '12px' }}>
                          <div>Total Weight: <strong style={{ color: '#10B981' }}>{activeLot?.totalWeightKg} kg</strong></div>
                          <div>Total Items: <strong>{activeLot?.deviceCount} Units</strong></div>
                          <div>Valuation: <strong style={{ color: '#3B82F6' }}>₹{activeLot?.totalValuation?.toLocaleString('en-IN')}</strong></div>
                          <div>Handover Date: <strong>{activeLot?.scheduledDate}</strong></div>
                        </div>

                        {/* Gatehouse Direct Action */}
                        <button
                          onClick={() => setShowGatePassModal(true)}
                          className="btn btn-primary"
                          style={{ width: '100%', padding: '12px', justifyContent: 'center', fontWeight: '800', gap: '8px', borderRadius: '12px' }}
                        >
                          <QrCode size={16} />
                          <span>Arrived at Gatehouse → Show Gate Pass</span>
                        </button>
                      </div>
                    </>
                  ) : isRecycler ? (
                    /* CASE B1: RECYCLER VIEWING DONOR PICKUP (SHOWS DONOR INFO TO RECYCLER) */
                    <>
                      {/* Donor Contact Card */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                          DONOR CONTACT &amp; PICKUP LOCATION
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#FFFFFF', flexShrink: 0 }}>
                            👤
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                              {activeOrder?.donorName || 'Aarav Sharma'}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'monospace' }}>
                              {activeOrder?.donorPhone || '+91 98765 43210'}
                            </div>
                          </div>
                          <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                            Verified Donor
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                          <a 
                            href={`tel:${(activeOrder?.donorPhone || '9876543210').replace(/[^0-9]/g, '')}`}
                            className="btn btn-primary"
                            style={{ padding: '10px 8px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px', textDecoration: 'none' }}
                          >
                            <Phone size={14} />
                            <span>Call Donor</span>
                          </a>

                          <button
                            onClick={() => setChatModalOpen(true)}
                            className="btn btn-secondary"
                            style={{ padding: '10px 8px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px' }}
                          >
                            <MessageSquare size={14} />
                            <span>Live Chat</span>
                          </button>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem' }}>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                            DONOR DOORSTEP ADDRESS:
                          </div>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                            {activeOrder?.address || 'B-42 Civil Lines, Prayagraj, UP 211001'}
                          </div>
                        </div>
                      </div>

                      {/* Device & Disbursement Card (For Recycler to Pay Out) */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>DEVICE TO COLLECT</div>
                            <div style={{ fontSize: '0.96rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
                              {activeOrder?.deviceName || 'Electronic Device'}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>DISBURSEMENT TO PAY</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
                              ₹{parseFloat(activeOrder?.offeredPrice || 0).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* CASE B2: DONOR VIEWING PICKUP (SHOWS ASSIGNED RECYCLER & DRIVER PILOT INFO TO DONOR) */
                    <>
                      {/* Assigned Recycler & Driver Pilot Card */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                          ASSIGNED RECYCLER &amp; EV LOGISTICS PILOT
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #064E3B, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', color: '#FFFFFF', flexShrink: 0, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)' }}>
                            👨‍✈️
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                                {activeOrder?.assignedAgentName || activeOrder?.driverName || 'Rahul Sharma'}
                              </span>
                              <span style={{ fontSize: '0.65rem', background: '#10B981', color: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>
                                EV PILOT
                              </span>
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#60A5FA', fontWeight: '700', marginTop: '2px' }}>
                              🏢 {activeOrder?.assignedRecycler || activeOrder?.orgName || 'EcoGreen Smelters Ltd'}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              Tata Ace Green EV • <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-primary)' }}>{activeOrder?.assignedAgentVehicle || activeOrder?.vanNo || 'UP-70-AB-1042'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Driver Contact & Call Actions */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                          <a 
                            href={`tel:${(activeOrder?.assignedAgentPhone || activeOrder?.driverPhone || '9415012042').replace(/[^0-9]/g, '')}`}
                            className="btn btn-primary"
                            style={{ padding: '10px 8px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px', textDecoration: 'none' }}
                          >
                            <Phone size={14} />
                            <span>Call Driver</span>
                          </a>

                          <button
                            onClick={() => setChatModalOpen(true)}
                            className="btn btn-secondary"
                            style={{ padding: '10px 8px', fontSize: '0.82rem', fontWeight: '700', justifyContent: 'center', gap: '6px', borderRadius: '10px' }}
                          >
                            <MessageSquare size={14} />
                            <span>Live Chat</span>
                          </button>
                        </div>

                        {/* Donor's Own Destination Address */}
                        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem' }}>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                            YOUR DOORSTEP PICKUP LOCATION:
                          </div>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                            {activeOrder?.address || currentUser?.address || 'Flat 402, Ganga Heights, Civil Lines, Prayagraj, UP 211001'}
                          </div>
                        </div>
                      </div>

                      {/* Device to Handover & Direct UPI Payout Card (For Donor) */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>DEVICE TO HANDOVER</div>
                            <div style={{ fontSize: '0.96rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
                              {activeOrder?.deviceName || 'Electronic Device'}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700' }}>EXPECTED UPI PAYOUT</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
                              ₹{parseFloat(activeOrder?.offeredPrice || 0).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: JOBS & LOTS LIST SELECTION INTERFACE
              ========================================================================= */}
          {viewMode === 'list' && (
            <div className="animate-fadeIn">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 16px' }}>
                {navTargetType === 'lot' 
                  ? 'Select Central Depot Delivery Lot to Track Route' 
                  : isRecycler
                  ? 'Select Doorstep Pickup Order to Track Route & Collect Device'
                  : 'Select Your Booked Pickup Order to Track Live Driver'}
              </h3>

              <div className="geologistics-jobs-grid">
                {navTargetType === 'lot' ? (
                  lotsList.map(lot => (
                    <div
                      key={lot.lotId}
                      onClick={() => {
                        setActiveLot(lot);
                        setViewMode('tracking');
                      }}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'var(--shadow-sm)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', fontSize: '0.84rem' }}>{lot.lotId}</span>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{lot.status}</span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>{lot.lotName || lot.lotId}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🏢 Base: <strong>{lot.targetBranchName}</strong></div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>⚖️ {lot.totalWeightKg} kg • {lot.deviceCount} items • 📅 {lot.scheduledDate}</div>
                      <button className="btn btn-primary btn-sm" style={{ marginTop: '6px', justifyContent: 'center' }}>
                        Open Live GPS Route →
                      </button>
                    </div>
                  ))
                ) : (
                  ordersList.map(ord => (
                    <div
                      key={ord.requestId}
                      onClick={() => {
                        setActiveOrder(ord);
                        setViewMode('tracking');
                      }}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'var(--shadow-sm)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="badge badge-amber" style={{ fontSize: '0.66rem', fontWeight: '800', background: 'rgba(245, 158, 11, 0.92)', color: '#000000', padding: '2px 6px' }}>
                            ⚡ MOCK / DUMMY
                          </span>
                          <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#10B981', fontSize: '0.84rem' }}>{ord.requestId}</span>
                        </div>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{ord.status}</span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>{ord.deviceName}</h4>
                      
                      {isRecycler ? (
                        <>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            👤 Donor: <strong>{ord.donorName}</strong> • Disburse: <strong style={{ color: '#10B981' }}>₹{ord.offeredPrice}</strong>
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>📍 {ord.address}</div>
                          <button className="btn btn-primary btn-sm" style={{ marginTop: '6px', justifyContent: 'center' }}>
                            Navigate to Donor →
                          </button>
                        </>
                      ) : (
                        <>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            🏢 Recycler: <strong>{ord.assignedRecycler || ord.orgName || 'EcoGreen Smelters'}</strong> • Payout: <strong style={{ color: '#10B981' }}>₹{ord.offeredPrice}</strong>
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            👨‍✈️ Pilot: <strong>{ord.assignedAgentName || ord.driverName || 'Rahul Sharma'}</strong> • 📍 {ord.address}
                          </div>
                          <button className="btn btn-primary btn-sm" style={{ marginTop: '6px', justifyContent: 'center' }}>
                            Track Live EV Pilot →
                          </button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* =========================================================================
          LIVE CHAT MODAL (FOR DIRECT DONOR / DRIVER MESSAGING)
          ========================================================================= */}
      {chatModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '12px', backdropFilter: 'blur(8px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', width: '100%', maxWidth: '480px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            
            {/* Chat Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isRecycler ? '#3B82F6' : '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.2rem', fontWeight: '800' }}>
                  {navTargetType === 'lot' ? '🏢' : isRecycler ? '👤' : '👨‍✈️'}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>
                    {navTargetType === 'lot' 
                      ? (activeLot?.branchManagerName || 'Vikrant Mehra (Supervisor)')
                      : isRecycler
                      ? `${activeOrder?.donorName || 'Aarav Sharma'} (Donor)`
                      : `${activeOrder?.assignedAgentName || activeOrder?.driverName || 'Rahul Sharma'} (EV Pilot)`}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                    <span>
                      {navTargetType === 'lot'
                        ? `${activeLot?.targetBranchName || 'Base Dock'} • Telemetry Active`
                        : isRecycler
                        ? `Doorstep Pickup • Telemetry Active`
                        : `${activeOrder?.assignedRecycler || 'EcoGreen Smelters Ltd'} • Live GPS Active`}
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={() => setChatModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Quick Broadcast Chips */}
            <div style={{ padding: '10px 14px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {(navTargetType === 'lot' 
                ? ['I am at Gate 3', 'Weigh scale ready', 'Paperwork in hand', 'Vehicle cleared']
                : isRecycler
                ? ['I am at the gate', 'Arriving in 2 mins', 'Please confirm address', 'Digital scale ready']
                : ['I am at the gate', 'Please call when you arrive', 'Landmark confirmed', 'Waiting at lobby']
              ).map(chip => (
                <button
                  key={chip}
                  onClick={() => handleQuickBroadcast(chip)}
                  style={{ padding: '4px 10px', borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: '0.74rem', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0 }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '220px', maxHeight: '340px' }}>
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender === (isRecycler ? 'recycler' : 'donor');
                return (
                  <div key={i} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{
                      background: isMe ? 'var(--emerald-primary)' : 'var(--bg-secondary)',
                      color: isMe ? '#FFFFFF' : 'var(--text-primary)',
                      padding: '10px 14px',
                      borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      fontSize: '0.85rem',
                      lineHeight: '1.4'
                    }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', textAlign: isMe ? 'right' : 'left' }}>
                      {msg.time}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', background: 'var(--bg-card)' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  navTargetType === 'lot'
                    ? 'Type a message to base supervisor...'
                    : isRecycler
                    ? `Type a message to donor ${activeOrder?.donorName || 'Aarav'}...`
                    : `Type a message to pilot ${activeOrder?.assignedAgentName || activeOrder?.driverName || 'Rahul'}...`
                }
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: '12px' }}>
                <Send size={16} />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          PRINTABLE GATE PASS MODAL (FOR GATEHOUSE VERIFICATION)
          ========================================================================= */}
      {showGatePassModal && activeLot && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px', backdropFilter: 'blur(8px)' }}>
          <div className="animate-fadeIn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px clamp(16px, 4vw, 30px)', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <QrCode size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800' }}>Depot Inbound Gate Pass</h3>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CPCB Manifest &amp; QR Permitted Intake</div>
                </div>
              </div>

              <button onClick={() => setShowGatePassModal(false)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ border: '2px dashed #10B981', borderRadius: '18px', padding: '20px 16px', background: 'rgba(16, 185, 129, 0.03)', textAlign: 'center', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EcoTrace Certified Logistics Gatehouse Manifest
              </div>
              
              <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#10B981', margin: '4px 0 2px', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                {activeLot.handoverPassCode}
              </div>
              
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0 2px' }}>
                {activeLot.lotName || activeLot.lotId}
              </div>

              <div style={{ fontSize: '0.76rem', color: '#3B82F6', fontWeight: '700', marginBottom: '14px' }}>
                🏢 Base: {activeLot.targetBranchName || activeLot.targetOrgName}
              </div>

              <div style={{ width: '130px', height: '130px', background: '#FFFFFF', borderRadius: '16px', padding: '10px', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.18)' }}>
                <QrCode size={110} color="#064E3B" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'left', fontSize: '0.8rem', background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Destination Base:</span>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px', wordBreak: 'break-word' }}>{activeLot.targetBranchName || activeLot.targetOrgName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Recycler Unit:</span>
                  <div style={{ fontWeight: '700', color: '#3B82F6', marginTop: '2px', wordBreak: 'break-word' }}>{recyclerCompanyName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Total Gross Weight:</span>
                  <div style={{ fontWeight: '800', color: '#10B981', marginTop: '2px' }}>{activeLot.totalWeightKg} kg</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Item Count:</span>
                  <div style={{ fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>{activeLot.deviceCount} Devices</div>
                </div>
              </div>
            </div>

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
                onClick={() => setShowGatePassModal(false)} 
                className="btn btn-outline" 
                style={{ padding: '12px 20px' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. GLOBAL FOOTER */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
