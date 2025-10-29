"use client";

import { KeyboardEvent, useEffect, useRef } from "react";
import { terminalConfig, commonClasses } from "@/lib/ui-constants";

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
}

export default function TerminalInput({ value, onChange, onSubmit }: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Keep focus on the input element
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle window clicks to maintain focus on input
  useEffect(() => {
    const handleWindowClick = () => {
      inputRef.current?.focus();
    };
    
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
      onChange("");
      
      // Small delay to ensure DOM updates before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className={`${commonClasses.flexCenter} mt-5 justify-start`}>
      <span className={`${commonClasses.terminalPrompt} mr-2`}>
        {terminalConfig.promptSymbol}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 bg-transparent border-none outline-none ${commonClasses.terminalText}`}
        autoFocus
      />
    </div>
  );
}