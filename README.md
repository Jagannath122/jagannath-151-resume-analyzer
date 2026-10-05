# ResuPulse AI - Multimodal Resume Analyzer

A pure client-side React + Vite web application for AI-powered resume analysis, facility grading, benchmark pit comparison, bullet point optimization, and career strategy.

All AI features run directly in the frontend using the `@google/genai` SDK—no separate backend server or serverless proxy needed!

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your Gemini API key in `.env.local` or `.env`:
   ```bash
   VITE_GEMINI_API_KEY="your-gemini-api-key"
   ```
   *(Note: `GEMINI_API_KEY` is also supported)*

3. Run the development server (only 1 single dev server needed):
   ```bash
   npm run dev
   ```

4. Open the displayed URL (e.g. `http://localhost:3000` or `http://localhost:5173`) in your browser.

## Build and Preview

```bash
npm run build
npm run preview
```

## Deploy to Vercel / Netlify / GitHub Pages

Because this application runs 100% in the frontend, you can deploy it as a static website to any hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages):

1. Set `VITE_GEMINI_API_KEY` in your hosting provider's Environment Variables settings.
2. Build command: `npm run build`
3. Output directory: `dist`
