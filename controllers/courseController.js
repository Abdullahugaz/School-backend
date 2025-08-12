// controllers/courseController.js
const { Op } = require('sequelize')
const Course = require('../models/course')

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).json({ message: 'Created', data: course })
  } catch (err) {
    next(err)
  }
}

exports.getCourses = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100)
    const page = Math.max(parseInt(req.query.page || '1', 10), 1)
    const offset = (page - 1) * limit

    const where = {}
    if (req.query.department) where.department = req.query.department
    if (req.query.q) where.course_name = { [Op.substring]: req.query.q }

    const { rows, count } = await Course.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    })

    res.json({
      data: rows,
      meta: { total: count, page, pages: Math.ceil(count / limit) },
    })
  } catch (err) {
    next(err)
  }
}

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (!course) return res.status(404).json({ message: 'Not found' })
    res.json({ data: course })
  } catch (err) {
    next(err)
  }
}

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (!course) return res.status(404).json({ message: 'Not found' })
    await course.update(req.body)
    res.json({ message: 'Updated', data: course })
  } catch (err) {
    next(err)
  }
}

exports.deleteCourse = async (req, res, next) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } })
    if (!deleted) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}
