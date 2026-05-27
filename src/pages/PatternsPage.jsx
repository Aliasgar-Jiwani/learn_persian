import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';
import StepLayout from '../components/StepLayout';
import { getImage, getEmoji } from '../data/imageMap';
import { Lightbulb, X, CheckCircle } from 'lucide-react';
import './PatternsPage.css';

export default function PatternsPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);

  // Flatten all patterns into a sequence of steps (examples)
  const steps = useMemo(() => {
    if (!chapter || !chapter.patterns) return [];
    const flat = [];
    chapter.patterns.forEach(pattern => {
      if (pattern.examples) {
        pattern.examples.forEach(ex => {
          flat.push({ pattern, example: ex });
        });
      }
    });
    return flat;
  }, [chapter]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const currentStep = steps[currentIndex];
  const { pattern, example } = currentStep || {};
  const hasGrammarTip = pattern?.grammar_note || pattern?.pronouns_table;

  function handleContinue() {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      markComplete('patterns');
      setIsFinished(true);
    }
  }

  if (isFinished) {
    return (
      <StepLayout
        currentStep={steps.length}
        totalSteps={steps.length}
        onCloseUrl={`/chapter/${id}`}
        onContinue={() => window.location.hash = `/chapter/${id}`}
        continueLabel="Back to Chapter"
        continueVariant="success"
      >
        <div className="patterns-finished">
          <CheckCircle size={64} color="var(--color-correct)" />
          <h2>Great Job!</h2>
          <p>You have completed all grammar patterns for this chapter.</p>
        </div>
      </StepLayout>
    );
  }

  if (!currentStep) return <div>No patterns found.</div>;

  // Helpers for the current example
  const isYesNo = example.type === 'yes_no';
  const englishWord = !isYesNo && example.english 
    ? example.english.replace(/^(This|That) is (a |an )?/, '').replace('.', '').trim() 
    : null;
  const img = englishWord ? getImage(englishWord) : null;
  const emoji = englishWord ? getEmoji(englishWord) : null;

  return (
    <>
      <StepLayout
        currentStep={currentIndex}
        totalSteps={steps.length}
        onCloseUrl={`/chapter/${id}`}
        onContinue={handleContinue}
        continueLabel="Continue"
        continueVariant="primary"
      >
        {/* Pattern Header / Formula */}
        <div className="pattern-step__header">
          <div className="pattern-step__label">{pattern.label}</div>
          <div className="pattern-step__formula">
            <div className="pattern-step__farsi" dir="rtl">{pattern.farsi}</div>
            <div className="pattern-step__english">{pattern.english}</div>
          </div>
          {hasGrammarTip && (
            <button className="pattern-step__tip-btn" onClick={() => setShowGrammarModal(true)}>
              <Lightbulb size={18} />
              <span>Grammar Tip</span>
            </button>
          )}
        </div>

        {/* Current Example */}
        <div className="pattern-step__example-card">
          {!isYesNo ? (
            <div className="example-duo">
              {img ? (
                <div className="example-duo__image-wrap">
                  <img src={img} alt={englishWord} className="example-duo__image" />
                </div>
              ) : emoji ? (
                <div className="example-duo__emoji">{emoji}</div>
              ) : null}
              <div className="example-duo__text">
                <div className="example-duo__farsi" dir="rtl">{example.farsi}</div>
                <div className="example-duo__translit">{example.transliteration}</div>
                <div className="example-duo__english">{example.english}</div>
              </div>
              <SpeakButton text={example.farsi} size="large" />
            </div>
          ) : (
            <div className="example-duo example-duo--qa">
              <div className="example-duo__qa-row">
                <div className="example-duo__qa-label">Q:</div>
                <div className="example-duo__text">
                  <div className="example-duo__farsi" dir="rtl">{example.question.farsi}</div>
                  <div className="example-duo__translit">{example.question.transliteration}</div>
                  <div className="example-duo__english">{example.question.english}</div>
                </div>
                <SpeakButton text={example.question.farsi} size="medium" />
              </div>
              
              <div className="example-duo__qa-row example-duo__qa-row--answer">
                <div 
                  className="example-duo__qa-label" 
                  style={{ color: example.correct_answer === 'yes' ? 'var(--color-correct)' : 'var(--color-wrong)' }}
                >
                  A: {example.correct_answer === 'yes' ? 'بله' : 'خیر'}
                </div>
                <div className="example-duo__text">
                  {example.explanation?.positive && (
                    <>
                      <div className="example-duo__farsi" dir="rtl">{example.explanation.positive.farsi}</div>
                      <div className="example-duo__english">{example.explanation.positive.english}</div>
                    </>
                  )}
                  {example.explanation?.negative && (
                    <>
                      <div className="example-duo__farsi" dir="rtl">{example.explanation.negative.farsi}</div>
                      <div className="example-duo__english">{example.explanation.negative.english}</div>
                      {example.explanation.correction && (
                        <div className="example-duo__correction">
                          <span>→ </span>
                          <span dir="rtl">{example.explanation.correction.farsi}</span>
                          <span> ({example.explanation.correction.english})</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </StepLayout>

      {/* Grammar Modal */}
      {showGrammarModal && hasGrammarTip && (
        <div className="modal-overlay" onClick={() => setShowGrammarModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowGrammarModal(false)}>
              <X size={24} />
            </button>
            <h3 className="modal-title">
              <Lightbulb size={24} className="modal-title-icon" /> 
              Grammar Tip
            </h3>
            
            {pattern.grammar_note && (
              <p className="modal-note">{pattern.grammar_note}</p>
            )}

            {pattern.pronouns_table && (
              <div className="modal-table-wrap">
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>فارسی</th>
                      <th>English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pattern.pronouns_table.map((pr, idx) => (
                      <tr key={idx}>
                        <td dir="rtl" className="modal-table-fa">{pr.farsi}</td>
                        <td className="modal-table-en">{pr.english}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
