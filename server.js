require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const sequelize = require('./config/db')

// Routes
const studentRoutes = require('./routes/studentRoutes')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')
const instructorRoutes = require('./routes/instructorRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
  console.log('📂 Created uploads folder')
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(uploadPath))

// API Routes
app.use('/api', studentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/instructors', instructorRoutes)

// Start server & connect DB
async function start() {
  try {
    await sequelize.authenticate()
    console.log('✅ MySQL connection established')

    await sequelize.sync() // or { alter: false } in prod
    console.log('✅ Models synced with MySQL')

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  }
}

start()
