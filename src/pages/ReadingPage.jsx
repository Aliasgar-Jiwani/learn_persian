import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';
import './ReadingPage.css';

const modes = [
  { key: 'farsi', label: 'Farsi Only' },
  { key: 'translit', label: 'With Transliteration' },
  { key: 'english', label: 'With English' },
];

export default function ReadingPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete } = useProgress(id);
  const [mode, setMode] = useState('translit');
  const [tooltip, setTooltip] = useState(null);
  const [activeText, setActiveText] = useState(0);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const texts = chapter.reading_texts || [];
  const currentText = texts[activeText];
  const characters = chapter.named_characters || [];

  function handleTextChange(idx) {
    setActiveText(idx);
    if (idx === texts.length - 1) {
      markComplete('reading');
    }
  }

  // Build a simple word lookup from chapter vocabulary
  function lookupWord(farsiWord) {
    const clean = farsiWord.replace(/[.،؟!]/g, '').trim();
    const allVocab = [
      ...(chapter.vocabulary?.nouns_objects || []),
      ...(chapter.vocabulary?.nouns_people || []),
      ...(chapter.vocabulary?.nouns_places || []),
      ...(chapter.vocabulary?.function_words || []),
      ...(chapter.vocabulary?.pronouns || []),
      ...(chapter.vocabulary?.subject_vocab || []),
      ...(chapter.adjectives || []),
    ];
    const found = allVocab.find(v => v.farsi === clean);
    if (found) {
      return { farsi: found.farsi, transliteration: found.transliteration, english: found.english };
    }
    // Check adjective opposites
    for (const adj of (chapter.adjectives || [])) {
      if (adj.opposite && adj.opposite.farsi === clean) {
        return { farsi: adj.opposite.farsi, transliteration: adj.opposite.transliteration, english: adj.opposite.english };
      }
    }
    return null;
  }

  function handleWordClick(e, word) {
    const lookup = lookupWord(word);
    if (lookup) {
      const rect = e.target.getBoundingClientRect();
      setTooltip({
        ...lookup,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setTimeout(() => setTooltip(null), 3000);
    }
  }

  return (
    <div className="reading-page" onClick={() => setTooltip(null)}>
      <div className="reading-page__header">
        <Link to={`/chapter/${id}`} className="reading-page__back">← Back</Link>
        <h1 className="reading-page__title">📖 Reading Practice</h1>
        <p className="reading-page__subtitle" dir="rtl">{chapter.title}</p>
      </div>

      {/* Character Intro */}
      {characters.length > 0 && (
        <div className="reading-page__characters">
          {characters.map((char, i) => (
            <div key={i} className="character-chip">
              <div className="character-chip__avatar">
                {char.gender === 'female' ? '👩‍🦱' : '👦'}
              </div>
              <div>
                <span className="character-chip__name" dir="rtl">{char.name_farsi}</span>
                <span className="character-chip__translit"> ({char.name_transliteration})</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode Toggle */}
      <div className="reading-page__modes">
        {modes.map(m => (
          <button
            key={m.key}
            className={`mode-btn ${mode === m.key ? 'mode-btn--active' : ''}`}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Text Tabs */}
      <div className="reading-page__text-tabs">
        {texts.map((text, i) => (
          <button
            key={text.id}
            className={`text-tab ${activeText === i ? 'text-tab--active' : ''}`}
            onClick={() => handleTextChange(i)}
          >
            {text.title_english}
          </button>
        ))}
      </div>

      {/* Reading Text */}
      {currentText && (
        <div className="reading-card">
          <div className="reading-card__title">
            <span dir="rtl">{currentText.title}</span>
            <span> — {currentText.title_english}</span>
          </div>

          <div className="reading-card__sentences">
            {currentText.sentences.map((sentence) => (
              <div key={sentence.id} className="sentence-block">
                <div className="sentence-block__farsi" dir="rtl">
                  {sentence.farsi.split(' ').map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="sentence-word"
                      onClick={(e) => { e.stopPropagation(); handleWordClick(e, word); }}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </div>
                {(mode === 'translit' || mode === 'english') && (
                  <div className="sentence-block__translit">{sentence.transliteration}</div>
                )}
                {mode === 'english' && (
                  <div className="sentence-block__english">{sentence.english}</div>
                )}
                <div className="sentence-block__audio">
                  <SpeakButton text={sentence.farsi} size="small" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="word-tooltip"
          style={{
            left: `${Math.min(tooltip.x, window.innerWidth - 180)}px`,
            top: `${tooltip.y - 70}px`,
          }}
        >
          <div className="word-tooltip__farsi" dir="rtl">{tooltip.farsi}</div>
          <div className="word-tooltip__translit">{tooltip.transliteration}</div>
          <div className="word-tooltip__english">{tooltip.english}</div>
        </div>
      )}
    </div>
  );
}
