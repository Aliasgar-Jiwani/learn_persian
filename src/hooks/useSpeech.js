import { useState, useCallback, useRef, useEffect } from 'react';
import audioMap from '../data/audioMap.json';

/**
 * useSpeech — plays pre-recorded Persian audio files.
 *
 * Strategy:
 *  1. Look up the text in audioMap.json → play the matching MP3.
 *  2. Cache Audio objects in memory so repeated plays are instant.
 *  3. Fallback: browser SpeechSynthesis (only if a Persian voice exists).
 */

// In-memory cache: audio URL → Audio element (avoids re-fetching)
const audioCache = new Map();

function getCachedAudio(url) {
  if (audioCache.has(url)) return audioCache.get(url);
  const audio = new Audio(url);
  audioCache.set(url, audio);
  return audio;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((text, lang = 'fa-IR') => {
    // Stop any current playback first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
    }

    // --- Strategy 1: Pre-recorded audio from audioMap ---
    const audioPath = audioMap[text];
    if (audioPath) {
      const audio = getCachedAudio(audioPath);
      audioRef.current = audio;

      // Reset to beginning in case it was played before
      audio.currentTime = 0;

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        console.warn(`Failed to play pre-recorded audio for: "${text}"`);
        setIsSpeaking(false);
        // Try fallback
        tryBrowserSpeech(text, lang);
      };

      audio.play().catch(() => {
        tryBrowserSpeech(text, lang);
      });
      return;
    }

    // --- Strategy 2: Browser SpeechSynthesis fallback ---
    tryBrowserSpeech(text, lang);
  }, []);

  function tryBrowserSpeech(text, lang) {
    if (!window.speechSynthesis) {
      console.warn('TTS: No audio source available for:', text);
      setIsSpeaking(false);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    let voice =
      voices.find(v => v.lang.startsWith('fa')) ||
      voices.find(v => v.lang.startsWith('ar'));

    if (!voice) {
      console.warn('TTS: No pre-recorded audio and no Persian voice for:', text);
      setIsSpeaking(false);
      return;
    }

    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
