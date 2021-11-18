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
//<Center flex={1}></Center>
export default function nav() {
  const [selected, setSelected] = React.useState(4);
  const navigation = React.useContext(NavigationContext);
  return (
    <View>
    <NativeBaseProvider>
      <Box>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={9} width={"90%"} position="absolute" zIndex="2" bottom="6"  left="5%" right="5%" borderRadius={60} height="16">
        <Pressable
            style={{elevation: 4}}
            position="absolute" zIndex="4"  left="5" 
            opacity={selected === 3 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {setSelected(3), RootNavigation.navigateReplace("Profile")}}>
            <Center>
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
          </Pressable>
          <Pressable
            style={{elevation: 4}}
            position="absolute" zIndex="3"  left="0" right="0"
            opacity={selected === 1 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {setSelected(1), RootNavigation.navigateReplace("Home")}}>
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
          </Pressable>
          <Pressable
            position="absolute" zIndex="3"  right="5"
            style={{elevation: 4}}
            opacity={selected === 2 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {setSelected(2), RootNavigation.navigateReplace("Sets Lists")}}
          >
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
          </Pressable>
         
        </HStack>
     </Box>
    </NativeBaseProvider>
    </View>
  );
}