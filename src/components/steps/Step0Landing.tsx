'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ShieldCheck, Percent, Truck, CreditCard, Award, Lock } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

export const Step0Landing: React.FC = () => {
  const { setStep } = useWizard();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Hero Banner Graphic */}
      <div className="hero-banner-wrap">
        <Image
          src="/banner.png"
          alt="Ab Har Mobile Qist Par - Asaan Monthly Installments"
          width={580}
          height={320}
          className="hero-banner-img"
          priority
        />
      </div>

      {/* Mini Banner Graphic Section */}
      <div style={{ width: '100%', textAlign: 'center', padding: '10px 16px 4px' }}>
        <img
          src="/mini-banner.jpeg"
          alt="Buy Now Pay Later Banner"
          style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
        />
      </div>

      {/* Partners Bar with Uploaded Assets */}
      <div className="partners-card">
        <div className="partner-item">
          <img src="/statebankofpakistan.webp" alt="Pakistan All Banks" className="partner-icon-img" />
          <span className="partner-label">PAKISTAN<br />ALL BANKS</span>
        </div>
        <div className="partner-item">
          <img src="/mastercard.png" alt="Mastercard" className="partner-icon-img" />
          <span className="partner-label">mastercard</span>
        </div>
        <div className="partner-item">
          <img src="/visacard.webp" alt="VISA Card" className="partner-icon-img" />
          <span className="partner-label">VISA CARD</span>
        </div>
        <div className="partner-item">
          <img src="/easypaisa.webp" alt="Easypaisa" className="partner-icon-img" />
          <span className="partner-label">easypaisa</span>
        </div>
        <div className="partner-item">
          <img src="/upaisa.png" alt="Upaisa" className="partner-icon-img" />
          <span className="partner-label">upaisa</span>
        </div>
      </div>

      {/* 6 Trust Badges Grid */}
      <div className="trust-badges-grid">
        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <ShieldCheck size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">EASY INSTALLMENTS</span>
            <span className="trust-badge-subtitle">Up to 60 Months</span>
          </div>
        </div>

        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#fef2f2', color: '#dc2626' }}>
            <Percent size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">0% MARKUP</span>
            <span className="trust-badge-subtitle">No Hidden Charges</span>
          </div>
        </div>

        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <Truck size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">CASH ON DELIVERY</span>
            <span className="trust-badge-subtitle">Nationwide</span>
          </div>
        </div>

        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#fefce8', color: '#ca8a04' }}>
            <CreditCard size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">CARDS ACCEPTED</span>
            <span className="trust-badge-subtitle">All Major Cards</span>
          </div>
        </div>

        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#faf5ff', color: '#9333ea' }}>
            <Award size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">100% ORIGINAL</span>
            <span className="trust-badge-subtitle">Official Warranty</span>
          </div>
        </div>

        <div className="trust-badge-item">
          <div className="trust-badge-icon" style={{ background: '#f0fdfa', color: '#0d9488' }}>
            <Lock size={22} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">SECURE PAYMENTS</span>
            <span className="trust-badge-subtitle">Safe & Reliable</span>
          </div>
        </div>
      </div>

      {/* Sticky App Bottom Action Bar */}
      <div className="sticky-bottom-bar">
        <button onClick={() => setStep(1)} className="btn-primary">
          <ShoppingCart size={22} />
          Shop Now
        </button>
      </div>
    </div>
  );
};
