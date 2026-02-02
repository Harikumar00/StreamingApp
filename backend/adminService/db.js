const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    if (mongoose.connection.readyState === 0) {
      console.log('[admin/db] Connecting to MongoDB...');
      await mongoose.connect(uri);
      console.log('[admin/db] MongoDB connection established');
    }
  } catch (error) {
    console.error('[admin/db] MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
