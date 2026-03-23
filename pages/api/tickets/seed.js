import connectDB from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';
import { isConnected } from '../../../lib/mongodb';

const sampleTickets = [
  {
    title: 'Cape Town to Dubai – Premium Economy',
    carrier: 'Emirates',
    route: 'CPT → DXB',
    price: 12500,
    travelClass: 'Premium Economy',
    departureTime: '23:30',
    arrivalTime: '08:45 +1',
    luggageAllowance: '2 x 23kg checked + 7kg cabin',
    refundPolicy: 'Refundable with 15% fee before departure',
    validity: '12 months from issue date',
    location: 'Dubai, UAE',
    description: 'Direct overnight flight from Cape Town International to Dubai International. Emirates Premium Economy offers wider seats, enhanced dining, and dedicated cabin service for a comfortable long-haul experience.',
    images: [
      { public_id: 'ticket-ek-cpt-dxb', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Emirates Flight' },
    ],
    isAvailable: true,
    bookings: 0,
  },
  {
    title: 'Johannesburg to London Heathrow – Business Class',
    carrier: 'South African Airways',
    route: 'JNB → LHR',
    price: 38000,
    travelClass: 'Business',
    departureTime: '18:15',
    arrivalTime: '07:30 +1',
    luggageAllowance: '3 x 32kg checked + 18kg cabin',
    refundPolicy: 'Fully refundable up to 24 hours before departure',
    validity: '12 months from issue date',
    location: 'London, United Kingdom',
    description: 'Non-stop overnight service from OR Tambo International to London Heathrow aboard South African Airways. Business class passengers enjoy lie-flat seats, premium dining, and exclusive lounge access at both airports.',
    images: [
      { public_id: 'ticket-sa-jnb-lhr', url: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Business Class Flight' },
    ],
    isAvailable: true,
    bookings: 0,
  },
  {
    title: 'Durban to Cape Town – Economy Saver',
    carrier: 'Airlink',
    route: 'DUR → CPT',
    price: 1800,
    travelClass: 'Economy',
    departureTime: '06:00',
    arrivalTime: '08:10',
    luggageAllowance: '1 x 20kg checked + 7kg cabin',
    refundPolicy: 'Non-refundable, name change allowed once (fee applies)',
    validity: '3 months from issue date',
    location: 'Cape Town, South Africa',
    description: 'Quick and affordable domestic flight from King Shaka International in Durban to Cape Town International. Perfect for business travellers or visitors starting their Cape Town adventure early in the day.',
    images: [
      { public_id: 'ticket-4z-dur-cpt', url: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Domestic Flight South Africa' },
    ],
    isAvailable: true,
    bookings: 0,
  },
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await connectDB();

    if (!isConnected()) {
      return res.status(503).json({ success: false, error: 'Database not available' });
    }

    const results = { created: [], skipped: [], errors: [] };

    for (const ticket of sampleTickets) {
      try {
        const existing = await Ticket.findOne({ title: ticket.title });
        if (existing) {
          results.skipped.push(ticket.title);
          continue;
        }
        await Ticket.create(ticket);
        results.created.push(ticket.title);
      } catch (error) {
        results.errors.push({ title: ticket.title, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Tickets seeded successfully',
      results: {
        total: sampleTickets.length,
        created: results.created.length,
        skipped: results.skipped.length,
        errors: results.errors.length,
      },
      details: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
