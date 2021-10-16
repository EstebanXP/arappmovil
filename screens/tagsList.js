import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function tagsManagements(props,{navigation}) {

    const [tags, setTags] = useState([])

    useEffect(()=>{
    let unmounted = false;
      firebase.db.collection('Tag').onSnapshot(querySnapshot=>{
        const tags = [];

        querySnapshot.docs.forEach(doc=>{
          const {tagName} = doc.data()
          tags.push({
            id: doc.id,
            tagName
          })
        })
        if(!unmounted)
        setTags(tags)
      })
      return () => {
        unmounted = true;
      }
    })

    return ( 
      <SafeAreaView>
          <Button
            title="Crear etiqueta"
            onPress={() => props.navigation.navigate('Tags Create')}
        />
          {
            tags.map(tag =>{
              return(
                <ListItem key={tag.id} bottomDivider onPress={() => {
                    props.navigation.navigate('Tags Management', {
                        tagId: tag.id 
                    })
                  }}>
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
  