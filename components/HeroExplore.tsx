'use client'


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
            alt="South African Safari"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Even Lighter Orange Gradient Overlay with Top Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-orange-300/5 to-transparent"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
        {/* Subtle top-down fade for navbar blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
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
            TRAVEL MORE
            <br />
            <span className="text-[#bd9245]">WORRY LESS</span>
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Discover the untamed beauty of South Africa's majestic landscapes and create memories that last a lifetime
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
              className="bg-[#bd9245] hover:bg-[#a07835] text-gray-900 font-bold px-8 py-6 text-lg rounded-full shadow-2xl"
            >
              Start Your Adventure
            </Button>

          </motion.div>
        </div>
      </motion.div>


    </section>
  );
};

export default HeroExplore;
