const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/enable', userController.enable);
router.post('/disable', userController.disable);

module.exports = router;
