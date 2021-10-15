import React, {useState} from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import * as Google from 'expo-google-app-auth';
import { NavigationContainer } from "@react-navigation/native";

export default function loginUser() {
  const[hidePassword, setHidePassword]= useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting,setGoogleSubmitting] = useState(false);

    const handleMessage = (message, type = 'FAILED') => {
      setMessage(message);
      setMessageType(type);
    }
    const handleGoogleSignIn = () => {
      setGoogleSubmitting(true);
        const config = {iosClientId : `126323543490-qo8841if2ddlrss6c5hru3uspkc4elu5.apps.googleusercontent.com`, 
                        androidClientId: `126323543490-jsbg1t6cpnvjletki8udrkn3sb341sfv.apps.googleusercontent.com`,
                        scopes: ['profile', 'email']}
        Google.logInAsync(config)
        .then((result)=> {
          const {type, user} = result;
          if (type == 'succes'){
            const{email, name, photoUrl} = user;
            handleMessage('Google sign-in succesful', 'SUCCESS');
            setTimeout(()=>NavigationContainer.navigate('Home',{email, name, photoUrl}), 1000);
          }else{
            handleMessage('Google sign-in was cancelled');
          }
          setGoogleSubmitting(false);
        })
        .catch(error => {
          console.log(error);
          handleMessage('An error has ocurred. Check your network and try again :(');
          setGoogleSubmitting(false);
        })
    }

    return (
      <View style={styles.container}>
        <Text>Inicia Sesion Aqui</Text>
        {!googleSubmitting && (
          <Button title="Sign in with Google" google={true} onPress={handleGoogleSignIn}>
            
          </Button>
        )}
        {googleSubmitting && (
          <Button title="Sign in with Google" google={true} disabled={true}>
            
          </Button>
        )}
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
  