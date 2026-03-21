import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  public_id: { type: String, required: false },
  url: { type: String, required: true },
  alt: { type: String, default: '' },
});

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g. "Cape Town to London Flight"
  carrier: { type: String, required: true }, // airline or provider
  route: { type: String, required: true }, // e.g. "JNB - DXB"
  price: { type: Number, required: true },
  travelClass: { 
    type: String, 
    required: true,
    enum: ['Economy', 'Premium Economy', 'Business', 'First'],
    default: 'Economy'
  },
  departureTime: { type: String, default: '' },
  arrivalTime: { type: String, default: '' },
  luggageAllowance: { type: String, default: '' },
  refundPolicy: { type: String, default: '' },
  validity: { type: String, default: '' },
  location: { type: String, required: true }, // Destination city
  images: [ImageSchema],
  description: { type: String, default: '' },
  itinerary: [{ day: Number, title: String, description: String }],
  isAvailable: { type: Boolean, default: true },
  bookings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TicketSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
