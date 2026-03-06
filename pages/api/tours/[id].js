import connectDB from '../../../lib/mongodb';
import Tour from '../../../models/Tour';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const tour = await Tour.findById(id);
      if (!tour) return res.status(404).json({ success: false, error: 'Tour not found' });
      res.status(200).json({ success: true, data: tour });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!tour) return res.status(404).json({ success: false, error: 'Tour not found' });
      res.status(200).json({ success: true, data: tour });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const tour = await Tour.findByIdAndDelete(id);
      if (!tour) return res.status(404).json({ success: false, error: 'Tour not found' });
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
