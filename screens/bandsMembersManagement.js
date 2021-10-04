import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function bandsMembersManagement() {
  
  const [state, setState] = useState({
    showName: "",
    userName: "",
    rol: "",
})

const handleChangeText = (field, value) =>{
    setState({ ...state ,[field]: value});
}

const addShow = async () => {
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
        placeholder="Nombre del show"
        onChangeText={(value) => handleChangeText("showName", value)}
      /> 
      <TextInput 
        style={styles.input}
        placeholder="Tour del show"
        onChangeText={(value) => handleChangeText("userName", value)}
      /> 
      <TextInput 
        style={styles.input}
        placeholder="Fecha del show"
        onChangeText={(value) => handleChangeText("rol", value)}
      />  
      <View>
          <Button title = "Guardar show" onPress = {() => addShow()}/>
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
  