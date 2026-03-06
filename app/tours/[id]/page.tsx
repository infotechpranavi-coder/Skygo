'use client'

import { useState, useEffect, useCallback } from "react";
import { Playfair_Display, Inter } from 'next/font/google';
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin, Clock, Star, Calendar, Phone,
    CheckCircle, Globe, Heart, Share,
    ShieldCheck, ArrowRight, ChevronLeft,
    Compass, Mountain, Award
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TourData } from "@/lib/types";

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const TourDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [tourData, setTourData] = useState<TourData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(1);

    const fetchTour = useCallback(async () => {
        if (!params?.id) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/tours/${params.id}`);
            const result = await response.json();
            if (result.success) {
                setTourData(result.data);
            } else {
                setTourData(null);
            }
        } catch (error) {
            console.error('Error fetching tour details:', error);
            setTourData(null);
        } finally {
            setLoading(false);
        }
    }, [params?.id]);

    useEffect(() => {
        fetchTour();
    }, [fetchTour]);

    const formatPrice = (price?: number) => {
        if (!price) return 'R 0';
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9245]"></div>
            </div>
        );
    }

    if (!tourData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <Compass className="h-20 w-20 text-gray-200 mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Tour Experience Not Found</h2>
                <Button onClick={() => router.push('/tours')} className="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl">
                    Back to Tours
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen bg-[#faf8f6]", playfair.variable, inter.variable)}>
            {/* Immersive Hero Header */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                {tourData.images?.[0] ? (
                    <Image
                        src={tourData.images[0].url}
                        alt={tourData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Mountain className="h-20 w-20 text-gray-400" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#faf8f6]" />

                {/* Top Controls */}
                <div className="absolute top-32 left-8 right-8 z-30 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full px-6"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Explore
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="ghost" size="icon" className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
                            <Share className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Hero Title */}
                <div className="absolute bottom-12 left-0 right-0 z-20 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Badge className="bg-[#bd9245] text-white border-none px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.2em] text-[10px] font-bold">
                            {tourData.tourType || 'Premium'} Tour Experience
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-2xl">
                            {tourData.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-sm">
                            <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#bd9245]" />
                                {tourData.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#bd9245]" />
                                {tourData.duration}
                            </span>
                            <span className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                {tourData.rating || 5.0}/5 Professional Rating
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content Side */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* About Tour */}
                        <section className="bg-white p-10 md:p-14 rounded-[48px] shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#bd9245]/10 rounded-2xl flex items-center justify-center">
                                    <Compass className="h-6 w-6 text-[#bd9245]" />
                                </div>
                                Tour Overview
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                                {tourData.about}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Group Size</p>
                                    <p className="text-lg font-black text-gray-900">{tourData.groupSize || 'Up to 12'} Guest</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Guide Name</p>
                                    <p className="text-lg font-black text-gray-900">{tourData.guideName || 'Local Expert'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Meeting Point</p>
                                    <p className="text-lg font-black text-gray-900">{tourData.meetingPoint || 'Central Hub'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vibe</p>
                                    <p className="text-lg font-black text-gray-900 text-[#bd9245]">Exclusive</p>
                                </div>
                            </div>
                        </section>

                        {/* Itinerary */}
                        <section>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tighter flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#bd9245]/10 rounded-2xl flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-[#bd9245]" />
                                </div>
                                Daily Itinerary
                            </h2>

                            <div className="space-y-6">
                                {tourData.itinerary?.map((day) => (
                                    <motion.div
                                        key={day.day}
                                        className={cn(
                                            "group bg-white rounded-[32px] border transition-all duration-500 overflow-hidden cursor-pointer",
                                            activeDay === day.day ? "border-[#bd9245] shadow-xl" : "border-gray-100 hover:border-gray-300"
                                        )}
                                        onClick={() => setActiveDay(day.day)}
                                    >
                                        <div className="p-8 flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-colors duration-500",
                                                    activeDay === day.day ? "bg-[#bd9245] text-white" : "bg-gray-50 text-gray-400"
                                                )}>
                                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Day</span>
                                                    <span className="text-2xl font-black leading-none">{day.day}</span>
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{day.title}</h3>
                                            </div>
                                            <div className={cn(
                                                "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                                                activeDay === day.day ? "rotate-90 bg-[#bd9245]/10 border-[#bd9245]" : "border-gray-200"
                                            )}>
                                                <ArrowRight className={cn("h-4 w-4 transition-colors", activeDay === day.day ? "text-[#bd9245]" : "text-gray-400")} />
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {activeDay === day.day && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-8 pb-8"
                                                >
                                                    <div className="pl-20 border-l-2 border-[#bd9245]/20 ml-7 py-2">
                                                        <p className="text-gray-500 leading-relaxed font-medium">
                                                            {day.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Trusted Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-12 py-10 opacity-30 grayscale contrast-125">
                            <div className="flex items-center gap-2"><Award className="h-6 w-6" /><span className="text-xs font-black uppercase tracking-[0.3em]">Verified Operator</span></div>
                            <div className="flex items-center gap-2"><ShieldCheck className="h-6 w-6" /><span className="text-xs font-black uppercase tracking-[0.3em]">Safe Travels Certified</span></div>
                            <div className="flex items-center gap-2"><Globe className="h-6 w-6" /><span className="text-xs font-black uppercase tracking-[0.3em]">Global Standards</span></div>
                        </div>

                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div className="bg-gray-900 rounded-[48px] p-10 text-white shadow-2xl space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Compass className="h-32 w-32 rotate-12" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <p className="text-[#bd9245] text-[10px] font-bold uppercase tracking-[0.4em]">All-Inclusive Experience</p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-6xl font-black tracking-tighter">
                                        {formatPrice(tourData.price)}
                                    </h2>
                                    <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/ Total</span>
                                </div>
                                <p className="text-white/40 text-xs font-medium">Clear pricing with no hidden surprises. Includes all taxes, entry fees, and private transfers.</p>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[32px] border border-white/10">
                                    <ShieldCheck className="h-6 w-6 text-[#bd9245]" />
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest leading-none mb-1 text-white">Price Guarantee</p>
                                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">No hidden booking fees</p>
                                    </div>
                                </div>

                                <Link
                                    href={`/contact?packageName=${encodeURIComponent(tourData.title)}&packageType=tour`}
                                    className="block"
                                >
                                    <Button className="w-full h-20 bg-[#bd9245] hover:bg-[#a07835] text-gray-900 font-black uppercase tracking-[0.2em] rounded-[32px] shadow-2xl transition-all duration-300 group flex items-center justify-center gap-4">
                                        Request Tour Quote
                                        <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    className="w-full h-16 border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[24px] uppercase tracking-widest text-xs"
                                    onClick={() => window.open('https://wa.me/237683577676', '_blank')}
                                >
                                    Chat with Expert
                                </Button>
                            </div>

                            {/* Inclusions List */}
                            <div className="pt-10 border-t border-white/10 space-y-6">
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Inclusions</h4>
                                <ul className="space-y-4">
                                    {tourData.inclusions?.map((inc, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-white/80">
                                            <CheckCircle className="h-4 w-4 text-[#bd9245]" />
                                            {inc}
                                        </li>
                                    )) || (
                                            <>
                                                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-white/80">
                                                    <CheckCircle className="h-4 w-4 text-[#bd9245]" />
                                                    Professional Local Guide
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-white/80">
                                                    <CheckCircle className="h-4 w-4 text-[#bd9245]" />
                                                    Entrance Tickets Included
                                                </li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="mt-8 bg-white p-8 rounded-[40px] border border-gray-100 flex items-center gap-5 shadow-sm">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                                <Phone className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Need Help?</p>
                                <p className="text-lg font-black text-gray-900">+237 6 83 57 76 76</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TourDetailPage;
