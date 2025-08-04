"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { themes } from '@/lib/themes';
import { motion } from 'framer-motion';

export default function MouseBlob() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const { theme = 'matrix' } = useTheme();

  // Get the current theme's accent color - recalculated when theme changes
  const [accentColor, setAccentColor] = useState<string | null>(null);

  // Resolve accent color only on client after mount to avoid hydration mismatch
  useEffect(() => {
    const currentTheme = themes[theme as keyof typeof themes];
    setAccentColor(currentTheme?.colors.accent || '#00ff00');
  }, [theme]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      // Set isMoving to true when mouse moves
      setIsMoving(true);

      // Reset the timeout on each mouse move
      clearTimeout(timeoutId);

      // Set a timeout to set isMoving to false after mouse stops
      timeoutId = setTimeout(() => {
        setIsMoving(false);
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full blur-xl"
      animate={{
        x: position.x - 25, // Center the blob on cursor
        y: position.y - 25, // Center the blob on cursor
        opacity: isMoving ? 0.4 : 0.2, // More visible when moving
        scale: isMoving ? 1.2 : 1, // Slightly larger when moving
      }}
      transition={{
        x: { type: "spring", damping: 18, stiffness: 120 },
        y: { type: "spring", damping: 18, stiffness: 120 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: accentColor ?? 'transparent',
        boxShadow: accentColor ? `0 0 25px 8px ${accentColor}` : 'none',
      }}
    />
  );
}
