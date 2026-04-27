const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

console.log('🔍 MongoDB Connection Diagnostic Tool');
console.log('=====================================\n');

console.log('Attempting to connect...');
console.log('Connection String:', mongoUri.replace(/:[^:]*@/, ':****@'));
console.log('');

mongoose.connect(mongoUri, {
  connectTimeoutMS: 15000,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  retryWrites: true,
})
  .then(() => {
    console.log('✅ SUCCESS! MongoDB is connected!');
    console.log('');
    console.log('📊 Connection Details:');
    console.log('- Host:', mongoose.connection.host);
    console.log('- Port:', mongoose.connection.port);
    console.log('- Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Failed!');
    console.error('');
    console.error('Error Type:', err.code);
    console.error('Error Message:', err.message);
    console.error('');
    console.error('🔧 Troubleshooting Steps:');
    console.error('1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
    console.error('2. Sign in and go to Network Access');
    console.error('3. Add your IP address or use 0.0.0.0/0 to allow all');
    console.error('4. Check that your Cluster0 is Active (green status)');
    console.error('5. Verify username and password in your .env file');
    console.error('');
    console.error('Full Error Details:');
    console.error(err);
    process.exit(1);
  });
