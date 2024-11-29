"use client";

import { motion } from "framer-motion";

interface TerminalCommandProps {
  command: string;
}

export default function TerminalCommand({ command }: TerminalCommandProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center mb-2 font-mono"
    >
      <span className="text-accent mr-2">$</span>
      <span>{command}</span>
    </motion.div>
  );
}