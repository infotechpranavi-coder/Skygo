import connectDB from '../../lib/mongodb';
import { isConnected } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    const dbConnection = await connectDB();
    const connected = isConnected();
    
    return res.status(200).json({
      success: true,
      connected: connected,
      hasConnection: !!dbConnection,
      hasEnvVar: !!process.env.MONGODB_URI,
      message: connected 
        ? 'MongoDB is connected successfully!' 
        : 'MongoDB connection failed. Check console for details.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      connected: false
    });
  }
}

