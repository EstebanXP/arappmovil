import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, Alert} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function liveShowsManagement(props,{navigation}) {

  const initialState = {
      id: "",
      showLocation: "",
      showName: "",
      showTour: "",
      showDate: "",
      showPlace: "",
      showBand: "",
      //showTag: "", hace falta saber como conectar los tags
  }

  const [show, setShow] = useState(initialState)

  const getShowById = async (id) =>{
    const dbRef = firebase.db.collection('LiveShows').doc(id)
    const doc = await dbRef.get();
    const liveShow = doc.data();
    setShow({
      ...liveShow,
      id: doc.id,
    })
    }

  useEffect (()=>{
      getShowById(props.route.params.showId);
  }, [])

  const handleChangeText = (field, value) =>{
    setShow({ ...show ,[field]: value});
  }

  const deleteShow =  async () =>{
    const dbRef = firebase.db.collection('LiveShows').doc(props.route.params.showId);
    await dbRef.delete();
    alert("Show eliminado")
    props.navigation.navigate('Live Shows List')
  }

  const updateShow = async () =>{
    const dbRef = firebase.db.collection('LiveShows').doc(props.route.params.showId);
    await dbRef.set({
        showLocation: show.showLocation,
        showName: show.showName,
        showTour: show.showTour,
        showDate: show.showDate,
        showPlace: show.showPlace,
        showBand: show.showBand,
        showTag: "",
    })
    setShow(initialState)
    props.navigation.navigate('Live Shows List')
  }

  const openConfirmationAlert = () =>{
    Alert.alert("Eliminar Show", "Estas seguro?", [
      {text: "Si", onPress: () => deleteShow()},
      {text: "No", onPress: () => console.log("Ne")},
    ])
  }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Locación del show"
            value={show.showLocation}
            onChangeText={(value) => handleChangeText("showLocation", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Nombre del show"
            value={show.showName}
            onChangeText={(value) => handleChangeText("showName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Tour del show"
            value={show.showTour}
            onChangeText={(value) => handleChangeText("showTour", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Fecha del show"
            value={show.showDate}
            onChangeText={(value) => handleChangeText("showDate", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Lugar del show"
            value={show.showPlace}
            onChangeText={(value) => handleChangeText("showPlace", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Banda del show"
            value={show.showBand}
            onChangeText={(value) => handleChangeText("showBand", value)}
          /> 
          <View>
              <Button title = "Actualizar show" onPress = {() => updateShow()}/>
          </View>
          <View>
              <Button title = "Eliminar show" onPress = {() => openConfirmationAlert()}/>
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
  