import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function tagsManagements() {

    const [liveShows, setLiveShows] = useState([])

    const [state, setState] = useState({
        showLocation: "",
        showName: "",
        showTour: "",
        showDate: "",
        showPlace: "",
        showBand: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    useEffect(()=>{
      firebase.db.collection('LiveShows').onSnapshot(querySnapshot=>{
        const liveShows = [];

        querySnapshot.docs.forEach(doc=>{
          const {showLocation, showName, showTour, showDate, showPlace, showBand,} = doc.data()
          liveShows.push({
            id: doc.id,
            showLocation,
            showName,
            showTour,
            showDate,
            showPlace,
            showBand,

          })
        })
        setLiveShows(liveShows)
      })
    })

    const handleChangeText = (field, value) =>{
        setState({ ...state ,[field]: value});
    }

    const addShow = async () => {
      console.log(state)
      await firebase.db.collection('LiveShows').add({
        showLocation: state.showLocation,
        showName: state.showName,
        showTour: state.showTour,
        showDate: state.showDate,
        showPlace: state.showPlace,
        showBand: state.showBand,
        showTag: "",
      })
     alert('guardado')
    }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Locación del show"
            onChangeText={(value) => handleChangeText("showLocation", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Nombre del show"
            onChangeText={(value) => handleChangeText("showName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Tour del show"
            onChangeText={(value) => handleChangeText("showTour", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Fecha del show"
            onChangeText={(value) => handleChangeText("showDate", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Lugar del show"
            onChangeText={(value) => handleChangeText("showPlace", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Banda del show"
            onChangeText={(value) => handleChangeText("showBand", value)}
          /> 
          <View>
              <Button title = "Guardar show" onPress = {() => addShow()}/>
          </View>
          {
            liveShows.map(liveShow =>{
              return(
                <ListItem key={liveShow.id}>
                  <ListItem.Content>
                    <ListItem.Title>{liveShow.showName}</ListItem.Title>
                    <ListItem>{liveShow.showLocation}</ListItem>
                    <ListItem>{liveShow.showTour}</ListItem>
                    <ListItem>{liveShow.showDate}</ListItem>
                    <ListItem>{liveShow.showPlace}</ListItem>
                    <ListItem>{liveShow.showBand}</ListItem>
                  </ListItem.Content>
                </ListItem>
              )
            })
          }
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
  