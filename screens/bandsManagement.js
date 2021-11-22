import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, Alert, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandsManagement(props,{navigation}) {

  const initialState = {
    bandName: "",
    bandLogo: "",
    bandDescription: "",
    bandGenres: "",
      //showTag: "", hace falta saber como conectar los tags
  }

  const [band, setBand] = useState(initialState)

  const getBandId = async (id) =>{
    const dbRef = firebase.db.collection('Bands').doc(id)
    const doc = await dbRef.get();
    const band = doc.data();
    setBand({
      ...band,
      id: doc.id,
    })
    }

  useEffect (()=>{
      getBandId(props.route.params.bandId);
  }, [])

  const handleChangeText = (field, value) =>{
    setBand({ ...band ,[field]: value});
  }

  const deleteBand =  async () =>{
    const dbRef = firebase.db.collection('Bands').doc(props.route.params.bandId);
    await dbRef.delete();
    alert("Banda eliminada")
    props.navigation.navigate('Bands List')
  }

  const updateBand = async () =>{
    const dbRef = firebase.db.collection('Bands').doc(props.route.params.bandId);
    await dbRef.set({
        bandName: band.bandName,
        bandLogo: band.bandLogo,
        bandDescription: band.bandDescription,
        bandGenres: band.bandGenres,
    })
    setBand(initialState)
    props.navigation.navigate('Bands List')
  }

  const openConfirmationAlert = () =>{
    Alert.alert("Eliminar Banda", "Estas seguro?", [
      {text: "Si", onPress: () => deleteBand()},
      {text: "No", onPress: () => console.log("No")},
    ])
  }

    return ( 
      <SafeAreaView>
        <ScrollView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre banda"
            value={band.bandName}
            onChangeText={(value) => handleChangeText("bandName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Logo banda"
            value={band.bandLogo}
            onChangeText={(value) => handleChangeText("bandLogo", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Descripcion banda"
            value={band.bandDescription}
            onChangeText={(value) => handleChangeText("bandDescription", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Genero banda"
            value={band.bandGenres}
            onChangeText={(value) => handleChangeText("bandGenres", value)}
          />
          <View>
              <Button title = "Actualizar banda" onPress = {() => updateBand()}/>
          </View>
          <View>
              <Button title = "Eliminar banda" onPress = {() => openConfirmationAlert()}/>
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
  