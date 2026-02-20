'use client'

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInquiryForm } from "../contexts/InquiryFormContext";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HeroExplore = () => {
  const router = useRouter();
  const { openForm } = useInquiryForm();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const newScrollY = Math.max(0, -rect.top);
        setScrollY(newScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.5;
  const textOffset = prefersReducedMotion ? 0 : scrollY * 0.3;

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{
            y: parallaxOffset,
          }}
          className="w-full h-[120%]"
        >
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Desert Safari"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Giant "EXPLORE" Background Text with Parallax */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{
          y: textOffset,
        }}
      >
        <h1 className="text-[20rem] sm:text-[25rem] md:text-[30rem] font-black text-white/5 select-none">
          EXPLORE
        </h1>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            SAFARI DREAMS
            <br />
            <span className="text-[#ccff00]">WILD REALITIES</span>
          </motion.h2>
          <motion.p 
            className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Discover the untamed beauty of Dubai's desert landscapes and create memories that last a lifetime
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Button
              onClick={openForm}
              size="lg"
              className="bg-[#ccff00] hover:bg-[#b8e600] text-gray-900 font-bold px-8 py-6 text-lg rounded-full shadow-2xl"
            >
              Start Your Adventure
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Play Video Button (Left Side) */}
      <div className="absolute left-8 bottom-20 z-20 hidden lg:block">
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <Play className="h-8 w-8 fill-white" />
        </Button>
      </div>
    </section>
  );
};

export default HeroExplore;
