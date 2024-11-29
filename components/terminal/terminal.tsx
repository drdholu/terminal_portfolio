"use client";

import { useEffect, useState } from "react";
import TerminalIntro from "./terminal-intro";
import TerminalInput from "./terminal-input";
import TerminalCommand from "./terminal-command";
import TerminalSections from "./terminal-sections";

interface HistoryItem {
  command: string;
  output: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

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
    if (command.trim()) {
      setHistory((prev) => [...prev, command.trim().toLowerCase()]);
    }
  };

  return (
    <div className="terminal-window">
      <div className="window-header">
        <div className="window-controls">
          <div className="window-button window-button-close" />
          <div className="window-button window-button-minimize" />
          <div className="window-button window-button-maximize" />
        </div>
        <div className="window-title">terminal@portfolio ~ -zsh</div>
      </div>
      
      <div className="window-content">
        <TerminalIntro />
        
        {history.map((command, index) => (
          <div key={index}>
            <TerminalCommand command={command} />
            <TerminalSections command={command} />
          </div>
        ))}
        
        <TerminalInput
          value={input}
          onChange={setInput}
          onSubmit={handleCommand}
        />
      </div>
    </div>
  );
}