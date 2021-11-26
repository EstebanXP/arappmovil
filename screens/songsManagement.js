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

export default function songsManagement({navigation}) {
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
        setStatus(false);
        navigation.navigate("Show Songs");
      })
      .catch((error) => {
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
            <View>
              <Text>Tu cancion se encontrara abajo!</Text>
            </View>
          )}
        </ScrollView>
      
      {status === true ? (
        <View>
          <Text>Letra Encontrada: </Text>
          <Button title="Save song" onPress={() => saveData()}></Button>
          <Button title="Discard song"></Button>
          <ScrollView style={{ height: 250 }}>
            <Text>{lyrics}</Text>
          </ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Chords"
            onChangeText={(text) => handleChangeText("chords", text)}
          />
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
      </SafeAreaView>
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
