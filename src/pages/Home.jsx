import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useProgress } from '../hooks/useProgress';
import { Lock, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';
import './Home.css';

function ChapterCard({ chapter }) {
  const { progress, getCompletionPercent } = useProgress(chapter.id);
  const percent = getCompletionPercent();
  const sectionsComplete = ['vocabulary', 'patterns', 'reading', 'exercises', 'summary'].filter(s => progress[s]).length;
  const isComplete = percent === 100;

  return (
    <Link
      to={`/chapter/${chapter.id}`}
      className={`chapter-card hover-lift glass ${isComplete ? 'chapter-card--complete' : ''}`}
    >
      <div className={`chapter-card__number ${isComplete ? 'chapter-card__number--done' : ''}`}>
        {isComplete ? <CheckCircle2 size={24} /> : <span>{chapter.chapter}</span>}
      </div>
      <div className="chapter-card__info">
        <div className="chapter-card__farsi" dir="rtl">{chapter.farsi}</div>
        <div className="chapter-card__meta">
          <span className="chapter-card__english">{chapter.title}</span>
          <span className="chapter-card__dot">·</span>
          <span className="chapter-card__translit">{chapter.transliteration}</span>
        </div>
        {percent > 0 && (
          <div className="chapter-card__progress">
            <div className="chapter-card__progress-track">
              <div className="chapter-card__progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="chapter-card__progress-label">{sectionsComplete}/5</span>
          </div>
        )}
      </div>
      <div className="chapter-card__arrow">
        <ChevronRight size={22} />
      </div>
    </Link>
  );
}

export default function Home() {
  // Get a time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const greetingFarsi = hour < 12 ? 'صبح بخیر' : hour < 17 ? 'عصر بخیر' : 'شب بخیر';

  return (
    <div className="home">
      <div className="home__layout">
        {/* Header / Sidebar on desktop */}
        <header className="home-header">
          <div className="home-header__motif"></div>
          <div className="home-header__motif-2"></div>
          <div className="home-header__content animate-fade-in">
            <div className="home-header__greeting">
              <span className="home-header__greeting-en">{greeting}</span>
              <span className="home-header__greeting-fa" dir="rtl">{greetingFarsi}</span>
            </div>
            <h1 className="home-header__title">
              <span className="home-header__title-fa" dir="rtl">فارسی بیاموزید</span>
              <span className="home-header__title-en">Learn Persian</span>
            </h1>
            <p className="home-header__desc">
              Pick up where you left off, or start a new lesson.
            </p>

            {/* Quick stats on desktop */}
            <div className="home-header__stats">
              <div className="home-header__stat">
                <span className="home-header__stat-num">{chapters.length}</span>
                <span className="home-header__stat-label">Lessons Available</span>
              </div>
              <div className="home-header__stat-divider" />
              <div className="home-header__stat">
                <span className="home-header__stat-num">5</span>
                <span className="home-header__stat-label">Sections Each</span>
              </div>
            </div>
          </div>
        </header>

        {/* Chapters */}
        <section className="chapters-section">
          <div className="chapters-section__label">
            <BookOpen size={18} />
            <span>Lessons</span>
          </div>

          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}

            {/* Coming Soon */}
            {[3, 4, 5].map(num => (
              <div key={num} className="chapter-card chapter-card--locked glass">
                <div className="chapter-card__number chapter-card__number--locked">
                  <Lock size={18} />
                </div>
                <div className="chapter-card__info">
                  <div className="chapter-card__farsi chapter-card__farsi--locked">Lesson {num}</div>
                  <div className="chapter-card__meta">
                    <span className="chapter-card__english">Coming soon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
