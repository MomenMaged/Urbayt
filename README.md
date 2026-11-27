# Urban Hive

The Urban Hive website and admin panel (React + Vite) and their API
(Express + PostgreSQL), in one monorepo. The admin panel at `/admin` is where
listings and photos are added, edited and deleted.

```
portfolio-m/
├── package.json        npm workspaces + the commands below
├── scripts/dev.mjs     runs the API and the website together
├── apps/
│   ├── web/            @urban-hive/web: website + admin panel (src/admin)
│   │   └── public/     static images and video
│   └── api/            @urban-hive/api: Express + PostgreSQL
│       ├── db/schema.sql
│       ├── scripts/    migrate, seed, create-admin
│       ├── api/        Vercel entry point
│       └── src/        layered architecture, see below
└── packages/
    └── shared/         @urban-hive/shared: rules and types both apps use
```

## Commands

Run everything from the project root:

| Command | What it does |
| --- | --- |
| `npm install` | Installs everything for all packages (one `node_modules`, one lockfile) |
| `npm run dev` | Starts the API (port 4000) and the website (port 5173) together |
| `npm run dev:web` / `npm run dev:api` | Starts just one of them |
| `npm run build` | Builds the website into `apps/web/dist` |
| `npm run lint` | Lints the website |
| `npm run db:migrate` | Creates or updates the database tables |
| `npm run db:seed` | Imports the original listings and photos into an empty database |
| `npm run create-admin -- you@example.com "password"` | Creates an admin, or resets their password |

To add a package to one app: `npm install <package> -w @urban-hive/web`
(or `-w @urban-hive/api`).

## Shared package

[`packages/shared`](packages/shared/) holds what the website and the API must
agree on, so they can't drift apart:

- the listing statuses and gallery names,
- photo limits: files per upload, maximum file size, stored image size,
- accepted image types,
- the TypeScript types for a listing and a photo (the API's response shape).

The database's `CHECK` constraints in `apps/api/db/schema.sql` mirror the
statuses and gallery names, so update them together.

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

You need Node 22 and a PostgreSQL database (a local install, or a free
hosted one from [Supabase](https://supabase.com) or [Neon](https://neon.tech)).

```bash
npm install
cp apps/api/.env.example apps/api/.env    # then fill in DATABASE_URL and JWT_SECRET
npm run db:migrate                        # creates the tables
npm run db:seed                           # imports the current listings and photos
npm run create-admin -- you@example.com "a long password"
npm run dev                               # API on :4000, website on :5173
```

The website's dev server forwards `/api` to the API on port 4000. Open
<http://localhost:5173/admin> and sign in with the admin you created.
Ctrl+C stops both.

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
into `apps/web/src/data/fallback.ts`, so it never shows an empty page.

## Deploying

The website and the API are **two Vercel projects connected to this same
repository**, each pointing at its own folder. Both use the repository's root
`package-lock.json`; Vercel detects the npm workspaces and installs from the root.

**Database**: run `npm run db:migrate`, `npm run db:seed` and
`npm run create-admin` once against the production database, from your
machine with its `DATABASE_URL` in `apps/api/.env`.

### Website on Vercel

| Setting | Value |
| --- | --- |
| Root Directory | `apps/web` |
| Framework Preset | Vite |
| Include files outside the root directory | Enabled (the default), needed for `packages/shared` |
| `VITE_API_URL` | the API's address, e.g. `https://urbayt-api.vercel.app` |

### API on Vercel

The API runs as a serverless function:
[`apps/api/api/index.js`](apps/api/api/index.js) exports the app and
[`apps/api/vercel.json`](apps/api/vercel.json) sends every request to it.

| Setting | Value |
| --- | --- |
| Root Directory | `apps/api` |
| Framework Preset | Other (leave build and output settings empty) |
| Include files outside the root directory | Enabled (the default) |
| `DATABASE_URL` | Supabase **transaction pooler** string (port **6543**) |
| `DATABASE_SSL` | `true` |
| `DATABASE_POOL_MAX` | `3` |
| `JWT_SECRET` | a long random string |
| `CORS_ORIGIN` | the website's address(es), e.g. `https://urban-hive.co,https://urbayt.vercel.app` |

After deploying, `https://<api-project>.vercel.app/api/health` should show
`{"ok":true}`.

Things to know on Vercel:

- Requests are limited to 4.5 MB. The admin panel shrinks photos in the browser
  and splits uploads so each request stays under it.
- The login limit (10 tries per 15 minutes) is counted per running instance,
  so it's looser than on a single server.

### API on another host

Render, Railway or Fly.io work too: root directory `apps/api`, build command
`npm install`, start command `npm start`, and the same environment variables.

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
