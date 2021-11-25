import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export default function rsm(props, { route, navigation }) {
  const {songID} = props.route.params;
  const [song, setSong] = useState({
    id: "",
    title: "",
    artist: "",
    chords: "",
    lyrics: "",
  });

  async function getSong(id) {
    const dbRef = firebase.db.collection("songs").doc(id);
    const doc = await dbRef.get();
    const songsList = doc.data();
    setSong({ ...songsList, id: doc.id });
  }

  function handleChangeText(field, value) {
    setSong({ ...song, [field]: value });
  }

  async function sendData(id) {
    console.log(songID);
    const dbRef = firebase.db.collection("songs").doc(id);
    console.log(song.title);
    console.log(song.artist);

    dbRef
      .update({
        title: song.title,
        lyrics: song.lyrics,
        artist: song.artist,
        chords: song.chords,
      })
      .then(() => console.log("AAA"))
      .catch((error)=>{
        console.log(error)
      });
    await dbRef.set({
      title: song.title,
      lyrics: song.lyrics,
      artist: song.artist,
      chords: song.chords,
    });
    props.navigation.navigate("Show Songs");
  }
  async function deleteSong(id) {
    const dbRef = firebase.db.collection("songs").doc(id);
    await dbRef.delete();
    props.navigation.navigate("Show Songs");
  }

  useEffect(() => {
    getSong(songID);
  }, []);

  return (
    <SafeAreaView>
      <Text>Title: </Text>
      <TextInput
        value={song.title}
        onChangeText={(value) => handleChangeText("title", value)}
      ></TextInput>
      {}
      <TextInput
        onChangeText={(value) => handleChangeText("lyrics", value)}
        style={{ height: 400 }}
        multiline
        value={song.lyrics}
      ></TextInput>
      <Text>Artist: </Text>
      <TextInput
        value={song.artist}
        onChangeText={(value) => handleChangeText("artist", value)}
      ></TextInput>
      <Text>Chords: </Text>
      <TextInput
        value={song.chords}
        onChangeText={(value) => handleChangeText("chords", value)}
      ></TextInput>
      <Button
        title="Save"
        onPress={() => sendData(songID)}
      ></Button>
      <Button
        title="Delete"
        onPress={() => deleteSong(songID)}
      ></Button>
    </SafeAreaView>
  );
}
