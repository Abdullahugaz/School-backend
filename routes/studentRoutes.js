const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { registerStudent, loginStudent } = require('../controllers/authController');
const { getAllStudents } = require('../controllers/studentController');

// Public
router.post('/register', upload.single('profile_picture'), registerStudent);
router.post('/login', loginStudent);

// Protected
router.get('/', auth, getAllStudents);

module.exports = router;
