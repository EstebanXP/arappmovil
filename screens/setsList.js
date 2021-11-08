import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function SetsList(props,{navigation}) {

    const [Sets, setSets] = useState([])
    const [sort, setSort] = useState("asc");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('sets').orderBy("name", sort).onSnapshot(querySnapshot=>{
          const Sets = [];
          querySnapshot.docs.forEach(doc=>{
            const {name, songs,/*que pedo con las rolas*/} = doc.data()
            Sets.push({
              id: doc.id,
              name,
              songs,
            })
          })
          if(!unmounted)
          setSets(Sets)
        })
        return () => {
          unmounted = true;
        }
    },[sort])

    return ( 
      <SafeAreaView>
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear Set"
            onPress={() => props.navigation.navigate('Sets Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="A-Z" value="asc" />
        <Picker.Item label="Z-A" value="desc" />
        </Picker>
          {
            Sets.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.name.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(set =>{
              return(
                <ListItem key={set.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Sets Management', {
                    setId: set.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{set.name}</ListItem.Title>
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
 