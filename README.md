<div align="center">

# ResuPulse AI
### Next-Gen Multimodal Resume & CV Analyzer with Real-Time AI Streaming

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Google%20Gen%20AI-Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

ResuPulse AI is a modern, pure client-side web application for in-depth resume audits, ATS compatibility checks, benchmark comparisons, and executive prompt engineering. 

Everything runs directly in your browser using Google's `@google/genai` SDK—**no separate backend server, no proxy lambdas, and no serverless execution timeout limits.**

---

## Key Features

- **100% Frontend-Only Architecture**: Only **1 single server** needed for local development (`npm run dev`). No backend setup, port collisions, or proxy configurations.
- **Real-Time AI Streaming & Live Reasoning**: Uses `generateContentStream` with `includeThoughts: true` to stream Gemini 2.5 Flash's deep multimodal reasoning directly to the UI. Live progress tickers and thought snippets keep the user updated every second without hanging or timing out.
- **Multimodal PDF Vision**: Analyzes native PDF files directly up to 25 MB, evaluating typography, margins, multi-column risks, and visual layout without relying on plain-text copy-paste.
- **6-Facility Rigorous Grading**:
  - **Impact & Metrics**: Accomplishments, Google XYZ formula, data points, and active verbs.
  - **ATS Formatting**: Single vs. multi-column safety, contact parsing, and table risks.
  - **Skills Relevance**: Hard technical tools, soft skills, and missing modern proficiencies.
  - **Brevity & Density**: Word bloat, filler phrases, and bullet length distribution.
  - **Career Progression**: Narrative trajectory, promotions, and tenure clarity.
  - **Visual Hierarchy**: Margin balance, scannability, and typographical hierarchy.
- **"The Pit" Benchmark Arena**: Pits resumes against 4 top-tier industry standards (FAANG / Tier-1 Tech, High-Growth Startups, Fortune 500, and Elite Consulting).
- **Bullet Lab & Prompt Refiner**: Rewrites weak bullet points using the Google XYZ formula and transforms basic user prompts into recruiter-grade Master Prompts.
- **Career Strategy Generator**: Generates interview prep questions based on detected resume gaps, a 30-60-90 day roadmap, and an optimized LinkedIn headline.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jagannath122/jagannath-151-resume-analyzer.git
   cd jagannath-151-resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` or `.env.local` file in the project root:
   ```env
   VITE_GEMINI_API_KEY="your-gemini-api-key-here"
   ```
   *(Note: `GEMINI_API_KEY` is also supported out of the box).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open the printed localhost URL in your browser. Only one command is required!

---

## Production Build

Build the static distribution:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Deployment (Vercel, Netlify, Cloudflare Pages, GitHub Pages)

Because this app is a 100% client-side SPA, it can be deployed to any static web hosting platform with zero serverless cold starts or timeout limits:

1. Connect your repository to your hosting provider (e.g. Vercel, Netlify, Cloudflare Pages).
2. Configure environment variable:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key.
3. Build Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! All PDF analysis and streaming happen directly between the user's browser and Google GenAI.

---

## Environment Variables

| Variable | Description | Required | Default |
|---|---|---|---|
| `VITE_GEMINI_API_KEY` | Gemini API Key for browser AI calls | **Yes** | - |
| `GEMINI_API_KEY` | Alternative key name fallback | Optional | - |
| `VITE_GEMINI_MODEL` | Gemini Model ID | Optional | `gemini-2.5-flash` |
