const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Load .env from project root
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = express();

// FIX: Allow cross-origin resource sharing for images/files
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      imgSrc: ["'self'", 'data:', 'https:', 'http:'],
      mediaSrc: ["'self'", 'https:', 'http:'],
      connectSrc: ["'self'", 'https:', 'http://localhost:5000'],
    },
  },
}));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'बहुत अधिक अनुरोध' }
});
app.use('/api/', limiter);

// Serve cards statically - place BEFORE API routes
app.use('/cards', express.static(path.join(__dirname, '../public/cards')));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kisanandolan';
console.log('Connecting to MongoDB:', mongoUri);

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    console.log('⚠️ Continuing without MongoDB');
  });

app.use('/api/members', require('./routes/members'));
app.use('/api/media', require('./routes/media'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/upload', require('./routes/upload'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API Active',
    mongoConnected: mongoose.connection.readyState === 1
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});