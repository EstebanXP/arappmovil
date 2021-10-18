import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandMembersManagement(props,{navigation}) {

  const initialState = {
    id: "",
    memberName: "",
    userName: "",
    rol: "",
  }

  const [member, setBandMember] = useState(initialState)

  const getMemberById = async (id) =>{
    const dbRef = firebase.db.collection('bandMembers').doc(id)
    const doc = await dbRef.get();
    const bandMember = doc.data();
    setBandMember({
      ...bandMember,
      id: doc.id,
    })
  }

useEffect(()=>{
    getMemberById(props.route.params.memberId);
}, [])

const handleChangeText = (field, value) =>{
  setBandMember({ ...member ,[field]: value});
}

const deleteMember =  async () =>{
  const dbRef = firebase.db.collection('bandMembers').doc(props.route.params.showId);
  await dbRef.delete();
  alert("Miembro eliminado")
  props.navigation.navigate('Band Members List')
}

const updateMember = async () =>{
  const dbRef = firebase.db.collection('bandMembers').doc(props.route.params.showId);
  await dbRef.set({
      memberName: member.memberName,
      userName: member.userName,
      rol: member.rol,
  })
  setShow(initialState)
  props.navigation.navigate('Live Shows List')
}   

const openConfirmationAlert = () =>{
  Alert.alert("Eliminar miembro", "Estas seguro?", [
    {text: "Si", onPress: () => deleteMember()},
    {text: "No", onPress: () => console.log("No")},
  ])
}

return ( 
  <SafeAreaView>
      <TextInput 
        style={styles.input}
        placeholder="Nombre del miembro"
        value={member.memberName}
        onChangeText={(value) => handleChangeText("memberName", value)}
      /> 
      <TextInput 
        style={styles.input}
        placeholder="Nombre de usuario"
        value={member.userName}
        onChangeText={(value) => handleChangeText("userName", value)}
      /> 
      <TextInput 
        style={styles.input}
        placeholder="Rol del miembro"
        value={member.rol}
        onChangeText={(value) => handleChangeText("rol", value)}
      /> 
      <View>
          <Button title = "Actualizar miembro" onPress = {() => updateMember()}/>
      </View>
      <View>
          <Button title = "Eliminar miembro" onPress = {() => openConfirmationAlert()}/>
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
  