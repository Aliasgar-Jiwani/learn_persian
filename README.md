# Learn Persian (فارسی بیاموزید)

A modern, interactive web application designed to help users learn the Persian (Farsi) language. The application features a premium, responsive glassmorphic UI, native audio integration, and a variety of interactive exercises to master vocabulary, grammar patterns, and reading comprehension.

## Features

- **Premium UI/UX:** A beautiful, responsive design system utilizing CSS variables, glassmorphism, and smooth micro-animations.
- **Interactive Exercises:** Multiple exercise types including Fill in the Blanks, Multiple Choice (MCQ), Word Matching, and Sentence Rearrangement.
- **Audio Integration:** Pre-generated native Persian text-to-speech audio for vocabulary words and sentences.
- **Local Progress Tracking:** Automatically saves your chapter completion and exercise scores locally in your browser.
- **Structured Learning:** Organized into chapters focusing on specific vocabulary sets, grammar patterns, and reading materials.

## Tech Stack

- **Framework:** React.js powered by Vite
- **Routing:** React Router (`react-router-dom`)
- **Styling:** Vanilla CSS with custom design tokens (`index.css`)
- **Icons:** Lucide React (`lucide-react`)

## Project Structure

```text
├── public/                 # Static assets and pre-generated audio files
├── scripts/
│   └── generate-audio.js   # Node.js script to fetch and generate TTS audio files
├── src/
│   ├── components/         # Reusable UI components (BottomNav, SpeakButton, Exercises, etc.)
│   ├── data/               # JSON configuration files for lessons and vocabulary
│   │   └── chapters/       # Individual chapter content (e.g., chapter1_farsi.json)
│   ├── hooks/              # Custom React hooks (useChapter, useProgress, useSpeech)
│   ├── pages/              # Main application views (Home, Vocabulary, Reading, Exercises, etc.)
│   ├── App.jsx             # Main application routing and structure
│   ├── App.css             # Global layout styles
│   └── index.css           # Global design system (colors, typography, utility classes)
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aliasgar-Jiwani/learn_persian.git
   cd learn_persian
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Generating Audio Files

The application uses pre-generated audio files to ensure consistent, high-quality Persian Text-to-Speech playback across all devices without relying on OS-level voice packs.

To generate new audio files for updated vocabulary or sentences, run:

```bash
node scripts/generate-audio.js
```

This script reads the Persian text from the JSON data files, fetches the TTS audio, and saves the MP3 files into the `public/audio/` directory.
