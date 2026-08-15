const { db } = require('../config/firebase');

// Layer 1: Devices
class DevicesService {
  /**
   * Fetch a device by ID
   * @param {string} deviceId 
   * @returns {Promise<Object>} Device data
   */
  static async getDeviceById(deviceId) {
    if (!db) throw new Error('Database not initialized');
    
    const doc = await db.collection('Devices').doc(deviceId).get();
    if (!doc.exists) {
      const error = new Error('Device not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Other CRUD operations for Devices can be added here
}

module.exports = DevicesService;
