import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import VocabCard from '../components/VocabCard';
import StepLayout from '../components/StepLayout';
import { CheckCircle } from 'lucide-react';
import './VocabularyPage.css';

const categoryLabels = {
  nouns_objects: 'Object',
  nouns_people: 'Person',
  nouns_places: 'Place',
  function_words: 'Function Word',
  pronouns: 'Pronoun',
  subject_vocab: 'Subject',
  adjectives: 'Adjective'
};

import { chapters } from '../data/chapters';

export default function VocabularyPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = useMemo(() => {
    if (!chapter) return [];
    
    // Collect Farsi words from all previous chapters
    const previousWords = new Set();
    const currentIdx = chapters.findIndex(c => c.id === id);
    if (currentIdx > 0) {
      for (let i = 0; i < currentIdx; i++) {
        const prevCh = chapters[i].data;
        if (prevCh.vocabulary) {
          Object.values(prevCh.vocabulary).forEach(group => {
            if (Array.isArray(group)) {
              group.forEach(item => previousWords.add(item.farsi));
            }
          });
        }
        if (prevCh.adjectives) {
          prevCh.adjectives.forEach(item => previousWords.add(item.farsi));
        }
      }
    }

    const flat = [];
    
    // Add vocabulary
    if (chapter.vocabulary) {
      Object.keys(chapter.vocabulary).forEach(key => {
        const items = chapter.vocabulary[key];
        if (items) {
          items.forEach(item => {
            if (!previousWords.has(item.farsi)) {
              flat.push({ item, category: categoryLabels[key] || key, isAdjective: false });
            }
          });
        }
      });
    }
    
    // Add adjectives
    if (chapter.adjectives) {
      chapter.adjectives.forEach(item => {
        if (!previousWords.has(item.farsi)) {
          flat.push({ item, category: 'Adjective', isAdjective: true });
        }
      });
    }
    
    return flat;
  }, [chapter]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const currentStep = steps[currentIndex];

  function handleContinue() {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      markComplete('vocabulary');
      setIsFinished(true);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }

  if (isFinished) {
    return (
      <StepLayout
        currentStep={steps.length}
        totalSteps={steps.length}
        onCloseUrl={`/chapter/${id}`}
        onContinue={() => window.location.hash = `/chapter/${id}`}
        onBack={() => setIsFinished(false)}
        continueLabel="Back to Chapter"
        continueVariant="success"
      >
        <div className="vocab-finished">
          <CheckCircle size={64} color="var(--color-correct)" />
          <h2>Great Job!</h2>
          <p>You have reviewed all the vocabulary for this chapter.</p>
        </div>
      </StepLayout>
    );
  }

  if (!currentStep) return <div>No vocabulary found.</div>;

  return (
    <StepLayout
      currentStep={currentIndex}
      totalSteps={steps.length}
      onCloseUrl={`/chapter/${id}`}
      onContinue={handleContinue}
      onBack={currentIndex > 0 ? handleBack : undefined}
      continueLabel="Continue"
    >
      <div className="vocab-step__category">
        {currentStep.category}
      </div>
      <div className="vocab-step__card-wrap">
        <VocabCard
          key={`${currentIndex}`} // Force re-render to reset flip state
          item={currentStep.item}
          showOpposite={currentStep.isAdjective}
        />
      </div>
    </StepLayout>
  );
}
