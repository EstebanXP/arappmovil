import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import {
  NativeBaseProvider,
  VStack,
  Center,
  Button,
  Pressable,
  Box,
  Container,
  Select,
} from "native-base";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";

export default function setListsManagement(props, { navigation }) {
  const initialState = {
    name: "",
    set: "",
    show: "",
    band: "",
    //showTag: "", hace falta saber como conectar los tags
  };

  const [sets, setSets] = useState([]);

  const [setList, setSetList] = useState(initialState);

  const getSetListId = async (id) => {
    const dbRef = firebase.db.collection("setlists").doc(id);
    const doc = await dbRef.get();
    const setList = doc.data();
    setSetList({
      ...setList,
      id: doc.id,
    });
  };

  useEffect(() => {
    getSetListId(props.route.params.setListId);
    console.log(props.route.params.setListId);
  }, []);

  useEffect(() => {
    let unmounted = false;
    firebase.db.collection("sets").onSnapshot((querySnapshot) => {
      const Sets = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, songs,setListID /*que pedo con las rolas*/ } = doc.data();
        Sets.push({
          id: doc.id,
          name,
          songs,
          setListID,
        });
      });
      if (!unmounted) setSets(Sets);
    });

    return () => {
      unmounted = true;
    };
  }, []);

  const handleChangeText = (field, value) => {
    setSetList({ ...setList, [field]: value });
  };

  const deleteSetList = async () => {
    const dbRef = firebase.db
      .collection("setlists")
      .doc(props.route.params.setListId);
    await dbRef.delete();
    alert("SetList eliminado");
    props.navigation.navigate("SetList List");
  };

  const updateSetList = async () => {
    const dbRef = firebase.db
      .collection("setlists")
      .doc(props.route.params.setListId);
    await dbRef.set({
      name: setList.name,
      set: setList.set,
      show: setList.show,
      band: setList.band,
    });
    setSetList(initialState);
    props.navigation.navigate("SetList List");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Eliminar SetList", "Estas seguro?", [
      { text: "Si", onPress: () => deleteSetList() },
      { text: "No", onPress: () => console.log("No") },
    ]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Nombre Del SetList"
          value={setList.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Show"
          value={setList.show}
          onChangeText={(value) => handleChangeText("show", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Banda"
          value={setList.band}
          onChangeText={(value) => handleChangeText("band", value)}
        />
        <ScrollView>
          {sets.map((set) => {
            console.log(set)
            if(set.setListID===props.route.params.setListId){
              return (
                <Pressable
                  key={set.id}
                  bottomDivider
                  onPress={() => {
                    props.navigation.navigate("Sets Management", {
                      setId: set.id,
                    });
                  }}
                  width="100%"
                  h="32"
                  borderRadius="20"
                  textColor="black"
                  mb="4"
                  shadow={2}
                >
                  <Box width="100%" h="32" borderRadius="20" bg="#FFF">
                    <Text textAlign="center" mt="auto" mb="auto" color="black">
                      {set.name}
                    </Text>
                  </Box>
                </Pressable>
              );
            }
          })}
        </ScrollView>
        <View>
          <Button title="Actualizar SetList" onPress={() => updateSetList()} />
        </View>
        <View>
          <Button
            title="Eliminar SetList"
            onPress={() => openConfirmationAlert()}
          />
        </View>
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
