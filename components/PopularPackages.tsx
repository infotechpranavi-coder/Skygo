'use client'

import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { popularPackages } from "@/data/homeData";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PopularPackages = () => {
  const router = useRouter();

  return (
    <section
      id="packages"
      className="py-24 bg-[#faf8f3]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Column: Title + 2 Cards */}
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-[1000] text-[#1e1f44] leading-[0.8] tracking-tighter uppercase">
                POPULAR<br />PACKAGES
              </h2>
            </div>

            {/* Card 1 */}
            {popularPackages[0] && (
              <PackageCard
                pkg={popularPackages[0]}
                index={0}
                router={router}
              />
            )}

            {/* Card 2 */}
            {popularPackages[1] && (
              <PackageCard
                pkg={popularPackages[1]}
                index={1}
                router={router}
              />
            )}
          </div>

          {/* Right Column: 3 Cards + View All Button (With Offset) */}
          <div className="space-y-8 lg:pt-20">
            {/* Card 3 */}
            {popularPackages[2] && (
              <PackageCard
                pkg={popularPackages[2]}
                index={2}
                router={router}
              />
            )}

            {/* Card 4 */}
            {popularPackages[3] && (
              <PackageCard
                pkg={popularPackages[3]}
                index={3}
                router={router}
              />
            )}

            {/* Card 5 */}
            {popularPackages[4] && (
              <PackageCard
                pkg={popularPackages[4]}
                index={4}
                router={router}
              />
            )}

            {/* View All Button - Compact & Professional */}
            <div className="pt-8 pl-4">
              <Button
                variant="ghost"
                className="group flex items-center gap-3 text-[#1e1f44] font-black text-xl uppercase tracking-tighter hover:bg-transparent hover:text-[#bd9245] transition-all duration-300"
                onClick={() => router.push('/packages')}
              >
                <span>View All Packages</span>
                <div className="w-10 h-10 rounded-full border border-[#3d407f]/10 flex items-center justify-center group-hover:bg-[#bd9245] group-hover:border-[#bd9245] transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for cleaner code
const PackageCard = ({ pkg, index, router }: any) => (
  <motion.div
    className="group bg-white rounded-[40px] overflow-hidden p-3 shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.1)] transition-all duration-700 cursor-pointer flex flex-col sm:flex-row h-full sm:h-[320px] border border-white"
    onClick={() => router.push(`/packages/${pkg.id}`)}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Image Section */}
    <div className="relative w-full sm:w-[260px] h-[200px] sm:h-full flex-shrink-0">
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-full object-cover rounded-[30px] transform group-hover:scale-105 transition-transform duration-1000"
      />
    </div>

    {/* Info Section */}
    <div className="p-6 flex flex-col justify-between flex-grow">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
          {pkg.duration} &nbsp;·&nbsp; PREMIER EXPERIENCE
        </p>
        <h3 className="text-xl md:text-2xl font-black text-[#1e1f44] leading-[1.1] mb-2 uppercase tracking-tighter group-hover:text-[#bd9245] transition-colors">
          {pkg.title}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#bd9245] text-[#bd9245]" />
          ))}
          <span className="text-[10px] font-bold text-gray-300 ml-1">Verified Experience</span>
        </div>
        <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2 font-medium">
          {pkg.subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          className="flex-1 bg-[#bd9245] hover:bg-[#a07835] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/packages/${pkg.id}`);
          }}
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-[#1e1f44] text-[#1e1f44] hover:bg-[#1e1f44] hover:text-white font-bold py-4 rounded-xl transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/contact?packageName=${encodeURIComponent(pkg.title)}&packageType=popular`);
          }}
        >
          Enquire Now
        </Button>
      </div>
    </div>
  </motion.div>
);


export default PopularPackages;
