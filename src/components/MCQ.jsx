import { useState } from 'react';
import './exercises.css';

export default function MCQ({ exercise, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(index) {
    if (submitted) return;
    setSelected(index);
    setSubmitted(true);
    const correct = index === exercise.correct_index;
    if (onComplete) onComplete(correct);
  }

  return (
    <div className="exercise-card">
      <div className="exercise-card__type">Multiple Choice</div>

      <div className="exercise-card__question">
        {exercise.question.farsi && (
          <div className="exercise-card__farsi-text" dir="rtl">{exercise.question.farsi}</div>
        )}
        {exercise.question.english && (
          <div className="exercise-card__question-english">{exercise.question.english}</div>
        )}
      </div>

      <div className="mcq-options">
        {exercise.options.map((option, i) => {
          let className = 'mcq-option';
          if (submitted) {
            if (i === exercise.correct_index) className += ' mcq-option--correct';
            else if (i === selected) className += ' mcq-option--wrong';
          } else if (i === selected) {
            className += ' mcq-option--selected';
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={submitted}
              dir={option.farsi ? 'rtl' : 'ltr'}
            >
              <span className="mcq-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="mcq-option__text">
                {option.farsi || option.english}
              </span>
              {submitted && i === exercise.correct_index && (
                <span className="mcq-option__icon">✓</span>
              )}
              {submitted && i === selected && i !== exercise.correct_index && (
                <span className="mcq-option__icon">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="exercise-card__feedback">
          <div className={`feedback-badge ${selected === exercise.correct_index ? 'feedback-badge--correct' : 'feedback-badge--wrong'}`}>
            {selected === exercise.correct_index ? '✓ Correct!' : '✗ Incorrect'}
          </div>
        </div>
      )}
    </div>
  );
}
