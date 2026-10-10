# CareerPulse — Job Application Tracker 🚀

A modern, high-performance **Job Application Tracker** built with **React, Tailwind CSS, GSAP, Vite, IndexedDB, and Browser Cookies**. Ready for one-click deployment on **GitHub Pages**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8.svg)
![Storage](https://img.shields.io/badge/Storage-IndexedDB-emerald.svg)

---

## ✨ Features

- 📋 **Interactive Kanban Board**: 5 customizable pipeline stages (*Applied*, *Screening*, *Interview*, *Offer*, *Rejected*) with fluid Drag & Drop powered by `@hello-pangea/dnd`.
- 📊 **Dynamic Analytics Dashboard**: Funnel conversion visualizers, timeline trend lines, and salary benchmark charts using **Recharts**.
- 🎬 **Smooth GSAP Animations**: Smooth tab transitions and card animations.
- 🎉 **Celebration Physics**: Instant confetti celebration (`canvas-confetti`) when moving any job to the **Offer** stage.
- 📅 **Interview Calendar**: Month-view scheduling for recruiter screenings, technical assessments, and panel loops.
- 🧠 **Interview Notes & Question Bank**: Keep track of technical & behavioral questions with your talking points.
- 🏢 **Company Directory**: Aggregated insights and active application counts grouped by company.
- 💾 **IndexedDB Local Storage**: Unlimited offline-first storage via IndexedDB with zero server dependency.
- 🍪 **Cookie-Based Preferences**: Persists interface theme (`light`/`dark`/`system`), view mode (`kanban`/`list`), and layout density in browser cookies via `js-cookie`.
- 🔄 **Data Portability**: Full JSON backup export and import with validation, plus one-click demo dataset reset.
- 🌐 **Deploy Ready for GitHub Pages**: Includes relative asset base configuration and GitHub Actions workflow.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [idb](https://github.com/jakearchibald/idb)
- **Preferences**: [js-cookie](https://github.com/js-cookie/js-cookie)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` (or `v22+`)
- npm `v9+` or `v10+`

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd JobTracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Building & Deploying to GitHub Pages

### Option 1: Automatic via GitHub Actions (Recommended)
This repository includes a ready-to-use GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CareerPulse Job Tracker"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Push to `main` branch to trigger automated deployment!

### Option 2: Manual Build
```bash
npm run build
```
The output will be generated in `dist/` with relative asset links (`base: './'`), ready to be served by any static web host or GitHub Pages.
