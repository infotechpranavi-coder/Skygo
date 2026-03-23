import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

const sampleBlogs = [
  {
    title: 'Top 5 Hidden Gems in Cape Town You Must Visit',
    slug: 'top-5-hidden-gems-cape-town',
    excerpt: 'Discover the secret spots in the Mother City that most tourists skip, from secluded beaches to mountain lookouts.',
    content: '## 1. Bakoven Beach\nKnown locally as the "living room" of the Atlantic Seaboard, this tiny beach is tucked away between rocks and offers spectacular sunset views...\n\n## 2. Kalk Bay\nA fishing village with a bohemian soul, famous for its harbor, antique shops, and the best fish and chips in the southern hemisphere...',
    author: 'Elena Rousseau',
    category: 'Destinations',
    image: {
      public_id: 'sample_blog_1',
      url: 'https://images.unsplash.com/photo-1579282240050-352db0a14c21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      alt: 'Table Mountain View from Blouberg'
    },
    isFeatured: true,
    tags: ['Cape Town', 'Beaches', 'Hiking'],
    status: 'published'
  },
  {
    title: 'How to Plan Your First African Safari',
    slug: 'first-african-safari-planning-guide',
    excerpt: 'Everything you need to know before booking your first safari adventure, from seasonality to gear essentials.',
    content: 'Booking an African safari is a bucket-list item for many, but the logistics can be daunting. In this guide, we break down the most important factors...\n\n### When to go\nThe best time for wildlife viewing is generally during the dry season when animals congregate around water holes...',
    author: 'Marcus JHB',
    category: 'Travel Tips',
    image: {
      public_id: 'sample_blog_2',
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
      alt: 'Lion in Kruger National Park'
    },
    isFeatured: false,
    tags: ['Safari', 'Adventure', 'Nature'],
    status: 'published'
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await connectDB();

  try {
    let created = 0;
    let skipped = 0;

    for (const blog of sampleBlogs) {
      const existing = await Blog.findOne({ slug: blog.slug });
      if (!existing) {
        await Blog.create(blog);
        created++;
      } else {
        skipped++;
      }
    }

    res.status(200).json({ 
      success: true, 
      results: { created, skipped },
      message: 'Seed operation completed' 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
