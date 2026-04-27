const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const authMiddleware = require('../middleware/auth.middleware');

// GET all experience (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create experience (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { period, role, company, description, order } = req.body;
    const experience = new Experience({
      period,
      role,
      company,
      description,
      order: parseInt(order) || 0,
    });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update experience (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE experience (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
