import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import VideoService from '../services/VideoService';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    VideoService.loadDeviceVideos().then(setVideos);
  }, []);

  const handlePlay = (uri: string) => {
    navigation.navigate('Player', { videoUri: uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePlay(item)}>
            <Text style={styles.itemText}>{item.split('/').pop()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#121212' },
  heading: { fontSize: 20, color: '#fff', marginBottom: 12 },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 14,
    borderRadius: 6,
    marginBottom: 10,
  },
  itemText: { color: '#eee' },
});
