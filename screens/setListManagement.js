import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, Alert, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setListsManagement(props,{navigation}) {

  const initialState = {
    name: "",
    set: "",
    show: "",
    band: "",
    //showTag: "", hace falta saber como conectar los tags
  }

  const [setList, setSetList] = useState(initialState)

  const getSetListId = async (id) =>{
    const dbRef = firebase.db.collection('setlists').doc(id)
    const doc = await dbRef.get();
    const setList = doc.data();
    setSetList({
      ...setList,
      id: doc.id,
    })
    }

  useEffect (()=>{
    getSetListId(props.route.params.setListId);
  }, [])

  const handleChangeText = (field, value) =>{
    setSetList({ ...setList ,[field]: value});
  }

  const deleteSetList =  async () =>{
    const dbRef = firebase.db.collection('setlists').doc(props.route.params.setListId);
    await dbRef.delete();
    alert("SetList eliminado")
    props.navigation.navigate('SetList List')
  }

  const updateSetList = async () =>{
    const dbRef = firebase.db.collection('setlists').doc(props.route.params.setListId);
    await dbRef.set({
        name: setList.name,
        set: setList.set,
        show: setList.show,
        band: setList.band,
    })
    setSetList(initialState)
    props.navigation.navigate('SetList List')
  }

  const openConfirmationAlert = () =>{
    Alert.alert("Eliminar SetList", "Estas seguro?", [
      {text: "Si", onPress: () => deleteSetList()},
      {text: "No", onPress: () => console.log("No")},
    ])
  }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Del SetList"
            value={setList.name}
            onChangeText={(value) => handleChangeText("name", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Set"
            value={setList.set}
            onChangeText={(value) => handleChangeText("set", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Show"
            value={setList.show}
            onChangeText={(value) => handleChangeText("show", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Banda"
            value={setList.band}
            onChangeText={(value) => handleChangeText("band", value)}
          />
          <View>
              <Button title = "Actualizar SetList" onPress = {() => updateSetList()}/>
          </View>
          <View>
              <Button title = "Eliminar SetList" onPress = {() => openConfirmationAlert()}/>
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