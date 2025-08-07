const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const upload = require('../middleware/upload')

// POST (create)
router.post('/students', upload.single('profile_picture'), studentController.createStudent)

// GET (read)
router.get('/students', studentController.getAllStudents)

// PUT (update)
router.put('/students/:id', studentController.updateStudent)

// DELETE
router.delete('/students/:id', studentController.deleteStudent)

module.exports = router
