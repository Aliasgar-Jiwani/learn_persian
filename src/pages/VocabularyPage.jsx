import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import VocabCard from '../components/VocabCard';
import './VocabularyPage.css';

const tabs = [
  { key: 'nouns_objects', label: 'Objects', icon: '📦' },
  { key: 'nouns_people', label: 'People', icon: '👥' },
  { key: 'nouns_places', label: 'Places', icon: '🏠' },
  { key: 'function_words', label: 'Function Words', icon: '🔤' },
  { key: 'adjectives', label: 'Adjectives', icon: '✨' },
];

export default function VocabularyPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [activeTab, setActiveTab] = useState('nouns_objects');
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = useMemo(() => {
    if (!chapter) return [];
    if (activeTab === 'adjectives') return chapter.adjectives || [];
    return chapter.vocabulary?.[activeTab] || [];
  }, [chapter, activeTab]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  function handlePrev() {
    setCurrentIndex(i => Math.max(0, i - 1));
  }

  function handleNext() {
    setCurrentIndex(i => {
      const next = Math.min(items.length - 1, i + 1);
      if (next === items.length - 1) {
        markComplete('vocabulary');
      }
      return next;
    });
  }

  function handleShuffle() {
    setCurrentIndex(Math.floor(Math.random() * items.length));
  }

  function handleTabChange(key) {
    setActiveTab(key);
    setCurrentIndex(0);
  }

  return (
    <div className="vocab-page">
      {/* Header */}
      <div className="vocab-page__header">
        <Link to={`/chapter/${id}`} className="vocab-page__back">← Back</Link>
        <h1 className="vocab-page__title">🎴 Vocabulary</h1>
        <p className="vocab-page__subtitle" dir="rtl">{chapter.title}</p>
      </div>

      {/* Tabs */}
      <div className="vocab-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`vocab-tab ${activeTab === tab.key ? 'vocab-tab--active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            <span className="vocab-tab__icon">{tab.icon}</span>
            <span className="vocab-tab__label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Card Area */}
      {items.length > 0 ? (
        <>
          <div className="vocab-page__counter">
            {currentIndex + 1} / {items.length}
          </div>

          <div className="vocab-page__card-area">
            <VocabCard
              key={`${activeTab}-${currentIndex}`}
              item={items[currentIndex]}
              showOpposite={activeTab === 'adjectives'}
            />
          </div>

          {/* Navigation */}
          <div className="vocab-page__nav">
            <button className="vocab-nav-btn" onClick={handlePrev} disabled={currentIndex === 0}>
              ← Previous
            </button>
            <button className="vocab-nav-btn vocab-nav-btn--shuffle" onClick={handleShuffle}>
              🔀 Shuffle
            </button>
            <button className="vocab-nav-btn" onClick={handleNext} disabled={currentIndex === items.length - 1}>
              Next →
            </button>
          </div>
        </>
      ) : (
        <div className="vocab-page__empty">No items in this category</div>
      )}
    </div>
  );
}
