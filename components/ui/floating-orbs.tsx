"use client";

import { useEffect, useRef } from 'react';

export function FloatingOrbs() {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = orbsRef.current;
    if (!orbs) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      
      orbs.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={orbsRef} className="fixed inset-0 pointer-events-none">
      <div className="absolute top-20 left-1/3 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-40 right-1/3 w-32 h-32 bg-neutral-600 rounded-full blur-3xl opacity-20" />
    </div>
  );
}