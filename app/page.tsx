import HeroExplore from "../components/HeroExplore";
import ExploreWithUs from "../components/ExploreWithUs";
import DestinationsGrid from "../components/DestinationsGrid";
import UpcomingTrips from "../components/UpcomingTrips";
import PopularPackages from "../components/PopularPackages";
import ClientFeedback from "../components/ClientFeedback";
import FloatingCallButton from "../components/FloatingCallButton";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import Package from "@/models/Package";

export default async function Home() {
  // Use try/catch for database operations
  let initialBanners = [];
  let initialPackages = [];

  try {
    await connectDB();
    
    // Fetch banners with a timeout or limited fields to keep it fast
    const bannerDocs = await Banner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    // Fetch popular packages limited to top 5
    const packageDocs = await Package.find({ isPopularPackage: true })
      .limit(5)
      .lean();
    
    // Stringify/Parse to handle MongoDB ObjectIds for client components
    initialBanners = JSON.parse(JSON.stringify(bannerDocs));
    initialPackages = JSON.parse(JSON.stringify(packageDocs));
  } catch (error) {
    console.warn("Database fetching failed on home page, using fallback client-side fetching or static data.", error);
  }

  return (
    <div className="min-h-screen">
      <HeroExplore initialBanners={initialBanners} />
      <ExploreWithUs />
      <DestinationsGrid />
      <UpcomingTrips />
      <PopularPackages initialPackages={initialPackages} />
      <ClientFeedback />


      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}

