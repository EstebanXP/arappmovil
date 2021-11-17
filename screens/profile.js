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
import { View} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"

const Example = () => {
    return (
        <Image
          size={200}
          resizeMode={"contain"}
          borderRadius={100}
          mt="50"
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
        />
      )
    }

    export default function profile(){
      return (
        <NativeBaseProvider>
            <Center flex={1} px="9">
                <Example />
            </Center>
            <Text textAlign="center" color="black" fontSize="80" mb="450">
                Name 
            </Text>
        </NativeBaseProvider>
      )
    }
