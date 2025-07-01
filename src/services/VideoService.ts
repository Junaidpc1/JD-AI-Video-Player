import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.webm'];

const hasVideoExtension = (filename: string) => {
  return VIDEO_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
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
  }
  return true;
};

const loadDeviceVideos = async (): Promise<string[]> => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) return [];

  const dirs = [RNFetchBlob.fs.dirs.SDCardDir];
  const videos: string[] = [];

  for (const dir of dirs) {
    try {
      const files = await RNFetchBlob.fs.ls(dir);
      for (const file of files) {
        if (hasVideoExtension(file)) {
          videos.push(`${dir}/${file}`);
        }
      }
    } catch (e) {
      console.warn('Failed to scan videos:', e);
    }
  }

  return videos;
};

export default {
  loadDeviceVideos,
};
