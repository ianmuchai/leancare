import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteRuntime } from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Leancare Health | Jacksonville Primary Care + Wellness',
  description: 'Leancare Health provides primary care, wellness, telehealth, and family practice support in Jacksonville, Florida.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteRuntime />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="/site-interactions.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
