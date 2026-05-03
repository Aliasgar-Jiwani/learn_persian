import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ProgressBar';
import { Sparkles, Layers, BookOpen, Edit3, ClipboardCheck, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './ChapterHome.css';

const sections = [
  { key: 'vocabulary', icon: Sparkles, title: 'Vocabulary', description: 'Learn new words with flashcards and audio' },
  { key: 'patterns', icon: Layers, title: 'Patterns', description: 'Study grammar patterns and sentence structures' },
  { key: 'reading', icon: BookOpen, title: 'Reading', description: 'Practice reading Persian texts' },
  { key: 'exercises', icon: Edit3, title: 'Exercises', description: 'Test your knowledge with interactive quizzes' },
  { key: 'summary', icon: ClipboardCheck, title: 'Summary', description: 'Review key vocabulary and grammar points' },
];

export default function ChapterHome() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { progress, getCompletionPercent } = useProgress(id);

  if (!chapter) {
    return (
      <div className="chapter-home__error animate-fade-in">
        <h2>Chapter not found</h2>
        <Link to="/" className="btn-back">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  const percent = getCompletionPercent();

  return (
    <div className="chapter-home animate-fade-in">
      {/* Header */}
      <div className="chapter-home__header">
        <div className="chapter-home__header-bg"></div>
        <Link to="/" className="chapter-home__back">
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>
        <div className="chapter-home__titles">
          <h1 className="chapter-home__farsi" dir="rtl">{chapter.title}</h1>
          <p className="chapter-home__translit">{chapter.title_transliteration}</p>
          <p className="chapter-home__english">{chapter.title_english}</p>
        </div>
        <div className="chapter-home__progress-wrap glass">
          <ProgressBar percent={percent} label="Chapter Progress" />
        </div>
      </div>

      {/* Section Cards */}
      <div className="section-grid">
        {sections.map((section, i) => {
          const isComplete = progress[section.key];
          const Icon = section.icon;
          return (
            <Link
              key={section.key}
              to={`/chapter/${id}/${section.key}`}
              className={`section-card hover-lift glass ${isComplete ? 'section-card--complete' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="section-card__icon-wrap">
                <Icon className="section-card__icon" />
                {isComplete && (
                  <div className="section-card__check">
                    <CheckCircle2 size={16} fill="var(--color-correct)" color="white" />
                  </div>
                )}
              </div>
              <div className="section-card__info">
                <h3 className="section-card__title">{section.title}</h3>
                <p className="section-card__desc">{section.description}</p>
              </div>
              <div className="section-card__arrow">
                <ChevronRight size={24} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
