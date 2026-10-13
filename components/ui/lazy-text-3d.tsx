'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface LazyText3DProps {
  text: string;
  className?: string;
  layersCount?: number;
  spacing?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hue?: number;
  interactive?: boolean;
  showBadge?: boolean;
  fallbackClassName?: string;
}

// Dynamically import the Text3D component with ssr: false
// This ensures SEO crawlers immediately receive the plain HTML fallback,
// and client bundle weight for 3D physics is lazily initialized without blocking initial render.
const DynamicText3D = dynamic(
  () => import('./text-3d').then((mod) => mod.Text3D),
  {
    ssr: false,
    loading: () => null,
  }
);

export function LazyText3D({
  text,
  className,
  fallbackClassName,
  ...props
}: LazyText3DProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="inline-block relative">
      {/* 
        Semantic HTML for search engines and screen readers.
        Before JS hydration or for bots, this clean text is visible and indexed.
      */}
      {!mounted ? (
        <span className={fallbackClassName || 'font-extrabold tracking-tight text-zinc-900 dark:text-white'}>
          {text}
        </span>
      ) : (
        <DynamicText3D text={text} className={className} {...props} />
      )}
    </div>
  );
}
