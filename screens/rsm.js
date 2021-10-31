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

export default function rsm(props, { navigation }) {
  const [song, setSong] = useState({
    id: "",
    title: "",
    artist: "",
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
    const dbRef = firebase.db.collection("songs").doc(id);
    await dbRef.set({
      title: song.title,
      lyrics: song.lyrics,
    });
    props.navigation.navigate("Show Songs");
  }
  async function deleteSong(id) {
    const dbRef = firebase.db.collection("songs").doc(id);
    await dbRef.delete();
    props.navigation.navigate("Show Songs");
  }

  useEffect(() => {
    getSong(props.route.params.songId);
  }, []);

  return (
    <SafeAreaView>
      <Text>Title: </Text>
      <TextInput
        value={song.title}
        onChangeText={(value) => handleChangeText("title", value)}
      ></TextInput>
      <Text>Lyrics: </Text>
      <TextInput
        onChangeText={(value) => handleChangeText("lyrics", value)}
        style={{ height: 400 }}
        multiline
        value={song.lyrics}
      ></TextInput>
      <Text>Artist: </Text>
      <TextInput
        onChangeText={(value) => handleChangeText("artist", value)}
        value={song.artist}
      ></TextInput>
      <Button
        title="Save"
        onPress={() => sendData(props.route.params.songId)}
      ></Button>
      <Button
        title="Delete"
        onPress={() => deleteSong(props.route.params.songId)}
      ></Button>
    </SafeAreaView>
  );
}
