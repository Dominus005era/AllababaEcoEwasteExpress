const { z } = require('zod');
const TraceabilityService = require('../services/traceability.service');

const updateStatusSchema = z.object({
  passportId: z.string().min(1, 'Passport ID is required'),
  newStatus: z.string().min(1, 'New Status is required'),
});

class TraceabilityController {
  static async updateStatus(req, res, next) {
    try {
      const validatedData = updateStatusSchema.parse(req.body);
      
      const result = await TraceabilityService.updateStatus(
        validatedData.passportId,
        validatedData.newStatus
      );

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      // Pass errors to the global error handler
      next(error);
    }
  }
}

module.exports = TraceabilityController;
