'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { BRANDS, SERIES, MODELS, MobileModel } from '../../data/catalog';

export const Step1SelectMobile: React.FC = () => {
  const {
    selectedBrandId,
    setSelectedBrandId,
    selectedSeriesId,
    setSelectedSeriesId,
    selectedModel,
    setSelectedModel,
    goNext
  } = useWizard();

  const availableSeries = SERIES.filter((s) => s.brandId === selectedBrandId);
  const availableModels = MODELS.filter((m) => m.seriesId === selectedSeriesId);

  const handleSelectAndProceed = (model: MobileModel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedModel(model);
    goNext();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Select Your Mobile</h2>
      <p className="step-subtitle">Choose a brand and series, then tap "Buy Now →" on any phone model to pick your EMI plan.</p>

      {/* Brand Selection Grid */}
      <div className="form-group">
        <label className="form-label">1. Choose Brand</label>
        <div className="brands-grid">
          {BRANDS.map((brand) => {
            const isSelected = brand.id === selectedBrandId;
            return (
              <div
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`brand-card ${isSelected ? 'selected' : ''}`}
              >
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="brand-logo-img"
                />
                <span className="brand-name">{brand.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Series Selection Dropdown */}
      {availableSeries.length > 0 && (
        <div className="form-group">
          <label className="form-label">2. Select Series</label>
          <select
            value={selectedSeriesId}
            onChange={(e) => setSelectedSeriesId(e.target.value)}
            className="form-select"
          >
            {availableSeries.map((series) => (
              <option key={series.id} value={series.id}>
                {series.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Model Selection List with 1-Click Buy Now */}
      {availableModels.length > 0 ? (
        <div className="form-group">
          <label className="form-label">3. Select Model & Buy Now</label>
          <div className="models-list">
            {availableModels.map((model) => {
              const isSelected = selectedModel?.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={(e) => handleSelectAndProceed(model, e)}
                  className={`model-card ${isSelected ? 'selected' : ''}`}
                  style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <img
                      src={model.image}
                      alt={model.name}
                      className="model-img"
                    />
                    <div className="model-details">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="model-name">{model.name}</span>
                        {isSelected && <Check size={16} color="#d31820" />}
                      </div>
                      <span className="model-price">
                        Rs. {model.basePrice.toLocaleString('en-PK')}
                      </span>
                      <span className="model-specs">{model.specs.slice(0, 2).join(' • ')}</span>
                    </div>
                  </div>

                  {/* 1-Click Buy Now direct action button */}
                  <button
                    type="button"
                    onClick={(e) => handleSelectAndProceed(model, e)}
                    style={{
                      background: 'linear-gradient(135deg, #d31820 0%, #b01017 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 4px 12px rgba(211, 24, 32, 0.25)',
                      flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {'Buy Now →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', margin: '10px 0 20px' }}>
          No models currently listed for this series. Please select another series or brand.
        </p>
      )}
    </div>
  );
};
