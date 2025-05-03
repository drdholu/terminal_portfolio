"use client";

import { motion } from "framer-motion";

export default function TerminalIntro() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-foreground"
    >
      <motion.pre 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-mono mb-4 overflow-hidden text-accent/90"
      >
  {`                                        
  ██████╗   █████╗  ██████╗   █████╗  ███████╗
  ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔════╝
  ██████╔╝ ███████║ ██████╔╝ ███████║ ███████╗
  ██╔═══╝  ██╔══██║ ██╔══██╗ ██╔══██║ ╚════██║
  ██║      ██║  ██║ ██║  ██║ ██║  ██║ ███████║
  ╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝
`}
      </motion.pre>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p className="text-lg">hi i&apos;m <span className="text-accent font-bold">paras</span></p>
        <p className="mb-2 text-foreground/90">pursuing cse in coep</p>
        <p className="mb-2">type <span className="text-accent font-medium px-1.5 py-0.5 rounded bg-accent/10">help</span> or <span className="text-accent font-medium px-1.5 py-0.5 rounded bg-accent/10">ls</span> to learn more about me.</p>
      </motion.div>
    </motion.div>
  );
}