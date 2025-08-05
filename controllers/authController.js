const Student = require('../models/student')
const jwt = require('jsonwebtoken')

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('LOGIN ATTEMPT:', email, password) // debug

    // 1️⃣ Required field check
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // 2️⃣ Find student (no select:false because we store plain text)
    const student = await Student.findOne({ email })
    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // 3️⃣ Compare plain text password
    if (student.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // 4️⃣ Create JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    )

    // 5️⃣ Respond with token + student data
    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        full_name: student.full_name,
        email: student.email,
        status: student.status
      }
    })
  } catch (err) {
    console.error('Login Error:', err)
    res.status(500).json({ error: err.message })
  }
}
