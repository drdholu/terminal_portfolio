"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TerminalInput from "./terminal-input";
import TerminalCommand from "./terminal-command";
import { useClearShortcut } from "@/hooks/use-clear-shortcut";

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
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default function TerminalBlog({ onExit, scrollRef }: TerminalBlogProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // Auto-scroll similar to main terminal using provided ref
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, scrollRef]);

  // Handle Ctrl+C (exit)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit]);

  const clearHistory = () => setHistory([]);

  useClearShortcut(clearHistory);

  // Also respond to 'cls' or 'clear' typed directly
  useEffect(() => {
    if (input.trim().toLowerCase() === "cls" || input.trim().toLowerCase() === "clear") {
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
    if (cmd === "cls" || cmd === "clear") {
      clearHistory();
      return;
    }

    setHistory((prev) => [...prev, cmd]);
  };

  const renderOutput = (cmd: string) => {
    switch (cmd) {
      case "ls":
        return (
          <ul className="list-caret ml-4 space-y-1 mt-1">
            {BLOGS.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        );
      case "help":
        return (
          <ul className="list-caret ml-4 space-y-1 mt-1">
            <li>ls - list available blogs</li>
            <li>exit or Ctrl+C - leave blog mode</li>
          </ul>
        );
      default:
        return (
          <div className="text-red-500 p-3 border border-red-500/20 rounded bg-red-500/5">
            Command not found. Type &apos;help&apos; to see available commands.
          </div>
        );
    }
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-foreground"
      >
        <p className="text-lg">
          welcome to <span className="text-accent font-bold">my blogs</span>
        </p>
        <p className="mb-2 text-foreground/90">type &apos;ls&apos; to see available posts or &apos;help&apos; for commands</p>
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
