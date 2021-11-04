import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, Alert} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setsManagement(props,{navigation}) {

  const initialState = {
    setName: "",
    songsList: "",
      //showTag: "", hace falta saber como conectar los tags
  }

  const [set, setSet] = useState(initialState)

  const getSetId = async (id) =>{
    const dbRef = firebase.db.collection('Sets').doc(id)
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
    setset({ ...set ,[field]: value});
  }

  const deleteSet =  async () =>{
    const dbRef = firebase.db.collection('Sets').doc(props.route.params.setId);
    await dbRef.delete();
    alert("Set eliminado")
    props.navigation.navigate('List Of Sets')
  }

  const updateBand = async () =>{
    const dbRef = firebase.db.collection('Sets').doc(props.route.params.setId);
    await dbRef.set({
        setName: set.setName,
        songsList: set.songsList,
    })
    setSet(initialState)
    props.navigation.navigate('List Of Sets')
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
            value={set.setName}
            onChangeText={(value) => handleChangeText("setName", value)}
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
  