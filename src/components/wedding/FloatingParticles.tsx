import { useState } from "react";
import { useReducedMotion } from "framer-motion";

const FloatingParticles = () => {
  const reduceMotion = useReducedMotion();
  const [particles] = useState(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${3 + Math.random() * 5}px`,
  })));

  if (reduceMotion) return null;

  return (
    <div className="fixed inset-0 mx-auto max-w-lg pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
           className="absolute bottom-0 rounded-full bg-primary/30 opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
             animation: `float-particle ${p.duration} ease-in-out ${p.delay} 1 both`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
