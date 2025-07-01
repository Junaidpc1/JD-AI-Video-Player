import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const pickSubtitleFile = async (): Promise<string | null> => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.plainText],
    });

    const fileContent = await RNFS.readFile(result.uri, 'utf8');
    return fileContent;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) return null;
    throw err;
  }
};
