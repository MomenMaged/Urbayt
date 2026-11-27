# Urban Hive

The Urban Hive website (React + Vite, deployed on Vercel) and its API
(Express + PostgreSQL, in [`server/`](server/)). The API powers the admin
panel at `/admin`, where listings and photos are added, edited and deleted.

```
portfolio-m/
├── src/            Website (public pages + admin panel in src/admin)
├── public/         Static images and video
└── server/         API: Express + PostgreSQL
    ├── db/schema.sql
    ├── scripts/    migrate, seed, create-admin
    └── src/        layered architecture, see below
```

## API architecture

The API is split into layers. A request travels down through them, and each
layer only talks to the one below it:

```
request → routes → middleware → controllers → services → repositories → PostgreSQL
```

| Folder | Job | Knows about |
| --- | --- | --- |
| `routes/` | Maps each URL and method to a controller function, and attaches middleware | Express |
| `middleware/` | Runs before controllers: admin sign-in check, photo uploads, login rate limit, turning errors into JSON | Express, services |
| `controllers/` | Reads the request, validates it, calls a service, sends the response (status codes, cache headers) | HTTP, validators, services |
| `validators/` | Rules for incoming data (Zod schemas) | Nothing else |
| `services/` | Business rules: "a listing must exist before adding photos", "photos being reordered must share one owner", password checks and login tokens, image resizing | Repositories, never HTTP |
| `repositories/` | All SQL. One per table: listings, photos, admins | The database |
| `mappers/` | Turns database rows into API objects | Nothing else |
| `config/` | Environment settings and the database connection | Nothing else |
| `utils/` | Shared error classes (`notFound`, `badRequest`…) | Nothing else |

Two entry files tie it together: `app.js` builds the Express app (security
headers, CORS, routes, error handling) and `index.js` starts it.

**Where to make a change:**

- New field on listings → `db/schema.sql`, `validators/listing.validator.js`,
  the column map in `repositories/listing.repository.js`, and
  `mappers/listing.mapper.js`.
- New rule (for example "at most 30 photos per listing") → the service.
- New endpoint → a controller method plus one line in `routes/`.

The scripts in `scripts/` use the same repositories and validators, so seed
data goes through the same rules as the admin panel.

## Run it locally

You need Node 20+ and a PostgreSQL database (a local install, or a free
hosted one from [Neon](https://neon.tech) or [Supabase](https://supabase.com)).

**1. API**

```bash
cd server
npm install
cp .env.example .env        # then fill in DATABASE_URL and JWT_SECRET
npm run db:migrate          # creates the tables
npm run db:seed             # imports the current listings and photos
npm run create-admin -- you@example.com "a long password"
npm run dev                 # http://localhost:4000
```

**2. Website** (in another terminal, from the project root)

```bash
npm install
npm run dev                 # http://localhost:5173
```

The dev server forwards `/api` to the API on port 4000. Open
<http://localhost:5173/admin> and sign in with the admin you created.

## The admin panel

- **Listings**: create, edit, hide/show and delete listings. Each listing has a
  title, headline, location, description, price, booking link, bedrooms,
  bathrooms, guests, area and amenities.
- **Photos**: drag photos in to upload them. They're resized and converted to
  WebP automatically, so large phone photos are fine. Drag to reorder; the first
  photo is the cover used on cards and as the page's main image.
- **Home carousel**: the slideshow on the home page.

Changes appear on the website within about a minute (the API's public responses
are cached for 60 seconds).

Listing pages live at `/listings/<web-address>`. The original links still work:
`/madinaty`, `/sokhna` and `/cfc` show the listings with the web addresses
`madinaty`, `sokhna` and `cairo-festival-city`.

If the API can't be reached, the public site falls back to the content built
into `src/data/fallback.ts`, so it never shows an empty page.

## Deploying

**Database**: create a PostgreSQL database (Neon, Supabase, Render or Railway
all have free tiers) and copy its connection string.

Run `npm run db:migrate`, `npm run db:seed` and `npm run create-admin` once
against the production database, from your machine with its `DATABASE_URL`
in `server/.env`.

### API on Vercel

The API is a **second Vercel project** from the same GitHub repository, with
its root directory set to `server`. On Vercel it runs as a serverless function:
[`server/api/index.js`](server/api/index.js) exports the app and
[`server/vercel.json`](server/vercel.json) sends every request to it.

1. Vercel → **Add New → Project** → import this repository.
2. **Root Directory**: `server`. **Framework Preset**: Other. Leave the build
   and output settings empty.
3. **Environment Variables**:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | Supabase **transaction pooler** string (port **6543**) |
   | `DATABASE_SSL` | `true` |
   | `DATABASE_POOL_MAX` | `3` |
   | `JWT_SECRET` | a long random string (can be the one in your `server/.env`) |
   | `CORS_ORIGIN` | the website's address(es), e.g. `https://urban-hive.co,https://urbayt.vercel.app` |

4. Deploy, then open `https://<api-project>.vercel.app/api/health`. It should
   show `{"ok":true}`.

Things to know on Vercel:

- Requests are limited to 4.5 MB. The admin panel shrinks photos in the browser
  and splits uploads so each request stays under it.
- The login limit (10 tries per 15 minutes) is counted per running instance,
  so it's looser than on a single server.

### API on another host

Render, Railway or Fly.io work too: root directory `server`, build command
`npm install`, start command `npm start`, and the same environment variables.

### Website

In the website's Vercel project, set `VITE_API_URL` to the API's address
(for example `https://urbayt-api.vercel.app`) and redeploy.

## API reference

Public:

| Method | Path | |
| --- | --- | --- |
| GET | `/api/listings` | Published listings with photos |
| GET | `/api/listings/:slug` | One published listing |
| GET | `/api/gallery/home_carousel` | Home carousel photos |
| GET | `/api/photos/:id` | Image file (cached for a year) |

Admin (needs `Authorization: Bearer <token>` from `POST /api/auth/login`):

| Method | Path | |
| --- | --- | --- |
| GET, POST | `/api/admin/listings` | List all / create |
| GET, PATCH, DELETE | `/api/admin/listings/:id` | Read / update / delete (deletes its photos too) |
| POST | `/api/admin/listings/:id/photos` | Upload photos (multipart field `photos`, up to 12 per request) |
| GET | `/api/admin/gallery/home_carousel` | Carousel photos |
| POST | `/api/admin/gallery/home_carousel/photos` | Upload carousel photos |
| PUT | `/api/admin/photos/order` | Save photo order: `{ "ids": [3, 1, 2] }` |
| PATCH, DELETE | `/api/admin/photos/:id` | Change description / delete |

Login is limited to 10 attempts per 15 minutes per IP.
