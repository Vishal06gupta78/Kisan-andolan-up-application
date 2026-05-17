const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  fullName: {
    type: String,
    required: [true, 'पूरा नाम आवश्यक है'],
    trim: true,
    maxlength: [100, 'नाम 100 अक्षरों से अधिक नहीं हो सकता']
  },
  fatherName: {
    type: String,
    required: [true, 'पिता का नाम आवश्यक है'],
    trim: true
  },
  address: {
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, default: 'उत्तर प्रदेश' },
    pincode: { type: String, required: true }
  },
  phone: {
    type: String,
    required: [true, 'मोबाइल नंबर आवश्यक है'],
    match: [/^[0-9]{10}$/, 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें']
  },
  email: {
    type: String,
    lowercase: true,
    sparse: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  occupation: {
    type: String,
    enum: ['किसान', 'मजदूर', 'व्यापारी', 'अन्य'],
    default: 'किसान'
  },
  photoUrl: {
    type: String,
    default: null
  },
  cardUrl: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
memberSchema.index({ memberId: 1 });
memberSchema.index({ phone: 1 });
memberSchema.index({ 'address.district': 1 });

module.exports = mongoose.model('Member', memberSchema);