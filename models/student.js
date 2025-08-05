const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
  profile_picture: { type: String, required: true },
  status: { type: String, required: true },
  submission_date: { type: Date },
  password: { type: String, required: true } // plain text
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)
