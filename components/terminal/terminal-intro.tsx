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
{`           __________                                 
         .'----------'.                              
         | .--------. |                             
         | |########| |       __________              
         | |########| |      /__________\             
.--------| '--------' |------|    --=-- |-------------.
|        '----,-.-----'      |o ======  |             | 
|       ______|_|_______     |__________|             | 
|      /  %%%%%%%%%%%%  \\                            | 
|     /  %%%%%%%%%%%%%%  \\                           | 
|     ^^^^^^^^^^^^^^^^^^^^                            | 
+-----------------------------------------------------+
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
`}
      </pre>
      <p className="">hi i&apos;m <span className="text-accent">paras</span></p>
      <p className="mb-2">pursuing cse in pune & a web dev</p>
      <p className="mb-2">type <span className="text-accent">help</span> to learn more about me.</p>
      {/* <div className="text-muted">
        <p>Press <kbd className="px-2 py-1 bg-accent/10 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-accent/10 rounded">L</kbd> to clear the terminal.</p>
      </div> */}
    </motion.div>
  );
}