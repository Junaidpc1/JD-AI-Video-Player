export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const paddedSecs = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${paddedSecs}`;
};
