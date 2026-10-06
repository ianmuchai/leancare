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
            <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.42 0 .05 5.37.05 11.99c0 2.11.55 4.18 1.6 6.01L0 24l6.14-1.61a11.93 11.93 0 0 0 5.9 1.5h.01c6.62 0 12-5.37 12-11.99 0-3.2-1.25-6.21-3.53-8.42ZM12.05 21.86h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.64.95.97-3.55-.23-.37a9.86 9.86 0 0 1-1.51-5.31c0-5.43 4.42-9.84 9.86-9.84 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.96c-.01 5.43-4.43 9.86-9.87 9.86Zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
          </svg>
        </a>
        <Script src="/site-interactions.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
