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
import { View, SafeAreaView} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
//<Center flex={1}></Center>
export default function notification() {
  const [selected, setSelected] = React.useState(1);
  const navigation = React.useContext(NavigationContext);
  return (
    <SafeAreaView>
    <NativeBaseProvider>

        <Box  alignItems="center" safeAreaBottom shadow={9} width="12"  borderRadius={60} height="12">
        <Pressable
            position="absolute" zIndex="3" bottom="2" left="0" right="0" 
            opacity={.5}
            flex={1}
          >
            <TouchableOpacity onPress={() => {
              setSelected(3)
              RootNavigation.navigateReplaceSingle("Notifications")
              }}>
            <Center>
              <Icon
                mb="1"
                as={
                  <Ionicons
                    name='notifications-outline'
                  />
                }
                color="white"
                size="sm"
              />
            </Center>
            </TouchableOpacity>
          </Pressable>
        
        </Box>
    </NativeBaseProvider>
    </SafeAreaView>
  );
}