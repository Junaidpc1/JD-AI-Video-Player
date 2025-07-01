import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { PlayerProvider } from './src/context/PlayerContext';
import { ThemeProvider } from './src/context/ThemeContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <PlayerProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;
