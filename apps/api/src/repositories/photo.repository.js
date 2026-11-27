import { pool } from "../config/database.js";
import { toPhoto } from "../mappers/listing.mapper.js";

/**
 * A photo's owner is either a listing ({ listingId }) or a site-wide gallery
 * section ({ section: "home_carousel" }).
 */
function ownerFilter({ listingId, section }) {
  return listingId
    ? { sql: "listing_id = $1", params: [listingId] }
    : { sql: "listing_id IS NULL AND section = $1", params: [section] };
}

export const photoRepository = {
  async findGallery(section, db = pool) {
    const { rows } = await db.query(
      `SELECT id, alt, width, height FROM photos
       WHERE section = $1 AND listing_id IS NULL
       ORDER BY sort_order, id`,
      [section],
    );
    return rows.map(toPhoto);
  },

  /** The stored image file, or null. */
  async findImage(id, db = pool) {
    const { rows } = await db.query("SELECT mime_type, data FROM photos WHERE id = $1", [id]);
    return rows[0] ? { mimeType: rows[0].mime_type, data: rows[0].data } : null;
  },

  /**
   * The sort position after the owner's last photo. Locks the owner's rows,
   * so call it inside a transaction to stop concurrent uploads colliding.
   */
  async nextSortOrder(owner, db = pool) {
    const { sql, params } = ownerFilter(owner);
    const { rows } = await db.query(
      `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM (
         SELECT sort_order FROM photos WHERE ${sql} FOR UPDATE
       ) owned`,
      params,
    );
    return rows[0].next;
  },

  async insert({ listingId = null, section, alt, mimeType, width, height, sizeBytes, data, sortOrder }, db = pool) {
    const { rows } = await db.query(
      `INSERT INTO photos (listing_id, section, alt, mime_type, width, height, size_bytes, data, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, alt, width, height`,
      [listingId, section, alt, mimeType, width, height, sizeBytes, data, sortOrder],
    );
    return toPhoto(rows[0]);
  },

  /** How many of `ids` exist, and how many distinct owners they belong to. */
  async summarize(ids, db = pool) {
    const { rows } = await db.query(
      `SELECT COUNT(*)::int AS count,
              COUNT(DISTINCT COALESCE('listing:' || listing_id, 'section:' || section))::int AS owners
       FROM photos WHERE id = ANY($1::int[])`,
      [ids],
    );
    return rows[0];
  },

  /** Sets each photo's sort order to its position in `ids`. */
  async reorder(ids, db = pool) {
    await db.query(
      `UPDATE photos p SET sort_order = o.position
       FROM unnest($1::int[]) WITH ORDINALITY AS o(id, position)
       WHERE p.id = o.id`,
      [ids],
    );
  },

  /** Returns the updated photo, or null when it doesn't exist. */
  async updateAlt(id, alt, db = pool) {
    const { rows } = await db.query(
      "UPDATE photos SET alt = $2 WHERE id = $1 RETURNING id, alt, width, height",
      [id, alt],
    );
    return rows[0] ? toPhoto(rows[0]) : null;
  },

  async delete(id, db = pool) {
    const { rowCount } = await db.query("DELETE FROM photos WHERE id = $1", [id]);
    return rowCount > 0;
  },

  /** Deletes every gallery photo (photos not attached to a listing). */
  async deleteAllGallery(db = pool) {
    await db.query("DELETE FROM photos WHERE listing_id IS NULL");
  },
};
