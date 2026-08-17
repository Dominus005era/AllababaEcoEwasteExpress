# 🌿 EcoTrace Platform — Complete Frontend-to-Backend Architecture & API Integration Blueprint

**Target Audience:** Backend Lead, API Engineers & Database Architects  
**Purpose:** 100% 1:1 Synchronized Specification between Frontend (`frontend/src/services/api.js` & React Pages) and Backend REST Controllers + MySQL/PostgreSQL Database.

---

## 🧭 1. System Overview & Core Business Logic

EcoTrace operates as an integrated circular economy platform with 4 distinct user roles:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 ECOTRACE SYSTEM TOPOLOGY                               │
└────────────────────────────────────────────────────────────────────────────────────────┘

 ┌────────────────────┐      ┌───────────────────────────┐      ┌─────────────────────────┐
 │ 1. DONOR / CITIZEN │      │ 2. RECYCLING ORGANIZATION │      │ 3. FIELD WORKER / EV    │
 │ (ConsumerApp.jsx / │ ───► │   (OrganizationAdminPage) │ ───► │ (RecyclerDash.jsx /     │
 │    DonorDash.jsx)  │      │                           │      │   GeoLogisticsPage.jsx) │
 └────────────────────┘      └───────────────────────────┘      └─────────────────────────┘
   • Multimodal AI Scan        • Multi-tenant Org Admin    • Receives job in queue
   • Bids from Smelters        • Inbound citizen requests  • GPS live transit telemetry
   • Booking & Instant DPP     • Allocates worker & EV     • Doorstep 4-digit PIN verify
   • Real-time Payout (UPI)    • Depot scale verification  • Auto CPCB Form-2 manifest
                               • Yield recovery analytics
```

---

## 🏛️ 2. Multi-Tenant Organization Admin Architecture

Every CPCB-registered recycling company or smelter enterprise (e.g., `GreenDrop Circular Metals Ltd`) operates with its own isolated **Organization Admin Portal**:
- **Corporate Email**: Domain-specific administrator email (e.g. `admin@greendropmetals.org`).
- **Organization ID**: Unique regulatory partner identifier (e.g. `ORG-GREENDROP-04`).
- **Password**: Secure access key.

### Key Responsibilities of the Organization Admin:
1. **Inbound Citizen Requests Queue**: Review and verify citizen pickup requests in their jurisdiction.
2. **Workforce Allocation**: Assign an employed field worker/driver and an Electric Vehicle (`UP-70-EC-xxxx`) to an incoming request.
3. **DPP Generation**: Activating worker allocation issues the **Digital Product Passport (DPP)** and **4-digit Handover PIN**.
4. **Depot Scale Verification**: Weigh incoming electric vans at the gatehouse dock scale and confirm lot ingestion into smelting batches.
5. **Yield & Compliance Tracking**: Monitor recovery yields of precious metals (Au, Ag, Cu, Pd), CO₂ offsets, and issue CPCB Form-2 transfer certificates.

---

## 📡 3. 1:1 Complete REST API Specification (Matching `src/services/api.js`)

All endpoints use base prefix `/api`. Authentication tokens are passed via header:  
`Authorization: Bearer <token>`

---

### 🔐 A. Authentication & User Management (`authApi`)

#### 1. Donor Registration
- **Endpoint**: `POST /api/auth/register-donor`
- **Frontend Caller**: `AuthPage.jsx`
- **Request Body**:
  ```json
  {
    "email": "aarav.sharma@example.com",
    "password": "SecurePassword123",
    "displayName": "Aarav Sharma",
    "upiId": "aarav@oksbi"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "jwt_token_string",
    "user": {
      "id": "usr_donor_001",
      "email": "aarav.sharma@example.com",
      "displayName": "Aarav Sharma",
      "role": "donor",
      "profileCompleted": false
    }
  }
  ```

#### 2. Recycler / Driver Registration
- **Endpoint**: `POST /api/auth/register-recycler`
- **Frontend Caller**: `AuthPage.jsx`
- **Request Body**:
  ```json
  {
    "email": "rajesh.pilot@greendropmetals.org",
    "password": "SecurePassword123",
    "companyName": "GreenDrop Circular Metals Ltd",
    "customCpcbCode": "CPCB-UP-2026-REC-0891/V1",
    "displayName": "Rajesh Kumar",
    "phone": "+91 98765 43210",
    "address": "Prayagraj Central Depot"
  }
  ```

#### 3. General Login
- **Endpoint**: `POST /api/auth/login`
- **Frontend Caller**: `AuthPage.jsx`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123",
    "targetRole": "donor"
  }
  ```

#### 4. Update Profile & Onboarding Questionnaire
- **Endpoint**: `POST /api/auth/update-profile`
- **Frontend Caller**: `OnboardingQuestionsModal.jsx`, `ProfileSettingsPage.jsx`
- **Request Body**:
  ```json
  {
    "phone": "+91 98765 43210",
    "address": "Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004",
    "district": "Prayagraj",
    "upiId": "aarav@oksbi",
    "profileCompleted": true
  }
  ```

---

### 📦 B. Categories, AI Scans & Valuation Engine (`categoriesApi`, `scansApi`)

#### 1. Get Categories & Benchmark Rates
- **Endpoint**: `GET /api/categories`
- **Frontend Caller**: `ConsumerApp.jsx`
- **Response**: Array of 12 categories with benchmark valuation, trend, CO₂ saved kg, and recoverable precious metals list.

#### 2. Get Brands & Models Meta
- **Endpoint**: `GET /api/categories/meta/brands?category=smartphone`
- **Endpoint**: `GET /api/categories/meta/models?category=smartphone&brand=Apple`
- **Frontend Caller**: `ConsumerApp.jsx` Hardware Observation Step

#### 3. AI Camera Vision Image Analysis
- **Endpoint**: `POST /api/scans/analyze-image`
- **Frontend Caller**: `ConsumerApp.jsx` AI Scanner
- **Request Body**:
  ```json
  {
    "imageBase64": "data:image/jpeg;base64,...",
    "categoryHint": "smartphone"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "identifiedBrand": "Apple",
    "identifiedModel": "iPhone 11 Pro",
    "confidenceScore": 0.96,
    "observedCondition": "Operational - Minor Scratches",
    "estimatedValue": 450.00,
    "benchmarkValue": 1350.00,
    "co2SavedKg": 2.30,
    "recoverableMetals": ["Gold (0.036g)", "Copper (15g)", "Silver (0.37g)"]
  }
  ```

---

### 🚚 C. Pickups & DPP Traceability Engine (`pickupApi`, `recyclersApi`)

#### 1. Create Pickup Request
- **Endpoint**: `POST /api/pickups`
- **Frontend Caller**: `ConsumerApp.jsx` Booking Step
- **Request Body**:
  ```json
  {
    "deviceName": "Apple iPhone 11 Pro 64GB (Space Gray)",
    "category": "Smartphone",
    "brand": "Apple",
    "modelName": "iPhone 11 Pro",
    "offeredPrice": 450.00,
    "co2SavedKg": 2.30,
    "pickupAddress": "Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004",
    "district": "Prayagraj",
    "pickupTime": "Tomorrow, 10:00 AM",
    "selectedRecyclerId": "rec_hub_04"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "requestId": "REQ-4932",
    "dppId": "DPP-2026-EW-892401",
    "verificationPin": "4932",
    "status": "SCHEDULED"
  }
  ```

#### 2. Get User / Recycler Pickups
- **Endpoint**: `GET /api/pickups?userId=usr_donor_001` or `GET /api/pickups?status=all`
- **Frontend Caller**: `DonorDash.jsx`, `RecyclerDash.jsx`

#### 3. Doorstep DPP Handover PIN Verification
- **Endpoint**: `POST /api/recyclers/verify-dpp-handover`
- **Frontend Caller**: `RecyclerDash.jsx` Verification Modal
- **Request Body**:
  ```json
  {
    "requestId": "REQ-4932",
    "enteredPin": "4932",
    "gpsLat": 25.4920,
    "gpsLng": 81.8639
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "PIN verified! Handover completed and UPI settlement processed.",
    "status": "COLLECTED",
    "payoutStatus": "PROCESSED",
    "transactionId": "UPI-SETTLE-89201948",
    "cpcbForm2Manifest": "CPCB-F2-2026-892401"
  }
  ```

---

### 🏢 D. Organization Admin Endpoints (`partnersApi`)

#### 1. Organization 3-Factor Login
- **Endpoint**: `POST /api/partners/login`
- **Frontend Caller**: `OrganizationAdminPage.jsx`
- **Request Body**:
  ```json
  {
    "email": "admin@greendropmetals.org",
    "orgId": "ORG-GREENDROP-04",
    "password": "OrgAdminSecurePassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "org_jwt_token_string",
    "user": {
      "id": "ORG-GREENDROP-04",
      "organizationName": "GreenDrop Circular Metals Ltd (Hub #4)",
      "companyName": "GreenDrop Circular Metals Ltd",
      "email": "admin@greendropmetals.org",
      "cpcbLicense": "CPCB-UP-2026-REC-0891",
      "district": "Prayagraj",
      "role": "org-admin"
    }
  }
  ```

#### 2. Organization Dashboard Telemetry & Recovery Yield
- **Endpoint**: `GET /api/partners/dashboard`
- **Frontend Caller**: `OrganizationAdminPage.jsx`
- **Response**:
  ```json
  {
    "success": true,
    "organization": { ... },
    "telemetry": {
      "totalCollectedTonnage": 18.45,
      "totalRecycledUnits": 2460,
      "totalRevenueGenerated": 628400,
      "co2OffsetTonnes": 49.8,
      "activeCorporateClients": 34,
      "preciousMetalsRecovered": {
        "goldGrams": 158.4,
        "silverGrams": 2340.0,
        "copperKg": 890.0,
        "palladiumGrams": 54.2
      }
    },
    "batches": [ ... ],
    "scheduledDispatches": [ ... ]
  }
  ```

#### 3. Inbound Pickup Requests Queue
- **Endpoint**: `GET /api/partners/incoming-requests`
- **Frontend Caller**: `OrgAdminPickupAllocationsView.jsx`
- **Response**:
  ```json
  {
    "success": true,
    "requests": [
      {
        "requestId": "REQ-4932",
        "dppId": "DPP-2026-EW-892401",
        "dppVerificationPin": "4932",
        "donorName": "Aarav Sharma",
        "donorPhone": "+91 98765 43210",
        "deviceName": "Apple iPhone 11 Pro 64GB (Space Gray)",
        "category": "Smartphone",
        "brand": "Apple",
        "modelName": "iPhone 11 Pro",
        "offeredPrice": 450.00,
        "address": "Room 204, Raman Hostel, MNNIT Campus, Teliarganj, Prayagraj, UP 211004",
        "district": "Prayagraj",
        "status": "ALLOCATED",
        "assignedAgentName": "Rajesh Kumar (EV Pilot)",
        "assignedAgentPhone": "+91 98765 43210",
        "assignedAgentVehicle": "UP-70-EC-8842 (Electric Van)"
      }
    ]
  }
  ```

#### 4. Allocate Worker & EV Pilot
- **Endpoint**: `PATCH /api/partners/requests/:requestId/allocate-recycler`
- **Frontend Caller**: `OrgAdminAllocateWorkerModal.jsx`
- **Request Body**:
  ```json
  {
    "recyclerId": "rec_pilot_01",
    "recyclerName": "Rajesh Kumar (EV Pilot #1)",
    "agentPhone": "+91 98765 43210",
    "agentVehicle": "UP-70-EC-8842"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "dppId": "DPP-2026-EW-892401",
    "verificationPin": "4932",
    "message": "Worker successfully allocated and DPP activated."
  }
  ```

#### 5. Field Recyclers & Fleet Telemetry Monitor
- **Endpoint**: `GET /api/partners/field-recyclers-monitor`
- **Frontend Caller**: `OrgAdminFieldSupervisionView.jsx`
- **Response**:
  ```json
  {
    "success": true,
    "fieldRecyclers": [
      {
        "id": "rec_pilot_01",
        "name": "Rajesh Kumar (EV Fleet Pilot #1)",
        "officerName": "Rajesh Kumar",
        "companyName": "GreenDrop Circular Metals Ltd (Hub #4)",
        "district": "Prayagraj (Zone A - MNNIT/Teliarganj)",
        "activeVehicles": "UP-70-EC-8842 (Electric Van)",
        "operationalPhase": "En Route to REQ-4932",
        "totalAssignedPickups": 6,
        "collectedCount": 4,
        "completedLotsCount": 1
      }
    ]
  }
  ```

#### 6. Depot Gatehouse Scale Intake Verification
- **Endpoint**: `GET /api/partners/depot-intake`
- **Endpoint**: `PATCH /api/partners/depot-intake/:lotId/verify`
- **Frontend Caller**: `OrgAdminDepotIntakeView.jsx`, `OrgAdminVerifyIntakeModal.jsx`
- **Request Body**:
  ```json
  {
    "verifiedWeightKg": 320.5,
    "adminNotes": "Dock scale verified. Consignment cleared into central smelting storage."
  }
  ```

---

## 🗄️ 4. Relational Database Schema (MySQL / PostgreSQL)

```sql
-- 1. Organizations Table (Multi-Tenant Smelter / PRO Hubs)
CREATE TABLE organizations (
    id VARCHAR(64) PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    cpcb_license VARCHAR(100) UNIQUE NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    annual_capacity_mt DECIMAL(10,2) DEFAULT 2500.00,
    epr_category VARCHAR(100) DEFAULT 'Category 1 Smelter',
    contact_person VARCHAR(150),
    contact_phone VARCHAR(20),
    status ENUM('ACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (Citizens, Field Drivers, Admins)
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(150) NOT NULL,
    role ENUM('donor', 'recycler', 'org-admin', 'admin') NOT NULL DEFAULT 'donor',
    phone VARCHAR(20),
    address TEXT,
    district VARCHAR(100) DEFAULT 'Prayagraj',
    upi_id VARCHAR(100),
    assigned_vehicle VARCHAR(50),
    cpcb_worker_badge VARCHAR(100),
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL
);

-- 3. Pickup Requests & DPP Traceability Table
CREATE TABLE pickup_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    organization_id VARCHAR(64) NOT NULL,
    assigned_worker_id VARCHAR(64) NULL,
    
    device_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    physical_condition VARCHAR(150),
    
    offered_price DECIMAL(10,2) NOT NULL,
    benchmark_price DECIMAL(10,2) DEFAULT 0.00,
    co2_saved_kg DECIMAL(8,2) NOT NULL,
    
    dpp_id VARCHAR(64) UNIQUE NULL,
    dpp_verification_pin VARCHAR(10) NULL,
    status ENUM('PENDING', 'ALLOCATED', 'IN_TRANSIT', 'COLLECTED', 'AT_DEPOT', 'RECYCLED', 'CANCELLED') DEFAULT 'PENDING',
    
    pickup_address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL DEFAULT 'Prayagraj',
    pickup_time VARCHAR(100),
    assigned_vehicle VARCHAR(50),
    
    payout_status ENUM('UNPAID', 'PENDING', 'PROCESSED', 'FAILED') DEFAULT 'UNPAID',
    payout_tx_ref VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    FOREIGN KEY (assigned_worker_id) REFERENCES users(id)
);

-- 4. Smelting Batches & Metal Recovery Yield Table
CREATE TABLE metal_recovery_yield (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) NOT NULL,
    batch_number VARCHAR(100) UNIQUE NOT NULL,
    total_weight_kg DECIMAL(10,2) NOT NULL,
    gold_recovered_grams DECIMAL(10,3) DEFAULT 0.000,
    silver_recovered_grams DECIMAL(10,3) DEFAULT 0.000,
    copper_recovered_kg DECIMAL(10,3) DEFAULT 0.000,
    palladium_recovered_grams DECIMAL(10,3) DEFAULT 0.000,
    cpcb_form2_ref VARCHAR(100),
    status ENUM('ingestion', 'processing', 'smelting', 'completed') DEFAULT 'ingestion',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
```

---

## 🚀 5. Local Server Execution Instructions

```bash
# Backend REST Server
cd backend
npm install
npm run dev # Starts Node / Express on http://localhost:5000

# Frontend React App
cd ../frontend
npm install
npm run dev # Starts Vite on http://localhost:3000
```
