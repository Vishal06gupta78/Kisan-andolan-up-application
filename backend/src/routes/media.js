const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Get all media
router.get('/', async (req, res) => {
  try {
    const { type, category, featured } = req.query;
    const query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const media = await Media.find(query)
      .sort({ order: 1, uploadedAt: -1 })
      .select('-__v');

    res.json({ success: true, count: media.length, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get featured media
router.get('/featured', async (req, res) => {
  try {
    const media = await Media.find({ isFeatured: true })
      .sort({ order: 1 })
      .limit(10);
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create media entry
router.post('/', async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
