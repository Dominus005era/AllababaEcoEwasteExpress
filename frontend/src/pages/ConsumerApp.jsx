import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  ChevronRight,
  Building2,
  Award,
  DollarSign,
  Cpu,
  AlertTriangle,
  Flame,
  Check,
  Upload,
  ImageIcon,
  FileUp,
  Video,
  X,
  RotateCcw,
  Maximize2,
  ScanLine,
  Zap,
  Play,
  HelpCircle,
  ChevronDown,
  Search,
  CheckCircle,
  Lock,
  Unlock,
  Sliders,
  Radio,
  FileText,
  AlertCircle,
  Eye,
  Layers
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { categoriesApi, recyclersApi, pickupApi, scansApi } from '../services/api';

// Fallback Default Category Metadata for 12 Categories
const DEFAULT_CATEGORIES = [
  {
    id: 'smartphone',
    name: 'Smartphone & Mobile Phone',
    group: 'Consumer Electronics',
    icon: '📱',
    estimatedValue: 436,
    benchmarkValue: 1308,
    trend: '-24%',
    co2SavedKg: 2.87,
    recoverableMetals: ['Gold (0.036g)', 'Copper (15g)', 'Silver (0.37g)', 'Cobalt (6.8g)', 'Lithium (3.4g)'],
    materials: ['Gold Contacts', 'Motherboard PCB', 'Lithium Battery', 'Gorilla Glass'],
    hazardousMaterials: ['Lithium Polymer', 'Lead Trace Solder'],
    recyclingDifficulty: 'Medium'
  },
  {
    id: 'laptop',
    name: 'Laptop & Ultrabook',
    group: 'Consumer Electronics',
    icon: '💻',
    estimatedValue: 2109,
    benchmarkValue: 6327,
    trend: '-18%',
    co2SavedKg: 14.45,
    recoverableMetals: ['Gold (0.126g)', 'Copper (68g)', 'Silver (1.26g)', 'Cobalt (23.2g)', 'Lithium (12.6g)'],
    materials: ['Multi-layer Motherboard', 'Magnesium Chassis', 'Lithium Cell Matrix', 'LED Display'],
    hazardousMaterials: ['Mercury Backlight traces', 'Brominated Flame Retardants'],
    recyclingDifficulty: 'High'
  },
  {
    id: 'tablet',
    name: 'Tablet & iPad Screen',
    group: 'Consumer Electronics',
    icon: '📟',
    estimatedValue: 815,
    benchmarkValue: 2445,
    trend: '-12%',
    co2SavedKg: 5.32,
    recoverableMetals: ['Gold (0.060g)', 'Copper (28g)', 'Silver (0.60g)', 'Cobalt (13.2g)'],
    materials: ['Digitizer Touch Glass', 'Anodized Aluminum Backing', 'Compact PCB', 'Cobalt Cell'],
    hazardousMaterials: ['Lithium Polymer', 'Arsenic Dopants'],
    recyclingDifficulty: 'Medium'
  },
  {
    id: 'desktop',
    name: 'Desktop PC & All-in-One',
    group: 'Consumer Electronics',
    icon: '🖥️',
    estimatedValue: 7221,
    benchmarkValue: 21663,
    trend: '-15%',
    co2SavedKg: 50.50,
    recoverableMetals: ['Gold (0.340g)', 'Copper (450g)', 'Silver (3.95g)', 'Palladium (0.123g)'],
    materials: ['ATX Motherboard', 'Steel Chassis', 'Heavy SMPS', 'Copper Heat Sinks'],
    hazardousMaterials: ['Lead Solder Ball Grids', 'Capacitor Electrolytes'],
    recyclingDifficulty: 'Medium'
  },
  {
    id: 'monitor',
    name: 'Computer Monitor',
    group: 'Consumer Electronics',
    icon: '🖥️',
    estimatedValue: 1640,
    benchmarkValue: 4920,
    trend: '-20%',
    co2SavedKg: 21.78,
    recoverableMetals: ['Copper (45g)', 'Silver (0.41g)', 'Gold (0.034g)', 'High-Purity Steel (850g)'],
    materials: ['TFT Matrix Liquid Crystal', 'Polarizing Filters', 'Power Inverter Board', 'Shielded Housing'],
    hazardousMaterials: ['Fluorescent Phosphors', 'Capacitor Electrolytes'],
    recyclingDifficulty: 'High'
  },
  {
    id: 'television',
    name: 'Smart Television',
    group: 'Consumer Electronics',
    icon: '📺',
    estimatedValue: 3045,
    benchmarkValue: 9135,
    trend: '-14%',
    co2SavedKg: 66.89,
    recoverableMetals: ['Copper (180g)', 'Silver (0.61g)', 'Gold (0.056g)', 'Extruded Aluminum (1200g)'],
    materials: ['Large Glass Substrate', 'Backlight LED Strips', 'Main System Board', 'Aluminum Heat Diffuser'],
    hazardousMaterials: ['Heavy Metal Dopants', 'Flame Retardants'],
    recyclingDifficulty: 'High'
  },
  {
    id: 'gpu',
    name: 'PC Components & GPU',
    group: 'Circuitry & Critical Components',
    icon: '⚡',
    estimatedValue: 3702,
    benchmarkValue: 11106,
    trend: '-10%',
    co2SavedKg: 19.49,
    recoverableMetals: ['Gold (0.211g)', 'Copper (280g)', 'Silver (2.17g)', 'Palladium (0.080g)'],
    materials: ['8-Layer High-TG PCB', 'Copper Heat Pipes', 'BGA Graphics Processor', 'GDDR VRAM Array'],
    hazardousMaterials: ['Lead Solder Grids', 'Beryllium Oxide'],
    recyclingDifficulty: 'High'
  },
  {
    id: 'battery',
    name: 'Lithium Battery & Power Bank',
    group: 'Circuitry & Critical Components',
    icon: '🔋',
    estimatedValue: 2087,
    benchmarkValue: 6261,
    trend: '-5%',
    co2SavedKg: 35.57,
    recoverableMetals: ['Cobalt (43.8g)', 'Lithium Carbonate (26.0g)', 'Nickel (35g)', 'Copper Foil (22g)'],
    materials: ['NMC / LFP Cathode Slurry', 'Graphite Anode', 'Polypropylene Separator', 'Aluminum Canister'],
    hazardousMaterials: ['Organic Carbonate Electrolyte', 'Hexafluorophosphate (LiPF6)'],
    recyclingDifficulty: 'Hazardous / Specialized'
  },
  {
    id: 'smartwatch',
    name: 'Audio & Wearables',
    group: 'Consumer Electronics',
    icon: '⌚',
    estimatedValue: 161,
    benchmarkValue: 483,
    trend: '-8%',
    co2SavedKg: 1.83,
    recoverableMetals: ['Gold (0.014g)', 'Copper (12g)', 'Silver (0.14g)', 'Neodymium Magnets (5g)'],
    materials: ['Ceramic / Sapphire Backing', 'Flexible PCB Antenna', 'Micro Lithium Cell', 'Optical Sensor'],
    hazardousMaterials: ['Lithium Micro-Cell'],
    recyclingDifficulty: 'Medium'
  },
  {
    id: 'telecom',
    name: 'Networking & Telecom',
    group: 'Industrial & CleanTech Hardware',
    icon: '📡',
    estimatedValue: 2141,
    benchmarkValue: 6423,
    trend: '-12%',
    co2SavedKg: 13.74,
    recoverableMetals: ['Gold (0.106g)', 'Copper (290g)', 'Silver (1.05g)', 'Palladium (0.045g)'],
    materials: ['High-Frequency PTFE PCBs', 'Gold-Plated SFP+ Ports', 'Die-Cast Enclosure', 'RF Shielding'],
    hazardousMaterials: ['Gallium Arsenide RF Dopants'],
    recyclingDifficulty: 'High'
  },
  {
    id: 'inverter',
    name: 'Inverter & UPS',
    group: 'Industrial & CleanTech Hardware',
    icon: '🔌',
    estimatedValue: 7223,
    benchmarkValue: 21669,
    trend: '-6%',
    co2SavedKg: 108.92,
    recoverableMetals: ['Copper (1850g)', 'Silver (1.34g)', 'Gold (0.028g)', 'Silicon Diodes (120g)'],
    materials: ['Pure Copper Transformer Coils', 'Heavy Steel Shell', 'MOSFET Switching Arrays', 'Filter Bank'],
    hazardousMaterials: ['Electrolyte Capacitors', 'Heavy Metal Residues'],
    recyclingDifficulty: 'Medium'
  },
  {
    id: 'printer',
    name: 'Printers & Scanners',
    group: 'Consumer Electronics',
    icon: '🖨️',
    estimatedValue: 1962,
    benchmarkValue: 5886,
    trend: '-16%',
    co2SavedKg: 39.18,
    recoverableMetals: ['Copper (160g)', 'Silver (0.36g)', 'Gold (0.025g)', 'Cast Zinc & Aluminum (450g)'],
    materials: ['Precision Stepper Motors', 'Optical Mirror Arrays', 'Fuser Heating Assembly', 'Logic Board'],
    hazardousMaterials: ['Toner Carbon Residue', 'Ozone Generating Corona Wires'],
    recyclingDifficulty: 'Medium'
  }
];

export const ConsumerApp = ({ onBackToLanding, onOpenRecyclerDash, onNavigate, onBack, onViewPickups, onPickupBooked }) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  
  // Dynamic Categories from MySQL
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('smartphone');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Scanning & Viewfinder States
  const [scanPercent, setScanPercent] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [scanPhase, setScanPhase] = useState('idle'); // 'idle', 'scanning_photo', 'hardware_observation', 'verified'
  const [isHardwareVerified, setIsHardwareVerified] = useState(false);
  const [activeInputMode, setActiveInputMode] = useState('idle'); // 'idle', 'camera', 'preview'
  const [currentImage, setCurrentImage] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // AI Multimodal Vision Extractions
  const [aiObservations, setAiObservations] = useState([]);
  const [aiIdentifiedComponents, setAiIdentifiedComponents] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [aiConfidence, setAiConfidence] = useState(null);
  const [aiMatchStatus, setAiMatchStatus] = useState(null); // 'matched_db', 'predicted_statistical', null

  // Hardware Observation Form State
  const currentYear = new Date().getFullYear();
  const [hardwareForm, setHardwareForm] = useState({
    brand: '',
    modelName: '',
    releaseYear: currentYear - 2,
    purchaseYear: currentYear - 2,
    deviceAgeYears: 2,
    physicalCondition: 'Working - Minor Scratches',
    repairHistory: 'Original Factory Parts',
    defectNotes: ''
  });

  // Dynamic Suggestion Lists from DB
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Refs for WebRTC Video, File Inputs and Dropdown
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Device specs state
  const [deviceData, setDeviceData] = useState({
    id: 'smartphone',
    title: 'Smartphone & Mobile Phone',
    trend: '-24%',
    materials: ['Gold Contacts', 'Motherboard PCB', 'Lithium Battery', 'Gorilla Glass'],
    recoverableMetals: ['Gold (0.036g)', 'Copper (15g)', 'Silver (0.37g)', 'Cobalt (6.8g)', 'Lithium (3.4g)'],
    estimatedValue: 436,
    benchmarkValue: 1308,
    co2Saved: '2.87kg CO₂ saved',
    co2Num: 2.87,
    hazardousMaterials: ['Lithium Polymer', 'Lead Trace Solder'],
    recyclingDifficulty: 'Medium',
    metalsBreakdown: {
      goldGrams: 0.036,
      silverGrams: 0.37,
      copperGrams: 15,
      cobaltGrams: 6.8,
      palladiumGrams: 0.015,
      lithiumGrams: 3.4
    }
  });

  // 3 Interactive Dummy Recycler Bidders with explicit [DUMMY] tags
  const DUMMY_RECYCLER_BIDDERS = [
    {
      id: 'rec_hub_04',
      name: '[DUMMY] GreenDrop Recyclers (Hub #4)',
      companyName: 'GreenDrop Circular Metals Ltd',
      district: 'Prayagraj',
      distanceKm: '2.4 km',
      rating: 4.9,
      reviewsCount: 128,
      offeredRate: 450,
      payoutMultiplier: 1.0,
      isTopBid: true,
      cpcbCert: 'CPCB-UP-2026-REC-0891',
      badge: '⚡ [DUMMY] Highest Cash Quote • Top Recycler',
      pickupEstimate: 'Within 24 Hours'
    },
    {
      id: 'rec_hub_09',
      name: '[DUMMY] EcoSmelt Refining Pvt Ltd (Naini Depot)',
      companyName: 'EcoSmelt Refining & Extraction',
      district: 'Prayagraj',
      distanceKm: '5.1 km',
      rating: 4.7,
      reviewsCount: 94,
      offeredRate: 420,
      payoutMultiplier: 0.933,
      isTopBid: false,
      cpcbCert: 'CPCB-UP-2025-SMT-0342',
      badge: '⚡ [DUMMY] ISO 14001 Audit Ready Smelter',
      pickupEstimate: 'Tomorrow, 10:00 AM'
    },
    {
      id: 'rec_hub_12',
      name: '[DUMMY] CleanTech Circular Hub (Prayagraj Central)',
      companyName: 'CleanTech Reverse Logistics Alliance',
      district: 'Prayagraj',
      distanceKm: '7.8 km',
      rating: 4.6,
      reviewsCount: 67,
      offeredRate: 390,
      payoutMultiplier: 0.866,
      isTopBid: false,
      cpcbCert: 'CPCB-UP-2026-REC-1104',
      badge: '⚡ [DUMMY] Zero-Landfill Verified',
      pickupEstimate: 'Same-Day Evening'
    }
  ];

  // Recycler Bidders (Pre-populated with 3 Dummy Bidders)
  const [recyclersList, setRecyclersList] = useState(DUMMY_RECYCLER_BIDDERS);
  const [selectedRecycler, setSelectedRecycler] = useState(DUMMY_RECYCLER_BIDDERS[0]);
  const [loadingRecyclers, setLoadingRecyclers] = useState(false);

  // Pickup Booking Form State
  const [pickupAddress, setPickupAddress] = useState(
    currentUser?.address || 'Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004'
  );
  const [pickupTime, setPickupTime] = useState('Tomorrow, 10:00 AM');
  const [donorPhone, setDonorPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Fetch Dynamic Categories from MySQL on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesApi.getAll();
        if (res.success && res.categories && res.categories.length > 0) {
          const mapped = res.categories.map(c => {
            const fallback = DEFAULT_CATEGORIES.find(d => d.id === c.id) || {};
            return {
              id: c.id,
              name: c.name,
              group: fallback.group || 'Consumer Electronics',
              icon: fallback.icon || '📦',
              estimatedValue: c.estimatedValue || fallback.estimatedValue || 450,
              benchmarkValue: c.benchmarkValue || fallback.benchmarkValue || 1350,
              trend: c.trend || '-15%',
              co2SavedKg: c.co2SavedKg || fallback.co2SavedKg || 2.3,
              recoverableMetals: c.recoverableMetals || fallback.recoverableMetals || [],
              materials: c.materials || fallback.materials || [],
              hazardousMaterials: c.hazardousMaterials || fallback.hazardousMaterials || [],
              recyclingDifficulty: c.recyclingDifficulty || 'Medium'
            };
          });
          setCategoriesList(mapped);
        }
      } catch (err) {
        console.warn('Using default dynamic categories fallback:', err.message);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch Brand suggestions when selected category changes
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const res = await categoriesApi.getBrands(selectedCategoryKey);
        if (res.success && res.brands) {
          setBrandSuggestions(res.brands);
        }
      } catch (e) {
        console.warn('Brand suggestion query error:', e.message);
      }
    };
    loadBrands();
  }, [selectedCategoryKey]);

  // 3. Fetch Model suggestions when brand changes
  useEffect(() => {
    if (!hardwareForm.brand) {
      setModelSuggestions([]);
      return;
    }
    const loadModels = async () => {
      setLoadingSuggestions(true);
      try {
        const res = await categoriesApi.getModels(selectedCategoryKey, hardwareForm.brand);
        if (res.success && res.models) {
          setModelSuggestions(res.models);
        }
      } catch (e) {
        console.warn('Model query error:', e.message);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    loadModels();
  }, [selectedCategoryKey, hardwareForm.brand]);

  // 4. Load device specs and benchmark when category changes
  const loadDeviceSpecs = (key) => {
    const matched = categoriesList.find(c => c.id === key) || categoriesList[0];
    if (!matched) return;
    setDeviceData(prev => ({
      ...prev,
      id: matched.id,
      title: prev.title && scanPhase !== 'idle' ? prev.title : matched.name,
      trend: matched.trend,
      materials: matched.materials,
      recoverableMetals: prev.recoverableMetals?.length > 0 && scanPhase !== 'idle' ? prev.recoverableMetals : matched.recoverableMetals,
      estimatedValue: prev.estimatedValue > 0 && scanPhase !== 'idle' ? prev.estimatedValue : matched.estimatedValue,
      benchmarkValue: matched.benchmarkValue,
      co2Saved: prev.co2Saved && scanPhase !== 'idle' ? prev.co2Saved : `${matched.co2SavedKg}kg CO₂ saved`,
      co2Num: prev.co2Num > 0 && scanPhase !== 'idle' ? prev.co2Num : matched.co2SavedKg,
      hazardousMaterials: matched.hazardousMaterials,
      recyclingDifficulty: matched.recyclingDifficulty,
      metalsBreakdown: prev.metalsBreakdown || matched.metalsBreakdown || { goldGrams: 0.035, silverGrams: 0.35, copperGrams: 15 }
    }));
  };

  useEffect(() => {
    loadDeviceSpecs(selectedCategoryKey);
  }, [selectedCategoryKey]);

  // Explicit user manual category selection handler
  const handleManualCategorySelect = (key) => {
    setSelectedCategoryKey(key);
    setIsDropdownOpen(false);
    setCategorySearchQuery('');
    // Explicit manual category selection resets current scan
    setIsHardwareVerified(false);
    setScanPhase('idle');
    setScanPercent(0);
    setCurrentImage(null);
    setActiveInputMode('idle');
    setAiObservations([]);
    setAiIdentifiedComponents([]);
    setAiSummary('');
    setAiConfidence(null);
  };

  // Clean up camera stream
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // 5. Load Recyclers from MySQL Scoped to User's District with 3 Dummy Bidders Fallback
  const loadRecyclers = async (baseVal) => {
    setLoadingRecyclers(true);
    try {
      const userDistrict = currentUser?.district || 'Prayagraj';
      const res = await recyclersApi.getAll(baseVal, userDistrict);
      if (res.recyclers && res.recyclers.length > 0) {
        setRecyclersList(res.recyclers);
        setSelectedRecycler(res.recyclers[0]);
      } else {
        setRecyclersList(DUMMY_RECYCLER_BIDDERS);
        setSelectedRecycler(DUMMY_RECYCLER_BIDDERS[0]);
      }
    } catch (e) {
      console.warn('Recycler bids query fallback to 3 dummy bidders:', e.message);
      setRecyclersList(DUMMY_RECYCLER_BIDDERS);
      setSelectedRecycler(DUMMY_RECYCLER_BIDDERS[0]);
    } finally {
      setLoadingRecyclers(false);
    }
  };

  // REAL GEMINI MULTIMODAL VISION AI SCAN TRIGGER
  const triggerAiScan = async (imageDataUrl) => {
    const imageToAnalyze = imageDataUrl || currentImage;
    if (!imageToAnalyze) return;

    setIsScanning(true);
    setIsAiAnalyzing(true);
    setScanPercent(10);
    setScanPhase('scanning_photo');

    // Laser tick animation while AI is processing
    const ticker = setInterval(() => {
      setScanPercent(prev => {
        if (prev >= 65) return 65;
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 90);

    try {
      // Send base64 image directly to Gemini Multimodal Vision API
      const res = await scansApi.analyzeImage(imageToAnalyze, selectedCategoryKey);
      clearInterval(ticker);

      if (res.success && res.aiAnalysis) {
        const ai = res.aiAnalysis;
        const val = res.valuation;

        const detectedBrand = ai.brand && ai.brand !== 'Generic' ? ai.brand : (hardwareForm.brand || 'Samsung');
        const detectedModel = ai.modelName && !ai.modelName.includes('Generic') ? ai.modelName : (hardwareForm.modelName || 'Galaxy Series');
        const detectedYear = ai.estimatedReleaseYear || hardwareForm.releaseYear || (currentYear - 2);
        const detectedCondition = ai.physicalCondition || hardwareForm.physicalCondition || 'Working - Minor Scratches';

        const updatedForm = {
          ...hardwareForm,
          brand: detectedBrand,
          modelName: detectedModel,
          releaseYear: detectedYear,
          purchaseYear: detectedYear,
          deviceAgeYears: Math.max(0, currentYear - detectedYear),
          physicalCondition: detectedCondition,
          defectNotes: ai.damageObservations?.join(', ') || ''
        };

        setHardwareForm(updatedForm);
        setAiObservations(ai.damageObservations || []);
        setAiIdentifiedComponents(ai.identifiableComponents || []);
        setAiSummary(ai.summary || '');
        setAiConfidence(ai.confidenceScore ? Math.round(ai.confidenceScore * 100) : 94);
        setAiMatchStatus(ai.isDbMatch ? 'matched_db' : 'predicted_statistical');

        if (ai.deviceType && ai.deviceType !== selectedCategoryKey) {
          setSelectedCategoryKey(ai.deviceType);
        }

        if (val) {
          setDeviceData(prev => ({
            ...prev,
            title: val.deviceName || `${detectedBrand} ${detectedModel}`,
            estimatedValue: val.estimatedValue,
            benchmarkValue: val.benchmarkValue,
            co2Saved: `${val.co2SavedKg}kg CO₂ saved`,
            co2Num: val.co2SavedKg,
            recoverableMetals: val.recoverableMetals,
            metalsBreakdown: val.metalsBreakdown
          }));
        }

        // Set to 85% - 90% and let user confirm
        setScanPercent(88);
      } else {
        setScanPercent(65);
      }
    } catch (err) {
      console.warn('Gemini vision API analysis error:', err.message);
      clearInterval(ticker);
      setScanPercent(65);
    } finally {
      setIsScanning(false);
      setIsAiAnalyzing(false);
      setScanPhase('hardware_observation');
    }
  };

  // Compute dynamic progress (65% -> 100%) based on hardware observation completeness
  const calculateLiveValuationAndProgress = async (formState, baseProgress = 65) => {
    let progress = baseProgress;
    const hasBrand = formState.brand && formState.brand.trim().length > 0;
    const hasModel = formState.modelName && formState.modelName.trim().length > 0;
    const hasPurchase = Boolean(formState.purchaseYear);
    const hasCondition = Boolean(formState.physicalCondition);

    if (hasBrand) progress += 8;
    if (hasModel) progress += 7;
    if (hasPurchase) progress += 10;
    if (hasCondition) progress += 10;

    progress = Math.min(100, progress);
    setScanPercent(progress);

    // Call dynamic valuation calculation engine
    if (hasBrand || hasModel) {
      try {
        const valRes = await categoriesApi.calculateValuation({
          categoryId: selectedCategoryKey,
          brand: formState.brand,
          modelName: formState.modelName,
          releaseYear: formState.releaseYear,
          purchaseYear: formState.purchaseYear,
          physicalCondition: formState.physicalCondition,
          repairHistory: formState.repairHistory
        });

        if (valRes.success && valRes.valuation) {
          const val = valRes.valuation;
          setDeviceData(prev => ({
            ...prev,
            title: val.deviceName || `${formState.brand} ${formState.modelName}`,
            estimatedValue: val.estimatedValue,
            benchmarkValue: val.benchmarkValue,
            co2Saved: `${val.co2SavedKg}kg CO₂ saved`,
            co2Num: val.co2SavedKg,
            recoverableMetals: val.recoverableMetals,
            metalsBreakdown: val.metalsBreakdown
          }));

          const isExact = modelSuggestions.some(m => 
            m.device_name?.toLowerCase() === formState.modelName?.toLowerCase() ||
            m.device_name?.toLowerCase().includes(formState.modelName?.toLowerCase())
          );
          setAiMatchStatus(isExact ? 'matched_db' : 'predicted_statistical');
        }
      } catch (err) {
        console.warn('Live valuation calculation error:', err.message);
      }
    }
  };

  // Handle Hardware Form Inputs & Dynamic Progress Linking
  const handleHardwareFieldChange = (field, value) => {
    const updated = { ...hardwareForm, [field]: value };
    if (field === 'purchaseYear') {
      const pYear = parseInt(value, 10) || currentYear;
      updated.deviceAgeYears = Math.max(0, currentYear - pYear);
    }
    setHardwareForm(updated);
    calculateLiveValuationAndProgress(updated, 65);
  };

  // Phase 3: Lock Specifications & Reveal Recycler Bids
  const handleLockSpecifications = async () => {
    setIsHardwareVerified(true);
    setScanPhase('verified');
    setScanPercent(100);

    // Log verified scan to database
    try {
      await scansApi.logScan({
        userId: currentUser?.id || 'guest-donor',
        deviceType: deviceData.title,
        estimatedVal: deviceData.estimatedValue,
        co2Saved: deviceData.co2Num,
        brand: hardwareForm.brand,
        modelName: hardwareForm.modelName,
        releaseYear: hardwareForm.releaseYear,
        purchaseYear: hardwareForm.purchaseYear,
        deviceAgeYears: hardwareForm.deviceAgeYears,
        physicalCondition: hardwareForm.physicalCondition,
        repairHistory: hardwareForm.repairHistory,
        metalsBreakdown: deviceData.metalsBreakdown,
        imageUrl: currentImage || null
      });
    } catch (err) {
      console.warn('Scan logging notice:', err.message);
    }

    // Query live registered recycler bids from user's district
    loadRecyclers(deviceData.estimatedValue);
  };

  const startCameraStream = async () => {
    setCameraError(null);
    setActiveInputMode('camera');
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.warn('Video play error:', e));
        }
      } else {
        throw new Error('WebRTC Camera API not supported in this browser.');
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      setCameraError('Camera access not available or permission denied. Please choose "Upload Photo" instead.');
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    
    stopCameraStream();
    setCurrentImage(dataUrl);
    setImageSource('camera');
    setActiveInputMode('preview');
    triggerAiScan(dataUrl);
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = async (file) => {
    stopCameraStream();
    const dataUrl = await compressImage(file);
    if (!dataUrl) return;
    setCurrentImage(dataUrl);
    setImageSource('upload');
    setActiveInputMode('preview');
    triggerAiScan(dataUrl);
  };

  const handleOpenMobileCamera = () => {
    const isLocalOrHttps = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isMobile && isLocalOrHttps && navigator.mediaDevices?.getUserMedia) {
      startCameraStream();
    } else if (cameraInputRef.current) {
      cameraInputRef.current.click();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      startCameraStream();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleResetScanner = () => {
    stopCameraStream();
    setCurrentImage(null);
    setImageSource(null);
    setActiveInputMode('idle');
    setCameraError(null);
    setScanPhase('idle');
    setScanPercent(0);
    setIsHardwareVerified(false);
    setAiMatchStatus(null);
    setAiObservations([]);
    setAiIdentifiedComponents([]);
    setAiSummary('');
    setAiConfidence(null);
  };

  const handleWatchVideoGuide = () => {
    if (onNavigate) {
      onNavigate('landing');
    } else if (onBackToLanding) {
      onBackToLanding();
    }
    setTimeout(() => {
      const el = document.getElementById('demo-video');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  const handleConfirmBooking = async () => {
    if (!selectedRecycler) return;
    setBookingLoading(true);
    try {
      const activeMultiplier = parseFloat(selectedRecycler?.payoutMultiplier || selectedRecycler?.payout_multiplier || 1.15);
      const computedOfferedPrice = Math.round(Number(deviceData.estimatedValue || 450) * activeMultiplier);

      const payload = {
        userId: currentUser?.id || `ECO-DNR-${Math.floor(1000 + Math.random() * 9000)}`,
        donorName: currentUser?.displayName || currentUser?.name || currentUser?.email?.split('@')[0] || 'E-Waste Donor',
        donorPhone,
        deviceId: deviceData.id,
        deviceName: deviceData.title,
        brand: hardwareForm.brand || 'Generic',
        modelName: hardwareForm.modelName || deviceData.title,
        releaseYear: hardwareForm.releaseYear,
        purchaseYear: hardwareForm.purchaseYear,
        deviceAgeYears: hardwareForm.deviceAgeYears,
        physicalCondition: hardwareForm.physicalCondition,
        repairHistory: hardwareForm.repairHistory,
        validationDetails: {
          brand: hardwareForm.brand,
          model: hardwareForm.modelName,
          age: hardwareForm.deviceAgeYears,
          condition: hardwareForm.physicalCondition,
          repairs: hardwareForm.repairHistory,
          metalsBreakdown: deviceData.metalsBreakdown,
          aiObservations
        },
        pickupTime,
        address: pickupAddress,
        assignedRecyclerId: selectedRecycler?.id || 'ORG-REC-0001',
        assignedRecyclerName: selectedRecycler?.name || selectedRecycler?.companyName || 'Greenscape Eco Management Pvt Ltd',
        orgId: selectedRecycler?.id || 'ORG-REC-0001',
        orgName: selectedRecycler?.name || selectedRecycler?.companyName || 'Greenscape Eco Management Pvt Ltd',
        offeredPrice: computedOfferedPrice,
        co2SavedKg: deviceData.co2Num,
        deviceImage: currentImage || null
      };

      const res = await pickupApi.create(payload);
      if (res.pickup) {
        setConfirmedBooking({
          ...res.pickup,
          offeredPrice: computedOfferedPrice
        });
      } else {
        setConfirmedBooking({
          requestId: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
          deviceName: deviceData.title,
          assignedRecycler: selectedRecycler?.name || selectedRecycler?.companyName || 'Greenscape Eco Management Pvt Ltd',
          offeredPrice: computedOfferedPrice,
          pickupTime,
          address: pickupAddress
        });
      }
      setIsBooked(true);
    } catch (e) {
      console.error('Booking submission fallback:', e);
      const activeMultiplier = parseFloat(selectedRecycler?.payoutMultiplier || selectedRecycler?.payout_multiplier || 1.15);
      const computedOfferedPrice = Math.round(Number(deviceData.estimatedValue || 450) * activeMultiplier);
      setConfirmedBooking({
        requestId: 'REQ-' + Math.floor(1000 + Math.random() * 9000),
        deviceName: deviceData.title,
        assignedRecycler: selectedRecycler?.name || selectedRecycler?.companyName || 'Greenscape Eco Management Pvt Ltd',
        offeredPrice: computedOfferedPrice,
        pickupTime,
        address: pickupAddress
      });
      setIsBooked(true);
    } finally {
      setBookingLoading(false);
    }
  };

  // Currently active category details
  const activeCategoryObj = categoriesList.find(c => c.id === selectedCategoryKey) || categoriesList[0];

  // Filter categories by search
  const filteredCategories = categoriesList.filter(c => 
    c.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
    (c.group && c.group.toLowerCase().includes(categorySearchQuery.toLowerCase()))
  );

  // Group filtered categories
  const groupedCategories = filteredCategories.reduce((acc, cat) => {
    const groupName = cat.group || 'Consumer Electronics';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(cat);
    return acc;
  }, {});

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: '60px', boxSizing: 'border-box' }}>
      
      {/* Hidden File Input for Desktop browse */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />

      {/* Hidden Direct Camera Capture Input for Mobile */}
      <input 
        ref={cameraInputRef} 
        type="file" 
        accept="image/*" 
        capture="environment" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />

      {!isBooked ? (
        <div className="container" style={{ maxWidth: '1240px', paddingTop: '10px', boxSizing: 'border-box' }}>
          
          {/* 1. TOP HEADER BANNER CARD WITH DYNAMIC BENCHMARK BADGE */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 22px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-sm)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0
                }}>
                  <Sparkles size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)', lineHeight: '1.3' }}>
                  AI E-Waste Material Matrix &amp; Recycler Payout Bidding
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.78rem', flexShrink: 0 }}>
                  <Zap size={13} />
                  <span>3-Layer Verification Active</span>
                </span>
                <span className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '0.78rem', flexShrink: 0 }}>
                  <MapPin size={13} />
                  <span>{currentUser?.district || 'Prayagraj'} Hub</span>
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5', width: '100%' }}>
              Upload or snap a device photo. Our Multimodal AI Vision engine inspects the casing, detects brand, model, screen &amp; battery condition, and matches recoverable precious metals with live CPCB recycler bids.
            </p>
          </div>

          {/* 2. DYNAMIC CATEGORY SELECTOR DROPDOWN (12 Categories with Approx. Benchmark Pricing) */}
          <div style={{ marginBottom: '24px', width: '100%', position: 'relative', boxSizing: 'border-box' }} ref={dropdownRef}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Select E-Waste Category:
              </span>
              <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: '700' }}>
                📊 Dynamic Database Averages (Layer 4)
              </span>
            </div>

            {/* Custom Interactive Trigger Pill Card */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                background: 'var(--bg-card)',
                border: isDropdownOpen ? '2px solid #10B981' : '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: isDropdownOpen ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'var(--shadow-sm)',
                transition: 'all 0.25s ease',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  flexShrink: 0
                }}>
                  {activeCategoryObj.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {activeCategoryObj.name}
                    </span>
                    <span style={{ fontSize: '0.68rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '2px 8px', borderRadius: '50px', fontWeight: '800', textTransform: 'uppercase' }}>
                      {activeCategoryObj.group}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '3px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Approx. Category Benchmark: <strong style={{ color: '#10B981' }}>₹{activeCategoryObj.estimatedValue}</strong> • Recoverable: {activeCategoryObj.recoverableMetals.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }} className="hide-on-mobile">
                  <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#10B981' }}>Approx. ₹{activeCategoryObj.estimatedValue}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Live DB Average</div>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDropdownOpen ? '#10B981' : 'var(--text-secondary)',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* EXPANDABLE CATEGORY SELECTION POPOVER */}
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '16px',
                padding: '16px',
                zIndex: 1000,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                maxHeight: '440px',
                overflowY: 'auto',
                boxSizing: 'border-box'
              }}>
                <div style={{ position: 'relative', marginBottom: '14px' }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    placeholder="Search 12 e-waste categories (e.g. Smartphone, Laptop, GPU, Inverter)..."
                    autoFocus
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '10px 14px 10px 36px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {categorySearchQuery && (
                    <button 
                      type="button"
                      onClick={() => setCategorySearchQuery('')}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.keys(groupedCategories).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      No matching e-waste categories found.
                    </div>
                  ) : (
                    Object.entries(groupedCategories).map(([groupName, items]) => (
                      <div key={groupName}>
                        <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', paddingLeft: '4px' }}>
                          {groupName} ({items.length})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
                          {items.map((cat) => {
                            const isSelected = selectedCategoryKey === cat.id;
                            return (
                              <div
                                key={cat.id}
                                onClick={() => handleManualCategorySelect(cat.id)}
                                style={{
                                  background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                                  border: isSelected ? '2px solid #10B981' : '1px solid var(--border-color)',
                                  borderRadius: '12px',
                                  padding: '10px 14px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '10px',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                  <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                                  <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: isSelected ? '#10B981' : 'var(--text-primary)' }}>
                                      {cat.name}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                      Approx. ₹{cat.estimatedValue} • {cat.co2SavedKg}kg CO₂
                                    </div>
                                  </div>
                                </div>

                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Approx. ₹{cat.estimatedValue}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MAIN RESPONSIVE DASHBOARD GRID */}
          <div className="donor-dashboard-grid">
            
            {/* LEFT COLUMN: VIEW FINDER SCANNER + HARDWARE OBSERVATION PANEL */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
              
              {/* High-Tech Camera / Upload Viewfinder Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Camera size={20} color="#10B981" />
                    <span style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                      AI Reticle Viewfinder &amp; Multimodal Inspection
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {activeInputMode === 'preview' && (
                      <button 
                        type="button"
                        onClick={handleResetScanner}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Clear and scan another device"
                      >
                        <RotateCcw size={12} />
                        <span>Re-take</span>
                      </button>
                    )}
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem', flexShrink: 0 }}>
                      Progress: {scanPercent}%
                    </span>
                  </div>
                </div>

                {/* THE RETICLE VIEWPORT CONTAINER */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    minHeight: '320px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isDragOver ? '2px dashed #10B981' : '2px solid rgba(16, 185, 129, 0.4)',
                    boxShadow: isDragOver ? '0 0 25px rgba(16, 185, 129, 0.35)' : 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                    width: '100%',
                    padding: '24px 18px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* STATE 1: IDLE */}
                  {activeInputMode === 'idle' && (
                    <div style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10B981',
                        marginBottom: '14px'
                      }}>
                        <Upload size={24} />
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 8px' }}>
                        {isMobile ? 'Capture Device Photo or Upload' : 'Upload Hardware Photo for Neural Scan'}
                      </h3>
                      
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 20px', maxWidth: '360px', lineHeight: '1.45' }}>
                        Our Multimodal AI Vision automatically reads the device brand, model, screen &amp; body condition from your image.
                      </p>

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px', width: '100%', maxWidth: '360px' }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ flex: '1 1 140px', padding: '11px 14px', fontWeight: '700', borderRadius: '10px', fontSize: '0.88rem' }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FileUp size={16} />
                          <span>{isMobile ? 'Gallery Upload' : 'Upload Photo'}</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ flex: '1 1 140px', padding: '11px 14px', fontWeight: '700', borderRadius: '10px', fontSize: '0.88rem' }}
                          onClick={handleOpenMobileCamera}
                        >
                          <Camera size={16} color="#10B981" />
                          <span>{isMobile ? 'Scan with Camera' : 'Use Camera'}</span>
                        </button>
                      </div>

                      {/* ONE-CLICK INSTANT DEMO SCAN BUTTON */}
                      <div style={{ width: '100%', maxWidth: '380px', marginBottom: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const sampleImg = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop';
                            stopCameraStream();
                            setCurrentImage(sampleImg);
                            setImageSource('sample');
                            setActiveInputMode('preview');
                            triggerAiScan(sampleImg);
                          }}
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            padding: '11px 16px',
                            fontWeight: '800',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                          }}
                        >
                          <Sparkles size={16} />
                          <span>⚡ One-Click AI Demo Scan (Sample iPhone 11 Pro)</span>
                        </button>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={handleWatchVideoGuide}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--emerald-primary)',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Play size={12} />
                          <span>Need help? Watch system video guide &rarr;</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STATE 2: LIVE WEBRTC CAMERA STREAM */}
                  {activeInputMode === 'camera' && (
                    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000000' }}>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      <div className="scan-reticle-overlay" style={{ inset: '20px' }}>
                        <div className="reticle-corner reticle-tl" style={{ borderColor: '#10B981', borderWidth: '4px 0 0 4px', width: '28px', height: '28px' }}></div>
                        <div className="reticle-corner reticle-tr" style={{ borderColor: '#10B981', borderWidth: '4px 4px 0 0', width: '28px', height: '28px' }}></div>
                        <div className="reticle-corner reticle-bl" style={{ borderColor: '#10B981', borderWidth: '0 0 4px 4px', width: '28px', height: '28px' }}></div>
                        <div className="reticle-corner reticle-br" style={{ borderColor: '#10B981', borderWidth: '0 4px 4px 0', width: '28px', height: '28px' }}></div>
                      </div>

                      <div style={{
                        position: 'absolute',
                        bottom: '14px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        zIndex: 10,
                        padding: '0 12px'
                      }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '8px 14px' }}
                          onClick={handleResetScanner}
                        >
                          <X size={15} />
                          <span>Cancel</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            padding: '9px 20px',
                            fontWeight: '800',
                            borderRadius: '50px',
                            boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.88rem'
                          }}
                          onClick={captureCameraSnapshot}
                        >
                          <Camera size={16} />
                          <span>Capture &amp; Analyze</span>
                        </button>
                      </div>

                      {cameraError && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          right: '12px',
                          background: 'rgba(239, 68, 68, 0.9)',
                          color: '#FFFFFF',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          textAlign: 'center'
                        }}>
                          {cameraError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* STATE 3: PREVIEW & AI SCANNING WITH LASER RETICLE */}
                  {activeInputMode === 'preview' && currentImage && (
                    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
                      <img 
                        src={currentImage} 
                        alt="Scanned E-Waste Device"
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '340px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          filter: isScanning ? 'contrast(1.2) brightness(1.05)' : 'brightness(0.95)'
                        }}
                      />

                      <div className="scan-reticle-overlay" style={{ inset: '16px' }}>
                        <div className="reticle-corner reticle-tl" style={{ borderColor: '#10B981', borderWidth: '3px 0 0 3px', width: '24px', height: '24px' }}></div>
                        <div className="reticle-corner reticle-tr" style={{ borderColor: '#10B981', borderWidth: '3px 3px 0 0', width: '24px', height: '24px' }}></div>
                        <div className="reticle-corner reticle-bl" style={{ borderColor: '#10B981', borderWidth: '0 0 3px 3px', width: '24px', height: '24px' }}></div>
                        <div className="reticle-corner reticle-br" style={{ borderColor: '#10B981', borderWidth: '0 3px 3px 0', width: '24px', height: '24px' }}></div>
                      </div>

                      {/* Active Green Laser Line */}
                      {isScanning && <div className="scan-laser-line"></div>}

                      {/* Scanning Badge Progress */}
                      {isScanning && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(15, 23, 42, 0.94)',
                          border: '1px solid #10B981',
                          borderRadius: '50px',
                          padding: '8px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          boxShadow: '0 0 30px rgba(16, 185, 129, 0.7)',
                          zIndex: 10
                        }}>
                          <Sparkles size={16} color="#10B981" />
                          <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#10B981' }}>
                            {isAiAnalyzing ? 'Optical AI Scanner Inspecting...' : `Scan: ${scanPercent}%`}
                          </span>
                        </div>
                      )}

                      {/* AR Detection Status Overlays */}
                      {!isScanning && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          right: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '6px'
                        }}>
                          <span className="badge badge-emerald" style={{ fontSize: '0.74rem' }}>
                            <CheckCircle2 size={13} />
                            <span>Visual Cues Extracted ({aiConfidence || 94}% Confidence)</span>
                          </span>

                          <span className="badge badge-blue" style={{ fontSize: '0.74rem' }}>
                            {scanPercent === 100 ? '✅ 100% Locked' : `⏳ Progress: ${scanPercent}%`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* PROGRESS BAR (Dynamically climbs 65% -> 100% as fields are completed) */}
                {scanPhase !== 'idle' && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: '700' }}>
                        Hardware Verification Completion:
                      </span>
                      <span style={{ fontWeight: '800', color: scanPercent === 100 ? '#10B981' : '#F59E0B' }}>
                        {scanPercent}% {scanPercent === 100 ? '(Specifications Locked)' : '(Auto-Filled — Review below)'}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '50px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <div style={{
                        width: `${scanPercent}%`,
                        height: '100%',
                        background: scanPercent === 100 ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #3B82F6, #10B981)',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* PHASE 2: HARDWARE OBSERVATION & SPECIFICATION PANEL */}
              {scanPhase !== 'idle' && (
                <div style={{
                  background: 'var(--bg-card)',
                  border: isHardwareVerified ? '2px solid #10B981' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-md)',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sliders size={18} color="#10B981" />
                        <span>Hardware Observation &amp; Specification Dossier</span>
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '3px 0 0' }}>
                        {aiSummary || 'Review and confirm your device details to unlock verified CPCB recycler bids.'}
                      </p>
                    </div>

                    <span className={`badge ${isHardwareVerified ? 'badge-emerald' : 'badge-blue'}`} style={{ fontSize: '0.72rem' }}>
                      {isHardwareVerified ? '✓ Authoritative Specification Locked' : '⚡ 3-Layer Cross-Verification Active'}
                    </span>
                  </div>

                  {/* AI Vision Observations Box */}
                  {aiObservations.length > 0 && (
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Eye size={13} color="#10B981" />
                        <span>AI Vision Optical Findings:</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {aiObservations.map((obs, idx) => (
                          <span key={idx} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '600' }}>
                            ✓ {obs}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    {/* Brand Input with Suggestions */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Brand / Manufacturer *
                      </label>
                      <input
                        type="text"
                        list="brand-datalist"
                        value={hardwareForm.brand}
                        disabled={isHardwareVerified}
                        onChange={(e) => handleHardwareFieldChange('brand', e.target.value)}
                        placeholder="e.g. Samsung, Apple, Dell, HP..."
                        style={{
                          width: '100%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          color: 'var(--text-primary)',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      />
                      <datalist id="brand-datalist">
                        {brandSuggestions.map((b, i) => <option key={i} value={b} />)}
                      </datalist>
                    </div>

                    {/* Model Name Input with Suggestions */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Model Name / Variant *
                      </label>
                      <input
                        type="text"
                        list="model-datalist"
                        value={hardwareForm.modelName}
                        disabled={isHardwareVerified}
                        onChange={(e) => handleHardwareFieldChange('modelName', e.target.value)}
                        placeholder="e.g. Galaxy S22, iPhone 13, ThinkPad..."
                        style={{
                          width: '100%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          color: 'var(--text-primary)',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      />
                      <datalist id="model-datalist">
                        {modelSuggestions.map((m, i) => <option key={i} value={m.device_name} />)}
                      </datalist>
                    </div>

                    {/* Purchase Year & Dynamic Age Calculation */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Purchase Year → Age: <strong style={{ color: '#10B981' }}>{hardwareForm.deviceAgeYears} Years</strong>
                      </label>
                      <select
                        value={hardwareForm.purchaseYear}
                        disabled={isHardwareVerified}
                        onChange={(e) => handleHardwareFieldChange('purchaseYear', e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          color: 'var(--text-primary)',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(yr => (
                          <option key={yr} value={yr}>{yr} ({currentYear - yr} yrs old)</option>
                        ))}
                      </select>
                    </div>

                    {/* Physical Condition Selector */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Physical Condition *
                      </label>
                      <select
                        value={hardwareForm.physicalCondition}
                        disabled={isHardwareVerified}
                        onChange={(e) => handleHardwareFieldChange('physicalCondition', e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          color: 'var(--text-primary)',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Flawless Working">Flawless Working (Like New / Pristine)</option>
                        <option value="Working - Minor Scratches">Working (Minor Scratches / Good)</option>
                        <option value="Cracked Display / Heavy Wear">Cracked Display / Heavy Wear (Fair)</option>
                        <option value="Battery Degraded">Battery Degraded / Low Backup</option>
                        <option value="Dead / Won't Turn On">Dead / Won't Turn On (Salvage Only)</option>
                      </select>
                    </div>

                    {/* Repair History */}
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                        Repair / Modification History
                      </label>
                      <select
                        value={hardwareForm.repairHistory}
                        disabled={isHardwareVerified}
                        onChange={(e) => handleHardwareFieldChange('repairHistory', e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          color: 'var(--text-primary)',
                          fontSize: '0.86rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Original Factory Parts">Original Factory Parts (Never Repaired)</option>
                        <option value="Screen Replaced">Screen Replaced (Certified)</option>
                        <option value="Battery Replaced">Battery Replaced (OEM / Compatible)</option>
                        <option value="Third-Party Board Repair">Third-Party Motherboard Repair</option>
                      </select>
                    </div>
                  </div>

                  {/* ACTION: LOCK SPECIFICATIONS BUTTON */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    width: '100%',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px',
                    marginTop: '6px',
                    boxSizing: 'border-box'
                  }}>
                    {isHardwareVerified ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: '10px',
                        flexWrap: 'wrap'
                      }}>
                        <span className="badge badge-emerald" style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle size={15} />
                          <span>Specifications Verified &amp; Locked in Database</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsHardwareVerified(false)}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.78rem', borderRadius: '8px' }}
                        >
                          <Unlock size={13} />
                          <span>Edit Specs</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleLockSpecifications}
                        disabled={scanPercent < 60}
                        className="btn btn-primary"
                        style={{
                          width: '100%',
                          padding: '13px 20px',
                          fontWeight: '800',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
                          cursor: 'pointer',
                          boxSizing: 'border-box'
                        }}
                      >
                        <Lock size={16} />
                        <span>Lock Specifications &amp; Reveal Recycler Bids</span>
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: MATERIAL MATRIX & RECYCLER BIDS (HIDDEN UNTIL SCAN & VERIFICATION) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
              
              {!isHardwareVerified ? (
                /* STANDBY VIEW: Dynamic context-aware state */
                <div style={{
                  background: 'var(--bg-card)',
                  border: currentImage ? '1px solid rgba(16, 185, 129, 0.4)' : '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: currentImage ? '0 10px 30px rgba(16, 185, 129, 0.08)' : 'var(--shadow-sm)',
                  boxSizing: 'border-box',
                  width: '100%'
                }}>
                  {currentImage ? (
                    <>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10B981',
                        marginBottom: '14px'
                      }}>
                        <Sparkles size={26} />
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 6px' }}>
                        3-Layer Hardware Specification Detected
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '5px 12px' }}>
                          Estimated Value: ₹{deviceData.estimatedValue || 450}
                        </span>
                        <span className="badge badge-blue" style={{ fontSize: '0.78rem', padding: '5px 10px' }}>
                          {deviceData.co2Saved || '2.8kg CO₂ saved'}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.5', margin: '0 0 18px' }}>
                        Hardware attributes extracted! Confirm or adjust the specifications above and tap below to lock in the quote and reveal certified recycler bids.
                      </p>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '8px',
                        width: '100%',
                        maxWidth: '460px',
                        marginBottom: '20px',
                        textAlign: 'left'
                      }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Brand / Model</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {hardwareForm.brand} {hardwareForm.modelName}
                          </div>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Condition</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#10B981', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {hardwareForm.physicalCondition}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleLockSpecifications}
                        className="btn btn-primary"
                        style={{
                          width: '100%',
                          maxWidth: '380px',
                          padding: '13px 20px',
                          fontWeight: '800',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
                          cursor: 'pointer'
                        }}
                      >
                        <Lock size={16} />
                        <span>Lock Specifications &amp; Unlock Bids</span>
                        <ArrowRight size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10B981',
                        marginBottom: '14px'
                      }}>
                        <ScanLine size={28} />
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 6px' }}>
                        Awaiting Device Scan &amp; Hardware Verification
                      </h3>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.5', margin: '0 0 20px' }}>
                        Please upload or capture a photo of your electronic device above to initiate Multimodal Vision AI material decoding and receive live recycler payout bids.
                      </p>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '10px',
                        width: '100%',
                        maxWidth: '420px',
                        textAlign: 'left'
                      }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Step 1</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>📷 AI Vision Scan</div>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Step 2</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>⚙️ Confirm Specs</div>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Step 3</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#10B981' }}>💰 Unlock Bids</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* VERIFIED VIEW: Display Material Matrix & Live Recycler Bids */
                <>
                  {/* Fetched Device Specs Card */}
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-md)',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', width: '100%' }}>
                      <div style={{ minWidth: 0, flex: '1 1 200px' }}>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                          Verified Material Matrix &amp; Yield Breakdown
                        </div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0 0', wordBreak: 'break-word', lineHeight: '1.3' }}>
                          {deviceData.title}
                        </h2>
                      </div>

                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                        {deviceData.trend} Market Benchmark
                      </span>
                    </div>

                    {/* Recoverable Precious Metals Grid */}
                    <div style={{ marginBottom: '20px', width: '100%' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                        💎 Recoverable Precious Metals Index:
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: '10px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        {deviceData.recoverableMetals.map((metal, i) => {
                          const match = metal.match(/^([^(]+)\s*\(([^)]+)\)/);
                          const metalName = match ? match[1].trim() : metal;
                          const metalQty = match ? match[2].trim() : '';

                          let iconDot = '⚡';
                          if (metalName.toLowerCase().includes('gold')) iconDot = '🟡';
                          else if (metalName.toLowerCase().includes('silver')) iconDot = '⚪';
                          else if (metalName.toLowerCase().includes('copper')) iconDot = '🟠';
                          else if (metalName.toLowerCase().includes('cobalt')) iconDot = '🔵';
                          else if (metalName.toLowerCase().includes('palladium') || metalName.toLowerCase().includes('platinum')) iconDot = '🟣';

                          return (
                            <div
                              key={i}
                              style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                borderRadius: '12px',
                                padding: '10px 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '4px',
                                boxShadow: 'var(--shadow-sm)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                <span>{iconDot}</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{metalName}</span>
                              </div>
                              <div style={{ fontSize: '0.96rem', fontWeight: '800', color: '#10B981' }}>
                                {metalQty || 'Present'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Base Valuation & CO2 Box */}
                    <div style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      padding: '18px 20px',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Verified Net Quote
                        </div>
                        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#10B981', lineHeight: '1.1', marginTop: '2px' }}>
                          ₹{deviceData.estimatedValue}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                          Condition Adjusted Baseline
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <div className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                          <Leaf size={14} />
                          <span>{deviceData.co2Saved}</span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          Recyclability: <span style={{ color: '#10B981', fontWeight: '700' }}>94.2% High Purity</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recyclers Bidding Card */}
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-md)',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', width: '100%' }}>
                      <div style={{ minWidth: 0, flex: '1 1 200px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: '1.3' }}>
                          Verified Recycler Payout Bids
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '3px 0 0' }}>
                          Live offers from registered CPCB smelters in your district
                        </p>
                      </div>
                      <span className="badge badge-blue" style={{ flexShrink: 0, padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                        <Building2 size={13} />
                        <span>{recyclersList.length} Active Bidders ({currentUser?.district || 'Prayagraj'} Hub)</span>
                      </span>
                    </div>

                    {loadingRecyclers ? (
                      <div style={{ textAlign: 'center', padding: '24px 0', color: '#10B981' }}>
                        <RefreshCw size={22} className="spin-icon" style={{ margin: '0 auto 8px' }} />
                        <p style={{ fontSize: '0.85rem' }}>Querying registered recyclers from MySQL...</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', marginBottom: '16px', paddingRight: '2px', width: '100%', boxSizing: 'border-box' }}>
                        {recyclersList.map((rec) => {
                          const isSelected = selectedRecycler?.id === rec.id;
                          return (
                            <div
                              key={rec.id}
                              onClick={() => setSelectedRecycler(rec)}
                              style={{
                                background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                                border: isSelected ? '2px solid #10B981' : '1px solid var(--border-color)',
                                borderRadius: '14px',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px',
                                transition: 'all 0.2s ease',
                                boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.3)' : 'none',
                                width: '100%',
                                boxSizing: 'border-box'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                                <div style={{
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '10px',
                                  background: isSelected ? '#10B981' : 'var(--bg-card)',
                                  color: isSelected ? '#FFFFFF' : '#10B981',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: '800',
                                  flexShrink: 0
                                }}>
                                  <Building2 size={18} />
                                </div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                    <span style={{ wordBreak: 'break-word' }}>{rec.name || rec.companyName}</span>
                                    {rec.badge && (
                                      <span style={{ fontSize: '0.62rem', background: '#10B981', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '800', flexShrink: 0 }}>
                                        {rec.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', color: 'var(--text-primary)', fontWeight: '700', fontSize: '0.7rem' }}>
                                      CPCB: {rec.cpcbLicense}
                                    </span>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>
                                      📍 {rec.district || currentUser?.district || 'Prayagraj'}
                                    </span>
                                    <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '0.75rem' }}>★ {rec.rating}</span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981', whiteSpace: 'nowrap' }}>
                                  ₹{Math.round(Number(deviceData.estimatedValue || 450) * parseFloat(rec.payoutMultiplier || 1.15))}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                  {rec.payoutMultiplier ? `${rec.payoutMultiplier}x Multiplier` : 'Top Bid'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Doorstep Pickup Schedule & Confirmation Box */}
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '22px',
                    boxShadow: 'var(--shadow-md)',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={18} color="#10B981" />
                      <span>Doorstep Pickup Schedule &amp; Destination</span>
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px', width: '100%' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Complete Pickup Address</label>
                        <input
                          type="text"
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="Street, District, Flat / House No."
                          style={{
                            width: '100%',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: 'var(--text-primary)',
                            fontSize: '0.88rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div className="form-row-responsive">
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Preferred Pickup Time</label>
                          <input
                            type="text"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            placeholder="e.g. Tomorrow, 10:00 AM"
                            style={{
                              width: '100%',
                              background: 'var(--bg-secondary)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              color: 'var(--text-primary)',
                              fontSize: '0.88rem',
                              outline: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Mobile Contact</label>
                          <input
                            type="text"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="10-digit Mobile"
                            style={{
                              width: '100%',
                              background: 'var(--bg-secondary)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              color: 'var(--text-primary)',
                              fontSize: '0.88rem',
                              outline: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      disabled={bookingLoading || !selectedRecycler}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '0.98rem',
                        fontWeight: '800',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      {bookingLoading ? (
                        <>
                          <RefreshCw size={18} className="spin-icon" />
                          <span>Dispatching Doorstep Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Pickup for ₹{Math.round(Number(deviceData.estimatedValue || 450) * parseFloat(selectedRecycler?.payoutMultiplier || 1.15))}</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ORDER CONFIRMATION SCREEN */
        <div className="container" style={{ maxWidth: '640px', paddingTop: '40px', boxSizing: 'border-box' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid #10B981',
            borderRadius: '24px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 6px' }}>
              [DUMMY] Pickup Order Confirmed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0 0 16px' }}>
              Booking Reference: <strong style={{ color: '#10B981', fontFamily: 'monospace' }}>[DUMMY] {confirmedBooking?.requestId || 'ID#4932'}</strong>
            </p>

            {/* ORG ADMIN QUEUE STATUS BADGE WITH EXPLICIT DUMMY TAG */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '12px',
              padding: '12px 14px',
              color: '#F59E0B',
              fontSize: '0.85rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <span>⚡ [DUMMY STATUS] Request Sent to Organization Admin / Recycler Dispatch Queue (Waiting for Logistics Assignment)</span>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '18px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', fontSize: '0.86rem' }}>
              <div>📱 <strong>Device:</strong> {confirmedBooking?.deviceName || deviceData.title}</div>
              <div>🏢 <strong>Assigned Recycler:</strong> {confirmedBooking?.assignedRecycler || selectedRecycler?.name}</div>
              <div>🛡️ <strong>Digital Product Passport:</strong> <strong style={{ color: '#10B981', fontFamily: 'monospace' }}>[DUMMY] DPP-2026-EW-892401</strong></div>
              <div>📍 <strong>Address:</strong> {confirmedBooking?.address || pickupAddress}</div>
              <div>⏰ <strong>Pickup Time:</strong> {confirmedBooking?.pickupTime || pickupTime}</div>
              <div>💰 <strong>Agreed Payout:</strong> <strong style={{ color: '#10B981', fontSize: '1.05rem' }}>₹{confirmedBooking?.offeredPrice || deviceData.estimatedValue || 450}</strong></div>
              <div>🌱 <strong>Environmental Impact:</strong> <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{deviceData.co2Saved}</span></div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setIsBooked(false);
                  handleResetScanner();
                }}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700' }}
              >
                Scan Another Device
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onViewPickups) {
                    onViewPickups();
                  } else if (onNavigate) {
                    onNavigate('donor-dash');
                  }
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700' }}
              >
                View in Donor Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
