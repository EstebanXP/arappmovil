import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function tagsManagements({navigation}) {

    const [state, setState] = useState({
        tagName: ""
    })

    const handleChangeText = (field, value) =>{
        setState({ ...state ,[field]: value});
    }

    const addTag = async () => {
        console.log(state)
        await firebase.db.collection('Tag').add({
          tagName: state.tagName,
        })
       alert('guardado')
       navigation.navigate('Tags List')
      }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Tag"
            onChangeText={(value) => handleChangeText("tagName", value)}
          /> 
          <View>
              <Button title = "Guardar etiqueta" onPress = {() => addTag()}/>
          </View>
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
  