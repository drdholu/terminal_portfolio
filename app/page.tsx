// "use client";

// import { motion } from "framer-motion";
// import { Terminal, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

// export default function Home() {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="show"
//         className="terminal-window"
//       >
//         <div className="window-header">
//           <div className="window-controls">
//             <div className="window-button window-button-close" />
//             <div className="window-button window-button-minimize" />
//             <div className="window-button window-button-maximize" />
//           </div>
//           <div className="window-title">terminal@portfolio ~ -zsh</div>
//         </div>
        
//         <div className="window-content">
//           <motion.div variants={item} className="mb-8 text-center text-accent/50 text-sm">
//             <p>Press <kbd className="px-2 py-1 bg-accent/10 rounded">Ctrl/⌘</kbd> + <kbd className="px-2 py-1 bg-accent/10 rounded">K</kbd> to open command palette</p>
//           </motion.div>

//           <motion.section id="about" variants={item} className="terminal-section">
//             <h2 className="section-title text-xl mb-4">About Me</h2>
//             <p className="mb-4">
//               Hi! I&apos;m a <span className="highlight">Software Developer</span> with a passion for building
//               innovative solutions. Currently pursuing my <span className="highlight">Computer Science degree </span>
//               at COEP Technological University.
//             </p>
//             <p>
//               Core skills: <span className="highlight">TypeScript</span>, <span className="highlight">React</span>,
//               <span className="highlight">Node.js</span>, <span className="highlight">Python</span>
//             </p>
//           </motion.section>

//           <motion.section id="responsibilities" variants={item} className="terminal-section">
//             <h2 className="section-title text-xl mb-4">Positions of Responsibility</h2>
//             <ul className="list-disc list-inside space-y-2">
//               <li>Software Dev @ Students Developer Section</li>
//               <li>Web Head @ Impressions</li>
//               <li>Web Coord @ ASCII</li>
//             </ul>
//           </motion.section>

//           <motion.section id="projects" variants={item} className="terminal-section">
//             <h2 className="section-title text-xl mb-4">Projects</h2>
//             <div className="space-y-4">
//               <div className="p-4 border border-border rounded">
//                 <h3 className="text-lg font-bold mb-2">Project Name <ExternalLink className="inline-block w-4 h-4 ml-2" /></h3>
//                 <p className="text-foreground/80">A brief description of the project and its impact.</p>
//                 <div className="mt-2 space-x-2">
//                   <span className="text-xs bg-accent/10 px-2 py-1 rounded">React</span>
//                   <span className="text-xs bg-accent/10 px-2 py-1 rounded">Node.js</span>
//                   <span className="text-xs bg-accent/10 px-2 py-1 rounded">MongoDB</span>
//                 </div>
//               </div>
//             </div>
//           </motion.section>

//           <motion.section id="socials" variants={item} className="terminal-section">
//             <h2 className="section-title text-xl mb-4">Socials</h2>
//             <div className="flex space-x-4">
//               <a href="https://github.com" className="hover:text-accent transition-colors">
//                 <Github className="w-6 h-6" />
//               </a>
//               <a href="https://linkedin.com" className="hover:text-accent transition-colors">
//                 <Linkedin className="w-6 h-6" />
//               </a>
//             </div>
//           </motion.section>

//           <motion.section id="contact" variants={item} className="terminal-section">
//             <h2 className="section-title text-xl mb-4">Contact Me</h2>
//             <div className="flex items-center space-x-2">
//               <Mail className="w-5 h-5" />
//               <a href="mailto:example@email.com" className="hover:text-accent transition-colors">
//                 example@email.com
//               </a>
//             </div>
//           </motion.section>
//         </div>
//       </motion.div>
//     </main>
//   );
// }

"use client";

import Terminal from "@/components/terminal/terminal";

export default function Home() {
  return (
      <main className="min-h-screen px-3 sm:px-4 md:px-6 py-4 md:py-8 w-full max-w-5xl mx-auto">
        <Terminal />
      </main>
  );
}