import React, { useEffect, useState,useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import {
  NativeBaseProvider,
  VStack,
  Center,
  Button,
  Pressable,
  Text,
  Box,
  Container,
  FlatList,
  Flex,
  Select,
} from "native-base";
import firebase from "../database/firebase";
import IdProvider from "../exports/IdProvider";
import { ListItem } from "react-native-elements";

export default function setListCreate({ navigation }) {
  const [finalSet,setFinalSet]=useState([]);
  const {idU,setIdU} = useContext(IdProvider);
  const [sets, setSets] = useState([]);
  const [nsName, setNSName] = useState("");
  const [songs, setSongs] = useState([]);
  const [addSet, setAddSet] = useState(false);
  const [state, setState] = useState({
    name: "",
    set: "",
    show: "",
    band: "",
    //showTag: "", hace falta saber como conectar los tags
  });

  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const addSetList = async () => {
    console.log(state);
    await firebase.db.collection("setlists").add({
      name: state.name,
      show: state.show,
      band: state.band,
      createdBy: idU
    })
    .then((docu)=>{
      finalSet.map((setUnico)=>{
        firebase.db.collection("sets").add({
          name:setUnico.name,
          songs:setUnico.set,
          createdBy:idU,
          setListID:docu.id,
        })
      })
    });
    alert("guardado");
    navigation.navigate("SetList List");
  };

  useEffect(() => {
    let unmounted = false;
    console.log(nsName)
    console.log(sets)
    firebase.db.collection("songs").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.docs.forEach((doc) => {
        const { artist, chords, lyrics, title } = doc.data();
        docs.push({
          id: doc.id,
          artist: artist,
          chords: chords,
          lyrics: lyrics,
          title: title,
        });
      });
      if (!unmounted) {
        setSongs(docs);
      }
    });
    1;
    return () => {
      unmounted = true;
    };
  }, [nsName,sets]);

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Nombre del SetList 1"
          onChangeText={(value) => handleChangeText("set", value)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Set"
          onChangeText={(value) => handleChangeText("set", value)}
        />
        <Button title="Add Set" onPress={() => setAddSet(!addSet)}>
          Add Set
        </Button>
        {addSet ? (
          <View>
            <TextInput value={nsName} style={styles.input} placeholder="Set Name" onChangeText={text=>setNSName(text)}/>
            <ScrollView style={{ height: 250 }}>
              {songs.map((song) => {
                return (
                  <Box width="100%" h="32" borderRadius="20" bg="#FFF">
                    <Text textAlign="center" mt="auto" mb="auto" color="black">
                      {song.title}
                    </Text>
                    <Text textAlign="center" mt="auto" mb="auto" color="black">
                      {song.artist}
                    </Text>
                    <Button onPress={() => setSets([...sets,song.id])}>Add</Button>
                    <Text>{"\n"}</Text>
                  </Box>
                );
              })}
            </ScrollView>
            <Button onPress={() => {
              setFinalSet([...finalSet,{name:nsName,set:sets}])
              setSets([]);
              setNSName("");
              console.log(finalSet);
          }}>Save AAA</Button>
          </View>
        ) : (
          <View>
            {/**Este es el view de los demas partes del setlist */}
            <TextInput
              style={styles.input}
              placeholder="Show"
              onChangeText={(value) => handleChangeText("show", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Banda"
              onChangeText={(value) => handleChangeText("band", value)}
            />
            <Button title="Guardar SetList" onPress={() => addSetList()} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
