const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const upload = require('../middleware/upload')


router.post('/students', upload.single('profile_picture'), studentController.createStudent)


router.get('/students', studentController.getAllStudents)


router.put('/students/:id', studentController.updateStudent)


router.delete('/students/:id', studentController.deleteStudent)

module.exports = router
