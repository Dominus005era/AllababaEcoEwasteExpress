const { db } = require('../config/firebase');

// Layer 3: Recycler Pricing
class RecyclerPricingService {
  /**
   * Fetch pricing data for a specific recycler
   * @param {string} recyclerId 
   * @returns {Promise<Object>} Recycler pricing data
   */
  static async getPricingByRecycler(recyclerId) {
    if (!db) throw new Error('Database not initialized');

    const doc = await db.collection('RecyclerPricing').doc(recyclerId).get();
    if (!doc.exists) {
      const error = new Error('Recycler Pricing not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Other CRUD operations for Recycler Pricing can be added here
}

module.exports = RecyclerPricingService;
