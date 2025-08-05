const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================
// REGISTER STUDENT
// ==============================
exports.registerStudent = async (req, res) => {
  try {

    
    const { 
      full_name, 
      email, 
      phone, 
      department, 
      address, 
      status, 
      submission_date, 
      password 
    } = req.body;

    const profile_picture = req.file?.filename;

    // Basic validation
    if (!full_name || !email || !phone || !department || !address || !profile_picture || !status || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Submission date check
    if (status === 'submitted' && !submission_date) {
      return res.status(400).json({ error: 'Submission date is required for submitted status.' });
    }

    // Check duplicate email
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Create new student (password hashing handled by pre-save hook in model)
    const student = new Student({
      full_name,
      email,
      phone,
      department,
      address,
      profile_picture,
      status,
      submission_date: submission_date ? new Date(submission_date) : null,
      password
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// LOGIN STUDENT
// ==============================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find student (include password field)
    const student = await Student.findOne({ email }).select('+password');
    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        full_name: student.full_name,
        email: student.email,
        status: student.status
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
