import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandsMembersManagement() {

  const [bMembers, setBandMember] = useState([])

  const [state, setState] = useState({
    memberName: "",
    userName: "",
    rol: "",
})

useEffect(()=>{
  let unmounted = false;
  firebase.db.collection('BandsMembers').onSnapshot(querySnapshot=>{
    const bMembers = [];

    querySnapshot.docs.forEach(doc=>{
      const {memberName, userName, rol,} = doc.data()
      bMembers.push({
        id: doc.id,
        memberName,
        userName,
        rol,
        
      })
    })
    if(!unmounted)
    setBandMember(bMembers)
  })
  return () => {
    unmounted = true;
  }
})

const handleChangeText = (field, value) =>{
    setState({ ...state ,[field]: value});
}

const saveNewMember = async () => {
  console.log(state)
      await firebase.db.collection('BandsMembers').add({
        memberName: state.memberName,
        userName: state.userName,
        rol: state.rol,
      })
     alert('guardado')
  }

return ( 
  <SafeAreaView> 
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
        placeholder="Rol"
        onChangeText={(value) => handleChangeText("rol", value)}
      />  
      <View>
          <Button title = "Guardar miembro" onPress = {() => saveNewMember()}/>
      </View>  

      {
            bMembers.map(bMember =>{
              return(
                <ListItem key={bMember.id} bottomDivider onPress={() => alert(bMember.id)}>
                  <ListItem.Content>
                    <ListItem.Title>{bMember.memberName}</ListItem.Title>
                    <ListItem.Subtitle>{bMember.rol}</ListItem.Subtitle>
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
  