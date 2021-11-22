import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import firebase from "../database/firebase";

export default function songsManagement() {
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState({
    title: "",
    artist: "",
    chords: "",
  });

  const handleChangeText = (field, value) => {
    setSong({ ...song, [field]: value });
  };

  function fetchApi() {
    return fetch(`https://api.lyrics.ovh/v1/${song.artist}/${song.title}`);
  }

  async function saveData() {
    await firebase.db
      .collection("songs")
      .add({
        artist: song.artist,
        title: song.title,
        lyrics: lyrics,
        chords: song.chords,
      })
      .then(() => {
        console.log("Guardado");
      })
      .catch((err) => {
        console.log(error);
      });
  }

  async function getSongfromAPI() {
    try {
      const response = await fetchApi();
      if (response.status === 200) {
        setStatus(!status);
        const json = await response.json();
        setLyrics(json.lyrics);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);
  return (
    <View>
      <SafeAreaView>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la cancion"
          onChangeText={(text) => handleChangeText("title", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del artista"
          onChangeText={(text) => handleChangeText("artist", text)}
        />
        <Button title="Search Song" onPress={() => getSongfromAPI()}></Button>
        {status === true ? (
          <Text></Text>
        ) : (
          <Text>Tu cancion se encontrara abajo!</Text>
        )}
      </ScrollView>
      </SafeAreaView>
      {status === true ? (
        <View>
          <Text>Letra Encontrada: </Text>
          <ScrollView style={{height:400}}>
            <Text >{lyrics}</Text>
          </ScrollView>

          <Button title="Save song" onPress={() => saveData()}></Button>
          <Button title="Discard song"></Button>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
