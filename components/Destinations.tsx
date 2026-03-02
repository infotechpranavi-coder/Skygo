import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Destinations = () => {
  const destinations = [
    {
      name: "Table Mountain",
      type: "Cape Town",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Kruger Safari",
      type: "Mpumalanga",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "V&A Waterfront",
      type: "Cape Town",
      image: "https://images.unsplash.com/photo-1579549303534-738944517e47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Garden Route",
      type: "Western Cape",
      image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Drakensberg",
      type: "KwaZulu-Natal",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sun City",
      type: "North West",
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">South African Destinations</h2>
          <p className="text-xl text-muted-foreground">Discover amazing places across South Africa</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge
                  className="absolute top-4 left-4 bg-primary hover:bg-primary/90"
                >
                  {destination.type}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-center">{destination.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors">
            More Destinations →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;