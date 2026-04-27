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

mongoose.connect(mongoUri, {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  maxPoolSize: 10,
  minPoolSize: 2
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Details:', err);
    console.log('\n⚠️  Tips to fix MongoDB Atlas connection:');
    console.log('1. Verify your username/password in .env');
    console.log('2. Whitelist your IP in MongoDB Atlas (0.0.0.0/0 for any IP)');
    console.log('3. Check if your cluster is active');
    console.log('4. Verify your network connectivity');
  });

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