import { Platform } from 'react-native';

export interface SubtitleLine {
  start: number;
  end: number;
  text: string;
}

const parseSRT = (srtText: string): SubtitleLine[] => {
  const entries = srtText.trim().split('\n\n');
  return entries.map((entry) => {
    const lines = entry.split('\n');
    const [startTime, endTime] = lines[1]
      .split(' --> ')
      .map((t) => timeToSeconds(t.trim()));
    return {
      start: startTime,
      end: endTime,
      text: lines.slice(2).join('\n'),
    };
  });
};

const timeToSeconds = (time: string): number => {
  const [hh, mm, ss] = time.replace(',', '.').split(':');
  const [sec, ms] = ss.split('.');
  return (
    parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(sec) + parseInt(ms || '0') / 1000
  );
};

const fetchAI_Subtitles = async (videoUri: string): Promise<SubtitleLine[]> => {
  const simulatedSRT = `
1
00:00:01,000 --> 00:00:03,000
This is a sample subtitle.

2
00:00:04,000 --> 00:00:06,000
Generated by AI.
  `;
  return parseSRT(simulatedSRT);
};

export default {
  fetchAI_Subtitles,
};
