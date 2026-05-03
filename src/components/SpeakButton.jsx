import { useSpeech } from '../hooks/useSpeech';
import './SpeakButton.css';

export default function SpeakButton({ text, lang = 'fa-IR', size = 'medium' }) {
  const { speak, isSpeaking } = useSpeech();

  const handleClick = (e) => {
    e.stopPropagation();
    speak(text, lang);
  };

  return (
    <button
      type="button"
      className={`speak-btn speak-btn--${size} ${isSpeaking ? 'speak-btn--active' : ''}`}
      onClick={handleClick}
      title="Listen to pronunciation"
      aria-label="Play audio pronunciation"
    >
      <svg className="speak-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {isSpeaking ? (
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" className="speak-btn__wave speak-btn__wave--1" />
            <path d="M19.07 4.93a10 10 0 010 14.14" className="speak-btn__wave speak-btn__wave--2" />
          </>
        ) : (
          <path d="M15.54 8.46a5 5 0 010 7.07" />
        )}
      </svg>
    </button>
  );
}
