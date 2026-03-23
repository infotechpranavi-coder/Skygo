import mongoose from 'mongoose';

// Don't throw error, return null if no URI (for demo mode)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not defined. Running in demo mode.');
    cached.isConnected = false;
    return null;
  }

  if (cached.conn) {
    cached.isConnected = true;
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      cached.isConnected = true;
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection failed:', error.message);
      cached.isConnected = false;
      cached.promise = null;
      return null; // Return null instead of throwing
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('❌ MongoDB wait for promise failed:', e.message);
    cached.promise = null;
    cached.isConnected = false;
    cached.conn = null;
    return null;
  }

  return cached.conn;
}

export const isConnected = () => !!cached?.isConnected;
export default connectDB;
