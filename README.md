# 🍅 TomatoGuard AI

**TomatoGuard AI** is a state-of-the-art agricultural diagnostic tool designed to help farmers and gardeners identify tomato plant diseases instantly using advanced Deep Learning.

Built with a performance-first approach, it combines a high-speed **MaxViT-based** inference engine with a sleek, responsive **Next.js** dashboard.

## 🚀 Key Features
- 🔍 **Instant Diagnosis**: Detects 10+ tomato leaf diseases with high precision.
- 📂 **Cloud History**: Every scan is stored securely in **Neon PostgreSQL** with snapshots on **Cloudinary**.
- 🌓 **Adaptive UI**: Beautiful, premium design that respects your system's light and dark mode preferences.
- 📋 **Detailed Insights**: Get specialized treatment and prevention protocols for every identified disease.
- 📱 **Mobile Ready**: Fully responsive design for field use.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons, Shadcn UI
- **Backend**: FastAPI (Python), PyTorch, MaxViT Architecture
- **Infrastructure**: Neon PostgreSQL (Database), Cloudinary (Image Hosting), Vercel/Render

## 👨‍💻 Author
Developed by **Lavudya Raja**.
Check out my portfolio for more projects like this!
👉 **[lavudyaraja.in](https://lavudyaraja.in)**

---

## 🚦 Getting Started

### 1. Requirements
Ensure you have Node.js 18+ and Python 3.10+ installed.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/lavudyaraja/Tomatoguard-ai.git

# Install frontend dependencies
cd tomatoguard-ai
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the frontend directory with:
- `DATABASE_URL` (Neon PostgreSQL)
- `BACKEND_URL` (FastAPI Server)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 4. Run the Development Server
```bash
npm run dev
```

---
*TomatoGuard AI — Protecting your crops with the power of Intelligence.*
