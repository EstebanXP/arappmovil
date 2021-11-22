import React, {useEffect, useState} from "react";
import { View, SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container} from "native-base";
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
      <Box alignItems="center" position="absolute" top="2" w="90%" right="5%" left="5%">
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
          <Button
            title="Crear live show 1"
            onPress={() => props.navigation.navigate('Live Shows Create')}
        />
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Nombre" value="showName" />
        <Picker.Item label="Fecha" value="showDate" />
        </Picker>
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
                      width="100%" h="32" bg="#241CC4" borderRadius="20" shadow={9}
                      textColor="black"
                      bg="info.300"
                      mb="4"
                      >
                        
                          <Box width="100%" h="32">
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
      </Box>
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
 