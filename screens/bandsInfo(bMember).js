import React, {useEffect, useState} from "react";
import { View,SafeAreaView,StyleSheet,TextInput, Alert} from 'react-native';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    Image,
    HStack,
    Center,
    Pressable,
  } from 'native-base';
import firebase from "../database/firebase";
import {ListItem} from 'react-native-elements'

export default function bandsInfo(props,{navigation}) {

  const initialState = {
    bandName: "",
    bandLogo: "",
    bandDescription: "",
    bandGenres: "",
      //showTag: "", hace falta saber como conectar los tags
  }

  const [band, setBand] = useState(initialState)

  const getBandId = async (id) =>{
    const dbRef = firebase.db.collection('Bands').doc(id)
    const doc = await dbRef.get();
    const band = doc.data();
    setBand({
      ...band,
      id: doc.id,
    })
    }

  useEffect (()=>{
      getBandId(props.route.params.bandId);
  }, [])

    return ( 
      <SafeAreaView>
          <NativeBaseProvider>
                <Center flex={1} px="9" >
                    <Image
                    size={300}
                    resizeMode={"contain"}
                    borderRadius={100}
                    position="absolute" top="0"
                    source={{
                        uri: "https://images.unsplash.com/photo-1598518141787-5be70e839626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
                    }}
                    alt="Alternate Text"
                    />       
                    <Box alignItems="center" position="absolute" top="80" w="100%" >
                    <Heading textAlign="center" color="black" fontSize="3xl">
                    {band.bandName}
                    </Heading>
                    <Text textAlign="center" color="black">Genero de banda</Text>
                    <Box textAlign="center" color="black">{band.bandGenres}</Box>
                    <Text textAlign="center" color="black">{band.bandDescription}</Text>
                    </Box>
                </Center>
            </NativeBaseProvider>
          
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  