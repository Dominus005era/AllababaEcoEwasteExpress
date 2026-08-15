const { z } = require('zod');
const PassportService = require('../services/passport.service');

const generatePassportSchema = z.object({
  deviceId: z.string().min(1, 'Device ID is required'),
  recyclerId: z.string().min(1, 'Recycler ID is required'),
});

class PassportController {
  static async generatePassport(req, res, next) {
    try {
      const validatedData = generatePassportSchema.parse(req.body);
      
      const passport = await PassportService.generatePassport(
        validatedData.deviceId,
        validatedData.recyclerId
      );

      return res.status(201).json({
        success: true,
        data: passport
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PassportController;
