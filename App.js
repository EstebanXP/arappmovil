import { StatusBar } from "expo-status-bar";
import React, { Fragment, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Navigation from "./screens/Navigation";
import bandsList from "./screens/bandsList";
import bandsCreate from "./screens/bandsCreate";
import bandsManagement from "./screens/bandsManagement";
import bandMembersList from "./screens/bandMembersList";
import bandMembersCreate from "./screens/bandMembersCreate";
import bandMembersManagement from "./screens/bandMembersManagement";
import liveShowsList from "./screens/liveShowsList";
import liveShowsCreate from "./screens/liveShowsCreate";
import liveShowsManagement from "./screens/liveShowsManagement";
import setListManagement from "./screens/setListManagement";
import setListCreate from "./screens/setListCreate";
import setList from "./screens/setList";
import setsManagement from "./screens/SetsManagement";
import setsCreate from "./screens/setsCreate";
import setsList from "./screens/setsList";
import songsManagement from "./screens/songsManagement";
import tagsList from "./screens/tagsList";
import tagsCreate from "./screens/tagsCreate";
import tagsManagements from "./screens/tagsManagements";
import RegisterUser from "./screens/registerUser";
import LoginUser from "./screens/loginUser";
import showSongs from "./screens/showSongs";
import rsm from "./screens/rsm";
import { navigationRef } from "./screens/RootNavigation";
import LoginTest from "./screens/LoginTest";
import demo from "./screens/demoNavigation.js";
import firebase from "./database/firebase";
import RoleContext from "./exports/RoleContext";
import { Button } from "react-native";
import {NativeBaseProvider} from "native-base"
import profile from "./screens/profile";
import Search from "./screens/searchFloat.js";
import { useFonts } from 'expo-font';
import Edit from './screens/editFloat.js' 
import Notification from './screens/notificationFloat' 

const Stack = createNativeStackNavigator();


export default function App() {
  const [userActive, setUserActive] = useState(false); //SI NECESITAN TRABAJAR NADA MAS CAMBIEN ESTE ESTADO A TRUE Y DEJARLO EN FALSE ANTES DE HACER COMMIT
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [role, setRole] = useState("");
  const [viewState, setViewState] = useState(true);

  const getUserFromDb = async (id) => {
    const dbRef = firebase.db.collection("Users").doc(id);
    const doc = await dbRef.get();
    const userData = doc.data();
    setRole(userData.userRole);
  };
  

  
  const config = {
  headerBackTitleVisible : false,
   headerStyle: {
     backgroundColor: "rgba(0,0,0,.9)",
     zIndex : 1
   },
   headerTintColor: '#fff',
   animationEnabled: false,
  };
  const configNav = {
    headerBackTitleVisible : false,
    headerLeft: ()=> null,
    headerStyle: {
      backgroundColor: "rgba(0,0,0,.9)"
    },
    headerTintColor: '#fff',
    animationEnabled: false,
   };

  useEffect(() => {
    if (user != null) {
      //getUserFromDb(user.uid);
    }
  });

  if (userActive === false) { 
    return (
      <View style={styles.container}>
        {viewState ? (
          <LoginUser
            u12={userActive}
            setUserActive={setUserActive}
            setUser={setUser}
            setRole={setRole}
            setUserName={setUserName}
            setName={setName}
            setViewState={setViewState}
            
          />
        ) : (
          <RegisterUser setViewState={setViewState}></RegisterUser>
        )}
      </View>
    );
  } else {
    return (
      <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
      
        <RoleContext.Provider value={role}>
          <Notification />
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={config} />
            <Stack.Screen name="Bands List" component={bandsList} options={config}/>
            <Stack.Screen name="Bands Create" component={bandsCreate} options={config}/>
            <Stack.Screen name="Bands Management" component={bandsManagement}  options={config}/>
            <Stack.Screen
              name="Band Members List"
              component={bandMembersList}
              options={config}
            />
            <Stack.Screen
              name="Band Members Create"
              component={bandMembersCreate}
              options={config}
            />
            <Stack.Screen
              name="Band Members Management"
              component={bandMembersManagement}
              options={config}
            />
            <Stack.Screen name="Live Shows List" component={liveShowsList} options={config}/>
            <Stack.Screen name="Live Shows Create" component={liveShowsCreate} options={config} />
            <Stack.Screen name="Live Shows Management" component={liveShowsManagement} options={config} />
            <Stack.Screen name="SetList Management" component={setListManagement} options={config}/>
            <Stack.Screen name="SetList Create" component={setListCreate} options={config} />
            <Stack.Screen name="SetList List" component={setList} options={config} />
            <Stack.Screen name="Sets Management" component={setsManagement} options={config}/>
            <Stack.Screen name="Sets Create" component={setsCreate} options={config}/>
            <Stack.Screen name="Sets Lists" component={setsList} options={config}/>
            <Stack.Screen name="Add Songs" component={songsManagement} options={config} />
            <Stack.Screen name="Tags List" component={tagsList} options={config}/>
            <Stack.Screen name="Tags Create" component={tagsCreate} options={config}/>
            <Stack.Screen name="Tags Management" component={tagsManagements} options={config}/>
            <Stack.Screen name="Register User" component={RegisterUser} options={config}/>
            <Stack.Screen name="Login User" component={LoginUser} />
            <Stack.Screen name="Show Songs" component={showSongs} options={config}/>
            <Stack.Screen name="Manage Song" component={rsm} options={config}/>
            <Stack.Screen name="Navigation" component={Navigation} options={config}/>
            <Stack.Screen name="Profile" component={profile} options={config} />
          </Stack.Navigator>
         
          <Search style={{zIndex: 4}}></Search>
          
          <Edit></Edit>
        <Navigation setUserActive={setUserActive} name={name} userName={userName} role={role}></Navigation>
        </RoleContext.Provider>
        
      </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    backgroundColor: '#000',
  },

});
/*
<NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}/>
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
      </NavigationContainer>*/
