require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
console.log('MongoDB URI:', mongoUri ? '***configured***' : 'NOT SET');

if (!mongoUri) {
  console.error('Error: MONGO_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoUri, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Add error handling middleware (must be after all other middleware and routes)
app.use((err, req, res, next) => {
  console.error('❌ API Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));