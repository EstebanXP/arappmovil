import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import bandsManagement from './screens/bandsManagement';
import bandsMembersManagement from './screens/bandsMembersManagement';
import liveShowsList from './screens/liveShowsList';
import liveShowsCreate from './screens/liveShowsCreate';
import liveShowsManagement from './screens/liveShowsManagement';
import setListManagement from './screens/setListManagement';
import songsManagement from './screens/songsManagement';
import tagsList from './screens/tagsList';
import tagsCreate from './screens/tagsCreate';
import tagsManagements from './screens/tagsManagements';
import registerUser from './screens/registerUser';
import loginUser from './screens/loginUser';
import showSongs from './screens/showSongs';
import rsm from './screens/rsm';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}  />
          <Stack.Screen name="Bands Management" component={bandsManagement}  />
          <Stack.Screen name="Bands Members Management" component={bandsMembersManagement}  />
          <Stack.Screen name="Live Shows List" component={liveShowsList}  />
          <Stack.Screen name="Live Shows Create" component={liveShowsCreate}  />
          <Stack.Screen name="Live Shows Management" component={liveShowsManagement}  />
          <Stack.Screen name="Set List Management" component={setListManagement}  />
          <Stack.Screen name="Add Songs" component={songsManagement}  />
          <Stack.Screen name="Tags List" component={tagsList}  />
          <Stack.Screen name="Tags Create" component={tagsCreate}  />
          <Stack.Screen name="Tags Management" component={tagsManagements}  />
          <Stack.Screen name="Register User" component={registerUser}  />
          <Stack.Screen name="Login User" component={loginUser}  />
          <Stack.Screen name="Show Songs" component={showSongs}  />
          <Stack.Screen name="Manage Song" component={rsm}  />
          
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
