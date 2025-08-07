const Student = require('../models/student')
const bcrypt = require('bcrypt')

// CREATE Student
exports.createStudent = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      department,
      address,
      password,
      status,
      submission_date
    } = req.body

    const profile_picture = req.file?.filename || null

    if (!full_name || !email || !phone || !department || !address || !status || !password) {
      return res.status(400).json({ error: 'All fields except profile picture and submission date are required.' })
    }

    if (status === 'submitted' && !submission_date) {
      return res.status(400).json({ error: 'Submission date is required when status is submitted.' })
    }

    const existing = await Student.findOne({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const student = await Student.create({
      full_name,
      email,
      phone,
      department,
      address,
      password: hashedPassword,
      status,
      submission_date: submission_date ? new Date(submission_date) : null,
      profile_picture
    })

    res.status(201).json({ message: 'Student registered successfully', student })
  } catch (err) {
    console.error('Error creating student:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

// READ all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['createdAt', 'DESC']]
    })
    res.json(students)
  } catch (err) {
    console.error('Error fetching students:', err)
    res.status(500).json({ error: 'Failed to fetch students' })
  }
}

// UPDATE student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const {
      full_name,
      email,
      phone,
      department,
      address,
      status,
      submission_date
    } = req.body

    const student = await Student.findByPk(id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    await student.update({
      full_name,
      email,
      phone,
      department,
      address,
      status,
      submission_date: submission_date ? new Date(submission_date) : null
    })

    res.json({ message: 'Student updated successfully', student })
  } catch (err) {
    console.error('Error updating student:', err)
    res.status(500).json({ error: 'Failed to update student' })
  }
}

// DELETE student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    const student = await Student.findByPk(id)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    await student.destroy()

    res.json({ message: 'Student deleted successfully' })
  } catch (err) {
    console.error('Error deleting student:', err)
    res.status(500).json({ error: 'Failed to delete student' })
  }
}
