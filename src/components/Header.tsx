'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

interface HeaderProps {
  onOpenLookup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLookup }) => {
  return (
    <header className="header">
      <Link href="/" className="logo-container">
        <Image
          src="/logo.jpeg"
          alt="Alfa Mobiles By Hafeez Center - اب ہر موبائل قسط پر"
          width={190}
          height={62}
          className="logo-img"
          priority
        />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link
          href="/track"
          onClick={(e) => {
            if (onOpenLookup) {
              // Option to trigger modal or navigate
            }
          }}
          title="Track Order Status"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 800,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease'
          }}
        >
          <img
            src="/track.svg"
            alt="Track Icon"
            style={{ width: 16, height: 16, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          Track
        </Link>

        <div className="contact-box">
          <span className="contact-label">Contact Us</span>
          <div className="contact-icons">
            <a
              href="https://wa.me/923000000000?text=Hi%20Alfa%20Mobiles,%20I%20have%20an%20installment%20query"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn icon-whatsapp"
              title="Chat on WhatsApp"
            >
              <Phone size={15} />
            </a>
            <a
              href="mailto:support@alfamobiles.pk"
              className="icon-btn icon-email"
              title="Email Support"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
