import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';

const PhotoGallery = ({ photos, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Timer now resets every time `index` changes, whether from
  // auto-advance or a manual click — so a manual click always
  // buys a full `interval` of breathing room before the next auto-advance.
  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [index, next, interval, photos.length]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  if (!photos || photos.length === 0) return null;

  return (
    <GlassCard className="h-full w-full relative overflow-hidden border-blue-500/100">
      <div className="relative w-full h-full" style={{ transformStyle: 'flat' }}>
        {/* mode="sync" (the default) lets the incoming photo fade in
            while the outgoing one fades out, at the same time — no gap
            where the GlassCard's own translucent background shows through. */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={photos[index].src}
            alt={photos[index].alt || ''}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-sm p-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-800" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-sm p-2 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-neutral-800" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-blue-500' : 'w-2 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
};

export default PhotoGallery;