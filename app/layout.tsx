import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Leancare Health | Jacksonville Primary Care + Wellness',
  description: 'Leancare Health provides primary care, wellness, telehealth, and family practice support in Jacksonville, Florida.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="/site-interactions.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
