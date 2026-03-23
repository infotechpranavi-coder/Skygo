import connectDB from '../../../lib/mongodb';
import Tour from '../../../models/Tour';
import { isConnected } from '../../../lib/mongodb';

const sampleTours = [
  {
    title: 'Cape Winelands Explorer',
    subtitle: 'Full Day Wine & Scenery Tour from Cape Town',
    about: 'Journey through the lush Winelands of Stellenbosch, Franschhoek, and Paarl. Visit award-winning estates, taste world-class wines, and enjoy stunning mountain scenery. This full-day guided tour is a must-do for any Cape Town visitor.',
    price: 1800,
    duration: '1 Day',
    location: 'Cape Town, South Africa',
    capacity: '2-12 Guests',
    tourType: 'Cultural',
    guideName: 'Jacques de Villiers',
    meetingPoint: 'Cape Town City Bowl — Adderley Street',
    groupSize: 'Up to 12 people',
    highlights: [
      'Stellenbosch wine estates & cellar tours',
      'Franschhoek village & Cape Malay cuisine',
      'Paarl Rock scenic viewpoint',
      'Professional wine tutor on board',
      'Cheese & charcuterie pairing session',
      'Private air-conditioned vehicle',
    ],
    images: [
      { public_id: 'tour-winelands-1', url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Winelands' },
      { public_id: 'tour-winelands-2', url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Wine Tasting' },
    ],
    itinerary: [
      { day: 1, title: 'Stellenbosch & Franschhoek', description: 'Depart Cape Town city. Visit 2 wine estates in Stellenbosch for cellar tours and tastings. Drive through Franschhoek Pass for panoramic views then lunch at a local bistro.' },
      { day: 1, title: 'Paarl & Return', description: 'Afternoon visit to Paarl Rock viewpoint and one final wine estate. Evening return to Cape Town with wine collection delivery.' },
    ],
    inclusions: ['Professional wine guide', 'Air-conditioned transport', 'Wine tastings (3 estates)', 'Cheese & charcuterie lunch', 'Hotel pickup & drop-off'],
    exclusions: ['Additional wine purchases', 'Gratuities', 'Meals not mentioned'],
    bookings: 0,
    rating: 4.9,
  },
  {
    title: 'Boulders Beach Penguin & Cape of Good Hope',
    subtitle: 'Full Day Peninsula Tour',
    about: 'Explore the iconic Cape Peninsula on this full-day guided adventure. Visit the Cape of Good Hope — one of the most dramatic meeting points of two oceans — then head to Boulders Beach to encounter the famous African Penguins up close.',
    price: 2200,
    duration: '1 Day',
    location: 'Cape Peninsula, South Africa',
    capacity: '2-8 Guests',
    tourType: 'Wildlife',
    guideName: 'Asha Naidoo',
    meetingPoint: 'Cape Town Waterfront — Clock Tower',
    groupSize: 'Up to 8 people',
    highlights: [
      'Cape of Good Hope — southernmost tip',
      'African Penguin colony at Boulders Beach',
      'Chapman\'s Peak scenic coastal drive',
      'Cape Point lighthouse & funicular',
      'Hout Bay Harbour fish market',
      'Sea Point promenade stop',
    ],
    images: [
      { public_id: 'tour-peninsula-1', url: 'https://images.unsplash.com/photo-1572198270420-2e5c1a71f8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape of Good Hope' },
      { public_id: 'tour-peninsula-2', url: 'https://images.unsplash.com/photo-1617817546800-d98b4fb1e618?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'African Penguins' },
    ],
    itinerary: [
      { day: 1, title: 'Morning Departure & Chapman\'s Peak', description: 'Depart Cape Town after breakfast. Drive along the spectacular Chapman\'s Peak coastal road with stops for photography. Visit Hout Bay harbour.' },
      { day: 1, title: 'Cape Point & Boulders Beach', description: 'Explore Cape Point Natural Reserve, ride the funicular to the lighthouse and witness breathtaking ocean views. Afternoon at Boulders Beach to interact with the penguin colony.' },
    ],
    inclusions: ['Expert naturalist guide', 'Private vehicle transport', 'Cape Point entry fees', 'Boulders Beach entry fees', 'Bottled water & snacks'],
    exclusions: ['Funicular ride (optional at own cost)', 'Lunch', 'Gratuities'],
    bookings: 0,
    rating: 4.8,
  },
  {
    title: 'Kruger Safari Day Trip',
    subtitle: '2-Day Malaria-Free Big Five Safari Experience',
    about: 'Experience the ultimate South African wildlife adventure with a 2-day safari in or near Kruger National Park. Encounter the Big Five — lion, leopard, elephant, buffalo, and rhino — in their natural habitat with an expert ranger guiding every moment.',
    price: 8500,
    duration: '2 Days',
    location: 'Mpumalanga, South Africa',
    capacity: '2-6 Guests',
    tourType: 'Wildlife',
    guideName: 'Ruan Botha',
    meetingPoint: 'OR Tambo International Airport, Johannesburg',
    groupSize: 'Up to 6 people',
    highlights: [
      'Morning & afternoon game drives in open 4x4 vehicles',
      'Big Five sightings — lion, elephant, rhino, leopard, buffalo',
      'Expert field ranger & tracker on every drive',
      'Malaria-free reserve available on request',
      'Luxury tented camp accommodation',
      'Bush breakfast & sundowner drinks',
    ],
    images: [
      { public_id: 'tour-kruger-1', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari Elephants' },
      { public_id: 'tour-kruger-2', url: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Safari Vehicle Game Drive' },
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Afternoon Game Drive', description: 'Transfer from Johannesburg to the reserve. Check in to tented camp. Afternoon 3-hour game drive at golden hour with expert ranger. Bush sundowner drinks. Evening campfire dinner.' },
      { day: 2, title: 'Dawn Game Drive & Departure', description: 'Early morning 5am game drive for the best Big Five spotting. Bush breakfast in the field. Return to camp for brunch. Transfer back to Johannesburg airport.' },
    ],
    inclusions: ['Round-trip transfer from Johannesburg', '2x game drives', '1 night luxury tented accommodation', 'All meals from dinner on day 1 to brunch on day 2', 'Expert ranger & tracker'],
    exclusions: ['Flights to Johannesburg', 'Alcohol', 'Travel insurance', 'Gratuities'],
    bookings: 0,
    rating: 5.0,
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

    for (const tour of sampleTours) {
      try {
        const existing = await Tour.findOne({ title: tour.title });
        if (existing) {
          results.skipped.push(tour.title);
          continue;
        }
        const newTour = await Tour.create(tour);
        results.created.push(tour.title);
      } catch (error) {
        results.errors.push({ title: tour.title, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Tours seeded successfully',
      results: {
        total: sampleTours.length,
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
