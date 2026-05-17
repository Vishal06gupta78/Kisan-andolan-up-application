const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['award', 'movement', 'policy', 'social', 'development'],
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  relatedMedia: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

achievementSchema.index({ category: 1, date: -1 });

module.exports = mongoose.model('Achievement', achievementSchema);
