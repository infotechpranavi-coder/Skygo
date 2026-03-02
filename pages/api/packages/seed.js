import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { isConnected } from '../../../lib/mongodb';

// Regular packages data
const getRegularPackages = () => [
  {
    _id: 'capetown-grand-explorer',
    title: 'Cape Town Grand Explorer',
    subtitle: '7 Nights / 8 Days Cape Town Tour Package',
    about: 'The Cape Town Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Cape Town at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Cape Town comfortably without feeling rushed.',
    services: '7 nights hotel accommodation with daily breakfast, Half-day Cape Town city tour (Old & New Cape Town), Wildlife Safari Game Drive with BBQ dinner and camp activities, Harbour Cruise Dinner at Cape Town Waterfront, Table Mountain & Cape Town Waterfront Mall visit, Johannesburg city tour with one theme park option, Cape Town Frame, Kirstenbosch Botanical Gardens & Zeitz MOCAA, V&A Waterfront Artisan Market evening tour, Shopping and leisure day, Private airport transfers',
    tourDetails: 'Abstract\n\nThe Cape Town Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Cape Town at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Cape Town comfortably without feeling rushed.\n\nFrom modern landmarks and cultural districts to desert landscapes, waterfront dining, and leisure days, this tour delivers a complete Cape Town experience. It is ideal for families, senior travelers, and long-stay guests who value organization, comfort, and clear planning.\n\nWith carefully scheduled activities, shared city tours, private airport transfers, and multiple accommodation options, this Regular Cape Town Tour Package offers excellent value while maintaining service reliability and professional coordination throughout your stay.',
    abstract: 'The Cape Town Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Cape Town at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Cape Town comfortably without feeling rushed.',
    tourOverview: 'Cape Town is a city best enjoyed with time, time to explore, time to relax, and time to absorb the contrast between tradition and modern ambition. The Cape Town Grand Explorer package gives you exactly that.\n\nOver eight days, you will explore Cape Town\'s historical neighborhoods, iconic skyscrapers, shopping districts, and entertainment zones, while also venturing beyond the city with a guided Johannesburg tour. The itinerary includes Cape Town\'s essential experiences, such as a desert safari with BBQ dinner, a dhow cruise dinner at Cape Town Waterfront, Table Mountain visit, Kirstenbosch Botanical Gardens, Cape Town Frame, Zeitz MOCAA, V&A Waterfront Artisan Market, and cultural sightseeing.',
    keyHighlights: [
      '7 nights hotel accommodation with daily breakfast',
      'Half-day Cape Town city tour (Old & New Cape Town)',
      'Wildlife Safari Game Drive with BBQ dinner and camp activities',
      'Harbour Cruise Dinner at Cape Town Waterfront',
      'Table Mountain & Cape Town Waterfront Mall visit',
      'Johannesburg city tour with one theme park option',
      'Cape Town Frame, Kirstenbosch Botanical Gardens & Zeitz MOCAA',
      'V&A Waterfront Artisan Market evening tour',
      'Shopping and leisure day',
      'Private airport transfers',
      'English-speaking guide'
    ],
    hotelOptions: [
      'Deluxe Package (3★ Hotels)',
      'Gold Package (4★ Hotels)',
      'Platinum Package (5★ Hotels)'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town can be visited throughout the year.',
      winter: 'November to March: Pleasant weather, peak season',
      summer: 'April to October: Hotter months, but tours are mostly indoor or evening-based and offered at more economical prices'
    },
    whyChooseThisTrip: [
      'Clear itineraries with no rushed schedules',
      'Professional coordination and transparent inclusions',
      'Comfortable vehicles and experienced guides',
      'Multiple hotel category options under one package',
      'Suitable for families, seniors, and long-stay travelers',
      'Reliable support before and during the tour'
    ],
    whyPremiumSkygoTours: [
      'Clear itineraries with no rushed schedules',
      'Professional coordination and transparent inclusions',
      'Comfortable vehicles and experienced guides',
      'Multiple hotel category options under one package',
      'Suitable for families, seniors, and long-stay travelers',
      'Reliable support before and during the tour'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Hotel Transfer',
        description: 'Upon arrival at Cape Town International Airport, you will be welcomed and transferred to your hotel in a private, air-conditioned vehicle. After check-in, the rest of the day is free to relax or explore nearby areas at your own pace. Overnight: Cape Town'
      },
      {
        day: 2,
        title: 'Half-Day Cape Town City Tour, Table Mountain & Cape Town Waterfront Mall',
        description: 'After breakfast, proceed on a guided half-day Cape Town city tour covering both Old and New Cape Town. Highlights include photo stops at Bo-Kaap & Heritage Tour, The Silo Hotel, Robben Island, Cape Town Stadium, and Cape Town Waterfront, along with visits to heritage areas and traditional souks. Later, visit Cape Town Waterfront Mall and ascend Table Mountain (124th/125th floor – optional upgrade) for panoramic city views. Overnight: Cape Town'
      },
      {
        day: 3,
        title: 'Johannesburg City Tour with One Park',
        description: 'Today, travel to the South Africa capital, Johannesburg. Visit the Constitution Hill, Sea Point Promenade, Heritage Village, and key landmarks. The tour includes one theme park or attraction (Gold Reef City Theme Park / Sun City Resort / uShaka Marine World – ticket arranged at actual cost). Return to Cape Town in the evening. Overnight: Cape Town'
      },
      {
        day: 4,
        title: 'Cape Town Frame, Kirstenbosch Botanical Gardens, Zeitz MOCAA & Harbour Cruise Dinner',
        description: 'Explore Cape Town Frame for a visual journey between old and new Cape Town. Visit Kirstenbosch Botanical Gardens (seasonal) and enjoy an external or optional internal visit to the Zeitz MOCAA. In the evening, enjoy a Harbour Cruise Dinner at Cape Town Waterfront, featuring international buffet dining, soft entertainment, and skyline views. Overnight: Cape Town'
      },
      {
        day: 5,
        title: 'Dolphin Show & V&A Waterfront Artisan Market (Evening)',
        description: 'After breakfast, attend a Dolphin or Seal Show, suitable for families and children. In the evening, visit V&A Waterfront Artisan Market, Cape Town\'s multicultural entertainment and shopping destination with live performances and international pavilions. Overnight: Cape Town'
      },
      {
        day: 6,
        title: 'Harbour Cruise Dinner at Waterfront',
        description: 'Daytime is free for shopping, optional activities, or rest. In the evening, enjoy another leisure-focused Waterfront experience, ideal for relaxed sightseeing, dining, and waterfront exploration. Overnight: Cape Town'
      },
      {
        day: 7,
        title: 'Free Day for Shopping or Leisure',
        description: 'Enjoy a full free day to shop at malls, visit local markets, or add optional experiences such as theme parks, yacht cruises, or spa sessions. Overnight: Cape Town'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'After breakfast, check out from the hotel and transfer to Cape Town International Airport for your onward journey.'
      }
    ],
    price: 0,
    duration: '7 Nights / 8 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'capetown-grand-explorer-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'capetown-grand-explorer-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'capetown-grand-explorer-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' },
      { public_id: 'capetown-grand-explorer-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'capetown-grand-explorer-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport arrival & departure transfers'] },
      { category: 'Hotel Accommodation', items: ['7 nights hotel accommodation (twin sharing)'] },
      { category: 'Meals', items: ['Daily breakfast at hotel', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Cape Town city tour (SIC basis)', 'Johannesburg city tour (SIC basis)'] },
      { category: 'Experiences', items: ['Wildlife Safari Game Drive in 4x4 vehicle with BBQ dinner (sharing)', 'Harbour Cruise Dinner at Waterfront (sharing)'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during tours'] },
      { category: 'Taxes', items: ['All government taxes and service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'South Africa Entry Visa', items: ['South Africa entry visa (arranged on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, insurance, tourism dirhams)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] },
      { category: 'Tips', items: ['Tips and gratuities'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'capetown-transit-escape',
    title: 'Cape Town Transit Escape',
    subtitle: '1 Night / 2 Days Stopover Tour',
    ideaFor: 'Airline stopovers, overnight transit stays, short business visits',
    about: 'The Cape Town Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Cape Town with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Cape Town without rushed schedules or complex planning.',
    services: 'Ideal for airline stopovers and overnight transit stays, Private airport transfers for stress-free arrival and departure, Choice of Kruger Safari or Waterfront Harbour Cruise, Guided Cape Town city sightseeing tour, Flexible scheduling aligned with flight timings',
    tourDetails: 'Abstract\n\nThe Cape Town Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Cape Town with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Cape Town without rushed schedules or complex planning.\n\nThis transit-focused itinerary prioritizes timing efficiency, comfort, and seamless coordination, ensuring you enjoy Cape Town\'s iconic experiences while maintaining flexibility around flight schedules. With private airport transfers, comfortable hotel accommodation, and a choice of evening experiences, even a short stay becomes a meaningful travel experience.',
    abstract: 'The Cape Town Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Cape Town with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Cape Town without rushed schedules or complex planning.',
    tourOverview: 'Cape Town is one of the world\'s most important aviation hubs, welcoming millions of transit passengers each year. Many travelers pass through the city without realizing that even a single night is enough to experience its contrast, modern skylines, cultural heritage, and desert landscapes. The Cape Town Transit Escape is designed precisely for this purpose.',
    keyHighlights: [
      'Ideal for airline stopovers and overnight transit stays',
      'Private airport transfers for stress-free arrival and departure',
      'Choice of Kruger Safari or Waterfront Harbour Cruise',
      'Guided Cape Town city sightseeing tour',
      'Flexible scheduling aligned with flight timings'
    ],
    hotelOptions: [
      'Deluxe Package (3★ Hotels)',
      'Gold Package (4★ Hotels)',
      'Platinum Package (5★ Hotels)'
    ],
    bestTimeToVisit: {
      yearRound: 'This transit tour operates throughout the year.',
      winter: 'October to April: Pleasant weather, higher demand',
      summer: 'May to September: Lower prices, indoor and evening-focused experiences. Cape Town\'s infrastructure ensures comfort even during warmer months.'
    },
    whyChooseThisTrip: [
      'Expertise in short-stay and stopover logistics',
      'Flight-time-sensitive planning',
      'Clear inclusions with no hidden surprises',
      'Professional coordination from airport to departure'
    ],
    whyPremiumSkygoTours: [
      'Expertise in short-stay and stopover logistics',
      'Flight-time-sensitive planning',
      'Clear inclusions with no hidden surprises',
      'Professional coordination from airport to departure'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Evening Experience',
        description: 'Arrival at Cape Town International Airport followed by meet & greet and private hotel transfer. Check-in at selected hotel. Evening activity - choose one: Kruger Safari with BBQ Dinner OR Harbour Cruise Dinner at Cape Town Waterfront. Overnight stay in Cape Town.'
      },
      {
        day: 2,
        title: 'Cape Town City Tour & Departure',
        description: 'Breakfast at the hotel. Half-day guided Cape Town city tour (sharing basis) covering Old and New Cape Town. Return to hotel or airport transfer. Departure as per flight schedule.'
      }
    ],
    price: 0,
    duration: '1 Night / 2 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-transit-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-transit-2', url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Airport' },
      { public_id: 'dubai-transit-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'dubai-transit-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category (Deluxe 3★, Gold 4★, Platinum 5★)'] },
      { category: 'Meals', items: ['Daily breakfast at hotel', 'BBQ Dinner during Kruger Safari OR Dinner during Harbour Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Cape Town City Tour (Old & New Cape Town) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Kruger Safari with dune bashing, camel ride, sandboarding & camp activities OR Harbour Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Cape Town (can be arranged upon request)'] },
      { category: 'South Africa Entry Visa', items: ['Cape Town visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.5
  },
  {
    _id: 'dubai-stopover-signature',
    title: 'Cape Town Stopover Signature',
    subtitle: '2 Nights / 3 Days Stopover Tour',
    ideaFor: 'Airline stopovers, short holidays, business travelers',
    about: 'The Cape Town Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Cape Town beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.',
    services: 'Designed for 2–3 day airline stopovers, Balanced mix of sightseeing and leisure, Waterfront Harbour Cruise & Kruger Safari included, Flexible departure day schedule, Multiple hotel category options',
    tourDetails: 'Abstract\nThe Cape Town Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Cape Town beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.\nWith structured planning, flexible pacing, and professional coordination, this stopover package allows you to enjoy Cape Town\'s highlights while maintaining comfort and clarity throughout your stay.',
    abstract: 'The Cape Town Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Cape Town beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.',
    tourOverview: 'Cape Town rewards travelers who take even a little extra time to explore. With two nights at your disposal, the city unfolds at a more relaxed pace, allowing you to experience both its cultural depth and modern appeal. The Cape Town Stopover Signature is crafted for travelers who want a complete experience within a short timeframe.',
    keyHighlights: [
      'Designed for 2–3 day airline stopovers',
      'Balanced mix of sightseeing and leisure',
      'Waterfront Harbour Cruise & Kruger Safari included',
      'Flexible departure day schedule',
      'Multiple hotel category options'
    ],
    hotelOptions: [
      'Deluxe: 3★ Hotel',
      'Gold: 4★ Hotel',
      'Platinum: 5★ Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round.',
      summer: 'Summer months offer better pricing, with most activities scheduled indoors or in the evening.'
    },
    whyChooseThisTrip: [
      'Specialized stopover planning expertise',
      'Reliable timing coordination',
      'Transparent inclusions',
      'Comfortable vehicles & professional guides'
    ],
    whyPremiumSkygoTours: [
      'Specialized stopover planning expertise',
      'Reliable timing coordination',
      'Transparent inclusions',
      'Comfortable vehicles & professional guides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Waterfront Cruise',
        description: 'Arrival and private airport transfer. Hotel check-in. Evening Harbour Cruise Dinner at Cape Town Waterfront. Overnight stay.'
      },
      {
        day: 2,
        title: 'City Tour & Kruger Safari',
        description: 'Breakfast at hotel. Half-day Cape Town city sightseeing tour and back to hotel. Kruger Safari with other activities and BBQ Dinner. Overnight stay.'
      },
      {
        day: 3,
        title: 'Shopping & Departure',
        description: 'Breakfast. Free time for shopping or leisure. Private airport transfer. Departure.'
      }
    ],
    price: 0,
    duration: '2 Nights / 3 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-stopover-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-stopover-2', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'dubai-stopover-3', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' },
      { public_id: 'dubai-stopover-4', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category:', 'Deluxe Package: 3-star hotel', 'Gold Package: 4-star hotel', 'Platinum Package: 5-star hotel'] },
      { category: 'Meals', items: ['Daily breakfast at the hotel', 'BBQ Dinner during Kruger Safari', 'Buffet Dinner during Harbour Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Cape Town City Tour (Old & New Cape Town) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Kruger Safari with dune bashing, camel ride, sandboarding & camp activities', 'Harbour Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Cape Town (can be arranged upon request)'] },
      { category: 'South Africa Entry Visa', items: ['Cape Town visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.6
  },
  {
    _id: 'dubai-essential-experience',
    title: 'Cape Town Essential Experience',
    subtitle: '3 Nights / 4 Days Cape Town Tour',
    about: 'The Cape Town Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Cape Town\'s iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Cape Town experience within a limited timeframe.',
    services: 'Half-day guided Cape Town city tour, Kruger Safari with BBQ dinner and cultural activities, Table Mountain and Cape Town Waterfront Mall visit, Cape Town Waterfront Harbour Cruise Dinner, Flexible hotel options (3★, 4★, 5★)',
    tourDetails: 'Cape Town is a destination that rewards thoughtful planning. In just a few days, visitors can witness historic neighborhoods, futuristic skylines, golden deserts, and vibrant waterfronts. The Cape Town Essential Experience is curated for travelers who want to see the highlights without feeling rushed or overwhelmed.',
    abstract: 'The Cape Town Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Cape Town\'s iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Cape Town experience within a limited timeframe.',
    tourOverview: 'Cape Town is a destination that rewards thoughtful planning. In just a few days, visitors can witness historic neighborhoods, futuristic skylines, golden deserts, and vibrant waterfronts. The Cape Town Essential Experience is curated for travelers who want to see the highlights without feeling rushed or overwhelmed.',
    keyHighlights: [
      'Half-day guided Cape Town city tour',
      'Kruger Safari with BBQ dinner and cultural activities',
      'Table Mountain and Cape Town Waterfront Mall visit',
      'Cape Town Waterfront Harbour Cruise Dinner',
      'Flexible hotel options (3★, 4★, 5★)'
    ],
    hotelOptions: [
      'Deluxe Package: 3-star hotel',
      'Gold Package: 4-star hotel',
      'Platinum Package: 5-star hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town can be visited throughout the year.',
      summer: 'Summer months offer lower package costs, with activities planned indoors or during evenings.'
    },
    whyChooseThisTrip: [
      'Clear itineraries with realistic pacing',
      'Transparent inclusions and exclusions',
      'Reliable ground handling and local expertise',
      'Flexible hotel category options'
    ],
    whyPremiumSkygoTours: [
      'Clear itineraries with realistic pacing',
      'Transparent inclusions and exclusions',
      'Reliable ground handling and local expertise',
      'Flexible hotel category options'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Hotel Transfer',
        description: 'Arrival at Cape Town International Airport followed by private transfer to the hotel. Rest of the day at leisure.'
      },
      {
        day: 2,
        title: 'Cape Town City Tour & Kruger Safari',
        description: 'Morning half-day city tour covering major highlights of Old and New Cape Town. Afternoon, desert safari with dune bashing, camp activities, and BBQ dinner.'
      },
      {
        day: 3,
        title: 'Table Mountain, Cape Town Waterfront Mall & Waterfront Harbour Cruise',
        description: 'Visit Cape Town Waterfront Mall and Table Mountain (ticket optional). Evening Waterfront Harbour Cruise with dinner.'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Private transfer to the airport for departure.'
      }
    ],
    price: 0,
    duration: '3 Nights / 4 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-essential-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-essential-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'dubai-essential-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'dubai-essential-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category:', 'Deluxe Package: 3-star hotel', 'Gold Package: 4-star hotel', 'Platinum Package: 5-star hotel'] },
      { category: 'Meals', items: ['Daily breakfast at the hotel', 'BBQ Dinner during Kruger Safari', 'Buffet Dinner during Harbour Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Cape Town City Tour (Old & New Cape Town) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Kruger Safari with dune bashing, camel ride, sandboarding & camp activities', 'Harbour Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Cape Town (can be arranged upon request)'] },
      { category: 'South Africa Entry Visa', items: ['Cape Town visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.7
  },
  {
    _id: 'dubai-grand-experience',
    title: 'Cape Town Grand Experience',
    subtitle: '6 Nights / 7 Days Cape Town Tour',
    about: 'The Cape Town Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Cape Town in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Johannesburg without feeling rushed.',
    services: 'Private airport transfers on arrival and departure, Half-day Cape Town city tour covering old and new Cape Town, Table Mountain and Cape Town Waterfront Mall visit, Wildlife Safari Game Drive with BBQ dinner and cultural activities, Full-day Johannesburg city tour with one optional park, Cape Town Frame, Kirstenbosch Botanical Gardens, and Zeitz MOCAA, Dolphin show and V&A Waterfront Artisan Market evening visit, Free day for shopping or optional activities, Choice of 3★, 4★, or 5★ hotel accommodations',
    tourDetails: 'Abstract\nThe Cape Town Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Cape Town in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Johannesburg without feeling rushed.\nBy combining guided sightseeing with free leisure time, this package offers flexibility while ensuring that all major highlights are covered. It is especially suitable for families and travelers who value comfort, structured planning, and dependable local support throughout their journey.',
    abstract: 'The Cape Town Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Cape Town in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Johannesburg without feeling rushed.',
    tourOverview: 'Cape Town is not a city to be rushed. Its diversity, from ancient trading routes to ultra-modern architecture, requires time to fully appreciate. The Cape Town Grand Experience is designed for travelers who want a more comprehensive understanding of the city and its surroundings.',
    keyHighlights: [
      'Private airport transfers on arrival and departure',
      'Half-day Cape Town city tour covering old and new Cape Town',
      'Table Mountain and Cape Town Waterfront Mall visit',
      'Wildlife Safari Game Drive with BBQ dinner and cultural activities',
      'Full-day Johannesburg city tour with one optional park',
      'Cape Town Frame, Kirstenbosch Botanical Gardens, and Zeitz MOCAA',
      'Dolphin show and V&A Waterfront Artisan Market evening visit',
      'Free day for shopping or optional activities',
      'Choice of 3★, 4★, or 5★ hotel accommodations'
    ],
    hotelOptions: [
      'Deluxe Package: 3★ hotels, twin sharing, breakfast included',
      'Gold Package: 4★ hotels, twin sharing, breakfast included',
      'Platinum Package: 5★ hotels, twin sharing, breakfast included'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town can be visited throughout the year.',
      winter: 'While winter offers pleasant outdoor conditions',
      summer: 'Summer months provide better value with lower accommodation costs. Most sightseeing during summer is scheduled indoors or in the evening for comfort.'
    },
    whyChooseThisTrip: [
      'Well-balanced itinerary without rushed sightseeing',
      'Clear inclusions and transparent pricing',
      'Licensed local operators and experienced guides',
      'Flexible hotel options to suit different budgets',
      'Dedicated customer support before and during travel'
    ],
    whyPremiumSkygoTours: [
      'Well-balanced itinerary without rushed sightseeing',
      'Clear inclusions and transparent pricing',
      'Licensed local operators and experienced guides',
      'Flexible hotel options to suit different budgets',
      'Dedicated customer support before and during travel'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Hotel Transfer',
        description: 'Arrive at Cape Town International Airport, where you will be greeted by our representative and transferred privately to your hotel. After check-in, the remainder of the day is free for rest or a short walk around the hotel area. Overnight stay in Cape Town.'
      },
      {
        day: 2,
        title: 'Half-Day Cape Town City Tour, Table Mountain & Cape Town Waterfront Mall',
        description: 'After breakfast, depart for a half-day Cape Town city tour on a shared basis. The tour introduces major cultural and modern landmarks, offering insight into the city\'s transformation. In the afternoon, proceed to Cape Town Waterfront Mall, followed by time at the Table Mountain area. Guests may choose to add observation deck tickets as an optional experience. Return to the hotel for overnight stay.'
      },
      {
        day: 3,
        title: 'Johannesburg City Tour with One Park',
        description: 'After breakfast, travel to Johannesburg for a full-day city tour on a shared basis. The tour includes major landmarks of the capital and one theme park visit (tickets arranged at actual cost). This day provides a broader understanding of the South Africa\'s culture, governance, and architectural development. Return to Cape Town in the evening. Overnight stay at the hotel.'
      },
      {
        day: 4,
        title: 'Cape Town Frame, Kirstenbosch Botanical Gardens, Zeitz MOCAA & Waterfront Harbour Cruise Dinner',
        description: 'After breakfast, proceed for a sightseeing tour including Cape Town Frame, Kirstenbosch Botanical Gardens, and the Zeitz MOCAA (entry tickets arranged separately). In the evening, enjoy a Waterfront Harbour Cruise Dinner on a sharing basis. Experience Cape Town Waterfront\'s skyline from the water while enjoying a buffet dinner. Return to the hotel for overnight stay.'
      },
      {
        day: 5,
        title: 'Dolphin Show & V&A Waterfront Artisan Market Evening Tour',
        description: 'After breakfast, the day begins with a visit to a dolphin show, a popular attraction for families and children. In the evening, proceed to V&A Waterfront Artisan Market, a seasonal attraction offering international pavilions, shopping stalls, and live entertainment. Return to the hotel for overnight stay.'
      },
      {
        day: 6,
        title: 'Shopping & Free Day',
        description: 'After breakfast, enjoy a free day for shopping or independent exploration. Guests may visit malls, local markets, or add optional tours such as theme parks or cultural experiences. Overnight stay at the hotel.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'After breakfast and hotel check-out, you will be transferred privately to Cape Town International Airport for your onward journey.'
      }
    ],
    price: 0,
    duration: '6 Nights / 7 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-grand-exp-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-grand-exp-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'dubai-grand-exp-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' },
      { public_id: 'dubai-grand-exp-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'dubai-grand-exp-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport and hotel transfers'] },
      { category: 'Hotel Accommodation', items: ['Hotel accommodation on twin sharing basis'] },
      { category: 'Meals', items: ['Daily breakfast', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Cape Town and Johannesburg city tours on SIC basis'] },
      { category: 'Experiences', items: ['Wildlife Safari Game Drive in shared 4x4 vehicle with camp activities', 'Waterfront dhow cruise on sharing basis'] },
      { category: 'Guide & Assistance', items: ['All the tours as per the itinerary', 'English-speaking guide during tours'] },
      { category: 'Taxes', items: ['Government taxes and office expenses'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'South Africa Entry Visa', items: ['South Africa entry visa (available on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'dubai-signature-explorer',
    title: 'Cape Town Signature Explorer',
    subtitle: '5 Nights / 6 Days Cape Town Tour',
    about: 'The Cape Town Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Cape Town in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    services: 'Private airport transfers for arrival and departure, Half-day Cape Town city tour covering old and new districts, Table Mountain and Cape Town Waterfront Mall visit, Wildlife Safari Game Drive with BBQ dinner and cultural activities, Full-day Johannesburg city tour with one optional theme park, Free day for shopping and independent exploration, Choice of Deluxe, Gold, or Platinum hotel categories',
    tourDetails: 'Abstract\nThe Cape Town Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Cape Town in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    abstract: 'The Cape Town Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Cape Town in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    tourOverview: 'Cape Town is a city that rewards time. While shorter trips offer glimpses of its skyline, a 5-night stay allows travelers to truly settle in, explore beyond surface-level attractions, and enjoy the rhythm of the city.',
    keyHighlights: [
      'Private airport transfers for arrival and departure',
      'Half-day Cape Town city tour covering old and new districts',
      'Table Mountain and Cape Town Waterfront Mall visit',
      'Wildlife Safari Game Drive with BBQ dinner and cultural activities',
      'Full-day Johannesburg city tour with one optional theme park',
      'Free day for shopping and independent exploration',
      'Choice of Deluxe, Gold, or Platinum hotel categories'
    ],
    hotelOptions: [
      'Deluxe Package: 3★ hotels, twin sharing, breakfast included',
      'Gold Package: 4★ hotels, twin sharing, breakfast included',
      'Platinum Package: 5★ hotels, twin sharing, breakfast included'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town is a year-round destination.',
      winter: 'While winter months offer pleasant outdoor weather',
      summer: 'Summer months provide more economical pricing, with sightseeing planned indoors or during evening hours for comfort.'
    },
    whyChooseThisTrip: [
      'Balanced itinerary with adequate rest and flexibility',
      'Transparent pricing with clearly listed inclusions',
      'Trusted local operators and licensed guides',
      'Multiple hotel categories without compromising service quality',
      'Dedicated assistance before and during travel'
    ],
    whyPremiumSkygoTours: [
      'Balanced itinerary with adequate rest and flexibility',
      'Transparent pricing with clearly listed inclusions',
      'Trusted local operators and licensed guides',
      'Multiple hotel categories without compromising service quality',
      'Dedicated assistance before and during travel'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Hotel Transfer',
        description: 'Upon arrival at Cape Town International Airport, our representative will welcome you and assist with a private transfer to your hotel. After check-in, the rest of the day is free for relaxation or light exploration nearby. Overnight stay at the hotel.'
      },
      {
        day: 2,
        title: 'Half-Day Cape Town City Tour, Table Mountain & Cape Town Waterfront Mall',
        description: 'After breakfast, depart for a half-day Cape Town city tour on a shared basis. This guided experience introduces you to both historic and modern areas of the city, providing cultural insight and orientation. In the afternoon, proceed to Cape Town Waterfront Mall, one of the world\'s largest shopping destinations, followed by a visit to the Table Mountain area (observation deck tickets can be arranged separately if required). Return to the hotel for overnight stay.'
      },
      {
        day: 3,
        title: 'Johannesburg City Tour with One Park',
        description: 'After breakfast, depart for a full-day Johannesburg city tour on a shared basis. The tour includes major landmarks of the South Africa capital and one optional theme park (entry tickets arranged at actual cost). This day offers a deeper understanding of the country\'s cultural, political, and architectural development. Return to Cape Town in the evening. Overnight stay at the hotel.'
      },
      {
        day: 4,
        title: 'Cape Town Frame, Kirstenbosch Botanical Gardens, Zeitz MOCAA & Waterfront Harbour Cruise Dinner',
        description: 'After breakfast, proceed for a sightseeing day covering Cape Town Frame, Kirstenbosch Botanical Gardens, and the Zeitz MOCAA (entry tickets arranged separately if required). In the evening, enjoy a Waterfront Harbour Cruise Dinner on a sharing basis. Relax aboard a traditional wooden dhow while cruising through Cape Town Waterfront, accompanied by a buffet dinner and city views at night. Return to the hotel for overnight stay.'
      },
      {
        day: 5,
        title: 'Shopping & V&A Waterfront Artisan Market Evening Tour',
        description: 'After breakfast, the day is kept free for shopping and leisure. Guests may visit popular shopping areas, malls, or local markets. In the evening, proceed for a visit to V&A Waterfront Artisan Market, a seasonal cultural attraction featuring international pavilions, shopping stalls, and entertainment. Return to the hotel for overnight stay.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'After breakfast and check-out, you will be transferred privately to Cape Town International Airport for your onward journey.'
      }
    ],
    price: 0,
    duration: '5 Nights / 6 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-signature-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'dubai-signature-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' },
      { public_id: 'dubai-signature-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'dubai-signature-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport and hotel transfers'] },
      { category: 'Hotel Accommodation', items: ['Hotel accommodation on twin sharing basis'] },
      { category: 'Meals', items: ['Daily breakfast', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Cape Town and Johannesburg city tours on SIC basis'] },
      { category: 'Experiences', items: ['Wildlife Safari Game Drive in shared 4x4 vehicle with camp activities', 'Waterfront dhow cruise on sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during tours'] },
      { category: 'Taxes', items: ['Government taxes and office expenses'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'South Africa Entry Visa', items: ['South Africa entry visa (can be arranged on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'classic-discovery-dubai-abu-dhabi',
    title: 'Classic Discovery of Cape Town and Johannesburg',
    subtitle: '4 Nights / 5 Days Cape Town Tour',
    about: 'The Cape Town Classic Discovery – 4 Nights / 5 Days tour is thoughtfully designed for travelers who want to experience Cape Town in a balanced and unhurried way. This itinerary combines the city\'s iconic attractions, cultural experiences, and modern leisure with the added depth of an Johannesburg visit.',
    services: 'Private airport transfers for arrival and departure, Half-day guided Cape Town city tour covering old and new districts, Kruger Safari with BBQ dinner and cultural activities, Evening Waterfront Harbour Cruise Dinner, Johannesburg city tour with one optional theme park, Free day for shopping and personal exploration, Choice of 3-Star, 4-Star, or 5-Star hotels',
    tourDetails: 'Classic Discovery of Cape Town and Johannesburg - A comprehensive tour package covering the major attractions of both Cape Town and Johannesburg.',
    abstract: '',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumSkygoTours: [],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Waterfront Harbour Cruise Dinner',
        description: 'Upon arrival at Cape Town International Airport, you will be greeted by our representative and transferred to your hotel in a private, air-conditioned vehicle. After check-in, the afternoon is kept free to allow you to rest or settle in. In the evening, you will proceed for a Waterfront Harbour Cruise Dinner on a sharing basis. Enjoy a relaxed cruise through Cape Town Waterfront, surrounded by illuminated skyscrapers, while savoring an international buffet dinner. After the cruise, return to your hotel for an overnight stay.'
      },
      {
        day: 2,
        title: 'Cape Town City Tour & Kruger Safari with BBQ Dinner',
        description: 'After breakfast, depart for a half-day guided Cape Town city tour on a shared basis. This tour introduces you to both historic and modern sides of Cape Town, including traditional neighborhoods, cultural landmarks, and modern districts. Following the city tour, return to the hotel for rest. In the afternoon, you will be picked up for a desert safari experience in a shared 4x4 vehicle. Activities include dune bashing, sandboarding, and cultural performances at the desert camp. The evening concludes with a BBQ dinner before returning to the hotel.'
      },
      {
        day: 3,
        title: 'Johannesburg City Tour',
        description: 'After breakfast, proceed for a full-day Johannesburg city tour on a shared basis. This tour provides insight into the capital city of the South Africa, known for its wide boulevards, cultural institutions, and modern landmarks. The itinerary includes major highlights and one optional theme park (entry tickets arranged separately). After completing the tour, return to Cape Town in the evening for overnight stay.'
      },
      {
        day: 4,
        title: 'Free Day for Shopping & Leisure',
        description: 'This day is kept completely free for personal activities. Guests may explore Cape Town Waterfront Mall, visit Table Mountain (tickets can be arranged separately), shop at local markets, or simply relax at the hotel. This flexibility allows travelers to customize their experience based on interests and energy levels.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast and hotel check-out, you will be transferred privately to Cape Town International Airport for your onward journey.'
      }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Cape Town, South Africa',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'regular',
    images: [
      { public_id: 'classic-discovery-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'classic-discovery-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'classic-discovery-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' },
      { public_id: 'classic-discovery-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  }
];

// Luxury packages data
const getLuxuryPackages = () => [
  {
    _id: 'luxury-dubai-indulgence-tour',
    title: 'Luxury Cape Town Indulgence Tour',
    subtitle: '3 Nights / 4 Days Ultra-Luxury Private Experience',
    ideaFor: 'Honeymooners, luxury-loving families, elite travelers seeking refined experiences',
    about: 'The Luxury Cape Town Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Cape Town\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Table Mountain prime-time access, The Silo Hotel indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.',
    services: 'Private luxury airport and hotel transfers, Exclusive private yacht dinner cruise, Table Mountain prime-time observation deck with fountain dinner, Chauffeur-driven limousine experience, The Silo Hotel entry with iconic golden coffee, Fully private Cape Town city tour, Authentic desert safari at Cape Town Desert Conservation Reserve',
    tourDetails: 'Abstract\n\nThe Luxury Cape Town Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Cape Town\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Table Mountain prime-time access, The Silo Hotel indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.\n\nEvery element of this tour is executed privately, from airport transfers to sightseeing, ensuring a seamless, stress-free, and truly premium Cape Town holiday.\n\nTour Overview\n\nCape Town is a city where luxury is not an option; it is a standard. This 3-night luxury itinerary offers a balanced blend of modern architectural marvels, royal hospitality, cultural elegance, and natural desert beauty.\n\nFrom cruising the Cape Town Waterfront aboard a private yacht to sipping golden coffee inside the world-famous The Silo Hotel, and from witnessing the Cape Town Fountain from the Table Mountain observation deck to exploring the untouched dunes of the Cape Town Desert Conservation Reserve, this tour delivers a high-impact luxury experience without rushing the journey.\n\nThis package is available with three flexible pricing options, allowing guests to personalize their stay according to their accommodation preferences.',
    abstract: 'The Luxury Cape Town Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Cape Town\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Table Mountain prime-time access, The Silo Hotel indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.',
    tourOverview: 'Cape Town is a city where luxury is not an option; it is a standard. This 3-night luxury itinerary offers a balanced blend of modern architectural marvels, royal hospitality, cultural elegance, and natural desert beauty.\n\nFrom cruising the Cape Town Waterfront aboard a private yacht to sipping golden coffee inside the world-famous The Silo Hotel, and from witnessing the Cape Town Fountain from the Table Mountain observation deck to exploring the untouched dunes of the Cape Town Desert Conservation Reserve, this tour delivers a high-impact luxury experience without rushing the journey.\n\nThis package is available with three flexible pricing options, allowing guests to personalize their stay according to their accommodation preferences.',
    keyHighlights: [
      'Private luxury airport and hotel transfers',
      'Exclusive private yacht dinner cruise',
      'Table Mountain prime-time observation deck with fountain dinner',
      'Chauffeur-driven limousine experience',
      'The Silo Hotel entry with iconic golden coffee',
      'Fully private Cape Town city tour',
      'Authentic desert safari at Cape Town Desert Conservation Reserve',
      'Ideal short luxury getaway for premium travelers'
    ],
    hotelOptions: [
      'Luxury Tour Without Hotel Accommodation',
      'Luxury Tour with 4-Star Luxury Hotel',
      'Luxury Tour with 5-Star Luxury Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'The ideal time to enjoy this luxury package is from October to April, when the weather is pleasant for outdoor sightseeing, yacht cruises, and desert experiences.',
      winter: 'Peak Luxury Season: November to March',
      summer: 'May - September: Lower costs; itineraries focus on indoor attractions and evening experiences'
    },
    whyChooseThisTrip: [
      'Have limited time but high expectations',
      'Prefer private, non-shared experiences',
      'Seek iconic Cape Town attractions with added exclusivity',
      'Want comfort, elegance, and seamless execution',
      'Maximum luxury impact within a short duration',
      'Ideal for honeymooners, VIP travelers, families with children, and first-time luxury visitors to Cape Town'
    ],
    whyPremiumSkygoTours: [
      'Carefully curated luxury experiences, not mass tourism',
      'Flexible customization based on guest preferences',
      'Trusted partnerships for premium services at competitive rates',
      'Experienced on-ground team for seamless coordination',
      'Transparent inclusions with no hidden surprises',
      'Focus on creating memorable luxury moments, not just sightseeing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Private Yacht Dinner Experience',
        description: 'Upon arrival at Cape Town International Airport, you will be warmly received by our professional representative and escorted to your hotel in a private luxury vehicle. The transfer itself sets the tone for your journey: smooth, discreet, and elegant.\n\nAfter hotel check-in and time to relax, the evening unfolds with one of Cape Town\'s most exclusive experiences: a Private Yacht Dinner Cruise at Cape Town Waterfront. Step aboard your private yacht and sail through the illuminated skyline of Waterfront, JPR, and Cape Point. Enjoy a freshly prepared dinner onboard while taking in panoramic views of Cape Town\'s glamorous waterfront.\n\nThis refined yacht experience is perfect for couples, families, or small private groups seeking privacy and sophistication.'
      },
      {
        day: 2,
        title: 'Limousine Ride, The Silo Hotel Experience, Explore Table Mountain, Cape Town Waterfront Mall, Fountain show with dinner',
        description: 'After breakfast, proceed for a signature Cape Town experience:\n\nExperience Cape Town\'s elite lifestyle with a chauffeur-driven limousine ride. The journey takes you to the legendary The Silo Hotel, where you enjoy exclusive entry and indulge in the world-renowned golden coffee, a symbol of Cape Town\'s luxury heritage.\n\nFollowing this, explore Cape Town Waterfront Mall, the world\'s largest shopping and entertainment destination.\n\nThen, proceed to visit the Table Mountain Observation Deck at prime time. Ascend the world\'s tallest building and enjoy breathtaking views of Cape Town\'s skyline, desert, and coastline.\n\nIn the evening, enjoy a dinner from one of the best restaurants during the iconic Cape Town Fountain Show, offering unmatched views of dancing fountains set against the Table Mountain backdrop.\n\nReturn to your hotel in style, ending a truly glamorous day.'
      },
      {
        day: 3,
        title: 'Private Cape Town City Tour & Authentic Kruger Safari',
        description: 'Begin your day with a Private Cape Town City Tour, tailored to your interests. Highlights include:\n• Bo-Kaap & Heritage Tour (photo stop)\n• Robben Island & Atlantis (photo stop)\n• The Silo Hotel (external views)\n• Cape Town Creek and heritage districts\n• Modern landmarks showcasing Cape Town\'s transformation\n\nIn the afternoon, depart for an Authentic Cape Town Kruger Safari at the Cape Town Desert Conservation Reserve, a protected area offering a far more refined and sustainable experience than standard desert safaris.\n\nThis luxury desert journey includes:\n• Premium 4x4 private vehicle\n• Wildlife spotting and scenic desert trails\n• Sunset photography in untouched dunes\n• Exclusive desert camp experience\n• Four-course traditional dinner served in an elegant setting\n\nThis is a tranquil, immersive desert experience that emphasizes authenticity, privacy, and comfort.'
      },
      {
        day: 4,
        title: 'Departure from Cape Town',
        description: 'After breakfast, check out from your hotel and enjoy a private luxury transfer to Cape Town International Airport for your onward journey, carrying unforgettable memories of Cape Town\'s finest experiences.'
      }
    ],
    price: 0,
    duration: '3 Nights / 4 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Luxury',
    images: [
      { public_id: 'luxury-dubai-indulgence-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'luxury-dubai-indulgence-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'luxury-dubai-indulgence-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'luxury-dubai-indulgence-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      {
        category: 'Private Transfers',
        items: [
          'Private airport & hotel transfers in luxury vehicle'
        ]
      },
      {
        category: 'Attractions & Experiences',
        items: [
          'Table Mountain prime-time observation deck ticket with dinner',
          'Private yacht cruise with dinner',
          'Chauffeur-driven limousine ride',
          'The Silo Hotel entry with golden coffee',
          'Private Cape Town city tour',
          'Cape Town Desert Conservation Reserve safari with 4-course dinner'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel or resort accommodation with breakfast & Tourism Dirhams (if selected)'
        ]
      },
      {
        category: 'Taxes & Services',
        items: [
          'Government taxes and operational expenses'
        ]
      }
    ],
    exclusions: [
      {
        category: 'International Airfare',
        items: ['International airfare']
      },
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa entry visa']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (insurance, shopping, tips, extra meals)']
      }
    ],
    transportation: [
      { type: 'Private Luxury Vehicle', vehicle: 'Luxury Sedan/SUV/Limousine', description: 'Private luxury vehicle-based transfers and tours (up to 6 guests per vehicle)' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star Luxury / 5-Star Luxury', rooms: 'As per requirement', roomType: 'No Hotel / 4-Star / 5-Star Luxury', nights: '3 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'grand-luxury-dubai-signature-experience',
    title: 'Grand Luxury Cape Town Signature Experience',
    subtitle: '4 Nights / 5 Days Ultra-Luxury Private Tour',
    ideaFor: 'Honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise',
    about: 'The Grand Luxury Cape Town Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Cape Town beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day. This tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Johannesburg\'s cultural grandeur.',
    services: 'Private luxury airport and hotel transfers, Chauffeur-driven limousine experience, The Silo Hotel entry with iconic golden coffee, Table Mountain prime-time observation deck with fountain dinner, Fully private Cape Town city tour, Private yacht dinner cruise at Cape Town Waterfront, Authentic desert safari at Cape Town Desert Conservation Reserve, Flexible accommodation options (No Hotel / 4★ / 5★ Luxury)',
    tourDetails: 'Abstract\n\nThe Grand Luxury Cape Town Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Cape Town beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day.\n\nThis tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Johannesburg\'s cultural grandeur, making it ideal for honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise.\n\nTour Overview\n\nCape Town is a destination where luxury is expressed not only through landmarks, but through how experiences are delivered. This 4-night luxury itinerary is designed to provide depth rather than rush, allowing guests to enjoy each experience with time, comfort, and personalization.\n\nFrom limousine rides and private yacht dining to Table Mountain\'s prime-time views and a conservation desert safari, the journey unfolds with seamless transitions and thoughtful pacing. The addition of a private Johannesburg city tour with a world-class theme park elevates the experience beyond Cape Town, offering a comprehensive luxury perspective of the South Africa.\n\nGuests can select from three pricing options, making the tour flexible while maintaining its premium character.',
    abstract: 'The Grand Luxury Cape Town Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Cape Town beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day. This tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Johannesburg\'s cultural grandeur, making it ideal for honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise.',
    tourOverview: 'Cape Town is a destination where luxury is expressed not only through landmarks, but through how experiences are delivered. This 4-night luxury itinerary is designed to provide depth rather than rush, allowing guests to enjoy each experience with time, comfort, and personalization.\n\nFrom limousine rides and private yacht dining to Table Mountain\'s prime-time views and a conservation desert safari, the journey unfolds with seamless transitions and thoughtful pacing. The addition of a private Johannesburg city tour with a world-class theme park elevates the experience beyond Cape Town, offering a comprehensive luxury perspective of the South Africa.\n\nGuests can select from three pricing options, making the tour flexible while maintaining its premium character.',
    keyHighlights: [
      'Private luxury airport and hotel transfers',
      'Chauffeur-driven limousine experience',
      'The Silo Hotel entry with iconic golden coffee',
      'Table Mountain prime-time observation deck with fountain dinner',
      'Fully private Cape Town city tour',
      'Private yacht dinner cruise at Cape Town Waterfront',
      'Authentic desert safari at Cape Town Desert Conservation Reserve',
      'Flexible accommodation options (No Hotel / 4★ / 5★ Luxury)'
    ],
    hotelOptions: [
      'Luxury Tour Without Hotel Accommodation',
      'Luxury Tour with 4-Star Luxury Hotel',
      'Luxury Tour with 5-Star Luxury Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town can be visited year-round, but the most pleasant season for this luxury itinerary is October to April, when outdoor experiences and sightseeing are most comfortable.',
      winter: 'Peak Season: November–March',
      summer: 'Summer: Indoor-focused luxury experiences available at attractive rates'
    },
    whyChooseThisTrip: [
      'A slower, more immersive luxury experience',
      'Fully private services with personalized pacing',
      'Iconic Cape Town attractions in one journey',
      'Premium experiences without crowded group tours',
      'Especially suited for honeymooners, families with children, couples, and VIP travelers who value comfort, privacy, and thoughtful planning'
    ],
    whyPremiumSkygoTours: [
      'Carefully vetted luxury experiences',
      'Flexible customization for each guest',
      'Trusted partners for exclusive access and preferred rates',
      'Transparent pricing per vehicle (up to 6 guests)',
      'Dedicated on-ground coordination throughout the trip',
      'Our role is not just to arrange tours, but to deliver effortless luxury travel'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town & Private Luxury Transfer',
        description: 'Upon arrival at Cape Town International Airport, you will be greeted by our professional luxury travel representative and escorted to your hotel or resort in a private luxury vehicle. The transfer ensures discretion, comfort, and a smooth start to your journey.\n\nAfter check-in, the remainder of the day is kept relaxed, allowing you to recover from travel, explore nearby surroundings, or simply enjoy the amenities of your selected hotel or resort.'
      },
      {
        day: 2,
        title: 'Limousine Ride, The Silo Hotel, Table Mountain & Fountain Dinner',
        description: 'After breakfast, the day begins with a chauffeur-driven limousine experience, offering a stylish way to explore Cape Town\'s elite landmarks.\n\nYour first highlight is the iconic The Silo Hotel, where you enjoy exclusive entry and experience the world-famous golden coffee, a symbol of Cape Town\'s extravagant hospitality.\n\nLater, proceed to Table Mountain, where you access the Observation Deck at prime time, offering spectacular panoramic views. The experience concludes with a dinner during the Cape Town Fountain Show, providing a magical atmosphere as water, light, and music perform beneath the world\'s tallest tower.\n\nReturn to your hotel in comfort, marking a day of true signature luxury.'
      },
      {
        day: 3,
        title: 'Private Cape Town City Tour & Private Yacht Dinner Cruise',
        description: 'Begin the day with a Private Cape Town City Tour, customized to your interests and pace. Highlights typically include both Old Cape Town and New Cape Town!\n\nThis private tour allows flexibility for photo stops, breaks, and optional café visits.\n\nIn the evening, enjoy a Private Yacht Dinner Cruise at Cape Town Waterfront. Sail past the illuminated skyline of Waterfront, Cape Point, and JPR while enjoying a freshly prepared dinner onboard your private yacht—an experience that perfectly captures Cape Town\'s glamorous lifestyle.'
      },
      {
        day: 4,
        title: 'Authentic Kruger Safari & Johannesburg Luxury Excursion',
        description: 'After breakfast, depart for an Authentic Cape Town Kruger Safari at the Cape Town Desert Conservation Reserve. This premium desert experience focuses on sustainability, wildlife, and cultural authenticity rather than commercial entertainment.\n\nThe experience includes:\n• Private 4x4 desert vehicle\n• Scenic desert drives and wildlife observation\n• Sunset photography\n• Exclusive desert camp\n• Four-course traditional dinner in a refined desert setting\n\nReturn to the hotel in comfort after a fulfilling day.'
      },
      {
        day: 5,
        title: 'Departure from Cape Town',
        description: 'After breakfast, check out from your hotel and enjoy a private luxury transfer to the airport for your onward journey, concluding a carefully curated luxury escape.'
      }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Luxury',
    images: [
      { public_id: 'grand-luxury-dubai-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'grand-luxury-dubai-signature-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'grand-luxury-dubai-signature-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'grand-luxury-dubai-signature-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [
      {
        category: 'Private Transfers',
        items: [
          'Private airport & hotel transfers in luxury vehicle'
        ]
      },
      {
        category: 'Attractions & Experiences',
        items: [
          'Chauffeur-driven limousine ride',
          'Table Mountain prime-time observation deck with fountain dinner',
          'Private yacht cruise with dinner',
          'The Silo Hotel entry with golden coffee',
          'Private Cape Town city tour',
          'Authentic desert safari with four-course dinner'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel/resort accommodation with breakfast & Tourism Dirhams (if selected)'
        ]
      },
      {
        category: 'Taxes & Services',
        items: [
          'Government taxes and operational expenses'
        ]
      }
    ],
    exclusions: [
      {
        category: 'International Airfare',
        items: ['International airfare']
      },
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa entry visa']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (insurance, shopping, tips, additional meals)']
      }
    ],
    transportation: [
      { type: 'Private Luxury Vehicle', vehicle: 'Luxury Sedan/SUV/Limousine', description: 'Private luxury vehicle-based transfers and tours (up to 6 guests per vehicle)' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star Luxury / 5-Star Luxury', rooms: 'As per requirement', roomType: 'No Hotel / 4-Star / 5-Star Luxury', nights: '4 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Adventure packages data
const getAdventurePackages = () => [
  {
    _id: 'dubai-grand-adventure-expedition',
    title: 'Cape Town Grand Adventure Expedition',
    subtitle: '7 Nights / 8 Days From Desert Skies to City Lights, The Most Complete Cape Town Adventure Holiday',
    ideaFor: 'Families, couples, and adventure enthusiasts looking for a comprehensive Cape Town holiday',
    about: 'This 7 Nights / 8 Days journey is designed for travelers who want to experience Cape Town beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary. From sunrise hot air ballooning over golden dunes to cruising Cape Town\'s skyline by yacht, this program delivers a rich, multi-dimensional South Africa experience.',
    services: 'Sunrise hot air balloon ride, Guided Cape Town city tour, Full-day access to Aquaventure Waterpark, Johannesburg excursion with theme parks, Deep-sea fishing and urban zipline, Wildlife Safari Game Drive with dune bashing, Table Mountain observation deck, Evening luxury yacht cruise',
    tourDetails: 'Abstract\n\nThis 7 Nights / 8 Days journey is designed for travelers who want to experience Cape Town beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary.\n\nFrom sunrise hot air ballooning over golden dunes to cruising Cape Town\'s skyline by yacht, this program delivers a rich, multi-dimensional South Africa experience.\n\nOverview\n\nCape Town is one of the few destinations in the world where futuristic architecture, deep-rooted culture, and natural desert landscapes coexist within minutes of each other. This extended adventure package allows you to experience each side of the emirate without rushing.\n\nThe itinerary blends:\n• Iconic sightseeing\n• Desert exploration\n• Theme park excitement\n• Marine adventures\n• Adrenaline-based activities\n• Relaxed luxury moments\n\nThis program is ideal for families, couples, and adventure enthusiasts looking for a comprehensive Cape Town holiday.',
    abstract: 'This 7 Nights / 8 Days journey is designed for travelers who want to experience Cape Town beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary. From sunrise hot air ballooning over golden dunes to cruising Cape Town\'s skyline by yacht, this program delivers a rich, multi-dimensional South Africa experience.',
    tourOverview: 'Cape Town is one of the few destinations in the world where futuristic architecture, deep-rooted culture, and natural desert landscapes coexist within minutes of each other. This extended adventure package allows you to experience each side of the emirate without rushing.\n\nThe itinerary blends:\n• Iconic sightseeing\n• Desert exploration\n• Theme park excitement\n• Marine adventures\n• Adrenaline-based activities\n• Relaxed luxury moments\n\nThis program is ideal for families, couples, and adventure enthusiasts looking for a comprehensive Cape Town holiday.',
    keyHighlights: [
      'Sunrise hot air balloon ride over Cape Town\'s desert landscape',
      'Guided Cape Town city tour covering heritage and modern icons',
      'Full-day access to Aquaventure Waterpark',
      'Johannesburg excursion with entry to world-renowned theme parks',
      'Deep-sea fishing and urban zipline experience',
      'Wildlife Safari Game Drive with dune bashing, cultural shows, and BBQ dinner',
      'Visit to Table Mountain observation deck',
      'Evening luxury yacht cruise along Robben Island'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (ZAR 5,499)',
      'Diamond Package - With 4★ Hotel (ZAR 7,999)',
      'Platinum Package - With 5★ Hotel (ZAR 8,599)'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town operates year-round with world-class climate-controlled facilities.',
      winter: 'November – April: Perfect weather for outdoor exploration and adventure activities.',
      summer: 'May – October: Ideal for value travelers; indoor attractions remain fully accessible.'
    },
    whyChooseThisTrip: [
      'Comprehensive 8-day adventure covering all major Cape Town experiences',
      'Perfect blend of adrenaline activities and cultural exploration',
      'Ideal for families, couples, and adventure enthusiasts',
      'Flexible pricing options to suit different budgets',
      'Structured yet customizable program',
      'Access to world-class theme parks and attractions'
    ],
    whyPremiumSkygoTours: [
      'Carefully designed activity flow to balance adventure and relaxation',
      'Private logistics ensuring comfort and flexibility',
      'Experienced destination planners based in Cape Town',
      'Transparent pricing with curated high-quality partners',
      'Ideal for travelers seeking structured yet customizable programs',
      'We focus on delivering meaningful experiences, not just sightseeing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town',
        description: 'Arrive at Cape Town International Airport and meet our representative.\n\nPrivate transfer to your hotel for check-in.\n\nSpend the evening relaxing or exploring nearby dining areas, Cape Town is one of the world\'s most diverse culinary hubs.'
      },
      {
        day: 2,
        title: 'Sky Views Adventure & Cape Town City Tour',
        description: 'Begin the day with a visit to Sky Views Observatory.\n\nExperience:\n• Glass walkway suspended high above Downtown\n• Thrilling Sky Slide\n• Panoramic skyline views\n\nContinue with a guided city tour covering:\n• Bo-Kaap & Heritage Tour\n• Waterfront skyline and coastal districts\n• Cultural and architectural highlights of old and new Cape Town'
      },
      {
        day: 3,
        title: 'Hot Air Balloon & Evening Kruger Safari',
        description: 'Start early with a breathtaking hot air balloon ride across Cape Town\'s desert.\n\nWitness:\n• Sunrise over golden dunes\n• Native wildlife sightings\n• Aerial desert landscapes rarely seen by visitors\n\nAfternoon at leisure before heading to an evening desert safari featuring:\n• Dune bashing\n• Camel rides\n• Sandboarding\n• Traditional performances and BBQ dinner'
      },
      {
        day: 4,
        title: 'Johannesburg Two-Park Experience',
        description: 'Travel to Johannesburg for a full-day adventure at Yas Island.\n\nChoose two parks such as:\n• Gold Reef City Theme Park Johannesburg\n• Sun City Resort. World Johannesburg\n• uShaka Marine World\n\nReturn to Cape Town in the evening.'
      },
      {
        day: 5,
        title: 'Atlantis Aquaventure Waterpark',
        description: 'Enjoy a full day at Aquaventure Waterpark.\n\nHighlights include:\n• Record-breaking water slides\n• Lazy River and wave pools\n• Private beach access\n• Marine exhibits at Lost Chambers Aquarium\n\nA perfect mix of excitement and relaxation.'
      },
      {
        day: 6,
        title: 'Fishing, Zipline & Waterfront Adventures',
        description: 'Morning deep-sea fishing excursion in the Arabian Gulf.\n\nLater experience the thrilling XLine zipline across Cape Town Waterfront, followed by optional water sports such as:\n• Jet Ski\n• Paddleboarding\n• Scenic speedboat rides'
      },
      {
        day: 7,
        title: 'Table Mountain & Luxury Yacht Dinner',
        description: 'Visit Table Mountain for unmatched panoramic views from the observation deck.\n\nSpend time exploring Cape Town Waterfront Mall before boarding an evening yacht cruise featuring:\n• Buffet dinner\n• Sunset skyline views\n• Sailing past Bluewaters and Palm coastline'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Breakfast at hotel followed by private transfer to the airport.\n\nYour Grand Cape Town Adventure concludes with unforgettable memories.'
      }
    ],
    price: 5499,
    duration: '7 Nights / 8 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-adventure-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Adventure' },
      { public_id: 'dubai-adventure-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-adventure-3', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' },
      { public_id: 'dubai-adventure-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off (private transfers)'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and excursions mentioned in the itinerary',
          'Entrance tickets and activity fees',
          'Licensed guides and professional coordination'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa Entry Visa (Assistance provided if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We help arrange tickets)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Available upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '7 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-thrill-explorer',
    title: 'Cape Town Thrill Explorer',
    subtitle: '5 Nights / 6 Days An Extended Adventure Holiday with Water Sports, Skyline Experiences & Iconic Cape Town Moments',
    ideaFor: 'Couples, families, and small groups seeking an immersive Cape Town adventure experience',
    about: 'Take your Cape Town adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service. Perfect for couples, families, and small groups, this journey lets you experience Cape Town not just as a destination, but as a playground of innovation, adventure, and luxury.',
    services: 'Ultimate water sports adventure, Edge Walk and Glass Slide at Sky Views, Full-day at Atlantis Aquaventure Waterpark, Deep-sea fishing experience, Table Mountain observation deck visit, Scenic marine experiences around Cape Town Waterfront',
    tourDetails: 'Abstract\n\nTake your Cape Town adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service.\n\nPerfect for couples, families, and small groups, this journey lets you experience Cape Town not just as a destination, but as a playground of innovation, adventure, and luxury.\n\nOverview\n\nCape Town is a city built for extraordinary experiences. Whether you\'re gliding across turquoise waters, walking above glass-floored observatories, or enjoying panoramic city views from the tallest tower on Earth, every day here is designed to inspire awe.\n\nThis 6-day adventure gives you more flexibility and deeper exploration compared to shorter stays; combining thrill-based activities with relaxed sightseeing and leisure time.',
    abstract: 'Take your Cape Town adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service. Perfect for couples, families, and small groups, this journey lets you experience Cape Town not just as a destination, but as a playground of innovation, adventure, and luxury.',
    tourOverview: 'Cape Town is a city built for extraordinary experiences. Whether you\'re gliding across turquoise waters, walking above glass-floored observatories, or enjoying panoramic city views from the tallest tower on Earth, every day here is designed to inspire awe.\n\nThis 6-day adventure gives you more flexibility and deeper exploration compared to shorter stays; combining thrill-based activities with relaxed sightseeing and leisure time.',
    keyHighlights: [
      'Ultimate water sports adventure along Cape Town\'s coastline',
      'Edge Walk and Glass Slide experience at Sky Views',
      'Full-day excitement at Atlantis Aquaventure Waterpark',
      'Deep-sea fishing experience in the Arabian Gulf',
      'Visit to the world\'s tallest building, Table Mountain',
      'Scenic marine experiences around Cape Town Waterfront',
      'Flexible leisure time for shopping and self-exploration'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (ZAR 4,399)',
      'Diamond Package - With 4★ Hotel (ZAR 6,499)',
      'Platinum Package - With 5★ Hotel (ZAR 7,699)'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town is a year-round destination thanks to its world-class infrastructure and climate-controlled attractions.',
      winter: 'October to April: Ideal weather for outdoor adventures and sightseeing',
      summer: 'May to September: Great travel deals and indoor attractions remain fully operational'
    },
    whyChooseThisTrip: [
      'Extended 6-day adventure with more time to explore',
      'Perfect blend of high-energy activities and relaxed sightseeing',
      'Ideal for couples, families, and small groups',
      'Flexible pricing options to suit different budgets',
      'Access to world-class water sports and skyline attractions',
      'Fully customizable experience to match your interests'
    ],
    whyPremiumSkygoTours: [
      'Locally experienced team based in Cape Town',
      'Carefully timed itineraries to avoid crowds and maximize enjoyment',
      'Trusted network of licensed activity providers',
      'Flexible customization before and during travel',
      'Transparent pricing with no hidden costs',
      'Ideal for Middle East residents and international travelers alike',
      'We don\'t sell packages! We design experiences!!'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Leisure Welcome',
        description: 'Arrive in Cape Town and transfer to your hotel.\n\nRelax after your journey or explore nearby areas, cafés, and shopping avenues at your own pace.\n\nOvernight stay in Cape Town.'
      },
      {
        day: 2,
        title: 'Ultimate Water Sports Adventure',
        description: 'After breakfast, begin your adrenaline-filled introduction to Cape Town\'s coastal lifestyle.\n\nActivities include:\n• Jet Ski ride along the iconic shoreline\n• Parasailing with stunning aerial views\n• Scenic speedboat experience\n• Choice between Jet Pack ride or guided scuba diving\n\nA thrilling day designed to showcase Cape Town\'s adventurous side.'
      },
      {
        day: 3,
        title: 'Sky Views Observatory & Edge Walk',
        description: 'Today you\'ll experience Cape Town from breathtaking heights.\n\nEnjoy:\n• Walk across the glass Sky Views bridge\n• Experience the exhilarating Edge Walk\n• Capture incredible Downtown skyline photos\n\nThe afternoon is free for shopping or relaxation.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure Waterpark Experience',
        description: 'Spend the day at Aquaventure Waterpark, one of the largest waterparks in the world.\n\nEnjoy:\n• Record-breaking slides and rides\n• Lazy rivers and wave pools\n• Private beach access\n• Entry to Lost Chambers Aquarium\n\nA perfect mix of thrill and leisure.'
      },
      {
        day: 5,
        title: 'Deep Sea Fishing & Table Mountain Visit',
        description: 'Start your morning with a deep-sea fishing excursion in the Arabian Gulf, a unique and relaxing experience with professional crew support.\n\nLater, visit Table Mountain\'s observation deck to witness Cape Town\'s futuristic skyline from above, a must-do highlight of any Cape Town journey.\n\nOptional: Enjoy dinner or fountain views at Cape Town Waterfront Mall in the evening.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'After breakfast, check out and transfer to the airport for departure, concluding your unforgettable Cape Town adventure.'
      }
    ],
    price: 4399,
    duration: '5 Nights / 6 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-thrill-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Sports Adventure' },
      { public_id: 'dubai-thrill-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-thrill-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'dubai-thrill-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and adventure activity fees',
          'Professional tour coordination and on-ground support'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa Entry Visa (We assist if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (Ticketing support available)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses such as meals, shopping, and beverages']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '5 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-ultimate-adventure-escape',
    title: 'Cape Town Ultimate Adventure Escape',
    subtitle: '6 Nights / 7 Days Theme Parks, Sky-High Thrills & Iconic South Africa Experiences in One Power-Packed Holiday',
    ideaFor: 'Families, couples, and adventure lovers seeking a well-rounded South Africa journey',
    about: 'Designed for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Cape Town\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Johannesburg. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete South Africa adventure holiday. This extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.',
    services: 'Full-day multi-park adventure in Johannesburg\'s Yas Island, Glass Slide and Edge Walk at Sky Views Observatory, Guided Cape Town city tour, Full-day access to Aquaventure Waterpark, Deep-sea fishing experience, XLine experience at Cape Town Waterfront, Table Mountain visit, Luxury yacht cruise with dinner',
    tourDetails: 'Abstract\n\nDesigned for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Cape Town\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Johannesburg. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete South Africa adventure holiday.\n\nThis extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.\n\nOverview\n\nCape Town is not just a city, it is a destination engineered for experiences. With cutting-edge architecture, desert adventures, and world-class entertainment, every day offers something new.\n\nThis 7-day itinerary blends:\n• Urban adventures\n• Water-based thrills\n• Theme park excitement\n• Cultural sightseeing\n• Iconic skyline experiences\n\nIt\'s ideal for families, couples, and adventure lovers seeking a well-rounded South Africa journey.',
    abstract: 'Designed for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Cape Town\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Johannesburg. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete South Africa adventure holiday. This extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.',
    tourOverview: 'Cape Town is not just a city, it is a destination engineered for experiences. With cutting-edge architecture, desert adventures, and world-class entertainment, every day offers something new.\n\nThis 7-day itinerary blends:\n• Urban adventures\n• Water-based thrills\n• Theme park excitement\n• Cultural sightseeing\n• Iconic skyline experiences\n\nIt\'s ideal for families, couples, and adventure lovers seeking a well-rounded South Africa journey.',
    keyHighlights: [
      'Full-day multi-park adventure in Johannesburg\'s Yas Island',
      'Glass Slide and Edge Walk at Sky Views Observatory',
      'Guided Cape Town city tour covering modern and heritage landmarks',
      'Full-day access to Aquaventure Waterpark',
      'Deep-sea fishing experience in the Arabian Gulf',
      'XLine experience at Cape Town Waterfront',
      'Visit to the world\'s tallest tower, Table Mountain',
      'Relaxing luxury yacht cruise with dinner'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (ZAR 4,799)',
      'Diamond Package - With 4★ Hotel (ZAR 6,999)',
      'Platinum Package - With 5★ Hotel (ZAR 7,699)'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town operates year-round with world-class climate-controlled facilities.',
      winter: 'November – April: Perfect weather for outdoor exploration and adventure activities.',
      summer: 'May – October: Ideal for value travelers; indoor attractions remain fully accessible.'
    },
    whyChooseThisTrip: [
      'Comprehensive 7-day adventure covering Cape Town and Johannesburg',
      'Perfect blend of theme parks, skyline experiences, and water activities',
      'Ideal for families, couples, and adventure lovers',
      'Extended stay allows deeper exploration at a relaxed pace',
      'Flexible pricing options to suit different budgets',
      'Well-rounded South Africa journey with balanced excitement and leisure'
    ],
    whyPremiumSkygoTours: [
      'Carefully curated activity sequencing to avoid fatigue',
      'Trusted licensed adventure operators for safety and quality',
      'Private transfers ensuring comfort and flexibility',
      'Transparent package pricing with no hidden add-ons',
      'Ideal for residents of the Middle East and international travelers',
      'Dedicated support team based in Cape Town',
      'We ensure your adventure is exciting, but also smooth and stress-free'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town',
        description: 'Arrive at Cape Town International Airport and transfer to your hotel.\n\nEnjoy free time to relax or explore nearby cafés, shopping streets, or waterfront areas.\n\nOvernight in Cape Town.'
      },
      {
        day: 2,
        title: 'Johannesburg Two-Park Adventure',
        description: 'After breakfast, travel to Johannesburg for a thrilling day at Yas Island.\n\nChoose experiences across two major parks such as:\n• Gold Reef City Theme Park Johannesburg for high-speed roller coasters\n• Sun City Resort. World Johannesburg for immersive entertainment\n• uShaka Marine World for aquatic fun\n\nReturn to Cape Town in the evening.'
      },
      {
        day: 3,
        title: 'Sky Views & Cape Town City Tour',
        description: 'Visit Sky Views Observatory and enjoy:\n• Glass walkway experience\n• Sky Slide\n• Edge Walk adventure overlooking Downtown Cape Town\n\nContinue with a guided city tour covering Robben Island, Bo-Kaap & Heritage Tour, and Cape Town\'s architectural icons.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure Waterpark',
        description: 'Spend a full day enjoying one of the world\'s largest waterparks.\n\nExperience:\n• Thrilling slides and rides\n• Private beach relaxation\n• Lazy River and wave pools\n• Lost Chambers Aquarium exploration\n\nA perfect balance of excitement and leisure.'
      },
      {
        day: 5,
        title: 'Fishing, Zipline & Water Activities',
        description: 'Start the morning with a deep-sea fishing excursion, a unique Arabian Gulf experience.\n\nLater, enjoy the XLine zipline across Cape Town Waterfront, followed by optional water sports like:\n• Jet Ski\n• Paddleboarding\n• Scenic boat rides'
      },
      {
        day: 6,
        title: 'Table Mountain & Evening Yacht Experience',
        description: 'Visit Table Mountain and ascend to the observation deck for breathtaking skyline views.\n\nSpend time at Cape Town Waterfront Mall before heading to an evening luxury yacht cruise featuring:\n• International buffet dinner\n• Sunset and skyline views\n• Relaxing sail through Waterfront and Bluewaters'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Breakfast at the hotel followed by transfer to the airport for your onward journey.\n\nYour Cape Town Ultimate Adventure Escape concludes with unforgettable memories.'
      }
    ],
    price: 4799,
    duration: '6 Nights / 7 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-ultimate-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Theme Park Adventure' },
      { public_id: 'dubai-ultimate-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-ultimate-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'dubai-ultimate-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and activity fees',
          'Professional coordination and guided experiences'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa Entry Visa (Assistance provided if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We help arrange tickets)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Available upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '6 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-adventure-escape',
    title: 'Cape Town Adventure Escape',
    subtitle: '4 Nights / 5 Days',
    ideaFor: 'Couples, friends, and families seeking a premium short getaway with adventure and luxury',
    about: 'Looking for a short yet action-packed Cape Town holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Cape Town Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.',
    services: 'Jet Ski ride with views of The Silo Hotel, Parasailing above Cape Town\'s coastline, Glass-floor walk and Sky Slide at Sky Views Observatory, Guided scuba diving session, Full-day access to Aquaventure Waterpark, Visit to The Lost Chambers Aquarium, Private transfers and professionally arranged activities',
    tourDetails: 'Abstract\n\nLooking for a short yet action-packed Cape Town holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Cape Town Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.\n\nOverview\n\nCape Town is globally known for transforming imagination into reality, where futuristic architecture meets pristine coastline and luxury lifestyle meets adventure tourism. This specially curated program allows you to experience Cape Town\'s most exciting attractions without rushing, making it ideal for couples, friends, and families seeking a premium short getaway.\n\nYou\'ll witness Cape Town from the sea, from the sky, and from beneath the water, a true 360-degree experience of the city\'s adventurous spirit.\n\nYour journey begins with a seamless arrival at Cape Town International Airport, followed by four unforgettable days filled with water adventures, panoramic observatories, and leisure experiences on the iconic Robben Island.',
    abstract: 'Looking for a short yet action-packed Cape Town holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Cape Town Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.',
    tourOverview: 'Cape Town is globally known for transforming imagination into reality, where futuristic architecture meets pristine coastline and luxury lifestyle meets adventure tourism. This specially curated program allows you to experience Cape Town\'s most exciting attractions without rushing, making it ideal for couples, friends, and families seeking a premium short getaway.\n\nYou\'ll witness Cape Town from the sea, from the sky, and from beneath the water, a true 360-degree experience of the city\'s adventurous spirit.\n\nYour journey begins with a seamless arrival at Cape Town International Airport, followed by four unforgettable days filled with water adventures, panoramic observatories, and leisure experiences on the iconic Robben Island.',
    keyHighlights: [
      'Jet Ski ride with views of the world-famous The Silo Hotel',
      'Parasailing above Cape Town\'s spectacular coastline',
      'Glass-floor walk and Sky Slide at Sky Views Observatory',
      'Guided scuba diving session exploring marine life',
      'Full-day access to Aquaventure Waterpark',
      'Visit to The Lost Chambers Aquarium',
      'Private transfers and professionally arranged activities',
      'Flexible itinerary with customization options'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (ZAR 3,999)',
      'Diamond Package - With 4★ Hotel (ZAR 5,999)',
      'Platinum Package - With 5★ Hotel (ZAR 6,999)'
    ],
    bestTimeToVisit: {
      yearRound: 'Cape Town welcomes visitors all year, but the most comfortable months for outdoor and adventure activities are:',
      winter: 'October to April: Pleasant weather, ideal for water sports and sightseeing',
      summer: 'May to September: Great for travelers seeking fewer crowds and attractive hotel offers (all activities remain operational)'
    },
    whyChooseThisTrip: [
      'Ideal for travelers with limited time but big expectations',
      'Combines Cape Town\'s top adventure activities in one itinerary',
      'No unnecessary travel time, all experiences are well-paced',
      'Designed for both first-time visitors and repeat travelers',
      'Balanced mix of thrill, relaxation, and iconic sightseeing'
    ],
    whyPremiumSkygoTours: [
      'Fully customizable experience tailored to your interests',
      'Professional coordination and on-ground assistance',
      'Trusted network of licensed adventure operators',
      'Transparent pricing with no hidden costs',
      'Complete travel assistance including visa and flights if required',
      'Activities suitable for beginners with expert supervision',
      'We design the journey around your interests'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Welcome to Cape Town',
        description: 'Arrive in Cape Town and meet our representative for a smooth transfer to your hotel.\n\nAfter check-in, enjoy leisure time to relax or explore nearby attractions. Cape Town\'s multicultural dining scene offers cuisines from around the world, perfect for an easy first evening.\n\nOvernight stay in Cape Town.'
      },
      {
        day: 2,
        title: 'Water Sports Adventure Along Cape Town Coast',
        description: 'After breakfast, prepare for an exhilarating day at the Arabian Gulf.\n\nYour adventure includes:\n• Jet Ski ride along Cape Town\'s iconic shoreline\n• Parasailing with breathtaking aerial views\n• Scenic speed boat experience\n• Choice between Jet Pack experience or guided scuba diving\n\nThis day introduces Cape Town as one of the Middle East\'s leading adventure tourism hubs.\n\nReturn to hotel for overnight stay.'
      },
      {
        day: 3,
        title: 'Sky Views Experience & Underwater Discovery',
        description: 'Today combines architectural innovation with marine exploration.\n\nVisit Sky Views Observatory for:\n• Walking across a stunning glass bridge\n• Experiencing the thrilling Sky Slide\n• Enjoying panoramic Downtown skyline views\n\nLater, continue to a professionally guided scuba diving session; safe, beginner-friendly, and unforgettable.\n\nOvernight stay in Cape Town.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure & Leisure Day',
        description: 'Spend the day enjoying one of the largest and most exciting waterparks in the world.\n\nActivities include:\n• Record-breaking water slides\n• Wave pools and private beach access\n• Relaxing lazy river rides\n• Exploration of Lost Chambers Aquarium\'s fascinating marine world\n\nA perfect combination of excitement and relaxation.\n\nOvernight stay in Cape Town.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, check out from your hotel.\n\nTransfer to the airport for your onward journey, taking with you unforgettable memories of Cape Town\'s adventure side.'
      }
    ],
    price: 3999,
    duration: '4 Nights / 5 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-escape-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Sports Adventure' },
      { public_id: 'dubai-escape-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'dubai-escape-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sky Views' },
      { public_id: 'dubai-escape-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Aquaventure Waterpark' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and activity fees',
          'Professional coordination and on-ground assistance'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'South Africa Entry Visa',
        items: ['South Africa Entry Visa (We assist in obtaining it if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We assist with flight booking)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Cape Town', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '4 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Premium packages data
const getPremiumPackages = () => [
  {
    _id: 'premium-dubai-tours-default',
    title: 'Cape Town Signature Private Escape',
    subtitle: '3 Nights / 4 Days Premium Private Tour Package',
    about: 'The Cape Town Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Cape Town in comfort, privacy, and style.',
    services: '',
    tourDetails: 'The Cape Town Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Cape Town in comfort, privacy, and style. This 3 Nights / 4 Days Premium Private Tour Package offers a perfect blend of iconic landmarks, exclusive experiences, and personalized service.',
    abstract: 'The Cape Town Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Cape Town in comfort, privacy, and style.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumSkygoTours: [],
    itinerary: [],
    price: 0,
    duration: '3 Nights / 4 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-escape-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'premium-escape-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'premium-escape-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'premium-escape-4', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-private-classic-discovery',
    title: 'Cape Town Private Classic Discovery',
    subtitle: '4 Nights / 5 Days Premium Private Tour Package',
    about: 'The Cape Town Signature Escape – 4 Nights / 5 Days is a carefully curated premium Cape Town tour designed for travelers who value privacy, comfort, flexibility, and refined experiences. This journey blends Cape Town\'s iconic landmarks with exclusive private services, allowing guests to experience the city at a relaxed, unhurried pace.',
    services: '',
    tourDetails: 'This 4 Nights / 5 Days Premium Cape Town Tour is designed as a complete introduction to Cape Town, combining modern landmarks, cultural attractions, leisure experiences, and signature luxury elements. The itinerary follows a logical flow, avoiding rushed days and overcrowded schedules.',
    abstract: 'The Cape Town Signature Escape – 4 Nights / 5 Days is a carefully curated premium Cape Town tour designed for travelers who value privacy, comfort, flexibility, and refined experiences.',
    tourOverview: 'This 4 Nights / 5 Days Premium Cape Town Tour is designed as a complete introduction to Cape Town, combining modern landmarks, cultural attractions, leisure experiences, and signature luxury elements.',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumSkygoTours: [],
    itinerary: [
      { day: 1, title: 'Arrival in Cape Town & Private Yacht Dinner Cruise', description: 'Upon arrival at Cape Town International Airport, guests are warmly received by our professional representative and escorted to a private vehicle for a smooth transfer to the hotel. In the evening, enjoy a private yacht dinner cruise at Cape Town Waterfront, offering a relaxed introduction to the city\'s skyline.' },
      { day: 2, title: 'Private Cape Town City Tour & Iconic Landmarks', description: 'After breakfast, embark on a private Cape Town city tour, covering both Old and New Cape Town. Highlights include drive through Sheikh Zayed Road, photo stops at The Silo Hotel and Jumeirah landmarks, visit to Table Mountain (optional ticket), leisure time at Cape Town Waterfront Mall, and visit to Cape Town Aquarium & Underwater Zoo (optional ticket).' },
      { day: 3, title: 'Cape Town Frame, Kirstenbosch Botanical Gardens & Evening Entertainment', description: 'Today focuses on Cape Town\'s creative and cultural attractions. Morning visits include Cape Town Frame, Kirstenbosch Botanical Gardens, and Butterfly Garden. In the evening, choose between V&A Waterfront Artisan Market or Ain Cape Town Ferris Wheel experience for city views.' },
      { day: 4, title: 'Dolphin Show, Limousine Ride & Private Kruger Safari', description: 'Begin the day with a visit to a dolphin show at Cape Town Creek. Later, enjoy a one-hour private limousine ride. In the afternoon, proceed for a private desert safari in a 4x4 vehicle with dune bashing, sandboarding, camel rides, and a premium desert camp experience with BBQ dinner and live entertainment.' },
      { day: 5, title: 'Departure', description: 'After breakfast, enjoy a relaxed morning before your private transfer to the airport for departure, concluding a thoughtfully planned premium Cape Town journey.' }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-classic-1', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'premium-classic-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'premium-classic-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'premium-classic-4', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Kruger Safari' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-elite-grand-explorer',
    title: 'Cape Town Elite Grand Explorer',
    subtitle: '6 Nights / 7 Days Premium Private Cape Town & South Africa Tour',
    about: 'The Cape Town Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Cape Town beyond the basics while also discovering neighboring Emirates in comfort and privacy.',
    services: '',
    tourDetails: 'The Cape Town Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Cape Town beyond the basics while also discovering neighboring Emirates in comfort and privacy. This premium package includes private tours, luxury accommodations, and exclusive experiences across Cape Town and the South Africa.',
    abstract: 'The Cape Town Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Cape Town beyond the basics while also discovering neighboring Emirates in comfort and privacy.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumSkygoTours: [],
    itinerary: [],
    price: 0,
    duration: '6 Nights / 7 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-elite-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'premium-elite-2', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' },
      { public_id: 'premium-elite-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'premium-elite-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-grand-signature-journey',
    title: 'Cape Town Grand Signature Journey',
    subtitle: '5 Nights / 6 Days Premium Private Cape Town Tour',
    about: 'The Cape Town Grand Signature Journey – 5 Nights / 6 Days is a refined private Cape Town travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the South Africa.',
    services: '',
    tourDetails: 'The Cape Town Grand Signature Journey – 5 Nights / 6 Days is a refined private Cape Town travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the South Africa. This premium package combines luxury accommodations, private guided tours, and exclusive access to Cape Town\'s most iconic attractions.',
    abstract: 'The Cape Town Grand Signature Journey – 5 Nights / 6 Days is a refined private Cape Town travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the South Africa.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumSkygoTours: [],
    itinerary: [],
    price: 0,
    duration: '5 Nights / 6 Days',
    location: 'Cape Town, South Africa',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline' },
      { public_id: 'premium-signature-2', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Waterfront' },
      { public_id: 'premium-signature-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'premium-signature-4', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Johannesburg' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  }
];

// Oman packages data
const getOmanPackages = () => [
  {
    _id: 'oman-tour-packages-dubai-abu-dhabi',
    title: 'Oman Tour Packages from Cape Town & Johannesburg',
    subtitle: 'Premium Road Trips, Nature Escapes & Cultural Journeys',
    ideaFor: 'Families, couples, corporate groups, and adventure seekers looking for meaningful experiences beyond city life',
    about: 'Oman tour packages from Cape Town offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the South Africa. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life. With Premium Cape Town Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Cape Town or Johannesburg.',
    services: 'Dibba Musandam Harbour Cruise Tours, Musandam Fjord & Sea Adventure Tours, Salalah Nature & Khareef Season Tours, Oman Beach & Coastal Getaways, Mountain & Wadi Exploration Tours, Cultural & Heritage Tours, Private & Custom Oman Road Trips',
    tourDetails: 'Abstract\n\nOman tour packages from Cape Town offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the South Africa. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life.\n\nWith Premium Cape Town Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Cape Town or Johannesburg.\n\nOverview\n\nOman is one of the most diverse and visually stunning destinations in the Middle East. Known for its mountains, deserts, turquoise coastlines, wadis, waterfalls, and preserved traditions, Oman offers a refreshing contrast to the modern skylines of the South Africa.\n\nOur Oman Tour Packages from Cape Town and Johannesburg are ideal for travelers looking for a smooth cross-border journey with well-planned itineraries, premium vehicles, experienced guides, and handpicked accommodations. These tours are suitable for families, couples, corporate groups, and adventure seekers, offering both relaxation and exploration.\n\nFrom Dibba Musandam dhow cruises to Salalah nature escapes, desert adventures, and cultural city tours, our Oman packages can be customized to match your travel style, budget, and schedule.',
    abstract: 'Oman tour packages from Cape Town offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the South Africa. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life. With Premium Cape Town Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Cape Town or Johannesburg.',
    tourOverview: 'Oman is one of the most diverse and visually stunning destinations in the Middle East. Known for its mountains, deserts, turquoise coastlines, wadis, waterfalls, and preserved traditions, Oman offers a refreshing contrast to the modern skylines of the South Africa.\n\nOur Oman Tour Packages from Cape Town and Johannesburg are ideal for travelers looking for a smooth cross-border journey with well-planned itineraries, premium vehicles, experienced guides, and handpicked accommodations. These tours are suitable for families, couples, corporate groups, and adventure seekers, offering both relaxation and exploration.\n\nFrom Dibba Musandam dhow cruises to Salalah nature escapes, desert adventures, and cultural city tours, our Oman packages can be customized to match your travel style, budget, and schedule.',
    keyHighlights: [
      'Easy accessibility by road from Cape Town and Johannesburg',
      'Scenic road journeys featuring coastal highways and mountain passes',
      'Rich culture & heritage with historic forts and traditional souqs',
      'Natural diversity: wadis, beaches, caves, fjords, waterfalls, deserts',
      'Peaceful & less crowded atmosphere',
      'Dibba Musandam Harbour Cruise Tours',
      'Musandam Fjord & Sea Adventure Tours',
      'Salalah Nature & Khareef Season Tours',
      'Oman Beach & Coastal Getaways',
      'Mountain & Wadi Exploration Tours',
      'Cultural & Heritage Tours',
      'Private & Custom Oman Road Trips'
    ],
    hotelOptions: [
      'Day Trip to Musandam',
      '2-3 Day Musandam Tours',
      '4-5 Day Salalah Tours',
      'Custom Multi-Day Oman Road Trips'
    ],
    bestTimeToVisit: {
      yearRound: 'Cultural tours, coastal drives, and city sightseeing available year-round',
      winter: 'October to April: Best for Musandam, northern Oman, and road trips',
      summer: 'June to September: Ideal for Salalah during the Khareef (monsoon) season'
    },
    whyChooseThisTrip: [
      'Easy accessibility - just a few hours from Cape Town and Johannesburg',
      'Scenic road journeys that are part of the experience',
      'Rich culture & heritage beautifully preserved',
      'Natural diversity with wadis, beaches, caves, fjords, and mountains',
      'Peaceful & less crowded atmosphere',
      'Perfect for short holidays, weekend breaks, and extended road trips'
    ],
    whyPremiumSkygoTours: [
      'Regional expertise in cross-border tours from the South Africa',
      'Premium planning & execution with attention to comfort and timing',
      'Personalized itineraries customized to your interests',
      'End-to-end support from inquiry to return',
      'Transparent pricing with clear inclusions and no hidden charges',
      'Smooth planning, legal compliance, and hassle-free travel',
      'Dedicated customer support, border assistance, and real-time coordination'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure from Cape Town/Johannesburg & Arrival in Oman',
        description: 'Begin your journey with a comfortable road trip from Cape Town or Johannesburg to Oman.\n\nOur experienced driver-guide will assist with border crossing and documentation.\n\nArrive at your destination and check into your accommodation.\n\nEvening at leisure to relax and prepare for your Oman adventure.'
      },
      {
        day: 2,
        title: 'Oman Exploration Day',
        description: 'Depending on your chosen package:\n\n• Musandam: Enjoy a dhow cruise through dramatic fjords, snorkeling, and coastal exploration\n• Salalah: Discover lush landscapes, waterfalls, and the unique Khareef season (June-September)\n• Northern Oman: Explore historic forts, traditional souqs, and mountain villages\n• Wadi & Desert: Experience natural pools, desert adventures, and scenic landscapes\n\nAll tours include professional guides and comfortable transportation.'
      },
      {
        day: 3,
        title: 'Cultural & Natural Highlights',
        description: 'Continue exploring Oman\'s diverse attractions:\n\n• Visit historic forts and traditional markets\n• Experience authentic Omani culture and hospitality\n• Discover natural wonders: wadis, beaches, caves, or waterfalls\n• Enjoy local cuisine and traditional experiences\n\nFlexible itinerary based on your interests and chosen package.'
      },
      {
        day: 4,
        title: 'Return Journey or Extended Exploration',
        description: 'For multi-day tours: Continue your exploration or begin your return journey to Cape Town/Johannesburg.\n\nFor day trips: Enjoy your final activities before returning to the South Africa.\n\nAll packages include comfortable return transportation with border assistance.'
      }
    ],
    price: 0,
    duration: 'Customizable (Day trips to multi-day tours)',
    location: 'Oman (from Cape Town & Johannesburg)',
    capacity: 'Flexible (Private tours available)',
    packageType: 'international',
    place: 'cape-town', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'oman-tour-1', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Landscape' },
      { public_id: 'oman-tour-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Mountains' },
      { public_id: 'oman-tour-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Coastline' },
      { public_id: 'oman-tour-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Culture' }
    ],
    inclusions: [
      {
        category: 'Transportation',
        items: [
          'Private and well-maintained vehicles (SUVs, vans, or coaches)',
          'Experienced driver-guides familiar with cross-border routes',
          'Road trip from Cape Town/Johannesburg to Oman and return'
        ]
      },
      {
        category: 'Border Assistance',
        items: [
          'Assistance with border permits and documentation',
          'Support during border crossing procedures'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'Guided tours based on chosen package',
          'Entrance fees to attractions',
          'Professional local guides'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Handpicked accommodations (for multi-day tours)',
          'Options for various budget levels'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Visa & Documentation',
        items: ['Oman entry visa (assistance provided)']
      },
      {
        category: 'Meals',
        items: ['Meals (can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses, shopping, and optional activities']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel insurance (available upon request)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'SUV/Van/Coach', description: 'Premium vehicles for comfortable cross-border road trips' }
    ],
    accommodation: [
      { city: 'Oman', hotel: 'Various options based on package', rooms: 'As per requirement', roomType: 'Standard/Luxury', nights: 'Customizable' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'musandam-dibba-tour-dubai-abu-dhabi',
    title: 'Musandam Dibba Tour from Cape Town & Johannesburg',
    subtitle: 'Full-Day Harbour Cruise Experience | Sea, Mountains & Adventure',
    ideaFor: 'Families, couples, corporate groups, and leisure travelers looking for a peaceful yet exciting getaway from the city',
    about: 'The Dibba Musandam Tour is one of the most refreshing and scenic escapes from the South Africa, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day. With Premium Cape Town Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality.',
    services: 'Full-day dhow cruise, Swimming & snorkeling, Banana boat ride, Speed boat ride, Kayaking, Fishing, Beach leisure, Buffet lunch onboard, Border assistance, Professional crew',
    tourDetails: 'Overview\n\nThe Dibba Musandam Tour is one of the most refreshing and scenic escapes from the South Africa, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day.\n\nWith Premium Cape Town Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality. From swimming and snorkeling to banana boat rides and cave exploration, every moment is designed to create lifelong memories.\n\nThis tour is ideal for families, couples, corporate groups, and leisure travelers looking for a peaceful yet exciting getaway from the city.\n\nAbstract\n\nEscape the city and sail into a world of turquoise waters and rugged mountains on our Dibba Musandam Harbour Cruise Tour. Enjoy a scenic cruise, water sports, beach fun, buffet lunch onboard, and professional assistance from pickup to drop-off, making it one of the most popular one-day international excursions from Cape Town and Johannesburg.',
    abstract: 'Escape the city and sail into a world of turquoise waters and rugged mountains on our Dibba Musandam Harbour Cruise Tour. Enjoy a scenic cruise, water sports, beach fun, buffet lunch onboard, and professional assistance from pickup to drop-off, making it one of the most popular one-day international excursions from Cape Town and Johannesburg.',
    tourOverview: 'The Dibba Musandam Tour is one of the most refreshing and scenic escapes from the South Africa, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day.\n\nWith Premium Cape Town Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality. From swimming and snorkeling to banana boat rides and cave exploration, every moment is designed to create lifelong memories.',
    keyHighlights: [
      'Full-day dhow cruise through dramatic fjord-like mountains',
      'Crystal-clear turquoise waters perfect for swimming and snorkeling',
      'Water activities: banana boat, speed boat, kayaking, and fishing',
      'Beach leisure and relaxation time',
      'Buffet lunch served onboard',
      'Seamless border assistance and professional crew',
      'Scenic coastal cruising with cave visits',
      'Often referred to as the "Norway of Arabia"'
    ],
    hotelOptions: [
      'Full-Day Tour (No accommodation)',
      'Can be combined with overnight stays in Musandam'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round, subject to weather conditions',
      winter: 'October to April: Ideal weather for water activities and cruising',
      summer: 'May to September: Still enjoyable, with warm waters perfect for swimming'
    },
    whyChooseThisTrip: [
      'Perfect one-day escape from Cape Town and Johannesburg',
      'Unique fjord-like mountain scenery',
      'Multiple water activities included',
      'Professional border assistance included',
      'Ideal for families, couples, and groups',
      'No need for overnight accommodation - perfect day trip'
    ],
    whyPremiumSkygoTours: [
      'Trusted premium tour operator',
      'Seamless border permit assistance',
      'Carefully selected dhow & crew',
      'High safety standards & quality service',
      'Transparent pricing with no hidden costs',
      'Personalized support from booking to return'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Full-Day Musandam Dibba Harbour Cruise',
        description: '07:00 AM – Pickup from your location in Cape Town or Johannesburg\n(Exact pickup time will be confirmed one day prior to the tour)\n\n09:30 AM – Arrival at Dibba border & entry assistance by our team\n\n10:00 AM – Dhow reporting\n• Welcome drink\n• Program briefing\n\n10:30 AM – Dhow cruise begins\n• Scenic coastal cruising\n• After approx. 1 hour, dhow anchors for activities\n\nWater Activities & Beach Fun:\n• Swimming & snorkeling\n• Banana boat ride\n• Speed boat ride\n• Kayaking\n• Fishing\n• Relaxing beach time\n\n01:00 PM – Buffet lunch served onboard\n\n02:00 PM – Leisure cruising (1 hour)\n\n03:00 PM – Cave visit or fishing\n(Subject to sea conditions)\n\n03:30 PM – Evening tea & light snacks\n\n04:00 PM – Return to harbor & departure transfer'
      }
    ],
    price: 0,
    duration: 'Full Day (Approx. 9-10 hours)',
    location: 'Musandam, Oman (from Cape Town & Johannesburg)',
    capacity: 'Flexible group sizes',
    packageType: 'international',
    place: 'cape-town', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'musandam-dibba-1', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Musandam Fjords' },
      { public_id: 'musandam-dibba-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Harbour Cruise' },
      { public_id: 'musandam-dibba-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Activities' },
      { public_id: 'musandam-dibba-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Musandam Scenery' }
    ],
    inclusions: [
      {
        category: 'Transportation',
        items: [
          'Pickup & drop-off from Cape Town or Johannesburg',
          'Comfortable sharing vehicle with English-speaking driver-guide'
        ]
      },
      {
        category: 'Harbour Cruise',
        items: [
          '5–6 hours traditional dhow cruise',
          'Dedicated guest relation crew (English-speaking guide)',
          'Recorded instrumental music onboard'
        ]
      },
      {
        category: 'Meals & Beverages',
        items: [
          'Buffet lunch onboard',
          'Unlimited soft drinks & mineral water',
          'Fresh fruits & assorted packed snacks',
          'Evening tea & light snacks'
        ]
      },
      {
        category: 'Water Activities',
        items: [
          'Life jackets & snorkeling kits',
          'Banana boat ride',
          'Speed boat ride',
          'Kayaking',
          'Fishing',
          'Swimming & snorkeling'
        ]
      },
      {
        category: 'Border Assistance',
        items: [
          'Border entry assistance by our team',
          'Support with border permits and documentation'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Border Requirements',
        items: [
          'Border permission (mandatory for both resident and tourist visa holders)',
          'Passport & visa copy (must be submitted minimum 3 working days prior)',
          'Original passport (mandatory on the day of travel)'
        ]
      },
      {
        category: 'Personal Items',
        items: [
          'Swimwear and personal fishing equipment (recommended)',
          'Personal expenses'
        ]
      },
      {
        category: 'Insurance',
        items: [
          'Self-drive vehicles must be Oman insured'
        ]
      }
    ],
    transportation: [
      { type: 'Shared Vehicle', vehicle: 'Comfortable sharing vehicle', description: 'Pickup and drop-off from Cape Town or Johannesburg with English-speaking driver-guide' },
      { type: 'Traditional Dhow', vehicle: 'Traditional dhow boat', description: '5-6 hours dhow cruise with professional crew' }
    ],
    accommodation: [
      { city: 'Musandam, Oman', hotel: 'Day trip (No accommodation)', rooms: 'N/A', roomType: 'N/A', nights: '0 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'salalah-tour-dubai-abu-dhabi',
    title: 'Salalah Tour from Cape Town & Johannesburg',
    subtitle: '4 Days / 3 Nights | Nature, Culture & Coastal Escape',
    ideaFor: 'Travelers seeking a relaxed yet immersive experience with lush landscapes, pristine beaches, and rich Omani culture',
    about: 'Our Salalah Tour from Cape Town and Johannesburg is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes. This 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.',
    services: 'Private Toyota Prado with professional driver-guide, 2-bedroom villa accommodation, Daily breakfast, Sightseeing tours, Cultural market visits, Nature and adventure experiences',
    tourDetails: 'Overview\n\nOur Salalah Tour from Cape Town and Johannesburg is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes.\n\nThis 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.\n\nAbstract\n\nExperience Oman\'s hidden gem with our Salalah tour package featuring scenic beaches, wadis, mountains, cultural markets, and premium accommodation. Designed for small private groups, this tour blends nature, adventure, and heritage into a seamless travel experience.',
    abstract: 'Experience Oman\'s hidden gem with our Salalah tour package featuring scenic beaches, wadis, mountains, cultural markets, and premium accommodation. Designed for small private groups, this tour blends nature, adventure, and heritage into a seamless travel experience.',
    tourOverview: 'Our Salalah Tour from Cape Town and Johannesburg is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes.\n\nThis 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.',
    keyHighlights: [
      'Stay in a 2-bedroom villa at the resort',
      'Visit Mughsail Beach, Wadi Darbat & Jebel Samhan',
      'Witness Marneef Cave & natural water springs',
      'Experience the Anti-Gravity Point & Sinkhole',
      'Explore Haffa Souq & traditional Omani markets',
      'Private Toyota Prado with professional driver-guide',
      'Ideal mix of nature, adventure & culture',
      'Lush landscapes and monsoon charm (June-September)'
    ],
    hotelOptions: [
      'Gold Price - ZAR 1,500 per person',
      'Platinum Price - ZAR 2,350 per person',
      'Diamond Price - ZAR 3,350 per person'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round with different seasonal experiences',
      winter: 'June to September (Khareef season): Lush greenery, waterfalls, and misty weather',
      summer: 'October to March: Ideal for sightseeing and coastal exploration'
    },
    whyChooseThisTrip: [
      'Beautifully crafted getaway showcasing lush landscapes and pristine beaches',
      'Refreshing contrast to desert landscapes',
      'Ideal for travelers seeking relaxed yet immersive experience',
      'Premium accommodation in 2-bedroom villa',
      'Private transportation with dedicated driver-guide',
      'Perfect blend of nature, adventure, and culture'
    ],
    whyPremiumSkygoTours: [
      'Expert planning & private tours',
      'Premium accommodation options',
      'Experienced driver-guides',
      'Flexible itineraries',
      'Transparent pricing',
      'Dedicated customer support'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure from South Africa',
        description: 'Evening pickup from Cape Town or Johannesburg\n\nOvernight road journey to Salalah\n\nComfortable transportation with professional driver-guide for the scenic journey to southern Oman.'
      },
      {
        day: 2,
        title: 'Arrival & Coastal Wonders',
        description: 'Arrival in Salalah\n\nHotel check-in & refresh\n\nVisit Mughsail Beach - one of Salalah\'s most beautiful beaches with pristine white sand and turquoise waters\n\nExplore Marneef Cave & blowholes - natural rock formations with spectacular coastal views\n\nEvening at leisure to relax and enjoy the resort amenities'
      },
      {
        day: 3,
        title: 'Nature & Adventure',
        description: 'Visit Wadi Darbat waterfalls - stunning waterfalls surrounded by lush greenery, especially spectacular during Khareef season\n\nDrive to Jebel Samhan viewpoint - breathtaking mountain views overlooking the coastline\n\nExperience Anti-Gravity Point - a unique natural phenomenon where vehicles appear to roll uphill\n\nVisit Sinkhole - a natural wonder and geological marvel\n\nScenic drives through lush landscapes showcasing Salalah\'s natural beauty'
      },
      {
        day: 4,
        title: 'Culture & Shopping',
        description: 'Visit Haffa Souq - traditional Omani market offering local handicrafts, frankincense, and souvenirs\n\nExplore local Omani markets - experience authentic Omani culture and shop for traditional items\n\nReturn journey to South Africa\n\nComfortable transfer back to Cape Town or Johannesburg with memories of Salalah\'s natural beauty and cultural richness'
      }
    ],
    price: 1500,
    duration: '3 Nights / 4 Days',
    location: 'Salalah, Oman (from Cape Town & Johannesburg)',
    capacity: 'Minimum 5 Adults',
    packageType: 'international',
    place: 'cape-town', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'salalah-tour-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Landscape' },
      { public_id: 'salalah-tour-2', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Beach' },
      { public_id: 'salalah-tour-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Wadi Darbat' },
      { public_id: 'salalah-tour-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Culture' }
    ],
    inclusions: [
      {
        category: 'Accommodation',
        items: [
          '2-night stay in a 2-bedroom villa at the resort',
          'Daily breakfast'
        ]
      },
      {
        category: 'Transportation',
        items: [
          'Private Toyota Prado for transfers',
          'Dedicated driver-guide',
          'Road journey from Cape Town/Johannesburg to Salalah and return'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All sightseeing as per itinerary',
          'Visit to Mughsail Beach',
          'Marneef Cave & blowholes exploration',
          'Wadi Darbat waterfalls visit',
          'Jebel Samhan viewpoint',
          'Anti-Gravity Point experience',
          'Sinkhole visit',
          'Haffa Souq and local market visits',
          'All tours are private unless mentioned'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Visa & Documentation',
        items: ['Visa (if applicable)']
      },
      {
        category: 'Meals',
        items: ['Meals not mentioned (only breakfast included)']
      },
      {
        category: 'Additional Services',
        items: [
          'Extra local transfers in the South Africa (Subject to getting approval)',
          'Personal expenses',
          'Optional activities not mentioned'
        ]
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Toyota Prado', description: 'Private Toyota Prado with professional driver-guide for the entire journey' }
    ],
    accommodation: [
      { city: 'Salalah, Oman', hotel: 'Resort (2-Bedroom Villa)', rooms: '2-Bedroom Villa', roomType: 'Villa', nights: '3 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Attraction packages data
const getAttractionPackages = () => [
  {
    _id: 'burj-khalifa-tickets',
    title: 'Table Mountain Tickets',
    subtitle: 'At the Top & At the Top SKY Experience',
    ideaFor: 'First-time visitors, photographers, and travelers seeking panoramic views of Cape Town',
    about: 'Experience breathtaking views from the world\'s tallest building with our Table Mountain "At the Top" and "At the Top SKY" tickets. Choose between Levels 124 & 125 or upgrade to include Level 148 for the ultimate sky-high experience.',
    services: 'Table Mountain At the Top tickets (Levels 124 & 125), Table Mountain At the Top SKY tickets (Levels 124, 125 & 148), Prime and non-prime hour options, Flexible booking options',
    tourDetails: 'Experience breathtaking views from the world\'s tallest building with our Table Mountain "At the Top" and "At the Top SKY" tickets. Below are the standard ticket prices, valid for ticket-only bookings.\n\nTable Mountain – At the Top (Levels 124 & 125)\nNon-Prime Hours: ZAR 200 per person\nPrime Hours: ZAR 250 per person\n\nTable Mountain – At the Top SKY (Levels 124, 125 & 148)\nNon-Prime Hours: ZAR 410 per person\nPrime Hours: ZAR 510 per person\n\nImportant Notes:\n• Prices mentioned are for tickets only\n• Transfers are not included — private or sharing transfers can be arranged on request\n• Ticket prices may increase during peak seasons, New Year, public holidays, special events, and exhibitions\n• Prime and non-prime hour timings are defined by Table Mountain management\n• Tickets are subject to availability at the time of booking',
    abstract: 'Experience breathtaking views from the world\'s tallest building with our Table Mountain "At the Top" and "At the Top SKY" tickets. Choose between Levels 124 & 125 or upgrade to include Level 148 for the ultimate sky-high experience.',
    tourOverview: 'Table Mountain stands as an architectural marvel and the world\'s tallest building. Our tickets provide access to the observation decks offering panoramic views of Cape Town\'s skyline, desert, and coastline. Choose from standard "At the Top" access to Levels 124 & 125, or upgrade to "At the Top SKY" which includes exclusive access to Level 148, the highest observation deck.',
    keyHighlights: [
      'Access to world\'s tallest building',
      'Panoramic views of Cape Town skyline',
      'At the Top (Levels 124 & 125)',
      'At the Top SKY (Levels 124, 125 & 148)',
      'Prime and non-prime hour options',
      'Flexible booking available'
    ],
    hotelOptions: [
      'At the Top - Non-Prime Hours (ZAR 200)',
      'At the Top - Prime Hours (ZAR 250)',
      'At the Top SKY - Non-Prime Hours (ZAR 410)',
      'At the Top SKY - Prime Hours (ZAR 510)'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime hours offer sunset and evening views.',
      winter: 'Prime hours: Best for sunset and evening views (subject to availability)',
      summer: 'Non-prime hours: Great value during daytime visits'
    },
    whyChooseThisTrip: [
      'Iconic Cape Town landmark experience',
      'Breathtaking panoramic views',
      'Multiple ticket options to suit your budget',
      'Flexible prime and non-prime hour choices',
      'Perfect for first-time visitors',
      'Ideal for photography enthusiasts'
    ],
    whyPremiumSkygoTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Table Mountain Visit',
        description: 'Visit the world\'s tallest building and experience:\n\n• At the Top (Levels 124 & 125): Access to two observation decks with stunning 360-degree views\n• At the Top SKY (Levels 124, 125 & 148): Includes exclusive access to Level 148, the highest observation deck\n• Interactive exhibits and multimedia presentations\n• Panoramic views of Cape Town\'s skyline, desert, and coastline\n• Prime hours: Sunset and evening views (subject to availability)\n• Non-prime hours: Daytime visits with great value pricing'
      }
    ],
    price: 200,
    duration: '1-2 Hours',
    location: 'Cape Town, South Africa',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'burj-khalifa-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline from Table Mountain' },
      { public_id: 'burj-khalifa-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain Observation Deck' },
      { public_id: 'burj-khalifa-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Views' }
    ],
    inclusions: [
      {
        category: 'Ticket Options',
        items: [
          'Table Mountain At the Top ticket (Levels 124 & 125)',
          'Table Mountain At the Top SKY ticket (Levels 124, 125 & 148)',
          'Access to observation decks',
          'Interactive exhibits and multimedia presentations'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Additional Services',
        items: [
          'Meals and beverages',
          'Personal expenses',
          'Optional add-ons'
        ]
      },
      {
        category: 'Important Notes',
        items: [
          'Prices are for tickets only',
          'Ticket prices may increase during peak seasons, New Year, public holidays, special events',
          'Prime and non-prime hour timings are defined by Table Mountain management',
          'Tickets are subject to availability at the time of booking'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-non-prime',
    title: 'Table Mountain – At the Top: Non-Prime Hours',
    subtitle: 'Table Mountain – At The Top (Levels 124 & 125) | Non-Prime Hours',
    ideaFor: 'Travelers who prefer a relaxed visit during quieter hours while still enjoying the full observation deck experience',
    about: 'Visit the iconic Table Mountain, the tallest building in the world, and experience Cape Town from an extraordinary height. The At The Top (Levels 124 & 125) non-prime hour ticket is the most popular and value-for-money way to enjoy breathtaking panoramic views of Cape Town\'s skyline, desert, and coastline.',
    services: 'Table Mountain At The Top tickets (Levels 124 & 125), Non-Prime Hours access, High-speed elevator ride, Interactive displays and telescopes, Indoor and outdoor observation decks',
    tourDetails: 'Visit the iconic Table Mountain, the tallest building in the world, and experience Cape Town from an extraordinary height. The At The Top (Levels 124 & 125) non-prime hour ticket is the most popular and value-for-money way to enjoy breathtaking panoramic views of Cape Town\'s skyline, desert, and coastline.\n\nThis ticket is ideal for travelers who prefer a relaxed visit during quieter hours while still enjoying the full observation deck experience.\n\nTickets can be purchased online through our website, email, or WhatsApp. Guests who wish to include private transfers or a guided experience are encouraged to contact us for customized arrangements.',
    abstract: 'The Table Mountain – At The Top (Levels 124 & 125) Non-Prime Hours ticket allows visitors to access the main observation decks via high-speed elevators, offering uninterrupted views from indoor and outdoor platforms. With interactive displays and telescopes, this experience is suitable for families, couples, and first-time visitors to Cape Town.',
    tourOverview: 'The Table Mountain – At The Top (Levels 124 & 125) Non-Prime Hours ticket allows visitors to access the main observation decks via high-speed elevators, offering uninterrupted views from indoor and outdoor platforms. With interactive displays and telescopes, this experience is suitable for families, couples, and first-time visitors to Cape Town.',
    keyHighlights: [
      'Access to Levels 124 & 125 of Table Mountain',
      'Ride the world\'s fastest high-speed elevator',
      'Enjoy 360-degree views of Cape Town city',
      'Indoor and outdoor observation decks',
      'Interactive screens and digital telescopes',
      'Best option for budget-friendly sightseeing',
      'Located in Downtown Cape Town, next to Cape Town Waterfront Mall'
    ],
    hotelOptions: [
      'Adult: ZAR 200',
      'Child (3–8 years): ZAR 150',
      'Children below 3 years: Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM',
      winter: 'Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM (Exact entry time depends on availability at the time of booking)',
      summer: 'Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM (Exact entry time depends on availability at the time of booking)'
    },
    whyChooseThisTrip: [
      'Most popular and value-for-money option',
      'Relaxed visit during quieter hours',
      'Full observation deck experience',
      'Budget-friendly sightseeing',
      'Perfect for families and first-time visitors',
      'Convenient location in Downtown Cape Town'
    ],
    whyPremiumSkygoTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Table Mountain At The Top Visit - Non-Prime Hours',
        description: 'Visit the iconic Table Mountain, the tallest building in the world, and experience Cape Town from an extraordinary height.\n\n• Access to Levels 124 & 125 of Table Mountain\n• Ride the world\'s fastest high-speed elevator\n• Enjoy 360-degree views of Cape Town city\n• Indoor and outdoor observation decks\n• Interactive screens and digital telescopes\n• Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM\n\n(Exact entry time depends on availability at the time of booking)'
      }
    ],
    price: 200,
    duration: '1-2 Hours',
    location: 'Downtown Cape Town, next to Cape Town Waterfront Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-non-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain' },
      { public_id: 'burj-khalifa-non-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline from Table Mountain' },
      { public_id: 'burj-khalifa-non-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain Observation Deck' },
      { public_id: 'burj-khalifa-non-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Views' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry ticket to Table Mountain – At The Top (Levels 124 & 125)',
          'Access during Non-Prime Hours',
          'Use of observation decks and viewing telescopes'
        ]
      },
      {
        category: 'Timings (Non-Prime Hours)',
        items: [
          '07:00 AM – 11:30 AM',
          '08:30 PM – 11:00 PM',
          '(Exact entry time depends on availability at the time of booking)'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult: ZAR 200',
          'Child (3–8 years): ZAR 150',
          'Children below 3 years: Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['This ticket is sold without transfers by default (private transfer options available on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Tickets are subject to availability',
          'Entry is valid only for the selected date and time slot',
          'Tickets are non-transferable and non-refundable',
          'Guests must arrive at least 15 minutes before the scheduled time',
          'Large bags, food, and drinks are not permitted inside',
          'Prime and non-prime hour definitions are set by Table Mountain management',
          'Management reserves the right to modify timings or access levels'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 3 years: Free of charge',
          'Children from 3 to 8 years: Child ticket applies',
          'Children above 8 years: Adult ticket applies',
          'Children under 16 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-sky-non-prime',
    title: 'At The Top SKY (Levels 124, 125 & 148) – Non-Prime Hours',
    subtitle: 'Exclusive SKY Level 148 Experience | Non-Prime Hours',
    ideaFor: 'Travelers seeking a refined experience, combining luxury, comfort, and uninterrupted panoramic views of Cape Town\'s skyline',
    about: 'Experience Cape Town from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Table Mountain. This non-prime hour ticket offers access to Levels 124, 125, and the premium SKY Level 148, allowing you to enjoy breathtaking views with fewer crowds and a more relaxed atmosphere.',
    services: 'At The Top SKY tickets (Levels 124, 125 & 148), Non-Prime Hours access, Priority elevator access, Dedicated SKY lounge experience, Complimentary refreshments, Personalized guest hosting',
    tourDetails: 'Experience Cape Town from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Table Mountain. This non-prime hour ticket offers access to Levels 124, 125, and the premium SKY Level 148, allowing you to enjoy breathtaking views with fewer crowds and a more relaxed atmosphere.\n\nIdeal for travelers seeking a refined experience, this package combines luxury, comfort, and uninterrupted panoramic views of Cape Town\'s skyline.\n\nNote: Transfers are not included. Guests may contact Premium Cape Town Tours to arrange transportation if required.',
    abstract: 'Access Table Mountain Levels 124, 125, and the exclusive SKY Level 148 during non-prime hours for a quieter, premium viewing experience above the clouds.',
    tourOverview: 'Access Table Mountain Levels 124, 125, and the exclusive SKY Level 148 during non-prime hours for a quieter, premium viewing experience above the clouds. This premium experience includes dedicated SKY lounge access, priority elevator service, and complimentary refreshments at Level 148.',
    keyHighlights: [
      'Access to Table Mountain Levels 124, 125 & SKY Level 148',
      'Non-prime hours for a calm and less crowded visit',
      'Dedicated SKY lounge experience',
      'Priority elevator access',
      'Indoor and outdoor observation decks',
      'Complimentary refreshments at Level 148',
      'Personalized guest hosting on SKY Level'
    ],
    hotelOptions: [
      'Adult (12 years & above): ZAR 399',
      'Child (4–11 years): ZAR 399',
      'Infant (Below 4 years): Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Non-Prime Hours offer a quieter, premium viewing experience with fewer crowds.',
      winter: 'Non-Prime Hours: Best for a calm and less crowded visit (subject to availability)',
      summer: 'Non-Prime Hours: Great value during quieter periods'
    },
    whyChooseThisTrip: [
      'Most exclusive observation deck experience',
      'Access to premium SKY Level 148',
      'Quieter, less crowded visit during non-prime hours',
      'Dedicated SKY lounge with complimentary refreshments',
      'Priority elevator access',
      'Personalized guest hosting',
      'Refined luxury experience'
    ],
    whyPremiumSkygoTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'At The Top SKY Visit - Non-Prime Hours',
        description: 'Experience Cape Town from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Table Mountain.\n\n• Access to Table Mountain Levels 124, 125 & SKY Level 148\n• Priority elevator access\n• Dedicated SKY lounge experience\n• Complimentary refreshments at Level 148\n• Indoor and outdoor observation decks\n• Personalized guest hosting on SKY Level\n• Non-prime hours for a calm and less crowded visit'
      }
    ],
    price: 399,
    duration: '1-2 Hours',
    location: 'Downtown Cape Town, next to Cape Town Waterfront Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-sky-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain SKY Level' },
      { public_id: 'burj-khalifa-sky-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline from SKY Level 148' },
      { public_id: 'burj-khalifa-sky-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'SKY Lounge Experience' },
      { public_id: 'burj-khalifa-sky-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Premium Observation Deck' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry to At The Top (Levels 124 & 125)',
          'Exclusive access to At The Top SKY (Level 148)',
          'Priority access and hosted experience',
          'Complimentary refreshments at SKY Lounge',
          'Access to indoor and outdoor viewing decks'
        ]
      },
      {
        category: 'Note',
        items: [
          'Transfers are not included. Guests may contact Premium Cape Town Tours to arrange transportation if required.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult (12 years & above): ZAR 399',
          'Child (4–11 years): ZAR 399',
          'Infant (Below 4 years): Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Subject to availability at the time of booking',
          'Tickets are valid only for the selected date and time slot',
          'Non-refundable and non-transferable once confirmed',
          'Late arrival may result in denied entry without refund',
          'Management reserves the right to adjust timings for operational reasons'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 4 years enter free of charge',
          'Children aged 4–11 years are charged adult rates',
          'Children under 15 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-sky-prime',
    title: 'At The Top SKY (Levels 124, 125 & 148) – Prime Hours',
    subtitle: 'Exclusive SKY Level 148 Experience | Prime Hours (Sunset & Evening)',
    ideaFor: 'Travelers who want to enjoy iconic skyline views, golden-hour photography, and world-class hospitality at the highest public observation deck of Table Mountain',
    about: 'Witness Cape Town at its most spectacular with At The Top SKY – Prime Hours, offering access to Levels 124, 125, and the exclusive SKY Level 148 during the most sought-after viewing times, including sunset and early evening.',
    services: 'At The Top SKY tickets (Levels 124, 125 & 148), Prime Hours access (sunset & evening slots), Priority fast-track elevator access, Exclusive SKY Lounge hospitality, Complimentary refreshments, Perfect for sunset and night photography',
    tourDetails: 'Witness Cape Town at its most spectacular with At The Top SKY – Prime Hours, offering access to Levels 124, 125, and the exclusive SKY Level 148 during the most sought-after viewing times, including sunset and early evening.\n\nThis premium experience is perfect for travelers who want to enjoy iconic skyline views, golden-hour photography, and world-class hospitality at the highest public observation deck of Table Mountain.\n\nNote: Transfers are not included. Transportation can be arranged upon request through Premium Cape Town Tours.',
    abstract: 'Visit Table Mountain Levels 124, 125, and SKY Level 148 during prime hours for unforgettable sunset and evening views of Cape Town.',
    tourOverview: 'Visit Table Mountain Levels 124, 125, and SKY Level 148 during prime hours for unforgettable sunset and evening views of Cape Town. This premium experience includes priority fast-track elevator access, exclusive SKY Lounge hospitality, and complimentary refreshments at Level 148.',
    keyHighlights: [
      'Entry to Levels 124, 125 & SKY Level 148',
      'Prime-hour access (sunset & evening slots)',
      'Priority fast-track elevator access',
      'Exclusive SKY Lounge hospitality',
      'Complimentary refreshments at Level 148',
      'Indoor and outdoor panoramic viewing areas',
      'Perfect for sunset and night photography'
    ],
    hotelOptions: [
      'Adult (12 years & above): ZAR 659',
      'Child (4–11 years): ZAR 659',
      'Infant (Below 4 years): Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime Hours offer the most spectacular sunset and evening views of Cape Town.',
      winter: 'Prime Hours: Best for sunset and evening views, golden-hour photography (subject to availability)',
      summer: 'Prime Hours: Spectacular sunset and evening views (advance booking recommended)'
    },
    whyChooseThisTrip: [
      'Most spectacular viewing times (sunset & evening)',
      'Access to premium SKY Level 148',
      'Perfect for golden-hour photography',
      'Exclusive SKY Lounge hospitality',
      'Priority fast-track elevator access',
      'Complimentary refreshments',
      'World-class hospitality experience'
    ],
    whyPremiumSkygoTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation',
      'Advance booking assistance for prime slots'
    ],
    itinerary: [
      {
        day: 1,
        title: 'At The Top SKY Visit - Prime Hours',
        description: 'Witness Cape Town at its most spectacular with At The Top SKY – Prime Hours.\n\n• Entry to Levels 124, 125 & SKY Level 148\n• Prime-hour access (sunset & evening slots)\n• Priority fast-track elevator access\n• Exclusive SKY Lounge hospitality\n• Complimentary refreshments at Level 148\n• Indoor and outdoor panoramic viewing areas\n• Perfect for sunset and night photography\n\nNote: Prime hour slots sell out quickly; advance booking recommended.'
      }
    ],
    price: 659,
    duration: '1-2 Hours',
    location: 'Downtown Cape Town, next to Cape Town Waterfront Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-sky-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain SKY Level Prime Hours' },
      { public_id: 'burj-khalifa-sky-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sunset Views from SKY Level 148' },
      { public_id: 'burj-khalifa-sky-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'SKY Lounge Prime Hours' },
      { public_id: 'burj-khalifa-sky-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Evening Views from Table Mountain' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Admission to At The Top (Levels 124 & 125)',
          'Premium access to At The Top SKY (Level 148)',
          'Priority access and hosted SKY experience',
          'Complimentary refreshments',
          'Access to observation decks'
        ]
      },
      {
        category: 'Note',
        items: [
          'Transfers are not included. Transportation can be arranged upon request through Premium Cape Town Tours.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult (12 years & above): ZAR 659',
          'Child (4–11 years): ZAR 659',
          'Infant (Below 4 years): Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Subject to availability at the time of booking',
          'Prime hour slots sell out quickly; advance booking recommended',
          'Tickets are non-refundable and non-transferable',
          'Late arrivals may not be accommodated',
          'Timings may change due to operational or safety reasons'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 4 years enter free of charge',
          'Children aged 4–11 years are charged adult rates',
          'Children under 15 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-prime',
    title: 'Table Mountain – At The Top (Levels 124 & 125) | Prime Hours',
    subtitle: 'Prime Hours Experience | Sunset & Evening Views',
    ideaFor: 'Travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building',
    about: 'Experience Cape Town\'s most iconic landmark during the most sought-after visiting times with the Table Mountain – At The Top (Levels 124 & 125) Prime Hours ticket. This option allows you to witness Cape Town at its most magical moments: sunset, golden hour, and early evening, when the city lights begin to sparkle.\n\nPrime hour tickets are perfect for travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building.\n\nTickets can be purchased through our website, email, or WhatsApp. Guests who wish to include private transfers or a fully assisted visit are encouraged to contact us for customized arrangements.',
    services: 'Table Mountain At The Top tickets (Levels 124 & 125), Prime Hours access (sunset & evening), High-speed elevator ride, Indoor and outdoor observation decks, Interactive displays and telescopes, Perfect for sunset and night photography',
    tourDetails: 'Experience Cape Town\'s most iconic landmark during the most sought-after visiting times with the Table Mountain – At The Top (Levels 124 & 125) Prime Hours ticket. This option allows you to witness Cape Town at its most magical moments: sunset, golden hour, and early evening, when the city lights begin to sparkle.\n\nPrime hour tickets are perfect for travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building.\n\nTickets can be purchased through our website, email, or WhatsApp. Guests who wish to include private transfers or a fully assisted visit are encouraged to contact us for customized arrangements.',
    abstract: 'The Prime Hours ticket for Table Mountain – At The Top (Levels 124 & 125) grants access to the main observation decks during peak viewing times. Ride the high-speed elevator and step onto indoor and outdoor viewing platforms to enjoy uninterrupted panoramic views of Cape Town\'s skyline, desert, and Arabian Gulf at its most stunning hours.',
    tourOverview: 'The Prime Hours ticket for Table Mountain – At The Top (Levels 124 & 125) grants access to the main observation decks during peak viewing times. Ride the high-speed elevator and step onto indoor and outdoor viewing platforms to enjoy uninterrupted panoramic views of Cape Town\'s skyline, desert, and Arabian Gulf at its most stunning hours.',
    keyHighlights: [
      'Access to Levels 124 & 125 of Table Mountain',
      'Entry during Prime Viewing Hours (sunset & evening)',
      'Ride the world\'s fastest high-speed elevator',
      'Indoor and outdoor observation decks',
      'Unmatched sunset and night city views',
      'Interactive displays and viewing telescopes',
      'Located in Downtown Cape Town, next to Cape Town Waterfront Mall'
    ],
    hotelOptions: [
      'Adult: ZAR 260',
      'Child (3–8 years): ZAR 210',
      'Children below 3 years: Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime Hours: 12:00 PM – 08:00 PM (Sunset hours are the most popular and fill quickly)',
      winter: 'Prime Hours: 12:00 PM – 08:00 PM. Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.',
      summer: 'Prime Hours: 12:00 PM – 08:00 PM. Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.'
    },
    whyChooseThisTrip: [
      'Most sought-after visiting times (sunset & evening)',
      'Best photo opportunities during golden hour',
      'Vibrant atmosphere at the world\'s tallest building',
      'Unmatched sunset and night city views',
      'Perfect for photography enthusiasts',
      'Magical moments when city lights sparkle',
      'Prime viewing experience'
    ],
    whyPremiumSkygoTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation',
      'Advance booking assistance for prime slots'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Table Mountain At The Top Visit - Prime Hours',
        description: 'Experience Cape Town\'s most iconic landmark during the most sought-after visiting times.\n\n• Access to Levels 124 & 125 of Table Mountain\n• Entry during Prime Viewing Hours (sunset & evening)\n• Ride the world\'s fastest high-speed elevator\n• Indoor and outdoor observation decks\n• Unmatched sunset and night city views\n• Interactive displays and viewing telescopes\n• Prime Hours: 12:00 PM – 08:00 PM\n\n(Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.)'
      }
    ],
    price: 260,
    duration: '1-2 Hours',
    location: 'Downtown Cape Town, next to Cape Town Waterfront Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'cape-town',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Table Mountain Prime Hours' },
      { public_id: 'burj-khalifa-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sunset Views from Table Mountain' },
      { public_id: 'burj-khalifa-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Evening Views from Table Mountain' },
      { public_id: 'burj-khalifa-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Cape Town Skyline at Night' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry ticket to Table Mountain – At The Top (Levels 124 & 125)',
          'Access during Prime Hours',
          'Use of observation decks and digital telescopes'
        ]
      },
      {
        category: 'Timings (Prime Hours)',
        items: [
          '12:00 PM – 08:00 PM',
          '(Sunset hours are the most popular and fill quickly)',
          'Exact entry time is subject to availability at the time of booking.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult: ZAR 260',
          'Child (3–8 years): ZAR 210',
          'Children below 3 years: Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Tickets are sold without transfers by default (Private pickup and drop-off can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Tickets are subject to availability, especially during sunset hours',
          'Entry is valid only for the selected date and time slot',
          'Tickets are non-refundable and non-transferable',
          'Guests must arrive at least 15 minutes before the scheduled time',
          'Large bags, outside food, and drinks are not permitted',
          'Prime hour definition is determined by Table Mountain management',
          'Management reserves the right to adjust timings or access levels'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 3 years: Free of charge',
          'Children from 3 to 8 years: Child ticket applies',
          'Children above 8 years: Adult ticket applies',
          'Children under 16 years must be accompanied by an adult'
        ]
      },
      {
        category: 'Add On',
        items: [
          'Highly recommended to combine with Cape Town Waterfront Mall, Fountain Show, or Downtown dining'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    if (!isConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database not available'
      });
    }

    const regularPackages = getRegularPackages();
    const premiumPackages = getPremiumPackages();
    const luxuryPackages = getLuxuryPackages();
    const adventurePackages = getAdventurePackages();
    const omanPackages = getOmanPackages();
    const attractionPackages = getAttractionPackages();
    const allPackages = [...regularPackages, ...premiumPackages, ...luxuryPackages, ...adventurePackages, ...omanPackages, ...attractionPackages];

    const results = {
      created: [],
      skipped: [],
      errors: []
    };

    for (const pkg of allPackages) {
      try {
        // Check if package already exists by title (more reliable than _id)
        const existing = await Package.findOne({ title: pkg.title });
        
        if (existing) {
          results.skipped.push(pkg.title || pkg._id);
          continue;
        }

        // Remove _id from package data to let MongoDB generate proper ObjectId
        const { _id, ...packageData } = pkg;

        // Create new package
        const newPackage = new Package(packageData);
        await newPackage.save();
        results.created.push(pkg.title || pkg._id);
      } catch (error) {
        console.error(`Error seeding package ${pkg.title || pkg._id}:`, error);
        results.errors.push({ title: pkg.title || pkg._id, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Packages seeded successfully',
      results: {
        total: allPackages.length,
        created: results.created.length,
        skipped: results.skipped.length,
        errors: results.errors.length
      },
      details: results
    });
  } catch (error) {
    console.error('Error seeding packages:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
