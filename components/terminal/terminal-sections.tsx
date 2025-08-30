"use client";

import { motion } from "framer-motion";

interface InfoType {
  Skills: { details: { name: string; technologies: string[]; }[]; };
  Projects: { details: { name: string; status: string; link: string; description: string; technologies: string[]; }[]; };
  "Positions of Responsibility": { details: { position: string; organization: string; duration: string; responsibilities: string[]; }[]; };
  Education: { details: { degree: string; institution: string; expected_graduation: string; cgpa: string; }[]; };
  Contact: { details: { location: string; linkedin: string; github: string; } };
}

import info from "../../lib/user-info";
import Link from "next/link";
import TerminalBlog from "./terminal-blog";

interface Section {
  title?: string;
  content?: React.ReactNode;
}

const sections: Record<string, Section> = {};

Object.keys(info).forEach((key) => {
    const commandKey = key.toLowerCase().replace(/\s+/g, '').slice(0, 3);
    sections[commandKey] = {
        title: key,
        content: renderContent(key, (info as InfoType)[key as keyof InfoType])
    };
});

// Register blog section before generating help content
sections["blg"] = {
    title: "Blogs",
    content: <TerminalBlog onExit={() => {}} />
};

const helpContent = {
  title: "Available Commands",
  content: (
    <ul className="list-caret space-y-2">
      {Object.keys(sections).map((cmd) => (
        <li key={cmd}>{cmd} - Display {sections[cmd].title}</li>
      ))}
      <li>cls or <span className="text-primary">Ctrl + L</span> - Clear the terminal</li>
    </ul>
  ),
};

sections["help"] = helpContent;
sections["ls"] = helpContent;

function renderContent(key: string, data: any): React.ReactNode {
  switch (key) {
    case "Skills":
      return (
        <div>
          {data.details.map((skill: any) => (
            <div key={skill.name} className="mb-4">
              <h3 className="text-lg font-bold text-accent/90">{skill.name}</h3>
              <ul className="list-asterisk ml-4 space-y-1">
                {skill.technologies.map((tech: string) => (
                  <li key={tech} className="hover:text-accent transition-colors">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "Projects":
      return (
        <div>
          {data.details.map((project: any) => (
            <div key={project.name} className="project-card">
              <Link href={project.link} target="_blank" className="text-lg font-bold group">
                {project.name} {project.status && <span className="font-normal text-sm text-accent/70">({project.status})</span>}
              </Link>
              <p className="text-foreground/80 mt-2">{project.description}</p>
              {project.technologies && (
                <div className="mt-3">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "Positions of Responsibility":
      return (
        <div className="space-y-6">
          {data.details.map((role: any) => (
            <div key={role.position} className="project-card">
              <h3 className="text-lg font-bold text-accent/90">{role.position}</h3>
              <p className="text-foreground/80">
                <span className="font-medium">{role.organization}</span> | <span className="text-accent/70">{role.duration}</span>
              </p>
              <ul className="list-arrow ml-4 mt-2 space-y-1">
                {role.responsibilities.map((resp: string) => (
                  <li key={resp} className="text-foreground/90">{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "Education":
      return (
        <div>
          {data.details.map((edu: any) => (
            <div key={edu.degree} className="project-card">
              <h3 className="text-lg font-bold text-accent/90">{edu.degree}</h3>
              <p className="text-foreground/90 font-medium">{edu.institution}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <p><span className="text-foreground/70">Expected Graduation:</span> {edu.expected_graduation}</p>
                <p><span className="text-foreground/70">CGPA:</span> {edu.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "Contact":
      return (
        <div className="space-y-3 project-card">
          <p className="flex items-center gap-2">
            <span className="text-foreground/70">📍 Location:</span> {data.details.location}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-foreground/70">🔗 LinkedIn:</span> 
            <a
              target="_blank"
              href={`https://${data.details.linkedin}`}
              className="hover:text-accent transition-colors"
            >
              {data.details.linkedin}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-foreground/70">💻 GitHub:</span>
            <a
              target="_blank"
              href={`https://${data.details.github}`}
              className="hover:text-accent transition-colors"
            >
              {data.details.github}
            </a>
          </p>
        </div>
      );
    default:
      return <div>No content available.</div>;
  }
}

interface TerminalSectionsProps {
  command: string;
}

export default function TerminalSections({ command }: TerminalSectionsProps) {
  const section = sections[command.toLowerCase()];
  
  if (!section) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 text-red-500 p-3 border border-red-500/20 rounded bg-red-500/5"
      >
        Command not found. Type &apos;help&apos; or &apos;ls&apos; to see available commands.
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      {section.content}
    </motion.section>
  );
}