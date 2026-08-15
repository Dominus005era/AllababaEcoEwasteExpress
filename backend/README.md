# E-Waste Management Platform Backend

This is the Node.js + Express backend for the E-Waste Management Platform. It uses a Firebase/Firestore database architecture divided into distinct logical layers, with a ValuationEngine API to compute real-time pricing and valuations.

## Architecture

The backend consists of a 4-layer architecture:

1. **Devices** (Layer 1): Stores generic device information (e.g., Make, Model, base weight).
2. **Material Profiles** (Layer 2): Stores material composition data for various device types (e.g., % Gold, % Copper).
3. **Recycler Pricing** (Layer 3): Stores current market rates and pricing set by recyclers for specific materials or devices.
4. **Valuation Engine** (Layer 4): A logical service layer (API) that dynamically queries the first 3 layers to calculate real-time valuations.

## Prerequisites

- Node.js (v18 or higher)
- A Firebase project with Firestore database initialized

## Local Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase Credentials

1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Project Settings** > **Service Accounts**.
3. Click **Generate new private key** to download the `serviceAccountKey.json` file.
4. Place the downloaded `serviceAccountKey.json` file in the root directory of this backend project (`ewaste-backend/`).

*(Note: Do not commit `serviceAccountKey.json` to version control. It is already added to `.gitignore`.)*

### 3. Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Update the values in the `.env` file:
- `PORT`: The port the server will run on (default: 3000).

### 4. Run the Server

To run the server in development mode (with hot reloading via `nodemon`):

```bash
npm run dev
```

To run the server in production mode:

```bash
npm start
```

## API Endpoints

### Valuations

- `POST /api/valuations/calculate`
  - Body: `{ "deviceId": "string", "recyclerId": "string" }`
  - Calculates and returns the real-time valuation of a device based on material profiles and current recycler pricing.
