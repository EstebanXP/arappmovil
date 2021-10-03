import React, {useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';

export default function tagsManagements() {

    const [state, setState] = useState({
        showLocation: "",
        showName: "",
        showTour: "",
        showDate: "",
        showPlace: "",
        showBand: "",
        //showTag: "", hace falta saber como conectar los tags
    })

    const handleChangeText = (field, value) =>{
        setState({ ...state ,[field]: value});
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
              <Button title = "Guardar show" onPress = {() => console.log(state)}/>
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
  