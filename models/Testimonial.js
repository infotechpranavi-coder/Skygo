import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Traveler' },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: false }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
