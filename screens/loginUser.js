import React from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";

export default function registerUser() {
    const handleGoogleSignIn = () => {
        const config = {iosClientId : `126323543490-qo8841if2ddlrss6c5hru3uspkc4elu5.apps.googleusercontent.com`, 
                        androidClientId: `126323543490-jsbg1t6cpnvjletki8udrkn3sb341sfv.apps.googleusercontent.com`}
    }

    return (
      <View style={styles.container}>
        <Text>Inicia Sesion Aqui</Text>
        <Button title='Sign In With Google' onPress={() =>alert('button pressed')}></Button>
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
  