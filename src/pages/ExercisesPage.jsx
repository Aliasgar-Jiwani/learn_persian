import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import FillBlank from '../components/FillBlank';
import MCQ from '../components/MCQ';
import Matching from '../components/Matching';
import Rearrange from '../components/Rearrange';
import StepLayout from '../components/StepLayout';
import './ExercisesPage.css';

export default function ExercisesPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete, saveExerciseScore } = useProgress(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const exercises = useMemo(() => {
    if (!chapter) return [];
    return chapter.exercises || [];
  }, [chapter]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const currentExercise = exercises[currentIndex];
  const totalCorrect = results.filter(r => r).length;
  const isAnswered = results[currentIndex] !== undefined;
  const isCorrect = results[currentIndex] === true;

  function handleExerciseComplete(correct) {
    setResults(prev => {
      const updated = [...prev];
      updated[currentIndex] = correct;
      return updated;
    });
    saveExerciseScore(currentExercise.id, correct ? 1 : 0);
  }

  function handleContinue() {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      markComplete('exercises');
      setShowResults(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setResults([]);
    setShowResults(false);
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

  if (showResults) {
    return (
      <StepLayout
        currentStep={exercises.length}
        totalSteps={exercises.length}
        onCloseUrl={`/chapter/${id}`}
        onContinue={() => window.location.hash = `/chapter/${id}`}
        continueLabel="Back to Chapter"
        continueVariant="success"
      >
        <div className="exercises-results">
          <div className="exercises-results__emoji">
            {totalCorrect === exercises.length ? '🏆' : totalCorrect >= exercises.length / 2 ? '⭐' : '💪'}
          </div>
          <h2 className="exercises-results__title">
            {totalCorrect === exercises.length ? 'Perfect Score!' : totalCorrect >= exercises.length / 2 ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <div className="exercises-results__score">
            <span className="exercises-results__number">{totalCorrect}</span>
            <span className="exercises-results__total">/ {exercises.length} correct</span>
          </div>
          <div className="exercises-results__bar">
            <div
              className="exercises-results__bar-fill"
              style={{ width: `${(totalCorrect / exercises.length) * 100}%` }}
            />
          </div>
          <button className="btn-secondary" onClick={handleRestart} style={{marginTop: '24px', width: '100%', padding: '12px', borderRadius: '16px', fontWeight: 'bold'}}>
            Try Again
          </button>
        </div>
      </StepLayout>
    );
  }

  return (
    <StepLayout
      currentStep={currentIndex}
      totalSteps={exercises.length}
      onCloseUrl={`/chapter/${id}`}
      onContinue={handleContinue}
      continueLabel={isAnswered ? "Continue" : "Select an answer"}
      continueDisabled={!isAnswered}
      continueVariant={isAnswered ? (isCorrect ? "success" : "danger") : "primary"}
    >
      <div className="exercises-content">
        {currentExercise && renderExercise(currentExercise)}
      </div>
    </StepLayout>
  );
}
