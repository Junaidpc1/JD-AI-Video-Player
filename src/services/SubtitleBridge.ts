import { NativeModules } from 'react-native';

const { SubtitleModule } = NativeModules;

export const generateSubtitlesOffline = async (videoPath: string): Promise<string> => {
  try {
    const srt: string = await SubtitleModule.generateSubtitles(videoPath);
    return srt;
  } catch (error) {
    console.error('Native subtitle generation failed:', error);
    return '';
  }
};
