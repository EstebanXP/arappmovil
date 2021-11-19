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
  IconButton,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
import { View} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
//<Center flex={1}></Center>
export default function search() {
  const [selected, setSelected] = React.useState(1);
  const navigation = React.useContext(NavigationContext);
  return (
    <View>
    <NativeBaseProvider>
      
        <HStack bg="#17127D" opacity="0.96" alignItems="center" safeAreaBottom shadow={9} width="12" position="absolute" zIndex="2" bottom="24"  left="5%" borderRadius={60} height="12">
        <Pressable
            position="absolute" zIndex="3" bottom="2" left="0" right="0" 
            opacity={1}
            
            flex={1}
          >
            <TouchableOpacity onPress={() => {setSelected(3), RootNavigation.navigate("Profile")}}>
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name='pencil-outline'
                  />
                }
                color="white"
                size="sm"
              />
            </Center>
            </TouchableOpacity>
          </Pressable>
        </HStack>
    </NativeBaseProvider>
    </View>
  );
}
