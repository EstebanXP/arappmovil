import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import bandsManagement from './screens/bandsManagement';
import bandsMembersManagement from './screens/bandsMembersManagement';
import liveShowsManagement from './screens/liveShowsManagement';
import setListManagement from './screens/setListManagement';
import songsManagement from './screens/songsManagement';
import tagsManagements from './screens/tagsManagements';
import registerUser from './screens/registerUser';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}  />
          <Stack.Screen name="Bands Management" component={bandsManagement}  />
          <Stack.Screen name="Bands Members Management" component={bandsMembersManagement}  />
          <Stack.Screen name="Live Shows Management" component={liveShowsManagement}  />
          <Stack.Screen name="Set List Management" component={setListManagement}  />
          <Stack.Screen name="Songs Management" component={songsManagement}  />
          <Stack.Screen name="Tags Management" component={tagsManagements}  />
          <Stack.Screen name="Register User" component={registerUser}  />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
