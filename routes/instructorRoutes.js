const express = require('express')
const multer = require('multer')
const path = require('path')
const ctrl = require('../controllers/instructorController')

const router = express.Router()

// Multer (same uploads dir you already serve)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `instructor_${Date.now()}${path.extname(file.originalname)}`),
})
const upload = multer({ storage })

router.get('/', ctrl.getAllInstructors)
router.get('/:id', ctrl.getInstructorById)
router.post('/', upload.single('profile_picture'), ctrl.createInstructor)
router.put('/:id', upload.single('profile_picture'), ctrl.updateInstructor)
router.delete('/:id', ctrl.deleteInstructor)

module.exports = router
