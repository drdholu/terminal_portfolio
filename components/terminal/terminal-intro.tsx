"use client";

import useSWR from 'swr';
import { motion } from "framer-motion";


export default function TerminalIntro() {
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('/api/spotify', fetcher, { refreshInterval: 10000 });
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
      {/* <p className="mb-2">im currently listening to <span className="text-accent lowercase">{data.title}</span></p> */}
      <p className="mb-2">type <span className="text-accent">help or ls</span> to learn more about me.</p>
      {/* <div className="text-muted">
        <p>Press <kbd className="px-2 py-1 bg-accent/10 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-accent/10 rounded">L</kbd> to clear the terminal.</p>
      </div> */}
    </motion.div>
  );
}