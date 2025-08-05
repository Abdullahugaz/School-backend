const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
  profile_picture: { type: String, required: true },
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft', required: true },
  submission_date: { type: Date },
  password: { type: String, required: true, minlength: 6, select: false },
  createdAt: { type: Date, default: Date.now }
});

// Automatically hash password before saving
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Student', StudentSchema);
