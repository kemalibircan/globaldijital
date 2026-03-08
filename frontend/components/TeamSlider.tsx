'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    alt: 'Ekip çalışması',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    alt: 'Profesyonel toplantı',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    alt: 'Ofis ortamı',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    alt: 'Ekip iş birliği',
  },
];

const AUTOPLAY_MS = 5000;

export default function TeamSlider() {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5">
      {/* Slider container */}
      <div className="relative aspect-[21/9] min-h-[280px] md:min-h-[320px] overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${(i - index) * 100}%)`,
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Önceki"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-trustworthy-blue hover:text-white hover:border-trustworthy-blue transition-all shadow-lg z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Sonraki"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-white hover:bg-trustworthy-blue hover:text-white hover:border-trustworthy-blue transition-all shadow-lg z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index
                  ? 'bg-trustworthy-blue w-8'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Caption bar */}
      <div className="px-6 py-4 bg-white dark:bg-white/5 border-t border-gray-100 dark:border-white/10 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{index + 1} / {SLIDES.length}</span>
      </div>
    </div>
  );
}
