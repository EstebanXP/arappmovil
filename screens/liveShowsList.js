import React, {useEffect, useState} from "react";
import { View, SafeAreaView,StyleSheet,TextInput} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box } from "native-base";
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
                      width="100%" h="32" bg="#241CC4" borderRadius="30" shadow={3}
                      textColor="white"
                      bg="indigo.600"
                      title="Ir a lista de live shows"
                      >
                        <TouchableOpacity /*key={liveShow.id} onPress={() => {
                            props.navigation.navigate('Live Shows Management', {
                              showId: liveShow.id 
                            })
                          }}*/>
                          <Box>
                          <Text>{liveShow.showName} {liveShow.showDate} {liveShow.showLocation} 
                          {liveShow.showTour} {liveShow.showPlace} {liveShow.showBand}</Text></Box></TouchableOpacity></Pressable>
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
 