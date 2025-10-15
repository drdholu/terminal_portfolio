"use client";

import { motion } from "framer-motion";
import { slideUpVariants, transitions, commonClasses, listStyles, terminalConfig } from "@/lib/ui-constants";
import Link from "next/link";
import TerminalBlog from "./terminal-blog";
import info from "../../lib/user-info";

interface InfoType {
  Skills: { details: { name: string; technologies: string[]; }[]; };
  Projects: { details: { name: string; status: string; link: string; description: string; technologies: string[]; }[]; };
  "Positions of Responsibility": { details: { position: string; organization: string; duration: string; responsibilities: string[]; }[]; };
  Education: { details: { degree: string; institution: string; expected_graduation: string; cgpa: string; }[]; };
  Contact: { details: { location: string; linkedin: string; github: string; } };
  Experience: { details: { role: string; company: string; duration: string; responsibilities?: string[]; technologies?: string[]; }[]; };
}

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
    <ul className={`${listStyles.caret} space-y-2`}>
      {Object.keys(sections).map((cmd) => (
        <li key={cmd} className={commonClasses.interactive}>
          <span className={commonClasses.terminalPrompt}>{cmd}</span> - Display {sections[cmd].title}
        </li>
      ))}
      <li>
        <span className={commonClasses.terminalPrompt}>
          {terminalConfig.clearCommands.join(' or ')}
        </span> or <span className={commonClasses.tag}>Ctrl + L</span> - Clear the terminal
      </li>
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
              <h3 className={`text-lg font-bold ${commonClasses.terminalPrompt}`}>{skill.name}</h3>
              <ul className={`${listStyles.asterisk} ml-4 space-y-1`}>
                {skill.technologies.map((tech: string) => (
                  <li key={tech} className={commonClasses.interactive}>
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
            <div key={project.name} className={`${commonClasses.card} ${commonClasses.cardHover} project-card`}>
              <Link href={project.link} target="_blank" className={`text-lg font-bold group ${commonClasses.interactive}`}>
                {project.name} {project.status && <span className={`font-normal text-sm ${commonClasses.terminalMuted}`}>({project.status})</span>}
              </Link>
              <p className={`${commonClasses.terminalMuted} mt-2`}>{project.description}</p>
              {project.technologies && (
                <div className="mt-3">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className={commonClasses.tag}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "Experience":
      return (
        <div className="space-y-6">
          {data.details.map((exp: any) => (
            <div key={`${exp.role}-${exp.company}-${exp.duration}`} className={`${commonClasses.card} ${commonClasses.cardHover} project-card`}>
              <h3 className={`text-lg font-bold ${commonClasses.terminalPrompt}`}>{exp.role}</h3>
              <p className={commonClasses.terminalMuted}>
                <span className="font-medium">{exp.company}</span> | <span className={commonClasses.terminalPrompt}>{exp.duration}</span>
              </p>
              {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                <ul className={`${listStyles.arrow} ml-4 mt-2 space-y-1`}>
                  {exp.responsibilities.map((resp: string) => (
                    <li key={resp} className={commonClasses.terminalText}>{resp}</li>
                  ))}
                </ul>
              )}
              {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                <div className="mt-3">
                  {exp.technologies.map((tech: string) => (
                    <span key={tech} className={commonClasses.tag}>
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
            <div key={role.position} className={`${commonClasses.card} ${commonClasses.cardHover} project-card`}>
              <h3 className={`text-lg font-bold ${commonClasses.terminalPrompt}`}>{role.position}</h3>
              <p className={commonClasses.terminalMuted}>
                <span className="font-medium">{role.organization}</span> | <span className={commonClasses.terminalPrompt}>{role.duration}</span>
              </p>
              <ul className={`${listStyles.arrow} ml-4 mt-2 space-y-1`}>
                {role.responsibilities.map((resp: string) => (
                  <li key={resp} className={commonClasses.terminalText}>{resp}</li>
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
            <div key={edu.degree} className={`${commonClasses.card} ${commonClasses.cardHover} project-card`}>
              <h3 className={`text-lg font-bold ${commonClasses.terminalPrompt}`}>{edu.degree}</h3>
              <p className={`${commonClasses.terminalText} font-medium`}>{edu.institution}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <p><span className={commonClasses.terminalMuted}>Expected Graduation:</span> {edu.expected_graduation}</p>
                <p><span className={commonClasses.terminalMuted}>CGPA:</span> {edu.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "Contact":
      return (
        <div className={`space-y-3 ${commonClasses.card} ${commonClasses.cardHover} project-card`}>
          <p className={commonClasses.flexCenter}>
            <span className={commonClasses.terminalMuted}>📍 Location:</span> {data.details.location}
          </p>
          <p className={commonClasses.flexCenter}>
            <span className={commonClasses.terminalMuted}>🔗 LinkedIn:</span> 
            <a
              target="_blank"
              href={`https://${data.details.linkedin}`}
              className={commonClasses.interactive}
            >
              {data.details.linkedin}
            </a>
          </p>
          <p className={commonClasses.flexCenter}>
            <span className={commonClasses.terminalMuted}>💻 GitHub:</span>
            <a
              target="_blank"
              href={`https://${data.details.github}`}
              className={commonClasses.interactive}
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
  // Lookup uses normalized command, display uses raw command elsewhere
  const section = sections[command.trim().toLowerCase()];
  
  if (!section) {
    return (
      <motion.div
        variants={slideUpVariants}
        initial="hidden"
        animate="show"
        transition={transitions.normal}
        className={`mb-4 ${commonClasses.error}`}
      >
        Command not found. Type <span className={commonClasses.tag}>help</span> or <span className={commonClasses.tag}>ls</span> to see available commands.
      </motion.div>
    );
  }

  return (
    <motion.section
      variants={slideUpVariants}
      initial="hidden"
      animate="show"
      transition={transitions.normal}
      className="mb-8"
    >
      {section.content}
    </motion.section>
  );
}