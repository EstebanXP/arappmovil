import React, { useEffect,useState } from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";

export default function songsManagement() {
    const [state,setState]= useState([]);
    
    useEffect(()=>{
      firebase.db.collection('songs').onSnapshot(querySnapshot=>{
        querySnapshot.docs.forEach(doc=>{
          console.log(doc.id,doc.data());
        })
      })
    })
    return (
      <SafeAreaView>
        {console.log("Hola mundo")}
          <TextInput 
            style={styles.input}
            placeholder="Nombre de la cancion"
          />
          <TextInput 
            style={styles.input}
            placeholder="Nombre del artista"
          />
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
  