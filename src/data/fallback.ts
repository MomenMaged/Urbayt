import type { Listing, Photo } from "../api/types";

/*
 * The site's content as it was before the admin panel existed. It is shown
 * only when the API can't be reached, so the public site never goes blank.
 * The admin panel edits the database, not this file.
 */

let nextId = -1;
const photos = (title: string, files: string[]): Photo[] =>
  files.map((file, index) => ({
    id: nextId--,
    alt: `${title} photo ${index + 1}`,
    width: null,
    height: null,
    url: `/${file}`,
  }));

const BASE_AMENITIES = ["wifi", "weekly_cleaning", "kitchen", "toiletries"];

const base = {
  headline: null,
  location: null,
  overview: null,
  locationDescription: null,
  pricePerNight: null,
  currency: "EGP",
  bookingUrl: null,
  isPublished: true,
};

export const FALLBACK_LISTINGS: Listing[] = [
  {
    ...base,
    id: -1,
    slug: "madinaty",
    title: "Modern Cozy Garden View @ Madinaty",
    headline: "MODERN COZY 2BR+1BA PANO GARDEN VIEW",
    location: "Madinaty, New Cairo",
    overview:
      "Welcome to your perfect getaway! This fully renovated 2-br, 1-ba home is designed for comfort, perfect for solo travelers, couples, or small families. Features queen-sized beds with fresh linens, and brand-new furniture throughout adds a modern yet cozy touch. Wake up to breathtaking panoramic garden views, and step onto your balcony, the perfect spot to enjoy a brunch or sip your morning coffee in peace.",
    locationDescription:
      "Madinaty Compound in Egypt is strategically situated in New Cairo, on the Cairo - Suez Road; and thanks to this prime location, the project is: 2 km from the entrance of Shorouk City, A 10-minute drive from Heliopolis, 20 minutes from Downtown Cairo and Easily accessible through Ring Road.",
    pricePerNight: 1750,
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    areaSqm: 79,
    bookingUrl:
      "https://www.airbnb.com/rooms/1211501666253889491?guests=1&adults=1&s=67&unique_share_id=d087c953-20cd-4482-b835-261fb787a425",
    amenities: [
      "air_conditioning",
      "free_parking",
      "wifi",
      "smart_tv",
      "weekly_cleaning",
      "linens_towels",
      "smart_lock",
      "refrigerator",
      "kitchen",
      "microwave",
      "toiletries",
      "garden_view",
      "balcony",
    ],
    sortOrder: 0,
    photos: photos("Modern Cozy Garden View @ Madinaty", [
      "AS-URBAN-HIVE-MADINATY-6.jpg",
      "AS-URBAN-HIVE-MADINATY-1.jpg",
      "AS-URBAN-HIVE-MADINATY-2.jpg",
      "AS-URBAN-HIVE-MADINATY-4.jpg",
      "AS-URBAN-HIVE-MADINATY-5.jpg",
      "AS-URBAN-HIVE-MADINATY-10.jpg",
      "AS-URBAN-HIVE-MADINATY-7.jpg",
      "AS-URBAN-HIVE-MADINATY-8.jpg",
      "Rectangle-528-1.jpg",
      "Madinaty-gate-scaled.jpg",
    ]),
  },
  {
    ...base,
    id: -2,
    slug: "sokhna",
    title: "Sokhna Blumar",
    headline: "3BR POOL/SEA VIEW | BLUMAR",
    location: "Blumar, Ain Sokhna",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    areaSqm: 150,
    bookingUrl: "https://www.airbnb.ae/h/urbanhive-blumar-3",
    amenities: [...BASE_AMENITIES, "pool", "sea_view"],
    sortOrder: 1,
    photos: photos("Sokhna Blumar", ["Sokhna_comming_soon.jpeg", "Sokhna_2.jpeg"]),
  },
  {
    ...base,
    id: -3,
    slug: "cairo-festival-city",
    title: "Cairo Festival City",
    headline: "2BR GARDEN VIEW | CFC",
    location: "Cairo Festival City, New Cairo",
    status: "coming_soon",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    areaSqm: 140,
    amenities: [...BASE_AMENITIES, "garden_view"],
    sortOrder: 2,
    photos: photos("Cairo Festival City", ["CFC_2.jpeg", "CFC_3.jpeg", "CFC.jpeg"]),
  },
  {
    ...base,
    id: -4,
    slug: "mountain-view-hyde-park",
    title: "Mountain View - Hyde Park",
    location: "Hyde Park, New Cairo",
    status: "coming_soon",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    areaSqm: 145,
    amenities: BASE_AMENITIES,
    sortOrder: 3,
    photos: photos("Mountain View - Hyde Park", ["Mountain_view.jpeg", "Mountain_view_2.jpeg"]),
  },
  {
    ...base,
    id: -5,
    slug: "coming-soon",
    title: "Coming soon",
    status: "coming_soon",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    areaSqm: null,
    amenities: BASE_AMENITIES,
    sortOrder: 4,
    photos: photos("Coming soon", ["Comming_soon1.jpeg", "Comming_soon2.jpeg"]),
  },
];

export const FALLBACK_HOME_CAROUSEL: Photo[] = photos("UrbanHive space", [
  "home_page.jpeg",
  "Home_page2.jpeg",
  "Home_page3.jpeg",
  "Home_page4.jpeg",
  "Home_page5.jpeg",
  "Home_page6.jpeg",
  "Home_page7.jpeg",
]);
