import axios from 'axios';
import { SubtitleLine } from '../src/services/SubtitleService';

const API_BASE = 'https://your-subtitle-api.com'; // Replace with real server

export const getSubtitles = async (videoUri: string): Promise<SubtitleLine[]> => {
  try {
    const res = await axios.post(`${API_BASE}/generate`, { videoUri });
    return res.data.subtitles;
  } catch (e) {
    console.error('Subtitle API error:', e);
    return [];
  }
};
