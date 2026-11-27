/** Converts database rows (snake_case) into the objects the API returns (camelCase). */

export function photoUrl(id) {
  return `/api/photos/${id}`;
}

export function toPhoto(row) {
  return {
    id: row.id,
    alt: row.alt,
    width: row.width,
    height: row.height,
    url: photoUrl(row.id),
  };
}

export function toListing(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    headline: row.headline,
    location: row.location,
    overview: row.overview,
    locationDescription: row.location_description,
    pricePerNight: row.price_per_night,
    currency: row.currency,
    status: row.status,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    maxGuests: row.max_guests,
    areaSqm: row.area_sqm,
    bookingUrl: row.booking_url,
    amenities: row.amenities,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    photos: (row.photos ?? []).map(toPhoto),
  };
}
