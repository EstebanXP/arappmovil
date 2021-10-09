import React from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";

export default function registerUser() {
    return (
      <View style={styles.container}>
        <Text>Inicia Sesion</Text>
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
  