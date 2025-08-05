const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');

async function insertWizard() {
  await mongoose.connect('mongodb://127.0.0.1:27017/studentdb');

  const existing = await Student.findOne({ email: 'admin@gmail.com' });
  if (existing) {
    console.log('⚠️ Student with this email already exists. Skipping insert.');
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash('123456', 10);

  const student = new Student({
    full_name: 'admin',
    email: 'admin2@gmail.com',
    phone: '+25212345678',
    department: 'cs',
    address: 'Hodan',
    profile_picture: 'default.jpg',
    status: 'submitted',
    submission_date: new Date(),
    password: hashedPassword
  });

  await student.save();
  console.log('✅ Wizard student inserted with password: 123456');
  mongoose.disconnect();
}

insertWizard();
