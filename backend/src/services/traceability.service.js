const { db } = require('../config/firebase');

const LIFECYCLE_STATES = [
  'REGISTERED',
  'COLLECTED',
  'RECYCLER_RECEIVED',
  'SORTING',
  'RESPONSIBLY_RECYCLED'
];

class TraceabilityService {
  /**
   * Updates the lifecycle status of a passport, ensuring linear progression
   */
  static async updateStatus(passportId, newStatus) {
    // 1. Verify new status is valid
    const newStatusIndex = LIFECYCLE_STATES.indexOf(newStatus);
    if (newStatusIndex === -1) {
      const error = new Error('Invalid status provided');
      error.statusCode = 400;
      throw error;
    }

    // 2. Fetch current passport
    const passportRef = db.collection('Passports').doc(passportId);
    const passportDoc = await passportRef.get();
    
    if (!passportDoc.exists) {
      const error = new Error('Passport not found');
      error.statusCode = 404;
      throw error;
    }

    const currentStatus = passportDoc.data().status;
    const currentStatusIndex = LIFECYCLE_STATES.indexOf(currentStatus);

    // 3. Strict Linear State Validation
    // A status can only be updated to the exact NEXT status in the array
    if (newStatusIndex !== currentStatusIndex + 1) {
      // If trying to skip or go backwards
      const error = new Error('RECYCLING CHAIN INCOMPLETE');
      error.statusCode = 409; // Conflict
      error.details = `Cannot transition from ${currentStatus} to ${newStatus}`;
      throw error;
    }

    // 4. Update status in Firestore
    await passportRef.update({
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    return {
      passportId,
      oldStatus: currentStatus,
      newStatus,
      message: 'Status transitioned successfully'
    };
  }
}

module.exports = TraceabilityService;
