import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { generateSubtitlesOffline } from '../services/SubtitleBridge';
import { parseSRT, SubtitleLine } from '../utils/parseSRT';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  videoPath: string;
  currentTime: number;
}

const SubtitleOverlay: React.FC<Props> = ({ videoPath, currentTime }) => {
  const [lines, setLines] = useState<SubtitleLine[]>([]);
  const [currentLine, setCurrentLine] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { aiSubtitlesEnabled } = usePlayer();

  useEffect(() => {
    if (!aiSubtitlesEnabled) {
      setLoading(false);
      return;
    }

    const loadSubtitles = async () => {
      try {
        setLoading(true);
        const srt = await generateSubtitlesOffline(videoPath);
        const parsed = parseSRT(srt);
        setLines(parsed);
      } catch (error) {
        console.error('Failed to load subtitles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubtitles();
  }, [videoPath, aiSubtitlesEnabled]);

  useEffect(() => {
    if (!aiSubtitlesEnabled || lines.length === 0) {
      setCurrentLine('');
      return;
    }

    const matched = lines.find(line => currentTime >= line.start && currentTime <= line.end);
    setCurrentLine(matched?.text || '');
  }, [currentTime, lines, aiSubtitlesEnabled]);

  if (!aiSubtitlesEnabled) return null;

  return (
    <View style={styles.overlay}>
      {loading ? (
        <Text style={styles.text}>⏳ Generating subtitles...</Text>
      ) : currentLine ? (
        <Text style={styles.text}>{currentLine}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SubtitleOverlay;