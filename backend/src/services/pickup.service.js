const { db } = require('../config/firebase');

class PickupService {
  /**
   * Schedule a new pickup request
   */
  static async schedulePickup(passportId, location, timeSlot, recyclerId) {
    // 1. Verify passport exists
    const passportRef = db.collection('Passports').doc(passportId);
    const passportDoc = await passportRef.get();
    
    if (!passportDoc.exists) {
      const error = new Error('Passport not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Generate Pickup ID (e.g. PU-10482)
    const randomHex = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const pickupId = `PU-${randomHex}`;

    // 3. Construct Pickup Object
    const pickupData = {
      pickupId,
      passportId,
      recyclerId,
      location,
      timeSlot,
      status: 'SCHEDULED', // Pickup specific status
      createdAt: new Date().toISOString()
    };

    // 4. Save to Firestore
    const docRef = db.collection('Pickups').doc(pickupId);
    await docRef.set(pickupData);

    return pickupData;
  }
}

module.exports = PickupService;
