import { useState, useMemo } from 'react';
import './exercises.css';

export default function Rearrange({ exercise, onComplete }) {
  const shuffledWords = useMemo(() => {
    return [...exercise.words_farsi].sort(() => Math.random() - 0.5);
  }, [exercise.words_farsi]);

  const [availableWords, setAvailableWords] = useState(shuffledWords);
  const [sentence, setSentence] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleAddWord(word, index) {
    setSentence([...sentence, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  }

  function handleRemoveWord(word, index) {
    if (submitted) return;
    setAvailableWords([...availableWords, word]);
    setSentence(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    const userSentence = sentence.join(' ');
    // Remove the period/question mark from correct for comparison
    const correctBase = exercise.correct_sentence_farsi.replace(/[.؟?]/g, '').trim();
    const userBase = userSentence.replace(/[.؟?]/g, '').trim();
    const correct = userBase === correctBase;
    setIsCorrect(correct);
    setSubmitted(true);
    if (onComplete) onComplete(correct);
  }

  function handleReset() {
    setAvailableWords(shuffledWords);
    setSentence([]);
    setSubmitted(false);
    setIsCorrect(false);
  }

  return (
    <div className={`exercise-card ${submitted ? (isCorrect ? 'exercise-card--correct' : 'exercise-card--wrong') : ''}`}>
      <div className="exercise-card__type">Word Rearrangement</div>
      <div className="exercise-card__instruction">{exercise.instruction}</div>
      <div className="exercise-card__question-english">{exercise.correct_sentence_english}</div>

      {/* Sentence building area */}
      <div className="rearrange-sentence" dir="rtl">
        {sentence.length === 0 ? (
          <span className="rearrange-sentence__placeholder">Tap words below to build the sentence</span>
        ) : (
          sentence.map((word, i) => (
            <button
              key={i}
              className="word-chip word-chip--placed"
              onClick={() => handleRemoveWord(word, i)}
              dir="rtl"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available words */}
      {!submitted && (
        <>
          <div className="rearrange-words">
            {availableWords.map((word, i) => (
              <button
                key={i}
                className="word-chip"
                onClick={() => handleAddWord(word, i)}
                dir="rtl"
              >
                {word}
              </button>
            ))}
          </div>

          <button
            className="exercise-card__submit"
            onClick={handleSubmit}
            disabled={availableWords.length > 0}
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
            <div className="exercise-card__answer" dir="rtl">
              <span>Correct: </span>
              <span className="exercise-card__farsi-text">{exercise.correct_sentence_farsi}</span>
            </div>
          )}
          <button className="exercise-card__retry" onClick={handleReset}>Try Again</button>
        </div>
      )}
    </div>
  );
}
