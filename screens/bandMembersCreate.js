import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandMembersCreate({navigation}) {

    const [state, setState] = useState({
        memberName: "",
        userName: "",
        rol: "",
    })

    const handleChangeText = (field, value) =>{
          setState({ ...state ,[field]: value});
    }

    const addMember = async () => {
      console.log(state)
      await firebase.db.collection('bandMembers').add({
        memberName: state.memberName,
        userName: state.userName,
        rol: state.rol,
      })
     alert('guardado')
     navigation.navigate('Band Members List')
    }

    return ( 
      <SafeAreaView>
        <ScrollView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre del miembro"
            onChangeText={(value) => handleChangeText("memberName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={(value) => handleChangeText("userName", value)}
          /> 
          <TextInput 
            style={styles.input}
            placeholder="Rol del miembro"
            onChangeText={(value) => handleChangeText("rol", value)}
          /> 
          <View>
              <Button title = "Guardar miembro" onPress = {() => addMember()}/>
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
  