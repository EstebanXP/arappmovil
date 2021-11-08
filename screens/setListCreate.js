import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setListCreate({navigation}) {

    const [state, setState] = useState({
        setListName: "",
        //set: "",
        showName: "",
        bandName: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    const handleChangeText = (field, value) =>{
          setState({ ...state ,[field]: value});
    }

    const addSetList = async () => {
      console.log(state)
      await firebase.db.collection('setlists').add({
        setListName: state.setListName,
        //set: state.set,
        showName: state.showName,
        bandName: state.bandName,
      })
     alert('guardado')
     navigation.navigate('SetList List')
    }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre del SetList"
            onChangeText={(value) => handleChangeText("name", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Seet"
            onChangeText={(value) => handleChangeText("sets", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Show"
            onChangeText={(value) => handleChangeText("show", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Banda"
            onChangeText={(value) => handleChangeText("band", value)}
          /> 
          <View>
              <Button title = "Guardar SetList" onPress = {() => addSetList()}/>
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
  