import React,{useState,useEffect} from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
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
        <Input placeholder="Search..." onChangeText={(event)=>{setSearchVar(event)}}></Input>
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue,itemIndex)=>setSort(itemValue)}
        > 
        <Picker.Item label="Title" value="title" />
        <Picker.Item label="Artist" value="artist" />
        </Picker>
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
            </ScrollView>
          )
        })
      }
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