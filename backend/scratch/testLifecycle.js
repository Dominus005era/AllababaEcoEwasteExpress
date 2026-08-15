const PassportService = require('../src/services/passport.service');
const PickupService = require('../src/services/pickup.service');
const RecyclerService = require('../src/services/recycler.service');
const TraceabilityService = require('../src/services/traceability.service');

async function testLifecycle() {
  try {
    console.log("=== Testing Traceability Lifecycle ===");
    
    // 1. Generate Passport
    const passport = await PassportService.generatePassport('DEV001', 'REC001');
    const trackingId = passport.trackingId;
    console.log("1. Passport Generated:", trackingId);
    console.log("   Estimated Value:", passport.estimatedValueRange);

    // 2. Schedule Pickup
    const pickup = await PickupService.schedulePickup(trackingId, '123 Tech Park, Bangalore', '10 AM - 12 PM', 'REC001');
    console.log("2. Pickup Scheduled:", pickup.pickupId);

    // 3. Recycler Dashboard
    const requests = await RecyclerService.getRequests('REC001');
    const ourRequest = requests.find(r => r.passportId === trackingId);
    console.log("3. Dashboard Request Found:", ourRequest ? `Yes, Distance: ${ourRequest.distance}` : "No");

    // 4. Traceability State Machine
    console.log("4. Testing Status Transitions...");
    
    // Valid transition
    const t1 = await TraceabilityService.updateStatus(trackingId, 'COLLECTED');
    console.log(`   Valid Transition: REGISTERED -> ${t1.newStatus}`);

    // Invalid transition (skip RECYCLER_RECEIVED and go directly to SORTING)
    try {
      console.log(`   Attempting Invalid Transition: COLLECTED -> SORTING`);
      await TraceabilityService.updateStatus(trackingId, 'SORTING');
      console.error("   ❌ ERROR: State machine allowed an invalid skip!");
    } catch (err) {
      if (err.message === 'RECYCLING CHAIN INCOMPLETE') {
        console.log(`   ✅ SUCCESS: State machine blocked skip with expected error: ${err.message}`);
      } else {
        console.error("   ❌ ERROR: Unexpected error message:", err.message);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("Test failed unexpectedly:", error);
    process.exit(1);
  }
}

testLifecycle();
