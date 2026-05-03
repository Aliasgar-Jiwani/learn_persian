import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import FillBlank from '../components/FillBlank';
import MCQ from '../components/MCQ';
import Matching from '../components/Matching';
import Rearrange from '../components/Rearrange';
import './ExercisesPage.css';

export default function ExercisesPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete, saveExerciseScore } = useProgress(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const exercises = useMemo(() => {
    if (!chapter) return [];
    return chapter.exercises || [];
  }, [chapter]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const currentExercise = exercises[currentIndex];
  const totalCorrect = results.filter(r => r).length;
  const isComplete = results.length === exercises.length;

  function handleExerciseComplete(correct) {
    setResults(prev => {
      const updated = [...prev];
      updated[currentIndex] = correct;
      return updated;
    });
    saveExerciseScore(currentExercise.id, correct ? 1 : 0);
  }

  function handleNext() {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      markComplete('exercises');
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setResults([]);
  }

  function renderExercise(exercise) {
    const key = `${exercise.id}-${currentIndex}`;
    switch (exercise.type) {
      case 'fill_blank':
        return <FillBlank key={key} exercise={exercise} onComplete={handleExerciseComplete} />;
      case 'mcq':
        return <MCQ key={key} exercise={exercise} onComplete={handleExerciseComplete} />;
      case 'matching':
        return <Matching key={key} exercise={exercise} onComplete={handleExerciseComplete} />;
      case 'rearrange':
        return <Rearrange key={key} exercise={exercise} onComplete={handleExerciseComplete} />;
      default:
        return <div>Unknown exercise type</div>;
    }
  }

  return (
    <div className="exercises-page">
      <div className="exercises-page__header">
        <Link to={`/chapter/${id}`} className="exercises-page__back">← Back</Link>
        <h1 className="exercises-page__title">📝 Exercises</h1>
        <p className="exercises-page__subtitle" dir="rtl">{chapter.title}</p>
      </div>

      {/* Progress indicator */}
      <div className="exercises-page__progress">
        <div className="exercises-page__progress-bar">
          <div
            className="exercises-page__progress-fill"
            style={{ width: `${((currentIndex + (results[currentIndex] !== undefined ? 1 : 0)) / exercises.length) * 100}%` }}
          />
        </div>
        <span className="exercises-page__counter">
          {Math.min(currentIndex + 1, exercises.length)} / {exercises.length}
        </span>
      </div>

      {/* Exercise Area */}
      {!isComplete ? (
        <div className="exercises-page__content">
          {currentExercise && renderExercise(currentExercise)}

          {results[currentIndex] !== undefined && currentIndex < exercises.length - 1 && (
            <button className="exercises-page__next-btn" onClick={handleNext}>
              Next Exercise →
            </button>
          )}
          {results[currentIndex] !== undefined && currentIndex === exercises.length - 1 && (
            <button className="exercises-page__next-btn" onClick={handleNext}>
              Finish! 🎉
            </button>
          )}
        </div>
      ) : (
        <div className="exercises-page__results">
          <div className="results-card">
            <div className="results-card__emoji">
              {totalCorrect === exercises.length ? '🏆' : totalCorrect >= exercises.length / 2 ? '⭐' : '💪'}
            </div>
            <h2 className="results-card__title">
              {totalCorrect === exercises.length ? 'Perfect Score!' : totalCorrect >= exercises.length / 2 ? 'Great Job!' : 'Keep Practicing!'}
            </h2>
            <div className="results-card__score">
              <span className="results-card__number">{totalCorrect}</span>
              <span className="results-card__total">/ {exercises.length} correct</span>
            </div>
            <div className="results-card__bar">
              <div
                className="results-card__bar-fill"
                style={{ width: `${(totalCorrect / exercises.length) * 100}%` }}
              />
            </div>
            <div className="results-card__actions">
              <button className="results-card__retry" onClick={handleRestart}>
                Try Again
              </button>
              <Link to={`/chapter/${id}`} className="results-card__done">
                Back to Chapter
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
