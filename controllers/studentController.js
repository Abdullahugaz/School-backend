const Student = require('../models/student')

exports.createStudent = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

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

    const profile_picture = req.file?.filename

    if (
      !full_name ||
      !email ||
      !phone ||
      !department ||
      !address ||
      !profile_picture ||
      !status ||
      !password
    ) {
      return res.status(400).json({ error: 'All fields are required, including password.' })
    }

    if (status === 'submitted' && !submission_date) {
      return res.status(400).json({ error: 'Submission date is required for submitted status.' })
    }

    const existing = await Student.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' })
    }

    const student = new Student({
      full_name,
      email,
      phone,
      department,
      address,
      profile_picture,
      status,
      submission_date: submission_date ? new Date(submission_date) : null,
      password // plain text
    })

    await student.save()
    res.status(201).json({ message: 'Student registered successfully', student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })
    res.json(students)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
