'use client';

import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useWizard } from '../context/WizardContext';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  const { currentOrder } = useWizard();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (
      currentOrder &&
      (searchOrderId.trim().toUpperCase() === currentOrder.orderId ||
        searchPhone.trim() === currentOrder.customer.mobileNumber)
    ) {
      setFoundOrder(currentOrder);
    } else {
      setFoundOrder(null);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '480px',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          <X size={18} />
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
          Track Your Installment Order
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Enter your Order ID (e.g. AM-260808-1234) or Mobile Number to check real-time status.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Order ID
            </label>
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="e.g. AM-260808-4821"
              className="form-input"
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Mobile Number
            </label>
            <input
              type="tel"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="xxxxxx-xxxxx"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '12px', fontSize: '15px' }}>
            <Search size={18} /> Track Order Status
          </button>
        </form>

        {searched && foundOrder && (
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 900, color: '#15803d' }}>
                {foundOrder.orderId}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px' }}>
                {foundOrder.status}
              </span>
            </div>

            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              {foundOrder.model.name} ({foundOrder.storage.size}, {foundOrder.color.name})
            </p>
            <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 12px' }}>
              Monthly EMI: <strong>Rs. {foundOrder.monthlyEmi.toLocaleString('en-PK')}</strong> ({foundOrder.months} Mo)
            </p>

            <div style={{ fontSize: '12px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> Verification team is reviewing order details & TCS rider dispatch.
            </div>
          </div>
        )}

        {searched && !foundOrder && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '14px',
              padding: '14px',
              color: '#991b1b',
              fontSize: '13px',
              textAlign: 'center'
            }}
          >
            ❌ No active order found matching your search. Please verify your Order ID or phone number.
          </div>
        )}
      </div>
    </div>
  );
};
