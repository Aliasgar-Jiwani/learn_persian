import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import VocabCard from '../components/VocabCard';
import { 
  Package, Users, Home as HomeIcon, Type, Sparkles, 
  ArrowLeft, ArrowRight, Shuffle, Library, CheckCircle,
  User, BookOpen
} from 'lucide-react';
import './VocabularyPage.css';

// All possible tabs — we filter to only those with data
const allTabs = [
  { key: 'nouns_objects', label: 'Objects', icon: Package },
  { key: 'nouns_people', label: 'People', icon: Users },
  { key: 'nouns_places', label: 'Places', icon: HomeIcon },
  { key: 'function_words', label: 'Function Words', icon: Type },
  { key: 'pronouns', label: 'Pronouns', icon: User },
  { key: 'subject_vocab', label: 'Subjects', icon: BookOpen },
  { key: 'adjectives', label: 'Adjectives', icon: Sparkles },
];

export default function VocabularyPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [activeTab, setActiveTab] = useState('nouns_objects');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Build tabs dynamically based on available data
  const tabs = useMemo(() => {
    if (!chapter) return [];
    return allTabs.filter(tab => {
      if (tab.key === 'adjectives') return (chapter.adjectives || []).length > 0;
      return (chapter.vocabulary?.[tab.key] || []).length > 0;
    });
  }, [chapter]);

  const items = useMemo(() => {
    if (!chapter) return [];
    if (activeTab === 'adjectives') return chapter.adjectives || [];
    return chapter.vocabulary?.[activeTab] || [];
  }, [chapter, activeTab]);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const currentTabIndex = tabs.findIndex(t => t.key === activeTab);
  const isLastItem = currentIndex === items.length - 1;
  const isLastTab = currentTabIndex === tabs.length - 1;

  function handlePrev() {
    setCurrentIndex(i => Math.max(0, i - 1));
  }

  function handleNext() {
    if (!isLastItem) {
      setCurrentIndex(i => i + 1);
    } else {
      if (!isLastTab) {
        setActiveTab(tabs[currentTabIndex + 1].key);
        setCurrentIndex(0);
      } else {
        markComplete('vocabulary');
        setIsFinished(true);
      }
    }
  }

  function handleShuffle() {
    setCurrentIndex(Math.floor(Math.random() * items.length));
  }

  function handleTabChange(key) {
    setActiveTab(key);
    setCurrentIndex(0);
    setIsFinished(false);
  }

  return (
    <div className="vocab-page">
      {/* Header */}
      <div className="vocab-page__header">
        <Link to={`/chapter/${id}`} className="vocab-page__back">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="vocab-page__title">
          <Library size={24} className="vocab-page__title-icon" /> Vocabulary
        </h1>
        <p className="vocab-page__subtitle" dir="rtl">{chapter.title}</p>
      </div>

      {/* Tabs */}
      <div className="vocab-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              className={`vocab-tab ${activeTab === tab.key ? 'vocab-tab--active' : ''}`}
              onClick={() => handleTabChange(tab.key)}
            >
              <span className="vocab-tab__icon">
                <Icon size={18} />
              </span>
              <span className="vocab-tab__label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Card Area */}
      {isFinished ? (
        <div className="vocab-page__empty">
          <div className="vocab-page__finished">
            <CheckCircle size={48} color="var(--color-primary)" />
            <h2>Great Job!</h2>
            <p>You have completed all vocabulary sections.</p>
            <Link to={`/chapter/${id}`} className="vocab-nav-btn" style={{ marginTop: '20px', textDecoration: 'none' }}>
              Return to Chapter
            </Link>
          </div>
        </div>
      ) : items.length > 0 ? (
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
              <ArrowLeft size={16} /> Previous
            </button>
            <button className="vocab-nav-btn vocab-nav-btn--shuffle" onClick={handleShuffle}>
              <Shuffle size={16} /> Shuffle
            </button>
            <button className="vocab-nav-btn" onClick={handleNext}>
              {isLastItem ? (
                isLastTab ? <>Finish <CheckCircle size={16} style={{marginLeft: '4px'}}/></> : <>Next Category <ArrowRight size={16} style={{marginLeft: '4px'}}/></>
              ) : (
                <>Next <ArrowRight size={16} style={{marginLeft: '4px'}}/></>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="vocab-page__empty">No items in this category</div>
      )}
    </div>
  );
}
