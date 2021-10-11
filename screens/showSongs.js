import React,{useState,useEffect} from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList} from 'react-native';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'
import Item from './Item';

export default function showSongs(){
    const [songs, setSongs] = useState([]);

    const renderItem=({item})=>(
      <Item >{item.title}</Item>
    )
  

    useEffect(()=>{
       let unmounted = false;
       firebase.db.collection('songs').onSnapshot(querySnapshot=>{
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
     },[])

    return (
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