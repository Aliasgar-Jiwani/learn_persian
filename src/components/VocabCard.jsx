import { useState } from 'react';
import SpeakButton from './SpeakButton';
import { getImage, getEmoji } from '../data/imageMap';
import './VocabCard.css';

export default function VocabCard({ item, showOpposite = false }) {
  const [flipped, setFlipped] = useState(false);
  const image = getImage(item.english);
  const emoji = getEmoji(item.english);

  return (
    <div className="vocab-card-wrapper">
      <div className={`vocab-card ${flipped ? 'vocab-card--flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        {/* Front: Image Side */}
        <div className="vocab-card__front">
          <div className="vocab-card__image-container">
            {image ? (
              <img src={image} alt={item.english} className="vocab-card__image" loading="lazy" />
            ) : (
              <div className="vocab-card__emoji-fallback">
                <span>{emoji}</span>
              </div>
            )}
            {/* Arrow + Label Overlay */}
            <div className="vocab-card__overlay">
              <svg className="vocab-card__arrow" viewBox="0 0 100 60" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-primary)" />
                  </marker>
                </defs>
                <line x1="10" y1="50" x2="70" y2="15" stroke="var(--color-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
              <div className="vocab-card__farsi-label" dir="rtl">{item.farsi}</div>
            </div>
          </div>
          <div className="vocab-card__hint">Tap to flip</div>
        </div>

        {/* Back: Details Side */}
        <div className="vocab-card__back">
          <div className="vocab-card__farsi" dir="rtl">{item.farsi}</div>
          <div className="vocab-card__transliteration">{item.transliteration}</div>
          <div className="vocab-card__english">{item.english}</div>
          {item.difficulty && (
            <span className={`vocab-card__badge vocab-card__badge--${item.difficulty}`}>
              {item.difficulty}
            </span>
          )}
          <div className="vocab-card__audio" onClick={(e) => e.stopPropagation()}>
            <SpeakButton text={item.farsi} size="large" />
          </div>
        </div>
      </div>

      {/* Opposite pair */}
      {showOpposite && item.opposite && (
        <div className="vocab-card__opposite">
          <div className="vocab-card__opposite-arrow">↔</div>
          <div className="vocab-card__opposite-content">
            <span className="vocab-card__farsi-small" dir="rtl">{item.opposite.farsi}</span>
            <span className="vocab-card__translit-small">{item.opposite.transliteration}</span>
            <span className="vocab-card__english-small">{item.opposite.english}</span>
            <SpeakButton text={item.opposite.farsi} size="small" />
          </div>
        </div>
      )}
    </div>
  );
}
