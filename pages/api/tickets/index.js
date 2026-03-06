import connectDB from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';
import { isConnected } from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();
  const connected = isConnected();

  if (req.method === 'GET') {
    try {
      const { search } = req.query;
      let query = {};
      if (search) {
        query = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { carrier: { $regex: search, $options: 'i' } },
            { route: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } }
          ]
        };
      }
      const tickets = await Ticket.find(query).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: tickets });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    if (!connected) {
      return res.status(503).json({ success: false, error: 'Database not available' });
    }
    try {
      const ticket = await Ticket.create(req.body);
      res.status(201).json({ success: true, data: ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
