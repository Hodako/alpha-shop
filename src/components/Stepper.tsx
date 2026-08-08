'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWizard } from '../context/WizardContext';

const STEP_LABELS = [
  'Select Mobile',
  'Select Plan',
  'Customer Info',
  'Payment Agreement',
  'Confirmation'
];

export const Stepper: React.FC = () => {
  const { currentStep, goBack } = useWizard();

  if (currentStep === 0) return null;

  return (
    <div className="stepper-bar">
      {currentStep > 0 && currentStep < 5 && (
        <button onClick={goBack} className="back-btn" title="Back to previous step">
          <ArrowLeft size={18} />
        </button>
      )}

      <div className="step-pills">
        {[1, 2, 3, 4, 5].map((stepNum) => {
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;
          return (
            <div
              key={stepNum}
              className={`step-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            />
          );
        })}
      </div>

      <div className="step-indicator-text">
        0{currentStep} / 05 — {STEP_LABELS[currentStep - 1] || ''}
      </div>
    </div>
  );
};
