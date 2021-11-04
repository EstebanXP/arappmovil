import React, {useEffect, useState} from "react";
import { Text, View, Button ,SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function SetsList(props,{navigation}) {

    const [Sets, setSets] = useState([])
    const [sort, setSort] = useState("setName");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('Sets').orderBy(sort).onSnapshot(querySnapshot=>{
          const Bands = [];
          querySnapshot.docs.forEach(doc=>{
            const {setName,/*que pedo con las rolas*/} = doc.data()
            Sets.push({
              id: doc.id,
              setName,
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
        <Picker.Item label="Nombre" value="setName" />
        </Picker>
          {
            Sets.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.setName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
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
                    <ListItem.Title>{set.setName}</ListItem.Title>
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
 