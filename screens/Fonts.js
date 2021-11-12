import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function font() {
    const [loaded] = useFonts({
        CerebriSansRegular: require('../assets/fonts/CerebriSans-Regular.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
}