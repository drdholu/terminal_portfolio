"use client";

import { motion } from "framer-motion";

interface Section {
  title: string;
  content: React.ReactNode;
}

const sections: Record<string, Section> = {
  about: {
    title: "About Me",
    content: (
      <>
        <p className="mb-4">
          Hi! I&apos;m a <span className="highlight">Software Developer</span> with a passion for building
          innovative solutions. Currently pursuing my <span className="highlight">Computer Science degree </span>
          at COEP.
        </p>
        <p>
          Core skills: <span className="highlight">TypeScript</span>, <span className="highlight">React</span>,
          <span className="highlight">Node.js</span>, <span className="highlight">Python</span>
        </p>
      </>
    ),
  },
  respon: {
    title: "Positions of Responsibility",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Technical Lead @ Developer Student Club</li>
        <li>Open Source Contributor @ Example Organization</li>
        <li>Student Mentor @ University Programming Club</li>
      </ul>
    ),
  },
  proj: {
    title: "Projects",
    content: (
      <div className="space-y-4">
        <div className="p-4 border border-border rounded">
          <h3 className="text-lg font-bold mb-2">Project Name</h3>
          <p className="text-foreground/80">A brief description of the project and its impact.</p>
          <div className="mt-2 space-x-2">
            <span className="text-xs bg-accent/10 px-2 py-1 rounded">React</span>
            <span className="text-xs bg-accent/10 px-2 py-1 rounded">Node.js</span>
            <span className="text-xs bg-accent/10 px-2 py-1 rounded">MongoDB</span>
          </div>
        </div>
      </div>
    ),
  },
  soc: {
    title: "Socials",
    content: (
      <div className="flex space-x-4">
        <a target="_blank" href="https://github.com/drdholu" className="hover:text-accent transition-colors">GitHub</a>
        <a target="_blank" href="https://linkedin.com/in/parasdhole" className="hover:text-accent transition-colors">LinkedIn</a>
      </div>
    ),
  },
  cont: {
    title: "Contact Me",
    content: (
      <div className="space-y-2">
        <p>Email: <a href="mailto:example@email.com" className="hover:text-accent transition-colors">example@email.com</a></p>
      </div>
    ),
  },
  help: {
    title: "Available Commands",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>about - Display information about me</li>
        <li>respon - Show my positions of responsibility</li>
        <li>proj - View my projects</li>
        <li>soc - Display social media links</li>
        <li>cont - Show contact information</li>
        <li>help - Display this help message</li>
        <li>Ctrl + L - Clear the terminal</li>
      </ul>
    ),
  },
};

interface TerminalSectionsProps {
  command: string;
}

export default function TerminalSections({ command }: TerminalSectionsProps) {
  const section = sections[command.toLowerCase()];
  
  if (!section) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-red-500"
      >
        Command not found. Type &apos;help&apos; to see available commands.
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      {/* <h2 className="section-title text-xl mb-4">{section.title}</h2> */}
      {section.content}
    </motion.section>
  );
}