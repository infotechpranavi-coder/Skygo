'use client'

import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exploreInclusions } from "@/data/homeData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInquiryForm } from "../contexts/InquiryFormContext";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ExploreWithUs = () => {
  const router = useRouter();
  const { openForm } = useInquiryForm();

  // Split inclusions into two columns
  const leftColumn = exploreInclusions.slice(0, 4);
  const rightColumn = exploreInclusions.slice(4, 8);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="explore"
      ref={ref}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle dot pattern background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* TIME TO TRAVEL heading */}
            <p className="text-[#bd9245] font-bold text-sm uppercase tracking-wider mb-2">
              TIME TO TRAVEL
            </p>

            {/* EXPLORE WITH US - Large stacked heading */}
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-8 leading-tight">
              EXPLORE<br />WITH US
            </h2>

            {/* ALL PACKAGES INCLUDE section */}
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-6">
              ALL PACKAGES INCLUDE
            </p>

            {/* Two Column Inclusions List */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {/* Left Column */}
              <ul className="space-y-4">
                {leftColumn.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#bd9245] flex items-center justify-center">
                      <Check className="h-3 w-3 text-gray-900" strokeWidth={3} />
                    </div>
                    <span className="text-gray-900 text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Right Column */}
              <ul className="space-y-4">
                {rightColumn.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#bd9245] flex items-center justify-center">
                      <Check className="h-3 w-3 text-gray-900" strokeWidth={3} />
                    </div>
                    <span className="text-gray-900 text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button and Phone */}
            <div className="flex items-center gap-6">
              <Button
                onClick={openForm}
                className="bg-[#bd9245] hover:bg-[#a07835] text-gray-900 font-bold px-8 py-6 rounded-lg text-base"
              >
                Book Now
              </Button>

              {/* Phone Number */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-[#bd9245]" />
                  <a href="tel:+27214087600" className="text-gray-900 text-lg font-semibold hover:text-[#bd9245] transition-colors">
                    +27 21 408 7600
                  </a>
                </div>
                <span className="text-xs text-gray-500 mt-1">CALL NOW</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Polaroid Images with Badge */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* Polaroid Images */}
            <div className="relative h-full">
              {/* Image 1 - Top */}
              <div className="absolute top-0 left-0 w-64 h-80 bg-white p-4 shadow-2xl transform rotate-[-8deg] z-10">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Mountain Adventure"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Image 2 - Middle */}
              <div className="absolute top-20 left-32 w-64 h-80 bg-white p-4 shadow-2xl transform rotate-[5deg] z-20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Safari Adventure"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Image 3 - Bottom */}
              <div className="absolute top-40 left-64 w-64 h-80 bg-white p-4 shadow-2xl transform rotate-[-3deg] z-10">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Wildlife Experience"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Discount Badge - Jagged edge style - Positioned to overlap images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-44 h-44 bg-[#bd9245] flex flex-col items-center justify-center shadow-2xl"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%, 15% 15%, 25% 5%, 35% 10%, 50% 0%, 65% 5%, 75% 10%, 85% 20%, 95% 30%, 100% 40%, 100% 60%, 95% 70%, 85% 80%, 75% 90%, 65% 95%, 50% 100%, 35% 95%, 25% 90%, 15% 85%, 5% 75%, 0% 65%, 0% 35%, 5% 25%)'
              }}>
              <span className="text-[10px] font-bold text-white uppercase leading-tight">Get Up to</span>
              <span className="text-5xl font-black text-white leading-none my-1">50% Off</span>
              <span className="text-[10px] font-bold text-white uppercase leading-tight">DISCOUNT</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreWithUs;
