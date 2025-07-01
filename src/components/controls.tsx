import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Controls = () => {
  // Placeholder: Extend with usePlayer or other states
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="replay-10" size={32} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerBtn}>
        <Icon name="pause" size={40} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="forward-10" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  centerBtn: {
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 40,
  },
});
