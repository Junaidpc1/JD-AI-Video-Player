import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  uri: string;
}

const VideoPlayer: React.FC<Props> = ({ uri }) => {
  const { volume, playbackSpeed } = usePlayer();

  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        style={styles.video}
        resizeMode="contain"
        volume={volume}
        rate={playbackSpeed}
        controls={false}
        paused={false}
        repeat
      />
    </View>
  );
};

export default VideoPlayer;
