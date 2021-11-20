import React, {useState} from "react";
import { StyleSheet, View,TextInput, Alert } from 'react-native';
import firebase from "../database/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "react-dom";
import * as Google from 'expo-google-app-auth';
import { Container, Button, Center, NativeBaseProvider,Stack, Input, Heading, Text, Box, Icon, Image} from "native-base"
import { Flex, Spacer, HStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//https://abbey-road-app.firebaseapp.com/__/auth/handler
export default class RegisterUser extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      name: ''
    }
  }
  createAccount =()=>{
    if(this.state.password != this.state.confirmPassword){
      
      Alert.alert("Password does not match");
    }
    else if(this.state.password.length <6){
      Alert.alert("Password must be over 6 characters")
    }
    else{
        firebase.firebase.app().auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
          Alert.alert('Sorry. ' + error.message)
          
        })
        firebase.firebase.app().auth().onAuthStateChanged((user)=>{
          if(user){
            Alert.alert("Signed in");
            console.log(user.uid);
          }
        })
    }
  }

    signInWithGoogleAsync = async()=> {
      try {
        const result = await Google.logInAsync({
          behavior: 'web',
          androidClientId: '126323543490-jsbg1t6cpnvjletki8udrkn3sb341sfv.apps.googleusercontent.com',
          iosClientId: '126323543490-qo8841if2ddlrss6c5hru3uspkc4elu5.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }
    
    render(){
      return (
        <NativeBaseProvider>
        <Box width="2xs" mt="32">
        <Heading textAlign="center" size="2xl" mb="5" mt="20">Hello there :)</Heading>
            <Input mb="1" variant="underlined" placeholder="username" style={{borderColor: '#4f46e5' }} onChangeText={(username) => {
            this.setState({username:username})
            }} value={this.state.username}/>
            <Input mb="1" variant="underlined" placeholder="email" style={{borderColor: '#4f46e5' }} onChangeText={(email) => {
            this.setState({email:email})
            }} value={this.state.email}/>
            <Input mb="1" variant="underlined" placeholder="name" style={{borderColor: '#4f46e5' }} onChangeText={(name) => {
            this.setState({name:name})
            }} value={this.state.name}/>
            <Input mb="1" variant="underlined" placeholder="password" style={{borderColor: '#4f46e5' }} onChangeText={(password) => {
            this.setState({password:password})
            }} 
            value={this.state.password} 
            secureTextEntry={true}
            autoCorrect={false}/>
            <Input variant="underlined" placeholder="confirm password" style={{borderColor: '#4f46e5' }} onChangeText={(confirmPassword) => {
            this.setState({confirmPassword:confirmPassword})
            }} 
            value={this.state.confirmPassword}
            secureTextEntry={true}
            autoCorrect={false} mb="10"/>
          <Button bg="indigo.600" size={'lg'} colorScheme="dark" onPress={this.createAccount} mb="5" shadow={9}  borderRadius="50">Sign Up</Button>
          <Text textAlign="center" fontSize="sm" color="muted.600">or sign up using</Text>
            <Button.Group mt="5">
              <Button w="48%" bg="white" colorScheme="dark"  shadow={9} borderRadius="20" >
                  <HStack space={3} alignItems="center">
                    <Center>
                      <Icon
                      as={<MaterialCommunityIcons name="facebook" />}
                      size={4}
                      mr="-2"
                      color="indigo.600"
                      />
                    </Center>
                    <Center>
                      <Text color="indigo.600">
                        Facebook
                      </Text>
                    </Center>
                  </HStack>
              </Button>
              <Button w="48%" bg="white" colorScheme="dark"  shadow={9} borderRadius="50" onPress={this.signInWithGoogleAsync} >
                  <HStack space={3} alignItems="center">
                    <Center mr="-2">
                    <Image
                    size={3}
                    resizeMode={"contain"}
                    borderRadius={1}
                    source={require('../assets/google-logo-9808.png')}
                    alt="Alternate Text"
                    />
                    </Center>
                    <Center>
                      <Text color="indigo.600">
                        Google
                      </Text>
                    </Center>  
                  </HStack>
              </Button>
            </Button.Group>
            <Text color="indigo.600" textAlign="center" italic fontSize="sm" mt="5" onPress={()=>{this.props.setViewState(true)}}>Already have an account? Sign in</Text>
          
        </Box>
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
    },
    button:{
      backgroundColor: '#000',
    }
  });