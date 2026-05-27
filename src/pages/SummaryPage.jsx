import { useParams, Link } from 'react-router-dom';
import { useChapter } from '../hooks/useChapter';
import { useProgress } from '../hooks/useProgress';
import SpeakButton from '../components/SpeakButton';
import './SummaryPage.css';

export default function SummaryPage() {
  const { id } = useParams();
  const chapter = useChapter(id);
  const { markComplete, progress, getCompletionPercent } = useProgress(id);

  if (!chapter) return <div className="page-loading">Loading...</div>;

  const summary = chapter.summary;
  const percent = getCompletionPercent();

  // Mark summary as visited
  if (!progress.summary) {
    markComplete('summary');
  }

  return (
    <div className="summary-page">
      <div className="summary-page__header">
        <Link to={`/chapter/${id}`} className="summary-page__back">← Back</Link>
        <h1 className="summary-page__title">📋 Chapter Summary</h1>
        <p className="summary-page__subtitle" dir="rtl">{chapter.title} — {summary.title_english}</p>
      </div>

      <div className="summary-page__content">
        {/* Sentence Structures */}
        <section className="summary-section">
          <h2 className="summary-section__title">📐 Sentence Structures</h2>
          <div className="summary-section__grid">
            {summary.sentence_structures.map((struct, i) => (
              <div key={i} className="structure-card">
                <div className="structure-card__type">{struct.type}</div>
                <div className="structure-card__formula" dir="rtl">{struct.structure_farsi}</div>
                <div className="structure-card__example">
                  <span dir="rtl" className="structure-card__farsi">{struct.example_farsi}</span>
                  <span className="structure-card__english">{struct.example_english}</span>
                </div>
                <SpeakButton text={struct.example_farsi} size="small" />
              </div>
            ))}
          </div>
        </section>

        {/* Vocabulary Groups */}
        <section className="summary-section">
          <h2 className="summary-section__title">📚 Key Vocabulary</h2>
          {Object.entries(summary.vocabulary_groups).map(([group, words]) => (
            <div key={group} className="vocab-group">
              <h3 className="vocab-group__title">{group.replace(/_/g, ' ')}</h3>
              <div className="vocab-group__words">
                {words.map((word, i) => (
                  <div key={i} className="vocab-word-chip" dir="rtl">
                    <span>{word}</span>
                    <SpeakButton text={word} size="small" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Dictation Section */}
        {chapter.dictation_section && (
          <section className="summary-section">
            <h2 className="summary-section__title">✍️ {chapter.dictation_section.title_english}</h2>
            <p className="summary-section__note">{chapter.dictation_section.phoneme_note}</p>
            
            {/* Chapter 1 style: spelling_groups */}
            {chapter.dictation_section.spelling_groups && chapter.dictation_section.spelling_groups.map((group, i) => (
              <div key={i} className="dictation-group">
                <div className="dictation-group__row">
                  <div className="dictation-group__col">
                    <h4>Written with kasra (short vowel)</h4>
                    <div className="dictation-words">
                      {group.written_with_kasra.map((w, j) => (
                        <span key={j} className="dictation-word" dir="rtl">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div className="dictation-group__col">
                    <h4>Written with ه (he)</h4>
                    <div className="dictation-words">
                      {group.written_with_he.map((w, j) => (
                        <span key={j} className="dictation-word" dir="rtl">{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Chapter 2 style: sound_groups */}
            {chapter.dictation_section.sound_groups && (
              <div className="dictation-sounds">
                <div className="dictation-sounds__letter" dir="rtl">
                  <span className="dictation-sounds__letter-char">{chapter.dictation_section.letter}</span>
                </div>
                <div className="dictation-sounds__groups">
                  {chapter.dictation_section.sound_groups.map((group, i) => (
                    <div key={i} className="sound-group">
                      <div className="sound-group__header">
                        <span className="sound-group__sound">/{group.sound}/</span>
                        <span className="sound-group__desc">{group.description}</span>
                      </div>
                      <div className="sound-group__examples">
                        {group.examples.map((ex, j) => (
                          <div key={j} className="sound-group__example">
                            <span className="sound-group__farsi" dir="rtl">{ex.farsi}</span>
                            <span className="sound-group__translit">{ex.transliteration}</span>
                            <span className="sound-group__english">{ex.english}</span>
                            <SpeakButton text={ex.farsi} size="small" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Completion Badge */}
        {percent === 100 && (
          <div className="summary-page__complete">
            <div className="complete-badge">
              <span className="complete-badge__emoji">🎉</span>
              <h2>Chapter Complete!</h2>
              <p>You've finished all sections of {chapter.title_english}</p>
              <Link to="/" className="complete-badge__btn">Back to Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
