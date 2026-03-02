'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/homeData';

const ClientFeedback = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = (index: number) => {
    setDirection(1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-[#faf8f3] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-5xl md:text-7xl font-[1000] text-[#1e1f44] leading-none tracking-tighter uppercase mb-12">
          CLIENT FEEDBACK
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 relative h-full">
          {/* Main Image Area */}
          <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] flex-shrink-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-[#ffc107] rounded-full scale-90" />
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={testimonials[activeIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0 w-full h-full rounded-full border-[8px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] overflow-hidden z-10"
              >
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Divider Line */}
          <div className="hidden lg:block w-[1.5px] h-[280px] bg-[#1e1f44]/10 mx-6 flex-shrink-0" />

          {/* Testimonial Content */}
          <div className="flex-grow relative min-h-[400px] flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={testimonials[activeIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute w-full"
              >
                <Quote className="w-20 h-20 text-[#bd9245] mb-6 fill-[#bd9245]" />
                <p className="text-xl md:text-[26px] text-gray-700 leading-snug font-medium mb-12 max-w-3xl tracking-tight">
                  {testimonials[activeIndex].quote}
                </p>
                <div>
                  <h4 className="text-2xl font-black text-[#1e1f44] uppercase tracking-tighter">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mt-2">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail List - Vertical Capsule */}
          <div className="flex lg:flex-col gap-3 bg-white p-3 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => nextTestimonial(idx)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-4 transition-all duration-500 ${activeIndex === idx ? 'border-[#bd9245] scale-110 shadow-md' : 'border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
              >
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
