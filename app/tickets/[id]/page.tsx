'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Plane,
    MapPin,
    Clock,
    ShieldCheck,
    ArrowRight,
    ChevronLeft,
    Globe,
    Calendar,
    Users,
    Briefcase,
    Utensils,
    Wifi,
    Info
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PackageData {
    _id: string;
    title: string;
    subtitle: string;
    about: string;
    location: string;
    price: number;
    duration: string;
    rating: number;
    images: Array<{ url: string; alt: string }>;
    packageCategory?: string;
}

const TicketDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [packageData, setPackageData] = useState<PackageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await fetch('/api/packages');
                const result = await response.json();
                if (result.success) {
                    const pkg = result.data.find((p: any) => p._id === (params?.id as string));
                    setPackageData(pkg || null);
                }
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            fetchPackage();
        }
    }, [params?.id]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!packageData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Details Not Found</h2>
                <Button onClick={() => router.push('/tickets')} className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg">
                    Back to Tickets
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] pb-20">
            {/* Header / Hero */}
            <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                {packageData.images?.[0] ? (
                    <Image
                        src={packageData.images[0].url}
                        alt={packageData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Plane className="h-20 w-20 text-gray-200" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-32 left-8 z-10">
                    <Button
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/20 transition-all rounded-full px-6"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">E-Ticket Preview</p>
                        <h1 className="text-5xl md:text-7xl font-[1000] text-white uppercase tracking-tighter mb-4 leading-tight">
                            {packageData.location}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-white/80 font-bold uppercase tracking-widest text-xs">
                            <span className="flex items-center gap-2">
                                <Plane className="h-4 w-4" />
                                Premium Flight
                            </span>
                            <span className="h-1 w-1 bg-white/40 rounded-full" />
                            <span className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Global Network
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Boarding Pass Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 relative group"
                        >
                            {/* Boarding Pass Notch Effect */}
                            <div className="absolute left-[-20px] top-[180px] w-10 h-10 rounded-full bg-[#fcfcfc] border-r border-gray-100 shadow-inner z-10" />
                            <div className="absolute right-[-20px] top-[180px] w-10 h-10 rounded-full bg-[#fcfcfc] border-l border-gray-100 shadow-inner z-10" />

                            <div className="bg-gray-900 p-10 text-white relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-none font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest text-[10px]">
                                            Confirmed Priority Booking
                                        </Badge>
                                        <h2 className="text-3xl font-[1000] text-white leading-tight uppercase tracking-tighter">
                                            {packageData.title}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em] mb-3">Carrier</p>
                                        <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10 shadow-lg transition-transform group-hover:rotate-12 duration-500">
                                            <Plane className="h-8 w-8 text-amber-500 rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-b border-dashed border-gray-200">
                                    <div className="space-y-4">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Origin</p>
                                        <p className="text-5xl font-black text-gray-900 tracking-tighter">CPT</p>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Cape Town, South Africa</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-full flex items-center gap-3">
                                            <div className="h-2 w-2 bg-gray-200 rounded-full" />
                                            <div className="flex-1 h-[2px] bg-gray-100 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-amber-500/20 translate-x-[-100%] animate-shimmer" />
                                                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-gray-900 rotate-90" />
                                            </div>
                                            <div className="h-2 w-2 bg-gray-200 rounded-full" />
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] pt-2">Non-Stop Flight</p>
                                    </div>
                                    <div className="space-y-4 text-right">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Destination</p>
                                        <p className="text-5xl font-black text-gray-900 tracking-tighter uppercase">
                                            {packageData.location.substring(0, 3)}
                                        </p>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{packageData.location}</p>
                                    </div>
                                </div>

                                <div className="pt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Travel Class</p>
                                        <p className="font-black text-gray-900 uppercase tracking-tight">Business Elite</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Flight Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 bg-green-500 rounded-full" />
                                            <p className="font-black text-green-600 uppercase tracking-tight">On-Time</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Terminal</p>
                                        <p className="font-black text-gray-900 uppercase tracking-tight">T1 International</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Duration</p>
                                        <p className="font-black text-gray-900 uppercase tracking-tight">{packageData.duration || "Standard"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 flex items-center justify-center gap-8 border-t border-gray-100">
                                <div className="flex items-center gap-2 opacity-30 grayscale">
                                    <span className="text-[8px] font-bold uppercase tracking-widest">Airline Alliance Member</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Inclusions / Amenities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-lg group hover:border-gray-200 transition-all duration-500">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tighter">
                                    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-amber-50 transition-colors">
                                        <Utensils className="h-6 w-6 text-gray-400 group-hover:text-amber-600" />
                                    </div>
                                    Executive Dining
                                </h3>
                                <ul className="space-y-5">
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-amber-500 rounded-full" />
                                        Chef-Curated In-flight Meals
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-amber-500 rounded-full" />
                                        Pre-order Menu Options
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-amber-500 rounded-full" />
                                        Sommelier Wine Selection
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-lg group hover:border-gray-200 transition-all duration-500">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tighter">
                                    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                                        <Wifi className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
                                    </div>
                                    Full Connectivity
                                </h3>
                                <ul className="space-y-5">
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        Ultra High-speed Wi-Fi
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        In-seat Power Supply
                                    </li>
                                    <li className="flex items-center gap-4 text-gray-600 font-bold text-sm uppercase tracking-tight">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        Live Global Satellite News
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-lg">
                            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tighter">
                                <div className="p-3 bg-gray-50 rounded-2xl">
                                    <Info className="h-6 w-6 text-gray-400" />
                                </div>
                                Booking Information
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-bold text-sm uppercase tracking-tight mb-6">
                                {packageData.about || "Experience world-class air travel with our premium flight services. This itinerary is specifically designed for international travelers seeking efficiency and comfort. We partner with elite carriers to ensure your journey is seamless from check-in to arrival."}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Fully Refundable*</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Flexible Dates</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Request Fare Quote */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 space-y-8">
                            <Card className="border border-gray-100 shadow-2xl overflow-hidden bg-white rounded-[40px] border-b-[8px] border-b-gray-900">
                                <div className="p-10 text-center bg-gray-50 border-b border-gray-100">
                                    <p className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Starting From</p>
                                    <div className="flex flex-col items-center gap-1">
                                        <h2 className="text-6xl font-black tracking-tighter text-gray-900">
                                            {packageData.price > 0 ? formatPrice(packageData.price) : "TBD"}
                                        </h2>
                                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">All Taxes & Fees Included</p>
                                    </div>
                                </div>

                                <CardContent className="p-10 space-y-10">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 ml-1">Flight Support</Label>
                                            <div className="flex items-center gap-4 p-5 bg-gray-900 rounded-[32px] text-white shadow-xl">
                                                <ShieldCheck className="h-6 w-6 text-amber-500" />
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Elite Support</p>
                                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Specialist 24/7 Desk</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/contact?packageName=${encodeURIComponent(packageData.title)}&packageType=flight&location=${encodeURIComponent(packageData.location)}`}
                                        className="block"
                                    >
                                        <Button className="w-full h-20 bg-gray-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] rounded-[32px] shadow-2xl transition-all duration-300 group flex items-center justify-center gap-4">
                                            Request Fare Quote
                                            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                                        </Button>
                                    </Link>

                                    <div className="flex items-center justify-center gap-8 py-2">
                                        <Plane className="h-6 w-6 text-gray-100" />
                                        <Globe className="h-6 w-6 text-gray-100" />
                                        <ShieldCheck className="h-6 w-6 text-gray-100" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Agent Card */}
                            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group">
                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="h-16 w-16 bg-gray-900 rounded-3xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:-rotate-12 duration-500">
                                        <Users className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <p className="text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-1">Skygo Service</p>
                                        <p className="text-lg font-black text-gray-900 leading-tight">Expert Assistance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TicketDetailPage;
