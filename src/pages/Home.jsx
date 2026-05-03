import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { Play, Lock, Sparkles, Volume2, Edit3, BookOpen, ChevronRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="home animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background"></div>
        
        <div className="hero__content">
          
          
          <h1 className="hero__title">
            <span className="hero__title-farsi" dir="rtl">فارسی بیاموزید</span>
            <span className="hero__title-english">Learn Persian</span>
            <span className="hero__title-translit">Farsi Biamoozid</span>
          </h1>
          
          <p className="hero__subtitle">
            Master Persian step by step with native audio, intuitive visual flashcards, 
            and interactive exercises.
          </p>
          
          <Link to="/chapter/lesson_1" className="hero__cta hover-lift">
            <span>Start Learning</span>
            <Play size={18} className="hero__cta-icon" />
          </Link>
          
          <p className="hero__guest-note">
            No sign-up required. Free & Open.
          </p>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="chapters-section animate-slide-up">
        <div className="section-header">
          <h2 className="section-title">Learning Path</h2>
          <p className="section-subtitle">Start your journey from the basics</p>
        </div>
        
        <div className="chapters-grid">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.id}`}
              className="chapter-card hover-lift glass"
            >
              <div className="chapter-card__number">
                <span>{chapter.chapter}</span>
              </div>
              <div className="chapter-card__info">
                <div className="chapter-card__farsi" dir="rtl">{chapter.farsi}</div>
                <div className="chapter-card__translit">{chapter.transliteration}</div>
                <div className="chapter-card__english">{chapter.title}</div>
              </div>
              <div className="chapter-card__arrow">
                <ChevronRight size={24} />
              </div>
            </Link>
          ))}

          {/* Coming Soon cards */}
          {[2, 3, 4].map(num => (
            <div key={num} className="chapter-card chapter-card--locked glass">
              <div className="chapter-card__number chapter-card__number--locked">
                <span>{num}</span>
              </div>
              <div className="chapter-card__info">
                <div className="chapter-card__english">Coming Soon</div>
                <div className="chapter-card__translit">More lessons on the way</div>
              </div>
              <div className="chapter-card__lock">
                <Lock size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">How You'll Learn</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card hover-lift glass">
            <div className="feature-card__icon-wrapper">
              <Sparkles className="feature-card__icon" />
            </div>
            <h3>Visual Flashcards</h3>
            <p>Learn vocabulary with beautiful illustrated cards and animations</p>
          </div>
          <div className="feature-card hover-lift glass">
            <div className="feature-card__icon-wrapper">
              <Volume2 className="feature-card__icon" />
            </div>
            <h3>Native Audio</h3>
            <p>Hear every word and sentence spoken clearly in native Persian</p>
          </div>
          <div className="feature-card hover-lift glass">
            <div className="feature-card__icon-wrapper">
              <Edit3 className="feature-card__icon" />
            </div>
            <h3>Interactive Practice</h3>
            <p>Engaging exercises to test your memory and comprehension</p>
          </div>
          <div className="feature-card hover-lift glass">
            <div className="feature-card__icon-wrapper">
              <BookOpen className="feature-card__icon" />
            </div>
            <h3>Reading Skills</h3>
            <p>Read real Persian text with helpful tap-to-translate features</p>
          </div>
        </div>
      </section>
    </div>
  );
}
