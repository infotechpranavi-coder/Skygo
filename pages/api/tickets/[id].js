import connectDB from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const ticket = await Ticket.findById(id);
      if (!ticket) return res.status(404).json({ success: false, error: 'Ticket not found' });
      res.status(200).json({ success: true, data: ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!ticket) return res.status(404).json({ success: false, error: 'Ticket not found' });
      res.status(200).json({ success: true, data: ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) return res.status(404).json({ success: false, error: 'Ticket not found' });
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
