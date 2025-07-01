export interface SubtitleLine {
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
}

const timeToSeconds = (time: string): number => {
  const [hh, mm, ss] = time.replace(',', '.').split(':');
  const [sec, ms] = ss.split('.');
  return (
    parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(sec) + parseInt(ms || '0') / 1000
  );
};

export const parseSRT = (srtText: string): SubtitleLine[] => {
  const entries = srtText.trim().split('\n\n');
  return entries.map((entry) => {
    const lines = entry.split('\n');
    if (lines.length < 3) return null;
    const [startTime, endTime] = lines[1].split(' --> ').map(timeToSeconds);
    return {
      start: startTime,
      end: endTime,
      text: lines.slice(2).join(' '),
    };
  }).filter(Boolean) as SubtitleLine[];
};
