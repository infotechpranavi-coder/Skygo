export interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
}

export interface PackageData {
    _id: string;
    title: string;
    subtitle: string;
    ideaFor?: string;
    about: string;
    services: string;
    tourDetails: string;
    abstract?: string;
    tourOverview?: string;
    keyHighlights?: string[];
    hotelOptions?: string[];
    bestTimeToVisit?: {
        yearRound?: string;
        winter?: string;
        summer?: string;
    };
    whyChooseThisTrip?: string[];
    whyPremiumDubaiTours?: string[];
    price: number;
    duration: string;
    location: string;
    capacity: string;
    packageType: 'domestic' | 'international';
    place: string;
    packageCategory: string;
    images: Array<{
        public_id: string;
        url: string;
        alt: string;
    }>;
    itinerary: Array<{
        day: number;
        title: string;
        description: string;
    }>;
    transportation: Array<{
        type: string;
        vehicle: string;
        description: string;
    }>;
    accommodation: Array<{
        city: string;
        hotel: string;
        rooms: string;
        roomType: string;
        nights: string;
    }>;
    inclusions?: string[] | Array<{
        category: string;
        items: string[];
    }>;
    exclusions?: string[] | Array<{
        category: string;
        items: string[];
    }>;
    reviews?: Review[];
    bookings: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}
