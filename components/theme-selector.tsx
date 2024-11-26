"use client";

import { useState } from 'react';
import { Monitor, Moon, Sun, Terminal } from 'lucide-react';
import { themes, type ThemeName } from '@/lib/themes';
import { useTheme } from 'next-themes';

export default function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors"
        aria-label="Toggle theme selector"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 p-2 rounded-lg bg-background border border-border shadow-lg min-w-[200px]">
          {Object.entries(themes).map(([themeName, theme]) => (
            <button
              key={themeName}
              onClick={() => handleThemeChange(themeName as ThemeName)}
              className={`w-full px-4 py-2 text-left rounded hover:bg-muted transition-colors ${
                themeName === theme ? 'bg-muted' : ''
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}