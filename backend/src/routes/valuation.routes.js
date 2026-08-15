const express = require('express');
const router = express.Router();
const ValuationController = require('../controllers/valuation.controller');

// Route for calculating valuations dynamically
router.post('/calculate', ValuationController.calculateValuation);

module.exports = router;
