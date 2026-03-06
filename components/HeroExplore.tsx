'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInquiryForm } from "../contexts/InquiryFormContext";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BannerData } from "@/lib/types";

const HeroExplore = () => {
  const router = useRouter();
  const { openForm } = useInquiryForm();
  const sectionRef = useRef<HTMLElement>(null);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback banner if none are uploaded
  const defaultBanner: BannerData = {
    _id: 'default',
    title: "TRAVEL MORE",
    subtitle: "WORRY LESS",
    image: {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      public_id: "default",
      alt: "South African Safari"
    },
    link: "",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners?activeOnly=true');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setBanners(data.data);
        } else {
          setBanners([defaultBanner]);
        }
      } catch (err) {
        console.error("Failed to fetch banners", err);
        setBanners([defaultBanner]);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners]);


  const currentBanner = banners[currentIndex] || defaultBanner;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img
                src={currentBanner.image.url}
                alt={currentBanner.image.alt || currentBanner.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-orange-300/5 to-transparent"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
      </div>

      {/* Giant "EXPLORE" Background Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20rem] sm:text-[25rem] md:text-[30rem] font-black text-white/5 select-none uppercase tracking-tighter">
          EXPLORE
        </h1>
      </div>

      {/* Content with AnimatePresence */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] text-white mb-6 leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
              {currentBanner.title.split(' ').slice(0, -1).join(' ')}
              <br />
              <span className="text-[#bd9245]">
                {currentBanner.title.split(' ').slice(-1)}
              </span>
            </h2>

            <p className="text-xl sm:text-2xl font-black text-white/90 mb-10 max-w-2xl mx-auto uppercase tracking-widest drop-shadow-lg">
              {currentBanner.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => currentBanner.link ? router.push(currentBanner.link) : openForm()}
                size="lg"
                className="bg-[#bd9245] hover:bg-[#111827] text-white font-black px-12 py-8 text-xs rounded-2xl shadow-2xl transition-all uppercase tracking-widest border border-white/10"
              >
                {currentBanner.link ? 'View Details' : 'Start Your Adventure'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-12 h-1 transition-all duration-500 rounded-full",
                i === currentIndex ? "bg-[#bd9245] w-20" : "bg-white/30 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Helper for class consolidation if not available in this scope, 
// though typically it is. I'll check if I need to import it.
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default HeroExplore;
