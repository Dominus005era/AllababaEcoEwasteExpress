const DevicesService = require('./devices.service');
const MaterialProfilesService = require('./materialProfiles.service');
const RecyclerPricingService = require('./recyclerPricing.service');

// Layer 4: Valuation Engine (API Logic Layer)
class ValuationEngineService {
  /**
   * Calculates the valuation of a device for a specific recycler
   * @param {string} deviceId 
   * @param {string} recyclerId 
   * @returns {Promise<Object>} Calculated valuation details
   */
  static async calculateValuation(deviceId, recyclerId) {
    // 1. Fetch Device details
    const device = await DevicesService.getDeviceById(deviceId);
    
    if (!device.materialProfileId) {
      throw new Error('Device does not have an associated material profile');
    }

    // 2. Fetch Material Profile
    const profile = await MaterialProfilesService.getProfileById(device.materialProfileId);
    
    // 3. Fetch Recycler Pricing
    const pricing = await RecyclerPricingService.getPricingByRecycler(recyclerId);

    // 4. Perform dynamic calculation
    let totalRecoverableValue = 0;
    const materialBreakdown = {};

    // Calculate value from percentage-based materials (kg based rates)
    if (profile.materialsPercentage && pricing.rates && device.baseWeight) {
      for (const [material, percentage] of Object.entries(profile.materialsPercentage)) {
        const rate = pricing.rates[material] || 0; // rate per kg
        const weightOfMaterialKg = device.baseWeight * percentage;
        const value = weightOfMaterialKg * rate;
        
        if (value > 0) {
          materialBreakdown[material] = {
            weight: weightOfMaterialKg,
            unit: 'kg',
            rate,
            value
          };
          totalRecoverableValue += value;
        }
      }
    }

    // Calculate value from precious metals (gram based rates)
    if (profile.preciousMetalsGrams && pricing.rates) {
      for (const [metal, grams] of Object.entries(profile.preciousMetalsGrams)) {
        const rate = pricing.rates[metal] || 0; // rate per g
        const value = grams * rate;

        if (value > 0) {
          materialBreakdown[metal] = {
            weight: grams,
            unit: 'g',
            rate,
            value
          };
          totalRecoverableValue += value;
        }
      }
    }

    // 5. Apply Deductions
    const OPERATIONAL_COST_PERCENTAGE = 0.20;
    const RECYCLER_MARGIN_PERCENTAGE = 0.10;

    const operationalCost = totalRecoverableValue * OPERATIONAL_COST_PERCENTAGE;
    const recyclerMargin = totalRecoverableValue * RECYCLER_MARGIN_PERCENTAGE;

    // 6. Final "User Receives" Value
    let userReceives = totalRecoverableValue - operationalCost - recyclerMargin;
    userReceives = Math.max(0, userReceives); // Ensure it doesn't go below 0

    return {
      deviceId,
      recyclerId,
      baseWeight: device.baseWeight,
      totalRecoverableValue: Number(totalRecoverableValue.toFixed(2)),
      deductions: {
        operationalCost: Number(operationalCost.toFixed(2)),
        recyclerMargin: Number(recyclerMargin.toFixed(2))
      },
      userReceives: Number(userReceives.toFixed(2)),
      materialBreakdown,
      calculatedAt: new Date().toISOString()
    };
  }
}

module.exports = ValuationEngineService;
