"use client";

import { motion } from "framer-motion";
import useSWR from "swr";
import { useEffect } from "react";

interface SpotifySong {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  played_at: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export default function TerminalIntro() {
  const {
    data: song,
    error,
  } = useSWR<SpotifySong>("/api/spotify", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // avoid refetching within 60 s
  });



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-foreground"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p className="text-lg">
          hi i&apos;m <span className="text-accent font-bold">paras</span>
        </p>
        <p className="mb-2 text-foreground/90">pursuing cse in coep</p>
        <p className="mb-2">
          type{" "}
          <span className="text-accent font-medium px-1.5 py-0.5 rounded bg-accent/10">
            help
          </span>{" "}
          or{" "}
          <span className="text-accent font-medium px-1.5 py-0.5 rounded bg-accent/10">
            ls
          </span>{" "}
          to learn more about me.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="my-6"
      >

        {error && !song && (
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <p className="font-mono text-accent/90 text-sm">
              Unable to fetch song from Spotify.
            </p>
          </div>
        )}
        {song && (
          <div className="group p-3 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors duration-200">
            <p className="font-mono text-accent/70 text-xs mb-2">currently listening to</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              {song.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={song.image} 
                  alt={song.name} 
                  className="w-16 h-16 sm:w-12 sm:h-12 rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200 flex-shrink-0" 
                />
              )}
              <div className="font-mono text-accent/90 overflow-hidden flex-1 min-w-0">
                <p className="truncate font-medium text-sm sm:text-base">{song.name}</p>
                <p className="text-xs sm:text-sm truncate text-foreground/70">by {song.artist}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}