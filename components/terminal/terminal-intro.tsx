"use client";

import { motion } from "framer-motion";

export default function TerminalIntro() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 text-foreground"
    >
      <pre className="font-mono mb-4 overflow-x-scroll">
  {`                                        
  ██████╗   █████╗  ██████╗   █████╗  ███████╗
  ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔════╝
  ██████╔╝ ███████║ ██████╔╝ ███████║ ███████╗
  ██╔═══╝  ██╔══██║ ██╔══██╗ ██╔══██║ ╚════██║
  ██║      ██║  ██║ ██║  ██║ ██║  ██║ ███████║
  ╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝
`}
      </pre>
      <p className="">hi i&apos;m <span className="text-accent">paras</span></p>
      <p className="mb-2">pursuing cse in pune & a web dev</p>
      <p className="mb-2">type <span className="text-accent">help or ls</span> to learn more about me.</p>
    </motion.div>
  );
}