"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
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
  const CONSTRAINT_MARGIN = 20; // keep a bit inside the viewport
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [blogMode, setBlogMode] = useState(false);
  // Drag-related refs and values
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(INITIAL_X);
  const y = useMotionValue(INITIAL_Y);
  const [dragBounds, setDragBounds] = useState<{ top: number; right: number; bottom: number; left: number }>({ top: 0, right: 0, bottom: 0, left: 0 });
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

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setDragBounds({
        left: -(rect.left - CONSTRAINT_MARGIN),
        top: -(rect.top - CONSTRAINT_MARGIN),
        right: vw - rect.right - CONSTRAINT_MARGIN,
        bottom: vh - rect.bottom - CONSTRAINT_MARGIN,
      });
    };
    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('orientationchange', updateBounds);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('orientationchange', updateBounds);
    };
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
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transitions.slow}
      className={`terminal-window${isDragging ? " select-none" : ""}`}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={dragBounds}
      dragMomentum={false}
      style={{ x, y }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        const moved = Math.abs(x.get() - INITIAL_X) > 0.5 || Math.abs(y.get() - INITIAL_Y) > 0.5;
        setHasMoved(moved);
      }}
    >
      <div 
        className={`window-header ${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none`}
        onPointerDown={(e) => {
          // Gate dragging to fine pointers (desktop), ignore touch
          const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
          if (!isFinePointer || (e as any).pointerType === 'touch') return;
          e.preventDefault();
          // Recalculate bounds at the moment of drag start so current position/size are accounted for
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            setDragBounds({
              left: -(rect.left - CONSTRAINT_MARGIN),
              top: -(rect.top - CONSTRAINT_MARGIN),
              right: vw - rect.right - CONSTRAINT_MARGIN,
              bottom: vh - rect.bottom - CONSTRAINT_MARGIN,
            });
          }
          dragControls.start(e);
        }}
      >
        <div className="window-controls">
          <div className="window-button window-button-close" />
          <div className="window-button window-button-minimize" />
          <div className="window-button window-button-maximize" />
        </div>
        <div className="window-title">{terminalConfig.windowTitle}</div>
        {(isDragging || hasMoved) && (
          <div className="ml-auto flex items-center pl-2">
            <button
              type="button"
              aria-label="Reset position"
              className="inline-flex items-center justify-center rounded px-2 py-1 text-foreground/70 hover:text-foreground transition-colors"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                x.set(INITIAL_X);
                y.set(INITIAL_Y);
                setHasMoved(false);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
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
  );
}