import mongoose from 'mongoose';

// Don't throw error, return null if no URI (for demo mode)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

async function connectDB() {
  // Read MONGODB_URI dynamically each time to get latest env vars
  const MONGODB_URI = process.env.MONGODB_URI;
  
  // Debug: Log if URI is found (without exposing the actual URI)
  if (MONGODB_URI) {
    console.log('MONGODB_URI found, attempting connection...');
  } else {
    console.warn('MONGODB_URI not defined. Running in demo mode with sample data.');
    console.warn('Please check your .env.local file and ensure MONGODB_URI is set.');
    cached.isConnected = false;
    return null;
  }

  // If URI changed, reset cached connection
  if (cached.conn && cached.lastUri !== MONGODB_URI) {
    console.log('MONGODB_URI changed, resetting connection...');
    cached.conn = null;
    cached.promise = null;
  }
  cached.lastUri = MONGODB_URI;

  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    cached.isConnected = true;
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      cached.isConnected = true;
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection failed:', error.message);
      console.error('Error details:', {
        name: error.name,
        code: error.code,
        codeName: error.codeName
      });
      
      // Provide helpful error messages
      if (error.message.includes('authentication failed')) {
        console.error('💡 Tip: Check your MongoDB username and password in .env.local');
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.error('💡 Tip: Check your internet connection and MongoDB cluster URL');
      } else if (error.message.includes('IP')) {
        console.error('💡 Tip: Add your IP address to MongoDB Atlas IP Whitelist');
      }
      
      cached.isConnected = false;
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn) {
      cached.isConnected = true;
      console.log('✅ MongoDB connection verified');
    } else {
      cached.isConnected = false;
      console.warn('⚠️ MongoDB connection returned null');
    }
  } catch (e) {
    console.error('❌ MongoDB connection error:', e.message);
    cached.promise = null;
    cached.isConnected = false;
    cached.conn = null;
  }

  return cached.conn;
}

export const isConnected = () => cached.isConnected;
export default connectDB;
