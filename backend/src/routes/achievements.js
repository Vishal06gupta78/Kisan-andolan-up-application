const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;

    const achievements = await Achievement.find(query)
      .sort({ order: 1, date: -1 })
      .populate('relatedMedia', 'url thumbnailUrl type')
      .select('-__v');

    res.json({ success: true, count: achievements.length, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get achievement by ID
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)
      .populate('relatedMedia');

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'उपलब्धि नहीं मिली' });
    }

    res.json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create achievement
router.post('/', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
