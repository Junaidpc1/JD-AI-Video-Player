import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PlayerContextType {
  volume: number;
  playbackSpeed: number;
  setVolume: (v: number) => void;
  setPlaybackSpeed: (s: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  return (
    <PlayerContext.Provider value={{ volume, playbackSpeed, setVolume, setPlaybackSpeed }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
