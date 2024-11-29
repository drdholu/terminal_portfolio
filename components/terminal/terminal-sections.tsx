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

sections["help"] = {
  title: "Available Commands",
  content: (
    <ul className="list-disc list-inside space-y-2">
      {Object.keys(sections).map((cmd) => (
        <li key={cmd}>{cmd} - Display {sections[cmd].title}</li>
      ))}
      <li>cls or <span className="text-primary">Ctrl + L</span> - Clear the terminal</li>
    </ul>
  ),
};

function renderContent(key: string, data: any): React.ReactNode {
  switch (key) {
    case "Skills":
      return (
        <div>
          {data.details.map((skill: any) => (
            <div key={skill.name}>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <ul className="list-disc list-inside ml-4">
                {skill.technologies.map((tech: string) => (
                  <li key={tech}>{tech}</li>
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
            <div key={project.name} className="p-4 border border-border rounded mb-4">
              <Link href={project.link} target="_blank" className="text-lg font-bold">
                {project.name} {project.status && <span>({project.status})</span>}
              </Link>
              <p className="text-foreground/80">{project.description}</p>
              {project.technologies && (
                <div className="mt-2 space-x-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="text-xs bg-accent/10 px-2 py-1 rounded">
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
        <div>
          {data.details.map((role: any) => (
            <div key={role.position} className="mb-4">
              <h3 className="text-lg font-bold">{role.position}</h3>
              <p className="text-foreground/80">
                {role.organization} | {role.duration}
              </p>
              <ul className="list-disc list-inside ml-4">
                {role.responsibilities.map((resp: string) => (
                  <li key={resp}>{resp}</li>
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
            <div key={edu.degree} className="mb-4">
              <h3 className="text-lg font-bold">{edu.degree}</h3>
              <p className="text-foreground/80">{edu.institution}</p>
              <p>Expected Graduation: {edu.expected_graduation}</p>
              <p>CGPA: {edu.cgpa}</p>
            </div>
          ))}
        </div>
      );
    case "Contact":
      return (
        <div className="space-y-2">
          <p>Location: {data.details.location}</p>
          <p>
            LinkedIn:{" "}
            <a
              target="_blank"
              href={`https://${data.details.linkedin}`}
              className="hover:text-accent transition-colors"
            >
              {data.details.linkedin}
            </a>
          </p>
          <p>
            GitHub:{" "}
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