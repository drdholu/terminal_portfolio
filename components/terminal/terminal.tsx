"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { RotateCcw } from "lucide-react";
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
  const INITIAL_X = 0;
  const INITIAL_Y = 0;
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [blogMode, setBlogMode] = useState(false);
  // Drag-related values (controlled for simple reset)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: INITIAL_X, y: INITIAL_Y });
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

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

  // No dynamic bounds: keep drag simple and predictable

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
    <Draggable
      handle=".window-header"
      cancel=".reset-drag-cancel, input, textarea, button, a, .no-drag"
      position={position}
      nodeRef={nodeRef}
      onStart={() => setIsDragging(true)}
      onDrag={(e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onStop={(e: DraggableEvent, data: DraggableData) => {
        setIsDragging(false);
        const moved = Math.abs(data.x - INITIAL_X) > 0.5 || Math.abs(data.y - INITIAL_Y) > 0.5;
        setHasMoved(moved);
      }}
    >
      <motion.div 
        ref={nodeRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transitions.slow}
        className={`terminal-window${isDragging ? " select-none" : ""}`}
      >
      <div 
        className={`window-header ${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none`}
      >
        <div className="window-controls">
          <div className="window-button window-button-close" />
          <div className="window-button window-button-minimize" />
          <div className="window-button window-button-maximize" />
        </div>
        <div className="window-title">{terminalConfig.windowTitle}</div>
        {hasMoved && (
          <button
            type="button"
            aria-label="Reset position"
            className="reset-drag-cancel absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded p-0 text-foreground/60 hover:text-foreground transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              setPosition({ x: INITIAL_X, y: INITIAL_Y });
              setHasMoved(false);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
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
    </Draggable>
  );
}