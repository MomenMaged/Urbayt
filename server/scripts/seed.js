// Imports the listings and photos that are currently hard-coded in the website
// into the database, so the site looks the same the moment it switches to the API.
//
//   npm run db:seed            # only runs on an empty database
//   npm run db:seed -- --force # deletes ALL listings and gallery photos first
import { readFile } from "node:fs/promises";
import { pool, withTransaction } from "../src/config/database.js";
import { listingRepository } from "../src/repositories/listing.repository.js";
import { photoRepository } from "../src/repositories/photo.repository.js";
import { processImage } from "../src/services/image.service.js";
import { createListingSchema } from "../src/validators/listing.validator.js";

const PUBLIC_DIR = new URL("../../public/", import.meta.url);

// What every UrbanHive space offers, per the FAQ on the website.
const BASE_AMENITIES = ["wifi", "weekly_cleaning", "kitchen", "toiletries"];

const LISTINGS = [
  {
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
    photos: [
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
    ],
  },
  {
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
    photos: ["Sokhna_comming_soon.jpeg", "Sokhna_2.jpeg"],
  },
  {
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
    photos: ["CFC_2.jpeg", "CFC_3.jpeg", "CFC.jpeg"],
  },
  {
    slug: "mountain-view-hyde-park",
    title: "Mountain View - Hyde Park",
    location: "Hyde Park, New Cairo",
    status: "coming_soon",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    areaSqm: 145,
    amenities: BASE_AMENITIES,
    photos: ["Mountain_view.jpeg", "Mountain_view_2.jpeg"],
  },
  {
    slug: "coming-soon",
    title: "Coming soon",
    status: "coming_soon",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    amenities: BASE_AMENITIES,
    photos: ["Comming_soon1.jpeg", "Comming_soon2.jpeg"],
  },
];

const HOME_CAROUSEL = [
  "home_page.jpeg",
  "Home_page2.jpeg",
  "Home_page3.jpeg",
  "Home_page4.jpeg",
  "Home_page5.jpeg",
  "Home_page6.jpeg",
  "Home_page7.jpeg",
];

async function loadImage(filename) {
  const buffer = await readFile(new URL(filename, PUBLIC_DIR));
  return processImage({ buffer, originalname: filename });
}

async function insertPhoto(client, { listingId = null, section, alt, filename, sortOrder }) {
  const image = await loadImage(filename);
  await photoRepository.insert({ ...image, listingId, section, alt, sortOrder }, client);
  return image.sizeBytes;
}

const force = process.argv.includes("--force");

try {
  const existing = await listingRepository.count();
  if (existing > 0 && !force) {
    console.log(
      `The database already has ${existing} listing(s); nothing was changed.\n` +
        "Run `npm run db:seed -- --force` to wipe listings and gallery photos and re-import.",
    );
    process.exit(0);
  }

  await withTransaction(async (client) => {
    if (force) {
      await listingRepository.deleteAll(client); // cascades to listing photos
      await photoRepository.deleteAllGallery(client);
    }

    for (const [index, listing] of LISTINGS.entries()) {
      // Same validation the admin panel goes through, which also fills in defaults.
      const data = createListingSchema.parse({ ...listing, sortOrder: index });
      const listingId = await listingRepository.create(data, client);

      let bytes = 0;
      for (const [order, filename] of listing.photos.entries()) {
        bytes += await insertPhoto(client, {
          listingId,
          section: "listing",
          alt: `${listing.title} photo ${order + 1}`,
          filename,
          sortOrder: order,
        });
      }
      console.log(`  ✓ ${listing.title} (${listing.photos.length} photos, ${(bytes / 1e6).toFixed(1)} MB)`);
    }

    for (const [order, filename] of HOME_CAROUSEL.entries()) {
      await insertPhoto(client, {
        section: "home_carousel",
        alt: `UrbanHive space ${order + 1}`,
        filename,
        sortOrder: order,
      });
    }
    console.log(`  ✓ Home page carousel (${HOME_CAROUSEL.length} photos)`);
  });

  console.log("Seed complete.");
} finally {
  await pool.end();
}
