import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, Alert, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setsManagement(props,{navigation}) {

  const initialState = {
    name: "",
    songs: "",
    //showTag: "", hace falta saber como conectar los tags
  }

  const [set, setSet] = useState(initialState)

  const getSetId = async (id) =>{
    const dbRef = firebase.db.collection('sets').doc(id)
    const doc = await dbRef.get();
    const set = doc.data();
    setSet({
      ...set,
      id: doc.id,
    })
    }

  useEffect (()=>{
      getSetId(props.route.params.setId);
  }, [])

  const handleChangeText = (field, value) =>{
    setSet({ ...set ,[field]: value});
  }

  const deleteSet =  async () =>{
    const dbRef = firebase.db.collection('sets').doc(props.route.params.setId);
    await dbRef.delete();
    alert("Set eliminado")
    props.navigation.navigate('Sets Lists')
  }

  const updateSet = async () =>{
    const dbRef = firebase.db.collection('sets').doc(props.route.params.setId);
    await dbRef.set({
        name: set.name,
        songs: set.songs,
    })
    setSet(initialState)
    props.navigation.navigate('Sets Lists')
  }

  const openConfirmationAlert = () =>{
    Alert.alert("Eliminar Set", "Estas seguro?", [
      {text: "Si", onPress: () => deleteSet()},
      {text: "No", onPress: () => console.log("No")},
    ])
  }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre del set"
            value={set.name}
            onChangeText={(value) => handleChangeText("name", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Cancion"
            value={set.songs}
            onChangeText={(value) => handleChangeText("songs", value)}
          /> 
          <View>
              <Button title = "Actualizar set" onPress = {() => updateSet()}/>
          </View>
          <View>
              <Button title = "Eliminar set" onPress = {() => openConfirmationAlert()}/>
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
  