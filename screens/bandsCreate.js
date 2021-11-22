import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandCreate({navigation}) {

    const [state, setState] = useState({
        bandName: "",
        bandLogo: "",
        bandDescription: "",
        bandGenres: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    const handleChangeText = (field, value) =>{
          setState({ ...state ,[field]: value});
    }

    const addBand = async () => {
      console.log(state)
      await firebase.db.collection('Bands').add({
        bandName: state.bandName,
        bandLogo: state.bandLogo,
        bandDescription: state.bandDescription,
        bandGenres: state.bandGenres,
      })
     alert('guardado')
     navigation.navigate('Bands List')
    }

    return ( 
      <SafeAreaView>
        <ScrollView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre banda"
            onChangeText={(value) => handleChangeText("bandName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Logo banda"
            onChangeText={(value) => handleChangeText("bandLogo", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Descripcion banda"
            onChangeText={(value) => handleChangeText("bandDescription", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Genero banda"
            onChangeText={(value) => handleChangeText("bandGenres", value)}
          /> 
          <View>
              <Button title = "Guardar banda" onPress = {() => addBand()}/>
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
  