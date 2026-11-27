-- Urban Hive database schema.
-- Safe to run repeatedly: every statement is idempotent.

CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listings (
  id                   SERIAL PRIMARY KEY,
  slug                 TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title                TEXT NOT NULL,
  headline             TEXT,
  location             TEXT,
  overview             TEXT,
  location_description TEXT,
  price_per_night      NUMERIC(12, 2) CHECK (price_per_night IS NULL OR price_per_night >= 0),
  currency             TEXT NOT NULL DEFAULT 'EGP',
  status               TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'coming_soon')),
  bedrooms             INTEGER CHECK (bedrooms IS NULL OR bedrooms >= 0),
  bathrooms            INTEGER CHECK (bathrooms IS NULL OR bathrooms >= 0),
  max_guests           INTEGER CHECK (max_guests IS NULL OR max_guests >= 0),
  area_sqm             NUMERIC(8, 2) CHECK (area_sqm IS NULL OR area_sqm >= 0),
  booking_url          TEXT,
  amenities            TEXT[] NOT NULL DEFAULT '{}',
  is_published         BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order           INTEGER NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Photos belong either to a listing (section = 'listing') or to a site-wide
-- section such as the home page carousel (section = 'home_carousel').
-- Image bytes live in the database so the API is the only thing to host.
CREATE TABLE IF NOT EXISTS photos (
  id          SERIAL PRIMARY KEY,
  listing_id  INTEGER REFERENCES listings (id) ON DELETE CASCADE,
  section     TEXT NOT NULL DEFAULT 'listing' CHECK (section IN ('listing', 'home_carousel')),
  alt         TEXT NOT NULL DEFAULT '',
  mime_type   TEXT NOT NULL,
  width       INTEGER,
  height      INTEGER,
  size_bytes  INTEGER NOT NULL,
  data        BYTEA NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT photos_owner_matches_section
    CHECK ((section = 'listing') = (listing_id IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS photos_listing_idx ON photos (listing_id, sort_order);
CREATE INDEX IF NOT EXISTS photos_section_idx ON photos (section, sort_order) WHERE listing_id IS NULL;
CREATE INDEX IF NOT EXISTS listings_public_idx ON listings (is_published, sort_order);
