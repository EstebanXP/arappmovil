import React from 'react';
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
import { View, SafeAreaView} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"

const Example = () => {
    return (
        <SafeAreaView>
            <Image
          size={200}
          resizeMode={"contain"}
          borderRadius={100}
          mt="-300"
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
        />
        <Heading textAlign="center" color="black" fontSize="3xl" mt="-5">
                Name
            </Heading>
            <Text textAlign="center" color="black" >lg</Text>
        </SafeAreaView> 
      )
    }

    export default function profile(){
      return (
        <SafeAreaView>
             <NativeBaseProvider>
            <Center flex={1} px="9">
                <Example />
            </Center>
        </NativeBaseProvider>
        </SafeAreaView>
       
      )
    }
