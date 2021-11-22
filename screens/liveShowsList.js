import React, {useEffect, useState} from "react";
import { View, SafeAreaView,StyleSheet,TextInput, ScrollView} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container, Select, Heading} from "native-base";
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
            const {showLocation, showName, showTour, showDate, showPlace, showBand,showTag} = doc.data()
            liveShows.push({
              id: doc.id,
              showLocation,
              showName,
              showTour,
              showDate,
              showPlace,
              showBand,
              showTag
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
                        <Heading position="absolute" left="4" top="3">
                          {liveShow.showName}
                        </Heading>
                          <Text position="absolute" left="4" bottom="3">

                             {liveShow.showDate}{"\n"}{liveShow.showLocation} 
                          </Text>
                          {
                            (()=>{
                              if(liveShow.showTag != ""){
                                return(
                                  <Box position="absolute" right="4" top="3" borderRadius="30" bg="rgba(79, 70, 229,0.5)"> 
                                    <Text p="1" fontSize="12">
                                    {liveShow.showTag}
                                    </Text>
                                  </Box>
                                );
                              }
                            })()}
                          
                          <Button size={"xs"} w="20" borderRadius="20" bg="white" shadow={1} colorScheme="indigo"borderWidth="1" borderColor="indigo.600"
                          position="absolute" right="4" bottom="3"
                          >
                            Show more...
                          </Button>
                      </Box></Pressable>
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
 