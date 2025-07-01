import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { usePlayer } from '../context/PlayerContext';
import AppText from '../components/AppText';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { aiSubtitlesEnabled, setAiSubtitlesEnabled, volume, setVolume } = usePlayer();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <AppText style={[styles.title, { color: theme.text }]}>Settings</AppText>
      </View>

      <View style={styles.settingItem}>
        <AppText style={[styles.label, { color: theme.text }]}>
          Dark Mode
        </AppText>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme.mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <AppText style={[styles.label, { color: theme.text }]}>
          AI Subtitles
        </AppText>
        <Switch
          value={aiSubtitlesEnabled}
          onValueChange={setAiSubtitlesEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={aiSubtitlesEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <AppText style={[styles.label, { color: theme.text }]}>
          Volume: {Math.round(volume * 100)}%
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 18,
  },
});

export default SettingsScreen;