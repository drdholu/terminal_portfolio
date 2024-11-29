"use client";

import { KeyboardEvent } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
}

export default function TerminalInput({ value, onChange, onSubmit }: TerminalInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
      onChange("");
    }
  };

  return (
    <div className="flex items-center font-mono">
      <span className="text-accent mr-2">$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none"
        autoFocus
      />
    </div>
  );
}