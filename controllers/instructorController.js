const Instructor = require('../models/instructor')

// CREATE Instructor
exports.createInstructor = async (req, res, next) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      body.profile_picture = req.file.filename
    }
    const instructor = await Instructor.create(body)
    res.status(201).json({ message: 'Instructor created successfully', data: instructor })
  } catch (error) {
    next(error)
  }
}

// GET All Instructors
exports.getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await Instructor.findAll()
    res.json(instructors)
  } catch (error) {
    next(error)
  }
}

// GET Single Instructor
exports.getInstructorById = async (req, res, next) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id)
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' })
    }
    res.json(instructor)
  } catch (error) {
    next(error)
  }
}

// UPDATE Instructor
exports.updateInstructor = async (req, res, next) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id)
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' })
    }

    const body = { ...req.body }
    if (req.file) {
      body.profile_picture = req.file.filename
    }

    await instructor.update(body)
    res.json({ message: 'Instructor updated successfully', data: instructor })
  } catch (error) {
    next(error)
  }
}

// DELETE Instructor
exports.deleteInstructor = async (req, res, next) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id)
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' })
    }
    await instructor.destroy()
    res.json({ message: 'Instructor deleted successfully' })
  } catch (error) {
    next(error)
  }
}
