import React from 'react';

interface GermanFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GermanFlagBadge: React.FC<GermanFlagProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-5',
    md: 'w-14 h-9',
    lg: 'w-24 h-15',
  }[size];

  return (
    <div
      className={`inline-block overflow-hidden rounded-md shadow-md border border-stone-200/40 dark:border-stone-700/60 ${dimensions} ${className}`}
      title="Bundesflagge Deutschland (Germaniya bayrog'i)"
      role="img"
      aria-label="Germaniya bayrog'i: Qora, Qizil, Oltin rangli chiziqlar"
    >
      <svg
        viewBox="0 0 5 3"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        {/* Black band (Schwarz) */}
        <rect width="5" height="1" y="0" fill="#000000" />
        {/* Red band (Rot) */}
        <rect width="5" height="1" y="1" fill="#DD0000" />
        {/* Gold/Yellow band (Gold) */}
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    </div>
  );
};
