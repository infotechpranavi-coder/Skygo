import connectDB from '../../../lib/mongodb';
import Banner from '../../../models/Banner';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const banner = await Banner.findById(id);
      if (!banner) return res.status(404).json({ success: false, error: 'Banner not found' });
      res.status(200).json({ success: true, data: banner });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const banner = await Banner.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!banner) return res.status(404).json({ success: false, error: 'Banner not found' });
      res.status(200).json({ success: true, data: banner });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const banner = await Banner.findByIdAndDelete(id);
      if (!banner) return res.status(404).json({ success: false, error: 'Banner not found' });
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
