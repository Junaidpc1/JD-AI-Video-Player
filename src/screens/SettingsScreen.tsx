import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { PlayerContext } from '../context/PlayerContext';
import AppText from '../components/AppText';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { aiSubtitlesEnabled, setAiSubtitlesEnabled } = useContext(PlayerContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppText style={[styles.label, { color: theme.text }]}>
        Dark Mode
      </AppText>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={toggleTheme}
      />

      <AppText style={[styles.label, { color: theme.text }]}>
        AI Subtitles
      </AppText>
      <Switch
        value={aiSubtitlesEnabled}
        onValueChange={setAiSubtitlesEnabled}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 16,
  },
});
