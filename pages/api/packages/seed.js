export default async function handler(req, res) {
  res.status(200).json({ 
    success: true, 
    message: 'Seeding is currently disabled. Demo data has been removed per administrator request.' 
  });
}
