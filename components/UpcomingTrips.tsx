'use client'

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingTrips } from "@/data/homeData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const UpcomingTrips = () => {
  const router = useRouter();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="trips" 
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-6">
              UPCOMING TRIPS
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join us on these exciting upcoming adventures. Limited spots available!
            </p>
            <Button
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 rounded-full"
              onClick={() => router.push('/packages')}
            >
              View All Trips
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - 3 Tall Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">
            {upcomingTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-[500px] card-hover"
                onClick={() => router.push(trip.link)}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <div className="absolute inset-0">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-[#ccff00] text-gray-900 font-bold px-4 py-1 rounded-full text-sm">
                      {trip.price}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">
                    {trip.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{trip.location}</p>
                  <div className="flex items-center text-white/60 text-sm group-hover:text-[#ccff00] transition-colors">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTrips;
