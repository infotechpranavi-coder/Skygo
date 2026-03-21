import connectDB from '../../../lib/mongodb';
import Enquiry from '../../../models/Enquiry';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  if (method === 'PUT') {
    try {
      const enquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!enquiry) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: enquiry });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedEnquiry = await Enquiry.deleteOne({ _id: id });
      if (!deletedEnquiry) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
