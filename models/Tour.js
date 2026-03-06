import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String, default: '' },
});

const ItineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  about: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: String, default: '' },
  tourType: { 
    type: String, 
    required: true,
    enum: ['Walking', 'Bus', 'Boat', 'Air', 'Adventure', 'Cultural', 'Wildlife', 'Luxury'],
    default: 'Cultural'
  },
  guideName: { type: String, default: '' },
  meetingPoint: { type: String, default: '' },
  groupSize: { type: String, default: '' },
  highlights: [{ type: String }],
  images: [ImageSchema],
  itinerary: [ItineraryDaySchema],
  inclusions: [String],
  exclusions: [String],
  bookings: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TourSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Tour || mongoose.model('Tour', TourSchema);
