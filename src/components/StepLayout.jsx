import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import './StepLayout.css';

export default function StepLayout({ 
  currentStep, 
  totalSteps, 
  onCloseUrl, 
  children, 
  onContinue, 
  continueLabel = "Continue",
  continueDisabled = false,
  continueVariant = "primary" // "primary", "success", "danger"
}) {
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="step-layout">
      {/* Top Bar: Close button & Progress */}
      <header className="step-layout__header">
        <Link to={onCloseUrl} className="step-layout__close-btn" aria-label="Close">
          <X size={24} strokeWidth={2.5} />
        </Link>
        <div className="step-layout__progress-track">
          <div 
            className="step-layout__progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="step-layout__content">
        <div className="step-layout__content-inner">
          {children}
        </div>
      </main>

      {/* Bottom Fixed Action Bar */}
      <footer className="step-layout__footer">
        <button 
          className={`btn-duo btn-duo--${continueVariant}`}
          onClick={onContinue}
          disabled={continueDisabled}
        >
          {continueLabel}
        </button>
      </footer>
    </div>
  );
}
