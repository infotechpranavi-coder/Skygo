export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  link: string;
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const destinations: Destination[] = [
  {
    id: '1',
    title: 'Dubai Desert Safari',
    subtitle: 'Adventure in the dunes',
    image: '/b5.jpg',
    link: '/packages'
  },
  {
    id: '2',
    title: 'Abu Dhabi Grand Mosque',
    subtitle: 'Cultural heritage tour',
    image: 'https://tse3.mm.bing.net/th/id/OIP.JriaLo7J598DpnCChNGfxAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    link: '/packages'
  },
  {
    id: '3',
    title: 'Burj Khalifa Experience',
    subtitle: 'World\'s tallest building',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  },
  {
    id: '4',
    title: 'Dubai Marina Cruise',
    subtitle: 'Luxury yacht experience',
    image: 'https://tse3.mm.bing.net/th/id/OIP.Eme8v44yWu1JMtzrMLmzjgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    link: '/packages'
  }
];

export const upcomingTrips: Trip[] = [
  {
    id: '1',
    title: 'Desert Safari Adventure',
    location: 'Dubai Desert',
    price: 'from $199',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  },
  {
    id: '2',
    title: 'City Tour & Burj Khalifa',
    location: 'Dubai',
    price: 'from $299',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  },
  {
    id: '3',
    title: 'Abu Dhabi Day Trip',
    location: 'Abu Dhabi',
    price: 'from $249',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  }
];

export const popularPackages: Package[] = [
  {
    id: '1',
    title: 'Premium Desert Safari',
    subtitle: 'Dune bashing, camel ride & BBQ dinner',
    duration: 'Half Day',
    price: 'AED 2,500',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  },
  {
    id: '2',
    title: 'Dubai City Highlights',
    subtitle: 'Burj Khalifa, Dubai Mall & Marina',
    duration: '1 Day',
    price: 'AED 5,500',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  },
  {
    id: '3',
    title: 'Abu Dhabi Cultural Tour',
    subtitle: 'Sheikh Zayed Mosque & Louvre',
    duration: '1 Day',
    price: 'AED 4,500',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Anupam Kumar',
    role: 'Adventure Traveler',
    quote: 'Our Dubai adventure with Premium Dubai Tours was absolutely incredible! The team was professional, knowledgeable, and made our trip unforgettable.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Himanshu Sharma',
    role: 'Cultural Explorer',
    quote: 'The Dubai city tour was amazing! Our guide was so knowledgeable about the history and culture. Premium Dubai Tours really knows how to create authentic experiences.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Rushabh Nandeshwar',
    role: 'Family Traveler',
    quote: 'We had the most wonderful family trip to Dubai! The team took care of everything - from hotel bookings to tours. The kids loved every moment.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Deesha Patil',
    role: 'Wildlife Enthusiast',
    quote: 'The desert safari experience was incredible! The dune bashing, camel rides, and traditional entertainment were amazing. Will definitely book again!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  }
];

export const exploreInclusions = [
  'Travel Insurance',
  'Return Flight',
  'Accommodation',
  'Vehicle Rentals',
  'Hotel Booking',
  'Air Tickets',
  'Visa Services',
  'Vehicle Rentals'
];
