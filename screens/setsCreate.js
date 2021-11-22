import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setCreate({navigation}) {

    const [state, setState] = useState({
        name: "",
        songs: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    const handleChangeText = (field, value) =>{
          setState({ ...state ,[field]: value});
    }

    const addSet = async () => {
      console.log(state)
      await firebase.db.collection('sets').add({
        name: state.name,
        songs: state.songs,
      })
     alert('guardado')
     navigation.navigate('Sets Lists')
    }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre de set"
            onChangeText={(value) => handleChangeText("name", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Cancion"
            onChangeText={(value) => handleChangeText("songs", value)}
          /> 
          <View>
              <Button title = "Guardar set" onPress = {() => addSet()}/>
          </View>
      </SafeAreaView>
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
  