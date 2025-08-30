"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import TerminalIntro from "./terminal-intro";
import TerminalInput from "./terminal-input";
import TerminalCommand from "./terminal-command";
import TerminalSections from "./terminal-sections";
import TerminalBlog from "./terminal-blog";

interface HistoryItem {
  command: string;
  output: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [blogMode, setBlogMode] = useState(false);

  // Auto scroll effect when history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setHistory([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (input.trim().toLowerCase() === "cls" || input.trim().toLowerCase() === "clear") {
        setHistory([]);
        setInput("");
    }
  }, [input]);

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    const cmd = command.trim().toLowerCase();

    if (cmd === "blg") {
      setBlogMode(true);
      setInput("");
      return;
    }

    setHistory((prev) => [...prev, cmd]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="terminal-window"
    >
      <div className="window-header">
        <div className="window-title">portfolio@terminal ~ -bash</div>
        <div className="window-controls">
          <div className="window-button window-button-close" />
          <div className="window-button window-button-minimize" />
          <div className="window-button window-button-maximize" />
        </div>
      </div>
      
      <motion.div 
        className="window-content"
        ref={terminalContentRef}
        style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {blogMode ? (
          <TerminalBlog onExit={() => setBlogMode(false)} scrollRef={terminalContentRef} />
        ) : (
          <>
            <TerminalIntro />
            <div className="space-y-4">
              {history.map((command, index) => (
                <div key={index}>
                  <TerminalCommand command={command} />
                  <TerminalSections command={command} />
                </div>
              ))}
            </div>
            <TerminalInput
              value={input}
              onChange={setInput}
              onSubmit={handleCommand}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}