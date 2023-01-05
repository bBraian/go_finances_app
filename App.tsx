import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './src/screens/Dashboard';
import theme from './src/global/styles/theme';


export function App() {
  return (
    <ThemeProvider theme={theme}>

      <Dashboard />
    </ThemeProvider>
  )
}