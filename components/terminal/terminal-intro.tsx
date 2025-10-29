"use client";

import { motion } from "framer-motion";
import { useSpotifySong } from "@/hooks/use-spotify";
import { fadeInVariants, slideDownVariants, transitions, commonClasses } from "@/lib/ui-constants";

export default function TerminalIntro() {
  const { song, isError: error } = useSpotifySong();

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      transition={transitions.slow}
      className="mb-8 text-foreground"
    >
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        transition={transitions.delayed}
      >
        <p className="text-lg">
          hi i&apos;m <span className={commonClasses.terminalPrompt}>paras</span>
        </p>
        <p className="mb-2 text-base">pursuing <span className={commonClasses.terminalPrompt}>cse</span> in coep. im a <span className={commonClasses.terminalPrompt}>full stack dev</span> and currently exploring <span className={commonClasses.terminalPrompt}>backend/system design</span> techniques.</p>
        <p></p>
        <p className="mb-2 mt-5 text-sm">
          type{" "}
          <span className={commonClasses.tag}>help</span>{" "}
          or{" "}
          <span className={commonClasses.tag}>ls</span>{" "}
          to learn more about me.
        </p>
      </motion.div>
      
      <motion.div
        variants={slideDownVariants}
        initial="hidden"
        animate="show"
        transition={transitions.normal}
        className="my-6"
      >
        {error && !song && (
          <div className={`${commonClasses.flexCenter} space-x-2 ${commonClasses.error}`}>
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <p className="text-accent/90 text-sm">
              Unable to fetch song from Spotify.
            </p>
          </div>
        )}
        
        {song?.isPlaying && (
          <div className={`group ${commonClasses.card} ${commonClasses.cardHover} bg-accent/5 border-accent/20`}>
            <p className={`${commonClasses.terminalMuted} text-xs mb-2`}>currently listening to</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              {song.image && (
                <div className="dither">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={song.image} 
                    alt={song.name} 
                    className="w-16 h-16 sm:w-12 sm:h-12 rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0" 
                  />
                </div>
              )}
              <div className="text-accent/90 overflow-hidden flex-1 min-w-0">
                <p className="truncate font-medium text-sm sm:text-base">{song.name}</p>
                <p className={`text-xs sm:text-sm truncate ${commonClasses.terminalMuted}`}>by {song.artist}</p>
              </div>
            </div>
          </div>
        )}

        {song && song.isPlaying === false && (
          <div className={`group ${commonClasses.card} ${commonClasses.cardHover} bg-accent/5 border-accent/20`}>
            <p className={`${commonClasses.terminalMuted} text-xs mb-2`}>
              currently listening to <span className="font-medium text-accent/90">nothing</span>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-md border border-accent/20 bg-transparent flex-shrink-0"></div>
              <div className="text-accent/90 overflow-hidden flex-1 min-w-0">
                <p className="truncate font-medium text-sm sm:text-base">N/A</p>
                <p className={`text-xs sm:text-sm truncate ${commonClasses.terminalMuted}`}>by N/A</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}