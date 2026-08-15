const { db } = require('../config/firebase');

class RecyclerService {
  /**
   * Retrieves active pickup requests for a specific recycler
   */
  static async getRequests(recyclerId) {
    // 1. Fetch pickups for this recycler
    const pickupsSnapshot = await db.collection('Pickups')
      .where('recyclerId', '==', recyclerId)
      .get();

    if (pickupsSnapshot.empty) {
      return [];
    }

    const requests = [];

    // 2. Map Pickups and join with Passports
    for (const doc of pickupsSnapshot.docs) {
      const pickup = doc.data();
      
      // Fetch associated Passport to bundle device info, value, and status
      const passportDoc = await db.collection('Passports').doc(pickup.passportId).get();
      
      if (passportDoc.exists) {
        const passport = passportDoc.data();
        
        // Mock distance between 1.5 and 8.5 km
        const distance = (Math.random() * (8.5 - 1.5) + 1.5).toFixed(1) + ' km';

        requests.push({
          pickupId: pickup.pickupId,
          passportId: passport.trackingId,
          deviceId: passport.deviceId,
          deviceCategory: passport.deviceCategory,
          estimatedValueRange: passport.estimatedValueRange,
          location: pickup.location,
          timeSlot: pickup.timeSlot,
          distance,
          status: passport.status, // Current status in the lifecycle
          requestedAt: pickup.createdAt
        });
      }
    }

    // Sort by requestedAt descending
    requests.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));

    return requests;
  }
}

module.exports = RecyclerService;
