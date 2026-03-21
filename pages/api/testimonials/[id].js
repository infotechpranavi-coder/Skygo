import connectDB from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'PUT':
      try {
        const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!testimonial) {
          return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) {
          return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
