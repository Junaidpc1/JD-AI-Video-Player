import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import SubtitleOverlay from '../components/SubtitleOverlay';
import Controls from '../components/Controls';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

const PlayerScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>();
  const { videoUri } = route.params;

  return (
    <View style={styles.container}>
      <VideoPlayer uri={videoUri} />
      <SubtitleOverlay videoPath={videoUri} />
      <Controls />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
});
