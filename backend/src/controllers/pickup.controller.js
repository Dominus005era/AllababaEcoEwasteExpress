const { z } = require('zod');
const PickupService = require('../services/pickup.service');

const schedulePickupSchema = z.object({
  passportId: z.string().min(1, 'Passport ID is required'),
  location: z.string().min(1, 'Location is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  recyclerId: z.string().min(1, 'Recycler ID is required'),
});

class PickupController {
  static async schedulePickup(req, res, next) {
    try {
      const validatedData = schedulePickupSchema.parse(req.body);
      
      const pickup = await PickupService.schedulePickup(
        validatedData.passportId,
        validatedData.location,
        validatedData.timeSlot,
        validatedData.recyclerId
      );

      return res.status(201).json({
        success: true,
        data: pickup
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PickupController;
