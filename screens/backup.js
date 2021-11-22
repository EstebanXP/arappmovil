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
               <Box position="absolute" top="40">
                <Center flex={1} px="9" >
                    <Heading textAlign="center" color="black" fontSize="3xl">
                        Backup the song catalog
                    </Heading>     
                </Center>
                <HStack ml="auto" mr="auto" mt="10">
                  <Center>
                <Icon
                      as={<MaterialCommunityIcons name="apple-icloud" />}
                      size={60}
                      
                      bold
                      />
                </Center>
                <Center>
                <Icon
                      as={<MaterialCommunityIcons name="dropbox" />}
                      size={60}
                       
                      bold
                      />
                </Center> 
                </HStack>
              </Box>
            </NativeBaseProvider>
        </View>    
      )
    }
