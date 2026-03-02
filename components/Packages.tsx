import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";

const Packages = () => {
  const packages = [
    {
      title: "4 NIGHTS 5 DAYS CAPE TOWN LUXURY TOUR PACKAGE",
      description: "Experience the best of Cape Town with our luxury tour package. Explore iconic landmarks including Table Mountain, V&A Waterfront, Cape Point, and enjoy a wine tasting adventure.",
      duration: "5D/4N",
      destination: "Cape Town",
      price: "15,999.00",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "KRUGER SAFARI - BIG FIVE ADVENTURE",
      description: "Discover South Africa's majestic wildlife. Visit the world-famous Kruger National Park, enjoy sunrise game drives, and experience luxury in the wild.",
      duration: "3 Days",
      destination: "Kruger",
      price: "18,500.00",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "GARDEN ROUTE COASTAL ESCAPE",
      description: "Explore the scenic Garden Route from Mossel Bay to Storms River. Visit the Knysna Heads, Cango Caves, and enjoy whale watching in Hermanus.",
      duration: "5 Days",
      destination: "Garden Route",
      price: "12,500.00",
      image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "JOHANNESBURG & SOWETO CULTURAL TOUR",
      description: "Experience the vibrant heart of South Africa. Visit the Apartheid Museum, Constitution Hill, and take a guided tour through the historic streets of Soweto.",
      duration: "4D/3N",
      destination: "Johannesburg",
      price: "9,500.00",
      image: "https://images.unsplash.com/photo-1545129139-1beb780cf337?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "SUN CITY RESORT & SAFARI EXPERIENCE",
      description: "Enjoy world-class leisure at Sun City combined with a wildlife safari in Pilanesberg National Park. Perfect for families looking for entertainment and adventure.",
      duration: "4D/3N",
      destination: "Sun City",
      price: "16,800.00",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="packages" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Popular Packages</h2>
          <p className="text-xl text-muted-foreground">Checkout our packages</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">{pkg.title}</h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">{pkg.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{pkg.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      R {pkg.price}/
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Book now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            VIEW ALL PACKAGES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;