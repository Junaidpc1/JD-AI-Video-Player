import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import SubtitleOverlay from '../components/SubtitleOverlay';
import Controls from '../components/Controls';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

const PlayerScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>();
  const { videoUri } = route.params;
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeekBackward = () => {
    // Implement seek backward logic
    console.log('Seek backward 10 seconds');
  };

  const handleSeekForward = () => {
    // Implement seek forward logic
    console.log('Seek forward 10 seconds');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <VideoPlayer 
        uri={videoUri} 
        onProgress={handleProgress}
      />
      <SubtitleOverlay 
        videoPath={videoUri} 
        currentTime={currentTime}
      />
      <Controls 
        onPlayPause={handlePlayPause}
        onSeekBackward={handleSeekBackward}
        onSeekForward={handleSeekForward}
        isPlaying={isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black' 
  },
});

export default PlayerScreen;