'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search, Filter, Calendar, ArrowRight, Plane, Globe, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Package {
    _id: string;
    title: string;
    subtitle: string;
    about: string;
    services: string[];
    tourDetails: string;
    itinerary: Array<{
        day: number;
        title: string;
        description: string;
    }>;
    price: number;
    duration: string;
    location: string;
    capacity: string;
    packageCategory: string;
    images: Array<{
        url: string;
        alt: string;
    }>;
    bookings: number;
    rating: number;
}

const TicketsPage = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [airlineFilter, setAirlineFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        fetchPackages();
    }, []);

    useEffect(() => {
        filterPackages();
    }, [packages, searchTerm, classFilter, airlineFilter]);

    const fetchPackages = async () => {
        try {
            const response = await fetch('/api/packages');
            const result = await response.json();
            if (result.success) {
                setPackages(result.data);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterPackages = () => {
        let filtered = packages;

        if (searchTerm) {
            filtered = filtered.filter(pkg =>
                pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPackages(filtered);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Searching for flights...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative text-white py-28 md:py-40 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#faf8f3] to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm mb-6">
                            Global Air Travel
                        </p>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-[1000] mb-6 leading-none tracking-tighter uppercase">
                            Airline Tickets
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto font-medium">
                            Premium flight booking services for domestic and international routes with 24/7 concierge support
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Plane className="h-4 w-4" />
                                <span>Multi-City Routes</span>
                            </div>
                            <span className="text-white/30">·</span>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>Global Network</span>
                            </div>
                            <span className="text-white/30">·</span>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Verified Bookings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search by destination or airline..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={classFilter} onValueChange={setClassFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Travel Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any Class</SelectItem>
                                    <SelectItem value="Economy">Economy Class</SelectItem>
                                    <SelectItem value="Business">Business Class</SelectItem>
                                    <SelectItem value="First">First Class</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={airlineFilter} onValueChange={setAirlineFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Airlines" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Airlines</SelectItem>
                                    <SelectItem value="South African Airways">South African Airways</SelectItem>
                                    <SelectItem value="Etihad">Airlink</SelectItem>
                                    <SelectItem value="Qatar">Safair</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="bg-gray-900 hover:bg-black text-white font-bold h-full rounded-xl">
                                Check Availability
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16 bg-[#faf8f3]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg._id}
                                className="group bg-white rounded-[32px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.1)] transition-all duration-700 cursor-pointer flex flex-col border border-gray-100"
                                onClick={() => router.push(`/tickets/${pkg._id}`)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                            >
                                {/* Header / Image area */}
                                <div className="relative w-full h-[200px] flex-shrink-0">
                                    {pkg.images && pkg.images.length > 0 ? (
                                        <Image src={pkg.images[0].url} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                            <Plane className="h-10 w-10 text-gray-200" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <Badge className="bg-white/90 backdrop-blur-sm text-amber-600 border-none font-bold px-3 py-1 shadow-sm">
                                            Available Now
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-8 pt-2 flex flex-col flex-grow relative">
                                    {/* Boarding Pass Style Notches */}
                                    <div className="absolute -top-4 left-[-12px] w-6 h-6 rounded-full bg-[#faf8f3]" />
                                    <div className="absolute -top-4 right-[-12px] w-6 h-6 rounded-full bg-[#faf8f3]" />
                                    <div className="absolute -top-1 left-4 right-4 border-t border-dashed border-gray-200" />

                                    <div className="flex-grow pt-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-1">Destination</p>
                                                <h3 className="text-2xl font-black text-[#1e1f44] leading-tight uppercase tracking-tighter group-hover:text-gray-900 transition-colors">{pkg.location}</h3>
                                            </div>
                                            <div className="text-right">
                                                <Plane className="h-6 w-6 text-gray-200 ml-auto rotate-45" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 py-4 border-y border-gray-50 mb-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Airline</p>
                                                <p className="text-sm font-bold text-[#1e1f44]">Premium Carrier</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Route</p>
                                                <p className="text-sm font-bold text-[#1e1f44]">Direct Flight</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Class</p>
                                                <p className="text-sm font-bold text-[#1e1f44]">Eco / Biz / First</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                                <p className="text-sm font-bold text-green-600">Active</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                                            Special seasonal fares and corporate group bookings available upon request.
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <Button
                                            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-6 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group/btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/tickets/${pkg._id}`);
                                            }}
                                        >
                                            <span>View Flight Details</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TicketsPage;
