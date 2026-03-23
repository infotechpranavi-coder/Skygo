const mongoose = require('mongoose');

// Mock connectDB logic since I can't easily import from lib/mongodb in a standalone script without issues
const MONGODB_URI = "mongodb+srv://rushabhparyani:Rushabh%4020s@cluster0.p0q4v.mongodb.net/skygo?retryWrites=true&w=majority";

const PackageSchema = new mongoose.Schema({
  title: String,
});

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

async function deleteDummyPackages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // List of typical dummy package titles or patterns from seed.js
    const dummyKeywords = [
      'Cape Town Grand Explorer',
      'Cape Town Transit Escape',
      'Cape Town Stopover Signature',
      'Cape Town Essential Experience',
      'Dubai Grand Experience',
      'Cape Town Signature Explorer',
      'Classic Discovery of Cape Town',
      'Luxury Cape Town Indulgence',
      'Table Mountain – At The Top',
      'At The Top SKY',
      'Burj Khalifa', // Just in case
      'Dubai Signature Explorer',
      'Dubai Stopover Signature',
      'Dubai Transit Escape',
      'Dubai Grand Explorer'
    ];

    const query = {
      $or: dummyKeywords.map(kw => ({ title: { $regex: kw, $options: 'i' } }))
    };

    const found = await Package.find(query);
    console.log(`Found ${found.length} suspect dummy packages:`);
    found.forEach(p => console.log(` - ${p.title} (${p._id})`));

    if (found.length > 0) {
      const result = await Package.deleteMany(query);
      console.log(`Successfully deleted ${result.deletedCount} dummy packages.`);
    } else {
      console.log('No dummy packages found.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

deleteDummyPackages();
