"use client";

import { motion } from "framer-motion";
import { Music } from 'lucide-react';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

interface TerminalIntroProps {
  spotifyData: SpotifyData | undefined;
}

export default function TerminalIntro({ spotifyData }: TerminalIntroProps) {
  if (!spotifyData) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!spotifyData?.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Music size={20} />
        <span>Not playing</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 text-foreground"
    >
      <pre className="font-mono mb-4 overflow-x-scroll">
  {`                                        
  ██████╗   █████╗  ██████╗   █████╗  ███████╗
  ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██╔════╝
  ██████╔╝ ███████║ ██████╔╝ ███████║ ███████╗
  ██╔═══╝  ██╔══██║ ██╔══██╗ ██╔══██║ ╚════██║
  ██║      ██║  ██║ ██║  ██║ ██║  ██║ ███████║
  ╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝
`}
      </pre>
      <p className="">hi i&apos;m <span className="text-accent">paras</span></p>
      <p className="mb-2">pursuing cse in pune & a web dev</p>
      <p className="mb-2">im currently listening to <span className="text-accent lowercase">{spotifyData.title}</span></p>
      <p className="mb-2">type <span className="text-accent">help or ls</span> to learn more about me.</p>
    </motion.div>
  );
}