const express = require('express');
const router = express.Router();
const PassportController = require('../controllers/passport.controller');

router.post('/', PassportController.generatePassport);

module.exports = router;
