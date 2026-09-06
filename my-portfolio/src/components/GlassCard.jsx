import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-3xl border border-black/10 bg-white/[0.5] backdrop-blur-xl group ${className}`}
    >
      {/* Moving Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${x}px ${y}px,
              rgba(0, 255, 17, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Internal Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;