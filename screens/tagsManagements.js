import React from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';

export default function tagsManagements() {
    return (
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Buscar tags"
          />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
  