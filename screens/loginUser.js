import React, {useState} from "react";
import { StyleSheet, View, TextInput, Alert} from 'react-native';

//import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import { render } from "react-dom";
import { useFonts } from 'expo-font';
import { Container, Button, Center, NativeBaseProvider,Stack, Input, Heading, Text} from "native-base"
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
class LoginUser extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
    }
  }
  
  getData=async (id)=>{
    const dbRef = firebase.db.collection("Users").doc(id);
    const doc = await dbRef.get();
    const userData = doc.data();
    this.props.setRole(userData.userRole);
  }

  loginAccount =()=>{
    firebase.firebase.app().auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then((user)=>{
      this.props.setUserActive(true);
      this.props.setUser(user.user);
      this.getData(user.user.uid);
    })
    .catch((error)=>{
      Alert.alert('Sorry. ' + error.message)
      
    })
    firebase.firebase.app().auth().onAuthStateChanged((user)=>{
      if(user){
        Alert.alert("Signed in");
      }
    })
  }
    render(){
      return (
        
        <NativeBaseProvider>
          <View style={styles.container}>
            <Heading textAlign="center" size="2xl" mb="10" mt="20">
                  Sign In
                </Heading>
            <Stack
              space={4}
              w={{
                base: "75%",
                md: "25%",
              }}
            >
              <Center>
                <Input variant="underlined" placeholder="username/email" onChangeText={(email) => {
                  this.setState({email:email})
                }} value={this.state.email}/>
                <Input variant="underlined" placeholder="password" mb="10" onChangeText={(password) => {
                  this.setState({password:password})
                }} 
                value={this.state.password} 
                secureTextEntry={true}
                autoCorrect={false}/>
              </Center>
              
            </Stack>
            <Button size={'lg'} onPress={this.loginAccount} mb="5" >Sign In</Button>
            <Text fontSize="sm">or sign in using</Text>
            <Button.Group mt="5">
              <Button>Facebook</Button>
              <Button>Google</Button>
            </Button.Group>
          </View>
        </NativeBaseProvider>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '-60%'
    },
    bottom: {
      marginBottom:'60%'
    }
    
  });

  export default function(props,{navigation}) {
    return(

      <NativeBaseProvider>
        <LoginUser/>
        <Container style={styles.bottom}>
          <Text italic fontSize="sm">Already have an account? Sign in</Text>
        </Container>

      </NativeBaseProvider>
      

    )
  }