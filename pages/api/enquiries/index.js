import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: enquiries });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const enquiry = await Enquiry.create(req.body);
      res.status(201).json({ success: true, data: enquiry });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
