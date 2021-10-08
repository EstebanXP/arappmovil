import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import firebase from "../database/firebase";

export default function registerUser() {
    return (
      <View style={styles.container}>
        <Text>Hola mundo desde el registro</Text>
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
  });
  