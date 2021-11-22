import React, {useEffect, useState} from "react";
import { View, SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container, FlatList, Flex, Select} from "native-base";
import {TouchableOpacity} from 'react-native-gesture-handler'
import Search from "./searchFloat.js";
import Edit from './editFloat.js' 

export default function BandsList(props,{navigation}) {

    const [Bands, setBands] = useState([])
    const [sort, setSort] = useState("bandName");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('Bands').orderBy(sort).onSnapshot(querySnapshot=>{
          const Bands = [];
          querySnapshot.docs.forEach(doc=>{
            const {bandName, bandLogo, bandDescription, bandGenres,} = doc.data()
            Bands.push({
              id: doc.id,
              bandName,
              bandLogo,
              bandDescription,
              bandGenres,
            })
          })
          if(!unmounted)
          setBands(Bands)
        })
        return () => {
          unmounted = true;
        }
    },[sort])

    return ( 
      <SafeAreaView>
        <Box alignItems="center" position="absolute" top="2" w="90%" right="5%" left="5%">
        <ScrollView>
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear Banda"
            onPress={() => props.navigation.navigate('Bands Create')}
        />
        <Select
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        >
        <Select.Item label="Nombre" value="bandName" />
        <Select.Item label="Genero" value="bandGenres" />
        </Select>
        {/*
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="bandName" />
        <Picker.Item label="Genero" value="bandGenres" />
        </Picker>
        */}
        <Box w="100%" h="100%" display="flex" flexDirection="row" flexWrap="wrap">
          {
            
            Bands.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.bandName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }else if(val.bandGenres.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(band =>{
              return(
                
                <Pressable key={band.id} bottomDivider onPress={() => {
                        props.navigation.navigate('Bands Info', {
                          bandId: band.id 
                        })
                      }}
                      width="32" h="32" bg="#241CC4" borderRadius="20" shadow={9}
                      textColor="black"
                      bg="info.300"
                      mb="4"
                      >
                          
                          <Box width="100%" h="32" > 
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {band.bandName} 
                          </Text>
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {band.bandGenres}
                          </Text>
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {band.bandLogo}  
                          </Text>
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {band.bandDescription}
                          </Text>
                          </Box>
                          
                </Pressable>
                
                
                /*
                <ListItem key={band.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Bands Management', {
                    bandId: band.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{band.bandName}</ListItem.Title>
                    <ListItem.Subtitle>{band.bandGenres}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>*/
              )
            })
          }  
        </Box>
        </ScrollView>
        
      </Box>
      {/*<Search style={{zIndex: 4}}></Search>
        <Edit></Edit>*/}
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
 