import React from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from "../database/firebase";

export default function registerUser() {
    function componentDidMoun(){
        this.checkIfLoggedIn();
    }

    //Checa si el usuario esta Loggeado, falta modificar las vistas
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.navigation.navigate('Login User');
            }
            else{
                this.props.navigation.navigate('Register User');
            }
        })
    }
    /*useEffect(()=>{
        firebase.db.collection('songs').onSnapshot(querySnapshot=>{
          querySnapshot.docs.forEach(doc=>{
            console.log(doc.id,doc.data());
          })
        })
      },[])*/
    return (
      <View style={styles.container}>
        <Text>Hola mundo desde el registro</Text>
        <TextInput 
            style={styles.input}
            placeholder="Username"
          />
          <TextInput 
            style={styles.input}
            placeholder="Password"
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
  });
  