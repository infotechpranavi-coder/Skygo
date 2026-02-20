'use client'

import { Quote } from "lucide-react";
import { testimonials } from "@/data/homeData";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ClientFeedback = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="feedback" 
      ref={ref}
      className="py-24 bg-[#faf8f3]"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Main Testimonial */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative">
              {/* Quote Icon */}
              <div className="absolute top-8 left-8">
                <Quote className="h-16 w-16 text-[#ccff00]/20" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* Avatar and Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Avatar List */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Client Feedback</h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
                    index === currentTestimonial
                      ? 'bg-white shadow-lg border-2 border-[#ccff00]'
                      : 'bg-white/50 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h5 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h5>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                  {index === currentTestimonial && (
                    <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
