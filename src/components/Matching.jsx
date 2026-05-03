import { useState, useMemo } from 'react';
import './exercises.css';

export default function Matching({ exercise, onComplete }) {
  const [selectedFarsi, setSelectedFarsi] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  const shuffledEnglish = useMemo(() => {
    return [...exercise.pairs].sort(() => Math.random() - 0.5);
  }, [exercise.pairs]);

  function handleFarsiClick(index) {
    if (matched.includes(index)) return;
    setSelectedFarsi(index);
    setWrongPair(null);
  }

  function handleEnglishClick(engItem) {
    if (selectedFarsi === null) return;

    const farsiItem = exercise.pairs[selectedFarsi];
    if (farsiItem.english === engItem.english) {
      const newMatched = [...matched, selectedFarsi];
      setMatched(newMatched);
      setSelectedFarsi(null);
      
      if (newMatched.length === exercise.pairs.length) {
        if (onComplete) onComplete(true);
      }
    } else {
      setWrongPair({ farsi: selectedFarsi, english: engItem.english });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedFarsi(null);
      }, 800);
    }
  }

  const isEnglishMatched = (engItem) => {
    return matched.some(idx => exercise.pairs[idx].english === engItem.english);
  };

  return (
    <div className="exercise-card">
      <div className="exercise-card__type">Matching</div>
      <div className="exercise-card__instruction">{exercise.instruction}</div>

      <div className="matching-grid">
        <div className="matching-column">
          <div className="matching-column__header">Farsi</div>
          {exercise.pairs.map((pair, i) => (
            <button
              key={i}
              className={`matching-item ${selectedFarsi === i ? 'matching-item--selected' : ''} ${matched.includes(i) ? 'matching-item--matched' : ''} ${wrongPair?.farsi === i ? 'matching-item--wrong' : ''}`}
              onClick={() => handleFarsiClick(i)}
              disabled={matched.includes(i)}
              dir="rtl"
            >
              {pair.farsi}
              {matched.includes(i) && <span className="matching-item__check">✓</span>}
            </button>
          ))}
        </div>

        <div className="matching-column">
          <div className="matching-column__header">English</div>
          {shuffledEnglish.map((pair, i) => (
            <button
              key={i}
              className={`matching-item ${isEnglishMatched(pair) ? 'matching-item--matched' : ''} ${wrongPair?.english === pair.english ? 'matching-item--wrong' : ''}`}
              onClick={() => handleEnglishClick(pair)}
              disabled={isEnglishMatched(pair)}
            >
              {pair.english}
              {isEnglishMatched(pair) && <span className="matching-item__check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {matched.length === exercise.pairs.length && (
        <div className="exercise-card__feedback">
          <div className="feedback-badge feedback-badge--correct">
            ✓ All matched correctly!
          </div>
        </div>
      )}
    </div>
  );
}
