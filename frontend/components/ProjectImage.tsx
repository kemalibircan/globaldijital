'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Web: yatay (16/9), Mobil: dikey (9/16) */
  orientation: 'landscape' | 'portrait';
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Ana galeride mobil görseli tam sığdırmak için: wrapper sabit boyutta, görsel object-contain */
  fillContainer?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  orientation,
  className = '',
  sizes,
  priority = false,
  fillContainer = false,
}: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (!src) {
    const aspectClass =
      orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-500 ${aspectClass} ${className}`}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageIcon className="w-10 h-10 opacity-50" />
          <span className="text-xs font-medium">Görsel yüklenecek</span>
        </div>
      </div>
    );
  }

  const aspectClass =
    orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-500 ${aspectClass} ${className}`}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageIcon className="w-10 h-10 opacity-50" />
          <span className="text-xs font-medium">Görsel yüklenecek</span>
        </div>
      </div>
    );
  }

  if (fillContainer) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes={sizes}
          priority={priority}
          onError={() => setError(true)}
        />
      </div>
    );
  }

  const wrapperClass = `relative overflow-hidden ${aspectClass} ${className}`;

  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}
