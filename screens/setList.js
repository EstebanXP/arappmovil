import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function setList(props,{navigation}) {

    const [SetList, setSetLists] = useState([])
    const [sort, setSort] = useState("setListName");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('setLists').orderBy(sort).onSnapshot(querySnapshot=>{
          const SetList = [];
          querySnapshot.docs.forEach(doc=>{
            const {setListName, set, showName, bandName,} = doc.data()
            Bands.push({
              id: doc.id,
              setListName,
              set,
              showName, 
              bandName,
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
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear SetList"
            onPress={() => props.navigation.navigate('SetList Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="setListName" />
        <Picker.Item label="Show" value="showName" />
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
                    setLitsId: setList.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{setList.setListName}</ListItem.Title>
                    <ListItem.Subtitle>{setList.showName}</ListItem.Subtitle>
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
 