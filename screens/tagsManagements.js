import React, {useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';

export default function tagsManagements() {

    const [state, setState] = useState({
        tagName: ""
    })

    const handleChangeText = (field, value) =>{
        setState({ ...state ,[field]: value});
    }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Tag"
            onChangeText={(value) => handleChangeText("tagName", value)}
          /> 
          <View>
              <Button title = "Guardar etiqueta" onPress = {() => console.log(state)}/>
          </View>
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
  