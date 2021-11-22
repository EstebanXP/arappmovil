import React,{useState,useEffect} from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import { NativeBaseProvider, VStack, Center, Button, Pressable, Text, Box, Container, FlatList, Flex, Select} from "native-base";
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements/dist/input/Input';

export default function showSongs(props,{navigation}){
    const [songs, setSongs] = useState([]);
    const [sort, setSort] = useState("title");
    const [searchVar,setSearchVar] = useState("");

    useEffect(()=>{
       let unmounted = false;
       firebase.db.collection('songs').orderBy(sort).onSnapshot(querySnapshot=>{
         const docs=[];
         querySnapshot.docs.forEach(doc=>{
           const {artist,chords,lyrics,title}=doc.data();
           docs.push({
             id:doc.id,
             artist:artist,
             chords:chords,
             lyrics:lyrics,
             title:title
           })
         })
         if(!unmounted){
            setSongs(docs);
         }
         
       })
 1
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
        <Select.Item label="Title" value="title" />
        <Select.Item label="Artist" value="artist" />
        </Select>
      {
        songs.filter((val)=>{
          if(searchVar===""){
            return val;
          }else if(val.title.toLowerCase().includes(searchVar.toLocaleLowerCase())){
            return val;
          }else if(val.artist.toLowerCase().includes(searchVar.toLocaleLowerCase())){
            return val;
          }
        }).map(song =>{
          return(
              <Pressable /*key={band.id} bottomDivider onPress={() => {
                        props.navigation.navigate('Bands Info', {
                          bandId: band.id 
                        })
                      }}*/
                      width="100%" h="32" borderRadius="20" 
                      textColor="black"
                      mb="4"
                      shadow={2}
                      >
                          <Box width="100%" h="32" 
                          borderRadius="20"
                          bg="#FFF" > 
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {song.title} 
                          </Text>
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {song.artist}
                          </Text>
                          </Box>
                          
                </Pressable>
          )
        })
      }
      </ScrollView>
  </SafeAreaView>
    )
}

/*
<SafeAreaView>
          {
            songs.map(song =>{
              return(
                <ScrollView>
                <ListItem key={song.id} bottomDivider onPress={() => alert(song.id)}>
                  <ListItem.Content>
                    <ListItem.Title>{song.title}</ListItem.Title>
                    <ListItem.Subtitle>{song.artist}</ListItem.Subtitle>

                  </ListItem.Content>
                </ListItem>
                </ScrollView>
              )
            })
          }
      </SafeAreaView>*/