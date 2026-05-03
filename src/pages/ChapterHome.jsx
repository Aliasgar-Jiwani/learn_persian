import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';
import './ChapterHome.css';

const sections = [
  { key: 'vocabulary', icon: '🎴', title: 'Vocabulary', description: 'Learn new words with flashcards and audio' },
  { key: 'patterns', icon: '📐', title: 'Patterns', description: 'Study grammar patterns and sentence structures' },
  { key: 'reading', icon: '📖', title: 'Reading', description: 'Practice reading Persian texts' },
  { key: 'exercises', icon: '📝', title: 'Exercises', description: 'Test your knowledge with interactive quizzes' },
  { key: 'summary', icon: '📋', title: 'Summary', description: 'Review key vocabulary and grammar points' },
];

export default function ChapterHome() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { progress, getCompletionPercent } = useProgress(id);

  if (!chapter) {
    return (
      <div className="chapter-home__error">
        <h2>Chapter not found</h2>
        <Link to="/" className="btn-back">← Back to Home</Link>
      </div>
    );
  }

  const percent = getCompletionPercent();

  return (
    <div className="chapter-home">
      {/* Header */}
      <div className="chapter-home__header">
        <Link to="/" className="chapter-home__back">← Back</Link>
        <div className="chapter-home__titles">
          <h1 className="chapter-home__farsi" dir="rtl">{chapter.title}</h1>
          <p className="chapter-home__translit">{chapter.title_transliteration}</p>
          <p className="chapter-home__english">{chapter.title_english}</p>
        </div>
        <div className="chapter-home__progress-wrap">
          <ProgressBar percent={percent} label="Chapter Progress" />
        </div>
      </div>

      {/* Section Cards */}
      <div className="section-grid">
        {sections.map((section, i) => {
          const isComplete = progress[section.key];
          return (
            <Link
              key={section.key}
              to={`/chapter/${id}/${section.key}`}
              className={`section-card ${isComplete ? 'section-card--complete' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="section-card__icon-wrap">
                <span className="section-card__icon">{section.icon}</span>
                {isComplete && <span className="section-card__check">✓</span>}
              </div>
              <div className="section-card__info">
                <h3 className="section-card__title">{section.title}</h3>
                <p className="section-card__desc">{section.description}</p>
              </div>
              <span className="section-card__arrow">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
