const { z } = require('zod');
const ValuationEngineService = require('../services/valuationEngine.service');

// Define validation schema using Zod
const calculateValuationSchema = z.object({
  deviceId: z.string().min(1, 'Device ID is required'),
  recyclerId: z.string().min(1, 'Recycler ID is required'),
});

class ValuationController {
  static async calculateValuation(req, res, next) {
    try {
      // Validate incoming request body
      const validatedData = calculateValuationSchema.parse(req.body);

      // Call the Layer 4 Valuation Engine
      const valuationResult = await ValuationEngineService.calculateValuation(
        validatedData.deviceId,
        validatedData.recyclerId
      );

      return res.status(200).json({
        success: true,
        data: valuationResult
      });
    } catch (error) {
      // Pass errors to the global error handler middleware
      next(error);
    }
  }
}

module.exports = ValuationController;
