import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-[#111827] text-white overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* High-Visibility Glass Overlay Layer */}
      <div className="absolute inset-0 bg-white/[0.15] backdrop-blur-[45px] border-t border-white/30 pointer-events-none z-0"></div>
      {/* Specular Reflection / Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 pointer-events-none z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 flex items-center justify-center">
                {/* Perfect Glassmorphic Circle Background for Logo */}
                <div className="absolute inset-2 bg-white/75 backdrop-blur-[20px] border border-white/30 rounded-full shadow-lg z-0"></div>
                <div className="relative w-4/5 h-4/5 z-10">
                  <Image
                    src="/Untitled_design__2_-removebg-preview.png"
                    alt="Sky Go Logo"
                    fill
                    sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 200px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Sky Go specializes in well-curated travel experiences across Cape Town, Johannesburg, and the beautiful landscapes of South Africa. We focus on comfort, transparency, and professional service for travelers who value quality.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/1EkLqFyM9F/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/jj_tia_travels" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>

              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</Link></li>
              <li><Link href="/packages" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Packages</Link></li>
              <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Travel Blog </Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Exclusive Tours</Link></li>
              <li><Link href="/international" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">International Packages</Link></li>
              <li><Link href="/domestic" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Domestic Packages</Link></li>
              <li><Link href="/packages/premium" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Premium Packages</Link></li>
              <li><Link href="/packages/luxury" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Luxury Packages</Link></li>
              <li><Link href="/packages/adventure" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Adventure Activities</Link></li>
              <li><Link href="/packages/oman" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">OMAN Tour</Link></li>
              <li><Link href="/packages/attractions" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Attraction and Activity</Link></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#bd9245] mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div className="text-white font-medium">Head office- Yaoundé ,Cameroon</div>


                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#bd9245]" />
                <span className="text-gray-400 text-sm font-medium"> +237 6 83 57 76 76</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#bd9245]" />
                <span className="text-gray-400 text-sm font-medium">sales@skygovoyages.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-4">
              <h5 className="font-semibold text-white">Newsletter</h5>
              <p className="text-gray-400 text-sm">Subscribe for curated travel insights and exclusive updates.</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/5 border-white/10 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#bd9245] transition-all"
                />
                <Button size="sm" className="bg-[#bd9245] hover:bg-[#a07835] text-gray-900 font-bold px-6 border-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Sky Go. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;