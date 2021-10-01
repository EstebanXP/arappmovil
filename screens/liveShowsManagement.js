import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

export default function liveShowsManagement() {
    return (
      <View style={styles.container}>
        <Text>Hola mundo desde Live Shows Management</Text>
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
  