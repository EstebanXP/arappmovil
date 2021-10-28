import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import bandsList from './screens/bandsList';
import bandsCreate from './screens/bandsCreate';
import bandsManagement from './screens/bandsManagement';
import bandMembersList from './screens/bandMembersList';
import bandMembersCreate from './screens/bandMembersCreate';
import bandMembersManagement from './screens/bandMembersManagement';
import liveShowsList from './screens/liveShowsList';
import liveShowsCreate from './screens/liveShowsCreate';
import liveShowsManagement from './screens/liveShowsManagement';
import setListManagement from './screens/setListManagement';
import songsManagement from './screens/songsManagement';
import tagsList from './screens/tagsList';
import tagsCreate from './screens/tagsCreate';
import tagsManagements from './screens/tagsManagements';
import registerUser from './screens/registerUser';
import LoginUser from './screens/LoginUser';
import showSongs from './screens/showSongs';
import rsm from './screens/rsm';
import LoginTest from './screens/LoginTest';

const Stack=createNativeStackNavigator();

export default function App() {

  const [userActive,setUserActive]=useState(true);//SI NECESITAN TRABAJAR NADA MAS CAMBIEN ESTE ESTADO A TRUE Y DEJARLO EN FALSE ANTES DE HACER COMMIT
  if(userActive===false){
    return(
        <LoginUser></LoginUser>
    );
  }else{
  return (
      <NavigationContainer>
        
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}  />
          <Stack.Screen name="Bands List" component={bandsList}  />
          <Stack.Screen name="Bands Create" component={bandsCreate}  />
          <Stack.Screen name="Bands Management" component={bandsManagement}  />
          <Stack.Screen name="Band Members List" component={bandMembersList}  />
          <Stack.Screen name="Band Members Create" component={bandMembersCreate}  />
          <Stack.Screen name="Band Members Management" component={bandMembersManagement}  />
          <Stack.Screen name="Live Shows List" component={liveShowsList}  />
          <Stack.Screen name="Live Shows Create" component={liveShowsCreate}  />
          <Stack.Screen name="Live Shows Management" component={liveShowsManagement}  />
          <Stack.Screen name="Set List Management" component={setListManagement}  />
          <Stack.Screen name="Add Songs" component={songsManagement}  />
          <Stack.Screen name="Tags List" component={tagsList}  />
          <Stack.Screen name="Tags Create" component={tagsCreate}  />
          <Stack.Screen name="Tags Management" component={tagsManagements}  />
          <Stack.Screen name="Register User" component={registerUser}  />
          <Stack.Screen name="Login User" component={LoginUser}  />
          <Stack.Screen name="Show Songs" component={showSongs}  />
          <Stack.Screen name="Manage Song" component={rsm}  />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
