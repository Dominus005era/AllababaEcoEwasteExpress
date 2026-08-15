const { db } = require('../config/firebase');

// Layer 2: Material Profiles
class MaterialProfilesService {
  /**
   * Fetch a material profile by ID
   * @param {string} profileId 
   * @returns {Promise<Object>} Material profile data (e.g., % composition of materials)
   */
  static async getProfileById(profileId) {
    if (!db) throw new Error('Database not initialized');

    const doc = await db.collection('MaterialProfiles').doc(profileId).get();
    if (!doc.exists) {
      const error = new Error('Material Profile not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  // Other CRUD operations for Material Profiles can be added here
}

module.exports = MaterialProfilesService;
