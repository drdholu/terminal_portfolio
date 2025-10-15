// Shared UI constants and animation variants for consistency across components

import { Variants } from "framer-motion";

// Animation variants for consistent motion across components
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 }
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Transition configurations
export const transitions = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  delayed: { delay: 0.3, duration: 0.5 }
} as const;

// Common spacing values
export const spacing = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  xxl: "3rem"      // 48px
} as const;

// Common class combinations for consistency
export const commonClasses = {
  // Card-like containers
  card: "p-4 sm:p-5 md:p-6 border border-border rounded-lg bg-background/50 backdrop-blur-sm",
  cardHover: "transition-all duration-200 hover:border-accent/30 hover:bg-accent/5",
  
  // Terminal-style text elements
  terminalPrompt: "text-accent font-bold",
  terminalText: "text-accent leading-relaxed",
  terminalMuted: "text-foreground/70 leading-relaxed",
  
  // Interactive elements
  interactive: "transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-sm",
  button: "px-3 py-1.5 rounded border border-border bg-background hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
  
  // Layout helpers
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  
  // Tags and badges
  tag: "text-xs bg-accent/10 px-2 py-1 rounded transition-all duration-200 hover:bg-accent/20",
  
  // Error states
  error: "text-red-500 p-3 border border-red-500/20 rounded bg-red-500/5",
  
  // Success states
  success: "text-accent p-3 border border-accent/20 rounded bg-accent/5"
} as const;

// Terminal-specific constants
export const terminalConfig = {
  promptSymbol: "$ ",
  sectionPrefix: "## ",
  windowTitle: "portfolio@terminal ~ -bash",
  clearCommands: ["cls", "clear"] as string[],
  helpCommands: ["help", "ls"] as string[]
} as const;

// List style variants for terminal-like lists
export const listStyles = {
  caret: "list-caret",
  arrow: "list-arrow", 
  asterisk: "list-asterisk",
  dash: "list-dash",
  tree: "list-tree"
} as const;
