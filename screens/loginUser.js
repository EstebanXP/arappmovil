import React, {useState} from "react";
import { StyleSheet, Text, View,TextInput, Alert,Button } from 'react-native';
//import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import { render } from "react-dom";
import { useFonts } from 'expo-font';

export default class LoginUser extends React.Component{

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
        <View style={styles.container}>
          <Text style={{ fontFamily: 'CerebriSans-Regular', fontSize: 30 }}>Sing in</Text>
          <TextInput placeholder="type email" onChangeText={(email) => {
            this.setState({email:email})
          }} value={this.state.email}/>
          <TextInput placeholder="type password" onChangeText={(password) => {
            this.setState({password:password})
          }} 
          value={this.state.password} 
          secureTextEntry={true}
          autoCorrect={false}/>
          <Button title="Sign In" style={styles.button} onPress={this.loginAccount} ></Button>
          
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

  