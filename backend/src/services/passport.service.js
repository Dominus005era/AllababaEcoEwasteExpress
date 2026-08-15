const { db } = require('../config/firebase');
const ValuationEngineService = require('./valuationEngine.service');
const DevicesService = require('./devices.service');

class PassportService {
  /**
   * Generates a new Digital E-Waste Passport
   */
  static async generatePassport(deviceId, recyclerId) {
    // 1. Compute exact valuation dynamically
    const valuation = await ValuationEngineService.calculateValuation(deviceId, recyclerId);
    
    // 2. Fetch device to get category
    const device = await DevicesService.getDeviceById(deviceId);

    // 3. Generate Tracking ID (e.g. EW-YYYY-XXXXXX)
    const year = new Date().getFullYear();
    const randomHex = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const trackingId = `EW-${year}-${randomHex}`;

    // 4. Compute +/- 10% range for estimated value
    const baseValue = valuation.userReceives;
    const estimatedValueRange = {
      min: Number((baseValue * 0.9).toFixed(2)),
      max: Number((baseValue * 1.1).toFixed(2))
    };

    // 5. Construct Passport Object
    const passportData = {
      trackingId,
      deviceId,
      recyclerId,
      deviceCategory: device.categoryName,
      estimatedValueRange,
      materialsList: Object.keys(valuation.materialBreakdown), // Just the names or full breakdown? Let's do names.
      status: 'REGISTERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 6. Save to Firestore
    const docRef = db.collection('Passports').doc(trackingId);
    await docRef.set(passportData);

    return passportData;
  }
}

module.exports = PassportService;
