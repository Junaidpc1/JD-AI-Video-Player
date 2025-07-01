import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PlayerContextType {
  volume: number;
  playbackSpeed: number;
  aiSubtitlesEnabled: boolean;
  setVolume: (v: number) => void;
  setPlaybackSpeed: (s: number) => void;
  setAiSubtitlesEnabled: (enabled: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [aiSubtitlesEnabled, setAiSubtitlesEnabled] = useState(true);

  return (
    <PlayerContext.Provider value={{ 
      volume, 
      playbackSpeed, 
      aiSubtitlesEnabled,
      setVolume, 
      setPlaybackSpeed,
      setAiSubtitlesEnabled
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};