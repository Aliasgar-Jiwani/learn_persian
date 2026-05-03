/**
 * generate-audio.js
 * 
 * Build-time script: generates MP3 files for all Persian text
 * entries listed in audioMap.json using Microsoft Edge TTS
 * (high-quality neural voices, free, no API key).
 * 
 * Usage:  node scripts/generate-audio.js
 *   --force   Regenerate all files (even if they already exist)
 *   --dry-run Show what would be generated without creating files
 *   --male    Use male voice (fa-IR-FaridNeural) instead of female
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { EdgeTTS } from 'edge-tts-universal';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AUDIO_MAP_PATH = join(__dirname, '..', 'src', 'data', 'audioMap.json');
const PUBLIC_DIR = join(__dirname, '..', 'public');

const VOICE_FEMALE = 'fa-IR-DilaraNeural';
const VOICE_MALE = 'fa-IR-FaridNeural';

const FORCE = process.argv.includes('--force');
const DRY_RUN = process.argv.includes('--dry-run');
const VOICE = process.argv.includes('--male') ? VOICE_MALE : VOICE_FEMALE;

// Small delay between requests to be respectful to the service
const DELAY_MS = 300;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateOne(text, outputPath) {
  const dir = dirname(outputPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const tts = new EdgeTTS(text, VOICE, { rate: '-10%' });
  const result = await tts.synthesize();
  const buffer = Buffer.from(await result.audio.arrayBuffer());

  if (buffer.length < 100) {
    throw new Error(`Audio too small (${buffer.length} bytes)`);
  }

  writeFileSync(outputPath, buffer);
  return buffer.length;
}

async function main() {
  const audioMap = JSON.parse(readFileSync(AUDIO_MAP_PATH, 'utf-8'));
  const entries = Object.entries(audioMap);

  console.log(`\n🎙️  Persian Audio Generator (Microsoft Edge TTS)`);
  console.log(`   Voice: ${VOICE}`);
  console.log(`   ${entries.length} entries found in audioMap.json`);
  if (DRY_RUN) console.log(`   🔍 DRY RUN — no files will be created`);
  if (FORCE) console.log(`   ⚡ FORCE — regenerating all files`);
  console.log();

  let created = 0;
  let skipped = 0;
  let failed = 0;
  let totalBytes = 0;

  for (let i = 0; i < entries.length; i++) {
    const [text, relativePath] = entries[i];
    const outputPath = join(PUBLIC_DIR, relativePath);
    const progress = `[${i + 1}/${entries.length}]`;

    if (!FORCE && existsSync(outputPath)) {
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`  ${progress} WOULD CREATE: ${relativePath}  ← "${text}"`);
      created++;
      continue;
    }

    try {
      const bytes = await generateOne(text, outputPath);
      totalBytes += bytes;
      created++;
      console.log(`  ✅ ${progress} ${relativePath}  (${(bytes / 1024).toFixed(1)} KB)  ← "${text}"`);
    } catch (err) {
      failed++;
      console.error(`  ❌ ${progress} FAILED: "${text}" — ${err.message}`);
    }

    if (i < entries.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created} (${(totalBytes / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`   Skipped (already exist): ${skipped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${entries.length}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
