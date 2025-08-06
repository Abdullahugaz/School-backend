const Student = require('../models/student'); // Sequelize model
const bcrypt = require('bcrypt');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const {
      full_name,
      email,
      phone,
      department,
      address,
      password,
      status,
      submission_date
    } = req.body;

    const profile_picture = req.file?.filename;

    // Validate required fields
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
      return res.status(400).json({ error: 'All fields are required, including password.' });
    }

    if (status === 'submitted' && !submission_date) {
      return res.status(400).json({ error: 'Submission date is required for submitted status.' });
    }

    // Check if email already exists
    const existing = await Student.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const student = await Student.create({
      full_name,
      email,
      phone,
      department,
      address,
      profile_picture,
      status,
      submission_date: submission_date ? new Date(submission_date) : null,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['id', 'DESC']],
      attributes: { exclude: ['password'] }
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
