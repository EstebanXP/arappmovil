import React, {useState} from "react";
import { StyleSheet, View, TextInput, Alert} from 'react-native';
//import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "../database/firebase";
import { render } from "react-dom";
import { useFonts } from 'expo-font';
import { Container, Button, Center, NativeBaseProvider,Stack, Input, Heading, Text, Box, Icon} from "native-base"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import { Link } from '@react-navigation/native';
import * as RootNavigation from "./RootNavigation"
import { Flex, Spacer, HStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
export default class LoginUser extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
    }
  }
  
  getData=async (id)=>{
    const dbRef = firebase.db.collection("Users").doc(id);
    const doc = await dbRef.get();
    const userData = doc.data();
    this.props.setRole(userData.userRole);
  }

  loginAccount =()=>{
    firebase.firebase.app().auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then((user)=>{
      this.props.setUserActive(true);
      this.props.setUser(user.user);
      this.getData(user.user.uid);
    })
    .catch((error)=>{
      Alert.alert('Sorry. ' + error.message)
      
    })
  }
    render(){
      return (
        
        <NativeBaseProvider>
          <Box  width="2xs" mt="20">   
              <Heading size="2xl" mb="10" mt="48">
                  Welcome back
              </Heading> 
            <Stack
              space={4}
              w={{
                base: "75%",
                md: "25%",
              }}
            >
                <Box>
                  <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                  position="absolute"
                  top="-13"
                  right="-60"
                  />
                  <Input variant="underlined" w={{base: "133%", md: "133%",}}
                  style={{borderColor: '#4f46e5' }} 
                  placeholder="username/email"  onChangeText={(email) => {
                    this.setState({email:email}) }} value={this.state.email}
                    position="absolute" left="0" top="-20"/>
                </Box>
                
                <Input variant="underlined" style={{borderColor: '#4f46e5' }} w={{base: "133%", md: "133%",}}
                
                  placeholder="password" mb="5" onChangeText={(password) => {
                  this.setState({password:password}) }} value={this.state.password} 
                  secureTextEntry={true}
                  autoCorrect={false}/>

                <Button  bg="indigo.600" size={'lg'} colorScheme="indigo" onPress={this.loginAccount} shadow={9} px="100" w="133%" borderRadius="50">Sign In</Button>
                <Text fontSize="sm" w="133%">or sign in using</Text>
                <Center position="absolute" style={{borderColor: '#4f46e5' }}></Center>
                <Button.Group>
                <Button w="65%" bg="white" colorScheme="indigo"  shadow={9} borderRadius="50" >
                  <HStack space={3} alignItems="center">
                    <Center>
                      <Icon
                      as={<MaterialCommunityIcons name="facebook" />}
                      size={4}
                      mr="-2"
                      color="muted.400"
                      />
                    </Center>
                    <Center>
                      <Text>
                        Facebook
                      </Text>
                      
                    </Center>
                    
                  </HStack>
                </Button>
                <Button w="65%" bg="white" colorScheme="indigo"  shadow={9} borderRadius="50" >
                  <HStack space={3} alignItems="center">
                    <Center>
                      <Icon
                      as={<AntDesign name="google" />}
                      size={4}
                      mr="-2"
                      color="muted.400"
                      />
                    </Center>
                    <Center>
                      <Text>
                        Google
                      </Text>
                      
                    </Center>
                    
                  </HStack>
                </Button>
                </Button.Group>
                <Center><Text color="indigo.600"  italic fontSize="sm" w="133%" position="absolute" left="7" bottom="-30">Don’t have an account? Sign up</Text></Center>
                
             
            </Stack>
          </Box>
        </NativeBaseProvider>
      );
    }
}

