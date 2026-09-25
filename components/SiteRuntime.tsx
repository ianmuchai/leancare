'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    LeanCareInit?: () => void;
  }
}

export function SiteRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => window.LeanCareInit?.();
    run();
    const frame = window.requestAnimationFrame(run);
    const timer = window.setTimeout(run, 80);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
