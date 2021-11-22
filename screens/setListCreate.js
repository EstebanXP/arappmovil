import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function setListCreate({navigation}) {

    const [state, setState] = useState({
        name: "",
        set: "",
        show: "",
        band: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    const handleChangeText = (field, value) =>{
          setState({ ...state ,[field]: value});
    }

    const addSetList = async () => {
      console.log(state)
      await firebase.db.collection('setlists').add({
        name: state.name,
        set: state.set,
        show: state.show,
        band: state.band,
      })
     alert('guardado')
     navigation.navigate('SetList List')
    }

    return ( 
      <SafeAreaView>
        <ScrollView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre del SetList"
            onChangeText={(value) => handleChangeText("name", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Set"
            onChangeText={(value) => handleChangeText("set", value)}
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
          </ScrollView>
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
  