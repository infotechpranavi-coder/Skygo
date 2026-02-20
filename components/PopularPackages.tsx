'use client'

import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { popularPackages } from "@/data/homeData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PopularPackages = () => {
  const router = useRouter();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="packages" 
      ref={ref}
      className="py-24 bg-[#faf8f3]"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Large Cards */}
          <div className="lg:col-span-2 space-y-6">
            {popularPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer card-hover"
                onClick={() => router.push(pkg.link)}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="md:col-span-1 relative h-48 md:h-full">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#ccff00] transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{pkg.subtitle}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <Clock className="h-4 w-4 mr-2" />
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Starting from</span>
                        <p className="text-2xl font-bold text-[#ccff00]">{pkg.price}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#ccff00] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="h-6 w-6 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Stacked Cards + CTA */}
          <div className="lg:col-span-1 space-y-6">
            {/* Featured Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#ccff00] mr-2">✓</span>
                  <span>Expert local guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ccff00] mr-2">✓</span>
                  <span>Best price guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ccff00] mr-2">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#ccff00] mr-2">✓</span>
                  <span>Flexible cancellation</span>
                </li>
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-6">
                Our travel experts are here to help you plan your perfect Dubai adventure.
              </p>
              <Button
                onClick={() => router.push('/contact')}
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-gray-900 font-bold py-6 rounded-full"
              >
                Contact Us
              </Button>
            </div>

            {/* View All Button */}
            <Button
              variant="outline"
              className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-6 rounded-full"
              onClick={() => router.push('/packages')}
            >
              View All Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
