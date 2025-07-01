import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPlayPause?: () => void;
  onSeekBackward?: () => void;
  onSeekForward?: () => void;
  isPlaying?: boolean;
}

const Controls: React.FC<Props> = ({ 
  onPlayPause, 
  onSeekBackward, 
  onSeekForward,
  isPlaying = false 
}) => {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSeekBackward} style={styles.button}>
        <Icon name="replay-10" size={32} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onPlayPause} style={styles.centerBtn}>
        <Icon 
          name={isPlaying ? "pause" : "play-arrow"} 
          size={40} 
          color="#fff" 
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onSeekForward} style={styles.button}>
        <Icon name="forward-10" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    padding: 12,
  },
  centerBtn: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 40,
  },
});

export default Controls;