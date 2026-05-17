const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToS3, getSignedUrl } = require('../utils/s3');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Upload single file
router.post('/file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'कोई फाइल अपलोड नहीं की गई' });
    }

    const { folder = 'general' } = req.body;
    const key = `${folder}/${Date.now()}-${req.file.originalname}`;

    const result = await uploadToS3(req.file.buffer, key, req.file.mimetype);

    res.json({
      success: true,
      data: {
        url: result.Location,
        key: result.Key,
        bucket: result.Bucket
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get signed URL for direct upload
router.post('/signed-url', async (req, res) => {
  try {
    const { key, contentType } = req.body;
    const signedUrl = await getSignedUrl(key, contentType);

    res.json({
      success: true,
      data: { signedUrl, key }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
