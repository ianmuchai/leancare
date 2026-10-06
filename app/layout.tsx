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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteRuntime />
        <SiteHeader />
        {children}
        <SiteFooter />
        <a className="whatsapp-float" href="https://wa.me/19042019232" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12.04 4.1a7.86 7.86 0 0 0-6.72 11.94l-.84 3.1 3.18-.83a7.86 7.86 0 1 0 4.38-14.21Z" />
            <path d="M9.3 8.2c-.18-.4-.38-.41-.56-.42h-.48c-.17 0-.45.06-.68.32-.23.26-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.78 2.84 4.39 3.86 2.17.85 2.61.68 3.08.64.47-.04 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.22-.06-.1-.24-.17-.5-.3l-1.78-.87c-.26-.13-.45-.2-.64.2-.19.39-.73.87-.9 1.05-.17.17-.34.19-.62.06-.28-.13-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.27-.47.09-.19.05-.36-.02-.5l-.82-1.94Z" />
          </svg>
        </a>
        <Script src="/site-interactions.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
