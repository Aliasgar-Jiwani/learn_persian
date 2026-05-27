import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';
import { getImage, getEmoji } from '../data/imageMap';
import './PatternsPage.css';

export default function PatternsPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [expandedPattern, setExpandedPattern] = useState(0);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const patterns = chapter.patterns || [];

  function handleToggle(index) {
    setExpandedPattern(expandedPattern === index ? -1 : index);
    if (index === patterns.length - 1) {
      markComplete('patterns');
    }
  }

  return (
    <div className="patterns-page">
      <div className="patterns-page__header">
        <Link to={`/chapter/${id}`} className="patterns-page__back">← Back</Link>
        <h1 className="patterns-page__title">📐 Grammar Patterns</h1>
        <p className="patterns-page__subtitle" dir="rtl">{chapter.title}</p>
      </div>

      <div className="patterns-list">
        {patterns.map((pattern, pIdx) => (
          <div
            key={pattern.id}
            className={`pattern-card ${expandedPattern === pIdx ? 'pattern-card--expanded' : ''}`}
          >
            <button className="pattern-card__header" onClick={() => handleToggle(pIdx)}>
              <div className="pattern-card__label">{pattern.label}</div>
              <div className="pattern-card__formula">
                <span className="pattern-card__farsi" dir="rtl">{pattern.farsi}</span>
                <span className="pattern-card__translit">{pattern.transliteration}</span>
                <span className="pattern-card__english">{pattern.english}</span>
              </div>
              <span className={`pattern-card__chevron ${expandedPattern === pIdx ? 'pattern-card__chevron--open' : ''}`}>
                ▼
              </span>
            </button>

            {expandedPattern === pIdx && (
              <div className="pattern-card__examples">
                {/* Grammar note */}
                {pattern.grammar_note && (
                  <div className="pattern-card__grammar-note">
                    <span className="pattern-card__grammar-icon">💡</span>
                    <span>{pattern.grammar_note}</span>
                  </div>
                )}

                {/* Pronouns table (Chapter 2 Pattern 5) */}
                {pattern.pronouns_table && (
                  <div className="pattern-card__pronouns-table">
                    <table className="pronouns-table">
                      <thead>
                        <tr>
                          <th>فارسی</th>
                          <th>Transliteration</th>
                          <th>English</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pattern.pronouns_table.map((pronoun, prIdx) => (
                          <tr key={prIdx}>
                            <td className="pronouns-table__farsi" dir="rtl">{pronoun.farsi}</td>
                            <td className="pronouns-table__translit">{pronoun.transliteration}</td>
                            <td className="pronouns-table__english">{pronoun.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Handle regular examples */}
                {pattern.examples.filter(ex => !ex.type).map((example) => {
                  const englishWord = example.english?.replace(/^(This|That) is (a |an )?/, '').replace('.', '').trim();
                  const img = getImage(englishWord);
                  const emoji = getEmoji(englishWord);

                  return (
                    <div key={example.id} className="example-item">
                      {img ? (
                        <div className="example-item__image-wrap">
                          <img src={img} alt={englishWord} className="example-item__image" loading="lazy" />
                        </div>
                      ) : (
                        <div className="example-item__emoji">{emoji}</div>
                      )}
                      <div className="example-item__text">
                        <div className="example-item__farsi" dir="rtl">{example.farsi}</div>
                        <div className="example-item__translit">{example.transliteration}</div>
                        <div className="example-item__english">{example.english}</div>
                      </div>
                      <SpeakButton text={example.farsi} size="small" />
                    </div>
                  );
                })}

                {/* Handle yes/no question examples */}
                {pattern.examples.filter(ex => ex.type === 'yes_no').map((example) => (
                  <div key={example.id} className="example-item example-item--qa">
                    <div className="example-item__text">
                      <div className="example-item__qa-label">Q:</div>
                      <div className="example-item__farsi" dir="rtl">{example.question.farsi}</div>
                      <div className="example-item__translit">{example.question.transliteration}</div>
                      <div className="example-item__english">{example.question.english}</div>
                      <SpeakButton text={example.question.farsi} size="small" />
                    </div>
                    <div className="example-item__text">
                      <div className="example-item__qa-label" style={{ color: example.correct_answer === 'yes' ? 'var(--color-correct)' : 'var(--color-wrong)' }}>
                        A: {example.correct_answer === 'yes' ? 'بله' : 'خیر'}
                      </div>
                      {example.explanation?.positive && (
                        <>
                          <div className="example-item__farsi" dir="rtl">{example.explanation.positive.farsi}</div>
                          <div className="example-item__english">{example.explanation.positive.english}</div>
                        </>
                      )}
                      {example.explanation?.negative && (
                        <>
                          <div className="example-item__farsi" dir="rtl">{example.explanation.negative.farsi}</div>
                          <div className="example-item__english">{example.explanation.negative.english}</div>
                          {example.explanation.correction && (
                            <div className="example-item__correction">
                              <span>→ </span>
                              <span dir="rtl">{example.explanation.correction.farsi}</span>
                              <span> ({example.explanation.correction.english})</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pattern.difficulty && (
              <span className={`pattern-card__badge pattern-card__badge--${pattern.difficulty}`}>
                {pattern.difficulty}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
