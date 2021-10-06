import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function tagsManagements() {

    const [tags, setTags] = useState([])

    const [state, setState] = useState({
        tagName: ""
    })

    useEffect(()=>{
      firebase.db.collection('Tag').onSnapshot(querySnapshot=>{
        const tags = [];

        querySnapshot.docs.forEach(doc=>{
          const {tagName} = doc.data()
          tags.push({
            id: doc.id,
            tagName
          })
        })
        setTags(tags)
      })
    })

    const handleChangeText = (field, value) =>{
        setState({ ...state ,[field]: value});
    }

    const addTag = async () => {
        console.log(state)
        await firebase.db.collection('Tag').add({
          tagName: state.tagName,
        })
       alert('guardado')
      }

    return ( 
      <SafeAreaView>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Tag"
            onChangeText={(value) => handleChangeText("tagName", value)}
          /> 
          <View>
              <Button title = "Guardar etiqueta" onPress = {() => addTag()}/>
          </View>
          {
            tags.map(tag =>{
              return(
                <ListItem key={tag.id}>
                  <ListItem.Content>
                    <ListItem.Title>{tag.tagName}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )
            })
          }
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
  