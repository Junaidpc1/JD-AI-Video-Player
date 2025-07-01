import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import VideoService from '../services/VideoService';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useContext(ThemeContext);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const videoList = await VideoService.loadDeviceVideos();
      setVideos(videoList);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadVideos();
    setRefreshing(false);
  };

  const handlePlay = (uri: string) => {
    navigation.navigate('Player', { videoUri: uri });
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || 'Unknown';
  };

  const renderVideoItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={[styles.item, { backgroundColor: theme.mode === 'dark' ? '#1f1f1f' : '#f5f5f5' }]} 
      onPress={() => handlePlay(item)}
    >
      <Icon name="play-circle-outline" size={24} color={theme.text} style={styles.playIcon} />
      <Text style={[styles.itemText, { color: theme.text }]} numberOfLines={2}>
        {getFileName(item)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.text }]}>JD Video Player</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
          <Icon name="settings" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading videos...</Text>
        </View>
      ) : videos.length === 0 ? (
        <View style={styles.centerContainer}>
          <Icon name="video-library" size={64} color={theme.text} style={styles.emptyIcon} />
          <Text style={[styles.emptyText, { color: theme.text }]}>No videos found</Text>
          <Text style={[styles.emptySubText, { color: theme.text }]}>
            Make sure you have video files on your device
          </Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item}
          renderItem={renderVideoItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.mode === 'dark' ? '#fff' : '#000']}
            />
          }
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  settingsButton: {
    padding: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  playIcon: {
    marginRight: 12,
  },
  itemText: { 
    fontSize: 16,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default HomeScreen;