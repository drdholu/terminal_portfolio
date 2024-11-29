"use client";

import { useEffect, useState, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSearch("");
    }
  }, [open]);

  const sections = [
    { id: "about", label: "About Me" },
    { id: "responsibilities", label: "Positions of Responsibility" },
    { id: "projects", label: "Projects" },
    { id: "socials", label: "Socials" },
    { id: "contact", label: "Contact Me" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          {/* <Command className="cmd-palette">
            <div className="flex items-center border-b border-green-500/20 px-4">
              <span className="text-green-500 mr-2">$</span>
              <Command.Input
                ref={inputRef}
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none py-4 text-green-400 placeholder:text-green-500/50"
              />
            </div>
            <Command.List className="py-2 max-h-96 overflow-y-auto">
              <Command.Empty className="px-4 py-2 text-green-500/50">
                No results found.
              </Command.Empty>
              {sections.map((section) => (
                <Command.Item
                  key={section.id}
                  value={section.label}
                  onSelect={() => scrollToSection(section.id)}
                  className="command-item text-green-400"
                >
                  {section.label}
                </Command.Item>
              ))}
            </Command.List>
          </Command> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}