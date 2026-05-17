const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { generateMemberCard } = require('../utils/cardGenerator');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() });

// Dynamic base URL for production
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

// Create local directory for cards
const cardsDir = path.join(__dirname, '../../public/cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

// Get all members with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const members = await Member.find({ isActive: true })
      .sort({ joinedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');
    
    const total = await Member.countDocuments({ isActive: true });
    
    res.json({
      success: true,
      data: members,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register new member
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { fullName, fatherName, village, district, pincode, phone, email, dateOfBirth, occupation } = req.body;
    
    // Validation
    if (!fullName || !fatherName || !village || !district || !pincode || !phone || !dateOfBirth) {
      return res.status(400).json({ 
        success: false, 
        message: 'सभी आवश्यक फील्ड भरें' 
      });
    }
    
    // Check if phone already exists
    const existing = await Member.findOne({ phone });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'यह मोबाइल नंबर पहले से पंजीकृत है' 
      });
    }
    
    // Generate unique member ID
    const memberId = `KISAN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    let photoUrl = null;
    
    // Save photo locally if provided
    if (req.file) {
      const photoFileName = `${memberId}-photo.jpg`;
      const photoPath = path.join(cardsDir, photoFileName);
      fs.writeFileSync(photoPath, req.file.buffer);
      photoUrl = `${BASE_URL}/cards/${photoFileName}`;
    }
    
    const member = new Member({
      memberId,
      fullName,
      fatherName,
      address: { village, district, state: 'उत्तर प्रदेश', pincode },
      phone,
      email: email || undefined,
      dateOfBirth: new Date(dateOfBirth),
      occupation: occupation || 'किसान',
      photoUrl
    });
    
    await member.save();
    
    // Generate and save membership card locally
    let cardUrl = null;
    try {
      console.log('Generating card for member:', memberId);
      const cardBuffer = await generateMemberCard(member);
      
      if (!cardBuffer || cardBuffer.length === 0) {
        throw new Error('Empty card buffer received');
      }
      
      const cardFileName = `${memberId}-card.png`;
      const cardPath = path.join(cardsDir, cardFileName);
      
      fs.writeFileSync(cardPath, cardBuffer);
      console.log('✅ Card saved to:', cardPath);
      
      cardUrl = `${BASE_URL}/cards/${cardFileName}`;
      member.cardUrl = cardUrl;
      await member.save();
      console.log('✅ Card URL saved to member:', cardUrl);
    } catch (cardError) {
      console.error('❌ Card generation failed:', cardError.message);
      // Don't fail the whole request if card generation fails
    }
    
    res.status(201).json({
      success: true,
      message: 'सदस्यता सफलतापूर्वक पंजीकृत',
      data: {
        memberId: member.memberId,
        cardUrl: member.cardUrl,
        photoUrl: member.photoUrl
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'यह मोबाइल नंबर पहले से पंजीकृत है' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get member by ID
router.get('/:memberId', async (req, res) => {
  try {
    const member = await Member.findOne({ memberId: req.params.memberId });
    if (!member) {
      return res.status(404).json({ success: false, message: 'सदस्य नहीं मिला' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download card
router.get('/:memberId/card', async (req, res) => {
  try {
    const member = await Member.findOne({ memberId: req.params.memberId });
    if (!member || !member.cardUrl) {
      return res.status(404).json({ success: false, message: 'कार्ड उपलब्ध नहीं' });
    }
    
    res.json({
      success: true,
      cardUrl: member.cardUrl,
      downloadUrl: member.cardUrl
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;