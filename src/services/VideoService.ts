import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.webm', '.3gp', '.flv'];

const hasVideoExtension = (filename: string) => {
  return VIDEO_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to find videos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission request failed:', err);
      return false;
    }
  }
  return true;
};

const scanDirectory = async (dirPath: string): Promise<string[]> => {
  const videos: string[] = [];
  
  try {
    const exists = await RNFS.exists(dirPath);
    if (!exists) return videos;

    const items = await RNFS.readDir(dirPath);
    
    for (const item of items) {
      if (item.isFile() && hasVideoExtension(item.name)) {
        videos.push(item.path);
      } else if (item.isDirectory()) {
        // Recursively scan subdirectories (limit depth to avoid infinite loops)
        const subVideos = await scanDirectory(item.path);
        videos.push(...subVideos);
      }
    }
  } catch (error) {
    console.warn(`Failed to scan directory ${dirPath}:`, error);
  }

  return videos;
};

const loadDeviceVideos = async (): Promise<string[]> => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    console.warn('Storage permission denied');
    return [];
  }

  const searchPaths = [
    RNFS.ExternalStorageDirectoryPath + '/Movies',
    RNFS.ExternalStorageDirectoryPath + '/Download',
    RNFS.ExternalStorageDirectoryPath + '/DCIM',
    RNFS.ExternalStorageDirectoryPath,
  ];

  const allVideos: string[] = [];

  for (const path of searchPaths) {
    const videos = await scanDirectory(path);
    allVideos.push(...videos);
  }

  // Remove duplicates
  return [...new Set(allVideos)];
};

export default {
  loadDeviceVideos,
};