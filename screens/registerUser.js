import React from "react";
import { StyleSheet, Text, View,TextInput } from 'react-native';
import firebase from "../database/firebase";

export default function registerUser() {
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
          <TextInput 
            style={styles.input}
            placeholder="Name"
          />
          <TextInput 
            style={styles.input}
            placeholder="Rol"
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
  