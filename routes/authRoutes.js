const express = require('express');
const { loginStudent } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login → Login student
router.post('/login', loginStudent);

module.exports = router;
