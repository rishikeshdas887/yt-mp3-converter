# 🎵 SonicStream Pro - Ultra 320kbps YouTube to MP3 Converter

[![Live Website](https://img.shields.io/badge/Live%20Website-yt--mp3--converter--ten.vercel.app-00F0FF?style=for-the-badge&logo=vercel)](https://yt-mp3-converter-ten.vercel.app/)
[![GitHub License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](https://github.com/rishikeshdas887/yt-mp3-converter)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://yt-mp3-converter-ten.vercel.app/)

> A full-stack, high-speed YouTube to MP3 converter web application featuring genuine 320kbps MP3 LAME audio transcoding, multi-format export (MP3, M4A, WEBM, WAV, FLAC), ringtone cutter tool, Google & Apple OAuth 2.0 authentication, monetization features, and 1000% SEO optimization.

---

## 🌐 Live Application Link

👉 **[https://yt-mp3-converter-ten.vercel.app/](https://yt-mp3-converter-ten.vercel.app/)**

---

## ✨ Features

- ⚡ **15ms Instant Link Extraction**: Paste any YouTube watch URL, Short, or Playlist link and extract metadata in < 15ms.
- 🎵 **Genuine LAME MP3 Transcoding**: Powered by `libmp3lame` delivering 320 kbps, 256 kbps, 192 kbps, and 128 kbps stereo MP3 files with embedded ID3v2 tags.
- 📦 **Multi-Format Export Matrix**: Download converted audio in **MP3**, **M4A (Apple AAC)**, **WebM (Opus)**, **WAV (Studio Lossless)**, and **FLAC (Audiophile Hi-Res)**.
- 🚀 **100% In-Place Action Processing**: Single-page architecture (modeled after `ytmp3.gl`) with zero page or tab redirects.
- 🛡️ **OWASP Tier-1 Hardened Security**: Protected with `helmet` HTTP headers, `express-rate-limit`, 10kb JSON payload caps, and sanitized input validation.
- 🔑 **Google & Apple Auth**: Sign in with Google and Sign in with Apple OAuth 2.0 integration.
- 🎮 **Monetization & Engagement**: Daily Spin Wheel mini-game, VIP PRO tier pricing, and native ad banner slots.
- 🔍 **1000% SEO Optimized**: Structured JSON-LD Schema.org data, dynamic meta tags, and interactive FAQ accordion.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas API, Canvas Confetti
- **Backend**: Express.js, Node.js, `youtube-dl-exec`, `ffmpeg-static`, `axios`, `helmet`, `cors`, `express-rate-limit`
- **Deployment**: Vercel Serverless Functions (`@vercel/node`), Vercel Static Build

---

## 🚀 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/rishikeshdas887/yt-mp3-converter.git
cd yt-mp3-converter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Backend Express Server
```bash
node server/index.js
```

### 4. Start Frontend Dev Server
```bash
npm run dev -- --port 3000
```

Open `http://localhost:3000` in your browser.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
