// models/Course.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Course = sequelize.define(
  'Course',
  {
    course_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    department: {
      // keep as STRING to match your Student model style
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    instructor_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    credits: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      // weeks
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    // optional: a short code, unique
    course_code: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },

    status: {
  type: DataTypes.ENUM('active', 'inactive'),
  allowNull: false,
  defaultValue: 'active'
},

  },
  {
    tableName: 'courses',
    timestamps: true, // createdAt/updatedAt
    underscored: true, // created_at/updated_at if you prefer snake_case
  }
)

module.exports = Course
