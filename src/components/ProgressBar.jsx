import './ProgressBar.css';

export default function ProgressBar({ percent = 0, label, showLabel = true }) {
  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span>{label || 'Progress'}</span>
          <span className="progress-bar__percent">{percent}%</span>
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}
