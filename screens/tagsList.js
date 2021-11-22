import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function tagsManagements(props,{navigation}) {

    const [tags, setTags] = useState([])
    const [sort, setSort] = useState("asc"); 
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
    let unmounted = false;
      firebase.db.collection('Tag').orderBy("tagName", sort).onSnapshot(querySnapshot=>{
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
    },[sort])

    return ( 
      <SafeAreaView>
        <ScrollView>
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear etiqueta"
            onPress={() => props.navigation.navigate('Tags Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="A-Z" value="asc" />
        <Picker.Item label="Z-A" value="desc" />
        </Picker>
          {
            tags.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.tagName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(tag =>{
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
  