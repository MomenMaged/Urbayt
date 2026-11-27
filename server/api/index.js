// Entry point on Vercel. Vercel runs this file as a serverless function and
// calls the exported app for each request (vercel.json sends every path
// here), so unlike src/index.js it must not call app.listen().
// Locally and on other hosts, `npm run dev` / `npm start` use src/index.js.
import { createApp } from "../src/app.js";

export default createApp();
