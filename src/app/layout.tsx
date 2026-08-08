import type { Metadata } from 'next';
import './globals.css';
import { WizardProvider } from '../context/WizardContext';

export const metadata: Metadata = {
  title: 'Alfa Mobiles — 0% Markup Mobile Phone Installments in Pakistan',
  description: 'Buy flagship smartphones on 0% markup monthly installments up to 60 months. Cash on delivery & Open Parcel via TCS available nationwide.',
  keywords: 'Alfa Mobiles, mobile installment Pakistan, 0% markup phone, iPhone installment, Samsung EMI Lahore, Hafeez Center'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WizardProvider>
          {children}
        </WizardProvider>
      </body>
    </html>
  );
}
