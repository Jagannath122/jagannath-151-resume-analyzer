<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/aea9b032-f9d0-46e0-83a9-66f84fdc2553

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Import this repository into Vercel with the project root as the Root Directory.
2. Add `GEMINI_API_KEY` under **Settings → Environment Variables** and select **Production** (and **Preview** if needed). Do not commit `.env.local`.
3. Deploy. Vercel uses `vercel.json` to build the Vite frontend and expose the API from the same deployment and domain.

Resume uploads on Vercel are limited to 2.5 MB because serverless functions have a request-body size limit. Local development supports PDFs up to 25 MB.
