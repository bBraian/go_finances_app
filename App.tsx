import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { StatusBar, Text } from 'react-native';

import { Routes } from './src/routes';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider, useAuth } from './src/hooks/auth';

export function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  if(!fontsLoaded || userStorageLoading) {
    return <Text>loading</Text>
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <AuthProvider>
            <Routes />
          </AuthProvider>

    </ThemeProvider>
  )
}