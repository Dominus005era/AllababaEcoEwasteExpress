const express = require('express');
const router = express.Router();
const PickupController = require('../controllers/pickup.controller');

router.post('/', PickupController.schedulePickup);

module.exports = router;
