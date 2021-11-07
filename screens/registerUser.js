import React, {useState} from "react";
import { StyleSheet, Text, View,TextInput, Alert } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "react-dom";
import * as Google from 'expo-google-app-auth';
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
        <View style={styles.container}>
          <Text>Signup</Text>
          <TextInput placeholder="type name" onChangeText={(name) => {
            this.setState({name:name})
          }} value={this.state.email}/>
          <TextInput placeholder="type username" onChangeText={(username) => {
            this.setState({username:username})
          }} value={this.state.email}/>
          <TextInput placeholder="type email" onChangeText={(email) => {
            this.setState({email:email})
          }} value={this.state.email}/>
          <TextInput placeholder="type password" onChangeText={(password) => {
            this.setState({password:password})
          }} 
          value={this.state.password} 
          secureTextEntry={true}
          autoCorrect={false}/>
          <TextInput placeholder="confirm password" onChangeText={(confirmPassword) => {
            this.setState({confirmPassword:confirmPassword})
          }} 
          value={this.state.confirmPassword}
          secureTextEntry={true}
          autoCorrect={false}/>
          <Button title="Sign Up" style={styles.button} onPress={this.createAccount} ></Button>
          <Button title="Sign Up with Google" style={styles.button} onPress={this.signInWithGoogleAsync} ></Button>
          
        </View>
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