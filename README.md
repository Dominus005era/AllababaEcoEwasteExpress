# ♻️ EcoTrace
> **AI-Powered Doorstep E-Waste Valuation, Digital Product Passport (DPP), & Circular Supply Chain Traceability Platform**

---

## 📌 Executive Overview

**EcoTrace** is an end-to-end circular economy platform designed to solve electronic waste management challenges across India. It connects individual e-waste donors, corporate organizations, and CPCB-authorized smelters and recyclers through a transparent, AI-assisted valuation and Digital Product Passport (DPP) ecosystem.

By leveraging a 4-layer material composition dataset and real-time smelter buyback telemetry, EcoTrace calculates instant monetary valuations for legacy devices while tracking critical carbon offset metrics ($kg\ CO_2$ saved).

---

## 🌟 Primary Portals & Roles

### 1. 📱 E-Waste Donor Portal & Dashboard (`DonorDash.jsx`)
* **AI Device Scanner & Calculator**: Instant device recognition and value estimation based on weight and material purity.
* **CO₂ Offset Telemetry**: Live environmental impact counter tracking carbon offset and precious metals saved from landfills.
* **Doorstep Pickup Booking**: Streamlined scheduling with address validation and time-slot allocation.
* **Digital Product Passport (DPP) Viewer**: Scannable QR code and lifecycle passport generation for every recycled item.

### 2. 🏬 CPCB Authorized Recycler & Smelter Portal (`RecyclerDash.jsx`)
* **Real-time Pickup Queue**: Manage incoming e-waste requests assigned to licensed recycling facilities.
* **Depot Intake & Verification**: Verify physical device arrivals against DPP IDs.
* **Material Extraction Tracking**: Monitor recovery stats for Gold ($Au$), Copper ($Cu$), Silver ($Ag$), and Lithium ($Li$).
* **Lifecycle Status Updater**: Real-time status transitions (`Pickup Booked` ➔ `In Transit` ➔ `Smelter Processing` ➔ `Completed`).

### 3. 🏢 Organization Admin Panel (`OrganizationAdminPage.jsx`)
* **Corporate E-Waste Audits**: Manage multi-branch corporate client accounts, bulk device batches, and compliance reports.
* **Logistics & Worker Allocation**: Dispatch field workers and supervise pickup depot operations.
* **Metals Telemetry Analytics**: Aggregated analytics on precious metals yield and compliance verification.

---

## 📐 Architecture & 4-Layer Valuation Engine

```mermaid
graph TD
    A[Layer 1: Device Specs & Base Weight] --> D[Layer 4: Valuation Engine API]
    B[Layer 2: Material Profiles % Gold, % Copper] --> D
    C[Layer 3: Recycler Market Buyback Rates] --> D
    D --> E[Live Buyback Price & CO2 Savings]
    D --> F[Digital Product Passport Generation]
```

1. **Layer 1 (Devices)**: Generic specifications, categories, and base weights.
2. **Layer 2 (Material Profiles)**: Composition breakdown (e.g., % Gold, % Copper, % Lithium, % Rare Earths).
3. **Layer 3 (Recycler Pricing)**: Live market rates set by CPCB-authorized smelters.
4. **Layer 4 (Valuation Engine)**: Node.js Express service computing real-time valuations and carbon savings.

---

## 🛠️ Essential Technology Stack

| Category | Technology | Role / Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | Single Page Application (SPA) UI library powering Donor, Recycler, and Org Admin portals. |
| **Build Tool** | **Vite 5** | High-performance build tool and local development server. |
| **Icons Suite** | **Lucide React** | SVG icon system used across all 3 user dashboards and modals. |
| **Maps & Routing** | **Leaflet** | Interactive mapping for doorstep pickup routing and CPCB recycler depot locator. |
| **Styling & Theme** | **Custom CSS** | Responsive Glassmorphism design system built with CSS variables. |
| **Backend Runtime** | **Node.js** | Server-side JavaScript execution environment. |
| **Backend Framework** | **Express.js 5** | RESTful API server handling authentication, pickup queues, and DPP passports. |
| **Database** | **Google Cloud Firestore** *(Firebase)* | NoSQL document database storing user profiles, pickup requests, datasets, and DPP records. |
| **Schema Validation** | **Zod** | Type-safe JSON payload validation across API endpoints. |
| **Valuation Engine** | **Custom 4-Layer Engine** | Calculates live monetary device buyback pricing ($₹$) and CO₂ offset ($kg\ CO_2$). |
| **Hosting & Deployment** | **Vercel & Render** | Vercel for React SPA frontend hosting; Render for Express REST API backend. |
| **API Contract** | **OpenAPI 3.0** | REST API endpoint documentation and schema definitions (`openapi.yaml`). |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)

---

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run Vite development server
npm run dev
```
The frontend app will launch at `http://localhost:5173`.

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run Express backend server
npm run dev
```
The API server will launch at `http://localhost:3000`.

---

## 🔌 API Endpoints Reference

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check |
| `POST` | `/api/valuations/calculate` | Calculate real-time device valuation & CO₂ saved |
| `POST` | `/api/passport` | Generate a new Digital Product Passport (DPP) |
| `POST` | `/api/pickup` | Schedule a doorstep e-waste pickup request |
| `GET` | `/api/recycler/requests` | Fetch pending requests assigned to a recycler |
| `PATCH` | `/api/traceability/status` | Update lifecycle status of a DPP item |

---

## 📂 Repository Structure

```text
EcoTrace/
├── backend/                  # Node.js + Express REST API Server
│   ├── src/
│   │   ├── controllers/      # Route controllers (Valuation, Passport, Pickup, etc.)
│   │   ├── services/         # 4-Layer Valuation Engine & Firestore services
│   │   ├── routes/           # Express routes
│   │   └── config/           # Firebase initialization
│   ├── scripts/              # Database seed scripts
│   └── openapi.yaml          # OpenAPI specification
├── frontend/                 # React SPA (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components & modal dialogs
│   │   ├── pages/            # Role-based views & Dashboards (Donor, Recycler, Org Admin)
│   │   ├── services/         # API integration layer
│   │   └── styles/           # Global CSS tokens & themes
│   └── public/               # Public media, icons, and video assets
├── WORK GUID/                # Comprehensive integration guides & developer documentation
├── Founders/                 # Leadership team documentation & assets
└── vercel.json               # Deployment routing configuration
```

---

## 👥 Contributors & Leadership

* **Rahul Kushwaha** (`Dominus005era`)
* **Tanay Singh** (`Tanay-3137`)
* **Ashmit Verma**
* **Ayush Yadav**
* **Md. Umar Zahid**
* **Rishika Singh**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
