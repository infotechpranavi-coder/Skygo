'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft,
  CheckCircle, Plane, Camera, Globe, Heart, Share, Car, Hotel,
  Utensils, Info, X, Car as CarIcon, Building, Bed,
  Calendar as CalendarIcon, ChevronRight, PlayCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Utility function to render text with bold formatting
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-bold text-gray-900">{boldText}</strong>;
    }
    return part;
  });
};

interface Package {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  services: string[] | string;
  tourDetails: string;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }> | [];
  transportation: Array<{
    type: string;
    vehicle: string;
    description: string;
  }> | [];
  accommodation: Array<{
    city: string;
    hotel: string;
    rooms: string;
    roomType: string;
    nights: string;
  }> | [];
  inclusions?: string[];
  exclusions?: string[];
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: 'domestic' | 'international';
  place: 'bhutan' | 'nepal';
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

const PackageDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'policy'>('overview');

  useEffect(() => {
    if (params?.id) {
      if (params.id === 'demo-package-id') {
        // Set hardcoded demo data
        setPackageData({
          _id: 'demo-package-id',
          title: 'Royal Dubai Experience',
          subtitle: 'Luxury Desert & City Tour',
          about: 'Experience the ultimate luxury in Dubai with our premium package including 5-star accommodation, private desert safari, and VIP access to Burj Khalifa.',
          services: ['5-Star Hotel', 'Private Transfer', 'Guide', 'All Meals'],
          tourDetails: 'A comprehensive 5-day tour of Dubai.',
          itinerary: [
            { day: 1, title: 'Arrival in Style', description: 'Private transfer to Atlantis The Palm. Welcome dinner at Nobu.' },
            { day: 2, title: 'Modern Dubai', description: 'VIP tour of Burj Khalifa (Level 148). Shopping at Dubai Mall. Fountain show.' },
            { day: 3, title: 'Desert Magic', description: 'Luxury desert safari with private dinner under the stars.' },
            { day: 4, title: 'Cultural Heritage', description: 'Visit Al Fahidi Fort and Dubai Museum. Abra ride across Dubai Creek.' },
            { day: 5, title: 'Departure', description: 'Leisure time before private transfer to airport.' }
          ],
          price: 5500,
          duration: '5 Days',
          location: 'Dubai',
          capacity: '2 - 4 People',
          packageType: 'domestic',
          place: 'Dubai', // Cast generic string to specific literal if needed, or update interface
          images: [
            { url: '/domestic-tour-packages-services.jpg', alt: 'Royal Dubai Experience' },
            { url: '/slider-image-2.jpeg', alt: 'Burj Al Arab' },
            { url: '/slider-image-3.jpg', alt: 'Desert Safari' }
          ],
          bookings: 128,
          rating: 4.9,
          inclusions: ['5N Accommodation', 'Breakfast & Dinner', 'Airport Transfers', 'All Entry Tickets'],
          exclusions: ['Flight Tickets', 'Personal Expenses', 'Lunch'],
          transportation: [
            { type: 'Transfers', vehicle: 'Luxury Sedan', description: 'Airport and inter-hotel transfers' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Atlantis The Palm', rooms: '1', roomType: 'Ocean Queen', nights: '5' }
          ],
          reviews: [
            { name: "John Doe", rating: 5, comment: "Absolutely stunning experience! The service was impeccable.", date: "2024-01-15" }
          ]
        } as any); // Cast to any to bypass strict literal type check for 'place' if it mismatches
        setLoading(false);
      } else {
        fetchPackageDetails(params.id as string);
      }
    }
  }, [params?.id]);

  const fetchPackageDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/packages/${id}`);
      const result = await response.json();

      if (result.success) {
        setPackageData(result.data);
      } else {
        setError(result.message || 'Package not found');
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('Failed to load package details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isInternational = packageData && !packageData.location.toLowerCase().includes('nepal');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900">Curating your experience...</h2>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <Globe className="h-10 w-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h3>
            <p className="text-gray-600 mb-8">{error || 'The package you are looking for does not exist.'}</p>
            <Button onClick={() => router.back()} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Immersive Hero Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {Array.isArray(packageData.images) && packageData.images.length > 0 ? (
            <Image
              src={packageData.images[selectedImageIndex].url}
              alt={packageData.images[selectedImageIndex].alt || packageData.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Globe className="h-24 w-24 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Navigation Bar Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-20 text-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/90 hover:bg-primary text-white border-none px-3 py-1 text-sm font-medium backdrop-blur-sm shadow-lg">
                    {isInternational ? "International" : "Domestic"}
                  </Badge>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm font-medium text-yellow-400 shadow-lg">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{packageData.rating}</span>
                    <span className="text-white/60 ml-1">({packageData.reviews?.length || 0} reviews)</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 text-shadow-lg leading-tight">
                  {packageData.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-lg text-white/90 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {packageData.location}
                  </div>
                  <div className="h-1.5 w-1.5 bg-white/40 rounded-full hidden md:block" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {packageData.duration}
                  </div>
                  <div className="h-1.5 w-1.5 bg-white/40 rounded-full hidden md:block" />
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {packageData.capacity}
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery Preview (Desktop) */}
              <div className="hidden lg:flex gap-3">
                {Array.isArray(packageData.images) && packageData.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all shadow-xl ${selectedImageIndex === index ? 'border-primary ring-2 ring-primary/30' : 'border-white/30 hover:border-white'
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image src={image.url} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
                {packageData.images.length > 3 && (
                  <div className="w-24 h-16 rounded-lg bg-black/50 border-2 border-white/30 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-black/70 backdrop-blur-sm">
                    +{packageData.images.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 sticky top-[80px] z-10 backdrop-blur-xl bg-white/90">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {[
                  { id: 'overview', label: 'Overview', icon: Info },
                  { id: 'itinerary', label: 'Itinerary', icon: Calendar },
                  { id: 'inclusions', label: 'Inclusions', icon: CheckCircle },
                  { id: 'reviews', label: 'Reviews', icon: Star },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const el = document.getElementById(tab.id);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      // active logic roughly implemented, intersection observer would be better but this works for clicks
                      'bg-transparent text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="space-y-6">
              <Card className="border-none shadow-md overflow-hidden animate-fade-in-up">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <PlayCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Experience Highlights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                    {packageData.about}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: CheckCircle, text: "Verified Experience", color: "text-green-500" },
                      { icon: ShieldCheck, text: "Best Price Guarantee", color: "text-blue-500" },
                      { icon: Users, text: "Expert Local Guides", color: "text-purple-500" },
                      { icon: Heart, text: "Curated with Love", color: "text-red-500" },
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        <span className="font-semibold text-gray-800">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accomodation Cards (If any) */}
              {Array.isArray(packageData.accommodation) && packageData.accommodation.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {packageData.accommodation.map((hotel, idx) => (
                    <Card key={idx} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group">
                      <div className="h-32 bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Building className="h-12 w-12 opacity-50" />
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {hotel.city}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">{hotel.hotel}</h4>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Bed className="h-4 w-4 mr-1.5" />
                          {hotel.roomType} • {hotel.nights} Nights
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Confirmed Stay
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Itinerary Section */}
            <section id="itinerary">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Daily Itinerary</h3>
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                  {packageData.duration}
                </Badge>
              </div>

              <div className="space-y-4 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-gray-200 before:to-gray-100">
                {Array.isArray(packageData.itinerary) && packageData.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-12 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform">
                      <span className="font-bold text-primary text-sm">{day.day}</span>
                    </div>

                    <Card className="border-l-4 border-l-primary/0 hover:border-l-primary transition-all duration-300">
                      <CardHeader className="py-4">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <span className="text-primary font-bold">Day {day.day}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          {day.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-4 pt-0">
                        <div className="text-gray-600 leading-relaxed pl-1">
                          {day.description.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">{line}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section id="inclusions" className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100 bg-green-50/30">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-green-700">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {packageData.inclusions?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-red-100 bg-red-50/30">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-red-700">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <X className="h-5 w-5" />
                    </div>
                    What's Excluded
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {packageData.exclusions?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">

              {/* Booking Card */}
              <Card className="border-none shadow-xl bg-white overflow-hidden ring-1 ring-black/5">
                <div className="bg-primary p-6 text-white text-center">
                  <p className="text-white/80 text-sm italic font-medium">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2 mt-1">
                    <h2 className="text-4xl font-bold">{formatPrice(packageData.price)}</h2>
                    <span className="text-lg opacity-80">/ person</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    No Hidden Charges
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Travel Date</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input type="date" className="pl-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Guests</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input type="number" placeholder="Adults" min="1" className="pl-10" />
                        </div>
                        <Input type="number" placeholder="Kids" min="0" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full text-lg h-12 shadow-lg shadow-primary/20" size="lg">
                      Request Booking
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-primary text-primary hover:bg-primary/5">
                      <Phone className="h-4 w-4 mr-2" />
                      Talk to an Expert
                    </Button>
                  </div>

                  <p className="text-xs text-center text-gray-500 pt-2">
                    Free cancellation up to 48 hours before tour
                  </p>
                </CardContent>
              </Card>

              {/* Agent Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-lg">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Need Help?</p>
                    <p className="font-bold text-lg">+91 9970393335</p>
                    <p className="text-xs text-gray-400 mt-0.5">24/7 Support Available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Add ShieldCheck icon locally effectively since it was missing in import previously if not careful
import { ShieldCheck } from "lucide-react";

export default PackageDetailPage;
