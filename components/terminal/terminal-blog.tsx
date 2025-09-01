"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TerminalInput from "./terminal-input";
import TerminalCommand from "./terminal-command";
import { fadeInVariants, slideUpVariants, transitions, commonClasses, listStyles, terminalConfig } from "@/lib/ui-constants";

interface BlogEntry {
  id: number;
  title: string;
}

const BLOGS: BlogEntry[] = [
  { id: 1, title: "building my portfolio with next.js" },
  { id: 2, title: "why i love typescript" },
  { id: 3, title: "learning systems programming in rust" },
];

interface TerminalBlogProps {
  onExit: () => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function TerminalBlog({ onExit, scrollRef }: TerminalBlogProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // This component shares core features with the main terminal:
  // - Same TerminalInput and TerminalCommand components
  // - Own keyboard shortcuts (Ctrl+L, Ctrl+C) to avoid conflicts with main terminal
  // - Consistent styling and animations
  // - Same command history pattern
  
  // Auto-scroll similar to main terminal using provided ref
  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      window.scrollTo({ top: document.body.scrollHeight });
    }
  }, [history, scrollRef]);

  // Handle keyboard shortcuts (Ctrl/Cmd+C for exit, Ctrl/Cmd+L for clear) with capture & stopPropagation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isCmd = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (isCmd && key === "c") {
        e.preventDefault();
        e.stopPropagation();
        onExit();
        return;
      }

      if (isCmd && key === "l") {
        e.preventDefault();
        e.stopPropagation();
        setHistory([]);
        setInput("");
        return;
      }
    };

    // Use capture phase to intercept before other handlers
    window.addEventListener("keydown", handleKey, { capture: true });
    return () => window.removeEventListener("keydown", handleKey, { capture: true } as any);
  }, [onExit]);

  const clearHistory = () => setHistory([]);

  // Also respond to clear commands typed directly
  useEffect(() => {
    const cmd = input.trim().toLowerCase();
    if (terminalConfig.clearCommands.includes(cmd)) {
      clearHistory();
      setInput("");
    }
  }, [input]);

  const handleCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Exit triggers immediate return
    if (cmd === "exit") {
      onExit();
      return;
    }
    
    if (terminalConfig.clearCommands.includes(cmd)) {
      clearHistory();
      return;
    }

    setHistory((prev) => [...prev, cmd]);
  };

  const renderOutput = (cmd: string) => {
    const content = (() => {
      switch (cmd) {
        case "ls":
          return (
            <ul className={`${listStyles.caret} ml-4 space-y-1 mt-1`}>
              {BLOGS.map((post) => (
                <li key={post.id} className={commonClasses.interactive}>{post.title}</li>
              ))}
            </ul>
          );
        case "help":
          return (
            <ul className={`${listStyles.caret} ml-4 space-y-1 mt-1`}>
              <li><span className={commonClasses.terminalPrompt}>ls</span> - list available blogs</li>
              <li><span className={commonClasses.terminalPrompt}>exit</span> or <span className={commonClasses.tag}>Ctrl+C</span> - leave blog mode</li>
              <li><span className={commonClasses.terminalPrompt}>{terminalConfig.clearCommands.join(' or ')}</span> or <span className={commonClasses.tag}>Ctrl+L</span> - clear terminal</li>
            </ul>
          );
        default:
          return (
            <div className={commonClasses.error}>
              Command not found. Type <span className={commonClasses.tag}>help</span> to see available commands.
            </div>
          );
      }
    })();

    return (
      <motion.div
        variants={slideUpVariants}
        initial="hidden"
        animate="show"
        transition={transitions.normal}
        className="mb-8"
      >
        {content}
      </motion.div>
    );
  };

  return (
    <>
      {/* Header */}
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        transition={transitions.slow}
        className="mb-8 text-foreground"
      >
        <p className="text-lg">
          welcome to <span className={commonClasses.terminalPrompt}>my blogs</span>
        </p>
        <p className={`mb-2 ${commonClasses.terminalText}`}>
          type <span className={commonClasses.tag}>ls</span> to see available posts or <span className={commonClasses.tag}>help</span> for commands
        </p>
      </motion.div>

      {/* History */}
      <div className="space-y-4">
        {history.map((cmd, idx) => (
          <div key={idx}>
            <TerminalCommand command={cmd} />
            {renderOutput(cmd)}
          </div>
        ))}
      </div>

      {/* Input */}
      <TerminalInput value={input} onChange={setInput} onSubmit={handleCommand} />
    </>
  );
}
