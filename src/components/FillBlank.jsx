import { useState } from 'react';
import SpeakButton from './SpeakButton';
import './exercises.css';

export default function FillBlank({ exercise, onComplete }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const wordBank = [
    exercise.answer_farsi,
    ...getDistractors(exercise.answer_farsi)
  ].sort(() => Math.random() - 0.5);

  function getDistractors(correct) {
    const distractors = ['کتاب', 'میز', 'در', 'قلم', 'بزرگ', 'کوچک', 'نیست', 'است', 'مداد', 'دفتر'];
    return distractors.filter(w => w !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
  }

  function handleSubmit() {
    const correct = userAnswer.trim() === exercise.answer_farsi;
    setIsCorrect(correct);
    setSubmitted(true);
    if (onComplete) onComplete(correct);
  }

  function handleWordBankClick(word) {
    if (!submitted) {
      setUserAnswer(word);
    }
  }

  return (
    <div className={`exercise-card ${submitted ? (isCorrect ? 'exercise-card--correct' : 'exercise-card--wrong') : ''}`}>
      <div className="exercise-card__type">Fill in the Blank</div>
      
      <div className="exercise-card__question" dir="rtl">
        <span className="exercise-card__farsi-text">
          {exercise.question_farsi.replace('___', userAnswer || '______')}
        </span>
      </div>

      <div className="exercise-card__question-english">
        {exercise.question_english}
      </div>

      {!submitted && (
        <>
          <div className="exercise-card__word-bank">
            {wordBank.map((word, i) => (
              <button
                key={i}
                className={`word-chip ${userAnswer === word ? 'word-chip--selected' : ''}`}
                onClick={() => handleWordBankClick(word)}
                dir="rtl"
              >
                {word}
              </button>
            ))}
          </div>

          <button
            className="exercise-card__submit"
            onClick={handleSubmit}
            disabled={!userAnswer}
          >
            Check Answer
          </button>
        </>
      )}

      {submitted && (
        <div className="exercise-card__feedback">
          <div className={`feedback-badge ${isCorrect ? 'feedback-badge--correct' : 'feedback-badge--wrong'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          {!isCorrect && (
            <div className="exercise-card__answer">
              <span>Correct answer: </span>
              <span dir="rtl" className="exercise-card__farsi-text">{exercise.answer_farsi}</span>
              <span className="exercise-card__translit"> ({exercise.answer_transliteration})</span>
              <SpeakButton text={exercise.answer_farsi} size="small" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
