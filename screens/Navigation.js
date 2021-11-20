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
  HStack,
  Center,
  Pressable,
} from 'native-base';
import { View} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Platform } from 'react-native';
//<Center flex={1}></Center>
export default function nav(props) {
  const [selected, setSelected] = React.useState(1);
  const navigation = React.useContext(NavigationContext);
  return (
    <View>
    <NativeBaseProvider>
      <Box>
        <HStack bg="#151515" opacity="0.9" alignItems="center" safeAreaBottom shadow={9} width={"90%"} position="absolute" zIndex="2" bottom="6"  left="5%" right="5%" borderRadius={12} height="16">
        <Pressable 
            bg={selected === 3 ? "#000" : null}
            borderRadius={12}
            style={{elevation: 4}}
            position="absolute" zIndex="4"  left="0" 
            opacity={selected === 3 ? .99 : 0.5}
            py="2"
            px="5"
            flex={1}
            w="30%"
            
            >
              <TouchableOpacity onPress={() => {setSelected(3), RootNavigation.navigateReplace("Profile", props.name, props.userName, props.role)}}>
            <Center  h="100%">
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 3 ? 'account' : 'account-outline'}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Profile
              </Text>
            </Center>
            </TouchableOpacity>
          </Pressable>
          <Pressable
            bg={selected === 1 ? "#000" : null}
            borderRadius={12}
            style={{elevation: 4}}
            position="absolute" zIndex="3"  left="35%" right="0"
            opacity={selected === 1 ? .99 : 0.5}
            py="2"
            w="30%"
            flex={1}
            >
              <TouchableOpacity onPress={() => {setSelected(1), RootNavigation.navigateReplace("Home")}}>
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 1 ? 'home' : 'home-outline'}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
            </TouchableOpacity>
          </Pressable>
          <Pressable
            bg={selected === 2 ? "#000" : null}
            borderRadius={12}
            w="30%"
            position="absolute" zIndex="3"  right="0"
            style={{elevation: 4}}
            opacity={selected === 2 ? .99 : 0.5}
            py="2"
            flex={1}
            
          >
            <TouchableOpacity onPress={() => {setSelected(2), RootNavigation.navigateReplace("Sets Lists")}}>
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 2 ? 'play-circle' : 'play-circle-outline'}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Next Show
              </Text>
            </Center>
            </TouchableOpacity>
          </Pressable>
         
        </HStack>
     </Box>
    </NativeBaseProvider>
    </View>
  );
}
