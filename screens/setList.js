import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function setList(props,{navigation}) {

    const [SetList, setSetLists] = useState([])
    const [sort, setSort] = useState("name");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('setlists').orderBy(sort).onSnapshot(querySnapshot=>{
          const SetList = [];
          querySnapshot.docs.forEach(doc=>{
            const {name, set, show, band,} = doc.data()
            SetList.push({
              id: doc.id,
              name,
              set,
              show, 
              band,
            })
          })
          if(!unmounted)
          setSetLists(SetList)
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
            title="Crear SetList"
            onPress={() => props.navigation.navigate('SetList Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="name" />
        <Picker.Item label="Show" value="show" />
        </Picker>
          {
            SetList.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.setListName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }else if(val.showName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(setList =>{
              return(
                <ListItem key={setList.id} bottomDivider onPress={() => {
                  props.navigation.navigate('SetList Management', {
                    setListId: setList.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{setList.name}</ListItem.Title>
                    <ListItem.Subtitle>{setList.show}</ListItem.Subtitle>
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
 