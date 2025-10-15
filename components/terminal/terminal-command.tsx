"use client";

import { motion } from "framer-motion";
import { slideDownVariants, transitions, terminalConfig, commonClasses } from "@/lib/ui-constants";

interface TerminalCommandProps {
  command: string;
}

export default function TerminalCommand({ command }: TerminalCommandProps) {
  return (
    <motion.div
      variants={slideDownVariants}
      initial="hidden"
      animate="show"
      transition={transitions.fast}
      className="command-history"
    >
      <p className={`terminal-prompt  text-accent`}>
        <span className={`${commonClasses.terminalPrompt} mr-2`}>{terminalConfig.promptSymbol}</span>
        {command}
      </p>
    </motion.div>
  );
}