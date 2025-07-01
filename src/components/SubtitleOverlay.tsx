import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { generateSubtitlesOffline } from '../services/SubtitleBridge';
import { parseSRT, SubtitleLine } from '../utils/parseSRT';
import Video from 'react-native-video';

interface Props {
  videoPath: string;
}

const SubtitleOverlay: React.FC<Props> = ({ videoPath }) => {
  const [lines, setLines] = useState<SubtitleLine[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState<string>('');

  useEffect(() => {
    (async () => {
      const srt = await generateSubtitlesOffline(videoPath);
      const parsed = parseSRT(srt);
      setLines(parsed);
    })();
  }, [videoPath]);

  useEffect(() => {
    const matched = lines.find(line => currentTime >= line.start && currentTime <= line.end);
    setCurrentLine(matched?.text || '');
  }, [currentTime, lines]);

  return (
    <>
      <Video
        source={{ uri: videoPath }}
        style={{ height: 0, width: 0 }} // Hidden dummy player just to get time
        onProgress={({ currentTime }) => setCurrentTime(currentTime)}
        paused={true}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{currentLine || '⏳ Generating subtitles...'}</Text>
      </View>
    </>
  );
};

export default SubtitleOverlay;

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
    padding: 6,
    borderRadius: 6,
    textAlign: 'center',
  },
});
