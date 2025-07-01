import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  uri: string;
  onProgress?: (data: { currentTime: number }) => void;
}

const VideoPlayer: React.FC<Props> = ({ uri, onProgress }) => {
  const { volume, playbackSpeed } = usePlayer();
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<Video>(null);

  const handleProgress = (data: any) => {
    if (onProgress) {
      onProgress({ currentTime: data.currentTime });
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode="contain"
        volume={volume}
        rate={playbackSpeed}
        controls={false}
        paused={paused}
        repeat={false}
        onProgress={handleProgress}
        progressUpdateInterval={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;