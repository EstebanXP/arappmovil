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


    export default function profile(){
      return (
        <View>
             <NativeBaseProvider>
                <Center flex={1} px="9" >
                    <Image
                    size={200}
                    resizeMode={"contain"}
                    borderRadius={100}
                    position="absolute" top="10"
                    source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                    }}
                    alt="Alternate Text"
                    />
                    <Heading textAlign="center" color="black" fontSize="3xl" position="absolute" top="245">
                        Name
                    </Heading>
                    <Text textAlign="center" color="black" position="absolute" top="72" >@UserName</Text>
                    <Text textAlign="center" color="black" position="absolute" top="80" >Role</Text>
                </Center>
            </NativeBaseProvider>
        </View>    
      )
    }
