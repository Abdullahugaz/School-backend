const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const { 
      full_name, 
      email, 
      phone, 
      department, 
      address, 
      status, 
      submission_date 
    } = req.body;

    const profile_picture = req.file?.filename;

    // Basic validation
    if (!full_name || !email || !phone || !department || !address || !profile_picture || !status) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // If status is 'submitted', ensure submission_date is provided
    if (status === 'submitted' && !submission_date) {
      return res.status(400).json({ error: 'Submission date is required for submitted status.' });
    }

    const student = new Student({
      full_name,
      email,
      phone,
      department,
      address,
      profile_picture,
      status,
      submission_date: submission_date ? new Date(submission_date) : null
    });

    await student.save();
    res.status(201).json({ message: 'Student created', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
