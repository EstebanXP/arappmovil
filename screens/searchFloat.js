import React from 'react';
import {
  NativeBaseProvider,
  KeyboardAvoidingView,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
import { Platform } from "react-native"
import { View} from 'react-native'
//<Center flex={1}></Center>
export default function search() {
  const [selected, setSelected] = React.useState(0);
  const navigation = React.useContext(NavigationContext);
  function CollapseFunc(){
    if(selected=== 1){
      setSelected(0);
    }
    else{
      setSelected(1);
    }
  }

  if(selected === 0){
    return (
      <View>
      <NativeBaseProvider>
          <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={9} width="12" position="absolute" zIndex="5" bottom="24"  right="5%" borderRadius={60} height="12">
          <Pressable
              position="absolute" zIndex="3" bottom="2" left="0" right="0" 
              opacity={selected ===1 ? 1 : 0.5}
              
              flex={1}
              onPress={() => {CollapseFunc()}}
            >
              <Center>
                <Icon
                  mb="1"
                  as={
                    <MaterialCommunityIcons
                      name='magnify'
                    />
                  }
                  color="white"
                  size="sm"
                />
              </Center>
            </Pressable>
          </HStack>
      </NativeBaseProvider>
      </View>
    );
  }
  else{
    return (
      <View>
      <NativeBaseProvider>
          <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={9} width="75%" position="absolute" zIndex="5" bottom="24"  right="5%" borderRadius={60} height="12">
          <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
            <Input
            placeholder="Search"
            variant="filled"
            width="85%"
            bg="gray.100"
            borderRadius="50"
            py="1"
            left ="1"
            height ="10"
            position = "absolute"
            px="2"
            placeholderTextColor="gray.500"
            _hover={{ bg: 'muted.500', borderWidth: 0 }}
            borderWidth="0"
            _web={{
              _focus: { style: { boxShadow: 'none' } },
            }}
          />
          </KeyboardAvoidingView>
          <Pressable
              position="absolute" zIndex="3" bottom="2" right="3" 
              opacity={selected ===1 ? 1 : 0.5}
              
              flex={1}
              onPress={() => {CollapseFunc()}}
            >
              <Center>
                <Icon
                  mb="1"
                  as={
                    <MaterialCommunityIcons
                      name='magnify'
                    />
                  }
                  color="white"
                  size="sm"
                />
              </Center>
            </Pressable>
          </HStack>
      
      </NativeBaseProvider>
      </View>
    )
  }
}