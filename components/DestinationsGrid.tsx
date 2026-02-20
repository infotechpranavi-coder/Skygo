'use client'

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/homeData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const DestinationsGrid = () => {
  const router = useRouter();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hoveredCardImage, setHoveredCardImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload all destination images
  useEffect(() => {
    const preloadImages = () => {
      destinations.forEach((destination) => {
        const img = new Image();
        img.src = destination.image;
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(destination.image));
        };
        img.onerror = () => {
          // Silently handle preload errors - images might still work when displayed
        };
      });
    };
    preloadImages();
  }, []);

  return (
    <section 
      id="destinations" 
      ref={ref}
      className="py-24 relative overflow-hidden min-h-[600px]"
    >
      {/* Default Background Image - Always visible */}
      <div className="absolute inset-0 z-0">
        <img
          src="/b5.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(40px) brightness(0.3)',
            transform: 'scale(1.1)',
          }}
          onLoad={() => console.log('Default background loaded: /b5.jpg')}
          onError={(e) => {
            console.error('Default background image failed to load: /b5.jpg');
          }}
        />
        <div className="absolute inset-0 bg-gray-900/70" />
      </div>

      {/* Dynamic Background Image on Hover - Appears above default */}
      <AnimatePresence>
        {hoveredCardImage && (
          <motion.div
            key={hoveredCardImage}
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={hoveredCardImage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'blur(40px) brightness(0.3)',
                transform: 'scale(1.1)',
              }}
              onError={(e) => {
                // If image fails to load, hide the hover background and show default
                setHoveredCardImage(null);
              }}
            />
            <div className="absolute inset-0 bg-gray-900/70" />
          </motion.div>
        )}
      </AnimatePresence>


      <div className="container mx-auto px-4 relative z-[3]">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Panel */}
          <div className="lg:col-span-1">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 -mt-10 lg:-mt-16">
              DESTINATIONS
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Discover breathtaking destinations across Dubai and the UAE. From desert adventures to cultural landmarks.
            </p>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full"
              onClick={() => router.push('/packages')}
            >
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Grid - 2x2 */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-12">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 card-hover z-10"
                onClick={() => router.push(destination.link)}
                onMouseEnter={() => {
                  setHoveredCardImage(destination.image);
                }}
                onMouseLeave={() => setHoveredCardImage(null)}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="absolute inset-0">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">
                    {destination.title}
                  </h3>
                  <p className="text-white/80 mb-4">{destination.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Explore</span>
                    <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="h-5 w-5 text-gray-900" />
                    </div>
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

export default DestinationsGrid;
