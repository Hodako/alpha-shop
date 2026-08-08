'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Copy, Check, Phone, Mail, ShieldCheck, Home, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWizard } from '../../context/WizardContext';

interface Step5ConfirmationProps {
  onOpenLookup?: () => void;
}

export const Step5Confirmation: React.FC<Step5ConfirmationProps> = ({ onOpenLookup }) => {
  const { currentOrder, resetWizard } = useWizard();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d31820', '#16a34a', '#f59e0b', '#2563eb']
      });
    } catch (e) {
      // confetti fallback
    }
  }, []);

  if (!currentOrder) {
    return null;
  }

  const handleCopyOrderId = () => {
    if (typeof window !== 'undefined' && currentOrder?.orderId) {
      navigator.clipboard.writeText(currentOrder.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="step-container text-center">
      <div style={{ margin: '10px 0 16px', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#f0fdf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 8px rgba(34, 197, 94, 0.15)'
          }}
        >
          <CheckCircle2 size={44} color="#16a34a" />
        </div>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '6px' }}>
        Order Placed Successfully!
      </h2>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        Thank you, <strong>{currentOrder.customer.fullName}</strong>. Your installment request is registered.
      </p>

      <div
        style={{
          background: '#ffffff',
          border: '2px dashed #d31820',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
          Your Official Order ID
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#d31820', letterSpacing: '1px' }}>
            {currentOrder.orderId}
          </span>
          <button
            type="button"
            onClick={handleCopyOrderId}
            style={{
              background: copied ? '#22c55e' : '#f1f5f9',
              color: copied ? '#ffffff' : '#334155',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '24px',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={currentOrder.model.image}
            alt={currentOrder.model.name}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
          />
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{currentOrder.model.name}</h4>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              {currentOrder.storage.size} • {currentOrder.color.name}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
          <div>
            <span style={{ color: '#64748b' }}>Tenure Plan:</span><br />
            <strong style={{ color: '#0f172a' }}>{currentOrder.months} Months</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Monthly EMI:</span><br />
            <strong style={{ color: '#16a34a' }}>Rs. {currentOrder.monthlyEmi.toLocaleString('en-PK')} / mo</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Delivery Option:</span><br />
            <strong style={{ color: '#0f172a' }}>
              {currentOrder.customer.deliveryType === 'open_parcel' ? 'Open Parcel (TCS Rider)' : 'Standard Delivery'}
            </strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Payment Mode:</span><br />
            <strong style={{ color: '#0f172a' }}>
              {currentOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : currentOrder.customer.paymentMethod.toUpperCase()}
            </strong>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', textAlign: 'left', marginBottom: '12px' }}>
        Order Processing Timeline
      </h3>
      <div className="timeline" style={{ textAlign: 'left' }}>
        <div className="timeline-item active">
          <div className="timeline-badge">1</div>
          <div className="timeline-content">
            <span className="timeline-title">Waiting for Approval (~5 min)</span>
            <span className="timeline-subtitle">Our verification agent checks customer address and payment choices.</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-badge">2</div>
          <div className="timeline-content">
            <span className="timeline-title">Order Placed (~10 min after approval)</span>
            <span className="timeline-subtitle">Parcel dispatched via TCS Courier with SMS & WhatsApp tracking code.</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-badge">3</div>
          <div className="timeline-content">
            <span className="timeline-title">Delivered & Verified</span>
            <span className="timeline-subtitle">Open parcel, verify original device condition, complete payment.</span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '14px',
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Have questions about your order?</span>
        <div style={{ display: 'flex', justifySelf: 'center', justifyContent: 'center', gap: '12px' }}>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#25d366',
              textDecoration: 'none'
            }}
          >
            <Phone size={14} /> WhatsApp Support
          </a>
          <a
            href="mailto:support@alfamobiles.pk"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#ea4335',
              textDecoration: 'none'
            }}
          >
            <Mail size={14} /> Email Us
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#64748b', marginBottom: '24px' }}>
        <ShieldCheck size={14} color="#16a34a" />
        <span>Your information is 100% safe, encrypted, and never shared with third parties.</span>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={resetWizard}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '50px',
            border: '2px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            color: '#334155',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Home size={16} /> {'← Go to Home'}
        </button>

        {onOpenLookup && (
          <button
            type="button"
            onClick={onOpenLookup}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '50px',
              border: 'none',
              background: '#0f172a',
              fontSize: '14px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <FileText size={16} /> View Order Status
          </button>
        )}
      </div>
    </div>
  );
};
