import { pool } from "../config/database.js";
import { toListing } from "../mappers/listing.mapper.js";

/** API field name -> database column. Also the whitelist of writable columns. */
const COLUMN_FOR_FIELD = {
  slug: "slug",
  title: "title",
  headline: "headline",
  location: "location",
  overview: "overview",
  locationDescription: "location_description",
  pricePerNight: "price_per_night",
  currency: "currency",
  status: "status",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  maxGuests: "max_guests",
  areaSqm: "area_sqm",
  bookingUrl: "booking_url",
  amenities: "amenities",
  isPublished: "is_published",
  sortOrder: "sort_order",
};

/** Listing columns plus an ordered JSON array of its photos (never the image bytes). */
const SELECT_WITH_PHOTOS = `
  SELECT l.*,
    COALESCE((
      SELECT json_agg(
        json_build_object('id', p.id, 'alt', p.alt, 'width', p.width, 'height', p.height)
        ORDER BY p.sort_order, p.id
      )
      FROM photos p
      WHERE p.listing_id = l.id
    ), '[]'::json) AS photos
  FROM listings l
`;

function writableFields(data) {
  return Object.keys(data).filter((field) => field in COLUMN_FOR_FIELD);
}

/**
 * Every method accepts an optional `db` (a transaction client from
 * withTransaction); without it the shared pool is used.
 */
export const listingRepository = {
  async findAll({ publishedOnly = false } = {}, db = pool) {
    const where = publishedOnly ? "WHERE l.is_published" : "";
    const { rows } = await db.query(`${SELECT_WITH_PHOTOS} ${where} ORDER BY l.sort_order, l.id`);
    return rows.map(toListing);
  },

  async findById(id, db = pool) {
    const { rows } = await db.query(`${SELECT_WITH_PHOTOS} WHERE l.id = $1`, [id]);
    return rows[0] ? toListing(rows[0]) : null;
  },

  async findBySlug(slug, { publishedOnly = false } = {}, db = pool) {
    const published = publishedOnly ? "AND l.is_published" : "";
    const { rows } = await db.query(`${SELECT_WITH_PHOTOS} WHERE l.slug = $1 ${published}`, [slug]);
    return rows[0] ? toListing(rows[0]) : null;
  },

  async exists(id, db = pool) {
    const { rowCount } = await db.query("SELECT 1 FROM listings WHERE id = $1", [id]);
    return rowCount > 0;
  },

  async count(db = pool) {
    const { rows } = await db.query("SELECT COUNT(*)::int AS count FROM listings");
    return rows[0].count;
  },

  /** Inserts a listing and returns its new id. */
  async create(data, db = pool) {
    const fields = writableFields(data);
    const columns = fields.map((field) => COLUMN_FOR_FIELD[field]);
    const placeholders = fields.map((_, index) => `$${index + 1}`);
    const { rows } = await db.query(
      `INSERT INTO listings (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING id`,
      fields.map((field) => data[field]),
    );
    return rows[0].id;
  },

  /** Updates the given fields. Returns false when the listing doesn't exist. */
  async update(id, data, db = pool) {
    const fields = writableFields(data);
    const assignments = fields.map((field, index) => `${COLUMN_FOR_FIELD[field]} = $${index + 2}`);
    const { rowCount } = await db.query(
      `UPDATE listings SET ${[...assignments, "updated_at = now()"].join(", ")} WHERE id = $1`,
      [id, ...fields.map((field) => data[field])],
    );
    return rowCount > 0;
  },

  /** Deletes a listing; its photos go with it (ON DELETE CASCADE). */
  async delete(id, db = pool) {
    const { rowCount } = await db.query("DELETE FROM listings WHERE id = $1", [id]);
    return rowCount > 0;
  },

  async deleteAll(db = pool) {
    await db.query("DELETE FROM listings");
  },
};
