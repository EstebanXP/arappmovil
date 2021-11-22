import React, {useEffect, useState} from "react";
import { View, SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container, Select} from "native-base";
import {TouchableOpacity} from 'react-native-gesture-handler'

export default function liveShowsManagement(props,{navigation}) {

    const [liveShows, setLiveShows] = useState([])
    const [sort, setSort] = useState("showName");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
      let unmounted = false;
        firebase.db.collection('LiveShows').orderBy(sort).onSnapshot(querySnapshot=>{
          const liveShows = [];
          querySnapshot.docs.forEach(doc=>{
            const {showLocation, showName, showTour, showDate, showPlace, showBand,} = doc.data()
            liveShows.push({
              id: doc.id,
              showLocation,
              showName,
              showTour,
              showDate,
              showPlace,
              showBand,
            })
          })
          if(!unmounted)
          setLiveShows(liveShows)
        })
        return () => {
          unmounted = true;
        }
    },[sort])

    return ( 
      <SafeAreaView>
      
      <ScrollView>
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
        <Select
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Select.Item label="Nombre" value="showName" />
        <Select.Item label="Fecha" value="showDate" />
        </Select>
          {
            liveShows.filter((val)=>{
              if(searchVar===""){
                return val;
              }else if(val.showName.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }else if(val.showDate.toLowerCase().includes(searchVar.toLocaleLowerCase())){
                return val;
              }
            }).map(liveShow =>{
              return(
                <Pressable
                      width="90%" ml="auto" mr="auto" h="32" borderRadius="20" 
                      textColor="black"
                      mb="4"
                      shadow={2}
                      >
                          <Box width="100%" h="32" 
                          borderRadius="20"
                          
                         
                          bg="#FFF"
                      >
                          <Text textAlign="center" mt="auto" mb="auto" color="black">{liveShow.showName} {liveShow.showDate} {liveShow.showLocation} 
                          {liveShow.showTour} {liveShow.showPlace} {liveShow.showBand}</Text></Box></Pressable>
                /*
                <ListItem key={liveShow.id} bottomDivider onPress={() => {
                  props.navigation.navigate('Live Shows Management', {
                    showId: liveShow.id 
                  })
                }}>
                  <ListItem.Content>
                    <ListItem.Title>{liveShow.showName}</ListItem.Title>
                    <ListItem.Subtitle>{liveShow.showDate}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>*/
              )
            })
          }
          <Box
                      width="90%" ml="auto" mr="auto" h="32" borderRadius="20" 
                      bg="rgba(0,0,0,0)"
                      mb="4"
                      ></Box>
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
 