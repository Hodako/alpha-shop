'use client';

import React, { useState } from 'react';
import { CreditCard, Briefcase, Cloud, Upload, Check, CheckCircle2 } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { PAKISTAN_BANKS, MOBILE_WALLETS } from '../../data/catalog';

export const Step4PaymentAgreement: React.FC = () => {
  const { customerDetails, paymentDetails, setPaymentDetails, createOrder } = useWizard();
  const [paymentType, setPaymentType] = useState<'card' | 'wallet'>(
    customerDetails.paymentMethod === 'wallet' ? 'wallet' : 'card'
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    }
    return digits;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File size exceeds 5MB limit.');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setPaymentDetails({
        ...paymentDetails,
        proofFile: file,
        proofPreviewUrl: previewUrl
      });
      setErrorMsg('');
    }
  };

  const handleConfirm = () => {
    if (!paymentDetails.acceptedTerms) {
      setErrorMsg('You must agree to Alfa Mobiles policy terms to proceed.');
      return;
    }

    if (paymentType === 'card') {
      if (!paymentDetails.bankId) {
        setErrorMsg('Please select your partner bank.');
        return;
      }
      if (!paymentDetails.cardName.trim() || !paymentDetails.cardNumber.trim()) {
        setErrorMsg('Please enter your cardholder name and card number.');
        return;
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
        setErrorMsg('Please enter a valid 3 or 4 digit CVV/CVC code.');
        return;
      }
    } else if (paymentType === 'wallet') {
      if (!paymentDetails.walletAccountName.trim()) {
        setErrorMsg('Please enter Account Holder Name.');
        return;
      }
    }

    setErrorMsg('');
    createOrder();
  };

  const isCOD = customerDetails.paymentMethod === 'cod';

  return (
    <div className="step-container" style={{ paddingBottom: '90px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#222222', textAlign: 'center', marginBottom: '20px' }}>
        Payment Agreement
      </h2>

      {/* COD Clean Notice */}
      {isCOD && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '14px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <CheckCircle2 color="#16a34a" size={22} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '12px', color: '#166534', lineHeight: 1.4 }}>
            <strong>No advance payment required for COD.</strong><br />
            Full cash payment will be collected by TCS rider upon open parcel delivery.
          </div>
        </div>
      )}

      {/* Payment Type Selection Buttons (Matching Screenshot) */}
      <div className="form-group" style={{ marginBottom: '22px' }}>
        <label style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          Payment Type
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setPaymentType('card')}
            style={{
              background: '#ffffff',
              border: paymentType === 'card' ? '2px solid #8b0000' : '1px solid #d1d5db',
              borderRadius: '16px',
              padding: '14px 10px',
              fontSize: '15px',
              fontWeight: 800,
              color: paymentType === 'card' ? '#111827' : '#4b5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: paymentType === 'card' ? '0 2px 8px rgba(139, 0, 0, 0.12)' : 'none'
            }}
          >
            <span>💳</span> Credit Card
          </button>

          <button
            type="button"
            onClick={() => setPaymentType('wallet')}
            style={{
              background: '#ffffff',
              border: paymentType === 'wallet' ? '2px solid #8b0000' : '1px solid #d1d5db',
              borderRadius: '16px',
              padding: '14px 10px',
              fontSize: '15px',
              fontWeight: 800,
              color: paymentType === 'wallet' ? '#111827' : '#4b5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: paymentType === 'wallet' ? '0 2px 8px rgba(139, 0, 0, 0.12)' : 'none'
            }}
          >
            <span>💼</span> Digital Wallet
          </button>
        </div>
      </div>

      {/* Credit Card Flow */}
      {paymentType === 'card' && (
        <>
          <div className="form-group">
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Select Partner Bank *</label>
            <select
              value={paymentDetails.bankId}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, bankId: e.target.value })}
              className="form-select"
              style={{ borderRadius: '14px', padding: '14px' }}
            >
              {PAKISTAN_BANKS.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name} ({bank.code})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Card Network</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPaymentDetails({ ...paymentDetails, cardNetwork: 'visa' })}
                className={`swatch-pill ${paymentDetails.cardNetwork === 'visa' ? 'selected' : ''}`}
                style={{ flex: 1, justifyContent: 'center', height: '48px', borderRadius: '14px' }}
              >
                <img
                  src="/visacard.webp"
                  alt="Visa Card"
                  style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                />
              </button>
              <button
                type="button"
                onClick={() => setPaymentDetails({ ...paymentDetails, cardNetwork: 'mastercard' })}
                className={`swatch-pill ${paymentDetails.cardNetwork === 'mastercard' ? 'selected' : ''}`}
                style={{ flex: 1, justifyContent: 'center', height: '48px', borderRadius: '14px' }}
              >
                <img
                  src="/mastercard.png"
                  alt="Mastercard"
                  style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Cardholder Name *</label>
            <input
              type="text"
              value={paymentDetails.cardName}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
              placeholder="Name as printed on card"
              className="form-input"
              style={{ borderRadius: '14px', padding: '14px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Card Number *</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })}
              placeholder="XXXX XXXX XXXX XXXX"
              className="form-input"
              maxLength={19}
              style={{ borderRadius: '14px', padding: '14px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Expiry Date *</label>
              <input
                type="text"
                inputMode="numeric"
                value={paymentDetails.expiry}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: formatExpiry(e.target.value) })}
                placeholder="MM / YY"
                className="form-input"
                maxLength={7}
                style={{ borderRadius: '14px', padding: '14px' }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>CVV / CVC *</label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={paymentDetails.cvv || ''}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="3 or 4 digits"
                className="form-input"
                maxLength={4}
                style={{ borderRadius: '14px', padding: '14px' }}
              />
            </div>
          </div>
        </>
      )}

      {/* Digital Wallet Flow (Matching Screenshot) */}
      {paymentType === 'wallet' && (
        <>
          {/* Wallet Type 2x2 Selection Grid */}
          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
              Wallet Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Easypaisa */}
              <div
                onClick={() => setPaymentDetails({ ...paymentDetails, walletType: 'easypaisa' })}
                style={{
                  background: paymentDetails.walletType === 'easypaisa' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'easypaisa' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: paymentDetails.walletType === 'easypaisa' ? 'none' : '2px solid #cbd5e1',
                    background: paymentDetails.walletType === 'easypaisa' ? '#8b0000' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {paymentDetails.walletType === 'easypaisa' && <Check size={12} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <img src="/easypaisa.webp" alt="Easypaisa" style={{ height: '20px', width: 'auto' }} />
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#00a859' }}>Easypaisa</span>
                </div>
              </div>

              {/* Upaisa */}
              <div
                onClick={() => setPaymentDetails({ ...paymentDetails, walletType: 'upaisa' })}
                style={{
                  background: paymentDetails.walletType === 'upaisa' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'upaisa' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: paymentDetails.walletType === 'upaisa' ? 'none' : '2px solid #cbd5e1',
                    background: paymentDetails.walletType === 'upaisa' ? '#8b0000' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {paymentDetails.walletType === 'upaisa' && <Check size={12} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <img src="/upaisa.png" alt="Upaisa" style={{ height: '20px', width: 'auto' }} />
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#ea580c' }}>Upaisa</span>
                </div>
              </div>

              {/* UBL */}
              <div
                onClick={() => setPaymentDetails({ ...paymentDetails, walletType: 'ubl_omni' })}
                style={{
                  background: paymentDetails.walletType === 'ubl_omni' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'ubl_omni' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: paymentDetails.walletType === 'ubl_omni' ? 'none' : '2px solid #cbd5e1',
                    background: paymentDetails.walletType === 'ubl_omni' ? '#8b0000' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {paymentDetails.walletType === 'ubl_omni' && <Check size={12} />}
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e3a8a' }}>UBL</span>
              </div>

              {/* Alfalah */}
              <div
                onClick={() => setPaymentDetails({ ...paymentDetails, walletType: 'alfalah_wallet' })}
                style={{
                  background: paymentDetails.walletType === 'alfalah_wallet' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'alfalah_wallet' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: paymentDetails.walletType === 'alfalah_wallet' ? 'none' : '2px solid #cbd5e1',
                    background: paymentDetails.walletType === 'alfalah_wallet' ? '#8b0000' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {paymentDetails.walletType === 'alfalah_wallet' && <Check size={12} />}
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#b91c1c' }}>Alflah</span>
              </div>
            </div>
          </div>

          {/* Account Holder Name */}
          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Account Holder Name
            </label>
            <input
              type="text"
              value={paymentDetails.walletAccountName}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, walletAccountName: e.target.value })}
              placeholder="Enter Account Holder Name"
              className="form-input"
              style={{ borderRadius: '14px', padding: '14px', fontSize: '15px' }}
            />
          </div>

          {/* Attach Proof of Payment Dashed Red Box (Matching Screenshot) */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            {paymentDetails.proofPreviewUrl ? (
              <div className="proof-preview-container" style={{ borderRadius: '16px' }}>
                <img
                  src={paymentDetails.proofPreviewUrl}
                  alt="Proof Preview"
                  className="proof-preview-img"
                />
                <button
                  type="button"
                  onClick={() => setPaymentDetails({ ...paymentDetails, proofFile: null, proofPreviewUrl: null })}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                style={{
                  border: '2px dashed #b91c1c',
                  borderRadius: '18px',
                  background: '#fff5f5',
                  padding: '24px 16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    marginBottom: '4px'
                  }}
                >
                  <Cloud size={30} fill="#bae6fd" color="#0284c7" />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#991b1b' }}>
                  Attach Proof of Payment
                </span>
                <span style={{ fontSize: '12px', color: '#4b5563', maxWidth: '280px', lineHeight: 1.3 }}>
                  Show balance screenshot of given number with verification of our agent.
                </span>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                  (Max 5MB, JPG/PNG/PDF)
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </>
      )}

      {/* Terms & Conditions Checkbox (Matching Screenshot) */}
      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '14px',
            color: '#111827',
            cursor: 'pointer',
            lineHeight: 1.4
          }}
        >
          <input
            type="checkbox"
            checked={paymentDetails.acceptedTerms}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, acceptedTerms: e.target.checked })}
            style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#8b0000' }}
          />
          <span>
            I Agree the terms and conditions of <strong style={{ color: '#1e3a8a' }}>Alfa Mobiles policy</strong>.
          </span>
        </label>
      </div>

      {errorMsg && (
        <p style={{ color: '#d31820', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
          ⚠️ {errorMsg}
        </p>
      )}

      {/* Red Confirm Order Button (Matching Screenshot) */}
      <div className="sticky-bottom-bar">
        <button
          onClick={handleConfirm}
          className="btn-primary"
          style={{
            background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
            padding: '16px',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 800
          }}
        >
          {'Confirm Order →'}
        </button>
      </div>
    </div>
  );
};
