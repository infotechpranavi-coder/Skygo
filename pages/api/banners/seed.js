import connectDB from '../../../lib/mongodb';
import Banner from '../../../models/Banner';
import { isConnected } from '../../../lib/mongodb';

const sampleBanners = [
  {
    title: 'DISCOVER\nSOUTH AFRICA',
    subtitle: 'Premium wildlife safaris, coastal escapes & wine country adventures curated just for you',
    image: {
      public_id: 'banner-south-africa',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'South African Safari Landscape',
    },
    link: '/packages',
    order: 1,
    isActive: true,
  },
  {
    title: 'CAPE TOWN\nAWAITS',
    subtitle: 'Table Mountain, vibrant waterfronts and the world\'s most scenic drives — all in one city',
    image: {
      public_id: 'banner-cape-town',
      url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Cape Town Aerial View',
    },
    link: '/tours',
    order: 2,
    isActive: true,
  },
  {
    title: 'FLY\nFURTHER',
    subtitle: 'Business class, premium economy and economy fares to 40+ destinations — book your seat today',
    image: {
      public_id: 'banner-flights',
      url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Premium Airline Tickets',
    },
    link: '/tickets',
    order: 3,
    isActive: true,
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

    for (const banner of sampleBanners) {
      try {
        const existing = await Banner.findOne({ title: banner.title });
        if (existing) {
          results.skipped.push(banner.title);
          continue;
        }
        await Banner.create(banner);
        results.created.push(banner.title);
      } catch (error) {
        results.errors.push({ title: banner.title, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Banners seeded successfully',
      results: {
        total: sampleBanners.length,
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
