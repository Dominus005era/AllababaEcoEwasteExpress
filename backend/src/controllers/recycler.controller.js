const RecyclerService = require('../services/recycler.service');

class RecyclerController {
  static async getRequests(req, res, next) {
    try {
      const recyclerId = req.query.recyclerId;
      
      if (!recyclerId) {
        return res.status(400).json({ success: false, error: 'recyclerId query parameter is required' });
      }

      const requests = await RecyclerService.getRequests(recyclerId);

      return res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecyclerController;
