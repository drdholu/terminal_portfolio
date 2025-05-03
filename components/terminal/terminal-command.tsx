"use client";

import { motion } from "framer-motion";

interface TerminalCommandProps {
  command: string;
}

export default function TerminalCommand({ command }: TerminalCommandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="command-history"
    >
      <p className="terminal-prompt text-foreground/90">{command}</p>
    </motion.div>
  );
}