import React, {useEffect, useState} from "react";
import { View ,SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container, Select} from "native-base";
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
        <Box alignItems="center" position="absolute" top="2" w="90%" right="5%" left="5%">
        <ScrollView>
        
          <Button
            title="Crear SetList"
            bg="indigo.600" borderRadius="20"
        >Crear</Button>
        <Select
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Select.Item label="Nombre" value="name" />
        <Select.Item label="Show" value="show" />
        </Select>
        {/*
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="name" />
        <Picker.Item label="Show" value="show" />
        </Picker>
        */}
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
                <Pressable /*key={setList.id} bottomDivider onPress={() => {
                        props.navigation.navigate('SetList Management', {
                          setListId: setList.id 
                        })
                      }}*/
                      width="100%" h="32" borderRadius="20" 
                      textColor="black"
                      mb="4"
                      shadow={2}
                      >
                          <Box width="100%" h="32" 
                          borderRadius="20"
                          
                         
                          bg="#FFF"
                      >
                          <Text textAlign="center" mt="auto" mb="auto" color="black">{setList.name} 
                          {setList.show} {setList.band}
                          </Text></Box></Pressable>
                /*
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
              */)
            })
          }
        </ScrollView>
        </Box>
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
 