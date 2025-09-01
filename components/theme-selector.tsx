"use client";

import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { themes, type ThemeName } from '@/lib/themes';
import { useTheme } from 'next-themes';
import { commonClasses } from '@/lib/ui-constants';

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
        className={`p-2 rounded-full ${commonClasses.button} ${commonClasses.flexCenter}`}
        aria-label="Toggle theme selector"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {open && (
        <div className={`absolute bottom-full right-0 mb-2 ${commonClasses.card} shadow-lg min-w-[200px]`}>
          {Object.entries(themes).map(([themeName, themeConfig]) => (
            <button
              key={themeName}
              onClick={() => handleThemeChange(themeName as ThemeName)}
              className={`w-full px-4 py-2 text-left rounded ${commonClasses.interactive} ${
                themeName === theme ? commonClasses.success.replace('p-3 border border-accent/20 rounded', 'bg-accent/10') : ''
              }`}
            >
              {themeConfig.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}