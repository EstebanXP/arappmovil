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
        {/*
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Title" value="title" />
        <Picker.Item label="Artist" value="artist" />
        </Picker>
        */}
        <Box w="100%" h="100%" display="flex" flexDirection="row" flexWrap="wrap">
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
            <ScrollView>
              <Pressable /*key={band.id} bottomDivider onPress={() => {
                        props.navigation.navigate('Bands Info', {
                          bandId: band.id 
                        })
                      }}*/
                      width="32" h="32" bg="#241CC4" borderRadius="20" shadow={9}
                      textColor="black"
                      bg="white"
                      mb="4"
                      ml="4"
                      >
                          <Box width="100%" h="32" > 
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {song.title} 
                          </Text>
                          <Text textAlign="center" mt="auto" mb="auto" color="black">
                          {song.artist}
                          </Text>
                          </Box>
                          
                </Pressable>
            {/*  
            <ListItem key={song.id} bottomDivider onPress={() => {props.navigation.navigate('Manage Song',{
              songId:song.id,
              songTitle:song.title,
              songLyrics:song.lyrics
            }
              )}}>
                
              <ListItem.Content>
                <ListItem.Title>{song.title}</ListItem.Title>
                <ListItem.Subtitle>{song.artist}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          */}
          
            </ScrollView>
          )
        })
      }
      </Box>
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