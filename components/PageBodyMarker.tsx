'use client';

import { useEffect } from 'react';

export function PageBodyMarker({ page }: { page: string }) {
  useEffect(() => {
    document.body.dataset.page = page;
    return () => {
      delete document.body.dataset.page;
    };
  }, [page]);

  return null;
}
