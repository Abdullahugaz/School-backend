const express = require('express')
const Student = require('../models/student')

const router = express.Router()

// DELETE student by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete request for ID:', req.params.id) // debug

    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.json({ message: 'Student deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
