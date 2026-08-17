# 🌿 EcoTrace: Circular E-Waste & Mineral Recovery Platform
## Complete Working Prototype & Action-by-Action UI Walkthrough

This document showcases the **real, active working prototype screenshots** captured directly from the live browser interface of EcoTrace. It demonstrates the complete end-to-end circular workflow from **AI Optical Hardware Scanning** and **Precious Elemental Yield Valuation** to **Reverse Bidding**, **Organization Review**, **Cryptographic Digital Product Passport (DPP) Issuance**, **Geo-Logistics Dispatch Tracking**, and **4-Digit PIN Handover Verification**.

---

### 📑 Workflow Table of Contents

| Step | Action & Stage | Key Real Screen Captured |
| :---: | :--- | :--- |
| **01** | [AI Optical Hardware Scan in Action](#step-01-ai-optical-hardware-scan-in-action) | [`working_01_device_scanning_hud.png`](prototype_workflow_screenshots/working_01_device_scanning_hud.png) |
| **02** | [AI Elemental Yield & Valuation Output](#step-02-ai-elemental-yield--valuation-output) | [`working_02_elemental_mineral_yield_card.png`](prototype_workflow_screenshots/working_02_elemental_mineral_yield_card.png) |
| **03** | [Certified Recycler Bidders Marketplace](#step-03-certified-recycler-bidders-marketplace) | [`working_03_certified_bidders_marketplace.png`](prototype_workflow_screenshots/working_03_certified_bidders_marketplace.png) |
| **04** | [Placing Doorstep Pickup Booking Form](#step-04-placing-doorstep-pickup-booking-form) | [`working_04_booking_confirmation_form.png`](prototype_workflow_screenshots/working_04_booking_confirmation_form.png) |
| **05** | [Order Placed & Awaiting Organization Review](#step-05-order-placed--awaiting-organization-review) | [`working_05_donor_order_pending_review.png`](prototype_workflow_screenshots/working_05_donor_order_pending_review.png) |
| **06** | [Organization Admin Inbound Request Queue](#step-06-organization-admin-inbound-request-queue) | [`working_06_org_admin_inbound_queue.png`](prototype_workflow_screenshots/working_06_org_admin_inbound_queue.png) |
| **07** | [Org Admin Allocating Worker & Minting DPP](#step-07-org-admin-allocating-worker--minting-dpp) | [`working_07_org_admin_worker_allocation_modal.png`](prototype_workflow_screenshots/working_07_org_admin_worker_allocation_modal.png) |
| **08** | [Donor Digital Product Passport (DPP) with 4-Digit PIN](#step-08-donor-digital-product-passport-dpp-with-4-digit-pin) | [`working_08_donor_dpp_card_with_pin.png`](prototype_workflow_screenshots/working_08_donor_dpp_card_with_pin.png) |
| **09** | [Recycler Dashboard Assigned Dispatch Duty](#step-09-recycler-dashboard-assigned-dispatch-duty) | [`working_09_recycler_assigned_dispatch_job.png`](prototype_workflow_screenshots/working_09_recycler_assigned_dispatch_job.png) |
| **10** | [Live Geo-Logistics & GPS Dispatch Route Tracking](#step-10-live-geo-logistics--gps-dispatch-route-tracking) | [`working_10_geologistics_live_route_tracking.png`](prototype_workflow_screenshots/working_10_geologistics_live_route_tracking.png) |
| **11** | [Recycler Entering DPP 4-Digit Handover PIN](#step-11-recycler-entering-dpp-4-digit-handover-pin) | [`working_11_recycler_dpp_pin_verification_input.png`](prototype_workflow_screenshots/working_11_recycler_dpp_pin_verification_input.png) |
| **12** | [Handover Verified & Custody Transferred](#step-12-handover-verified--custody-transferred) | [`working_12_handover_verified_custody_transferred.png`](prototype_workflow_screenshots/working_12_handover_verified_custody_transferred.png) |

---

### Step 01: AI Optical Hardware Scan in Action
The user opens the AI Scanner HUD. A camera feed or uploaded hardware image (e.g. *Apple iPhone 13 Pro Max*) is loaded into the viewfinder. The neural computer vision engine performs multimodal boundary detection, chassis inspection, screen wear analysis, and hardware model categorization.

![Step 01 - AI Optical Hardware Scan in Action](prototype_workflow_screenshots/working_01_device_scanning_hud.png)

* **Working Mechanics**:
  * Real-time camera viewfinder with bounding box tracking and hardware preset selectors (Smartphones, Laptops, PCBs, Batteries, Servers).
  * Multimodal condition appraisal: Evaluates chassis damage, battery status, and board-level integrity.

---

### Step 02: AI Elemental Yield & Valuation Output
The multimodal AI computes the exact yellow elemental precious metals yield (Gold Au, Copper Cu, Silver Ag, Lithium Li) recovered from the device architecture and calculates the dynamic fair market value.

![Step 02 - AI Elemental Yield & Valuation Output](prototype_workflow_screenshots/working_02_elemental_mineral_yield_card.png)

* **Real Recoverable Output**:
  * **Gold (Au)**: `0.034 grams`
  * **Copper (Cu)**: `15.2 grams`
  * **Silver (Ag)**: `0.35 grams`
  * **Lithium (Li)**: `4.8 grams`
  * **CO2 Offset**: `2.85 kg`
  * **Instant Payout Valuation**: `₹580.00`

---

### Step 03: Certified Recycler Bidders Marketplace
The reverse bidding marketplace connects the donor with authorized regional smelters and refiners in real time. Each bidder displays their CPCB accreditation, distance, custom payout multiplier, and verified instant cash offer.

![Step 03 - Certified Bidders Marketplace](prototype_workflow_screenshots/working_03_certified_bidders_marketplace.png)

* **Active Bidders Displayed**:
  * **Greenscape Eco Management Pvt Ltd**: 1.25x Multiplier (`₹580`) • 4.2 km • CPCB Certified.
  * **CleanMetal Refineries Pvt Ltd**: 1.20x Multiplier (`₹550`) • 8.1 km • ISO 14001 Hub.
  * **EcoGreen Smelters & Refining**: 1.15x Multiplier (`₹525`) • 12.0 km • Hazardous E-Waste Permit.

---

### Step 04: Placing Doorstep Pickup Booking Form
The donor selects their chosen bidder (*Greenscape Eco Management*), confirms their doorstep pickup address in Prayagraj, selects their preferred time window, and clicks **"Confirm Pickup"**.

![Step 04 - Placing Doorstep Booking](prototype_workflow_screenshots/working_04_booking_confirmation_form.png)

* **Form Fields**:
  * Selected Bidder: *Greenscape Eco Management Pvt Ltd*
  * Doorstep Address: *Plot 14, Civil Lines, Prayagraj, UP 211001*
  * Payout Agreed: *₹580.00 Direct UPI Settlement*

---

### Step 05: Order Placed & Awaiting Organization Review
Immediately upon booking, the order reference `REQ-2026-IPHONE13` is recorded into MySQL with status `pending_org_review`. The Donor Dashboard shows the live status badge and notification:  
*"Pickup request submitted to Organization Admin. You will soon be allocated with a certified Recycler Field Pilot & Digital Product Passport (DPP)."*

![Step 05 - Order Placed & Pending Org Review](prototype_workflow_screenshots/working_05_donor_order_pending_review.png)

---

### Step 06: Organization Admin Inbound Request Queue
The Organization Sub-Admin logs in to their dedicated portal (`/org-admin`). Due to strict multi-tenant isolation, the admin sees **only** orders routed to *Greenscape Eco Management*.

![Step 06 - Organization Admin Inbound Queue](prototype_workflow_screenshots/working_06_org_admin_inbound_queue.png)

* **Visible Inbound Details**:
  * Reference ID: `REQ-2026-IPHONE13`
  * Citizen Donor: *Aarav Sharma*
  * Item: *Apple iPhone 13 Pro Max (128GB)*
  * Status: `Pending Org Allocation`
  * Action: `[ Allocate Field Recycler ]`

---

### Step 07: Org Admin Allocating Worker & Minting DPP
The Organization Admin clicks *Allocate Recycler*, selects active field pilot **Rahul Sharma (Field Pilot #1)** from their workforce, assigns vehicle `UP-70-AB-1042`, and clicks **"Authorize & Mint Digital Product Passport (DPP)"**.

![Step 07 - Org Admin Allocating Worker](prototype_workflow_screenshots/working_07_org_admin_worker_allocation_modal.png)

* **Cryptographic DPP Generation**:
  * Passport ID: `DPP-2026-UP-7841`
  * Secret Handover PIN: `4920`
  * Status transitioned to: `allocated` / `active`

---

### Step 08: Donor Digital Product Passport (DPP) with 4-Digit PIN
The donor's tracking view updates immediately to display the official **Digital Product Passport (DPP)** card with a live QR code, assigned pilot details, and the **4-digit Handover PIN (`4920`)**.

![Step 08 - Donor DPP Card with PIN](prototype_workflow_screenshots/working_08_donor_dpp_card_with_pin.png)

* **Anti-Fraud Mechanism**: *"The field recycler cannot claim custody without the donor providing this exact 4-digit PIN upon arrival."*

---

### Step 09: Recycler Dashboard Assigned Dispatch Duty
Field Pilot Rahul Sharma logs in to the Recycler Portal (`/recycler`). The allocated order immediately appears in his **"Active Duty Pickups"** dispatch queue with full address navigation and item payout info.

![Step 09 - Recycler Assigned Dispatch](prototype_workflow_screenshots/working_09_recycler_assigned_dispatch_job.png)

---

### Step 10: Live Geo-Logistics & GPS Dispatch Route Tracking
The user or recycler opens the **Geo-Logistics Tracking Interface (`/geologistics`)**, showing real-time GPS telemetry, vehicle route breadcrumbs, pickup waypoints, and transit ETA.

![Step 10 - Live Geo Logistics Route Tracking](prototype_workflow_screenshots/working_10_geologistics_live_route_tracking.png)

---

### Step 11: Recycler Entering DPP 4-Digit Handover PIN
Upon arriving at the donor's doorstep, the field recycler verifies the physical hardware and enters the donor's **4-digit PIN (`4920`)** into the strict verification HUD.

![Step 11 - Recycler Entering DPP PIN](prototype_workflow_screenshots/working_11_recycler_dpp_pin_verification_input.png)

* **Security Verification**: If a wrong PIN (e.g. `0000`) is entered, the system strictly denies custody with `401 Unauthorized`. When `4920` is entered, physical custody is transferred.

---

### Step 12: Handover Verified & Custody Transferred
The handover is confirmed! The order transitions to `picked_up` / `verified_and_transferred`, the payout of **₹580** is settled directly to the donor's UPI ID, and the audit log is recorded into the CPCB EPR register.

![Step 12 - Handover Verified & Custody Transferred](prototype_workflow_screenshots/working_12_handover_verified_custody_transferred.png)

---

## 🏆 Prototype Presentation Pitch Deck Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ECOTRACE CIRCULAR FLOW SUMMARY                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. AI CAMERA SCAN   ──▶ Multimodal Gemini Vision detects Gold/Copper/Li.     │
│ 2. REVERSE AUCTION  ──▶ CPCB Smelters compete with transparent instant bids.│
│ 3. CRYPTO DPP       ──▶ Anti-tamper Digital Product Passport + 4-Digit PIN. │
│ 4. GEO-DISPATCH     ──▶ Live GPS route tracking & field pilot dispatch.     │
│ 5. PIN HANDOVER     ──▶ Verified custody transfer & instant UPI payout.     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---
*Created and validated on the live EcoTrace system. All screenshots are authentic, unedited captures of the real running application.*
