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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
//<Center flex={1}></Center>
export default function search() {
  const [selected, setSelected] = React.useState(1);
  const navigation = React.useContext(NavigationContext);
  return (
    <NativeBaseProvider>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={9} width={"16"} position="absolute" zIndex="3" bottom="0"  left="20" borderRadius={60} height="16">
        <Pressable
            mb="-9"
            ml="3"
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {setSelected(3), RootNavigation.navigate("Profile")}}
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
  );
}