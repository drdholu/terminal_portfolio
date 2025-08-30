import { useEffect } from "react";

/**
 * Registers a global Ctrl+L shortcut that triggers the provided callback.
 * Ensures cleanup on unmount and updates when callback reference changes.
 */
export function useClearShortcut(onClear: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        onClear();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClear]);
}
