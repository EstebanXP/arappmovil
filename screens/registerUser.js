import React, {useState} from "react";
import { StyleSheet, Text, View,TextInput, Alert } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "react-dom";

export default class registerUser extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
      confirmPassword: '',
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
          }
        })
    }
  }
    render(){
      return (
        <View style={styles.container}>
          <Text>Signup</Text>
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