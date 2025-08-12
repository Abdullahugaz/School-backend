const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Instructor = sequelize.define(
  'Instructor',
  {
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('active','inactive'), allowNull: false, defaultValue: 'active' },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profile_picture: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: 'instructors', timestamps: true, underscored: true }
)

module.exports = Instructor
