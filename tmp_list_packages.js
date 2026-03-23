import connectDB from './lib/mongodb';
import Package from './models/Package';

async function listPackages() {
  await connectDB();
  const packages = await Package.find({});
  console.log(JSON.stringify(packages.map(p => ({ id: p._id, title: p.title })), null, 2));
  process.exit(0);
}

listPackages();
