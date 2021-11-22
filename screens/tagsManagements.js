import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function tagsManagements(props,{navigation}) {

  const initialState = {
    id: "",
    tagName: "",
  }
  
  const [tag, setTag] = useState(initialState)

  const getTagById = async (id) =>{
    const dbRef = firebase.db.collection('Tag').doc(id)
    const doc = await dbRef.get();
    const tag = doc.data();
    setTag({
      ...tag,
      id: doc.id,
    })
    }

    useEffect (()=>{
      getTagById(props.route.params.tagId);
  }, [])

  const handleChangeText = (field, value) =>{
    setTag({ ...tag ,[field]: value});
  }

  const deleteTag =  async () =>{
    const dbRef = firebase.db.collection('Tag').doc(props.route.params.tagId);
    await dbRef.delete();
    alert("Tag eliminada")
    props.navigation.navigate('Tags List')
  }

  const updateTag = async () =>{
    const dbRef = firebase.db.collection('Tag').doc(props.route.params.tagId);
    await dbRef.set({
        tagName: tag.tagName,
    })
    setTag(initialState)
    props.navigation.navigate('Tags List')
  }

  const openConfirmationAlert = () =>{
    Alert.alert("Eliminar Tag", "Estas seguro?", [
      {text: "Si", onPress: () => deleteTag()},
      {text: "No", onPress: () => console.log("Nel")},
    ])
  }

    return ( 
      <SafeAreaView>
        <ScrollView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Tag"
            value={tag.tagName}
            onChangeText={(value) => handleChangeText("tagName", value)}
          /> 
          <View>
              <Button title = "Actualizar Tag" onPress = {() => updateTag()}/>
          </View>
          <View>
              <Button title = "Eliminar Tag" onPress = {() => openConfirmationAlert()}/>
          </View>
        </ScrollView>
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
  