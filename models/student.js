const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define(
  "Student",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    submission_date: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: true, 
  }
);

module.exports = Student;

