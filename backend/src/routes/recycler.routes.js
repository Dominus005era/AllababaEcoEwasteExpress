const express = require('express');
const router = express.Router();
const RecyclerController = require('../controllers/recycler.controller');

router.get('/requests', RecyclerController.getRequests);

module.exports = router;
