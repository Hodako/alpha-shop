'use client';

import React from 'react';
import { useWizard } from '../../context/WizardContext';
import { EMI_TENURES } from '../../data/catalog';

export const Step2SelectPlan: React.FC = () => {
  const {
    selectedModel,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    selectedTenureMonths,
    setSelectedTenureMonths,
    calculatedTotalPrice,
    calculatedMonthlyEmi,
    goNext
  } = useWizard();

  if (!selectedModel) return null;

  return (
    <div className="step-container">
      <h2 className="step-title">Select Your Plan</h2>
      <p className="step-subtitle">Customize storage, color, and pick your preferred 0% markup installment tenure.</p>

      {/* Model Summary Box */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <img
          src={selectedModel.image}
          alt={selectedModel.name}
          style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 12 }}
        />
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{selectedModel.name}</h4>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Base Price: Rs. {selectedModel.basePrice.toLocaleString('en-PK')}
          </p>
        </div>
      </div>

      {/* Color Selection */}
      <div className="form-group">
        <label className="form-label">Select Color</label>
        <div className="pill-grid">
          {selectedModel.colors.map((color) => {
            const isSelected = selectedColor?.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`swatch-pill ${isSelected ? 'selected' : ''}`}
                type="button"
              >
                <span className="color-dot" style={{ backgroundColor: color.hex }} />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Selection */}
      <div className="form-group">
        <label className="form-label">Select Storage</label>
        <div className="pill-grid">
          {selectedModel.storageOptions.map((storage) => {
            const isSelected = selectedStorage?.size === storage.size;
            return (
              <button
                key={storage.size}
                onClick={() => setSelectedStorage(storage)}
                className={`swatch-pill ${isSelected ? 'selected' : ''}`}
                type="button"
              >
                {storage.size}
                {storage.priceDelta > 0 && (
                  <span style={{ fontSize: '11px', opacity: 0.8 }}>
                    (+Rs. {storage.priceDelta.toLocaleString('en-PK')})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* EMI Tenure Selector */}
      <div className="form-group">
        <label className="form-label">Choose EMI Tenure (0% Markup)</label>
        <div className="tenure-grid">
          {EMI_TENURES.map((item) => {
            const months = item.months;
            const isSelected = selectedTenureMonths === months;
            const emi = Math.round(calculatedTotalPrice / months);
            return (
              <div
                key={months}
                onClick={() => setSelectedTenureMonths(months)}
                className={`tenure-card ${isSelected ? 'selected' : ''}`}
              >
                <span className="tenure-months">{months} Months</span>
                <span className="tenure-emi">Rs. {emi.toLocaleString('en-PK')}/mo</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculation Echo Box */}
      <div className="calculation-box">
        <div className="calc-row">
          <span>Total Device Cash Price:</span>
          <span style={{ fontWeight: 700 }}>Rs. {calculatedTotalPrice.toLocaleString('en-PK')}</span>
        </div>
        <div className="calc-row">
          <span>Tenure Selected:</span>
          <span style={{ fontWeight: 700 }}>{selectedTenureMonths} Months</span>
        </div>
        <div className="calc-row" style={{ borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '4px' }}>
          <span style={{ fontWeight: 700, color: '#ffffff' }}>Monthly EMI (0% Markup):</span>
          <span className="calc-highlight">Rs. {calculatedMonthlyEmi.toLocaleString('en-PK')} / mo</span>
        </div>
      </div>

      {/* Sticky App Bottom Action Bar */}
      <div className="sticky-bottom-bar">
        <button onClick={goNext} className="btn-primary">
          {'Next → Proceed to Customer Info'}
        </button>
      </div>
    </div>
  );
};
