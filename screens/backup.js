import React,{ useState} from 'react';
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
import { View, SafeAreaView} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
import { AntDesign, Entypo } from '@expo/vector-icons';


export default function profile({route,navigation}){
    const [userName, setUserName] = useState("");
    const { name, role, user } = route.params;
     
      return (
        <View>
             <NativeBaseProvider>
                <Center flex={1} px="9" >
                    <Heading textAlign="center" color="black" fontSize="3xl" position="absolute" top="10">
                        Backup the song catalog
                    </Heading>     
                </Center>
                <Box alignItems="center" position="absolute" top="2" w="90%" right="5%" left="5%">
                <Icon
                      as={<MaterialCommunityIcons name="apple-icloud" />}
                      size={60}
                      left="30%"
                      position="absolute" top="150"
                      bold
                      />
                <Icon
                      as={<MaterialCommunityIcons name="dropbox" />}
                      size={60}
                       left="60%"
                      position="absolute" top="150"
                      bold
                      />      
                </Box>
            </NativeBaseProvider>
        </View>    
      )
    }
