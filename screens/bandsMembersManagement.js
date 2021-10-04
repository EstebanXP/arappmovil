import React, {useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';

export default function bandsMembersManagement() {
  
  const [state, setState] = useState({
    showName: "",
    userName: "",
    rol: "",
})

const handleChangeText = (field, value) =>{
    setState({ ...state ,[field]: value});
}

const addMember = async () => {
  console.log(state)
  /* FALTA LA BASE DE DATOS
  await firebase.db.collection('nombre colección').add({
    showLocation: state.showLocation,
    showName: state.showName,
    showTour: state.showTour,
    showDate: state.showDate,
    showPlace: state.showPlace,
    showBand: state.showBand,
    //showTag: "", hace falta saber como conectar los tags
  })
  */
 alert('guardado')
}

return ( 
  <SafeAreaView> 
      <TextInput 
        style={styles.input}
        placeholder="Nombre del miembro"
        onChangeText={(value) => handleChangeText("showName", value)}
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
          <Button title = "Guardar miembro" onPress = {() => addMember()}/>
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
  