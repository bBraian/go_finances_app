import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { AppRoutes } from './src/routes/app.routes';

export function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  if(!fontsLoaded) {
    return <Text>loading</Text>
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <AppRoutes />

      </NavigationContainer>
    </ThemeProvider>
  )
}