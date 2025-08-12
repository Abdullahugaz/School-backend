// routes/courseRoutes.js
const express = require('express')
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController')

const router = express.Router()

router.get('/', getCourses)
router.get('/:id', getCourseById)
router.post('/', createCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router
