const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  category: {
    type: String,
    enum: ['movement', 'meeting', 'award', 'rally', 'other'],
    default: 'other'
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: null
  },
  s3Key: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

mediaSchema.index({ type: 1, category: 1 });
mediaSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Media', mediaSchema);
