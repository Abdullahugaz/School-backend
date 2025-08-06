const express = require('express');
const Student = require('../models/student'); // Sequelize model

const router = express.Router();

// DELETE student by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete request for ID:', req.params.id);

    const deletedCount = await Student.destroy({
      where: { id: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
