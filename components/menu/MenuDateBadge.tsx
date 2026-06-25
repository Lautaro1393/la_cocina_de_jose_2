'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export function MenuDateBadge() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatter.format(new Date()));
  }, []);

  return (
    <span
      className="text-xs uppercase tracking-wider text-text-muted"
      suppressHydrationWarning
    >
      {label ?? '\u00A0'}
    </span>
  );
}
