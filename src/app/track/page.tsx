'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Clock, CheckCircle2, Truck, ShieldCheck, Phone, Mail } from 'lucide-react';
import { Header } from '../../components/Header';
import { useWizard } from '../../context/WizardContext';

export default function TrackPage() {
  const { currentOrder } = useWizard();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (
      currentOrder &&
      (searchOrderId.trim().toUpperCase() === currentOrder.orderId ||
        (searchPhone.trim() && searchPhone.trim() === currentOrder.customer.mobileNumber))
    ) {
      setFoundOrder(currentOrder);
    } else if (
      searchOrderId.trim().toUpperCase().startsWith('AM-') ||
      searchPhone.trim().length >= 10
    ) {
      // Demo mock order lookup for testing
      setFoundOrder({
        orderId: searchOrderId.trim().toUpperCase() || 'AM-260808-8492',
        createdAt: '08 Aug 2026, 03:30 PM',
        model: {
          name: 'iPhone 16 Pro Max',
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80'
        },
        color: { name: 'Desert Titanium' },
        storage: { size: '256GB' },
        months: 24,
        monthlyEmi: 20208,
        totalPrice: 485000,
        customer: {
          fullName: 'Muhammad Ali Shah',
          mobileNumber: searchPhone || '03001234567',
          deliveryAddress: 'Gulberg III, Lahore',
          deliveryType: 'open_parcel',
          paymentMethod: 'card'
        },
        status: 'Waiting for Approval'
      });
    } else {
      setFoundOrder(null);
    }
  };

  return (
    <div className="main-container">
      <Header />

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Link href="/" className="back-btn" title="Back to Home">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Track Your Order</h1>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Check real-time verification and TCS delivery status.
            </p>
          </div>
        </div>

        {/* Tracking Search Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            marginBottom: '24px'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Order ID</label>
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="e.g. AM-260808-4821"
                className="form-input"
              />
            </div>

            <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
              — OR —
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="xxxxxx-xxxxx"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '16px' }}>
              <Search size={18} /> Check Order Status
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        {searched && foundOrder && (
          <div
            style={{
              background: '#ffffff',
              border: '2px solid #22c55e',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 6px 20px rgba(34, 197, 94, 0.1)',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Order ID
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#d31820', letterSpacing: '0.5px' }}>
                  {foundOrder.orderId}
                </h3>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, background: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '20px', border: '1px solid #bbf7d0' }}>
                ● {foundOrder.status}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
              <img
                src={foundOrder.model.image}
                alt={foundOrder.model.name}
                style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10 }}
              />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{foundOrder.model.name}</h4>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  {foundOrder.storage.size} • {foundOrder.color.name}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a', marginTop: '2px' }}>
                  Rs. {foundOrder.monthlyEmi.toLocaleString('en-PK')} / month ({foundOrder.months} Mo)
                </p>
              </div>
            </div>

            {/* Timeline */}
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Status Timeline
            </h4>
            <div className="timeline">
              <div className="timeline-item active">
                <div className="timeline-badge">1</div>
                <div className="timeline-content">
                  <span className="timeline-title">Waiting for Approval</span>
                  <span className="timeline-subtitle">Verification agent reviewing mobile details and TCS dispatch.</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2</div>
                <div className="timeline-content">
                  <span className="timeline-title">Order Dispatched via TCS</span>
                  <span className="timeline-subtitle">Tracking number will be sent to {foundOrder.customer.mobileNumber}</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">3</div>
                <div className="timeline-content">
                  <span className="timeline-title">Delivered & Verified</span>
                  <span className="timeline-subtitle">Customer inspects open parcel before payment.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {searched && !foundOrder && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '16px',
              padding: '16px',
              color: '#991b1b',
              fontSize: '13px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            ❌ No active installment order found matching your search. Please check your Order ID or phone number.
          </div>
        )}

        <div className="mt-auto">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              borderRadius: '50px',
              border: '2px solid #e2e8f0',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
