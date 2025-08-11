const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
 // Sequelize connection
const Student = require('../models/student'); // Sequelize model

async function insertWizard() {
  try {
    // Connect to MySQL
    await sequelize.authenticate();
    console.log('✅ MySQL connection established');

    // Sync model (optional: use { alter: true } to update table structure)
    await sequelize.sync();

    // Check if student already exists
    const existing = await Student.findOne({ where: { email: 'pp@gmail.com' } });
    if (existing) {
      console.log('⚠️ Student with this email already exists. Skipping insert.');
      return;
    }

   
    const hashedPassword = await bcrypt.hash('123456', 10);

    
    await Student.create({
      full_name: 'Abdullah Ugaz',
      email: 'pp@gmail.com',
      phone: '+25212345678',
      department: 'cs',
      address: 'Hodan',
      profile_picture: 'default.jpg',
      status: 'submitted',
      submission_date: new Date(),
      password: hashedPassword
    });

    console.log('✅ Wizard student inserted with password: 123456');
  } catch (err) {
    console.error('❌ Error inserting student:', err);
  } finally {
    await sequelize.close();
  }
}

insertWizard();
