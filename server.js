require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/db');


const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Import auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('📂 Created uploads folder');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadPath));

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes); // ✅ Mount authentication routes

// Start server & connect DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established');

    await sequelize.sync();
    console.log('✅ Models synced with MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();
