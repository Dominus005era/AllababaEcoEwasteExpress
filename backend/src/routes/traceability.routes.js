const express = require('express');
const router = express.Router();
const TraceabilityController = require('../controllers/traceability.controller');

router.patch('/status', TraceabilityController.updateStatus);

module.exports = router;
