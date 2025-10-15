"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import TerminalIntro from "./terminal-intro";
import TerminalInput from "./terminal-input";
import TerminalCommand from "./terminal-command";
import TerminalSections from "./terminal-sections";
import TerminalBlog from "./terminal-blog";
import { slideUpVariants, fadeInVariants, transitions, terminalConfig } from "@/lib/ui-constants";

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
    const cmd = input.trim().toLowerCase();
    if (terminalConfig.clearCommands.includes(cmd)) {
        setHistory([]);
        setInput("");
    }
  }, [input]);

  const handleCommand = (command: string) => {
    if (!command.trim()) return;
    const normalized = command.trim().toLowerCase();

    if (normalized === "blg") {
      setBlogMode(true);
      setInput("");
      return;
    }

    // Preserve the user's original input for display (including leading space)
    setHistory((prev) => [...prev, command]);
  };

  return (
    <motion.div 
      variants={slideUpVariants}
      initial="hidden"
      animate="show"
      transition={transitions.slow}
      className="terminal-window"
    >
      <div className="window-header">
        <div className="window-controls">
          <div className="window-button window-button-close" />
          <div className="window-button window-button-minimize" />
          <div className="window-button window-button-maximize" />
        </div>
        <div className="window-title">{terminalConfig.windowTitle}</div>
      </div>
      
      <motion.div 
        className="window-content"
        ref={terminalContentRef}
        style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        transition={transitions.delayed}
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