import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__decoration hero__decoration--1" />
        <div className="hero__decoration hero__decoration--2" />
        <div className="hero__decoration hero__decoration--3" />
        
        <div className="hero__content">
          <div className="hero__badge">🌍 Free & Open</div>
          <h1 className="hero__title">
            <span className="hero__title-farsi" dir="rtl">فارسی بیاموزید</span>
            <span className="hero__title-translit">Farsi Biamoozid</span>
            <span className="hero__title-english">Learn Persian</span>
          </h1>
          <p className="hero__subtitle">
            Learn Persian step by step with audio pronunciation, visual flashcards, 
            and interactive exercises. No sign-up required.
          </p>
          <Link to="/chapter/lesson_1" className="hero__cta">
            <span>Start Learning</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="hero__guest-note">
            <span className="hero__guest-icon">🎓</span>
            Play without logging in
          </p>
        </div>

        {/* Floating Farsi characters */}
        <div className="hero__float hero__float--1" dir="rtl">سلام</div>
        <div className="hero__float hero__float--2" dir="rtl">خوبی؟</div>
        <div className="hero__float hero__float--3" dir="rtl">ممنون</div>
      </section>

      {/* Chapters Section */}
      <section className="chapters-section">
        <h2 className="chapters-section__title">Available Chapters</h2>
        <div className="chapters-grid">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="chapter-card"
            >
              <div className="chapter-card__number">
                <span>{chapter.chapter}</span>
              </div>
              <div className="chapter-card__info">
                <div className="chapter-card__farsi" dir="rtl">{chapter.farsi}</div>
                <div className="chapter-card__translit">{chapter.transliteration}</div>
                <div className="chapter-card__english">{chapter.title}</div>
              </div>
              <div className="chapter-card__arrow">→</div>
            </Link>
          ))}

          {/* Coming Soon cards */}
          {[2, 3, 4].map(num => (
            <div key={num} className="chapter-card chapter-card--locked">
              <div className="chapter-card__number chapter-card__number--locked">
                <span>{num}</span>
              </div>
              <div className="chapter-card__info">
                <div className="chapter-card__english">Coming Soon</div>
                <div className="chapter-card__translit">More lessons on the way!</div>
              </div>
              <div className="chapter-card__lock">🔒</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-section__title">How You'll Learn</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card__icon">🎴</div>
            <h3>Visual Flashcards</h3>
            <p>Learn vocabulary with illustrated cards, arrow labels, and flip animations</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🔊</div>
            <h3>Audio Pronunciation</h3>
            <p>Hear every word and sentence spoken in native Farsi</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">📝</div>
            <h3>Interactive Exercises</h3>
            <p>Fill-in-the-blank, MCQ, matching, and word rearrangement</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">📖</div>
            <h3>Reading Practice</h3>
            <p>Read real Persian text with tap-to-translate and transliteration</p>
          </div>
        </div>
      </section>
    </div>
  );
}
